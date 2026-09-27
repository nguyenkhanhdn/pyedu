import { AlgorithmProblem } from "../../types";

export const LOOPS_EXTRA_PROBLEMS: AlgorithmProblem[] = [
  // ==========================================
  // 4. VÒNG LẶP FOR (CÂU 25 - 38)
  // ==========================================
  {
    id: "vl-25",
    title: "Câu 25. In Số Từ 1 Đến 10",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 5: Vòng lặp For, While, Break & Continue",
    difficulty: "Dễ",
    tags: ["for", "range()", "Cơ bản"],
    points: 15,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "4. Vòng lặp for",
    problemStatement: `Sử dụng vòng lặp for và hàm range() để in các số nguyên từ 1 đến 10 trên cùng một dòng, cách nhau bởi một dấu cách.`,
    inputFormat: "Không có dữ liệu đầu vào.",
    outputFormat: "Các số từ 1 đến 10 cách nhau bởi dấu cách: 1 2 3 4 5 6 7 8 9 10.",
    constraints: "Không có",
    sampleCases: [
      { input: "", output: "1 2 3 4 5 6 7 8 9 10", explanation: "In các số từ 1 đến 10." }
    ],
    starterCode: `for i in range(1, 11):
    print(i, end=" " if i < 10 else "\n")
`,
    hints: ["Dùng range(1, 11) để lặp từ 1 đến 10."],
    solutionExplanation: `range(1, 11) sinh các số từ 1 đến 10.`,
    testCases: [
      { id: "vl-25-t1", input: "", expectedOutput: "1 2 3 4 5 6 7 8 9 10", isHidden: false }
    ]
  },
  {
    id: "vl-26",
    title: "Câu 26. In Số Từ 1 Đến 100",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 5: Vòng lặp For, While, Break & Continue",
    difficulty: "Dễ",
    tags: ["for", "range()", "Dãy số"],
    points: 15,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "4. Vòng lặp for",
    problemStatement: `Dùng vòng lặp for để in các số nguyên từ 1 đến 100 trên cùng một dòng, cách nhau bởi một dấu cách.`,
    inputFormat: "Không có dữ liệu đầu vào.",
    outputFormat: "Các số từ 1 đến 100 cách nhau bởi dấu cách: 1 2 3 ... 100.",
    constraints: "Không có",
    sampleCases: [
      { input: "", output: Array.from({ length: 100 }, (_, i) => i + 1).join(" "), explanation: "Các số từ 1 đến 100." }
    ],
    starterCode: `print(*range(1, 101))
`,
    hints: ["Dùng range(1, 101) để sinh dãy số từ 1 đến 100."],
    solutionExplanation: `Sử dụng range(1, 101) trong vòng for hoặc print(*range(1, 101)).`,
    testCases: [
      { id: "vl-26-t1", input: "", expectedOutput: Array.from({ length: 100 }, (_, i) => i + 1).join(" "), isHidden: false }
    ]
  },
  {
    id: "vl-27",
    title: "Câu 27. In Các Số Chẵn Từ 1 Đến 20",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 5: Vòng lặp For, While, Break & Continue",
    difficulty: "Dễ",
    tags: ["for", "range() step", "Số chẵn"],
    points: 15,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "4. Vòng lặp for",
    problemStatement: `Dùng vòng lặp for để in các số chẵn trong phạm vi từ 1 đến 20 trên cùng một dòng, cách nhau bởi dấu cách.`,
    inputFormat: "Không có dữ liệu đầu vào.",
    outputFormat: "2 4 6 8 10 12 14 16 18 20",
    constraints: "Không có",
    sampleCases: [
      { input: "", output: "2 4 6 8 10 12 14 16 18 20", explanation: "Các số chẵn từ 1 đến 20." }
    ],
    starterCode: `for i in range(2, 21, 2):
    print(i, end=" " if i < 20 else "\n")
`,
    hints: ["Dùng range(2, 21, 2) với bước nhảy bằng 2."],
    solutionExplanation: `range(2, 21, 2) sinh các số chẵn: 2, 4, 6, ..., 20.`,
    testCases: [
      { id: "vl-27-t1", input: "", expectedOutput: "2 4 6 8 10 12 14 16 18 20", isHidden: false }
    ]
  },
  {
    id: "vl-28",
    title: "Câu 28. In Các Số Lẻ Từ 1 Đến 20",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 5: Vòng lặp For, While, Break & Continue",
    difficulty: "Dễ",
    tags: ["for", "range() step", "Số lẻ"],
    points: 15,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "4. Vòng lặp for",
    problemStatement: `Dùng vòng lặp for để in các số lẻ trong phạm vi từ 1 đến 20 trên cùng một dòng, cách nhau bởi dấu cách.`,
    inputFormat: "Không có dữ liệu đầu vào.",
    outputFormat: "1 3 5 7 9 11 13 15 17 19",
    constraints: "Không có",
    sampleCases: [
      { input: "", output: "1 3 5 7 9 11 13 15 17 19", explanation: "Các số lẻ từ 1 đến 20." }
    ],
    starterCode: `for i in range(1, 21, 2):
    print(i, end=" " if i < 19 else "\n")
`,
    hints: ["Dùng range(1, 21, 2) bắt đầu từ 1 và bước nhảy 2."],
    solutionExplanation: `range(1, 21, 2) sinh các số lẻ: 1, 3, 5, ..., 19.`,
    testCases: [
      { id: "vl-28-t1", input: "", expectedOutput: "1 3 5 7 9 11 13 15 17 19", isHidden: false }
    ]
  },
  {
    id: "vl-29",
    title: "Câu 29. In Bảng Cửu Chương 5",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 5: Vòng lặp For, While, Break & Continue",
    difficulty: "Dễ",
    tags: ["for", "Bảng cửu chương", "Toán nhân"],
    points: 20,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "4. Vòng lặp for",
    problemStatement: `Dùng vòng lặp for để in bảng cửu chương 5 từ 5 x 1 = 5 đến 5 x 10 = 50. Mỗi phép tính trên một dòng theo đúng định dạng.`,
    inputFormat: "Không có dữ liệu đầu vào.",
    outputFormat: "Gồm 10 dòng:\n5 x 1 = 5\n5 x 2 = 10\n...\n5 x 10 = 50",
    constraints: "Không có",
    sampleCases: [
      {
        input: "",
        output: "5 x 1 = 5\n5 x 2 = 10\n5 x 3 = 15\n5 x 4 = 20\n5 x 5 = 25\n5 x 6 = 30\n5 x 7 = 35\n5 x 8 = 40\n5 x 9 = 45\n5 x 10 = 50",
        explanation: "Bảng cửu chương 5."
      }
    ],
    starterCode: `for i in range(1, 11):
    print(f"5 x {i} = {5 * i}")
`,
    hints: ["Dùng f-string f'5 x {i} = {5 * i}' với i chạy từ 1 đến 10."],
    solutionExplanation: `Vòng lặp i từ 1 đến 10 in ra tích 5 * i.`,
    testCases: [
      {
        id: "vl-29-t1",
        input: "",
        expectedOutput: "5 x 1 = 5\n5 x 2 = 10\n5 x 3 = 15\n5 x 4 = 20\n5 x 5 = 25\n5 x 6 = 30\n5 x 7 = 35\n5 x 8 = 40\n5 x 9 = 45\n5 x 10 = 50",
        isHidden: false
      }
    ]
  },
  {
    id: "vl-30",
    title: "Câu 30. Tính Tổng Từ 1 Đến 10",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 5: Vòng lặp For, While, Break & Continue",
    difficulty: "Dễ",
    tags: ["for", "Tổng cộng dồn"],
    points: 15,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "4. Vòng lặp for",
    problemStatement: `Sử dụng vòng lặp for và biến tích lũy để tính tổng các số nguyên từ 1 đến 10 (1 + 2 + ... + 10). In kết quả ra màn hình.`,
    inputFormat: "Không có dữ liệu đầu vào.",
    outputFormat: "Số 55.",
    constraints: "Không có",
    sampleCases: [
      { input: "", output: "55", explanation: "1+2+3+4+5+6+7+8+9+10 = 55." }
    ],
    starterCode: `tong = 0
for i in range(1, 11):
    tong += i

print(tong)
`,
    hints: ["Khởi tạo tong = 0, mỗi lần lặp cộng thêm i."],
    solutionExplanation: `Duyệt i từ 1 đến 10 và cộng dồn vào biến tong.`,
    testCases: [
      { id: "vl-30-t1", input: "", expectedOutput: "55", isHidden: false }
    ]
  },
  {
    id: "vl-31",
    title: "Câu 31. Tính Tổng Từ 1 Đến 100",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 5: Vòng lặp For, While, Break & Continue",
    difficulty: "Dễ",
    tags: ["for", "Tổng dãy số"],
    points: 15,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "4. Vòng lặp for",
    problemStatement: `Dùng vòng lặp for để tính tổng tất cả các số nguyên từ 1 đến 100 (1 + 2 + ... + 100). In kết quả ra màn hình.`,
    inputFormat: "Không có dữ liệu đầu vào.",
    outputFormat: "Số 5050.",
    constraints: "Không có",
    sampleCases: [
      { input: "", output: "5050", explanation: "Tổng từ 1 đến 100 bằng 5050." }
    ],
    starterCode: `tong = 0
for i in range(1, 101):
    tong += i

print(tong)
`,
    hints: ["Dùng range(1, 101) để cộng dồn."],
    solutionExplanation: `Tính tổng từ 1 đến 100 bằng vòng for.`,
    testCases: [
      { id: "vl-31-t1", input: "", expectedOutput: "5050", isHidden: false }
    ]
  },
  {
    id: "vl-32",
    title: "Câu 32. Tính Tổng Các Số Chẵn Từ 1 Đến 100",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 5: Vòng lặp For, While, Break & Continue",
    difficulty: "Dễ",
    tags: ["for", "Số chẵn", "Tổng"],
    points: 20,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "4. Vòng lặp for",
    problemStatement: `Dùng vòng lặp for để tính tổng các số chẵn trong khoảng từ 1 đến 100 (2 + 4 + 6 + ... + 100). In kết quả ra màn hình.`,
    inputFormat: "Không có dữ liệu đầu vào.",
    outputFormat: "Số 2550.",
    constraints: "Không có",
    sampleCases: [
      { input: "", output: "2550", explanation: "2 + 4 + ... + 100 = 2550." }
    ],
    starterCode: `tong = 0
for i in range(2, 101, 2):
    tong += i

print(tong)
`,
    hints: ["Dùng range(2, 101, 2) để duyệt qua các số chẵn."],
    solutionExplanation: `Cộng dồn các số chẵn từ 2 đến 100.`,
    testCases: [
      { id: "vl-32-t1", input: "", expectedOutput: "2550", isHidden: false }
    ]
  },
  {
    id: "vl-33",
    title: "Câu 33. Đếm Số Chia Hết Cho 3 Từ 1 Đến 100",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 5: Vòng lặp For, While, Break & Continue",
    difficulty: "Dễ",
    tags: ["for", "Đếm", "Chia hết cho 3"],
    points: 20,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "4. Vòng lặp for",
    problemStatement: `Trong các số nguyên từ 1 đến 100, có bao nhiêu số chia hết cho 3? Dùng vòng lặp for để đếm và in kết quả.`,
    inputFormat: "Không có dữ liệu đầu vào.",
    outputFormat: "Số 33.",
    constraints: "Không có",
    sampleCases: [
      { input: "", output: "33", explanation: "Có 33 số chia hết cho 3 trong khoảng 1 đến 100." }
    ],
    starterCode: `dem = 0
for i in range(1, 101):
    if i % 3 == 0:
        dem += 1

print(dem)
`,
    hints: ["Kiểm tra if i % 3 == 0: dem += 1."],
    solutionExplanation: `Duyệt từ 1 đến 100, nếu chia hết cho 3 thì tăng biến đếm lên 1.`,
    testCases: [
      { id: "vl-33-t1", input: "", expectedOutput: "33", isHidden: false }
    ]
  },
  {
    id: "vl-34",
    title: "Câu 34. In Hình Ngôi Sao",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 5: Vòng lặp For, While, Break & Continue",
    difficulty: "Dễ",
    tags: ["for", "Vẽ hình", "Tam giác sao"],
    points: 20,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "4. Vòng lặp for",
    problemStatement: `Nhập số nguyên dương n từ bàn phím. Hãy in n dòng ngôi sao, trong đó dòng thứ i có đúng i dấu sao (*).`,
    inputFormat: "Một số nguyên n (1 <= n <= 30).",
    outputFormat: "n dòng, dòng thứ i chứa i ký tự *.",
    constraints: "1 <= n <= 30",
    sampleCases: [
      { input: "4", output: "*\n**\n***\n****", explanation: "Tam giác sao 4 dòng." }
    ],
    starterCode: `n = int(input())

for i in range(1, n + 1):
    print("*" * i)
`,
    hints: ["Trong Python, '*' * i sẽ tạo ra chuỗi gồm i dấu sao."],
    solutionExplanation: `Duyệt i từ 1 đến n và in '*' * i.`,
    testCases: [
      { id: "vl-34-t1", input: "4", expectedOutput: "*\n**\n***\n****", isHidden: false },
      { id: "vl-34-t2", input: "1", expectedOutput: "*", isHidden: false },
      { id: "vl-34-t3", input: "5", expectedOutput: "*\n**\n***\n****\n*****", isHidden: true }
    ]
  },
  {
    id: "vl-35",
    title: "Câu 35. In Hình Vuông",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 5: Vòng lặp For, While, Break & Continue",
    difficulty: "Dễ",
    tags: ["for", "Hình vuông sao"],
    points: 20,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "4. Vòng lặp for",
    problemStatement: `Nhập một số nguyên n (mặc định n = 5 nếu thử nghiệm). Hãy in ra một hình vuông gồm n dòng, mỗi dòng có n dấu sao (*).`,
    inputFormat: "Một số nguyên n.",
    outputFormat: "n dòng, mỗi dòng gồm n dấu *.",
    constraints: "1 <= n <= 20",
    sampleCases: [
      { input: "5", output: "*****\n*****\n*****\n*****\n*****", explanation: "Hình vuông 5x5." },
      { input: "3", output: "***\n***\n***", explanation: "Hình vuông 3x3." }
    ],
    starterCode: `n = int(input())

for _ in range(n):
    print("*" * n)
`,
    hints: ["Lặp n lần, mỗi lần in '*' * n."],
    solutionExplanation: `Dùng vòng for lặp n lần in dòng n ký tự *.`,
    testCases: [
      { id: "vl-35-t1", input: "5", expectedOutput: "*****\n*****\n*****\n*****\n*****", isHidden: false },
      { id: "vl-35-t2", input: "3", expectedOutput: "***\n***\n***", isHidden: false },
      { id: "vl-35-t3", input: "2", expectedOutput: "**\n**", isHidden: true }
    ]
  },
  {
    id: "vl-36",
    title: "Câu 36. Duyệt Từng Chữ Cái Bằng For",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 5: Vòng lặp For, While, Break & Continue",
    difficulty: "Dễ",
    tags: ["for", "Chuỗi", "Ký tự"],
    points: 20,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "4. Vòng lặp for",
    problemStatement: `Nhập một từ hoặc chuỗi ký tự từ bàn phím (ví dụ: word = "python"). Dùng vòng lặp for để in từng chữ cái trên một dòng riêng biệt.`,
    inputFormat: "Một chuỗi ký tự không có dấu cách.",
    outputFormat: "Mỗi ký tự in trên một dòng.",
    constraints: "Độ dài chuỗi từ 1 đến 50.",
    sampleCases: [
      { input: "python", output: "p\ny\nt\nh\no\nn", explanation: "In 6 chữ cái của từ python." }
    ],
    starterCode: `word = input().strip()

for char in word:
    print(char)
`,
    hints: ["Vòng for ch in s sẽ duyệt qua từng ký tự của chuỗi s."],
    solutionExplanation: `Duyệt trực tiếp for char in word: print(char).`,
    testCases: [
      { id: "vl-36-t1", input: "python", expectedOutput: "p\ny\nt\nh\no\nn", isHidden: false },
      { id: "vl-36-t2", input: "cod", expectedOutput: "c\no\nd", isHidden: false },
      { id: "vl-36-t3", input: "A", expectedOutput: "A", isHidden: true }
    ]
  },
  {
    id: "vl-37",
    title: "Câu 37. Đếm Chữ 'a' Trong Chuỗi",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 5: Vòng lặp For, While, Break & Continue",
    difficulty: "Dễ",
    tags: ["for", "Đếm ký tự", "Chuỗi"],
    points: 20,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "4. Vòng lặp for",
    problemStatement: `Nhập một chuỗi ký tự từ bàn phím. Dùng vòng lặp for để đếm xem trong chuỗi có bao nhiêu chữ cái 'a' (chữ thường). In số lượng đếm được ra màn hình.`,
    inputFormat: "Một dòng chứa chuỗi văn bản.",
    outputFormat: "Một số nguyên là số chữ 'a'.",
    constraints: "Độ dài chuỗi <= 200.",
    sampleCases: [
      { input: "banana", output: "3", explanation: "Từ banana có 3 chữ a." },
      { input: "python", output: "0", explanation: "Không có chữ a nào." }
    ],
    starterCode: `s = input()
dem = 0

for ch in s:
    if ch == 'a':
        dem += 1

print(dem)
`,
    hints: ["Duyệt for ch in s: nếu ch == 'a' thì dem += 1."],
    solutionExplanation: `Duyệt qua chuỗi và đếm số lần xuất hiện của ký tự 'a'.`,
    testCases: [
      { id: "vl-37-t1", input: "banana", expectedOutput: "3", isHidden: false },
      { id: "vl-37-t2", input: "python", expectedOutput: "0", isHidden: false },
      { id: "vl-37-t3", input: "abracadabra", expectedOutput: "5", isHidden: true }
    ]
  },
  {
    id: "vl-38",
    title: "Câu 38. Tìm Số Lớn Nhất Bằng Vòng For",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 5: Vòng lặp For, While, Break & Continue",
    difficulty: "Trung bình",
    tags: ["for", "max", "Thuật toán tìm kiếm"],
    points: 25,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "4. Vòng lặp for",
    problemStatement: `Nhập một dãy số nguyên trên một dòng cách nhau bởi dấu cách (ví dụ: 4 8 2 9 1). Dùng vòng lặp for để tìm và in ra số lớn nhất trong danh sách.`,
    inputFormat: "Các số nguyên cách nhau bởi dấu cách trên một dòng.",
    outputFormat: "Số lớn nhất trong dãy.",
    constraints: "Có ít nhất 1 số, các số từ -10^6 đến 10^6.",
    sampleCases: [
      { input: "4 8 2 9 1", output: "9", explanation: "Số lớn nhất là 9." },
      { input: "15 2 33 8", output: "33", explanation: "Số lớn nhất là 33." }
    ],
    starterCode: `numbers = list(map(int, input().split()))

max_val = numbers[0]
for num in numbers:
    if num > max_val:
        max_val = num

print(max_val)
`,
    hints: ["Gán max_val = numbers[0], duyệt qua từng phần tử để cập nhật nếu num > max_val."],
    solutionExplanation: `Thuật toán tìm phần tử lớn nhất bằng biến max_val và vòng lặp for.`,
    testCases: [
      { id: "vl-38-t1", input: "4 8 2 9 1", expectedOutput: "9", isHidden: false },
      { id: "vl-38-t2", input: "15 2 33 8", expectedOutput: "33", isHidden: false },
      { id: "vl-38-t3", input: "-5 -1 -9", expectedOutput: "-1", isHidden: true }
    ]
  },

  // ==========================================
  // 5. FOR KẾT HỢP IF (CÂU 39 - 47)
  // ==========================================
  {
    id: "vl-39",
    title: "Câu 39. In Số Chẵn Từ 1 Đến 50 (for kết hợp if)",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 5: Vòng lặp For, While, Break & Continue",
    difficulty: "Dễ",
    tags: ["for kết hợp if", "Số chẵn"],
    points: 20,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "5. for kết hợp if",
    problemStatement: `Dùng vòng lặp for duyệt từ 1 đến 50 và kết hợp câu lệnh if để chỉ in ra các số chẵn. Các số in trên cùng một dòng cách nhau bởi dấu cách.`,
    inputFormat: "Không có dữ liệu đầu vào.",
    outputFormat: "Các số chẵn từ 2 đến 50 cách nhau dấu cách.",
    constraints: "Không có",
    sampleCases: [
      { input: "", output: Array.from({ length: 25 }, (_, i) => (i + 1) * 2).join(" "), explanation: "Các số chẵn từ 2 đến 50." }
    ],
    starterCode: `kq = []
for i in range(1, 51):
    if i % 2 == 0:
        kq.append(str(i))

print(" ".join(kq))
`,
    hints: ["Kiểm tra if i % 2 == 0 trước khi in."],
    solutionExplanation: `Duyệt từ 1 đến 50 và dùng if để lọc số chẵn.`,
    testCases: [
      { id: "vl-39-t1", input: "", expectedOutput: Array.from({ length: 25 }, (_, i) => (i + 1) * 2).join(" "), isHidden: false }
    ]
  },
  {
    id: "vl-40",
    title: "Câu 40. In Số Chia Hết Cho 5 Từ 1 Đến 50",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 5: Vòng lặp For, While, Break & Continue",
    difficulty: "Dễ",
    tags: ["for kết hợp if", "Bội số của 5"],
    points: 20,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "5. for kết hợp if",
    problemStatement: `Dùng vòng lặp for và câu lệnh if để tìm và in ra các số chia hết cho 5 trong phạm vi từ 1 đến 50 trên cùng một dòng, cách nhau bởi dấu cách.`,
    inputFormat: "Không có dữ liệu đầu vào.",
    outputFormat: "5 10 15 20 25 30 35 40 45 50",
    constraints: "Không có",
    sampleCases: [
      { input: "", output: "5 10 15 20 25 30 35 40 45 50", explanation: "Các bội số của 5 từ 1 đến 50." }
    ],
    starterCode: `kq = []
for i in range(1, 51):
    if i % 5 == 0:
        kq.append(str(i))

print(" ".join(kq))
`,
    hints: ["Điều kiện chia hết cho 5 là i % 5 == 0."],
    solutionExplanation: `Lọc các số chia hết cho 5 bằng toán tử % và vòng lặp for.`,
    testCases: [
      { id: "vl-40-t1", input: "", expectedOutput: "5 10 15 20 25 30 35 40 45 50", isHidden: false }
    ]
  },
  {
    id: "vl-41",
    title: "Câu 41. Đếm Số Chẵn Trong Khoảng 1 Đến 100",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 5: Vòng lặp For, While, Break & Continue",
    difficulty: "Dễ",
    tags: ["for kết hợp if", "Đếm số chẵn"],
    points: 20,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "5. for kết hợp if",
    problemStatement: `Dùng vòng lặp for kết hợp if để đếm xem trong các số nguyên từ 1 đến 100 có bao nhiêu số chẵn. In kết quả ra màn hình.`,
    inputFormat: "Không có dữ liệu đầu vào.",
    outputFormat: "Số 50.",
    constraints: "Không có",
    sampleCases: [
      { input: "", output: "50", explanation: "Từ 1 đến 100 có 50 số chẵn." }
    ],
    starterCode: `dem = 0
for i in range(1, 101):
    if i % 2 == 0:
        dem += 1

print(dem)
`,
    hints: ["Khởi tạo dem = 0, nếu i % 2 == 0 thì tăng dem."],
    solutionExplanation: `Đếm số lượng số chẵn từ 1 đến 100.`,
    testCases: [
      { id: "vl-41-t1", input: "", expectedOutput: "50", isHidden: false }
    ]
  },
  {
    id: "vl-42",
    title: "Câu 42. Tính Tổng Số Lẻ Từ 1 Đến 100",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 5: Vòng lặp For, While, Break & Continue",
    difficulty: "Dễ",
    tags: ["for kết hợp if", "Tổng số lẻ"],
    points: 20,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "5. for kết hợp if",
    problemStatement: `Dùng vòng lặp for và câu lệnh if để tính tổng các số lẻ từ 1 đến 100 (1 + 3 + 5 + ... + 99). In kết quả ra màn hình.`,
    inputFormat: "Không có dữ liệu đầu vào.",
    outputFormat: "Số 2500.",
    constraints: "Không có",
    sampleCases: [
      { input: "", output: "2500", explanation: "Tổng các số lẻ từ 1 đến 100 là 2500." }
    ],
    starterCode: `tong = 0
for i in range(1, 101):
    if i % 2 != 0:
        tong += i

print(tong)
`,
    hints: ["Điều kiện số lẻ là i % 2 != 0."],
    solutionExplanation: `Tính tổng các số lẻ từ 1 đến 100.`,
    testCases: [
      { id: "vl-42-t1", input: "", expectedOutput: "2500", isHidden: false }
    ]
  },
  {
    id: "vl-43",
    title: "Câu 43. Đếm Số Lớn Hơn 50",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 5: Vòng lặp For, While, Break & Continue",
    difficulty: "Dễ",
    tags: ["for kết hợp if", "Đếm phần tử"],
    points: 20,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "5. for kết hợp if",
    problemStatement: `Cho một dãy số nguyên (ví dụ: numbers = [12, 67, 34, 89, 45, 72]). Nhập dãy số từ bàn phím trên một dòng cách nhau bởi dấu cách. Hãy đếm xem có bao nhiêu số lớn hơn 50.`,
    inputFormat: "Các số nguyên cách nhau bởi dấu cách trên một dòng.",
    outputFormat: "Một số nguyên duy nhất là số phần tử lớn hơn 50.",
    constraints: "Dãy có từ 1 đến 100 số.",
    sampleCases: [
      { input: "12 67 34 89 45 72", output: "3", explanation: "Các số > 50 là: 67, 89, 72 (tổng cộng 3 số)." }
    ],
    starterCode: `numbers = list(map(int, input().split()))

dem = 0
for x in numbers:
    if x > 50:
        dem += 1

print(dem)
`,
    hints: ["Duyệt từng phần tử x trong numbers, kiểm tra if x > 50: dem += 1."],
    solutionExplanation: `Dùng vòng for và điều kiện if x > 50 để đếm.`,
    testCases: [
      { id: "vl-43-t1", input: "12 67 34 89 45 72", expectedOutput: "3", isHidden: false },
      { id: "vl-43-t2", input: "10 20 30 40 50", expectedOutput: "0", isHidden: false },
      { id: "vl-43-t3", input: "51 99 100", expectedOutput: "3", isHidden: true }
    ]
  },
  {
    id: "vl-44",
    title: "Câu 44. Tìm Số Chẵn Lớn Nhất",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 5: Vòng lặp For, While, Break & Continue",
    difficulty: "Trung bình",
    tags: ["for kết hợp if", "Số chẵn lớn nhất"],
    points: 25,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "5. for kết hợp if",
    problemStatement: `Trong một danh sách các số nguyên nhập từ bàn phím (cách nhau bởi dấu cách), hãy tìm số chẵn lớn nhất. Nếu danh sách không có số chẵn nào, in ra "Khong co".`,
    inputFormat: "Các số nguyên cách nhau bởi dấu cách trên một dòng.",
    outputFormat: "Số chẵn lớn nhất hoặc 'Khong co'.",
    constraints: "Số lượng phần tử từ 1 đến 100.",
    sampleCases: [
      { input: "11 4 8 15 2 10", output: "10", explanation: "Các số chẵn là 4, 8, 2, 10 -> số lớn nhất là 10." },
      { input: "1 3 5 7", output: "Khong co", explanation: "Không có số chẵn nào." }
    ],
    starterCode: `nums = list(map(int, input().split()))

chan_nums = [x for x in nums if x % 2 == 0]
if len(chan_nums) > 0:
    print(max(chan_nums))
else:
    print("Khong co")
`,
    hints: ["Lọc các số chẵn (x % 2 == 0), nếu có thì tìm max, ngược lại in 'Khong co'."],
    solutionExplanation: `Tìm số chẵn lớn nhất trong danh sách.`,
    testCases: [
      { id: "vl-44-t1", input: "11 4 8 15 2 10", expectedOutput: "10", isHidden: false },
      { id: "vl-44-t2", input: "1 3 5 7", expectedOutput: "Khong co", isHidden: false },
      { id: "vl-44-t3", input: "-4 -8 -2", expectedOutput: "-2", isHidden: true }
    ]
  },
  {
    id: "vl-45",
    title: "Câu 45. Đếm Số Điểm Đạt",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 5: Vòng lặp For, While, Break & Continue",
    difficulty: "Dễ",
    tags: ["for kết hợp if", "Điểm thi", "Lọc"],
    points: 20,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "5. for kết hợp if",
    problemStatement: `Nhập một danh sách điểm thi (ví dụ: scores = [8, 4, 9, 6, 3, 10]) trên một dòng cách nhau bởi dấu cách. Dùng vòng lặp for và if để đếm có bao nhiêu điểm từ 5.0 trở lên (điểm đạt).`,
    inputFormat: "Dãy điểm số cách nhau bởi dấu cách.",
    outputFormat: "Số lượng bài đạt (điểm >= 5).",
    constraints: "Điểm từ 0 đến 10.",
    sampleCases: [
      { input: "8 4 9 6 3 10", output: "4", explanation: "Các điểm đạt: 8, 9, 6, 10 (có 4 điểm)." }
    ],
    starterCode: `scores = list(map(float, input().split()))

dem = 0
for s in scores:
    if s >= 5:
        dem += 1

print(dem)
`,
    hints: ["Duyệt từng điểm s: nếu s >= 5 thì tăng dem."],
    solutionExplanation: `Đếm số bài có điểm >= 5.`,
    testCases: [
      { id: "vl-45-t1", input: "8 4 9 6 3 10", expectedOutput: "4", isHidden: false },
      { id: "vl-45-t2", input: "2 3 4", expectedOutput: "0", isHidden: false },
      { id: "vl-45-t3", input: "5 5 10", expectedOutput: "3", isHidden: true }
    ]
  },
  {
    id: "vl-46",
    title: "Câu 46. In Các Số Vừa Chẵn Vừa Lớn Hơn 20",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 5: Vòng lặp For, While, Break & Continue",
    difficulty: "Dễ",
    tags: ["for kết hợp if", "and logic"],
    points: 20,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "5. for kết hợp if",
    problemStatement: `Nhập một danh sách các số nguyên trên một dòng cách nhau bởi dấu cách. Dùng vòng for kết hợp if để in ra các số vừa là số chẵn vừa lớn hơn 20 (cách nhau bởi dấu cách).`,
    inputFormat: "Các số nguyên trên 1 dòng cách nhau dấu cách.",
    outputFormat: "Các số thỏa mãn điều kiện cách nhau bởi dấu cách.",
    constraints: "Số lượng phần tử từ 1 đến 100.",
    sampleCases: [
      { input: "10 22 15 24 30 19 8", output: "22 24 30", explanation: "22, 24, 30 đều là số chẵn và > 20." }
    ],
    starterCode: `nums = list(map(int, input().split()))

kq = []
for x in nums:
    if x % 2 == 0 and x > 20:
        kq.append(str(x))

print(" ".join(kq))
`,
    hints: ["Điều kiện: x % 2 == 0 and x > 20."],
    solutionExplanation: `Kết hợp toán tử logic and trong câu lệnh if.`,
    testCases: [
      { id: "vl-46-t1", input: "10 22 15 24 30 19 8", expectedOutput: "22 24 30", isHidden: false },
      { id: "vl-46-t2", input: "2 4 6 8 20", expectedOutput: "", isHidden: false },
      { id: "vl-46-t3", input: "22 44 66", expectedOutput: "22 44 66", isHidden: true }
    ]
  },
  {
    id: "vl-47",
    title: "Câu 47. Trò Chơi FizzBuzz Đơn Giản",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 5: Vòng lặp For, While, Break & Continue",
    difficulty: "Trung bình",
    tags: ["for kết hợp if", "FizzBuzz", "Kinh điển"],
    points: 25,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "5. for kết hợp if",
    problemStatement: `Xét các số nguyên từ 1 đến 30. Viết chương trình in lần lượt từng dòng từ 1 đến 30:
- Nếu chia hết cho cả 3 và 5: in "FizzBuzz"
- Nếu chỉ chia hết cho 3: in "Fizz"
- Nếu chỉ chia hết cho 5: in "Buzz"
- Các trường hợp còn lại: in chính số đó.`,
    inputFormat: "Không có dữ liệu đầu vào.",
    outputFormat: "30 dòng tương ứng từ 1 đến 30.",
    constraints: "Không có",
    sampleCases: [
      {
        input: "",
        output: "1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz\n16\n17\nFizz\n19\nBuzz\nFizz\n22\n23\nFizz\nBuzz\n26\nFizz\n28\n29\nFizzBuzz",
        explanation: "Các số 15 và 30 chia hết cho cả 3 và 5 nên in FizzBuzz."
      }
    ],
    starterCode: `for i in range(1, 31):
    if i % 3 == 0 and i % 5 == 0:
        print("FizzBuzz")
    elif i % 3 == 0:
        print("Fizz")
    elif i % 5 == 0:
        print("Buzz")
    else:
        print(i)
`,
    hints: ["Kiểm tra điều kiện chia hết cho cả 3 và 5 trước tiên (i % 15 == 0)."],
    solutionExplanation: `Bài toán kinh điển FizzBuzz áp dụng if-elif-else trong vòng lặp for.`,
    testCases: [
      {
        id: "vl-47-t1",
        input: "",
        expectedOutput: "1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz\n16\n17\nFizz\n19\nBuzz\nFizz\n22\n23\nFizz\nBuzz\n26\nFizz\n28\n29\nFizzBuzz",
        isHidden: false
      }
    ]
  },

  // ==========================================
  // 6. VÒNG LẶP WHILE (CÂU 48 - 55)
  // ==========================================
  {
    id: "vl-48",
    title: "Câu 48. In Từ 1 Đến 10 Bằng Vòng Lặp While",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 5: Vòng lặp For, While, Break & Continue",
    difficulty: "Dễ",
    tags: ["while cơ bản", "Đếm tiến"],
    points: 15,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "6. Vòng lặp while",
    problemStatement: `Sử dụng vòng lặp while để in các số nguyên từ 1 đến 10 trên cùng một dòng, cách nhau bởi dấu cách.`,
    inputFormat: "Không có dữ liệu đầu vào.",
    outputFormat: "1 2 3 4 5 6 7 8 9 10",
    constraints: "Không có",
    sampleCases: [
      { input: "", output: "1 2 3 4 5 6 7 8 9 10", explanation: "In từ 1 đến 10 bằng while." }
    ],
    starterCode: `i = 1
while i <= 10:
    print(i, end=" " if i < 10 else "\n")
    i += 1
`,
    hints: ["Khởi tạo i = 1, lặp while i <= 10, nhớ tăng i += 1."],
    solutionExplanation: `Cấu trúc cơ bản của vòng lặp while: biến đếm, điều kiện dừng, và bước nhảy.`,
    testCases: [
      { id: "vl-48-t1", input: "", expectedOutput: "1 2 3 4 5 6 7 8 9 10", isHidden: false }
    ]
  },
  {
    id: "vl-49",
    title: "Câu 49. In Từ 10 Về 1 (Đếm Ngược Bằng While)",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 5: Vòng lặp For, While, Break & Continue",
    difficulty: "Dễ",
    tags: ["while", "Đếm ngược"],
    points: 15,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "6. Vòng lặp while",
    problemStatement: `Dùng vòng lặp while để đếm ngược và in các số từ 10 về 1 trên cùng một dòng, cách nhau bởi dấu cách.`,
    inputFormat: "Không có dữ liệu đầu vào.",
    outputFormat: "10 9 8 7 6 5 4 3 2 1",
    constraints: "Không có",
    sampleCases: [
      { input: "", output: "10 9 8 7 6 5 4 3 2 1", explanation: "Đếm ngược từ 10 về 1." }
    ],
    starterCode: `i = 10
while i >= 1:
    print(i, end=" " if i > 1 else "\n")
    i -= 1
`,
    hints: ["Khởi tạo i = 10, điều kiện i >= 1, mỗi bước giảm i -= 1."],
    solutionExplanation: `Vòng lặp giảm dần từ 10 xuống 1.`,
    testCases: [
      { id: "vl-49-t1", input: "", expectedOutput: "10 9 8 7 6 5 4 3 2 1", isHidden: false }
    ]
  },
  {
    id: "vl-50",
    title: "Câu 50. Đếm Số Từ 1 Đến n Bằng While",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 5: Vòng lặp For, While, Break & Continue",
    difficulty: "Dễ",
    tags: ["while", "Đếm số n"],
    points: 20,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "6. Vòng lặp while",
    problemStatement: `Nhập một số nguyên dương n từ bàn phím. Sử dụng vòng lặp while để in các số từ 1 đến n trên cùng một dòng, cách nhau bởi dấu cách.`,
    inputFormat: "Một số nguyên dương n.",
    outputFormat: "Các số từ 1 đến n cách nhau bởi dấu cách.",
    constraints: "1 <= n <= 100",
    sampleCases: [
      { input: "6", output: "1 2 3 4 5 6", explanation: "In từ 1 đến 6." }
    ],
    starterCode: `n = int(input())

i = 1
while i <= n:
    print(i, end=" " if i < n else "\n")
    i += 1
`,
    hints: ["Dùng i = 1, lặp while i <= n: print, i += 1."],
    solutionExplanation: `Duyệt từ 1 đến n bằng vòng while.`,
    testCases: [
      { id: "vl-50-t1", input: "6", expectedOutput: "1 2 3 4 5 6", isHidden: false },
      { id: "vl-50-t2", input: "1", expectedOutput: "1", isHidden: false },
      { id: "vl-50-t3", input: "8", expectedOutput: "1 2 3 4 5 6 7 8", isHidden: true }
    ]
  },
  {
    id: "vl-51",
    title: "Câu 51. Tính Tổng 1 Đến n Bằng While",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 5: Vòng lặp For, While, Break & Continue",
    difficulty: "Dễ",
    tags: ["while", "Tổng dãy số"],
    points: 20,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "6. Vòng lặp while",
    problemStatement: `Nhập một số nguyên dương n từ bàn phím. Sử dụng vòng lặp while để tính tổng S = 1 + 2 + ... + n và in kết quả ra màn hình.`,
    inputFormat: "Một số nguyên dương n.",
    outputFormat: "Tổng các số từ 1 đến n.",
    constraints: "1 <= n <= 1000",
    sampleCases: [
      { input: "5", output: "15", explanation: "1 + 2 + 3 + 4 + 5 = 15." },
      { input: "10", output: "55", explanation: "1 + 2 + ... + 10 = 55." }
    ],
    starterCode: `n = int(input())

tong = 0
i = 1
while i <= n:
    tong += i
    i += 1

print(tong)
`,
    hints: ["Mỗi bước lặp: tong += i và i += 1."],
    solutionExplanation: `Tính tổng 1 đến n bằng tích lũy trong while.`,
    testCases: [
      { id: "vl-51-t1", input: "5", expectedOutput: "15", isHidden: false },
      { id: "vl-51-t2", input: "10", expectedOutput: "55", isHidden: false },
      { id: "vl-51-t3", input: "100", expectedOutput: "5050", isHidden: true }
    ]
  },
  {
    id: "vl-52",
    title: "Câu 52. Nhập Cho Đến Khi Mật Khẩu Đúng",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 5: Vòng lặp For, While, Break & Continue",
    difficulty: "Trung bình",
    tags: ["while", "Mật khẩu", "Vòng lặp vô hạn"],
    points: 25,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "6. Vòng lặp while",
    problemStatement: `Hệ thống có mật khẩu bí mật là "1234". Chương trình liên tục yêu cầu người dùng nhập mật khẩu trên từng dòng cho đến khi mật khẩu nhập vào đúng là "1234". Khi đúng, in ra "Dang nhap thanh cong" và dừng chương trình.`,
    inputFormat: "Gồm một hoặc nhiều dòng, dòng cuối cùng là '1234'.",
    outputFormat: "In 'Dang nhap thanh cong'.",
    constraints: "Mỗi dòng là chuỗi không quá 50 ký tự.",
    sampleCases: [
      { input: "1111\n9999\n1234", output: "Dang nhap thanh cong", explanation: "Nhập đến dòng thứ 3 khớp mật khẩu." }
    ],
    starterCode: `password = "1234"

while True:
    nhap = input().strip()
    if nhap == password:
        print("Dang nhap thanh cong")
        break
`,
    hints: ["Dùng while True: nhập và kiểm tra nếu nhap == '1234' thì print và break."],
    solutionExplanation: `Vòng lặp while True kết hợp lệnh break khi nhập đúng mật khẩu.`,
    testCases: [
      { id: "vl-52-t1", input: "1111\n9999\n1234", expectedOutput: "Dang nhap thanh cong", isHidden: false },
      { id: "vl-52-t2", input: "1234", expectedOutput: "Dang nhap thanh cong", isHidden: false },
      { id: "vl-52-t3", input: "abcd\nxyz\n0000\n1234", expectedOutput: "Dang nhap thanh cong", isHidden: true }
    ]
  },
  {
    id: "vl-53",
    title: "Câu 53. Nhập Số Cho Đến Khi Gặp Số Dương",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 5: Vòng lặp For, While, Break & Continue",
    difficulty: "Trung bình",
    tags: ["while", "Số dương", "Xác thực đầu vào"],
    points: 25,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "6. Vòng lặp while",
    problemStatement: `Chương trình liên tục đọc từng số nguyên từ bàn phím. Nếu số nhập vào <= 0, tiếp tục yêu cầu nhập số tiếp theo. Khi người dùng nhập được một số dương (> 0), hãy in ra định dạng: "So duong: {số}" và kết thúc vòng lặp.`,
    inputFormat: "Gồm một hoặc nhiều dòng chứa số nguyên, dòng cuối cùng là số > 0.",
    outputFormat: "Định dạng 'So duong: X'.",
    constraints: "Các số từ -1000 đến 1000.",
    sampleCases: [
      { input: "-5\n-1\n0\n8", output: "So duong: 8", explanation: "Sau 3 số <= 0, số 8 là số dương đầu tiên." }
    ],
    starterCode: `while True:
    n = int(input())
    if n > 0:
        print(f"So duong: {n}")
        break
`,
    hints: ["Dùng while True: đọc n, if n > 0: in và break."],
    solutionExplanation: `Kỹ thuật kiểm tra tính hợp lệ của dữ liệu đầu vào bằng vòng lặp while.`,
    testCases: [
      { id: "vl-53-t1", input: "-5\n-1\n0\n8", expectedOutput: "So duong: 8", isHidden: false },
      { id: "vl-53-t2", input: "15", expectedOutput: "So duong: 15", isHidden: false },
      { id: "vl-53-t3", input: "-100\n-50\n-1\n2", expectedOutput: "So duong: 2", isHidden: true }
    ]
  },
  {
    id: "vl-54",
    title: "Câu 54. Đếm Ngược Từ n Về 1 Bằng While",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 5: Vòng lặp For, While, Break & Continue",
    difficulty: "Dễ",
    tags: ["while", "Đếm ngược n"],
    points: 20,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "6. Vòng lặp while",
    problemStatement: `Nhập số nguyên dương n từ bàn phím. Sử dụng vòng lặp while để in các số đếm ngược từ n về 1 trên cùng một dòng, cách nhau bởi dấu cách.`,
    inputFormat: "Một số nguyên dương n.",
    outputFormat: "Các số từ n về 1 cách nhau dấu cách: n n-1 ... 1.",
    constraints: "1 <= n <= 100",
    sampleCases: [
      { input: "5", output: "5 4 3 2 1", explanation: "Đếm ngược từ 5 về 1." }
    ],
    starterCode: `n = int(input())

while n >= 1:
    print(n, end=" " if n > 1 else "\n")
    n -= 1
`,
    hints: ["Bắt đầu từ n, mỗi bước in n rồi giảm n -= 1 cho đến khi n < 1."],
    solutionExplanation: `Đếm ngược từ n về 1 bằng cách giảm biến đếm trong while.`,
    testCases: [
      { id: "vl-54-t1", input: "5", expectedOutput: "5 4 3 2 1", isHidden: false },
      { id: "vl-54-t2", input: "3", expectedOutput: "3 2 1", isHidden: false },
      { id: "vl-54-t3", input: "1", expectedOutput: "1", isHidden: true }
    ]
  },
  {
    id: "vl-55",
    title: "Câu 55. Trò Chơi Đoán Số Bí Mật",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 5: Vòng lặp For, While, Break & Continue",
    difficulty: "Trung bình",
    tags: ["while", "Game", "Đoán số"],
    points: 30,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "6. Vòng lặp while",
    problemStatement: `Máy tính có một số bí mật secret = 7. Người chơi nhập vào các số phỏng đoán trên từng dòng:
- Nếu số đoán nhỏ hơn 7: in "Nho hon"
- Nếu số đoán lớn hơn 7: in "Lon hon"
- Nếu số đoán bằng 7: in "Chinh xac!" và dừng trò chơi.`,
    inputFormat: "Một hoặc nhiều dòng, mỗi dòng chứa một số nguyên đoán.",
    outputFormat: "Mỗi lượt đoán in chỉ dẫn tương ứng trên một dòng.",
    constraints: "Số bí mật là 7.",
    sampleCases: [
      {
        input: "3\n9\n7",
        output: "Nho hon\nLon hon\nChinh xac!",
        explanation: "3 < 7 (Nho hon), 9 > 7 (Lon hon), 7 == 7 (Chinh xac!)."
      }
    ],
    starterCode: `secret = 7

while True:
    guess = int(input())
    if guess < secret:
        print("Nho hon")
    elif guess > secret:
        print("Lon hon")
    else:
        print("Chinh xac!")
        break
`,
    hints: ["So sánh guess với secret (7), nếu đúng thì break."],
    solutionExplanation: `Mô phỏng trò chơi đoán số nhị phân bằng vòng lặp while True và rẽ nhánh.`,
    testCases: [
      {
        id: "vl-55-t1",
        input: "3\n9\n7",
        expectedOutput: "Nho hon\nLon hon\nChinh xac!",
        isHidden: false
      },
      {
        id: "vl-55-t2",
        input: "7",
        expectedOutput: "Chinh xac!",
        isHidden: false
      },
      {
        id: "vl-55-t3",
        input: "1\n2\n5\n10\n8\n7",
        expectedOutput: "Nho hon\nNho hon\nNho hon\nLon hon\nLon hon\nChinh xac!",
        isHidden: true
      }
    ]
  },

  // ==========================================
  // 7. BÀI TẬP TỔNG HỢP (CÂU 56 - 60)
  // ==========================================
  {
    id: "vl-56",
    title: "Câu 56. Máy Bán Hàng Tự Động",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 5: Vòng lặp For, While, Break & Continue",
    difficulty: "Trung bình",
    tags: ["Tổng hợp", "Máy bán hàng", "Mua sắm"],
    points: 30,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "7. Bài tập tổng hợp",
    problemStatement: `Một máy bán hàng tự động có 3 sản phẩm:
- Mã 1: Keo (giá 5.000 đồng)
- Mã 2: Banh (giá 10.000 đồng)
- Mã 3: Sua (giá 8.000 đồng)
Chương trình nhận vào:
- Dòng 1: Mã sản phẩm (số nguyên)
- Dòng 2: Số tiền người mua đưa vào (số nguyên)
Yêu cầu:
- Nếu mã không hợp lệ (không phải 1, 2, 3): in "San pham khong hop le"
- Nếu mã hợp lệ:
  + Nếu số tiền đủ trả (tien >= gia): in "Mua thanh cong, tien thua: {tien - gia}"
  + Nếu số tiền không đủ: in "Khong du tien"`,
    inputFormat: "Dòng 1: mã sản phẩm (int). Dòng 2: số tiền nạp vào (int).",
    outputFormat: "Thông báo kết quả mua hàng.",
    constraints: "Tiền nạp vào từ 1.000 đến 100.000 đồng.",
    sampleCases: [
      { input: "1\n10000", output: "Mua thanh cong, tien thua: 5000", explanation: "Kẹo giá 5.000đ, nạp 10.000đ -> thừa 5.000đ." },
      { input: "2\n5000", output: "Khong du tien", explanation: "Bánh giá 10.000đ, nạp 5.000đ -> không đủ." },
      { input: "4\n20000", output: "San pham khong hop le", explanation: "Mã 4 không tồn tại." }
    ],
    starterCode: `ma = int(input())
tien = int(input())

if ma == 1:
    gia = 5000
elif ma == 2:
    gia = 10000
elif ma == 3:
    gia = 8000
else:
    gia = None

if gia is None:
    print("San pham khong hop le")
else:
    if tien >= gia:
        print(f"Mua thanh cong, tien thua: {tien - gia}")
    else:
        print("Khong du tien")
`,
    hints: ["Xác định giá theo mã sản phẩm trước, sau đó so sánh tiền với giá."],
    solutionExplanation: `Bài toán tổng hợp xử lý kiểm tra lựa chọn kết hợp tính toán tiền thừa.`,
    testCases: [
      { id: "vl-56-t1", input: "1\n10000", expectedOutput: "Mua thanh cong, tien thua: 5000", isHidden: false },
      { id: "vl-56-t2", input: "2\n5000", expectedOutput: "Khong du tien", isHidden: false },
      { id: "vl-56-t3", input: "4\n20000", expectedOutput: "San pham khong hop le", isHidden: false },
      { id: "vl-56-t4", input: "3\n8000", expectedOutput: "Mua thanh cong, tien thua: 0", isHidden: true }
    ]
  },
  {
    id: "vl-57",
    title: "Câu 57. Trò Chơi Tính Điểm Trắc Nghiệm",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 5: Vòng lặp For, While, Break & Continue",
    difficulty: "Trung bình",
    tags: ["Tổng hợp", "Tính điểm", "Đánh giá"],
    points: 25,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "7. Bài tập tổng hợp",
    problemStatement: `Một bài trắc nghiệm có 5 câu hỏi. Nhập kết quả trả lời của 5 câu trên 5 dòng: mỗi dòng là 1 (trả lời đúng, +1 điểm) hoặc 0 (trả lời sai, 0 điểm).
Tính tổng điểm (0 đến 5) và đánh giá:
- 5 điểm: in "Xuat sac"
- 3 hoặc 4 điểm: in "Tot"
- 1 hoặc 2 điểm: in "Can co gang"
- 0 điểm: in "Hay thu lai"`,
    inputFormat: "5 dòng, mỗi dòng chứa số 1 hoặc 0.",
    outputFormat: "Đánh giá xếp loại thành tích.",
    constraints: "5 câu hỏi, điểm mỗi câu là 0 hoặc 1.",
    sampleCases: [
      { input: "1\n1\n1\n1\n1", output: "Xuat sac", explanation: "Đúng cả 5 câu -> Xuất sắc." },
      { input: "1\n0\n1\n1\n0", output: "Tot", explanation: "Đúng 3 câu -> Tốt." }
    ],
    starterCode: `tong_diem = 0
for _ in range(5):
    cau = int(input())
    tong_diem += cau

if tong_diem == 5:
    print("Xuat sac")
elif tong_diem >= 3:
    print("Tot")
elif tong_diem >= 1:
    print("Can co gang")
else:
    print("Hay thu lai")
`,
    hints: ["Cộng dồn 5 câu hỏi vào tong_diem rồi dùng if-elif-else."],
    solutionExplanation: `Tính tổng điểm 5 câu trắc nghiệm và phân loại.`,
    testCases: [
      { id: "vl-57-t1", input: "1\n1\n1\n1\n1", expectedOutput: "Xuat sac", isHidden: false },
      { id: "vl-57-t2", input: "1\n0\n1\n1\n0", expectedOutput: "Tot", isHidden: false },
      { id: "vl-57-t3", input: "1\n0\n0\n1\n0", expectedOutput: "Can co gang", isHidden: true },
      { id: "vl-57-t4", input: "0\n0\n0\n0\n0", expectedOutput: "Hay thu lai", isHidden: true }
    ]
  },
  {
    id: "vl-58",
    title: "Câu 58. Robot Di Chuyển",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 5: Vòng lặp For, While, Break & Continue",
    difficulty: "Trung bình",
    tags: ["Tổng hợp", "Robot", "Tọa độ"],
    points: 30,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "7. Bài tập tổng hợp",
    problemStatement: `Robot di chuyển trên một trục số, bắt đầu ở vị trí 0. Người điều khiển nhập các lệnh trên từng dòng:
- 'r': sang phải (tọa độ tăng thêm 1)
- 'l': sang trái (tọa độ giảm đi 1)
- 'q': dừng chương trình
Khi gặp lệnh 'q', dừng nhận lệnh và in ra tọa độ cuối cùng theo định dạng: "Vi tri cuoi: {pos}".`,
    inputFormat: "Các dòng chứa ký tự 'r', 'l' hoặc 'q'. Dòng cuối là 'q'.",
    outputFormat: "Định dạng 'Vi tri cuoi: X'.",
    constraints: "Số lượng lệnh không quá 100.",
    sampleCases: [
      { input: "r\nr\nl\nr\nq", output: "Vi tri cuoi: 2", explanation: "0 + 1 + 1 - 1 + 1 = 2." },
      { input: "l\nl\nq", output: "Vi tri cuoi: -2", explanation: "0 - 1 - 1 = -2." }
    ],
    starterCode: `pos = 0

while True:
    cmd = input().strip()
    if cmd == 'q':
        break
    elif cmd == 'r':
        pos += 1
    elif cmd == 'l':
        pos -= 1

print(f"Vi tri cuoi: {pos}")
`,
    hints: ["Khởi tạo pos = 0, gặp 'r' thì pos += 1, gặp 'l' thì pos -= 1, gặp 'q' thì break."],
    solutionExplanation: `Mô phỏng chuyển động robot 1 chiều bằng while và if-elif.`,
    testCases: [
      { id: "vl-58-t1", input: "r\nr\nl\nr\nq", expectedOutput: "Vi tri cuoi: 2", isHidden: false },
      { id: "vl-58-t2", input: "l\nl\nq", expectedOutput: "Vi tri cuoi: -2", isHidden: false },
      { id: "vl-58-t3", input: "q", expectedOutput: "Vi tri cuoi: 0", isHidden: true }
    ]
  },
  {
    id: "vl-59",
    title: "Câu 59. Đếm Tiền Tiết Kiệm",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 5: Vòng lặp For, While, Break & Continue",
    difficulty: "Dễ",
    tags: ["Tổng hợp", "Tiết kiệm", "Mục tiêu tài chính"],
    points: 20,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "7. Bài tập tổng hợp",
    problemStatement: `Bạn nhỏ nuôi heo đất tiết kiệm. Nhập vào:
- Dòng 1: Số tiền tiết kiệm được mỗi ngày (đồng, số nguyên)
- Dòng 2: Số ngày tiết kiệm (số nguyên)
Tính tổng số tiền tiết kiệm được sau các ngày đó (tong = tien * so_ngay).
Nếu tổng tiền >= 100.000 đồng, in ra "Muc tieu dat duoc", ngược lại in ra "Can tiet kiem them".`,
    inputFormat: "Dòng 1: số tiền mỗi ngày (int). Dòng 2: số ngày (int).",
    outputFormat: "In 'Muc tieu dat duoc' hoặc 'Can tiet kiem them'.",
    constraints: "Tiền mỗi ngày >= 1000, số ngày >= 1.",
    sampleCases: [
      { input: "20000\n6", output: "Muc tieu dat duoc", explanation: "20.000 * 6 = 120.000đ >= 100.000đ." },
      { input: "10000\n5", output: "Can tiet kiem them", explanation: "10.000 * 5 = 50.000đ < 100.000đ." }
    ],
    starterCode: `tien_ngay = int(input())
so_ngay = int(input())

tong = tien_ngay * so_ngay
if tong >= 100000:
    print("Muc tieu dat duoc")
else:
    print("Can tiet kiem them")
`,
    hints: ["Tính tong = tien_ngay * so_ngay rồi so sánh với 100000."],
    solutionExplanation: `Tính tổng tiền tiết kiệm và kiểm tra mục tiêu 100.000đ.`,
    testCases: [
      { id: "vl-59-t1", input: "20000\n6", expectedOutput: "Muc tieu dat duoc", isHidden: false },
      { id: "vl-59-t2", input: "10000\n5", expectedOutput: "Can tiet kiem them", isHidden: false },
      { id: "vl-59-t3", input: "50000\n2", expectedOutput: "Muc tieu dat duoc", isHidden: true }
    ]
  },
  {
    id: "vl-60",
    title: "Câu 60. Menu Chương Trình Tổng Hợp",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 5: Vòng lặp For, While, Break & Continue",
    difficulty: "Trung bình",
    tags: ["Tổng hợp", "Menu chương trình", "Tích hợp"],
    points: 30,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "7. Bài tập tổng hợp",
    problemStatement: `Xây dựng chương trình có bảng chọn menu:
1. In dãy số từ 1 đến 10 cách nhau bởi dấu cách.
2. In các số chẵn từ 2 đến 10 cách nhau bởi dấu cách.
3. In tổng các số từ 1 đến 100 (5050).
4. Thoát chương trình (in "Tam biet").
Nhập vào số nguyên là lựa chọn của người dùng (1, 2, 3 hoặc 4) và thực hiện in kết quả tương ứng.`,
    inputFormat: "Một số nguyên từ 1 đến 4.",
    outputFormat: "Kết quả của chức năng đã chọn trong menu.",
    constraints: "1 <= choice <= 4",
    sampleCases: [
      { input: "1", output: "1 2 3 4 5 6 7 8 9 10", explanation: "In số 1-10." },
      { input: "2", output: "2 4 6 8 10", explanation: "In số chẵn 2-10." },
      { input: "3", output: "5050", explanation: "Tính tổng 1-100." },
      { input: "4", output: "Tam biet", explanation: "Thoát chương trình." }
    ],
    starterCode: `choice = int(input())

if choice == 1:
    print(" ".join(str(i) for i in range(1, 11)))
elif choice == 2:
    print(" ".join(str(i) for i in range(2, 11, 2)))
elif choice == 3:
    print(sum(range(1, 101)))
elif choice == 4:
    print("Tam biet")
`,
    hints: ["Dùng if-elif kiểm tra choice bằng 1, 2, 3 hay 4."],
    solutionExplanation: `Chương trình menu tổng hợp kết hợp các cấu trúc vòng lặp và rẽ nhánh.`,
    testCases: [
      { id: "vl-60-t1", input: "1", expectedOutput: "1 2 3 4 5 6 7 8 9 10", isHidden: false },
      { id: "vl-60-t2", input: "2", expectedOutput: "2 4 6 8 10", isHidden: false },
      { id: "vl-60-t3", input: "3", expectedOutput: "5050", isHidden: true },
      { id: "vl-60-t4", input: "4", expectedOutput: "Tam biet", isHidden: true }
    ]
  }
];
