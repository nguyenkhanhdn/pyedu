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
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-50 text-slate-800 max-w-6xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1">
                <Trophy className="h-3.5 w-3.5 text-amber-500" /> Bảng Vinh Danh PyEdu
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Bảng Xếp Hạng Thi Đua Lập Trình
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Cạnh tranh điểm kinh nghiệm (XP) qua các bài tập và thử thách thuật toán
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
            <button
              onClick={() => setBoardType('weekly')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                boardType === 'weekly'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Flame className="h-4 w-4" />
              <span>Bảng Tuần (Weekly Contest)</span>
            </button>
            <button
              onClick={() => setBoardType('allTime')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                boardType === 'allTime'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
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
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setFilterGrade('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
              filterGrade === 'all' ? 'bg-indigo-600 text-white shadow-xs' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Tất Cả
          </button>
          <button
            onClick={() => setFilterGrade('10')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
              filterGrade === '10' ? 'bg-indigo-600 text-white shadow-xs' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Khối 10
          </button>
          <button
            onClick={() => setFilterGrade('11')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
              filterGrade === '11' ? 'bg-indigo-600 text-white shadow-xs' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Khối 11
          </button>
          <button
            onClick={() => setFilterGrade('12')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
              filterGrade === '12' ? 'bg-indigo-600 text-white shadow-xs' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Khối 12 / Đội Tuyển
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="h-4 w-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo tên học sinh..."
            className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 shadow-xs"
          />
        </div>
      </div>

      {/* TOP 3 PODIUM */}
      {top3.length >= 3 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Rank 2 - Silver */}
          <div className="order-2 md:order-1 p-5 rounded-3xl bg-white border border-slate-200 flex flex-col items-center text-center relative overflow-hidden shadow-xs">
            <div className="absolute top-3 left-3 h-7 w-7 rounded-full bg-slate-200 text-slate-700 font-black text-xs flex items-center justify-center shadow-xs">
              2
            </div>
            <img
              src={top3[1].avatar}
              alt={top3[1].fullName}
              className="h-16 w-16 rounded-full border-2 border-slate-300 bg-slate-100 mb-3 shadow-xs"
            />
            <h3 className="font-bold text-sm text-slate-900 truncate max-w-full">{top3[1].fullName}</h3>
            <p className="text-xs text-slate-500 mb-2">{top3[1].grade}</p>
            <div className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800">
              {boardType === 'weekly' ? top3[1].weeklyXp : top3[1].totalXp} XP
            </div>
            <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-500">
              <span className="flex items-center gap-1 text-orange-600 font-semibold">
                <Flame className="h-3.5 w-3.5 fill-orange-500 text-orange-500" /> {top3[1].streakDays} ngày
              </span>
              <span>•</span>
              <span>{top3[1].solvedCount} bài giải</span>
            </div>
          </div>

          {/* Rank 1 - Gold (Centered & Elevated) */}
          <div className="order-1 md:order-2 p-6 rounded-3xl bg-amber-50/60 border-2 border-amber-300 flex flex-col items-center text-center relative overflow-hidden shadow-md md:-translate-y-2">
            <div className="absolute top-3 left-3 h-8 w-8 rounded-full bg-amber-400 text-slate-950 font-black text-sm flex items-center justify-center shadow-sm">
              1
            </div>
            <div className="relative mb-3">
              <img
                src={top3[0].avatar}
                alt={top3[0].fullName}
                className="h-20 w-20 rounded-full border-3 border-amber-400 bg-white shadow-md"
              />
              <Medal className="h-6 w-6 text-amber-500 absolute -bottom-1 -right-1 fill-amber-400 drop-shadow" />
            </div>
            <h3 className="font-bold text-base text-slate-900 truncate max-w-full">{top3[0].fullName}</h3>
            <p className="text-xs text-amber-700 font-medium mb-2">{top3[0].grade}</p>
            <div className="px-4 py-1.5 rounded-full bg-amber-400 text-slate-950 text-sm font-black shadow-xs">
              {boardType === 'weekly' ? top3[0].weeklyXp : top3[0].totalXp} XP
            </div>
            <div className="mt-3 flex items-center gap-3 text-xs text-slate-600">
              <span className="flex items-center gap-1 text-orange-600 font-bold">
                <Flame className="h-4 w-4 fill-orange-500 text-orange-500" /> {top3[0].streakDays} ngày
              </span>
              <span>•</span>
              <span>{top3[0].solvedCount} bài tập</span>
            </div>
          </div>

          {/* Rank 3 - Bronze */}
          <div className="order-3 p-5 rounded-3xl bg-white border border-slate-200 flex flex-col items-center text-center relative overflow-hidden shadow-xs">
            <div className="absolute top-3 left-3 h-7 w-7 rounded-full bg-amber-100 text-amber-800 font-black text-xs flex items-center justify-center shadow-xs border border-amber-200">
              3
            </div>
            <img
              src={top3[2].avatar}
              alt={top3[2].fullName}
              className="h-16 w-16 rounded-full border-2 border-amber-300 bg-slate-100 mb-3 shadow-xs"
            />
            <h3 className="font-bold text-sm text-slate-900 truncate max-w-full">{top3[2].fullName}</h3>
            <p className="text-xs text-slate-500 mb-2">{top3[2].grade}</p>
            <div className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800">
              {boardType === 'weekly' ? top3[2].weeklyXp : top3[2].totalXp} XP
            </div>
            <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-500">
              <span className="flex items-center gap-1 text-orange-600 font-semibold">
                <Flame className="h-3.5 w-3.5 fill-orange-500 text-orange-500" /> {top3[2].streakDays} ngày
              </span>
              <span>•</span>
              <span>{top3[2].solvedCount} bài giải</span>
            </div>
          </div>
        </div>
      )}

      {/* FULL LEADERBOARD TABLE */}
      <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
          <h2 className="font-bold text-sm text-slate-800 flex items-center gap-2">
            <Users className="h-4 w-4 text-indigo-600" />
            <span>Danh Sách Học Sinh ({filteredList.length})</span>
          </h2>
          <span className="text-xs text-slate-500">Cập nhật theo thời gian thực</span>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredList.map((entry) => {
            const isMe = entry.userId === currentUser?.id || entry.isCurrentUser;
            return (
              <div
                key={entry.userId}
                className={`p-3 sm:p-4 flex items-center justify-between gap-3 transition-colors ${
                  isMe
                    ? "bg-indigo-50/70 border-l-4 border-indigo-600"
                    : "hover:bg-slate-50/70"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={`w-7 text-center font-bold text-xs sm:text-sm ${
                      entry.rank === 1
                        ? "text-amber-600"
                        : entry.rank === 2
                        ? "text-slate-600"
                        : entry.rank === 3
                        ? "text-amber-700"
                        : "text-slate-400"
                    }`}
                  >
                    #{entry.rank}
                  </span>

                  <img
                    src={entry.avatar}
                    alt={entry.fullName}
                    className="h-10 w-10 rounded-xl bg-slate-100 flex-shrink-0"
                  />

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                        {entry.fullName}
                      </p>
                      {isMe && (
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-indigo-100 text-indigo-700 border border-indigo-200">
                          Bạn
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                      <span>{entry.grade}</span>
                      <span>•</span>
                      <span className="flex items-center gap-0.5 text-orange-600 font-semibold">
                        <Flame className="h-3 w-3 fill-orange-500 text-orange-500" /> {entry.streakDays}d
                      </span>
                      <span>•</span>
                      <span>{entry.solvedCount} bài</span>
                    </div>
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <p className="font-mono font-bold text-sm sm:text-base text-amber-600">
                    {boardType === 'weekly' ? entry.weeklyXp : entry.totalXp} XP
                  </p>
                  <p className="text-[10px] text-slate-400">
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
