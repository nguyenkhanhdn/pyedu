using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;
using TechKidPro.Web.Controllers;
using TechKidPro.Web.Models;

namespace TechKidPro.Web.Areas.Student.Controllers
{
    [Authorize(Roles = "Student,Admin")]
    public class CoursesController : AppController
    {
        public ActionResult Index() { return RedirectToAction("Index", "Dashboard"); }

        public async Task<ActionResult> Learn(string slug, int? lessonId)
        {
            var course = await Catalog.GetPublishedDetailAsync(slug);
            if (course == null) return HttpNotFound();

            var isAdminPreview = User.IsInRole("Admin");
            if (!isAdminPreview && !await Access.CanAccessCourseAsync(CurrentUserId, course.Id))
            {
                TempData["Error"] = "Bạn cần đăng ký khóa học để vào học.";
                return RedirectToAction("Details", "Catalog", new { area = "", slug });
            }

            var lessons = course.Sections.SelectMany(s => s.Lessons).ToList();
            var progress = await Progress.GetCourseProgressAsync(CurrentUserId, course.Id);
            var current = lessons.FirstOrDefault(l => l.Id == lessonId)
                ?? lessons.FirstOrDefault(l => !progress.CompletedLessonIds.Contains(l.Id))
                ?? lessons.FirstOrDefault();

            var vm = new LearnViewModel { Course = course, Progress = progress };
            if (current != null)
            {
                var full = await CourseAdmin.GetLessonAsync(current.Id);
                vm.Lesson = current;
                vm.Contents = full.Contents;
                var i = lessons.IndexOf(current);
                vm.Previous = i > 0 ? lessons[i - 1] : null;
                vm.Next = i + 1 < lessons.Count ? lessons[i + 1] : null;
            }
            ViewBag.VideoProvider = VideoProvider;
            return View(vm);
        }

        [HttpPost, ValidateAntiForgeryToken]
        public async Task<ActionResult> Complete(string slug, int lessonId, int? nextLessonId)
        {
            var course = await Catalog.GetPublishedDetailAsync(slug);
            if (course == null) return HttpNotFound();
            if (!await Access.CanAccessCourseAsync(CurrentUserId, course.Id)) return new HttpStatusCodeResult(403);
            // Chống đánh dấu bài của course khác.
            if (!course.Sections.SelectMany(s => s.Lessons).Any(l => l.Id == lessonId)) return HttpNotFound();
            await Progress.MarkCompleteAsync(CurrentUserId, lessonId);
            return RedirectToAction("Learn", new { slug, lessonId = nextLessonId ?? lessonId });
        }
    }
}
