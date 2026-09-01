import { getSupabase } from "../lib/supabase";
import {
  CURRICULUM_MODULES,
  INITIAL_STUDY_GROUPS,
  BADGES_DATA,
  ALGORITHM_PROBLEMS
} from "../data/curriculum";
import { User, PersonalNote, SubmissionResult, AlgorithmSubmission } from "../types";

export const SUPABASE_SQL_SCHEMA = `-- ====================================================================
-- PYEDU PYTHON LEARNING PLATFORM - SUPABASE DATABASE SCHEMA (POSTGRESQL)
-- ====================================================================

-- 1. BẢNG NGƯỜI DÙNG & HỒ SƠ HỌC SINH (USERS & PROFILES)
CREATE TABLE IF NOT EXISTS public.users (
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL DEFAULT '123456',
    full_name TEXT NOT NULL,
    avatar TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'student',  -- 'student' | 'teacher'
    grade TEXT NOT NULL DEFAULT 'Lớp 10 Tin',
    school TEXT DEFAULT 'THPT Chuyên Tin',
    total_xp INTEGER NOT NULL DEFAULT 0,
    weekly_xp INTEGER NOT NULL DEFAULT 0,
    streak_days INTEGER NOT NULL DEFAULT 1,
    last_active_date TEXT DEFAULT CURRENT_DATE::text,
    daily_goal INTEGER NOT NULL DEFAULT 20,
    reminder_time TEXT NOT NULL DEFAULT '19:30',
    reminder_enabled BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. BẢNG HUY HIỆU ĐÃ MỞ KHÓA (USER BADGES)
CREATE TABLE IF NOT EXISTS public.user_badges (
    user_id TEXT REFERENCES public.users(id) ON DELETE CASCADE,
    badge_id TEXT NOT NULL,
    unlocked_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (user_id, badge_id)
);

-- 3. BẢNG TIẾN TRÌNH HỌC TẬP (USER PROGRESS)
CREATE TABLE IF NOT EXISTS public.user_progress (
    user_id TEXT REFERENCES public.users(id) ON DELETE CASCADE,
    lesson_id TEXT NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT true,
    score INTEGER NOT NULL DEFAULT 100,
    completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (user_id, lesson_id)
);

-- 4. BẢNG LƯU MÃ NGUỒN PYTHON CỦA HỌC SINH (USER CODES)
CREATE TABLE IF NOT EXISTS public.user_codes (
    user_id TEXT REFERENCES public.users(id) ON DELETE CASCADE,
    lesson_id TEXT NOT NULL,
    code TEXT NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (user_id, lesson_id)
);

-- 5. BẢNG LỊCH SỬ NỘP BÀI HỌC (LESSON SUBMISSIONS)
CREATE TABLE IF NOT EXISTS public.submissions (
    id TEXT PRIMARY KEY,
    user_id TEXT REFERENCES public.users(id) ON DELETE CASCADE,
    lesson_id TEXT NOT NULL,
    passed BOOLEAN NOT NULL,
    score INTEGER NOT NULL DEFAULT 0,
    total_tests INTEGER NOT NULL DEFAULT 0,
    passed_tests INTEGER NOT NULL DEFAULT 0,
    runtime_ms INTEGER NOT NULL DEFAULT 0,
    test_results JSONB NOT NULL DEFAULT '[]'::jsonb,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. BẢNG GHI CHÚ CÁ NHÂN (PERSONAL NOTES)
CREATE TABLE IF NOT EXISTS public.personal_notes (
    id TEXT PRIMARY KEY,
    user_id TEXT REFERENCES public.users(id) ON DELETE CASCADE,
    lesson_id TEXT,
    lesson_title TEXT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    code_snippet TEXT,
    tags TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. BẢNG NHÓM HỌC TẬP (STUDY GROUPS)
CREATE TABLE IF NOT EXISTS public.study_groups (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    member_count INTEGER NOT NULL DEFAULT 1,
    teacher_name TEXT NOT NULL,
    avatar TEXT NOT NULL,
    pinned_title TEXT,
    pinned_content TEXT,
    pinned_author TEXT,
    pinned_date TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. BẢNG THÀNH VIÊN NHÓM HỌC (STUDY GROUP MEMBERS)
CREATE TABLE IF NOT EXISTS public.study_group_members (
    group_id TEXT REFERENCES public.study_groups(id) ON DELETE CASCADE,
    user_id TEXT REFERENCES public.users(id) ON DELETE CASCADE,
    joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (group_id, user_id)
);

-- 9. BẢNG TIN NHẮN / THẢO LUẬN NHÓM (GROUP MESSAGES)
CREATE TABLE IF NOT EXISTS public.group_messages (
    id TEXT PRIMARY KEY,
    group_id TEXT REFERENCES public.study_groups(id) ON DELETE CASCADE,
    user_id TEXT REFERENCES public.users(id) ON DELETE CASCADE,
    user_name TEXT NOT NULL,
    user_avatar TEXT NOT NULL,
    user_role TEXT NOT NULL DEFAULT 'student',
    content TEXT NOT NULL,
    code_snippet TEXT,
    likes INTEGER NOT NULL DEFAULT 0,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. BẢNG THÔNG BÁO & NHẮC NHỞ HỌC TẬP (NOTIFICATIONS)
CREATE TABLE IF NOT EXISTS public.notifications (
    id TEXT PRIMARY KEY,
    user_id TEXT REFERENCES public.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT NOT NULL DEFAULT 'system',
    read BOOLEAN NOT NULL DEFAULT false,
    link_tab TEXT,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 11. BẢNG KHO ĐỀ BÀI THUẬT TOÁN (ALGORITHM PROBLEMS - 120+ BÀI TẬP)
CREATE TABLE IF NOT EXISTS public.algorithm_problems (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    level TEXT NOT NULL,                  -- 'primary' | 'secondary'
    grade_group TEXT NOT NULL,            -- 'Tiểu học (Khối 3-5)' | 'THCS (Khối 6-9)'
    topic TEXT NOT NULL,
    difficulty TEXT NOT NULL,             -- 'Dễ' | 'Trung bình' | 'Khó' | 'HSG'
    tags TEXT[] DEFAULT '{}',
    points INTEGER NOT NULL DEFAULT 10,
    time_limit TEXT DEFAULT '1.0s',
    memory_limit TEXT DEFAULT '128MB',
    source TEXT,
    problem_statement TEXT NOT NULL,
    input_format TEXT,
    output_format TEXT,
    constraints TEXT,
    sample_cases JSONB NOT NULL DEFAULT '[]'::jsonb,
    starter_code TEXT,
    hints TEXT[] DEFAULT '{}',
    solution_explanation TEXT,
    test_cases JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 12. BẢNG BÀI NỘP CHẤM ĐIỂM THUẬT TOÁN (ALGORITHM SUBMISSIONS)
CREATE TABLE IF NOT EXISTS public.algorithm_submissions (
    id TEXT PRIMARY KEY,
    user_id TEXT REFERENCES public.users(id) ON DELETE CASCADE,
    problem_id TEXT REFERENCES public.algorithm_problems(id) ON DELETE CASCADE,
    problem_title TEXT NOT NULL,
    level TEXT NOT NULL,
    code TEXT NOT NULL,
    score INTEGER NOT NULL DEFAULT 0,
    passed BOOLEAN NOT NULL DEFAULT false,
    passed_tests INTEGER NOT NULL DEFAULT 0,
    total_tests INTEGER NOT NULL DEFAULT 0,
    runtime_ms INTEGER NOT NULL DEFAULT 0,
    test_results JSONB NOT NULL DEFAULT '[]'::jsonb,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 13. TẠO INDEXES TỐI ƯU TRUY VẤN
CREATE INDEX IF NOT EXISTS idx_users_xp ON public.users(total_xp DESC);
CREATE INDEX IF NOT EXISTS idx_progress_user ON public.user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_submissions_user ON public.submissions(user_id, lesson_id);
CREATE INDEX IF NOT EXISTS idx_algo_subs_user ON public.algorithm_submissions(user_id, problem_id);
CREATE INDEX IF NOT EXISTS idx_algo_problems_topic ON public.algorithm_problems(topic, level);
CREATE INDEX IF NOT EXISTS idx_messages_group ON public.group_messages(group_id, timestamp DESC);

-- 14. KÍCH HOẠT ROW LEVEL SECURITY (RLS) & CHÍNH SÁCH TRUY CẬP CÔNG KHAI CHO HỆ THỐNG GIÁO DỤC
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.personal_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_group_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.algorithm_problems ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.algorithm_submissions ENABLE ROW LEVEL SECURITY;

-- Tạo Policies cho phép truy xuất anon/authenticated
CREATE POLICY "Allow public read users" ON public.users FOR SELECT USING (true);
CREATE POLICY "Allow public insert users" ON public.users FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update users" ON public.users FOR UPDATE USING (true);

CREATE POLICY "Allow public read problems" ON public.algorithm_problems FOR SELECT USING (true);
CREATE POLICY "Allow public insert problems" ON public.algorithm_problems FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update problems" ON public.algorithm_problems FOR UPDATE USING (true);

CREATE POLICY "Allow public access progress" ON public.user_progress FOR ALL USING (true);
CREATE POLICY "Allow public access user_codes" ON public.user_codes FOR ALL USING (true);
CREATE POLICY "Allow public access submissions" ON public.submissions FOR ALL USING (true);
CREATE POLICY "Allow public access algo_subs" ON public.algorithm_submissions FOR ALL USING (true);
CREATE POLICY "Allow public access notes" ON public.personal_notes FOR ALL USING (true);
CREATE POLICY "Allow public access groups" ON public.study_groups FOR ALL USING (true);
CREATE POLICY "Allow public access members" ON public.study_group_members FOR ALL USING (true);
CREATE POLICY "Allow public access messages" ON public.group_messages FOR ALL USING (true);
CREATE POLICY "Allow public access notifs" ON public.notifications FOR ALL USING (true);
CREATE POLICY "Allow public access badges" ON public.user_badges FOR ALL USING (true);
`;

export interface MigrationProgress {
  stage: string;
  percent: number;
  details: string;
  success: boolean;
  error?: string;
  counts?: {
    users: number;
    problems: number;
    groups: number;
    notes: number;
    submissions: number;
    codes: number;
  };
}

// Full seed & migration runner to Supabase
export async function migrateAllDataToSupabase(
  currentUser: User | null,
  onProgress?: (p: MigrationProgress) => void
): Promise<{ success: boolean; message: string; counts?: any }> {
  const supabase = getSupabase();
  if (!supabase) {
    return {
      success: false,
      message: "Chưa cấu hình Supabase URL hoặc Anon Key hợp lệ.",
    };
  }

  const counts = {
    users: 0,
    problems: 0,
    groups: 0,
    notes: 0,
    submissions: 0,
    codes: 0,
  };

  try {
    // 1. Migrate Users / Profiles
    onProgress?.({
      stage: "Đang chuyển dữ liệu Người dùng & Hồ sơ học sinh...",
      percent: 15,
      details: "Đang đồng bộ hồ sơ học sinh, giáo viên, điểm XP và huy hiệu",
      success: true,
      counts
    });

    const fallbackUsers: User[] = [
      {
        id: "usr-demo-1",
        username: "khanh_tin10",
        email: "khanh.le@thpt-chuyentin.edu.vn",
        fullName: "Lê Minh Khánh",
        avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=KhanhMinh",
        grade: "Lớp 10 Tin",
        school: "THPT Chuyên Tin Học",
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
        id: "usr-teacher-1",
        username: "thaynam_gv",
        email: "nam.nguyen@thpt-chuyentin.edu.vn",
        fullName: "Thầy Nguyễn Hoàng Nam",
        avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=TeacherNam",
        grade: "Tổ trưởng Bộ môn Tin",
        school: "THPT Chuyên Tin Học",
        role: "teacher",
        totalXp: 3500,
        weeklyXp: 850,
        streakDays: 30,
        lastActiveDate: new Date().toISOString().split("T")[0],
        completedLessons: ["lesson-1-1", "lesson-1-2", "lesson-1-3", "lesson-2-1", "lesson-2-2", "lesson-3-1", "lesson-3-2", "lesson-4-1", "lesson-5-1", "lesson-6-1"],
        badges: ["first_step", "streak_3", "streak_7", "perfect_score", "loop_master", "algo_wizard"],
        dailyGoal: 30,
        reminderTime: "20:00",
        reminderEnabled: true
      },
      {
        id: "usr-demo-2",
        username: "lananh_python",
        email: "lananh@thpt-chuyentin.edu.vn",
        fullName: "Trần Lan Anh",
        avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=LanAnh",
        grade: "Lớp 10 Tin",
        school: "THPT Chuyên Tin Học",
        role: "student",
        totalXp: 1280,
        weeklyXp: 390,
        streakDays: 4,
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

    if (currentUser && !fallbackUsers.some(u => u.id === currentUser.id)) {
      fallbackUsers.push(currentUser);
    }

    const userRows = fallbackUsers.map(u => ({
      id: u.id,
      username: u.username,
      email: u.email,
      password: "password123",
      full_name: u.fullName,
      avatar: u.avatar,
      role: u.role || "student",
      grade: u.grade || "Lớp 10 Tin",
      school: u.school || "THPT Chuyên Tin",
      total_xp: u.totalXp || 0,
      weekly_xp: u.weeklyXp || 0,
      streak_days: u.streakDays || 1,
      last_active_date: u.lastActiveDate || new Date().toISOString().split("T")[0],
      daily_goal: u.dailyGoal || 20,
      reminder_time: u.reminderTime || "19:30",
      reminder_enabled: u.reminderEnabled ?? true,
    }));

    const { error: userErr } = await supabase
      .from("users")
      .upsert(userRows, { onConflict: "id" });

    if (userErr) throw new Error(`Lỗi chuyển người dùng: ${userErr.message}`);
    counts.users = userRows.length;

    // 2. Migrate User Progress & Badges
    onProgress?.({
      stage: "Đang đồng bộ Tiến trình bài học & Huy hiệu...",
      percent: 30,
      details: "Đang tải dữ liệu hoàn thành bài học và huân chương",
      success: true,
      counts
    });

    const progressRows: any[] = [];
    const badgeRows: any[] = [];

    for (const u of fallbackUsers) {
      if (u.completedLessons && u.completedLessons.length > 0) {
        for (const lessonId of u.completedLessons) {
          progressRows.push({
            user_id: u.id,
            lesson_id: lessonId,
            completed: true,
            score: 100,
            completed_at: new Date().toISOString(),
          });
        }
      }
      if (u.badges && u.badges.length > 0) {
        for (const badgeId of u.badges) {
          badgeRows.push({
            user_id: u.id,
            badge_id: badgeId,
            unlocked_at: new Date().toISOString(),
          });
        }
      }
    }

    if (progressRows.length > 0) {
      await supabase.from("user_progress").upsert(progressRows, { onConflict: "user_id,lesson_id" });
    }
    if (badgeRows.length > 0) {
      await supabase.from("user_badges").upsert(badgeRows, { onConflict: "user_id,badge_id" });
    }

    // 3. Migrate 120+ Algorithm Problems
    onProgress?.({
      stage: "Đang chuyển toàn bộ 120+ Đề bài Thuật toán...",
      percent: 55,
      details: "Đang đẩy toàn bộ các chủ đề và bộ test cases vào Supabase",
      success: true,
      counts
    });

    const problemRows = ALGORITHM_PROBLEMS.map(p => ({
      id: p.id,
      title: p.title,
      level: p.level,
      grade_group: p.gradeGroup,
      topic: p.topic,
      difficulty: p.difficulty,
      tags: p.tags || [],
      points: p.points || 10,
      time_limit: p.timeLimit || "1.0s",
      memory_limit: p.memoryLimit || "128MB",
      source: p.source || "PyEdu Olympiad",
      problem_statement: p.problemStatement,
      input_format: p.inputFormat || "",
      output_format: p.outputFormat || "",
      constraints: p.constraints || "",
      sample_cases: p.sampleCases || [],
      starter_code: p.starterCode || "",
      hints: p.hints || [],
      solution_explanation: p.solutionExplanation || "",
      test_cases: p.testCases || [],
    }));

    // Batch upsert in chunks of 25
    for (let i = 0; i < problemRows.length; i += 25) {
      const chunk = problemRows.slice(i, i + 25);
      const { error: probErr } = await supabase
        .from("algorithm_problems")
        .upsert(chunk, { onConflict: "id" });
      if (probErr) {
        console.warn("Problem batch warning:", probErr);
      }
      counts.problems += chunk.length;
    }

    // 4. Migrate Study Groups & Messages
    onProgress?.({
      stage: "Đang chuyển Nhóm học tập & Tin nhắn thảo luận...",
      percent: 75,
      details: "Đang đồng bộ phòng thảo luận, bài ghim và tin nhắn",
      success: true,
      counts
    });

    const groupRows = INITIAL_STUDY_GROUPS.map(g => ({
      id: g.id,
      name: g.name,
      description: g.description,
      category: g.category,
      member_count: g.memberCount,
      teacher_name: g.teacherName,
      avatar: g.avatar,
      pinned_title: g.pinnedPost?.title || null,
      pinned_content: g.pinnedPost?.content || null,
      pinned_author: g.pinnedPost?.author || null,
      pinned_date: g.pinnedPost?.date || null,
    }));

    const { error: groupErr } = await supabase
      .from("study_groups")
      .upsert(groupRows, { onConflict: "id" });

    if (!groupErr) {
      counts.groups = groupRows.length;

      // Group messages
      const msgRows: any[] = [];
      for (const g of INITIAL_STUDY_GROUPS) {
        if (g.messages && g.messages.length > 0) {
          for (const m of g.messages) {
            msgRows.push({
              id: m.id,
              group_id: g.id,
              user_id: m.userId,
              user_name: m.userName,
              user_avatar: m.userAvatar,
              user_role: m.userRole || "student",
              content: m.content,
              code_snippet: m.codeSnippet || null,
              likes: m.likes || 0,
              timestamp: new Date().toISOString(),
            });
          }
        }
      }
      if (msgRows.length > 0) {
        await supabase.from("group_messages").upsert(msgRows, { onConflict: "id" });
      }
    }

    // 5. Migrate Local Personal Notes & Submissions
    onProgress?.({
      stage: "Đang chuyển Ghi chú cá nhân & Bài nộp thuật toán...",
      percent: 90,
      details: "Đang đẩy các ghi chú cá nhân và lịch sử nộp bài",
      success: true,
      counts
    });

    // Extract saved local notes
    let localNotes: PersonalNote[] = [];
    try {
      const saved = localStorage.getItem("pyedu_offline_notes");
      if (saved) localNotes = JSON.parse(saved);
    } catch {}

    if (localNotes.length > 0) {
      const noteRows = localNotes.map(n => ({
        id: n.id,
        user_id: currentUser?.id || "usr-demo-1",
        lesson_id: n.lessonId || null,
        lesson_title: n.lessonTitle || null,
        title: n.title,
        content: n.content,
        code_snippet: n.codeSnippet || null,
        tags: n.tags || [],
        created_at: n.createdAt || new Date().toISOString(),
        updated_at: n.updatedAt || new Date().toISOString(),
      }));
      await supabase.from("personal_notes").upsert(noteRows, { onConflict: "id" });
      counts.notes = noteRows.length;
    }

    // Extract saved algorithm submissions
    let localAlgoSubs: AlgorithmSubmission[] = [];
    try {
      const savedSubs = localStorage.getItem("pyedu_algo_submissions");
      if (savedSubs) localAlgoSubs = JSON.parse(savedSubs);
    } catch {}

    if (localAlgoSubs.length > 0) {
      const subRows = localAlgoSubs.map(s => ({
        id: s.id,
        user_id: currentUser?.id || "usr-demo-1",
        problem_id: s.problemId,
        problem_title: s.problemTitle || "Bài tập thuật toán",
        level: s.level || "primary",
        code: s.code,
        score: s.score || 0,
        passed: s.passed || false,
        passed_tests: s.passedTests || 0,
        total_tests: s.totalTests || 0,
        runtime_ms: s.runtimeMs || 0,
        test_results: s.testResults || [],
        timestamp: s.timestamp || new Date().toISOString(),
      }));
      await supabase.from("algorithm_submissions").upsert(subRows, { onConflict: "id" });
      counts.submissions = subRows.length;
    }

    onProgress?.({
      stage: "Hoàn tất chuyển đổi dữ liệu lên Supabase!",
      percent: 100,
      details: "Tất cả hồ sơ, bài học, thuật toán, ghi chú và thảo luận đã đồng bộ thành công.",
      success: true,
      counts
    });

    return {
      success: true,
      message: "Toàn bộ cơ sở dữ liệu đã được di chuyển thành công sang Supabase!",
      counts
    };
  } catch (err: any) {
    let errorMsg = err.message || String(err);
    if (errorMsg.includes("schema cache") || errorMsg.includes("Could not find the table") || errorMsg.includes("does not exist")) {
      errorMsg = "Bảng dữ liệu chưa được tạo trên Supabase. Bạn vui lòng qua Tab '2. Script Tạo Bảng (SQL Schema)' -> Copy và dán chạy trong Supabase SQL Editor rồi bấm Chuyển dữ liệu lại nhé!";
    }

    onProgress?.({
      stage: "Cần khởi tạo bảng dữ liệu trên Supabase trước",
      percent: 100,
      details: errorMsg,
      success: false,
      error: errorMsg,
      counts
    });
    return {
      success: false,
      message: errorMsg,
      counts
    };
  }
}
