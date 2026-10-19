import { ALGORITHM_PROBLEMS } from "../../src/data/problemsData";
import { getSupabase } from "../../src/lib/supabase";

const client = getSupabase();
if (!client) throw new Error("Supabase chưa được cấu hình.");
// Check every bundled problem, including future additions. Never accept a failed read as success.
for (let offset = 0; offset < ALGORITHM_PROBLEMS.length; offset += 100) {
  const ids = ALGORITHM_PROBLEMS.slice(offset, offset + 100).map(p => p.id);
  const { data, error } = await client.from("algorithm_problems").select("id").in("id", ids);
  if (error) throw new Error(`Không kiểm tra được danh mục máy chủ: ${error.message}`);
  const saved = new Set((data || []).map(p => p.id));
  const missing = ids.filter(id => !saved.has(id));
  if (missing.length) throw new Error(`Máy chủ thiếu đề, bài nộp sẽ lỗi khóa ngoại: ${missing.join(", ")}. Hãy đồng bộ danh mục trước khi triển khai.`);
}
console.log(`Server catalogue covers all ${ALGORITHM_PROBLEMS.length} bundled exercises.`);
