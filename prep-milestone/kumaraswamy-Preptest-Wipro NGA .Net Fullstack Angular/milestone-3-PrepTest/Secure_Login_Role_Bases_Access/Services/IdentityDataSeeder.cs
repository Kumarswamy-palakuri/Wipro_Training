using Microsoft.AspNetCore.Identity;

namespace Secure_Login_Role_Bases_Access.Services
{
    public class IdentityDataSeeder
    {
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly UserManager<IdentityUser> _userManager;

        public IdentityDataSeeder(RoleManager<IdentityRole> roleManager, UserManager<IdentityUser> userManager)
        {
            _roleManager = roleManager;
            _userManager = userManager;
        }

        public async Task SeedAsync()
        {
            string[] roles = new[] { "Admin", "User" };
            foreach (var role in roles)
            {
                if (!await _roleManager.RoleExistsAsync(role))
                    await _roleManager.CreateAsync(new IdentityRole(role));
            }

            // Admin user
            var admin = await _userManager.FindByNameAsync("admin");
            if (admin == null)
            {
                admin = new IdentityUser { UserName = "admin", Email = "admin@example.com", EmailConfirmed = true };
                await _userManager.CreateAsync(admin, "Admin@123"); // sample password
                await _userManager.AddToRoleAsync(admin, "Admin");
            }

            // Normal user
            var user1 = await _userManager.FindByNameAsync("user1");
            if (user1 == null)
            {
                user1 = new IdentityUser { UserName = "user1", Email = "user1@example.com", EmailConfirmed = true };
                await _userManager.CreateAsync(user1, "User@123");
                await _userManager.AddToRoleAsync(user1, "User");
            }
        }
    }
}
