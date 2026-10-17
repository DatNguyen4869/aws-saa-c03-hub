const assert = require("assert");
const { loadData } = require("./helpers/loadApp");
const ExamEngine = require("../exam-engine");

const { STUDY_DATA, EXAM_BANK, CHECKPOINTS, QuizEngine } = loadData();
const sessions = STUDY_DATA.sessions;
const examPool = QuizEngine.getQuizPool(sessions, EXAM_BANK, { pool: "exam" });

describe("Checkpoint cuối mỗi chặng – Data & Engine (P5 §8.1)", () => {
  it("CHECKPOINTS có 6 mục, afterSessionId = buổi cuối của chặng tương ứng (10/19/28/36/43/51), tăng dần", () => {
    assert.strictEqual(CHECKPOINTS.length, 6);
    const expectedAfter = [10, 19, 28, 36, 43, 51];
    CHECKPOINTS.forEach((cp, idx) => {
      assert.strictEqual(cp.id, `cp${idx + 1}`);
      assert.strictEqual(cp.phaseId, idx + 1);
      assert.strictEqual(cp.afterSessionId, expectedAfter[idx]);

      const phaseSessions = sessions.filter((s) => s.phase === cp.phaseId);
      const maxSid = Math.max(...phaseSessions.map((s) => s.id));
      assert.strictEqual(cp.afterSessionId, maxSid);
    });
  });

  it("minutes = 2 × count; 0 < currentShare ≤ 1; passPct = 0.7", () => {
    for (const cp of CHECKPOINTS) {
      assert.strictEqual(cp.minutes, 2 * cp.count);
      assert.ok(cp.currentShare > 0 && cp.currentShare <= 1);
      assert.strictEqual(cp.passPct, 0.7);
    }
  });

  it("buildCheckpointExam: mọi câu được chọn có max(sessionIds) ≤ afterSessionId (chạy cho cả 6 CP với dữ liệu thật)", () => {
    const byId = new Map(examPool.map((q) => [q.id, q]));
    for (const cp of CHECKPOINTS) {
      const { def, warnings } = ExamEngine.buildCheckpointExam(examPool, cp, sessions, {
        seed: 100 + cp.phaseId,
        now: 1000
      });
      assert.strictEqual(def.mode, "checkpoint");
      assert.strictEqual(def.cpId, cp.id);
      assert.strictEqual(def.questionIds.length, cp.count);
      assert.strictEqual(warnings.length, 0);

      for (const qid of def.questionIds) {
        const q = byId.get(qid);
        assert.ok(q, `Không tìm thấy câu ${qid}`);
        const maxSid = Math.max(...q.sessionIds);
        assert.ok(
          maxSid <= cp.afterSessionId,
          `${cp.id}: câu ${qid} có max(sessionIds)=${maxSid} > afterSessionId=${cp.afterSessionId}`
        );
      }
    }
  });

  it("số câu phần hiện tại = round(count × currentShare) (±1) và phần chặng trước chia đều các chặng trước (lệch ≤ 1 câu)", () => {
    const byId = new Map(examPool.map((q) => [q.id, q]));
    for (const cp of CHECKPOINTS) {
      const { def } = ExamEngine.buildCheckpointExam(examPool, cp, sessions, {
        seed: 555,
        now: 1000
      });
      const expectedCurrent = Math.round(cp.count * cp.currentShare);
      const expectedPrior = cp.count - expectedCurrent;

      const phaseCounts = {};
      for (const qid of def.questionIds) {
        const ph = ExamEngine.phaseOfQuiz(byId.get(qid), sessions);
        phaseCounts[ph] = (phaseCounts[ph] || 0) + 1;
      }

      const actualCurrent = phaseCounts[cp.phaseId] || 0;
      assert.ok(
        Math.abs(actualCurrent - expectedCurrent) <= 1,
        `${cp.id}: số câu chặng hiện tại=${actualCurrent}, kỳ vọng=${expectedCurrent}`
      );

      if (cp.phaseId > 1) {
        const priorPhasesCount = cp.phaseId - 1;
        const avgPerPrior = expectedPrior / priorPhasesCount;
        for (let p = 1; p < cp.phaseId; p++) {
          const cnt = phaseCounts[p] || 0;
          assert.ok(
            Math.abs(cnt - avgPerPrior) <= 1.5,
            `${cp.id}: chặng trước ${p} có ${cnt} câu, trung bình=${avgPerPrior.toFixed(1)}`
          );
        }
      }
    }
  });

  it("phân bố domain mỗi phần theo allocateByDomain (lệch ≤ 1)", () => {
    const byId = new Map(examPool.map((q) => [q.id, q]));
    const cp = CHECKPOINTS[0]; // CP1: 20 câu
    const { def } = ExamEngine.buildCheckpointExam(examPool, cp, sessions, { seed: 42, now: 1000 });
    const expected = ExamEngine.allocateByDomain(cp.count, ExamEngine.DOMAIN_WEIGHTS);
    const actual = { 1: 0, 2: 0, 3: 0, 4: 0 };
    for (const qid of def.questionIds) {
      actual[byId.get(qid).domain]++;
    }
    for (const d of [1, 2, 3, 4]) {
      assert.ok(Math.abs(actual[d] - expected[d]) <= 1);
    }
  });

  it("cùng seed → cùng đề; excludeIds được tôn trọng khi pool đủ; pool thiếu → giảm count + warning, không throw", () => {
    const cp = CHECKPOINTS[1];
    const b1 = ExamEngine.buildCheckpointExam(examPool, cp, sessions, { seed: 88, now: 1000 });
    const b2 = ExamEngine.buildCheckpointExam(examPool, cp, sessions, { seed: 88, now: 2000 });
    assert.deepStrictEqual(b1.def.questionIds, b2.def.questionIds);

    const b3 = ExamEngine.buildCheckpointExam(examPool, cp, sessions, {
      seed: 89,
      excludeIds: b1.def.questionIds,
      now: 3000
    });
    const overlap = b3.def.questionIds.filter((id) => b1.def.questionIds.includes(id));
    assert.strictEqual(overlap.length, 0);

    const tinyPool = examPool.slice(0, 5);
    const bTiny = ExamEngine.buildCheckpointExam(tinyPool, cp, sessions, { seed: 1, now: 1000 });
    assert.ok(bTiny.def.questionIds.length <= 5);
    assert.ok(bTiny.warnings.length >= 1);
  });

  it("priorWeakDomains tăng tối đa +2 câu cho domain yếu ở phần chặng trước", () => {
    const byId = new Map(examPool.map((q) => [q.id, q]));
    const cp = CHECKPOINTS[3]; // CP4: 30 câu, prior = 12 câu
    const normal = ExamEngine.buildCheckpointExam(examPool, cp, sessions, {
      seed: 321,
      priorWeakDomains: [],
      now: 1000
    });
    const boosted = ExamEngine.buildCheckpointExam(examPool, cp, sessions, {
      seed: 321,
      priorWeakDomains: [4],
      now: 1000
    });

    const countPriorD4 = (def) =>
      def.questionIds
        .map((id) => byId.get(id))
        .filter((q) => ExamEngine.phaseOfQuiz(q, sessions) < cp.phaseId && q.domain === 4).length;

    const d4Normal = countPriorD4(normal.def);
    const d4Boosted = countPriorD4(boosted.def);
    assert.ok(d4Boosted >= d4Normal && d4Boosted - d4Normal <= 2);
  });

  it("weakSessions xếp hạng đúng theo số câu sai", () => {
    const sampleQuizzes = {
      q1: { id: "q1", sessionIds: [3, 14] },
      q2: { id: "q2", sessionIds: [14] },
      q3: { id: "q3", sessionIds: [3] },
      q4: { id: "q4", sessionIds: [14] },
      q5: { id: "q5", sessionIds: [8] }
    };
    const fakeResult = {
      questionIds: ["q1", "q2", "q3", "q4", "q5"],
      wrongIds: ["q1", "q2", "q4"],
      unansweredIds: []
    };
    const weak = ExamEngine.weakSessions(fakeResult, sampleQuizzes, 5);
    assert.strictEqual(weak[0].sessionId, 14);
    assert.strictEqual(weak[0].wrong, 3);
    assert.strictEqual(weak[1].sessionId, 3);
    assert.strictEqual(weak[1].wrong, 1);
  });

  it("dữ liệu thật: mỗi chặng đủ số câu exam tối thiểu (50/50/55/50/45/50) và ≥ 2× số câu cần cho phần hiện tại", () => {
    const minRequired = { 1: 50, 2: 50, 3: 55, 4: 50, 5: 45, 6: 50 };
    const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
    for (const q of examPool) {
      const ph = ExamEngine.phaseOfQuiz(q, sessions);
      if (counts[ph] !== undefined) counts[ph]++;
    }
    for (const cp of CHECKPOINTS) {
      const ph = cp.phaseId;
      const currentNeed = Math.round(cp.count * cp.currentShare);
      assert.ok(counts[ph] >= minRequired[ph]);
      assert.ok(counts[ph] >= 2 * currentNeed);
    }
  });
});
