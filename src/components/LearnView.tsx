import React, { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { Lesson, TestCase, SubmissionResult } from "../types";
import { PythonRunner } from "../utils/pythonRunner";
import {
  Play,
  CheckCircle2,
  XCircle,
  Lock,
  Unlock,
  BookOpen,
  Code2,
  Terminal,
  HelpCircle,
  Sparkles,
  RotateCcw,
  Bot,
  FilePlus2,
  Clock,
  Award,
  ChevronRight,
  ChevronDown,
  Info,
  Lightbulb,
  Cpu,
  Layers,
  ArrowRight,
  ShieldCheck,
  AlertTriangle
} from "lucide-react";

interface LearnViewProps {
  onOpenAiWithContext: (context: {
    lessonTitle: string;
    currentCode: string;
    lastError?: string;
    testInput?: string;
    expectedOutput?: string;
    actualOutput?: string;
  }) => void;
}

export const LearnView: React.FC<LearnViewProps> = ({ onOpenAiWithContext }) => {
  const {
    modules,
    selectedLesson,
    setSelectedLesson,
    isLessonUnlocked,
    isLessonCompleted,
    userCodes,
    setUserCodeForLesson,
    submitLessonCode,
    lessonSubmissions,
    addNote,
    teacherMode,
    currentUser
  } = useApp();

  // Active Main Pane: 'theory' or 'practice'
  const [activePane, setActivePane] = useState<'theory' | 'practice'>('theory');

  // Sidebar expanded modules
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    "module-1": true,
    "module-2": true,
    "module-3": true,
  });

  // Code editor state for current lesson
  const currentCode = userCodes[selectedLesson.id] !== undefined
    ? userCodes[selectedLesson.id]
    : selectedLesson.practice.starterCode;

  const [editorCode, setEditorCode] = useState<string>(currentCode);
  const [customInput, setCustomInput] = useState<string>("");
  const [showCustomInput, setShowCustomInput] = useState<boolean>(false);

  // Execution & Grading States
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isGrading, setIsGrading] = useState<boolean>(false);
  const [consoleOutput, setConsoleOutput] = useState<string>("");
  const [consoleError, setConsoleError] = useState<string>("");
  const [executionTime, setExecutionTime] = useState<number | null>(null);
  const [latestSubmission, setLatestSubmission] = useState<SubmissionResult | null>(null);

  // Interactive challenge in theory state
  const [theoryPlaygroundCode, setTheoryPlaygroundCode] = useState<string>(
    selectedLesson.theory.interactiveChallenge.initialCode
  );
  const [theoryPlaygroundOutput, setTheoryPlaygroundOutput] = useState<string>("");
  const [isTheoryRunning, setIsTheoryRunning] = useState<boolean>(false);

  // Hints drawer
  const [showHints, setShowHints] = useState<boolean>(false);
  const [unlockedHintLevel, setUnlockedHintLevel] = useState<number>(0);

  // Quick note modal/toast state
  const [noteSavedToast, setNoteSavedToast] = useState<string | null>(null);

  // Sync editor when selectedLesson changes
  useEffect(() => {
    const saved = userCodes[selectedLesson.id] !== undefined
      ? userCodes[selectedLesson.id]
      : selectedLesson.practice.starterCode;
    setEditorCode(saved);
    setConsoleOutput("");
    setConsoleError("");
    setExecutionTime(null);
    setLatestSubmission(lessonSubmissions[selectedLesson.id]?.[0] || null);
    setTheoryPlaygroundCode(selectedLesson.theory.interactiveChallenge.initialCode);
    setTheoryPlaygroundOutput("");
    setShowHints(false);
    setUnlockedHintLevel(0);
  }, [selectedLesson.id]);

  const toggleModuleExpand = (modId: string) => {
    setExpandedModules(prev => ({ ...prev, [modId]: !prev[modId] }));
  };

  const handleSelectLesson = (lesson: Lesson) => {
    if (!isLessonUnlocked(lesson.id)) return;
    setSelectedLesson(lesson);
  };

  // Run Code manually against custom input / sample input
  const handleRunCode = async () => {
    setIsRunning(true);
    setConsoleError("");
    setConsoleOutput("Đang biên dịch và thực thi Python...");

    const inputToUse = showCustomInput ? customInput : (selectedLesson.practice.sampleCases[0]?.input || "");
    const result = await PythonRunner.runCode(editorCode, inputToUse);

    setUserCodeForLesson(selectedLesson.id, editorCode);
    setIsRunning(false);
    setConsoleOutput(result.output || "(Chương trình không in gì ra màn hình)");
    if (result.error) {
      setConsoleError(result.error);
    }
    setExecutionTime(result.executionTimeMs);
  };

  // Submit and automated grade against all test cases
  const handleGradeCode = async () => {
    setIsGrading(true);
    setConsoleError("");
    setUserCodeForLesson(selectedLesson.id, editorCode);

    const evaluation = await PythonRunner.evaluateTestSuite(editorCode, selectedLesson.practice.testCases);
    const submissionResult: SubmissionResult = {
      lessonId: selectedLesson.id,
      passed: evaluation.passed,
      score: evaluation.score,
      totalTests: evaluation.totalTests,
      passedTests: evaluation.passedTests,
      runtimeMs: evaluation.runtimeMs,
      testResults: evaluation.testResults,
      timestamp: new Date().toISOString()
    };

    setLatestSubmission(submissionResult);
    submitLessonCode(selectedLesson.id, submissionResult);
    setIsGrading(false);

    if (!evaluation.passed) {
      const firstFail = evaluation.testResults.find(t => !t.passed);
      if (firstFail?.errorMessage) {
        setConsoleError(firstFail.errorMessage);
      }
    }
  };

  // Run interactive mini-challenge in theory tab
  const handleRunTheoryPlayground = async () => {
    setIsTheoryRunning(true);
    const res = await PythonRunner.runCode(theoryPlaygroundCode);
    setIsTheoryRunning(false);
    setTheoryPlaygroundOutput(res.error ? `Lỗi: ${res.error}` : (res.output || "Đã chạy xong"));
  };

  // Save current code to personal notes
  const handleSaveToNotes = () => {
    addNote({
      lessonId: selectedLesson.id,
      lessonTitle: selectedLesson.title,
      title: `Ghi chú cho: ${selectedLesson.title}`,
      content: `Code giải và lưu ý cho bài tập "${selectedLesson.practice.title}".\nĐộ khó: ${selectedLesson.practice.difficulty}.`,
      codeSnippet: editorCode,
      tags: ["Bài học", selectedLesson.practice.difficulty, "Code mẫu"]
    });
    setNoteSavedToast("Đã lưu mã nguồn vào Sổ tay Ghi chú thành công! 📝");
    setTimeout(() => setNoteSavedToast(null), 2500);
  };

  // Ask AI about current error
  const handleAskAiAboutError = () => {
    const firstFail = latestSubmission?.testResults.find(t => !t.passed);
    onOpenAiWithContext({
      lessonTitle: selectedLesson.title,
      currentCode: editorCode,
      lastError: consoleError || firstFail?.errorMessage || "Kết quả in ra không khớp với kỳ vọng của test case.",
      testInput: firstFail?.input,
      expectedOutput: firstFail?.expectedOutput,
      actualOutput: firstFail?.actualOutput
    });
  };

  const isCompleted = isLessonCompleted(selectedLesson.id);

  return (
    <div className="flex-1 flex flex-col lg:flex-row h-[calc(100vh-4rem)] overflow-hidden bg-slate-950 text-slate-100">
      {/* Toast alert */}
      {noteSavedToast && (
        <div className="fixed top-20 right-8 z-50 px-4 py-3 bg-emerald-600 text-white text-xs font-semibold rounded-xl shadow-xl animate-in fade-in slide-in-from-top-2 flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4" />
          <span>{noteSavedToast}</span>
        </div>
      )}

      {/* LEFT SIDEBAR: Curriculum Tree */}
      <aside className="w-full lg:w-80 lg:min-w-[20rem] bg-slate-900 border-r border-slate-800 flex flex-col h-auto lg:h-full max-h-[30vh] lg:max-h-full overflow-y-auto">
        <div className="p-4 border-b border-slate-800 bg-slate-900/90 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-sm text-slate-200 flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-indigo-400" />
              <span>Lộ trình Python (13 bài)</span>
            </h2>
            {teacherMode && (
              <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-500/20 text-amber-300 rounded border border-amber-500/30">
                Unlocked All
              </span>
            )}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Hoàn thành bài tập để mở khóa bài tiếp theo</p>
        </div>

        <div className="p-2 space-y-2 flex-1">
          {modules.map((module) => (
            <div key={module.id} className="rounded-xl border border-slate-800 bg-slate-850 overflow-hidden">
              {/* Module Header */}
              <button
                onClick={() => toggleModuleExpand(module.id)}
                className="w-full p-3 flex items-center justify-between text-left hover:bg-slate-800/80 transition-colors"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className={`h-6 w-6 rounded-lg bg-gradient-to-tr ${module.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                    {module.order}
                  </div>
                  <span className="text-xs font-semibold text-slate-200 truncate">{module.title}</span>
                </div>
                {expandedModules[module.id] ? (
                  <ChevronDown className="h-4 w-4 text-slate-400 flex-shrink-0" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-slate-400 flex-shrink-0" />
                )}
              </button>

              {/* Module Lessons List */}
              {expandedModules[module.id] && (
                <div className="px-2 pb-2 space-y-1">
                  {module.lessons.map((lesson) => {
                    const unlocked = isLessonUnlocked(lesson.id);
                    const completed = isLessonCompleted(lesson.id);
                    const isSelected = selectedLesson.id === lesson.id;

                    return (
                      <button
                        key={lesson.id}
                        disabled={!unlocked}
                        onClick={() => handleSelectLesson(lesson)}
                        className={`w-full p-2.5 rounded-lg text-left transition-all flex items-center justify-between group ${
                          isSelected
                            ? "bg-indigo-600/20 border border-indigo-500/40 text-white"
                            : unlocked
                            ? "hover:bg-slate-800 text-slate-300 border border-transparent"
                            : "opacity-40 cursor-not-allowed text-slate-500 border border-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0 pr-2">
                          {completed ? (
                            <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                          ) : unlocked ? (
                            <Unlock className="h-3.5 w-3.5 text-indigo-400 flex-shrink-0" />
                          ) : (
                            <Lock className="h-3.5 w-3.5 text-slate-500 flex-shrink-0" />
                          )}
                          <div className="min-w-0">
                            <p className="text-xs font-medium truncate">{lesson.title}</p>
                            <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                              <span className="flex items-center gap-0.5">
                                <Clock className="h-2.5 w-2.5" /> {lesson.durationMin}p
                              </span>
                              <span className="text-amber-400 font-semibold">+{lesson.xpReward} XP</span>
                            </div>
                          </div>
                        </div>

                        {isSelected && (
                          <div className="h-2 w-2 rounded-full bg-indigo-400 flex-shrink-0 animate-ping" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </aside>

      {/* RIGHT MAIN AREA: Dual Pane (Theory & Visuals OR Code Compiler & Auto-Grader) */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-slate-950">
        {/* Top Lesson Action Bar */}
        <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                {selectedLesson.moduleTitle}
              </span>
              {isCompleted && (
                <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" /> Đã hoàn thành
                </span>
              )}
            </div>
            <h1 className="text-base sm:text-lg font-bold text-white truncate">{selectedLesson.title}</h1>
          </div>

          {/* Pane Switcher Tabs */}
          <div className="flex items-center bg-slate-800 p-1 rounded-xl border border-slate-700">
            <button
              onClick={() => setActivePane("theory")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activePane === "theory"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Lightbulb className="h-3.5 w-3.5" />
              <span>1. Lý thuyết & minh họa</span>
            </button>
            <button
              onClick={() => setActivePane("practice")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activePane === "practice"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Code2 className="h-3.5 w-3.5" />
              <span>2. Trình biên dịch & chấm điểm</span>
            </button>
          </div>
        </div>

        {/* BODY CONTAINER */}
        <div className="flex-1 overflow-y-auto">
          {activePane === "theory" ? (
            /* ================= PANE 1: VISUAL THEORY & INTERACTIVE TRY-IT ================= */
            <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-6 animate-in fade-in">
              {/* Theory Summary */}
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm">
                  <Info className="h-4 w-4" />
                  <span>Tổng quan kiến thức</span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">{selectedLesson.theory.summary}</p>
                <div className="pt-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Điểm cốt lõi cần nhớ:
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {selectedLesson.theory.keyPoints.map((pt, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 mt-1.5 flex-shrink-0" />
                        <span className="leading-normal">{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Visual Concept Illustration Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950/20 to-slate-900 border border-indigo-500/20 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-blue-400 font-semibold text-sm">
                    <Layers className="h-4 w-4" />
                    <span>Minh họa trực quan: {selectedLesson.theory.conceptIllustration.title}</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-semibold">
                    Sơ đồ trực quan
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  {selectedLesson.theory.conceptIllustration.description}
                </p>

                {/* Render specific diagram type */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                  {selectedLesson.theory.conceptIllustration.visualData.items && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {selectedLesson.theory.conceptIllustration.visualData.items.map((item: any, idx: number) => (
                        <div key={idx} className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-center">
                          <p className="text-[10px] text-slate-400 uppercase">{item.name || `Index ${item.index}`}</p>
                          <p className="font-mono text-emerald-400 font-bold text-sm my-1">{item.value || item.val}</p>
                          {item.type && <span className="text-[10px] px-1.5 py-0.5 bg-slate-800 text-indigo-300 rounded font-mono">{item.type}</span>}
                        </div>
                      ))}
                    </div>
                  )}

                  {selectedLesson.theory.conceptIllustration.visualData.table && (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-slate-800 text-[11px] text-slate-400">
                            <th className="p-2">Phép toán</th>
                            <th className="p-2">Ý nghĩa</th>
                            <th className="p-2">Kết quả</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
                          {selectedLesson.theory.conceptIllustration.visualData.table.map((row: any, idx: number) => (
                            <tr key={idx} className="hover:bg-slate-900/50">
                              <td className="p-2 text-indigo-400">{row.op}</td>
                              <td className="p-2 font-sans text-slate-300">{row.meaning}</td>
                              <td className="p-2 text-emerald-400 font-bold">{row.result}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {selectedLesson.theory.conceptIllustration.visualData.steps && (
                    <div className="space-y-2">
                      {selectedLesson.theory.conceptIllustration.visualData.steps.map((step: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-3 p-2 bg-slate-900 rounded-lg">
                          <span className="h-5 w-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold">
                            {idx + 1}
                          </span>
                          <span className="text-slate-300 font-medium">{step}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Code Examples with Explanations */}
              <div className="space-y-4">
                <h3 className="font-bold text-sm text-slate-200 flex items-center gap-2">
                  <Code2 className="h-4 w-4 text-emerald-400" />
                  <span>Ví Dụ Minh Họa Cụ Thể</span>
                </h3>
                {selectedLesson.theory.examples.map((ex, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-semibold text-white">{ex.title}</h4>
                      <button
                        onClick={() => {
                          setEditorCode(ex.code);
                          setActivePane("practice");
                        }}
                        className="text-[11px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                      >
                        <span>Thử chạy code này</span>
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>
                    <p className="text-xs text-slate-400">{ex.explanation}</p>
                    <div className="rounded-xl bg-slate-950 p-3 border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto">
                      <pre>{ex.code}</pre>
                    </div>
                    {ex.output && (
                      <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/50 text-[11px] font-mono text-slate-300">
                        <span className="text-slate-500 mr-2">Output:</span>
                        <span>{ex.output}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Interactive Mini Challenge Playground */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-950/30 to-purple-950/30 border border-indigo-500/30 space-y-3">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <Sparkles className="h-4 w-4" />
                  <span>Thử Thách Tương Tác Ngay Lập Tức</span>
                </div>
                <p className="text-xs text-slate-300">{selectedLesson.theory.interactiveChallenge.prompt}</p>

                <div className="space-y-2">
                  <div className="rounded-xl bg-slate-950 border border-slate-800 p-3">
                    <textarea
                      rows={3}
                      value={theoryPlaygroundCode}
                      onChange={(e) => setTheoryPlaygroundCode(e.target.value)}
                      className="w-full bg-transparent font-mono text-xs text-emerald-300 focus:outline-none resize-none"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-[11px] text-slate-400 italic">
                      💡 Gợi ý: {selectedLesson.theory.interactiveChallenge.hint}
                    </p>
                    <button
                      onClick={handleRunTheoryPlayground}
                      disabled={isTheoryRunning}
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-indigo-600/30 transition-all"
                    >
                      <Play className="h-3 w-3" />
                      <span>{isTheoryRunning ? "Đang chạy..." : "Thử Ngay"}</span>
                    </button>
                  </div>

                  {theoryPlaygroundOutput && (
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200">
                      <span className="text-indigo-400 font-semibold mr-2">Kết quả:</span>
                      {theoryPlaygroundOutput}
                    </div>
                  )}
                </div>
              </div>

              {/* Move to Practice Button */}
              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setActivePane("practice")}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all"
                >
                  <span>Chuyển Sang Bài Tập Thực Hành & Chấm Điểm</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ) : (
            /* ================= PANE 2: INTEGRATED COMPILER & AUTOMATED GRADER ================= */
            <div className="flex flex-col xl:flex-row h-full min-h-[500px]">
              {/* Problem Description Column */}
              <div className="w-full xl:w-2/5 p-4 sm:p-5 border-b xl:border-b-0 xl:border-r border-slate-800 overflow-y-auto space-y-4 bg-slate-900/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      selectedLesson.practice.difficulty === 'Cơ bản'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : selectedLesson.practice.difficulty === 'Trung bình'
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    }`}>
                      {selectedLesson.practice.difficulty}
                    </span>
                    <span className="text-xs text-amber-400 font-semibold">
                      +{selectedLesson.xpReward} XP Thưởng
                    </span>
                  </div>

                  <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/30 font-semibold">
                    Bài tập không lời giải
                  </span>
                </div>

                <div>
                  <h2 className="text-base font-bold text-white">{selectedLesson.practice.title}</h2>
                  <div className="mt-2 text-xs text-slate-300 whitespace-pre-line leading-relaxed">
                    {selectedLesson.practice.problemStatement}
                  </div>
                </div>

                {/* Input/Output Specifications */}
                <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
                  <div>
                    <h4 className="font-semibold text-slate-400">Quy cách Đầu vào (Input):</h4>
                    <p className="text-slate-300 whitespace-pre-line">{selectedLesson.practice.inputFormat}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-400">Quy cách Đầu ra (Output):</h4>
                    <p className="text-slate-300 whitespace-pre-line">{selectedLesson.practice.outputFormat}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-400">Ràng buộc (Constraints):</h4>
                    <p className="text-slate-400 font-mono">{selectedLesson.practice.constraints}</p>
                  </div>
                </div>

                {/* Sample Test Cases */}
                <div className="space-y-3 pt-2 border-t border-slate-800">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Ví Dụ Mẫu (Sample Cases):
                  </h4>
                  {selectedLesson.practice.sampleCases.map((sample, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                      <div className="grid grid-cols-2 gap-2 font-mono">
                        <div>
                          <p className="text-[10px] text-slate-500 mb-0.5">Input Mẫu:</p>
                          <div className="p-2 rounded bg-slate-900 text-slate-200 whitespace-pre-line">
                            {sample.input || "(Trống)"}
                          </div>
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-500 mb-0.5">Output Mẫu:</p>
                          <div className="p-2 rounded bg-slate-900 text-emerald-400 whitespace-pre-line font-bold">
                            {sample.output}
                          </div>
                        </div>
                      </div>
                      {sample.explanation && (
                        <p className="text-[11px] text-slate-400 italic">Giải thích: {sample.explanation}</p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Detailed Guidance & Hints Drawer */}
                <div className="pt-2 border-t border-slate-800">
                  <button
                    onClick={() => setShowHints(!showHints)}
                    className="w-full py-2 px-3 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-xl text-xs font-semibold text-indigo-400 flex items-center justify-between transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Lightbulb className="h-4 w-4 text-amber-400" />
                      <span>Hướng Dẫn Chi Tiết & Gợi Ý Tư Duy</span>
                    </div>
                    <span>{showHints ? "Ẩn gợi ý ▲" : "Xem gợi ý ▼"}</span>
                  </button>

                  {showHints && (
                    <div className="mt-2 p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs animate-in fade-in">
                      <p className="text-[11px] text-slate-400">
                        PyEdu cung cấp các bước gợi ý tư duy dần dần để rèn luyện kỹ năng tự lập trình:
                      </p>
                      {selectedLesson.practice.hints.map((hint, idx) => (
                        <div key={idx} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                          <p className="text-indigo-400 font-semibold text-[11px] mb-1">Gợi ý bước {idx + 1}:</p>
                          <p className="text-slate-300 font-mono text-[11px]">{hint}</p>
                        </div>
                      ))}
                      <div className="pt-1">
                        <button
                          onClick={handleAskAiAboutError}
                          className="w-full py-2 bg-gradient-to-r from-violet-600/30 to-indigo-600/30 hover:from-violet-600/40 hover:to-indigo-600/40 border border-violet-500/40 text-violet-300 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all"
                        >
                          <Bot className="h-3.5 w-3.5 text-violet-400" />
                          <span>Hỏi AI Tutor giải thích thêm về gợi ý này</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Code Editor & Auto-Grader Terminal Column */}
              <div className="w-full xl:w-3/5 flex flex-col h-full bg-slate-950">
                {/* Editor Header Toolbar */}
                <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Terminal className="h-4 w-4 text-emerald-400" />
                    <span className="text-xs font-mono font-semibold text-slate-300">main.py</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowCustomInput(!showCustomInput)}
                      className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                        showCustomInput ? "bg-indigo-600 text-white" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                      }`}
                      title="Tùy chỉnh dữ liệu đầu vào cho lệnh input()"
                    >
                      {showCustomInput ? "Đang mở Stdin" : "Nhập Stdin"}
                    </button>

                    <button
                      onClick={handleSaveToNotes}
                      className="p-1.5 rounded text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition-colors"
                      title="Lưu đoạn code này vào Sổ tay Ghi chú"
                    >
                      <FilePlus2 className="h-4 w-4" />
                    </button>

                    <button
                      onClick={() => setEditorCode(selectedLesson.practice.starterCode)}
                      className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                      title="Đặt lại mã nguồn mẫu ban đầu"
                    >
                      <RotateCcw className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Optional Custom Stdin Input Box */}
                {showCustomInput && (
                  <div className="p-3 bg-slate-900/90 border-b border-slate-800 animate-in fade-in">
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                      Dữ liệu đầu vào tiêu chuẩn (Custom Stdin cho lệnh input()):
                    </label>
                    <textarea
                      rows={2}
                      value={customInput}
                      onChange={(e) => setCustomInput(e.target.value)}
                      placeholder="Nhập các dòng input, mỗi dòng tương ứng một lần gọi input()..."
                      className="w-full p-2 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-slate-200 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                )}

                {/* Python Code Editor Area */}
                <div className="flex-1 relative flex bg-slate-950 font-mono text-xs sm:text-sm overflow-hidden">
                  {/* Line numbers simulation */}
                  <div className="py-3 px-2 bg-slate-900/60 text-slate-600 text-right select-none border-r border-slate-800/80 font-mono text-xs w-10">
                    {editorCode.split("\n").map((_, i) => (
                      <div key={i}>{i + 1}</div>
                    ))}
                  </div>

                  <textarea
                    value={editorCode}
                    onChange={(e) => setEditorCode(e.target.value)}
                    onKeyDown={(e) => {
                      // Support tab indentation (4 spaces)
                      if (e.key === "Tab") {
                        e.preventDefault();
                        const start = e.currentTarget.selectionStart;
                        const end = e.currentTarget.selectionEnd;
                        const newCode = editorCode.substring(0, start) + "    " + editorCode.substring(end);
                        setEditorCode(newCode);
                        setTimeout(() => {
                          e.currentTarget.selectionStart = e.currentTarget.selectionEnd = start + 4;
                        }, 0);
                      }
                    }}
                    spellCheck={false}
                    className="flex-1 p-3 bg-transparent text-emerald-300 focus:outline-none resize-none overflow-y-auto leading-relaxed"
                  />
                </div>

                {/* Editor Action Buttons */}
                <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    {executionTime !== null && (
                      <span className="text-[11px] text-slate-400 font-mono">
                        ⏱️ {executionTime}ms
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Run Code Button */}
                    <button
                      onClick={handleRunCode}
                      disabled={isRunning || isGrading}
                      className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-700 disabled:opacity-50"
                    >
                      <Play className="h-3.5 w-3.5 text-emerald-400" />
                      <span>{isRunning ? "Đang chạy..." : "Chạy Thử"}</span>
                    </button>

                    {/* Submit & Auto-Grade Button */}
                    <button
                      onClick={handleGradeCode}
                      disabled={isRunning || isGrading}
                      className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-emerald-600/20 transition-all disabled:opacity-50"
                    >
                      <Award className="h-4 w-4" />
                      <span>{isGrading ? "Đang chấm điểm..." : "Chấm Bài Tự Động"}</span>
                    </button>
                  </div>
                </div>

                {/* OUTPUT TERMINAL & AUTO-GRADING REPORT */}
                <div className="h-48 sm:h-56 bg-slate-950 border-t border-slate-800 flex flex-col">
                  {/* Terminal Header */}
                  <div className="px-4 py-2 bg-slate-900/90 border-b border-slate-800/80 flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-400 flex items-center gap-2">
                      <Terminal className="h-3.5 w-3.5 text-indigo-400" />
                      <span>Kết Quả Thực Thi & Chấm Điểm</span>
                    </span>

                    {latestSubmission && (
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          latestSubmission.passed
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                        }`}>
                          {latestSubmission.score}/100 Điểm ({latestSubmission.passedTests}/{latestSubmission.totalTests} Tests)
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Terminal Body */}
                  <div className="p-3 flex-1 overflow-y-auto font-mono text-xs space-y-2">
                    {/* If there is a submission report */}
                    {latestSubmission ? (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                          <span className="font-sans text-xs font-bold text-slate-200">
                            {latestSubmission.passed ? (
                              <span className="text-emerald-400 flex items-center gap-1">
                                <CheckCircle2 className="h-4 w-4" /> CHÚC MỪNG! BẠN ĐÃ VƯỢT QUA 100% TEST CASE! 🎉
                              </span>
                            ) : (
                              <span className="text-rose-400 flex items-center gap-1">
                                <XCircle className="h-4 w-4" /> CHƯA ĐẠT! Vui lòng kiểm tra lại test case chưa khớp.
                              </span>
                            )}
                          </span>
                          <span className="text-[11px] text-slate-500">
                            Thời gian chạy: {latestSubmission.runtimeMs}ms
                          </span>
                        </div>

                        {/* Test case list */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {latestSubmission.testResults.map((t, idx) => (
                            <div
                              key={t.testId}
                              className={`p-2.5 rounded-xl border text-xs ${
                                t.passed
                                  ? "bg-emerald-950/20 border-emerald-500/30 text-emerald-300"
                                  : "bg-rose-950/20 border-rose-500/30 text-rose-300"
                              }`}
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-bold flex items-center gap-1">
                                  {t.passed ? (
                                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                                  ) : (
                                    <XCircle className="h-3.5 w-3.5 text-rose-400" />
                                  )}
                                  <span>Test #{idx + 1} {t.isHidden ? "(Test ẩn)" : "(Công khai)"}</span>
                                </span>
                                <span className="text-[10px] opacity-75">{t.executionTimeMs}ms</span>
                              </div>

                              {!t.isHidden ? (
                                <div className="space-y-0.5 text-[11px] text-slate-400 font-mono">
                                  <p>Input: <span className="text-slate-200">{t.input || "(Trống)"}</span></p>
                                  <p>Dự kiến: <span className="text-emerald-400">{t.expectedOutput}</span></p>
                                  <p>Thực tế: <span className={t.passed ? "text-emerald-400" : "text-rose-400 font-bold"}>{t.actualOutput || "(Không có output)"}</span></p>
                                </div>
                              ) : (
                                <p className="text-[10px] text-slate-400 italic">
                                  {t.passed ? "Vượt qua test case bí mật" : "Sai kết quả trên dữ liệu bí mật"}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>

                        {!latestSubmission.passed && (
                          <div className="pt-2 flex justify-end">
                            <button
                              onClick={handleAskAiAboutError}
                              className="px-3 py-1.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-violet-600/30 transition-all"
                            >
                              <Bot className="h-3.5 w-3.5 text-violet-300" />
                              <span>Hỏi Trợ lý AI Tutor cách sửa lỗi này 🤖</span>
                            </button>
                          </div>
                        )}
                      </div>
                    ) : consoleError ? (
                      <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 space-y-2">
                        <div className="flex items-center gap-2 font-bold">
                          <AlertTriangle className="h-4 w-4" />
                          <span>Lỗi Thực Thi (Runtime / Syntax Error):</span>
                        </div>
                        <pre className="whitespace-pre-wrap text-xs text-rose-300">{consoleError}</pre>
                        <button
                          onClick={handleAskAiAboutError}
                          className="px-3 py-1 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                        >
                          <Bot className="h-3.5 w-3.5" />
                          <span>Nhờ AI giải thích nguyên nhân lỗi</span>
                        </button>
                      </div>
                    ) : consoleOutput ? (
                      <pre className="whitespace-pre-wrap text-slate-200 leading-normal">{consoleOutput}</pre>
                    ) : (
                      <p className="text-slate-500 italic">
                        Nhấn "Chạy Thử" để xem kết quả xuất ra hoặc "Chấm Bài Tự Động" để nộp bài đánh giá điểm số.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
