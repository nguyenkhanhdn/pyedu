import React, { useState } from "react";
import { BookOpen, Layers, CheckCircle2, Award, Code, Sparkles, ChevronRight } from "lucide-react";
import { CURRICULUM_MODULES } from "../../data/curriculum";

export const AdminCurriculumView: React.FC = () => {
  const [selectedModuleId, setSelectedModuleId] = useState<string>(CURRICULUM_MODULES[0]?.id || "m1");

  const selectedModule = CURRICULUM_MODULES.find((m) => m.id === selectedModuleId) || CURRICULUM_MODULES[0];
  const totalLessons = CURRICULUM_MODULES.reduce((sum, m) => sum + (m.lessons?.length || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header Stat */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Layers className="h-5 w-5 text-indigo-600" />
            <span>Chương Trình Khóa Học & Bài Giảng Python</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Tổng cộng <b>{CURRICULUM_MODULES.length}</b> Chuyên đề • <b>{totalLessons}</b> Bài học tương tác & chấm tự động.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold rounded-xl">
            Python 3.12 Core
          </span>
        </div>
      </div>

      {/* Modules Selector & Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Module list */}
        <div className="space-y-2">
          {CURRICULUM_MODULES.map((mod, idx) => {
            const isSelected = mod.id === selectedModuleId;
            return (
              <div
                key={mod.id}
                onClick={() => setSelectedModuleId(mod.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/25"
                    : "bg-white text-slate-800 border-slate-200 hover:border-indigo-300 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${isSelected ? "text-indigo-200" : "text-slate-400"}`}>
                    Chuyên đề {idx + 1}
                  </span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${isSelected ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"}`}>
                    {mod.lessons.length} bài
                  </span>
                </div>
                <h4 className="font-bold text-sm mt-1">{mod.title}</h4>
                <p className={`text-xs mt-1 line-clamp-1 ${isSelected ? "text-indigo-100" : "text-slate-500"}`}>
                  {mod.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Selected Module Lessons */}
        <div className="lg:col-span-2 space-y-3">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="border-b border-slate-100 pb-3 mb-4 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-indigo-600">Danh sách bài học chi tiết</span>
                <h3 className="text-base font-bold text-slate-900">{selectedModule.title}</h3>
              </div>
              <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg border border-emerald-200">
                {selectedModule.lessons.length} bài tập
              </span>
            </div>

            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              {selectedModule.lessons.map((lesson, idx) => (
                <div
                  key={lesson.id}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{lesson.title}</h4>
                        <p className="text-xs text-slate-500 mt-0.5">{lesson.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-[11px] font-mono bg-slate-200/80 text-slate-700 px-2 py-0.5 rounded">
                            ID: {lesson.id}
                          </span>
                          <span className="text-[11px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                            +{lesson.xpReward} XP
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
