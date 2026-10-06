using System.Collections.Generic;
using System.Threading.Tasks;
using TechKidPro.Core.Entities.Catalog;

namespace TechKidPro.Services.Courses
{
    public interface ICourseService
    {
        Task<IList<Course>> GetPublishedAsync();
        Task<Course> GetBySlugAsync(string slug);
    }
}
