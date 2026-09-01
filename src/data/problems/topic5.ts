import { AlgorithmProblem } from "../../types";

export const TOPIC_5_PROBLEMS: AlgorithmProblem[] = [
  {
    id: "cd5-bai-1",
    title: "Bài 1. In Các Số Nguyên Từ 1 Đến 20 Bằng Vòng Lặp For",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 5: Vòng lặp For, While, Break & Continue",
    difficulty: "Dễ",
    tags: ["for", "range()", "Vòng lặp"],
    points: 20,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 5: range(), for, while, break, continue",
    problemStatement: `Viết chương trình sử dụng vòng lặp for và hàm range() để in ra các số nguyên từ 1 đến 20 trên cùng một dòng, cách nhau bởi một dấu cách.`,
    inputFormat: "Không có dữ liệu đầu vào.",
    outputFormat: "In ra các số từ 1 đến 20 cách nhau bởi dấu cách trên 1 dòng: 1 2 3 ... 20.",
    constraints: "Không có",
    sampleCases: [
      {
        input: "",
        output: "1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20",
        explanation: "Các số từ 1 đến 20 cách nhau khoảng trắng."
      }
    ],
    starterCode: `for i in range(1, 21):
    print(i, end=" " if i < 20 else "\n")
`,
    hints: [
      "Dùng range(1, 21) để lặp từ 1 đến 20."
    ],
    solutionExplanation: `range(1, 21) sinh dãy số từ 1 đến 20.`,
    testCases: [
      { id: "cd5-b1-t1", input: "", expectedOutput: "1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20", isHidden: false }
    ]
  },
  {
    id: "cd5-bai-2",
    title: "Bài 2. In Các Số Chẵn Từ 2 Đến 100 Bằng range(step=2)",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 5: Vòng lặp For, While, Break & Continue",
    difficulty: "Dễ",
    tags: ["range()", "Số chẵn", "Bước nhảy step"],
    points: 20,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 5: range(), for, while, break, continue",
    problemStatement: `Viết chương trình sử dụng hàm range() với bước nhảy (step) bằng 2 để in ra tất cả các số chẵn từ 2 đến n (với n được nhập từ bàn phím, n là số chẵn). Các số in trên cùng một dòng, cách nhau bởi dấu cách.`,
    inputFormat: "Một số nguyên dương chẵn n (2 <= n <= 100).",
    outputFormat: "Các số chẵn từ 2 đến n cách nhau dấu cách.",
    constraints: "2 <= n <= 100",
    sampleCases: [
      {
        input: "10",
        output: "2 4 6 8 10",
        explanation: "Các số chẵn từ 2 đến 10."
      },
      {
        input: "20",
        output: "2 4 6 8 10 12 14 16 18 20",
        explanation: "Các số chẵn từ 2 đến 20."
      }
    ],
    starterCode: `n = int(input())

for i in range(2, n + 1, 2):
    print(i, end=" " if i < n else "\n")
`,
    hints: [
      "Hàm range(2, n + 1, 2) có bước nhảy là 2 giúp lấy trực tiếp các số chẵn."
    ],
    solutionExplanation: `range(start, stop, step) với start=2, step=2 sinh các số chẵn liên tiếp.`,
    testCases: [
      { id: "cd5-b2-t1", input: "10", expectedOutput: "2 4 6 8 10", isHidden: false },
      { id: "cd5-b2-t2", input: "20", expectedOutput: "2 4 6 8 10 12 14 16 18 20", isHidden: false },
      { id: "cd5-b2-t3", input: "4", expectedOutput: "2 4", isHidden: true }
    ]
  },
  {
    id: "cd5-bai-3",
    title: "Bài 3. Tính Tổng Các Số Từ 1 Đến n Bằng Vòng Lặp For",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 5: Vòng lặp For, While, Break & Continue",
    difficulty: "Dễ",
    tags: ["for", "Tính tổng", "range()"],
    points: 20,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 5: range(), for, while, break, continue",
    problemStatement: `Viết chương trình nhập vào một số nguyên dương n từ bàn phím.
Sử dụng vòng lặp for để tính tổng S = 1 + 2 + 3 + ... + n và in ra kết quả.`,
    inputFormat: "Một số nguyên dương n (1 <= n <= 10.000).",
    outputFormat: "Một số nguyên duy nhất là tổng S.",
    constraints: "1 <= n <= 10.000",
    sampleCases: [
      {
        input: "5",
        output: "15",
        explanation: "1 + 2 + 3 + 4 + 5 = 15."
      },
      {
        input: "10",
        output: "55",
        explanation: "1 + 2 + ... + 10 = 55."
      },
      {
        input: "100",
        output: "5050",
        explanation: "Tổng từ 1 đến 100 là 5050."
      }
    ],
    starterCode: `n = int(input())

s = 0
for i in range(1, n + 1):
    s += i

print(s)
`,
    hints: [
      "Khởi tạo s = 0, duyệt for i in range(1, n + 1) và cộng dồn s += i."
    ],
    solutionExplanation: `Dùng biến tích lũy tổng s và cộng dồn từng giá trị i trong vòng lặp.`,
    testCases: [
      { id: "cd5-b3-t1", input: "5", expectedOutput: "15", isHidden: false },
      { id: "cd5-b3-t2", input: "10", expectedOutput: "55", isHidden: false },
      { id: "cd5-b3-t3", input: "100", expectedOutput: "5050", isHidden: false },
      { id: "cd5-b3-t4", input: "1", expectedOutput: "1", isHidden: true }
    ]
  },
  {
    id: "cd5-bai-4",
    title: "Bài 4. In Bảng Cửu Chương Bằng Vòng Lặp While",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 5: Vòng lặp For, While, Break & Continue",
    difficulty: "Dễ",
    tags: ["while", "Bảng cửu chương", "Vòng lặp"],
    points: 25,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 5: range(), for, while, break, continue",
    problemStatement: `Viết chương trình nhập vào một số nguyên n (1 <= n <= 9).
Sử dụng vòng lặp while để in ra bảng cửu chương của n từ 1 đến 10:
n x 1 = ...
...
n x 10 = ...`,
    inputFormat: "Một số nguyên n.",
    outputFormat: "10 dòng là bảng nhân của n.",
    constraints: "1 <= n <= 9",
    sampleCases: [
      {
        input: "7",
        output: "7 x 1 = 7\n7 x 2 = 14\n7 x 3 = 21\n7 x 4 = 28\n7 x 5 = 35\n7 x 6 = 42\n7 x 7 = 49\n7 x 8 = 56\n7 x 9 = 63\n7 x 10 = 70",
        explanation: "Bảng cửu chương 7."
      }
    ],
    starterCode: `n = int(input())

i = 1
while i <= 10:
    print(f"{n} x {i} = {n * i}")
    i += 1
`,
    hints: [
      "Khởi tạo biến đếm i = 1, điều kiện lặp while i <= 10, trong thân lặp nhớ tăng i += 1."
    ],
    solutionExplanation: `Vòng lặp while kiểm tra điều kiện i <= 10 và cập nhật i sau mỗi bước.`,
    testCases: [
      { id: "cd5-b4-t1", input: "7", expectedOutput: "7 x 1 = 7\n7 x 2 = 14\n7 x 3 = 21\n7 x 4 = 28\n7 x 5 = 35\n7 x 6 = 42\n7 x 7 = 49\n7 x 8 = 56\n7 x 9 = 63\n7 x 10 = 70", isHidden: false },
      { id: "cd5-b4-t2", input: "3", expectedOutput: "3 x 1 = 3\n3 x 2 = 6\n3 x 3 = 9\n3 x 4 = 12\n3 x 5 = 15\n3 x 6 = 18\n3 x 7 = 21\n3 x 8 = 24\n3 x 9 = 27\n3 x 10 = 30", isHidden: false }
    ]
  },
  {
    id: "cd5-bai-5",
    title: "Bài 5. Đếm Số Lượng Số Nguyên Tố Nhỏ Hơn n Bằng 2 Vòng Lặp",
    level: "secondary",
    gradeGroup: "THCS (Khối 6-9)",
    topic: "Chủ đề 5: Vòng lặp For, While, Break & Continue",
    difficulty: "Trung bình",
    tags: ["Số nguyên tố", "Nested for", "Vòng lặp lồng nhau"],
    points: 35,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 5: range(), for, while, break, continue",
    problemStatement: `Viết chương trình nhập vào một số nguyên dương n (n <= 200).
Sử dụng hai vòng lặp for lồng nhau để kiểm tra và đếm xem có bao nhiêu số nguyên tố nhỏ hơn n. In ra số lượng đếm được.`,
    inputFormat: "Một số nguyên dương n (2 <= n <= 200).",
    outputFormat: "Một số nguyên duy nhất là số lượng số nguyên tố nhỏ hơn n.",
    constraints: "2 <= n <= 200",
    sampleCases: [
      {
        input: "10",
        output: "4",
        explanation: "Các số nguyên tố nhỏ hơn 10 là: 2, 3, 5, 7 (có 4 số)."
      },
      {
        input: "100",
        output: "25",
        explanation: "Có 25 số nguyên tố nhỏ hơn 100."
      }
    ],
    starterCode: `n = int(input())

count = 0
for num in range(2, n):
    is_prime = True
    for i in range(2, int(num**0.5) + 1):
        if num % i == 0:
            is_prime = False
            break
    if is_prime:
        count += 1

print(count)
`,
    hints: [
      "Vòng lặp ngoài duyệt các số num từ 2 đến n - 1.",
      "Vòng lặp trong kiểm tra xem num có ước nào từ 2 đến căn bậc hai của num hay không."
    ],
    solutionExplanation: `Duyệt từng số và dùng cờ is_prime kết hợp vòng lặp kiểm tra ước số.`,
    testCases: [
      { id: "cd5-b5-t1", input: "10", expectedOutput: "4", isHidden: false },
      { id: "cd5-b5-t2", input: "100", expectedOutput: "25", isHidden: false },
      { id: "cd5-b5-t3", input: "50", expectedOutput: "15", isHidden: true },
      { id: "cd5-b5-t4", input: "2", expectedOutput: "0", isHidden: true }
    ]
  },
  {
    id: "cd5-bai-6",
    title: "Bài 6. Dừng Vòng Lặp Bằng Lệnh Break Khi Gặp Bội Của 7",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 5: Vòng lặp For, While, Break & Continue",
    difficulty: "Dễ",
    tags: ["break", "Vòng lặp", "Chia hết cho 7"],
    points: 20,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 5: range(), for, while, break, continue",
    problemStatement: `Viết chương trình nhập vào một số nguyên dương start (start >= 1).
Duyệt các số từ start trở đi, dùng lệnh ` + "`break`" + ` để dừng vòng lặp ngay khi tìm thấy số đầu tiên chia hết cho 7 và in số đó ra màn hình.`,
    inputFormat: "Một số nguyên dương start (1 <= start <= 1000).",
    outputFormat: "Số nguyên đầu tiên >= start chia hết cho 7.",
    constraints: "1 <= start <= 1000",
    sampleCases: [
      {
        input: "1",
        output: "7",
        explanation: "Số đầu tiên từ 1 chia hết cho 7 là 7."
      },
      {
        input: "15",
        output: "21",
        explanation: "Số đầu tiên từ 15 chia hết cho 7 là 21."
      },
      {
        input: "14",
        output: "14",
        explanation: "14 chia hết cho 7 nên dừng ngay tại 14."
      }
    ],
    starterCode: `start = int(input())

num = start
while True:
    if num % 7 == 0:
        print(num)
        break
    num += 1
`,
    hints: [
      "Duyệt num bắt đầu từ start, nếu num % 7 == 0 thì in num và gọi break."
    ],
    solutionExplanation: `Lệnh break kết thúc vòng lặp ngay lập tức khi điều kiện chia hết được thỏa mãn.`,
    testCases: [
      { id: "cd5-b6-t1", input: "1", expectedOutput: "7", isHidden: false },
      { id: "cd5-b6-t2", input: "15", expectedOutput: "21", isHidden: false },
      { id: "cd5-b6-t3", input: "14", expectedOutput: "14", isHidden: false },
      { id: "cd5-b6-t4", input: "50", expectedOutput: "56", isHidden: true }
    ]
  },
  {
    id: "cd5-bai-7",
    title: "Bài 7. Bỏ Qua Bội Số Của 3 Bằng Lệnh Continue",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 5: Vòng lặp For, While, Break & Continue",
    difficulty: "Dễ",
    tags: ["continue", "for", "Bỏ qua phần tử"],
    points: 25,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 5: range(), for, while, break, continue",
    problemStatement: `Viết chương trình nhập vào số nguyên dương n (1 <= n <= 50).
Duyệt các số từ 1 đến n, sử dụng lệnh ` + "`continue`" + ` để bỏ qua những số chia hết cho 3, in các số còn lại trên cùng một dòng, cách nhau bởi dấu cách.`,
    inputFormat: "Một số nguyên dương n (1 <= n <= 50).",
    outputFormat: "Dãy số từ 1 đến n không chia hết cho 3, cách nhau bởi dấu cách.",
    constraints: "1 <= n <= 50",
    sampleCases: [
      {
        input: "10",
        output: "1 2 4 5 7 8 10",
        explanation: "Các số 3, 6, 9 bị bỏ qua do chia hết cho 3."
      },
      {
        input: "5",
        output: "1 2 4 5",
        explanation: "Bỏ qua số 3."
      }
    ],
    starterCode: `n = int(input())

result = []
for i in range(1, n + 1):
    if i % 3 == 0:
        continue
    result.append(str(i))

print(" ".join(result))
`,
    hints: [
      "Trong vòng for, nếu i % 3 == 0 thì gọi continue để chuyển sang vòng lặp tiếp theo."
    ],
    solutionExplanation: `Lệnh continue bỏ qua phần còn lại của thân lặp hiện tại và nhảy tới bước lặp kế tiếp.`,
    testCases: [
      { id: "cd5-b7-t1", input: "10", expectedOutput: "1 2 4 5 7 8 10", isHidden: false },
      { id: "cd5-b7-t2", input: "5", expectedOutput: "1 2 4 5", isHidden: false },
      { id: "cd5-b7-t3", input: "1", expectedOutput: "1", isHidden: true }
    ]
  },
  {
    id: "cd5-bai-8",
    title: "Bài 8. Tính Giai Thừa n! Bằng Vòng Lặp",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 5: Vòng lặp For, While, Break & Continue",
    difficulty: "Dễ",
    tags: ["Giai thừa", "for", "Tích lũy"],
    points: 25,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 5: range(), for, while, break, continue",
    problemStatement: `Giai thừa của một số nguyên dương n (ký hiệu n!) là tích các số từ 1 đến n:
n! = 1 * 2 * 3 * ... * n (quy ước 0! = 1).
Viết chương trình nhập vào số nguyên n (0 <= n <= 15), tính n! bằng vòng lặp và in kết quả.`,
    inputFormat: "Một số nguyên không âm n.",
    outputFormat: "Một số nguyên là giá trị n!.",
    constraints: "0 <= n <= 15",
    sampleCases: [
      {
        input: "5",
        output: "120",
        explanation: "5! = 1 * 2 * 3 * 4 * 5 = 120."
      },
      {
        input: "0",
        output: "1",
        explanation: "0! = 1."
      },
      {
        input: "6",
        output: "720",
        explanation: "6! = 720."
      }
    ],
    starterCode: `n = int(input())

giai_thua = 1
for i in range(1, n + 1):
    giai_thua *= i

print(giai_thua)
`,
    hints: [
      "Khởi tạo `giai_thua = 1`, lặp for i in range(1, n + 1) và nhân dồn `giai_thua *= i`."
    ],
    solutionExplanation: `Nhân dồn từ 1 tới n với biến khởi tạo bằng 1.`,
    testCases: [
      { id: "cd5-b8-t1", input: "5", expectedOutput: "120", isHidden: false },
      { id: "cd5-b8-t2", input: "0", expectedOutput: "1", isHidden: false },
      { id: "cd5-b8-t3", input: "6", expectedOutput: "720", isHidden: false },
      { id: "cd5-b8-t4", input: "10", expectedOutput: "3628800", isHidden: true }
    ]
  },
  {
    id: "cd5-bai-9",
    title: "Bài 9. Nhập Số Cho Đến Khi Gặp Số Dương (while True)",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 5: Vòng lặp For, While, Break & Continue",
    difficulty: "Trung bình",
    tags: ["while True", "break", "Xử lý nhập"],
    points: 30,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 5: range(), for, while, break, continue",
    problemStatement: `Viết chương trình đọc một chuỗi các số nguyên từ đầu vào (mỗi số trên 1 dòng).
Sử dụng vòng lặp ` + "`while True`" + ` kết hợp ` + "`break`" + ` để lặp đọc cho đến khi gặp số dương đầu tiên (> 0), in ra số dương đó và kết thúc chương trình.`,
    inputFormat: "Các số nguyên trên từng dòng cho đến khi có một số > 0.",
    outputFormat: "In ra số dương đầu tiên nhận được.",
    constraints: "Số lượng số âm/0 trước đó <= 100",
    sampleCases: [
      {
        input: "-5\n0\n-12\n8\n-2",
        output: "8",
        explanation: "-5, 0, -12 đều <= 0. Số 8 là số dương đầu tiên nên in 8 và dừng."
      },
      {
        input: "10",
        output: "10",
        explanation: "10 là số dương ngay từ đầu."
      }
    ],
    starterCode: `while True:
    val = int(input())
    if val > 0:
        print(val)
        break
`,
    hints: [
      "Dùng while True: nhập số val, nếu val > 0 thì in val và break."
    ],
    solutionExplanation: `Mô hình vòng lặp vô hạn có điều kiện thoát lặp bằng lệnh break.`,
    testCases: [
      { id: "cd5-b9-t1", input: "-5\n0\n-12\n8\n-2", expectedOutput: "8", isHidden: false },
      { id: "cd5-b9-t2", input: "10", expectedOutput: "10", isHidden: false },
      { id: "cd5-b9-t3", input: "-1\n-2\n-3\n5", expectedOutput: "5", isHidden: true }
    ]
  },
  {
    id: "cd5-bai-10",
    title: "Bài 10. Vẽ Hình Tam Giác Vuông Bằng Ký Tự '*' (2 Vòng For)",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 5: Vòng lặp For, While, Break & Continue",
    difficulty: "Trung bình",
    tags: ["Vẽ hình", "Nested for", "Tam giác sao"],
    points: 30,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 5: range(), for, while, break, continue",
    problemStatement: `Viết chương trình nhập vào một số nguyên dương n (1 <= n <= 20).
In ra hình tam giác vuông gồm n dòng bằng ký tự '*':
- Dòng 1 có 1 ký tự '*'
- Dòng 2 có 2 ký tự '**'
...
- Dòng n có n ký tự '*'`,
    inputFormat: "Một số nguyên dương n.",
    outputFormat: "n dòng in tam giác sao.",
    constraints: "1 <= n <= 20",
    sampleCases: [
      {
        input: "4",
        output: "*\n**\n***\n****",
        explanation: "Tam giác 4 dòng."
      },
      {
        input: "3",
        output: "*\n**\n***",
        explanation: "Tam giác 3 dòng."
      }
    ],
    starterCode: `n = int(input())

for i in range(1, n + 1):
    print("*" * i)
`,
    hints: [
      "Vòng for i chạy từ 1 đến n, mỗi dòng in '*' * i."
    ],
    solutionExplanation: `Duyệt từng dòng i và nhân chuỗi ký tự '*' với i.`,
    testCases: [
      { id: "cd5-b10-t1", input: "4", expectedOutput: "*\n**\n***\n****", isHidden: false },
      { id: "cd5-b10-t2", input: "3", expectedOutput: "*\n**\n***", isHidden: false },
      { id: "cd5-b10-t3", input: "1", expectedOutput: "*", isHidden: true }
    ]
  },
  {
    id: "cd5-bai-11",
    title: "Bài 11. Tìm Ước Chung Lớn Nhất (ƯCLN) Bằng Vòng Lặp While",
    level: "secondary",
    gradeGroup: "THCS (Khối 6-9)",
    topic: "Chủ đề 5: Vòng lặp For, While, Break & Continue",
    difficulty: "Trung bình",
    tags: ["ƯCLN", "Thuật toán Euclid", "while"],
    points: 35,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 5: range(), for, while, break, continue",
    problemStatement: `Viết chương trình nhập vào 2 số nguyên dương a và b (trên 2 dòng).
Sử dụng thuật toán Euclid với vòng lặp while để tìm và in ra Ước chung lớn nhất (ƯCLN) của a và b.`,
    inputFormat: "Gồm 2 dòng chứa 2 số nguyên dương a và b.",
    outputFormat: "Một số nguyên duy nhất là ƯCLN của a và b.",
    constraints: "1 <= a, b <= 10^9",
    sampleCases: [
      {
        input: "24\n36",
        output: "12",
        explanation: "ƯCLN(24, 36) = 12."
      },
      {
        input: "17\n19",
        output: "1",
        explanation: "17 và 19 nguyên tố cùng nhau, ƯCLN = 1."
      }
    ],
    starterCode: `a = int(input())
b = int(input())

while b != 0:
    a, b = b, a % b

print(a)
`,
    hints: [
      "Thuật toán Euclid: trong khi b != 0, gán a, b = b, a % b. Khi b = 0 thì a chính là ƯCLN."
    ],
    solutionExplanation: `Thuật toán Euclid chia lấy dư lặp đi lặp lại cho đến khi số dư bằng 0.`,
    testCases: [
      { id: "cd5-b11-t1", input: "24\n36", expectedOutput: "12", isHidden: false },
      { id: "cd5-b11-t2", input: "17\n19", expectedOutput: "1", isHidden: false },
      { id: "cd5-b11-t3", input: "100\n25", expectedOutput: "25", isHidden: true }
    ]
  },
  {
    id: "cd5-bai-12",
    title: "Bài 12. Đếm Số Bội Chung Của 3 Và 5 Dùng Continue",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 5: Vòng lặp For, While, Break & Continue",
    difficulty: "Dễ",
    tags: ["continue", "for", "Bội số"],
    points: 25,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 5: range(), for, while, break, continue",
    problemStatement: `Viết chương trình nhập vào số nguyên dương n (1 <= n <= 1000).
Duyệt qua các số từ 1 đến n, dùng lệnh ` + "`continue`" + ` để bỏ qua những số không thỏa mãn (không chia hết cho cả 3 và 5), đếm xem có bao nhiêu số vừa là bội của 3 vừa là bội của 5. In số lượng đếm được.`,
    inputFormat: "Một số nguyên dương n.",
    outputFormat: "Một số nguyên duy nhất là số lượng bội của 15 từ 1 đến n.",
    constraints: "1 <= n <= 1000",
    sampleCases: [
      {
        input: "100",
        output: "6",
        explanation: "Các số thỏa mãn trong [1, 100] là 15, 30, 45, 60, 75, 90 (gồm 6 số)."
      },
      {
        input: "30",
        output: "2",
        explanation: "Các số là 15, 30 (2 số)."
      }
    ],
    starterCode: `n = int(input())

count = 0
for i in range(1, n + 1):
    if not (i % 3 == 0 and i % 5 == 0):
        continue
    count += 1

print(count)
`,
    hints: [
      "Điều kiện bỏ qua: if not (i % 3 == 0 and i % 5 == 0): continue, sau đó tăng count += 1."
    ],
    solutionExplanation: `Duyệt từ 1 đến n, bỏ qua các số không chia hết cho 15 và đếm số thỏa mãn.`,
    testCases: [
      { id: "cd5-b12-t1", input: "100", expectedOutput: "6", isHidden: false },
      { id: "cd5-b12-t2", input: "30", expectedOutput: "2", isHidden: false },
      { id: "cd5-b12-t3", input: "14", expectedOutput: "0", isHidden: true }
    ]
  }
];
