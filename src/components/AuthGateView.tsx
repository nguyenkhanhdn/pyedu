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
  ChevronRight,
  LogOut
} from "lucide-react";

export const AuthGateView: React.FC = () => {
  const { currentUser, logout, login, register, allUsers } = useApp();

  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("123456");
  const [grade, setGrade] = useState("Lớp 10A1");
  const [school, setSchool] = useState("THPT Chuyên Tin");
  const [role, setRole] = useState<"student" | "teacher" | "admin">("student");

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
          school,
          password: password.trim() || (role === "admin" ? "admin@password" : "123456")
        });

        if (success) {
          setSuccessMessage("Đăng ký tài khoản thành công! Đang lưu vào CSDL Supabase và mở giao diện...");
        } else {
          setErrorMessage("Tên đăng nhập hoặc Email đã tồn tại trong CSDL. Vui lòng chọn tên khác!");
        }
      } else {
        if (!username.trim()) {
          setErrorMessage("Vui lòng nhập tên đăng nhập hoặc email!");
          setIsLoading(false);
          return;
        }

        const success = await login(username.trim(), password.trim() || undefined);
        if (success) {
          setSuccessMessage("Đăng nhập thành công! Đang đồng bộ tiến độ từ CSDL Supabase...");
        } else {
          setErrorMessage("Không tìm thấy tài khoản hoặc mật khẩu không chính xác. Hãy kiểm tra lại!");
        }
      }
    } catch (err: any) {
      setErrorMessage("Đã xảy ra lỗi kết nối CSDL: " + (err?.message || "Vui lòng thử lại"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickLogin = async (identifier: string, pwd?: string) => {
    setIsLoading(true);
    setErrorMessage("");
    const ok = await login(identifier, pwd);
    if (!ok) {
      setErrorMessage("Không thể đăng nhập tài khoản mẫu.");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between selection:bg-indigo-500 selection:text-white relative overflow-hidden">
      {/* Background soft gradient decorations */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl pointer-events-none" />

      {/* Top Simple Header */}
      <header className="px-6 py-4 border-b border-slate-200 bg-white/80 backdrop-blur-md flex items-center justify-between z-10 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center shadow-md shadow-indigo-500/20">
            <Code2 className="h-6 w-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-slate-900 tracking-tight">PyEdu</h1>
              <span className="px-2 py-0.5 text-[11px] font-semibold bg-indigo-50 border border-indigo-200 text-indigo-700 rounded-full">
                Python Auto-Grader
              </span>
            </div>
            <p className="text-xs text-slate-500">Nền tảng học lập trình Python trực tuyến & chấm điểm tự động</p>
          </div>
        </div>

        {currentUser ? (
          <div className="flex items-center gap-2 text-xs bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-xl font-medium text-slate-700 shadow-xs">
            <span className="text-slate-900 font-bold">Hi, {currentUser.fullName}</span>
            <span className="text-slate-300">|</span>
            <button
              type="button"
              onClick={logout}
              className="text-rose-600 hover:text-rose-700 hover:underline font-semibold cursor-pointer flex items-center gap-1"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Đăng xuất</span>
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-xs font-semibold bg-slate-100 border border-slate-200 p-1 rounded-xl shadow-xs">
            <button
              type="button"
              onClick={() => {
                setIsRegister(false);
                setErrorMessage("");
                setSuccessMessage("");
              }}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                !isRegister
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
              }`}
            >
              Đăng nhập
            </button>
            <span className="text-slate-300 font-normal">|</span>
            <button
              type="button"
              onClick={() => {
                setIsRegister(true);
                setErrorMessage("");
                setSuccessMessage("");
              }}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                isRegister
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
              }`}
            >
              Đăng ký
            </button>
          </div>
        )}
      </header>

      {/* Main Authentication Grid */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 z-10">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Platform Value & Highlights */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-semibold text-indigo-700">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Yêu cầu đăng nhập để học</span>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Học lập trình Python
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Đăng nhập để làm bài tập, chạy mã nguồn trực tiếp và lưu trữ toàn bộ tiến độ vào cơ sở dữ liệu SQLite.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 bg-white border border-slate-200 shadow-xs rounded-2xl space-y-1.5">
                <div className="flex items-center gap-2 text-indigo-600">
                  <Terminal className="h-4 w-4" />
                  <h3 className="text-xs font-bold text-slate-800">Trình biên dịch tích hợp</h3>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Chạy code Python trực tiếp, hỗ trợ luồng nhập liệu input() và chấm điểm tự động.
                </p>
              </div>

              <div className="p-3.5 bg-white border border-slate-200 shadow-xs rounded-2xl space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-600">
                  <Database className="h-4 w-4" />
                  <h3 className="text-xs font-bold text-slate-800">Lưu trữ dữ liệu SQLite</h3>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Lưu tiến độ học tập, lịch sử nộp bài, huy hiệu và sổ tay ghi chú của bạn.
                </p>
              </div>

              <div className="p-3.5 bg-white border border-slate-200 shadow-xs rounded-2xl space-y-1.5">
                <div className="flex items-center gap-2 text-amber-600">
                  <Trophy className="h-4 w-4" />
                  <h3 className="text-xs font-bold text-slate-800">Bảng xếp hạng & streak</h3>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Tích lũy điểm kinh nghiệm XP, duy trì chuỗi ngày học tập và thi đua tuần.
                </p>
              </div>

              <div className="p-3.5 bg-white border border-slate-200 shadow-xs rounded-2xl space-y-1.5">
                <div className="flex items-center gap-2 text-blue-600">
                  <Cpu className="h-4 w-4" />
                  <h3 className="text-xs font-bold text-slate-800">Trợ lý AI tutor 24/7</h3>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Hướng dẫn tư duy từng bước, giải thích cú pháp và phân tích mã lỗi.
                </p>
              </div>
            </div>

            {/* Quick Demo Switchers */}
            <div className="pt-2">
              <p className="text-xs font-semibold text-slate-500 mb-2 flex items-center gap-1.5">
                <GraduationCap className="h-3.5 w-3.5 text-indigo-600" />
                <span>Tài khoản mẫu thử nghiệm nhanh:</span>
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickLogin("admin", "admin@password")}
                  className="px-3 py-2 bg-purple-50 hover:bg-purple-100 border border-purple-200 hover:border-purple-400 rounded-xl text-xs text-left transition-all flex items-center gap-2 group cursor-pointer shadow-xs"
                >
                  <div className="h-7 w-7 rounded-lg bg-purple-600 border border-purple-700 flex items-center justify-center text-white font-bold text-xs">
                    <Shield className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-bold text-purple-950 group-hover:text-purple-700">Admin Quản trị</p>
                    <p className="text-[10px] text-purple-700 font-mono">admin@password</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickLogin("khanh_it", "123456")}
                  className="px-3 py-2 bg-white hover:bg-indigo-50/50 border border-slate-200 hover:border-indigo-300 rounded-xl text-xs text-left transition-all flex items-center gap-2 group cursor-pointer shadow-xs"
                >
                  <div className="h-7 w-7 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700 font-bold text-xs">
                    K
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 group-hover:text-indigo-600">Học sinh Khánh</p>
                    <p className="text-[10px] text-slate-500">Lớp 10A1 (280 XP)</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickLogin("thaynam_tin", "123456")}
                  className="px-3 py-2 bg-white hover:bg-amber-50/50 border border-slate-200 hover:border-amber-300 rounded-xl text-xs text-left transition-all flex items-center gap-2 group cursor-pointer shadow-xs"
                >
                  <div className="h-7 w-7 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 font-bold text-xs">
                    N
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 group-hover:text-amber-700">Thầy Nam (giáo viên)</p>
                    <p className="text-[10px] text-slate-500">Mở toàn bộ bài giảng</p>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Authentication Card Form */}
          <div className="lg:col-span-6">
            <div className="bg-white border border-slate-200 rounded-3xl shadow-xl p-6 sm:p-8 relative">
              
              {/* Form Navigation Tabs */}
              <div className="flex border-b border-slate-200 mb-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsRegister(false);
                    setErrorMessage("");
                    setSuccessMessage("");
                  }}
                  className={`flex-1 pb-3 text-sm font-bold flex items-center justify-center gap-2 transition-all relative ${
                    !isRegister
                      ? "text-indigo-600 border-b-2 border-indigo-600"
                      : "text-slate-500 hover:text-slate-700"
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
                      ? "text-indigo-600 border-b-2 border-indigo-600"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  <UserPlus className="h-4 w-4" />
                  <span>Đăng ký mới</span>
                </button>
              </div>

              {/* Status alerts */}
              {errorMessage && (
                <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2 animate-in fade-in">
                  <span className="font-semibold">Lỗi:</span> {errorMessage}
                </div>
              )}

              {successMessage && (
                <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 text-xs flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="h-4 w-4" /> {successMessage}
                </div>
              )}

              {/* Authentication Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {isRegister && (
                  <>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Họ và tên người học *
                      </label>
                      <div className="relative">
                        <UserIcon className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                        <input
                          type="text"
                          required
                          placeholder="Ví dụ: Nguyễn Hoàng Long"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white transition-colors placeholder:text-slate-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Lớp / khối *</label>
                        <select
                          value={grade}
                          onChange={(e) => setGrade(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
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
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Vai trò *</label>
                        <select
                          value={role}
                          onChange={(e) => setRole(e.target.value as any)}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
                        >
                          <option value="student">🎓 Học sinh</option>
                          <option value="teacher">👨‍🏫 Giáo viên</option>
                          <option value="admin">🛡️ Quản trị viên (Admin)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Trường học</label>
                      <div className="relative">
                        <School className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                        <input
                          type="text"
                          placeholder="Trường THPT Chuyên Tin"
                          value={school}
                          onChange={(e) => setSchool(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white transition-colors placeholder:text-slate-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Địa chỉ email *</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                        <input
                          type="email"
                          required
                          placeholder="hocsinh@truong.edu.vn"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white transition-colors placeholder:text-slate-400"
                        />
                      </div>
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {isRegister ? "Tên đăng nhập (username) *" : "Tên đăng nhập hoặc email *"}
                  </label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder={isRegister ? "nguyenlong_it" : "khanh_it hoặc khanhdsp@gmail.com"}
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white transition-colors placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Mật khẩu</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white transition-colors placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-2 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl shadow-md shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
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
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold transition-colors cursor-pointer"
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
      <footer className="px-6 py-4 border-t border-slate-200 text-center text-xs text-slate-500 bg-white">
        PyEdu © 2026 • Nền tảng học lập trình Python trực tuyến với cơ sở dữ liệu SQLite
      </footer>
    </div>
  );
};
