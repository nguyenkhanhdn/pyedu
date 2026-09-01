import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import {
  Users,
  MessageSquare,
  Heart,
  Send,
  Code2,
  Plus,
  Pin,
  CheckCircle2,
  Shield,
  GraduationCap,
  Sparkles
} from "lucide-react";

export const StudyGroupsView: React.FC = () => {
  const {
    studyGroups,
    joinGroup,
    leaveGroup,
    sendMessageToGroup,
    likeGroupMessage,
    currentUser
  } = useApp();

  const [selectedGroupId, setSelectedGroupId] = useState<string>(studyGroups[0]?.id || "group-1");
  const [messageText, setMessageText] = useState("");
  const [codeSnippet, setCodeSnippet] = useState("");
  const [showCodeInput, setShowCodeInput] = useState(false);

  const currentGroup = studyGroups.find(g => g.id === selectedGroupId) || studyGroups[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() && !codeSnippet.trim()) return;

    sendMessageToGroup(
      currentGroup.id,
      messageText.trim(),
      codeSnippet.trim() ? codeSnippet.trim() : undefined
    );
    setMessageText("");
    setCodeSnippet("");
    setShowCodeInput(false);
  };

  return (
    <div className="flex-1 flex flex-col md:flex-row h-[calc(100vh-4rem)] overflow-hidden bg-slate-950 text-slate-100">
      {/* Left Sidebar: Groups List */}
      <aside className="w-full md:w-80 bg-slate-900 border-r border-slate-800 flex flex-col h-auto md:h-full max-h-[35vh] md:max-h-full overflow-y-auto">
        <div className="p-4 border-b border-slate-800 bg-slate-900/90 sticky top-0 z-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-indigo-400" />
            <h2 className="font-bold text-sm text-slate-200">Nhóm Học Tập ({studyGroups.length})</h2>
          </div>
        </div>

        <div className="p-2 space-y-2 flex-1">
          {studyGroups.map((group) => {
            const isSelected = group.id === currentGroup?.id;
            return (
              <button
                key={group.id}
                onClick={() => setSelectedGroupId(group.id)}
                className={`w-full p-3 rounded-2xl text-left transition-all border ${
                  isSelected
                    ? "bg-indigo-600/20 border-indigo-500/50 shadow-md"
                    : "bg-slate-850 hover:bg-slate-800 border-slate-800"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-xs sm:text-sm text-white truncate">{group.name}</h3>
                  {group.isJoined && (
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex-shrink-0">
                      Đã tham gia
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{group.description}</p>
                <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" /> {group.memberCount} thành viên
                  </span>
                  <span>{group.messages.length} thảo luận</span>
                </div>
              </button>
            );
          })}
        </div>
      </aside>

      {/* Main Discussion Thread */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-slate-950">
        {/* Group Header */}
        <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white">{currentGroup.name}</h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                {currentGroup.memberCount} thành viên
              </span>
            </div>
            <p className="text-xs text-slate-400">{currentGroup.description}</p>
          </div>

          <div>
            {currentGroup.isJoined ? (
              <button
                onClick={() => leaveGroup(currentGroup.id)}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl border border-slate-700 transition-colors"
              >
                Rời nhóm
              </button>
            ) : (
              <button
                onClick={() => joinGroup(currentGroup.id)}
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-md shadow-indigo-600/30 transition-all"
              >
                + Tham gia nhóm
              </button>
            )}
          </div>
        </div>

        {/* Pinned Teacher Announcement if any */}
        {currentGroup.pinnedNotice && (
          <div className="mx-4 mt-4 p-3.5 bg-gradient-to-r from-amber-950/30 via-slate-900 to-slate-900 border border-amber-500/30 rounded-2xl flex items-start gap-3">
            <Pin className="h-4 w-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold text-amber-300 mr-2">Ghim thông báo:</span>
              <span className="text-slate-300">{currentGroup.pinnedNotice}</span>
            </div>
          </div>
        )}

        {/* Messages Feed */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
          {currentGroup.messages.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              Chưa có tin nhắn nào trong nhóm. Hãy là người đầu tiên đặt câu hỏi trao đổi nhé!
            </div>
          ) : (
            currentGroup.messages.map((msg) => {
              const isTeacher = msg.userRole === "teacher";
              return (
                <div
                  key={msg.id}
                  className="p-4 rounded-2xl bg-slate-900 border border-slate-800/90 space-y-2.5 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={msg.userAvatar}
                        alt={msg.userName}
                        className="h-7 w-7 rounded-full bg-slate-800"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-slate-200">{msg.userName}</span>
                          {isTeacher && (
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-0.5">
                              <Shield className="h-2.5 w-2.5" /> Giáo viên
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-500">{msg.timestamp}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => likeGroupMessage(currentGroup.id, msg.id)}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${
                        msg.isLiked
                          ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                          : "bg-slate-800 text-slate-400 hover:text-white"
                      }`}
                    >
                      <Heart
                        className={`h-3.5 w-3.5 ${
                          msg.isLiked ? "fill-rose-500 text-rose-500" : ""
                        }`}
                      />
                      <span>{msg.likes}</span>
                    </button>
                  </div>

                  <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">{msg.content}</p>

                  {/* Code Snippet if shared */}
                  {msg.codeSnippet && (
                    <div className="rounded-xl bg-slate-950 border border-slate-800 p-3 font-mono text-xs text-emerald-300 overflow-x-auto">
                      <div className="flex items-center justify-between text-[10px] text-slate-500 border-b border-slate-800 pb-1 mb-2">
                        <span className="flex items-center gap-1">
                          <Code2 className="h-3 w-3" /> Python Snippet
                        </span>
                      </div>
                      <pre>{msg.codeSnippet}</pre>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Message Input Box */}
        <div className="p-4 bg-slate-900 border-t border-slate-800">
          <form onSubmit={handleSendMessage} className="space-y-2">
            {showCodeInput && (
              <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl space-y-1 animate-in fade-in">
                <label className="block text-[10px] font-mono text-indigo-400 font-semibold">
                  Mã nguồn Python đính kèm:
                </label>
                <textarea
                  rows={3}
                  value={codeSnippet}
                  onChange={(e) => setCodeSnippet(e.target.value)}
                  placeholder="def solution(): ... (dán code cần hỏi vào đây)"
                  className="w-full bg-transparent font-mono text-xs text-emerald-300 focus:outline-none resize-none"
                />
              </div>
            )}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowCodeInput(!showCodeInput)}
                className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1 transition-colors ${
                  showCodeInput
                    ? "bg-indigo-600 text-white border-indigo-500"
                    : "bg-slate-800 text-slate-400 border-slate-700 hover:text-white"
                }`}
                title="Đính kèm đoạn mã Python"
              >
                <Code2 className="h-4 w-4" />
                <span className="hidden sm:inline">Gửi kèm Code</span>
              </button>

              <input
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Gửi câu hỏi hoặc ý kiến thảo luận cùng các bạn trong nhóm..."
                className="flex-1 px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
              />

              <button
                type="submit"
                disabled={!messageText.trim() && !codeSnippet.trim()}
                className="px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/30 disabled:opacity-40 transition-all flex items-center gap-1.5"
              >
                <Send className="h-4 w-4" />
                <span className="hidden sm:inline">Gửi</span>
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};
