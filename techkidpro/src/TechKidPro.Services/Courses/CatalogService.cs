using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using TechKidPro.Core.Entities.Catalog;
using TechKidPro.Core.Enums;
using TechKidPro.Data;

namespace TechKidPro.Services.Courses
{
    public class CatalogService : ICatalogService
    {
        private readonly ApplicationDbContext _db;
        public CatalogService(ApplicationDbContext db) { _db = db; }

        public async Task<IList<Category>> GetCategoriesAsync()
        {
            return await _db.Categories.OrderBy(c => c.Name).ToListAsync();
        }

        public async Task<IList<Course>> GetPublishedAsync(string categorySlug = null)
        {
            var q = _db.Courses.Where(c => c.Status == PublishStatus.Published);
            if (!string.IsNullOrEmpty(categorySlug))
                q = q.Where(c => c.Categories.Any(cc => cc.Category.Slug == categorySlug));
            return await q.OrderBy(c => c.Title).ToListAsync();
        }

        public async Task<Course> GetPublishedDetailAsync(string slug)
        {
            var course = await _db.Courses
                .Include(c => c.Sections.Select(s => s.Lessons))
                .FirstOrDefaultAsync(c => c.Slug == slug && c.Status == PublishStatus.Published);
            if (course == null) return null;
            FilterAndSort(course, publishedOnly: true);
            return course;
        }

        internal static void FilterAndSort(Course course, bool publishedOnly)
        {
            var sections = course.Sections.OrderBy(s => s.SortOrder).ThenBy(s => s.Id).ToList();
            course.Sections = sections;
            foreach (var s in sections)
            {
                var lessons = s.Lessons.Where(l => !publishedOnly || l.Status == PublishStatus.Published)
                    .OrderBy(l => l.SortOrder).ThenBy(l => l.Id).ToList();
                s.Lessons = lessons;
            }
        }
    }
}
