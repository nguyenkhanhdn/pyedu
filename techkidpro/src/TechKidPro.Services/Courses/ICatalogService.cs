using System.Collections.Generic;
using System.Threading.Tasks;
using TechKidPro.Core.Entities.Catalog;

namespace TechKidPro.Services.Courses
{
    public interface ICatalogService
    {
        Task<IList<Category>> GetCategoriesAsync();
        Task<IList<Course>> GetPublishedAsync(string categorySlug = null);
        /// <summary>Course Published kèm Sections và các Lesson Published, đã sắp thứ tự; null nếu không có.</summary>
        Task<Course> GetPublishedDetailAsync(string slug);
    }
}
