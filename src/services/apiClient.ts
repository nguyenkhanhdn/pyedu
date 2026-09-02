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
    reminderEnabled: true
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

    if (users.length === 0) {
      users = [...INITIAL_FALLBACK_USERS];
    } else {
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
          password: users[teacherIdx].password || "123456"
        };
      }
    }

    this.saveUsers(users);
    return users;
  }

  public static saveUsers(users: User[]) {
    try {
      localStorage.setItem(this.STORAGE_KEY_USERS, JSON.stringify(users));
    } catch {}
  }

  public static getUserById(id: string): User | null {
    const users = this.getUsers();
    return users.find(u => u.id === id) || null;
  }

  public static updateUser(id: string, updates: Partial<User>): User | null {
    const users = this.getUsers();
    const idx = users.findIndex(u => u.id === id);
    if (idx === -1) return null;
    users[idx] = { ...users[idx], ...updates };
    this.saveUsers(users);
    return users[idx];
  }

  public static deleteUser(id: string): boolean {
    const users = this.getUsers();
    const filtered = users.filter(u => u.id !== id);
    if (filtered.length === users.length) return false;
    this.saveUsers(filtered);
    try {
      localStorage.removeItem(`${this.STORAGE_KEY_CODES}_${id}`);
      localStorage.removeItem(`${this.STORAGE_KEY_SUBS}_${id}`);
      localStorage.removeItem(`${this.STORAGE_KEY_NOTES}_${id}`);
      localStorage.removeItem(`${this.STORAGE_KEY_NOTIFS}_${id}`);
    } catch {}
    return true;
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

// API Service with seamless Supabase > Server API > Local Storage resilience
export const ApiService = {
  async fetchUsers(): Promise<User[]> {
    if (SupabaseService.isAvailable()) {
      const supabaseUsers = await SupabaseService.getAllUsers();
      if (supabaseUsers && supabaseUsers.length > 0) {
        LocalDataManager.saveUsers(supabaseUsers);
        return supabaseUsers;
      }
    }

    const data = await safeFetchJson<{ users: User[] }>("/api/auth/users");
    if (data?.users && Array.isArray(data.users) && data.users.length > 0) {
      LocalDataManager.saveUsers(data.users);
      return data.users;
    }
    return LocalDataManager.getUsers();
  },

  async fetchGroups(userId?: string): Promise<StudyGroup[]> {
    if (SupabaseService.isAvailable() && userId) {
      const supabaseGroups = await SupabaseService.getStudyGroups(userId);
      if (supabaseGroups && supabaseGroups.length > 0) {
        LocalDataManager.saveGroups(supabaseGroups);
        return supabaseGroups;
      }
    }

    const data = await safeFetchJson<{ groups: StudyGroup[] }>(`/api/groups${userId ? `?userId=${userId}` : ''}`);
    if (data?.groups && Array.isArray(data.groups) && data.groups.length > 0) {
      LocalDataManager.saveGroups(data.groups);
      return data.groups;
    }
    return LocalDataManager.getGroups(userId);
  },

  async login(usernameOrEmail: string, password?: string): Promise<User | null> {
    const rawQuery = (usernameOrEmail || "").trim();
    const query = rawQuery.toLowerCase();
    const pwd = (password || "").trim();

    // 1. Try Supabase cloud if connected
    if (SupabaseService.isAvailable()) {
      try {
        const suUser = await SupabaseService.getUserByCredentials(rawQuery, pwd || undefined);
        if (suUser) {
          LocalDataManager.updateUser(suUser.id, suUser);
          return suUser;
        }
      } catch (err) {
        console.warn("Supabase auth check notice:", err);
      }
    }

    // 2. Try Backend Server API (SQLite Express server)
    try {
      const data = await safeFetchJson<{ success: boolean; user: User }>("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usernameOrEmail: rawQuery, password: pwd })
      });

      if (data?.user) return data.user;
    } catch {}

    // 3. Fallback: search in local users / offline data
    const users = LocalDataManager.getUsers();
    const matched = users.find(u => 
      u.username?.toLowerCase() === query || 
      u.email?.toLowerCase() === query
    );
    
    if (matched) {
      if (query === "admin" || matched.role === "admin") {
        if (pwd && pwd !== "admin@password" && matched.password && matched.password !== pwd) {
          return null; // Incorrect password for admin
        }
      } else if (pwd && matched.password && matched.password !== pwd) {
        return null;
      }
      return matched;
    }

    // Emergency fallback for default accounts if not matched
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
    if (SupabaseService.isAvailable()) {
      const suUser = await SupabaseService.createUser(userData);
      if (suUser) {
        const users = LocalDataManager.getUsers();
        users.push(suUser);
        LocalDataManager.saveUsers(users);
        return suUser;
      }
    }

    const data = await safeFetchJson<{ success: boolean; user: User }>("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData)
    });

    if (data?.user) return data.user;

    // Fallback: register locally
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
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${userData.username}`,
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

  async adminDeleteUser(userId: string): Promise<boolean> {
    if (SupabaseService.isAvailable()) {
      await SupabaseService.deleteUser(userId);
    }
    await safeFetchJson(`/api/admin/users/${userId}`, { method: "DELETE" });
    return LocalDataManager.deleteUser(userId);
  },

  async adminResetUserProgress(userId: string): Promise<User | null> {
    if (SupabaseService.isAvailable()) {
      await SupabaseService.resetUserProgress(userId);
    }
    await safeFetchJson(`/api/admin/users/${userId}/reset`, { method: "POST" });
    return LocalDataManager.resetUserProgress(userId);
  },

  async adminUpdateUser(userId: string, updates: Partial<User> & { password?: string }): Promise<User | null> {
    if (SupabaseService.isAvailable()) {
      await SupabaseService.updateUserProfile(userId, updates);
    }
    await safeFetchJson(`/api/admin/users/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates)
    });
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
      const suData = await SupabaseService.loadUserData(userId);
      if (suData && suData.user) {
        return suData;
      }
    }

    const data = await safeFetchJson<{
      user?: User;
      codes?: Record<string, string>;
      submissions?: SubmissionResult[];
      notes?: PersonalNote[];
      groups?: StudyGroup[];
      notifications?: NotificationItem[];
    }>(`/api/user/${userId}/data`);

    if (data?.user) {
      return data;
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

    await safeFetchJson(`/api/user/${userId}/code`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lessonId, code })
    });
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
    }

    const data = await safeFetchJson<{ success: boolean; user: User }>(`/api/user/${userId}/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (data?.user) {
      LocalDataManager.updateUser(userId, data.user);
      return data.user;
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
      const suProblems = await SupabaseService.getAlgorithmProblems();
      if (suProblems && suProblems.length > 0) {
        return suProblems;
      }
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
    }

    const data = await safeFetchJson<{ success: boolean; user: User }>(`/api/user/${userId}/profile`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates)
    });
    return data?.user || LocalDataManager.getUserById(userId);
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

    await safeFetchJson(`/api/groups/${groupId}/join`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId })
    });
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

    await safeFetchJson(`/api/groups/${groupId}/leave`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId })
    });
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

    const data = await safeFetchJson<{ success: boolean; message: any }>(`/api/groups/${groupId}/message`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    return data?.message || msg;
  },

  async likeGroupMessage(groupId: string, messageId: string, userId: string) {
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

    await safeFetchJson(`/api/groups/${groupId}/message/${messageId}/like`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId })
    });
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

    const data = await safeFetchJson<{ success: boolean; note: PersonalNote }>("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    return data?.note || newNote;
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

    await safeFetchJson(`/api/notes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates)
    });
  },

  async deleteNote(userId: string, id: string) {
    const notes = LocalDataManager.getNotes(userId).filter(n => n.id !== id);
    LocalDataManager.saveNotes(userId, notes);

    if (SupabaseService.isAvailable()) {
      await SupabaseService.deleteNote(id);
    }

    await safeFetchJson(`/api/notes/${id}`, { method: "DELETE" });
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

    await safeFetchJson(`/api/notifications/${id}/read`, { method: "PUT" });
  },

  async clearNotifications(userId: string) {
    LocalDataManager.saveNotifications(userId, []);

    if (SupabaseService.isAvailable()) {
      await SupabaseService.clearNotifications(userId);
    }

    await safeFetchJson(`/api/notifications/${userId}`, { method: "DELETE" });
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
