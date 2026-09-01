import { AlgorithmProblem } from "../../types";

export const TOPIC_2_PROBLEMS: AlgorithmProblem[] = [
  {
    id: "cd2-bai-1",
    title: "Bài 1. 7 Phép Toán Số Học Cơ Bản Trong Python",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 2: Phép toán trong Python",
    difficulty: "Dễ",
    tags: ["Toán số học", "+, -, *, /, //, %, **"],
    points: 25,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 2: Phép toán trong Python",
    problemStatement: `Viết chương trình nhập vào 2 số nguyên dương a và b (trên 2 dòng).
In ra kết quả của 7 phép toán số học theo thứ tự sau (mỗi kết quả trên 1 dòng):
1. Phép cộng: a + b
2. Phép trừ: a - b
3. Phép nhân: a * b
4. Phép chia: a / b
5. Phép chia lấy nguyên: a // b
6. Phép chia lấy dư: a % b
7. Phép lũy thừa: a ** b`,
    inputFormat: "Gồm 2 dòng chứa 2 số nguyên dương a và b.",
    outputFormat: "Gồm 7 dòng lần lượt là kết quả của các phép tính trên.",
    constraints: "1 <= a <= 20, 1 <= b <= 10",
    sampleCases: [
      {
        input: "7\n3",
        output: "10\n4\n21\n2.3333333333333335\n2\n1\n343",
        explanation: "7+3=10, 7-3=4, 7*3=21, 7/3=2.333..., 7//3=2, 7%3=1, 7**3=343."
      }
    ],
    starterCode: `a = int(input())
b = int(input())

print(a + b)
print(a - b)
print(a * b)
print(a / b)
print(a // b)
print(a % b)
print(a ** b)
`,
    hints: [
      "Toán tử + (cộng), - (trừ), * (nhân), / (chia thập phân).",
      "Toán tử // (chia lấy nguyên), % (chia lấy dư), ** (lũy thừa)."
    ],
    solutionExplanation: `Sử dụng 7 toán tử chuẩn của Python để tính toán lần lượt.`,
    testCases: [
      { id: "cd2-b1-t1", input: "7\n3", expectedOutput: "10\n4\n21\n2.3333333333333335\n2\n1\n343", isHidden: false },
      { id: "cd2-b1-t2", input: "4\n2", expectedOutput: "6\n2\n8\n2.0\n2\n0\n16", isHidden: false },
      { id: "cd2-b1-t3", input: "10\n5", expectedOutput: "15\n5\n50\n2.0\n2\n0\n100000", isHidden: true }
    ]
  },
  {
    id: "cd2-bai-2",
    title: "Bài 2. Chu Vi và Diện Tích Hình Chữ Nhật",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 2: Phép toán trong Python",
    difficulty: "Dễ",
    tags: ["Hình chữ nhật", "Chu vi", "Diện tích"],
    points: 20,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 2: Phép toán trong Python",
    problemStatement: `Viết chương trình nhập vào chiều dài và chiều rộng của hình chữ nhật (2 số thực, mỗi số trên 1 dòng).
Tính và in ra chu vi và diện tích của hình chữ nhật trên 2 dòng:
- Dòng 1: Chu vi = (dài + rộng) * 2
- Dòng 2: Diện tích = dài * rộng`,
    inputFormat: "Gồm 2 dòng chứa chiều dài d và chiều rộng r.",
    outputFormat: "Gồm 2 dòng:\n- Dòng 1: Chu vi\n- Dòng 2: Diện tích",
    constraints: "d > 0, r > 0",
    sampleCases: [
      {
        input: "5\n3",
        output: "16.0\n15.0",
        explanation: "Chu vi = (5+3)*2 = 16, Diện tích = 5*3 = 15."
      },
      {
        input: "4.5\n2",
        output: "13.0\n9.0",
        explanation: "Chu vi = (4.5+2)*2 = 13.0, Diện tích = 4.5*2 = 9.0."
      }
    ],
    starterCode: `dai = float(input())
rong = float(input())

chu_vi = (dai + rong) * 2
dien_tich = dai * rong

print(chu_vi)
print(dien_tich)
`,
    hints: [
      "Công thức chu vi: (dai + rong) * 2",
      "Công thức diện tích: dai * rong"
    ],
    solutionExplanation: `Áp dụng công thức hình học quen thuộc với số thực float.`,
    testCases: [
      { id: "cd2-b2-t1", input: "5\n3", expectedOutput: "16.0\n15.0", isHidden: false },
      { id: "cd2-b2-t2", input: "4.5\n2", expectedOutput: "13.0\n9.0", isHidden: false },
      { id: "cd2-b2-t3", input: "10\n10", expectedOutput: "40.0\n100.0", isHidden: true }
    ]
  },
  {
    id: "cd2-bai-3",
    title: "Bài 3. Tính Giá Trị Biểu Thức (a % b) * 2 + a // b",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 2: Phép toán trong Python",
    difficulty: "Dễ",
    tags: ["Thứ tự ưu tiên", "Chia lấy dư", "Chia lấy nguyên"],
    points: 20,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 2: Phép toán trong Python",
    problemStatement: `Cho hai số nguyên a và b (nhập từ bàn phím).
Viết chương trình tính giá trị của biểu thức:
P = (a % b) * 2 + a // b
và in kết quả ra màn hình.`,
    inputFormat: "Gồm 2 dòng chứa 2 số nguyên a và b (b != 0).",
    outputFormat: "Một số nguyên duy nhất là giá trị biểu thức P.",
    constraints: "1 <= a <= 10000, 1 <= b <= 10000",
    sampleCases: [
      {
        input: "15\n4",
        output: "9",
        explanation: "(15 % 4) = 3; 3 * 2 = 6; 15 // 4 = 3; 6 + 3 = 9."
      },
      {
        input: "20\n6",
        output: "7",
        explanation: "(20 % 6) = 2; 2 * 2 = 4; 20 // 6 = 3; 4 + 3 = 7."
      }
    ],
    starterCode: `a = int(input())
b = int(input())

ket_qua = (a % b) * 2 + a // b
print(ket_qua)
`,
    hints: [
      "Thực hiện phép chia lấy dư % và chia lấy nguyên // đúng theo công thức."
    ],
    solutionExplanation: `Thứ tự tính: dấu ngoặc -> nhân -> cộng.`,
    testCases: [
      { id: "cd2-b3-t1", input: "15\n4", expectedOutput: "9", isHidden: false },
      { id: "cd2-b3-t2", input: "20\n6", expectedOutput: "7", isHidden: false },
      { id: "cd2-b3-t3", input: "7\n7", expectedOutput: "1", isHidden: true }
    ]
  },
  {
    id: "cd2-bai-4",
    title: "Bài 4. Kiểm Tra Số Chia Hết Cho Cả 3 và 5",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 2: Phép toán trong Python",
    difficulty: "Dễ",
    tags: ["Chia hết", "%", "Toán tử and", "bool"],
    points: 25,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 2: Phép toán trong Python",
    problemStatement: `Viết chương trình nhập vào một số nguyên n từ bàn phím.
Kiểm tra xem n có chia hết cho cả 3 và 5 hay không (tức n chia hết cho 15) bằng cách sử dụng toán tử chia lấy dư % và toán tử logic and.
In ra "True" nếu chia hết cho cả hai số, ngược lại in "False".`,
    inputFormat: "Một số nguyên n.",
    outputFormat: "In ra 'True' hoặc 'False'.",
    constraints: "-10^6 <= n <= 10^6",
    sampleCases: [
      {
        input: "15",
        output: "True",
        explanation: "15 chia hết cho cả 3 và 5."
      },
      {
        input: "10",
        output: "False",
        explanation: "10 chia hết cho 5 nhưng không chia hết cho 3."
      }
    ],
    starterCode: `n = int(input())

# Kiểm tra chia hết cho cả 3 và 5
is_divisible = (n % 3 == 0) and (n % 5 == 0)
print(is_divisible)
`,
    hints: [
      "Số chia hết cho 3 khi n % 3 == 0.",
      "Số chia hết cho 5 khi n % 5 == 0.",
      "Kết hợp 2 điều kiện bằng toán tử `and`."
    ],
    solutionExplanation: `Biểu thức logic: (n % 3 == 0) and (n % 5 == 0) trả về True khi n là bội của 15.`,
    testCases: [
      { id: "cd2-b4-t1", input: "15", expectedOutput: "True", isHidden: false },
      { id: "cd2-b4-t2", input: "10", expectedOutput: "False", isHidden: false },
      { id: "cd2-b4-t3", input: "30", expectedOutput: "True", isHidden: true },
      { id: "cd2-b4-t4", input: "9", expectedOutput: "False", isHidden: true }
    ]
  },
  {
    id: "cd2-bai-5",
    title: "Bài 5. Tính Trung Bình Cộng Của 3 Số",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 2: Phép toán trong Python",
    difficulty: "Dễ",
    tags: ["Trung bình cộng", "Phép chia", "Toán học"],
    points: 20,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 2: Phép toán trong Python",
    problemStatement: `Viết chương trình nhập vào 3 số thực a, b, c (mỗi số trên 1 dòng).
Tính trung bình cộng của 3 số đó và in kết quả ra màn hình.`,
    inputFormat: "Gồm 3 dòng chứa 3 số thực a, b, c.",
    outputFormat: "Một số thực là trung bình cộng của a, b, c.",
    constraints: "-1000.0 <= a, b, c <= 1000.0",
    sampleCases: [
      {
        input: "3\n6\n9",
        output: "6.0",
        explanation: "(3 + 6 + 9) / 3 = 18 / 3 = 6.0"
      },
      {
        input: "2.5\n3.5\n4.5",
        output: "3.5",
        explanation: "(2.5 + 3.5 + 4.5) / 3 = 10.5 / 3 = 3.5"
      }
    ],
    starterCode: `a = float(input())
b = float(input())
c = float(input())

tbc = (a + b + c) / 3
print(tbc)
`,
    hints: [
      "Công thức trung bình cộng: (a + b + c) / 3."
    ],
    solutionExplanation: `Tính tổng 3 số và chia cho 3 bằng phép chia thực /.`,
    testCases: [
      { id: "cd2-b5-t1", input: "3\n6\n9", expectedOutput: "6.0", isHidden: false },
      { id: "cd2-b5-t2", input: "2.5\n3.5\n4.5", expectedOutput: "3.5", isHidden: false },
      { id: "cd2-b5-t3", input: "10\n20\n30", expectedOutput: "20.0", isHidden: true }
    ]
  },
  {
    id: "cd2-bai-6",
    title: "Bài 6. Kiểm Chứng Biểu Thức Logic (5 > 3 and 2 < 1)",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 2: Phép toán trong Python",
    difficulty: "Dễ",
    tags: ["Toán tử logic", "and", "So sánh", "bool"],
    points: 20,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 2: Phép toán trong Python",
    problemStatement: `Viết chương trình kiểm chứng giá trị của biểu thức logic: (5 > 3 and 2 < 1).
In kết quả True/False ra màn hình.`,
    inputFormat: "Không có dữ liệu đầu vào.",
    outputFormat: "In ra 'False' (vì 5 > 3 là True nhưng 2 < 1 là False, True and False = False).",
    constraints: "Không có",
    sampleCases: [
      {
        input: "",
        output: "False",
        explanation: "5 > 3 là True, 2 < 1 là False -> True and False là False."
      }
    ],
    starterCode: `ket_qua = (5 > 3 and 2 < 1)
print(ket_qua)
`,
    hints: [
      "Toán tử and chỉ trả về True khi CẢ HAI vế đều đúng."
    ],
    solutionExplanation: `Vế phải 2 < 1 là sai (False), do đó phép and cho kết quả là False.`,
    testCases: [
      { id: "cd2-b6-t1", input: "", expectedOutput: "False", isHidden: false }
    ]
  },
  {
    id: "cd2-bai-7",
    title: "Bài 7. Chu Vi và Diện Tích Hình Tròn (π = 3.14)",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 2: Phép toán trong Python",
    difficulty: "Dễ",
    tags: ["Hình tròn", "Chu vi", "Diện tích", "Số thực"],
    points: 25,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 2: Phép toán trong Python",
    problemStatement: `Viết chương trình nhập vào bán kính r của hình tròn (số thực).
Lấy hằng số π = 3.14.
Tính và in ra:
- Dòng 1: Chu vi hình tròn = 2 * π * r
- Dòng 2: Diện tích hình tròn = π * r * r
(Làm tròn kết quả 2 chữ số thập phân).`,
    inputFormat: "Một dòng chứa bán kính r (số thực dương).",
    outputFormat: "Gồm 2 dòng in ra Chu vi và Diện tích (làm tròn 2 chữ số thập phân).",
    constraints: "0.1 <= r <= 1000.0",
    sampleCases: [
      {
        input: "5",
        output: "31.40\n78.50",
        explanation: "Chu vi = 2 * 3.14 * 5 = 31.4; Diện tích = 3.14 * 25 = 78.5."
      },
      {
        input: "2.5",
        output: "15.70\n19.62",
        explanation: "Chu vi = 2 * 3.14 * 2.5 = 15.70; Diện tích = 3.14 * 6.25 = 19.625 -> 19.62 / 19.63."
      }
    ],
    starterCode: `r = float(input())
PI = 3.14

chu_vi = 2 * PI * r
dien_tich = PI * (r ** 2)

print(f"{chu_vi:.2f}")
print(f"{dien_tich:.2f}")
`,
    hints: [
      "Chu vi = 2 * 3.14 * r.",
      "Diện tích = 3.14 * r ** 2.",
      "Dùng f-string f'{chu_vi:.2f}' để xuất 2 chữ số thập phân."
    ],
    solutionExplanation: `Áp dụng công thức chu vi và diện tích hình tròn với PI = 3.14.`,
    testCases: [
      { id: "cd2-b7-t1", input: "5", expectedOutput: "31.40\n78.50", isHidden: false },
      { id: "cd2-b7-t2", input: "10", expectedOutput: "62.80\n314.00", isHidden: false },
      { id: "cd2-b7-t3", input: "1", expectedOutput: "6.28\n3.14", isHidden: true }
    ]
  },
  {
    id: "cd2-bai-8",
    title: "Bài 8. Kiểm Tra 4 Biểu Thức So Sánh (==, !=, >=, <=)",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 2: Phép toán trong Python",
    difficulty: "Dễ",
    tags: ["So sánh", "==, !=", ">=, <=", "bool"],
    points: 20,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 2: Phép toán trong Python",
    problemStatement: `Viết chương trình nhập vào một số nguyên x từ bàn phím.
Kiểm tra và in ra kết quả (True hoặc False) của 4 biểu thức sau trên 4 dòng:
1. x == 10
2. x != 5
3. x >= 10
4. x <= 9`,
    inputFormat: "Một dòng chứa số nguyên x.",
    outputFormat: "Gồm 4 dòng chứa giá trị True/False của 4 phép so sánh.",
    constraints: "-100 <= x <= 100",
    sampleCases: [
      {
        input: "10",
        output: "True\nTrue\nTrue\nFalse",
        explanation: "10==10 (True), 10!=5 (True), 10>=10 (True), 10<=9 (False)."
      },
      {
        input: "5",
        output: "False\nFalse\nFalse\nTrue",
        explanation: "5==10 (False), 5!=5 (False), 5>=10 (False), 5<=9 (True)."
      }
    ],
    starterCode: `x = int(input())

print(x == 10)
print(x != 5)
print(x >= 10)
print(x <= 9)
`,
    hints: [
      "Toán tử so sánh bằng là ==, khác là !=, lớn hơn hoặc bằng là >=, nhỏ hơn hoặc bằng là <=."
    ],
    solutionExplanation: `Thực hiện lần lượt các phép toán so sánh trong Python.`,
    testCases: [
      { id: "cd2-b8-t1", input: "10", expectedOutput: "True\nTrue\nTrue\nFalse", isHidden: false },
      { id: "cd2-b8-t2", input: "5", expectedOutput: "False\nFalse\nFalse\nTrue", isHidden: false },
      { id: "cd2-b8-t3", input: "9", expectedOutput: "False\nTrue\nFalse\nTrue", isHidden: true }
    ]
  },
  {
    id: "cd2-bai-9",
    title: "Bài 9. Đổi Nhiệt Độ Từ Độ C Sang Độ F",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 2: Phép toán trong Python",
    difficulty: "Dễ",
    tags: ["Chuyển đổi đơn vị", "Nhiệt độ", "Độ C sang Độ F"],
    points: 20,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 2: Phép toán trong Python",
    problemStatement: `Viết chương trình đổi nhiệt độ từ độ Celsius (°C) sang độ Fahrenheit (°F) theo công thức:
F = C * 9/5 + 32
với nhiệt độ C là số thực được nhập từ bàn phím.
In ra giá trị nhiệt độ F làm tròn 2 chữ số thập phân.`,
    inputFormat: "Một dòng chứa số thực C.",
    outputFormat: "In ra giá trị F (định dạng {:.2f}).",
    constraints: "-100.0 <= C <= 200.0",
    sampleCases: [
      {
        input: "0",
        output: "32.00",
        explanation: "0 * 9/5 + 32 = 32.00."
      },
      {
        input: "100",
        output: "212.00",
        explanation: "100 * 9/5 + 32 = 180 + 32 = 212.00."
      },
      {
        input: "37",
        output: "98.60",
        explanation: "37 * 1.8 + 32 = 98.60."
      }
    ],
    starterCode: `c = float(input())

f = c * 9 / 5 + 32
print(f"{f:.2f}")
`,
    hints: [
      "Công thức: F = C * 9 / 5 + 32.",
      "Dùng f-string f'{f:.2f}' để xuất kết quả."
    ],
    solutionExplanation: `Áp dụng công thức chuyển đổi nhiệt độ F = C * 9/5 + 32.`,
    testCases: [
      { id: "cd2-b9-t1", input: "0", expectedOutput: "32.00", isHidden: false },
      { id: "cd2-b9-t2", input: "100", expectedOutput: "212.00", isHidden: false },
      { id: "cd2-b9-t3", input: "37", expectedOutput: "98.60", isHidden: true },
      { id: "cd2-b9-t4", input: "-40", expectedOutput: "-40.00", isHidden: true }
    ]
  },
  {
    id: "cd2-bai-10",
    title: "Bài 10. Tính Giá Trị Biểu Thức (a + b) * (a - b)",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 2: Phép toán trong Python",
    difficulty: "Dễ",
    tags: ["Hằng đẳng thức", "Hiệu hai bình phương", "Số nguyên"],
    points: 20,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 2: Phép toán trong Python",
    problemStatement: `Viết chương trình nhập hai số nguyên a và b (trên 2 dòng), rồi tính giá trị của biểu thức hằng đẳng thức hiệu hai bình phương:
P = (a + b) * (a - b)
In kết quả ra màn hình.`,
    inputFormat: "Gồm 2 dòng chứa 2 số nguyên a và b.",
    outputFormat: "Một số nguyên duy nhất là kết quả của biểu thức.",
    constraints: "-10000 <= a, b <= 10000",
    sampleCases: [
      {
        input: "5\n3",
        output: "16",
        explanation: "(5 + 3) * (5 - 3) = 8 * 2 = 16 (tương đương 5^2 - 3^2 = 25 - 9 = 16)."
      },
      {
        input: "10\n4",
        output: "84",
        explanation: "14 * 6 = 84 (100 - 16 = 84)."
      }
    ],
    starterCode: `a = int(input())
b = int(input())

ket_qua = (a + b) * (a - b)
print(ket_qua)
`,
    hints: [
      "Tính (a + b) nhân với (a - b)."
    ],
    solutionExplanation: `Tính trực tiếp biểu thức (a + b) * (a - b).`,
    testCases: [
      { id: "cd2-b10-t1", input: "5\n3", expectedOutput: "16", isHidden: false },
      { id: "cd2-b10-t2", input: "10\n4", expectedOutput: "84", isHidden: false },
      { id: "cd2-b10-t3", input: "7\n7", expectedOutput: "0", isHidden: true }
    ]
  },
  {
    id: "cd2-bai-11",
    title: "Bài 11. Kiểm Tra Năm Nhuận Bằng Toán Tử Logic and, or, not",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 2: Phép toán trong Python",
    difficulty: "Trung bình",
    tags: ["Năm nhuận", "Toán tử logic", "and", "or"],
    points: 30,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 2: Phép toán trong Python",
    problemStatement: `Theo quy ước lịch Dương:
Một năm là năm nhuận nếu:
- Năm đó chia hết cho 400, HOẶC
- Năm đó chia hết cho 4 VÀ không chia hết cho 100.

Viết chương trình nhập vào một năm ` + "`nam`" + ` (số nguyên dương) và in ra True nếu là năm nhuận, ngược lại in False bằng một biểu thức logic kết hợp and, or.`,
    inputFormat: "Một số nguyên dương nam (1 <= nam <= 3000).",
    outputFormat: "In ra 'True' hoặc 'False'.",
    constraints: "1 <= nam <= 3000",
    sampleCases: [
      {
        input: "2024",
        output: "True",
        explanation: "2024 chia hết cho 4 và không chia hết cho 100 nên là năm nhuận."
      },
      {
        input: "1900",
        output: "False",
        explanation: "1900 chia hết cho 100 nhưng không chia hết cho 400 nên không nhuận."
      },
      {
        input: "2000",
        output: "True",
        explanation: "2000 chia hết cho 400 nên là năm nhuận thế kỷ."
      }
    ],
    starterCode: `nam = int(input())

is_leap = (nam % 400 == 0) or (nam % 4 == 0 and nam % 100 != 0)
print(is_leap)
`,
    hints: [
      "Biểu thức logic: (nam % 400 == 0) or (nam % 4 == 0 and nam % 100 != 0)."
    ],
    solutionExplanation: `Quy tắc năm nhuận chuẩn quốc tế áp dụng phép toán logic or và and.`,
    testCases: [
      { id: "cd2-b11-t1", input: "2024", expectedOutput: "True", isHidden: false },
      { id: "cd2-b11-t2", input: "1900", expectedOutput: "False", isHidden: false },
      { id: "cd2-b11-t3", input: "2000", expectedOutput: "True", isHidden: false },
      { id: "cd2-b11-t4", input: "2023", expectedOutput: "False", isHidden: true }
    ]
  },
  {
    id: "cd2-bai-12",
    title: "Bài 12. Chu Vi và Diện Tích Hình Vuông Trên Cùng Một Dòng",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 2: Phép toán trong Python",
    difficulty: "Dễ",
    tags: ["Hình vuông", "Chu vi", "Diện tích"],
    points: 20,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 2: Phép toán trong Python",
    problemStatement: `Viết chương trình nhập vào độ dài cạnh ` + "`a`" + ` của một hình vuông (số nguyên dương).
Tính chu vi (C = a * 4) và diện tích (S = a * a) của hình vuông đó, sau đó in chu vi và diện tích trên cùng một dòng, cách nhau bởi một dấu cách.`,
    inputFormat: "Một số nguyên dương a.",
    outputFormat: "In ra 2 số nguyên cách nhau một khoảng trắng: chu vi và diện tích.",
    constraints: "1 <= a <= 10000",
    sampleCases: [
      {
        input: "5",
        output: "20 25",
        explanation: "Chu vi = 5*4 = 20, Diện tích = 5*5 = 25."
      },
      {
        input: "8",
        output: "32 64",
        explanation: "Chu vi = 8*4 = 32, Diện tích = 8*8 = 64."
      }
    ],
    starterCode: `a = int(input())

chu_vi = a * 4
dien_tich = a * a

print(chu_vi, dien_tich)
`,
    hints: [
      "Chu vi hình vuông: a * 4.",
      "Diện tích hình vuông: a * a hoặc a ** 2.",
      "Dùng print(chu_vi, dien_tich) để in trên cùng 1 dòng cách nhau dấu cách."
    ],
    solutionExplanation: `Tính C = a*4 và S = a*a, xuất ra cùng dòng với hàm print(C, S).`,
    testCases: [
      { id: "cd2-b12-t1", input: "5", expectedOutput: "20 25", isHidden: false },
      { id: "cd2-b12-t2", input: "8", expectedOutput: "32 64", isHidden: false },
      { id: "cd2-b12-t3", input: "1", expectedOutput: "4 1", isHidden: true }
    ]
  }
];
