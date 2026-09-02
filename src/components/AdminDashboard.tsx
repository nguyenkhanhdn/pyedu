import React, { useState, useMemo } from "react";
import { useApp } from "../context/AppContext";
import { User, UserRole } from "../types";
import {
  ShieldAlert,
  Users,
  UserPlus,
  Search,
  Filter,
  Trash2,
  RotateCcw,
  Edit3,
  CheckCircle2,
  AlertTriangle,
  Award,
  BookOpen,
  Sparkles,
  KeyRound,
  Mail,
  School,
  GraduationCap,
  ShieldCheck,
  Zap,
  TrendingUp,
  Database,
  ArrowUpDown,
  Lock,
  Eye,
  CheckSquare,
  Square,
  RefreshCw,
  Plus,
  BarChart3,
  Layers,
  Target
} from "lucide-react";
import { isSupabaseConfigured } from "../lib/supabase";
import { AdminSupabaseView } from "./admin/AdminSupabaseView";
import { AdminStatsView } from "./admin/AdminStatsView";
import { AdminCurriculumView } from "./admin/AdminCurriculumView";
import { AdminAlgorithmsView } from "./admin/AdminAlgorithmsView";

interface AdminDashboardProps {
  onOpenSupabaseSync?: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onOpenSupabaseSync }) => {
  const {
    currentUser,
    allUsers,
    adminCreateUser,
    adminUpdateUser,
    adminDeleteUser,
    adminResetUserProgress,
    adminBatchAddXp,
    adminSection,
    setAdminSection,
    login
  } = useApp();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"xp" | "name" | "streak" | "lessons">("xp");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Selection for Batch Actions
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);

  // Modal States
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [userToReset, setUserToReset] = useState<User | null>(null);
  const [batchXpAmount, setBatchXpAmount] = useState<number>(50);
  const [isBatchXpOpen, setIsBatchXpOpen] = useState(false);

  // Form State for Add / Edit
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    fullName: "",
    grade: "Lớp 10 Tin",
    school: "THPT Chuyên Tin",
    role: "student" as UserRole,
    totalXp: 0,
    streakDays: 1
  });

  // Action status feedback
  const [alertInfo, setAlertInfo] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const showAlert = (type: "success" | "error", message: string) => {
    setAlertInfo({ type, message });
    setTimeout(() => {
      setAlertInfo(null);
    }, 4000);
  };

  // Metrics calculations
  const stats = useMemo(() => {
    const total = allUsers.length;
    const students = allUsers.filter((u) => u.role === "student").length;
    const teachers = allUsers.filter((u) => u.role === "teacher").length;
    const admins = allUsers.filter((u) => u.role === "admin").length;
    const totalXp = allUsers.reduce((sum, u) => sum + (u.totalXp || 0), 0);
    const totalCompletedLessons = allUsers.reduce((sum, u) => sum + (u.completedLessons?.length || 0), 0);

    return {
      total,
      students,
      teachers,
      admins,
      totalXp,
      totalCompletedLessons
    };
  }, [allUsers]);

  // Filtered and Sorted Users
  const filteredUsers = useMemo(() => {
    return allUsers
      .filter((u) => {
        const query = searchQuery.toLowerCase().trim();
        const matchesQuery =
          !query ||
          u.fullName.toLowerCase().includes(query) ||
          u.username.toLowerCase().includes(query) ||
          u.email.toLowerCase().includes(query) ||
          (u.school && u.school.toLowerCase().includes(query)) ||
          (u.grade && u.grade.toLowerCase().includes(query));

        const matchesRole = roleFilter === "all" || u.role === roleFilter;

        return matchesQuery && matchesRole;
      })
      .sort((a, b) => {
        let valA = 0;
        let valB = 0;

        if (sortBy === "xp") {
          valA = a.totalXp;
          valB = b.totalXp;
        } else if (sortBy === "streak") {
          valA = a.streakDays;
          valB = b.streakDays;
        } else if (sortBy === "lessons") {
          valA = a.completedLessons.length;
          valB = b.completedLessons.length;
        } else if (sortBy === "name") {
          return sortOrder === "asc"
            ? a.fullName.localeCompare(b.fullName)
            : b.fullName.localeCompare(a.fullName);
        }

        return sortOrder === "desc" ? valB - valA : valA - valB;
      });
  }, [allUsers, searchQuery, roleFilter, sortBy, sortOrder]);

  // Handle Add User
  const handleOpenAddUser = () => {
    setFormData({
      username: "",
      email: "",
      password: "123",
      fullName: "",
      grade: "Lớp 10 Tin",
      school: "THPT Chuyên Tin",
      role: "student",
      totalXp: 0,
      streakDays: 1
    });
    setIsAddUserOpen(true);
  };

  const handleCreateUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.username.trim() || !formData.email.trim() || !formData.fullName.trim()) {
      showAlert("error", "Vui lòng điền đủ các thông tin bắt buộc.");
      return;
    }

    setIsProcessing(true);
    const success = await adminCreateUser({
      username: formData.username.trim(),
      email: formData.email.trim(),
      fullName: formData.fullName.trim(),
      grade: formData.grade,
      school: formData.school,
      role: formData.role,
      password: formData.password || (formData.role === "admin" ? "admin@password" : "123456")
    });

    setIsProcessing(false);
    if (success) {
      showAlert("success", `Đã tạo tài khoản ${formData.role} "${formData.username}" thành công trên Supabase!`);
      setIsAddUserOpen(false);
    } else {
      showAlert("error", "Tên đăng nhập hoặc email đã tồn tại. Vui lòng thử lại.");
    }
  };

  // Handle Edit User
  const handleOpenEditUser = (user: User) => {
    setEditingUser(user);
    setFormData({
      username: user.username,
      email: user.email,
      password: user.password || "",
      fullName: user.fullName,
      grade: user.grade,
      school: user.school || "THPT Chuyên Tin",
      role: user.role,
      totalXp: user.totalXp,
      streakDays: user.streakDays
    });
  };

  const handleEditUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    setIsProcessing(true);
    const updates: Partial<User> & { password?: string } = {
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      grade: formData.grade,
      school: formData.school,
      role: formData.role,
      totalXp: Number(formData.totalXp),
      streakDays: Number(formData.streakDays)
    };
    if (formData.password) {
      updates.password = formData.password;
    }

    const success = await adminUpdateUser(editingUser.id, updates);
    setIsProcessing(false);

    if (success) {
      showAlert("success", `Cập nhật hồ sơ tài khoản "${editingUser.username}" thành công!`);
      setEditingUser(null);
    } else {
      showAlert("error", "Có lỗi xảy ra khi cập nhật thông tin người dùng.");
    }
  };

  // Handle Delete User
  const handleConfirmDelete = async () => {
    if (!userToDelete) return;
    if (userToDelete.id === currentUser?.id) {
      showAlert("error", "Bạn không thể xóa tài khoản Admin đang đăng nhập hiện tại!");
      setUserToDelete(null);
      return;
    }

    setIsProcessing(true);
    const ok = await adminDeleteUser(userToDelete.id);
    setIsProcessing(false);

    if (ok) {
      showAlert("success", `Đã xóa tài khoản "${userToDelete.username}" và dữ liệu liên quan khỏi hệ thống.`);
      setSelectedUserIds((prev) => prev.filter((id) => id !== userToDelete.id));
      setUserToDelete(null);
    } else {
      showAlert("error", "Không thể xóa người dùng. Vui lòng thử lại.");
    }
  };

  // Handle Reset User Progress
  const handleConfirmReset = async () => {
    if (!userToReset) return;

    setIsProcessing(true);
    const updated = await adminResetUserProgress(userToReset.id);
    setIsProcessing(false);

    if (updated) {
      showAlert("success", `Đã đặt lại toàn bộ tiến độ học tập (bài nộp, code, XP) của "${userToReset.username}".`);
      setUserToReset(null);
    } else {
      showAlert("error", "Không thể đặt lại tiến độ người dùng.");
    }
  };

  // Batch Select / Deselect
  const toggleSelectAll = () => {
    if (selectedUserIds.length === filteredUsers.length) {
      setSelectedUserIds([]);
    } else {
      setSelectedUserIds(filteredUsers.map((u) => u.id));
    }
  };

  const toggleSelectUser = (id: string) => {
    setSelectedUserIds((prev) =>
      prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
    );
  };

  // Batch Add XP
  const handleBatchAddXp = async () => {
    if (selectedUserIds.length === 0) return;
    setIsProcessing(true);
    await adminBatchAddXp(selectedUserIds, batchXpAmount);
    setIsProcessing(false);
    showAlert("success", `Đã cộng thêm +${batchXpAmount} XP cho ${selectedUserIds.length} người dùng đã chọn!`);
    setIsBatchXpOpen(false);
  };

  // Impersonate / Quick Switch
  const handleImpersonate = async (user: User) => {
    if (user.id === currentUser?.id) return;
    setIsProcessing(true);
    await login(user.username, user.password);
    setIsProcessing(false);
    showAlert("success", `Đang chuyển hướng sang tài khoản ${user.fullName} (${user.role}).`);
  };

  return (
    <div className="flex-1 bg-slate-50 min-h-screen pb-16">
      {/* Top Banner & Title */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5">
                <div className="h-10 w-10 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-400 shadow-inner">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-black tracking-tight">Quản trị Hệ thống PyEdu</h1>
                    <span className="px-2.5 py-0.5 text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 rounded-full">
                      Admin Portal
                    </span>
                  </div>
                  <p className="text-sm text-slate-300">
                    Quản lý người dùng, phân quyền Admin/Giáo viên/Học sinh, quản trị điểm số và đồng bộ CSDL Supabase
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions in Header */}
            <div className="flex items-center gap-2.5 flex-wrap">
              {onOpenSupabaseSync && (
                <button
                  onClick={onOpenSupabaseSync}
                  className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <Database className="h-4 w-4 text-emerald-400" />
                  <span>Trạng thái Supabase</span>
                  <span
                    className={`h-2 w-2 rounded-full ${
                      isSupabaseConfigured() ? "bg-emerald-400 animate-pulse" : "bg-rose-400"
                    }`}
                  />
                </button>
              )}

              <button
                onClick={handleOpenAddUser}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-indigo-600/30"
              >
                <UserPlus className="h-4 w-4" />
                <span>Thêm tài khoản mới</span>
              </button>
            </div>
          </div>

          {/* Admin Credentials Quick Hint */}
          <div className="mt-6 p-3.5 bg-indigo-950/60 border border-indigo-800/40 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-indigo-200">
              <KeyRound className="h-4 w-4 text-amber-400 flex-shrink-0" />
              <span>
                Tài khoản Quản trị viên mặc định: <b className="text-white font-mono bg-indigo-900/80 px-2 py-0.5 rounded">admin</b> • Mật khẩu: <b className="text-amber-300 font-mono bg-indigo-900/80 px-2 py-0.5 rounded">admin@password</b>
              </span>
            </div>
            <span className="text-slate-400 text-[11px]">
              Đang kết nối CSDL Supabase: <span className="text-emerald-400 font-mono">public.users</span>
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {/* Feedback Alert */}
        {alertInfo && (
          <div
            className={`mb-6 p-4 rounded-2xl border flex items-center gap-3 text-sm animate-in fade-in ${
              alertInfo.type === "success"
                ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                : "bg-rose-50 border-rose-200 text-rose-800"
            }`}
          >
            {alertInfo.type === "success" ? (
              <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-rose-600 flex-shrink-0" />
            )}
            <span className="font-medium">{alertInfo.message}</span>
          </div>
        )}

        {/* In-page Admin Sub-section Navigation Bar */}
        <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-xs mb-6 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setAdminSection("users")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
              adminSection === "users"
                ? "bg-purple-700 text-white shadow-md shadow-purple-700/25"
                : "text-slate-600 hover:text-purple-900 hover:bg-purple-50"
            }`}
          >
            <Users className="h-4 w-4" />
            <span>Người Dùng ({allUsers.length})</span>
          </button>

          <button
            onClick={() => setAdminSection("supabase")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
              adminSection === "supabase"
                ? "bg-purple-700 text-white shadow-md shadow-purple-700/25"
                : "text-slate-600 hover:text-purple-900 hover:bg-purple-50"
            }`}
          >
            <Database className="h-4 w-4 text-emerald-500" />
            <span>CSDL Supabase Cloud Direct</span>
          </button>

          <button
            onClick={() => setAdminSection("stats")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
              adminSection === "stats"
                ? "bg-purple-700 text-white shadow-md shadow-purple-700/25"
                : "text-slate-600 hover:text-purple-900 hover:bg-purple-50"
            }`}
          >
            <BarChart3 className="h-4 w-4 text-indigo-500" />
            <span>Thống Kê & Báo Cáo</span>
          </button>

          <button
            onClick={() => setAdminSection("curriculum")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
              adminSection === "curriculum"
                ? "bg-purple-700 text-white shadow-md shadow-purple-700/25"
                : "text-slate-600 hover:text-purple-900 hover:bg-purple-50"
            }`}
          >
            <Layers className="h-4 w-4 text-amber-500" />
            <span>Khóa Học & Bài Giảng</span>
          </button>

          <button
            onClick={() => setAdminSection("algorithms")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
              adminSection === "algorithms"
                ? "bg-purple-700 text-white shadow-md shadow-purple-700/25"
                : "text-slate-600 hover:text-purple-900 hover:bg-purple-50"
            }`}
          >
            <Target className="h-4 w-4 text-rose-500" />
            <span>Ngân Hàng Thuật Toán</span>
          </button>
        </div>

        {/* VIEW 1: SUPABASE DIRECT CLOUD */}
        {adminSection === "supabase" && (
          <AdminSupabaseView onOpenSyncModal={onOpenSupabaseSync} />
        )}

        {/* VIEW 2: STATS & ANALYTICS */}
        {adminSection === "stats" && <AdminStatsView />}

        {/* VIEW 3: CURRICULUM */}
        {adminSection === "curriculum" && <AdminCurriculumView />}

        {/* VIEW 4: ALGORITHMS BANK */}
        {adminSection === "algorithms" && <AdminAlgorithmsView />}

        {/* VIEW 5: USER MANAGEMENT (DEFAULT) */}
        {adminSection === "users" && (
          <>
            {/* 4 Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Tổng người dùng</p>
                  <h3 className="text-2xl font-black text-slate-800">{stats.total}</h3>
                  <p className="text-[11px] text-slate-400">
                    {stats.students} học sinh • {stats.teachers} GV • {stats.admins} admin
                  </p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center">
                  <Award className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Tổng XP toàn hệ thống</p>
                  <h3 className="text-2xl font-black text-slate-800">{stats.totalXp.toLocaleString()} XP</h3>
                  <p className="text-[11px] text-amber-600 font-medium">Trung bình {stats.total ? Math.round(stats.totalXp / stats.total) : 0} XP/học sinh</p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center">
                  <BookOpen className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Bài học đã hoàn thành</p>
                  <h3 className="text-2xl font-black text-slate-800">{stats.totalCompletedLessons}</h3>
                  <p className="text-[11px] text-emerald-600 font-medium">Chấm điểm tự động</p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center">
                  <Database className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Trạng thái CSDL</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${
                        isSupabaseConfigured() ? "bg-emerald-500 animate-pulse" : "bg-amber-500"
                      }`}
                    />
                    <span className="font-bold text-slate-800 text-sm">
                      {isSupabaseConfigured() ? "Supabase Cloud" : "Local Database"}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">Đồng bộ tức thời 2 chiều</p>
                </div>
              </div>
            </div>

        {/* Search, Filter & Bulk Actions Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm theo tên học sinh, username, email, trường hoặc lớp..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-indigo-600 focus:bg-white transition-colors"
              />
            </div>

            {/* Filter by Role */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
                <button
                  onClick={() => setRoleFilter("all")}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    roleFilter === "all" ? "bg-white text-indigo-600 shadow-xs font-bold" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Tất cả ({allUsers.length})
                </button>
                <button
                  onClick={() => setRoleFilter("student")}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    roleFilter === "student" ? "bg-white text-indigo-600 shadow-xs font-bold" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Học sinh ({stats.students})
                </button>
                <button
                  onClick={() => setRoleFilter("teacher")}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    roleFilter === "teacher" ? "bg-white text-amber-600 shadow-xs font-bold" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Giáo viên ({stats.teachers})
                </button>
                <button
                  onClick={() => setRoleFilter("admin")}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    roleFilter === "admin" ? "bg-white text-purple-600 shadow-xs font-bold" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Admin ({stats.admins})
                </button>
              </div>

              {/* Sort selector */}
              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-300 px-3 py-1.5 rounded-xl text-xs text-slate-700">
                <ArrowUpDown className="h-3.5 w-3.5 text-slate-400" />
                <span>Xếp theo:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent font-bold text-slate-800 focus:outline-none cursor-pointer"
                >
                  <option value="xp">Tổng XP</option>
                  <option value="streak">Chuỗi ngày (Streak)</option>
                  <option value="lessons">Bài đã hoàn thành</option>
                  <option value="name">Họ và tên</option>
                </select>
                <button
                  onClick={() => setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))}
                  className="p-1 hover:bg-slate-200 rounded text-slate-600 cursor-pointer font-bold"
                  title="Đảo chiều sắp xếp"
                >
                  {sortOrder === "desc" ? "↓" : "↑"}
                </button>
              </div>
            </div>
          </div>

          {/* Batch Action Toolbar */}
          {selectedUserIds.length > 0 && (
            <div className="mt-3 pt-3 border-t border-slate-200 flex items-center justify-between bg-indigo-50/50 p-2.5 rounded-xl text-xs">
              <span className="font-semibold text-indigo-900">
                Đã chọn <b>{selectedUserIds.length}</b> người dùng
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsBatchXpOpen(true)}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Zap className="h-3.5 w-3.5 text-amber-300" />
                  <span>Cộng điểm XP hàng loạt</span>
                </button>
                <button
                  onClick={() => setSelectedUserIds([])}
                  className="px-3 py-1.5 bg-white border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Bỏ chọn
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-700">
              <thead className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="p-4 w-10">
                    <button
                      onClick={toggleSelectAll}
                      className="text-slate-400 hover:text-indigo-600 cursor-pointer"
                    >
                      {selectedUserIds.length === filteredUsers.length && filteredUsers.length > 0 ? (
                        <CheckSquare className="h-4 w-4 text-indigo-600" />
                      ) : (
                        <Square className="h-4 w-4" />
                      )}
                    </button>
                  </th>
                  <th className="p-4">Người dùng</th>
                  <th className="p-4">Vai trò</th>
                  <th className="p-4">Lớp / Trường</th>
                  <th className="p-4 text-center">Tiến độ & Bài nộp</th>
                  <th className="p-4 text-right">Tổng XP</th>
                  <th className="p-4 text-center">Chuỗi Streak</th>
                  <th className="p-4 text-right">Thao tác Quản trị</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-10 text-center text-slate-400 text-sm">
                      Không tìm thấy người dùng nào phù hợp với bộ lọc.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => {
                    const isSelected = selectedUserIds.includes(user.id);
                    const isCurrentAdmin = user.id === currentUser?.id;

                    return (
                      <tr
                        key={user.id}
                        className={`hover:bg-slate-50/80 transition-colors ${
                          isSelected ? "bg-indigo-50/40" : ""
                        }`}
                      >
                        {/* Checkbox */}
                        <td className="p-4">
                          <button
                            onClick={() => toggleSelectUser(user.id)}
                            className="text-slate-400 hover:text-indigo-600 cursor-pointer"
                          >
                            {isSelected ? (
                              <CheckSquare className="h-4 w-4 text-indigo-600" />
                            ) : (
                              <Square className="h-4 w-4" />
                            )}
                          </button>
                        </td>

                        {/* User info */}
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={user.avatar}
                              alt={user.fullName}
                              className="h-10 w-10 rounded-full bg-slate-100 border border-slate-200"
                            />
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="font-bold text-slate-900">{user.fullName}</span>
                                {isCurrentAdmin && (
                                  <span className="px-1.5 py-0.2 text-[10px] font-bold bg-indigo-100 text-indigo-700 rounded-full">
                                    (Bạn)
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-slate-500 flex items-center gap-2">
                                <span className="font-mono">@{user.username}</span>
                                <span>•</span>
                                <span>{user.email}</span>
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Role Badge */}
                        <td className="p-4">
                          {user.role === "admin" ? (
                            <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-purple-100 text-purple-800 border border-purple-200 inline-flex items-center gap-1">
                              <ShieldCheck className="h-3.5 w-3.5 text-purple-600" />
                              Quản trị viên
                            </span>
                          ) : user.role === "teacher" ? (
                            <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-amber-100 text-amber-800 border border-amber-200 inline-flex items-center gap-1">
                              <ShieldAlert className="h-3.5 w-3.5 text-amber-600" />
                              Giáo viên
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 text-slate-700 border border-slate-200 inline-flex items-center gap-1">
                              <GraduationCap className="h-3.5 w-3.5 text-indigo-600" />
                              Học sinh
                            </span>
                          )}
                        </td>

                        {/* Grade & School */}
                        <td className="p-4 text-xs">
                          <p className="font-semibold text-slate-800">{user.grade}</p>
                          <p className="text-slate-500 truncate max-w-[150px]">
                            {user.school || "THPT Chuyên Tin"}
                          </p>
                        </td>

                        {/* Progress */}
                        <td className="p-4 text-center">
                          <span className="font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100 text-xs">
                            {user.completedLessons.length} bài đã giải
                          </span>
                        </td>

                        {/* XP */}
                        <td className="p-4 text-right">
                          <div className="font-bold text-slate-900 text-sm">
                            {user.totalXp.toLocaleString()} XP
                          </div>
                          <p className="text-[10px] text-slate-400">+{user.weeklyXp} tuần này</p>
                        </td>

                        {/* Streak */}
                        <td className="p-4 text-center">
                          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-50 border border-orange-200 text-orange-600 font-bold text-xs">
                            🔥 {user.streakDays} ngày
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {/* Impersonate */}
                            {!isCurrentAdmin && (
                              <button
                                onClick={() => handleImpersonate(user)}
                                className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                                title="Đăng nhập thử với tư cách người dùng này"
                              >
                                <Eye className="h-4 w-4" />
                              </button>
                            )}

                            {/* Edit */}
                            <button
                              onClick={() => handleOpenEditUser(user)}
                              className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                              title="Chỉnh sửa thông tin / phân quyền"
                            >
                              <Edit3 className="h-4 w-4" />
                            </button>

                            {/* Reset Progress */}
                            <button
                              onClick={() => setUserToReset(user)}
                              className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors cursor-pointer"
                              title="Đặt lại tiến độ học tập (Reset bài & điểm)"
                            >
                              <RotateCcw className="h-4 w-4" />
                            </button>

                            {/* Delete */}
                            {!isCurrentAdmin && (
                              <button
                                onClick={() => setUserToDelete(user)}
                                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                                title="Xóa tài khoản khỏi CSDL"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
          </>
        )}
      </div>

      {/* MODAL: Thêm người dùng mới */}
      {isAddUserOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 font-bold">
                  <UserPlus className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Tạo tài khoản người dùng mới</h3>
                  <p className="text-xs text-slate-500">Lưu trực tiếp vào Supabase & hệ thống</p>
                </div>
              </div>
              <button
                onClick={() => setIsAddUserOpen(false)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold cursor-pointer p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateUserSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Họ và tên đầy đủ *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Nguyễn Văn An"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-indigo-600 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Tên đăng nhập (username) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="nguyenan_tin"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-indigo-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Vai trò & Quyền hạn *
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => {
                      const newRole = e.target.value as UserRole;
                      setFormData({
                        ...formData,
                        role: newRole,
                        password: newRole === "admin" ? "admin@password" : "123456"
                      });
                    }}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-800 focus:outline-none focus:border-indigo-600 focus:bg-white"
                  >
                    <option value="student">🎓 Học sinh (Student)</option>
                    <option value="teacher">👨‍🏫 Giáo viên (Teacher)</option>
                    <option value="admin">🛡️ Quản trị viên (Admin)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="an@truong.edu.vn"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-indigo-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mật khẩu khởi tạo
                  </label>
                  <input
                    type="text"
                    placeholder="123456"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-indigo-600 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Lớp / Khối</label>
                  <input
                    type="text"
                    placeholder="Lớp 10 Tin"
                    value={formData.grade}
                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-indigo-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Trường học</label>
                  <input
                    type="text"
                    placeholder="THPT Chuyên Tin"
                    value={formData.school}
                    onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-indigo-600 focus:bg-white"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddUserOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 font-semibold text-sm rounded-xl cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-indigo-600/30 cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
                >
                  {isProcessing ? <RefreshCw className="h-4 w-4 animate-spin" /> : <UserPlus className="h-4 w-4" />}
                  <span>Tạo người dùng</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Chỉnh sửa người dùng */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 font-bold">
                  <Edit3 className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Chỉnh sửa: {editingUser.fullName}
                  </h3>
                  <p className="text-xs text-slate-500">@{editingUser.username}</p>
                </div>
              </div>
              <button
                onClick={() => setEditingUser(null)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold cursor-pointer p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleEditUserSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Họ và tên người học *
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-indigo-600 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-indigo-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Vai trò hệ thống *
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-800 focus:outline-none focus:border-indigo-600 focus:bg-white"
                  >
                    <option value="student">🎓 Học sinh (Student)</option>
                    <option value="teacher">👨‍🏫 Giáo viên (Teacher)</option>
                    <option value="admin">🛡️ Quản trị viên (Admin)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Lớp / Khối</label>
                  <input
                    type="text"
                    value={formData.grade}
                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-indigo-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Trường học</label>
                  <input
                    type="text"
                    value={formData.school}
                    onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-indigo-600 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Tổng điểm XP
                  </label>
                  <input
                    type="number"
                    value={formData.totalXp}
                    onChange={(e) => setFormData({ ...formData, totalXp: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-indigo-600 focus:bg-white font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Đổi mật khẩu mới
                  </label>
                  <input
                    type="text"
                    placeholder="Nhập nếu muốn đổi..."
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-indigo-600 focus:bg-white"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 font-semibold text-sm rounded-xl cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-blue-600/30 cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
                >
                  {isProcessing ? <RefreshCw className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
                  <span>Lưu thay đổi</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Xác nhận xóa người dùng */}
      {userToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full p-6 text-center">
            <div className="h-14 w-14 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="h-7 w-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">Xác nhận xóa tài khoản?</h3>
            <p className="text-xs text-slate-500 mb-6">
              Bạn có chắc chắn muốn xóa tài khoản <b className="text-slate-800">@{userToDelete.username}</b> ({userToDelete.fullName})? Toàn bộ tiến độ, lịch sử bài nộp, và mã nguồn trên Supabase sẽ bị xóa vĩnh viễn!
            </p>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setUserToDelete(null)}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm rounded-xl cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={isProcessing}
                className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-rose-600/30 cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? "Đang xóa..." : "Đồng ý Xóa"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Xác nhận đặt lại tiến độ */}
      {userToReset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full p-6 text-center">
            <div className="h-14 w-14 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto mb-4">
              <RotateCcw className="h-7 w-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">Đặt lại tiến độ học tập?</h3>
            <p className="text-xs text-slate-500 mb-6">
              Thao tác này sẽ xóa toàn bộ bài tập đã hoàn thành, lịch sử nộp code và điểm XP của <b className="text-slate-800">@{userToReset.username}</b> về 0, nhưng giữ lại tài khoản đăng nhập.
            </p>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setUserToReset(null)}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm rounded-xl cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleConfirmReset}
                disabled={isProcessing}
                className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-amber-600/30 cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? "Đang xử lý..." : "Đặt lại tiến độ"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Cộng điểm hàng loạt */}
      {isBatchXpOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full p-6 text-center">
            <div className="h-14 w-14 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center mx-auto mb-4">
              <Zap className="h-7 w-7 text-amber-500" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">Cộng điểm XP hàng loạt</h3>
            <p className="text-xs text-slate-500 mb-4">
              Cộng thêm điểm thưởng kinh nghiệm cho <b className="text-indigo-600">{selectedUserIds.length}</b> học sinh đã chọn.
            </p>

            <div className="mb-6 text-left">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Số điểm XP muốn thưởng:
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[20, 50, 100, 200].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setBatchXpAmount(amt)}
                    className={`py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                      batchXpAmount === amt
                        ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    +{amt} XP
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setIsBatchXpOpen(false)}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm rounded-xl cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleBatchAddXp}
                disabled={isProcessing}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-indigo-600/30 cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? "Đang cộng điểm..." : `Xác nhận (+${batchXpAmount} XP)`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
