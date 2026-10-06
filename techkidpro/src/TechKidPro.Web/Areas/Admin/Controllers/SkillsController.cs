using System;
using System.Threading.Tasks;
using System.Web.Mvc;
using TechKidPro.Web.Controllers;

namespace TechKidPro.Web.Areas.Admin.Controllers
{
    [Authorize(Roles = "Admin")]
    public class SkillsController : AppController
    {
        public async Task<ActionResult> Index()
        {
            ViewBag.Courses = await CourseAdmin.ListAsync();
            ViewBag.Categories = await Skills.GetCategoriesAsync();
            return View(await Skills.GetAllAsync());
        }

        [HttpPost, ValidateAntiForgeryToken]
        public async Task<ActionResult> CreateCategory(string name)
        {
            try { await Skills.CreateCategoryAsync(name); TempData["Message"] = "Đã thêm nhóm kỹ năng."; }
            catch (InvalidOperationException ex) { TempData["Error"] = ex.Message; }
            return RedirectToAction("Index");
        }

        [HttpPost, ValidateAntiForgeryToken]
        public async Task<ActionResult> CreateSkill(string name, string code, int? courseId, int? categoryId)
        {
            try { await Skills.CreateSkillAsync(name, code, courseId, categoryId); TempData["Message"] = "Đã thêm kỹ năng."; }
            catch (InvalidOperationException ex) { TempData["Error"] = ex.Message; }
            return RedirectToAction("Index");
        }
    }
}
