import { AlgorithmProblem } from "../../types";

export const BRANCHING_EXTRA_PROBLEMS: AlgorithmProblem[] = [
  // ==========================================
  // 1. RẼ NHÁNH IF – MỨC RẤT CƠ BẢN (CÂU 1 - 7)
  // ==========================================
  {
    id: "rn-01",
    title: "Câu 1. Kiểm Tra Số Dương",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 4: Câu lệnh If - Else & Rẽ nhánh",
    difficulty: "Dễ",
    tags: ["if cơ bản", "Số dương", "Rẽ nhánh"],
    points: 15,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "1. Rẽ nhánh if – mức rất cơ bản",
    problemStatement: `Nhập một số nguyên n từ bàn phím. Nếu số đó lớn hơn 0, hãy in ra màn hình dòng chữ "So duong". Ngược lại, nếu số không lớn hơn 0 thì không in gì cả.`,
    inputFormat: "Một số nguyên n.",
    outputFormat: "In 'So duong' nếu n > 0, ngược lại không in gì.",
    constraints: "-1000 <= n <= 1000",
    sampleCases: [
      { input: "5", output: "So duong", explanation: "5 > 0 nên in 'So duong'." },
      { input: "-3", output: "", explanation: "-3 <= 0 nên không in gì." }
    ],
    starterCode: `n = int(input())

if n > 0:
    print("So duong")
`,
    hints: ["Dùng lệnh if n > 0: print('So duong')"],
    solutionExplanation: `Sử dụng cấu trúc rẽ nhánh if đơn giản: kiểm tra n > 0 và in thông báo.`,
    testCases: [
      { id: "rn-01-t1", input: "5", expectedOutput: "So duong", isHidden: false },
      { id: "rn-01-t2", input: "-3", expectedOutput: "", isHidden: false },
      { id: "rn-01-t3", input: "0", expectedOutput: "", isHidden: true },
      { id: "rn-01-t4", input: "100", expectedOutput: "So duong", isHidden: true }
    ]
  },
  {
    id: "rn-02",
    title: "Câu 2. Kiểm Tra Tuổi Đi Học",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 4: Câu lệnh If - Else & Rẽ nhánh",
    difficulty: "Dễ",
    tags: ["if cơ bản", "So sánh", "Tuổi"],
    points: 15,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "1. Rẽ nhánh if – mức rất cơ bản",
    problemStatement: `Nhập tuổi của một bạn nhỏ (số nguyên). Nếu tuổi từ 6 trở lên, in ra "Ban da den tuoi di hoc".`,
    inputFormat: "Một số nguyên biểu thị tuổi.",
    outputFormat: "In 'Ban da den tuoi di hoc' nếu tuổi >= 6.",
    constraints: "1 <= tuoi <= 100",
    sampleCases: [
      { input: "7", output: "Ban da den tuoi di hoc", explanation: "7 >= 6 nên đủ tuổi đi học." },
      { input: "4", output: "", explanation: "4 < 6 nên không in gì." }
    ],
    starterCode: `tuoi = int(input())

if tuoi >= 6:
    print("Ban da den tuoi di hoc")
`,
    hints: ["Kiểm tra điều kiện: tuoi >= 6."],
    solutionExplanation: `Dùng if tuoi >= 6: print("Ban da den tuoi di hoc").`,
    testCases: [
      { id: "rn-02-t1", input: "7", expectedOutput: "Ban da den tuoi di hoc", isHidden: false },
      { id: "rn-02-t2", input: "4", expectedOutput: "", isHidden: false },
      { id: "rn-02-t3", input: "6", expectedOutput: "Ban da den tuoi di hoc", isHidden: true },
      { id: "rn-02-t4", input: "12", expectedOutput: "Ban da den tuoi di hoc", isHidden: true }
    ]
  },
  {
    id: "rn-03",
    title: "Câu 3. Kiểm Tra Điểm Tốt",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 4: Câu lệnh If - Else & Rẽ nhánh",
    difficulty: "Dễ",
    tags: ["if cơ bản", "So sánh bằng", "Điểm số"],
    points: 15,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "1. Rẽ nhánh if – mức rất cơ bản",
    problemStatement: `Nhập điểm kiểm tra (số nguyên từ 0 đến 10). Nếu điểm bằng 10, in ra "Diem tuyet voi!".`,
    inputFormat: "Một số nguyên biểu thị điểm số.",
    outputFormat: "In 'Diem tuyet voi!' nếu điểm bằng 10.",
    constraints: "0 <= diem <= 10",
    sampleCases: [
      { input: "10", output: "Diem tuyet voi!", explanation: "Điểm bằng 10 nên in thông báo khen ngợi." },
      { input: "8", output: "", explanation: "Điểm khác 10 nên không in gì." }
    ],
    starterCode: `diem = int(input())

if diem == 10:
    print("Diem tuyet voi!")
`,
    hints: ["Toán tử so sánh bằng trong Python là =="],
    solutionExplanation: `Kiểm tra điều kiện diem == 10.`,
    testCases: [
      { id: "rn-03-t1", input: "10", expectedOutput: "Diem tuyet voi!", isHidden: false },
      { id: "rn-03-t2", input: "8", expectedOutput: "", isHidden: false },
      { id: "rn-03-t3", input: "0", expectedOutput: "", isHidden: true }
    ]
  },
  {
    id: "rn-04",
    title: "Câu 4. Kiểm Tra Trời Mưa",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 4: Câu lệnh If - Else & Rẽ nhánh",
    difficulty: "Dễ",
    tags: ["if cơ bản", "Boolean", "Chuỗi"],
    points: 15,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "1. Rẽ nhánh if – mức rất cơ bản",
    problemStatement: `Nhập trạng thái thời tiết: "True" (trời mưa) hoặc "False" (trời không mưa). Nếu trời mưa, in ra "Nho mang ao mua".`,
    inputFormat: "Chuỗi 'True' hoặc 'False'.",
    outputFormat: "In 'Nho mang ao mua' nếu trời mưa.",
    constraints: "Chuỗi ký tự True hoặc False.",
    sampleCases: [
      { input: "True", output: "Nho mang ao mua", explanation: "Trời mưa nên nhắc mang áo mưa." },
      { input: "False", output: "", explanation: "Trời không mưa nên không cần nhắc." }
    ],
    starterCode: `mua = input().strip()

if mua == "True" or mua == "true":
    print("Nho mang ao mua")
`,
    hints: ["Kiểm tra xem biến mua có bằng 'True' hay không."],
    solutionExplanation: `Dùng if mua == "True": print("Nho mang ao mua").`,
    testCases: [
      { id: "rn-04-t1", input: "True", expectedOutput: "Nho mang ao mua", isHidden: false },
      { id: "rn-04-t2", input: "False", expectedOutput: "", isHidden: false },
      { id: "rn-04-t3", input: "true", expectedOutput: "Nho mang ao mua", isHidden: true }
    ]
  },
  {
    id: "rn-05",
    title: "Câu 5. Kiểm Tra Số Chẵn (if đơn)",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 4: Câu lệnh If - Else & Rẽ nhánh",
    difficulty: "Dễ",
    tags: ["if cơ bản", "Số chẵn", "Chia lấy dư %"],
    points: 15,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "1. Rẽ nhánh if – mức rất cơ bản",
    problemStatement: `Nhập một số nguyên n từ bàn phím. Nếu số đó chia hết cho 2, in ra "So chan".`,
    inputFormat: "Một số nguyên n.",
    outputFormat: "In 'So chan' nếu n là số chẵn.",
    constraints: "-1000 <= n <= 1000",
    sampleCases: [
      { input: "6", output: "So chan", explanation: "6 chia hết cho 2 nên in 'So chan'." },
      { input: "7", output: "", explanation: "7 là số lẻ nên không in gì." }
    ],
    starterCode: `n = int(input())

if n % 2 == 0:
    print("So chan")
`,
    hints: ["Dùng phép chia lấy dư n % 2 == 0 để kiểm tra chẵn."],
    solutionExplanation: `Điều kiện chia hết cho 2 là n % 2 == 0.`,
    testCases: [
      { id: "rn-05-t1", input: "6", expectedOutput: "So chan", isHidden: false },
      { id: "rn-05-t2", input: "7", expectedOutput: "", isHidden: false },
      { id: "rn-05-t3", input: "0", expectedOutput: "So chan", isHidden: true },
      { id: "rn-05-t4", input: "-4", expectedOutput: "So chan", isHidden: true }
    ]
  },
  {
    id: "rn-06",
    title: "Câu 6. Kiểm Tra Mật Khẩu Đơn Giản",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 4: Câu lệnh If - Else & Rẽ nhánh",
    difficulty: "Dễ",
    tags: ["if cơ bản", "Mật khẩu", "So sánh chuỗi"],
    points: 15,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "1. Rẽ nhánh if – mức rất cơ bản",
    problemStatement: `Hệ thống có mật khẩu cho trước là password = "python123". Nhập một chuỗi mật khẩu từ bàn phím. Nếu nhập đúng mật khẩu, in ra "Dang nhap thanh cong".`,
    inputFormat: "Một chuỗi mật khẩu.",
    outputFormat: "In 'Dang nhap thanh cong' nếu đúng mật khẩu.",
    constraints: "Chuỗi không quá 50 ký tự.",
    sampleCases: [
      { input: "python123", output: "Dang nhap thanh cong", explanation: "Khớp mật khẩu." },
      { input: "123456", output: "", explanation: "Sai mật khẩu." }
    ],
    starterCode: `password = "python123"
nhap = input().strip()

if nhap == password:
    print("Dang nhap thanh cong")
`,
    hints: ["So sánh chuỗi nhập vào với 'python123'."],
    solutionExplanation: `Kiểm tra nhap == "python123".`,
    testCases: [
      { id: "rn-06-t1", input: "python123", expectedOutput: "Dang nhap thanh cong", isHidden: false },
      { id: "rn-06-t2", input: "123456", expectedOutput: "", isHidden: false },
      { id: "rn-06-t3", input: "Python123", expectedOutput: "", isHidden: true }
    ]
  },
  {
    id: "rn-07",
    title: "Câu 7. Kiểm Tra Chiều Cao",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 4: Câu lệnh If - Else & Rẽ nhánh",
    difficulty: "Dễ",
    tags: ["if cơ bản", "Chiều cao", "Công viên giải trí"],
    points: 15,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "1. Rẽ nhánh if – mức rất cơ bản",
    problemStatement: `Để tham gia trò chơi đu quay, người chơi phải cao từ 120 cm trở lên. Nhập chiều cao tính bằng cm (số nguyên). Nếu cao từ 120 cm trở lên, in ra "Du chieu cao".`,
    inputFormat: "Một số nguyên biểu thị chiều cao (cm).",
    outputFormat: "In 'Du chieu cao' nếu chiều cao >= 120.",
    constraints: "50 <= h <= 250",
    sampleCases: [
      { input: "125", output: "Du chieu cao", explanation: "125 >= 120 nên đủ chiều cao." },
      { input: "115", output: "", explanation: "115 < 120 nên không đủ chiều cao." }
    ],
    starterCode: `h = int(input())

if h >= 120:
    print("Du chieu cao")
`,
    hints: ["Kiểm tra h >= 120."],
    solutionExplanation: `Dùng lệnh if h >= 120: print("Du chieu cao").`,
    testCases: [
      { id: "rn-07-t1", input: "125", expectedOutput: "Du chieu cao", isHidden: false },
      { id: "rn-07-t2", input: "115", expectedOutput: "", isHidden: false },
      { id: "rn-07-t3", input: "120", expectedOutput: "Du chieu cao", isHidden: true }
    ]
  },

  // ==========================================
  // 2. IF ... ELSE – CHỌN MỘT TRONG HAI (CÂU 8 - 15)
  // ==========================================
  {
    id: "rn-08",
    title: "Câu 8. Chẵn Hay Lẻ",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 4: Câu lệnh If - Else & Rẽ nhánh",
    difficulty: "Dễ",
    tags: ["if-else", "Chẵn lẻ", "Toán cơ bản"],
    points: 20,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "2. if ... else – chọn một trong hai",
    problemStatement: `Nhập một số nguyên n từ bàn phím. Nếu số đó là số chẵn, in ra "So chan", ngược lại in ra "So le".`,
    inputFormat: "Một số nguyên n.",
    outputFormat: "In 'So chan' hoặc 'So le'.",
    constraints: "-10^9 <= n <= 10^9",
    sampleCases: [
      { input: "8", output: "So chan", explanation: "8 là số chẵn." },
      { input: "9", output: "So le", explanation: "9 là số lẻ." }
    ],
    starterCode: `n = int(input())

if n % 2 == 0:
    print("So chan")
else:
    print("So le")
`,
    hints: ["n % 2 == 0 là số chẵn, else là số lẻ."],
    solutionExplanation: `Sử dụng cấu trúc if...else với điều kiện n % 2 == 0.`,
    testCases: [
      { id: "rn-08-t1", input: "8", expectedOutput: "So chan", isHidden: false },
      { id: "rn-08-t2", input: "9", expectedOutput: "So le", isHidden: false },
      { id: "rn-08-t3", input: "0", expectedOutput: "So chan", isHidden: true },
      { id: "rn-08-t4", input: "-7", expectedOutput: "So le", isHidden: true }
    ]
  },
  {
    id: "rn-09",
    title: "Câu 9. Đủ Tuổi Hay Chưa",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 4: Câu lệnh If - Else & Rẽ nhánh",
    difficulty: "Dễ",
    tags: ["if-else", "Tuổi", "Điều kiện"],
    points: 20,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "2. if ... else – chọn một trong hai",
    problemStatement: `Nhập số tuổi của một người (số nguyên). Nếu tuổi >= 10, in ra "Du tuoi", ngược lại in ra "Chua du tuoi".`,
    inputFormat: "Một số nguyên biểu thị tuổi.",
    outputFormat: "In 'Du tuoi' hoặc 'Chua du tuoi'.",
    constraints: "1 <= tuoi <= 120",
    sampleCases: [
      { input: "12", output: "Du tuoi", explanation: "12 >= 10." },
      { input: "8", output: "Chua du tuoi", explanation: "8 < 10." }
    ],
    starterCode: `tuoi = int(input())

if tuoi >= 10:
    print("Du tuoi")
else:
    print("Chua du tuoi")
`,
    hints: ["Dùng if tuoi >= 10: ... else: ..."],
    solutionExplanation: `Kiểm tra tuoi >= 10.`,
    testCases: [
      { id: "rn-09-t1", input: "12", expectedOutput: "Du tuoi", isHidden: false },
      { id: "rn-09-t2", input: "8", expectedOutput: "Chua du tuoi", isHidden: false },
      { id: "rn-09-t3", input: "10", expectedOutput: "Du tuoi", isHidden: true }
    ]
  },
  {
    id: "rn-10",
    title: "Câu 10. Qua Môn",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 4: Câu lệnh If - Else & Rẽ nhánh",
    difficulty: "Dễ",
    tags: ["if-else", "Điểm số", "Học tập"],
    points: 20,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "2. if ... else – chọn một trong hai",
    problemStatement: `Nhập điểm thi môn Tin học (số thực từ 0 đến 10). Nếu điểm >= 5.0, in ra "Dat", ngược lại in ra "Chua dat".`,
    inputFormat: "Một số thực hoặc nguyên biểu thị điểm số.",
    outputFormat: "In 'Dat' hoặc 'Chua dat'.",
    constraints: "0.0 <= diem <= 10.0",
    sampleCases: [
      { input: "6.5", output: "Dat", explanation: "6.5 >= 5 -> Đạt." },
      { input: "4.0", output: "Chua dat", explanation: "4.0 < 5 -> Chưa đạt." }
    ],
    starterCode: `diem = float(input())

if diem >= 5:
    print("Dat")
else:
    print("Chua dat")
`,
    hints: ["Ép kiểu sang float(input()) để đọc số thực."],
    solutionExplanation: `So sánh diem >= 5.`,
    testCases: [
      { id: "rn-10-t1", input: "6.5", expectedOutput: "Dat", isHidden: false },
      { id: "rn-10-t2", input: "4.0", expectedOutput: "Chua dat", isHidden: false },
      { id: "rn-10-t3", input: "5.0", expectedOutput: "Dat", isHidden: true }
    ]
  },
  {
    id: "rn-11",
    title: "Câu 11. Lớn Hơn 10",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 4: Câu lệnh If - Else & Rẽ nhánh",
    difficulty: "Dễ",
    tags: ["if-else", "So sánh số"],
    points: 20,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "2. if ... else – chọn một trong hai",
    problemStatement: `Nhập một số nguyên n từ bàn phím. Nếu số đó > 10, in ra "Lon hon 10", ngược lại in ra "Khong lon hon 10".`,
    inputFormat: "Một số nguyên n.",
    outputFormat: "In 'Lon hon 10' hoặc 'Khong lon hon 10'.",
    constraints: "-1000 <= n <= 1000",
    sampleCases: [
      { input: "15", output: "Lon hon 10", explanation: "15 > 10." },
      { input: "7", output: "Khong lon hon 10", explanation: "7 <= 10." }
    ],
    starterCode: `n = int(input())

if n > 10:
    print("Lon hon 10")
else:
    print("Khong lon hon 10")
`,
    hints: ["Lưu ý số 10 không lớn hơn 10 (10 > 10 là False)."],
    solutionExplanation: `Dùng điều kiện n > 10.`,
    testCases: [
      { id: "rn-11-t1", input: "15", expectedOutput: "Lon hon 10", isHidden: false },
      { id: "rn-11-t2", input: "7", expectedOutput: "Khong lon hon 10", isHidden: false },
      { id: "rn-11-t3", input: "10", expectedOutput: "Khong lon hon 10", isHidden: true }
    ]
  },
  {
    id: "rn-12",
    title: "Câu 12. Kiểm Tra Mật Khẩu (Đúng/Sai)",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 4: Câu lệnh If - Else & Rẽ nhánh",
    difficulty: "Dễ",
    tags: ["if-else", "Mật khẩu", "Chuỗi"],
    points: 20,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "2. if ... else – chọn một trong hai",
    problemStatement: `Nhập mật khẩu từ bàn phím. Nếu nhập đúng "1234", in ra "Dung", ngược lại in ra "Sai".`,
    inputFormat: "Một chuỗi ký tự mật khẩu.",
    outputFormat: "In 'Dung' hoặc 'Sai'.",
    constraints: "Chuỗi tối đa 20 ký tự.",
    sampleCases: [
      { input: "1234", output: "Dung", explanation: "Khớp mật khẩu." },
      { input: "9999", output: "Sai", explanation: "Sai mật khẩu." }
    ],
    starterCode: `pw = input().strip()

if pw == "1234":
    print("Dung")
else:
    print("Sai")
`,
    hints: ["So sánh pw == '1234'."],
    solutionExplanation: `Kiểm tra điều kiện chuỗi bằng nhau.`,
    testCases: [
      { id: "rn-12-t1", input: "1234", expectedOutput: "Dung", isHidden: false },
      { id: "rn-12-t2", input: "9999", expectedOutput: "Sai", isHidden: false },
      { id: "rn-12-t3", input: "123", expectedOutput: "Sai", isHidden: true }
    ]
  },
  {
    id: "rn-13",
    title: "Câu 13. Số Lớn Hơn Trong Hai Số",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 4: Câu lệnh If - Else & Rẽ nhánh",
    difficulty: "Dễ",
    tags: ["if-else", "Số lớn hơn", "max"],
    points: 20,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "2. if ... else – chọn một trong hai",
    problemStatement: `Nhập hai số nguyên a và b (mỗi số trên một dòng). Hãy in ra số lớn hơn. Nếu hai số bằng nhau, in ra giá trị đó.`,
    inputFormat: "Gồm 2 dòng, mỗi dòng chứa một số nguyên.",
    outputFormat: "Một số nguyên duy nhất là số lớn hơn.",
    constraints: "-10^9 <= a, b <= 10^9",
    sampleCases: [
      { input: "5\n9", output: "9", explanation: "9 lớn hơn 5." },
      { input: "15\n3", output: "15", explanation: "15 lớn hơn 3." }
    ],
    starterCode: `a = int(input())
b = int(input())

if a > b:
    print(a)
else:
    print(b)
`,
    hints: ["Nếu a > b in a, ngược lại in b."],
    solutionExplanation: `Sử dụng cấu trúc if a > b: print(a) else: print(b).`,
    testCases: [
      { id: "rn-13-t1", input: "5\n9", expectedOutput: "9", isHidden: false },
      { id: "rn-13-t2", input: "15\n3", expectedOutput: "15", isHidden: false },
      { id: "rn-13-t3", input: "7\n7", expectedOutput: "7", isHidden: true }
    ]
  },
  {
    id: "rn-14",
    title: "Câu 14. Có Được Chơi Game Không?",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 4: Câu lệnh If - Else & Rẽ nhánh",
    difficulty: "Dễ",
    tags: ["if-else", "Điều kiện", "Đời sống"],
    points: 20,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "2. if ... else – chọn một trong hai",
    problemStatement: `Bố mẹ quy định: học ít nhất 2 giờ thì mới được chơi game giải trí. Nhập số giờ đã học (số thực). Nếu học ít nhất 2 giờ, in "Duoc choi", ngược lại in "Hay hoc them".`,
    inputFormat: "Một số thực biểu thị số giờ học.",
    outputFormat: "In 'Duoc choi' hoặc 'Hay hoc them'.",
    constraints: "0.0 <= gio <= 24.0",
    sampleCases: [
      { input: "3", output: "Duoc choi", explanation: "3 >= 2 giờ." },
      { input: "1.5", output: "Hay hoc them", explanation: "1.5 < 2 giờ." }
    ],
    starterCode: `gio = float(input())

if gio >= 2:
    print("Duoc choi")
else:
    print("Hay hoc them")
`,
    hints: ["Ít nhất 2 giờ tức là gio >= 2."],
    solutionExplanation: `Kiểm tra gio >= 2.`,
    testCases: [
      { id: "rn-14-t1", input: "3", expectedOutput: "Duoc choi", isHidden: false },
      { id: "rn-14-t2", input: "1.5", expectedOutput: "Hay hoc them", isHidden: false },
      { id: "rn-14-t3", input: "2.0", expectedOutput: "Duoc choi", isHidden: true }
    ]
  },
  {
    id: "rn-15",
    title: "Câu 15. Đi Mua Đồ",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 4: Câu lệnh If - Else & Rẽ nhánh",
    difficulty: "Dễ",
    tags: ["if-else", "Tiền tệ", "Mua sắm"],
    points: 20,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "2. if ... else – chọn một trong hai",
    problemStatement: `Bạn có 50.000 đồng trong ví. Bạn muốn mua một món đồ có giá là price (đồng). Nhập giá price từ bàn phím. Nếu có đủ tiền (price <= 50000), in "Mua duoc", nếu không in "Khong du tien".`,
    inputFormat: "Một số nguyên price (giá món đồ).",
    outputFormat: "In 'Mua duoc' hoặc 'Khong du tien'.",
    constraints: "1000 <= price <= 500000",
    sampleCases: [
      { input: "45000", output: "Mua duoc", explanation: "45000 <= 50000 nên đủ tiền." },
      { input: "60000", output: "Khong du tien", explanation: "60000 > 50000 nên không đủ tiền." }
    ],
    starterCode: `price = int(input())

if price <= 50000:
    print("Mua duoc")
else:
    print("Khong du tien")
`,
    hints: ["Kiểm tra price <= 50000."],
    solutionExplanation: `So sánh giá tiền với số tiền có sẵn 50000.`,
    testCases: [
      { id: "rn-15-t1", input: "45000", expectedOutput: "Mua duoc", isHidden: false },
      { id: "rn-15-t2", input: "60000", expectedOutput: "Khong du tien", isHidden: false },
      { id: "rn-15-t3", input: "50000", expectedOutput: "Mua duoc", isHidden: true }
    ]
  },

  // ==========================================
  // 3. IF ... ELIF ... ELSE – NHIỀU TRƯỜNG HỢP (CÂU 16 - 24)
  // ==========================================
  {
    id: "rn-16",
    title: "Câu 16. Xếp Loại Điểm Thi",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 4: Câu lệnh If - Else & Rẽ nhánh",
    difficulty: "Dễ",
    tags: ["if-elif-else", "Xếp loại", "Điểm số"],
    points: 25,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "3. if ... elif ... else – nhiều trường hợp",
    problemStatement: `Nhập điểm thi (số thực từ 0 đến 10). Xếp loại học lực theo thang điểm sau:
- Điểm >= 9: in "Xuat sac"
- Điểm >= 7 (và < 9): in "Tot"
- Điểm >= 5 (và < 7): in "Dat"
- Điểm < 5: in "Chua dat"`,
    inputFormat: "Một số thực điểm thi.",
    outputFormat: "In 'Xuat sac', 'Tot', 'Dat', hoặc 'Chua dat'.",
    constraints: "0.0 <= diem <= 10.0",
    sampleCases: [
      { input: "9.5", output: "Xuat sac", explanation: "9.5 >= 9." },
      { input: "8.0", output: "Tot", explanation: "7 <= 8.0 < 9." }
    ],
    starterCode: `diem = float(input())

if diem >= 9:
    print("Xuat sac")
elif diem >= 7:
    print("Tot")
elif diem >= 5:
    print("Dat")
else:
    print("Chua dat")
`,
    hints: ["Xếp các điều kiện giảm dần từ lớn nhất đến nhỏ nhất."],
    solutionExplanation: `Sử dụng cấu trúc chuỗi if-elif-else từ 9 xuống 5.`,
    testCases: [
      { id: "rn-16-t1", input: "9.5", expectedOutput: "Xuat sac", isHidden: false },
      { id: "rn-16-t2", input: "8.0", expectedOutput: "Tot", isHidden: false },
      { id: "rn-16-t3", input: "5.5", expectedOutput: "Dat", isHidden: true },
      { id: "rn-16-t4", input: "3.5", expectedOutput: "Chua dat", isHidden: true }
    ]
  },
  {
    id: "rn-17",
    title: "Câu 17. Đánh Giá Nhiệt Độ Thời Tiết",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 4: Câu lệnh If - Else & Rẽ nhánh",
    difficulty: "Dễ",
    tags: ["if-elif-else", "Nhiệt độ", "Thời tiết"],
    points: 25,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "3. if ... elif ... else – nhiều trường hợp",
    problemStatement: `Nhập nhiệt độ môi trường tính bằng độ C (số nguyên). Đánh giá cảm giác thời tiết:
- Nhiệt độ >= 35: in "Rat nong"
- Nhiệt độ >= 25 (và < 35): in "Am"
- Nhiệt độ >= 15 (và < 25): in "Mat"
- Nhiệt độ < 15: in "Lanh"`,
    inputFormat: "Một số nguyên nhiệt độ.",
    outputFormat: "In 'Rat nong', 'Am', 'Mat', hoặc 'Lanh'.",
    constraints: "-20 <= t <= 50",
    sampleCases: [
      { input: "38", output: "Rat nong", explanation: "38 >= 35." },
      { input: "20", output: "Mat", explanation: "15 <= 20 < 25." }
    ],
    starterCode: `t = int(input())

if t >= 35:
    print("Rat nong")
elif t >= 25:
    print("Am")
elif t >= 15:
    print("Mat")
else:
    print("Lanh")
`,
    hints: ["Dùng chuỗi if-elif-else kiểm tra các mốc 35, 25, 15."],
    solutionExplanation: `Phân loại nhiệt độ theo ngưỡng.`,
    testCases: [
      { id: "rn-17-t1", input: "38", expectedOutput: "Rat nong", isHidden: false },
      { id: "rn-17-t2", input: "20", expectedOutput: "Mat", isHidden: false },
      { id: "rn-17-t3", input: "28", expectedOutput: "Am", isHidden: true },
      { id: "rn-17-t4", input: "10", expectedOutput: "Lanh", isHidden: true }
    ]
  },
  {
    id: "rn-18",
    title: "Câu 18. Số Dương, Âm Hay Bằng 0",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 4: Câu lệnh If - Else & Rẽ nhánh",
    difficulty: "Dễ",
    tags: ["if-elif-else", "Dương âm không"],
    points: 25,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "3. if ... elif ... else – nhiều trường hợp",
    problemStatement: `Nhập một số nguyên n từ bàn phím. Kiểm tra và in ra:
- "So duong" nếu n > 0
- "So am" nếu n < 0
- "Bang 0" nếu n == 0`,
    inputFormat: "Một số nguyên n.",
    outputFormat: "In 'So duong', 'So am', hoặc 'Bang 0'.",
    constraints: "-10^9 <= n <= 10^9",
    sampleCases: [
      { input: "5", output: "So duong", explanation: "5 > 0." },
      { input: "-8", output: "So am", explanation: "-8 < 0." }
    ],
    starterCode: `n = int(input())

if n > 0:
    print("So duong")
elif n < 0:
    print("So am")
else:
    print("Bang 0")
`,
    hints: ["Dùng if n > 0 ... elif n < 0 ... else ..."],
    solutionExplanation: `Phân loại 3 nhánh: lớn hơn 0, nhỏ hơn 0, và bằng 0.`,
    testCases: [
      { id: "rn-18-t1", input: "5", expectedOutput: "So duong", isHidden: false },
      { id: "rn-18-t2", input: "-8", expectedOutput: "So am", isHidden: false },
      { id: "rn-18-t3", input: "0", expectedOutput: "Bang 0", isHidden: true }
    ]
  },
  {
    id: "rn-19",
    title: "Câu 19. Xếp Loại Chiều Cao",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 4: Câu lệnh If - Else & Rẽ nhánh",
    difficulty: "Dễ",
    tags: ["if-elif-else", "Chiều cao", "Phân loại"],
    points: 25,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "3. if ... elif ... else – nhiều trường hợp",
    problemStatement: `Nhập chiều cao tính bằng cm (số nguyên). Phân loại chiều cao:
- Chiều cao >= 150: in "Cao"
- Chiều cao >= 130: in "Trung binh"
- Chiều cao < 130: in "Thap"`,
    inputFormat: "Một số nguyên chiều cao (cm).",
    outputFormat: "In 'Cao', 'Trung binh', hoặc 'Thap'.",
    constraints: "50 <= h <= 250",
    sampleCases: [
      { input: "155", output: "Cao", explanation: "155 >= 150." },
      { input: "140", output: "Trung binh", explanation: "130 <= 140 < 150." }
    ],
    starterCode: `h = int(input())

if h >= 150:
    print("Cao")
elif h >= 130:
    print("Trung binh")
else:
    print("Thap")
`,
    hints: ["Kiểm tra h >= 150 trước, sau đó elif h >= 130."],
    solutionExplanation: `Xếp loại theo ngưỡng chiều cao.`,
    testCases: [
      { id: "rn-19-t1", input: "155", expectedOutput: "Cao", isHidden: false },
      { id: "rn-19-t2", input: "140", expectedOutput: "Trung binh", isHidden: false },
      { id: "rn-19-t3", input: "125", expectedOutput: "Thap", isHidden: true }
    ]
  },
  {
    id: "rn-20",
    title: "Câu 20. Đèn Giao Thông",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 4: Câu lệnh If - Else & Rẽ nhánh",
    difficulty: "Dễ",
    tags: ["if-elif-else", "Giao thông", "Chuỗi"],
    points: 25,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "3. if ... elif ... else – nhiều trường hợp",
    problemStatement: `Nhập màu đèn giao thông (chuỗi "do", "vang" hoặc "xanh"). Chỉ dẫn tương ứng:
- "do": in "Dung lai"
- "vang": in "Di cham"
- "xanh": in "Duoc di"`,
    inputFormat: "Chuỗi ký tự 'do', 'vang' hoặc 'xanh'.",
    outputFormat: "In 'Dung lai', 'Di cham', hoặc 'Duoc di'.",
    constraints: "Màu đèn hợp lệ.",
    sampleCases: [
      { input: "do", output: "Dung lai", explanation: "Đèn đỏ phải dừng lại." },
      { input: "xanh", output: "Duoc di", explanation: "Đèn xanh được phép đi." }
    ],
    starterCode: `mau = input().strip()

if mau == "do":
    print("Dung lai")
elif mau == "vang":
    print("Di cham")
elif mau == "xanh":
    print("Duoc di")
`,
    hints: ["Dùng if-elif so sánh chuỗi màu đèn."],
    solutionExplanation: `So sánh chuỗi màu đèn giao thông.`,
    testCases: [
      { id: "rn-20-t1", input: "do", expectedOutput: "Dung lai", isHidden: false },
      { id: "rn-20-t2", input: "vang", expectedOutput: "Di cham", isHidden: false },
      { id: "rn-20-t3", input: "xanh", expectedOutput: "Duoc di", isHidden: true }
    ]
  },
  {
    id: "rn-21",
    title: "Câu 21. Ngày Trong Tuần",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 4: Câu lệnh If - Else & Rẽ nhánh",
    difficulty: "Dễ",
    tags: ["if-elif-else", "Ngày tuần", "Ánh xạ"],
    points: 25,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "3. if ... elif ... else – nhiều trường hợp",
    problemStatement: `Nhập một số nguyên từ 1 đến 7 và in ra tên ngày trong tuần tương ứng:
- 1: "Thu Hai"
- 2: "Thu Ba"
- 3: "Thu Tu"
- 4: "Thu Nam"
- 5: "Thu Sau"
- 6: "Thu Bay"
- 7: "Chu Nhat"`,
    inputFormat: "Một số nguyên từ 1 đến 7.",
    outputFormat: "Tên ngày tương ứng.",
    constraints: "1 <= n <= 7",
    sampleCases: [
      { input: "1", output: "Thu Hai", explanation: "Ngày số 1 là Thứ Hai." },
      { input: "7", output: "Chu Nhat", explanation: "Ngày số 7 là Chủ Nhật." }
    ],
    starterCode: `n = int(input())

days = ["Thu Hai", "Thu Ba", "Thu Tu", "Thu Nam", "Thu Sau", "Thu Bay", "Chu Nhat"]
if 1 <= n <= 7:
    print(days[n - 1])
`,
    hints: ["Có thể dùng if/elif hoặc danh sách ngày."],
    solutionExplanation: `Ánh xạ số 1-7 sang tên ngày trong tuần.`,
    testCases: [
      { id: "rn-21-t1", input: "1", expectedOutput: "Thu Hai", isHidden: false },
      { id: "rn-21-t2", input: "7", expectedOutput: "Chu Nhat", isHidden: false },
      { id: "rn-21-t3", input: "4", expectedOutput: "Thu Nam", isHidden: true }
    ]
  },
  {
    id: "rn-22",
    title: "Câu 22. Menu Món Ăn",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 4: Câu lệnh If - Else & Rẽ nhánh",
    difficulty: "Dễ",
    tags: ["if-elif-else", "Menu", "Lựa chọn"],
    points: 25,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "3. if ... elif ... else – nhiều trường hợp",
    problemStatement: `Nhà hàng có menu gồm:
1: "Com"
2: "Pho"
3: "Bun"
4: "Banh mi"
Nhập số nguyên là lựa chọn món ăn và in ra tên món tương ứng.`,
    inputFormat: "Một số nguyên từ 1 đến 4.",
    outputFormat: "Tên món ăn đã chọn.",
    constraints: "1 <= n <= 4",
    sampleCases: [
      { input: "1", output: "Com", explanation: "Lựa chọn 1 là Cơm." },
      { input: "2", output: "Pho", explanation: "Lựa chọn 2 là Phở." }
    ],
    starterCode: `chon = int(input())

if chon == 1:
    print("Com")
elif chon == 2:
    print("Pho")
elif chon == 3:
    print("Bun")
elif chon == 4:
    print("Banh mi")
`,
    hints: ["Kiểm tra chon bằng 1, 2, 3 hay 4."],
    solutionExplanation: `Dùng chuỗi if-elif để in tên món ăn theo mã số.`,
    testCases: [
      { id: "rn-22-t1", input: "1", expectedOutput: "Com", isHidden: false },
      { id: "rn-22-t2", input: "2", expectedOutput: "Pho", isHidden: false },
      { id: "rn-22-t3", input: "4", expectedOutput: "Banh mi", isHidden: true }
    ]
  },
  {
    id: "rn-23",
    title: "Câu 23. Máy Tính Mini",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 4: Câu lệnh If - Else & Rẽ nhánh",
    difficulty: "Trung bình",
    tags: ["if-elif-else", "Máy tính", "Toán tử"],
    points: 30,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "3. if ... elif ... else – nhiều trường hợp",
    problemStatement: `Viết chương trình mô phỏng máy tính cầm tay mini. Nhập vào:
- Dòng 1: Số a
- Dòng 2: Phép tính (+, -, *, /)
- Dòng 3: Số b
Dùng if/elif để thực hiện phép tính và in ra kết quả. Nếu kết quả là số nguyên thì in dạng số nguyên.`,
    inputFormat: "Gồm 3 dòng: số a, phép toán op, số b.",
    outputFormat: "Một số duy nhất là kết quả phép tính.",
    constraints: "-1000 <= a, b <= 1000, b != 0 khi chia",
    sampleCases: [
      { input: "10\n+\n5", output: "15", explanation: "10 + 5 = 15." },
      { input: "12\n*\n3", output: "36", explanation: "12 * 3 = 36." },
      { input: "20\n/\n4", output: "5", explanation: "20 / 4 = 5." }
    ],
    starterCode: `a = float(input())
op = input().strip()
b = float(input())

if op == "+":
    res = a + b
elif op == "-":
    res = a - b
elif op == "*":
    res = a * b
elif op == "/":
    res = a / b

if res == int(res):
    print(int(res))
else:
    print(res)
`,
    hints: ["Kiểm tra ký tự phép toán bằng if op == '+': ..."],
    solutionExplanation: `Thực hiện phép tính theo toán tử tương ứng.`,
    testCases: [
      { id: "rn-23-t1", input: "10\n+\n5", expectedOutput: "15", isHidden: false },
      { id: "rn-23-t2", input: "12\n*\n3", expectedOutput: "36", isHidden: false },
      { id: "rn-23-t3", input: "20\n/\n4", expectedOutput: "5", isHidden: true },
      { id: "rn-23-t4", input: "10\n-\n7", expectedOutput: "3", isHidden: true }
    ]
  },
  {
    id: "rn-24",
    title: "Câu 24. Xếp Hạng Cuộc Thi",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 4: Câu lệnh If - Else & Rẽ nhánh",
    difficulty: "Dễ",
    tags: ["if-elif-else", "Huy chương", "Giải thưởng"],
    points: 25,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "3. if ... elif ... else – nhiều trường hợp",
    problemStatement: `Nhập điểm thi chung kết Tin học trẻ (số nguyên từ 0 đến 100). Xếp giải như sau:
- Điểm 100: in "Huy chuong vang"
- Điểm 90 đến 99: in "Huy chuong bac"
- Điểm 70 đến 89: in "Huy chuong dong"
- Dưới 70: in "Co gang lan sau"`,
    inputFormat: "Một số nguyên điểm từ 0 đến 100.",
    outputFormat: "Tên giải thưởng tương ứng.",
    constraints: "0 <= score <= 100",
    sampleCases: [
      { input: "100", output: "Huy chuong vang", explanation: "Điểm tuyệt đối nhận Huy chương vàng." },
      { input: "95", output: "Huy chuong bac", explanation: "Điểm từ 90 đến 99 nhận Huy chương bạc." }
    ],
    starterCode: `score = int(input())

if score == 100:
    print("Huy chuong vang")
elif score >= 90:
    print("Huy chuong bac")
elif score >= 70:
    print("Huy chuong dong")
else:
    print("Co gang lan sau")
`,
    hints: ["Dùng if score == 100 ... elif score >= 90 ... elif score >= 70 ... else ..."],
    solutionExplanation: `Xếp hạng giải thưởng theo thang điểm cuộc thi.`,
    testCases: [
      { id: "rn-24-t1", input: "100", expectedOutput: "Huy chuong vang", isHidden: false },
      { id: "rn-24-t2", input: "95", expectedOutput: "Huy chuong bac", isHidden: false },
      { id: "rn-24-t3", input: "80", expectedOutput: "Huy chuong dong", isHidden: true },
      { id: "rn-24-t4", input: "65", expectedOutput: "Co gang lan sau", isHidden: true }
    ]
  }
];
