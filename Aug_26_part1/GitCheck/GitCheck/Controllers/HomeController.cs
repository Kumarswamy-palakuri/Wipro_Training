using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

public class HomeController : Controller
{
    public IActionResult Index()
    {
        return View();
    }

    [Authorize]
    public IActionResult Profile()
    {
        return View(User.Claims);
    }

    public IActionResult Login()
    {
        return Challenge(new Microsoft.AspNetCore.Authentication.AuthenticationProperties
        {
            RedirectUri = "/Home/Profile"
        }, "GitHub");
    }

    public IActionResult Logout()
    {
        return SignOut("Cookies");
    }
}
