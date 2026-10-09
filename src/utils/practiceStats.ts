import { User } from "../types";

/** Một lượt nộp bài (bài học hoặc luyện giải đề thuật toán) của học sinh. */
export interface PracticeEvent {
  userId: string;
  kind: "lesson" | "algo";
  itemId: string;
  title?: string;
  /** Lượt nộp đạt: vượt qua toàn bộ test case. */
  ok: boolean;
  score: number;
  /** Thời điểm nộp (ms). */
  ts: number;
}

export interface DayStudentRow {
  user: User;
  attempts: number;
  passed: number;           // số lượt đạt
  distinctPassed: number;   // số bài đạt (không trùng)
  lessonAttempts: number;
  algoAttempts: number;
  avgScore: number;
}

export interface DayStat {
  key: string;              // yyyy-mm-dd (giờ địa phương)
  date: Date;
  attempts: number;
  passed: number;
  failed: number;
  distinctPassed: number;
  lessonAttempts: number;
  algoAttempts: number;
  activeStudents: number;
  rows: DayStudentRow[];
}

export const dayKey = (ms: number): string => {
  const d = new Date(ms);
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mm}-${dd}`;
};

/** Gộp các lượt nộp thành thống kê từng ngày trong `days` ngày gần nhất (kể cả ngày không ai luyện). */
export const buildDailyStats = (events: PracticeEvent[], students: User[], days: number): DayStat[] => {
  const byId = new Map(students.map((s) => [s.id, s]));
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const out: DayStat[] = [];
  const index = new Map<string, DayStat>();
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const stat: DayStat = {
      key: dayKey(date.getTime()), date, attempts: 0, passed: 0, failed: 0, distinctPassed: 0,
      lessonAttempts: 0, algoAttempts: 0, activeStudents: 0, rows: [],
    };
    out.push(stat);
    index.set(stat.key, stat);
  }

  type Acc = { attempts: number; passed: number; passedItems: Set<string>; lesson: number; algo: number; scoreSum: number };
  const perDayUser = new Map<string, Map<string, Acc>>();
  for (const e of events) {
    const user = byId.get(e.userId);
    if (!user) continue;
    const key = dayKey(e.ts);
    const stat = index.get(key);
    if (!stat) continue;
    let users = perDayUser.get(key);
    if (!users) perDayUser.set(key, (users = new Map()));
    let a = users.get(e.userId);
    if (!a) users.set(e.userId, (a = { attempts: 0, passed: 0, passedItems: new Set(), lesson: 0, algo: 0, scoreSum: 0 }));
    a.attempts++;
    a.scoreSum += e.score || 0;
    if (e.kind === "lesson") a.lesson++;
    else a.algo++;
    if (e.ok) {
      a.passed++;
      a.passedItems.add(`${e.kind}:${e.itemId}`);
    }
  }

  for (const stat of out) {
    const users = perDayUser.get(stat.key);
    if (!users) continue;
    users.forEach((a, uid) => {
      stat.rows.push({
        user: byId.get(uid)!,
        attempts: a.attempts,
        passed: a.passed,
        distinctPassed: a.passedItems.size,
        lessonAttempts: a.lesson,
        algoAttempts: a.algo,
        avgScore: a.attempts ? Math.round(a.scoreSum / a.attempts) : 0,
      });
      stat.attempts += a.attempts;
      stat.passed += a.passed;
      stat.distinctPassed += a.passedItems.size;
      stat.lessonAttempts += a.lesson;
      stat.algoAttempts += a.algo;
    });
    stat.failed = stat.attempts - stat.passed;
    stat.activeStudents = stat.rows.length;
    stat.rows.sort((x, y) => y.distinctPassed - x.distinctPassed || y.attempts - x.attempts || x.user.fullName.localeCompare(y.user.fullName, "vi"));
  }
  return out;
};
