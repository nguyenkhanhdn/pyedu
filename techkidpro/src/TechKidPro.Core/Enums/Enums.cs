namespace TechKidPro.Core.Enums
{
    public enum PublishStatus { Draft = 0, Review = 1, Published = 2, Archived = 3 }

    public enum LessonBlockType { Text = 0, Video = 1, Image = 2, Code = 3, Quiz = 4, File = 5, Embed = 6 }

    /// <summary>Tên role Identity. Quyền theo gói dùng Capability, không dùng Role.</summary>
    public static class RoleNames
    {
        public const string Student = "Student";
        public const string Mentor = "Mentor";
        public const string Admin = "Admin";
        public static readonly string[] All = { Student, Mentor, Admin };
    }
}

namespace TechKidPro.Core.Enums
{
    public enum EnrollmentStatus { Active = 0, Expired = 1, Cancelled = 2 }
    public enum ProgressStatus { NotStarted = 0, InProgress = 1, Completed = 2 }
}
