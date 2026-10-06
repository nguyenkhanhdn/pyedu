using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace TechKidPro.Data
{
    public class ApplicationUser : IdentityUser
    {
        public string DisplayName { get; set; }
        public bool IsActive { get; set; } = true;
        public System.DateTime CreatedDate { get; set; } = System.DateTime.UtcNow;

        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<ApplicationUser> manager)
        {
            return await manager.CreateIdentityAsync(this, DefaultAuthenticationTypes.ApplicationCookie);
        }
    }

    public class ApplicationRole : IdentityRole
    {
        public ApplicationRole() { }
        public ApplicationRole(string name) : base(name) { }
        public string Description { get; set; }
    }
}
