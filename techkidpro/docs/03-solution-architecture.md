# TechKidPro – Solution Architecture & Phase 1

## Cấu trúc solution

```
TechKidPro.sln
├── TechKidPro.Core            (net48, class library) Entity, enum, interface (service/provider). Không phụ thuộc EF/MVC.
├── TechKidPro.Data            (net48) EF6 DbContext, Configurations, Migrations, ASP.NET Identity (ApplicationUser/Role)
├── TechKidPro.Services        (net48) Cài đặt service, chia thư mục theo module (Courses, Assessments, Mentoring, Commerce, Enrollment, Progress, Notifications, Users)
├── TechKidPro.Infrastructure  (net48) Logging, Email, Payment/Video/Meeting provider
├── TechKidPro.Web             (ASP.NET MVC 5) Areas: Student (mặc định), Mentor, Admin
└── TechKidPro.Tests           (net48, MSTest) Unit test
```

Phụ thuộc: Web → Services → Data → Core; Infrastructure → Core. DI container chưa chọn ở Phase 1 (Services dùng constructor injection, sẽ gắn Autofac/Unity khi có nhiều service).

## Quyết định chính

1. **Modular monolith**, ranh giới theo thư mục/namespace `TechKidPro.Core.Entities.<Module>`; module chỉ gọi nhau qua interface trong Core.
2. **Capability/Entitlement** thay mọi `if PackageName`. Controller dùng `[RequireEntitlement(Capability.X)]` (Phase 5) dựa trên `IAccessControlService`.
3. **Cấu hình theo dữ liệu**: `Course.SettingsJson`, `AssessmentTemplate`, `ExamRule` – không hard-code CourseId/PackageId/ExamId.
4. **Provider abstraction**: `IPaymentGateway`, `IVideoProvider`, `IMeetingProvider`.
5. **Audit**: `AuditableEntity` điền tự động trong `SaveChanges` qua `ICurrentUserProvider`.
6. **Bảo mật**: `[ValidateAntiForgeryToken]` trên mọi POST, `AuthorizeAttribute` toàn cục (mặc định phải đăng nhập, trang công khai dùng `[AllowAnonymous]`), Identity cookie, validate input, upload validation, không lộ đáp án.

## Phase 1 – Foundation (đã tạo trong repo)

- Solution gồm 5 project + test project (đường dẫn: `techkidpro/TechKidPro.sln`, mã trong `src/`).
- Identity: `ApplicationUser`, `ApplicationRole`, `UserProfile`, seed role Student/Mentor/Admin.
- `ApplicationDbContext` (EF6, Code First, Migrations bật bằng `Enable-Migrations`), `AuditableEntity` tự điền.
- Catalog lõi: `Course`, `Category`, `CourseSection`, `Lesson`, `LessonContent` (Phase 2 sẽ hoàn thiện service/UI).
- Core interface: `IAccessControlService`, `IPaymentGateway`, `IVideoProvider`, `IMeetingProvider`, `ICurrentUserProvider`.
- Web: layout Bootstrap 3 responsive, Home, Account (login/register/logout), 3 Area rỗng (Student/Mentor/Admin) với menu theo doc §56, `TraceLogger` (ILogger) thay cho thư viện log ngoài.

**Chưa kiểm tra build**: môi trường phiên này không có .NET SDK/Mono/MSBuild. Cần mở bằng Visual Studio 2019/2022 trên Windows, `Restore NuGet`, build, rồi chạy `Enable-Migrations` + `Add-Migration Initial` + `Update-Database`.

## Tiêu chí kết thúc Phase 1 (doc §74)
Build thành công · Migration thành công · Test DB · Test authorization (role) · Test luồng đăng nhập · Test responsive.
