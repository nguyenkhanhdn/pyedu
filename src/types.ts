export type UserRole = 'student' | 'teacher';

export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  avatar: string;
  role: UserRole;
  grade: string;
  school?: string;
  totalXp: number;
  weeklyXp: number;
  streakDays: number;
  lastActiveDate: string;
  badges: string[];
  completedLessons: string[]; // List of lesson IDs solved
  dailyGoal: number; // minutes per day
  reminderTime: string; // e.g. "19:30"
  reminderEnabled: boolean;
}

export interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
  isHidden: boolean;
  explanation?: string;
}

export interface LessonExample {
  title: string;
  explanation: string;
  code: string;
  output?: string;
}

export interface InteractiveChallenge {
  prompt: string;
  initialCode: string;
  expectedKeywords?: string[];
  hint: string;
}

export interface MultipleChoiceQuiz {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface LessonTheory {
  summary: string;
  keyPoints: string[];
  conceptIllustration: {
    type: 'flow' | 'syntax' | 'memory' | 'comparison' | 'variables' | 'branching' | 'loops' | 'strings' | string;
    title: string;
    description: string;
    visualData: any;
  };
  examples: LessonExample[];
  interactiveChallenge?: InteractiveChallenge;
  multipleChoice?: MultipleChoiceQuiz;
}

export interface LessonPractice {
  id?: string;
  title: string;
  difficulty: 'Cơ bản' | 'Trung bình' | 'Nâng cao';
  problemStatement: string;
  inputFormat: string;
  outputFormat: string;
  constraints: string;
  sampleCases: {
    input: string;
    output: string;
    explanation: string;
  }[];
  starterCode: string;
  testCases: TestCase[];
  hints: string[];
  solutionExplanation?: string;
}

export interface Lesson {
  id: string;
  moduleId: string;
  moduleTitle: string;
  order: number;
  title: string;
  description: string;
  durationMin: number;
  xpReward: number;
  theory: LessonTheory;
  practice: LessonPractice;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  iconName: string;
  order: number;
  color: string;
  lessons: Lesson[];
}

export interface TestResultDetail {
  testId: string;
  input: string;
  expectedOutput: string;
  actualOutput: string;
  passed: boolean;
  isHidden: boolean;
  errorMessage?: string;
  executionTimeMs: number;
}

export interface SubmissionResult {
  lessonId: string;
  passed: boolean;
  score: number; // 0 to 100
  totalTests: number;
  passedTests: number;
  runtimeMs: number;
  testResults: TestResultDetail[];
  timestamp: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'starter' | 'streak' | 'mastery' | 'accuracy' | 'social' | 'algorithm';
  unlockedAt?: string;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  fullName: string;
  username: string;
  avatar: string;
  grade: string;
  totalXp: number;
  weeklyXp: number;
  streakDays: number;
  badgesCount: number;
  solvedCount: number;
  isCurrentUser?: boolean;
}

export interface GroupMessage {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  userRole: UserRole;
  timestamp: string;
  content: string;
  codeSnippet?: string;
  likes: number;
  isLiked?: boolean;
}

export interface StudyGroup {
  id: string;
  name: string;
  description: string;
  category: string;
  memberCount: number;
  isJoined: boolean;
  teacherName: string;
  avatar: string;
  pinnedPost?: {
    title: string;
    content: string;
    author: string;
    date: string;
  };
  messages: GroupMessage[];
}

export interface PersonalNote {
  id: string;
  lessonId?: string;
  lessonTitle?: string;
  title: string;
  content: string;
  codeSnippet?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'streak' | 'badge' | 'reminder' | 'contest' | 'group' | 'system';
  timestamp: string;
  read: boolean;
  linkTab?: string;
}

export interface AIChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}
