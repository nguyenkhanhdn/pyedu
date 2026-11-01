import React, { useMemo, useRef, useState } from "react";
import { useApp } from "../context/AppContext";
import { ApiService } from "../services/apiClient";
import { useLiveRefresh } from "../hooks/useLiveRefresh";
import { buildTopicProgress } from "../utils/topicProgress";
import type { StudentActivity } from "../utils/practiceStats";
import { StudentHistoryPanel } from "./StudentHistoryPanel";

export const ClassTopicProgress: React.FC = () => {
  const { allUsers, modules, currentUser, classActivityVersion } = useApp();
  const [events, setEvents] = useState<StudentActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [loadedAt, setLoadedAt] = useState<Date | null>(null);
  const [query, setQuery] = useState("");
  const [grade, setGrade] = useState("all");
  const [topic, setTopic] = useState("all");
  const [helpOnly, setHelpOnly] = useState(false);
  const [detailId, setDetailId] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const request = useRef(0);
  const load = async () => {
    const seq = ++request.current;
    setLoading(true); setError("");
    try {
      const rows = await ApiService.fetchClassTopicActivities(currentUser);
      if (seq === request.current) { setEvents(rows); setLoadedAt(new Date()); }
    } catch (err) {
      if (seq === request.current) setError(err instanceof Error ? err.message : "Không tải được tiến độ lớp.");
    } finally { if (seq === request.current) setLoading(false); }
  };
  const reload = useLiveRefresh(load, classActivityVersion, `${currentUser?.id}:${currentUser?.role}:${currentUser?.status}`, () => { request.current++; });
  const students = useMemo(() => allUsers.filter(user => user.role === "student" && (!user.status || user.status === "active") && !ApiService.isUserDeleted(user.id, user.username, user.email, user.fullName)), [allUsers]);
  const rows = useMemo(() => buildTopicProgress(modules, students, events), [modules, students, events]);
  const grades = Array.from(new Set(students.map(user => user.grade).filter(Boolean))).sort();
  const visible = rows.filter(row => {
    const q = query.trim().toLocaleLowerCase("vi");
    return (!q || `${row.user.fullName} ${row.user.username}`.toLocaleLowerCase("vi").includes(q))
      && (grade === "all" || row.user.grade === grade)
      && (topic === "all" || (row.recentLesson?.topic.id || row.next?.moduleId) === topic)
      && (!helpOnly || row.needsHelp);
  }).sort((a, b) => Number(b.needsHelp) - Number(a.needsHelp) || a.user.fullName.localeCompare(b.user.fullName, "vi"));
  const detail = rows.find(row => row.user.id === detailId);
  const field = "rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm";
  return <section aria-label="Tiến độ học theo chủ đề" className="space-y-4">
    <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-3">
      <div className="flex flex-wrap items-start gap-3">
        <div className="flex-1 min-w-64">
          <h3 className="font-bold text-slate-900">Học sinh đang học đến đâu?</h3>
          <p className="text-sm text-slate-500 mt-1">Theo bài nộp và mốc hoàn thành đã đồng bộ, không phải trạng thái trực tuyến. Chủ đề gần nhất có thể là bài ôn tập.</p>
          {loadedAt && <p className="text-xs text-slate-400 mt-1">Cập nhật: {loadedAt.toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" })} (VN)</p>}
        </div>
        <button type="button" disabled={loading} onClick={reload} className="rounded-xl bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-700 disabled:opacity-50">Tải lại tiến độ</button>
      </div>
      <div className="flex flex-wrap gap-2">
        <input aria-label="Tìm học sinh theo tiến độ" placeholder="Tên hoặc tên đăng nhập..." value={query} onChange={e => setQuery(e.target.value)} className={`${field} flex-1 min-w-48`} />
        <select aria-label="Lọc lớp học" value={grade} onChange={e => setGrade(e.target.value)} className={field}><option value="all">Tất cả lớp</option>{grades.map(g => <option key={g}>{g}</option>)}</select>
        <select aria-label="Lọc chủ đề gần nhất" value={topic} onChange={e => setTopic(e.target.value)} className={`${field} max-w-full`}><option value="all">Tất cả chủ đề gần nhất / tiếp theo</option>{[...modules].sort((a, b) => a.order - b.order).map(m => <option key={m.id} value={m.id}>{m.title}</option>)}</select>
        <label className="flex items-center gap-2 text-sm text-amber-800"><input type="checkbox" checked={helpOnly} onChange={e => setHelpOnly(e.target.checked)} />Cần hỗ trợ ({rows.filter(row => row.needsHelp).length})</label>
      </div>
      <p className="text-xs text-slate-500">“Cần hỗ trợ”: ít nhất 3 lần nộp chưa đạt liên tiếp ở bài tập vừa nộp gần nhất. Chọn học sinh để xem từng chủ đề và lịch sử.</p>
    </div>
    {error && <p role="alert" className="rounded-xl bg-amber-50 p-4 text-sm text-amber-900">{error} Dữ liệu cũ (nếu có) chưa được cập nhật.</p>}
    {loading && <p role="status" className="text-sm text-slate-500">Đang cập nhật tiến độ đã đồng bộ...</p>}
    {loadedAt && <div className="rounded-2xl border border-slate-200 bg-white overflow-x-auto">
      <table className="w-full text-sm"><thead className="bg-slate-50 text-left text-slate-500"><tr>
        <th className="p-4">Học sinh</th><th className="p-4">Chủ đề / bài gần nhất</th><th className="p-4">Tiến độ toàn khóa</th><th className="p-4">Hỗ trợ</th><th className="p-4">Chi tiết</th>
      </tr></thead><tbody className="divide-y divide-slate-100">{visible.map(row => <tr key={row.user.id} className="align-top">
        <td className="p-4"><p className="font-semibold">{row.user.fullName}</p><p className="text-xs text-slate-500">@{row.user.username} · {row.user.grade || "Chưa có lớp"}</p></td>
        <td className="p-4 min-w-64"><p className="font-semibold text-indigo-800">{row.recentLesson?.topic.title || "Chưa ghi nhận bài gần nhất"}</p>
          {row.recentLesson && <p className="text-xs mt-1">{row.latest.type === "completion" ? "Đã hoàn thành" : "Đã nộp"}: {row.recentLesson.lesson.title}</p>}
          {!!row.latest?.ts && <p className="text-xs text-slate-500 mt-1">{new Date(row.latest.ts).toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" })} (VN)</p>}
          <p className="text-xs text-slate-500 mt-1">Tiếp theo theo lộ trình: {row.next ? `${row.next.moduleTitle} · ${row.next.title}` : "Đã hoàn thành toàn bộ bài học"}</p>
        </td>
        <td className="p-4 whitespace-nowrap"><p>{row.done}/{row.total} bài · {row.total ? Math.round(row.done / row.total * 100) : 0}%</p><progress aria-label={`Tiến độ của ${row.user.fullName}`} value={row.done} max={row.total || 1} className="w-28 h-2 accent-emerald-600" /></td>
        <td className="p-4"><span className={`text-xs ${row.needsHelp ? "text-amber-800 font-semibold" : "text-slate-500"}`}>{row.needsHelp ? `${row.failedStreak} lần chưa đạt · Cần hỗ trợ` : row.latest || row.done ? "Chưa có dấu hiệu nộp sai nhiều lần" : "Chưa có dữ liệu học"}</span></td>
        <td className="p-4"><button type="button" aria-expanded={detailId === row.user.id} onClick={() => { setDetailId(detailId === row.user.id ? null : row.user.id); setShowHistory(false); }} className="rounded-lg bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-700 whitespace-nowrap">{detailId === row.user.id ? "Thu gọn" : "Xem tiến độ"}</button></td>
      </tr>)}</tbody></table>
      {!visible.length && <p className="p-6 text-center text-sm text-slate-500">Không có học sinh phù hợp.</p>}
    </div>}
    {detail && <section className="rounded-2xl border border-indigo-200 bg-white p-4 space-y-4" aria-label={`Tiến độ chủ đề của ${detail.user.fullName}`}>
      <div className="flex justify-between gap-3"><h4 className="font-bold">Tiến độ từng chủ đề · {detail.user.fullName}</h4><button type="button" onClick={() => setDetailId(null)} className="text-sm text-slate-500">Đóng</button></div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{detail.progress.map(p => <div key={p.topic.id} className="rounded-xl border border-slate-200 p-3">
        <p className="text-sm font-semibold">{p.topic.title}</p><p className="text-xs text-slate-500 mt-1">{p.done}/{p.total} bài hoàn thành · {p.total && p.done === p.total ? "Hoàn thành" : p.done ? "Đang hoàn thành" : "Chưa hoàn thành bài nào"}</p>
        <progress aria-label={p.topic.title} value={p.done} max={p.total || 1} className="w-full h-2 accent-emerald-600" />
      </div>)}</div>
      <button type="button" aria-expanded={showHistory} onClick={() => setShowHistory(value => !value)} className="rounded-xl bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-700">{showHistory ? "Thu gọn lịch sử" : "Xem lịch sử học & nộp bài"}</button>
      {showHistory && <StudentHistoryPanel key={detail.user.id} student={detail.user} />}
    </section>}
  </section>;
};
