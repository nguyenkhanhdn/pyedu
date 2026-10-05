# -*- coding: utf-8 -*-
# Viết lại chủ đề "Rẽ nhánh" theo 4 dạng: if → if/else → if/elif/else → if lồng nhau (từ dễ đến khó)
from sotay_content_ops import OP

IF_TOPIC = dict(id="if", level=1, title="Cấu trúc rẽ nhánh: if / else / elif / lồng nhau", summary="Cho chương trình **chọn đường đi** theo điều kiện. Học theo 4 dạng từ dễ đến khó: **if → if … else → if … elif … else → if lồng nhau**. Nhớ dấu `:` cuối dòng và **thụt lề 4 dấu cách**.",
 blocks=[
  ("table", ["Dạng", "Dùng khi", "Cú pháp"], [
    ["1. `if`", "Chỉ làm thêm việc khi điều kiện đúng, sai thì bỏ qua", "`if đk:`"],
    ["2. `if … else`", "Có **2 trường hợp** loại trừ nhau (đúng / sai)", "`if đk:` … `else:`"],
    ["3. `if … elif … else`", "Có **nhiều trường hợp** (3 trở lên)", "`if` … `elif` … `else:`"],
    ["4. `if` lồng nhau", "Điều kiện thứ hai **chỉ xét sau khi** điều kiện thứ nhất đã đúng", "`if` bên trong `if`"],
  ]),
  OP("Bước 0 · Điều kiện là gì?"),
  ("p", "**Điều kiện** là biểu thức cho kết quả `True` (đúng) hoặc `False` (sai). Chương trình chỉ chạy khối lệnh của `if` khi điều kiện là `True`."),
  ("table", ["Phép so sánh", "Ý nghĩa", "Ví dụ → kết quả"], [
    ["`==`  `!=`", "Bằng / khác", "`5 == 5` → `True`"],
    ["`>`  `<`", "Lớn hơn / nhỏ hơn", "`3 > 7` → `False`"],
    ["`>=`  `<=`", "Lớn hơn hoặc bằng / nhỏ hơn hoặc bằng", "`4 >= 4` → `True`"],
    ["`and`  `or`  `not`", "Và / hoặc / phủ định", "`3 > 1 and 2 > 5` → `False`"],
  ]),
  ("ex", "Xem giá trị True / False của điều kiện", "x = 10\nprint(x > 5)\nprint(x == 3)\nprint(x % 2 == 0)           # x chia hết cho 2?\nprint(x > 5 and x < 20)     # cả hai cùng đúng\nprint(x < 5 or x == 10)     # một trong hai đúng\nprint(not x > 5)            # phủ định", {}),
  ("warn", "`=` là **gán** giá trị, `==` mới là **so sánh**. Viết `if x = 5:` là lỗi cú pháp."),

  OP("Dạng 1 · if — “Nếu … thì …”"),
  ("p", "Dạng đơn giản nhất: điều kiện **đúng** thì chạy khối lệnh thụt lề; điều kiện **sai** thì bỏ qua, chương trình đi tiếp xuống dưới."),
  ("steps", [
    "Tính điều kiện sau từ khóa `if`.",
    "`True` → chạy các dòng **thụt vào** dưới `if`.",
    "`False` → bỏ qua các dòng đó, chạy tiếp lệnh phía sau.",
  ]),
  ("ex", "Ví dụ 1 — Thông báo khi số âm", "n = -4\nif n < 0:\n    print(\"So am\")\nprint(\"Het\")          # dòng này không thụt lề → luôn chạy", {}),
  ("ex", "Ví dụ 2 — Điều kiện sai thì không in gì", "n = 4\nif n < 0:\n    print(\"So am\")\nprint(\"Het\")", {}),
  ("ex", "Ví dụ 3 — Khối lệnh có nhiều dòng", "tuoi = 18\nif tuoi >= 18:\n    print(\"Du tuoi\")\n    print(\"Duoc lam the\")     # cùng thụt lề → cùng thuộc if\nprint(\"Xong\")", {}),
  ("ex", "Ví dụ 4 — Đổi giá trị biến khi cần (thưởng điểm)", "diem = 9\nif diem >= 9:\n    diem = diem + 1       # thưởng 1 điểm\nprint(diem)", {}),
  ("ex", "Ví dụ 5 — Với dữ liệu nhập vào: lấy trị tuyệt đối", "n = int(input())\nif n < 0:\n    n = -n\nprint(n)", {"stdin": "-7"}),

  OP("Dạng 2 · if … else — “Nếu … thì … ngược lại …”"),
  ("p", "Khi có **đúng hai trường hợp** đối lập, thêm `else:` để xử lý trường hợp còn lại. **Luôn có đúng một** trong hai nhánh được chạy."),
  ("steps", [
    "Điều kiện `True` → chạy khối của `if`, **bỏ qua** `else`.",
    "Điều kiện `False` → bỏ khối `if`, chạy khối của `else`.",
  ]),
  ("ex", "Ví dụ 1 — Số chẵn hay lẻ", "n = 7\nif n % 2 == 0:\n    print(\"So chan\")\nelse:\n    print(\"So le\")", {}),
  ("ex", "Ví dụ 2 — Đậu hay rớt", "diem = 4.5\nif diem >= 5:\n    print(\"Dau\")\nelse:\n    print(\"Rot\")", {}),
  ("ex", "Ví dụ 3 — Tìm số lớn hơn trong hai số (nhập từ bàn phím)", "a = int(input())\nb = int(input())\nif a > b:\n    print(\"Lon nhat:\", a)\nelse:\n    print(\"Lon nhat:\", b)", {"stdin": "12\n30"}),
  ("ex", "Ví dụ 4 — Kết hợp and / or: năm nhuận", "nam = 2024\nif (nam % 4 == 0 and nam % 100 != 0) or nam % 400 == 0:\n    print(\"Nam nhuan\")\nelse:\n    print(\"Khong phai nam nhuan\")", {}),
  ("ex", "Ví dụ 5 — Kiểm tra mật khẩu (so sánh chuỗi)", "mat_khau = \"python123\"\nnhap = input()\nif nhap == mat_khau:\n    print(\"Dang nhap thanh cong\")\nelse:\n    print(\"Sai mat khau\")", {"stdin": "python12"}),
  ("ex", "Viết gọn một dòng (toán tử ba ngôi)", "diem = 6\nkq = \"Dau\" if diem >= 5 else \"Rot\"\nprint(kq)\nprint(0 <= diem <= 10)      # so sánh kép gọn hơn: 0 <= diem and diem <= 10", {}),
  ("tip", "`else` **không có điều kiện** — nó tự hiểu là “mọi trường hợp còn lại”. Không viết `else x < 5:`."),

  OP("Dạng 3 · if … elif … else — nhiều trường hợp"),
  ("p", "Khi có **từ 3 trường hợp trở lên**, dùng `elif` (else if). Python kiểm tra **từ trên xuống dưới**; gặp điều kiện đúng đầu tiên thì chạy khối đó rồi **bỏ qua toàn bộ phần còn lại**."),
  ("steps", [
    "Xét `if`: đúng → chạy khối của nó và **kết thúc cả chuỗi**.",
    "Sai → xét `elif` thứ nhất, rồi thứ hai… cho đến khi gặp điều kiện đúng.",
    "Không điều kiện nào đúng → chạy khối `else` (nếu có). `elif` có thể viết bao nhiêu cái cũng được.",
  ]),
  ("ex", "Ví dụ 1 — Âm, bằng 0 hay dương", "n = 0\nif n < 0:\n    print(\"So am\")\nelif n == 0:\n    print(\"Bang 0\")\nelse:\n    print(\"So duong\")", {}),
  ("ex", "Ví dụ 2 — Xếp loại học lực", "diem = 7.2\nif diem >= 8:\n    print(\"Gioi\")\nelif diem >= 6.5:\n    print(\"Kha\")\nelif diem >= 5:\n    print(\"Trung binh\")\nelse:\n    print(\"Yeu\")", {}),
  ("ex", "Ví dụ 3 — Tên ngày trong tuần (nhập 1–7)", "so = int(input())\nif so == 1:\n    print(\"Thu hai\")\nelif so == 2:\n    print(\"Thu ba\")\nelif so == 3:\n    print(\"Thu tu\")\nelif so == 4:\n    print(\"Thu nam\")\nelif so == 5:\n    print(\"Thu sau\")\nelif so == 6:\n    print(\"Thu bay\")\nelif so == 7:\n    print(\"Chu nhat\")\nelse:\n    print(\"Khong hop le\")", {"stdin": "3"}),
  ("ex", "Ví dụ 4 — Giá vé theo độ tuổi", "tuoi = 10\nif tuoi < 6:\n    gia = 0\nelif tuoi < 18:\n    gia = 30000\nelif tuoi < 60:\n    gia = 50000\nelse:\n    gia = 20000\nprint(\"Gia ve:\", gia)", {}),
  ("ex", "Ví dụ 5 — Máy tính bỏ túi: chọn phép toán", "a, b, pt = 12, 4, \"/\"\nif pt == \"+\":\n    kq = a + b\nelif pt == \"-\":\n    kq = a - b\nelif pt == \"*\":\n    kq = a * b\nelif pt == \"/\":\n    kq = a / b if b != 0 else \"Khong chia duoc cho 0\"\nelse:\n    kq = \"Phep toan khong hop le\"\nprint(kq)", {}),
  ("ex", "Lỗi hay gặp — sắp sai thứ tự điều kiện", "diem = 9\nif diem >= 5:          # điều kiện rộng đặt trước → luôn chặn các nhánh sau\n    print(\"Trung binh\")\nelif diem >= 8:\n    print(\"Gioi\")          # không bao giờ chạy tới đây\nprint(\"→ Phải đặt điều kiện hẹp (>= 8) lên trước\")", {}),
  ("tip", "Nhiều điều kiện **loại trừ nhau**: dùng `elif`. Nhiều việc **độc lập**: dùng các `if` riêng — khi đó mọi `if` đúng đều được chạy."),
  ("ex", "So sánh: nhiều if riêng và if … elif", "n = 12\nif n % 2 == 0:\n    print(\"chia het 2\")\nif n % 3 == 0:\n    print(\"chia het 3\")     # độc lập: cả hai cùng in\nif n % 4 == 0:\n    print(\"chia het 4\")", {}),

  OP("Dạng 4 · if lồng nhau — if trong if"),
  ("p", "Đặt một cấu trúc `if` **bên trong** khối lệnh của `if` khác (thụt lề thêm 4 dấu cách). Dùng khi một điều kiện **chỉ có ý nghĩa sau khi** điều kiện ngoài đã đúng. Mỗi tầng lồng thụt vào một cấp."),
  ("steps", [
    "Xét điều kiện **ngoài** trước. Sai → bỏ cả khối (kể cả `if` bên trong).",
    "Đúng → vào khối, rồi xét tiếp điều kiện **trong**.",
    "Mỗi cấp có thể có `else`/`elif` riêng — chú ý `else` thẳng hàng với `if` nào thì thuộc `if` đó.",
  ]),
  ("ex", "Ví dụ 1 — Hai tầng: đủ tuổi rồi mới xét có thẻ", "tuoi = 20\nco_the = True\nif tuoi >= 18:\n    if co_the:\n        print(\"Duoc vao\")\n    else:\n        print(\"Can mang the\")\nelse:\n    print(\"Chua du tuoi\")", {}),
  ("ex", "Ví dụ 2 — Ba cạnh có tạo thành tam giác không, loại gì?", "a, b, c = 3, 4, 5\nif a + b > c and a + c > b and b + c > a:\n    if a == b == c:\n        print(\"Tam giac deu\")\n    elif a == b or b == c or a == c:\n        print(\"Tam giac can\")\n    elif a * a + b * b == c * c:\n        print(\"Tam giac vuong\")\n    else:\n        print(\"Tam giac thuong\")\nelse:\n    print(\"Khong phai tam giac\")", {}),
  ("ex", "Ví dụ 3 — Giải phương trình ax + b = 0", "a, b = 0, 5\nif a != 0:\n    print(\"x =\", -b / a)\nelse:\n    if b == 0:\n        print(\"Vo so nghiem\")\n    else:\n        print(\"Vo nghiem\")", {}),
  ("ex", "Ví dụ 4 — Đăng nhập hai bước: tên rồi mật khẩu", "ten = \"admin\"\nmk = \"1234\"\nif ten == \"admin\":\n    if mk == \"1234\":\n        print(\"Chao admin\")\n    else:\n        print(\"Sai mat khau\")\nelse:\n    print(\"Khong co tai khoan\")", {}),
  ("ex", "Ví dụ 5 — Số ngày của tháng (lồng if trong elif)", "thang, nam = 2, 2024\nif thang in (1, 3, 5, 7, 8, 10, 12):\n    ngay = 31\nelif thang == 2:\n    if (nam % 4 == 0 and nam % 100 != 0) or nam % 400 == 0:\n        ngay = 29\n    else:\n        ngay = 28\nelse:\n    ngay = 30\nprint(ngay)", {}),
  ("ex", "Mẹo — rút gọn if lồng bằng and khi không cần nhánh riêng", "tuoi, co_the = 20, True\nif tuoi >= 18 and co_the:      # tương đương hai if lồng nhau, ngắn hơn\n    print(\"Duoc vao\")", {}),
  ("warn", "Lồng quá **3 tầng** rất khó đọc. Hãy gộp bằng `and`, dùng `elif`, hoặc tách thành hàm. Ngoài ra thụt lề sai sẽ làm `else` bị gắn nhầm vào `if` khác."),

  OP("Tổng hợp"),
  ("table", ["Tình huống", "Chọn"], [
    ["Chỉ làm thêm một việc khi đúng", "`if`"],
    ["Hai trường hợp đối lập", "`if … else`"],
    ["Ba trường hợp trở lên, loại trừ nhau", "`if … elif … else`"],
    ["Điều kiện phụ chỉ xét khi điều kiện chính đúng", "`if` lồng nhau (hoặc `and`)"],
    ["Một dòng, hai giá trị", "`a if đk else b`"],
  ]),
  ("warn", "Lỗi hay gặp: quên `:` cuối dòng `if/elif/else`; thụt lề không đều; dùng `=` thay cho `==`; đặt điều kiện rộng trước điều kiện hẹp trong chuỗi `elif`."),
 ])
