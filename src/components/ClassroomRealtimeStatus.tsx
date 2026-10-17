import React from "react";
import { useApp } from "../context/AppContext";

export const ClassroomRealtimeStatus: React.FC = () => {
  const { classroomConnection } = useApp();
  const labels = {
    live: "Realtime đang hoạt động · Tự cập nhật khi có bài nộp mới",
    connecting: "Đang kết nối realtime...",
    reconnecting: "Đang kết nối lại realtime · Tạm cập nhật định kỳ",
    offline: "Chưa có kết nối realtime · Tạm cập nhật định kỳ",
  };
  return <p role="status" className={`text-xs ${classroomConnection === "live" ? "text-emerald-700" : "text-amber-700"}`}>{labels[classroomConnection]}</p>;
};
