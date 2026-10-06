using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using TechKidPro.Core.Entities.Access;
using TechKidPro.Core.Enums;
using TechKidPro.Data;

namespace TechKidPro.Services.Enrollments
{
    public interface IEnrollmentService
    {
        /// <summary>Idempotent: đã có Enrollment thì kích hoạt lại nếu hết hạn/hủy. Phase 5 gọi sau khi Payment được xác minh.</summary>
        Task<TechKidPro.Core.Entities.Access.Enrollment> EnrollAsync(string userId, int courseId, DateTime? expiresDate = null, int? subscriptionId = null);
        Task<IList<TechKidPro.Core.Entities.Access.Enrollment>> GetActiveForUserAsync(string userId);
        Task<bool> IsEnrolledAsync(string userId, int courseId);
    }

    public class EnrollmentService : IEnrollmentService
    {
        private readonly ApplicationDbContext _db;
        public EnrollmentService(ApplicationDbContext db) { _db = db; }

        public async Task<TechKidPro.Core.Entities.Access.Enrollment> EnrollAsync(string userId, int courseId, DateTime? expiresDate = null, int? subscriptionId = null)
        {
            if (string.IsNullOrEmpty(userId)) throw new ArgumentException("userId");
            var course = await _db.Courses.FirstOrDefaultAsync(c => c.Id == courseId);
            if (course == null || course.Status != PublishStatus.Published)
                throw new InvalidOperationException("Khóa học không tồn tại hoặc chưa được xuất bản.");

            var e = await _db.Enrollments.FirstOrDefaultAsync(x => x.UserId == userId && x.CourseId == courseId);
            if (e == null)
            {
                e = new TechKidPro.Core.Entities.Access.Enrollment { UserId = userId, CourseId = courseId, EnrolledDate = DateTime.UtcNow };
                _db.Enrollments.Add(e);
            }
            e.Status = EnrollmentStatus.Active;
            e.ExpiresDate = expiresDate;
            e.SubscriptionId = subscriptionId ?? e.SubscriptionId;
            await _db.SaveChangesAsync();
            return e;
        }

        public async Task<IList<TechKidPro.Core.Entities.Access.Enrollment>> GetActiveForUserAsync(string userId)
        {
            var now = DateTime.UtcNow;
            return await _db.Enrollments.Include(e => e.Course)
                .Where(e => e.UserId == userId && e.Status == EnrollmentStatus.Active && (e.ExpiresDate == null || e.ExpiresDate > now))
                .OrderByDescending(e => e.EnrolledDate).ToListAsync();
        }

        public async Task<bool> IsEnrolledAsync(string userId, int courseId)
        {
            var now = DateTime.UtcNow;
            return await _db.Enrollments.AnyAsync(e => e.UserId == userId && e.CourseId == courseId
                && e.Status == EnrollmentStatus.Active && (e.ExpiresDate == null || e.ExpiresDate > now));
        }
    }
}
