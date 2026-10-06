using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using TechKidPro.Core.Interfaces;
using TechKidPro.Data;
using TechKidPro.Infrastructure.Providers;
using TechKidPro.Services.Access;
using TechKidPro.Services.Courses;
using TechKidPro.Services.Enrollments;
using TechKidPro.Services.Progress;

namespace TechKidPro.Web.Controllers
{
    /// <summary>
    /// Gốc của mọi controller: dựng service từ DbContext của request (một context/request qua OWIN).
    /// Khi số service tăng, thay bằng DI container.
    /// </summary>
    public abstract class AppController : Controller
    {
        private ICatalogService _catalog;
        private ICourseAdminService _courseAdmin;
        private IEnrollmentService _enrollments;
        private IProgressService _progress;
        private IAccessControlService _access;

        protected ApplicationDbContext Db { get { return HttpContext.GetOwinContext().Get<ApplicationDbContext>(); } }
        protected string CurrentUserId { get { return User.Identity.GetUserId(); } }

        protected ICatalogService Catalog { get { return _catalog ?? (_catalog = new CatalogService(Db)); } }
        protected ICourseAdminService CourseAdmin { get { return _courseAdmin ?? (_courseAdmin = new CourseAdminService(Db)); } }
        protected IEnrollmentService Enrollments { get { return _enrollments ?? (_enrollments = new EnrollmentService(Db)); } }
        protected IProgressService Progress { get { return _progress ?? (_progress = new ProgressService(Db)); } }
        protected IAccessControlService Access { get { return _access ?? (_access = new AccessControlService(Enrollments)); } }
        protected IVideoProvider VideoProvider { get { return new YouTubeVideoProvider(); } }
    }
}
