# -*- coding: utf-8 -*-
# Cấp 4 (Nâng cao) và Cấp 5 (Thuật toán)

T4 = [
dict(id="comp", level=4, title="List / Dict / Set comprehension", summary="Tạo list, dict, set **trong một dòng**: `[biểu thức for x in dãy if điều kiện]`.",
 blocks=[
  ("ex", "List comprehension", "binh_phuong = [x ** 2 for x in range(1, 6)]\nprint(binh_phuong)\nchan = [x for x in range(10) if x % 2 == 0]   # có điều kiện lọc\nprint(chan)", {}),
  ("ex", "So sánh với vòng lặp thường", "# cách thường\nkq = []\nfor x in range(5):\n    kq.append(x * 2)\n# cách comprehension (tương đương)\nkq2 = [x * 2 for x in range(5)]\nprint(kq == kq2)", {}),
  ("ex", "Dict và Set comprehension", "tu = [\"apple\", \"kiwi\", \"banana\"]\nprint({t: len(t) for t in tu})        # dict\nprint({t[0].upper() for t in tu})      # set", {}),
  ("ex", "Ma trận bằng comprehension", "n = 3\nm = [[i * n + j for j in range(n)] for i in range(n)]\nprint(m)", {}),
  ("tip", "Biểu thức quá dài hoặc lồng nhiều tầng thì **viết vòng lặp thường** cho dễ đọc."),
 ]),
dict(id="lambda", level=4, title="Lambda, map, filter, *args", summary="Hàm ẩn danh `lambda` và các hàm bậc cao giúp xử lý dãy dữ liệu gọn gàng.",
 blocks=[
  ("ex", "Lambda", "binh_phuong = lambda x: x * x\ncong = lambda a, b: a + b\nprint(binh_phuong(5), cong(2, 3))", {}),
  ("ex", "map và filter", "a = [1, 2, 3, 4, 5, 6]\nprint(list(map(lambda x: x ** 2, a)))\nprint(list(filter(lambda x: x % 2 == 0, a)))", {}),
  ("ex", "Sắp xếp theo tiêu chí bằng key", "hs = [(\"An\", 8.5), (\"Binh\", 9.0), (\"Chi\", 7.0)]\nhs.sort(key=lambda p: p[1], reverse=True)   # theo điểm giảm dần\nprint(hs)", {}),
  ("ex", "*args: nhận số lượng tham số tùy ý", "def tong(*args):\n    return sum(args)\n\nprint(tong(1, 2, 3, 4, 5))", {}),
  ("ex", "**kwargs: nhận tham số có tên", "def in_info(**kwargs):\n    for k, v in kwargs.items():\n        print(k, \"=\", v)\n\nin_info(ten=\"An\", tuoi=16)", {}),
  ("ex", "all / any / zip / enumerate", "a = [2, 4, 6]\nprint(all(x % 2 == 0 for x in a))   # tất cả đều chẵn?\nprint(any(x > 5 for x in a))        # có số nào > 5?\nprint(list(zip([1, 2], [\"a\", \"b\"])))", {}),
 ]),
dict(id="lib", level=4, title="Thư viện chuẩn", summary="Dùng `import` để nạp thư viện có sẵn: `math`, `random`, `collections`, `itertools`, `heapq`, `bisect`, `sys`...",
 blocks=[
  ("table", ["Thư viện", "Hàm thường dùng", "Công dụng"], [
    ["`math`", "`sqrt` `pow` `gcd` `lcm` `factorial` `ceil` `floor` `pi`", "Toán học"],
    ["`random`", "`randint` `choice` `shuffle` `random`", "Số ngẫu nhiên"],
    ["`collections`", "`Counter` `deque` `defaultdict`", "Cấu trúc dữ liệu đặc biệt"],
    ["`itertools`", "`permutations` `combinations` `product`", "Hoán vị, tổ hợp"],
    ["`heapq`", "`heappush` `heappop`", "Hàng đợi ưu tiên (heap)"],
    ["`bisect`", "`bisect_left` `bisect_right`", "Tìm kiếm nhị phân trên list đã sắp xếp"],
    ["`sys`", "`stdin.readline` `setrecursionlimit`", "Nhập nhanh, giới hạn đệ quy"],
  ]),
  ("ex", "math", "import math\nprint(math.sqrt(144), math.gcd(24, 36), math.lcm(12, 18))\nprint(math.factorial(5), math.ceil(2.1), math.floor(2.9))\nprint(round(math.pi, 4))", {}),
  ("ex", "random (đặt seed để kết quả cố định)", "import random\nrandom.seed(1)\nprint(random.randint(1, 6))\nprint(random.choice([\"a\", \"b\", \"c\"]))", {}),
  ("ex", "collections: Counter, deque, defaultdict", "from collections import Counter, deque, defaultdict\nprint(Counter(\"abracadabra\").most_common(2))\n\ndq = deque([1, 2, 3])\ndq.appendleft(0)      # thêm đầu O(1)\ndq.pop()              # lấy cuối O(1)\nprint(dq)\n\nnhom = defaultdict(list)\nnhom[\"a\"].append(1)   # tự tạo list rỗng khi chưa có khóa\nprint(dict(nhom))", {}),
  ("ex", "itertools: hoán vị và tổ hợp", "from itertools import permutations, combinations\nprint(list(permutations(\"ABC\", 2)))\nprint(list(combinations([1, 2, 3, 4], 2)))", {}),
  ("ex", "heapq: lấy phần tử nhỏ nhất", "import heapq\nh = []\nfor x in [5, 1, 8, 3]:\n    heapq.heappush(h, x)\nprint(heapq.heappop(h), heapq.heappop(h))", {}),
  ("ex", "bisect: tìm vị trí trong list đã sắp xếp", "import bisect\na = [10, 20, 30, 40]\nprint(bisect.bisect_left(a, 30))   # vị trí của 30\nprint(bisect.bisect_left(a, 25))   # vị trí cần chèn 25", {}),
 ]),
dict(id="oop", level=4, title="Lớp và đối tượng (class)", summary="`class` gom **dữ liệu** và **hàm xử lý** của một đối tượng vào một chỗ. `self` là chính đối tượng đó.",
 blocks=[
  ("ex", "Khai báo và dùng class", "class HocSinh:\n    def __init__(self, ten, diem):   # hàm khởi tạo\n        self.ten = ten\n        self.diem = diem\n\n    def xep_loai(self):\n        return \"Gioi\" if self.diem >= 8 else \"Kha\"\n\nhs = HocSinh(\"An\", 8.5)\nprint(hs.ten, hs.xep_loai())", {}),
  ("ex", "Kế thừa", "class Dongvat:\n    def keu(self):\n        return \"...\"\n\nclass Cho(Dongvat):\n    def keu(self):\n        return \"Gau gau\"\n\nprint(Cho().keu())", {}),
 ]),
]

T5 = [
dict(id="num", level=5, title="Số học: ước, nguyên tố, chữ số", summary="Các mẫu bài số học thường gặp khi thi học sinh giỏi.",
 blocks=[
  ("ex", "Ước chung lớn nhất, bội chung nhỏ nhất", "import math\nprint(math.gcd(48, 18))   # UCLN\nprint(math.lcm(4, 6))     # BCNN\n\ndef gcd(a, b):            # tự cài đặt (Euclid)\n    while b:\n        a, b = b, a % b\n    return a\nprint(gcd(48, 18))", {}),
  ("ex", "Liệt kê ước của n (duyệt đến căn n)", "n = 36\nuoc = []\nd = 1\nwhile d * d <= n:\n    if n % d == 0:\n        uoc.append(d)\n        if d != n // d:\n            uoc.append(n // d)\n    d += 1\nprint(sorted(uoc))", {}),
  ("ex", "Phân tích ra thừa số nguyên tố", "n = 360\nres = []\nd = 2\nwhile d * d <= n:\n    while n % d == 0:\n        res.append(d)\n        n //= d\n    d += 1\nif n > 1:\n    res.append(n)\nprint(res)", {}),
  ("ex", "Đảo số, đếm chữ số, tổng chữ số", "n = 12345\nprint(int(str(n)[::-1]))        # số đảo ngược\nprint(len(str(n)))              # số chữ số\nprint(sum(int(c) for c in str(n)))   # tổng chữ số", {}),
 ]),
dict(id="sort_search", level=5, title="Sắp xếp & tìm kiếm", summary="Hiểu thuật toán cơ bản, còn khi làm bài thật thì dùng `sorted()` / `bisect`.",
 blocks=[
  ("ex", "Sắp xếp nổi bọt (Bubble Sort) — O(N²)", "a = [5, 2, 9, 1]\nn = len(a)\nfor i in range(n):\n    for j in range(0, n - i - 1):\n        if a[j] > a[j + 1]:\n            a[j], a[j + 1] = a[j + 1], a[j]\nprint(a)", {}),
  ("ex", "Sắp xếp chọn (Selection Sort) — O(N²)", "a = [5, 2, 9, 1]\nfor i in range(len(a)):\n    vt = i\n    for j in range(i + 1, len(a)):\n        if a[j] < a[vt]:\n            vt = j\n    a[i], a[vt] = a[vt], a[i]\nprint(a)", {}),
  ("ex", "Tìm kiếm tuần tự — O(N)", "a = [5, 2, 9, 1]\nx = 9\nvt = -1\nfor i in range(len(a)):\n    if a[i] == x:\n        vt = i\n        break\nprint(vt)", {}),
  ("ex", "Tìm kiếm nhị phân — O(log N), mảng đã sắp xếp", "def binary_search(a, x):\n    l, r = 0, len(a) - 1\n    while l <= r:\n        m = (l + r) // 2\n        if a[m] == x:\n            return m\n        elif a[m] < x:\n            l = m + 1\n        else:\n            r = m - 1\n    return -1\n\nprint(binary_search([10, 20, 30, 40, 50], 40))\nprint(binary_search([10, 20, 30], 25))", {}),
 ]),
dict(id="sieve", level=5, title="Sàng nguyên tố Eratosthenes", summary="Tìm **mọi** số nguyên tố đến N trong O(N log log N) — nhanh hơn nhiều so với kiểm tra từng số.",
 blocks=[
  ("ex", "Sàng đến N", "def sieve(n):\n    la_nt = [True] * (n + 1)\n    la_nt[0] = la_nt[1] = False\n    for p in range(2, int(n ** 0.5) + 1):\n        if la_nt[p]:\n            for boi in range(p * p, n + 1, p):\n                la_nt[boi] = False\n    return [i for i in range(n + 1) if la_nt[i]]\n\nprint(sieve(50))", {}),
  ("tip", "Ý tưởng: với mỗi số nguyên tố `p`, **gạch bỏ** các bội của `p` bắt đầu từ `p * p`."),
 ]),
dict(id="prefix", level=5, title="Mảng cộng dồn & hai con trỏ", summary="Hai kỹ thuật giúp giảm từ O(N²) xuống O(N) hoặc O(1) mỗi truy vấn.",
 blocks=[
  ("ex", "Prefix sum: tổng đoạn [L, R] trong O(1)", "A = [2, 4, 1, 7, 5, 3]\npref = [0] * (len(A) + 1)\nfor i in range(len(A)):\n    pref[i + 1] = pref[i] + A[i]\n\ndef tong(L, R):          # chỉ số tính từ 0, gồm cả R\n    return pref[R + 1] - pref[L]\n\nprint(tong(1, 3))        # 4 + 1 + 7", {}),
  ("ex", "Hai con trỏ: tìm cặp có tổng bằng target (mảng đã sắp xếp)", "def hai_so(a, target):\n    l, r = 0, len(a) - 1\n    while l < r:\n        s = a[l] + a[r]\n        if s == target:\n            return l, r\n        elif s < target:\n            l += 1\n        else:\n            r -= 1\n    return None\n\nprint(hai_so([1, 3, 4, 6, 9], 10))", {}),
 ]),
dict(id="dp", level=5, title="Quy hoạch động cơ bản", summary="Chia bài toán thành bài con, **lưu kết quả** để không tính lại.",
 blocks=[
  ("ex", "Fibonacci bằng mảng dp", "n = 10\ndp = [0] * (n + 1)\ndp[1] = 1\nfor i in range(2, n + 1):\n    dp[i] = dp[i - 1] + dp[i - 2]\nprint(dp[n])", {}),
  ("ex", "Đổi tiền: ít tờ nhất để đủ số tiền", "tien = [1, 5, 10]\nS = 27\nINF = 10 ** 9\ndp = [0] + [INF] * S\nfor s in range(1, S + 1):\n    for t in tien:\n        if t <= s:\n            dp[s] = min(dp[s], dp[s - t] + 1)\nprint(dp[S])", {}),
  ("ex", "Dãy con tăng dài nhất (LIS) — O(N²)", "a = [3, 1, 4, 1, 5, 9, 2, 6]\ndp = [1] * len(a)\nfor i in range(len(a)):\n    for j in range(i):\n        if a[j] < a[i]:\n            dp[i] = max(dp[i], dp[j] + 1)\nprint(max(dp))", {}),
 ]),
dict(id="graph", level=5, title="Duyệt đồ thị: BFS & DFS", summary="**BFS** (hàng đợi) tìm đường ngắn nhất theo số cạnh; **DFS** (đệ quy / ngăn xếp) đi sâu hết một nhánh.",
 blocks=[
  ("ex", "Biểu diễn đồ thị bằng danh sách kề", "ke = {1: [2, 3], 2: [4], 3: [4], 4: []}\nprint(ke[1])", {}),
  ("ex", "BFS: khoảng cách ngắn nhất từ đỉnh 1", "from collections import deque\nke = {1: [2, 3], 2: [4], 3: [4], 4: []}\ndist = {1: 0}\nq = deque([1])\nwhile q:\n    u = q.popleft()\n    for v in ke[u]:\n        if v not in dist:\n            dist[v] = dist[u] + 1\n            q.append(v)\nprint(dist)", {}),
  ("ex", "DFS đệ quy", "ke = {1: [2, 3], 2: [4], 3: [4], 4: []}\nda_tham = set()\n\ndef dfs(u):\n    da_tham.add(u)\n    print(u, end=\" \")\n    for v in ke[u]:\n        if v not in da_tham:\n            dfs(v)\n\ndfs(1)\nprint()", {}),
 ]),
]

TOPICS = []   # được ghép trong build_sotay.py

# ---- Bảng tra nhanh A–Z: (tên, loại, mô tả, ví dụ, mã chủ đề) ----
INDEX = [
 ("print()", "hàm", "In ra màn hình (tham số `sep`, `end`)", "print(a, b, sep=\"-\")", "hello"),
 ("input()", "hàm", "Đọc một dòng, trả về chuỗi", "n = int(input())", "io"),
 ("int() float() str() bool()", "hàm", "Ép kiểu dữ liệu", "int(\"15\")", "types"),
 ("type() isinstance()", "hàm", "Xem / kiểm tra kiểu", "type(5)", "types"),
 ("len()", "hàm", "Số phần tử / độ dài", "len([1, 2, 3])", "list"),
 ("range()", "hàm", "Sinh dãy số nguyên", "range(1, 10, 2)", "for"),
 ("sum() min() max()", "hàm", "Tổng, nhỏ nhất, lớn nhất", "max([3, 9, 1])", "list"),
 ("abs() round()", "hàm", "Trị tuyệt đối, làm tròn", "round(3.14159, 2)", "ops"),
 ("sorted()", "hàm", "Trả về list mới đã sắp xếp", "sorted(a, reverse=True)", "list"),
 ("enumerate()", "hàm", "Lấy cả chỉ số và giá trị", "for i, x in enumerate(a):", "for"),
 ("zip()", "hàm", "Ghép song song các dãy", "zip(a, b)", "for"),
 ("map() filter()", "hàm", "Áp dụng / lọc theo hàm", "list(map(int, s.split()))", "lambda"),
 ("all() any()", "hàm", "Tất cả / có ít nhất một thỏa mãn", "any(x > 5 for x in a)", "lambda"),
 ("open()", "hàm", "Mở tệp (dùng với `with`)", "with open(\"a.txt\") as f:", "file"),
 ("if / elif / else", "từ khóa", "Rẽ nhánh theo điều kiện", "if x > 0:", "if"),
 ("for / while", "từ khóa", "Vòng lặp", "for i in range(5):", "for"),
 ("break / continue", "từ khóa", "Thoát vòng lặp / bỏ qua lượt này", "if x == 3: break", "while"),
 ("def / return", "từ khóa", "Định nghĩa hàm / trả kết quả", "def f(x): return x * 2", "func"),
 ("lambda", "từ khóa", "Hàm ẩn danh một dòng", "lambda x: x + 1", "lambda"),
 ("try / except / finally", "từ khóa", "Bắt và xử lý lỗi", "except ValueError:", "error"),
 ("raise", "từ khóa", "Chủ động báo lỗi", "raise ValueError(\"sai\")", "error"),
 ("class / self", "từ khóa", "Định nghĩa lớp / chính đối tượng", "class A:", "oop"),
 ("import / from", "từ khóa", "Nạp thư viện", "from math import sqrt", "lib"),
 ("in / not in", "toán tử", "Kiểm tra thuộc", "3 in [1, 2, 3]", "ops"),
 ("// % **", "toán tử", "Chia nguyên, chia dư, lũy thừa", "17 // 5, 17 % 5, 2 ** 3", "ops"),
 (".split() .join()", "str", "Tách / nối chuỗi", "\"a b\".split()", "str"),
 (".strip() .lower() .upper()", "str", "Xóa khoảng trắng, đổi hoa/thường", "s.strip().lower()", "str"),
 (".replace() .find() .count()", "str", "Thay thế, tìm, đếm", "s.replace(\"a\", \"b\")", "str"),
 (".startswith() .endswith()", "str", "Bắt đầu / kết thúc bằng", "s.startswith(\"ab\")", "str"),
 (".isdigit() .isalpha()", "str", "Toàn chữ số / chữ cái", "\"12\".isdigit()", "str"),
 ("s[::-1]", "slicing", "Đảo ngược chuỗi hoặc list", "\"abc\"[::-1]", "str"),
 (".append() .insert()", "list", "Thêm phần tử", "a.append(5)", "list"),
 (".pop() .remove()", "list", "Xóa phần tử", "a.pop()", "list"),
 (".sort() .reverse()", "list", "Sắp xếp / đảo tại chỗ", "a.sort(key=len)", "list"),
 (".copy()", "list", "Sao chép list", "b = a.copy()", "list"),
 (".add() .discard()", "set", "Thêm / bỏ phần tử khỏi tập hợp", "s.add(3)", "tupleset"),
 ("| & - ^", "set", "Hợp, giao, hiệu, hiệu đối xứng", "A & B", "tupleset"),
 (".get() .items()", "dict", "Lấy an toàn / duyệt cặp khóa-giá trị", "d.get(k, 0)", "dict"),
 (".keys() .values()", "dict", "Các khóa / các giá trị", "list(d.keys())", "dict"),
 ("math.sqrt() math.gcd()", "math", "Căn bậc hai, UCLN", "math.gcd(24, 36)", "lib"),
 ("math.ceil() math.floor()", "math", "Làm tròn lên / xuống", "math.ceil(2.1)", "lib"),
 ("random.randint()", "random", "Số nguyên ngẫu nhiên", "random.randint(1, 6)", "lib"),
 ("Counter", "collections", "Đếm tần suất", "Counter(\"aab\")", "lib"),
 ("deque", "collections", "Hàng đợi hai đầu O(1)", "dq.popleft()", "lib"),
 ("defaultdict", "collections", "dict có giá trị mặc định", "defaultdict(list)", "lib"),
 ("permutations combinations", "itertools", "Hoán vị / tổ hợp", "combinations(a, 2)", "lib"),
 ("heapq.heappush heappop", "heapq", "Hàng đợi ưu tiên", "heappush(h, 5)", "lib"),
 ("bisect_left", "bisect", "Tìm vị trí trong list đã sắp xếp", "bisect_left(a, x)", "lib"),
 ("sys.stdin.readline", "sys", "Đọc nhanh khi dữ liệu lớn", "input = sys.stdin.readline", "io"),
 ("lru_cache", "functools", "Nhớ kết quả hàm đệ quy", "@lru_cache(None)", "recursion"),
]

# ---- Bảng lỗi thường gặp ----
ERRORS = [
 ("`SyntaxError`", "Sai cú pháp: thiếu `:`, thiếu ngoặc, sai dấu nháy", "Đọc dòng được báo lỗi và dòng ngay phía trên nó"),
 ("`IndentationError`", "Thụt lề không đều, trộn Tab và dấu cách", "Dùng đúng 4 dấu cách cho mỗi cấp"),
 ("`NameError`", "Dùng biến chưa gán hoặc gõ sai tên", "Kiểm tra chính tả; gán giá trị trước khi dùng"),
 ("`TypeError`", "Sai kiểu: `\"a\" + 1`, gọi hàm thiếu tham số", "Ép kiểu `str()` / `int()`; kiểm tra số tham số"),
 ("`ValueError`", "Giá trị sai: `int(\"abc\")`", "Kiểm tra dữ liệu hoặc bắt bằng `try / except`"),
 ("`IndexError`", "Chỉ số vượt độ dài: `a[5]` khi `len(a) == 5`", "Chỉ số hợp lệ là `0` đến `len(a) - 1`"),
 ("`KeyError`", "Khóa không có trong dict", "Dùng `d.get(k, mac_dinh)` hoặc kiểm tra `k in d`"),
 ("`ZeroDivisionError`", "Chia cho 0", "Kiểm tra `if b != 0:` trước khi chia"),
 ("`AttributeError`", "Gọi phương thức không tồn tại trên kiểu đó", "Kiểm tra kiểu biến bằng `type()`"),
 ("`RecursionError`", "Đệ quy không có điều kiện dừng hoặc quá sâu", "Thêm base case; `sys.setrecursionlimit(10**6)`"),
 ("`EOFError`", "`input()` khi hết dữ liệu nhập", "Kiểm tra số dòng đầu vào"),
 ("Time Limit Exceeded", "Thuật toán quá chậm (O(N²) với N = 10⁵)", "Dùng O(N log N): sắp xếp, set/dict, prefix sum, `sys.stdin.readline`"),
 ("Wrong Answer", "Sai kết quả hoặc sai định dạng in", "Kiểm tra trường hợp biên (n = 0, 1, âm), dấu cách và xuống dòng thừa"),
]

# ---- Mẹo thi đấu ----
CONTEST = [
 "Đọc nhanh: `import sys; input = sys.stdin.readline`.",
 "Nhập list: `a = list(map(int, input().split()))`.",
 "In nhiều số một dòng: `print(*a)`; in nhiều dòng: `print(\"\\n\".join(map(str, a)))`.",
 "Đệ quy sâu: `sys.setrecursionlimit(10**6)` hoặc đổi sang vòng lặp.",
 "Kiểm tra thuộc nhiều lần → dùng `set` hoặc `dict` thay cho `list` (O(1) thay vì O(N)).",
 "Sắp xếp rồi mới xử lý thường giúp giảm O(N²) xuống O(N log N).",
 "Luôn thử các trường hợp biên: n = 0, n = 1, mảng 1 phần tử, số âm, tất cả bằng nhau.",
]
