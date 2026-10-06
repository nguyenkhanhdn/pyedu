# TechKidPro – ERD (Mermaid)

Quy ước: PK `Id` (int identity, riêng Identity dùng string như ASP.NET Identity mặc định). Cột audit `CreatedDate, CreatedBy, UpdatedDate, UpdatedBy` có ở mọi bảng nghiệp vụ, không vẽ lại.
Phase 1 chỉ hiện thực hóa nhóm **Identity + Catalog lõi** (xem `Core/Entities`); phần còn lại là thiết kế cho các phase sau.

## Identity & Catalog (Phase 1–2)

```mermaid
erDiagram
  ApplicationUser ||--|| UserProfile : has
  ApplicationUser }o--o{ ApplicationRole : "AspNetUserRoles"
  Category ||--o{ CourseCategory : ""
  Course ||--o{ CourseCategory : ""
  Course ||--o{ CourseSection : contains
  CourseSection ||--o{ Lesson : contains
  Lesson ||--o{ LessonContent : "blocks (ordered)"
  Course { int Id string Slug string Title string Status string SettingsJson }
  Lesson { int Id int SectionId string Title int SortOrder string Status }
  LessonContent { int Id int LessonId string BlockType string DataJson int SortOrder }
```

## Assessment & Skill (Phase 3–4)

```mermaid
erDiagram
  Course ||--o{ Assessment : ""
  Assessment ||--o{ AssessmentQuestion : ""
  Question ||--o{ AssessmentQuestion : ""
  Question ||--o{ QuestionOption : ""
  Question ||--o{ QuestionSkill : ""
  Skill ||--o{ QuestionSkill : ""
  SkillCategory ||--o{ Skill : ""
  Assessment ||--o{ AssessmentAttempt : ""
  AssessmentAttempt ||--o{ AssessmentAnswer : ""
  ApplicationUser ||--o{ AssessmentAttempt : takes
  ApplicationUser ||--o{ SkillProgress : ""
  Skill ||--o{ SkillProgress : ""
  ExamTemplate ||--o{ ExamRule : ""
  ExamTemplate ||--o{ Assessment : "optional"
```

## Commerce & Access (Phase 5–6)

```mermaid
erDiagram
  Course ||--o{ Package : "sold as"
  Capability ||--o{ PackageEntitlement : ""
  Package ||--o{ PackageEntitlement : ""
  Package ||--o{ Product : ""
  Bundle ||--o{ BundleItem : ""
  BundleItem }o--|| Package : ""
  Bundle ||--o{ Product : ""
  Product ||--o{ OrderItem : ""
  Order ||--o{ OrderItem : ""
  Order ||--o{ Payment : ""
  Payment ||--o{ PaymentTransaction : ""
  Coupon ||--o{ Order : "applied"
  OrderItem ||--o| Subscription : grants
  Subscription ||--o{ Entitlement : ""
  Capability ||--o{ Entitlement : ""
  Entitlement ||--o{ EntitlementUsage : ""
  Subscription ||--o{ Enrollment : ""
  Course ||--o{ Enrollment : ""
  ApplicationUser ||--o{ Enrollment : ""
  ApplicationUser ||--o{ Order : places
```

## Mentoring (Phase 7–8)

```mermaid
erDiagram
  ApplicationUser ||--o| MentorProfile : ""
  MentorProfile ||--o{ MentorSkill : ""
  MentorProfile ||--o{ MentorCourse : ""
  MentorProfile ||--o{ MentorPackage : ""
  MentorProfile ||--o{ MentorGroup : leads
  MentorGroup ||--o{ MentorGroupMember : ""
  MentorProfile ||--o{ MentorAvailability : ""
  MentorAvailability ||--o| MentorAppointment : booked
  MentorAppointment ||--o| MentorSession : ""
  MentorSession ||--o{ MentorFeedback : ""
  MentorFeedback }o--o| Skill : about
  Conversation ||--o{ ConversationMember : ""
  Conversation ||--o{ Message : ""
  ApplicationUser ||--o{ Notification : ""
```

## Progress & Analytics

`CourseProgress`, `ModuleProgress`, `LessonProgress`, `AssessmentProgress` (một dòng/user/đối tượng, % + trạng thái) và `LearningActivity` (log sự kiện append-only phục vụ dashboard).
