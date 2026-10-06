using System.Web.Mvc;

namespace TechKidPro.Web
{
    public static class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
            // Bắt buộc đăng nhập mặc định; controller công khai dùng [AllowAnonymous].
            filters.Add(new AuthorizeAttribute());
        }
    }
}
