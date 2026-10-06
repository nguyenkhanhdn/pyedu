using System.Web.Mvc;

namespace TechKidPro.Web.Controllers
{
    public class HomeController : Controller
    {
        [AllowAnonymous]
        public ActionResult Index()
        {
            if (User.Identity.IsAuthenticated && User.IsInRole("Admin")) return RedirectToAction("Index", "Dashboard", new { area = "Admin" });
            if (User.Identity.IsAuthenticated && User.IsInRole("Mentor")) return RedirectToAction("Index", "Dashboard", new { area = "Mentor" });
            if (User.Identity.IsAuthenticated) return RedirectToAction("Index", "Dashboard", new { area = "Student" });
            return View();
        }
    }
}
