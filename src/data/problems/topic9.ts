import { AlgorithmProblem } from "../../types";

export const TOPIC_9_PROBLEMS: AlgorithmProblem[] = [
  {
    id: "cd9-bai-1",
    title: "Bài 1. Khai Báo & Xuất Dictionary Học Sinh",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 9: Dictionary (Từ điển) trong Python",
    difficulty: "Dễ",
    tags: ["dict", "Khai báo", "Key-Value"],
    points: 20,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 9: Dictionary (Từ điển)",
    problemStatement: `Viết chương trình nhập vào thông tin học sinh:
- Dòng 1: Tên (str)
- Dòng 2: Tuổi (int)
- Dòng 3: Điểm (float)

Lưu vào dictionary ` + "`student = {'ten': ..., 'tuoi': ..., 'diem': ...}`" + ` và in ra 3 dòng theo mẫu:
ten: <ten>
tuoi: <tuoi>
diem: <diem>`,
    inputFormat: "Gồm 3 dòng: Tên, Tuổi, Điểm.",
    outputFormat: "3 dòng in các cặp key: value.",
    constraints: "Tuổi > 0, Điểm >= 0",
    sampleCases: [
      {
        input: "Nguyen Nam\n13\n9.5",
        output: "ten: Nguyen Nam\ntuoi: 13\ndiem: 9.5",
        explanation: "In ra 3 thuộc tính của dictionary."
      }
    ],
    starterCode: `ten = input().strip()
tuoi = int(input())
diem = float(input())

student = {"ten": ten, "tuoi": tuoi, "diem": diem}
for k, v in student.items():
    print(f"{k}: {v}")
`,
    hints: [
      "Tạo dictionary `{'ten': ten, 'tuoi': tuoi, 'diem': diem}` và duyệt `.items()`."
    ],
    solutionExplanation: `Sử dụng cấu trúc dict và vòng lặp qua các cặp items().`,
    testCases: [
      { id: "cd9-b1-t1", input: "Nguyen Nam\n13\n9.5", expectedOutput: "ten: Nguyen Nam\ntuoi: 13\ndiem: 9.5", isHidden: false },
      { id: "cd9-b1-t2", input: "Le Mai\n11\n8.0", expectedOutput: "ten: Le Mai\ntuoi: 11\ndiem: 8.0", isHidden: false }
    ]
  },
  {
    id: "cd9-bai-2",
    title: "Bài 2. Thêm Cặp Key-Value Mới Vào Dictionary",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 9: Dictionary (Từ điển) trong Python",
    difficulty: "Dễ",
    tags: ["dict", "Thêm phần tử", "Gán key"],
    points: 20,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 9: Dictionary (Từ điển)",
    problemStatement: `Cho sẵn dictionary: ` + "`d = {'toan': 9, 'van': 8}`" + `.
Viết chương trình nhập vào tên môn học mới ` + "`mon`" + ` (dòng 1) và điểm số ` + "`diem`" + ` (dòng 2, số nguyên).
Thêm môn học và điểm vào dictionary ` + "`d[mon] = diem`" + `, sau đó in ra số lượng môn học hiện tại và danh sách các môn (keys) cách nhau bởi dấu cách.`,
    inputFormat: "Gồm 2 dòng: Tên môn và Điểm.",
    outputFormat: "Gồm 2 dòng:\n- Dòng 1: Số lượng môn (len(d))\n- Dòng 2: Danh sách các tên môn cách nhau dấu cách",
    constraints: "Tên môn là chuỗi chữ cái",
    sampleCases: [
      {
        input: "anh\n9",
        output: "3\ntoan van anh",
        explanation: "Thêm môn 'anh' thì dict có 3 môn."
      }
    ],
    starterCode: `d = {"toan": 9, "van": 8}
mon = input().strip()
diem = int(input())

d[mon] = diem
print(len(d))
print(*d.keys())
`,
    hints: [
      "Cú pháp gán `d[key] = value` để thêm hoặc cập nhật phần tử trong dictionary."
    ],
    solutionExplanation: `Thao tác gán d[key] = value chèn một key mới vào dictionary.`,
    testCases: [
      { id: "cd9-b2-t1", input: "anh\n9", expectedOutput: "3\ntoan van anh", isHidden: false },
      { id: "cd9-b2-t2", input: "tin\n10", expectedOutput: "3\ntoan van tin", isHidden: false }
    ]
  },
  {
    id: "cd9-bai-3",
    title: "Bài 3. Cập Nhật Giá Trị Của Key Trong Dictionary",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 9: Dictionary (Từ điển) trong Python",
    difficulty: "Dễ",
    tags: ["dict", "Cập nhật", "Gán giá trị"],
    points: 20,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 9: Dictionary (Từ điển)",
    problemStatement: `Cho dictionary điểm ban đầu: ` + "`scores = {'Toan': 7.0, 'Van': 6.5, 'Anh': 8.0}`" + `.
Viết chương trình nhập vào điểm mới cho môn 'Toan' (số thực), cập nhật giá trị ` + "`scores['Toan'] = diem_moi`" + ` và in ra điểm trung bình của 3 môn sau khi cập nhật (làm tròn 2 chữ số thập phân).`,
    inputFormat: "Một số thực là điểm Toán mới.",
    outputFormat: "Điểm trung bình mới (định dạng {:.2f}).",
    constraints: "0.0 <= Điểm <= 10.0",
    sampleCases: [
      {
        input: "9.5",
        output: "8.00",
        explanation: "ĐTB mới = (9.5 + 6.5 + 8.0) / 3 = 24.0 / 3 = 8.00."
      }
    ],
    starterCode: `scores = {"Toan": 7.0, "Van": 6.5, "Anh": 8.0}
diem_moi = float(input())

scores["Toan"] = diem_moi
dtb = sum(scores.values()) / len(scores)
print(f"{dtb:.2f}")
`,
    hints: [
      "Gán `scores['Toan'] = diem_moi`, tính tổng bằng `sum(scores.values())`."
    ],
    solutionExplanation: `Cập nhật giá trị một key có sẵn bằng phép gán trực tiếp.`,
    testCases: [
      { id: "cd9-b3-t1", input: "9.5", expectedOutput: "8.00", isHidden: false },
      { id: "cd9-b3-t2", input: "7.0", expectedOutput: "7.17", isHidden: false }
    ]
  },
  {
    id: "cd9-bai-4",
    title: "Bài 4. Xóa Phần Tử Khỏi Dictionary (pop / del)",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 9: Dictionary (Từ điển) trong Python",
    difficulty: "Dễ",
    tags: ["pop()", "del", "Xóa key"],
    points: 20,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 9: Dictionary (Từ điển)",
    problemStatement: `Cho dictionary hoa quả và giá:
` + "`fruits = {'tao': 30, 'cam': 25, 'chuoi': 15, 'nho': 60}`" + `.
Viết chương trình nhập vào tên một loại quả cần xóa ` + "`k`" + `.
Nếu ` + "`k`" + ` có trong ` + "`fruits`" + `, xóa phần tử đó bằng ` + "`fruits.pop(k)`" + ` và in ra giá trị vừa xóa; nếu không có, in "KHONG TON TAI".`,
    inputFormat: "Một dòng chứa tên quả k.",
    outputFormat: "Giá trị của quả vừa xóa hoặc 'KHONG TON TAI'.",
    constraints: "k là chuỗi",
    sampleCases: [
      {
        input: "cam",
        output: "25",
        explanation: "Xóa 'cam' có giá 25."
      },
      {
        input: "dua",
        output: "KHONG TON TAI",
        explanation: "'dua' không có trong danh mục."
      }
    ],
    starterCode: `fruits = {"tao": 30, "cam": 25, "chuoi": 15, "nho": 60}
k = input().strip()

if k in fruits:
    print(fruits.pop(k))
else:
    print("KHONG TON TAI")
`,
    hints: [
      "Dùng toán tử `k in fruits` để kiểm tra trước khi gọi `fruits.pop(k)`."
    ],
    solutionExplanation: `Phương thức pop(k) vừa xóa vừa trả về giá trị của key tương ứng.`,
    testCases: [
      { id: "cd9-b4-t1", input: "cam", expectedOutput: "25", isHidden: false },
      { id: "cd9-b4-t2", input: "dua", expectedOutput: "KHONG TON TAI", isHidden: false },
      { id: "cd9-b4-t3", input: "tao", expectedOutput: "30", isHidden: true }
    ]
  },
  {
    id: "cd9-bai-5",
    title: "Bài 5. Kiểm Tra Key Tồn Tại Trong Dictionary (in)",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 9: Dictionary (Từ điển) trong Python",
    difficulty: "Dễ",
    tags: ["in", "dict", "Kiểm tra tồn tại"],
    points: 20,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 9: Dictionary (Từ điển)",
    problemStatement: `Cho từ điển tra cứu thủ đô các nước:
` + "`capitals = {'Vietnam': 'Hanoi', 'Japan': 'Tokyo', 'France': 'Paris', 'Korea': 'Seoul'}`" + `.
Viết chương trình nhập vào tên một quốc gia ` + "`country`" + `.
Sử dụng toán tử ` + "`in`" + ` để kiểm tra:
- Nếu có: in ra tên thủ đô tương ứng
- Nếu không có: in "CHUA CO THONG TIN"`,
    inputFormat: "Một dòng chứa tên quốc gia.",
    outputFormat: "Tên thủ đô hoặc 'CHUA CO THONG TIN'.",
    constraints: "Chuỗi ký tự",
    sampleCases: [
      {
        input: "Vietnam",
        output: "Hanoi",
        explanation: "Thủ đô của Vietnam là Hanoi."
      },
      {
        input: "USA",
        output: "CHUA CO THONG TIN",
        explanation: "Chưa có thông tin về USA."
      }
    ],
    starterCode: `capitals = {"Vietnam": "Hanoi", "Japan": "Tokyo", "France": "Paris", "Korea": "Seoul"}
country = input().strip()

if country in capitals:
    print(capitals[country])
else:
    print("CHUA CO THONG TIN")
`,
    hints: [
      "Toán tử `in` kiểm tra sự tồn tại của key trong O(1) thời gian."
    ],
    solutionExplanation: `Truy xuất giá trị từ key với capitals[country] khi key tồn tại.`,
    testCases: [
      { id: "cd9-b5-t1", input: "Vietnam", expectedOutput: "Hanoi", isHidden: false },
      { id: "cd9-b5-t2", input: "USA", expectedOutput: "CHUA CO THONG TIN", isHidden: false },
      { id: "cd9-b5-t3", input: "Japan", expectedOutput: "Tokyo", isHidden: true }
    ]
  },
  {
    id: "cd9-bai-6",
    title: "Bài 6. Lấy Danh Sách Các Key Bằng keys()",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 9: Dictionary (Từ điển) trong Python",
    difficulty: "Dễ",
    tags: ["keys()", "dict", "Danh sách khóa"],
    points: 20,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 9: Dictionary (Từ điển)",
    problemStatement: `Viết chương trình nhập vào số lượng phần tử n (1 <= n <= 20), sau đó nhập n dòng tiếp theo, mỗi dòng gồm ` + "`<key> <value>`" + ` cách nhau bởi dấu cách.
Lưu vào dictionary và sử dụng phương thức ` + "`.keys()`" + ` để in ra tất cả các key theo thứ tự nhập, cách nhau bởi dấu cách.`,
    inputFormat: "Dòng 1 là số n. n dòng tiếp theo mỗi dòng là 'key value'.",
    outputFormat: "Các key cách nhau bởi dấu cách trên 1 dòng.",
    constraints: "1 <= n <= 20",
    sampleCases: [
      {
        input: "3\napple 10\nbanana 20\norange 30",
        output: "apple banana orange",
        explanation: "Các key là apple, banana, orange."
      }
    ],
    starterCode: `n = int(input())
d = {}
for _ in range(n):
    k, v = input().split()
    d[k] = v

print(*d.keys())
`,
    hints: [
      "Phương thức `d.keys()` trả về toàn bộ các khóa trong dictionary."
    ],
    solutionExplanation: `Duyệt và xuất các khóa bằng d.keys().`,
    testCases: [
      { id: "cd9-b6-t1", input: "3\napple 10\nbanana 20\norange 30", expectedOutput: "apple banana orange", isHidden: false },
      { id: "cd9-b6-t2", input: "2\na 1\nb 2", expectedOutput: "a b", isHidden: false }
    ]
  },
  {
    id: "cd9-bai-7",
    title: "Bài 7. Tính Tổng Các Giá Trị Số Trong Dictionary (values())",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 9: Dictionary (Từ điển) trong Python",
    difficulty: "Dễ",
    tags: ["values()", "sum()", "dict"],
    points: 20,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 9: Dictionary (Từ điển)",
    problemStatement: `Viết chương trình nhập vào số lượng mặt hàng n (1 <= n <= 20).
n dòng tiếp theo, mỗi dòng chứa tên món hàng và giá tiền (số nguyên) cách nhau bởi dấu cách.
Lưu vào dictionary, sử dụng phương thức ` + "`.values()`" + ` và hàm ` + "`sum()`" + ` để tính tổng tiền của tất cả các món hàng và in kết quả.`,
    inputFormat: "Dòng 1 là n. n dòng tiếp theo là tên món hàng và giá tiền.",
    outputFormat: "Một số nguyên duy nhất là tổng giá tiền.",
    constraints: "1 <= n <= 20",
    sampleCases: [
      {
        input: "3\nbut 5000\nsach 45000\nthuoc 10000",
        output: "60000",
        explanation: "5000 + 45000 + 10000 = 60.000."
      }
    ],
    starterCode: `n = int(input())
prices = {}
for _ in range(n):
    item, price = input().split()
    prices[item] = int(price)

print(sum(prices.values()))
`,
    hints: [
      "Dùng `sum(prices.values())` để tính tổng tất cả các value trong từ điển."
    ],
    solutionExplanation: `prices.values() trả về tập hợp các giá trị, hàm sum() tính tổng của chúng.`,
    testCases: [
      { id: "cd9-b7-t1", input: "3\nbut 5000\nsach 45000\nthuoc 10000", expectedOutput: "60000", isHidden: false },
      { id: "cd9-b7-t2", input: "1\nbank 100", expectedOutput: "100", isHidden: false }
    ]
  },
  {
    id: "cd9-bai-8",
    title: "Bài 8. Duyệt Cặp Key-Value Bằng items()",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 9: Dictionary (Từ điển) trong Python",
    difficulty: "Dễ",
    tags: ["items()", "Duyệt dict", "f-string"],
    points: 25,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 9: Dictionary (Từ điển)",
    problemStatement: `Viết chương trình nhập vào số nguyên n (1 <= n <= 20), tiếp theo là n dòng chứa ` + "`<tên_học_sinh> <điểm_số>`" + `.
Lưu vào dictionary và dùng ` + "`for k, v in d.items()`" + ` để in từng học sinh theo định dạng:
"Hoc sinh <k>: <v> diem" (mỗi học sinh trên 1 dòng).`,
    inputFormat: "Dòng 1 là n. n dòng tiếp theo là tên và điểm.",
    outputFormat: "n dòng theo định dạng chuẩn.",
    constraints: "1 <= n <= 20",
    sampleCases: [
      {
        input: "2\nAn 9\nBinh 8",
        output: "Hoc sinh An: 9 diem\nHoc sinh Binh: 8 diem",
        explanation: "Duyệt qua các cặp items()."
      }
    ],
    starterCode: `n = int(input())
d = {}
for _ in range(n):
    name, score = input().split()
    d[name] = score

for k, v in d.items():
    print(f"Hoc sinh {k}: {v} diem")
`,
    hints: [
      "Duyệt `for k, v in d.items():`."
    ],
    solutionExplanation: `items() trả về các cặp (key, value) để phân tách trực tiếp trong vòng lặp for.`,
    testCases: [
      { id: "cd9-b8-t1", input: "2\nAn 9\nBinh 8", expectedOutput: "Hoc sinh An: 9 diem\nHoc sinh Binh: 8 diem", isHidden: false }
    ]
  },
  {
    id: "cd9-bai-9",
    title: "Bài 9. Đếm Tần Suất Xuất Hiện Của Từ Bằng Dictionary",
    level: "secondary",
    gradeGroup: "THCS (Khối 6-9)",
    topic: "Chủ đề 9: Dictionary (Từ điển) trong Python",
    difficulty: "Trung bình",
    tags: ["Tần suất", "Đếm từ", "dict"],
    points: 30,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 9: Dictionary (Từ điển)",
    problemStatement: `Viết chương trình nhập vào một câu văn bản gồm nhiều từ cách nhau bởi dấu cách.
Sử dụng dictionary để đếm tần suất xuất hiện của từng từ (phân biệt chữ hoa/thường).
In kết quả theo thứ tự từ xuất hiện đầu tiên theo định dạng:
` + "`<từ>: <số_lần>`" + ` (mỗi từ trên 1 dòng).`,
    inputFormat: "Một dòng chứa câu văn bản.",
    outputFormat: "Các dòng in từ và tần suất tương ứng.",
    constraints: "Số lượng từ <= 1000",
    sampleCases: [
      {
        input: "hoc lap trinh python hoc toan lap trinh",
        output: "hoc: 2\nlap: 2\ntrinh: 2\npython: 1\ntoan: 1",
        explanation: "'hoc' xuất hiện 2 lần, 'lap' 2 lần, 'trinh' 2 lần, 'python' 1 lần, 'toan' 1 lần."
      }
    ],
    starterCode: `words = input().split()

freq = {}
for w in words:
    freq[w] = freq.get(w, 0) + 1

for w, count in freq.items():
    print(f"{w}: {count}")
`,
    hints: [
      "Dùng `freq[w] = freq.get(w, 0) + 1` để tăng số lần xuất hiện."
    ],
    solutionExplanation: `Phương thức freq.get(w, 0) lấy giá trị hiện tại hoặc mặc định 0 nếu chưa có.`,
    testCases: [
      { id: "cd9-b9-t1", input: "hoc lap trinh python hoc toan lap trinh", expectedOutput: "hoc: 2\nlap: 2\ntrinh: 2\npython: 1\ntoan: 1", isHidden: false },
      { id: "cd9-b9-t2", input: "a a b b b c", expectedOutput: "a: 2\nb: 3\nc: 1", isHidden: false }
    ]
  },
  {
    id: "cd9-bai-10",
    title: "Bài 10. Đếm Số Lần Xuất Hiện Ký Tự Trong Chuỗi",
    level: "secondary",
    gradeGroup: "THCS (Khối 6-9)",
    topic: "Chủ đề 9: Dictionary (Từ điển) trong Python",
    difficulty: "Trung bình",
    tags: ["Tần suất ký tự", "dict", "Chuỗi"],
    points: 25,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 9: Dictionary (Từ điển)",
    problemStatement: `Viết chương trình nhập vào một chuỗi ký tự ` + "`s`" + ` (không có khoảng trắng).
Đếm số lần xuất hiện của từng ký tự trong chuỗi bằng dictionary và in ra theo thứ tự bảng chữ cái (sorted key):
` + "`<ký_tự>: <số_lần>`" + ` (mỗi ký tự trên 1 dòng).`,
    inputFormat: "Một chuỗi ký tự s không có khoảng trắng.",
    outputFormat: "Các dòng in ký tự và số lần xuất hiện (sắp xếp tăng dần theo ký tự).",
    constraints: "1 <= len(s) <= 1000",
    sampleCases: [
      {
        input: "banana",
        output: "a: 3\nb: 1\nn: 2",
        explanation: "Ký tự 'a' có 3, 'b' có 1, 'n' có 2 (theo thứ tự alphabet a -> b -> n)."
      }
    ],
    starterCode: `s = input().strip()

counts = {}
for ch in s:
    counts[ch] = counts.get(ch, 0) + 1

for ch in sorted(counts.keys()):
    print(f"{ch}: {counts[ch]}")
`,
    hints: [
      "Đếm bằng `counts.get(ch, 0) + 1` và in theo `sorted(counts.keys())`."
    ],
    solutionExplanation: `Đếm tần suất ký tự và dùng sorted() để sắp xếp các khóa trước khi in.`,
    testCases: [
      { id: "cd9-b10-t1", input: "banana", expectedOutput: "a: 3\nb: 1\nn: 2", isHidden: false },
      { id: "cd9-b10-t2", input: "hello", expectedOutput: "e: 1\nh: 1\nl: 2\no: 1", isHidden: false }
    ]
  },
  {
    id: "cd9-bai-11",
    title: "Bài 11. Tìm Học Sinh Có Điểm Cao Nhất (max key by value)",
    level: "secondary",
    gradeGroup: "THCS (Khối 6-9)",
    topic: "Chủ đề 9: Dictionary (Từ điển) trong Python",
    difficulty: "Trung bình",
    tags: ["max key", "dict", "Tìm thủ khoa"],
    points: 30,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 9: Dictionary (Từ điển)",
    problemStatement: `Viết chương trình nhập vào số lượng học sinh n (1 <= n <= 50).
n dòng tiếp theo, mỗi dòng gồm ` + "`<tên_học_sinh> <điểm_số>`" + ` (điểm là số thực).
Lưu vào dictionary và tìm ra tên học sinh có điểm số cao nhất (nếu có nhiều học sinh cùng điểm cao nhất thì chọn học sinh nhập vào trước).
In ra tên và điểm số cao nhất cách nhau bởi dấu cách.`,
    inputFormat: "Dòng 1 là n. n dòng tiếp theo là tên và điểm.",
    outputFormat: "Tên và điểm số cao nhất: <tên> <điểm>",
    constraints: "1 <= n <= 50",
    sampleCases: [
      {
        input: "3\nAn 8.5\nBinh 9.8\nCuong 7.0",
        output: "Binh 9.8",
        explanation: "Binh có điểm cao nhất là 9.8."
      }
    ],
    starterCode: `n = int(input())
scores = {}
for _ in range(n):
    name, score = input().split()
    scores[name] = float(score)

top_student = max(scores, key=scores.get)
print(top_student, scores[top_student])
`,
    hints: [
      "Hàm `max(scores, key=scores.get)` tìm khóa có giá trị lớn nhất trong dictionary."
    ],
    solutionExplanation: `Sử dụng max() với key=scores.get để tìm khóa tương ứng với giá trị lớn nhất.`,
    testCases: [
      { id: "cd9-b11-t1", input: "3\nAn 8.5\nBinh 9.8\nCuong 7.0", expectedOutput: "Binh 9.8", isHidden: false },
      { id: "cd9-b11-t2", input: "2\nHoa 10.0\nNam 9.0", expectedOutput: "Hoa 10.0", isHidden: false }
    ]
  },
  {
    id: "cd9-bai-12",
    title: "Bài 12. Tạo Dictionary Bằng zip() Từ 2 List",
    level: "secondary",
    gradeGroup: "THCS (Khối 6-9)",
    topic: "Chủ đề 9: Dictionary (Từ điển) trong Python",
    difficulty: "Trung bình",
    tags: ["zip()", "dict()", "Tạo từ điển"],
    points: 25,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 9: Dictionary (Từ điển)",
    problemStatement: `Viết chương trình nhập vào:
- Dòng 1: Danh sách các key (chuỗi ký tự cách nhau bởi dấu cách)
- Dòng 2: Danh sách các value tương ứng (các số nguyên cách nhau bởi dấu cách)

Sử dụng hàm ` + "`zip()`" + ` để ghép thành dictionary: ` + "`d = dict(zip(keys, values))`" + `.
In ra các cặp key: value theo định dạng ` + "`<key>: <value>`" + ` (mỗi cặp trên 1 dòng).`,
    inputFormat: "Gồm 2 dòng: Dòng 1 là các keys, Dòng 2 là các values.",
    outputFormat: "Các dòng in cặp 'key: value'.",
    constraints: "Số lượng keys bằng số lượng values (1 <= n <= 100)",
    sampleCases: [
      {
        input: "Toan Van Anh\n10 9 8",
        output: "Toan: 10\nVan: 9\nAnh: 8",
        explanation: "Ghép key và value thành dictionary."
      }
    ],
    starterCode: `keys = input().split()
values = list(map(int, input().split()))

d = dict(zip(keys, values))
for k, v in d.items():
    print(f"{k}: {v}")
`,
    hints: [
      "Hàm `dict(zip(keys, values))` kết hợp hai danh sách cùng kích thước thành một dictionary."
    ],
    solutionExplanation: `zip() ghép cặp từng phần tử cùng chỉ số, dict() chuyển đổi thành từ điển.`,
    testCases: [
      { id: "cd9-b12-t1", input: "Toan Van Anh\n10 9 8", expectedOutput: "Toan: 10\nVan: 9\nAnh: 8", isHidden: false },
      { id: "cd9-b12-t2", input: "a b\n1 2", expectedOutput: "a: 1\nb: 2", isHidden: false }
    ]
  }
];
