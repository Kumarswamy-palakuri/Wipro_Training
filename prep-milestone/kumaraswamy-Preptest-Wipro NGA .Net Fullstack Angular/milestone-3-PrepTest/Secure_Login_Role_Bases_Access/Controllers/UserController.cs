using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Secure_Login_Role_Bases_Access.Controllers
{
    [Authorize(Roles = "User,Admin")]
    public class UserController : Controller
    {
        private readonly UserManager<IdentityUser> _userManager;

        public UserController(UserManager<IdentityUser> userManager)
        {
            _userManager = userManager;
        }

        public async Task<IActionResult> Profile()
        {
            var user = await _userManager.GetUserAsync(User);
            ViewBag.Message = user != null && await _userManager.IsInRoleAsync(user, "User")
                ? "Welcome, User! Here is your profile information."
                : "Welcome! Here is your profile information.";
            return View(user);
        }
    }
}
