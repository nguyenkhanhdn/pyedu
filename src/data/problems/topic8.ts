import { AlgorithmProblem } from "../../types";

export const TOPIC_8_PROBLEMS: AlgorithmProblem[] = [
  {
    id: "cd8-bai-1",
    title: "Bài 1. Độ Dài Chuỗi Bằng Hàm len()",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 8: String (Chuỗi ký tự) trong Python",
    difficulty: "Dễ",
    tags: ["len()", "Chuỗi", "Độ dài"],
    points: 15,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 8: String (Chuỗi ký tự)",
    problemStatement: `Viết chương trình nhập vào một chuỗi ` + "`s`" + ` từ bàn phím (có thể chứa khoảng trắng).
In ra độ dài của chuỗi (số lượng ký tự kể cả khoảng trắng) bằng hàm ` + "`len()`" + `.`,
    inputFormat: "Một dòng chứa chuỗi s.",
    outputFormat: "Một số nguyên là độ dài chuỗi s.",
    constraints: "0 <= len(s) <= 10000",
    sampleCases: [
      {
        input: "Python",
        output: "6",
        explanation: "Từ 'Python' có 6 ký tự."
      },
      {
        input: "Hello World",
        output: "11",
        explanation: "Tính cả khoảng trắng là 11 ký tự."
      }
    ],
    starterCode: `s = input()
print(len(s))
`,
    hints: [
      "Hàm len(s) trả về số lượng ký tự trong chuỗi."
    ],
    solutionExplanation: `Sử dụng hàm len() tiêu chuẩn của Python.`,
    testCases: [
      { id: "cd8-b1-t1", input: "Python", expectedOutput: "6", isHidden: false },
      { id: "cd8-b1-t2", input: "Hello World", expectedOutput: "11", isHidden: false },
      { id: "cd8-b1-t3", input: "A", expectedOutput: "1", isHidden: true }
    ]
  },
  {
    id: "cd8-bai-2",
    title: "Bài 2. Chuyển Đổi CHỮ HOA và chữ thường (upper, lower)",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 8: String (Chuỗi ký tự) trong Python",
    difficulty: "Dễ",
    tags: ["upper()", "lower()", "Biến đổi chuỗi"],
    points: 20,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 8: String (Chuỗi ký tự)",
    problemStatement: `Viết chương trình nhập vào một chuỗi s từ bàn phím.
In ra:
- Dòng 1: Chuỗi chuyển thành TOÀN CHỮ HOA (s.upper())
- Dòng 2: Chuỗi chuyển thành toàn chữ thường (s.lower())`,
    inputFormat: "Một dòng chứa chuỗi s.",
    outputFormat: "Gồm 2 dòng: Dòng 1 CHỮ HOA, Dòng 2 chữ thường.",
    constraints: "len(s) <= 1000",
    sampleCases: [
      {
        input: "Hello Python 3",
        output: "HELLO PYTHON 3\nhello python 3",
        explanation: "Chuyển hoa và thường tương ứng."
      }
    ],
    starterCode: `s = input()
print(s.upper())
print(s.lower())
`,
    hints: [
      "Dùng s.upper() và s.lower()."
    ],
    solutionExplanation: `Phương thức upper() và lower() tạo bản sao in hoa và in thường của chuỗi.`,
    testCases: [
      { id: "cd8-b2-t1", input: "Hello Python 3", expectedOutput: "HELLO PYTHON 3\nhello python 3", isHidden: false },
      { id: "cd8-b2-t2", input: "abc", expectedOutput: "ABC\nabc", isHidden: false }
    ]
  },
  {
    id: "cd8-bai-3",
    title: "Bài 3. Kiểm Tra Chuỗi Đối Xứng (Palindrome)",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 8: String (Chuỗi ký tự) trong Python",
    difficulty: "Dễ",
    tags: ["Palindrome", "Chuỗi đối xứng", "Slicing"],
    points: 25,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 8: String (Chuỗi ký tự)",
    problemStatement: `Một chuỗi được gọi là chuỗi đối xứng (Palindrome) nếu đọc xuôi hay đọc ngược đều giống nhau (ví dụ "radar", "level", "madam").
Viết chương trình nhập vào một chuỗi s (chỉ gồm các chữ cái viết thường), kiểm tra và in ra:
- "YES" nếu s là chuỗi đối xứng
- "NO" nếu s không phải chuỗi đối xứng`,
    inputFormat: "Một dòng chứa chuỗi s.",
    outputFormat: "In ra 'YES' hoặc 'NO'.",
    constraints: "1 <= len(s) <= 1000",
    sampleCases: [
      {
        input: "radar",
        output: "YES",
        explanation: "'radar' đảo ngược lại vẫn là 'radar'."
      },
      {
        input: "python",
        output: "NO",
        explanation: "'python' đảo ngược là 'nohtyp' (khác nhau)."
      }
    ],
    starterCode: `s = input().strip()

if s == s[::-1]:
    print("YES")
else:
    print("NO")
`,
    hints: [
      "So sánh chuỗi gốc với chuỗi đảo ngược: `s == s[::-1]`."
    ],
    solutionExplanation: `Slicing s[::-1] tạo chuỗi ngược, so sánh trực tiếp với chuỗi ban đầu.`,
    testCases: [
      { id: "cd8-b3-t1", input: "radar", expectedOutput: "YES", isHidden: false },
      { id: "cd8-b3-t2", input: "python", expectedOutput: "NO", isHidden: false },
      { id: "cd8-b3-t3", input: "a", expectedOutput: "YES", isHidden: true },
      { id: "cd8-b3-t4", input: "abccba", expectedOutput: "YES", isHidden: true }
    ]
  },
  {
    id: "cd8-bai-4",
    title: "Bài 4. Đếm Số Lượng Nguyên Âm và Phụ Âm Tiếng Anh",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 8: String (Chuỗi ký tự) trong Python",
    difficulty: "Trung bình",
    tags: ["Nguyên âm", "Phụ âm", "Đếm ký tự"],
    points: 25,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 8: String (Chuỗi ký tự)",
    problemStatement: `Trong bảng chữ cái tiếng Anh, các nguyên âm gồm: a, e, i, o, u (cả hoa và thường). Các chữ cái còn lại là phụ âm.
Viết chương trình nhập vào một chuỗi s. Đếm và in ra số lượng nguyên âm và số lượng phụ âm trên cùng 1 dòng, cách nhau bởi dấu cách. (Bỏ qua khoảng trắng, chữ số và ký tự đặc biệt).`,
    inputFormat: "Một dòng chứa chuỗi ký tự s.",
    outputFormat: "In ra 2 số: <số nguyên âm> <số phụ âm>",
    constraints: "len(s) <= 1000",
    sampleCases: [
      {
        input: "Hello World",
        output: "3 7",
        explanation: "Nguyên âm: e, o, o (3); Phụ âm: H, l, l, W, r, l, d (7)."
      }
    ],
    starterCode: `s = input()

vowels = set("aeiouAEIOU")
v_count = 0
c_count = 0

for ch in s:
    if ch.isalpha():
        if ch in vowels:
            v_count += 1
        else:
            c_count += 1

print(v_count, c_count)
`,
    hints: [
      "Kiểm tra ch.isalpha() để chỉ xét chữ cái, nếu ch trong 'aeiouAEIOU' là nguyên âm, ngược lại là phụ âm."
    ],
    solutionExplanation: `Duyệt chuỗi, lọc chữ cái bằng isalpha() và phân loại vào nguyên âm / phụ âm.`,
    testCases: [
      { id: "cd8-b4-t1", input: "Hello World", expectedOutput: "3 7", isHidden: false },
      { id: "cd8-b4-t2", input: "Python 3.12", expectedOutput: "1 5", isHidden: false },
      { id: "cd8-b4-t3", input: "aeiou", expectedOutput: "5 0", isHidden: true }
    ]
  },
  {
    id: "cd8-bai-5",
    title: "Bài 5. Thay Thế Khoảng Trắng Bằng Dấu Gạch Ngang (replace())",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 8: String (Chuỗi ký tự) trong Python",
    difficulty: "Dễ",
    tags: ["replace()", "Thay thế chuỗi", "String"],
    points: 20,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 8: String (Chuỗi ký tự)",
    problemStatement: `Viết chương trình nhập vào một chuỗi ` + "`s`" + ` từ bàn phím.
Sử dụng phương thức ` + "`replace()`" + ` để thay thế tất cả các ký tự khoảng trắng ' ' trong chuỗi bằng dấu gạch ngang '-' và in kết quả ra màn hình.`,
    inputFormat: "Một dòng chứa chuỗi s.",
    outputFormat: "Chuỗi sau khi thay thế khoảng trắng thành '-'.",
    constraints: "len(s) <= 1000",
    sampleCases: [
      {
        input: "hoc lap trinh python",
        output: "hoc-lap-trinh-python",
        explanation: "Các khoảng trắng chuyển thành '-'."
      }
    ],
    starterCode: `s = input()
print(s.replace(" ", "-"))
`,
    hints: [
      "Dùng `s.replace(' ', '-')`."
    ],
    solutionExplanation: `Phương thức replace() thay thế tất cả các chuỗi con khớp điều kiện.`,
    testCases: [
      { id: "cd8-b5-t1", input: "hoc lap trinh python", expectedOutput: "hoc-lap-trinh-python", isHidden: false },
      { id: "cd8-b5-t2", input: "a b c", expectedOutput: "a-b-c", isHidden: false }
    ]
  },
  {
    id: "cd8-bai-6",
    title: "Bài 6. Đếm Số Lượng Từ Trong Câu (split())",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 8: String (Chuỗi ký tự) trong Python",
    difficulty: "Dễ",
    tags: ["split()", "len()", "Đếm từ"],
    points: 20,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 8: String (Chuỗi ký tự)",
    problemStatement: `Viết chương trình nhập vào một câu từ bàn phím (có thể chứa nhiều khoảng trắng liên tiếp).
Đếm số lượng từ trong câu đó (các từ được phân tách bởi một hoặc nhiều dấu cách) và in kết quả.`,
    inputFormat: "Một dòng chứa câu văn bản.",
    outputFormat: "Một số nguyên duy nhất là số lượng từ trong câu.",
    constraints: "Chuỗi có độ dài <= 5000",
    sampleCases: [
      {
        input: "Chuc mung cac ban dat giai nhat",
        output: "7",
        explanation: "Câu gồm 7 từ."
      },
      {
        input: "  Python   is    awesome  ",
        output: "3",
        explanation: "Có 3 từ dù có nhiều khoảng trắng thừa."
      }
    ],
    starterCode: `s = input()
words = s.split()
print(len(words))
`,
    hints: [
      "Hàm `s.split()` không truyền tham số sẽ tự động xử lý và bỏ qua mọi khoảng trắng liên tiếp."
    ],
    solutionExplanation: `split() phân tách chuỗi thành các từ hợp lệ, len() đếm số từ.`,
    testCases: [
      { id: "cd8-b6-t1", input: "Chuc mung cac ban dat giai nhat", expectedOutput: "7", isHidden: false },
      { id: "cd8-b6-t2", input: "  Python   is    awesome  ", expectedOutput: "3", isHidden: false }
    ]
  },
  {
    id: "cd8-bai-7",
    title: "Bài 7. Trích Xuất Họ, Tên Đệm và Tên Từ Họ Tên Đầy Đủ",
    level: "secondary",
    gradeGroup: "THCS (Khối 6-9)",
    topic: "Chủ đề 8: String (Chuỗi ký tự) trong Python",
    difficulty: "Trung bình",
    tags: ["Tách chuỗi", "Họ tên", "split()"],
    points: 30,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 8: String (Chuỗi ký tự)",
    problemStatement: `Viết chương trình nhập vào chuỗi họ tên đầy đủ của một người (có ít nhất 2 từ).
Tách và in ra:
- Dòng 1: Họ (từ đầu tiên)
- Dòng 2: Tên đệm (các từ ở giữa, nếu không có tên đệm thì in "KHONG CO")
- Dòng 3: Tên (từ cuối cùng)`,
    inputFormat: "Một dòng chứa họ tên đầy đủ.",
    outputFormat: "Gồm 3 dòng: Họ, Tên đệm và Tên.",
    constraints: "Họ tên có từ 2 đến 10 từ",
    sampleCases: [
      {
        input: "Nguyen Van An",
        output: "Nguyen\nVan\nAn",
        explanation: "Họ: Nguyen, Đệm: Van, Tên: An."
      },
      {
        input: "Tran Thi Mai Linh",
        output: "Tran\nThi Mai\nLinh",
        explanation: "Đệm là 'Thi Mai'."
      },
      {
        input: "Le Minh",
        output: "Le\nKHONG CO\nMinh",
        explanation: "Chỉ có 2 từ nên không có tên đệm."
      }
    ],
    starterCode: `words = input().split()

ho = words[0]
ten = words[-1]
dem = " ".join(words[1:-1]) if len(words) > 2 else "KHONG CO"

print(ho)
print(dem)
print(ten)
`,
    hints: [
      "Họ là `words[0]`, Tên là `words[-1]`, Tên đệm là `words[1:-1]` nếu len(words) > 2."
    ],
    solutionExplanation: `Slicing mảng từ sau khi split() để trích xuất từng thành phần tên.`,
    testCases: [
      { id: "cd8-b7-t1", input: "Nguyen Van An", expectedOutput: "Nguyen\nVan\nAn", isHidden: false },
      { id: "cd8-b7-t2", input: "Tran Thi Mai Linh", expectedOutput: "Tran\nThi Mai\nLinh", isHidden: false },
      { id: "cd8-b7-t3", input: "Le Minh", expectedOutput: "Le\nKHONG CO\nMinh", isHidden: false }
    ]
  },
  {
    id: "cd8-bai-8",
    title: "Bài 8. Kiểm Tra Chuỗi Toàn Chữ Số (isdigit())",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 8: String (Chuỗi ký tự) trong Python",
    difficulty: "Dễ",
    tags: ["isdigit()", "Kiểm tra số", "bool"],
    points: 20,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 8: String (Chuỗi ký tự)",
    problemStatement: `Viết chương trình nhập vào một chuỗi ` + "`s`" + ` từ bàn phím.
Kiểm tra xem chuỗi có phải chỉ chứa toàn các ký tự chữ số (0-9) hay không bằng phương thức ` + "`isdigit()`" + `.
In ra "YES" nếu đúng, ngược lại in "NO".`,
    inputFormat: "Một dòng chứa chuỗi s.",
    outputFormat: "In ra 'YES' hoặc 'NO'.",
    constraints: "1 <= len(s) <= 1000",
    sampleCases: [
      {
        input: "123456",
        output: "YES",
        explanation: "Toàn bộ là chữ số."
      },
      {
        input: "123a45",
        output: "NO",
        explanation: "Chứa ký tự 'a' không phải số."
      }
    ],
    starterCode: `s = input().strip()

if s.isdigit():
    print("YES")
else:
    print("NO")
`,
    hints: [
      "Dùng `s.isdigit()`."
    ],
    solutionExplanation: `Hàm isdigit() trả về True khi chuỗi không rỗng và mọi ký tự đều là chữ số.`,
    testCases: [
      { id: "cd8-b8-t1", input: "123456", expectedOutput: "YES", isHidden: false },
      { id: "cd8-b8-t2", input: "123a45", expectedOutput: "NO", isHidden: false },
      { id: "cd8-b8-t3", input: "9", expectedOutput: "YES", isHidden: true }
    ]
  },
  {
    id: "cd8-bai-9",
    title: "Bài 9. Nối Danh Sách Từ Thành Câu (join())",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 8: String (Chuỗi ký tự) trong Python",
    difficulty: "Dễ",
    tags: ["join()", "Nối chuỗi", "List"],
    points: 20,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 8: String (Chuỗi ký tự)",
    problemStatement: `Viết chương trình nhập vào một dãy các từ cách nhau bởi dấu cách trên 1 dòng.
Sử dụng phương thức ` + "`join()`" + ` để nối các từ đó lại thành một chuỗi, trong đó các từ cách nhau bởi dấu gạch đứng " | " (có dấu cách 2 bên), rồi in kết quả ra màn hình.`,
    inputFormat: "Một dòng chứa các từ cách nhau bởi khoảng trắng.",
    outputFormat: "Chuỗi sau khi nối bằng ' | '.",
    constraints: "Có từ 1 đến 100 từ",
    sampleCases: [
      {
        input: "Toan Ly Hoa Sinh",
        output: "Toan | Ly | Hoa | Sinh",
        explanation: "Nối các môn học bằng ' | '."
      }
    ],
    starterCode: `words = input().split()
print(" | ".join(words))
`,
    hints: [
      "Cú pháp `' | '.join(words)`."
    ],
    solutionExplanation: `Phương thức join() nối các phần tử chuỗi trong danh sách bằng chuỗi ngăn cách.`,
    testCases: [
      { id: "cd8-b9-t1", input: "Toan Ly Hoa Sinh", expectedOutput: "Toan | Ly | Hoa | Sinh", isHidden: false },
      { id: "cd8-b9-t2", input: "Python", expectedOutput: "Python", isHidden: false }
    ]
  },
  {
    id: "cd8-bai-10",
    title: "Bài 10. Xóa Khoảng Trắng Thừa Ở Đầu & Cuối (strip())",
    level: "primary",
    gradeGroup: "Tiểu học & THCS",
    topic: "Chủ đề 8: String (Chuỗi ký tự) trong Python",
    difficulty: "Dễ",
    tags: ["strip()", "Xóa khoảng trắng", "Chuỗi"],
    points: 20,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 8: String (Chuỗi ký tự)",
    problemStatement: `Viết chương trình nhập vào một chuỗi ` + "`s`" + ` có thể chứa các khoảng trắng thừa ở đầu và cuối chuỗi.
Sử dụng phương thức ` + "`strip()`" + ` để loại bỏ các khoảng trắng thừa đó, sau đó in chuỗi kèm theo độ dài của chuỗi sau khi đã strip trên 2 dòng:
- Dòng 1: Chuỗi sau khi strip
- Dòng 2: Độ dài chuỗi sau khi strip`,
    inputFormat: "Một dòng chứa chuỗi s.",
    outputFormat: "Gồm 2 dòng: Chuỗi sạch và độ dài.",
    constraints: "len(s) <= 1000",
    sampleCases: [
      {
        input: "   lap trinh python   ",
        output: "lap trinh python\n16",
        explanation: "Bỏ khoảng trắng hai đầu, chuỗi còn 16 ký tự."
      }
    ],
    starterCode: `s = input()
cleaned = s.strip()
print(cleaned)
print(len(cleaned))
`,
    hints: [
      "Dùng `s.strip()` và `len(cleaned)`."
    ],
    solutionExplanation: `strip() loại bỏ toàn bộ khoảng trắng ở đầu và cuối chuỗi.`,
    testCases: [
      { id: "cd8-b10-t1", input: "   lap trinh python   ", expectedOutput: "lap trinh python\n16", isHidden: false },
      { id: "cd8-b10-t2", input: "hello", expectedOutput: "hello\n5", isHidden: false }
    ]
  },
  {
    id: "cd8-bai-11",
    title: "Bài 11. Tìm Vị Trí Đầu Tiên & Cuối Cùng (find, rfind)",
    level: "secondary",
    gradeGroup: "THCS (Khối 6-9)",
    topic: "Chủ đề 8: String (Chuỗi ký tự) trong Python",
    difficulty: "Trung bình",
    tags: ["find()", "rfind()", "Vị trí chuỗi con"],
    points: 25,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 8: String (Chuỗi ký tự)",
    problemStatement: `Viết chương trình nhập vào:
- Dòng 1: Một đoạn văn bản ` + "`s`" + `
- Dòng 2: Một từ khóa ` + "`sub`" + ` cần tìm

Sử dụng ` + "`find()`" + ` và ` + "`rfind()`" + ` để tìm vị trí xuất hiện đầu tiên và vị trí xuất hiện cuối cùng của ` + "`sub`" + ` trong ` + "`s`" + `.
In ra 2 số cách nhau bởi dấu cách: ` + "`<first_pos> <last_pos>`" + ` (nếu không tìm thấy thì cả 2 đều là -1).`,
    inputFormat: "Gồm 2 dòng: Đoạn văn s và từ khóa sub.",
    outputFormat: "Hai số nguyên cách nhau dấu cách.",
    constraints: "len(s) <= 5000",
    sampleCases: [
      {
        input: "python la ngon ngu tuyet voi, hoc python rat vui\npython",
        output: "0 34",
        explanation: "'python' xuất hiện đầu tiên tại index 0 và lần cuối tại index 34."
      },
      {
        input: "hoc toan hoc van\nanh",
        output: "-1 -1",
        explanation: "Không tìm thấy từ 'anh'."
      }
    ],
    starterCode: `s = input()
sub = input().strip()

first_pos = s.find(sub)
last_pos = s.rfind(sub)

print(first_pos, last_pos)
`,
    hints: [
      "Hàm `find()` tìm từ trái sang phải, `rfind()` tìm từ phải sang trái."
    ],
    solutionExplanation: `Sử dụng find() và rfind() để xác định vị trí biên của chuỗi con.`,
    testCases: [
      { id: "cd8-b11-t1", input: "python la ngon ngu tuyet voi, hoc python rat vui\npython", expectedOutput: "0 34", isHidden: false },
      { id: "cd8-b11-t2", input: "hoc toan hoc van\nanh", expectedOutput: "-1 -1", isHidden: false }
    ]
  },
  {
    id: "cd8-bai-12",
    title: "Bài 12. Mã Hóa Mật Mã Caesar Đơn Giản",
    level: "secondary",
    gradeGroup: "THCS (Khối 6-9)",
    topic: "Chủ đề 8: String (Chuỗi ký tự) trong Python",
    difficulty: "Trung bình",
    tags: ["Mật mã Caesar", "ord()", "chr()", "Bảng chữ cái"],
    points: 35,
    timeLimit: "1.0s",
    memoryLimit: "128MB",
    source: "Chủ đề 8: String (Chuỗi ký tự)",
    problemStatement: `Mật mã Caesar dịch mỗi chữ cái tiếng Anh đi k vị trí theo vòng tròn trong bảng chữ cái (chỉ dịch chữ cái a-z và A-Z, giữ nguyên dấu cách và ký tự đặc biệt).
Ví dụ: với k = 3, 'a' -> 'd', 'z' -> 'c', 'A' -> 'D', 'Z' -> 'C'.
Viết chương trình nhập:
- Dòng 1: Chuỗi s cần mã hóa
- Dòng 2: Khóa dịch chuyển k (số nguyên, 0 <= k <= 25)
In ra chuỗi sau khi đã được mã hóa.`,
    inputFormat: "Gồm 2 dòng: Chuỗi s và số nguyên k.",
    outputFormat: "Chuỗi sau khi mã hóa Caesar.",
    constraints: "len(s) <= 1000, 0 <= k <= 25",
    sampleCases: [
      {
        input: "Hello World!\n3",
        output: "Khoor Zruog!",
        explanation: "Dịch chuyển mỗi chữ cái đi 3 ký tự."
      },
      {
        input: "abc xyz\n1",
        output: "bcd yza",
        explanation: "'z' vòng lại thành 'a'."
      }
    ],
    starterCode: `s = input()
k = int(input())

res = []
for ch in s:
    if 'a' <= ch <= 'z':
        res.append(chr((ord(ch) - ord('a') + k) % 26 + ord('a')))
    elif 'A' <= ch <= 'Z':
        res.append(chr((ord(ch) - ord('A') + k) % 26 + ord('A')))
    else:
        res.append(ch)

print("".join(res))
`,
    hints: [
      "Công thức dịch chữ thường: `chr((ord(ch) - ord('a') + k) % 26 + ord('a'))`."
    ],
    solutionExplanation: `Áp dụng công thức cộng modulo 26 trên mã ASCII của ký tự.`,
    testCases: [
      { id: "cd8-b12-t1", input: "Hello World!\n3", expectedOutput: "Khoor Zruog!", isHidden: false },
      { id: "cd8-b12-t2", input: "abc xyz\n1", expectedOutput: "bcd yza", isHidden: false },
      { id: "cd8-b12-t3", input: "Python\n0", expectedOutput: "Python", isHidden: true }
    ]
  }
];
