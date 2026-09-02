import { Module } from "../../types";

export const TOPIC_9_RECURSION: Module = {
  id: "topic-9",
  title: "Chủ đề 9: Đệ Quy (Recursion)",
  description: "Khám phá tư duy thuật toán đệ quy, xác định bài toán cơ sở (Base Case), bước đệ quy (Recursive Step), ngăn xếp gọi hàm (Call Stack) và các bài toán kinh điển.",
  iconName: "Binary",
  order: 9,
  color: "from-indigo-500 to-purple-700",
  lessons: [
    {
      id: "t9-l1",
      moduleId: "topic-9",
      moduleTitle: "Chủ đề 9: Đệ Quy",
      order: 1,
      title: "Bài 1: Đệ Quy Tính Dãy Số Fibonacci",
      description: "Viết hàm đệ quy fibonacci(n) tính số Fibonacci thứ n theo công thức truy hồi.",
      durationMin: 20,
      xpReward: 60,
      theory: {
        summary: "Dãy số Fibonacci được định nghĩa đệ quy: $F(1) = 1$, $F(2) = 1$, và $F(n) = F(n - 1) + F(n - 2)$ với mọi $n \\ge 3$.",
        keyPoints: [
          "Bài toán cơ sở (Base Case): Nếu `n <= 2`: `return 1`.",
          "Bước đệ quy: `return fibonacci(n - 1) + fibonacci(n - 2)`.",
          "Cần chú ý điều kiện cơ sở để tránh tràn ngăn xếp đệ quy (RecursionError)."
        ],
        conceptIllustration: {
          type: "recursion",
          title: "Cây Đệ Quy Fibonacci F(4)",
          description: "F(4) = F(3) + F(2) = (F(2) + F(1)) + 1 = (1 + 1) + 1 = 3.",
          visualData: {
            baseCases: ["F(1) = 1", "F(2) = 1"],
            recursiveFormula: "F(n) = F(n-1) + F(n-2)",
            treeDepth: 4
          }
        },
        examples: [
          {
            title: "Ví dụ: F(6)",
            explanation: "Dãy: 1, 1, 2, 3, 5, 8 -> F(6) = 8.",
            code: "def fib(n):\n    if n <= 2:\n        return 1\n    return fib(n - 1) + fib(n - 2)\nprint(fib(6))",
            output: "8"
          }
        ],
        multipleChoice: {
          question: "Trong hàm đệ quy, nếu thiếu 'điều kiện cơ sở' (Base case) thì điều gì sẽ xảy ra?",
          options: [
            "Hàm sẽ trả về 0",
            "Hàm sẽ lặp vô hạn và gây ra lỗi tràn ngăn xếp (RecursionError)",
            "Chương trình tự động dừng lại an toàn",
            "Python tự động thêm điều kiện dừng"
          ],
          correctIndex: 1,
          explanation: "Không có điều kiện cơ sở, hàm sẽ gọi lại chính nó vô hạn lần cho đến khi tràn bộ nhớ Call Stack."
        }
      },
      practice: {
        id: "t9-p1",
        title: "Bài 1: Fibonacci",
        difficulty: "Trung bình",
        problemStatement: "Viết hàm đệ quy `fibonacci(n)` nhận vào số nguyên dương `n` ($1 \\le n \\le 30$) và trả về giá trị của số Fibonacci thứ `n` (với $F(1) = 1, F(2) = 1$).\nChương trình chính nhận `n` từ bàn phím, gọi hàm và in kết quả.",
        inputFormat: "Một dòng chứa số nguyên dương n (1 <= n <= 30).",
        outputFormat: "Một dòng in ra số Fibonacci thứ n.",
        constraints: "1 <= n <= 30.",
        sampleCases: [
          {
            input: "6",
            output: "8",
            explanation: "Dãy số: 1, 1, 2, 3, 5, 8. Số thứ 6 là 8."
          },
          {
            input: "1",
            output: "1",
            explanation: "F(1) = 1."
          }
        ],
        starterCode: `# Định nghĩa hàm đệ quy fibonacci(n)
def fibonacci(n):
    # TODO: Viết điều kiện cơ sở và bước đệ quy
    pass

n = int(input())
# TODO: In kết quả
`,
        testCases: [
          {
            id: "t9-1-tc1",
            input: "6",
            expectedOutput: "8",
            isHidden: false,
            explanation: "Kiểm tra F(6)."
          },
          {
            id: "t9-1-tc2",
            input: "1",
            expectedOutput: "1",
            isHidden: false,
            explanation: "Kiểm tra F(1)."
          },
          {
            id: "t9-1-tc3",
            input: "10",
            expectedOutput: "55",
            isHidden: true,
            explanation: "Kiểm tra F(10)."
          }
        ],
        hints: [
          "Nếu `n == 1 or n == 2: return 1`",
          "`return fibonacci(n - 1) + fibonacci(n - 2)`"
        ],
        solutionExplanation: "def fibonacci(n):\n    if n <= 2:\n        return 1\n    return fibonacci(n - 1) + fibonacci(n - 2)\n\nn = int(input())\nprint(fibonacci(n))"
      }
    },
    {
      id: "t9-l2",
      moduleId: "topic-9",
      moduleTitle: "Chủ đề 9: Đệ Quy",
      order: 2,
      title: "Bài 2: Đệ Quy Tính Tổng Từ 1 Đến n",
      description: "Viết hàm đệ quy tong_de_quy(n) tính tổng các số từ 1 đến n theo công thức S(n) = n + S(n - 1).",
      durationMin: 15,
      xpReward: 50,
      theory: {
        summary: "Tổng các số từ 1 đến n có thể phân rã thành: $S(n) = n + S(n - 1)$ với trường hợp dừng $S(1) = 1$.",
        keyPoints: [
          "Base case: `if n == 1: return 1`.",
          "Recursive step: `return n + tong_de_quy(n - 1)`."
        ],
        conceptIllustration: {
          type: "recursion",
          title: "Phân Rã Tổng Đệ Quy S(4)",
          description: "S(4) = 4 + S(3) = 4 + 3 + S(2) = 4 + 3 + 2 + S(1) = 4 + 3 + 2 + 1 = 10.",
          visualData: {
            baseCases: ["S(1) = 1"],
            recursiveFormula: "S(n) = n + S(n-1)",
            treeDepth: 4
          }
        },
        examples: [
          {
            title: "Ví dụ: S(5)",
            explanation: "1 + 2 + 3 + 4 + 5 = 15.",
            code: "def s(n):\n    return 1 if n == 1 else n + s(n - 1)\nprint(s(5))",
            output: "15"
          }
        ],
        multipleChoice: {
          question: "Để tính tổng 1 + 2 + ... + n bằng đệ quy, điều kiện cơ sở (dừng) nào là đúng?",
          options: ["if n == 0: return 1", "if n == 1: return 1", "if n > 1: return n", "if n == 10: return 10"],
          correctIndex: 1,
          explanation: "Khi n = 1, tổng chỉ gồm đúng 1 số nên trả về 1 để dừng đệ quy."
        }
      },
      practice: {
        id: "t9-p2",
        title: "Bài 2: Tính Tổng Từ 1 Đến n",
        difficulty: "Cơ bản",
        problemStatement: "Viết hàm đệ quy `tong_de_quy(n)` nhận vào số nguyên dương `n` ($1 \\le n \\le 500$) và trả về tổng $S = 1 + 2 + \\dots + n$.\nChương trình chính nhận `n` từ bàn phím, gọi hàm và in ra kết quả.",
        inputFormat: "Một dòng chứa số nguyên dương n.",
        outputFormat: "Một dòng in tổng S.",
        constraints: "1 <= n <= 500.",
        sampleCases: [
          {
            input: "5",
            output: "15",
            explanation: "1 + 2 + 3 + 4 + 5 = 15."
          },
          {
            input: "10",
            output: "55",
            explanation: "Tổng từ 1 đến 10 là 55."
          }
        ],
        starterCode: `# Định nghĩa hàm đệ quy tong_de_quy(n)
def tong_de_quy(n):
    # TODO: Cài đặt đệ quy tính tổng
    pass

n = int(input())
# TODO: In kết quả
`,
        testCases: [
          {
            id: "t9-2-tc1",
            input: "5",
            expectedOutput: "15",
            isHidden: false,
            explanation: "Kiểm tra n = 5."
          },
          {
            id: "t9-2-tc2",
            input: "10",
            expectedOutput: "55",
            isHidden: false,
            explanation: "Kiểm tra n = 10."
          },
          {
            id: "t9-2-tc3",
            input: "1",
            expectedOutput: "1",
            isHidden: true,
            explanation: "Kiểm tra n = 1."
          }
        ],
        hints: [
          "Nếu `n == 1: return 1`",
          "`return n + tong_de_quy(n - 1)`"
        ],
        solutionExplanation: "def tong_de_quy(n):\n    if n == 1:\n        return 1\n    return n + tong_de_quy(n - 1)\n\nn = int(input())\nprint(tong_de_quy(n))"
      }
    },
    {
      id: "t9-l3",
      moduleId: "topic-9",
      moduleTitle: "Chủ đề 9: Đệ Quy",
      order: 3,
      title: "Bài 3: Đệ Quy Tính Giai Thừa n!",
      description: "Viết hàm đệ quy giai_thua(n) tính n! theo công thức n! = n * (n - 1)! với 0! = 1.",
      durationMin: 15,
      xpReward: 50,
      theory: {
        summary: "Giai thừa của một số nguyên không âm $n$ được định nghĩa: $0! = 1, 1! = 1$ và $n! = n \\times (n - 1)!$ với mọi $n \\ge 1$.",
        keyPoints: [
          "Bài toán cơ sở: `if n == 0 or n == 1: return 1`.",
          "Bước đệ quy: `return n * giai_thua(n - 1)`."
        ],
        conceptIllustration: {
          type: "recursion",
          title: "Cơ Chế Tính 4! Bằng Đệ Quy",
          description: "4! = 4 * 3! = 4 * (3 * 2!) = 4 * 3 * (2 * 1!) = 4 * 3 * 2 * 1 = 24.",
          visualData: {
            baseCases: ["0! = 1", "1! = 1"],
            recursiveFormula: "n! = n * (n-1)!",
            treeDepth: 4
          }
        },
        examples: [
          {
            title: "Ví dụ: 5!",
            explanation: "5! = 5 * 4 * 3 * 2 * 1 = 120.",
            code: "def gt(n):\n    return 1 if n <= 1 else n * gt(n - 1)\nprint(gt(5))",
            output: "120"
          }
        ],
        multipleChoice: {
          question: "Giá trị của 0! (0 giai thừa) theo quy ước toán học là bao nhiêu?",
          options: ["0", "1", "Không xác định", "-1"],
          correctIndex: 1,
          explanation: "Theo định nghĩa toán học chuẩn, 0! = 1."
        }
      },
      practice: {
        id: "t9-p3",
        title: "Bài 3: Tính Giai Thừa",
        difficulty: "Cơ bản",
        problemStatement: "Viết hàm đệ quy `giai_thua(n)` nhận vào số nguyên không âm `n` ($0 \\le n \\le 20$) và trả về giá trị giai thừa $n!$.\nChương trình chính nhận `n` từ bàn phím, gọi hàm và in ra kết quả.",
        inputFormat: "Một dòng chứa số nguyên không âm n (0 <= n <= 20).",
        outputFormat: "Một dòng in ra giá trị n!.",
        constraints: "0 <= n <= 20.",
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
        starterCode: `# Định nghĩa hàm đệ quy giai_thua(n)
def giai_thua(n):
    # TODO: Cài đặt hàm tính giai thừa
    pass

n = int(input())
# TODO: In kết quả
`,
        testCases: [
          {
            id: "t9-3-tc1",
            input: "5",
            expectedOutput: "120",
            isHidden: false,
            explanation: "Kiểm tra 5!."
          },
          {
            id: "t9-3-tc2",
            input: "0",
            expectedOutput: "1",
            isHidden: false,
            explanation: "Kiểm tra 0!."
          },
          {
            id: "t9-3-tc3",
            input: "7",
            expectedOutput: "5040",
            isHidden: true,
            explanation: "Kiểm tra 7! = 5040."
          }
        ],
        hints: [
          "Nếu `n <= 1: return 1`",
          "`return n * giai_thua(n - 1)`"
        ],
        solutionExplanation: "def giai_thua(n):\n    if n <= 1:\n        return 1\n    return n * giai_thua(n - 1)\n\nn = int(input())\nprint(giai_thua(n))"
      }
    }
  ]
};
