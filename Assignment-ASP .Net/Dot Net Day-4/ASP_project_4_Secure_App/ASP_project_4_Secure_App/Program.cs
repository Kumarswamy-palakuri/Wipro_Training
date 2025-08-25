using ASP_project_4_Secure_App.Middleware;
using ASP_project_4_Secure_App.Persistence;
using ASP_project_4_Secure_App.Security;
using ASP_project_4_Secure_App.Services;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// 1 Database connection (Windows or SQL auth)
var dbAuthType = Environment.GetEnvironmentVariable("DB_AUTH_TYPE") ?? "Windows";
string conn = dbAuthType == "Sql"
    ? builder.Configuration.GetConnectionString("DefaultConnectionSql")
    : builder.Configuration.GetConnectionString("DefaultConnectionWindows");

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(conn, sql =>
    {
        sql.EnableRetryOnFailure(5, TimeSpan.FromSeconds(10), null);
        sql.CommandTimeout(30);
    }));

// 2️ Security & Services
builder.Services.AddDataProtection();
builder.Services.AddSingleton<CryptoService>();
builder.Services.AddSingleton<HmacService>();
builder.Services.AddSingleton<PasswordHasher>();
builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<PaymentService>();
builder.Services.AddScoped<AuthService>();
builder.Services.AddScoped<AuditService>();

// 3️ JWT Authentication
var jwtKey = builder.Configuration["Security:Jwt:SigningKey"];
if (string.IsNullOrWhiteSpace(jwtKey))
    throw new InvalidOperationException("JWT signing key not configured");

byte[] keyBytes;
try { keyBytes = Convert.FromBase64String(jwtKey); }
catch { keyBytes = Encoding.UTF8.GetBytes(jwtKey); }

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Security:Jwt:Issuer"],
            ValidAudience = builder.Configuration["Security:Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(keyBytes)
        };
    });

builder.Services.AddAuthorization();

// 4️ Controllers & FluentValidation
builder.Services.AddControllers()
    .AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<Program>());

// 5️ Swagger with JWT support
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.AddSecurityDefinition("Bearer", new Microsoft.OpenApi.Models.OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = Microsoft.OpenApi.Models.SecuritySchemeType.ApiKey,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = Microsoft.OpenApi.Models.ParameterLocation.Header,
        Description = "Enter 'Bearer' [space] and then your token"
    });
    c.AddSecurityRequirement(new Microsoft.OpenApi.Models.OpenApiSecurityRequirement {
        {
            new Microsoft.OpenApi.Models.OpenApiSecurityScheme {
                Reference = new Microsoft.OpenApi.Models.OpenApiReference {
                    Type = Microsoft.OpenApi.Models.ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[]{}
        }
    });
});

// 6️ CORS
var allowed = builder.Configuration.GetSection("Security:Cors:AllowedOrigins").Get<string[]>() ?? Array.Empty<string>();
builder.Services.AddCors(o => o.AddPolicy("Default", policy =>
{
    policy.WithOrigins(allowed).AllowAnyHeader().AllowAnyMethod().AllowCredentials();
}));

var app = builder.Build();

// 7️ Middlewares
if (!app.Environment.IsDevelopment()) app.UseHsts();
app.UseHttpsRedirection();
app.UseMiddleware<SecurityHeadersMiddleware>();
app.UseMiddleware<SensitiveDataRedactionMiddleware>();

app.UseAuthentication();
app.UseAuthorization();
app.UseCors("Default");

// Swagger
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Root redirect
//app.MapGet("/", () => Results.Redirect("/swagger"));

app.MapControllers();
app.Run();
