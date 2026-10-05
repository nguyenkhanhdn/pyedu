#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Sinh Sotay.html (Sổ Tay Python Toàn Diện) từ nội dung khai báo trong sotay_content_*.py.

- Mỗi ví dụ được CHẠY THẬT bằng Python 3 để lấy kết quả (không viết tay output).
- Code được tô màu cú pháp sẵn trong HTML nên trang chạy offline, không cần thư viện ngoài.
Chạy:  python3 scripts/build_sotay.py
"""
import html, os, re, subprocess, sys, tempfile
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from sotay_content_1 import T1
from sotay_content_2 import T2, T3
from sotay_content_3 import T4, INDEX, ERRORS, CONTEST

from sotay_content_5 import T5 as _T5
from sotay_content_ops import LIST_TOPIC, DICT_TOPIC
from sotay_content_ops2 import STR_TOPIC, TUPLE_TOPIC, SET_TOPIC
from sotay_content_5b import T2_EXTRA, T5_NEW, ORDER5

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUTPUTS = [os.path.join(ROOT, p) for p in ("Sotay.html", "public/Sotay.html", "public/sotay.html")]

LEVELS = {
    1: ("Cấp 1", "Cơ bản", "Làm quen: in, biến, nhập xuất, rẽ nhánh, vòng lặp"),
    2: ("Cấp 2", "Cấu trúc dữ liệu", "Chuỗi, list, tuple, set, dict, ma trận"),
    3: ("Cấp 3", "Hàm & xử lý lỗi", "Hàm, đệ quy, try/except, tệp"),
    4: ("Cấp 4", "Nâng cao", "Comprehension, lambda, thư viện, class"),
    5: ("Cấp 5", "Thuật toán", "Khái niệm → giải thuật → mã mẫu: vét cạn, số học, sắp xếp, DP, đồ thị"),
}
_all5 = {t["id"]: t for t in _T5 + T5_NEW}
T5 = [_all5[i] for i in ORDER5]
assert len(T5) == len(_all5), "ORDER5 thiếu/thừa chủ đề"
_swap = {"list": [LIST_TOPIC], "dict": [DICT_TOPIC], "str": [STR_TOPIC], "tupleset": [TUPLE_TOPIC, SET_TOPIC]}
T2 = [x for t in T2 for x in _swap.get(t["id"], [t])]
TOPICS = T1 + T2 + T2_EXTRA + T3 + T4 + T5

# ------------------------------------------------------------------ tô màu cú pháp
KEYWORDS = set("""False None True and as assert async await break class continue def del elif else except finally for from global if import in is lambda nonlocal not or pass raise return try while with yield""".split())
BUILTINS = set("""print input len range int float str bool list dict set tuple sum min max abs round sorted reversed enumerate zip map filter all any open type isinstance repr id chr ord bin hex oct divmod pow next iter format super object frozenset bytes complex""".split())
LIBS = set("""math random sys itertools collections heapq bisect functools datetime os re json time string statistics Counter deque defaultdict permutations combinations product lru_cache heappush heappop bisect_left bisect_right stdin""".split())
TOKEN = re.compile(r"""
  (?P<cm>\#[^\n]*)
 |(?P<str>(?:[fFrRbBuU]{1,2})?(?:\"\"\"[\s\S]*?\"\"\"|'''[\s\S]*?'''|"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'))
 |(?P<dec>@[A-Za-z_][\w.]*)
 |(?P<num>\b\d[\d_]*(?:\.\d+)?(?:[eE][+-]?\d+)?\b)
 |(?P<id>[A-Za-z_]\w*)
 |(?P<op>[+\-*/%=<>!&|^~]+)
""", re.X)

def esc(s):
    return html.escape(s, quote=False)

def attr(s):
    """Thoát giá trị đặt trong thuộc tính HTML (có cả dấu nháy kép và xuống dòng)."""
    return html.escape(" ".join(s.split()), quote=True)

def highlight(code):
    out, pos, prev_word, prev_char = [], 0, "", ""
    for m in TOKEN.finditer(code):
        out.append(esc(code[pos:m.start()]))
        pos = m.end()
        kind, text = m.lastgroup, m.group()
        before = code[:m.start()].rstrip(" \t")
        after = code[m.end():m.end() + 1]
        if kind == "id":
            if text in KEYWORDS:
                cls = "kw"
            elif prev_word == "def":
                cls = "fn"
            elif prev_word == "class":
                cls = "cls"
            elif before.endswith("."):
                cls = "mt" if after == "(" else ("lib" if text in LIBS else "")
            elif prev_word in ("import", "from") or text in LIBS:
                cls = "lib"
            elif text in BUILTINS:
                cls = "bi"
            elif after == "(":
                cls = "fc"
            else:
                cls = ""
            prev_word = text
        else:
            cls = kind
            prev_word = ""
        out.append('<span class="t-%s">%s</span>' % (cls, esc(text)) if cls else esc(text))
    out.append(esc(code[pos:]))
    return "".join(out)

def inline(text):
    """`code` -> mã tô màu, **đậm** -> chữ đậm; còn lại thoát HTML."""
    parts = re.split(r"(`[^`]+`|\*\*.+?\*\*)", text)
    res = []
    for p in parts:
        if p.startswith("`") and p.endswith("`") and len(p) > 2:
            res.append('<code class="ic">%s</code>' % highlight(p[1:-1]))
        elif p.startswith("**") and p.endswith("**") and len(p) > 4:
            res.append("<strong>%s</strong>" % inline(p[2:-2]))
        else:
            res.append(esc(p))
    return "".join(res)

def plain(text):
    return re.sub(r"[`*]", "", text)

# ------------------------------------------------------------------ chạy ví dụ
_WORKDIR = None   # thư mục làm việc dùng chung cho các ví dụ trong cùng một chủ đề (ví dụ đọc/ghi tệp)

def run_example(code, stdin=""):
    r = subprocess.run([sys.executable, "-c", code], input=stdin, capture_output=True, text=True, timeout=20, cwd=_WORKDIR)
    if r.returncode != 0:
        raise SystemExit("LỖI khi chạy ví dụ:\n%s\n--- stderr ---\n%s" % (code, r.stderr))
    return r.stdout.rstrip("\n")

# ------------------------------------------------------------------ dựng HTML
def render_block(b):
    kind = b[0]
    if kind == "p":
        return '<div class="blk" data-text="%s"><p>%s</p></div>' % (attr(plain(b[1]).lower()), inline(b[1]))
    if kind == "h":
        icons = {"concept": "📖", "idea": "🧩", "code": "💻", "op": "🔧"}
        return '<div class="blk phase ph-%s" data-text="%s"><span>%s</span> %s</div>' % (b[1], attr(plain(b[2]).lower()), icons[b[1]], esc(b[2]))
    if kind == "steps":
        items = "".join("<li>%s</li>" % inline(i) for i in b[1])
        return '<div class="blk" data-text="%s"><ol class="steps">%s</ol></div>' % (attr(plain(" ".join(b[1])).lower()), items)
    if kind == "tip" or kind == "warn":
        icon, label = ("💡", "Mẹo") if kind == "tip" else ("⚠️", "Lưu ý")
        return '<div class="blk %s-box" data-text="%s"><b>%s %s:</b> %s</div>' % (kind, attr(plain(b[1]).lower()), icon, label, inline(b[1]))
    if kind == "list":
        items = "".join("<li>%s</li>" % inline(i) for i in b[1])
        return '<div class="blk" data-text="%s"><ul>%s</ul></div>' % (attr(plain(" ".join(b[1])).lower()), items)
    if kind == "table":
        heads = "".join("<th>%s</th>" % esc(h) for h in b[1])
        rows = "".join("<tr>%s</tr>" % "".join("<td>%s</td>" % inline(c) for c in r) for r in b[2])
        txt = plain(" ".join(b[1] + [c for r in b[2] for c in r])).lower()
        return '<div class="blk table-wrap" data-text="%s"><table><thead><tr>%s</tr></thead><tbody>%s</tbody></table></div>' % (attr(txt), heads, rows)
    if kind == "ex":
        _, title, code, opt = b
        out = run_example(code, opt.get("stdin", ""))
        stdin_html = ""
        if opt.get("stdin"):
            stdin_html = '<div class="stdin"><span>Nhập vào:</span><pre>%s</pre></div>' % esc(opt["stdin"])
        out_html = '<div class="output"><span class="out-label">▶ Kết quả</span><pre>%s</pre></div>' % (esc(out) if out else "<i>(không in gì)</i>")
        txt = (title + " " + code + " " + out).lower()
        return ('<div class="blk example" data-text="%s"><div class="ex-title"><span>%s</span>'
                '<button class="copy" onclick="copyCode(this)" title="Chép code">📋 Chép</button></div>'
                '<pre class="code"><code>%s</code></pre>%s%s</div>') % (attr(txt), esc(title), highlight(code), stdin_html, out_html)
    raise ValueError(kind)

def render_topic(i, t):
    global _WORKDIR
    lv = LEVELS[t["level"]]
    with tempfile.TemporaryDirectory() as d:
        _WORKDIR = d
        blocks = "".join(render_block(b) for b in t["blocks"])
    title_txt = (t["title"] + " " + plain(t["summary"])).lower()
    return ('<section class="topic" id="%s" data-level="%d" data-title="%s">'
            '<header class="topic-head"><span class="lv lv%d">%s</span><h2><span class="num">%d.</span> %s</h2></header>'
            '<p class="summary">%s</p><div class="topic-body">%s</div></section>') % (
        t["id"], t["level"], attr(title_txt), t["level"], lv[0], i, esc(t["title"]), inline(t["summary"]), blocks)

def build():
    topics_html, toc_html = [], []
    cur = 0
    for i, t in enumerate(TOPICS, 1):
        topics_html.append(render_topic(i, t))
        if t["level"] != cur:
            cur = t["level"]
            lv = LEVELS[cur]
            toc_html.append('<li class="toc-group" data-level="%d">%s · %s</li>' % (cur, lv[0], lv[1]))
        toc_html.append('<li class="toc-item" data-level="%d"><a href="#%s" data-id="%s"><span class="n">%d</span>%s</a></li>' % (cur, t["id"], t["id"], i, esc(t["title"])))
    toc_html.append('<li class="toc-group" data-level="0">Tra cứu nhanh</li>')
    toc_html.append('<li class="toc-item" data-level="0"><a href="#az" data-id="az"><span class="n">A</span>Bảng tra A–Z</a></li>')
    toc_html.append('<li class="toc-item" data-level="0"><a href="#errors" data-id="errors"><span class="n">!</span>Lỗi thường gặp</a></li>')
    toc_html.append('<li class="toc-item" data-level="0"><a href="#contest" data-id="contest"><span class="n">★</span>Mẹo thi đấu</a></li>')

    title_of = {t["id"]: t["title"] for t in TOPICS}
    kinds = list(dict.fromkeys(k for _, k, *_ in INDEX))   # giữ thứ tự xuất hiện: hàm, từ khóa, toán tử, str, list...
    rank = {k: i for i, k in enumerate(kinds)}
    az_rows = []
    for name, kind, desc, ex, tid in sorted(INDEX, key=lambda r: rank[r[1]]):   # sắp xếp ổn định theo loại
        txt = (name + " " + kind + " " + desc + " " + ex).lower()
        az_rows.append('<tr class="az-row" data-kind="%s" data-text="%s"><td><code class="ic">%s</code></td><td><span class="kind">%s</span></td><td>%s</td><td><code class="ic">%s</code></td><td><a href="#%s">%s ↗</a></td></tr>' % (
            attr(kind), attr(txt), highlight(name), esc(kind), inline(desc), highlight(ex), tid, esc(title_of[tid])))
    kind_opts = "".join('<option value="%s">%s</option>' % (esc(k), esc(k)) for k in kinds)

    err_rows = "".join('<tr class="err-row" data-text="%s"><td>%s</td><td>%s</td><td>%s</td></tr>' % (
        attr(plain(" ".join(e)).lower()), inline(e[0]), inline(e[1]), inline(e[2])) for e in ERRORS)
    contest = "".join("<li>%s</li>" % inline(c) for c in CONTEST)

    roadmap = "".join(
        '<a class="road rd%d" href="#%s"><b>%s · %s</b><span>%s</span></a>' % (
            lv, next(t["id"] for t in TOPICS if t["level"] == lv), LEVELS[lv][0], LEVELS[lv][1], LEVELS[lv][2])
        for lv in LEVELS)
    pills = '<button class="pill active" data-level="all">Tất cả</button>' + "".join(
        '<button class="pill" data-level="%d">%s · %s</button>' % (lv, LEVELS[lv][0], LEVELS[lv][1]) for lv in LEVELS) + \
        '<button class="pill" data-level="ref">Tra cứu nhanh</button>'

    page = TEMPLATE
    for k, v in {
        "%%TOPICS%%": "\n".join(topics_html), "%%TOC%%": "\n".join(toc_html), "%%AZROWS%%": "\n".join(az_rows),
        "%%KINDOPTS%%": kind_opts, "%%ERRROWS%%": err_rows, "%%CONTEST%%": contest, "%%ROADMAP%%": roadmap,
        "%%PILLS%%": pills, "%%COUNT%%": str(len(TOPICS)), "%%EXCOUNT%%": str(sum(1 for t in TOPICS for b in t["blocks"] if b[0] == "ex")),
    }.items():
        page = page.replace(k, v)
    return page

TEMPLATE = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "sotay_template.html"), encoding="utf-8").read()

if __name__ == "__main__":
    page = build()
    for p in OUTPUTS:
        os.makedirs(os.path.dirname(p), exist_ok=True)
        with open(p, "w", encoding="utf-8") as f:
            f.write(page)
    n_ex = sum(1 for t in TOPICS for b in t["blocks"] if b[0] == "ex")
    print("OK: %d chủ đề, %d ví dụ đã chạy thật, %d mục tra nhanh -> %d tệp (%d KB)" % (len(TOPICS), n_ex, len(INDEX), len(OUTPUTS), len(page) // 1024))
