using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Secure_Login_Role_Bases_Access.Services;
using Secure_Login_Role_Bases_Access.Data;


var builder = WebApplication.CreateBuilder(args);

// Database
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("SecureConnection")));

// Identity with roles, cookie paths, password hash defaults
builder.Services.AddIdentity<IdentityUser, IdentityRole>(options =>
{
    options.Password.RequireDigit = true;
    options.Password.RequireUppercase = true;
    options.Password.RequiredLength = 6;
    options.SignIn.RequireConfirmedAccount = false;
})
.AddEntityFrameworkStores<ApplicationDbContext>()
.AddDefaultTokenProviders();

// MVC + global anti-forgery validation on unsafe HTTP methods
builder.Services.AddControllersWithViews();

// Data Protection available via DI for protecting sensitive data if needed
builder.Services.AddDataProtection();

// Cookie settings and access denied path
builder.Services.ConfigureApplicationCookie(options =>
{
    options.LoginPath = "/Account/Login";
    options.AccessDeniedPath = "/Account/AccessDenied";
    options.SlidingExpiration = true;
});

builder.Services.AddScoped<IdentityDataSeeder>();

var app = builder.Build();

// Enforce HTTPS and HSTS in non-dev
if (!app.Environment.IsDevelopment())
{
    app.UseHsts();
}
// Redirect HTTP -> HTTPS globally
app.UseHttpsRedirection();

// Static files, routing, auth
app.UseStaticFiles();
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();

// Seed roles and users
using (var scope = app.Services.CreateScope())
{
    var seeder = scope.ServiceProvider.GetRequiredService<IdentityDataSeeder>();
    await seeder.SeedAsync();
}

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
