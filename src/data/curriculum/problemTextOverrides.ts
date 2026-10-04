import { LessonPractice } from "../../types";

// Đề bài viết lại ngắn gọn, đơn giản; từ khóa / lệnh / biểu thức đặt trong `dấu huyền`, **chữ đậm** để nổi bật.
export const PROBLEM_TEXT_OVERRIDES: Record<string, Partial<Pick<LessonPractice, "problemStatement" | "inputFormat" | "outputFormat" | "constraints">>> = {
  "t1-p1": {
    problemStatement: "Nhập 3 dòng: **tên**, **lớp**, **trường**. In 3 dòng lời chào theo mẫu.",
    inputFormat: "3 dòng: tên, lớp, trường.",
    outputFormat: "3 dòng:\nXin chao <ten>!\nBan dang hoc lop <lop>, truong <truong>.\nChuc ban mot ngay hoc tap vui ve!",
    constraints: "Mỗi chuỗi tối đa 100 ký tự."
  },
  "t1-p2": {
    problemStatement: "Dùng `print()` in **hình vuông 5 × 5** bằng ký tự `*`. Các dấu `*` trên một dòng cách nhau **một dấu cách**.",
    inputFormat: "Không có.",
    outputFormat: "5 dòng, mỗi dòng:\n* * * * *",
    constraints: "Đúng khoảng trắng giữa các dấu `*`."
  },
  "t1-p3": {
    problemStatement: "Dùng `print()` in **tam giác cân** cao 3 dòng bằng `*`:\n- Dòng 1: 2 dấu cách + 1 dấu `*`\n- Dòng 2: 1 dấu cách + 3 dấu `*`\n- Dòng 3: 5 dấu `*`",
    inputFormat: "Không có.",
    outputFormat: "3 dòng:\n  *\n ***\n*****",
    constraints: "Đúng số dấu cách đầu dòng."
  },
  "t1-p4": {
    problemStatement: "Nhập 5 số nguyên (mỗi số một dòng): **ngày, tháng, năm, giờ, phút**. Dùng `sep` và `end` của `print()` để in trên **một dòng**:\n`ngay/thang/nam - gio:phut`",
    inputFormat: "5 dòng, mỗi dòng một số nguyên.",
    outputFormat: "1 dòng:\n<ngay>/<thang>/<nam> - <gio>:<phut>",
    constraints: "Ngày 1–31, tháng 1–12, năm 1900–2100, giờ 0–23, phút 0–59."
  },
  "t2-p1": {
    problemStatement: "Nhập 4 dòng: **họ tên** (`str`), **tuổi** (`int`), **điểm Toán** (`float`), **điểm Văn** (`float`). In lại thông tin theo mẫu.",
    inputFormat: "4 dòng: họ tên, tuổi, điểm Toán, điểm Văn.",
    outputFormat: "4 dòng:\nHo va ten: <ho_ten>\nTuoi: <tuoi>\nDiem Toan: <diem_toan>\nDiem Van: <diem_van>",
    constraints: "Tuổi 1–100; điểm 0–10."
  },
  "t2-p2": {
    problemStatement: "Nhập **tuổi** (chuỗi), ép sang `int` bằng `int()`. In 3 dòng:\n- `Tuoi hien tai: <tuoi>`\n- `Tuoi sau 5 nam: <tuoi + 5>`\n- `Kieu du lieu: <type(tuoi)>`",
    inputFormat: "1 dòng: tuổi.",
    outputFormat: "3 dòng theo mẫu ở trên.",
    constraints: "Tuổi là số nguyên từ 1 đến 120."
  },
  "t2-p3": {
    problemStatement: "Nhập điểm **Toán** và **Văn** (mỗi điểm một dòng, kiểu `float`). In **điểm trung bình** với 2 chữ số thập phân:\n`Diem trung binh: <dtb>`",
    inputFormat: "2 dòng: điểm Toán, điểm Văn.",
    outputFormat: "1 dòng:\nDiem trung binh: <dtb>",
    constraints: "Điểm từ 0 đến 10."
  },
  "t2-p4": {
    problemStatement: "Nhập số nguyên `n`. Ép `n` sang `float` và `str`, in 2 dòng gồm **giá trị** và **kiểu** của nó (cách nhau một dấu cách).",
    inputFormat: "1 dòng: số nguyên n.",
    outputFormat: "2 dòng:\n<n_float> <class 'float'>\n<n_str> <class 'str'>",
    constraints: "−10000 ≤ n ≤ 10000."
  },
  "t2-p5": {
    problemStatement: "Nhập 4 dòng: **họ tên, tuổi, điểm Toán, điểm Văn**. In phiếu thông tin trong khung viền **32 ký tự `#`** (trên và dưới) theo mẫu.",
    inputFormat: "4 dòng: họ tên, tuổi, điểm Toán, điểm Văn.",
    outputFormat: "7 dòng:\n################################\n# PHIEU KET QUA HOC TAP\n# Ho ten: <ho_ten>\n# Tuoi: <tuoi>\n# Diem Toan: <diem_toan>\n# Diem Van: <diem_van>\n################################",
    constraints: "Tuổi 1–100; điểm 0–10."
  },
  "t3-p1": {
    problemStatement: "Nhập **năm sinh**. In tuổi trong năm 2025:\n`Tuoi cua ban vao nam 2025: <tuoi>`",
    inputFormat: "1 dòng: năm sinh (số nguyên).",
    outputFormat: "1 dòng:\nTuoi cua ban vao nam 2025: <tuoi>",
    constraints: "1900 ≤ năm sinh ≤ 2025."
  },
  "t3-p2": {
    problemStatement: "Vở **8000đ**/quyển, bút **5000đ**/cây. Nhập số vở `x` và số bút `y` (mỗi số một dòng). In tổng tiền:\n`Tong tien: <tong> VND`",
    inputFormat: "2 dòng: x, y (số nguyên ≥ 0).",
    outputFormat: "1 dòng:\nTong tien: <tong> VND",
    constraints: "0 ≤ x, y ≤ 10000."
  },
  "t3-p3": {
    problemStatement: "Nhập số giây `s`. Đổi ra **giờ, phút, giây** bằng `//` và `%`:\n`<h> gio <m> phut <s> giay`",
    inputFormat: "1 dòng: số nguyên không âm s.",
    outputFormat: "1 dòng:\n<h> gio <m> phut <s> giay",
    constraints: "0 ≤ s ≤ 10⁸."
  },
  "t3-p4": {
    problemStatement: "Nhập **bán kính** `r`. Dùng `math.pi` tính **chu vi** và **diện tích**, làm tròn 2 chữ số thập phân.",
    inputFormat: "1 dòng: số thực r.",
    outputFormat: "2 dòng:\nChu vi: <C>\nDien tich: <S>",
    constraints: "0 < r ≤ 1000."
  },
  "t3-p5": {
    problemStatement: "Nhập số **USD** (nguyên dương). Đổi sang **VND** với tỷ giá **25000** và in có dấu phẩy ngăn hàng nghìn:\n`<so_tien_vnd> VND`",
    inputFormat: "1 dòng: số nguyên usd.",
    outputFormat: "1 dòng:\n<vnd_co_dau_phay> VND",
    constraints: "1 ≤ usd ≤ 10⁷."
  },
  "t3-p6": {
    problemStatement: "Nhập số nguyên `n`. In `True` nếu `n` **chẵn**, `False` nếu **lẻ**. **Không dùng** `if`.",
    inputFormat: "1 dòng: số nguyên n.",
    outputFormat: "`True` hoặc `False`",
    constraints: "−10⁹ ≤ n ≤ 10⁹."
  },
  "t4-p1": {
    problemStatement: "Nhập số nguyên `n`. Nếu `n > 0` thì in `So duong`, ngược lại **không in gì**.",
    inputFormat: "1 dòng: số nguyên n.",
    outputFormat: "`So duong` nếu n > 0; ngược lại không in gì.",
    constraints: "−1000 ≤ n ≤ 1000."
  },
  "t4-p2": {
    problemStatement: "Nhập số nguyên `n`. Dùng `if ... else`:\n- `n` chẵn: in `So chan`\n- `n` lẻ: in `So le`",
    inputFormat: "1 dòng: số nguyên n.",
    outputFormat: "`So chan` hoặc `So le`",
    constraints: "−10⁶ ≤ n ≤ 10⁶."
  },
  "t4-p3": {
    problemStatement: "Nhập số nguyên `n`. Dùng `if ... elif ... else`:\n- `n > 0`: in `So duong`\n- `n < 0`: in `So am`\n- `n == 0`: in `Bang 0`",
    inputFormat: "1 dòng: số nguyên n.",
    outputFormat: "`So duong`, `So am` hoặc `Bang 0`",
    constraints: "−10⁶ ≤ n ≤ 10⁶."
  },
  "t4-p4": {
    problemStatement: "Nhập **cân nặng** `weight` (kg) và **chiều cao** `height` (m). Tính `BMI = weight / (height * height)` rồi phân loại:\n- `BMI < 18.5`: `Thieu can`\n- `18.5 ≤ BMI < 25`: `Binh thuong`\n- `25 ≤ BMI < 30`: `Thua can`\n- `BMI ≥ 30`: `Beo phi`",
    inputFormat: "2 dòng: weight, height (số thực).",
    outputFormat: "1 dòng: tên phân loại.",
    constraints: "20 ≤ weight ≤ 250; 0.5 ≤ height ≤ 2.5."
  },
  "t4-p-atm": {
    problemStatement: "Mô phỏng **ATM**. Nhập `balance` (số dư) và `amount` (số tiền rút), rồi kiểm tra:\n- `amount % 50000 != 0`: in `Loi: So tien rut phai la boi so cua 50.000 VND`\n- `amount > balance`: in `Loi: So du khong du`\n- Hợp lệ: in `Giao dich thanh cong. So du con lai: <balance - amount> VND`",
    inputFormat: "2 dòng: balance, amount (số nguyên ≥ 0).",
    outputFormat: "1 dòng thông báo.",
    constraints: "0 ≤ balance, amount ≤ 10⁹."
  },
  "t4-p-taxi": {
    problemStatement: "Nhập quãng đường `d` (km). Tính cước taxi **lũy tiến**:\n- 2 km đầu: 12000đ/km\n- Km 3–10: 9500đ/km\n- Km 11–20: 8500đ/km\n- Trên 20 km: 7000đ/km\nIn số tiền nguyên (làm tròn).",
    inputFormat: "1 dòng: số thực d.",
    outputFormat: "1 số nguyên (VND).",
    constraints: "0 ≤ d ≤ 500."
  },
  "t4-p-electric": {
    problemStatement: "Nhập số điện `kwh`. Tính tiền điện **bậc thang**:\n- 50 kWh đầu: 1678đ\n- Từ 51–100: 1734đ\n- Từ 101–200: 2014đ\n- Từ 201 trở đi: 2536đ\nIn số tiền nguyên.",
    inputFormat: "1 dòng: số nguyên kwh.",
    outputFormat: "1 số nguyên (VND).",
    constraints: "0 ≤ kwh ≤ 10000."
  },
  "t5-p1": {
    problemStatement: "Nhập `n`. Dùng `for` và `range()` in các số từ **1 đến n** trên **một dòng**, cách nhau một dấu cách.",
    inputFormat: "1 dòng: số nguyên dương n.",
    outputFormat: "Các số 1 đến n, cách nhau một dấu cách.",
    constraints: "1 ≤ n ≤ 1000."
  },
  "t5-p-reverse": {
    problemStatement: "Nhập `n`. Dùng `for` với bước nhảy âm trong `range()` để in **n, n-1, ..., 1** trên một dòng, cách nhau một dấu cách.",
    inputFormat: "1 dòng: số nguyên dương n.",
    outputFormat: "Các số từ n giảm về 1.",
    constraints: "1 ≤ n ≤ 1000."
  },
  "t5-p-even-n": {
    problemStatement: "Nhập `n`. Dùng `for` và `range(2, n + 1, 2)` in các **số chẵn** từ 1 đến `n` trên một dòng.",
    inputFormat: "1 dòng: số nguyên n.",
    outputFormat: "Các số chẵn, cách nhau một dấu cách.",
    constraints: "2 ≤ n ≤ 1000."
  },
  "t5-p-odd-n": {
    problemStatement: "Nhập `n`. Dùng `for` và `range(1, n + 1, 2)` in các **số lẻ** từ 1 đến `n` trên một dòng.",
    inputFormat: "1 dòng: số nguyên n.",
    outputFormat: "Các số lẻ, cách nhau một dấu cách.",
    constraints: "1 ≤ n ≤ 1000."
  },
  "t5-p2": {
    problemStatement: "Nhập `n`. Dùng `for` tính **tổng** `S = 1 + 2 + ... + n` bằng biến tích lũy và in `S`.",
    inputFormat: "1 dòng: số nguyên dương n.",
    outputFormat: "1 số nguyên: tổng S.",
    constraints: "1 ≤ n ≤ 10⁵."
  },
  "t5-p4": {
    problemStatement: "Nhập số nguyên `n`. Dùng `for` và `break` kiểm tra **số nguyên tố**:\n- `YES` nếu `n` là số nguyên tố\n- `NO` nếu không phải",
    inputFormat: "1 dòng: số nguyên n.",
    outputFormat: "`YES` hoặc `NO`",
    constraints: "−10⁶ ≤ n ≤ 10⁶."
  },
  "t5-p-diamond": {
    problemStatement: "Nhập số **lẻ** `n`. Dùng `for` lồng nhau in **hình kim cương** đối xứng bằng `*` gồm `n` dòng.",
    inputFormat: "1 dòng: số lẻ n.",
    outputFormat: "`n` dòng hình kim cương.",
    constraints: "3 ≤ n ≤ 29, n lẻ."
  },
  "t6-p1": {
    problemStatement: "Đọc lần lượt các số nguyên cho đến khi gặp số **từ 1 đến 20**. Dùng `while`, rồi in:\n`Du lieu hop le: <so_hop_le>`",
    inputFormat: "Nhiều dòng, mỗi dòng một số nguyên (dòng cuối nằm trong 1–20).",
    outputFormat: "1 dòng:\nDu lieu hop le: <so_hop_le>",
    constraints: "Luôn có ít nhất một số hợp lệ ở cuối."
  },
  "t6-p2": {
    problemStatement: "Đoán số bí mật. Dòng 1 là `target`, các dòng sau là các số đoán `guess` (tối đa 7 lần):\n- `guess < target`: in `LON HON`\n- `guess > target`: in `NHO HON`\n- `guess == target`: in `CHUC MUNG` rồi **dừng**\n- Hết 7 lần chưa trúng: in `THUA CUOC`",
    inputFormat: "Dòng 1: target. Các dòng sau: số đoán.",
    outputFormat: "Mỗi lần đoán in một thông báo.",
    constraints: "1 ≤ target, guess ≤ 100."
  },
  "t6-p3": {
    problemStatement: "Đọc các số nguyên cho đến khi gặp số **dương** `n`. Tính **tổng các ước** của `n` và in:\n`Tong cac uoc cua <n> la: <tong_uoc>`",
    inputFormat: "Nhiều dòng số nguyên, dòng cuối là số dương n.",
    outputFormat: "1 dòng:\nTong cac uoc cua <n> la: <tong_uoc>",
    constraints: "1 ≤ n ≤ 10⁵."
  },
  "t7-p1": {
    problemStatement: "Nhập họ tên có thể thừa dấu cách và chữ hoa/thường lộn xộn. **Chuẩn hóa**:\n- Mỗi từ cách nhau đúng 1 dấu cách\n- Chữ đầu mỗi từ viết hoa, còn lại viết thường",
    inputFormat: "1 dòng: họ tên ban đầu.",
    outputFormat: "1 dòng: họ tên đã chuẩn hóa.",
    constraints: "Tối đa 200 ký tự."
  },
  "t7-p2": {
    problemStatement: "Nhập chuỗi `s`. In chuỗi **đảo ngược** bằng slicing `s[::-1]`.",
    inputFormat: "1 dòng: chuỗi s.",
    outputFormat: "1 dòng: chuỗi đảo ngược.",
    constraints: "1 ≤ độ dài ≤ 1000."
  },
  "t7-p3": {
    problemStatement: "Nhập chuỗi `s`. Kiểm tra **chuỗi đối xứng** (Palindrome):\n- `YES` nếu đối xứng\n- `NO` nếu không",
    inputFormat: "1 dòng: chuỗi s (chữ và số, viết liền).",
    outputFormat: "`YES` hoặc `NO`",
    constraints: "1 ≤ len(s) ≤ 1000."
  },
  "t7-p4": {
    problemStatement: "Nhập chuỗi `s` (ít nhất 2 ký tự). Dùng slicing in 4 dòng:\n- `s[:2]`: 2 ký tự đầu\n- `s[-2:]`: 2 ký tự cuối\n- `s[::-1]`: chuỗi đảo ngược\n- `s[::2]`: ký tự ở chỉ số chẵn",
    inputFormat: "1 dòng: chuỗi s.",
    outputFormat: "4 dòng theo thứ tự trên.",
    constraints: "2 ≤ len(s) ≤ 500."
  },
  "t7-p5": {
    problemStatement: "Nhập họ tên (ít nhất 2 từ). Tách bằng `split()` và in 3 dòng:\n- `Ho: <ho>` (từ đầu)\n- `Ten dem: <ten_dem>` (các từ giữa; không có thì `Khong co`)\n- `Ten: <ten>` (từ cuối)",
    inputFormat: "1 dòng: họ tên đầy đủ.",
    outputFormat: "3 dòng theo mẫu ở trên.",
    constraints: "Họ tên có ít nhất 2 từ."
  },
  "t8-p1": {
    problemStatement: "Viết hàm `tinh_tong(a, b)` **trả về** tổng `a + b`. Chương trình chính nhập `a`, `b` (mỗi số một dòng), gọi hàm và in kết quả.",
    inputFormat: "2 dòng: a, b (số nguyên).",
    outputFormat: "1 số nguyên: tổng a + b.",
    constraints: "−10⁹ ≤ a, b ≤ 10⁹."
  },
  "t8-p2": {
    problemStatement: "Viết hàm `tinh_hinh_tron(r)` trả về `(chu_vi, dien_tich)` làm tròn 2 chữ số thập phân (dùng `math.pi`). Chương trình chính nhập `r` và in 2 số trên **một dòng**, cách nhau một dấu cách.",
    inputFormat: "1 dòng: số thực r.",
    outputFormat: "1 dòng: chu vi và diện tích.",
    constraints: "0 < r ≤ 1000."
  },
  "t8-p3": {
    problemStatement: "Viết hàm `is_even(n)` trả về `True` nếu `n` **chẵn**, `False` nếu **lẻ**. Chương trình chính nhập `n`, gọi hàm và in kết quả.",
    inputFormat: "1 dòng: số nguyên n.",
    outputFormat: "`True` hoặc `False`",
    constraints: "−10⁹ ≤ n ≤ 10⁹."
  },
  "t8-p4": {
    problemStatement: "Viết hàm `chuan_hoa(name)` trả về họ tên đã **chuẩn hóa** (bỏ dấu cách thừa, viết hoa chữ đầu mỗi từ). Chương trình chính nhập chuỗi, gọi hàm và in kết quả.",
    inputFormat: "1 dòng: họ tên ban đầu.",
    outputFormat: "1 dòng: họ tên đã chuẩn hóa.",
    constraints: "Tối đa 200 ký tự."
  },
  "t8-p5": {
    problemStatement: "Viết hàm `nhap_so_hop_le(min_val, max_val)`: đọc từng dòng cho đến khi gặp **số nguyên** nằm trong `[min_val, max_val]` (dùng `try / except ValueError` để bỏ qua dòng không phải số). Chương trình chính nhập `min_val`, `max_val` rồi in:\n`Gia tri hop le: <so_hop_le>`",
    inputFormat: "Dòng 1: min_val. Dòng 2: max_val. Các dòng sau: dữ liệu thử.",
    outputFormat: "1 dòng:\nGia tri hop le: <so_hop_le>",
    constraints: "−1000 ≤ min_val ≤ max_val ≤ 1000."
  },
  "t9-p1": {
    problemStatement: "Viết hàm **đệ quy** `fibonacci(n)` trả về số Fibonacci thứ `n`, với `F(1) = 1`, `F(2) = 1`, `F(n) = F(n-1) + F(n-2)`. Chương trình chính nhập `n` và in kết quả.",
    inputFormat: "1 dòng: số nguyên n.",
    outputFormat: "1 số nguyên: F(n).",
    constraints: "1 ≤ n ≤ 30."
  },
  "t9-p2": {
    problemStatement: "Viết hàm **đệ quy** `tong_de_quy(n)` trả về `1 + 2 + ... + n`. Chương trình chính nhập `n` và in kết quả.",
    inputFormat: "1 dòng: số nguyên dương n.",
    outputFormat: "1 số nguyên: tổng.",
    constraints: "1 ≤ n ≤ 500."
  },
  "t9-p3": {
    problemStatement: "Viết hàm **đệ quy** `giai_thua(n)` trả về `n!` (với `0! = 1`). Chương trình chính nhập `n` và in kết quả.",
    inputFormat: "1 dòng: số nguyên không âm n.",
    outputFormat: "1 số nguyên: n!",
    constraints: "0 ≤ n ≤ 20."
  },
  "t1-p10-1": {
    problemStatement: "Nhập một dòng các số nguyên (cách nhau bởi dấu cách) vào list `a`. In 4 dòng:\n- Danh sách `a` (dạng list, ví dụ `[1, 2, 3]`)\n- `Phan tu dau: <a[0]>`\n- `Phan tu cuoi: <a[-1]>`\n- `So luong: <len(a)>`",
    inputFormat: "1 dòng: các số nguyên (ít nhất 1 số).",
    outputFormat: "4 dòng theo mẫu ở trên.",
    constraints: "1 ≤ len(a) ≤ 1000."
  },
  "t1-p10-2": {
    problemStatement: "Nhập một dòng các số nguyên. Tìm và in giá trị **lớn nhất** và **nhỏ nhất**.",
    inputFormat: "1 dòng: các số nguyên (ít nhất 1 số).",
    outputFormat: "2 dòng:\nMax: <max_val>\nMin: <min_val>",
    constraints: "1 ≤ len(a) ≤ 10⁵."
  },
  "t1-p10-3": {
    problemStatement: "Nhập một dòng các số nguyên. **Đếm** và in các **số chẵn** (giữ nguyên thứ tự). Nếu không có số chẵn nào, in `Cac so chan: Khong co`.",
    inputFormat: "1 dòng: các số nguyên.",
    outputFormat: "2 dòng:\nSo luong so chan: <count>\nCac so chan: <danh_sach>",
    constraints: "1 ≤ len(a) ≤ 1000."
  },
  "t1-p10-4": {
    problemStatement: "Nhập một dòng các số nguyên. Dùng **Bubble Sort** sắp xếp **tăng dần** (không dùng `.sort()` / `sorted()`). In các số, cách nhau một dấu cách.",
    inputFormat: "1 dòng: các số nguyên.",
    outputFormat: "1 dòng: các số đã sắp xếp tăng dần.",
    constraints: "1 ≤ len(a) ≤ 500."
  },
  "t1-p10-5": {
    problemStatement: "Nhập một dòng các số nguyên. Dùng **Bubble Sort** sắp xếp **giảm dần** (không dùng `.sort()` / `sorted()`). In các số, cách nhau một dấu cách.",
    inputFormat: "1 dòng: các số nguyên.",
    outputFormat: "1 dòng: các số đã sắp xếp giảm dần.",
    constraints: "1 ≤ len(a) ≤ 500."
  },
  "t1-p11-1": {
    problemStatement: "Nhập `n`, rồi `n` dòng, mỗi dòng `n` số nguyên (ma trận vuông n × n). **In lại** ma trận, mỗi hàng một dòng.",
    inputFormat: "Dòng 1: n. Tiếp theo n dòng, mỗi dòng n số.",
    outputFormat: "n dòng, mỗi dòng n số cách nhau một dấu cách.",
    constraints: "1 ≤ n ≤ 50."
  },
  "t1-p11-2": {
    problemStatement: "Nhập `n` và ma trận vuông n × n. Tính **tổng đường chéo chính** (`matrix[i][i]`) và in:\n`Tong duong cheo chinh: <tong>`",
    inputFormat: "Dòng 1: n. Tiếp theo n dòng, mỗi dòng n số.",
    outputFormat: "1 dòng:\nTong duong cheo chinh: <tong>",
    constraints: "1 ≤ n ≤ 100."
  },
  "t1-p11-3": {
    problemStatement: "Nhập `n` và ma trận vuông n × n. Tính **tổng đường chéo phụ** (`matrix[i][n-1-i]`) và in:\n`Tong duong cheo phu: <tong>`",
    inputFormat: "Dòng 1: n. Tiếp theo n dòng, mỗi dòng n số.",
    outputFormat: "1 dòng:\nTong duong cheo phu: <tong>",
    constraints: "1 ≤ n ≤ 100."
  },
  "t1-p11-4": {
    problemStatement: "Nhập `m n` (số hàng, số cột) rồi ma trận `m × n`. Tìm **giá trị lớn nhất** và vị trí **đầu tiên** của nó (hàng, cột tính từ 0). In 2 dòng:\n- `Gia tri lon nhat: <max_val>`\n- `Vi tri: hang <r>, cot <c>`",
    inputFormat: "Dòng 1: m n. Tiếp theo m dòng, mỗi dòng n số.",
    outputFormat: "2 dòng theo mẫu ở trên.",
    constraints: "1 ≤ m, n ≤ 100."
  },
  "t1-p12-1": {
    problemStatement: "Nhập `n` học sinh. Mỗi học sinh có 2 dòng: **họ tên** và **5 điểm** (Toán, Văn, Anh, Lý, Hóa). Tính `DTB = tổng 5 điểm / 5` và xếp loại:\n- `DTB ≥ 9`: `Xuat sac`\n- `8 ≤ DTB < 9`: `Gioi`\n- `6.5 ≤ DTB < 8`: `Kha`\n- `5 ≤ DTB < 6.5`: `Trung binh`\n- `DTB < 5`: `Yeu`\nMỗi học sinh in một dòng:\n`<ho_ten> | DTB: <dtb:.2f> | Xep loai: <xep_loai>`",
    inputFormat: "Dòng 1: n. Tiếp theo n cặp dòng (tên, 5 điểm).",
    outputFormat: "n dòng theo mẫu ở trên.",
    constraints: "1 ≤ n ≤ 50; 0 ≤ điểm ≤ 10."
  },
  "t1-p12-2": {
    problemStatement: "Tính **lãi kép**. Nhập vốn `P`, lãi suất `r` (% / năm) và số năm `t`. Mỗi năm:\n- `Lai = Von_dau_nam * (r / 100)`\n- `Du_cuoi_nam = Von_dau_nam + Lai` (là vốn đầu năm sau)\nMỗi năm in một dòng:\n`Nam <nam>: Lai = <lai:.2f>, Du = <du:.2f>`",
    inputFormat: "3 dòng: P, r, t.",
    outputFormat: "t dòng theo mẫu ở trên.",
    constraints: "P > 0; r > 0; 1 ≤ t ≤ 30."
  },
  "t1-p13-1": {
    problemStatement: "Nhập `k` mặt hàng, mỗi dòng: `<ten> <so_luong> <don_gia>`. Tính tổng tiền gốc `T`, rồi giảm giá:\n- `T ≥ 500000`: giảm 10%\n- `200000 ≤ T < 500000`: giảm 5%\n- `T < 200000`: không giảm\nIn 3 dòng:\n- `Tong tien goc: <T:.0f>`\n- `Giam gia: <giam:.0f>`\n- `Thanh toan: <thanh_toan:.0f>`",
    inputFormat: "Dòng 1: k. Tiếp theo k dòng: ten sl gia.",
    outputFormat: "3 dòng theo mẫu ở trên.",
    constraints: "1 ≤ k ≤ 50; sl > 0; gia > 0."
  },
  "t1-p13-2": {
    problemStatement: "Đọc `n` rồi liên tục đọc các dòng, dùng `try / except ValueError` chỉ giữ **số thực hợp lệ** cho đến khi đủ `n` số. In 2 dòng:\n- `Danh sach: <list làm tròn 2 chữ số>` (ví dụ `[1.5, 2.0]`)\n- `Trung binh cong: <tbc:.2f>`",
    inputFormat: "Dòng 1: n. Các dòng sau: dữ liệu thử.",
    outputFormat: "2 dòng theo mẫu ở trên.",
    constraints: "1 ≤ n ≤ 100."
  },
  "t1-p13-3": {
    problemStatement: "Nhập list số nguyên và số `x` cần tìm. In 6 dòng:\n- `Max: <max_val>`\n- `Min: <min_val>`\n- `Tong: <sum_val>`\n- `Chan: <so_chan>, Le: <so_le>`\n- `Sap xep: <các số tăng dần>` (dùng Bubble Sort)\n- `Tim <x>: Co` hoặc `Tim <x>: Khong`",
    inputFormat: "Dòng 1: list số nguyên. Dòng 2: số x.",
    outputFormat: "6 dòng theo mẫu ở trên.",
    constraints: "1 ≤ len(a) ≤ 500."
  },
  "t1-p13-4": {
    problemStatement: "Nhập `n` học sinh, mỗi học sinh 2 dòng: **họ tên** (có thể thừa dấu cách) và **3 điểm** Toán, Văn, Anh. Với mỗi học sinh:\n1. Chuẩn hóa họ tên\n2. `DTB = (Toan + Van + Anh) / 3`\n3. Xếp loại: `Gioi` (≥ 8), `Kha` (≥ 6.5), `Trung binh` (≥ 5), `Yeu` (< 5)\n4. In: `<ho_ten_chuan> | DTB: <dtb:.2f> | <xep_loai>`\nCuối cùng in **thủ khoa** (ĐTB cao nhất, người đầu tiên nếu bằng nhau):\n`Thu khoa: <ho_ten_chuan> (<dtb_max:.2f>)`",
    inputFormat: "Dòng 1: n. Tiếp theo n cặp dòng (họ tên, 3 điểm).",
    outputFormat: "n dòng kết quả + 1 dòng thủ khoa.",
    constraints: "1 ≤ n ≤ 100; 0 ≤ điểm ≤ 10."
  },
};
