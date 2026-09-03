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
  ShieldCheck,
  Target,
  BarChart3,
  Layers,
  ExternalLink
} from "lucide-react";

interface NavbarProps {
  onOpenAuth: () => void;
  onToggleAi: () => void;
  onOpenSupabaseSync?: () => void;
  isAiOpen: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuth, onToggleAi, onOpenSupabaseSync, isAiOpen }) => {
  const {
    currentUser,
    logout,
    activeTab,
    setActiveTab,
    adminSection,
    setAdminSection,
    notifications,
    markNotificationAsRead,
    clearAllNotifications,
    triggerDailyReminder,
    getLessonProgressPercentage,
    teacherMode,
  } = useApp();

  const [showNotifMenu, setShowNotifMenu] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const progressPercent = getLessonProgressPercentage();
  const isAdmin = currentUser?.role === "admin";

  const handleAdminNav = (section: 'users' | 'stats' | 'curriculum' | 'algorithms') => {
    setActiveTab('admin');
    setAdminSection(section);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200 text-slate-800 shadow-xs select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => {
              if (isAdmin) {
                setActiveTab("admin");
                setAdminSection("users");
              } else {
                setActiveTab("learn");
              }
            }}
          >
            <div
              className={`h-10 w-10 rounded-xl flex items-center justify-center shadow-md ${
                isAdmin
                  ? "bg-gradient-to-tr from-purple-700 via-indigo-600 to-indigo-800 shadow-purple-500/25"
                  : "bg-gradient-to-tr from-indigo-600 via-blue-500 to-emerald-500 shadow-indigo-500/20"
              }`}
            >
              {isAdmin ? (
                <ShieldCheck className="h-5 w-5 text-white" />
              ) : (
                <Code className="h-5 w-5 text-white" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
                  {isAdmin ? "PyEdu Admin Portal" : "PyEdu"}
                </span>
                {isAdmin ? (
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-purple-100 text-purple-800 border border-purple-300 rounded-full flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3 text-purple-600" /> Hệ Thống Quản Trị
                  </span>
                ) : (
                  <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">
                    Python v3.12
                  </span>
                )}
                {!isAdmin && teacherMode && (
                  <span className="px-2 py-0.5 text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-300 rounded-full flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3" /> Chế độ giáo viên
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                {isAdmin
                  ? "Bảng điều khiển quản trị trung tâm & CSDL Supabase Direct"
                  : "Học lập trình & chấm điểm tự động"}
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          {isAdmin ? (
            /* ADMIN ONLY HORIZONTAL NAVIGATION */
            <nav className="hidden md:flex items-center space-x-1">
              <button
                onClick={() => handleAdminNav("users")}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                  activeTab === "admin" && adminSection === "users"
                    ? "bg-purple-700 text-white shadow-md shadow-purple-700/25"
                    : "text-slate-600 hover:text-purple-900 hover:bg-purple-50"
                }`}
              >
                <Users className="h-4 w-4" />
                <span>Người Dùng</span>
              </button>

              <button
                onClick={() => handleAdminNav("stats")}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                  activeTab === "admin" && adminSection === "stats"
                    ? "bg-purple-700 text-white shadow-md shadow-purple-700/25"
                    : "text-slate-600 hover:text-purple-900 hover:bg-purple-50"
                }`}
              >
                <BarChart3 className="h-4 w-4 text-indigo-500" />
                <span>Thống Kê & Báo Cáo</span>
              </button>

              <button
                onClick={() => handleAdminNav("curriculum")}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                  activeTab === "admin" && adminSection === "curriculum"
                    ? "bg-purple-700 text-white shadow-md shadow-purple-700/25"
                    : "text-slate-600 hover:text-purple-900 hover:bg-purple-50"
                }`}
              >
                <Layers className="h-4 w-4 text-amber-500" />
                <span>Khóa Học & Bài Học</span>
              </button>

              <button
                onClick={() => handleAdminNav("algorithms")}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                  activeTab === "admin" && adminSection === "algorithms"
                    ? "bg-purple-700 text-white shadow-md shadow-purple-700/25"
                    : "text-slate-600 hover:text-purple-900 hover:bg-purple-50"
                }`}
              >
                <Target className="h-4 w-4 text-rose-500" />
                <span>Ngân Hàng Thuật Toán</span>
              </button>
            </nav>
          ) : (
            /* STUDENT / LEARNER HORIZONTAL NAVIGATION */
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
                onClick={() => setActiveTab("algorithms")}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === "algorithms"
                    ? "bg-indigo-600 text-white shadow-sm shadow-indigo-600/30"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <Target className="h-4 w-4 text-emerald-500" />
                <span className="flex items-center gap-1.5">
                  Giải đề (Thuật toán)
                  <span className="px-1.5 py-0.2 text-[9px] font-bold bg-amber-100 text-amber-800 rounded-full border border-amber-300">
                    Mới
                  </span>
                </span>
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

              <a
                href="/Sotay.html"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all cursor-pointer"
                title="Mở Sổ tay tra cứu lập trình Python (Sotay.html) trong tab mới"
              >
                <BookOpen className="h-4 w-4 text-purple-600" />
                <span>Sổ tay</span>
                <ExternalLink className="h-3.5 w-3.5 text-slate-400 ml-0.5" />
              </a>
            </nav>
          )}

          {/* Right Action Tools */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Student-only right tools */}
            {!isAdmin && (
              <>
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

                {/* Curriculum Progress */}
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

                {/* 24/7 AI Tutor Button */}
                <button
                  onClick={onToggleAi}
                  className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
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
              </>
            )}

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifMenu(!showNotifMenu)}
                className="relative p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 border border-slate-200 transition-colors cursor-pointer"
                title="Thông báo & Cảnh báo hệ thống"
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
                      <span className="font-semibold text-sm text-slate-800">Thông báo hệ thống</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {!isAdmin && (
                        <button
                          onClick={triggerDailyReminder}
                          className="text-[11px] font-medium text-indigo-600 hover:text-indigo-800 hover:underline cursor-pointer"
                          title="Thử kích hoạt thông báo nhắc nhở luyện code"
                        >
                          Thử báo giờ ⏰
                        </button>
                      )}
                      <button
                        onClick={clearAllNotifications}
                        className="text-[11px] text-slate-400 hover:text-slate-600 cursor-pointer"
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
                            if (notif.linkTab && !isAdmin) setActiveTab(notif.linkTab as any);
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
                <div
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs shadow-xs ${
                    isAdmin
                      ? "bg-purple-50/80 border-purple-200 text-purple-950"
                      : "bg-slate-100 border-slate-200 text-slate-800"
                  }`}
                >
                  <button
                    onClick={() => {
                      if (isAdmin) {
                        setActiveTab("admin");
                        setAdminSection("users");
                      } else {
                        setActiveTab("profile");
                      }
                    }}
                    className="flex items-center gap-1.5 font-bold transition-colors cursor-pointer hover:text-indigo-600"
                    title={isAdmin ? "Quản trị viên hệ thống" : "Xem hồ sơ cá nhân"}
                  >
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.fullName}
                      className="h-5 w-5 rounded-full bg-indigo-100"
                    />
                    <span className="truncate max-w-[120px] sm:max-w-[160px]">
                      {isAdmin ? `Admin (${currentUser.username})` : `Hi, ${currentUser.fullName}`}
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
          {isAdmin ? (
            <>
              <button
                onClick={() => handleAdminNav("users")}
                className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap font-bold ${
                  activeTab === "admin" && adminSection === "users"
                    ? "bg-purple-700 text-white"
                    : "text-slate-600 hover:bg-purple-50"
                }`}
              >
                👥 Người Dùng
              </button>
              <button
                onClick={() => handleAdminNav("stats")}
                className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap font-bold ${
                  activeTab === "admin" && adminSection === "stats"
                    ? "bg-purple-700 text-white"
                    : "text-slate-600 hover:bg-purple-50"
                }`}
              >
                📊 Thống Kê
              </button>
              <button
                onClick={() => handleAdminNav("curriculum")}
                className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap font-bold ${
                  activeTab === "admin" && adminSection === "curriculum"
                    ? "bg-purple-700 text-white"
                    : "text-slate-600 hover:bg-purple-50"
                }`}
              >
                📋 Khóa Học
              </button>
              <button
                onClick={() => handleAdminNav("algorithms")}
                className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap font-bold ${
                  activeTab === "admin" && adminSection === "algorithms"
                    ? "bg-purple-700 text-white"
                    : "text-slate-600 hover:bg-purple-50"
                }`}
              >
                🎯 Thuật Toán
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setActiveTab("learn")}
                className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap font-medium ${
                  activeTab === "learn" ? "bg-indigo-600 text-white" : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                Bài Học
              </button>
              <button
                onClick={() => setActiveTab("algorithms")}
                className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap font-medium ${
                  activeTab === "algorithms" ? "bg-indigo-600 text-white" : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                Giải Đề 🎯
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
              <a
                href="/Sotay.html"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg text-xs whitespace-nowrap font-medium text-slate-600 hover:bg-slate-100 flex items-center gap-1"
                title="Mở Sổ tay tra cứu lập trình Python (Sotay.html) trong tab mới"
              >
                <BookOpen className="h-3 w-3 text-purple-600" />
                <span>Sổ Tay</span>
                <ExternalLink className="h-3 w-3 text-slate-400" />
              </a>
              <button
                onClick={() => setActiveTab("profile")}
                className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap font-medium ${
                  activeTab === "profile" ? "bg-indigo-600 text-white" : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                Hồ Sơ
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
