import { Module } from "../../types";

export const TOPIC_10_LISTS: Module = {
  id: "topic-10",
  title: "Chủ đề 10: Danh Sách (List)",
  description: "Làm chủ cấu trúc dữ liệu danh sách list, các thao tác duyệt mảng, tìm min/max, lọc phần tử, thuật toán sắp xếp nổi bọt (Bubble Sort) tăng dần và giảm dần.",
  iconName: "Layers",
  order: 10,
  color: "from-blue-500 to-indigo-700",
  lessons: [
    {
      id: "t10-l1",
      moduleId: "topic-10",
      moduleTitle: "Chủ đề 10: Danh Sách (List)",
      order: 1,
      title: "Bài 1: Nhập & Xử Lý Danh Sách Số Nguyên",
      description: "Nhập một danh sách các số nguyên cách nhau bởi dấu cách. In danh sách, phần tử đầu tiên, phần tử cuối cùng và số lượng phần tử.",
      durationMin: 15,
      xpReward: 50,
      theory: {
        summary: "Kỹ thuật nhập một dòng chứa nhiều số nguyên trong Python: `a = list(map(int, input().split()))`.",
        keyPoints: [
          "`input().split()`: Tách chuỗi theo dấu cách.",
          "`map(int, ...)`: Ép kiểu từng phần tử thành số nguyên.",
          "`a[0]`: Phần tử đầu tiên; `a[-1]`: Phần tử cuối cùng.",
          "`len(a)`: Số lượng phần tử."
        ],
        conceptIllustration: {
          type: "arrays",
          title: "Truy Cập Phần Tử Trong List",
          description: "a = [10, 20, 30, 40] -> a[0] = 10 (đầu), a[-1] = 40 (cuối), len(a) = 4",
          visualData: {
            array: [10, 20, 30, 40],
            pointers: [
              { index: 0, label: "a[0]" },
              { index: 3, label: "a[-1]" }
            ]
          }
        },
        examples: [
          {
            title: "Ví dụ: Nhập [5, 2, 9, 1]",
            explanation: "Đầu: 5, Cuối: 1, Số lượng: 4.",
            code: "a = [5, 2, 9, 1]\nprint(a)\nprint('Dau:', a[0])\nprint('Cuoi:', a[-1])\nprint('So luong:', len(a))",
            output: "[5, 2, 9, 1]\nDau: 5\nCuoi: 1\nSo luong: 4"
          }
        ],
        multipleChoice: {
          question: "Để lấy phần tử cuối cùng của một danh sách `a` bất kể độ dài bao nhiêu, chỉ số nào ngắn gọn nhất?",
          options: ["a[len(a)]", "a[-1]", "a[end]", "a[last]"],
          correctIndex: 1,
          explanation: "Chỉ số âm `a[-1]` trong Python luôn trỏ tới phần tử cuối cùng của danh sách."
        }
      },
      practice: {
        id: "t1-p10-1",
        title: "Bài 1: Nhập và Xử Lý Danh Sách",
        difficulty: "Cơ bản",
        problemStatement: "Viết chương trình nhập vào một danh sách các số nguyên trên một dòng (các số cách nhau bởi khoảng trắng). Hãy in ra 4 dòng:\n- Dòng 1: In danh sách vừa nhập (dưới dạng list Python, ví dụ `[1, 2, 3]`)\n- Dòng 2: `Phan tu dau: <a[0]>`\n- Dòng 3: `Phan tu cuoi: <a[-1]>`\n- Dòng 4: `So luong: <len(a)>`",
        inputFormat: "Một dòng chứa các số nguyên cách nhau bởi dấu cách (danh sách có ít nhất 1 phần tử).",
        outputFormat: "Gồm 4 dòng theo đúng mẫu mô tả.",
        constraints: "1 <= len(a) <= 1000.",
        sampleCases: [
          {
            input: "10 25 30 45 50",
            output: "[10, 25, 30, 45, 50]\nPhan tu dau: 10\nPhan tu cuoi: 50\nSo luong: 5",
            explanation: "Danh sách 5 phần tử, đầu là 10, cuối là 50."
          }
        ],
        starterCode: `# Nhập danh sách số nguyên
a = list(map(int, input().split()))

# TODO: In danh sách, phần tử đầu, cuối và số lượng phần tử
`,
        testCases: [
          {
            id: "t10-1-tc1",
            input: "10 25 30 45 50",
            expectedOutput: "[10, 25, 30, 45, 50]\nPhan tu dau: 10\nPhan tu cuoi: 50\nSo luong: 5",
            isHidden: false,
            explanation: "Kiểm tra 5 phần tử."
          },
          {
            id: "t10-1-tc2",
            input: "7",
            expectedOutput: "[7]\nPhan tu dau: 7\nPhan tu cuoi: 7\nSo luong: 1",
            isHidden: false,
            explanation: "Kiểm tra 1 phần tử."
          }
        ],
        hints: [
          "`print(a)`",
          "`print(f'Phan tu dau: {a[0]}')`",
          "`print(f'Phan tu cuoi: {a[-1]}')`",
          "`print(f'So luong: {len(a)}')`"
        ],
        solutionExplanation: "a = list(map(int, input().split()))\nprint(a)\nprint(f'Phan tu dau: {a[0]}')\nprint(f'Phan tu cuoi: {a[-1]}')\nprint(f'So luong: {len(a)}')"
      }
    },
    {
      id: "t10-l2",
      moduleId: "topic-10",
      moduleTitle: "Chủ đề 10: Danh Sách (List)",
      order: 2,
      title: "Bài 2: Tìm Giá Trị Lớn Nhất & Nhỏ Nhất",
      description: "Nhập một danh sách số nguyên. Tìm giá trị lớn nhất (Max) và nhỏ nhất (Min) trong danh sách.",
      durationMin: 20,
      xpReward: 60,
      theory: {
        summary: "Thuật toán tìm Min/Max duyệt qua từng phần tử và cập nhật giá trị lớn nhất/nhỏ nhất tìm thấy.",
        keyPoints: [
          "Gán `max_val = min_val = a[0]`.",
          "Duyệt `for x in a:` nếu `x > max_val: max_val = x`, nếu `x < min_val: min_val = x`.",
          "Độ phức tạp thời gian: $O(N)$."
        ],
        conceptIllustration: {
          type: "arrays",
          title: "Duyệt Tìm Min và Max",
          description: "a = [8, 3, 9, 1, 6] -> Min = 1, Max = 9",
          visualData: {
            array: [8, 3, 9, 1, 6],
            pointers: [
              { index: 3, label: "Min = 1" },
              { index: 2, label: "Max = 9" }
            ]
          }
        },
        examples: [
          {
            title: "Ví dụ: [12, 5, 28, 3]",
            explanation: "Max = 28, Min = 3.",
            code: "a = [12, 5, 28, 3]\nprint('Max:', max(a))\nprint('Min:', min(a))",
            output: "Max: 28\nMin: 3"
          }
        ],
        multipleChoice: {
          question: "Để tìm phần tử lớn nhất trong danh sách a có n phần tử, số phép so sánh tối thiểu cần thực hiện là bao nhiêu?",
          options: ["1", "n - 1", "n", "n * n"],
          correctIndex: 1,
          explanation: "Cần duyệt qua n - 1 phần tử còn lại để so sánh với phần tử đầu tiên."
        }
      },
      practice: {
        id: "t1-p10-2",
        title: "Bài 2: Tìm Giá Trị Lớn Nhất và Nhỏ Nhất",
        difficulty: "Cơ bản",
        problemStatement: "Viết chương trình nhập vào một danh sách các số nguyên trên một dòng. Hãy tìm và in ra giá trị lớn nhất và nhỏ nhất của danh sách theo định dạng:\n`Max: <max_val>`\n`Min: <min_val>`",
        inputFormat: "Một dòng chứa các số nguyên cách nhau bởi dấu cách (ít nhất 1 số).",
        outputFormat: "Gồm 2 dòng:\nMax: <max_val>\nMin: <min_val>",
        constraints: "1 <= len(a) <= 10^5.",
        sampleCases: [
          {
            input: "8 3 9 1 6",
            output: "Max: 9\nMin: 1",
            explanation: "Số lớn nhất là 9, số nhỏ nhất là 1."
          }
        ],
        starterCode: `# Nhập danh sách số nguyên
a = list(map(int, input().split()))

# TODO: Tìm Max, Min và in theo mẫu
`,
        testCases: [
          {
            id: "t10-2-tc1",
            input: "8 3 9 1 6",
            expectedOutput: "Max: 9\nMin: 1",
            isHidden: false,
            explanation: "Kiểm tra danh sách 5 số."
          },
          {
            id: "t10-2-tc2",
            input: "-15 -3 -50 -2",
            expectedOutput: "Max: -2\nMin: -50",
            isHidden: false,
            explanation: "Kiểm tra toàn số âm."
          }
        ],
        hints: [
          "Dùng `max(a)` và `min(a)` hoặc vòng lặp duyệt `for x in a:`",
          "`print(f'Max: {max(a)}')`",
          "`print(f'Min: {min(a)}')`"
        ],
        solutionExplanation: "a = list(map(int, input().split()))\nprint(f'Max: {max(a)}')\nprint(f'Min: {min(a)}')"
      }
    },
    {
      id: "t10-l3",
      moduleId: "topic-10",
      moduleTitle: "Chủ đề 10: Danh Sách (List)",
      order: 3,
      title: "Bài 3: Đếm & Lọc Số Chẵn Trong Danh Sách",
      description: "Nhập một danh sách số nguyên. Đếm số lượng phần tử chẵn và in ra các số chẵn đó.",
      durationMin: 20,
      xpReward: 60,
      theory: {
        summary: "Kỹ thuật lọc (filtering) phần tử trong danh sách thỏa mãn điều kiện `x % 2 == 0` bằng List Comprehension: `chan = [x for x in a if x % 2 == 0]`.",
        keyPoints: [
          "Lọc số chẵn: `evens = [x for x in a if x % 2 == 0]`.",
          "Số lượng: `len(evens)`.",
          "In ra: `print(*evens)` (in các số cách nhau bởi dấu cách)."
        ],
        conceptIllustration: {
          type: "arrays",
          title: "Lọc Phần Tử Chẵn",
          description: "[1, 2, 3, 4, 5, 6] -> lọc % 2 == 0 -> [2, 4, 6] (3 số)",
          visualData: {
            array: [1, 2, 3, 4, 5, 6],
            pointers: [
              { index: 1, label: "2" },
              { index: 3, label: "4" },
              { index: 5, label: "6" }
            ]
          }
        },
        examples: [
          {
            title: "Ví dụ: [4, 7, 2, 9, 8]",
            explanation: "Có 3 số chẵn là 4, 2, 8.",
            code: "a = [4, 7, 2, 9, 8]\ne = [x for x in a if x % 2 == 0]\nprint('So luong so chan:', len(e))\nprint('Cac so chan:', *e)",
            output: "So luong so chan: 3\nCac so chan: 4 2 8"
          }
        ],
        multipleChoice: {
          question: "Cú pháp List Comprehension nào lọc ra danh sách các số chẵn từ danh sách a?",
          options: [
            "[x in a if x % 2 == 0]",
            "[x for x in a if x % 2 == 0]",
            "[if x % 2 == 0 for x in a]",
            "filter(a, x % 2 == 0)"
          ],
          correctIndex: 1,
          explanation: "[x for x in a if x % 2 == 0] là cú pháp chuẩn của List Comprehension trong Python."
        }
      },
      practice: {
        id: "t1-p10-3",
        title: "Bài 3: Đếm Số Chẵn",
        difficulty: "Cơ bản",
        problemStatement: "Viết chương trình nhập vào một danh sách các số nguyên trên một dòng. Hãy đếm số lượng phần tử là số chẵn và in ra các số chẵn đó theo thứ tự xuất hiện ban đầu (cách nhau bởi dấu cách).\n\nĐịnh dạng in:\n- Dòng 1: `So luong so chan: <count>`\n- Dòng 2: `Cac so chan: <danh_sach_so_chan>` (nếu không có số chẵn nào thì in `Cac so chan: Khong co`)",
        inputFormat: "Một dòng chứa danh sách số nguyên.",
        outputFormat: "Gồm 2 dòng theo đúng mẫu.",
        constraints: "1 <= len(a) <= 1000.",
        sampleCases: [
          {
            input: "1 2 3 4 5 6",
            output: "So luong so chan: 3\nCac so chan: 2 4 6",
            explanation: "Có 3 số chẵn là 2, 4, 6."
          },
          {
            input: "1 3 5 7",
            output: "So luong so chan: 0\nCac so chan: Khong co",
            explanation: "Không có số chẵn nào."
          }
        ],
        starterCode: `# Nhập danh sách số nguyên
a = list(map(int, input().split()))

# TODO: Đếm và in các số chẵn
`,
        testCases: [
          {
            id: "t10-3-tc1",
            input: "1 2 3 4 5 6",
            expectedOutput: "So luong so chan: 3\nCac so chan: 2 4 6",
            isHidden: false,
            explanation: "Kiểm tra có 3 số chẵn."
          },
          {
            id: "t10-3-tc2",
            input: "1 3 5 7",
            expectedOutput: "So luong so chan: 0\nCac so chan: Khong co",
            isHidden: false,
            explanation: "Kiểm tra không có số chẵn."
          }
        ],
        hints: [
          "`evens = [x for x in a if x % 2 == 0]`",
          "`print(f'So luong so chan: {len(evens)}')`",
          "`if evens: print('Cac so chan:', *evens) else: print('Cac so chan: Khong co')`"
        ],
        solutionExplanation: "a = list(map(int, input().split()))\nevens = [x for x in a if x % 2 == 0]\nprint(f'So luong so chan: {len(evens)}')\nif evens:\n    print('Cac so chan:', *evens)\nelse:\n    print('Cac so chan: Khong co')"
      }
    },
    {
      id: "t10-l4",
      moduleId: "topic-10",
      moduleTitle: "Chủ đề 10: Danh Sách (List)",
      order: 4,
      title: "Bài 4: Sắp Xếp Nổi Bọt (Bubble Sort Tăng Dần)",
      description: "Nhập danh sách số nguyên. Sắp xếp danh sách theo thứ tự tăng dần bằng thuật toán Bubble Sort mà không sử dụng hàm có sẵn.",
      durationMin: 25,
      xpReward: 70,
      theory: {
        summary: "Thuật toán sắp xếp nổi bọt (Bubble Sort) lặp qua danh sách, so sánh hai phần tử liền kề `a[j]` và `a[j+1]`. Nếu `a[j] > a[j+1]`, ta hoán đổi vị trí của chúng để phần tử lớn nhất dần nổi về cuối.",
        keyPoints: [
          "2 vòng lặp lồng nhau:",
          "  - `for i in range(n):`",
          "  - `for j in range(0, n - i - 1):`",
          "Nếu `a[j] > a[j + 1]`: `a[j], a[j + 1] = a[j + 1], a[j]`",
          "Độ phức tạp thời gian: $O(N^2)$."
        ],
        conceptIllustration: {
          type: "arrays",
          title: "Cơ Chế Sắp Xếp Nổi Bọt Tăng Dần",
          description: "[5, 1, 4, 2] -> Đổi 5 và 1 -> [1, 5, 4, 2] -> Đổi 5 và 4 -> [1, 4, 5, 2] -> Đổi 5 và 2 -> [1, 4, 2, 5]",
          visualData: {
            array: [1, 2, 4, 5],
            pointers: [
              { index: 0, label: "Nhỏ nhất" },
              { index: 3, label: "Lớn nhất" }
            ]
          }
        },
        examples: [
          {
            title: "Ví dụ: Sắp xếp [5, 2, 9, 1]",
            explanation: "Sau Bubble Sort thu được [1, 2, 5, 9].",
            code: "a = [5, 2, 9, 1]\nn = len(a)\nfor i in range(n):\n    for j in range(n - i - 1):\n        if a[j] > a[j + 1]:\n            a[j], a[j + 1] = a[j + 1], a[j]\nprint(*a)",
            output: "1 2 5 9"
          }
        ],
        multipleChoice: {
          question: "Trong Python, câu lệnh nào thực hiện hoán đổi giá trị của hai phần tử a[j] và a[j+1] mà không cần biến tạm?",
          options: [
            "swap(a[j], a[j+1])",
            "a[j], a[j+1] = a[j+1], a[j]",
            "a[j] = a[j+1]; a[j+1] = a[j]",
            "a[j] <=> a[j+1]"
          ],
          correctIndex: 1,
          explanation: "Cơ chế Tuple Unpacking trong Python `a[j], a[j+1] = a[j+1], a[j]` hoán đổi giá trị trực tiếp và an toàn."
        }
      },
      practice: {
        id: "t1-p10-4",
        title: "Bài 4: Sắp Xếp Nổi Bọt",
        difficulty: "Trung bình",
        problemStatement: "Viết chương trình nhập vào một danh sách các số nguyên trên một dòng. Sử dụng thuật toán Sắp xếp nổi bọt (Bubble Sort) để sắp xếp danh sách theo thứ tự TĂNG DẦN. Không sử dụng hàm `.sort()` hoặc `sorted()` có sẵn.\n\nIn ra các phần tử sau khi đã sắp xếp cách nhau bởi một khoảng trắng.",
        inputFormat: "Một dòng chứa danh sách số nguyên.",
        outputFormat: "Một dòng chứa các số đã sắp xếp tăng dần.",
        constraints: "1 <= len(a) <= 500.",
        sampleCases: [
          {
            input: "64 34 25 12 22 11 90",
            output: "11 12 22 25 34 64 90",
            explanation: "Dãy được sắp xếp tăng dần từ 11 đến 90."
          }
        ],
        starterCode: `# Nhập danh sách số nguyên
a = list(map(int, input().split()))

# TODO: Cài đặt thuật toán Bubble Sort tăng dần
`,
        testCases: [
          {
            id: "t10-4-tc1",
            input: "64 34 25 12 22 11 90",
            expectedOutput: "11 12 22 25 34 64 90",
            isHidden: false,
            explanation: "Kiểm tra dãy 7 số."
          },
          {
            id: "t10-4-tc2",
            input: "5 1 4 2 8",
            expectedOutput: "1 2 4 5 8",
            isHidden: false,
            explanation: "Kiểm tra dãy 5 số."
          }
        ],
        hints: [
          "`n = len(a)`",
          "`for i in range(n):`",
          "  `for j in range(0, n - i - 1):`",
          "    `if a[j] > a[j + 1]: a[j], a[j + 1] = a[j + 1], a[j]`",
          "`print(*a)`"
        ],
        solutionExplanation: "a = list(map(int, input().split()))\nn = len(a)\nfor i in range(n):\n    for j in range(0, n - i - 1):\n        if a[j] > a[j + 1]:\n            a[j], a[j + 1] = a[j + 1], a[j]\nprint(*a)"
      }
    },
    {
      id: "t10-l5",
      moduleId: "topic-10",
      moduleTitle: "Chủ đề 10: Danh Sách (List)",
      order: 5,
      title: "Bài 5: Sắp Xếp Nổi Bọt Giảm Dần",
      description: "Dựa trên thuật toán Bubble Sort, sắp xếp một danh sách số nguyên theo thứ tự giảm dần từ lớn đến bé.",
      durationMin: 20,
      xpReward: 60,
      theory: {
        summary: "Để sắp xếp giảm dần, ta chỉ cần đổi dấu so sánh trong Bubble Sort: Nếu `a[j] < a[j + 1]` thì thực hiện hoán đổi.",
        keyPoints: [
          "Điều kiện hoán đổi giảm dần: `if a[j] < a[j + 1]: a[j], a[j + 1] = a[j + 1], a[j]`.",
          "Phần tử nhỏ nhất sẽ dần nổi về phía cuối danh sách."
        ],
        conceptIllustration: {
          type: "arrays",
          title: "Sắp Xếp Giảm Dần",
          description: "[3, 8, 1, 9] -> Giảm dần -> [9, 8, 3, 1]",
          visualData: {
            array: [9, 8, 3, 1],
            pointers: [
              { index: 0, label: "Lớn nhất" },
              { index: 3, label: "Nhỏ nhất" }
            ]
          }
        },
        examples: [
          {
            title: "Ví dụ: Sắp giảm dần [2, 5, 1, 8]",
            explanation: "Kết quả: 8 5 2 1.",
            code: "a = [2, 5, 1, 8]\nn = len(a)\nfor i in range(n):\n    for j in range(n - i - 1):\n        if a[j] < a[j + 1]:\n            a[j], a[j + 1] = a[j + 1], a[j]\nprint(*a)",
            output: "8 5 2 1"
          }
        ],
        multipleChoice: {
          question: "Để chuyển thuật toán Bubble Sort từ tăng dần sang giảm dần, ta cần thay đổi điều kiện nào?",
          options: [
            "Đổi `a[j] > a[j+1]` thành `a[j] < a[j+1]`",
            "Đổi vòng lặp `for i in range(n)` thành `for i in range(-n)`",
            "Đổi `a[j], a[j+1] = a[j+1], a[j]` thành dấu trừ",
            "Không thể làm được bằng Bubble Sort"
          ],
          correctIndex: 0,
          explanation: "Chỉ cần đảo dấu so sánh `a[j] < a[j+1]` thì các phần tử nhỏ hơn sẽ bị đẩy lùi về sau."
        }
      },
      practice: {
        id: "t1-p10-5",
        title: "Bài 5: Sắp Xếp Giảm Dần",
        difficulty: "Trung bình",
        problemStatement: "Viết chương trình nhập vào một danh sách các số nguyên trên một dòng. Sử dụng thuật toán Bubble Sort để sắp xếp danh sách theo thứ tự GIẢM DẦN (từ lớn nhất đến nhỏ nhất). Không sử dụng hàm `.sort()` hoặc `sorted()` có sẵn.\n\nIn ra các phần tử sau khi đã sắp xếp giảm dần cách nhau bởi một khoảng trắng.",
        inputFormat: "Một dòng chứa danh sách số nguyên.",
        outputFormat: "Một dòng chứa các số đã sắp xếp giảm dần.",
        constraints: "1 <= len(a) <= 500.",
        sampleCases: [
          {
            input: "12 45 2 99 34",
            output: "99 45 34 12 2",
            explanation: "Sắp xếp giảm dần từ 99 đến 2."
          }
        ],
        starterCode: `# Nhập danh sách số nguyên
a = list(map(int, input().split()))

# TODO: Cài đặt thuật toán Bubble Sort sắp xếp giảm dần
`,
        testCases: [
          {
            id: "t10-5-tc1",
            input: "12 45 2 99 34",
            expectedOutput: "99 45 34 12 2",
            isHidden: false,
            explanation: "Kiểm tra 5 số."
          },
          {
            id: "t10-5-tc2",
            input: "1 2 3 4 5",
            expectedOutput: "5 4 3 2 1",
            isHidden: false,
            explanation: "Kiểm tra đảo ngược dãy."
          }
        ],
        hints: [
          "`if a[j] < a[j + 1]: a[j], a[j + 1] = a[j + 1], a[j]`"
        ],
        solutionExplanation: "a = list(map(int, input().split()))\nn = len(a)\nfor i in range(n):\n    for j in range(0, n - i - 1):\n        if a[j] < a[j + 1]:\n            a[j], a[j + 1] = a[j + 1], a[j]\nprint(*a)"
      }
    }
  ]
};
