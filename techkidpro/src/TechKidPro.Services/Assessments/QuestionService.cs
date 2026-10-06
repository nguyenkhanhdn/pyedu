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
    public class QuestionInput
    {
        public int? CourseId { get; set; }
        public int? SectionId { get; set; }
        public int? LessonId { get; set; }
        public QuestionType Type { get; set; }
        public Difficulty Difficulty { get; set; }
        public string Text { get; set; }
        public string Explanation { get; set; }
        public PublishStatus Status { get; set; }
        public IList<OptionInput> Options { get; set; } = new List<OptionInput>();
        public IList<int> SkillIds { get; set; } = new List<int>();
    }

    public interface IQuestionService
    {
        Task<IList<Question>> ListAsync(int? courseId = null, int? skillId = null, PublishStatus? status = null);
        Task<Question> GetAsync(int id);
        Task<Question> CreateAsync(QuestionInput input);
        Task UpdateAsync(int id, QuestionInput input);
        Task SetStatusAsync(int id, PublishStatus status);
        Task<bool> HasAnswersAsync(int id);
    }

    public class QuestionService : IQuestionService
    {
        private readonly ApplicationDbContext _db;
        public QuestionService(ApplicationDbContext db) { _db = db; }

        public async Task<IList<Question>> ListAsync(int? courseId = null, int? skillId = null, PublishStatus? status = null)
        {
            var q = _db.Questions.Include(x => x.Skills.Select(s => s.Skill)).AsQueryable();
            if (courseId.HasValue) q = q.Where(x => x.CourseId == courseId);
            if (skillId.HasValue) q = q.Where(x => x.Skills.Any(s => s.SkillId == skillId));
            if (status.HasValue) q = q.Where(x => x.Status == status);
            return await q.OrderByDescending(x => x.Id).ToListAsync();
        }

        public async Task<Question> GetAsync(int id)
        {
            var q = await _db.Questions.Include(x => x.Options).Include(x => x.Skills.Select(s => s.Skill)).FirstOrDefaultAsync(x => x.Id == id);
            if (q != null) q.Options = q.Options.OrderBy(o => o.SortOrder).ThenBy(o => o.Id).ToList();
            return q;
        }

        public async Task<Question> CreateAsync(QuestionInput input)
        {
            Validate(input);
            var q = new Question();
            Apply(q, input);
            ApplyOptions(q, input.Options);
            ApplySkills(q, input.SkillIds);
            _db.Questions.Add(q);
            await _db.SaveChangesAsync();
            return q;
        }

        public async Task UpdateAsync(int id, QuestionInput input)
        {
            Validate(input);
            var q = await _db.Questions.Include(x => x.Options).Include(x => x.Skills).FirstOrDefaultAsync(x => x.Id == id);
            if (q == null) throw new InvalidOperationException("Không tìm thấy câu hỏi.");
            var used = await HasAnswersAsync(id);
            if (used && (q.Type != input.Type || !SameOptions(q, input.Options)))
                throw new InvalidOperationException("Câu hỏi đã có bài làm nên không được đổi loại câu hỏi hoặc các lựa chọn. Hãy Archive và tạo câu hỏi mới.");
            Apply(q, input);
            if (!used)
            {
                _db.QuestionOptions.RemoveRange(q.Options.ToList());
                ApplyOptions(q, input.Options);
            }
            var wanted = new HashSet<int>(input.SkillIds ?? new List<int>());
            foreach (var s in q.Skills.Where(s => !wanted.Contains(s.SkillId)).ToList()) _db.QuestionSkills.Remove(s);
            foreach (var sid in wanted.Where(w => q.Skills.All(s => s.SkillId != w))) q.Skills.Add(new QuestionSkill { SkillId = sid });
            await _db.SaveChangesAsync();
        }

        public async Task SetStatusAsync(int id, PublishStatus status)
        {
            var q = await _db.Questions.FindAsync(id);
            if (q == null) throw new InvalidOperationException("Không tìm thấy câu hỏi.");
            q.Status = status;
            await _db.SaveChangesAsync();
        }

        public Task<bool> HasAnswersAsync(int id)
        {
            return _db.AssessmentAnswers.AnyAsync(a => a.QuestionId == id);
        }

        private static void Validate(QuestionInput input)
        {
            var err = ScoringEngine.ValidateQuestion(input.Type, input.Text, input.Options);
            if (err != null) throw new InvalidOperationException(err);
        }

        private static void Apply(Question q, QuestionInput i)
        {
            q.CourseId = i.CourseId; q.SectionId = i.SectionId; q.LessonId = i.LessonId;
            q.Type = i.Type; q.Difficulty = i.Difficulty;
            q.Text = i.Text.Trim(); q.Explanation = i.Explanation; q.Status = i.Status;
        }

        private static void ApplyOptions(Question q, IList<OptionInput> options)
        {
            var n = 1;
            foreach (var o in options)
                q.Options.Add(new QuestionOption { Text = o.Text.Trim(), IsCorrect = o.IsCorrect, SortOrder = n++ });
        }

        private static void ApplySkills(Question q, IList<int> skillIds)
        {
            foreach (var sid in (skillIds ?? new List<int>()).Distinct())
                q.Skills.Add(new QuestionSkill { SkillId = sid });
        }

        private static bool SameOptions(Question q, IList<OptionInput> options)
        {
            var current = q.Options.OrderBy(o => o.SortOrder).ThenBy(o => o.Id).Select(o => o.Text + "|" + o.IsCorrect).ToList();
            var next = options.Select(o => o.Text.Trim() + "|" + o.IsCorrect).ToList();
            return current.SequenceEqual(next);
        }
    }
}
