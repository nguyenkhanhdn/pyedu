import { Module } from "../../types";

export const MODULE_3_LOOPS: Module = {
  id: "module-3",
  title: "Chương 3: Vòng Lặp & Luồng Điều Khiển (range, for, while, break, continue)",
  description: "Làm chủ hàm range(), vòng lặp for với số lần biết trước, vòng lặp while với điều kiện dừng, các lệnh ngắt break / continue và vòng lặp lồng nhau.",
  iconName: "Repeat",
  order: 3,
  color: "from-amber-500 to-orange-700",
  lessons: [
    {
      id: "lesson-9",
      moduleId: "module-3",
      moduleTitle: "Chương 3: Vòng Lặp & Luồng Điều Khiển",
      order: 1,
      title: "Bài 9: Hàm range() & Vòng Lặp for",
      description: "Hiểu sâu 3 cách sử dụng hàm range() và cách duyệt tuần tự với vòng lặp for để tính tổng dãy số.",
      durationMin: 25,
      xpReward: 70,
      theory: {
        summary: "Vòng lặp for được dùng để lặp lại một khối lệnh với số lần xác định trước. Hàm range() là công cụ chủ lực để sinh ra một dãy số nguyên tuần tự.",
        keyPoints: [
          "**3 dạng của hàm range()**:",
          "  - `range(n)`: Sinh dãy từ `0` đến `n - 1` (gồm `n` số).",
          "  - `range(start, stop)`: Sinh dãy từ `start` đến `stop - 1` (không bao gồm stop).",
          "  - `range(start, stop, step)`: Sinh dãy từ `start` đến `stop - 1` với bước nhảy `step` (nếu step âm thì đếm lùi).",
          "Cú pháp vòng lặp for: `for i in range(1, n + 1):` (biến i sẽ lần lượt nhận từng giá trị trong dãy)."
        ],
        conceptIllustration: {
          type: "loops",
          title: "Các dạng của hàm range() trong Python",
          description: "Duyệt qua từng giá trị số nguyên",
          visualData: {
            codeSnippet: "range(5) -> [0, 1, 2, 3, 4]\nrange(1, 6) -> [1, 2, 3, 4, 5]\nrange(1, 10, 2) -> [1, 3, 5, 7, 9]\nrange(5, 0, -1) -> [5, 4, 3, 2, 1]",
            outputPreview: "1 + 2 + 3 + 4 + 5 = 15",
            explanation: "Hàm range() luôn dừng trước giá trị stop đúng 1 đơn vị."
          }
        },
        examples: [
          {
            title: "Ví dụ: Tính tổng từ 1 đến N",
            explanation: "Duyệt range(1, n + 1) và cộng dồn vào biến sum_val.",
            code: "n = int(input())\ntong = 0\nfor i in range(1, n + 1):\n    tong += i\nprint(f\"Tong la: {tong}\")",
            output: "Đầu vào: 5\nTong la: 15"
          }
        ],
        multipleChoice: {
          question: "Lệnh `for i in range(2, 9, 3): print(i)` sẽ in ra các giá trị nào?",
          options: [
            "2 5 8",
            "2 5 8 9",
            "2 3 4 5 6 7 8",
            "3 6 9"
          ],
          correctIndex: 0,
          explanation: "Bắt đầu từ 2, cộng thêm bước nhảy 3 được 5, cộng tiếp 3 được 8. Giá trị tiếp theo là 11 đã vượt quá stop=9 nên dừng lại."
        }
      },
      practice: {
        id: "practice-9",
        title: "Thử thách 9: Tính Tổng Dãy Số Tự Nhiên & Số Chẵn",
        difficulty: "Cơ bản",
        problemStatement: "Viết chương trình nhập vào một số nguyên dương `N` (N >= 1). Hãy sử dụng vòng lặp `for` và hàm `range()` để tính tổng tất cả các số nguyên từ 1 đến N: `S = 1 + 2 + 3 + ... + N` và in ra kết quả.",
        inputFormat: "Một dòng duy nhất chứa số nguyên dương N (1 <= N <= 10^5).",
        outputFormat: "In ra duy nhất một số nguyên là giá trị của tổng S.",
        constraints: "1 <= N <= 10^5. Phải sử dụng vòng lặp for.",
        sampleCases: [
          {
            input: "5",
            output: "15",
            explanation: "1 + 2 + 3 + 4 + 5 = 15."
          },
          {
            input: "10",
            output: "55",
            explanation: "1 + 2 + ... + 10 = 55."
          }
        ],
        starterCode: `n = int(input())

# Khởi tạo biến tổng bằng 0
tong = 0

# Dùng vòng lặp for i in range(1, n + 1) để cộng dồn
for i in range(1, n + 1):
    tong += i

print(tong)
`,
        testCases: [
          {
            id: "tc9-1",
            input: "5",
            expectedOutput: "15",
            isHidden: false,
            explanation: "Tổng từ 1 đến 5: 15"
          },
          {
            id: "tc9-2",
            input: "10",
            expectedOutput: "55",
            isHidden: false,
            explanation: "Tổng từ 1 đến 10: 55"
          },
          {
            id: "tc9-3",
            input: "1",
            expectedOutput: "1",
            isHidden: false,
            explanation: "Trường hợp biên N = 1: 1"
          },
          {
            id: "tc9-4",
            input: "100",
            expectedOutput: "5050",
            isHidden: true,
            explanation: "Tổng từ 1 đến 100: 5050"
          }
        ],
        hints: [
          "Khởi tạo tong = 0.",
          "Dùng for i in range(1, n + 1): tong += i.",
          "Cuối cùng in ra print(tong)."
        ],
        solutionExplanation: "n = int(input())\ntong = 0\nfor i in range(1, n + 1):\n    tong += i\nprint(tong)"
      }
    },
    {
      id: "lesson-10",
      moduleId: "module-3",
      moduleTitle: "Chương 3: Vòng Lặp & Luồng Điều Khiển",
      order: 2,
      title: "Bài 10: Vòng Lặp while & Kiểm Tra Điều Kiện Dừng",
      description: "Nắm vững nguyên lý hoạt động của vòng lặp while, cách kiểm tra điều kiện lặp và phân rã các chữ số của một số nguyên.",
      durationMin: 25,
      xpReward: 70,
      theory: {
        summary: "Vòng lặp while tiếp tục thực thi khối lệnh chừng nào biểu thức điều kiện vẫn còn đúng (True). Vòng lặp while rất thích hợp cho các bài toán chưa biết trước số lần lặp cụ thể.",
        keyPoints: [
          "Cú pháp: `while dieu_kien:` (thực hiện khối lệnh lặp lại).",
          "**Nguyên tắc an toàn**: Bên trong thân vòng lặp while, BẮT BUỘC phải có câu lệnh làm thay đổi biến điều kiện (ví dụ: `n = n // 10` hoặc `i += 1`) để tránh lỗi lặp vô tận (Infinite Loop).",
          "Kỹ thuật tách chữ số của số nguyên: Lấy chữ số cuối bằng `n % 10`, bỏ chữ số cuối bằng `n = n // 10`."
        ],
        conceptIllustration: {
          type: "loops",
          title: "Sơ đồ luồng vòng lặp while",
          description: "Phân tách các chữ số của n = 345: 345 -> 34 -> 3 -> 0",
          visualData: {
            codeSnippet: "n = 345\nwhile n > 0:\n    digit = n % 10\n    print(digit)\n    n = n // 10",
            outputPreview: "In ra lần lượt: 5, 4, 3",
            explanation: "Mỗi bước chia nguyên cho 10, n giảm đi 1 chữ số cho đến khi n = 0 thì dừng vòng lặp."
          }
        },
        examples: [
          {
            title: "Ví dụ: Đếm số chữ số của N",
            explanation: "Dùng vòng lặp while chia nguyên 10.",
            code: "n = int(input())\ncount = 0\nwhile n > 0:\n    count += 1\n    n //= 10\nprint(f\"So chu so: {count}\")",
            output: "Đầu vào: 2026\nSo chu so: 4"
          }
        ],
        multipleChoice: {
          question: "Vòng lặp sau đây sẽ in ra bao nhiêu dòng: `i = 1; while i < 5: print(i); i += 2`?",
          options: [
            "2 dòng (in 1 và 3)",
            "3 dòng (in 1, 3, 5)",
            "4 dòng (in 1, 2, 3, 4)",
            "Lặp vô tận"
          ],
          correctIndex: 0,
          explanation: "i ban đầu là 1 (< 5) -> in 1, tăng i thành 3 (< 5) -> in 3, tăng i thành 5 (không còn < 5) -> kết thúc. In 2 dòng."
        }
      },
      practice: {
        id: "practice-10",
        title: "Thử thách 10: Tính Tổng Các Chữ Số Của Số Nguyên N",
        difficulty: "Cơ bản",
        problemStatement: "Viết chương trình nhập vào một số nguyên dương `N` (N > 0). Hãy sử dụng vòng lặp `while` để tính tổng tất cả các chữ số cấu thành nên N.\n\nVí dụ: N = 2026 thì tổng các chữ số là: 2 + 0 + 2 + 6 = 10.",
        inputFormat: "Một dòng chứa số nguyên dương N (1 <= N <= 10^9).",
        outputFormat: "In ra một số nguyên duy nhất là tổng các chữ số của N.",
        constraints: "1 <= N <= 10^9. Khuyên dùng vòng lặp while kết hợp % 10 và // 10.",
        sampleCases: [
          {
            input: "2026",
            output: "10",
            explanation: "2 + 0 + 2 + 6 = 10."
          },
          {
            input: "999",
            output: "27",
            explanation: "9 + 9 + 9 = 27."
          }
        ],
        starterCode: `n = int(input())

tong_chu_so = 0

# Dùng vòng lặp while n > 0 để tách từng chữ số
while n > 0:
    chu_so = n % 10
    tong_chu_so += chu_so
    n = n // 10

print(tong_chu_so)
`,
        testCases: [
          {
            id: "tc10-1",
            input: "2026",
            expectedOutput: "10",
            isHidden: false,
            explanation: "N = 2026 -> Tổng chữ số: 10"
          },
          {
            id: "tc10-2",
            input: "999",
            expectedOutput: "27",
            isHidden: false,
            explanation: "N = 999 -> Tổng chữ số: 27"
          },
          {
            id: "tc10-3",
            input: "7",
            expectedOutput: "7",
            isHidden: false,
            explanation: "Số có 1 chữ số: 7 -> 7"
          },
          {
            id: "tc10-4",
            input: "123456789",
            expectedOutput: "45",
            isHidden: true,
            explanation: "Số 9 chữ số: 123456789 -> 45"
          }
        ],
        hints: [
          "Khởi tạo tong_chu_so = 0.",
          "Trong while n > 0: lấy chu_so = n % 10, cộng vào tong_chu_so, sau đó gán n = n // 10.",
          "In ra tong_chu_so."
        ],
        solutionExplanation: "n = int(input())\ntong_chu_so = 0\nwhile n > 0:\n    tong_chu_so += n % 10\n    n //= 10\nprint(tong_chu_so)"
      }
    },
    {
      id: "lesson-11",
      moduleId: "module-3",
      moduleTitle: "Chương 3: Vòng Lặp & Luồng Điều Khiển",
      order: 3,
      title: "Bài 11: Lệnh Điều Khiển Vòng Lặp: break & continue",
      description: "Sử dụng lệnh break để ngắt vòng lặp ngay lập tức và continue để bỏ qua bước lặp hiện tại, ứng dụng kiểm tra số nguyên tố.",
      durationMin: 25,
      xpReward: 70,
      theory: {
        summary: "Python cung cấp hai lệnh điều khiển luồng cực kỳ mạnh mẽ bên trong vòng lặp:\n- `break`: Dừng và thoát hẳn ra khỏi vòng lặp ngay lập tức.\n- `continue`: Bỏ qua các dòng lệnh phía dưới của lượt lặp hiện tại và nhảy ngay sang lượt lặp kế tiếp.",
        keyPoints: [
          "`break` thường dùng khi đã tìm thấy kết quả cần thiết (ví dụ: tìm thấy một ước số -> dừng ngay, không cần duyệt tiếp).",
          "`continue` thường dùng để bỏ qua các trường hợp đặc biệt (ví dụ: chỉ xử lý số lẻ, nếu gặp số chẵn thì continue).",
          "Ứng dụng kinh điển của `break`: Kiểm tra số nguyên tố N (duyệt từ 2 đến căn bậc hai của N, nếu gặp `N % i == 0` thì kết luận không phải nguyên tố và `break`)."
        ],
        conceptIllustration: {
          type: "loops",
          title: "Sự khác biệt giữa break và continue",
          description: "break thoát hẳn khỏi vòng lặp; continue nhảy sang vòng kế tiếp",
          visualData: {
            codeSnippet: "# Ví dụ continue:\nfor i in range(1, 6):\n    if i == 3: continue\n    print(i) # In: 1, 2, 4, 5\n\n# Ví dụ break:\nfor i in range(1, 6):\n    if i == 3: break\n    print(i) # In: 1, 2",
            outputPreview: "continue: 1 2 4 5\nbreak: 1 2",
            explanation: "break kết thúc toàn bộ vòng lặp, continue chỉ kết thúc lượt lặp hiện tại."
          }
        },
        examples: [
          {
            title: "Ví dụ: Tìm số đầu tiên chia hết cho 7",
            explanation: "Dùng break khi tìm thấy.",
            code: "for i in range(10, 50):\n    if i % 7 == 0:\n        print(f\"Tim thay: {i}\")\n        break",
            output: "Tim thay: 14"
          }
        ],
        multipleChoice: {
          question: "Lệnh nào dùng để nhảy qua lượt lặp hiện tại mà KHÔNG làm dừng toàn bộ vòng lặp?",
          options: [
            "break",
            "continue",
            "exit()",
            "stop"
          ],
          correctIndex: 1,
          explanation: "Lệnh 'continue' bỏ qua phần code còn lại trong vòng lặp hiện tại và chuyển sang lượt lặp tiếp theo."
        }
      },
      practice: {
        id: "practice-11",
        title: "Thử thách 11: Kiểm Tra Số Nguyên Tố Với Lệnh break",
        difficulty: "Trung bình",
        problemStatement: "Số nguyên tố là số nguyên lớn hơn 1 và chỉ có đúng 2 ước số dương là 1 và chính nó.\n\nViết chương trình nhập vào số nguyên dương `N`. Hãy kiểm tra xem `N` có phải là số nguyên tố hay không. Nếu đúng, in ra `YES`, ngược lại in ra `NO`.",
        inputFormat: "Một dòng chứa số nguyên dương N (1 <= N <= 10^6).",
        outputFormat: "In ra `YES` nếu N là số nguyên tố, ngược lại in ra `NO`.",
        constraints: "1 <= N <= 10^6.",
        sampleCases: [
          {
            input: "7",
            output: "YES",
            explanation: "7 là số nguyên tố (chỉ chia hết cho 1 và 7)."
          },
          {
            input: "12",
            output: "NO",
            explanation: "12 chia hết cho 2, 3, 4, 6 nên không phải số nguyên tố."
          },
          {
            input: "1",
            output: "NO",
            explanation: "1 không phải là số nguyên tố theo định nghĩa."
          }
        ],
        starterCode: `n = int(input())

if n < 2:
    print("NO")
else:
    is_prime = True
    # Duyệt từ 2 đến căn bậc hai của n: int(n**0.5)
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            is_prime = False
            break # Tìm thấy ước số thì ngắt vòng lặp ngay
    
    if is_prime:
        print("YES")
    else:
        print("NO")
`,
        testCases: [
          {
            id: "tc11-1",
            input: "7",
            expectedOutput: "YES",
            isHidden: false,
            explanation: "7 là số nguyên tố -> YES"
          },
          {
            id: "tc11-2",
            input: "12",
            expectedOutput: "NO",
            isHidden: false,
            explanation: "12 là hợp số -> NO"
          },
          {
            id: "tc11-3",
            input: "1",
            expectedOutput: "NO",
            isHidden: false,
            explanation: "Số 1 không phải nguyên tố -> NO"
          },
          {
            id: "tc11-4",
            input: "2",
            expectedOutput: "YES",
            isHidden: false,
            explanation: "Số nguyên tố chẵn duy nhất 2 -> YES"
          },
          {
            id: "tc11-5",
            input: "97",
            expectedOutput: "YES",
            isHidden: true,
            explanation: "97 là số nguyên tố -> YES"
          },
          {
            id: "tc11-6",
            input: "100",
            expectedOutput: "NO",
            isHidden: true,
            explanation: "100 chia hết cho 2 -> NO"
          }
        ],
        hints: [
          "Nếu n < 2 -> in NO.",
          "Duyệt for i in range(2, int(n**0.5) + 1): nếu n % i == 0 thì đặt cờ is_prime = False và gọi break.",
          "In YES nếu is_prime là True, ngược lại in NO."
        ],
        solutionExplanation: "n = int(input())\nif n < 2:\n    print('NO')\nelse:\n    is_prime = True\n    for i in range(2, int(n**0.5) + 1):\n        if n % i == 0:\n            is_prime = False\n            break\n    print('YES' if is_prime else 'NO')"
      }
    },
    {
      id: "lesson-12",
      moduleId: "module-3",
      moduleTitle: "Chương 3: Vòng Lặp & Luồng Điều Khiển",
      order: 4,
      title: "Bài 12: Vòng Lặp Lồng Nhau (Nested Loops)",
      description: "Làm chủ kỹ thuật lồng vòng lặp bên trong vòng lặp khác, ứng dụng duyệt lưới 2 chiều, vẽ hình học ký tự và in bảng cửu chương.",
      durationMin: 30,
      xpReward: 80,
      theory: {
        summary: "Vòng lặp lồng nhau (Nested loops) là cấu trúc mà trong đó một vòng lặp (vòng trong - Inner Loop) nằm hoàn toàn bên trong thân của một vòng lặp khác (vòng ngoài - Outer Loop). Với mỗi 1 lần lặp của vòng ngoài, vòng trong sẽ chạy trọn vẹn từ đầu đến cuối.",
        keyPoints: [
          "Số lần thực hiện tổng cộng = (Số lần vòng ngoài) * (Số lần vòng trong).",
          "Thường dùng biến `i` cho chỉ số dòng (Row) và `j` cho chỉ số cột (Column).",
          "Tham số `end=\"\"` trong lệnh `print()` giúp in các ký tự liền kề trên cùng một dòng mà không bị tự động xuống dòng.",
          "Lệnh `print()` rỗng dùng để chuyển xuống dòng mới sau khi in xong một hàng."
        ],
        conceptIllustration: {
          type: "loops",
          title: "Cơ chế vòng lặp lồng nhau (2 chiều)",
          description: "Vòng ngoài i chạy từng dòng, vòng trong j chạy từng cột trên dòng đó",
          visualData: {
            codeSnippet: "for i in range(1, 4):      # Dòng i từ 1 đến 3\n    for j in range(1, 4):  # Cột j từ 1 đến 3\n        print(f\"({i},{j})\", end=\" \")\n    print()                # Xuống dòng",
            outputPreview: "(1,1) (1,2) (1,3)\n(2,1) (2,2) (2,3)\n(3,1) (3,2) (3,3)",
            explanation: "Mỗi khi i nhận 1 giá trị, j sẽ chạy đủ từ 1 đến 3 rồi mới tăng i lên."
          }
        },
        examples: [
          {
            title: "Ví dụ: In hình chữ nhật sao kích thước 3x4",
            explanation: "3 dòng, mỗi dòng 4 dấu sao.",
            code: "for i in range(3):\n    for j in range(4):\n        print(\"*\", end=\"\")\n    print()",
            output: "****\n****\n****"
          }
        ],
        multipleChoice: {
          question: "Đoạn mã sau in ra bao nhiêu ký tự '*': `for i in range(3): for j in range(4): print('*', end='')`?",
          options: [
            "7 ký tự",
            "12 ký tự",
            "4 ký tự",
            "3 ký tự"
          ],
          correctIndex: 1,
          explanation: "Vòng ngoài lặp 3 lần, mỗi lần vòng trong lặp 4 lần. Tổng số ký tự in ra là 3 * 4 = 12 ký tự."
        }
      },
      practice: {
        id: "practice-12",
        title: "Thử thách 12: Vẽ Tam Giác Vuông Sao N Dòng",
        difficulty: "Trung bình",
        problemStatement: "Viết chương trình nhập vào một số nguyên dương `N` (1 <= N <= 30). Hãy sử dụng hai vòng lặp `for` lồng nhau để in ra một hình tam giác vuông bằng các dấu sao `*` có `N` dòng, trong đó dòng thứ `i` (với i từ 1 đến N) chứa đúng `i` dấu sao `*`.\n\nVí dụ với N = 4:\n*\n**\n***\n****",
        inputFormat: "Một dòng chứa số nguyên dương N (1 <= N <= 30).",
        outputFormat: "In ra hình tam giác vuông sao kích thước N dòng.",
        constraints: "1 <= N <= 30.",
        sampleCases: [
          {
            input: "4",
            output: "*\n**\n***\n****",
            explanation: "Dòng 1 có 1 sao, dòng 2 có 2 sao, dòng 3 có 3 sao, dòng 4 có 4 sao."
          },
          {
            input: "3",
            output: "*\n**\n***",
            explanation: "Tam giác vuông 3 dòng."
          }
        ],
        starterCode: `n = int(input())

# Vòng ngoài duyệt qua từng dòng từ 1 đến n
for i in range(1, n + 1):
    # Vòng trong in i dấu sao trên cùng một dòng
    for j in range(i):
        print("*", end="")
    print() # Xuống dòng sau khi in xong dòng thứ i
`,
        testCases: [
          {
            id: "tc12-1",
            input: "4",
            expectedOutput: "*\n**\n***\n****",
            isHidden: false,
            explanation: "Tam giác 4 dòng"
          },
          {
            id: "tc12-2",
            input: "3",
            expectedOutput: "*\n**\n***",
            isHidden: false,
            explanation: "Tam giác 3 dòng"
          },
          {
            id: "tc12-3",
            input: "1",
            expectedOutput: "*",
            isHidden: false,
            explanation: "Tam giác 1 dòng"
          },
          {
            id: "tc12-4",
            input: "5",
            expectedOutput: "*\n**\n***\n****\n*****",
            isHidden: true,
            explanation: "Tam giác 5 dòng"
          }
        ],
        hints: [
          "Dùng for i in range(1, n + 1): để quản lý dòng.",
          "Bên trong dùng for j in range(i): print(\"*\", end=\"\").",
          "Sau vòng for con, dùng print() để ngắt dòng."
        ],
        solutionExplanation: "n = int(input())\nfor i in range(1, n + 1):\n    for j in range(i):\n        print('*', end='')\n    print()"
      }
    }
  ]
};
