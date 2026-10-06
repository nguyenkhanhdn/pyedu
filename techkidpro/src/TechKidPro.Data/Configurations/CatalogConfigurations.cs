using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Infrastructure.Annotations;
using System.Data.Entity.ModelConfiguration;
using TechKidPro.Core.Entities.Catalog;
using TechKidPro.Core.Entities.Identity;

namespace TechKidPro.Data.Configurations
{
    public class UserProfileConfiguration : EntityTypeConfiguration<UserProfile>
    {
        public UserProfileConfiguration()
        {
            ToTable("UserProfiles");
            Property(x => x.UserId).IsRequired().HasMaxLength(128)
                .HasColumnAnnotation("Index", new IndexAnnotation(new IndexAttribute("IX_UserProfile_User") { IsUnique = true }));
            Property(x => x.DisplayName).HasMaxLength(200);
            Property(x => x.AvatarUrl).HasMaxLength(500);
        }
    }

    public class CourseConfiguration : EntityTypeConfiguration<Course>
    {
        public CourseConfiguration()
        {
            ToTable("Courses");
            Property(x => x.Slug).IsRequired().HasMaxLength(200)
                .HasColumnAnnotation("Index", new IndexAnnotation(new IndexAttribute("IX_Course_Slug") { IsUnique = true }));
            Property(x => x.Title).IsRequired().HasMaxLength(300);
            Property(x => x.Summary).HasMaxLength(1000);
            Property(x => x.ThumbnailUrl).HasMaxLength(500);
        }
    }

    public class CategoryConfiguration : EntityTypeConfiguration<Category>
    {
        public CategoryConfiguration()
        {
            ToTable("Categories");
            Property(x => x.Slug).IsRequired().HasMaxLength(200)
                .HasColumnAnnotation("Index", new IndexAnnotation(new IndexAttribute("IX_Category_Slug") { IsUnique = true }));
            Property(x => x.Name).IsRequired().HasMaxLength(200);
        }
    }

    public class CourseCategoryConfiguration : EntityTypeConfiguration<CourseCategory>
    {
        public CourseCategoryConfiguration()
        {
            ToTable("CourseCategories");
            HasKey(x => new { x.CourseId, x.CategoryId });
            HasRequired(x => x.Course).WithMany(c => c.Categories).HasForeignKey(x => x.CourseId);
            HasRequired(x => x.Category).WithMany(c => c.Courses).HasForeignKey(x => x.CategoryId);
        }
    }

    public class CourseSectionConfiguration : EntityTypeConfiguration<CourseSection>
    {
        public CourseSectionConfiguration()
        {
            ToTable("CourseSections");
            Property(x => x.Title).IsRequired().HasMaxLength(300);
            HasRequired(x => x.Course).WithMany(c => c.Sections).HasForeignKey(x => x.CourseId);
        }
    }

    public class LessonConfiguration : EntityTypeConfiguration<Lesson>
    {
        public LessonConfiguration()
        {
            ToTable("Lessons");
            Property(x => x.Title).IsRequired().HasMaxLength(300);
            HasRequired(x => x.Section).WithMany(s => s.Lessons).HasForeignKey(x => x.SectionId);
        }
    }

    public class LessonContentConfiguration : EntityTypeConfiguration<LessonContent>
    {
        public LessonContentConfiguration()
        {
            ToTable("LessonContents");
            HasRequired(x => x.Lesson).WithMany(l => l.Contents).HasForeignKey(x => x.LessonId);
        }
    }
}
