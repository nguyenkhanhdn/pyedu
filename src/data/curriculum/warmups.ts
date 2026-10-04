import { LessonPractice } from "../../types";

// Bài tập khởi động / luyện tập DỄ, xếp TRƯỚC bài tập chính của từng bài để tăng độ khó dần.
// Kết quả mong đợi của mọi test case được sinh bằng cách chạy lời giải mẫu.
export const WARMUP_PRACTICES: Record<string, LessonPractice[]> = {
  "t1-l1": [
    {
      id: "t1-l1-w1",
      title: "Khởi động 1: In dòng chào",
      difficulty: "Cơ bản",
      problemStatement: "Viết chương trình in ra đúng một dòng: `Xin chao Python!`",
      inputFormat: "Không có dữ liệu đầu vào.",
      outputFormat: "Một dòng: `Xin chao Python!`",
      constraints: "Không có ràng buộc đặc biệt.",
      sampleCases: [
        { input: "", output: "Xin chao Python!", explanation: "Ví dụ mẫu 1." }
      ],
      starterCode: "# In ra: Xin chao Python!\n",
      testCases: [
        { id: "t1-l1-w1-tc1", input: "", expectedOutput: "Xin chao Python!", isHidden: false }
      ],
      hints: ["Dùng lệnh `print()` với chuỗi đặt trong dấu nháy."],
      solutionExplanation: "print('Xin chao Python!')"
    },
    {
      id: "t1-l1-w2",
      title: "Khởi động 2: Chào tên của bạn",
      difficulty: "Cơ bản",
      problemStatement: "Nhập tên của một người (một dòng) rồi in ra `Xin chao <ten>!`",
      inputFormat: "Một dòng chứa tên.",
      outputFormat: "Một dòng: `Xin chao <ten>!`",
      constraints: "Không có ràng buộc đặc biệt.",
      sampleCases: [
        { input: "An", output: "Xin chao An!", explanation: "Ví dụ mẫu 1." },
        { input: "Le Thi Mai", output: "Xin chao Le Thi Mai!", explanation: "Ví dụ mẫu 2." }
      ],
      starterCode: "ten = input()\n# TODO: in lời chào\n",
      testCases: [
        { id: "t1-l1-w2-tc1", input: "An", expectedOutput: "Xin chao An!", isHidden: false },
        { id: "t1-l1-w2-tc2", input: "Le Thi Mai", expectedOutput: "Xin chao Le Thi Mai!", isHidden: false },
        { id: "t1-l1-w2-tc3", input: "Minh", expectedOutput: "Xin chao Minh!", isHidden: true }
      ],
      hints: ["Dùng `ten = input()` để nhận tên.", "Dùng f-string: `print(f'Xin chao {ten}!')`"],
      solutionExplanation: "ten = input()\nprint(f'Xin chao {ten}!')"
    }
  ],
  "t1-l2": [
    {
      id: "t1-l2-w1",
      title: "Khởi động 1: In một dòng sao",
      difficulty: "Cơ bản",
      problemStatement: "In ra đúng một dòng gồm 5 dấu `*` cách nhau một khoảng trắng.",
      inputFormat: "Không có dữ liệu đầu vào.",
      outputFormat: "Một dòng: `* * * * *`",
      constraints: "Không có ràng buộc đặc biệt.",
      sampleCases: [
        { input: "", output: "* * * * *", explanation: "Ví dụ mẫu 1." }
      ],
      starterCode: "# In ra: * * * * *\n",
      testCases: [
        { id: "t1-l2-w1-tc1", input: "", expectedOutput: "* * * * *", isHidden: false }
      ],
      hints: ["Chép đúng chuỗi `* * * * *` vào trong `print()`."],
      solutionExplanation: "print('* * * * *')"
    },
    {
      id: "t1-l2-w2",
      title: "Khởi động 2: In hình chữ nhật 2 dòng",
      difficulty: "Cơ bản",
      problemStatement: "In ra hình chữ nhật gồm 2 dòng, mỗi dòng có 5 dấu `*` cách nhau một khoảng trắng.",
      inputFormat: "Không có dữ liệu đầu vào.",
      outputFormat: "2 dòng, mỗi dòng: `* * * * *`",
      constraints: "Không có ràng buộc đặc biệt.",
      sampleCases: [
        { input: "", output: "* * * * *\n* * * * *", explanation: "Ví dụ mẫu 1." }
      ],
      starterCode: "# In ra 2 dòng sao\n",
      testCases: [
        { id: "t1-l2-w2-tc1", input: "", expectedOutput: "* * * * *\n* * * * *", isHidden: false }
      ],
      hints: ["Dùng hai lệnh `print()` liên tiếp."],
      solutionExplanation: "print('* * * * *')\nprint('* * * * *')"
    }
  ],
  "t1-l3": [
    {
      id: "t1-l3-w1",
      title: "Khởi động: In nửa tam giác",
      difficulty: "Cơ bản",
      problemStatement: "In ra 3 dòng: dòng 1 có 1 dấu `*`, dòng 2 có 2 dấu `*`, dòng 3 có 3 dấu `*` (viết liền nhau).",
      inputFormat: "Không có dữ liệu đầu vào.",
      outputFormat: "3 dòng:\n*\n**\n***",
      constraints: "Không có ràng buộc đặc biệt.",
      sampleCases: [
        { input: "", output: "*\n**\n***", explanation: "Ví dụ mẫu 1." }
      ],
      starterCode: "# In 3 dòng sao tăng dần\n",
      testCases: [
        { id: "t1-l3-w1-tc1", input: "", expectedOutput: "*\n**\n***", isHidden: false }
      ],
      hints: ["Mỗi dòng dùng một lệnh `print()`."],
      solutionExplanation: "print('*')\nprint('**')\nprint('***')"
    }
  ],
  "t1-l4": [
    {
      id: "t1-l4-w1",
      title: "Khởi động 1: Dùng sep",
      difficulty: "Cơ bản",
      problemStatement: "Nhập 3 số nguyên (mỗi số một dòng: ngày, tháng, năm). In ra trên một dòng theo dạng `ngay/thang/nam` bằng tham số `sep`.",
      inputFormat: "3 dòng, mỗi dòng một số nguyên.",
      outputFormat: "Một dòng: `ngay/thang/nam`",
      constraints: "Không có ràng buộc đặc biệt.",
      sampleCases: [
        { input: "2\n9\n2026", output: "2/9/2026", explanation: "Ví dụ mẫu 1." },
        { input: "15\n8\n2025", output: "15/8/2025", explanation: "Ví dụ mẫu 2." }
      ],
      starterCode: "ngay = input()\nthang = input()\nnam = input()\n# TODO: in ra bằng sep='/'\n",
      testCases: [
        { id: "t1-l4-w1-tc1", input: "2\n9\n2026", expectedOutput: "2/9/2026", isHidden: false },
        { id: "t1-l4-w1-tc2", input: "15\n8\n2025", expectedOutput: "15/8/2025", isHidden: false },
        { id: "t1-l4-w1-tc3", input: "1\n1\n2000", expectedOutput: "1/1/2000", isHidden: true }
      ],
      hints: ["`print(a, b, c, sep='/')` in các giá trị cách nhau bằng `/`."],
      solutionExplanation: "a = input()\nb = input()\nc = input()\nprint(a, b, c, sep='/')"
    },
    {
      id: "t1-l4-w2",
      title: "Khởi động 2: Dùng end",
      difficulty: "Cơ bản",
      problemStatement: "Nhập 2 từ (mỗi từ một dòng). In hai từ trên CÙNG MỘT DÒNG, cách nhau một dấu cách, bằng tham số `end`.",
      inputFormat: "2 dòng, mỗi dòng một từ.",
      outputFormat: "Một dòng: `<tu1> <tu2>`",
      constraints: "Không có ràng buộc đặc biệt.",
      sampleCases: [
        { input: "Xin\nchao", output: "Xin chao", explanation: "Ví dụ mẫu 1." },
        { input: "Hoc\nPython", output: "Hoc Python", explanation: "Ví dụ mẫu 2." }
      ],
      starterCode: "a = input()\nb = input()\n# TODO: in trên cùng một dòng bằng end=' '\n",
      testCases: [
        { id: "t1-l4-w2-tc1", input: "Xin\nchao", expectedOutput: "Xin chao", isHidden: false },
        { id: "t1-l4-w2-tc2", input: "Hoc\nPython", expectedOutput: "Hoc Python", isHidden: false }
      ],
      hints: ["`print(a, end=' ')` không xuống dòng sau khi in."],
      solutionExplanation: "a = input()\nb = input()\nprint(a, end=' ')\nprint(b)"
    }
  ],
  "t2-l1": [
    {
      id: "t2-l1-w1",
      title: "Khởi động 1: Khai báo biến",
      difficulty: "Cơ bản",
      problemStatement: "Cho sẵn tên `An`, tuổi `16`. Hãy gán vào biến `ten`, `tuoi` rồi in ra 2 dòng: `Ten: An` và `Tuoi: 16`.",
      inputFormat: "Không có dữ liệu đầu vào.",
      outputFormat: "2 dòng:\nTen: An\nTuoi: 16",
      constraints: "Không có ràng buộc đặc biệt.",
      sampleCases: [
        { input: "", output: "Ten: An\nTuoi: 16", explanation: "Ví dụ mẫu 1." }
      ],
      starterCode: "ten = 'An'\ntuoi = 16\n# TODO: in ra 2 dòng\n",
      testCases: [
        { id: "t2-l1-w1-tc1", input: "", expectedOutput: "Ten: An\nTuoi: 16", isHidden: false }
      ],
      hints: ["Dùng `print('Ten:', ten)` để in nhãn và giá trị."],
      solutionExplanation: "ten = 'An'\ntuoi = 16\nprint('Ten:', ten)\nprint('Tuoi:', tuoi)"
    },
    {
      id: "t2-l1-w2",
      title: "Khởi động 2: Nhập họ tên và tuổi",
      difficulty: "Cơ bản",
      problemStatement: "Nhập họ tên (một dòng) và tuổi (một dòng). In ra `Ten: <ten>` và `Tuoi: <tuoi>`.",
      inputFormat: "2 dòng: họ tên, tuổi.",
      outputFormat: "2 dòng:\nTen: <ten>\nTuoi: <tuoi>",
      constraints: "Không có ràng buộc đặc biệt.",
      sampleCases: [
        { input: "An\n16", output: "Ten: An\nTuoi: 16", explanation: "Ví dụ mẫu 1." },
        { input: "Le Thi Mai\n15", output: "Ten: Le Thi Mai\nTuoi: 15", explanation: "Ví dụ mẫu 2." }
      ],
      starterCode: "ten = input()\ntuoi = input()\n# TODO: in ra 2 dòng\n",
      testCases: [
        { id: "t2-l1-w2-tc1", input: "An\n16", expectedOutput: "Ten: An\nTuoi: 16", isHidden: false },
        { id: "t2-l1-w2-tc2", input: "Le Thi Mai\n15", expectedOutput: "Ten: Le Thi Mai\nTuoi: 15", isHidden: false }
      ],
      hints: ["Chưa cần ép kiểu: in luôn giá trị vừa nhập."],
      solutionExplanation: "ten = input()\ntuoi = input()\nprint('Ten:', ten)\nprint('Tuoi:', tuoi)"
    }
  ],
  "t2-l2": [
    {
      id: "t2-l2-w1",
      title: "Khởi động: Cộng 10 vào số vừa nhập",
      difficulty: "Cơ bản",
      problemStatement: "Nhập một số nguyên `n`. Dùng `int()` ép kiểu rồi in ra `n + 10`.",
      inputFormat: "Một dòng chứa số nguyên n.",
      outputFormat: "Một số nguyên: n + 10",
      constraints: "Không có ràng buộc đặc biệt.",
      sampleCases: [
        { input: "5", output: "15", explanation: "Ví dụ mẫu 1." },
        { input: "20", output: "30", explanation: "Ví dụ mẫu 2." }
      ],
      starterCode: "n = int(input())\n# TODO: in n + 10\n",
      testCases: [
        { id: "t2-l2-w1-tc1", input: "5", expectedOutput: "15", isHidden: false },
        { id: "t2-l2-w1-tc2", input: "20", expectedOutput: "30", isHidden: false },
        { id: "t2-l2-w1-tc3", input: "-3", expectedOutput: "7", isHidden: true }
      ],
      hints: ["`input()` trả về chuỗi nên cần `int()` để cộng."],
      solutionExplanation: "n = int(input())\nprint(n + 10)"
    }
  ],
  "t2-l3": [
    {
      id: "t2-l3-w1",
      title: "Khởi động 1: Tính trung bình hai số nguyên",
      difficulty: "Cơ bản",
      problemStatement: "Nhập hai số nguyên `a`, `b` (mỗi số một dòng). In ra trung bình cộng `(a + b) / 2`.",
      inputFormat: "2 dòng, mỗi dòng một số nguyên.",
      outputFormat: "Một số: (a + b) / 2",
      constraints: "Không có ràng buộc đặc biệt.",
      sampleCases: [
        { input: "6\n8", output: "7.0", explanation: "Ví dụ mẫu 1." },
        { input: "7\n8", output: "7.5", explanation: "Ví dụ mẫu 2." }
      ],
      starterCode: "a = int(input())\nb = int(input())\n# TODO: in (a + b) / 2\n",
      testCases: [
        { id: "t2-l3-w1-tc1", input: "6\n8", expectedOutput: "7.0", isHidden: false },
        { id: "t2-l3-w1-tc2", input: "7\n8", expectedOutput: "7.5", isHidden: false },
        { id: "t2-l3-w1-tc3", input: "10\n0", expectedOutput: "5.0", isHidden: true }
      ],
      hints: ["Phép chia `/` luôn cho số thực."],
      solutionExplanation: "a = int(input())\nb = int(input())\nprint((a + b) / 2)"
    },
    {
      id: "t2-l3-w2",
      title: "Khởi động 2: Làm tròn 2 chữ số",
      difficulty: "Cơ bản",
      problemStatement: "Nhập một số thực `x`. In ra `x` với đúng 2 chữ số thập phân.",
      inputFormat: "Một dòng chứa số thực x.",
      outputFormat: "Một dòng: x làm tròn 2 chữ số thập phân",
      constraints: "Không có ràng buộc đặc biệt.",
      sampleCases: [
        { input: "3.14159", output: "3.14", explanation: "Ví dụ mẫu 1." },
        { input: "2", output: "2.00", explanation: "Ví dụ mẫu 2." }
      ],
      starterCode: "x = float(input())\n# TODO: in x với 2 chữ số thập phân\n",
      testCases: [
        { id: "t2-l3-w2-tc1", input: "3.14159", expectedOutput: "3.14", isHidden: false },
        { id: "t2-l3-w2-tc2", input: "2", expectedOutput: "2.00", isHidden: false },
        { id: "t2-l3-w2-tc3", input: "7.5", expectedOutput: "7.50", isHidden: true }
      ],
      hints: ["Dùng `f'{x:.2f}'`."],
      solutionExplanation: "x = float(input())\nprint(f'{x:.2f}')"
    }
  ],
  "t2-l4": [
    {
      id: "t2-l4-w1",
      title: "Khởi động: Ép kiểu sang số thực",
      difficulty: "Cơ bản",
      problemStatement: "Nhập một số nguyên `n`. In ra `n` dưới dạng số thực bằng `float(n)`.",
      inputFormat: "Một dòng chứa số nguyên n.",
      outputFormat: "Một số thực, ví dụ `10.0`",
      constraints: "Không có ràng buộc đặc biệt.",
      sampleCases: [
        { input: "10", output: "10.0", explanation: "Ví dụ mẫu 1." },
        { input: "3", output: "3.0", explanation: "Ví dụ mẫu 2." }
      ],
      starterCode: "n = int(input())\n# TODO: in float(n)\n",
      testCases: [
        { id: "t2-l4-w1-tc1", input: "10", expectedOutput: "10.0", isHidden: false },
        { id: "t2-l4-w1-tc2", input: "3", expectedOutput: "3.0", isHidden: false },
        { id: "t2-l4-w1-tc3", input: "-4", expectedOutput: "-4.0", isHidden: true }
      ],
      hints: ["`float(10)` cho kết quả `10.0`."],
      solutionExplanation: "n = int(input())\nprint(float(n))"
    }
  ],
  "t2-l5": [
    {
      id: "t2-l5-w1",
      title: "Khởi động 1: Viền ký tự #",
      difficulty: "Cơ bản",
      problemStatement: "In ra một dòng gồm 20 ký tự `#` bằng phép nhân chuỗi.",
      inputFormat: "Không có dữ liệu đầu vào.",
      outputFormat: "Một dòng gồm 20 ký tự `#`",
      constraints: "Không có ràng buộc đặc biệt.",
      sampleCases: [
        { input: "", output: "####################", explanation: "Ví dụ mẫu 1." }
      ],
      starterCode: "# In 20 ký tự #\n",
      testCases: [
        { id: "t2-l5-w1-tc1", input: "", expectedOutput: "####################", isHidden: false }
      ],
      hints: ["`'#' * 20` lặp ký tự 20 lần."],
      solutionExplanation: "print('#' * 20)"
    },
    {
      id: "t2-l5-w2",
      title: "Khởi động 2: Khung đơn giản",
      difficulty: "Cơ bản",
      problemStatement: "Nhập một tên. In ra 3 dòng: viền 20 dấu `#`, dòng `# <ten>`, rồi viền 20 dấu `#`.",
      inputFormat: "Một dòng chứa tên.",
      outputFormat: "3 dòng theo mẫu.",
      constraints: "Không có ràng buộc đặc biệt.",
      sampleCases: [
        { input: "An", output: "####################\n# An\n####################", explanation: "Ví dụ mẫu 1." },
        { input: "Le Thi Mai", output: "####################\n# Le Thi Mai\n####################", explanation: "Ví dụ mẫu 2." }
      ],
      starterCode: "ten = input()\n# TODO: in khung 3 dòng\n",
      testCases: [
        { id: "t2-l5-w2-tc1", input: "An", expectedOutput: "####################\n# An\n####################", isHidden: false },
        { id: "t2-l5-w2-tc2", input: "Le Thi Mai", expectedOutput: "####################\n# Le Thi Mai\n####################", isHidden: false }
      ],
      hints: ["Viền trên, nội dung, viền dưới."],
      solutionExplanation: "ten = input()\nprint('#' * 20)\nprint('#', ten)\nprint('#' * 20)"
    }
  ],
  "t3-l1": [
    {
      id: "t3-l1-w1",
      title: "Khởi động: Cộng hai số",
      difficulty: "Cơ bản",
      problemStatement: "Nhập hai số nguyên `a`, `b` (mỗi số một dòng). In ra `a + b`.",
      inputFormat: "2 dòng, mỗi dòng một số nguyên.",
      outputFormat: "Một số nguyên: a + b",
      constraints: "Không có ràng buộc đặc biệt.",
      sampleCases: [
        { input: "3\n4", output: "7", explanation: "Ví dụ mẫu 1." },
        { input: "10\n-2", output: "8", explanation: "Ví dụ mẫu 2." }
      ],
      starterCode: "a = int(input())\nb = int(input())\n# TODO: in a + b\n",
      testCases: [
        { id: "t3-l1-w1-tc1", input: "3\n4", expectedOutput: "7", isHidden: false },
        { id: "t3-l1-w1-tc2", input: "10\n-2", expectedOutput: "8", isHidden: false },
        { id: "t3-l1-w1-tc3", input: "0\n0", expectedOutput: "0", isHidden: true }
      ],
      hints: ["Nhớ dùng `int(input())`."],
      solutionExplanation: "a = int(input())\nb = int(input())\nprint(a + b)"
    }
  ],
  "t3-l2": [
    {
      id: "t3-l2-w1",
      title: "Khởi động: Tiền mua vở",
      difficulty: "Cơ bản",
      problemStatement: "Một quyển vở giá 8.000 đồng. Nhập số quyển `x`, in ra tổng tiền `x * 8000`.",
      inputFormat: "Một dòng chứa số nguyên x.",
      outputFormat: "Một số nguyên: tổng tiền",
      constraints: "Không có ràng buộc đặc biệt.",
      sampleCases: [
        { input: "1", output: "8000", explanation: "Ví dụ mẫu 1." },
        { input: "5", output: "40000", explanation: "Ví dụ mẫu 2." }
      ],
      starterCode: "x = int(input())\n# TODO: in x * 8000\n",
      testCases: [
        { id: "t3-l2-w1-tc1", input: "1", expectedOutput: "8000", isHidden: false },
        { id: "t3-l2-w1-tc2", input: "5", expectedOutput: "40000", isHidden: false },
        { id: "t3-l2-w1-tc3", input: "0", expectedOutput: "0", isHidden: true }
      ],
      hints: ["Tổng tiền = số lượng × đơn giá."],
      solutionExplanation: "x = int(input())\nprint(x * 8000)"
    }
  ],
  "t3-l3": [
    {
      id: "t3-l3-w1",
      title: "Khởi động: Chia lấy nguyên và dư",
      difficulty: "Cơ bản",
      problemStatement: "Nhập số nguyên `n`. In 2 dòng: `n // 10` và `n % 10`.",
      inputFormat: "Một dòng chứa số nguyên không âm n.",
      outputFormat: "2 dòng: thương và dư khi chia cho 10",
      constraints: "Không có ràng buộc đặc biệt.",
      sampleCases: [
        { input: "47", output: "4\n7", explanation: "Ví dụ mẫu 1." },
        { input: "305", output: "30\n5", explanation: "Ví dụ mẫu 2." }
      ],
      starterCode: "n = int(input())\n# TODO: in n // 10 và n % 10\n",
      testCases: [
        { id: "t3-l3-w1-tc1", input: "47", expectedOutput: "4\n7", isHidden: false },
        { id: "t3-l3-w1-tc2", input: "305", expectedOutput: "30\n5", isHidden: false },
        { id: "t3-l3-w1-tc3", input: "9", expectedOutput: "0\n9", isHidden: true }
      ],
      hints: ["`//` chia lấy phần nguyên, `%` chia lấy phần dư."],
      solutionExplanation: "n = int(input())\nprint(n // 10)\nprint(n % 10)"
    },
    {
      id: "t3-l3-w2",
      title: "Luyện tập: Đổi phút sang giờ",
      difficulty: "Cơ bản",
      problemStatement: "Nhập số phút `p`. In `<h> gio <m> phut` (h là số giờ, m là số phút còn lại).",
      inputFormat: "Một dòng chứa số nguyên không âm p.",
      outputFormat: "Một dòng: `<h> gio <m> phut`",
      constraints: "Không có ràng buộc đặc biệt.",
      sampleCases: [
        { input: "135", output: "2 gio 15 phut", explanation: "Ví dụ mẫu 1." },
        { input: "60", output: "1 gio 0 phut", explanation: "Ví dụ mẫu 2." }
      ],
      starterCode: "p = int(input())\n# TODO: dùng // và %\n",
      testCases: [
        { id: "t3-l3-w2-tc1", input: "135", expectedOutput: "2 gio 15 phut", isHidden: false },
        { id: "t3-l3-w2-tc2", input: "60", expectedOutput: "1 gio 0 phut", isHidden: false },
        { id: "t3-l3-w2-tc3", input: "45", expectedOutput: "0 gio 45 phut", isHidden: true }
      ],
      hints: ["1 giờ = 60 phút.", "`h = p // 60`, `m = p % 60`."],
      solutionExplanation: "p = int(input())\nprint(p // 60, 'gio', p % 60, 'phut')"
    }
  ],
  "t3-l4": [
    {
      id: "t3-l4-w1",
      title: "Khởi động: Chu vi hình vuông",
      difficulty: "Cơ bản",
      problemStatement: "Nhập cạnh `a` của hình vuông (số nguyên). In ra chu vi `4 * a`.",
      inputFormat: "Một dòng chứa số nguyên a.",
      outputFormat: "Một số nguyên: chu vi",
      constraints: "Không có ràng buộc đặc biệt.",
      sampleCases: [
        { input: "3", output: "12", explanation: "Ví dụ mẫu 1." },
        { input: "10", output: "40", explanation: "Ví dụ mẫu 2." }
      ],
      starterCode: "a = int(input())\n# TODO: in chu vi\n",
      testCases: [
        { id: "t3-l4-w1-tc1", input: "3", expectedOutput: "12", isHidden: false },
        { id: "t3-l4-w1-tc2", input: "10", expectedOutput: "40", isHidden: false },
        { id: "t3-l4-w1-tc3", input: "7", expectedOutput: "28", isHidden: true }
      ],
      hints: ["Chu vi hình vuông = 4 × cạnh."],
      solutionExplanation: "a = int(input())\nprint(4 * a)"
    },
    {
      id: "t3-l4-w2",
      title: "Luyện tập: Diện tích hình tròn",
      difficulty: "Cơ bản",
      problemStatement: "Nhập bán kính `r`. Dùng `math.pi` in diện tích `pi * r ** 2` với 2 chữ số thập phân.",
      inputFormat: "Một dòng chứa số thực r.",
      outputFormat: "Một số thực 2 chữ số thập phân",
      constraints: "Không có ràng buộc đặc biệt.",
      sampleCases: [
        { input: "1", output: "3.14", explanation: "Ví dụ mẫu 1." },
        { input: "2.5", output: "19.63", explanation: "Ví dụ mẫu 2." }
      ],
      starterCode: "import math\nr = float(input())\n# TODO: in diện tích\n",
      testCases: [
        { id: "t3-l4-w2-tc1", input: "1", expectedOutput: "3.14", isHidden: false },
        { id: "t3-l4-w2-tc2", input: "2.5", expectedOutput: "19.63", isHidden: false },
        { id: "t3-l4-w2-tc3", input: "10", expectedOutput: "314.16", isHidden: true }
      ],
      hints: ["`import math` ở đầu chương trình.", "Dùng `f'{S:.2f}'` để làm tròn."],
      solutionExplanation: "import math\nr = float(input())\nprint(f'{math.pi * r ** 2:.2f}')"
    }
  ],
  "t3-l5": [
    {
      id: "t3-l5-w1",
      title: "Khởi động: Đổi USD sang VND",
      difficulty: "Cơ bản",
      problemStatement: "Tỷ giá 1 USD = 25000 VND. Nhập số USD, in ra số VND (không cần dấu phẩy).",
      inputFormat: "Một dòng chứa số nguyên usd.",
      outputFormat: "Một số nguyên: số VND",
      constraints: "Không có ràng buộc đặc biệt.",
      sampleCases: [
        { input: "1", output: "25000", explanation: "Ví dụ mẫu 1." },
        { input: "100", output: "2500000", explanation: "Ví dụ mẫu 2." }
      ],
      starterCode: "usd = int(input())\n# TODO: in usd * 25000\n",
      testCases: [
        { id: "t3-l5-w1-tc1", input: "1", expectedOutput: "25000", isHidden: false },
        { id: "t3-l5-w1-tc2", input: "100", expectedOutput: "2500000", isHidden: false },
        { id: "t3-l5-w1-tc3", input: "2500", expectedOutput: "62500000", isHidden: true }
      ],
      hints: ["VND = USD × 25000."],
      solutionExplanation: "usd = int(input())\nprint(usd * 25000)"
    }
  ],
  "t3-l6": [
    {
      id: "t3-l6-w1",
      title: "Khởi động: So sánh hai số",
      difficulty: "Cơ bản",
      problemStatement: "Nhập hai số nguyên `a`, `b` (mỗi số một dòng). In ra `True` nếu `a > b`, ngược lại in `False` (không dùng `if`).",
      inputFormat: "2 dòng, mỗi dòng một số nguyên.",
      outputFormat: "`True` hoặc `False`",
      constraints: "Không có ràng buộc đặc biệt.",
      sampleCases: [
        { input: "5\n3", output: "True", explanation: "Ví dụ mẫu 1." },
        { input: "2\n9", output: "False", explanation: "Ví dụ mẫu 2." }
      ],
      starterCode: "a = int(input())\nb = int(input())\n# TODO: print(a > b)\n",
      testCases: [
        { id: "t3-l6-w1-tc1", input: "5\n3", expectedOutput: "True", isHidden: false },
        { id: "t3-l6-w1-tc2", input: "2\n9", expectedOutput: "False", isHidden: false },
        { id: "t3-l6-w1-tc3", input: "4\n4", expectedOutput: "False", isHidden: true }
      ],
      hints: ["Biểu thức so sánh tự cho kết quả `True`/`False`."],
      solutionExplanation: "a = int(input())\nb = int(input())\nprint(a > b)"
    }
  ],
  "t6-l2": [
    {
      id: "t6-l2-w1",
      title: "Khởi động: So sánh một lần đoán",
      difficulty: "Cơ bản",
      problemStatement: "Nhập số bí mật `target`, rồi nhập một số đoán `guess`. In `LON HON` nếu guess < target, `NHO HON` nếu guess > target, `CHUC MUNG` nếu bằng.",
      inputFormat: "2 dòng: target, guess.",
      outputFormat: "Một dòng: `LON HON`, `NHO HON` hoặc `CHUC MUNG`",
      constraints: "Không có ràng buộc đặc biệt.",
      sampleCases: [
        { input: "40\n25", output: "LON HON", explanation: "Ví dụ mẫu 1." },
        { input: "40\n70", output: "NHO HON", explanation: "Ví dụ mẫu 2." }
      ],
      starterCode: "target = int(input())\nguess = int(input())\n# TODO: so sánh và in kết quả\n",
      testCases: [
        { id: "t6-l2-w1-tc1", input: "40\n25", expectedOutput: "LON HON", isHidden: false },
        { id: "t6-l2-w1-tc2", input: "40\n70", expectedOutput: "NHO HON", isHidden: false },
        { id: "t6-l2-w1-tc3", input: "40\n40", expectedOutput: "CHUC MUNG", isHidden: true }
      ],
      hints: ["Dùng `if / elif / else`."],
      solutionExplanation: "t = int(input())\ng = int(input())\nif g < t:\n    print('LON HON')\nelif g > t:\n    print('NHO HON')\nelse:\n    print('CHUC MUNG')"
    }
  ],
  "t7-l1": [
    {
      id: "t7-l1-w1",
      title: "Khởi động 1: Viết hoa và viết thường",
      difficulty: "Cơ bản",
      problemStatement: "Nhập một chuỗi. In ra 2 dòng: chuỗi viết HOA (`upper()`) và chuỗi viết thường (`lower()`).",
      inputFormat: "Một dòng chứa chuỗi.",
      outputFormat: "2 dòng: chuỗi HOA rồi chuỗi thường",
      constraints: "Không có ràng buộc đặc biệt.",
      sampleCases: [
        { input: "Hello World", output: "HELLO WORLD\nhello world", explanation: "Ví dụ mẫu 1." },
        { input: "python", output: "PYTHON\npython", explanation: "Ví dụ mẫu 2." }
      ],
      starterCode: "s = input()\n# TODO: in upper() và lower()\n",
      testCases: [
        { id: "t7-l1-w1-tc1", input: "Hello World", expectedOutput: "HELLO WORLD\nhello world", isHidden: false },
        { id: "t7-l1-w1-tc2", input: "python", expectedOutput: "PYTHON\npython", isHidden: false },
        { id: "t7-l1-w1-tc3", input: "LE thi MAI", expectedOutput: "LE THI MAI\nle thi mai", isHidden: true }
      ],
      hints: ["`s.upper()` và `s.lower()` trả về chuỗi mới."],
      solutionExplanation: "s = input()\nprint(s.upper())\nprint(s.lower())"
    },
    {
      id: "t7-l1-w2",
      title: "Khởi động 2: Đếm số từ",
      difficulty: "Cơ bản",
      problemStatement: "Nhập một câu (các từ cách nhau bởi dấu cách, có thể thừa dấu cách). In ra số từ bằng `len(s.split())`.",
      inputFormat: "Một dòng chứa câu.",
      outputFormat: "Một số nguyên: số từ",
      constraints: "Không có ràng buộc đặc biệt.",
      sampleCases: [
        { input: "xin chao cac ban", output: "4", explanation: "Ví dụ mẫu 1." },
        { input: "  hoc   python  ", output: "2", explanation: "Ví dụ mẫu 2." }
      ],
      starterCode: "s = input()\n# TODO: dùng split() và len()\n",
      testCases: [
        { id: "t7-l1-w2-tc1", input: "xin chao cac ban", expectedOutput: "4", isHidden: false },
        { id: "t7-l1-w2-tc2", input: "  hoc   python  ", expectedOutput: "2", isHidden: false },
        { id: "t7-l1-w2-tc3", input: "an", expectedOutput: "1", isHidden: true }
      ],
      hints: ["`s.split()` tách thành list các từ, bỏ khoảng trắng thừa."],
      solutionExplanation: "s = input()\nprint(len(s.split()))"
    }
  ],
  "t7-l2": [
    {
      id: "t7-l2-w1",
      title: "Khởi động: Độ dài và ký tự đầu",
      difficulty: "Cơ bản",
      problemStatement: "Nhập một chuỗi (không rỗng). In ra 2 dòng: độ dài chuỗi và ký tự đầu tiên.",
      inputFormat: "Một dòng chứa chuỗi.",
      outputFormat: "2 dòng: độ dài, ký tự đầu",
      constraints: "Không có ràng buộc đặc biệt.",
      sampleCases: [
        { input: "Python", output: "6\nP", explanation: "Ví dụ mẫu 1." },
        { input: "a", output: "1\na", explanation: "Ví dụ mẫu 2." }
      ],
      starterCode: "s = input()\n# TODO: in len(s) và s[0]\n",
      testCases: [
        { id: "t7-l2-w1-tc1", input: "Python", expectedOutput: "6\nP", isHidden: false },
        { id: "t7-l2-w1-tc2", input: "a", expectedOutput: "1\na", isHidden: false },
        { id: "t7-l2-w1-tc3", input: "Xin chao", expectedOutput: "8\nX", isHidden: true }
      ],
      hints: ["`len(s)` là độ dài; `s[0]` là ký tự đầu."],
      solutionExplanation: "s = input()\nprint(len(s))\nprint(s[0])"
    }
  ],
  "t7-l3": [
    {
      id: "t7-l3-w1",
      title: "Khởi động: So sánh hai chuỗi",
      difficulty: "Cơ bản",
      problemStatement: "Nhập hai chuỗi (mỗi chuỗi một dòng). In `YES` nếu hai chuỗi giống hệt nhau, ngược lại in `NO`.",
      inputFormat: "2 dòng, mỗi dòng một chuỗi.",
      outputFormat: "`YES` hoặc `NO`",
      constraints: "Không có ràng buộc đặc biệt.",
      sampleCases: [
        { input: "abc\nabc", output: "YES", explanation: "Ví dụ mẫu 1." },
        { input: "abc\nabd", output: "NO", explanation: "Ví dụ mẫu 2." }
      ],
      starterCode: "a = input()\nb = input()\n# TODO: so sánh a == b\n",
      testCases: [
        { id: "t7-l3-w1-tc1", input: "abc\nabc", expectedOutput: "YES", isHidden: false },
        { id: "t7-l3-w1-tc2", input: "abc\nabd", expectedOutput: "NO", isHidden: false },
        { id: "t7-l3-w1-tc3", input: "Hi\nhi", expectedOutput: "NO", isHidden: true }
      ],
      hints: ["Dùng `if a == b:`."],
      solutionExplanation: "a = input()\nb = input()\nprint('YES' if a == b else 'NO')"
    }
  ],
  "t7-l4": [
    {
      id: "t7-l4-w1",
      title: "Khởi động: Hai ký tự đầu và cuối",
      difficulty: "Cơ bản",
      problemStatement: "Nhập một chuỗi có ít nhất 2 ký tự. In 2 dòng: hai ký tự đầu `s[:2]` và hai ký tự cuối `s[-2:]`.",
      inputFormat: "Một dòng chứa chuỗi.",
      outputFormat: "2 dòng",
      constraints: "Không có ràng buộc đặc biệt.",
      sampleCases: [
        { input: "ABCDEF", output: "AB\nEF", explanation: "Ví dụ mẫu 1." },
        { input: "Python", output: "Py\non", explanation: "Ví dụ mẫu 2." }
      ],
      starterCode: "s = input()\n# TODO: in s[:2] và s[-2:]\n",
      testCases: [
        { id: "t7-l4-w1-tc1", input: "ABCDEF", expectedOutput: "AB\nEF", isHidden: false },
        { id: "t7-l4-w1-tc2", input: "Python", expectedOutput: "Py\non", isHidden: false },
        { id: "t7-l4-w1-tc3", input: "ab", expectedOutput: "ab\nab", isHidden: true }
      ],
      hints: ["`s[:2]` lấy từ đầu đến chỉ số 1; `s[-2:]` lấy 2 ký tự cuối."],
      solutionExplanation: "s = input()\nprint(s[:2])\nprint(s[-2:])"
    }
  ],
  "t7-l5": [
    {
      id: "t7-l5-w1",
      title: "Khởi động: Lấy họ và tên",
      difficulty: "Cơ bản",
      problemStatement: "Nhập họ tên đầy đủ (ít nhất 2 từ). In 2 dòng: `Ho: <từ đầu>` và `Ten: <từ cuối>`.",
      inputFormat: "Một dòng chứa họ tên.",
      outputFormat: "2 dòng: `Ho: ...` và `Ten: ...`",
      constraints: "Không có ràng buộc đặc biệt.",
      sampleCases: [
        { input: "Nguyen Van An", output: "Ho: Nguyen\nTen: An", explanation: "Ví dụ mẫu 1." },
        { input: "Le Mai", output: "Ho: Le\nTen: Mai", explanation: "Ví dụ mẫu 2." }
      ],
      starterCode: "words = input().split()\n# TODO: in họ (words[0]) và tên (words[-1])\n",
      testCases: [
        { id: "t7-l5-w1-tc1", input: "Nguyen Van An", expectedOutput: "Ho: Nguyen\nTen: An", isHidden: false },
        { id: "t7-l5-w1-tc2", input: "Le Mai", expectedOutput: "Ho: Le\nTen: Mai", isHidden: false },
        { id: "t7-l5-w1-tc3", input: "Tran Thi Hong Nhung", expectedOutput: "Ho: Tran\nTen: Nhung", isHidden: true }
      ],
      hints: ["`words[0]` là từ đầu, `words[-1]` là từ cuối."],
      solutionExplanation: "w = input().split()\nprint('Ho:', w[0])\nprint('Ten:', w[-1])"
    }
  ],
  "t8-l1": [
    {
      id: "t8-l1-w1",
      title: "Khởi động: Hàm chào",
      difficulty: "Cơ bản",
      problemStatement: "Viết hàm `chao()` in ra `Xin chao!`. Chương trình chính gọi hàm đúng 2 lần.",
      inputFormat: "Không có dữ liệu đầu vào.",
      outputFormat: "2 dòng: `Xin chao!`",
      constraints: "Không có ràng buộc đặc biệt.",
      sampleCases: [
        { input: "", output: "Xin chao!\nXin chao!", explanation: "Ví dụ mẫu 1." }
      ],
      starterCode: "def chao():\n    # TODO: in Xin chao!\n    pass\n\nchao()\nchao()\n",
      testCases: [
        { id: "t8-l1-w1-tc1", input: "", expectedOutput: "Xin chao!\nXin chao!", isHidden: false }
      ],
      hints: ["Khai báo bằng `def chao():` và thụt lề thân hàm."],
      solutionExplanation: "def chao():\n    print('Xin chao!')\n\nchao()\nchao()"
    }
  ],
  "t8-l2": [
    {
      id: "t8-l2-w1",
      title: "Khởi động: Hàm bình phương",
      difficulty: "Cơ bản",
      problemStatement: "Viết hàm `binh_phuong(x)` trả về `x * x`. Chương trình chính nhập `x` (số nguyên) và in kết quả.",
      inputFormat: "Một dòng chứa số nguyên x.",
      outputFormat: "Một số nguyên: x bình phương",
      constraints: "Không có ràng buộc đặc biệt.",
      sampleCases: [
        { input: "5", output: "25", explanation: "Ví dụ mẫu 1." },
        { input: "-3", output: "9", explanation: "Ví dụ mẫu 2." }
      ],
      starterCode: "def binh_phuong(x):\n    # TODO: return x * x\n    pass\n\nx = int(input())\nprint(binh_phuong(x))\n",
      testCases: [
        { id: "t8-l2-w1-tc1", input: "5", expectedOutput: "25", isHidden: false },
        { id: "t8-l2-w1-tc2", input: "-3", expectedOutput: "9", isHidden: false },
        { id: "t8-l2-w1-tc3", input: "0", expectedOutput: "0", isHidden: true }
      ],
      hints: ["Dùng `return` để trả kết quả."],
      solutionExplanation: "def binh_phuong(x):\n    return x * x\n\nx = int(input())\nprint(binh_phuong(x))"
    },
    {
      id: "t8-l2-w2",
      title: "Luyện tập: Hàm trả về hai giá trị",
      difficulty: "Cơ bản",
      problemStatement: "Viết hàm `min_max(a, b)` trả về `(nhỏ nhất, lớn nhất)`. Chương trình chính nhập 2 số nguyên và in `<nho> <lon>`.",
      inputFormat: "2 dòng, mỗi dòng một số nguyên.",
      outputFormat: "Một dòng: `<nho> <lon>`",
      constraints: "Không có ràng buộc đặc biệt.",
      sampleCases: [
        { input: "7\n3", output: "3 7", explanation: "Ví dụ mẫu 1." },
        { input: "1\n9", output: "1 9", explanation: "Ví dụ mẫu 2." }
      ],
      starterCode: "def min_max(a, b):\n    # TODO: return nho, lon\n    pass\n\na = int(input())\nb = int(input())\nnho, lon = min_max(a, b)\nprint(nho, lon)\n",
      testCases: [
        { id: "t8-l2-w2-tc1", input: "7\n3", expectedOutput: "3 7", isHidden: false },
        { id: "t8-l2-w2-tc2", input: "1\n9", expectedOutput: "1 9", isHidden: false },
        { id: "t8-l2-w2-tc3", input: "5\n5", expectedOutput: "5 5", isHidden: true }
      ],
      hints: ["`return x, y` trả về hai giá trị.", "Nhận bằng `nho, lon = min_max(a, b)`."],
      solutionExplanation: "def min_max(a, b):\n    return min(a, b), max(a, b)\n\na = int(input())\nb = int(input())\nnho, lon = min_max(a, b)\nprint(nho, lon)"
    }
  ],
  "t8-l3": [
    {
      id: "t8-l3-w1",
      title: "Khởi động: Hàm kiểm tra số dương",
      difficulty: "Cơ bản",
      problemStatement: "Viết hàm `is_positive(n)` trả về `True` nếu `n > 0`, ngược lại `False`. Chương trình chính nhập `n` và in kết quả.",
      inputFormat: "Một dòng chứa số nguyên n.",
      outputFormat: "`True` hoặc `False`",
      constraints: "Không có ràng buộc đặc biệt.",
      sampleCases: [
        { input: "5", output: "True", explanation: "Ví dụ mẫu 1." },
        { input: "-2", output: "False", explanation: "Ví dụ mẫu 2." }
      ],
      starterCode: "def is_positive(n):\n    # TODO\n    pass\n\nprint(is_positive(int(input())))\n",
      testCases: [
        { id: "t8-l3-w1-tc1", input: "5", expectedOutput: "True", isHidden: false },
        { id: "t8-l3-w1-tc2", input: "-2", expectedOutput: "False", isHidden: false },
        { id: "t8-l3-w1-tc3", input: "0", expectedOutput: "False", isHidden: true }
      ],
      hints: ["`return n > 0` trả về True/False."],
      solutionExplanation: "def is_positive(n):\n    return n > 0\n\nprint(is_positive(int(input())))"
    }
  ],
  "t8-l4": [
    {
      id: "t8-l4-w1",
      title: "Khởi động: Hàm viết hoa chữ đầu",
      difficulty: "Cơ bản",
      problemStatement: "Viết hàm `viet_hoa(s)` trả về chuỗi `s` với chữ cái đầu viết hoa (dùng `capitalize()`). Chương trình chính nhập `s` và in kết quả.",
      inputFormat: "Một dòng chứa một từ.",
      outputFormat: "Một dòng: từ đã viết hoa chữ đầu",
      constraints: "Không có ràng buộc đặc biệt.",
      sampleCases: [
        { input: "an", output: "An", explanation: "Ví dụ mẫu 1." },
        { input: "HOA", output: "Hoa", explanation: "Ví dụ mẫu 2." }
      ],
      starterCode: "def viet_hoa(s):\n    # TODO\n    pass\n\nprint(viet_hoa(input()))\n",
      testCases: [
        { id: "t8-l4-w1-tc1", input: "an", expectedOutput: "An", isHidden: false },
        { id: "t8-l4-w1-tc2", input: "HOA", expectedOutput: "Hoa", isHidden: false },
        { id: "t8-l4-w1-tc3", input: "mINH", expectedOutput: "Minh", isHidden: true }
      ],
      hints: ["`s.capitalize()` viết hoa chữ đầu, các chữ còn lại thường."],
      solutionExplanation: "def viet_hoa(s):\n    return s.capitalize()\n\nprint(viet_hoa(input()))"
    },
    {
      id: "t8-l4-w2",
      title: "Luyện tập: Hàm bỏ khoảng trắng thừa",
      difficulty: "Trung bình",
      problemStatement: "Viết hàm `gon(s)` trả về chuỗi với các từ cách nhau đúng một dấu cách (dùng `split()` và `join()`). Chương trình chính nhập `s` và in kết quả.",
      inputFormat: "Một dòng chứa chuỗi.",
      outputFormat: "Một dòng: chuỗi đã gọn",
      constraints: "Không có ràng buộc đặc biệt.",
      sampleCases: [
        { input: "  xin   chao  ban ", output: "xin chao ban", explanation: "Ví dụ mẫu 1." },
        { input: "a    b", output: "a b", explanation: "Ví dụ mẫu 2." }
      ],
      starterCode: "def gon(s):\n    # TODO: dùng split() và join()\n    pass\n\nprint(gon(input()))\n",
      testCases: [
        { id: "t8-l4-w2-tc1", input: "  xin   chao  ban ", expectedOutput: "xin chao ban", isHidden: false },
        { id: "t8-l4-w2-tc2", input: "a    b", expectedOutput: "a b", isHidden: false },
        { id: "t8-l4-w2-tc3", input: "python", expectedOutput: "python", isHidden: true }
      ],
      hints: ["`s.split()` bỏ khoảng trắng thừa.", "`' '.join(words)` nối lại."],
      solutionExplanation: "def gon(s):\n    return ' '.join(s.split())\n\nprint(gon(input()))"
    }
  ],
  "t8-l5": [
    {
      id: "t8-l5-w1",
      title: "Khởi động: Chuyển chuỗi sang số an toàn",
      difficulty: "Cơ bản",
      problemStatement: "Nhập một dòng. Nếu ép được sang số nguyên thì in `So hop le: <so>`, nếu lỗi thì in `Khong phai so`. Dùng `try / except ValueError`.",
      inputFormat: "Một dòng chứa chuỗi.",
      outputFormat: "Một dòng theo mẫu",
      constraints: "Không có ràng buộc đặc biệt.",
      sampleCases: [
        { input: "15", output: "So hop le: 15", explanation: "Ví dụ mẫu 1." },
        { input: "abc", output: "Khong phai so", explanation: "Ví dụ mẫu 2." }
      ],
      starterCode: "s = input()\ntry:\n    # TODO: ép kiểu và in\n    pass\nexcept ValueError:\n    # TODO: báo lỗi\n    pass\n",
      testCases: [
        { id: "t8-l5-w1-tc1", input: "15", expectedOutput: "So hop le: 15", isHidden: false },
        { id: "t8-l5-w1-tc2", input: "abc", expectedOutput: "Khong phai so", isHidden: false },
        { id: "t8-l5-w1-tc3", input: "-7", expectedOutput: "So hop le: -7", isHidden: true }
      ],
      hints: ["Đặt `int(s)` trong khối `try`."],
      solutionExplanation: "s = input()\ntry:\n    n = int(s)\n    print('So hop le:', n)\nexcept ValueError:\n    print('Khong phai so')"
    },
    {
      id: "t8-l5-w2",
      title: "Luyện tập: Nhập lại đến khi là số",
      difficulty: "Trung bình",
      problemStatement: "Đọc lần lượt từng dòng cho đến khi gặp một dòng là số nguyên. In `Gia tri: <so>` rồi dừng.",
      inputFormat: "Các dòng dữ liệu (dòng cuối chắc chắn là số).",
      outputFormat: "Một dòng: `Gia tri: <so>`",
      constraints: "Không có ràng buộc đặc biệt.",
      sampleCases: [
        { input: "abc\nxyz\n42", output: "Gia tri: 42", explanation: "Ví dụ mẫu 1." },
        { input: "7", output: "Gia tri: 7", explanation: "Ví dụ mẫu 2." }
      ],
      starterCode: "while True:\n    s = input()\n    try:\n        # TODO: ép kiểu, in kết quả rồi break\n        pass\n    except ValueError:\n        pass\n",
      testCases: [
        { id: "t8-l5-w2-tc1", input: "abc\nxyz\n42", expectedOutput: "Gia tri: 42", isHidden: false },
        { id: "t8-l5-w2-tc2", input: "7", expectedOutput: "Gia tri: 7", isHidden: false },
        { id: "t8-l5-w2-tc3", input: "a\n-5", expectedOutput: "Gia tri: -5", isHidden: true }
      ],
      hints: ["Dùng `while True:` kết hợp `break`."],
      solutionExplanation: "import sys\nfor line in sys.stdin.read().split('\\n'):\n    try:\n        n = int(line)\n        print('Gia tri:', n)\n        break\n    except ValueError:\n        continue"
    }
  ],
  "t9-l1": [
    {
      id: "t9-l1-w1",
      title: "Khởi động: Đệ quy đếm ngược",
      difficulty: "Cơ bản",
      problemStatement: "Viết hàm đệ quy `dem_nguoc(n)` in các số từ `n` về 1, mỗi số một dòng. Chương trình chính nhập `n` rồi gọi hàm.",
      inputFormat: "Một dòng chứa số nguyên dương n (n <= 20).",
      outputFormat: "n dòng: n, n-1, ..., 1",
      constraints: "Không có ràng buộc đặc biệt.",
      sampleCases: [
        { input: "3", output: "3\n2\n1", explanation: "Ví dụ mẫu 1." },
        { input: "1", output: "1", explanation: "Ví dụ mẫu 2." }
      ],
      starterCode: "def dem_nguoc(n):\n    # TODO: điều kiện dừng và gọi lại chính nó\n    pass\n\ndem_nguoc(int(input()))\n",
      testCases: [
        { id: "t9-l1-w1-tc1", input: "3", expectedOutput: "3\n2\n1", isHidden: false },
        { id: "t9-l1-w1-tc2", input: "1", expectedOutput: "1", isHidden: false },
        { id: "t9-l1-w1-tc3", input: "5", expectedOutput: "5\n4\n3\n2\n1", isHidden: true }
      ],
      hints: ["Điều kiện dừng: `if n == 0: return`.", "In `n` rồi gọi `dem_nguoc(n - 1)`."],
      solutionExplanation: "def dem_nguoc(n):\n    if n == 0:\n        return\n    print(n)\n    dem_nguoc(n - 1)\n\ndem_nguoc(int(input()))"
    },
    {
      id: "t9-l1-w2",
      title: "Luyện tập: Đệ quy tính lũy thừa 2",
      difficulty: "Cơ bản",
      problemStatement: "Viết hàm đệ quy `luy_thua2(n)` trả về 2^n (n >= 0). Chương trình chính nhập `n` và in kết quả.",
      inputFormat: "Một dòng chứa số nguyên n (0 <= n <= 30).",
      outputFormat: "Một số nguyên: 2^n",
      constraints: "Không có ràng buộc đặc biệt.",
      sampleCases: [
        { input: "0", output: "1", explanation: "Ví dụ mẫu 1." },
        { input: "3", output: "8", explanation: "Ví dụ mẫu 2." }
      ],
      starterCode: "def luy_thua2(n):\n    # TODO\n    pass\n\nprint(luy_thua2(int(input())))\n",
      testCases: [
        { id: "t9-l1-w2-tc1", input: "0", expectedOutput: "1", isHidden: false },
        { id: "t9-l1-w2-tc2", input: "3", expectedOutput: "8", isHidden: false },
        { id: "t9-l1-w2-tc3", input: "10", expectedOutput: "1024", isHidden: true }
      ],
      hints: ["Base case: `n == 0` trả về 1.", "Bước đệ quy: `2 * luy_thua2(n - 1)`."],
      solutionExplanation: "def luy_thua2(n):\n    if n == 0:\n        return 1\n    return 2 * luy_thua2(n - 1)\n\nprint(luy_thua2(int(input())))"
    }
  ],
  "t9-l2": [
    {
      id: "t9-l2-w1",
      title: "Khởi động: Đệ quy tổng 1 đến 3",
      difficulty: "Cơ bản",
      problemStatement: "Viết hàm đệ quy `tong(n)` trả về 1 + 2 + ... + n với n từ 1 đến 10. Chương trình chính nhập `n` và in kết quả.",
      inputFormat: "Một dòng chứa số nguyên n (1 <= n <= 10).",
      outputFormat: "Một số nguyên: tổng",
      constraints: "Không có ràng buộc đặc biệt.",
      sampleCases: [
        { input: "1", output: "1", explanation: "Ví dụ mẫu 1." },
        { input: "3", output: "6", explanation: "Ví dụ mẫu 2." }
      ],
      starterCode: "def tong(n):\n    # TODO\n    pass\n\nprint(tong(int(input())))\n",
      testCases: [
        { id: "t9-l2-w1-tc1", input: "1", expectedOutput: "1", isHidden: false },
        { id: "t9-l2-w1-tc2", input: "3", expectedOutput: "6", isHidden: false },
        { id: "t9-l2-w1-tc3", input: "10", expectedOutput: "55", isHidden: true }
      ],
      hints: ["Base case: `n == 1` trả về 1."],
      solutionExplanation: "def tong(n):\n    if n == 1:\n        return 1\n    return n + tong(n - 1)\n\nprint(tong(int(input())))"
    }
  ],
  "t9-l3": [
    {
      id: "t9-l3-w1",
      title: "Khởi động: Đệ quy giai thừa nhỏ",
      difficulty: "Cơ bản",
      problemStatement: "Viết hàm đệ quy `giai_thua(n)` với n từ 0 đến 6. Chương trình chính nhập `n` và in `n!`.",
      inputFormat: "Một dòng chứa số nguyên n (0 <= n <= 6).",
      outputFormat: "Một số nguyên: n!",
      constraints: "Không có ràng buộc đặc biệt.",
      sampleCases: [
        { input: "0", output: "1", explanation: "Ví dụ mẫu 1." },
        { input: "3", output: "6", explanation: "Ví dụ mẫu 2." }
      ],
      starterCode: "def giai_thua(n):\n    # TODO\n    pass\n\nprint(giai_thua(int(input())))\n",
      testCases: [
        { id: "t9-l3-w1-tc1", input: "0", expectedOutput: "1", isHidden: false },
        { id: "t9-l3-w1-tc2", input: "3", expectedOutput: "6", isHidden: false },
        { id: "t9-l3-w1-tc3", input: "6", expectedOutput: "720", isHidden: true }
      ],
      hints: ["Base case: n bằng 0 hoặc 1 trả về 1."],
      solutionExplanation: "def giai_thua(n):\n    if n <= 1:\n        return 1\n    return n * giai_thua(n - 1)\n\nprint(giai_thua(int(input())))"
    }
  ],
  "t10-l1": [
    {
      id: "t10-l1-w1",
      title: "Khởi động 1: Tạo và in list",
      difficulty: "Cơ bản",
      problemStatement: "Cho list `[3, 1, 4, 1, 5]`. In ra list, phần tử đầu và số phần tử (3 dòng).",
      inputFormat: "Không có dữ liệu đầu vào.",
      outputFormat: "3 dòng:\n[3, 1, 4, 1, 5]\n3\n5",
      constraints: "Không có ràng buộc đặc biệt.",
      sampleCases: [
        { input: "", output: "[3, 1, 4, 1, 5]\n3\n5", explanation: "Ví dụ mẫu 1." }
      ],
      starterCode: "a = [3, 1, 4, 1, 5]\n# TODO: in a, a[0], len(a)\n",
      testCases: [
        { id: "t10-l1-w1-tc1", input: "", expectedOutput: "[3, 1, 4, 1, 5]\n3\n5", isHidden: false }
      ],
      hints: ["`a[0]` là phần tử đầu, `len(a)` là số phần tử."],
      solutionExplanation: "a = [3, 1, 4, 1, 5]\nprint(a)\nprint(a[0])\nprint(len(a))"
    },
    {
      id: "t10-l1-w2",
      title: "Khởi động 2: Nhập list và in tổng",
      difficulty: "Cơ bản",
      problemStatement: "Nhập một dòng các số nguyên cách nhau bởi dấu cách. In ra tổng các số.",
      inputFormat: "Một dòng chứa các số nguyên.",
      outputFormat: "Một số nguyên: tổng",
      constraints: "Không có ràng buộc đặc biệt.",
      sampleCases: [
        { input: "1 2 3", output: "6", explanation: "Ví dụ mẫu 1." },
        { input: "10 -4 6 8", output: "20", explanation: "Ví dụ mẫu 2." }
      ],
      starterCode: "a = list(map(int, input().split()))\n# TODO: in sum(a)\n",
      testCases: [
        { id: "t10-l1-w2-tc1", input: "1 2 3", expectedOutput: "6", isHidden: false },
        { id: "t10-l1-w2-tc2", input: "10 -4 6 8", expectedOutput: "20", isHidden: false },
        { id: "t10-l1-w2-tc3", input: "7", expectedOutput: "7", isHidden: true }
      ],
      hints: ["`list(map(int, input().split()))` nhập nhiều số một dòng.", "`sum(a)` cho tổng."],
      solutionExplanation: "a = list(map(int, input().split()))\nprint(sum(a))"
    }
  ],
  "t10-l2": [
    {
      id: "t10-l2-w1",
      title: "Khởi động: Dùng min() và max()",
      difficulty: "Cơ bản",
      problemStatement: "Nhập một dòng các số nguyên. In `Max: ...` và `Min: ...` bằng hàm có sẵn `max()`, `min()`.",
      inputFormat: "Một dòng chứa các số nguyên.",
      outputFormat: "2 dòng: Max rồi Min",
      constraints: "Không có ràng buộc đặc biệt.",
      sampleCases: [
        { input: "12 5 28 3", output: "Max: 28\nMin: 3", explanation: "Ví dụ mẫu 1." },
        { input: "7", output: "Max: 7\nMin: 7", explanation: "Ví dụ mẫu 2." }
      ],
      starterCode: "a = list(map(int, input().split()))\n# TODO: in Max và Min\n",
      testCases: [
        { id: "t10-l2-w1-tc1", input: "12 5 28 3", expectedOutput: "Max: 28\nMin: 3", isHidden: false },
        { id: "t10-l2-w1-tc2", input: "7", expectedOutput: "Max: 7\nMin: 7", isHidden: false },
        { id: "t10-l2-w1-tc3", input: "-1 -5 -3", expectedOutput: "Max: -1\nMin: -5", isHidden: true }
      ],
      hints: ["`max(a)` và `min(a)` trả về giá trị lớn nhất, nhỏ nhất."],
      solutionExplanation: "a = list(map(int, input().split()))\nprint('Max:', max(a))\nprint('Min:', min(a))"
    }
  ],
  "t10-l3": [
    {
      id: "t10-l3-w1",
      title: "Khởi động: Đếm số lớn hơn 10",
      difficulty: "Cơ bản",
      problemStatement: "Nhập một dòng các số nguyên. Đếm và in số lượng phần tử lớn hơn 10.",
      inputFormat: "Một dòng chứa các số nguyên.",
      outputFormat: "Một số nguyên",
      constraints: "Không có ràng buộc đặc biệt.",
      sampleCases: [
        { input: "5 12 30 8", output: "2", explanation: "Ví dụ mẫu 1." },
        { input: "1 2 3", output: "0", explanation: "Ví dụ mẫu 2." }
      ],
      starterCode: "a = list(map(int, input().split()))\ncount = 0\n# TODO: duyệt a và đếm\nprint(count)\n",
      testCases: [
        { id: "t10-l3-w1-tc1", input: "5 12 30 8", expectedOutput: "2", isHidden: false },
        { id: "t10-l3-w1-tc2", input: "1 2 3", expectedOutput: "0", isHidden: false },
        { id: "t10-l3-w1-tc3", input: "11", expectedOutput: "1", isHidden: true }
      ],
      hints: ["Dùng `for x in a:` và `if x > 10:`."],
      solutionExplanation: "a = list(map(int, input().split()))\ncount = 0\nfor x in a:\n    if x > 10:\n        count += 1\nprint(count)"
    }
  ],
  "t10-l4": [
    {
      id: "t10-l4-w1",
      title: "Khởi động: Hoán đổi hai phần tử",
      difficulty: "Cơ bản",
      problemStatement: "Nhập 2 số nguyên (mỗi số một dòng). Hoán đổi giá trị rồi in `a b` sau khi đổi.",
      inputFormat: "2 dòng: a, b.",
      outputFormat: "Một dòng: `<b> <a>` (sau khi hoán đổi)",
      constraints: "Không có ràng buộc đặc biệt.",
      sampleCases: [
        { input: "3\n7", output: "7 3", explanation: "Ví dụ mẫu 1." },
        { input: "10\n-2", output: "-2 10", explanation: "Ví dụ mẫu 2." }
      ],
      starterCode: "a = int(input())\nb = int(input())\n# TODO: hoán đổi a và b\nprint(a, b)\n",
      testCases: [
        { id: "t10-l4-w1-tc1", input: "3\n7", expectedOutput: "7 3", isHidden: false },
        { id: "t10-l4-w1-tc2", input: "10\n-2", expectedOutput: "-2 10", isHidden: false },
        { id: "t10-l4-w1-tc3", input: "5\n5", expectedOutput: "5 5", isHidden: true }
      ],
      hints: ["`a, b = b, a` hoán đổi hai biến."],
      solutionExplanation: "a = int(input())\nb = int(input())\na, b = b, a\nprint(a, b)"
    },
    {
      id: "t10-l4-w2",
      title: "Luyện tập: Một lượt nổi bọt",
      difficulty: "Trung bình",
      problemStatement: "Nhập một dòng các số nguyên. Thực hiện ĐÚNG MỘT lượt so sánh các cặp liền kề (j từ 0 đến n-2): nếu `a[j] > a[j+1]` thì hoán đổi. In list sau lượt đó (các số cách nhau bởi dấu cách).",
      inputFormat: "Một dòng chứa các số nguyên (ít nhất 2 số).",
      outputFormat: "Một dòng: list sau 1 lượt",
      constraints: "Không có ràng buộc đặc biệt.",
      sampleCases: [
        { input: "5 2 9 1", output: "2 5 1 9", explanation: "Ví dụ mẫu 1." },
        { input: "1 2 3", output: "1 2 3", explanation: "Ví dụ mẫu 2." }
      ],
      starterCode: "a = list(map(int, input().split()))\nn = len(a)\n# TODO: một vòng for j duyệt các cặp liền kề\nprint(*a)\n",
      testCases: [
        { id: "t10-l4-w2-tc1", input: "5 2 9 1", expectedOutput: "2 5 1 9", isHidden: false },
        { id: "t10-l4-w2-tc2", input: "1 2 3", expectedOutput: "1 2 3", isHidden: false },
        { id: "t10-l4-w2-tc3", input: "3 2 1", expectedOutput: "2 1 3", isHidden: true }
      ],
      hints: ["`for j in range(n - 1):`", "Nếu `a[j] > a[j + 1]` thì hoán đổi."],
      solutionExplanation: "a = list(map(int, input().split()))\nfor j in range(len(a) - 1):\n    if a[j] > a[j + 1]:\n        a[j], a[j + 1] = a[j + 1], a[j]\nprint(*a)"
    }
  ],
  "t10-l5": [
    {
      id: "t10-l5-w1",
      title: "Khởi động: In list theo thứ tự ngược",
      difficulty: "Cơ bản",
      problemStatement: "Nhập một dòng các số nguyên. In list theo thứ tự ngược lại (các số cách nhau bởi dấu cách).",
      inputFormat: "Một dòng chứa các số nguyên.",
      outputFormat: "Một dòng: các số theo thứ tự ngược",
      constraints: "Không có ràng buộc đặc biệt.",
      sampleCases: [
        { input: "1 2 3", output: "3 2 1", explanation: "Ví dụ mẫu 1." },
        { input: "5", output: "5", explanation: "Ví dụ mẫu 2." }
      ],
      starterCode: "a = list(map(int, input().split()))\n# TODO: in ngược\n",
      testCases: [
        { id: "t10-l5-w1-tc1", input: "1 2 3", expectedOutput: "3 2 1", isHidden: false },
        { id: "t10-l5-w1-tc2", input: "5", expectedOutput: "5", isHidden: false },
        { id: "t10-l5-w1-tc3", input: "9 4 7 1", expectedOutput: "1 7 4 9", isHidden: true }
      ],
      hints: ["`a[::-1]` đảo ngược list."],
      solutionExplanation: "a = list(map(int, input().split()))\nprint(*a[::-1])"
    }
  ],
  "t11-l1": [
    {
      id: "t11-l1-w1",
      title: "Khởi động: Tạo ma trận 2x2",
      difficulty: "Cơ bản",
      problemStatement: "Cho ma trận `[[1, 2], [3, 4]]`. In ra 2 dòng: `1 2` và `3 4`.",
      inputFormat: "Không có dữ liệu đầu vào.",
      outputFormat: "2 dòng:\n1 2\n3 4",
      constraints: "Không có ràng buộc đặc biệt.",
      sampleCases: [
        { input: "", output: "1 2\n3 4", explanation: "Ví dụ mẫu 1." }
      ],
      starterCode: "m = [[1, 2], [3, 4]]\n# TODO: in từng hàng\n",
      testCases: [
        { id: "t11-l1-w1-tc1", input: "", expectedOutput: "1 2\n3 4", isHidden: false }
      ],
      hints: ["Dùng `for row in m:` và `print(*row)`."],
      solutionExplanation: "m = [[1, 2], [3, 4]]\nfor row in m:\n    print(*row)"
    }
  ],
  "t11-l2": [
    {
      id: "t11-l2-w1",
      title: "Khởi động: Phần tử ở hàng i, cột j",
      difficulty: "Cơ bản",
      problemStatement: "Nhập ma trận 3x3 (3 dòng, mỗi dòng 3 số). In phần tử ở hàng 1, cột 2 (tính từ 0).",
      inputFormat: "3 dòng, mỗi dòng 3 số nguyên.",
      outputFormat: "Một số nguyên",
      constraints: "Không có ràng buộc đặc biệt.",
      sampleCases: [
        { input: "1 2 3\n4 5 6\n7 8 9", output: "6", explanation: "Ví dụ mẫu 1." },
        { input: "9 8 7\n6 5 4\n3 2 1", output: "4", explanation: "Ví dụ mẫu 2." }
      ],
      starterCode: "m = [list(map(int, input().split())) for _ in range(3)]\n# TODO: in m[1][2]\n",
      testCases: [
        { id: "t11-l2-w1-tc1", input: "1 2 3\n4 5 6\n7 8 9", expectedOutput: "6", isHidden: false },
        { id: "t11-l2-w1-tc2", input: "9 8 7\n6 5 4\n3 2 1", expectedOutput: "4", isHidden: false },
        { id: "t11-l2-w1-tc3", input: "0 0 0\n0 0 5\n0 0 0", expectedOutput: "5", isHidden: true }
      ],
      hints: ["`m[i][j]` là hàng i, cột j (tính từ 0)."],
      solutionExplanation: "m = [list(map(int, input().split())) for _ in range(3)]\nprint(m[1][2])"
    },
    {
      id: "t11-l2-w2",
      title: "Luyện tập: In đường chéo chính",
      difficulty: "Cơ bản",
      problemStatement: "Nhập n rồi ma trận n x n. In các phần tử trên đường chéo chính (`m[i][i]`) trên một dòng, cách nhau bởi dấu cách.",
      inputFormat: "Dòng 1: n. Tiếp theo n dòng, mỗi dòng n số.",
      outputFormat: "Một dòng: các phần tử đường chéo chính",
      constraints: "Không có ràng buộc đặc biệt.",
      sampleCases: [
        { input: "3\n1 2 3\n4 5 6\n7 8 9", output: "1 5 9", explanation: "Ví dụ mẫu 1." },
        { input: "2\n5 1\n2 9", output: "5 9", explanation: "Ví dụ mẫu 2." }
      ],
      starterCode: "n = int(input())\nm = [list(map(int, input().split())) for _ in range(n)]\n# TODO: in m[i][i] với i từ 0 đến n-1\n",
      testCases: [
        { id: "t11-l2-w2-tc1", input: "3\n1 2 3\n4 5 6\n7 8 9", expectedOutput: "1 5 9", isHidden: false },
        { id: "t11-l2-w2-tc2", input: "2\n5 1\n2 9", expectedOutput: "5 9", isHidden: false },
        { id: "t11-l2-w2-tc3", input: "1\n7", expectedOutput: "7", isHidden: true }
      ],
      hints: ["Dùng `for i in range(n):` và `m[i][i]`."],
      solutionExplanation: "n = int(input())\nm = [list(map(int, input().split())) for _ in range(n)]\nprint(*[m[i][i] for i in range(n)])"
    }
  ],
  "t11-l3": [
    {
      id: "t11-l3-w1",
      title: "Khởi động: In đường chéo phụ",
      difficulty: "Cơ bản",
      problemStatement: "Nhập n rồi ma trận n x n. In các phần tử trên đường chéo phụ (`m[i][n-1-i]`) trên một dòng, cách nhau bởi dấu cách.",
      inputFormat: "Dòng 1: n. Tiếp theo n dòng, mỗi dòng n số.",
      outputFormat: "Một dòng: các phần tử đường chéo phụ",
      constraints: "Không có ràng buộc đặc biệt.",
      sampleCases: [
        { input: "3\n1 2 3\n4 5 6\n7 8 9", output: "3 5 7", explanation: "Ví dụ mẫu 1." },
        { input: "2\n5 1\n2 9", output: "1 2", explanation: "Ví dụ mẫu 2." }
      ],
      starterCode: "n = int(input())\nm = [list(map(int, input().split())) for _ in range(n)]\n# TODO: in m[i][n-1-i]\n",
      testCases: [
        { id: "t11-l3-w1-tc1", input: "3\n1 2 3\n4 5 6\n7 8 9", expectedOutput: "3 5 7", isHidden: false },
        { id: "t11-l3-w1-tc2", input: "2\n5 1\n2 9", expectedOutput: "1 2", isHidden: false },
        { id: "t11-l3-w1-tc3", input: "1\n7", expectedOutput: "7", isHidden: true }
      ],
      hints: ["Cột của hàng i là `n - 1 - i`."],
      solutionExplanation: "n = int(input())\nm = [list(map(int, input().split())) for _ in range(n)]\nprint(*[m[i][n - 1 - i] for i in range(n)])"
    }
  ],
  "t11-l4": [
    {
      id: "t11-l4-w1",
      title: "Khởi động: Max của một hàng",
      difficulty: "Cơ bản",
      problemStatement: "Nhập 1 dòng gồm các số nguyên (một hàng của ma trận). In giá trị lớn nhất.",
      inputFormat: "Một dòng các số nguyên.",
      outputFormat: "Một số nguyên",
      constraints: "Không có ràng buộc đặc biệt.",
      sampleCases: [
        { input: "3 8 1", output: "8", explanation: "Ví dụ mẫu 1." },
        { input: "5", output: "5", explanation: "Ví dụ mẫu 2." }
      ],
      starterCode: "row = list(map(int, input().split()))\n# TODO: in giá trị lớn nhất\n",
      testCases: [
        { id: "t11-l4-w1-tc1", input: "3 8 1", expectedOutput: "8", isHidden: false },
        { id: "t11-l4-w1-tc2", input: "5", expectedOutput: "5", isHidden: false },
        { id: "t11-l4-w1-tc3", input: "-4 -9 -2", expectedOutput: "-2", isHidden: true }
      ],
      hints: ["Dùng `max(row)`."],
      solutionExplanation: "print(max(map(int, input().split())))"
    },
    {
      id: "t11-l4-w2",
      title: "Luyện tập: Max của cả ma trận",
      difficulty: "Trung bình",
      problemStatement: "Nhập `m n` rồi ma trận m x n. In giá trị lớn nhất của cả ma trận.",
      inputFormat: "Dòng 1: m n. Tiếp theo m dòng, mỗi dòng n số.",
      outputFormat: "Một số nguyên",
      constraints: "Không có ràng buộc đặc biệt.",
      sampleCases: [
        { input: "2 3\n3 8 1\n9 2 4", output: "9", explanation: "Ví dụ mẫu 1." },
        { input: "1 1\n5", output: "5", explanation: "Ví dụ mẫu 2." }
      ],
      starterCode: "m, n = map(int, input().split())\nrows = [list(map(int, input().split())) for _ in range(m)]\n# TODO: tìm max của tất cả phần tử\n",
      testCases: [
        { id: "t11-l4-w2-tc1", input: "2 3\n3 8 1\n9 2 4", expectedOutput: "9", isHidden: false },
        { id: "t11-l4-w2-tc2", input: "1 1\n5", expectedOutput: "5", isHidden: false },
        { id: "t11-l4-w2-tc3", input: "2 2\n-1 -2\n-3 -4", expectedOutput: "-1", isHidden: true }
      ],
      hints: ["Tìm max từng hàng rồi lấy max của các hàng, hoặc dùng hai vòng `for`."],
      solutionExplanation: "m, n = map(int, input().split())\nrows = [list(map(int, input().split())) for _ in range(m)]\nprint(max(max(r) for r in rows))"
    }
  ],
  "t12-l1": [
    {
      id: "t12-l1-w1",
      title: "Khởi động: Xếp loại một điểm",
      difficulty: "Cơ bản",
      problemStatement: "Nhập điểm trung bình `d` (số thực). In `Xuat sac` nếu d >= 9, `Gioi` nếu d >= 8, `Kha` nếu d >= 6.5, `Trung binh` nếu d >= 5, ngược lại `Yeu`.",
      inputFormat: "Một dòng chứa số thực d.",
      outputFormat: "Một dòng: xếp loại",
      constraints: "Không có ràng buộc đặc biệt.",
      sampleCases: [
        { input: "9.5", output: "Xuat sac", explanation: "Ví dụ mẫu 1." },
        { input: "8", output: "Gioi", explanation: "Ví dụ mẫu 2." }
      ],
      starterCode: "d = float(input())\n# TODO: xếp loại bằng if/elif/else\n",
      testCases: [
        { id: "t12-l1-w1-tc1", input: "9.5", expectedOutput: "Xuat sac", isHidden: false },
        { id: "t12-l1-w1-tc2", input: "8", expectedOutput: "Gioi", isHidden: false },
        { id: "t12-l1-w1-tc3", input: "6.4", expectedOutput: "Trung binh", isHidden: true },
        { id: "t12-l1-w1-tc4", input: "5", expectedOutput: "Trung binh", isHidden: true },
        { id: "t12-l1-w1-tc5", input: "3.2", expectedOutput: "Yeu", isHidden: true }
      ],
      hints: ["Kiểm tra từ mức cao xuống thấp."],
      solutionExplanation: "d = float(input())\nif d >= 9:\n    print('Xuat sac')\nelif d >= 8:\n    print('Gioi')\nelif d >= 6.5:\n    print('Kha')\nelif d >= 5:\n    print('Trung binh')\nelse:\n    print('Yeu')"
    },
    {
      id: "t12-l1-w2",
      title: "Luyện tập: Điểm trung bình 5 môn",
      difficulty: "Cơ bản",
      problemStatement: "Nhập 5 số thực trên một dòng (điểm 5 môn). In điểm trung bình với 2 chữ số thập phân.",
      inputFormat: "Một dòng chứa 5 số thực.",
      outputFormat: "Một số thực 2 chữ số thập phân",
      constraints: "Không có ràng buộc đặc biệt.",
      sampleCases: [
        { input: "8 7.5 9 6 8.5", output: "7.80", explanation: "Ví dụ mẫu 1." },
        { input: "10 10 10 10 10", output: "10.00", explanation: "Ví dụ mẫu 2." }
      ],
      starterCode: "d = list(map(float, input().split()))\n# TODO: in trung bình 2 chữ số thập phân\n",
      testCases: [
        { id: "t12-l1-w2-tc1", input: "8 7.5 9 6 8.5", expectedOutput: "7.80", isHidden: false },
        { id: "t12-l1-w2-tc2", input: "10 10 10 10 10", expectedOutput: "10.00", isHidden: false },
        { id: "t12-l1-w2-tc3", input: "5 6 7 8 9", expectedOutput: "7.00", isHidden: true }
      ],
      hints: ["`sum(d) / 5` rồi định dạng `:.2f`."],
      solutionExplanation: "d = list(map(float, input().split()))\nprint(f'{sum(d) / 5:.2f}')"
    }
  ],
  "t12-l2": [
    {
      id: "t12-l2-w1",
      title: "Khởi động: Lãi một năm",
      difficulty: "Cơ bản",
      problemStatement: "Nhập vốn `P` và lãi suất `r` (% / năm). In số tiền sau 1 năm (làm tròn 2 chữ số thập phân): `P * (1 + r / 100)`.",
      inputFormat: "2 dòng: P, r.",
      outputFormat: "Một số 2 chữ số thập phân",
      constraints: "Không có ràng buộc đặc biệt.",
      sampleCases: [
        { input: "1000\n10", output: "1100.00", explanation: "Ví dụ mẫu 1." },
        { input: "5000000\n6.5", output: "5325000.00", explanation: "Ví dụ mẫu 2." }
      ],
      starterCode: "P = float(input())\nr = float(input())\n# TODO: in số tiền sau 1 năm\n",
      testCases: [
        { id: "t12-l2-w1-tc1", input: "1000\n10", expectedOutput: "1100.00", isHidden: false },
        { id: "t12-l2-w1-tc2", input: "5000000\n6.5", expectedOutput: "5325000.00", isHidden: false },
        { id: "t12-l2-w1-tc3", input: "200\n0", expectedOutput: "200.00", isHidden: true }
      ],
      hints: ["Sau 1 năm: vốn + vốn × r/100."],
      solutionExplanation: "P = float(input())\nr = float(input())\nprint(f'{P * (1 + r / 100):.2f}')"
    },
    {
      id: "t12-l2-w2",
      title: "Luyện tập: Lãi kép qua 3 năm",
      difficulty: "Trung bình",
      problemStatement: "Nhập vốn `P` và lãi suất `r` (% / năm). In số tiền cuối mỗi năm trong 3 năm (3 dòng, mỗi dòng 2 chữ số thập phân).",
      inputFormat: "2 dòng: P, r.",
      outputFormat: "3 dòng",
      constraints: "Không có ràng buộc đặc biệt.",
      sampleCases: [
        { input: "1000\n10", output: "1100.00\n1210.00\n1331.00", explanation: "Ví dụ mẫu 1." },
        { input: "5000000\n6.5", output: "5325000.00\n5671125.00\n6039748.12", explanation: "Ví dụ mẫu 2." }
      ],
      starterCode: "P = float(input())\nr = float(input())\n# TODO: lặp 3 năm, mỗi năm cộng lãi vào vốn\n",
      testCases: [
        { id: "t12-l2-w2-tc1", input: "1000\n10", expectedOutput: "1100.00\n1210.00\n1331.00", isHidden: false },
        { id: "t12-l2-w2-tc2", input: "5000000\n6.5", expectedOutput: "5325000.00\n5671125.00\n6039748.12", isHidden: false },
        { id: "t12-l2-w2-tc3", input: "200\n5", expectedOutput: "210.00\n220.50\n231.53", isHidden: true }
      ],
      hints: ["Dùng `for _ in range(3):` và `P += P * r / 100`."],
      solutionExplanation: "P = float(input())\nr = float(input())\nfor _ in range(3):\n    P += P * r / 100\n    print(f'{P:.2f}')"
    }
  ],
  "t13-l1": [
    {
      id: "t13-l1-w1",
      title: "Khởi động: Tổng tiền một mặt hàng",
      difficulty: "Cơ bản",
      problemStatement: "Nhập số lượng `sl` và đơn giá `gia` (mỗi số một dòng). In tổng tiền `sl * gia`.",
      inputFormat: "2 dòng: sl, gia.",
      outputFormat: "Một số nguyên: tổng tiền",
      constraints: "Không có ràng buộc đặc biệt.",
      sampleCases: [
        { input: "3\n15000", output: "45000", explanation: "Ví dụ mẫu 1." },
        { input: "1\n99000", output: "99000", explanation: "Ví dụ mẫu 2." }
      ],
      starterCode: "sl = int(input())\ngia = int(input())\n# TODO: in sl * gia\n",
      testCases: [
        { id: "t13-l1-w1-tc1", input: "3\n15000", expectedOutput: "45000", isHidden: false },
        { id: "t13-l1-w1-tc2", input: "1\n99000", expectedOutput: "99000", isHidden: false },
        { id: "t13-l1-w1-tc3", input: "10\n2500", expectedOutput: "25000", isHidden: true }
      ],
      hints: ["Tổng tiền = số lượng × đơn giá."],
      solutionExplanation: "sl = int(input())\ngia = int(input())\nprint(sl * gia)"
    },
    {
      id: "t13-l1-w2",
      title: "Luyện tập: Chiết khấu theo bậc",
      difficulty: "Cơ bản",
      problemStatement: "Nhập tổng tiền `T` (số nguyên). Nếu T >= 500000 giảm 10%, nếu T >= 200000 giảm 5%, ngược lại không giảm. In số tiền phải trả (làm tròn xuống số nguyên).",
      inputFormat: "Một dòng chứa số nguyên T.",
      outputFormat: "Một số nguyên",
      constraints: "Không có ràng buộc đặc biệt.",
      sampleCases: [
        { input: "600000", output: "540000", explanation: "Ví dụ mẫu 1." },
        { input: "300000", output: "285000", explanation: "Ví dụ mẫu 2." }
      ],
      starterCode: "T = int(input())\n# TODO: if / elif / else\n",
      testCases: [
        { id: "t13-l1-w2-tc1", input: "600000", expectedOutput: "540000", isHidden: false },
        { id: "t13-l1-w2-tc2", input: "300000", expectedOutput: "285000", isHidden: false },
        { id: "t13-l1-w2-tc3", input: "100000", expectedOutput: "100000", isHidden: true },
        { id: "t13-l1-w2-tc4", input: "500000", expectedOutput: "450000", isHidden: true }
      ],
      hints: ["Giảm 10% nghĩa là trả `T * 0.9`."],
      solutionExplanation: "T = int(input())\nif T >= 500000:\n    print(int(T * 0.9))\nelif T >= 200000:\n    print(int(T * 0.95))\nelse:\n    print(T)"
    }
  ],
  "t13-l2": [
    {
      id: "t13-l2-w1",
      title: "Khởi động: Đọc một số thực hợp lệ",
      difficulty: "Cơ bản",
      problemStatement: "Nhập một dòng. Nếu ép được sang số thực thì in số đó, nếu lỗi thì in `Khong hop le`. Dùng `try / except ValueError`.",
      inputFormat: "Một dòng chứa chuỗi.",
      outputFormat: "Một dòng",
      constraints: "Không có ràng buộc đặc biệt.",
      sampleCases: [
        { input: "4.5", output: "4.5", explanation: "Ví dụ mẫu 1." },
        { input: "abc", output: "Khong hop le", explanation: "Ví dụ mẫu 2." }
      ],
      starterCode: "s = input()\ntry:\n    # TODO\n    pass\nexcept ValueError:\n    # TODO\n    pass\n",
      testCases: [
        { id: "t13-l2-w1-tc1", input: "4.5", expectedOutput: "4.5", isHidden: false },
        { id: "t13-l2-w1-tc2", input: "abc", expectedOutput: "Khong hop le", isHidden: false },
        { id: "t13-l2-w1-tc3", input: "10", expectedOutput: "10.0", isHidden: true }
      ],
      hints: ["Đặt `float(s)` trong khối `try`."],
      solutionExplanation: "s = input()\ntry:\n    print(float(s))\nexcept ValueError:\n    print('Khong hop le')"
    }
  ],
  "t13-l3": [
    {
      id: "t13-l3-w1",
      title: "Khởi động: Thống kê cơ bản",
      difficulty: "Cơ bản",
      problemStatement: "Nhập một dòng các số nguyên. In 4 dòng: Max, Min, tổng và số phần tử, theo mẫu `Max: ...`, `Min: ...`, `Sum: ...`, `Count: ...`.",
      inputFormat: "Một dòng chứa các số nguyên.",
      outputFormat: "4 dòng theo mẫu",
      constraints: "Không có ràng buộc đặc biệt.",
      sampleCases: [
        { input: "5 2 8 1 9", output: "Max: 9\nMin: 1\nSum: 25\nCount: 5", explanation: "Ví dụ mẫu 1." },
        { input: "7", output: "Max: 7\nMin: 7\nSum: 7\nCount: 1", explanation: "Ví dụ mẫu 2." }
      ],
      starterCode: "a = list(map(int, input().split()))\n# TODO: in 4 dòng thống kê\n",
      testCases: [
        { id: "t13-l3-w1-tc1", input: "5 2 8 1 9", expectedOutput: "Max: 9\nMin: 1\nSum: 25\nCount: 5", isHidden: false },
        { id: "t13-l3-w1-tc2", input: "7", expectedOutput: "Max: 7\nMin: 7\nSum: 7\nCount: 1", isHidden: false },
        { id: "t13-l3-w1-tc3", input: "-3 4 0", expectedOutput: "Max: 4\nMin: -3\nSum: 1\nCount: 3", isHidden: true }
      ],
      hints: ["Dùng `max`, `min`, `sum`, `len`."],
      solutionExplanation: "a = list(map(int, input().split()))\nprint('Max:', max(a))\nprint('Min:', min(a))\nprint('Sum:', sum(a))\nprint('Count:', len(a))"
    },
    {
      id: "t13-l3-w2",
      title: "Luyện tập: Tìm kiếm trong list",
      difficulty: "Cơ bản",
      problemStatement: "Nhập một dòng các số nguyên rồi nhập số `x`. In `Co mat o vi tri <i>` (i tính từ 0) nếu x có trong list, ngược lại in `Khong co`.",
      inputFormat: "Dòng 1: list. Dòng 2: x.",
      outputFormat: "Một dòng",
      constraints: "Không có ràng buộc đặc biệt.",
      sampleCases: [
        { input: "5 2 8 1 9\n8", output: "Co mat o vi tri 2", explanation: "Ví dụ mẫu 1." },
        { input: "5 2 8 1 9\n7", output: "Khong co", explanation: "Ví dụ mẫu 2." }
      ],
      starterCode: "a = list(map(int, input().split()))\nx = int(input())\n# TODO: kiểm tra x in a và dùng a.index(x)\n",
      testCases: [
        { id: "t13-l3-w2-tc1", input: "5 2 8 1 9\n8", expectedOutput: "Co mat o vi tri 2", isHidden: false },
        { id: "t13-l3-w2-tc2", input: "5 2 8 1 9\n7", expectedOutput: "Khong co", isHidden: false },
        { id: "t13-l3-w2-tc3", input: "3 3 3\n3", expectedOutput: "Co mat o vi tri 0", isHidden: true }
      ],
      hints: ["`x in a` kiểm tra tồn tại; `a.index(x)` trả về vị trí đầu tiên."],
      solutionExplanation: "a = list(map(int, input().split()))\nx = int(input())\nif x in a:\n    print('Co mat o vi tri', a.index(x))\nelse:\n    print('Khong co')"
    }
  ],
  "t13-l4": [
    {
      id: "t13-l4-w1",
      title: "Khởi động: Chuẩn hóa tên và tính ĐTB",
      difficulty: "Cơ bản",
      problemStatement: "Nhập họ tên (có thể thừa khoảng trắng, chữ lộn xộn) rồi 3 điểm Toán, Văn, Anh (mỗi điểm một dòng). In `<Ten Chuan Hoa>: <dtb>` với dtb làm tròn 2 chữ số thập phân.",
      inputFormat: "4 dòng: họ tên, điểm Toán, Văn, Anh.",
      outputFormat: "Một dòng",
      constraints: "Không có ràng buộc đặc biệt.",
      sampleCases: [
        { input: "  nguyen   VAN an \n8\n7.5\n9", output: "Nguyen Van An: 8.17", explanation: "Ví dụ mẫu 1." },
        { input: "le thi MAI\n10\n10\n10", output: "Le Thi Mai: 10.00", explanation: "Ví dụ mẫu 2." }
      ],
      starterCode: "name = ' '.join(w.capitalize() for w in input().split())\na = float(input())\nb = float(input())\nc = float(input())\n# TODO: in kết quả\n",
      testCases: [
        { id: "t13-l4-w1-tc1", input: "  nguyen   VAN an \n8\n7.5\n9", expectedOutput: "Nguyen Van An: 8.17", isHidden: false },
        { id: "t13-l4-w1-tc2", input: "le thi MAI\n10\n10\n10", expectedOutput: "Le Thi Mai: 10.00", isHidden: false },
        { id: "t13-l4-w1-tc3", input: "tran duc minh\n5\n6\n7", expectedOutput: "Tran Duc Minh: 6.00", isHidden: true }
      ],
      hints: ["Dùng `split()`, `capitalize()`, `join()` để chuẩn hóa tên."],
      solutionExplanation: "name = ' '.join(w.capitalize() for w in input().split())\na = float(input())\nb = float(input())\nc = float(input())\nprint(f'{name}: {(a + b + c) / 3:.2f}')"
    },
    {
      id: "t13-l4-w2",
      title: "Luyện tập: Tìm điểm cao nhất",
      difficulty: "Trung bình",
      problemStatement: "Nhập n rồi n dòng, mỗi dòng gồm tên (không dấu cách) và điểm (số thực). In tên học sinh có điểm cao nhất và điểm đó (`<ten> <diem>`). Điểm cao nhất là duy nhất.",
      inputFormat: "Dòng 1: n. Tiếp theo n dòng `ten diem`.",
      outputFormat: "Một dòng: `<ten> <diem>`",
      constraints: "Không có ràng buộc đặc biệt.",
      sampleCases: [
        { input: "3\nAn 8.5\nBinh 9.2\nChi 7", output: "Binh 9.2", explanation: "Ví dụ mẫu 1." },
        { input: "2\nMai 6\nNam 7.5", output: "Nam 7.5", explanation: "Ví dụ mẫu 2." }
      ],
      starterCode: "n = int(input())\nbest = None\nfor _ in range(n):\n    ten, d = input().split()\n    d = float(d)\n    # TODO: cập nhật best\nprint(best[0], best[1])\n",
      testCases: [
        { id: "t13-l4-w2-tc1", input: "3\nAn 8.5\nBinh 9.2\nChi 7", expectedOutput: "Binh 9.2", isHidden: false },
        { id: "t13-l4-w2-tc2", input: "2\nMai 6\nNam 7.5", expectedOutput: "Nam 7.5", isHidden: false },
        { id: "t13-l4-w2-tc3", input: "1\nLan 10", expectedOutput: "Lan 10.0", isHidden: true }
      ],
      hints: ["Giữ cặp (tên, điểm) tốt nhất và cập nhật khi gặp điểm lớn hơn."],
      solutionExplanation: "n = int(input())\nbest = None\nfor _ in range(n):\n    ten, d = input().split()\n    d = float(d)\n    if best is None or d > best[1]:\n        best = (ten, d)\nprint(best[0], best[1])"
    }
  ],
};
