using System.Collections.Generic;
using System.Threading.Tasks;
using TechKidPro.Core.Entities.Catalog;
using TechKidPro.Core.Enums;

namespace TechKidPro.Services.Courses
{
    public interface ICourseAdminService
    {
        Task<IList<Course>> ListAsync();
        /// <summary>Course đầy đủ (mọi trạng thái) kèm Sections/Lessons/Contents/Categories, đã sắp thứ tự.</summary>
        Task<Course> GetAsync(int id);
        Task<Course> CreateAsync(string title, string slug, string summary, IEnumerable<int> categoryIds);
        Task UpdateAsync(int id, string title, string slug, string summary, string thumbnailUrl, IEnumerable<int> categoryIds);
        /// <summary>Publish yêu cầu ≥ 1 Lesson Published; vi phạm → InvalidOperationException.</summary>
        Task SetStatusAsync(int id, PublishStatus status);

        Task<Category> CreateCategoryAsync(string name, string slug);

        Task<CourseSection> AddSectionAsync(int courseId, string title);
        Task UpdateSectionAsync(int sectionId, string title, int sortOrder);
        Task DeleteSectionAsync(int sectionId);

        Task<Lesson> AddLessonAsync(int sectionId, string title);
        Task<Lesson> GetLessonAsync(int lessonId);
        Task UpdateLessonAsync(int lessonId, string title, int sortOrder, PublishStatus status);
        /// <summary>Không xóa được bài đã có tiến độ học (hãy Archive).</summary>
        Task DeleteLessonAsync(int lessonId);

        Task<LessonContent> AddContentAsync(int lessonId, LessonBlockType type, LessonBlockData data);
        Task DeleteContentAsync(int contentId);
    }
}
