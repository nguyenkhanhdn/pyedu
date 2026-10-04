import React, { useLayoutEffect, useRef } from "react";
import { HighlightedCode } from "./CodeBlock";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  lineNumbers?: boolean;
}

const FONT: React.CSSProperties = {
  fontFamily: "'JetBrains Mono','SFMono-Regular',Consolas,'Liberation Mono',Menlo,monospace",
  fontSize: 13.5,
  lineHeight: 1.65,
  tabSize: 4,
  letterSpacing: "normal",
  padding: 16,
  margin: 0,
  whiteSpace: "pre",
  wordBreak: "normal"
};

// Trình soạn thảo Python có tô màu cú pháp: textarea trong suốt đặt chồng lên lớp tô màu.
export const CodeEditor: React.FC<CodeEditorProps> = ({ value, onChange, placeholder, className = "", lineNumbers = false }) => {
  const preRef = useRef<HTMLPreElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);
  const taRef = useRef<HTMLTextAreaElement>(null);
  const pendingCaret = useRef<number | null>(null);

  // Đặt lại vị trí con trỏ ngay sau khi React cập nhật giá trị (tránh nhảy con trỏ khi gõ nhanh)
  useLayoutEffect(() => {
    if (pendingCaret.current !== null && taRef.current) {
      taRef.current.selectionStart = taRef.current.selectionEnd = pendingCaret.current;
      pendingCaret.current = null;
    }
  }, [value]);

  const syncScroll = () => {
    if (preRef.current && taRef.current) {
      preRef.current.scrollTop = taRef.current.scrollTop;
      preRef.current.scrollLeft = taRef.current.scrollLeft;
    }
    if (gutterRef.current && taRef.current) {
      gutterRef.current.style.transform = `translateY(${-taRef.current.scrollTop}px)`;
    }
  };

  const insert = (start: number, end: number, text: string, caret: number) => {
    pendingCaret.current = caret;
    onChange(value.slice(0, start) + text + value.slice(end));
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const ta = e.currentTarget;
    const { selectionStart: start, selectionEnd: end } = ta;
    if (e.key === "Tab") {
      e.preventDefault();
      insert(start, end, "    ", start + 4);
    } else if (e.key === "Enter") {
      // Giữ thụt lề của dòng trước; thêm 4 dấu cách sau dòng kết thúc bằng ":"
      const lineStart = value.lastIndexOf("\n", start - 1) + 1;
      const line = value.slice(lineStart, start);
      const indent = (line.match(/^[ \t]*/) || [""])[0];
      const extra = line.trimEnd().endsWith(":") ? "    " : "";
      e.preventDefault();
      const text = "\n" + indent + extra;
      insert(start, end, text, start + text.length);
    }
  };

  const textStyle = lineNumbers ? { ...FONT, paddingLeft: 56 } : FONT;
  const lineCount = value.split("\n").length;
  return (
    <div className={`absolute inset-0 bg-slate-950 overflow-hidden ${className}`}>
      <pre ref={preRef} aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none text-slate-100" style={textStyle}>
        <HighlightedCode code={value} />
        {"\n"}
      </pre>
      <textarea
        ref={taRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onScroll={syncScroll}
        onKeyDown={onKeyDown}
        wrap="off"
        spellCheck={false}
        autoCapitalize="off"
        autoCorrect="off"
        placeholder={placeholder}
        className="absolute inset-0 w-full h-full resize-none bg-transparent text-transparent focus:outline-none overflow-auto selection:bg-indigo-500/40 placeholder:text-slate-600"
        style={{ ...textStyle, caretColor: "#a5b4fc" }}
      />
      {lineNumbers && (
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-slate-900/80 border-r border-slate-800 overflow-hidden pointer-events-none select-none text-slate-500 text-right">
          <div ref={gutterRef} style={{ ...FONT, paddingLeft: 4, paddingRight: 10 }}>
            {Array.from({ length: lineCount }, (_, i) => i + 1).join("\n")}
          </div>
        </div>
      )}
    </div>
  );
};
