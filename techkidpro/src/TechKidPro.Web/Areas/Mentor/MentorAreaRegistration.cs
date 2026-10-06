using System.Web.Mvc;

namespace TechKidPro.Web.Areas.Mentor
{
    public class MentorAreaRegistration : AreaRegistration
    {
        public override string AreaName { get { return "Mentor"; } }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute("Mentor_default", "Mentor/{controller}/{action}/{id}",
                new { controller = "Dashboard", action = "Index", id = UrlParameter.Optional },
                new[] { "TechKidPro.Web.Areas.Mentor.Controllers" });
        }
    }
}
