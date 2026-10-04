// Tô màu cú pháp Python (không phụ thuộc thư viện ngoài) — dùng cho trình soạn thảo và khối code.
export type TokenClass = "kw" | "bi" | "lib" | "fn" | "cls" | "mt" | "fc" | "str" | "num" | "cm" | "op" | "dec" | "";
export interface PyToken { cls: TokenClass; text: string }

const KEYWORDS = new Set(
  "False None True and as assert async await break class continue def del elif else except finally for from global if import in is lambda nonlocal not or pass raise return try while with yield".split(" ")
);
const BUILTINS = new Set(
  "print input len range int float str bool list dict set tuple sum min max abs round sorted reversed enumerate zip map filter all any open type isinstance repr id chr ord bin hex oct divmod pow next iter format super object frozenset bytes complex".split(" ")
);
const LIBS = new Set(
  "math random sys itertools collections heapq bisect functools datetime os re json time string statistics Counter deque defaultdict permutations combinations product lru_cache heappush heappop bisect_left bisect_right stdin".split(" ")
);

const TOKEN =
  /(?<cm>#[^\n]*)|(?<str>(?:[fFrRbBuU]{1,2})?(?:"""[\s\S]*?"""|'''[\s\S]*?'''|"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'))|(?<dec>@[A-Za-z_][\w.]*)|(?<num>\b\d[\d_]*(?:\.\d+)?(?:[eE][+-]?\d+)?\b)|(?<id>[A-Za-z_]\w*)|(?<op>[+\-*/%=<>!&|^~]+)/g;

export const tokenizePython = (code: string): PyToken[] => {
  const out: PyToken[] = [];
  let pos = 0;
  let prevWord = "";
  TOKEN.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = TOKEN.exec(code)) !== null) {
    if (m.index > pos) out.push({ cls: "", text: code.slice(pos, m.index) });
    pos = m.index + m[0].length;
    const g = m.groups || {};
    const text = m[0];
    let cls: TokenClass = "";
    if (g.id !== undefined) {
      const before = code.slice(0, m.index).replace(/[ \t]+$/, "");
      const after = code.charAt(pos);
      if (KEYWORDS.has(text)) cls = "kw";
      else if (prevWord === "def") cls = "fn";
      else if (prevWord === "class") cls = "cls";
      else if (before.endsWith(".")) cls = after === "(" ? "mt" : LIBS.has(text) ? "lib" : "";
      else if (prevWord === "import" || prevWord === "from" || LIBS.has(text)) cls = "lib";
      else if (BUILTINS.has(text)) cls = "bi";
      else if (after === "(") cls = "fc";
      prevWord = text;
    } else {
      cls = (g.cm !== undefined ? "cm" : g.str !== undefined ? "str" : g.dec !== undefined ? "dec" : g.num !== undefined ? "num" : "op") as TokenClass;
      prevWord = "";
    }
    out.push({ cls, text });
  }
  if (pos < code.length) out.push({ cls: "", text: code.slice(pos) });
  return out;
};

// Màu cho nền tối (trình soạn thảo, khối code)
export const TOKEN_COLORS: Record<string, string> = {
  kw: "#c084fc", bi: "#7dd3fc", lib: "#5eead4", fn: "#fde68a", cls: "#fde68a", mt: "#67e8f9", fc: "#fcd34d",
  str: "#86efac", num: "#fdba74", cm: "#94a3b8", op: "#f9a8d4", dec: "#f0abfc"
};
