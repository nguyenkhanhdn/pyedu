import { Module } from "../../types";

export const MODULE_7_ADVANCED: Module = {
  id: "module-7",
  title: "Chương 7: Thuật Toán & Chuyên Đề Nâng Cao (Đệ Quy & OOP)",
  description: "Mở rộng tư duy lập trình với kỹ thuật Đệ quy (Recursion) kinh điển và Lập trình Hướng đối tượng (OOP) với Lớp (Class) và Đối tượng (Object).",
  iconName: "Binary",
  order: 7,
  color: "from-rose-500 to-red-700",
  lessons: [
    {
      id: "lesson-18",
      moduleId: "module-7",
      moduleTitle: "Chương 7: Thuật Toán & Chuyên Đề Nâng Cao",
      order: 1,
      title: "Bài 18: Kỹ Thuật Đệ Quy (Recursion) - Tính Giai Thừa & Fibonacci",
      description: "Khám phá nguyên lý hàm tự gọi chính nó, xác định điều kiện dừng (Base Case) và bước đệ quy (Recursive Step).",
      durationMin: 30,
      xpReward: 80,
      theory: {
        summary: "Đệ quy (Recursion) là kỹ thuật mà trong đó một hàm tự gọi lại chính nó để giải quyết một bài toán con nhỏ hơn của bài toán ban đầu.",
        keyPoints: [
          "Mọi hàm đệ quy bắt buộc phải có 2 thành phần cốt lõi:",
          "  1. **Điều kiện dừng (Base Case)**: Trường hợp cơ sở đơn giản nhất để hàm dừng đệ quy và trả về kết quả (tránh tràn ngăn xếp RecursionError).",
          "  2. **Bước đệ quy (Recursive Step)**: Lời gọi hàm tự thân với tham số thu nhỏ dần về phía Base Case.",
          "Ví dụ giai thừa: $N! = N \\times (N-1)!$ với $0! = 1$."
        ],
        conceptIllustration: {
          type: "syntax",
          title: "Nguyên lý tính giai thừa bằng đệ quy",
          description: "factorial(4) -> 4 * factorial(3) -> 3 * factorial(2) -> 2 * factorial(1) -> 1",
          visualData: {
            codeSnippet: "def factorial(n):\n    if n <= 1:    # Base Case\n        return 1\n    return n * factorial(n - 1) # Recursive Step",
            outputPreview: "factorial(4) = 24",
            explanation: "Hàm tích lũy ngăn xếp (Call Stack) cho đến khi gặp Base case rồi thu về kết quả."
          }
        },
        examples: [
          {
            title: "Ví dụ: Tính số Fibonacci thứ N",
            explanation: "F(0)=0, F(1)=1, F(n)=F(n-1)+F(n-2).",
            code: "def fib(n):\n    if n <= 0: return 0\n    if n == 1: return 1\n    return fib(n - 1) + fib(n - 2)\n\nprint(fib(6))",
            output: "8"
          }
        ],
        multipleChoice: {
          question: "Điều gì sẽ xảy ra nếu một hàm đệ quy KHÔNG có điều kiện dừng (Base Case)?",
          options: [
            "Hàm tự động trả về giá trị 0.",
            "Hàm sẽ bị lỗi RecursionError (tràn ngăn xếp bộ nhớ).",
            "Hàm chạy bình thường như một vòng lặp for.",
            "Chương trình sẽ tự động ngắt sau 10 lần gọi."
          ],
          correctIndex: 1,
          explanation: "Không có Base Case sẽ khiến hàm gọi vô hạn cho đến khi vượt quá giới hạn ngăn xếp gọi hàm (RecursionError)."
        }
      },
      practice: {
        id: "practice-18",
        title: "Thử thách 18: Tính Giai Thừa N! Bằng Đệ Quy",
        difficulty: "Trung bình",
        problemStatement: "Giai thừa của một số tự nhiên N (ký hiệu N!) là tích của các số nguyên dương từ 1 đến N: N! = 1 * 2 * 3 * ... * N (quy ước 0! = 1).\n\nViết chương trình định nghĩa hàm đệ quy `factorial(n)` để tính N! và in kết quả ra màn hình.",
        inputFormat: "Một dòng chứa số nguyên n (0 <= n <= 15).",
        outputFormat: "In ra một số nguyên duy nhất là kết quả của n!.",
        constraints: "0 <= n <= 15.",
        sampleCases: [
          {
            input: "5",
            output: "120",
            explanation: "5! = 1 * 2 * 3 * 4 * 5 = 120."
          },
          {
            input: "0",
            output: "1",
            explanation: "0! = 1 theo quy ước toán học."
          }
        ],
        starterCode: `def factorial(n):
    # Điều kiện dừng (Base case)
    if n <= 1:
        return 1
    # Bước đệ quy
    return n * factorial(n - 1)

n = int(input())
print(factorial(n))
`,
        testCases: [
          {
            id: "tc18-1",
            input: "5",
            expectedOutput: "120",
            isHidden: false,
            explanation: "5! = 120"
          },
          {
            id: "tc18-2",
            input: "0",
            expectedOutput: "1",
            isHidden: false,
            explanation: "0! = 1"
          },
          {
            id: "tc18-3",
            input: "1",
            expectedOutput: "1",
            isHidden: false,
            explanation: "1! = 1"
          },
          {
            id: "tc18-4",
            input: "7",
            expectedOutput: "5040",
            isHidden: true,
            explanation: "7! = 5040"
          },
          {
            id: "tc18-5",
            input: "10",
            expectedOutput: "3628800",
            isHidden: true,
            explanation: "10! = 3628800"
          }
        ],
        hints: [
          "Nếu n <= 1 thì return 1.",
          "Ngược lại return n * factorial(n - 1)."
        ],
        solutionExplanation: "def factorial(n):\n    if n <= 1: return 1\n    return n * factorial(n - 1)\n\nn = int(input())\nprint(factorial(n))"
      }
    },
    {
      id: "lesson-19",
      moduleId: "module-7",
      moduleTitle: "Chương 7: Thuật Toán & Chuyên Đề Nâng Cao",
      order: 2,
      title: "Bài 19: Lập Trình Hướng Đối Tượng (OOP) & Class",
      description: "Làm quen với mô hình hướng đối tượng, định nghĩa Class, hàm khởi tạo __init__, biến self và phương thức của đối tượng.",
      durationMin: 35,
      xpReward: 90,
      theory: {
        summary: "Lập trình hướng đối tượng (OOP) mô hình hóa thế giới thực thành các Lớp (Class - khuôn mẫu) và Đối tượng (Object - thực thể cụ thể có thuộc tính và hành vi).",
        keyPoints: [
          "**Class**: Bản thiết kế khuôn mẫu (ví dụ: `class Student:`).",
          "**Hàm khởi tạo `__init__(self, ...)`**: Tự động được gọi khi khởi tạo một đối tượng mới.",
          "**Biến `self`**: Đại diện cho chính thể hiện (instance) cụ thể đang được thao tác.",
          "**Thuộc tính (Attributes)**: Dữ liệu của đối tượng (ví dụ: `self.name`, `self.score`).",
          "**Phương thức (Methods)**: Các hàm thuộc về đối tượng (ví dụ: `self.get_grade()`)."
        ],
        conceptIllustration: {
          type: "syntax",
          title: "Cấu trúc một Class trong Python",
          description: "Mô hình hóa thực thể Học sinh (Student)",
          visualData: {
            codeSnippet: "class Student:\n    def __init__(self, name, score):\n        self.name = name\n        self.score = score\n        \n    def is_passed(self):\n        return self.score >= 5.0\n\ns = Student('Nam', 8.5)\nprint(s.name, s.is_passed())",
            outputPreview: "Nam True",
            explanation: "Đối tượng s kế thừa đầy đủ thuộc tính name, score và phương thức is_passed."
          }
        },
        examples: [
          {
            title: "Ví dụ: Class Hình Chữ Nhật",
            explanation: "Tính chu vi và diện tích qua phương thức.",
            code: "class Rectangle:\n    def __init__(self, w, h):\n        self.w = w\n        self.h = h\n    def area(self):\n        return self.w * self.h\n\nr = Rectangle(5, 4)\nprint(r.area())",
            output: "20"
          }
        ],
        multipleChoice: {
          question: "Trong phương thức của một Class Python, tham số đầu tiên luôn luôn bắt buộc phải là gì?",
          options: [
            "this",
            "self",
            "cls",
            "super"
          ],
          correctIndex: 1,
          explanation: "Theo quy ước chuẩn của Python, tham số đầu tiên của mọi phương thức thể hiện trong Class luôn là 'self'."
        }
      },
      practice: {
        id: "practice-19",
        title: "Thử thách 19: Quản Lý Thông Tin Học Sinh Với Class",
        difficulty: "Nâng cao",
        problemStatement: "Hãy xây dựng một Class `Student` với:\n- Phương thức khởi tạo `__init__(self, name, score)` lưu trữ `self.name` và `self.score`.\n- Phương thức `get_status(self)`: trả về chuỗi `\"DAT\"` nếu `self.score >= 5.0`, ngược lại trả về `\"HOC LAI\"`.\n\nSau đó viết chương trình chính nhận vào tên học sinh và điểm số, tạo đối tượng `Student` và in ra: `<ten> : <trang_thai>`.",
        inputFormat: "Dòng 1: Tên học sinh (chuỗi văn bản).\nDòng 2: Điểm số (số thực float).",
        outputFormat: "In ra dòng thông báo: `<name> : <status>`.",
        constraints: "Điểm từ 0.0 đến 10.0.",
        sampleCases: [
          {
            input: "Minh Duc\n8.5",
            output: "Minh Duc : DAT",
            explanation: "8.5 >= 5.0 nên trạng thái là DAT."
          },
          {
            input: "Thao Vy\n4.2",
            output: "Thao Vy : HOC LAI",
            explanation: "4.2 < 5.0 nên trạng thái là HOC LAI."
          }
        ],
        starterCode: `class Student:
    def __init__(self, name, score):
        self.name = name
        self.score = float(score)

    def get_status(self):
        if self.score >= 5.0:
            return "DAT"
        else:
            return "HOC LAI"

# Chương trình chính
name = input().strip()
score = float(input())

st = Student(name, score)
print(f"{st.name} : {st.get_status()}")
`,
        testCases: [
          {
            id: "tc19-1",
            input: "Minh Duc\n8.5",
            expectedOutput: "Minh Duc : DAT",
            isHidden: false,
            explanation: "Học sinh đạt: Minh Duc : DAT"
          },
          {
            id: "tc19-2",
            input: "Thao Vy\n4.2",
            expectedOutput: "Thao Vy : HOC LAI",
            isHidden: false,
            explanation: "Học sinh học lại: Thao Vy : HOC LAI"
          },
          {
            id: "tc19-3",
            input: "Hoang Phuc\n5.0",
            expectedOutput: "Hoang Phuc : DAT",
            isHidden: true,
            explanation: "Điểm biên 5.0: Hoang Phuc : DAT"
          }
        ],
        hints: [
          "Xây dựng Class Student có __init__(self, name, score).",
          "Trong get_status(self), kiểm tra self.score >= 5.0 return 'DAT' else 'HOC LAI'.",
          "Tạo đối tượng st = Student(name, score) và in f\"{st.name} : {st.get_status()}\"."
        ],
        solutionExplanation: "class Student:\n    def __init__(self, name, score):\n        self.name = name\n        self.score = float(score)\n    def get_status(self):\n        return 'DAT' if self.score >= 5.0 else 'HOC LAI'\n\nname = input().strip()\nscore = float(input())\nst = Student(name, score)\nprint(f'{st.name} : {st.get_status()}')"
      }
    }
  ]
};
