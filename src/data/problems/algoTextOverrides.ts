import { AlgorithmProblem } from "../../types";

// Đề bài viết lại ngắn gọn (chỉ các bài dài / nhiều lỗi định dạng); các bài khác được làm sạch tự động.
export const ALGO_TEXT_OVERRIDES: Record<string, Partial<Pick<AlgorithmProblem, "problemStatement" | "inputFormat" | "outputFormat" | "constraints" | "solutionExplanation">>> = {
  "cd1-bai-6": {
    problemStatement: "Nhập chuỗi số thực `s` (ví dụ `3.5`). In 2 dòng:\n- Giá trị `float(s)`\n- Giá trị `int(float(s))` (bỏ phần thập phân)\nLưu ý: `int(\"3.5\")` gây lỗi `ValueError`, nên phải qua `float()` trước.",
    inputFormat: "1 dòng: chuỗi số thực s.",
    outputFormat: "2 dòng:\n- Dòng 1: giá trị float\n- Dòng 2: giá trị int",
    solutionExplanation: "`int(\"3.5\")` bị lỗi `ValueError`. Hãy dùng `int(float(s))`."
  },
  "vl-56": {
    problemStatement: "Máy bán hàng tự động có 3 sản phẩm:\n- Mã 1: Keo — 5000đ\n- Mã 2: Banh — 10000đ\n- Mã 3: Sua — 8000đ\nNhập **mã sản phẩm** rồi **số tiền** người mua đưa vào, in:\n- Mã không phải 1, 2, 3: `San pham khong hop le`\n- Đủ tiền: `Mua thanh cong, tien thua: <tien - gia>`\n- Thiếu tiền: `Khong du tien`",
    inputFormat: "2 dòng: mã sản phẩm, số tiền (số nguyên).",
    outputFormat: "1 dòng thông báo.",
    constraints: "1000 ≤ tiền ≤ 100000."
  },
  "prob-pri-01": {
    problemStatement: "An có `M` đồng, mua `X` quyển vở (8000đ/quyển), `Y` cây bút chì (5000đ/cây) và 1 thước kẻ (4000đ). Nhập `M`, `X`, `Y` (mỗi số một dòng) và in:\n- Dòng 1: tổng tiền phải trả\n- Dòng 2: số tiền còn lại, hoặc `KHONG DU TIEN` nếu không đủ",
    inputFormat: "3 dòng: M, X, Y (số nguyên).",
    outputFormat: "2 dòng:\n- Tổng tiền\n- Tiền còn lại hoặc KHONG DU TIEN",
    constraints: "1000 ≤ M ≤ 1000000; 0 ≤ X, Y ≤ 100."
  },
  "prob-pri-02": {
    problemStatement: "Bài toán cổ \"Vừa gà vừa chó, bó lại cho tròn\". Biết tổng số con `T` và tổng số chân `C` (gà 2 chân, chó 4 chân). Tìm số gà và số chó. Không có nghiệm hợp lệ thì in `VO NGHIEM`.",
    inputFormat: "2 dòng: T, C.",
    outputFormat: "`<số gà> <số chó>` hoặc `VO NGHIEM`",
    constraints: "1 ≤ T ≤ 10000; 1 ≤ C ≤ 50000."
  },
  "prob-pri-03": {
    problemStatement: "Dãy cách đều: `A`, `A + D`, `A + 2D`, ... (ví dụ `A = 3`, `D = 4`: 3, 7, 11, 15, ...). Nhập `A`, `D`, `N` (mỗi số một dòng) và in:\n- Dòng 1: số hạng thứ `N`\n- Dòng 2: tổng `N` số hạng đầu",
    inputFormat: "3 dòng: A, D, N.",
    outputFormat: "2 dòng:\n- Số hạng thứ N\n- Tổng N số hạng đầu",
    constraints: "1 ≤ A, D ≤ 1000; 1 ≤ N ≤ 10000."
  },
  "prob-pri-04": {
    problemStatement: "Nhập số nguyên dương `N`. In 3 dòng:\n- Số đảo ngược của `N` (bỏ các chữ số 0 ở đầu, ví dụ 120 → 21)\n- Tổng các chữ số của `N`\n- `DUNG` nếu `N` là số đối xứng (Palindrome), ngược lại `SAI`",
    inputFormat: "1 dòng: số nguyên dương N.",
    outputFormat: "3 dòng:\n- Số đảo ngược\n- Tổng các chữ số\n- DUNG hoặc SAI",
    constraints: "1 ≤ N ≤ 10⁹."
  },
  "prob-pri-05": {
    problemStatement: "Vườn hình chữ nhật dài `A` m, rộng `B` m (A, B chẵn). Cứ cách 2 m đóng một cọc rào quanh vườn (4 góc đều có cọc). In:\n- Dòng 1: diện tích vườn\n- Dòng 2: số cọc gỗ cần dùng",
    inputFormat: "2 dòng: A, B (số nguyên chẵn).",
    outputFormat: "2 dòng:\n- Diện tích\n- Số cọc",
    constraints: "2 ≤ A, B ≤ 10000, A và B chẵn."
  },
  "prob-pri-06": {
    problemStatement: "Cho xâu `S` gồm chữ hoa, chữ thường, chữ số và dấu cách. Đếm số **chữ hoa**, **chữ thường**, **chữ số** và in trên một dòng, cách nhau một dấu cách.",
    inputFormat: "1 dòng: xâu S.",
    outputFormat: "1 dòng:\n<số chữ hoa> <số chữ thường> <số chữ số>",
    constraints: "Độ dài S ≤ 1000."
  },
  "prob-pri-07": {
    problemStatement: "Số chia hết cho cả 3 và 5 (tức chia hết cho 15) gọi là **Số May Mắn**. Với số nguyên dương `N`, in:\n- Dòng 1: có bao nhiêu Số May Mắn trong đoạn từ 1 đến `N`\n- Dòng 2: tổng của chúng",
    inputFormat: "1 dòng: số nguyên dương N.",
    outputFormat: "2 dòng:\n- Số lượng\n- Tổng",
    constraints: "1 ≤ N ≤ 100000."
  },
  "prob-pri-08": {
    problemStatement: "Thỏ và Rùa chạy đua quãng đường `S` mét:\n- Rùa chạy liên tục với vận tốc `V1` (m/phút).\n- Thỏ chạy với vận tốc `V2` (m/phút), nhưng chạy được nửa đường thì ngủ `T` phút rồi mới chạy tiếp.\nIn ai về đích trước: `RUA`, `THO` hoặc `HOA` (về cùng lúc), kèm thời gian về đích của người thắng (2 chữ số thập phân).",
    inputFormat: "4 dòng: S, V1, V2, T.",
    outputFormat: "2 dòng:\n- RUA, THO hoặc HOA\n- Thời gian (định dạng {:.2f})",
    constraints: "10 ≤ S ≤ 10000 (S chẵn); 1 ≤ V1 < V2 ≤ 500."
  },
  "prob-sec-01": {
    problemStatement: "Cho hai số nguyên dương `L` và `R`. Đếm các **số nguyên tố** trong đoạn `[L, R]` và tính tổng của chúng.",
    inputFormat: "1 dòng: L R.",
    outputFormat: "2 dòng:\n- Số lượng số nguyên tố\n- Tổng của chúng",
    constraints: "1 ≤ L ≤ R ≤ 100000."
  },
  "prob-sec-02": {
    problemStatement: "Cho hai số nguyên dương `A` và `B`. In 3 dòng:\n- **UCLN**(A, B) bằng thuật toán Euclid\n- **BCNN**(A, B) = `A * B // UCLN`\n- Phân số `A / B` rút gọn, dạng `tử mẫu`",
    inputFormat: "1 dòng: A B.",
    outputFormat: "3 dòng:\n- UCLN\n- BCNN\n- Tử và mẫu của phân số tối giản",
    constraints: "1 ≤ A, B ≤ 10⁹."
  },
  "prob-sec-03": {
    problemStatement: "Dãy **Fibonacci**: `F(1) = 1`, `F(2) = 1`, `F(n) = F(n-1) + F(n-2)`. Nhập `N` và `K`, in:\n- Dòng 1: `F(N)`\n- Dòng 2: `CO` nếu `K` thuộc dãy Fibonacci, ngược lại `KHONG`",
    inputFormat: "2 dòng: N, K.",
    outputFormat: "2 dòng:\n- F(N)\n- CO hoặc KHONG",
    constraints: "1 ≤ N ≤ 50; 1 ≤ K ≤ 10⁹."
  },
  "prob-sec-04": {
    problemStatement: "Đếm số chữ số **0 tận cùng** của `N!`. Mỗi chữ số 0 sinh ra từ một cặp thừa số `2 × 5`, mà thừa số 2 luôn nhiều hơn thừa số 5, nên chỉ cần đếm số thừa số 5: `N//5 + N//25 + N//125 + ...`",
    inputFormat: "1 dòng: số nguyên dương N.",
    outputFormat: "1 số nguyên: số chữ số 0 tận cùng.",
    constraints: "1 ≤ N ≤ 10⁹."
  },
  "prob-sec-05": {
    problemStatement: "Cho dãy `N` số nguyên và số `K`. Đếm các cặp chỉ số `(i, j)` với `i < j` sao cho `A[i] + A[j] = K`.\nVí dụ: `A = [1, 5, 7, -1, 5]`, `K = 6` → 3 cặp.",
    inputFormat: "Dòng 1: N K. Dòng 2: N số nguyên.",
    outputFormat: "1 số nguyên: số cặp thỏa mãn.",
    constraints: "2 ≤ N ≤ 100000; |K|, |A[i]| ≤ 10⁹."
  },
  "prob-sec-06": {
    problemStatement: "Chuẩn hóa xâu `S`: chỉ giữ **chữ cái và chữ số**, đổi hết về chữ thường. Sau đó kiểm tra xâu có **đối xứng** (Palindrome) không.\nVí dụ: `A man, a plan, a canal: Panama` → `amanaplanacanalpanama` → `YES`.",
    inputFormat: "1 dòng: xâu S.",
    outputFormat: "2 dòng:\n- Xâu đã chuẩn hóa\n- YES hoặc NO",
    constraints: "Độ dài S ≤ 10000."
  },
  "prob-sec-07": {
    problemStatement: "**Nén RLE**: thay mỗi dãy ký tự giống nhau liên tiếp bằng *số lần lặp* + *ký tự*. Ví dụ `AAABBBCCCCD` → `3A3B4C1D`. Nén xâu `S` gồm chữ in hoa.",
    inputFormat: "1 dòng: xâu S.",
    outputFormat: "1 dòng: xâu đã nén.",
    constraints: "1 ≤ độ dài S ≤ 100000."
  },
  "prob-sec-08": {
    problemStatement: "**Số hoàn hảo** là số bằng tổng các ước nhỏ hơn nó (ví dụ `6 = 1 + 2 + 3`, `28 = 1 + 2 + 4 + 7 + 14`). Liệt kê các số hoàn hảo `≤ N` theo thứ tự tăng dần; không có thì in `KHONG CO`.",
    inputFormat: "1 dòng: số nguyên dương N.",
    outputFormat: "Các số hoàn hảo cách nhau dấu cách, hoặc KHONG CO.",
    constraints: "1 ≤ N ≤ 10000."
  },
  "prob-sec-09": {
    problemStatement: "Cho dãy `N` số nguyên (chỉ số từ 1) và `Q` truy vấn `L R`. Với mỗi truy vấn in `A[L] + ... + A[R]`.\nDùng **mảng cộng dồn**: `pref[i] = pref[i-1] + A[i]`, khi đó tổng đoạn = `pref[R] - pref[L-1]` (O(1) mỗi truy vấn).",
    inputFormat: "Dòng 1: N Q. Dòng 2: N số nguyên. Q dòng tiếp: L R.",
    outputFormat: "Q dòng, mỗi dòng là tổng đoạn tương ứng.",
    constraints: "1 ≤ N, Q ≤ 100000; |A[i]| ≤ 10⁶."
  },
  "prob-sec-10": {
    problemStatement: "Có các đồng xu mệnh giá `500, 200, 100, 50, 20, 10, 5, 2, 1` (không giới hạn số lượng). Rút số tiền `S` bằng **ít đồng xu nhất** (tham lam: lấy mệnh giá lớn trước). In tổng số xu, rồi mỗi dòng `mệnh giá : số lượng` (chỉ mệnh giá có dùng, giảm dần).",
    inputFormat: "1 dòng: số nguyên dương S.",
    outputFormat: "- Dòng 1: tổng số xu\n- Các dòng sau: `<mệnh giá> : <số lượng>`",
    constraints: "1 ≤ S ≤ 10⁹."
  },
};
