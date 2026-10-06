using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using TechKidPro.Core.Enums;
using TechKidPro.Data;
using TechKidPro.Core.Interfaces;
using TechKidPro.Services.Enrollments;

namespace TechKidPro.Services.Access
{
    /// <summary>
    /// Phase 2–3: CanAccessCourse và CanTakeAssessment (qua Enrollment). Các capability khác mặc định TỪ CHỐI
    /// cho tới khi hệ thống Entitlement (Phase 5) được xây.
    /// </summary>
    public class AccessControlService : IAccessControlService
    {
        private readonly IEnrollmentService _enrollments;
        private readonly ApplicationDbContext _db;
        public AccessControlService(IEnrollmentService enrollments, ApplicationDbContext db) { _enrollments = enrollments; _db = db; }

        public Task<bool> CanAccessCourseAsync(string userId, int courseId)
        {
            return _enrollments.IsEnrolledAsync(userId, courseId);
        }

        public Task<bool> HasEntitlementAsync(string userId, string capabilityCode, int? courseId = null) { return Task.FromResult(false); }
        /// <summary>Phase 3: Assessment Published và đã Enroll vào Course của nó. Phase 5 bổ sung kiểm tra EXAM_ACCESS/QUIZ_ACCESS.</summary>
        public async Task<bool> CanTakeAssessmentAsync(string userId, int assessmentId)
        {
            var a = await _db.Assessments.Where(x => x.Id == assessmentId && x.Status == PublishStatus.Published)
                .Select(x => new { x.CourseId }).FirstOrDefaultAsync();
            return a != null && await _enrollments.IsEnrolledAsync(userId, a.CourseId);
        }
        public Task<bool> CanBookMentorAsync(string userId) { return Task.FromResult(false); }
        public Task<bool> CanBookOneToOneMentorAsync(string userId) { return Task.FromResult(false); }
        public Task<int?> GetRemainingUsageAsync(string userId, string capabilityCode) { return Task.FromResult<int?>(0); }
    }
}
