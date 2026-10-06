using TechKidPro.Core.Common;

namespace TechKidPro.Core.Entities.Identity
{
    public class UserProfile : AuditableEntity
    {
        public string UserId { get; set; }
        public string DisplayName { get; set; }
        public string AvatarUrl { get; set; }
        public string Bio { get; set; }
    }
}
