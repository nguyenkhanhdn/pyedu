using System.Web.Mvc;

namespace TechKidPro.Web.Areas.Admin.Controllers
{
    [Authorize(Roles = "Admin")]
    public class DashboardController : Controller
    {
        public ActionResult Index() { return View(); }
    }
}
