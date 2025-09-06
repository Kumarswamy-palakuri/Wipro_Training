using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace kumaraswamy_Preptest_Wipro_NGA_.Net_Fullstack_Angular_.Controllers
{
    [Authorize(Roles = "User,Admin")]
    public class UserController : Controller
    {
        public IActionResult Profile()
        {
            ViewBag.Message = "Welcome, User! Here is your profile information.";
            return View();
        }
    }
}
