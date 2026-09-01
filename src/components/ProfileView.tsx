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
    modules,
    getLessonProgressPercentage,
    lessonSubmissions,
    algorithmProblems,
    algorithmSubmissions,
    solvedProblemIds,
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

  const totalLessons = modules.flatMap(m => m.lessons).length || 1;
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
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-50 text-slate-800 max-w-6xl mx-auto space-y-6">
      {/* Top Profile Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <img
            src={currentUser.avatar}
            alt={currentUser.fullName}
            className="h-24 w-24 rounded-3xl bg-slate-100 border-2 border-indigo-200 shadow-xs"
          />

          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                {currentUser.fullName}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100 flex items-center gap-1">
                <GraduationCap className="h-3.5 w-3.5" />
                {currentUser.grade}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                {currentUser.role === 'teacher' ? 'Giáo viên Tin học' : 'Học sinh'}
              </span>
            </div>

            <p className="text-xs text-slate-500">
              @{currentUser.username} • {currentUser.email} • {currentUser.school}
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl">
                <p className="text-[10px] text-slate-500 uppercase font-semibold">Tổng Kinh Nghiệm</p>
                <p className="text-lg font-black text-amber-600 font-mono">{currentUser.totalXp} XP</p>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl">
                <p className="text-[10px] text-slate-500 uppercase font-semibold">Chuỗi Ngày Streak</p>
                <p className="text-lg font-black text-orange-600 flex items-center gap-1">
                  <Flame className="h-5 w-5 fill-orange-500 text-orange-500" /> {currentUser.streakDays} ngày
                </p>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl">
                <p className="text-[10px] text-slate-500 uppercase font-semibold">Bài Học Đã Xong</p>
                <p className="text-lg font-black text-emerald-600">
                  {currentUser.completedLessons.length} / {totalLessons}
                </p>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl">
                <p className="text-[10px] text-slate-500 uppercase font-semibold">Tỷ Lệ Chính Xác</p>
                <p className="text-lg font-black text-indigo-600">{accuracyRate}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT 2 COLS: Badges & Progress */}
        <div className="lg:col-span-2 space-y-6">
          {/* Progress Overview */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-base text-slate-900 flex items-center gap-2">
                <Zap className="h-4 w-4 text-indigo-600" />
                <span>Tiến Độ Lộ Trình Lý Thuyết & Thực Hành</span>
              </h2>
              <span className="text-xs font-bold text-indigo-600">{progressPercentage}% Hoàn thành</span>
            </div>

            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-indigo-500 via-blue-500 to-emerald-500 h-full rounded-full transition-all duration-700"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <p className="text-xs text-slate-500">
              Bạn đã hoàn thành {currentUser.completedLessons.length} trên tổng số {totalLessons} bài học & thực hành Python.
            </p>
          </div>

          {/* Algorithm Problem Solving Overview Card */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-base text-slate-900 flex items-center gap-2">
                <Target className="h-4 w-4 text-emerald-600" />
                <span>Thành Tích Giải Đề Thuật Toán</span>
              </h2>
              <span className="text-xs font-bold text-emerald-700">
                {solvedProblemIds.length}/{algorithmProblems.length} Bài Đã Giải
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-2xl">
                <div className="flex items-center justify-between text-xs font-bold text-emerald-800 mb-1">
                  <span>Cấp Tiểu Học</span>
                  <span>{algorithmProblems.filter(p => p.level === 'primary' && solvedProblemIds.includes(p.id)).length}/{algorithmProblems.filter(p => p.level === 'primary').length}</span>
                </div>
                <div className="w-full bg-emerald-200/60 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full"
                    style={{ width: `${algorithmProblems.filter(p => p.level === 'primary').length > 0 ? (algorithmProblems.filter(p => p.level === 'primary' && solvedProblemIds.includes(p.id)).length / algorithmProblems.filter(p => p.level === 'primary').length) * 100 : 0}%` }}
                  />
                </div>
              </div>

              <div className="p-3.5 bg-indigo-50/70 border border-indigo-200 rounded-2xl">
                <div className="flex items-center justify-between text-xs font-bold text-indigo-800 mb-1">
                  <span>Cấp THCS</span>
                  <span>{algorithmProblems.filter(p => p.level === 'secondary' && solvedProblemIds.includes(p.id)).length}/{algorithmProblems.filter(p => p.level === 'secondary').length}</span>
                </div>
                <div className="w-full bg-indigo-200/60 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-indigo-600 h-full rounded-full"
                    style={{ width: `${algorithmProblems.filter(p => p.level === 'secondary').length > 0 ? (algorithmProblems.filter(p => p.level === 'secondary' && solvedProblemIds.includes(p.id)).length / algorithmProblems.filter(p => p.level === 'secondary').length) * 100 : 0}%` }}
                  />
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-500">
              Tổng số lần nộp bài giải đề: {algorithmSubmissions.length} lượt nộp. Hãy tiếp tục giải thêm để thăng hạng trên Bảng xếp hạng Thuật toán! 🎯
            </p>
          </div>

          {/* Badges Collection Showcase */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-amber-500" />
                <h2 className="font-bold text-base text-slate-900">Bộ Sưu Tập Huy Hiệu Thành Tích</h2>
              </div>
              <span className="text-xs font-bold text-amber-600">
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
                        ? "bg-amber-50/50 border-amber-200 shadow-xs"
                        : "bg-slate-50/60 border-slate-200 opacity-60"
                    }`}
                  >
                    <div
                      className={`h-12 w-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 ${
                        isUnlocked
                          ? "bg-white border border-amber-200 shadow-xs"
                          : "bg-slate-100 border border-slate-200"
                      }`}
                    >
                      {isUnlocked ? badge.icon : <Lock className="h-5 w-5 text-slate-400" />}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                          {badge.name}
                        </h3>
                        {isUnlocked && (
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                        {badge.description}
                      </p>
                      <p className="text-[10px] text-slate-400 mt-1 italic">
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
            className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4"
          >
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-base">
              <Bell className="h-5 w-5" />
              <h2>Cài Đặt Nhắc Nhở Hàng Ngày</h2>
            </div>
            <p className="text-xs text-slate-500">
              Nhận thông báo tự động mỗi ngày để rèn luyện thói quen lập trình và duy trì chuỗi Streak.
            </p>

            {savedSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 text-xs flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                <span>Đã lưu cấu hình nhắc nhở thành công!</span>
              </div>
            )}

            {/* Toggle Enable */}
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-200">
              <div>
                <p className="text-xs font-bold text-slate-900">Bật nhắc nhở hàng ngày</p>
                <p className="text-[10px] text-slate-500">Thông báo vào khung giờ học</p>
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
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-indigo-600" />
                <span>Giờ nhắc nhở mỗi ngày</span>
              </label>
              <input
                type="time"
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-indigo-600 font-mono shadow-xs"
              />
            </div>

            {/* Daily Goal */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                <Target className="h-3.5 w-3.5 text-orange-500" />
                <span>Mục tiêu rèn luyện hàng ngày (Phút)</span>
              </label>
              <select
                value={dailyGoal}
                onChange={(e) => setDailyGoal(Number(e.target.value))}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-indigo-600 shadow-xs"
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
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Save className="h-4 w-4" />
                <span>Lưu Cài Đặt Nhắc Nhở</span>
              </button>

              <button
                type="button"
                onClick={triggerDailyReminder}
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
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
