import { Module } from "../../types";

export const MODULE_8_REVISION: Module = {
  id: "module-8",
  title: "Chương 8: Ôn tập tổng hợp kiến thức (Chương 1 - Chương 6)",
  description: "Hệ thống hóa toàn bộ kiến thức cốt lõi từ Nhập môn, Biến, Cấu trúc rẽ nhánh, Vòng lặp, Chuỗi ký tự, Danh sách List đến Hàm; rèn luyện tư duy lập trình thực chiến với bộ bài tập đa dạng.",
  iconName: "Sparkles",
  order: 8,
  color: "from-amber-600 to-rose-600",
  lessons: [
    {
      id: "lesson-20",
      moduleId: "module-8",
      moduleTitle: "Chương 8: Ôn tập tổng hợp",
      order: 1,
      title: "Chủ đề 1: Ôn tập Nhập môn, Biến, Kiểu dữ liệu & Toán tử số học",
      description: "Hệ thống hóa quy tắc biến, 4 kiểu dữ liệu nền tảng, các toán tử số học (+, -, *, /, //, %, **), hàm input() và định dạng f-string.",
      durationMin: 35,
      xpReward: 90,
      theory: {
        summary: "Ôn tập tổng kết toàn bộ kiến thức trọng tâm của Chương 1: Quy tắc khai báo biến hợp lệ, 4 kiểu dữ liệu cơ bản (int, float, str, bool), hàm kiểm tra type(), phép toán chia nguyên // và chia dư %, kỹ thuật ép kiểu int(input())/float(input()) và định dạng chuỗi xuất bản đẹp f-string.",
        keyPoints: [
          "Tên biến không bắt đầu bằng số, không chứa ký tự đặc biệt trừ dấu gạch dưới _, phân biệt chữ HOA - chữ thường.",
          "Toán tử // (phép chia lấy phần nguyên) và % (phép chia lấy phần dư): 17 // 5 = 3, 17 % 5 = 2.",
          "Toán tử ** tính lũy thừa: 2 ** 4 = 16.",
          "Hàm input() luôn trả về chuỗi str, cần ép kiểu int() hoặc float() trước khi tính toán số học.",
          "f-string hỗ trợ định dạng số thực: f'{pi:.2f}' (2 chữ số thập phân) hoặc f'{h:02d}' (điền số 0 phía trước)."
        ],
        conceptIllustration: {
          type: "comparison",
          title: "Bảng tổng hợp Toán tử số học & Quy tắc Ép kiểu Python",
          description: "Mô tả trực quan các toán tử số học và phân biệt phép chia thực / chia nguyên / chia dư",
          visualData: {
            variables: [
              { name: "a // b", value: "Chia lấy nguyên", type: "14 // 4 = 3" },
              { name: "a % b", value: "Chia lấy dư", type: "14 % 4 = 2" },
              { name: "a ** b", value: "Lũy thừa", type: "2 ** 5 = 32" },
              { name: "f'{x:.2f}'", value: "Làm tròn 2 chữ số", type: "3.14159 -> '3.14'" }
            ]
          }
        },
        examples: [
          {
            title: "Ví dụ 1: Tách các chữ số của số nguyên và tính toán",
            code: `# Phân tích số nguyên 3 chữ số\nnum = 478\nhundreds = num // 100\ntens = (num % 100) // 10\nunits = num % 10\n\nprint(f"Trăm: {hundreds}, Chục: {tens}, Đơn vị: {units}")\nprint(f"Tổng chữ số: {hundreds + tens + units}")`,
            explanation: "Sử dụng kết hợp // và % giúp phân rã từng hàng chữ số của số nguyên mà không cần chuyển sang chuỗi."
          },
          {
            title: "Ví dụ 2: Định dạng thời gian chuẩn với f-string",
            code: `total_seconds = 3665\nhours = total_seconds // 3600\nminutes = (total_seconds % 3600) // 60\nseconds = total_seconds % 60\n\nprint(f"{hours:02d}:{minutes:02d}:{seconds:02d}")`,
            explanation: "Định dạng {hours:02d} đảm bảo hiển thị đủ 2 chữ số, tự động thêm số 0 ở đầu nếu giá trị < 10."
          }
        ],
        multipleChoice: {
          question: "Kết quả của biểu thức Python: print(23 // 5, 23 % 5, 2 ** 3) là gì?",
          options: [
            "4 3 8",
            "4.6 3 6",
            "4 3 6",
            "4.0 3.0 8"
          ],
          correctIndex: 0,
          explanation: "23 // 5 = 4 (phần nguyên), 23 % 5 = 3 (phần dư vì 4 * 5 + 3 = 23), và 2 ** 3 = 8 (2 mũ 3 = 8)."
        }
      },
      practice: {
        id: "ex-20-1",
        title: "Bài tập 1.1: Tính tiền điện sinh hoạt bậc thang",
        difficulty: "Cơ bản",
        problemStatement: "Viết chương trình tính tiền điện cho một hộ gia đình theo sản lượng tiêu thụ kWh (số nguyên dương K).\nQuy định giá điện bậc thang:\n- 50 kWh đầu tiên: 1.678 đ/kWh\n- 50 kWh tiếp theo (từ 51 đến 100): 1.734 đ/kWh\n- 100 kWh tiếp theo (từ 101 đến 200): 2.014 đ/kWh\n- Từ kWh thứ 201 trở lên: 2.536 đ/kWh\n\nThuế VAT là 10% trên tổng tiền điện. Hãy in ra tổng số tiền điện phải trả (đã bao gồm thuế VAT, làm tròn thành số nguyên int).",
        inputFormat: "Một số nguyên dương K là số kWh điện tiêu thụ.",
        outputFormat: "Một số nguyên duy nhất là tổng tiền điện cần thanh toán.",
        constraints: "1 <= K <= 10000",
        sampleCases: [
          {
            input: "40",
            output: "73832",
            explanation: "40 kWh <= 50: Tiền điện = 40 * 1678 = 67.120đ. Thuế VAT 10% = 6.712đ. Tổng = 73.832đ."
          },
          {
            input: "75",
            output: "140041",
            explanation: "50 kWh đầu: 50*1678 = 83900. 25 kWh sau: 25*1734 = 43350. Tổng trước thuế = 127250. VAT 10% = 12725. Tổng = 140041."
          }
        ],
        starterCode: "# Nhập số kWh điện\nkwh = int(input())\n\n# Viết logic tính tiền điện bậc thang và in kết quả\n",
        testCases: [
          { id: "tc-20-1-1", input: "40", expectedOutput: "73832", isHidden: false },
          { id: "tc-20-1-2", input: "75", expectedOutput: "140041", isHidden: false },
          { id: "tc-20-1-3", input: "150", expectedOutput: "298441", isHidden: true },
          { id: "tc-20-1-4", input: "250", expectedOutput: "559669", isHidden: true }
        ],
        hints: [
          "Dùng các mốc điều kiện rẽ nhánh hoặc tách theo từng khoảng 50, 50, 100, và phần dư > 200.",
          "Tiền sau thuế = round(tien_truoc_thue * 1.1) hoặc int(round(tien_truoc_thue * 1.1))."
        ],
        solutionExplanation: "Chia sản lượng kwh thành các phần: phần1 = min(kwh, 50), phần2 = min(max(0, kwh - 50), 50), phần3 = min(max(0, kwh - 100), 100), phần4 = max(0, kwh - 200). Nhân với đơn giá từng bậc, cộng lại rồi nhân 1.1 và round()."
      },
      practices: [
        {
          id: "ex-20-1",
          title: "Bài tập 1.1: Tính tiền điện sinh hoạt bậc thang",
          difficulty: "Cơ bản",
          problemStatement: "Viết chương trình tính tiền điện cho một hộ gia đình theo sản lượng tiêu thụ kWh (số nguyên dương K).\nQuy định giá điện bậc thang:\n- 50 kWh đầu tiên: 1.678 đ/kWh\n- 50 kWh tiếp theo (từ 51 đến 100): 1.734 đ/kWh\n- 100 kWh tiếp theo (từ 101 đến 200): 2.014 đ/kWh\n- Từ kWh thứ 201 trở lên: 2.536 đ/kWh\n\nThuế VAT là 10% trên tổng tiền điện. Hãy in ra tổng số tiền điện phải trả (đã bao gồm thuế VAT, làm tròn thành số nguyên int).",
          inputFormat: "Một số nguyên dương K là số kWh điện tiêu thụ.",
          outputFormat: "Một số nguyên duy nhất là tổng tiền điện cần thanh toán.",
          constraints: "1 <= K <= 10000",
          sampleCases: [
            {
              input: "40",
              output: "73832",
              explanation: "40 kWh <= 50: Tiền điện = 40 * 1678 = 67.120đ. Thuế VAT 10% = 6.712đ. Tổng = 73.832đ."
            },
            {
              input: "75",
              output: "140041",
              explanation: "50 kWh đầu: 50*1678 = 83900. 25 kWh sau: 25*1734 = 43350. Tổng trước thuế = 127250. VAT 10% = 12725. Tổng = 140041."
            }
          ],
          starterCode: "# Nhập số kWh điện\nkwh = int(input())\n\n# Viết logic tính tiền điện bậc thang và in kết quả\n",
          testCases: [
            { id: "tc-20-1-1", input: "40", expectedOutput: "73832", isHidden: false },
            { id: "tc-20-1-2", input: "75", expectedOutput: "140041", isHidden: false },
            { id: "tc-20-1-3", input: "150", expectedOutput: "298441", isHidden: true },
            { id: "tc-20-1-4", input: "250", expectedOutput: "559669", isHidden: true }
          ],
          hints: [
            "Dùng các mốc điều kiện rẽ nhánh hoặc tách theo từng khoảng 50, 50, 100, và phần dư > 200.",
            "Tiền sau thuế = round(tien_truoc_thue * 1.1) hoặc int(round(tien_truoc_thue * 1.1))."
          ],
          solutionExplanation: "Chia sản lượng kwh thành các phần: phần1 = min(kwh, 50), phần2 = min(max(0, kwh - 50), 50), phần3 = min(max(0, kwh - 100), 100), phần4 = max(0, kwh - 200). Nhân với đơn giá từng bậc, cộng lại rồi nhân 1.1 và round()."
        },
        {
          id: "ex-20-2",
          title: "Bài tập 1.2: Phân tích chữ số và tính tổng các chữ số",
          difficulty: "Cơ bản",
          problemStatement: "Nhập vào một số nguyên dương N có 3 chữ số (100 <= N <= 999). Sử dụng các toán tử số học // và % để tách số thành chữ số hàng trăm, hàng chục và hàng đơn vị.\nHãy in ra 3 dòng:\n- Dòng 1: Ba chữ số hàng trăm, hàng chục, hàng đơn vị cách nhau bởi dấu cách.\n- Dòng 2: Tổng các chữ số của N.\n- Dòng 3: Số đảo ngược của N (ví dụ 582 đảo ngược là 285; nếu đảo ngược có số 0 ở đầu thì in như số nguyên bình thường ví dụ 580 -> 85 hoặc 85).",
          inputFormat: "Một số nguyên dương N (100 <= N <= 999).",
          outputFormat: "3 dòng theo đúng yêu cầu đề bài.",
          constraints: "100 <= N <= 999",
          sampleCases: [
            {
              input: "582",
              output: "5 8 2\n15\n285",
              explanation: "Hàng trăm = 5, chục = 8, đơn vị = 2. Tổng = 5+8+2 = 15. Đảo ngược = 285."
            },
            {
              input: "704",
              output: "7 0 4\n11\n407",
              explanation: "Hàng trăm = 7, chục = 0, đơn vị = 4. Tổng = 11. Đảo ngược = 407."
            }
          ],
          starterCode: "n = int(input())\n\n# Tách các chữ số bằng toán tử // và %\nhundreds = n // 100\ntens = (n % 100) // 10\nunits = n % 10\n\n# In kết quả 3 dòng\n",
          testCases: [
            { id: "tc-20-2-1", input: "582", expectedOutput: "5 8 2\n15\n285", isHidden: false },
            { id: "tc-20-2-2", input: "704", expectedOutput: "7 0 4\n11\n407", isHidden: false },
            { id: "tc-20-2-3", input: "999", expectedOutput: "9 9 9\n27\n999", isHidden: true },
            { id: "tc-20-2-4", input: "120", expectedOutput: "1 2 0\n3\n21", isHidden: true }
          ],
          hints: [
            "hundreds = n // 100",
            "tens = (n % 100) // 10",
            "units = n % 10",
            "Số đảo ngược = units * 100 + tens * 10 + hundreds"
          ],
          solutionExplanation: "Tách từng chữ số bằng // 100, (n%100)//10, n%10. Tổng = h + t + u. Số đảo ngược = u * 100 + t * 10 + h."
        },
        {
          id: "ex-20-3",
          title: "Bài tập 1.3: Quy đổi giây sang định dạng chuẩn HH:MM:SS",
          difficulty: "Cơ bản",
          problemStatement: "Viết chương trình nhập vào một số nguyên dương S là tổng số giây. Hãy quy đổi S thành số Giờ (Hours), Phút (Minutes) và Giây (Seconds) rồi in ra màn hình theo định dạng chuẩn HH:MM:SS (mỗi đại lượng gồm đúng 2 chữ số, có số 0 ở đầu nếu nhỏ hơn 10).",
          inputFormat: "Một số nguyên dương S (0 <= S <= 86399).",
          outputFormat: "Chuỗi định dạng HH:MM:SS.",
          constraints: "0 <= S <= 86399 (trong phạm vi 1 ngày)",
          sampleCases: [
            {
              input: "3665",
              output: "01:01:05",
              explanation: "3665 giây = 1 giờ, 1 phút, 5 giây -> 01:01:05"
            },
            {
              input: "7200",
              output: "02:00:00",
              explanation: "7200 giây = 2 giờ, 0 phút, 0 giây -> 02:00:00"
            }
          ],
          starterCode: "s = int(input())\n\n# Tính giờ, phút, giây\n\n# In định dạng HH:MM:SS dùng f-string\n",
          testCases: [
            { id: "tc-20-3-1", input: "3665", expectedOutput: "01:01:05", isHidden: false },
            { id: "tc-20-3-2", input: "7200", expectedOutput: "02:00:00", isHidden: false },
            { id: "tc-20-3-3", input: "45", expectedOutput: "00:00:45", isHidden: true },
            { id: "tc-20-3-4", input: "86399", expectedOutput: "23:59:59", isHidden: true }
          ],
          hints: [
            "hours = s // 3600",
            "minutes = (s % 3600) // 60",
            "seconds = s % 60",
            "Dùng print(f'{hours:02d}:{minutes:02d}:{seconds:02d}')"
          ],
          solutionExplanation: "1 giờ có 3600 giây, 1 phút có 60 giây. Tính giờ bằng s // 3600, phút bằng (s % 3600) // 60, giây bằng s % 60. In định dạng {val:02d}."
        }
      ]
    },
    {
      id: "lesson-21",
      moduleId: "module-8",
      moduleTitle: "Chương 8: Ôn tập tổng hợp",
      order: 2,
      title: "Chủ đề 2: Ôn tập Cấu trúc rẽ nhánh & Điều kiện logic",
      description: "Củng cố các dạng câu lệnh rẽ nhánh if, if...else, if...elif...else, nested if và toán tử logic and, or, not.",
      durationMin: 40,
      xpReward: 95,
      theory: {
        summary: "Tổng kết các cấu trúc rẽ nhánh trong Python: Cú pháp if-elif-else, cách kết hợp nhiều điều kiện logic bằng and/or/not, quy tắc ngắn mạch (short-circuit evaluation) và kỹ thuật phân tích trường hợp loại trừ theo thứ tự từ hẹp đến rộng.",
        keyPoints: [
          "Toán tử so sánh: == (bằng), != (khác), >, <, >=, <=.",
          "Toán tử logic: and (cả hai đúng), or (ít nhất một đúng), not (phủ định).",
          "Thứ tự ưu tiên logic: not được tính trước, sau đó đến and, cuối cùng là or.",
          "Cấu trúc if-elif-else sẽ dừng lại ngay khi gặp nhánh đầu tiên thỏa mãn điều kiện (True), các nhánh còn lại sẽ bị bỏ qua."
        ],
        conceptIllustration: {
          type: "branching",
          title: "Sơ đồ luồng rẽ nhánh nhiều tầng (Multi-way Branching)",
          description: "Mô tả nguyên lý kiểm tra tuần tự từ trên xuống dưới",
          visualData: {
            condition: "Kiểm tra điều kiện rẽ nhánh theo thứ tự ưu tiên",
            ifTrue: "Thực hiện khối lệnh tương ứng và thoát toàn bộ khối if...elif",
            ifFalse: "Chuyển xuống kiểm tra điều kiện elif tiếp theo hoặc rơi vào else"
          }
        },
        examples: [
          {
            title: "Ví dụ: Kiểm tra năm nhuận",
            code: `year = 2024\nif (year % 400 == 0) or (year % 4 == 0 and year % 100 != 0):\n    print("Năm nhuận")\nelse:\n    print("Năm không nhuận")`,
            explanation: "Một năm là năm nhuận nếu chia hết cho 400 HOẶC (chia hết cho 4 nhưng KHÔNG chia hết cho 100)."
          }
        ],
        multipleChoice: {
          question: "Biểu thức Python sau trả về giá trị gì: (10 > 5 and not (3 == 4)) or (8 < 2)?",
          options: [
            "True",
            "False",
            "None",
            "Lỗi cú pháp SyntaxError"
          ],
          correctIndex: 0,
          explanation: "10 > 5 là True. 3 == 4 là False -> not False là True. True and True là True. True or False là True."
        }
      },
      practice: {
        id: "ex-21-1",
        title: "Bài tập 2.1: Phân loại tam giác & Kiểm tra tính hợp lệ",
        difficulty: "Trung bình",
        problemStatement: "Nhập vào 3 số thực dương a, b, c là độ dài 3 đoạn thẳng. Hãy kiểm tra xem 3 đoạn thẳng có tạo thành một tam giác hay không. Nếu có, hãy phân loại chính xác loại tam giác:\n- Nếu không phải tam giác (tổng 2 cạnh <= cạnh còn lại): in 'KHONG PHAI TAM GIAC'\n- Nếu là tam giác đều (a == b == c): in 'TAM GIAC DEU'\n- Nếu là tam giác vuông (thỏa mãn định lý Pytago a^2 + b^2 = c^2 hoặc hoán vị): in 'TAM GIAC VUONG'\n- Nếu là tam giác cân (có 2 cạnh bằng nhau): in 'TAM GIAC CAN'\n- Nếu là tam giác thường: in 'TAM GIAC THUONG'\n\nLưu ý: Kiểm tra theo đúng thứ tự ưu tiên (ví dụ tam giác đều ưu tiên hơn cân).",
        inputFormat: "3 số thực dương a, b, c trên một dòng cách nhau bởi dấu cách.",
        outputFormat: "Một chuỗi kết quả phân loại in HOA không dấu như mô tả.",
        constraints: "0 < a, b, c <= 10000",
        sampleCases: [
          {
            input: "3 4 5",
            output: "TAM GIAC VUONG",
            explanation: "3^2 + 4^2 = 9 + 16 = 25 = 5^2 -> Tam giác vuông."
          },
          {
            input: "5 5 5",
            output: "TAM GIAC DEU",
            explanation: "3 cạnh bằng nhau -> Tam giác đều."
          },
          {
            input: "1 2 5",
            output: "KHONG PHAI TAM GIAC",
            explanation: "1 + 2 = 3 < 5 -> Không thỏa mãn bất đẳng thức tam giác."
          }
        ],
        starterCode: "# Nhập 3 cạnh a, b, c\na, b, c = map(float, input().split())\n\n# Viết logic kiểm tra và phân loại tam giác\n",
        testCases: [
          { id: "tc-21-1-1", input: "3 4 5", expectedOutput: "TAM GIAC VUONG", isHidden: false },
          { id: "tc-21-1-2", input: "5 5 5", expectedOutput: "TAM GIAC DEU", isHidden: false },
          { id: "tc-21-1-3", input: "1 2 5", expectedOutput: "KHONG PHAI TAM GIAC", isHidden: false },
          { id: "tc-21-1-4", input: "5 5 8", expectedOutput: "TAM GIAC CAN", isHidden: true },
          { id: "tc-21-1-5", input: "4 7 9", expectedOutput: "TAM GIAC THUONG", isHidden: true }
        ],
        hints: [
          "Điều kiện tam giác: a + b > c and a + c > b and b + c > a.",
          "Tam giác vuông: round(a*a + b*b, 5) == round(c*c, 5) hoặc các hoán vị.",
          "Tam giác đều: a == b == c.",
          "Tam giác cân: a == b or b == c or a == c."
        ],
        solutionExplanation: "Đầu tiên kiểm tra bất đẳng thức tam giác. Nếu không thỏa in 'KHONG PHAI TAM GIAC'. Tiếp tục kiểm tra if a == b == c -> 'TAM GIAC DEU', elif tam giác vuông (kiểm tra 3 trường hợp Pytago) -> 'TAM GIAC VUONG', elif a == b or b == c or a == c -> 'TAM GIAC CAN', else -> 'TAM GIAC THUONG'."
      },
      practices: [
        {
          id: "ex-21-1",
          title: "Bài tập 2.1: Phân loại tam giác & Kiểm tra tính hợp lệ",
          difficulty: "Trung bình",
          problemStatement: "Nhập vào 3 số thực dương a, b, c là độ dài 3 đoạn thẳng. Hãy kiểm tra xem 3 đoạn thẳng có tạo thành một tam giác hay không. Nếu có, hãy phân loại chính xác loại tam giác:\n- Nếu không phải tam giác (tổng 2 cạnh <= cạnh còn lại): in 'KHONG PHAI TAM GIAC'\n- Nếu là tam giác đều (a == b == c): in 'TAM GIAC DEU'\n- Nếu là tam giác vuông (thỏa mãn định lý Pytago a^2 + b^2 = c^2 hoặc hoán vị): in 'TAM GIAC VUONG'\n- Nếu là tam giác cân (có 2 cạnh bằng nhau): in 'TAM GIAC CAN'\n- Nếu là tam giác thường: in 'TAM GIAC THUONG'\n\nLưu ý: Kiểm tra theo đúng thứ tự ưu tiên (ví dụ tam giác đều ưu tiên hơn cân).",
          inputFormat: "3 số thực dương a, b, c trên một dòng cách nhau bởi dấu cách.",
          outputFormat: "Một chuỗi kết quả phân loại in HOA không dấu như mô tả.",
          constraints: "0 < a, b, c <= 10000",
          sampleCases: [
            {
              input: "3 4 5",
              output: "TAM GIAC VUONG",
              explanation: "3^2 + 4^2 = 9 + 16 = 25 = 5^2 -> Tam giác vuông."
            },
            {
              input: "5 5 5",
              output: "TAM GIAC DEU",
              explanation: "3 cạnh bằng nhau -> Tam giác đều."
            },
            {
              input: "1 2 5",
              output: "KHONG PHAI TAM GIAC",
              explanation: "1 + 2 = 3 < 5 -> Không thỏa mãn bất đẳng thức tam giác."
            }
          ],
          starterCode: "# Nhập 3 cạnh a, b, c\na, b, c = map(float, input().split())\n\n# Viết logic kiểm tra và phân loại tam giác\n",
          testCases: [
            { id: "tc-21-1-1", input: "3 4 5", expectedOutput: "TAM GIAC VUONG", isHidden: false },
            { id: "tc-21-1-2", input: "5 5 5", expectedOutput: "TAM GIAC DEU", isHidden: false },
            { id: "tc-21-1-3", input: "1 2 5", expectedOutput: "KHONG PHAI TAM GIAC", isHidden: false },
            { id: "tc-21-1-4", input: "5 5 8", expectedOutput: "TAM GIAC CAN", isHidden: true },
            { id: "tc-21-1-5", input: "4 7 9", expectedOutput: "TAM GIAC THUONG", isHidden: true }
          ],
          hints: [
            "Điều kiện tam giác: a + b > c and a + c > b and b + c > a.",
            "Tam giác vuông: round(a*a + b*b, 5) == round(c*c, 5) hoặc các hoán vị.",
            "Tam giác đều: a == b == c.",
            "Tam giác cân: a == b or b == c or a == c."
          ],
          solutionExplanation: "Đầu tiên kiểm tra bất đẳng thức tam giác. Nếu không thỏa in 'KHONG PHAI TAM GIAC'. Tiếp tục kiểm tra if a == b == c -> 'TAM GIAC DEU', elif tam giác vuông (kiểm tra 3 trường hợp Pytago) -> 'TAM GIAC VUONG', elif a == b or b == c or a == c -> 'TAM GIAC CAN', else -> 'TAM GIAC THUONG'."
        },
        {
          id: "ex-21-2",
          title: "Bài tập 2.2: Tính cước taxi bậc thang lũy tiến",
          difficulty: "Trung bình",
          problemStatement: "Một hãng taxi tính cước theo quãng đường d (km, số thực dương) như sau:\n- 1 km đầu tiên: 15.000 VNĐ\n- Từ km thứ 2 đến km thứ 10 (tối đa 9 km): 13.500 VNĐ/km\n- Từ km thứ 11 đến km thứ 30 (tối đa 20 km): 11.000 VNĐ/km\n- Từ km thứ 31 trở đi: 9.000 VNĐ/km\n\nĐặc biệt: Nếu tổng quãng đường d > 100 km thì khách hàng được giảm giá 10% trên tổng số tiền cước.\nHãy in ra tổng số tiền cước taxi phải trả (làm tròn số nguyên int).",
          inputFormat: "Một số thực d là quãng đường di chuyển (km).",
          outputFormat: "Một số nguyên duy nhất là số tiền cước.",
          constraints: "0 < d <= 1000",
          sampleCases: [
            {
              input: "0.8",
              output: "15000",
              explanation: "Quãng đường <= 1km tính trọn gói 15.000đ."
            },
            {
              input: "15",
              output: "191500",
              explanation: "1km đầu: 15000; 9km tiếp theo: 9*13500=121500; 5km tiếp theo: 5*11000=55000. Tổng = 191500đ."
            }
          ],
          starterCode: "d = float(input())\n\n# Tính cước taxi theo từng khoảng khoảng cách\n",
          testCases: [
            { id: "tc-21-2-1", input: "0.8", expectedOutput: "15000", isHidden: false },
            { id: "tc-21-2-2", input: "15", expectedOutput: "191500", isHidden: false },
            { id: "tc-21-2-3", input: "35", expectedOutput: "401500", isHidden: true },
            { id: "tc-21-2-4", input: "120", expectedOutput: "1050750", isHidden: true }
          ],
          hints: [
            "Nếu d <= 1: total = 15000",
            "Nếu d <= 10: total = 15000 + (d - 1) * 13500",
            "Nếu d <= 30: total = 15000 + 9 * 13500 + (d - 10) * 11000",
            "Nếu d > 30: total = 15000 + 9 * 13500 + 20 * 11000 + (d - 30) * 9000",
            "Nếu d > 100: total *= 0.9"
          ],
          solutionExplanation: "Phân chia các mốc 1, 10, 30 km. Tính lũy tiến từng đoạn. Nếu d > 100 thì nhân với 0.9. Cuối cùng in int(round(total))."
        },
        {
          id: "ex-21-3",
          title: "Bài tập 2.3: Xác định số ngày trong tháng và năm nhuận",
          difficulty: "Cơ bản",
          problemStatement: "Nhập vào 2 số nguyên M (tháng, 1 <= M <= 12) và Y (năm, Y > 0).\nHãy in ra 2 dòng:\n- Dòng 1: In 'NAM NHUAN' nếu năm Y là năm nhuận, ngược lại in 'NAM KHONG NHUAN'.\n- Dòng 2: In số ngày của tháng M trong năm Y (Tháng 1, 3, 5, 7, 8, 10, 12 có 31 ngày; Tháng 4, 6, 9, 11 có 30 ngày; Tháng 2 có 29 ngày nếu năm nhuận hoặc 28 ngày nếu không nhuận).",
          inputFormat: "Dòng 1 nhập số nguyên M (tháng). Dòng 2 nhập số nguyên Y (năm).",
          outputFormat: "2 dòng kết quả như mô tả.",
          constraints: "1 <= M <= 12, 1 <= Y <= 9999",
          sampleCases: [
            {
              input: "2\n2024",
              output: "NAM NHUAN\n29",
              explanation: "Năm 2024 chia hết cho 4 và không chia hết cho 100 -> Năm nhuận -> Tháng 2 có 29 ngày."
            },
            {
              input: "2\n1900",
              output: "NAM KHONG NHUAN\n28",
              explanation: "Năm 1900 chia hết cho 100 nhưng không chia hết cho 400 -> Không nhuận -> Tháng 2 có 28 ngày."
            }
          ],
          starterCode: "m = int(input())\ny = int(input())\n\n# Kiểm tra năm nhuận\n\n# Xác định số ngày trong tháng\n",
          testCases: [
            { id: "tc-21-3-1", input: "2\n2024", expectedOutput: "NAM NHUAN\n29", isHidden: false },
            { id: "tc-21-3-2", input: "2\n1900", expectedOutput: "NAM KHONG NHUAN\n28", isHidden: false },
            { id: "tc-21-3-3", input: "7\n2023", expectedOutput: "NAM KHONG NHUAN\n31", isHidden: true },
            { id: "tc-21-3-4", input: "11\n2000", expectedOutput: "NAM NHUAN\n30", isHidden: true }
          ],
          hints: [
            "Năm nhuận: is_leap = (y % 400 == 0) or (y % 4 == 0 and y % 100 != 0)",
            "Tháng 2: 29 ngày nếu is_leap else 28 ngày",
            "Tháng [1, 3, 5, 7, 8, 10, 12]: 31 ngày; còn lại: 30 ngày"
          ],
          solutionExplanation: "Xác định biến boolean is_leap. In 'NAM NHUAN' hoặc 'NAM KHONG NHUAN'. Dùng if/elif để trả về số ngày tương ứng của tháng m."
        }
      ]
    },
    {
      id: "lesson-22",
      moduleId: "module-8",
      moduleTitle: "Chương 8: Ôn tập tổng hợp",
      order: 3,
      title: "Chủ đề 3: Ôn tập Vòng lặp & Luồng điều khiển",
      description: "Tổng hợp các kỹ thuật lập trình với vòng lặp for, while, lệnh break, continue và vòng lặp lồng nhau.",
      durationMin: 45,
      xpReward: 100,
      theory: {
        summary: "Hệ thống hóa hai cấu trúc lặp nền tảng: for (lặp với số lần biết trước hoặc duyệt qua tập hợp) và while (lặp theo điều kiện). Nắm vững kỹ thuật can thiệp luồng lặp với break (dừng sớm) và continue (bỏ qua bước hiện tại), cùng mô hình vòng lặp lồng nhau (nested loop).",
        keyPoints: [
          "range(start, stop, step): Duyệt từ start đến stop - 1 với bước nhảy step.",
          "while condition: Tiếp tục thực hiện khối lệnh chừng nào condition còn là True; luôn cần có lệnh cập nhật biến lặp để tránh lặp vô tận (infinite loop).",
          "break dùng để tối ưu thuật toán (dừng ngay khi tìm thấy kết quả).",
          "Vòng lặp lồng nhau: Vòng lặp ngoài chạy 1 lần, vòng lặp trong sẽ chạy hết toàn bộ chu kỳ của nó."
        ],
        conceptIllustration: {
          type: "loops",
          title: "Mô hình Vòng lặp & Kỹ thuật Điều khiển luồng",
          description: "So sánh vòng lặp for và while trong thuật toán",
          visualData: {
            variables: [
              { name: "for i in range(n)", value: "Biết trước số lần", type: "0 -> n-1" },
              { name: "while condition", value: "Lặp theo điều kiện", type: "Dừng khi False" },
              { name: "break", value: "Thoát vòng lặp", type: "Ngắt tức thì" },
              { name: "continue", value: "Nhảy sang lượt sau", type: "Bỏ qua phần dưới" }
            ]
          }
        },
        examples: [
          {
            title: "Ví dụ: Tìm UCLN bằng thuật toán Euclid với while",
            code: `a, b = 48, 18\nwhile b != 0:\n    a, b = b, a % b\nprint(f"UCLN là: {a}")`,
            explanation: "Thuật toán Euclid liên tục gán a = b và b = a % b cho đến khi b = 0. Khi đó a chính là UCLN."
          }
        ],
        multipleChoice: {
          question: "Đoạn code sau in ra bao nhiêu số:\nfor i in range(1, 10):\n    if i % 3 == 0:\n        continue\n    if i > 7:\n        break\n    print(i, end=' ')",
          options: [
            "In ra 5 số (1, 2, 4, 5, 7)",
            "In ra 7 số (1, 2, 3, 4, 5, 6, 7)",
            "In ra 9 số (1 đến 9)",
            "In ra 4 số (1, 2, 4, 5)"
          ],
          correctIndex: 0,
          explanation: "i duyệt từ 1 đến 9. Khi i=3, 6 (chia hết cho 3) thì continue (không in). Khi i=1, 2, 4, 5, 7 thì in ra. Khi i=8 > 7 thì break thoát vòng lặp. Tổng cộng in 5 số: 1 2 4 5 7."
        }
      },
      practice: {
        id: "ex-22-1",
        title: "Bài tập 3.1: Tìm UCLN và BCNN bằng thuật toán Euclid",
        difficulty: "Cơ bản",
        problemStatement: "Nhập vào 2 số nguyên dương a và b trên cùng một dòng. Hãy sử dụng vòng lặp while để tìm Ước chung lớn nhất (UCLN) và Bội chung nhỏ nhất (BCNN) của hai số đó.\nIn ra kết quả theo định dạng: 'UCLN = X, BCNN = Y'.",
        inputFormat: "Hai số nguyên dương a và b cách nhau bởi dấu cách.",
        outputFormat: "Một dòng duy nhất định dạng 'UCLN = X, BCNN = Y'.",
        constraints: "1 <= a, b <= 10^9",
        sampleCases: [
          {
            input: "24 36",
            output: "UCLN = 12, BCNN = 72",
            explanation: "UCLN(24, 36) = 12. BCNN(24, 36) = (24 * 36) // 12 = 72."
          },
          {
            input: "17 5",
            output: "UCLN = 1, BCNN = 85",
            explanation: "Hai số nguyên tố cùng nhau có UCLN = 1 và BCNN = 85."
          }
        ],
        starterCode: "a, b = map(int, input().split())\n\n# Lưu lại giá trị ban đầu để tính BCNN\norig_a, orig_b = a, b\n\n# Thuật toán Euclid tìm UCLN bằng vòng lặp while\n",
        testCases: [
          { id: "tc-22-1-1", input: "24 36", expectedOutput: "UCLN = 12, BCNN = 72", isHidden: false },
          { id: "tc-22-1-2", input: "17 5", expectedOutput: "UCLN = 1, BCNN = 85", isHidden: false },
          { id: "tc-22-1-3", input: "100 250", expectedOutput: "UCLN = 50, BCNN = 500", isHidden: true },
          { id: "tc-22-1-4", input: "81 27", expectedOutput: "UCLN = 27, BCNN = 81", isHidden: true }
        ],
        hints: [
          "Trong vòng lặp while b != 0: a, b = b, a % b",
          "BCNN = (orig_a * orig_b) // ucln"
        ],
        solutionExplanation: "Dùng thuật toán Euclid với while b != 0: a, b = b, a % b. UCLN là a. BCNN = (orig_a * orig_b) // a."
      },
      practices: [
        {
          id: "ex-22-1",
          title: "Bài tập 3.1: Tìm UCLN và BCNN bằng thuật toán Euclid",
          difficulty: "Cơ bản",
          problemStatement: "Nhập vào 2 số nguyên dương a và b trên cùng một dòng. Hãy sử dụng vòng lặp while để tìm Ước chung lớn nhất (UCLN) và Bội chung nhỏ nhất (BCNN) của hai số đó.\nIn ra kết quả theo định dạng: 'UCLN = X, BCNN = Y'.",
          inputFormat: "Hai số nguyên dương a và b cách nhau bởi dấu cách.",
          outputFormat: "Một dòng duy nhất định dạng 'UCLN = X, BCNN = Y'.",
          constraints: "1 <= a, b <= 10^9",
          sampleCases: [
            {
              input: "24 36",
              output: "UCLN = 12, BCNN = 72",
              explanation: "UCLN(24, 36) = 12. BCNN(24, 36) = (24 * 36) // 12 = 72."
            },
            {
              input: "17 5",
              output: "UCLN = 1, BCNN = 85",
              explanation: "Hai số nguyên tố cùng nhau có UCLN = 1 và BCNN = 85."
            }
          ],
          starterCode: "a, b = map(int, input().split())\n\n# Lưu lại giá trị ban đầu để tính BCNN\norig_a, orig_b = a, b\n\n# Thuật toán Euclid tìm UCLN bằng vòng lặp while\n",
          testCases: [
            { id: "tc-22-1-1", input: "24 36", expectedOutput: "UCLN = 12, BCNN = 72", isHidden: false },
            { id: "tc-22-1-2", input: "17 5", expectedOutput: "UCLN = 1, BCNN = 85", isHidden: false },
            { id: "tc-22-1-3", input: "100 250", expectedOutput: "UCLN = 50, BCNN = 500", isHidden: true },
            { id: "tc-22-1-4", input: "81 27", expectedOutput: "UCLN = 27, BCNN = 81", isHidden: true }
          ],
          hints: [
            "Trong vòng lặp while b != 0: a, b = b, a % b",
            "BCNN = (orig_a * orig_b) // ucln"
          ],
          solutionExplanation: "Dùng thuật toán Euclid với while b != 0: a, b = b, a % b. UCLN là a. BCNN = (orig_a * orig_b) // a."
        },
        {
          id: "ex-22-2",
          title: "Bài tập 3.2: Liệt kê và đếm số nguyên tố trong đoạn [A, B]",
          difficulty: "Trung bình",
          problemStatement: "Nhập vào 2 số nguyên dương A và B trên cùng một dòng (1 <= A <= B <= 1000). Hãy tìm tất cả các số nguyên tố nằm trong đoạn [A, B] (bao gồm cả A và B).\nIn ra 2 dòng:\n- Dòng 1: Các số nguyên tố tìm được cách nhau bởi dấu cách. Nếu không có số nào in 'KHONG CO'.\n- Dòng 2: Số lượng các số nguyên tố tìm được.",
          inputFormat: "Hai số nguyên dương A và B cách nhau dấu cách.",
          outputFormat: "2 dòng theo yêu cầu.",
          constraints: "1 <= A <= B <= 1000",
          sampleCases: [
            {
              input: "10 20",
              output: "11 13 17 19\n4",
              explanation: "Trong đoạn [10, 20] có 4 số nguyên tố: 11, 13, 17, 19."
            },
            {
              input: "1 5",
              output: "2 3 5\n3",
              explanation: "Số 1 không phải nguyên tố. Các số nguyên tố là 2, 3, 5."
            }
          ],
          starterCode: "A, B = map(int, input().split())\n\n# Tìm các số nguyên tố trong đoạn [A, B]\n",
          testCases: [
            { id: "tc-22-2-1", input: "10 20", expectedOutput: "11 13 17 19\n4", isHidden: false },
            { id: "tc-22-2-2", input: "1 5", expectedOutput: "2 3 5\n3", isHidden: false },
            { id: "tc-22-2-3", input: "24 28", expectedOutput: "KHONG CO\n0", isHidden: true },
            { id: "tc-22-2-4", input: "50 100", expectedOutput: "53 59 61 67 71 73 79 83 89 97\n10", isHidden: true }
          ],
          hints: [
            "Hàm kiểm tra nguyên tố: n >= 2 và không chia hết cho số nào từ 2 đến int(n**0.5).",
            "Duyệt num từ A đến B, nếu nguyên tố thì thêm vào list primes."
          ],
          solutionExplanation: "Viết logic kiểm tra số nguyên tố cho từng số từ A đến B. Lưu vào danh sách. Nếu danh sách rỗng in 'KHONG CO', ngược lại in ' '.join(map(str, primes)). Dòng 2 in len(primes)."
        },
        {
          id: "ex-22-3",
          title: "Bài tập 3.3: Vẽ tháp số đối xứng (Kim tự tháp số)",
          difficulty: "Nâng cao",
          problemStatement: "Nhập vào một số nguyên dương N (1 <= N <= 9). Hãy in ra một tháp số đối xứng gồm N dòng:\n- Dòng thứ i (1 <= i <= N) có (N - i) khoảng trắng ở đầu, sau đó là dãy số tăng dần từ 1 đến i, rồi giảm dần từ i - 1 về 1.\nVí dụ với N = 3:\n  1\n 121\n12321",
          inputFormat: "Một số nguyên dương N (1 <= N <= 9).",
          outputFormat: "N dòng tạo thành hình kim tự tháp số.",
          constraints: "1 <= N <= 9",
          sampleCases: [
            {
              input: "3",
              output: "  1\n 121\n12321",
              explanation: "Dòng 1: 2 space + 1\nDòng 2: 1 space + 121\nDòng 3: 0 space + 12321"
            },
            {
              input: "4",
              output: "   1\n  121\n 12321\n1234321",
              explanation: "Tháp 4 tầng đối xứng hoàn hảo."
            }
          ],
          starterCode: "n = int(input())\n\n# Vòng lặp in tháp số đối xứng N tầng\n",
          testCases: [
            { id: "tc-22-3-1", input: "3", expectedOutput: "  1\n 121\n12321", isHidden: false },
            { id: "tc-22-3-2", input: "4", expectedOutput: "   1\n  121\n 12321\n1234321", isHidden: false },
            { id: "tc-22-3-3", input: "1", expectedOutput: "1", isHidden: true },
            { id: "tc-22-3-4", input: "5", expectedOutput: "    1\n   121\n  12321\n 1234321\n123454321", isHidden: true }
          ],
          hints: [
            "Với mỗi dòng i từ 1 đến n:",
            "Khoảng trắng: ' ' * (n - i)",
            "Nửa tăng: ''.join(str(x) for x in range(1, i + 1))",
            "Nửa giảm: ''.join(str(x) for x in range(i - 1, 0, -1))"
          ],
          solutionExplanation: "Duyệt i từ 1 đến n. Với mỗi i: in ' '*(n-i) ghép với chuỗi các số từ 1..i rồi từ i-1..1."
        }
      ]
    },
    {
      id: "lesson-23",
      moduleId: "module-8",
      moduleTitle: "Chương 8: Ôn tập tổng hợp",
      order: 4,
      title: "Chủ đề 4: Ôn tập Chuỗi ký tự (Strings) & Xử lý văn bản",
      description: "Tổng kết tính chất bất biến, kỹ thuật cắt lát slicing s[start:stop:step], đảo ngược chuỗi và các phương thức xử lý chuỗi phổ biến.",
      durationMin: 40,
      xpReward: 95,
      theory: {
        summary: "Chuỗi (str) là tập hợp các ký tự có thứ tự và bất biến (immutable). Củng cố kỹ thuật truy xuất chỉ số (dương từ 0, âm từ -1), cắt lát slicing s[start:stop:step], đảo chuỗi s[::-1], và các phương thức mạnh mẽ: split(), join(), strip(), replace(), count(), lower(), upper(), isalpha(), isdigit().",
        keyPoints: [
          "Chuỗi không thể bị thay đổi tại chỗ (s[0] = 'a' sẽ báo lỗi TypeError).",
          "Slicing s[start:stop:step]: Lấy các ký tự từ start đến stop-1 với bước nhảy step.",
          "s[::-1] tạo bản sao đảo ngược của chuỗi s.",
          "split(sep) tách chuỗi thành list các từ; ' '.join(words) ghép list thành chuỗi.",
          "isalpha() kiểm tra chữ cái, isdigit() kiểm tra chữ số, isspace() kiểm tra khoảng trắng."
        ],
        conceptIllustration: {
          type: "strings",
          title: "Bảng tra cứu phương thức Chuỗi (String Methods)",
          description: "Các hàm xử lý chuỗi thông dụng nhất trong Python",
          visualData: {
            variables: [
              { name: "s.strip()", value: "Xóa khoảng trắng", type: "'  hi ' -> 'hi'" },
              { name: "s.split()", value: "Tách từ", type: "'a b' -> ['a','b']" },
              { name: "s.title()", value: "Viết hoa chữ đầu", type: "'nguyen an' -> 'Nguyen An'" },
              { name: "s[::-1]", value: "Đảo ngược chuỗi", type: "'python' -> 'nohtyp'" }
            ]
          }
        },
        examples: [
          {
            title: "Ví dụ: Đếm tần suất xuất hiện ký tự",
            code: `text = "lap trinh python"\nprint("Số chữ 't':", text.count('t'))\nprint("Viết hoa:", text.upper())`,
            explanation: "count('t') trả về số lần xuất hiện của chữ 't' trong chuỗi."
          }
        ],
        multipleChoice: {
          question: "Chuỗi s = 'Python' sau lệnh print(s[1:5:2]) sẽ in ra kết quả gì?",
          options: [
            "yh",
            "yhn",
            "Pto",
            "to"
          ],
          correctIndex: 0,
          explanation: "s[1:5:2] lấy từ vị trí 1 đến 4 với bước nhảy 2: index 1 là 'y', index 3 là 'h'. Kết quả là 'yh'."
        }
      },
      practice: {
        id: "ex-23-1",
        title: "Bài tập 4.1: Chuẩn hóa họ tên người dùng chuẩn tiếng Việt",
        difficulty: "Cơ bản",
        problemStatement: "Một hệ thống nhận họ tên người dùng bị lỗi định dạng với nhiều khoảng trắng thừa ở đầu, cuối và giữa các từ, đồng thời chữ hoa chữ thường lộn xộn.\nHãy viết chương trình chuẩn hóa họ tên sao cho:\n- Xóa hết khoảng trắng thừa ở đầu và cuối chuỗi.\n- Giữa các từ chỉ ngăn cách nhau bởi đúng 1 dấu cách duy nhất.\n- Viết hoa chữ cái đầu tiên của mỗi từ và viết thường tất cả các chữ cái còn lại trong từ đó.",
        inputFormat: "Một dòng chứa chuỗi họ tên ban đầu.",
        outputFormat: "Một dòng duy nhất là chuỗi họ tên đã được chuẩn hóa.",
        constraints: "Chuỗi có độ dài từ 1 đến 200 ký tự.",
        sampleCases: [
          {
            input: "  nGuyen   vAn   aN  ",
            output: "Nguyen Van An",
            explanation: "Xóa khoảng trắng thừa và chuẩn hóa từng từ thành Nguyen, Van, An."
          },
          {
            input: "LE    tHi    HOA",
            output: "Le Thi Hoa",
            explanation: "Chuẩn hóa thành 'Le Thi Hoa'."
          }
        ],
        starterCode: "s = input()\n\n# Tách từ và chuẩn hóa từng từ\n",
        testCases: [
          { id: "tc-23-1-1", input: "  nGuyen   vAn   aN  ", expectedOutput: "Nguyen Van An", isHidden: false },
          { id: "tc-23-1-2", input: "LE    tHi    HOA", expectedOutput: "Le Thi Hoa", isHidden: false },
          { id: "tc-23-1-3", input: "   pYtHon   ", expectedOutput: "Python", isHidden: true },
          { id: "tc-23-1-4", input: "TRAN   MINH   DUC   HOANG", expectedOutput: "Tran Minh Duc Hoang", isHidden: true }
        ],
        hints: [
          "s.split() tự động bỏ qua mọi khoảng trắng thừa liên tiếp và trả về danh sách các từ.",
          "Dùng [word.capitalize() for word in words] hoặc [w[0].upper() + w[1:].lower() for w in words].",
          "Ghép lại bằng ' '.join(...)."
        ],
        solutionExplanation: "Dùng words = s.split(), sau đó normalized = [w.capitalize() for w in words], rồi print(' '.join(normalized))."
      },
      practices: [
        {
          id: "ex-23-1",
          title: "Bài tập 4.1: Chuẩn hóa họ tên người dùng chuẩn tiếng Việt",
          difficulty: "Cơ bản",
          problemStatement: "Một hệ thống nhận họ tên người dùng bị lỗi định dạng với nhiều khoảng trắng thừa ở đầu, cuối và giữa các từ, đồng thời chữ hoa chữ thường lộn xộn.\nHãy viết chương trình chuẩn hóa họ tên sao cho:\n- Xóa hết khoảng trắng thừa ở đầu và cuối chuỗi.\n- Giữa các từ chỉ ngăn cách nhau bởi đúng 1 dấu cách duy nhất.\n- Viết hoa chữ cái đầu tiên của mỗi từ và viết thường tất cả các chữ cái còn lại trong từ đó.",
          inputFormat: "Một dòng chứa chuỗi họ tên ban đầu.",
          outputFormat: "Một dòng duy nhất là chuỗi họ tên đã được chuẩn hóa.",
          constraints: "Chuỗi có độ dài từ 1 đến 200 ký tự.",
          sampleCases: [
            {
              input: "  nGuyen   vAn   aN  ",
              output: "Nguyen Van An",
              explanation: "Xóa khoảng trắng thừa và chuẩn hóa từng từ thành Nguyen, Van, An."
            },
            {
              input: "LE    tHi    HOA",
              output: "Le Thi Hoa",
              explanation: "Chuẩn hóa thành 'Le Thi Hoa'."
            }
          ],
          starterCode: "s = input()\n\n# Tách từ và chuẩn hóa từng từ\n",
          testCases: [
            { id: "tc-23-1-1", input: "  nGuyen   vAn   aN  ", expectedOutput: "Nguyen Van An", isHidden: false },
            { id: "tc-23-1-2", input: "LE    tHi    HOA", expectedOutput: "Le Thi Hoa", isHidden: false },
            { id: "tc-23-1-3", input: "   pYtHon   ", expectedOutput: "Python", isHidden: true },
            { id: "tc-23-1-4", input: "TRAN   MINH   DUC   HOANG", expectedOutput: "Tran Minh Duc Hoang", isHidden: true }
          ],
          hints: [
            "s.split() tự động bỏ qua mọi khoảng trắng thừa liên tiếp và trả về danh sách các từ.",
            "Dùng [word.capitalize() for word in words] hoặc [w[0].upper() + w[1:].lower() for w in words].",
            "Ghép lại bằng ' '.join(...)."
          ],
          solutionExplanation: "Dùng words = s.split(), sau đó normalized = [w.capitalize() for w in words], rồi print(' '.join(normalized))."
        },
        {
          id: "ex-23-2",
          title: "Bài tập 4.2: Thống kê chi tiết thành phần ký tự trong câu",
          difficulty: "Trung bình",
          problemStatement: "Viết chương trình nhập vào một chuỗi ký tự S bất kỳ. Hãy đếm và in ra số lượng từng loại ký tự trong chuỗi theo định dạng 4 dòng:\n- Dòng 1: 'Chu cai: X' (đếm các chữ cái a-z, A-Z)\n- Dòng 2: 'Chu so: Y' (đếm các chữ số 0-9)\n- Dòng 3: 'Khoang trang: Z' (đếm các ký tự dấu cách)\n- Dòng 4: 'Ky tu dac biet: K' (các ký tự còn lại không thuộc 3 nhóm trên)",
          inputFormat: "Một dòng duy nhất chứa chuỗi S.",
          outputFormat: "4 dòng theo định dạng mô tả.",
          constraints: "1 <= len(S) <= 1000",
          sampleCases: [
            {
              input: "Python 3.12 is Awesome! #2024",
              output: "Chu cai: 15\nChu so: 7\nKhoang trang: 4\nKy tu dac biet: 3",
              explanation: "15 chữ cái, 7 chữ số (3, 1, 2, 2, 0, 2, 4), 4 khoảng trắng, 3 ký tự đặc biệt (., !, #)."
            }
          ],
          starterCode: "s = input()\n\n# Khởi tạo các biến đếm\nletters = 0\ndigits = 0\nspaces = 0\nspecials = 0\n\n# Duyệt chuỗi và phân loại ký tự\n",
          testCases: [
            { id: "tc-23-2-1", input: "Python 3.12 is Awesome! #2024", expectedOutput: "Chu cai: 15\nChu so: 7\nKhoang trang: 4\nKy tu dac biet: 3", isHidden: false },
            { id: "tc-23-2-2", input: "Hello World 123", expectedOutput: "Chu cai: 10\nChu so: 3\nKhoang trang: 2\nKy tu dac biet: 0", isHidden: false },
            { id: "tc-23-2-3", input: "@#$%^&*()_+", expectedOutput: "Chu cai: 0\nChu so: 0\nKhoang trang: 0\nKy tu dac biet: 11", isHidden: true },
            { id: "tc-23-2-4", input: "123456", expectedOutput: "Chu cai: 0\nChu so: 6\nKhoang trang: 0\nKy tu dac biet: 0", isHidden: true }
          ],
          hints: [
            "ch.isalpha() -> chữ cái",
            "ch.isdigit() -> chữ số",
            "ch.isspace() -> khoảng trắng",
            "Ngược lại là ký tự đặc biệt"
          ],
          solutionExplanation: "Duyệt từng ký tự ch trong s. Dùng if ch.isalpha(): letters += 1, elif ch.isdigit(): digits += 1, elif ch.isspace(): spaces += 1, else: specials += 1. In 4 dòng."
        },
        {
          id: "ex-23-3",
          title: "Bài tập 4.3: Mã hóa mật mã dịch chuyển Caesar Cipher",
          difficulty: "Nâng cao",
          problemStatement: "Mật mã Caesar dịch chuyển mỗi chữ cái trong chuỗi đi K vị trí trong bảng chữ cái tiếng Anh (vòng lại từ 'z'/'Z' về 'a'/'A'). Các ký tự không phải chữ cái (dấu cách, dấu câu, chữ số) được giữ nguyên không đổi.\nNhập vào chuỗi S (dòng 1) và số nguyên K (dòng 2, 0 <= K <= 25). Hãy in ra chuỗi đã được mã hóa.",
          inputFormat: "Dòng 1 là chuỗi S. Dòng 2 là số nguyên K (bước dịch chuyển).",
          outputFormat: "Chuỗi sau khi được mã hóa.",
          constraints: "1 <= len(S) <= 1000, 0 <= K <= 25",
          sampleCases: [
            {
              input: "Hello, World!\n3",
              output: "Khoor, Zruog!",
              explanation: "'H' dịch 3 bước thành 'K', 'e' thành 'h', 'l' thành 'o', 'o' thành 'r', 'W' thành 'Z'..."
            },
            {
              input: "Python 2024\n1",
              output: "Qzuipn 2024",
              explanation: "'P'->'Q', 'y'->'z', 't'->'u', 'h'->'i', 'o'->'p', 'n'->'n' -> 'Qzuipn 2024'."
            }
          ],
          starterCode: "s = input()\nk = int(input())\n\n# Thực hiện mã hóa Caesar Cipher cho chuỗi s với khóa k\n",
          testCases: [
            { id: "tc-23-3-1", input: "Hello, World!\n3", expectedOutput: "Khoor, Zruog!", isHidden: false },
            { id: "tc-23-3-2", input: "Python 2024\n1", expectedOutput: "Qzuipn 2024", isHidden: false },
            { id: "tc-23-3-3", input: "XYZ abc!\n3", expectedOutput: "ABC def!", isHidden: true },
            { id: "tc-23-3-4", input: "No Change 123\n0", expectedOutput: "No Change 123", isHidden: true }
          ],
          hints: [
            "Với chữ hoa: chr((ord(c) - ord('A') + k) % 26 + ord('A'))",
            "Với chữ thường: chr((ord(c) - ord('a') + k) % 26 + ord('a'))",
            "Ký tự khác giữ nguyên"
          ],
          solutionExplanation: "Duyệt từng ký tự c trong s. Nếu c.isupper() thì tính chr((ord(c) - ord('A') + k) % 26 + ord('A')), nếu c.islower() thì tính chr((ord(c) - ord('a') + k) % 26 + ord('a')), ngược lại giữ nguyên c. Ghép kết quả thành chuỗi."
        }
      ]
    },
    {
      id: "lesson-24",
      moduleId: "module-8",
      moduleTitle: "Chương 8: Ôn tập tổng hợp",
      order: 5,
      title: "Chủ đề 5: Ôn tập Danh sách (List) & Mảng 1 chiều",
      description: "Hệ thống hóa cấu trúc dữ liệu List, các phương thức biến đổi mảng, hàm thống kê và kỹ thuật lọc danh sách.",
      durationMin: 45,
      xpReward: 100,
      theory: {
        summary: "Danh sách (List) là kiểu dữ liệu tập hợp mạnh mẽ nhất trong Python: Có thứ tự, có thể thay đổi (mutable), chứa được nhiều kiểu dữ liệu hỗn hợp. Tổng kết các phương thức quan trọng: append(), insert(), pop(), remove(), sort(), reverse(), cùng các hàm len(), sum(), min(), max() và cú pháp List Comprehension.",
        keyPoints: [
          "List là mutable: Có thể thay đổi phần tử trực tiếp qua chỉ số arr[i] = new_val.",
          "arr.append(x) thêm x vào cuối mảng, arr.pop(i) xóa và lấy ra phần tử tại vị trí i (mặc định là phần tử cuối).",
          "arr.sort() sắp xếp mảng gốc tại chỗ; sorted(arr) trả về mảng mới đã sắp xếp mà không đổi mảng ban đầu.",
          "List comprehension: [expr for item in iterable if condition] giúp viết code ngắn gọn và tối ưu tốc độ."
        ],
        conceptIllustration: {
          type: "memory",
          title: "Cấu trúc Danh sách & Các phương thức đột biến mảng",
          description: "Mô tả cơ chế thêm, xóa, sắp xếp trong Python List",
          visualData: {
            variables: [
              { name: "arr.append(x)", value: "Thêm vào cuối", type: "O(1)" },
              { name: "arr.sort()", value: "Sắp xếp tăng dần", type: "O(N log N)" },
              { name: "arr.pop()", value: "Lấy phần tử cuối", type: "O(1)" },
              { name: "min/max/sum", value: "Thống kê mảng", type: "O(N)" }
            ]
          }
        },
        examples: [
          {
            title: "Ví dụ: Lọc số chẵn bằng List Comprehension",
            code: `numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\nevens = [x for x in numbers if x % 2 == 0]\nprint("Các số chẵn:", evens)`,
            explanation: "List comprehension lọc các phần tử x thỏa mãn x % 2 == 0 chỉ trong một dòng lệnh."
          }
        ],
        multipleChoice: {
          question: "Sau khi thực thi đoạn mã:\na = [1, 2, 3]\nb = a\nb.append(4)\nprint(len(a))\nGiá trị in ra là bao nhiêu?",
          options: [
            "4 (vì b và a cùng tham chiếu tới 1 danh sách)",
            "3 (vì chỉ thay đổi biến b)",
            "Lỗi chương trình",
            "None"
          ],
          correctIndex: 0,
          explanation: "Phép gán b = a trong Python tạo ra tham chiếu (aliasing) cùng trỏ tới một vùng nhớ danh sách. Khi b.append(4) thì danh sách a cũng có 4 phần tử."
        }
      },
      practice: {
        id: "ex-24-1",
        title: "Bài tập 5.1: Tìm phần tử lớn thứ hai (Second Largest) trong danh sách",
        difficulty: "Trung bình",
        problemStatement: "Nhập vào số nguyên N (dòng 1, N >= 2) và dòng 2 chứa N số nguyên cách nhau bởi dấu cách. Hãy tìm giá trị lớn thứ hai riêng biệt (strictly second largest) trong danh sách.\n- Nếu tìm thấy, in ra giá trị đó.\n- Nếu tất cả các phần tử trong danh sách đều bằng nhau (không có phần tử lớn thứ hai), in 'KHONG CO'.",
        inputFormat: "Dòng 1: Số nguyên N. Dòng 2: N số nguyên cách nhau dấu cách.",
        outputFormat: "Một giá trị nguyên duy nhất hoặc chuỗi 'KHONG CO'.",
        constraints: "2 <= N <= 10^5, -10^9 <= a[i] <= 10^9",
        sampleCases: [
          {
            input: "5\n10 20 4 45 99",
            output: "45",
            explanation: "Số lớn nhất là 99, số lớn thứ hai là 45."
          },
          {
            input: "4\n50 50 50 50",
            output: "KHONG CO",
            explanation: "Mọi phần tử đều bằng 50, không có phần tử lớn thứ hai."
          }
        ],
        starterCode: "n = int(input())\narr = list(map(int, input().split()))\n\n# Tìm phần tử lớn thứ hai riêng biệt\n",
        testCases: [
          { id: "tc-24-1-1", input: "5\n10 20 4 45 99", expectedOutput: "45", isHidden: false },
          { id: "tc-24-1-2", input: "4\n50 50 50 50", expectedOutput: "KHONG CO", isHidden: false },
          { id: "tc-24-1-3", input: "6\n5 5 4 4 3 2", expectedOutput: "4", isHidden: true },
          { id: "tc-24-1-4", input: "3\n-10 -5 -20", expectedOutput: "-10", isHidden: true }
        ],
        hints: [
          "Chuyển danh sách sang tập hợp unique = list(set(arr)) để loại bỏ các số trùng nhau.",
          "Sắp xếp unique.sort(). Nếu len(unique) < 2 in 'KHONG CO', ngược lại in unique[-2]."
        ],
        solutionExplanation: "Dùng unique = sorted(list(set(arr))). Nếu len(unique) >= 2 thì phần tử lớn thứ hai là unique[-2], ngược lại in 'KHONG CO'."
      },
      practices: [
        {
          id: "ex-24-1",
          title: "Bài tập 5.1: Tìm phần tử lớn thứ hai (Second Largest) trong danh sách",
          difficulty: "Trung bình",
          problemStatement: "Nhập vào số nguyên N (dòng 1, N >= 2) và dòng 2 chứa N số nguyên cách nhau bởi dấu cách. Hãy tìm giá trị lớn thứ hai riêng biệt (strictly second largest) trong danh sách.\n- Nếu tìm thấy, in ra giá trị đó.\n- Nếu tất cả các phần tử trong danh sách đều bằng nhau (không có phần tử lớn thứ hai), in 'KHONG CO'.",
          inputFormat: "Dòng 1: Số nguyên N. Dòng 2: N số nguyên cách nhau dấu cách.",
          outputFormat: "Một giá trị nguyên duy nhất hoặc chuỗi 'KHONG CO'.",
          constraints: "2 <= N <= 10^5, -10^9 <= a[i] <= 10^9",
          sampleCases: [
            {
              input: "5\n10 20 4 45 99",
              output: "45",
              explanation: "Số lớn nhất là 99, số lớn thứ hai là 45."
            },
            {
              input: "4\n50 50 50 50",
              output: "KHONG CO",
              explanation: "Mọi phần tử đều bằng 50, không có phần tử lớn thứ hai."
            }
          ],
          starterCode: "n = int(input())\narr = list(map(int, input().split()))\n\n# Tìm phần tử lớn thứ hai riêng biệt\n",
          testCases: [
            { id: "tc-24-1-1", input: "5\n10 20 4 45 99", expectedOutput: "45", isHidden: false },
            { id: "tc-24-1-2", input: "4\n50 50 50 50", expectedOutput: "KHONG CO", isHidden: false },
            { id: "tc-24-1-3", input: "6\n5 5 4 4 3 2", expectedOutput: "4", isHidden: true },
            { id: "tc-24-1-4", input: "3\n-10 -5 -20", expectedOutput: "-10", isHidden: true }
          ],
          hints: [
            "Chuyển danh sách sang tập hợp unique = list(set(arr)) để loại bỏ các số trùng nhau.",
            "Sắp xếp unique.sort(). Nếu len(unique) < 2 in 'KHONG CO', ngược lại in unique[-2]."
          ],
          solutionExplanation: "Dùng unique = sorted(list(set(arr))). Nếu len(unique) >= 2 thì phần tử lớn thứ hai là unique[-2], ngược lại in 'KHONG CO'."
        },
        {
          id: "ex-24-2",
          title: "Bài tập 5.2: Loại bỏ phần tử trùng lặp giữ nguyên thứ tự xuất hiện đầu tiên",
          difficulty: "Cơ bản",
          problemStatement: "Cho một danh sách gồm N số nguyên. Hãy viết chương trình loại bỏ tất cả các phần tử trùng lặp, chỉ giữ lại lần xuất hiện đầu tiên của mỗi phần tử theo đúng thứ tự ban đầu.\nIn ra các phần tử sau khi lọc cách nhau bởi dấu cách.",
          inputFormat: "Dòng 1: Số nguyên N. Dòng 2: N số nguyên cách nhau dấu cách.",
          outputFormat: "Dãy số sau khi loại bỏ phần tử trùng trên cùng một dòng.",
          constraints: "1 <= N <= 10^4",
          sampleCases: [
            {
              input: "8\n1 3 2 1 4 3 5 2",
              output: "1 3 2 4 5",
              explanation: "Các số 1, 3, 2 lặp lại ở phía sau bị xóa bỏ, giữ nguyên thứ tự xuất hiện đầu tiên."
            }
          ],
          starterCode: "n = int(input())\narr = list(map(int, input().split()))\n\n# Lọc phần tử duy nhất giữ nguyên thứ tự\n",
          testCases: [
            { id: "tc-24-2-1", input: "8\n1 3 2 1 4 3 5 2", expectedOutput: "1 3 2 4 5", isHidden: false },
            { id: "tc-24-2-2", input: "5\n7 7 7 7 7", expectedOutput: "7", isHidden: false },
            { id: "tc-24-2-3", input: "6\n10 20 30 40 50 60", expectedOutput: "10 20 30 40 50 60", isHidden: true },
            { id: "tc-24-2-4", input: "4\n-1 2 -1 3", expectedOutput: "-1 2 3", isHidden: true }
          ],
          hints: [
            "Dùng một tập hợp seen = set() và danh sách kết quả result = [].",
            "Duyệt từng phần tử: if x not in seen: seen.add(x); result.append(x)."
          ],
          solutionExplanation: "Duyệt từng phần tử x trong mảng. Nếu x chưa có trong tập hợp seen thì thêm x vào danh sách kết quả và đưa x vào seen. In kết quả."
        },
        {
          id: "ex-24-3",
          title: "Bài tập 5.3: Phân loại mảng chẵn tăng dần, lẻ giảm dần",
          difficulty: "Trung bình",
          problemStatement: "Nhập vào số nguyên N và danh sách N số nguyên. Hãy phân tách danh sách thành 2 nhóm:\n- Nhóm các số chẵn được sắp xếp theo thứ tự TĂNG DẦN.\n- Nhóm các số lẻ được sắp xếp theo thứ tự GIẢM DẦN.\n\nIn ra màn hình dãy số gồm tất cả các số chẵn (tăng dần) trước, nối tiếp sau đó là tất cả các số lẻ (giảm dần) trên cùng một dòng cách nhau bởi dấu cách.",
          inputFormat: "Dòng 1: Số nguyên N. Dòng 2: N số nguyên cách nhau dấu cách.",
          outputFormat: "Dãy số kết quả trên một dòng duy nhất.",
          constraints: "1 <= N <= 10^4",
          sampleCases: [
            {
              input: "7\n9 4 2 7 1 8 6",
              output: "2 4 6 8 9 7 1",
              explanation: "Số chẵn: [4, 2, 8, 6] -> sắp xếp tăng dần thành 2 4 6 8. Số lẻ: [9, 7, 1] -> sắp xếp giảm dần thành 9 7 1. Ghép lại: 2 4 6 8 9 7 1."
            }
          ],
          starterCode: "n = int(input())\narr = list(map(int, input().split()))\n\n# Tách chẵn lẻ và sắp xếp theo yêu cầu\n",
          testCases: [
            { id: "tc-24-3-1", input: "7\n9 4 2 7 1 8 6", expectedOutput: "2 4 6 8 9 7 1", isHidden: false },
            { id: "tc-24-3-2", input: "4\n2 8 4 6", expectedOutput: "2 4 6 8", isHidden: false },
            { id: "tc-24-3-3", input: "4\n1 5 9 3", expectedOutput: "9 5 3 1", isHidden: true },
            { id: "tc-24-3-4", input: "6\n0 -2 3 -1 4 5", expectedOutput: "-2 0 4 5 3 -1", isHidden: true }
          ],
          hints: [
            "evens = [x for x in arr if x % 2 == 0]",
            "odds = [x for x in arr if x % 2 != 0]",
            "evens.sort()",
            "odds.sort(reverse=True)",
            "result = evens + odds"
          ],
          solutionExplanation: "Tách mảng thành evens (x % 2 == 0) và odds (x % 2 != 0). Sắp xếp evens.sort() và odds.sort(reverse=True). Ghép 2 mảng lại và in."
        }
      ]
    },
    {
      id: "lesson-25",
      moduleId: "module-8",
      moduleTitle: "Chương 8: Ôn tập tổng hợp",
      order: 6,
      title: "Chủ đề 6: Ôn tập Hàm trong Python & Tư duy giải thuật Module",
      description: "Tổng kết định nghĩa hàm def, tham số mặc định, giá trị trả về return, phạm vi biến (Local vs Global Scope) và module hóa bài toán.",
      durationMin: 50,
      xpReward: 110,
      theory: {
        summary: "Hàm (Functions) là khối mã lệnh độc lập có thể tái sử dụng nhiều lần. Củng cố cấu trúc hàm def, cách truyền tham số (parameters & arguments), giá trị mặc định, cơ chế trả về kết quả qua return, trả về nhiều giá trị bằng Tuple, và quy tắc phạm vi biến Local Scope vs Global Scope.",
        keyPoints: [
          "Cú pháp: def function_name(param1, param2=default): ... return value",
          "Lệnh return lập tức kết thúc việc thực thi hàm và trả kết quả về cho nơi gọi hàm.",
          "Hàm không có return tường minh sẽ mặc định trả về None.",
          "Biến khai báo bên trong hàm là biến cục bộ (Local variable), không thể truy cập từ bên ngoài hàm.",
          "Tư duy Module: Chia một bài toán phức tạp thành nhiều hàm con nhỏ thực hiện từng chức năng chuyên biệt."
        ],
        conceptIllustration: {
          type: "syntax",
          title: "Kiến trúc Hàm & Luồng xử lý Dữ liệu",
          description: "Cơ chế nhận đối số đầu vào và trả về giá trị đầu ra",
          visualData: {
            variables: [
              { name: "def name(*args)", value: "Khai báo hàm", type: "Tái sử dụng" },
              { name: "return x, y", value: "Trả về nhiều giá trị", type: "Tuple unpacking" },
              { name: "param=default", value: "Tham số tùy chọn", type: "Linh hoạt" },
              { name: "Local Scope", value: "Phạm vi biến", type: "Độc lập an toàn" }
            ]
          }
        },
        examples: [
          {
            title: "Ví dụ: Hàm kiểm tra số nguyên tố và số hoàn hảo",
            code: `def is_prime(n):\n    if n < 2:\n        return False\n    for i in range(2, int(n**0.5) + 1):\n        if n % i == 0:\n            return False\n    return True\n\nprint("7 là số nguyên tố:", is_prime(7))`,
            explanation: "Hàm is_prime kiểm tra tính nguyên tố với độ phức tạp tối ưu O(căn n)."
          }
        ],
        multipleChoice: {
          question: "Đoạn code sau in ra gì:\ndef calculate(a, b=5):\n    return a * 2 + b\n\nprint(calculate(3), calculate(3, 10))",
          options: [
            "11 16",
            "11 11",
            "16 16",
            "Lỗi thiếu tham số"
          ],
          correctIndex: 0,
          explanation: "calculate(3) dùng b=5 mặc định -> 3*2 + 5 = 11. calculate(3, 10) truyền b=10 ghi đè mặc định -> 3*2 + 10 = 16."
        }
      },
      practice: {
        id: "ex-25-1",
        title: "Bài tập 6.1: Xây dựng hệ thống hàm phân loại số học",
        difficulty: "Trung bình",
        problemStatement: "Hãy xây dựng 3 hàm logic độc lập:\n1. is_prime(n): Trả về True nếu n là số nguyên tố, ngược lại False.\n2. is_perfect(n): Trả về True nếu n là số hoàn hảo (số bằng tổng các ước số thực sự của nó nhỏ hơn n, ví dụ 6 = 1 + 2 + 3), ngược lại False.\n3. is_square(n): Trả về True nếu n là số chính phương (có căn bậc hai là một số nguyên), ngược lại False.\n\nNhập vào số nguyên dương N. Áp dụng 3 hàm trên và in ra kết quả theo định dạng 3 dòng:\n- Dòng 1: 'So nguyen to: True/False'\n- Dòng 2: 'So hoan hao: True/False'\n- Dòng 3: 'So chinh phuong: True/False'",
        inputFormat: "Một số nguyên dương N.",
        outputFormat: "3 dòng định dạng đúng như mô tả.",
        constraints: "1 <= N <= 10^6",
        sampleCases: [
          {
            input: "6",
            output: "So nguyen to: False\nSo hoan hao: True\nSo chinh phuong: False",
            explanation: "6 có ước thực sự là 1, 2, 3 -> 1+2+3 = 6 (số hoàn hảo). 6 không phải số nguyên tố và không phải số chính phương."
          },
          {
            input: "9",
            output: "So nguyen to: False\nSo hoan hao: False\nSo chinh phuong: True",
            explanation: "9 = 3^2 là số chính phương."
          }
        ],
        starterCode: "def is_prime(n):\n    # Viết hàm kiểm tra số nguyên tố\n    pass\n\ndef is_perfect(n):\n    # Viết hàm kiểm tra số hoàn hảo\n    pass\n\ndef is_square(n):\n    # Viết hàm kiểm tra số chính phương\n    pass\n\nn = int(input())\nprint(f\"So nguyen to: {is_prime(n)}\")\nprint(f\"So hoan hao: {is_perfect(n)}\")\nprint(f\"So chinh phuong: {is_square(n)}\")\n",
        testCases: [
          { id: "tc-25-1-1", input: "6", expectedOutput: "So nguyen to: False\nSo hoan hao: True\nSo chinh phuong: False", isHidden: false },
          { id: "tc-25-1-2", input: "9", expectedOutput: "So nguyen to: False\nSo hoan hao: False\nSo chinh phuong: True", isHidden: false },
          { id: "tc-25-1-3", input: "28", expectedOutput: "So nguyen to: False\nSo hoan hao: True\nSo chinh phuong: False", isHidden: true },
          { id: "tc-25-1-4", input: "17", expectedOutput: "So nguyen to: True\nSo hoan hao: False\nSo chinh phuong: False", isHidden: true }
        ],
        hints: [
          "is_prime(n): n >= 2 và không chia hết cho số nào từ 2 đến sqrt(n).",
          "is_perfect(n): n > 1 và tổng các ước i từ 1 đến n//2 bằng n.",
          "is_square(n): n >= 0 và int(n**0.5)**2 == n."
        ],
        solutionExplanation: "Viết 3 hàm logic hoàn chỉnh và gọi in kết quả với n."
      },
      practices: [
        {
          id: "ex-25-1",
          title: "Bài tập 6.1: Xây dựng hệ thống hàm phân loại số học",
          difficulty: "Trung bình",
          problemStatement: "Hãy xây dựng 3 hàm logic độc lập:\n1. is_prime(n): Trả về True nếu n là số nguyên tố, ngược lại False.\n2. is_perfect(n): Trả về True nếu n là số hoàn hảo (số bằng tổng các ước số thực sự của nó nhỏ hơn n, ví dụ 6 = 1 + 2 + 3), ngược lại False.\n3. is_square(n): Trả về True nếu n là số chính phương (có căn bậc hai là một số nguyên), ngược lại False.\n\nNhập vào số nguyên dương N. Áp dụng 3 hàm trên và in ra kết quả theo định dạng 3 dòng:\n- Dòng 1: 'So nguyen to: True/False'\n- Dòng 2: 'So hoan hao: True/False'\n- Dòng 3: 'So chinh phuong: True/False'",
          inputFormat: "Một số nguyên dương N.",
          outputFormat: "3 dòng định dạng đúng như mô tả.",
          constraints: "1 <= N <= 10^6",
          sampleCases: [
            {
              input: "6",
              output: "So nguyen to: False\nSo hoan hao: True\nSo chinh phuong: False",
              explanation: "6 có ước thực sự là 1, 2, 3 -> 1+2+3 = 6 (số hoàn hảo). 6 không phải số nguyên tố và không phải số chính phương."
            },
            {
              input: "9",
              output: "So nguyen to: False\nSo hoan hao: False\nSo chinh phuong: True",
              explanation: "9 = 3^2 là số chính phương."
            }
          ],
          starterCode: "def is_prime(n):\n    # Viết hàm kiểm tra số nguyên tố\n    pass\n\ndef is_perfect(n):\n    # Viết hàm kiểm tra số hoàn hảo\n    pass\n\ndef is_square(n):\n    # Viết hàm kiểm tra số chính phương\n    pass\n\nn = int(input())\nprint(f\"So nguyen to: {is_prime(n)}\")\nprint(f\"So hoan hao: {is_perfect(n)}\")\nprint(f\"So chinh phuong: {is_square(n)}\")\n",
          testCases: [
            { id: "tc-25-1-1", input: "6", expectedOutput: "So nguyen to: False\nSo hoan hao: True\nSo chinh phuong: False", isHidden: false },
            { id: "tc-25-1-2", input: "9", expectedOutput: "So nguyen to: False\nSo hoan hao: False\nSo chinh phuong: True", isHidden: false },
            { id: "tc-25-1-3", input: "28", expectedOutput: "So nguyen to: False\nSo hoan hao: True\nSo chinh phuong: False", isHidden: true },
            { id: "tc-25-1-4", input: "17", expectedOutput: "So nguyen to: True\nSo hoan hao: False\nSo chinh phuong: False", isHidden: true }
          ],
          hints: [
            "is_prime(n): n >= 2 và không chia hết cho số nào từ 2 đến sqrt(n).",
            "is_perfect(n): n > 1 và tổng các ước i từ 1 đến n//2 bằng n.",
            "is_square(n): n >= 0 và int(n**0.5)**2 == n."
          ],
          solutionExplanation: "Viết 3 hàm logic hoàn chỉnh và gọi in kết quả với n."
        },
        {
          id: "ex-25-2",
          title: "Bài tập 6.2: Hàm tính số Fibonacci thứ N & Kiểm tra số Fibonacci",
          difficulty: "Trung bình",
          problemStatement: "Hãy viết 2 hàm chuyên biệt:\n1. fibonacci(n): Nhận vào số nguyên dương n và trả về số Fibonacci thứ n (quy ước F(1) = 1, F(2) = 1, F(3) = 2, F(4) = 3, ...).\n2. is_fibonacci_number(x): Trả về True nếu số nguyên dương x thuộc dãy Fibonacci, ngược lại False.\n\nNhập 2 số nguyên dương N (dòng 1) và X (dòng 2). In ra 2 dòng kết quả:\n- Dòng 1: 'F({N}) = {fibonacci(N)}'\n- Dòng 2: '{X} thuoc day Fibonacci: True/False'",
          inputFormat: "Dòng 1: Số nguyên dương N. Dòng 2: Số nguyên dương X.",
          outputFormat: "2 dòng theo đúng mô tả.",
          constraints: "1 <= N <= 50, 1 <= X <= 10^9",
          sampleCases: [
            {
              input: "7\n13",
              output: "F(7) = 13\n13 thuoc day Fibonacci: True",
              explanation: "Dãy Fibonacci: 1, 1, 2, 3, 5, 8, 13... F(7) = 13 và 13 thuộc dãy."
            },
            {
              input: "6\n10",
              output: "F(6) = 8\n10 thuoc day Fibonacci: False",
              explanation: "F(6) = 8. Số 10 không thuộc dãy Fibonacci."
            }
          ],
          starterCode: "def fibonacci(n):\n    # Hàm tính số Fibonacci thứ n\n    pass\n\ndef is_fibonacci_number(x):\n    # Hàm kiểm tra x có thuộc dãy Fibonacci không\n    pass\n\nn = int(input())\nx = int(input())\n\nprint(f\"F({n}) = {fibonacci(n)}\")\nprint(f\"{x} thuoc day Fibonacci: {is_fibonacci_number(x)}\")\n",
          testCases: [
            { id: "tc-25-2-1", input: "7\n13", expectedOutput: "F(7) = 13\n13 thuoc day Fibonacci: True", isHidden: false },
            { id: "tc-25-2-2", input: "6\n10", expectedOutput: "F(6) = 8\n10 thuoc day Fibonacci: False", isHidden: false },
            { id: "tc-25-2-3", input: "10\n55", expectedOutput: "F(10) = 55\n55 thuoc day Fibonacci: True", isHidden: true },
            { id: "tc-25-2-4", input: "1\n1", expectedOutput: "F(1) = 1\n1 thuoc day Fibonacci: True", isHidden: true }
          ],
          hints: [
            "Dùng vòng lặp for i in range(2, n): a, b = b, a + b để tính F(n) trong O(n).",
            "Kiểm tra thuộc dãy Fibonacci: Sinh các số Fibonacci a, b cho đến khi b >= x. Nếu b == x hoặc x == 1 thì True."
          ],
          solutionExplanation: "Hàm fibonacci(n): if n <= 2: return 1. a, b = 1, 1; for _ in range(n-2): a, b = b, a + b; return b. Hàm is_fibonacci_number(x): if x == 1: return True; a, b = 1, 1; while b < x: a, b = b, a + b; return b == x."
        },
        {
          id: "ex-25-3",
          title: "Bài tập 6.3: Hàm phân tích thừa số nguyên tố",
          difficulty: "Nâng cao",
          problemStatement: "Hãy xây dựng hàm prime_factorization(n) nhận vào một số nguyên dương n >= 2 và trả về danh sách (list) các thừa số nguyên tố của n theo thứ tự tăng dần (bao gồm cả các thừa số lặp lại).\nNhập vào số nguyên N (N >= 2). Sử dụng hàm trên để phân tích N và in ra kết quả dưới dạng chuỗi các thừa số nhân với nhau bằng dấu ' * '.\nVí dụ:\n- N = 60 -> in ra '2 * 2 * 3 * 5'\n- N = 27 -> in ra '3 * 3 * 3'\n- N = 13 -> in ra '13'",
          inputFormat: "Một số nguyên dương N (N >= 2).",
          outputFormat: "Chuỗi phân tích thừa số nguyên tố dạng 'p1 * p2 * ... * pk'.",
          constraints: "2 <= N <= 10^9",
          sampleCases: [
            {
              input: "60",
              output: "2 * 2 * 3 * 5",
              explanation: "60 = 2 * 2 * 3 * 5."
            },
            {
              input: "27",
              output: "3 * 3 * 3",
              explanation: "27 = 3 * 3 * 3."
            },
            {
              input: "13",
              output: "13",
              explanation: "13 là số nguyên tố nên phân tích ra chính nó."
            }
          ],
          starterCode: "def prime_factorization(n):\n    factors = []\n    # Phân tích thừa số nguyên tố của n\n    return factors\n\nn = int(input())\nfactors = prime_factorization(n)\nprint(\" * \".join(map(str, factors)))\n",
          testCases: [
            { id: "tc-25-3-1", input: "60", expectedOutput: "2 * 2 * 3 * 5", isHidden: false },
            { id: "tc-25-3-2", input: "27", expectedOutput: "3 * 3 * 3", isHidden: false },
            { id: "tc-25-3-3", input: "13", expectedOutput: "13", isHidden: false },
            { id: "tc-25-3-4", input: "1000", expectedOutput: "2 * 2 * 2 * 5 * 5 * 5", isHidden: true },
            { id: "tc-25-3-5", input: "84", expectedOutput: "2 * 2 * 3 * 7", isHidden: true }
          ],
          hints: [
            "Bắt đầu với d = 2. Trong khi d * d <= n: nếu n % d == 0 thì factors.append(d) và n //= d; ngược lại d += 1.",
            "Sau vòng lặp, nếu n > 1 thì factors.append(n)."
          ],
          solutionExplanation: "Dùng thuật toán chia thử: duyệt d = 2..sqrt(n). Khi n chia hết cho d, thêm d vào factors và n //= d. Nếu không chia hết, d += 1. Cuối cùng nếu n > 1 thì thêm n vào factors."
        }
      ]
    }
  ]
};
