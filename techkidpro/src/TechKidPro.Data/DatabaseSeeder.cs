using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using TechKidPro.Core.Enums;

namespace TechKidPro.Data
{
    public static class DatabaseSeeder
    {
        /// <summary>Gọi từ Migrations Configuration.Seed hoặc lúc khởi động; idempotent.</summary>
        public static void SeedRoles(ApplicationDbContext context)
        {
            var roleManager = new RoleManager<ApplicationRole>(new RoleStore<ApplicationRole>(context));
            foreach (var name in RoleNames.All)
            {
                if (!roleManager.RoleExists(name))
                    roleManager.Create(new ApplicationRole(name));
            }
        }
    }
}
