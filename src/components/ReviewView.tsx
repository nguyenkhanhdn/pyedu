import React, { useEffect, useMemo, useRef, useState } from "react";
import { BookOpen, Download, Maximize2, Minimize2 } from "lucide-react";
import { useApp } from "../context/AppContext";
import { REVIEW_SECTIONS } from "../data/reviewData";
import { appendReviewAttempt, gradeReviewAnswer, latestReviewAttempts, readReviewState, reviewReport, reviewSummary, saveReviewState, type ReviewAttempt } from "../utils/reviewPractice";
import { startReviewGrading, type ReviewTestResult } from "../utils/reviewGrader";
import { CodeEditor } from "./CodeEditor";
import { CodeBlock } from "./CodeBlock";

export const ReviewView: React.FC = () => {
  const { currentUser } = useApp();
  return currentUser ? <ReviewWorkspace key={currentUser.id} user={currentUser} /> : null;
};

const ReviewWorkspace: React.FC<{ user: { id: string; fullName: string; username: string; grade?: string } }> = ({ user }) => {
  const [state, setState] = useState(() => readReviewState(user.id));
  const [sectionId, setSectionId] = useState(REVIEW_SECTIONS[0].id);
  const [exerciseId, setExerciseId] = useState(REVIEW_SECTIONS[0].exercises[0].id);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [storageError, setStorageError] = useState(false);
  const [large, setLarge] = useState(false);
  const [results, setResults] = useState<ReviewTestResult[] | null>(null);
  const job = useRef<ReturnType<typeof startReviewGrading> | null>(null);
  const alive = useRef(true);
  const editorPanel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!large) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    editorPanel.current?.querySelector<HTMLButtonElement>("button")?.focus();
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLarge(false);
      if (event.key !== "Tab") return;
      const items = Array.from(editorPanel.current?.querySelectorAll("button:not(:disabled), textarea, input:not(:disabled)") || []) as HTMLElement[];
      const first = items[0], last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener("keydown", keydown);
    return () => { document.body.style.overflow = overflow; document.removeEventListener("keydown", keydown); previousFocus?.focus(); };
  }, [large]);
  useEffect(() => { alive.current = true; return () => { alive.current = false; job.current?.cancel(); }; }, []);
  useEffect(() => { setStorageError(!saveReviewState(user.id, state)); }, [state, user.id]);
  const section = REVIEW_SECTIONS.find(s => s.id === sectionId)!;
  const exercise = section.exercises.find(e => e.id === exerciseId)!;
  const answer = state.drafts[exercise.id] ?? (exercise.kind === "code" ? exercise.starterCode : "");
  const latest = useMemo(() => latestReviewAttempts(state.attempts), [state.attempts]);
  const previous = latest.get(exercise.id);
  const summary = reviewSummary(section.exercises, state.attempts);
  const select = (sid: string, eid: string) => { if (busy) return; setSectionId(sid); setExerciseId(eid); setResults(null); setError(""); setStatus(""); setLarge(false); };
  const setAnswer = (value: string) => { setState(s => ({ ...s, drafts: { ...s.drafts, [exercise.id]: value } })); setResults(null); };
  const grade = async () => {
    if (busy || !answer.trim()) return;
    setBusy(true); setError(""); setResults(null);
    try {
      let result: { score: number; passedTests: number; totalTests: number };
      if (exercise.kind === "answer") result = gradeReviewAnswer(exercise, answer);
      else {
        job.current = startReviewGrading(answer, exercise.tests, message => { if (alive.current) setStatus(message); });
        const rows = await job.current.result;
        if (!alive.current) return;
        setResults(rows);
        const passedTests = rows.filter(row => row.passed).length;
        result = { score: Math.round(passedTests / rows.length * 100), passedTests, totalTests: rows.length };
      }
      if (!alive.current) return;
      const attempt: ReviewAttempt = { id: crypto.randomUUID(), exerciseId: exercise.id, answer, ...result, timestamp: new Date().toISOString() };
      setState(s => ({ drafts: s.drafts, attempts: appendReviewAttempt(s.attempts, attempt) }));
      setStatus("Đã chấm bài. Kết quả thuộc riêng phần Ôn tập.");
    } catch (err) {
      if (alive.current) {
        setError(err instanceof Error ? err.message : "Không chấm được bài. Hãy thử lại.");
        if (err instanceof Error && "code" in err && err.code === "REVIEW_TIMEOUT" && exercise.kind === "code") {
          const attempt: ReviewAttempt = { id: crypto.randomUUID(), exerciseId: exercise.id, answer, score: 0, passedTests: 0, totalTests: exercise.tests.length, timestamp: new Date().toISOString() };
          setState(s => ({ drafts: s.drafts, attempts: appendReviewAttempt(s.attempts, attempt) }));
          setStatus("Bài vượt giới hạn thời gian: 0/100. Hãy kiểm tra vòng lặp.");
        }
      }
    }
    finally { if (alive.current) { setBusy(false); job.current = null; } }
  };
  const download = () => {
    const url = URL.createObjectURL(new Blob([reviewReport(user, state.attempts)], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a"); link.href = url; link.download = "ket-qua-on-tap.csv"; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  return <div className="flex-1 bg-slate-50 p-4 sm:p-6 space-y-5 text-slate-800">
    <header className="max-w-7xl mx-auto rounded-2xl bg-white border border-slate-200 p-5 flex flex-wrap items-start gap-4">
      <BookOpen className="h-7 w-7 text-indigo-600" />
      <div className="flex-1 min-w-48"><h1 className="text-xl font-bold">Ôn tập & củng cố kiến thức</h1>
        <p className="text-sm text-slate-600 mt-1">24 câu hỏi và bài tập mới · 3 phần luôn mở · Làm trực tiếp, chấm ngay.</p>
        <p className="text-xs text-slate-500 mt-2">Kết quả ôn tập độc lập với tiến độ và XP. Bài làm được lưu trên trình duyệt hiện tại theo tài khoản; xuất kết quả để gửi giáo viên. Chưa đồng bộ kết quả ôn tập lên máy chủ.</p>
      </div>
      <button type="button" onClick={download} className="inline-flex items-center gap-2 rounded-xl bg-indigo-50 text-indigo-700 px-3 py-2 text-sm font-semibold"><Download className="h-4 w-4" />Xuất kết quả CSV</button>
    </header>
    {storageError && <p role="alert" className="max-w-7xl mx-auto rounded-xl bg-amber-50 text-amber-900 p-3 text-sm">Trình duyệt không lưu được bài làm. Hãy xuất kết quả trước khi rời trang.</p>}
    <div className="max-w-7xl mx-auto grid gap-3 md:grid-cols-3">{REVIEW_SECTIONS.map(s => {
      const stats = reviewSummary(s.exercises, state.attempts);
      return <button key={s.id} type="button" disabled={busy} aria-pressed={sectionId === s.id} onClick={() => select(s.id, s.exercises[0].id)} className={`text-left rounded-2xl border p-4 disabled:opacity-60 ${sectionId === s.id ? "bg-indigo-600 text-white border-indigo-600" : "bg-white border-slate-200"}`}>
        <h2 className="font-bold">{s.title}</h2><p className="text-sm mt-1">{s.description}</p><p className="text-xs mt-3">Đã chấm {stats.done}/{s.exercises.length} · Đạt trọn vẹn {stats.passed} · {stats.score}/100</p>
      </button>;
    })}</div>
    <div className="max-w-7xl mx-auto grid gap-5 lg:grid-cols-[260px_minmax(0,1fr)]">
      <aside className="space-y-3">
        <details className="rounded-2xl bg-white border border-slate-200 p-4"><summary className="font-semibold cursor-pointer">Kiến thức cần nhớ</summary><ul className="list-disc pl-5 space-y-2 text-sm mt-3">{section.knowledge.map(text => <li key={text}>{text}</li>)}</ul></details>
        <nav aria-label="Danh sách bài ôn tập" className="rounded-2xl bg-white border border-slate-200 p-2 space-y-1">{section.exercises.map((e, index) => <button key={e.id} type="button" disabled={busy} aria-current={e.id === exercise.id ? "step" : undefined} onClick={() => select(section.id, e.id)} className={`w-full text-left px-3 py-3 rounded-xl text-sm disabled:opacity-60 ${e.id === exercise.id ? "bg-indigo-50 text-indigo-800" : "hover:bg-slate-50"}`}>
          <span className="font-semibold">{index + 1}. {e.title}</span><span className="block text-xs mt-1 text-slate-500">{e.kind === "answer" ? "Đọc hiểu mã" : "Lập trình ứng dụng"} · {latest.has(e.id) ? `${latest.get(e.id)!.score}/100` : "Chưa làm"}</span>
        </button>)}</nav>
        <p className="text-xs text-slate-500">Điểm phần: trung bình của 8 bài, lấy lần chấm gần nhất; bài chưa làm tính 0. Hiện tại {summary.score}/100.</p>
      </aside>
      <article className="min-w-0 space-y-4">
        <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-3">
          <span className="text-xs font-semibold text-indigo-600">{section.title} · {exercise.kind === "answer" ? "Đọc hiểu mã" : "Lập trình ứng dụng"}</span>
          <h3 className="text-lg font-bold">{exercise.title}</h3><p className="text-sm leading-6 whitespace-pre-wrap">{exercise.prompt}</p>
          {exercise.kind === "answer" ? <CodeBlock code={exercise.snippet} title="Đọc mã và trả lời" /> : <>
            <div className="grid gap-3 sm:grid-cols-2 text-sm"><div><h4 className="font-semibold">Dữ liệu vào & giới hạn</h4><p className="mt-1">{exercise.inputFormat}</p></div><div><h4 className="font-semibold">Kết quả cần in</h4><p className="mt-1">{exercise.outputFormat}</p></div></div>
            <div className="grid gap-3 sm:grid-cols-2">{exercise.tests.filter(t => !t.isHidden).map((t, i) => <div key={t.id} className="rounded-xl bg-slate-50 p-3 text-xs space-y-2"><h4 className="font-semibold">Ví dụ {i + 1}</h4><p>Input</p><pre className="overflow-auto whitespace-pre-wrap">{t.input}</pre><p>Output</p><pre className="overflow-auto whitespace-pre-wrap">{t.expectedOutput}</pre></div>)}</div>
          </>}
        </div>
        <div ref={editorPanel} role={large ? "dialog" : undefined} aria-modal={large || undefined} aria-label="Trình soạn thảo ôn tập" className={`${large ? "fixed inset-3 z-50 shadow-2xl flex flex-col" : "relative"} rounded-2xl bg-white border border-slate-200 overflow-hidden`}>
          <div className="flex justify-between items-center px-4 py-3 border-b border-slate-100"><h4 className="font-semibold">Bài làm của bạn</h4>{exercise.kind === "code" && <button type="button" onClick={() => setLarge(value => !value)} aria-label={large ? "Thu nhỏ trình soạn thảo" : "Mở rộng trình soạn thảo"} className="p-2 rounded-lg hover:bg-slate-100">{large ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}</button>}</div>
          {exercise.kind === "answer" ? <div className="p-4"><label htmlFor="review-answer" className="block text-sm mb-2">Nhập kết quả đoạn mã</label><input id="review-answer" autoComplete="off" disabled={busy} value={answer} onChange={e => setAnswer(e.target.value)} className="w-full rounded-xl border border-slate-300 p-3 font-mono" placeholder="Kết quả được in ra..." /></div> : <div className={`relative ${large ? "flex-1 min-h-0" : "h-96"}`} aria-label="Mã Python ôn tập"><CodeEditor ariaLabel="Mã Python ôn tập" value={answer} onChange={value => { if (!busy) setAnswer(value); }} lineNumbers /></div>}
          <div className="p-4 flex flex-wrap items-center gap-3">
            <button type="button" disabled={busy || !answer.trim()} onClick={grade} className="rounded-xl bg-indigo-600 px-5 py-2 text-white font-semibold text-sm disabled:opacity-50">{busy ? "Đang chấm..." : "Nộp bài & chấm ngay"}</button>
            {busy && <button type="button" onClick={() => job.current?.cancel()} className="rounded-xl bg-rose-50 text-rose-700 px-3 py-2 text-sm">Dừng chấm</button>}
            {status && <p role="status" aria-live="polite" className="text-xs text-slate-500">{status}</p>}
          </div>
          {error && <p role="alert" className="px-4 pb-4 text-sm text-rose-700">{error}</p>}
        </div>
        {previous && <section aria-label="Kết quả ôn tập" className={`rounded-2xl border p-5 space-y-3 ${previous.score === 100 ? "bg-emerald-50 border-emerald-200" : "bg-amber-50 border-amber-200"}`}>
          <h4 className="font-bold">{previous.score === 100 ? "Đúng / Đạt toàn bộ" : "Chưa đạt toàn bộ"} · {previous.score}/100</h4>
          <p className="text-xs">Lần chấm gần nhất: {new Date(previous.timestamp).toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" })} (VN) · {previous.passedTests}/{previous.totalTests} {exercise.kind === "code" ? "test đạt" : "câu đúng"}.</p>
          {answer !== previous.answer && <p className="text-xs font-semibold">Bạn đã sửa bài sau lần chấm này. Nộp lại để chấm bản đang viết.</p>}
          {exercise.kind === "answer" && <p className="text-sm">Giải thích: {exercise.explanation}</p>}
          {exercise.kind === "code" && results && <div className="space-y-2">{results.map((result, i) => <details key={result.testId} className="rounded-lg bg-white/70 p-3 text-xs"><summary className="cursor-pointer font-semibold">Test {i + 1}{exercise.tests[i].isHidden ? " (ẩn)" : ""}: {result.passed ? "Đạt" : "Chưa đạt"}</summary>{!exercise.tests[i].isHidden && <div className="mt-2 space-y-2"><p>Kết quả thực tế:</p><pre className="whitespace-pre-wrap break-all">{result.actualOutput || "(Trống)"}</pre><p>Kết quả mong đợi:</p><pre className="whitespace-pre-wrap">{exercise.tests[i].expectedOutput}</pre>{result.error && <pre className="whitespace-pre-wrap break-all text-rose-700">{result.error}</pre>}</div>}{exercise.tests[i].isHidden && <p className="mt-2">Dữ liệu kiểm tra ẩn không hiển thị. Hãy kiểm tra các giá trị biên và quy tắc trong đề.</p>}</details>)}</div>}
          <details className="text-sm"><summary className="cursor-pointer font-semibold">Xem bài làm đã chấm</summary><pre className="whitespace-pre-wrap break-all mt-2">{previous.answer}</pre></details>
        </section>}
      </article>
    </div>
  </div>;
};
