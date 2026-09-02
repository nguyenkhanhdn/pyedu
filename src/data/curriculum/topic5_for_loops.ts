import { Module } from "../../types";

export const TOPIC_5_FOR_LOOPS: Module = {
  id: "topic-5",
  title: "Chủ đề 5: Vòng Lặp for",
  description: "Làm chủ cấu trúc vòng lặp for, hàm range(start, stop, step), câu lệnh break, continue và kỹ thuật vẽ hình học với vòng lặp lồng nhau.",
  iconName: "Repeat",
  order: 5,
  color: "from-cyan-500 to-blue-700",
  lessons: [
    {
      id: "t5-l1",
      moduleId: "topic-5",
      moduleTitle: "Chủ đề 5: Vòng Lặp for",
      order: 1,
      title: "Bài 1: Kiểm Tra Số Nguyên Tố",
      description: "Nhập số nguyên n. Sử dụng vòng lặp for để kiểm tra n có phải số nguyên tố hay không và dùng break sớm.",
      durationMin: 20,
      xpReward: 60,
      theory: {
        summary: "Số nguyên tố là số nguyên lớn hơn 1 và chỉ có đúng 2 ước dương là 1 và chính nó. Dùng vòng lặp for từ 2 đến căn bậc hai của n để kiểm tra.",
        keyPoints: [
          "Nếu `n < 2` -> Không phải số nguyên tố.",
          "Duyệt `i` từ 2 đến `int(n**0.5)` (hoặc `n - 1`). Nếu `n % i == 0` -> Có ước số khác -> Không phải số nguyên tố, dùng `break` dừng sớm.",
          "Nếu duyệt hết mà không chia hết cho số nào -> Là số nguyên tố."
        ],
        conceptIllustration: {
          type: "loops",
          title: "Kiểm Tra Số Nguyên Tố",
          description: "n = 7: duyệt i = 2, 7 % 2 != 0 -> Là số nguyên tố (YES).",
          visualData: {
            loopType: "for i in range(2, int(n**0.5) + 1)",
            iterations: [
              { index: 1, state: "i = 2: 7 % 2 != 0" },
              { index: 2, state: "Kết luận: YES" }
            ]
          }
        },
        examples: [
          {
            title: "Ví dụ: Kiểm tra 11",
            explanation: "11 chỉ chia hết cho 1 và 11 -> YES.",
            code: "n = 11\nis_prime = True\nif n < 2:\n    is_prime = False\nelse:\n    for i in range(2, int(n**0.5) + 1):\n        if n % i == 0:\n            is_prime = False\n            break\nprint('YES' if is_prime else 'NO')",
            output: "YES"
          }
        ],
        multipleChoice: {
          question: "Để dừng ngay lập tức vòng lặp khi phát hiện một ước số của n, ta sử dụng từ khóa nào?",
          options: ["continue", "break", "exit", "return"],
          correctIndex: 1,
          explanation: "Từ khóa `break` dùng để thoát ngay lập tức khỏi vòng lặp đang chạy."
        }
      },
      practice: {
        id: "t5-p1",
        title: "Bài 1: Kiểm Tra Số Nguyên Tố",
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
            id: "t5-1-tc1",
            input: "7",
            expectedOutput: "YES",
            isHidden: false,
            explanation: "Kiểm tra 7."
          },
          {
            id: "t5-1-tc2",
            input: "9",
            expectedOutput: "NO",
            isHidden: false,
            explanation: "Kiểm tra 9."
          },
          {
            id: "t5-1-tc3",
            input: "1",
            expectedOutput: "NO",
            isHidden: false,
            explanation: "Kiểm tra 1."
          },
          {
            id: "t5-1-tc4",
            input: "97",
            expectedOutput: "YES",
            isHidden: true,
            explanation: "Kiểm tra 97 là số nguyên tố."
          }
        ],
        hints: [
          "Nếu `n < 2` -> in `NO`.",
          "Duyệt `for i in range(2, int(n**0.5) + 1):`",
          "Nếu `n % i == 0` -> gán `is_prime = False` và `break`."
        ],
        solutionExplanation: "n = int(input())\nif n < 2:\n    print('NO')\nelse:\n    is_prime = True\n    for i in range(2, int(n**0.5) + 1):\n        if n % i == 0:\n            is_prime = False\n            break\n    print('YES' if is_prime else 'NO')"
      }
    },
    {
      id: "t5-l2",
      moduleId: "topic-5",
      moduleTitle: "Chủ đề 5: Vòng Lặp for",
      order: 2,
      title: "Bài 2: Bảng Cửu Chương",
      description: "Nhập một số nguyên k (1 <= k <= 10). Sử dụng vòng lặp for để in bảng cửu chương nhân của số k từ 1 đến 10.",
      durationMin: 15,
      xpReward: 50,
      theory: {
        summary: "Vòng lặp `for i in range(1, 11):` lặp qua 10 giá trị từ 1 đến 10, rất phù hợp để in bảng nhân cửu chương.",
        keyPoints: [
          "`range(1, 11)` sinh dãy số: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10.",
          "Mỗi dòng in theo mẫu: `k x i = k*i` (ví dụ `5 x 1 = 5`)."
        ],
        conceptIllustration: {
          type: "loops",
          title: "In Bảng Cửu Chương Bằng for",
          description: "Lặp i từ 1 đến 10 và in k x i = k*i",
          visualData: {
            loopType: "for i in range(1, 11)",
            iterations: [
              { index: 1, state: "5 x 1 = 5" },
              { index: 2, state: "5 x 2 = 10" },
              { index: 10, state: "5 x 10 = 50" }
            ]
          }
        },
        examples: [
          {
            title: "Ví dụ: Bảng nhân 3",
            explanation: "In 3 x 1 = 3 đến 3 x 10 = 30.",
            code: "k = 3\nfor i in range(1, 11):\n    print(f'{k} x {i} = {k * i}')",
            output: "3 x 1 = 3\n...\n3 x 10 = 30"
          }
        ],
        multipleChoice: {
          question: "Để tạo vòng lặp chạy với biến i lần lượt nhận giá trị từ 1 đến 10, hàm range() nào đúng?",
          options: ["range(1, 10)", "range(1, 11)", "range(10)", "range(0, 10)"],
          correctIndex: 1,
          explanation: "range(start, stop) sẽ dừng trước stop, nên range(1, 11) sẽ sinh các số từ 1 đến 10."
        }
      },
      practice: {
        id: "t5-p2",
        title: "Bài 2: Bảng Cửu Chương",
        difficulty: "Cơ bản",
        problemStatement: "Viết chương trình nhập vào một số nguyên `k` (1 <= k <= 10). Sử dụng vòng lặp `for` để in bảng cửu chương của `k` từ 1 đến 10 theo mẫu:\n`<k> x <i> = <k*i>`",
        inputFormat: "Một dòng chứa số nguyên k (1 <= k <= 10).",
        outputFormat: "Gồm 10 dòng theo định dạng `<k> x <i> = <k*i>` với i chạy từ 1 đến 10.",
        constraints: "1 <= k <= 10.",
        sampleCases: [
          {
            input: "5",
            output: "5 x 1 = 5\n5 x 2 = 10\n5 x 3 = 15\n5 x 4 = 20\n5 x 5 = 25\n5 x 6 = 30\n5 x 7 = 35\n5 x 8 = 40\n5 x 9 = 45\n5 x 10 = 50",
            explanation: "Bảng cửu chương 5."
          }
        ],
        starterCode: `# Nhập số k
k = int(input())

# TODO: Dùng vòng lặp for in bảng cửu chương k
`,
        testCases: [
          {
            id: "t5-2-tc1",
            input: "5",
            expectedOutput: "5 x 1 = 5\n5 x 2 = 10\n5 x 3 = 15\n5 x 4 = 20\n5 x 5 = 25\n5 x 6 = 30\n5 x 7 = 35\n5 x 8 = 40\n5 x 9 = 45\n5 x 10 = 50",
            isHidden: false,
            explanation: "Kiểm tra bảng 5."
          },
          {
            id: "t5-2-tc2",
            input: "9",
            expectedOutput: "9 x 1 = 9\n9 x 2 = 18\n9 x 3 = 27\n9 x 4 = 36\n9 x 5 = 45\n9 x 6 = 54\n9 x 7 = 63\n9 x 8 = 72\n9 x 9 = 81\n9 x 10 = 90",
            isHidden: false,
            explanation: "Kiểm tra bảng 9."
          }
        ],
        hints: [
          "Dùng `for i in range(1, 11):`",
          "`print(f\"{k} x {i} = {k * i}\")`"
        ],
        solutionExplanation: "k = int(input())\nfor i in range(1, 11):\n    print(f'{k} x {i} = {k * i}')"
      }
    },
    {
      id: "t5-l3",
      moduleId: "topic-5",
      moduleTitle: "Chủ đề 5: Vòng Lặp for",
      order: 3,
      title: "Bài 3: Tính Tổng Các Số Từ 1 Đến n",
      description: "Nhập số nguyên dương n. Sử dụng vòng lặp for để tính tổng các số từ 1 đến n.",
      durationMin: 15,
      xpReward: 50,
      theory: {
        summary: "Kỹ thuật cộng dồn sử dụng biến tích lũy `total = 0` và vòng lặp `for i in range(1, n + 1): total += i`.",
        keyPoints: [
          "Khởi tạo `total = 0` trước vòng lặp.",
          "Trong vòng lặp, mỗi bước cộng thêm giá trị `i`: `total += i`.",
          "Sau khi kết thúc vòng lặp, in ra `total`."
        ],
        conceptIllustration: {
          type: "loops",
          title: "Kỹ Thuật Cộng Dồn Tích Lũy",
          description: "n = 4 -> total = 0 + 1 + 2 + 3 + 4 = 10",
          visualData: {
            loopType: "for i in range(1, n + 1)",
            iterations: [
              { index: 1, state: "total = 1" },
              { index: 2, state: "total = 3" },
              { index: 3, state: "total = 6" },
              { index: 4, state: "total = 10" }
            ]
          }
        },
        examples: [
          {
            title: "Ví dụ: n = 5",
            explanation: "1 + 2 + 3 + 4 + 5 = 15.",
            code: "n = 5\ns = 0\nfor i in range(1, n + 1):\n    s += i\nprint(s)",
            output: "15"
          }
        ],
        multipleChoice: {
          question: "Để tính tổng S = 1 + 2 + ... + n, vòng lặp for cần duyệt i trong phạm vi nào?",
          options: ["range(n)", "range(1, n)", "range(1, n + 1)", "range(0, n)"],
          correctIndex: 2,
          explanation: "range(1, n + 1) đảm bảo i nhận giá trị từ 1 đến đúng n."
        }
      },
      practice: {
        id: "t5-p3",
        title: "Bài 3: Tổng Các Số",
        difficulty: "Cơ bản",
        problemStatement: "Viết chương trình nhập vào một số nguyên dương `n`. Sử dụng vòng lặp `for` để tính tổng các số nguyên từ 1 đến `n` ($S = 1 + 2 + \\dots + n$) và in ra kết quả.",
        inputFormat: "Một dòng chứa số nguyên dương n (1 <= n <= 10^5).",
        outputFormat: "Một dòng in ra giá trị tổng S.",
        constraints: "1 <= n <= 10^5.",
        sampleCases: [
          {
            input: "5",
            output: "15",
            explanation: "1 + 2 + 3 + 4 + 5 = 15."
          },
          {
            input: "100",
            output: "5050",
            explanation: "Tổng từ 1 đến 100 bằng 5050."
          }
        ],
        starterCode: `# Nhập số nguyên dương n
n = int(input())

# TODO: Dùng vòng lặp for tính tổng 1 + ... + n
`,
        testCases: [
          {
            id: "t5-3-tc1",
            input: "5",
            expectedOutput: "15",
            isHidden: false,
            explanation: "Kiểm tra n = 5."
          },
          {
            id: "t5-3-tc2",
            input: "100",
            expectedOutput: "5050",
            isHidden: false,
            explanation: "Kiểm tra n = 100."
          },
          {
            id: "t5-3-tc3",
            input: "1",
            expectedOutput: "1",
            isHidden: true,
            explanation: "Kiểm tra n = 1."
          }
        ],
        hints: [
          "Khởi tạo `tong = 0`",
          "`for i in range(1, n + 1): tong += i`",
          "`print(tong)`"
        ],
        solutionExplanation: "n = int(input())\ntong = 0\nfor i in range(1, n + 1):\n    tong += i\nprint(tong)"
      }
    },
    {
      id: "t5-l4",
      moduleId: "topic-5",
      moduleTitle: "Chủ đề 5: Vòng Lặp for",
      order: 4,
      title: "Bài 4: In Hình Kim Cương Bằng Dấu *",
      description: "Nhập chiều cao n (n là số lẻ >= 3). Sử dụng vòng lặp for để in hình kim cương đối xứng bằng ký tự *.",
      durationMin: 25,
      xpReward: 70,
      theory: {
        summary: "Hình kim cương gồm 2 phần: nửa trên là tam giác cân mở rộng và nửa dưới là tam giác cân thu hẹp.",
        keyPoints: [
          "Với `n` là số lẻ, đặt `mid = n // 2`.",
          "Nửa trên (i từ 0 đến mid): số khoảng trắng là `mid - i`, số dấu sao là `2 * i + 1`.",
          "Nửa dưới (i từ mid - 1 lùi về 0): số khoảng trắng là `mid - i`, số dấu sao là `2 * i + 1`."
        ],
        conceptIllustration: {
          type: "loops",
          title: "Cấu Trúc Hình Kim Cương n = 5",
          description: "mid = 2: (i=0: 2 cách 1 sao) | (i=1: 1 cách 3 sao) | (i=2: 0 cách 5 sao) | (i=1: 1 cách 3 sao) | (i=0: 2 cách 1 sao)",
          visualData: {
            loopType: "for i in range(mid + 1) & for i in range(mid - 1, -1, -1)",
            iterations: [
              { index: 1, state: "  *" },
              { index: 2, state: " ***" },
              { index: 3, state: "*****" },
              { index: 4, state: " ***" },
              { index: 5, state: "  *" }
            ]
          }
        },
        examples: [
          {
            title: "Ví dụ: n = 3",
            explanation: "Kim cương cao 3 dòng.",
            code: "n = 3\n# Dòng 1:  *\n# Dòng 2: ***\n# Dòng 3:  *",
            output: " *\n***\n *"
          }
        ],
        multipleChoice: {
          question: "Với hình kim cương có chiều cao n = 5, dòng rộng nhất ở giữa (dòng 3) chứa bao nhiêu ký tự *?",
          options: ["3", "4", "5", "6"],
          correctIndex: 2,
          explanation: "Dòng giữa của hình kim cương kích thước n = 5 chứa đúng 5 dấu sao không có khoảng trắng ở đầu."
        }
      },
      practice: {
        id: "t5-p4",
        title: "Bài 4: In Hình Kim Cương",
        difficulty: "Nâng cao",
        problemStatement: "Viết chương trình nhập vào một số nguyên dương lẻ `n` ($3 \\le n \\le 19$). Hãy sử dụng các vòng lặp `for` để in ra một hình kim cương đối xứng cao đúng `n` dòng bằng ký tự `*`.\n\nVí dụ với `n = 5`:\n  *\n ***\n*****\n ***\n  *",
        inputFormat: "Một dòng chứa số nguyên dương lẻ n (3 <= n <= 19).",
        outputFormat: "Gồm n dòng tạo thành hình kim cương đối xứng hoàn hảo.",
        constraints: "3 <= n <= 19 (n là số lẻ).",
        sampleCases: [
          {
            input: "5",
            output: "  *\n ***\n*****\n ***\n  *",
            explanation: "Hình kim cương chiều cao n = 5."
          },
          {
            input: "3",
            output: " *\n***\n *",
            explanation: "Hình kim cương chiều cao n = 3."
          }
        ],
        starterCode: `# Nhập số lẻ n
n = int(input())

# TODO: Dùng vòng lặp for in hình kim cương đối xứng
`,
        testCases: [
          {
            id: "t5-4-tc1",
            input: "5",
            expectedOutput: "  *\n ***\n*****\n ***\n  *",
            isHidden: false,
            explanation: "Kiểm tra n = 5."
          },
          {
            id: "t5-4-tc2",
            input: "3",
            expectedOutput: " *\n***\n *",
            isHidden: false,
            explanation: "Kiểm tra n = 3."
          },
          {
            id: "t5-4-tc3",
            input: "7",
            expectedOutput: "   *\n  ***\n *****\n*******\n *****\n  ***\n   *",
            isHidden: true,
            explanation: "Kiểm tra n = 7."
          }
        ],
        hints: [
          "Đặt `mid = n // 2`",
          "Nửa trên: `for i in range(mid + 1): print(' ' * (mid - i) + '*' * (2 * i + 1))`",
          "Nửa dưới: `for i in range(mid - 1, -1, -1): print(' ' * (mid - i) + '*' * (2 * i + 1))`"
        ],
        solutionExplanation: "n = int(input())\nmid = n // 2\nfor i in range(mid + 1):\n    print(' ' * (mid - i) + '*' * (2 * i + 1))\nfor i in range(mid - 1, -1, -1):\n    print(' ' * (mid - i) + '*' * (2 * i + 1))"
      }
    }
  ]
};
