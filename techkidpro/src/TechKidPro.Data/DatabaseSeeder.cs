using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Linq;
using TechKidPro.Core.Entities.Catalog;
using TechKidPro.Core.Enums;

namespace TechKidPro.Data
{
    public static class DatabaseSeeder
    {
        /// <summary>Gọi từ Migrations Configuration.Seed hoặc lúc khởi động; idempotent.</summary>
        public static void SeedRoles(ApplicationDbContext context)
        {
            var roleManager = new RoleManager<ApplicationRole>(new RoleStore<ApplicationRole>(context));
            foreach (var name in RoleNames.All)
            {
                if (!roleManager.RoleExists(name))
                    roleManager.Create(new ApplicationRole(name));
            }
        }

        /// <summary>Dữ liệu mẫu để thử LMS; idempotent theo Slug. Course ở trạng thái Draft.</summary>
        public static void SeedCatalog(ApplicationDbContext context)
        {
            if (!context.Categories.Any(c => c.Slug == "tin-hoc-thpt"))
                context.Categories.Add(new Category { Slug = "tin-hoc-thpt", Name = "Tin học THPT" });
            if (!context.Categories.Any(c => c.Slug == "lap-trinh"))
                context.Categories.Add(new Category { Slug = "lap-trinh", Name = "Lập trình" });
            if (!context.Courses.Any(c => c.Slug == "on-thi-tot-nghiep-thpt-tin-hoc"))
            {
                var course = new Course
                {
                    Slug = "on-thi-tot-nghiep-thpt-tin-hoc",
                    Title = "Ôn thi tốt nghiệp THPT môn Tin học",
                    Summary = "Hệ thống kiến thức và luyện tập cho kỳ thi tốt nghiệp THPT môn Tin học.",
                    Status = PublishStatus.Draft
                };
                var section = new CourseSection { Title = "Chương 1: Khởi động", SortOrder = 1 };
                var lesson = new Lesson { Title = "Giới thiệu khóa học", SortOrder = 1, Status = PublishStatus.Draft };
                lesson.Contents.Add(new LessonContent { BlockType = LessonBlockType.Text, SortOrder = 1, DataJson = "{\"text\":\"Chào mừng bạn đến với TechKidPro!\"}" });
                section.Lessons.Add(lesson);
                course.Sections.Add(section);
                context.Courses.Add(course);
            }
            context.SaveChanges();
        }
    }
}