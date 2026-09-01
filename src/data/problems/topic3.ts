import { AlgorithmProblem } from "../../types";

export const TOPIC_3_PROBLEMS: AlgorithmProblem[] = [
  {
    id: "cd3-bai-1",
    title: "Bài 1. Lời Chào Người Dùng",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 3: Nhập, Xuất dữ liệu",
    difficulty: "Dễ",
    tags: ["input()", "print()", "Chuỗi"],
    points: 15,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 3: Nhập, Xuất dữ liệu",
    problemStatement: `Viết chương trình yêu cầu người dùng nhập tên (chuỗi ký tự), sau đó in ra lời chào:
"Xin chào, <tên>!" (chú ý có dấu phẩy và dấu chấm than ở cuối).`,
    inputFormat: "Một dòng chứa chuỗi tên (ví dụ: 'An').",
    outputFormat: "In ra lời chào: Xin chào, <tên>!",
    constraints: "Độ dài tên <= 100",
    sampleCases: [
      {
        input: "An",
        output: "Xin chào, An!",
        explanation: "In ra 'Xin chào, An!'."
      },
      {
        input: "Nguyen Van Binh",
        output: "Xin chào, Nguyen Van Binh!",
        explanation: "In ra 'Xin chào, Nguyen Van Binh!'."
      }
    ],
    starterCode: `ten = input()
print(f"Xin chào, {ten}!")
`,
    hints: [
      "Dùng input() để nhận tên.",
      "Dùng f-string: print(f'Xin chào, {ten}!')"
    ],
    solutionExplanation: `Sử dụng input() và f-string hoặc phép nối chuỗi để tạo câu chào.`,
    testCases: [
      { id: "cd3-b1-t1", input: "An", expectedOutput: "Xin chào, An!", isHidden: false },
      { id: "cd3-b1-t2", input: "Nguyen Van Binh", expectedOutput: "Xin chào, Nguyen Van Binh!", isHidden: false },
      { id: "cd3-b1-t3", input: "Python Pro", expectedOutput: "Xin chào, Python Pro!", isHidden: true }
    ]
  },
  {
    id: "cd3-bai-2",
    title: "Bài 2. Nhập 2 Số Nguyên Trên Cùng 1 Dòng (split())",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 3: Nhập, Xuất dữ liệu",
    difficulty: "Dễ",
    tags: ["split()", "map()", "Nhập nhiều số"],
    points: 20,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 3: Nhập, Xuất dữ liệu",
    problemStatement: `Viết chương trình nhập vào 2 số nguyên a và b trên cùng một dòng, cách nhau bởi một dấu cách (sử dụng input().split() hoặc map(int, input().split())).
Tính và in ra tổng của hai số đó.`,
    inputFormat: "Một dòng chứa 2 số nguyên a và b cách nhau bởi dấu cách.",
    outputFormat: "Một số nguyên duy nhất là tổng a + b.",
    constraints: "-10^9 <= a, b <= 10^9",
    sampleCases: [
      {
        input: "12 18",
        output: "30",
        explanation: "12 + 18 = 30."
      },
      {
        input: "-5 15",
        output: "10",
        explanation: "-5 + 15 = 10."
      }
    ],
    starterCode: `a, b = map(int, input().split())
print(a + b)
`,
    hints: [
      "Cú pháp map(int, input().split()) giúp bóc tách và ép kiểu nhiều số trên 1 dòng."
    ],
    solutionExplanation: `input().split() tách chuỗi theo khoảng trắng, map(int, ...) chuyển từng phần tử về số nguyên.`,
    testCases: [
      { id: "cd3-b2-t1", input: "12 18", expectedOutput: "30", isHidden: false },
      { id: "cd3-b2-t2", input: "-5 15", expectedOutput: "10", isHidden: false },
      { id: "cd3-b2-t3", input: "1000000 2000000", expectedOutput: "3000000", isHidden: true }
    ]
  },
  {
    id: "cd3-bai-3",
    title: "Bài 3. Định Dạng f-string Thông Tin Học Sinh",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 3: Nhập, Xuất dữ liệu",
    difficulty: "Dễ",
    tags: ["f-string", "Định dạng xuất", "print()"],
    points: 20,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 3: Nhập, Xuất dữ liệu",
    problemStatement: `Viết chương trình nhập vào thông tin một học sinh gồm:
- Dòng 1: Tên học sinh (str)
- Dòng 2: Tuổi (int)
- Dòng 3: Điểm trung bình (float)

Sử dụng f-string để in ra dòng thông báo theo định dạng chuẩn:
"Học sinh: <Tên> | Tuổi: <Tuổi> | ĐTB: <Điểm làm tròn 1 chữ số thập phân>"`,
    inputFormat: "Gồm 3 dòng: Tên, Tuổi, Điểm trung bình.",
    outputFormat: "Một dòng theo mẫu: Học sinh: <Tên> | Tuổi: <Tuổi> | ĐTB: <ĐTB:.1f>",
    constraints: "1 <= Tuổi <= 20, 0.0 <= ĐTB <= 10.0",
    sampleCases: [
      {
        input: "Tran Nam\n13\n8.75",
        output: "Học sinh: Tran Nam | Tuổi: 13 | ĐTB: 8.8",
        explanation: "8.75 làm tròn 1 chữ số là 8.8."
      },
      {
        input: "Le Mai\n11\n9.0",
        output: "Học sinh: Le Mai | Tuổi: 11 | ĐTB: 9.0",
        explanation: "ĐTB hiển thị 9.0."
      }
    ],
    starterCode: `ten = input()
tuoi = int(input())
dtb = float(input())

print(f"Học sinh: {ten} | Tuổi: {tuoi} | ĐTB: {dtb:.1f}")
`,
    hints: [
      "Dùng cú pháp f'Học sinh: {ten} | Tuổi: {tuoi} | ĐTB: {dtb:.1f}'"
    ],
    solutionExplanation: `f-string là cách định dạng chuỗi hiện đại, trực quan và mạnh mẽ nhất trong Python.`,
    testCases: [
      { id: "cd3-b3-t1", input: "Tran Nam\n13\n8.75", expectedOutput: "Học sinh: Tran Nam | Tuổi: 13 | ĐTB: 8.8", isHidden: false },
      { id: "cd3-b3-t2", input: "Le Mai\n11\n9.0", expectedOutput: "Học sinh: Le Mai | Tuổi: 11 | ĐTB: 9.0", isHidden: false },
      { id: "cd3-b3-t3", input: "Hoang Bao\n15\n7.44", expectedOutput: "Học sinh: Hoang Bao | Tuổi: 15 | ĐTB: 7.4", isHidden: true }
    ]
  },
  {
    id: "cd3-bai-4",
    title: "Bài 4. Tổng & Số Lượng Phần Tử Trong Dãy Số",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 3: Nhập, Xuất dữ liệu",
    difficulty: "Dễ",
    tags: ["split()", "sum()", "len()", "Danh sách"],
    points: 25,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 3: Nhập, Xuất dữ liệu",
    problemStatement: `Viết chương trình nhập vào một dãy các số nguyên cách nhau bởi dấu cách trên một dòng.
In ra:
- Dòng 1: Tổng của tất cả các số trong dãy
- Dòng 2: Số lượng phần tử của dãy`,
    inputFormat: "Một dòng chứa dãy số nguyên cách nhau bởi khoảng trắng.",
    outputFormat: "Gồm 2 dòng: Dòng 1 là Tổng, Dòng 2 là Số lượng phần tử.",
    constraints: "Dãy có từ 1 đến 1000 phần tử, mỗi phần tử từ -10^6 đến 10^6.",
    sampleCases: [
      {
        input: "3 7 2 9 1",
        output: "22\n5",
        explanation: "Tổng = 3+7+2+9+1 = 22. Số lượng phần tử = 5."
      },
      {
        input: "10 20 30",
        output: "60\n3",
        explanation: "Tổng = 60, Số lượng = 3."
      }
    ],
    starterCode: `numbers = list(map(int, input().split()))

tong = sum(numbers)
so_luong = len(numbers)

print(tong)
print(so_luong)
`,
    hints: [
      "Dùng `numbers = list(map(int, input().split()))` để đọc toàn bộ dãy số.",
      "Dùng hàm sum(numbers) để tính tổng và len(numbers) để lấy số lượng."
    ],
    solutionExplanation: `Hàm sum() tính tổng danh sách và len() trả về kích thước danh sách.`,
    testCases: [
      { id: "cd3-b4-t1", input: "3 7 2 9 1", expectedOutput: "22\n5", isHidden: false },
      { id: "cd3-b4-t2", input: "10 20 30", expectedOutput: "60\n3", isHidden: false },
      { id: "cd3-b4-t3", input: "100", expectedOutput: "100\n1", isHidden: true }
    ]
  },
  {
    id: "cd3-bai-5",
    title: "Bài 5. Tham Số sep và end Trong Hàm print()",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 3: Nhập, Xuất dữ liệu",
    difficulty: "Dễ",
    tags: ["print()", "sep", "end"],
    points: 20,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 3: Nhập, Xuất dữ liệu",
    problemStatement: `Sử dụng hàm print() với tham số sep và end:
Viết chương trình nhập vào 3 số nguyên a, b, c (trên 3 dòng), sau đó in ra 3 số đó cách nhau bởi dấu " - " (có khoảng trắng hai bên) và không xuống dòng ở cuối.`,
    inputFormat: "Gồm 3 dòng chứa 3 số nguyên a, b, c.",
    outputFormat: "In ra: '<a> - <b> - <c>' (không có ký tự xuống dòng thừa ở cuối).",
    constraints: "-1000 <= a, b, c <= 1000",
    sampleCases: [
      {
        input: "1\n2\n3",
        output: "1 - 2 - 3",
        explanation: "Ba số 1, 2, 3 nối với nhau bởi ' - '."
      },
      {
        input: "10\n20\n30",
        output: "10 - 20 - 30",
        explanation: "Kết quả là '10 - 20 - 30'."
      }
    ],
    starterCode: `a = int(input())
b = int(input())
c = int(input())

print(a, b, c, sep=" - ", end="")
`,
    hints: [
      "Hàm print(a, b, c, sep=' - ', end='') định nghĩa ký tự phân cách giữa các đối số và ký tự kết thúc."
    ],
    solutionExplanation: `Tham số sep điều khiển phân cách giữa các tham số, end điều khiển ký tự kết thúc dòng.`,
    testCases: [
      { id: "cd3-b5-t1", input: "1\n2\n3", expectedOutput: "1 - 2 - 3", isHidden: false },
      { id: "cd3-b5-t2", input: "10\n20\n30", expectedOutput: "10 - 20 - 30", isHidden: false },
      { id: "cd3-b5-t3", input: "5\n5\n5", expectedOutput: "5 - 5 - 5", isHidden: true }
    ]
  },
  {
    id: "cd3-bai-6",
    title: "Bài 6. Chuẩn Hóa Viết Hoa Họ Tên (title())",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 3: Nhập, Xuất dữ liệu",
    difficulty: "Dễ",
    tags: ["title()", "Chuỗi", "Xử lý văn bản"],
    points: 20,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 3: Nhập, Xuất dữ liệu",
    problemStatement: `Viết chương trình nhập vào Họ và Tên trên hai dòng riêng biệt.
Nối lại thành họ tên đầy đủ (cách nhau 1 dấu cách), chuyển chữ cái đầu của mỗi từ thành chữ hoa (dùng hàm title()) và in ra kết quả.`,
    inputFormat: "Gồm 2 dòng:\n- Dòng 1: Họ (ví dụ: 'nguyen van')\n- Dòng 2: Tên (ví dụ: 'an')",
    outputFormat: "In ra họ tên đầy đủ được viết hoa chữ cái đầu: 'Nguyen Van An'.",
    constraints: "Chuỗi ký tự chữ cái",
    sampleCases: [
      {
        input: "nguyen van\nan",
        output: "Nguyen Van An",
        explanation: "Nối thành 'nguyen van an', qua title() thành 'Nguyen Van An'."
      },
      {
        input: "LE THI\nMAI",
        output: "Le Thi Mai",
        explanation: "Chuẩn hóa về 'Le Thi Mai'."
      }
    ],
    starterCode: `ho = input().strip()
ten = input().strip()

ho_ten = (ho + " " + ten).title()
print(ho_ten)
`,
    hints: [
      "Nối họ và tên: ho + ' ' + ten.",
      "Dùng phương thức .title() để viết hoa chữ cái đầu mỗi từ."
    ],
    solutionExplanation: `Hàm title() viết hoa chữ cái đầu của mọi từ trong chuỗi.`,
    testCases: [
      { id: "cd3-b6-t1", input: "nguyen van\nan", expectedOutput: "Nguyen Van An", isHidden: false },
      { id: "cd3-b6-t2", input: "LE THI\nMAI", expectedOutput: "Le Thi Mai", isHidden: false },
      { id: "cd3-b6-t3", input: "tran\nbinh", expectedOutput: "Tran Binh", isHidden: true }
    ]
  },
  {
    id: "cd3-bai-7",
    title: "Bài 7. Tính Tổng Tiền Mua Hàng",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 3: Nhập, Xuất dữ liệu",
    difficulty: "Dễ",
    tags: ["Thành tiền", "Số nguyên", "Nhập xuất"],
    points: 20,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 3: Nhập, Xuất dữ liệu",
    problemStatement: `Viết chương trình nhập vào đơn giá (số nguyên đồng) và số lượng của một món hàng (trên 2 dòng).
Tính tổng tiền phải trả (Tổng tiền = Đơn giá * Số lượng) và in ra kết quả.`,
    inputFormat: "Gồm 2 dòng:\n- Dòng 1: Đơn giá (số nguyên dương)\n- Dòng 2: Số lượng (số nguyên dương)",
    outputFormat: "Một số nguyên duy nhất là tổng tiền.",
    constraints: "Đơn giá <= 10^7, Số lượng <= 1000",
    sampleCases: [
      {
        input: "15000\n4",
        output: "60000",
        explanation: "15.000 * 4 = 60.000 đồng."
      },
      {
        input: "8500\n10",
        output: "85000",
        explanation: "8.500 * 10 = 85.000 đồng."
      }
    ],
    starterCode: `don_gia = int(input())
so_luong = int(input())

tong_tien = don_gia * so_luong
print(tong_tien)
`,
    hints: [
      "Nhập 2 số nguyên và nhân lại với nhau."
    ],
    solutionExplanation: `Tính tổng tiền bằng phép nhân don_gia * so_luong.`,
    testCases: [
      { id: "cd3-b7-t1", input: "15000\n4", expectedOutput: "60000", isHidden: false },
      { id: "cd3-b7-t2", input: "8500\n10", expectedOutput: "85000", isHidden: false },
      { id: "cd3-b7-t3", input: "20000\n0", expectedOutput: "0", isHidden: true }
    ]
  },
  {
    id: "cd3-bai-8",
    title: "Bài 8. Nhập Điểm Toán, Văn, Anh Trên Một Dòng",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 3: Nhập, Xuất dữ liệu",
    difficulty: "Dễ",
    tags: ["split()", "float", "Điểm trung bình"],
    points: 25,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 3: Nhập, Xuất dữ liệu",
    problemStatement: `Viết chương trình nhập điểm 3 môn Toán, Văn, Anh (các số thực cách nhau bởi dấu cách trên cùng 1 dòng).
Tính và in ra điểm trung bình cộng làm tròn đúng 2 chữ số thập phân.`,
    inputFormat: "Một dòng chứa 3 số thực cách nhau bởi dấu cách.",
    outputFormat: "In ra điểm trung bình làm tròn 2 chữ số thập phân (dạng {:.2f}).",
    constraints: "0.0 <= Điểm <= 10.0",
    sampleCases: [
      {
        input: "8.0 7.5 9.0",
        output: "8.17",
        explanation: "(8.0 + 7.5 + 9.0) / 3 = 24.5 / 3 = 8.17."
      },
      {
        input: "10 10 9",
        output: "9.67",
        explanation: "29 / 3 = 9.67."
      }
    ],
    starterCode: `toan, van, anh = map(float, input().split())
dtb = (toan + van + anh) / 3
print(f"{dtb:.2f}")
`,
    hints: [
      "Dùng map(float, input().split()) để đọc 3 số thực trên 1 dòng."
    ],
    solutionExplanation: `Tính tổng 3 số và chia 3, định dạng f-string f"{dtb:.2f}".`,
    testCases: [
      { id: "cd3-b8-t1", input: "8.0 7.5 9.0", expectedOutput: "8.17", isHidden: false },
      { id: "cd3-b8-t2", input: "10 10 9", expectedOutput: "9.67", isHidden: false },
      { id: "cd3-b8-t3", input: "7.0 7.0 7.0", expectedOutput: "7.00", isHidden: true }
    ]
  },
  {
    id: "cd3-bai-9",
    title: "Bài 9. Định Dạng Ngày Tháng Năm Sinh (dd/mm/yyyy)",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 3: Nhập, Xuất dữ liệu",
    difficulty: "Dễ",
    tags: ["zfill()", "Định dạng ngày", "f-string"],
    points: 25,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 3: Nhập, Xuất dữ liệu",
    problemStatement: `Viết chương trình yêu cầu nhập ngày, tháng, năm sinh (3 số nguyên trên 3 dòng riêng biệt).
In ra chuỗi ngày sinh theo định dạng chuẩn dd/mm/yyyy (nếu ngày hoặc tháng có 1 chữ số thì thêm số 0 ở đầu, ví dụ 5 thành 05).`,
    inputFormat: "Gồm 3 dòng:\n- Dòng 1: Ngày (1 <= ngay <= 31)\n- Dòng 2: Tháng (1 <= thang <= 12)\n- Dòng 3: Năm (1900 <= nam <= 2100)",
    outputFormat: "Chuỗi ngày sinh định dạng dd/mm/yyyy.",
    constraints: "Ngày, tháng, năm hợp lệ",
    sampleCases: [
      {
        input: "5\n9\n2012",
        output: "05/09/2012",
        explanation: "Ngày 5 thành 05, tháng 9 thành 09."
      },
      {
        input: "25\n12\n2010",
        output: "25/12/2010",
        explanation: "25/12/2010 giữ nguyên 2 chữ số."
      }
    ],
    starterCode: `ngay = int(input())
thang = int(input())
nam = int(input())

print(f"{ngay:02d}/{thang:02d}/{nam:04d}")
`,
    hints: [
      "Trong f-string, cú pháp `{ngay:02d}` sẽ tự động chèn số 0 vào đầu nếu số có dưới 2 chữ số."
    ],
    solutionExplanation: `Sử dụng format specifier 02d trong f-string để tự động đệm số 0.`,
    testCases: [
      { id: "cd3-b9-t1", input: "5\n9\n2012", expectedOutput: "05/09/2012", isHidden: false },
      { id: "cd3-b9-t2", input: "25\n12\n2010", expectedOutput: "25/12/2010", isHidden: false },
      { id: "cd3-b9-t3", input: "1\n1\n2000", expectedOutput: "01/01/2000", isHidden: true }
    ]
  },
  {
    id: "cd3-bai-10",
    title: "Bài 10. Vẽ Hình Chữ Nhật Bằng Ký Tự '*' (3 Lệnh print)",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 3: Nhập, Xuất dữ liệu",
    difficulty: "Dễ",
    tags: ["Vẽ hình", "print()", "Ký tự sao"],
    points: 20,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 3: Nhập, Xuất dữ liệu",
    problemStatement: `Viết chương trình nhập vào chiều rộng w và chiều cao h (h = 3, w nhập từ bàn phím).
In ra hình chữ nhật đặc gồm 3 dòng bằng ký tự '*' với chiều rộng w (ví dụ w=6 thì in 3 dòng '******').`,
    inputFormat: "Một số nguyên dương w (chiều rộng hình chữ nhật).",
    outputFormat: "3 dòng, mỗi dòng chứa đúng w ký tự '*'.",
    constraints: "1 <= w <= 50",
    sampleCases: [
      {
        input: "6",
        output: "******\n******\n******",
        explanation: "Hình chữ nhật 3 hàng 6 cột sao."
      },
      {
        input: "4",
        output: "****\n****\n****",
        explanation: "Hình chữ nhật 3 hàng 4 cột."
      }
    ],
    starterCode: `w = int(input())

dong = "*" * w
print(dong)
print(dong)
print(dong)
`,
    hints: [
      "Tạo chuỗi `dong = '*' * w` và dùng 3 lệnh print(dong) để in ra 3 dòng."
    ],
    solutionExplanation: `Nhân chuỗi '*' với w rồi in 3 lần.`,
    testCases: [
      { id: "cd3-b10-t1", input: "6", expectedOutput: "******\n******\n******", isHidden: false },
      { id: "cd3-b10-t2", input: "4", expectedOutput: "****\n****\n****", isHidden: false },
      { id: "cd3-b10-t3", input: "1", expectedOutput: "*\n*\n*", isHidden: true }
    ]
  },
  {
    id: "cd3-bai-11",
    title: "Bài 11. Bảng Cửu Chương Số n Bằng 10 Lệnh print()",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 3: Nhập, Xuất dữ liệu",
    difficulty: "Dễ",
    tags: ["Bảng cửu chương", "f-string", "print()"],
    points: 25,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 3: Nhập, Xuất dữ liệu",
    problemStatement: `Viết chương trình nhập vào một số nguyên dương n (1 <= n <= 9).
In ra bảng cửu chương của n từ 1 đến 10 theo định dạng:
n x 1 = <n*1>
n x 2 = <n*2>
...
n x 10 = <n*10>`,
    inputFormat: "Một số nguyên dương n.",
    outputFormat: "Gồm 10 dòng in bảng cửu chương của n.",
    constraints: "1 <= n <= 9",
    sampleCases: [
      {
        input: "5",
        output: "5 x 1 = 5\n5 x 2 = 10\n5 x 3 = 15\n5 x 4 = 20\n5 x 5 = 25\n5 x 6 = 30\n5 x 7 = 35\n5 x 8 = 40\n5 x 9 = 45\n5 x 10 = 50",
        explanation: "Bảng cửu chương 5."
      }
    ],
    starterCode: `n = int(input())

for i in range(1, 11):
    print(f"{n} x {i} = {n * i}")
`,
    hints: [
      "In lần lượt các phép tính từ `n x 1 = ...` đến `n x 10 = ...`"
    ],
    solutionExplanation: `Dùng f-string hoặc vòng lặp để in 10 dòng bảng nhân của n.`,
    testCases: [
      { id: "cd3-b11-t1", input: "5", expectedOutput: "5 x 1 = 5\n5 x 2 = 10\n5 x 3 = 15\n5 x 4 = 20\n5 x 5 = 25\n5 x 6 = 30\n5 x 7 = 35\n5 x 8 = 40\n5 x 9 = 45\n5 x 10 = 50", isHidden: false },
      { id: "cd3-b11-t2", input: "2", expectedOutput: "2 x 1 = 2\n2 x 2 = 4\n2 x 3 = 6\n2 x 4 = 8\n2 x 5 = 10\n2 x 6 = 12\n2 x 7 = 14\n2 x 8 = 16\n2 x 9 = 18\n2 x 10 = 20", isHidden: false },
      { id: "cd3-b11-t3", input: "9", expectedOutput: "9 x 1 = 9\n9 x 2 = 18\n9 x 3 = 27\n9 x 4 = 36\n9 x 5 = 45\n9 x 6 = 54\n9 x 7 = 63\n9 x 8 = 72\n9 x 9 = 81\n9 x 10 = 90", isHidden: true }
    ]
  }
];
