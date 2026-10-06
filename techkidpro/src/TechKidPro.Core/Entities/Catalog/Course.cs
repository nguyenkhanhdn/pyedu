using System.Collections.Generic;
using TechKidPro.Core.Common;
using TechKidPro.Core.Enums;

namespace TechKidPro.Core.Entities.Catalog
{
    /// <summary>Nội dung học. Không chứa giá, mentor, payment (thuộc Commerce/Mentoring).</summary>
    public class Course : AuditableEntity
    {
        public string Slug { get; set; }
        public string Title { get; set; }
        public string Summary { get; set; }
        public string ThumbnailUrl { get; set; }
        public PublishStatus Status { get; set; }
        /// <summary>Cấu hình riêng của course (JSON) thay cho if(course == "...").</summary>
        public string SettingsJson { get; set; }

        public virtual ICollection<CourseSection> Sections { get; set; } = new List<CourseSection>();
        public virtual ICollection<CourseCategory> Categories { get; set; } = new List<CourseCategory>();
    }

    public class Category : AuditableEntity
    {
        public string Slug { get; set; }
        public string Name { get; set; }
        public int? ParentId { get; set; }
        public virtual ICollection<CourseCategory> Courses { get; set; } = new List<CourseCategory>();
    }

    public class CourseCategory
    {
        public int CourseId { get; set; }
        public int CategoryId { get; set; }
        public virtual Course Course { get; set; }
        public virtual Category Category { get; set; }
    }

    public class CourseSection : AuditableEntity
    {
        public int CourseId { get; set; }
        public string Title { get; set; }
        public int SortOrder { get; set; }
        public virtual Course Course { get; set; }
        public virtual ICollection<Lesson> Lessons { get; set; } = new List<Lesson>();
    }

    public class Lesson : AuditableEntity
    {
        public int SectionId { get; set; }
        public string Title { get; set; }
        public int SortOrder { get; set; }
        public PublishStatus Status { get; set; }
        public virtual CourseSection Section { get; set; }
        public virtual ICollection<LessonContent> Contents { get; set; } = new List<LessonContent>();
    }

    /// <summary>Một block nội dung có thứ tự trong bài học; dữ liệu theo BlockType lưu dạng JSON.</summary>
    public class LessonContent : AuditableEntity
    {
        public int LessonId { get; set; }
        public LessonBlockType BlockType { get; set; }
        public string DataJson { get; set; }
        public int SortOrder { get; set; }
        public virtual Lesson Lesson { get; set; }
    }
}
