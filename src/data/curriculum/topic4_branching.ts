import { Module, LessonPractice } from "../../types";
import { BRANCHING_EXTRA_PROBLEMS } from "../problems/branching_extra";

const toPractice = (p: any): LessonPractice => ({
  id: p.id,
  title: p.title,
  difficulty: p.difficulty === 'Dễ' ? 'Cơ bản' : p.difficulty === 'Trung bình' ? 'Trung bình' : 'Nâng cao',
  problemStatement: p.problemStatement,
  inputFormat: p.inputFormat,
  outputFormat: p.outputFormat,
  constraints: p.constraints,
  sampleCases: p.sampleCases,
  starterCode: p.starterCode,
  hints: p.hints,
  solutionExplanation: p.solutionExplanation,
  testCases: p.testCases
});

export const TOPIC_4_BRANCHING: Module = {
  id: "topic-4",
  title: "Chủ đề 4: Cấu Trúc Rẽ Nhánh if / elif / else",
  description: "Làm chủ cấu trúc rẽ nhánh if đơn, if-else, chuỗi if-elif-else, toán tử logic (and, or, not) và ứng dụng phân loại điều kiện từ cơ bản đến nâng cao.",
  iconName: "GitFork",
  order: 4,
  color: "from-purple-500 to-indigo-700",
  lessons: [
    // ----------------------------------------------------
    // BÀI 1: CẤU TRÚC IF ĐƠN
    // ----------------------------------------------------
    {
      id: "t4-l1",
      moduleId: "topic-4",
      moduleTitle: "Chủ đề 4: Cấu Trúc Rẽ Nhánh if / elif / else",
      order: 1,
      title: "Bài 1: Cấu Trúc if Đơn (Cơ Bản)",
      description: "Làm quen với câu lệnh rẽ nhánh if đơn, quy tắc thụt lề 4 dấu cách và các toán tử so sánh (==, !=, >, <, >=, <=).",
      durationMin: 15,
      xpReward: 50,
      theory: {
        summary: "**`if`** chỉ chạy khối lệnh khi điều kiện **đúng** (`True`); sai thì **bỏ qua**.",
        keyPoints: [
          "Cú pháp: `if dieu_kien:` — nhớ dấu **`:`** cuối dòng.",
          "Lệnh bên trong `if` phải **thụt lề 4 dấu cách**.",
          "So sánh: `==` (bằng), `!=` (khác), `>`, `<`, `>=`, `<=`",
          "Lưu ý: `==` là **so sánh**, `=` là **gán**."
        ],
        conceptIllustration: {
          type: "branching",
          title: "Sơ Đồ Câu Lệnh if Đơn",
          description: "Điều kiện: Nếu Đúng (True) -> Thực hiện khối lệnh con; Nếu Sai (False) -> Bỏ qua và đi tiếp.",
          visualData: {
            condition: "n > 0",
            ifTrue: "In ra 'So duong'",
            ifFalse: "Bỏ qua, tiếp tục chương trình"
          }
        },
        examples: [
          {
            title: "Ví dụ: Kiểm tra số dương",
            explanation: "Nhập một số nguyên n, nếu n lớn hơn 0 thì in 'So duong'.",
            code: "n = int(input())\nif n > 0:\n    print('So duong')",
            output: "Đầu vào: 5 -> Đầu ra: So duong"
          },
          {
            title: "Ví dụ: Điều kiện sai",
            explanation: "Điều kiện `False` thì khối lệnh bị bỏ qua.",
            code: "n = -3\nif n > 0:\n    print('So duong')\nprint('Het')",
            output: "Het"
          },
          {
            title: "Ví dụ: Các toán tử so sánh",
            explanation: "`==`, `!=`, `>`, `<`, `>=`, `<=`.",
            code: "a = 5\nprint(a == 5, a != 5)\nprint(a > 3, a < 3)\nprint(a >= 5, a <= 4)",
            output: "True False\nTrue False\nTrue False"
          },
          {
            title: "Ví dụ: Nhiều lệnh trong if",
            explanation: "Mọi lệnh thụt lề 4 dấu cách đều thuộc `if`.",
            code: "diem = 9\nif diem >= 8:\n    print('Gioi')\n    print('Chuc mung!')",
            output: "Gioi\nChuc mung!"
          }
        ],
        multipleChoice: {
          question: "Trong Python, toán tử nào dùng để kiểm tra hai giá trị có BẰNG NHAU hay không?",
          options: ["=", "==", "===", "equals"],
          correctIndex: 1,
          explanation: "Dấu '=' là phép gán giá trị, còn '==' là toán tử so sánh bằng trong Python."
        }
      },
      practice: {
        id: "t4-p1",
        title: "Bài 1: Kiểm Tra Số Dương",
        difficulty: "Cơ bản",
        problemStatement: "Viết chương trình nhập vào một số nguyên `n` từ bàn phím. Sử dụng câu lệnh `if` để kiểm tra: nếu `n > 0` thì in ra màn hình chuỗi `So duong`. Ngược lại, nếu số không lớn hơn 0 thì không in gì cả.",
        inputFormat: "Một dòng duy nhất chứa số nguyên n (-1000 <= n <= 1000).",
        outputFormat: "In 'So duong' nếu n > 0, ngược lại không in gì.",
        constraints: "-1000 <= n <= 1000.",
        sampleCases: [
          {
            input: "5",
            output: "So duong",
            explanation: "5 > 0 nên in 'So duong'."
          },
          {
            input: "-3",
            output: "",
            explanation: "-3 <= 0 nên không in gì."
          }
        ],
        starterCode: `# Nhập số nguyên n
n = int(input())

# TODO: Dùng if để kiểm tra n > 0 và in "So duong"
`,
        testCases: [
          {
            id: "t4-1-tc1",
            input: "5",
            expectedOutput: "So duong",
            isHidden: false,
            explanation: "Kiểm tra số dương."
          },
          {
            id: "t4-1-tc2",
            input: "-3",
            expectedOutput: "",
            isHidden: false,
            explanation: "Kiểm tra số âm."
          },
          {
            id: "t4-1-tc3",
            input: "0",
            expectedOutput: "",
            isHidden: true,
            explanation: "Số 0 không lớn hơn 0."
          },
          {
            id: "t4-1-tc4",
            input: "100",
            expectedOutput: "So duong",
            isHidden: true,
            explanation: "Kiểm tra số 100."
          }
        ],
        hints: [
          "Dùng lệnh: `if n > 0:`",
          "Thụt lề 4 dấu cách và in: `print('So duong')`"
        ],
        solutionExplanation: "n = int(input())\nif n > 0:\n    print('So duong')"
      },
      practices: [
        {
          id: "t4-p1",
          title: "Bài 1: Kiểm Tra Số Dương",
          difficulty: "Cơ bản",
          problemStatement: "Viết chương trình nhập vào một số nguyên `n` từ bàn phím. Sử dụng câu lệnh `if` để kiểm tra: nếu `n > 0` thì in ra màn hình chuỗi `So duong`. Ngược lại, nếu số không lớn hơn 0 thì không in gì cả.",
          inputFormat: "Một dòng duy nhất chứa số nguyên n (-1000 <= n <= 1000).",
          outputFormat: "In 'So duong' nếu n > 0, ngược lại không in gì.",
          constraints: "-1000 <= n <= 1000.",
          sampleCases: [
            {
              input: "5",
              output: "So duong",
              explanation: "5 > 0 nên in 'So duong'."
            },
            {
              input: "-3",
              output: "",
              explanation: "-3 <= 0 nên không in gì."
            }
          ],
          starterCode: `# Nhập số nguyên n\nn = int(input())\n\n# TODO: Dùng if để kiểm tra n > 0 và in "So duong"\n`,
          testCases: [
            {
              id: "t4-1-tc1",
              input: "5",
              expectedOutput: "So duong",
              isHidden: false,
              explanation: "Kiểm tra số dương."
            },
            {
              id: "t4-1-tc2",
              input: "-3",
              expectedOutput: "",
              isHidden: false,
              explanation: "Kiểm tra số âm."
            },
            {
              id: "t4-1-tc3",
              input: "0",
              expectedOutput: "",
              isHidden: true,
              explanation: "Số 0 không lớn hơn 0."
            },
            {
              id: "t4-1-tc4",
              input: "100",
              expectedOutput: "So duong",
              isHidden: true,
              explanation: "Kiểm tra số 100."
            }
          ],
          hints: [
            "Dùng lệnh: `if n > 0:`",
            "Thụt lề 4 dấu cách và in: `print('So duong')`"
          ],
          solutionExplanation: "n = int(input())\nif n > 0:\n    print('So duong')"
        },
        ...BRANCHING_EXTRA_PROBLEMS.slice(0, 7).map(toPractice)
      ]
    },

    // ----------------------------------------------------
    // BÀI 2: CẤU TRÚC IF - ELSE
    // ----------------------------------------------------
    {
      id: "t4-l2",
      moduleId: "topic-4",
      moduleTitle: "Chủ đề 4: Cấu Trúc Rẽ Nhánh if / elif / else",
      order: 2,
      title: "Bài 2: Cấu Trúc if ... else (Chọn Một Trong Hai)",
      description: "Học cách xử lý hai trường hợp loại trừ nhau với cấu trúc if ... else: chẵn hay lẻ, đậu hay rớt, lớn hay bé.",
      durationMin: 20,
      xpReward: 60,
      theory: {
        summary: "**`if ... else`** chọn **1 trong 2** nhánh: đúng → `if`, sai → `else`.",
        keyPoints: [
          "Cú pháp: `if dieu_kien:` … `else:`",
          "`else:` **không có điều kiện**, vẫn có dấu `:`.",
          "Số chẵn: `n % 2 == 0`; ngược lại là số lẻ."
        ],
        conceptIllustration: {
          type: "branching",
          title: "Sơ Đồ Rẽ Nhánh if ... else",
          description: "Điều kiện: True -> Khối if | False -> Khối else.",
          visualData: {
            condition: "n % 2 == 0",
            ifTrue: "In ra 'So chan'",
            ifFalse: "In ra 'So le'"
          }
        },
        examples: [
          {
            title: "Ví dụ: Kiểm tra chẵn hay lẻ",
            explanation: "Nếu n chia hết cho 2 in 'So chan', ngược lại in 'So le'.",
            code: "n = int(input())\nif n % 2 == 0:\n    print('So chan')\nelse:\n    print('So le')",
            output: "Đầu vào: 4 -> Đầu ra: So chan\nĐầu vào: 7 -> Đầu ra: So le"
          },
          {
            title: "Ví dụ: Đỗ hay trượt",
            explanation: "Điểm ≥ 5 là đỗ, ngược lại là trượt.",
            code: "diem = 4\nif diem >= 5:\n    print('Do')\nelse:\n    print('Truot')",
            output: "Truot"
          },
          {
            title: "Ví dụ: Số lớn hơn",
            explanation: "So sánh hai số và in số lớn hơn.",
            code: "a = 7\nb = 12\nif a > b:\n    print(a)\nelse:\n    print(b)",
            output: "12"
          }
        ],
        multipleChoice: {
          question: "Trong câu lệnh if ... else, khối lệnh sau từ khóa else được thực thi khi nào?",
          options: [
            "Khi điều kiện if nhận giá trị True",
            "Khi điều kiện if nhận giá trị False",
            "Luôn luôn được thực thi trong mọi trường hợp",
            "Chỉ khi chương trình gặp lỗi"
          ],
          correctIndex: 1,
          explanation: "Khối lệnh else chỉ được thực thi khi biểu thức điều kiện của if trả về False."
        }
      },
      practice: {
        id: "t4-p2",
        title: "Bài 2: Chẵn Hay Lẻ",
        difficulty: "Cơ bản",
        problemStatement: "Viết chương trình nhập vào một số nguyên `n`. Sử dụng cấu trúc `if ... else` để kiểm tra:\n- Nếu `n` là số chẵn (chia hết cho 2): in ra `So chan`.\n- Ngược lại (n là số lẻ): in ra `So le`.",
        inputFormat: "Một dòng chứa một số nguyên n (-10^6 <= n <= 10^6).",
        outputFormat: "In 'So chan' hoặc 'So le'.",
        constraints: "-10^6 <= n <= 10^6.",
        sampleCases: [
          {
            input: "8",
            output: "So chan",
            explanation: "8 chia hết cho 2 -> So chan."
          },
          {
            input: "7",
            output: "So le",
            explanation: "7 chia 2 dư 1 -> So le."
          }
        ],
        starterCode: `# Nhập số nguyên n
n = int(input())

# TODO: Dùng if ... else kiểm tra chẵn hay lẻ
`,
        testCases: [
          {
            id: "t4-2-tc1",
            input: "8",
            expectedOutput: "So chan",
            isHidden: false,
            explanation: "Kiểm tra 8 chẵn."
          },
          {
            id: "t4-2-tc2",
            input: "7",
            expectedOutput: "So le",
            isHidden: false,
            explanation: "Kiểm tra 7 lẻ."
          },
          {
            id: "t4-2-tc3",
            input: "0",
            expectedOutput: "So chan",
            isHidden: true,
            explanation: "0 chia hết cho 2 là số chẵn."
          },
          {
            id: "t4-2-tc4",
            input: "-5",
            expectedOutput: "So le",
            isHidden: true,
            explanation: "-5 là số lẻ."
          }
        ],
        hints: [
          "Dùng toán tử `% 2`: `if n % 2 == 0:`",
          "Khối else: `else: print('So le')`"
        ],
        solutionExplanation: "n = int(input())\nif n % 2 == 0:\n    print('So chan')\nelse:\n    print('So le')"
      },
      practices: [
        {
          id: "t4-p2",
          title: "Bài 2: Chẵn Hay Lẻ",
          difficulty: "Cơ bản",
          problemStatement: "Viết chương trình nhập vào một số nguyên `n`. Sử dụng cấu trúc `if ... else` để kiểm tra:\n- Nếu `n` là số chẵn (chia hết cho 2): in ra `So chan`.\n- Ngược lại (n là số lẻ): in ra `So le`.",
          inputFormat: "Một dòng chứa một số nguyên n (-10^6 <= n <= 10^6).",
          outputFormat: "In 'So chan' hoặc 'So le'.",
          constraints: "-10^6 <= n <= 10^6.",
          sampleCases: [
            {
              input: "8",
              output: "So chan",
              explanation: "8 chia hết cho 2 -> So chan."
            },
            {
              input: "7",
              output: "So le",
              explanation: "7 chia 2 dư 1 -> So le."
            }
          ],
          starterCode: `# Nhập số nguyên n\nn = int(input())\n\n# TODO: Dùng if ... else kiểm tra chẵn hay lẻ\n`,
          testCases: [
            {
              id: "t4-2-tc1",
              input: "8",
              expectedOutput: "So chan",
              isHidden: false,
              explanation: "Kiểm tra 8 chẵn."
            },
            {
              id: "t4-2-tc2",
              input: "7",
              expectedOutput: "So le",
              isHidden: false,
              explanation: "Kiểm tra 7 lẻ."
            },
            {
              id: "t4-2-tc3",
              input: "0",
              expectedOutput: "So chan",
              isHidden: true,
              explanation: "0 chia hết cho 2 là số chẵn."
            },
            {
              id: "t4-2-tc4",
              input: "-5",
              expectedOutput: "So le",
              isHidden: true,
              explanation: "-5 là số lẻ."
            }
          ],
          hints: [
            "Dùng toán tử `% 2`: `if n % 2 == 0:`",
            "Khối else: `else: print('So le')`"
          ],
          solutionExplanation: "n = int(input())\nif n % 2 == 0:\n    print('So chan')\nelse:\n    print('So le')"
        },
        ...BRANCHING_EXTRA_PROBLEMS.slice(7, 15).map(toPractice)
      ]
    },

    // ----------------------------------------------------
    // BÀI 3: CẤU TRÚC IF - ELIF - ELSE
    // ----------------------------------------------------
    {
      id: "t4-l3",
      moduleId: "topic-4",
      moduleTitle: "Chủ đề 4: Cấu Trúc Rẽ Nhánh if / elif / else",
      order: 3,
      title: "Bài 3: Cấu Trúc if ... elif ... else (Nhiều Trường Hợp)",
      description: "Xử lý đa nhánh phân loại với chuỗi if - elif - else: phân loại số dương/âm/bằng 0, xếp loại học lực, đánh giá nhiệt độ.",
      durationMin: 20,
      xpReward: 60,
      theory: {
        summary: "**`if ... elif ... else`** kiểm tra **lần lượt** nhiều điều kiện; **đúng nhánh nào dừng ở nhánh đó**.",
        keyPoints: [
          "Cú pháp: `if` → nhiều `elif` → `else`",
          "Có thể có **nhiều `elif`**.",
          "**Thứ tự điều kiện quan trọng**: kiểm tra điều kiện cụ thể trước."
        ],
        conceptIllustration: {
          type: "branching",
          title: "Sơ Đồ Chuỗi if - elif - else",
          description: "n > 0 -> So duong | n < 0 -> So am | Còn lại -> Bang 0",
          visualData: {
            condition: "n > 0 ? 'So duong' : (n < 0 ? 'So am' : 'Bang 0')",
            ifTrue: "In kết quả tương ứng",
            ifFalse: "Kiểm tra điều kiện kế tiếp"
          }
        },
        examples: [
          {
            title: "Ví dụ: Số dương, âm hay bằng 0",
            explanation: "Kiểm tra 3 trường hợp của một số nguyên n.",
            code: "n = int(input())\nif n > 0:\n    print('So duong')\nelif n < 0:\n    print('So am')\nelse:\n    print('Bang 0')",
            output: "Đầu vào: -4 -> Đầu ra: So am"
          },
          {
            title: "Ví dụ: Xếp loại điểm",
            explanation: "Kiểm tra từ điều kiện cao đến thấp.",
            code: "diem = 7.2\nif diem >= 8:\n    print('Gioi')\nelif diem >= 6.5:\n    print('Kha')\nelif diem >= 5:\n    print('Trung binh')\nelse:\n    print('Yeu')",
            output: "Kha"
          },
          {
            title: "Ví dụ: Thứ tự điều kiện quan trọng",
            explanation: "Sai thứ tự sẽ cho kết quả sai: 9 vẫn khớp `>= 5` trước.",
            code: "diem = 9\nif diem >= 5:\n    print('Trung binh')  # sai thu tu!\nelif diem >= 8:\n    print('Gioi')",
            output: "Trung binh"
          }
        ],
        multipleChoice: {
          question: "Trong Python, từ khóa nào dùng để kiểm tra điều kiện bổ sung nếu lệnh if trước đó nhận False?",
          options: ["else if", "elif", "elseif", "case"],
          correctIndex: 1,
          explanation: "Từ khóa chuẩn trong Python là elif (viết tắt của else if)."
        }
      },
      practice: {
        id: "t4-p3",
        title: "Bài 3: Số Dương, Âm Hay Bằng 0",
        difficulty: "Cơ bản",
        problemStatement: "Viết chương trình nhập vào một số nguyên `n`. Sử dụng cấu trúc `if ... elif ... else` để phân loại và in ra:\n- Nếu `n > 0`: in ra `So duong`\n- Nếu `n < 0`: in ra `So am`\n- Nếu `n == 0`: in ra `Bang 0`",
        inputFormat: "Một dòng chứa số nguyên n (-10^6 <= n <= 10^6).",
        outputFormat: "In 'So duong', 'So am' hoặc 'Bang 0'.",
        constraints: "-10^6 <= n <= 10^6.",
        sampleCases: [
          {
            input: "10",
            output: "So duong",
            explanation: "10 > 0 -> So duong."
          },
          {
            input: "-5",
            output: "So am",
            explanation: "-5 < 0 -> So am."
          },
          {
            input: "0",
            output: "Bang 0",
            explanation: "n = 0 -> Bang 0."
          }
        ],
        starterCode: `# Nhập số nguyên n
n = int(input())

# TODO: Dùng if - elif - else để phân loại số dương, âm hay bằng 0
`,
        testCases: [
          {
            id: "t4-3-tc1",
            input: "10",
            expectedOutput: "So duong",
            isHidden: false,
            explanation: "Kiểm tra số dương."
          },
          {
            id: "t4-3-tc2",
            input: "-5",
            expectedOutput: "So am",
            isHidden: false,
            explanation: "Kiểm tra số âm."
          },
          {
            id: "t4-3-tc3",
            input: "0",
            expectedOutput: "Bang 0",
            isHidden: false,
            explanation: "Kiểm tra số 0."
          },
          {
            id: "t4-3-tc4",
            input: "-999999",
            expectedOutput: "So am",
            isHidden: true,
            explanation: "Kiểm tra số âm lớn."
          }
        ],
        hints: [
          "`if n > 0: print('So duong')`",
          "`elif n < 0: print('So am')`",
          "`else: print('Bang 0')`"
        ],
        solutionExplanation: "n = int(input())\nif n > 0:\n    print('So duong')\nelif n < 0:\n    print('So am')\nelse:\n    print('Bang 0')"
      },
      practices: [
        {
          id: "t4-p3",
          title: "Bài 3: Số Dương, Âm Hay Bằng 0",
          difficulty: "Cơ bản",
          problemStatement: "Viết chương trình nhập vào một số nguyên `n`. Sử dụng cấu trúc `if ... elif ... else` để phân loại và in ra:\n- Nếu `n > 0`: in ra `So duong`\n- Nếu `n < 0`: in ra `So am`\n- Nếu `n == 0`: in ra `Bang 0`",
          inputFormat: "Một dòng chứa số nguyên n (-10^6 <= n <= 10^6).",
          outputFormat: "In 'So duong', 'So am' hoặc 'Bang 0'.",
          constraints: "-10^6 <= n <= 10^6.",
          sampleCases: [
            {
              input: "10",
              output: "So duong",
              explanation: "10 > 0 -> So duong."
            },
            {
              input: "-5",
              output: "So am",
              explanation: "-5 < 0 -> So am."
            },
            {
              input: "0",
              output: "Bang 0",
              explanation: "n = 0 -> Bang 0."
            }
          ],
          starterCode: `# Nhập số nguyên n\nn = int(input())\n\n# TODO: Dùng if - elif - else để phân loại số dương, âm hay bằng 0\n`,
          testCases: [
            {
              id: "t4-3-tc1",
              input: "10",
              expectedOutput: "So duong",
              isHidden: false,
              explanation: "Kiểm tra số dương."
            },
            {
              id: "t4-3-tc2",
              input: "-5",
              expectedOutput: "So am",
              isHidden: false,
              explanation: "Kiểm tra số âm."
            },
            {
              id: "t4-3-tc3",
              input: "0",
              expectedOutput: "Bang 0",
              isHidden: false,
              explanation: "Kiểm tra số 0."
            },
            {
              id: "t4-3-tc4",
              input: "-999999",
              expectedOutput: "So am",
              isHidden: true,
              explanation: "Kiểm tra số âm lớn."
            }
          ],
          hints: [
            "`if n > 0: print('So duong')`",
            "`elif n < 0: print('So am')`",
            "`else: print('Bang 0')`"
          ],
          solutionExplanation: "n = int(input())\nif n > 0:\n    print('So duong')\nelif n < 0:\n    print('So am')\nelse:\n    print('Bang 0')"
        },
        ...BRANCHING_EXTRA_PROBLEMS.slice(15, 24).map(toPractice)
      ]
    },

    // ----------------------------------------------------
    // BÀI 4: RẼ NHÁNH NÂNG CAO & ỨNG DỤNG THỰC TẾ
    // ----------------------------------------------------
    {
      id: "t4-l4",
      moduleId: "topic-4",
      moduleTitle: "Chủ đề 4: Cấu Trúc Rẽ Nhánh if / elif / else",
      order: 4,
      title: "Bài 4: Rẽ Nhánh Nâng Cao & Ứng Dụng Thực Tế",
      description: "Ứng dụng điều kiện phức hợp (and, or, not) và rẽ nhánh lồng nhau vào các bài toán thực tế: Phân loại chỉ số BMI, tính cước taxi, tiền điện, rút tiền ATM.",
      durationMin: 25,
      xpReward: 70,
      theory: {
        summary: "Kết hợp điều kiện bằng **`and`**, **`or`**, **`not`** hoặc **`if` lồng nhau**.",
        keyPoints: [
          "`and`: **tất cả** cùng đúng.",
          "`or`: **ít nhất một** đúng.",
          "`not`: **đảo** True ↔ False.",
          "BMI = `weight / (height ** 2)`: `< 18.5` Thieu can; `< 25` Binh thuong; `< 30` Thua can; còn lại Beo phi."
        ],
        conceptIllustration: {
          type: "branching",
          title: "Sơ Đồ Phân Loại BMI Thực Tế",
          description: "BMI < 18.5 -> Thiếu cân | < 25 -> Bình thường | < 30 -> Thừa cân | >= 30 -> Béo phì",
          visualData: {
            condition: "BMI < 18.5 ? Thieu can : (BMI < 25 ? Binh thuong : (BMI < 30 ? Thua can : Beo phi))",
            ifTrue: "In phân loại thể lực",
            ifFalse: "Kiểm tra ngưỡng tiếp theo"
          }
        },
        examples: [
          {
            title: "Ví dụ: Tính BMI",
            explanation: "Cân nặng 60kg, cao 1.70m -> BMI = 20.76 -> Binh thuong.",
            code: "w = 60\nh = 1.70\nbmi = w / (h * h)\nif bmi < 18.5:\n    print('Thieu can')\nelif bmi < 25:\n    print('Binh thuong')\nelif bmi < 30:\n    print('Thua can')\nelse:\n    print('Beo phi')",
            output: "Binh thuong"
          },
          {
            title: "Ví dụ: Toán tử and",
            explanation: "Cần **cả hai** điều kiện cùng đúng.",
            code: "tuoi = 16\nif tuoi >= 15 and tuoi <= 18:\n    print('Hoc sinh THPT')",
            output: "Hoc sinh THPT"
          },
          {
            title: "Ví dụ: Toán tử or",
            explanation: "Chỉ cần **một** điều kiện đúng.",
            code: "thu = 'Chu nhat'\nif thu == 'Thu bay' or thu == 'Chu nhat':\n    print('Nghi hoc')",
            output: "Nghi hoc"
          },
          {
            title: "Ví dụ: Toán tử not",
            explanation: "`not` đảo ngược kết quả.",
            code: "troi_mua = False\nif not troi_mua:\n    print('Di da bong')",
            output: "Di da bong"
          },
          {
            title: "Ví dụ: if lồng nhau",
            explanation: "Kiểm tra điều kiện thứ hai bên trong `if` thứ nhất.",
            code: "n = 12\nif n > 0:\n    if n % 2 == 0:\n        print('Duong va chan')",
            output: "Duong va chan"
          }
        ],
        multipleChoice: {
          question: "Để kiểm tra số x thỏa mãn đồng thời vừa lớn hơn 10 VÀ vừa nhỏ hơn 50, biểu thức logic nào đúng?",
          options: [
            "x > 10 and x < 50",
            "x > 10 or x < 50",
            "x > 10 not x < 50",
            "10 < x > 50"
          ],
          correctIndex: 0,
          explanation: "Từ khóa `and` yêu cầu cả hai điều kiện x > 10 và x < 50 đều phải đúng cùng lúc (Python cũng hỗ trợ cú pháp rút gọn 10 < x < 50)."
        }
      },
      practice: {
        id: "t4-p4",
        title: "Bài 4: Phân Loại BMI",
        difficulty: "Trung bình",
        problemStatement: "Viết chương trình nhập vào cân nặng `weight` (kg, số thực) và chiều cao `height` (mét, số thực). Hãy tính chỉ số `BMI = weight / (height * height)` và in ra phân loại tương ứng:\n- `BMI < 18.5`: in `Thieu can`\n- `18.5 <= BMI < 25`: in `Binh thuong`\n- `25 <= BMI < 30`: in `Thua can`\n- `BMI >= 30`: in `Beo phi`",
        inputFormat: "Gồm 2 dòng:\n- Dòng 1: Cân nặng weight (kg, số thực)\n- Dòng 2: Chiều cao height (m, số thực)",
        outputFormat: "Một dòng in tên phân loại: `Thieu can`, `Binh thuong`, `Thua can`, hoặc `Beo phi`.",
        constraints: "20 <= weight <= 250; 0.5 <= height <= 2.5.",
        sampleCases: [
          {
            input: "60.0\n1.70",
            output: "Binh thuong",
            explanation: "BMI = 60 / (1.7^2) = 20.76 nằm trong [18.5, 25) -> Binh thuong."
          },
          {
            input: "85.0\n1.70",
            output: "Thua can",
            explanation: "BMI = 85 / 2.89 = 29.41 -> Thua can."
          }
        ],
        starterCode: `# Nhập cân nặng và chiều cao
weight = float(input())
height = float(input())

# TODO: Tính BMI và phân loại dùng if - elif - else
`,
        testCases: [
          {
            id: "t4-4-tc1",
            input: "60.0\n1.70",
            expectedOutput: "Binh thuong",
            isHidden: false,
            explanation: "Kiểm tra bình thường."
          },
          {
            id: "t4-4-tc2",
            input: "45.0\n1.65",
            expectedOutput: "Thieu can",
            isHidden: false,
            explanation: "BMI = 16.53 -> Thieu can."
          },
          {
            id: "t4-4-tc3",
            input: "95.0\n1.70",
            expectedOutput: "Beo phi",
            isHidden: true,
            explanation: "BMI = 32.87 -> Beo phi."
          }
        ],
        hints: [
          "`bmi = weight / (height ** 2)`",
          "Dùng `if bmi < 18.5: ... elif bmi < 25: ... elif bmi < 30: ... else: ...`"
        ],
        solutionExplanation: "weight = float(input())\nheight = float(input())\nbmi = weight / (height ** 2)\nif bmi < 18.5:\n    print('Thieu can')\nelif bmi < 25:\n    print('Binh thuong')\nelif bmi < 30:\n    print('Thua can')\nelse:\n    print('Beo phi')"
      },
      practices: [
        {
          id: "t4-p4",
          title: "Bài 4: Phân Loại BMI",
          difficulty: "Trung bình",
          problemStatement: "Viết chương trình nhập vào cân nặng `weight` (kg, số thực) và chiều cao `height` (mét, số thực). Hãy tính chỉ số `BMI = weight / (height * height)` và in ra phân loại tương ứng:\n- `BMI < 18.5`: in `Thieu can`\n- `18.5 <= BMI < 25`: in `Binh thuong`\n- `25 <= BMI < 30`: in `Thua can`\n- `BMI >= 30`: in `Beo phi`",
          inputFormat: "Gồm 2 dòng:\n- Dòng 1: Cân nặng weight (kg, số thực)\n- Dòng 2: Chiều cao height (m, số thực)",
          outputFormat: "Một dòng in tên phân loại: `Thieu can`, `Binh thuong`, `Thua can`, hoặc `Beo phi`.",
          constraints: "20 <= weight <= 250; 0.5 <= height <= 2.5.",
          sampleCases: [
            {
              input: "60.0\n1.70",
              output: "Binh thuong",
              explanation: "BMI = 60 / (1.7^2) = 20.76 nằm trong [18.5, 25) -> Binh thuong."
            },
            {
              input: "85.0\n1.70",
              output: "Thua can",
              explanation: "BMI = 85 / 2.89 = 29.41 -> Thua can."
            }
          ],
          starterCode: `# Nhập cân nặng và chiều cao\nweight = float(input())\nheight = float(input())\n\n# TODO: Tính BMI và phân loại dùng if - elif - else\n`,
          testCases: [
            {
              id: "t4-4-tc1",
              input: "60.0\n1.70",
              expectedOutput: "Binh thuong",
              isHidden: false,
              explanation: "Kiểm tra bình thường."
            },
            {
              id: "t4-4-tc2",
              input: "45.0\n1.65",
              expectedOutput: "Thieu can",
              isHidden: false,
              explanation: "BMI = 16.53 -> Thieu can."
            },
            {
              id: "t4-4-tc3",
              input: "95.0\n1.70",
              expectedOutput: "Beo phi",
              isHidden: true,
              explanation: "BMI = 32.87 -> Beo phi."
            }
          ],
          hints: [
            "`bmi = weight / (height ** 2)`",
            "Dùng `if bmi < 18.5: ... elif bmi < 25: ... elif bmi < 30: ... else: ...`"
          ],
          solutionExplanation: "weight = float(input())\nheight = float(input())\nbmi = weight / (height ** 2)\nif bmi < 18.5:\n    print('Thieu can')\nelif bmi < 25:\n    print('Binh thuong')\nelif bmi < 30:\n    print('Thua can')\nelse:\n    print('Beo phi')"
        },
        {
          id: "t4-p-atm",
          title: "Mini ATM: Rút Tiền Hợp Lệ",
          difficulty: "Trung bình",
          problemStatement: "Mô phỏng máy rút tiền tự động ATM:\nNhập 2 số nguyên:\n- Dòng 1: Số dư hiện tại `balance` (VND)\n- Dòng 2: Số tiền muốn rút `amount` (VND)\n\nKiểm tra và in ra thông báo tương ứng:\n1. Nếu `amount % 50000 != 0`: in `Loi: So tien rut phai la boi so cua 50.000 VND`\n2. Nếu `amount > balance`: in `Loi: So du khong du`\n3. Nếu hợp lệ: in `Giao dich thanh cong. So du con lai: <balance - amount> VND`",
          inputFormat: "Gồm 2 dòng chứa balance và amount (số nguyên không âm).",
          outputFormat: "Một dòng thông báo giao dịch.",
          constraints: "0 <= balance, amount <= 10^9.",
          sampleCases: [
            {
              input: "500000\n200000",
              output: "Giao dich thanh cong. So du con lai: 300000 VND",
              explanation: "Rút 200.000 hợp lệ."
            }
          ],
          starterCode: `balance = int(input())\namount = int(input())\n\n# TODO: Kiểm tra điều kiện rút tiền\n`,
          testCases: [
            {
              id: "t4-atm-tc1",
              input: "500000\n200000",
              expectedOutput: "Giao dich thanh cong. So du con lai: 300000 VND",
              isHidden: false
            },
            {
              id: "t4-atm-tc2",
              input: "500000\n120000",
              expectedOutput: "Loi: So tien rut phai la boi so cua 50.000 VND",
              isHidden: false
            },
            {
              id: "t4-atm-tc3",
              input: "200000\n300000",
              expectedOutput: "Loi: So du khong du",
              isHidden: false
            }
          ],
          hints: ["Kiểm tra % 50000 trước, sau đó kiểm tra > balance."],
          solutionExplanation: "balance = int(input())\namount = int(input())\nif amount % 50000 != 0:\n    print('Loi: So tien rut phai la boi so cua 50.000 VND')\nelif amount > balance:\n    print('Loi: So du khong du')\nelse:\n    print(f'Giao dich thanh cong. So du con lai: {balance - amount} VND')"
        },
        {
          id: "t4-p-taxi",
          title: "Tính Tiền Taxi Lũy Tiến",
          difficulty: "Trung bình",
          problemStatement: "Nhập quãng đường `d` (km, số thực). Tính tiền cước taxi theo các mức lũy tiến:\n- 2 km đầu: 12.000 đ/km\n- Từ km 3 đến km 10: 9.500 đ/km\n- Từ km 11 đến km 20: 8.500 đ/km\n- Trên 20 km: 7.000 đ/km\n\nIn ra số tiền nguyên làm tròn.",
          inputFormat: "Một dòng chứa số thực d (0 <= d <= 500).",
          outputFormat: "Số tiền nguyên (VND).",
          constraints: "0 <= d <= 500.",
          sampleCases: [
            { input: "1.5", output: "18000", explanation: "1.5 * 12000 = 18000." },
            { input: "5.0", output: "52500", explanation: "2 * 12000 + 3 * 9500 = 52500." }
          ],
          starterCode: `d = float(input())\n\n# TODO: Tính tiền cước taxi\n`,
          testCases: [
            { id: "t4-tx-tc1", input: "1.5", expectedOutput: "18000", isHidden: false },
            { id: "t4-tx-tc2", input: "5.0", expectedOutput: "52500", isHidden: false },
            { id: "t4-tx-tc3", input: "25.0", expectedOutput: "220000", isHidden: true }
          ],
          hints: ["Chia từng khoảng quãng đường để nhân đơn giá tương ứng."],
          solutionExplanation: "d = float(input())\nif d <= 2:\n    tien = d * 12000\nelif d <= 10:\n    tien = 2 * 12000 + (d - 2) * 9500\nelif d <= 20:\n    tien = 2 * 12000 + 8 * 9500 + (d - 10) * 8500\nelse:\n    tien = 2 * 12000 + 8 * 9500 + 10 * 8500 + (d - 20) * 7000\nprint(int(round(tien)))"
        },
        {
          id: "t4-p-electric",
          title: "Tính Tiền Điện Bậc Thang",
          difficulty: "Nâng cao",
          problemStatement: "Nhập số kWh điện tiêu thụ `kwh` (số nguyên không âm). Tính tổng tiền điện theo 4 bậc lũy tiến:\n- 50 kWh đầu: 1.678 đ/kWh\n- 50 kWh tiếp theo (51 - 100): 1.734 đ/kWh\n- 100 kWh tiếp theo (101 - 200): 2.014 đ/kWh\n- Từ 201 trở đi: 2.536 đ/kWh\n\nIn ra số tiền nguyên.",
          inputFormat: "Một số nguyên kwh (0 <= kwh <= 10000).",
          outputFormat: "Số tiền nguyên (VND).",
          constraints: "0 <= kwh <= 10000.",
          sampleCases: [
            { input: "75", output: "127250", explanation: "50*1678 + 25*1734 = 127250." },
            { input: "150", output: "271300", explanation: "50*1678 + 50*1734 + 50*2014 = 271300." }
          ],
          starterCode: `kwh = int(input())\n\n# TODO: Tính tiền điện theo 4 bậc\n`,
          testCases: [
            { id: "t4-el-tc1", input: "75", expectedOutput: "127250", isHidden: false },
            { id: "t4-el-tc2", input: "150", expectedOutput: "271300", isHidden: false },
            { id: "t4-el-tc3", input: "250", expectedOutput: "498800", isHidden: true }
          ],
          hints: ["Tách số kWh thành các khoảng 50, 50, 100 và phần dôi dư."],
          solutionExplanation: "kwh = int(input())\nif kwh <= 50:\n    tien = kwh * 1678\nelif kwh <= 100:\n    tien = 50 * 1678 + (kwh - 50) * 1734\nelif kwh <= 200:\n    tien = 50 * 1678 + 50 * 1734 + (kwh - 100) * 2014\nelse:\n    tien = 50 * 1678 + 50 * 1734 + 100 * 2014 + (kwh - 200) * 2536\nprint(tien)"
        }
      ]
    }
  ]
};
