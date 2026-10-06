using System;
using TechKidPro.Core.Common;
using TechKidPro.Core.Entities.Catalog;
using TechKidPro.Core.Enums;

namespace TechKidPro.Core.Entities.Learning
{
    public class LessonProgress : AuditableEntity
    {
        public string UserId { get; set; }
        public int CourseId { get; set; }
        public int LessonId { get; set; }
        public ProgressStatus Status { get; set; }
        public DateTime? CompletedDate { get; set; }
        public virtual Lesson Lesson { get; set; }
    }
}
