using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Secure_Login_Role_Bases_Access.Controllers
{
    [Authorize(Roles = "Admin")]
    public class AdminController : Controller
    {
            private readonly UserManager<IdentityUser> _userManager;

            public AdminController(UserManager<IdentityUser> userManager)
            {
                _userManager = userManager;
            }

            public async Task<IActionResult> Dashboard()
            {
                var users = _userManager.Users.ToList();
                ViewBag.Message = "Welcome, Admin! You have access to the Admin Dashboard.";
                return View(users);
            }
        
    }

}
