import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { PersonalNote } from "../types";
import {
  FileText,
  Plus,
  Trash2,
  Edit3,
  Search,
  Tag,
  Code2,
  Download,
  Save,
  X,
  Sparkles,
  BookOpen
} from "lucide-react";

export const NotesView: React.FC = () => {
  const { personalNotes, addNote, updateNote, deleteNote, selectedLesson } = useApp();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  // Form states
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [codeSnippet, setCodeSnippet] = useState("");
  const [tagsInput, setTagsInput] = useState("");

  // Collect all unique tags
  const allTags = Array.from(new Set(personalNotes.flatMap((n) => n.tags)));

  const filteredNotes = personalNotes.filter((note) => {
    const matchTag = selectedTag === "all" || note.tags.includes(selectedTag);
    const matchQuery =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchTag && matchQuery;
  });

  const handleStartCreate = () => {
    setIsCreatingNew(true);
    setEditingNoteId(null);
    setTitle(`Ghi chú bài học: ${selectedLesson.title}`);
    setContent("");
    setCodeSnippet("");
    setTagsInput("Cú pháp, Mẹo hay");
  };

  const handleStartEdit = (note: PersonalNote) => {
    setEditingNoteId(note.id);
    setIsCreatingNew(false);
    setTitle(note.title);
    setContent(note.content);
    setCodeSnippet(note.codeSnippet || "");
    setTagsInput(note.tags.join(", "));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const tagsArray = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    if (isCreatingNew) {
      addNote({
        title: title.trim(),
        content: content.trim(),
        codeSnippet: codeSnippet.trim() ? codeSnippet.trim() : undefined,
        tags: tagsArray.length > 0 ? tagsArray : ["Tổng quát"],
        lessonId: selectedLesson.id,
        lessonTitle: selectedLesson.title
      });
      setIsCreatingNew(false);
    } else if (editingNoteId) {
      updateNote(editingNoteId, {
        title: title.trim(),
        content: content.trim(),
        codeSnippet: codeSnippet.trim() ? codeSnippet.trim() : undefined,
        tags: tagsArray.length > 0 ? tagsArray : ["Tổng quát"]
      });
      setEditingNoteId(null);
    }
  };

  const handleExportNotes = () => {
    const markdownContent = personalNotes
      .map(
        (n) =>
          `# ${n.title}\n*Bài học: ${n.lessonTitle || 'Chung'} | Ngày tạo: ${new Date(
            n.createdAt
          ).toLocaleDateString()}*\nThẻ: ${n.tags.join(", ")}\n\n${n.content}\n\n${
            n.codeSnippet ? "```python\n" + n.codeSnippet + "\n```\n" : ""
          }\n---\n`
      )
      .join("\n");

    const blob = new Blob([markdownContent], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `PyEdu_GhiChu_Python_${new Date().toISOString().split("T")[0]}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-950 text-slate-100 max-w-6xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
              <FileText className="h-3.5 w-3.5" /> Sổ Tay Cá Nhân
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
            Ghi Chú & Đoạn Mã Tâm Đắc
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Lưu lại cú pháp, công thức thuật toán và các lưu ý tránh bẫy khi làm bài thi
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportNotes}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl border border-slate-700 transition-colors flex items-center gap-1.5"
            title="Tải về toàn bộ ghi chú dạng file Markdown"
          >
            <Download className="h-4 w-4" />
            <span>Xuất file .MD</span>
          </button>

          <button
            onClick={handleStartCreate}
            className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-600/30 flex items-center gap-1.5 transition-all"
          >
            <Plus className="h-4 w-4" />
            <span>+ Tạo Ghi Chú Mới</span>
          </button>
        </div>
      </div>

      {/* Note Editor Modal / Drawer */}
      {(isCreatingNew || editingNoteId) && (
        <form
          onSubmit={handleSave}
          className="p-5 rounded-2xl bg-slate-900 border-2 border-indigo-500/40 shadow-2xl space-y-4 animate-in fade-in"
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <Edit3 className="h-4 w-4 text-indigo-400" />
              <span>{isCreatingNew ? "Tạo Ghi Chú Cá Nhân Mới" : "Chỉnh Sửa Ghi Chú"}</span>
            </h3>
            <button
              type="button"
              onClick={() => {
                setIsCreatingNew(false);
                setEditingNoteId(null);
              }}
              className="p-1 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Tiêu đề ghi chú *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ví dụ: Lưu ý khi dùng hàm split() với nhiều khoảng trắng..."
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Nội dung giải thích / Lưu ý
              </label>
              <textarea
                rows={3}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Ghi chú kiến thức, mẹo tư duy hoặc các trường hợp biên cần chú ý..."
                className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-indigo-500 resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Đoạn mã Python minh họa (Code snippet)
              </label>
              <textarea
                rows={4}
                value={codeSnippet}
                onChange={(e) => setCodeSnippet(e.target.value)}
                placeholder="# Dán code Python tại đây&#10;def example():&#10;    pass"
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl font-mono text-xs text-emerald-300 focus:outline-none focus:border-indigo-500 resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Thẻ phân loại (cách nhau bởi dấu phẩy)
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="Cú pháp, Mẹo hay, Vòng lặp, Danh sách..."
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => {
                setIsCreatingNew(false);
                setEditingNoteId(null);
              }}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-600/30 flex items-center gap-1.5"
            >
              <Save className="h-4 w-4" />
              <span>Lưu Ghi Chú</span>
            </button>
          </div>
        </form>
      )}

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
          <button
            onClick={() => setSelectedTag("all")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedTag === "all"
                ? "bg-indigo-600 text-white"
                : "bg-slate-900 text-slate-400 border border-slate-800"
            }`}
          >
            Tất cả thẻ
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1 ${
                selectedTag === tag
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-900 text-slate-400 border border-slate-800"
              }`}
            >
              <Tag className="h-3 w-3" />
              <span>{tag}</span>
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="h-4 w-4 absolute left-3 top-2.5 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm nội dung ghi chú..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredNotes.length === 0 ? (
          <div className="col-span-full p-12 text-center bg-slate-900 rounded-3xl border border-slate-800 space-y-3">
            <FileText className="h-10 w-10 text-slate-600 mx-auto" />
            <h3 className="font-bold text-sm text-slate-300">Chưa có ghi chú nào phù hợp</h3>
            <p className="text-xs text-slate-500">
              Hãy nhấn nút "+ Tạo Ghi Chú Mới" để lưu lại kiến thức bổ ích nhé!
            </p>
          </div>
        ) : (
          filteredNotes.map((note) => (
            <div
              key={note.id}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800/90 hover:border-slate-700 transition-all flex flex-col justify-between space-y-3 shadow-md"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-sm text-white leading-snug">{note.title}</h3>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      onClick={() => handleStartEdit(note)}
                      className="p-1 text-slate-400 hover:text-indigo-400 transition-colors"
                      title="Chỉnh sửa ghi chú"
                    >
                      <Edit3 className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => deleteNote(note.id)}
                      className="p-1 text-slate-400 hover:text-rose-400 transition-colors"
                      title="Xóa ghi chú"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {note.lessonTitle && (
                  <p className="text-[10px] text-indigo-400 font-medium">
                    📌 {note.lessonTitle}
                  </p>
                )}

                <p className="text-xs text-slate-300 whitespace-pre-line leading-relaxed">
                  {note.content}
                </p>

                {note.codeSnippet && (
                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl font-mono text-xs text-emerald-300 overflow-x-auto">
                    <pre>{note.codeSnippet}</pre>
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {note.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-full text-[9px] font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <span className="text-[10px] text-slate-500">
                  {new Date(note.createdAt).toLocaleDateString("vi-VN")}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
