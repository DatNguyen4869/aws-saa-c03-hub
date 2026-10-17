const assert = require("assert");
const { loadData } = require("./helpers/loadApp");
const ExamEngine = require("../exam-engine");

const { STUDY_DATA, EXAM_BANK, QuizEngine } = loadData();
const examPool = QuizEngine.getQuizPool(STUDY_DATA.sessions, EXAM_BANK, { pool: "exam" });

describe("ExamEngine – hàm thuần tạo đề, chấm điểm, đồng hồ & merge lịch sử (P3 §6.1)", () => {
  it("createRng cùng seed → cùng dãy; khác seed → khác dãy", () => {
    const r1 = ExamEngine.createRng(12345);
    const r2 = ExamEngine.createRng(12345);
    const r3 = ExamEngine.createRng(99999);

    const seq1 = Array.from({ length: 10 }, () => r1());
    const seq2 = Array.from({ length: 10 }, () => r2());
    const seq3 = Array.from({ length: 10 }, () => r3());

    assert.deepStrictEqual(seq1, seq2);
    assert.notDeepStrictEqual(seq1, seq3);
    seq1.forEach((v) => assert.ok(v >= 0 && v < 1));
  });

  it("allocateByDomain(65, weights) = {1:19, 2:17, 3:16, 4:13} (largest remainder)", () => {
    const alloc = ExamEngine.allocateByDomain(65, ExamEngine.DOMAIN_WEIGHTS);
    assert.deepStrictEqual(alloc, { 1: 19, 2: 17, 3: 16, 4: 13 });
    assert.strictEqual(alloc[1] + alloc[2] + alloc[3] + alloc[4], 65);
  });

  it("allocateByDomain bù khi một domain thiếu câu mà không vượt số câu có sẵn", () => {
    const avail = { 1: 5, 2: 40, 3: 40, 4: 40 };
    const alloc = ExamEngine.allocateByDomain(65, ExamEngine.DOMAIN_WEIGHTS, avail);
    assert.strictEqual(alloc[1], 5);
    assert.strictEqual(alloc[1] + alloc[2] + alloc[3] + alloc[4], 65);
    for (const d of [1, 2, 3, 4]) {
      assert.ok(alloc[d] <= avail[d]);
    }
  });

  it("buildExam full: 65 câu, không trùng, 130 phút", () => {
    const { def, warnings } = ExamEngine.buildExam(examPool, { mode: "full", seed: 42, now: 1000 });
    assert.strictEqual(def.mode, "full");
    assert.strictEqual(def.questionIds.length, 65);
    assert.strictEqual(new Set(def.questionIds).size, 65);
    assert.strictEqual(def.durationMs, 130 * 60 * 1000);
    assert.strictEqual(warnings.length, 0);
  });

  it("buildExam tái lập: cùng seed + cùng pool → cùng questionIds và optionOrder", () => {
    const b1 = ExamEngine.buildExam(examPool, { mode: "full", seed: 777, now: 1000 });
    const b2 = ExamEngine.buildExam(examPool, { mode: "full", seed: 777, now: 2000 });
    assert.deepStrictEqual(b1.def.questionIds, b2.def.questionIds);
    assert.deepStrictEqual(b1.def.optionOrder, b2.def.optionOrder);
  });

  it("buildExam pool nhỏ hơn count → count giảm + warning", () => {
    const smallPool = examPool.slice(0, 12);
    const { def, warnings } = ExamEngine.buildExam(smallPool, { mode: "quick", count: 20, seed: 1, now: 1000 });
    assert.strictEqual(def.questionIds.length, 12);
    assert.ok(warnings.length >= 1);
  });

  it("buildExam excludeIds được tôn trọng khi pool đủ câu", () => {
    const first = ExamEngine.buildExam(examPool, { mode: "full", seed: 10, now: 1000 });
    const second = ExamEngine.buildExam(examPool, {
      mode: "full",
      seed: 10,
      excludeIds: first.def.questionIds,
      now: 2000
    });
    const overlap = second.def.questionIds.filter((id) => first.def.questionIds.includes(id));
    assert.strictEqual(overlap.length, 0);
  });

  it("optionOrder là hoán vị hợp lệ của từng câu", () => {
    const { def } = ExamEngine.buildExam(examPool, { mode: "quick", seed: 99, now: 1000 });
    const byId = new Map(examPool.map((q) => [q.id, q]));
    for (const qid of def.questionIds) {
      const q = byId.get(qid);
      const order = def.optionOrder[qid];
      assert.strictEqual(order.length, q.options.length);
      assert.deepStrictEqual(
        [...order].sort((a, b) => a - b),
        q.options.map((_, i) => i)
      );
    }
  });

  it("examRefForSession: 57→{1,0,1..16}, 60→{1,3,49..65}, 80→{6,3,49..65}, 56→null", () => {
    assert.strictEqual(ExamEngine.examRefForSession(56), null);
    assert.strictEqual(ExamEngine.examRefForSession(81), null);
    assert.deepStrictEqual(ExamEngine.examRefForSession(57), {
      examNo: 1,
      part: 0,
      from: 1,
      to: 16,
      count: 16
    });
    assert.deepStrictEqual(ExamEngine.examRefForSession(60), {
      examNo: 1,
      part: 3,
      from: 49,
      to: 65,
      count: 17
    });
    assert.deepStrictEqual(ExamEngine.examRefForSession(80), {
      examNo: 6,
      part: 3,
      from: 49,
      to: 65,
      count: 17
    });
  });

  it("buildSectionExam cùng buổi luôn ra cùng bộ câu; 4 phần của một đề không trùng nhau và gộp lại đủ 65 câu", () => {
    const s57a = ExamEngine.buildSectionExam(examPool, 57, 1000);
    const s57b = ExamEngine.buildSectionExam(examPool, 57, 9000);
    assert.deepStrictEqual(s57a.def.questionIds, s57b.def.questionIds);
    assert.strictEqual(s57a.def.questionIds.length, 16);

    const parts = [57, 58, 59, 60].map((sid) => ExamEngine.buildSectionExam(examPool, sid, 1000).def.questionIds);
    assert.deepStrictEqual(parts.map((p) => p.length), [16, 16, 16, 17]);
    const combined = parts.flat();
    assert.strictEqual(combined.length, 65);
    assert.strictEqual(new Set(combined).size, 65);
  });

  it("answerQuestion / toggleFlag / goTo trả về object mới, không mutate", () => {
    const { def } = ExamEngine.buildExam(examPool, { mode: "quick", seed: 1, now: 1000 });
    const active = ExamEngine.startExam(def, 1000);
    const snap = JSON.stringify(active);

    const q0 = def.questionIds[0];
    const a1 = ExamEngine.answerQuestion(active, q0, 2);
    assert.strictEqual(JSON.stringify(active), snap);
    assert.strictEqual(a1.answers[q0], 2);

    const f1 = ExamEngine.toggleFlag(a1, q0);
    assert.strictEqual(a1.flagged[q0], undefined);
    assert.strictEqual(f1.flagged[q0], true);
    const f2 = ExamEngine.toggleFlag(f1, q0);
    assert.strictEqual(f2.flagged[q0], undefined);

    const g1 = ExamEngine.goTo(f2, 5);
    assert.strictEqual(f2.currentIdx, 0);
    assert.strictEqual(g1.currentIdx, 5);
    assert.strictEqual(ExamEngine.goTo(g1, -10).currentIdx, 0);
    assert.strictEqual(ExamEngine.goTo(g1, 999).currentIdx, def.questionIds.length - 1);
  });

  it("remainingMs dựa trên endsAt; isExpired đúng ở biên", () => {
    const { def } = ExamEngine.buildExam(examPool, { mode: "quick", minutes: 40, seed: 1, now: 1000 });
    const active = ExamEngine.startExam(def, 1000);
    const endsAt = 1000 + 40 * 60 * 1000;
    assert.strictEqual(active.endsAt, endsAt);
    assert.strictEqual(ExamEngine.remainingMs(active, endsAt - 5000), 5000);
    assert.strictEqual(ExamEngine.isExpired(active, endsAt - 1), false);
    assert.strictEqual(ExamEngine.isExpired(active, endsAt), true);
    assert.strictEqual(ExamEngine.remainingMs(active, endsAt + 10000), 0);
  });

  it("scoreExam: tổng, đúng, pct, byDomain, wrong/flagged/unanswered & Choose TWO all-or-nothing", () => {
    const samplePool = [
      { id: "q1", domain: 1, task: "1.1", options: ["A", "B", "C", "D"], correctIdx: 1 },
      { id: "q2", domain: 2, task: "2.1", options: ["A", "B", "C", "D", "E"], correctIdxs: [0, 3] },
      { id: "q3", domain: 2, task: "2.2", options: ["A", "B", "C", "D", "E"], correctIdxs: [1, 4] },
      { id: "q4", domain: 3, task: "3.1", options: ["A", "B", "C", "D"], correctIdx: 2 }
    ];
    const def = {
      id: "exam_test",
      mode: "quick",
      seed: 1,
      questionIds: ["q1", "q2", "q3", "q4"],
      optionOrder: { q1: [0, 1, 2, 3], q2: [0, 1, 2, 3, 4], q3: [0, 1, 2, 3, 4], q4: [0, 1, 2, 3] },
      durationMs: 600000,
      createdAt: 1000,
      source: "all",
      label: "Test"
    };
    let active = ExamEngine.startExam(def, 1000);
    active = ExamEngine.answerQuestion(active, "q1", 1); // correct
    active = ExamEngine.answerQuestion(active, "q2", [3, 0]); // Choose TWO correct (reverse order)
    active = ExamEngine.answerQuestion(active, "q3", [1]); // Choose TWO partial -> wrong
    // q4 left unanswered
    active = ExamEngine.toggleFlag(active, "q3");

    const res = ExamEngine.scoreExam(active, samplePool, { now: 31000, autoSubmitted: false });
    assert.strictEqual(res.total, 4);
    assert.strictEqual(res.correct, 2);
    assert.strictEqual(res.pct, 0.5);
    assert.strictEqual(res.byDomain[1].correct, 1);
    assert.strictEqual(res.byDomain[2].total, 2);
    assert.strictEqual(res.byDomain[2].correct, 1);
    assert.deepStrictEqual(res.wrongIds, ["q3"]);
    assert.deepStrictEqual(res.unansweredIds, ["q4"]);
    assert.deepStrictEqual(res.flaggedIds, ["q3"]);
  });

  it("scaledScore(0)=100, (1)=1000, (0.689)≈720", () => {
    assert.strictEqual(ExamEngine.scaledScore(0), 100);
    assert.strictEqual(ExamEngine.scaledScore(1), 1000);
    assert.strictEqual(ExamEngine.scaledScore(0.689), 720);
  });

  it("buildRetryExam chỉ gồm câu sai và chưa làm", () => {
    const fakeResult = {
      id: "res_1",
      label: "Full Exam",
      wrongIds: [examPool[0].id, examPool[1].id],
      unansweredIds: [examPool[2].id]
    };
    const { def } = ExamEngine.buildRetryExam(fakeResult, examPool, 5000);
    assert.strictEqual(def.mode, "retry");
    assert.strictEqual(def.questionIds.length, 3);
    assert.deepStrictEqual(
      new Set(def.questionIds),
      new Set([examPool[0].id, examPool[1].id, examPool[2].id])
    );
  });

  it("mergeExamHistory union, sort giảm dần theo submittedAt, cap 30, idempotent", () => {
    const local = Array.from({ length: 20 }, (_, i) => ({
      id: `e_${i}`,
      submittedAt: 1000 + i * 10
    }));
    const cloud = Array.from({ length: 20 }, (_, i) => ({
      id: `e_${i + 15}`,
      submittedAt: 1000 + (i + 15) * 10
    }));

    const merged = ExamEngine.mergeExamHistory(local, cloud, 30);
    assert.strictEqual(merged.length, 30);
    assert.strictEqual(merged[0].id, "e_34");
    assert.strictEqual(merged[29].id, "e_5");

    const mergedAgain = ExamEngine.mergeExamHistory(merged, cloud, 30);
    assert.deepStrictEqual(mergedAgain, merged);
  });

  it("validateActiveExam loại câu không tồn tại và trả về droppedIds", () => {
    const active = {
      def: {
        id: "ex1",
        questionIds: [examPool[0].id, "deleted_q_999", examPool[1].id],
        optionOrder: {
          [examPool[0].id]: [0, 1, 2, 3],
          deleted_q_999: [0, 1, 2, 3],
          [examPool[1].id]: [0, 1, 2, 3]
        }
      },
      currentIdx: 2,
      answers: { [examPool[0].id]: 1, deleted_q_999: 0 },
      flagged: { deleted_q_999: true }
    };
    const { active: cleaned, droppedIds } = ExamEngine.validateActiveExam(active, examPool);
    assert.deepStrictEqual(droppedIds, ["deleted_q_999"]);
    assert.deepStrictEqual(cleaned.def.questionIds, [examPool[0].id, examPool[1].id]);
    assert.strictEqual(cleaned.answers.deleted_q_999, undefined);
    assert.strictEqual(cleaned.flagged.deleted_q_999, undefined);
    assert.strictEqual(cleaned.currentIdx, 1);
  });
});
