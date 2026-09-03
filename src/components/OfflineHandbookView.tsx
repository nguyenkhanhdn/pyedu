import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import {
  BookOpen,
  Search,
  WifiOff,
  CheckCircle2,
  Copy,
  Check,
  ChevronRight,
  Code2,
  Lightbulb,
  ExternalLink,
  Sparkles,
  Layers
} from "lucide-react";

export const OfflineHandbookView: React.FC = () => {
  const { handbookTopics } = useApp();
  const [viewMode, setViewMode] = useState<"sotay" | "cheatsheet">("sotay");
  const [selectedTopicId, setSelectedTopicId] = useState<string>(handbookTopics[0]?.id || "hb-1");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const selectedTopic = handbookTopics.find((t) => t.id === selectedTopicId) || handbookTopics[0];

  const handleCopyCode = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const filteredTopics = handbookTopics.filter(
    (t) =>
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-4rem)] overflow-hidden bg-slate-50 text-slate-800">
      {/* Top Header Mode Bar */}
      <div className="px-4 sm:px-6 py-2.5 bg-white border-b border-slate-200 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-700">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900 leading-tight">
              Sổ Tay Tra Cứu Lập Trình Python
            </h2>
            <p className="text-[11px] text-slate-500 hidden sm:block">
              Tài liệu mở tự do — Tham khảo không giới hạn tiến trình bài học
            </p>
          </div>
        </div>

        {/* View mode toggle & Open in new tab button */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setViewMode("sotay")}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === "sotay"
                  ? "bg-white text-indigo-700 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
              <span>Sổ Tay Toàn Diện (Sotay.html)</span>
            </button>
            <button
              onClick={() => setViewMode("cheatsheet")}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === "cheatsheet"
                  ? "bg-white text-indigo-700 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Code2 className="h-3.5 w-3.5 text-purple-600" />
              <span>Tra Cứu Cú Pháp Nhanh</span>
            </button>
          </div>

          <a
            href="/Sotay.html"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
            title="Mở tài liệu Sotay.html sang một tab trình duyệt mới"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            <span className="hidden md:inline">Mở ở tab mới (Sotay.html)</span>
          </a>
        </div>
      </div>

      {/* Main Content Body */}
      {viewMode === "sotay" ? (
        /* Embedded Sotay.html iframe viewer */
        <div className="flex-1 flex flex-col h-full bg-white relative">
          <iframe
            src="/Sotay.html"
            title="Sổ tay Lập trình Python"
            className="w-full flex-1 border-0 bg-white"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
          />
        </div>
      ) : (
        /* Categorized Cheatsheet with fast search & code copy */
        <div className="flex-1 flex flex-col md:flex-row h-full overflow-hidden">
          {/* Left Sidebar: Handbook Index */}
          <aside className="w-full md:w-80 bg-white border-r border-slate-200 flex flex-col h-auto md:h-full max-h-[35vh] md:max-h-full overflow-y-auto">
            <div className="p-4 border-b border-slate-200 bg-white/90 sticky top-0 z-10 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-purple-600" />
                  <h2 className="font-bold text-sm text-slate-900">Danh Mục Cú Pháp</h2>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                  <WifiOff className="h-3 w-3" /> Sẵn sàng
                </span>
              </div>

              <div className="relative">
                <Search className="h-3.5 w-3.5 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tra cứu cú pháp, hàm..."
                  className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-purple-600 shadow-xs"
                />
              </div>
            </div>

            <div className="p-3 space-y-1.5 flex-1">
              {filteredTopics.map((topic) => {
                const isSelected = topic.id === selectedTopic.id;
                return (
                  <button
                    key={topic.id}
                    onClick={() => setSelectedTopicId(topic.id)}
                    className={`w-full p-3 rounded-2xl text-left transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? "bg-purple-50 border border-purple-200 text-purple-950 shadow-xs"
                        : "bg-white hover:bg-slate-50 border border-slate-200/70 text-slate-700"
                    }`}
                  >
                    <div className="min-w-0 pr-2">
                      <span className="text-[10px] uppercase font-bold text-purple-600">
                        {topic.category}
                      </span>
                      <p className="text-xs font-semibold text-slate-900 truncate mt-0.5">
                        {topic.title}
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-400 flex-shrink-0" />
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Main Handbook Content Reader */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-4xl space-y-6">
            {/* Topic Header */}
            <div className="space-y-1 border-b border-slate-200 pb-4">
              <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">
                {selectedTopic.category}
              </span>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                {selectedTopic.title}
              </h1>
            </div>

            {/* Topic Description Content */}
            <div className="p-5 rounded-3xl bg-white border border-slate-200 text-slate-700 text-xs sm:text-sm leading-relaxed whitespace-pre-line shadow-xs">
              {selectedTopic.content}
            </div>

            {/* Code Snippet Cheat Sheet */}
            <div className="p-5 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-purple-700 font-bold text-xs sm:text-sm">
                  <Code2 className="h-4 w-4 text-purple-600" />
                  <span>Mẫu Code Chuẩn & Cú Pháp Cheat Sheet</span>
                </div>
                <button
                  onClick={() => handleCopyCode(selectedTopic.codeSnippet, 999)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedIndex === 999 ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                      <span className="text-emerald-600 font-bold">Đã sao chép</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5 text-slate-500" />
                      <span>Sao chép mã</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed">
                <pre>{selectedTopic.codeSnippet}</pre>
              </div>
            </div>

            {/* Important Tips & Traps to Avoid */}
            {selectedTopic.tips && (
              <div className="p-5 rounded-3xl bg-amber-50/70 border border-amber-200 space-y-3 shadow-xs">
                <div className="flex items-center gap-2 text-amber-800 font-bold text-xs sm:text-sm">
                  <Lightbulb className="h-4 w-4 text-amber-600" />
                  <span>Mẹo Nhớ Nhanh & Lời Khuyên Tránh Bẫy Trong Bài Thi</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  {selectedTopic.tips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                      <span className="leading-relaxed">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </main>
        </div>
      )}
    </div>
  );
};
