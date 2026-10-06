using System.Web.Mvc;

namespace TechKidPro.Web.Areas.Mentor.Controllers
{
    [Authorize(Roles = "Mentor")]
    public class DashboardController : Controller
    {
        public ActionResult Index() { return View(); }
    }
}
