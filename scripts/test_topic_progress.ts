import { test } from "node:test";
import assert from "node:assert/strict";
import { buildTopicProgress } from "../src/utils/topicProgress";
import { SupabaseService } from "../src/services/supabaseService";
import { ApiService } from "../src/services/apiClient";
import type { Module, User } from "../src/types";
import type { StudentActivity } from "../src/utils/practiceStats";

const modules = [
  { id: "m2", title: "Vòng lặp", order: 2, lessons: [{ id: "l3", moduleId: "m2", title: "For" }] },
  { id: "m1", title: "Biến", order: 1, lessons: [{ id: "l1", moduleId: "m1", title: "Biến 1" }, { id: "l2", moduleId: "m1", title: "Biến 2" }] },
] as Module[];
const user = { id: "s1", role: "student", fullName: "Học sinh", completedLessons: ["l2", "stale-deleted-lesson"] } as User;
const event = (id: string, itemId: string, ts: number, ok = false, type: "submission" | "completion" = "submission"): StudentActivity => ({ id, userId: user.id, kind: "lesson", itemId, ts, ok, type, score: ok ? 100 : 0 });

test("new student is not presented as online; next lesson follows curriculum order", () => {
  const row = buildTopicProgress(modules, [user], [event("unknown", "removed", 200)])[0];
  assert.equal(row.latest, undefined);
  assert.equal(row.next?.id, "l1");
  assert.equal(row.done, 0, "server progress must not use stale profile completion lists");
  assert.equal(row.needsHelp, false);
});

test("passing a practice is not a completed lesson; recent review is distinct from next lesson", () => {
  const events = [event("complete", "l1", 10, true, "completion"), event("later", "l3_p1", 30, true), event("review", "l1_p0", 50, true)];
  const row = buildTopicProgress(modules, [user], events)[0];
  assert.equal(row.recentLesson?.topic.id, "m1");
  assert.equal(row.next?.id, "l2");
  assert.equal(row.done, 1);
  assert.deepEqual(row.progress.map(p => [p.topic.id, p.done, p.total]), [["m1", 1, 2], ["m2", 0, 1]]);
});

test("support requires consecutive failures on the most recently submitted practice", () => {
  const events = [event("1", "l1_p0", 10), event("2", "l1_p0", 20), event("3", "l1_p0", 30)];
  assert.equal(buildTopicProgress(modules, [user], events)[0].needsHelp, true);
  events.push(event("4", "l1_p0", 40, true), event("5", "l1_p0", 50));
  assert.equal(buildTopicProgress(modules, [user], events)[0].failedStreak, 1);
  events.push(event("6", "l3_p0", 60));
  assert.equal(buildTopicProgress(modules, [user], events)[0].needsHelp, false);
});

test("later lesson completion clears old support alerts", () => {
  const events = [event("1", "l1_p0", 10), event("2", "l1_p0", 20), event("3", "l1_p0", 30), event("4", "l1", 40, true, "completion")];
  assert.equal(buildTopicProgress(modules, [user], events)[0].needsHelp, false);
});

test("duplicate/undated milestones count once, ignore other students and deleted lessons", () => {
  const events = [event("1", "l1", 0, true, "completion"), event("2", "l1", 0, true, "completion"), event("3", "removed", 40, true, "completion"), { ...event("4", "l2", 50, true, "completion"), userId: "other" }];
  assert.equal(buildTopicProgress(modules, [user], events)[0].done, 1);
  const complete = modules.flatMap(m => m.lessons.map(l => event(l.id, l.id, 1, true, "completion")));
  assert.equal(buildTopicProgress(modules, [user], complete)[0].next, undefined);
  assert.equal(buildTopicProgress([], [user], [])[0].total, 0);
});

globalThis.localStorage = { getItem: () => null, setItem: () => {}, removeItem: () => {} } as unknown as Storage;
let fail = false;
let requests: URL[] = [];
globalThis.fetch = async input => {
  const url = new URL(String(input)); requests.push(url);
  if (fail) return Response.json({ message: "read failure" }, { status: 403 });
  const offset = Number(url.searchParams.get("offset") || 0);
  const isProgress = url.pathname.endsWith("user_progress");
  const rows = Array.from({ length: 503 }, (_, i) => isProgress
    ? { user_id: "s1", lesson_id: i === 0 ? "l1" : `lesson-${i}`, completed_at: i === 0 ? null : "2026-11-01T00:00:00Z", score: 100 }
    : { id: `sub-${i}`, user_id: "s1", lesson_id: "l1", practice_key: "l1_p0", timestamp: "2026-11-01T00:00:00Z", passed: false, total_tests: 4, passed_tests: 2 });
  const page = rows.slice(offset, offset + 200);
  return new Response(JSON.stringify(page), { headers: { "Content-Type": "application/json", "Content-Range": `${offset}-${offset + page.length - 1}/${rows.length}` } });
};

test("class topic data reads all capped pages and preserves undated completions", async () => {
  const rows = await SupabaseService.getClassTopicActivities();
  assert.equal(rows.length, 1006);
  assert.ok(rows.some(row => row.type === "completion" && row.itemId === "l1" && row.ts === 0));
  assert.equal(requests.filter(url => url.searchParams.get("offset") === "400").length, 2);
  for (const url of requests) {
    assert.doesNotMatch(url.searchParams.get("select") || "", /code|test_results/);
    assert.equal(url.searchParams.get("timestamp"), null, "all-time progress must not expire after a statistics range");
  }
});

test("read failures are not mistaken for zero progress, student viewer is denied", async () => {
  fail = true;
  await assert.rejects(SupabaseService.getClassTopicActivities(), /Không tải được/);
  await assert.rejects(ApiService.fetchClassTopicActivities(user), /Chỉ giáo viên/);
  await assert.rejects(ApiService.fetchClassTopicActivities({ ...user, role: "teacher", status: "blocked" }), /Chỉ giáo viên/);
});
