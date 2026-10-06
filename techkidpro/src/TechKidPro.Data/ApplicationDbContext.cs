using System;
using System.Data.Entity;
using System.Linq;
using Microsoft.AspNet.Identity.EntityFramework;
using TechKidPro.Core.Common;
using TechKidPro.Core.Entities.Access;
using TechKidPro.Core.Entities.Assessments;
using TechKidPro.Core.Entities.Catalog;
using TechKidPro.Core.Entities.Skills;
using TechKidPro.Core.Entities.Learning;
using TechKidPro.Core.Entities.Identity;
using TechKidPro.Core.Interfaces;

namespace TechKidPro.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, string, IdentityUserLogin, IdentityUserRole, IdentityUserClaim>
    {
        private readonly ICurrentUserProvider _currentUser;

        public ApplicationDbContext() : this(null) { }

        public ApplicationDbContext(ICurrentUserProvider currentUser) : base("DefaultConnection")
        {
            _currentUser = currentUser;
        }

        public DbSet<UserProfile> UserProfiles { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<CourseCategory> CourseCategories { get; set; }
        public DbSet<CourseSection> CourseSections { get; set; }
        public DbSet<Lesson> Lessons { get; set; }
        public DbSet<LessonContent> LessonContents { get; set; }
        public DbSet<Enrollment> Enrollments { get; set; }
        public DbSet<LessonProgress> LessonProgresses { get; set; }
        public DbSet<SkillCategory> SkillCategories { get; set; }
        public DbSet<Skill> Skills { get; set; }
        public DbSet<SkillProgress> SkillProgresses { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<QuestionOption> QuestionOptions { get; set; }
        public DbSet<QuestionSkill> QuestionSkills { get; set; }
        public DbSet<Assessment> Assessments { get; set; }
        public DbSet<AssessmentQuestion> AssessmentQuestions { get; set; }
        public DbSet<AssessmentAttempt> AssessmentAttempts { get; set; }
        public DbSet<AssessmentAnswer> AssessmentAnswers { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Configurations.AddFromAssembly(typeof(ApplicationDbContext).Assembly);
        }

        public override int SaveChanges()
        {
            ApplyAudit();
            return base.SaveChanges();
        }

        public override System.Threading.Tasks.Task<int> SaveChangesAsync(System.Threading.CancellationToken cancellationToken)
        {
            ApplyAudit();
            return base.SaveChangesAsync(cancellationToken);
        }

        private void ApplyAudit()
        {
            var now = DateTime.UtcNow;
            var user = _currentUser != null ? _currentUser.UserId : null;
            foreach (var entry in ChangeTracker.Entries<IAuditable>())
            {
                if (entry.State == EntityState.Added)
                {
                    entry.Entity.CreatedDate = now;
                    entry.Entity.CreatedBy = user;
                }
                else if (entry.State == EntityState.Modified)
                {
                    entry.Property(e => e.CreatedDate).IsModified = false;
                    entry.Property(e => e.CreatedBy).IsModified = false;
                    entry.Entity.UpdatedDate = now;
                    entry.Entity.UpdatedBy = user;
                }
            }
        }

        public static ApplicationDbContext Create() { return new ApplicationDbContext(); }
    }
}
