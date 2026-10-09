import React, { useEffect, useMemo, useState } from "react";
import { useApp } from "../context/AppContext";
import { ApiService } from "../services/apiClient";
import { PracticeEvent, buildDailyStats, buildStudentStats, dayKey } from "../utils/practiceStats";
import { BarChart3, RefreshCw, Users, CheckCircle2, Send, Target, Search } from "lucide-react";

const RANGES = [7, 14, 30];
const fmtDay = (d: Date) => d.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" });
const fmtLong = (d: Date) => d.toLocaleDateString("vi-VN", { weekday: "long", day: "2-digit", month: "2-digit", year: "numeric" });

/** Thống kê kết quả luyện tập của học sinh theo ngày — dành cho giáo viên và admin. */
export const PracticeStatsPanel: React.FC = () => {
  const { allUsers, modules } = useApp();
  const [mode, setMode] = useState<"day" | "student">("day");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"name" | "passed" | "recent">("passed");
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const lessonTitle = useMemo(() => {
    const m = new Map<string, string>();
    modules.forEach((mod) => mod.lessons.forEach((l) => m.set(l.id, l.title)));
    return m;
  }, [modules]);
  const [days, setDays] = useState(14);
  const [grade, setGrade] = useState("all");
  const [events, setEvents] = useState<PracticeEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadedAt, setLoadedAt] = useState<Date | null>(null);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [hoverKey, setHoverKey] = useState<string | null>(null);

  const students = useMemo(
    () =>
      allUsers.filter(
        (u) =>
          u.role === "student" &&
          (u.status === undefined || u.status === "active") &&
          !ApiService.isUserDeleted(u.id, u.username, u.email, u.fullName)
      ),
    [allUsers]
  );
  const grades = useMemo(() => Array.from(new Set(students.map((s) => s.grade).filter(Boolean))).sort(), [students]);
  const scoped = useMemo(() => (grade === "all" ? students : students.filter((s) => s.grade === grade)), [students, grade]);

  const load = async () => {
    setLoading(true);
    try {
      setEvents(await ApiService.fetchPracticeEvents(days));
      setLoadedAt(new Date());
    } catch (e) {
      console.warn("Practice stats load notice:", e);
      setEvents([]);
    }
    setLoading(false);
  };
  useEffect(() => {
    load();
  }, [days]);

  const stats = useMemo(() => buildDailyStats(events, scoped, days), [events, scoped, days]);
  const studentStats = useMemo(() => buildStudentStats(events, scoped, days), [events, scoped, days]);
  const maxAttempts = Math.max(1, ...stats.map((d) => d.attempts));
  const totals = useMemo(() => {
    const active = new Set<string>();
    stats.forEach((d) => d.rows.forEach((r) => active.add(r.user.id)));
    const attempts = stats.reduce((n, d) => n + d.attempts, 0);
    const passed = stats.reduce((n, d) => n + d.passed, 0);
    return {
      attempts,
      passed,
      distinct: stats.reduce((n, d) => n + d.distinctPassed, 0),
      active: active.size,
      rate: attempts ? Math.round((passed / attempts) * 100) : 0,
    };
  }, [stats]);

  // Mặc định chọn ngày gần nhất có hoạt động
  const effectiveKey =
    selectedKey && stats.some((d) => d.key === selectedKey)
      ? selectedKey
      : [...stats].reverse().find((d) => d.attempts > 0)?.key || stats[stats.length - 1]?.key;
  const selected = stats.find((d) => d.key === effectiveKey);
  const hovered = stats.find((d) => d.key === hoverKey);

  return (
    <div className="space-y-4">
      {/* Bộ lọc */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 mr-auto">
          <BarChart3 className="h-5 w-5 text-indigo-600" />
          <h3 className="font-bold text-slate-900">Kết quả luyện tập theo ngày</h3>
        </div>
        <div className="flex rounded-xl bg-slate-100 p-0.5" role="group" aria-label="Kiểu thống kê">
          {([["day", "Theo ngày"], ["student", "Theo học sinh"]] as const).map(([k, label]) => (
            <button
              key={k}
              onClick={() => setMode(k)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg cursor-pointer ${mode === k ? "bg-white text-indigo-700 shadow-xs" : "text-slate-600 hover:text-slate-900"}`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="flex rounded-xl bg-slate-100 p-0.5" role="group" aria-label="Khoảng thời gian">
          {RANGES.map((r) => (
            <button
              key={r}
              onClick={() => setDays(r)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg cursor-pointer ${days === r ? "bg-white text-indigo-700 shadow-xs" : "text-slate-600 hover:text-slate-900"}`}
            >
              {r} ngày
            </button>
          ))}
        </div>
        <select
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          className="px-3 py-2 text-sm border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
          aria-label="Lọc theo lớp"
        >
          <option value="all">Tất cả lớp</option>
          {grades.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
        <button
          onClick={load}
          disabled={loading}
          className="px-3 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          title={loadedAt ? `Cập nhật lúc ${loadedAt.toLocaleTimeString("vi-VN")}` : "Tải lại"}
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} /> Tải lại
        </button>
      </div>

      {/* Tổng quan */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Tile icon={<Send className="h-5 w-5" />} label="Lượt nộp bài" value={totals.attempts} note={`${days} ngày gần nhất`} />
        <Tile icon={<CheckCircle2 className="h-5 w-5" />} label="Lượt đạt" value={totals.passed} note={`${totals.rate}% số lượt nộp`} />
        <Tile icon={<Target className="h-5 w-5" />} label="Bài đạt (tổng theo ngày)" value={totals.distinct} note="mỗi bài tính một lần mỗi ngày" />
        <Tile icon={<Users className="h-5 w-5" />} label="Học sinh có luyện tập" value={`${totals.active}/${scoped.length}`} note={grade === "all" ? "tất cả lớp" : grade} />
      </div>

      {mode === "student" && (
        <StudentView
          stats={studentStats}
          days={stats.map((d) => ({ key: d.key, date: d.date }))}
          query={query} setQuery={setQuery} sort={sort} setSort={setSort}
          selected={selectedStudent} setSelected={setSelectedStudent}
          lessonTitle={lessonTitle} loading={loading}
        />
      )}

      {mode === "day" && (<>
      {/* Biểu đồ cột chồng theo ngày */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <span className="text-sm font-semibold text-slate-700">Số lượt nộp bài mỗi ngày</span>
          <div className="flex items-center gap-4 text-xs text-slate-600">
            <span className="flex items-center gap-1.5"><i className="inline-block h-2.5 w-2.5 rounded-sm" style={{ background: "#2a78d6" }} /> Đạt</span>
            <span className="flex items-center gap-1.5"><i className="inline-block h-2.5 w-2.5 rounded-sm" style={{ background: "#eb6834" }} /> Chưa đạt</span>
          </div>
        </div>
        {loading ? (
          <div className="h-44 flex items-center justify-center text-sm text-slate-400">Đang tải dữ liệu...</div>
        ) : totals.attempts === 0 ? (
          <div className="h-44 flex items-center justify-center text-sm text-slate-400">Chưa có lượt nộp bài nào trong khoảng này.</div>
        ) : (
          <div className="relative">
            <div className="flex items-end gap-1 h-44 border-b border-slate-200">
              {stats.map((d) => {
                const h = (d.attempts / maxAttempts) * 100;
                const passH = d.attempts ? (d.passed / d.attempts) * 100 : 0;
                const isSel = d.key === effectiveKey;
                return (
                  <button
                    key={d.key}
                    onClick={() => setSelectedKey(d.key)}
                    onMouseEnter={() => setHoverKey(d.key)}
                    onMouseLeave={() => setHoverKey(null)}
                    onFocus={() => setHoverKey(d.key)}
                    onBlur={() => setHoverKey(null)}
                    aria-label={`${fmtDay(d.date)}: ${d.attempts} lượt nộp, ${d.passed} đạt`}
                    className={`group relative flex-1 min-w-0 h-full flex flex-col justify-end items-center cursor-pointer rounded-t-md transition-colors ${isSel ? "bg-indigo-50" : "hover:bg-slate-50"}`}
                  >
                    {d.attempts > 0 && (
                      <div className="w-full max-w-7 flex flex-col-reverse gap-0.5" style={{ height: `${h}%` }}>
                        {d.passed > 0 && <div className="w-full" style={{ height: `${passH}%`, background: "#2a78d6", borderRadius: d.failed > 0 ? "0" : "4px 4px 0 0" }} />}
                        {d.failed > 0 && <div className="w-full flex-1" style={{ background: "#eb6834", borderRadius: "4px 4px 0 0" }} />}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
            <div className="flex gap-1 mt-1">
              {stats.map((d, i) => (
                <div key={d.key} className={`flex-1 min-w-0 text-center text-[10px] ${d.key === effectiveKey ? "font-bold text-indigo-700" : "text-slate-400"}`}>
                  {days <= 14 || i % 2 === 0 ? fmtDay(d.date) : ""}
                </div>
              ))}
            </div>
            {hovered && (
              <div className="absolute -top-1 right-0 z-10 px-3 py-2 rounded-xl bg-slate-900 text-white text-xs shadow-lg pointer-events-none">
                <div className="font-bold mb-0.5">{fmtLong(hovered.date)}</div>
                <div>{hovered.attempts} lượt nộp · {hovered.passed} đạt · {hovered.failed} chưa đạt</div>
                <div className="text-slate-300">{hovered.activeStudents} học sinh · {hovered.distinctPassed} bài đạt</div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {/* Bảng theo ngày (cũng là dạng xem bảng của biểu đồ) */}
        <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-100 text-sm font-semibold text-slate-700">Tổng hợp từng ngày</div>
          <div className="overflow-x-auto max-h-96 overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-500 text-xs sticky top-0">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold">Ngày</th>
                  <th className="px-3 py-2 text-right font-semibold">Lượt nộp</th>
                  <th className="px-3 py-2 text-right font-semibold">Đạt</th>
                  <th className="px-3 py-2 text-right font-semibold">Bài đạt</th>
                  <th className="px-3 py-2 text-right font-semibold">HS</th>
                  <th className="px-3 py-2 text-right font-semibold">Bài học / Đề</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[...stats].reverse().map((d) => (
                  <tr
                    key={d.key}
                    onClick={() => setSelectedKey(d.key)}
                    className={`cursor-pointer ${d.key === effectiveKey ? "bg-indigo-50" : "hover:bg-slate-50"} ${d.attempts === 0 ? "text-slate-400" : "text-slate-800"}`}
                  >
                    <td className="px-3 py-2 whitespace-nowrap">{fmtLong(d.date)}</td>
                    <td className="px-3 py-2 text-right font-semibold">{d.attempts}</td>
                    <td className="px-3 py-2 text-right">{d.passed}</td>
                    <td className="px-3 py-2 text-right">{d.distinctPassed}</td>
                    <td className="px-3 py-2 text-right">{d.activeStudents}</td>
                    <td className="px-3 py-2 text-right whitespace-nowrap">{d.lessonAttempts} / {d.algoAttempts}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Chi tiết một ngày */}
        <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-100 text-sm font-semibold text-slate-700">
            {selected ? `Chi tiết ${fmtLong(selected.date)}` : "Chi tiết"}
            {selected && <span className="ml-2 font-normal text-slate-400">({selected.activeStudents}/{scoped.length} học sinh luyện tập)</span>}
          </div>
          {!selected || selected.rows.length === 0 ? (
            <div className="p-8 text-center text-sm text-slate-400">Không có học sinh nào luyện tập trong ngày này.</div>
          ) : (
            <div className="overflow-x-auto max-h-96 overflow-y-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-500 text-xs sticky top-0">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold">Học sinh</th>
                    <th className="px-3 py-2 text-right font-semibold">Lượt nộp</th>
                    <th className="px-3 py-2 text-right font-semibold">Đạt</th>
                    <th className="px-3 py-2 text-right font-semibold">Bài đạt</th>
                    <th className="px-3 py-2 text-right font-semibold">Điểm TB</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {selected.rows.map((r) => (
                    <tr key={r.user.id} className="hover:bg-slate-50">
                      <td className="px-3 py-2">
                        <div className="font-semibold text-slate-900">{r.user.fullName}</div>
                        <div className="text-xs text-slate-400">{r.user.grade || "—"} · bài học {r.lessonAttempts}, luyện đề {r.algoAttempts}</div>
                      </td>
                      <td className="px-3 py-2 text-right">{r.attempts}</td>
                      <td className="px-3 py-2 text-right">{r.passed}</td>
                      <td className="px-3 py-2 text-right font-semibold text-indigo-700">{r.distinctPassed}</td>
                      <td className="px-3 py-2 text-right">{r.avgScore}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      </>)}
      <p className="text-xs text-slate-400">
        “Đạt” là lượt nộp vượt qua toàn bộ test case. “Bài đạt” đếm mỗi bài một lần cho mỗi học sinh trong ngày. Ngày tính theo giờ trên thiết bị của bạn.
      </p>
    </div>
  );
};

const Tile: React.FC<{ icon: React.ReactNode; label: string; value: React.ReactNode; note?: string }> = ({ icon, label, value, note }) => (
  <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center gap-3">
    <div className="h-11 w-11 shrink-0 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center">{icon}</div>
    <div className="min-w-0">
      <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide truncate">{label}</div>
      <div className="text-2xl font-black text-slate-900 leading-tight">{value}</div>
      {note && <div className="text-[11px] text-slate-400 truncate">{note}</div>}
    </div>
  </div>
);

type StudentStats = ReturnType<typeof buildStudentStats>;

interface StudentViewProps {
  stats: StudentStats;
  days: { key: string; date: Date }[];
  query: string;
  setQuery: (v: string) => void;
  sort: "name" | "passed" | "recent";
  setSort: (v: "name" | "passed" | "recent") => void;
  selected: string | null;
  setSelected: (v: string | null) => void;
  lessonTitle: Map<string, string>;
  loading: boolean;
}

/** Thống kê theo từng học sinh: bảng học sinh × ngày và chi tiết các bài đã làm của một học sinh. */
const StudentView: React.FC<StudentViewProps> = ({ stats, days, query, setQuery, sort, setSort, selected, setSelected, lessonTitle, loading }) => {
  const q = query.trim().toLowerCase();
  const rows = stats
    .filter((s) => !q || s.user.fullName.toLowerCase().includes(q) || s.user.username.toLowerCase().includes(q))
    .sort((a, b) =>
      sort === "name"
        ? a.user.fullName.localeCompare(b.user.fullName, "vi")
        : sort === "recent"
        ? b.lastTs - a.lastTs || a.user.fullName.localeCompare(b.user.fullName, "vi")
        : b.distinctPassed - a.distinctPassed || b.attempts - a.attempts || a.user.fullName.localeCompare(b.user.fullName, "vi")
    );
  const maxCell = Math.max(1, ...stats.flatMap((s) => Object.values(s.days).map((c) => (c as { distinctPassed: number }).distinctPassed)));
  const todayKey = dayKey(Date.now());
  const sel = stats.find((s) => s.user.id === selected);
  const nameOf = (kind: "lesson" | "algo", id: string, title?: string) =>
    kind === "lesson" ? lessonTitle.get(id) || id : title || id;

  return (
    <div className="space-y-4">
      <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-100 flex flex-wrap items-center gap-3">
          <span className="text-sm font-semibold text-slate-700 mr-auto">Bài đạt của từng học sinh theo ngày</span>
          <div className="relative">
            <Search className="h-4 w-4 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tìm học sinh..."
              className="pl-8 pr-3 py-1.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
            />
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as "name" | "passed" | "recent")}
            className="px-2.5 py-1.5 text-sm border border-slate-200 rounded-lg bg-white"
            aria-label="Sắp xếp"
          >
            <option value="passed">Sắp xếp: bài đạt nhiều nhất</option>
            <option value="recent">Sắp xếp: luyện tập gần nhất</option>
            <option value="name">Sắp xếp: theo tên</option>
          </select>
        </div>
        {loading ? (
          <div className="p-10 text-center text-sm text-slate-400">Đang tải dữ liệu...</div>
        ) : rows.length === 0 ? (
          <div className="p-10 text-center text-sm text-slate-400">Chưa có học sinh nào phù hợp.</div>
        ) : (
          <div className="overflow-auto max-h-[28rem]">
            <table className="text-sm border-separate border-spacing-0">
              <thead className="text-xs text-slate-500">
                <tr>
                  <th className="sticky left-0 top-0 z-20 bg-slate-50 px-3 py-2 text-left font-semibold min-w-44 border-b border-slate-100">Học sinh</th>
                  {days.map((d) => (
                    <th key={d.key} className={`sticky top-0 z-10 bg-slate-50 px-0.5 py-2 font-medium w-9 min-w-9 border-b border-slate-100 ${d.key === todayKey ? "text-indigo-700 font-bold" : ""}`}>
                      {fmtDay(d.date)}
                    </th>
                  ))}
                  <th className="sticky top-0 z-10 bg-slate-50 px-3 py-2 text-right font-semibold border-b border-slate-100 whitespace-nowrap">Bài đạt</th>
                  <th className="sticky top-0 z-10 bg-slate-50 px-3 py-2 text-right font-semibold border-b border-slate-100 whitespace-nowrap">Lượt nộp</th>
                  <th className="sticky top-0 z-10 bg-slate-50 px-3 py-2 text-right font-semibold border-b border-slate-100 whitespace-nowrap">Số ngày</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((s) => (
                  <tr key={s.user.id} onClick={() => setSelected(s.user.id === selected ? null : s.user.id)} className="cursor-pointer group">
                    <td className={`sticky left-0 z-10 px-3 py-1.5 border-b border-slate-100 ${s.user.id === selected ? "bg-indigo-50" : "bg-white group-hover:bg-slate-50"}`}>
                      <div className="font-semibold text-slate-900 whitespace-nowrap">{s.user.fullName}</div>
                      <div className="text-xs text-slate-400">{s.user.grade || "—"}</div>
                    </td>
                    {days.map((d) => {
                      const c = s.days[d.key];
                      const title = c ? `${s.user.fullName} · ${fmtDay(d.date)}: ${c.attempts} lượt nộp, ${c.passed} đạt, ${c.distinctPassed} bài đạt` : `${s.user.fullName} · ${fmtDay(d.date)}: không luyện tập`;
                      const bg = !c ? undefined : c.distinctPassed > 0 ? `rgba(42,120,214,${0.18 + 0.82 * (c.distinctPassed / maxCell)})` : "rgba(235,104,52,0.22)";
                      const light = c && c.distinctPassed > 0 && c.distinctPassed / maxCell > 0.5;
                      return (
                        <td key={d.key} title={title} className={`p-0.5 border-b border-slate-100 ${s.user.id === selected ? "bg-indigo-50" : ""}`}>
                          <div className={`h-7 w-8 rounded-md flex items-center justify-center text-xs font-semibold ${light ? "text-white" : "text-slate-700"} ${c ? "" : "bg-slate-50"}`} style={bg ? { background: bg } : undefined}>
                            {c ? c.distinctPassed : ""}
                          </div>
                        </td>
                      );
                    })}
                    <td className={`px-3 py-1.5 text-right font-bold text-indigo-700 border-b border-slate-100 ${s.user.id === selected ? "bg-indigo-50" : ""}`}>{s.distinctPassed}</td>
                    <td className={`px-3 py-1.5 text-right border-b border-slate-100 ${s.user.id === selected ? "bg-indigo-50" : ""}`}>{s.attempts}</td>
                    <td className={`px-3 py-1.5 text-right border-b border-slate-100 ${s.user.id === selected ? "bg-indigo-50" : ""}`}>{s.activeDays}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="px-4 py-2 border-t border-slate-100 flex flex-wrap items-center gap-4 text-xs text-slate-500">
          <span className="flex items-center gap-1.5"><i className="inline-block h-3 w-5 rounded-sm" style={{ background: "rgba(42,120,214,0.6)" }} /> Số bài đạt trong ngày (đậm hơn = nhiều hơn)</span>
          <span className="flex items-center gap-1.5"><i className="inline-block h-3 w-5 rounded-sm" style={{ background: "rgba(235,104,52,0.3)" }} /> Có nộp nhưng chưa đạt bài nào (0)</span>
          <span className="flex items-center gap-1.5"><i className="inline-block h-3 w-5 rounded-sm bg-slate-100" /> Không luyện tập</span>
          <span className="ml-auto">Bấm vào một học sinh để xem chi tiết.</span>
        </div>
      </div>

      {sel && (
        <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-100 flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="font-bold text-slate-900">{sel.user.fullName}</span>
            <span className="text-xs text-slate-400">@{sel.user.username} · {sel.user.grade || "—"}</span>
            <span className="ml-auto text-xs text-slate-500">
              {sel.distinctPassed} bài đạt · {sel.attempts} lượt nộp · {sel.activeDays}/{days.length} ngày có luyện tập
              {sel.lastTs ? ` · gần nhất ${new Date(sel.lastTs).toLocaleString("vi-VN", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })}` : ""}
            </span>
          </div>
          {sel.activeDays === 0 ? (
            <div className="p-8 text-center text-sm text-slate-400">Học sinh này chưa luyện tập trong khoảng thời gian đã chọn.</div>
          ) : (
            <div className="divide-y divide-slate-100 max-h-96 overflow-y-auto">
              {[...days].reverse().filter((d) => sel.days[d.key]).map((d) => {
                const c = sel.days[d.key];
                return (
                  <div key={d.key} className="px-4 py-3">
                    <div className="flex items-center gap-3 text-sm">
                      <span className="font-semibold text-slate-800">{fmtLong(d.date)}</span>
                      <span className="text-xs text-slate-500">{c.attempts} lượt nộp · {c.passed} đạt · {c.distinctPassed} bài đạt</span>
                    </div>
                    <ul className="mt-1.5 grid sm:grid-cols-2 gap-x-6 gap-y-1">
                      {(sel.items[d.key] || []).map((it) => (
                        <li key={`${it.kind}:${it.itemId}`} className="flex items-center gap-2 text-xs text-slate-700">
                          <span className="inline-block h-2 w-2 rounded-full shrink-0" style={{ background: it.passed ? "#2a78d6" : "#eb6834" }} aria-hidden />
                          <span className="truncate">{nameOf(it.kind, it.itemId, it.title)}</span>
                          <span className="ml-auto shrink-0 text-slate-400">{it.kind === "lesson" ? "Bài học" : "Luyện đề"} · {it.passed ? "Đạt" : "Chưa đạt"} · {it.attempts} lần · {it.bestScore}đ</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
