using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using TechKidPro.Core.Interfaces;
using TechKidPro.Data;
using TechKidPro.Infrastructure.Providers;
using TechKidPro.Services.Access;
using TechKidPro.Services.Assessments;
using TechKidPro.Services.Skills;
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
        private ISkillService _skills;
        private IQuestionService _questions;
        private IAssessmentAdminService _assessmentAdmin;
        private IAssessmentService _assessments;

        protected ApplicationDbContext Db { get { return HttpContext.GetOwinContext().Get<ApplicationDbContext>(); } }
        protected string CurrentUserId { get { return User.Identity.GetUserId(); } }

        protected ICatalogService Catalog { get { return _catalog ?? (_catalog = new CatalogService(Db)); } }
        protected ICourseAdminService CourseAdmin { get { return _courseAdmin ?? (_courseAdmin = new CourseAdminService(Db)); } }
        protected IEnrollmentService Enrollments { get { return _enrollments ?? (_enrollments = new EnrollmentService(Db)); } }
        protected IProgressService Progress { get { return _progress ?? (_progress = new ProgressService(Db)); } }
        protected IAccessControlService Access { get { return _access ?? (_access = new AccessControlService(Enrollments, Db)); } }
        protected ISkillService Skills { get { return _skills ?? (_skills = new SkillService(Db)); } }
        protected IQuestionService Questions { get { return _questions ?? (_questions = new QuestionService(Db)); } }
        protected IAssessmentAdminService AssessmentAdmin { get { return _assessmentAdmin ?? (_assessmentAdmin = new AssessmentAdminService(Db)); } }
        protected IAssessmentService Assessments { get { return _assessments ?? (_assessments = new AssessmentService(Db)); } }
        protected IVideoProvider VideoProvider { get { return new YouTubeVideoProvider(); } }
    }
}
