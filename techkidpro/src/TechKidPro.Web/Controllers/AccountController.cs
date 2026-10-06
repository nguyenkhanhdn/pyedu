using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using TechKidPro.Core.Enums;
using TechKidPro.Data;
using TechKidPro.Web.Models;

namespace TechKidPro.Web.Controllers
{
    [AllowAnonymous]
    public class AccountController : Controller
    {
        private ApplicationUserManager UserManager { get { return HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>(); } }
        private ApplicationSignInManager SignInManager { get { return HttpContext.GetOwinContext().Get<ApplicationSignInManager>(); } }

        [HttpGet]
        public ActionResult Login(string returnUrl)
        {
            ViewBag.ReturnUrl = returnUrl;
            return View();
        }

        [HttpPost, ValidateAntiForgeryToken]
        public async Task<ActionResult> Login(LoginViewModel model, string returnUrl)
        {
            if (!ModelState.IsValid) return View(model);
            var result = await SignInManager.PasswordSignInAsync(model.Email, model.Password, model.RememberMe, shouldLockout: true);
            switch (result)
            {
                case SignInStatus.Success:
                    return Url.IsLocalUrl(returnUrl) ? (ActionResult)Redirect(returnUrl) : RedirectToAction("Index", "Home");
                case SignInStatus.LockedOut:
                    ModelState.AddModelError("", "Tài khoản tạm khóa do đăng nhập sai nhiều lần.");
                    return View(model);
                default:
                    ModelState.AddModelError("", "Email hoặc mật khẩu không đúng.");
                    return View(model);
            }
        }

        [HttpGet]
        public ActionResult Register() { return View(); }

        [HttpPost, ValidateAntiForgeryToken]
        public async Task<ActionResult> Register(RegisterViewModel model)
        {
            if (!ModelState.IsValid) return View(model);
            var user = new ApplicationUser { UserName = model.Email, Email = model.Email, DisplayName = model.DisplayName };
            var result = await UserManager.CreateAsync(user, model.Password);
            if (result.Succeeded)
            {
                // Đăng ký công khai luôn là Student; Mentor/Admin do Admin cấp.
                await UserManager.AddToRoleAsync(user.Id, RoleNames.Student);
                await SignInManager.SignInAsync(user, isPersistent: false, rememberBrowser: false);
                return RedirectToAction("Index", "Home");
            }
            foreach (var e in result.Errors) ModelState.AddModelError("", e);
            return View(model);
        }

        [HttpPost, ValidateAntiForgeryToken, Authorize]
        public ActionResult Logout()
        {
            HttpContext.GetOwinContext().Authentication.SignOut(DefaultAuthenticationTypes.ApplicationCookie);
            return RedirectToAction("Index", "Home");
        }
    }
}
