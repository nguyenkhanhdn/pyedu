import React, { useState } from "react";
import { Target, Trophy, CheckCircle2, Award, Clock, Tag } from "lucide-react";
import { ALGORITHM_PROBLEMS } from "../../data/curriculum";

export const AdminAlgorithmsView: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<"all" | "primary" | "secondary">("all");

  const filteredProblems = ALGORITHM_PROBLEMS.filter((p) => {
    if (selectedLevel === "primary") return p.level === "primary";
    if (selectedLevel === "secondary") return p.level === "secondary";
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Target className="h-5 w-5 text-rose-500" />
            <span>Ngân Hàng Đề Thi Thuật Toán (Competitive Programming)</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Tổng cộng <b>{ALGORITHM_PROBLEMS.length}</b> Đề thi thuật toán phân cấp Tiểu học & THCS với bộ Test Cases tự động.
          </p>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
          <button
            onClick={() => setSelectedLevel("all")}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              selectedLevel === "all" ? "bg-white text-indigo-600 shadow-xs font-bold" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Tất cả ({ALGORITHM_PROBLEMS.length})
          </button>
          <button
            onClick={() => setSelectedLevel("primary")}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              selectedLevel === "primary" ? "bg-white text-indigo-600 shadow-xs font-bold" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Tiểu học ({ALGORITHM_PROBLEMS.filter((p) => p.level === "primary").length})
          </button>
          <button
            onClick={() => setSelectedLevel("secondary")}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              selectedLevel === "secondary" ? "bg-white text-indigo-600 shadow-xs font-bold" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            THCS ({ALGORITHM_PROBLEMS.filter((p) => p.level === "secondary").length})
          </button>
        </div>
      </div>

      {/* Grid of problems */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProblems.map((p) => (
          <div
            key={p.id}
            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                    p.level === "primary"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-blue-50 text-blue-700 border border-blue-200"
                  }`}
                >
                  {p.level === "primary" ? "Bảng A - Tiểu Học" : "Bảng B - THCS"}
                </span>

                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    p.difficulty === "Dễ"
                      ? "bg-emerald-100 text-emerald-800"
                      : p.difficulty === "Trung bình"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-rose-100 text-rose-800"
                  }`}
                >
                  {p.difficulty}
                </span>
              </div>

              <h4 className="font-bold text-slate-900 text-sm">{p.title}</h4>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">{p.problemStatement}</p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-mono text-slate-400 text-[11px]">{p.id}</span>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-500">
                  {p.sampleCases?.length || 2} Ví dụ mẫu
                </span>
                <span className="font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  +{p.points} XP
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
