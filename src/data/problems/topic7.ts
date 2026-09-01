import { AlgorithmProblem } from "../../types";

export const TOPIC_7_PROBLEMS: AlgorithmProblem[] = [
  {
    id: "cd7-bai-1",
    title: "Bài 1. Phần Tử Đầu Tiên và Cuối Cùng Trong List",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 7: List (Danh sách) trong Python",
    difficulty: "Dễ",
    tags: ["List", "Index", "Indexing"],
    points: 20,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 7: List (Danh sách)",
    problemStatement: `Viết chương trình nhập vào một danh sách các số nguyên (cách nhau bởi dấu cách trên 1 dòng, danh sách có ít nhất 1 phần tử).
In ra phần tử đầu tiên (vị trí ` + "`[0]`" + `) và phần tử cuối cùng (vị trí ` + "`[-1]`" + `) trên cùng 1 dòng, cách nhau bởi 1 dấu cách.`,
    inputFormat: "Một dòng chứa các số nguyên cách nhau bởi dấu cách.",
    outputFormat: "In ra 2 số: phần tử đầu và phần tử cuối.",
    constraints: "Số lượng phần tử từ 1 đến 1000",
    sampleCases: [
      {
        input: "10 25 34 56 78",
        output: "10 78",
        explanation: "Phần tử đầu là 10, cuối là 78."
      },
      {
        input: "99",
        output: "99 99",
        explanation: "Chỉ có 1 phần tử nên đầu và cuối đều là 99."
      }
    ],
    starterCode: `lst = list(map(int, input().split()))
print(lst[0], lst[-1])
`,
    hints: [
      "Trong Python, `lst[0]` là phần tử đầu tiên, `lst[-1]` là phần tử cuối cùng."
    ],
    solutionExplanation: `Sử dụng chỉ số dương [0] và chỉ số âm [-1] để truy cập phần tử.`,
    testCases: [
      { id: "cd7-b1-t1", input: "10 25 34 56 78", expectedOutput: "10 78", isHidden: false },
      { id: "cd7-b1-t2", input: "99", expectedOutput: "99 99", isHidden: false },
      { id: "cd7-b1-t3", input: "1 2 3", expectedOutput: "1 3", isHidden: true }
    ]
  },
  {
    id: "cd7-bai-2",
    title: "Bài 2. Dùng append() Thêm Số Từ 1 Đến n Vào List",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 7: List (Danh sách) trong Python",
    difficulty: "Dễ",
    tags: ["append()", "List rỗng", "for"],
    points: 20,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 7: List (Danh sách)",
    problemStatement: `Viết chương trình nhập vào số nguyên dương n (1 <= n <= 50).
Khởi tạo một list rỗng ` + "`lst = []`" + `, dùng vòng lặp for và phương thức ` + "`append()`" + ` để lần lượt thêm các số từ 1 đến n vào list.
In danh sách các phần tử cách nhau bởi dấu cách.`,
    inputFormat: "Một số nguyên dương n.",
    outputFormat: "Các phần tử của list cách nhau bởi dấu cách.",
    constraints: "1 <= n <= 50",
    sampleCases: [
      {
        input: "5",
        output: "1 2 3 4 5",
        explanation: "List chứa [1, 2, 3, 4, 5]."
      }
    ],
    starterCode: `n = int(input())

lst = []
for i in range(1, n + 1):
    lst.append(i)

print(*lst)
`,
    hints: [
      "Phương thức `lst.append(i)` thêm phần tử i vào cuối danh sách. Dùng `print(*lst)` để in các phần tử cách nhau khoảng trắng."
    ],
    solutionExplanation: `Khởi tạo list rỗng và gọi append(i) trong vòng lặp.`,
    testCases: [
      { id: "cd7-b2-t1", input: "5", expectedOutput: "1 2 3 4 5", isHidden: false },
      { id: "cd7-b2-t2", input: "3", expectedOutput: "1 2 3", isHidden: false },
      { id: "cd7-b2-t3", input: "1", expectedOutput: "1", isHidden: true }
    ]
  },
  {
    id: "cd7-bai-3",
    title: "Bài 3. Tìm Phần Tử Lớn Nhất & Nhỏ Nhất (max, min)",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 7: List (Danh sách) trong Python",
    difficulty: "Dễ",
    tags: ["max()", "min()", "List"],
    points: 20,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 7: List (Danh sách)",
    problemStatement: `Viết chương trình nhập vào một list các số nguyên trên 1 dòng (cách nhau bởi dấu cách).
Tìm và in ra phần tử nhỏ nhất và phần tử lớn nhất trên cùng 1 dòng, cách nhau bởi 1 dấu cách.`,
    inputFormat: "Một dòng chứa dãy số nguyên.",
    outputFormat: "In ra min và max cách nhau dấu cách: <min> <max>",
    constraints: "Dãy có từ 1 đến 1000 phần tử",
    sampleCases: [
      {
        input: "15 8 92 4 67",
        output: "4 92",
        explanation: "Min là 4, Max là 92."
      }
    ],
    starterCode: `nums = list(map(int, input().split()))
print(min(nums), max(nums))
`,
    hints: [
      "Dùng hàm min(nums) và max(nums)."
    ],
    solutionExplanation: `Hai hàm có sẵn min() và max() trả về giá trị nhỏ nhất và lớn nhất trong list.`,
    testCases: [
      { id: "cd7-b3-t1", input: "15 8 92 4 67", expectedOutput: "4 92", isHidden: false },
      { id: "cd7-b3-t2", input: "-5 10 -20 30", expectedOutput: "-20 30", isHidden: false }
    ]
  },
  {
    id: "cd7-bai-4",
    title: "Bài 4. Tổng và Trung Bình Cộng Dãy Số Thực",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 7: List (Danh sách) trong Python",
    difficulty: "Dễ",
    tags: ["sum()", "len()", "Số thực"],
    points: 20,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 7: List (Danh sách)",
    problemStatement: `Viết chương trình nhập vào một list các số thực trên một dòng (cách nhau bởi dấu cách).
Tính và in ra:
- Dòng 1: Tổng của các phần tử (làm tròn 2 chữ số thập phân)
- Dòng 2: Trung bình cộng của các phần tử (làm tròn 2 chữ số thập phân)`,
    inputFormat: "Một dòng chứa các số thực cách nhau bởi dấu cách.",
    outputFormat: "Gồm 2 dòng: Tổng và Trung bình cộng.",
    constraints: "Dãy có từ 1 đến 1000 phần tử",
    sampleCases: [
      {
        input: "1.5 2.5 3.5 4.5",
        output: "12.00\n3.00",
        explanation: "Tổng = 12.0, TBC = 3.0."
      }
    ],
    starterCode: `nums = list(map(float, input().split()))

tong = sum(nums)
tbc = tong / len(nums)

print(f"{tong:.2f}")
print(f"{tbc:.2f}")
`,
    hints: [
      "Tính tổng bằng sum(nums), số phần tử bằng len(nums), TBC = sum(nums) / len(nums)."
    ],
    solutionExplanation: `Sử dụng sum(), len() và định dạng f'{:.2f}'.`,
    testCases: [
      { id: "cd7-b4-t1", input: "1.5 2.5 3.5 4.5", expectedOutput: "12.00\n3.00", isHidden: false },
      { id: "cd7-b4-t2", input: "5 5 5", expectedOutput: "15.00\n5.00", isHidden: false }
    ]
  },
  {
    id: "cd7-bai-5",
    title: "Bài 5. List Comprehension Tạo Danh Sách Bình Phương",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 7: List (Danh sách) trong Python",
    difficulty: "Dễ",
    tags: ["List comprehension", "Bình phương", "range()"],
    points: 25,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 7: List (Danh sách)",
    problemStatement: `Viết chương trình nhập vào số nguyên dương n (1 <= n <= 30).
Sử dụng cú pháp List Comprehension ` + "`[x**2 for x in range(1, n + 1)]`" + ` để tạo danh sách bình phương của các số từ 1 đến n, sau đó in các số đó cách nhau bởi dấu cách.`,
    inputFormat: "Một số nguyên dương n.",
    outputFormat: "Dãy bình phương từ 1^2 đến n^2 cách nhau dấu cách.",
    constraints: "1 <= n <= 30",
    sampleCases: [
      {
        input: "5",
        output: "1 4 9 16 25",
        explanation: "1^2=1, 2^2=4, 3^2=9, 4^2=16, 5^2=25."
      }
    ],
    starterCode: `n = int(input())

squares = [x**2 for x in range(1, n + 1)]
print(*squares)
`,
    hints: [
      "Cú pháp: `[x**2 for x in range(1, n + 1)]`."
    ],
    solutionExplanation: `List comprehension tạo danh sách mới ngắn gọn và hiệu quả.`,
    testCases: [
      { id: "cd7-b5-t1", input: "5", expectedOutput: "1 4 9 16 25", isHidden: false },
      { id: "cd7-b5-t2", input: "3", expectedOutput: "1 4 9", isHidden: false }
    ]
  },
  {
    id: "cd7-bai-6",
    title: "Bài 6. Xóa Trùng Lặp Trong List Giữ Nguyên Thứ Tự",
    level: "secondary",
    gradeGroup: "THCS (Khối 6-9)",
    topic: "Chủ đề 7: List (Danh sách) trong Python",
    difficulty: "Trung bình",
    tags: ["Xóa trùng", "List", "Duyệt mảng"],
    points: 30,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 7: List (Danh sách)",
    problemStatement: `Viết chương trình nhập vào một list các số nguyên trên 1 dòng.
Xóa tất cả các phần tử trùng lặp trong list, giữ lại các phần tử duy nhất theo thứ tự xuất hiện ban đầu của chúng. In các phần tử kết quả cách nhau bởi dấu cách.`,
    inputFormat: "Một dòng chứa dãy số nguyên.",
    outputFormat: "Dãy số sau khi loại bỏ phần tử trùng lặp theo đúng thứ tự xuất hiện.",
    constraints: "Độ dài dãy <= 1000",
    sampleCases: [
      {
        input: "1 3 2 1 4 3 2 5",
        output: "1 3 2 4 5",
        explanation: "1, 3, 2, 4, 5 là các số duy nhất theo thứ tự đầu tiên xuất hiện."
      }
    ],
    starterCode: `nums = list(map(int, input().split()))

seen = set()
unique_nums = []
for x in nums:
    if x not in seen:
        seen.add(x)
        unique_nums.append(x)

print(*unique_nums)
`,
    hints: [
      "Dùng một tập hợp `seen = set()` để đánh dấu các phần tử đã gặp và lưu vào `unique_nums`."
    ],
    solutionExplanation: `Kết hợp set để kiểm tra O(1) và list để giữ thứ tự ban đầu.`,
    testCases: [
      { id: "cd7-b6-t1", input: "1 3 2 1 4 3 2 5", expectedOutput: "1 3 2 4 5", isHidden: false },
      { id: "cd7-b6-t2", input: "5 5 5 5", expectedOutput: "5", isHidden: false }
    ]
  },
  {
    id: "cd7-bai-7",
    title: "Bài 7. Sắp Xếp List Tăng Dần & Giảm Dần (sort())",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 7: List (Danh sách) trong Python",
    difficulty: "Dễ",
    tags: ["sort()", "Sắp xếp", "Tăng dần", "Giảm dần"],
    points: 25,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 7: List (Danh sách)",
    problemStatement: `Viết chương trình nhập vào một list các số nguyên trên 1 dòng.
In ra 2 dòng:
- Dòng 1: Dãy số sắp xếp theo thứ tự TĂNG DẦN
- Dòng 2: Dãy số sắp xếp theo thứ tự GIẢM DẦN
(Các số trên mỗi dòng cách nhau bởi dấu cách).`,
    inputFormat: "Một dòng chứa các số nguyên.",
    outputFormat: "Gồm 2 dòng: Dòng 1 tăng dần, Dòng 2 giảm dần.",
    constraints: "Độ dài dãy <= 1000",
    sampleCases: [
      {
        input: "7 2 9 1 5",
        output: "1 2 5 7 9\n9 7 5 2 1",
        explanation: "Dòng 1 tăng dần: 1 2 5 7 9; Dòng 2 giảm dần: 9 7 5 2 1."
      }
    ],
    starterCode: `nums = list(map(int, input().split()))

inc = sorted(nums)
dec = sorted(nums, reverse=True)

print(*inc)
print(*dec)
`,
    hints: [
      "Dùng `sorted(nums)` để tăng dần, `sorted(nums, reverse=True)` để giảm dần."
    ],
    solutionExplanation: `Hàm sorted() hoặc phương thức .sort() hỗ trợ tham số reverse=True.`,
    testCases: [
      { id: "cd7-b7-t1", input: "7 2 9 1 5", expectedOutput: "1 2 5 7 9\n9 7 5 2 1", isHidden: false },
      { id: "cd7-b7-t2", input: "10 5", expectedOutput: "5 10\n10 5", isHidden: false }
    ]
  },
  {
    id: "cd7-bai-8",
    title: "Bài 8. Đếm Số Lần Xuất Hiện Của Phần Tử x (count())",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 7: List (Danh sách) trong Python",
    difficulty: "Dễ",
    tags: ["count()", "Đếm phần tử", "List"],
    points: 20,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 7: List (Danh sách)",
    problemStatement: `Viết chương trình nhập vào:
- Dòng 1: Một list các số nguyên (cách nhau bởi dấu cách)
- Dòng 2: Một số nguyên x cần đếm

Sử dụng phương thức ` + "`count()`" + ` hoặc vòng lặp để đếm số lần xuất hiện của x trong list và in kết quả.`,
    inputFormat: "Gồm 2 dòng:\n- Dòng 1: Dãy số nguyên\n- Dòng 2: Số nguyên x",
    outputFormat: "Một số nguyên là số lần xuất hiện của x.",
    constraints: "Độ dài dãy <= 1000",
    sampleCases: [
      {
        input: "1 2 3 2 4 2 5\n2",
        output: "3",
        explanation: "Số 2 xuất hiện 3 lần."
      },
      {
        input: "1 2 3 4\n9",
        output: "0",
        explanation: "Số 9 không xuất hiện lần nào."
      }
    ],
    starterCode: `nums = list(map(int, input().split()))
x = int(input())

print(nums.count(x))
`,
    hints: [
      "Phương thức `nums.count(x)` đếm số lần x có mặt trong nums."
    ],
    solutionExplanation: `Hàm count() đếm nhanh phần tử trong list.`,
    testCases: [
      { id: "cd7-b8-t1", input: "1 2 3 2 4 2 5\n2", expectedOutput: "3", isHidden: false },
      { id: "cd7-b8-t2", input: "1 2 3 4\n9", expectedOutput: "0", isHidden: false }
    ]
  },
  {
    id: "cd7-bai-9",
    title: "Bài 9. Tách List Thành Danh Sách Chẵn và Danh Sách Lẻ",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 7: List (Danh sách) trong Python",
    difficulty: "Dễ",
    tags: ["Tách list", "Chẵn lẻ", "List comprehension"],
    points: 25,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 7: List (Danh sách)",
    problemStatement: `Viết chương trình nhập vào một list các số nguyên trên 1 dòng.
Tách list thành 2 list:
- Dòng 1: Danh sách các số chẵn (theo thứ tự ban đầu, cách nhau dấu cách). Nếu không có số chẵn nào thì in chuỗi "RONG".
- Dòng 2: Danh sách các số lẻ (theo thứ tự ban đầu, cách nhau dấu cách). Nếu không có số lẻ nào thì in chuỗi "RONG".`,
    inputFormat: "Một dòng chứa dãy số nguyên.",
    outputFormat: "Gồm 2 dòng in danh sách số chẵn và số lẻ.",
    constraints: "Độ dài dãy <= 1000",
    sampleCases: [
      {
        input: "1 2 3 4 5 6",
        output: "2 4 6\n1 3 5",
        explanation: "Chẵn là 2, 4, 6; Lẻ là 1, 3, 5."
      },
      {
        input: "2 4 6",
        output: "2 4 6\nRONG",
        explanation: "Không có số lẻ nào."
      }
    ],
    starterCode: `nums = list(map(int, input().split()))

chan = [x for x in nums if x % 2 == 0]
le = [x for x in nums if x % 2 != 0]

print(*chan if chan else ["RONG"])
print(*le if le else ["RONG"])
`,
    hints: [
      "Lọc chẵn: `[x for x in nums if x % 2 == 0]`.",
      "Lọc lẻ: `[x for x in nums if x % 2 != 0]`."
    ],
    solutionExplanation: `Lọc các phần tử chẵn và lẻ vào hai danh sách riêng biệt.`,
    testCases: [
      { id: "cd7-b9-t1", input: "1 2 3 4 5 6", expectedOutput: "2 4 6\n1 3 5", isHidden: false },
      { id: "cd7-b9-t2", input: "2 4 6", expectedOutput: "2 4 6\nRONG", isHidden: false },
      { id: "cd7-b9-t3", input: "1 3 5", expectedOutput: "RONG\n1 3 5", isHidden: true }
    ]
  },
  {
    id: "cd7-bai-10",
    title: "Bài 10. Đảo Ngược Thứ Tự Phần Tử Trong List (reverse / [::-1])",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 7: List (Danh sách) trong Python",
    difficulty: "Dễ",
    tags: ["reverse", "Slicing", "Đảo mảng"],
    points: 20,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 7: List (Danh sách)",
    problemStatement: `Viết chương trình nhập vào một list các số nguyên trên 1 dòng.
Đảo ngược thứ tự các phần tử trong list và in kết quả trên 1 dòng (cách nhau bởi dấu cách).`,
    inputFormat: "Một dòng chứa dãy số nguyên.",
    outputFormat: "Dãy số sau khi đảo ngược thứ tự.",
    constraints: "Độ dài dãy <= 1000",
    sampleCases: [
      {
        input: "10 20 30 40 50",
        output: "50 40 30 20 10",
        explanation: "Đảo ngược danh sách."
      }
    ],
    starterCode: `nums = list(map(int, input().split()))
print(*nums[::-1])
`,
    hints: [
      "Dùng `nums[::-1]` hoặc `nums.reverse()`."
    ],
    solutionExplanation: `Slicing [::-1] tạo bản sao đảo ngược danh sách.`,
    testCases: [
      { id: "cd7-b10-t1", input: "10 20 30 40 50", expectedOutput: "50 40 30 20 10", isHidden: false },
      { id: "cd7-b10-t2", input: "1 2", expectedOutput: "2 1", isHidden: false }
    ]
  },
  {
    id: "cd7-bai-11",
    title: "Bài 11. Tìm Vị Trí (Index) Đầu Tiên Của Giá Trị x",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 7: List (Danh sách) trong Python",
    difficulty: "Dễ",
    tags: ["index()", "Tìm kiếm", "Vị trí"],
    points: 25,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 7: List (Danh sách)",
    problemStatement: `Viết chương trình nhập vào:
- Dòng 1: Một list các số nguyên (cách nhau bởi dấu cách)
- Dòng 2: Một số nguyên x cần tìm

Tìm vị trí (chỉ số 0-based index) đầu tiên của x trong list:
- Nếu tìm thấy: in ra chỉ số đó (ví dụ: 0, 1, 2, ...)
- Nếu không tìm thấy: in "-1"`,
    inputFormat: "Gồm 2 dòng: Dãy số nguyên và số x.",
    outputFormat: "Chỉ số xuất hiện đầu tiên của x hoặc -1.",
    constraints: "Độ dài dãy <= 1000",
    sampleCases: [
      {
        input: "10 20 30 20 40\n20",
        output: "1",
        explanation: "Số 20 xuất hiện đầu tiên tại index 1."
      },
      {
        input: "1 2 3 4\n9",
        output: "-1",
        explanation: "9 không có trong dãy."
      }
    ],
    starterCode: `nums = list(map(int, input().split()))
x = int(input())

if x in nums:
    print(nums.index(x))
else:
    print(-1)
`,
    hints: [
      "Kiểm tra `if x in nums:` trước khi gọi `nums.index(x)` để tránh lỗi ValueError."
    ],
    solutionExplanation: `Dùng toán tử in và phương thức index() để tìm vị trí.`,
    testCases: [
      { id: "cd7-b11-t1", input: "10 20 30 20 40\n20", expectedOutput: "1", isHidden: false },
      { id: "cd7-b11-t2", input: "1 2 3 4\n9", expectedOutput: "-1", isHidden: false }
    ]
  },
  {
    id: "cd7-bai-12",
    title: "Bài 12. Nhân Đôi Giá Trị Mỗi Phần Tử Trong List",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 7: List (Danh sách) trong Python",
    difficulty: "Dễ",
    tags: ["List comprehension", "Biến đổi", "Nhân đôi"],
    points: 20,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 7: List (Danh sách)",
    problemStatement: `Viết chương trình nhập vào một list các số nguyên trên 1 dòng.
Nhân đôi giá trị của mỗi phần tử trong list (x * 2) và in ra dãy số mới cách nhau bởi dấu cách.`,
    inputFormat: "Một dòng chứa dãy số nguyên.",
    outputFormat: "Dãy số sau khi nhân đôi mỗi phần tử.",
    constraints: "Độ dài dãy <= 1000",
    sampleCases: [
      {
        input: "1 2 3 4 5",
        output: "2 4 6 8 10",
        explanation: "Tất cả các số được nhân 2."
      }
    ],
    starterCode: `nums = list(map(int, input().split()))
doubled = [x * 2 for x in nums]
print(*doubled)
`,
    hints: [
      "Dùng List comprehension: `[x * 2 for x in nums]`."
    ],
    solutionExplanation: `Duyệt qua từng phần tử và nhân 2.`,
    testCases: [
      { id: "cd7-b12-t1", input: "1 2 3 4 5", expectedOutput: "2 4 6 8 10", isHidden: false },
      { id: "cd7-b12-t2", input: "10 -5 0", expectedOutput: "20 -10 0", isHidden: false }
    ]
  }
];
