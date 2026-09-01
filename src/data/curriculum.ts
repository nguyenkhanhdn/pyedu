import { Module, Badge } from "../types";

export const BADGES_DATA: Badge[] = [
  {
    id: "first_step",
    name: "Khởi Đầu Đam Mê",
    description: "Hoàn thành xuất sắc bài tập Python đầu tiên và vượt qua 100% test case.",
    icon: "Rocket",
    category: "starter",
  },
  {
    id: "streak_3",
    name: "Ngọn Lửa Bền Bỉ",
    description: "Học tập và giải bài liên tục 3 ngày không nghỉ.",
    icon: "Flame",
    category: "streak",
  },
  {
    id: "streak_7",
    name: "Siêu Chiến Binh Code",
    description: "Duy trì chuỗi học tập 7 ngày liên tiếp để xây dựng thói quen lập trình.",
    icon: "Zap",
    category: "streak",
  },
  {
    id: "perfect_score",
    name: "Bách Phát Bách Trúng",
    description: "Giải bài tập đạt điểm tuyệt đối 100/100 ngay trong lần nộp bài đầu tiên.",
    icon: "Target",
    category: "accuracy",
  },
  {
    id: "loop_master",
    name: "Bậc Thầy Vòng Lặp",
    description: "Hoàn thành trọn vẹn toàn bộ Module 3: Vòng lặp & Luồng điều khiển.",
    icon: "Repeat",
    category: "mastery",
  },
  {
    id: "algo_wizard",
    name: "Phù Thủy Thuật Toán",
    description: "Chinh phục các thử thách sắp xếp và đệ quy nâng cao.",
    icon: "Cpu",
    category: "algorithm",
  },
  {
    id: "top_ranker",
    name: "Chiến Thần BXH Tuần",
    description: "Lọt vào Top 3 bảng xếp hạng học sinh xuất sắc nhất tuần.",
    icon: "Trophy",
    category: "mastery",
  },
  {
    id: "ai_learner",
    name: "Học Trò Thông Thái",
    description: "Trao đổi và nhận trợ giúp giải thích lỗi từ AI Tutor 5 lần.",
    icon: "Bot",
    category: "social",
  },
  {
    id: "notekeeper",
    name: "Thợ Chép Sách",
    description: "Tạo và lưu trữ trên 3 ghi chú kiến thức lập trình hữu ích.",
    icon: "BookOpen",
    category: "starter",
  },
  {
    id: "team_player",
    name: "Đồng Đội Gương Mẫu",
    description: "Tham gia nhóm học tập và thảo luận trao đổi lời giải cùng bạn bè.",
    icon: "Users",
    category: "social",
  }
];

export const CURRICULUM_MODULES: Module[] = [
  {
    id: "module-1",
    title: "Chương 1: Nhập Môn Python & Cú Pháp Cơ Bản",
    description: "Làm quen với cú pháp Python, hàm in dữ liệu print(), biến, kiểu dữ liệu, nhập dữ liệu input() và phép toán số học.",
    iconName: "Terminal",
    order: 1,
    color: "from-emerald-500 to-teal-700",
    lessons: [
      {
        id: "lesson-1",
        moduleId: "module-1",
        moduleTitle: "Chương 1: Nhập Môn Python",
        order: 1,
        title: "Bài 1: Làm Quen Với Python & Lệnh print()",
        description: "Khám phá cấu trúc chương trình Python đầu tiên và cách xuất thông điệp ra màn hình.",
        durationMin: 15,
        xpReward: 50,
        theory: {
          summary: "Python là ngôn ngữ lập trình bậc cao, cú pháp ngắn gọn và cực kỳ dễ đọc. Để in một thông tin ra màn hình điều khiển, ta sử dụng hàm dựng sẵn print().",
          keyPoints: [
            "Hàm `print()` dùng để hiển thị dữ liệu ra màn hình.",
            "Chuỗi ký tự (văn bản) phải được đặt trong cặp dấu nháy kép `\"...\"` hoặc nháy đơn `'...'`.",
            "Có thể in nhiều giá trị cùng lúc bằng cách ngăn cách nhau bởi dấu phẩy `,` (Python sẽ tự thêm khoảng trắng giữa chúng)."
          ],
          conceptIllustration: {
            type: "syntax",
            title: "Cấu trúc lệnh print()",
            description: "Dòng dữ liệu được truyền vào hàm print() và xuất thẳng ra màn hình console.",
            visualData: {
              codeSnippet: "print(\"Xin chào Việt Nam!\", 2026)",
              outputPreview: "Xin chào Việt Nam! 2026",
              explanation: "Hàm print() nhận văn bản và số, tự động nối với khoảng trắng và xuống dòng."
            }
          },
          examples: [
            {
              title: "Ví dụ 1: In dòng chữ đơn giản",
              explanation: "In một chuỗi văn bản bất kỳ ra màn hình.",
              code: 'print("Chào mừng các bạn đến với khóa học Python!")',
              output: "Chào mừng các bạn đến với khóa học Python!"
            },
            {
              title: "Ví dụ 2: In nhiều phần tử",
              explanation: "Dùng dấu phẩy để in nhiều phần tử trên một dòng.",
              code: 'print("Năm nay là năm:", 2026, "Chúc học tốt!")',
              output: "Năm nay là năm: 2026 Chúc học tốt!"
            }
          ],
          interactiveChallenge: {
            prompt: "Hãy sửa dòng code bên dưới để in ra màn hình thông điệp: 'Python that tuyet voi!'",
            initialCode: 'print("...")',
            hint: "Thay thế dấu ba chấm bằng chuỗi 'Python that tuyet voi!' chính xác."
          }
        },
        practice: {
          title: "Thử thách 1: Lời chào lập trình viên",
          difficulty: "Cơ bản",
          problemStatement: "Viết chương trình Python in ra 2 dòng:\n- Dòng 1: In chính xác dòng chữ: `Hello, World!`\n- Dòng 2: In chính xác dòng chữ: `Toi san sang hoc Python!`",
          inputFormat: "Không có đầu vào (Không dùng input()).",
          outputFormat: "Gồm đúng 2 dòng như mô tả trong đề bài.",
          constraints: "Đúng từng ký tự hoa, thường và dấu câu.",
          sampleCases: [
            {
              input: "",
              output: "Hello, World!\nToi san sang hoc Python!",
              explanation: "Dòng 1 in 'Hello, World!' và dòng 2 in 'Toi san sang hoc Python!'."
            }
          ],
          starterCode: `# Viết code Python của bạn ở đây\nprint("Hello, World!")\n# Hãy in tiếp dòng thứ 2 bên dưới:\n`,
          testCases: [
            {
              id: "tc1-1",
              input: "",
              expectedOutput: "Hello, World!\nToi san sang hoc Python!",
              isHidden: false,
              explanation: "Kiểm tra 2 dòng in chuẩn"
            }
          ],
          hints: [
            "Sử dụng 2 câu lệnh print() riêng biệt.",
            "Lưu ý dấu phẩy ',' sau chữ 'Hello' và dấu chấm than '!'."
          ],
          solutionExplanation: "Dùng lệnh print('Hello, World!') cho dòng 1 và print('Toi san sang hoc Python!') cho dòng 2."
        }
      },
      {
        id: "lesson-2",
        moduleId: "module-1",
        moduleTitle: "Chương 1: Nhập Môn Python",
        order: 2,
        title: "Bài 2: Biến (Variables) & Các Kiểu Dữ Liệu",
        description: "Học cách lưu trữ dữ liệu vào biến số, nhận biết kiểu số nguyên int, số thực float, chuỗi str và boolean.",
        durationMin: 20,
        xpReward: 60,
        theory: {
          summary: "Biến là vùng nhớ được đặt tên để lưu trữ giá trị. Python là ngôn ngữ định kiểu động (dynamic typing), bạn không cần khai báo kiểu dữ liệu trước.",
          keyPoints: [
            "Gán giá trị cho biến bằng toán tử `=`: `ten_bien = gia_tri`",
            "`int`: Số nguyên (ví dụ: `10`, `-5`, `0`)",
            "`float`: Số thực thập phân (ví dụ: `3.14`, `9.5`)",
            "`str`: Chuỗi ký tự (ví dụ: `'Tin Hoc'`, `\"Python\"`)",
            "`bool`: Giá trị logic (`True` hoặc `False`)"
          ],
          conceptIllustration: {
            type: "memory",
            title: "Mô hình ngăn nhớ biến",
            description: "Tên biến liên kết trỏ tới ô nhớ chứa giá trị thực tế.",
            visualData: {
              items: [
                { name: "age", type: "int", value: "15" },
                { name: "score", type: "float", value: "9.5" },
                { name: "name", type: "str", value: "'Nguyen Van A'" },
                { name: "is_passed", type: "bool", value: "True" }
              ]
            }
          },
          examples: [
            {
              title: "Ví dụ: Khai báo biến",
              explanation: "Khai báo các biến và tính toán đơn giản.",
              code: 'ten = "Nam"\ntuoi = 16\ndiem_toan = 8.5\nprint("Hoc sinh:", ten, "- Tuoi:", tuoi, "- Diem:", diem_toan)',
              output: "Hoc sinh: Nam - Tuoi: 16 - Diem: 8.5"
            }
          ],
          interactiveChallenge: {
            prompt: "Khai báo biến x = 10, y = 25. Hãy in ra tổng x + y.",
            initialCode: "x = 10\ny = 25\n# In tổng x + y ra màn hình:",
            hint: "Dùng print(x + y)"
          }
        },
        practice: {
          title: "Thử thách 2: Tính chu vi và diện tích hình chữ nhật",
          difficulty: "Cơ bản",
          problemStatement: "Cho hai biến chiều dài `a = 15` và chiều rộng `b = 8`. Hãy viết chương trình tính và in ra:\n- Dòng 1: `Chu vi: <gia_tri>`\n- Dòng 2: `Dien tich: <gia_tri>`",
          inputFormat: "Không có đầu vào từ bàn phím.",
          outputFormat: "2 dòng hiển thị chu vi và diện tích.",
          constraints: "Chu vi = (a + b) * 2, Diện tích = a * b.",
          sampleCases: [
            {
              input: "",
              output: "Chu vi: 46\nDien tich: 120",
              explanation: "Chu vi = (15 + 8) * 2 = 46. Diện tích = 15 * 8 = 120."
            }
          ],
          starterCode: `a = 15\nb = 8\n\n# Tính chu vi và diện tích rồi in theo đúng mẫu\n`,
          testCases: [
            {
              id: "tc2-1",
              input: "",
              expectedOutput: "Chu vi: 46\nDien tich: 120",
              isHidden: false
            }
          ],
          hints: [
            "Tạo biến chu_vi = (a + b) * 2",
            "Tạo biến dien_tich = a * b",
            "Dùng print('Chu vi:', chu_vi) và print('Dien tich:', dien_tich)"
          ]
        }
      },
      {
        id: "lesson-3",
        moduleId: "module-1",
        moduleTitle: "Chương 1: Nhập Môn Python",
        order: 3,
        title: "Bài 3: Nhập Dữ Liệu input() & Ép Kiểu (Type Casting)",
        description: "Học cách nhận dữ liệu người dùng nhập từ bàn phím và chuyển đổi sang số nguyên, số thực.",
        durationMin: 25,
        xpReward: 70,
        theory: {
          summary: "Hàm input() luôn trả về kiểu chuỗi (string). Muốn thực hiện phép tính toán học, ta bắt buộc phải ép kiểu sang int() hoặc float().",
          keyPoints: [
            "`input()`: Nhận chuỗi ký tự từ bàn phím.",
            "`int(input())`: Nhập một số nguyên.",
            "`float(input())`: Nhập một số thực thập phân.",
            "`str(gia_tri)`: Chuyển đổi một giá trị bất kỳ thành chuỗi."
          ],
          conceptIllustration: {
            type: "flow",
            title: "Quy trình ép kiểu dữ liệu",
            description: "Bàn phím -> input() [str] -> int() / float() [number] -> Tính toán toán học.",
            visualData: {
              steps: [
                "Bàn phím gõ '25'",
                "input() nhận giá trị chuỗi \"25\"",
                "int(\"25\") chuyển thành số nguyên 25",
                "Thực hiện phép tính 25 * 2 = 50"
              ]
            }
          },
          examples: [
            {
              title: "Ví dụ: Nhập tên và tuổi",
              explanation: "Nhập tên và tính năm sinh từ tuổi.",
              code: 'ten = input()\ntuoi = int(input())\nnam_sinh = 2026 - tuoi\nprint("Xin chao", ten, "- Nam sinh:", nam_sinh)',
              output: "Xin chao Nam - Nam sinh: 2010 (nếu nhập 'Nam' và '16')"
            }
          ],
          interactiveChallenge: {
            prompt: "Nhập một số nguyên n từ bàn phím và in ra bình phương n * n.",
            initialCode: "n = int(input())\n# In bình phương của n:",
            hint: "Dùng print(n * n) hoặc print(n ** 2)"
          }
        },
        practice: {
          title: "Thử thách 3: Tính tổng hai số nguyên nhập từ bàn phím",
          difficulty: "Cơ bản",
          problemStatement: "Viết chương trình đọc vào 2 số nguyên $a$ và $b$ (mỗi số trên một dòng). Hãy in ra màn hình tổng của 2 số theo định dạng:\n`Tong: <ket_qua>`",
          inputFormat: "Dòng 1 chứa số nguyên a.\nDòng 2 chứa số nguyên b.",
          outputFormat: "Một dòng duy nhất in: `Tong: <ket_qua>`",
          constraints: "$-10^6 \\le a, b \\le 10^6$",
          sampleCases: [
            {
              input: "12\n8",
              output: "Tong: 20",
              explanation: "12 + 8 = 20"
            },
            {
              input: "-5\n15",
              output: "Tong: 10",
              explanation: "-5 + 15 = 10"
            }
          ],
          starterCode: `# Nhập số nguyên a và b\na = int(input())\nb = int(input())\n\n# Tính tổng và in kết quả theo định dạng Tong: <ket_qua>\n`,
          testCases: [
            {
              id: "tc3-1",
              input: "12\n8",
              expectedOutput: "Tong: 20",
              isHidden: false
            },
            {
              id: "tc3-2",
              input: "-5\n15",
              expectedOutput: "Tong: 10",
              isHidden: false
            },
            {
              id: "tc3-3",
              input: "100\n250",
              expectedOutput: "Tong: 350",
              isHidden: true
            },
            {
              id: "tc3-4",
              input: "0\n-45",
              expectedOutput: "Tong: -45",
              isHidden: true
            }
          ],
          hints: [
            "Dùng a = int(input()) và b = int(input())",
            "Dùng print('Tong:', a + b)"
          ]
        }
      },
      {
        id: "lesson-4",
        moduleId: "module-1",
        moduleTitle: "Chương 1: Nhập Môn Python",
        order: 4,
        title: "Bài 4: Phép Toán Số Học & Chia Lấy Dư (%)",
        description: "Làm chủ các phép toán số học: chia lấy nguyên //, chia lấy dư %, và lũy thừa **.",
        durationMin: 20,
        xpReward: 65,
        theory: {
          summary: "Python hỗ trợ đầy đủ các phép toán số học từ cơ bản đến nâng cao. Phép chia lấy phần nguyên `//` và chia lấy phần dư `%` là nền tảng quan trọng trong tin học.",
          keyPoints: [
            "`+`, `-`, `*`, `/`: Cộng, trừ, nhân, chia (chia `/` luôn cho kết quả float).",
            "`//`: Chia lấy phần nguyên (Ví dụ: `7 // 2` được `3`).",
            "`%`: Chia lấy phần dư (Ví dụ: `7 % 2` được `1`). Dùng để kiểm tra tính chẵn lẻ `n % 2 == 0`.",
            "`**`: Lũy thừa (Ví dụ: `2 ** 3` được `8`)."
          ],
          conceptIllustration: {
            type: "comparison",
            title: "Phân biệt phép chia trong Python",
            description: "So sánh 7 / 2, 7 // 2 và 7 % 2",
            visualData: {
              table: [
                { op: "7 / 2", meaning: "Chia thực", result: "3.5" },
                { op: "7 // 2", meaning: "Chia lấy nguyên", result: "3" },
                { op: "7 % 2", meaning: "Chia lấy dư", result: "1" },
                { op: "2 ** 4", meaning: "Lũy thừa", result: "16" }
              ]
            }
          },
          examples: [
            {
              title: "Ví dụ: Tách chữ số hàng chục và hàng đơn vị",
              explanation: "Cho số có 2 chữ số n = 47. Tách hàng chục và đơn vị.",
              code: 'n = 47\nhang_chuc = n // 10\nhang_don_vi = n % 10\nprint("Chuc:", hang_chuc, "- Don vi:", hang_don_vi)',
              output: "Chuc: 4 - Don vi: 7"
            }
          ],
          interactiveChallenge: {
            prompt: "Cho số nguyên n = 123. Hãy in ra phần dư của n khi chia cho 10.",
            initialCode: "n = 123\n# In chữ số tận cùng của n:\n",
            hint: "Dùng print(n % 10)"
          }
        },
        practice: {
          title: "Thử thách 4: Đổi giây sang Giờ, Phút, Giây",
          difficulty: "Trung bình",
          problemStatement: "Cho một số nguyên $S$ là tổng số giây. Hãy quy đổi sang số Giờ ($H$), Phút ($M$), Giây ($S$) tương ứng.\nIn ra theo định dạng: `<H> gio <M> phut <S> giay`.",
          inputFormat: "Một số nguyên duy nhất $S$ ($S \\ge 0$).",
          outputFormat: "Định dạng: `<H> gio <M> phut <S> giay`",
          constraints: "$0 \\le S \\le 10^7$",
          sampleCases: [
            {
              input: "3665",
              output: "1 gio 1 phut 5 giay",
              explanation: "3665 giây = 1 giờ (3600s) + 1 phút (60s) + 5 giây."
            },
            {
              input: "125",
              output: "0 gio 2 phut 5 giay",
              explanation: "125 giây = 0 giờ + 2 phút + 5 giây."
            }
          ],
          starterCode: `total_seconds = int(input())\n\n# Tính hours, minutes, seconds và in ra theo mẫu\n`,
          testCases: [
            {
              id: "tc4-1",
              input: "3665",
              expectedOutput: "1 gio 1 phut 5 giay",
              isHidden: false
            },
            {
              id: "tc4-2",
              input: "125",
              expectedOutput: "0 gio 2 phut 5 giay",
              isHidden: false
            },
            {
              id: "tc4-3",
              input: "7200",
              expectedOutput: "2 gio 0 phut 0 giay",
              isHidden: true
            },
            {
              id: "tc4-4",
              input: "45",
              expectedOutput: "0 gio 0 phut 45 giay",
              isHidden: true
            }
          ],
          hints: [
            "Số giờ: h = total_seconds // 3600",
            "Số giây còn lại: remaining = total_seconds % 3600",
            "Số phút: m = remaining // 60",
            "Số giây cuối cùng: s = remaining % 60"
          ]
        }
      }
    ]
  },
  {
    id: "module-2",
    title: "Chương 2: Cấu Trúc Rẽ Nhánh & Điều Kiện",
    description: "Nắm vững câu lệnh điều kiện if, elif, else, toán tử so sánh và toán tử logic and, or, not.",
    iconName: "GitBranch",
    order: 2,
    color: "from-blue-500 to-indigo-700",
    lessons: [
      {
        id: "lesson-5",
        moduleId: "module-2",
        moduleTitle: "Chương 2: Cấu Trúc Rẽ Nhánh",
        order: 1,
        title: "Bài 5: Câu Lệnh if, else & Toán Tử So Sánh",
        description: "Điều khiển luồng thực thi của chương trình dựa trên các điều kiện Đúng (True) hoặc Sai (False).",
        durationMin: 20,
        xpReward: 70,
        theory: {
          summary: "Câu lệnh if cho phép máy tính đưa ra quyết định thực thi một khối lệnh nếu điều kiện thỏa mãn. Dấu hai chấm `:` và thụt lề 4 dấu cách (indentation) là bắt buộc.",
          keyPoints: [
            "Cú pháp:\n```python\nif dieu_kien:\n    # Khối lệnh khi Đúng\nelse:\n    # Khối lệnh khi Sai\n```",
            "Toán tử so sánh: `==` (bằng), `!=` (khác), `>`, `<`, `>=`, `<=`."
          ],
          conceptIllustration: {
            type: "flow",
            title: "Sơ đồ khối If-Else",
            description: "Kiểm tra điều kiện: Nếu True thực hiện nhánh If, nếu False thực hiện nhánh Else.",
            visualData: {
              condition: "score >= 5.0",
              trueBranch: "In 'ĐẬU'",
              falseBranch: "In 'TRƯỢT'"
            }
          },
          examples: [
            {
              title: "Ví dụ: Kiểm tra số chẵn hay lẻ",
              explanation: "Dùng phép chia lấy dư n % 2 == 0.",
              code: 'n = int(input())\nif n % 2 == 0:\n    print("So chan")\nelse:\n    print("So le")',
              output: "So chan (khi nhập 10)"
            }
          ],
          interactiveChallenge: {
            prompt: "Viết lệnh if kiểm tra nếu x > 0 thì in 'Duong', ngược lại in 'Khong duong'.",
            initialCode: "x = 5\n# Thêm câu lệnh if - else tại đây:\n",
            hint: "if x > 0:\n    print('Duong')\nelse:\n    print('Khong duong')"
          }
        },
        practice: {
          title: "Thử thách 5: Tìm số lớn nhất trong hai số",
          difficulty: "Cơ bản",
          problemStatement: "Nhập vào 2 số nguyên $a$ và $b$ (mỗi số trên 1 dòng). Hãy tìm và in ra số lớn hơn (Max).\nNếu 2 số bằng nhau thì in giá trị đó.",
          inputFormat: "Dòng 1: số nguyên a.\nDòng 2: số nguyên b.",
          outputFormat: "In một số nguyên duy nhất là giá trị lớn nhất.",
          constraints: "$-10^9 \\le a, b \\le 10^9$",
          sampleCases: [
            {
              input: "15\n28",
              output: "28",
              explanation: "28 lớn hơn 15 nên in 28."
            },
            {
              input: "-10\n-50",
              output: "-10",
              explanation: "-10 lớn hơn -50 nên in -10."
            }
          ],
          starterCode: `a = int(input())\nb = int(input())\n\n# So sánh và in ra số lớn hơn\n`,
          testCases: [
            {
              id: "tc5-1",
              input: "15\n28",
              expectedOutput: "28",
              isHidden: false
            },
            {
              id: "tc5-2",
              input: "-10\n-50",
              expectedOutput: "-10",
              isHidden: false
            },
            {
              id: "tc5-3",
              input: "100\n100",
              expectedOutput: "100",
              isHidden: true
            },
            {
              id: "tc5-4",
              input: "999\n10",
              expectedOutput: "999",
              isHidden: true
            }
          ],
          hints: [
            "if a > b: print(a) else: print(b)"
          ]
        }
      },
      {
        id: "lesson-6",
        moduleId: "module-2",
        moduleTitle: "Chương 2: Cấu Trúc Rẽ Nhánh",
        order: 2,
        title: "Bài 6: Cấu Trúc Nhiều Nhánh elif & Xếp Loại",
        description: "Xử lý nhiều trường hợp điều kiện loại trừ lẫn nhau bằng từ khóa elif.",
        durationMin: 25,
        xpReward: 80,
        theory: {
          summary: "Khi có từ 3 trường hợp trở lên, ta dùng cấu trúc if - elif - ... - else. Python sẽ kiểm tra tuần tự từ trên xuống dưới và chỉ thực thi nhánh đầu tiên có điều kiện True.",
          keyPoints: [
            "`elif` là viết tắt của 'else if'.",
            "Có thể có nhiều khối `elif` tùy theo số lượng trường hợp cần xét.",
            "Khối `else` ở cuối cùng là tùy chọn, sẽ chạy nếu tất cả các điều kiện phía trên đều False."
          ],
          conceptIllustration: {
            type: "flow",
            title: "Sơ đồ xếp loại điểm",
            description: ">= 8.0: Gioi -> >= 6.5: Kha -> >= 5.0: Trung Binh -> Con lai: Yeu.",
            visualData: {
              steps: [
                "Điểm >= 8.0: 'GIOI'",
                "Điểm >= 6.5: 'KHA'",
                "Điểm >= 5.0: 'TRUNG BINH'",
                "Ngược lại: 'YEU'"
              ]
            }
          },
          examples: [
            {
              title: "Ví dụ: Phân loại số âm, dương hay số không",
              explanation: "Xét 3 trường hợp: n > 0, n < 0 và n == 0.",
              code: 'n = int(input())\nif n > 0:\n    print("So duong")\nelif n < 0:\n    print("So am")\nelse:\n    print("So khong")',
              output: "So duong (nếu nhập 5)"
            }
          ],
          interactiveChallenge: {
            prompt: "Viết cấu trúc elif để kiểm tra điểm thi dtb >= 8 in 'Gioi', dtb >= 5 in 'Dat', ngược lại in 'Chua dat'.",
            initialCode: "dtb = 7.5\n# Viết câu lệnh if - elif - else ở đây:\n",
            hint: "Dùng if dtb >= 8 -> elif dtb >= 5 -> else"
          }
        },
        practice: {
          title: "Thử thách 6: Xếp loại học lực học sinh",
          difficulty: "Trung bình",
          problemStatement: "Nhập vào điểm trung bình môn $dtb$ của một học sinh ($0.0 \\le dtb \\le 10.0$, dạng số thực).\nHãy in ra xếp loại theo quy tắc:\n- $dtb \\ge 8.0$: in `Xuat sac`\n- $6.5 \\le dtb < 8.0$: in `Kha`\n- $5.0 \\le dtb < 6.5$: in `Trung binh`\n- $dtb < 5.0$: in `Chua dat`",
          inputFormat: "Một số thực duy nhất $dtb$ trên 1 dòng.",
          outputFormat: "In đúng chuỗi xếp loại tương ứng.",
          constraints: "$0.0 \\le dtb \\le 10.0$",
          sampleCases: [
            {
              input: "8.5",
              output: "Xuat sac",
              explanation: "8.5 >= 8.0 nên xếp loại Xuat sac."
            },
            {
              input: "6.8",
              output: "Kha",
              explanation: "6.8 nằm trong khoảng 6.5 đến dưới 8.0."
            },
            {
              input: "4.2",
              output: "Chua dat",
              explanation: "4.2 < 5.0."
            }
          ],
          starterCode: `dtb = float(input())\n\n# Viết cấu trúc if-elif-else xếp loại\n`,
          testCases: [
            {
              id: "tc6-1",
              input: "8.5",
              expectedOutput: "Xuat sac",
              isHidden: false
            },
            {
              id: "tc6-2",
              input: "6.8",
              expectedOutput: "Kha",
              isHidden: false
            },
            {
              id: "tc6-3",
              input: "5.0",
              expectedOutput: "Trung binh",
              isHidden: true
            },
            {
              id: "tc6-4",
              input: "3.5",
              expectedOutput: "Chua dat",
              isHidden: true
            }
          ],
          hints: [
            "if dtb >= 8.0: print('Xuat sac')",
            "elif dtb >= 6.5: print('Kha')",
            "elif dtb >= 5.0: print('Trung binh')",
            "else: print('Chua dat')"
          ]
        }
      }
    ]
  },
  {
    id: "module-3",
    title: "Chương 3: Vòng Lặp & Luồng Điều Khiển",
    description: "Làm chủ vòng lặp for với range(), vòng lặp while, các lệnh nhảy break, continue và kỹ thuật lặp lồng nhau.",
    iconName: "RotateCw",
    order: 3,
    color: "from-amber-500 to-orange-700",
    lessons: [
      {
        id: "lesson-7",
        moduleId: "module-3",
        moduleTitle: "Chương 3: Vòng Lặp",
        order: 1,
        title: "Bài 7: Vòng Lặp for & Hàm range()",
        description: "Tự động hóa các tác vụ lặp lại với số lần biết trước thông qua for và range.",
        durationMin: 25,
        xpReward: 85,
        theory: {
          summary: "Vòng lặp for được sử dụng để duyệt qua một chuỗi các giá trị (như danh sách, chuỗi ký tự hoặc dãy số được sinh bởi hàm range()).",
          keyPoints: [
            "`range(n)`: Sinh các số từ `0` đến `n - 1`.",
            "`range(start, stop)`: Sinh các số từ `start` đến `stop - 1`.",
            "`range(start, stop, step)`: Sinh các số với bước nhảy `step` (ví dụ `range(1, 10, 2)` sinh 1, 3, 5, 7, 9)."
          ],
          conceptIllustration: {
            type: "flow",
            title: "Cơ chế hoạt động của range(1, 5)",
            description: "Duyệt qua các giá trị 1 -> 2 -> 3 -> 4, mỗi vòng lặp gán cho biến i.",
            visualData: {
              sequence: [1, 2, 3, 4],
              explanation: "Vòng lặp dừng khi i đạt giá trị cận trên stop (5)."
            }
          },
          examples: [
            {
              title: "Ví dụ: Tính tổng từ 1 đến n",
              explanation: "Dùng biến tích lũy tong = 0 và cộng dồn qua từng vòng lặp.",
              code: 'n = int(input())\ntong = 0\nfor i in range(1, n + 1):\n    tong = tong + i\nprint("Tong:", tong)',
              output: "Tong: 15 (khi n = 5)"
            }
          ],
          interactiveChallenge: {
            prompt: "Dùng vòng lặp for in ra các số chẵn từ 2 đến 10 trên từng dòng.",
            initialCode: "# In các số chẵn từ 2 đến 10:\nfor i in range(2, 11, 2):\n    print(i)",
            hint: "range(2, 11, 2) sẽ duyệt qua 2, 4, 6, 8, 10."
          }
        },
        practice: {
          title: "Thử thách 7: Tính tổng các số lẻ từ 1 đến N",
          difficulty: "Trung bình",
          problemStatement: "Cho một số nguyên dương $N$ nhập từ bàn phím. Hãy viết chương trình tính tổng của tất cả các số lẻ trong đoạn từ $1$ đến $N$.\nIn ra một số nguyên duy nhất là kết quả tổng.",
          inputFormat: "Một số nguyên dương N duy nhất.",
          outputFormat: "In ra giá trị tổng các số lẻ.",
          constraints: "$1 \\le N \\le 10^5$",
          sampleCases: [
            {
              input: "5",
              output: "9",
              explanation: "Các số lẻ từ 1 đến 5 là 1, 3, 5. Tổng = 1 + 3 + 5 = 9."
            },
            {
              input: "6",
              output: "9",
              explanation: "Các số lẻ từ 1 đến 6 vẫn là 1, 3, 5. Tổng = 9."
            }
          ],
          starterCode: `n = int(input())\n\n# Tính tổng các số lẻ từ 1 đến n\n`,
          testCases: [
            {
              id: "tc7-1",
              input: "5",
              expectedOutput: "9",
              isHidden: false
            },
            {
              id: "tc7-2",
              input: "6",
              expectedOutput: "9",
              isHidden: false
            },
            {
              id: "tc7-3",
              input: "10",
              expectedOutput: "25",
              isHidden: true
            },
            {
              id: "tc7-4",
              input: "1",
              expectedOutput: "1",
              isHidden: true
            }
          ],
          hints: [
            "Cách 1: Duyệt for i in range(1, n + 1): if i % 2 != 0: tong += i",
            "Cách 2: Duyệt trực tiếp for i in range(1, n + 1, 2): tong += i"
          ]
        }
      },
      {
        id: "lesson-8",
        moduleId: "module-3",
        moduleTitle: "Chương 3: Vòng Lặp",
        order: 2,
        title: "Bài 8: Vòng Lặp while & Kiểm Tra Điều Kiện Dừng",
        description: "Sử dụng vòng lặp while khi chưa biết trước số lần lặp, điều khiển quá trình tính toán tới khi đạt điều kiện.",
        durationMin: 25,
        xpReward: 90,
        theory: {
          summary: "Vòng lặp while thực hiện khối lệnh chừng nào điều kiện vẫn còn đúng (True). Cần chú ý cập nhật biến điều khiển để tránh lặp vô tận (infinite loop).",
          keyPoints: [
            "Cú pháp: `while dieu_kien:\n    # lenh`",
            "`break`: Lập tức thoát khỏi vòng lặp.",
            "`continue`: Bỏ qua các lệnh còn lại của lần lặp hiện tại và chuyển sang lần lặp kế tiếp."
          ],
          conceptIllustration: {
            type: "flow",
            title: "Cơ chế while",
            description: "Trước mỗi lần lặp, kiểm tra điều kiện. Nếu True -> Chạy code -> Lặp lại. Nếu False -> Kết thúc.",
            visualData: {
              condition: "n > 0",
              action: "In n, sau đó n = n // 10"
            }
          },
          examples: [
            {
              title: "Ví dụ: Đếm số chữ số của một số nguyên",
              explanation: "Chia nguyên liên tục cho 10 đến khi n = 0.",
              code: 'n = int(input())\ndem = 0\nwhile n > 0:\n    dem = dem + 1\n    n = n // 10\nprint("So chu so:", dem)',
              output: "So chu so: 3 (khi n = 456)"
            }
          ],
          interactiveChallenge: {
            prompt: "Cho n = 10. Hãy dùng vòng lặp while giảm dần n đến 1 và in ra.",
            initialCode: "n = 5\nwhile n > 0:\n    print(n)\n    n = n - 1",
            hint: "Mỗi bước nhớ giảm n = n - 1 để không bị lặp vô tận."
          }
        },
        practice: {
          title: "Thử thách 8: Đảo ngược một số nguyên dương",
          difficulty: "Nâng cao",
          problemStatement: "Cho một số nguyên dương $N$ ($N > 0$). Hãy dùng vòng lặp while để tính và in ra số đảo ngược của $N$.\n(Ví dụ: Số 1234 đảo ngược thành 4321, số 590 đảo ngược thành 95).",
          inputFormat: "Một số nguyên dương $N$ duy nhất.",
          outputFormat: "In số nguyên sau khi đã đảo ngược.",
          constraints: "$1 \\le N \\le 10^9$",
          sampleCases: [
            {
              input: "1234",
              output: "4321",
              explanation: "1234 -> 4321"
            },
            {
              input: "590",
              output: "95",
              explanation: "590 đảo ngược là 095, giá trị số nguyên là 95."
            }
          ],
          starterCode: `n = int(input())\n\n# Đảo ngược số n bằng toán tử // và %\nrev = 0\nwhile n > 0:\n    digit = n % 10\n    rev = rev * 10 + digit\n    n = n // 10\n\nprint(rev)\n`,
          testCases: [
            {
              id: "tc8-1",
              input: "1234",
              expectedOutput: "4321",
              isHidden: false
            },
            {
              id: "tc8-2",
              input: "590",
              expectedOutput: "95",
              isHidden: false
            },
            {
              id: "tc8-3",
              input: "7",
              expectedOutput: "7",
              isHidden: true
            },
            {
              id: "tc8-4",
              input: "987654321",
              expectedOutput: "123456789",
              isHidden: true
            }
          ],
          hints: [
            "Tạo biến rev = 0",
            "Mỗi bước: lấy chữ số cuối digit = n % 10",
            "Cập nhật: rev = rev * 10 + digit",
            "Bỏ chữ số cuối: n = n // 10"
          ]
        }
      }
    ]
  },
  {
    id: "module-4",
    title: "Chương 4: Chuỗi Ký Tự (Strings) & Xử Lý Văn Bản",
    description: "Khám phá cấu trúc chuỗi, chỉ số index, kỹ thuật cắt chuỗi slicing, và các phương thức xử lý chuỗi phổ biến.",
    iconName: "FileText",
    order: 4,
    color: "from-purple-500 to-violet-700",
    lessons: [
      {
        id: "lesson-9",
        moduleId: "module-4",
        moduleTitle: "Chương 4: Xử Lý Chuỗi",
        order: 1,
        title: "Bài 9: Chỉ Số & Kỹ Thuật Cắt Chuỗi (Slicing)",
        description: "Truy cập ký tự theo vị trí chỉ số âm/dương và trích xuất chuỗi con với s[start:stop:step].",
        durationMin: 20,
        xpReward: 80,
        theory: {
          summary: "Trong Python, chuỗi là dãy các ký tự có thứ tự. Chỉ số bắt đầu từ 0 từ trái sang phải, hoặc từ -1 từ phải sang trái.",
          keyPoints: [
            "`s[i]`: Lấy ký tự tại vị trí `i`.",
            "`s[start:stop]`: Cắt chuỗi từ `start` đến `stop - 1`.",
            "`s[::-1]`: Đảo ngược toàn bộ chuỗi ký tự một cách nhanh chóng."
          ],
          conceptIllustration: {
            type: "syntax",
            title: "Hệ tọa độ chỉ số chuỗi 'PYTHON'",
            description: "Chỉ số dương: 0, 1, 2, 3, 4, 5. Chỉ số âm: -6, -5, -4, -3, -2, -1.",
            visualData: {
              string: "PYTHON",
              posIndex: ["0", "1", "2", "3", "4", "5"],
              negIndex: ["-6", "-5", "-4", "-3", "-2", "-1"]
            }
          },
          examples: [
            {
              title: "Ví dụ: Cắt chuỗi",
              explanation: "Trích xuất từ trong câu.",
              code: 's = "LapTrinhPython"\nprint(s[0:8])\nprint(s[8:])\nprint(s[::-1])',
              output: "LapTrinh\nPython\nnohtyPhnirTpaL"
            }
          ],
          interactiveChallenge: {
            prompt: "Cho chuỗi s = 'ABCDEFGH'. Cắt lấy 3 ký tự đầu tiên và in ra.",
            initialCode: "s = 'ABCDEFGH'\n# In 3 ký tự đầu tiên của s:\nprint(s[0:3])",
            hint: "Dùng s[:3] hoặc s[0:3]"
          }
        },
        practice: {
          title: "Thử thách 9: Kiểm tra chuỗi Palindrome (Chuỗi đối xứng)",
          difficulty: "Trung bình",
          problemStatement: "Một chuỗi được gọi là Palindrome (chuỗi đối xứng) nếu đọc xuôi hay đọc ngược đều giống hệt nhau (ví dụ: `radar`, `madam`, `12321`).\nCho một chuỗi $S$ nhập từ bàn phím. Hãy in ra:\n- `YES` nếu $S$ là chuỗi đối xứng.\n- `NO` nếu $S$ không phải là chuỗi đối xứng.",
          inputFormat: "Một chuỗi ký tự không chứa dấu cách trên một dòng.",
          outputFormat: "In `YES` hoặc `NO`.",
          constraints: "Độ dài chuỗi từ 1 đến 1000 ký tự.",
          sampleCases: [
            {
              input: "radar",
              output: "YES",
              explanation: "'radar' đảo ngược lại vẫn là 'radar'."
            },
            {
              input: "python",
              output: "NO",
              explanation: "'python' đảo ngược là 'nohtyp' != 'python'."
            }
          ],
          starterCode: `s = input()\n\n# Kiểm tra s có phải chuỗi đối xứng không\n`,
          testCases: [
            {
              id: "tc9-1",
              input: "radar",
              expectedOutput: "YES",
              isHidden: false
            },
            {
              id: "tc9-2",
              input: "python",
              expectedOutput: "NO",
              isHidden: false
            },
            {
              id: "tc9-3",
              input: "level",
              expectedOutput: "YES",
              isHidden: true
            },
            {
              id: "tc9-4",
              input: "123321",
              expectedOutput: "YES",
              isHidden: true
            }
          ],
          hints: [
            "Đảo ngược chuỗi bằng cú pháp: rev = s[::-1]",
            "So sánh if s == rev: print('YES') else: print('NO')"
          ]
        }
      }
    ]
  },
  {
    id: "module-5",
    title: "Chương 5: Cấu Trúc Dữ Liệu Danh Sách (List) & Dictionary",
    description: "Quản lý tập hợp dữ liệu mạnh mẽ với List, Dictionary ánh xạ Key-Value, Tuple và Set.",
    iconName: "Layers",
    order: 5,
    color: "from-rose-500 to-pink-700",
    lessons: [
      {
        id: "lesson-10",
        moduleId: "module-5",
        moduleTitle: "Chương 5: Danh Sách & Dictionary",
        order: 1,
        title: "Bài 10: Danh Sách (List) - Thêm, Xóa, Sắp Xếp",
        description: "Học cách tạo danh sách, thêm phần tử với append(), duyệt mảng và tìm max/min/sum.",
        durationMin: 30,
        xpReward: 95,
        theory: {
          summary: "List là cấu trúc dữ liệu quan trọng nhất trong Python, cho phép lưu trữ nhiều phần tử có thứ tự và có thể thay đổi (mutable).",
          keyPoints: [
            "Tạo list: `a = [1, 2, 3, 4, 5]`",
            "`a.append(x)`: Thêm phần tử `x` vào cuối danh sách.",
            "`len(a)`: Trả về số lượng phần tử trong list.",
            "`sum(a)`, `max(a)`, `min(a)`: Tính tổng, tìm giá trị lớn nhất/nhỏ nhất nhanh chóng."
          ],
          conceptIllustration: {
            type: "memory",
            title: "Mô hình cấu trúc List trong bộ nhớ",
            description: "Các phần tử được đánh chỉ số liên tiếp 0, 1, 2, 3...",
            visualData: {
              items: [
                { index: 0, val: "10" },
                { index: 1, val: "25" },
                { index: 2, val: "30" },
                { index: 3, val: "45" }
              ]
            }
          },
          examples: [
            {
              title: "Ví dụ: Nhập danh sách số nguyên từ 1 dòng",
              explanation: "Dùng split() và map(int, ...).",
              code: 'arr = [int(x) for x in input().split()]\nprint("So phan tu:", len(arr))\nprint("Max:", max(arr))\nprint("Tong:", sum(arr))',
              output: "So phan tu: 4 - Max: 9 - Tong: 20 (khi nhập '2 4 5 9')"
            }
          ],
          interactiveChallenge: {
            prompt: "Cho danh sách numbers = [5, 2, 9, 1, 7]. Hãy in ra phần tử lớn nhất bằng hàm max().",
            initialCode: "numbers = [5, 2, 9, 1, 7]\n# In giá trị lớn nhất:\nprint(max(numbers))",
            hint: "Dùng print(max(numbers))"
          }
        },
        practice: {
          title: "Thử thách 10: Đếm số lượng số dương trong mảng",
          difficulty: "Trung bình",
          problemStatement: "Cho một dãy số nguyên gồm $N$ phần tử được nhập trên một dòng cách nhau bởi dấu cách.\nHãy đếm và in ra số lượng các số dương ($> 0$) có trong dãy.",
          inputFormat: "Một dòng chứa các số nguyên cách nhau bởi dấu cách.",
          outputFormat: "Một số nguyên duy nhất là số lượng các số dương.",
          constraints: "Số phần tử từ 1 đến $10^4$.",
          sampleCases: [
            {
              input: "3 -5 8 0 -2 12",
              output: "3",
              explanation: "Có 3 số dương là: 3, 8, 12."
            },
            {
              input: "-1 -2 -3",
              output: "0",
              explanation: "Không có số dương nào."
            }
          ],
          starterCode: `numbers = [int(x) for x in input().split()]\n\n# Đếm số lượng số > 0\n`,
          testCases: [
            {
              id: "tc10-1",
              input: "3 -5 8 0 -2 12",
              expectedOutput: "3",
              isHidden: false
            },
            {
              id: "tc10-2",
              input: "-1 -2 -3",
              expectedOutput: "0",
              isHidden: false
            },
            {
              id: "tc10-3",
              input: "10 20 30 40 50",
              expectedOutput: "5",
              isHidden: true
            },
            {
              id: "tc10-4",
              input: "0 0 0",
              expectedOutput: "0",
              isHidden: true
            }
          ],
          hints: [
            "Khởi tạo dem = 0",
            "Duyệt qua từng phần tử: for x in numbers: if x > 0: dem += 1",
            "In print(dem)"
          ]
        }
      }
    ]
  },
  {
    id: "module-6",
    title: "Chương 6: Hàm (Functions) & Module Chuẩn",
    description: "Tổ chức mã nguồn khoa học, tái sử dụng code với từ khóa def, tham số, giá trị return và thư viện math.",
    iconName: "Code2",
    order: 6,
    color: "from-cyan-500 to-blue-700",
    lessons: [
      {
        id: "lesson-11",
        moduleId: "module-6",
        moduleTitle: "Chương 6: Hàm & Module",
        order: 1,
        title: "Bài 11: Định Nghĩa Hàm def & Giá Trị Trả Về return",
        description: "Học cách chia nhỏ chương trình thành các hàm độc lập, truyền tham số và nhận kết quả.",
        durationMin: 30,
        xpReward: 100,
        theory: {
          summary: "Hàm là một khối lệnh được đặt tên để thực hiện một công việc cụ thể. Định nghĩa hàm giúp chương trình mạch lạc, tránh lặp lại mã nguồn.",
          keyPoints: [
            "Khai báo hàm với từ khóa `def ten_ham(tham_so):`",
            "Từ khóa `return` dùng để trả về giá trị kết quả và thoát khỏi hàm.",
            "Nếu không có `return`, hàm sẽ ngầm trả về `None`."
          ],
          conceptIllustration: {
            type: "flow",
            title: "Luồng hoạt động của Hàm",
            description: "Đầu vào (Arguments) -> Xử lý trong Hàm -> Kết quả đầu ra (Return Value).",
            visualData: {
              input: "a = 5, b = 10",
              processing: "tinh_tong(a, b) -> a + b",
              output: "15"
            }
          },
          examples: [
            {
              title: "Ví dụ: Hàm kiểm tra số nguyên tố",
              explanation: "Hàm trả về True nếu n là số nguyên tố, ngược lại trả về False.",
              code: 'def is_prime(n):\n    if n < 2:\n        return False\n    for i in range(2, int(n**0.5) + 1):\n        if n % i == 0:\n            return False\n    return True\n\nprint(is_prime(7))\nprint(is_prime(10))',
              output: "True\nFalse"
            }
          ],
          interactiveChallenge: {
            prompt: "Viết hàm gap_doi(x) nhận vào số x và trả về x * 2.",
            initialCode: "def gap_doi(x):\n    return x * 2\n\nprint(gap_doi(15))",
            hint: "Dùng return x * 2"
          }
        },
        practice: {
          title: "Thử thách 11: Tìm ước chung lớn nhất (UCLN / GCD)",
          difficulty: "Nâng cao",
          problemStatement: "Viết hàm `gcd(a, b)` sử dụng thuật toán Euclid để tìm Ước chung lớn nhất của hai số nguyên dương $a$ và $b$.\nNhập 2 số $a$ và $b$ (mỗi số trên một dòng), in ra giá trị UCLN.",
          inputFormat: "Dòng 1: số nguyên a.\nDòng 2: số nguyên b.",
          outputFormat: "In một số nguyên duy nhất là UCLN của a và b.",
          constraints: "$1 \\le a, b \\le 10^9$",
          sampleCases: [
            {
              input: "24\n36",
              output: "12",
              explanation: "Ước chung lớn nhất của 24 và 36 là 12."
            },
            {
              input: "17\n19",
              output: "1",
              explanation: "17 và 19 là 2 số nguyên tố cùng nhau."
            }
          ],
          starterCode: `def gcd(a, b):\n    # Sử dụng thuật toán Euclid: while b != 0: a, b = b, a % b\n    while b != 0:\n        temp = b\n        b = a % b\n        a = temp\n    return a\n\na = int(input())\nb = int(input())\nprint(gcd(a, b))\n`,
          testCases: [
            {
              id: "tc11-1",
              input: "24\n36",
              expectedOutput: "12",
              isHidden: false
            },
            {
              id: "tc11-2",
              input: "17\n19",
              expectedOutput: "1",
              isHidden: false
            },
            {
              id: "tc11-3",
              input: "100\n25",
              expectedOutput: "25",
              isHidden: true
            },
            {
              id: "tc11-4",
              input: "1000000000\n500000000",
              expectedOutput: "500000000",
              isHidden: true
            }
          ],
          hints: [
            "Thuật toán Euclid: Chừng nào b còn khác 0, thay a = b và b = a % b.",
            "Khi b = 0, kết quả chính là a."
          ]
        }
      }
    ]
  },
  {
    id: "module-7",
    title: "Chương 7: Thuật Toán & Bài Toán Kinh Điển",
    description: "Nâng cao tư duy thuật toán với Tìm kiếm Nhị phân (Binary Search), Sắp xếp và Kỹ thuật Đệ quy (Recursion).",
    iconName: "Cpu",
    order: 7,
    color: "from-amber-600 to-red-700",
    lessons: [
      {
        id: "lesson-12",
        moduleId: "module-7",
        moduleTitle: "Chương 7: Thuật Toán",
        order: 1,
        title: "Bài 12: Kỹ Thuật Đệ Quy (Recursion) - Tính Giai Thừa & Fibonacci",
        description: "Học cách hàm tự gọi lại chính nó với điều kiện cơ sở (base case) để giải quyết các bài toán chia để trị.",
        durationMin: 35,
        xpReward: 120,
        theory: {
          summary: "Đệ quy là phương pháp lập trình trong đó hàm gọi lại chính nó với bài toán con nhỏ hơn, cho đến khi chạm tới trường hợp cơ sở (base case) thì dừng.",
          keyPoints: [
            "Bắt buộc phải có **Điểm dừng (Base Case)** để tránh tràn ngăn xếp bộ nhớ (RecursionError).",
            "Công thức giai thừa: $0! = 1$, $n! = n \\times (n-1)!$",
            "Dãy Fibonacci: $F(0) = 0$, $F(1) = 1$, $F(n) = F(n-1) + F(n-2)$"
          ],
          conceptIllustration: {
            type: "flow",
            title: "Cây đệ quy tính Giai thừa factorial(4)",
            description: "factorial(4) -> 4 * factorial(3) -> 3 * factorial(2) -> 2 * factorial(1) -> 1.",
            visualData: {
              depth: ["fact(4)", "4 * fact(3)", "3 * fact(2)", "2 * fact(1)", "fact(1) = 1"],
              result: "4 * 3 * 2 * 1 = 24"
            }
          },
          examples: [
            {
              title: "Ví dụ: Hàm tính giai thừa đệ quy",
              explanation: "Hàm factorial với base case n == 0 hoặc n == 1.",
              code: 'def factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)\n\nprint(factorial(5))',
              output: "120"
            }
          ],
          interactiveChallenge: {
            prompt: "Chạy hàm tính giai thừa với n = 6 và in kết quả.",
            initialCode: "def factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)\n\nprint(factorial(6))",
            hint: "Kết quả của 6! là 720."
          }
        },
        practice: {
          title: "Thử thách 12: Tìm số Fibonacci thứ N",
          difficulty: "Nâng cao",
          problemStatement: "Dãy số Fibonacci được định nghĩa như sau:\n$F_0 = 0$, $F_1 = 1$, $F_n = F_{n-1} + F_{n-2}$ với mọi $n \\ge 2$.\nCho số nguyên $N$ ($0 \\le N \\le 30$). Hãy viết chương trình tìm và in ra giá trị của $F_N$.",
          inputFormat: "Một số nguyên duy nhất N.",
          outputFormat: "In giá trị số Fibonacci thứ N.",
          constraints: "$0 \\le N \\le 30$",
          sampleCases: [
            {
              input: "6",
              output: "8",
              explanation: "Dãy Fibonacci: 0, 1, 1, 2, 3, 5, 8... Số thứ 6 là 8."
            },
            {
              input: "0",
              output: "0",
              explanation: "F(0) = 0."
            }
          ],
          starterCode: `def fib(n):\n    if n == 0:\n        return 0\n    if n == 1:\n        return 1\n    a, b = 0, 1\n    for _ in range(2, n + 1):\n        a, b = b, a + b\n    return b\n\nn = int(input())\nprint(fib(n))\n`,
          testCases: [
            {
              id: "tc12-1",
              input: "6",
              expectedOutput: "8",
              isHidden: false
            },
            {
              id: "tc12-2",
              input: "0",
              expectedOutput: "0",
              isHidden: false
            },
            {
              id: "tc12-3",
              input: "10",
              expectedOutput: "55",
              isHidden: true
            },
            {
              id: "tc12-4",
              input: "20",
              expectedOutput: "6765",
              isHidden: true
            }
          ],
          hints: [
            "Nếu n == 0: return 0",
            "Nếu n == 1: return 1",
            "Dùng vòng lặp hoặc đệ quy để tính các số tiếp theo."
          ]
        }
      }
    ]
  },
  {
    id: "module-8",
    title: "Chương 8: Chuyên Đề Nâng Cao & Hướng Đối Tượng (OOP)",
    description: "Xử lý ngoại lệ try-except, đọc ghi tệp tin và lập trình hướng đối tượng với Class và Object.",
    iconName: "Boxes",
    order: 8,
    color: "from-indigo-600 to-slate-900",
    lessons: [
      {
        id: "lesson-13",
        moduleId: "module-8",
        moduleTitle: "Chương 8: Nâng Cao & OOP",
        order: 1,
        title: "Bài 13: Lập Trình Hướng Đối Tượng (OOP) & Class",
        description: "Xây dựng các lớp đối tượng, thuộc tính, phương thức và hàm khởi tạo __init__.",
        durationMin: 35,
        xpReward: 150,
        theory: {
          summary: "Lập trình hướng đối tượng (OOP) mô hình hóa thế giới thực thành các đối tượng có thuộc tính (biến) và hành vi (phương thức).",
          keyPoints: [
            "Tạo lớp với từ khóa `class TenLop:`",
            "Hàm khởi tạo `__init__(self, ...)` được gọi tự động khi tạo đối tượng mới.",
            "`self` đại diện cho chính phiên bản đối tượng đang thao tác."
          ],
          conceptIllustration: {
            type: "syntax",
            title: "Mô hình Lớp Học Sinh (Student)",
            description: "Thuộc tính: name, score. Phương thức: get_grade(), introduce().",
            visualData: {
              className: "Student",
              properties: ["name: str", "score: float"],
              methods: ["get_grade()", "introduce()"]
            }
          },
          examples: [
            {
              title: "Ví dụ: Lớp Hình Chữ Nhật",
              explanation: "Định nghĩa class Rectangle tính chu vi và diện tích.",
              code: 'class Rectangle:\n    def __init__(self, w, h):\n        self.w = w\n        self.h = h\n    def area(self):\n        return self.w * self.h\n\nr = Rectangle(10, 5)\nprint("Dien tich:", r.area())',
              output: "Dien tich: 50"
            }
          ],
          interactiveChallenge: {
            prompt: "Tạo đối tượng Rectangle với chiều dài 8, chiều rộng 6 và in diện tích.",
            initialCode: "class Rectangle:\n    def __init__(self, w, h):\n        self.w = w\n        self.h = h\n    def area(self):\n        return self.w * self.h\n\nrect = Rectangle(8, 6)\nprint(rect.area())",
            hint: "rect.area() sẽ trả về 48."
          }
        },
        practice: {
          title: "Thử thách 13: Quản lý thông tin Học sinh với Class",
          difficulty: "Nâng cao",
          problemStatement: "Viết lớp `Student` có hàm khởi tạo nhận 2 tham số: `name` (chuỗi) và `score` (số thực).\nLớp có phương thức `is_passed()` trả về `True` nếu `score >= 5.0`, ngược lại trả về `False`.\nChương trình nhập vào `name` và `score`, tạo đối tượng và in ra:\n- `<name> - DAT` nếu is_passed() là True.\n- `<name> - KHONG DAT` nếu is_passed() là False.",
          inputFormat: "Dòng 1: Tên học sinh name.\nDòng 2: Điểm số score.",
          outputFormat: "In chuỗi kết quả theo định dạng yêu cầu.",
          constraints: "$0.0 \\le score \\le 10.0$",
          sampleCases: [
            {
              input: "Nguyen Van A\n8.5",
              output: "Nguyen Van A - DAT",
              explanation: "8.5 >= 5.0 nên DAT."
            },
            {
              input: "Tran Thi B\n4.0",
              output: "Tran Thi B - KHONG DAT",
              explanation: "4.0 < 5.0 nên KHONG DAT."
            }
          ],
          starterCode: `class Student:\n    def __init__(self, name, score):\n        self.name = name\n        self.score = score\n    \n    def is_passed(self):\n        return self.score >= 5.0\n\nname = input()\nscore = float(input())\nst = Student(name, score)\n\nif st.is_passed():\n    print(f"{st.name} - DAT")\nelse:\n    print(f"{st.name} - KHONG DAT")\n`,
          testCases: [
            {
              id: "tc13-1",
              input: "Nguyen Van A\n8.5",
              expectedOutput: "Nguyen Van A - DAT",
              isHidden: false
            },
            {
              id: "tc13-2",
              input: "Tran Thi B\n4.0",
              expectedOutput: "Tran Thi B - KHONG DAT",
              isHidden: false
            },
            {
              id: "tc13-3",
              input: "Le Van C\n5.0",
              expectedOutput: "Le Van C - DAT",
              isHidden: true
            }
          ],
          hints: [
            "Tạo class Student có hàm __init__(self, name, score)",
            "Định nghĩa def is_passed(self): return self.score >= 5.0"
          ]
        }
      }
    ]
  }
];

// Initial mock data for Leaderboard, Study Groups, Offline Docs, Notes
export const INITIAL_LEADERBOARD: any[] = [
  {
    rank: 1,
    userId: "user-1",
    fullName: "Lê Hoàng Phúc",
    username: "hoangphuc_it",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Phuc",
    grade: "Lớp 10A1",
    totalXp: 1850,
    weeklyXp: 450,
    streakDays: 14,
    badgesCount: 8,
    solvedCount: 13,
  },
  {
    rank: 2,
    userId: "user-2",
    fullName: "Trần Mai Anh",
    username: "maianh_code",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=MaiAnh",
    grade: "Lớp 10A2",
    totalXp: 1620,
    weeklyXp: 390,
    streakDays: 11,
    badgesCount: 7,
    solvedCount: 12,
  },
  {
    rank: 3,
    userId: "user-3",
    fullName: "Nguyễn Minh Đức",
    username: "duc_python",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=MinhDuc",
    grade: "Lớp 11A",
    totalXp: 1480,
    weeklyXp: 340,
    streakDays: 9,
    badgesCount: 6,
    solvedCount: 11,
  },
  {
    rank: 4,
    userId: "user-4",
    fullName: "Phạm Thảo Vy",
    username: "vy_coder",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=ThaoVy",
    grade: "Lớp 10A1",
    totalXp: 1250,
    weeklyXp: 280,
    streakDays: 6,
    badgesCount: 5,
    solvedCount: 9,
  },
  {
    rank: 5,
    userId: "user-5",
    fullName: "Võ Quang Huy",
    username: "huy_algorithm",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=QuangHuy",
    grade: "Lớp 12 Tin",
    totalXp: 1120,
    weeklyXp: 210,
    streakDays: 5,
    badgesCount: 4,
    solvedCount: 8,
  }
];

export const INITIAL_STUDY_GROUPS = [
  {
    id: "group-1",
    name: "Lớp 10A1 - Đội Tuyển Tin Học",
    description: "Nhóm trao đổi bài tập và thảo luận thuật toán dành riêng cho học sinh lớp 10A1.",
    category: "Lớp học chính khóa",
    memberCount: 38,
    isJoined: true,
    teacherName: "Thầy Nam (GV Tin Học)",
    avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=Class10A1",
    pinnedPost: {
      title: "Thông báo kiểm tra 15 phút tuần này",
      content: "Các em nhớ hoàn thành toàn bộ bài tập trong Chương 2 (If-Else) và Chương 3 (Vòng lặp) trước thứ 6 nhé! Hệ thống sẽ tự động tổng kết điểm tích lũy.",
      author: "Thầy Nam (GV Tin Học)",
      date: "Hôm qua lúc 18:30"
    },
    messages: [
      {
        id: "msg-1",
        userId: "user-teacher",
        userName: "Thầy Nam (GV Tin Học)",
        userAvatar: "https://api.dicebear.com/7.x/bottts/svg?seed=TeacherNam",
        userRole: "teacher",
        timestamp: "08:15",
        content: "Chào cả lớp! Hôm nay chúng ta bắt đầu bài học về Danh sách List và Vòng lặp for. Em nào gặp lỗi logic ở Thử thách 7 có thể hỏi AI Tutor hoặc gửi code vào đây nhé!",
        likes: 12,
        isLiked: true,
      },
      {
        id: "msg-2",
        userId: "user-1",
        userName: "Lê Hoàng Phúc",
        userAvatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Phuc",
        userRole: "student",
        timestamp: "08:42",
        content: "Mình vừa giải xong bài UCLN bằng thuật toán Euclid, code chạy cực kỳ nhanh luôn mọi người ơi!",
        codeSnippet: "def gcd(a, b):\n    while b:\n        a, b = b, a % b\n    return a",
        likes: 7,
        isLiked: false,
      },
      {
        id: "msg-3",
        userId: "user-2",
        userName: "Trần Mai Anh",
        userAvatar: "https://api.dicebear.com/7.x/bottts/svg?seed=MaiAnh",
        userRole: "student",
        timestamp: "09:05",
        content: "Cảm ơn bạn Phúc, nhờ gợi ý này mình đã vượt qua test ẩn thứ 4 của bài!",
        likes: 4,
        isLiked: false,
      }
    ]
  },
  {
    id: "group-2",
    name: "CLB Lập Trình Python Trẻ",
    description: "Cộng đồng đam mê lập trình sáng tạo, chia sẻ dự án game, ứng dụng và mẹo code Python.",
    category: "Câu lạc bộ",
    memberCount: 142,
    isJoined: false,
    teacherName: "Cô Thảo (Cố vấn CLB)",
    avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=PythonClub",
    messages: []
  },
  {
    id: "group-3",
    name: "Nhóm Luyện Thi HSG Tin Học",
    description: "Chuyên sâu về thuật toán quy hoạch động, đồ thị, đệ quy và cấu trúc dữ liệu nâng cao.",
    category: "Bồi dưỡng học sinh giỏi",
    memberCount: 24,
    isJoined: false,
    teacherName: "Thầy Nam (GV Tin Học)",
    avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=HSGTin",
    messages: []
  }
];

export const OFFLINE_HANDBOOK_TOPICS = [
  {
    id: "topic-1",
    title: "1. Cú pháp & Kiểu dữ liệu cơ bản",
    summary: "Tổng hợp các kiểu dữ liệu int, float, str, bool, toán tử và ép kiểu.",
    content: `### Các kiểu dữ liệu cốt lõi
- \`int\`: Số nguyên (ví dụ: \`10\`, \`-5\`, \`0\`)
- \`float\`: Số thực thập phân (ví dụ: \`3.14\`, \`-0.5\`)
- \`str\`: Chuỗi ký tự, đặt trong nháy đơn \`'...\'\` hoặc nháy kép \`"..."\`
- \`bool\`: Giá trị logic \`True\` hoặc \`False\`

### Các phép toán số học
- Phép cộng: \`a + b\`
- Phép trừ: \`a - b\`
- Phép nhân: \`a * b\`
- Phép chia thực: \`a / b\` (luôn cho kết quả kiểu float)
- Phép chia lấy nguyên: \`a // b\` (ví dụ: \`7 // 2 = 3\`)
- Phép chia lấy dư: \`a % b\` (ví dụ: \`7 % 2 = 1\`)
- Phép lũy thừa: \`a ** b\` (ví dụ: \`2 ** 3 = 8\`)

### Nhập xuất dữ liệu
\`\`\`python
# In ra màn hình
print("Xin chao", name)

# Nhập dữ liệu từ bàn phím (mặc định trả về str)
name = input()
age = int(input()) # Ép kiểu sang số nguyên
price = float(input()) # Ép kiểu sang số thực
\`\`\``
  },
  {
    id: "topic-2",
    title: "2. Cấu trúc rẽ nhánh (if - elif - else)",
    summary: "Quy tắc điều kiện logic, toán tử so sánh và toán tử logic.",
    content: `### Cú pháp điều kiện
\`\`\`python
if dieu_kien_1:
    # Chạy khi dieu_kien_1 là True
elif dieu_kien_2:
    # Chạy khi dieu_kien_2 là True
else:
    # Chạy khi tất cả điều kiện trên đều False
\`\`\`

### Các toán tử so sánh
- \`==\`: Bằng nhau (\`5 == 5\` -> True)
- \`!=\`: Khác nhau (\`5 != 3\` -> True)
- \`>\`, \`<\`, \`>=\`, \`<=\`: Lớn hơn, nhỏ hơn, lớn hơn hoặc bằng, nhỏ hơn hoặc bằng

### Toán tử logic
- \`and\`: Cả hai điều kiện đều phải True
- \`or\`: Ít nhất một trong hai điều kiện là True
- \`not\`: Phủ định giá trị logic (\`not True\` -> False)`
  },
  {
    id: "topic-3",
    title: "3. Vòng lặp (for & while)",
    summary: "Duyệt range(), điều khiển vòng lặp while, break và continue.",
    content: `### Vòng lặp for
\`\`\`python
# Duyệt từ 0 đến 4
for i in range(5):
    print(i)

# Duyệt từ 1 đến 10 với bước nhảy 2
for i in range(1, 11, 2):
    print(i) # In 1, 3, 5, 7, 9
\`\`\`

### Vòng lặp while
\`\`\`python
i = 1
while i <= 5:
    print(i)
    i += 1
\`\`\`

### Lệnh nhảy
- \`break\`: Lập tức thoát khỏi vòng lặp gần nhất.
- \`continue\`: Bỏ qua các lệnh còn lại của vòng lặp hiện tại, chuyển sang vòng lặp kế tiếp.`
  },
  {
    id: "topic-4",
    title: "4. Danh sách (List) & Phương thức hữu ích",
    summary: "Tạo, truy xuất, thêm, xóa và các hàm dựng sẵn cho List.",
    content: `### Khởi tạo và truy xuất
\`\`\`python
a = [10, 20, 30, 40]
print(a[0])  # 10
print(a[-1]) # 40 (phần tử cuối)
\`\`\`

### Thao tác phổ biến
- \`a.append(x)\`: Thêm phần tử x vào cuối list.
- \`a.pop()\`: Xóa và trả về phần tử cuối cùng.
- \`a.insert(i, x)\`: Chèn x vào vị trí chỉ số i.
- \`len(a)\`: Số phần tử trong list.
- \`sum(a)\`: Tổng các phần tử số.
- \`max(a)\`, \`min(a)\`: Phần tử lớn nhất, nhỏ nhất.
- \`sorted(a)\`: Trả về danh sách mới đã được sắp xếp tăng dần.`
  },
  {
    id: "topic-5",
    title: "5. Bảng tra cứu các lỗi thường gặp (Debugging Cheat Sheet)",
    summary: "Nhận biết và cách khắc phục nhanh các lỗi phổ biến trong Python.",
    content: `### 1. SyntaxError: invalid syntax
- **Nguyên nhân:** Thiếu dấu hai chấm \`:\` sau if, for, while, def; hoặc đóng mở ngoặc đơn không khớp.
- **Khắc phục:** Kiểm tra lại cuối dòng lệnh xem đã có dấu \`:\` chưa.

### 2. IndentationError: unexpected indent
- **Nguyên nhân:** Lỗi thụt lề đầu dòng không đồng nhất (thường do trộn lẫn Tab và Phím cách).
- **Khắc phục:** Thống nhất dùng 4 dấu cách (spaces) cho mỗi cấp thụt lề.

### 3. TypeError: unsupported operand type(s)
- **Nguyên nhân:** Cộng chuỗi với số (ví dụ: \`"Tuoi: " + 15\`).
- **Khắc phục:** Ép kiểu số thành chuỗi \`str(15)\` hoặc dùng f-string: \`f"Tuoi: {15}"\`.

### 4. ValueError: invalid literal for int() with base 10
- **Nguyên nhân:** Dùng \`int()\` cho một chuỗi không phải số nguyên (ví dụ: \`int("3.14")\` hoặc \`int("abc")\`).
- **Khắc phục:** Dùng \`float()\` nếu chuỗi chứa số thập phân.

### 5. IndexError: list index out of range
- **Nguyên nhân:** Truy cập phần tử ở vị trí vượt quá độ dài danh sách (ví dụ list có 3 phần tử nhưng gọi \`a[5]\`).
- **Khắc phục:** Đảm bảo chỉ số \`0 <= i < len(a)\`.`
  }
];
