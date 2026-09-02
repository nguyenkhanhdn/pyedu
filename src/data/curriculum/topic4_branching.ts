import { Module } from "../../types";

export const TOPIC_4_BRANCHING: Module = {
  id: "topic-4",
  title: "Chủ đề 4: Cấu Trúc Rẽ Nhánh if / elif / else",
  description: "Làm chủ các cấu trúc rẽ nhánh if, if-else, chuỗi if-elif-else, toán tử logic (and, or, not) và giải quyết các bài toán phân loại đa điều kiện.",
  iconName: "GitFork",
  order: 4,
  color: "from-purple-500 to-indigo-700",
  lessons: [
    {
      id: "t4-l1",
      moduleId: "topic-4",
      moduleTitle: "Chủ đề 4: Cấu Trúc Rẽ Nhánh if / elif / else",
      order: 1,
      title: "Bài 1: Phân Loại BMI",
      description: "Nhập cân nặng và chiều cao, tính chỉ số khối cơ thể BMI và phân loại tình trạng thể lực.",
      durationMin: 20,
      xpReward: 60,
      theory: {
        summary: "Cấu trúc `if-elif-else` cho phép kiểm tra tuần tự nhiều điều kiện loại trừ lẫn nhau.",
        keyPoints: [
          "Công thức: `BMI = weight / (height ** 2)`.",
          "Phân loại:",
          "  - `BMI < 18.5`: `Thieu can`",
          "  - `18.5 <= BMI < 25`: `Binh thuong`",
          "  - `25 <= BMI < 30`: `Thua can`",
          "  - `BMI >= 30`: `Beo phi`"
        ],
        conceptIllustration: {
          type: "branching",
          title: "Sơ Đồ Phân Loại BMI",
          description: "BMI < 18.5 -> Thiếu cân | < 25 -> Bình thường | < 30 -> Thừa cân | >= 30 -> Béo phì",
          visualData: {
            condition: "BMI < 18.5 ? Thieu can : (BMI < 25 ? Binh thuong : (BMI < 30 ? Thua can : Beo phi))",
            ifTrue: "In danh muc tuong ung",
            ifFalse: "Kiem tra tiep"
          }
        },
        examples: [
          {
            title: "Ví dụ: Tính BMI",
            explanation: "Cân nặng 60kg, cao 1.70m -> BMI = 20.76 -> Bình thường.",
            code: "w = 60\nh = 1.70\nbmi = w / (h * h)\nif bmi < 18.5:\n    print('Thieu can')\nelif bmi < 25:\n    print('Binh thuong')\nelif bmi < 30:\n    print('Thua can')\nelse:\n    print('Beo phi')",
            output: "Binh thuong"
          }
        ],
        multipleChoice: {
          question: "Trong Python, từ khóa nào dùng để kiểm tra điều kiện bổ sung nếu lệnh if trước đó là False?",
          options: ["else if", "elif", "elseif", "case"],
          correctIndex: 1,
          explanation: "Từ khóa chuẩn trong Python là elif (viết tắt của else if)."
        }
      },
      practice: {
        id: "t4-p1",
        title: "Bài 1: Phân Loại BMI",
        difficulty: "Trung bình",
        problemStatement: "Viết chương trình nhập vào cân nặng `weight` (kg) và chiều cao `height` (mét, số thực) của một người. Hãy tính chỉ số `BMI = weight / (height * height)` và in ra phân loại tương ứng:\n- `BMI < 18.5`: in `Thieu can`\n- `18.5 <= BMI < 25`: in `Binh thuong`\n- `25 <= BMI < 30`: in `Thua can`\n- `BMI >= 30`: in `Beo phi`",
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
            id: "t4-1-tc1",
            input: "60.0\n1.70",
            expectedOutput: "Binh thuong",
            isHidden: false,
            explanation: "Kiểm tra bình thường."
          },
          {
            id: "t4-1-tc2",
            input: "45.0\n1.65",
            expectedOutput: "Thieu can",
            isHidden: false,
            explanation: "BMI = 16.53 -> Thieu can."
          },
          {
            id: "t4-1-tc3",
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
      }
    },
    {
      id: "t4-l2",
      moduleId: "topic-4",
      moduleTitle: "Chủ đề 4: Cấu Trúc Rẽ Nhánh if / elif / else",
      order: 2,
      title: "Bài 2: Tính Tiền Taxi Lũy Tiến",
      description: "Nhập số km di chuyển và tính cước taxi theo các mức giá lũy tiến quy định.",
      durationMin: 20,
      xpReward: 60,
      theory: {
        summary: "Bài toán tính tiền cước lũy tiến yêu cầu chia quãng đường thành từng phân đoạn để nhân với đơn giá của đoạn đó.",
        keyPoints: [
          "2 km đầu: 12.000 đ/km.",
          "Từ km 3 đến km 10 (tối đa 8 km): 9.500 đ/km.",
          "Từ km 11 đến km 20 (tối đa 10 km): 8.500 đ/km.",
          "Trên 20 km: 7.000 đ/km."
        ],
        conceptIllustration: {
          type: "branching",
          title: "Các Bậc Giá Taxi",
          description: "[0-2km]: 12k/km | [2-10km]: 9.5k/km | [10-20km]: 8.5k/km | [>20km]: 7k/km",
          visualData: {
            condition: "Tách từng phân khúc quãng đường để tính tổng chi phí chính xác",
            ifTrue: "Tổng tiền cước",
            ifFalse: "Không hợp lệ"
          }
        },
        examples: [
          {
            title: "Ví dụ: Đi 5 km",
            explanation: "2 km đầu = 2 * 12000 = 24000. 3 km tiếp = 3 * 9500 = 28500. Tổng = 52.500 VND.",
            code: "km = 5\n# 2 * 12000 + 3 * 9500 = 52500\nprint(52500)",
            output: "52500"
          }
        ],
        multipleChoice: {
          question: "Nếu đi đúng 2 km, tiền cước taxi là bao nhiêu?",
          options: ["12.000 VND", "24.000 VND", "19.000 VND", "20.000 VND"],
          correctIndex: 1,
          explanation: "2 km đầu có giá 12.000 đ/km -> 2 * 12.000 = 24.000 VND."
        }
      },
      practice: {
        id: "t4-p2",
        title: "Bài 2: Tính Tiền Taxi",
        difficulty: "Trung bình",
        problemStatement: "Viết chương trình nhập vào quãng đường `d` (số thực dương, tính bằng km) mà khách hàng đã di chuyển bằng taxi. Hãy tính tổng số tiền cước taxi phải trả theo bảng giá lũy tiến sau:\n- 2 km đầu tiên: giá 12.000 đồng/km.\n- Từ km thứ 3 đến km thứ 10 (khoảng (2, 10]): giá 9.500 đồng/km.\n- Từ km thứ 11 đến km thứ 20 (khoảng (10, 20]): giá 8.500 đồng/km.\n- Trên 20 km (khoảng > 20): giá 7.000 đồng/km.\n\nIn ra số tiền cước (số nguyên làm tròn hoặc kiểu int).",
        inputFormat: "Một dòng chứa số thực dương d (0 < d <= 500).",
        outputFormat: "Một dòng chứa số tiền cước (số nguyên).",
        constraints: "0 < d <= 500.",
        sampleCases: [
          {
            input: "1.5",
            output: "18000",
            explanation: "1.5 km * 12000 = 18000."
          },
          {
            input: "5.0",
            output: "52500",
            explanation: "2 * 12000 + 3 * 9500 = 24000 + 28500 = 52500."
          },
          {
            input: "15.0",
            output: "142500",
            explanation: "2*12000 + 8*9500 + 5*8500 = 24000 + 76000 + 42500 = 142500."
          }
        ],
        starterCode: `# Nhập số km di chuyển
d = float(input())

# TODO: Tính tổng tiền taxi theo các phân đoạn
`,
        testCases: [
          {
            id: "t4-2-tc1",
            input: "1.5",
            expectedOutput: "18000",
            isHidden: false,
            explanation: "Kiểm tra đoạn 1."
          },
          {
            id: "t4-2-tc2",
            input: "5.0",
            expectedOutput: "52500",
            isHidden: false,
            explanation: "Kiểm tra đoạn 2."
          },
          {
            id: "t4-2-tc3",
            input: "15.0",
            expectedOutput: "142500",
            isHidden: false,
            explanation: "Kiểm tra đoạn 3."
          },
          {
            id: "t4-2-tc4",
            input: "25.0",
            expectedOutput: "220000",
            isHidden: true,
            explanation: "Kiểm tra đoạn 4 (>20km): 2*12k + 8*9.5k + 10*8.5k + 5*7k = 24k + 76k + 85k + 35k = 220.000."
          }
        ],
        hints: [
          "Nếu `d <= 2`: `tien = d * 12000`",
          "Nếu `d <= 10`: `tien = 2 * 12000 + (d - 2) * 9500`",
          "Nếu `d <= 20`: `tien = 2 * 12000 + 8 * 9500 + (d - 10) * 8500`",
          "Nếu `d > 20`: `tien = 2 * 12000 + 8 * 9500 + 10 * 8500 + (d - 20) * 7000`",
          "In ra `int(round(tien))`"
        ],
        solutionExplanation: "d = float(input())\nif d <= 2:\n    tien = d * 12000\nelif d <= 10:\n    tien = 2 * 12000 + (d - 2) * 9500\nelif d <= 20:\n    tien = 2 * 12000 + 8 * 9500 + (d - 10) * 8500\nelse:\n    tien = 2 * 12000 + 8 * 9500 + 10 * 8500 + (d - 20) * 7000\nprint(int(round(tien)))"
      }
    },
    {
      id: "t4-l3",
      moduleId: "topic-4",
      moduleTitle: "Chủ đề 4: Cấu Trúc Rẽ Nhánh if / elif / else",
      order: 3,
      title: "Bài 3: Tính Tiền Điện Sinh Hoạt",
      description: "Nhập số kWh điện tiêu thụ và tính tiền theo 4 bậc lũy tiến quy định.",
      durationMin: 20,
      xpReward: 60,
      theory: {
        summary: "Biểu giá điện sinh hoạt bậc thang áp dụng đơn giá cao dần theo các mức tiêu thụ để khuyến khích tiết kiệm điện.",
        keyPoints: [
          "Bậc 1 (cho 50 kWh đầu, từ 0 đến 50): 1.678 đ/kWh.",
          "Bậc 2 (cho 50 kWh tiếp, từ 51 đến 100): 1.734 đ/kWh.",
          "Bậc 3 (cho 100 kWh tiếp, từ 101 đến 200): 2.014 đ/kWh.",
          "Bậc 4 (cho mức tiêu thụ từ 201 trở lên): 2.536 đ/kWh."
        ],
        conceptIllustration: {
          type: "branching",
          title: "4 Bậc Lũy Tiến Điện Sinh Hoạt",
          description: "0-50 kWh: 1678 | 51-100 kWh: 1734 | 101-200 kWh: 2014 | >200 kWh: 2536",
          visualData: {
            condition: "Tính lần lượt theo từng bậc tiêu thụ",
            ifTrue: "Tổng tiền điện",
            ifFalse: "Không hợp lệ"
          }
        },
        examples: [
          {
            title: "Ví dụ: Dùng 75 kWh",
            explanation: "50 kWh bậc 1 = 50 * 1678 = 83900. 25 kWh bậc 2 = 25 * 1734 = 43350. Tổng = 127250.",
            code: "kwh = 75\ntong = 50 * 1678 + 25 * 1734\nprint(tong)",
            output: "127250"
          }
        ],
        multipleChoice: {
          question: "Nếu một hộ gia đình sử dụng đúng 50 kWh điện, số tiền điện phải trả là bao nhiêu?",
          options: ["83.900 đ", "86.700 đ", "100.700 đ", "50.000 đ"],
          correctIndex: 0,
          explanation: "50 * 1678 = 83.900 đồng."
        }
      },
      practice: {
        id: "t4-p3",
        title: "Bài 3: Tính Tiền Điện",
        difficulty: "Trung bình",
        problemStatement: "Viết chương trình nhập vào lượng điện tiêu thụ `kwh` (số nguyên không âm). Tính tổng tiền điện theo 4 bậc lũy tiến sau:\n- 50 kWh đầu tiên: 1.678 đ/kWh\n- 50 kWh tiếp theo (từ kWh 51 đến 100): 1.734 đ/kWh\n- 100 kWh tiếp theo (từ kWh 101 đến 200): 2.014 đ/kWh\n- Từ kWh thứ 201 trở đi: 2.536 đ/kWh\n\nIn ra tổng số tiền điện phải trả (số nguyên).",
        inputFormat: "Một dòng chứa số nguyên không âm kwh (0 <= kwh <= 10000).",
        outputFormat: "Một dòng chứa tổng số tiền điện.",
        constraints: "0 <= kwh <= 10000.",
        sampleCases: [
          {
            input: "75",
            output: "127250",
            explanation: "50 * 1678 + 25 * 1734 = 83900 + 43350 = 127250."
          },
          {
            input: "150",
            output: "271300",
            explanation: "50*1678 + 50*1734 + 50*2014 = 83900 + 86700 + 100700 = 271300."
          }
        ],
        starterCode: `# Nhập số kWh điện tiêu thụ
kwh = int(input())

# TODO: Tính tổng tiền điện theo 4 bậc
`,
        testCases: [
          {
            id: "t4-3-tc1",
            input: "75",
            expectedOutput: "127250",
            isHidden: false,
            explanation: "Kiểm tra 75 kWh."
          },
          {
            id: "t4-3-tc2",
            input: "150",
            expectedOutput: "271300",
            isHidden: false,
            explanation: "Kiểm tra 150 kWh."
          },
          {
            id: "t4-3-tc3",
            input: "250",
            expectedOutput: "498800",
            isHidden: true,
            explanation: "Kiểm tra 250 kWh (>200): 50*1678 + 50*1734 + 100*2014 + 50*2536 = 83900 + 86700 + 201400 + 126800 = 498800."
          }
        ],
        hints: [
          "Dùng `if kwh <= 50: ...`",
          "`elif kwh <= 100: tien = 50 * 1678 + (kwh - 50) * 1734`",
          "`elif kwh <= 200: tien = 50 * 1678 + 50 * 1734 + (kwh - 100) * 2014`",
          "`else: tien = 50 * 1678 + 50 * 1734 + 100 * 2014 + (kwh - 200) * 2536`"
        ],
        solutionExplanation: "kwh = int(input())\nif kwh <= 50:\n    tien = kwh * 1678\nelif kwh <= 100:\n    tien = 50 * 1678 + (kwh - 50) * 1734\nelif kwh <= 200:\n    tien = 50 * 1678 + 50 * 1734 + (kwh - 100) * 2014\nelse:\n    tien = 50 * 1678 + 50 * 1734 + 100 * 2014 + (kwh - 200) * 2536\nprint(tien)"
      }
    },
    {
      id: "t4-l4",
      moduleId: "topic-4",
      moduleTitle: "Chủ đề 4: Cấu Trúc Rẽ Nhánh if / elif / else",
      order: 4,
      title: "Bài 4: Mô Phỏng Cây Rút Tiền Mini ATM",
      description: "Nhập số dư tài khoản và số tiền cần rút. Kiểm tra các điều kiện rút tiền và in thông báo.",
      durationMin: 20,
      xpReward: 60,
      theory: {
        summary: "Mô phỏng máy rút tiền tự động ATM với các ràng buộc nghiệp vụ: số tiền rút phải là bội số của 50.000 VND và không vượt quá số dư hiện có.",
        keyPoints: [
          "Điều kiện bội số: `amount % 50000 == 0`.",
          "Điều kiện đủ số dư: `amount <= balance`.",
          "Nếu hợp lệ: `balance -= amount` và in thông báo thành công."
        ],
        conceptIllustration: {
          type: "branching",
          title: "Kiểm Tra Giao Dịch ATM",
          description: "Số tiền chia hết cho 50k? -> Số tiền <= Số dư? -> Thành công & Cập nhật số dư.",
          visualData: {
            condition: "amount % 50000 == 0 and amount <= balance",
            ifTrue: "Giao dich thanh cong. So du con lai: ...",
            ifFalse: "Báo lỗi tương ứng"
          }
        },
        examples: [
          {
            title: "Ví dụ: Rút 200.000 từ số dư 500.000",
            explanation: "200k chia hết 50k và <= 500k -> Thành công, còn 300.000 VND.",
            code: "balance = 500000\namount = 200000\nif amount % 50000 != 0:\n    print('Loi: So tien rut phai la boi so cua 50.000 VND')\nelif amount > balance:\n    print('Loi: So du khong du')\nelse:\n    print(f'Giao dich thanh cong. So du con lai: {balance - amount} VND')",
            output: "Giao dich thanh cong. So du con lai: 300000 VND"
          }
        ],
        multipleChoice: {
          question: "Để kiểm tra số tiền `amount` có phải là bội số của 50.000 hay không, điều kiện nào đúng?",
          options: ["amount / 50000 == 0", "amount % 50000 == 0", "amount // 50000 == 0", "amount == 50000"],
          correctIndex: 1,
          explanation: "amount % 50000 == 0 kiểm tra phần dư bằng 0, nghĩa là chia hết cho 50.000."
        }
      },
      practice: {
        id: "t4-p4",
        title: "Bài 4: Mini ATM",
        difficulty: "Trung bình",
        problemStatement: "Viết chương trình mô phỏng giao dịch rút tiền tại cây ATM:\nNhập 2 số nguyên:\n- Dòng 1: Số dư hiện tại `balance` (VND)\n- Dòng 2: Số tiền muốn rút `amount` (VND)\n\nKiểm tra và in ra thông báo tương ứng:\n1. Nếu `amount % 50000 != 0`: in `Loi: So tien rut phai la boi so cua 50.000 VND`\n2. Nếu `amount > balance`: in `Loi: So du khong du`\n3. Nếu hợp lệ: in `Giao dich thanh cong. So du con lai: <balance - amount> VND`",
        inputFormat: "Gồm 2 dòng:\n- Dòng 1: balance (số nguyên >= 0)\n- Dòng 2: amount (số nguyên >= 0)",
        outputFormat: "Một dòng thông báo theo các trường hợp quy định.",
        constraints: "0 <= balance, amount <= 10^9.",
        sampleCases: [
          {
            input: "500000\n200000",
            output: "Giao dich thanh cong. So du con lai: 300000 VND",
            explanation: "Rút 200.000 hợp lệ, số dư còn lại 300.000 VND."
          },
          {
            input: "500000\n120000",
            output: "Loi: So tien rut phai la boi so cua 50.000 VND",
            explanation: "120.000 không chia hết cho 50.000."
          },
          {
            input: "200000\n300000",
            output: "Loi: So du khong du",
            explanation: "Số tiền rút vượt quá số dư."
          }
        ],
        starterCode: `# Nhập số dư balance và số tiền rút amount
balance = int(input())
amount = int(input())

# TODO: Kiểm tra điều kiện rút tiền và in thông báo
`,
        testCases: [
          {
            id: "t4-4-tc1",
            input: "500000\n200000",
            expectedOutput: "Giao dich thanh cong. So du con lai: 300000 VND",
            isHidden: false,
            explanation: "Kiểm tra rút hợp lệ."
          },
          {
            id: "t4-4-tc2",
            input: "500000\n120000",
            expectedOutput: "Loi: So tien rut phai la boi so cua 50.000 VND",
            isHidden: false,
            explanation: "Kiểm tra không chia hết 50k."
          },
          {
            id: "t4-4-tc3",
            input: "200000\n300000",
            expectedOutput: "Loi: So du khong du",
            isHidden: false,
            explanation: "Kiểm tra không đủ số dư."
          }
        ],
        hints: [
          "Ưu tiên kiểm tra `if amount % 50000 != 0:` trước.",
          "Tiếp theo kiểm tra `elif amount > balance:`",
          "Cuối cùng `else:` in giao dịch thành công."
        ],
        solutionExplanation: "balance = int(input())\namount = int(input())\nif amount % 50000 != 0:\n    print('Loi: So tien rut phai la boi so cua 50.000 VND')\nelif amount > balance:\n    print('Loi: So du khong du')\nelse:\n    print(f'Giao dich thanh cong. So du con lai: {balance - amount} VND')"
      }
    }
  ]
};
