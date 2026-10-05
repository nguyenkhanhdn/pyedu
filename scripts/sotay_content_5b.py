# -*- coding: utf-8 -*-
# Bổ sung: chủ đề Cấp 2 (Ma trận) và các chủ đề Cấp 5 (vét cạn, quay lui, cơ số, chia để trị, ngăn xếp/hàng đợi, xâu...)
from sotay_content_5 import H1, H2, H3

T2_EXTRA = [
dict(id="matrix", level=2, title="Ma trận (list 2 chiều)", summary="Bảng số hàng × cột được lưu bằng **list của các list**: `m[i][j]` là ô ở hàng `i`, cột `j` (đếm từ 0).",
 blocks=[
  ("ex", "Tạo và truy cập ma trận", "m = [[1, 2, 3],\n     [4, 5, 6],\n     [7, 8, 9]]\nprint(m[0][2])          # hàng 0, cột 2\nprint(len(m), len(m[0]))  # số hàng, số cột", {}),
  ("ex", "Duyệt từng ô bằng hai vòng for", "m = [[1, 2, 3], [4, 5, 6]]\nfor i in range(len(m)):\n    for j in range(len(m[0])):\n        print(m[i][j], end=\" \")\n    print()               # xuống dòng sau mỗi hàng", {}),
  ("ex", "Tổng từng hàng, từng cột, đường chéo chính", "m = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]\nprint([sum(h) for h in m])                        # tổng hàng\nprint([sum(h[j] for h in m) for j in range(3)])   # tổng cột\nprint(sum(m[i][i] for i in range(3)))             # đường chéo chính", {}),
  ("ex", "Đọc ma trận từ input", "n, k = map(int, input().split())\nm = [list(map(int, input().split())) for _ in range(n)]\nprint(m)", {"stdin": "2 3\n1 2 3\n4 5 6"}),
  ("warn", "Tạo ma trận 0 bằng `[[0] * c] * r` là **sai**: mọi hàng dùng chung một list. Hãy viết `[[0] * c for _ in range(r)]`."),
 ]),
]

T5_NEW = [
dict(id="scan", level=5, title="Duyệt dãy: tổng, đếm, max/min", summary="Thuật toán cơ bản nhất: **một vòng lặp** đi qua dãy và cập nhật vài biến trạng thái.",
 blocks=[
  H1(),
  ("p", "Rất nhiều bài toán chỉ là **duyệt một lần** qua dãy rồi ghi nhớ thông tin cần thiết: tổng, số phần tử thỏa điều kiện, giá trị lớn nhất/nhỏ nhất, vị trí xuất hiện… Độ phức tạp `O(N)`."),
  H2(),
  ("steps", [
    "Khởi tạo biến trạng thái **trước** vòng lặp (`tong = 0`, `dem = 0`, `max_v = a[0]`).",
    "Duyệt từng phần tử `x`; nếu thỏa điều kiện thì cập nhật biến.",
    "Sau vòng lặp, biến trạng thái chứa đáp án.",
  ]),
  ("tip", "Khởi tạo `max_v` bằng **phần tử đầu tiên** (không phải 0) để đúng cả khi mọi số đều âm."),
  H3(),
  ("ex", "Tổng, đếm, trung bình", "a = [4, 9, 2, 7, 5]\ntong = 0\ndem_chan = 0\nfor x in a:\n    tong += x\n    if x % 2 == 0:\n        dem_chan += 1\nprint(tong, dem_chan, tong / len(a))", {}),
  ("ex", "Tìm max, min và vị trí của max", "a = [4, 9, 2, 7, 5]\nmax_v, vt = a[0], 0\nmin_v = a[0]\nfor i in range(1, len(a)):\n    if a[i] > max_v:\n        max_v, vt = a[i], i\n    if a[i] < min_v:\n        min_v = a[i]\nprint(max_v, vt, min_v)", {}),
  ("ex", "Tìm số lớn thứ hai (không dùng sort)", "a = [4, 9, 2, 7, 5]\nm1 = m2 = float(\"-inf\")\nfor x in a:\n    if x > m1:\n        m1, m2 = x, m1\n    elif x > m2:\n        m2 = x\nprint(m2)", {}),
  ("ex", "Đếm tần suất bằng dict", "s = \"abracadabra\"\ntan_suat = {}\nfor c in s:\n    tan_suat[c] = tan_suat.get(c, 0) + 1\nprint(tan_suat)", {}),
 ]),

dict(id="brute", level=5, title="Vét cạn (Brute force)", summary="Thử **mọi phương án** có thể và kiểm tra từng phương án. Dễ nghĩ, luôn đúng, nhưng chỉ chạy nhanh khi số phương án nhỏ.",
 blocks=[
  H1(),
  ("p", "**Vét cạn** (duyệt toàn bộ, *brute force*) là cách giải “thật thà” nhất: liệt kê tất cả khả năng trong **không gian tìm kiếm**, kiểm tra từng khả năng xem có thỏa điều kiện của đề không, rồi ghi nhận đáp án."),
  ("p", "Ưu điểm: **dễ cài đặt, đảm bảo đúng**. Nhược điểm: số phương án có thể bùng nổ — `N` vòng lặp lồng nhau là `O(Nᵏ)`, mọi tập con là `O(2ᴺ)`, mọi hoán vị là `O(N!)`."),
  ("table", ["Bài toán", "Số phương án phải thử", "Dùng được khi"], [
    ["Một biến chạy 1..N", "`N`", "N ≤ 10⁷"],
    ["Hai biến lồng nhau", "`N²`", "N ≤ 3000"],
    ["Mọi tập con", "`2ᴺ`", "N ≤ 20"],
    ["Mọi hoán vị", "`N!`", "N ≤ 9–10"],
  ]),
  ("tip", "Luôn làm **bài vét cạn trước**: nó là bản chuẩn để đối chiếu kết quả khi bạn viết thuật toán nhanh hơn."),
  H2(),
  ("steps", [
    "**Xác định không gian tìm kiếm:** cần thử những đại lượng nào, mỗi đại lượng chạy trong khoảng nào?",
    "**Liệt kê** mọi khả năng bằng vòng lặp (lồng nhau) hoặc `itertools`.",
    "**Kiểm tra điều kiện** của đề cho từng khả năng; nếu đúng thì ghi nhận (đếm, in ra, cập nhật tốt nhất).",
    "**Thu hẹp (cắt tỉa)** nếu có thể: giảm khoảng chạy của biến, tính một biến từ các biến còn lại, `break` sớm.",
  ]),
  H3(),
  ("ex", "Bài toán cổ: gà và chó — 36 con, 100 chân", "for ga in range(0, 37):\n    cho = 36 - ga               # cắt tỉa: biết gà thì tính được chó\n    if 2 * ga + 4 * cho == 100:\n        print(\"Gà:\", ga, \"Chó:\", cho)", {}),
  ("ex", "Số Armstrong 3 chữ số (abc = a³ + b³ + c³)", "for n in range(100, 1000):\n    a, b, c = n // 100, n // 10 % 10, n % 10\n    if n == a ** 3 + b ** 3 + c ** 3:\n        print(n, end=\" \")\nprint()", {}),
  ("ex", "Bộ ba Pitago (a ≤ b ≤ c ≤ 30) — ba vòng lặp lồng nhau", "dem = 0\nfor a in range(1, 31):\n    for b in range(a, 31):\n        for c in range(b, 31):\n            if a * a + b * b == c * c:\n                print(a, b, c)\n                dem += 1\nprint(\"Tổng:\", dem)", {}),
  ("ex", "Cùng bài trên, cắt tỉa bớt một vòng lặp", "dem = 0\nfor a in range(1, 31):\n    for b in range(a, 31):\n        c = int((a * a + b * b) ** 0.5)     # tính c thay vì thử\n        if c <= 30 and c * c == a * a + b * b:\n            dem += 1\nprint(\"Tổng:\", dem)", {}),
  ("ex", "Tìm cặp có tổng bằng target: vét cạn O(N²)", "a = [3, 8, 1, 9, 4]\ntarget = 12\nfor i in range(len(a)):\n    for j in range(i + 1, len(a)):\n        if a[i] + a[j] == target:\n            print(a[i], a[j])", {}),
  ("ex", "Vét cạn mọi tập con bằng itertools: tập nào có tổng = S?", "from itertools import combinations\na = [3, 34, 4, 12, 5, 2]\nS = 9\nfor k in range(1, len(a) + 1):\n    for tap in combinations(a, k):\n        if sum(tap) == S:\n            print(tap)", {}),
  ("ex", "Vét cạn mọi tập con bằng mặt nạ bit (2ᴺ)", "a = [3, 34, 4, 12, 5, 2]\nS = 9\nn = len(a)\nso_cach = 0\nfor mask in range(1 << n):                  # mỗi mask là một tập con\n    tong = sum(a[i] for i in range(n) if mask >> i & 1)\n    if tong == S:\n        so_cach += 1\nprint(so_cach)", {}),
 ]),

dict(id="backtrack", level=5, title="Quay lui (Backtracking) & sinh tổ hợp", summary="Vét cạn **thông minh**: xây dựng lời giải từng bước, **bỏ ngay** nhánh chắc chắn sai rồi quay lại thử lựa chọn khác.",
 blocks=[
  H1(),
  ("p", "Khi số lượng vòng lặp lồng nhau không cố định (ví dụ sinh mọi xâu nhị phân dài `n`), ta dùng **đệ quy**. **Quay lui** xây lời giải từng phần: chọn một giá trị cho vị trí hiện tại, đi tiếp vị trí sau; nếu bế tắc hoặc đã xong thì **hủy lựa chọn** (quay lui) để thử giá trị khác."),
  ("p", "Khác vét cạn thuần túy ở chỗ: nếu lời giải *dở dang* đã vi phạm điều kiện thì **dừng sớm** (cắt tỉa), không đi tiếp nhánh đó."),
  H2("Khung chung của quay lui"),
  ("steps", [
    "**Điều kiện dừng:** lời giải đã đủ (`len(cur) == n`) → ghi nhận hoặc in ra.",
    "**Thử từng lựa chọn** cho vị trí hiện tại; bỏ qua lựa chọn vi phạm điều kiện (cắt tỉa).",
    "**Chọn:** đưa lựa chọn vào lời giải dở dang `cur`, gọi đệ quy cho vị trí kế tiếp.",
    "**Bỏ chọn (quay lui):** lấy lựa chọn đó ra khỏi `cur` (`cur.pop()`) để thử lựa chọn khác.",
  ]),
  H3(),
  ("ex", "Sinh mọi xâu nhị phân độ dài n", "n = 3\ncur = []\n\ndef sinh():\n    if len(cur) == n:\n        print(\"\".join(map(str, cur)))\n        return\n    for v in (0, 1):\n        cur.append(v)       # chọn\n        sinh()\n        cur.pop()           # bỏ chọn\n\nsinh()", {}),
  ("ex", "Sinh mọi hoán vị của 1..n", "n = 3\ncur, dung = [], [False] * (n + 1)\n\ndef hoan_vi():\n    if len(cur) == n:\n        print(*cur)\n        return\n    for v in range(1, n + 1):\n        if not dung[v]:     # mỗi số dùng một lần\n            dung[v] = True\n            cur.append(v)\n            hoan_vi()\n            cur.pop()\n            dung[v] = False\n\nhoan_vi()", {}),
  ("ex", "Sinh tổ hợp chập k của 1..n (tăng dần để không trùng)", "n, k = 4, 2\ncur = []\n\ndef to_hop(bat_dau):\n    if len(cur) == k:\n        print(*cur)\n        return\n    for v in range(bat_dau, n + 1):\n        cur.append(v)\n        to_hop(v + 1)\n        cur.pop()\n\nto_hop(1)", {}),
  ("ex", "Bài N quân hậu: đếm số cách đặt n hậu không ăn nhau", "n = 6\ncot, d1, d2 = set(), set(), set()\n\ndef dat(hang):\n    if hang == n:\n        return 1\n    dem = 0\n    for c in range(n):\n        if c in cot or hang - c in d1 or hang + c in d2:\n            continue                   # cắt tỉa: ô bị ăn\n        cot.add(c); d1.add(hang - c); d2.add(hang + c)\n        dem += dat(hang + 1)\n        cot.remove(c); d1.remove(hang - c); d2.remove(hang + c)\n    return dem\n\nprint(dat(0))", {}),
 ]),

dict(id="base", level=5, title="Hệ cơ số: nhị phân, thập lục phân", summary="Đổi số giữa hệ **thập phân** và các hệ cơ số khác (2, 8, 16) bằng phép chia lấy dư.",
 blocks=[
  H1(),
  ("p", "Máy tính lưu mọi thứ bằng **hệ nhị phân** (chỉ chữ số 0 và 1). Ở hệ cơ số `b`, số `d₃d₂d₁d₀` có giá trị `d₃·b³ + d₂·b² + d₁·b¹ + d₀`. Ví dụ `1011₂ = 8 + 0 + 2 + 1 = 11`."),
  ("table", ["Hệ", "Cơ số", "Chữ số", "Tiền tố trong Python"], [
    ["Nhị phân", "2", "0, 1", "`0b1011`"],
    ["Bát phân", "8", "0–7", "`0o17`"],
    ["Thập phân", "10", "0–9", "`17`"],
    ["Thập lục phân", "16", "0–9, A–F", "`0x1F`"],
  ]),
  H2("Đổi thập phân → cơ số b"),
  ("steps", [
    "Chia `n` cho `b`, ghi lại **số dư**; thay `n` bằng thương.",
    "Lặp đến khi `n = 0`.",
    "Các số dư **đọc ngược** (từ cuối lên đầu) chính là kết quả.",
  ]),
  ("table", ["n", "n // 2", "dư"], [["13", "6", "1"], ["6", "3", "0"], ["3", "1", "1"], ["1", "0", "1"]]),
  ("p", "Đọc ngược cột dư: `1101` → `13 = 1101₂`."),
  H2("Đổi cơ số b → thập phân"),
  ("p", "Duyệt từng chữ số từ trái sang phải: `kq = kq * b + chu_so`."),
  H3(),
  ("ex", "Thập phân → nhị phân (tự cài đặt)", "n = 13\ns = \"\"\nwhile n > 0:\n    s = str(n % 2) + s      # thêm số dư vào đầu → tự đọc ngược\n    n //= 2\nprint(s)", {}),
  ("ex", "Đổi sang cơ số bất kỳ ≤ 16", "def doi_co_so(n, b):\n    if n == 0:\n        return \"0\"\n    kt = \"0123456789ABCDEF\"\n    s = \"\"\n    while n > 0:\n        s = kt[n % b] + s\n        n //= b\n    return s\n\nprint(doi_co_so(255, 2), doi_co_so(255, 8), doi_co_so(255, 16))", {}),
  ("ex", "Cơ số b → thập phân", "def ve_thap_phan(s, b):\n    kq = 0\n    for c in s:\n        kq = kq * b + int(c, 16)   # int(c, 16) đọc được cả chữ A-F\n    return kq\n\nprint(ve_thap_phan(\"1101\", 2), ve_thap_phan(\"FF\", 16))", {}),
  ("ex", "Dùng hàm có sẵn: bin, hex, oct, int(s, cơ số)", "print(bin(13), oct(13), hex(255))\nprint(int(\"1101\", 2), int(\"ff\", 16))\nprint(format(13, \"b\"), format(255, \"X\"))", {}),
 ]),

dict(id="divide", level=5, title="Chia để trị & sắp xếp trộn", summary="Chia bài toán thành các phần **nhỏ hơn, độc lập**, giải từng phần rồi **gộp** kết quả.",
 blocks=[
  H1(),
  ("p", "**Chia để trị** (*divide and conquer*) gồm ba bước: **Chia** bài toán thành các bài con nhỏ hơn cùng dạng; **Trị** (giải) từng bài con, thường bằng đệ quy; **Gộp** các kết quả lại. Bài con nhỏ đến mức hiển nhiên thì dừng (trường hợp cơ sở)."),
  ("p", "Khác quy hoạch động: các bài con ở đây **không gối nhau** nên không cần lưu lại. Ví dụ tiêu biểu: tìm kiếm nhị phân, **sắp xếp trộn** `O(N log N)`, lũy thừa nhanh `O(log n)`."),
  H2("Sắp xếp trộn (Merge Sort)"),
  ("steps", [
    "**Chia:** cắt dãy làm hai nửa.",
    "**Trị:** sắp xếp mỗi nửa bằng chính thuật toán này (dãy 0 hoặc 1 phần tử thì đã xếp sẵn).",
    "**Gộp:** trộn hai nửa đã xếp thành một dãy xếp, bằng hai con trỏ — luôn lấy phần tử nhỏ hơn ở đầu hai nửa.",
  ]),
  H2("Lũy thừa nhanh"),
  ("p", "`xⁿ = (xⁿ/²)²` nếu `n` chẵn, `xⁿ = x · xⁿ⁻¹` nếu `n` lẻ → chỉ cần `O(log n)` phép nhân thay vì `n`."),
  H3(),
  ("ex", "Sắp xếp trộn — O(N log N)", "def merge_sort(a):\n    if len(a) <= 1:\n        return a\n    giua = len(a) // 2\n    trai = merge_sort(a[:giua])\n    phai = merge_sort(a[giua:])\n    kq, i, j = [], 0, 0\n    while i < len(trai) and j < len(phai):    # gộp hai nửa đã xếp\n        if trai[i] <= phai[j]:\n            kq.append(trai[i]); i += 1\n        else:\n            kq.append(phai[j]); j += 1\n    return kq + trai[i:] + phai[j:]\n\nprint(merge_sort([5, 2, 9, 1, 7, 3]))", {}),
  ("ex", "Lũy thừa nhanh (có lấy dư)", "def luy_thua(x, n, mod):\n    if n == 0:\n        return 1\n    nua = luy_thua(x, n // 2, mod)\n    kq = nua * nua % mod\n    if n % 2 == 1:\n        kq = kq * x % mod\n    return kq\n\nprint(luy_thua(2, 10, 1000007))\nprint(luy_thua(3, 10 ** 18, 10 ** 9 + 7))\nprint(pow(3, 10 ** 18, 10 ** 9 + 7))     # hàm có sẵn cho cùng kết quả", {}),
  ("ex", "Tìm số lớn nhất bằng chia để trị", "def tim_max(a, l, r):\n    if l == r:\n        return a[l]\n    m = (l + r) // 2\n    return max(tim_max(a, l, m), tim_max(a, m + 1, r))\n\na = [4, 9, 2, 7, 5]\nprint(tim_max(a, 0, len(a) - 1))", {}),
 ]),

dict(id="stackqueue", level=5, title="Ngăn xếp (Stack) & Hàng đợi (Queue)", summary="Hai cấu trúc dữ liệu cơ bản: **vào sau ra trước** (LIFO) và **vào trước ra trước** (FIFO).",
 blocks=[
  H1(),
  ("p", "**Ngăn xếp** (stack) giống chồng đĩa: đặt thêm và lấy ra đều ở **trên cùng** — *vào sau, ra trước* (LIFO). **Hàng đợi** (queue) giống xếp hàng mua vé: người đến trước được phục vụ trước — *vào trước, ra trước* (FIFO)."),
  ("table", ["Cấu trúc", "Thêm", "Lấy ra", "Trong Python"], [
    ["Ngăn xếp", "`push` — thêm cuối", "`pop` — lấy cuối", "`list`: `append()` / `pop()`"],
    ["Hàng đợi", "`enqueue` — thêm cuối", "`dequeue` — lấy đầu", "`deque`: `append()` / `popleft()`"],
  ]),
  ("warn", "Không dùng `list.pop(0)` làm hàng đợi: nó `O(N)`. Hãy dùng `collections.deque` (`popleft()` là `O(1)`)."),
  H2("Kiểm tra dấu ngoặc hợp lệ bằng stack"),
  ("steps", [
    "Duyệt từng ký tự. Gặp ngoặc **mở** → `push` vào stack.",
    "Gặp ngoặc **đóng** → stack phải khác rỗng và đỉnh stack phải là ngoặc mở **tương ứng**, rồi `pop`; nếu không → sai.",
    "Hết chuỗi: hợp lệ khi và chỉ khi stack **rỗng**.",
  ]),
  H3(),
  ("ex", "Ngăn xếp bằng list", "st = []\nst.append(1)\nst.append(2)\nst.append(3)\nprint(st.pop())      # 3 — vào sau ra trước\nprint(st[-1], len(st))   # xem đỉnh, kích thước", {}),
  ("ex", "Hàng đợi bằng deque", "from collections import deque\nq = deque()\nq.append(\"An\")\nq.append(\"Binh\")\nq.append(\"Chi\")\nprint(q.popleft())   # An — vào trước ra trước\nprint(list(q))", {}),
  ("ex", "Kiểm tra dấu ngoặc hợp lệ", "def hop_le(s):\n    cap = {\")\": \"(\", \"]\": \"[\", \"}\": \"{\"}\n    st = []\n    for c in s:\n        if c in \"([{\":\n            st.append(c)\n        elif c in cap:\n            if not st or st.pop() != cap[c]:\n                return False\n    return not st\n\nprint(hop_le(\"{[()]}\"), hop_le(\"([)]\"), hop_le(\"((\"))", {}),
  ("ex", "Tính biểu thức hậu tố bằng stack", "bt = \"3 4 + 2 *\".split()      # (3 + 4) * 2\nst = []\nfor t in bt:\n    if t in \"+-*\":\n        b, a = st.pop(), st.pop()\n        st.append(a + b if t == \"+\" else a - b if t == \"-\" else a * b)\n    else:\n        st.append(int(t))\nprint(st[0])", {}),
 ]),

dict(id="stralgo", level=5, title="Xử lý xâu: đối xứng, đếm, mã hóa", summary="Các bài toán xâu quen thuộc: **palindrome**, đảo từ, đếm tần suất, anagram, mã hóa Caesar.",
 blocks=[
  H1(),
  ("p", "Xâu là dãy ký tự; hầu hết bài toán xâu quy về **duyệt từng ký tự** kết hợp `dict`/`set`, hoặc dùng phép cắt lát `s[::-1]`. **Palindrome** là xâu đọc xuôi và ngược giống nhau (`\"radar\"`). Hai xâu là **anagram** nếu cùng các chữ cái, chỉ khác thứ tự."),
  H2(),
  ("steps", [
    "**Đối xứng:** chuẩn hóa (chữ thường, bỏ khoảng trắng) rồi so sánh `s == s[::-1]`.",
    "**Đếm tần suất:** duyệt xâu, cộng dồn vào `dict` (hoặc `Counter`).",
    "**Anagram:** hai xâu có cùng bảng tần suất (hoặc cùng `sorted`).",
    "**Caesar:** dịch mỗi chữ cái đi `k` vị trí trong bảng 26 chữ, dùng phép `% 26` để vòng lại.",
  ]),
  H3(),
  ("ex", "Kiểm tra xâu đối xứng (palindrome)", "def doi_xung(s):\n    s = \"\".join(c.lower() for c in s if c.isalnum())   # bỏ dấu cách, dấu câu\n    return s == s[::-1]\n\nprint(doi_xung(\"Radar\"), doi_xung(\"A man, a plan, a canal: Panama\"), doi_xung(\"python\"))", {}),
  ("ex", "Đảo thứ tự các từ & đảo từng từ", "s = \"hoc python that vui\"\nprint(\" \".join(s.split()[::-1]))          # đảo thứ tự từ\nprint(\" \".join(w[::-1] for w in s.split()))   # đảo từng từ", {}),
  ("ex", "Ký tự xuất hiện nhiều nhất", "from collections import Counter\ns = \"abracadabra\"\nc = Counter(s)\nprint(c.most_common(2))", {}),
  ("ex", "Kiểm tra anagram", "def anagram(a, b):\n    return sorted(a.lower()) == sorted(b.lower())\n\nprint(anagram(\"Listen\", \"Silent\"), anagram(\"abc\", \"abd\"))", {}),
  ("ex", "Mã hóa Caesar", "def caesar(s, k):\n    kq = \"\"\n    for c in s:\n        if c.isalpha():\n            goc = ord(\"A\") if c.isupper() else ord(\"a\")\n            kq += chr((ord(c) - goc + k) % 26 + goc)   # % 26 để vòng lại\n        else:\n            kq += c\n    return kq\n\nm = caesar(\"Hello, World\", 3)\nprint(m, caesar(m, -3))", {}),
 ]),
]

# Thứ tự hiển thị của Cấp 5: dễ → khó, từ nền tảng đến kỹ thuật nâng cao
ORDER5 = ["complexity", "scan", "brute", "num", "prime", "base", "sieve", "backtrack", "sorting", "searching",
          "divide", "prefix", "twoptr", "greedy", "dp", "stackqueue", "graph", "stralgo"]
