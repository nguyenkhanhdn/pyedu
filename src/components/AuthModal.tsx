import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { X, UserPlus, LogIn, Sparkles, Shield, GraduationCap, CheckCircle2 } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { login, register, allUsers } = useApp();

  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [grade, setGrade] = useState("Lớp 10A1");
  const [role, setRole] = useState<'student' | 'teacher'>('student');
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setIsLoading(true);

    try {
      if (isRegister) {
        if (!username.trim() || !email.trim() || !fullName.trim()) {
          setErrorMessage("Vui lòng điền đầy đủ các trường thông tin!");
          setIsLoading(false);
          return;
        }
        const success = await register({
          username: username.trim(),
          email: email.trim(),
          fullName: fullName.trim(),
          grade,
          role
        });
        if (success) {
          setSuccessMessage("Đăng ký tài khoản học sinh thành công! Đang chuyển hướng...");
          setTimeout(() => {
            onClose();
          }, 800);
        } else {
          setErrorMessage("Tên đăng nhập hoặc Email đã tồn tại trong CSDL SQLite.");
        }
      } else {
        if (!username.trim()) {
          setErrorMessage("Vui lòng nhập tên đăng nhập hoặc email!");
          setIsLoading(false);
          return;
        }
        const success = await login(username.trim());
        if (success) {
          setSuccessMessage("Đăng nhập thành công!");
          setTimeout(() => {
            onClose();
          }, 500);
        } else {
          setErrorMessage("Không tìm thấy tài khoản trong CSDL SQLite. Hãy kiểm tra lại hoặc Đăng ký mới!");
        }
      }
    } catch (err: any) {
      setErrorMessage("Lỗi kết nối SQLite: " + (err.message || "Thử lại"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickSwitch = async (uName: string) => {
    setIsLoading(true);
    await login(uName);
    setIsLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              {isRegister ? <UserPlus className="h-5 w-5" /> : <LogIn className="h-5 w-5" />}
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                {isRegister ? "Đăng ký tài khoản mới" : "Đăng nhập PyEdu"}
              </h2>
              <p className="text-xs text-slate-400">Nền tảng học lập trình Python trực tuyến</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-4">
          {errorMessage && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 text-xs flex items-center gap-2">
              <span className="font-semibold">Lỗi:</span> {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" /> {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {isRegister && (
              <>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Họ và tên người học *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ví dụ: Nguyễn Văn An"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Lớp / khối *</label>
                    <select
                      value={grade}
                      onChange={(e) => setGrade(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
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
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
                    >
                      <option value="student">Học sinh</option>
                      <option value="teacher">Giáo viên</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Địa chỉ email *</label>
                  <input
                    type="email"
                    required
                    placeholder="hocsinh@truong.edu.vn"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-500"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {isRegister ? "Tên đăng nhập (username) *" : "Tên đăng nhập hoặc email *"}
              </label>
              <input
                type="text"
                required
                placeholder={isRegister ? "nguyenvanan_it" : "khanh_it hoặc khanhdsp@gmail.com"}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Mật khẩu</label>
              <input
                type="password"
                placeholder="••••••••"
                defaultValue="123456"
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-500"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <span>Đang xử lý kết nối SQLite...</span>
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

          {/* Switch mode */}
          <div className="pt-2 text-center">
            <button
              onClick={() => {
                setIsRegister(!isRegister);
                setErrorMessage("");
              }}
              className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer"
            >
              {isRegister ? "Đã có tài khoản? Nhấn để đăng nhập" : "Chưa có tài khoản? Đăng ký mới"}
            </button>
          </div>

          {/* Quick Demo Accounts */}
          <div className="pt-4 border-t border-slate-800">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Tài khoản dùng thử nhanh:
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickSwitch("khanh_it")}
                className="p-2 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-indigo-500/50 rounded-xl text-left transition-all flex items-center gap-2 cursor-pointer"
              >
                <GraduationCap className="h-4 w-4 text-indigo-400 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-slate-200 truncate">Học sinh Khánh</p>
                  <p className="text-[10px] text-slate-400">Lớp 10A1 (280 XP)</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickSwitch("thaynam_tin")}
                className="p-2 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-amber-500/50 rounded-xl text-left transition-all flex items-center gap-2 cursor-pointer"
              >
                <Shield className="h-4 w-4 text-amber-400 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-slate-200 truncate">Thầy Nam (giáo viên)</p>
                  <p className="text-[10px] text-slate-400">Mở toàn bộ bài giảng</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
