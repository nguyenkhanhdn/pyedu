import type { Module, User } from "../types";
import { newestActivities, type StudentActivity } from "./practiceStats";

export function buildTopicProgress(modules: Module[], students: User[], events: StudentActivity[]) {
  const topics = [...modules].sort((a, b) => a.order - b.order);
  const lessons = new Map(topics.flatMap(topic => topic.lessons.map(lesson => [lesson.id, { topic, lesson }] as const)));
  const byUser = new Map<string, StudentActivity[]>();
  for (const event of events) {
    if (event.kind !== "lesson") continue;
    const id = (event.practiceKey || event.itemId).replace(/_p\d+$/, "");
    if (!lessons.has(id)) continue;
    const list = byUser.get(event.userId) || [];
    list.push(event); byUser.set(event.userId, list);
  }
  return students.map(user => {
    const activity = newestActivities(byUser.get(user.id) || []);
    // Completion milestones, not a single passing practice, determine lesson completion.
    const completed = new Set(activity.filter(e => e.type === "completion").map(e => e.itemId));
    const latest = activity.find(event => event.ts > 0);
    const recentLesson = latest ? lessons.get((latest.practiceKey || latest.itemId).replace(/_p\d+$/, "")) : undefined;
    const next = topics.flatMap(topic => topic.lessons).find(lesson => !completed.has(lesson.id));
    const submissions = activity.filter(e => e.type === "submission");
    const last = submissions[0];
    let failedStreak = 0;
    const lastLessonId = last?.itemId.replace(/_p\d+$/, "");
    const completedAfterAttempt = last && activity.some(e => e.type === "completion" && e.itemId === lastLessonId && e.ts >= last.ts);
    if (last && !completedAfterAttempt) for (const event of submissions.filter(e => e.itemId === last.itemId)) {
      if (event.ok) break;
      failedStreak++;
    }
    const progress = topics.map(topic => ({
      topic,
      done: topic.lessons.filter(lesson => completed.has(lesson.id)).length,
      total: topic.lessons.length,
    }));
    return { user, progress, latest, recentLesson, next, failedStreak,
      done: progress.reduce((sum, p) => sum + p.done, 0),
      total: progress.reduce((sum, p) => sum + p.total, 0),
      needsHelp: failedStreak >= 3,
    };
  });
}
