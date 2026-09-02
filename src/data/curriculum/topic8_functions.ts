import { Module } from "../../types";

export const TOPIC_8_FUNCTIONS: Module = {
  id: "topic-8",
  title: "Chủ đề 8: Hàm Function",
  description: "Học cách định nghĩa hàm với def, truyền tham số, giá trị trả về return, phạm vi biến local/global, docstring và kỹ thuật xử lý ngoại lệ try-except trong hàm.",
  iconName: "Code2",
  order: 8,
  color: "from-amber-500 to-yellow-700",
  lessons: [
    {
      id: "t8-l1",
      moduleId: "topic-8",
      moduleTitle: "Chủ đề 8: Hàm Function",
      order: 1,
      title: "Bài 1: Hàm Tính Tổng Hai Số",
      description: "Viết hàm tinh_tong(a, b) nhận hai số và trả về tổng của chúng kèm docstring mô tả.",
      durationMin: 15,
      xpReward: 50,
      theory: {
        summary: "Hàm (Function) là khối lệnh có tên, có thể tái sử dụng nhiều lần để thực hiện một tác vụ cụ thể. Khai báo bằng từ khóa `def` và trả về kết quả bằng `return`.",
        keyPoints: [
          "Cú pháp: `def ten_ham(tham_so_1, tham_so_2): ... return ket_qua`",
          "Lệnh `return` kết thúc hàm và chuyển giá trị kết quả về cho nơi gọi hàm."
        ],
        conceptIllustration: {
          type: "syntax",
          title: "Cơ Chế Gọi Hàm",
          description: "Đầu vào (a, b) -> Hàm tinh_tong -> Xử lý (a + b) -> return -> Kết quả",
          visualData: {
            codeSnippet: "def tinh_tong(a, b):\n    return a + b\n\nprint(tinh_tong(5, 7))",
            outputPreview: "12",
            explanation: "Gọi hàm tinh_tong với hai đối số 5 và 7 trả về 12."
          }
        },
        examples: [
          {
            title: "Ví dụ: Hàm cộng hai số",
            explanation: "Hàm nhận a, b và trả về a + b.",
            code: "def tinh_tong(a, b):\n    return a + b\n\nprint(tinh_tong(10, 20))",
            output: "30"
          }
        ],
        multipleChoice: {
          question: "Từ khóa nào trong Python dùng để định nghĩa một hàm mới?",
          options: ["function", "def", "func", "create"],
          correctIndex: 1,
          explanation: "Trong Python, từ khóa `def` (viết tắt của define) dùng để định nghĩa hàm."
        }
      },
      practice: {
        id: "t8-p1",
        title: "Bài 1: Hàm Tính Tổng",
        difficulty: "Cơ bản",
        problemStatement: "Viết hàm `tinh_tong(a, b)` nhận vào hai số nguyên `a` và `b` và trả về tổng của chúng. Chương trình chính sẽ đọc 2 số nguyên từ bàn phím (mỗi số trên 1 dòng), gọi hàm `tinh_tong(a, b)` và in kết quả ra màn hình.",
        inputFormat: "Gồm 2 dòng, mỗi dòng chứa một số nguyên a và b.",
        outputFormat: "Một dòng chứa kết quả tổng của a và b.",
        constraints: "-10^9 <= a, b <= 10^9.",
        sampleCases: [
          {
            input: "15\n25",
            output: "40",
            explanation: "15 + 25 = 40."
          }
        ],
        starterCode: `# Định nghĩa hàm tinh_tong(a, b)
def tinh_tong(a, b):
    # TODO: Trả về tổng của a và b
    pass

# Đọc dữ liệu đầu vào
x = int(input())
y = int(input())

# TODO: Gọi hàm và in kết quả
`,
        testCases: [
          {
            id: "t8-1-tc1",
            input: "15\n25",
            expectedOutput: "40",
            isHidden: false,
            explanation: "Kiểm tra 15 và 25."
          },
          {
            id: "t8-1-tc2",
            input: "-10\n30",
            expectedOutput: "20",
            isHidden: false,
            explanation: "Kiểm tra số âm."
          }
        ],
        hints: [
          "Trong hàm: `return a + b`",
          "Gọi hàm: `print(tinh_tong(x, y))`"
        ],
        solutionExplanation: "def tinh_tong(a, b):\n    return a + b\n\nx = int(input())\ny = int(input())\nprint(tinh_tong(x, y))"
      }
    },
    {
      id: "t8-l2",
      moduleId: "topic-8",
      moduleTitle: "Chủ đề 8: Hàm Function",
      order: 2,
      title: "Bài 2: Hàm Tính Hình Tròn (Chu Vi & Diện Tích)",
      description: "Viết hàm tinh_hinh_tron(r) nhận bán kính r và trả về tuple (chu_vi, dien_tich), làm tròn 2 chữ số thập phân.",
      durationMin: 20,
      xpReward: 60,
      theory: {
        summary: "Một hàm trong Python có thể trả về nhiều giá trị cùng lúc dưới dạng một `tuple` (bộ dữ liệu), ví dụ: `return chu_vi, dien_tich`.",
        keyPoints: [
          "Dùng `import math` để có `math.pi`.",
          "Hàm tính: `c = round(2 * math.pi * r, 2)` và `s = round(math.pi * (r ** 2), 2)`.",
          "`return c, s`"
        ],
        conceptIllustration: {
          type: "syntax",
          title: "Hàm Trả Về Nhiều Giá Trị",
          description: "r = 5 -> tinh_hinh_tron(r) -> (31.42, 78.54)",
          visualData: {
            codeSnippet: "def tinh_hinh_tron(r):\n    c = round(2 * math.pi * r, 2)\n    s = round(math.pi * r * r, 2)\n    return c, s\n\nc, s = tinh_hinh_tron(5)\nprint(c, s)",
            outputPreview: "31.42 78.54",
            explanation: "Trả về đồng thời chu vi và diện tích."
          }
        },
        examples: [
          {
            title: "Ví dụ: r = 5.0",
            explanation: "C = 31.42, S = 78.54.",
            code: "c, s = 31.42, 78.54\nprint(f'{c:.2f} {s:.2f}')",
            output: "31.42 78.54"
          }
        ],
        multipleChoice: {
          question: "Để một hàm trong Python trả về đồng thời 2 giá trị x và y, cú pháp nào đúng?",
          options: ["return (x, y)", "return x; return y", "return [x and y]", "return x -> y"],
          correctIndex: 0,
          explanation: "return (x, y) hoặc return x, y sẽ trả về một tuple chứa cả hai giá trị."
        }
      },
      practice: {
        id: "t8-p2",
        title: "Bài 2: Hàm Tính Hình Tròn",
        difficulty: "Trung bình",
        problemStatement: "Viết hàm `tinh_hinh_tron(r)` nhận bán kính `r` (số thực dương) và trả về 2 giá trị là `chu_vi` và `dien_tich` của hình tròn được làm tròn đến đúng 2 chữ số thập phân (sử dụng `math.pi`).\n\nChương trình chính nhận `r` từ bàn phím, gọi hàm và in ra 2 số trên cùng 1 dòng cách nhau bởi dấu cách.",
        inputFormat: "Một dòng chứa số thực dương r.",
        outputFormat: "Một dòng in chu vi và diện tích (2 chữ số thập phân, cách nhau 1 khoảng trắng).",
        constraints: "0 < r <= 1000.",
        sampleCases: [
          {
            input: "5.0",
            output: "31.42 78.54",
            explanation: "Chu vi = 31.42, Diện tích = 78.54."
          }
        ],
        starterCode: `import math

def tinh_hinh_tron(r):
    # TODO: Tính chu vi và diện tích, trả về 2 giá trị
    pass

r = float(input())
# TODO: Gọi hàm và in kết quả định dạng 2 chữ số thập phân
`,
        testCases: [
          {
            id: "t8-2-tc1",
            input: "5.0",
            expectedOutput: "31.42 78.54",
            isHidden: false,
            explanation: "Kiểm tra r = 5.0."
          },
          {
            id: "t8-2-tc2",
            input: "10.0",
            expectedOutput: "62.83 314.16",
            isHidden: false,
            explanation: "Kiểm tra r = 10.0."
          }
        ],
        hints: [
          "Trong hàm: `c = 2 * math.pi * r` và `s = math.pi * r * r`",
          "`return round(c, 2), round(s, 2)`",
          "In ra: `c, s = tinh_hinh_tron(r); print(f\"{c:.2f} {s:.2f}\")`"
        ],
        solutionExplanation: "import math\n\ndef tinh_hinh_tron(r):\n    c = round(2 * math.pi * r, 2)\n    s = round(math.pi * (r ** 2), 2)\n    return c, s\n\nr = float(input())\nc, s = tinh_hinh_tron(r)\nprint(f'{c:.2f} {s:.2f}')"
      }
    },
    {
      id: "t8-l3",
      moduleId: "topic-8",
      moduleTitle: "Chủ đề 8: Hàm Function",
      order: 3,
      title: "Bài 3: Hàm Kiểm Tra Số Chẵn is_even(n)",
      description: "Viết hàm is_even(n) nhận một số nguyên và trả về True nếu chẵn, False nếu lẻ.",
      durationMin: 15,
      xpReward: 50,
      theory: {
        summary: "Hàm kiểm tra logic (Predicate Function) thường có tiền tố `is_` và trả về giá trị boolean `True` hoặc `False`.",
        keyPoints: [
          "Định nghĩa: `def is_even(n): return n % 2 == 0`",
          "Hàm boolean rất gọn gàng và dễ kết hợp trong các điều kiện logic."
        ],
        conceptIllustration: {
          type: "syntax",
          title: "Hàm Boolean is_even",
          description: "n = 10 -> is_even(10) -> True | n = 7 -> is_even(7) -> False",
          visualData: {
            codeSnippet: "def is_even(n):\n    return n % 2 == 0\n\nprint(is_even(10))",
            outputPreview: "True",
            explanation: "Trả về True nếu n chia hết cho 2."
          }
        },
        examples: [
          {
            title: "Ví dụ: Kiểm tra 14",
            explanation: "14 % 2 == 0 -> True.",
            code: "def is_even(n):\n    return n % 2 == 0\nprint(is_even(14))",
            output: "True"
          }
        ],
        multipleChoice: {
          question: "Biểu thức trả về trong hàm `def is_even(n): return ...` nào ngắn gọn và chính xác nhất?",
          options: ["if n % 2 == 0: return True else: return False", "n % 2 == 0", "n / 2 == 0", "True if n % 2 != 0 else False"],
          correctIndex: 1,
          explanation: "return n % 2 == 0 tự động trả về giá trị True hoặc False một cách ngắn gọn và tối ưu."
        }
      },
      practice: {
        id: "t8-p3",
        title: "Bài 3: Hàm Kiểm Tra Số Chẵn",
        difficulty: "Cơ bản",
        problemStatement: "Viết hàm `is_even(n)` nhận vào một số nguyên `n` và trả về `True` nếu `n` là số chẵn, `False` nếu `n` là số lẻ.\nChương trình chính nhận `n` từ bàn phím, gọi hàm và in ra kết quả boolean.",
        inputFormat: "Một dòng chứa số nguyên n.",
        outputFormat: "In ra `True` hoặc `False`.",
        constraints: "-10^9 <= n <= 10^9.",
        sampleCases: [
          {
            input: "12",
            output: "True",
            explanation: "12 là số chẵn."
          },
          {
            input: "7",
            output: "False",
            explanation: "7 là số lẻ."
          }
        ],
        starterCode: `# Định nghĩa hàm is_even(n)
def is_even(n):
    # TODO: Trả về True nếu n chẵn, False nếu n lẻ
    pass

n = int(input())
# TODO: In kết quả gọi hàm
`,
        testCases: [
          {
            id: "t8-3-tc1",
            input: "12",
            expectedOutput: "True",
            isHidden: false,
            explanation: "Kiểm tra 12."
          },
          {
            id: "t8-3-tc2",
            input: "7",
            expectedOutput: "False",
            isHidden: false,
            explanation: "Kiểm tra 7."
          },
          {
            id: "t8-3-tc3",
            input: "-4",
            expectedOutput: "True",
            isHidden: true,
            explanation: "Kiểm tra số chẵn âm."
          }
        ],
        hints: [
          "`def is_even(n): return n % 2 == 0`",
          "`print(is_even(n))`"
        ],
        solutionExplanation: "def is_even(n):\n    return n % 2 == 0\n\nn = int(input())\nprint(is_even(n))"
      }
    },
    {
      id: "t8-l4",
      moduleId: "topic-8",
      moduleTitle: "Chủ đề 8: Hàm Function",
      order: 4,
      title: "Bài 4: Hàm Chuẩn Hóa Họ Tên chuan_hoa(name)",
      description: "Viết hàm chuan_hoa(name) nhận một chuỗi họ tên bất kỳ và trả về chuỗi họ tên đã được chuẩn hóa.",
      durationMin: 20,
      xpReward: 60,
      theory: {
        summary: "Đóng gói thuật toán chuẩn hóa họ tên vào một hàm giúp mã nguồn sạch sẽ, dễ bảo trì và có thể gọi lại ở nhiều nơi trong chương trình.",
        keyPoints: [
          "Định nghĩa: `def chuan_hoa(name): ... return ' '.join(w.capitalize() for w in name.split())`",
          "Hàm nhận vào chuỗi `name` và trả về chuỗi họ tên chuẩn."
        ],
        conceptIllustration: {
          type: "syntax",
          title: "Đóng Gói Hàm Chuẩn Hóa",
          description: "chuan_hoa('  nguyen   an ') -> 'Nguyen An'",
          visualData: {
            codeSnippet: "def chuan_hoa(name):\n    return ' '.join(w.capitalize() for w in name.split())\n\nprint(chuan_hoa('  le   hoang '))",
            outputPreview: "Le Hoang",
            explanation: "Tái sử dụng hàm chuẩn hóa."
          }
        },
        examples: [
          {
            title: "Ví dụ: Chuẩn hóa",
            explanation: "Gọi hàm chuan_hoa với chuỗi thô.",
            code: "def chuan_hoa(name):\n    return ' '.join(w.capitalize() for w in name.split())\nprint(chuan_hoa('tran  duc  anh'))",
            output: "Tran Duc Anh"
          }
        ],
        multipleChoice: {
          question: "Lợi ích chính của việc viết logic xử lý vào một hàm là gì?",
          options: [
            "Làm chương trình chạy chậm hơn",
            "Tái sử dụng mã nguồn và dễ quản lý, bảo trì",
            "Bắt buộc trong Python không có hàm sẽ không chạy được",
            "Giảm dung lượng RAM sử dụng"
          ],
          correctIndex: 1,
          explanation: "Hàm giúp tái sử dụng mã nguồn (DRY - Don't Repeat Yourself), cấu trúc mã rõ ràng và dễ bảo trì."
        }
      },
      practice: {
        id: "t8-p4",
        title: "Bài 4: Hàm Chuẩn Hóa Họ Tên",
        difficulty: "Trung bình",
        problemStatement: "Viết hàm `chuan_hoa(name)` nhận vào một chuỗi họ tên `name` và trả về chuỗi họ tên đã được chuẩn hóa (loại bỏ khoảng trắng thừa, viết hoa chữ cái đầu mỗi từ). Chương trình chính sẽ nhận chuỗi từ bàn phím, gọi hàm `chuan_hoa` và in kết quả.",
        inputFormat: "Một dòng chứa chuỗi họ tên ban đầu.",
        outputFormat: "Một dòng chứa họ tên sau khi chuẩn hóa.",
        constraints: "Chuỗi có độ dài không quá 200 ký tự.",
        sampleCases: [
          {
            input: "  hoang   vAn   duC  ",
            output: "Hoang Van Duc",
            explanation: "Chuẩn hóa thành Hoang Van Duc."
          }
        ],
        starterCode: `# Định nghĩa hàm chuan_hoa(name)
def chuan_hoa(name):
    # TODO: Chuẩn hóa và trả về chuỗi kết quả
    pass

s = input()
# TODO: Gọi hàm và in kết quả
`,
        testCases: [
          {
            id: "t8-4-tc1",
            input: "  hoang   vAn   duC  ",
            expectedOutput: "Hoang Van Duc",
            isHidden: false,
            explanation: "Kiểm tra mẫu 1."
          },
          {
            id: "t8-4-tc2",
            input: "VO   THI   SAU",
            expectedOutput: "Vo Thi Sau",
            isHidden: false,
            explanation: "Kiểm tra mẫu 2."
          }
        ],
        hints: [
          "Trong hàm: `return ' '.join(w.capitalize() for w in name.split())`",
          "`print(chuan_hoa(s))`"
        ],
        solutionExplanation: "def chuan_hoa(name):\n    return ' '.join(w.capitalize() for w in name.split())\n\ns = input()\nprint(chuan_hoa(s))"
      }
    },
    {
      id: "t8-l5",
      moduleId: "topic-8",
      moduleTitle: "Chủ đề 8: Hàm Function",
      order: 5,
      title: "Bài 5: Hàm Nhập Số An Toàn Bằng try/except",
      description: "Viết hàm nhap_so_hop_le(min_val, max_val) sử dụng try/except để xử lý lỗi nhập liệu và kiểm tra khoảng giá trị.",
      durationMin: 20,
      xpReward: 60,
      theory: {
        summary: "Khối `try ... except ValueError` giúp chương trình không bị dừng đột ngột (crash) khi người dùng nhập chuỗi ký tự chữ cái vào vị trí yêu cầu số nguyên.",
        keyPoints: [
          "Cấu trúc: `try: val = int(raw_input) ... except ValueError: in lỗi và nhập lại`.",
          "Kết hợp kiểm tra `min_val <= val <= max_val`."
        ],
        conceptIllustration: {
          type: "syntax",
          title: "Xử Lý Lỗi Bằng try / except",
          description: "Nhập 'abc' -> try: int('abc') gây lỗi ValueError -> except bắt lỗi -> Báo lỗi và cho nhập lại an toàn.",
          visualData: {
            codeSnippet: "try:\n    x = int(input())\nexcept ValueError:\n    print('Khong phai so hop le!')",
            outputPreview: "Khong phai so hop le!",
            explanation: "Bắt ngoại lệ an toàn."
          }
        },
        examples: [
          {
            title: "Ví dụ: Bắt lỗi nhập chuỗi",
            explanation: "Nhập 'tin_hoc' sẽ nhảy vào khối except.",
            code: "# Input: 'abc' -> Exception ValueError caught",
            output: "Loi nhap lieu"
          }
        ],
        multipleChoice: {
          question: "Ngoại lệ nào sinh ra trong Python khi cố gắng chuyển đổi chuỗi 'hello' sang số nguyên bằng int('hello')?",
          options: ["TypeError", "ValueError", "KeyError", "IndexError"],
          correctIndex: 1,
          explanation: "int('hello') gây ra ngoại lệ ValueError vì giá trị chuỗi không thể phân tích cú pháp thành số."
        }
      },
      practice: {
        id: "t8-p5",
        title: "Bài 5: Hàm Nhập Số An Toàn",
        difficulty: "Trung bình",
        problemStatement: "Viết hàm `nhap_so_hop_le(min_val, max_val)` liên tục đọc các dòng dữ liệu từ đầu vào cho đến khi gặp một giá trị là số nguyên hợp lệ và nằm trong đoạn `[min_val, max_val]`. Sử dụng `try / except ValueError` để bắt lỗi nếu dữ liệu không phải là số.\n\nChương trình chính nhận 2 số nguyên `min_val` và `max_val` trên 2 dòng đầu tiên, sau đó gọi hàm và in ra:\n`Gia tri hop le: <so_hop_le>`",
        inputFormat: "Dòng 1: min_val; Dòng 2: max_val. Các dòng tiếp theo là dữ liệu nhập thử.",
        outputFormat: "Một dòng: `Gia tri hop le: <so_hop_le>`",
        constraints: "-1000 <= min_val <= max_val <= 1000.",
        sampleCases: [
          {
            input: "1\n10\nabc\n15\n-3\n7",
            output: "Gia tri hop le: 7",
            explanation: "'abc' không phải số, 15 và -3 ngoài [1, 10]. Số 7 hợp lệ."
          }
        ],
        starterCode: `def nhap_so_hop_le(min_val, max_val):
    # TODO: Dùng while và try-except để đọc số hợp lệ
    pass

min_val = int(input())
max_val = int(input())
res = nhap_so_hop_le(min_val, max_val)
print(f"Gia tri hop le: {res}")
`,
        testCases: [
          {
            id: "t8-5-tc1",
            input: "1\n10\nabc\n15\n-3\n7",
            expectedOutput: "Gia tri hop le: 7",
            isHidden: false,
            explanation: "Kiểm tra bắt lỗi chuỗi và ngoài khoảng."
          },
          {
            id: "t8-5-tc2",
            input: "10\n50\n50",
            expectedOutput: "Gia tri hop le: 50",
            isHidden: false,
            explanation: "Kiểm tra trúng biên max."
          }
        ],
        hints: [
          "Dùng `while True:`",
          "`try: val = int(input()); if min_val <= val <= max_val: return val`",
          "`except ValueError: continue`"
        ],
        solutionExplanation: "def nhap_so_hop_le(min_val, max_val):\n    while True:\n        try:\n            val = int(input())\n            if min_val <= val <= max_val:\n                return val\n        except ValueError:\n            continue\n\nmin_val = int(input())\nmax_val = int(input())\nres = nhap_so_hop_le(min_val, max_val)\nprint(f'Gia tri hop le: {res}')"
      }
    }
  ]
};
