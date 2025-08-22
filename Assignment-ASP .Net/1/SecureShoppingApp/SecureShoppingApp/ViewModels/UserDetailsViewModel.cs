using SecureShoppingApp.Models;

namespace SecureShoppingApp.ViewModels
{
    public class UserDetailsViewModel
    {
        public ApplicationUser User { get; set; } = null!;
        public List<string> Roles { get; set; } = new();
        public List<Order> Orders { get; set; } = new();
    }
}
