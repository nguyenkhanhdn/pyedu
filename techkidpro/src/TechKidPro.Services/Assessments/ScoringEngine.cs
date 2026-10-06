using System;
using System.Collections.Generic;
using System.Linq;
using TechKidPro.Core.Enums;

namespace TechKidPro.Services.Assessments
{
    public class OptionInput
    {
        public string Text { get; set; }
        public bool IsCorrect { get; set; }
    }

    /// <summary>Logic thuần (không DB) để chấm điểm và kiểm tra câu hỏi; dễ kiểm thử.</summary>
    public static class ScoringEngine
    {
        public const int WeakSkillPercent = 60;

        /// <summary>All-or-nothing: đúng khi tập lựa chọn bằng đúng tập đáp án đúng.</summary>
        public static bool IsCorrect(ISet<int> correctOptionIds, ISet<int> selectedOptionIds)
        {
            if (correctOptionIds == null || correctOptionIds.Count == 0) return false;
            return selectedOptionIds != null && correctOptionIds.SetEquals(selectedOptionIds);
        }

        public static int Percent(int score, int maxScore)
        {
            if (maxScore <= 0) return 0;
            return (int)Math.Round(score * 100.0 / maxScore);
        }

        public static ISet<int> ParseIds(string csv)
        {
            var set = new HashSet<int>();
            if (string.IsNullOrWhiteSpace(csv)) return set;
            foreach (var part in csv.Split(','))
            {
                int id;
                if (int.TryParse(part, out id)) set.Add(id);
            }
            return set;
        }

        /// <summary>Trả về thông báo lỗi, hoặc null nếu câu hỏi hợp lệ.</summary>
        public static string ValidateQuestion(QuestionType type, string text, IList<OptionInput> options)
        {
            if (string.IsNullOrWhiteSpace(text)) return "Nội dung câu hỏi không được để trống.";
            if (options == null || options.Count < 2) return "Cần ít nhất 2 lựa chọn.";
            if (options.Any(o => string.IsNullOrWhiteSpace(o.Text))) return "Mọi lựa chọn đều phải có nội dung.";
            var correct = options.Count(o => o.IsCorrect);
            switch (type)
            {
                case QuestionType.TrueFalse:
                    if (options.Count != 2) return "Câu Đúng/Sai phải có đúng 2 lựa chọn.";
                    if (correct != 1) return "Câu Đúng/Sai phải có đúng 1 đáp án đúng.";
                    break;
                case QuestionType.SingleChoice:
                    if (correct != 1) return "Câu một đáp án phải có đúng 1 đáp án đúng.";
                    break;
                case QuestionType.MultipleChoice:
                    if (correct < 1) return "Cần chọn ít nhất 1 đáp án đúng.";
                    break;
            }
            return null;
        }
    }
}
