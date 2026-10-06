using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Infrastructure.Annotations;
using System.Data.Entity.ModelConfiguration;
using TechKidPro.Core.Entities.Assessments;
using TechKidPro.Core.Entities.Skills;

namespace TechKidPro.Data.Configurations
{
    public class SkillCategoryConfiguration : EntityTypeConfiguration<SkillCategory>
    {
        public SkillCategoryConfiguration()
        {
            ToTable("SkillCategories");
            Property(x => x.Name).IsRequired().HasMaxLength(200);
        }
    }

    public class SkillConfiguration : EntityTypeConfiguration<Skill>
    {
        public SkillConfiguration()
        {
            ToTable("Skills");
            Property(x => x.Code).IsRequired().HasMaxLength(100)
                .HasColumnAnnotation("Index", new IndexAnnotation(new IndexAttribute("IX_Skill_Code") { IsUnique = true }));
            Property(x => x.Name).IsRequired().HasMaxLength(200);
            HasOptional(x => x.Category).WithMany().HasForeignKey(x => x.CategoryId).WillCascadeOnDelete(false);
        }
    }

    public class SkillProgressConfiguration : EntityTypeConfiguration<SkillProgress>
    {
        public SkillProgressConfiguration()
        {
            ToTable("SkillProgresses");
            Ignore(x => x.Percent);
            Property(x => x.UserId).IsRequired().HasMaxLength(128)
                .HasColumnAnnotation("Index", new IndexAnnotation(new IndexAttribute("IX_SkillProgress_User_Skill", 1) { IsUnique = true }));
            Property(x => x.SkillId)
                .HasColumnAnnotation("Index", new IndexAnnotation(new IndexAttribute("IX_SkillProgress_User_Skill", 2) { IsUnique = true }));
            HasRequired(x => x.Skill).WithMany().HasForeignKey(x => x.SkillId).WillCascadeOnDelete(false);
        }
    }

    public class QuestionConfiguration : EntityTypeConfiguration<Question>
    {
        public QuestionConfiguration()
        {
            ToTable("Questions");
            Property(x => x.Text).IsRequired();
            Property(x => x.CourseId).HasColumnAnnotation("Index", new IndexAnnotation(new IndexAttribute("IX_Question_Course")));
        }
    }

    public class QuestionOptionConfiguration : EntityTypeConfiguration<QuestionOption>
    {
        public QuestionOptionConfiguration()
        {
            ToTable("QuestionOptions");
            Property(x => x.Text).IsRequired().HasMaxLength(1000);
            HasRequired(x => x.Question).WithMany(q => q.Options).HasForeignKey(x => x.QuestionId).WillCascadeOnDelete(true);
        }
    }

    public class QuestionSkillConfiguration : EntityTypeConfiguration<QuestionSkill>
    {
        public QuestionSkillConfiguration()
        {
            ToTable("QuestionSkills");
            HasKey(x => new { x.QuestionId, x.SkillId });
            HasRequired(x => x.Question).WithMany(q => q.Skills).HasForeignKey(x => x.QuestionId).WillCascadeOnDelete(true);
            HasRequired(x => x.Skill).WithMany().HasForeignKey(x => x.SkillId).WillCascadeOnDelete(false);
        }
    }

    public class AssessmentConfiguration : EntityTypeConfiguration<Assessment>
    {
        public AssessmentConfiguration()
        {
            ToTable("Assessments");
            Property(x => x.Title).IsRequired().HasMaxLength(300);
            Property(x => x.CourseId).HasColumnAnnotation("Index", new IndexAnnotation(new IndexAttribute("IX_Assessment_Course")));
        }
    }

    public class AssessmentQuestionConfiguration : EntityTypeConfiguration<AssessmentQuestion>
    {
        public AssessmentQuestionConfiguration()
        {
            ToTable("AssessmentQuestions");
            HasKey(x => new { x.AssessmentId, x.QuestionId });
            HasRequired(x => x.Assessment).WithMany(a => a.Questions).HasForeignKey(x => x.AssessmentId).WillCascadeOnDelete(true);
            HasRequired(x => x.Question).WithMany().HasForeignKey(x => x.QuestionId).WillCascadeOnDelete(false);
        }
    }

    public class AssessmentAttemptConfiguration : EntityTypeConfiguration<AssessmentAttempt>
    {
        public AssessmentAttemptConfiguration()
        {
            ToTable("AssessmentAttempts");
            Property(x => x.UserId).IsRequired().HasMaxLength(128)
                .HasColumnAnnotation("Index", new IndexAnnotation(new IndexAttribute("IX_Attempt_User_Assessment", 1)));
            Property(x => x.AssessmentId)
                .HasColumnAnnotation("Index", new IndexAnnotation(new IndexAttribute("IX_Attempt_User_Assessment", 2)));
            HasRequired(x => x.Assessment).WithMany().HasForeignKey(x => x.AssessmentId).WillCascadeOnDelete(false);
        }
    }

    public class AssessmentAnswerConfiguration : EntityTypeConfiguration<AssessmentAnswer>
    {
        public AssessmentAnswerConfiguration()
        {
            ToTable("AssessmentAnswers");
            Property(x => x.SelectedOptionIds).HasMaxLength(500);
            HasRequired(x => x.Attempt).WithMany(a => a.Answers).HasForeignKey(x => x.AttemptId).WillCascadeOnDelete(true);
            HasRequired(x => x.Question).WithMany().HasForeignKey(x => x.QuestionId).WillCascadeOnDelete(false);
        }
    }
}
