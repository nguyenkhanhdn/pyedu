# Theo dõi bài nộp realtime

Khi Bài học hoặc Giải đề được nộp, ứng dụng chờ lưu trên máy chủ rồi mới báo **Đã đồng bộ bài nộp lên máy chủ**. Lỗi ghi vẫn hiển thị rõ; lưu cục bộ không được báo là đã đồng bộ máy chủ.

Giáo viên/admin đang hoạt động có một kết nối Postgres Changes cho `submissions`, `algorithm_submissions`, `user_progress`. Không đăng ký bảng `users` vì hồ sơ có dữ liệu không cần thiết cho luồng bài nộp. Học sinh không đăng ký luồng theo dõi lớp.

Mỗi thay đổi làm cập nhật danh sách học sinh, thống kê và lịch sử đang mở. Gộp các thông báo gần nhau trong 250 ms để tránh tải trùng. Các truy vấn được tuần tự hóa, nhớ yêu cầu phát sinh trong lúc đang tải để không làm mất cập nhật khi nhiều học sinh nộp cùng lúc. Không ẩn thống kê đã tải trong lúc làm mới nền.

Sau mất kết nối, trạng thái hiển thị **Đang kết nối lại**; khi kết nối lại thành công sẽ đọc lại dữ liệu để bù các bài nộp bị lỡ. Tải định kỳ mỗi phút và khi quay lại cửa sổ vẫn là cơ chế dự phòng. Logout/đổi vai trò/ngừng xem sẽ dọn các kênh và bộ hẹn giờ tương ứng.

Publication đã được bật trên dự án kết nối bằng migration `classroom_realtime`. Script `sql/classroom_realtime.sql` và bootstrap chạy lại an toàn, không đổi RLS hay dữ liệu bài nộp. Cơ chế xác thực hiện có được giữ nguyên.

Kiểm tra:

```bash
npm run lint
node --import tsx --test scripts/test_classroom_realtime.ts scripts/test_student_history.ts
npm run build
```

Đã xác minh kết nối thật đạt SUBSCRIBED và publication có đủ 3 bảng. Test mô phỏng kiểm tra thông báo realtime, tải bù sau reconnect, dọn kết nối, dồn nhiều thay đổi khi tải chậm, luồng giao diện giáo viên tự cập nhật và học sinh chỉ báo thành công sau xác nhận lưu. Không tạo bài nộp giả trên máy chủ để thử realtime.
