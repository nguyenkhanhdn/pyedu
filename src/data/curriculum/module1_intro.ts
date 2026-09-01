import { Module } from "../../types";

export const MODULE_1_INTRO: Module = {
  id: "module-1",
  title: "Chương 1: Nhập Môn Python, Biến & Kiểu Dữ Liệu",
  description: "Khám phá cú pháp cơ bản của Python, hàm xuất print(), quy tắc biến, 4 kiểu dữ liệu nền tảng, phép toán số học và nhập dữ liệu input().",
  iconName: "Terminal",
  order: 1,
  color: "from-emerald-500 to-teal-700",
  lessons: [
    {
      id: "lesson-1",
      moduleId: "module-1",
      moduleTitle: "Chương 1: Nhập Môn Python, Biến & Kiểu Dữ Liệu",
      order: 1,
      title: "Bài 1: Làm Quen Với Python & Lệnh In print()",
      description: "Tìm hiểu cấu trúc chương trình Python đầu tiên và cách xuất chuỗi ký tự, số ra màn hình console.",
      durationMin: 15,
      xpReward: 50,
      theory: {
        summary: "Python là ngôn ngữ lập trình bậc cao hiện đại, nổi bật với cú pháp ngắn gọn và dễ đọc. Để hiển thị một thông điệp hoặc kết quả tính toán ra màn hình, ta sử dụng hàm dựng sẵn print().",
        keyPoints: [
          "Hàm `print()` dùng để xuất dữ liệu ra màn hình điều khiển.",
          "Chuỗi ký tự (văn bản) phải được đặt trong cặp dấu nháy kép `\"...\"` hoặc nháy đơn `'...'`.",
          "Có thể in nhiều phần tử trên một dòng bằng cách ngăn cách nhau bởi dấu phẩy `,` (Python sẽ tự chèn khoảng trắng giữa các phần tử).",
          "Mặc định, hàm `print()` sẽ tự động xuống dòng sau khi in xong."
        ],
        conceptIllustration: {
          type: "syntax",
          title: "Cấu trúc lệnh print()",
          description: "Dữ liệu được truyền vào bên trong cặp dấu ngoặc tròn của print() và xuất ra màn hình console.",
          visualData: {
            codeSnippet: "print(\"Xin chào các bạn!\", 2026)",
            outputPreview: "Xin chào các bạn! 2026",
            explanation: "Hàm print() nhận một chuỗi văn bản và một số nguyên, tự động chèn khoảng trắng và in ra màn hình."
          }
        },
        examples: [
          {
            title: "Ví dụ 1: In chuỗi văn bản đơn giản",
            explanation: "In một dòng chữ chào mừng ra màn hình.",
            code: 'print("Chào mừng bạn đến với khóa học Python!")',
            output: "Chào mừng bạn đến với khóa học Python!"
          },
          {
            title: "Ví dụ 2: In nhiều giá trị cùng lúc",
            explanation: "Dùng dấu phẩy để in cả văn bản và kết quả số.",
            code: 'print("Năm học mới:", 2026, "- PyEdu")',
            output: "Năm học mới: 2026 - PyEdu"
          }
        ],
        multipleChoice: {
          question: "Đoạn mã Python nào sau đây in đúng dòng chữ: Python rat de hoc?",
          options: [
            "print(Python rat de hoc)",
            "print(\"Python rat de hoc\")",
            'echo "Python rat de hoc"',
            'Console.WriteLine("Python rat de hoc")'
          ],
          correctIndex: 1,
          explanation: "Trong Python, chuỗi ký tự phải được bao quanh bởi cặp dấu nháy kép \"...\" hoặc nháy đơn '...' khi truyền vào hàm print()."
        }
      },
      practice: {
        id: "practice-1",
        title: "Thử thách 1: In Thẻ Thông Tin Học Sinh",
        difficulty: "Cơ bản",
        problemStatement: "Em hãy viết chương trình Python in ra 3 dòng thông tin giới thiệu bản thân theo đúng mẫu yêu cầu.",
        inputFormat: "Không có dữ liệu đầu vào.",
        outputFormat: "In chính xác 3 dòng:\nDòng 1: Xin chao Python\nDòng 2: Toi la hoc sinh lap trinh\nDòng 3: PyEdu 2026",
        constraints: "In đúng chính tả từng ký tự và phân biệt chữ hoa, chữ thường.",
        sampleCases: [
          {
            input: "",
            output: "Xin chao Python\nToi la hoc sinh lap trinh\nPyEdu 2026",
            explanation: "Chương trình in tuần tự 3 dòng văn bản bằng 3 lệnh print() riêng biệt."
          }
        ],
        starterCode: `# Viết các lệnh print() để in ra 3 dòng theo đề bài
print("Xin chao Python")
# Bổ sung 2 dòng còn lại bên dưới:
`,
        testCases: [
          {
            id: "tc1-1",
            input: "",
            expectedOutput: "Xin chao Python\nToi la hoc sinh lap trinh\nPyEdu 2026",
            isHidden: false,
            explanation: "Kiểm tra định dạng 3 dòng tiêu chuẩn."
          }
        ],
        hints: [
          "Sử dụng 3 lệnh print() liên tiếp nhau.",
          "Chú ý viết đúng chính tả từng từ: 'Xin chao Python', 'Toi la hoc sinh lap trinh', 'PyEdu 2026'."
        ],
        solutionExplanation: "Sử dụng 3 lệnh print() tuần tự:\nprint(\"Xin chao Python\")\nprint(\"Toi la hoc sinh lap trinh\")\nprint(\"PyEdu 2026\")"
      }
    },
    {
      id: "lesson-2",
      moduleId: "module-1",
      moduleTitle: "Chương 1: Nhập Môn Python, Biến & Kiểu Dữ Liệu",
      order: 2,
      title: "Bài 2: Biến (Variables) & Các Kiểu Dữ Liệu Cơ Bản",
      description: "Nắm vững khái niệm biến, quy tắc đặt tên biến (snake_case) và 4 kiểu dữ liệu cốt lõi: int, float, str, bool.",
      durationMin: 20,
      xpReward: 60,
      theory: {
        summary: "Biến là vùng nhớ được đặt tên dùng để lưu trữ giá trị trong chương trình. Python có cơ chế tự động nhận diện kiểu dữ liệu khi gán giá trị (Dynamic Typing).",
        keyPoints: [
          "Cú pháp gán biến: `ten_bien = gia_tri` (dùng một dấu bằng `=`).",
          "Kiểu số nguyên (`int`): ví dụ `10`, `-5`, `0`.",
          "Kiểu số thực (`float`): số có phần thập phân, ví dụ `3.14`, `-0.5`.",
          "Kiểu chuỗi (`str`): văn bản đặt trong dấu nháy kép hoặc đơn, ví dụ `\"Ha Noi\"`.",
          "Kiểu logic (`bool`): chỉ nhận 1 trong 2 giá trị `True` hoặc `False` (viết hoa chữ cái đầu).",
          "Quy tắc đặt tên biến: Bắt đầu bằng chữ cái hoặc dấu gạch dưới `_`, không bắt đầu bằng số, không chứa khoảng trắng hay ký tự đặc biệt, phân biệt hoa thường."
        ],
        conceptIllustration: {
          type: "variables",
          title: "Các kiểu dữ liệu cơ bản",
          description: "Mỗi biến có một kiểu dữ liệu tương ứng với loại giá trị mà nó đang nắm giữ.",
          visualData: {
            variables: [
              { name: "age", type: "int", value: 16 },
              { name: "gpa", type: "float", value: 8.5 },
              { name: "name", type: "str", value: "Minh Duc" },
              { name: "is_passed", type: "bool", value: true }
            ]
          }
        },
        examples: [
          {
            title: "Ví dụ: Khai báo và in các biến",
            explanation: "Khai báo các biến với các kiểu dữ liệu khác nhau và in ra màn hình.",
            code: 'ten = "Nam"\ntuoi = 15\ndiem_tb = 9.2\nda_tot_nghiep = True\n\nprint("Ten:", ten)\nprint("Tuoi:", tuoi)\nprint("Diem:", diem_tb)',
            output: "Ten: Nam\nTuoi: 15\nDiem: 9.2"
          }
        ],
        multipleChoice: {
          question: "Trong Python, tên biến nào sau đây là HỢP LỆ theo quy tắc?",
          options: [
            "2_hoc_sinh",
            "hoc sinh",
            "so_luong_hoc_sinh",
            "diem-so"
          ],
          correctIndex: 2,
          explanation: "Tên biến hợp lệ không được bắt đầu bằng chữ số, không chứa khoảng trắng, không chứa dấu gạch ngang '-', chỉ được chứa chữ cái, chữ số và dấu gạch dưới '_'."
        }
      },
      practice: {
        id: "practice-2",
        title: "Thử thách 2: Tính Tuổi & Lưu Trữ Biến Học Sinh",
        difficulty: "Cơ bản",
        problemStatement: "Cho thông tin một học sinh gồm: năm sinh `nam_sinh = 2010` và năm hiện tại `nam_hien_tai = 2026`. Em hãy tạo các biến, tính toán số tuổi của học sinh và in ra màn hình theo mẫu.",
        inputFormat: "Không có dữ liệu đầu vào (khai báo biến trực tiếp trong mã nguồn).",
        outputFormat: "In ra đúng 2 dòng:\nDòng 1: Nam sinh: 2010\nDòng 2: Tuoi: 16",
        constraints: "Tính tuổi bằng biểu thức biến: nam_hien_tai - nam_sinh.",
        sampleCases: [
          {
            input: "",
            output: "Nam sinh: 2010\nTuoi: 16",
            explanation: "Tuổi được tính bằng: 2026 - 2010 = 16."
          }
        ],
        starterCode: `# Khai báo các biến
nam_sinh = 2010
nam_hien_tai = 2026

# Tính tuổi và in kết quả theo mẫu đề bài
tuoi = nam_hien_tai - nam_sinh

print("Nam sinh:", nam_sinh)
print("Tuoi:", tuoi)
`,
        testCases: [
          {
            id: "tc2-1",
            input: "",
            expectedOutput: "Nam sinh: 2010\nTuoi: 16",
            isHidden: false,
            explanation: "Kiểm tra kết quả in tuổi và năm sinh."
          }
        ],
        hints: [
          "Dùng biến nam_sinh = 2010 và nam_hien_tai = 2026.",
          "Dùng phép trừ tuoi = nam_hien_tai - nam_sinh.",
          "In ra bằng 2 lệnh print: print(\"Nam sinh:\", nam_sinh) và print(\"Tuoi:\", tuoi)."
        ],
        solutionExplanation: "nam_sinh = 2010\nnam_hien_tai = 2026\ntuoi = nam_hien_tai - nam_sinh\nprint('Nam sinh:', nam_sinh)\nprint('Tuoi:', tuoi)"
      }
    },
    {
      id: "lesson-3",
      moduleId: "module-1",
      moduleTitle: "Chương 1: Nhập Môn Python, Biến & Kiểu Dữ Liệu",
      order: 3,
      title: "Bài 3: Các Phép Toán Số Học (+, -, *, /, //, %, **)",
      description: "Thành thạo các toán tử số học trong Python, sự khác biệt giữa chia thực (/), chia lấy nguyên (//) và chia lấy dư (%).",
      durationMin: 25,
      xpReward: 70,
      theory: {
        summary: "Python hỗ trợ đầy đủ các phép toán số học cơ bản và nâng cao. Thứ tự ưu tiên phép toán tuân thủ quy tắc PEMDAS (Ngoặc -> Lũy thừa -> Nhân/Chia -> Cộng/Trừ).",
        keyPoints: [
          "Cộng `+`, Trừ `-`, Nhân `*`.",
          "Chia thực `/`: Luôn trả về kết quả kiểu `float` (ví dụ `7 / 2 = 3.5`).",
          "Chia lấy nguyên `//`: Làm tròn xuống số nguyên gần nhất (ví dụ `7 // 2 = 3`, `15 // 4 = 3`).",
          "Chia lấy dư `%`: Lấy phần dư của phép chia (ví dụ `7 % 2 = 1`, `15 % 4 = 3`). Rất hữu ích để kiểm tra số chẵn/lẻ hoặc tách chữ số.",
          "Lũy thừa `**`: Tính mũ (ví dụ `2 ** 3 = 8`, `5 ** 2 = 25`)."
        ],
        conceptIllustration: {
          type: "syntax",
          title: "Bảng toán tử số học Python",
          description: "Ví dụ với 2 số a = 17 và b = 5",
          visualData: {
            codeSnippet: "a = 17\nb = 5\nprint(a + b)   # 22\nprint(a / b)   # 3.4\nprint(a // b)  # 3 (chia lay nguyen)\nprint(a % b)   # 2 (chia lay du)\nprint(b ** 2)  # 25 (luy thua)",
            outputPreview: "22\n3.4\n3\n2\n25",
            explanation: "Toán tử // và % là hai công cụ then chốt trong các bài toán thuật toán."
          }
        },
        examples: [
          {
            title: "Ví dụ: Đổi giây sang phút và giây",
            explanation: "Sử dụng // và % để phân rã 125 giây.",
            code: "tong_giay = 125\nphut = tong_giay // 60\ngiay = tong_giay % 60\nprint(phut, 'phut', giay, 'giay')",
            output: "2 phut 5 giay"
          }
        ],
        multipleChoice: {
          question: "Kết quả của biểu thức `19 // 4` và `19 % 4` trong Python lần lượt là gì?",
          options: [
            "4.75 và 3",
            "4 và 3",
            "4 và 4",
            "5 và 3"
          ],
          correctIndex: 1,
          explanation: "19 chia cho 4 được thương nguyên là 4 (vì 4*4=16) và số dư là 3 (vì 19 - 16 = 3)."
        }
      },
      practice: {
        id: "practice-3",
        title: "Thử thách 3: Đổi Giây Ra Phút & Giây",
        difficulty: "Cơ bản",
        problemStatement: "Cho một số nguyên `t = 375` biểu thị tổng số giây. Em hãy tính số phút và số giây còn lại, sau đó in ra theo định dạng: `<so_phut> phut <so_giay> giay`.",
        inputFormat: "Không có dữ liệu đầu vào (khởi tạo biến t = 375).",
        outputFormat: "In kết quả trên 1 dòng duy nhất dạng: `X phut Y giay` (với X là phút, Y là giây dư).",
        constraints: "Dùng toán tử // và % để tính toán.",
        sampleCases: [
          {
            input: "",
            output: "6 phut 15 giay",
            explanation: "375 giây = 6 phút (360 giây) và dư 15 giây."
          }
        ],
        starterCode: `t = 375

# Tính phút và giây bằng toán tử // và %
phut = t // 60
giay = t % 60

# In kết quả đúng định dạng
print(phut, "phut", giay, "giay")
`,
        testCases: [
          {
            id: "tc3-1",
            input: "",
            expectedOutput: "6 phut 15 giay",
            isHidden: false,
            explanation: "Kiểm tra phép chia nguyên và chia dư cho 375 giây."
          }
        ],
        hints: [
          "1 phút có 60 giây.",
          "Số phút = t // 60.",
          "Số giây dư = t % 60.",
          "In ra: print(phut, \"phut\", giay, \"giay\")."
        ],
        solutionExplanation: "t = 375\nphut = t // 60\ngiay = t % 60\nprint(phut, 'phut', giay, 'giay')"
      }
    },
    {
      id: "lesson-4",
      moduleId: "module-1",
      moduleTitle: "Chương 1: Nhập Môn Python, Biến & Kiểu Dữ Liệu",
      order: 4,
      title: "Bài 4: Nhập Dữ Liệu input(), Ép Kiểu & f-string",
      description: "Học cách tương tác nhập dữ liệu từ bàn phím với hàm input(), ép kiểu dữ liệu int(input()), float(input()) và định dạng chuỗi xuất f-string.",
      durationMin: 25,
      xpReward: 70,
      theory: {
        summary: "Chương trình cần có khả năng nhận dữ liệu từ người dùng để xử lý linh hoạt. Hàm input() dùng để nhận dữ liệu dưới dạng chuỗi (str), sau đó ta sử dụng các hàm ép kiểu int() hoặc float() để chuyển thành số.",
        keyPoints: [
          "Hàm `input()` luôn trả về giá trị kiểu chuỗi ký tự (`str`).",
          "Để nhập một số nguyên: `a = int(input())`.",
          "Để nhập một số thực: `x = float(input())`.",
          "Định dạng chuỗi với **f-string**: Đặt chữ `f` trước dấu nháy kép, cho phép chèn biến hoặc biểu thức trực tiếp vào trong cặp ngoặc nhọn `{...}` (ví dụ: `f\"Tong: {a + b}\"`)."
        ],
        conceptIllustration: {
          type: "syntax",
          title: "Luồng nhập dữ liệu & f-string",
          description: "Nhận chuỗi từ input() -> Ép kiểu -> Tính toán -> Xuất bằng f-string",
          visualData: {
            codeSnippet: "a = int(input())\nb = int(input())\nprint(f\"{a} + {b} = {a + b}\")",
            outputPreview: "Đầu vào: 10 và 5\nĐầu ra: 10 + 5 = 15",
            explanation: "f-string giúp câu lệnh in ngắn gọn, trực quan và dễ đọc hơn nhiều so với việc nối chuỗi."
          }
        },
        examples: [
          {
            title: "Ví dụ: Tính chu vi và diện tích hình chữ nhật",
            explanation: "Nhập chiều dài và chiều rộng từ bàn phím.",
            code: "dai = int(input())\nrong = int(input())\nchu_vi = (dai + rong) * 2\ndien_tich = dai * rong\nprint(f\"Chu vi: {chu_vi}\")\nprint(f\"Dien tich: {dien_tich}\")",
            output: "Đầu vào: 10 và 4\nChu vi: 28\nDien tich: 40"
          }
        ],
        multipleChoice: {
          question: "Nếu người dùng nhập vào số 8, đoạn mã `x = input()` sẽ gán cho x giá trị có kiểu dữ liệu là gì?",
          options: [
            "Kiểu số nguyên int",
            "Kiểu chuỗi str (\"8\")",
            "Kiểu số thực float (8.0)",
            "Kiểu logic bool"
          ],
          correctIndex: 1,
          explanation: "Hàm input() trong Python LUÔN LUÔN trả về kiểu chuỗi ký tự (str), kể cả khi người dùng nhập các chữ số. Để có số nguyên, cần bọc int(input())."
        }
      },
      practice: {
        id: "practice-4",
        title: "Thử thách 4: Bảng Tổng Kết Phép Tính 2 Số",
        difficulty: "Cơ bản",
        problemStatement: "Viết chương trình nhập vào 2 số nguyên dương `a` và `b` (mỗi số trên một dòng). Hãy in ra màn hình lần lượt:\n- Dòng 1: Tổng `a + b`\n- Dòng 2: Hiệu `a - b`\n- Dòng 3: Tích `a * b`\n- Dòng 4: Thương nguyên `a // b`\n- Dòng 5: Số dư `a % b`",
        inputFormat: "Dòng 1 chứa số nguyên a (a > 0).\nDòng 2 chứa số nguyên b (b > 0).",
        outputFormat: "In ra 5 dòng tương ứng với kết quả của 5 phép tính.",
        constraints: "1 <= b <= a <= 10^6.",
        sampleCases: [
          {
            input: "17\n5",
            output: "22\n12\n85\n3\n2",
            explanation: "17+5=22, 17-5=12, 17*5=85, 17//5=3, 17%5=2."
          }
        ],
        starterCode: `# Nhập 2 số nguyên a và b từ bàn phím
a = int(input())
b = int(input())

# In ra 5 phép tính theo yêu cầu đề bài
print(a + b)
print(a - b)
print(a * b)
print(a // b)
print(a % b)
`,
        testCases: [
          {
            id: "tc4-1",
            input: "17\n5",
            expectedOutput: "22\n12\n85\n3\n2",
            isHidden: false,
            explanation: "Sample test case: 17 và 5"
          },
          {
            id: "tc4-2",
            input: "20\n4",
            expectedOutput: "24\n16\n80\n5\n0",
            isHidden: false,
            explanation: "Kiểm tra phép chia hết (dư 0): 20 và 4"
          },
          {
            id: "tc4-3",
            input: "100\n7",
            expectedOutput: "107\n93\n700\n14\n2",
            isHidden: true,
            explanation: "Test ẩn kiểm tra số lớn hơn: 100 và 7"
          }
        ],
        hints: [
          "Dùng a = int(input()) cho dòng 1 và b = int(input()) cho dòng 2.",
          "In từng dòng: print(a + b), print(a - b), print(a * b), print(a // b), print(a % b)."
        ],
        solutionExplanation: "a = int(input())\nb = int(input())\nprint(a + b)\nprint(a - b)\nprint(a * b)\nprint(a // b)\nprint(a % b)"
      }
    }
  ]
};
