import { AlgorithmProblem } from "../../types";

export const TOPIC_10_PROBLEMS: AlgorithmProblem[] = [
  {
    id: "cd10-bai-1",
    title: "Bài 1. Dãy Số Cách Đều (Tiểu học - Tin học trẻ)",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 10: Thuật toán cơ bản (Tiểu học & THCS)",
    difficulty: "Dễ",
    tags: ["Dãy số quy luật", "Cấp số cộng", "Toán tư duy"],
    points: 30,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 10: Thuật toán cơ bản",
    problemStatement: `Cho dãy số cách đều có số hạng đầu u1 = 2, khoảng cách d = 3: (2, 5, 8, 11, 14, 17, ...).
Viết chương trình nhập vào số nguyên dương n (1 <= n <= 10^6).
Tính và in ra trên 2 dòng:
- Dòng 1: Số hạng thứ n của dãy: un = u1 + (n - 1) * d
- Dòng 2: Tổng của n số hạng đầu tiên: Sn = n * (u1 + un) // 2`,
    inputFormat: "Một số nguyên dương n.",
    outputFormat: "Gồm 2 dòng:\n- Dòng 1: Số hạng thứ n\n- Dòng 2: Tổng n số hạng đầu tiên",
    constraints: "1 <= n <= 10^6",
    sampleCases: [
      {
        input: "5",
        output: "14\n40",
        explanation: "Dãy 5 số: 2, 5, 8, 11, 14. Số thứ 5 là 14; Tổng = 2+5+8+11+14 = 40."
      },
      {
        input: "1",
        output: "2\n2",
        explanation: "n = 1 thì số là 2, tổng là 2."
      }
    ],
    starterCode: `n = int(input())
u1 = 2
d = 3

un = u1 + (n - 1) * d
sn = n * (u1 + un) // 2

print(un)
print(sn)
`,
    hints: [
      "Công thức số hạng tổng quát: un = 2 + (n - 1) * 3.",
      "Công thức tổng n số hạng cấp số cộng: sn = n * (2 + un) // 2."
    ],
    solutionExplanation: `Sử dụng công thức cấp số cộng để đạt độ phức tạp O(1).`,
    testCases: [
      { id: "cd10-b1-t1", input: "5", expectedOutput: "14\n40", isHidden: false },
      { id: "cd10-b1-t2", input: "1", expectedOutput: "2\n2", isHidden: false },
      { id: "cd10-b1-t3", input: "100", expectedOutput: "299\n15050", isHidden: true }
    ]
  },
  {
    id: "cd10-bai-2",
    title: "Bài 2. Tính Tổng Các Chữ Số Của Số Nguyên Dương n",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 10: Thuật toán cơ bản (Tiểu học & THCS)",
    difficulty: "Dễ",
    tags: ["Chữ số", "Chia lấy dư", "Toán tư duy"],
    points: 25,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 10: Thuật toán cơ bản",
    problemStatement: `Viết chương trình nhập vào một số nguyên dương n từ bàn phím.
Tính và in ra tổng của tất cả các chữ số của n.
Ví dụ: n = 12345 thì tổng = 1 + 2 + 3 + 4 + 5 = 15.`,
    inputFormat: "Một số nguyên dương n (1 <= n <= 10^18).",
    outputFormat: "Một số nguyên duy nhất là tổng các chữ số.",
    constraints: "1 <= n <= 10^18",
    sampleCases: [
      {
        input: "12345",
        output: "15",
        explanation: "1 + 2 + 3 + 4 + 5 = 15."
      },
      {
        input: "9009",
        output: "18",
        explanation: "9 + 0 + 0 + 9 = 18."
      }
    ],
    starterCode: `s = input().strip()
tong = sum(int(ch) for ch in s)
print(tong)
`,
    hints: [
      "Có thể duyệt từng ký tự `ch` trong chuỗi số và ép kiểu `int(ch)` để tính tổng."
    ],
    solutionExplanation: `Tính tổng các chữ số bằng cách duyệt chuỗi hoặc dùng phép toán % 10 và // 10.`,
    testCases: [
      { id: "cd10-b2-t1", input: "12345", expectedOutput: "15", isHidden: false },
      { id: "cd10-b2-t2", input: "9009", expectedOutput: "18", isHidden: false },
      { id: "cd10-b2-t3", input: "7", expectedOutput: "7", isHidden: true }
    ]
  },
  {
    id: "cd10-bai-3",
    title: "Bài 3. Kiểm Tra Số Hoàn Hảo (Perfect Number)",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 10: Thuật toán cơ bản (Tiểu học & THCS)",
    difficulty: "Trung bình",
    tags: ["Số hoàn hảo", "Ước số", "Toán học"],
    points: 30,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 10: Thuật toán cơ bản",
    problemStatement: `Số hoàn hảo (Perfect Number) là số nguyên dương có tổng tất cả các ước số thực sự (các ước nhỏ hơn chính nó) bằng chính nó.
Ví dụ: 6 có các ước thực sự là 1, 2, 3 và 1 + 2 + 3 = 6 -> 6 là số hoàn hảo.
Viết chương trình nhập vào một số nguyên dương n (1 <= n <= 10^6).
In ra "YES" nếu n là số hoàn hảo, ngược lại in "NO".`,
    inputFormat: "Một số nguyên dương n.",
    outputFormat: "In ra 'YES' hoặc 'NO'.",
    constraints: "1 <= n <= 10^6",
    sampleCases: [
      {
        input: "6",
        output: "YES",
        explanation: "1 + 2 + 3 = 6."
      },
      {
        input: "28",
        output: "YES",
        explanation: "1 + 2 + 4 + 7 + 14 = 28."
      },
      {
        input: "12",
        output: "NO",
        explanation: "1 + 2 + 3 + 4 + 6 = 16 != 12."
      }
    ],
    starterCode: `n = int(input())

if n <= 1:
    print("NO")
else:
    tong_uoc = 1
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            tong_uoc += i
            if i * i != n:
                tong_uoc += n // i
    if tong_uoc == n:
        print("YES")
    else:
        print("NO")
`,
    hints: [
      "Tìm ước từ 1 đến sqrt(n) để tối ưu thời gian chạy O(sqrt(n))."
    ],
    solutionExplanation: `Tính tổng các ước số thực sự trong phạm vi sqrt(n) và so sánh với n.`,
    testCases: [
      { id: "cd10-b3-t1", input: "6", expectedOutput: "YES", isHidden: false },
      { id: "cd10-b3-t2", input: "28", expectedOutput: "YES", isHidden: false },
      { id: "cd10-b3-t3", input: "12", expectedOutput: "NO", isHidden: false },
      { id: "cd10-b3-t4", input: "496", expectedOutput: "YES", isHidden: true }
    ]
  },
  {
    id: "cd10-bai-4",
    title: "Bài 4. Bài Toán Vừa Gà Vừa Chó (Hệ Phương Trình)",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 10: Thuật toán cơ bản (Tiểu học & THCS)",
    difficulty: "Dễ",
    tags: ["Toán cổ dân gian", "Hệ phương trình", "Giả thiết tạm"],
    points: 30,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 10: Thuật toán cơ bản",
    problemStatement: `Bài toán cổ dân gian: "Vừa gà vừa chó, bó lại cho tròn, M con, N chân chẵn".
(Biết mỗi con gà có 2 chân, mỗi con chó có 4 chân).
Viết chương trình nhập vào:
- Dòng 1: Tổng số con ` + "`M`" + ` (gồm cả gà và chó)
- Dòng 2: Tổng số chân ` + "`N`" + `

Tính và in ra số gà và số chó trên cùng một dòng, cách nhau bởi một dấu cách (đảm bảo dữ liệu đầu vào luôn có nghiệm hợp lệ).`,
    inputFormat: "Gồm 2 dòng: Tổng số con M và Tổng số chân N.",
    outputFormat: "Hai số nguyên cách nhau dấu cách: <số_gà> <số_chó>",
    constraints: "1 <= M <= 1000, 2 <= N <= 4000",
    sampleCases: [
      {
        input: "36\n100",
        output: "22 14",
        explanation: "22 con gà (44 chân) + 14 con chó (56 chân) = 36 con và 100 chân."
      },
      {
        input: "10\n28",
        output: "6 4",
        explanation: "6 gà (12 chân) + 4 chó (16 chân) = 10 con và 28 chân."
      }
    ],
    starterCode: `m = int(input())
n = int(input())

# Giả sử tất cả m con đều là gà -> tổng chân là m * 2
# Số chân dôi ra chính là do mỗi con chó thêm 2 chân
cho = (n - 2 * m) // 2
ga = m - cho

print(ga, cho)
`,
    hints: [
      "Công thức giả thiết tạm: `cho = (N - 2 * M) // 2`, `ga = M - cho`."
    ],
    solutionExplanation: `Phương pháp giả thiết tạm trong toán tiểu học: chó = (chân - 2*con)/2.`,
    testCases: [
      { id: "cd10-b4-t1", input: "36\n100", expectedOutput: "22 14", isHidden: false },
      { id: "cd10-b4-t2", input: "10\n28", expectedOutput: "6 4", isHidden: false },
      { id: "cd10-b4-t3", input: "50\n160", expectedOutput: "20 30", isHidden: true }
    ]
  },
  {
    id: "cd10-bai-5",
    title: "Bài 5. Liệt Kê Dãy Fibonacci & Kiểm Tra Thuộc Dãy",
    level: "secondary",
    gradeGroup: "THCS (Khối 6-9)",
    topic: "Chủ đề 10: Thuật toán cơ bản (Tiểu học & THCS)",
    difficulty: "Trung bình",
    tags: ["Fibonacci", "Kiểm tra thuộc dãy", "Toán tin"],
    points: 35,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 10: Thuật toán cơ bản",
    problemStatement: `Dãy số Fibonacci: F(1)=1, F(2)=1, F(3)=2, F(4)=3, F(5)=5, F(6)=8, ...
Viết chương trình nhập:
- Dòng 1: Số nguyên dương n (1 <= n <= 30) - in ra n số Fibonacci đầu tiên
- Dòng 2: Số nguyên dương x (1 <= x <= 10^9) - kiểm tra x có thuộc dãy Fibonacci hay không

In ra:
- Dòng 1: n số Fibonacci đầu tiên cách nhau bởi dấu cách
- Dòng 2: "YES" nếu x là một số Fibonacci, ngược lại "NO"`,
    inputFormat: "Gồm 2 dòng: n và x.",
    outputFormat: "Gồm 2 dòng:\n- Dòng 1: n số Fibonacci\n- Dòng 2: 'YES' hoặc 'NO'",
    constraints: "1 <= n <= 30, 1 <= x <= 10^9",
    sampleCases: [
      {
        input: "7\n13",
        output: "1 1 2 3 5 8 13\nYES",
        explanation: "7 số đầu: 1 1 2 3 5 8 13. 13 có trong dãy Fibonacci."
      },
      {
        input: "5\n4",
        output: "1 1 2 3 5\nNO",
        explanation: "4 không phải số Fibonacci."
      }
    ],
    starterCode: `n = int(input())
x = int(input())

fibs = []
a, b = 1, 1
for i in range(n):
    fibs.append(a)
    a, b = b, a + b

print(*fibs)

# Kiểm tra x có thuộc dãy Fibonacci
f1, f2 = 1, 1
is_fib = False
while f1 <= x:
    if f1 == x:
        is_fib = True
        break
    f1, f2 = f2, f1 + f2

print("YES" if is_fib else "NO")
`,
    hints: [
      "Sinh lần lượt các số Fibonacci và lưu vào mảng rồi in.",
      "Sinh Fibonacci cho đến khi >= x để kiểm tra sự tồn tại của x."
    ],
    solutionExplanation: `Sử dụng quy luật lặp f(n) = f(n-1) + f(n-2) để sinh và tra cứu.`,
    testCases: [
      { id: "cd10-b5-t1", input: "7\n13", expectedOutput: "1 1 2 3 5 8 13\nYES", isHidden: false },
      { id: "cd10-b5-t2", input: "5\n4", expectedOutput: "1 1 2 3 5\nNO", isHidden: false },
      { id: "cd10-b5-t3", input: "1\n1", expectedOutput: "1\nYES", isHidden: true }
    ]
  },
  {
    id: "cd10-bai-6",
    title: "Bài 6. Sàng Số Nguyên Tố Eratosthenes (N <= 10^5)",
    level: "secondary",
    gradeGroup: "THCS (Khối 6-9)",
    topic: "Chủ đề 10: Thuật toán cơ bản (Tiểu học & THCS)",
    difficulty: "Khó",
    tags: ["Sàng Eratosthenes", "Số nguyên tố", "Thuật toán kinh điển"],
    points: 40,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 10: Thuật toán cơ bản",
    problemStatement: `Thuật toán Sàng Eratosthenes giúp tìm tất cả các số nguyên tố từ 2 đến N trong thời gian cực nhanh O(N log log N).
Viết chương trình nhập vào một số nguyên dương N (2 <= N <= 100.000).
Sử dụng thuật toán sàng Eratosthenes để:
- Dòng 1: In ra số lượng các số nguyên tố nhỏ hơn hoặc bằng N
- Dòng 2: In ra tất cả các số nguyên tố đó (cách nhau bởi dấu cách). Nếu N > 100 thì chỉ in 10 số nguyên tố đầu tiên.`,
    inputFormat: "Một số nguyên dương N (2 <= N <= 100.000).",
    outputFormat: "Gồm 2 dòng: Số lượng và danh sách các số nguyên tố.",
    constraints: "2 <= N <= 100.000",
    sampleCases: [
      {
        input: "20",
        output: "8\n2 3 5 7 11 13 17 19",
        explanation: "Có 8 số nguyên tố <= 20."
      },
      {
        input: "120",
        output: "30\n2 3 5 7 11 13 17 19 23 29",
        explanation: "Có 30 số nguyên tố, in 10 số đầu tiên."
      }
    ],
    starterCode: `N = int(input())

is_prime = [True] * (N + 1)
is_prime[0] = is_prime[1] = False

for i in range(2, int(N**0.5) + 1):
    if is_prime[i]:
        for j in range(i * i, N + 1, i):
            is_prime[j] = False

primes = [i for i in range(2, N + 1) if is_prime[i]]

print(len(primes))
if N <= 100:
    print(*primes)
else:
    print(*primes[:10])
`,
    hints: [
      "Khởi tạo mảng boolean `is_prime = [True] * (N + 1)`, duyệt i từ 2 đến sqrt(N) và đánh dấu các bội số `i*i, i*i+i, ...` thành False."
    ],
    solutionExplanation: `Sàng Eratosthenes là thuật toán chuẩn mực để tìm số nguyên tố quy mô lớn trong thi học sinh giỏi.`,
    testCases: [
      { id: "cd10-b6-t1", input: "20", expectedOutput: "8\n2 3 5 7 11 13 17 19", isHidden: false },
      { id: "cd10-b6-t2", input: "120", expectedOutput: "30\n2 3 5 7 11 13 17 19 23 29", isHidden: false },
      { id: "cd10-b6-t3", input: "10", expectedOutput: "4\n2 3 5 7", isHidden: true }
    ]
  },
  {
    id: "cd10-bai-7",
    title: "Bài 7. ƯCLN và BCNN Của Hai Số Nguyên Dương",
    level: "secondary",
    gradeGroup: "THCS (Khối 6-9)",
    topic: "Chủ đề 10: Thuật toán cơ bản (Tiểu học & THCS)",
    difficulty: "Trung bình",
    tags: ["ƯCLN", "BCNN", "Thuật toán Euclid"],
    points: 30,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 10: Thuật toán cơ bản",
    problemStatement: `Viết chương trình nhập vào 2 số nguyên dương a và b (trên 2 dòng).
Tính và in ra Ước chung lớn nhất (ƯCLN) và Bội chung nhỏ nhất (BCNN) của a và b trên 2 dòng:
- Dòng 1: ƯCLN(a, b)
- Dòng 2: BCNN(a, b) = (a * b) // ƯCLN(a, b)`,
    inputFormat: "Gồm 2 dòng chứa 2 số nguyên dương a và b.",
    outputFormat: "Gồm 2 dòng: Dòng 1 là ƯCLN, Dòng 2 là BCNN.",
    constraints: "1 <= a, b <= 10^9",
    sampleCases: [
      {
        input: "12\n18",
        output: "6\n36",
        explanation: "ƯCLN(12, 18) = 6; BCNN(12, 18) = (12*18)/6 = 36."
      },
      {
        input: "7\n5",
        output: "1\n35",
        explanation: "ƯCLN = 1, BCNN = 35."
      }
    ],
    starterCode: `import math

a = int(input())
b = int(input())

ucln = math.gcd(a, b)
bcnn = (a * b) // ucln

print(ucln)
print(bcnn)
`,
    hints: [
      "Công thức liên hệ: BCNN(a, b) = (a * b) // math.gcd(a, b)."
    ],
    solutionExplanation: `Sử dụng giải thuật Euclid hoặc math.gcd và công thức tính BCNN.`,
    testCases: [
      { id: "cd10-b7-t1", input: "12\n18", expectedOutput: "6\n36", isHidden: false },
      { id: "cd10-b7-t2", input: "7\n5", expectedOutput: "1\n35", isHidden: false },
      { id: "cd10-b7-t3", input: "20\n30", expectedOutput: "10\n60", isHidden: true }
    ]
  },
  {
    id: "cd10-bai-8",
    title: "Bài 8. Two Sum - Tổng Cặp Số Bằng k",
    level: "secondary",
    gradeGroup: "THCS (Khối 6-9)",
    topic: "Chủ đề 10: Thuật toán cơ bản (Tiểu học & THCS)",
    difficulty: "Trung bình",
    tags: ["Two Sum", "Hash Map", "Tìm kiếm cặp"],
    points: 35,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 10: Thuật toán cơ bản",
    problemStatement: `Cho một dãy số nguyên và một số mục tiêu k.
Tìm cặp chỉ số (i, j) với i < j sao cho ` + "`nums[i] + nums[j] == k`" + `.
Nếu có nhiều cặp thỏa mãn, chọn cặp có chỉ số i nhỏ nhất (rồi đến j nhỏ nhất).
Nếu không tìm thấy cặp nào, in "-1 -1".`,
    inputFormat: "Gồm 2 dòng:\n- Dòng 1: Dãy số nguyên cách nhau bởi dấu cách\n- Dòng 2: Số nguyên k",
    outputFormat: "Hai số nguyên i và j (0-based index) hoặc '-1 -1'.",
    constraints: "Số phần tử n <= 10.000",
    sampleCases: [
      {
        input: "2 7 11 15\n9",
        output: "0 1",
        explanation: "nums[0] + nums[1] = 2 + 7 = 9."
      },
      {
        input: "3 2 4\n6",
        output: "1 2",
        explanation: "nums[1] + nums[2] = 2 + 4 = 6."
      },
      {
        input: "1 2 3\n10",
        output: "-1 -1",
        explanation: "Không có cặp nào tổng bằng 10."
      }
    ],
    starterCode: `nums = list(map(int, input().split()))
k = int(input())

found = False
for i in range(len(nums)):
    for j in range(i + 1, len(nums)):
        if nums[i] + nums[j] == k:
            print(i, j)
            found = True
            break
    if found:
        break

if not found:
    print("-1 -1")
`,
    hints: [
      "Duyệt 2 vòng lặp lồng nhau hoặc dùng Hash Map / Dictionary để lưu trữ vị trí của `k - nums[i]`."
    ],
    solutionExplanation: `Thuật toán Two Sum kinh điển kiểm tra tổng cặp số.`,
    testCases: [
      { id: "cd10-b8-t1", input: "2 7 11 15\n9", expectedOutput: "0 1", isHidden: false },
      { id: "cd10-b8-t2", input: "3 2 4\n6", expectedOutput: "1 2", isHidden: false },
      { id: "cd10-b8-t3", input: "1 2 3\n10", expectedOutput: "-1 -1", isHidden: false }
    ]
  },
  {
    id: "cd10-bai-9",
    title: "Bài 9. Thuật Toán Tìm Kiếm Nhị Phân (Binary Search)",
    level: "secondary",
    gradeGroup: "THCS (Khối 6-9)",
    topic: "Chủ đề 10: Thuật toán cơ bản (Tiểu học & THCS)",
    difficulty: "Trung bình",
    tags: ["Binary Search", "Tìm kiếm nhị phân", "O(log n)"],
    points: 35,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 10: Thuật toán cơ bản",
    problemStatement: `Cho một dãy số nguyên ĐÃ ĐƯỢC SẮP XẾP TĂNG DẦN và một số x cần tìm.
Sử dụng thuật toán Tìm kiếm nhị phân (Binary Search) để tìm vị trí (chỉ số 0-based index) của x trong dãy.
Nếu tìm thấy, in ra chỉ số đó. Nếu không tìm thấy, in "-1".`,
    inputFormat: "Gồm 2 dòng:\n- Dòng 1: Dãy số nguyên đã sắp xếp tăng dần cách nhau dấu cách\n- Dòng 2: Số nguyên x",
    outputFormat: "Chỉ số tìm thấy của x hoặc -1.",
    constraints: "Dãy có từ 1 đến 100.000 phần tử",
    sampleCases: [
      {
        input: "2 5 8 12 16 23 38 56 72 91\n23",
        output: "5",
        explanation: "Số 23 nằm ở vị trí index 5."
      },
      {
        input: "1 3 5 7 9\n6",
        output: "-1",
        explanation: "Số 6 không có trong dãy."
      }
    ],
    starterCode: `nums = list(map(int, input().split()))
x = int(input())

left = 0
right = len(nums) - 1
ans = -1

while left <= right:
    mid = (left + right) // 2
    if nums[mid] == x:
        ans = mid
        break
    elif nums[mid] < x:
        left = mid + 1
    else:
        right = mid - 1

print(ans)
`,
    hints: [
      "Khởi tạo `left = 0, right = len(nums) - 1`. Khi left <= right, tính `mid = (left + right) // 2` và thu hẹp nửa trái/phải."
    ],
    solutionExplanation: `Thuật toán tìm kiếm nhị phân chia đôi không gian tìm kiếm sau mỗi bước, đạt độ phức tạp O(log n).`,
    testCases: [
      { id: "cd10-b9-t1", input: "2 5 8 12 16 23 38 56 72 91\n23", expectedOutput: "5", isHidden: false },
      { id: "cd10-b9-t2", input: "1 3 5 7 9\n6", expectedOutput: "-1", isHidden: false },
      { id: "cd10-b9-t3", input: "10", expectedOutput: "-1", isHidden: true }
    ]
  },
  {
    id: "cd10-bai-10",
    title: "Bài 10. Thuật Toán Sắp Xếp Nổi Bọt (Bubble Sort)",
    level: "secondary",
    gradeGroup: "THCS (Khối 6-9)",
    topic: "Chủ đề 10: Thuật toán cơ bản (Tiểu học & THCS)",
    difficulty: "Trung bình",
    tags: ["Bubble Sort", "Sắp xếp nổi bọt", "Thuật toán sắp xếp"],
    points: 35,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 10: Thuật toán cơ bản",
    problemStatement: `Viết chương trình tự cài đặt thuật toán sắp xếp nổi bọt (Bubble Sort) để sắp xếp dãy số nguyên theo thứ tự tăng dần (không dùng hàm sort() hoặc sorted() có sẵn).
In dãy số đã được sắp xếp cách nhau bởi dấu cách.`,
    inputFormat: "Một dòng chứa dãy số nguyên cách nhau bởi khoảng trắng.",
    outputFormat: "Dãy số sau khi được sắp xếp tăng dần.",
    constraints: "Dãy có từ 1 đến 1000 phần tử",
    sampleCases: [
      {
        input: "64 34 25 12 22 11 90",
        output: "11 12 22 25 34 64 90",
        explanation: "Dãy được sắp xếp tăng dần."
      }
    ],
    starterCode: `nums = list(map(int, input().split()))
n = len(nums)

for i in range(n):
    for j in range(0, n - i - 1):
        if nums[j] > nums[j + 1]:
            nums[j], nums[j + 1] = nums[j + 1], nums[j]

print(*nums)
`,
    hints: [
      "So sánh từng cặp kề nhau: `if nums[j] > nums[j + 1]: hoán đổi`."
    ],
    solutionExplanation: `Bubble sort đưa dần phần tử lớn nhất về cuối mảng sau mỗi lượt duyệt.`,
    testCases: [
      { id: "cd10-b10-t1", input: "64 34 25 12 22 11 90", expectedOutput: "11 12 22 25 34 64 90", isHidden: false },
      { id: "cd10-b10-t2", input: "5 4 3 2 1", expectedOutput: "1 2 3 4 5", isHidden: false },
      { id: "cd10-b10-t3", input: "1", expectedOutput: "1", isHidden: true }
    ]
  },
  {
    id: "cd10-bai-11",
    title: "Bài 11. Kiểm Tra Số Đối Xứng Bằng Phép Toán % và //",
    level: "secondary",
    gradeGroup: "THCS (Khối 6-9)",
    topic: "Chủ đề 10: Thuật toán cơ bản (Tiểu học & THCS)",
    difficulty: "Trung bình",
    tags: ["Số đối xứng", "Toán học", "Không dùng chuỗi"],
    points: 35,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 10: Thuật toán cơ bản",
    problemStatement: `Viết chương trình nhập vào một số nguyên dương n từ bàn phím.
Kiểm tra xem n có phải là số đối xứng hay không (đọc xuôi đọc ngược đều như nhau, ví dụ: 121, 1331, 12321) bằng THUẬT TOÁN SỐ HỌC (chỉ dùng các phép toán chia dư % 10 và chia nguyên // 10 để tạo số đảo ngược, KHÔNG chuyển n thành kiểu chuỗi ` + "`str`" + `).
In ra "YES" nếu n đối xứng, ngược lại in "NO".`,
    inputFormat: "Một số nguyên dương n.",
    outputFormat: "In ra 'YES' hoặc 'NO'.",
    constraints: "1 <= n <= 10^18",
    sampleCases: [
      {
        input: "12321",
        output: "YES",
        explanation: "12321 đảo ngược lại bằng 12321."
      },
      {
        input: "12345",
        output: "NO",
        explanation: "12345 đảo ngược là 54321 != 12345."
      }
    ],
    starterCode: `n = int(input())

temp = n
rev = 0
while temp > 0:
    rev = rev * 10 + temp % 10
    temp //= 10

if rev == n:
    print("YES")
else:
    print("NO")
`,
    hints: [
      "Khởi tạo `rev = 0`. Lặp `while temp > 0: rev = rev * 10 + temp % 10; temp //= 10`."
    ],
    solutionExplanation: `Tạo số đảo ngược hoàn toàn bằng thuật toán toán học với O(log10(n)) thời gian.`,
    testCases: [
      { id: "cd10-b11-t1", input: "12321", expectedOutput: "YES", isHidden: false },
      { id: "cd10-b11-t2", input: "12345", expectedOutput: "NO", isHidden: false },
      { id: "cd10-b11-t3", input: "7", expectedOutput: "YES", isHidden: true },
      { id: "cd10-b11-t4", input: "1000", expectedOutput: "NO", isHidden: true }
    ]
  },
  {
    id: "cd10-bai-12",
    title: "Bài 12. Tìm Số Lớn Thứ Hai Trong Mảng Không Dùng Sắp Xếp",
    level: "secondary",
    gradeGroup: "THCS (Khối 6-9)",
    topic: "Chủ đề 10: Thuật toán cơ bản (Tiểu học & THCS)",
    difficulty: "Trung bình",
    tags: ["Max 2", "Duyệt một lần", "O(n)"],
    points: 35,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 10: Thuật toán cơ bản",
    problemStatement: `Cho một dãy số nguyên gồm n phần tử (n >= 2).
Tìm và in ra giá trị LỚN THỨ HAI KHÁC BIỆT trong mảng (tức giá trị lớn nhất nhưng nhỏ hơn giá trị lớn nhất toàn mảng) bằng cách duyệt qua mảng trong 1 lượt O(n), KHÔNG sử dụng hàm sort() hay sắp xếp toàn bộ mảng.
Nếu trong mảng tất cả các số đều bằng nhau (không tồn tại số lớn thứ hai), in "KHONG TON TAI".`,
    inputFormat: "Một dòng chứa dãy số nguyên cách nhau bởi khoảng trắng.",
    outputFormat: "Số lớn thứ hai hoặc 'KHONG TON TAI'.",
    constraints: "2 <= n <= 10.000, -10^9 <= a[i] <= 10^9",
    sampleCases: [
      {
        input: "12 35 1 10 34 1",
        output: "34",
        explanation: "Số lớn nhất là 35, số lớn thứ hai là 34."
      },
      {
        input: "10 10 10",
        output: "KHONG TON TAI",
        explanation: "Tất cả các số bằng nhau nên không có số lớn thứ 2."
      }
    ],
    starterCode: `nums = list(map(int, input().split()))

first = float('-inf')
second = float('-inf')

for x in nums:
    if x > first:
        second = first
        first = x
    elif x > second and x != first:
        second = x

if second == float('-inf'):
    print("KHONG TON TAI")
else:
    print(second)
`,
    hints: [
      "Duyệt 1 lần: nếu x > first thì second = first, first = x; nếu x > second và x < first thì second = x."
    ],
    solutionExplanation: `Thuật toán tìm số lớn thứ hai trong O(n) thời gian và O(1) bộ nhớ.`,
    testCases: [
      { id: "cd10-b12-t1", input: "12 35 1 10 34 1", expectedOutput: "34", isHidden: false },
      { id: "cd10-b12-t2", input: "10 10 10", expectedOutput: "KHONG TON TAI", isHidden: false },
      { id: "cd10-b12-t3", input: "5 20 15 20", expectedOutput: "15", isHidden: true }
    ]
  }
];
