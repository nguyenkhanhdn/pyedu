import React from "react";

// Văn bản đề bài / lý thuyết: `code` → ô mã, **từ khóa** → tô nổi, dòng bắt đầu bằng "- " → danh sách.

const CODE_CLASS =
  "px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 font-mono text-[0.92em] font-semibold border border-indigo-100 break-words";
const CODE_IN_BOLD_CLASS =
  "px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 font-mono text-[0.92em] font-semibold border border-amber-200 break-words";

export const RichInline: React.FC<{ text: string; inBold?: boolean }> = ({ text, inBold = false }) => {
  const parts = text.split(/(\*\*.+?\*\*|`[^`]+`)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.length > 4 && part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="font-bold text-slate-900 bg-amber-100/80 px-1 rounded">
              <RichInline text={part.slice(2, -2)} inBold />
            </strong>
          );
        }
        if (part.length > 2 && part.startsWith("`") && part.endsWith("`")) {
          return (
            <code key={i} className={inBold ? CODE_IN_BOLD_CLASS : CODE_CLASS}>
              {part.slice(1, -1)}
            </code>
          );
        }
        return <React.Fragment key={i}>{part}</React.Fragment>;
      })}
    </>
  );
};

type Block =
  | { kind: "p"; text: string }
  | { kind: "ul"; items: { text: string; nested: boolean }[] }
  | { kind: "ol"; items: string[] }
  | { kind: "code"; lines: string[] };

const BULLET = /^(\s*)[-+•]\s+(.*)$/;
const NUMBERED = /^\s*\d+[.)]\s+(.*)$/;
const WHOLE_CODE = /^`([^`]+)`$/;

const parseBlocks = (text: string): Block[] => {
  const blocks: Block[] = [];
  for (const raw of text.split("\n")) {
    const line = raw.replace(/\s+$/, "");
    if (!line.trim()) continue;
    const bullet = line.match(BULLET);
    const numbered = line.match(NUMBERED);
    const whole = line.trim().match(WHOLE_CODE);
    const last = blocks[blocks.length - 1];
    if (bullet) {
      const item = { text: bullet[2], nested: bullet[1].length >= 2 };
      if (last?.kind === "ul") last.items.push(item);
      else blocks.push({ kind: "ul", items: [item] });
    } else if (numbered) {
      if (last?.kind === "ol") last.items.push(numbered[1]);
      else blocks.push({ kind: "ol", items: [numbered[1]] });
    } else if (whole) {
      if (last?.kind === "code") last.lines.push(whole[1]);
      else blocks.push({ kind: "code", lines: [whole[1]] });
    } else {
      blocks.push({ kind: "p", text: line.trim() });
    }
  }
  return blocks;
};

export const RichText: React.FC<{ text: string; className?: string }> = ({ text, className = "" }) => {
  const blocks = parseBlocks(text || "");
  return (
    <div className={`space-y-1.5 leading-relaxed ${className}`}>
      {blocks.map((b, i) => {
        if (b.kind === "ul") {
          return (
            <ul key={i} className="space-y-1">
              {b.items.map((it, j) => (
                <li key={j} className={`flex items-start gap-2 ${it.nested ? "ml-4" : ""}`}>
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 mt-[0.45em] flex-shrink-0" />
                  <span className="min-w-0">
                    <RichInline text={it.text} />
                  </span>
                </li>
              ))}
            </ul>
          );
        }
        if (b.kind === "ol") {
          return (
            <ol key={i} className="space-y-1">
              {b.items.map((it, j) => (
                <li key={j} className="flex items-start gap-2">
                  <span className="h-5 w-5 rounded-full bg-indigo-100 text-indigo-700 text-[11px] font-bold flex items-center justify-center flex-shrink-0">
                    {j + 1}
                  </span>
                  <span className="min-w-0">
                    <RichInline text={it} />
                  </span>
                </li>
              ))}
            </ol>
          );
        }
        if (b.kind === "code") {
          return (
            <div key={i} className="rounded-xl bg-slate-900 px-3 py-2 font-mono text-[11px] text-emerald-300 overflow-x-auto">
              {b.lines.map((l, j) => (
                <pre key={j} className="whitespace-pre">{l}</pre>
              ))}
            </div>
          );
        }
        return (
          <p key={i}>
            <RichInline text={b.text} />
          </p>
        );
      })}
    </div>
  );
};
