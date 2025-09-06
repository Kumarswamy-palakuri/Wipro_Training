using System.Diagnostics;
using kumaraswamy_Preptest_Wipro_NGA_.Net_Fullstack_Angular_.Models;
using Microsoft.AspNetCore.Mvc;

namespace kumaraswamy_Preptest_Wipro_NGA_.Net_Fullstack_Angular_.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
