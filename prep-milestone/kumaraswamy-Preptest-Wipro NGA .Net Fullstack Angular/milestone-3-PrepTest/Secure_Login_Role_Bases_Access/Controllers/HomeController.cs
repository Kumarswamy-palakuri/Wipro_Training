using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Secure_Login_Role_Bases_Access.Models;

namespace Secure_Login_Role_Bases_Access.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index() => View();
        public IActionResult Error() => View();
    }
}
