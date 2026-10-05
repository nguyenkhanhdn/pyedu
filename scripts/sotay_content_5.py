# -*- coding: utf-8 -*-
# Cấp 5 (Thuật toán). Mỗi chủ đề đi theo 3 chặng:
#   1) Khái niệm & giải thích  ->  2) Giải thuật (ý tưởng, các bước)  ->  3) Mã nguồn mẫu
# Khối đặc biệt của cấp này: ("h", "concept"|"idea"|"code", tiêu đề chặng)  ("steps", [các bước])

def H1(t="Khái niệm & giải thích"):
    return ("h", "concept", t)
def H2(t="Giải thuật (ý tưởng)"):
    return ("h", "idea", t)
def H3(t="Mã nguồn mẫu"):
    return ("h", "code", t)

T5 = [
dict(id="complexity", level=5, title="Độ phức tạp thuật toán (Big-O)", summary="Thước đo xem thuật toán **chạy nhanh hay chậm** khi dữ liệu lớn dần — kiến thức nền cho mọi bài thuật toán.",
 blocks=[
  H1(),
  ("p", "**Thuật toán** là dãy các bước hữu hạn, rõ ràng để giải một bài toán. Cùng một bài toán có thể có nhiều thuật toán; ta so sánh chúng bằng **độ phức tạp thời gian**: số phép tính cần làm khi dữ liệu có kích thước `N`."),
  ("p", "Ta không đo bằng giây (máy nào cũng khác nhau) mà đếm **số bước theo N** và chỉ giữ thành phần lớn nhất, ký hiệu `O(...)`. Ví dụ `3N + 5` bước → `O(N)`."),
  ("table", ["Độ phức tạp", "Tên gọi", "Ví dụ điển hình", "N = 10⁵ chạy được?"], [
    ["`O(1)`", "Hằng số", "Truy cập `a[i]`, tra `dict`", "Rất nhanh"],
    ["`O(log N)`", "Logarit", "Tìm kiếm nhị phân", "Rất nhanh"],
    ["`O(N)`", "Tuyến tính", "Duyệt một lần qua list", "Nhanh"],
    ["`O(N log N)`", "Tuyến tính-logarit", "`sorted()`, sắp xếp trộn", "Nhanh"],
    ["`O(N²)`", "Bình phương", "Hai vòng `for` lồng nhau", "Chậm (≈10¹⁰ bước)"],
    ["`O(2ᴺ)`", "Mũ", "Duyệt mọi tập con", "Chỉ khi N ≤ 20"],
  ]),
  ("tip", "Quy tắc nhớ: máy chấm thường làm được khoảng **10⁷–10⁸ phép tính** mỗi bài. Từ N và giới hạn đó, suy ra độ phức tạp tối đa được phép."),
  H2(),
  ("steps", [
    "Đọc **giới hạn N** của đề bài.",
    "Đếm số vòng lặp: một vòng qua N phần tử → `O(N)`; hai vòng lồng nhau → `O(N²)`; mỗi bước chia đôi dữ liệu → `O(log N)`.",
    "Nếu ước lượng vượt ~10⁸ → tìm cách giảm: sắp xếp trước, dùng `set`/`dict`, cộng dồn, hai con trỏ…",
  ]),
  H3(),
  ("ex", "O(N): một vòng lặp — đếm số bước", "a = list(range(1000))\nbuoc = 0\nfor x in a:\n    buoc += 1\nprint(buoc)", {}),
  ("ex", "O(N²): hai vòng lồng nhau — số bước bình phương", "n = 100\nbuoc = 0\nfor i in range(n):\n    for j in range(n):\n        buoc += 1\nprint(buoc)", {}),
  ("ex", "O(log N): mỗi bước chia đôi — chỉ ~10 bước cho N = 1000", "n = 1000\nbuoc = 0\nwhile n > 1:\n    n //= 2\n    buoc += 1\nprint(buoc)", {}),
  ("ex", "Cùng bài toán, hai độ phức tạp: kiểm tra có phần tử trùng", "a = [4, 7, 1, 9, 7]\n# O(N^2): so sánh từng cặp\ntrung1 = any(a[i] == a[j] for i in range(len(a)) for j in range(i))\n# O(N): dùng set\ntrung2 = len(set(a)) < len(a)\nprint(trung1, trung2)", {}),
 ]),

dict(id="num", level=5, title="Số học: ước, UCLN, BCNN", summary="Ước và bội, UCLN bằng thuật toán **Euclid**, đếm và liệt kê ước trong `O(√N)`.",
 blocks=[
  H1(),
  ("p", "**Ước** của `n` là số chia hết `n` (`n % d == 0`). **UCLN**(a, b) là ước chung lớn nhất; **BCNN**(a, b) là bội chung nhỏ nhất, tính nhanh bằng công thức `a * b // UCLN`."),
  ("p", "Ước luôn đi **theo cặp**: nếu `d` là ước thì `n // d` cũng là ước. Vì vậy chỉ cần duyệt `d` từ 1 đến `√n`, không cần duyệt đến `n`."),
  H2("Giải thuật Euclid (tìm UCLN)"),
  ("p", "Ý tưởng: `UCLN(a, b) = UCLN(b, a % b)`. Cứ thay `(a, b)` bằng `(b, a % b)` cho đến khi `b = 0`, lúc đó `a` là UCLN."),
  ("table", ["Bước", "a", "b", "a % b"], [
    ["1", "48", "18", "12"], ["2", "18", "12", "6"], ["3", "12", "6", "0"], ["4", "6", "0", "→ UCLN = 6"],
  ]),
  ("steps", [
    "Khi `b != 0`: gán `a, b = b, a % b`.",
    "Khi `b == 0`: dừng, kết quả là `a`.",
    "BCNN = `a * b // UCLN(a, b)`.",
  ]),
  H3(),
  ("ex", "UCLN & BCNN: dùng thư viện và tự cài đặt", "import math\nprint(math.gcd(48, 18))   # UCLN\nprint(math.lcm(4, 6))     # BCNN\n\ndef gcd(a, b):            # Euclid\n    while b:\n        a, b = b, a % b\n    return a\n\ndef lcm(a, b):\n    return a * b // gcd(a, b)\n\nprint(gcd(48, 18), lcm(4, 6))", {}),
  ("ex", "Liệt kê ước của n (duyệt đến √n) — O(√N)", "n = 36\nuoc = []\nd = 1\nwhile d * d <= n:\n    if n % d == 0:\n        uoc.append(d)\n        if d != n // d:        # tránh trùng khi n là số chính phương\n            uoc.append(n // d)\n    d += 1\nprint(sorted(uoc))", {}),
  ("ex", "Số hoàn hảo: tổng các ước thực sự bằng chính nó", "def hoan_hao(n):\n    tong = 1                   # 1 luôn là ước (n > 1)\n    d = 2\n    while d * d <= n:\n        if n % d == 0:\n            tong += d\n            if d != n // d:\n                tong += n // d\n        d += 1\n    return n > 1 and tong == n\n\nprint([n for n in range(2, 500) if hoan_hao(n)])", {}),
  ("ex", "Chữ số: đảo số, đếm chữ số, tổng chữ số", "n = 12345\nprint(int(str(n)[::-1]))             # số đảo ngược\nprint(len(str(n)))                   # số chữ số\nprint(sum(int(c) for c in str(n)))   # tổng chữ số\n\ntong = 0                             # cách không dùng chuỗi\nwhile n > 0:\n    tong += n % 10                   # lấy chữ số cuối\n    n //= 10                         # bỏ chữ số cuối\nprint(tong)", {}),
 ]),

dict(id="prime", level=5, title="Số nguyên tố & phân tích thừa số", summary="Kiểm tra nguyên tố trong `O(√N)`, phân tích một số ra tích các **thừa số nguyên tố**.",
 blocks=[
  H1(),
  ("p", "**Số nguyên tố** là số tự nhiên `> 1` chỉ có đúng hai ước: 1 và chính nó (2, 3, 5, 7, 11…). Mọi số `> 1` đều **phân tích duy nhất** thành tích các số nguyên tố, ví dụ `360 = 2 × 2 × 2 × 3 × 3 × 5`."),
  ("p", "Nếu `n` là hợp số thì nó có ước `d` thỏa `2 ≤ d ≤ √n`. Do đó chỉ cần thử chia cho `d` đến `√n`."),
  H2("Kiểm tra nguyên tố"),
  ("steps", [
    "`n < 2` → không phải số nguyên tố.",
    "Thử `d = 2, 3, …` trong khi `d * d <= n`; nếu có `n % d == 0` → hợp số.",
    "Không tìm được ước nào → là số nguyên tố.",
  ]),
  H2("Phân tích thừa số nguyên tố"),
  ("steps", [
    "Bắt đầu với `d = 2`.",
    "Khi `d * d <= n`: nếu `n % d == 0` thì ghi nhận `d` và chia `n //= d` (lặp lại với cùng `d`); ngược lại tăng `d`.",
    "Kết thúc nếu `n > 1` thì phần còn lại **chính là một số nguyên tố**, ghi nhận nốt.",
  ]),
  H3(),
  ("ex", "Kiểm tra số nguyên tố — O(√N)", "def la_nguyen_to(n):\n    if n < 2:\n        return False\n    d = 2\n    while d * d <= n:\n        if n % d == 0:\n            return False\n        d += 1\n    return True\n\nprint([x for x in range(1, 30) if la_nguyen_to(x)])\nprint(la_nguyen_to(1000000007))", {}),
  ("ex", "Phân tích ra thừa số nguyên tố", "n = 360\nres = []\nd = 2\nwhile d * d <= n:\n    while n % d == 0:\n        res.append(d)\n        n //= d\n    d += 1\nif n > 1:\n    res.append(n)\nprint(res)", {}),
  ("ex", "Đếm số ước từ dạng phân tích (dùng Counter)", "from collections import Counter\nn = 360\nmu = Counter()\nd = 2\nwhile d * d <= n:\n    while n % d == 0:\n        mu[d] += 1\n        n //= d\n    d += 1\nif n > 1:\n    mu[n] += 1\nso_uoc = 1\nfor sm in mu.values():\n    so_uoc *= sm + 1       # n = p1^a1 * p2^a2 ... có (a1+1)(a2+1)... ước\nprint(dict(mu), so_uoc)", {}),
 ]),

dict(id="sieve", level=5, title="Sàng nguyên tố Eratosthenes", summary="Tìm **mọi** số nguyên tố đến N trong `O(N log log N)` — nhanh hơn nhiều so với kiểm tra từng số.",
 blocks=[
  H1(),
  ("p", "Kiểm tra từng số bằng `O(√N)` sẽ chậm khi cần **cả danh sách** nguyên tố đến N lớn (ví dụ 10⁶). **Sàng Eratosthenes** tận dụng một nhận xét: bội của một số nguyên tố chắc chắn là hợp số, nên ta **gạch bỏ** chúng hàng loạt."),
  H2(),
  ("steps", [
    "Tạo mảng `la_nt` gồm `N + 1` giá trị `True`; đặt `la_nt[0] = la_nt[1] = False`.",
    "Với mỗi `p` từ 2 đến `√N`: nếu `la_nt[p]` còn `True` thì `p` là nguyên tố.",
    "Gạch bỏ các bội của `p` bắt đầu từ `p * p` (các bội nhỏ hơn đã bị số nhỏ hơn gạch rồi): `la_nt[p*p], la_nt[p*p+p], …` = `False`.",
    "Cuối cùng, các chỉ số còn `True` chính là số nguyên tố.",
  ]),
  ("table", ["N = 30", "Gạch bỏ bội của", "Còn lại"], [
    ["p = 2", "4, 6, 8, 10, …", "2, 3, 5, 7, 9, 11, …"],
    ["p = 3", "9, 12, 15, …", "2, 3, 5, 7, 11, 13, 17, …"],
    ["p = 5", "25, 30", "2, 3, 5, 7, 11, 13, 17, 19, 23, 29"],
  ]),
  ("tip", "Đánh đổi: sàng tốn **bộ nhớ O(N)** nhưng trả lời `n có nguyên tố không?` trong `O(1)` sau khi sàng xong."),
  H3(),
  ("ex", "Sàng đến N", "def sieve(n):\n    la_nt = [True] * (n + 1)\n    la_nt[0] = la_nt[1] = False\n    for p in range(2, int(n ** 0.5) + 1):\n        if la_nt[p]:\n            for boi in range(p * p, n + 1, p):\n                la_nt[boi] = False\n    return [i for i in range(n + 1) if la_nt[i]]\n\nprint(sieve(50))", {}),
  ("ex", "Đếm số nguyên tố đến 1 000 000", "n = 1000000\nla_nt = [True] * (n + 1)\nla_nt[0] = la_nt[1] = False\nfor p in range(2, int(n ** 0.5) + 1):\n    if la_nt[p]:\n        la_nt[p * p::p] = [False] * len(range(p * p, n + 1, p))   # gạch bằng slicing, nhanh hơn\nprint(sum(la_nt))", {}),
 ]),

dict(id="sorting", level=5, title="Sắp xếp", summary="Hiểu cách các thuật toán sắp xếp cơ bản hoạt động; khi làm bài thật thì dùng `sorted()` / `.sort()` — `O(N log N)`.",
 blocks=[
  H1(),
  ("p", "**Sắp xếp** là đưa các phần tử về thứ tự tăng (hoặc giảm). Sắp xếp là bước tiền xử lý rất mạnh: dữ liệu có thứ tự thì tìm kiếm nhị phân, hai con trỏ, loại trùng… đều dễ dàng hơn."),
  ("table", ["Thuật toán", "Ý tưởng một câu", "Thời gian"], [
    ["Nổi bọt (Bubble)", "Đổi chỗ hai phần tử kề nhau nếu sai thứ tự", "`O(N²)`"],
    ["Chọn (Selection)", "Chọn phần tử nhỏ nhất đặt vào đầu", "`O(N²)`"],
    ["Chèn (Insertion)", "Chèn từng phần tử vào đúng vị trí trong phần đã xếp", "`O(N²)`"],
    ["`sorted()` của Python", "Timsort — tối ưu sẵn", "`O(N log N)`"],
  ]),
  H2("Ý tưởng từng thuật toán"),
  ("steps", [
    "**Nổi bọt:** duyệt từ đầu, so sánh cặp kề `a[j]`, `a[j+1]`; nếu sai thứ tự thì đổi chỗ. Sau mỗi lượt, phần tử lớn nhất “nổi” về cuối.",
    "**Chọn:** ở lượt `i`, tìm phần tử nhỏ nhất trong đoạn `a[i..]` rồi đổi chỗ với `a[i]`.",
    "**Chèn:** lấy `a[i]` làm “quân bài”, dịch các phần tử lớn hơn trong đoạn đã xếp sang phải, rồi đặt quân bài vào chỗ trống.",
  ]),
  H3(),
  ("ex", "Sắp xếp nổi bọt — O(N²)", "a = [5, 2, 9, 1]\nn = len(a)\nfor i in range(n):\n    for j in range(0, n - i - 1):\n        if a[j] > a[j + 1]:\n            a[j], a[j + 1] = a[j + 1], a[j]\nprint(a)", {}),
  ("ex", "Sắp xếp chọn — O(N²)", "a = [5, 2, 9, 1]\nfor i in range(len(a)):\n    vt = i\n    for j in range(i + 1, len(a)):\n        if a[j] < a[vt]:\n            vt = j\n    a[i], a[vt] = a[vt], a[i]\nprint(a)", {}),
  ("ex", "Sắp xếp chèn — O(N²), rất nhanh khi gần như đã xếp", "a = [5, 2, 9, 1]\nfor i in range(1, len(a)):\n    x = a[i]\n    j = i - 1\n    while j >= 0 and a[j] > x:\n        a[j + 1] = a[j]       # dịch sang phải\n        j -= 1\n    a[j + 1] = x\nprint(a)", {}),
  ("ex", "Thực tế: dùng sorted / sort với key", "a = [5, 2, 9, 1]\nprint(sorted(a), sorted(a, reverse=True))\nds = [(\"An\", 8.5), (\"Binh\", 9.0), (\"Chi\", 8.5)]\nds.sort(key=lambda p: (-p[1], p[0]))   # điểm giảm, trùng điểm thì theo tên\nprint(ds)", {}),
 ]),

dict(id="searching", level=5, title="Tìm kiếm tuần tự & nhị phân", summary="Tìm một giá trị trong dãy: duyệt từng phần tử `O(N)` hoặc **chia đôi** dãy đã sắp xếp `O(log N)`.",
 blocks=[
  H1(),
  ("p", "**Tìm kiếm tuần tự** xem lần lượt từng phần tử — dùng được cho mọi dãy. **Tìm kiếm nhị phân** chỉ dùng cho dãy **đã sắp xếp**, nhưng mỗi bước loại bỏ một nửa dãy nên cực nhanh: 10⁹ phần tử chỉ cần ~30 bước."),
  ("p", "Ví dụ như tra từ điển: mở giữa quyển, nếu từ cần tìm đứng trước thì chỉ tìm tiếp nửa đầu, cứ thế chia đôi."),
  H2("Tìm kiếm nhị phân"),
  ("steps", [
    "Đặt biên `l = 0`, `r = len(a) - 1`.",
    "Khi `l <= r`: lấy điểm giữa `m = (l + r) // 2`.",
    "Nếu `a[m] == x` → tìm thấy. Nếu `a[m] < x` → bỏ nửa trái: `l = m + 1`. Ngược lại → bỏ nửa phải: `r = m - 1`.",
    "Hết vòng lặp mà chưa thấy → không có `x` (trả về `-1`).",
  ]),
  ("table", ["Bước", "l", "r", "m", "a[m]", "So với x = 40"], [
    ["1", "0", "4", "2", "30", "30 < 40 → l = 3"],
    ["2", "3", "4", "3", "40", "bằng → tìm thấy ở chỉ số 3"],
  ]),
  ("warn", "Nhị phân **bắt buộc** mảng đã sắp xếp. Sai điều kiện dừng (`l < r` thay vì `l <= r`) là lỗi rất hay gặp."),
  H3(),
  ("ex", "Tìm kiếm tuần tự — O(N)", "a = [5, 2, 9, 1]\nx = 9\nvt = -1\nfor i in range(len(a)):\n    if a[i] == x:\n        vt = i\n        break\nprint(vt)", {}),
  ("ex", "Tìm kiếm nhị phân — O(log N)", "def binary_search(a, x):\n    l, r = 0, len(a) - 1\n    while l <= r:\n        m = (l + r) // 2\n        if a[m] == x:\n            return m\n        elif a[m] < x:\n            l = m + 1\n        else:\n            r = m - 1\n    return -1\n\nprint(binary_search([10, 20, 30, 40, 50], 40))\nprint(binary_search([10, 20, 30], 25))", {}),
  ("ex", "Thư viện bisect: vị trí chèn / đếm số phần tử < x", "from bisect import bisect_left, bisect_right\na = [10, 20, 20, 30, 40]\nprint(bisect_left(a, 20))              # vị trí đầu tiên của 20\nprint(bisect_right(a, 20) - bisect_left(a, 20))   # có bao nhiêu số 20\nprint(bisect_left(a, 25))              # nếu chèn 25 thì vào chỉ số nào", {}),
 ]),

dict(id="prefix", level=5, title="Mảng cộng dồn (Prefix sum)", summary="Tính trước tổng tích lũy để trả lời mỗi truy vấn **tổng đoạn** trong `O(1)`.",
 blocks=[
  H1(),
  ("p", "Bài toán: cho mảng `A` và nhiều truy vấn “tổng các phần tử từ vị trí L đến R”. Cộng từng truy vấn mất `O(N)`, với `Q` truy vấn là `O(N·Q)` — quá chậm."),
  ("p", "**Mảng cộng dồn** `pref[i]` là tổng `i` phần tử đầu tiên. Khi đó tổng đoạn bằng **hiệu hai mốc**: `pref[R+1] - pref[L]`."),
  H2(),
  ("steps", [
    "Tạo `pref` có `N + 1` phần tử, `pref[0] = 0`.",
    "Với `i = 0..N-1`: `pref[i + 1] = pref[i] + A[i]` — tiền xử lý `O(N)`.",
    "Mỗi truy vấn `(L, R)` (chỉ số từ 0, gồm cả R): đáp án `pref[R + 1] - pref[L]` — chỉ `O(1)`.",
  ]),
  ("table", ["i", "0", "1", "2", "3", "4", "5", "6"], [
    ["`A[i-1]`", "—", "2", "4", "1", "7", "5", "3"],
    ["`pref[i]`", "0", "2", "6", "7", "14", "19", "22"],
  ]),
  ("tip", "Cùng ý tưởng có thể mở rộng: **mảng hiệu** (cộng một giá trị cho cả đoạn) và **cộng dồn 2 chiều** cho ma trận."),
  H3(),
  ("ex", "Prefix sum: tổng đoạn [L, R] trong O(1)", "A = [2, 4, 1, 7, 5, 3]\npref = [0] * (len(A) + 1)\nfor i in range(len(A)):\n    pref[i + 1] = pref[i] + A[i]\n\ndef tong(L, R):          # chỉ số tính từ 0, gồm cả R\n    return pref[R + 1] - pref[L]\n\nprint(tong(1, 3))        # 4 + 1 + 7\nprint(tong(0, 5))        # cả mảng", {}),
  ("ex", "Dùng itertools.accumulate cho gọn", "from itertools import accumulate\nA = [2, 4, 1, 7, 5, 3]\npref = [0] + list(accumulate(A))\nprint(pref)", {}),
 ]),

dict(id="twoptr", level=5, title="Hai con trỏ (Two pointers)", summary="Dùng hai chỉ số cùng di chuyển để thay vòng lặp lồng `O(N²)` bằng một lượt duyệt `O(N)`.",
 blocks=[
  H1(),
  ("p", "Thay vì thử mọi cặp `(i, j)`, ta giữ **hai con trỏ** và quyết định di chuyển con trỏ nào dựa trên kết quả hiện tại. Điều kiện để làm được: dãy có **tính đơn điệu** (thường là đã sắp xếp)."),
  ("list", ["**Hai đầu:** một con trỏ ở đầu, một ở cuối, thu hẹp dần vào giữa.", "**Cửa sổ trượt:** hai con trỏ cùng đi từ trái sang phải, giữ đoạn `[l, r]` thỏa điều kiện."]),
  H2("Tìm cặp có tổng bằng target (mảng đã sắp xếp)"),
  ("steps", [
    "Đặt `l` ở đầu, `r` ở cuối.",
    "Tính `s = a[l] + a[r]`. Nếu `s == target` → xong.",
    "Nếu `s < target` → tổng quá nhỏ, tăng `l` (lấy số lớn hơn). Nếu `s > target` → giảm `r`.",
    "Lặp đến khi `l >= r`. Mỗi con trỏ chỉ đi một chiều nên tổng cộng `O(N)`.",
  ]),
  H3(),
  ("ex", "Hai đầu: tìm cặp có tổng bằng target", "def hai_so(a, target):\n    l, r = 0, len(a) - 1\n    while l < r:\n        s = a[l] + a[r]\n        if s == target:\n            return l, r\n        elif s < target:\n            l += 1\n        else:\n            r -= 1\n    return None\n\nprint(hai_so([1, 3, 4, 6, 9], 10))", {}),
  ("ex", "Cửa sổ trượt: đoạn liên tiếp dài nhất có tổng ≤ K (số dương)", "a = [2, 1, 3, 1, 1, 2]\nK = 5\nl = 0\ntong = 0\ndai_nhat = 0\nfor r in range(len(a)):\n    tong += a[r]                 # mở rộng bên phải\n    while tong > K:              # vi phạm → thu hẹp bên trái\n        tong -= a[l]\n        l += 1\n    dai_nhat = max(dai_nhat, r - l + 1)\nprint(dai_nhat)", {}),
 ]),

dict(id="greedy", level=5, title="Tham lam (Greedy)", summary="Ở mỗi bước chọn **phương án tốt nhất trước mắt** và hy vọng (đã chứng minh) nó dẫn tới lời giải tối ưu.",
 blocks=[
  H1(),
  ("p", "**Tham lam** không xét toàn cục mà luôn chọn lựa chọn “có lợi nhất” ở hiện tại. Thuật toán rất ngắn và nhanh (thường chỉ cần **sắp xếp** rồi duyệt một lần), nhưng **không phải bài nào cũng đúng** — cần có lý do chứng minh."),
  ("warn", "Đổi tiền với mệnh giá `[1, 3, 4]` và số tiền 6: tham lam chọn 4 + 1 + 1 (3 tờ) nhưng tối ưu là 3 + 3 (2 tờ). Khi không chắc tham lam đúng, dùng **quy hoạch động**."),
  H2("Ví dụ: chọn nhiều hoạt động nhất không trùng giờ"),
  ("steps", [
    "Sắp xếp các hoạt động theo **thời điểm kết thúc** tăng dần.",
    "Chọn hoạt động đầu tiên (kết thúc sớm nhất) — để lại nhiều thời gian nhất cho các hoạt động sau.",
    "Duyệt tiếp: hoạt động nào có giờ bắt đầu `>=` giờ kết thúc của hoạt động vừa chọn thì chọn.",
  ]),
  H3(),
  ("ex", "Chọn hoạt động không giao nhau", "hd = [(1, 4), (3, 5), (0, 6), (5, 7), (8, 9), (5, 9)]   # (bắt đầu, kết thúc)\nhd.sort(key=lambda x: x[1])      # theo giờ kết thúc\nchon = []\nket_thuc = -1\nfor bd, kt in hd:\n    if bd >= ket_thuc:\n        chon.append((bd, kt))\n        ket_thuc = kt\nprint(len(chon), chon)", {}),
  ("ex", "Đổi tiền tham lam (đúng với hệ mệnh giá chuẩn)", "tien = [500, 200, 100, 50, 20, 10]\nS = 880\nso_to = 0\nfor t in tien:                # từ mệnh giá lớn nhất\n    so_to += S // t\n    S %= t\nprint(so_to)", {}),
 ]),

dict(id="dp", level=5, title="Quy hoạch động cơ bản", summary="Chia bài toán thành các **bài con gối nhau**, tính mỗi bài con **một lần** và lưu lại để dùng tiếp.",
 blocks=[
  H1(),
  ("p", "Nhiều bài toán đệ quy bị chậm vì **tính đi tính lại** cùng một bài con (ví dụ Fibonacci đệ quy tốn `O(2ᴺ)`). **Quy hoạch động** (DP) giải mỗi bài con đúng một lần, lưu vào mảng `dp`, rồi dùng kết quả đó cho bài lớn hơn."),
  ("p", "Hai điều kiện để dùng DP: (1) bài toán chia được thành **bài con giống hệt dạng ban đầu**; (2) các bài con **gối nhau** (cùng xuất hiện nhiều lần)."),
  H2("Quy trình 4 bước giải DP"),
  ("steps", [
    "**Định nghĩa trạng thái:** `dp[i]` nghĩa là gì? (ví dụ: số tờ ít nhất để đổi `i` đồng).",
    "**Công thức truy hồi:** `dp[i]` tính từ các `dp` nhỏ hơn như thế nào.",
    "**Điều kiện đầu (cơ sở):** các giá trị nhỏ nhất đã biết (ví dụ `dp[0] = 0`).",
    "**Thứ tự tính & đáp án:** tính `i` tăng dần; đáp án là `dp[n]` hoặc `max(dp)`.",
  ]),
  ("table", ["Bài toán", "Trạng thái dp[i]", "Truy hồi"], [
    ["Fibonacci", "số Fibonacci thứ `i`", "`dp[i] = dp[i-1] + dp[i-2]`"],
    ["Đổi tiền", "số tờ ít nhất để đủ `i`", "`dp[i] = min(dp[i - t] + 1)` với mỗi mệnh giá `t ≤ i`"],
    ["Dãy con tăng dài nhất", "độ dài dãy tăng dài nhất kết thúc tại `i`", "`dp[i] = max(dp[j] + 1)` với `j < i`, `a[j] < a[i]`"],
  ]),
  H3(),
  ("ex", "Fibonacci bằng mảng dp — O(N)", "n = 10\ndp = [0] * (n + 1)\ndp[1] = 1\nfor i in range(2, n + 1):\n    dp[i] = dp[i - 1] + dp[i - 2]\nprint(dp[n])", {}),
  ("ex", "Cách khác: đệ quy có nhớ (lru_cache)", "from functools import lru_cache\n\n@lru_cache(None)\ndef fib(n):\n    if n < 2:\n        return n\n    return fib(n - 1) + fib(n - 2)\n\nprint(fib(80))", {}),
  ("ex", "Đổi tiền: ít tờ nhất để đủ số tiền", "tien = [1, 5, 10]\nS = 27\nINF = 10 ** 9\ndp = [0] + [INF] * S           # dp[0] = 0: đủ 0 đồng cần 0 tờ\nfor s in range(1, S + 1):\n    for t in tien:\n        if t <= s:\n            dp[s] = min(dp[s], dp[s - t] + 1)\nprint(dp[S])", {}),
  ("ex", "Dãy con tăng dài nhất (LIS) — O(N²)", "a = [3, 1, 4, 1, 5, 9, 2, 6]\ndp = [1] * len(a)             # mỗi phần tử tự nó là dãy dài 1\nfor i in range(len(a)):\n    for j in range(i):\n        if a[j] < a[i]:\n            dp[i] = max(dp[i], dp[j] + 1)\nprint(max(dp))", {}),
  ("ex", "Cái túi 0/1: tổng giá trị lớn nhất với sức chứa W", "w = [2, 3, 4]      # khối lượng\nv = [3, 4, 5]      # giá trị\nW = 5\ndp = [0] * (W + 1)\nfor i in range(len(w)):\n    for c in range(W, w[i] - 1, -1):   # duyệt ngược để mỗi vật dùng tối đa 1 lần\n        dp[c] = max(dp[c], dp[c - w[i]] + v[i])\nprint(dp[W])", {}),
 ]),

dict(id="graph", level=5, title="Duyệt đồ thị: BFS & DFS", summary="**BFS** (hàng đợi) tìm đường ngắn nhất theo số cạnh; **DFS** (đệ quy / ngăn xếp) đi sâu hết một nhánh.",
 blocks=[
  H1(),
  ("p", "**Đồ thị** gồm các **đỉnh** (nút) và **cạnh** (đường nối). Ví dụ: bản đồ thành phố (đỉnh = ngã tư, cạnh = đường), mạng bạn bè, mê cung. Hai đỉnh nối trực tiếp với nhau gọi là **kề**."),
  ("p", "Cách lưu phổ biến nhất là **danh sách kề**: với mỗi đỉnh `u`, lưu danh sách các đỉnh kề với `u`. **Duyệt đồ thị** là thăm mọi đỉnh đi tới được từ một đỉnh xuất phát, mỗi đỉnh đúng một lần (dùng tập `da_tham` để không lặp)."),
  H2("BFS — duyệt theo lớp (loang)"),
  ("p", "Giống vết dầu loang: thăm đỉnh xuất phát, rồi mọi đỉnh cách 1 cạnh, rồi cách 2 cạnh… nên BFS tìm được **đường đi ngắn nhất theo số cạnh**."),
  ("steps", [
    "Đưa đỉnh xuất phát vào hàng đợi `q`, đặt `dist[start] = 0`.",
    "Lấy đỉnh `u` ở đầu hàng đợi (`popleft`).",
    "Với mỗi đỉnh kề `v` chưa thăm: `dist[v] = dist[u] + 1` và đưa `v` vào cuối hàng đợi.",
    "Lặp đến khi hàng đợi rỗng. Độ phức tạp `O(V + E)`.",
  ]),
  H2("DFS — đi sâu hết nhánh"),
  ("p", "Đi theo một nhánh đến cùng, hết đường thì **quay lui** sang nhánh khác. Cài đặt tự nhiên bằng **đệ quy**."),
  ("steps", [
    "Đánh dấu đỉnh `u` đã thăm.",
    "Với mỗi đỉnh kề `v` chưa thăm: gọi `dfs(v)`.",
    "Dùng để: kiểm tra liên thông, đếm thành phần liên thông, phát hiện chu trình, tìm đường trong mê cung.",
  ]),
  ("tip", "Cần **đường ngắn nhất** (số cạnh) → BFS. Cần **duyệt/đếm/kiểm tra liên thông** → DFS hoặc BFS đều được."),
  H3(),
  ("ex", "Biểu diễn đồ thị bằng danh sách kề", "ke = {1: [2, 3], 2: [4], 3: [4], 4: []}\nprint(ke[1])", {}),
  ("ex", "BFS: khoảng cách ngắn nhất từ đỉnh 1", "from collections import deque\nke = {1: [2, 3], 2: [4], 3: [4], 4: []}\ndist = {1: 0}\nq = deque([1])\nwhile q:\n    u = q.popleft()\n    for v in ke[u]:\n        if v not in dist:\n            dist[v] = dist[u] + 1\n            q.append(v)\nprint(dist)", {}),
  ("ex", "DFS đệ quy", "ke = {1: [2, 3], 2: [4], 3: [4], 4: []}\nda_tham = set()\n\ndef dfs(u):\n    da_tham.add(u)\n    print(u, end=\" \")\n    for v in ke[u]:\n        if v not in da_tham:\n            dfs(v)\n\ndfs(1)\nprint()", {}),
  ("ex", "Đếm số thành phần liên thông (đồ thị vô hướng)", "n = 6\ncanh = [(1, 2), (2, 3), (4, 5)]      # đỉnh 6 đứng một mình\nke = {i: [] for i in range(1, n + 1)}\nfor u, v in canh:\n    ke[u].append(v)\n    ke[v].append(u)\n\nda_tham = set()\ndef dfs(u):\n    da_tham.add(u)\n    for v in ke[u]:\n        if v not in da_tham:\n            dfs(v)\n\nso_tp = 0\nfor u in range(1, n + 1):\n    if u not in da_tham:\n        dfs(u)\n        so_tp += 1\nprint(so_tp)", {}),
  ("ex", "BFS trên lưới (mê cung): đường ngắn nhất từ S đến E", "from collections import deque\nluoi = [\"S.#\", \"..#\", \"#.E\"]     # '#' là tường\nR, C = len(luoi), len(luoi[0])\nfor i in range(R):\n    for j in range(C):\n        if luoi[i][j] == \"S\": s = (i, j)\n        if luoi[i][j] == \"E\": e = (i, j)\ndist = {s: 0}\nq = deque([s])\nwhile q:\n    x, y = q.popleft()\n    for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):\n        nx, ny = x + dx, y + dy\n        if 0 <= nx < R and 0 <= ny < C and luoi[nx][ny] != \"#\" and (nx, ny) not in dist:\n            dist[(nx, ny)] = dist[(x, y)] + 1\n            q.append((nx, ny))\nprint(dist.get(e, -1))", {}),
 ]),
]
