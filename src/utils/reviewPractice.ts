import type { ReviewExercise } from "../data/reviewData";
import { REVIEW_SECTIONS, REVIEW_VERSION } from "../data/reviewData";

export interface ReviewAttempt {
  id: string; exerciseId: string; answer: string; score: number; passedTests: number;
  totalTests: number; timestamp: string;
}
export interface ReviewState { drafts: Record<string, string>; attempts: ReviewAttempt[]; }
export const emptyReviewState = (): ReviewState => ({ drafts: {}, attempts: [] });
const ids = new Set(REVIEW_SECTIONS.flatMap(s => s.exercises.map(e => e.id)));
const storageKey = (userId: string) => `pyedu_review_v${REVIEW_VERSION}:${userId}`;

export function readReviewState(userId: string): ReviewState {
  try {
    const raw = JSON.parse(localStorage.getItem(storageKey(userId)) || "null");
    if (!raw || typeof raw !== "object") return emptyReviewState();
    const drafts = Object.fromEntries(Object.entries(raw.drafts || {}).filter(([id, value]) => ids.has(id) && typeof value === "string"));
    const attempts = Array.isArray(raw.attempts) ? raw.attempts.filter((a: any) => a && ids.has(a.exerciseId) && typeof a.id === "string" && typeof a.answer === "string" && Number.isFinite(a.score) && a.score >= 0 && a.score <= 100 && Number.isFinite(Date.parse(a.timestamp)) && Number.isInteger(a.passedTests) && Number.isInteger(a.totalTests) && a.totalTests > 0 && a.passedTests >= 0 && a.passedTests <= a.totalTests) : [];
    return { drafts: drafts as Record<string, string>, attempts: attempts.slice(0, 240) };
  } catch { return emptyReviewState(); }
}
export function saveReviewState(userId: string, state: ReviewState): boolean {
  try { localStorage.setItem(storageKey(userId), JSON.stringify(state)); return true; }
  catch { return false; }
}
export function gradeReviewAnswer(exercise: Extract<ReviewExercise, { kind: "answer" }>, answer: string) {
  const normalize = (text: string) => text.trim().replace(/\s+/g, " ");
  const passed = exercise.answers.some(expected => normalize(expected) === normalize(answer));
  return { score: passed ? 100 : 0, passedTests: passed ? 1 : 0, totalTests: 1 };
}
export function appendReviewAttempt(attempts: ReviewAttempt[], attempt: ReviewAttempt): ReviewAttempt[] {
  let sameExercise = 0;
  return [attempt, ...attempts].filter(a => a.exerciseId !== attempt.exerciseId || ++sameExercise <= 10).slice(0, 240);
}
export function latestReviewAttempts(attempts: ReviewAttempt[]) {
  const latest = new Map<string, ReviewAttempt>();
  for (const attempt of attempts) {
    if (!latest.has(attempt.exerciseId) || Date.parse(attempt.timestamp) > Date.parse(latest.get(attempt.exerciseId)!.timestamp)) latest.set(attempt.exerciseId, attempt);
  }
  return latest;
}
export function reviewSummary(exercises: ReviewExercise[], attempts: ReviewAttempt[]) {
  const latest = latestReviewAttempts(attempts);
  const done = exercises.filter(e => latest.has(e.id));
  return { done: done.length, passed: done.filter(e => latest.get(e.id)!.score === 100).length,
    score: exercises.length ? Math.round(exercises.reduce((sum, e) => sum + (latest.get(e.id)?.score || 0), 0) / exercises.length) : 0 };
}
export function reviewReport(user: { fullName: string; username: string; grade?: string }, attempts: ReviewAttempt[]) {
  const latest = latestReviewAttempts(attempts);
  // Prefix formula-like values so student names/answers cannot become spreadsheet formulas.
  const csv = (value: unknown) => { const s = String(value ?? ""); return '"' + (/^[\s]*[=+\-@]/.test(s) ? "'" : "") + s.replaceAll('"', '""') + '"'; };
  return "\uFEFF" + [
    ["Họ tên", "Tài khoản", "Lớp", "Phần", "Bài", "Trạng thái", "Điểm /100", "Test đạt", "Tổng test", "Thời gian nộp (ISO)", "Bài làm"],
    ...REVIEW_SECTIONS.flatMap(s => s.exercises.map(e => { const a = latest.get(e.id); return [user.fullName, user.username, user.grade, s.title, e.title, a ? a.score === 100 ? "Đạt" : "Chưa đạt" : "Chưa làm", a?.score ?? "", a?.passedTests ?? "", a?.totalTests ?? "", a?.timestamp || "", a?.answer || ""]; })),
  ].map(row => row.map(csv).join(",")).join("\r\n");
}
