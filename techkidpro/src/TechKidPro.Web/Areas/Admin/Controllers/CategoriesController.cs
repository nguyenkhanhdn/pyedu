using System;
using System.Threading.Tasks;
using System.Web.Mvc;
using TechKidPro.Web.Controllers;

namespace TechKidPro.Web.Areas.Admin.Controllers
{
    [Authorize(Roles = "Admin")]
    public class CategoriesController : AppController
    {
        public async Task<ActionResult> Index() { return View(await Catalog.GetCategoriesAsync()); }

        [HttpPost, ValidateAntiForgeryToken]
        public async Task<ActionResult> Create(string name, string slug)
        {
            try { await CourseAdmin.CreateCategoryAsync(name, slug); TempData["Message"] = "Đã thêm danh mục."; }
            catch (InvalidOperationException ex) { TempData["Error"] = ex.Message; }
            return RedirectToAction("Index");
        }
    }
}
