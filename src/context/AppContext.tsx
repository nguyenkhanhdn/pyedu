import React, { createContext, useContext, useState, useEffect } from "react";
import {
  User,
  Lesson,
  SubmissionResult,
  Badge,
  LeaderboardEntry,
  StudyGroup,
  PersonalNote,
  NotificationItem,
  AIChatMessage,
  AlgorithmProblem,
  AlgorithmSubmission,
  AlgorithmLeaderboardEntry,
  AlgorithmLevel
} from "../types";
import {
  CURRICULUM_MODULES,
  BADGES_DATA,
  INITIAL_STUDY_GROUPS,
  OFFLINE_HANDBOOK_TOPICS,
  ALGORITHM_PROBLEMS,
  INITIAL_ALGORITHM_LEADERBOARD
} from "../data/curriculum";
import { ApiService } from "../services/apiClient";
import confetti from "canvas-confetti";

interface AppContextType {
  currentUser: User | null;
  allUsers: User[];
  login: (usernameOrEmail: string, password?: string) => Promise<boolean>;
  register: (userData: { username: string; email: string; fullName: string; grade: string; role: 'student' | 'teacher' | 'admin'; school?: string; password?: string }) => Promise<boolean>;
  logout: () => void;
  updateUserProfile: (updates: Partial<User>) => Promise<void>;

  // Admin Management Actions
  adminCreateUser: (userData: { username: string; email: string; fullName: string; grade: string; role: 'student' | 'teacher' | 'admin'; school?: string; password?: string }) => Promise<boolean>;
  adminUpdateUser: (userId: string, updates: Partial<User> & { password?: string }) => Promise<boolean>;
  adminDeleteUser: (userId: string) => Promise<boolean>;
  adminResetUserProgress: (userId: string) => Promise<boolean>;
  adminBatchAddXp: (userIds: string[], xpAmount: number) => Promise<void>;

  // Curriculum & Progression
  modules: typeof CURRICULUM_MODULES;
  selectedLesson: Lesson;
  setSelectedLesson: (lesson: Lesson) => void;
  isLessonUnlocked: (lessonId: string) => boolean;
  isLessonCompleted: (lessonId: string) => boolean;
  getLessonProgressPercentage: () => number;
  teacherMode: boolean;
  setTeacherMode: (val: boolean) => void;

  // Code & Submissions
  userCodes: Record<string, string>;
  setUserCodeForLesson: (lessonId: string, code: string) => void;
  submitLessonCode: (lessonId: string, result: SubmissionResult) => Promise<void>;
  lessonSubmissions: Record<string, SubmissionResult[]>;

  // Algorithm / Problem Solving Module
  algorithmProblems: AlgorithmProblem[];
  algorithmSubmissions: AlgorithmSubmission[];
  solvedProblemIds: string[];
  submitAlgorithmProblem: (problemId: string, result: SubmissionResult, code: string) => Promise<void>;
  algorithmLeaderboard: AlgorithmLeaderboardEntry[];

  // Leaderboard
  leaderboard: LeaderboardEntry[];
  weeklyLeaderboard: LeaderboardEntry[];

  // Badges
  badges: Badge[];
  userBadges: Badge[];

  // Study Groups
  studyGroups: StudyGroup[];
  joinGroup: (groupId: string) => Promise<void>;
  leaveGroup: (groupId: string) => Promise<void>;
  sendMessageToGroup: (groupId: string, content: string, codeSnippet?: string) => Promise<void>;
  likeGroupMessage: (groupId: string, messageId: string) => Promise<void>;

  // Personal Notes
  personalNotes: PersonalNote[];
  addNote: (note: Omit<PersonalNote, "id" | "createdAt" | "updatedAt">) => Promise<void>;
  updateNote: (id: string, updates: Partial<PersonalNote>) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;

  // Notifications & Daily Reminders
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => Promise<void>;
  clearAllNotifications: () => Promise<void>;
  triggerDailyReminder: () => Promise<void>;

  // 24/7 AI Chatbot
  aiChatMessages: AIChatMessage[];
  sendAiMessage: (text: string, context?: any) => Promise<string>;
  isAiThinking: boolean;

  // Offline Docs
  handbookTopics: typeof OFFLINE_HANDBOOK_TOPICS;

  // Active View Tab
  activeTab: 'learn' | 'algorithms' | 'leaderboard' | 'groups' | 'notes' | 'handbook' | 'profile' | 'admin';
  setActiveTab: (tab: 'learn' | 'algorithms' | 'leaderboard' | 'groups' | 'notes' | 'handbook' | 'profile' | 'admin') => void;
  adminSection: 'users' | 'stats' | 'curriculum' | 'algorithms';
  setAdminSection: (sec: 'users' | 'stats' | 'curriculum' | 'algorithms') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. User State - initialized from local storage or null to require login
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("pyedu_current_user");
    return saved ? JSON.parse(saved) : null;
  });

  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [teacherMode, setTeacherMode] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'learn' | 'algorithms' | 'leaderboard' | 'groups' | 'notes' | 'handbook' | 'profile' | 'admin'>(() => {
    try {
      const saved = localStorage.getItem("pyedu_current_user");
      if (saved) {
        const u = JSON.parse(saved);
        if (u.role === 'admin') return 'admin';
      }
    } catch {}
    return 'learn';
  });
  const [adminSection, setAdminSection] = useState<'users' | 'stats' | 'curriculum' | 'algorithms'>('users');

  // 2. Selected Lesson State
  const [selectedLesson, setSelectedLesson] = useState<Lesson>(CURRICULUM_MODULES[0].lessons[0]);

  // 3. User code per lesson
  const [userCodes, setUserCodes] = useState<Record<string, string>>({});

  // 4. Submissions per lesson
  const [lessonSubmissions, setLessonSubmissions] = useState<Record<string, SubmissionResult[]>>({});

  // 4. Algorithm Problems & Submissions State
  const [algorithmProblems, setAlgorithmProblems] = useState<AlgorithmProblem[]>(ALGORITHM_PROBLEMS);
  const [algorithmSubmissions, setAlgorithmSubmissions] = useState<AlgorithmSubmission[]>(() => {
    const saved = localStorage.getItem("pyedu_algo_submissions");
    return saved ? JSON.parse(saved) : [];
  });

  // Unique solved algorithm problems
  const solvedProblemIds = Array.from(new Set(
    algorithmSubmissions.filter(s => s.passed).map(s => s.problemId)
  ));

  // 5. Notes
  const [personalNotes, setPersonalNotes] = useState<PersonalNote[]>([]);

  // 6. Study Groups
  const [studyGroups, setStudyGroups] = useState<StudyGroup[]>(INITIAL_STUDY_GROUPS);

  // 7. Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  // 8. AI Tutor Messages
  const [aiChatMessages, setAiChatMessages] = useState<AIChatMessage[]>([
    {
      id: "welcome-ai",
      role: "model",
      text: "Xin chào em! Thầy là Trợ lý AI Gia sư Python 24/7 của PyEdu 🤖. Thầy luôn sẵn sàng giải thích cú pháp, hướng dẫn tư duy giải bài tập hoặc gỡ lỗi code (debugging) từng bước cho em. Em có thắc mắc gì về bài học không?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [isAiThinking, setIsAiThinking] = useState(false);

  // Helper to load user's full SQLite / persistent data
  const loadUserData = async (user: User) => {
    try {
      const data = await ApiService.loadUserData(user.id);
      if (data.user) {
        setCurrentUser(data.user);
        localStorage.setItem("pyedu_current_user", JSON.stringify(data.user));
      }
      if (data.codes) {
        setUserCodes(data.codes);
      }
      if (data.submissions) {
        const grouped: Record<string, SubmissionResult[]> = {};
        data.submissions.forEach((sub: SubmissionResult) => {
          if (!grouped[sub.lessonId]) grouped[sub.lessonId] = [];
          grouped[sub.lessonId].push(sub);
        });
        setLessonSubmissions(grouped);
      }
      if (data.notes) {
        setPersonalNotes(data.notes);
      }
      if (data.groups && data.groups.length > 0) {
        setStudyGroups(data.groups);
      }
      if (data.notifications) {
        setNotifications(data.notifications);
      }

      // Also load algorithm submissions for user
      const algoSubs = await ApiService.fetchAlgorithmSubmissions(user.id);
      if (algoSubs && algoSubs.length > 0) {
        setAlgorithmSubmissions(algoSubs);
        try {
          localStorage.setItem("pyedu_algo_submissions", JSON.stringify(algoSubs));
        } catch {}
      }
    } catch (e) {
      console.warn("Notice: loadUserData handled safely:", e);
    }
  };

  // Initial load of users, problems & groups
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [users, groups, problems] = await Promise.all([
          ApiService.fetchUsers(),
          ApiService.fetchGroups(currentUser?.id),
          ApiService.fetchAlgorithmProblems()
        ]);

        if (users && users.length > 0) {
          setAllUsers(users);
        }

        if (groups && groups.length > 0) {
          setStudyGroups(groups);
        }

        if (problems && problems.length > 0) {
          setAlgorithmProblems(problems);
        }

        if (currentUser) {
          await loadUserData(currentUser);
        }
      } catch (err) {
        console.warn("Initial load notice:", err);
      }
    };

    fetchInitialData();
  }, []);

  // Sync Current User changes to LocalStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("pyedu_current_user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("pyedu_current_user");
    }
  }, [currentUser]);

  // Unlock check logic:
  const isLessonUnlocked = (lessonId: string): boolean => {
    if (teacherMode || currentUser?.role === 'teacher') return true;

    const allLessons = CURRICULUM_MODULES.flatMap(m => m.lessons);
    const index = allLessons.findIndex(l => l.id === lessonId);
    if (index <= 0) return true; // Lesson 1 is always unlocked

    const previousLesson = allLessons[index - 1];
    return currentUser?.completedLessons.includes(previousLesson.id) ?? false;
  };

  const isLessonCompleted = (lessonId: string): boolean => {
    return currentUser?.completedLessons.includes(lessonId) ?? false;
  };

  const getLessonProgressPercentage = (): number => {
    const allLessons = CURRICULUM_MODULES.flatMap(m => m.lessons);
    if (!currentUser || allLessons.length === 0) return 0;
    const completedCount = allLessons.filter(l => currentUser.completedLessons.includes(l.id)).length;
    return Math.round((completedCount / allLessons.length) * 100);
  };

  const setUserCodeForLesson = (lessonId: string, code: string) => {
    setUserCodes(prev => ({ ...prev, [lessonId]: code }));
    if (currentUser) {
      ApiService.saveCode(currentUser.id, lessonId, code).catch(() => {});
    }
  };

  const submitLessonCode = async (lessonId: string, result: SubmissionResult) => {
    // Update local state immediately
    setLessonSubmissions(prev => ({
      ...prev,
      [lessonId]: [result, ...(prev[lessonId] || [])]
    }));

    if (!currentUser) return;

    const allLessons = CURRICULUM_MODULES.flatMap(m => m.lessons);
    const lessonObj = allLessons.find(l => l.id === lessonId);
    const xpEarned = lessonObj?.xpReward || 50;

    if (result.passed) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // ignore in iframe
      }
    }

    try {
      const updatedUser = await ApiService.recordSubmission(currentUser.id, {
        lessonId,
        passed: result.passed,
        score: result.score,
        totalTests: result.totalTests,
        passedTests: result.passedTests,
        runtimeMs: result.runtimeMs,
        testResults: result.testResults,
        xpReward: xpEarned
      });

      if (updatedUser) {
        setCurrentUser(updatedUser);
        setAllUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
      }
    } catch (e) {
      console.warn("Submit recording notice:", e);
    }
  };

  // Submit Algorithm Problem Solution Handler
  const submitAlgorithmProblem = async (problemId: string, result: SubmissionResult, code: string) => {
    const problem = ALGORITHM_PROBLEMS.find(p => p.id === problemId);
    const probTitle = problem?.title || problemId;
    const probLevel: AlgorithmLevel = problem?.level || 'primary';
    const probPoints = problem?.points || 40;

    const newSub: AlgorithmSubmission = {
      id: `algo-sub-${Date.now()}`,
      problemId,
      problemTitle: probTitle,
      level: probLevel,
      code,
      score: result.score,
      passed: result.passed,
      passedTests: result.passedTests,
      totalTests: result.totalTests,
      runtimeMs: result.runtimeMs,
      testResults: result.testResults,
      timestamp: new Date().toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' })
    };

    const updatedSubmissions = [newSub, ...algorithmSubmissions];
    setAlgorithmSubmissions(updatedSubmissions);
    try {
      localStorage.setItem("pyedu_algo_submissions", JSON.stringify(updatedSubmissions));
    } catch (e) {
      console.warn("Could not save to localStorage:", e);
    }

    if (currentUser) {
      ApiService.recordAlgorithmSubmission(currentUser.id, newSub).catch(() => {});
    }

    if (result.passed) {
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // ignore in iframe
      }

      // Check if user has already solved this problem before
      const alreadySolved = algorithmSubmissions.some(s => s.problemId === problemId && s.passed);

      if (currentUser && !alreadySolved) {
        const updatedTotalXp = (currentUser.totalXp || 0) + probPoints;
        const updatedWeeklyXp = (currentUser.weeklyXp || 0) + probPoints;
        const updatedUser = {
          ...currentUser,
          totalXp: updatedTotalXp,
          weeklyXp: updatedWeeklyXp
        };
        setCurrentUser(updatedUser);
        localStorage.setItem("pyedu_current_user", JSON.stringify(updatedUser));
        setAllUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));

        // Update server profile
        ApiService.updateProfile(currentUser.id, {
          totalXp: updatedTotalXp,
          weeklyXp: updatedWeeklyXp
        }).catch(() => {});

        addNotification({
          title: `🏆 Đã giải xong: ${probTitle}`,
          message: `Tuyệt vời! Bạn đã vượt qua 100% test cases của bài toán "${probTitle}" (${probLevel === 'primary' ? 'Tiểu học' : 'THCS'}) và nhận được +${probPoints} XP!`,
          type: "contest",
          linkTab: "algorithms"
        });
      }
    }
  };

  const addNotification = async (item: Omit<NotificationItem, "id" | "timestamp" | "read">) => {
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      timestamp: "Vừa xong",
      read: false,
      ...item
    };
    setNotifications(prev => [newNotif, ...prev]);

    if (currentUser) {
      ApiService.addNotification(currentUser.id, item).catch(() => {});
    }
  };

  const markNotificationAsRead = async (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    if (currentUser) {
      await ApiService.markNotificationRead(currentUser.id, id);
    }
  };

  const clearAllNotifications = async () => {
    setNotifications([]);
    if (currentUser) {
      await ApiService.clearNotifications(currentUser.id);
    }
  };

  const triggerDailyReminder = async () => {
    addNotification({
      title: "⏰ Nhắc nhở học tập hàng ngày!",
      message: `Đã đến giờ luyện code theo mục tiêu ${currentUser?.dailyGoal || 20} phút/ngày của bạn. Hãy mở một bài tập để giữ vững ngọn lửa Streak nhé! 🔥`,
      type: "reminder",
      linkTab: "learn"
    });
  };

  // Login via Supabase Direct / Auth
  const login = async (usernameOrEmail: string, password?: string): Promise<boolean> => {
    try {
      const user = await ApiService.login(usernameOrEmail, password);
      if (user) {
        setCurrentUser(user);
        if (user.role === 'admin') {
          setActiveTab('admin');
          setAdminSection('users');
        }
        await loadUserData(user);
        const users = await ApiService.fetchUsers();
        setAllUsers(users);
        return true;
      }
      return false;
    } catch (err) {
      console.warn("Login notice:", err);
      return false;
    }
  };

  // Register via API / SQLite
  const register = async (userData: {
    username: string;
    email: string;
    fullName: string;
    grade: string;
    role: 'student' | 'teacher' | 'admin';
    school?: string;
    password?: string;
  }): Promise<boolean> => {
    try {
      const user = await ApiService.register(userData);
      if (user) {
        setCurrentUser(user);
        await loadUserData(user);
        const users = await ApiService.fetchUsers();
        setAllUsers(users);
        return true;
      }
      return false;
    } catch (err) {
      console.warn("Register notice:", err);
      return false;
    }
  };

  // Admin User Management Handlers
  const adminCreateUser = async (userData: {
    username: string;
    email: string;
    fullName: string;
    grade: string;
    role: 'student' | 'teacher' | 'admin';
    school?: string;
    password?: string;
  }): Promise<boolean> => {
    try {
      const user = await ApiService.register(userData);
      if (user) {
        const users = await ApiService.fetchUsers();
        setAllUsers(users);
        return true;
      }
      return false;
    } catch (e) {
      console.error("Admin create user error:", e);
      return false;
    }
  };

  const adminUpdateUser = async (userId: string, updates: Partial<User> & { password?: string }): Promise<boolean> => {
    try {
      const updated = await ApiService.adminUpdateUser(userId, updates);
      if (updated) {
        setAllUsers(prev => prev.map(u => u.id === userId ? { ...u, ...updates } : u));
        if (currentUser && currentUser.id === userId) {
          setCurrentUser({ ...currentUser, ...updates });
        }
        return true;
      }
      return false;
    } catch (e) {
      console.error("Admin update user error:", e);
      return false;
    }
  };

  const adminDeleteUser = async (userId: string): Promise<boolean> => {
    try {
      const success = await ApiService.adminDeleteUser(userId);
      if (success) {
        setAllUsers(prev => prev.filter(u => u.id !== userId));
        return true;
      }
      return false;
    } catch (e) {
      console.error("Admin delete user error:", e);
      return false;
    }
  };

  const adminResetUserProgress = async (userId: string): Promise<boolean> => {
    try {
      const updated = await ApiService.adminResetUserProgress(userId);
      if (updated) {
        setAllUsers(prev => prev.map(u => u.id === userId ? updated : u));
        if (currentUser && currentUser.id === userId) {
          setCurrentUser(updated);
          setUserCodes({});
          setLessonSubmissions({});
        }
        return true;
      }
      return false;
    } catch (e) {
      console.error("Admin reset user progress error:", e);
      return false;
    }
  };

  const adminBatchAddXp = async (userIds: string[], xpAmount: number): Promise<void> => {
    try {
      await ApiService.adminBatchAddXp(userIds, xpAmount);
      setAllUsers(prev => prev.map(u => {
        if (userIds.includes(u.id)) {
          return {
            ...u,
            totalXp: u.totalXp + xpAmount,
            weeklyXp: u.weeklyXp + xpAmount
          };
        }
        return u;
      }));
      if (currentUser && userIds.includes(currentUser.id)) {
        setCurrentUser(prev => prev ? {
          ...prev,
          totalXp: prev.totalXp + xpAmount,
          weeklyXp: prev.weeklyXp + xpAmount
        } : null);
      }
    } catch (e) {
      console.error("Admin batch add XP error:", e);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("pyedu_current_user");
    setUserCodes({});
    setLessonSubmissions({});
    setPersonalNotes([]);
    setNotifications([]);
  };

  const updateUserProfile = async (updates: Partial<User>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updates };
    setCurrentUser(updated);
    setAllUsers(prev => prev.map(u => u.id === updated.id ? updated : u));

    try {
      await ApiService.updateProfile(currentUser.id, updates);
    } catch (e) {
      console.warn("Update profile notice:", e);
    }
  };

  // Study group interactions
  const joinGroup = async (groupId: string) => {
    if (!currentUser) return;
    setStudyGroups(prev => prev.map(g => g.id === groupId ? { ...g, isJoined: true, memberCount: g.memberCount + 1 } : g));
    await ApiService.joinGroup(groupId, currentUser.id);
  };

  const leaveGroup = async (groupId: string) => {
    if (!currentUser) return;
    setStudyGroups(prev => prev.map(g => g.id === groupId ? { ...g, isJoined: false, memberCount: Math.max(1, g.memberCount - 1) } : g));
    await ApiService.leaveGroup(groupId, currentUser.id);
  };

  const sendMessageToGroup = async (groupId: string, content: string, codeSnippet?: string) => {
    if (!currentUser) return;
    const msg = await ApiService.sendGroupMessage(groupId, {
      userId: currentUser.id,
      userName: currentUser.fullName,
      userAvatar: currentUser.avatar,
      userRole: currentUser.role,
      content,
      codeSnippet
    });
    setStudyGroups(prev => prev.map(g => g.id === groupId ? { ...g, messages: [...g.messages, msg] } : g));
  };

  const likeGroupMessage = async (groupId: string, messageId: string) => {
    if (!currentUser) return;
    setStudyGroups(prev => prev.map(g => {
      if (g.id !== groupId) return g;
      return {
        ...g,
        messages: g.messages.map(m => {
          if (m.id !== messageId) return m;
          const isLiked = !m.isLiked;
          return {
            ...m,
            isLiked,
            likes: isLiked ? m.likes + 1 : Math.max(0, m.likes - 1)
          };
        })
      };
    }));
    await ApiService.likeGroupMessage(groupId, messageId, currentUser.id);
  };

  // Notes with SQLite
  const addNote = async (note: Omit<PersonalNote, "id" | "createdAt" | "updatedAt">) => {
    if (!currentUser) return;
    const newNote = await ApiService.addNote({
      userId: currentUser.id,
      ...note
    });
    setPersonalNotes(prev => [newNote, ...prev]);
  };

  const updateNote = async (id: string, updates: Partial<PersonalNote>) => {
    if (!currentUser) return;
    setPersonalNotes(prev => prev.map(n => n.id === id ? { ...n, ...updates, updatedAt: new Date().toISOString() } : n));
    await ApiService.updateNote(currentUser.id, id, updates);
  };

  const deleteNote = async (id: string) => {
    if (!currentUser) return;
    setPersonalNotes(prev => prev.filter(n => n.id !== id));
    await ApiService.deleteNote(currentUser.id, id);
  };

  // 24/7 AI tutor handler
  const sendAiMessage = async (text: string, context?: any): Promise<string> => {
    const userMsg: AIChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setAiChatMessages(prev => [...prev, userMsg]);
    setIsAiThinking(true);

    try {
      const response = await fetch("/api/ai/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: aiChatMessages.map(m => ({ role: m.role, text: m.text })),
          context: {
            lessonTitle: selectedLesson.title,
            lessonObjective: selectedLesson.practice.problemStatement,
            currentCode: userCodes[selectedLesson.id] || selectedLesson.practice.starterCode,
            ...context
          }
        })
      });

      let replyText = "";
      if (response.ok) {
        const data = await response.json();
        replyText = data.response;
      }

      if (!replyText) {
        replyText = `Chào em! Thầy là AI Gia Sư Python. Với bài "${selectedLesson.title}", em hãy chú ý:
1. Đọc kỹ định dạng đầu vào và đầu ra mong muốn.
2. Kiểm tra lại thụt dòng (indentation) và kiểu dữ liệu của biến.
3. Nếu cần gợi ý giải thuật từng bước, em cứ nhắn thầy nhé! 🚀`;
      }

      const aiReply: AIChatMessage = {
        id: `model-${Date.now()}`,
        role: 'model',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setAiChatMessages(prev => [...prev, aiReply]);
      setIsAiThinking(false);
      return replyText;
    } catch (err: any) {
      console.warn("AI chat fallback notice:", err);
      const fallbackReply: AIChatMessage = {
        id: `model-${Date.now()}`,
        role: 'model',
        text: `Chào em! Về bài học "${selectedLesson.title}", em hãy chú ý đọc kỹ các ràng buộc đề bài và kiểm tra lại cú pháp indent (thụt dòng). Nếu gặp khó khăn, hãy nhấn "Gợi ý" trong bài tập nhé!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setAiChatMessages(prev => [...prev, fallbackReply]);
      setIsAiThinking(false);
      return fallbackReply.text;
    }
  };

  // Compute dynamic leaderboards from allUsers
  const userListForLeaderboard = allUsers.length > 0 ? allUsers : (currentUser ? [currentUser] : []);

  // Sort by Total XP
  const leaderboard: LeaderboardEntry[] = [...userListForLeaderboard]
    .sort((a, b) => b.totalXp - a.totalXp)
    .map((u, idx) => ({
      rank: idx + 1,
      userId: u.id,
      fullName: u.fullName,
      username: u.username,
      avatar: u.avatar,
      grade: u.grade,
      totalXp: u.totalXp,
      weeklyXp: u.weeklyXp,
      streakDays: u.streakDays,
      badgesCount: u.badges.length,
      solvedCount: u.completedLessons.length,
      isCurrentUser: u.id === currentUser?.id
    }));

  // Sort by Weekly XP
  const weeklyLeaderboard: LeaderboardEntry[] = [...userListForLeaderboard]
    .sort((a, b) => b.weeklyXp - a.weeklyXp)
    .map((u, idx) => ({
      rank: idx + 1,
      userId: u.id,
      fullName: u.fullName,
      username: u.username,
      avatar: u.avatar,
      grade: u.grade,
      totalXp: u.totalXp,
      weeklyXp: u.weeklyXp,
      streakDays: u.streakDays,
      badgesCount: u.badges.length,
      solvedCount: u.completedLessons.length,
      isCurrentUser: u.id === currentUser?.id
    }));

  // Compute Algorithm Leaderboard
  const userPassedSubs = algorithmSubmissions.filter(s => s.passed);
  const userSolvedPrimary = Array.from(new Set(userPassedSubs.filter(s => s.level === 'primary').map(s => s.problemId))).length;
  const userSolvedSecondary = Array.from(new Set(userPassedSubs.filter(s => s.level === 'secondary').map(s => s.problemId))).length;
  const userSolvedTotal = userSolvedPrimary + userSolvedSecondary;

  // Calculate algorithm score: sum of points for each solved problem
  const userAlgoScore = Array.from(new Set(userPassedSubs.map(s => s.problemId)))
    .reduce<number>((acc: number, pId: string) => {
      const p = ALGORITHM_PROBLEMS.find(prob => prob.id === pId);
      return acc + (p?.points || 40);
    }, 0);

  const userAlgoAccuracy = algorithmSubmissions.length > 0
    ? Math.round((userPassedSubs.length / algorithmSubmissions.length) * 100)
    : 100;

  const currentUserAlgoEntry: AlgorithmLeaderboardEntry | null = currentUser ? {
    rank: 1,
    userId: currentUser.id,
    fullName: currentUser.fullName,
    username: currentUser.username,
    avatar: currentUser.avatar,
    grade: currentUser.grade,
    level: 'all',
    totalScore: userAlgoScore,
    solvedCount: userSolvedTotal,
    primarySolved: userSolvedPrimary,
    secondarySolved: userSolvedSecondary,
    accuracy: userAlgoAccuracy,
    isCurrentUser: true
  } : null;

  // Build dynamic algorithm leaderboard including all users from Supabase
  const rawAlgoList: AlgorithmLeaderboardEntry[] = userListForLeaderboard.map((u) => {
    if (currentUser && u.id === currentUser.id && currentUserAlgoEntry) {
      return currentUserAlgoEntry;
    }

    const estimatedScore = Math.round(u.totalXp * 0.8) || 50;
    const estimatedSolved = Math.max(1, Math.round(u.completedLessons.length * 1.5) || 2);
    const primarySolved = Math.min(estimatedSolved, Math.ceil(estimatedSolved * 0.6));
    const secondarySolved = Math.max(0, estimatedSolved - primarySolved);

    return {
      rank: 0,
      userId: u.id,
      fullName: u.fullName,
      username: u.username,
      avatar: u.avatar,
      grade: u.grade,
      level: 'all' as const,
      totalScore: estimatedScore,
      solvedCount: estimatedSolved,
      primarySolved,
      secondarySolved,
      accuracy: 85 + (u.totalXp % 15),
      isCurrentUser: u.id === currentUser?.id
    };
  });

  // Also merge any initial algorithm leaderboard entries if user list is small
  if (rawAlgoList.length < 5) {
    INITIAL_ALGORITHM_LEADERBOARD.forEach(initEntry => {
      if (!rawAlgoList.some(e => e.userId === initEntry.userId || e.username === initEntry.username)) {
        rawAlgoList.push(initEntry);
      }
    });
  }

  // Sort by totalScore desc, then solvedCount desc, then accuracy desc
  const algorithmLeaderboard: AlgorithmLeaderboardEntry[] = rawAlgoList
    .sort((a, b) => b.totalScore - a.totalScore || b.solvedCount - a.solvedCount || b.accuracy - a.accuracy)
    .map((entry, idx) => ({
      ...entry,
      rank: idx + 1
    }));

  const userBadges = BADGES_DATA.filter(b => currentUser?.badges.includes(b.id));

  return (
    <AppContext.Provider
      value={{
        currentUser,
        allUsers,
        login,
        register,
        logout,
        updateUserProfile,

        // Admin methods
        adminCreateUser,
        adminUpdateUser,
        adminDeleteUser,
        adminResetUserProgress,
        adminBatchAddXp,

        modules: CURRICULUM_MODULES,
        selectedLesson,
        setSelectedLesson,
        isLessonUnlocked,
        isLessonCompleted,
        getLessonProgressPercentage,
        teacherMode,
        setTeacherMode,

        userCodes,
        setUserCodeForLesson,
        submitLessonCode,
        lessonSubmissions,

        // Algorithm Problem Solving
        algorithmProblems: ALGORITHM_PROBLEMS,
        algorithmSubmissions,
        solvedProblemIds,
        submitAlgorithmProblem,
        algorithmLeaderboard,

        leaderboard,
        weeklyLeaderboard,

        badges: BADGES_DATA,
        userBadges,

        studyGroups,
        joinGroup,
        leaveGroup,
        sendMessageToGroup,
        likeGroupMessage,

        personalNotes,
        addNote,
        updateNote,
        deleteNote,

        notifications,
        markNotificationAsRead,
        clearAllNotifications,
        triggerDailyReminder,

        aiChatMessages,
        sendAiMessage,
        isAiThinking,

        handbookTopics: OFFLINE_HANDBOOK_TOPICS,

        activeTab,
        setActiveTab,
        adminSection,
        setAdminSection,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
