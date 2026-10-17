import React from "react";
import { useApp } from "../context/AppContext";

export const SubmissionSyncStatus: React.FC = () => {
  const { submissionSyncStatus } = useApp();
  if (submissionSyncStatus === "syncing") return <p role="status" className="p-2 text-xs text-amber-300">Đang đồng bộ bài nộp lên máy chủ...</p>;
  if (submissionSyncStatus === "synced") return <p role="status" className="p-2 text-xs text-emerald-300">Đã đồng bộ bài nộp lên máy chủ.</p>;
  return null;
};
