# Theo dõi tiến độ theo chủ đề

Giáo viên / quản trị viên mở **Quản lý lớp → Tiến độ theo chủ đề** (tab mặc định).

- Mỗi học sinh có chủ đề, bài học và thời điểm hoạt động gần nhất; tiến độ bài học toàn khóa; bài tiếp theo theo thứ tự lộ trình.
- Tìm tên, lọc lớp, lọc chủ đề gần nhất (hoặc chủ đề tiếp theo khi chưa có hoạt động có thời gian).
- Lọc **Cần hỗ trợ**: từ 3 lần chưa đạt liên tiếp ở bài tập vừa nộp gần nhất. Nộp đạt hoặc hoàn thành bài học sau đó xóa dấu hiệu cũ. Đây là gợi ý để giáo viên xem xét, không phải kết luận năng lực học sinh.
- Bấm **Xem tiến độ** để xem số bài hoàn thành của từng chủ đề. Bấm **Xem lịch sử học & nộp bài** để mở lịch sử và mã nguồn từng lần nộp đã có.

Dữ liệu là bài nộp và mốc hoàn thành được lưu trên server, tất cả thời gian. Không ghi nhận việc chỉ mở trang lý thuyết và không phải theo dõi màn hình hay trạng thái online. Chủ đề gần nhất có thể là chủ đề ôn lại; bài tiếp theo luôn là bài chưa hoàn thành đầu tiên theo lộ trình. Chỉ mốc `user_progress.completed` xác nhận hoàn thành cả bài học; đạt một bài tập riêng lẻ không tự tăng tiến độ cả bài.

Tự cập nhật theo kênh realtime lớp học hiện có; tải bù khi focus trang và mỗi 60 giây. Có nút tải lại, thời điểm tải thành công và cảnh báo giữ dữ liệu cũ khi lỗi. Các truy vấn đọc phân trang, chỉ lấy metadata bài nộp và mốc hoàn thành; không tải mã/test cho cả lớp. Không thay đổi schema, RLS hoặc điểm số. Giữ cơ chế phân quyền teacher/admin của ứng dụng hiện tại.

Kiểm thử: `node --import tsx --test scripts/test_topic_progress.ts scripts/test_student_history.ts scripts/test_classroom_realtime.ts`, `npm run lint`, `npm run build`.
