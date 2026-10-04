import React, { useState } from "react";
import { Check, Copy } from "lucide-react";
import { TOKEN_COLORS, tokenizePython } from "../utils/pyHighlight";

export const HighlightedCode: React.FC<{ code: string }> = ({ code }) => (
  <>
    {tokenizePython(code).map((t, i) =>
      t.cls ? (
        <span
          key={i}
          style={{ color: TOKEN_COLORS[t.cls], fontWeight: t.cls === "kw" || t.cls === "fn" || t.cls === "cls" ? 600 : undefined, fontStyle: t.cls === "cm" ? "italic" : undefined }}
        >
          {t.text}
        </span>
      ) : (
        <React.Fragment key={i}>{t.text}</React.Fragment>
      )
    )}
  </>
);

// Khối code chỉ đọc, có tô màu cú pháp và nút chép
export const CodeBlock: React.FC<{ code: string; title?: string; className?: string }> = ({ code, title = "Python", className = "" }) => {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    try {
      navigator.clipboard?.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };
  return (
    <div className={`rounded-xl overflow-hidden border border-slate-800 bg-slate-950 ${className}`}>
      <div className="flex items-center justify-between px-3 py-1.5 bg-slate-800 text-slate-300 text-[11px] font-mono">
        <span>{title}</span>
        <button onClick={copy} className="flex items-center gap-1 px-2 py-0.5 rounded bg-slate-700 hover:bg-slate-600 cursor-pointer">
          {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
          <span>{copied ? "Đã chép" : "Chép"}</span>
        </button>
      </div>
      <pre className="p-3 overflow-x-auto text-xs leading-relaxed text-slate-100 font-mono">
        <code>
          <HighlightedCode code={code} />
        </code>
      </pre>
    </div>
  );
};
