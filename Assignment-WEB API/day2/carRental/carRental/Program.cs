using carRental.Data;
using carRental.Entities;
using carRental.Services;
//using CarRentalSystem.Data;
using carRental.DTOs;
//using CarRentalSystem.Entities;
//using CarRentalSystem.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;


var builder = WebApplication.CreateBuilder(args);

// EF Core
builder.Services.AddDbContext<CarRentalDbContext>(opts =>
    opts.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Services
builder.Services.AddScoped<VehicleService>();
builder.Services.AddScoped<CustomerService>();

// Controllers + Swagger
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() { Title = "Car Rental API", Version = "v1" });
    c.AddSecurityDefinition("Bearer", new()
    {
        Description = "JWT Authorization header using the Bearer scheme. Example: \"Bearer {token}\"",
        Name = "Authorization",
        In = Microsoft.OpenApi.Models.ParameterLocation.Header,
        Type = Microsoft.OpenApi.Models.SecuritySchemeType.ApiKey
    });
    c.AddSecurityRequirement(new()
    {
        { new() { Reference = new() { Type = Microsoft.OpenApi.Models.ReferenceType.SecurityScheme, Id = "Bearer" } }, Array.Empty<string>() }
    });
});

// Authentication
var jwt = builder.Configuration.GetSection("Jwt");
var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwt["Key"]!));

// IMPORTANT: DefaultScheme cookies for OAuth, keep JwtBearer available for APIs
builder.Services.AddAuthentication(options =>
{
    options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;       // for OAuth correlation
    options.DefaultChallengeScheme = "GitHub";                                      // when challenging from web
})
.AddCookie(CookieAuthenticationDefaults.AuthenticationScheme, options =>
{
    // Ensure correlation cookie is sent on external redirect
    options.Cookie.SameSite = SameSiteMode.None;
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
})
.AddGitHub("GitHub", options =>
{
    options.ClientId = builder.Configuration["Authentication:GitHub:ClientId"]!;
    options.ClientSecret = builder.Configuration["Authentication:GitHub:ClientSecret"]!;
    options.SaveTokens = true;
    // DO NOT set CallbackPath unless you know what you're doing; default is /signin-github
})
// Add JWT bearer for APIs; use [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
.AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwt["Issuer"],
        ValidAudience = jwt["Audience"],
        IssuerSigningKey = signingKey,
        ClockSkew = TimeSpan.FromMinutes(1)
    };
});

builder.Services.AddAuthorization();

var app = builder.Build();

// Optional: migrate/seed
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<CarRentalDbContext>();
    db.Database.EnsureCreated();
    if (!db.Vehicles.Any())
    {
        db.Vehicles.AddRange(
            new Vehicle { Make = "Toyota", Model = "Corolla", Year = 2022, DailyRate = 45, Status = "available", PassengerCapacity = 5, EngineCapacity = 1800, Type = "sedan" },
            new Vehicle { Make = "Honda", Model = "CR-V", Year = 2023, DailyRate = 70, Status = "available", PassengerCapacity = 5, EngineCapacity = 1500, Type = "suv" }
        );
    }
    if (!db.Customers.Any())
    {
        db.Customers.AddRange(
            new Customer { FirstName = "Akshay", LastName = "Sharma", Email = "akshay@example.com", PhoneNumber = "9876543210" }
        );
    }
    db.SaveChanges();
}

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseRouting();

// ORDER: auth after routing, before endpoints
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// Minimal endpoints for GitHub OAuth web flow
app.MapGet("/", (ClaimsPrincipal user) =>
{
    if (user.Identity?.IsAuthenticated == true)
    {
        var name = user.Identity.Name ?? "GitHub User";
        return Results.Content($"<h1>Welcome, {name}!</h1><p><a href='/logout'>Logout</a></p>", "text/html");
    }
    return Results.Content("<a href=\"/signin\">Login with GitHub</a>", "text/html");
});

// This triggers the external challenge; RedirectUri is where to go AFTER success.
// DO NOT send users to /signin-github directly.
app.MapGet("/signin", () =>
{
    return Results.Challenge(
        properties: new AuthenticationProperties { RedirectUri = "/" },
        authenticationSchemes: new[] { "GitHub" }
    );
});

app.MapGet("/logout", async (HttpContext ctx) =>
{
    await ctx.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
    return Results.Redirect("/");
});

app.Run();

public partial class Program { }
