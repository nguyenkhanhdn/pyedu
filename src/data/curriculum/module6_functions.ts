import { Module } from "../../types";

export const MODULE_6_FUNCTIONS: Module = {
  id: "module-6",
  title: "Chương 6: Hàm Trong Python (Functions & Reusability)",
  description: "Xây dựng tư duy module hóa trong lập trình: Định nghĩa hàm def, truyền tham số, giá trị trả về return, tham số mặc định và phạm vi biến cục bộ/toàn cục.",
  iconName: "Cpu",
  order: 6,
  color: "from-teal-500 to-cyan-700",
  lessons: [
    {
      id: "lesson-17",
      moduleId: "module-6",
      moduleTitle: "Chương 6: Hàm Trong Python",
      order: 1,
      title: "Bài 17: Định Nghĩa Hàm def, Tham Số & Giá Trị Trả Về return",
      description: "Học cách tự tạo hàm với từ khóa def, truyền tham số, sử dụng return để trả kết quả về nơi gọi và phân biệt phạm vi biến.",
      durationMin: 30,
      xpReward: 80,
      theory: {
        summary: "Hàm (Function) là một khối lệnh được đặt tên thực hiện một công việc cụ thể. Hàm giúp tái sử dụng mã nguồn, chia nhỏ chương trình thành các phần độc lập và dễ kiểm thử.",
        keyPoints: [
          "**Cú pháp định nghĩa hàm**:",
          "  ```python",
          "  def ten_ham(tham_so_1, tham_so_2):",
          "      # Các câu lệnh xử lý",
          "      return ket_qua",
          "  ```",
          "Lệnh `return` kết thúc việc thực thi hàm ngay lập tức và gửi giá trị kết quả về nơi gọi hàm.",
          "Nếu một hàm không có lệnh `return`, hàm đó ngầm định trả về `None`.",
          "**Phạm vi biến (Scope)**: Biến khai báo bên trong hàm là biến cục bộ (Local variable), chỉ tồn tại trong suốt thời gian hàm đang chạy."
        ],
        conceptIllustration: {
          type: "syntax",
          title: "Sơ đồ hoạt động của Hàm",
          description: "Đầu vào (Tham số) -> Thân hàm xử lý -> Đầu ra (return)",
          visualData: {
            codeSnippet: "def tinh_tong(a, b):\n    return a + b\n\nkq = tinh_tong(15, 25)\nprint(kq) # 40",
            outputPreview: "40",
            explanation: "Hàm nhận tham số a=15, b=25, tính a+b rồi trả về 40 cho biến kq."
          }
        },
        examples: [
          {
            title: "Ví dụ: Hàm tính diện tích hình tròn",
            explanation: "Hàm nhận bán kính r và trả về diện tích.",
            code: "def dien_tich_hinh_tron(r):\n    pi = 3.14\n    return pi * (r ** 2)\n\nprint(dien_tich_hinh_tron(5))",
            output: "78.5"
          }
        ],
        multipleChoice: {
          question: "Từ khóa nào trong Python dùng để bắt đầu định nghĩa một hàm mới?",
          options: [
            "function",
            "def",
            "fun",
            "define"
          ],
          correctIndex: 1,
          explanation: "Trong Python, từ khóa 'def' (viết tắt của define) dùng để khai báo định nghĩa hàm."
        }
      },
      practice: {
        id: "practice-17",
        title: "Thử thách 17: Xây Dựng Hàm Kiểm Tra Số Chính Phương",
        difficulty: "Trung bình",
        problemStatement: "Một số nguyên dương `n` được gọi là số chính phương nếu căn bậc hai của nó là một số nguyên (ví dụ: 1, 4, 9, 16, 25, 36, ...).\n\nEm hãy hoàn thiện hàm `is_square(n)` nhận vào số nguyên dương `n` và trả về `True` nếu `n` là số chính phương, ngược lại trả về `False`.\n\nSau đó nhập số nguyên `n` từ bàn phím và gọi hàm `is_square(n)` để in ra `YES` hoặc `NO`.",
        inputFormat: "Một dòng chứa số nguyên dương n (1 <= n <= 10^9).",
        outputFormat: "In ra `YES` nếu n là số chính phương, ngược lại in ra `NO`.",
        constraints: "1 <= n <= 10^9.",
        sampleCases: [
          {
            input: "25",
            output: "YES",
            explanation: "Căn bậc hai của 25 là 5 (5*5=25) nên 25 là số chính phương."
          },
          {
            input: "20",
            output: "NO",
            explanation: "20 không phải số chính phương."
          }
        ],
        starterCode: `# Định nghĩa hàm is_square(n)
def is_square(n):
    if n < 1:
        return False
    can = int(n ** 0.5)
    return can * can == n

# Chương trình chính
n = int(input())
if is_square(n):
    print("YES")
else:
    print("NO")
`,
        testCases: [
          {
            id: "tc17-1",
            input: "25",
            expectedOutput: "YES",
            isHidden: false,
            explanation: "25 là số chính phương (5^2)"
          },
          {
            id: "tc17-2",
            input: "20",
            expectedOutput: "NO",
            isHidden: false,
            explanation: "20 không phải chính phương"
          },
          {
            id: "tc17-3",
            input: "1",
            expectedOutput: "YES",
            isHidden: false,
            explanation: "1 là số chính phương (1^2)"
          },
          {
            id: "tc17-4",
            input: "1000000",
            expectedOutput: "YES",
            isHidden: true,
            explanation: "1000000 là số chính phương (1000^2)"
          },
          {
            id: "tc17-5",
            input: "999999",
            expectedOutput: "NO",
            isHidden: true,
            explanation: "999999 không phải chính phương"
          }
        ],
        hints: [
          "Tính căn bậc hai can = int(n ** 0.5).",
          "Kiểm tra can * can == n: nếu đúng thì return True, ngược lại return False.",
          "Gọi hàm if is_square(n): print(\"YES\") else: print(\"NO\")."
        ],
        solutionExplanation: "def is_square(n):\n    if n < 1: return False\n    r = int(n ** 0.5)\n    return r * r == n\n\nn = int(input())\nprint('YES' if is_square(n) else 'NO')"
      }
    }
  ]
};
