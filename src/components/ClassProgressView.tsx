import React, { useMemo, useState } from "react";
import { useApp } from "../context/AppContext";
import { ApiService } from "../services/apiClient";
import { User } from "../types";
import { ProgressResetDialog } from "./ProgressResetDialog";
import { RotateCcw, Search, Users, CheckSquare, GraduationCap } from "lucide-react";

/** Màn hình giáo viên: xem tiến độ học sinh và yêu cầu làm lại bài / đưa điểm về 0. */
export const ClassProgressView: React.FC = () => {
  const { allUsers, modules, currentUser } = useApp();
  const [query, setQuery] = useState("");
  const [grade, setGrade] = useState("all");
  const [selected, setSelected] = useState<string[]>([]);
  const [dialogTargets, setDialogTargets] = useState<User[] | null>(null);

  const totalLessons = useMemo(() => modules.reduce((n, m) => n + m.lessons.length, 0), [modules]);

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

  const visible = students
    .filter((s) => grade === "all" || s.grade === grade)
    .filter((s) => {
      const q = query.trim().toLowerCase();
      return !q || s.fullName.toLowerCase().includes(q) || s.username.toLowerCase().includes(q);
    })
    .sort((a, b) => a.fullName.localeCompare(b.fullName, "vi"));

  const allVisibleSelected = visible.length > 0 && visible.every((s) => selected.includes(s.id));
  const toggleAll = () => setSelected(allVisibleSelected ? selected.filter((id) => !visible.some((s) => s.id === id)) : Array.from(new Set([...selected, ...visible.map((s) => s.id)])));
  const toggleOne = (id: string) => setSelected((sel) => (sel.includes(id) ? sel.filter((x) => x !== id) : [...sel, id]));
  const selectedUsers = students.filter((s) => selected.includes(s.id));

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-50 text-slate-800">
      <div className="max-w-6xl mx-auto space-y-5">
        <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Quản lý lớp & tiến độ</h2>
              <p className="text-sm text-slate-500">
                {currentUser?.fullName ? `${currentUser.fullName} · ` : ""}
                {students.length} học sinh. Chọn học sinh rồi đặt lại điểm hoặc yêu cầu làm lại một số chủ đề.
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Tìm theo tên hoặc tên đăng nhập..."
                className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400"
              />
            </div>
            <select
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="px-3 py-2 text-sm border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
            >
              <option value="all">Tất cả lớp</option>
              {grades.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>

          {selected.length > 0 && (
            <div className="flex flex-wrap items-center justify-between gap-2 bg-indigo-50/70 p-3 rounded-xl text-sm">
              <span className="flex items-center gap-2 font-bold text-indigo-950">
                <CheckSquare className="h-4 w-4 text-indigo-600" /> Đã chọn {selected.length} học sinh
              </span>
              <div className="flex items-center gap-2">
                <button onClick={() => setSelected([])} className="px-3 py-1.5 text-slate-600 hover:bg-white rounded-lg font-semibold cursor-pointer">
                  Bỏ chọn
                </button>
                <button
                  onClick={() => setDialogTargets(selectedUsers)}
                  className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <RotateCcw className="h-3.5 w-3.5" /> Đặt lại / yêu cầu làm lại
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden">
          {visible.length === 0 ? (
            <div className="p-10 text-center text-sm text-slate-500">
              <Users className="h-8 w-8 mx-auto mb-2 text-slate-300" />
              Chưa có học sinh nào phù hợp.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wide">
                  <tr>
                    <th className="px-4 py-3 w-10 text-left">
                      <input type="checkbox" checked={allVisibleSelected} onChange={toggleAll} className="h-4 w-4 accent-indigo-600 cursor-pointer" aria-label="Chọn tất cả" />
                    </th>
                    <th className="px-4 py-3 text-left">Học sinh</th>
                    <th className="px-4 py-3 text-left">Lớp</th>
                    <th className="px-4 py-3 text-left">Bài hoàn thành</th>
                    <th className="px-4 py-3 text-right">Điểm XP</th>
                    <th className="px-4 py-3 text-right w-32">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {visible.map((s) => {
                    const done = s.completedLessons?.length || 0;
                    const pct = totalLessons ? Math.min(100, Math.round((done / totalLessons) * 100)) : 0;
                    return (
                      <tr key={s.id} className="hover:bg-indigo-50/30">
                        <td className="px-4 py-3">
                          <input type="checkbox" checked={selected.includes(s.id)} onChange={() => toggleOne(s.id)} className="h-4 w-4 accent-indigo-600 cursor-pointer" />
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-semibold text-slate-900">{s.fullName}</div>
                          <div className="text-xs text-slate-400">@{s.username}</div>
                        </td>
                        <td className="px-4 py-3 text-slate-600">{s.grade || "—"}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="h-1.5 w-24 bg-slate-100 rounded-full overflow-hidden">
                              <div className="h-full bg-emerald-500" style={{ width: `${pct}%` }} />
                            </div>
                            <span className="text-xs text-slate-500 whitespace-nowrap">
                              {done}/{totalLessons}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right font-semibold text-amber-600">{s.totalXp}</td>
                        <td className="px-4 py-3 text-right">
                          <button
                            onClick={() => setDialogTargets([s])}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg cursor-pointer"
                            title="Đặt lại điểm hoặc yêu cầu làm lại chủ đề"
                          >
                            <RotateCcw className="h-3.5 w-3.5" /> Đặt lại
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {dialogTargets && (
        <ProgressResetDialog
          targets={dialogTargets}
          onClose={() => {
            setDialogTargets(null);
            setSelected([]);
          }}
        />
      )}
    </div>
  );
};
