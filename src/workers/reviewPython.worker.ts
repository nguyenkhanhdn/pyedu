/// <reference lib="webworker" />
import type { TestCase } from "../types";

const scope = self as unknown as DedicatedWorkerGlobalScope;
const sources = ["https://cdn.jsdelivr.net/pyodide/v0.26.2/full/", "https://unpkg.com/pyodide@0.26.2/"];
const normalize = (text: string) => text.replace(/\r\n/g, "\n").split("\n").map(line => line.trimEnd()).join("\n").trim();
scope.onmessage = async (event: MessageEvent<{ code: string; tests: TestCase[] }>) => {
  try {
    let py: any;
    for (const indexURL of sources) {
      try {
        const module = await import(/* @vite-ignore */ `${indexURL}pyodide.mjs`);
        py = await module.loadPyodide({ indexURL });
        break;
      } catch { /* Try the fallback CDN before reporting a loading failure. */ }
    }
    if (!py) throw new Error("Không tải được Python. Kiểm tra kết nối mạng rồi thử chấm lại; kết quả cũ được giữ nguyên.");
    scope.postMessage({ type: "ready" });
    const results = [];
    for (const test of event.data.tests) {
      let output = "", stderr = "", error = "";
      const lines = test.input.split("\n");
      let inputIndex = 0;
      py.setStdout({ batched: (line: string) => { if (output.length + line.length > 50000) throw new Error("Đầu ra vượt giới hạn 50000 ký tự."); output += line + "\n"; } });
      py.setStderr({ batched: (line: string) => { stderr = (stderr + line + "\n").slice(-5000); } });
      py.setStdin({ stdin: () => inputIndex < lines.length ? lines[inputIndex++] : undefined });
      const globals = py.globals.get("dict")();
      globals.set("__name__", "__main__");
      try { await py.runPythonAsync(event.data.code, { globals }); }
      catch (err) { error = err instanceof Error ? err.message : String(err); }
      finally {
        try { py.runPython("import sys\nsys.stdout.write('\\n')\nsys.stdout.flush()\nsys.stderr.flush()"); } catch { /* Preserve the execution error. */ }
        globals.destroy();
      }
      error ||= stderr;
      results.push({ testId: test.id, passed: !error && normalize(output) === normalize(test.expectedOutput), actualOutput: output.trimEnd(), error: error.slice(-2000) });
      scope.postMessage({ type: "progress", completed: results.length, total: event.data.tests.length });
    }
    scope.postMessage({ type: "result", results });
  } catch (err) { scope.postMessage({ type: "error", message: err instanceof Error ? err.message : String(err) }); }
};
