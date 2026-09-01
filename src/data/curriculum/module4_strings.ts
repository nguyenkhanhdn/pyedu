import { Module } from "../../types";

export const MODULE_4_STRINGS: Module = {
  id: "module-4",
  title: "Chương 4: Chuỗi Ký Tự (Strings) & Xử Lý Văn Bản",
  description: "Khám phá bản chất của chuỗi trong Python, truy cập chỉ số dương/âm, kỹ thuật cắt lát chuỗi [start:stop:step], đảo ngược xâu và các phương thức xử lý chuỗi thông dụng.",
  iconName: "FileText",
  order: 4,
  color: "from-purple-500 to-indigo-700",
  lessons: [
    {
      id: "lesson-13",
      moduleId: "module-4",
      moduleTitle: "Chương 4: Chuỗi Ký Tự & Xử Lý Văn Bản",
      order: 1,
      title: "Bài 13: Chỉ Số (Indexing) & Cắt Chuỗi (Slicing)",
      description: "Hiểu hệ thống đánh chỉ số 0-based, chỉ số âm, cú pháp cắt chuỗi linh hoạt s[start:stop:step] và kiểm tra xâu đối xứng Palindrome.",
      durationMin: 25,
      xpReward: 70,
      theory: {
        summary: "Chuỗi ký tự (string) trong Python là một tập hợp các ký tự có thứ tự và không thể thay đổi trực tiếp (Immutable). Mỗi ký tự được gắn một vị trí (index) xác định.",
        keyPoints: [
          "**Chỉ số dương (từ trái qua phải)**: Bắt đầu từ `0` đến `len(s) - 1`.",
          "**Chỉ số âm (từ phải qua trái)**: Ký tự cuối cùng là `-1`, áp chót là `-2`.",
          "**Cú pháp cắt chuỗi (Slicing)**: `s[start:stop:step]`:",
          "  - `s[0:3]`: Lấy từ index 0 đến 2 (3 ký tự đầu).",
          "  - `s[2:]`: Lấy từ index 2 đến hết chuỗi.",
          "  - `s[:4]`: Lấy từ đầu đến index 3.",
          "  - `s[::-1]`: Đảo ngược toàn bộ chuỗi (kỹ thuật cực kỳ nhanh và phổ biến).",
          "Hàm `len(s)`: Trả về số lượng ký tự trong chuỗi."
        ],
        conceptIllustration: {
          type: "strings",
          title: "Sơ đồ chỉ số & cắt lát chuỗi trong Python",
          description: "Chuỗi s = 'PYTHON'",
          visualData: {
            codeSnippet: "Chỉ số dương:   P(0)  Y(1)  T(2)  H(3)  O(4)  N(5)\nChỉ số âm:      P(-6) Y(-5) T(-4) H(-3) O(-2) N(-1)\n\ns[0:3] -> 'PYT'\ns[-3:] -> 'HON'\ns[::-1] -> 'NOHTYP'",
            outputPreview: "len(s) = 6\ns[0] = 'P'\ns[-1] = 'N'",
            explanation: "Slicing không làm thay đổi chuỗi ban đầu mà tạo ra một chuỗi con mới."
          }
        },
        examples: [
          {
            title: "Ví dụ: Lấy ký tự đầu, cuối và đảo ngược",
            explanation: "Thao tác trên chuỗi.",
            code: "s = 'Vietnam'\nprint(s[0])     # 'V'\nprint(s[-1])    # 'm'\nprint(s[::-1])  # 'manteiV'",
            output: "V\nm\nmanteiV"
          }
        ],
        multipleChoice: {
          question: "Cho chuỗi `s = 'PYTHON'`. Biểu thức `s[1:4]` sẽ cho kết quả là chuỗi nào?",
          options: [
            "'PYT'",
            "'YTH'",
            "'YTHO'",
            "'THO'"
          ],
          correctIndex: 1,
          explanation: "s[1:4] lấy các ký tự ở vị trí index 1, 2, 3 tương ứng với các chữ 'Y', 'T', 'H'."
        }
      },
      practice: {
        id: "practice-13",
        title: "Thử thách 13: Đảo Ngược Chuỗi & Kiểm Tra Palindrome",
        difficulty: "Cơ bản",
        problemStatement: "Một chuỗi được gọi là Palindrome (chuỗi đối xứng) nếu khi đọc từ trái sang phải hay từ phải sang trái đều thu được chuỗi giống hệt nhau (ví dụ: 'radar', 'madam', '12321').\n\nViết chương trình nhập vào một chuỗi `s` (không chứa dấu cách). Nếu `s` là chuỗi đối xứng, hãy in ra `YES`, ngược lại in ra `NO`.",
        inputFormat: "Một dòng duy nhất chứa chuỗi ký tự s (độ dài từ 1 đến 1000 ký tự).",
        outputFormat: "In ra `YES` nếu s là chuỗi đối xứng, ngược lại in `NO`.",
        constraints: "1 <= len(s) <= 1000, các ký tự chỉ gồm chữ cái hoặc chữ số.",
        sampleCases: [
          {
            input: "radar",
            output: "YES",
            explanation: "'radar' đảo ngược lại vẫn là 'radar' nên in YES."
          },
          {
            input: "python",
            output: "NO",
            explanation: "'python' đảo ngược là 'nohtyp' (khác nhau) nên in NO."
          }
        ],
        starterCode: `s = input().strip()

# Dùng kỹ thuật cắt chuỗi s[::-1] để đảo ngược chuỗi
if s == s[::-1]:
    print("YES")
else:
    print("NO")
`,
        testCases: [
          {
            id: "tc13-1",
            input: "radar",
            expectedOutput: "YES",
            isHidden: false,
            explanation: "Chuỗi đối xứng 'radar'"
          },
          {
            id: "tc13-2",
            input: "python",
            expectedOutput: "NO",
            isHidden: false,
            explanation: "Chuỗi không đối xứng 'python'"
          },
          {
            id: "tc13-3",
            input: "a",
            expectedOutput: "YES",
            isHidden: false,
            explanation: "Chuỗi 1 ký tự luôn là đối xứng"
          },
          {
            id: "tc13-4",
            input: "12321",
            expectedOutput: "YES",
            isHidden: true,
            explanation: "Chuỗi số đối xứng: 12321"
          },
          {
            id: "tc13-5",
            input: "abccba",
            expectedOutput: "YES",
            isHidden: true,
            explanation: "Chuỗi chẵn đối xứng: abccba"
          }
        ],
        hints: [
          "Dùng s = input().strip() để nhận chuỗi.",
          "Chuỗi đảo ngược là s[::-1].",
          "So sánh if s == s[::-1]: in YES else in NO."
        ],
        solutionExplanation: "s = input().strip()\nif s == s[::-1]:\n    print('YES')\nelse:\n    print('NO')"
      }
    },
    {
      id: "lesson-14",
      moduleId: "module-4",
      moduleTitle: "Chương 4: Chuỗi Ký Tự & Xử Lý Văn Bản",
      order: 2,
      title: "Bài 14: Các Phương Thức Chuỗi Thông Dụng (Methods)",
      description: "Thành thạo các phương thức xử lý chuỗi mạnh mẽ: split(), join(), count(), replace(), lower(), upper(), strip() và duyệt từng ký tự.",
      durationMin: 25,
      xpReward: 70,
      theory: {
        summary: "Python cung cấp một bộ công cụ phong phú gồm các hàm và phương thức dựng sẵn để xử lý văn bản nhanh chóng, chuẩn hóa chuỗi và tách từ.",
        keyPoints: [
          "**Đổi chữ hoa/thường**: `s.lower()`, `s.upper()`, `s.title()`.",
          "**Cắt khoảng trắng thừa 2 đầu**: `s.strip()`.",
          "**Thay thế nội dung**: `s.replace(old, new)`.",
          "**Đếm số lần xuất hiện**: `s.count(sub)` (đếm số lần `sub` có trong `s`).",
          "**Tách chuỗi thành danh sách từ**: `s.split()` (mặc định tách theo khoảng trắng).",
          "**Nối các từ thành chuỗi**: `' '.join(list_words)`.",
          "**Duyệt từng ký tự**: `for ch in s:`."
        ],
        conceptIllustration: {
          type: "strings",
          title: "Các phương thức chuỗi thường gặp",
          description: "Các thao tác biến đổi chuỗi trong Python",
          visualData: {
            codeSnippet: "s = '  hoc lap trinh python  '\nclean = s.strip()          # 'hoc lap trinh python'\nwords = clean.split()      # ['hoc', 'lap', 'trinh', 'python']\nupper_s = clean.upper()    # 'HOC LAP TRINH PYTHON'\nreplaced = clean.replace('python', 'PyEdu') # 'hoc lap trinh PyEdu'",
            outputPreview: "Số từ: 4\nChuẩn hóa: 'Hoc Lap Trinh Pyedu'",
            explanation: "Các phương thức chuỗi luôn trả về chuỗi mới mà không làm đổi chuỗi ban đầu."
          }
        },
        examples: [
          {
            title: "Ví dụ: Đếm số ký tự 'a' trong câu",
            explanation: "Sử dụng s.lower().count('a').",
            code: "s = 'Vietnam Vo Dich'\ncount_a = s.lower().count('a')\nprint(f\"So chu a: {count_a}\")",
            output: "So chu a: 1"
          }
        ],
        multipleChoice: {
          question: "Phương thức nào dùng để tách một câu văn bản thành danh sách các từ riêng biệt?",
          options: [
            "s.join()",
            "s.split()",
            "s.slice()",
            "s.divide()"
          ],
          correctIndex: 1,
          explanation: "Phương thức s.split() chia chuỗi thành các phần tử mảng dựa trên dấu phân cách (mặc định là khoảng trắng)."
        }
      },
      practice: {
        id: "practice-14",
        title: "Thử thách 14: Đếm Số Lượng Nguyên Âm Trong Chuỗi",
        difficulty: "Cơ bản",
        problemStatement: "Trong tiếng Anh, các nguyên âm gồm 5 chữ cái: `a`, `e`, `i`, `o`, `u` (không phân biệt chữ hoa hay chữ thường).\n\nViết chương trình nhập vào một chuỗi văn bản `s`. Hãy đếm và in ra tổng số lượng ký tự nguyên âm xuất hiện trong chuỗi `s`.",
        inputFormat: "Một dòng chứa chuỗi văn bản s (có thể chứa khoảng trắng và dấu câu).",
        outputFormat: "In ra một số nguyên duy nhất là số lượng nguyên âm.",
        constraints: "1 <= len(s) <= 1000.",
        sampleCases: [
          {
            input: "Hello World",
            output: "3",
            explanation: "Các nguyên âm là: 'e', 'o', 'o' -> tổng cộng 3."
          },
          {
            input: "PYTHON PROGRAMMING",
            output: "4",
            explanation: "Các nguyên âm là: 'O', 'O', 'A', 'I' -> tổng cộng 4."
          }
        ],
        starterCode: `s = input().strip()

# Danh sách hoặc chuỗi chứa các nguyên âm
vowels = "aeiou"
count = 0

# Chuyển chuỗi về chữ thường và duyệt từng ký tự
for ch in s.lower():
    if ch in vowels:
        count += 1

print(count)
`,
        testCases: [
          {
            id: "tc14-1",
            input: "Hello World",
            expectedOutput: "3",
            isHidden: false,
            explanation: "Chuỗi 'Hello World' có 3 nguyên âm (e, o, o)"
          },
          {
            id: "tc14-2",
            input: "PYTHON PROGRAMMING",
            expectedOutput: "4",
            isHidden: false,
            explanation: "Chuỗi hoa 'PYTHON PROGRAMMING' có 4 nguyên âm (O, O, A, I)"
          },
          {
            id: "tc14-3",
            input: "xyz",
            expectedOutput: "0",
            isHidden: false,
            explanation: "Không có nguyên âm nào -> 0"
          },
          {
            id: "tc14-4",
            input: "Lap trinh Python that la thu vi",
            expectedOutput: "9",
            isHidden: true,
            explanation: "Chuỗi tiếng Việt không dấu: 9 nguyên âm"
          }
        ],
        hints: [
          "Chuyển chuỗi sang chữ thường bằng s.lower().",
          "Dùng for ch in s.lower(): if ch in \"aeiou\": count += 1.",
          "Cuối cùng in ra count."
        ],
        solutionExplanation: "s = input().strip()\nvowels = 'aeiou'\ncount = sum(1 for ch in s.lower() if ch in vowels)\nprint(count)"
      }
    }
  ]
};
