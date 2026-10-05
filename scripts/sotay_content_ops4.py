# -*- coding: utf-8 -*-
# Chủ đề mới: Vòng lặp lồng nhau (Cấp 1, đặt sau while)
from sotay_content_ops import OP

NESTED_TOPIC = dict(id="nested", level=1, title="Vòng lặp lồng nhau", summary="Đặt một vòng lặp **bên trong** vòng lặp khác: vòng ngoài chạy 1 lượt thì vòng trong chạy **trọn vẹn** một lần. Dùng để in hình, duyệt bảng/ma trận, thử mọi cặp giá trị.",
 blocks=[
  OP("Bước 1 · Ý tưởng: kim giờ và kim phút"),
  ("p", "Hãy hình dung đồng hồ: **kim giờ** (vòng ngoài) nhích 1 vạch thì **kim phút** (vòng trong) quay đủ một vòng. Tổng số lượt chạy của lệnh bên trong = `số lượt vòng ngoài × số lượt vòng trong`."),
  ("steps", [
    "Vòng ngoài lấy giá trị đầu tiên của `i`.",
    "Vòng trong chạy **hết** các giá trị `j` với `i` đó.",
    "Vòng ngoài sang giá trị tiếp theo của `i`, vòng trong **bắt đầu lại từ đầu**.",
    "Lặp đến khi vòng ngoài hết.",
  ]),
  ("ex", "Ví dụ 1 — Quan sát thứ tự chạy", "for i in range(1, 4):          # vòng ngoài: 3 lượt\n    for j in range(1, 3):      # vòng trong: 2 lượt mỗi lần\n        print(\"i =\", i, \"j =\", j)", {}),
  ("ex", "Ví dụ 2 — Đếm số lượt = ngoài × trong", "dem = 0\nfor i in range(4):\n    for j in range(5):\n        dem += 1\nprint(dem)       # 4 × 5", {}),
  ("warn", "Lệnh của vòng trong phải **thụt lề sâu hơn** vòng ngoài một cấp (4 dấu cách nữa). Thụt lề sai là đổi hẳn ý nghĩa chương trình."),

  OP("Bước 2 · In hình bằng ký tự"),
  ("p", "Quy tắc: vòng ngoài `i` lo **các dòng**, vòng trong `j` lo **các cột trên một dòng**. In xong một dòng thì gọi `print()` để xuống dòng; dùng `end=\"\"` để các ký tự nằm cùng hàng."),
  ("ex", "Ví dụ 3 — Hình chữ nhật 3 dòng × 5 cột", "for i in range(3):\n    for j in range(5):\n        print(\"*\", end=\" \")    # end: không xuống dòng\n    print()                    # hết một dòng → xuống dòng", {}),
  ("ex", "Ví dụ 4 — Tam giác vuông: dòng i có i sao", "n = 4\nfor i in range(1, n + 1):\n    for j in range(i):         # số cột phụ thuộc vào i\n        print(\"*\", end=\" \")\n    print()", {}),
  ("ex", "Ví dụ 5 — Tam giác số", "n = 5\nfor i in range(1, n + 1):\n    for j in range(1, i + 1):\n        print(j, end=\" \")\n    print()", {}),
  ("ex", "Ví dụ 6 — Tam giác ngược", "n = 4\nfor i in range(n, 0, -1):\n    for j in range(i):\n        print(\"*\", end=\" \")\n    print()", {}),
  ("ex", "Ví dụ 7 — Hình tháp (thêm vòng in khoảng trắng)", "n = 4\nfor i in range(1, n + 1):\n    for j in range(n - i):        # khoảng trắng bên trái\n        print(\" \", end=\"\")\n    for j in range(2 * i - 1):    # các dấu sao\n        print(\"*\", end=\"\")\n    print()", {}),
  ("tip", "Đoán số cột theo dòng: hình chữ nhật cột **không đổi**; tam giác cột **= i** (hoặc `n - i + 1` khi ngược). Tìm công thức này là bước quan trọng nhất."),

  OP("Bước 3 · Bảng số: bảng cửu chương"),
  ("ex", "Ví dụ 8 — Bảng cửu chương từ 2 đến 4", "for i in range(2, 5):\n    for j in range(1, 11):\n        print(i, \"x\", j, \"=\", i * j)\n    print(\"-\" * 10)", {}),
  ("ex", "Ví dụ 9 — Bảng nhân 5×5 thẳng cột", "for i in range(1, 6):\n    for j in range(1, 6):\n        print(f\"{i * j:3}\", end=\"\")    # :3 → mỗi số chiếm 3 ký tự\n    print()", {}),

  OP("Bước 4 · Thử mọi cặp giá trị"),
  ("ex", "Ví dụ 10 — In mọi cặp (i, j) với i < j", "n = 4\nfor i in range(1, n + 1):\n    for j in range(i + 1, n + 1):      # j bắt đầu từ i + 1 → không lặp cặp\n        print((i, j), end=\" \")\nprint()", {}),
  ("ex", "Ví dụ 11 — Tìm cặp có tổng bằng 10 (từ 1 đến 9)", "for a in range(1, 10):\n    for b in range(a, 10):\n        if a + b == 10:\n            print(a, \"+\", b)", {}),
  ("ex", "Ví dụ 12 — Liệt kê số nguyên tố đến 30", "for n in range(2, 31):\n    la_nt = True\n    for d in range(2, n):         # vòng trong thử các ước d\n        if n % d == 0:\n            la_nt = False\n            break                 # break chỉ thoát vòng TRONG\n    if la_nt:\n        print(n, end=\" \")\nprint()", {}),

  OP("Bước 5 · Duyệt bảng số (list 2 chiều)"),
  ("ex", "Ví dụ 13 — Duyệt từng ô, tính tổng", "bang = [[1, 2, 3],\n        [4, 5, 6],\n        [7, 8, 9]]\ntong = 0\nfor hang in bang:          # vòng ngoài: từng hàng\n    for so in hang:        # vòng trong: từng số trong hàng\n        tong += so\nprint(tong)", {}),
  ("ex", "Ví dụ 14 — Tổng từng hàng và số lớn nhất của cả bảng", "bang = [[3, 8, 1], [9, 2, 7], [4, 6, 5]]\nlon_nhat = bang[0][0]\nfor hang in bang:\n    tong_hang = 0\n    for so in hang:\n        tong_hang += so\n        if so > lon_nhat:\n            lon_nhat = so\n    print(\"Tong hang:\", tong_hang)\nprint(\"Lon nhat:\", lon_nhat)", {}),

  OP("Bước 6 · break, continue và while trong vòng lặp lồng"),
  ("warn", "`break` và `continue` chỉ tác động lên **vòng lặp trong cùng** chứa nó, không thoát được cả hai vòng."),
  ("ex", "Ví dụ 15 — break chỉ thoát vòng trong", "for i in range(1, 4):\n    for j in range(1, 4):\n        if j == 2:\n            break              # thoát vòng j, vòng i vẫn chạy tiếp\n        print(i, j)", {}),
  ("ex", "Ví dụ 16 — Thoát cả hai vòng bằng biến cờ", "tim_thay = False\nfor i in range(1, 10):\n    for j in range(1, 10):\n        if i * j == 24:\n            tim_thay = True\n            break              # thoát vòng j\n    if tim_thay:\n        break                  # thoát tiếp vòng i\nprint(i, j)", {}),
  ("ex", "Ví dụ 17 — for lồng while: rút gọn phân số bằng cách thử mẫu", "tu, mau = 12, 18\nfor d in range(2, min(tu, mau) + 1):\n    while tu % d == 0 and mau % d == 0:    # chia lặp lại cho cùng ước\n        tu //= d\n        mau //= d\nprint(tu, \"/\", mau)", {}),

  OP("Tổng hợp"),
  ("table", ["Bài toán", "Vòng ngoài", "Vòng trong"], [
    ["In hình chữ nhật", "các dòng", "các cột (số cột cố định)"],
    ["In tam giác", "các dòng `i`", "các cột, số cột phụ thuộc `i`"],
    ["Bảng cửu chương", "số nhân `i`", "số bị nhân `j`"],
    ["Thử mọi cặp", "phần tử thứ nhất", "phần tử thứ hai (thường bắt đầu từ `i + 1`)"],
    ["Duyệt ma trận", "từng hàng", "từng ô trong hàng"],
  ]),
  ("tip", "Thời gian chạy là **nhân** số lượt: hai vòng cùng chạy `N` lượt → `N²` bước. `N = 10⁵` mà lồng hai vòng sẽ quá chậm — xem chủ đề Độ phức tạp ở Cấp 5."),
  ("warn", "Hai vòng lồng nhau **không được dùng chung tên biến** (ví dụ cùng `for i`), vì vòng trong sẽ ghi đè biến của vòng ngoài."),
 ])
