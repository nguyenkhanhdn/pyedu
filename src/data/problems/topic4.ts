import { AlgorithmProblem } from "../../types";

export const TOPIC_4_PROBLEMS: AlgorithmProblem[] = [
  {
    id: "cd4-bai-1",
    title: "Bài 1. Kiểm Tra Số Chẵn Hay Số Lẻ",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 4: Câu lệnh If - Else & Rẽ nhánh",
    difficulty: "Dễ",
    tags: ["if-else", "Số chẵn", "Số lẻ", "Chia lấy dư"],
    points: 20,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 4: If, If-Else, If-Elif-Else, Nested If",
    problemStatement: `Viết chương trình nhập vào một số nguyên n từ bàn phím.
Kiểm tra và in ra:
- "CHAN" nếu n là số chẵn (chia hết cho 2).
- "LE" nếu n là số lẻ (không chia hết cho 2).`,
    inputFormat: "Một số nguyên n.",
    outputFormat: "In ra 'CHAN' hoặc 'LE'.",
    constraints: "-10^9 <= n <= 10^9",
    sampleCases: [
      {
        input: "8",
        output: "CHAN",
        explanation: "8 chia hết cho 2 nên là số chẵn."
      },
      {
        input: "7",
        output: "LE",
        explanation: "7 chia 2 dư 1 nên là số lẻ."
      }
    ],
    starterCode: `n = int(input())

if n % 2 == 0:
    print("CHAN")
else:
    print("LE")
`,
    hints: [
      "Dùng n % 2 == 0 để kiểm tra chẵn lẻ."
    ],
    solutionExplanation: `Sử dụng cấu trúc rẽ nhánh if - else với điều kiện n % 2 == 0.`,
    testCases: [
      { id: "cd4-b1-t1", input: "8", expectedOutput: "CHAN", isHidden: false },
      { id: "cd4-b1-t2", input: "7", expectedOutput: "LE", isHidden: false },
      { id: "cd4-b1-t3", input: "0", expectedOutput: "CHAN", isHidden: true },
      { id: "cd4-b1-t4", input: "-15", expectedOutput: "LE", isHidden: true }
    ]
  },
  {
    id: "cd4-bai-2",
    title: "Bài 2. Xếp Loại Học Lực Theo Điểm Thi (if-elif-else)",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 4: Câu lệnh If - Else & Rẽ nhánh",
    difficulty: "Dễ",
    tags: ["if-elif-else", "Xếp loại", "So sánh"],
    points: 25,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 4: If, If-Else, If-Elif-Else, Nested If",
    problemStatement: `Viết chương trình nhập điểm thi môn học (thang điểm 0 - 10, kiểu số thực), in ra xếp loại theo quy chuẩn:
- Điểm >= 8.0: In "Gioi"
- Điểm >= 6.5: In "Kha"
- Điểm >= 5.0: In "Trung binh"
- Điểm < 5.0: In "Yeu"`,
    inputFormat: "Một số thực score (0.0 <= score <= 10.0).",
    outputFormat: "In ra một chuỗi trong: 'Gioi', 'Kha', 'Trung binh', 'Yeu'.",
    constraints: "0.0 <= score <= 10.0",
    sampleCases: [
      {
        input: "8.5",
        output: "Gioi",
        explanation: "8.5 >= 8.0 -> Gioi."
      },
      {
        input: "7.0",
        output: "Kha",
        explanation: "6.5 <= 7.0 < 8.0 -> Kha."
      },
      {
        input: "4.5",
        output: "Yeu",
        explanation: "4.5 < 5.0 -> Yeu."
      }
    ],
    starterCode: `diem = float(input())

if diem >= 8.0:
    print("Gioi")
elif diem >= 6.5:
    print("Kha")
elif diem >= 5.0:
    print("Trung binh")
else:
    print("Yeu")
`,
    hints: [
      "Kiểm tra từ mức điểm cao nhất xuống thấp nhất bằng elif."
    ],
    solutionExplanation: `Cấu trúc if-elif-else từ 8.0 -> 6.5 -> 5.0 -> else.`,
    testCases: [
      { id: "cd4-b2-t1", input: "8.5", expectedOutput: "Gioi", isHidden: false },
      { id: "cd4-b2-t2", input: "7.0", expectedOutput: "Kha", isHidden: false },
      { id: "cd4-b2-t3", input: "4.5", expectedOutput: "Yeu", isHidden: false },
      { id: "cd4-b2-t4", input: "5.0", expectedOutput: "Trung binh", isHidden: true }
    ]
  },
  {
    id: "cd4-bai-3",
    title: "Bài 3. Tìm Số Lớn Nhất Trong 3 Số Bằng Nested If",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 4: Câu lệnh If - Else & Rẽ nhánh",
    difficulty: "Trung bình",
    tags: ["Nested if", "Max 3 số", "If lồng nhau"],
    points: 25,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 4: If, If-Else, If-Elif-Else, Nested If",
    problemStatement: `Viết chương trình nhập vào 3 số nguyên a, b, c (trên 3 dòng).
Tìm và in ra số lớn nhất trong 3 số bằng cấu trúc if lồng nhau (nested if), không dùng hàm max() có sẵn.`,
    inputFormat: "Gồm 3 dòng chứa 3 số nguyên a, b, c.",
    outputFormat: "Một số nguyên duy nhất là số lớn nhất.",
    constraints: "-10^9 <= a, b, c <= 10^9",
    sampleCases: [
      {
        input: "15\n42\n28",
        output: "42",
        explanation: "42 là số lớn nhất trong 15, 42, 28."
      },
      {
        input: "100\n50\n75",
        output: "100",
        explanation: "100 là số lớn nhất."
      }
    ],
    starterCode: `a = int(input())
b = int(input())
c = int(input())

# Dùng nested if để tìm max
if a >= b:
    if a >= c:
        max_val = a
    else:
        max_val = c
else:
    if b >= c:
        max_val = b
    else:
        max_val = c

print(max_val)
`,
    hints: [
      "So sánh a và b trước: nếu a >= b thì kiểm tra tiếp a và c, ngược lại so sánh b và c."
    ],
    solutionExplanation: `Sử dụng 2 tầng if-else lồng nhau để phân nhánh xác định giá trị lớn nhất.`,
    testCases: [
      { id: "cd4-b3-t1", input: "15\n42\n28", expectedOutput: "42", isHidden: false },
      { id: "cd4-b3-t2", input: "100\n50\n75", expectedOutput: "100", isHidden: false },
      { id: "cd4-b3-t3", input: "-5\n-2\n-10", expectedOutput: "-2", isHidden: true }
    ]
  },
  {
    id: "cd4-bai-4",
    title: "Bài 4. Phân Loại Độ Tuổi (Trẻ Em, Thiếu Niên, Người Lớn)",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 4: Câu lệnh If - Else & Rẽ nhánh",
    difficulty: "Dễ",
    tags: ["if-elif-else", "Phân loại", "Độ tuổi"],
    points: 20,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 4: If, If-Else, If-Elif-Else, Nested If",
    problemStatement: `Viết chương trình nhập tuổi của một người (số nguyên dương), in ra phân loại độ tuổi:
- Dưới 13 tuổi: In "Tre em"
- Từ 13 đến 17 tuổi: In "Thanh thieu nien"
- Từ 18 tuổi trở lên: In "Nguoi lon"`,
    inputFormat: "Một số nguyên dương tuoi (1 <= tuoi <= 120).",
    outputFormat: "In ra 'Tre em', 'Thanh thieu nien' hoặc 'Nguoi lon'.",
    constraints: "1 <= tuoi <= 120",
    sampleCases: [
      {
        input: "10",
        output: "Tre em",
        explanation: "10 < 13 tuổi là Trẻ em."
      },
      {
        input: "15",
        output: "Thanh thieu nien",
        explanation: "15 tuổi là Thanh thiếu niên."
      },
      {
        input: "20",
        output: "Nguoi lon",
        explanation: "20 >= 18 tuổi là Người lớn."
      }
    ],
    starterCode: `tuoi = int(input())

if tuoi < 13:
    print("Tre em")
elif tuoi <= 17:
    print("Thanh thieu nien")
else:
    print("Nguoi lon")
`,
    hints: [
      "Kiểm tra < 13 -> Tre em, <= 17 -> Thanh thieu nien, còn lại -> Nguoi lon."
    ],
    solutionExplanation: `Phân nhánh theo các khoảng giá trị của tuổi.`,
    testCases: [
      { id: "cd4-b4-t1", input: "10", expectedOutput: "Tre em", isHidden: false },
      { id: "cd4-b4-t2", input: "15", expectedOutput: "Thanh thieu nien", isHidden: false },
      { id: "cd4-b4-t3", input: "20", expectedOutput: "Nguoi lon", isHidden: false },
      { id: "cd4-b4-t4", input: "13", expectedOutput: "Thanh thieu nien", isHidden: true },
      { id: "cd4-b4-t5", input: "18", expectedOutput: "Nguoi lon", isHidden: true }
    ]
  },
  {
    id: "cd4-bai-5",
    title: "Bài 5. Kiểm Tra Năm Nhuận (if-elif-else)",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 4: Câu lệnh If - Else & Rẽ nhánh",
    difficulty: "Trung bình",
    tags: ["Năm nhuận", "if-elif-else", "Lịch dương"],
    points: 25,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 4: If, If-Else, If-Elif-Else, Nested If",
    problemStatement: `Viết chương trình nhập vào một năm ` + "`nam`" + ` (số nguyên dương).
Sử dụng cấu trúc ` + "`if - elif - else`" + ` để kiểm tra:
- Nếu chia hết cho 400: in "NAM NHUAN"
- Elif chia hết cho 100: in "NAM KHONG NHUAN"
- Elif chia hết cho 4: in "NAM NHUAN"
- Else: in "NAM KHONG NHUAN"`,
    inputFormat: "Một số nguyên dương nam.",
    outputFormat: "In ra 'NAM NHUAN' hoặc 'NAM KHONG NHUAN'.",
    constraints: "1 <= nam <= 5000",
    sampleCases: [
      {
        input: "2024",
        output: "NAM NHUAN",
        explanation: "2024 chia hết cho 4."
      },
      {
        input: "2100",
        output: "NAM KHONG NHUAN",
        explanation: "2100 chia hết cho 100 nhưng không chia hết cho 400."
      },
      {
        input: "2000",
        output: "NAM NHUAN",
        explanation: "2000 chia hết cho 400."
      }
    ],
    starterCode: `nam = int(input())

if nam % 400 == 0:
    print("NAM NHUAN")
elif nam % 100 == 0:
    print("NAM KHONG NHUAN")
elif nam % 4 == 0:
    print("NAM NHUAN")
else:
    print("NAM KHONG NHUAN")
`,
    hints: [
      "Thứ tự kiểm tra: % 400 -> % 100 -> % 4 -> else."
    ],
    solutionExplanation: `Cấu trúc if-elif-else xử lý tuần tự trường hợp ngoại lệ thế kỷ trước rồi mới đến chia hết cho 4.`,
    testCases: [
      { id: "cd4-b5-t1", input: "2024", expectedOutput: "NAM NHUAN", isHidden: false },
      { id: "cd4-b5-t2", input: "2100", expectedOutput: "NAM KHONG NHUAN", isHidden: false },
      { id: "cd4-b5-t3", input: "2000", expectedOutput: "NAM NHUAN", isHidden: false },
      { id: "cd4-b5-t4", input: "2023", expectedOutput: "NAM KHONG NHUAN", isHidden: true }
    ]
  },
  {
    id: "cd4-bai-6",
    title: "Bài 6. Kiểm Tra 3 Cạnh Tam Giác Hợp Lệ (Nested If)",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 4: Câu lệnh If - Else & Rẽ nhánh",
    difficulty: "Trung bình",
    tags: ["Tam giác", "Bất đẳng thức tam giác", "Nested if"],
    points: 30,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 4: If, If-Else, If-Elif-Else, Nested If",
    problemStatement: `Viết chương trình nhập vào 3 số thực a, b, c là độ dài 3 cạnh (mỗi số trên 1 dòng).
Sử dụng cấu trúc ` + "`nested if`" + ` để kiểm tra:
1. Trước hết cả 3 cạnh phải là số dương (a > 0 và b > 0 và c > 0). Nếu không dương -> in "KHONG HOP LE".
2. Nếu dương, kiểm tra bất đẳng thức tam giác: (a + b > c) và (a + c > b) và (b + c > a).
   - Nếu thỏa mãn: in "TAM GIAC HOP LE"
   - Nếu không thỏa mãn: in "KHONG PHAI TAM GIAC"`,
    inputFormat: "Gồm 3 dòng chứa 3 số thực a, b, c.",
    outputFormat: "In ra 'TAM GIAC HOP LE', 'KHONG PHAI TAM GIAC' hoặc 'KHONG HOP LE'.",
    constraints: "-1000.0 <= a, b, c <= 1000.0",
    sampleCases: [
      {
        input: "3\n4\n5",
        output: "TAM GIAC HOP LE",
        explanation: "3, 4, 5 là 3 cạnh tam giác vuông hợp lệ."
      },
      {
        input: "1\n2\n5",
        output: "KHONG PHAI TAM GIAC",
        explanation: "1 + 2 = 3 < 5 nên không thỏa bất đẳng thức tam giác."
      },
      {
        input: "-2\n3\n4",
        output: "KHONG HOP LE",
        explanation: "Có cạnh âm (-2) nên không hợp lệ."
      }
    ],
    starterCode: `a = float(input())
b = float(input())
c = float(input())

if a > 0 and b > 0 and c > 0:
    if (a + b > c) and (a + c > b) and (b + c > a):
        print("TAM GIAC HOP LE")
    else:
        print("KHONG PHAI TAM GIAC")
else:
    print("KHONG HOP LE")
`,
    hints: [
      "Tầng 1: kiểm tra a > 0 and b > 0 and c > 0.",
      "Tầng 2: kiểm tra bất đẳng thức tam giác."
    ],
    solutionExplanation: `Cấu trúc nested if đảm bảo các cạnh dương trước khi kiểm tra tổng hai cạnh lớn hơn cạnh còn lại.`,
    testCases: [
      { id: "cd4-b6-t1", input: "3\n4\n5", expectedOutput: "TAM GIAC HOP LE", isHidden: false },
      { id: "cd4-b6-t2", input: "1\n2\n5", expectedOutput: "KHONG PHAI TAM GIAC", isHidden: false },
      { id: "cd4-b6-t3", input: "-2\n3\n4", expectedOutput: "KHONG HOP LE", isHidden: false },
      { id: "cd4-b6-t4", input: "5\n5\n5", expectedOutput: "TAM GIAC HOP LE", isHidden: true }
    ]
  },
  {
    id: "cd4-bai-7",
    title: "Bài 7. Kiểm Tra Số Dương, Số Âm Hay Bằng 0",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 4: Câu lệnh If - Else & Rẽ nhánh",
    difficulty: "Dễ",
    tags: ["if-elif-else", "Số âm", "Số dương"],
    points: 20,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 4: If, If-Else, If-Elif-Else, Nested If",
    problemStatement: `Viết chương trình nhập vào một số nguyên n từ bàn phím.
Kiểm tra và in ra:
- "DUONG" nếu n > 0
- "AM" nếu n < 0
- "BANG 0" nếu n == 0`,
    inputFormat: "Một số nguyên n.",
    outputFormat: "In ra 'DUONG', 'AM' hoặc 'BANG 0'.",
    constraints: "-10^9 <= n <= 10^9",
    sampleCases: [
      {
        input: "12",
        output: "DUONG",
        explanation: "12 > 0."
      },
      {
        input: "-8",
        output: "AM",
        explanation: "-8 < 0."
      },
      {
        input: "0",
        output: "BANG 0",
        explanation: "n = 0."
      }
    ],
    starterCode: `n = int(input())

if n > 0:
    print("DUONG")
elif n < 0:
    print("AM")
else:
    print("BANG 0")
`,
    hints: [
      "Dùng if n > 0, elif n < 0, else."
    ],
    solutionExplanation: `Cấu trúc if-elif-else cơ bản chia tập số nguyên thành 3 miền.`,
    testCases: [
      { id: "cd4-b7-t1", input: "12", expectedOutput: "DUONG", isHidden: false },
      { id: "cd4-b7-t2", input: "-8", expectedOutput: "AM", isHidden: false },
      { id: "cd4-b7-t3", input: "0", expectedOutput: "BANG 0", isHidden: false }
    ]
  },
  {
    id: "cd4-bai-8",
    title: "Bài 8. Phân Loại 4 Mùa Trong Năm Theo Tháng",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 4: Câu lệnh If - Else & Rẽ nhánh",
    difficulty: "Dễ",
    tags: ["Tháng", "Mùa trong năm", "if-elif-else"],
    points: 25,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 4: If, If-Else, If-Elif-Else, Nested If",
    problemStatement: `Viết chương trình nhập vào một số nguyên ` + "`thang`" + ` (từ 1 đến 12).
In ra mùa tương ứng theo khí hậu 4 mùa:
- Tháng 1, 2, 3: In "Mua Xuan"
- Tháng 4, 5, 6: In "Mua Ha"
- Tháng 7, 8, 9: In "Mua Thu"
- Tháng 10, 11, 12: In "Mua Dong"
- Nếu nhập số ngoài phạm vi 1-12: In "KHONG HOP LE"`,
    inputFormat: "Một số nguyên thang.",
    outputFormat: "In ra tên mùa hoặc 'KHONG HOP LE'.",
    constraints: "-100 <= thang <= 100",
    sampleCases: [
      {
        input: "3",
        output: "Mua Xuan",
        explanation: "Tháng 3 là Mùa Xuân."
      },
      {
        input: "7",
        output: "Mua Thu",
        explanation: "Tháng 7 là Mùa Thu."
      },
      {
        input: "13",
        output: "KHONG HOP LE",
        explanation: "Tháng 13 không tồn tại."
      }
    ],
    starterCode: `thang = int(input())

if 1 <= thang <= 3:
    print("Mua Xuan")
elif 4 <= thang <= 6:
    print("Mua Ha")
elif 7 <= thang <= 9:
    print("Mua Thu")
elif 10 <= thang <= 12:
    print("Mua Dong")
else:
    print("KHONG HOP LE")
`,
    hints: [
      "Dùng toán tử so sánh kép: `1 <= thang <= 3` hoặc `thang in [1, 2, 3]`."
    ],
    solutionExplanation: `Phân chia 12 tháng thành 4 quý đại diện cho 4 mùa.`,
    testCases: [
      { id: "cd4-b8-t1", input: "3", expectedOutput: "Mua Xuan", isHidden: false },
      { id: "cd4-b8-t2", input: "7", expectedOutput: "Mua Thu", isHidden: false },
      { id: "cd4-b8-t3", input: "13", expectedOutput: "KHONG HOP LE", isHidden: false },
      { id: "cd4-b8-t4", input: "12", expectedOutput: "Mua Dong", isHidden: true },
      { id: "cd4-b8-t5", input: "5", expectedOutput: "Mua Ha", isHidden: true }
    ]
  },
  {
    id: "cd4-bai-9",
    title: "Bài 9. So Sánh Hai Số a và b",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 4: Câu lệnh If - Else & Rẽ nhánh",
    difficulty: "Dễ",
    tags: ["So sánh", "if-elif-else", "f-string"],
    points: 20,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 4: If, If-Else, If-Elif-Else, Nested If",
    problemStatement: `Viết chương trình nhập vào 2 số nguyên a và b (trên 2 dòng).
So sánh và in ra thông báo:
- Nếu a > b: in "<a> lon hon <b>"
- Nếu a < b: in "<a> nho hon <b>"
- Nếu a == b: in "Hai so bang nhau"`,
    inputFormat: "Gồm 2 dòng chứa 2 số nguyên a và b.",
    outputFormat: "In ra câu thông báo so sánh.",
    constraints: "-10^9 <= a, b <= 10^9",
    sampleCases: [
      {
        input: "10\n5",
        output: "10 lon hon 5",
        explanation: "10 > 5."
      },
      {
        input: "4\n9",
        output: "4 nho hon 9",
        explanation: "4 < 9."
      },
      {
        input: "7\n7",
        output: "Hai so bang nhau",
        explanation: "7 = 7."
      }
    ],
    starterCode: `a = int(input())
b = int(input())

if a > b:
    print(f"{a} lon hon {b}")
elif a < b:
    print(f"{a} nho hon {b}")
else:
    print("Hai so bang nhau")
`,
    hints: [
      "Dùng if a > b, elif a < b, else."
    ],
    solutionExplanation: `Cấu trúc rẽ nhánh so sánh 2 số nguyên.`,
    testCases: [
      { id: "cd4-b9-t1", input: "10\n5", expectedOutput: "10 lon hon 5", isHidden: false },
      { id: "cd4-b9-t2", input: "4\n9", expectedOutput: "4 nho hon 9", isHidden: false },
      { id: "cd4-b9-t3", input: "7\n7", expectedOutput: "Hai so bang nhau", isHidden: false }
    ]
  },
  {
    id: "cd4-bai-10",
    title: "Bài 10. Phân Loại Ký Tự (Chữ Cái, Chữ Số, Ký Tự Đặc Biệt)",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 4: Câu lệnh If - Else & Rẽ nhánh",
    difficulty: "Trung bình",
    tags: ["isalpha()", "isdigit()", "Phân loại ký tự"],
    points: 25,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 4: If, If-Else, If-Elif-Else, Nested If",
    problemStatement: `Viết chương trình nhập vào một ký tự ` + "`ch`" + ` từ bàn phím.
Kiểm tra và in ra:
- "CHU CAI" nếu là chữ cái (a-z, A-Z)
- "CHU SO" nếu là chữ số (0-9)
- "KY TU DAC BIET" nếu là ký tự khác (như @, #, $, ...)`,
    inputFormat: "Một ký tự duy nhất ch.",
    outputFormat: "In ra 'CHU CAI', 'CHU SO' hoặc 'KY TU DAC BIET'.",
    constraints: "Chuỗi 1 ký tự",
    sampleCases: [
      {
        input: "A",
        output: "CHU CAI",
        explanation: "'A' là chữ cái."
      },
      {
        input: "7",
        output: "CHU SO",
        explanation: "'7' là chữ số."
      },
      {
        input: "$",
        output: "KY TU DAC BIET",
        explanation: "'$' là ký tự đặc biệt."
      }
    ],
    starterCode: `ch = input().strip()

if ch.isalpha():
    print("CHU CAI")
elif ch.isdigit():
    print("CHU SO")
else:
    print("KY TU DAC BIET")
`,
    hints: [
      "Dùng phương thức `ch.isalpha()` để kiểm tra chữ cái, `ch.isdigit()` để kiểm tra chữ số."
    ],
    solutionExplanation: `Phương thức chuỗi isalpha() và isdigit() giúp phân loại nhanh ký tự.`,
    testCases: [
      { id: "cd4-b10-t1", input: "A", expectedOutput: "CHU CAI", isHidden: false },
      { id: "cd4-b10-t2", input: "7", expectedOutput: "CHU SO", isHidden: false },
      { id: "cd4-b10-t3", input: "$", expectedOutput: "KY TU DAC BIET", isHidden: false },
      { id: "cd4-b10-t4", input: "z", expectedOutput: "CHU CAI", isHidden: true }
    ]
  },
  {
    id: "cd4-bai-11",
    title: "Bài 11. Tính Tiền Điện Theo Bậc Thang",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 4: Câu lệnh If - Else & Rẽ nhánh",
    difficulty: "Trung bình",
    tags: ["Toán bậc thang", "Tiền điện", "if-elif-else"],
    points: 35,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 4: If, If-Else, If-Elif-Else, Nested If",
    problemStatement: `Viết chương trình tính tiền điện tiêu thụ theo biểu giá bậc thang:
- Bậc 1 (cho 50 kWh đầu tiên, tức <= 50): Giá 1.500 đồng/kWh.
- Bậc 2 (cho từ 51 đến 100 kWh, tức 50 kWh tiếp theo): Giá 2.000 đồng/kWh.
- Bậc 3 (cho trên 100 kWh): Giá 2.500 đồng/kWh.

Nhập vào số điện k (kWh) là số nguyên không âm. Tính và in ra tổng số tiền điện phải trả.`,
    inputFormat: "Một số nguyên không âm k (0 <= k <= 10.000).",
    outputFormat: "Một số nguyên duy nhất là tổng tiền điện (đồng).",
    constraints: "0 <= k <= 10.000",
    sampleCases: [
      {
        input: "40",
        output: "60000",
        explanation: "40 kWh thuộc bậc 1: 40 * 1500 = 60.000 đồng."
      },
      {
        input: "80",
        output: "135000",
        explanation: "50 kWh đầu giá 1500 (75.000) + 30 kWh sau giá 2000 (60.000) = 135.000 đồng."
      },
      {
        input: "120",
        output: "225000",
        explanation: "50*1500 (75.000) + 50*2000 (100.000) + 20*2500 (50.000) = 225.000 đồng."
      }
    ],
    starterCode: `k = int(input())

if k <= 50:
    tien = k * 1500
elif k <= 100:
    tien = 50 * 1500 + (k - 50) * 2000
else:
    tien = 50 * 1500 + 50 * 2000 + (k - 100) * 2500

print(tien)
`,
    hints: [
      "Chia các khoảng: k <= 50; 50 < k <= 100; và k > 100."
    ],
    solutionExplanation: `Tính tiền điện lũy tiến theo từng khoảng bậc thang tiêu thụ.`,
    testCases: [
      { id: "cd4-b11-t1", input: "40", expectedOutput: "60000", isHidden: false },
      { id: "cd4-b11-t2", input: "80", expectedOutput: "135000", isHidden: false },
      { id: "cd4-b11-t3", input: "120", expectedOutput: "225000", isHidden: false },
      { id: "cd4-b11-t4", input: "0", expectedOutput: "0", isHidden: true }
    ]
  },
  {
    id: "cd4-bai-12",
    title: "Bài 12. Xét Danh Hiệu Học Sinh Toán - Văn - Anh",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 4: Câu lệnh If - Else & Rẽ nhánh",
    difficulty: "Trung bình",
    tags: ["Nested if", "Danh hiệu", "Xét điểm"],
    points: 30,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 4: If, If-Else, If-Elif-Else, Nested If",
    problemStatement: `Viết chương trình nhập điểm 3 môn Toán, Văn, Anh (các số thực, mỗi môn trên 1 dòng).
Xét danh hiệu học sinh theo tiêu chí:
1. Đạt loại "GIOI": Nếu CẢ 3 môn đều >= 8.0 (toan >= 8 và van >= 8 và anh >= 8).
2. Nếu không đạt Giỏi, kiểm tra tiếp loại "KHA": Điểm trung bình 3 môn >= 6.5 VÀ không có môn nào dưới 5.0 (toan >= 5 và van >= 5 và anh >= 5).
3. Các trường hợp còn lại: Xếp loại "TRUNG BINH".

In ra xếp loại: "GIOI", "KHA" hoặc "TRUNG BINH".`,
    inputFormat: "Gồm 3 dòng chứa điểm 3 môn Toán, Văn, Anh.",
    outputFormat: "In ra 'GIOI', 'KHA' hoặc 'TRUNG BINH'.",
    constraints: "0.0 <= Điểm <= 10.0",
    sampleCases: [
      {
        input: "8.5\n9.0\n8.0",
        output: "GIOI",
        explanation: "Cả 3 môn đều >= 8.0 nên đạt GIOI."
      },
      {
        input: "9.0\n7.0\n6.0",
        output: "KHA",
        explanation: "ĐTB = (9+7+6)/3 = 7.33 >= 6.5 và không môn nào < 5 -> KHA."
      },
      {
        input: "10.0\n9.0\n4.5",
        output: "TRUNG BINH",
        explanation: "Có môn Anh 4.5 < 5 nên bị rớt xuống TRUNG BINH."
      }
    ],
    starterCode: `toan = float(input())
van = float(input())
anh = float(input())

dtb = (toan + van + anh) / 3

if toan >= 8.0 and van >= 8.0 and anh >= 8.0:
    print("GIOI")
elif dtb >= 6.5 and toan >= 5.0 and van >= 5.0 and anh >= 5.0:
    print("KHA")
else:
    print("TRUNG BINH")
`,
    hints: [
      "Kiểm tra điều kiện Giỏi trước: toan >= 8 and van >= 8 and anh >= 8.",
      "Tiếp theo kiểm tra Khá: dtb >= 6.5 and toan >= 5 and van >= 5 and anh >= 5.",
      "Ngược lại là Trung bình."
    ],
    solutionExplanation: `Áp dụng logic điều kiện kết hợp and giữa các môn và điểm trung bình.`,
    testCases: [
      { id: "cd4-b12-t1", input: "8.5\n9.0\n8.0", expectedOutput: "GIOI", isHidden: false },
      { id: "cd4-b12-t2", input: "9.0\n7.0\n6.0", expectedOutput: "KHA", isHidden: false },
      { id: "cd4-b12-t3", input: "10.0\n9.0\n4.5", expectedOutput: "TRUNG BINH", isHidden: false },
      { id: "cd4-b12-t4", input: "6.5\n6.5\n6.5", expectedOutput: "KHA", isHidden: true }
    ]
  }
];
