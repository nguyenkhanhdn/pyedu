using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using TechKidPro.Core.Entities.Access;
using TechKidPro.Core.Enums;
using TechKidPro.Infrastructure.Providers;
using TechKidPro.Services.Common;
using TechKidPro.Services.Courses;

namespace TechKidPro.Tests
{
    [TestClass]
    public class Phase2Tests
    {
        [TestMethod]
        public void Slug_RemovesVietnameseDiacritics()
        {
            Assert.AreEqual("on-thi-tot-nghiep-thpt-mon-tin-hoc", SlugHelper.ToSlug("Ôn thi tốt nghiệp THPT môn Tin học"));
            Assert.AreEqual("duong-di", SlugHelper.ToSlug("Đường đi!"));
            Assert.AreEqual("", SlugHelper.ToSlug("  "));
        }

        [TestMethod]
        public void Percent_HandlesEdges()
        {
            Assert.AreEqual(0, ProgressCalculator.Percent(0, 0));
            Assert.AreEqual(50, ProgressCalculator.Percent(1, 2));
            Assert.AreEqual(100, ProgressCalculator.Percent(5, 3));
            Assert.AreEqual(33, ProgressCalculator.Percent(1, 3));
        }

        [TestMethod]
        public void UrlSafety_RejectsScripts()
        {
            Assert.IsTrue(UrlSafety.IsHttp("https://a.com/x.png"));
            Assert.IsFalse(UrlSafety.IsHttp("javascript:alert(1)"));
            Assert.IsFalse(UrlSafety.IsHttp("/relative"));
        }

        [TestMethod]
        public void Enrollment_ActiveRules()
        {
            var now = DateTime.UtcNow;
            Assert.IsTrue(new Enrollment { Status = EnrollmentStatus.Active }.IsActive(now));
            Assert.IsFalse(new Enrollment { Status = EnrollmentStatus.Active, ExpiresDate = now.AddDays(-1) }.IsActive(now));
            Assert.IsFalse(new Enrollment { Status = EnrollmentStatus.Cancelled }.IsActive(now));
        }

        [TestMethod]
        public void YouTube_EmbedUrls()
        {
            var p = new YouTubeVideoProvider();
            Assert.AreEqual("https://www.youtube.com/embed/dQw4w9WgXcQ", p.GetEmbedUrl("https://www.youtube.com/watch?v=dQw4w9WgXcQ"));
            Assert.AreEqual("https://www.youtube.com/embed/dQw4w9WgXcQ", p.GetEmbedUrl("https://youtu.be/dQw4w9WgXcQ"));
            Assert.IsNull(p.GetEmbedUrl("https://evil.com/watch?v=dQw4w9WgXcQ"));
            Assert.IsNull(p.GetEmbedUrl("https://www.youtube.com/watch?v=\"><script>"));
        }

        [TestMethod]
        public void BlockData_RoundTripsAndToleratesBadJson()
        {
            var d = new LessonBlockData { Text = "xin chào", Url = "https://a.com" };
            Assert.AreEqual("xin chào", LessonBlockData.Parse(d.ToJson()).Text);
            Assert.IsNull(LessonBlockData.Parse("{not json").Text);
            Assert.IsNull(LessonBlockData.Parse(null).Url);
        }
    }
}
