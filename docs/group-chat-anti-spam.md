# Chống spam nhóm học

Học sinh: tối thiểu 5 giây giữa hai tin nhắn, tối đa 10 tin trong 60 giây, không lặp cùng nội dung và mã nguồn trong 60 giây. Tính chung mọi nhóm theo tài khoản. So sánh nội dung bỏ khoảng trắng dư và không phân biệt hoa/thường; mã nguồn vẫn phân biệt hoa/thường. Đổi câu hỏi hoặc sửa code sau thời gian chờ vẫn được gửi bình thường. Giáo viên/admin được miễn giới hạn tần suất để hướng dẫn lớp; mọi tài khoản vẫn giới hạn 1000 ký tự mỗi phần và không được gửi tin trống.

Supabase có trigger `group_chat_anti_spam` chạy trước INSERT, dùng vai trò/hồ sơ thật và thời gian máy chủ. Khóa hàng người dùng để tuần tự hóa yêu cầu đồng thời, tính cả các nhóm khác nhau. Function chạy SECURITY INVOKER, không đổi RLS. Đã bật trực tiếp bằng SQL sau khi endpoint migration lỗi requestState; SQL khởi tạo mới được đồng bộ trong ứng dụng.

Giao diện chặn nhấn liên tiếp, hiển thị đếm ngược 5 giây và lý do máy chủ từ chối. Chỉ xóa bản nháp và hiện tin đã gửi khi lưu thành công; lỗi không chuyển thành tin nhắn cục bộ giả. SQLite và chế độ cục bộ cũng kiểm tra cùng mức giới hạn.

Kiểm tra:

```bash
node --import tsx --test scripts/test_chat_rate_limit.ts
npm run lint
npm run build
```

`sql/test_group_chat_anti_spam.sql` kiểm tra trigger thật trong transaction rồi ROLLBACK, không để lại tài khoản/tin nhắn thử. Đã chạy với cả quyền quản trị và role anon đang dùng bởi ứng dụng. Không xóa tin nhắn cũ. Cơ chế xác thực người dùng hiện có được giữ nguyên; bản sửa không thay thế mô hình đăng nhập của hệ thống.
