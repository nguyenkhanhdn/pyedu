using TechKidPro.Core.Common;

namespace TechKidPro.Core.Entities.Skills
{
    public class SkillCategory : AuditableEntity
    {
        public string Name { get; set; }
    }

    /// <summary>Đơn vị kiến thức/năng lực. CourseId chỉ là ngữ cảnh gợi ý (có thể null = dùng chung).</summary>
    public class Skill : AuditableEntity
    {
        public string Code { get; set; }
        public string Name { get; set; }
        public int? CourseId { get; set; }
        public int? CategoryId { get; set; }
        public virtual SkillCategory Category { get; set; }
    }

    /// <summary>Kết quả cộng dồn theo kỹ năng của từng người học.</summary>
    public class SkillProgress : AuditableEntity
    {
        public string UserId { get; set; }
        public int SkillId { get; set; }
        public int CorrectCount { get; set; }
        public int TotalCount { get; set; }
        public virtual Skill Skill { get; set; }

        public int Percent { get { return TotalCount <= 0 ? 0 : (int)System.Math.Round(CorrectCount * 100.0 / TotalCount); } }
    }
}
