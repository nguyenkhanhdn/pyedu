import { Module } from "../../types";

export const TOPIC_7_STRINGS: Module = {
  id: "topic-7",
  title: "Chủ đề 7: Chuỗi String",
  description: "Khám phá các phương thức xử lý chuỗi trong Python: strip, split, join, title, upper, lower, slicing cắt chuỗi và thuật toán đối xứng Palindrome.",
  iconName: "Type",
  order: 7,
  color: "from-pink-500 to-rose-700",
  lessons: [
    {
      id: "t7-l1",
      moduleId: "topic-7",
      moduleTitle: "Chủ đề 7: Chuỗi String",
      order: 1,
      title: "Bài 1: Chuẩn Hóa Họ Tên",
      description: "Nhập họ tên chứa nhiều khoảng trắng thừa và viết hoa lộn xộn. Xóa khoảng trắng thừa và viết hoa chữ cái đầu mỗi từ.",
      durationMin: 20,
      xpReward: 60,
      theory: {
        summary: "Phương thức `s.split()` tự động tách các từ và loại bỏ mọi khoảng trắng thừa (ở đầu, cuối và giữa các từ). Dùng `' '.join(words)` kết hợp `.capitalize()` hoặc `.title()` để chuẩn hóa.",
        keyPoints: [
          "`words = s.split()`: Tách chuỗi thành danh sách các từ sạch.",
          "`words = [w.capitalize() for w in words]`: Viết hoa chữ cái đầu và viết thường các chữ còn lại của mỗi từ.",
          "`result = ' '.join(words)`: Nối lại các từ bằng 1 khoảng trắng duy nhất."
        ],
        conceptIllustration: {
          type: "syntax",
          title: "Quy Trình Chuẩn Hóa Họ Tên",
          description: "'  nguYEN   vAn  aN  ' -> split -> ['nguYEN', 'vAn', 'aN'] -> capitalize -> ['Nguyen', 'Van', 'An'] -> join -> 'Nguyen Van An'",
          visualData: {
            codeSnippet: "s = '  nguYEN   vAn  aN  '\nclean = ' '.join(w.capitalize() for w in s.split())\nprint(clean)",
            outputPreview: "Nguyen Van An",
            explanation: "Chuẩn hóa hoàn hảo họ tên tiếng Việt."
          }
        },
        examples: [
          {
            title: "Ví dụ: '  le   tHi   mAI  '",
            explanation: "Tách từ, viết hoa đầu từ và nối lại.",
            code: "s = '  le   tHi   mAI  '\nprint(' '.join(w.capitalize() for w in s.split()))",
            output: "Le Thi Mai"
          }
        ],
        multipleChoice: {
          question: "Phương thức nào trong Python chuyển từ 'pYtHoN' thành 'Python'?",
          options: ["s.upper()", "s.capitalize()", "s.lower()", "s.title()"],
          correctIndex: 1,
          explanation: "capitalize() viết hoa chữ cái đầu tiên và viết thường toàn bộ các chữ cái còn lại."
        }
      },
      practice: {
        id: "t7-p1",
        title: "Bài 1: Chuẩn Hóa Họ Tên",
        difficulty: "Trung bình",
        problemStatement: "Viết chương trình nhập vào một chuỗi họ và tên bất kỳ có thể chứa khoảng trắng thừa ở đầu, cuối, giữa các từ và các chữ cái viết hoa thường lộn xộn. Hãy chuẩn hóa chuỗi họ tên này bằng cách:\n1. Xóa toàn bộ khoảng trắng thừa, mỗi từ cách nhau đúng 1 khoảng trắng.\n2. Chữ cái đầu của mỗi từ viết hoa, các chữ cái còn lại viết thường.\n\nIn ra chuỗi họ tên sau khi đã chuẩn hóa.",
        inputFormat: "Một dòng chứa chuỗi họ tên ban đầu.",
        outputFormat: "Một dòng chứa họ tên đã chuẩn hóa.",
        constraints: "Chuỗi độ dài không quá 200 ký tự.",
        sampleCases: [
          {
            input: "  nguYEN   vAn   aN  ",
            output: "Nguyen Van An",
            explanation: "Xóa khoảng trắng thừa và viết hoa chuẩn: Nguyen Van An."
          },
          {
            input: "TRAN  THI  bAO   yEN",
            output: "Tran Thi Bao Yen",
            explanation: "Chuẩn hóa thành Tran Thi Bao Yen."
          }
        ],
        starterCode: `# Nhập chuỗi họ tên
s = input()

# TODO: Chuẩn hóa họ tên và in ra
`,
        testCases: [
          {
            id: "t7-1-tc1",
            input: "  nguYEN   vAn   aN  ",
            expectedOutput: "Nguyen Van An",
            isHidden: false,
            explanation: "Kiểm tra với khoảng trắng thừa nhiều."
          },
          {
            id: "t7-1-tc2",
            input: "TRAN  THI  bAO   yEN",
            expectedOutput: "Tran Thi Bao Yen",
            isHidden: false,
            explanation: "Kiểm tra mẫu 2."
          },
          {
            id: "t7-1-tc3",
            input: "le   minh",
            expectedOutput: "Le Minh",
            isHidden: true,
            explanation: "Kiểm tra tên ngắn."
          }
        ],
        hints: [
          "Tách từ: `words = s.split()`",
          "Viết hoa từng từ: `normalized_words = [w.capitalize() for w in words]`",
          "Nối lại: `' '.join(normalized_words)`"
        ],
        solutionExplanation: "s = input()\nwords = [w.capitalize() for w in s.split()]\nprint(' '.join(words))"
      }
    },
    {
      id: "t7-l2",
      moduleId: "topic-7",
      moduleTitle: "Chủ đề 7: Chuỗi String",
      order: 2,
      title: "Bài 2: Đảo Ngược Chuỗi",
      description: "Nhập một chuỗi và in chuỗi theo thứ tự ngược lại bằng kỹ thuật slicing [::-1].",
      durationMin: 15,
      xpReward: 50,
      theory: {
        summary: "Cú pháp cắt lát chuỗi (slicing) trong Python có dạng `s[start:stop:step]`. Khi đặt `step = -1` và bỏ trống start, stop (`s[::-1]`), Python sẽ duyệt chuỗi từ ký tự cuối cùng về ký tự đầu tiên.",
        keyPoints: [
          "`s[::-1]`: Đảo ngược chuỗi tức thì với hiệu năng tối ưu $O(N)$.",
          "Áp dụng được cho cả chuỗi ký tự, danh sách (list) và bộ dữ liệu (tuple)."
        ],
        conceptIllustration: {
          type: "syntax",
          title: "Cắt Lát Chuỗi Ngược Slicing",
          description: "'Python' -> [::-1] -> 'nohtyP'",
          visualData: {
            codeSnippet: "s = 'Python'\nprint(s[::-1])",
            outputPreview: "nohtyP",
            explanation: "Duyệt bước nhảy -1 từ phải sang trái."
          }
        },
        examples: [
          {
            title: "Ví dụ: Đảo ngược 'Hello'",
            explanation: "Dùng s[::-1] để lấy 'olleH'.",
            code: "s = 'Hello'\nprint(s[::-1])",
            output: "olleH"
          }
        ],
        multipleChoice: {
          question: "Cú pháp slicing nào sau đây dùng để đảo ngược một chuỗi `s` trong Python?",
          options: ["s[-1:0:1]", "s[::-1]", "s.reverse()", "s[1::-1]"],
          correctIndex: 1,
          explanation: "s[::-1] là cú pháp chuẩn và nhanh nhất trong Python để đảo ngược chuỗi."
        }
      },
      practice: {
        id: "t7-p2",
        title: "Bài 2: Đảo Ngược Chuỗi",
        difficulty: "Cơ bản",
        problemStatement: "Viết chương trình nhập vào một chuỗi ký tự `s` từ bàn phím. Hãy in ra chuỗi đó theo thứ tự đảo ngược lại từ cuối lên đầu bằng kỹ thuật slicing `[::-1]`.",
        inputFormat: "Một dòng chứa chuỗi ký tự s.",
        outputFormat: "Một dòng chứa chuỗi đảo ngược.",
        constraints: "Độ dài chuỗi từ 1 đến 1000 ký tự.",
        sampleCases: [
          {
            input: "Python",
            output: "nohtyP",
            explanation: "Đảo ngược chuỗi Python."
          },
          {
            input: "Tin hoc tre",
            output: "ert coh niT",
            explanation: "Đảo ngược cả khoảng trắng."
          }
        ],
        starterCode: `# Nhập chuỗi s
s = input()

# TODO: In chuỗi đảo ngược dùng slicing [::-1]
`,
        testCases: [
          {
            id: "t7-2-tc1",
            input: "Python",
            expectedOutput: "nohtyP",
            isHidden: false,
            explanation: "Kiểm tra với Python."
          },
          {
            id: "t7-2-tc2",
            input: "Tin hoc tre",
            expectedOutput: "ert coh niT",
            isHidden: false,
            explanation: "Kiểm tra chuỗi có dấu cách."
          },
          {
            id: "t7-2-tc3",
            input: "123456789",
            expectedOutput: "987654321",
            isHidden: true,
            explanation: "Kiểm tra chuỗi số."
          }
        ],
        hints: [
          "Chỉ cần viết: `print(s[::-1])`"
        ],
        solutionExplanation: "s = input()\nprint(s[::-1])"
      }
    },
    {
      id: "t7-l3",
      moduleId: "topic-7",
      moduleTitle: "Chủ đề 7: Chuỗi String",
      order: 3,
      title: "Bài 3: Kiểm Tra Chuỗi Đối Xứng (Palindrome)",
      description: "Nhập một chuỗi và kiểm tra xem chuỗi đó có phải là chuỗi đối xứng (Palindrome) hay không.",
      durationMin: 20,
      xpReward: 60,
      theory: {
        summary: "Chuỗi đối xứng (Palindrome) là chuỗi đọc xuôi hay đọc ngược đều hoàn toàn giống nhau (ví dụ: 'radar', 'madam', 'level').",
        keyPoints: [
          "Điều kiện đối xứng: `s == s[::-1]`.",
          "Chuyển về chữ thường bằng `.lower()` và loại bỏ khoảng trắng thừa nếu muốn kiểm tra không phân biệt hoa thường."
        ],
        conceptIllustration: {
          type: "syntax",
          title: "Kiểm Tra Palindrome",
          description: "'radar' == 'radar' -> YES | 'hello' != 'olleh' -> NO",
          visualData: {
            codeSnippet: "s = 'radar'\nprint('YES' if s == s[::-1] else 'NO')",
            outputPreview: "YES",
            explanation: "So sánh chuỗi gốc với chuỗi đảo ngược."
          }
        },
        examples: [
          {
            title: "Ví dụ: 'racecar'",
            explanation: "'racecar' đảo ngược vẫn là 'racecar' -> YES.",
            code: "s = 'racecar'\nprint('YES' if s == s[::-1] else 'NO')",
            output: "YES"
          }
        ],
        multipleChoice: {
          question: "Chuỗi nào sau đây là chuỗi đối xứng (Palindrome)?",
          options: ["python", "level", "school", "computer"],
          correctIndex: 1,
          explanation: "'level' đọc ngược lại vẫn là 'level'."
        }
      },
      practice: {
        id: "t7-p3",
        title: "Bài 3: Kiểm Tra Chuỗi Đối Xứng",
        difficulty: "Cơ bản",
        problemStatement: "Viết chương trình nhập vào một chuỗi ký tự `s` (chỉ gồm các ký tự chữ và số viết liền). Kiểm tra xem `s` có phải là chuỗi đối xứng (Palindrome) hay không:\n- In ra `YES` nếu chuỗi đối xứng.\n- In ra `NO` nếu chuỗi không đối xứng.",
        inputFormat: "Một dòng chứa chuỗi ký tự s.",
        outputFormat: "In `YES` hoặc `NO`.",
        constraints: "1 <= len(s) <= 1000.",
        sampleCases: [
          {
            input: "radar",
            output: "YES",
            explanation: "radar đọc xuôi ngược giống nhau."
          },
          {
            input: "python",
            output: "NO",
            explanation: "python != nohtyp."
          }
        ],
        starterCode: `# Nhập chuỗi s
s = input()

# TODO: Kiểm tra đối xứng và in YES hoặc NO
`,
        testCases: [
          {
            id: "t7-3-tc1",
            input: "radar",
            expectedOutput: "YES",
            isHidden: false,
            explanation: "Kiểm tra radar."
          },
          {
            id: "t7-3-tc2",
            input: "python",
            expectedOutput: "NO",
            isHidden: false,
            explanation: "Kiểm tra python."
          },
          {
            id: "t7-3-tc3",
            input: "12321",
            expectedOutput: "YES",
            isHidden: true,
            explanation: "Kiểm tra 12321."
          }
        ],
        hints: [
          "So sánh `if s == s[::-1]: print('YES') else: print('NO')`"
        ],
        solutionExplanation: "s = input()\nif s == s[::-1]:\n    print('YES')\nelse:\n    print('NO')"
      }
    },
    {
      id: "t7-l4",
      moduleId: "topic-7",
      moduleTitle: "Chủ đề 7: Chuỗi String",
      order: 4,
      title: "Bài 4: Trích Xuất Chuỗi & Slicing Nâng Cao",
      description: "Cho một chuỗi s. Sử dụng slicing để trích xuất 2 ký tự đầu, 2 ký tự cuối, đảo ngược và các ký tự ở vị trí chẵn.",
      durationMin: 20,
      xpReward: 60,
      theory: {
        summary: "Kỹ thuật Slicing đa dạng trong Python:\n1. 2 ký tự đầu: `s[:2]`\n2. 2 ký tự cuối: `s[-2:]`\n3. Đảo ngược: `s[::-1]`\n4. Ký tự vị trí chỉ số chẵn (bước 2): `s[::2]`",
        keyPoints: [
          "`s[:2]`: Lấy từ đầu đến chỉ số 1 (2 ký tự đầu).",
          "`s[-2:]`: Lấy từ vị trí thứ 2 đếm từ cuối lên.",
          "`s[::2]`: Lấy các ký tự ở chỉ số 0, 2, 4, 6...",
          "`s[::-1]`: Đảo ngược toàn bộ chuỗi."
        ],
        conceptIllustration: {
          type: "syntax",
          title: "Các Mẫu Slicing Phổ Biến",
          description: "s = 'Python' -> s[:2]='Py', s[-2:]='on', s[::-1]='nohtyP', s[::2]='Pto'",
          visualData: {
            codeSnippet: "s = 'Python'\nprint(s[:2])\nprint(s[-2:])\nprint(s[::-1])\nprint(s[::2])",
            outputPreview: "Py\non\nnohtyP\nPto",
            explanation: "4 kết quả trích xuất cắt lát chuỗi."
          }
        },
        examples: [
          {
            title: "Ví dụ: 'ABCDEF'",
            explanation: "[:2] -> 'AB', [-2:] -> 'EF', [::-1] -> 'FEDCBA', [::2] -> 'ACE'.",
            code: "s = 'ABCDEF'\nprint(s[:2])\nprint(s[-2:])\nprint(s[::-1])\nprint(s[::2])",
            output: "AB\nEF\nFEDCBA\nACE"
          }
        ],
        multipleChoice: {
          question: "Với chuỗi `s = 'Olympic'`, biểu thức `s[-2:]` trả về chuỗi nào?",
          options: ["Ol", "ic", "pi", "mp"],
          correctIndex: 1,
          explanation: "s[-2:] lấy 2 ký tự cuối cùng của chuỗi là 'ic'."
        }
      },
      practice: {
        id: "t7-p4",
        title: "Bài 4: Trích Xuất Chuỗi",
        difficulty: "Trung bình",
        problemStatement: "Viết chương trình nhập vào một chuỗi ký tự `s` (có độ dài ít nhất 2 ký tự). Sử dụng kỹ thuật slicing để trích xuất và in ra đúng 4 dòng:\n- Dòng 1: Hai ký tự đầu tiên của chuỗi (`s[:2]`)\n- Dòng 2: Hai ký tự cuối cùng của chuỗi (`s[-2:]`)\n- Dòng 3: Chuỗi đảo ngược (`s[::-1]`)\n- Dòng 4: Các ký tự ở vị trí chỉ số chẵn (0, 2, 4, ...) của chuỗi (`s[::2]`)",
        inputFormat: "Một dòng chứa chuỗi ký tự s (len(s) >= 2).",
        outputFormat: "Gồm 4 dòng theo đúng thứ tự yêu cầu.",
        constraints: "2 <= len(s) <= 500.",
        sampleCases: [
          {
            input: "Python",
            output: "Py\non\nnohtyP\nPto",
            explanation: "2 ký tự đầu: Py, 2 ký tự cuối: on, đảo ngược: nohtyP, vị trí chẵn (0, 2, 4): Pto."
          }
        ],
        starterCode: `# Nhập chuỗi s
s = input()

# TODO: In 4 dòng theo yêu cầu slicing
`,
        testCases: [
          {
            id: "t7-4-tc1",
            input: "Python",
            expectedOutput: "Py\non\nnohtyP\nPto",
            isHidden: false,
            explanation: "Kiểm tra với Python."
          },
          {
            id: "t7-4-tc2",
            input: "AIStudio",
            expectedOutput: "AI\nio\noidutSIA\nAIui",
            isHidden: false,
            explanation: "Kiểm tra với AIStudio."
          }
        ],
        hints: [
          "`print(s[:2])`",
          "`print(s[-2:])`",
          "`print(s[::-1])`",
          "`print(s[::2])`"
        ],
        solutionExplanation: "s = input()\nprint(s[:2])\nprint(s[-2:])\nprint(s[::-1])\nprint(s[::2])"
      }
    },
    {
      id: "t7-l5",
      moduleId: "topic-7",
      moduleTitle: "Chủ đề 7: Chuỗi String",
      order: 5,
      title: "Bài 5: Xử Lý Phân Tách Tên Học Sinh",
      description: "Nhập họ và tên đầy đủ. Tách họ tên thành các thành phần (Họ, Tên đệm, Tên chính) và in từng phần trên một dòng.",
      durationMin: 20,
      xpReward: 60,
      theory: {
        summary: "Phân tích cấu trúc tên người Việt Nam: Từ đầu tiên là Họ, từ cuối cùng là Tên, các từ ở giữa (nếu có) là Tên đệm.",
        keyPoints: [
          "`words = s.split()`",
          "Họ: `words[0]`",
          "Tên: `words[-1]`",
          "Tên đệm: `' '.join(words[1:-1])` (nếu không có thì in `Khong co`)."
        ],
        conceptIllustration: {
          type: "syntax",
          title: "Phân Tách Họ - Đệm - Tên",
          description: "'Nguyen Van An' -> Họ: Nguyen | Đệm: Van | Tên: An",
          visualData: {
            codeSnippet: "words = ['Nguyen', 'Van', 'An']\nho = words[0]\nten = words[-1]\ndem = ' '.join(words[1:-1])",
            outputPreview: "Ho: Nguyen\nTen dem: Van\nTen: An",
            explanation: "Tách chính xác 3 thành phần cấu tạo nên họ tên."
          }
        },
        examples: [
          {
            title: "Ví dụ: 'Nguyen Van An'",
            explanation: "Họ: Nguyen, Đệm: Van, Tên: An.",
            code: "# Ho: Nguyen\n# Ten dem: Van\n# Ten: An",
            output: "Ho: Nguyen\nTen dem: Van\nTen: An"
          }
        ],
        multipleChoice: {
          question: "Trong danh sách từ `words = ['Tran', 'Thi', 'Mai', 'Linh']`, biểu thức nào lấy phần Tên đệm 'Thi Mai'?",
          options: ["' '.join(words[1:2])", "' '.join(words[1:-1])", "' '.join(words[0:2])", "' '.join(words[2:3])"],
          correctIndex: 1,
          explanation: "words[1:-1] lấy các phần tử từ chỉ số 1 đến kế cuối, chính là phần tên đệm."
        }
      },
      practice: {
        id: "t7-p5",
        title: "Bài 5: Xử Lý Tên Học Sinh",
        difficulty: "Trung bình",
        problemStatement: "Viết chương trình nhập vào họ tên đầy đủ của một người (gồm ít nhất 2 từ, các từ cách nhau bởi khoảng trắng). Hãy phân tách và in ra 3 dòng:\n- Dòng 1: `Ho: <ho>` (từ đầu tiên)\n- Dòng 2: `Ten dem: <ten_dem>` (các từ ở giữa nối bởi khoảng trắng; nếu chỉ có 2 từ thì in `Ten dem: Khong co`)\n- Dòng 3: `Ten: <ten>` (từ cuối cùng)",
        inputFormat: "Một dòng chứa họ tên đầy đủ.",
        outputFormat: "Gồm 3 dòng theo định dạng mô tả.",
        constraints: "Họ tên có ít nhất 2 từ.",
        sampleCases: [
          {
            input: "Nguyen Van An",
            output: "Ho: Nguyen\nTen dem: Van\nTen: An",
            explanation: "Họ: Nguyen, Đệm: Van, Tên: An."
          },
          {
            input: "Le Binh",
            output: "Ho: Le\nTen dem: Khong co\nTen: Binh",
            explanation: "Chỉ có 2 từ nên không có tên đệm."
          },
          {
            input: "Tran Thi Mai Linh",
            output: "Ho: Tran\nTen dem: Thi Mai\nTen: Linh",
            explanation: "Tên đệm gồm 2 từ 'Thi Mai'."
          }
        ],
        starterCode: `# Nhập họ tên
s = input()

# TODO: Tách họ, tên đệm, tên và in theo mẫu
`,
        testCases: [
          {
            id: "t7-5-tc1",
            input: "Nguyen Van An",
            expectedOutput: "Ho: Nguyen\nTen dem: Van\nTen: An",
            isHidden: false,
            explanation: "Kiểm tra tên 3 từ."
          },
          {
            id: "t7-5-tc2",
            input: "Le Binh",
            expectedOutput: "Ho: Le\nTen dem: Khong co\nTen: Binh",
            isHidden: false,
            explanation: "Kiểm tra tên 2 từ."
          },
          {
            id: "t7-5-tc3",
            input: "Tran Thi Mai Linh",
            expectedOutput: "Ho: Tran\nTen dem: Thi Mai\nTen: Linh",
            isHidden: false,
            explanation: "Kiểm tra tên 4 từ."
          }
        ],
        hints: [
          "Tách từ: `words = s.split()`",
          "`ho = words[0]`",
          "`ten = words[-1]`",
          "`dem = ' '.join(words[1:-1]) if len(words) > 2 else 'Khong co'`"
        ],
        solutionExplanation: "words = input().split()\nho = words[0]\nten = words[-1]\ndem = ' '.join(words[1:-1]) if len(words) > 2 else 'Khong co'\nprint(f'Ho: {ho}')\nprint(f'Ten dem: {dem}')\nprint(f'Ten: {ten}')"
      }
    }
  ]
};
