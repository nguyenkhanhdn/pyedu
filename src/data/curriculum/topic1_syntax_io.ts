import { Module } from "../../types";

export const TOPIC_1_SYNTAX_IO: Module = {
  id: "topic-1",
  title: "Chủ đề 1: Cú Pháp Python & Nhập/Xuất",
  description: "Làm quen với cú pháp Python, hàm print(), hàm input(), các tham số sep, end và kỹ thuật xuất dữ liệu chuẩn.",
  iconName: "Terminal",
  order: 1,
  color: "from-emerald-500 to-teal-700",
  lessons: [
    {
      id: "t1-l1",
      moduleId: "topic-1",
      moduleTitle: "Chủ đề 1: Cú Pháp Python & Nhập/Xuất",
      order: 1,
      title: "Bài 1: Lời Chào Cá Nhân Hóa",
      description: "Viết chương trình nhập tên, lớp và trường của học sinh. In ra lời chào theo mẫu yêu cầu.",
      durationMin: 15,
      xpReward: 50,
      theory: {
        summary: "Trong Python, hàm input() dùng để nhận dữ liệu nhập vào từ bàn phím dưới dạng chuỗi, và hàm print() dùng để hiển thị thông tin ra màn hình.",
        keyPoints: [
          "Cú pháp nhập: `ten_bien = input()`",
          "Hàm `print()` có thể in chuỗi kết hợp biến bằng f-string: `f\"Xin chao {name}!\"` hoặc nối chuỗi bằng dấu phẩy `,`.",
          "Mỗi lệnh `print()` mặc định sẽ tự động xuống dòng mới."
        ],
        conceptIllustration: {
          type: "syntax",
          title: "Quy trình Nhập - Xuất Dữ Liệu",
          description: "Bàn phím -> input() -> Biến bộ nhớ -> print() -> Màn hình console",
          visualData: {
            codeSnippet: "ten = input()\nprint(f\"Xin chao {ten}!\")",
            outputPreview: "Xin chao An!",
            explanation: "Nhận tên từ bàn phím và in lời chào cá nhân hóa."
          }
        },
        examples: [
          {
            title: "Ví dụ: Lời chào đơn giản",
            explanation: "Nhập tên và xuất lời chào.",
            code: 'ten = input()\nprint(f"Xin chao {ten}!")',
            output: "Xin chao Nguyen Van An!"
          }
        ],
        multipleChoice: {
          question: "Hàm nào trong Python được dùng để nhận dữ liệu do người dùng nhập từ bàn phím?",
          options: ["read()", "input()", "scan()", "cin >>"],
          correctIndex: 1,
          explanation: "Hàm input() là hàm chuẩn của Python để đọc một dòng văn bản từ bàn phím."
        }
      },
      practice: {
        id: "t1-p1",
        title: "Bài 1: Lời Chào Cá Nhân Hóa",
        difficulty: "Cơ bản",
        problemStatement: "Viết chương trình nhập 3 dòng lần lượt gồm: tên, lớp và trường của một học sinh. Sau đó in ra 3 dòng lời chào theo đúng mẫu định dạng.",
        inputFormat: "Gồm 3 dòng:\n- Dòng 1: Tên học sinh (chuỗi văn bản)\n- Dòng 2: Tên lớp (chuỗi văn bản)\n- Dòng 3: Tên trường (chuỗi văn bản)",
        outputFormat: "In ra đúng 3 dòng:\nXin chao <ten>!\nBan dang hoc lop <lop>, truong <truong>.\nChuc ban mot ngay hoc tap vui ve!",
        constraints: "Chuỗi ký tự không quá 100 ký tự.",
        sampleCases: [
          {
            input: "Nguyen Van An\n10A1\nTHPT Chuyen Tin",
            output: "Xin chao Nguyen Van An!\nBan dang hoc lop 10A1, truong THPT Chuyen Tin.\nChuc ban mot ngay hoc tap vui ve!",
            explanation: "Chương trình đọc 3 giá trị và ghép thành 3 câu thông báo."
          }
        ],
        starterCode: `# Nhập thông tin học sinh
ten = input()
lop = input()
truong = input()

# TODO: In lời chào theo mẫu yêu cầu
`,
        testCases: [
          {
            id: "t1-1-tc1",
            input: "Nguyen Van An\n10A1\nTHPT Chuyen Tin",
            expectedOutput: "Xin chao Nguyen Van An!\nBan dang hoc lop 10A1, truong THPT Chuyen Tin.\nChuc ban mot ngay hoc tap vui ve!",
            isHidden: false,
            explanation: "Kiểm tra mẫu thông tin chuẩn."
          },
          {
            id: "t1-1-tc2",
            input: "Le Thi Mai\n11B2\nTHPT Nguyen Trai",
            expectedOutput: "Xin chao Le Thi Mai!\nBan dang hoc lop 11B2, truong THPT Nguyen Trai.\nChuc ban mot ngay hoc tap vui ve!",
            isHidden: false,
            explanation: "Kiểm tra mẫu thứ 2."
          },
          {
            id: "t1-1-tc3",
            input: "Tran Duc Minh\n12 Chuyen Tin\nTHPT Chuyen Ha Noi - Amsterdam",
            expectedOutput: "Xin chao Tran Duc Minh!\nBan dang hoc lop 12 Chuyen Tin, truong THPT Chuyen Ha Noi - Amsterdam.\nChuc ban mot ngay hoc tap vui ve!",
            isHidden: true,
            explanation: "Kiểm tra trường tên dài."
          }
        ],
        hints: [
          "Sử dụng 3 lệnh `input()` để đọc tên, lớp và trường.",
          "Dùng f-string để in: `print(f\"Xin chao {ten}!\")`",
          "Dùng `print(f\"Ban dang hoc lop {lop}, truong {truong}.\")`"
        ],
        solutionExplanation: "ten = input()\nlop = input()\ntruong = input()\nprint(f\"Xin chao {ten}!\")\nprint(f\"Ban dang hoc lop {lop}, truong {truong}.\")\nprint(\"Chuc ban mot ngay hoc tap vui ve!\")"
      }
    },
    {
      id: "t1-l2",
      moduleId: "topic-1",
      moduleTitle: "Chủ đề 1: Cú Pháp Python & Nhập/Xuất",
      order: 2,
      title: "Bài 2: In Hình Vuông Bằng Dấu *",
      description: "Sử dụng các lệnh print() để in hình vuông đặc kích thước 5 × 5 bằng ký tự *.",
      durationMin: 15,
      xpReward: 50,
      theory: {
        summary: "Lệnh print() có thể in các ký tự đặc biệt và hoa văn trang trí bằng cách in các chuỗi ký tự cố định.",
        keyPoints: [
          "Hình vuông 5x5 gồm 5 dòng, mỗi dòng có 5 dấu sao cách nhau bởi dấu cách: `* * * * *`.",
          "Có thể dùng 5 lệnh `print(\"* * * * *\")` hoặc dùng vòng lặp."
        ],
        conceptIllustration: {
          type: "syntax",
          title: "Hình Vuông 5x5 Ký Tự Sao",
          description: "Mỗi dòng chứa 5 ký tự * cách nhau bởi khoảng trắng.",
          visualData: {
            codeSnippet: 'for _ in range(5):\n    print("* * * * *")',
            outputPreview: "* * * * *\n* * * * *\n* * * * *\n* * * * *\n* * * * *",
            explanation: "5 dòng liên tiếp nhau."
          }
        },
        examples: [
          {
            title: "Ví dụ: In dòng sao",
            explanation: "In một dòng gồm 5 dấu sao.",
            code: 'print("* * * * *")',
            output: "* * * * *"
          }
        ],
        multipleChoice: {
          question: "Để in ra 5 dấu sao cách nhau bởi dấu cách trên cùng 1 dòng, cú pháp nào sau đây đúng?",
          options: [
            'print("* * * * *")',
            'print("*" * 5)',
            'print("*****")',
            'print("*", "*", "*", "*", "*", sep="")'
          ],
          correctIndex: 0,
          explanation: 'Lệnh print("* * * * *") in chính xác 5 ký tự sao có dấu cách xen kẽ.'
        }
      },
      practice: {
        id: "t1-p2",
        title: "Bài 2: In Hình Vuông Bằng Dấu *",
        difficulty: "Cơ bản",
        problemStatement: "Sử dụng các lệnh print() để in ra màn hình một hình vuông đặc kích thước 5 × 5 bằng ký tự *. Trên mỗi dòng, các dấu * cách nhau đúng một khoảng trắng.",
        inputFormat: "Không có dữ liệu đầu vào.",
        outputFormat: "Gồm 5 dòng, mỗi dòng in: `* * * * *`",
        constraints: "Chính xác định dạng khoảng trắng giữa các dấu sao.",
        sampleCases: [
          {
            input: "",
            output: "* * * * *\n* * * * *\n* * * * *\n* * * * *\n* * * * *",
            explanation: "Hình vuông 5 dòng x 5 cột dấu sao."
          }
        ],
        starterCode: `# Sử dụng các lệnh print() để in hình vuông 5x5 dấu sao
print("* * * * *")
# TODO: In tiếp 4 dòng còn lại
`,
        testCases: [
          {
            id: "t1-2-tc1",
            input: "",
            expectedOutput: "* * * * *\n* * * * *\n* * * * *\n* * * * *\n* * * * *",
            isHidden: false,
            explanation: "Kiểm tra hình vuông 5x5."
          }
        ],
        hints: [
          "In 5 dòng, mỗi dòng có chuỗi `* * * * *`.",
          "Bạn có thể viết 5 lệnh `print(\"* * * * *\")` hoặc dùng vòng lặp `for i in range(5):`."
        ],
        solutionExplanation: "for _ in range(5):\n    print(\"* * * * *\")"
      }
    },
    {
      id: "t1-l3",
      moduleId: "topic-1",
      moduleTitle: "Chủ đề 1: Cú Pháp Python & Nhập/Xuất",
      order: 3,
      title: "Bài 3: In Tam Giác Cân",
      description: "Sử dụng print() và khoảng trắng để in một tam giác cân cao 3 dòng bằng ký tự *.",
      durationMin: 15,
      xpReward: 50,
      theory: {
        summary: "Để in hình tam giác cân, ta cần căn chỉnh chính xác số lượng khoảng trắng thụt vào ở đầu mỗi dòng.",
        keyPoints: [
          "Dòng 1: 2 khoảng trắng + 1 dấu sao: `  *`",
          "Dòng 2: 1 khoảng trắng + 3 dấu sao: ` ***`",
          "Dòng 3: 0 khoảng trắng + 5 dấu sao: `*****`"
        ],
        conceptIllustration: {
          type: "syntax",
          title: "Căn Chỉnh Tam Giác Cân",
          description: "Khoảng trắng giảm dần từ 2 -> 1 -> 0, số dấu sao tăng từ 1 -> 3 -> 5.",
          visualData: {
            codeSnippet: 'print("  *")\nprint(" ***")\nprint("*****")',
            outputPreview: "  *\n ***\n*****",
            explanation: "Tam giác cân đối xứng hoàn hảo."
          }
        },
        examples: [
          {
            title: "Ví dụ: In tam giác cân",
            explanation: "In 3 dòng tạo thành hình tam giác cân.",
            code: 'print("  *")\nprint(" ***")\nprint("*****")',
            output: "  *\n ***\n*****"
          }
        ],
        multipleChoice: {
          question: "Dòng thứ 2 của tam giác cân cao 3 dòng cần bao nhiêu khoảng trắng ở đầu?",
          options: ["0 khoảng trắng", "1 khoảng trắng", "2 khoảng trắng", "3 khoảng trắng"],
          correctIndex: 1,
          explanation: "Dòng 2 có 1 khoảng trắng và 3 dấu sao (' ***')."
        }
      },
      practice: {
        id: "t1-p3",
        title: "Bài 3: In Tam Giác Cân",
        difficulty: "Cơ bản",
        problemStatement: "Sử dụng print() và khoảng trắng để in ra màn hình một tam giác cân cao đúng 3 dòng bằng ký tự *.\n- Dòng 1: 2 khoảng trắng và 1 dấu *\n- Dòng 2: 1 khoảng trắng và 3 dấu *\n- Dòng 3: 5 dấu * liên tiếp",
        inputFormat: "Không có dữ liệu đầu vào.",
        outputFormat: "Gồm 3 dòng:\n  *\n ***\n*****",
        constraints: "Chính xác vị trí khoảng trắng.",
        sampleCases: [
          {
            input: "",
            output: "  *\n ***\n*****",
            explanation: "Hình tam giác cân cao 3 dòng."
          }
        ],
        starterCode: `# In tam giác cân 3 dòng bằng ký tự *
print("  *")
# TODO: Bổ sung 2 dòng tiếp theo
`,
        testCases: [
          {
            id: "t1-3-tc1",
            input: "",
            expectedOutput: "  *\n ***\n*****",
            isHidden: false,
            explanation: "Kiểm tra hình tam giác cân 3 dòng."
          }
        ],
        hints: [
          "Dòng 1: `print(\"  *\")` (2 dấu cách trước dấu sao)",
          "Dòng 2: `print(\" ***\")` (1 dấu cách trước 3 dấu sao)",
          "Dòng 3: `print(\"*****\")` (5 dấu sao liên tiếp)"
        ],
        solutionExplanation: "print(\"  *\")\nprint(\" ***\")\nprint(\"*****\")"
      }
    },
    {
      id: "t1-l4",
      moduleId: "topic-1",
      moduleTitle: "Chủ đề 1: Cú Pháp Python & Nhập/Xuất",
      order: 4,
      title: "Bài 4: Định Dạng Dữ Liệu Khi In (sep & end)",
      description: "Viết chương trình sử dụng các tham số sep và end trong print() để tạo một dòng thông tin có định dạng theo yêu cầu.",
      durationMin: 20,
      xpReward: 60,
      theory: {
        summary: "Hàm print() có hai tham số đặc biệt là sep (ký tự ngăn cách giữa các phần tử) và end (ký tự kết thúc sau khi in).",
        keyPoints: [
          "`sep`: Mặc định là khoảng trắng `' '`. Có thể đổi thành `sep='/'`, `sep=':'`, `sep=' - '`, v.v.",
          "`end`: Mặc định là ký tự xuống dòng `'\\n'`. Có thể đổi thành `end=' '` để in tiếp trên cùng 1 dòng.",
          "Ví dụ: `print(2, 9, 2026, sep='/', end=' ')` -> in `2/9/2026 ` không xuống dòng."
        ],
        conceptIllustration: {
          type: "syntax",
          title: "Tham số sep và end",
          description: "Tùy biến ký tự phân cách và ký tự kết thúc trong lệnh print.",
          visualData: {
            codeSnippet: "print(\"10\", \"30\", sep=\":\", end=\" | \")\nprint(\"02\", \"09\", \"2026\", sep=\"/\")",
            outputPreview: "10:30 | 02/09/2026",
            explanation: "In giờ phân cách bằng ':' và ngày phân cách bằng '/' trên cùng một dòng."
          }
        },
        examples: [
          {
            title: "Ví dụ: Định dạng ngày tháng năm",
            explanation: "Dùng sep='/' để in ngày tháng.",
            code: "d = 2\nm = 9\ny = 2026\nprint(d, m, y, sep='/')",
            output: "2/9/2026"
          }
        ],
        multipleChoice: {
          question: "Lệnh `print(1, 2, 3, sep='-', end='*')` sẽ in ra kết quả gì?",
          options: ["1 2 3-*", "1-2-3*", "1-2-3\\n*", "1,2,3*"],
          correctIndex: 1,
          explanation: "sep='-' ngăn cách giữa các số bằng dấu gạch nối, end='*' kết thúc dòng bằng dấu sao -> kết quả là 1-2-3*."
        }
      },
      practice: {
        id: "t1-p4",
        title: "Bài 4: Định Dạng Dữ Liệu Khi In (sep & end)",
        difficulty: "Cơ bản",
        problemStatement: "Viết chương trình nhập vào 5 giá trị số nguyên trên 5 dòng lần lượt là: ngày, tháng, năm, giờ, phút. Sử dụng các tham số `sep` và `end` trong `print()` để in ra trên CÙNG MỘT DÒNG theo định dạng:\n`ngay/thang/nam - gio:phut`",
        inputFormat: "Gồm 5 dòng, mỗi dòng chứa một số nguyên:\n- Dòng 1: ngày\n- Dòng 2: tháng\n- Dòng 3: năm\n- Dòng 4: giờ\n- Dòng 5: phút",
        outputFormat: "In trên 1 dòng duy nhất dạng: `<ngay>/<thang>/<nam> - <gio>:<phut>`",
        constraints: "Ngày từ 1..31, tháng từ 1..12, năm từ 1900..2100, giờ từ 0..23, phút từ 0..59.",
        sampleCases: [
          {
            input: "2\n9\n2026\n8\n30",
            output: "2/9/2026 - 8:30",
            explanation: "Ngày 2/9/2026 kết nối với giờ 8:30 bằng dấu ' - '."
          }
        ],
        starterCode: `# Nhập 5 số nguyên
ngay = int(input())
thang = int(input())
nam = int(input())
gio = int(input())
phut = int(input())

# TODO: Dùng print với sep và end để in đúng định dạng
`,
        testCases: [
          {
            id: "t1-4-tc1",
            input: "2\n9\n2026\n8\n30",
            expectedOutput: "2/9/2026 - 8:30",
            isHidden: false,
            explanation: "Kiểm tra định dạng ngày 2/9/2026 - 8:30."
          },
          {
            id: "t1-4-tc2",
            input: "15\n11\n2025\n14\n45",
            expectedOutput: "15/11/2025 - 14:45",
            isHidden: false,
            explanation: "Kiểm tra ngày 15/11/2025 - 14:45."
          },
          {
            id: "t1-4-tc3",
            input: "1\n1\n2030\n0\n0",
            expectedOutput: "1/1/2030 - 0:0",
            isHidden: true,
            explanation: "Kiểm tra ngày đầu năm."
          }
        ],
        hints: [
          "Dùng `print(ngay, thang, nam, sep='/', end=' - ')`",
          "Sau đó dùng `print(gio, phut, sep=':')` để in phần giờ phút."
        ],
        solutionExplanation: "ngay = int(input())\nthang = int(input())\nnam = int(input())\ngio = int(input())\nphut = int(input())\nprint(ngay, thang, nam, sep='/', end=' - ')\nprint(gio, phut, sep=':')"
      }
    }
  ]
};
