import { AlgorithmProblem } from "../../types";

export const TOPIC_1_PROBLEMS: AlgorithmProblem[] = [
  {
    id: "cd1-bai-1",
    title: "Bài 1. Khai Báo Biến & In Kiểu Dữ Liệu Type()",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 1: Biến, Kiểu dữ liệu, Ép kiểu",
    difficulty: "Dễ",
    tags: ["Biến", "type()", "str", "int", "float"],
    points: 20,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 1: Biến, Kiểu dữ liệu, Ép kiểu",
    problemStatement: `Viết chương trình khai báo 3 biến nhận dữ liệu nhập từ bàn phím theo thứ tự:
1. Họ tên (kiểu chuỗi str)
2. Tuổi (kiểu số nguyên int)
3. Chiều cao (kiểu số thực float)

Sau đó in ra kiểu dữ liệu của từng biến bằng hàm type() trên 3 dòng riêng biệt theo cú pháp của Python:
<class 'str'>
<class 'int'>
<class 'float'>`,
    inputFormat: "Gồm 3 dòng:\n- Dòng 1: Họ tên (ví dụ: 'Nguyen Van An')\n- Dòng 2: Tuổi (ví dụ: 12)\n- Dòng 3: Chiều cao tính theo mét (ví dụ: 1.55)",
    outputFormat: "Gồm 3 dòng in ra kết quả type(ho_ten), type(tuoi), type(chieu_cao).",
    constraints: "Tuổi 1 <= tuoi <= 100, Chiều cao 0.5 <= chieu_cao <= 2.5",
    sampleCases: [
      {
        input: "Nguyen Van An\n12\n1.55",
        output: "<class 'str'>\n<class 'int'>\n<class 'float'>",
        explanation: "Họ tên là chuỗi str, Tuổi là số nguyên int, Chiều cao là số thực float."
      }
    ],
    starterCode: `# Nhập thông tin
ho_ten = str(input())
tuoi = int(input())
chieu_cao = float(input())

# In ra kiểu dữ liệu của từng biến bằng hàm type()
print(type(ho_ten))
print(type(tuoi))
print(type(chieu_cao))
`,
    hints: [
      "Dùng input() để nhận họ tên (mặc định là str).",
      "Dùng int(input()) để ép kiểu sang số nguyên int cho tuổi.",
      "Dùng float(input()) để ép kiểu sang số thực float cho chiều cao.",
      "Dùng print(type(tên_biến)) để in ra kiểu dữ liệu."
    ],
    solutionExplanation: `Hàm type() trong Python trả về kiểu dữ liệu của biến. Cú pháp: print(type(ho_ten)), print(type(tuoi)), print(type(chieu_cao)).`,
    testCases: [
      { id: "cd1-b1-t1", input: "Nguyen Van An\n12\n1.55", expectedOutput: "<class 'str'>\n<class 'int'>\n<class 'float'>", isHidden: false },
      { id: "cd1-b1-t2", input: "Le Thi Binh\n15\n1.62", expectedOutput: "<class 'str'>\n<class 'int'>\n<class 'float'>", isHidden: true },
      { id: "cd1-b1-t3", input: "Tran Nam\n10\n1.40", expectedOutput: "<class 'str'>\n<class 'int'>\n<class 'float'>", isHidden: true }
    ]
  },
  {
    id: "cd1-bai-2",
    title: "Bài 2. Ép Kiểu Chuỗi Số Sang Số Nguyên",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 1: Biến, Kiểu dữ liệu, Ép kiểu",
    difficulty: "Dễ",
    tags: ["Ép kiểu", "int()", "Phép cộng"],
    points: 20,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 1: Biến, Kiểu dữ liệu, Ép kiểu",
    problemStatement: `Cho một chuỗi chứa số nguyên a (nhập từ bàn phím).
Viết lệnh chuyển a sang kiểu số nguyên rồi cộng thêm 5, sau đó in kết quả ra màn hình.`,
    inputFormat: "Một dòng duy nhất chứa chuỗi ký tự biểu diễn số nguyên a (ví dụ: '25').",
    outputFormat: "In ra một số nguyên là kết quả sau khi cộng 5.",
    constraints: "-1000 <= a <= 1000",
    sampleCases: [
      {
        input: "25",
        output: "30",
        explanation: "Chuyển '25' thành số 25, sau đó 25 + 5 = 30."
      },
      {
        input: "100",
        output: "105",
        explanation: "Chuyển '100' thành 100, sau đó 100 + 5 = 105."
      }
    ],
    starterCode: `a = input()

# TODO: Ép kiểu a sang số nguyên, cộng thêm 5 và in kết quả
so = int(a)
ket_qua = so + 5
print(ket_qua)
`,
    hints: [
      "Dùng hàm int(a) để chuyển chuỗi a thành số nguyên.",
      "Cộng biến số đó với 5 rồi dùng print() in ra."
    ],
    solutionExplanation: `Sử dụng hàm int() để ép chuỗi về số nguyên rồi thực hiện phép cộng số học thông thường.`,
    testCases: [
      { id: "cd1-b2-t1", input: "25", expectedOutput: "30", isHidden: false },
      { id: "cd1-b2-t2", input: "100", expectedOutput: "105", isHidden: false },
      { id: "cd1-b2-t3", input: "0", expectedOutput: "5", isHidden: true },
      { id: "cd1-b2-t4", input: "-10", expectedOutput: "-5", isHidden: true }
    ]
  },
  {
    id: "cd1-bai-3",
    title: "Bài 3. Ép Kiểu Float & Tính Bình Phương",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 1: Biến, Kiểu dữ liệu, Ép kiểu",
    difficulty: "Dễ",
    tags: ["float()", "Bình phương", "Toán học"],
    points: 20,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 1: Biến, Kiểu dữ liệu, Ép kiểu",
    problemStatement: `Viết chương trình nhập vào một số thực từ bàn phím (hàm input() trả về chuỗi), ép kiểu sang float rồi tính bình phương của số đó. In kết quả làm tròn đến 2 chữ số thập phân (hoặc in đúng số thực nếu là số nguyên).`,
    inputFormat: "Một dòng chứa số thực x.",
    outputFormat: "In ra giá trị x * x (bình phương của x), làm tròn 2 chữ số thập phân nếu có phần thập phân dài.",
    constraints: "-1000.0 <= x <= 1000.0",
    sampleCases: [
      {
        input: "3.5",
        output: "12.25",
        explanation: "3.5 * 3.5 = 12.25."
      },
      {
        input: "4",
        output: "16.0",
        explanation: "4.0 * 4.0 = 16.0."
      }
    ],
    starterCode: `s = input()
x = float(s)
# Tính bình phương và in kết quả
binh_phuong = x ** 2
print(round(binh_phuong, 2))
`,
    hints: [
      "Dùng float(input()) để lấy số thực.",
      "Tính bình phương bằng toán tử ** 2 hoặc x * x.",
      "Dùng hàm round(gia_tri, 2) để làm tròn 2 chữ số thập phân."
    ],
    solutionExplanation: `Sử dụng float() để ép kiểu số thực và toán tử ** 2 để tính lũy thừa bậc 2.`,
    testCases: [
      { id: "cd1-b3-t1", input: "3.5", expectedOutput: "12.25", isHidden: false },
      { id: "cd1-b3-t2", input: "4", expectedOutput: "16.0", isHidden: false },
      { id: "cd1-b3-t3", input: "2.5", expectedOutput: "6.25", isHidden: true },
      { id: "cd1-b3-t4", input: "-5", expectedOutput: "25.0", isHidden: true }
    ]
  },
  {
    id: "cd1-bai-4",
    title: "Bài 4. Phép Chia Thường (/) và Chia Lấy Nguyên (//)",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 1: Biến, Kiểu dữ liệu, Ép kiểu",
    difficulty: "Dễ",
    tags: ["Phép chia", "Chia lấy nguyên", "float", "int"],
    points: 25,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 1: Biến, Kiểu dữ liệu, Ép kiểu",
    problemStatement: `Cho hai số nguyên x và y (nhập trên 2 dòng).
Tính và in ra:
- Dòng 1: Kết quả của phép chia thực x / y
- Dòng 2: Kết quả của phép chia lấy phần nguyên x // y`,
    inputFormat: "Gồm 2 dòng chứa 2 số nguyên x và y (y != 0).",
    outputFormat: "Gồm 2 dòng:\n- Dòng 1: Giá trị x / y (kiểu float)\n- Dòng 2: Giá trị x // y (kiểu int)",
    constraints: "1 <= x <= 10000, 1 <= y <= 10000",
    sampleCases: [
      {
        input: "7\n2",
        output: "3.5\n3",
        explanation: "7 / 2 = 3.5 (float), 7 // 2 = 3 (phần nguyên)."
      }
    ],
    starterCode: `x = int(input())
y = int(input())

# TODO: In kết quả phép chia x / y và x // y
print(x / y)
print(x // y)
`,
    hints: [
      "Toán tử / luôn trả về số thực float.",
      "Toán tử // chia lấy phần nguyên, trả về số nguyên int nếu x, y là int."
    ],
    solutionExplanation: `Phép toán / thực hiện phép chia thập phân (float), phép // lấy phần nguyên (int).`,
    testCases: [
      { id: "cd1-b4-t1", input: "7\n2", expectedOutput: "3.5\n3", isHidden: false },
      { id: "cd1-b4-t2", input: "10\n3", expectedOutput: "3.3333333333333335\n3", isHidden: false },
      { id: "cd1-b4-t3", input: "8\n4", expectedOutput: "2.0\n2", isHidden: true }
    ]
  },
  {
    id: "cd1-bai-5",
    title: "Bài 5. Ép Kiểu Số Sang Chuỗi & Nối Chuỗi",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 1: Biến, Kiểu dữ liệu, Ép kiểu",
    difficulty: "Dễ",
    tags: ["str()", "Nối chuỗi", "Cộng chuỗi"],
    points: 20,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 1: Biến, Kiểu dữ liệu, Ép kiểu",
    problemStatement: `Viết chương trình nhập vào một số nguyên n (điểm số), chuyển n thành kiểu chuỗi (str) rồi nối với chuỗi " điểm" để in ra kết quả (ví dụ: "10 điểm").`,
    inputFormat: "Một số nguyên n.",
    outputFormat: "In ra chuỗi kết quả: '<n> điểm'.",
    constraints: "0 <= n <= 100",
    sampleCases: [
      {
        input: "10",
        output: "10 điểm",
        explanation: "Số 10 được ép thành chuỗi '10' và nối với ' điểm' thành '10 điểm'."
      },
      {
        input: "9",
        output: "9 điểm",
        explanation: "Kết quả là '9 điểm'."
      }
    ],
    starterCode: `n = int(input())
# Chuyển số n thành chuỗi rồi nối với " điểm"
ket_qua = str(n) + " điểm"
print(ket_qua)
`,
    hints: [
      "Dùng hàm str(n) để chuyển số thành chuỗi.",
      "Dùng dấu + để nối hai chuỗi: str(n) + ' điểm'."
    ],
    solutionExplanation: `Trong Python, để nối chuỗi với số ta cần ép kiểu số về chuỗi bằng hàm str(n).`,
    testCases: [
      { id: "cd1-b5-t1", input: "10", expectedOutput: "10 điểm", isHidden: false },
      { id: "cd1-b5-t2", input: "9", expectedOutput: "9 điểm", isHidden: false },
      { id: "cd1-b5-t3", input: "100", expectedOutput: "100 điểm", isHidden: true },
      { id: "cd1-b5-t4", input: "0", expectedOutput: "0 điểm", isHidden: true }
    ]
  },
  {
    id: "cd1-bai-6",
    title: "Bài 6. Phân Biệt int('3.5') và float('3.5')",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 1: Biến, Kiểu dữ liệu, Ép kiểu",
    difficulty: "Trung bình",
    tags: ["Ép kiểu", "ValueError", "float", "int"],
    points: 30,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 1: Biến, Kiểu dữ liệu, Ép kiểu",
    problemStatement: `Trong Python:
- float("3.5") sẽ chuyển chuỗi "3.5" thành số thực 3.5 hợp lệ.
- int("3.5") sẽ gây ra lỗi ValueError (vì hàm int() không trực tiếp parse chuỗi có dấu chấm thập phân). Để chuyển "3.5" thành số nguyên, ta phải qua bước trung gian: int(float("3.5")).

Yêu cầu: Viết chương trình nhập vào một chuỗi số thực s (ví dụ "3.5"), in ra kết quả chuyển sang float, và kết quả chuyển sang int (thông qua float).`,
    inputFormat: "Một chuỗi số thực s.",
    outputFormat: "Gồm 2 dòng:\n- Dòng 1: Giá trị kiểu float\n- Dòng 2: Giá trị kiểu int sau khi làm tròn phần nguyên",
    constraints: "-1000.0 <= s <= 1000.0",
    sampleCases: [
      {
        input: "3.5",
        output: "3.5\n3",
        explanation: "float('3.5') là 3.5, int(float('3.5')) là 3."
      },
      {
        input: "7.8",
        output: "7.8\n7",
        explanation: "float('7.8') = 7.8, int(float('7.8')) = 7."
      }
    ],
    starterCode: `s = input()
val_float = float(s)
val_int = int(val_float)

print(val_float)
print(val_int)
`,
    hints: [
      "Hàm float(s) nhận chuỗi dạng số thập phân.",
      "Hàm int(float(s)) chuyển số thực về phần nguyên."
    ],
    solutionExplanation: `int('3.5') bị lỗi cú pháp ValueError. Ta cần gọi float('3.5') trước rồi ép tiếp qua int().`,
    testCases: [
      { id: "cd1-b6-t1", input: "3.5", expectedOutput: "3.5\n3", isHidden: false },
      { id: "cd1-b6-t2", input: "7.8", expectedOutput: "7.8\n7", isHidden: false },
      { id: "cd1-b6-t3", input: "0.25", expectedOutput: "0.25\n0", isHidden: true }
    ]
  },
  {
    id: "cd1-bai-7",
    title: "Bài 7. Kiểm Tra Kiểu Dữ Liệu Phép Toán True + 5",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 1: Biến, Kiểu dữ liệu, Ép kiểu",
    difficulty: "Dễ",
    tags: ["bool", "int", "type()", "Phép toán"],
    points: 20,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 1: Biến, Kiểu dữ liệu, Ép kiểu",
    problemStatement: `Trong Python, kiểu bool là lớp con của int, trong đó True có giá trị số học là 1 và False có giá trị là 0.
Viết chương trình tính kết quả của biểu thức (b + n) trong đó b là giá trị logic (True hoặc False) và n là một số nguyên nhập từ bàn phím.
In ra giá trị của phép toán và kiểu dữ liệu của kết quả đó.`,
    inputFormat: "Gồm 2 dòng:\n- Dòng 1: Chuỗi 'True' hoặc 'False'\n- Dòng 2: Số nguyên n",
    outputFormat: "Gồm 2 dòng:\n- Dòng 1: Giá trị kết quả\n- Dòng 2: Kiểu dữ liệu của kết quả theo hàm type()",
    constraints: "-1000 <= n <= 1000",
    sampleCases: [
      {
        input: "True\n5",
        output: "6\n<class 'int'>",
        explanation: "True có giá trị 1, 1 + 5 = 6, kiểu int."
      },
      {
        input: "False\n10",
        output: "10\n<class 'int'>",
        explanation: "False có giá trị 0, 0 + 10 = 10, kiểu int."
      }
    ],
    starterCode: `b_str = input()
n = int(input())

b = (b_str == "True")
res = b + n

print(res)
print(type(res))
`,
    hints: [
      "True + n tương đương 1 + n.",
      "False + n tương đương 0 + n.",
      "Kết quả của phép cộng mang kiểu <class 'int'>."
    ],
    solutionExplanation: `Python tự động ép kiểu boolean thành integer khi thực hiện phép cộng số học.`,
    testCases: [
      { id: "cd1-b7-t1", input: "True\n5", expectedOutput: "6\n<class 'int'>", isHidden: false },
      { id: "cd1-b7-t2", input: "False\n10", expectedOutput: "10\n<class 'int'>", isHidden: false },
      { id: "cd1-b7-t3", input: "True\n-1", expectedOutput: "0\n<class 'int'>", isHidden: true }
    ]
  },
  {
    id: "cd1-bai-8",
    title: "Bài 8. In Kiểu Dữ Liệu Các Giá Trị Khác Nhau",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 1: Biến, Kiểu dữ liệu, Ép kiểu",
    difficulty: "Dễ",
    tags: ["type()", "int", "str", "float", "bool"],
    points: 20,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 1: Biến, Kiểu dữ liệu, Ép kiểu",
    problemStatement: `Cho 4 giá trị lần lượt là: 10, "10", 10.0, True.
Viết chương trình in ra kiểu dữ liệu của từng giá trị trên 4 dòng liên tiếp bằng hàm type().`,
    inputFormat: "Không có dữ liệu đầu vào.",
    outputFormat: "4 dòng in ra kiểu dữ liệu của 10, \"10\", 10.0, True.",
    constraints: "Không có",
    sampleCases: [
      {
        input: "",
        output: "<class 'int'>\n<class 'str'>\n<class 'float'>\n<class 'bool'>",
        explanation: "10 là int, '10' là str, 10.0 là float, True là bool."
      }
    ],
    starterCode: `# In ra kiểu dữ liệu của 10, "10", 10.0, True
print(type(10))
print(type("10"))
print(type(10.0))
print(type(True))
`,
    hints: [
      "Dùng type(10) cho số nguyên.",
      "Dùng type('10') cho chuỗi.",
      "Dùng type(10.0) cho số thực.",
      "Dùng type(True) cho giá trị logic."
    ],
    solutionExplanation: `Mỗi hằng số trong Python có kiểu dữ liệu riêng biệt được xác định bởi hàm type().`,
    testCases: [
      { id: "cd1-b8-t1", input: "", expectedOutput: "<class 'int'>\n<class 'str'>\n<class 'float'>\n<class 'bool'>", isHidden: false }
    ]
  },
  {
    id: "cd1-bai-9",
    title: "Bài 9. Tính Điểm Trung Bình 3 Môn Làm Tròn 2 Chữ Số",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 1: Biến, Kiểu dữ liệu, Ép kiểu",
    difficulty: "Dễ",
    tags: ["float()", "Điểm trung bình", "round()"],
    points: 25,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 1: Biến, Kiểu dữ liệu, Ép kiểu",
    problemStatement: `Viết chương trình nhập điểm 3 môn học (kiểu số thực) từ bàn phím (mỗi môn trên 1 dòng), tính điểm trung bình của 3 môn và in ra kết quả làm tròn với 2 chữ số thập phân.`,
    inputFormat: "Gồm 3 dòng, mỗi dòng chứa một số thực là điểm của một môn (0.0 <= diem <= 10.0).",
    outputFormat: "Một số thực là điểm trung bình làm tròn 2 chữ số thập phân (dùng format: {:.2f} hoặc round()).",
    constraints: "0.0 <= diem <= 10.0",
    sampleCases: [
      {
        input: "8.5\n7.0\n9.0",
        output: "8.17",
        explanation: "(8.5 + 7.0 + 9.0) / 3 = 24.5 / 3 = 8.1666... làm tròn thành 8.17"
      },
      {
        input: "10.0\n9.0\n8.0",
        output: "9.00",
        explanation: "(10 + 9 + 8) / 3 = 9.00"
      }
    ],
    starterCode: `m1 = float(input())
m2 = float(input())
m3 = float(input())

dtb = (m1 + m2 + m3) / 3
print(f"{dtb:.2f}")
`,
    hints: [
      "Công thức tính ĐTB: (m1 + m2 + m3) / 3.",
      "Để in chuẩn 2 chữ số thập phân, dùng f-string: f'{dtb:.2f}'"
    ],
    solutionExplanation: `Tính tổng 3 điểm rồi chia 3. Định dạng xuất 2 chữ số thập phân bằng cú pháp f-string f"{dtb:.2f}".`,
    testCases: [
      { id: "cd1-b9-t1", input: "8.5\n7.0\n9.0", expectedOutput: "8.17", isHidden: false },
      { id: "cd1-b9-t2", input: "10.0\n9.0\n8.0", expectedOutput: "9.00", isHidden: false },
      { id: "cd1-b9-t3", input: "6.5\n7.25\n8.0", expectedOutput: "7.25", isHidden: true }
    ]
  },
  {
    id: "cd1-bai-10",
    title: "Bài 10. Ép Kiểu Biến z Sang Chuỗi, Float và Bool",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 1: Biến, Kiểu dữ liệu, Ép kiểu",
    difficulty: "Dễ",
    tags: ["str()", "float()", "bool()", "Ép kiểu"],
    points: 25,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 1: Biến, Kiểu dữ liệu, Ép kiểu",
    problemStatement: `Viết chương trình nhập vào một số nguyên z từ bàn phím.
Thực hiện ép kiểu z lần lượt thành:
1. Chuỗi (str)
2. Số thực (float)
3. Kiểu logic (bool) (chú ý: số 0 là False, các số khác 0 là True)

In kết quả và kiểu dữ liệu của mỗi phép ép kiểu trên từng dòng theo định dạng:
<giá trị> <kiểu dữ liệu>`,
    inputFormat: "Một số nguyên z.",
    outputFormat: "Gồm 3 dòng:\n- Dòng 1: str(z) type(str(z))\n- Dòng 2: float(z) type(float(z))\n- Dòng 3: bool(z) type(bool(z))",
    constraints: "-1000 <= z <= 1000",
    sampleCases: [
      {
        input: "5",
        output: "5 <class 'str'>\n5.0 <class 'float'>\nTrue <class 'bool'>",
        explanation: "5 chuyển thành '5', 5.0 và True."
      },
      {
        input: "0",
        output: "0 <class 'str'>\n0.0 <class 'float'>\nFalse <class 'bool'>",
        explanation: "Số 0 ép sang bool sẽ là False."
      }
    ],
    starterCode: `z = int(input())

s_val = str(z)
f_val = float(z)
b_val = bool(z)

print(s_val, type(s_val))
print(f_val, type(f_val))
print(b_val, type(b_val))
`,
    hints: [
      "str(z) biến số thành chuỗi ký tự.",
      "float(z) biến số nguyên thành số thực có phần .0.",
      "bool(z) trả về False khi z = 0, ngược lại trả về True."
    ],
    solutionExplanation: `Sử dụng các hàm ép kiểu có sẵn str(), float(), bool() kết hợp hàm type().`,
    testCases: [
      { id: "cd1-b10-t1", input: "5", expectedOutput: "5 <class 'str'>\n5.0 <class 'float'>\nTrue <class 'bool'>", isHidden: false },
      { id: "cd1-b10-t2", input: "0", expectedOutput: "0 <class 'str'>\n0.0 <class 'float'>\nFalse <class 'bool'>", isHidden: false },
      { id: "cd1-b10-t3", input: "-12", expectedOutput: "-12 <class 'str'>\n-12.0 <class 'float'>\nTrue <class 'bool'>", isHidden: true }
    ]
  },
  {
    id: "cd1-bai-11",
    title: "Bài 11. Hoán Đổi Giá Trị Hai Biến Không Dùng Biến Trung Gian",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 1: Biến, Kiểu dữ liệu, Ép kiểu",
    difficulty: "Trung bình",
    tags: ["Hoán đổi", "Swap", "Tuple Unpacking"],
    points: 30,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 1: Biến, Kiểu dữ liệu, Ép kiểu",
    problemStatement: `Viết chương trình nhập vào 2 số nguyên a và b.
Thực hiện hoán đổi giá trị của hai biến a và b mà KHÔNG dùng biến trung gian (sử dụng cú pháp đa gán độc đáo của Python: a, b = b, a).
In ra giá trị của a và b sau khi hoán đổi trên cùng một dòng, cách nhau một khoảng trắng.`,
    inputFormat: "Gồm 2 dòng chứa 2 số nguyên a và b.",
    outputFormat: "In ra 2 số a và b sau khi hoán đổi trên 1 dòng, cách nhau bởi dấu cách.",
    constraints: "-10000 <= a, b <= 10000",
    sampleCases: [
      {
        input: "3\n5",
        output: "5 3",
        explanation: "Ban đầu a=3, b=5. Sau khi hoán đổi: a=5, b=3."
      },
      {
        input: "100\n-20",
        output: "-20 100",
        explanation: "Ban đầu a=100, b=-20. Sau hoán đổi: a=-20, b=100."
      }
    ],
    starterCode: `a = int(input())
b = int(input())

# TODO: Hoán đổi a và b không dùng biến phụ
a, b = b, a

print(a, b)
`,
    hints: [
      "Trong Python, cú pháp `a, b = b, a` cho phép hoán vị trực tiếp giá trị 2 biến mà không cần biến tạm `temp`."
    ],
    solutionExplanation: `Python hỗ trợ tính năng Tuple Unpacking: a, b = b, a giúp hoán đổi giá trị nhanh gọn và an toàn.`,
    testCases: [
      { id: "cd1-b11-t1", input: "3\n5", expectedOutput: "5 3", isHidden: false },
      { id: "cd1-b11-t2", input: "100\n-20", expectedOutput: "-20 100", isHidden: false },
      { id: "cd1-b11-t3", input: "7\n7", expectedOutput: "7 7", isHidden: true }
    ]
  },
  {
    id: "cd1-bai-12",
    title: "Bài 12. Phép Nhân Chuỗi Với Số Nguyên (a * b)",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 1: Biến, Kiểu dữ liệu, Ép kiểu",
    difficulty: "Dễ",
    tags: ["Chuỗi", "Phép nhân chuỗi", "Lặp chuỗi"],
    points: 20,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 1: Biến, Kiểu dữ liệu, Ép kiểu",
    problemStatement: `Trong Python, khi nhân một chuỗi a với một số nguyên b (ví dụ: a * b), Python sẽ lặp lại chuỗi a đúng b lần liên tiếp.
Viết chương trình nhập vào một chuỗi a và một số nguyên dương b, in ra chuỗi kết quả của phép toán a * b.`,
    inputFormat: "Gồm 2 dòng:\n- Dòng 1: Chuỗi a\n- Dòng 2: Số nguyên dương b",
    outputFormat: "In ra chuỗi kết quả khi lặp lại a đúng b lần.",
    constraints: "Độ dài chuỗi a <= 50, 1 <= b <= 50",
    sampleCases: [
      {
        input: "Hello\n3",
        output: "HelloHelloHello",
        explanation: "'Hello' nhân 3 sẽ lặp lại 3 lần thành 'HelloHelloHello'."
      },
      {
        input: "*\n5",
        output: "*****",
        explanation: "Ký tự '*' lặp lại 5 lần."
      }
    ],
    starterCode: `a = input()
b = int(input())

# In ra kết quả của phép toán a * b
print(a * b)
`,
    hints: [
      "Toán tử * giữa chuỗi và số nguyên thực hiện phép nhân bản (lặp chuỗi)."
    ],
    solutionExplanation: `Phép toán string * int trong Python tạo ra chuỗi mới bằng cách lặp lại chuỗi ban đầu.`,
    testCases: [
      { id: "cd1-b12-t1", input: "Hello\n3", expectedOutput: "HelloHelloHello", isHidden: false },
      { id: "cd1-b12-t2", input: "*\n5", expectedOutput: "*****", isHidden: false },
      { id: "cd1-b12-t3", input: "Python-\n4", expectedOutput: "Python-Python-Python-Python-", isHidden: true }
    ]
  }
];
