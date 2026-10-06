using System;
using System.Collections.Generic;
using TechKidPro.Core.Common;
using TechKidPro.Core.Entities.Skills;
using TechKidPro.Core.Enums;

namespace TechKidPro.Core.Entities.Assessments
{
    public class Question : AuditableEntity
    {
        public int? CourseId { get; set; }
        public int? SectionId { get; set; }
        public int? LessonId { get; set; }
        public QuestionType Type { get; set; }
        public Difficulty Difficulty { get; set; }
        public string Text { get; set; }
        public string Explanation { get; set; }
        public PublishStatus Status { get; set; }
        public virtual ICollection<QuestionOption> Options { get; set; } = new List<QuestionOption>();
        public virtual ICollection<QuestionSkill> Skills { get; set; } = new List<QuestionSkill>();
    }

    public class QuestionOption : Entity
    {
        public int QuestionId { get; set; }
        public string Text { get; set; }
        public bool IsCorrect { get; set; }
        public int SortOrder { get; set; }
        public virtual Question Question { get; set; }
    }

    public class QuestionSkill
    {
        public int QuestionId { get; set; }
        public int SkillId { get; set; }
        public virtual Question Question { get; set; }
        public virtual Skill Skill { get; set; }
    }

    public class Assessment : AuditableEntity
    {
        public int CourseId { get; set; }
        public int? SectionId { get; set; }
        public int? LessonId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public AssessmentType Type { get; set; }
        public PublishStatus Status { get; set; }
        public int? TimeLimitMinutes { get; set; }
        public int PassPercent { get; set; }
        public int? MaxAttempts { get; set; }
        public bool ShuffleQuestions { get; set; }
        public bool ShowAnswersAfterSubmit { get; set; }
        public virtual ICollection<AssessmentQuestion> Questions { get; set; } = new List<AssessmentQuestion>();
    }

    public class AssessmentQuestion
    {
        public int AssessmentId { get; set; }
        public int QuestionId { get; set; }
        public int SortOrder { get; set; }
        public int Points { get; set; }
        public virtual Assessment Assessment { get; set; }
        public virtual Question Question { get; set; }
    }

    public class AssessmentAttempt : AuditableEntity
    {
        public string UserId { get; set; }
        public int AssessmentId { get; set; }
        public AttemptStatus Status { get; set; }
        public DateTime StartedDate { get; set; }
        public DateTime? SubmittedDate { get; set; }
        public int Score { get; set; }
        public int MaxScore { get; set; }
        public int Percent { get; set; }
        public bool Passed { get; set; }
        public virtual Assessment Assessment { get; set; }
        public virtual ICollection<AssessmentAnswer> Answers { get; set; } = new List<AssessmentAnswer>();
    }

    public class AssessmentAnswer : Entity
    {
        public int AttemptId { get; set; }
        public int QuestionId { get; set; }
        /// <summary>Id các lựa chọn đã chọn, cách nhau bởi dấu phẩy; rỗng nếu bỏ trống.</summary>
        public string SelectedOptionIds { get; set; }
        public bool IsCorrect { get; set; }
        public int PointsAwarded { get; set; }
        public int MaxPoints { get; set; }
        public virtual AssessmentAttempt Attempt { get; set; }
        public virtual Question Question { get; set; }
    }
}
