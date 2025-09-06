using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using kumaraswamy_Preptest_Wipro_NGA_.Net_Fullstack_Angular_.Models;
using kumaraswamy_Preptest_Wipro_NGA_.Net_Fullstack_Angular_.ViewModels;

namespace kumaraswamy_Preptest_Wipro_NGA_.Net_Fullstack_Angular_.Controllers
{
    [Authorize(Roles = "Admin")]
    public class AdminController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public AdminController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        public IActionResult Dashboard()
        {
            var model = new AdminDashboardViewModel
            {
                Users = _userManager.Users.Select(u => u.UserName).ToList()
            };
            return View(model);
        }
    }
}
