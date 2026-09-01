import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import {
  Code2,
  LogIn,
  UserPlus,
  Sparkles,
  Shield,
  GraduationCap,
  CheckCircle2,
  Terminal,
  Cpu,
  Trophy,
  Flame,
  BookOpen,
  Database,
  ArrowRight,
  School,
  Lock,
  Mail,
  User as UserIcon,
  ChevronRight
} from "lucide-react";

export const AuthGateView: React.FC = () => {
  const { login, register, allUsers } = useApp();

  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("123456");
  const [grade, setGrade] = useState("Lớp 10A1");
  const [school, setSchool] = useState("THPT Chuyên Tin");
  const [role, setRole] = useState<"student" | "teacher">("student");

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setIsLoading(true);

    try {
      if (isRegister) {
        if (!username.trim() || !email.trim() || !fullName.trim()) {
          setErrorMessage("Vui lòng điền đầy đủ các thông tin bắt buộc!");
          setIsLoading(false);
          return;
        }

        const success = await register({
          username: username.trim(),
          email: email.trim(),
          fullName: fullName.trim(),
          grade,
          role,
          school
        });

        if (success) {
          setSuccessMessage("Đăng ký tài khoản học sinh thành công! Đang lưu vào CSDL SQLite và mở bài học...");
        } else {
          setErrorMessage("Tên đăng nhập hoặc Email đã tồn tại trong CSDL. Vui lòng chọn tên khác!");
        }
      } else {
        if (!username.trim()) {
          setErrorMessage("Vui lòng nhập tên đăng nhập hoặc email!");
          setIsLoading(false);
          return;
        }

        const success = await login(username.trim());
        if (success) {
          setSuccessMessage("Đăng nhập thành công! Đang đồng bộ tiến độ từ CSDL SQLite...");
        } else {
          setErrorMessage("Không tìm thấy tài khoản trong CSDL SQLite. Hãy kiểm tra lại hoặc chuyển sang Đăng ký mới!");
        }
      }
    } catch (err: any) {
      setErrorMessage("Đã xảy ra lỗi kết nối CSDL: " + (err?.message || "Vui lòng thử lại"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickLogin = async (identifier: string) => {
    setIsLoading(true);
    setErrorMessage("");
    const ok = await login(identifier);
    if (!ok) {
      setErrorMessage("Không thể đăng nhập tài khoản mẫu.");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white relative overflow-hidden">
      {/* Background glowing decorations */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Simple Header */}
      <header className="px-6 py-4 border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Code2 className="h-6 w-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-white tracking-tight">PyEdu</h1>
              <span className="px-2 py-0.5 text-[11px] font-semibold bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 rounded-full">
                Python Auto-Grader
              </span>
            </div>
            <p className="text-xs text-slate-400">Nền tảng học lập trình Python trực tuyến & chấm điểm tự động</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-800/50 border border-slate-700/60 px-3 py-1.5 rounded-lg">
          <Database className="h-4 w-4 text-emerald-400" />
          <span className="font-mono text-[11px]">CSDL SQLite: Sẵn sàng</span>
        </div>
      </header>

      {/* Main Authentication Grid */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 z-10">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Platform Value & Highlights */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-400">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Yêu cầu đăng nhập để học</span>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Học lập trình Python
              </h2>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                Đăng nhập để làm bài tập, chạy mã nguồn trực tiếp và lưu trữ toàn bộ tiến độ vào cơ sở dữ liệu SQLite.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 bg-slate-900/80 border border-slate-800 rounded-xl space-y-1.5">
                <div className="flex items-center gap-2 text-indigo-400">
                  <Terminal className="h-4 w-4" />
                  <h3 className="text-xs font-bold text-slate-200">Trình biên dịch tích hợp</h3>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Chạy code Python trực tiếp, hỗ trợ luồng nhập liệu input() và chấm điểm tự động.
                </p>
              </div>

              <div className="p-3.5 bg-slate-900/80 border border-slate-800 rounded-xl space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-400">
                  <Database className="h-4 w-4" />
                  <h3 className="text-xs font-bold text-slate-200">Lưu trữ dữ liệu SQLite</h3>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Lưu tiến độ học tập, lịch sử nộp bài, huy hiệu và sổ tay ghi chú của bạn.
                </p>
              </div>

              <div className="p-3.5 bg-slate-900/80 border border-slate-800 rounded-xl space-y-1.5">
                <div className="flex items-center gap-2 text-amber-400">
                  <Trophy className="h-4 w-4" />
                  <h3 className="text-xs font-bold text-slate-200">Bảng xếp hạng & streak</h3>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Tích lũy điểm kinh nghiệm XP, duy trì chuỗi ngày học tập và thi đua tuần.
                </p>
              </div>

              <div className="p-3.5 bg-slate-900/80 border border-slate-800 rounded-xl space-y-1.5">
                <div className="flex items-center gap-2 text-cyan-400">
                  <Cpu className="h-4 w-4" />
                  <h3 className="text-xs font-bold text-slate-200">Trợ lý AI tutor 24/7</h3>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Hướng dẫn tư duy từng bước, giải thích cú pháp và phân tích mã lỗi.
                </p>
              </div>
            </div>

            {/* Quick Demo Switchers */}
            <div className="pt-2">
              <p className="text-xs font-semibold text-slate-400 mb-2 flex items-center gap-1.5">
                <GraduationCap className="h-3.5 w-3.5 text-indigo-400" />
                <span>Tài khoản mẫu thử nghiệm nhanh:</span>
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickLogin("khanh_it")}
                  className="px-3 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-indigo-500/60 rounded-xl text-xs text-left transition-all flex items-center gap-2 group cursor-pointer"
                >
                  <div className="h-7 w-7 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300 font-bold text-xs">
                    K
                  </div>
                  <div>
                    <p className="font-semibold text-slate-200 group-hover:text-white">Học sinh Khánh</p>
                    <p className="text-[10px] text-slate-400">Lớp 10A1 (280 XP, streak 4 ngày)</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickLogin("thaynam_tin")}
                  className="px-3 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-amber-500/60 rounded-xl text-xs text-left transition-all flex items-center gap-2 group cursor-pointer"
                >
                  <div className="h-7 w-7 rounded-lg bg-amber-600/20 border border-amber-500/30 flex items-center justify-center text-amber-300 font-bold text-xs">
                    N
                  </div>
                  <div>
                    <p className="font-semibold text-slate-200 group-hover:text-white">Thầy Nam (giáo viên)</p>
                    <p className="text-[10px] text-slate-400">Mở khóa toàn bộ bài giảng</p>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Authentication Card Form */}
          <div className="lg:col-span-6">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 backdrop-blur-xl relative">
              
              {/* Form Navigation Tabs */}
              <div className="flex border-b border-slate-800 mb-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsRegister(false);
                    setErrorMessage("");
                    setSuccessMessage("");
                  }}
                  className={`flex-1 pb-3 text-sm font-bold flex items-center justify-center gap-2 transition-all relative ${
                    !isRegister
                      ? "text-indigo-400 border-b-2 border-indigo-500"
                      : "text-slate-400 hover:text-slate-300"
                  }`}
                >
                  <LogIn className="h-4 w-4" />
                  <span>Đăng nhập</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsRegister(true);
                    setErrorMessage("");
                    setSuccessMessage("");
                  }}
                  className={`flex-1 pb-3 text-sm font-bold flex items-center justify-center gap-2 transition-all relative ${
                    isRegister
                      ? "text-indigo-400 border-b-2 border-indigo-500"
                      : "text-slate-400 hover:text-slate-300"
                  }`}
                >
                  <UserPlus className="h-4 w-4" />
                  <span>Đăng ký mới</span>
                </button>
              </div>

              {/* Status alerts */}
              {errorMessage && (
                <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 text-xs flex items-center gap-2 animate-in fade-in">
                  <span className="font-semibold">Lỗi:</span> {errorMessage}
                </div>
              )}

              {successMessage && (
                <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="h-4 w-4" /> {successMessage}
                </div>
              )}

              {/* Authentication Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {isRegister && (
                  <>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Họ và tên người học *
                      </label>
                      <div className="relative">
                        <UserIcon className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                        <input
                          type="text"
                          required
                          placeholder="Ví dụ: Nguyễn Hoàng Long"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Lớp / khối *</label>
                        <select
                          value={grade}
                          onChange={(e) => setGrade(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
                        >
                          <option value="Lớp 10A1">Lớp 10A1 (Chuyên Tin)</option>
                          <option value="Lớp 10A2">Lớp 10A2</option>
                          <option value="Lớp 11A">Lớp 11A</option>
                          <option value="Lớp 12 Tin">Lớp 12 Tin</option>
                          <option value="CLB Tin Học">CLB Tin học trẻ</option>
                          <option value="Giáo viên Tin học">Giáo viên Tin học</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Vai trò *</label>
                        <select
                          value={role}
                          onChange={(e) => setRole(e.target.value as any)}
                          className="w-full px-3 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
                        >
                          <option value="student">Học sinh</option>
                          <option value="teacher">Giáo viên</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Trường học</label>
                      <div className="relative">
                        <School className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                        <input
                          type="text"
                          placeholder="Trường THPT Chuyên Tin"
                          value={school}
                          onChange={(e) => setSchool(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Địa chỉ email *</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                        <input
                          type="email"
                          required
                          placeholder="hocsinh@truong.edu.vn"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-500"
                        />
                      </div>
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {isRegister ? "Tên đăng nhập (username) *" : "Tên đăng nhập hoặc email *"}
                  </label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                    <input
                      type="text"
                      required
                      placeholder={isRegister ? "nguyenlong_it" : "khanh_it hoặc khanhdsp@gmail.com"}
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Mật khẩu</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-indigo-600 via-indigo-500 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isLoading ? (
                    <span>Đang kết nối SQLite...</span>
                  ) : isRegister ? (
                    <>
                      <UserPlus className="h-4 w-4" />
                      <span>Đăng ký tài khoản</span>
                    </>
                  ) : (
                    <>
                      <LogIn className="h-4 w-4" />
                      <span>Đăng nhập</span>
                    </>
                  )}
                </button>
              </form>

              {/* Bottom switch link */}
              <div className="mt-5 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setIsRegister(!isRegister);
                    setErrorMessage("");
                    setSuccessMessage("");
                  }}
                  className="text-xs text-indigo-400 hover:text-indigo-300 font-medium transition-colors cursor-pointer"
                >
                  {isRegister
                    ? "Đã có tài khoản? Nhấn để đăng nhập"
                    : "Chưa có tài khoản? Nhấn để đăng ký mới"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-4 border-t border-slate-800/80 text-center text-xs text-slate-400 bg-slate-900/40">
        PyEdu © 2026 • Nền tảng học lập trình Python trực tuyến với cơ sở dữ liệu SQLite
      </footer>
    </div>
  );
};
