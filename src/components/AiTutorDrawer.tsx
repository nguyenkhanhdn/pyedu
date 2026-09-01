import React, { useState, useRef, useEffect } from "react";
import { useApp } from "../context/AppContext";
import {
  Bot,
  X,
  Send,
  Sparkles,
  HelpCircle,
  Code,
  Lightbulb,
  CheckCircle2,
  Minimize2,
  Maximize2,
  Trash2
} from "lucide-react";

interface AiTutorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  attachedContext?: {
    lessonTitle: string;
    currentCode: string;
    lastError?: string;
    testInput?: string;
    expectedOutput?: string;
    actualOutput?: string;
  };
}

export const AiTutorDrawer: React.FC<AiTutorDrawerProps> = ({
  isOpen,
  onClose,
  attachedContext
}) => {
  const { aiChatMessages, sendAiMessage, isAiThinking, selectedLesson, userCodes } = useApp();

  const [inputMessage, setInputMessage] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [aiChatMessages, isAiThinking]);

  if (!isOpen) return null;

  const handleSend = async (customText?: string) => {
    const textToSend = customText || inputMessage;
    if (!textToSend.trim() || isAiThinking) return;

    setInputMessage("");
    await sendAiMessage(textToSend, {
      lessonTitle: selectedLesson.title,
      currentCode: userCodes[selectedLesson.id] || selectedLesson.practice.starterCode,
      ...attachedContext
    });
  };

  const quickPrompts = [
    "🔍 Vì sao code của em bị sai test case?",
    "💡 Cho em gợi ý cách tư duy bài này (không đưa đáp án)",
    "📖 Giải thích lại cú pháp vòng lặp & điều kiện",
    "⚡ Làm thế nào để tối ưu code ngắn gọn hơn?"
  ];

  return (
    <div
      className={`fixed z-50 transition-all duration-300 bg-slate-900 border border-slate-700 shadow-2xl flex flex-col ${
        isExpanded
          ? "inset-4 sm:inset-10 rounded-2xl"
          : "bottom-0 right-0 sm:right-6 w-full sm:w-[450px] h-[550px] max-h-[85vh] rounded-t-2xl sm:rounded-2xl"
      }`}
    >
      {/* Header */}
      <div className="p-3.5 bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
            <Bot className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-xs sm:text-sm text-white">PyEdu AI Tutor 24/7</span>
              <span className="px-1.5 py-0.2 text-[9px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded font-semibold">
                Online
              </span>
            </div>
            <p className="text-[10px] text-slate-400 truncate max-w-[220px]">
              Đang gắn ngữ cảnh: {selectedLesson.title}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors hidden sm:block"
            title={isExpanded ? "Thu nhỏ" : "Mở rộng"}
          >
            {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Đóng trợ lý AI"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Messages List */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs">
        {aiChatMessages.map((msg) => {
          const isUser = msg.role === "user";
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${isUser ? "flex-row-reverse" : "flex-row"}`}
            >
              <div
                className={`h-7 w-7 rounded-xl flex items-center justify-center text-xs flex-shrink-0 ${
                  isUser
                    ? "bg-indigo-600 text-white"
                    : "bg-gradient-to-tr from-violet-600 to-indigo-600 text-white shadow-md shadow-indigo-600/30"
                }`}
              >
                {isUser ? "Em" : <Bot className="h-3.5 w-3.5" />}
              </div>

              <div
                className={`max-w-[82%] p-3.5 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                  isUser
                    ? "bg-indigo-600 text-white rounded-tr-none font-medium"
                    : "bg-slate-800 border border-slate-700/80 text-slate-200 rounded-tl-none shadow-sm font-sans"
                }`}
              >
                {msg.text}
                <div
                  className={`text-[9px] mt-1.5 ${
                    isUser ? "text-indigo-200 text-right" : "text-slate-500"
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>
            </div>
          );
        })}

        {isAiThinking && (
          <div className="flex items-center gap-2 text-indigo-400 font-medium text-xs p-2">
            <Bot className="h-4 w-4 animate-spin" />
            <span>Thầy AI đang phân tích bài toán và suy nghĩ gợi ý...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompt Chips */}
      <div className="px-3 py-2 bg-slate-850 border-t border-slate-800 overflow-x-auto flex items-center gap-1.5 scrollbar-none">
        {quickPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            disabled={isAiThinking}
            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-full text-[10px] text-slate-300 hover:text-white whitespace-nowrap transition-colors flex-shrink-0 disabled:opacity-50"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <div className="p-3 bg-slate-900 border-t border-slate-800">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Hỏi AI Tutor về lỗi code hoặc kiến thức..."
            disabled={isAiThinking}
            className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
          <button
            type="submit"
            disabled={!inputMessage.trim() || isAiThinking}
            className="p-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-xl shadow-md shadow-indigo-600/30 disabled:opacity-40 transition-all"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
