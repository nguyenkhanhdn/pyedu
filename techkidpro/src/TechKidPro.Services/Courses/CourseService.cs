using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using TechKidPro.Core.Entities.Catalog;
using TechKidPro.Core.Enums;
using TechKidPro.Data;

namespace TechKidPro.Services.Courses
{
    public class CourseService : ICourseService
    {
        private readonly ApplicationDbContext _db;
        public CourseService(ApplicationDbContext db) { _db = db; }

        public async Task<IList<Course>> GetPublishedAsync()
        {
            return await _db.Courses.Where(c => c.Status == PublishStatus.Published).OrderBy(c => c.Title).ToListAsync();
        }

        public Task<Course> GetBySlugAsync(string slug)
        {
            return _db.Courses.FirstOrDefaultAsync(c => c.Slug == slug && c.Status == PublishStatus.Published);
        }
    }
}
