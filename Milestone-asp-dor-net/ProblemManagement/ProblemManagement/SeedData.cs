// SeedData.cs
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ProblemManagement.Data;

public static class SeedData
{
    public static async Task Initialize(IServiceProvider serviceProvider)
    {
        var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();
        var userManager = serviceProvider.GetRequiredService<UserManager<IdentityUser>>();

        string[] roleNames = { "Admin", "Manager" };
        IdentityResult roleResult;

        foreach (var roleName in roleNames)
        {
            var roleExist = await roleManager.RoleExistsAsync(roleName);
            if (!roleExist)
            {
                roleResult = await roleManager.CreateAsync(new IdentityRole(roleName));
            }
        }

        // Create Admin user
        var adminUser = new IdentityUser
        {
            UserName = "admin",
            Email = "admin@example.com",
            EmailConfirmed = true
        };

        string adminPassword = "Admin@123";
        var _adminUser = await userManager.FindByNameAsync("admin");

        if (_adminUser == null)
        {
            var createAdmin = await userManager.CreateAsync(adminUser, adminPassword);
            if (createAdmin.Succeeded)
            {
                await userManager.AddToRoleAsync(adminUser, "Admin");
            }
        }

        // Create Manager user
        var managerUser = new IdentityUser
        {
            UserName = "manager1",
            Email = "manager1@example.com",
            EmailConfirmed = true
        };

        string managerPassword = "Manager@123";
        var _managerUser = await userManager.FindByNameAsync("manager1");

        if (_managerUser == null)
        {
            var createManager = await userManager.CreateAsync(managerUser, managerPassword);
            if (createManager.Succeeded)
            {
                await userManager.AddToRoleAsync(managerUser, "Manager");
            }
        }
    }
}