using System.Threading.Tasks;

namespace TechKidPro.Core.Interfaces
{
    public interface ICurrentUserProvider
    {
        string UserId { get; }
    }

    /// <summary>Điểm kiểm tra quyền duy nhất. Không truy vấn tên Package ở Controller.</summary>
    public interface IAccessControlService
    {
        Task<bool> CanAccessCourseAsync(string userId, int courseId);
        Task<bool> HasEntitlementAsync(string userId, string capabilityCode, int? courseId = null);
        Task<bool> CanTakeAssessmentAsync(string userId, int assessmentId);
        Task<bool> CanBookMentorAsync(string userId);
        Task<bool> CanBookOneToOneMentorAsync(string userId);
        /// <summary>Số lần còn lại; null nếu không giới hạn.</summary>
        Task<int?> GetRemainingUsageAsync(string userId, string capabilityCode);
    }

    public class PaymentResult
    {
        public bool Verified { get; set; }
        public string ProviderTransactionId { get; set; }
        public decimal Amount { get; set; }
    }

    public interface IPaymentGateway
    {
        string Code { get; }
        string CreatePaymentUrl(int orderId, decimal amount, string returnUrl);
        /// <summary>Server xác minh giao dịch với nhà cung cấp; không tin kết quả phía client.</summary>
        Task<PaymentResult> VerifyAsync(System.Collections.Specialized.NameValueCollection callbackData);
    }

    public interface IVideoProvider
    {
        string GetEmbedUrl(string source);
    }

    public interface IMeetingProvider
    {
        string Code { get; }
        Task<string> CreateMeetingAsync(string title, System.DateTime start, System.DateTime end);
    }

    public interface ILogger
    {
        void Info(string message);
        void Warn(string message);
        void Error(string message, System.Exception ex = null);
    }
}
