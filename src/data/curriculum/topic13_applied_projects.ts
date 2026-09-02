import { Module } from "../../types";

export const TOPIC_13_APPLIED_PROJECTS: Module = {
  id: "topic-13",
  title: "Chủ đề 13: Dự Án Phân Tích & Ứng Dụng Thực Tế",
  description: "Các dự án lập trình mini mô phỏng các bài toán thực tế: Hóa đơn bán hàng thông minh, Hệ thống xác thực dữ liệu an toàn, Công cụ phân tích thống kê số liệu và Hệ thống quản lý học sinh.",
  iconName: "Briefcase",
  order: 13,
  color: "from-emerald-600 to-teal-800",
  lessons: [
    {
      id: "t13-l1",
      moduleId: "topic-13",
      moduleTitle: "Chủ đề 13: Dự Án Phân Tích",
      order: 1,
      title: "Bài 1: Hóa Đơn Bán Hàng Thông Minh",
      description: "Nhập n mặt hàng gồm tên, số lượng, đơn giá. Áp dụng chính sách giảm giá (giảm 10% nếu tổng hóa đơn >= 500k, giảm 5% nếu >= 200k) và in hóa đơn chi tiết.",
      durationMin: 25,
      xpReward: 70,
      theory: {
        summary: "Chương trình tính hóa đơn bán lẻ tính tổng tiền các món đồ, áp dụng bậc chiết khấu phần trăm (discount rate) và tính số tiền thực thanh toán.",
        keyPoints: [
          "Tổng tiền gốc: $T = \\sum (SL_i \\times DG_i)$.",
          "Nếu $T \\ge 500000$: Giảm 10%. Nếu $200000 \\le T < 500000$: Giảm 5%. Ngược lại giảm 0%.",
          "Số tiền thanh toán: $ThanhToan = T - GiamGia$."
        ],
        conceptIllustration: {
          type: "variables",
          title: "Quy Trình Tính Hóa Đơn",
          description: "Mặt hàng -> Thành tiền -> Tổng gốc -> Chiết khấu -> Tiền thanh toán",
          visualData: {
            variables: [
              { name: "TongGoc", type: "float", value: "600000" },
              { name: "GiamGia", type: "float", value: "60000 (10%)" },
              { name: "ThanhToan", type: "float", value: "540000" }
            ]
          }
        },
        examples: [
          {
            title: "Ví dụ: Hóa đơn 600,000",
            explanation: ">= 500,000 -> Giảm 10% (60,000) -> Còn 540,000.",
            code: "# Tong: 600000\n# Giam: 60000\n# Thanh toan: 540000",
            output: "Tong: 600000\nGiam: 60000\nThanh toan: 540000"
          }
        ],
        multipleChoice: {
          question: "Hóa đơn có tổng tiền gốc là 300,000 VND (thuộc mức giảm 5%), số tiền được giảm là bao nhiêu?",
          options: ["10,000 VND", "15,000 VND", "30,000 VND", "0 VND"],
          correctIndex: 1,
          explanation: "300,000 * 5% = 15,000 VND."
        }
      },
      practice: {
        id: "t1-p13-1",
        title: "Bài 1: Hóa Đơn Thông Minh",
        difficulty: "Trung bình",
        problemStatement: "Viết chương trình tính hóa đơn bán hàng cho một cửa hàng:\n- Dòng 1: Số lượng mặt hàng $k$ ($1 \\le k \\le 50$).\n- $k$ dòng tiếp theo, mỗi dòng gồm: `<ten_san_pham> <so_luong> <don_gia>` (tên không chứa dấu cách, số lượng là số nguyên, đơn giá là số thực).\n\nChính sách khuyến mãi dựa trên Tổng tiền gốc $T$:\n- $T \\ge 500000$: Giảm $10\\%$\n- $200000 \\le T < 500000$: Giảm $5\\%$\n- $T < 200000$: Không giảm ($0\\%$)\n\nIn ra 3 dòng:\n- `Tong tien goc: <T:.0f>`\n- `Giam gia: <giam:.0f>`\n- `Thanh toan: <thanh_toan:.0f>`",
        inputFormat: "Dòng 1: Số nguyên k. k dòng tiếp theo: ten sl gia.",
        outputFormat: "Gồm 3 dòng theo mẫu định dạng số nguyên không có phần thập phân.",
        constraints: "1 <= k <= 50; sl > 0; gia > 0.",
        sampleCases: [
          {
            input: "2\nVo_Viet 10 15000\nBut_Bi 20 5000",
            output: "Tong tien goc: 250000\nGiam gia: 12500\nThanh toan: 237500",
            explanation: "Tổng gốc = 150k + 100k = 250k. Giảm 5% = 12.5k. Thanh toán = 237.5k."
          }
        ],
        starterCode: `# Nhập k mặt hàng
k = int(input())

# TODO: Tính tổng tiền gốc, giảm giá và thành tiền
`,
        testCases: [
          {
            id: "t13-1-tc1",
            input: "2\nVo_Viet 10 15000\nBut_Bi 20 5000",
            expectedOutput: "Tong tien goc: 250000\nGiam gia: 12500\nThanh toan: 237500",
            isHidden: false,
            explanation: "Kiểm tra mức giảm 5%."
          },
          {
            id: "t13-1-tc2",
            input: "1\nCap_Sach 2 300000",
            expectedOutput: "Tong tien goc: 600000\nGiam gia: 60000\nThanh toan: 540000",
            isHidden: false,
            explanation: "Kiểm tra mức giảm 10%."
          }
        ],
        hints: [
          "Duyệt `for _ in range(k):`",
          "`name, qty, price = input().split()`",
          "`total += int(qty) * float(price)`",
          "Kiểm tra if-elif-else để tính tiền giảm."
        ],
        solutionExplanation: "k = int(input())\ntotal = 0\nfor _ in range(k):\n    parts = input().split()\n    qty = int(parts[1])\n    price = float(parts[2])\n    total += qty * price\n\nif total >= 500000:\n    discount = total * 0.10\nelif total >= 200000:\n    discount = total * 0.05\nelse:\n    discount = 0.0\n\npay = total - discount\nprint(f'Tong tien goc: {total:.0f}')\nprint(f'Giam gia: {discount:.0f}')\nprint(f'Thanh toan: {pay:.0f}')"
      }
    },
    {
      id: "t13-l2",
      moduleId: "topic-13",
      moduleTitle: "Chủ đề 13: Dự Án Phân Tích",
      order: 2,
      title: "Bài 2: Hệ Thống Kiểm Tra Dữ Liệu An Toàn",
      description: "Xây dựng hàm xử lý nhập liệu an toàn dùng while và try/except để nhận danh sách n số thực hợp lệ.",
      durationMin: 20,
      xpReward: 60,
      theory: {
        summary: "Kỹ thuật phòng thủ dữ liệu đầu vào: Liên tục đọc từng dòng, nếu ép kiểu `float(line)` thành công thì bổ sung vào danh sách cho đến khi đủ $N$ số hợp lệ.",
        keyPoints: [
          "Bắt lỗi `ValueError` để loại bỏ các dòng chứa chuỗi không phải số.",
          "Khi đủ $N$ phần tử, tính trung bình cộng của danh sách."
        ],
        conceptIllustration: {
          type: "syntax",
          title: "Xác Thực Nhập Liệu An Toàn",
          description: "Nhập: ['10', 'abc', '20.5', 'error', '30'] -> Thu được [10.0, 20.5, 30.0]",
          visualData: {
            codeSnippet: "valid = []\nwhile len(valid) < n:\n    try:\n        valid.append(float(input()))\n    except ValueError:\n        pass",
            outputPreview: "[10.0, 20.5, 30.0]",
            explanation: "Lọc bỏ toàn bộ chuỗi rác."
          }
        },
        examples: [
          {
            title: "Ví dụ: Cần 2 số hợp lệ",
            explanation: "Nhập 'xyz', 4, 'err', 6 -> Thu được [4.0, 6.0], TBC = 5.00.",
            code: "# Valid: [4.0, 6.0] -> TBC = 5.00",
            output: "TBC: 5.00"
          }
        ],
        multipleChoice: {
          question: "Lệnh nào dùng để bỏ qua vòng lặp hiện tại và chuyển sang lần lặp tiếp theo khi bắt được lỗi?",
          options: ["break", "continue", "pass", "exit"],
          correctIndex: 1,
          explanation: "continue bỏ qua phần còn lại của thân vòng lặp hiện tại và bắt đầu lần lặp kế tiếp."
        }
      },
      practice: {
        id: "t1-p13-2",
        title: "Bài 2: Hệ Thống Kiểm Tra Dữ Liệu",
        difficulty: "Trung bình",
        problemStatement: "Viết chương trình đọc một số nguyên dương $n$ ở dòng đầu tiên (số lượng số thực hợp lệ cần thu thập). Tiếp theo, liên tục đọc các dòng đầu vào và dùng `try / except ValueError` để lọc ra đúng $n$ số thực hợp lệ.\n\nSau khi đã thu thập đủ $n$ số thực, hãy tính và in ra:\n- Dòng 1: `Danh sach: <danh_sach_so_thuc_lam_tron_2_chu_so>` (dạng list Python, ví dụ `[1.5, 2.0]`)\n- Dòng 2: `Trung binh cong: <tbc:.2f>`",
        inputFormat: "Dòng 1: n. Các dòng tiếp theo là dữ liệu nhập thử.",
        outputFormat: "Gồm 2 dòng theo đúng mẫu.",
        constraints: "1 <= n <= 100.",
        sampleCases: [
          {
            input: "3\n10.5\nabc\n20\nerror\n15.5",
            output: "Danh sach: [10.5, 20.0, 15.5]\nTrung binh cong: 15.33",
            explanation: "Thu thập đủ 3 số: 10.5, 20.0, 15.5. TBC = (10.5 + 20 + 15.5) / 3 = 15.33."
          }
        ],
        starterCode: `# Nhập n
n = int(input())

# TODO: Thu thập đủ n số thực hợp lệ và in TBC
`,
        testCases: [
          {
            id: "t13-2-tc1",
            input: "3\n10.5\nabc\n20\nerror\n15.5",
            expectedOutput: "Danh sach: [10.5, 20.0, 15.5]\nTrung binh cong: 15.33",
            isHidden: false,
            explanation: "Kiểm tra với 3 số."
          },
          {
            id: "t13-2-tc2",
            input: "2\n5\n7",
            expectedOutput: "Danh sach: [5.0, 7.0]\nTrung binh cong: 6.00",
            isHidden: false,
            explanation: "Kiểm tra 2 số."
          }
        ],
        hints: [
          "`numbers = []`",
          "`while len(numbers) < n:`",
          "`try: val = float(input()); numbers.append(val)`",
          "`except ValueError: pass`",
          "`print(f'Danh sach: {numbers}')`",
          "`print(f'Trung binh cong: {sum(numbers)/n:.2f}')`"
        ],
        solutionExplanation: "n = int(input())\nnumbers = []\nwhile len(numbers) < n:\n    try:\n        line = input()\n        val = float(line)\n        numbers.append(val)\n    except ValueError:\n        continue\nprint(f'Danh sach: {numbers}')\nprint(f'Trung binh cong: {sum(numbers)/n:.2f}')"
      }
    },
    {
      id: "t13-l3",
      moduleId: "topic-13",
      moduleTitle: "Chủ đề 13: Dự Án Phân Tích",
      order: 3,
      title: "Bài 3: Phân Tích Thống Kê Danh Sách Số",
      description: "Nhập danh sách số nguyên và thực hiện phân tích toàn diện: Max, Min, Tổng, Đếm chẵn lẻ, Sắp xếp nổi bọt tăng dần và tìm kiếm phần tử x.",
      durationMin: 30,
      xpReward: 80,
      theory: {
        summary: "Phân tích thống kê dữ liệu bao gồm các chỉ số cơ bản (Min, Max, Sum, Count) và các giải thuật xử lý (Sorting, Searching).",
        keyPoints: [
          "Tìm kiếm tuyến tính: `x in a` hoặc tìm vị trí chỉ số `a.index(x)`.",
          "Sắp xếp Bubble Sort tăng dần.",
          "Đếm số lượng chẵn và lẻ."
        ],
        conceptIllustration: {
          type: "arrays",
          title: "Quy Trình Phân Tích Dữ Liệu",
          description: "Mảng ban đầu -> Thống kê Min/Max/Tổng -> Đếm chẵn/lẻ -> Sắp xếp -> Tìm kiếm",
          visualData: {
            array: [5, 2, 8, 1, 9],
            pointers: [
              { index: 3, label: "Min=1" },
              { index: 4, label: "Max=9" }
            ]
          }
        },
        examples: [
          {
            title: "Ví dụ: [5, 2, 8, 1, 9], tìm 8",
            explanation: "Max=9, Min=1, Tong=25, Chan=2, Le=3, Sap xep=1 2 5 8 9, Tim 8: Co.",
            code: "# Output 6 dòng thống kê",
            output: "Max: 9\nMin: 1\nTong: 25\nChan: 2, Le: 3\nSap xep: 1 2 5 8 9\nTim 8: Co"
          }
        ],
        multipleChoice: {
          question: "Phương thức nào kiểm tra một phần tử `x` có nằm trong danh sách `a` hay không?",
          options: ["a.has(x)", "x in a", "a.contains(x)", "x == a"],
          correctIndex: 1,
          explanation: "Toán tử `in` trong Python (`x in a`) trả về True nếu x có trong danh sách a."
        }
      },
      practice: {
        id: "t1-p13-3",
        title: "Bài 3: Phân Tích Danh Sách Số",
        difficulty: "Nâng cao",
        problemStatement: "Viết chương trình phân tích một tập dữ liệu số nguyên:\n- Dòng 1: Danh sách các số nguyên cách nhau bởi dấu cách.\n- Dòng 2: Số nguyên $x$ cần tìm kiếm.\n\nHãy in ra 6 dòng thống kê chi tiết:\n1. `Max: <max_val>`\n2. `Min: <min_val>`\n3. `Tong: <sum_val>`\n4. `Chan: <so_luong_chan>, Le: <so_luong_le>`\n5. `Sap xep: <day_tang_dan_cach_nhau_boi_dau_cach>` (dùng Bubble Sort)\n6. `Tim <x>: Co` (nếu $x$ có trong danh sách) hoặc `Tim <x>: Khong` (nếu không có)",
        inputFormat: "Dòng 1: Danh sách số nguyên. Dòng 2: Số nguyên x.",
        outputFormat: "Gồm 6 dòng theo đúng mẫu định dạng.",
        constraints: "1 <= len(a) <= 500.",
        sampleCases: [
          {
            input: "5 2 8 1 9\n8",
            output: "Max: 9\nMin: 1\nTong: 25\nChan: 2, Le: 3\nSap xep: 1 2 5 8 9\nTim 8: Co",
            explanation: "Max=9, Min=1, Tổng=25, 2 số chẵn (2,8), 3 số lẻ (5,1,9), sắp xếp tăng dần, số 8 có trong mảng."
          }
        ],
        starterCode: `# Nhập danh sách và số x
a = list(map(int, input().split()))
x = int(input())

# TODO: Thực hiện 6 thống kê theo yêu cầu
`,
        testCases: [
          {
            id: "t13-3-tc1",
            input: "5 2 8 1 9\n8",
            expectedOutput: "Max: 9\nMin: 1\nTong: 25\nChan: 2, Le: 3\nSap xep: 1 2 5 8 9\nTim 8: Co",
            isHidden: false,
            explanation: "Kiểm tra mẫu 1."
          },
          {
            id: "t13-3-tc2",
            input: "10 20 30\n15",
            expectedOutput: "Max: 30\nMin: 10\nTong: 60\nChan: 3, Le: 0\nSap xep: 10 20 30\nTim 15: Khong",
            isHidden: false,
            explanation: "Kiểm tra số không có trong danh sách."
          }
        ],
        hints: [
          "Dùng Bubble sort để sắp xếp mảng `sorted_a`",
          "`evens = sum(1 for v in a if v % 2 == 0)`",
          "`found = 'Co' if x in a else 'Khong'`"
        ],
        solutionExplanation: "a = list(map(int, input().split()))\nx = int(input())\n\nprint(f'Max: {max(a)}')\nprint(f'Min: {min(a)}')\nprint(f'Tong: {sum(a)}')\nchan = sum(1 for v in a if v % 2 == 0)\nle = len(a) - chan\nprint(f'Chan: {chan}, Le: {le}')\n\nsorted_a = a.copy()\nn = len(sorted_a)\nfor i in range(n):\n    for j in range(0, n - i - 1):\n        if sorted_a[j] > sorted_a[j + 1]:\n            sorted_a[j], sorted_a[j + 1] = sorted_a[j + 1], sorted_a[j]\nprint('Sap xep:', *sorted_a)\nprint(f'Tim {x}:', 'Co' if x in a else 'Khong')"
      }
    },
    {
      id: "t13-l4",
      moduleId: "topic-13",
      moduleTitle: "Chủ đề 13: Dự Án Phân Tích",
      order: 4,
      title: "Bài 4: Hệ Thống Quản Lý Học Sinh Hoàn Chỉnh",
      description: "Ứng dụng hoàn chỉnh tích hợp: chuẩn hóa họ tên, tính điểm trung bình, xếp loại học lực, tìm học sinh có ĐTB cao nhất và đếm số lượng theo từng loại.",
      durationMin: 35,
      xpReward: 100,
      theory: {
        summary: "Dự án tổng hợp đỉnh cao: Kết hợp xử lý chuỗi (chuẩn hóa tên), danh sách, cấu trúc rẽ nhánh xếp loại và tìm kiếm học sinh thủ khoa (Max ĐTB).",
        keyPoints: [
          "Hàm `chuan_hoa(name)`: xóa khoảng trắng thừa, viết hoa đầu từ.",
          "Hàm `tinh_dtb(toan, van, anh)`: tính trung bình làm tròn 2 chữ số.",
          "Xếp loại: Gioi (>= 8.0), Kha (6.5 - <8.0), Trung binh (5.0 - <6.5), Yeu (< 5.0).",
          "Thủ khoa: Học sinh có ĐTB cao nhất lớp."
        ],
        conceptIllustration: {
          type: "variables",
          title: "Hệ Thống Quản Lý Học Sinh",
          description: "Quản lý danh sách học sinh -> Chuẩn hóa họ tên -> Tính ĐTB -> Xếp loại -> Vinh danh thủ khoa",
          visualData: {
            variables: [
              { name: "TongSoHS", type: "int", value: "3" },
              { name: "ThuKhoa", type: "str", value: "Nguyen Van An (9.17)" }
            ]
          }
        },
        examples: [
          {
            title: "Ví dụ: 2 học sinh",
            explanation: "An (9.0), Binh (7.0) -> Thủ khoa: Nguyen Van An (9.00).",
            code: "# Thu khoa: Nguyen Van An (9.00)",
            output: "Thu khoa: Nguyen Van An (9.00)"
          }
        ],
        multipleChoice: {
          question: "Trong bài toán tìm thủ khoa của lớp, nếu có nhiều học sinh cùng đạt điểm cao nhất bằng nhau, chương trình thường chọn ai?",
          options: [
            "Học sinh xuất hiện đầu tiên trong danh sách",
            "Học sinh có tên dài nhất",
            "Ngẫu nhiên một học sinh",
            "Không thể xác định"
          ],
          correctIndex: 0,
          explanation: "Khi dùng phép so sánh `>` (thay vì `>=`), học sinh đầu tiên đạt điểm cao nhất sẽ được giữ lại."
        }
      },
      practice: {
        id: "t1-p13-4",
        title: "Bài 4: Quản Lý Học Sinh Hoàn Chỉnh",
        difficulty: "Nâng cao",
        problemStatement: "Viết chương trình hoàn chỉnh quản lý danh sách học sinh:\n- Dòng 1: Số nguyên dương $n$ ($1 \\le n \\le 100$) là số lượng học sinh.\n- Tiếp theo là $n$ cặp dòng:\n  + Dòng 1: Họ tên (chưa chuẩn hóa, có thể có khoảng trắng thừa)\n  + Dòng 2: 3 điểm số Toán, Văn, Anh (số thực cách nhau bởi dấu cách)\n\nChương trình cần thực hiện:\n1. Chuẩn hóa họ tên từng học sinh (viết hoa chữ cái đầu mỗi từ, xóa khoảng trắng thừa).\n2. Tính điểm trung bình `DTB = (Toan + Van + Anh) / 3`.\n3. Xếp loại: `Gioi` (>= 8.0), `Kha` (6.5 - <8.0), `Trung binh` (5.0 - <6.5), `Yeu` (< 5.0).\n4. In danh sách kết quả từng học sinh: `<ho_ten_chuan> | DTB: <dtb:.2f> | <xep_loai>`\n5. Dòng cuối cùng: In học sinh thủ khoa (học sinh có ĐTB cao nhất đầu tiên): `Thu khoa: <ho_ten_chuan> (<dtb_max:.2f>)`",
        inputFormat: "Dòng 1: n. Tiếp theo là n cặp dòng (Họ tên và 3 điểm).",
        outputFormat: "Gồm n dòng kết quả học sinh, tiếp theo là 1 dòng thủ khoa.",
        constraints: "1 <= n <= 100; 0 <= diem <= 10.",
        sampleCases: [
          {
            input: "2\n  nguyen   vAn   aN  \n9.0 9.5 9.0\nle   thi   bAO\n7.0 6.5 8.0",
            output: "Nguyen Van An | DTB: 9.17 | Gioi\nLe Thi Bao | DTB: 7.17 | Kha\nThu khoa: Nguyen Van An (9.17)",
            explanation: "Nguyen Van An có ĐTB = 9.17 là Thủ khoa."
          }
        ],
        starterCode: `# Nhập số lượng học sinh n
n = int(input())

# TODO: Xử lý danh sách học sinh và in thủ khoa
`,
        testCases: [
          {
            id: "t13-4-tc1",
            input: "2\n  nguyen   vAn   aN  \n9.0 9.5 9.0\nle   thi   bAO\n7.0 6.5 8.0",
            expectedOutput: "Nguyen Van An | DTB: 9.17 | Gioi\nLe Thi Bao | DTB: 7.17 | Kha\nThu khoa: Nguyen Van An (9.17)",
            isHidden: false,
            explanation: "Kiểm tra 2 học sinh."
          },
          {
            id: "t13-4-tc2",
            input: "1\nTRAN   VAN   LONG\n10 10 10",
            expectedOutput: "Tran Van Long | DTB: 10.00 | Gioi\nThu khoa: Tran Van Long (10.00)",
            isHidden: false,
            explanation: "Kiểm tra 1 học sinh điểm 10."
          }
        ],
        hints: [
          "Hàm chuẩn hóa: `' '.join(w.capitalize() for w in name.split())`",
          "Lưu trữ danh sách `students = []`",
          "Theo dõi `best_student = None` và `max_dtb = -1`",
          "In từng học sinh rồi in dòng thủ khoa ở cuối."
        ],
        solutionExplanation: "n = int(input())\nstudents = []\nbest_name = ''\nmax_dtb = -1.0\n\nfor _ in range(n):\n    raw_name = input()\n    name = ' '.join(w.capitalize() for w in raw_name.split())\n    scores = list(map(float, input().split()))\n    dtb = sum(scores) / 3.0\n    \n    if dtb >= 8.0:\n        rank = 'Gioi'\n    elif dtb >= 6.5:\n        rank = 'Kha'\n    elif dtb >= 5.0:\n        rank = 'Trung binh'\n    else:\n        rank = 'Yeu'\n        \n    students.append((name, dtb, rank))\n    if dtb > max_dtb:\n        max_dtb = dtb\n        best_name = name\n\nfor name, dtb, rank in students:\n    print(f'{name} | DTB: {dtb:.2f} | {rank}')\nprint(f'Thu khoa: {best_name} ({max_dtb:.2f})')"
      }
    }
  ]
};
