const assert = require("assert");
const fs = require("fs");
const path = require("path");
const { loadData, ROOT } = require("./helpers/loadApp");

const { STUDY_DATA, EXAM_BANK, QuizEngine } = loadData();
const manifestPath = path.join(ROOT, "tests", "fixtures", "quiz-review-manifest.json");
const primaryReportPath = path.join(ROOT, "docs", "plans", "improve-course-hub", "reviews", "quiz-review-report.md");
const fallbackReportPath = path.join(ROOT, "tests", "fixtures", "quiz-review-report.md");
const reportPath = fs.existsSync(primaryReportPath) ? primaryReportPath : fallbackReportPath;

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const reportText = fs.readFileSync(reportPath, "utf8");

const lessonPool = QuizEngine.getQuizPool(STUDY_DATA.sessions, EXAM_BANK, { pool: "lesson" });
const examPool = QuizEngine.getQuizPool(STUDY_DATA.sessions, EXAM_BANK, { pool: "exam" });
const newQuizzes = [...lessonPool, ...examPool].filter((q) => !/^s\d+-l\d+$/.test(q.id));

describe("AI Cross-Review Manifest & Report (P2 §8.3)", () => {
  it("mọi câu mới (lesson + exam) có trong manifest với status 'approved'", () => {
    assert.ok(newQuizzes.length >= 468, `Số câu mới = ${newQuizzes.length}`);
    for (const q of newQuizzes) {
      const entry = manifest[q.id];
      assert.ok(entry, `Câu mới ${q.id} chưa có trong quiz-review-manifest.json`);
      assert.strictEqual(entry.status, "approved", `Câu ${q.id} trong bank có status=${entry.status} !== approved`);
    }
  });

  it("hash trong manifest khớp quizContentHash hiện tại", () => {
    const mismatches = [];
    for (const q of newQuizzes) {
      const entry = manifest[q.id];
      const actualHash = QuizEngine.quizContentHash(q);
      if (!entry || entry.hash !== actualHash) {
        mismatches.push(`${q.id}: manifest=${entry?.hash} !== actual=${actualHash}`);
      }
    }
    assert.deepStrictEqual(mismatches, []);
  });

  it("không câu nào trong bank có status needs-human hoặc rejected", () => {
    for (const q of newQuizzes) {
      const entry = manifest[q.id];
      assert.ok(
        entry && entry.status !== "needs-human" && entry.status !== "rejected",
        `Câu ${q.id} có status ${entry?.status} không được nằm trong bank`
      );
    }
  });

  it("câu approved có blindAnswer khớp đáp án đúng, hoặc có ghi chú arbiter", () => {
    for (const q of newQuizzes) {
      const entry = manifest[q.id];
      const expected = QuizEngine.correctSet(q);
      const blind = Array.isArray(entry.blindAnswer) ? [...entry.blindAnswer].sort((a, b) => a - b) : [];
      const matches =
        blind.length === expected.length && blind.every((val, idx) => val === expected[idx]);
      if (!matches) {
        assert.ok(
          typeof entry.notes === "string" && /arbiter/i.test(entry.notes),
          `Câu ${q.id} có blindAnswer=${JSON.stringify(blind)} lệch key ${JSON.stringify(expected)} nhưng thiếu ghi chú arbiter`
        );
      }
    }
  });

  it("report liệt kê đúng các câu needs-human trong manifest", () => {
    assert.ok(reportText.length > 100, "quiz-review-report.md quá ngắn");
    const needsHumanIds = Object.entries(manifest)
      .filter(([, v]) => v && v.status === "needs-human")
      .map(([id]) => id);
    for (const id of needsHumanIds) {
      assert.ok(reportText.includes(id), `quiz-review-report.md thiếu liệt kê câu needs-human ${id}`);
    }
  });
});
