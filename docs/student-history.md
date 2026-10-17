# Quản lý lớp: dữ liệu đồng bộ và lịch sử từng học sinh

- Danh sách học sinh có nút **Lịch sử học & nộp bài**. Trong thống kê **Theo học sinh**, bấm tên học sinh cũng mở cùng lịch sử.
- Lịch sử đọc trực tiếp bài nộp Bài học, Giải đề và mốc hoàn thành từ Supabase, không giới hạn 7/14/30 ngày. Mới nhất trước, thời gian hiển thị theo Việt Nam; lọc theo loại và xem thêm mỗi 30 dòng.
- Mở chi tiết một lượt nộp mới tải mã nguồn và kết quả từng test (input, mong đợi, thực tế, lỗi, thời gian chạy). Không dùng mã đang soạn để giả làm mã nguồn của lượt nộp cũ.
- Lượt nộp Bài học mới lưu `practice_key` và `code` trong bảng `submissions`. Lượt cũ thiếu dữ liệu này được giữ nguyên và hiển thị thông báo phù hợp. Chỉ có mốc hoàn thành gần nhất cho mỗi bài; không suy diễn thành lịch sử xem lý thuyết.
- Thống kê đếm mọi lượt nộp, gồm cả chưa đạt; ô ngày hiển thị **bài đạt / lượt nộp**. Bài tập con được phân biệt bằng khóa bài tập.
- Danh sách, thống kê và lịch sử cập nhật theo realtime khi có bài nộp mới; tải mỗi phút và khi quay lại cửa sổ là dự phòng. Có nút tải lại. Lỗi tải phải hiển thị, không thay bằng dữ liệu cục bộ trống hoặc danh sách tải dở. Lỗi ghi bài nộp cũng được báo cho học sinh. Chi tiết trong `docs/realtime-classroom.md`.

## Dữ liệu

Migration `lesson_submission_snapshots` đã được áp dụng trên dự án kết nối. SQL tương ứng trong `sql/lesson_submission_snapshots.sql`, chạy lặp lại an toàn. Schema tạo mới cũng đã bổ sung hai cột. Không xóa hoặc viết lại bài nộp cũ, không thay chính sách RLS hiện có.

Giao diện và API phía ứng dụng chỉ cho tài khoản giáo viên/admin đang hoạt động mở lịch sử. Các truy vấn chi tiết luôn lọc đồng thời mã học sinh và mã bài nộp. Mô hình xác thực/quyền dữ liệu Supabase hiện có được giữ nguyên.

## Kiểm tra

```bash
npm run lint
node --import tsx --test scripts/test_student_history.ts
npm run build
```

Test kiểm tra phân trang vượt giới hạn trả về của máy chủ, lỗi trang giữa, phân quyền ứng dụng, thứ tự lịch sử, bài chưa đạt, ngày cũ và snapshot bài tập con. Đã kiểm tra truy vấn đọc thật với 6.019 lượt nộp trong 30 ngày; không tạo dữ liệu học sinh giả trên máy chủ.
