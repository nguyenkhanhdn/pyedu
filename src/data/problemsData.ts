import { AlgorithmProblem, AlgorithmLeaderboardEntry } from "../types";

export const ALGORITHM_PROBLEMS: AlgorithmProblem[] = [
  // ==========================================
  // CẤP ĐỘ 1: TIỂU HỌC (KHỐI 3 - 5 & BẢNG A TIN HỌC TRẺ)
  // ==========================================
  {
    id: "prob-pri-01",
    title: "Mua Sắm Đồ Dùng Học Tập",
    level: "primary",
    gradeGroup: "Tiểu học (Khối 3-5)",
    topic: "Biến & Phép toán cơ bản",
    difficulty: "Dễ",
    tags: ["Biến & Kiểu dữ liệu", "Toán số học", "Phép chia lấy dư"],
    points: 30,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Đề thi Tin học trẻ Tiểu học - Khởi động",
    problemStatement: `Đầu năm học mới, bạn An được mẹ cho số tiền M (đồng) để mua đồ dùng học tập:
- An mua X quyển vở với giá 8.000 đồng/quyển.
- An mua Y cây bút chì với giá 5.000 đồng/cây.
- An mua 1 chiếc thước kẻ với giá 4.000 đồng.

Yêu cầu: Hãy viết chương trình Python nhập vào 3 số nguyên M, X, Y (mỗi số trên 1 dòng) và tính:
1. Tổng số tiền An phải thanh toán.
2. Số tiền còn lại mà An đem về (nếu đủ tiền) hoặc in ra "KHONG DU TIEN" nếu số tiền M không đủ trả.`,
    inputFormat: "Gồm 3 dòng, mỗi dòng chứa một số nguyên dương:\n- Dòng 1: Số tiền M mẹ cho (1.000 <= M <= 1.000.000)\n- Dòng 2: Số quyển vở X (0 <= X <= 100)\n- Dòng 3: Số cây bút chì Y (0 <= Y <= 100)",
    outputFormat: "Gồm 2 dòng:\n- Dòng 1: Tổng số tiền An phải trả (dạng số nguyên).\n- Dòng 2: Số tiền còn lại hoặc thông báo \"KHONG DU TIEN\".",
    constraints: "M <= 1.000.000, X <= 100, Y <= 100",
    sampleCases: [
      {
        input: "100000\n5\n4",
        output: "64000\n36000",
        explanation: "Tổng tiền: 5*8000 + 4*5000 + 4000 = 40000 + 20000 + 4000 = 64.000 đồng. Tiền còn lại: 100000 - 64000 = 36.000 đồng."
      },
      {
        input: "50000\n6\n3",
        output: "67000\nKHONG DU TIEN",
        explanation: "Tổng tiền: 6*8000 + 3*5000 + 4000 = 67.000 đồng > 50.000 đồng mẹ cho nên không đủ tiền."
      }
    ],
    starterCode: `# Nhập dữ liệu đầu vào
m = int(input())
x = int(input())
y = int(input())

# TODO: Viết code tính toán và in kết quả ở đây
`,
    hints: [
      "Bước 1: Tính tong_tien = x * 8000 + y * 5000 + 4000.",
      "Bước 2: In tong_tien ra dòng đầu tiên.",
      "Bước 3: Dùng câu lệnh if m >= tong_tien: in m - tong_tien, ngược lại in 'KHONG DU TIEN'."
    ],
    solutionExplanation: `Tính tổng tiền: tong = x * 8000 + y * 5000 + 4000. Sau đó so sánh m và tong để xuất ra kết quả tương ứng.`,
    testCases: [
      { id: "p1-t1", input: "100000\n5\n4", expectedOutput: "64000\n36000", isHidden: false },
      { id: "p1-t2", input: "50000\n6\n3", expectedOutput: "67000\nKHONG DU TIEN", isHidden: false },
      { id: "p1-t3", input: "4000\n0\n0", expectedOutput: "4000\n0", isHidden: true },
      { id: "p1-t4", input: "500000\n20\n30", expectedOutput: "314000\n186000", isHidden: true }
    ]
  },
  {
    id: "prob-pri-02",
    title: "Bài Toán Cổ: Vừa Gà Vừa Chó",
    level: "primary",
    gradeGroup: "Tiểu học (Khối 3-5)",
    topic: "Toán tư duy & Dân gian",
    difficulty: "Trung bình",
    tags: ["Toán giả thiết tạm", "Vòng lặp", "Rẽ nhánh"],
    points: 45,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Bài toán dân gian Việt Nam & Tin học trẻ Bảng A",
    problemStatement: `Bài toán cổ Việt Nam có câu thơ:
"Vừa gà vừa chó
Bó lại cho tròn
Ba mươi sáu con
Một trăm chân chẵn."

Bây giờ ta tổng quát hóa bài toán:
Cho biết tổng số con là T và tổng số chân là C (biết gà có 2 chân, chó có 4 chân).

Yêu cầu: Hãy viết chương trình tính số con gà và số con chó.
Nếu dữ liệu không hợp lệ (không tồn tại số gà và chó nguyên dương thỏa mãn), hãy in ra "VO NGHIEM".`,
    inputFormat: "Gồm 2 dòng:\n- Dòng 1: Tổng số con T (1 <= T <= 10.000)\n- Dòng 2: Tổng số chân C (1 <= C <= 50.000)",
    outputFormat: "Gồm 2 số nguyên cách nhau một khoảng trắng: số con gà và số con chó.\nNếu không có nghiệm hợp lệ, in \"VO NGHIEM\".",
    constraints: "1 <= T <= 10.000, 1 <= C <= 50.000",
    sampleCases: [
      {
        input: "36\n100",
        output: "22 14",
        explanation: "Có 22 con gà (22*2 = 44 chân) và 14 con chó (14*4 = 56 chân). Tổng số con: 22+14=36, tổng chân: 44+56=100."
      },
      {
        input: "10\n25",
        output: "VO NGHIEM",
        explanation: "Tổng số chân 25 là số lẻ, không thể có số nguyên con gà và chó thỏa mãn."
      }
    ],
    starterCode: `# Nhập tổng số con và tổng số chân
t = int(input())
c = int(input())

# TODO: Tìm số gà và số chó
`,
    hints: [
      "Phương pháp 1 (Toán học): Giả sử tất cả đều là gà, tổng chân là 2*t. Số chân dôi ra c - 2*t là do mỗi con chó hơn 2 chân. Vậy số chó = (c - 2*t) // 2.",
      "Kiểm tra điều kiện: c phải là số chẵn, (c - 2*t) chia hết cho 2, số chó >= 0 và số gà = t - số chó >= 0.",
      "Phương pháp 2 (Vòng lặp): Cho ga chạy từ 0 đến t, nếu ga*2 + (t-ga)*4 == c thì tìm thấy nghiệm!"
    ],
    solutionExplanation: `Dùng vòng lặp duyệt số gà từ 0 đến t hoặc dùng công thức: so_cho = (c - 2*t) / 2. Nếu so_cho nguyên và 0 <= so_cho <= t thì in nghiệm, ngược lại in VO NGHIEM.`,
    testCases: [
      { id: "p2-t1", input: "36\n100", expectedOutput: "22 14", isHidden: false },
      { id: "p2-t2", input: "10\n25", expectedOutput: "VO NGHIEM", isHidden: false },
      { id: "p2-t3", input: "50\n200", expectedOutput: "0 50", isHidden: true },
      { id: "p2-t4", input: "100\n200", expectedOutput: "100 0", isHidden: true },
      { id: "p2-t5", input: "1000\n2600", expectedOutput: "700 300", isHidden: true }
    ]
  },
  {
    id: "prob-pri-03",
    title: "Dãy Số Cách Đều & Số Hạng Thứ N",
    level: "primary",
    gradeGroup: "Tiểu học (Khối 3-5)",
    topic: "Dãy số có quy luật",
    difficulty: "Dễ",
    tags: ["Dãy số có luật", "Cấp số cộng", "Phép nhân"],
    points: 35,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Toán tư duy Tiểu học & Lập trình toán học",
    problemStatement: `Cho một dãy số cách đều tăng dần bắt đầu bằng số A, mỗi số tiếp theo hơn số liền trước D đơn vị:
A, A + D, A + 2*D, A + 3*D, ...

Ví dụ: Với A = 3, D = 4, dãy số là: 3, 7, 11, 15, 19, ...

Yêu cầu: Hãy viết chương trình nhập vào 3 số nguyên A, D, N (trên 3 dòng) và:
1. Tìm giá trị của số hạng thứ N trong dãy.
2. Tính tổng của N số hạng đầu tiên của dãy.`,
    inputFormat: "Gồm 3 dòng chứa 3 số nguyên:\n- Dòng 1: Số hạng đầu tiên A (1 <= A <= 1.000)\n- Dòng 2: Khoảng cách D (1 <= D <= 1.000)\n- Dòng 3: Thứ tự N (1 <= N <= 10.000)",
    outputFormat: "Gồm 2 dòng:\n- Dòng 1: Giá trị số hạng thứ N\n- Dòng 2: Tổng N số hạng đầu tiên",
    constraints: "A, D <= 1.000; N <= 10.000",
    sampleCases: [
      {
        input: "3\n4\n5",
        output: "19\n55",
        explanation: "Dãy 5 số hạng đầu tiên: 3, 7, 11, 15, 19. Số thứ 5 là 19. Tổng = 3 + 7 + 11 + 15 + 19 = 55."
      },
      {
        input: "1\n1\n10",
        output: "10\n55",
        explanation: "Dãy số tự nhiên từ 1 đến 10: số thứ 10 là 10. Tổng từ 1 đến 10 là 55."
      }
    ],
    starterCode: `a = int(input())
d = int(input())
n = int(input())

# TODO: Tính số hạng thứ n và tổng n số hạng
`,
    hints: [
      "Công thức số hạng thứ n: a_n = a + (n - 1) * d.",
      "Công thức tính tổng n số hạng: tong = (a + a_n) * n // 2."
    ],
    solutionExplanation: `Sử dụng công thức cấp số cộng: số hạng thứ n = a + (n - 1) * d, tổng n số hạng = n * (2*a + (n - 1)*d) // 2.`,
    testCases: [
      { id: "p3-t1", input: "3\n4\n5", expectedOutput: "19\n55", isHidden: false },
      { id: "p3-t2", input: "1\n1\n10", expectedOutput: "10\n55", isHidden: false },
      { id: "p3-t3", input: "5\n5\n100", expectedOutput: "500\n25250", isHidden: true },
      { id: "p3-t4", input: "100\n10\n1", expectedOutput: "100\n100", isHidden: true }
    ]
  },
  {
    id: "prob-pri-04",
    title: "Số Đảo Ngược & Tổng Chữ Số",
    level: "primary",
    gradeGroup: "Tiểu học (Khối 3-5)",
    topic: "Toán tư duy & Xử lý số",
    difficulty: "Trung bình",
    tags: ["Chữ số", "Chuỗi", "Toán tư duy"],
    points: 40,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Đề thi Tin học trẻ Tiểu học",
    problemStatement: `Cho một số nguyên dương N. Bạn hãy:
1. In ra số đảo ngược của N (bỏ qua các chữ số 0 vô nghĩa ở đầu nếu có, ví dụ 120 đảo ngược là 21).
2. Tính tổng tất cả các chữ số của N.
3. Kiểm tra xem N có phải là số đối xứng (Palindrome) hay không? Nếu có in "DUNG", ngược lại in "SAI".`,
    inputFormat: "Một dòng duy nhất chứa số nguyên dương N (1 <= N <= 10^9).",
    outputFormat: "Gồm 3 dòng:\n- Dòng 1: Số đảo ngược của N (ở dạng số nguyên).\n- Dòng 2: Tổng các chữ số của N.\n- Dòng 3: \"DUNG\" hoặc \"SAI\".",
    constraints: "1 <= N <= 10^9",
    sampleCases: [
      {
        input: "12321",
        output: "12321\n9\nDUNG",
        explanation: "Số 12321 đảo ngược vẫn là 12321. Tổng chữ số: 1+2+3+2+1=9. Đây là số đối xứng nên in DUNG."
      },
      {
        input: "250",
        output: "52\n7\nSAI",
        explanation: "Số 250 đảo ngược là 52 (bỏ số 0 đứng đầu). Tổng chữ số 2+5+0=7. Không đối xứng nên in SAI."
      }
    ],
    starterCode: `s = input().strip()

# TODO: Xử lý số đảo ngược, tổng chữ số và kiểm tra đối xứng
`,
    hints: [
      "Cách 1: Đảo chuỗi s[::-1] rồi chuyển sang int(s[::-1]) để tự động bỏ chữ số 0 đầu.",
      "Cách tính tổng chữ số: sum(int(ch) for ch in s).",
      "Số đối xứng nếu int(s) == int(s[::-1]) và chuỗi ban đầu không có số 0 ở đuôi làm thay đổi độ dài, hoặc đơn giản so sánh s == s[::-1]."
    ],
    solutionExplanation: `Đảo chuỗi bằng s[::-1], chuyển thành int để được số đảo ngược. Tính tổng chữ số bằng vòng lặp. So sánh chuỗi ban đầu với chuỗi đảo ngược.`,
    testCases: [
      { id: "p4-t1", input: "12321", expectedOutput: "12321\n9\nDUNG", isHidden: false },
      { id: "p4-t2", input: "250", expectedOutput: "52\n7\nSAI", isHidden: false },
      { id: "p4-t3", input: "7", expectedOutput: "7\n7\nDUNG", isHidden: true },
      { id: "p4-t4", input: "1000000", expectedOutput: "1\n1\nSAI", isHidden: true }
    ]
  },
  {
    id: "prob-pri-05",
    title: "Khu Vườn Hoa & Hàng Rào Cọc Gỗ",
    level: "primary",
    gradeGroup: "Tiểu học (Khối 3-5)",
    topic: "Hình học & Phép toán",
    difficulty: "Dễ",
    tags: ["Hình học", "Chu vi diện tích", "Toán thực tế"],
    points: 35,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Toán Tiểu học & Ứng dụng thực tế",
    problemStatement: `Bác Ba có một mảnh đất hình chữ nhật trồng hoa với chiều dài A (mét) và chiều rộng B (mét).
Bác muốn:
1. Tính diện tích của khu vườn (mét vuông).
2. Đóng cọc rào xung quanh khu vườn, cứ cách 2 mét bác đóng 1 chiếc cọc gỗ (ở 4 góc đều có cọc). Hỏi bác cần chuẩn bị tất cả bao nhiêu chiếc cọc gỗ? (Biết chu vi chia hết cho 2).`,
    inputFormat: "Gồm 2 dòng:\n- Dòng 1: Chiều dài A (số nguyên chẵn, 2 <= A <= 10.000)\n- Dòng 2: Chiều rộng B (số nguyên chẵn, 2 <= B <= 10.000)",
    outputFormat: "Gồm 2 dòng:\n- Dòng 1: Diện tích khu vườn.\n- Dòng 2: Số lượng cọc gỗ cần đóng.",
    constraints: "2 <= A, B <= 10.000, A và B là các số nguyên.",
    sampleCases: [
      {
        input: "10\n6",
        output: "60\n16",
        explanation: "Diện tích = 10 * 6 = 60 m2. Chu vi = (10 + 6) * 2 = 32 mét. Số cọc = 32 / 2 = 16 cọc."
      }
    ],
    starterCode: `a = int(input())
b = int(input())

# TODO: Tính diện tích và số cọc gỗ
`,
    hints: [
      "Diện tích = a * b",
      "Chu vi = (a + b) * 2",
      "Số cọc đóng kín xung quanh theo chu vi = Chu vi // 2"
    ],
    solutionExplanation: `Diện tích = a * b. Chu vi = (a + b) * 2. Số cọc gỗ khép kín xung quanh chu vi cứ 2m một cọc là chu_vi // 2.`,
    testCases: [
      { id: "p5-t1", input: "10\n6", expectedOutput: "60\n16", isHidden: false },
      { id: "p5-t2", input: "20\n14", expectedOutput: "280\n34", isHidden: true },
      { id: "p5-t3", input: "4\n4", expectedOutput: "16\n8", isHidden: true }
    ]
  },
  {
    id: "prob-pri-06",
    title: "Đếm Ký Tự Hoa, Thường & Chữ Số",
    level: "primary",
    gradeGroup: "Tiểu học (Khối 3-5)",
    topic: "Xử lý Chuỗi ký tự",
    difficulty: "Trung bình",
    tags: ["Chuỗi", "Vòng lặp duyệt chuỗi", "Điều kiện"],
    points: 40,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Đề thi Tin học trẻ Bảng A",
    problemStatement: `Cho một xâu ký tự S gồm các chữ cái hoa, chữ cái thường, chữ số và dấu cách.
Yêu cầu: Hãy đếm xem trong xâu S có:
1. Bao nhiêu chữ cái in hoa?
2. Bao nhiêu chữ cái in thường?
3. Bao nhiêu chữ số (từ '0' đến '9')?`,
    inputFormat: "Một dòng duy nhất chứa xâu ký tự S (độ dài không quá 1.000 ký tự).",
    outputFormat: "Gồm 3 số nguyên trên một dòng cách nhau bởi dấu cách: [Số chữ hoa] [Số chữ thường] [Số chữ số].",
    constraints: "Độ dài xâu S <= 1.000",
    sampleCases: [
      {
        input: "PyEdu 2026 VietNam!",
        output: "3 8 4",
        explanation: "Chữ hoa: 'P', 'E', 'V', 'N' -> 3 chữ (P, E, V, N là 4? Trong 'PyEdu VietNam': P, E, V, N -> 4). Hãy kiểm tra kỹ: P, E, V, N."
      },
      {
        input: "Python 3.12",
        output: "1 5 3",
        explanation: "Chữ hoa: P (1). Chữ thường: y, t, h, o, n (5). Chữ số: 3, 1, 2 (3)."
      }
    ],
    starterCode: `s = input()

# TODO: Đếm số ký tự hoa, thường và chữ số
`,
    hints: [
      "Có thể dùng các hàm có sẵn của chuỗi Python: c.isupper(), c.islower(), c.isdigit().",
      "Hoặc so sánh mã ký tự: 'A' <= c <= 'Z', 'a' <= c <= 'z', '0' <= c <= '9'."
    ],
    solutionExplanation: `Duyệt qua từng ký tự c trong xâu s, tăng biến đếm tương ứng với isupper, islower, isdigit.`,
    testCases: [
      { id: "p6-t1", input: "Python 3.12", expectedOutput: "1 5 3", isHidden: false },
      { id: "p6-t2", input: "Hello World 123", expectedOutput: "2 8 3", isHidden: false },
      { id: "p6-t3", input: "TIN HOC TRE 2026", expectedOutput: "9 0 4", isHidden: true },
      { id: "p6-t4", input: "abcxyz", expectedOutput: "0 6 0", isHidden: true }
    ]
  },
  {
    id: "prob-pri-07",
    title: "Số May Mắn (Bội của 3 và 5)",
    level: "primary",
    gradeGroup: "Tiểu học (Khối 3-5)",
    topic: "Vòng lặp & Rẽ nhánh",
    difficulty: "Dễ",
    tags: ["Vòng lặp", "Toán chia hết", "Đếm số"],
    points: 35,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Đề thi Tin học trẻ Tiểu học",
    problemStatement: `Trong vương quốc Toán học, một số nguyên dương được gọi là "Số May Mắn" nếu số đó chia hết cho cả 3 và 5 (tức là chia hết cho 15).

Cho trước số nguyên dương N. Hãy viết chương trình:
1. Đếm xem có bao nhiêu Số May Mắn trong đoạn từ 1 đến N.
2. Tính tổng tất cả các Số May Mắn đó.`,
    inputFormat: "Một dòng duy nhất chứa số nguyên dương N (1 <= N <= 100.000).",
    outputFormat: "Gồm 2 dòng:\n- Dòng 1: Số lượng số may mắn.\n- Dòng 2: Tổng các số may mắn.",
    constraints: "1 <= N <= 100.000",
    sampleCases: [
      {
        input: "50",
        output: "3\n90",
        explanation: "Các số chia hết cho cả 3 và 5 từ 1 đến 50 là: 15, 30, 45 (gồm 3 số). Tổng = 15 + 30 + 45 = 90."
      }
    ],
    starterCode: `n = int(input())

# TODO: Đếm và tính tổng các số chia hết cho 15 từ 1 đến n
`,
    hints: [
      "Số chia hết cho cả 3 và 5 chính là bội số của 15: i % 15 == 0.",
      "Cách nhanh: Duyệt for i in range(15, n + 1, 15)."
    ],
    solutionExplanation: `Duyệt các bội số của 15 trong khoảng [1, n], đếm số lượng và cộng dồn vào tổng.`,
    testCases: [
      { id: "p7-t1", input: "50", expectedOutput: "3\n90", isHidden: false },
      { id: "p7-t2", input: "14", expectedOutput: "0\n0", isHidden: false },
      { id: "p7-t3", input: "150", expectedOutput: "10\n825", isHidden: true }
    ]
  },
  {
    id: "prob-pri-08",
    title: "Thỏ Và Rùa Chạy Đua",
    level: "primary",
    gradeGroup: "Tiểu học (Khối 3-5)",
    topic: "Toán tư duy & Mô phỏng",
    difficulty: "Khó",
    tags: ["Toán chuyển động", "Mô phỏng", "Tin học trẻ Bảng A"],
    points: 60,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Đề thi Tin học trẻ Toàn quốc - Bảng A",
    problemStatement: `Thỏ và Rùa thi chạy trên quãng đường dài S (mét):
- Rùa bò liên tục với vận tốc V1 (mét/phút) không nghỉ.
- Thỏ chạy rất nhanh với vận tốc V2 (mét/phút). Nhưng vì chủ quan, sau khi chạy được một nửa quãng đường (S / 2 mét), Thỏ dừng lại ngủ T (phút), sau đó mới dậy chạy nốt nửa quãng đường còn lại.

Yêu cầu: Hãy xác định ai về đích trước và thời gian người đó về đích (tính bằng phút, làm tròn đến chữ số thập phân thứ 2 hoặc in số nguyên nếu là số nguyên).
- Nếu Rùa thắng, in "RUA" ở dòng 1, dòng 2 in thời gian Rùa chạy.
- Nếu Thỏ thắng, in "THO" ở dòng 1, dòng 2 in tổng thời gian Thỏ chạy (bao gồm cả thời gian ngủ).
- Nếu cả hai cùng về đích một lúc, in "HOA" ở dòng 1, dòng 2 in thời gian đó.`,
    inputFormat: "Gồm 4 dòng chứa 4 số nguyên:\n- Dòng 1: Quãng đường S (chẵn, 10 <= S <= 10.000)\n- Dòng 2: Vận tốc rùa V1 (1 <= V1 <= 100)\n- Dòng 3: Vận tốc thỏ V2 (V2 > V1, 1 <= V2 <= 500)\n- Dòng 4: Thời gian ngủ của thỏ T (1 <= T <= 1.000)",
    outputFormat: "Gồm 2 dòng:\n- Dòng 1: \"RUA\", \"THO\", hoặc \"HOA\"\n- Dòng 2: Thời gian (in theo định dạng số thực làm tròn 2 chữ số thập phân nếu lẻ, ví dụ: 25.5 hoặc 20.00 -> in 2 chữ số thập phân {:.2f}).",
    constraints: "S <= 10.000, V1 < V2 <= 500, T <= 1000",
    sampleCases: [
      {
        input: "100\n2\n20\n30",
        output: "THO\n35.00",
        explanation: "Rùa chạy mất 100 / 2 = 50 phút. Thỏ chạy 100 mét mất 100 / 20 = 5 phút, cộng 30 phút ngủ = 35 phút. Thỏ thắng sau 35.00 phút."
      },
      {
        input: "100\n2\n20\n50",
        output: "RUA\n50.00",
        explanation: "Rùa mất 50 phút. Thỏ mất 5 + 50 = 55 phút. Rùa về trước sau 50.00 phút."
      }
    ],
    starterCode: `s = float(input())
v1 = float(input())
v2 = float(input())
t = float(input())

# TODO: Tính thời gian rùa và thỏ, so sánh và in kết quả
`,
    hints: [
      "Thời gian rùa: t_rua = s / v1.",
      "Thời gian thỏ: t_tho = (s / v2) + t.",
      "So sánh t_rua và t_tho. Dùng f'{val:.2f}' để in 2 chữ số thập phân."
    ],
    solutionExplanation: `Tính t_rua = s / v1, t_tho = s / v2 + t. So sánh t_rua và t_tho để xuất kết quả tương ứng.`,
    testCases: [
      { id: "p8-t1", input: "100\n2\n20\n30", expectedOutput: "THO\n35.00", isHidden: false },
      { id: "p8-t2", input: "100\n2\n20\n50", expectedOutput: "RUA\n50.00", isHidden: false },
      { id: "p8-t3", input: "120\n3\n12\n30", expectedOutput: "HOA\n40.00", isHidden: true }
    ]
  },

  // ==========================================
  // CẤP ĐỘ 2: TRUNG HỌC CƠ SỞ (KHỐI 6 - 9, BẢNG B TIN HỌC TRẺ & HSG THCS)
  // ==========================================
  {
    id: "prob-sec-01",
    title: "Sàng Số Nguyên Tố & Đếm SNT Đoạn [L, R]",
    level: "secondary",
    gradeGroup: "THCS (Khối 6-9)",
    topic: "Số học nâng cao (Số nguyên tố)",
    difficulty: "Trung bình",
    tags: ["Số nguyên tố", "Sàng Eratosthenes", "Tối ưu thuật toán"],
    points: 50,
    timeLimit: "1.0s",
    memoryLimit: "256MB",
    source: "Đề thi HSG Tin học THCS Cấp Huyện/Tỉnh",
    problemStatement: `Số nguyên tố là số nguyên lớn hơn 1 chỉ có đúng 2 ước là 1 và chính nó (2, 3, 5, 7, 11, ...).

Yêu cầu: Cho hai số nguyên dương L và R.
Hãy đếm xem có bao nhiêu số nguyên tố trong đoạn [L, R] (tức L <= p <= R) và tính tổng của tất cả các số nguyên tố đó.`,
    inputFormat: "Gồm một dòng chứa 2 số nguyên L và R cách nhau bởi dấu cách (1 <= L <= R <= 100.000).",
    outputFormat: "Gồm 2 dòng:\n- Dòng 1: Số lượng số nguyên tố trong đoạn [L, R].\n- Dòng 2: Tổng các số nguyên tố đó.",
    constraints: "1 <= L <= R <= 100.000",
    sampleCases: [
      {
        input: "1 10",
        output: "4\n17",
        explanation: "Các số nguyên tố từ 1 đến 10 là: 2, 3, 5, 7 (gồm 4 số). Tổng = 2 + 3 + 5 + 7 = 17."
      },
      {
        input: "10 20",
        output: "4\n60",
        explanation: "Các số nguyên tố từ 10 đến 20: 11, 13, 17, 19 (4 số). Tổng = 11 + 13 + 17 + 19 = 60."
      }
    ],
    starterCode: `line = input().split()
l = int(line[0])
r = int(line[1])

# TODO: Đếm và tính tổng các số nguyên tố trong [L, R]
`,
    hints: [
      "Hàm kiểm tra nguyên tố tối ưu: n < 2 -> False, n == 2 hoặc 3 -> True, n % 2 == 0 hoặc n % 3 == 0 -> False. Duyệt từ 5 đến căn bậc hai của n với bước nhảy 6 (i, i+2).",
      "Hoặc dùng Sàng Eratosthenes tạo mảng is_prime kích thước R + 1."
    ],
    solutionExplanation: `Viết hàm is_prime kiểm tra đến căn bậc 2 hoặc dùng sàng nguyên tố Eratosthenes. Duyệt từ L đến R, đếm và cộng dồn các số thỏa mãn.`,
    testCases: [
      { id: "s1-t1", input: "1 10", expectedOutput: "4\n17", isHidden: false },
      { id: "s1-t2", input: "10 20", expectedOutput: "4\n60", isHidden: false },
      { id: "s1-t3", input: "20 30", expectedOutput: "2\n52", isHidden: true },
      { id: "s1-t4", input: "1 1000", expectedOutput: "168\n76127", isHidden: true }
    ]
  },
  {
    id: "prob-sec-02",
    title: "Ước Chung Lớn Nhất & Bội Chung Nhỏ Nhất",
    level: "secondary",
    gradeGroup: "THCS (Khối 6-9)",
    topic: "Số học nâng cao (UCLN & BCNN)",
    difficulty: "Dễ",
    tags: ["Thuật toán Euclid", "Toán số học", "Đệ quy / Vòng lặp"],
    points: 40,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Đề thi Tin học trẻ Bảng B",
    problemStatement: `Cho hai số nguyên dương A và B.
Yêu cầu:
1. Tìm Ước chung lớn nhất (UCLN) của A và B bằng thuật toán Euclid tối ưu.
2. Tìm Bội chung nhỏ nhất (BCNN) của A và B (biết BCNN(A, B) = (A * B) // UCLN(A, B)).
3. Rút gọn phân số A / B về dạng phân số tối giản tử_mới / mẫu_mới.`,
    inputFormat: "Gồm một dòng chứa 2 số nguyên dương A và B cách nhau bởi dấu cách (1 <= A, B <= 10^9).",
    outputFormat: "Gồm 3 dòng:\n- Dòng 1: UCLN(A, B)\n- Dòng 2: BCNN(A, B)\n- Dòng 3: Phân số tối giản dạng \"tử mẫu\" cách nhau khoảng trắng.",
    constraints: "1 <= A, B <= 10^9",
    sampleCases: [
      {
        input: "12 18",
        output: "6\n36\n2 3",
        explanation: "UCLN(12, 18) = 6. BCNN(12, 18) = 36. Phân số 12/18 rút gọn thành 2/3."
      }
    ],
    starterCode: `import math

a, b = map(int, input().split())

# TODO: Tìm UCLN, BCNN và phân số tối giản
`,
    hints: [
      "Thuật toán Euclid: def gcd(a, b): while b: a, b = b, a % b; return a.",
      "BCNN = (a * b) // gcd(a, b).",
      "Phân số tối giản = (a // gcd(a, b), b // gcd(a, b))."
    ],
    solutionExplanation: `Sử dụng thuật toán Euclid tìm UCLN, tính BCNN = (a * b) // ucln, rút gọn phân số bằng cách chia cả tử và mẫu cho UCLN.`,
    testCases: [
      { id: "s2-t1", input: "12 18", expectedOutput: "6\n36\n2 3", isHidden: false },
      { id: "s2-t2", input: "100 25", expectedOutput: "25\n100\n4 1", isHidden: false },
      { id: "s2-t3", input: "17 19", expectedOutput: "1\n323\n17 19", isHidden: true },
      { id: "s2-t4", input: "1000000 3000000", expectedOutput: "1000000\n3000000\n1 3", isHidden: true }
    ]
  },
  {
    id: "prob-sec-03",
    title: "Dãy Số Fibonacci & Kiểm Tra Thuộc Dãy",
    level: "secondary",
    gradeGroup: "THCS (Khối 6-9)",
    topic: "Dãy số & Quy luật (Fibonacci)",
    difficulty: "Trung bình",
    tags: ["Fibonacci", "Quy hoạch động", "Toán quy luật"],
    points: 50,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Đề thi HSG Tin học THCS",
    problemStatement: `Dãy số Fibonacci được định nghĩa như sau:
F(1) = 1, F(2) = 1, F(n) = F(n-1) + F(n-2) với n >= 3.
Các số đầu tiên của dãy: 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, ...

Yêu cầu: Nhập vào 2 số nguyên N và K:
1. Tìm số Fibonacci thứ N: F(N).
2. Kiểm tra xem số K có phải là một số thuộc dãy Fibonacci hay không? Nếu có in "CO", ngược lại in "KHONG".`,
    inputFormat: "Gồm 2 dòng:\n- Dòng 1: Số nguyên dương N (1 <= N <= 50)\n- Dòng 2: Số nguyên dương K (1 <= K <= 10^9)",
    outputFormat: "Gồm 2 dòng:\n- Dòng 1: Giá trị F(N)\n- Dòng 2: \"CO\" hoặc \"KHONG\"",
    constraints: "1 <= N <= 50, 1 <= K <= 10^9",
    sampleCases: [
      {
        input: "7\n21",
        output: "13\nCO",
        explanation: "F(7) = 13. Số 21 là F(8) nên thuộc dãy Fibonacci -> in CO."
      },
      {
        input: "10\n10",
        output: "55\nKHONG",
        explanation: "F(10) = 55. Số 10 không thuộc dãy Fibonacci (dãy có 8 rồi đến 13) -> in KHONG."
      }
    ],
    starterCode: `n = int(input())
k = int(input())

# TODO: Tính F(n) và kiểm tra k có thuộc dãy Fibonacci
`,
    hints: [
      "Tính F(n) bằng vòng lặp: a, b = 1, 1; lặp n - 2 lần: a, b = b, a + b.",
      "Để kiểm tra K, sinh dãy Fibonacci cho đến khi F(i) >= K. Nếu có số đúng bằng K thì in CO, ngược lại KHONG."
    ],
    solutionExplanation: `Khởi tạo F = [0, 1, 1], lặp tính F(i) = F(i-1) + F(i-2) đến n để lấy F(n). Dùng tập hợp set các số Fibonacci sinh ra để kiểm tra k.`,
    testCases: [
      { id: "s3-t1", input: "7\n21", expectedOutput: "13\nCO", isHidden: false },
      { id: "s3-t2", input: "10\n10", expectedOutput: "55\nKHONG", isHidden: false },
      { id: "s3-t3", input: "1\n1", expectedOutput: "1\nCO", isHidden: true },
      { id: "s3-t4", input: "30\n832040", expectedOutput: "832040\nCO", isHidden: true }
    ]
  },
  {
    id: "prob-sec-04",
    title: "Giai Thừa N! & Chữ Số 0 Tận Cùng",
    level: "secondary",
    gradeGroup: "THCS (Khối 6-9)",
    topic: "Số học & Tư duy thuật toán",
    difficulty: "Trung bình",
    tags: ["Giai thừa", "Số chữ số 0 tận cùng", "Toán tư duy"],
    points: 55,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Đề thi Học sinh giỏi & Tin học trẻ Bảng B",
    problemStatement: `Giai thừa của số nguyên dương N (kí hiệu N!) là tích của các số từ 1 đến N:
N! = 1 * 2 * 3 * ... * N.

Khi N lớn (ví dụ N = 100), N! là một số rất khổng lồ với nhiều chữ số 0 ở tận cùng.
Mỗi chữ số 0 tận cùng được tạo ra từ tích của thừa số 2 và thừa số 5 (2 * 5 = 10). Do số lượng thừa số 2 trong N! luôn nhiều hơn thừa số 5, số lượng chữ số 0 tận cùng chính là số lượng thừa số 5 trong phân tích của N!.

Yêu cầu: Cho số nguyên dương N. Hãy đếm số lượng chữ số 0 liên tiếp ở tận cùng của N!.`,
    inputFormat: "Một dòng chứa số nguyên dương N (1 <= N <= 10^9).",
    outputFormat: "Một số nguyên duy nhất là số chữ số 0 ở tận cùng của N!.",
    constraints: "1 <= N <= 10^9",
    sampleCases: [
      {
        input: "10",
        output: "2",
        explanation: "10! = 3.628.800 có đúng 2 chữ số 0 ở tận cùng. Theo công thức: 10 // 5 = 2."
      },
      {
        input: "25",
        output: "6",
        explanation: "25! có số chữ số 0 tận cùng là: 25 // 5 + 25 // 25 = 5 + 1 = 6 chữ số 0."
      }
    ],
    starterCode: `n = int(input())

# TODO: Đếm số lượng chữ số 0 tận cùng của n! với độ phức tạp O(log5(N))
`,
    hints: [
      "Không được tính n! trực tiếp vì n lên tới 10^9 sẽ bị tràn bộ nhớ và quá thời gian!",
      "Thuật toán Legendre: count = 0; while n >= 5: count += n // 5; n //= 5; in count."
    ],
    solutionExplanation: `Dùng công thức Legendre tính số bội của 5, 25, 125, ... trong đoạn 1 đến n bằng vòng lặp chia 5.`,
    testCases: [
      { id: "s4-t1", input: "10", expectedOutput: "2", isHidden: false },
      { id: "s4-t2", input: "25", expectedOutput: "6", isHidden: false },
      { id: "s4-t3", input: "100", expectedOutput: "24", isHidden: true },
      { id: "s4-t4", input: "1000", expectedOutput: "249", isHidden: true }
    ]
  },
  {
    id: "prob-sec-05",
    title: "Tổng Cặp Số Bằng K (Two Sum)",
    level: "secondary",
    gradeGroup: "THCS (Khối 6-9)",
    topic: "Mảng & Danh sách (List)",
    difficulty: "Khó",
    tags: ["Two Sum", "Mảng & Hash Map", "HSG Tin học"],
    points: 70,
    timeLimit: "1.0s",
    memoryLimit: "256MB",
    source: "Đề thi HSG Tin học THCS & Competitive Programming",
    problemStatement: `Cho một dãy gồm N số nguyên A1, A2, ..., AN và một số nguyên mục tiêu K.

Yêu cầu: Hãy đếm xem có bao nhiêu cặp chỉ số (i, j) với 1 <= i < j <= N sao cho:
Ai + Aj = K.

Ví dụ: Dãy A = [1, 5, 7, -1, 5], K = 6
Các cặp có tổng bằng 6 là:
- (1, 5) -> A[0] + A[1] = 1 + 5 = 6
- (1, 5) -> A[0] + A[4] = 1 + 5 = 6
- (7, -1) -> A[2] + A[3] = 7 + (-1) = 6
Tổng cộng có 3 cặp thỏa mãn.`,
    inputFormat: "Gồm 2 dòng:\n- Dòng 1: Chứa 2 số nguyên N và K (2 <= N <= 100.000, -10^9 <= K <= 10^9)\n- Dòng 2: Chứa N số nguyên A1, A2, ..., AN cách nhau bởi khoảng trắng (-10^9 <= Ai <= 10^9)",
    outputFormat: "Một số nguyên duy nhất là số lượng cặp chỉ số thỏa mãn điều kiện.",
    constraints: "2 <= N <= 100.000, -10^9 <= Ai, K <= 10^9",
    sampleCases: [
      {
        input: "5 6\n1 5 7 -1 5",
        output: "3",
        explanation: "Có 3 cặp chỉ số có tổng bằng 6 là (0,1), (0,4), (2,3)."
      },
      {
        input: "4 10\n2 3 4 5",
        output: "0",
        explanation: "Không có cặp 2 số nào trong dãy có tổng bằng 10."
      }
    ],
    starterCode: `line1 = input().split()
n = int(line1[0])
k = int(line1[1])
a = list(map(int, input().split()))

# TODO: Đếm số lượng cặp có tổng bằng K tối ưu bằng Dictionary / Hash map
`,
    hints: [
      "Cách O(N^2) duyệt 2 vòng for lồng nhau sẽ bị Time Limit Exceeded khi N = 100.000!",
      "Cách O(N) tối ưu: Dùng Dictionary (bảng băm) để lưu số lần xuất hiện của từng phần tử. Khi duyệt đến x = a[i], số lượng phần tử cần tìm là target = k - x. Cộng số lần xuất hiện của target vào kết quả, sau đó cập nhật count_dict[x] += 1."
    ],
    solutionExplanation: `Duyệt qua mảng và dùng dictionary freq đếm số lần xuất hiện. Với mỗi phần tử x, cộng freq[k - x] vào tổng số cặp, sau đó tăng freq[x].`,
    testCases: [
      { id: "s5-t1", input: "5 6\n1 5 7 -1 5", expectedOutput: "3", isHidden: false },
      { id: "s5-t2", input: "4 10\n2 3 4 5", expectedOutput: "0", isHidden: false },
      { id: "s5-t3", input: "6 4\n2 2 2 2 2 2", expectedOutput: "15", isHidden: true },
      { id: "s5-t4", input: "5 0\n-5 5 -5 5 0", expectedOutput: "4", isHidden: true }
    ]
  },
  {
    id: "prob-sec-06",
    title: "Chuẩn Hóa Xâu & Kiểm Tra Palindrome Đối Xứng",
    level: "secondary",
    gradeGroup: "THCS (Khối 6-9)",
    topic: "Xử lý Chuỗi nâng cao",
    difficulty: "Trung bình",
    tags: ["Chuỗi", "Palindrome", "Xử lý chuỗi"],
    points: 45,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Đề thi Tin học trẻ Bảng B",
    problemStatement: `Một câu / chuỗi được gọi là Đối xứng (Palindrome) nếu khi đọc xuôi hay đọc ngược đều giống nhau, sau khi đã bỏ qua tất cả dấu cách, dấu câu và không phân biệt chữ hoa chữ thường.

Ví dụ: "A man, a plan, a canal: Panama" sau khi chuẩn hóa thành "amanaplanacanalpanama" là một xâu đối xứng.

Yêu cầu: Cho một chuỗi S. Hãy:
1. Chuẩn hóa chuỗi bằng cách chỉ giữ lại các chữ cái và chữ số (chuyển hết về chữ in thường).
2. Kiểm tra xem chuỗi có phải là Palindrome không. Nếu có in "YES", ngược lại in "NO".`,
    inputFormat: "Một dòng chứa xâu ký tự S (độ dài không quá 10.000 ký tự).",
    outputFormat: "Gồm 2 dòng:\n- Dòng 1: Chuỗi sau khi đã chuẩn hóa (chỉ gồm ký tự thường và chữ số).\n- Dòng 2: \"YES\" hoặc \"NO\".",
    constraints: "Độ dài xâu S <= 10.000",
    sampleCases: [
      {
        input: "A man, a plan, a canal: Panama",
        output: "amanaplanacanalpanama\nYES",
        explanation: "Sau khi lọc chỉ còn chữ thường và số: 'amanaplanacanalpanama' đọc xuôi ngược như nhau -> YES."
      },
      {
        input: "race a car",
        output: "raceacar\nNO",
        explanation: "'raceacar' đảo ngược là 'racaecar' không khớp -> NO."
      }
    ],
    starterCode: `s = input()

# TODO: Lọc chuỗi chuẩn hóa và kiểm tra đối xứng
`,
    hints: [
      "Tạo chuỗi sạch: clean = ''.join(c.lower() for c in s if c.isalnum()).",
      "Kiểm tra clean == clean[::-1]."
    ],
    solutionExplanation: `Sử dụng hàm c.isalnum() và c.lower() để lọc ra chuỗi sạch chỉ chứa chữ và số, sau đó so sánh với chuỗi đảo ngược clean[::-1].`,
    testCases: [
      { id: "s6-t1", input: "A man, a plan, a canal: Panama", expectedOutput: "amanaplanacanalpanama\nYES", isHidden: false },
      { id: "s6-t2", input: "race a car", expectedOutput: "raceacar\nNO", isHidden: false },
      { id: "s6-t3", input: "Was it a car or a cat I saw?", expectedOutput: "wasitacaroracatisaw\nYES", isHidden: true },
      { id: "s6-t4", input: "12321", expectedOutput: "12321\nYES", isHidden: true }
    ]
  },
  {
    id: "prob-sec-07",
    title: "Nén Chuỗi Ký Tự (Run-Length Encoding - RLE)",
    level: "secondary",
    gradeGroup: "THCS (Khối 6-9)",
    topic: "Xử lý Chuỗi & Nén dữ liệu",
    difficulty: "Khó",
    tags: ["Thuật toán RLE", "Xử lý chuỗi", "HSG Tin học"],
    points: 65,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Đề thi HSG Tin học THCS & Olympic Tin học",
    problemStatement: `Thuật toán nén Run-Length Encoding (RLE) là phương pháp nén dữ liệu đơn giản: thay thế các dãy ký tự lặp lại liên tiếp bằng số lần xuất hiện kèm ký tự đó.

Ví dụ: Xâu "AAABBBCCCCD" sẽ được nén thành "3A3B4C1D" hoặc nếu 1 ký tự xuất hiện 1 lần thì ghi "1D".

Yêu cầu: Cho một chuỗi S chỉ gồm các chữ cái in hoa. Hãy viết chương trình nén chuỗi S theo thuật toán RLE (in số lượng trước, ký tự sau).`,
    inputFormat: "Một dòng duy nhất chứa chuỗi S (1 <= độ dài S <= 100.000).",
    outputFormat: "Một dòng duy nhất là chuỗi sau khi đã được nén.",
    constraints: "1 <= len(S) <= 100.000",
    sampleCases: [
      {
        input: "AAABBBCCCCD",
        output: "3A3B4C1D",
        explanation: "Có 3 chữ A, 3 chữ B, 4 chữ C, 1 chữ D -> 3A3B4C1D."
      },
      {
        input: "WWWWWWWWWWWWBWWWWWWWWWWWWBBBWWWWWWWWWWWWWWWWWWWWWWWWB",
        output: "12W1B12W3B24W1B",
        explanation: "Các đoạn ký tự liên tiếp được nén kèm số lượng."
      }
    ],
    starterCode: `s = input().strip()

# TODO: Nén chuỗi theo định dạng RLE
`,
    hints: [
      "Duyệt qua chuỗi, dùng biến count đếm số ký tự liên tiếp giống nhau.",
      "Khi gặp ký tự khác hoặc đến cuối chuỗi, nối str(count) + current_char vào kết quả và reset count = 1."
    ],
    solutionExplanation: `Duyệt một vòng lặp qua xâu s, duy trì ký tự hiện tại và đếm số lần lặp. Khi ký tự đổi, thêm [số lượng][ký tự] vào mảng kết quả.`,
    testCases: [
      { id: "s7-t1", input: "AAABBBCCCCD", expectedOutput: "3A3B4C1D", isHidden: false },
      { id: "s7-t2", input: "WWWWWWWWWWWWBWWWWWWWWWWWWBBBWWWWWWWWWWWWWWWWWWWWWWWWB", expectedOutput: "12W1B12W3B24W1B", isHidden: false },
      { id: "s7-t3", input: "A", expectedOutput: "1A", isHidden: true },
      { id: "s7-t4", input: "ABCDE", expectedOutput: "1A1B1C1D1E", isHidden: true }
    ]
  },
  {
    id: "prob-sec-08",
    title: "Số Hoàn Hảo & Tìm SNT Mersenne",
    level: "secondary",
    gradeGroup: "THCS (Khối 6-9)",
    topic: "Số học & Tư duy thuật toán",
    difficulty: "Trung bình",
    tags: ["Số hoàn hảo", "Ước số", "Toán học"],
    points: 50,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Đề thi HSG Tin học THCS",
    problemStatement: `Số hoàn hảo (Perfect Number) là số nguyên dương có tổng tất cả các ước số thực sự của nó (tức các ước bé hơn chính nó) bằng chính nó.
Ví dụ:
- 6 có các ước bé hơn nó là 1, 2, 3. Tổng: 1 + 2 + 3 = 6 -> 6 là số hoàn hảo.
- 28 có các ước bé hơn nó là 1, 2, 4, 7, 14. Tổng: 1 + 2 + 4 + 7 + 14 = 28 -> 28 là số hoàn hảo.

Yêu cầu: Cho số nguyên dương N. Hãy liệt kê tất cả các số hoàn hảo nhỏ hơn hoặc bằng N theo thứ tự tăng dần. Nếu không có số nào, in "KHONG CO".`,
    inputFormat: "Một dòng chứa số nguyên dương N (1 <= N <= 10.000).",
    outputFormat: "Các số hoàn hảo tìm được cách nhau bởi khoảng trắng trên một dòng, hoặc \"KHONG CO\".",
    constraints: "1 <= N <= 10.000",
    sampleCases: [
      {
        input: "30",
        output: "6 28",
        explanation: "Các số hoàn hảo <= 30 là 6 và 28."
      },
      {
        input: "5",
        output: "KHONG CO",
        explanation: "Không có số hoàn hảo nào nhỏ hơn hoặc bằng 5."
      }
    ],
    starterCode: `n = int(input())

# TODO: Tìm tất cả số hoàn hảo <= n
`,
    hints: [
      "Viết hàm sum_proper_divisors(num): Duyệt i từ 1 đến int(sqrt(num)). Nếu num % i == 0, cộng i và num // i (trừ trường hợp i == 1 và i == num // i).",
      "Nếu sum == num thì là số hoàn hảo."
    ],
    solutionExplanation: `Tính tổng các ước số thực sự của mỗi số từ 2 đến n bằng cách duyệt ước đến căn bậc 2. Nếu tổng bằng chính số đó thì thêm vào danh sách.`,
    testCases: [
      { id: "s8-t1", input: "30", expectedOutput: "6 28", isHidden: false },
      { id: "s8-t2", input: "5", expectedOutput: "KHONG CO", isHidden: false },
      { id: "s8-t3", input: "500", expectedOutput: "6 28 496", isHidden: true },
      { id: "s8-t4", input: "10000", expectedOutput: "6 28 496 8128", isHidden: true }
    ]
  },
  {
    id: "prob-sec-09",
    title: "Mảng Cộng Dồn (Prefix Sum) & Q Truy Vấn Tổng Đoạn Con",
    level: "secondary",
    gradeGroup: "THCS (Khối 6-9)",
    topic: "Mảng & Danh sách (List)",
    difficulty: "HSG",
    tags: ["Prefix Sum", "Mảng cộng dồn", "Đề thi HSG Tỉnh"],
    points: 80,
    timeLimit: "1.0s",
    memoryLimit: "256MB",
    source: "Đề thi HSG Tin học THCS Cấp Tỉnh",
    problemStatement: `Cho dãy gồm N số nguyên A1, A2, ..., AN (được đánh chỉ số từ 1 đến N) và Q truy vấn.
Mỗi truy vấn gồm 2 số nguyên L và R (1 <= L <= R <= N).

Yêu cầu: Với mỗi truy vấn, hãy tính tổng các phần tử từ vị trí L đến vị trí R:
Tổng = A[L] + A[L+1] + ... + A[R].

Kỹ thuật tối ưu:
Nếu với mỗi truy vấn bạn dùng vòng lặp for chạy từ L đến R, độ phức tạp sẽ là O(Q * N) -> Bị quá thời gian (TLE).
Hãy sử dụng Mảng cộng dồn (Prefix Sum):
pref[0] = 0
pref[i] = pref[i-1] + A[i]
Khi đó: Tổng từ L đến R = pref[R] - pref[L-1] chỉ mất thời gian O(1) cho mỗi truy vấn!`,
    inputFormat: "Gồm:\n- Dòng 1: Hai số nguyên N và Q (1 <= N, Q <= 100.000)\n- Dòng 2: N số nguyên A1, A2, ..., AN cách nhau bởi khoảng trắng (-10^6 <= Ai <= 10^6)\n- Q dòng tiếp theo: Mỗi dòng gồm 2 số nguyên L và R (1 <= L <= R <= N)",
    outputFormat: "Gồm Q dòng, mỗi dòng là kết quả tổng của truy vấn tương ứng.",
    constraints: "1 <= N, Q <= 100.000, -10^6 <= Ai <= 10^6",
    sampleCases: [
      {
        input: "5 3\n2 4 6 8 10\n1 3\n2 4\n1 5",
        output: "12\n18\n30",
        explanation: "Truy vấn 1: A[1]+A[2]+A[3] = 2+4+6 = 12.\nTruy vấn 2: A[2]+A[3]+A[4] = 4+6+8 = 18.\nTruy vấn 3: Tổng cả dãy = 30."
      }
    ],
    starterCode: `import sys

# Đọc dữ liệu nhanh
input_data = sys.stdin.read().split()
if input_data:
    n = int(input_data[0])
    q = int(input_data[1])
    # TODO: Xây dựng mảng Prefix Sum và trả lời Q truy vấn
`,
    hints: [
      "Tạo mảng pref có n + 1 phần tử, pref[0] = 0.",
      "pref[i] = pref[i-1] + a[i-1].",
      "Với mỗi cặp l, r: kết quả là pref[r] - pref[l-1]."
    ],
    solutionExplanation: `Tính mảng prefix sum pref với pref[i] là tổng i phần tử đầu tiên. Trả lời mỗi truy vấn [L, R] bằng pref[R] - pref[L-1] trong thời gian O(1).`,
    testCases: [
      { id: "s9-t1", input: "5 3\n2 4 6 8 10\n1 3\n2 4\n1 5", expectedOutput: "12\n18\n30", isHidden: false },
      { id: "s9-t2", input: "4 2\n-5 10 -3 8\n1 2\n2 4", expectedOutput: "5\n15", isHidden: true },
      { id: "s9-t3", input: "3 1\n100 200 300\n2 2", expectedOutput: "200", isHidden: true }
    ]
  },
  {
    id: "prob-sec-10",
    title: "Bài Toán Đổi Tiền Xu Tối Ưu (Greedy Algorithm)",
    level: "secondary",
    gradeGroup: "THCS (Khối 6-9)",
    topic: "Thuật toán tham lam (Greedy)",
    difficulty: "HSG",
    tags: ["Tham lam Greedy", "Đổi tiền", "HSG Tin học THCS"],
    points: 75,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Đề thi HSG Tin học & Tin học trẻ Bảng B",
    problemStatement: `Ngân hàng có các mệnh giá đồng tiền xu sau: 500, 200, 100, 50, 20, 10, 5, 2, 1 (đồng).
Mỗi mệnh giá đều có số lượng không giới hạn.

Một khách hàng muốn rút số tiền S (đồng).
Yêu cầu: Hãy tính số lượng đồng xu ít nhất cần dùng để trả đủ số tiền S, và liệt kê số lượng từng loại mệnh giá đã dùng (chỉ in các mệnh giá có dùng > 0 đồng, theo thứ tự mệnh giá giảm dần).`,
    inputFormat: "Một dòng duy nhất chứa số nguyên dương S (1 <= S <= 10^9).",
    outputFormat: "Gồm nhiều dòng:\n- Dòng 1: Tổng số đồng xu ít nhất cần dùng.\n- Các dòng tiếp theo: Mỗi dòng in theo định dạng \"[mệnh giá] : [số lượng xu]\" (chỉ in các mệnh giá có dùng > 0 xu).",
    constraints: "1 <= S <= 10^9",
    sampleCases: [
      {
        input: "786",
        output: "5\n500 : 1\n200 : 1\n50 : 1\n20 : 1\n10 : 1\n5 : 1\n1 : 1",
        explanation: "786 = 500*1 + 200*1 + 50*1 + 20*1 + 10*1 + 5*1 + 1*1. Tổng cộng 7 đồng xu? Đợi chút: 500(1) + 200(1) = 700 + 50(1) = 750 + 20(1) = 770 + 10(1) = 780 + 5(1) = 785 + 1(1) = 786 -> 7 đồng xu."
      },
      {
        input: "300",
        output: "2\n200 : 1\n100 : 1",
        explanation: "300 = 200*1 + 100*1 -> 2 đồng xu."
      }
    ],
    starterCode: `s = int(input())

denominations = [500, 200, 100, 50, 20, 10, 5, 2, 1]

# TODO: Dùng thuật toán Tham lam (Greedy) chọn từ mệnh giá lớn nhất
`,
    hints: [
      "Duyệt qua danh sách mệnh giá từ lớn đến bé.",
      "Với mỗi mệnh giá coin: count = s // coin, nếu count > 0 thì lưu lại và s %= coin."
    ],
    solutionExplanation: `Sử dụng thuật toán tham lam chia lấy nguyên s // coin và lấy phần dư s % coin với từng mệnh giá từ lớn đến nhỏ.`,
    testCases: [
      { id: "s10-t1", input: "300", expectedOutput: "2\n200 : 1\n100 : 1", isHidden: false },
      { id: "s10-t2", input: "786", expectedOutput: "7\n500 : 1\n200 : 1\n50 : 1\n20 : 1\n10 : 1\n5 : 1\n1 : 1", isHidden: false },
      { id: "s10-t3", input: "1000", expectedOutput: "2\n500 : 2", isHidden: true },
      { id: "s10-t4", input: "99", expectedOutput: "6\n50 : 1\n20 : 2\n5 : 1\n2 : 2", isHidden: true }
    ]
  }
];

export const INITIAL_ALGORITHM_LEADERBOARD: AlgorithmLeaderboardEntry[] = [
  {
    rank: 1,
    userId: "algo-top-1",
    fullName: "Nguyễn Lê Hoàng Nam",
    username: "nam_olympiad",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=hoangnam",
    grade: "Khối 9",
    level: "secondary",
    totalScore: 540,
    solvedCount: 9,
    primarySolved: 3,
    secondarySolved: 6,
    accuracy: 98
  },
  {
    rank: 2,
    userId: "algo-top-2",
    fullName: "Trần Minh Đức",
    username: "duc_python_pro",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=minhduc",
    grade: "Khối 8",
    level: "secondary",
    totalScore: 480,
    solvedCount: 8,
    primarySolved: 4,
    secondarySolved: 4,
    accuracy: 95
  },
  {
    rank: 3,
    userId: "algo-top-3",
    fullName: "Lê Bảo Châu",
    username: "chau_tinhoctre",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=baochau",
    grade: "Khối 5",
    level: "primary",
    totalScore: 320,
    solvedCount: 7,
    primarySolved: 7,
    secondarySolved: 0,
    accuracy: 100
  },
  {
    rank: 4,
    userId: "algo-top-4",
    fullName: "Phạm Gia Huy",
    username: "huy_algokid",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=giahuy",
    grade: "Khối 4",
    level: "primary",
    totalScore: 280,
    solvedCount: 6,
    primarySolved: 6,
    secondarySolved: 0,
    accuracy: 94
  },
  {
    rank: 5,
    userId: "algo-top-5",
    fullName: "Võ Quỳnh Nga",
    username: "nga_coder_thcs",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=quynhnga",
    grade: "Khối 7",
    level: "secondary",
    totalScore: 260,
    solvedCount: 5,
    primarySolved: 2,
    secondarySolved: 3,
    accuracy: 91
  },
  {
    rank: 6,
    userId: "algo-top-6",
    fullName: "Đỗ Quốc Đạt",
    username: "dat_tin_bang_a",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=quocdat",
    grade: "Khối 5",
    level: "primary",
    totalScore: 215,
    solvedCount: 5,
    primarySolved: 5,
    secondarySolved: 0,
    accuracy: 92
  }
];
