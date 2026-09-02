import { Module } from "../../types";

export const TOPIC_6_WHILE_LOOPS: Module = {
  id: "topic-6",
  title: "Chủ đề 6: Vòng Lặp while",
  description: "Làm quen với vòng lặp while kiểm tra điều kiện trước, kỹ thuật lặp vô hạn kết hợp break, xác thực dữ liệu đầu vào và các trò chơi tương tác.",
  iconName: "RefreshCw",
  order: 6,
  color: "from-teal-500 to-emerald-700",
  lessons: [
    {
      id: "t6-l1",
      moduleId: "topic-6",
      moduleTitle: "Chủ đề 6: Vòng Lặp while",
      order: 1,
      title: "Bài 1: Nhập Dữ Liệu Hợp Lệ [1, 20]",
      description: "Yêu cầu người dùng nhập một số trong khoảng từ 1 đến 20. Dùng while để bắt nhập lại cho đến khi hợp lệ.",
      durationMin: 20,
      xpReward: 60,
      theory: {
        summary: "Vòng lặp `while` thực thi khối lệnh lặp đi lặp lại khi điều kiện kiểm tra vẫn còn `True`. Rất hữu ích để kiểm tra tính hợp lệ của dữ liệu người dùng nhập vào.",
        keyPoints: [
          "Cú pháp: `while dieu_kien:`",
          "Kỹ thuật kiểm tra đầu vào: lặp khi `n < 1 or n > 20`.",
          "Khi nhập đúng số hợp lệ, vòng lặp kết thúc và in kết quả."
        ],
        conceptIllustration: {
          type: "loops",
          title: "Vòng Lặp Xác Thực Dữ Liệu",
          description: "Nhập n -> n < 1 hoặc n > 20? -> Đúng: Nhập lại | Sai: Hợp lệ, tiếp tục.",
          visualData: {
            loopType: "while n < 1 or n > 20",
            iterations: [
              { index: 1, state: "n = 25 (Sai, ngoài khoảng)" },
              { index: 2, state: "n = -3 (Sai, ngoài khoảng)" },
              { index: 3, state: "n = 15 (Đúng, trong [1, 20] -> Thoát)" }
            ]
          }
        },
        examples: [
          {
            title: "Ví dụ: Nhập điểm từ 0 đến 10",
            explanation: "Lặp khi điểm chưa nằm trong khoảng [0, 10].",
            code: "score = -1\n# while score < 0 or score > 10:\n#     score = float(input())",
            output: "Du lieu hop le: 8.5"
          }
        ],
        multipleChoice: {
          question: "Vòng lặp `while True:` sẽ dừng lại khi nào?",
          options: [
            "Tự động dừng sau 100 lần lặp",
            "Khi gặp câu lệnh `break`",
            "Không bao giờ dừng được",
            "Khi chương trình hết bộ nhớ"
          ],
          correctIndex: 1,
          explanation: "Vòng lặp vô hạn `while True:` sẽ dừng khi gặp lệnh `break`."
        }
      },
      practice: {
        id: "t6-p1",
        title: "Bài 1: Nhập Dữ Liệu Hợp Lệ",
        difficulty: "Cơ bản",
        problemStatement: "Viết chương trình đọc liên tiếp các số nguyên từ đầu vào cho đến khi gặp một số nằm trong đoạn $[1, 20]$ (tức là $1 \\le x \\le 20$). In ra dòng thông báo:\n`Du lieu hop le: <so_hop_le>`",
        inputFormat: "Gồm một hoặc nhiều dòng, mỗi dòng chứa một số nguyên cho đến khi gặp số trong đoạn [1, 20].",
        outputFormat: "Một dòng duy nhất: `Du lieu hop le: <so_hop_le>`",
        constraints: "Dữ liệu đảm bảo luôn có ít nhất một số hợp lệ ở cuối.",
        sampleCases: [
          {
            input: "25\n-5\n0\n15",
            output: "Du lieu hop le: 15",
            explanation: "Các số 25, -5, 0 đều ngoài khoảng [1, 20]. Số 15 hợp lệ đầu tiên."
          },
          {
            input: "8",
            output: "Du lieu hop le: 8",
            explanation: "Số 8 hợp lệ ngay lần nhập đầu tiên."
          }
        ],
        starterCode: `# Đọc dữ liệu liên tục dùng while
# TODO: Lặp đọc số cho đến khi 1 <= x <= 20
`,
        testCases: [
          {
            id: "t6-1-tc1",
            input: "25\n-5\n0\n15",
            expectedOutput: "Du lieu hop le: 15",
            isHidden: false,
            explanation: "Kiểm tra dãy có 3 số sai trước số 15."
          },
          {
            id: "t6-1-tc2",
            input: "8",
            expectedOutput: "Du lieu hop le: 8",
            isHidden: false,
            explanation: "Kiểm tra hợp lệ ngay."
          },
          {
            id: "t6-1-tc3",
            input: "100\n200\n-1\n20",
            expectedOutput: "Du lieu hop le: 20",
            isHidden: true,
            explanation: "Kiểm tra biên 20."
          }
        ],
        hints: [
          "Dùng `while True:`",
          "`x = int(input())`",
          "`if 1 <= x <= 20: print(f\"Du lieu hop le: {x}\"); break`"
        ],
        solutionExplanation: "while True:\n    x = int(input())\n    if 1 <= x <= 20:\n        print(f'Du lieu hop le: {x}')\n        break"
      }
    },
    {
      id: "t6-l2",
      moduleId: "topic-6",
      moduleTitle: "Chủ đề 6: Vòng Lặp while",
      order: 2,
      title: "Bài 2: Game Đoán Số Bí Mật",
      description: "Mô phỏng trò chơi đoán số bí mật từ 1 đến 100 với tối đa 7 lượt đoán.",
      durationMin: 25,
      xpReward: 70,
      theory: {
        summary: "Thuật toán tìm kiếm nhị phân cho phép đoán đúng một số từ 1 đến 100 trong tối đa $\\log_2(100) \\approx 7$ lần bằng cách so sánh lớn hơn / nhỏ hơn.",
        keyPoints: [
          "Mỗi lượt đoán: so sánh số đoán `guess` với số bí mật `target`.",
          "Nếu `guess < target`: in `LON HON` (số cần tìm lớn hơn số bạn đoán).",
          "Nếu `guess > target`: in `NHO HON` (số cần tìm nhỏ hơn số bạn đoán).",
          "Nếu `guess == target`: in `CHUC MUNG` và dừng cuộc chơi.",
          "Nếu sau 7 lượt vẫn chưa trúng: in `THUA CUOC`."
        ],
        conceptIllustration: {
          type: "loops",
          title: "Tìm Kiếm Đoán Số",
          description: "Target = 65 -> Guess 50 (LON HON) -> Guess 75 (NHO HON) -> Guess 65 (CHUC MUNG)",
          visualData: {
            loopType: "while attempts < 7",
            iterations: [
              { index: 1, state: "50 -> LON HON" },
              { index: 2, state: "75 -> NHO HON" },
              { index: 3, state: "65 -> CHUC MUNG" }
            ]
          }
        },
        examples: [
          {
            title: "Ví dụ: Target 40",
            explanation: "Đoán 50 -> NHO HON, Đoán 40 -> CHUC MUNG.",
            code: "# Target = 40, Guesses: [50, 40]\n# Output: NHO HON\n# CHUC MUNG",
            output: "NHO HON\nCHUC MUNG"
          }
        ],
        multipleChoice: {
          question: "Trong khoảng từ 1 đến 100, số lần đoán tối đa theo chiến thuật chia đôi (nhị phân) để chắc chắn tìm ra đáp án là bao nhiêu?",
          options: ["5 lần", "7 lần", "10 lần", "50 lần"],
          correctIndex: 1,
          explanation: "Vì 2^7 = 128 > 100, nên tối đa 7 lần chia đôi chắc chắn tìm ra mọi số từ 1 đến 100."
        }
      },
      practice: {
        id: "t6-p2",
        title: "Bài 2: Game Đoán Số",
        difficulty: "Trung bình",
        problemStatement: "Viết chương trình mô phỏng trò chơi đoán số:\n- Dòng đầu tiên là số bí mật `target` ($1 \\le target \\le 100$).\n- Các dòng tiếp theo là các số đoán `guess` của người chơi (tối đa 7 lần).\n\nQuy tắc:\n- Với mỗi lần đoán, nếu `guess < target`: in `LON HON`\n- Nếu `guess > target`: in `NHO HON`\n- Nếu `guess == target`: in `CHUC MUNG` và kết thúc ngay lập tức.\n- Nếu sau đúng 7 lần đoán mà vẫn chưa đoán trúng: in `THUA CUOC`.",
        inputFormat: "Dòng 1 là số target (1..100). Các dòng tiếp theo là các số đoán.",
        outputFormat: "Các thông báo theo quy tắc sau mỗi lần đoán.",
        constraints: "1 <= target, guess <= 100.",
        sampleCases: [
          {
            input: "50\n25\n75\n50",
            output: "LON HON\nNHO HON\nCHUC MUNG",
            explanation: "Lần 1 (25 < 50) -> LON HON. Lần 2 (75 > 50) -> NHO HON. Lần 3 (50 == 50) -> CHUC MUNG."
          },
          {
            input: "10\n1\n2\n3\n4\n5\n6\n7",
            output: "LON HON\nLON HON\nLON HON\nLON HON\nLON HON\nLON HON\nLON HON\nTHUA CUOC",
            explanation: "Hết 7 lượt không trúng -> THUA CUOC."
          }
        ],
        starterCode: `# Nhập số bí mật target
target = int(input())

# TODO: Dùng vòng lặp while/for xử lý tối đa 7 lần đoán
`,
        testCases: [
          {
            id: "t6-2-tc1",
            input: "50\n25\n75\n50",
            expectedOutput: "LON HON\nNHO HON\nCHUC MUNG",
            isHidden: false,
            explanation: "Kiểm tra đoán trúng lần 3."
          },
          {
            id: "t6-2-tc2",
            input: "10\n1\n2\n3\n4\n5\n6\n7",
            expectedOutput: "LON HON\nLON HON\nLON HON\nLON HON\nLON HON\nLON HON\nLON HON\nTHUA CUOC",
            isHidden: false,
            explanation: "Kiểm tra thua cuộc sau 7 lượt."
          },
          {
            id: "t6-2-tc3",
            input: "42\n42",
            expectedOutput: "CHUC MUNG",
            isHidden: true,
            explanation: "Kiểm tra trúng ngay lần đầu."
          }
        ],
        hints: [
          "Dùng biến đếm `count = 0` và cờ `won = False`.",
          "Vòng lặp `while count < 7:`",
          "Tăng `count += 1`, đọc `guess = int(input())`",
          "Kiểm tra so sánh với `target`."
        ],
        solutionExplanation: "target = int(input())\nwon = False\nfor _ in range(7):\n    guess = int(input())\n    if guess == target:\n        print('CHUC MUNG')\n        won = True\n        break\n    elif guess < target:\n        print('LON HON')\n    else:\n        print('NHO HON')\nif not won:\n    print('THUA CUOC')"
      }
    },
    {
      id: "t6-l3",
      moduleId: "topic-6",
      moduleTitle: "Chủ đề 6: Vòng Lặp while",
      order: 3,
      title: "Bài 3: Nhập Số Cho Đến Khi Hợp Lệ & Tính Tổng Ước",
      description: "Yêu cầu người dùng nhập một số nguyên dương n (> 0). Sử dụng while để nhập lại nếu n <= 0. Sau khi hợp lệ, in tổng các ước của số đó.",
      durationMin: 20,
      xpReward: 60,
      theory: {
        summary: "Kết hợp vòng lặp while để xác thực số nguyên dương và vòng lặp for để tìm và tính tổng tất cả các ước số dương của n.",
        keyPoints: [
          "Lặp đọc số khi `n <= 0`.",
          "Sau khi có `n > 0`, duyệt `i` từ 1 đến `n` để cộng dồn các `i` thỏa mãn `n % i == 0`.",
          "In ra: `Tong cac uoc cua {n} la: {tong_uoc}`."
        ],
        conceptIllustration: {
          type: "loops",
          title: "Xác Thực & Tính Tổng Ước",
          description: "n = -4 (Sai) -> n = 6 (Hợp lệ) -> Các ước của 6: 1, 2, 3, 6 -> Tổng = 12.",
          visualData: {
            loopType: "while n <= 0",
            iterations: [
              { index: 1, state: "-4 (Bỏ qua, nhập lại)" },
              { index: 2, state: "6 (Hợp lệ -> Ước: 1+2+3+6 = 12)" }
            ]
          }
        },
        examples: [
          {
            title: "Ví dụ: n = 6",
            explanation: "Ước của 6 là 1, 2, 3, 6. Tổng = 12.",
            code: "n = 6\n# 1 + 2 + 3 + 6 = 12\nprint('Tong cac uoc cua 6 la: 12')",
            output: "Tong cac uoc cua 6 la: 12"
          }
        ],
        multipleChoice: {
          question: "Tổng các ước dương của số 10 là bao nhiêu?",
          options: ["10", "15", "18", "8"],
          correctIndex: 2,
          explanation: "Các ước của 10 là 1, 2, 5, 10. Tổng = 1 + 2 + 5 + 10 = 18."
        }
      },
      practice: {
        id: "t6-p3",
        title: "Bài 3: Nhập Số Cho Đến Khi Hợp Lệ",
        difficulty: "Trung bình",
        problemStatement: "Viết chương trình đọc liên tiếp các số nguyên từ đầu vào cho đến khi nhận được một số nguyên dương $n > 0$. Sau đó tính tổng tất cả các ước số nguyên dương của $n$ và in ra theo định dạng:\n`Tong cac uoc cua <n> la: <tong_uoc>`",
        inputFormat: "Gồm một hoặc nhiều dòng chứa số nguyên, kết thúc bằng một số nguyên dương n > 0.",
        outputFormat: "Một dòng duy nhất: `Tong cac uoc cua <n> la: <tong_uoc>`",
        constraints: "1 <= n <= 10^5.",
        sampleCases: [
          {
            input: "-5\n0\n-12\n6",
            output: "Tong cac uoc cua 6 la: 12",
            explanation: "Các số âm và 0 bị bỏ qua. Số 6 có các ước 1, 2, 3, 6 -> Tổng = 12."
          },
          {
            input: "10",
            output: "Tong cac uoc cua 10 la: 18",
            explanation: "1 + 2 + 5 + 10 = 18."
          }
        ],
        starterCode: `# Nhập liên tục cho đến khi n > 0
# TODO: Tính tổng ước và in ra
`,
        testCases: [
          {
            id: "t6-3-tc1",
            input: "-5\n0\n-12\n6",
            expectedOutput: "Tong cac uoc cua 6 la: 12",
            isHidden: false,
            explanation: "Kiểm tra với 6 sau vài số âm."
          },
          {
            id: "t6-3-tc2",
            input: "10",
            expectedOutput: "Tong cac uoc cua 10 la: 18",
            isHidden: false,
            explanation: "Kiểm tra với 10."
          },
          {
            id: "t6-3-tc3",
            input: "-100\n13",
            expectedOutput: "Tong cac uoc cua 13 la: 14",
            isHidden: true,
            explanation: "Kiểm tra số nguyên tố 13 (ước 1, 13 -> 14)."
          }
        ],
        hints: [
          "Dùng `while True:` để đọc `n = int(input())`, nếu `n > 0: break`",
          "Sau đó tính `tong = sum(i for i in range(1, n + 1) if n % i == 0)`",
          "In ra: `print(f\"Tong cac uoc cua {n} la: {tong}\")`"
        ],
        solutionExplanation: "while True:\n    n = int(input())\n    if n > 0:\n        break\ntong = 0\nfor i in range(1, n + 1):\n    if n % i == 0:\n        tong += i\nprint(f'Tong cac uoc cua {n} la: {tong}')"
      }
    }
  ]
};
