using System.Threading.Tasks;
using System.Web.Mvc;
using TechKidPro.Core.Enums;
using TechKidPro.Web.Models;

namespace TechKidPro.Web.Controllers
{
    [AllowAnonymous]
    public class CatalogController : AppController
    {
        public async Task<ActionResult> Index(string category)
        {
            return View(new CatalogIndexViewModel
            {
                Categories = await Catalog.GetCategoriesAsync(),
                Courses = await Catalog.GetPublishedAsync(category),
                CategorySlug = category
            });
        }

        public async Task<ActionResult> Details(string slug)
        {
            var course = await Catalog.GetPublishedDetailAsync(slug);
            if (course == null) return HttpNotFound();
            var enrolled = User.Identity.IsAuthenticated && await Enrollments.IsEnrolledAsync(CurrentUserId, course.Id);
            return View(new CourseDetailsViewModel { Course = course, IsEnrolled = enrolled });
        }

        /// <summary>Phase 2: đăng ký miễn phí. Phase 5 thay bằng Order → Payment → Enrollment.</summary>
        [HttpPost, ValidateAntiForgeryToken, Authorize(Roles = RoleNames.Student)]
        public async Task<ActionResult> Enroll(int courseId, string slug)
        {
            try
            {
                await Enrollments.EnrollAsync(CurrentUserId, courseId);
                TempData["Message"] = "Đã đăng ký khóa học. Chúc bạn học tốt!";
                return RedirectToAction("Learn", "Courses", new { area = "Student", slug });
            }
            catch (System.InvalidOperationException ex)
            {
                TempData["Error"] = ex.Message;
                return RedirectToAction("Details", new { slug });
            }
        }
    }
}
