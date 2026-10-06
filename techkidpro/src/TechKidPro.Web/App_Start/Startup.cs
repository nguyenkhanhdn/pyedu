using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using Microsoft.Owin.Security.Cookies;
using Owin;
using TechKidPro.Data;

[assembly: OwinStartup(typeof(TechKidPro.Web.Startup))]

namespace TechKidPro.Web
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.CreatePerOwinContext(() => new ApplicationDbContext(new HttpCurrentUserProvider()));
            app.CreatePerOwinContext<ApplicationUserManager>(ApplicationUserManager.Create);
            app.CreatePerOwinContext<ApplicationSignInManager>(ApplicationSignInManager.Create);

            app.UseCookieAuthentication(new CookieAuthenticationOptions
            {
                AuthenticationType = DefaultAuthenticationTypes.ApplicationCookie,
                LoginPath = new PathString("/Account/Login")
            });

            using (var db = new ApplicationDbContext())
            {
                DatabaseSeeder.SeedRoles(db);
                DatabaseSeeder.SeedCatalog(db);
            }
        }
    }
}
