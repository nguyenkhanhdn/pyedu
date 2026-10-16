import type { User } from "../types";

export type SampleSolutionTarget =
  | { kind: "lesson"; lessonId: string; practiceIndex: number }
  | { kind: "algorithm"; problemId: string };

export function sampleSolutionPenalty(reward: number): number {
  if (!Number.isSafeInteger(reward) || reward <= 0 || !Number.isSafeInteger(reward * 2)) {
    throw new Error("Điểm thưởng của bài chưa hợp lệ. Chưa mở bài mẫu.");
  }
  return reward * 2;
}

/** Compare-and-swap keeps simultaneous views from overwriting each other's XP. */
export async function chargeSampleSolution(
  reward: number,
  readUser: () => Promise<User | null>,
  saveIfUnchanged: (before: User, after: User) => Promise<boolean>,
): Promise<{ user: User; penalty: number }> {
  const penalty = sampleSolutionPenalty(reward);
  for (let attempt = 0; attempt < 3; attempt++) {
    const user = await readUser();
    if (!user || (user.status && user.status !== "active")) {
      throw new Error("Vui lòng đăng nhập bằng tài khoản đang hoạt động để xem bài mẫu.");
    }
    if (user.role === "teacher" || user.role === "admin") return { user, penalty: 0 };
    if (user.role !== "student") throw new Error("Tài khoản không được phép xem bài mẫu.");
    if (![user.totalXp, user.weeklyXp, user.totalXp - penalty, user.weeklyXp - penalty].every(Number.isSafeInteger)) {
      throw new Error("Điểm hiện tại không hợp lệ. Chưa mở bài mẫu.");
    }
    // Allow a negative balance: the full penalty still applies to new students.
    const updated = { ...user, totalXp: user.totalXp - penalty, weeklyXp: user.weeklyXp - penalty };
    if (await saveIfUnchanged(user, updated)) return { user: updated, penalty };
  }
  throw new Error("Điểm vừa thay đổi ở phiên khác. Vui lòng kiểm tra điểm và thử lại.");
}
