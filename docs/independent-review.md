# Ôn tập độc lập

Mở **Ôn tập** từ thanh điều hướng trên máy tính hoặc điện thoại. Học sinh, giáo viên và admin đều mở được cả 3 phần ngay, kể cả khi chưa hoàn thành bài học nào.

- **Ôn tập 1:** chuyển kiểu, phép toán, điều kiện, ưu tiên nhánh; phân bổ nhãn chống ẩm, trạm nghỉ xe khảo sát, chọn gói bọc mẫu và mốc phục hồi thiết bị.
- **Ôn tập 2:** for, while, vòng lặp lồng nhau; đợt khô cảm biến, lịch lắp bảng trưng bày, xử lý lệnh cấp nước và vẽ bản đồ ngăn trưng bày.
- **Ôn tập 3:** list, string, dictionary; biến động pin, xử lý nhãn lỗi, phiếu vật tư và bình chọn theo lựa chọn cuối của từng người.

Mỗi phần có 4 câu đọc hiểu mã (nhập kết quả, chấm đúng/sai) và 4 bài lập trình ứng dụng. Có tóm tắt kiến thức. Đề, tình huống và mã câu hỏi được soạn riêng; không lấy lại câu hỏi hay bài tập từ khóa học/giải đề. Bài lập trình có 2 test ví dụ công khai và ít nhất 4 test ẩn, gồm trường hợp biên. Tổng cộng 24 bài, 73 test lập trình.

Trình chấm dùng Python thật (Pyodide 0.26.2) trong Web Worker riêng, không dùng bộ mô phỏng. Có CDN dự phòng, giới hạn tải 60 giây, giới hạn chạy 15 giây và nút dừng. Mỗi lần nộp tạo worker mới; biến được tách giữa các test. Vượt thời gian chạy ghi 0/100; lỗi tải Python hoặc chủ động dừng giữ nguyên kết quả cũ. Lỗi cú pháp/chạy và đầu ra sai được tính test không đạt. Không gửi mã của học sinh tới máy chủ. Test ẩn chỉ hiển thị đạt/chưa đạt.

Mỗi bài được chấm trên thang 100 theo số test đạt. Điểm phần là trung bình của 8 bài, lấy **lần chấm gần nhất**, bài chưa làm tính 0. Sửa bài sau lần chấm sẽ có nhắc nộp lại. Không cộng/trừ XP, không hoàn thành bài học, không mở/khóa lộ trình và không thay đổi thống kê lớp của khóa học.

Bài nháp và tối đa 10 lần chấm/bài được lưu riêng theo tài khoản và phiên bản đề trong localStorage (`pyedu_review_v1:<userId>`). Hiện chưa đồng bộ kết quả ôn tập lên server; không hiển thị trong lịch sử lớp. Giao diện ghi rõ giới hạn này. Học sinh dùng **Xuất kết quả CSV** để gửi giáo viên: đủ 24 bài, trạng thái, điểm, số test đạt, thời gian và bản bài làm đã chấm gần nhất. Bài chưa làm không bị xuất thành đã đạt; dữ liệu CSV trung hòa công thức và giữ tiếng Việt. Cần xuất trước khi xóa dữ liệu trình duyệt/đổi máy.

Kiểm tra:

```sh
node --import tsx --test scripts/test_review_practice.ts
npm run lint
npm run build
```

Bộ kiểm thử chạy toàn bộ đáp án đọc hiểu và lời giải tham chiếu bằng Python thật, đối chiếu các test; kiểm tra trùng nguyên văn nội dung hiện có, cách tính điểm, phân tách tài khoản, lưu nháp và CSV. Lời giải tham chiếu chỉ nằm trong `scripts/review_reference_solutions.json`, không import vào bundle học sinh.
