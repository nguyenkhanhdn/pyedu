import { getSupabase } from "../lib/supabase";
import {
  User,
  PersonalNote,
  SubmissionResult,
  StudyGroup,
  GroupMessage,
  NotificationItem,
  AlgorithmProblem,
  AlgorithmSubmission,
  LeaderboardEntry,
  AlgorithmLeaderboardEntry,
} from "../types";

export class SupabaseService {
  /**
   * Check if Supabase client is available and active
   */
  public static isAvailable(): boolean {
    return Boolean(getSupabase());
  }

  // ===================== AUTH & PROFILES =====================

  public static async getAllUsers(): Promise<User[] | null> {
    const supabase = getSupabase();
    if (!supabase) return null;

    try {
      const { data: users, error } = await supabase
        .from("users")
        .select("*")
        .order("total_xp", { ascending: false });

      if (error || !users) return null;

      // Get badges & completed lessons for each user
      const { data: allBadges } = await supabase.from("user_badges").select("*");
      const { data: allProgress } = await supabase.from("user_progress").select("*");

      const badgeMap: Record<string, string[]> = {};
      if (allBadges) {
        allBadges.forEach((b: any) => {
          if (!badgeMap[b.user_id]) badgeMap[b.user_id] = [];
          badgeMap[b.user_id].push(b.badge_id);
        });
      }

      const progressMap: Record<string, string[]> = {};
      if (allProgress) {
        allProgress.forEach((p: any) => {
          if (p.completed) {
            if (!progressMap[p.user_id]) progressMap[p.user_id] = [];
            progressMap[p.user_id].push(p.lesson_id);
          }
        });
      }

      return users.map((u: any) => ({
        id: u.id,
        username: u.username,
        email: u.email,
        fullName: u.full_name,
        avatar: u.avatar,
        role: u.role as any,
        grade: u.grade,
        school: u.school,
        totalXp: u.total_xp,
        weeklyXp: u.weekly_xp,
        streakDays: u.streak_days,
        lastActiveDate: u.last_active_date,
        badges: badgeMap[u.id] || [],
        completedLessons: progressMap[u.id] || [],
        dailyGoal: u.daily_goal,
        reminderTime: u.reminder_time,
        reminderEnabled: u.reminder_enabled,
      }));
    } catch (e) {
      console.warn("Supabase getAllUsers error:", e);
      return null;
    }
  }

  public static async getUserById(userId: string): Promise<User | null> {
    const supabase = getSupabase();
    if (!supabase) return null;

    try {
      const { data: u, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single();

      if (error || !u) return null;

      const { data: badges } = await supabase
        .from("user_badges")
        .select("badge_id")
        .eq("user_id", userId);

      const { data: progress } = await supabase
        .from("user_progress")
        .select("lesson_id")
        .eq("user_id", userId)
        .eq("completed", true);

      return {
        id: u.id,
        username: u.username,
        email: u.email,
        fullName: u.full_name,
        avatar: u.avatar,
        role: u.role as any,
        grade: u.grade,
        school: u.school,
        totalXp: u.total_xp,
        weeklyXp: u.weekly_xp,
        streakDays: u.streak_days,
        lastActiveDate: u.last_active_date,
        badges: badges ? badges.map((b: any) => b.badge_id) : [],
        completedLessons: progress ? progress.map((p: any) => p.lesson_id) : [],
        dailyGoal: u.daily_goal,
        reminderTime: u.reminder_time,
        reminderEnabled: u.reminder_enabled,
      };
    } catch (e) {
      console.warn("Supabase getUserById error:", e);
      return null;
    }
  }

  public static async getUserByCredentials(usernameOrEmail: string): Promise<User | null> {
    const supabase = getSupabase();
    if (!supabase) return null;

    try {
      const { data: u, error } = await supabase
        .from("users")
        .select("*")
        .or(`username.eq.${usernameOrEmail},email.eq.${usernameOrEmail}`)
        .limit(1)
        .maybeSingle();

      if (error || !u) return null;
      return await this.getUserById(u.id);
    } catch (e) {
      console.warn("Supabase getUserByCredentials error:", e);
      return null;
    }
  }

  public static async createUser(userData: {
    username: string;
    email: string;
    fullName: string;
    grade: string;
    role: "student" | "teacher";
    school?: string;
    password?: string;
  }): Promise<User | null> {
    const supabase = getSupabase();
    if (!supabase) return null;

    try {
      const newId = `usr-${Date.now()}`;
      const avatar = `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(userData.username)}`;
      const today = new Date().toISOString().split("T")[0];

      const { error } = await supabase.from("users").insert({
        id: newId,
        username: userData.username,
        email: userData.email,
        password: userData.password || "123456",
        full_name: userData.fullName,
        avatar,
        role: userData.role || "student",
        grade: userData.grade || "Lớp 10 Tin",
        school: userData.school || "THPT Chuyên Tin Học",
        total_xp: 0,
        weekly_xp: 0,
        streak_days: 1,
        last_active_date: today,
        daily_goal: 20,
        reminder_time: "19:30",
        reminder_enabled: true,
      });

      if (error) {
        console.error("Supabase createUser error:", error);
        return null;
      }

      // Add default starter badge
      await supabase.from("user_badges").insert({
        user_id: newId,
        badge_id: "first_step",
        unlocked_at: new Date().toISOString(),
      });

      return await this.getUserById(newId);
    } catch (e) {
      console.error("Supabase createUser exception:", e);
      return null;
    }
  }

  public static async updateUserProfile(userId: string, updates: Partial<User>): Promise<User | null> {
    const supabase = getSupabase();
    if (!supabase) return null;

    try {
      const dbUpdates: any = {};
      if (updates.fullName !== undefined) dbUpdates.full_name = updates.fullName;
      if (updates.grade !== undefined) dbUpdates.grade = updates.grade;
      if (updates.school !== undefined) dbUpdates.school = updates.school;
      if (updates.avatar !== undefined) dbUpdates.avatar = updates.avatar;
      if (updates.totalXp !== undefined) dbUpdates.total_xp = updates.totalXp;
      if (updates.weeklyXp !== undefined) dbUpdates.weekly_xp = updates.weeklyXp;
      if (updates.streakDays !== undefined) dbUpdates.streak_days = updates.streakDays;
      if (updates.lastActiveDate !== undefined) dbUpdates.last_active_date = updates.lastActiveDate;
      if (updates.dailyGoal !== undefined) dbUpdates.daily_goal = updates.dailyGoal;
      if (updates.reminderTime !== undefined) dbUpdates.reminder_time = updates.reminderTime;
      if (updates.reminderEnabled !== undefined) dbUpdates.reminder_enabled = updates.reminderEnabled;

      if (Object.keys(dbUpdates).length > 0) {
        await supabase.from("users").update(dbUpdates).eq("id", userId);
      }

      if (updates.completedLessons) {
        for (const lessonId of updates.completedLessons) {
          await supabase.from("user_progress").upsert({
            user_id: userId,
            lesson_id: lessonId,
            completed: true,
            score: 100,
            completed_at: new Date().toISOString(),
          }, { onConflict: "user_id,lesson_id" });
        }
      }

      if (updates.badges) {
        for (const badgeId of updates.badges) {
          await supabase.from("user_badges").upsert({
            user_id: userId,
            badge_id: badgeId,
            unlocked_at: new Date().toISOString(),
          }, { onConflict: "user_id,badge_id" });
        }
      }

      return await this.getUserById(userId);
    } catch (e) {
      console.warn("Supabase updateUserProfile error:", e);
      return null;
    }
  }

  // ===================== FULL USER DATA PACK =====================

  public static async loadUserData(userId: string): Promise<{
    user: User | null;
    codes: Record<string, string>;
    submissions: SubmissionResult[];
    notes: PersonalNote[];
    groups: StudyGroup[];
    notifications: NotificationItem[];
  } | null> {
    const supabase = getSupabase();
    if (!supabase) return null;

    try {
      const user = await this.getUserById(userId);
      if (!user) return null;

      // Codes
      const { data: codeRows } = await supabase
        .from("user_codes")
        .select("lesson_id, code")
        .eq("user_id", userId);
      const codes: Record<string, string> = {};
      if (codeRows) {
        codeRows.forEach((r: any) => {
          codes[r.lesson_id] = r.code;
        });
      }

      // Submissions
      const { data: subRows } = await supabase
        .from("submissions")
        .select("*")
        .eq("user_id", userId)
        .order("timestamp", { ascending: false });

      const submissions: SubmissionResult[] = subRows
        ? subRows.map((s: any) => ({
            lessonId: s.lesson_id,
            passed: s.passed,
            score: s.score,
            totalTests: s.total_tests,
            passedTests: s.passed_tests,
            runtimeMs: s.runtime_ms,
            testResults: s.test_results || [],
            timestamp: s.timestamp,
          }))
        : [];

      // Notes
      const { data: noteRows } = await supabase
        .from("personal_notes")
        .select("*")
        .eq("user_id", userId)
        .order("updated_at", { ascending: false });

      const notes: PersonalNote[] = noteRows
        ? noteRows.map((n: any) => ({
            id: n.id,
            lessonId: n.lesson_id,
            lessonTitle: n.lesson_title,
            title: n.title,
            content: n.content,
            codeSnippet: n.code_snippet,
            tags: n.tags || [],
            createdAt: n.created_at,
            updatedAt: n.updated_at,
          }))
        : [];

      // Groups
      const groups = await this.getStudyGroups(userId);

      // Notifications
      const { data: notifRows } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", userId)
        .order("timestamp", { ascending: false });

      const notifications: NotificationItem[] = notifRows
        ? notifRows.map((n: any) => ({
            id: n.id,
            title: n.title,
            message: n.message,
            type: n.type,
            timestamp: n.timestamp,
            read: n.read,
            linkTab: n.link_tab,
          }))
        : [];

      return {
        user,
        codes,
        submissions,
        notes,
        groups: groups || [],
        notifications,
      };
    } catch (e) {
      console.warn("Supabase loadUserData error:", e);
      return null;
    }
  }

  // ===================== USER CODES & LESSON SUBMISSIONS =====================

  public static async saveUserCode(userId: string, lessonId: string, code: string): Promise<boolean> {
    const supabase = getSupabase();
    if (!supabase) return false;

    try {
      const { error } = await supabase.from("user_codes").upsert({
        user_id: userId,
        lesson_id: lessonId,
        code,
        updated_at: new Date().toISOString(),
      }, { onConflict: "user_id,lesson_id" });

      return !error;
    } catch (e) {
      console.warn("Supabase saveUserCode error:", e);
      return false;
    }
  }

  public static async recordSubmission(
    userId: string,
    submission: SubmissionResult
  ): Promise<boolean> {
    const supabase = getSupabase();
    if (!supabase) return false;

    try {
      const subId = `sub-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
      await supabase.from("submissions").insert({
        id: subId,
        user_id: userId,
        lesson_id: submission.lessonId,
        passed: submission.passed,
        score: submission.score,
        total_tests: submission.totalTests,
        passed_tests: submission.passedTests,
        runtime_ms: submission.runtimeMs,
        test_results: submission.testResults,
        timestamp: submission.timestamp || new Date().toISOString(),
      });

      if (submission.passed) {
        await supabase.from("user_progress").upsert({
          user_id: userId,
          lesson_id: submission.lessonId,
          completed: true,
          score: submission.score,
          completed_at: new Date().toISOString(),
        }, { onConflict: "user_id,lesson_id" });
      }

      return true;
    } catch (e) {
      console.warn("Supabase recordSubmission error:", e);
      return false;
    }
  }

  // ===================== ALGORITHM PROBLEMS & SUBMISSIONS =====================

  public static async getAlgorithmProblems(): Promise<AlgorithmProblem[] | null> {
    const supabase = getSupabase();
    if (!supabase) return null;

    try {
      const { data, error } = await supabase
        .from("algorithm_problems")
        .select("*")
        .order("points", { ascending: true });

      if (error || !data || data.length === 0) return null;

      return data.map((p: any) => ({
        id: p.id,
        title: p.title,
        level: p.level,
        gradeGroup: p.grade_group,
        topic: p.topic,
        difficulty: p.difficulty,
        tags: p.tags || [],
        points: p.points,
        timeLimit: p.time_limit,
        memoryLimit: p.memory_limit,
        source: p.source,
        problemStatement: p.problem_statement,
        inputFormat: p.input_format,
        outputFormat: p.output_format,
        constraints: p.constraints,
        sampleCases: p.sample_cases || [],
        starterCode: p.starter_code,
        hints: p.hints || [],
        solutionExplanation: p.solution_explanation,
        testCases: p.test_cases || [],
      }));
    } catch (e) {
      console.warn("Supabase getAlgorithmProblems error:", e);
      return null;
    }
  }

  public static async saveAlgorithmSubmission(
    userId: string,
    submission: AlgorithmSubmission
  ): Promise<boolean> {
    const supabase = getSupabase();
    if (!supabase) return false;

    try {
      const { error } = await supabase.from("algorithm_submissions").upsert({
        id: submission.id || `algo-sub-${Date.now()}`,
        user_id: userId,
        problem_id: submission.problemId,
        problem_title: submission.problemTitle,
        level: submission.level,
        code: submission.code,
        score: submission.score,
        passed: submission.passed,
        passed_tests: submission.passedTests,
        total_tests: submission.totalTests,
        runtime_ms: submission.runtimeMs,
        test_results: submission.testResults,
        timestamp: submission.timestamp || new Date().toISOString(),
      }, { onConflict: "id" });

      return !error;
    } catch (e) {
      console.warn("Supabase saveAlgorithmSubmission error:", e);
      return false;
    }
  }

  public static async getAlgorithmSubmissions(userId: string): Promise<AlgorithmSubmission[] | null> {
    const supabase = getSupabase();
    if (!supabase) return null;

    try {
      const { data, error } = await supabase
        .from("algorithm_submissions")
        .select("*")
        .eq("user_id", userId)
        .order("timestamp", { ascending: false });

      if (error || !data) return null;

      return data.map((s: any) => ({
        id: s.id,
        problemId: s.problem_id,
        problemTitle: s.problem_title,
        level: s.level,
        code: s.code,
        score: s.score,
        passed: s.passed,
        passedTests: s.passed_tests,
        totalTests: s.total_tests,
        runtimeMs: s.runtime_ms,
        testResults: s.test_results || [],
        timestamp: s.timestamp,
      }));
    } catch (e) {
      console.warn("Supabase getAlgorithmSubmissions error:", e);
      return null;
    }
  }

  // ===================== PERSONAL NOTES =====================

  public static async addNote(userId: string, note: Omit<PersonalNote, "id" | "createdAt" | "updatedAt">): Promise<PersonalNote | null> {
    const supabase = getSupabase();
    if (!supabase) return null;

    try {
      const newId = `note-${Date.now()}`;
      const now = new Date().toISOString();

      const { error } = await supabase.from("personal_notes").insert({
        id: newId,
        user_id: userId,
        lesson_id: note.lessonId || null,
        lesson_title: note.lessonTitle || null,
        title: note.title,
        content: note.content,
        code_snippet: note.codeSnippet || null,
        tags: note.tags || [],
        created_at: now,
        updated_at: now,
      });

      if (error) return null;

      return {
        id: newId,
        lessonId: note.lessonId,
        lessonTitle: note.lessonTitle,
        title: note.title,
        content: note.content,
        codeSnippet: note.codeSnippet,
        tags: note.tags || [],
        createdAt: now,
        updatedAt: now,
      };
    } catch (e) {
      console.warn("Supabase addNote error:", e);
      return null;
    }
  }

  public static async updateNote(noteId: string, updates: Partial<PersonalNote>): Promise<boolean> {
    const supabase = getSupabase();
    if (!supabase) return false;

    try {
      const dbUpdates: any = {
        updated_at: new Date().toISOString(),
      };
      if (updates.title !== undefined) dbUpdates.title = updates.title;
      if (updates.content !== undefined) dbUpdates.content = updates.content;
      if (updates.codeSnippet !== undefined) dbUpdates.code_snippet = updates.codeSnippet;
      if (updates.tags !== undefined) dbUpdates.tags = updates.tags;

      const { error } = await supabase
        .from("personal_notes")
        .update(dbUpdates)
        .eq("id", noteId);

      return !error;
    } catch (e) {
      console.warn("Supabase updateNote error:", e);
      return false;
    }
  }

  public static async deleteNote(noteId: string): Promise<boolean> {
    const supabase = getSupabase();
    if (!supabase) return false;

    try {
      const { error } = await supabase.from("personal_notes").delete().eq("id", noteId);
      return !error;
    } catch (e) {
      console.warn("Supabase deleteNote error:", e);
      return false;
    }
  }

  // ===================== STUDY GROUPS & MESSAGES =====================

  public static async getStudyGroups(userId: string): Promise<StudyGroup[] | null> {
    const supabase = getSupabase();
    if (!supabase) return null;

    try {
      const { data: groups, error } = await supabase.from("study_groups").select("*");
      if (error || !groups) return null;

      const { data: userMemberships } = await supabase
        .from("study_group_members")
        .select("group_id")
        .eq("user_id", userId);

      const joinedSet = new Set(userMemberships ? userMemberships.map((m: any) => m.group_id) : []);

      const { data: messages } = await supabase
        .from("group_messages")
        .select("*")
        .order("timestamp", { ascending: true });

      const messageMap: Record<string, GroupMessage[]> = {};
      if (messages) {
        messages.forEach((m: any) => {
          if (!messageMap[m.group_id]) messageMap[m.group_id] = [];
          messageMap[m.group_id].push({
            id: m.id,
            userId: m.user_id,
            userName: m.user_name,
            userAvatar: m.user_avatar,
            userRole: m.user_role,
            timestamp: m.timestamp,
            content: m.content,
            codeSnippet: m.code_snippet,
            likes: m.likes,
          });
        });
      }

      return groups.map((g: any) => ({
        id: g.id,
        name: g.name,
        description: g.description,
        category: g.category,
        memberCount: g.member_count,
        isJoined: joinedSet.has(g.id),
        teacherName: g.teacher_name,
        avatar: g.avatar,
        pinnedPost: g.pinned_title
          ? {
              title: g.pinned_title,
              content: g.pinned_content || "",
              author: g.pinned_author || "Giáo viên",
              date: g.pinned_date || "Hôm nay",
            }
          : undefined,
        messages: messageMap[g.id] || [],
      }));
    } catch (e) {
      console.warn("Supabase getStudyGroups error:", e);
      return null;
    }
  }

  public static async joinGroup(groupId: string, userId: string): Promise<boolean> {
    const supabase = getSupabase();
    if (!supabase) return false;

    try {
      await supabase.from("study_group_members").upsert({
        group_id: groupId,
        user_id: userId,
        joined_at: new Date().toISOString(),
      }, { onConflict: "group_id,user_id" });

      // Increment member count
      const { data: grp } = await supabase.from("study_groups").select("member_count").eq("id", groupId).single();
      if (grp) {
        await supabase.from("study_groups").update({ member_count: (grp.member_count || 1) + 1 }).eq("id", groupId);
      }
      return true;
    } catch (e) {
      console.warn("Supabase joinGroup error:", e);
      return false;
    }
  }

  public static async leaveGroup(groupId: string, userId: string): Promise<boolean> {
    const supabase = getSupabase();
    if (!supabase) return false;

    try {
      await supabase.from("study_group_members").delete().eq("group_id", groupId).eq("user_id", userId);
      const { data: grp } = await supabase.from("study_groups").select("member_count").eq("id", groupId).single();
      if (grp && grp.member_count > 1) {
        await supabase.from("study_groups").update({ member_count: grp.member_count - 1 }).eq("id", groupId);
      }
      return true;
    } catch (e) {
      console.warn("Supabase leaveGroup error:", e);
      return false;
    }
  }

  public static async addGroupMessage(
    groupId: string,
    message: {
      userId: string;
      userName: string;
      userAvatar: string;
      userRole: any;
      content: string;
      codeSnippet?: string;
    }
  ): Promise<GroupMessage | null> {
    const supabase = getSupabase();
    if (!supabase) return null;

    try {
      const msgId = `msg-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
      const now = new Date().toISOString();

      const { error } = await supabase.from("group_messages").insert({
        id: msgId,
        group_id: groupId,
        user_id: message.userId,
        user_name: message.userName,
        user_avatar: message.userAvatar,
        user_role: message.userRole,
        content: message.content,
        code_snippet: message.codeSnippet || null,
        likes: 0,
        timestamp: now,
      });

      if (error) return null;

      return {
        id: msgId,
        userId: message.userId,
        userName: message.userName,
        userAvatar: message.userAvatar,
        userRole: message.userRole,
        timestamp: now,
        content: message.content,
        codeSnippet: message.codeSnippet,
        likes: 0,
        isLiked: false,
      };
    } catch (e) {
      console.warn("Supabase addGroupMessage error:", e);
      return null;
    }
  }

  public static async likeGroupMessage(messageId: string): Promise<boolean> {
    const supabase = getSupabase();
    if (!supabase) return false;

    try {
      const { data: msg } = await supabase.from("group_messages").select("likes").eq("id", messageId).single();
      if (msg) {
        await supabase.from("group_messages").update({ likes: (msg.likes || 0) + 1 }).eq("id", messageId);
      }
      return true;
    } catch (e) {
      console.warn("Supabase likeGroupMessage error:", e);
      return false;
    }
  }
}
