import { LessonPractice } from "../types";
import { PROBLEM_TEXT_OVERRIDES } from "../data/curriculum/problemTextOverrides";

const SUPERSCRIPT: Record<string, string> = { "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹", "-": "⁻" };

const PY_CALLS = "print|input|range|len|int|float|str|bool|sum|max|min|sorted|round|type|split|join|capitalize|upper|lower|title|append|index|map|list|abs|sort";
const PY_KEYWORDS = "if|elif|else|for|while|def|return|break|continue|try|except|import|True|False|None|and|or|not";

// Tách chuỗi thành các đoạn: đoạn nằm trong `dấu huyền` được giữ nguyên
const mapOutsideCode = (text: string, fn: (plain: string) => string): string =>
  text
    .split(/(`[^`]*`)/g)
    .map((part) => (part.startsWith("`") && part.endsWith("`") && part.length >= 2 ? part : fn(part)))
    .join("");

// Xóa LaTeX và ký tự dư thừa, đổi ký hiệu máy tính sang ký hiệu toán học dễ đọc
const cleanPlain = (s: string): string =>
  s
    // LaTeX: $...$ → bỏ dấu $, đổi lệnh sang ký hiệu thường
    .replace(/\$([^$]*)\$/g, (_m, inner: string) =>
      inner
        .replace(/\\le(?:q)?\b/g, "≤")
        .replace(/\\ge(?:q)?\b/g, "≥")
        .replace(/\\times\b/g, "×")
        .replace(/\\dots\b|\\ldots\b|\\cdots\b/g, "...")
        .replace(/\\pi\b/g, "π")
        .replace(/\\%/g, "%")
        .replace(/[{}\\]/g, "")
        .trim()
    )
    .replace(/\\le(?:q)?\b/g, "≤")
    .replace(/\\ge(?:q)?\b/g, "≥")
    .replace(/\\times\b/g, "×")
    .replace(/\\dots\b/g, "...")
    // So sánh và lũy thừa
    .replace(/<=/g, "≤")
    .replace(/>=/g, "≥")
    .replace(/!=/g, "≠")
    .replace(/\s*->\s*/g, " → ")
    .replace(/([\w)\]])\^2\b/g, "$1²")
    .replace(/(\d+)\s*\.\.\s*(\d+)/g, "$1 đến $2")
    .replace(/10\^(-?\d+)/g, (_m, e: string) => "10" + e.split("").map((c) => SUPERSCRIPT[c] ?? c).join(""))
    .replace(/[ \t]{2,}/g, " ");

// ---- Tô nổi biểu thức Python (chạy TRƯỚC khi đổi ký hiệu để mã giữ nguyên dạng ASCII) ----
const IDENT = String.raw`[A-Za-z_]\w*(?:\.[A-Za-z_]\w*)*(?![\p{L}\p{N}_])`;
const OPERAND = String.raw`(?:${IDENT}(?:\[[^\]\n]*\])?(?:\((?:[^()\n]|\([^()\n]*\))*\))?|\d+(?:\.\d+)?|'[^'\n]*'|"[^"\n]*")`;
const ARITH = String.raw`(?:[ \t]*(?:%|\*\*|//|\+|-|\*|/)[ \t]*${OPERAND})*`;
const CMP = String.raw`(?:==|!=|>=|<=|>|<)`;
const EXPR_C = String.raw`${OPERAND}${ARITH}[ \t]*${CMP}[ \t]*${OPERAND}${ARITH}`;
const NOT_AFTER_LETTER = String.raw`(?<![\p{L}\p{N}_.])`;

const R_COND = new RegExp(`${NOT_AFTER_LETTER}(?:if|elif|while)\[ \t]+(?:not\[ \t]+)?${EXPR_C}(?:\[ \t]+(?:and|or)\[ \t]+${EXPR_C})*(?:\[ \t]*:)?`, "gu");
const R_FOR = new RegExp(`${NOT_AFTER_LETTER}for\[ \t]+\\w+\[ \t]+in\[ \t]+${IDENT}(?:\\([^()\\n]*\\))?(?:\[ \t]*:)?`, "gu");
const R_CALL = new RegExp(`${NOT_AFTER_LETTER}[A-Za-z_][\\w.]*\\((?:[^()\\n]|\\([^()\\n]*\\))+\\)`, "gu");
const R_COMPARE = new RegExp(`${NOT_AFTER_LETTER}${EXPR_C.replace(CMP, String.raw`(?:==|!=|>=|<=|\+=|-=|\*=|>|<)`)}`, "gu");
const R_ASSIGN = new RegExp(`${NOT_AFTER_LETTER}${IDENT}(?:\\[[^\\]\\n]*\\])?\[ \t]*(?:=|\\+=|-=|\\*=)\[ \t]*${OPERAND}${ARITH}`, "gu");
const R_KEYWORD = new RegExp(`(?<![\\p{L}\\p{N}_\`])(${PY_KEYWORDS})(:?)(?![\\p{L}\\p{N}_\`])`, "gu");

type Level = "plain" | "text" | "hint";

const stepsFor = (level: Level): ((plain: string) => string)[] => {
  if (level === "plain") return [];
  const steps: ((plain: string) => string)[] = [
    (s) => s.replace(R_COND, "`$&`"),
    (s) => s.replace(R_FOR, "`$&`"),
    (s) => s.replace(R_CALL, "`$&`")
  ];
  // Gợi ý thường là mã: tô cả biểu thức so sánh / phép gán. Đề bài là văn xuôi nên chỉ tô lệnh, hàm, chuỗi.
  if (level === "hint") {
    steps.push(
      (s) => s.replace(R_COMPARE, "`$&`"),
      (s) => s.replace(R_ASSIGN, "`$&`"),
      (s) => s.replace(/(?<=\s|^)(==|!=|>=|<=)(?=[\s.,;:)]|$)/g, "`$1`")
    );
  }
  steps.push(
    (s) =>
      s.replace(/(?<![\p{L}\p{N}_])(f)?(["'])([^"'\n`]{1,60})\2/gu, (_m, f: string | undefined, q: string, body: string) =>
        f ? `\`f${q}${body}${q}\`` : `\`${body}\``
      ),
    (s) => s.replace(new RegExp(`\\b(${PY_CALLS})\\(\\)`, "g"), "`$1()`").replace(/\bmath\.pi\b/g, "`math.pi`"),
    (s) => s.replace(R_KEYWORD, "`$1$2`")
  );
  return steps;
};

const highlight = (text: string, level: Level): string => {
  let t = text;
  for (const step of stepsFor(level)) t = mapOutsideCode(t, step);
  // Gộp các ô mã liền kề cách nhau đúng một dấu cách, ví dụ `if n > 0:` `print(1)` → `if n > 0: print(1)`
  let prev = "";
  while (prev !== t) {
    prev = t;
    t = t.replace(/`([^`\n]+)` `([^`\n]+)`/g, "`$1 $2`");
  }
  return t;
};

// Các dòng đứng sau một dòng kết thúc bằng ":" trong mục Đầu ra là mẫu in nguyên văn
const markLiteralOutputLines = (text: string): string => {
  const lines = text.split("\n");
  let literal = false;
  return lines
    .map((line) => {
      const trimmed = line.trim();
      if (!trimmed) return line;
      if (literal && !/^[-+•]\s/.test(trimmed) && !trimmed.startsWith("`")) {
        return "`" + line.replace(/\s+$/, "") + "`";
      }
      if (trimmed.endsWith(":")) literal = true;
      return line;
    })
    .join("\n");
};

export const polishText = (text: string | undefined, opts?: { literalOutput?: boolean; level?: Level }): string => {
  if (!text) return "";
  let t = text
    // `int(`float(x)`)` → `int(float(x))`; `a <=` b → `a <= b`
    .replace(/([A-Za-z_][\w.]*)\(`([^`\n]+)`\)/g, "`$1($2)`")
    .replace(/`([^`\n]*?(?:<=|>=|==|!=|<|>|\+|\*|%))`[ ]+([\w.\[\]]+)/g, "`$1 $2`")
    .replace(/\s*\(mặc định [^)]*thử nghiệm\)/g, "")
    .replace(/\(\*\)/g, "(`*`)")
    .replace(/\r/g, "").replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
  // Dòng chỉ gồm <...> (ví dụ <class 'str'>) là mẫu in nguyên văn → hiển thị dạng code
  t = t.replace(/^[ \t]*(<[^<>\n`]+>)[ \t]*$/gm, "`$1`");
  if (opts?.literalOutput) t = markLiteralOutputLines(t);
  t = highlight(t, opts?.level ?? "text");
  t = mapOutsideCode(t, cleanPlain);
  return t;
};

// Chuẩn hóa một bài tập: ưu tiên đề viết lại ngắn gọn (nếu có), rồi làm sạch + tô nổi
export const polishPractice = (p: LessonPractice): LessonPractice => {
  const o = (p.id && PROBLEM_TEXT_OVERRIDES[p.id]) || {};
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
    sampleCases: p.sampleCases.map((s) => ({ ...s, explanation: polishText(s.explanation) }))
  };
};
