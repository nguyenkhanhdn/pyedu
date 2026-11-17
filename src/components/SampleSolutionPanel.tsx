import React, { useRef, useState } from "react";
import { useApp } from "../context/AppContext";
import {
  getSampleSolutionDateKey,
  getStudentSampleSolutionBlockReason,
  SAMPLE_SOLUTION_DAILY_LIMIT,
  type SampleSolutionTarget,
} from "../utils/sampleSolution";
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
  const { currentUser, openSampleSolution, sampleSolutionDailyUsage } = useApp();
  const [confirming, setConfirming] = useState(false);
  const [paid, setPaid] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const pending = useRef(false);
  const free = currentUser?.role === "teacher" || currentUser?.role === "admin";
  const penalty = reward * 2;
  const todayKey = getSampleSolutionDateKey();
  const dailyCount = sampleSolutionDailyUsage?.date === todayKey ? sampleSolutionDailyUsage.count : 0;
  const remainingViews = Math.max(0, SAMPLE_SOLUTION_DAILY_LIMIT - dailyCount);
  const blockReason = currentUser ? getStudentSampleSolutionBlockReason(currentUser, dailyCount) : null;

  const reveal = async () => {
    if (pending.current || disabled || blockReason) return;
    pending.current = true;
    setBusy(true);
    setError("");
    try {
      const charged = await openSampleSolution(target);
      setPaid(charged);
      setConfirming(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Chưa mở được bài mẫu. Vui lòng kiểm tra lại điểm.");
      setConfirming(false);
    } finally {
      pending.current = false;
      setBusy(false);
    }
  };

  if (!code?.trim()) return <p className="text-xs text-slate-500">Bài này chưa có bài mẫu. Bạn không bị trừ điểm.</p>;

  return (
    <section aria-label="Bài mẫu tham khảo" className="space-y-3 rounded-2xl border border-amber-200 bg-amber-50 p-3 text-xs">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <h4 className="font-bold text-slate-900">Bài mẫu tham khảo</h4>
        {!free && currentUser && (
          <span className={`px-2 py-0.5 rounded-full font-semibold border ${
            remainingViews === 0
              ? "bg-rose-100 text-rose-700 border-rose-200"
              : "bg-white text-amber-900 border-amber-200"
          }`}>
            Hôm nay: {dailyCount}/{SAMPLE_SOLUTION_DAILY_LIMIT} lần
          </span>
        )}
      </div>
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
              <>
                Mỗi ngày học sinh được xem bài mẫu tối đa <strong>{SAMPLE_SOLUTION_DAILY_LIMIT} lần</strong> (còn {remainingViews}/{SAMPLE_SOLUTION_DAILY_LIMIT} lượt hôm nay). Mỗi lần mở sẽ trừ <strong>{penalty} XP = 2 × {reward} XP</strong> khỏi tổng điểm và điểm tuần. Nếu điểm về <strong>≤ 0 XP</strong> sẽ không được phép mở xem bài mẫu nữa.
              </>
            )}
          </p>
          {!free && <p className="text-slate-600">Hãy thử tự giải hoặc xem gợi ý trước khi mở bài mẫu.</p>}
          {blockReason && !free ? (
            <p role="alert" className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 font-semibold text-rose-700">
              {blockReason}
            </p>
          ) : null}
          {confirming && !free && !blockReason ? (
            <div className="space-y-2">
              <p className="font-semibold text-amber-950">Bạn đồng ý trừ {penalty} XP để xem bài mẫu của bài này?</p>
              <p className="text-slate-700">
                Tổng điểm: {currentUser?.totalXp ?? 0} → {(currentUser?.totalXp ?? 0) - penalty} XP. Điểm tuần: {currentUser?.weeklyXp ?? 0} → {(currentUser?.weeklyXp ?? 0) - penalty} XP. (Còn {Math.max(0, remainingViews - 1)}/{SAMPLE_SOLUTION_DAILY_LIMIT} lượt hôm nay sau lần này).
              </p>
              {(currentUser?.totalXp ?? 0) - penalty <= 0 && (
                <p className="text-rose-700 font-medium">
                  Lưu ý: Sau lần mở này tổng điểm sẽ về ≤ 0 XP và bạn sẽ không thể mở xem bài mẫu nữa cho đến khi tích lũy lại điểm &gt; 0.
                </p>
              )}
              <div className="flex flex-wrap gap-2">
                <button type="button" disabled={busy || disabled} onClick={reveal} className="rounded-lg bg-amber-700 px-3 py-2 font-semibold text-white cursor-pointer disabled:opacity-50">
                  {busy ? "Đang xử lý điểm..." : `Đồng ý trừ ${penalty} XP và xem bài mẫu`}
                </button>
                <button type="button" disabled={busy} onClick={() => { setConfirming(false); setError(""); }} className="rounded-lg border border-slate-300 bg-white px-3 py-2 font-semibold cursor-pointer disabled:opacity-50">Hủy</button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              disabled={busy || disabled || !currentUser || Boolean(blockReason)}
              onClick={() => free ? void reveal() : setConfirming(true)}
              className="rounded-lg bg-amber-700 px-3 py-2 font-semibold text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
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
