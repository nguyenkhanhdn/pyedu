import { AlgorithmProblem } from "../../types";

export const TOPIC_6_PROBLEMS: AlgorithmProblem[] = [
  {
    id: "cd6-bai-1",
    title: "Bài 1. Định Nghĩa Hàm tinh_tong(a, b)",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 6: Hàm (Function) trong Python",
    difficulty: "Dễ",
    tags: ["def", "return", "Hàm số học"],
    points: 20,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 6: Hàm (Function)",
    problemStatement: `Định nghĩa hàm ` + "`tinh_tong(a, b)`" + ` nhận vào 2 số nguyên a và b và trả về tổng của chúng bằng lệnh ` + "`return`" + `.
Nhập 2 số nguyên a, b từ bàn phím (trên 2 dòng), gọi hàm và in kết quả.`,
    inputFormat: "Gồm 2 dòng chứa 2 số nguyên a và b.",
    outputFormat: "Một số nguyên duy nhất là kết quả của hàm tinh_tong(a, b).",
    constraints: "-10^9 <= a, b <= 10^9",
    sampleCases: [
      {
        input: "15\n27",
        output: "42",
        explanation: "tinh_tong(15, 27) = 42."
      }
    ],
    starterCode: `def tinh_tong(a, b):
    return a + b

a = int(input())
b = int(input())
print(tinh_tong(a, b))
`,
    hints: [
      "Sử dụng từ khóa `def` để định nghĩa hàm và `return a + b` để trả về giá trị."
    ],
    solutionExplanation: `Hàm def tinh_tong(a, b) tính và trả về a + b.`,
    testCases: [
      { id: "cd6-b1-t1", input: "15\n27", expectedOutput: "42", isHidden: false },
      { id: "cd6-b1-t2", input: "-10\n10", expectedOutput: "0", isHidden: false }
    ]
  },
  {
    id: "cd6-bai-2",
    title: "Bài 2. Hàm kiem_tra_chan_le(n)",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 6: Hàm (Function) trong Python",
    difficulty: "Dễ",
    tags: ["def", "bool", "Hàm kiểm tra"],
    points: 20,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 6: Hàm (Function)",
    problemStatement: `Viết hàm ` + "`kiem_tra_chan_le(n)`" + ` nhận vào số nguyên n, trả về True nếu n là số chẵn, False nếu n là số lẻ.
Nhập một số nguyên n, gọi hàm và in giá trị trả về.`,
    inputFormat: "Một số nguyên n.",
    outputFormat: "In ra True hoặc False.",
    constraints: "-10^9 <= n <= 10^9",
    sampleCases: [
      {
        input: "14",
        output: "True",
        explanation: "14 là số chẵn."
      },
      {
        input: "9",
        output: "False",
        explanation: "9 là số lẻ."
      }
    ],
    starterCode: `def kiem_tra_chan_le(n):
    return n % 2 == 0

n = int(input())
print(kiem_tra_chan_le(n))
`,
    hints: [
      "Trả về trực tiếp biểu thức logic: `return n % 2 == 0`."
    ],
    solutionExplanation: `Hàm trả về kết quả của phép so sánh n % 2 == 0.`,
    testCases: [
      { id: "cd6-b2-t1", input: "14", expectedOutput: "True", isHidden: false },
      { id: "cd6-b2-t2", input: "9", expectedOutput: "False", isHidden: false }
    ]
  },
  {
    id: "cd6-bai-3",
    title: "Bài 3. Hàm tinh_giai_thua(n)",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 6: Hàm (Function) trong Python",
    difficulty: "Dễ",
    tags: ["def", "Giai thừa", "Hàm tính toán"],
    points: 25,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 6: Hàm (Function)",
    problemStatement: `Viết hàm ` + "`tinh_giai_thua(n)`" + ` nhận vào số nguyên n (0 <= n <= 20) và trả về giá trị n!.
Nhập n từ bàn phím, gọi hàm và in kết quả.`,
    inputFormat: "Một số nguyên không âm n.",
    outputFormat: "Một số nguyên là giá trị n!.",
    constraints: "0 <= n <= 20",
    sampleCases: [
      {
        input: "5",
        output: "120",
        explanation: "5! = 120."
      },
      {
        input: "0",
        output: "1",
        explanation: "0! = 1."
      }
    ],
    starterCode: `def tinh_giai_thua(n):
    res = 1
    for i in range(1, n + 1):
        res *= i
    return res

n = int(input())
print(tinh_giai_thua(n))
`,
    hints: [
      "Dùng vòng lặp hoặc đệ quy để tính tích từ 1 đến n."
    ],
    solutionExplanation: `Hàm tính giai thừa tích lũy bằng vòng lặp.`,
    testCases: [
      { id: "cd6-b3-t1", input: "5", expectedOutput: "120", isHidden: false },
      { id: "cd6-b3-t2", input: "0", expectedOutput: "1", isHidden: false },
      { id: "cd6-b3-t3", input: "7", expectedOutput: "5040", isHidden: true }
    ]
  },
  {
    id: "cd6-bai-4",
    title: "Bài 4. Hàm kiem_tra_so_nguyen_to(n) & Liệt Kê",
    level: "secondary",
    gradeGroup: "THCS (Khối 6-9)",
    topic: "Chủ đề 6: Hàm (Function) trong Python",
    difficulty: "Trung bình",
    tags: ["def", "Số nguyên tố", "Liệt kê"],
    points: 30,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 6: Hàm (Function)",
    problemStatement: `Viết hàm ` + "`kiem_tra_so_nguyen_to(n)`" + ` trả về True nếu n là số nguyên tố, ngược lại False.
Nhập vào một số nguyên k (2 <= k <= 200), sử dụng hàm đã viết để in ra tất cả các số nguyên tố nhỏ hơn hoặc bằng k trên cùng một dòng, cách nhau bởi dấu cách.`,
    inputFormat: "Một số nguyên k.",
    outputFormat: "Các số nguyên tố <= k cách nhau dấu cách.",
    constraints: "2 <= k <= 200",
    sampleCases: [
      {
        input: "20",
        output: "2 3 5 7 11 13 17 19",
        explanation: "Các số nguyên tố <= 20."
      }
    ],
    starterCode: `def kiem_tra_so_nguyen_to(n):
    if n < 2:
        return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    return True

k = int(input())
primes = [str(x) for x in range(2, k + 1) if kiem_tra_so_nguyen_to(x)]
print(" ".join(primes))
`,
    hints: [
      "Kiểm tra n < 2 thì False, lặp i từ 2 đến sqrt(n) kiểm tra n % i == 0."
    ],
    solutionExplanation: `Tách hàm kiểm tra số nguyên tố và gọi lặp để lọc danh sách.`,
    testCases: [
      { id: "cd6-b4-t1", input: "20", expectedOutput: "2 3 5 7 11 13 17 19", isHidden: false },
      { id: "cd6-b4-t2", input: "10", expectedOutput: "2 3 5 7", isHidden: false },
      { id: "cd6-b4-t3", input: "30", expectedOutput: "2 3 5 7 11 13 17 19 23 29", isHidden: true }
    ]
  },
  {
    id: "cd6-bai-5",
    title: "Bài 5. Hàm Có Tham Số Mặc Định loi_chao()",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 6: Hàm (Function) trong Python",
    difficulty: "Dễ",
    tags: ["Default argument", "Tham số mặc định", "f-string"],
    points: 25,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 6: Hàm (Function)",
    problemStatement: `Định nghĩa hàm ` + "`loi_chao(ten, loi_chuc='Chuc ban mot ngay tot lanh!')`" + `.
Hàm in ra dòng: "Xin chao <ten>! <loi_chuc>".
Nhập vào 1 dòng chứa tên, sau đó gọi hàm với tham số mặc định và in kết quả.`,
    inputFormat: "Một dòng chứa tên người dùng.",
    outputFormat: "In ra lời chào với lời chúc mặc định.",
    constraints: "Tên có độ dài <= 50",
    sampleCases: [
      {
        input: "Binh",
        output: "Xin chao Binh! Chuc ban mot ngay tot lanh!",
        explanation: "Sử dụng lời chúc mặc định."
      }
    ],
    starterCode: `def loi_chao(ten, loi_chuc="Chuc ban mot ngay tot lanh!"):
    print(f"Xin chao {ten}! {loi_chuc}")

ten = input().strip()
loi_chao(ten)
`,
    hints: [
      "Khai báo tham số mặc định trong ngoặc tròn: `loi_chuc='...'`."
    ],
    solutionExplanation: `Tham số mặc định cho phép gọi hàm mà không cần truyền giá trị thứ hai.`,
    testCases: [
      { id: "cd6-b5-t1", input: "Binh", expectedOutput: "Xin chao Binh! Chuc ban mot ngay tot lanh!", isHidden: false },
      { id: "cd6-b5-t2", input: "Mai", expectedOutput: "Xin chao Mai! Chuc ban mot ngay tot lanh!", isHidden: false }
    ]
  },
  {
    id: "cd6-bai-6",
    title: "Bài 6. Hàm tim_max(a, b, c) Không Dùng max()",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 6: Hàm (Function) trong Python",
    difficulty: "Dễ",
    tags: ["def", "tim_max", "Hàm so sánh"],
    points: 20,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 6: Hàm (Function)",
    problemStatement: `Viết hàm ` + "`tim_max(a, b, c)`" + ` nhận vào 3 số thực và trả về số lớn nhất (tự viết giải thuật so sánh không dùng hàm max() có sẵn).
Nhập 3 số thực trên 3 dòng, gọi hàm và in ra số lớn nhất.`,
    inputFormat: "Gồm 3 dòng chứa 3 số thực a, b, c.",
    outputFormat: "Số lớn nhất trong 3 số.",
    constraints: "-10^6 <= a, b, c <= 10^6",
    sampleCases: [
      {
        input: "12\n45\n30",
        output: "45.0",
        explanation: "45.0 là số lớn nhất."
      }
    ],
    starterCode: `def tim_max(a, b, c):
    m = a
    if b > m:
        m = b
    if c > m:
        m = c
    return m

a = float(input())
b = float(input())
c = float(input())
print(tim_max(a, b, c))
`,
    hints: [
      "Khởi tạo m = a, nếu b > m thì gán m = b, nếu c > m thì gán m = c."
    ],
    solutionExplanation: `Thuật toán tìm max bằng cách so sánh tuần tự.`,
    testCases: [
      { id: "cd6-b6-t1", input: "12\n45\n30", expectedOutput: "45.0", isHidden: false },
      { id: "cd6-b6-t2", input: "-5\n-1\n-10", expectedOutput: "-1.0", isHidden: false }
    ]
  },
  {
    id: "cd6-bai-7",
    title: "Bài 7. Hàm tinh_dien_tich_hinh_tron(r, pi=3.14)",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 6: Hàm (Function) trong Python",
    difficulty: "Dễ",
    tags: ["def", "pi", "Diện tích tròn"],
    points: 20,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 6: Hàm (Function)",
    problemStatement: `Viết hàm ` + "`tinh_dien_tich_hinh_tron(r, pi=3.14)`" + ` trả về diện tích hình tròn S = pi * r * r.
Nhập bán kính r (số thực), gọi hàm và in kết quả làm tròn 2 chữ số thập phân.`,
    inputFormat: "Một số thực r.",
    outputFormat: "Diện tích hình tròn (định dạng {:.2f}).",
    constraints: "r > 0",
    sampleCases: [
      {
        input: "5",
        output: "78.50",
        explanation: "3.14 * 25 = 78.50."
      }
    ],
    starterCode: `def tinh_dien_tich_hinh_tron(r, pi=3.14):
    return pi * r * r

r = float(input())
dt = tinh_dien_tich_hinh_tron(r)
print(f"{dt:.2f}")
`,
    hints: [
      "Tính pi * r * r và định dạng f'{dt:.2f}'."
    ],
    solutionExplanation: `Áp dụng hàm với tham số mặc định pi = 3.14.`,
    testCases: [
      { id: "cd6-b7-t1", input: "5", expectedOutput: "78.50", isHidden: false },
      { id: "cd6-b7-t2", input: "10", expectedOutput: "314.00", isHidden: false }
    ]
  },
  {
    id: "cd6-bai-8",
    title: "Bài 8. Hàm dem_ky_tu(s, c)",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 6: Hàm (Function) trong Python",
    difficulty: "Dễ",
    tags: ["def", "Chuỗi", "Đếm ký tự"],
    points: 25,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 6: Hàm (Function)",
    problemStatement: `Viết hàm ` + "`dem_ky_tu(s, c)`" + ` nhận vào một chuỗi ` + "`s`" + ` và một ký tự ` + "`c`" + `, trả về số lần xuất hiện của ` + "`c`" + ` trong chuỗi ` + "`s`" + ` (phân biệt hoa thường).
Nhập s ở dòng 1 và c ở dòng 2, in số lần xuất hiện.`,
    inputFormat: "Gồm 2 dòng:\n- Dòng 1: Chuỗi s\n- Dòng 2: Ký tự c",
    outputFormat: "Một số nguyên là số lần xuất hiện của c trong s.",
    constraints: "Độ dài chuỗi s <= 1000",
    sampleCases: [
      {
        input: "lap trinh python\nn",
        output: "2",
        explanation: "Ký tự 'n' xuất hiện 2 lần trong 'lap trinh python'."
      }
    ],
    starterCode: `def dem_ky_tu(s, c):
    count = 0
    for char in s:
        if char == c:
            count += 1
    return count

s = input()
c = input().strip()
print(dem_ky_tu(s, c))
`,
    hints: [
      "Duyệt qua từng ký tự char trong s, nếu char == c thì tăng đếm hoặc dùng s.count(c)."
    ],
    solutionExplanation: `Duyệt chuỗi hoặc sử dụng s.count(c).`,
    testCases: [
      { id: "cd6-b8-t1", input: "lap trinh python\nn", expectedOutput: "2", isHidden: false },
      { id: "cd6-b8-t2", input: "hello world\nl", expectedOutput: "3", isHidden: false }
    ]
  },
  {
    id: "cd6-bai-9",
    title: "Bài 9. Hàm dao_nguoc_chuoi(s)",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 6: Hàm (Function) trong Python",
    difficulty: "Dễ",
    tags: ["def", "Slicing", "Đảo chuỗi"],
    points: 20,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 6: Hàm (Function)",
    problemStatement: `Viết hàm ` + "`dao_nguoc_chuoi(s)`" + ` nhận vào một chuỗi s và trả về chuỗi đảo ngược của s (sử dụng cắt chuỗi ` + "`[::-1]`" + ` hoặc vòng lặp).
Nhập chuỗi s từ bàn phím, gọi hàm và in chuỗi đảo ngược.`,
    inputFormat: "Một dòng chứa chuỗi s.",
    outputFormat: "Chuỗi s sau khi đảo ngược.",
    constraints: "Độ dài s <= 1000",
    sampleCases: [
      {
        input: "python",
        output: "nohtyp",
        explanation: "Đảo ngược chuỗi 'python' thành 'nohtyp'."
      }
    ],
    starterCode: `def dao_nguoc_chuoi(s):
    return s[::-1]

s = input()
print(dao_nguoc_chuoi(s))
`,
    hints: [
      "Cú pháp slice `s[::-1]` giúp đảo ngược chuỗi cực nhanh trong Python."
    ],
    solutionExplanation: `Slicing s[::-1] tạo chuỗi đảo ngược với bước nhảy âm.`,
    testCases: [
      { id: "cd6-b9-t1", input: "python", expectedOutput: "nohtyp", isHidden: false },
      { id: "cd6-b9-t2", input: "12345", expectedOutput: "54321", isHidden: false }
    ]
  },
  {
    id: "cd6-bai-10",
    title: "Bài 10. Hàm tinh_tong_day_so(*args)",
    level: "secondary",
    gradeGroup: "THCS (Khối 6-9)",
    topic: "Chủ đề 6: Hàm (Function) trong Python",
    difficulty: "Trung bình",
    tags: ["*args", "Đối số tùy ý", "def"],
    points: 30,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 6: Hàm (Function)",
    problemStatement: `Viết hàm ` + "`tinh_tong_day_so(*args)`" + ` nhận vào số lượng đối số tùy ý ` + "(`*args`)" + ` và trả về tổng của tất cả các đối số.
Nhập một dãy số nguyên cách nhau bởi dấu cách trên 1 dòng, truyền dãy số vào hàm và in tổng.`,
    inputFormat: "Một dòng chứa các số nguyên cách nhau bởi dấu cách.",
    outputFormat: "Một số nguyên là tổng dãy số.",
    constraints: "Số lượng số từ 1 đến 1000",
    sampleCases: [
      {
        input: "4 8 15 16 23 42",
        output: "108",
        explanation: "Tổng = 4+8+15+16+23+42 = 108."
      }
    ],
    starterCode: `def tinh_tong_day_so(*args):
    return sum(args)

nums = list(map(int, input().split()))
print(tinh_tong_day_so(*nums))
`,
    hints: [
      "Tham số `*args` đóng gói các đối số truyền vào thành một tuple. Dùng sum(args) để tính tổng."
    ],
    solutionExplanation: `Sử dụng cú pháp *args để nhận danh sách tham số có độ dài biến thiên.`,
    testCases: [
      { id: "cd6-b10-t1", input: "4 8 15 16 23 42", expectedOutput: "108", isHidden: false },
      { id: "cd6-b10-t2", input: "10 20", expectedOutput: "30", isHidden: false }
    ]
  },
  {
    id: "cd6-bai-11",
    title: "Bài 11. Hàm ucln(a, b) Euclid Đệ Quy",
    level: "secondary",
    gradeGroup: "THCS (Khối 6-9)",
    topic: "Chủ đề 6: Hàm (Function) trong Python",
    difficulty: "Trung bình",
    tags: ["ucln", "Đệ quy", "Euclid"],
    points: 30,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 6: Hàm (Function)",
    problemStatement: `Viết hàm ` + "`ucln(a, b)`" + ` tìm ước chung lớn nhất của 2 số nguyên dương a và b theo giải thuật Euclid (dùng đệ quy hoặc lặp).
Nhập 2 số nguyên dương a, b (trên 2 dòng), in ra ucln(a, b).`,
    inputFormat: "Gồm 2 dòng chứa 2 số nguyên dương a và b.",
    outputFormat: "Một số nguyên duy nhất là ƯCLN.",
    constraints: "1 <= a, b <= 10^9",
    sampleCases: [
      {
        input: "48\n18",
        output: "6",
        explanation: "ƯCLN(48, 18) = 6."
      }
    ],
    starterCode: `def ucln(a, b):
    if b == 0:
        return a
    return ucln(b, a % b)

a = int(input())
b = int(input())
print(ucln(a, b))
`,
    hints: [
      "Công thức đệ quy: ucln(a, b) = a nếu b == 0, ngược lại ucln(b, a % b)."
    ],
    solutionExplanation: `Hàm đệ quy Euclid: nếu b == 0 trả về a, ngược lại gọi ucln(b, a % b).`,
    testCases: [
      { id: "cd6-b1-t1", input: "48\n18", expectedOutput: "6", isHidden: false },
      { id: "cd6-b1-t2", input: "100\n75", expectedOutput: "25", isHidden: false }
    ]
  },
  {
    id: "cd6-bai-12",
    title: "Bài 12. Hàm fibonacci(n) Tìm Số Fibonacci Thứ n",
    level: "secondary",
    gradeGroup: "THCS (Khối 6-9)",
    topic: "Chủ đề 6: Hàm (Function) trong Python",
    difficulty: "Trung bình",
    tags: ["Fibonacci", "def", "Quy hoạch động / Vòng lặp"],
    points: 35,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 6: Hàm (Function)",
    problemStatement: `Dãy Fibonacci định nghĩa: F(0) = 0, F(1) = 1, F(n) = F(n-1) + F(n-2) với n >= 2.
(Ví dụ: F(0)=0, F(1)=1, F(2)=1, F(3)=2, F(4)=3, F(5)=5, F(6)=8, F(7)=13, ...).
Viết hàm ` + "`fibonacci(n)`" + ` nhận vào số nguyên n (0 <= n <= 40) và trả về số Fibonacci thứ n.
Nhập n từ bàn phím, in ra kết quả.`,
    inputFormat: "Một số nguyên n (0 <= n <= 40).",
    outputFormat: "Số nguyên là số Fibonacci thứ n.",
    constraints: "0 <= n <= 40",
    sampleCases: [
      {
        input: "7",
        output: "13",
        explanation: "F(7) = 13."
      },
      {
        input: "0",
        output: "0",
        explanation: "F(0) = 0."
      },
      {
        input: "10",
        output: "55",
        explanation: "F(10) = 55."
      }
    ],
    starterCode: `def fibonacci(n):
    if n <= 0:
        return 0
    if n == 1:
        return 1
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b

n = int(input())
print(fibonacci(n))
`,
    hints: [
      "Dùng vòng lặp với 2 biến a=0, b=1 để tính Fibonacci tối ưu O(n) tránh quá tải thời gian."
    ],
    solutionExplanation: `Tính Fibonacci tuần tự bằng 2 biến lặp giúp đạt tốc độ O(n).`,
    testCases: [
      { id: "cd6-b12-t1", input: "7", expectedOutput: "13", isHidden: false },
      { id: "cd6-b12-t2", input: "0", expectedOutput: "0", isHidden: false },
      { id: "cd6-b12-t3", input: "10", expectedOutput: "55", isHidden: false },
      { id: "cd6-b12-t4", input: "30", expectedOutput: "832040", isHidden: true }
    ]
  }
];
