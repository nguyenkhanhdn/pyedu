import { Module, LessonPractice } from "../../types";
import { LOOPS_EXTRA_PROBLEMS } from "../problems/loops_extra";

const toPractice = (p: any): LessonPractice => ({
  id: p.id,
  title: p.title,
  difficulty: p.difficulty === 'Dễ' ? 'Cơ bản' : p.difficulty === 'Trung bình' ? 'Trung bình' : 'Nâng cao',
  problemStatement: p.problemStatement,
  inputFormat: p.inputFormat,
  outputFormat: p.outputFormat,
  constraints: p.constraints,
  sampleCases: p.sampleCases,
  starterCode: p.starterCode,
  hints: p.hints,
  solutionExplanation: p.solutionExplanation,
  testCases: p.testCases
});

export const TOPIC_5_FOR_LOOPS: Module = {
  id: "topic-5",
  title: "Chủ đề 5: Vòng Lặp for",
  description: "Làm chủ vòng lặp for và hàm range() từ in dãy số 1..n, đếm ngược n..1, số chẵn/lẻ đến tính tổng tích lũy, kết hợp if lọc dữ liệu, lệnh break/continue và vẽ hình học.",
  iconName: "Repeat",
  order: 5,
  color: "from-cyan-500 to-blue-700",
  lessons: [
    // ----------------------------------------------------
    // BÀI 1: VÒNG LẶP FOR CƠ BẢN & HÀM RANGE()
    // ----------------------------------------------------
    {
      id: "t5-l1",
      moduleId: "topic-5",
      moduleTitle: "Chủ đề 5: Vòng Lặp for",
      order: 1,
      title: "Bài 1: Vòng Lặp for Cơ Bản & Hàm range()",
      description: "Làm quen với vòng lặp for, hiểu 3 dạng của hàm range() để in dãy số xuôi 1..n, đếm ngược n..1 và in các số chẵn, lẻ.",
      durationMin: 15,
      xpReward: 50,
      theory: {
        summary: "**`for`** lặp số lần **xác định trước**; **`range()`** sinh dãy số nguyên.",
        keyPoints: [
          "`range(stop)`: từ **0** đến `stop - 1`",
          "`range(start, stop)`: từ `start` đến `stop - 1`",
          "`range(start, stop, step)`: có **bước nhảy** `step`",
          "Chẵn: `range(2, n + 1, 2)`; lẻ: `range(1, n + 1, 2)`; ngược: `range(n, 0, -1)`",
          "`print(i, end=' ')` để in **cùng một dòng**."
        ],
        conceptIllustration: {
          type: "loops",
          title: "3 Dạng Của Hàm range() Trong Python",
          description: "range(1, n + 1) in xuôi 1..n | range(n, 0, -1) đếm ngược n..1 | range(2, n + 1, 2) số chẵn",
          visualData: {
            loopType: "for i in range(start, stop, step)",
            iterations: [
              { index: 1, state: "range(1, 5) -> 1, 2, 3, 4" },
              { index: 2, state: "range(5, 0, -1) -> 5, 4, 3, 2, 1" },
              { index: 3, state: "range(2, 7, 2) -> 2, 4, 6" }
            ]
          }
        },
        examples: [
          {
            title: "Ví dụ: In từ 1 đến n",
            explanation: "Dùng range(1, n + 1) để duyệt từ 1 đến n.",
            code: "n = 5\nfor i in range(1, n + 1):\n    print(i, end=' ')\nprint()",
            output: "1 2 3 4 5 "
          }
        ],
        multipleChoice: {
          question: "Để in dãy số đếm ngược từ 5 về 1 (5 4 3 2 1), ta dùng hàm range nào sau đây?",
          options: [
            "range(5, 1, -1)",
            "range(5, 0, -1)",
            "range(5, 0, 1)",
            "range(1, 6, -1)"
          ],
          correctIndex: 1,
          explanation: "range(5, 0, -1) bắt đầu từ 5, giảm mỗi lần 1 đơn vị và dừng trước 0, nghĩa là nhận các giá trị 5, 4, 3, 2, 1."
        }
      },
      practice: {
        id: "t5-p1",
        title: "Bài 1: In Dãy Số Từ 1 Đến n",
        difficulty: "Cơ bản",
        problemStatement: "Viết chương trình nhập vào một số nguyên dương `n`. Sử dụng vòng lặp `for` và hàm `range()` để in ra các số nguyên từ 1 đến `n` trên cùng một dòng, cách nhau bởi một dấu cách.",
        inputFormat: "Một dòng chứa số nguyên dương n (1 <= n <= 1000).",
        outputFormat: "Các số từ 1 đến n cách nhau bởi một khoảng trắng.",
        constraints: "1 <= n <= 1000.",
        sampleCases: [
          {
            input: "5",
            output: "1 2 3 4 5",
            explanation: "In lần lượt các số từ 1 đến 5."
          },
          {
            input: "1",
            output: "1",
            explanation: "n = 1 chỉ có 1 số."
          }
        ],
        starterCode: `# Nhập số nguyên dương n
n = int(input())

# TODO: Dùng for và range để in dãy số từ 1 đến n
`,
        testCases: [
          {
            id: "t5-1-tc1",
            input: "5",
            expectedOutput: "1 2 3 4 5",
            isHidden: false,
            explanation: "Kiểm tra n = 5."
          },
          {
            id: "t5-1-tc2",
            input: "1",
            expectedOutput: "1",
            isHidden: false,
            explanation: "Kiểm tra n = 1."
          },
          {
            id: "t5-1-tc3",
            input: "10",
            expectedOutput: "1 2 3 4 5 6 7 8 9 10",
            isHidden: false,
            explanation: "Kiểm tra n = 10."
          },
          {
            id: "t5-1-tc4",
            input: "20",
            expectedOutput: "1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20",
            isHidden: true,
            explanation: "Kiểm tra n = 20."
          }
        ],
        hints: [
          "Dùng cú pháp: `for i in range(1, n + 1):`",
          "In trên một dòng: `print(i, end=' ')` hoặc dùng `print(*range(1, n + 1))`"
        ],
        solutionExplanation: "n = int(input())\nfor i in range(1, n + 1):\n    print(i, end=' ' if i < n else '\\n')"
      },
      practices: [
        {
          id: "t5-p1",
          title: "Bài 1: In Dãy Số Từ 1 Đến n",
          difficulty: "Cơ bản",
          problemStatement: "Viết chương trình nhập vào một số nguyên dương `n`. Sử dụng vòng lặp `for` và hàm `range()` để in ra các số nguyên từ 1 đến `n` trên cùng một dòng, cách nhau bởi một dấu cách.",
          inputFormat: "Một dòng chứa số nguyên dương n (1 <= n <= 1000).",
          outputFormat: "Các số từ 1 đến n cách nhau bởi một khoảng trắng.",
          constraints: "1 <= n <= 1000.",
          sampleCases: [
            {
              input: "5",
              output: "1 2 3 4 5",
              explanation: "In lần lượt các số từ 1 đến 5."
            },
            {
              input: "1",
              output: "1",
              explanation: "n = 1 chỉ có 1 số."
            }
          ],
          starterCode: `# Nhập số nguyên dương n\nn = int(input())\n\n# TODO: Dùng for và range để in dãy số từ 1 đến n\n`,
          testCases: [
            {
              id: "t5-1-tc1",
              input: "5",
              expectedOutput: "1 2 3 4 5",
              isHidden: false,
              explanation: "Kiểm tra n = 5."
            },
            {
              id: "t5-1-tc2",
              input: "1",
              expectedOutput: "1",
              isHidden: false,
              explanation: "Kiểm tra n = 1."
            },
            {
              id: "t5-1-tc3",
              input: "10",
              expectedOutput: "1 2 3 4 5 6 7 8 9 10",
              isHidden: false,
              explanation: "Kiểm tra n = 10."
            },
            {
              id: "t5-1-tc4",
              input: "20",
              expectedOutput: "1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20",
              isHidden: true,
              explanation: "Kiểm tra n = 20."
            }
          ],
          hints: [
            "Dùng cú pháp: `for i in range(1, n + 1):`",
            "In trên một dòng: `print(i, end=' ')` hoặc dùng `print(*range(1, n + 1))`"
          ],
          solutionExplanation: "n = int(input())\nfor i in range(1, n + 1):\n    print(i, end=' ' if i < n else '\\n')"
        },
        {
          id: "t5-p-reverse",
          title: "Đếm Ngược Từ n Về 1",
          difficulty: "Cơ bản",
          problemStatement: "Viết chương trình nhập vào một số nguyên dương `n`. Sử dụng vòng lặp `for` với bước nhảy âm trong hàm `range()` để in ra các số từ `n` giảm dần về `1` trên cùng một dòng, cách nhau bởi một dấu cách.",
          inputFormat: "Một số nguyên dương n (1 <= n <= 1000).",
          outputFormat: "Các số từ n giảm dần về 1 cách nhau bởi dấu cách: n n-1 ... 1.",
          constraints: "1 <= n <= 1000.",
          sampleCases: [
            { input: "5", output: "5 4 3 2 1", explanation: "Đếm ngược từ 5 về 1." }
          ],
          starterCode: `n = int(input())\n\n# TODO: Dùng range(n, 0, -1) để in đếm ngược\n`,
          testCases: [
            { id: "t5-rev-tc1", input: "5", expectedOutput: "5 4 3 2 1", isHidden: false },
            { id: "t5-rev-tc2", input: "1", expectedOutput: "1", isHidden: false },
            { id: "t5-rev-tc3", input: "8", expectedOutput: "8 7 6 5 4 3 2 1", isHidden: true }
          ],
          hints: ["Dùng `for i in range(n, 0, -1): print(i, end=' ')`"],
          solutionExplanation: "n = int(input())\nfor i in range(n, 0, -1):\n    print(i, end=' ' if i > 1 else '\\n')"
        },
        {
          id: "t5-p-even-n",
          title: "In Các Số Chẵn Từ 1 Đến n",
          difficulty: "Cơ bản",
          problemStatement: "Viết chương trình nhập vào một số nguyên dương `n`. Sử dụng vòng lặp `for` và `range(2, n + 1, 2)` để in ra tất cả các số chẵn trong phạm vi từ 1 đến `n` trên cùng một dòng, cách nhau bởi một dấu cách.",
          inputFormat: "Một số nguyên dương n (2 <= n <= 1000).",
          outputFormat: "Dãy số chẵn cách nhau bởi dấu cách.",
          constraints: "2 <= n <= 1000.",
          sampleCases: [
            { input: "10", output: "2 4 6 8 10", explanation: "Các số chẵn từ 1 đến 10." },
            { input: "11", output: "2 4 6 8 10", explanation: "Số chẵn cuối cùng <= 11 là 10." }
          ],
          starterCode: `n = int(input())\n\n# TODO: Dùng range(2, n + 1, 2) in các số chẵn\n`,
          testCases: [
            { id: "t5-ev-tc1", input: "10", expectedOutput: "2 4 6 8 10", isHidden: false },
            { id: "t5-ev-tc2", input: "11", expectedOutput: "2 4 6 8 10", isHidden: false },
            { id: "t5-ev-tc3", input: "6", expectedOutput: "2 4 6", isHidden: true }
          ],
          hints: ["Bắt đầu từ 2, kết thúc ở n + 1, bước nhảy 2: `range(2, n + 1, 2)`."],
          solutionExplanation: "n = int(input())\nres = [str(x) for x in range(2, n + 1, 2)]\nprint(' '.join(res))"
        },
        {
          id: "t5-p-odd-n",
          title: "In Các Số Lẻ Từ 1 Đến n",
          difficulty: "Cơ bản",
          problemStatement: "Viết chương trình nhập vào một số nguyên dương `n`. Sử dụng vòng lặp `for` và `range(1, n + 1, 2)` để in ra tất cả các số lẻ trong phạm vi từ 1 đến `n` trên cùng một dòng, cách nhau bởi một dấu cách.",
          inputFormat: "Một số nguyên dương n (1 <= n <= 1000).",
          outputFormat: "Dãy số lẻ cách nhau bởi dấu cách.",
          constraints: "1 <= n <= 1000.",
          sampleCases: [
            { input: "10", output: "1 3 5 7 9", explanation: "Các số lẻ từ 1 đến 10." },
            { input: "7", output: "1 3 5 7", explanation: "Các số lẻ từ 1 đến 7." }
          ],
          starterCode: `n = int(input())\n\n# TODO: Dùng range(1, n + 1, 2) in các số lẻ\n`,
          testCases: [
            { id: "t5-od-tc1", input: "10", expectedOutput: "1 3 5 7 9", isHidden: false },
            { id: "t5-od-tc2", input: "7", expectedOutput: "1 3 5 7", isHidden: false },
            { id: "t5-od-tc3", input: "1", expectedOutput: "1", isHidden: true }
          ],
          hints: ["Bắt đầu từ 1, bước nhảy 2: `range(1, n + 1, 2)`."],
          solutionExplanation: "n = int(input())\nres = [str(x) for x in range(1, n + 1, 2)]\nprint(' '.join(res))"
        },
        // Câu 25: In số từ 1 đến 10
        toPractice(LOOPS_EXTRA_PROBLEMS[0]),
        // Câu 26: In số từ 1 đến 100
        toPractice(LOOPS_EXTRA_PROBLEMS[1]),
        // Câu 27: In các số chẵn từ 1 đến 20
        toPractice(LOOPS_EXTRA_PROBLEMS[2]),
        // Câu 28: In các số lẻ từ 1 đến 20
        toPractice(LOOPS_EXTRA_PROBLEMS[3]),
        // Câu 36: Đếm/in từng chữ cái của từ
        toPractice(LOOPS_EXTRA_PROBLEMS[11])
      ]
    },

    // ----------------------------------------------------
    // BÀI 2: TÍNH TỔNG & TÍCH LŨY VỚI FOR
    // ----------------------------------------------------
    {
      id: "t5-l2",
      moduleId: "topic-5",
      moduleTitle: "Chủ đề 5: Vòng Lặp for",
      order: 2,
      title: "Bài 2: Tính Tổng, Đếm & Kỹ Thuật Tích Lũy",
      description: "Thành thạo kỹ thuật cộng dồn biến tích lũy: tính tổng từ 1 đến n, tính tổng số chẵn, in bảng cửu chương và tìm giá trị lớn nhất.",
      durationMin: 20,
      xpReward: 60,
      theory: {
        summary: "**Tích lũy**: khởi tạo biến **trước** vòng lặp, cập nhật **trong** vòng lặp, in kết quả **sau** vòng lặp.",
        keyPoints: [
          "Khởi tạo: `tong = 0` (tích: `tich = 1`, đếm: `dem = 0`)",
          "Cập nhật: `tong += i`",
          "`print(tong)` đặt **ngoài** vòng lặp (không thụt lề).",
          "Bảng cửu chương: `print(f'{k} x {i} = {k * i}')`"
        ],
        conceptIllustration: {
          type: "loops",
          title: "Sơ Đồ Kỹ Thuật Cộng Dồn Tích Lũy",
          description: "n = 4 -> tong = 0 + 1 = 1 -> 1 + 2 = 3 -> 3 + 3 = 6 -> 6 + 4 = 10",
          visualData: {
            loopType: "for i in range(1, n + 1): tong += i",
            iterations: [
              { index: 1, state: "i = 1: tong = 1" },
              { index: 2, state: "i = 2: tong = 3" },
              { index: 3, state: "i = 3: tong = 6" },
              { index: 4, state: "i = 4: tong = 10" }
            ]
          }
        },
        examples: [
          {
            title: "Ví dụ: Tính tổng 1 đến 5",
            explanation: "1 + 2 + 3 + 4 + 5 = 15.",
            code: "n = 5\ntong = 0\nfor i in range(1, n + 1):\n    tong += i\nprint(tong)",
            output: "15"
          }
        ],
        multipleChoice: {
          question: "Để tính tổng S = 1 + 2 + ... + n, biến tổng cần được khởi tạo với giá trị ban đầu là bao nhiêu và ở vị trí nào?",
          options: [
            "Khởi tạo tong = 0 bên trong vòng lặp",
            "Khởi tạo tong = 0 trước khi bắt đầu vòng lặp",
            "Khởi tạo tong = 1 trước khi bắt đầu vòng lặp",
            "Không cần khởi tạo, Python tự gán mặc định"
          ],
          correctIndex: 1,
          explanation: "tong = 0 phải đặt TRƯỚC vòng lặp để giá trị không bị đặt lại về 0 ở mỗi lần lặp."
        }
      },
      practice: {
        id: "t5-p2",
        title: "Bài 2: Tính Tổng Các Số Từ 1 Đến n",
        difficulty: "Cơ bản",
        problemStatement: "Viết chương trình nhập vào một số nguyên dương `n`. Hãy sử dụng vòng lặp `for` để tính tổng $S = 1 + 2 + 3 + \\dots + n$ và in kết quả ra màn hình.",
        inputFormat: "Một dòng chứa số nguyên dương n (1 <= n <= 10^5).",
        outputFormat: "Một số nguyên duy nhất là giá trị của tổng S.",
        constraints: "1 <= n <= 10^5.",
        sampleCases: [
          {
            input: "5",
            output: "15",
            explanation: "1 + 2 + 3 + 4 + 5 = 15."
          },
          {
            input: "10",
            output: "55",
            explanation: "Tổng từ 1 đến 10 là 55."
          }
        ],
        starterCode: `# Nhập số nguyên dương n
n = int(input())

# TODO: Dùng vòng lặp for và biến tích lũy để tính tổng từ 1 đến n
`,
        testCases: [
          {
            id: "t5-2-tc1",
            input: "5",
            expectedOutput: "15",
            isHidden: false,
            explanation: "Kiểm tra n = 5."
          },
          {
            id: "t5-2-tc2",
            input: "10",
            expectedOutput: "55",
            isHidden: false,
            explanation: "Kiểm tra n = 10."
          },
          {
            id: "t5-2-tc3",
            input: "100",
            expectedOutput: "5050",
            isHidden: false,
            explanation: "Kiểm tra n = 100."
          },
          {
            id: "t5-2-tc4",
            input: "1",
            expectedOutput: "1",
            isHidden: true,
            explanation: "Kiểm tra n = 1."
          }
        ],
        hints: [
          "Khởi tạo `tong = 0` trước vòng lặp.",
          "Vòng lặp: `for i in range(1, n + 1): tong += i`",
          "In ra: `print(tong)`"
        ],
        solutionExplanation: "n = int(input())\ntong = 0\nfor i in range(1, n + 1):\n    tong += i\nprint(tong)"
      },
      practices: [
        {
          id: "t5-p2",
          title: "Bài 2: Tính Tổng Các Số Từ 1 Đến n",
          difficulty: "Cơ bản",
          problemStatement: "Viết chương trình nhập vào một số nguyên dương `n`. Hãy sử dụng vòng lặp `for` để tính tổng $S = 1 + 2 + 3 + \\dots + n$ và in kết quả ra màn hình.",
          inputFormat: "Một dòng chứa số nguyên dương n (1 <= n <= 10^5).",
          outputFormat: "Một số nguyên duy nhất là giá trị của tổng S.",
          constraints: "1 <= n <= 10^5.",
          sampleCases: [
            {
              input: "5",
              output: "15",
              explanation: "1 + 2 + 3 + 4 + 5 = 15."
            },
            {
              input: "10",
              output: "55",
              explanation: "Tổng từ 1 đến 10 là 55."
            }
          ],
          starterCode: `# Nhập số nguyên dương n\nn = int(input())\n\n# TODO: Dùng vòng lặp for và biến tích lũy để tính tổng từ 1 đến n\n`,
          testCases: [
            {
              id: "t5-2-tc1",
              input: "5",
              expectedOutput: "15",
              isHidden: false,
              explanation: "Kiểm tra n = 5."
            },
            {
              id: "t5-2-tc2",
              input: "10",
              expectedOutput: "55",
              isHidden: false,
              explanation: "Kiểm tra n = 10."
            },
            {
              id: "t5-2-tc3",
              input: "100",
              expectedOutput: "5050",
              isHidden: false,
              explanation: "Kiểm tra n = 100."
            },
            {
              id: "t5-2-tc4",
              input: "1",
              expectedOutput: "1",
              isHidden: true,
              explanation: "Kiểm tra n = 1."
            }
          ],
          hints: [
            "Khởi tạo `tong = 0` trước vòng lặp.",
            "Vòng lặp: `for i in range(1, n + 1): tong += i`",
            "In ra: `print(tong)`"
          ],
          solutionExplanation: "n = int(input())\ntong = 0\nfor i in range(1, n + 1):\n    tong += i\nprint(tong)"
        },
        // Câu 29: In bảng cửu chương 5
        toPractice(LOOPS_EXTRA_PROBLEMS[4]),
        // Câu 30: Tính tổng từ 1 đến 10
        toPractice(LOOPS_EXTRA_PROBLEMS[5]),
        // Câu 31: Tính tổng từ 1 đến 100
        toPractice(LOOPS_EXTRA_PROBLEMS[6]),
        // Câu 32: Tính tổng các số chẵn từ 1 đến 100
        toPractice(LOOPS_EXTRA_PROBLEMS[7]),
        // Câu 33: Đếm số chia hết cho 3 trong khoảng 1 đến 100
        toPractice(LOOPS_EXTRA_PROBLEMS[8]),
        // Câu 37: Đếm chữ a
        toPractice(LOOPS_EXTRA_PROBLEMS[12]),
        // Câu 38: Tìm số lớn nhất
        toPractice(LOOPS_EXTRA_PROBLEMS[13])
      ]
    },

    // ----------------------------------------------------
    // BÀI 3: VÒNG LẶP FOR KẾT HỢP IF
    // ----------------------------------------------------
    {
      id: "t5-l3",
      moduleId: "topic-5",
      moduleTitle: "Chủ đề 5: Vòng Lặp for",
      order: 3,
      title: "Bài 3: Vòng Lặp for Kết Hợp if (Lọc & Phân Loại)",
      description: "Kết hợp câu lệnh if bên trong vòng lặp for để chọn lọc phần tử thỏa mãn điều kiện: in số chia hết, đếm số chẵn, tính tổng có điều kiện, FizzBuzz.",
      durationMin: 20,
      xpReward: 60,
      theory: {
        summary: "Đặt **`if` trong `for`** để **lọc** hoặc **phân loại** từng phần tử.",
        keyPoints: [
          "Mẫu: `for i in range(1, n + 1):` → `if i % 2 == 0:` → `print(i)`",
          "Đếm: `if dieu_kien: count += 1`",
          "Cộng dồn: `if dieu_kien: tong += i`",
          "**FizzBuzz**: kiểm tra `i % 15 == 0` **trước**, rồi mới `% 3`, `% 5`."
        ],
        conceptIllustration: {
          type: "loops",
          title: "Sơ Đồ for Kết Hợp if Để Lọc Dữ Liệu",
          description: "Duyệt từng phần tử -> Kiểm tra điều kiện if -> Nếu True thì xử lý / đếm / cộng dồn",
          visualData: {
            loopType: "for i in range(1, 51): if i % 2 == 0",
            iterations: [
              { index: 1, state: "i = 1: 1 % 2 != 0 -> Bỏ qua" },
              { index: 2, state: "i = 2: 2 % 2 == 0 -> In 2" },
              { index: 3, state: "i = 3: 3 % 2 != 0 -> Bỏ qua" },
              { index: 4, state: "i = 4: 4 % 2 == 0 -> In 4" }
            ]
          }
        },
        examples: [
          {
            title: "Ví dụ: In số chẵn từ 1 đến 10",
            explanation: "Chỉ in ra các số chia hết cho 2.",
            code: "for i in range(1, 11):\n    if i % 2 == 0:\n        print(i, end=' ')\nprint()",
            output: "2 4 6 8 10 "
          }
        ],
        multipleChoice: {
          question: "Để kiểm tra số i vừa chia hết cho 3 vừa chia hết cho 5, điều kiện nào chuẩn xác nhất?",
          options: [
            "i % 3 == 0 and i % 5 == 0",
            "i % 3 == 0 or i % 5 == 0",
            "i % 8 == 0",
            "i / 15 == 0"
          ],
          correctIndex: 0,
          explanation: "Dùng toán tử logic `and` hoặc `i % 15 == 0` để đảm bảo chia hết cho cả 3 và 5 cùng lúc."
        }
      },
      practice: {
        id: "t5-p3",
        title: "Bài 3: In Số Chẵn Từ 1 Đến 50",
        difficulty: "Cơ bản",
        problemStatement: "Sử dụng vòng lặp `for` duyệt các số từ 1 đến 50 và kết hợp câu lệnh `if` để chỉ in ra các số chẵn trên cùng một dòng, cách nhau bởi một dấu cách.",
        inputFormat: "Không có dữ liệu đầu vào.",
        outputFormat: "Các số chẵn từ 1 đến 50 cách nhau bởi một dấu cách: 2 4 6 ... 50.",
        constraints: "Không có.",
        sampleCases: [
          {
            input: "",
            output: Array.from({ length: 25 }, (_, i) => (i + 1) * 2).join(" "),
            explanation: "In các số chẵn trong phạm vi 1 đến 50."
          }
        ],
        starterCode: `# Dùng for từ 1 đến 50 và if i % 2 == 0 để in các số chẵn
for i in range(1, 51):
    if i % 2 == 0:
        print(i, end=" " if i < 50 else "\\n")
`,
        testCases: [
          {
            id: "t5-3-tc1",
            input: "",
            expectedOutput: Array.from({ length: 25 }, (_, i) => (i + 1) * 2).join(" "),
            isHidden: false,
            explanation: "Kiểm tra dãy số chẵn 1..50."
          }
        ],
        hints: [
          "`for i in range(1, 51):`",
          "`if i % 2 == 0: print(i, end=' ')`"
        ],
        solutionExplanation: "for i in range(1, 51):\n    if i % 2 == 0:\n        print(i, end=' ' if i < 50 else '\\n')"
      },
      practices: [
        // Câu 39: In số chẵn (1-50)
        toPractice(LOOPS_EXTRA_PROBLEMS[14]),
        // Câu 40: In số chia hết cho 5
        toPractice(LOOPS_EXTRA_PROBLEMS[15]),
        // Câu 41: Đếm số chẵn từ 1 đến 100
        toPractice(LOOPS_EXTRA_PROBLEMS[16]),
        // Câu 42: Tính tổng số lẻ từ 1 đến 100
        toPractice(LOOPS_EXTRA_PROBLEMS[17]),
        // Câu 43: Đếm số lớn hơn 50
        toPractice(LOOPS_EXTRA_PROBLEMS[18]),
        // Câu 44: Tìm số chẵn lớn nhất
        toPractice(LOOPS_EXTRA_PROBLEMS[19]),
        // Câu 45: Đếm điểm đạt
        toPractice(LOOPS_EXTRA_PROBLEMS[20]),
        // Câu 46: In các số vừa chẵn vừa lớn hơn 20
        toPractice(LOOPS_EXTRA_PROBLEMS[21]),
        // Câu 47: FizzBuzz đơn giản
        toPractice(LOOPS_EXTRA_PROBLEMS[22])
      ]
    },

    // ----------------------------------------------------
    // BÀI 4: BREAK, CONTINUE & VÒNG LẶP LỒNG NHAU
    // ----------------------------------------------------
    {
      id: "t5-l4",
      moduleId: "topic-5",
      moduleTitle: "Chủ đề 5: Vòng Lặp for",
      order: 4,
      title: "Bài 4: Lệnh break, continue & Vòng Lặp Lồng Nhau",
      description: "Điều khiển luồng lặp thông minh với break (ngắt sớm), continue (bỏ qua), thuật toán kiểm tra số nguyên tố và vẽ hình học với vòng lặp lồng nhau.",
      durationMin: 25,
      xpReward: 70,
      theory: {
        summary: "**`break`** thoát vòng lặp; **`continue`** bỏ qua lượt hiện tại; **vòng lặp lồng nhau** để in hình.",
        keyPoints: [
          "`break`: **dừng hẳn** vòng lặp.",
          "`continue`: **nhảy sang lượt kế**.",
          "Số nguyên tố: `n < 2` → không; duyệt `i` từ 2 đến `int(n ** 0.5)`, nếu `n % i == 0` → **`break`**.",
          "Lồng nhau: vòng **ngoài = hàng**, vòng **trong = cột**."
        ],
        conceptIllustration: {
          type: "loops",
          title: "Sơ Đồ Hoạt Động Của break & continue",
          description: "break -> Thoát khỏi vòng lặp ngay | continue -> Bỏ qua lệnh sau, nhảy sang bước kế tiếp",
          visualData: {
            loopType: "break & continue trong for",
            iterations: [
              { index: 1, state: "if n % i == 0: is_prime = False; break" },
              { index: 2, state: "for r in range(n): for c in range(r + 1): in '*'" }
            ]
          }
        },
        examples: [
          {
            title: "Ví dụ: Kiểm tra số nguyên tố với break",
            explanation: "Số 7 chỉ chia hết cho 1 và 7 -> YES.",
            code: "n = 7\nis_prime = True\nif n < 2:\n    is_prime = False\nelse:\n    for i in range(2, int(n**0.5) + 1):\n        if n % i == 0:\n            is_prime = False\n            break\nprint('YES' if is_prime else 'NO')",
            output: "YES"
          }
        ],
        multipleChoice: {
          question: "Khi gặp lệnh break bên trong một vòng lặp for, điều gì sẽ xảy ra?",
          options: [
            "Vòng lặp dừng lại hoàn toàn và chương trình chạy tiếp dòng lệnh sau vòng lặp",
            "Bỏ qua lần lặp hiện tại và chuyển sang lần lặp tiếp theo",
            "Chương trình dừng hẳn và thoát ứng dụng",
            "Vòng lặp quay lại giá trị ban đầu"
          ],
          correctIndex: 0,
          explanation: "break thoát ngay lập tức khỏi vòng lặp chứa nó và tiếp tục thực hiện câu lệnh kế tiếp bên ngoài vòng lặp."
        }
      },
      practice: {
        id: "t5-p4",
        title: "Bài 4: Kiểm Tra Số Nguyên Tố",
        difficulty: "Trung bình",
        problemStatement: "Viết chương trình nhập vào một số nguyên `n`. Sử dụng vòng lặp `for` để kiểm tra xem `n` có phải là số nguyên tố hay không. Sử dụng lệnh `break` để thoát vòng lặp ngay khi phát hiện có ước số.\n- In ra `YES` nếu n là số nguyên tố.\n- In ra `NO` nếu n không phải số nguyên tố.",
        inputFormat: "Một dòng chứa số nguyên n (-10^6 <= n <= 10^6).",
        outputFormat: "In `YES` hoặc `NO`.",
        constraints: "-10^6 <= n <= 10^6.",
        sampleCases: [
          {
            input: "7",
            output: "YES",
            explanation: "7 là số nguyên tố."
          },
          {
            input: "9",
            output: "NO",
            explanation: "9 chia hết cho 3 nên không phải số nguyên tố."
          },
          {
            input: "1",
            output: "NO",
            explanation: "1 không phải số nguyên tố."
          }
        ],
        starterCode: `# Nhập số nguyên n
n = int(input())

# TODO: Dùng vòng lặp for và break để kiểm tra số nguyên tố
`,
        testCases: [
          {
            id: "t5-4-tc1",
            input: "7",
            expectedOutput: "YES",
            isHidden: false,
            explanation: "Kiểm tra 7."
          },
          {
            id: "t5-4-tc2",
            input: "9",
            expectedOutput: "NO",
            isHidden: false,
            explanation: "Kiểm tra 9."
          },
          {
            id: "t5-4-tc3",
            input: "1",
            expectedOutput: "NO",
            isHidden: false,
            explanation: "Kiểm tra 1."
          },
          {
            id: "t5-4-tc4",
            input: "2",
            expectedOutput: "YES",
            isHidden: false,
            explanation: "Kiểm tra 2."
          },
          {
            id: "t5-4-tc5",
            input: "97",
            expectedOutput: "YES",
            isHidden: true,
            explanation: "Kiểm tra 97 là số nguyên tố."
          }
        ],
        hints: [
          "Nếu `n < 2`: in `NO`.",
          "Duyệt `for i in range(2, int(n**0.5) + 1):`",
          "Nếu `n % i == 0`: đặt `is_prime = False` và gọi `break`."
        ],
        solutionExplanation: "n = int(input())\nif n < 2:\n    print('NO')\nelse:\n    is_prime = True\n    for i in range(2, int(n**0.5) + 1):\n        if n % i == 0:\n            is_prime = False\n            break\n    print('YES' if is_prime else 'NO')"
      },
      practices: [
        {
          id: "t5-p4",
          title: "Bài 4: Kiểm Tra Số Nguyên Tố",
          difficulty: "Trung bình",
          problemStatement: "Viết chương trình nhập vào một số nguyên `n`. Sử dụng vòng lặp `for` để kiểm tra xem `n` có phải là số nguyên tố hay không. Sử dụng lệnh `break` để thoát vòng lặp ngay khi phát hiện có ước số.\n- In ra `YES` nếu n là số nguyên tố.\n- In ra `NO` nếu n không phải số nguyên tố.",
          inputFormat: "Một dòng chứa số nguyên n (-10^6 <= n <= 10^6).",
          outputFormat: "In `YES` hoặc `NO`.",
          constraints: "-10^6 <= n <= 10^6.",
          sampleCases: [
            {
              input: "7",
              output: "YES",
              explanation: "7 là số nguyên tố."
            },
            {
              input: "9",
              output: "NO",
              explanation: "9 chia hết cho 3 nên không phải số nguyên tố."
            },
            {
              input: "1",
              output: "NO",
              explanation: "1 không phải số nguyên tố."
            }
          ],
          starterCode: `# Nhập số nguyên n\nn = int(input())\n\n# TODO: Dùng vòng lặp for và break để kiểm tra số nguyên tố\n`,
          testCases: [
            {
              id: "t5-4-tc1",
              input: "7",
              expectedOutput: "YES",
              isHidden: false,
              explanation: "Kiểm tra 7."
            },
            {
              id: "t5-4-tc2",
              input: "9",
              expectedOutput: "NO",
              isHidden: false,
              explanation: "Kiểm tra 9."
            },
            {
              id: "t5-4-tc3",
              input: "1",
              expectedOutput: "NO",
              isHidden: false,
              explanation: "Kiểm tra 1."
            },
            {
              id: "t5-4-tc4",
              input: "2",
              expectedOutput: "YES",
              isHidden: false,
              explanation: "Kiểm tra 2."
            },
            {
              id: "t5-4-tc5",
              input: "97",
              expectedOutput: "YES",
              isHidden: true,
              explanation: "Kiểm tra 97 là số nguyên tố."
            }
          ],
          hints: [
            "Nếu `n < 2`: in `NO`.",
            "Duyệt `for i in range(2, int(n**0.5) + 1):`",
            "Nếu `n % i == 0`: đặt `is_prime = False` và gọi `break`."
          ],
          solutionExplanation: "n = int(input())\nif n < 2:\n    print('NO')\nelse:\n    is_prime = True\n    for i in range(2, int(n**0.5) + 1):\n        if n % i == 0:\n            is_prime = False\n            break\n    print('YES' if is_prime else 'NO')"
        },
        // Câu 34: In hình ngôi sao
        toPractice(LOOPS_EXTRA_PROBLEMS[9]),
        // Câu 35: In hình vuông
        toPractice(LOOPS_EXTRA_PROBLEMS[10]),
        {
          id: "t5-p-diamond",
          title: "In Hình Kim Cương Bằng Dấu *",
          difficulty: "Nâng cao",
          problemStatement: "Viết chương trình nhập vào một số nguyên dương lẻ `n` (3 <= n <= 29, n là số lẻ). Sử dụng các vòng lặp `for` lồng nhau để in ra hình kim cương đối xứng bằng ký tự `*`.",
          inputFormat: "Một dòng chứa số nguyên dương lẻ n (3 <= n <= 29).",
          outputFormat: "Gồm n dòng in hình kim cương đối xứng.",
          constraints: "3 <= n <= 29, n là số lẻ.",
          sampleCases: [
            {
              input: "5",
              output: "  *\n ***\n*****\n ***\n  *",
              explanation: "Hình kim cương chiều cao 5."
            }
          ],
          starterCode: `n = int(input())\n\n# TODO: Dùng vòng lặp for in hình kim cương đối xứng\n`,
          testCases: [
            {
              id: "t5-dm-tc1",
              input: "5",
              expectedOutput: "  *\n ***\n*****\n ***\n  *",
              isHidden: false
            },
            {
              id: "t5-dm-tc2",
              input: "3",
              expectedOutput: " *\n***\n *",
              isHidden: false
            }
          ],
          hints: [
            "Đặt `mid = n // 2`.",
            "Nửa trên: i từ 0 đến mid: in `(mid - i) * ' ' + (2 * i + 1) * '*'`",
            "Nửa dưới: i từ mid - 1 về 0: in tương tự."
          ],
          solutionExplanation: "n = int(input())\nmid = n // 2\nfor i in range(mid + 1):\n    print(' ' * (mid - i) + '*' * (2 * i + 1))\nfor i in range(mid - 1, -1, -1):\n    print(' ' * (mid - i) + '*' * (2 * i + 1))"
        }
      ]
    }
  ]
};
