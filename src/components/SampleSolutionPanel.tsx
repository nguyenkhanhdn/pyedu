import React, { useRef, useState } from "react";
import { useApp } from "../context/AppContext";
import type { SampleSolutionTarget } from "../utils/sampleSolution";
import { CodeBlock } from "./CodeBlock";
import { RichText } from "./RichText";

interface SampleSolutionPanelProps {
  target: SampleSolutionTarget;
  reward: number;
  code?: string;
  explanation?: string;
  disabled?: boolean;
  onLoadCode?: (code: string) => void;
}

/** Mount with a user/exercise key so paid content never leaks to another task. */
export const SampleSolutionPanel: React.FC<SampleSolutionPanelProps> = ({ target, reward, code, explanation, disabled = false, onLoadCode }) => {
  const { currentUser, openSampleSolution } = useApp();
  const [confirming, setConfirming] = useState(false);
  const [paid, setPaid] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const pending = useRef(false);
  const free = currentUser?.role === "teacher" || currentUser?.role === "admin";
  const penalty = reward * 2;

  const reveal = async () => {
    if (pending.current || disabled) return;
    pending.current = true;
    setBusy(true);
    setError("");
    try {
      const charged = await openSampleSolution(target);
      setPaid(charged);
      setConfirming(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Chưa mở được bài mẫu. Vui lòng kiểm tra lại điểm.");
    } finally {
      pending.current = false;
      setBusy(false);
    }
  };

  if (!code?.trim()) return <p className="text-xs text-slate-500">Bài này chưa có bài mẫu. Bạn không bị trừ điểm.</p>;

  return (
    <section aria-label="Bài mẫu tham khảo" className="space-y-3 rounded-2xl border border-amber-200 bg-amber-50 p-3 text-xs">
      <h4 className="font-bold text-slate-900">Bài mẫu tham khảo</h4>
      {paid !== null ? (
        <>
          <p role="status" className="text-emerald-800">
            {paid === 0 ? "Đã mở bài mẫu miễn phí cho giáo viên / quản trị viên." : `Đã trừ ${paid} XP trong tổng điểm và điểm tuần.`}
            {" "}Hãy đọc hiểu rồi tự viết lại bằng cách của mình.
          </p>
          {explanation && <RichText className="text-slate-700" text={explanation} />}
          <CodeBlock code={code} title="bai_mau.py" />
          {onLoadCode && (
            <button type="button" disabled={disabled} onClick={() => onLoadCode(code)} className="rounded-lg border border-slate-300 bg-white px-3 py-2 font-semibold cursor-pointer disabled:opacity-50">
              Nạp bài mẫu vào trình soạn thảo để chạy thử
            </button>
          )}
          <button type="button" onClick={() => { setPaid(null); setError(""); }} className="rounded-lg border border-slate-300 bg-white px-3 py-2 font-semibold cursor-pointer">
            Đóng bài mẫu
          </button>
        </>
      ) : (
        <>
          <p className="text-amber-950">
            {free ? "Giáo viên và quản trị viên xem bài mẫu miễn phí." : (
              <>Mỗi lần mở bài mẫu sẽ trừ <strong>{penalty} XP = 2 × {reward} XP</strong> khỏi tổng điểm và điểm tuần, kể cả khi đã giải đúng hoặc đã nộp nhiều lần. Điểm có thể âm. Đóng rồi mở lại sẽ bị trừ tiếp.</>
            )}
          </p>
          {!free && <p className="text-slate-600">Hãy thử tự giải hoặc xem gợi ý trước khi mở bài mẫu.</p>}
          {confirming && !free ? (
            <div className="space-y-2">
              <p className="font-semibold text-amber-950">Bạn đồng ý trừ {penalty} XP để xem bài mẫu của bài này?</p>
              <p className="text-slate-700">Tổng điểm: {currentUser?.totalXp ?? 0} → {(currentUser?.totalXp ?? 0) - penalty} XP. Điểm tuần: {currentUser?.weeklyXp ?? 0} → {(currentUser?.weeklyXp ?? 0) - penalty} XP.</p>
              <div className="flex flex-wrap gap-2">
                <button type="button" disabled={busy || disabled} onClick={reveal} className="rounded-lg bg-amber-700 px-3 py-2 font-semibold text-white cursor-pointer disabled:opacity-50">
                  {busy ? "Đang xử lý điểm..." : `Đồng ý trừ ${penalty} XP và xem bài mẫu`}
                </button>
                <button type="button" disabled={busy} onClick={() => { setConfirming(false); setError(""); }} className="rounded-lg border border-slate-300 bg-white px-3 py-2 font-semibold cursor-pointer disabled:opacity-50">Hủy</button>
              </div>
            </div>
          ) : (
            <button type="button" disabled={busy || disabled || !currentUser} onClick={() => free ? void reveal() : setConfirming(true)} className="rounded-lg bg-amber-700 px-3 py-2 font-semibold text-white cursor-pointer disabled:opacity-50">
              {busy ? "Đang mở..." : free ? "Xem bài mẫu" : `Xem bài mẫu (−${penalty} XP)`}
            </button>
          )}
          {disabled && <p role="status" className="text-slate-600">Vui lòng chờ chạy / chấm bài xong trước khi mở bài mẫu.</p>}
        </>
      )}
      {error && <p role="alert" className="text-red-700">{error}</p>}
    </section>
  );
};
