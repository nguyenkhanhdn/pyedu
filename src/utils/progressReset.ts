import { AlgorithmSubmission, ResetScope, User } from "../types";
import { CURRICULUM_MODULES, ALGORITHM_PROBLEMS } from "../data/curriculum";
import { ALGO_TREE, OTHER_NODE, classifyProblem, flattenLeaves } from "../data/problems/algoTree";

export interface ResetTopicItem {
  id: string;
  title: string;
  /** Mã các bài học / bài luyện thuộc mục này. */
  ids: string[];
}

export interface ResetTopicGroup {
  id: string;
  title: string;
  items: ResetTopicItem[];
}

/** Bài học theo chuyên đề (mỗi mục là một bài học). */
export const lessonResetGroups = (): ResetTopicGroup[] =>
  CURRICULUM_MODULES.map((m) => ({
    id: m.id,
    title: m.title,
    items: m.lessons.map((l) => ({ id: l.id, title: l.title, ids: [l.id] })),
  }));

/** Bài luyện giải đề thuật toán theo cây chủ đề (mỗi mục là một chủ đề lá). */
export const algoResetGroups = (): ResetTopicGroup[] => {
  const byLeaf: Record<string, string[]> = {};
  ALGORITHM_PROBLEMS.forEach((p) => {
    const leaf = classifyProblem(p);
    (byLeaf[leaf] = byLeaf[leaf] || []).push(p.id);
  });
  const groups: ResetTopicGroup[] = ALGO_TREE.map((g) => ({
    id: g.id,
    title: g.label,
    items: flattenLeaves(g.children?.length ? g.children : [g])
      .filter((leaf) => byLeaf[leaf.id]?.length)
      .map((leaf) => ({ id: leaf.id, title: leaf.label, ids: byLeaf[leaf.id] })),
  }));
  if (byLeaf[OTHER_NODE.id]?.length) {
    groups.push({ id: OTHER_NODE.id, title: OTHER_NODE.label, items: [{ id: OTHER_NODE.id, title: OTHER_NODE.label, ids: byLeaf[OTHER_NODE.id] }] });
  }
  return groups.filter((g) => g.items.length > 0);
};

/** Khóa lưu code / bài tập con của một bài học: `id`, `id_p0`, `id_p1`... */
export const lessonCodeKeys = (lessonIds: string[]): string[] =>
  lessonIds.flatMap((id) => [id, ...Array.from({ length: 12 }, (_, i) => `${id}_p${i}`)]);

/** Số XP học sinh sẽ mất khi đặt lại các bài đã chọn (chỉ tính bài đã hoàn thành). */
export const computeXpLoss = (user: User, algoSubs: AlgorithmSubmission[], scope: ResetScope): number => {
  const lessons = CURRICULUM_MODULES.flatMap((m) => m.lessons).filter(
    (l) => scope.lessonIds.includes(l.id) && user.completedLessons?.includes(l.id)
  );
  const lessonLoss = lessons.reduce((s, l) => s + (l.xpReward || 50), 0);
  const solved = new Set(algoSubs.filter((s) => s.passed).map((s) => s.problemId));
  const algoLoss = ALGORITHM_PROBLEMS.filter((p) => scope.problemIds.includes(p.id) && solved.has(p.id)).reduce(
    (s, p) => s + (p.points || 40),
    0
  );
  return lessonLoss + algoLoss;
};

/** Mô tả ngắn gọn phạm vi đặt lại, dùng trong thông báo cho học sinh. */
export const describeScope = (scope: ResetScope): string => {
  if (scope.mode === 'all') return "toàn bộ tiến độ học tập (điểm về 0)";
  const titles: string[] = [];
  const lessonSet = new Set(scope.lessonIds);
  lessonResetGroups().forEach((g) => {
    const chosen = g.items.filter((it) => lessonSet.has(it.id));
    if (chosen.length === g.items.length && chosen.length > 0) titles.push(g.title);
    else chosen.forEach((it) => titles.push(it.title));
  });
  const problemSet = new Set(scope.problemIds);
  algoResetGroups().forEach((g) => {
    const chosen = g.items.filter((it) => it.ids.every((id) => problemSet.has(id)));
    if (chosen.length === g.items.length && chosen.length > 0) titles.push(`Luyện đề: ${g.title}`);
    else chosen.forEach((it) => titles.push(`Luyện đề: ${it.title}`));
  });
  const shown = titles.slice(0, 5).join("; ");
  return titles.length > 5 ? `${shown}… (+${titles.length - 5} mục)` : shown || "các bài đã chọn";
};
