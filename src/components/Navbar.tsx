import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import {
  Code,
  Trophy,
  Users,
  BookOpen,
  FileText,
  UserCheck,
  Flame,
  Bell,
  Sparkles,
  Bot,
  LogOut,
  User as UserIcon,
  ShieldCheck,
  Clock,
  CheckCircle2,
  Lock,
  ChevronDown
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
  const [showUserMenu, setShowUserMenu] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const progressPercent = getLessonProgressPercentage();

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur border-b border-slate-800 text-white select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab("learn")}>
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Code className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-blue-400 via-indigo-300 to-emerald-400 bg-clip-text text-transparent">
                  PyEdu
                </span>
                <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">
                  Python v3.12
                </span>
                {teacherMode && (
                  <span className="px-2 py-0.5 text-[10px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3" /> Chế độ giáo viên
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">Học lập trình & chấm điểm tự động</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center space-x-1">
            <button
              onClick={() => setActiveTab("learn")}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                activeTab === "learn"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "text-slate-300 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Code className="h-4 w-4" />
              <span>Bài học & code</span>
            </button>

            <button
              onClick={() => setActiveTab("leaderboard")}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                activeTab === "leaderboard"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "text-slate-300 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Trophy className="h-4 w-4 text-amber-400" />
              <span>Bảng xếp hạng</span>
            </button>

            <button
              onClick={() => setActiveTab("groups")}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                activeTab === "groups"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "text-slate-300 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Users className="h-4 w-4 text-blue-400" />
              <span>Học nhóm</span>
            </button>

            <button
              onClick={() => setActiveTab("notes")}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                activeTab === "notes"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "text-slate-300 hover:text-white hover:bg-slate-800"
              }`}
            >
              <FileText className="h-4 w-4 text-emerald-400" />
              <span>Ghi chú</span>
            </button>

            <button
              onClick={() => setActiveTab("handbook")}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                activeTab === "handbook"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "text-slate-300 hover:text-white hover:bg-slate-800"
              }`}
            >
              <BookOpen className="h-4 w-4 text-purple-400" />
              <span>Sổ tay ngoại tuyến</span>
            </button>
          </nav>

          {/* Right Action Tools: Streak, Progress, AI, Notifications, User Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Streak Counter */}
            {currentUser && (
              <div
                onClick={() => setActiveTab("profile")}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold cursor-pointer hover:bg-orange-500/20 transition-colors"
                title={`Chuỗi học tập liên tục: ${currentUser.streakDays} ngày. Mục tiêu hàng ngày: ${currentUser.dailyGoal} phút.`}
              >
                <Flame className="h-4 w-4 text-orange-500 fill-orange-500 animate-pulse" />
                <span>{currentUser.streakDays} ngày</span>
              </div>
            )}

            {/* Curriculum Progress Tooltip */}
            <div
              className="hidden lg:flex items-center gap-2 px-2.5 py-1.5 bg-slate-800/80 border border-slate-700 rounded-lg text-xs cursor-pointer hover:border-slate-600"
              onClick={() => setActiveTab("learn")}
              title={`Tiến độ khóa học: ${progressPercent}%`}
            >
              <div className="w-16 bg-slate-700 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 to-emerald-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="font-semibold text-slate-300">{progressPercent}%</span>
            </div>

            {/* 24/7 AI Tutor Toggle Button */}
            <button
              onClick={onToggleAi}
              className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                isAiOpen
                  ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-indigo-500/30"
                  : "bg-slate-800 text-violet-300 hover:bg-slate-700 border border-violet-500/30"
              }`}
              title="Mở Trợ lý Giáo viên AI 24/7 để giải đáp thắc mắc và gợi ý code"
            >
              <Bot className="h-4 w-4 text-violet-400 animate-bounce" />
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
                className="relative p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
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
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="p-3 border-b border-slate-700 flex items-center justify-between bg-slate-850">
                    <div className="flex items-center gap-2">
                      <Bell className="h-4 w-4 text-indigo-400" />
                      <span className="font-semibold text-sm">Thông báo & Nhắc nhở</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={triggerDailyReminder}
                        className="text-[11px] text-indigo-400 hover:text-indigo-300 hover:underline"
                        title="Thử kích hoạt thông báo nhắc nhở luyện code"
                      >
                        Thử báo giờ ⏰
                      </button>
                      <button
                        onClick={clearAllNotifications}
                        className="text-[11px] text-slate-400 hover:text-slate-300"
                      >
                        Xóa tất cả
                      </button>
                    </div>
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-700/50">
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
                          className={`p-3 text-xs hover:bg-slate-700/60 cursor-pointer transition-colors ${
                            !notif.read ? "bg-indigo-950/40 border-l-2 border-indigo-500" : ""
                          }`}
                        >
                          <div className="flex items-center justify-between font-medium text-slate-200">
                            <span>{notif.title}</span>
                            <span className="text-[10px] text-slate-400">{notif.timestamp}</span>
                          </div>
                          <p className="text-slate-400 mt-1 line-clamp-2">{notif.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile / Auth Button */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors border border-slate-700"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.fullName}
                    className="h-7 w-7 rounded-full bg-indigo-900"
                  />
                  <span className="text-xs font-medium text-slate-200 hidden md:block max-w-[100px] truncate">
                    {currentUser.fullName.split(" ").slice(-1)[0]}
                  </span>
                  <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-64 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl overflow-hidden z-50">
                    <div className="p-3 border-b border-slate-700 bg-slate-850">
                      <p className="font-semibold text-sm text-white truncate">{currentUser.fullName}</p>
                      <p className="text-xs text-slate-400 truncate">{currentUser.email}</p>
                      <div className="mt-2 flex items-center justify-between text-xs text-slate-300">
                        <span className="px-2 py-0.5 bg-indigo-900/60 text-indigo-300 rounded-full font-medium">
                          {currentUser.grade}
                        </span>
                        <span className="font-bold text-amber-400">{currentUser.totalXp} XP</span>
                      </div>
                    </div>

                    <div className="p-2 space-y-1 text-xs">
                      <button
                        onClick={() => {
                          setActiveTab("profile");
                          setShowUserMenu(false);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                      >
                        <UserIcon className="h-4 w-4 text-indigo-400" />
                        <span>Hồ sơ & Thành tích cá nhân</span>
                      </button>

                      <button
                        onClick={() => {
                          setTeacherMode(!teacherMode);
                          setShowUserMenu(false);
                        }}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="h-4 w-4 text-amber-400" />
                          <span>Mở khóa toàn bộ bài giảng</span>
                        </div>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${teacherMode ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-700 text-slate-400"}`}>
                          {teacherMode ? "BẬT" : "TẮT"}
                        </span>
                      </button>

                      <button
                        onClick={() => {
                          onOpenAuth();
                          setShowUserMenu(false);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                      >
                        <UserCheck className="h-4 w-4 text-blue-400" />
                        <span>Đổi tài khoản / Đăng ký mới</span>
                      </button>

                      <div className="border-t border-slate-700 my-1"></div>

                      <button
                        onClick={() => {
                          logout();
                          setShowUserMenu(false);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Đăng xuất</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-md shadow-indigo-600/30 transition-all"
              >
                <UserIcon className="h-4 w-4" />
                <span>Đăng nhập / Đăng ký</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation Tabs */}
        <div className="flex md:hidden overflow-x-auto py-2 border-t border-slate-800 space-x-1 scrollbar-none">
          <button
            onClick={() => setActiveTab("learn")}
            className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap font-medium ${
              activeTab === "learn" ? "bg-indigo-600 text-white" : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            Bài Học
          </button>
          <button
            onClick={() => setActiveTab("leaderboard")}
            className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap font-medium ${
              activeTab === "leaderboard" ? "bg-indigo-600 text-white" : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            Bảng Xếp Hạng
          </button>
          <button
            onClick={() => setActiveTab("groups")}
            className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap font-medium ${
              activeTab === "groups" ? "bg-indigo-600 text-white" : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            Học Nhóm
          </button>
          <button
            onClick={() => setActiveTab("notes")}
            className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap font-medium ${
              activeTab === "notes" ? "bg-indigo-600 text-white" : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            Ghi Chú
          </button>
          <button
            onClick={() => setActiveTab("handbook")}
            className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap font-medium ${
              activeTab === "handbook" ? "bg-indigo-600 text-white" : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            Sổ Tay
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap font-medium ${
              activeTab === "profile" ? "bg-indigo-600 text-white" : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            Hồ Sơ
          </button>
        </div>
      </div>
    </header>
  );
};
