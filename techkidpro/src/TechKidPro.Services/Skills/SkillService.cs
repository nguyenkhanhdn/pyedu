using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using TechKidPro.Core.Entities.Skills;
using TechKidPro.Data;
using TechKidPro.Services.Common;

namespace TechKidPro.Services.Skills
{
    public interface ISkillService
    {
        Task<IList<Skill>> GetAllAsync(int? courseId = null);
        Task<IList<SkillCategory>> GetCategoriesAsync();
        Task<SkillCategory> CreateCategoryAsync(string name);
        Task<Skill> CreateSkillAsync(string name, string code, int? courseId, int? categoryId);
        Task<IList<SkillProgress>> GetProgressAsync(string userId);
    }

    public class SkillService : ISkillService
    {
        private readonly ApplicationDbContext _db;
        public SkillService(ApplicationDbContext db) { _db = db; }

        public async Task<IList<Skill>> GetAllAsync(int? courseId = null)
        {
            var q = _db.Skills.Include(s => s.Category).AsQueryable();
            if (courseId.HasValue) q = q.Where(s => s.CourseId == null || s.CourseId == courseId);
            return await q.OrderBy(s => s.Name).ToListAsync();
        }

        public async Task<IList<SkillCategory>> GetCategoriesAsync()
        {
            return await _db.SkillCategories.OrderBy(c => c.Name).ToListAsync();
        }

        public async Task<SkillCategory> CreateCategoryAsync(string name)
        {
            if (string.IsNullOrWhiteSpace(name)) throw new InvalidOperationException("Tên nhóm kỹ năng không được để trống.");
            var c = new SkillCategory { Name = name.Trim() };
            _db.SkillCategories.Add(c);
            await _db.SaveChangesAsync();
            return c;
        }

        public async Task<Skill> CreateSkillAsync(string name, string code, int? courseId, int? categoryId)
        {
            if (string.IsNullOrWhiteSpace(name)) throw new InvalidOperationException("Tên kỹ năng không được để trống.");
            var c = (SlugHelper.ToSlug(string.IsNullOrWhiteSpace(code) ? name : code)).ToUpperInvariant();
            if (string.IsNullOrEmpty(c)) throw new InvalidOperationException("Mã kỹ năng không hợp lệ.");
            if (await _db.Skills.AnyAsync(s => s.Code == c)) throw new InvalidOperationException("Mã kỹ năng đã tồn tại: " + c);
            var skill = new Skill { Name = name.Trim(), Code = c, CourseId = courseId, CategoryId = categoryId };
            _db.Skills.Add(skill);
            await _db.SaveChangesAsync();
            return skill;
        }

        public async Task<IList<SkillProgress>> GetProgressAsync(string userId)
        {
            return await _db.SkillProgresses.Include(p => p.Skill)
                .Where(p => p.UserId == userId).OrderBy(p => p.Skill.Name).ToListAsync();
        }
    }
}
