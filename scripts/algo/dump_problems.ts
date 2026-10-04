// Xuất đề thuật toán GỐC (trước khi bổ sung bài mẫu) ra JSON để scripts/algo/build_algo_data.py xử lý.
import { RAW_ALGORITHM_PROBLEMS } from "../../src/data/problemsData";
import * as fs from "fs";
const out = process.argv[2];
fs.writeFileSync(out, JSON.stringify(RAW_ALGORITHM_PROBLEMS.map((p) => ({
  id: p.id, title: p.title, level: p.level, difficulty: p.difficulty, starter: p.starterCode,
  tests: p.testCases.map((t) => ({ i: t.input, o: t.expectedOutput }))
}))));
