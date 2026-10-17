const assert = require("assert");
const QuizEngine = require("../quiz-engine");
const QUIZ_META = require("../quiz-meta");

describe("QuizEngine – hàm thuần chuẩn hóa, gộp, chấm điểm, migrate, lọc & hash (P2 §8.1)", () => {
  it("normalizeQuiz gán id/pool/domain/task/sessionIds mặc định cho câu cũ và không mutate đầu vào", () => {
    const raw = {
      qEn: "Which AWS service provides object storage?",
      qVi: "Dịch vụ nào cung cấp lưu trữ đối tượng?",
      options: ["A. Amazon EBS", "B. Amazon S3", "C. Amazon EFS", "D. AWS Snowball"],
      correctIdx: 1,
      explanation: "S3 là Object Storage."
    };
    const snapshot = JSON.stringify(raw);
    const norm = QuizEngine.normalizeQuiz(raw, {
      sessionId: 15,
      index: 0,
      meta: QUIZ_META
    });

    assert.strictEqual(JSON.stringify(raw), snapshot, "normalizeQuiz không được mutate object đầu vào");
    assert.strictEqual(norm.id, "s15-l0");
    assert.strictEqual(norm.pool, "lesson");
    assert.ok([1, 2, 3, 4].includes(norm.domain));
    assert.match(norm.task, /^[1-4]\.[1-5]$/);
    assert.deepStrictEqual(norm.sessionIds, [15]);
    assert.strictEqual(norm.correctIdx, 1);
  });

  it("mergeQuizBank giữ câu cũ ở đầu, append câu mới, idempotent, dedupe theo id và qEn", () => {
    const sessions = [
      {
        id: 1,
        quizzes: [
          {
            qEn: "Legacy question 1?",
            qVi: "Câu cũ 1?",
            options: ["A. 1", "B. 2", "C. 3", "D. 4"],
            correctIdx: 0,
            explanation: "Exp 1"
          },
          {
            qEn: "Legacy question 2?",
            qVi: "Câu cũ 2?",
            options: ["A. 1", "B. 2", "C. 3", "D. 4"],
            correctIdx: 1,
            explanation: "Exp 2"
          }
        ]
      }
    ];

    const bank = {
      1: [
        {
          id: "s1-q01",
          pool: "lesson",
          domain: 1,
          task: "1.1",
          sessionIds: [1],
          qEn: "New question 1?",
          qVi: "Câu mới 1?",
          options: ["A. 1", "B. 2", "C. 3", "D. 4"],
          correctIdx: 2,
          explanation: "Exp new 1",
          whyWrong: ["w0", "w1", null, "w3"]
        },
        // Duplicate ID
        {
          id: "s1-q01",
          pool: "lesson",
          domain: 1,
          task: "1.1",
          sessionIds: [1],
          qEn: "Different text same ID?",
          qVi: "Trùng ID?",
          options: ["A. 1", "B. 2", "C. 3", "D. 4"],
          correctIdx: 0,
          explanation: "Dup",
          whyWrong: [null, "w1", "w2", "w3"]
        },
        // Duplicate qEn (with extra whitespace)
        {
          id: "s1-q02",
          pool: "lesson",
          domain: 1,
          task: "1.1",
          sessionIds: [1],
          qEn: "  Legacy   question 1?  ",
          qVi: "Trùng qEn?",
          options: ["A. 1", "B. 2", "C. 3", "D. 4"],
          correctIdx: 0,
          explanation: "Dup qEn",
          whyWrong: [null, "w1", "w2", "w3"]
        }
      ]
    };

    QuizEngine.mergeQuizBank(sessions, bank, QUIZ_META);
    assert.strictEqual(sessions[0].quizzes.length, 3);
    assert.strictEqual(sessions[0].quizzes[0].id, "s1-l0");
    assert.strictEqual(sessions[0].quizzes[1].id, "s1-l1");
    assert.strictEqual(sessions[0].quizzes[2].id, "s1-q01");

    // Idempotent when called a second time
    QuizEngine.mergeQuizBank(sessions, bank, QUIZ_META);
    assert.strictEqual(sessions[0].quizzes.length, 3);
    assert.deepStrictEqual(
      sessions[0].quizzes.map((q) => q.id),
      ["s1-l0", "s1-l1", "s1-q01"]
    );
  });

  it("isCorrect và correctSet xử lý đúng câu 1 đáp án và Choose TWO all-or-nothing (không phụ thuộc thứ tự)", () => {
    const singleQ = { id: "q1", correctIdx: 2, options: ["A", "B", "C", "D"] };
    assert.deepStrictEqual(QuizEngine.correctSet(singleQ), [2]);
    assert.strictEqual(QuizEngine.isCorrect(singleQ, 2), true);
    assert.strictEqual(QuizEngine.isCorrect(singleQ, "2"), true);
    assert.strictEqual(QuizEngine.isCorrect(singleQ, 1), false);
    assert.strictEqual(QuizEngine.isCorrect(singleQ, null), false);
    assert.strictEqual(QuizEngine.isCorrect(singleQ, undefined), false);

    const multiQ = { id: "q2", correctIdxs: [3, 1], options: ["A", "B", "C", "D", "E"] };
    assert.deepStrictEqual(QuizEngine.correctSet(multiQ), [1, 3]);
    assert.strictEqual(QuizEngine.isCorrect(multiQ, [1, 3]), true);
    assert.strictEqual(QuizEngine.isCorrect(multiQ, [3, 1]), true);
    assert.strictEqual(QuizEngine.isCorrect(multiQ, [1]), false);
    assert.strictEqual(QuizEngine.isCorrect(multiQ, [1, 2]), false);
    assert.strictEqual(QuizEngine.isCorrect(multiQ, [1, 2, 3]), false);
    assert.strictEqual(QuizEngine.isCorrect(multiQ, 1), false);
  });

  it("migrateQuizAnswers chuyển index→id, giữ _t, đặt _v=2, idempotent, bỏ key không map được", () => {
    const sessions = [
      {
        id: 1,
        quizzes: [{ id: "s1-l0" }, { id: "s1-l1" }, { id: "s1-q01" }]
      }
    ];
    const v1 = {
      1: { 0: 2, 1: 0, 99: 3, invalidKey: 1, _t: 1700000000000 }
    };

    const migrated = QuizEngine.migrateQuizAnswers(v1, sessions);
    assert.strictEqual(migrated[1]["s1-l0"], 2);
    assert.strictEqual(migrated[1]["s1-l1"], 0);
    assert.strictEqual(migrated[1]["99"], undefined);
    assert.strictEqual(migrated[1].invalidKey, undefined);
    assert.strictEqual(migrated[1]._t, 1700000000000);
    assert.strictEqual(migrated[1]._v, 2);

    const migratedAgain = QuizEngine.migrateQuizAnswers(migrated, sessions);
    assert.deepStrictEqual(migratedAgain, migrated);
  });

  it("getQuizPool lọc theo pool, maxSessionId (dùng max(sessionIds)), domains, tasks và excludeIds", () => {
    const sessions = [
      {
        id: 5,
        quizzes: [
          { id: "s5-l0", pool: "lesson", domain: 1, task: "1.1", sessionIds: [5] },
          { id: "s5-q01", pool: "lesson", domain: 3, task: "3.2", sessionIds: [5] }
        ]
      },
      {
        id: 12,
        quizzes: [{ id: "s12-l0", pool: "lesson", domain: 2, task: "2.1", sessionIds: [12] }]
      }
    ];
    const examBank = [
      { id: "x-p1-001", pool: "exam", domain: 1, task: "1.1", sessionIds: [2, 8] },
      { id: "x-p2-001", pool: "exam", domain: 2, task: "2.2", sessionIds: [5, 14] },
      { id: "x-p3-001", pool: "exam", domain: 4, task: "4.1", sessionIds: [25] }
    ];

    const lessonOnly = QuizEngine.getQuizPool(sessions, examBank, { pool: "lesson" });
    assert.deepStrictEqual(
      lessonOnly.map((q) => q.id),
      ["s5-l0", "s5-q01", "s12-l0"]
    );

    const examMax10 = QuizEngine.getQuizPool(sessions, examBank, {
      pool: "exam",
      maxSessionId: 10
    });
    assert.deepStrictEqual(
      examMax10.map((q) => q.id),
      ["x-p1-001"],
      "x-p2-001 có sessionIds [5, 14] nên max(sessionIds)=14 > 10 phải bị loại"
    );

    const byDomainAndTask = QuizEngine.getQuizPool(sessions, examBank, {
      pool: "all",
      domains: [1, 2],
      tasks: ["1.1"],
      excludeIds: ["s5-l0"]
    });
    assert.deepStrictEqual(
      byDomainAndTask.map((q) => q.id),
      ["x-p1-001"]
    );
  });

  it("quizContentHash ổn định, không đổi khi chỉ đổi khoảng trắng, đổi khi đổi đề/phương án/đáp án", () => {
    const q1 = {
      qEn: "A company needs a serverless queue. Which service fits?",
      options: ["A. Amazon SQS", "B. Amazon EC2", "C. Amazon RDS", "D. AWS IAM"],
      correctIdx: 0
    };
    const q1Whitespace = {
      qEn: "  A company   needs a serverless queue.\nWhich service fits? ",
      options: [" A.  Amazon SQS ", "B. Amazon EC2", "C. Amazon RDS", "D. AWS IAM"],
      correctIdx: 0
    };
    const qChangedPrompt = { ...q1, qEn: "A company needs a relational database. Which service fits?" };
    const qChangedOption = { ...q1, options: ["A. Amazon SNS", "B. Amazon EC2", "C. Amazon RDS", "D. AWS IAM"] };
    const qChangedKey = { ...q1, correctIdx: 1 };

    const h1 = QuizEngine.quizContentHash(q1);
    assert.match(h1, /^[0-9a-f]{8}$/);
    assert.strictEqual(QuizEngine.quizContentHash(q1Whitespace), h1);
    assert.notStrictEqual(QuizEngine.quizContentHash(qChangedPrompt), h1);
    assert.notStrictEqual(QuizEngine.quizContentHash(qChangedOption), h1);
    assert.notStrictEqual(QuizEngine.quizContentHash(qChangedKey), h1);
  });
});
