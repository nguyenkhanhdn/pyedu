import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { SubmissionResult } from "../types";
import {
  User as UserIcon,
  Award,
  Flame,
  Clock,
  Bell,
  CheckCircle2,
  Lock,
  Calendar,
  Zap,
  Target,
  Sparkles,
  Save,
  GraduationCap
} from "lucide-react";

export const ProfileView: React.FC = () => {
  const {
    currentUser,
    updateUserProfile,
    badges,
    getLessonProgressPercentage,
    lessonSubmissions,
    triggerDailyReminder
  } = useApp();

  const [reminderEnabled, setReminderEnabled] = useState<boolean>(
    currentUser?.reminderEnabled ?? true
  );
  const [reminderTime, setReminderTime] = useState<string>(
    currentUser?.reminderTime ?? "19:30"
  );
  const [dailyGoal, setDailyGoal] = useState<number>(
    currentUser?.dailyGoal ?? 20
  );
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  if (!currentUser) return null;

  const progressPercentage = getLessonProgressPercentage();
  const allSubmissionsList: SubmissionResult[] = Object.values(lessonSubmissions).flat() as SubmissionResult[];
  const totalSubmissions = allSubmissionsList.length;
  const passedSubmissions = allSubmissionsList.filter((s: SubmissionResult) => s.passed).length;
  const accuracyRate =
    totalSubmissions > 0
      ? Math.round((passedSubmissions / totalSubmissions) * 100)
      : 100;

  const handleSaveReminderSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      reminderEnabled,
      reminderTime,
      dailyGoal
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-950 text-slate-100 max-w-6xl mx-auto space-y-6">
      {/* Top Profile Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-950 via-slate-900 to-slate-900 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <img
            src={currentUser.avatar}
            alt={currentUser.fullName}
            className="h-24 w-24 rounded-3xl bg-slate-800 border-2 border-indigo-500/50 shadow-2xl"
          />

          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {currentUser.fullName}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 flex items-center gap-1">
                <GraduationCap className="h-3.5 w-3.5" />
                {currentUser.grade}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                {currentUser.role === 'teacher' ? 'Giáo viên Tin học' : 'Học sinh'}
              </span>
            </div>

            <p className="text-xs text-slate-400">
              @{currentUser.username} • {currentUser.email} • {currentUser.school}
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
              <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-2xl">
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Tổng Kinh Nghiệm</p>
                <p className="text-lg font-black text-amber-400 font-mono">{currentUser.totalXp} XP</p>
              </div>

              <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-2xl">
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Chuỗi Ngày Streak</p>
                <p className="text-lg font-black text-orange-400 flex items-center gap-1">
                  <Flame className="h-5 w-5 fill-orange-400" /> {currentUser.streakDays} ngày
                </p>
              </div>

              <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-2xl">
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Bài Học Đã Xong</p>
                <p className="text-lg font-black text-emerald-400">
                  {currentUser.completedLessons.length} / 13
                </p>
              </div>

              <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-2xl">
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Tỷ Lệ Chính Xác</p>
                <p className="text-lg font-black text-indigo-400">{accuracyRate}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT 2 COLS: Badges & Progress */}
        <div className="lg:col-span-2 space-y-6">
          {/* Progress Overview */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-lg">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-base text-white flex items-center gap-2">
                <Zap className="h-4 w-4 text-indigo-400" />
                <span>Tiến Độ Lộ Trình Python</span>
              </h2>
              <span className="text-xs font-bold text-indigo-400">{progressPercentage}% Hoàn thành</span>
            </div>

            <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-indigo-500 via-blue-500 to-emerald-400 h-full rounded-full transition-all duration-700"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <p className="text-xs text-slate-400">
              Bạn đã hoàn thành {currentUser.completedLessons.length} trên tổng số 13 bài tập và thử thách thuật toán.
            </p>
          </div>

          {/* Badges Collection Showcase */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-amber-400" />
                <h2 className="font-bold text-base text-white">Bộ Sưu Tập Huy Hiệu Thành Tích</h2>
              </div>
              <span className="text-xs font-bold text-amber-400">
                {currentUser.badges.length}/{badges.length} Đã Mở Khóa
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {badges.map((badge) => {
                const isUnlocked = currentUser.badges.includes(badge.id);
                return (
                  <div
                    key={badge.id}
                    className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                      isUnlocked
                        ? "bg-gradient-to-br from-indigo-950/40 to-slate-850 border-indigo-500/40 shadow-md"
                        : "bg-slate-950/60 border-slate-800/80 opacity-50"
                    }`}
                  >
                    <div
                      className={`h-12 w-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 ${
                        isUnlocked
                          ? "bg-slate-800 border border-indigo-500/30 shadow-inner"
                          : "bg-slate-900 border border-slate-800"
                      }`}
                    >
                      {isUnlocked ? badge.icon : <Lock className="h-5 w-5 text-slate-600" />}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-bold text-xs sm:text-sm text-white truncate">
                          {badge.name}
                        </h3>
                        {isUnlocked && (
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                        {badge.description}
                      </p>
                      <p className="text-[10px] text-slate-500 mt-1 italic">
                        Yêu cầu: {badge.requirement}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT COL: Daily Reminders & Study Goal Settings */}
        <div className="space-y-6">
          <form
            onSubmit={handleSaveReminderSettings}
            className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-lg space-y-4"
          >
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-base">
              <Bell className="h-5 w-5" />
              <h2>Cài Đặt Nhắc Nhở Hàng Ngày</h2>
            </div>
            <p className="text-xs text-slate-400">
              Nhận thông báo tự động mỗi ngày để rèn luyện thói quen lập trình và duy trì chuỗi Streak.
            </p>

            {savedSuccess && (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                <span>Đã lưu cấu hình nhắc nhở thành công!</span>
              </div>
            )}

            {/* Toggle Enable */}
            <div className="flex items-center justify-between p-3 bg-slate-850 rounded-2xl border border-slate-800">
              <div>
                <p className="text-xs font-bold text-white">Bật nhắc nhở hàng ngày</p>
                <p className="text-[10px] text-slate-400">Thông báo vào khung giờ học</p>
              </div>
              <input
                type="checkbox"
                checked={reminderEnabled}
                onChange={(e) => setReminderEnabled(e.target.checked)}
                className="h-5 w-5 accent-indigo-600 rounded cursor-pointer"
              />
            </div>

            {/* Reminder Time */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-indigo-400" />
                <span>Giờ nhắc nhở mỗi ngày</span>
              </label>
              <input
                type="time"
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
              />
            </div>

            {/* Daily Goal */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                <Target className="h-3.5 w-3.5 text-orange-400" />
                <span>Mục tiêu rèn luyện hàng ngày (Phút)</span>
              </label>
              <select
                value={dailyGoal}
                onChange={(e) => setDailyGoal(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                <option value={15}>15 phút / ngày (Nhẹ nhàng)</option>
                <option value={20}>20 phút / ngày (Tiêu chuẩn)</option>
                <option value={30}>30 phút / ngày (Chăm chỉ)</option>
                <option value={45}>45 phút / ngày (Nâng cao)</option>
                <option value={60}>60 phút / ngày (Đội tuyển HSG)</option>
              </select>
            </div>

            <div className="pt-2 space-y-2">
              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-600/30 transition-all flex items-center justify-center gap-1.5"
              >
                <Save className="h-4 w-4" />
                <span>Lưu Cài Đặt Nhắc Nhở</span>
              </button>

              <button
                type="button"
                onClick={triggerDailyReminder}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl border border-slate-700 transition-colors"
              >
                🔔 Thử gửi thông báo nhắc nhở ngay
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
