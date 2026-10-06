using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using TechKidPro.Core.Entities.Catalog;
using TechKidPro.Core.Enums;
using TechKidPro.Services.Progress;

namespace TechKidPro.Web.Models
{
    public class CatalogIndexViewModel
    {
        public IList<Category> Categories { get; set; }
        public IList<Course> Courses { get; set; }
        public string CategorySlug { get; set; }
    }

    public class CourseDetailsViewModel
    {
        public Course Course { get; set; }
        public bool IsEnrolled { get; set; }
    }

    public class MyCourseItem
    {
        public Course Course { get; set; }
        public int Percent { get; set; }
    }

    public class LearnViewModel
    {
        public Course Course { get; set; }
        public Lesson Lesson { get; set; }
        public IList<LessonContent> Contents { get; set; }
        public CourseProgressInfo Progress { get; set; }
        public Lesson Previous { get; set; }
        public Lesson Next { get; set; }
    }

    public class CourseEditViewModel
    {
        public int Id { get; set; }
        [Required, StringLength(300), Display(Name = "Tên khóa học")] public string Title { get; set; }
        [StringLength(200), Display(Name = "Slug (để trống để tự tạo)")] public string Slug { get; set; }
        [StringLength(1000), Display(Name = "Mô tả ngắn")] public string Summary { get; set; }
        [StringLength(500), Display(Name = "Ảnh bìa (URL)")] public string ThumbnailUrl { get; set; }
        public int[] CategoryIds { get; set; }
        public IList<Category> AllCategories { get; set; }
    }

    public class LessonEditViewModel
    {
        public int Id { get; set; }
        public int CourseId { get; set; }
        [Required, StringLength(300), Display(Name = "Tên bài học")] public string Title { get; set; }
        [Display(Name = "Thứ tự")] public int SortOrder { get; set; }
        [Display(Name = "Trạng thái")] public PublishStatus Status { get; set; }
        public IList<LessonContent> Contents { get; set; }
    }
}
