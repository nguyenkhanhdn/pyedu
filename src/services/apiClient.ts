import { User, StudyGroup, PersonalNote, NotificationItem, SubmissionResult, GroupMessage, AlgorithmProblem, AlgorithmSubmission, AlgorithmLeaderboardEntry } from "../types";
import { INITIAL_STUDY_GROUPS, ALGORITHM_PROBLEMS } from "../data/curriculum";
import { SupabaseService } from "./supabaseService";

// Initial seed users for offline / static fallback
const INITIAL_FALLBACK_USERS: User[] = [
  {
    id: "usr-admin",
    username: "admin",
    email: "admin@pyedu.edu.vn",
    password: "admin@password",
    fullName: "Quản trị viên Hệ thống (Admin)",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=AdminPyEdu",
    grade: "Ban Quản trị PyEdu",
    school: "Hệ thống Đào tạo Lập trình PyEdu",
    role: "admin",
    totalXp: 9999,
    weeklyXp: 1250,
    streakDays: 60,
    lastActiveDate: new Date().toISOString().split("T")[0],
    completedLessons: ["lesson-1-1", "lesson-1-2", "lesson-1-3", "lesson-2-1", "lesson-2-2", "lesson-3-1", "lesson-3-2", "lesson-4-1", "lesson-5-1", "lesson-6-1"],
    badges: ["first_step", "streak_3", "streak_7", "streak_30", "perfect_score", "loop_master", "algo_wizard"],
    dailyGoal: 60,
    reminderTime: "08:00",
    reminderEnabled: true
  },
  {
    id: "student-khanh",
    username: "khanh_it",
    email: "khanhdsp@gmail.com",
    password: "123456",
    fullName: "Đặng Song Phúc Khánh",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=KhanhIT",
    grade: "Lớp 10A1",
    school: "THPT Chuyên Tin",
    role: "student",
    totalXp: 1450,
    weeklyXp: 420,
    streakDays: 5,
    lastActiveDate: new Date().toISOString().split("T")[0],
    completedLessons: ["lesson-1-1", "lesson-1-2", "lesson-1-3", "lesson-2-1"],
    badges: ["first_step", "streak_3", "perfect_score"],
    dailyGoal: 25,
    reminderTime: "19:30",
    reminderEnabled: true
  },
  {
    id: "teacher-nam",
    username: "thaynam_tin",
    email: "thaynam@pyedu.edu.vn",
    password: "123456",
    fullName: "Thầy Trần Văn Nam",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=TeacherNam",
    grade: "Tổ trưởng Bộ môn Tin",
    school: "THPT Chuyên Tin Học",
    role: "teacher",
    totalXp: 5200,
    weeklyXp: 1200,
    streakDays: 45,
    lastActiveDate: new Date().toISOString().split("T")[0],
    completedLessons: ["lesson-1-1", "lesson-1-2", "lesson-1-3", "lesson-2-1", "lesson-2-2", "lesson-3-1", "lesson-3-2", "lesson-4-1", "lesson-5-1", "lesson-6-1"],
    badges: ["first_step", "streak_3", "streak_7", "perfect_score", "loop_master", "algo_wizard"],
    dailyGoal: 60,
    reminderTime: "20:00",
    reminderEnabled: true
  },
  {
    id: "usr-demo-2",
    username: "lananh_coder",
    email: "lananh@gmail.com",
    password: "123456",
    fullName: "Nguyễn Lan Anh",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=LanAnh",
    grade: "Lớp 10A1",
    school: "THPT Chuyên Tin",
    role: "student",
    totalXp: 1450,
    weeklyXp: 480,
    streakDays: 12,
    lastActiveDate: new Date().toISOString().split("T")[0],
    completedLessons: ["lesson-1-1", "lesson-1-2", "lesson-1-3"],
    badges: ["first_step", "streak_3"],
    dailyGoal: 20,
    reminderTime: "19:00",
    reminderEnabled: true
  },
  {
    id: "usr-demo-3",
    username: "hoang_coder",
    email: "hoang@thpt-chuyentin.edu.vn",
    password: "123456",
    fullName: "Vũ Huy Hoàng",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=HuyHoang",
    grade: "Lớp 11 Tin",
    school: "THPT Chuyên Tin Học",
    role: "student",
    totalXp: 2150,
    weeklyXp: 610,
    streakDays: 9,
    lastActiveDate: new Date().toISOString().split("T")[0],
    completedLessons: ["lesson-1-1", "lesson-1-2", "lesson-1-3", "lesson-2-1", "lesson-2-2", "lesson-3-1"],
    badges: ["first_step", "streak_3", "streak_7", "loop_master"],
    dailyGoal: 30,
    reminderTime: "21:00",
    reminderEnabled: true,
    status: "active"
  },
  {
    id: "usr-pending-1",
    username: "minhtriet_tin",
    email: "triet.nguyen@chuyentin.edu.vn",
    password: "123",
    fullName: "Nguyễn Minh Triết",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=MinhTriet",
    grade: "Lớp 10 Chuyên Tin",
    school: "THPT Chuyên Lê Hồng Phong",
    role: "student",
    status: "pending",
    registeredAt: "2026-10-02",
    totalXp: 0,
    weeklyXp: 0,
    streakDays: 0,
    lastActiveDate: "2026-10-02",
    completedLessons: [],
    badges: [],
    dailyGoal: 20,
    reminderTime: "19:00",
    reminderEnabled: true
  },
  {
    id: "usr-pending-2",
    username: "hongngoc_py",
    email: "ngoc.tran@lequydon.edu.vn",
    password: "123",
    fullName: "Trần Thị Hồng Ngọc",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=HongNgoc",
    grade: "Lớp 11A2",
    school: "THPT Lê Quý Đôn",
    role: "student",
    status: "pending",
    registeredAt: "2026-10-03",
    totalXp: 0,
    weeklyXp: 0,
    streakDays: 0,
    lastActiveDate: "2026-10-03",
    completedLessons: [],
    badges: [],
    dailyGoal: 30,
    reminderTime: "20:00",
    reminderEnabled: true
  },
  {
    id: "usr-blocked-1",
    username: "tuankhang_hack",
    email: "khang.tuan@spammail.com",
    password: "123",
    fullName: "Lê Tuấn Khang",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=TuanKhang",
    grade: "Lớp 12 Tin",
    school: "THPT Nguyễn Trãi",
    role: "student",
    status: "blocked",
    banReason: "Spam mã nguồn độc hại và gian lận nộp bài thi trái phép",
    bannedAt: "2026-09-30",
    registeredAt: "2026-09-20",
    totalXp: 200,
    weeklyXp: 0,
    streakDays: 0,
    lastActiveDate: "2026-09-30",
    completedLessons: ["lesson-1-1"],
    badges: [],
    dailyGoal: 15,
    reminderTime: "19:00",
    reminderEnabled: false
  }
];

// Helper to safely parse JSON or return null
async function safeFetchJson<T>(url: string, options?: RequestInit): Promise<T | null> {
  try {
    const res = await fetch(url, options);
    if (!res.ok) return null;
    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) return null;
    return await res.json();
  } catch {
    return null;
  }
}

// Local persistent storage manager
export class LocalDataManager {
  private static STORAGE_KEY_USERS = "pyedu_offline_users";
  private static STORAGE_KEY_CODES = "pyedu_offline_codes";
  private static STORAGE_KEY_SUBS = "pyedu_offline_subs";
  private static STORAGE_KEY_ALGO_SUBS = "pyedu_algo_submissions";
  private static STORAGE_KEY_NOTES = "pyedu_offline_notes";
  private static STORAGE_KEY_GROUPS = "pyedu_offline_groups";
  private static STORAGE_KEY_NOTIFS = "pyedu_offline_notifs";
  private static STORAGE_KEY_REQUIRE_APPROVAL = "pyedu_require_approval";
  private static STORAGE_KEY_DELETED_USERS = "pyedu_deleted_users";

  public static getDeletedIdentifiers(): Set<string> {
    const defaultBlacklist = [
      "hahaha",
      "hahahahahaha",
      "@hahahahahaha",
      "test-user-temp-999",
      "usr-test-delete-123"
    ];
    let stored: string[] = [];
    try {
      const data = localStorage.getItem(this.STORAGE_KEY_DELETED_USERS);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) stored = parsed;
      }
    } catch {}
    const set = new Set<string>();
    [...defaultBlacklist, ...stored].forEach(s => {
      if (s && typeof s === "string") {
        const clean = s.toLowerCase().trim();
        set.add(clean);
        if (clean.startsWith("@")) {
          set.add(clean.substring(1));
        }
      }
    });
    return set;
  }

  public static isUserDeleted(id?: string, username?: string, email?: string, fullName?: string): boolean {
    const deletedSet = this.getDeletedIdentifiers();
    const checks = [id, username, email, fullName];
    for (const c of checks) {
      if (!c || typeof c !== "string") continue;
      const clean = c.toLowerCase().trim();
      if (deletedSet.has(clean)) return true;
      if (clean.startsWith("@") && deletedSet.has(clean.substring(1))) return true;
      if (clean === "hahaha" || clean === "hahahahahaha" || clean === "@hahahahahaha") return true;
      if (clean.startsWith("deleted_")) return true;
      if (clean === "[tài khoản đã xóa]" || clean === "[đã xóa]") return true;
    }
    return false;
  }

  public static recordDeletedIdentifier(...identifiers: (string | undefined)[]) {
    try {
      const current = this.getDeletedIdentifiers();
      identifiers.forEach(id => {
        if (id && typeof id === "string") {
          const clean = id.toLowerCase().trim();
          current.add(clean);
          if (clean.startsWith("@")) {
            current.add(clean.substring(1));
          }
        }
      });
      localStorage.setItem(this.STORAGE_KEY_DELETED_USERS, JSON.stringify(Array.from(current)));
    } catch {}
  }

  public static getRequireApprovalSetting(): boolean {
    try {
      const val = localStorage.getItem(this.STORAGE_KEY_REQUIRE_APPROVAL);
      if (val !== null) return val === "true";
    } catch {}
    return true; // Mặc định BẬT chế độ kiểm duyệt tài khoản đăng ký
  }

  public static setRequireApprovalSetting(enabled: boolean) {
    try {
      localStorage.setItem(this.STORAGE_KEY_REQUIRE_APPROVAL, String(enabled));
    } catch {}
  }

  public static getUsers(): User[] {
    let users: User[] = [];
    try {
      const data = localStorage.getItem(this.STORAGE_KEY_USERS);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length > 0) {
          users = parsed;
        }
      }
    } catch {}

    const deletedSet = this.getDeletedIdentifiers();

    if (users.length === 0) {
      users = [...INITIAL_FALLBACK_USERS];
    } else {
      // Ensure all users have valid status
      users = users.map(u => ({
        ...u,
        status: u.status || 'active'
      }));

      // Self-heal: ensure default system accounts exist
      // 1. Admin account
      const adminIdx = users.findIndex(u => u.username?.toLowerCase() === "admin" || u.email?.toLowerCase() === "admin@pyedu.edu.vn");
      const defaultAdmin = INITIAL_FALLBACK_USERS.find(u => u.username === "admin")!;
      if (adminIdx === -1) {
        users.unshift(defaultAdmin);
      } else {
        users[adminIdx] = {
          ...defaultAdmin,
          ...users[adminIdx],
          role: "admin",
          status: "active",
          password: users[adminIdx].password || "admin@password"
        };
      }

      // 2. Khanh student account
      const khanhIdx = users.findIndex(u => u.username?.toLowerCase() === "khanh_it" || u.username?.toLowerCase() === "khanh_tin10");
      const defaultKhanh = INITIAL_FALLBACK_USERS.find(u => u.username === "khanh_it")!;
      if (khanhIdx === -1) {
        users.push(defaultKhanh);
      } else {
        users[khanhIdx] = {
          ...defaultKhanh,
          ...users[khanhIdx],
          status: users[khanhIdx].status || "active",
          password: users[khanhIdx].password || "123456"
        };
      }

      // 3. Teacher Nam account
      const teacherIdx = users.findIndex(u => u.username?.toLowerCase() === "thaynam_tin" || u.username?.toLowerCase() === "thaynam_gv");
      const defaultTeacher = INITIAL_FALLBACK_USERS.find(u => u.username === "thaynam_tin")!;
      if (teacherIdx === -1) {
        users.push(defaultTeacher);
      } else {
        users[teacherIdx] = {
          ...defaultTeacher,
          ...users[teacherIdx],
          status: users[teacherIdx].status || "active",
          password: users[teacherIdx].password || "123456"
        };
      }

      // Ensure demo pending and blocked accounts exist if missing
      const pending1 = INITIAL_FALLBACK_USERS.find(u => u.id === "usr-pending-1");
      if (pending1 && !deletedSet.has(pending1.id.toLowerCase()) && !deletedSet.has(pending1.username.toLowerCase()) && !users.some(u => u.id === pending1.id || u.username === pending1.username)) {
        users.push(pending1);
      }
      const pending2 = INITIAL_FALLBACK_USERS.find(u => u.id === "usr-pending-2");
      if (pending2 && !deletedSet.has(pending2.id.toLowerCase()) && !deletedSet.has(pending2.username.toLowerCase()) && !users.some(u => u.id === pending2.id || u.username === pending2.username)) {
        users.push(pending2);
      }
      const blocked1 = INITIAL_FALLBACK_USERS.find(u => u.id === "usr-blocked-1");
      if (blocked1 && !deletedSet.has(blocked1.id.toLowerCase()) && !deletedSet.has(blocked1.username.toLowerCase()) && !users.some(u => u.id === blocked1.id || u.username === blocked1.username)) {
        users.push(blocked1);
      }
    }

    // Filter out deleted accounts definitively
    users = users.filter(u => 
      u.role !== 'deleted' &&
      u.fullName !== '[Tài khoản đã xóa]' &&
      u.fullName !== '[Đã xóa]' &&
      !this.isUserDeleted(u.id, u.username, u.email, u.fullName)
    );

    this.saveUsers(users);
    return users;
  }

  public static saveUsers(users: User[]) {
    try {
      const cleanUsers = users.filter(u => 
        u.role !== 'deleted' &&
        u.fullName !== '[Tài khoản đã xóa]' &&
        u.fullName !== '[Đã xóa]' &&
        !this.isUserDeleted(u.id, u.username, u.email, u.fullName)
      );
      localStorage.setItem(this.STORAGE_KEY_USERS, JSON.stringify(cleanUsers));
    } catch {}
  }

  public static getUserById(id: string): User | null {
    const users = this.getUsers();
    return users.find(u => u.id === id || u.username?.toLowerCase() === id.toLowerCase()) || null;
  }

  public static updateUser(id: string, updates: Partial<User>): User | null {
    const users = this.getUsers();
    const idx = users.findIndex(u => u.id === id || u.username?.toLowerCase() === id.toLowerCase());
    if (idx === -1) return null;
    users[idx] = { ...users[idx], ...updates };
    this.saveUsers(users);
    return users[idx];
  }

  public static deleteUser(id: string, username?: string, email?: string, fullName?: string): boolean {
    const candidates = [id, username, email, fullName].filter(Boolean) as string[];
    this.recordDeletedIdentifier(...candidates);

    const users = this.getUsers();
    const targets = users.filter(u => 
      (id && (u.id === id || u.username?.toLowerCase() === id.toLowerCase() || (u.email && u.email.toLowerCase() === id.toLowerCase()))) ||
      (username && (u.username?.toLowerCase() === username.toLowerCase() || u.id === username)) ||
      (email && u.email && u.email.toLowerCase() === email.toLowerCase()) ||
      (fullName && u.fullName && u.fullName.toLowerCase() === fullName.toLowerCase()) ||
      this.isUserDeleted(u.id, u.username, u.email, u.fullName)
    );

    targets.forEach(t => {
      this.recordDeletedIdentifier(t.id, t.username, t.email, t.fullName);
    });

    const filtered = users.filter(u => {
      if (this.isUserDeleted(u.id, u.username, u.email, u.fullName)) return false;
      if (id && (u.id === id || u.username?.toLowerCase() === id.toLowerCase() || (u.email && u.email.toLowerCase() === id.toLowerCase()))) return false;
      if (username && (u.username?.toLowerCase() === username.toLowerCase() || u.id === username)) return false;
      if (email && u.email && u.email.toLowerCase() === email.toLowerCase()) return false;
      if (fullName && u.fullName && u.fullName.toLowerCase() === fullName.toLowerCase()) return false;
      if (targets.some(t => t.id === u.id || (t.username && u.username && t.username.toLowerCase() === u.username.toLowerCase()))) return false;
      return true;
    });

    this.saveUsers(filtered);

    // Clean up user-related storage for all identifiers
    const allIdsAndNames = new Set<string>();
    candidates.forEach(c => allIdsAndNames.add(c));
    targets.forEach(t => {
      if (t.id) allIdsAndNames.add(t.id);
      if (t.username) allIdsAndNames.add(t.username);
    });

    allIdsAndNames.forEach(ident => {
      try {
        localStorage.removeItem(`${this.STORAGE_KEY_CODES}_${ident}`);
        localStorage.removeItem(`${this.STORAGE_KEY_SUBS}_${ident}`);
        localStorage.removeItem(`${this.STORAGE_KEY_NOTES}_${ident}`);
        localStorage.removeItem(`${this.STORAGE_KEY_NOTIFS}_${ident}`);
      } catch {}
    });

    // If active user was deleted, clear it from localStorage
    try {
      const cur = localStorage.getItem("pyedu_current_user");
      if (cur) {
        const u = JSON.parse(cur);
        if (
          allIdsAndNames.has(u.id) ||
          allIdsAndNames.has(u.username) ||
          this.isUserDeleted(u.id, u.username, u.email, u.fullName)
        ) {
          localStorage.removeItem("pyedu_current_user");
        }
      }
    } catch {}

    return true;
  }

  public static approveUser(userId: string): User | null {
    const user = this.getUserById(userId);
    if (!user) return null;
    return this.updateUser(userId, {
      status: "active",
      approvedAt: new Date().toISOString().split("T")[0]
    });
  }

  public static blockUser(userId: string, reason?: string): User | null {
    const user = this.getUserById(userId);
    if (!user || user.role === 'admin') return null;
    return this.updateUser(userId, {
      status: "blocked",
      banReason: reason?.trim() || "Vi phạm quy chế sử dụng hệ thống PyEdu",
      bannedAt: new Date().toISOString().split("T")[0]
    });
  }

  public static unblockUser(userId: string): User | null {
    const user = this.getUserById(userId);
    if (!user) return null;
    return this.updateUser(userId, {
      status: "active",
      banReason: undefined,
      bannedAt: undefined
    });
  }

  public static batchApproveUsers(userIds: string[]): boolean {
    const users = this.getUsers();
    let changed = false;
    const now = new Date().toISOString().split("T")[0];
    users.forEach(u => {
      if (userIds.includes(u.id) && u.status === 'pending') {
        u.status = 'active';
        u.approvedAt = now;
        changed = true;
      }
    });
    if (changed) this.saveUsers(users);
    return changed;
  }

  public static batchBlockUsers(userIds: string[], reason?: string): boolean {
    const users = this.getUsers();
    let changed = false;
    const now = new Date().toISOString().split("T")[0];
    users.forEach(u => {
      if (userIds.includes(u.id) && u.role !== 'admin') {
        u.status = 'blocked';
        u.banReason = reason?.trim() || "Bị khóa theo danh sách vi phạm của Quản trị viên";
        u.bannedAt = now;
        changed = true;
      }
    });
    if (changed) this.saveUsers(users);
    return changed;
  }

  public static resetUserProgress(id: string): User | null {
    const user = this.getUserById(id);
    if (!user) return null;
    const updated = this.updateUser(id, {
      completedLessons: [],
      totalXp: user.role === 'admin' ? 9999 : 0,
      weeklyXp: 0,
      streakDays: 1,
      badges: ["first_step"]
    });
    try {
      localStorage.removeItem(`${this.STORAGE_KEY_CODES}_${id}`);
      localStorage.removeItem(`${this.STORAGE_KEY_SUBS}_${id}`);
    } catch {}
    return updated;
  }

  public static batchAddXp(userIds: string[], xpAmount: number) {
    const users = this.getUsers();
    users.forEach(u => {
      if (userIds.includes(u.id)) {
        u.totalXp += xpAmount;
        u.weeklyXp += xpAmount;
      }
    });
    this.saveUsers(users);
  }

  public static getCodes(userId: string): Record<string, string> {
    try {
      const raw = localStorage.getItem(`${this.STORAGE_KEY_CODES}_${userId}`);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  }

  public static saveCode(userId: string, lessonId: string, code: string) {
    try {
      const codes = this.getCodes(userId);
      codes[lessonId] = code;
      localStorage.setItem(`${this.STORAGE_KEY_CODES}_${userId}`, JSON.stringify(codes));
    } catch {}
  }

  public static getSubmissions(userId: string): SubmissionResult[] {
    try {
      const raw = localStorage.getItem(`${this.STORAGE_KEY_SUBS}_${userId}`);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  public static recordSubmission(userId: string, sub: SubmissionResult & { xpEarned?: number }): User | null {
    try {
      const subs = this.getSubmissions(userId);
      subs.unshift(sub);
      localStorage.setItem(`${this.STORAGE_KEY_SUBS}_${userId}`, JSON.stringify(subs));

      // Update user completion & XP
      const user = this.getUserById(userId);
      if (!user) return null;

      const completedLessons = [...user.completedLessons];
      let newXp = user.totalXp;
      let newWeeklyXp = user.weeklyXp;

      if (sub.passed && !completedLessons.includes(sub.lessonId)) {
        completedLessons.push(sub.lessonId);
        newXp += (sub.xpEarned || 50);
        newWeeklyXp += (sub.xpEarned || 50);
      }

      // Check badges
      const userBadges = [...user.badges];
      if (sub.passed && !userBadges.includes("first_step")) {
        userBadges.push("first_step");
      }
      if (sub.score === 100 && !userBadges.includes("perfect_score")) {
        userBadges.push("perfect_score");
      }

      return this.updateUser(userId, {
        completedLessons,
        totalXp: newXp,
        weeklyXp: newWeeklyXp,
        badges: userBadges
      });
    } catch {
      return null;
    }
  }

  public static getAlgorithmSubmissions(userId: string): AlgorithmSubmission[] {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY_ALGO_SUBS);
      if (!raw) return [];
      const all: AlgorithmSubmission[] = JSON.parse(raw);
      return all;
    } catch {
      return [];
    }
  }

  public static saveAlgorithmSubmission(sub: AlgorithmSubmission) {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY_ALGO_SUBS);
      const all: AlgorithmSubmission[] = raw ? JSON.parse(raw) : [];
      const idx = all.findIndex(s => s.id === sub.id || (s.problemId === sub.problemId && s.score <= sub.score));
      if (idx >= 0) {
        all[idx] = sub;
      } else {
        all.unshift(sub);
      }
      localStorage.setItem(this.STORAGE_KEY_ALGO_SUBS, JSON.stringify(all));
    } catch {}
  }

  public static getNotes(userId: string): PersonalNote[] {
    try {
      const raw = localStorage.getItem(`${this.STORAGE_KEY_NOTES}_${userId}`);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  public static saveNotes(userId: string, notes: PersonalNote[]) {
    try {
      localStorage.setItem(`${this.STORAGE_KEY_NOTES}_${userId}`, JSON.stringify(notes));
    } catch {}
  }

  public static getGroups(userId?: string): StudyGroup[] {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY_GROUPS);
      if (raw) {
        const groups = JSON.parse(raw);
        if (Array.isArray(groups) && groups.length > 0) return groups as StudyGroup[];
      }
    } catch {}
    const defaultGroups = INITIAL_STUDY_GROUPS as StudyGroup[];
    this.saveGroups(defaultGroups);
    return defaultGroups;
  }

  public static saveGroups(groups: StudyGroup[]) {
    try {
      localStorage.setItem(this.STORAGE_KEY_GROUPS, JSON.stringify(groups));
    } catch {}
  }

  public static getNotifications(userId: string): NotificationItem[] {
    try {
      const raw = localStorage.getItem(`${this.STORAGE_KEY_NOTIFS}_${userId}`);
      return raw ? JSON.parse(raw) : [
        {
          id: "notif-welcome",
          title: "Chào mừng bạn đến với PyEdu!",
          message: "Chúc bạn có những giờ học lập trình Python thật vui và bổ ích cùng thầy và các bạn!",
          timestamp: "Vừa xong",
          read: false,
          type: "system"
        }
      ];
    } catch {
      return [];
    }
  }

  public static saveNotifications(userId: string, notifs: NotificationItem[]) {
    try {
      localStorage.setItem(`${this.STORAGE_KEY_NOTIFS}_${userId}`, JSON.stringify(notifs));
    } catch {}
  }
}

// API Service with 100% Direct Supabase Connection
export const ApiService = {
  async fetchUsers(): Promise<User[]> {
    const deletedSet = LocalDataManager.getDeletedIdentifiers();

    if (SupabaseService.isAvailable()) {
      try {
        const supabaseUsers = await SupabaseService.getAllUsers();
        if (supabaseUsers && supabaseUsers.length > 0) {
          const cleanUsers = supabaseUsers.filter(u => 
            u.role !== 'deleted' && 
            u.fullName !== '[Tài khoản đã xóa]' &&
            u.fullName !== '[Đã xóa]' &&
            !LocalDataManager.isUserDeleted(u.id, u.username, u.email, u.fullName)
          );
          LocalDataManager.saveUsers(cleanUsers);
          return cleanUsers;
        }
      } catch (err) {
        console.warn("Supabase fetchUsers notice:", err);
      }
    }

    // Fallback to SQLite backend if available
    try {
      const res = await fetch("/api/auth/users");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data?.users) && data.users.length > 0) {
          const cleanApiUsers = data.users.filter((u: User) => 
            u.role !== 'deleted' &&
            u.fullName !== '[Tài khoản đã xóa]' &&
            u.fullName !== '[Đã xóa]' &&
            !LocalDataManager.isUserDeleted(u.id, u.username, u.email, u.fullName)
          );
          if (cleanApiUsers.length > 0) {
            LocalDataManager.saveUsers(cleanApiUsers);
            return cleanApiUsers;
          }
        }
      }
    } catch {}

    return LocalDataManager.getUsers();
  },

  async fetchGroups(userId?: string): Promise<StudyGroup[]> {
    if (SupabaseService.isAvailable() && userId) {
      try {
        const supabaseGroups = await SupabaseService.getStudyGroups(userId);
        if (supabaseGroups && supabaseGroups.length > 0) {
          LocalDataManager.saveGroups(supabaseGroups);
          return supabaseGroups;
        }
      } catch (err) {
        console.warn("Supabase fetchGroups notice:", err);
      }
    }
    return LocalDataManager.getGroups(userId);
  },

  async login(usernameOrEmail: string, password?: string): Promise<User | null> {
    const rawQuery = (usernameOrEmail || "").trim();
    const query = rawQuery.toLowerCase();
    const pwd = (password || "").trim();

    // 1. Direct Supabase Cloud Authentication & User retrieval
    if (SupabaseService.isAvailable()) {
      try {
        const suUser = await SupabaseService.getUserByCredentials(rawQuery, pwd || undefined);
        if (suUser) {
          if (suUser.status === 'blocked') {
            const err: any = new Error(`Tài khoản @${suUser.username} đã bị KHÓA bởi Quản trị viên!\nLý do: ${suUser.banReason || 'Vi phạm quy định sử dụng hệ thống'}`);
            err.code = 'USER_BLOCKED';
            throw err;
          }

          if (suUser.status === 'pending') {
            const err: any = new Error(`Tài khoản @${suUser.username} đang CHỜ DUYỆT từ Quản trị viên. Vui lòng liên hệ ban quản trị để kích hoạt tài khoản!`);
            err.code = 'USER_PENDING';
            throw err;
          }

          LocalDataManager.updateUser(suUser.id, suUser);
          return suUser;
        }
      } catch (err: any) {
        if (err.code === 'USER_BLOCKED' || err.code === 'USER_PENDING') {
          throw err;
        }
        console.warn("Supabase login notice:", err);
      }
    }

    // 2. Direct Fallback: search in local state cache
    const users = LocalDataManager.getUsers();
    const matched = users.find(u => 
      u.username?.toLowerCase() === query || 
      u.email?.toLowerCase() === query
    );
    
    if (matched) {
      if (query === "admin" || matched.role === "admin") {
        if (pwd && pwd !== "admin@password" && matched.password && matched.password !== pwd) {
          return null;
        }
        return matched;
      } else if (pwd && matched.password && matched.password !== pwd) {
        return null;
      }

      // Kiểm tra trạng thái tài khoản
      if (matched.status === 'blocked') {
        const err: any = new Error(`Tài khoản @${matched.username} đã bị KHÓA bởi Quản trị viên!\nLý do: ${matched.banReason || 'Vi phạm quy định sử dụng hệ thống'}`);
        err.code = 'USER_BLOCKED';
        throw err;
      }

      if (matched.status === 'pending') {
        const err: any = new Error(`Tài khoản @${matched.username} đang CHỜ DUYỆT từ Quản trị viên. Vui lòng liên hệ ban quản trị để kích hoạt tài khoản!`);
        err.code = 'USER_PENDING';
        throw err;
      }

      return matched;
    }

    // Default account emergency fallback
    if (query === "admin" || query === "admin@pyedu.edu.vn") {
      if (!pwd || pwd === "admin@password") {
        const defaultAdmin = INITIAL_FALLBACK_USERS.find(u => u.username === "admin")!;
        LocalDataManager.updateUser(defaultAdmin.id, defaultAdmin);
        return defaultAdmin;
      }
    } else if (query === "khanh_it" || query === "khanhdsp@gmail.com") {
      if (!pwd || pwd === "123456" || pwd === "123") {
        const defaultKhanh = INITIAL_FALLBACK_USERS.find(u => u.username === "khanh_it")!;
        LocalDataManager.updateUser(defaultKhanh.id, defaultKhanh);
        return defaultKhanh;
      }
    } else if (query === "thaynam_tin" || query === "thaynam@pyedu.edu.vn") {
      if (!pwd || pwd === "123456" || pwd === "123") {
        const defaultTeacher = INITIAL_FALLBACK_USERS.find(u => u.username === "thaynam_tin")!;
        LocalDataManager.updateUser(defaultTeacher.id, defaultTeacher);
        return defaultTeacher;
      }
    }

    return null;
  },

  async register(userData: {
    username: string;
    email: string;
    fullName: string;
    grade: string;
    role: 'student' | 'teacher' | 'admin';
    school?: string;
    password?: string;
  }): Promise<User | null> {
    const requireApproval = LocalDataManager.getRequireApprovalSetting();
    const initialStatus: "active" | "pending" = userData.role === 'admin' ? 'active' : (requireApproval ? 'pending' : 'active');

    // 1. Direct Supabase Creation (lưu lỗi thật thay vì âm thầm chuyển sang bộ nhớ cục bộ,
    //    để tài khoản chờ duyệt luôn xuất hiện trong danh sách của Admin)
    if (SupabaseService.isAvailable()) {
      const suUser = await SupabaseService.createUser({
        ...userData,
        status: initialStatus
      });
      if (suUser) {
        const users = LocalDataManager.getUsers().filter(u => u.id !== suUser.id);
        users.push(suUser);
        LocalDataManager.saveUsers(users);
        return suUser;
      }
      throw new Error("Không thể lưu tài khoản lên Supabase. Vui lòng thử lại sau.");
    }

    // 2. Direct SQLite backend creation
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...userData,
          status: initialStatus
        })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.user) {
          const users = LocalDataManager.getUsers().filter(
            u => u.id !== data.user.id && u.username.toLowerCase() !== data.user.username.toLowerCase()
          );
          users.push(data.user);
          LocalDataManager.saveUsers(users);
          return data.user;
        }
      }
    } catch (e) {
      console.warn("Backend register notice:", e);
    }

    // 3. Direct Local Fallback
    const users = LocalDataManager.getUsers();
    const newUser: User = {
      id: `usr-${Date.now()}`,
      username: userData.username.trim(),
      email: userData.email.trim(),
      password: userData.password || (userData.role === 'admin' ? "admin@password" : "123456"),
      fullName: userData.fullName.trim(),
      grade: userData.grade || "Lớp 10 Tin",
      school: userData.school || "THPT Chuyên Tin Học",
      role: userData.role || "student",
      status: initialStatus,
      registeredAt: new Date().toISOString().split("T")[0],
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(userData.username)}`,
      totalXp: userData.role === 'admin' ? 9999 : 0,
      weeklyXp: 0,
      streakDays: 1,
      lastActiveDate: new Date().toISOString().split("T")[0],
      completedLessons: userData.role === 'admin' ? ["lesson-1-1", "lesson-1-2", "lesson-1-3", "lesson-2-1", "lesson-2-2", "lesson-3-1", "lesson-3-2", "lesson-4-1", "lesson-5-1", "lesson-6-1"] : [],
      badges: userData.role === 'admin' ? ["first_step", "streak_3", "streak_7", "perfect_score", "loop_master", "algo_wizard"] : ["first_step"],
      dailyGoal: 20,
      reminderTime: "19:30",
      reminderEnabled: true
    };

    users.push(newUser);
    LocalDataManager.saveUsers(users);
    return newUser;
  },

  async adminApproveUser(userId: string, role?: User["role"]): Promise<User | null> {
    const approvedAt = new Date().toISOString().split("T")[0];
    const updates: Partial<User> = { status: "active", approvedAt };
    if (role) updates.role = role;
    if (SupabaseService.isAvailable()) {
      const saved = await SupabaseService.updateUserProfile(userId, updates);
      if (!saved) return null;
    }
    // Admin có thể đang dùng trình duyệt chưa có bản sao cục bộ của người dùng này
    return LocalDataManager.updateUser(userId, updates) || ({ id: userId, ...updates } as User);
  },

  async adminRejectUser(userId: string, username?: string, email?: string, fullName?: string): Promise<boolean> {
    return this.adminDeleteUser(userId, username, email, fullName);
  },

  async adminBlockUser(userId: string, reason?: string): Promise<User | null> {
    const today = new Date().toISOString().split("T")[0];
    const finalReason = reason?.trim() || "Vi phạm quy chế sử dụng hệ thống PyEdu";
    if (SupabaseService.isAvailable()) {
      await SupabaseService.updateUserProfile(userId, { status: "blocked", banReason: finalReason, bannedAt: today });
    }
    return LocalDataManager.blockUser(userId, finalReason);
  },

  async adminUnblockUser(userId: string): Promise<User | null> {
    if (SupabaseService.isAvailable()) {
      await SupabaseService.updateUserProfile(userId, { status: "active", banReason: null as any, bannedAt: null as any });
    }
    return LocalDataManager.unblockUser(userId);
  },

  async adminBatchApproveUsers(userIds: string[]): Promise<boolean> {
    const now = new Date().toISOString().split("T")[0];
    if (SupabaseService.isAvailable()) {
      const ok = await SupabaseService.batchUpdateUsers(userIds, { status: "active", approved_at: now });
      if (!ok) return false;
    }
    LocalDataManager.batchApproveUsers(userIds);
    return true;
  },

  async adminBatchBlockUsers(userIds: string[], reason?: string): Promise<boolean> {
    if (SupabaseService.isAvailable()) {
      await SupabaseService.batchUpdateUsers(userIds, {
        status: "blocked",
        ban_reason: reason || "Khóa hàng loạt",
        banned_at: new Date().toISOString().split("T")[0]
      });
    }
    return LocalDataManager.batchBlockUsers(userIds, reason);
  },

  async adminBatchDeleteUsers(userIds: string[], userObjects?: User[]): Promise<boolean> {
    // 1. Delete on SQLite backend
    try {
      const identifiers = new Set<string>();
      userIds.forEach(id => identifiers.add(id));
      if (userObjects) {
        userObjects.forEach(u => {
          if (u.id) identifiers.add(u.id);
          if (u.username) identifiers.add(u.username);
          if (u.email) identifiers.add(u.email);
        });
      }
      await fetch("/api/admin/users/batch-delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifiers: Array.from(identifiers) })
      });
    } catch (e) {
      console.warn("Backend batch delete notice:", e);
    }

    // 2. Delete on Supabase
    if (SupabaseService.isAvailable()) {
      for (const id of userIds) {
        const obj = userObjects?.find(u => u.id === id);
        await SupabaseService.deleteUser(id, obj?.username, obj?.email);
      }
    }

    // 3. Delete in LocalDataManager
    for (const id of userIds) {
      const obj = userObjects?.find(u => u.id === id);
      LocalDataManager.deleteUser(id, obj?.username, obj?.email, obj?.fullName);
    }

    return true;
  },

  isUserDeleted(id?: string, username?: string, email?: string, fullName?: string): boolean {
    return LocalDataManager.isUserDeleted(id, username, email, fullName);
  },

  getRequireApprovalSetting(): boolean {
    return LocalDataManager.getRequireApprovalSetting();
  },

  setRequireApprovalSetting(enabled: boolean): void {
    LocalDataManager.setRequireApprovalSetting(enabled);
  },

  async adminDeleteUser(userId: string, username?: string, email?: string, fullName?: string): Promise<boolean> {
    // 1. Delete from SQLite backend by all potential keys
    try {
      if (userId) {
        await fetch(`/api/user/${encodeURIComponent(userId)}`, { method: "DELETE" });
      }
      if (username) {
        await fetch(`/api/user/${encodeURIComponent(username)}`, { method: "DELETE" });
      }
      if (email) {
        await fetch(`/api/user/${encodeURIComponent(email)}`, { method: "DELETE" });
      }
    } catch (e) {
      console.warn("Backend user delete notice:", e);
    }

    // 2. Delete from Supabase
    if (SupabaseService.isAvailable()) {
      try {
        await SupabaseService.deleteUser(userId, username, email);
      } catch (e) {
        console.warn("Supabase delete notice:", e);
      }
    }

    // 3. Delete from LocalDataManager and blacklist permanently
    LocalDataManager.deleteUser(userId, username, email, fullName);
    return true;
  },

  async adminResetUserProgress(userId: string): Promise<User | null> {
    if (SupabaseService.isAvailable()) {
      await SupabaseService.resetUserProgress(userId);
    }
    return LocalDataManager.resetUserProgress(userId);
  },

  async adminUpdateUser(userId: string, updates: Partial<User> & { password?: string }): Promise<User | null> {
    if (SupabaseService.isAvailable()) {
      await SupabaseService.updateUserProfile(userId, updates);
    }
    return LocalDataManager.updateUser(userId, updates);
  },

  async adminBatchAddXp(userIds: string[], xpAmount: number): Promise<void> {
    LocalDataManager.batchAddXp(userIds, xpAmount);
    if (SupabaseService.isAvailable()) {
      for (const uid of userIds) {
        const u = LocalDataManager.getUserById(uid);
        if (u) {
          await SupabaseService.updateUserProfile(uid, { totalXp: u.totalXp, weeklyXp: u.weeklyXp });
        }
      }
    }
  },

  async loadUserData(userId: string) {
    if (SupabaseService.isAvailable()) {
      try {
        const suData = await SupabaseService.loadUserData(userId);
        if (suData && suData.user) {
          return suData;
        }
      } catch (err) {
        console.warn("Supabase direct loadUserData notice:", err);
      }
    }

    // Fallback: assemble from local manager
    const user = LocalDataManager.getUserById(userId);
    const codes = LocalDataManager.getCodes(userId);
    const submissions = LocalDataManager.getSubmissions(userId);
    const notes = LocalDataManager.getNotes(userId);
    const groups = LocalDataManager.getGroups(userId);
    const notifications = LocalDataManager.getNotifications(userId);

    return {
      user: user || undefined,
      codes,
      submissions,
      notes,
      groups,
      notifications
    };
  },

  async saveCode(userId: string, lessonId: string, code: string) {
    LocalDataManager.saveCode(userId, lessonId, code);
    if (SupabaseService.isAvailable()) {
      await SupabaseService.saveUserCode(userId, lessonId, code);
    }
  },

  async recordSubmission(userId: string, payload: {
    lessonId: string;
    passed: boolean;
    score: number;
    totalTests: number;
    passedTests: number;
    runtimeMs: number;
    testResults: any[];
    xpReward: number;
  }): Promise<User | null> {
    if (SupabaseService.isAvailable()) {
      await SupabaseService.recordSubmission(userId, {
        lessonId: payload.lessonId,
        passed: payload.passed,
        score: payload.score,
        totalTests: payload.totalTests,
        passedTests: payload.passedTests,
        runtimeMs: payload.runtimeMs,
        testResults: payload.testResults,
        timestamp: new Date().toISOString(),
      });
      const user = await SupabaseService.getUserById(userId);
      if (user) {
        LocalDataManager.updateUser(userId, user);
        return user;
      }
    }

    return LocalDataManager.recordSubmission(userId, {
      lessonId: payload.lessonId,
      passed: payload.passed,
      score: payload.score,
      totalTests: payload.totalTests,
      passedTests: payload.passedTests,
      runtimeMs: payload.runtimeMs,
      testResults: payload.testResults,
      timestamp: new Date().toISOString(),
      xpEarned: payload.xpReward
    });
  },

  async fetchAlgorithmProblems(): Promise<AlgorithmProblem[]> {
    if (SupabaseService.isAvailable()) {
      try {
        const suProblems = await SupabaseService.getAlgorithmProblems();
        if (suProblems && suProblems.length > 0) {
          return suProblems;
        }
      } catch {}
    }
    return ALGORITHM_PROBLEMS;
  },

  async recordAlgorithmSubmission(userId: string, submission: AlgorithmSubmission): Promise<void> {
    LocalDataManager.saveAlgorithmSubmission(submission);
    if (SupabaseService.isAvailable()) {
      await SupabaseService.saveAlgorithmSubmission(userId, submission);
    }
  },

  async updateProfile(userId: string, updates: Partial<User>): Promise<User | null> {
    LocalDataManager.updateUser(userId, updates);
    if (SupabaseService.isAvailable()) {
      await SupabaseService.updateUserProfile(userId, updates);
      return await SupabaseService.getUserById(userId);
    }
    return LocalDataManager.getUserById(userId);
  },

  async joinGroup(groupId: string, userId: string) {
    const groups = LocalDataManager.getGroups(userId);
    const target = groups.find(g => g.id === groupId);
    if (target) {
      target.isJoined = true;
      target.memberCount += 1;
      LocalDataManager.saveGroups(groups);
    }

    if (SupabaseService.isAvailable()) {
      await SupabaseService.joinGroup(groupId, userId);
    }
  },

  async leaveGroup(groupId: string, userId: string) {
    const groups = LocalDataManager.getGroups(userId);
    const target = groups.find(g => g.id === groupId);
    if (target) {
      target.isJoined = false;
      target.memberCount = Math.max(1, target.memberCount - 1);
      LocalDataManager.saveGroups(groups);
    }

    if (SupabaseService.isAvailable()) {
      await SupabaseService.leaveGroup(groupId, userId);
    }
  },

  async sendGroupMessage(groupId: string, payload: any) {
    const groups = LocalDataManager.getGroups();
    const target = groups.find(g => g.id === groupId);
    const msg: GroupMessage = {
      id: `msg-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      likes: 0,
      isLiked: false,
      userId: payload.userId,
      userName: payload.userName,
      userAvatar: payload.userAvatar,
      userRole: payload.userRole || 'student',
      content: payload.content,
      codeSnippet: payload.codeSnippet
    };
    if (target) {
      target.messages.push(msg);
      LocalDataManager.saveGroups(groups);
    }

    if (SupabaseService.isAvailable()) {
      const suMsg = await SupabaseService.addGroupMessage(groupId, payload);
      if (suMsg) return suMsg;
    }

    return msg;
  },

  async likeGroupMessage(groupId: string, messageId: string, _userId: string) {
    const groups = LocalDataManager.getGroups();
    const target = groups.find(g => g.id === groupId);
    if (target) {
      const msg = target.messages.find(m => m.id === messageId);
      if (msg) {
        msg.isLiked = !msg.isLiked;
        msg.likes = msg.isLiked ? msg.likes + 1 : Math.max(0, msg.likes - 1);
        LocalDataManager.saveGroups(groups);
      }
    }

    if (SupabaseService.isAvailable()) {
      await SupabaseService.likeGroupMessage(messageId);
    }
  },

  async addNote(payload: any): Promise<PersonalNote> {
    const newNote: PersonalNote = {
      id: `note-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...payload
    };
    const notes = LocalDataManager.getNotes(payload.userId);
    notes.unshift(newNote);
    LocalDataManager.saveNotes(payload.userId, notes);

    if (SupabaseService.isAvailable()) {
      const suNote = await SupabaseService.addNote(payload.userId, payload);
      if (suNote) return suNote;
    }

    return newNote;
  },

  async updateNote(userId: string, id: string, updates: Partial<PersonalNote>) {
    const notes = LocalDataManager.getNotes(userId);
    const idx = notes.findIndex(n => n.id === id);
    if (idx !== -1) {
      notes[idx] = { ...notes[idx], ...updates, updatedAt: new Date().toISOString() };
      LocalDataManager.saveNotes(userId, notes);
    }

    if (SupabaseService.isAvailable()) {
      await SupabaseService.updateNote(id, updates);
    }
  },

  async deleteNote(userId: string, id: string) {
    const notes = LocalDataManager.getNotes(userId).filter(n => n.id !== id);
    LocalDataManager.saveNotes(userId, notes);

    if (SupabaseService.isAvailable()) {
      await SupabaseService.deleteNote(id);
    }
  },

  async addNotification(userId: string, item: Omit<NotificationItem, "id" | "timestamp" | "read">): Promise<NotificationItem> {
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      timestamp: "Vừa xong",
      read: false,
      ...item
    };
    const notifs = LocalDataManager.getNotifications(userId);
    notifs.unshift(newNotif);
    LocalDataManager.saveNotifications(userId, notifs);

    if (SupabaseService.isAvailable()) {
      const suNotif = await SupabaseService.addNotification(userId, item);
      if (suNotif) return suNotif;
    }

    return newNotif;
  },

  async markNotificationRead(userId: string, id: string) {
    const notifs = LocalDataManager.getNotifications(userId);
    const target = notifs.find(n => n.id === id);
    if (target) {
      target.read = true;
      LocalDataManager.saveNotifications(userId, notifs);
    }

    if (SupabaseService.isAvailable()) {
      await SupabaseService.markNotificationRead(id);
    }
  },

  async clearNotifications(userId: string) {
    LocalDataManager.saveNotifications(userId, []);

    if (SupabaseService.isAvailable()) {
      await SupabaseService.clearNotifications(userId);
    }
  },

  async fetchAlgorithmSubmissions(userId: string): Promise<AlgorithmSubmission[]> {
    if (SupabaseService.isAvailable()) {
      const suSubs = await SupabaseService.getAlgorithmSubmissions(userId);
      if (suSubs && suSubs.length > 0) {
        return suSubs;
      }
    }
    return LocalDataManager.getAlgorithmSubmissions(userId);
  },

  async fetchAlgorithmLeaderboard(): Promise<AlgorithmLeaderboardEntry[] | null> {
    if (SupabaseService.isAvailable()) {
      return await SupabaseService.getAlgorithmLeaderboard();
    }
    return null;
  }
};
