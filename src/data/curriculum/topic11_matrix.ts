import { Module } from "../../types";

export const TOPIC_11_MATRIX: Module = {
  id: "topic-11",
  title: "Chủ đề 11: List 2 Chiều / Ma Trận",
  description: "Làm việc với mảng 2 chiều (List of Lists), ma trận vuông, đường chéo chính, đường chéo phụ, tìm kiếm tọa độ cực trị và các phép biến đổi ma trận.",
  iconName: "Grid",
  order: 11,
  color: "from-violet-500 to-purple-700",
  lessons: [
    {
      id: "t11-l1",
      moduleId: "topic-11",
      moduleTitle: "Chủ đề 11: List 2 Chiều / Ma Trận",
      order: 1,
      title: "Bài 1: Nhập & In Ma Trận Vuông Cấp n",
      description: "Nhập ma trận vuông cấp n (n dòng, mỗi dòng n số). In ma trận ra màn hình theo đúng dạng bảng hàng và cột.",
      durationMin: 20,
      xpReward: 60,
      theory: {
        summary: "Ma trận trong Python được biểu diễn bằng danh sách các danh sách (Nested List): `matrix = [list(map(int, input().split())) for _ in range(n)]`.",
        keyPoints: [
          "`matrix[i][j]`: Phần tử ở hàng `i`, cột `j`.",
          "In ma trận: Duyệt từng hàng `row` trong `matrix` và in `print(*row)`."
        ],
        conceptIllustration: {
          type: "arrays",
          title: "Cấu Trúc Ma Trận 2D",
          description: "matrix[i][j] với i là hàng, j là cột",
          visualData: {
            array: [1, 2, 3, 4],
            pointers: [
              { index: 0, label: "Hàng 0, Cột 0" },
              { index: 3, label: "Hàng 1, Cột 1" }
            ]
          }
        },
        examples: [
          {
            title: "Ví dụ: Ma trận 2x2",
            explanation: "Nhập n = 2 và in ra 2 dòng.",
            code: "n = 2\nm = [[1, 2], [3, 4]]\nfor row in m:\n    print(*row)",
            output: "1 2\n3 4"
          }
        ],
        multipleChoice: {
          question: "Trong ma trận `m = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]`, giá trị của `m[1][2]` là bao nhiêu?",
          options: ["2", "4", "6", "8"],
          correctIndex: 2,
          explanation: "m[1] là hàng thứ hai [4, 5, 6], phần tử ở chỉ số cột 2 là 6."
        }
      },
      practice: {
        id: "t1-p11-1",
        title: "Bài 1: Nhập Ma Trận",
        difficulty: "Cơ bản",
        problemStatement: "Viết chương trình nhập vào số nguyên dương `n` ($1 \\le n \\le 50$) là kích thước của ma trận vuông cấp $n \\times n$. Sau đó nhập tiếp $n$ dòng, mỗi dòng gồm $n$ số nguyên cách nhau bởi dấu cách. In lại toàn bộ ma trận ra màn hình theo đúng định dạng hàng và cột.",
        inputFormat: "Dòng 1: Số nguyên dương n. Tiếp theo là n dòng, mỗi dòng gồm n số nguyên.",
        outputFormat: "Gồm n dòng, mỗi dòng chứa n số nguyên cách nhau bởi 1 khoảng trắng.",
        constraints: "1 <= n <= 50.",
        sampleCases: [
          {
            input: "3\n1 2 3\n4 5 6\n7 8 9",
            output: "1 2 3\n4 5 6\n7 8 9",
            explanation: "In ma trận 3x3."
          }
        ],
        starterCode: `# Nhập kích thước n
n = int(input())

# TODO: Đọc ma trận n dòng và in ra
`,
        testCases: [
          {
            id: "t11-1-tc1",
            input: "3\n1 2 3\n4 5 6\n7 8 9",
            expectedOutput: "1 2 3\n4 5 6\n7 8 9",
            isHidden: false,
            explanation: "Kiểm tra 3x3."
          },
          {
            id: "t11-1-tc2",
            input: "2\n10 20\n30 40",
            expectedOutput: "10 20\n30 40",
            isHidden: false,
            explanation: "Kiểm tra 2x2."
          }
        ],
        hints: [
          "`matrix = [list(map(int, input().split())) for _ in range(n)]`",
          "`for row in matrix: print(*row)`"
        ],
        solutionExplanation: "n = int(input())\nmatrix = [list(map(int, input().split())) for _ in range(n)]\nfor row in matrix:\n    print(*row)"
      }
    },
    {
      id: "t11-l2",
      moduleId: "topic-11",
      moduleTitle: "Chủ đề 11: List 2 Chiều / Ma Trận",
      order: 2,
      title: "Bài 2: Tổng Đường Chéo Chính",
      description: "Nhập ma trận vuông cấp n. Tính tổng các phần tử nằm trên đường chéo chính (A[i][i]).",
      durationMin: 20,
      xpReward: 60,
      theory: {
        summary: "Đường chéo chính của ma trận vuông cấp $n$ tập hợp các phần tử có chỉ số hàng bằng chỉ số cột: $A[i][i]$ với $0 \\le i < n$.",
        keyPoints: [
          "Công thức: $S_{chinh} = \\sum_{i=0}^{n-1} A[i][i]$.",
          "Duyệt: `tong = sum(matrix[i][i] for i in range(n))`."
        ],
        conceptIllustration: {
          type: "arrays",
          title: "Đường Chéo Chính Ma Trận",
          description: "[ [1, 2], [3, 4] ] -> Đường chéo chính gồm 1 và 4 -> Tổng = 5.",
          visualData: {
            array: [1, 4],
            pointers: [
              { index: 0, label: "A[0][0] = 1" },
              { index: 1, label: "A[1][1] = 4" }
            ]
          }
        },
        examples: [
          {
            title: "Ví dụ: Ma trận 3x3",
            explanation: "[[1, 2, 3], [4, 5, 6], [7, 8, 9]] -> Đường chéo chính: 1 + 5 + 9 = 15.",
            code: "m = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]\nprint(sum(m[i][i] for i in range(3)))",
            output: "15"
          }
        ],
        multipleChoice: {
          question: "Chỉ số phần tử nằm trên đường chéo chính của ma trận có đặc điểm gì?",
          options: ["i + j == n - 1", "i == j", "i > j", "i < j"],
          correctIndex: 1,
          explanation: "Mọi phần tử trên đường chéo chính đều có chỉ số hàng i bằng chỉ số cột j (i == j)."
        }
      },
      practice: {
        id: "t1-p11-2",
        title: "Bài 2: Tổng Đường Chéo Chính",
        difficulty: "Trung bình",
        problemStatement: "Viết chương trình nhập vào số nguyên dương `n` ($1 \\le n \\le 100$) và ma trận vuông cấp $n \\times n$. Hãy tính tổng các phần tử nằm trên đường chéo chính của ma trận và in ra kết quả theo mẫu:\n`Tong duong cheo chinh: <tong>`",
        inputFormat: "Dòng 1: n. Tiếp theo là n dòng, mỗi dòng n số nguyên.",
        outputFormat: "Một dòng: `Tong duong cheo chinh: <tong>`",
        constraints: "1 <= n <= 100.",
        sampleCases: [
          {
            input: "3\n1 2 3\n4 5 6\n7 8 9",
            output: "Tong duong cheo chinh: 15",
            explanation: "1 + 5 + 9 = 15."
          }
        ],
        starterCode: `# Nhập ma trận vuông cấp n
n = int(input())
matrix = [list(map(int, input().split())) for _ in range(n)]

# TODO: Tính tổng đường chéo chính và in theo mẫu
`,
        testCases: [
          {
            id: "t11-2-tc1",
            input: "3\n1 2 3\n4 5 6\n7 8 9",
            expectedOutput: "Tong duong cheo chinh: 15",
            isHidden: false,
            explanation: "Kiểm tra ma trận 3x3."
          },
          {
            id: "t11-2-tc2",
            input: "2\n10 5\n8 20",
            expectedOutput: "Tong duong cheo chinh: 30",
            isHidden: false,
            explanation: "Kiểm tra 10 + 20 = 30."
          }
        ],
        hints: [
          "`tong = sum(matrix[i][i] for i in range(n))`",
          "`print(f'Tong duong cheo chinh: {tong}')`"
        ],
        solutionExplanation: "n = int(input())\nmatrix = [list(map(int, input().split())) for _ in range(n)]\ntong = sum(matrix[i][i] for i in range(n))\nprint(f'Tong duong cheo chinh: {tong}')"
      }
    },
    {
      id: "t11-l3",
      moduleId: "topic-11",
      moduleTitle: "Chủ đề 11: List 2 Chiều / Ma Trận",
      order: 3,
      title: "Bài 3: Tổng Đường Chéo Phụ",
      description: "Nhập ma trận vuông cấp n. Tính tổng các phần tử nằm trên đường chéo phụ (A[i][n - 1 - i]).",
      durationMin: 20,
      xpReward: 60,
      theory: {
        summary: "Đường chéo phụ của ma trận vuông cấp $n$ tập hợp các phần tử có tổng chỉ số hàng và cột thỏa mãn: $i + j = n - 1$, hay phần tử $A[i][n - 1 - i]$.",
        keyPoints: [
          "Công thức: $S_{phu} = \\sum_{i=0}^{n-1} A[i][n - 1 - i]$.",
          "Duyệt: `tong = sum(matrix[i][n - 1 - i] for i in range(n))`."
        ],
        conceptIllustration: {
          type: "arrays",
          title: "Đường Chéo Phụ Ma Trận",
          description: "[[1, 2, 3], [4, 5, 6], [7, 8, 9]] -> Đường chéo phụ: 3 + 5 + 7 = 15.",
          visualData: {
            array: [3, 5, 7],
            pointers: [
              { index: 0, label: "A[0][2] = 3" },
              { index: 1, label: "A[1][1] = 5" },
              { index: 2, label: "A[2][0] = 7" }
            ]
          }
        },
        examples: [
          {
            title: "Ví dụ: Ma trận 2x2",
            explanation: "[[1, 2], [3, 4]] -> Đường chéo phụ: 2 + 3 = 5.",
            code: "m = [[1, 2], [3, 4]]\nprint(m[0][1] + m[1][0])",
            output: "5"
          }
        ],
        multipleChoice: {
          question: "Trong ma trận vuông cấp n, phần tử nằm trên đường chéo phụ ở hàng thứ i có chỉ số cột là gì?",
          options: ["i", "n - i", "n - 1 - i", "i + 1"],
          correctIndex: 2,
          explanation: "Vì i + j = n - 1 nên chỉ số cột j = n - 1 - i."
        }
      },
      practice: {
        id: "t1-p11-3",
        title: "Bài 3: Tổng Đường Chéo Phụ",
        difficulty: "Trung bình",
        problemStatement: "Viết chương trình nhập vào số nguyên dương `n` ($1 \\le n \\le 100$) và ma trận vuông cấp $n \\times n$. Hãy tính tổng các phần tử nằm trên đường chéo phụ của ma trận và in ra kết quả theo mẫu:\n`Tong duong cheo phu: <tong>`",
        inputFormat: "Dòng 1: n. Tiếp theo là n dòng, mỗi dòng n số nguyên.",
        outputFormat: "Một dòng: `Tong duong cheo phu: <tong>`",
        constraints: "1 <= n <= 100.",
        sampleCases: [
          {
            input: "3\n1 2 3\n4 5 6\n7 8 9",
            output: "Tong duong cheo phu: 15",
            explanation: "3 + 5 + 7 = 15."
          }
        ],
        starterCode: `# Nhập ma trận vuông cấp n
n = int(input())
matrix = [list(map(int, input().split())) for _ in range(n)]

# TODO: Tính tổng đường chéo phụ và in theo mẫu
`,
        testCases: [
          {
            id: "t11-3-tc1",
            input: "3\n1 2 3\n4 5 6\n7 8 9",
            expectedOutput: "Tong duong cheo phu: 15",
            isHidden: false,
            explanation: "Kiểm tra 3x3."
          },
          {
            id: "t11-3-tc2",
            input: "2\n1 8\n9 4",
            expectedOutput: "Tong duong cheo phu: 17",
            isHidden: false,
            explanation: "Kiểm tra 8 + 9 = 17."
          }
        ],
        hints: [
          "`tong = sum(matrix[i][n - 1 - i] for i in range(n))`",
          "`print(f'Tong duong cheo phu: {tong}')`"
        ],
        solutionExplanation: "n = int(input())\nmatrix = [list(map(int, input().split())) for _ in range(n)]\ntong = sum(matrix[i][n - 1 - i] for i in range(n))\nprint(f'Tong duong cheo phu: {tong}')"
      }
    },
    {
      id: "t11-l4",
      moduleId: "topic-11",
      moduleTitle: "Chủ đề 11: List 2 Chiều / Ma Trận",
      order: 4,
      title: "Bài 4: Tìm Phần Tử Lớn Nhất & Tọa Độ Trong Ma Trận",
      description: "Nhập ma trận số nguyên kích thước m x n. Tìm giá trị lớn nhất và vị trí (hàng, cột) xuất hiện đầu tiên của nó.",
      durationMin: 20,
      xpReward: 60,
      theory: {
        summary: "Duyệt qua tất cả các phần tử của ma trận bằng 2 vòng lặp `for i in range(m): for j in range(n):` để tìm giá trị cực đại và lưu lại tọa độ `(r, c)`.",
        keyPoints: [
          "Khởi tạo `max_val = matrix[0][0]`, `row_idx = 0`, `col_idx = 0`.",
          "Nếu `matrix[i][j] > max_val`: cập nhật `max_val = matrix[i][j]`, `row_idx = i`, `col_idx = j`."
        ],
        conceptIllustration: {
          type: "arrays",
          title: "Tìm Max Trong Ma Trận",
          description: "m = [[1, 9], [4, 5]] -> Max = 9 tại hàng 0, cột 1.",
          visualData: {
            array: [9],
            pointers: [
              { index: 0, label: "Max = 9 (hang 0, cot 1)" }
            ]
          }
        },
        examples: [
          {
            title: "Ví dụ: Ma trận 2x3",
            explanation: "[[2, 8, 4], [1, 9, 3]] -> Max = 9 tại hàng 1, cột 1.",
            code: "m = [[2, 8, 4], [1, 9, 3]]\n# Max: 9\n# Hang: 1, Cot: 1",
            output: "Max: 9\nVi tri: hang 1, cot 1"
          }
        ],
        multipleChoice: {
          question: "Để duyệt toàn bộ phần tử của ma trận kích thước m hàng và n cột, số lần lặp tổng cộng là bao nhiêu?",
          options: ["m + n", "m * n", "m ^ n", "2 * (m + n)"],
          correctIndex: 1,
          explanation: "Ma trận m x n có tổng cộng m * n phần tử, do đó cần m * n lần lặp."
        }
      },
      practice: {
        id: "t1-p11-4",
        title: "Bài 4: Tìm Phần Tử Lớn Nhất",
        difficulty: "Trung bình",
        problemStatement: "Viết chương trình nhập vào 2 số nguyên dương `m` và `n` ($1 \\le m, n \\le 100$) trên dòng đầu tiên, đại diện cho số hàng và số cột của ma trận. Tiếp theo là `m` dòng, mỗi dòng gồm `n` số nguyên. Hãy tìm giá trị lớn nhất trong ma trận và vị trí chỉ số (hàng, cột bắt đầu từ 0) xuất hiện đầu tiên của nó. In ra theo định dạng:\n`Gia tri lon nhat: <max_val>`\n`Vi tri: hang <r>, cot <c>`",
        inputFormat: "Dòng 1: m n. Tiếp theo là m dòng, mỗi dòng n số nguyên.",
        outputFormat: "Gồm 2 dòng theo đúng mẫu mô tả.",
        constraints: "1 <= m, n <= 100.",
        sampleCases: [
          {
            input: "2 3\n2 8 4\n1 9 3",
            output: "Gia tri lon nhat: 9\nVi tri: hang 1, cot 1",
            explanation: "Số 9 lớn nhất nằm ở hàng chỉ số 1, cột chỉ số 1."
          }
        ],
        starterCode: `# Nhập m và n
m, n = map(int, input().split())
matrix = [list(map(int, input().split())) for _ in range(m)]

# TODO: Tìm max_val và vị trí hàng, cột
`,
        testCases: [
          {
            id: "t11-4-tc1",
            input: "2 3\n2 8 4\n1 9 3",
            expectedOutput: "Gia tri lon nhat: 9\nVi tri: hang 1, cot 1",
            isHidden: false,
            explanation: "Kiểm tra 2x3."
          },
          {
            id: "t11-4-tc2",
            input: "1 4\n10 50 30 20",
            expectedOutput: "Gia tri lon nhat: 50\nVi tri: hang 0, cot 1",
            isHidden: false,
            explanation: "Kiểm tra 1 hàng."
          }
        ],
        hints: [
          "`max_val = matrix[0][0]; r = 0; c = 0`",
          "`for i in range(m): for j in range(n): if matrix[i][j] > max_val: max_val = matrix[i][j]; r = i; c = j`"
        ],
        solutionExplanation: "m, n = map(int, input().split())\nmatrix = [list(map(int, input().split())) for _ in range(m)]\nmax_val = matrix[0][0]\nr, c = 0, 0\nfor i in range(m):\n    for j in range(n):\n        if matrix[i][j] > max_val:\n            max_val = matrix[i][j]\n            r, c = i, j\nprint(f'Gia tri lon nhat: {max_val}')\nprint(f'Vi tri: hang {r}, cot {c}')"
      }
    }
  ]
};
