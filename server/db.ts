import initSqlJs, { Database } from "sql.js";
import fs from "fs";
import path from "path";

const isVercel = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);
const DB_DIR = isVercel ? "/tmp" : path.join(process.cwd(), "data");
const DB_PATH = path.join(DB_DIR, "pyedu.sqlite");

let dbInstance: Database | null = null;

// Helper to save SQLite database buffer to disk
export function saveDatabase() {
  if (!dbInstance) return;
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    const data = dbInstance.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync(DB_PATH, buffer);
  } catch (error) {
    console.warn("Notice: SQLite save to disk skipped or unavailable:", error);
  }
}

export async function getDatabase(): Promise<Database> {
  if (dbInstance) return dbInstance;

  const SQL = await initSqlJs();

  if (fs.existsSync(DB_PATH)) {
    try {
      const fileBuffer = fs.readFileSync(DB_PATH);
      dbInstance = new SQL.Database(fileBuffer);
      console.log("Loaded existing SQLite database from:", DB_PATH);
    } catch (e) {
      console.warn("Failed to load existing database file, creating new one:", e);
      dbInstance = new SQL.Database();
    }
  } else {
    console.log("Creating new SQLite database at:", DB_PATH);
    dbInstance = new SQL.Database();
  }

  initTables(dbInstance);
  saveDatabase();
  return dbInstance;
}

function initTables(db: Database) {
  // 1. Users Table
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL DEFAULT '123456',
      full_name TEXT NOT NULL,
      avatar TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'student',
      grade TEXT NOT NULL DEFAULT 'Lớp 10A1',
      school TEXT DEFAULT 'THPT Chuyên Tin',
      total_xp INTEGER NOT NULL DEFAULT 0,
      weekly_xp INTEGER NOT NULL DEFAULT 0,
      streak_days INTEGER NOT NULL DEFAULT 1,
      last_active_date TEXT,
      daily_goal INTEGER NOT NULL DEFAULT 20,
      reminder_time TEXT NOT NULL DEFAULT '19:30',
      reminder_enabled INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL
    );
  `);

  // 2. Badges Table
  db.run(`
    CREATE TABLE IF NOT EXISTS user_badges (
      user_id TEXT NOT NULL,
      badge_id TEXT NOT NULL,
      unlocked_at TEXT NOT NULL,
      PRIMARY KEY (user_id, badge_id)
    );
  `);

  // 3. User Progress / Completed Lessons
  db.run(`
    CREATE TABLE IF NOT EXISTS user_progress (
      user_id TEXT NOT NULL,
      lesson_id TEXT NOT NULL,
      completed INTEGER NOT NULL DEFAULT 0,
      completed_at TEXT,
      score INTEGER NOT NULL DEFAULT 0,
      PRIMARY KEY (user_id, lesson_id)
    );
  `);

  // 4. Saved Code per Lesson
  db.run(`
    CREATE TABLE IF NOT EXISTS user_codes (
      user_id TEXT NOT NULL,
      lesson_id TEXT NOT NULL,
      code TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      PRIMARY KEY (user_id, lesson_id)
    );
  `);

  // 5. Submission History & Test Details
  db.run(`
    CREATE TABLE IF NOT EXISTS submissions (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      lesson_id TEXT NOT NULL,
      passed INTEGER NOT NULL,
      score INTEGER NOT NULL,
      total_tests INTEGER NOT NULL,
      passed_tests INTEGER NOT NULL,
      runtime_ms INTEGER NOT NULL,
      test_results TEXT NOT NULL,
      timestamp TEXT NOT NULL
    );
  `);

  // 6. Personal Notes
  db.run(`
    CREATE TABLE IF NOT EXISTS personal_notes (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      lesson_id TEXT,
      lesson_title TEXT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      code_snippet TEXT,
      tags TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
  `);

  // 7. Study Groups
  db.run(`
    CREATE TABLE IF NOT EXISTS study_groups (
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
      pinned_date TEXT
    );
  `);

  // 8. Study Group Members
  db.run(`
    CREATE TABLE IF NOT EXISTS group_members (
      group_id TEXT NOT NULL,
      user_id TEXT NOT NULL,
      joined_at TEXT NOT NULL,
      PRIMARY KEY (group_id, user_id)
    );
  `);

  // 9. Group Messages
  db.run(`
    CREATE TABLE IF NOT EXISTS group_messages (
      id TEXT PRIMARY KEY,
      group_id TEXT NOT NULL,
      user_id TEXT NOT NULL,
      user_name TEXT NOT NULL,
      user_avatar TEXT NOT NULL,
      user_role TEXT NOT NULL,
      content TEXT NOT NULL,
      code_snippet TEXT,
      likes INTEGER NOT NULL DEFAULT 0,
      timestamp TEXT NOT NULL
    );
  `);

  // 10. Message Likes
  db.run(`
    CREATE TABLE IF NOT EXISTS message_likes (
      message_id TEXT NOT NULL,
      user_id TEXT NOT NULL,
      PRIMARY KEY (message_id, user_id)
    );
  `);

  // 11. Notifications
  db.run(`
    CREATE TABLE IF NOT EXISTS notifications (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      title TEXT NOT NULL,
      message TEXT NOT NULL,
      type TEXT NOT NULL,
      link_tab TEXT,
      read INTEGER NOT NULL DEFAULT 0,
      timestamp TEXT NOT NULL
    );
  `);

  // Seed default users if empty
  seedInitialData(db);
}

function seedInitialData(db: Database) {
  const checkUser = db.exec("SELECT COUNT(*) as count FROM users");
  const count = (checkUser[0]?.values[0]?.[0] as number) || 0;

  if (count === 0) {
    console.log("Seeding initial PyEdu SQLite records...");
    const today = new Date().toISOString().split("T")[0];
    const now = new Date().toISOString();

    // 1. Seed Student: Đặng Song Phúc Khánh
    db.run(
      `INSERT INTO users (id, username, email, password, full_name, avatar, role, grade, school, total_xp, weekly_xp, streak_days, last_active_date, daily_goal, reminder_time, reminder_enabled, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        "student-khanh",
        "khanh_it",
        "khanhdsp@gmail.com",
        "123456",
        "Đặng Song Phúc Khánh",
        "https://api.dicebear.com/7.x/bottts/svg?seed=KhanhIT",
        "student",
        "Lớp 10A1",
        "THPT Chuyên Tin",
        280,
        180,
        4,
        today,
        20,
        "19:30",
        1,
        now
      ]
    );

    // Badges for Khánh
    db.run(`INSERT INTO user_badges (user_id, badge_id, unlocked_at) VALUES ('student-khanh', 'first_step', ?)`, [now]);
    db.run(`INSERT INTO user_badges (user_id, badge_id, unlocked_at) VALUES ('student-khanh', 'streak_3', ?)`, [now]);

    // Completed Lessons for Khánh
    db.run(`INSERT INTO user_progress (user_id, lesson_id, completed, completed_at, score) VALUES ('student-khanh', 'lesson-1', 1, ?, 100)`, [now]);
    db.run(`INSERT INTO user_progress (user_id, lesson_id, completed, completed_at, score) VALUES ('student-khanh', 'lesson-2', 1, ?, 100)`, [now]);

    // Initial code for Khánh
    db.run(
      `INSERT INTO user_codes (user_id, lesson_id, code, updated_at) VALUES (?, ?, ?, ?)`,
      [
        "student-khanh",
        "lesson-1",
        `# Bài 1: Làm quen với Python\nprint("Xin chao, PyEdu!")`,
        now
      ]
    );

    // 2. Seed Teacher: Thầy Nam
    db.run(
      `INSERT INTO users (id, username, email, password, full_name, avatar, role, grade, school, total_xp, weekly_xp, streak_days, last_active_date, daily_goal, reminder_time, reminder_enabled, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        "teacher-nam",
        "thaynam_tin",
        "thaynam@pyedu.edu.vn",
        "123456",
        "Thầy Trần Văn Nam",
        "https://api.dicebear.com/7.x/bottts/svg?seed=TeacherNam",
        "teacher",
        "Giáo viên Tin học",
        "Tổ Tin học - Công Nghệ",
        5200,
        1200,
        45,
        today,
        60,
        "20:00",
        1,
        now
      ]
    );

    // 3. Seed other Top Students for Leaderboard
    const otherStudents = [
      { id: "stu-1", username: "lananh_coder", email: "lananh@gmail.com", name: "Nguyễn Lan Anh", grade: "Lớp 10A1", xp: 1450, wxp: 480, streak: 12, avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=LanAnh" },
      { id: "stu-2", username: "minh_algorithm", email: "minh@gmail.com", name: "Lê Hoàng Minh", grade: "Lớp 11A", xp: 1320, wxp: 520, streak: 9, avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=MinhAlgo" },
      { id: "stu-3", username: "bao_python", email: "bao@gmail.com", name: "Phạm Gia Bảo", grade: "Lớp 10A2", xp: 1180, wxp: 350, streak: 7, avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=BaoPy" },
      { id: "stu-4", username: "thu_ha_ai", email: "ha@gmail.com", name: "Trần Thu Hà", grade: "Lớp 12 Tin", xp: 990, wxp: 290, streak: 5, avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=ThuHa" },
    ];

    for (const s of otherStudents) {
      db.run(
        `INSERT INTO users (id, username, email, password, full_name, avatar, role, grade, school, total_xp, weekly_xp, streak_days, last_active_date, daily_goal, reminder_time, reminder_enabled, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [s.id, s.username, s.email, "123456", s.name, s.avatar, "student", s.grade, "THPT Chuyên Tin", s.xp, s.wxp, s.streak, today, 20, "19:00", 1, now]
      );
    }

    // Seed Study Groups
    db.run(`
      INSERT INTO study_groups (id, name, description, category, member_count, teacher_name, avatar, pinned_title, pinned_content, pinned_author, pinned_date)
      VALUES 
      ('group-10a1', 'Lớp 10A1 - Chuyên Tin PyEdu', 'Nhóm học tập chính thức môn Tin học lập trình Python của lớp 10A1.', 'Lớp học chính khóa', 36, 'Thầy Trần Văn Nam', '🏫', 'Kế hoạch kiểm tra 15 phút tuần sau', 'Các em nhớ hoàn thành toàn bộ bài tập Chương 2 (Cấu trúc rẽ nhánh) và Chương 3 (Vòng lặp) để chuẩn bị cho buổi thực hành nhé.', 'Thầy Nam', 'Hôm qua'),
      ('group-hsg', 'Đội Tuyển HSG Tin Học Trẻ', 'Luyện giải các bài toán thuật toán nâng cao, cấu trúc dữ liệu và tối ưu thời gian chạy O(N).', 'Đội tuyển & CLB', 18, 'Thầy Trần Văn Nam', '🚀', 'Thử thách tuần này: Đệ quy và Quy hoạch động', 'Hãy tham khảo tài liệu trong mục Cẩm nang và thảo luận cách giải bài toán Dãy con tăng dài nhất.', 'Thầy Nam', '2 ngày trước'),
      ('group-beginners', 'Cộng Đồng Tự Học Python Cơ Bản', 'Dành cho các bạn mới bắt đầu làm quen với ngôn ngữ lập trình Python từ con số 0.', 'Cộng đồng tự học', 142, 'Cô Mai Hương', '🐍', 'Chào mừng thành viên mới!', 'Hãy mạnh dạn hỏi bất kỳ thắc mắc nào về lỗi SyntaxError hoặc IndentationError nhé!', 'Cô Hương', 'Tuần trước');
    `);

    // Add group members
    db.run(`INSERT INTO group_members (group_id, user_id, joined_at) VALUES ('group-10a1', 'student-khanh', ?)`, [now]);
    db.run(`INSERT INTO group_members (group_id, user_id, joined_at) VALUES ('group-beginners', 'student-khanh', ?)`, [now]);

    // Add group messages
    db.run(`
      INSERT INTO group_messages (id, group_id, user_id, user_name, user_avatar, user_role, content, code_snippet, likes, timestamp)
      VALUES
      ('msg-1', 'group-10a1', 'teacher-nam', 'Thầy Trần Văn Nam', 'https://api.dicebear.com/7.x/bottts/svg?seed=TeacherNam', 'teacher', 'Chào cả lớp! Thầy đã cập nhật thêm 3 test case ẩn cho Bài 6 (Tìm số nguyên tố). Các em chú ý xử lý trường hợp n <= 1 nhé!', 'if n <= 1:\n    print("KHONG")\nelse:\n    # Kiem tra chia het tu 2 den sqrt(n)', 8, '08:30'),
      ('msg-2', 'group-10a1', 'stu-1', 'Nguyễn Lan Anh', 'https://api.dicebear.com/7.x/bottts/svg?seed=LanAnh', 'student', 'Em đã thử dùng vòng lặp range(2, int(n**0.5) + 1) và vượt qua 100% test case trong 12ms rồi ạ!', NULL, 5, '09:15'),
      ('msg-3', 'group-10a1', 'student-khanh', 'Đặng Song Phúc Khánh', 'https://api.dicebear.com/7.x/bottts/svg?seed=KhanhIT', 'student', 'Cảm ơn gợi ý của thầy và bạn Lan Anh, mình vừa fix xong lỗi số 2 là số nguyên tố!', NULL, 3, '10:00');
    `);

    // Seed sample Personal Notes for Khánh
    db.run(`
      INSERT INTO personal_notes (id, user_id, lesson_id, lesson_title, title, content, code_snippet, tags, created_at, updated_at)
      VALUES
      ('note-1', 'student-khanh', 'lesson-1', 'Bài 1: Làm quen với Python', 'Cú pháp hàm print() và các tham số sep, end', 'Hàm print() có thể nhận nhiều tham số cách nhau bởi dấu phẩy. Mặc định nó sẽ tự chèn khoảng trắng và xuống dòng.', 'print("A", "B", sep="-", end="!") # In ra A-B!', 'Cú pháp,print,Cơ bản', ?, ?),
      ('note-2', 'student-khanh', 'lesson-4', 'Bài 4: Phép toán số học', 'Mẹo tách chữ số hàng đơn vị và hàng chục', 'Dùng n % 10 để lấy chữ số cuối cùng, dùng n // 10 để bỏ chữ số cuối cùng. Cực kỳ hữu dụng trong các bài toán lặp số!', 'last_digit = n % 10\\nremaining = n // 10', 'Mẹo hay,Toán học,Thuật toán', ?, ?);
    `, [now, now, now, now]);

    // Seed sample notifications for Khánh
    db.run(`
      INSERT INTO notifications (id, user_id, title, message, type, link_tab, read, timestamp)
      VALUES
      ('notif-1', 'student-khanh', '🔥 Giữ vững chuỗi Streak 4 ngày!', 'Bạn đã hoàn thành bài học 4 ngày liên tiếp. Hãy luyện thêm 1 bài hôm nay để nâng lên 5 ngày!', 'streak', 'learn', 0, '10 phút trước'),
      ('notif-2', 'student-khanh', '🏆 Bảng xếp hạng Tuần đã mở!', 'Bạn đang đứng ở vị trí Top 5 tuần này. Hãy giải thêm thử thách để leo lên Top 3 nhận huy hiệu danh giá!', 'contest', 'leaderboard', 0, '2 giờ trước'),
      ('notif-3', 'student-khanh', '💬 Thầy Nam đã đăng thông báo mới trong Lớp 10A1', 'Nhắc nhở nộp bài tập Chương 2 và Chương 3 trước thứ 6.', 'group', 'groups', 1, 'Hôm qua');
    `);
  }
}

// ==================== HELPER DATABASE QUERIES ====================

export async function getUserByCredentials(identifier: string) {
  const db = await getDatabase();
  const stmt = db.prepare(`
    SELECT * FROM users 
    WHERE LOWER(username) = LOWER(?) OR LOWER(email) = LOWER(?)
  `);
  stmt.bind([identifier, identifier]);
  
  if (stmt.step()) {
    const row = stmt.getAsObject();
    stmt.free();
    return formatUser(db, row);
  }
  stmt.free();
  return null;
}

export async function getUserById(id: string) {
  const db = await getDatabase();
  const stmt = db.prepare(`SELECT * FROM users WHERE id = ?`);
  stmt.bind([id]);
  
  if (stmt.step()) {
    const row = stmt.getAsObject();
    stmt.free();
    return formatUser(db, row);
  }
  stmt.free();
  return null;
}

function formatUser(db: Database, row: any) {
  const userId = row.id;

  // Get badges
  const badgesStmt = db.prepare(`SELECT badge_id FROM user_badges WHERE user_id = ?`);
  badgesStmt.bind([userId]);
  const badges: string[] = [];
  while (badgesStmt.step()) {
    badges.push(badgesStmt.getAsObject().badge_id as string);
  }
  badgesStmt.free();

  // Get completed lessons
  const progStmt = db.prepare(`SELECT lesson_id FROM user_progress WHERE user_id = ? AND completed = 1`);
  progStmt.bind([userId]);
  const completedLessons: string[] = [];
  while (progStmt.step()) {
    completedLessons.push(progStmt.getAsObject().lesson_id as string);
  }
  progStmt.free();

  return {
    id: row.id,
    username: row.username,
    email: row.email,
    fullName: row.full_name,
    avatar: row.avatar,
    role: row.role,
    grade: row.grade,
    school: row.school || "THPT Chuyên Tin",
    totalXp: Number(row.total_xp) || 0,
    weeklyXp: Number(row.weekly_xp) || 0,
    streakDays: Number(row.streak_days) || 1,
    lastActiveDate: row.last_active_date,
    dailyGoal: Number(row.daily_goal) || 20,
    reminderTime: row.reminder_time || "19:30",
    reminderEnabled: Boolean(row.reminder_enabled),
    badges,
    completedLessons
  };
}

export async function createUser(userData: {
  username: string;
  email: string;
  password?: string;
  fullName: string;
  grade: string;
  role: 'student' | 'teacher';
  school?: string;
}) {
  const db = await getDatabase();
  const id = `user-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
  const avatar = `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(userData.username)}`;
  const now = new Date().toISOString();
  const today = now.split("T")[0];

  db.run(
    `INSERT INTO users (id, username, email, password, full_name, avatar, role, grade, school, total_xp, weekly_xp, streak_days, last_active_date, daily_goal, reminder_time, reminder_enabled, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      userData.username,
      userData.email,
      userData.password || "123456",
      userData.fullName,
      avatar,
      userData.role,
      userData.grade,
      userData.school || "THPT Chuyên Tin",
      0,
      0,
      1,
      today,
      20,
      "19:30",
      1,
      now
    ]
  );

  // Auto add to standard study group
  db.run(`INSERT INTO group_members (group_id, user_id, joined_at) VALUES ('group-10a1', ?, ?)`, [id, now]);
  db.run(`INSERT INTO group_members (group_id, user_id, joined_at) VALUES ('group-beginners', ?, ?)`, [id, now]);

  saveDatabase();
  return getUserById(id);
}

export async function updateUser(id: string, updates: any) {
  const db = await getDatabase();
  const allowedFields: Record<string, string> = {
    fullName: 'full_name',
    grade: 'grade',
    school: 'school',
    avatar: 'avatar',
    dailyGoal: 'daily_goal',
    reminderTime: 'reminder_time',
    reminderEnabled: 'reminder_enabled',
    totalXp: 'total_xp',
    weeklyXp: 'weekly_xp',
    streakDays: 'streak_days',
    lastActiveDate: 'last_active_date'
  };

  for (const [key, col] of Object.entries(allowedFields)) {
    if (updates[key] !== undefined) {
      const val = typeof updates[key] === 'boolean' ? (updates[key] ? 1 : 0) : updates[key];
      db.run(`UPDATE users SET ${col} = ? WHERE id = ?`, [val, id]);
    }
  }

  saveDatabase();
  return getUserById(id);
}

export async function getAllUsers() {
  const db = await getDatabase();
  const res = db.exec(`SELECT * FROM users ORDER BY total_xp DESC`);
  if (!res[0]) return [];

  const users: any[] = [];
  const rows = res[0].values;
  const cols = res[0].columns;

  for (const rowVals of rows) {
    const obj: any = {};
    cols.forEach((col, idx) => {
      obj[col] = rowVals[idx];
    });
    users.push(formatUser(db, obj));
  }
  return users;
}

// User Code Storage
export async function getUserCodes(userId: string): Promise<Record<string, string>> {
  const db = await getDatabase();
  const stmt = db.prepare(`SELECT lesson_id, code FROM user_codes WHERE user_id = ?`);
  stmt.bind([userId]);
  const codes: Record<string, string> = {};
  while (stmt.step()) {
    const row = stmt.getAsObject();
    codes[row.lesson_id as string] = row.code as string;
  }
  stmt.free();
  return codes;
}

export async function saveUserCode(userId: string, lessonId: string, code: string) {
  const db = await getDatabase();
  const now = new Date().toISOString();
  db.run(`
    INSERT INTO user_codes (user_id, lesson_id, code, updated_at)
    VALUES (?, ?, ?, ?)
    ON CONFLICT(user_id, lesson_id) DO UPDATE SET code = excluded.code, updated_at = excluded.updated_at
  `, [userId, lessonId, code, now]);
  saveDatabase();
}

// Submissions History & Test Results
export async function recordSubmission(sub: {
  id?: string;
  userId: string;
  lessonId: string;
  passed: boolean;
  score: number;
  totalTests: number;
  passedTests: number;
  runtimeMs: number;
  testResults: any[];
  xpEarned?: number;
}) {
  const db = await getDatabase();
  const id = sub.id || `sub-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
  const now = new Date().toISOString();

  db.run(`
    INSERT INTO submissions (id, user_id, lesson_id, passed, score, total_tests, passed_tests, runtime_ms, test_results, timestamp)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [
    id,
    sub.userId,
    sub.lessonId,
    sub.passed ? 1 : 0,
    sub.score,
    sub.totalTests,
    sub.passedTests,
    sub.runtimeMs,
    JSON.stringify(sub.testResults),
    now
  ]);

  if (sub.passed) {
    // Check if previously completed
    const stmt = db.prepare(`SELECT completed FROM user_progress WHERE user_id = ? AND lesson_id = ?`);
    stmt.bind([sub.userId, sub.lessonId]);
    let isFirstTime = true;
    if (stmt.step()) {
      const row = stmt.getAsObject();
      if (row.completed) isFirstTime = false;
    }
    stmt.free();

    // Mark as completed in user_progress
    db.run(`
      INSERT INTO user_progress (user_id, lesson_id, completed, completed_at, score)
      VALUES (?, ?, 1, ?, ?)
      ON CONFLICT(user_id, lesson_id) DO UPDATE SET completed = 1, completed_at = excluded.completed_at, score = excluded.score
    `, [sub.userId, sub.lessonId, now, sub.score]);

    if (isFirstTime) {
      const xp = sub.xpEarned || 50;
      db.run(`UPDATE users SET total_xp = total_xp + ?, weekly_xp = weekly_xp + ? WHERE id = ?`, [xp, xp, sub.userId]);

      // Check first_step badge
      db.run(`INSERT OR IGNORE INTO user_badges (user_id, badge_id, unlocked_at) VALUES (?, 'first_step', ?)`, [sub.userId, now]);
      if (sub.score === 100) {
        db.run(`INSERT OR IGNORE INTO user_badges (user_id, badge_id, unlocked_at) VALUES (?, 'perfect_score', ?)`, [sub.userId, now]);
      }
    }
  }

  saveDatabase();
  return { id, timestamp: now };
}

export async function getUserSubmissions(userId: string) {
  const db = await getDatabase();
  const stmt = db.prepare(`SELECT * FROM submissions WHERE user_id = ? ORDER BY timestamp DESC`);
  stmt.bind([userId]);
  const subs: any[] = [];
  while (stmt.step()) {
    const row = stmt.getAsObject();
    subs.push({
      id: row.id,
      lessonId: row.lesson_id,
      passed: Boolean(row.passed),
      score: Number(row.score),
      totalTests: Number(row.total_tests),
      passedTests: Number(row.passed_tests),
      runtimeMs: Number(row.runtime_ms),
      testResults: JSON.parse((row.test_results as string) || "[]"),
      timestamp: row.timestamp
    });
  }
  stmt.free();
  return subs;
}

// Notes CRUD
export async function getUserNotes(userId: string) {
  const db = await getDatabase();
  const stmt = db.prepare(`SELECT * FROM personal_notes WHERE user_id = ? ORDER BY created_at DESC`);
  stmt.bind([userId]);
  const notes: any[] = [];
  while (stmt.step()) {
    const row = stmt.getAsObject();
    notes.push({
      id: row.id,
      lessonId: row.lesson_id,
      lessonTitle: row.lesson_title,
      title: row.title,
      content: row.content,
      codeSnippet: row.code_snippet,
      tags: (row.tags as string) ? (row.tags as string).split(",") : [],
      createdAt: row.created_at,
      updatedAt: row.updated_at
    });
  }
  stmt.free();
  return notes;
}

export async function addNote(note: {
  userId: string;
  lessonId?: string;
  lessonTitle?: string;
  title: string;
  content: string;
  codeSnippet?: string;
  tags?: string[];
}) {
  const db = await getDatabase();
  const id = `note-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
  const now = new Date().toISOString();
  db.run(`
    INSERT INTO personal_notes (id, user_id, lesson_id, lesson_title, title, content, code_snippet, tags, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [
    id,
    note.userId,
    note.lessonId || null,
    note.lessonTitle || null,
    note.title,
    note.content,
    note.codeSnippet || null,
    note.tags ? note.tags.join(",") : "",
    now,
    now
  ]);
  saveDatabase();
  return { id, ...note, createdAt: now, updatedAt: now };
}

export async function updateNote(id: string, updates: any) {
  const db = await getDatabase();
  const now = new Date().toISOString();
  if (updates.title) db.run(`UPDATE personal_notes SET title = ?, updated_at = ? WHERE id = ?`, [updates.title, now, id]);
  if (updates.content) db.run(`UPDATE personal_notes SET content = ?, updated_at = ? WHERE id = ?`, [updates.content, now, id]);
  if (updates.codeSnippet !== undefined) db.run(`UPDATE personal_notes SET code_snippet = ?, updated_at = ? WHERE id = ?`, [updates.codeSnippet, now, id]);
  if (updates.tags) db.run(`UPDATE personal_notes SET tags = ?, updated_at = ? WHERE id = ?`, [updates.tags.join(","), now, id]);
  saveDatabase();
}

export async function deleteNote(id: string) {
  const db = await getDatabase();
  db.run(`DELETE FROM personal_notes WHERE id = ?`, [id]);
  saveDatabase();
}

// Study Groups
export async function getStudyGroups(userId: string) {
  const db = await getDatabase();
  const res = db.exec(`SELECT * FROM study_groups`);
  if (!res[0]) return [];

  const groups: any[] = [];
  const rows = res[0].values;
  const cols = res[0].columns;

  for (const rowVals of rows) {
    const g: any = {};
    cols.forEach((col, idx) => { g[col] = rowVals[idx]; });

    // Check isJoined
    const memStmt = db.prepare(`SELECT 1 FROM group_members WHERE group_id = ? AND user_id = ?`);
    memStmt.bind([g.id, userId]);
    const isJoined = memStmt.step();
    memStmt.free();

    // Get messages
    const msgStmt = db.prepare(`SELECT * FROM group_messages WHERE group_id = ? ORDER BY timestamp ASC`);
    msgStmt.bind([g.id]);
    const messages: any[] = [];
    while (msgStmt.step()) {
      const mRow = msgStmt.getAsObject();
      
      // Check if user liked this message
      const likeStmt = db.prepare(`SELECT 1 FROM message_likes WHERE message_id = ? AND user_id = ?`);
      likeStmt.bind([mRow.id, userId]);
      const isLiked = likeStmt.step();
      likeStmt.free();

      messages.push({
        id: mRow.id,
        userId: mRow.user_id,
        userName: mRow.user_name,
        userAvatar: mRow.user_avatar,
        userRole: mRow.user_role,
        content: mRow.content,
        codeSnippet: mRow.code_snippet,
        likes: Number(mRow.likes) || 0,
        isLiked: Boolean(isLiked),
        timestamp: mRow.timestamp
      });
    }
    msgStmt.free();

    groups.push({
      id: g.id,
      name: g.name,
      description: g.description,
      category: g.category,
      memberCount: Number(g.member_count) || 1,
      isJoined: Boolean(isJoined),
      teacherName: g.teacher_name,
      avatar: g.avatar,
      pinnedPost: g.pinned_title ? {
        title: g.pinned_title,
        content: g.pinned_content,
        author: g.pinned_author,
        date: g.pinned_date
      } : undefined,
      messages
    });
  }

  return groups;
}

export async function joinGroup(groupId: string, userId: string) {
  const db = await getDatabase();
  const now = new Date().toISOString();
  db.run(`INSERT OR IGNORE INTO group_members (group_id, user_id, joined_at) VALUES (?, ?, ?)`, [groupId, userId, now]);
  db.run(`UPDATE study_groups SET member_count = member_count + 1 WHERE id = ?`, [groupId]);
  saveDatabase();
}

export async function leaveGroup(groupId: string, userId: string) {
  const db = await getDatabase();
  db.run(`DELETE FROM group_members WHERE group_id = ? AND user_id = ?`, [groupId, userId]);
  db.run(`UPDATE study_groups SET member_count = MAX(1, member_count - 1) WHERE id = ?`, [groupId]);
  saveDatabase();
}

export async function addGroupMessage(groupId: string, msg: {
  userId: string;
  userName: string;
  userAvatar: string;
  userRole: string;
  content: string;
  codeSnippet?: string;
}) {
  const db = await getDatabase();
  const id = `msg-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  db.run(`
    INSERT INTO group_messages (id, group_id, user_id, user_name, user_avatar, user_role, content, code_snippet, likes, timestamp)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0, ?)
  `, [
    id,
    groupId,
    msg.userId,
    msg.userName,
    msg.userAvatar,
    msg.userRole,
    msg.content,
    msg.codeSnippet || null,
    time
  ]);
  saveDatabase();
  return { id, ...msg, likes: 0, isLiked: false, timestamp: time };
}

export async function toggleMessageLike(messageId: string, userId: string) {
  const db = await getDatabase();
  const stmt = db.prepare(`SELECT 1 FROM message_likes WHERE message_id = ? AND user_id = ?`);
  stmt.bind([messageId, userId]);
  const exists = stmt.step();
  stmt.free();

  if (exists) {
    db.run(`DELETE FROM message_likes WHERE message_id = ? AND user_id = ?`, [messageId, userId]);
    db.run(`UPDATE group_messages SET likes = MAX(0, likes - 1) WHERE id = ?`, [messageId]);
  } else {
    db.run(`INSERT INTO message_likes (message_id, user_id) VALUES (?, ?)`, [messageId, userId]);
    db.run(`UPDATE group_messages SET likes = likes + 1 WHERE id = ?`, [messageId]);
  }
  saveDatabase();
  return !exists;
}

// Notifications
export async function getUserNotifications(userId: string) {
  const db = await getDatabase();
  const stmt = db.prepare(`SELECT * FROM notifications WHERE user_id = ? ORDER BY rowid DESC`);
  stmt.bind([userId]);
  const notifs: any[] = [];
  while (stmt.step()) {
    const row = stmt.getAsObject();
    notifs.push({
      id: row.id,
      title: row.title,
      message: row.message,
      type: row.type,
      linkTab: row.link_tab,
      read: Boolean(row.read),
      timestamp: row.timestamp
    });
  }
  stmt.free();
  return notifs;
}

export async function addNotification(userId: string, notif: {
  title: string;
  message: string;
  type: string;
  linkTab?: string;
}) {
  const db = await getDatabase();
  const id = `notif-${Date.now()}`;
  db.run(`
    INSERT INTO notifications (id, user_id, title, message, type, link_tab, read, timestamp)
    VALUES (?, ?, ?, ?, ?, ?, 0, 'Vừa xong')
  `, [id, userId, notif.title, notif.message, notif.type, notif.linkTab || null]);
  saveDatabase();
  return { id, ...notif, read: false, timestamp: "Vừa xong" };
}

export async function markNotificationRead(id: string) {
  const db = await getDatabase();
  db.run(`UPDATE notifications SET read = 1 WHERE id = ?`, [id]);
  saveDatabase();
}

export async function clearNotifications(userId: string) {
  const db = await getDatabase();
  db.run(`DELETE FROM notifications WHERE user_id = ?`, [userId]);
  saveDatabase();
}

