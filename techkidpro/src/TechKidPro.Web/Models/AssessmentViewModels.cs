using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using TechKidPro.Core.Entities.Assessments;
using TechKidPro.Core.Entities.Catalog;
using TechKidPro.Core.Entities.Skills;
using TechKidPro.Core.Enums;
using TechKidPro.Services.Assessments;

namespace TechKidPro.Web.Models
{
    public class QuestionFormViewModel
    {
        public const int OptionRows = 6;

        public int Id { get; set; }
        [Display(Name = "Khóa học")] public int? CourseId { get; set; }
        [Display(Name = "Bài học liên quan (Id)")] public int? LessonId { get; set; }
        [Display(Name = "Loại câu hỏi")] public QuestionType Type { get; set; }
        [Display(Name = "Độ khó")] public Difficulty Difficulty { get; set; }
        [Required, Display(Name = "Nội dung câu hỏi")] public string Text { get; set; }
        [Display(Name = "Giải thích")] public string Explanation { get; set; }
        [Display(Name = "Trạng thái")] public PublishStatus Status { get; set; }
        public int[] SkillIds { get; set; }
        public string[] OptionTexts { get; set; }
        public int[] CorrectIndexes { get; set; }

        public IList<Course> Courses { get; set; }
        public IList<Skill> AllSkills { get; set; }
        public bool OptionsLocked { get; set; }

        /// <summary>Bỏ các dòng lựa chọn trống nhưng giữ đúng chỉ số "đáp án đúng" theo dòng.</summary>
        public QuestionInput ToInput()
        {
            var texts = (OptionTexts ?? new string[0]).Select(t => (t ?? "").Trim()).ToList();
            var correct = new HashSet<int>(CorrectIndexes ?? new int[0]);
            if (Type == QuestionType.TrueFalse && texts.All(t => t.Length == 0))
            {
                texts = new List<string> { "Đúng", "Sai" };
            }
            var options = new List<OptionInput>();
            for (var i = 0; i < texts.Count; i++)
                if (texts[i].Length > 0) options.Add(new OptionInput { Text = texts[i], IsCorrect = correct.Contains(i) });
            return new QuestionInput
            {
                CourseId = CourseId, LessonId = LessonId, Type = Type, Difficulty = Difficulty,
                Text = Text, Explanation = Explanation, Status = Status, Options = options,
                SkillIds = (SkillIds ?? new int[0]).ToList()
            };
        }

        public static QuestionFormViewModel FromQuestion(Question q)
        {
            var opts = q.Options.OrderBy(o => o.SortOrder).ToList();
            return new QuestionFormViewModel
            {
                Id = q.Id, CourseId = q.CourseId, LessonId = q.LessonId, Type = q.Type, Difficulty = q.Difficulty,
                Text = q.Text, Explanation = q.Explanation, Status = q.Status,
                SkillIds = q.Skills.Select(s => s.SkillId).ToArray(),
                OptionTexts = opts.Select(o => o.Text).ToArray(),
                CorrectIndexes = opts.Select((o, i) => new { o, i }).Where(x => x.o.IsCorrect).Select(x => x.i).ToArray()
            };
        }
    }

    public class AssessmentFormViewModel
    {
        public int Id { get; set; }
        [Required, Display(Name = "Khóa học")] public int CourseId { get; set; }
        [Required, StringLength(300), Display(Name = "Tiêu đề")] public string Title { get; set; }
        [Display(Name = "Mô tả")] public string Description { get; set; }
        [Display(Name = "Loại")] public AssessmentType Type { get; set; }
        [Display(Name = "Thời gian (phút, trống = không giới hạn)")] public int? TimeLimitMinutes { get; set; }
        [Range(0, 100), Display(Name = "Điểm đạt (%)")] public int PassPercent { get; set; } = 50;
        [Display(Name = "Số lần làm tối đa (trống = không giới hạn)")] public int? MaxAttempts { get; set; }
        [Display(Name = "Xáo trộn thứ tự câu hỏi")] public bool ShuffleQuestions { get; set; }
        [Display(Name = "Hiện đáp án sau khi nộp")] public bool ShowAnswersAfterSubmit { get; set; } = true;
        public IList<Course> Courses { get; set; }

        public AssessmentInput ToInput()
        {
            return new AssessmentInput
            {
                CourseId = CourseId, Title = Title, Description = Description, Type = Type,
                TimeLimitMinutes = TimeLimitMinutes, PassPercent = PassPercent, MaxAttempts = MaxAttempts,
                ShuffleQuestions = ShuffleQuestions, ShowAnswersAfterSubmit = ShowAnswersAfterSubmit
            };
        }
    }

    public class AssessmentEditViewModel
    {
        public AssessmentFormViewModel Form { get; set; }
        public Assessment Assessment { get; set; }
        public IList<Question> Available { get; set; }
    }

    public class DashboardViewModel
    {
        public IList<MyCourseItem> Courses { get; set; }
        public IList<SkillProgress> Skills { get; set; }
    }
}
