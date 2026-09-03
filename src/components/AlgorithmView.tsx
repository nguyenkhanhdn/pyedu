import React, { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { AlgorithmProblem, AlgorithmLevel, AlgorithmSubmission } from "../types";
import { PythonRunner } from "../utils/pythonRunner";
import {
  Target,
  Trophy,
  Code,
  CheckCircle2,
  XCircle,
  Clock,
  Zap,
  BookOpen,
  Search,
  Filter,
  Play,
  Send,
  RotateCcw,
  Sparkles,
  ChevronRight,
  HelpCircle,
  Copy,
  Check,
  Award,
  Medal,
  Flame,
  Star,
  ExternalLink,
  History,
  GraduationCap,
  Cpu,
  Layers,
  ArrowLeft,
  Info,
  ChevronDown,
  ChevronUp,
  Tag,
  CheckCheck
} from "lucide-react";

interface AlgorithmViewProps {
  onOpenAiWithContext?: (context: any) => void;
}

export const AlgorithmView: React.FC<AlgorithmViewProps> = ({ onOpenAiWithContext }) => {
  const {
    algorithmProblems = [],
    algorithmSubmissions = [],
    solvedProblemIds = [],
    submitAlgorithmProblem,
    algorithmLeaderboard = [],
    currentUser
  } = useApp();

  // Navigation sub-tabs
  const [activeSubTab, setActiveSubTab] = useState<'bank' | 'workspace' | 'solutions' | 'leaderboard'>('bank');
  
  // Selected problem in Workspace
  const [selectedProblem, setSelectedProblem] = useState<AlgorithmProblem | null>(() => {
    return algorithmProblems.length > 0 ? algorithmProblems[0] : null;
  });

  // Filters for Problem Bank
  const [selectedLevel, setSelectedLevel] = useState<AlgorithmLevel | 'all'>('all');
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'solved' | 'unsolved'>('all');

  // Filters for Leaderboard
  const [leaderboardLevel, setLeaderboardLevel] = useState<'all' | 'primary' | 'secondary'>('all');
  const [leaderboardSearch, setLeaderboardSearch] = useState<string>('');

  // Workspace State
  const [userCode, setUserCode] = useState<string>(() => {
    return algorithmProblems.length > 0 ? algorithmProblems[0].starterCode : "";
  });
  const [isRunningSample, setIsRunningSample] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [runResult, setRunResult] = useState<any>(null);
  const [submissionOutcome, setSubmissionOutcome] = useState<any>(null);
  const [customInput, setCustomInput] = useState<string>(() => {
    return algorithmProblems.length > 0 ? algorithmProblems[0].sampleCases?.[0]?.input || "" : "";
  });
  const [workspaceTab, setWorkspaceTab] = useState<'statement' | 'tests' | 'hints'>('statement');
  const [copiedCode, setCopiedCode] = useState(false);
  const [viewingSolutionCode, setViewingSolutionCode] = useState<AlgorithmSubmission | null>(null);

  // Sync userCode and input when selected problem changes
  useEffect(() => {
    if (!selectedProblem) {
      if (algorithmProblems.length > 0) {
        setSelectedProblem(algorithmProblems[0]);
      }
      return;
    }

    // Check if user has a previous code submission for this problem
    const lastSub = algorithmSubmissions.find(s => s.problemId === selectedProblem.id);
    if (lastSub) {
      setUserCode(lastSub.code);
    } else {
      setUserCode(selectedProblem.starterCode || "");
    }
    setRunResult(null);
    setSubmissionOutcome(null);
    setCustomInput(selectedProblem.sampleCases?.[0]?.input || "");
  }, [selectedProblem?.id, algorithmProblems]);

  // Handle problem selection from bank
  const handleSelectProblem = (problem: AlgorithmProblem) => {
    setSelectedProblem(problem);
    setActiveSubTab('workspace');
  };

  // Run with sample tests or custom input
  const handleRunSample = async () => {
    if (!selectedProblem) return;
    setIsRunningSample(true);
    setRunResult(null);
    try {
      const inputToUse = customInput !== "" ? customInput : (selectedProblem.sampleCases?.[0]?.input || "");
      const res = await PythonRunner.runCode(userCode, inputToUse);
      setRunResult({
        ...res,
        inputUsed: inputToUse,
        expectedOutput: selectedProblem.sampleCases?.[0]?.output || ""
      });
    } catch (err: any) {
      setRunResult({
        success: false,
        output: "",
        error: err?.message || "Lỗi thực thi",
        executionTimeMs: 0
      });
    } finally {
      setIsRunningSample(false);
    }
  };

  // Submit and grade all test cases
  const handleSubmitAndGrade = async () => {
    if (!selectedProblem) return;
    setIsSubmitting(true);
    setSubmissionOutcome(null);
    try {
      const testCases = selectedProblem.testCases || [];
      const evalResult = await PythonRunner.evaluateTestSuite(userCode, testCases);
      setSubmissionOutcome(evalResult);
      await submitAlgorithmProblem(selectedProblem.id, evalResult, userCode);
    } catch (err: any) {
      setSubmissionOutcome({
        passed: false,
        score: 0,
        passedTests: 0,
        totalTests: selectedProblem.testCases?.length || 0,
        runtimeMs: 0,
        testResults: []
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset code to starter code
  const handleResetCode = () => {
    if (selectedProblem) {
      setUserCode(selectedProblem.starterCode || "");
    }
    setRunResult(null);
    setSubmissionOutcome(null);
  };

  // Copy code to clipboard
  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // AI Tutor support with problem context
  const handleAskAiForProblem = () => {
    if (onOpenAiWithContext && selectedProblem) {
      onOpenAiWithContext({
        type: 'algorithm_problem',
        problem: selectedProblem,
        currentCode: userCode,
        submissionOutcome
      });
    }
  };

  // Extract all unique topics
  const allTopics = Array.from(new Set(algorithmProblems.map(p => p.topic).filter(Boolean)));

  // Filter problems for Problem Bank
  const filteredProblems = algorithmProblems.filter(p => {
    const matchLevel = selectedLevel === 'all' || p.level === selectedLevel;
    const matchTopic = selectedTopic === 'all' || p.topic === selectedTopic;
    const matchSearch = (p.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                        (p.problemStatement || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                        (p.tags || []).some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const isSolved = solvedProblemIds.includes(p.id);
    const matchStatus = statusFilter === 'all' || (statusFilter === 'solved' && isSolved) || (statusFilter === 'unsolved' && !isSolved);
    return matchLevel && matchTopic && matchSearch && matchStatus;
  });

  // Filter leaderboard
  const filteredLeaderboard = algorithmLeaderboard.filter(entry => {
    const matchSearch = (entry.fullName || '').toLowerCase().includes(leaderboardSearch.toLowerCase()) ||
                        (entry.username || '').toLowerCase().includes(leaderboardSearch.toLowerCase());
    return matchSearch;
  });

  // User Stats
  const userSolvedCount = solvedProblemIds.length;
  const totalProblemsCount = algorithmProblems.length;
  const primarySolved = algorithmProblems.filter(p => p.level === 'primary' && solvedProblemIds.includes(p.id)).length;
  const primaryTotal = algorithmProblems.filter(p => p.level === 'primary').length;
  const secondarySolved = algorithmProblems.filter(p => p.level === 'secondary' && solvedProblemIds.includes(p.id)).length;
  const secondaryTotal = algorithmProblems.filter(p => p.level === 'secondary').length;

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-slate-50 text-slate-800">
      {/* Sub-Header & Navigation Tabs */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-3 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Title & Level stats */}
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-md shadow-emerald-500/20">
              <Target className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                  Luyện Giải Đề Thuật Toán Python
                </h1>
                <span className="px-2 py-0.5 text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">
                  {userSolvedCount}/{totalProblemsCount} bài đã giải
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Phân cấp độ Tiểu học & THCS • Chấm điểm tự động • Xếp hạng thi đua
              </p>
            </div>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveSubTab('bank')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeSubTab === 'bank'
                  ? 'bg-white text-indigo-600 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span>Ngân Hàng Đề ({algorithmProblems.length})</span>
            </button>

            <button
              onClick={() => setActiveSubTab('workspace')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeSubTab === 'workspace'
                  ? 'bg-white text-indigo-600 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Code className="h-3.5 w-3.5" />
              <span>Không Gian Giải Đề</span>
            </button>

            <button
              onClick={() => setActiveSubTab('solutions')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeSubTab === 'solutions'
                  ? 'bg-white text-indigo-600 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <History className="h-3.5 w-3.5" />
              <span>Bài Giải Của Tôi ({algorithmSubmissions.length})</span>
            </button>

            <button
              onClick={() => setActiveSubTab('leaderboard')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeSubTab === 'leaderboard'
                  ? 'bg-white text-indigo-600 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Trophy className="h-3.5 w-3.5 text-amber-500" />
              <span>Bảng Xếp Hạng Thuật Toán</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area based on Active Sub-Tab */}
      <div className="flex-1 overflow-y-auto">
        {/* TAB 1: PROBLEM BANK */}
        {activeSubTab === 'bank' && (
          <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
            {/* Level Selector Cards (Tiểu học & THCS) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Primary Level Card */}
              <div
                onClick={() => setSelectedLevel(selectedLevel === 'primary' ? 'all' : 'primary')}
                className={`p-5 rounded-2xl border-2 transition-all cursor-pointer relative overflow-hidden ${
                  selectedLevel === 'primary'
                    ? 'border-emerald-500 bg-emerald-50/50 shadow-md shadow-emerald-500/10'
                    : 'border-slate-200 bg-white hover:border-emerald-300 hover:shadow-xs'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-emerald-100 text-emerald-700">
                      <GraduationCap className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-base">Cấp Độ Tiểu Học</span>
                        <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-100 text-emerald-800 rounded-full">
                          Khối 3 - 5
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Tư duy số học, tính toán cơ bản, quy luật dãy số, vòng lặp & vẽ hình
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-lg">
                    {primarySolved}/{primaryTotal} Hoàn thành
                  </span>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <div className="flex-1 bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${primaryTotal > 0 ? (primarySolved / primaryTotal) * 100 : 0}%` }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-slate-600">
                    {primaryTotal > 0 ? Math.round((primarySolved / primaryTotal) * 100) : 0}%
                  </span>
                </div>
              </div>

              {/* Secondary Level Card */}
              <div
                onClick={() => setSelectedLevel(selectedLevel === 'secondary' ? 'all' : 'secondary')}
                className={`p-5 rounded-2xl border-2 transition-all cursor-pointer relative overflow-hidden ${
                  selectedLevel === 'secondary'
                    ? 'border-indigo-500 bg-indigo-50/50 shadow-md shadow-indigo-500/10'
                    : 'border-slate-200 bg-white hover:border-indigo-300 hover:shadow-xs'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-indigo-100 text-indigo-700">
                      <Cpu className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-base">Cấp Độ THCS</span>
                        <span className="px-2 py-0.5 text-[10px] font-bold bg-indigo-100 text-indigo-800 rounded-full">
                          Khối 6 - 9
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Số nguyên tố, UCLN/BCNN, Fibonacci, Giai thừa, Two Sum, Xâu & Mảng HSG Tin học trẻ
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-indigo-700 bg-indigo-100/80 px-2.5 py-1 rounded-lg">
                    {secondarySolved}/{secondaryTotal} Hoàn thành
                  </span>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <div className="flex-1 bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${secondaryTotal > 0 ? (secondarySolved / secondaryTotal) * 100 : 0}%` }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-slate-600">
                    {secondaryTotal > 0 ? Math.round((secondarySolved / secondaryTotal) * 100) : 0}%
                  </span>
                </div>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
              {/* Search Box */}
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Tìm bài toán, chủ đề, tag..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Topic Select */}
              <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
                <button
                  onClick={() => setSelectedTopic('all')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    selectedTopic === 'all'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Tất cả chủ đề
                </button>
                {allTopics.map(topic => (
                  <button
                    key={topic}
                    onClick={() => setSelectedTopic(topic)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                      selectedTopic === topic
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {topic}
                  </button>
                ))}
              </div>

              {/* Status filter: All / Solved / Unsolved */}
              <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
                <button
                  onClick={() => setStatusFilter('all')}
                  className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    statusFilter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Tất cả
                </button>
                <button
                  onClick={() => setStatusFilter('solved')}
                  className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    statusFilter === 'solved' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Đã giải
                </button>
                <button
                  onClick={() => setStatusFilter('unsolved')}
                  className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    statusFilter === 'unsolved' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Chưa làm
                </button>
              </div>
            </div>

            {/* Problems Grid / List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProblems.map((problem) => {
                const isSolved = solvedProblemIds.includes(problem.id);
                const isPrimary = problem.level === 'primary';

                return (
                  <div
                    key={problem.id}
                    onClick={() => handleSelectProblem(problem)}
                    className="group bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md hover:border-indigo-300 transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      {/* Badges row */}
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                            isPrimary
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                          }`}
                        >
                          {isPrimary ? 'Tiểu học' : 'THCS'}
                        </span>

                        <div className="flex items-center gap-1.5">
                          <span
                            className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                              problem.difficulty === 'Dễ'
                                ? 'bg-green-100 text-green-800'
                                : problem.difficulty === 'Trung bình'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {problem.difficulty}
                          </span>

                          <span className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                            <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                            +{problem.points} XP
                          </span>
                        </div>
                      </div>

                      {/* Problem Title */}
                      <div>
                        <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors text-sm line-clamp-1">
                          {problem.title}
                        </h3>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                          {problem.problemStatement}
                        </p>
                      </div>

                      {/* Topic & Tags */}
                      <div className="flex flex-wrap gap-1">
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-medium">
                          {problem.topic}
                        </span>
                        {(problem.tags || []).slice(0, 2).map((t, idx) => (
                          <span key={idx} className="px-1.5 py-0.5 bg-slate-50 text-slate-500 border border-slate-200 rounded text-[10px]">
                            #{t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Status Row */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      {isSolved ? (
                        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                          <CheckCircle2 className="h-4 w-4" />
                          <span>Đã vượt qua (100%)</span>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400 font-medium">Chưa hoàn thành</span>
                      )}

                      <div className="flex items-center gap-1 text-xs font-bold text-indigo-600 group-hover:translate-x-1 transition-transform">
                        <span>Vào giải</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredProblems.length === 0 && (
              <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
                <HelpCircle className="h-10 w-10 text-slate-300 mx-auto" />
                <h3 className="text-sm font-bold text-slate-700">Không tìm thấy bài toán phù hợp</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Hãy thử thay đổi từ khóa tìm kiếm hoặc chọn lại cấp độ/chủ đề trên thanh lọc.
                </p>
                <button
                  onClick={() => { setSelectedLevel('all'); setSelectedTopic('all'); setSearchQuery(''); setStatusFilter('all'); }}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-xs hover:bg-indigo-700 transition-colors cursor-pointer"
                >
                  Xóa bộ lọc
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: WORKSPACE (SOLVER ENVIRONMENT) */}
        {activeSubTab === 'workspace' && (
          selectedProblem ? (
            <div className="h-full flex flex-col lg:flex-row overflow-hidden">
              {/* Left Column: Problem Details, Inputs/Outputs, Hints */}
              <div className="lg:w-1/2 flex flex-col border-r border-slate-200 bg-white overflow-hidden">
                {/* Workspace Top Toolbar */}
                <div className="p-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
                  <button
                    onClick={() => setActiveSubTab('bank')}
                    className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-2.5 py-1.5 rounded-lg shadow-xs transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    <span>Danh sách đề</span>
                  </button>

                  {/* Sub tabs: Statement / Sample Tests / Hint */}
                  <div className="flex items-center gap-1 bg-slate-200/70 p-0.5 rounded-lg text-xs font-semibold">
                    <button
                      onClick={() => setWorkspaceTab('statement')}
                      className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                        workspaceTab === 'statement' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Đề bài
                    </button>
                    <button
                      onClick={() => setWorkspaceTab('tests')}
                      className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                        workspaceTab === 'tests' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Test mẫu ({selectedProblem.sampleCases?.length || 0})
                    </button>
                    <button
                      onClick={() => setWorkspaceTab('hints')}
                      className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                        workspaceTab === 'hints' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Gợi ý giải
                    </button>
                  </div>

                  {/* Sổ tay & Ask AI button */}
                  <div className="flex items-center gap-1.5">
                    <a
                      href="/Sotay.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                      title="Mở Sổ tay tra cứu Python (Sotay.html) trong tab mới"
                    >
                      <BookOpen className="h-3.5 w-3.5 text-purple-600" />
                      <span className="hidden sm:inline">Sổ tay tra cứu</span>
                      <ExternalLink className="h-3 w-3 text-purple-500" />
                    </a>

                    <button
                      onClick={handleAskAiForProblem}
                      className="flex items-center gap-1.5 text-xs font-bold text-violet-700 bg-violet-50 hover:bg-violet-100 border border-violet-200 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                      title="Nhờ AI Gia sư giải thích hoặc gợi ý hướng đi"
                    >
                      <Sparkles className="h-3.5 w-3.5 text-violet-600" />
                      <span className="hidden sm:inline">Hỏi AI Tutor</span>
                    </button>
                  </div>
                </div>

                {/* Scrollable Problem Statement Content */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
                  {/* Header Info */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                          selectedProblem.level === 'primary'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                        }`}
                      >
                        {selectedProblem.level === 'primary' ? 'Tiểu học' : 'THCS'}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                          selectedProblem.difficulty === 'Dễ'
                            ? 'bg-green-100 text-green-800'
                            : selectedProblem.difficulty === 'Trung bình'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {selectedProblem.difficulty}
                      </span>
                      <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200 flex items-center gap-1">
                        <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                        +{selectedProblem.points} XP
                      </span>
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {selectedProblem.timeLimit || "1.0s"}
                      </span>
                      {selectedProblem.source && (
                        <span className="text-[11px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                          {selectedProblem.source}
                        </span>
                      )}
                    </div>

                    <h2 className="text-xl font-black text-slate-900 tracking-tight">
                      {selectedProblem.title}
                    </h2>
                  </div>

                  {workspaceTab === 'statement' && (
                    <div className="space-y-5 text-sm">
                      {/* Problem Description */}
                      <div className="space-y-2">
                        <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-slate-400">
                          Mô tả bài toán
                        </h4>
                        <div className="text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs sm:text-sm font-sans">
                          {selectedProblem.problemStatement}
                        </div>
                      </div>

                      {/* Input / Output Formats */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-100 space-y-1">
                          <span className="font-bold text-xs text-blue-900 flex items-center gap-1.5">
                            <Layers className="h-3.5 w-3.5 text-blue-600" /> Dữ liệu vào (Input)
                          </span>
                          <p className="text-xs text-blue-800 leading-relaxed whitespace-pre-line">
                            {selectedProblem.inputFormat}
                          </p>
                        </div>

                        <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-100 space-y-1">
                          <span className="font-bold text-xs text-emerald-900 flex items-center gap-1.5">
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Dữ liệu ra (Output)
                          </span>
                          <p className="text-xs text-emerald-800 leading-relaxed whitespace-pre-line">
                            {selectedProblem.outputFormat}
                          </p>
                        </div>
                      </div>

                      {/* Constraints */}
                      <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200 space-y-1">
                        <span className="font-bold text-xs text-amber-900 flex items-center gap-1.5">
                          <Info className="h-3.5 w-3.5 text-amber-600" /> Ràng buộc dữ liệu (Constraints)
                        </span>
                        <p className="text-xs text-amber-800 font-mono">
                          {selectedProblem.constraints}
                        </p>
                      </div>

                      {/* Sample Tests in Statement View */}
                      <div className="space-y-3">
                        <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-slate-400">
                          Ví dụ mẫu (Sample Cases)
                        </h4>
                        {(selectedProblem.sampleCases || []).map((sample, idx) => (
                          <div key={idx} className="rounded-xl border border-slate-200 overflow-hidden text-xs">
                            <div className="bg-slate-100 px-3 py-1.5 font-bold text-slate-700 border-b border-slate-200 flex items-center justify-between">
                              <span>Ví dụ {idx + 1}</span>
                              {sample.explanation && (
                                <span className="text-[11px] font-normal text-slate-500 italic">
                                  {sample.explanation}
                                </span>
                              )}
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 bg-white">
                              <div className="p-3">
                                <span className="font-bold text-[10px] text-slate-400 block uppercase mb-1">Input</span>
                                <pre className="font-mono bg-slate-50 p-2 rounded border border-slate-200 text-slate-800 whitespace-pre-wrap">{sample.input || "(rỗng)"}</pre>
                              </div>
                              <div className="p-3">
                                <span className="font-bold text-[10px] text-slate-400 block uppercase mb-1">Output mong đợi</span>
                                <pre className="font-mono bg-slate-50 p-2 rounded border border-slate-200 text-emerald-700 font-semibold whitespace-pre-wrap">{sample.output}</pre>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {workspaceTab === 'tests' && (
                    <div className="space-y-4 text-xs">
                      <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl text-indigo-900">
                        <strong>Kiểm thử bài toán:</strong> Dưới đây là các bộ test ví dụ được sử dụng để chạy thử mã nguồn trước khi nộp chính thức.
                      </div>
                      {(selectedProblem.sampleCases || []).map((sample, idx) => (
                        <div key={idx} className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
                          <div className="flex items-center justify-between font-bold text-slate-800">
                            <span>Bộ Test mẫu #{idx + 1}</span>
                            <button
                              onClick={() => {
                                setCustomInput(sample.input);
                                handleRunSample();
                              }}
                              className="px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                            >
                              <Play className="h-3 w-3" /> Nạp & Chạy test này
                            </button>
                          </div>
                          <div className="grid grid-cols-2 gap-2 font-mono">
                            <div className="p-2 bg-slate-50 rounded border border-slate-200">
                              <span className="text-[10px] font-sans font-bold text-slate-400 block">Input</span>
                              <span className="whitespace-pre-wrap">{sample.input || "(không có)"}</span>
                            </div>
                            <div className="p-2 bg-slate-50 rounded border border-slate-200">
                              <span className="text-[10px] font-sans font-bold text-slate-400 block">Expected Output</span>
                              <span className="text-emerald-700 font-bold whitespace-pre-wrap">{sample.output}</span>
                            </div>
                          </div>
                          {sample.explanation && (
                            <p className="text-slate-500 italic mt-1">{sample.explanation}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {workspaceTab === 'hints' && (
                    <div className="space-y-4 text-xs">
                      {(selectedProblem.hints || []).map((hint, idx) => (
                        <div key={idx} className="p-4 bg-amber-50 border border-amber-200 rounded-2xl space-y-2">
                          <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                            <Sparkles className="h-4 w-4 text-amber-600" />
                            <span>Gợi ý #{idx + 1}</span>
                          </div>
                          <p className="text-amber-800 leading-relaxed whitespace-pre-line">
                            {hint}
                          </p>
                        </div>
                      ))}

                      {selectedProblem.solutionExplanation && (
                        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-2">
                          <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                            <CheckCheck className="h-4 w-4 text-emerald-600" />
                            <span>Hướng dẫn thuật toán chi tiết</span>
                          </div>
                          <p className="text-emerald-800 leading-relaxed whitespace-pre-line">
                            {selectedProblem.solutionExplanation}
                          </p>
                        </div>
                      )}

                      <div className="p-4 bg-violet-50 border border-violet-200 rounded-2xl space-y-2">
                        <div className="flex items-center gap-2 text-violet-900 font-bold text-sm">
                          <GraduationCap className="h-4 w-4 text-violet-600" />
                          <span>Lời khuyên từ giáo viên</span>
                        </div>
                        <p className="text-violet-800 leading-relaxed">
                          Hãy đọc kỹ định dạng đầu vào (input), chú ý ép kiểu dữ liệu bằng <code>int()</code> hoặc <code>float()</code> khi nhập từ bàn phím. Sử dụng phương thức <code>split()</code> nếu đề bài nhập nhiều số trên cùng 1 dòng.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Code Editor & Execution Results */}
              <div className="lg:w-1/2 flex flex-col bg-slate-900 text-slate-100 overflow-hidden">
                {/* Code Editor Header */}
                <div className="p-2.5 bg-slate-800/90 border-b border-slate-700 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Code className="h-4 w-4 text-indigo-400" />
                    <span className="font-mono font-semibold text-slate-200">solution.py</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <a
                      href="/Sotay.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-purple-900/60 hover:bg-purple-800 text-purple-200 border border-purple-700/50 text-xs font-medium transition-colors cursor-pointer"
                      title="Mở Sổ tay tra cứu (Sotay.html) trong tab mới"
                    >
                      <BookOpen className="h-3 w-3 text-purple-400" />
                      <span>Sổ tay</span>
                      <ExternalLink className="h-3 w-3 text-purple-400" />
                    </a>

                    <button
                      onClick={() => handleCopyCode(userCode)}
                      className="p-1.5 rounded-md hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                      title="Sao chép mã nguồn"
                    >
                      {copiedCode ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                    </button>

                    <button
                      onClick={handleResetCode}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-medium transition-colors cursor-pointer"
                      title="Khôi phục lại mã mẫu ban đầu"
                    >
                      <RotateCcw className="h-3 w-3" />
                      <span>Mẫu gốc</span>
                    </button>
                  </div>
                </div>

                {/* Code Editor Area */}
                <div className="flex-1 relative bg-slate-950 p-4 font-mono text-xs overflow-auto">
                  <textarea
                    value={userCode}
                    onChange={(e) => setUserCode(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Tab') {
                        e.preventDefault();
                        const start = e.currentTarget.selectionStart;
                        const end = e.currentTarget.selectionEnd;
                        const newValue = userCode.substring(0, start) + '    ' + userCode.substring(end);
                        setUserCode(newValue);
                        setTimeout(() => {
                          e.currentTarget.selectionStart = e.currentTarget.selectionEnd = start + 4;
                        }, 0);
                      }
                    }}
                    className="w-full h-full bg-transparent text-emerald-400 focus:outline-none resize-none font-mono text-xs sm:text-sm leading-relaxed"
                    placeholder="# Nhập code Python của bạn tại đây..."
                    spellCheck={false}
                  />
                </div>

                {/* Execution & Custom Input Controls */}
                <div className="p-3 bg-slate-900 border-t border-slate-800 space-y-2">
                  {/* Custom Input preview */}
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-slate-400 font-semibold whitespace-nowrap">Input thử:</span>
                    <input
                      type="text"
                      value={customInput}
                      onChange={(e) => setCustomInput(e.target.value)}
                      placeholder="Dữ liệu đầu vào cho input()..."
                      className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1 text-slate-200 font-mono text-xs focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  {/* Actions: Run Sample & Submit */}
                  <div className="flex items-center justify-between gap-2 pt-1">
                    <button
                      onClick={handleRunSample}
                      disabled={isRunningSample || isSubmitting}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition-all disabled:opacity-50 cursor-pointer shadow-xs"
                    >
                      <Play className="h-4 w-4 text-emerald-400" />
                      <span>{isRunningSample ? "Đang chạy..." : "Chạy thử (Sample)"}</span>
                    </button>

                    <button
                      onClick={handleSubmitAndGrade}
                      disabled={isSubmitting || isRunningSample}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold transition-all disabled:opacity-50 cursor-pointer shadow-md shadow-emerald-600/30"
                    >
                      <Send className="h-4 w-4" />
                      <span>{isSubmitting ? "Đang chấm điểm..." : "Nộp bài & Chấm (Grade)"}</span>
                    </button>
                  </div>
                </div>

                {/* Result Drawer / Panel */}
                {(runResult || submissionOutcome) && (
                  <div className="max-h-64 overflow-y-auto bg-slate-900 border-t border-slate-800 p-4 space-y-3 animate-in fade-in text-xs font-mono">
                    {/* Single Run Result */}
                    {runResult && !submissionOutcome && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between font-sans">
                          <span className="font-bold text-slate-300">Kết quả chạy thử:</span>
                          <span className="text-[10px] text-slate-400">{runResult.executionTimeMs}ms</span>
                        </div>

                        {runResult.error ? (
                          <div className="p-3 bg-rose-950/70 border border-rose-800 rounded-xl text-rose-300 whitespace-pre-wrap">
                            {runResult.error}
                          </div>
                        ) : (
                          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-100 whitespace-pre-wrap">
                            {runResult.output || "(Không có dữ liệu xuất ra)"}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Submission Automated Grading Outcome */}
                    {submissionOutcome && (
                      <div className="space-y-3 font-sans">
                        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                          <div className="flex items-center gap-2">
                            {submissionOutcome.passed ? (
                              <div className="p-1.5 bg-emerald-500/20 text-emerald-400 rounded-lg">
                                <CheckCircle2 className="h-5 w-5" />
                              </div>
                            ) : (
                              <div className="p-1.5 bg-rose-500/20 text-rose-400 rounded-lg">
                                <XCircle className="h-5 w-5" />
                              </div>
                            )}
                            <div>
                              <span className={`font-bold text-sm ${submissionOutcome.passed ? 'text-emerald-400' : 'text-rose-400'}`}>
                                {submissionOutcome.passed ? 'ACCEPTED (Chấp nhận 100%)' : `WRONG ANSWER (${submissionOutcome.score}%)`}
                              </span>
                              <p className="text-xs text-slate-400 font-mono">
                                Vượt qua {submissionOutcome.passedTests}/{submissionOutcome.totalTests} test cases
                              </p>
                            </div>
                          </div>

                          <div className="text-right">
                            <span className="text-lg font-black text-amber-400">
                              {submissionOutcome.score}/100
                            </span>
                            <span className="text-[10px] block text-slate-400 font-mono">
                              {submissionOutcome.runtimeMs}ms
                            </span>
                          </div>
                        </div>

                        {/* Test case breakdown list */}
                        <div className="space-y-1.5 font-mono text-xs">
                          {submissionOutcome.testResults?.map((t: any, idx: number) => (
                            <div
                              key={t.testId || idx}
                              className={`p-2.5 rounded-lg border flex items-center justify-between ${
                                t.passed
                                  ? 'bg-emerald-950/40 border-emerald-900/60 text-emerald-300'
                                  : 'bg-rose-950/40 border-rose-900/60 text-rose-300'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span>{t.passed ? '✓' : '✗'} Test #{idx + 1} {t.isHidden ? '(Ẩn)' : ''}</span>
                              </div>
                              <span>{t.executionTimeMs}ms</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-3 m-6">
              <BookOpen className="h-10 w-10 text-slate-300 mx-auto" />
              <h3 className="text-sm font-bold text-slate-700">Chưa chọn bài toán nào</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Vui lòng chọn một đề bài từ Ngân hàng đề để bắt đầu luyện tập giải thuật toán.
              </p>
              <button
                onClick={() => setActiveSubTab('bank')}
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-xs hover:bg-indigo-700 transition-colors cursor-pointer"
              >
                Đến ngân hàng đề
              </button>
            </div>
          )
        )}

        {/* TAB 3: MY SOLUTIONS (LỊCH SỬ BÀI GIẢI ĐÃ LÀM) */}
        {activeSubTab === 'solutions' && (
          <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
            {/* Header & Stats Banner */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center gap-1">
                    <History className="h-3.5 w-3.5" /> Lịch sử nộp bài
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  My Solutions - Bài Giải Của Tôi
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Xem lại toàn bộ mã nguồn các bài giải thuật toán đã thực hiện
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-center px-4 py-2 bg-slate-50 border border-slate-200 rounded-2xl">
                  <span className="text-xl font-black text-emerald-600 block">{userSolvedCount}</span>
                  <span className="text-[11px] font-semibold text-slate-500">Bài đã giải</span>
                </div>
                <div className="text-center px-4 py-2 bg-slate-50 border border-slate-200 rounded-2xl">
                  <span className="text-xl font-black text-indigo-600 block">{algorithmSubmissions.length}</span>
                  <span className="text-[11px] font-semibold text-slate-500">Lần nộp bài</span>
                </div>
              </div>
            </div>

            {/* Submissions List */}
            {algorithmSubmissions.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
                <History className="h-10 w-10 text-slate-300 mx-auto" />
                <h3 className="text-sm font-bold text-slate-700">Chưa có bài giải nào được nộp</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Hãy vào Ngân hàng đề, chọn một bài toán thuộc cấp độ Tiểu học hoặc THCS để bắt đầu luyện tập!
                </p>
                <button
                  onClick={() => setActiveSubTab('bank')}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-xs hover:bg-indigo-700 transition-colors cursor-pointer"
                >
                  Đến ngân hàng đề
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden divide-y divide-slate-100">
                {algorithmSubmissions.map((sub) => (
                  <div key={sub.id} className="p-4 sm:p-5 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                            sub.level === 'primary'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                          }`}
                        >
                          {sub.level === 'primary' ? 'Tiểu học' : 'THCS'}
                        </span>
                        <h4 className="font-bold text-slate-900 text-sm">{sub.problemTitle}</h4>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span>Thời gian: {sub.timestamp}</span>
                        <span>•</span>
                        <span>Thời gian chạy: {sub.runtimeMs}ms</span>
                        <span>•</span>
                        <span>Test passed: {sub.passedTests}/{sub.totalTests}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Score Badge */}
                      <span
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 ${
                          sub.passed
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}
                      >
                        {sub.passed ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                        <span>{sub.passed ? 'Đạt 100%' : `${sub.score}%`}</span>
                      </span>

                      {/* View Code Button */}
                      <button
                        onClick={() => setViewingSolutionCode(sub)}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <Code className="h-3.5 w-3.5" />
                        <span>Xem code</span>
                      </button>

                      {/* Open in solver button */}
                      <button
                        onClick={() => {
                          const prob = algorithmProblems.find(p => p.id === sub.problemId);
                          if (prob) {
                            setSelectedProblem(prob);
                            setUserCode(sub.code);
                            setActiveSubTab('workspace');
                          }
                        }}
                        className="p-1.5 rounded-xl hover:bg-indigo-50 text-indigo-600 border border-indigo-200 transition-colors cursor-pointer"
                        title="Mở lại trong trình giải đề"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: ALGORITHM LEADERBOARD (BẢNG XẾP HẠNG THUẬT TOÁN) */}
        {activeSubTab === 'leaderboard' && (
          <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
            {/* Leaderboard Header Banner */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1">
                    <Trophy className="h-3.5 w-3.5 text-amber-500" /> Bảng Vinh Danh Giải Đề
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Bảng Xếp Hạng Thuật Toán Python
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Xếp hạng theo tổng điểm giải thuật toán, số bài hoàn thành và độ chính xác
                </p>
              </div>

              {/* Search in Leaderboard */}
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Tìm thí sinh..."
                  value={leaderboardSearch}
                  onChange={(e) => setLeaderboardSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            {/* Top 3 Podium Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {filteredLeaderboard.slice(0, 3).map((entry, idx) => {
                const isTop1 = idx === 0;
                const isTop2 = idx === 1;
                const isTop3 = idx === 2;

                return (
                  <div
                    key={entry.userId}
                    className={`p-5 rounded-3xl border-2 flex flex-col justify-between relative overflow-hidden transition-all ${
                      isTop1
                        ? 'bg-gradient-to-b from-amber-50 to-white border-amber-300 shadow-md shadow-amber-500/10'
                        : isTop2
                        ? 'bg-gradient-to-b from-slate-50 to-white border-slate-300 shadow-xs'
                        : 'bg-gradient-to-b from-orange-50/50 to-white border-amber-200 shadow-xs'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`h-8 w-8 rounded-xl font-black text-sm flex items-center justify-center shadow-xs ${
                          isTop1
                            ? 'bg-amber-400 text-white'
                            : isTop2
                            ? 'bg-slate-300 text-slate-800'
                            : 'bg-amber-600 text-white'
                        }`}
                      >
                        #{entry.rank}
                      </span>

                      <div className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-white px-2.5 py-1 rounded-xl border border-amber-200">
                        <Trophy className="h-3.5 w-3.5 text-amber-500" />
                        <span>{entry.totalScore} Điểm</span>
                      </div>
                    </div>

                    <div className="my-4 text-center space-y-1.5">
                      <img
                        src={entry.avatar}
                        alt={entry.fullName}
                        className="h-16 w-16 rounded-full mx-auto border-2 border-white shadow-md bg-indigo-50"
                      />
                      <h4 className="font-black text-slate-900 text-base">
                        {entry.fullName} {entry.isCurrentUser && "(Bạn)"}
                      </h4>
                      <p className="text-xs text-slate-500">@{entry.username} • {entry.grade}</p>
                    </div>

                    <div className="grid grid-cols-3 gap-2 p-2.5 rounded-2xl bg-white border border-slate-100 text-center text-[11px]">
                      <div>
                        <span className="font-black text-slate-800 block">{entry.solvedCount}</span>
                        <span className="text-slate-400 text-[10px]">Đã giải</span>
                      </div>
                      <div>
                        <span className="font-black text-emerald-600 block">{entry.primarySolved}</span>
                        <span className="text-slate-400 text-[10px]">Tiểu học</span>
                      </div>
                      <div>
                        <span className="font-black text-indigo-600 block">{entry.secondarySolved}</span>
                        <span className="text-slate-400 text-[10px]">THCS</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Rest of Leaderboard Table */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-400 uppercase font-semibold text-[10px] border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4 text-center">Hạng</th>
                      <th className="py-3 px-4">Thí sinh</th>
                      <th className="py-3 px-4 text-center">Tiểu học</th>
                      <th className="py-3 px-4 text-center">THCS</th>
                      <th className="py-3 px-4 text-center">Tổng bài giải</th>
                      <th className="py-3 px-4 text-center">Độ chính xác</th>
                      <th className="py-3 px-4 text-right">Tổng điểm</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredLeaderboard.map((entry) => (
                      <tr
                        key={entry.userId}
                        className={`hover:bg-slate-50/80 transition-colors ${
                          entry.isCurrentUser ? 'bg-indigo-50/50 font-semibold' : ''
                        }`}
                      >
                        <td className="py-3 px-4 text-center">
                          <span
                            className={`inline-flex items-center justify-center h-6 w-6 rounded-lg text-xs font-bold ${
                              entry.rank === 1
                                ? 'bg-amber-100 text-amber-800'
                                : entry.rank === 2
                                ? 'bg-slate-200 text-slate-700'
                                : entry.rank === 3
                                ? 'bg-amber-50 text-amber-700'
                                : 'text-slate-500'
                            }`}
                          >
                            {entry.rank}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={entry.avatar}
                              alt={entry.fullName}
                              className="h-7 w-7 rounded-full bg-indigo-50"
                            />
                            <div>
                              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                                <span>{entry.fullName}</span>
                                {entry.isCurrentUser && (
                                  <span className="px-1.5 py-0.2 text-[9px] font-bold bg-indigo-600 text-white rounded">
                                    Bạn
                                  </span>
                                )}
                              </div>
                              <span className="text-[11px] text-slate-400">@{entry.username} • {entry.grade}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-center font-semibold text-emerald-700">{entry.primarySolved}</td>
                        <td className="py-3 px-4 text-center font-semibold text-indigo-700">{entry.secondarySolved}</td>
                        <td className="py-3 px-4 text-center font-bold text-slate-800">{entry.solvedCount} bài</td>
                        <td className="py-3 px-4 text-center font-mono font-semibold text-slate-600">{entry.accuracy}%</td>
                        <td className="py-3 px-4 text-right font-black text-amber-600 text-sm">
                          {entry.totalScore} XP
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Code Viewer Modal */}
      {viewingSolutionCode && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 text-slate-100 rounded-3xl max-w-2xl w-full border border-slate-800 overflow-hidden shadow-2xl animate-in fade-in zoom-in-95">
            <div className="p-4 bg-slate-800/90 border-b border-slate-700 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-slate-100">{viewingSolutionCode.problemTitle}</h3>
                <span className="text-xs text-slate-400">Thời gian nộp: {viewingSolutionCode.timestamp}</span>
              </div>
              <button
                onClick={() => setViewingSolutionCode(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="p-4 bg-slate-950 font-mono text-xs max-h-96 overflow-y-auto">
              <pre className="text-emerald-400 whitespace-pre-wrap">{viewingSolutionCode.code}</pre>
            </div>
            <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center justify-end gap-2 text-xs">
              <button
                onClick={() => handleCopyCode(viewingSolutionCode.code)}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold cursor-pointer flex items-center gap-1.5"
              >
                <Copy className="h-3.5 w-3.5" />
                <span>Sao chép mã</span>
              </button>
              <button
                onClick={() => setViewingSolutionCode(null)}
                className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
