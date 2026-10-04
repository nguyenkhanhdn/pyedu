import { AlgorithmProblem } from "../../types";
import { polishText } from "../../utils/problemText";
import { ALGO_SAMPLE_SOLUTIONS, ALGO_STARTER_OVERRIDES, ALGO_TEST_INPUT_FIXES } from "./algoExtras";
import { ALGO_TEXT_OVERRIDES } from "./algoTextOverrides";

/**
 * Bổ sung cho đề thuật toán:
 * - sampleSolution: bài mẫu đã kiểm thử đạt 100% test (scripts/algo/build_algo_data.py)
 * - starterCode: mã khung thay cho mã khởi tạo từng chứa sẵn đáp án
 * - làm sạch đề bài (bỏ LaTeX, đổi ký hiệu, tô nổi lệnh/hàm) và ưu tiên đề viết lại ngắn gọn nếu có
 */
export const enrichAlgorithmProblems = (problems: AlgorithmProblem[]): AlgorithmProblem[] =>
  problems.map((p) => {
    const o = ALGO_TEXT_OVERRIDES[p.id] || {};
    const fixes = ALGO_TEST_INPUT_FIXES[p.id];
    const constraintsRaw = o.constraints ?? p.constraints;
    const constraints = /^(không có|none)\.?$/i.test((constraintsRaw || "").trim())
      ? "Không có ràng buộc đặc biệt."
      : constraintsRaw;
    return {
      ...p,
      problemStatement: polishText(o.problemStatement ?? p.problemStatement),
      inputFormat: polishText(o.inputFormat ?? p.inputFormat),
      outputFormat: polishText(o.outputFormat ?? p.outputFormat, { literalOutput: true }),
      constraints: polishText(constraints, { level: "plain" }),
      hints: (p.hints || []).map((h) => polishText(h, { level: "hint" })),
      sampleCases: p.sampleCases.map((s) => ({ ...s, explanation: polishText(s.explanation) })),
      solutionExplanation: polishText(o.solutionExplanation ?? p.solutionExplanation, { level: "hint" }),
      sampleSolution: ALGO_SAMPLE_SOLUTIONS[p.id],
      starterCode: ALGO_STARTER_OVERRIDES[p.id] ?? p.starterCode,
      testCases: fixes ? p.testCases.map((t, i) => (fixes[i] !== undefined ? { ...t, input: fixes[i] } : t)) : p.testCases
    };
  });
