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
  AlertTriangle,
  FileCode,
  Layers
} from "lucide-react";

export const OfflineHandbookView: React.FC = () => {
  const { handbookTopics } = useApp();
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
    <div className="flex-1 flex flex-col md:flex-row h-[calc(100vh-4rem)] overflow-hidden bg-slate-950 text-slate-100">
      {/* Left Sidebar: Handbook Index */}
      <aside className="w-full md:w-80 bg-slate-900 border-r border-slate-800 flex flex-col h-auto md:h-full max-h-[35vh] md:max-h-full overflow-y-auto">
        <div className="p-4 border-b border-slate-800 bg-slate-900/90 sticky top-0 z-10 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-purple-400" />
              <h2 className="font-bold text-sm text-slate-200">Sổ Tay Ngoại Tuyến</h2>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
              <WifiOff className="h-3 w-3" /> Offline Ready
            </span>
          </div>

          <div className="relative">
            <Search className="h-3.5 w-3.5 absolute left-3 top-2.5 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tra cứu cú pháp, hàm..."
              className="w-full pl-8 pr-3 py-1.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>

        <div className="p-2 space-y-1.5 flex-1">
          {filteredTopics.map((topic) => {
            const isSelected = topic.id === selectedTopic.id;
            return (
              <button
                key={topic.id}
                onClick={() => setSelectedTopicId(topic.id)}
                className={`w-full p-3 rounded-xl text-left transition-all flex items-center justify-between ${
                  isSelected
                    ? "bg-purple-600/20 border border-purple-500/40 text-white"
                    : "bg-slate-850 hover:bg-slate-800 border border-slate-800/80 text-slate-300"
                }`}
              >
                <div className="min-w-0 pr-2">
                  <span className="text-[10px] uppercase font-bold text-purple-400">
                    {topic.category}
                  </span>
                  <p className="text-xs font-semibold text-slate-200 truncate mt-0.5">
                    {topic.title}
                  </p>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-500 flex-shrink-0" />
              </button>
            );
          })}
        </div>
      </aside>

      {/* Main Handbook Content Reader */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-4xl space-y-6">
        {/* Offline status banner */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-950/30 via-slate-900 to-slate-900 border border-emerald-500/20 flex items-center justify-between text-xs text-emerald-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
            <span>
              Chế độ đọc ngoại tuyến: Tài liệu này được nhúng sẵn 100% trong trình duyệt. Bạn có thể học và tra cứu mà không cần mạng internet.
            </span>
          </div>
        </div>

        {/* Topic Header */}
        <div className="space-y-1 border-b border-slate-800 pb-4">
          <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">
            {selectedTopic.category}
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {selectedTopic.title}
          </h1>
        </div>

        {/* Topic Description Content */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
          {selectedTopic.content}
        </div>

        {/* Code Snippet Cheat Sheet */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-purple-500/20 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-purple-400 font-bold text-xs sm:text-sm">
              <Code2 className="h-4 w-4" />
              <span>Mẫu Code Chuẩn & Cú Pháp Cheat Sheet</span>
            </div>
            <button
              onClick={() => handleCopyCode(selectedTopic.codeSnippet, 999)}
              className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors border border-slate-700"
            >
              {copiedIndex === 999 ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Đã sao chép</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Sao chép mã</span>
                </>
              )}
            </button>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed">
            <pre>{selectedTopic.codeSnippet}</pre>
          </div>
        </div>

        {/* Important Tips & Traps to Avoid */}
        {selectedTopic.tips && (
          <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-950/20 to-slate-900 border border-amber-500/30 space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs sm:text-sm">
              <Lightbulb className="h-4 w-4" />
              <span>Mẹo Nhớ Nhanh & Lời Khuyên Tránh Bẫy Trong Bài Thi</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              {selectedTopic.tips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
                  <span className="leading-relaxed">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
};
