using SecureShoppingApp.Models;
using SecureShoppingApp.ViewModels;

namespace SecureShoppingApp.Services
{
    public interface IUserService
    {
        Task<bool> RegisterUserAsync(RegisterViewModel model);
        Task<bool> LoginUserAsync(LoginViewModel model);
        Task LogoutUserAsync();
        Task<ApplicationUser?> GetCurrentUserAsync();
        Task<bool> IsInRoleAsync(ApplicationUser user, string role);
    }
}