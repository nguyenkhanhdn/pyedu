#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Sinh src/data/problems/algoExtras.ts cho phần "Luyện Giải Đề Thuật Toán".

Vấn đề: ~170/197 bài có starterCode chính là lời giải đầy đủ (học sinh nhận sẵn đáp án).
Giải pháp:
  1. Lấy starterCode cũ (sửa lỗi chuỗi "\\n" bị xuống dòng thật) làm BÀI MẪU nếu nó đạt toàn bộ test.
  2. Các bài còn lại dùng lời giải viết tay trong extra_solutions.py.
  3. Sinh MÃ KHUNG mới (giữ import / nhập dữ liệu / chữ ký hàm, bỏ phần xử lý) cho những bài từng bị lộ đáp án.
  4. Kiểm chứng: bài mẫu đạt 100% test, mã khung phải KHÔNG đạt hết test và biên dịch được.
Chạy:  npx tsx scripts/algo/dump_problems.ts /tmp/p.json && python3 scripts/algo/build_algo_data.py /tmp/p.json
"""
import ast, json, os, re, subprocess, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from extra_solutions import SOLUTIONS as EXTRA, TEST_INPUT_FIXES

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
OUT = os.path.join(ROOT, "src/data/problems/algoExtras.ts")

def norm(s):
    return "\n".join(l.rstrip() for l in s.strip().replace("\r", "").split("\n"))

def run(code, stdin):
    try:
        p = subprocess.run([sys.executable, "-c", code], input=stdin, capture_output=True, text=True, timeout=10)
    except subprocess.TimeoutExpired:
        return None
    return p.stdout if p.returncode == 0 else None

def passes_all(code, tests):
    return all((lambda o: o is not None and norm(o) == norm(t["o"]))(run(code, t["i"])) for t in tests)

def repair(code):
    """Sửa chuỗi bị vỡ: "<xuống dòng thật>" -> "\\n"."""
    return re.sub(r'(["\'])\n\1', lambda m: m.group(1) + "\\n" + m.group(1), code)

INPUT_NAMES = {"input"}
def reads_input(node):
    for n in ast.walk(node):
        if isinstance(n, ast.Call):
            f = n.func
            if isinstance(f, ast.Name) and f.id in INPUT_NAMES:
                return True
            if isinstance(f, ast.Attribute) and f.attr in ("readline", "read", "readlines"):
                return True
    return False

def is_literal(node):
    """Chỉ giữ hằng số của đề (chuỗi, danh sách / từ điển có sẵn dữ liệu, tên VIẾT HOA), bỏ biến đếm khởi tạo."""
    try:
        v = ast.literal_eval(node.value)
    except Exception:
        return False
    name = node.targets[0].id if isinstance(node.targets[0], ast.Name) else ""
    if name.isupper():
        return True
    return isinstance(v, (str, list, tuple, dict, set)) and bool(v)

def make_scaffold(code):
    tree = ast.parse(code)
    lines = code.split("\n")
    defined = {n.name for n in tree.body if isinstance(n, ast.FunctionDef)}
    kept, step_comments, dropped = [], [], False
    for node in tree.body:
        seg = "\n".join(lines[node.lineno - 1: node.end_lineno])
        if isinstance(node, (ast.Import, ast.ImportFrom)):
            kept.append(seg)
        elif isinstance(node, (ast.Assign, ast.AnnAssign)) and (reads_input(node) or (isinstance(node, ast.Assign) and is_literal(node))):
            kept.append(seg)
        elif isinstance(node, ast.FunctionDef):
            header = lines[node.lineno - 1]
            kept.append(header + "\n    # TODO: Viết thân hàm ở đây\n    pass\n")
        elif defined and any(isinstance(n, ast.Name) and n.id in defined for n in ast.walk(node)) and not isinstance(node, (ast.For, ast.While, ast.If)):
            kept.append(seg)
        else:
            dropped = True
            for l in lines[node.lineno - 1: node.end_lineno]:
                st = l.strip()
                if st.startswith("#"):
                    step_comments.append(st.lstrip("# ").strip())
    # lấy cả chú thích đứng riêng giữa các câu lệnh
    body_lines = set()
    for node in tree.body:
        body_lines.update(range(node.lineno, node.end_lineno + 1))
    todo = ["# TODO: Viết code xử lý và in kết quả ở đây"]
    seen = set()
    for c in step_comments:
        if c and c not in seen and not c.upper().startswith("TODO"):
            seen.add(c)
            todo.append("#   - " + c)
    out = "\n".join(kept)
    if dropped or not kept:
        out = (out + "\n\n" if out else "") + "\n".join(todo)
    return out.rstrip() + "\n"

def main(dump):
    problems = json.load(open(dump))
    solutions, starters, test_fixes, report = {}, {}, {}, {"own": 0, "extra": 0, "scaffold": 0}
    for p in problems:
        pid, tests = p["id"], [dict(t) for t in p["tests"]]
        for (fid, idx), val in TEST_INPUT_FIXES.items():
            if fid == pid:
                tests[idx]["i"] = val
                test_fixes.setdefault(pid, {})[idx] = val
        old = p["starter"]
        fixed = repair(old)
        if pid in EXTRA:
            sol = EXTRA[pid]
            assert passes_all(sol, tests), "Bài mẫu viết tay không đạt test: " + pid
            solutions[pid] = sol
            report["extra"] += 1
        elif passes_all(fixed, tests):
            solutions[pid] = fixed.rstrip() + "\n"
            sc = make_scaffold(fixed)
            ast.parse(sc)                                  # phải biên dịch được
            assert not passes_all(sc, tests), "Mã khung vẫn đạt toàn bộ test (lộ đáp án): " + pid
            starters[pid] = sc
            report["scaffold"] += 1
        else:
            raise SystemExit("Không có bài mẫu hợp lệ cho " + pid)
    ts = ['// TỰ SINH bởi scripts/algo/build_algo_data.py — không sửa tay.',
          '// Bài mẫu đã kiểm thử đạt 100% test; mã khung thay cho starterCode từng bị lộ đáp án.', '']
    ts.append("export const ALGO_SAMPLE_SOLUTIONS: Record<string, string> = %s;\n" % json.dumps(solutions, ensure_ascii=False, indent=1))
    ts.append("export const ALGO_STARTER_OVERRIDES: Record<string, string> = %s;\n" % json.dumps(starters, ensure_ascii=False, indent=1))
    ts.append("export const ALGO_TEST_INPUT_FIXES: Record<string, Record<number, string>> = %s;\n" % json.dumps(test_fixes, ensure_ascii=False, indent=1))
    open(OUT, "w", encoding="utf-8").write("\n".join(ts))
    print("OK:", len(solutions), "bài mẫu |", report, "| test sửa:", test_fixes)

if __name__ == "__main__":
    main(sys.argv[1])
