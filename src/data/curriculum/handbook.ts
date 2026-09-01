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
    summary: "Quy tắc điều kiện logic, toán tử so sánh (==, !=, >, <, >=, <=) và toán tử logic (and, or, not).",
    content: `### 1. Cấu trúc if đơn & if...else
\`\`\`python
if dieu_kien:
    # Thực hiện khi điều kiện là True
else:
    # Thực hiện khi điều kiện là False
\`\`\`

### 2. Cấu trúc nhiều nhánh if...elif...else
\`\`\`python
if diem >= 8.0:
    print("Gioi")
elif diem >= 6.5:
    print("Kha")
elif diem >= 5.0:
    print("Trung binh")
else:
    print("Yeu")
\`\`\`

### 3. Cấu trúc rẽ nhánh lồng nhau (Nested If)
Lồng câu lệnh if bên trong một khối if hoặc else khác để xử lý các phân cấp quyết định nhiều bước.`,
    codeSnippet: `# Kiểm tra số lớn nhất và xét điều kiện lồng nhau
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
      "Tất cả các dòng lệnh thuộc cùng một khối phải thụt lề (indent) thẳng hàng, chuẩn là 4 dấu cách."
    ]
  },
  {
    id: "topic-3",
    title: "3. range(), Vòng lặp for, while, break, continue & lồng nhau",
    category: "Vòng lặp",
    summary: "Duyệt range(), điều khiển vòng lặp while, lệnh break, continue và kỹ thuật vòng lặp lồng nhau.",
    content: `### 1. Hàm range()
- \`range(n)\`: Sinh dãy từ \`0\` đến \`n - 1\`.
- \`range(start, stop)\`: Sinh dãy từ \`start\` đến \`stop - 1\`.
- \`range(start, stop, step)\`: Sinh dãy với bước nhảy \`step\` (có thể nhận step âm để đếm lùi).

### 2. Vòng lặp for & while
- \`for i in range(1, n + 1):\`: Lặp với số lần biết trước.
- \`while dieu_kien:\`: Lặp khi điều kiện còn đúng.

### 3. Lệnh break & continue
- \`break\`: Lập tức thoát hoàn toàn khỏi vòng lặp gần nhất.
- \`continue\`: Bỏ qua các lệnh còn lại của lượt lặp hiện tại, chuyển sang lượt tiếp theo.

### 4. Vòng lặp lồng nhau (Nested Loops)
Dùng vòng lặp for/while bên trong vòng lặp khác để vẽ hình sao, in bảng cửu chương, ma trận 2 chiều.`,
    codeSnippet: `# In hình tam giác vuông sao kích thước N dòng
n = int(input())
for i in range(1, n + 1):
    for j in range(i):
        print("*", end="")
    print() # Xuống dòng`,
    tips: [
      "Trong vòng lặp while, luôn đảm bảo biến điều kiện được cập nhật (ví dụ: i += 1 hoặc n //= 10) để tránh rơi vào vòng lặp vô tận (Infinite Loop)."
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
