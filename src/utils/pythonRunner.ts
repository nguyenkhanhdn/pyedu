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

    // 1. Try Pyodide if available or initialize it
    if (!this.pyodideInstance && typeof window !== "undefined" && (window as any).loadPyodide) {
      try {
        await this.initPyodide();
      } catch {
        // Fall back to JS engine
      }
    }

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

    // Callable type functions that represent Python classes
    const intFunc: any = (v: any) => {
      if (v === undefined || v === null) return 0;
      if (typeof v === "boolean") return v ? 1 : 0;
      if (typeof v === "number") return Math.trunc(v);
      const s = String(v).trim();
      if (!/^-?\d+$/.test(s)) {
        throw new Error(`ValueError: invalid literal for int() with base 10: '${v}'`);
      }
      return parseInt(s, 10);
    };
    intFunc.toString = () => "<class 'int'>";
    intFunc.valueOf = () => "<class 'int'>";
    intFunc[Symbol.toPrimitive] = () => "<class 'int'>";

    const floatFunc: any = (v: any) => {
      if (v === undefined || v === null) return 0.0;
      if (typeof v === "boolean") return v ? 1.0 : 0.0;
      if (typeof v === "number") return v;
      const s = String(v).trim();
      const n = parseFloat(s);
      if (isNaN(n) || !/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(s)) {
        throw new Error(`ValueError: could not convert string to float: '${v}'`);
      }
      return n;
    };
    floatFunc.toString = () => "<class 'float'>";
    floatFunc.valueOf = () => "<class 'float'>";
    floatFunc[Symbol.toPrimitive] = () => "<class 'float'>";

    const strFunc: any = (v: any) => {
      if (v === null || v === undefined) return "None";
      if (typeof v === "boolean") return v ? "True" : "False";
      if (typeof v === "function" && v.toString) return v.toString();
      return String(v);
    };
    strFunc.toString = () => "<class 'str'>";
    strFunc.valueOf = () => "<class 'str'>";
    strFunc[Symbol.toPrimitive] = () => "<class 'str'>";

    const boolFunc: any = (v: any) => {
      if (v === "False" || v === "0" || v === "" || v === 0 || v === false || v === null || v === undefined) return false;
      return Boolean(v);
    };
    boolFunc.toString = () => "<class 'bool'>";
    boolFunc.valueOf = () => "<class 'bool'>";
    boolFunc[Symbol.toPrimitive] = () => "<class 'bool'>";

    const listFunc: any = (v: any) => {
      if (v === undefined || v === null) return [];
      if (Array.isArray(v)) return [...v];
      if (typeof v === "string") return v.split("");
      return Array.from(v);
    };
    listFunc.toString = () => "<class 'list'>";
    listFunc.valueOf = () => "<class 'list'>";
    listFunc[Symbol.toPrimitive] = () => "<class 'list'>";

    const dictFunc: any = (entries?: any) => {
      const d: Record<string, any> = {};
      if (entries && Array.isArray(entries)) {
        for (const item of entries) {
          if (Array.isArray(item) && item.length === 2) d[item[0]] = item[1];
        }
      }
      return d;
    };
    dictFunc.toString = () => "<class 'dict'>";
    dictFunc.valueOf = () => "<class 'dict'>";
    dictFunc[Symbol.toPrimitive] = () => "<class 'dict'>";

    const setFunc: any = (v?: any) => new Set(v || []);
    setFunc.toString = () => "<class 'set'>";
    setFunc.valueOf = () => "<class 'set'>";
    setFunc[Symbol.toPrimitive] = () => "<class 'set'>";

    const tupleFunc: any = (v?: any) => listFunc(v);
    tupleFunc.toString = () => "<class 'tuple'>";
    tupleFunc.valueOf = () => "<class 'tuple'>";
    tupleFunc[Symbol.toPrimitive] = () => "<class 'tuple'>";

    const typeFunc = (v: any) => {
      if (v === null || v === undefined) return "<class 'NoneType'>";
      if (typeof v === "number") return Number.isInteger(v) ? intFunc : floatFunc;
      if (typeof v === "string") return strFunc;
      if (typeof v === "boolean") return boolFunc;
      if (Array.isArray(v)) return listFunc;
      if (v instanceof Set) return setFunc;
      if (typeof v === "object") return dictFunc;
      return `<class '${typeof v}'>`;
    };

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
      reversed: (arr: any) => {
        if (typeof arr === "string") return arr.split("").reverse().join("");
        if (Array.isArray(arr)) return [...arr].reverse();
        return arr;
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
      str: strFunc,
      int: intFunc,
      float: floatFunc,
      bool: boolFunc,
      list: listFunc,
      dict: dictFunc,
      set: setFunc,
      tuple: tupleFunc,
      abs: (v: any) => Math.abs(Number(v)),
      round: (v: any, digits = 0) => {
        const factor = Math.pow(10, digits);
        return Math.round(Number(v) * factor) / factor;
      },
      pow: (base: number, exp: number) => Math.pow(base, exp),
      divmod: (a: number, b: number) => [Math.floor(a / b), a % b],
      type: typeFunc,
      isinstance: (val: any, targetType: any) => {
        if (targetType === intFunc) return typeof val === "number" && Number.isInteger(val);
        if (targetType === floatFunc) return typeof val === "number";
        if (targetType === strFunc) return typeof val === "string";
        if (targetType === boolFunc) return typeof val === "boolean";
        if (targetType === listFunc) return Array.isArray(val);
        if (targetType === dictFunc) return typeof val === "object" && val !== null && !Array.isArray(val);
        if (targetType === setFunc) return val instanceof Set;
        return false;
      },
      all: (iterable: any[]) => Array.from(iterable).every(Boolean),
      any: (iterable: any[]) => Array.from(iterable).some(Boolean),
      ord: (c: string) => String(c).charCodeAt(0),
      chr: (n: number) => String.fromCharCode(Number(n)),
      bin: (n: number) => "0b" + Number(n).toString(2),
      hex: (n: number) => "0x" + Number(n).toString(16),
      oct: (n: number) => "0o" + Number(n).toString(8),
      map: (fn: any, iter: any) => {
        const arr = Array.isArray(iter) ? iter : (typeof iter === "string" ? iter.split("") : []);
        return arr.map(fn);
      },
      filter: (fn: any, iter: any) => {
        const arr = Array.isArray(iter) ? iter : (typeof iter === "string" ? iter.split("") : []);
        return arr.filter(fn);
      },
      print: (...args: any[]) => {
        const text = args.map(arg => {
          if (arg === null || arg === undefined) return "None";
          if (typeof arg === "boolean") return arg ? "True" : "False";
          if (typeof arg === "function" && arg.toString) return arg.toString();
          if (Array.isArray(arg)) return JSON.stringify(arg);
          if (typeof arg === "object") {
            if (arg instanceof Set) return "{" + Array.from(arg).join(", ") + "}";
            return JSON.stringify(arg);
          }
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
        const {
          print, input, len, range, sum, max, min, sorted, reversed, enumerate, zip,
          str, int, float, bool, list, dict, set, tuple, math, random,
          type, abs, round, pow, divmod, isinstance, all, any, ord, chr, bin, hex, oct, map, filter
        } = scope;
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

    // Break and Continue statements
    if (line === "break" || line === "continue" || line === "pass") {
      if (line === "pass") {
        jsLines.push(" ".repeat(indent) + "// pass");
      } else {
        jsLines.push(" ".repeat(indent) + `${line};`);
      }
      continue;
    }

    // Return statement
    if (line.startsWith("return ") || line === "return") {
      jsLines.push(" ".repeat(indent) + `${line};`);
      continue;
    }

    // List and String slice [::-1]
    line = line.replace(/([a-zA-Z0-9_\(\)]+)\[::-1\]/g, "(typeof $1 === 'string' ? $1.split('').reverse().join('') : [...$1].reverse())");

    // List append / pop / remove in python
    line = line.replace(/\.append\(/g, ".push(");

    // String / List count: s.count(x) -> (s.split(x).length - 1)
    line = line.replace(/([a-zA-Z0-9_\(\)]+)\.count\(([^)]+)\)/g, "($1.split ? $1.split($2).length - 1 : $1.filter((item) => item === $2).length)");

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
