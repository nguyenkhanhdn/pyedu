import express from "express";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { GoogleGenAI } from "@google/genai";
import {
  getUserByCredentials,
  getUserById,
  createUser,
  updateUser,
  getAllUsers,
  getUserCodes,
  saveUserCode,
  recordSubmission,
  getUserSubmissions,
  getUserNotes,
  addNote,
  updateNote,
  deleteNote,
  getStudyGroups,
  joinGroup,
  leaveGroup,
  addGroupMessage,
  toggleMessageLike,
  getUserNotifications,
  addNotification,
  markNotificationRead,
  clearNotifications,
  getDatabase
} from "./db";

dotenv.config();

export const app = express();

app.use(express.json());

// Serve Sotay.html reference document
app.get(["/Sotay.html", "/sotay.html"], (_req, res) => {
  const rootPath = path.join(process.cwd(), "Sotay.html");
  if (fs.existsSync(rootPath)) {
    return res.sendFile(rootPath);
  }
  const publicPath = path.join(process.cwd(), "public", "Sotay.html");
  if (fs.existsSync(publicPath)) {
    return res.sendFile(publicPath);
  }
  res.status(404).send("Tài liệu Sotay.html không tìm thấy.");
});

// Initialize SQLite database eagerly
getDatabase().catch(err => console.warn("SQLite init notice:", err));

// ==================== SQLITE AUTH & USER API ====================

// Login endpoint
app.post("/api/auth/login", async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;
    if (!usernameOrEmail) {
      return res.status(400).json({ error: "Vui lòng nhập tên đăng nhập hoặc email." });
    }

    const user = await getUserByCredentials(usernameOrEmail);
    if (!user) {
      return res.status(401).json({ error: "Tài khoản không tồn tại. Hãy đăng ký tài khoản mới!" });
    }

    if (password && user.password && user.password !== password) {
      return res.status(401).json({ error: "Mật khẩu không chính xác!" });
    }

    res.json({ success: true, user });
  } catch (error: any) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Lỗi máy chủ khi đăng nhập", details: error.message });
  }
});

// Register endpoint
app.post("/api/auth/register", async (req, res) => {
  try {
    const { username, email, fullName, grade, role, school, password } = req.body;
    if (!username || !email || !fullName) {
      return res.status(400).json({ error: "Vui lòng điền đầy đủ các thông tin bắt buộc." });
    }

    const existing = await getUserByCredentials(username);
    if (existing) {
      return res.status(409).json({ error: "Tên đăng nhập hoặc Email đã được sử dụng." });
    }

    const existingEmail = await getUserByCredentials(email);
    if (existingEmail) {
      return res.status(409).json({ error: "Email này đã được đăng ký tài khoản." });
    }

    const newUser = await createUser({
      username: username.trim(),
      email: email.trim(),
      password: password || "123456",
      fullName: fullName.trim(),
      grade: grade || "Lớp 10A1",
      role: role || "student",
      school: school || "THPT Chuyên Tin"
    });

    res.status(201).json({ success: true, user: newUser });
  } catch (error: any) {
    console.error("Register error:", error);
    res.status(500).json({ error: "Lỗi khi đăng ký tài khoản", details: error.message });
  }
});

// Get all users (for leaderboard and accounts switcher)
app.get("/api/auth/users", async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json({ users });
  } catch (error: any) {
    console.error("Get users error:", error);
    res.status(500).json({ error: "Lỗi tải danh sách người dùng", details: error.message });
  }
});

// Get all student persistent data (codes, submissions, notes, groups, notifs)
app.get("/api/user/:id/data", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await getUserById(userId);
    if (!user) {
      return res.status(404).json({ error: "Không tìm thấy người học" });
    }

    const [codes, submissions, notes, groups, notifications] = await Promise.all([
      getUserCodes(userId),
      getUserSubmissions(userId),
      getUserNotes(userId),
      getStudyGroups(userId),
      getUserNotifications(userId)
    ]);

    res.json({
      user,
      codes,
      submissions,
      notes,
      groups,
      notifications
    });
  } catch (error: any) {
    console.error("Get user data error:", error);
    res.status(500).json({ error: "Lỗi tải dữ liệu người dùng", details: error.message });
  }
});

// Update student profile
app.put("/api/user/:id/profile", async (req, res) => {
  try {
    const userId = req.params.id;
    const updated = await updateUser(userId, req.body);
    res.json({ success: true, user: updated });
  } catch (error: any) {
    console.error("Update user error:", error);
    res.status(500).json({ error: "Lỗi cập nhật hồ sơ", details: error.message });
  }
});

// Save current lesson code into SQLite
app.post("/api/user/:id/code", async (req, res) => {
  try {
    const userId = req.params.id;
    const { lessonId, code } = req.body;
    if (!lessonId || code === undefined) {
      return res.status(400).json({ error: "Thiếu lessonId hoặc code" });
    }

    await saveUserCode(userId, lessonId, code);
    res.json({ success: true });
  } catch (error: any) {
    console.error("Save code error:", error);
    res.status(500).json({ error: "Lỗi lưu mã nguồn", details: error.message });
  }
});

// Record test submission into SQLite
app.post("/api/user/:id/submit", async (req, res) => {
  try {
    const userId = req.params.id;
    const { lessonId, passed, score, totalTests, passedTests, runtimeMs, testResults, xpReward } = req.body;

    const result = await recordSubmission({
      userId,
      lessonId,
      passed,
      score,
      totalTests,
      passedTests,
      runtimeMs,
      testResults: testResults || [],
      xpEarned: xpReward
    });

    const updatedUser = await getUserById(userId);
    res.json({ success: true, submissionId: result.id, timestamp: result.timestamp, user: updatedUser });
  } catch (error: any) {
    console.error("Record submission error:", error);
    res.status(500).json({ error: "Lỗi ghi nhận bài nộp", details: error.message });
  }
});

// Get submissions history
app.get("/api/user/:id/submissions", async (req, res) => {
  try {
    const userId = req.params.id;
    const subs = await getUserSubmissions(userId);
    res.json({ submissions: subs });
  } catch (error: any) {
    res.status(500).json({ error: "Lỗi lấy lịch sử bài nộp", details: error.message });
  }
});

// Personal Notes CRUD in SQLite
app.get("/api/notes/:userId", async (req, res) => {
  try {
    const notes = await getUserNotes(req.params.userId);
    res.json({ notes });
  } catch (error: any) {
    res.status(500).json({ error: "Lỗi lấy ghi chú", details: error.message });
  }
});

app.post("/api/notes", async (req, res) => {
  try {
    const { userId, lessonId, lessonTitle, title, content, codeSnippet, tags } = req.body;
    if (!userId || !title || !content) {
      return res.status(400).json({ error: "Thiếu thông tin ghi chú bắt buộc" });
    }
    const note = await addNote({ userId, lessonId, lessonTitle, title, content, codeSnippet, tags });
    res.status(201).json({ success: true, note });
  } catch (error: any) {
    res.status(500).json({ error: "Lỗi tạo ghi chú", details: error.message });
  }
});

app.put("/api/notes/:id", async (req, res) => {
  try {
    await updateNote(req.params.id, req.body);
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: "Lỗi sửa ghi chú", details: error.message });
  }
});

app.delete("/api/notes/:id", async (req, res) => {
  try {
    await deleteNote(req.params.id);
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: "Lỗi xóa ghi chú", details: error.message });
  }
});

// Study groups
app.get("/api/groups", async (req, res) => {
  try {
    const userId = (req.query.userId as string) || "";
    const groups = await getStudyGroups(userId);
    res.json({ groups });
  } catch (error: any) {
    res.status(500).json({ error: "Lỗi tải danh sách nhóm học", details: error.message });
  }
});

app.post("/api/groups/:groupId/join", async (req, res) => {
  try {
    const { userId } = req.body;
    await joinGroup(req.params.groupId, userId);
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: "Lỗi tham gia nhóm", details: error.message });
  }
});

app.post("/api/groups/:groupId/leave", async (req, res) => {
  try {
    const { userId } = req.body;
    await leaveGroup(req.params.groupId, userId);
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: "Lỗi rời nhóm", details: error.message });
  }
});

app.post("/api/groups/:groupId/message", async (req, res) => {
  try {
    const { userId, userName, userAvatar, userRole, content, codeSnippet } = req.body;
    const msg = await addGroupMessage(req.params.groupId, {
      userId,
      userName,
      userAvatar,
      userRole,
      content,
      codeSnippet
    });
    res.status(201).json({ success: true, message: msg });
  } catch (error: any) {
    res.status(500).json({ error: "Lỗi gửi tin nhắn", details: error.message });
  }
});

app.post("/api/groups/:groupId/message/:messageId/like", async (req, res) => {
  try {
    const { userId } = req.body;
    const isLiked = await toggleMessageLike(req.params.messageId, userId);
    res.json({ success: true, isLiked });
  } catch (error: any) {
    res.status(500).json({ error: "Lỗi tương tác tin nhắn", details: error.message });
  }
});

// Notifications
app.get("/api/notifications/:userId", async (req, res) => {
  try {
    const notifs = await getUserNotifications(req.params.userId);
    res.json({ notifications: notifs });
  } catch (error: any) {
    res.status(500).json({ error: "Lỗi tải thông báo", details: error.message });
  }
});

app.put("/api/notifications/:id/read", async (req, res) => {
  try {
    await markNotificationRead(req.params.id);
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: "Lỗi đánh dấu thông báo", details: error.message });
  }
});

app.delete("/api/notifications/:userId", async (req, res) => {
  try {
    await clearNotifications(req.params.userId);
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: "Lỗi xóa thông báo", details: error.message });
  }
});

// Initialize Google GenAI client lazily or safely
let genAIClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  if (!genAIClient && process.env.GEMINI_API_KEY) {
    genAIClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return genAIClient;
}

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// 24/7 AI Python Tutor Chatbot endpoint
app.post("/api/ai/tutor", async (req, res) => {
  try {
    const { message, history, context } = req.body;
    const ai = getGenAI();

    if (!ai) {
      const fallbackResponses = [
        `Chào em! Thầy/Cô là trợ lý gia sư Python AI. Trong bài "${context?.lessonTitle || 'Python'}", em hãy chú ý: ${
          context?.currentCode?.includes('for') ? 'Vòng lặp for cần lưu ý cú pháp range(start, stop, step).' : 'Hãy kiểm tra kiểu dữ liệu đầu vào và các phép toán.'
        } Em hãy đặt câu hỏi chi tiết về lỗi hoặc thuật toán để thầy giải thích thêm nhé!`,
        `Thầy nhận thấy em đang làm bài "${context?.lessonTitle || 'lập trình'}". Hãy kiểm tra lại thụt đầu dòng (indentation) và kiểu dữ liệu trả về nhé. Em có muốn gợi ý hướng đi không?`
      ];
      const randomResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
      return res.json({ response: randomResponse });
    }

    const systemInstruction = `Bạn là Trợ lý Giáo viên Tin học AI (AI Python Tutor) tận tâm, sư phạm và thân thiện trong nền tảng học lập trình PyEdu.
Nhiệm vụ của bạn là:
1. Giải đáp thắc mắc, hướng dẫn học sinh hiểu bản chất kiến thức Python, tư duy thuật toán và cú pháp.
2. Tuyệt đối KHÔNG đưa trực tiếp toàn bộ code giải hoàn chỉnh nếu học sinh đang làm bài tập kiểm tra/thử thách, thay vào đó hãy:
   - Giải thích logic bước từng bước.
   - Đặt câu hỏi gợi mở để học sinh tự suy nghĩ.
   - Chỉ ra vị trí lỗi logic hoặc cú pháp (như thụt dòng IndentationError, sai kiểu dữ liệu TypeError, tràn chỉ số IndexError).
   - Đưa ví dụ tương tự đơn giản hơn để học sinh tự áp dụng.
3. Sử dụng ngôn ngữ tiếng Việt trong sáng, sư phạm, xưng hô "Thầy/Cô" hoặc "PyEdu AI" và gọi học sinh là "Em".
4. Sử dụng định dạng Markdown với code blocks (\`\`\`python) rõ ràng khi minh họa.

Thông tin ngữ cảnh hiện tại của học sinh:
- Tên bài học: ${context?.lessonTitle || 'Chưa chọn'}
- Mục tiêu bài học: ${context?.lessonObjective || 'Thực hành Python'}
- Mã nguồn hiện tại của học sinh:
\`\`\`python
${context?.currentCode || '# Chưa có code'}
\`\`\`
- Kết quả test/Lỗi gần nhất: ${context?.lastError || 'Không có lỗi'}`;

    const contents: any[] = [];
    if (Array.isArray(history) && history.length > 0) {
      for (const item of history.slice(-8)) {
        contents.push({
          role: item.role === 'user' ? 'user' : 'model',
          parts: [{ text: item.text }]
        });
      }
    }
    contents.push({
      role: 'user',
      parts: [{ text: message || 'Xin chào, hãy hướng dẫn em bài tập này.' }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const replyText = response.text || "Thầy đã nhận được câu hỏi. Em hãy kiểm tra lại cấu trúc code và thử chạy lại nhé!";
    res.json({ response: replyText });
  } catch (error: any) {
    console.error("AI Tutor error:", error);
    res.status(500).json({
      error: "Không thể kết nối đến trợ lý AI lúc này.",
      details: error?.message || "Internal server error"
    });
  }
});

// AI Error Explainer & Step-by-step Hint Generator
app.post("/api/ai/explain-error", async (req, res) => {
  try {
    const { code, errorMessage, lessonTitle, testInput, expectedOutput, actualOutput } = req.body;
    const ai = getGenAI();

    if (!ai) {
      return res.json({
        explanation: `Phân tích lỗi: Mã nguồn gặp vấn đề khi chạy với đầu vào "${testInput || ''}". Dự kiến: "${expectedOutput || ''}", Thực tế: "${actualOutput || ''}". Hãy kiểm tra lại điều kiện và cách in kết quả.`,
        hints: [
          "Kiểm tra lại kiểu dữ liệu của biến (int, float, str).",
          "Chú ý khoảng trắng hoặc xuống dòng trong lệnh print().",
          "Xem lại luồng điều khiển và điều kiện lặp."
        ]
      });
    }

    const prompt = `Phân tích lỗi lập trình Python cho học sinh:
Bài học: ${lessonTitle}
Code của học sinh:
\`\`\`python
${code}
\`\`\`

Thông tin lỗi/Kết quả test:
- Lỗi runtime/syntax: ${errorMessage || 'Không có lỗi cú pháp, nhưng kết quả không khớp test case'}
- Đầu vào test: ${testInput || 'N/A'}
- Kết quả kỳ vọng: ${expectedOutput || 'N/A'}
- Kết quả thực tế: ${actualOutput || 'N/A'}

Hãy phân tích ngắn gọn:
1. Nguyên nhân vì sao code chưa đúng (ngắn gọn, dễ hiểu cho học sinh).
2. 3 bước gợi ý (Hint) từ dễ đến chi tiết để học sinh tự sửa. Tránh copy nguyên code đáp án.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        systemInstruction: "Bạn là giáo viên Tin học giỏi, giải thích lỗi code cho học sinh một cách dễ hiểu và đưa gợi ý hữu ích.",
        temperature: 0.5,
      }
    });

    res.json({
      analysis: response.text || "Hãy kiểm tra lại logic tính toán và định dạng đầu ra."
    });
  } catch (error: any) {
    console.error("Explain error:", error);
    res.status(500).json({ error: "Lỗi phân tích từ AI", details: error.message });
  }
});

export default app;
