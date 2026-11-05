import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { REVIEW_SECTIONS } from "../src/data/reviewData";
import { CURRICULUM_MODULES, ALGORITHM_PROBLEMS } from "../src/data/curriculum";
import { appendReviewAttempt, emptyReviewState, gradeReviewAnswer, latestReviewAttempts, readReviewState, reviewReport, reviewSummary, saveReviewState, type ReviewAttempt } from "../src/utils/reviewPractice";
const solutions = JSON.parse(readFileSync(new URL("./review_reference_solutions.json", import.meta.url), "utf8"));
const all = REVIEW_SECTIONS.flatMap(s => s.exercises);
const run = (code: string, input = "") => {
  const result = spawnSync("python3", ["-c", code], { input, encoding: "utf8", timeout: 2000 });
  assert.equal(result.status, 0, result.stderr);
  return result.stdout.trim();
};

test("three independent sections have balanced new questions and programming applications", () => {
  assert.equal(REVIEW_SECTIONS.length, 3);
  assert.equal(new Set(all.map(e => e.id)).size, 24);
  const existingText: string[] = [];
  const visit = (value: unknown) => {
    if (typeof value === "string") existingText.push(value.trim().toLowerCase());
    else if (Array.isArray(value)) value.forEach(visit);
    else if (value && typeof value === "object") Object.values(value).forEach(visit);
  };
  visit(CURRICULUM_MODULES); visit(ALGORITHM_PROBLEMS);
  const existing = new Set(existingText);
  for (const s of REVIEW_SECTIONS) {
    assert.equal(s.exercises.filter(e => e.kind === "answer").length, 4);
    assert.equal(s.exercises.filter(e => e.kind === "code").length, 4);
    for (const e of s.exercises) {
      assert.ok(!existing.has(e.title.toLowerCase()), e.title);
      assert.ok(!existing.has(e.prompt.toLowerCase()), e.title);
      if (e.kind === "answer") assert.ok(!existing.has(e.snippet.toLowerCase()), e.title);
    }
  }
  assert.ok(!CURRICULUM_MODULES.flatMap(m => m.lessons).some(l => all.some(e => e.id === l.id)));
});

test("all short-answer keys agree with real Python and wrong answers are rejected", () => {
  for (const e of all) if (e.kind === "answer") {
    const actual = run(e.snippet);
    assert.equal(gradeReviewAnswer(e, actual).score, 100, e.title);
    assert.equal(gradeReviewAnswer(e, "wrong").score, 0, e.title);
    assert.equal(gradeReviewAnswer(e, `  ${actual}  `).score, 100, e.title);
  }
});

test("72+ sample/hidden boundary cases agree with independent Python reference solutions", () => {
  let count = 0;
  for (const e of all) if (e.kind === "code") {
    assert.ok(e.tests.length >= 6);
    assert.equal(e.tests.filter(t => !t.isHidden).length, 2);
    assert.ok(e.tests.some(t => t.isHidden));
    for (const t of e.tests) {
      assert.equal(run(solutions[e.id], t.input), t.expectedOutput.trim(), `${e.title}: ${t.input}`);
      count++;
    }
  }
  assert.ok(count >= 72);
});

const map = new Map<string, string>();
globalThis.localStorage = { getItem: (key: string) => map.get(key) || null, setItem: (key: string, value: string) => { map.set(key, value); }, removeItem: (key: string) => { map.delete(key); } } as unknown as Storage;
const attempt = (exerciseId: string, score = 100, day = 1): ReviewAttempt => ({ id: `attempt-${day}`, exerciseId, score, answer: "my answer", totalTests: 1, passedTests: score ? 1 : 0, timestamp: `2026-11-${String(day).padStart(2, "0")}T00:00:00Z` });

test("review drafts/results are scoped by user and do not write curriculum or XP storage", () => {
  const state = { drafts: { [all[0].id]: "draft" }, attempts: [attempt(all[0].id)] };
  assert.equal(saveReviewState("student-a", state), true);
  assert.deepEqual(readReviewState("student-a"), state);
  assert.deepEqual(readReviewState("student-b"), emptyReviewState());
  assert.ok([...map.keys()].every(key => key.startsWith("pyedu_review_v1:")));
  map.set("pyedu_review_v1:bad", "{bad json");
  assert.deepEqual(readReviewState("bad"), emptyReviewState());
  map.set("pyedu_review_v1:bad", JSON.stringify({ drafts: { unknown: "x", [all[0].id]: 123 }, attempts: [{ score: 100 }] }));
  assert.deepEqual(readReviewState("bad"), emptyReviewState());
});

test("latest attempt determines score and repeated attempts preserve other exercise results", () => {
  const attempts = [attempt(all[0].id), attempt(all[0].id, 0, 2)];
  assert.equal(latestReviewAttempts(attempts).get(all[0].id)?.score, 0);
  assert.equal(reviewSummary(REVIEW_SECTIONS[0].exercises, [attempt(all[0].id)]).score, 13);
  let rows = [attempt(all[1].id)];
  for (let i = 0; i < 500; i++) rows = appendReviewAttempt(rows, { ...attempt(all[0].id), id: String(i) });
  assert.equal(rows.length, 11);
  assert.ok(rows.find(a => a.exerciseId === all[1].id));
});

test("CSV contains all 24 tasks and neutralizes formulas in names and answers", () => {
  const csv = reviewReport({ fullName: '=HYPERLINK("bad")', username: "test", grade: "6" }, [{ ...attempt(all[0].id), answer: "+SUM(1,2)" }]);
  assert.ok(csv.startsWith("\uFEFF"));
  assert.ok(csv.includes('"\'=HYPERLINK(""bad"")"'));
  assert.ok(csv.includes('"\'+SUM(1,2)"'));
  assert.equal(csv.split("\r\n").length, 25);
  assert.ok(csv.includes("Chưa làm"));
});

import { startReviewGrading } from "../src/utils/reviewGrader";
class TestWorker {
  static instances: TestWorker[] = [];
  onmessage: (event: any) => void;
  onerror: () => void;
  terminated = false;
  constructor() { TestWorker.instances.push(this); }
  postMessage(_value: unknown) {}
  terminate() { this.terminated = true; }
  emit(value: unknown) { this.onmessage({ data: value }); }
}
(globalThis as any).Worker = TestWorker;
const cases = [{ id: "test", input: "", expectedOutput: "1", isHidden: false }];

test("grader cancels a running worker and reports infrastructure failure separately", async () => {
  const job = startReviewGrading("while True: pass", cases, () => {});
  const rejected = assert.rejects(job.result, /Đã dừng chấm/);
  job.cancel(); await rejected;
  assert.ok(TestWorker.instances.at(-1)!.terminated);
  const next = startReviewGrading("print(1)", cases, () => {});
  const error = assert.rejects(next.result, /Không tải được Python/);
  TestWorker.instances.at(-1)!.emit({ type: "error", message: "Không tải được Python" });
  await error;
  assert.ok(TestWorker.instances.at(-1)!.terminated);
});

test("Python loading and runtime deadlines terminate workers with distinct outcomes", async context => {
  context.mock.timers.enable({ apis: ["setTimeout"] });
  const loading = startReviewGrading("print(1)", cases, () => {});
  const loadError = assert.rejects(loading.result, error => error instanceof Error && !("code" in error) && /Tải Python quá lâu/.test(error.message));
  context.mock.timers.tick(60000); await loadError;
  const running = startReviewGrading("while True: pass", cases, () => {});
  const timeError = assert.rejects(running.result, error => error instanceof Error && "code" in error && error.code === "REVIEW_TIMEOUT");
  TestWorker.instances.at(-1)!.emit({ type: "ready" });
  context.mock.timers.tick(15000); await timeError;
  assert.ok(TestWorker.instances.at(-1)!.terminated);
});

test("successful worker results resolve and release worker resources", async () => {
  const job = startReviewGrading("print(1)", cases, () => {});
  const rows = [{ testId: "test", passed: true, actualOutput: "1", error: "" }];
  TestWorker.instances.at(-1)!.emit({ type: "result", results: rows });
  assert.deepEqual(await job.result, rows);
  assert.ok(TestWorker.instances.at(-1)!.terminated);
});
