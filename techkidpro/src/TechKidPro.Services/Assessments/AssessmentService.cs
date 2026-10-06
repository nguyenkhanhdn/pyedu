using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using TechKidPro.Core.Entities.Assessments;
using TechKidPro.Core.Entities.Skills;
using TechKidPro.Core.Enums;
using TechKidPro.Data;

namespace TechKidPro.Services.Assessments
{
    // ---- DTO màn làm bài: KHÔNG chứa IsCorrect ----
    public class TakeOption { public int Id { get; set; } public string Text { get; set; } }

    public class TakeQuestion
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public QuestionType Type { get; set; }
        public int Points { get; set; }
        public IList<TakeOption> Options { get; set; }
    }

    public class TakeModel
    {
        public AssessmentAttempt Attempt { get; set; }
        public Assessment Assessment { get; set; }
        public IList<TakeQuestion> Questions { get; set; }
        public DateTime? DeadlineUtc { get; set; }
        public IDictionary<int, ISet<int>> Saved { get; set; }
    }

    // ---- DTO kết quả ----
    public class ResultOption { public int Id { get; set; } public string Text { get; set; } public bool Selected { get; set; } public bool? IsCorrect { get; set; } }

    public class ResultItem
    {
        public int QuestionId { get; set; }
        public string Text { get; set; }
        public bool IsCorrect { get; set; }
        public int PointsAwarded { get; set; }
        public int MaxPoints { get; set; }
        public string Explanation { get; set; }
        public IList<ResultOption> Options { get; set; }
    }

    public class SkillResult { public int SkillId { get; set; } public string Name { get; set; } public int Correct { get; set; } public int Total { get; set; } public int Percent { get { return ScoringEngine.Percent(Correct, Total); } } }

    public class RecommendedLesson { public int LessonId { get; set; } public string Title { get; set; } public int CourseId { get; set; } public string CourseSlug { get; set; } }

    public class AttemptResult
    {
        public AssessmentAttempt Attempt { get; set; }
        public Assessment Assessment { get; set; }
        public IList<ResultItem> Items { get; set; }
        public IList<SkillResult> Skills { get; set; }
        public IList<SkillResult> WeakSkills { get; set; }
        public IList<RecommendedLesson> RecommendedLessons { get; set; }
        public bool ShowAnswers { get; set; }
    }

    public interface IAssessmentService
    {
        Task<IList<Assessment>> GetPublishedForCourseAsync(int courseId);
        Task<Assessment> GetPublishedAsync(int id);
        Task<IList<AssessmentAttempt>> GetAttemptsAsync(string userId, int assessmentId);
        /// <summary>Tiếp tục attempt đang làm hoặc tạo mới (kiểm tra MaxAttempts).</summary>
        Task<AssessmentAttempt> StartAsync(string userId, int assessmentId);
        Task<TakeModel> GetTakeModelAsync(string userId, int attemptId);
        /// <summary>Server tự chấm. answers: questionId → các optionId đã chọn.</summary>
        Task<AssessmentAttempt> SubmitAsync(string userId, int attemptId, IDictionary<int, int[]> answers);
        Task<AttemptResult> GetResultAsync(string userId, int attemptId);
    }

    public class AssessmentService : IAssessmentService
    {
        private const int GraceSeconds = 60;
        private readonly ApplicationDbContext _db;
        public AssessmentService(ApplicationDbContext db) { _db = db; }

        public async Task<IList<Assessment>> GetPublishedForCourseAsync(int courseId)
        {
            return await _db.Assessments.Where(a => a.CourseId == courseId && a.Status == PublishStatus.Published)
                .OrderBy(a => a.Type).ThenBy(a => a.Title).ToListAsync();
        }

        public Task<Assessment> GetPublishedAsync(int id)
        {
            return _db.Assessments.FirstOrDefaultAsync(a => a.Id == id && a.Status == PublishStatus.Published);
        }

        public async Task<IList<AssessmentAttempt>> GetAttemptsAsync(string userId, int assessmentId)
        {
            return await _db.AssessmentAttempts.Where(t => t.UserId == userId && t.AssessmentId == assessmentId)
                .OrderByDescending(t => t.StartedDate).ToListAsync();
        }

        public async Task<AssessmentAttempt> StartAsync(string userId, int assessmentId)
        {
            var a = await GetPublishedAsync(assessmentId);
            if (a == null) throw new InvalidOperationException("Bài kiểm tra không tồn tại hoặc chưa xuất bản.");

            var open = await _db.AssessmentAttempts.FirstOrDefaultAsync(t => t.UserId == userId && t.AssessmentId == assessmentId && t.Status == AttemptStatus.InProgress);
            if (open != null) return open;

            if (a.MaxAttempts.HasValue)
            {
                var done = await _db.AssessmentAttempts.CountAsync(t => t.UserId == userId && t.AssessmentId == assessmentId && t.Status == AttemptStatus.Submitted);
                if (done >= a.MaxAttempts.Value) throw new InvalidOperationException("Bạn đã hết số lần làm bài cho phép.");
            }
            var attempt = new AssessmentAttempt { UserId = userId, AssessmentId = assessmentId, Status = AttemptStatus.InProgress, StartedDate = DateTime.UtcNow };
            _db.AssessmentAttempts.Add(attempt);
            await _db.SaveChangesAsync();
            return attempt;
        }

        public async Task<TakeModel> GetTakeModelAsync(string userId, int attemptId)
        {
            var attempt = await _db.AssessmentAttempts.Include(t => t.Answers).FirstOrDefaultAsync(t => t.Id == attemptId && t.UserId == userId);
            if (attempt == null || attempt.Status != AttemptStatus.InProgress) return null;
            var a = await _db.Assessments.FirstAsync(x => x.Id == attempt.AssessmentId);
            var aqs = await _db.AssessmentQuestions.Include(x => x.Question.Options)
                .Where(x => x.AssessmentId == a.Id).OrderBy(x => x.SortOrder).ToListAsync();

            if (a.ShuffleQuestions) aqs = Shuffle(aqs, attempt.Id);

            return new TakeModel
            {
                Attempt = attempt,
                Assessment = a,
                DeadlineUtc = a.TimeLimitMinutes.HasValue ? attempt.StartedDate.AddMinutes(a.TimeLimitMinutes.Value) : (DateTime?)null,
                Saved = new Dictionary<int, ISet<int>>(),
                Questions = aqs.Select(x => new TakeQuestion
                {
                    Id = x.QuestionId,
                    Text = x.Question.Text,
                    Type = x.Question.Type,
                    Points = x.Points,
                    Options = x.Question.Options.OrderBy(o => o.SortOrder).ThenBy(o => o.Id)
                        .Select(o => new TakeOption { Id = o.Id, Text = o.Text }).ToList()
                }).ToList()
            };
        }

        public async Task<AssessmentAttempt> SubmitAsync(string userId, int attemptId, IDictionary<int, int[]> answers)
        {
            var attempt = await _db.AssessmentAttempts.FirstOrDefaultAsync(t => t.Id == attemptId && t.UserId == userId);
            if (attempt == null) throw new InvalidOperationException("Không tìm thấy lượt làm bài.");
            if (attempt.Status == AttemptStatus.Submitted) throw new InvalidOperationException("Bài đã được nộp.");

            var a = await _db.Assessments.FirstAsync(x => x.Id == attempt.AssessmentId);
            var now = DateTime.UtcNow;
            var overdue = a.TimeLimitMinutes.HasValue && now > attempt.StartedDate.AddMinutes(a.TimeLimitMinutes.Value).AddSeconds(GraceSeconds);
            if (overdue || answers == null) answers = new Dictionary<int, int[]>();

            var aqs = await _db.AssessmentQuestions
                .Include(x => x.Question.Options).Include(x => x.Question.Skills)
                .Where(x => x.AssessmentId == a.Id).ToListAsync();

            var skillStats = new Dictionary<int, int[]>(); // skillId → [correct,total]
            var score = 0; var max = 0;
            foreach (var aq in aqs)
            {
                var validIds = new HashSet<int>(aq.Question.Options.Select(o => o.Id));
                int[] raw;
                answers.TryGetValue(aq.QuestionId, out raw);
                var selected = new HashSet<int>((raw ?? new int[0]).Where(validIds.Contains));
                if (aq.Question.Type != QuestionType.MultipleChoice && selected.Count > 1) selected = new HashSet<int>(selected.Take(1));
                var correctIds = new HashSet<int>(aq.Question.Options.Where(o => o.IsCorrect).Select(o => o.Id));
                var ok = ScoringEngine.IsCorrect(correctIds, selected);
                var points = ok ? aq.Points : 0;
                score += points; max += aq.Points;

                attempt.Answers.Add(new AssessmentAnswer
                {
                    QuestionId = aq.QuestionId,
                    SelectedOptionIds = string.Join(",", selected.OrderBy(i => i)),
                    IsCorrect = ok, PointsAwarded = points, MaxPoints = aq.Points
                });
                foreach (var qs in aq.Question.Skills)
                {
                    int[] st;
                    if (!skillStats.TryGetValue(qs.SkillId, out st)) skillStats[qs.SkillId] = st = new int[2];
                    st[1]++; if (ok) st[0]++;
                }
            }

            attempt.Score = score; attempt.MaxScore = max;
            attempt.Percent = ScoringEngine.Percent(score, max);
            attempt.Passed = attempt.Percent >= a.PassPercent;
            attempt.SubmittedDate = now;
            attempt.Status = AttemptStatus.Submitted;

            if (skillStats.Count > 0)
            {
                var ids = skillStats.Keys.ToList();
                var existing = await _db.SkillProgresses.Where(p => p.UserId == userId && ids.Contains(p.SkillId)).ToListAsync();
                foreach (var kv in skillStats)
                {
                    var p = existing.FirstOrDefault(x => x.SkillId == kv.Key);
                    if (p == null) { p = new SkillProgress { UserId = userId, SkillId = kv.Key }; _db.SkillProgresses.Add(p); }
                    p.CorrectCount += kv.Value[0]; p.TotalCount += kv.Value[1];
                }
            }
            await _db.SaveChangesAsync(); // một lần: attempt + answers + skill progress cùng thành công/thất bại
            return attempt;
        }

        public async Task<AttemptResult> GetResultAsync(string userId, int attemptId)
        {
            var attempt = await _db.AssessmentAttempts.Include(t => t.Answers).FirstOrDefaultAsync(t => t.Id == attemptId && t.UserId == userId);
            if (attempt == null || attempt.Status != AttemptStatus.Submitted) return null;
            var a = await _db.Assessments.FirstAsync(x => x.Id == attempt.AssessmentId);
            var qids = attempt.Answers.Select(x => x.QuestionId).ToList();
            var questions = await _db.Questions.Include(q => q.Options).Include(q => q.Skills.Select(s => s.Skill))
                .Where(q => qids.Contains(q.Id)).ToListAsync();
            var order = await _db.AssessmentQuestions.Where(x => x.AssessmentId == a.Id).ToDictionaryAsync(x => x.QuestionId, x => x.SortOrder);

            var show = a.ShowAnswersAfterSubmit;
            var items = new List<ResultItem>();
            var skills = new Dictionary<int, SkillResult>();
            var wrongLessonIds = new List<int>();
            foreach (var ans in attempt.Answers.OrderBy(x => order.ContainsKey(x.QuestionId) ? order[x.QuestionId] : 0))
            {
                var q = questions.First(x => x.Id == ans.QuestionId);
                var sel = ScoringEngine.ParseIds(ans.SelectedOptionIds);
                items.Add(new ResultItem
                {
                    QuestionId = q.Id, Text = q.Text, IsCorrect = ans.IsCorrect,
                    PointsAwarded = ans.PointsAwarded, MaxPoints = ans.MaxPoints,
                    Explanation = show ? q.Explanation : null,
                    Options = q.Options.OrderBy(o => o.SortOrder).ThenBy(o => o.Id).Select(o => new ResultOption
                    { Id = o.Id, Text = o.Text, Selected = sel.Contains(o.Id), IsCorrect = show ? o.IsCorrect : (bool?)null }).ToList()
                });
                foreach (var qs in q.Skills)
                {
                    SkillResult r;
                    if (!skills.TryGetValue(qs.SkillId, out r)) skills[qs.SkillId] = r = new SkillResult { SkillId = qs.SkillId, Name = qs.Skill.Name };
                    r.Total++; if (ans.IsCorrect) r.Correct++;
                }
                if (!ans.IsCorrect && q.LessonId.HasValue) wrongLessonIds.Add(q.LessonId.Value);
            }

            var weak = skills.Values.Where(s => s.Percent < ScoringEngine.WeakSkillPercent).OrderBy(s => s.Percent).ToList();
            var ids = wrongLessonIds.Distinct().ToList();
            var lessons = ids.Count == 0 ? new List<RecommendedLesson>() : await _db.Lessons
                .Where(l => ids.Contains(l.Id) && l.Status == PublishStatus.Published)
                .Select(l => new RecommendedLesson { LessonId = l.Id, Title = l.Title, CourseId = l.Section.CourseId, CourseSlug = l.Section.Course.Slug })
                .ToListAsync();

            return new AttemptResult
            {
                Attempt = attempt, Assessment = a, Items = items, ShowAnswers = show,
                Skills = skills.Values.OrderBy(s => s.Name).ToList(), WeakSkills = weak, RecommendedLessons = lessons
            };
        }

        private static List<AssessmentQuestion> Shuffle(List<AssessmentQuestion> list, int seed)
        {
            var rnd = new Random(seed);
            return list.OrderBy(_ => rnd.Next()).ToList();
        }
    }
}
