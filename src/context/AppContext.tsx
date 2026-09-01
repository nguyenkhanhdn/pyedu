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
  AIChatMessage
} from "../types";
import { CURRICULUM_MODULES, BADGES_DATA, INITIAL_LEADERBOARD, INITIAL_STUDY_GROUPS, OFFLINE_HANDBOOK_TOPICS } from "../data/curriculum";
import confetti from "canvas-confetti";

interface AppContextType {
  currentUser: User | null;
  allUsers: User[];
  login: (usernameOrEmail: string) => Promise<boolean>;
  register: (userData: { username: string; email: string; fullName: string; grade: string; role: 'student' | 'teacher'; school?: string; password?: string }) => Promise<boolean>;
  logout: () => void;
  updateUserProfile: (updates: Partial<User>) => Promise<void>;

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
  activeTab: 'learn' | 'leaderboard' | 'groups' | 'notes' | 'handbook' | 'profile';
  setActiveTab: (tab: 'learn' | 'leaderboard' | 'groups' | 'notes' | 'handbook' | 'profile') => void;
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
  const [activeTab, setActiveTab] = useState<'learn' | 'leaderboard' | 'groups' | 'notes' | 'handbook' | 'profile'>('learn');

  // 2. Selected Lesson State
  const [selectedLesson, setSelectedLesson] = useState<Lesson>(CURRICULUM_MODULES[0].lessons[0]);

  // 3. User code per lesson
  const [userCodes, setUserCodes] = useState<Record<string, string>>({});

  // 4. Submissions per lesson
  const [lessonSubmissions, setLessonSubmissions] = useState<Record<string, SubmissionResult[]>>({});

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

  // Helper to load user's full SQLite data
  const loadUserDataFromSqlite = async (user: User) => {
    try {
      const res = await fetch(`/api/user/${user.id}/data`);
      if (res.ok) {
        const data = await res.json();
        if (data.user) {
          setCurrentUser(data.user);
          localStorage.setItem("pyedu_current_user", JSON.stringify(data.user));
        }
        if (data.codes) {
          setUserCodes(data.codes);
        }
        if (data.submissions) {
          // Group submissions by lessonId
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
      }
    } catch (e) {
      console.warn("Failed to load user SQLite data:", e);
    }
  };

  // Initial load of users & groups from SQLite
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [usersRes, groupsRes] = await Promise.all([
          fetch("/api/auth/users"),
          fetch(`/api/groups${currentUser ? `?userId=${currentUser.id}` : ''}`)
        ]);

        if (usersRes.ok) {
          const usersData = await usersRes.json();
          if (usersData.users) {
            setAllUsers(usersData.users);
          }
        }

        if (groupsRes.ok) {
          const groupsData = await groupsRes.json();
          if (groupsData.groups && groupsData.groups.length > 0) {
            setStudyGroups(groupsData.groups);
          }
        }

        if (currentUser) {
          await loadUserDataFromSqlite(currentUser);
        }
      } catch (err) {
        console.error("Initial load error:", err);
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

    // Flatten all lessons in order
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
      // Sync to SQLite in background
      fetch(`/api/user/${currentUser.id}/code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonId, code })
      }).catch(err => console.error("Sync code error:", err));
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
      // Record submission and update progress & XP in SQLite
      const res = await fetch(`/api/user/${currentUser.id}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lessonId,
          passed: result.passed,
          score: result.score,
          totalTests: result.totalTests,
          passedTests: result.passedTests,
          runtimeMs: result.runtimeMs,
          testResults: result.testResults,
          xpReward: xpEarned
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.user) {
          setCurrentUser(data.user);
          setAllUsers(prev => prev.map(u => u.id === data.user.id ? data.user : u));
        }
      }
    } catch (e) {
      console.error("Submit recording error:", e);
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
  };

  const markNotificationAsRead = async (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    try {
      await fetch(`/api/notifications/${id}/read`, { method: "PUT" });
    } catch (e) {
      console.error(e);
    }
  };

  const clearAllNotifications = async () => {
    setNotifications([]);
    if (currentUser) {
      try {
        await fetch(`/api/notifications/${currentUser.id}`, { method: "DELETE" });
      } catch (e) {
        console.error(e);
      }
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

  // Login via SQLite
  const login = async (usernameOrEmail: string): Promise<boolean> => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usernameOrEmail })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.user) {
          setCurrentUser(data.user);
          await loadUserDataFromSqlite(data.user);
          // Refresh all users for leaderboards
          const allRes = await fetch("/api/auth/users");
          if (allRes.ok) {
            const allData = await allRes.json();
            setAllUsers(allData.users);
          }
          return true;
        }
      }
      return false;
    } catch (err) {
      console.error("Login API error:", err);
      return false;
    }
  };

  // Register via SQLite
  const register = async (userData: {
    username: string;
    email: string;
    fullName: string;
    grade: string;
    role: 'student' | 'teacher';
    school?: string;
    password?: string;
  }): Promise<boolean> => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
      });

      if (res.ok) {
        const data = await res.json();
        if (data.user) {
          setCurrentUser(data.user);
          await loadUserDataFromSqlite(data.user);
          // Refresh all users
          const allRes = await fetch("/api/auth/users");
          if (allRes.ok) {
            const allData = await allRes.json();
            setAllUsers(allData.users);
          }
          return true;
        }
      }
      return false;
    } catch (err) {
      console.error("Register API error:", err);
      return false;
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
      await fetch(`/api/user/${currentUser.id}/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates)
      });
    } catch (e) {
      console.error("Update profile API error:", e);
    }
  };

  // Study group interactions with SQLite
  const joinGroup = async (groupId: string) => {
    if (!currentUser) return;
    setStudyGroups(prev => prev.map(g => g.id === groupId ? { ...g, isJoined: true, memberCount: g.memberCount + 1 } : g));
    try {
      await fetch(`/api/groups/${groupId}/join`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: currentUser.id })
      });
    } catch (e) {
      console.error("Join group error:", e);
    }
  };

  const leaveGroup = async (groupId: string) => {
    if (!currentUser) return;
    setStudyGroups(prev => prev.map(g => g.id === groupId ? { ...g, isJoined: false, memberCount: Math.max(1, g.memberCount - 1) } : g));
    try {
      await fetch(`/api/groups/${groupId}/leave`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: currentUser.id })
      });
    } catch (e) {
      console.error("Leave group error:", e);
    }
  };

  const sendMessageToGroup = async (groupId: string, content: string, codeSnippet?: string) => {
    if (!currentUser) return;
    const optimisticMsg = {
      id: `msg-${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.fullName,
      userAvatar: currentUser.avatar,
      userRole: currentUser.role,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      content,
      codeSnippet,
      likes: 0,
      isLiked: false,
    };
    setStudyGroups(prev => prev.map(g => g.id === groupId ? { ...g, messages: [...g.messages, optimisticMsg] } : g));

    try {
      const res = await fetch(`/api/groups/${groupId}/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: currentUser.id,
          userName: currentUser.fullName,
          userAvatar: currentUser.avatar,
          userRole: currentUser.role,
          content,
          codeSnippet
        })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.message) {
          setStudyGroups(prev => prev.map(g => g.id === groupId ? {
            ...g,
            messages: g.messages.map(m => m.id === optimisticMsg.id ? data.message : m)
          } : g));
        }
      }
    } catch (e) {
      console.error("Send message error:", e);
    }
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

    try {
      await fetch(`/api/groups/${groupId}/message/${messageId}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: currentUser.id })
      });
    } catch (e) {
      console.error("Like message error:", e);
    }
  };

  // Notes with SQLite
  const addNote = async (note: Omit<PersonalNote, "id" | "createdAt" | "updatedAt">) => {
    if (!currentUser) return;
    const optimisticNote: PersonalNote = {
      id: `note-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...note
    };
    setPersonalNotes(prev => [optimisticNote, ...prev]);

    try {
      const res = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: currentUser.id,
          ...note
        })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.note) {
          setPersonalNotes(prev => prev.map(n => n.id === optimisticNote.id ? data.note : n));
        }
      }
    } catch (e) {
      console.error("Add note error:", e);
    }
  };

  const updateNote = async (id: string, updates: Partial<PersonalNote>) => {
    setPersonalNotes(prev => prev.map(n => n.id === id ? { ...n, ...updates, updatedAt: new Date().toISOString() } : n));
    try {
      await fetch(`/api/notes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates)
      });
    } catch (e) {
      console.error("Update note error:", e);
    }
  };

  const deleteNote = async (id: string) => {
    setPersonalNotes(prev => prev.filter(n => n.id !== id));
    try {
      await fetch(`/api/notes/${id}`, { method: "DELETE" });
    } catch (e) {
      console.error("Delete note error:", e);
    }
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

      const data = await response.json();
      const replyText = data.response || "Thầy đã nhận được câu hỏi. Em hãy thử kiểm tra lại cú pháp và cách đặt tên biến nhé!";

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
      console.error("AI chat error:", err);
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

  // Compute dynamic leaderboards from allUsers in SQLite
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
