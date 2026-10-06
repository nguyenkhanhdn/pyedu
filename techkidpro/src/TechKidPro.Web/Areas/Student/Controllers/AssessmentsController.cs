using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;
using TechKidPro.Web.Controllers;

namespace TechKidPro.Web.Areas.Student.Controllers
{
    [Authorize(Roles = "Student")]
    public class AssessmentsController : AppController
    {
        public async Task<ActionResult> Index(string slug)
        {
            var course = await Catalog.GetPublishedDetailAsync(slug);
            if (course == null) return HttpNotFound();
            if (!await Access.CanAccessCourseAsync(CurrentUserId, course.Id))
                return RedirectToAction("Details", "Catalog", new { area = "", slug });
            ViewBag.Course = course;
            return View(await Assessments.GetPublishedForCourseAsync(course.Id));
        }

        public async Task<ActionResult> Intro(int id)
        {
            var a = await Assessments.GetPublishedAsync(id);
            if (a == null) return HttpNotFound();
            if (!await Access.CanTakeAssessmentAsync(CurrentUserId, id)) return NoAccess();
            ViewBag.Attempts = await Assessments.GetAttemptsAsync(CurrentUserId, id);
            return View(a);
        }

        [HttpPost, ValidateAntiForgeryToken]
        public async Task<ActionResult> Start(int id)
        {
            if (!await Access.CanTakeAssessmentAsync(CurrentUserId, id)) return NoAccess();
            try
            {
                var attempt = await Assessments.StartAsync(CurrentUserId, id);
                return RedirectToAction("Take", new { attemptId = attempt.Id });
            }
            catch (InvalidOperationException ex)
            {
                TempData["Error"] = ex.Message;
                return RedirectToAction("Intro", new { id });
            }
        }

        public async Task<ActionResult> Take(int attemptId)
        {
            var model = await Assessments.GetTakeModelAsync(CurrentUserId, attemptId);
            if (model == null) return RedirectToAction("Result", new { attemptId });
            return View(model);
        }

        [HttpPost, ValidateAntiForgeryToken]
        public async Task<ActionResult> Submit(int attemptId)
        {
            // Form: q_{questionId} = optionId (có thể nhiều giá trị). Server chỉ nhận id hợp lệ thuộc câu hỏi.
            var answers = new Dictionary<int, int[]>();
            foreach (var key in Request.Form.AllKeys.Where(k => k != null && k.StartsWith("q_")))
            {
                int qid;
                if (!int.TryParse(key.Substring(2), out qid)) continue;
                answers[qid] = (Request.Form.GetValues(key) ?? new string[0])
                    .Select(v => { int o; return int.TryParse(v, out o) ? o : -1; }).Where(o => o > 0).ToArray();
            }
            try
            {
                await Assessments.SubmitAsync(CurrentUserId, attemptId, answers);
            }
            catch (InvalidOperationException ex) { TempData["Error"] = ex.Message; }
            return RedirectToAction("Result", new { attemptId });
        }

        public async Task<ActionResult> Result(int attemptId)
        {
            var result = await Assessments.GetResultAsync(CurrentUserId, attemptId);
            if (result == null) return HttpNotFound();
            return View(result);
        }

        private ActionResult NoAccess()
        {
            TempData["Error"] = "Bạn cần đăng ký khóa học để làm bài kiểm tra này.";
            return RedirectToAction("Index", "Catalog", new { area = "" });
        }
    }
}
