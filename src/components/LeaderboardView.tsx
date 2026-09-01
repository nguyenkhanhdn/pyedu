import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Trophy, Medal, Flame, Award, Users, Search, Sparkles, Star } from "lucide-react";

export const LeaderboardView: React.FC = () => {
  const { leaderboard, weeklyLeaderboard, currentUser } = useApp();
  const [boardType, setBoardType] = useState<'weekly' | 'allTime'>('weekly');
  const [filterGrade, setFilterGrade] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const currentList = boardType === 'weekly' ? weeklyLeaderboard : leaderboard;

  const filteredList = currentList.filter(item => {
    const matchGrade = filterGrade === 'all' || item.grade.toLowerCase().includes(filterGrade.toLowerCase());
    const matchSearch = item.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || item.username.toLowerCase().includes(searchQuery.toLowerCase());
    return matchGrade && matchSearch;
  });

  const top3 = filteredList.slice(0, 3);
  const restList = filteredList.slice(3);

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-950 text-slate-100 max-w-6xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-950 via-slate-900 to-amber-950/40 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                <Trophy className="h-3.5 w-3.5" /> Bảng Vinh Danh PyEdu
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Bảng Xếp Hạng Thi Đua Lập Trình
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Cạnh tranh điểm kinh nghiệm (XP) qua các bài tập và thử thách thuật toán
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center bg-slate-900/90 p-1.5 rounded-2xl border border-slate-700">
            <button
              onClick={() => setBoardType('weekly')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                boardType === 'weekly'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Flame className="h-4 w-4" />
              <span>Bảng Tuần (Weekly Contest)</span>
            </button>
            <button
              onClick={() => setBoardType('allTime')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                boardType === 'allTime'
                  ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Star className="h-4 w-4" />
              <span>Toàn Khóa Học</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setFilterGrade('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              filterGrade === 'all' ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-800'
            }`}
          >
            Tất Cả
          </button>
          <button
            onClick={() => setFilterGrade('10')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              filterGrade === '10' ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-800'
            }`}
          >
            Khối 10
          </button>
          <button
            onClick={() => setFilterGrade('11')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              filterGrade === '11' ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-800'
            }`}
          >
            Khối 11
          </button>
          <button
            onClick={() => setFilterGrade('12')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              filterGrade === '12' ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-800'
            }`}
          >
            Khối 12 / Đội Tuyển
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="h-4 w-4 absolute left-3 top-2.5 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo tên học sinh..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* TOP 3 PODIUM */}
      {top3.length >= 3 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Rank 2 - Silver */}
          <div className="order-2 md:order-1 p-5 rounded-2xl bg-gradient-to-b from-slate-850 to-slate-900 border border-slate-700/80 flex flex-col items-center text-center relative overflow-hidden shadow-lg">
            <div className="absolute top-3 left-3 h-7 w-7 rounded-full bg-slate-300 text-slate-900 font-black text-xs flex items-center justify-center shadow">
              2
            </div>
            <img
              src={top3[1].avatar}
              alt={top3[1].fullName}
              className="h-16 w-16 rounded-full border-2 border-slate-300 bg-slate-800 mb-3 shadow-md"
            />
            <h3 className="font-bold text-sm text-white truncate max-w-full">{top3[1].fullName}</h3>
            <p className="text-xs text-slate-400 mb-2">{top3[1].grade}</p>
            <div className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200">
              {boardType === 'weekly' ? top3[1].weeklyXp : top3[1].totalXp} XP
            </div>
            <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-400">
              <span className="flex items-center gap-1 text-orange-400 font-semibold">
                <Flame className="h-3.5 w-3.5 fill-orange-400" /> {top3[1].streakDays} ngày
              </span>
              <span>•</span>
              <span>{top3[1].solvedCount} bài giải</span>
            </div>
          </div>

          {/* Rank 1 - Gold (Centered & Elevated) */}
          <div className="order-1 md:order-2 p-6 rounded-3xl bg-gradient-to-b from-amber-950/40 via-slate-900 to-slate-900 border-2 border-amber-500/50 flex flex-col items-center text-center relative overflow-hidden shadow-2xl md:-translate-y-2">
            <div className="absolute top-3 left-3 h-8 w-8 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black text-sm flex items-center justify-center shadow-lg">
              1
            </div>
            <div className="relative mb-3">
              <img
                src={top3[0].avatar}
                alt={top3[0].fullName}
                className="h-20 w-20 rounded-full border-3 border-amber-400 bg-slate-800 shadow-xl"
              />
              <Medal className="h-6 w-6 text-amber-400 absolute -bottom-1 -right-1 fill-amber-400 drop-shadow" />
            </div>
            <h3 className="font-bold text-base text-white truncate max-w-full">{top3[0].fullName}</h3>
            <p className="text-xs text-amber-300 font-medium mb-2">{top3[0].grade}</p>
            <div className="px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-sm font-black text-amber-300">
              {boardType === 'weekly' ? top3[0].weeklyXp : top3[0].totalXp} XP
            </div>
            <div className="mt-3 flex items-center gap-3 text-xs text-slate-300">
              <span className="flex items-center gap-1 text-orange-400 font-bold">
                <Flame className="h-4 w-4 fill-orange-400" /> {top3[0].streakDays} ngày
              </span>
              <span>•</span>
              <span>{top3[0].solvedCount} bài tập</span>
            </div>
          </div>

          {/* Rank 3 - Bronze */}
          <div className="order-3 p-5 rounded-2xl bg-gradient-to-b from-slate-850 to-slate-900 border border-slate-700/80 flex flex-col items-center text-center relative overflow-hidden shadow-lg">
            <div className="absolute top-3 left-3 h-7 w-7 rounded-full bg-amber-700 text-white font-black text-xs flex items-center justify-center shadow">
              3
            </div>
            <img
              src={top3[2].avatar}
              alt={top3[2].fullName}
              className="h-16 w-16 rounded-full border-2 border-amber-700 bg-slate-800 mb-3 shadow-md"
            />
            <h3 className="font-bold text-sm text-white truncate max-w-full">{top3[2].fullName}</h3>
            <p className="text-xs text-slate-400 mb-2">{top3[2].grade}</p>
            <div className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200">
              {boardType === 'weekly' ? top3[2].weeklyXp : top3[2].totalXp} XP
            </div>
            <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-400">
              <span className="flex items-center gap-1 text-orange-400 font-semibold">
                <Flame className="h-3.5 w-3.5 fill-orange-400" /> {top3[2].streakDays} ngày
              </span>
              <span>•</span>
              <span>{top3[2].solvedCount} bài giải</span>
            </div>
          </div>
        </div>
      )}

      {/* FULL LEADERBOARD TABLE */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden shadow-xl">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <h2 className="font-bold text-sm text-slate-200 flex items-center gap-2">
            <Users className="h-4 w-4 text-indigo-400" />
            <span>Danh Sách Học Sinh ({filteredList.length})</span>
          </h2>
          <span className="text-xs text-slate-400">Cập nhật theo thời gian thực</span>
        </div>

        <div className="divide-y divide-slate-800/80">
          {filteredList.map((entry) => {
            const isMe = entry.userId === currentUser?.id || entry.isCurrentUser;
            return (
              <div
                key={entry.userId}
                className={`p-3 sm:p-4 flex items-center justify-between gap-3 transition-colors ${
                  isMe
                    ? "bg-indigo-950/40 border-l-4 border-indigo-500"
                    : "hover:bg-slate-850"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={`w-7 text-center font-bold text-xs sm:text-sm ${
                      entry.rank === 1
                        ? "text-amber-400"
                        : entry.rank === 2
                        ? "text-slate-300"
                        : entry.rank === 3
                        ? "text-amber-600"
                        : "text-slate-500"
                    }`}
                  >
                    #{entry.rank}
                  </span>

                  <img
                    src={entry.avatar}
                    alt={entry.fullName}
                    className="h-10 w-10 rounded-xl bg-slate-800 flex-shrink-0"
                  />

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-xs sm:text-sm font-bold text-white truncate">
                        {entry.fullName}
                      </p>
                      {isMe && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                          Bạn
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400">
                      <span>{entry.grade}</span>
                      <span>•</span>
                      <span className="flex items-center gap-0.5 text-orange-400 font-semibold">
                        <Flame className="h-3 w-3 fill-orange-400" /> {entry.streakDays}d
                      </span>
                      <span>•</span>
                      <span>{entry.solvedCount} bài</span>
                    </div>
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <p className="font-mono font-bold text-sm sm:text-base text-amber-400">
                    {boardType === 'weekly' ? entry.weeklyXp : entry.totalXp} XP
                  </p>
                  <p className="text-[10px] text-slate-500">
                    {boardType === 'weekly' ? 'Tuần này' : 'Tổng tích lũy'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
