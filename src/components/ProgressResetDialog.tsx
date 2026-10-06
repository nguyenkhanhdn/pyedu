import React, { useMemo, useRef, useEffect, useState } from "react";
import { useApp } from "../context/AppContext";
import { ResetScope, User } from "../types";
import { algoResetGroups, lessonResetGroups, ResetTopicGroup } from "../utils/progressReset";
import { RotateCcw, X, ChevronDown, ChevronRight, AlertTriangle, CheckCircle2, BookOpen, Target } from "lucide-react";

interface Props {
  /** Học sinh sẽ bị đặt lại tiến độ. */
  targets: User[];
  onClose: () => void;
}

type PickerTab = "lessons" | "algo";

/** Hộp thoại cho admin / giáo viên: đưa điểm về 0 hoặc chọn các chủ đề học sinh cần làm lại. */
export const ProgressResetDialog: React.FC<Props> = ({ targets, onClose }) => {
  const { resetStudentProgress } = useApp();
  const lessonGroups = useMemo(() => lessonResetGroups(), []);
  const algoGroups = useMemo(() => algoResetGroups(), []);

  const [mode, setMode] = useState<"topics" | "all">("topics");
  const [tab, setTab] = useState<PickerTab>("lessons");
  const [lessonIds, setLessonIds] = useState<Set<string>>(new Set());
  const [problemIds, setProblemIds] = useState<Set<string>>(new Set());
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const [clearCode, setClearCode] = useState(false);
  const [notify, setNotify] = useState(true);
  const [confirmed, setConfirmed] = useState(false);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ done: number; failed: number } | null>(null);

  const selectedCount = lessonIds.size + problemIds.size;
  const canSubmit = !busy && !result && targets.length > 0 && confirmed && (mode === "all" || selectedCount > 0);

  const setFor = (kind: PickerTab) => (kind === "lessons" ? [lessonIds, setLessonIds] as const : [problemIds, setProblemIds] as const);

  const toggleIds = (kind: PickerTab, ids: string[], on: boolean) => {
    const [cur, set] = setFor(kind);
    const next = new Set(cur);
    ids.forEach((id) => (on ? next.add(id) : next.delete(id)));
    set(next);
  };

  const submit = async () => {
    if (!canSubmit) return;
    setBusy(true);
    const scope: ResetScope = {
      mode,
      lessonIds: mode === "topics" ? Array.from(lessonIds) : [],
      problemIds: mode === "topics" ? Array.from(problemIds) : [],
      clearCode: mode === "all" ? true : clearCode,
      notify,
    };
    const res = await resetStudentProgress(targets.map((t) => t.id), scope);
    setResult(res);
    setBusy(false);
  };

  const renderGroup = (kind: PickerTab, g: ResetTopicGroup) => {
    const [cur] = setFor(kind);
    const allIds = g.items.flatMap((it) => it.ids);
    const chosen = allIds.filter((id) => cur.has(id)).length;
    const key = `${kind}:${g.id}`;
    return (
      <div key={key} className="border border-slate-200 rounded-xl overflow-hidden bg-white">
        <div className="flex items-center gap-2 px-3 py-2 bg-slate-50">
          <TriCheck checked={chosen === allIds.length && chosen > 0} partial={chosen > 0 && chosen < allIds.length} onChange={(on) => toggleIds(kind, allIds, on)} />
          <button
            type="button"
            onClick={() => setOpen((o) => ({ ...o, [key]: !o[key] }))}
            className="flex-1 flex items-center gap-1.5 text-left text-sm font-semibold text-slate-800 cursor-pointer"
          >
            {open[key] ? <ChevronDown className="h-4 w-4 text-slate-400" /> : <ChevronRight className="h-4 w-4 text-slate-400" />}
            <span>{g.title}</span>
            <span className="ml-auto text-xs font-medium text-slate-500">
              {chosen > 0 ? `${chosen}/${allIds.length}` : allIds.length} {kind === "lessons" ? "bài" : "bài tập"}
            </span>
          </button>
        </div>
        {open[key] && (
          <div className="divide-y divide-slate-100">
            {g.items.map((it) => {
              const on = it.ids.every((id) => cur.has(id));
              return (
                <label key={it.id} className="flex items-center gap-2 px-3 py-1.5 pl-9 text-sm text-slate-700 hover:bg-indigo-50/50 cursor-pointer">
                  <input type="checkbox" checked={on} onChange={(e) => toggleIds(kind, it.ids, e.target.checked)} className="h-4 w-4 accent-indigo-600" />
                  <span className="flex-1">{it.title}</span>
                  {kind === "algo" && <span className="text-xs text-slate-400">{it.ids.length} bài</span>}
                </label>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-2xl max-h-[92vh] flex flex-col">
        <div className="flex items-start gap-3 p-5 border-b border-slate-100">
          <div className="h-11 w-11 shrink-0 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center">
            <RotateCcw className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-slate-900">Đặt lại tiến độ học tập</h3>
            <p className="text-xs text-slate-500 truncate" title={targets.map((t) => t.fullName).join(", ")}>
              {targets.length === 1
                ? `Học sinh: ${targets[0].fullName} (@${targets[0].username})`
                : `${targets.length} học sinh: ${targets.slice(0, 3).map((t) => t.fullName).join(", ")}${targets.length > 3 ? "…" : ""}`}
            </p>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer" aria-label="Đóng">
            <X className="h-5 w-5" />
          </button>
        </div>

        {result ? (
          <div className="p-8 text-center space-y-3">
            <div className={`h-14 w-14 rounded-2xl flex items-center justify-center mx-auto ${result.failed === 0 ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>
              {result.failed === 0 ? <CheckCircle2 className="h-7 w-7" /> : <AlertTriangle className="h-7 w-7" />}
            </div>
            <p className="font-bold text-slate-900">
              Đã đặt lại tiến độ cho {result.done} học sinh{result.failed > 0 ? `, ${result.failed} học sinh không thực hiện được` : ""}.
            </p>
            {result.failed > 0 && (
              <p className="text-xs text-slate-500">Kiểm tra kết nối Supabase hoặc quyền truy cập của bảng dữ liệu rồi thử lại.</p>
            )}
            <button onClick={onClose} className="mt-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl cursor-pointer">
              Đóng
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              <div className="grid sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setMode("topics")}
                  className={`text-left p-3.5 rounded-2xl border-2 transition-all cursor-pointer ${mode === "topics" ? "border-indigo-500 bg-indigo-50/60" : "border-slate-200 hover:border-slate-300"}`}
                >
                  <div className="font-bold text-sm text-slate-900">Làm lại một số chủ đề</div>
                  <div className="text-xs text-slate-500 mt-0.5">Chỉ xóa kết quả các bài đã chọn, trừ XP tương ứng. Bài khác giữ nguyên.</div>
                </button>
                <button
                  type="button"
                  onClick={() => setMode("all")}
                  className={`text-left p-3.5 rounded-2xl border-2 transition-all cursor-pointer ${mode === "all" ? "border-rose-500 bg-rose-50/60" : "border-slate-200 hover:border-slate-300"}`}
                >
                  <div className="font-bold text-sm text-slate-900">Đưa điểm về 0</div>
                  <div className="text-xs text-slate-500 mt-0.5">Xóa toàn bộ bài hoàn thành, bài nộp, code đã lưu và điểm XP.</div>
                </button>
              </div>

              {mode === "topics" ? (
                <div className="space-y-3">
                  <div className="flex gap-1.5">
                    <TabBtn active={tab === "lessons"} onClick={() => setTab("lessons")} icon={<BookOpen className="h-4 w-4" />} label={`Bài học (${lessonIds.size})`} />
                    <TabBtn active={tab === "algo"} onClick={() => setTab("algo")} icon={<Target className="h-4 w-4" />} label={`Luyện thuật toán (${problemIds.size})`} />
                    <div className="ml-auto flex items-center gap-2 text-xs">
                      <button type="button" className="text-indigo-600 font-semibold hover:underline cursor-pointer" onClick={() => toggleIds(tab, (tab === "lessons" ? lessonGroups : algoGroups).flatMap((g) => g.items.flatMap((i) => i.ids)), true)}>
                        Chọn tất cả
                      </button>
                      <button type="button" className="text-slate-500 hover:underline cursor-pointer" onClick={() => toggleIds(tab, (tab === "lessons" ? lessonGroups : algoGroups).flatMap((g) => g.items.flatMap((i) => i.ids)), false)}>
                        Bỏ chọn
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">{(tab === "lessons" ? lessonGroups : algoGroups).map((g) => renderGroup(tab, g))}</div>

                  <label className="flex items-start gap-2 text-sm text-slate-700 cursor-pointer">
                    <input type="checkbox" checked={clearCode} onChange={(e) => setClearCode(e.target.checked)} className="h-4 w-4 mt-0.5 accent-indigo-600" />
                    <span>
                      Xóa cả code học sinh đã lưu ở các bài học này
                      <span className="block text-xs text-slate-400">Không chọn: học sinh vẫn thấy code cũ và có thể sửa lại để nộp.</span>
                    </span>
                  </label>
                </div>
              ) : (
                <div className="flex items-start gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm">
                  <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />
                  <span>Toàn bộ bài hoàn thành, bài nộp, code đã lưu và điểm XP của {targets.length > 1 ? `${targets.length} học sinh` : "học sinh"} sẽ về 0. Tài khoản đăng nhập vẫn được giữ.</span>
                </div>
              )}

              <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                <input type="checkbox" checked={notify} onChange={(e) => setNotify(e.target.checked)} className="h-4 w-4 accent-indigo-600" />
                Gửi thông báo yêu cầu làm lại cho học sinh
              </label>
            </div>

            <div className="p-5 border-t border-slate-100 space-y-3">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-800 cursor-pointer">
                <input type="checkbox" checked={confirmed} onChange={(e) => setConfirmed(e.target.checked)} className="h-4 w-4 accent-amber-600" />
                Tôi hiểu thao tác này không thể hoàn tác
              </label>
              <div className="flex items-center justify-end gap-3">
                <span className="mr-auto text-xs text-slate-500">
                  {mode === "topics" ? (selectedCount > 0 ? `Đã chọn ${lessonIds.size} bài học, ${problemIds.size} bài thuật toán` : "Chưa chọn chủ đề nào") : "Đặt lại toàn bộ"}
                </span>
                <button onClick={onClose} className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm rounded-xl cursor-pointer">
                  Hủy bỏ
                </button>
                <button
                  onClick={submit}
                  disabled={!canSubmit}
                  className={`px-5 py-2.5 text-white font-bold text-sm rounded-xl transition-all shadow-md cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${mode === "all" ? "bg-rose-600 hover:bg-rose-700 shadow-rose-600/30" : "bg-amber-600 hover:bg-amber-700 shadow-amber-600/30"}`}
                >
                  {busy ? "Đang xử lý..." : mode === "all" ? "Đưa điểm về 0" : "Yêu cầu làm lại"}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const TabBtn: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string }> = ({ active, onClick, icon, label }) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold cursor-pointer transition-colors ${active ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
  >
    {icon}
    {label}
  </button>
);

/** Ô chọn có trạng thái "một phần". */
const TriCheck: React.FC<{ checked: boolean; partial: boolean; onChange: (on: boolean) => void }> = ({ checked, partial, onChange }) => {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (ref.current) ref.current.indeterminate = partial;
  }, [partial]);
  return <input ref={ref} type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="h-4 w-4 accent-indigo-600 cursor-pointer" />;
};
