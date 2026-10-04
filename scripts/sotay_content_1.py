# -*- coding: utf-8 -*-
# Nội dung Sổ tay Python — Cấp 1 (Cơ bản). Văn bản: `code` và **đậm**.
# Khối: ("p", text) ("table", headers, rows) ("ex", title, code, {stdin, note}) ("tip", text) ("warn", text) ("list", items)

L1 = "Cơ bản"

T1 = [
dict(id="hello", level=1, title="Chương trình đầu tiên & lệnh print", summary="`print()` hiển thị ra màn hình. Dòng bắt đầu bằng `#` là chú thích, Python bỏ qua.",
 blocks=[
  ("ex", "In lời chào", "# Đây là chú thích\nprint(\"Xin chao Python!\")\nprint(\"Dong 2\")", {}),
  ("ex", "In nhiều giá trị: sep và end", "print(2026, 9, 5, sep=\"/\")        # sep: ký tự ngăn cách\nprint(\"Xin\", end=\" \")             # end: ký tự cuối (mặc định xuống dòng)\nprint(\"chao\")", {}),
  ("ex", "f-string: chèn biến vào chuỗi", "ten = \"An\"\ntuoi = 16\nprint(f\"{ten} {tuoi} tuoi\")\nprint(f\"Sau 5 nam: {tuoi + 5} tuoi\")", {}),
  ("tip", "Chuỗi đặt trong `\"...\"` hoặc `'...'` đều được. Muốn xuống dòng trong chuỗi dùng `\\n`."),
 ]),
dict(id="types", level=1, title="Biến & kiểu dữ liệu", summary="Biến là tên gọi của một giá trị. Python tự nhận kiểu khi gán, không cần khai báo kiểu.",
 blocks=[
  ("table", ["Kiểu", "Ý nghĩa", "Ví dụ", "Ép kiểu"], [
    ["`int`", "Số nguyên", "`x = 42`", "`int(\"42\")` → `42`"],
    ["`float`", "Số thực", "`pi = 3.14`", "`float(\"3.14\")` → `3.14`"],
    ["`str`", "Chuỗi ký tự", "`s = \"Python\"`", "`str(123)` → `\"123\"`"],
    ["`bool`", "Đúng / Sai", "`ok = True`", "`bool(0)` → `False`"],
    ["`None`", "Rỗng, chưa có giá trị", "`kq = None`", "—"],
  ]),
  ("ex", "Khai báo và kiểm tra kiểu", "a = 10\nb = 3.5\nc = \"Hi\"\nd = True\nprint(type(a), type(b))\nprint(type(c), type(d))\nprint(isinstance(a, int))", {}),
  ("ex", "Gán nhiều biến, hoán đổi", "x, y = 1, 2\nx, y = y, x      # hoán đổi không cần biến tạm\nprint(x, y)", {}),
  ("ex", "Ép kiểu", "print(int(\"15\") + 5)      # chuỗi -> số\nprint(int(7.9))             # bỏ phần thập phân\nprint(float(3))\nprint(str(10) + \"cm\")", {}),
  ("tip", "Tên biến: bắt đầu bằng chữ cái hoặc `_`, **không có dấu cách**, phân biệt hoa/thường, không trùng từ khóa (`if`, `for`...). Nên đặt tên rõ nghĩa: `diem_toan`, `tong`."),
  ("tip", "Giá trị coi là **Sai** khi ép `bool()`: `0`, `0.0`, `\"\"`, `[]`, `{}`, `None`. Mọi giá trị khác là **Đúng**."),
 ]),
dict(id="io", level=1, title="Nhập xuất dữ liệu", summary="`input()` đọc một dòng từ bàn phím và **luôn trả về chuỗi** — cần ép kiểu nếu muốn tính toán.",
 blocks=[
  ("ex", "Nhập một số", "n = int(input())\nprint(n * 2)", {"stdin": "21"}),
  ("ex", "Nhập nhiều số trên một dòng", "a, b = map(int, input().split())\nprint(a + b)", {"stdin": "3 4"}),
  ("ex", "Nhập cả danh sách", "arr = list(map(int, input().split()))\nprint(arr)\nprint(sum(arr))", {"stdin": "5 2 9 1"}),
  ("ex", "In có định dạng", "pi = 3.14159265\nprint(f\"{pi:.2f}\")       # 2 chữ số thập phân\nprint(f\"{1234567:,}\")      # dấu phẩy hàng nghìn\nprint(f\"{7:03d}\")          # đủ 3 chữ số, thêm số 0\nprint(f\"{'An':>5}|{'Binh':<6}|\")  # căn phải / căn trái", {}),
  ("ex", "Đọc nhanh khi dữ liệu lớn (thi đấu)", "import sys\ninput = sys.stdin.readline      # nhanh hơn input() thông thường\nn = int(input())\nprint(n + 1)", {"stdin": "9"}),
  ("warn", "Quên ép kiểu: `\"3\" + \"4\"` ra `\"34\"` (nối chuỗi) chứ không phải `7`."),
 ]),
dict(id="ops", level=1, title="Toán tử", summary="Số học, so sánh và logic. Kết quả của so sánh là `True` hoặc `False`.",
 blocks=[
  ("table", ["Toán tử", "Ý nghĩa", "Ví dụ", "Kết quả"], [
    ["`+ - *`", "Cộng, trừ, nhân", "`6 * 7`", "`42`"],
    ["`/`", "Chia (luôn ra số thực)", "`7 / 2`", "`3.5`"],
    ["`//`", "Chia lấy phần nguyên", "`7 // 2`", "`3`"],
    ["`%`", "Chia lấy phần dư", "`7 % 2`", "`1`"],
    ["`**`", "Lũy thừa", "`2 ** 10`", "`1024`"],
    ["`== !=`", "Bằng / khác", "`5 != 3`", "`True`"],
    ["`> < >= <=`", "So sánh lớn / nhỏ", "`4 >= 4`", "`True`"],
    ["`and or not`", "Và / hoặc / phủ định", "`x > 0 and x < 10`", "kiểm tra khoảng"],
    ["`in`", "Có nằm trong không", "`3 in [1, 2, 3]`", "`True`"],
  ]),
  ("ex", "Tách chữ số bằng // và %", "n = 472\nprint(n % 10)        # chữ số hàng đơn vị\nprint(n // 10)       # bỏ chữ số cuối\nprint(n // 10 % 10)  # chữ số hàng chục", {}),
  ("ex", "Toán tử gán rút gọn", "x = 10\nx += 5     # x = x + 5\nx *= 2     # x = x * 2\nx //= 4\nprint(x)", {}),
  ("ex", "Kiểm tra chẵn / lẻ, chia hết", "n = 14\nprint(n % 2 == 0)     # chẵn?\nprint(n % 7 == 0)     # chia hết cho 7?", {}),
  ("tip", "Thứ tự ưu tiên: `**` → `* / // %` → `+ -` → so sánh → `not` → `and` → `or`. Có nghi ngờ thì **thêm dấu ngoặc** `( )`."),
 ]),
dict(id="if", level=1, title="Rẽ nhánh if / elif / else", summary="Chạy khối lệnh tùy theo điều kiện. Nhớ dấu `:` cuối dòng và **thụt lề 4 dấu cách**.",
 blocks=[
  ("ex", "if ... else", "n = 7\nif n % 2 == 0:\n    print(\"So chan\")\nelse:\n    print(\"So le\")", {}),
  ("ex", "Nhiều trường hợp: if ... elif ... else", "diem = 7.2\nif diem >= 8:\n    print(\"Gioi\")\nelif diem >= 6.5:\n    print(\"Kha\")\nelif diem >= 5:\n    print(\"Trung binh\")\nelse:\n    print(\"Yeu\")", {}),
  ("ex", "Kết hợp điều kiện: and / or / not", "tuoi = 16\nif tuoi >= 15 and tuoi <= 18:\n    print(\"THPT\")\nthu = \"CN\"\nif thu == \"T7\" or thu == \"CN\":\n    print(\"Nghi hoc\")", {}),
  ("ex", "Viết gọn", "diem = 6\nkq = \"Do\" if diem >= 5 else \"Truot\"   # toán tử ba ngôi\nprint(kq)\nprint(0 <= diem <= 10)               # so sánh kép", {}),
  ("warn", "Lỗi hay gặp: quên `:` cuối dòng `if/elif/else`; thụt lề không đều; dùng `=` (gán) thay cho `==` (so sánh)."),
  ("tip", "Thứ tự `elif` quan trọng: điều kiện đầu tiên đúng sẽ chạy, các nhánh sau **bị bỏ qua**."),
 ]),
dict(id="for", level=1, title="Vòng lặp for & range()", summary="`for` lặp qua từng phần tử; `range()` sinh dãy số nguyên. Dùng khi biết trước số lần lặp.",
 blocks=[
  ("table", ["Cách viết", "Dãy sinh ra"], [
    ["`range(5)`", "0 1 2 3 4"],
    ["`range(1, 6)`", "1 2 3 4 5"],
    ["`range(1, 10, 2)`", "1 3 5 7 9 (bước nhảy 2)"],
    ["`range(5, 0, -1)`", "5 4 3 2 1 (đếm ngược)"],
  ]),
  ("ex", "In dãy số từ 1 đến n", "n = 5\nfor i in range(1, n + 1):\n    print(i, end=\" \")\nprint()", {}),
  ("ex", "Tích lũy: tính tổng, đếm", "tong = 0\nfor i in range(1, 11):\n    tong += i\nprint(tong)            # 1 + 2 + ... + 10", {}),
  ("ex", "Duyệt chuỗi và danh sách", "for ch in \"abc\":\n    print(ch)\nfor x in [10, 20, 30]:\n    print(x * 2)", {}),
  ("ex", "enumerate và zip", "ten = [\"An\", \"Binh\"]\ndiem = [9.0, 8.5]\nfor i, t in enumerate(ten, start=1):\n    print(i, t)\nfor t, d in zip(ten, diem):\n    print(t, d)", {}),
  ("ex", "Vòng lặp lồng nhau: in hình", "for i in range(1, 5):\n    print(\"*\" * i)", {}),
  ("tip", "`range(a, b)` **không gồm** `b`. Biến tích lũy phải khởi tạo **trước** vòng lặp (`tong = 0`, `tich = 1`)."),
 ]),
dict(id="while", level=1, title="Vòng lặp while, break, continue", summary="`while` lặp khi điều kiện còn đúng. `break` thoát hẳn; `continue` bỏ qua lượt hiện tại.",
 blocks=[
  ("ex", "while cơ bản", "i = 1\nwhile i <= 5:\n    print(i, end=\" \")\n    i += 1          # nhớ tăng biến để không lặp vô hạn\nprint()", {}),
  ("ex", "Tổng chữ số của một số", "n = 12345\ntong = 0\nwhile n > 0:\n    tong += n % 10\n    n //= 10\nprint(tong)", {}),
  ("ex", "break và continue", "for i in range(1, 10):\n    if i == 3:\n        continue     # bỏ qua số 3\n    if i == 6:\n        break        # dừng khi gặp 6\n    print(i, end=\" \")\nprint()", {}),
  ("ex", "Nhập lại cho đến khi hợp lệ", "while True:\n    n = int(input())\n    if 1 <= n <= 20:\n        break\nprint(\"Hop le:\", n)", {"stdin": "50\n-3\n7"}),
  ("ex", "for ... else: else chạy khi vòng lặp KHÔNG bị break", "n = 29\nfor d in range(2, int(n ** 0.5) + 1):\n    if n % d == 0:\n        print(n, \"la hop so\")\n        break\nelse:\n    print(n, \"la so nguyen to\")", {}),
  ("warn", "`while` không thay đổi biến điều kiện sẽ **lặp vô hạn**. Dùng `Ctrl + C` để dừng."),
 ]),
]
