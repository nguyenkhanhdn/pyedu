using System.ComponentModel.DataAnnotations;

namespace TechKidPro.Web.Models
{
    public class LoginViewModel
    {
        [Required, EmailAddress, Display(Name = "Email")]
        public string Email { get; set; }

        [Required, DataType(DataType.Password), Display(Name = "Mật khẩu")]
        public string Password { get; set; }

        [Display(Name = "Ghi nhớ đăng nhập")]
        public bool RememberMe { get; set; }
    }

    public class RegisterViewModel
    {
        [Required, StringLength(200), Display(Name = "Họ tên")]
        public string DisplayName { get; set; }

        [Required, EmailAddress, Display(Name = "Email")]
        public string Email { get; set; }

        [Required, StringLength(100, MinimumLength = 8), DataType(DataType.Password), Display(Name = "Mật khẩu")]
        public string Password { get; set; }

        [DataType(DataType.Password), Compare("Password", ErrorMessage = "Mật khẩu xác nhận không khớp."), Display(Name = "Nhập lại mật khẩu")]
        public string ConfirmPassword { get; set; }
    }
}
