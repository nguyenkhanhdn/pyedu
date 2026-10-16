// Run: node --import tsx --test scripts/test_sample_solution.ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { chargeSampleSolution, sampleSolutionPenalty } from "../src/utils/sampleSolution";
import { CURRICULUM_MODULES } from "../src/data/curriculum";
import type { User } from "../src/types";

const student = (): User => ({ id: "test-student", role: "student", status: "active", totalXp: 150, weeklyXp: 30 } as User);

test("charges exactly double, including negative balances and repeat opens", async () => {
  let stored = student();
  const read = async () => ({ ...stored });
  const save = async (_before: User, after: User) => { stored = after; return true; };
  assert.equal((await chargeSampleSolution(50, read, save)).penalty, 100);
  assert.equal(stored.totalXp, 50);
  assert.equal(stored.weeklyXp, -70);
  await chargeSampleSolution(50, read, save);
  assert.equal(stored.totalXp, -50);
  assert.equal(stored.weeklyXp, -170);
});

test("teachers/admins do not write scores", async () => {
  for (const role of ["teacher", "admin"] as const) {
    const result = await chargeSampleSolution(50, async () => ({ ...student(), role }), async () => { assert.fail("Unexpected charge"); });
    assert.equal(result.penalty, 0);
    assert.equal(result.user.totalXp, 150);
  }
});

test("invalid rewards and inactive/unknown accounts are rejected before saving", async () => {
  for (const reward of [0, -1, NaN, Infinity, 1.5, Number.MAX_SAFE_INTEGER]) assert.throws(() => sampleSolutionPenalty(reward));
  for (const user of [null, { ...student(), status: "blocked" }, { ...student(), status: "pending" }, { ...student(), role: "deleted" }]) {
    await assert.rejects(chargeSampleSolution(50, async () => user as User, async () => { assert.fail("Unexpected charge"); }));
  }
});

test("simultaneous views deduct both penalties without losing updates", async () => {
  let stored = student();
  const read = async () => ({ ...stored });
  const save = async (before: User, after: User) => {
    if (stored.totalXp !== before.totalXp || stored.weeklyXp !== before.weeklyXp) return false;
    stored = after;
    return true;
  };
  await Promise.all([chargeSampleSolution(40, read, save), chargeSampleSolution(50, read, save)]);
  assert.equal(stored.totalXp, -30);
  assert.equal(stored.weeklyXp, -150);
});

test("network errors are surfaced without automatic recharging", async () => {
  let writes = 0;
  await assert.rejects(chargeSampleSolution(50, async () => student(), async () => { writes++; throw new Error("network"); }), /network/);
  assert.equal(writes, 1);
});

test("corrupt score values cannot be written back as NaN or unsafe numbers", async () => {
  for (const totalXp of [NaN, Infinity, -Number.MAX_SAFE_INTEGER]) {
    await assert.rejects(chargeSampleSolution(50, async () => ({ ...student(), totalXp }), async () => { assert.fail("Unexpected charge"); }), /không hợp lệ/);
  }
});

test("repeated conflicts fail instead of overwriting another session's XP", async () => {
  let writes = 0;
  await assert.rejects(chargeSampleSolution(50, async () => student(), async () => { writes++; return false; }), /phiên khác/);
  assert.equal(writes, 3);
});

test("all lesson samples pass their test cases; shared exercises start with TODOs", () => {
  let cases = 0;
  for (const module of CURRICULUM_MODULES) for (const lesson of module.lessons) {
    for (const practice of lesson.practices?.length ? lesson.practices : [lesson.practice]) {
      assert.ok(practice.sampleSolution?.trim(), `${lesson.id}/${practice.id}: missing sample`);
      if (/^(rn|vl)-/.test(practice.id || "")) assert.match(practice.starterCode, /TODO/);
      for (const tc of practice.testCases) {
        const actual = execFileSync("python3", ["-c", practice.sampleSolution!], { input: tc.input, encoding: "utf8", timeout: 5000 });
        assert.equal(actual.trim(), tc.expectedOutput.trim(), `${lesson.id}/${practice.id}/${tc.id}`);
        cases++;
      }
    }
  }
  assert.ok(cases >= 497);
});
