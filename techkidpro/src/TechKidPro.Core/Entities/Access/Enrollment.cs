using System;
using TechKidPro.Core.Common;
using TechKidPro.Core.Entities.Catalog;
using TechKidPro.Core.Enums;

namespace TechKidPro.Core.Entities.Access
{
    /// <summary>User được học Course nào. Không chứa logic payment.</summary>
    public class Enrollment : AuditableEntity
    {
        public string UserId { get; set; }
        public int CourseId { get; set; }
        public EnrollmentStatus Status { get; set; }
        public DateTime EnrolledDate { get; set; }
        public DateTime? ExpiresDate { get; set; }
        /// <summary>Phase 6 nối với Subscription; null khi đăng ký miễn phí.</summary>
        public int? SubscriptionId { get; set; }
        public virtual Course Course { get; set; }

        public bool IsActive(DateTime utcNow)
        {
            return Status == EnrollmentStatus.Active && (!ExpiresDate.HasValue || ExpiresDate.Value > utcNow);
        }
    }
}
