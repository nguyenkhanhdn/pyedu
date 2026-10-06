using System.Web;
using TechKidPro.Core.Interfaces;

namespace TechKidPro.Web
{
    /// <summary>Đọc user hiện tại tại thời điểm SaveChanges để điền cột audit.</summary>
    public class HttpCurrentUserProvider : ICurrentUserProvider
    {
        public string UserId
        {
            get
            {
                var ctx = HttpContext.Current;
                if (ctx == null || ctx.User == null || !ctx.User.Identity.IsAuthenticated) return null;
                return Microsoft.AspNet.Identity.IdentityExtensions.GetUserId(ctx.User.Identity);
            }
        }
    }
}
