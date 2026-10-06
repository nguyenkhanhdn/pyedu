import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Lock, Unlock } from "lucide-react";

/**
 * Chế độ ràng buộc học bài: học sinh phải pass bài trước mới mở bài sau.
 * Chỉ giáo viên / admin được thay đổi, thiết lập áp dụng đồng loạt cho mọi học sinh.
 */
export const SequentialModeToggle: React.FC<{ variant?: "compact" | "card" }> = ({ variant = "compact" }) => {
  const { enforceSequentialProgression: on, setEnforceSequentialProgression, canManageSequentialMode } = useApp();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggle = async () => {
    if (busy || !canManageSequentialMode) return;
    setBusy(true);
    setError(null);
    const ok = await setEnforceSequentialProgression(!on);
    if (!ok) {
      setError("Chưa lưu được lên máy chủ nên học sinh chưa nhận được thay đổi. Hãy chạy file SQL tạo bảng app_settings trong Supabase rồi thử lại.");
    }
    setBusy(false);
  };

  const button = canManageSequentialMode ? (
    <button
      onClick={toggle}
      disabled={busy}
      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer disabled:opacity-60 ${
        on ? "bg-indigo-600 text-white shadow-2xs hover:bg-indigo-700" : "bg-slate-200 text-slate-600 hover:bg-slate-300"
      }`}
      title="Bật/tắt chế độ ràng buộc cho TẤT CẢ học sinh: phải pass bài trước mới mở bài sau"
    >
      {busy ? "..." : on ? "ĐANG BẬT" : "TẮT"}
    </button>
  ) : (
    <span
      className={`px-2.5 py-1 rounded-lg text-xs font-bold ${on ? "bg-indigo-50 text-indigo-700 border border-indigo-200" : "bg-slate-100 text-slate-500 border border-slate-200"}`}
      title="Do giáo viên thiết lập cho cả lớp"
    >
      {on ? "ĐANG BẬT" : "TẮT"}
    </span>
  );

  if (variant === "card") {
    return (
      <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className={`h-10 w-10 shrink-0 rounded-xl flex items-center justify-center border ${on ? "bg-indigo-50 border-indigo-200 text-indigo-600" : "bg-slate-50 border-slate-200 text-slate-400"}`}>
              {on ? <Lock className="h-5 w-5" /> : <Unlock className="h-5 w-5" />}
            </div>
            <div className="min-w-0">
              <div className="font-bold text-slate-900 text-sm">Chế độ ràng buộc học bài (cả lớp)</div>
              <div className="text-xs text-slate-500">
                {on
                  ? "Học sinh phải pass bài thực hành trước mới mở được bài kế tiếp."
                  : "Học sinh được tự do mở mọi bài, không cần pass bài trước."}
              </div>
            </div>
          </div>
          {button}
        </div>
        {error && <p className="text-xs text-rose-600 bg-rose-50 border border-rose-200 rounded-lg p-2">{error}</p>}
      </div>
    );
  }

  return (
    <div className="mt-2.5 pt-2 border-t border-slate-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-700">
          <Lock className={`h-3.5 w-3.5 ${on ? "text-indigo-600" : "text-slate-400"}`} />
          <span>Ràng buộc bài học:</span>
        </div>
        {button}
      </div>
      <p className="text-[11px] leading-snug text-slate-400 mt-1">
        {canManageSequentialMode ? "Thiết lập này áp dụng cho tất cả học sinh." : "Do giáo viên thiết lập cho cả lớp."}
      </p>
      {error && <p className="text-[11px] text-rose-600 mt-1">{error}</p>}
    </div>
  );
};
