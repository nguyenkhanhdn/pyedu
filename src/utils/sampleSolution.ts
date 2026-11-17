import type { User } from "../types";

export const SAMPLE_SOLUTION_DAILY_LIMIT = 3;

export type SampleSolutionTarget =
  | { kind: "lesson"; lessonId: string; practiceIndex: number }
  | { kind: "algorithm"; problemId: string };

export interface DailySampleUsage {
  date: string;
  count: number;
}

export interface SampleSolutionQuotaStore {
  readUsage: (dateKey: string) => Promise<{ usage: DailySampleUsage; raw: string | null }>;
  writeUsageIfUnchanged: (prevRaw: string | null, nextUsage: DailySampleUsage) => Promise<boolean>;
}

export function getSampleSolutionDateKey(now = new Date()): string {
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function parseDailySampleUsage(raw: string | null | undefined, dateKey = getSampleSolutionDateKey()): DailySampleUsage {
  if (!raw) return { date: dateKey, count: 0 };
  try {
    const parsed = JSON.parse(raw);
    if (
      parsed &&
      typeof parsed === "object" &&
      parsed.date === dateKey &&
      Number.isInteger(parsed.count) &&
      parsed.count >= 0
    ) {
      return { date: dateKey, count: parsed.count };
    }
  } catch {}
  return { date: dateKey, count: 0 };
}

export function serializeDailySampleUsage(usage: DailySampleUsage): string {
  return JSON.stringify({ date: usage.date, count: usage.count });
}

export function sampleSolutionPenalty(reward: number): number {
  if (!Number.isSafeInteger(reward) || reward <= 0 || !Number.isSafeInteger(reward * 2)) {
    throw new Error("Điểm thưởng của bài chưa hợp lệ. Chưa mở bài mẫu.");
  }
  return reward * 2;
}

export function getStudentSampleSolutionBlockReason(user: User | null, dailyCount: number): string | null {
  if (!user || (user.status && user.status !== "active")) {
    return "Vui lòng đăng nhập bằng tài khoản đang hoạt động để xem bài mẫu.";
  }
  if (user.role === "teacher" || user.role === "admin") return null;
  if (user.role !== "student") {
    return "Tài khoản không được phép xem bài mẫu.";
  }
  if (!Number.isSafeInteger(user.totalXp) || user.totalXp <= 0) {
    return `Điểm hiện tại của bạn là ${user.totalXp ?? 0} XP (≤ 0). Không được phép mở xem bài mẫu nữa. Hãy tự làm bài để tích lũy thêm điểm!`;
  }
  if (dailyCount >= SAMPLE_SOLUTION_DAILY_LIMIT) {
    return `Bạn đã xem bài mẫu ${SAMPLE_SOLUTION_DAILY_LIMIT}/${SAMPLE_SOLUTION_DAILY_LIMIT} lần trong ngày hôm nay. Vui lòng quay lại vào ngày mai!`;
  }
  return null;
}

async function rollbackDailyQuota(quotaStore: SampleSolutionQuotaStore, dateKey: string): Promise<void> {
  try {
    for (let attempt = 0; attempt < 3; attempt++) {
      const { usage, raw } = await quotaStore.readUsage(dateKey);
      if (usage.date !== dateKey || usage.count <= 0) return;
      const rolledBack: DailySampleUsage = { date: dateKey, count: usage.count - 1 };
      if (await quotaStore.writeUsageIfUnchanged(raw, rolledBack)) return;
    }
  } catch (err) {
    console.warn("Sample solution quota rollback notice:", err);
  }
}

/** Compare-and-swap keeps simultaneous views from exceeding daily quota or overwriting each other's XP. */
export async function chargeSampleSolution(
  reward: number,
  readUser: () => Promise<User | null>,
  saveIfUnchanged: (before: User, after: User) => Promise<boolean>,
  quotaStore: SampleSolutionQuotaStore,
  now = new Date(),
): Promise<{ user: User; penalty: number; dailyUsage: DailySampleUsage }> {
  const penalty = sampleSolutionPenalty(reward);
  const dateKey = getSampleSolutionDateKey(now);

  const initialUser = await readUser();
  if (!initialUser || (initialUser.status && initialUser.status !== "active")) {
    throw new Error("Vui lòng đăng nhập bằng tài khoản đang hoạt động để xem bài mẫu.");
  }
  if (initialUser.role === "teacher" || initialUser.role === "admin") {
    return { user: initialUser, penalty: 0, dailyUsage: { date: dateKey, count: 0 } };
  }
  if (initialUser.role !== "student") {
    throw new Error("Tài khoản không được phép xem bài mẫu.");
  }
  if (!Number.isSafeInteger(initialUser.totalXp) || initialUser.totalXp <= 0) {
    throw new Error(`Điểm hiện tại của bạn là ${initialUser.totalXp ?? 0} XP (≤ 0). Không được phép mở xem bài mẫu nữa. Hãy tự làm bài để tích lũy thêm điểm!`);
  }
  if (![initialUser.totalXp, initialUser.weeklyXp, initialUser.totalXp - penalty, initialUser.weeklyXp - penalty].every(Number.isSafeInteger)) {
    throw new Error("Điểm hiện tại không hợp lệ. Chưa mở bài mẫu.");
  }

  let reservedUsage: DailySampleUsage | null = null;
  for (let attempt = 0; attempt < 3; attempt++) {
    const { usage, raw } = await quotaStore.readUsage(dateKey);
    if (usage.count >= SAMPLE_SOLUTION_DAILY_LIMIT) {
      throw new Error(`Bạn đã xem bài mẫu ${SAMPLE_SOLUTION_DAILY_LIMIT}/${SAMPLE_SOLUTION_DAILY_LIMIT} lần trong ngày hôm nay. Vui lòng quay lại vào ngày mai!`);
    }
    const nextUsage: DailySampleUsage = { date: dateKey, count: usage.count + 1 };
    if (await quotaStore.writeUsageIfUnchanged(raw, nextUsage)) {
      reservedUsage = nextUsage;
      break;
    }
  }
  if (!reservedUsage) {
    throw new Error("Lượt xem bài mẫu vừa thay đổi ở phiên khác. Vui lòng thử lại.");
  }

  try {
    for (let attempt = 0; attempt < 3; attempt++) {
      const user = attempt === 0 ? initialUser : await readUser();
      if (!user || (user.status && user.status !== "active")) {
        throw new Error("Vui lòng đăng nhập bằng tài khoản đang hoạt động để xem bài mẫu.");
      }
      if (user.role !== "student") {
        throw new Error("Tài khoản không được phép xem bài mẫu.");
      }
      if (!Number.isSafeInteger(user.totalXp) || user.totalXp <= 0) {
        throw new Error(`Điểm hiện tại của bạn là ${user.totalXp ?? 0} XP (≤ 0). Không được phép mở xem bài mẫu nữa. Hãy tự làm bài để tích lũy thêm điểm!`);
      }
      if (![user.totalXp, user.weeklyXp, user.totalXp - penalty, user.weeklyXp - penalty].every(Number.isSafeInteger)) {
        throw new Error("Điểm hiện tại không hợp lệ. Chưa mở bài mẫu.");
      }
      const updated = { ...user, totalXp: user.totalXp - penalty, weeklyXp: user.weeklyXp - penalty };
      if (await saveIfUnchanged(user, updated)) {
        return { user: updated, penalty, dailyUsage: reservedUsage };
      }
    }
    throw new Error("Điểm vừa thay đổi ở phiên khác. Vui lòng kiểm tra điểm và thử lại.");
  } catch (err) {
    await rollbackDailyQuota(quotaStore, dateKey);
    throw err;
  }
}
