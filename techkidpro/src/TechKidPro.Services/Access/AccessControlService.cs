using System.Threading.Tasks;
using TechKidPro.Core.Interfaces;
using TechKidPro.Services.Enrollments;

namespace TechKidPro.Services.Access
{
    /// <summary>
    /// Phase 2: chỉ CanAccessCourse (qua Enrollment). Các capability khác mặc định TỪ CHỐI
    /// cho tới khi hệ thống Entitlement (Phase 5) được xây.
    /// </summary>
    public class AccessControlService : IAccessControlService
    {
        private readonly IEnrollmentService _enrollments;
        public AccessControlService(IEnrollmentService enrollments) { _enrollments = enrollments; }

        public Task<bool> CanAccessCourseAsync(string userId, int courseId)
        {
            return _enrollments.IsEnrolledAsync(userId, courseId);
        }

        public Task<bool> HasEntitlementAsync(string userId, string capabilityCode, int? courseId = null) { return Task.FromResult(false); }
        public Task<bool> CanTakeAssessmentAsync(string userId, int assessmentId) { return Task.FromResult(false); }
        public Task<bool> CanBookMentorAsync(string userId) { return Task.FromResult(false); }
        public Task<bool> CanBookOneToOneMentorAsync(string userId) { return Task.FromResult(false); }
        public Task<int?> GetRemainingUsageAsync(string userId, string capabilityCode) { return Task.FromResult<int?>(0); }
    }
}
