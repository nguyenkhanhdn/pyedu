// Run: node --import tsx --test scripts/test_sample_solution.ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import {
  SAMPLE_SOLUTION_DAILY_LIMIT,
  chargeSampleSolution,
  getSampleSolutionDateKey,
  getStudentSampleSolutionBlockReason,
  parseDailySampleUsage,
  sampleSolutionPenalty,
  serializeDailySampleUsage,
  type SampleSolutionQuotaStore,
} from "../src/utils/sampleSolution";
import { CURRICULUM_MODULES } from "../src/data/curriculum";
import type { User } from "../src/types";

const student = (overrides: Partial<User> = {}): User =>
  ({ id: "test-student", role: "student", status: "active", totalXp: 150, weeklyXp: 30, ...overrides } as User);

function createMemoryQuotaStore(initialRaw: string | null = null): SampleSolutionQuotaStore & { getRaw: () => string | null } {
  let raw = initialRaw;
  return {
    getRaw: () => raw,
    readUsage: async (dateKey) => ({ usage: parseDailySampleUsage(raw, dateKey), raw }),
    writeUsageIfUnchanged: async (prevRaw, nextUsage) => {
      if (raw !== prevRaw) return false;
      raw = serializeDailySampleUsage(nextUsage);
      return true;
    },
  };
}

test("charges double penalty while positive XP, then blocks further opens once totalXp <= 0", async () => {
  let stored = student({ totalXp: 150, weeklyXp: 30 });
  const quota = createMemoryQuotaStore();
  const read = async () => ({ ...stored });
  const save = async (_before: User, after: User) => { stored = after; return true; };
  const day = new Date(2026, 10, 17, 10, 0, 0);

  const first = await chargeSampleSolution(50, read, save, quota, day);
  assert.equal(first.penalty, 100);
  assert.equal(first.dailyUsage.count, 1);
  assert.equal(stored.totalXp, 50);
  assert.equal(stored.weeklyXp, -70);

  // Still positive (50 > 0), so one more view is permitted, pushing totalXp to -50
  const second = await chargeSampleSolution(50, read, save, quota, day);
  assert.equal(second.dailyUsage.count, 2);
  assert.equal(stored.totalXp, -50);
  assert.equal(stored.weeklyXp, -170);

  // Now totalXp <= 0: opening must be blocked and daily quota must NOT increment
  await assert.rejects(chargeSampleSolution(50, read, save, quota, day), /≤ 0/);
  assert.equal(stored.totalXp, -50);
  assert.equal(parseDailySampleUsage(quota.getRaw(), getSampleSolutionDateKey(day)).count, 2);

  // Exactly 0 XP is also blocked
  let zeroUser = student({ totalXp: 0, weeklyXp: 0 });
  const zeroQuota = createMemoryQuotaStore();
  await assert.rejects(
    chargeSampleSolution(25, async () => ({ ...zeroUser }), async (_b, a) => { zeroUser = a; return true; }, zeroQuota, day),
    /≤ 0/,
  );
  assert.equal(zeroQuota.getRaw(), null);
});

test("enforces max 3 sample solution views per calendar day for students and resets next day", async () => {
  let stored = student({ totalXp: 500, weeklyXp: 500 });
  const quota = createMemoryQuotaStore();
  const read = async () => ({ ...stored });
  const save = async (_before: User, after: User) => { stored = after; return true; };
  const day1 = new Date(2026, 10, 17, 9, 0, 0);
  const day2 = new Date(2026, 10, 18, 9, 0, 0);

  for (let i = 1; i <= SAMPLE_SOLUTION_DAILY_LIMIT; i++) {
    const res = await chargeSampleSolution(25, read, save, quota, day1);
    assert.equal(res.dailyUsage.count, i);
  }
  assert.equal(stored.totalXp, 500 - 3 * 50);

  // 4th view on same day is blocked without deducting XP
  await assert.rejects(chargeSampleSolution(25, read, save, quota, day1), /3\/3 lần/);
  assert.equal(stored.totalXp, 350);

  // Next calendar day resets counter when XP > 0
  const nextDayRes = await chargeSampleSolution(25, read, save, quota, day2);
  assert.equal(nextDayRes.dailyUsage.date, getSampleSolutionDateKey(day2));
  assert.equal(nextDayRes.dailyUsage.count, 1);
  assert.equal(stored.totalXp, 300);

  // Next day still blocks if student has totalXp <= 0
  stored = student({ totalXp: 0, weeklyXp: 0 });
  await assert.rejects(chargeSampleSolution(25, read, save, quota, new Date(2026, 10, 19, 9, 0, 0)), /≤ 0/);
});

test("teachers/admins do not write scores or consume daily quota", async () => {
  const quota: SampleSolutionQuotaStore = {
    readUsage: async () => { assert.fail("Unexpected quota read"); },
    writeUsageIfUnchanged: async () => { assert.fail("Unexpected quota write"); },
  };
  for (const role of ["teacher", "admin"] as const) {
    const result = await chargeSampleSolution(
      50,
      async () => student({ role, totalXp: 0 }),
      async () => { assert.fail("Unexpected charge"); },
      quota,
    );
    assert.equal(result.penalty, 0);
    assert.equal(result.user.totalXp, 0);
  }
});

test("invalid rewards and inactive/unknown accounts are rejected before saving", async () => {
  for (const reward of [0, -1, NaN, Infinity, 1.5, Number.MAX_SAFE_INTEGER]) assert.throws(() => sampleSolutionPenalty(reward));
  const quota = createMemoryQuotaStore();
  for (const user of [null, student({ status: "blocked" }), student({ status: "pending" }), student({ role: "deleted" as User["role"] })]) {
    await assert.rejects(
      chargeSampleSolution(50, async () => user as User, async () => { assert.fail("Unexpected charge"); }, quota),
    );
  }
  assert.equal(quota.getRaw(), null);
});

test("simultaneous views deduct both penalties without losing updates", async () => {
  let stored = student({ totalXp: 300, weeklyXp: 100 });
  const quota = createMemoryQuotaStore();
  const day = new Date(2026, 10, 17, 12, 0, 0);
  const read = async () => ({ ...stored });
  const save = async (before: User, after: User) => {
    if (stored.totalXp !== before.totalXp || stored.weeklyXp !== before.weeklyXp) return false;
    stored = after;
    return true;
  };
  await Promise.all([chargeSampleSolution(40, read, save, quota, day), chargeSampleSolution(50, read, save, quota, day)]);
  assert.equal(stored.totalXp, 120);
  assert.equal(stored.weeklyXp, -80);
  assert.equal(parseDailySampleUsage(quota.getRaw(), getSampleSolutionDateKey(day)).count, 2);
});

test("simultaneous views at daily limit allow only up to 3/3 and reject excess without double-charging", async () => {
  let stored = student({ totalXp: 500, weeklyXp: 500 });
  const day = new Date(2026, 10, 17, 14, 0, 0);
  const dateKey = getSampleSolutionDateKey(day);
  const quota = createMemoryQuotaStore(serializeDailySampleUsage({ date: dateKey, count: 2 }));
  const read = async () => ({ ...stored });
  const save = async (before: User, after: User) => {
    if (stored.totalXp !== before.totalXp || stored.weeklyXp !== before.weeklyXp) return false;
    stored = after;
    return true;
  };

  const results = await Promise.allSettled([
    chargeSampleSolution(50, read, save, quota, day),
    chargeSampleSolution(50, read, save, quota, day),
  ]);
  assert.equal(results.filter((r) => r.status === "fulfilled").length, 1);
  assert.equal(results.filter((r) => r.status === "rejected").length, 1);
  assert.equal(stored.totalXp, 400);
  assert.equal(parseDailySampleUsage(quota.getRaw(), dateKey).count, 3);
});

test("network errors and repeated XP conflicts roll back reserved daily quota", async () => {
  const day = new Date(2026, 10, 17, 15, 0, 0);
  const dateKey = getSampleSolutionDateKey(day);

  const netQuota = createMemoryQuotaStore();
  let writes = 0;
  await assert.rejects(
    chargeSampleSolution(50, async () => student(), async () => { writes++; throw new Error("network"); }, netQuota, day),
    /network/,
  );
  assert.equal(writes, 1);
  assert.equal(parseDailySampleUsage(netQuota.getRaw(), dateKey).count, 0);

  const conflictQuota = createMemoryQuotaStore();
  let conflictWrites = 0;
  await assert.rejects(
    chargeSampleSolution(50, async () => student(), async () => { conflictWrites++; return false; }, conflictQuota, day),
    /phiên khác/,
  );
  assert.equal(conflictWrites, 3);
  assert.equal(parseDailySampleUsage(conflictQuota.getRaw(), dateKey).count, 0);
});

test("corrupt score values cannot be written back as NaN or unsafe numbers", async () => {
  const quota = createMemoryQuotaStore();
  for (const totalXp of [NaN, Infinity, -Number.MAX_SAFE_INTEGER]) {
    await assert.rejects(
      chargeSampleSolution(50, async () => student({ totalXp }), async () => { assert.fail("Unexpected charge"); }, quota),
      /không hợp lệ|≤ 0/,
    );
  }
  assert.equal(quota.getRaw(), null);
});

test("getStudentSampleSolutionBlockReason reflects XP <= 0, 3/day cap, and teacher/admin exemption", () => {
  assert.equal(getStudentSampleSolutionBlockReason(student({ totalXp: 10 }), 2), null);
  assert.match(getStudentSampleSolutionBlockReason(student({ totalXp: 0 }), 0)!, /≤ 0/);
  assert.match(getStudentSampleSolutionBlockReason(student({ totalXp: -20 }), 0)!, /≤ 0/);
  assert.match(getStudentSampleSolutionBlockReason(student({ totalXp: 200 }), 3)!, /3\/3 lần/);
  assert.equal(getStudentSampleSolutionBlockReason(student({ role: "teacher", totalXp: 0 }), 10), null);
  assert.equal(getStudentSampleSolutionBlockReason(student({ role: "admin", totalXp: -5 }), 10), null);
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
