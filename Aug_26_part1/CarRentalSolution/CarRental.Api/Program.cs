using System.Text;
using CarRental.Api.Data;
using CarRental.Api.Repos;
using CarRental.Api.Controllers;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);
var cfg = builder.Configuration;

// EF Core + SQL Server
builder.Services.AddDbContext<AppDbContext>(opt =>
    opt.UseSqlServer(cfg.GetConnectionString("DefaultConnection")));

// Identity
builder.Services.AddIdentity<AppUser, IdentityRole>(opt =>
{
    opt.User.RequireUniqueEmail = false;
})
.AddEntityFrameworkStores<AppDbContext>()
.AddDefaultTokenProviders();

// Authentication: Cookie (for external), GitHub (external), JWT (API)
builder.Services.AddAuthentication(options =>
{
    // Keep JWT as default for API requests
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddCookie(CookieAuthenticationDefaults.AuthenticationScheme, c =>
{
    // External redirects need cookies to survive round-trips
    c.Cookie.SameSite = SameSiteMode.Lax;
    c.Cookie.SecurePolicy = CookieSecurePolicy.Always;
    c.Cookie.HttpOnly = true;
})
.AddGitHub(o =>
{
    o.ClientId = cfg["Authentication:GitHub:ClientId"]!;
    o.ClientSecret = cfg["Authentication:GitHub:ClientSecret"]!;
    o.CallbackPath = "/signin-github";
    // When Identity is present, use the external cookie scheme for external sign-in
    o.SignInScheme = IdentityConstants.ExternalScheme;
})
.AddJwtBearer(o =>
{
    var issuer = cfg["Authentication:Jwt:Issuer"];
    var audience = cfg["Authentication:Jwt:Audience"];
    var signingKey = cfg["Authentication:Jwt:SigningKey"];
    o.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = issuer,
        ValidAudience = audience,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(signingKey!))
    };
});

// Cookie for the external scheme used by Identity (ensures it exists)
builder.Services.AddAuthentication()
  .AddCookie(IdentityConstants.ExternalScheme, c =>
  {
      c.Cookie.SameSite = SameSiteMode.Lax;
      c.Cookie.SecurePolicy = CookieSecurePolicy.Always;
      c.Cookie.HttpOnly = true;
  });

// CORS for React
builder.Services.AddCors(opt =>
{
    opt.AddPolicy("spa", p => p
      .WithOrigins("http://localhost:5173")
      .AllowAnyHeader()
      .AllowAnyMethod()
      .AllowCredentials());
});

builder.Services.AddScoped<ICarLeaseRepository, CarLeaseRepository>();
builder.Services.AddControllers();

// Swagger + JWT support
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(opt =>
{
    opt.SwaggerDoc("v1", new OpenApiInfo { Title = "CarRental API", Version = "v1" });
    opt.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "JWT Authorization header using the Bearer scheme.",
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        BearerFormat = "JWT",
        Scheme = "bearer"
    });
    opt.AddSecurityRequirement(new OpenApiSecurityRequirement
  {
    { new OpenApiSecurityScheme { Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "Bearer" } }, new string[]{} }
  });
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();
app.UseCors("spa");
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
