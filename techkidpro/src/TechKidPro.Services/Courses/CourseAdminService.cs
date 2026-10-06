using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using TechKidPro.Core.Entities.Catalog;
using TechKidPro.Core.Enums;
using TechKidPro.Data;
using TechKidPro.Services.Common;

namespace TechKidPro.Services.Courses
{
    public class CourseAdminService : ICourseAdminService
    {
        private readonly ApplicationDbContext _db;
        public CourseAdminService(ApplicationDbContext db) { _db = db; }

        public async Task<IList<Course>> ListAsync()
        {
            return await _db.Courses.OrderByDescending(c => c.Id).ToListAsync();
        }

        public async Task<Course> GetAsync(int id)
        {
            var course = await _db.Courses
                .Include(c => c.Categories)
                .Include(c => c.Sections.Select(s => s.Lessons.Select(l => l.Contents)))
                .FirstOrDefaultAsync(c => c.Id == id);
            if (course == null) return null;
            CatalogService.FilterAndSort(course, publishedOnly: false);
            foreach (var l in course.Sections.SelectMany(s => s.Lessons))
                l.Contents = l.Contents.OrderBy(x => x.SortOrder).ThenBy(x => x.Id).ToList();
            return course;
        }

        public async Task<Course> CreateAsync(string title, string slug, string summary, IEnumerable<int> categoryIds)
        {
            Require(title, "Tiêu đề");
            slug = await UniqueSlugAsync(string.IsNullOrWhiteSpace(slug) ? SlugHelper.ToSlug(title) : SlugHelper.ToSlug(slug), null);
            var course = new Course { Title = title.Trim(), Slug = slug, Summary = summary, Status = PublishStatus.Draft };
            SetCategories(course, categoryIds);
            _db.Courses.Add(course);
            await _db.SaveChangesAsync();
            return course;
        }

        public async Task UpdateAsync(int id, string title, string slug, string summary, string thumbnailUrl, IEnumerable<int> categoryIds)
        {
            Require(title, "Tiêu đề");
            var course = await _db.Courses.Include(c => c.Categories).FirstOrDefaultAsync(c => c.Id == id);
            if (course == null) throw new InvalidOperationException("Không tìm thấy khóa học.");
            course.Title = title.Trim();
            course.Slug = await UniqueSlugAsync(SlugHelper.ToSlug(string.IsNullOrWhiteSpace(slug) ? title : slug), id);
            course.Summary = summary;
            course.ThumbnailUrl = UrlSafety.IsHttp(thumbnailUrl) ? thumbnailUrl : null;
            var wanted = new HashSet<int>(categoryIds ?? Enumerable.Empty<int>());
            foreach (var cc in course.Categories.Where(x => !wanted.Contains(x.CategoryId)).ToList()) _db.CourseCategories.Remove(cc);
            foreach (var cid in wanted.Where(w => course.Categories.All(x => x.CategoryId != w)))
                course.Categories.Add(new CourseCategory { CategoryId = cid });
            await _db.SaveChangesAsync();
        }

        public async Task SetStatusAsync(int id, PublishStatus status)
        {
            var course = await _db.Courses.FirstOrDefaultAsync(c => c.Id == id);
            if (course == null) throw new InvalidOperationException("Không tìm thấy khóa học.");
            if (status == PublishStatus.Published)
            {
                var hasLesson = await _db.Lessons.AnyAsync(l => l.Section.CourseId == id && l.Status == PublishStatus.Published);
                if (!hasLesson) throw new InvalidOperationException("Cần ít nhất một bài học ở trạng thái Published trước khi xuất bản khóa học.");
            }
            course.Status = status;
            await _db.SaveChangesAsync();
        }

        public async Task<Category> CreateCategoryAsync(string name, string slug)
        {
            Require(name, "Tên danh mục");
            var s = SlugHelper.ToSlug(string.IsNullOrWhiteSpace(slug) ? name : slug);
            if (await _db.Categories.AnyAsync(c => c.Slug == s)) throw new InvalidOperationException("Slug danh mục đã tồn tại.");
            var cat = new Category { Name = name.Trim(), Slug = s };
            _db.Categories.Add(cat);
            await _db.SaveChangesAsync();
            return cat;
        }

        public async Task<CourseSection> AddSectionAsync(int courseId, string title)
        {
            Require(title, "Tên chương");
            var max = await _db.CourseSections.Where(s => s.CourseId == courseId).Select(s => (int?)s.SortOrder).MaxAsync() ?? 0;
            var section = new CourseSection { CourseId = courseId, Title = title.Trim(), SortOrder = max + 1 };
            _db.CourseSections.Add(section);
            await _db.SaveChangesAsync();
            return section;
        }

        public async Task UpdateSectionAsync(int sectionId, string title, int sortOrder)
        {
            Require(title, "Tên chương");
            var s = await _db.CourseSections.FindAsync(sectionId);
            if (s == null) throw new InvalidOperationException("Không tìm thấy chương.");
            s.Title = title.Trim();
            s.SortOrder = sortOrder;
            await _db.SaveChangesAsync();
        }

        public async Task DeleteSectionAsync(int sectionId)
        {
            var s = await _db.CourseSections.Include(x => x.Lessons).FirstOrDefaultAsync(x => x.Id == sectionId);
            if (s == null) return;
            var lessonIds = s.Lessons.Select(l => l.Id).ToList();
            if (await _db.LessonProgresses.AnyAsync(p => lessonIds.Contains(p.LessonId)))
                throw new InvalidOperationException("Chương có bài đã có tiến độ học; hãy chuyển bài sang Archived thay vì xóa.");
            foreach (var l in s.Lessons.ToList())
            {
                var cs = _db.LessonContents.Where(c => c.LessonId == l.Id);
                _db.LessonContents.RemoveRange(cs);
                _db.Lessons.Remove(l);
            }
            _db.CourseSections.Remove(s);
            await _db.SaveChangesAsync();
        }

        public async Task<Lesson> AddLessonAsync(int sectionId, string title)
        {
            Require(title, "Tên bài học");
            var max = await _db.Lessons.Where(l => l.SectionId == sectionId).Select(l => (int?)l.SortOrder).MaxAsync() ?? 0;
            var lesson = new Lesson { SectionId = sectionId, Title = title.Trim(), SortOrder = max + 1, Status = PublishStatus.Draft };
            _db.Lessons.Add(lesson);
            await _db.SaveChangesAsync();
            return lesson;
        }

        public async Task<Lesson> GetLessonAsync(int lessonId)
        {
            var lesson = await _db.Lessons.Include(l => l.Section).Include(l => l.Contents).FirstOrDefaultAsync(l => l.Id == lessonId);
            if (lesson != null) lesson.Contents = lesson.Contents.OrderBy(c => c.SortOrder).ThenBy(c => c.Id).ToList();
            return lesson;
        }

        public async Task UpdateLessonAsync(int lessonId, string title, int sortOrder, PublishStatus status)
        {
            Require(title, "Tên bài học");
            var l = await _db.Lessons.FindAsync(lessonId);
            if (l == null) throw new InvalidOperationException("Không tìm thấy bài học.");
            l.Title = title.Trim();
            l.SortOrder = sortOrder;
            l.Status = status;
            await _db.SaveChangesAsync();
        }

        public async Task DeleteLessonAsync(int lessonId)
        {
            if (await _db.LessonProgresses.AnyAsync(p => p.LessonId == lessonId))
                throw new InvalidOperationException("Bài học đã có tiến độ học; hãy chuyển sang Archived thay vì xóa.");
            var l = await _db.Lessons.FindAsync(lessonId);
            if (l == null) return;
            _db.LessonContents.RemoveRange(_db.LessonContents.Where(c => c.LessonId == lessonId));
            _db.Lessons.Remove(l);
            await _db.SaveChangesAsync();
        }

        public async Task<LessonContent> AddContentAsync(int lessonId, LessonBlockType type, LessonBlockData data)
        {
            if (data == null) data = new LessonBlockData();
            switch (type)
            {
                case LessonBlockType.Text:
                case LessonBlockType.Code:
                    Require(data.Text, "Nội dung");
                    break;
                case LessonBlockType.Video:
                case LessonBlockType.Image:
                case LessonBlockType.File:
                case LessonBlockType.Embed:
                    if (!UrlSafety.IsHttp(data.Url)) throw new InvalidOperationException("URL phải bắt đầu bằng http:// hoặc https://");
                    break;
            }
            var max = await _db.LessonContents.Where(c => c.LessonId == lessonId).Select(c => (int?)c.SortOrder).MaxAsync() ?? 0;
            var content = new LessonContent { LessonId = lessonId, BlockType = type, DataJson = data.ToJson(), SortOrder = max + 1 };
            _db.LessonContents.Add(content);
            await _db.SaveChangesAsync();
            return content;
        }

        public async Task DeleteContentAsync(int contentId)
        {
            var c = await _db.LessonContents.FindAsync(contentId);
            if (c == null) return;
            _db.LessonContents.Remove(c);
            await _db.SaveChangesAsync();
        }

        private static void Require(string value, string field)
        {
            if (string.IsNullOrWhiteSpace(value)) throw new InvalidOperationException(field + " không được để trống.");
        }

        private static void SetCategories(Course course, IEnumerable<int> categoryIds)
        {
            if (categoryIds == null) return;
            foreach (var cid in categoryIds.Distinct())
                course.Categories.Add(new CourseCategory { CategoryId = cid });
        }

        private async Task<string> UniqueSlugAsync(string baseSlug, int? excludeId)
        {
            if (string.IsNullOrEmpty(baseSlug)) baseSlug = "course";
            var slug = baseSlug;
            var n = 2;
            while (await _db.Courses.AnyAsync(c => c.Slug == slug && (!excludeId.HasValue || c.Id != excludeId.Value)))
                slug = baseSlug + "-" + n++;
            return slug;
        }
    }
}
