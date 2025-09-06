
using Microsoft.AspNetCore.Identity;
using kumaraswamy_Preptest_Wipro_NGA_.Net_Fullstack_Angular_.Models;

namespace kumaraswamy_Preptest_Wipro_NGA_.Net_Fullstack_Angular_.Data
{
    public static class SeedData
    {
        public static async Task InitializeAsync(IServiceProvider serviceProvider)
        {
            var userManager = serviceProvider.GetRequiredService<UserManager<ApplicationUser>>();
            var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();

            // Ensure roles
            if (!await roleManager.RoleExistsAsync("Admin"))
                await roleManager.CreateAsync(new IdentityRole("Admin"));
            if (!await roleManager.RoleExistsAsync("User"))
                await roleManager.CreateAsync(new IdentityRole("User"));

            // Admin user
            var admin = await userManager.FindByNameAsync("admin");
            if (admin == null)
            {
                admin = new ApplicationUser { UserName = "admin", Email = "admin@test.com" };
                await userManager.CreateAsync(admin, "Admin@123");
                await userManager.AddToRoleAsync(admin, "Admin");
            }

            // Normal user
            var user = await userManager.FindByNameAsync("user1");
            if (user == null)
            {
                user = new ApplicationUser { UserName = "user1", Email = "user1@test.com" };
                await userManager.CreateAsync(user, "User@123");
                await userManager.AddToRoleAsync(user, "User");
            }
        }
    }
}
