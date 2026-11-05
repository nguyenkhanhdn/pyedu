import type { TestCase } from "../types";
export interface ReviewTestResult { testId: string; passed: boolean; actualOutput: string; error: string; }
/** Fresh worker per attempt: a runaway Python loop can be stopped without freezing the page. */
export function startReviewGrading(code: string, tests: TestCase[], onProgress: (message: string) => void) {
  const worker = new Worker(new URL("../workers/reviewPython.worker.ts", import.meta.url), { type: "module" });
  let rejectPending: (error: Error) => void;
  let finished = false;
  let timer: ReturnType<typeof setTimeout>;
  const finish = () => { finished = true; clearTimeout(timer); worker.terminate(); };
  const result = new Promise<ReviewTestResult[]>((resolve, reject) => {
    rejectPending = reject;
    timer = setTimeout(() => { finish(); reject(new Error("Tải Python quá lâu. Kiểm tra mạng rồi thử lại.")); }, 60000);
    worker.onerror = () => { finish(); reject(new Error("Không khởi chạy được trình chấm Python. Hãy tải lại trang rồi thử lại.")); };
    worker.onmessage = event => {
      if (event.data.type === "ready") {
        clearTimeout(timer);
        onProgress("Đang chạy các test...");
        timer = setTimeout(() => { finish(); reject(Object.assign(new Error("Bài chạy quá 15 giây. Kiểm tra điều kiện dừng của vòng lặp rồi nộp lại."), { code: "REVIEW_TIMEOUT" })); }, 15000);
      } else if (event.data.type === "progress") onProgress(`Đã chấm ${event.data.completed}/${event.data.total} test...`);
      else if (event.data.type === "result") { finish(); resolve(event.data.results); }
      else if (event.data.type === "error") { finish(); reject(new Error(event.data.message)); }
    };
    onProgress("Đang tải Python cho trình chấm...");
    worker.postMessage({ code, tests });
  });
  return { result, cancel() { if (!finished) { finish(); rejectPending(new Error("Đã dừng chấm. Bài làm vẫn được giữ.")); } } };
}
