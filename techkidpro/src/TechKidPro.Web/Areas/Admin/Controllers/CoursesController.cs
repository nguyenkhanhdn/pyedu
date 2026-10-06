using System;
using System.Threading.Tasks;
using System.Web.Mvc;
using TechKidPro.Core.Enums;
using TechKidPro.Services.Courses;
using TechKidPro.Web.Controllers;
using TechKidPro.Web.Models;
using System.Linq;

namespace TechKidPro.Web.Areas.Admin.Controllers
{
    [Authorize(Roles = "Admin")]
    public class CoursesController : AppController
    {
        public async Task<ActionResult> Index()
        {
            return View(await CourseAdmin.ListAsync());
        }

        [HttpGet]
        public async Task<ActionResult> Create()
        {
            return View(new CourseEditViewModel { AllCategories = await Catalog.GetCategoriesAsync() });
        }

        [HttpPost, ValidateAntiForgeryToken]
        public async Task<ActionResult> Create(CourseEditViewModel m)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var c = await CourseAdmin.CreateAsync(m.Title, m.Slug, m.Summary, m.CategoryIds);
                    return RedirectToAction("Curriculum", new { id = c.Id });
                }
                catch (InvalidOperationException ex) { ModelState.AddModelError("", ex.Message); }
            }
            m.AllCategories = await Catalog.GetCategoriesAsync();
            return View(m);
        }

        [HttpGet]
        public async Task<ActionResult> Edit(int id)
        {
            var c = await CourseAdmin.GetAsync(id);
            if (c == null) return HttpNotFound();
            return View(new CourseEditViewModel
            {
                Id = c.Id, Title = c.Title, Slug = c.Slug, Summary = c.Summary, ThumbnailUrl = c.ThumbnailUrl,
                CategoryIds = c.Categories.Select(x => x.CategoryId).ToArray(),
                AllCategories = await Catalog.GetCategoriesAsync()
            });
        }

        [HttpPost, ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit(CourseEditViewModel m)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    await CourseAdmin.UpdateAsync(m.Id, m.Title, m.Slug, m.Summary, m.ThumbnailUrl, m.CategoryIds);
                    TempData["Message"] = "Đã lưu.";
                    return RedirectToAction("Curriculum", new { id = m.Id });
                }
                catch (InvalidOperationException ex) { ModelState.AddModelError("", ex.Message); }
            }
            m.AllCategories = await Catalog.GetCategoriesAsync();
            return View(m);
        }

        [HttpPost, ValidateAntiForgeryToken]
        public Task<ActionResult> SetStatus(int id, PublishStatus status)
        {
            return Run(id, () => CourseAdmin.SetStatusAsync(id, status), "Đã cập nhật trạng thái khóa học.");
        }

        public async Task<ActionResult> Curriculum(int id)
        {
            var c = await CourseAdmin.GetAsync(id);
            if (c == null) return HttpNotFound();
            return View(c);
        }

        [HttpPost, ValidateAntiForgeryToken]
        public Task<ActionResult> AddSection(int id, string title)
        {
            return Run(id, () => CourseAdmin.AddSectionAsync(id, title), "Đã thêm chương.");
        }

        [HttpPost, ValidateAntiForgeryToken]
        public Task<ActionResult> UpdateSection(int id, int sectionId, string title, int sortOrder)
        {
            return Run(id, () => CourseAdmin.UpdateSectionAsync(sectionId, title, sortOrder), "Đã lưu chương.");
        }

        [HttpPost, ValidateAntiForgeryToken]
        public Task<ActionResult> DeleteSection(int id, int sectionId)
        {
            return Run(id, () => CourseAdmin.DeleteSectionAsync(sectionId), "Đã xóa chương.");
        }

        [HttpPost, ValidateAntiForgeryToken]
        public Task<ActionResult> AddLesson(int id, int sectionId, string title)
        {
            return Run(id, () => CourseAdmin.AddLessonAsync(sectionId, title), "Đã thêm bài học (Draft).");
        }

        [HttpPost, ValidateAntiForgeryToken]
        public Task<ActionResult> DeleteLesson(int id, int lessonId)
        {
            return Run(id, () => CourseAdmin.DeleteLessonAsync(lessonId), "Đã xóa bài học.");
        }

        [HttpGet]
        public async Task<ActionResult> Lesson(int id)
        {
            var l = await CourseAdmin.GetLessonAsync(id);
            if (l == null) return HttpNotFound();
            return View(new LessonEditViewModel
            {
                Id = l.Id, CourseId = l.Section.CourseId, Title = l.Title, SortOrder = l.SortOrder, Status = l.Status, Contents = l.Contents.ToList()
            });
        }

        [HttpPost, ValidateAntiForgeryToken]
        public async Task<ActionResult> Lesson(LessonEditViewModel m)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    await CourseAdmin.UpdateLessonAsync(m.Id, m.Title, m.SortOrder, m.Status);
                    TempData["Message"] = "Đã lưu bài học.";
                }
                catch (InvalidOperationException ex) { TempData["Error"] = ex.Message; }
            }
            return RedirectToAction("Lesson", new { id = m.Id });
        }

        [HttpPost, ValidateAntiForgeryToken]
        public async Task<ActionResult> AddContent(int id, LessonBlockType type, string text, string url, string title, string language, int? assessmentId)
        {
            try
            {
                await CourseAdmin.AddContentAsync(id, type, new LessonBlockData { Text = text, Url = url, Title = title, Language = language, AssessmentId = assessmentId });
                TempData["Message"] = "Đã thêm nội dung.";
            }
            catch (InvalidOperationException ex) { TempData["Error"] = ex.Message; }
            return RedirectToAction("Lesson", new { id });
        }

        [HttpPost, ValidateAntiForgeryToken]
        public async Task<ActionResult> DeleteContent(int id, int contentId)
        {
            await CourseAdmin.DeleteContentAsync(contentId);
            return RedirectToAction("Lesson", new { id });
        }

        private async Task<ActionResult> Run(int courseId, Func<Task> action, string okMessage)
        {
            try { await action(); TempData["Message"] = okMessage; }
            catch (InvalidOperationException ex) { TempData["Error"] = ex.Message; }
            return RedirectToAction("Curriculum", new { id = courseId });
        }
    }
}
