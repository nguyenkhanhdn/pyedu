using Newtonsoft.Json;

namespace TechKidPro.Services.Courses
{
    /// <summary>Dữ liệu của một block; trường dùng tùy theo BlockType (Text→Text, Code→Text+Language, Video/Image/File/Embed→Url+Title).</summary>
    public class LessonBlockData
    {
        [JsonProperty("text")] public string Text { get; set; }
        [JsonProperty("url")] public string Url { get; set; }
        [JsonProperty("title")] public string Title { get; set; }
        [JsonProperty("language")] public string Language { get; set; }
        /// <summary>Dùng cho block Quiz: Id của Assessment.</summary>
        [JsonProperty("assessmentId")] public int? AssessmentId { get; set; }

        public string ToJson() { return JsonConvert.SerializeObject(this); }

        public static LessonBlockData Parse(string json)
        {
            if (string.IsNullOrWhiteSpace(json)) return new LessonBlockData();
            try { return JsonConvert.DeserializeObject<LessonBlockData>(json) ?? new LessonBlockData(); }
            catch (JsonException) { return new LessonBlockData(); }
        }
    }
}
