# Danh mục đề và đồng bộ bài nộp

`algorithm_submissions.problem_id` tham chiếu `algorithm_problems.id`. Đề chỉ có trong frontend vẫn chấm được, nhưng lưu bài sẽ lỗi `23503` nếu chưa có bản ghi máy chủ. Sự cố ngày 19/10/2026 ảnh hưởng 24 đề `rn-*` và 36 đề `vl-*`, bao gồm đề chẵn/lẻ `rn-08`.

Đã bổ sung dữ liệu bằng `sql/algorithm_submission_catalog.sql`. SQL dùng `ON CONFLICT DO NOTHING`, chạy lại an toàn, giữ nguyên đề đã có, bài nộp và điểm học sinh. Tạo lại file bằng `npm run algo:submission-catalog` khi sửa dữ liệu của nhóm đề này.

Trước khi triển khai bộ đề mới, đồng bộ đầy đủ đề vào `algorithm_problems`, sau đó chạy `npm run algo:check-server`. Lệnh này kiểm tra **toàn bộ** mã đề hiện có trong frontend bằng cấu hình Supabase của ứng dụng và báo lỗi nếu thiếu bất kỳ đề nào hoặc không đọc được máy chủ. Không chỉ kiểm tra 60 đề của lần sửa này.

Kiểm thử: `node --import tsx --test scripts/test_submission_catalog.ts`. Sau khi áp dụng SQL, kiểm tra lệnh đối chiếu máy chủ và thử lưu bài dưới quyền `anon` trong transaction được rollback, giữ nguyên khóa ngoại và quyền truy cập.

Bài bị lỗi trước khi sửa chưa được lưu lên máy chủ; học sinh cần nộp lại để ghi nhận kết quả.
