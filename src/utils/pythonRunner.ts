/**
 * PyEdu Python Execution & Automated Grader Engine
 * Executes Python code in-browser with standard library emulation,
 * supports stdin/input() stream, stdout capturing, execution timing,
 * and automated test-case evaluation.
 */

export interface ExecutionResult {
  success: boolean;
  output: string;
  error?: string;
  executionTimeMs: number;
}

export class PythonRunner {
  private static pyodideInstance: any = null;
  private static isLoadingPyodide = false;

  /**
   * Initialize Pyodide if available from CDN
   */
  public static async initPyodide(): Promise<any> {
    if (this.pyodideInstance) return this.pyodideInstance;
    if (this.isLoadingPyodide) {
      // wait until loaded
      let tries = 0;
      while (this.isLoadingPyodide && tries < 30) {
        await new Promise((r) => setTimeout(r, 100));
        tries++;
      }
      return this.pyodideInstance;
    }

    if (typeof window !== 'undefined' && (window as any).loadPyodide) {
      try {
        this.isLoadingPyodide = true;
        this.pyodideInstance = await (window as any).loadPyodide({
          indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.2/full/",
        });
        this.isLoadingPyodide = false;
        return this.pyodideInstance;
      } catch (err) {
        console.warn("Pyodide CDN load failed, using fast JS-Python engine:", err);
        this.isLoadingPyodide = false;
      }
    }
    return null;
  }

  /**
   * Run Python code with a given stdin input string
   */
  public static async runCode(code: string, stdinInput: string = ""): Promise<ExecutionResult> {
    const startTime = performance.now();

    // 1. Try Pyodide if available
    if (this.pyodideInstance) {
      try {
        const inputLines = stdinInput ? stdinInput.split("\n") : [];
        let inputIdx = 0;

        let stdoutBuffer = "";
        let stderrBuffer = "";

        this.pyodideInstance.setStdout({
          batched: (str: string) => {
            stdoutBuffer += str + "\n";
          },
        });
        this.pyodideInstance.setStderr({
          batched: (str: string) => {
            stderrBuffer += str + "\n";
          },
        });

        // Set custom stdin
        this.pyodideInstance.setStdin({
          stdin: () => {
            if (inputIdx < inputLines.length) {
              const val = inputLines[inputIdx++];
              return val;
            }
            return "";
          },
        });

        await this.pyodideInstance.runPythonAsync(code);
        const executionTimeMs = Math.round(performance.now() - startTime);

        return {
          success: !stderrBuffer,
          output: stdoutBuffer.replace(/\n+$/, ""),
          error: stderrBuffer ? stderrBuffer.trim() : undefined,
          executionTimeMs,
        };
      } catch (err: any) {
        const executionTimeMs = Math.round(performance.now() - startTime);
        return {
          success: false,
          output: "",
          error: err?.message || String(err),
          executionTimeMs,
        };
      }
    }

    // 2. High-performance Client-side Python Interpreter / Sandbox
    try {
      const result = await this.executeWithJsEngine(code, stdinInput);
      const executionTimeMs = Math.round(performance.now() - startTime);
      return {
        ...result,
        executionTimeMs,
      };
    } catch (err: any) {
      const executionTimeMs = Math.round(performance.now() - startTime);
      return {
        success: false,
        output: "",
        error: err?.message || "Lỗi thực thi mã nguồn",
        executionTimeMs,
      };
    }
  }

  /**
   * Emulated Python execution environment in JavaScript
   */
  private static async executeWithJsEngine(code: string, stdinInput: string): Promise<{ success: boolean; output: string; error?: string }> {
    const outputs: string[] = [];
    const inputLines = stdinInput !== "" ? stdinInput.trim().split("\n").map(l => l.trim()) : [];
    let currentInputIdx = 0;

    // Custom simulated standard library
    const scope: Record<string, any> = {
      math: {
        sqrt: Math.sqrt,
        pow: Math.pow,
        pi: Math.PI,
        floor: Math.floor,
        ceil: Math.ceil,
        abs: Math.abs,
        sin: Math.sin,
        cos: Math.cos,
        gcd: (a: number, b: number) => {
          while (b) {
            const t = b;
            b = a % b;
            a = t;
          }
          return a;
        }
      },
      random: {
        randint: (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min,
        choice: (arr: any[]) => arr[Math.floor(Math.random() * arr.length)],
      },
      len: (obj: any) => {
        if (obj === null || obj === undefined) throw new Error("TypeError: object of type 'NoneType' has no len()");
        return obj.length !== undefined ? obj.length : Object.keys(obj).length;
      },
      range: (...args: number[]) => {
        let start = 0, stop = 0, step = 1;
        if (args.length === 1) {
          stop = args[0];
        } else if (args.length === 2) {
          start = args[0];
          stop = args[1];
        } else if (args.length === 3) {
          start = args[0];
          stop = args[1];
          step = args[2];
        }
        const res: number[] = [];
        if (step > 0) {
          for (let i = start; i < stop; i += step) res.push(i);
        } else if (step < 0) {
          for (let i = start; i > stop; i += step) res.push(i);
        }
        return res;
      },
      sum: (arr: number[]) => arr.reduce((a, b) => a + Number(b), 0),
      max: (...args: any[]) => {
        const flat = args.length === 1 && Array.isArray(args[0]) ? args[0] : args;
        return Math.max(...flat);
      },
      min: (...args: any[]) => {
        const flat = args.length === 1 && Array.isArray(args[0]) ? args[0] : args;
        return Math.min(...flat);
      },
      sorted: (arr: any[], reverse = false) => {
        const copy = [...arr].sort((a, b) => (a > b ? 1 : a < b ? -1 : 0));
        return reverse ? copy.reverse() : copy;
      },
      enumerate: (arr: any[]) => arr.map((item, idx) => [idx, item]),
      zip: (...arrays: any[][]) => {
        const minLen = Math.min(...arrays.map(a => a.length));
        const res = [];
        for (let i = 0; i < minLen; i++) {
          res.push(arrays.map(a => a[i]));
        }
        return res;
      },
      str: (v: any) => String(v),
      int: (v: any) => {
        const n = parseInt(v, 10);
        if (isNaN(n)) throw new Error(`ValueError: invalid literal for int() with base 10: '${v}'`);
        return n;
      },
      float: (v: any) => {
        const n = parseFloat(v);
        if (isNaN(n)) throw new Error(`ValueError: could not convert string to float: '${v}'`);
        return n;
      },
      bool: (v: any) => Boolean(v),
      list: (v: any) => Array.isArray(v) ? [...v] : Array.from(v || []),
      dict: (entries?: [any, any][]) => {
        const d: Record<string, any> = {};
        if (entries) {
          for (const [k, v] of entries) d[k] = v;
        }
        return d;
      },
      set: (v: any) => new Set(v || []),
      print: (...args: any[]) => {
        const text = args.map(arg => {
          if (arg === null || arg === undefined) return "None";
          if (typeof arg === "boolean") return arg ? "True" : "False";
          if (Array.isArray(arg)) return JSON.stringify(arg);
          if (typeof arg === "object") return JSON.stringify(arg);
          return String(arg);
        }).join(" ");
        outputs.push(text);
      },
      input: (promptText?: string) => {
        if (promptText) {
          outputs.push(promptText);
        }
        if (currentInputIdx < inputLines.length) {
          const val = inputLines[currentInputIdx];
          currentInputIdx++;
          return val;
        }
        // If not in batch test, prompt user if in browser
        if (typeof window !== "undefined" && typeof window.prompt === "function") {
          const userVal = window.prompt(promptText || "Nhập giá trị đầu vào cho chương trình Python:") || "";
          return userVal;
        }
        return "";
      }
    };

    // Quick syntax error validation
    const lines = code.split("\n");
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;

      // Check common indentation mismatch or missing colon
      if (
        (trimmed.startsWith("if ") || trimmed.startsWith("elif ") || trimmed.startsWith("else") ||
         trimmed.startsWith("for ") || trimmed.startsWith("while ") || trimmed.startsWith("def ") ||
         trimmed.startsWith("try") || trimmed.startsWith("except") || trimmed.startsWith("class ")) &&
        !trimmed.endsWith(":")
      ) {
        return {
          success: false,
          output: outputs.join("\n"),
          error: `SyntaxError: invalid syntax at line ${i + 1}: Thiếu dấu hai chấm ':' ở cuối câu lệnh '${trimmed}'`
        };
      }
    }

    // Convert basic Python to runnable JavaScript Sandbox
    try {
      const jsTranspiled = transpilePythonToJs(code);
      const runnerFn = new Function(
        "scope",
        `
        const { print, input, len, range, sum, max, min, sorted, enumerate, zip, str, int, float, bool, list, dict, set, math, random } = scope;
        const True = true;
        const False = false;
        const None = null;
        ${jsTranspiled}
      `
      );

      runnerFn(scope);

      return {
        success: true,
        output: outputs.join("\n"),
      };
    } catch (runtimeErr: any) {
      return {
        success: false,
        output: outputs.join("\n"),
        error: `RuntimeError: ${runtimeErr.message || String(runtimeErr)}`
      };
    }
  }

  /**
   * Run automated test suite against a student's code
   */
  public static async evaluateTestSuite(
    code: string,
    testCases: { id: string; input: string; expectedOutput: string; isHidden: boolean; explanation?: string }[]
  ) {
    const results = [];
    let passedCount = 0;
    let totalTime = 0;

    for (const test of testCases) {
      const startTime = performance.now();
      const exec = await this.runCode(code, test.input);
      const duration = Math.round(performance.now() - startTime);
      totalTime += duration;

      const normalizedActual = normalizeOutput(exec.output);
      const normalizedExpected = normalizeOutput(test.expectedOutput);

      const isPass = exec.success && normalizedActual === normalizedExpected;
      if (isPass) passedCount++;

      results.push({
        testId: test.id,
        input: test.input,
        expectedOutput: test.expectedOutput,
        actualOutput: exec.output,
        passed: isPass,
        isHidden: test.isHidden,
        errorMessage: exec.error,
        executionTimeMs: duration,
      });
    }

    const score = testCases.length > 0 ? Math.round((passedCount / testCases.length) * 100) : 100;

    return {
      passed: passedCount === testCases.length,
      score,
      totalTests: testCases.length,
      passedTests: passedCount,
      runtimeMs: totalTime,
      testResults: results,
      timestamp: new Date().toISOString(),
    };
  }
}

/**
 * Normalizes stdout and expected output for fair grading
 */
function normalizeOutput(str: string): string {
  if (!str) return "";
  return str
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .split("\n")
    .map((line) => line.trimEnd())
    .join("\n")
    .trim();
}

/**
 * Lightweight python transpiler for browser execution
 */
function transpilePythonToJs(pyCode: string): string {
  const lines = pyCode.split("\n");
  const jsLines: string[] = [];
  const indentStack: number[] = [0];

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    if (!trimmed || trimmed.startsWith("#")) {
      jsLines.push(rawLine.replace(/#/g, "//"));
      continue;
    }

    const indent = rawLine.search(/\S/);

    // Handle dedent blocks
    while (indentStack.length > 1 && indent < indentStack[indentStack.length - 1]) {
      indentStack.pop();
      jsLines.push(" ".repeat(indentStack[indentStack.length - 1]) + "}");
    }

    let line = trimmed;

    // f-string translation: f"Hello {name}" -> `Hello ${name}`
    line = line.replace(/f"([^"]*)"/g, (match, p1) => {
      const replaced = p1.replace(/\{([^}]+)\}/g, "${$1}");
      return `\`${replaced}\``;
    });
    line = line.replace(/f'([^']*)'/g, (match, p1) => {
      const replaced = p1.replace(/\{([^}]+)\}/g, "${$1}");
      return `\`${replaced}\``;
    });

    // Python comments
    line = line.replace(/#(.*)$/, "//$1");

    // Python power operator ** -> Math.pow or **
    // Python integer division // -> Math.floor(a/b)
    line = line.replace(/([a-zA-Z0-9_\(\)]+)\s*\/\/\s*([a-zA-Z0-9_\(\)]+)/g, "Math.floor($1 / $2)");

    // Logical operators
    line = line.replace(/\band\b/g, "&&");
    line = line.replace(/\bor\b/g, "||");
    line = line.replace(/\bnot\s+/g, "!");

    // List comprehension simple emulation: [x*2 for x in arr]
    line = line.replace(/\[\s*([^\s]+)\s+for\s+([^\s]+)\s+in\s+([^\]]+)\]/g, "($3).map(($2) => $1)");

    // if / elif / else
    if (line.startsWith("if ") && line.endsWith(":")) {
      const condition = line.slice(3, -1).trim();
      jsLines.push(" ".repeat(indent) + `if (${condition}) {`);
      indentStack.push(indent + 4);
      continue;
    }
    if (line.startsWith("elif ") && line.endsWith(":")) {
      const condition = line.slice(5, -1).trim();
      jsLines.push(" ".repeat(indent) + `else if (${condition}) {`);
      indentStack.push(indent + 4);
      continue;
    }
    if (line === "else:") {
      jsLines.push(" ".repeat(indent) + `else {`);
      indentStack.push(indent + 4);
      continue;
    }

    // for loop: for x in range(...) or for x in arr
    const forMatch = line.match(/^for\s+([a-zA-Z0-9_,\s]+)\s+in\s+(.+):$/);
    if (forMatch) {
      const varName = forMatch[1].trim();
      const iter = forMatch[2].trim();
      jsLines.push(" ".repeat(indent) + `for (const ${varName} of ${iter}) {`);
      indentStack.push(indent + 4);
      continue;
    }

    // while loop: while condition:
    const whileMatch = line.match(/^while\s+(.+):$/);
    if (whileMatch) {
      const condition = whileMatch[1].trim();
      jsLines.push(" ".repeat(indent) + `while (${condition}) {`);
      indentStack.push(indent + 4);
      continue;
    }

    // def function: def name(a, b=2):
    const defMatch = line.match(/^def\s+([a-zA-Z0-9_]+)\s*\((.*)\)\s*:$/);
    if (defMatch) {
      const funcName = defMatch[1];
      const params = defMatch[2];
      jsLines.push(" ".repeat(indent) + `function ${funcName}(${params}) {`);
      indentStack.push(indent + 4);
      continue;
    }

    // Class definition: class Dog:
    const classMatch = line.match(/^class\s+([a-zA-Z0-9_]+)\s*:$/);
    if (classMatch) {
      const className = classMatch[1];
      jsLines.push(" ".repeat(indent) + `class ${className} {`);
      indentStack.push(indent + 4);
      continue;
    }

    // try / except
    if (line === "try:") {
      jsLines.push(" ".repeat(indent) + `try {`);
      indentStack.push(indent + 4);
      continue;
    }
    if (line.startsWith("except") && line.endsWith(":")) {
      jsLines.push(" ".repeat(indent) + `catch (e) {`);
      indentStack.push(indent + 4);
      continue;
    }

    // List append / pop / remove in python
    line = line.replace(/\.append\(/g, ".push(");

    // Variable assignment: add 'let' if not already declared or if top level
    if (/^[a-zA-Z_][a-zA-Z0-9_]*\s*=\s*/.test(line) && !line.startsWith("let ") && !line.startsWith("const ") && !line.startsWith("var ")) {
      const varName = line.split("=")[0].trim();
      // Use window/global scope or let declaration
      line = `let ${line}`;
    }

    jsLines.push(" ".repeat(indent) + line + ";");
  }

  // Close any remaining opened blocks
  while (indentStack.length > 1) {
    indentStack.pop();
    jsLines.push("}");
  }

  return jsLines.join("\n");
}
