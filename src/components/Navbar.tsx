import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import {
  Code,
  Trophy,
  Users,
  BookOpen,
  FileText,
  Flame,
  Bell,
  Bot,
  LogOut,
  ShieldCheck
} from "lucide-react";

interface NavbarProps {
  onOpenAuth: () => void;
  onToggleAi: () => void;
  isAiOpen: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuth, onToggleAi, isAiOpen }) => {
  const {
    currentUser,
    logout,
    activeTab,
    setActiveTab,
    notifications,
    markNotificationAsRead,
    clearAllNotifications,
    triggerDailyReminder,
    getLessonProgressPercentage,
    teacherMode,
    setTeacherMode
  } = useApp();

  const [showNotifMenu, setShowNotifMenu] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const progressPercent = getLessonProgressPercentage();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200 text-slate-800 shadow-xs select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab("learn")}>
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-500 to-emerald-500 flex items-center justify-center shadow-md shadow-indigo-500/20">
              <Code className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 bg-clip-text text-transparent">
                  PyEdu
                </span>
                <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">
                  Python v3.12
                </span>
                {teacherMode && (
                  <span className="px-2 py-0.5 text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-300 rounded-full flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3" /> Chế độ giáo viên
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">Học lập trình & chấm điểm tự động</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center space-x-1">
            <button
              onClick={() => setActiveTab("learn")}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "learn"
                  ? "bg-indigo-600 text-white shadow-sm shadow-indigo-600/30"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Code className="h-4 w-4" />
              <span>Bài học & code</span>
            </button>

            <button
              onClick={() => setActiveTab("leaderboard")}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "leaderboard"
                  ? "bg-indigo-600 text-white shadow-sm shadow-indigo-600/30"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Trophy className="h-4 w-4 text-amber-500" />
              <span>Bảng xếp hạng</span>
            </button>

            <button
              onClick={() => setActiveTab("groups")}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "groups"
                  ? "bg-indigo-600 text-white shadow-sm shadow-indigo-600/30"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Users className="h-4 w-4 text-blue-500" />
              <span>Học nhóm</span>
            </button>

            <button
              onClick={() => setActiveTab("notes")}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "notes"
                  ? "bg-indigo-600 text-white shadow-sm shadow-indigo-600/30"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <FileText className="h-4 w-4 text-emerald-500" />
              <span>Ghi chú</span>
            </button>

            <button
              onClick={() => setActiveTab("handbook")}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "handbook"
                  ? "bg-indigo-600 text-white shadow-sm shadow-indigo-600/30"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <BookOpen className="h-4 w-4 text-purple-500" />
              <span>Sổ tay ngoại tuyến</span>
            </button>
          </nav>

          {/* Right Action Tools: Streak, Progress, AI, Notifications, User Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Streak Counter */}
            {currentUser && (
              <div
                onClick={() => setActiveTab("profile")}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-orange-50 border border-orange-200 text-orange-600 text-xs font-semibold cursor-pointer hover:bg-orange-100 transition-colors"
                title={`Chuỗi học tập liên tục: ${currentUser.streakDays} ngày. Mục tiêu hàng ngày: ${currentUser.dailyGoal} phút.`}
              >
                <Flame className="h-4 w-4 text-orange-500 fill-orange-500 animate-pulse" />
                <span>{currentUser.streakDays} ngày</span>
              </div>
            )}

            {/* Curriculum Progress Tooltip */}
            <div
              className="hidden lg:flex items-center gap-2 px-2.5 py-1.5 bg-slate-100 border border-slate-200 rounded-lg text-xs cursor-pointer hover:border-slate-300"
              onClick={() => setActiveTab("learn")}
              title={`Tiến độ khóa học: ${progressPercent}%`}
            >
              <div className="w-16 bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 to-emerald-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="font-semibold text-slate-700">{progressPercent}%</span>
            </div>

            {/* 24/7 AI Tutor Toggle Button */}
            <button
              onClick={onToggleAi}
              className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                isAiOpen
                  ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-indigo-500/30"
                  : "bg-violet-50 text-violet-700 hover:bg-violet-100 border border-violet-200"
              }`}
              title="Mở Trợ lý Giáo viên AI 24/7 để giải đáp thắc mắc và gợi ý code"
            >
              <Bot className="h-4 w-4 text-violet-600 animate-bounce" />
              <span className="hidden sm:inline">AI Tutor 24/7</span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifMenu(!showNotifMenu)}
                className="relative p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 border border-slate-200 transition-colors"
                title="Thông báo & Nhắc nhở hàng ngày"
              >
                <Bell className="h-4 w-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown Menu */}
              {showNotifMenu && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="p-3 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                    <div className="flex items-center gap-2">
                      <Bell className="h-4 w-4 text-indigo-600" />
                      <span className="font-semibold text-sm text-slate-800">Thông báo & Nhắc nhở</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={triggerDailyReminder}
                        className="text-[11px] font-medium text-indigo-600 hover:text-indigo-800 hover:underline"
                        title="Thử kích hoạt thông báo nhắc nhở luyện code"
                      >
                        Thử báo giờ ⏰
                      </button>
                      <button
                        onClick={clearAllNotifications}
                        className="text-[11px] text-slate-400 hover:text-slate-600"
                      >
                        Xóa tất cả
                      </button>
                    </div>
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                    {notifications.length === 0 ? (
                      <div className="p-6 text-center text-slate-400 text-xs">
                        Không có thông báo mới nào.
                      </div>
                    ) : (
                      notifications.map((notif) => (
                        <div
                          key={notif.id}
                          onClick={() => {
                            markNotificationAsRead(notif.id);
                            if (notif.linkTab) setActiveTab(notif.linkTab as any);
                            setShowNotifMenu(false);
                          }}
                          className={`p-3 text-xs hover:bg-slate-50 cursor-pointer transition-colors ${
                            !notif.read ? "bg-indigo-50/60 border-l-2 border-indigo-600" : ""
                          }`}
                        >
                          <div className="flex items-center justify-between font-medium text-slate-800">
                            <span>{notif.title}</span>
                            <span className="text-[10px] text-slate-400">{notif.timestamp}</span>
                          </div>
                          <p className="text-slate-600 mt-1 line-clamp-2">{notif.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile / Auth Button */}
            {currentUser ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs shadow-xs">
                  <button
                    onClick={() => setActiveTab("profile")}
                    className="flex items-center gap-1.5 text-slate-800 hover:text-indigo-600 font-bold transition-colors cursor-pointer"
                    title="Xem hồ sơ & thành tích cá nhân"
                  >
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.fullName}
                      className="h-5 w-5 rounded-full bg-indigo-100"
                    />
                    <span className="truncate max-w-[120px] sm:max-w-[180px]">
                      Hi, {currentUser.fullName}
                    </span>
                  </button>
                  <span className="text-slate-300">|</span>
                  <button
                    onClick={logout}
                    className="text-rose-600 hover:text-rose-700 hover:underline font-semibold cursor-pointer flex items-center gap-1"
                    title="Đăng xuất khỏi hệ thống"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    <span>Đăng xuất</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-xs font-semibold bg-slate-100 border border-slate-200 p-1 rounded-xl shadow-xs">
                <button
                  onClick={onOpenAuth}
                  className="px-3 py-1 bg-indigo-600 text-white rounded-lg shadow-xs hover:bg-indigo-700 transition-colors cursor-pointer"
                >
                  Đăng nhập
                </button>
                <span className="text-slate-300 font-normal">|</span>
                <button
                  onClick={onOpenAuth}
                  className="px-3 py-1 text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
                >
                  Đăng ký
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation Tabs */}
        <div className="flex md:hidden overflow-x-auto py-2 border-t border-slate-200 space-x-1 scrollbar-none">
          <button
            onClick={() => setActiveTab("learn")}
            className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap font-medium ${
              activeTab === "learn" ? "bg-indigo-600 text-white" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Bài Học
          </button>
          <button
            onClick={() => setActiveTab("leaderboard")}
            className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap font-medium ${
              activeTab === "leaderboard" ? "bg-indigo-600 text-white" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Bảng Xếp Hạng
          </button>
          <button
            onClick={() => setActiveTab("groups")}
            className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap font-medium ${
              activeTab === "groups" ? "bg-indigo-600 text-white" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Học Nhóm
          </button>
          <button
            onClick={() => setActiveTab("notes")}
            className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap font-medium ${
              activeTab === "notes" ? "bg-indigo-600 text-white" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Ghi Chú
          </button>
          <button
            onClick={() => setActiveTab("handbook")}
            className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap font-medium ${
              activeTab === "handbook" ? "bg-indigo-600 text-white" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Sổ Tay
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap font-medium ${
              activeTab === "profile" ? "bg-indigo-600 text-white" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Hồ Sơ
          </button>
        </div>
      </div>
    </header>
  );
};
