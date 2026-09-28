export const OFFLINE_HANDBOOK_TOPICS = [
  {
    id: "topic-1",
    title: "1. Biến, Kiểu dữ liệu & Phép toán",
    category: "Cơ bản",
    summary: "Tổng hợp các kiểu dữ liệu int, float, str, bool, toán tử số học (+, -, *, /, //, %, **) và ép kiểu.",
    content: `### Các kiểu dữ liệu cốt lõi
- \`int\`: Số nguyên (ví dụ: \`10\`, \`-5\`, \`0\`)
- \`float\`: Số thực thập phân (ví dụ: \`3.14\`, \`-0.5\`)
- \`str\`: Chuỗi ký tự, đặt trong nháy đơn \`'...\'\` hoặc nháy kép \`"..."\`
- \`bool\`: Giá trị logic (\`True\` hoặc \`False\`)

### Các phép toán số học quan trọng
- Phép cộng, trừ, nhân: \`+\`, \`-\`, \`*\`
- Phép chia thực: \`/\` (luôn trả về float, ví dụ \`7 / 2 = 3.5\`)
- Phép chia lấy nguyên: \`//\` (ví dụ \`7 // 2 = 3\`)
- Phép chia lấy dư: \`%\` (ví dụ \`7 % 2 = 1\`)
- Phép lũy thừa: \`**\` (ví dụ \`2 ** 3 = 8\`)

### Nhập xuất dữ liệu (Input / Output)
- \`print(val1, val2, sep=" ", end="\\n")\`: In dữ liệu ra màn hình.
- \`input()\`: Nhận chuỗi ký tự từ bàn phím.
- Ép kiểu: \`int(input())\`, \`float(input())\`, \`str(val)\`.
- Chuỗi f-string: \`f"Tổng là {a + b}"\``,
    codeSnippet: `# Nhập 2 số nguyên và in các phép toán
a = int(input())
b = int(input())

print(f"Tổng: {a + b}")
print(f"Chia nguyên: {a // b}")
print(f"Chia dư: {a % b}")`,
    tips: [
      "Hàm input() luôn trả về chuỗi str, muốn tính toán số học bắt buộc phải ép kiểu int() hoặc float().",
      "Phép chia lấy dư % cực kỳ hữu dụng để kiểm tra tính chẵn lẻ (n % 2 == 0) hoặc tách chữ số cuối cùng (n % 10)."
    ]
  },
  {
    id: "topic-2",
    title: "2. Cấu trúc rẽ nhánh (if, if-else, if-elif-else, nested if)",
    category: "Điều kiện",
    summary: "Quy tắc cấu trúc rẽ nhánh if đơn, if-else, chuỗi if-elif-else, toán tử so sánh (==, !=, >, <, >=, <=) và toán tử logic (and, or, not).",
    content: `### 1. Cấu trúc if đơn (Một nhánh duy nhất)
Thực hiện khối lệnh con chỉ khi điều kiện là \`True\`. Nếu \`False\`, bỏ qua và tiếp tục.
\`\`\`python
# Cú pháp chuẩn
if dieu_kien:
    # Khối lệnh thụt vào 4 dấu cách
    thuc_hien_khi_dung()

# Ví dụ: Kiểm tra số dương
n = int(input())
if n > 0:
    print("So duong")
\`\`\`

### 2. Cấu trúc if ... else (Chọn một trong hai nhánh)
Chọn thực hiện chính xác một trong hai nhánh đối lập nhau:
\`\`\`python
# Cú pháp chuẩn
if dieu_kien:
    thuc_hien_khi_dung()
else:
    thuc_hien_khi_sai()

# Ví dụ: Kiểm tra số chẵn hay số lẻ
n = int(input())
if n % 2 == 0:
    print("So chan")
else:
    print("So le")
\`\`\`

### 3. Cấu trúc nhiều nhánh if ... elif ... else (Từ 3 trường hợp trở lên)
Kiểm tra lần lượt từng điều kiện từ trên xuống dưới, chỉ thực hiện nhánh đầu tiên thỏa mãn:
\`\`\`python
# Ví dụ: Phân loại số dương, âm hay bằng 0
n = int(input())
if n > 0:
    print("So duong")
elif n < 0:
    print("So am")
else:
    print("So khong")

# Ví dụ: Xếp loại điểm học sinh
diem = float(input())
if diem >= 8.0:
    print("Gioi")
elif diem >= 6.5:
    print("Kha")
elif diem >= 5.0:
    print("Trung binh")
else:
    print("Yeu")
\`\`\`

### 4. Rẽ nhánh lồng nhau (Nested if) & Toán tử logic (and, or, not)
- \`and\`: Tất cả điều kiện cùng \`True\`.
- \`or\`: Ít nhất một điều kiện \`True\`.
- \`not\`: Đảo ngược giá trị chân lý.`,
    codeSnippet: `# Kiểm tra số nguyên dương chẵn hay lẻ
x = int(input())
if x > 0:
    if x % 2 == 0:
        print("So duong chan")
    else:
        print("So duong le")
elif x < 0:
    print("So am")
else:
    print("So khong")`,
    tips: [
      "Nhớ luôn có dấu hai chấm ':' ở cuối mỗi dòng if, elif, else.",
      "Tất cả các dòng lệnh thuộc cùng một khối con bắt buộc phải thụt lề 4 dấu cách thẳng hàng.",
      "Phân biệt rõ: '=' là phép gán biến, còn '==' là toán tử so sánh bằng."
    ]
  },
  {
    id: "topic-3",
    title: "3. range(), Vòng lặp for, while, break, continue & lồng nhau",
    category: "Vòng lặp",
    summary: "Thành thạo 3 dạng của range(), in dãy số 1..n, n..1, số chẵn/lẻ, tính tổng tích lũy, for kết hợp if, lệnh break, continue và vẽ hình học.",
    content: `### 1. 3 Dạng Của Hàm range()
- **\`range(stop)\`**: Sinh dãy từ \`0\` đến \`stop - 1\` (ví dụ: \`range(5)\` $\\rightarrow$ 0, 1, 2, 3, 4).
- **\`range(start, stop)\`**: Sinh dãy từ \`start\` đến \`stop - 1\`:
  - In từ 1 đến n: \`for i in range(1, n + 1):\`.
- **\`range(start, stop, step)\`**: Sinh dãy với bước nhảy:
  - In số chẵn từ 2 đến n: \`for i in range(2, n + 1, 2):\`.
  - In số lẻ từ 1 đến n: \`for i in range(1, n + 1, 2):\`.
  - Đếm ngược từ n về 1: \`for i in range(n, 0, -1):\`.

### 2. Kỹ Thuật Cộng Dồn Tích Lũy Với for
Mẫu hình thuật toán kinh điển để tính tổng $S = 1 + 2 + \\dots + n$:
\`\`\`python
n = int(input())
tong = 0                       # 1. Khởi tạo biến trước vòng lặp
for i in range(1, n + 1):      # 2. Vòng lặp duyệt qua từng số
    tong += i                  # 3. Cộng dồn vào biến tích lũy
print(tong)                    # 4. Xuất kết quả sau khi lặp xong
\`\`\`

### 3. Vòng Lặp for Kết Hợp if (Lọc dữ liệu)
\`\`\`python
# In các số chẵn trong phạm vi 1 đến 50
for i in range(1, 51):
    if i % 2 == 0:
        print(i, end=" ")
\`\`\`

### 4. Lệnh break, continue & Vòng lặp lồng nhau
- \`break\`: Lập tức thoát khỏi vòng lặp đang chạy (ví dụ dừng sớm khi tìm thấy ước trong kiểm tra số nguyên tố).
- \`continue\`: Bỏ qua các lệnh còn lại của lượt lặp hiện tại, chuyển ngay sang lượt kế tiếp.
- Vòng lặp lồng nhau: Duyệt hàng và cột để in hình sao, ma trận.`,
    codeSnippet: `# 1. In dãy số từ 1 đến n
n = int(input())
for i in range(1, n + 1):
    print(i, end=" ")
print()

# 2. Đếm ngược từ n về 1
for i in range(n, 0, -1):
    print(i, end=" ")
print()

# 3. Tính tổng từ 1 đến n
s = 0
for i in range(1, n + 1):
    s += i
print(f"Tong 1..{n} = {s}")`,
    tips: [
      "range(1, n + 1) chỉ chạy đến n, không chạy đến n + 1.",
      "Biến tích lũy (tong = 0, count = 0) luôn phải được khởi tạo TRƯỚC vòng lặp, nếu khởi tạo bên trong thì biến sẽ bị gán lại về 0 ở mỗi vòng lặp.",
      "Dùng print(..., end=' ') để in các giá trị trên cùng một dòng cách nhau bởi dấu cách."
    ]
  },
  {
    id: "topic-4",
    title: "4. Chuỗi ký tự (Strings) & Các phương thức chuỗi",
    category: "Chuỗi",
    summary: "Chỉ số, cắt lát chuỗi [start:stop:step], đảo ngược chuỗi và các phương thức thông dụng.",
    content: `### Truy cập và cắt chuỗi (Indexing & Slicing)
- \`s[0]\`: Ký tự đầu tiên; \`s[-1]\`: Ký tự cuối cùng.
- \`s[start:stop]\`: Cắt chuỗi từ start đến stop-1.
- \`s[::-1]\`: Đảo ngược chuỗi.
- \`len(s)\`: Độ dài chuỗi.

### Các phương thức chuỗi thường dùng
- \`s.lower()\`, \`s.upper()\`: Chuyển thành chữ thường / in hoa.
- \`s.strip()\`: Cắt bỏ khoảng trắng thừa ở 2 đầu.
- \`s.split(sep)\`: Tách chuỗi thành danh sách các từ.
- \`sep.join(list_str)\`: Nối các phần tử của danh sách thành chuỗi.
- \`s.replace(old, new)\`: Thay thế chuỗi con.
- \`s.count(sub)\`: Đếm số lần xuất hiện của chuỗi con.`,
    codeSnippet: `# Kiểm tra chuỗi Palindrome (đối xứng)
s = input().strip()
if s == s[::-1]:
    print("YES")
else:
    print("NO")`,
    tips: [
      "Chuỗi trong Python là kiểu bất biến (immutable), các hàm như .lower() hay .replace() luôn trả về chuỗi MỚI mà không làm thay đổi chuỗi gốc."
    ]
  },
  {
    id: "topic-5",
    title: "5. Danh sách (List) & Phương thức hữu ích",
    category: "Cấu trúc dữ liệu",
    summary: "Khởi tạo, chỉ số, duyệt, thêm (append), xóa (pop, remove), sắp xếp (sort) và hàm thống kê (len, sum, min, max).",
    content: `### Thao tác cơ bản với List
- Khởi tạo: \`a = [1, 2, 3, 4, 5]\` hoặc \`a = []\`
- Truy cập: \`a[0]\`, \`a[-1]\`, cắt lát \`a[1:4]\`
- Duyệt: \`for x in a:\` hoặc \`for i in range(len(a)):\`

### Các phương thức phổ biến
- \`a.append(x)\`: Thêm phần tử x vào cuối danh sách.
- \`a.insert(i, x)\`: Chèn phần tử x vào vị trí chỉ số i.
- \`a.pop()\`: Xóa và trả về phần tử cuối cùng (hoặc \`a.pop(i)\`).
- \`a.remove(x)\`: Xóa phần tử đầu tiên có giá trị bằng x.
- \`a.sort()\`: Sắp xếp danh sách tại chỗ theo thứ tự tăng dần (\`reverse=True\` để giảm dần).
- \`len(a)\`, \`sum(a)\`, \`min(a)\`, \`max(a)\`: Các hàm thống kê chuẩn.`,
    codeSnippet: `# Nhập danh sách N số nguyên và tính tổng các số chẵn
n = int(input())
numbers = []
for _ in range(n):
    numbers.append(int(input()))

even_sum = sum(x for x in numbers if x % 2 == 0)
print(f"Tổng số chẵn: {even_sum}")`,
    tips: [
      "Dùng hàm sum(), min(), max() trực tiếp trên List giúp code ngắn gọn và tối ưu hơn nhiều so với tự viết vòng lặp tìm kiếm."
    ]
  },
  {
    id: "topic-6",
    title: "6. Hàm (Functions) trong Python",
    category: "Hàm & Module",
    summary: "Định nghĩa hàm def, tham số truyền vào, giá trị trả về return, tham số mặc định và phạm vi biến.",
    content: `### Cú pháp định nghĩa hàm
\`\`\`python
def ten_ham(tham_so_1, tham_so_2=gia_tri_mac_dinh):
    # Các câu lệnh xử lý
    return ket_qua
\`\`\`

### Lợi ích của việc sử dụng hàm
1. **Tái sử dụng mã nguồn (Reusability)**: Viết một lần, gọi ở nhiều nơi.
2. **Module hóa**: Chia nhỏ bài toán phức tạp thành các hàm con đơn giản, dễ đọc và dễ gỡ lỗi.
3. **Phạm vi biến (Scope)**: Biến tạo bên trong hàm là biến cục bộ (Local variable), không ảnh hưởng đến biến bên ngoài (Global variable).`,
    codeSnippet: `# Hàm kiểm tra số nguyên tố
def is_prime(n):
    if n < 2:
        return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    return True

num = int(input())
if is_prime(num):
    print("YES")
else:
    print("NO")`,
    tips: [
      "Lệnh return sẽ kết thúc hàm ngay lập tức khi được thực thi và trả giá trị về cho nơi gọi hàm."
    ]
  }
];
