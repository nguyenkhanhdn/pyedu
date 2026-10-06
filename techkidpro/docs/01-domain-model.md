# TechKidPro – Domain Model & Bounded Contexts

Nguồn: `TECHKIDPRO.docx`. Stack bắt buộc: .NET Framework 4.8, ASP.NET MVC 5, EF6, ASP.NET Identity, SQL Server. Không dùng ASP.NET Core / EF Core.
Kiểu triển khai: **modular monolith**, ranh giới module rõ ràng, tách service sau nếu cần.

## 1. Khái niệm lõi (không được trộn lẫn)

| Khái niệm | Ý nghĩa | Thuộc context |
|---|---|---|
| Course | Nội dung học | Catalog / Learning |
| Package | Gói tính năng thương mại hóa một Course | Commerce |
| Product | Thứ được bán (CoursePackage, Bundle, Subscription) | Commerce |
| Order | Giao dịch mua | Commerce |
| Entitlement | Quyền người dùng được cấp (capability + limit + period + scope) | Access |
| Enrollment | User được học Course nào | Access |
| Mentor | Dịch vụ hỗ trợ người học | Mentoring |
| Assessment | Cơ chế đánh giá (Quiz/Practice/MockExam/...) | Assessment |
| Skill | Năng lực được đánh giá | Skill |

Quy tắc: **không** viết `if package == "Premium"` hay `if course == "Python"`. Mọi kiểm tra quyền đi qua `IAccessControlService.HasEntitlement(...)`. Luật thi THPT nằm trong `ExamTemplate/ExamRule`, không nằm trong Assessment Engine lõi.

## 2. Bounded Context

| # | Context | Trách nhiệm | Phụ thuộc vào |
|---|---|---|---|
| 1 | Identity | User, Role, Profile, đăng nhập | – |
| 2 | Catalog | Course, Category, Section, Lesson, LessonContent, vòng đời Draft→Review→Published→Archived | Identity |
| 3 | Learning | Course Player, LessonProgress, ModuleProgress, CourseProgress | Catalog, Access |
| 4 | Assessment | QuestionBank, Question, Assessment, Attempt, Answer, ExamTemplate/Rule | Catalog, Skill |
| 5 | Skill | Skill, SkillCategory, QuestionSkill, SkillProgress, Recommendation | Assessment, Catalog |
| 6 | Commerce | Product, Package, Bundle, Pricing, Order, Payment, Coupon | Catalog |
| 7 | Access | Entitlement, EntitlementUsage, Subscription, License, Enrollment, `IAccessControlService` | Commerce, Catalog |
| 8 | Mentoring | MentorProfile, MentorCourse/Package, Group, Availability, Appointment, Session, Feedback, Conversation | Identity, Access, Catalog |
| 9 | Notification | In-app, Email, preference | mọi context (qua service) |
| 10 | Analytics | LearningActivity, báo cáo Admin/Mentor | đọc từ mọi context |
| 11 | Administration | UI quản trị, cấu hình, import | mọi context |

Hướng phụ thuộc: Commerce → Access (cấp quyền sau Payment Success) → Learning/Assessment/Mentoring kiểm tra quyền. Catalog không biết gì về giá, mentor, payment.

## 3. Mô hình Entitlement (trọng tâm)

```
Package 1──* PackageEntitlement(CapabilityCode, Limit?, Period, Scope)
Order paid ─► Subscription ─► *Entitlement (copy từ PackageEntitlement, có ValidFrom/To, Scope)
Entitlement 1──* EntitlementUsage(Used, PeriodStart, PeriodEnd)
Order paid ─► Enrollment(User, Course, SubscriptionId)
```

- `Capability` là bảng dữ liệu (COURSE_ACCESS, QUIZ_ACCESS, PRACTICE_ACCESS, EXAM_ACCESS, VIDEO_ACCESS, DOWNLOAD_ACCESS, MENTOR_GROUP, MENTOR_QA, MENTOR_ONE_TO_ONE, PRIORITY_SUPPORT, CERTIFICATE) → tạo Package "VIP" chỉ cần thêm dữ liệu.
- `Period`: None | Day | Week | Month | Subscription. `Scope`: Platform | Course | Package | Bundle (+ `ScopeId`).
- Upgrade Basic→Pro: cấp **phần chênh lệch** capability, không nhân đôi dữ liệu.
- Hết hạn: Enrollment/Entitlement → Expired; lịch sử học, quiz, mentor, feedback giữ nguyên.

## 4. Luồng thương mại

Course Detail → chọn Package → Order → Payment (qua `IPaymentGateway`) → **server xác minh transaction** → tạo Subscription + Entitlement + Enrollment → truy cập.
Frontend báo "thành công" không bao giờ đủ để cấp quyền.

## 5. Abstraction ngoài

`IPaymentGateway` (Manual, VNPay, MoMo, ZaloPay, Stripe), `IVideoProvider`, `IMeetingProvider` (phase đầu chỉ lưu URL), `INotificationChannel`.

## 6. Vòng đời trạng thái

- Course: Draft → Review → Published → Archived
- Package: Draft → Active → Inactive
- Subscription: Pending / Active / Expired / Cancelled / Suspended
- MentorAppointment: Available → Booked → Confirmed → Completed / Cancelled / NoShow
- MentorSession: Scheduled → Confirmed → InProgress → Completed / Cancelled / NoShow

## 7. Quy tắc chung

- Entity quan trọng có `CreatedDate/CreatedBy/UpdatedDate/UpdatedBy`; audit Order, Payment, Entitlement, License, Question, Exam, Mentor session.
- Mentor chỉ thấy học viên thuộc Group/Course được assign.
- Không trả đáp án đúng trước khi submit.
- Không over-engineer: chưa microservice, event bus, AI, video server, coding judge, realtime chat.

## 8. Checklist 9 kịch bản nghiệm thu (doc §72)

| # | Kịch bản | Cơ chế đáp ứng |
|---|---|---|
| 1 | Admin tạo Course + Basic/Pro/Premium | Package + PackageEntitlement là dữ liệu |
| 2 | Mua Basic: có Course/Quiz/Practice, không Mentor | Chỉ cấp 3 capability |
| 3 | Mua Pro: thêm Mentor Group + Q&A | Thêm 2 capability |
| 4 | Mua Premium: thêm 1-1 | MENTOR_ONE_TO_ONE |
| 5 | 4 session/kỳ, track used/remaining | Limit=4, Period=Subscription, EntitlementUsage |
| 6 | Combo Web Developer tự enroll 3 course | Bundle/BundleItem → nhiều Enrollment |
| 7 | Thêm C++ không sửa Assessment Engine | Engine không biết Course cụ thể |
| 8 | Thêm SQL không sửa Mentoring | Mentoring gắn qua MentorCourse |
| 9 | Package VIP không sửa code | Dữ liệu Capability |
