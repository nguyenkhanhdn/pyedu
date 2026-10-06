# Phase 3 – Assessment (Question Bank, Quiz/Practice, Attempt, Result, Skill)

## Phân tích domain (doc §74)

**Phạm vi**: Question Bank, Question (+Option), Skill (+Category, QuestionSkill, SkillProgress), Assessment (+AssessmentQuestion), Attempt, Answer, Result, Recommendation cơ bản.
Ngoài phạm vi (làm sau): ExamTemplate/ExamRule của THPT (Phase 4), Import Excel/CSV (§66), Coding question, Assignment chấm tay.

**Nguyên tắc engine độc lập (§8, §36)**: Assessment Engine **không nhắc tới Course cụ thể hay luật THPT**. Question/Assessment chỉ giữ `CourseId/SectionId/LessonId` dạng tham chiếu (int, không FK cứng) để gắn ngữ cảnh. Loại đề (Quiz/Practice/MockExam/FinalExam/Assignment) là dữ liệu `AssessmentType`.

**Entity**: Question, QuestionOption, Skill, SkillCategory, QuestionSkill, Assessment, AssessmentQuestion, AssessmentAttempt, AssessmentAnswer, SkillProgress.
`AssessmentProgress` được tính từ Attempt (điểm cao nhất/ lần gần nhất), không lưu bảng riêng.

**Quan hệ**: Question 1–* Option; Question *–* Skill; Assessment *–* Question (Points, SortOrder); User 1–* Attempt 1–* Answer; User *–* Skill (SkillProgress cộng dồn Correct/Total).

**Business rules**
1. Loại câu hỏi: SingleChoice (đúng 1 đáp án đúng), MultipleChoice (≥1 đúng), TrueFalse (đúng 2 lựa chọn, 1 đúng). Mỗi lựa chọn có nội dung; ≥ 2 lựa chọn.
2. Chấm **all-or-nothing**: đúng khi tập lựa chọn của học viên **bằng đúng** tập đáp án đúng. (Điểm từng phần là mở rộng sau, nằm trong `ScoringEngine`.)
3. Publish Assessment cần ≥ 1 câu hỏi và mọi câu đều Published.
4. Câu hỏi đã có bài làm: **không sửa lựa chọn** (giữ lịch sử); chỉ sửa nội dung/giải thích/độ khó/skill hoặc Archive.
5. **Không lộ đáp án đúng trước khi nộp**: màn làm bài dùng DTO không có `IsCorrect`. Sau nộp: chỉ hiện đáp án/giải thích nếu `ShowAnswersAfterSubmit`.
6. Mỗi user có tối đa 1 attempt `InProgress`/assessment (tiếp tục làm khi quay lại). `MaxAttempts` đếm các attempt đã nộp.
7. Giới hạn thời gian: server tính hạn = StartedDate + TimeLimit (+60s cho độ trễ mạng). Nộp quá hạn → bài tính như không có câu trả lời. Client chỉ hiển thị đồng hồ và tự nộp.
8. Server tự chấm từ dữ liệu DB; không tin điểm/đúng-sai từ client. Chỉ nhận option id thuộc đúng câu hỏi.
9. Nộp bài idempotent: attempt đã Submitted thì không chấm lại. Nộp bài cập nhật `SkillProgress` một lần.
10. Quyền làm bài = `IAccessControlService.CanTakeAssessmentAsync` (Phase 3: đã Enroll vào Course của Assessment và Assessment Published).

**Recommendation (§37)**: sau khi nộp: điểm → phân tích theo Skill của attempt → kỹ năng yếu (< 60%) → các bài học (`Question.LessonId`) của câu làm sai → gợi ý ôn. Mentor gợi ý để Phase 7.

**Mở rộng (§78)**: thêm loại Assessment mới = thêm giá trị enum/dữ liệu; thêm Course mới không đụng engine.

## Kiểm thử cuối phase
Build · `Add-Migration Phase3` · Admin: tạo Skill, câu hỏi (3 loại), Quiz, Publish · Student (đã enroll) làm bài, nộp, xem kết quả + gợi ý · SkillProgress thay đổi ở Dashboard · không đoán được đáp án từ HTML trang làm bài · Student chưa enroll không làm được · mobile.
