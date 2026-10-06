using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;
using TechKidPro.Web.Controllers;
using TechKidPro.Web.Models;

namespace TechKidPro.Web.Areas.Student.Controllers
{
    [Authorize(Roles = "Student")]
    public class DashboardController : AppController
    {
        public async Task<ActionResult> Index()
        {
            var enrollments = await Enrollments.GetActiveForUserAsync(CurrentUserId);
            var percents = await Progress.GetPercentByCourseAsync(CurrentUserId, enrollments.Select(e => e.CourseId));
            return View(enrollments.Select(e => new MyCourseItem { Course = e.Course, Percent = percents[e.CourseId] }).ToList());
        }
    }
}
