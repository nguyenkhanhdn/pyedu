// Run: node --import tsx --test scripts/test_student_history.ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { newestActivities, parseActivityTime, submissionActivity, buildStudentStats } from "../src/utils/practiceStats";
import { SupabaseService } from "../src/services/supabaseService";
import { ApiService } from "../src/services/apiClient";
import type { User } from "../src/types";

globalThis.localStorage = { getItem: () => null, setItem: () => {}, removeItem: () => {} } as unknown as Storage;
const teacher = { id: "teacher", role: "teacher", status: "active" } as User;
const timestamp = new Date().toISOString();
const lessons = Array.from({ length: 502 }, (_, index) => ({ id: `sub-${index}`, user_id: "student", lesson_id: "t1-l1", practice_key: "t1-l1_p1", passed: false, score: 100, total_tests: 2, passed_tests: 2, runtime_ms: 10, timestamp }));
const algo = { ...lessons[0], id: "algo-1", problem_id: "rn-01", problem_title: "Test problem", score: 0, passed_tests: 0 };
let mode = "ok";
let posts: { table: string; body: any }[] = [];
let requests: URL[] = [];
globalThis.fetch = async (input, options) => {
  const url = new URL(String(input));
  requests.push(url);
  const table = url.pathname.split("/").at(-1)!;
  if (options?.method === "POST") {
    posts.push({ table, body: JSON.parse(String(options.body)) });
    if (mode === "write-error") return new Response(JSON.stringify({ message: "denied" }), { status: 403 });
    return new Response(null, { status: 201 });
  }
  const offset = Number(url.searchParams.get("offset") || 0);
  if (mode === "read-error" || (mode === "later-page-error" && offset > 0)) return new Response(JSON.stringify({ message: "read denied" }), { status: 403 });
  if (url.searchParams.get("select") === "code,test_results") {
    assert.equal(url.searchParams.get("user_id"), "eq.student");
    assert.equal(url.searchParams.get("id"), "eq.sub-0");
    return Response.json({ code: null, test_results: [{ testId: "test-1", passed: true }] });
  }
  if (table === "user_progress") return Response.json([{ lesson_id: "t1-l1", completed_at: timestamp, score: 100 }]);
  assert.match(url.searchParams.get("order") || "", /timestamp.desc,id.desc/);
  if (url.searchParams.has("user_id")) assert.equal(url.searchParams.get("user_id"), "eq.student");
  const all = table === "submissions" ? lessons : [algo];
  // Simulate a server row cap below the requested page size.
  const rows = all.slice(offset, offset + 200);
  return new Response(JSON.stringify(rows), { status: 200, headers: { "Content-Type": "application/json", "Content-Range": `${offset}-${offset + rows.length - 1}/${all.length}` } });
};

test("all pages are read, including under a lower server row cap", async () => {
  mode = "ok"; requests = [];
  const events = await SupabaseService.getPracticeEvents("2026-01-01T00:00:00Z");
  assert.equal(events.length, 503);
  assert.equal(events.filter(event => event.kind === "lesson").length, 502);
  assert.ok(events.find(event => event.id === "sub-0")?.ok, "old incomplete-lesson flag must not hide passing practice");
  assert.equal(events.find(event => event.id === "sub-0")?.practiceKey, "t1-l1_p1");
  assert.ok(requests.some(url => url.searchParams.get("offset") === "400"));
});

test("failed pages never appear as partial success or empty offline statistics", async () => {
  mode = "later-page-error";
  await assert.rejects(SupabaseService.getPracticeEvents(timestamp), /Không tải được/);
  mode = "read-error";
  await assert.rejects(ApiService.fetchPracticeEvents(30), /Không tải được/);
  mode = "ok";
});

test("per-student history includes completion milestones and newest-first submissions", async () => {
  const rows = await ApiService.fetchStudentHistory("student", teacher);
  assert.equal(rows.length, 504);
  assert.equal(rows.filter(row => row.type === "completion").length, 1);
  assert.ok(rows.every((row, index) => !index || rows[index - 1].ts >= row.ts));
  const old = { ...rows[0], ts: 0 };
  assert.equal(newestActivities([old, rows[0]])[1].ts, 0);
});

test("student access is refused; detail requests are scoped to student and submission", async () => {
  await assert.rejects(ApiService.fetchStudentHistory("student", { ...teacher, role: "student" }), /Chỉ giáo viên/);
  const detail = await ApiService.fetchStudentSubmissionDetail("student", "lesson", "sub-0", teacher);
  assert.equal(detail.code, null);
  assert.equal(detail.testResults.length, 1);
});

test("lesson saves preserve exercise/code/result without completing a whole lesson", async () => {
  posts = [];
  const saved = await SupabaseService.recordSubmission("student", { id: "snapshot", lessonId: "t1-l1", practiceKey: "t1-l1_p1", code: "print(1)", passed: true, score: 100, totalTests: 1, passedTests: 1, runtimeMs: 1, testResults: [], timestamp }, false);
  assert.equal(saved, true);
  assert.equal(posts.length, 1);
  assert.equal(posts[0].body.practice_key, "t1-l1_p1");
  assert.equal(posts[0].body.code, "print(1)");
  assert.equal(posts[0].body.passed, true);
});

test("submission write errors propagate instead of reporting synchronization success", async () => {
  mode = "write-error";
  await assert.rejects(ApiService.recordSubmission("student", { id: "snapshot", lessonId: "t1-l1", passed: false, score: 0, totalTests: 1, passedTests: 0, runtimeMs: 1, testResults: [], xpReward: 50 }), /chưa đồng bộ/);
  mode = "ok";
});

test("legacy Vietnamese dates parse and failed attempts remain in student stats", () => {
  assert.equal(parseActivityTime("09:15, 17/10/2026"), new Date(2026, 9, 17, 9, 15).getTime());
  assert.equal(submissionActivity({ ...algo, timestamp: "bad date" }, "algo"), null);
  const event = submissionActivity(algo, "algo")!;
  const [stat] = buildStudentStats([event], [{ id: "student" } as User], 7);
  assert.equal(stat.attempts, 1);
  assert.equal(stat.distinctPassed, 0);
});
