using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using TechKidPro.Core.Entities.Learning;
using TechKidPro.Core.Enums;
using TechKidPro.Data;
using TechKidPro.Services.Common;

namespace TechKidPro.Services.Progress
{
    public class CourseProgressInfo
    {
        public int CourseId { get; set; }
        public int TotalLessons { get; set; }
        public int CompletedLessons { get; set; }
        public int Percent { get { return ProgressCalculator.Percent(CompletedLessons, TotalLessons); } }
        public HashSet<int> CompletedLessonIds { get; set; } = new HashSet<int>();
        /// <summary>Id bài đã học gần nhất (để "Tiếp tục học"); null nếu chưa học.</summary>
        public int? LastLessonId { get; set; }
    }

    public interface IProgressService
    {
        Task MarkCompleteAsync(string userId, int lessonId);
        Task<CourseProgressInfo> GetCourseProgressAsync(string userId, int courseId);
        Task<IDictionary<int, int>> GetPercentByCourseAsync(string userId, IEnumerable<int> courseIds);
    }

    public class ProgressService : IProgressService
    {
        private readonly ApplicationDbContext _db;
        public ProgressService(ApplicationDbContext db) { _db = db; }

        public async Task MarkCompleteAsync(string userId, int lessonId)
        {
            var lesson = await _db.Lessons.Include(l => l.Section).FirstOrDefaultAsync(l => l.Id == lessonId && l.Status == PublishStatus.Published);
            if (lesson == null) throw new InvalidOperationException("Bài học không tồn tại.");
            var p = await _db.LessonProgresses.FirstOrDefaultAsync(x => x.UserId == userId && x.LessonId == lessonId);
            if (p == null)
            {
                p = new LessonProgress { UserId = userId, LessonId = lessonId, CourseId = lesson.Section.CourseId };
                _db.LessonProgresses.Add(p);
            }
            if (p.Status != ProgressStatus.Completed)
            {
                p.Status = ProgressStatus.Completed;
                p.CompletedDate = DateTime.UtcNow;
            }
            await _db.SaveChangesAsync();
        }

        public async Task<CourseProgressInfo> GetCourseProgressAsync(string userId, int courseId)
        {
            var publishedIds = await _db.Lessons
                .Where(l => l.Section.CourseId == courseId && l.Status == PublishStatus.Published)
                .Select(l => l.Id).ToListAsync();
            var done = await _db.LessonProgresses
                .Where(p => p.UserId == userId && p.CourseId == courseId && p.Status == ProgressStatus.Completed)
                .Select(p => new { p.LessonId, p.CompletedDate }).ToListAsync();
            var doneIds = new HashSet<int>(done.Select(d => d.LessonId).Where(publishedIds.Contains));
            var last = done.Where(d => doneIds.Contains(d.LessonId)).OrderByDescending(d => d.CompletedDate).FirstOrDefault();
            return new CourseProgressInfo
            {
                CourseId = courseId,
                TotalLessons = publishedIds.Count,
                CompletedLessons = doneIds.Count,
                CompletedLessonIds = doneIds,
                LastLessonId = last == null ? (int?)null : last.LessonId
            };
        }

        public async Task<IDictionary<int, int>> GetPercentByCourseAsync(string userId, IEnumerable<int> courseIds)
        {
            var result = new Dictionary<int, int>();
            foreach (var id in courseIds.Distinct())
                result[id] = (await GetCourseProgressAsync(userId, id)).Percent;
            return result;
        }
    }
}
