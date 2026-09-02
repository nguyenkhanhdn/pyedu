import { Module } from "../../types";

export const TOPIC_2_VARIABLES_TYPES: Module = {
  id: "topic-2",
  title: "Chủ đề 2: Biến & Kiểu Dữ Liệu",
  description: "Khám phá cách khai báo biến, các kiểu dữ liệu int, float, str, bool, ép kiểu dữ liệu và định dạng phiếu thông tin.",
  iconName: "Variable",
  order: 2,
  color: "from-blue-500 to-indigo-700",
  lessons: [
    {
      id: "t2-l1",
      moduleId: "topic-2",
      moduleTitle: "Chủ đề 2: Biến & Kiểu Dữ Liệu",
      order: 1,
      title: "Bài 1: Thông Tin Học Sinh",
      description: "Khai báo các biến lưu họ tên, tuổi, điểm Toán và điểm Văn. In toàn bộ thông tin ra màn hình.",
      durationMin: 15,
      xpReward: 50,
      theory: {
        summary: "Biến là vùng nhớ dùng để lưu trữ giá trị trong chương trình. Python tự động nhận diện kiểu dữ liệu của biến khi gán giá trị.",
        keyPoints: [
          "Quy tắc đặt tên biến: bắt đầu bằng chữ cái hoặc dấu gạch dưới `_`, không chứa dấu cách, không trùng từ khóa.",
          "Các kiểu dữ liệu cơ bản: `str` (chuỗi), `int` (số nguyên), `float` (số thực), `bool` (logic True/False)."
        ],
        conceptIllustration: {
          type: "variables",
          title: "Bộ Nhớ Biến",
          description: "Mỗi biến giữ một nhãn tên và trỏ tới ô nhớ chứa dữ liệu cụ thể.",
          visualData: {
            variables: [
              { name: "ho_ten", type: "str", value: "Nguyen An" },
              { name: "tuoi", type: "int", value: "16" },
              { name: "diem_toan", type: "float", value: "9.5" }
            ]
          }
        },
        examples: [
          {
            title: "Ví dụ: Khai báo biến học sinh",
            explanation: "Tạo các biến và in ra màn hình.",
            code: 'ten = "Le Binh"\ntuoi = 15\nprint(f"Hoc sinh: {ten}, {tuoi} tuoi")',
            output: "Hoc sinh: Le Binh, 15 tuoi"
          }
        ],
        multipleChoice: {
          question: "Tên biến nào sau đây là HỢP LỆ trong Python?",
          options: ["2diem_toan", "diem toan", "diem_toan", "diem-toan"],
          correctIndex: 2,
          explanation: "Tên biến chỉ gồm chữ cái, chữ số và dấu gạch dưới `_`, không được bắt đầu bằng chữ số."
        }
      },
      practice: {
        id: "t2-p1",
        title: "Bài 1: Thông Tin Học Sinh",
        difficulty: "Cơ bản",
        problemStatement: "Viết chương trình nhập vào 4 dòng thông tin của một học sinh:\n1. Họ và tên (chuỗi)\n2. Tuổi (số nguyên)\n3. Điểm Toán (số thực)\n4. Điểm Văn (số thực)\n\nIn toàn bộ thông tin theo cấu trúc chuẩn quy định.",
        inputFormat: "Gồm 4 dòng:\n- Dòng 1: Họ tên (str)\n- Dòng 2: Tuổi (int)\n- Dòng 3: Điểm Toán (float)\n- Dòng 4: Điểm Văn (float)",
        outputFormat: "In đúng 4 dòng:\nHo va ten: <ho_ten>\nTuoi: <tuoi>\nDiem Toan: <diem_toan>\nDiem Van: <diem_van>",
        constraints: "Tuổi từ 1..100, điểm từ 0.0..10.0.",
        sampleCases: [
          {
            input: "Nguyen Hoang Long\n16\n9.5\n8.75",
            output: "Ho va ten: Nguyen Hoang Long\nTuoi: 16\nDiem Toan: 9.5\nDiem Van: 8.75",
            explanation: "Đọc 4 dòng và in theo nhãn tương ứng."
          }
        ],
        starterCode: `# Nhập 4 thông tin
ho_ten = input()
tuoi = int(input())
diem_toan = float(input())
diem_van = float(input())

# TODO: In thông tin theo mẫu
`,
        testCases: [
          {
            id: "t2-1-tc1",
            input: "Nguyen Hoang Long\n16\n9.5\n8.75",
            expectedOutput: "Ho va ten: Nguyen Hoang Long\nTuoi: 16\nDiem Toan: 9.5\nDiem Van: 8.75",
            isHidden: false,
            explanation: "Kiểm tra thông tin chuẩn."
          },
          {
            id: "t2-1-tc2",
            input: "Tran Mai Linh\n15\n10.0\n9.0",
            expectedOutput: "Ho va ten: Tran Mai Linh\nTuoi: 15\nDiem Toan: 10.0\nDiem Van: 9.0",
            isHidden: false,
            explanation: "Kiểm tra mẫu 2."
          }
        ],
        hints: [
          "Dùng f-string: `print(f\"Ho va ten: {ho_ten}\")`",
          "Tương tự cho `Tuoi: {tuoi}`, `Diem Toan: {diem_toan}`, `Diem Van: {diem_van}`."
        ],
        solutionExplanation: "ho_ten = input()\ntuoi = int(input())\ndiem_toan = float(input())\ndiem_van = float(input())\nprint(f\"Ho va ten: {ho_ten}\")\nprint(f\"Tuoi: {tuoi}\")\nprint(f\"Diem Toan: {diem_toan}\")\nprint(f\"Diem Van: {diem_van}\")"
      }
    },
    {
      id: "t2-l2",
      moduleId: "topic-2",
      moduleTitle: "Chủ đề 2: Biến & Kiểu Dữ Liệu",
      order: 2,
      title: "Bài 2: Nhập Dữ Liệu & Chuyển Kiểu",
      description: "Nhập tuổi dưới dạng chuỗi, chuyển sang số nguyên và in ra tuổi sau khi chuyển đổi.",
      durationMin: 15,
      xpReward: 50,
      theory: {
        summary: "Mặc định `input()` luôn trả về kiểu chuỗi ký tự (`str`). Để thực hiện tính toán số học, ta phải dùng hàm `int()` để ép kiểu sang số nguyên.",
        keyPoints: [
          "`s = input()` -> `s` có kiểu `str`.",
          "`age = int(s)` -> `age` có kiểu `int`.",
          "Hàm `type(x)` trả về kiểu dữ liệu của biến `x`."
        ],
        conceptIllustration: {
          type: "syntax",
          title: "Ép Kiểu str Sang int",
          description: "'16' (chuỗi văn bản) -> int('16') -> 16 (số nguyên có thể cộng trừ).",
          visualData: {
            codeSnippet: 's = "16"\nage = int(s)\nprint(age + 5)',
            outputPreview: "21",
            explanation: "Sau khi ép kiểu sang int, biến có thể tham gia các phép toán số học."
          }
        },
        examples: [
          {
            title: "Ví dụ: Ép kiểu chuỗi",
            explanation: "Chuyển chuỗi sang số nguyên và cộng thêm 1.",
            code: 's = "2026"\nyear = int(s)\nprint("Nam sau:", year + 1)',
            output: "Nam sau: 2027"
          }
        ],
        multipleChoice: {
          question: "Nếu biến `x = \"10\"`, thì `type(int(x))` sẽ trả về kết quả gì?",
          options: ["<class 'str'>", "<class 'int'>", "<class 'float'>", "<class 'number'>"],
          correctIndex: 1,
          explanation: "Hàm int() chuyển giá trị thành số nguyên, do đó kiểu dữ liệu là <class 'int'>."
        }
      },
      practice: {
        id: "t2-p2",
        title: "Bài 2: Nhập Dữ Liệu & Chuyển Kiểu",
        difficulty: "Cơ bản",
        problemStatement: "Nhập một chuỗi ký tự đại diện cho tuổi của một người từ bàn phím. Chuyển chuỗi đó thành số nguyên và in ra:\n- Dòng 1: `Tuoi hien tai: <tuoi>`\n- Dòng 2: `Tuoi sau 5 nam: <tuoi + 5>`\n- Dòng 3: `Kieu du lieu: <type(tuoi)>`",
        inputFormat: "Một dòng chứa chuỗi số tuổi.",
        outputFormat: "Gồm 3 dòng theo định dạng mô tả.",
        constraints: "Tuổi là số nguyên dương từ 1 đến 120.",
        sampleCases: [
          {
            input: "15",
            output: "Tuoi hien tai: 15\nTuoi sau 5 nam: 20\nKieu du lieu: <class 'int'>",
            explanation: "15 + 5 = 20 và kiểu biến là <class 'int'>."
          }
        ],
        starterCode: `# Nhập chuỗi tuổi từ bàn phím
s = input()

# TODO: Ép kiểu sang số nguyên int và in kết quả
`,
        testCases: [
          {
            id: "t2-2-tc1",
            input: "15",
            expectedOutput: "Tuoi hien tai: 15\nTuoi sau 5 nam: 20\nKieu du lieu: <class 'int'>",
            isHidden: false,
            explanation: "Kiểm tra với tuổi 15."
          },
          {
            id: "t2-2-tc2",
            input: "18",
            expectedOutput: "Tuoi hien tai: 18\nTuoi sau 5 nam: 23\nKieu du lieu: <class 'int'>",
            isHidden: false,
            explanation: "Kiểm tra với tuổi 18."
          }
        ],
        hints: [
          "Dùng `tuoi = int(s)` để chuyển chuỗi sang số nguyên.",
          "Dòng 3 dùng `print(\"Kieu du lieu:\", type(tuoi))` hoặc `print(f\"Kieu du lieu: {type(tuoi)}\")`."
        ],
        solutionExplanation: "s = input()\ntuoi = int(s)\nprint(f\"Tuoi hien tai: {tuoi}\")\nprint(f\"Tuoi sau 5 nam: {tuoi + 5}\")\nprint(f\"Kieu du lieu: {type(tuoi)}\")"
      }
    },
    {
      id: "t2-l3",
      moduleId: "topic-2",
      moduleTitle: "Chủ đề 2: Biến & Kiểu Dữ Liệu",
      order: 3,
      title: "Bài 3: Tính Điểm Trung Bình",
      description: "Nhập điểm Toán và Văn. Lưu các giá trị vào biến và tính điểm trung bình.",
      durationMin: 15,
      xpReward: 50,
      theory: {
        summary: "Điểm số thường là số thực (`float`). Để tính điểm trung bình hai môn Toán và Văn, ta áp dụng công thức: `(toan + van) / 2`.",
        keyPoints: [
          "Dùng `float(input())` để nhận điểm số có phần thập phân.",
          "Làm tròn điểm số bằng hàm `round(dtb, 2)` hoặc định dạng f-string `f\"{dtb:.2f}\"`."
        ],
        conceptIllustration: {
          type: "syntax",
          title: "Tính Điểm Trung Bình",
          description: "DTB = (Toán + Văn) / 2.0",
          visualData: {
            codeSnippet: "toan = 8.5\nvan = 7.5\ndtb = (toan + van) / 2\nprint(f\"DTB: {dtb:.2f}\")",
            outputPreview: "DTB: 8.00",
            explanation: "Tính trung bình cộng và định dạng 2 chữ số thập phân."
          }
        },
        examples: [
          {
            title: "Ví dụ: Tính điểm",
            explanation: "Nhập 2 số thực và tính trung bình cộng.",
            code: "toan = 9.0\nvan = 8.0\ndtb = (toan + van) / 2\nprint(f\"Diem trung binh: {dtb:.2f}\")",
            output: "Diem trung binh: 8.50"
          }
        ],
        multipleChoice: {
          question: "Để nhập một số thực có dấu chấm thập phân từ bàn phím trong Python, ta dùng lệnh nào?",
          options: ["int(input())", "float(input())", "str(input())", "double(input())"],
          correctIndex: 1,
          explanation: "float(input()) chuyển dữ liệu nhập vào thành kiểu số thực (float)."
        }
      },
      practice: {
        id: "t2-p3",
        title: "Bài 3: Tính Điểm Trung Bình",
        difficulty: "Cơ bản",
        problemStatement: "Nhập điểm Toán và điểm Văn của một học sinh (mỗi điểm trên một dòng, kiểu số thực). Tính điểm trung bình cộng của 2 môn và in ra kết quả với 2 chữ số thập phân theo mẫu:\n`Diem trung binh: <dtb>`",
        inputFormat: "Gồm 2 dòng:\n- Dòng 1: Điểm Toán (float)\n- Dòng 2: Điểm Văn (float)",
        outputFormat: "Một dòng dạng: `Diem trung binh: <dtb:.2f>`",
        constraints: "0.0 <= toan, van <= 10.0.",
        sampleCases: [
          {
            input: "8.5\n7.5",
            output: "Diem trung binh: 8.00",
            explanation: "(8.5 + 7.5) / 2 = 8.00."
          }
        ],
        starterCode: `# Nhập điểm Toán và Văn
toan = float(input())
van = float(input())

# TODO: Tính điểm trung bình và in với 2 chữ số thập phân
`,
        testCases: [
          {
            id: "t2-3-tc1",
            input: "8.5\n7.5",
            expectedOutput: "Diem trung binh: 8.00",
            isHidden: false,
            explanation: "Kiểm tra 8.5 và 7.5."
          },
          {
            id: "t2-3-tc2",
            input: "9.25\n8.5",
            expectedOutput: "Diem trung binh: 8.88",
            isHidden: false,
            explanation: "Kiểm tra làm tròn 8.875 -> 8.88."
          },
          {
            id: "t2-3-tc3",
            input: "10.0\n10.0",
            expectedOutput: "Diem trung binh: 10.00",
            isHidden: true,
            explanation: "Kiểm tra điểm tuyệt đối."
          }
        ],
        hints: [
          "Công thức: `dtb = (toan + van) / 2`",
          "In ra: `print(f\"Diem trung binh: {dtb:.2f}\")`"
        ],
        solutionExplanation: "toan = float(input())\nvan = float(input())\ndtb = (toan + van) / 2\nprint(f\"Diem trung binh: {dtb:.2f}\")"
      }
    },
    {
      id: "t2-l4",
      moduleId: "topic-2",
      moduleTitle: "Chủ đề 2: Biến & Kiểu Dữ Liệu",
      order: 4,
      title: "Bài 4: Chuyển Đổi Kiểu Dữ Liệu",
      description: "Cho một số nguyên, chuyển nó lần lượt sang kiểu float và str. In kết quả và kiểu dữ liệu tương ứng.",
      durationMin: 15,
      xpReward: 50,
      theory: {
        summary: "Ép kiểu dữ liệu (Type Casting) là quá trình chuyển đổi một giá trị từ kiểu dữ liệu này sang kiểu dữ liệu khác bằng các hàm int(), float(), str(), bool().",
        keyPoints: [
          "`float(n)`: Chuyển số nguyên thành số thực có phần thập phân (ví dụ 10 -> 10.0).",
          "`str(n)`: Chuyển số thành chuỗi ký tự (ví dụ 10 -> '10').",
          "Có thể in giá trị kèm `type(bien)` để kiểm tra kiểu."
        ],
        conceptIllustration: {
          type: "syntax",
          title: "Chuyển Đổi Kiểu Dữ Liệu",
          description: "int(10) -> float: 10.0 (<class 'float'>) -> str: '10' (<class 'str'>)",
          visualData: {
            codeSnippet: "n = 10\nf = float(n)\ns = str(n)",
            outputPreview: "10.0 <class 'float'>\n10 <class 'str'>",
            explanation: "Kiểm tra giá trị và kiểu dữ liệu sau khi ép kiểu."
          }
        },
        examples: [
          {
            title: "Ví dụ: Ép kiểu float và str",
            explanation: "Chuyển số nguyên 25 sang float và chuỗi.",
            code: "x = 25\nprint(float(x), type(float(x)))\nprint(str(x), type(str(x)))",
            output: "25.0 <class 'float'>\n25 <class 'str'>"
          }
        ],
        multipleChoice: {
          question: "Hàm nào dùng để chuyển một giá trị sang kiểu chuỗi ký tự trong Python?",
          options: ["string()", "toString()", "str()", "toStr()"],
          correctIndex: 2,
          explanation: "Trong Python, hàm str() dùng để chuyển đổi bất kỳ giá trị nào sang kiểu chuỗi."
        }
      },
      practice: {
        id: "t2-p4",
        title: "Bài 4: Chuyển Đổi Kiểu Dữ Liệu",
        difficulty: "Cơ bản",
        problemStatement: "Nhập một số nguyên `n` từ bàn phím. Hãy chuyển `n` lần lượt sang kiểu `float` và `str`. In ra 2 dòng:\n- Dòng 1: Giá trị float và kiểu dữ liệu tương ứng (cách nhau 1 dấu cách)\n- Dòng 2: Giá trị str và kiểu dữ liệu tương ứng (cách nhau 1 dấu cách)",
        inputFormat: "Một dòng chứa số nguyên n.",
        outputFormat: "Gồm 2 dòng:\n<n_float> <class 'float'>\n<n_str> <class 'str'>",
        constraints: "-10000 <= n <= 10000.",
        sampleCases: [
          {
            input: "100",
            output: "100.0 <class 'float'>\n100 <class 'str'>",
            explanation: "100 chuyển thành 100.0 kiểu float và '100' kiểu str."
          }
        ],
        starterCode: `# Nhập số nguyên n
n = int(input())

# TODO: Chuyển sang float và str, in kèm type()
`,
        testCases: [
          {
            id: "t2-4-tc1",
            input: "100",
            expectedOutput: "100.0 <class 'float'>\n100 <class 'str'>",
            isHidden: false,
            explanation: "Kiểm tra với số 100."
          },
          {
            id: "t2-4-tc2",
            input: "-45",
            expectedOutput: "-45.0 <class 'float'>\n-45 <class 'str'>",
            isHidden: false,
            explanation: "Kiểm tra số âm."
          }
        ],
        hints: [
          "`f = float(n)` rồi `print(f, type(f))`",
          "`s = str(n)` rồi `print(s, type(s))`"
        ],
        solutionExplanation: "n = int(input())\nf = float(n)\ns = str(n)\nprint(f, type(f))\nprint(s, type(s))"
      }
    },
    {
      id: "t2-l5",
      moduleId: "topic-2",
      moduleTitle: "Chủ đề 2: Biến & Kiểu Dữ Liệu",
      order: 5,
      title: "Bài 5: Phiếu Thông Tin Học Sinh Khung Ký Tự #",
      description: "Nhập họ tên, tuổi, điểm Toán và điểm Văn. In thông tin trong một khung được tạo bằng ký tự #.",
      durationMin: 20,
      xpReward: 60,
      theory: {
        summary: "Sử dụng các ký tự đặc biệt như `#` nhân với một số (ví dụ `'#' * 30`) để tạo viền bảng báo cáo trực quan và chuyên nghiệp.",
        keyPoints: [
          "Phép nhân chuỗi trong Python: `'#' * 30` sẽ tạo ra 30 ký tự `#` liên tiếp.",
          "Kết hợp viền trên, viền dưới và nội dung ở giữa để tạo khung thông tin."
        ],
        conceptIllustration: {
          type: "syntax",
          title: "Tạo Khung Bằng Phép Nhân Chuỗi",
          description: "'#' * 30 -> ##############################",
          visualData: {
            codeSnippet: "border = '#' * 30\nprint(border)\nprint('# PHIEU THONG TIN HOC SINH #')\nprint(border)",
            outputPreview: "##############################\n# PHIEU THONG TIN HOC SINH #\n##############################",
            explanation: "Tạo khung viền mỹ thuật đơn giản."
          }
        },
        examples: [
          {
            title: "Ví dụ: In khung thông tin",
            explanation: "Tạo viền bao quanh chuỗi văn bản.",
            code: "print('#' * 20)\nprint('# Xin chao Python  #')\nprint('#' * 20)",
            output: "####################\n# Xin chao Python  #\n####################"
          }
        ],
        multipleChoice: {
          question: "Biểu thức `\"*\" * 5` trong Python trả về kết quả gì?",
          options: ["5*", "*****", "* 5", "Báo lỗi cú pháp"],
          correctIndex: 1,
          explanation: "Toán tử nhân chuỗi với số nguyên n sẽ lặp lại chuỗi đó n lần."
        }
      },
      practice: {
        id: "t2-p5",
        title: "Bài 5: Phiếu Thông Tin Học Sinh Khung Ký Tự #",
        difficulty: "Cơ bản",
        problemStatement: "Nhập 4 dòng thông tin của một học sinh: Họ tên, tuổi, điểm Toán, điểm Văn. In phiếu thông tin nằm gọn trong khung được viền bởi 32 ký tự `#` ở trên cùng và dưới cùng theo đúng mẫu:\n\n################################\n# PHIEU KET QUA HOC TAP\n# Ho ten: <ho_ten>\n# Tuoi: <tuoi>\n# Diem Toan: <diem_toan>\n# Diem Van: <diem_van>\n################################",
        inputFormat: "Gồm 4 dòng:\n- Dòng 1: Họ tên (str)\n- Dòng 2: Tuổi (int)\n- Dòng 3: Điểm Toán (float)\n- Dòng 4: Điểm Văn (float)",
        outputFormat: "In ra đúng mẫu 7 dòng có khung viền 32 ký tự #.",
        constraints: "Tuổi từ 1..100, điểm từ 0.0..10.0.",
        sampleCases: [
          {
            input: "Nguyen Van An\n16\n9.0\n8.5",
            output: "################################\n# PHIEU KET QUA HOC TAP\n# Ho ten: Nguyen Van An\n# Tuoi: 16\n# Diem Toan: 9.0\n# Diem Van: 8.5\n################################",
            explanation: "Khung thông tin học sinh chuẩn."
          }
        ],
        starterCode: `# Nhập thông tin học sinh
ho_ten = input()
tuoi = int(input())
diem_toan = float(input())
diem_van = float(input())

# TODO: In phiếu kết quả có khung viền 32 ký tự #
`,
        testCases: [
          {
            id: "t2-5-tc1",
            input: "Nguyen Van An\n16\n9.0\n8.5",
            expectedOutput: "################################\n# PHIEU KET QUA HOC TAP\n# Ho ten: Nguyen Van An\n# Tuoi: 16\n# Diem Toan: 9.0\n# Diem Van: 8.5\n################################",
            isHidden: false,
            explanation: "Kiểm tra mẫu 1."
          },
          {
            id: "t2-5-tc2",
            input: "Le Bao Chau\n15\n10.0\n9.5",
            expectedOutput: "################################\n# PHIEU KET QUA HOC TAP\n# Ho ten: Le Bao Chau\n# Tuoi: 15\n# Diem Toan: 10.0\n# Diem Van: 9.5\n################################",
            isHidden: false,
            explanation: "Kiểm tra mẫu 2."
          }
        ],
        hints: [
          "Dùng viền: `border = '#' * 32`",
          "In `print(border)` ở đầu và cuối.",
          "Các dòng giữa in có `# ` ở đầu mỗi dòng."
        ],
        solutionExplanation: "ho_ten = input()\ntuoi = int(input())\ndiem_toan = float(input())\ndiem_van = float(input())\nborder = '#' * 32\nprint(border)\nprint('# PHIEU KET QUA HOC TAP')\nprint(f'# Ho ten: {ho_ten}')\nprint(f'# Tuoi: {tuoi}')\nprint(f'# Diem Toan: {diem_toan}')\nprint(f'# Diem Van: {diem_van}')\nprint(border)"
      }
    }
  ]
};
