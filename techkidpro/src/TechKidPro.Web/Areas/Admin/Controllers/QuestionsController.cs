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
    public class QuestionsController : AppController
    {
        public async Task<ActionResult> Index(int? courseId, int? skillId)
        {
            ViewBag.Courses = await CourseAdmin.ListAsync();
            ViewBag.Skills = await Skills.GetAllAsync();
            ViewBag.CourseId = courseId;
            ViewBag.SkillId = skillId;
            return View(await Questions.ListAsync(courseId, skillId));
        }

        [HttpGet]
        public async Task<ActionResult> Create(int? courseId)
        {
            return View("Form", await Prepare(new QuestionFormViewModel { CourseId = courseId, OptionTexts = new string[QuestionFormViewModel.OptionRows] }));
        }

        [HttpPost, ValidateAntiForgeryToken]
        public async Task<ActionResult> Create(QuestionFormViewModel m)
        {
            if (ModelState.IsValid)
            {
                try { await Questions.CreateAsync(m.ToInput()); TempData["Message"] = "Đã tạo câu hỏi."; return RedirectToAction("Index", new { courseId = m.CourseId }); }
                catch (InvalidOperationException ex) { ModelState.AddModelError("", ex.Message); }
            }
            return View("Form", await Prepare(m));
        }

        [HttpGet]
        public async Task<ActionResult> Edit(int id)
        {
            var q = await Questions.GetAsync(id);
            if (q == null) return HttpNotFound();
            var vm = QuestionFormViewModel.FromQuestion(q);
            vm.OptionsLocked = await Questions.HasAnswersAsync(id);
            return View("Form", await Prepare(vm));
        }

        [HttpPost, ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit(QuestionFormViewModel m)
        {
            if (ModelState.IsValid)
            {
                try { await Questions.UpdateAsync(m.Id, m.ToInput()); TempData["Message"] = "Đã lưu câu hỏi."; return RedirectToAction("Index", new { courseId = m.CourseId }); }
                catch (InvalidOperationException ex) { ModelState.AddModelError("", ex.Message); }
            }
            m.OptionsLocked = await Questions.HasAnswersAsync(m.Id);
            return View("Form", await Prepare(m));
        }

        [HttpPost, ValidateAntiForgeryToken]
        public async Task<ActionResult> SetStatus(int id, PublishStatus status, int? courseId)
        {
            try { await Questions.SetStatusAsync(id, status); }
            catch (InvalidOperationException ex) { TempData["Error"] = ex.Message; }
            return RedirectToAction("Index", new { courseId });
        }

        private async Task<QuestionFormViewModel> Prepare(QuestionFormViewModel m)
        {
            m.Courses = await CourseAdmin.ListAsync();
            m.AllSkills = await Skills.GetAllAsync();
            var texts = (m.OptionTexts ?? new string[0]).ToList();
            while (texts.Count < QuestionFormViewModel.OptionRows) texts.Add(null);
            m.OptionTexts = texts.ToArray();
            return m;
        }
    }
}
