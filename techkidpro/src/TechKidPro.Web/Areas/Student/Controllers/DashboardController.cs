using System.Web.Mvc;

namespace TechKidPro.Web.Areas.Student.Controllers
{
    [Authorize(Roles = "Student")]
    public class DashboardController : Controller
    {
        public ActionResult Index() { return View(); }
    }
}
