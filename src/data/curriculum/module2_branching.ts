import { Module } from "../../types";

export const MODULE_2_BRANCHING: Module = {
  id: "module-2",
  title: "Chương 2: Cấu Trúc Rẽ Nhánh & Điều Kiện (If, Else, Elif)",
  description: "Làm chủ tư duy rẽ nhánh trong lập trình với câu lệnh if, if-else, if-elif-else, các toán tử so sánh, toán tử logic và cấu trúc rẽ nhánh lồng nhau.",
  iconName: "GitFork",
  order: 2,
  color: "from-blue-500 to-indigo-700",
  lessons: [
    {
      id: "lesson-5",
      moduleId: "module-2",
      moduleTitle: "Chương 2: Cấu Trúc Rẽ Nhánh & Điều Kiện",
      order: 1,
      title: "Bài 5: Câu Lệnh if Đơn & Toán Tử So Sánh",
      description: "Học cách kiểm tra điều kiện logic với câu lệnh if, hiểu quy tắc thụt lề 4 dấu cách và các toán tử so sánh.",
      durationMin: 20,
      xpReward: 60,
      theory: {
        summary: "Câu lệnh if cho phép chương trình chỉ thực hiện một khối lệnh khi điều kiện đưa ra là đúng (True). Nếu điều kiện sai (False), khối lệnh đó sẽ bị bỏ qua.",
        keyPoints: [
          "Cú pháp: `if dieu_kien:` (luôn có dấu hai chấm `:` ở cuối dòng if).",
          "Khối lệnh bên trong if **bắt buộc phải thụt lề** (chuẩn là 4 dấu cách).",
          "Các toán tử so sánh trả về `True` hoặc `False`:",
          "  - `==`: So sánh bằng nhau (chú ý: dùng 2 dấu bằng, khác với 1 dấu bằng gán biến).",
          "  - `!=`: So sánh khác nhau.",
          "  - `>`, `<`: Lớn hơn, nhỏ hơn.",
          "  - `>=`, `<=`: Lớn hơn hoặc bằng, nhỏ hơn hoặc bằng."
        ],
        conceptIllustration: {
          type: "branching",
          title: "Sơ đồ khối câu lệnh if",
          description: "Kiểm tra điều kiện: Nếu True -> chạy khối lệnh con; Nếu False -> đi thẳng tiếp tục chương trình.",
          visualData: {
            condition: "age >= 18",
            ifTrue: "In ra 'Du tuoi bau cu'",
            ifFalse: "Bo qua, tiep tuc chay"
          }
        },
        examples: [
          {
            title: "Ví dụ: Kiểm tra số dương",
            explanation: "In thông báo nếu số n lớn hơn 0.",
            code: "n = int(input())\nif n > 0:\n    print(\"Day la so duong\")\nprint(\"Ket thuc\")",
            output: "Đầu vào: 5\nDay la so duong\nKet thuc"
          }
        ],
        multipleChoice: {
          question: "Trong Python, toán tử nào dùng để so sánh hai giá trị xem chúng có BẰNG NHAU hay không?",
          options: [
            "=",
            "==",
            "===",
            "equals"
          ],
          correctIndex: 1,
          explanation: "Trong Python, dấu '=' là toán tử gán giá trị, còn '==' mới là toán tử so sánh bằng."
        }
      },
      practice: {
        id: "practice-5",
        title: "Thử thách 5: Kiểm Tra Đủ Điểm Qua Môn",
        difficulty: "Cơ bản",
        problemStatement: "Một trường học quy định: nếu điểm tổng kết `score >= 5.0` thì học sinh được coi là 'DAT' môn học. Viết chương trình nhập vào một số thực `score`. Nếu `score >= 5.0`, hãy in ra dòng chữ `DAT`.",
        inputFormat: "Một dòng chứa số thực score (0.0 <= score <= 10.0).",
        outputFormat: "In ra `DAT` nếu score >= 5.0 (nếu không đạt thì không in gì).",
        constraints: "0.0 <= score <= 10.0.",
        sampleCases: [
          {
            input: "7.5",
            output: "DAT",
            explanation: "Vì 7.5 >= 5.0 nên điều kiện thỏa mãn, in ra DAT."
          },
          {
            input: "4.0",
            output: "",
            explanation: "Vì 4.0 < 5.0 nên điều kiện không thỏa mãn, không in gì ra màn hình."
          }
        ],
        starterCode: `# Nhập điểm số thực từ bàn phím
score = float(input())

# Viết câu lệnh if kiểm tra điều kiện score >= 5.0
if score >= 5.0:
    print("DAT")
`,
        testCases: [
          {
            id: "tc5-1",
            input: "7.5",
            expectedOutput: "DAT",
            isHidden: false,
            explanation: "Điểm 7.5 >= 5.0 -> In DAT"
          },
          {
            id: "tc5-2",
            input: "4.0",
            expectedOutput: "",
            isHidden: false,
            explanation: "Điểm 4.0 < 5.0 -> Không in gì"
          },
          {
            id: "tc5-3",
            input: "5.0",
            expectedOutput: "DAT",
            isHidden: true,
            explanation: "Điểm biên 5.0 >= 5.0 -> In DAT"
          }
        ],
        hints: [
          "Sử dụng score = float(input()).",
          "Dùng if score >= 5.0: và thụt lề print(\"DAT\")."
        ],
        solutionExplanation: "score = float(input())\nif score >= 5.0:\n    print('DAT')"
      }
    },
    {
      id: "lesson-6",
      moduleId: "module-2",
      moduleTitle: "Chương 2: Cấu Trúc Rẽ Nhánh & Điều Kiện",
      order: 2,
      title: "Bài 6: Cấu Trúc Rẽ Nhánh if...else & Toán Tử Logic",
      description: "Rẽ 2 nhánh rõ ràng với if...else và kết hợp nhiều điều kiện logic bằng các toán tử and, or, not.",
      durationMin: 25,
      xpReward: 70,
      theory: {
        summary: "Cấu trúc if...else giúp chương trình chọn 1 trong 2 nhánh xử lý: Nếu điều kiện đúng thì làm nhánh if, ngược lại (else) thì làm nhánh else.",
        keyPoints: [
          "Cú pháp if...else:",
          "  ```python",
          "  if dieu_kien:",
          "      # Chạy khi điều kiện là True",
          "  else:",
          "      # Chạy khi điều kiện là False",
          "  ```",
          "Toán tử logic kết hợp điều kiện:",
          "  - `and`: Trả về `True` khi TẤT CẢ các điều kiện đều đúng (ví dụ: `a > 0 and a % 2 == 0`).",
          "  - `or`: Trả về `True` khi ÍT NHẤT MỘT điều kiện đúng.",
          "  - `not`: Phủ định giá trị logic (`not True` -> `False`)."
        ],
        conceptIllustration: {
          type: "branching",
          title: "Cơ chế rẽ 2 nhánh if...else",
          description: "Kiểm tra số chẵn / lẻ bằng phép chia dư cho 2 (n % 2 == 0)",
          visualData: {
            condition: "n % 2 == 0",
            ifTrue: "In ra 'CHAN'",
            ifFalse: "In ra 'LE'"
          }
        },
        examples: [
          {
            title: "Ví dụ: Kiểm tra số chẵn hay lẻ",
            explanation: "Sử dụng n % 2 == 0 để kiểm tra.",
            code: "n = int(input())\nif n % 2 == 0:\n    print(\"CHAN\")\nelse:\n    print(\"LE\")",
            output: "Đầu vào: 7\nLE"
          }
        ],
        multipleChoice: {
          question: "Biểu thức nào sau đây kiểm tra số nguyên n là số dương và đồng thời chia hết cho 3?",
          options: [
            "n > 0 or n % 3 == 0",
            "n > 0 and n % 3 == 0",
            "n > 0 && n % 3 == 0",
            "n > 0 not n % 3 == 0"
          ],
          correctIndex: 1,
          explanation: "Trong Python, từ khóa 'and' dùng để kết hợp 2 điều kiện bắt buộc đồng thời xảy ra."
        }
      },
      practice: {
        id: "practice-6",
        title: "Thử thách 6: Kiểm Tra Số Chẵn Lẻ & Dương Âm",
        difficulty: "Cơ bản",
        problemStatement: "Viết chương trình nhập vào một số nguyên `n` (n khác 0). Nếu `n` là số chẵn, hãy in ra `CHAN`. Ngược lại nếu `n` là số lẻ, hãy in ra `LE`.",
        inputFormat: "Một dòng chứa số nguyên n (n != 0).",
        outputFormat: "In ra `CHAN` hoặc `LE`.",
        constraints: "-10^9 <= n <= 10^9, n != 0.",
        sampleCases: [
          {
            input: "8",
            output: "CHAN",
            explanation: "8 chia hết cho 2 (8 % 2 == 0) nên là số chẵn."
          },
          {
            input: "15",
            output: "LE",
            explanation: "15 chia 2 dư 1 nên là số lẻ."
          }
        ],
        starterCode: `n = int(input())

# Dùng cấu trúc if...else để kiểm tra n % 2 == 0
if n % 2 == 0:
    print("CHAN")
else:
    print("LE")
`,
        testCases: [
          {
            id: "tc6-1",
            input: "8",
            expectedOutput: "CHAN",
            isHidden: false,
            explanation: "Số chẵn dương 8"
          },
          {
            id: "tc6-2",
            input: "15",
            expectedOutput: "LE",
            isHidden: false,
            explanation: "Số lẻ dương 15"
          },
          {
            id: "tc6-3",
            input: "-4",
            expectedOutput: "CHAN",
            isHidden: true,
            explanation: "Số chẵn âm -4"
          },
          {
            id: "tc6-4",
            input: "-9",
            expectedOutput: "LE",
            isHidden: true,
            explanation: "Số lẻ âm -9"
          }
        ],
        hints: [
          "Dùng n = int(input()).",
          "Kiểm tra if n % 2 == 0: print(\"CHAN\") else: print(\"LE\")."
        ],
        solutionExplanation: "n = int(input())\nif n % 2 == 0:\n    print('CHAN')\nelse:\n    print('LE')"
      }
    },
    {
      id: "lesson-7",
      moduleId: "module-2",
      moduleTitle: "Chương 2: Cấu Trúc Rẽ Nhánh & Điều Kiện",
      order: 3,
      title: "Bài 7: Cấu Trúc Nhiều Nhánh if...elif...else",
      description: "Xử lý các bài toán có từ 3 trường hợp trở lên một cách gọn gàng và chuẩn xác với từ khóa elif (viết tắt của else if).",
      durationMin: 25,
      xpReward: 70,
      theory: {
        summary: "Khi có nhiều hơn 2 phương án lựa chọn, ta sử dụng cú pháp if...elif...else. Python sẽ kiểm tra các điều kiện tuần tự từ trên xuống dưới, nhánh nào đúng đầu tiên sẽ được thực thi và kết thúc cấu trúc.",
        keyPoints: [
          "Cú pháp chuẩn:",
          "  ```python",
          "  if dieu_kien_1:",
          "      # Chay khi dieu_kien_1 la True",
          "  elif dieu_kien_2:",
          "      # Chay khi dieu_kien_1 False va dieu_kien_2 True",
          "  else:",
          "      # Chay khi tat ca cac dieu kien tren deu False",
          "  ```",
          "Có thể có nhiều khối `elif` tùy theo số lượng trường hợp cần xét.",
          "Khối `else` ở cuối là tùy chọn (chạy khi không có điều kiện nào ở trên thỏa mãn)."
        ],
        conceptIllustration: {
          type: "branching",
          title: "Sơ đồ đa nhánh if - elif - else",
          description: "Phân loại học sinh theo thang điểm trung bình",
          visualData: {
            condition: "diem >= 8.0 -> Gioi | diem >= 6.5 -> Kha | diem >= 5.0 -> Trung binh | Con lai -> Yeu",
            ifTrue: "Chỉ thực hiện đúng 1 nhánh đầu tiên khớp điều kiện",
            ifFalse: "Chuyển tiếp xuống kiểm tra điều kiện elif kế tiếp"
          }
        },
        examples: [
          {
            title: "Ví dụ: Xét dấu của số nguyên",
            explanation: "Kiểm tra số âm, số 0 hoặc số dương.",
            code: "n = int(input())\nif n > 0:\n    print(\"Duong\")\nelif n < 0:\n    print(\"Am\")\nelse:\n    print(\"Khong\")",
            output: "Đầu vào: -12\nAm"
          }
        ],
        multipleChoice: {
          question: "Trong cấu trúc `if...elif...else`, nếu cả điều kiện của `if` và điều kiện của `elif` đầu tiên đều đúng (True), chuyện gì sẽ xảy ra?",
          options: [
            "Cả hai khối lệnh đều được thực thi.",
            "Chỉ khối lệnh của 'if' được thực thi.",
            "Chỉ khối lệnh của 'elif' được thực thi.",
            "Chương trình báo lỗi cú pháp."
          ],
          correctIndex: 1,
          explanation: "Trong cấu trúc if...elif...else, Python chỉ chạy duy nhất khối lệnh đầu tiên có điều kiện thỏa mãn True rồi thoát khỏi toàn bộ khối rẽ nhánh."
        }
      },
      practice: {
        id: "practice-7",
        title: "Thử thách 7: Xếp Loại Học Lực Học Sinh",
        difficulty: "Cơ bản",
        problemStatement: "Viết chương trình nhập vào điểm trung bình môn học `gpa` (số thực từ 0.0 đến 10.0). Hãy in ra xếp loại học lực của học sinh theo thang chuẩn sau:\n- `XUAT SAC`: nếu `gpa >= 9.0`\n- `GIOI`: nếu `8.0 <= gpa < 9.0`\n- `KHA`: nếu `6.5 <= gpa < 8.0`\n- `TRUNG BINH`: nếu `5.0 <= gpa < 6.5`\n- `YEU`: nếu `gpa < 5.0`",
        inputFormat: "Một dòng chứa số thực gpa (0.0 <= gpa <= 10.0).",
        outputFormat: "In ra một trong các chuỗi: `XUAT SAC`, `GIOI`, `KHA`, `TRUNG BINH`, `YEU`.",
        constraints: "0.0 <= gpa <= 10.0.",
        sampleCases: [
          {
            input: "8.6",
            output: "GIOI",
            explanation: "8.6 nằm trong khoảng [8.0, 9.0) nên xếp loại GIOI."
          },
          {
            input: "9.5",
            output: "XUAT SAC",
            explanation: "9.5 >= 9.0 nên xếp loại XUAT SAC."
          },
          {
            input: "4.5",
            output: "YEU",
            explanation: "4.5 < 5.0 nên xếp loại YEU."
          }
        ],
        starterCode: `gpa = float(input())

# Dùng cấu trúc if - elif - else để xếp loại theo thứ tự từ cao xuống thấp
if gpa >= 9.0:
    print("XUAT SAC")
elif gpa >= 8.0:
    print("GIOI")
elif gpa >= 6.5:
    print("KHA")
elif gpa >= 5.0:
    print("TRUNG BINH")
else:
    print("YEU")
`,
        testCases: [
          {
            id: "tc7-1",
            input: "8.6",
            expectedOutput: "GIOI",
            isHidden: false,
            explanation: "Kiểm tra xếp loại Giỏi: 8.6"
          },
          {
            id: "tc7-2",
            input: "9.5",
            expectedOutput: "XUAT SAC",
            isHidden: false,
            explanation: "Kiểm tra xếp loại Xuất sắc: 9.5"
          },
          {
            id: "tc7-3",
            input: "6.8",
            expectedOutput: "KHA",
            isHidden: false,
            explanation: "Kiểm tra xếp loại Khá: 6.8"
          },
          {
            id: "tc7-4",
            input: "5.2",
            expectedOutput: "TRUNG BINH",
            isHidden: true,
            explanation: "Kiểm tra xếp loại Trung bình: 5.2"
          },
          {
            id: "tc7-5",
            input: "3.5",
            expectedOutput: "YEU",
            isHidden: true,
            explanation: "Kiểm tra xếp loại Yếu: 3.5"
          }
        ],
        hints: [
          "Xếp các điều kiện từ cao xuống thấp (>= 9.0, >= 8.0, >= 6.5, >= 5.0, còn lại là else).",
          "Viết đúng chính tả in hoa: 'XUAT SAC', 'GIOI', 'KHA', 'TRUNG BINH', 'YEU'."
        ],
        solutionExplanation: "gpa = float(input())\nif gpa >= 9.0:\n    print('XUAT SAC')\nelif gpa >= 8.0:\n    print('GIOI')\nelif gpa >= 6.5:\n    print('KHA')\nelif gpa >= 5.0:\n    print('TRUNG BINH')\nelse:\n    print('YEU')"
      }
    },
    {
      id: "lesson-8",
      moduleId: "module-2",
      moduleTitle: "Chương 2: Cấu Trúc Rẽ Nhánh & Điều Kiện",
      order: 4,
      title: "Bài 8: Cấu Trúc Rẽ Nhánh Lồng Nhau (Nested If-Else)",
      description: "Học kỹ thuật lồng các câu lệnh if bên trong if khác để giải quyết bài toán điều kiện nhiều cấp độ và tìm giá trị lớn nhất trong 3 số.",
      durationMin: 25,
      xpReward: 70,
      theory: {
        summary: "Cấu trúc rẽ nhánh lồng nhau (Nested conditionals) là việc đặt một hoặc nhiều câu lệnh if/else bên trong khối lệnh của một câu lệnh if/else khác. Kỹ thuật này giúp phân loại bài toán từng bước một cách chặt chẽ.",
        keyPoints: [
          "Một lệnh `if` nằm bên trong một lệnh `if` khác gọi là **Nested If**.",
          "Quy tắc thụt lề (Indentation) càng vào sâu thì càng tăng thêm 4 dấu cách mỗi cấp.",
          "Ứng dụng phổ biến: Xét điều kiện tiên quyết trước (ví dụ: `a != 0`), sau đó mới xét các trường hợp con bên trong.",
          "Cần cẩn thận đối chiếu dấu lề để biết `else` thuộc về `if` nào."
        ],
        conceptIllustration: {
          type: "branching",
          title: "Cơ chế điều kiện lồng nhau (Nested If)",
          description: "Kiểm tra tính hợp lệ cấp 1 -> Sau đó kiểm tra tính chất cấp 2",
          visualData: {
            condition: "if x > 0: -> if x % 2 == 0: (Chan duong) else: (Le duong)",
            ifTrue: "Cấp thụt lề thứ 2 (8 spaces)",
            ifFalse: "Nhánh ngoài cùng (4 spaces)"
          }
        },
        examples: [
          {
            title: "Ví dụ: Phân loại số dương chẵn / lẻ",
            explanation: "Sử dụng if lồng nhau.",
            code: "x = int(input())\nif x > 0:\n    if x % 2 == 0:\n        print(\"Duong chan\")\n    else:\n        print(\"Duong le\")\nelse:\n    print(\"Khong phai so duong\")",
            output: "Đầu vào: 6\nDuong chan"
          }
        ],
        multipleChoice: {
          question: "Trong Python, làm thế nào để biết một nhánh `else` thuộc về câu lệnh `if` nào khi có nhiều if lồng nhau?",
          options: [
            "Dựa vào dấu ngoặc nhọn { } bao quanh.",
            "Dựa vào mức độ thụt đầu dòng (indentation) thẳng hàng với câu lệnh if tương ứng.",
            "Dựa vào từ khóa endif.",
            "Mặc định luôn thuộc về if đầu tiên của chương trình."
          ],
          correctIndex: 1,
          explanation: "Python dùng mức độ thụt lề (khoảng trắng đầu dòng) để xác định phạm vi và phân cấp khối lệnh."
        }
      },
      practice: {
        id: "practice-8",
        title: "Thử thách 8: Tìm Số Lớn Nhất Trong 3 Số (Max of 3)",
        difficulty: "Trung bình",
        problemStatement: "Viết chương trình nhập vào 3 số nguyên `a`, `b`, `c` (mỗi số trên một dòng). Sử dụng cấu trúc rẽ nhánh điều kiện để tìm và in ra giá trị của số lớn nhất trong 3 số đó.",
        inputFormat: "Gồm 3 dòng, mỗi dòng chứa một số nguyên lần lượt là a, b, c.",
        outputFormat: "In ra duy nhất một số nguyên là giá trị lớn nhất.",
        constraints: "-10^9 <= a, b, c <= 10^9.",
        sampleCases: [
          {
            input: "15\n42\n28",
            output: "42",
            explanation: "Số lớn nhất trong 15, 42, 28 là 42."
          },
          {
            input: "-5\n-1\n-10",
            output: "-1",
            explanation: "Số lớn nhất trong các số âm là -1."
          }
        ],
        starterCode: `# Nhập 3 số nguyên a, b, c
a = int(input())
b = int(input())
c = int(input())

# Tìm số lớn nhất và gán vào max_val
max_val = a
if b > max_val:
    max_val = b
if c > max_val:
    max_val = c

print(max_val)
`,
        testCases: [
          {
            id: "tc8-1",
            input: "15\n42\n28",
            expectedOutput: "42",
            isHidden: false,
            explanation: "Số lớn nhất ở vị trí b: 15, 42, 28"
          },
          {
            id: "tc8-2",
            input: "99\n12\n50",
            expectedOutput: "99",
            isHidden: false,
            explanation: "Số lớn nhất ở vị trí a: 99, 12, 50"
          },
          {
            id: "tc8-3",
            input: "10\n20\n85",
            expectedOutput: "85",
            isHidden: false,
            explanation: "Số lớn nhất ở vị trí c: 10, 20, 85"
          },
          {
            id: "tc8-4",
            input: "-5\n-1\n-10",
            expectedOutput: "-1",
            isHidden: true,
            explanation: "Kiểm tra với các số âm: -5, -1, -10"
          },
          {
            id: "tc8-5",
            input: "7\n7\n7",
            expectedOutput: "7",
            isHidden: true,
            explanation: "Trường hợp 3 số bằng nhau: 7, 7, 7"
          }
        ],
        hints: [
          "Giả sử ban đầu max_val = a.",
          "Nếu b > max_val thì cập nhật max_val = b.",
          "Nếu c > max_val thì cập nhật max_val = c.",
          "Cuối cùng in ra max_val."
        ],
        solutionExplanation: "a = int(input())\nb = int(input())\nc = int(input())\nmax_val = a\nif b > max_val:\n    max_val = b\nif c > max_val:\n    max_val = c\nprint(max_val)"
      }
    }
  ]
};
