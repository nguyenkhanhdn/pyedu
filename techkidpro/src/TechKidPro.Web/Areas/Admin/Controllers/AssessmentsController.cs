using System;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;
using TechKidPro.Core.Enums;
using TechKidPro.Web.Controllers;
using TechKidPro.Web.Models;

namespace TechKidPro.Web.Areas.Admin.Controllers
{
    [Authorize(Roles = "Admin")]
    public class AssessmentsController : AppController
    {
        public async Task<ActionResult> Index(int? courseId)
        {
            ViewBag.Courses = await CourseAdmin.ListAsync();
            return View(await AssessmentAdmin.ListAsync(courseId));
        }

        [HttpGet]
        public async Task<ActionResult> Create(int? courseId)
        {
            return View(new AssessmentFormViewModel { CourseId = courseId ?? 0, Courses = await CourseAdmin.ListAsync() });
        }

        [HttpPost, ValidateAntiForgeryToken]
        public async Task<ActionResult> Create(AssessmentFormViewModel m)
        {
            if (ModelState.IsValid)
            {
                try { var a = await AssessmentAdmin.CreateAsync(m.ToInput()); return RedirectToAction("Edit", new { id = a.Id }); }
                catch (InvalidOperationException ex) { ModelState.AddModelError("", ex.Message); }
            }
            m.Courses = await CourseAdmin.ListAsync();
            return View(m);
        }

        [HttpGet]
        public async Task<ActionResult> Edit(int id) { return await EditView(id, null); }

        [HttpPost, ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit(AssessmentFormViewModel m)
        {
            if (ModelState.IsValid)
            {
                try { await AssessmentAdmin.UpdateAsync(m.Id, m.ToInput()); TempData["Message"] = "Đã lưu."; return RedirectToAction("Edit", new { id = m.Id }); }
                catch (InvalidOperationException ex) { ModelState.AddModelError("", ex.Message); }
            }
            return await EditView(m.Id, m);
        }

        [HttpPost, ValidateAntiForgeryToken]
        public async Task<ActionResult> SetStatus(int id, PublishStatus status)
        {
            try { await AssessmentAdmin.SetStatusAsync(id, status); TempData["Message"] = "Đã cập nhật trạng thái."; }
            catch (InvalidOperationException ex) { TempData["Error"] = ex.Message; }
            return RedirectToAction("Edit", new { id });
        }

        [HttpPost, ValidateAntiForgeryToken]
        public async Task<ActionResult> AddQuestions(int id, int[] questionIds)
        {
            await AssessmentAdmin.AddQuestionsAsync(id, questionIds);
            return RedirectToAction("Edit", new { id });
        }

        [HttpPost, ValidateAntiForgeryToken]
        public async Task<ActionResult> RemoveQuestion(int id, int questionId)
        {
            try { await AssessmentAdmin.RemoveQuestionAsync(id, questionId); }
            catch (InvalidOperationException ex) { TempData["Error"] = ex.Message; }
            return RedirectToAction("Edit", new { id });
        }

        private async Task<ActionResult> EditView(int id, AssessmentFormViewModel form)
        {
            var a = await AssessmentAdmin.GetAsync(id);
            if (a == null) return HttpNotFound();
            if (form == null)
                form = new AssessmentFormViewModel
                {
                    Id = a.Id, CourseId = a.CourseId, Title = a.Title, Description = a.Description, Type = a.Type,
                    TimeLimitMinutes = a.TimeLimitMinutes, PassPercent = a.PassPercent, MaxAttempts = a.MaxAttempts,
                    ShuffleQuestions = a.ShuffleQuestions, ShowAnswersAfterSubmit = a.ShowAnswersAfterSubmit
                };
            form.Courses = await CourseAdmin.ListAsync();
            var used = a.Questions.Select(q => q.QuestionId).ToList();
            var available = (await Questions.ListAsync(a.CourseId, null, PublishStatus.Published)).Where(q => !used.Contains(q.Id)).ToList();
            return View("Edit", new AssessmentEditViewModel { Form = form, Assessment = a, Available = available });
        }
    }
}
