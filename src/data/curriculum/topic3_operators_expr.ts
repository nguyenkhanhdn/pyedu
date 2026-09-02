import { Module } from "../../types";

export const TOPIC_3_OPERATORS_EXPR: Module = {
  id: "topic-3",
  title: "Chủ đề 3: Phép Toán & Biểu Thức",
  description: "Làm chủ các phép toán số học cộng, trừ, nhân, chia (/), chia nguyên (//), chia lấy dư (%), lũy thừa (**), thư viện math và biểu thức logic.",
  iconName: "Calculator",
  order: 3,
  color: "from-amber-500 to-orange-700",
  lessons: [
    {
      id: "t3-l1",
      moduleId: "topic-3",
      moduleTitle: "Chủ đề 3: Phép Toán & Biểu Thức",
      order: 1,
      title: "Bài 1: Tính Tuổi Người Dùng",
      description: "Nhập năm sinh và tính tuổi của một người trong năm 2025.",
      durationMin: 15,
      xpReward: 50,
      theory: {
        summary: "Phép trừ số học `-` dùng để tính toán khoảng thời gian hoặc độ tuổi: `tuoi = nam_hien_tai - nam_sinh`.",
        keyPoints: [
          "Dùng `int(input())` để đọc năm sinh dạng số nguyên.",
          "Công thức: `tuoi = 2025 - nam_sinh`."
        ],
        conceptIllustration: {
          type: "syntax",
          title: "Phép Trừ Số Học",
          description: "2025 - 2008 = 17 tuổi",
          visualData: {
            codeSnippet: "nam_sinh = 2008\ntuoi = 2025 - nam_sinh\nprint(tuoi)",
            outputPreview: "17",
            explanation: "Tính tuổi bằng hiệu của năm mốc 2025 và năm sinh."
          }
        },
        examples: [
          {
            title: "Ví dụ: Tính tuổi năm 2025",
            explanation: "Nhập năm sinh 2010 và tính tuổi.",
            code: "y = 2010\nprint(f\"Tuoi vao nam 2025: {2025 - y}\")",
            output: "Tuoi vao nam 2025: 15"
          }
        ],
        multipleChoice: {
          question: "Để tính tuổi của một người sinh năm `y` vào năm 2025, biểu thức nào đúng?",
          options: ["y - 2025", "2025 - y", "2025 + y", "2025 * y"],
          correctIndex: 1,
          explanation: "Tuổi = Năm hiện tại (2025) - Năm sinh (y)."
        }
      },
      practice: {
        id: "t3-p1",
        title: "Bài 1: Tính Tuổi",
        difficulty: "Cơ bản",
        problemStatement: "Viết chương trình nhập vào năm sinh của một người. Tính và in ra tuổi của người đó trong năm 2025 theo mẫu:\n`Tuoi cua ban vao nam 2025: <tuoi>`",
        inputFormat: "Một dòng chứa số nguyên dương y là năm sinh (1900 <= y <= 2025).",
        outputFormat: "Một dòng: `Tuoi cua ban vao nam 2025: <tuoi>`",
        constraints: "1900 <= y <= 2025.",
        sampleCases: [
          {
            input: "2008",
            output: "Tuoi cua ban vao nam 2025: 17",
            explanation: "2025 - 2008 = 17 tuổi."
          }
        ],
        starterCode: `# Nhập năm sinh
y = int(input())

# TODO: Tính tuổi trong năm 2025 và in ra
`,
        testCases: [
          {
            id: "t3-1-tc1",
            input: "2008",
            expectedOutput: "Tuoi cua ban vao nam 2025: 17",
            isHidden: false,
            explanation: "Kiểm tra sinh năm 2008."
          },
          {
            id: "t3-1-tc2",
            input: "1995",
            expectedOutput: "Tuoi cua ban vao nam 2025: 30",
            isHidden: false,
            explanation: "Kiểm tra sinh năm 1995."
          },
          {
            id: "t3-1-tc3",
            input: "2025",
            expectedOutput: "Tuoi cua ban vao nam 2025: 0",
            isHidden: true,
            explanation: "Kiểm tra sinh năm 2025."
          }
        ],
        hints: [
          "Dùng `tuoi = 2025 - y`",
          "In ra: `print(f\"Tuoi cua ban vao nam 2025: {tuoi}\")`"
        ],
        solutionExplanation: "y = int(input())\ntuoi = 2025 - y\nprint(f\"Tuoi cua ban vao nam 2025: {tuoi}\")"
      }
    },
    {
      id: "t3-l2",
      moduleId: "topic-3",
      moduleTitle: "Chủ đề 3: Phép Toán & Biểu Thức",
      order: 2,
      title: "Bài 2: Hóa Đơn Văn Phòng Phẩm",
      description: "Một cửa hàng bán vở giá 8.000 đồng/quyển và bút giá 5.000 đồng/cây. Nhập số lượng mỗi loại và tính tổng tiền.",
      durationMin: 15,
      xpReward: 50,
      theory: {
        summary: "Phép nhân `*` và phép cộng `+` kết hợp tạo thành công thức tính tổng chi phí mua sắm: `tong = so_luong_1 * gia_1 + so_luong_2 * gia_2`.",
        keyPoints: [
          "Giá vở: 8.000 đ/quyển.",
          "Giá bút: 5.000 đ/cây.",
          "Tổng tiền = `x * 8000 + y * 5000`."
        ],
        conceptIllustration: {
          type: "syntax",
          title: "Tính Hóa Đơn Mua Hàng",
          description: "Tổng tiền = Số vở * 8.000 + Số bút * 5.000",
          visualData: {
            codeSnippet: "x = 5\ny = 3\ntong = x * 8000 + y * 5000\nprint(f\"{tong} VND\")",
            outputPreview: "55000 VND",
            explanation: "5*8000 + 3*5000 = 40000 + 15000 = 55.000 VND."
          }
        },
        examples: [
          {
            title: "Ví dụ: Mua 10 vở và 2 bút",
            explanation: "10 * 8000 + 2 * 5000 = 90.000 VND.",
            code: "x = 10\ny = 2\nprint(x * 8000 + y * 5000)",
            output: "90000"
          }
        ],
        multipleChoice: {
          question: "Để tính tổng tiền khi mua x quyển vở giá 8000đ và y cây bút giá 5000đ, công thức nào đúng?",
          options: [
            "x + 8000 * y + 5000",
            "x * 8000 + y * 5000",
            "(x + y) * (8000 + 5000)",
            "x * 5000 + y * 8000"
          ],
          correctIndex: 1,
          explanation: "Tổng tiền là tổng của tiền vở (x * 8000) và tiền bút (y * 5000)."
        }
      },
      practice: {
        id: "t3-p2",
        title: "Bài 2: Hóa Đơn Văn Phòng Phẩm",
        difficulty: "Cơ bản",
        problemStatement: "Một nhà sách bán vở với giá 8.000 đồng/quyển và bút bi với giá 5.000 đồng/cây. Viết chương trình nhập vào số lượng vở `x` và số lượng bút `y` (mỗi số trên 1 dòng). Hãy tính và in ra tổng số tiền phải trả theo định dạng:\n`Tong tien: <tong> VND`",
        inputFormat: "Gồm 2 dòng:\n- Dòng 1: Số lượng vở x (số nguyên >= 0)\n- Dòng 2: Số lượng bút y (số nguyên >= 0)",
        outputFormat: "Một dòng: `Tong tien: <tong> VND`",
        constraints: "0 <= x, y <= 10000.",
        sampleCases: [
          {
            input: "5\n4",
            output: "Tong tien: 60000 VND",
            explanation: "5 * 8000 + 4 * 5000 = 40.000 + 20.000 = 60.000 VND."
          }
        ],
        starterCode: `# Nhập số lượng vở x và bút y
x = int(input())
y = int(input())

# TODO: Tính tổng tiền và in theo mẫu
`,
        testCases: [
          {
            id: "t3-2-tc1",
            input: "5\n4",
            expectedOutput: "Tong tien: 60000 VND",
            isHidden: false,
            explanation: "Kiểm tra 5 vở 4 bút."
          },
          {
            id: "t3-2-tc2",
            input: "10\n0",
            expectedOutput: "Tong tien: 80000 VND",
            isHidden: false,
            explanation: "Kiểm tra 10 vở 0 bút."
          },
          {
            id: "t3-2-tc3",
            input: "0\n7",
            expectedOutput: "Tong tien: 35000 VND",
            isHidden: true,
            explanation: "Kiểm tra 0 vở 7 bút."
          }
        ],
        hints: [
          "Công thức: `tong = x * 8000 + y * 5000`",
          "In ra: `print(f\"Tong tien: {tong} VND\")`"
        ],
        solutionExplanation: "x = int(input())\ny = int(input())\ntong = x * 8000 + y * 5000\nprint(f\"Tong tien: {tong} VND\")"
      }
    },
    {
      id: "t3-l3",
      moduleId: "topic-3",
      moduleTitle: "Chủ đề 3: Phép Toán & Biểu Thức",
      order: 3,
      title: "Bài 3: Đổi Giây Sang Thời Gian",
      description: "Nhập tổng số giây. Tính số giờ, phút và giây tương ứng. Sử dụng các toán tử // và %.",
      durationMin: 20,
      xpReward: 60,
      theory: {
        summary: "Toán tử chia lấy nguyên `//` và chia lấy dư `%` rất hữu ích khi đổi đơn vị thời gian (1 giờ = 3600 giây, 1 phút = 60 giây).",
        keyPoints: [
          "`gio = s // 3600` (lấy số giờ nguyên).",
          "`s_du = s % 3600` (số giây còn lại sau khi trừ đi các giờ chẵn).",
          "`phut = s_du // 60` (lấy số phút).",
          "`giay = s_du % 60` (lấy số giây cuối cùng)."
        ],
        conceptIllustration: {
          type: "syntax",
          title: "Đổi Đơn Vị Thời Gian Bằng // và %",
          description: "3665 giây -> 1 giờ (3600s), dư 65s -> 1 phút (60s), dư 5s.",
          visualData: {
            codeSnippet: "s = 3665\nh = s // 3600\nm = (s % 3600) // 60\nsec = s % 60\nprint(f\"{h}h {m}m {sec}s\")",
            outputPreview: "1h 1m 5s",
            explanation: "Đổi 3665 giây thành 1 giờ 1 phút 5 giây."
          }
        },
        examples: [
          {
            title: "Ví dụ: Đổi 75 giây",
            explanation: "75 giây = 0 giờ 1 phút 15 giây.",
            code: "s = 75\nprint(s // 60, \"phut\", s % 60, \"giay\")",
            output: "1 phut 15 giay"
          }
        ],
        multipleChoice: {
          question: "Biểu thức `125 % 60` trong Python cho kết quả bằng bao nhiêu?",
          options: ["2", "5", "2.08", "0"],
          correctIndex: 1,
          explanation: "125 chia 60 được thương là 2 và dư 5 (vì 60 * 2 + 5 = 125)."
        }
      },
      practice: {
        id: "t3-p3",
        title: "Bài 3: Đổi Giây Sang Thời Gian",
        difficulty: "Trung bình",
        problemStatement: "Viết chương trình nhập vào tổng số giây `s` (số nguyên không âm). Hãy chuyển đổi số giây đó thành số giờ, phút và giây tương ứng, in ra theo mẫu:\n`<h> gio <m> phut <s> giay`",
        inputFormat: "Một dòng chứa số nguyên không âm s (0 <= s <= 10^8).",
        outputFormat: "Một dòng theo mẫu: `<h> gio <m> phut <s> giay`",
        constraints: "0 <= s <= 10^8.",
        sampleCases: [
          {
            input: "3665",
            output: "1 gio 1 phut 5 giay",
            explanation: "3665 = 1*3600 + 1*60 + 5."
          },
          {
            input: "7200",
            output: "2 gio 0 phut 0 giay",
            explanation: "7200 = 2 giờ chẵn."
          }
        ],
        starterCode: `# Nhập tổng số giây s
s = int(input())

# TODO: Tính giờ, phút, giây dùng // và %
`,
        testCases: [
          {
            id: "t3-3-tc1",
            input: "3665",
            expectedOutput: "1 gio 1 phut 5 giay",
            isHidden: false,
            explanation: "Kiểm tra 3665s."
          },
          {
            id: "t3-3-tc2",
            input: "7200",
            expectedOutput: "2 gio 0 phut 0 giay",
            isHidden: false,
            explanation: "Kiểm tra 7200s."
          },
          {
            id: "t3-3-tc3",
            input: "59",
            expectedOutput: "0 gio 0 phut 59 giay",
            isHidden: true,
            explanation: "Kiểm tra dưới 1 phút."
          }
        ],
        hints: [
          "`h = s // 3600`",
          "`m = (s % 3600) // 60`",
          "`sec = s % 60`",
          "`print(f\"{h} gio {m} phut {sec} giay\")`"
        ],
        solutionExplanation: "s = int(input())\nh = s // 3600\nm = (s % 3600) // 60\nsec = s % 60\nprint(f\"{h} gio {m} phut {sec} giay\")"
      }
    },
    {
      id: "t3-l4",
      moduleId: "topic-3",
      moduleTitle: "Chủ đề 3: Phép Toán & Biểu Thức",
      order: 4,
      title: "Bài 4: Chu Vi & Diện Tích Hình Tròn",
      description: "Nhập bán kính r. Tính chu vi và diện tích hình tròn sử dụng math.pi.",
      durationMin: 20,
      xpReward: 60,
      theory: {
        summary: "Thư viện `math` trong Python cung cấp hằng số `math.pi` (số Pi xấp xỉ 3.14159...). Công thức: Chu vi $C = 2 \\times \\pi \\times r$, Diện tích $S = \\pi \\times r^2$.",
        keyPoints: [
          "Import thư viện: `import math`.",
          "Chu vi: `c = 2 * math.pi * r`.",
          "Diện tích: `s = math.pi * (r ** 2)`.",
          "Định dạng làm tròn 2 chữ số thập phân: `f\"{c:.2f}\"`."
        ],
        conceptIllustration: {
          type: "syntax",
          title: "Công Thức Hình Tròn",
          description: "C = 2 * pi * r | S = pi * r^2",
          visualData: {
            codeSnippet: "import math\nr = 5\nc = 2 * math.pi * r\ns = math.pi * r * r\nprint(f\"C: {c:.2f}, S: {s:.2f}\")",
            outputPreview: "C: 31.42, S: 78.54",
            explanation: "Tính chu vi và diện tích với r = 5."
          }
        },
        examples: [
          {
            title: "Ví dụ: Tính với r = 3",
            explanation: "r = 3 -> C = 18.85, S = 28.27.",
            code: "import math\nr = 3.0\nprint(f\"{2 * math.pi * r:.2f}\")\nprint(f\"{math.pi * r * r:.2f}\")",
            output: "18.85\n28.27"
          }
        ],
        multipleChoice: {
          question: "Để sử dụng hằng số số Pi chính xác trong Python, ta dùng lệnh nào?",
          options: ["pi", "math.pi sau khi import math", "PI()", "math.PI"],
          correctIndex: 1,
          explanation: "Ta cần import math và truy cập hằng số math.pi."
        }
      },
      practice: {
        id: "t3-p4",
        title: "Bài 4: Hình Tròn",
        difficulty: "Cơ bản",
        problemStatement: "Viết chương trình nhập bán kính `r` (số thực dương) của một hình tròn. Sử dụng hằng số `math.pi` trong thư viện `math` để tính chu vi và diện tích hình tròn. In kết quả làm tròn đúng 2 chữ số thập phân theo mẫu:\n`Chu vi: <C>`\n`Dien tich: <S>`",
        inputFormat: "Một dòng chứa số thực r (0 < r <= 1000).",
        outputFormat: "Gồm 2 dòng:\nChu vi: <C:.2f>\nDien tich: <S:.2f>",
        constraints: "0 < r <= 1000.",
        sampleCases: [
          {
            input: "5.0",
            output: "Chu vi: 31.42\nDien tich: 78.54",
            explanation: "C = 2 * pi * 5 = 31.4159... -> 31.42; S = pi * 25 = 78.5398... -> 78.54."
          }
        ],
        starterCode: `import math

# Nhập bán kính r
r = float(input())

# TODO: Tính chu vi và diện tích, in với 2 chữ số thập phân
`,
        testCases: [
          {
            id: "t3-4-tc1",
            input: "5.0",
            expectedOutput: "Chu vi: 31.42\nDien tich: 78.54",
            isHidden: false,
            explanation: "Kiểm tra r = 5.0."
          },
          {
            id: "t3-4-tc2",
            input: "10.0",
            expectedOutput: "Chu vi: 62.83\nDien tich: 314.16",
            isHidden: false,
            explanation: "Kiểm tra r = 10.0."
          },
          {
            id: "t3-4-tc3",
            input: "1.0",
            expectedOutput: "Chu vi: 6.28\nDien tich: 3.14",
            isHidden: true,
            explanation: "Kiểm tra r = 1.0."
          }
        ],
        hints: [
          "`c = 2 * math.pi * r`",
          "`s = math.pi * r * r`",
          "`print(f\"Chu vi: {c:.2f}\")`",
          "`print(f\"Dien tich: {s:.2f}\")`"
        ],
        solutionExplanation: "import math\nr = float(input())\nc = 2 * math.pi * r\ns = math.pi * (r ** 2)\nprint(f\"Chu vi: {c:.2f}\")\nprint(f\"Dien tich: {s:.2f}\")"
      }
    },
    {
      id: "t3-l5",
      moduleId: "topic-3",
      moduleTitle: "Chủ đề 3: Phép Toán & Biểu Thức",
      order: 5,
      title: "Bài 5: Chuyển Đổi Tiền Tệ USD Sang VND",
      description: "Nhập số tiền USD. Đổi sang VND với tỷ giá 25.000 đồng/USD. Định dạng số tiền có dấu phẩy phân cách hàng nghìn.",
      durationMin: 20,
      xpReward: 60,
      theory: {
        summary: "Để định dạng số nguyên có dấu phẩy phân cách hàng nghìn trong Python, ta dùng f-string với cú pháp `f\"{so:,}\"` (ví dụ `2500000` -> `'2,500,000'`).",
        keyPoints: [
          "Tỷ giá: 1 USD = 25.000 VND.",
          "`vnd = usd * 25000`.",
          "Cú pháp định dạng dấu phẩy hàng nghìn: `f\"{vnd:,}\"`."
        ],
        conceptIllustration: {
          type: "syntax",
          title: "Định Dạng Dấu Phẩy Phân Cách Hàng Nghìn",
          description: "100 USD -> 100 * 25.000 = 2,500,000 VND",
          visualData: {
            codeSnippet: "usd = 100\nvnd = usd * 25000\nprint(f\"{vnd:,} VND\")",
            outputPreview: "2,500,000 VND",
            explanation: "Dấu phẩy tự động phân tách mỗi 3 chữ số hàng nghìn."
          }
        },
        examples: [
          {
            title: "Ví dụ: Đổi 50 USD",
            explanation: "50 * 25.000 = 1,250,000 VND.",
            code: "usd = 50\nvnd = usd * 25000\nprint(f\"{vnd:,} VND\")",
            output: "1,250,000 VND"
          }
        ],
        multipleChoice: {
          question: "Cú pháp f-string nào in số `x = 1000000` thành chuỗi `'1,000,000'`?",
          options: ["f\"{x:format}\"", "f\"{x:,}\"", "f\"{x.comma}\"", "f\"{x:thousand}\""],
          correctIndex: 1,
          explanation: "Ký tự `,` trong bộ đặc tả định dạng f-string `{x:,}` chèn dấu phẩy phân cách hàng nghìn."
        }
      },
      practice: {
        id: "t3-p5",
        title: "Bài 5: Chuyển Đổi Tiền Tệ",
        difficulty: "Cơ bản",
        problemStatement: "Viết chương trình nhập vào số tiền USD (số nguyên dương). Hãy chuyển đổi sang tiền Việt Nam Đồng (VND) với tỷ giá cố định 25.000 đồng/USD. In ra số tiền VND có dấu phẩy phân cách hàng nghìn theo mẫu:\n`<so_tien_vnd> VND`",
        inputFormat: "Một dòng chứa số nguyên dương usd (1 <= usd <= 10^7).",
        outputFormat: "Một dòng dạng: `<vnd_co_dau_phay> VND`",
        constraints: "1 <= usd <= 10^7.",
        sampleCases: [
          {
            input: "100",
            output: "2,500,000 VND",
            explanation: "100 * 25000 = 2,500,000 VND."
          },
          {
            input: "8",
            output: "200,000 VND",
            explanation: "8 * 25000 = 200,000 VND."
          }
        ],
        starterCode: `# Nhập số tiền USD
usd = int(input())

# TODO: Tính tiền VND và in có dấu phẩy phân cách hàng nghìn
`,
        testCases: [
          {
            id: "t3-5-tc1",
            input: "100",
            expectedOutput: "2,500,000 VND",
            isHidden: false,
            explanation: "Kiểm tra 100 USD."
          },
          {
            id: "t3-5-tc2",
            input: "8",
            expectedOutput: "200,000 VND",
            isHidden: false,
            explanation: "Kiểm tra 8 USD."
          },
          {
            id: "t3-5-tc3",
            input: "1000",
            expectedOutput: "25,000,000 VND",
            isHidden: true,
            explanation: "Kiểm tra 1000 USD."
          }
        ],
        hints: [
          "Tính: `vnd = usd * 25000`",
          "In ra: `print(f\"{vnd:,} VND\")`"
        ],
        solutionExplanation: "usd = int(input())\nvnd = usd * 25000\nprint(f\"{vnd:,} VND\")"
      }
    },
    {
      id: "t3-l6",
      moduleId: "topic-3",
      moduleTitle: "Chủ đề 3: Phép Toán & Biểu Thức",
      order: 6,
      title: "Bài 6: Kiểm Tra Số Chẵn Bằng Biểu Thức",
      description: "Nhập số nguyên n. Tạo biểu thức cho kết quả True nếu n là số chẵn và False nếu n là số lẻ. Không sử dụng if.",
      durationMin: 15,
      xpReward: 50,
      theory: {
        summary: "Toán tử so sánh `==` khi kết hợp với phép chia lấy dư `%` sẽ trả về trực tiếp giá trị boolean `True` hoặc `False` mà không cần dùng câu lệnh điều kiện `if`.",
        keyPoints: [
          "Biểu thức `n % 2 == 0` trả về `True` nếu `n` là số chẵn, `False` nếu `n` là số lẻ.",
          "Có thể in trực tiếp biểu thức logic: `print(n % 2 == 0)`."
        ],
        conceptIllustration: {
          type: "syntax",
          title: "Biểu Thức Logic Boolean",
          description: "8 % 2 == 0 -> True | 7 % 2 == 0 -> False",
          visualData: {
            codeSnippet: "n = 8\nla_so_chan = (n % 2 == 0)\nprint(la_so_chan)",
            outputPreview: "True",
            explanation: "Biểu thức boolean trả về True/False trực tiếp."
          }
        },
        examples: [
          {
            title: "Ví dụ: Kiểm tra số chẵn lẻ",
            explanation: "In kết quả True/False không dùng if.",
            code: "n = 11\nprint(n % 2 == 0)",
            output: "False"
          }
        ],
        multipleChoice: {
          question: "Biểu thức Python nào sau đây trả về True khi n là số chẵn và False khi n là số lẻ?",
          options: ["n / 2 == 0", "n % 2 == 0", "n // 2 == 0", "n == 2"],
          correctIndex: 1,
          explanation: "n % 2 == 0 kiểm tra số dư khi chia cho 2 bằng 0 (định nghĩa của số chẵn)."
        }
      },
      practice: {
        id: "t3-p6",
        title: "Bài 6: Kiểm Tra Số Chẵn Bằng Biểu Thức",
        difficulty: "Cơ bản",
        problemStatement: "Nhập một số nguyên `n` từ bàn phím. Viết biểu thức logic in ra `True` nếu `n` là số chẵn và `False` nếu `n` là số lẻ. Tuyệt đối KHÔNG sử dụng câu lệnh `if`.",
        inputFormat: "Một dòng chứa số nguyên n.",
        outputFormat: "In ra `True` hoặc `False`.",
        constraints: "-10^9 <= n <= 10^9.",
        sampleCases: [
          {
            input: "8",
            output: "True",
            explanation: "8 là số chẵn nên in True."
          },
          {
            input: "15",
            output: "False",
            explanation: "15 là số lẻ nên in False."
          }
        ],
        starterCode: `# Nhập số nguyên n
n = int(input())

# TODO: In kết quả True / False bằng biểu thức logic (không dùng if)
`,
        testCases: [
          {
            id: "t3-6-tc1",
            input: "8",
            expectedOutput: "True",
            isHidden: false,
            explanation: "Kiểm tra 8 là số chẵn."
          },
          {
            id: "t3-6-tc2",
            input: "15",
            expectedOutput: "False",
            isHidden: false,
            explanation: "Kiểm tra 15 là số lẻ."
          },
          {
            id: "t3-6-tc3",
            input: "0",
            expectedOutput: "True",
            isHidden: true,
            explanation: "0 là số chẵn."
          }
        ],
        hints: [
          "Chỉ cần viết 1 dòng: `print(n % 2 == 0)`"
        ],
        solutionExplanation: "n = int(input())\nprint(n % 2 == 0)"
      }
    }
  ]
};
