using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Tasker.Controllers;

public class HomeController : Controller
{
    public IActionResult Index() => View();

    [Authorize] // must be authenticated
    public IActionResult Dashboard() => View();
}
