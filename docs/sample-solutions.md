# Bài mẫu có trừ XP

- **Bài học:** bài mẫu nằm dưới phần đề bài / gợi ý trong tab Trình biên dịch & chấm điểm. Mức trừ cho từng bài tập là `2 × lesson.xpReward`, đúng với XP thưởng đang hiển thị.
- **Giải đề:** vào tab Bài mẫu trong khu vực làm bài. Mức trừ là `2 × problem.points`.
- Học sinh bấm Xem bài mẫu, đọc số XP sẽ bị trừ, rồi xác nhận. Hủy không trừ điểm và không hiển thị lời giải.
- Mỗi lần mở là một lần tính phí, kể cả bài đã giải đúng hoặc đã thử nhiều lần. Đóng bài mẫu hoặc chuyển tab / bài rồi mở lại sẽ tính phí mới.
- Trừ đủ vào cả tổng XP và XP tuần; số dư có thể âm. Giáo viên / quản trị viên đang hoạt động được xem miễn phí.
- Không trừ điểm khi bài chưa có mẫu, bài học chưa mở khóa, hoặc tài khoản không hợp lệ.
- Chỉ hiện bài mẫu sau khi lưu điểm thành công. Trong lúc xử lý, không nhận thêm xác nhận hoặc chạy / chấm bài.
- Khi dùng Supabase, cập nhật có điều kiện trên số XP cũ để tránh hai phiên ghi đè điểm nhau. Lỗi mạng không chuyển sang điểm cục bộ hoặc tự gửi lại giao dịch; thông báo yêu cầu kiểm tra lại số dư trước khi thử lại.

## Nội dung và lưu trữ

Không cần thay đổi schema hay cài thêm dependency. Dùng hệ thống hồ sơ / XP hiện có của ứng dụng. Bản sửa không thay đổi mô hình đăng nhập hoặc quyền truy cập dữ liệu của hệ thống.

Lời giải Python của bài học được đưa vào `LessonPractice.sampleSolution`. Các bài rẽ nhánh / vòng lặp dùng chung với ngân hàng Giải đề sử dụng lời giải đã có trong `algoExtras`, đồng thời thay mã khởi tạo chứa đáp án bằng khung TODO. Không ghi đè code học sinh đã lưu từ trước.

## Kiểm tra

```bash
npm run lint
node --import tsx --test scripts/test_sample_solution.ts
npm run build
```

Các test kiểm tra mức trừ, số dư âm, xem lại, tài khoản miễn phí / bị khóa, giao dịch đồng thời và lỗi lưu điểm. Python 3 cần có trên máy chạy test để xác minh toàn bộ 186 bài mẫu Bài học với 497 test case.
