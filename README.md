# AWS SAA-C03 Hub

Web tự học AWS Solutions Architect Associate (SAA-C03): 80 buổi, lab thực hành, quiz, flashcard SRS, đồng bộ Cloud 2 máy.
Chạy trực tiếp trên GitHub Pages – không cần build.

## Unit test

```bash
npm install
npm test
```

| File | Nội dung kiểm tra |
|---|---|
| `tests/data.test.js` | Toàn vẹn dữ liệu: id buổi, quiz (correctIdx, lựa chọn trùng), flashcard, HTML không hở thẻ, placeholder `<xxx>` chưa escape, schema lab, bảng so sánh |
| `tests/sync.test.js` | Logic merge Cloud Sync 2 máy (completedIds, SRS, thẻ tự tạo, đáp án quiz, tiến độ lab), offline, mã sao lưu |
| `tests/lesson-ui.test.js` | Bug reset đáp án khi đổi tab, thứ tự nội dung buổi học, lab tick/copy/escape, nút Hoàn thành |
| `tests/srs.test.js` | Bộ lọc thẻ SRS, thứ tự hàng đợi, chấm điểm Again/Hard/Good/Easy |

GitHub Actions (`.github/workflows/test.yml`) tự chạy test mỗi lần push lên `main`.
