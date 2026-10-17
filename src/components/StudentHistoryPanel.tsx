import React, { useEffect, useMemo, useRef, useState } from "react";
import { useApp } from "../context/AppContext";
import { ApiService } from "../services/apiClient";
import { StudentActivity } from "../utils/practiceStats";
import { TestResultDetail, User } from "../types";
import { CodeBlock } from "./CodeBlock";

export const StudentHistoryPanel: React.FC<{ student: User; onClose?: () => void }> = ({ student, onClose }) => {
  const { currentUser, modules, algorithmProblems } = useApp();
  const [events, setEvents] = useState<StudentActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const [count, setCount] = useState(30);
  const [revision, setRevision] = useState(0);
  const request = useRef(0);
  const panel = useRef<HTMLElement>(null);
  const titles = useMemo(() => {
    const map = new Map<string, string>();
    for (const module of modules) for (const lesson of module.lessons) {
      map.set(lesson.id, lesson.title);
      (lesson.practices?.length ? lesson.practices : [lesson.practice]).forEach((practice, index) => map.set(`${lesson.id}_p${index}`, `${lesson.title} · ${practice.title}`));
    }
    for (const problem of algorithmProblems) map.set(problem.id, problem.title);
    return map;
  }, [modules, algorithmProblems]);

  useEffect(() => {
    const seq = ++request.current;
    setLoading(true); setError("");
    ApiService.fetchStudentHistory(student.id, currentUser).then(rows => {
      if (seq === request.current) setEvents(rows);
    }).catch(err => {
      if (seq === request.current) setError(err.message || "Không tải được lịch sử học sinh.");
    }).finally(() => { if (seq === request.current) setLoading(false); });
    return () => { request.current++; };
  }, [student.id, currentUser?.id, revision]);

  useEffect(() => {
    panel.current?.scrollIntoView?.({ block: "nearest" });
    const refresh = () => { if (document.visibilityState === "visible") setRevision(value => value + 1); };
    const timer = window.setInterval(refresh, 60000);
    window.addEventListener("focus", refresh);
    return () => { window.clearInterval(timer); window.removeEventListener("focus", refresh); };
  }, []);

  const filtered = events.filter(event => filter === "all" || event.kind === filter);
  return (
    <section ref={panel} aria-label={`Lịch sử của ${student.fullName}`} className="rounded-2xl bg-white border border-indigo-200 overflow-hidden">
      <div className="p-4 border-b border-slate-100 flex flex-wrap items-center gap-3">
        <div className="mr-auto">
          <h3 className="font-bold text-slate-900">Lịch sử học & nộp bài · {student.fullName}</h3>
          <p className="text-xs text-slate-500">@{student.username} · {student.grade} · Tất cả thời gian, mới nhất trước</p>
        </div>
        <select aria-label="Lọc loại lịch sử" value={filter} onChange={event => { setFilter(event.target.value); setCount(30); }} className="border border-slate-200 rounded-lg p-2 text-xs">
          <option value="all">Bài học & Giải đề</option><option value="lesson">Bài học</option><option value="algo">Giải đề</option>
        </select>
        <button type="button" disabled={loading} onClick={() => setRevision(value => value + 1)} className="rounded-lg bg-indigo-50 p-2 text-xs font-semibold text-indigo-700 disabled:opacity-50">Tải lại lịch sử</button>
        {onClose && <button type="button" onClick={onClose} className="rounded-lg p-2 text-xs text-slate-600">Đóng lịch sử</button>}
      </div>
      {error && <p role="alert" className="p-4 bg-amber-50 text-amber-900 text-sm">{error} Dữ liệu cũ (nếu có) chưa được cập nhật.</p>}
      {loading && <p role="status" className="p-4 text-sm text-slate-500">Đang tải lịch sử đồng bộ...</p>}
      {!loading && !error && !filtered.length && <p className="p-6 text-sm text-slate-500">Chưa có lịch sử được đồng bộ cho học sinh này.</p>}
      <div className="divide-y divide-slate-100">
        {filtered.slice(0, count).map(event => (
          <article key={`${event.kind}:${event.id}`} className="p-4 space-y-2">
            <div className="flex flex-wrap items-start gap-2 text-xs">
              <time dateTime={new Date(event.ts).toISOString()} className="font-medium text-slate-500">{new Date(event.ts).toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" })} (VN)</time>
              <span className="ml-auto text-slate-500">{event.type === "completion" ? "Hoàn thành bài học" : event.kind === "lesson" ? "Nộp bài học" : "Nộp Giải đề"}</span>
            </div>
            <h4 className="text-sm font-semibold text-slate-900">{titles.get(event.practiceKey || event.itemId) || event.title || titles.get(event.itemId) || event.itemId}</h4>
            <p className={`text-xs ${event.ok ? "text-emerald-700" : "text-rose-700"}`}>
              {event.ok ? "Đạt" : "Chưa đạt"} · {event.score}/100 điểm
              {event.type === "submission" && ` · ${event.passedTests ?? 0}/${event.totalTests ?? 0} test · ${event.runtimeMs ?? 0} ms`}
            </p>
            {event.type === "submission" && <SubmissionDetail key={`${student.id}:${event.kind}:${event.id}`} studentId={student.id} event={event} />}
          </article>
        ))}
      </div>
      {count < filtered.length && <button type="button" onClick={() => setCount(value => value + 30)} className="w-full p-3 text-sm font-semibold text-indigo-700 bg-indigo-50">Xem thêm ({Math.min(count, filtered.length)}/{filtered.length})</button>}
      <p className="p-3 text-xs text-slate-500 border-t border-slate-100">Mốc hoàn thành là thời điểm hoàn thành gần nhất được lưu cho từng bài học. Danh sách nộp bài giữ từng lần nộp riêng biệt.</p>
    </section>
  );
};

const SubmissionDetail: React.FC<{ studentId: string; event: StudentActivity }> = ({ studentId, event }) => {
  const { currentUser } = useApp();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [detail, setDetail] = useState<{ code: string | null; testResults: TestResultDetail[] } | null>(null);
  const alive = useRef(true);
  useEffect(() => { alive.current = true; return () => { alive.current = false; }; }, []);
  const load = async () => {
    setOpen(true);
    if (loading || detail) return;
    setLoading(true); setError("");
    try {
      const result = await ApiService.fetchStudentSubmissionDetail(studentId, event.kind, event.id, currentUser);
      if (alive.current) setDetail(result);
    } catch (err) { if (alive.current) setError(err instanceof Error ? err.message : "Không tải được chi tiết."); }
    finally { if (alive.current) setLoading(false); }
  };
  return (
    <div className="space-y-2">
      <button type="button" aria-expanded={open} onClick={() => open ? setOpen(false) : void load()} className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700">{open ? "Thu gọn chi tiết" : "Xem mã & kết quả từng test"}</button>
      {open && <div className="space-y-3 rounded-xl border border-slate-200 p-3">
        {loading && <p role="status" className="text-xs text-slate-500">Đang tải chi tiết...</p>}
        {error && <p role="alert" className="text-xs text-rose-700">{error} <button type="button" onClick={load} className="underline">Thử lại</button></p>}
        {detail && <>
          {detail.code != null ? <CodeBlock code={detail.code} title="Mã nguồn tại thời điểm nộp" /> : <p className="text-xs text-slate-500">Lượt nộp cũ chưa lưu mã nguồn tại thời điểm nộp.</p>}
          {!detail.testResults.length && <p className="text-xs text-slate-500">Lượt nộp này không có chi tiết từng test.</p>}
          {detail.testResults.map((test, index) => <details key={`${test.testId}:${index}`} className="rounded-lg bg-slate-50 border border-slate-200 p-2 text-xs">
            <summary className="cursor-pointer font-medium">Test {index + 1} · {test.passed ? "Đạt" : "Chưa đạt"} · {test.executionTimeMs || 0} ms {test.isHidden ? "· Test ẩn" : ""}</summary>
            <div className="mt-2 grid gap-2 sm:grid-cols-3">
              {[["Input", test.input], ["Kết quả mong đợi", test.expectedOutput], ["Kết quả thực tế", test.actualOutput]].map(([label, value]) => <div key={label}><p className="font-semibold">{label}</p><pre className="whitespace-pre-wrap break-all bg-white rounded p-2">{value || "(Trống)"}</pre></div>)}
            </div>
            {test.errorMessage && <pre className="mt-2 text-rose-700 whitespace-pre-wrap break-all">{test.errorMessage}</pre>}
          </details>)}
        </>}
      </div>}
    </div>
  );
};
