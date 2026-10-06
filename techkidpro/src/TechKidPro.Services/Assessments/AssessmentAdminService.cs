using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using TechKidPro.Core.Entities.Assessments;
using TechKidPro.Core.Enums;
using TechKidPro.Data;

namespace TechKidPro.Services.Assessments
{
    public class AssessmentInput
    {
        public int CourseId { get; set; }
        public int? SectionId { get; set; }
        public int? LessonId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public AssessmentType Type { get; set; }
        public int? TimeLimitMinutes { get; set; }
        public int PassPercent { get; set; }
        public int? MaxAttempts { get; set; }
        public bool ShuffleQuestions { get; set; }
        public bool ShowAnswersAfterSubmit { get; set; }
    }

    public interface IAssessmentAdminService
    {
        Task<IList<Assessment>> ListAsync(int? courseId = null);
        Task<Assessment> GetAsync(int id);
        Task<Assessment> CreateAsync(AssessmentInput input);
        Task UpdateAsync(int id, AssessmentInput input);
        /// <summary>Publish cần ≥ 1 câu hỏi và mọi câu đều Published.</summary>
        Task SetStatusAsync(int id, PublishStatus status);
        Task AddQuestionsAsync(int id, IEnumerable<int> questionIds);
        Task RemoveQuestionAsync(int id, int questionId);
    }

    public class AssessmentAdminService : IAssessmentAdminService
    {
        private readonly ApplicationDbContext _db;
        public AssessmentAdminService(ApplicationDbContext db) { _db = db; }

        public async Task<IList<Assessment>> ListAsync(int? courseId = null)
        {
            var q = _db.Assessments.AsQueryable();
            if (courseId.HasValue) q = q.Where(a => a.CourseId == courseId);
            return await q.OrderByDescending(a => a.Id).ToListAsync();
        }

        public async Task<Assessment> GetAsync(int id)
        {
            var a = await _db.Assessments.Include(x => x.Questions.Select(aq => aq.Question)).FirstOrDefaultAsync(x => x.Id == id);
            if (a != null) a.Questions = a.Questions.OrderBy(x => x.SortOrder).ToList();
            return a;
        }

        public async Task<Assessment> CreateAsync(AssessmentInput input)
        {
            Validate(input);
            var a = new Assessment { Status = PublishStatus.Draft };
            Apply(a, input);
            _db.Assessments.Add(a);
            await _db.SaveChangesAsync();
            return a;
        }

        public async Task UpdateAsync(int id, AssessmentInput input)
        {
            Validate(input);
            var a = await _db.Assessments.FindAsync(id);
            if (a == null) throw new InvalidOperationException("Không tìm thấy bài kiểm tra.");
            Apply(a, input);
            await _db.SaveChangesAsync();
        }

        public async Task SetStatusAsync(int id, PublishStatus status)
        {
            var a = await _db.Assessments.Include(x => x.Questions.Select(q => q.Question)).FirstOrDefaultAsync(x => x.Id == id);
            if (a == null) throw new InvalidOperationException("Không tìm thấy bài kiểm tra.");
            if (status == PublishStatus.Published)
            {
                if (a.Questions.Count == 0) throw new InvalidOperationException("Cần ít nhất một câu hỏi trước khi xuất bản.");
                if (a.Questions.Any(q => q.Question.Status != PublishStatus.Published))
                    throw new InvalidOperationException("Mọi câu hỏi trong bài phải ở trạng thái Published.");
            }
            a.Status = status;
            await _db.SaveChangesAsync();
        }

        public async Task AddQuestionsAsync(int id, IEnumerable<int> questionIds)
        {
            var existing = await _db.AssessmentQuestions.Where(x => x.AssessmentId == id).ToListAsync();
            var max = existing.Count == 0 ? 0 : existing.Max(x => x.SortOrder);
            foreach (var qid in (questionIds ?? new int[0]).Distinct().Where(q => existing.All(e => e.QuestionId != q)))
            {
                if (!await _db.Questions.AnyAsync(q => q.Id == qid)) continue;
                _db.AssessmentQuestions.Add(new AssessmentQuestion { AssessmentId = id, QuestionId = qid, SortOrder = ++max, Points = 1 });
            }
            await _db.SaveChangesAsync();
        }

        public async Task RemoveQuestionAsync(int id, int questionId)
        {
            var aq = await _db.AssessmentQuestions.FirstOrDefaultAsync(x => x.AssessmentId == id && x.QuestionId == questionId);
            if (aq == null) return;
            if (await _db.AssessmentAttempts.AnyAsync(t => t.AssessmentId == id))
                throw new InvalidOperationException("Bài đã có lượt làm; không thể bỏ câu hỏi (hãy tạo bài mới).");
            _db.AssessmentQuestions.Remove(aq);
            await _db.SaveChangesAsync();
        }

        private static void Validate(AssessmentInput i)
        {
            if (string.IsNullOrWhiteSpace(i.Title)) throw new InvalidOperationException("Tiêu đề không được để trống.");
            if (i.PassPercent < 0 || i.PassPercent > 100) throw new InvalidOperationException("Điểm đạt phải từ 0 đến 100.");
            if (i.TimeLimitMinutes.HasValue && i.TimeLimitMinutes <= 0) throw new InvalidOperationException("Thời gian làm bài phải lớn hơn 0.");
            if (i.MaxAttempts.HasValue && i.MaxAttempts <= 0) throw new InvalidOperationException("Số lần làm tối đa phải lớn hơn 0.");
        }

        private static void Apply(Assessment a, AssessmentInput i)
        {
            a.CourseId = i.CourseId; a.SectionId = i.SectionId; a.LessonId = i.LessonId;
            a.Title = i.Title.Trim(); a.Description = i.Description; a.Type = i.Type;
            a.TimeLimitMinutes = i.TimeLimitMinutes; a.PassPercent = i.PassPercent; a.MaxAttempts = i.MaxAttempts;
            a.ShuffleQuestions = i.ShuffleQuestions; a.ShowAnswersAfterSubmit = i.ShowAnswersAfterSubmit;
        }
    }
}
