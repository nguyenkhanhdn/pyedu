using System;
using System.Text.RegularExpressions;
using TechKidPro.Core.Interfaces;

namespace TechKidPro.Infrastructure.Providers
{
    /// <summary>Chuyển URL YouTube thành URL embed; nguồn khác trả null (UI hiển thị liên kết thường).</summary>
    public class YouTubeVideoProvider : IVideoProvider
    {
        private static readonly Regex Id = new Regex("^[A-Za-z0-9_-]{11}$", RegexOptions.Compiled);

        public string GetEmbedUrl(string source)
        {
            Uri u;
            if (!Uri.TryCreate(source, UriKind.Absolute, out u)) return null;
            var host = u.Host.ToLowerInvariant();
            string id = null;
            if (host == "youtu.be") id = u.AbsolutePath.Trim('/');
            else if (host == "www.youtube.com" || host == "youtube.com" || host == "m.youtube.com")
            {
                if (u.AbsolutePath == "/watch")
                {
                    var q = System.Web.HttpUtility.ParseQueryString(u.Query);
                    id = q["v"];
                }
                else if (u.AbsolutePath.StartsWith("/embed/")) id = u.AbsolutePath.Substring(7).Trim('/');
            }
            return id != null && Id.IsMatch(id) ? "https://www.youtube.com/embed/" + id : null;
        }
    }
}
