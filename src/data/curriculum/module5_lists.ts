import { Module } from "../../types";

export const MODULE_5_LISTS: Module = {
  id: "module-5",
  title: "Chương 5: Cấu Trúc Dữ Liệu Danh Sách (List)",
  description: "Làm chủ cấu trúc dữ liệu quan trọng bậc nhất trong Python: Khởi tạo mảng động, truy cập chỉ số, duyệt danh sách, các phương thức thêm/xóa/sắp xếp và thống kê.",
  iconName: "Layers",
  order: 5,
  color: "from-emerald-500 to-green-700",
  lessons: [
    {
      id: "lesson-15",
      moduleId: "module-5",
      moduleTitle: "Chương 5: Cấu Trúc Dữ Liệu Danh Sách",
      order: 1,
      title: "Bài 15: Danh Sách (List) - Khởi Tạo, Chỉ Số & Duyệt Phần Tử",
      description: "Học cách tạo danh sách rỗng, truy xuất phần tử theo chỉ số index, thay đổi giá trị và sử dụng các hàm thống kê len(), sum(), min(), max().",
      durationMin: 25,
      xpReward: 70,
      theory: {
        summary: "Danh sách (List) trong Python là tập hợp các phần tử có thứ tự và có thể thay đổi được (Mutable). Một danh sách có thể chứa các phần tử thuộc nhiều kiểu dữ liệu khác nhau, được bao bọc trong cặp ngoặc vuông `[...]`.",
        keyPoints: [
          "**Khởi tạo**: `a = [10, 20, 30, 40]` hoặc danh sách rỗng `a = []`.",
          "**Truy cập & Gán**: `a[0]` (phần tử đầu), `a[-1]` (phần tử cuối). Có thể gán lại giá trị: `a[1] = 99`.",
          "**Duyệt danh sách**:",
          "  - Cách 1: `for x in a:` (duyệt trực tiếp qua từng phần tử).",
          "  - Cách 2: `for i in range(len(a)):` (duyệt qua từng chỉ số).",
          "**Các hàm dựng sẵn tiện lợi**:",
          "  - `len(a)`: Số lượng phần tử.",
          "  - `sum(a)`: Tổng tất cả các phần tử số trong list.",
          "  - `max(a)`, `min(a)`: Giá trị lớn nhất, nhỏ nhất."
        ],
        conceptIllustration: {
          type: "syntax",
          title: "Cấu trúc bộ nhớ danh sách List",
          description: "Mảng động các phần tử được lập chỉ mục tuần tự",
          visualData: {
            codeSnippet: "scores = [8.5, 9.0, 7.5, 10.0]\nprint(len(scores))   # 4\nprint(sum(scores))   # 35.0\nprint(max(scores))   # 10.0\nprint(min(scores))   # 7.5",
            outputPreview: "Số lượng: 4 | Max: 10.0 | Min: 7.5 | Điểm TB: 8.75",
            explanation: "Các hàm chuẩn của Python giúp xử lý danh sách nhanh chóng mà không cần viết vòng lặp thủ công."
          }
        },
        examples: [
          {
            title: "Ví dụ: Tính tổng các số chẵn trong danh sách",
            explanation: "Duyệt qua danh sách và kiểm tra x % 2 == 0.",
            code: "numbers = [12, 7, 18, 5, 20]\ntong_chan = 0\nfor x in numbers:\n    if x % 2 == 0:\n        tong_chan += x\nprint(f\"Tong chan: {tong_chan}\")",
            output: "Tong chan: 50"
          }
        ],
        multipleChoice: {
          question: "Nếu `a = [5, 10, 15, 20]`, lệnh `sum(a)` và `max(a)` sẽ lần lượt trả về kết quả là gì?",
          options: [
            "50 và 20",
            "40 và 20",
            "50 và 15",
            "4 và 20"
          ],
          correctIndex: 0,
          explanation: "Tổng các phần tử: 5 + 10 + 15 + 20 = 50. Phần tử lớn nhất là 20."
        }
      },
      practice: {
        id: "practice-15",
        title: "Thử thách 15: Thống Kê Điểm Số & Tìm Giá Trị Lớn Nhất",
        difficulty: "Cơ bản",
        problemStatement: "Viết chương trình nhập vào số nguyên dương `N` (số lượng phần tử), sau đó nhập tiếp `N` số nguyên (mỗi số trên 1 dòng) và lưu vào một danh sách.\n\nHãy in ra 2 dòng:\n- Dòng 1: Tổng của tất cả các phần tử chẵn trong danh sách.\n- Dòng 2: Giá trị lớn nhất (max) trong toàn bộ danh sách.",
        inputFormat: "Dòng đầu chứa số nguyên N (1 <= N <= 1000).\nN dòng tiếp theo, mỗi dòng chứa một số nguyên.",
        outputFormat: "In ra 2 dòng theo yêu cầu.",
        constraints: "1 <= N <= 1000, giá trị các phần tử trong khoảng [-10^6, 10^6].",
        sampleCases: [
          {
            input: "5\n12\n7\n18\n5\n20",
            output: "50\n20",
            explanation: "Các số chẵn là 12, 18, 20 -> tổng = 50. Phần tử lớn nhất là 20."
          }
        ],
        starterCode: `n = int(input())
numbers = []
for _ in range(n):
    numbers.append(int(input()))

# Tính tổng các số chẵn
tong_chan = sum(x for x in numbers if x % 2 == 0)

# Tìm giá trị lớn nhất
gia_tri_max = max(numbers)

print(tong_chan)
print(gia_tri_max)
`,
        testCases: [
          {
            id: "tc15-1",
            input: "5\n12\n7\n18\n5\n20",
            expectedOutput: "50\n20",
            isHidden: false,
            explanation: "Danh sách 5 phần tử: 12, 7, 18, 5, 20"
          },
          {
            id: "tc15-2",
            input: "3\n1\n3\n5",
            expectedOutput: "0\n5",
            isHidden: false,
            explanation: "Không có số chẵn nào -> tổng chẵn là 0, max là 5"
          },
          {
            id: "tc15-3",
            input: "4\n-10\n-20\n-5\n-8",
            expectedOutput: "-38\n-5",
            isHidden: true,
            explanation: "Các số âm: tổng chẵn là -38, max là -5"
          }
        ],
        hints: [
          "Dùng vòng lặp for _ in range(n): numbers.append(int(input())).",
          "Tổng các phần tử chẵn: sum(x for x in numbers if x % 2 == 0).",
          "Lớn nhất: max(numbers)."
        ],
        solutionExplanation: "n = int(input())\nnumbers = [int(input()) for _ in range(n)]\nprint(sum(x for x in numbers if x % 2 == 0))\nprint(max(numbers))"
      }
    },
    {
      id: "lesson-16",
      moduleId: "module-5",
      moduleTitle: "Chương 5: Cấu Trúc Dữ Liệu Danh Sách",
      order: 2,
      title: "Bài 16: Các Phương Thức Thao Tác Với List (append, pop, sort)",
      description: "Thành thạo các phương thức biến đổi danh sách tại chỗ: append(), insert(), pop(), remove(), sort() và reverse().",
      durationMin: 25,
      xpReward: 70,
      theory: {
        summary: "List trong Python hỗ trợ nhiều phương thức mạnh mẽ cho phép thêm, sửa, xóa và sắp xếp phần tử trực tiếp mà không cần tạo mảng mới.",
        keyPoints: [
          "**Thêm phần tử**:",
          "  - `a.append(x)`: Thêm `x` vào cuối danh sách.",
          "  - `a.insert(i, x)`: Chèn `x` vào vị trí chỉ số `i`.",
          "**Xóa phần tử**:",
          "  - `a.pop()`: Xóa và trả về phần tử cuối cùng (hoặc `a.pop(i)` xóa tại vị trí `i`).",
          "  - `a.remove(x)`: Xóa phần tử đầu tiên có giá trị bằng `x`.",
          "**Sắp xếp & Đảo ngược**:",
          "  - `a.sort()`: Sắp xếp các phần tử tăng dần tại chỗ.",
          "  - `a.sort(reverse=True)`: Sắp xếp giảm dần.",
          "  - `a.reverse()`: Đảo ngược thứ tự các phần tử."
        ],
        conceptIllustration: {
          type: "syntax",
          title: "Các thao tác với List trong Python",
          description: "Minh họa append, pop và sort",
          visualData: {
            codeSnippet: "a = [30, 10, 20]\na.append(50)      # [30, 10, 20, 50]\na.pop()           # [30, 10, 20]\na.sort()          # [10, 20, 30]\na.reverse()       # [30, 20, 10]",
            outputPreview: "Kết quả sau sort: [10, 20, 30]\nKết quả sau reverse: [30, 20, 10]",
            explanation: "Các phương thức này thay đổi trực tiếp nội dung của danh sách."
          }
        },
        examples: [
          {
            title: "Ví dụ: Lọc số dương và sắp xếp tăng dần",
            explanation: "Dùng append và sort.",
            code: "raw = [-5, 12, 0, -3, 8, 2]\npositives = []\nfor x in raw:\n    if x > 0:\n        positives.append(x)\npositives.sort()\nprint(positives)",
            output: "[2, 8, 12]"
          }
        ],
        multipleChoice: {
          question: "Để thêm một phần tử giá trị 100 vào cuối danh sách `lst`, ta sử dụng lệnh nào?",
          options: [
            "lst.add(100)",
            "lst.append(100)",
            "lst.push(100)",
            "lst.insert(100)"
          ],
          correctIndex: 1,
          explanation: "Trong Python, phương thức chính thức để thêm vào cuối List là .append()."
        }
      },
      practice: {
        id: "practice-16",
        title: "Thử thách 16: Lọc Số Dương & Sắp Xếp Tăng Dần",
        difficulty: "Trung bình",
        problemStatement: "Viết chương trình nhập vào số nguyên dương `N`, sau đó nhập `N` số nguyên (mỗi số trên một dòng).\n\nHãy lọc ra tất cả các số nguyên dương (`x > 0`), sắp xếp chúng theo thứ tự **tăng dần** và in từng số trên một dòng.",
        inputFormat: "Dòng đầu chứa N (1 <= N <= 1000).\nN dòng tiếp theo, mỗi dòng chứa một số nguyên.",
        outputFormat: "In các số nguyên dương đã sắp xếp tăng dần, mỗi số trên một dòng.",
        constraints: "Dữ liệu đảm bảo có ít nhất một số dương.",
        sampleCases: [
          {
            input: "6\n-5\n12\n0\n-3\n8\n2",
            output: "2\n8\n12",
            explanation: "Các số dương là 12, 8, 2. Sắp xếp tăng dần là 2, 8, 12."
          }
        ],
        starterCode: `n = int(input())
positives = []

for _ in range(n):
    val = int(input())
    if val > 0:
        positives.append(val)

# Sắp xếp tăng dần bằng phương thức .sort()
positives.sort()

# In từng phần tử ra màn hình
for x in positives:
    print(x)
`,
        testCases: [
          {
            id: "tc16-1",
            input: "6\n-5\n12\n0\n-3\n8\n2",
            expectedOutput: "2\n8\n12",
            isHidden: false,
            explanation: "Lọc và sắp xếp: 2, 8, 12"
          },
          {
            id: "tc16-2",
            input: "4\n50\n10\n40\n20",
            expectedOutput: "10\n20\n40\n50",
            isHidden: false,
            explanation: "Tất cả đều dương: 10, 20, 40, 50"
          },
          {
            id: "tc16-3",
            input: "5\n-1\n-2\n100\n-3\n5",
            expectedOutput: "5\n100",
            isHidden: true,
            explanation: "Số dương xen kẽ số âm: 5, 100"
          }
        ],
        hints: [
          "Tạo mảng rỗng positives = [].",
          "Nếu val > 0 thì positives.append(val).",
          "Gọi positives.sort() rồi duyệt in for x in positives: print(x)."
        ],
        solutionExplanation: "n = int(input())\npos = []\nfor _ in range(n):\n    v = int(input())\n    if v > 0:\n        pos.append(v)\npos.sort()\nfor x in pos:\n    print(x)"
      }
    }
  ]
};
