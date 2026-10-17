# Báo cáo Review Chéo Ngân hàng Câu hỏi SAA-C03 (Spec P2)

## 1. Tổng quan quy trình AI Cross-Review
- **Tổng số câu mới được duyệt (`approved`)**: 478 câu (168 câu `pool: "lesson"` + 310 câu `pool: "exam"`).
- **Subagent Blind Reviewers**:
  - `Lesson Quiz Blind Reviewer` (Subagent `7c3671f0-bcd8-46cb-915f-5b960fd2e048`): 100% khớp đáp án blind-solve, độ tự tin trung bình 5.0/5.
  - `Exam Quiz Blind Reviewer` (Subagent `8f08a0ce-c2c0-406b-bce0-97ef0c11bc4f`): 100% khớp đáp án blind-solve, phát hiện và đã sửa lỗi chính tả từ ngoại lai trong Session 4 / `x-p1-004`.

## 2. Danh sách câu hỏi `needs-human` (Đã loại khỏi Bank)

| ID | Trạng thái | Hash | Lý do cần người dùng xem xét (`notes`) |
|---|---|---|---|
| `x-p2-099` | `needs-human` | `7c4e91a2` | Câu hỏi so sánh thời gian chuyển tầng S3 Lifecycle dưới 30 ngày có 2 cách diễn giải nếu object nhỏ hơn 128 KB; đã loại khỏi `exam-bank-1.js` để chờ quyết định của người dùng. |
| `x-p4-099` | `needs-human` | `9b12d0e4` | Câu hỏi giới hạn kích thước tin nhắn SQS giữa chuẩn cũ 256 KB và chuẩn mới 1 MiB (8/2025) có thể gây nhầm lẫn nếu không nêu rõ SDK; đã loại khỏi `exam-bank-3.js`. |
