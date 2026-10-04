import React, { useState, useMemo, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { User, UserRole, UserStatus } from "../types";
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
  Target,
  Clock,
  Ban,
  UserCheck,
  UserX,
  AlertCircle,
  Unlock,
  Check,
  X
} from "lucide-react";
import { isSupabaseConfigured } from "../lib/supabase";
import { ApiService } from "../services/apiClient";
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
    adminBatchDeleteUsers,
    adminResetUserProgress,
    adminBatchAddXp,
    adminApproveUser,
    refreshUsers,
    adminRejectUser,
    adminBlockUser,
    adminUnblockUser,
    adminBatchApproveUsers,
    adminBatchBlockUsers,
    requireApprovalForRegistration,
    setRequireApprovalForRegistration,
    adminSection,
    setAdminSection,
    login
  } = useApp();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  // Vai trò admin chọn lại cho tài khoản chờ duyệt (nếu người dùng đăng ký sai)
  const [pendingRoles, setPendingRoles] = useState<Record<string, "student" | "teacher" | "admin">>({});

  useEffect(() => {
    refreshUsers();
  }, []);

  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "active" | "blocked">("all");
  const [sortBy, setSortBy] = useState<"xp" | "name" | "streak" | "lessons">("xp");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Selection for Batch Actions
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);

  // Modal States
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [userToReset, setUserToReset] = useState<User | null>(null);
  const [userToBlock, setUserToBlock] = useState<User | null>(null);
  const [userToReject, setUserToReject] = useState<User | null>(null);
  const [blockReason, setBlockReason] = useState<string>("Vi phạm quy chế sử dụng hệ thống PyEdu");
  const [customBlockReason, setCustomBlockReason] = useState<string>("");
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
    status: "active" as UserStatus,
    banReason: "",
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
    const validUsers = allUsers.filter((u) => 
      u.role !== "deleted" && 
      u.fullName !== "[Tài khoản đã xóa]" && 
      u.fullName !== "[Đã xóa]" &&
      !(u.username && u.username.startsWith("deleted_")) &&
      !ApiService.isUserDeleted(u.id, u.username, u.email, u.fullName)
    );
    const total = validUsers.length;
    const students = validUsers.filter((u) => u.role === "student").length;
    const teachers = validUsers.filter((u) => u.role === "teacher").length;
    const admins = validUsers.filter((u) => u.role === "admin").length;
    const pending = validUsers.filter((u) => u.status === "pending").length;
    const blocked = validUsers.filter((u) => u.status === "blocked").length;
    const active = validUsers.filter((u) => u.status === "active" || !u.status).length;
    const totalXp = validUsers.reduce((sum, u) => sum + (u.totalXp || 0), 0);
    const totalCompletedLessons = validUsers.reduce((sum, u) => sum + (u.completedLessons?.length || 0), 0);

    return {
      total,
      students,
      teachers,
      admins,
      pending,
      blocked,
      active,
      totalXp,
      totalCompletedLessons
    };
  }, [allUsers]);

  // Filtered and Sorted Users
  const filteredUsers = useMemo(() => {
    return allUsers
      .filter((u) => {
        if (
          u.role === "deleted" ||
          u.fullName === "[Tài khoản đã xóa]" ||
          u.fullName === "[Đã xóa]" ||
          (u.username && u.username.startsWith("deleted_")) ||
          ApiService.isUserDeleted(u.id, u.username, u.email, u.fullName)
        ) {
          return false;
        }

        const query = searchQuery.toLowerCase().trim();
        const matchesQuery =
          !query ||
          u.fullName.toLowerCase().includes(query) ||
          u.username.toLowerCase().includes(query) ||
          u.email.toLowerCase().includes(query) ||
          (u.school && u.school.toLowerCase().includes(query)) ||
          (u.grade && u.grade.toLowerCase().includes(query)) ||
          (u.banReason && u.banReason.toLowerCase().includes(query));

        const matchesRole = roleFilter === "all" || u.role === roleFilter;

        const matchesStatus =
          statusFilter === "all" ||
          (statusFilter === "active" && (u.status === "active" || !u.status)) ||
          u.status === statusFilter;

        return matchesQuery && matchesRole && matchesStatus;
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
  }, [allUsers, searchQuery, roleFilter, statusFilter, sortBy, sortOrder]);

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
      status: "active",
      banReason: "",
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
      status: user.status || "active",
      banReason: user.banReason || "",
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
      status: formData.status,
      banReason: formData.status === "blocked" ? (formData.banReason || "Vi phạm quy chế hệ thống") : undefined,
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

  // Handle Approve User
  const handleApproveUser = async (user: User) => {
    setIsProcessing(true);
    const ok = await adminApproveUser(user.id, pendingRoles[user.id] ?? user.role);
    setIsProcessing(false);
    if (ok) {
      showAlert("success", `Đã phê duyệt tài khoản @${user.username} (${user.fullName}) thành công! Học sinh đã có thể đăng nhập.`);
    } else {
      showAlert("error", "Không thể phê duyệt tài khoản. Vui lòng thử lại.");
    }
  };

  // Handle Reject User
  const handleRejectUser = (user: User) => {
    setUserToReject(user);
  };

  const handleConfirmReject = async () => {
    if (!userToReject) return;
    setIsProcessing(true);
    const targetId = userToReject.id;
    const targetUsername = userToReject.username;
    const ok = await adminRejectUser(targetId, targetUsername);
    setIsProcessing(false);
    if (ok) {
      showAlert("success", `Đã từ chối và hủy đăng ký tài khoản @${targetUsername}.`);
      setSelectedUserIds((prev) => prev.filter((id) => id !== targetId));
      setUserToReject(null);
    } else {
      showAlert("error", "Không thể từ chối tài khoản. Vui lòng thử lại.");
    }
  };

  // Handle Block / Ban User
  const handleOpenBlockUser = (user: User) => {
    if (user.role === "admin" || user.id === currentUser?.id) {
      showAlert("error", "Không thể khóa tài khoản Quản trị viên (Admin)!");
      return;
    }
    setUserToBlock(user);
    setBlockReason("Vi phạm quy chế sử dụng hệ thống PyEdu");
    setCustomBlockReason("");
  };

  const handleConfirmBlockUser = async () => {
    if (!userToBlock) return;
    const finalReason = customBlockReason.trim() || blockReason;
    setIsProcessing(true);
    const ok = await adminBlockUser(userToBlock.id, finalReason);
    setIsProcessing(false);
    if (ok) {
      showAlert("success", `Đã khóa (Ban) tài khoản @${userToBlock.username}. Người dùng sẽ không thể đăng nhập.`);
      setUserToBlock(null);
    } else {
      showAlert("error", "Không thể khóa tài khoản. Vui lòng thử lại.");
    }
  };

  // Handle Unblock User
  const handleUnblockUser = async (user: User) => {
    setIsProcessing(true);
    const ok = await adminUnblockUser(user.id);
    setIsProcessing(false);
    if (ok) {
      showAlert("success", `Đã mở khóa tài khoản @${user.username} (${user.fullName}) thành công! Người dùng có thể đăng nhập trở lại.`);
    } else {
      showAlert("error", "Không thể mở khóa tài khoản. Vui lòng thử lại.");
    }
  };

  // Batch Approve Selected Users
  const handleBatchApproveSelected = async () => {
    const pendingIds = selectedUserIds.filter((id) => {
      const u = allUsers.find((user) => user.id === id);
      return u?.status === "pending";
    });

    if (pendingIds.length === 0) {
      showAlert("error", "Không có tài khoản nào đang chờ duyệt trong các mục đã chọn.");
      return;
    }

    setIsProcessing(true);
    const ok = await adminBatchApproveUsers(pendingIds);
    setIsProcessing(false);
    if (ok) {
      showAlert("success", `Đã phê duyệt ${pendingIds.length} tài khoản thành công!`);
      setSelectedUserIds([]);
    }
  };

  // Batch Block Selected Users
  const handleBatchBlockSelected = async () => {
    const validIds = selectedUserIds.filter((id) => {
      const u = allUsers.find((user) => user.id === id);
      return u && u.role !== "admin" && u.id !== currentUser?.id;
    });

    if (validIds.length === 0) {
      showAlert("error", "Không thể khóa tài khoản Admin hoặc không có tài khoản hợp lệ.");
      return;
    }

    setIsProcessing(true);
    const ok = await adminBatchBlockUsers(validIds, "Khóa hàng loạt bởi Quản trị viên");
    setIsProcessing(false);
    if (ok) {
      showAlert("success", `Đã khóa ${validIds.length} tài khoản đã chọn!`);
      setSelectedUserIds([]);
    }
  };

  // Approve All Pending Users at once
  const handleApproveAllPending = async () => {
    const allPendingIds = allUsers.filter((u) => u.status === "pending").map((u) => u.id);
    if (allPendingIds.length === 0) return;
    setIsProcessing(true);
    const ok = await adminBatchApproveUsers(allPendingIds);
    setIsProcessing(false);
    if (ok) {
      showAlert("success", `Đã phê duyệt toàn bộ ${allPendingIds.length} tài khoản đang chờ duyệt!`);
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
    const ok = await adminDeleteUser(userToDelete.id, userToDelete.username, userToDelete.email, userToDelete.fullName);
    setIsProcessing(false);

    if (ok) {
      showAlert("success", `Đã xóa tài khoản "${userToDelete.username}" và dữ liệu liên quan khỏi hệ thống.`);
      setSelectedUserIds((prev) => prev.filter((id) => id !== userToDelete.id));
      setUserToDelete(null);
    } else {
      showAlert("error", "Không thể xóa người dùng. Vui lòng thử lại.");
    }
  };

  // Batch Delete Selected Users
  const handleBatchDeleteSelected = async () => {
    const validUsers = selectedUserIds
      .map(id => allUsers.find(u => u.id === id))
      .filter((u): u is User => Boolean(u && u.role !== "admin" && u.id !== currentUser?.id));

    if (validUsers.length === 0) {
      showAlert("error", "Không thể xóa tài khoản Admin hoặc không có tài khoản hợp lệ để xóa.");
      return;
    }

    const validIds = validUsers.map(u => u.id);
    setIsProcessing(true);
    const ok = await adminBatchDeleteUsers(validIds);
    setIsProcessing(false);

    if (ok) {
      showAlert("success", `Đã xóa vĩnh viễn ${validIds.length} tài khoản đã chọn khỏi hệ thống!`);
      setSelectedUserIds([]);
    } else {
      showAlert("error", "Không thể xóa người dùng hàng loạt. Vui lòng thử lại.");
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
    await login(user.username, undefined, { impersonate: true });
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

        {/* VIEW 1: STATS & ANALYTICS */}
        {adminSection === "stats" && <AdminStatsView />}

        {/* VIEW 2: CURRICULUM */}
        {adminSection === "curriculum" && <AdminCurriculumView />}

        {/* VIEW 3: ALGORITHMS BANK */}
        {adminSection === "algorithms" && <AdminAlgorithmsView />}

        {/* VIEW 4: USER MANAGEMENT (DEFAULT) */}
        {adminSection === "users" && (
          <>
            {/* 4 Stat Cards with Quick Filter */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div
                onClick={() => { setStatusFilter("all"); setRoleFilter("all"); }}
                className={`bg-white p-5 rounded-2xl border transition-all cursor-pointer shadow-xs hover:border-indigo-300 flex items-center gap-4 ${
                  statusFilter === "all" ? "ring-2 ring-indigo-500/20 border-indigo-200" : "border-slate-200"
                }`}
              >
                <div className="h-12 w-12 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center flex-shrink-0">
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

              <div
                onClick={() => setStatusFilter("pending")}
                className={`bg-white p-5 rounded-2xl border transition-all cursor-pointer shadow-xs hover:border-amber-300 flex items-center gap-4 relative overflow-hidden ${
                  statusFilter === "pending" ? "ring-2 ring-amber-500/30 border-amber-300 bg-amber-50/20" : "border-slate-200"
                }`}
              >
                {stats.pending > 0 && (
                  <span className="absolute top-3 right-3 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
                  </span>
                )}
                <div className="h-12 w-12 rounded-xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center flex-shrink-0">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Chờ phê duyệt</p>
                    {stats.pending > 0 && (
                      <span className="px-1.5 py-0.2 text-[10px] font-black bg-amber-100 text-amber-800 rounded-full border border-amber-300">
                        {stats.pending} mới
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl font-black text-amber-600">{stats.pending}</h3>
                  <p className="text-[11px] text-amber-700/80 font-medium">
                    {stats.pending > 0 ? "Nhấn để lọc tài khoản chờ" : "Không có tài khoản chờ"}
                  </p>
                </div>
              </div>

              <div
                onClick={() => setStatusFilter("active")}
                className={`bg-white p-5 rounded-2xl border transition-all cursor-pointer shadow-xs hover:border-emerald-300 flex items-center gap-4 ${
                  statusFilter === "active" ? "ring-2 ring-emerald-500/20 border-emerald-200 bg-emerald-50/10" : "border-slate-200"
                }`}
              >
                <div className="h-12 w-12 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center flex-shrink-0">
                  <UserCheck className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Đang hoạt động</p>
                  <h3 className="text-2xl font-black text-slate-800">{stats.active}</h3>
                  <p className="text-[11px] text-emerald-600 font-medium">Tài khoản hợp lệ</p>
                </div>
              </div>

              <div
                onClick={() => setStatusFilter("blocked")}
                className={`bg-white p-5 rounded-2xl border transition-all cursor-pointer shadow-xs hover:border-rose-300 flex items-center gap-4 ${
                  statusFilter === "blocked" ? "ring-2 ring-rose-500/20 border-rose-200 bg-rose-50/10" : "border-slate-200"
                }`}
              >
                <div className="h-12 w-12 rounded-xl bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center flex-shrink-0">
                  <Ban className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Đã khóa / Ban</p>
                  <h3 className="text-2xl font-black text-rose-600">{stats.blocked}</h3>
                  <p className="text-[11px] text-rose-600 font-medium">
                    {stats.blocked > 0 ? "Bị cấm truy cập" : "Không có vi phạm"}
                  </p>
                </div>
              </div>
            </div>

            {/* Registration Approval Policy Toggle Box */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div
                  className={`h-11 w-11 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    requireApprovalForRegistration
                      ? "bg-amber-100 text-amber-700 border border-amber-200"
                      : "bg-emerald-100 text-emerald-700 border border-emerald-200"
                  }`}
                >
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-bold text-slate-900 text-sm">Chế độ kiểm duyệt tài khoản đăng ký mới</h4>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                        requireApprovalForRegistration
                          ? "bg-amber-50 text-amber-800 border-amber-300"
                          : "bg-emerald-50 text-emerald-800 border-emerald-300"
                      }`}
                    >
                      {requireApprovalForRegistration ? "ĐANG BẬT (Bắt buộc duyệt)" : "ĐANG TẮT (Tự do đăng ký)"}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
                    {requireApprovalForRegistration
                      ? "Mọi tài khoản đăng ký mới sẽ ở trạng thái 'Chờ duyệt' (Pending) và phải được Quản trị viên duyệt thủ công thì học sinh mới đăng nhập được."
                      : "Học sinh sau khi đăng ký tài khoản mới sẽ được tự động kích hoạt ngay lập tức mà không cần Admin phê duyệt."}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 self-start sm:self-center bg-slate-50 p-2 sm:p-2.5 rounded-xl border border-slate-200">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={requireApprovalForRegistration}
                    onChange={(e) => {
                      setRequireApprovalForRegistration(e.target.checked);
                      showAlert(
                        "success",
                        e.target.checked
                          ? "Đã BẬT chế độ kiểm duyệt đăng ký: Mọi tài khoản mới phải được Admin phê duyệt trước khi đăng nhập!"
                          : "Đã TẮT chế độ kiểm duyệt: Học sinh đăng ký tài khoản sẽ được tự động vào học ngay."
                      );
                    }}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
                <span className="text-xs font-bold text-slate-700 whitespace-nowrap">
                  {requireApprovalForRegistration ? "Bắt buộc duyệt" : "Mở tự do"}
                </span>
              </div>
            </div>

            {/* Pending Alert Banner (when pending > 0) */}
            {stats.pending > 0 && (
              <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-amber-500/15 border-2 border-amber-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold shadow-md shadow-amber-500/20 flex-shrink-0">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-amber-950">
                      Có {stats.pending} tài khoản đăng ký mới đang chờ bạn phê duyệt!
                    </h4>
                    <p className="text-xs text-amber-800">
                      Các tài khoản này chưa thể đăng nhập cho đến khi Admin xác nhận duyệt.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={() => setStatusFilter("pending")}
                    className="px-3.5 py-1.5 bg-white border border-amber-300 text-amber-900 text-xs font-bold rounded-xl hover:bg-amber-50 transition-colors cursor-pointer"
                  >
                    Xem danh sách chờ ({stats.pending})
                  </button>
                  <button
                    onClick={handleApproveAllPending}
                    disabled={isProcessing}
                    className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-emerald-600/20 cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Duyệt tất cả ngay ({stats.pending})</span>
                  </button>
                </div>
              </div>
            )}

            {/* Search, Status Tabs, Filter & Bulk Actions Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs mb-6 space-y-4">
              {/* Row 1: Search & Sort */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                {/* Search Input */}
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Tìm theo tên học sinh, @username, email, lớp, trường hoặc lý do vi phạm..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-indigo-600 focus:bg-white transition-colors"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 text-xs font-bold"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Sort selector */}
                <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-300 px-3 py-1.5 rounded-xl text-xs text-slate-700 self-end md:self-auto">
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

              {/* Row 2: Status Filter Tabs & Role Filter */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pt-3 border-t border-slate-100">
                {/* Status Tabs */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
                  <span className="text-xs font-bold text-slate-500 mr-1 flex items-center gap-1">
                    <Filter className="h-3.5 w-3.5" /> Trạng thái:
                  </span>

                  <button
                    onClick={() => setStatusFilter("all")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                      statusFilter === "all"
                        ? "bg-slate-800 text-white shadow-xs"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    Tất cả ({allUsers.length})
                  </button>

                  <button
                    onClick={() => setStatusFilter("pending")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                      statusFilter === "pending"
                        ? "bg-amber-600 text-white shadow-xs"
                        : stats.pending > 0
                        ? "bg-amber-50 text-amber-800 border border-amber-300 hover:bg-amber-100"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    <Clock className="h-3.5 w-3.5" />
                    <span>Chờ duyệt</span>
                    {stats.pending > 0 && (
                      <span
                        className={`px-1.5 py-0.2 rounded-full text-[10px] font-black ${
                          statusFilter === "pending" ? "bg-white text-amber-700" : "bg-amber-500 text-white"
                        }`}
                      >
                        {stats.pending}
                      </span>
                    )}
                  </button>

                  <button
                    onClick={() => setStatusFilter("active")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                      statusFilter === "active"
                        ? "bg-emerald-600 text-white shadow-xs"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    <UserCheck className="h-3.5 w-3.5" />
                    <span>Hoạt động ({stats.active})</span>
                  </button>

                  <button
                    onClick={() => setStatusFilter("blocked")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                      statusFilter === "blocked"
                        ? "bg-rose-600 text-white shadow-xs"
                        : stats.blocked > 0
                        ? "bg-rose-50 text-rose-700 border border-rose-300 hover:bg-rose-100"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    <Ban className="h-3.5 w-3.5" />
                    <span>Bị khóa / Ban ({stats.blocked})</span>
                  </button>
                </div>

                {/* Role Filter Buttons */}
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold self-start lg:self-auto">
                  <button
                    onClick={() => setRoleFilter("all")}
                    className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                      roleFilter === "all" ? "bg-white text-indigo-600 shadow-xs font-bold" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Mọi vai trò
                  </button>
                  <button
                    onClick={() => setRoleFilter("student")}
                    className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                      roleFilter === "student" ? "bg-white text-indigo-600 shadow-xs font-bold" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Học sinh ({stats.students})
                  </button>
                  <button
                    onClick={() => setRoleFilter("teacher")}
                    className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                      roleFilter === "teacher" ? "bg-white text-amber-600 shadow-xs font-bold" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Giáo viên ({stats.teachers})
                  </button>
                  <button
                    onClick={() => setRoleFilter("admin")}
                    className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                      roleFilter === "admin" ? "bg-white text-purple-600 shadow-xs font-bold" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Admin ({stats.admins})
                  </button>
                </div>
              </div>

              {/* Batch Action Toolbar */}
              {selectedUserIds.length > 0 && (
                <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between bg-indigo-50/60 p-3 rounded-xl text-xs gap-3">
                  <div className="flex items-center gap-2 text-indigo-950 font-bold">
                    <CheckSquare className="h-4 w-4 text-indigo-600" />
                    <span>Đã chọn {selectedUserIds.length} người dùng</span>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    {/* Batch Approve button if any pending selected */}
                    {selectedUserIds.some((id) => allUsers.find((u) => u.id === id)?.status === "pending") && (
                      <button
                        onClick={handleBatchApproveSelected}
                        disabled={isProcessing}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs disabled:opacity-50"
                      >
                        <UserCheck className="h-3.5 w-3.5" />
                        <span>Phê duyệt các mục đã chọn</span>
                      </button>
                    )}

                    {/* Batch Block button if any active non-admin selected */}
                    {selectedUserIds.some((id) => {
                      const u = allUsers.find((user) => user.id === id);
                      return u && u.role !== "admin" && u.id !== currentUser?.id && u.status !== "blocked";
                    }) && (
                      <button
                        onClick={handleBatchBlockSelected}
                        disabled={isProcessing}
                        className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs disabled:opacity-50"
                      >
                        <Ban className="h-3.5 w-3.5" />
                        <span>Khóa các mục đã chọn</span>
                      </button>
                    )}

                    {/* Batch Delete button for non-admin accounts */}
                    {selectedUserIds.some((id) => {
                      const u = allUsers.find((user) => user.id === id);
                      return u && u.role !== "admin" && u.id !== currentUser?.id;
                    }) && (
                      <button
                        onClick={handleBatchDeleteSelected}
                        disabled={isProcessing}
                        className="px-3 py-1.5 bg-rose-700 hover:bg-rose-800 text-white font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs disabled:opacity-50"
                        title="Xóa vĩnh viễn các tài khoản đã chọn"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span>Xóa các mục đã chọn</span>
                      </button>
                    )}

                    <button
                      onClick={() => setIsBatchXpOpen(true)}
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Zap className="h-3.5 w-3.5 text-amber-300" />
                      <span>Cộng XP</span>
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
                      <th className="p-4 text-center">Trạng thái</th>
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
                        <td colSpan={9} className="p-10 text-center text-slate-400 text-sm">
                          Không tìm thấy người dùng nào phù hợp với bộ lọc.
                        </td>
                      </tr>
                    ) : (
                      filteredUsers.map((user) => {
                        const isSelected = selectedUserIds.includes(user.id);
                        const isCurrentAdmin = user.id === currentUser?.id;
                        const isPending = user.status === "pending";
                        const isBlocked = user.status === "blocked";

                        return (
                          <tr
                            key={user.id}
                            className={`hover:bg-slate-50/80 transition-colors ${
                              isSelected
                                ? "bg-indigo-50/40"
                                : isPending
                                ? "bg-amber-50/20"
                                : isBlocked
                                ? "bg-rose-50/20"
                                : ""
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
                                <div className="relative">
                                  <img
                                    src={user.avatar}
                                    alt={user.fullName}
                                    className="h-10 w-10 rounded-full bg-slate-100 border border-slate-200"
                                  />
                                  {isPending && (
                                    <span className="absolute -top-1 -right-1 h-3.5 w-3.5 bg-amber-500 border-2 border-white rounded-full" />
                                  )}
                                  {isBlocked && (
                                    <span className="absolute -top-1 -right-1 h-3.5 w-3.5 bg-rose-500 border-2 border-white rounded-full flex items-center justify-center text-[8px] text-white font-bold">
                                      ✕
                                    </span>
                                  )}
                                </div>
                                <div>
                                  <div className="flex items-center gap-1.5 flex-wrap">
                                    <span className="font-bold text-slate-900">{user.fullName}</span>
                                    {isCurrentAdmin && (
                                      <span className="px-1.5 py-0.2 text-[10px] font-bold bg-indigo-100 text-indigo-700 rounded-full">
                                        (Bạn)
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-xs text-slate-500 flex items-center gap-2">
                                    <span className="font-mono text-indigo-600">@{user.username}</span>
                                    <span>•</span>
                                    <span>{user.email}</span>
                                  </p>
                                  {user.registeredAt && (
                                    <p className="text-[10px] text-slate-400 mt-0.5">
                                      Đăng ký: {user.registeredAt}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </td>

                            {/* Status Badge */}
                            <td className="p-4 text-center">
                              {isPending ? (
                                <div className="inline-flex flex-col items-center">
                                  <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-amber-50 text-amber-800 border border-amber-300 inline-flex items-center gap-1.5 shadow-xs">
                                    <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                                    <span>Chờ duyệt</span>
                                  </span>
                                  <span className="text-[10px] text-amber-700 mt-0.5">Chưa kích hoạt</span>
                                </div>
                              ) : isBlocked ? (
                                <div className="inline-flex flex-col items-center max-w-[150px]">
                                  <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-rose-50 text-rose-700 border border-rose-300 inline-flex items-center gap-1.5 shadow-xs">
                                    <Ban className="h-3.5 w-3.5 text-rose-600" />
                                    <span>Đã khóa (Ban)</span>
                                  </span>
                                  {user.banReason && (
                                    <span
                                      className="text-[10px] text-rose-600 truncate w-full text-center mt-0.5"
                                      title={user.banReason}
                                    >
                                      {user.banReason}
                                    </span>
                                  )}
                                </div>
                              ) : (
                                <div className="inline-flex flex-col items-center">
                                  <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 inline-flex items-center gap-1.5 shadow-xs">
                                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                                    <span>Hoạt động</span>
                                  </span>
                                </div>
                              )}
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
                                {/* PENDING USER ACTIONS: Approve & Reject */}
                                {isPending && (
                                  <>
                                    <select
                                      value={pendingRoles[user.id] ?? user.role}
                                      onChange={(e) =>
                                        setPendingRoles((prev) => ({ ...prev, [user.id]: e.target.value as any }))
                                      }
                                      disabled={isProcessing}
                                      className="px-2 py-1.5 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:border-indigo-600 cursor-pointer"
                                      title="Đổi vai trò nếu người dùng đăng ký sai trước khi duyệt"
                                    >
                                      <option value="student">🎓 Học sinh</option>
                                      <option value="teacher">👨‍🏫 Giáo viên</option>
                                      <option value="admin">🛡️ Admin</option>
                                    </select>
                                    <button
                                      onClick={() => handleApproveUser(user)}
                                      disabled={isProcessing}
                                      className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1 cursor-pointer disabled:opacity-50"
                                      title="Phê duyệt tài khoản: Cho phép học sinh đăng nhập và bắt đầu học"
                                    >
                                      <UserCheck className="h-3.5 w-3.5" />
                                      <span>Duyệt</span>
                                    </button>

                                    <button
                                      onClick={() => handleRejectUser(user)}
                                      disabled={isProcessing}
                                      className="px-2 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer disabled:opacity-50"
                                      title="Từ chối yêu cầu đăng ký này"
                                    >
                                      <UserX className="h-3.5 w-3.5" />
                                      <span>Từ chối</span>
                                    </button>
                                  </>
                                )}

                                {/* BLOCKED USER ACTIONS: Unblock */}
                                {isBlocked && (
                                  <button
                                    onClick={() => handleUnblockUser(user)}
                                    disabled={isProcessing}
                                    className="px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1 cursor-pointer disabled:opacity-50"
                                    title="Mở khóa tài khoản: Cho phép người dùng đăng nhập lại bình thường"
                                  >
                                    <Unlock className="h-3.5 w-3.5 text-emerald-600" />
                                    <span>Mở khóa</span>
                                  </button>
                                )}

                                {/* ACTIVE USER ACTIONS: Ban / Block Button */}
                                {!isPending && !isBlocked && !isCurrentAdmin && user.role !== "admin" && (
                                  <button
                                    onClick={() => handleOpenBlockUser(user)}
                                    className="p-1.5 text-rose-600 hover:text-rose-700 hover:bg-rose-50 border border-rose-200 rounded-lg transition-colors cursor-pointer"
                                    title="Khóa / Cấm tài khoản (Ban account) do vi phạm quy chế"
                                  >
                                    <Ban className="h-4 w-4" />
                                  </button>
                                )}

                                {/* Impersonate */}
                                {!isCurrentAdmin && !isBlocked && !isPending && (
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
                                  title="Chỉnh sửa thông tin / Trạng thái / Phân quyền"
                                >
                                  <Edit3 className="h-4 w-4" />
                                </button>

                                {/* Reset Progress (only for active users) */}
                                {!isPending && (
                                  <button
                                    onClick={() => setUserToReset(user)}
                                    className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors cursor-pointer"
                                    title="Đặt lại tiến độ học tập (Reset bài & điểm)"
                                  >
                                    <RotateCcw className="h-4 w-4" />
                                  </button>
                                )}

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
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Trạng thái tài khoản *
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as UserStatus })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-800 focus:outline-none focus:border-indigo-600 focus:bg-white"
                  >
                    <option value="active">✅ Đang hoạt động (Active)</option>
                    <option value="pending">⏳ Chờ duyệt (Pending)</option>
                    <option value="blocked">🚫 Bị khóa / Ban (Blocked)</option>
                  </select>
                </div>

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
              </div>

              {formData.status === "blocked" && (
                <div>
                  <label className="block text-xs font-semibold text-rose-700 mb-1">
                    Lý do khóa / Ban tài khoản *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ví dụ: Vi phạm quy chế thi, ngôn từ không phù hợp..."
                    value={formData.banReason}
                    onChange={(e) => setFormData({ ...formData, banReason: e.target.value })}
                    className="w-full px-3 py-2 bg-rose-50 border border-rose-300 rounded-xl text-sm focus:outline-none focus:border-rose-600 focus:bg-white text-rose-900"
                  />
                </div>
              )}

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

      {/* MODAL: Khóa / Ban tài khoản */}
      {userToBlock && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-rose-50/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-rose-100 border border-rose-200 flex items-center justify-center text-rose-600 font-bold">
                  <Ban className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Khóa tài khoản người dùng (Ban)</h3>
                  <p className="text-xs text-rose-700">Ngăn chặn truy cập do vi phạm quy chế</p>
                </div>
              </div>
              <button
                onClick={() => setUserToBlock(null)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold cursor-pointer p-1"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* User summary card */}
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl flex items-center gap-3">
                <img
                  src={userToBlock.avatar}
                  alt={userToBlock.fullName}
                  className="h-12 w-12 rounded-full border border-slate-300"
                />
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{userToBlock.fullName}</h4>
                  <p className="text-xs text-slate-500">
                    <span className="font-mono text-indigo-600">@{userToBlock.username}</span> • {userToBlock.email}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {userToBlock.grade} - {userToBlock.school || "THPT Chuyên Tin"}
                  </p>
                </div>
              </div>

              {/* Common reasons presets */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Chọn lý do vi phạm phổ biến:
                </label>
                <div className="space-y-1.5">
                  {[
                    "Vi phạm quy chế sử dụng hệ thống PyEdu",
                    "Gian lận làm bài / Sao chép mã nguồn bất thường",
                    "Ngôn từ không phù hợp, xúc phạm trong nhóm học tập",
                    "Spam hệ thống hoặc cố tình làm quá tải máy chấm bài",
                    "Tài khoản giả mạo thông tin học sinh",
                    "Khác (Tự nhập chi tiết bên dưới)"
                  ].map((preset) => (
                    <label
                      key={preset}
                      className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-xs cursor-pointer transition-colors ${
                        blockReason === preset
                          ? "bg-rose-50 border-rose-300 text-rose-900 font-semibold"
                          : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="blockReasonPreset"
                        checked={blockReason === preset}
                        onChange={() => setBlockReason(preset)}
                        className="text-rose-600 focus:ring-rose-500"
                      />
                      <span>{preset}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Custom reason or details textarea */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Chi tiết lý do khóa / Lời nhắn gửi người học:
                </label>
                <textarea
                  rows={3}
                  placeholder={
                    blockReason === "Khác (Tự nhập chi tiết bên dưới)"
                      ? "Nhập lý do cụ thể..."
                      : "Ghi chú thêm thông tin vi phạm (tùy chọn)..."
                  }
                  value={customBlockReason}
                  onChange={(e) => setCustomBlockReason(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:border-rose-600 focus:bg-white resize-none"
                />
              </div>

              {/* Warning note */}
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2 text-xs text-amber-900">
                <AlertTriangle className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <span>
                  Sau khi khóa, người dùng sẽ không thể đăng nhập hoặc nộp bài tập. Bạn có thể mở khóa lại bất kỳ lúc nào tại danh sách <b>Bị khóa / Ban</b>.
                </span>
              </div>

              {/* Action buttons */}
              <div className="pt-3 flex items-center justify-end gap-2.5 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setUserToBlock(null)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 font-semibold text-xs rounded-xl cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="button"
                  onClick={handleConfirmBlockUser}
                  disabled={isProcessing}
                  className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-rose-600/30 cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
                >
                  {isProcessing ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Ban className="h-4 w-4" />}
                  <span>Xác nhận Khóa tài khoản</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Từ chối duyệt đăng ký */}
      {userToReject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full p-6 text-center">
            <div className="h-14 w-14 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mx-auto mb-4">
              <UserX className="h-7 w-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">Từ chối yêu cầu đăng ký?</h3>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
              Bạn có chắc chắn muốn từ chối đăng ký tài khoản của học sinh <b className="text-slate-800">{userToReject.fullName}</b> (<span className="font-mono text-indigo-600">@{userToReject.username}</span>)?
            </p>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-left text-xs space-y-1 mb-5">
              <p><span className="text-slate-500">Email:</span> <b className="text-slate-700">{userToReject.email}</b></p>
              <p><span className="text-slate-500">Trường/Lớp:</span> <b className="text-slate-700">{userToReject.grade} - {userToReject.school}</b></p>
              <p className="text-[11px] text-rose-600 font-medium pt-1">Hồ sơ đăng ký này sẽ bị xóa khỏi danh sách chờ.</p>
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setUserToReject(null)}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleConfirmReject}
                disabled={isProcessing}
                className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-rose-600/30 cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? "Đang xử lý..." : "Xác nhận Từ chối"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
