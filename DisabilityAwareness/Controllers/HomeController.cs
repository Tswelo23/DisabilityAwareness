using System.Diagnostics;
using DisabilityAwareness.Models;
using Microsoft.AspNetCore.Mvc;

namespace DisabilityAwareness.Controllers
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

        public IActionResult Types()
        {
            return View();
        }

        public IActionResult Services()
        {
            return View();
        }

        public IActionResult Resources()
        {
            return View();
        }

        public IActionResult Inclusion()
        {
            return View();
        }

        public IActionResult Accessibility()
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
