using System;
using System.Globalization;
using System.Text;
using System.Text.RegularExpressions;

namespace TechKidPro.Services.Common
{
    public static class SlugHelper
    {
        /// <summary>"Ôn thi Tin học" → "on-thi-tin-hoc" (bỏ dấu tiếng Việt).</summary>
        public static string ToSlug(string text)
        {
            if (string.IsNullOrWhiteSpace(text)) return string.Empty;
            var normalized = text.Replace('đ', 'd').Replace('Đ', 'D').Normalize(NormalizationForm.FormD);
            var sb = new StringBuilder();
            foreach (var c in normalized)
                if (CharUnicodeInfo.GetUnicodeCategory(c) != UnicodeCategory.NonSpacingMark) sb.Append(c);
            var s = Regex.Replace(sb.ToString().ToLowerInvariant(), "[^a-z0-9]+", "-").Trim('-');
            return s;
        }
    }

    public static class ProgressCalculator
    {
        public static int Percent(int completed, int total)
        {
            if (total <= 0) return 0;
            if (completed < 0) completed = 0;
            if (completed > total) completed = total;
            return (int)Math.Round(completed * 100.0 / total);
        }
    }

    public static class UrlSafety
    {
        public static bool IsHttp(string url)
        {
            Uri u;
            return Uri.TryCreate(url, UriKind.Absolute, out u) && (u.Scheme == Uri.UriSchemeHttp || u.Scheme == Uri.UriSchemeHttps);
        }
    }
}
