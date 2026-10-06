using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Infrastructure.Annotations;
using System.Data.Entity.ModelConfiguration;
using TechKidPro.Core.Entities.Access;
using TechKidPro.Core.Entities.Learning;

namespace TechKidPro.Data.Configurations
{
    public class EnrollmentConfiguration : EntityTypeConfiguration<Enrollment>
    {
        public EnrollmentConfiguration()
        {
            ToTable("Enrollments");
            Property(x => x.UserId).IsRequired().HasMaxLength(128)
                .HasColumnAnnotation("Index", new IndexAnnotation(new IndexAttribute("IX_Enrollment_User_Course", 1) { IsUnique = true }));
            Property(x => x.CourseId)
                .HasColumnAnnotation("Index", new IndexAnnotation(new IndexAttribute("IX_Enrollment_User_Course", 2) { IsUnique = true }));
            HasRequired(x => x.Course).WithMany().HasForeignKey(x => x.CourseId);
        }
    }

    public class LessonProgressConfiguration : EntityTypeConfiguration<LessonProgress>
    {
        public LessonProgressConfiguration()
        {
            ToTable("LessonProgresses");
            Property(x => x.UserId).IsRequired().HasMaxLength(128)
                .HasColumnAnnotation("Index", new IndexAnnotation(new IndexAttribute("IX_LessonProgress_User_Lesson", 1) { IsUnique = true }));
            Property(x => x.LessonId)
                .HasColumnAnnotation("Index", new IndexAnnotation(new IndexAttribute("IX_LessonProgress_User_Lesson", 2) { IsUnique = true }));
            Property(x => x.CourseId)
                .HasColumnAnnotation("Index", new IndexAnnotation(new IndexAttribute("IX_LessonProgress_Course")));
            // Không cascade để tránh multiple cascade paths; xóa Lesson được chặn khi đã có tiến độ.
            HasRequired(x => x.Lesson).WithMany().HasForeignKey(x => x.LessonId).WillCascadeOnDelete(false);
        }
    }
}
