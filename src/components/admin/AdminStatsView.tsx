import React from "react";
import { BarChart3, TrendingUp, Users, Award, BookOpen, Flame, GraduationCap, School } from "lucide-react";
import { useApp } from "../../context/AppContext";

export const AdminStatsView: React.FC = () => {
  const { allUsers } = useApp();

  const totalUsers = allUsers.length;
  const studentUsers = allUsers.filter((u) => u.role === "student");
  const teacherUsers = allUsers.filter((u) => u.role === "teacher");
  const adminUsers = allUsers.filter((u) => u.role === "admin");

  const totalXp = allUsers.reduce((sum, u) => sum + (u.totalXp || 0), 0);
  const totalCompletedLessons = allUsers.reduce((sum, u) => sum + (u.completedLessons?.length || 0), 0);
  const avgXp = totalUsers > 0 ? Math.round(totalXp / totalUsers) : 0;
  const maxStreak = allUsers.reduce((max, u) => Math.max(max, u.streakDays || 0), 0);

  // Group by grade
  const gradeDistribution = allUsers.reduce((acc, u) => {
    const gr = u.grade || "Khác";
    acc[gr] = (acc[gr] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Top 5 XP Leaders
  const topUsers = [...allUsers].sort((a, b) => b.totalXp - a.totalXp).slice(0, 5);

  return (
    <div className="space-y-6">
      {/* 4 Stat Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Tổng thành viên</p>
            <h3 className="text-2xl font-black text-slate-800">{totalUsers}</h3>
            <p className="text-[11px] text-slate-400">
              {studentUsers.length} học sinh • {teacherUsers.length} GV • {adminUsers.length} Admin
            </p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center">
            <Award className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Tổng điểm XP</p>
            <h3 className="text-2xl font-black text-slate-800">{totalXp.toLocaleString()}</h3>
            <p className="text-[11px] text-amber-600 font-medium">Trung bình {avgXp} XP / tài khoản</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Bài nộp đã chấm</p>
            <h3 className="text-2xl font-black text-slate-800">{totalCompletedLessons}</h3>
            <p className="text-[11px] text-emerald-600 font-medium">Chấm qua Python Engine</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center">
            <Flame className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Chuỗi Streak Kỷ lục</p>
            <h3 className="text-2xl font-black text-slate-800">{maxStreak} ngày</h3>
            <p className="text-[11px] text-rose-600 font-medium">Luyện code liên tục</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top 5 Học Sinh Xuất Sắc */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-amber-500" />
              <h3 className="font-bold text-sm text-slate-800">Top 5 Điểm XP Cao Nhất Toàn Trường</h3>
            </div>
            <span className="text-xs text-slate-400">Thời gian thực</span>
          </div>

          <div className="space-y-3">
            {topUsers.map((u, idx) => (
              <div
                key={u.id}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      idx === 0
                        ? "bg-amber-400 text-amber-950 shadow-xs"
                        : idx === 1
                        ? "bg-slate-300 text-slate-800"
                        : idx === 2
                        ? "bg-amber-600/30 text-amber-900"
                        : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <img src={u.avatar} alt={u.fullName} className="w-8 h-8 rounded-full bg-slate-200" />
                  <div>
                    <p className="font-bold text-slate-800 text-xs">{u.fullName}</p>
                    <p className="text-[11px] text-slate-400">@{u.username} • {u.grade}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-black text-indigo-600 text-sm">{u.totalXp.toLocaleString()} XP</span>
                  <p className="text-[10px] text-slate-400">{u.completedLessons.length} bài giải</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Phân bố theo khối lớp */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-indigo-600" />
              <h3 className="font-bold text-sm text-slate-800">Phân Bổ Người Dùng Theo Khối Lớp</h3>
            </div>
            <span className="text-xs text-slate-400">{Object.keys(gradeDistribution).length} nhóm</span>
          </div>

          <div className="space-y-3">
            {Object.entries(gradeDistribution).map(([grade, count]) => {
              const numCount = Number(count) || 0;
              const pct = totalUsers > 0 ? Math.round((numCount / totalUsers) * 100) : 0;
              return (
                <div key={grade} className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-1.5">
                    <span>{grade}</span>
                    <span className="text-indigo-600">{numCount} học sinh ({pct}%)</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
