# Phase 2 – Course / LMS

## Phân tích domain (doc §74)

**Phạm vi Phase 2**: Category, Course, Module (CourseSection), Lesson, Content, Enrollment, Progress, Course Catalog.

**Entity mới**: `Enrollment` (Access context), `LessonProgress` (Learning context).
`ModuleProgress` và `CourseProgress` **tính từ LessonProgress** khi truy vấn (không lưu bảng riêng) – tránh dữ liệu lệch; có thể materialize ở Phase 9 (Analytics) nếu cần hiệu năng.

**Quan hệ**: User 1–* Enrollment *–1 Course; User 1–* LessonProgress *–1 Lesson. Unique (UserId, CourseId) và (UserId, LessonId).

**Business rules**
1. Chỉ Course `Published` xuất hiện ở Catalog; chỉ Lesson `Published` hiện cho học viên.
2. Course chỉ được Publish khi có ≥ 1 Lesson Published.
3. Truy cập Course Player ⇔ `IAccessControlService.CanAccessCourseAsync` (Enrollment Active và chưa hết hạn). Admin được xem trước.
4. Enrollment không chứa logic payment. Phase 2 cho **đăng ký học miễn phí** để dùng thử luồng LMS; Phase 5 thay bằng Order → Payment → Enrollment, `IEnrollmentService.EnrollAsync` giữ nguyên.
5. Hết hạn/hủy: Enrollment đổi trạng thái, `LessonProgress` giữ nguyên.
6. Mark Complete idempotent; tiến độ % = bài hoàn thành / số bài Published.
7. Nội dung bài học: lưu `DataJson` theo `BlockType`; render luôn HTML-encode, URL chỉ nhận http/https, video qua `IVideoProvider` (YouTube trước, provider khác thêm sau).
8. Không hard-code CourseId/Slug; dữ liệu mẫu seed theo slug và idempotent.

**Service**: `ICatalogService`, `ICourseAdminService`, `IEnrollmentService`, `IProgressService`, `IAccessControlService` (mới chỉ `CanAccessCourse`; các capability khác mặc định **từ chối** đến Phase 5).

**Khả năng mở rộng** (§78): thêm Course mới = thêm dữ liệu qua Admin; không code nào nhắc tên Course.

## UI
- Public: `/Catalog` (lọc theo category), `/Catalog/Details/{slug}` (đề cương + nút Đăng ký học).
- Student: `Student/Courses` (khóa của tôi + %), `Student/Courses/Learn/{slug}?lessonId=` (Course Player: đề cương bên trái, bài bên phải, Mark Complete; mobile xếp dọc).
- Admin: `Admin/Courses` (danh sách, tạo/sửa, đổi trạng thái), `Curriculum` (module/bài/nội dung), `Admin/Categories`.

## Kiểm thử cuối phase
Build · Migration (`Add-Migration Phase2`) · Đăng nhập Admin → tạo course/section/lesson/content → Publish → Student đăng ký, học, Mark Complete, thấy % · Student không vào được Admin · Course chưa enroll không vào được Player · giao diện mobile.
