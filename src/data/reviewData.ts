import type { TestCase } from "../types";
export type ReviewExercise = { id: string; title: string; prompt: string } & (
  { kind: "answer"; snippet: string; answers: string[]; explanation: string } |
  { kind: "code"; inputFormat: string; outputFormat: string; starterCode: string; tests: TestCase[] }
);
export interface ReviewSection { id: string; title: string; description: string; knowledge: string[]; exercises: ReviewExercise[]; }
// Versioned independently: review never becomes a curriculum lesson or algorithm problem.
export const REVIEW_VERSION = 1;
export const REVIEW_SECTIONS: ReviewSection[] = [
  {
    "id": "review-1",
    "title": "Ôn tập 1",
    "description": "Cơ bản, biểu thức và rẽ nhánh; vận dụng để ra quyết định.",
    "knowledge": [
      "input() trả về chuỗi; dùng int() hoặc float() để chuyển kiểu khi tính toán.",
      "// là chia lấy nguyên, % là phần dư. Muốn làm tròn lên a/b với số nguyên dương: (a + b - 1) // b.",
      "if / elif / else chỉ chọn nhánh đúng đầu tiên; điều kiện ưu tiên cần đặt trước.",
      "and cần cả hai điều kiện đúng; or chỉ cần một điều kiện đúng. In đúng định dạng đề yêu cầu."
    ],
    "exercises": [
      {
        "id": "review-1-q1",
        "kind": "answer",
        "title": "Mã thẻ triển lãm",
        "prompt": "Nhập chính xác dòng được in ra, không thêm dấu nháy.",
        "snippet": "ma = \"08\"\nluot = 3\nprint(ma + str(luot + 2))",
        "answers": [
          "085"
        ],
        "explanation": "luot + 2 bằng 5; ghép chuỗi \"08\" với \"5\" giữ nguyên số 0 ở đầu."
      },
      {
        "id": "review-1-q2",
        "kind": "answer",
        "title": "Chia khay mẫu",
        "prompt": "Đoạn mã in ra hai số nào trên cùng một dòng?",
        "snippet": "mau = 29\nsuc_chua = 6\nprint(mau // suc_chua, mau % suc_chua)",
        "answers": [
          "4 5"
        ],
        "explanation": "Có 4 khay đủ 6 mẫu và còn dư 5 mẫu."
      },
      {
        "id": "review-1-q3",
        "kind": "answer",
        "title": "Nhánh ưu tiên an toàn",
        "prompt": "Điền đúng nội dung được in.",
        "snippet": "nhiet = 47\npin = 12\nif nhiet >= 45:\n    print(\"LAM_MAT\")\nelif pin < 25:\n    print(\"SAC\")\nelse:\n    print(\"SAN_SANG\")",
        "answers": [
          "LAM_MAT"
        ],
        "explanation": "Nhánh nhiệt độ đúng trước, nên elif không được xét dù pin thấp."
      },
      {
        "id": "review-1-q4",
        "kind": "answer",
        "title": "Điều kiện nhận mẫu",
        "prompt": "Đoạn mã in ra giá trị Boolean nào?",
        "snippet": "tuoi_mau = 4\nniem_phong = False\nprint(tuoi_mau <= 3 or (niem_phong and tuoi_mau <= 7))",
        "answers": [
          "False"
        ],
        "explanation": "4 <= 3 sai; nhánh còn lại cũng sai vì niem_phong là False."
      },
      {
        "id": "review-1-c1",
        "kind": "code",
        "title": "Phân bổ nhãn chống ẩm",
        "prompt": "Có n hộp mẫu, mỗi hộp cần k nhãn chống ẩm và kho có m nhãn. Ưu tiên dán đủ một hộp rồi mới sang hộp khác. Tính số hộp có thể dán đủ (không vượt n) và số nhãn còn thiếu để dán đủ toàn bộ n hộp.",
        "inputFormat": "Một dòng gồm n k m; 1 ≤ n, k ≤ 1000; 0 ≤ m ≤ 1000000.",
        "outputFormat": "Hai số: số hộp dán đủ và số nhãn còn thiếu.",
        "starterCode": "# Đọc dữ liệu, xử lý và in kết quả theo yêu cầu.\n",
        "tests": [
          {
            "id": "review-1-c1-t1",
            "input": "7 4 18",
            "expectedOutput": "4 10",
            "isHidden": false
          },
          {
            "id": "review-1-c1-t2",
            "input": "3 5 30",
            "expectedOutput": "3 0",
            "isHidden": false
          },
          {
            "id": "review-1-c1-t3",
            "input": "1 1 0",
            "expectedOutput": "0 1",
            "isHidden": true
          },
          {
            "id": "review-1-c1-t4",
            "input": "10 3 29",
            "expectedOutput": "9 1",
            "isHidden": true
          },
          {
            "id": "review-1-c1-t5",
            "input": "1000 1000 1000000",
            "expectedOutput": "1000 0",
            "isHidden": true
          },
          {
            "id": "review-1-c1-t6",
            "input": "1 8 7",
            "expectedOutput": "0 1",
            "isHidden": true
          }
        ]
      },
      {
        "id": "review-1-c2",
        "kind": "code",
        "title": "Trạm nghỉ của xe khảo sát",
        "prompt": "Trạm xét nhiệt độ trước: từ 45 độ trở lên in LAM_MAT. Nếu chưa cần làm mát mà pin dưới 25% thì in SAC. Các trường hợp khác in SAN_SANG. Khi cả hai điều kiện xảy ra, làm mát được ưu tiên.",
        "inputFormat": "Một dòng gồm nhiệt độ nguyên t và phần trăm pin b; -20 ≤ t ≤ 80, 0 ≤ b ≤ 100.",
        "outputFormat": "Một trong ba chuỗi LAM_MAT, SAC, SAN_SANG.",
        "starterCode": "# Đọc dữ liệu, xử lý và in kết quả theo yêu cầu.\n",
        "tests": [
          {
            "id": "review-1-c2-t1",
            "input": "46 10",
            "expectedOutput": "LAM_MAT",
            "isHidden": false
          },
          {
            "id": "review-1-c2-t2",
            "input": "20 10",
            "expectedOutput": "SAC",
            "isHidden": false
          },
          {
            "id": "review-1-c2-t3",
            "input": "45 100",
            "expectedOutput": "LAM_MAT",
            "isHidden": true
          },
          {
            "id": "review-1-c2-t4",
            "input": "44 25",
            "expectedOutput": "SAN_SANG",
            "isHidden": true
          },
          {
            "id": "review-1-c2-t5",
            "input": "-20 0",
            "expectedOutput": "SAC",
            "isHidden": true
          },
          {
            "id": "review-1-c2-t6",
            "input": "80 0",
            "expectedOutput": "LAM_MAT",
            "isHidden": true
          },
          {
            "id": "review-1-c2-t7",
            "input": "44 24",
            "expectedOutput": "SAC",
            "isHidden": true
          }
        ]
      },
      {
        "id": "review-1-c3",
        "kind": "code",
        "title": "Chọn gói bọc mẫu",
        "prompt": "Cần bọc n ống mẫu. Gói A bọc tối đa 4 ống và có giá a; gói B bọc tối đa 6 ống và có giá b. Chỉ được mua toàn gói A hoặc toàn gói B, được dư chỗ. Chọn phương án tổng giá thấp hơn; nếu bằng nhau ghi BANG.",
        "inputFormat": "Một dòng n a b; 1 ≤ n, a, b ≤ 10000.",
        "outputFormat": "In tên A, B hoặc BANG và tổng giá của phương án rẻ nhất, cách nhau bởi một dấu cách.",
        "starterCode": "# Đọc dữ liệu, xử lý và in kết quả theo yêu cầu.\n",
        "tests": [
          {
            "id": "review-1-c3-t1",
            "input": "7 5 9",
            "expectedOutput": "A 10",
            "isHidden": false
          },
          {
            "id": "review-1-c3-t2",
            "input": "13 8 10",
            "expectedOutput": "B 30",
            "isHidden": false
          },
          {
            "id": "review-1-c3-t3",
            "input": "1 4 4",
            "expectedOutput": "BANG 4",
            "isHidden": true
          },
          {
            "id": "review-1-c3-t4",
            "input": "12 5 8",
            "expectedOutput": "A 15",
            "isHidden": true
          },
          {
            "id": "review-1-c3-t5",
            "input": "24 10 15",
            "expectedOutput": "BANG 60",
            "isHidden": true
          },
          {
            "id": "review-1-c3-t6",
            "input": "10000 1 10000",
            "expectedOutput": "A 2500",
            "isHidden": true
          }
        ]
      },
      {
        "id": "review-1-c4",
        "kind": "code",
        "title": "Mốc hoàn tất phục hồi thiết bị",
        "prompt": "Thiết bị bắt đầu chạy vào giờ h của ngày 0 và cần d giờ liên tục để phục hồi. Không có thời gian nghỉ. Tính thiết bị hoàn tất vào ngày thứ mấy kể từ ngày 0 và lúc mấy giờ trong ngày đó.",
        "inputFormat": "Một dòng h d; 0 ≤ h ≤ 23; 0 ≤ d ≤ 200.",
        "outputFormat": "Hai số: chỉ số ngày hoàn tất và giờ hoàn tất (0 đến 23).",
        "starterCode": "# Đọc dữ liệu, xử lý và in kết quả theo yêu cầu.\n",
        "tests": [
          {
            "id": "review-1-c4-t1",
            "input": "21 8",
            "expectedOutput": "1 5",
            "isHidden": false
          },
          {
            "id": "review-1-c4-t2",
            "input": "8 3",
            "expectedOutput": "0 11",
            "isHidden": false
          },
          {
            "id": "review-1-c4-t3",
            "input": "0 0",
            "expectedOutput": "0 0",
            "isHidden": true
          },
          {
            "id": "review-1-c4-t4",
            "input": "23 1",
            "expectedOutput": "1 0",
            "isHidden": true
          },
          {
            "id": "review-1-c4-t5",
            "input": "0 200",
            "expectedOutput": "8 8",
            "isHidden": true
          },
          {
            "id": "review-1-c4-t6",
            "input": "17 79",
            "expectedOutput": "4 0",
            "isHidden": true
          }
        ]
      }
    ]
  },
  {
    "id": "review-2",
    "title": "Ôn tập 2",
    "description": "Vòng lặp for, while, vòng lặp lồng nhau và bài toán ứng dụng.",
    "knowledge": [
      "range(a, b) lấy a nhưng không lấy b; range(a, b, step) dùng bước nhảy step.",
      "for dùng để duyệt số lần hoặc tập giá trị đã biết. while lặp khi điều kiện còn đúng.",
      "Biến tích lũy, bộ đếm và biến trạng thái phải được khởi tạo trước vòng lặp và cập nhật đúng lúc.",
      "Vòng lặp lồng nhau xử lý từng hàng/cột. Với while, luôn bảo đảm điều kiện sẽ có thể kết thúc."
    ],
    "exercises": [
      {
        "id": "review-2-q1",
        "kind": "answer",
        "title": "Lượt quét bị bỏ qua",
        "prompt": "Điền số được in sau khi bỏ các lượt chia hết cho 3.",
        "snippet": "tong = 0\nfor luot in range(2, 10, 2):\n    if luot % 3 != 0:\n        tong += luot\nprint(tong)",
        "answers": [
          "14"
        ],
        "explanation": "Các lượt 2, 4, 6, 8; bỏ 6 nên tổng là 14."
      },
      {
        "id": "review-2-q2",
        "kind": "answer",
        "title": "Hộp dự trữ giảm dần",
        "prompt": "Điền số lượt lặp.",
        "snippet": "con = 23\nluot = 0\nwhile con > 5:\n    con -= 6\n    luot += 1\nprint(luot)",
        "answers": [
          "3"
        ],
        "explanation": "con lần lượt là 17, 11, 5. Khi bằng 5 thì dừng."
      },
      {
        "id": "review-2-q3",
        "kind": "answer",
        "title": "Vị trí đánh dấu",
        "prompt": "Điền số vị trí thỏa điều kiện.",
        "snippet": "dem = 0\nfor hang in range(1, 4):\n    for cot in range(1, 5):\n        if hang + cot == 5:\n            dem += 1\nprint(dem)",
        "answers": [
          "3"
        ],
        "explanation": "Các vị trí là (1,4), (2,3), (3,2)."
      },
      {
        "id": "review-2-q4",
        "kind": "answer",
        "title": "Bộ tích lũy đặt sai chỗ",
        "prompt": "Điền kết quả thực tế, không phải tổng mong muốn.",
        "snippet": "for x in range(1, 5):\n    tong = 0\n    tong += x\nprint(tong)",
        "answers": [
          "4"
        ],
        "explanation": "tong bị đặt lại thành 0 ở mỗi lượt, nên cuối cùng chỉ giữ 4."
      },
      {
        "id": "review-2-c1",
        "kind": "code",
        "title": "Đợt khô trong vườn thực nghiệm",
        "prompt": "Theo dõi n lần đo độ ẩm. Một lần đo là khô khi giá trị nhỏ hơn ngưỡng h. Một đợt khô là dãy lần đo khô liên tiếp dài nhất có thể (bị ngắt bởi giá trị từ h trở lên). Tính số đợt khô và độ dài đợt khô dài nhất. Không có lần đo khô thì cả hai bằng 0.",
        "inputFormat": "Dòng đầu n h (1 ≤ n ≤ 200, 0 ≤ h ≤ 100). Tiếp theo n dòng, mỗi dòng một độ ẩm nguyên từ 0 đến 100.",
        "outputFormat": "Hai số: số đợt khô và độ dài đợt dài nhất.",
        "starterCode": "# Đọc dữ liệu, xử lý và in kết quả theo yêu cầu.\n",
        "tests": [
          {
            "id": "review-2-c1-t1",
            "input": "7 40\n20\n30\n40\n10\n10\n10\n70",
            "expectedOutput": "2 3",
            "isHidden": false
          },
          {
            "id": "review-2-c1-t2",
            "input": "3 25\n25\n30\n40",
            "expectedOutput": "0 0",
            "isHidden": false
          },
          {
            "id": "review-2-c1-t3",
            "input": "1 100\n99",
            "expectedOutput": "1 1",
            "isHidden": true
          },
          {
            "id": "review-2-c1-t4",
            "input": "4 50\n0\n0\n0\n0",
            "expectedOutput": "1 4",
            "isHidden": true
          },
          {
            "id": "review-2-c1-t5",
            "input": "5 30\n10\n30\n10\n30\n10",
            "expectedOutput": "3 1",
            "isHidden": true
          },
          {
            "id": "review-2-c1-t6",
            "input": "2 0\n0\n100",
            "expectedOutput": "0 0",
            "isHidden": true
          }
        ]
      },
      {
        "id": "review-2-c2",
        "kind": "code",
        "title": "Tiến độ lắp bảng trưng bày",
        "prompt": "Cần lắp n ô đèn. Tổ làm được tối đa k ô trong một ngày làm việc. Các ngày đánh số từ 1; mỗi ngày có số thứ tự chia hết cho 3 dùng để kiểm tra an toàn nên không lắp ô nào. Hỏi ngày sớm nhất lắp đủ. Nếu n = 0, kết quả là 0.",
        "inputFormat": "Một dòng n k; 0 ≤ n ≤ 10000; 1 ≤ k ≤ 100.",
        "outputFormat": "Số thứ tự ngày hoàn tất.",
        "starterCode": "# Đọc dữ liệu, xử lý và in kết quả theo yêu cầu.\n",
        "tests": [
          {
            "id": "review-2-c2-t1",
            "input": "5 2",
            "expectedOutput": "4",
            "isHidden": false
          },
          {
            "id": "review-2-c2-t2",
            "input": "0 3",
            "expectedOutput": "0",
            "isHidden": false
          },
          {
            "id": "review-2-c2-t3",
            "input": "4 2",
            "expectedOutput": "2",
            "isHidden": true
          },
          {
            "id": "review-2-c2-t4",
            "input": "6 2",
            "expectedOutput": "4",
            "isHidden": true
          },
          {
            "id": "review-2-c2-t5",
            "input": "1 100",
            "expectedOutput": "1",
            "isHidden": true
          },
          {
            "id": "review-2-c2-t6",
            "input": "10 1",
            "expectedOutput": "14",
            "isHidden": true
          }
        ]
      },
      {
        "id": "review-2-c3",
        "kind": "code",
        "title": "Phiên cấp nước cho mô hình",
        "prompt": "Bồn có sức chứa c và ban đầu rỗng. Xử lý n lệnh theo đúng thứ tự, mỗi lệnh là số nguyên x: x dương thêm nước, x âm rút nước. Chỉ thực hiện toàn bộ lệnh khi mức nước mới nằm trong [0,c]; nếu không thì bỏ toàn bộ lệnh. Lệnh 0 luôn được chấp nhận.",
        "inputFormat": "Dòng đầu c n; 1 ≤ c ≤ 1000, 1 ≤ n ≤ 200. Tiếp theo n dòng, mỗi dòng một số x với -1000 ≤ x ≤ 1000.",
        "outputFormat": "Mức nước cuối cùng và số lệnh được chấp nhận.",
        "starterCode": "# Đọc dữ liệu, xử lý và in kết quả theo yêu cầu.\n",
        "tests": [
          {
            "id": "review-2-c3-t1",
            "input": "10 5\n7\n5\n-3\n-8\n6",
            "expectedOutput": "10 3",
            "isHidden": false
          },
          {
            "id": "review-2-c3-t2",
            "input": "5 3\n0\n5\n-5",
            "expectedOutput": "0 3",
            "isHidden": false
          },
          {
            "id": "review-2-c3-t3",
            "input": "1 2\n-1\n2",
            "expectedOutput": "0 0",
            "isHidden": true
          },
          {
            "id": "review-2-c3-t4",
            "input": "10 4\n10\n0\n1\n-10",
            "expectedOutput": "0 3",
            "isHidden": true
          },
          {
            "id": "review-2-c3-t5",
            "input": "3 4\n1\n1\n1\n-2",
            "expectedOutput": "1 4",
            "isHidden": true
          },
          {
            "id": "review-2-c3-t6",
            "input": "1000 1\n1000",
            "expectedOutput": "1000 1",
            "isHidden": true
          }
        ]
      },
      {
        "id": "review-2-c4",
        "kind": "code",
        "title": "Bản đồ ngăn trưng bày",
        "prompt": "Vẽ bảng h hàng w cột, hàng/cột đánh số từ 1. Một ô in # nếu nằm ở viền ngoài hoặc tổng chỉ số hàng và cột chia hết cho 3. Các ô còn lại in dấu chấm. Không chèn khoảng trắng giữa các ký tự.",
        "inputFormat": "Một dòng h w; 1 ≤ h,w ≤ 20.",
        "outputFormat": "h dòng, mỗi dòng đúng w ký tự # hoặc dấu chấm.",
        "starterCode": "# Đọc dữ liệu, xử lý và in kết quả theo yêu cầu.\n",
        "tests": [
          {
            "id": "review-2-c4-t1",
            "input": "4 5",
            "expectedOutput": "#####\n#..##\n#.#.#\n#####",
            "isHidden": false
          },
          {
            "id": "review-2-c4-t2",
            "input": "3 3",
            "expectedOutput": "###\n#.#\n###",
            "isHidden": false
          },
          {
            "id": "review-2-c4-t3",
            "input": "1 6",
            "expectedOutput": "######",
            "isHidden": true
          },
          {
            "id": "review-2-c4-t4",
            "input": "6 1",
            "expectedOutput": "#\n#\n#\n#\n#\n#",
            "isHidden": true
          },
          {
            "id": "review-2-c4-t5",
            "input": "2 2",
            "expectedOutput": "##\n##",
            "isHidden": true
          },
          {
            "id": "review-2-c4-t6",
            "input": "5 7",
            "expectedOutput": "#######\n#..#..#\n#.#..##\n##..#.#\n#######",
            "isHidden": true
          }
        ]
      }
    ]
  },
  {
    "id": "review-3",
    "title": "Ôn tập 3",
    "description": "Danh sách, chuỗi, dictionary và xử lý dữ liệu kết hợp.",
    "knowledge": [
      "List có thứ tự, chỉ số bắt đầu từ 0. append thêm cuối; pop bỏ phần tử cuối khi danh sách không rỗng.",
      "Chuỗi không thay đổi trực tiếp từng ký tự được; có thể tạo chuỗi mới hoặc dùng list ký tự rồi join.",
      "Dictionary ánh xạ key sang value. Gán lại cùng key sẽ thay giá trị cũ; get(key, mặc_định) giúp tra key chưa có.",
      "Chuẩn hóa hoa/thường khi đề yêu cầu. Khi có nhiều đáp án ngang nhau, đọc kỹ quy tắc phá hòa và thứ tự xuất."
    ],
    "exercises": [
      {
        "id": "review-3-q1",
        "kind": "answer",
        "title": "Hai sổ dùng chung",
        "prompt": "Điền ba số được in, cách nhau bởi dấu cách.",
        "snippet": "a = [4, 8, 2]\nb = a\nb[1] = 6\nprint(*a)",
        "answers": [
          "4 6 2"
        ],
        "explanation": "b và a cùng trỏ tới một list; thay b[1] cũng thay a[1]."
      },
      {
        "id": "review-3-q2",
        "kind": "answer",
        "title": "Đọc mã theo bước nhảy",
        "prompt": "Điền chuỗi được in.",
        "snippet": "ma = \"K7M2P9R4\"\nprint(ma[1::2])",
        "answers": [
          "7294"
        ],
        "explanation": "Bắt đầu ở chỉ số 1 và lấy cách 2 vị trí: 7, 2, 9, 4."
      },
      {
        "id": "review-3-q3",
        "kind": "answer",
        "title": "Ghi đè lựa chọn",
        "prompt": "Điền số được in.",
        "snippet": "chon = {\"ban1\": \"son\", \"ban2\": \"giay\"}\nchon[\"ban1\"] = \"keo\"\nprint(len(chon))",
        "answers": [
          "2"
        ],
        "explanation": "Cập nhật key ban1 chỉ thay value, không tạo key mới."
      },
      {
        "id": "review-3-q4",
        "kind": "answer",
        "title": "Tra vật tư chưa có",
        "prompt": "Điền hai số được in.",
        "snippet": "kho = {\"kep\": 2}\nx = kho.get(\"day\", 0)\nkho[\"kep\"] += 3\nprint(x, kho[\"kep\"])",
        "answers": [
          "0 5"
        ],
        "explanation": "Key day chưa có nên get trả 0; số kẹp tăng từ 2 lên 5."
      },
      {
        "id": "review-3-c1",
        "kind": "code",
        "title": "Sổ thay pin cảm biến",
        "prompt": "Cho danh sách n mức pin đo theo thời gian. Với mỗi cặp kề nhau, nếu mức sau lớn hơn mức trước thì cộng phần tăng vào tổng nạp; nếu thấp hơn thì đếm một lần giảm. Các cặp bằng nhau không làm thay đổi hai đại lượng.",
        "inputFormat": "Dòng đầu n (1 ≤ n ≤ 200). Dòng thứ hai có n số nguyên từ 0 đến 100.",
        "outputFormat": "Tổng phần tăng và số lần giảm.",
        "starterCode": "# Đọc dữ liệu, xử lý và in kết quả theo yêu cầu.\n",
        "tests": [
          {
            "id": "review-3-c1-t1",
            "input": "6\n20 50 40 40 80 10",
            "expectedOutput": "70 2",
            "isHidden": false
          },
          {
            "id": "review-3-c1-t2",
            "input": "1\n90",
            "expectedOutput": "0 0",
            "isHidden": false
          },
          {
            "id": "review-3-c1-t3",
            "input": "4\n5 5 5 5",
            "expectedOutput": "0 0",
            "isHidden": true
          },
          {
            "id": "review-3-c1-t4",
            "input": "5\n90 70 50 30 10",
            "expectedOutput": "0 4",
            "isHidden": true
          },
          {
            "id": "review-3-c1-t5",
            "input": "4\n0 25 50 100",
            "expectedOutput": "100 0",
            "isHidden": true
          },
          {
            "id": "review-3-c1-t6",
            "input": "6\n0 100 0 100 0 100",
            "expectedOutput": "300 2",
            "isHidden": true
          }
        ]
      },
      {
        "id": "review-3-c2",
        "kind": "code",
        "title": "Gỡ nhãn lỗi trong bản in",
        "prompt": "Chuỗi bản in chỉ chứa chữ thường a-z và dấu #. Đọc từ trái sang phải: chữ thường được thêm vào kết quả; mỗi # xóa chữ cuối của kết quả hiện tại nếu có, nếu kết quả đang rỗng thì bỏ qua #. In phần nhãn còn lại, hoặc EMPTY nếu rỗng.",
        "inputFormat": "Một dòng s dài từ 1 đến 2000 ký tự, chỉ gồm a-z và #.",
        "outputFormat": "Chuỗi nhãn cuối hoặc EMPTY.",
        "starterCode": "# Đọc dữ liệu, xử lý và in kết quả theo yêu cầu.\n",
        "tests": [
          {
            "id": "review-3-c2-t1",
            "input": "ab#cd##e",
            "expectedOutput": "ae",
            "isHidden": false
          },
          {
            "id": "review-3-c2-t2",
            "input": "###abc",
            "expectedOutput": "abc",
            "isHidden": false
          },
          {
            "id": "review-3-c2-t3",
            "input": "a#",
            "expectedOutput": "EMPTY",
            "isHidden": true
          },
          {
            "id": "review-3-c2-t4",
            "input": "####",
            "expectedOutput": "EMPTY",
            "isHidden": true
          },
          {
            "id": "review-3-c2-t5",
            "input": "abc",
            "expectedOutput": "abc",
            "isHidden": true
          },
          {
            "id": "review-3-c2-t6",
            "input": "ab###c##d",
            "expectedOutput": "d",
            "isHidden": true
          }
        ]
      },
      {
        "id": "review-3-c3",
        "kind": "code",
        "title": "Sổ vật tư của góc sáng tạo",
        "prompt": "Mỗi loại vật tư ban đầu có số lượng 0. Có n phiếu: tên vật tư và lượng thay đổi d. Chỉ chấp nhận phiếu nếu số lượng loại đó sau thay đổi không âm; nếu âm, bỏ phiếu và tăng số phiếu bị từ chối. Sau cùng tra số lượng của loại q; loại chưa xuất hiện có số lượng 0.",
        "inputFormat": "Dòng đầu n (1 ≤ n ≤ 200). n dòng tiếp: tên chỉ gồm a-z không có khoảng trắng và số d (-1000 ≤ d ≤ 1000). Dòng cuối là tên q.",
        "outputFormat": "Số lượng cuối của q và tổng số phiếu bị từ chối.",
        "starterCode": "# Đọc dữ liệu, xử lý và in kết quả theo yêu cầu.\n",
        "tests": [
          {
            "id": "review-3-c3-t1",
            "input": "5\nkep 5\nday 3\nkep -2\nday -7\nkep 1\nkep",
            "expectedOutput": "4 1",
            "isHidden": false
          },
          {
            "id": "review-3-c3-t2",
            "input": "1\nkeo -1\nkeo",
            "expectedOutput": "0 1",
            "isHidden": false
          },
          {
            "id": "review-3-c3-t3",
            "input": "2\nson 0\nson 4\ngiay",
            "expectedOutput": "0 0",
            "isHidden": true
          },
          {
            "id": "review-3-c3-t4",
            "input": "3\nkeo 3\nkeo -3\nkeo -1\nkeo",
            "expectedOutput": "0 1",
            "isHidden": true
          },
          {
            "id": "review-3-c3-t5",
            "input": "3\na 2\nb -2\na -4\na",
            "expectedOutput": "2 2",
            "isHidden": true
          },
          {
            "id": "review-3-c3-t6",
            "input": "1\na 1000\na",
            "expectedOutput": "1000 0",
            "isHidden": true
          }
        ]
      },
      {
        "id": "review-3-c4",
        "kind": "code",
        "title": "Thẻ bình chọn sản phẩm xưởng",
        "prompt": "Có n lần quét thẻ, mỗi lần ghi mã người và mã sản phẩm đều viết thường, không có khoảng trắng. Một người có thể quét nhiều lần; chỉ lựa chọn cuối cùng của người đó được tính. Tìm sản phẩm được nhiều người chọn nhất; hòa thì chọn mã nhỏ nhất theo thứ tự từ điển.",
        "inputFormat": "Dòng đầu n (1 ≤ n ≤ 200). n dòng tiếp, mỗi dòng gồm mã người và mã sản phẩm (a-z, dài 1 đến 20).",
        "outputFormat": "Ba giá trị cách nhau bởi khoảng trắng: số người khác nhau, mã sản phẩm thắng và số phiếu hợp lệ của sản phẩm đó.",
        "starterCode": "# Đọc dữ liệu, xử lý và in kết quả theo yêu cầu.\n",
        "tests": [
          {
            "id": "review-3-c4-t1",
            "input": "5\nan den\nbinh quat\nan quat\nchi den\ndung quat",
            "expectedOutput": "4 quat 3",
            "isHidden": false
          },
          {
            "id": "review-3-c4-t2",
            "input": "2\na tre\nb giay",
            "expectedOutput": "2 giay 1",
            "isHidden": false
          },
          {
            "id": "review-3-c4-t3",
            "input": "1\na den",
            "expectedOutput": "1 den 1",
            "isHidden": true
          },
          {
            "id": "review-3-c4-t4",
            "input": "3\na tre\na den\na giay",
            "expectedOutput": "1 giay 1",
            "isHidden": true
          },
          {
            "id": "review-3-c4-t5",
            "input": "4\na son\nb son\nc kep\nd kep",
            "expectedOutput": "4 kep 2",
            "isHidden": true
          },
          {
            "id": "review-3-c4-t6",
            "input": "5\na z\nb z\nc a\na a\nb a",
            "expectedOutput": "3 a 3",
            "isHidden": true
          }
        ]
      }
    ]
  }
];
