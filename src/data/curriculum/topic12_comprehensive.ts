import { Module } from "../../types";

export const TOPIC_12_COMPREHENSIVE: Module = {
  id: "topic-12",
  title: "Chủ đề 12: Bài Tập Tổng Hợp",
  description: "Áp dụng tổng hợp kiến thức về biến, biểu thức, cấu trúc rẽ nhánh, vòng lặp, chuỗi và danh sách để giải quyết các bài toán quản lý dữ liệu thực tế.",
  iconName: "FileSpreadsheet",
  order: 12,
  color: "from-amber-600 to-rose-700",
  lessons: [
    {
      id: "t12-l1",
      moduleId: "topic-12",
      moduleTitle: "Chủ đề 12: Bài Tập Tổng Hợp",
      order: 1,
      title: "Bài 1: Quản Lý Bảng Điểm Học Sinh",
      description: "Quản lý bảng điểm n học sinh gồm 5 môn học, tính ĐTB, xếp loại học lực và in bảng tổng kết căn chỉnh đẹp mắt bằng f-string.",
      durationMin: 30,
      xpReward: 80,
      theory: {
        summary: "Quy trình xử lý bảng điểm tổng hợp:\n1. Nhập số lượng học sinh $n$.\n2. Với mỗi học sinh: Nhập họ tên và 5 điểm số (Toán, Văn, Anh, Lý, Hóa).\n3. Tính `dtb = sum(diem) / 5`.\n4. Xếp loại: Xuất sắc (>= 9.0), Giỏi (8.0 - <9.0), Khá (6.5 - <8.0), Trung bình (5.0 - <6.5), Yếu (< 5.0).",
        keyPoints: [
          "Xếp loại dựa trên thang điểm chuẩn.",
          "Căn lề hiển thị bằng f-string: `f\"{dtb:.2f}\"`."
        ],
        conceptIllustration: {
          type: "variables",
          title: "Quy Trình Xử Lý Điểm",
          description: "5 môn -> Tính ĐTB -> Xếp loại học lực -> In phiếu kết quả",
          visualData: {
            variables: [
              { name: "Toan, Van, Anh, Ly, Hoa", type: "float", value: "9.0, 8.5, 9.5, 9.0, 8.5" },
              { name: "DTB", type: "float", value: "8.90" },
              { name: "XepLoai", type: "str", value: "Gioi" }
            ]
          }
        },
        examples: [
          {
            title: "Ví dụ: 1 học sinh",
            explanation: "Nguyen An, điểm [9, 8, 9, 8, 9] -> DTB = 8.60 -> Gioi.",
            code: "# Nguyen An: DTB = 8.60 - Gioi",
            output: "Nguyen An | DTB: 8.60 | Xep loai: Gioi"
          }
        ],
        multipleChoice: {
          question: "Học sinh có điểm trung bình 8.75 sẽ được xếp loại học lực nào theo quy chuẩn?",
          options: ["Xuat sac", "Gioi", "Kha", "Trung binh"],
          correctIndex: 1,
          explanation: "Điểm từ 8.0 đến dưới 9.0 được xếp loại Giỏi."
        }
      },
      practice: {
        id: "t1-p12-1",
        title: "Bài 1: Quản Lý Bảng Điểm Học Sinh",
        difficulty: "Trung bình",
        problemStatement: "Viết chương trình quản lý bảng điểm cho $n$ học sinh ($1 \\le n \\le 50$).\n- Dòng 1: Số nguyên dương $n$.\n- Với mỗi học sinh gồm 2 dòng:\n  + Dòng thứ nhất: Họ và tên học sinh\n  + Dòng thứ hai: 5 số thực đại diện cho điểm 5 môn (Toán, Văn, Anh, Lý, Hóa) cách nhau bởi dấu cách.\n\nVới mỗi học sinh, tính điểm trung bình `DTB = (Toan + Van + Anh + Ly + Hoa) / 5` và xếp loại:\n- `DTB >= 9.0`: `Xuat sac`\n- `8.0 <= DTB < 9.0`: `Gioi`\n- `6.5 <= DTB < 8.0`: `Kha`\n- `5.0 <= DTB < 6.5`: `Trung binh`\n- `DTB < 5.0`: `Yeu`\n\nIn ra kết quả của từng học sinh trên 1 dòng theo mẫu:\n`<ho_ten> | DTB: <dtb:.2f> | Xep loai: <xep_loai>`",
        inputFormat: "Dòng 1 là n. Tiếp theo là n cặp dòng (Tên và 5 điểm).",
        outputFormat: "Gồm n dòng theo đúng mẫu định dạng.",
        constraints: "1 <= n <= 50; 0 <= diem <= 10.",
        sampleCases: [
          {
            input: "2\nNguyen Van An\n9.0 8.5 9.5 9.0 8.5\nTran Thi Mai\n7.0 6.5 8.0 7.5 6.0",
            output: "Nguyen Van An | DTB: 8.90 | Xep loai: Gioi\nTran Thi Mai | DTB: 7.00 | Xep loai: Kha",
            explanation: "An có ĐTB = 8.90 (Giỏi); Mai có ĐTB = 7.00 (Khá)."
          }
        ],
        starterCode: `# Nhập số lượng học sinh n
n = int(input())

# TODO: Đọc thông tin từng học sinh, tính DTB và in kết quả
`,
        testCases: [
          {
            id: "t12-1-tc1",
            input: "2\nNguyen Van An\n9.0 8.5 9.5 9.0 8.5\nTran Thi Mai\n7.0 6.5 8.0 7.5 6.0",
            expectedOutput: "Nguyen Van An | DTB: 8.90 | Xep loai: Gioi\nTran Thi Mai | DTB: 7.00 | Xep loai: Kha",
            isHidden: false,
            explanation: "Kiểm tra 2 học sinh."
          },
          {
            id: "t12-1-tc2",
            input: "1\nLe Hoang\n9.5 9.5 9.5 9.5 9.5",
            expectedOutput: "Le Hoang | DTB: 9.50 | Xep loai: Xuat sac",
            isHidden: false,
            explanation: "Kiểm tra Xuất sắc."
          }
        ],
        hints: [
          "Dùng vòng lặp `for _ in range(n):`",
          "`name = input()`",
          "`scores = list(map(float, input().split()))`",
          "`dtb = sum(scores) / 5`",
          "Phân loại bằng if-elif-else."
        ],
        solutionExplanation: "n = int(input())\nfor _ in range(n):\n    name = input()\n    scores = list(map(float, input().split()))\n    dtb = sum(scores) / 5\n    if dtb >= 9.0:\n        rank = 'Xuat sac'\n    elif dtb >= 8.0:\n        rank = 'Gioi'\n    elif dtb >= 6.5:\n        rank = 'Kha'\n    elif dtb >= 5.0:\n        rank = 'Trung binh'\n    else:\n        rank = 'Yeu'\n    print(f'{name} | DTB: {dtb:.2f} | Xep loai: {rank}')"
      }
    },
    {
      id: "t12-l2",
      moduleId: "topic-12",
      moduleTitle: "Chủ đề 12: Bài Tập Tổng Hợp",
      order: 2,
      title: "Bài 2: Quản Lý Tiết Kiệm & Lãi Kép",
      description: "Nhập vốn ban đầu, lãi suất và số năm gửi. Tính lãi kép từng năm, in bảng chi tiết và vẽ biểu đồ tăng trưởng bằng ký tự #.",
      durationMin: 25,
      xpReward: 70,
      theory: {
        summary: "Công thức lãi kép: Mỗi năm, tiền lãi sinh ra được cộng dồn vào tiền vốn đầu kỳ tiếp theo: `Lai = Vốn * (r / 100)`, `Vốn_mới = Vốn + Lai`.",
        keyPoints: [
          "Khởi tạo `current = P` (tiền vốn ban đầu).",
          "Lặp qua từng năm từ 1 đến `t`.",
          "Mỗi năm: `interest = current * (r / 100)`, `current += interest`.",
          "In bảng và số lượng ký tự `#` đại diện cho giá trị làm tròn."
        ],
        conceptIllustration: {
          type: "loops",
          title: "Mô Hình Lãi Kép",
          description: "Năm 1: 100tr -> lãi 10tr -> 110tr. Năm 2: 110tr -> lãi 11tr -> 121tr.",
          visualData: {
            loopType: "for year in range(1, t + 1)",
            iterations: [
              { index: 1, state: "Nam 1: Du 110,000,000 VND" },
              { index: 2, state: "Nam 2: Du 121,000,000 VND" }
            ]
          }
        },
        examples: [
          {
            title: "Ví dụ: 10 triệu, 10%/năm, 2 năm",
            explanation: "Năm 1: Lãi 1tr, Dư 11tr. Năm 2: Lãi 1.1tr, Dư 12.1tr.",
            code: "# Nam 1: 11.00tr\n# Nam 2: 12.10tr",
            output: "Nam 1 | Lai: 1.00 | Du: 11.00\nNam 2 | Lai: 1.10 | Du: 12.10"
          }
        ],
        multipleChoice: {
          question: "Đặc điểm cốt lõi của 'Lãi kép' so với 'Lãi đơn' là gì?",
          options: [
            "Lãi suất thay đổi mỗi tháng",
            "Tiền lãi hàng kỳ được cộng gộp vào vốn để tiếp tục sinh lãi cho kỳ sau",
            "Ngân hàng thu thêm phí",
            "Chỉ áp dụng cho các khoản vay"
          ],
          correctIndex: 1,
          explanation: "Lãi kép là tiền lãi được tái nhập gốc để tính lãi cho chu kỳ tiếp theo ('lãi mẹ đẻ lãi con')."
        }
      },
      practice: {
        id: "t1-p12-2",
        title: "Bài 2: Quản Lý Tiết Kiệm và Lãi Kép",
        difficulty: "Trung bình",
        problemStatement: "Viết chương trình tính toán quá trình tăng trưởng của một khoản tiền gửi tiết kiệm theo hình thức lãi kép:\n- Dòng 1: Số tiền vốn ban đầu `P` (số thực dương)\n- Dòng 2: Lãi suất năm `r` (% mỗi năm, số thực dương)\n- Dòng 3: Số năm gửi `t` (số nguyên dương $1 \\le t \\le 30$)\n\nVới mỗi năm từ năm 1 đến năm `t`:\n- `Lai = Von_dau_nam * (r / 100)`\n- `Du_cuoi_nam = Von_dau_nam + Lai`\n- `Von_dau_nam` của năm sau chính là `Du_cuoi_nam` của năm trước.\n\nIn ra kết quả của từng năm trên một dòng theo mẫu:\n`Nam <nam>: Lai = <lai:.2f>, Du = <du:.2f>`",
        inputFormat: "Gồm 3 dòng: P (tiền vốn), r (lãi suất %), t (số năm).",
        outputFormat: "Gồm t dòng theo đúng định dạng mẫu.",
        constraints: "P > 0; r > 0; 1 <= t <= 30.",
        sampleCases: [
          {
            input: "1000\n10\n2",
            output: "Nam 1: Lai = 100.00, Du = 1100.00\nNam 2: Lai = 110.00, Du = 1210.00",
            explanation: "Năm 1 lãi 100, dư 1100. Năm 2 lãi 110, dư 1210."
          }
        ],
        starterCode: `# Nhập P, r, t
P = float(input())
r = float(input())
t = int(input())

# TODO: Tính lãi kép qua từng năm và in kết quả
`,
        testCases: [
          {
            id: "t12-2-tc1",
            input: "1000\n10\n2",
            expectedOutput: "Nam 1: Lai = 100.00, Du = 1100.00\nNam 2: Lai = 110.00, Du = 1210.00",
            isHidden: false,
            explanation: "Kiểm tra 2 năm với 10%."
          },
          {
            id: "t12-2-tc2",
            input: "5000\n5\n3",
            expectedOutput: "Nam 1: Lai = 250.00, Du = 5250.00\nNam 2: Lai = 262.50, Du = 5512.50\nNam 3: Lai = 275.62, Du = 5788.12",
            isHidden: false,
            explanation: "Kiểm tra 3 năm với 5%."
          }
        ],
        hints: [
          "Khởi tạo `current = P`",
          "`for year in range(1, t + 1):`",
          "`lai = current * (r / 100)`",
          "`current += lai`",
          "`print(f'Nam {year}: Lai = {lai:.2f}, Du = {current:.2f}')`"
        ],
        solutionExplanation: "P = float(input())\nr = float(input())\nt = int(input())\ncurrent = P\nfor year in range(1, t + 1):\n    lai = current * (r / 100)\n    current += lai\n    print(f'Nam {year}: Lai = {lai:.2f}, Du = {current:.2f}')"
      }
    }
  ]
};
