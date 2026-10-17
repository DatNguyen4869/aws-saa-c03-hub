const assert = require("assert");
const fs = require("fs");
const path = require("path");
const { loadData, ROOT } = require("./helpers/loadApp");
const ExamEngine = require("../exam-engine");

const { STUDY_DATA, EXAM_BANK, CHECKPOINTS, QuizEngine } = loadData();
const sessions = STUDY_DATA.sessions;
const lessonPool = QuizEngine.getQuizPool(sessions, EXAM_BANK, { pool: "lesson" });
const examPool = QuizEngine.getQuizPool(sessions, EXAM_BANK, { pool: "exam" });
const allQuizzes = [...lessonPool, ...examPool];

const VALID_TASKS_BY_DOMAIN = {
  1: ["1.1", "1.2", "1.3"],
  2: ["2.1", "2.2"],
  3: ["3.1", "3.2", "3.3", "3.4", "3.5"],
  4: ["4.1", "4.2", "4.3", "4.4"]
};

const DOMAIN_WEIGHTS = { 1: 0.30, 2: 0.26, 3: 0.24, 4: 0.20 };

function normText(s) {
  return String(s || "")
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();
}

function stripOptionLetter(s) {
  return String(s || "").replace(/^[A-E][.)]\s*/i, "").trim();
}

describe("Ngân hàng câu hỏi SAA-C03 – Pool Lesson & Pool Exam (P2 §8.2)", () => {
  it("pool lesson: mỗi buổi 1–56 có ≥ 5 câu; tổng ≥ 280", () => {
    for (let sid = 1; sid <= 56; sid++) {
      const s = sessions.find((x) => x.id === sid);
      assert.ok(s, `Thiếu buổi #${sid}`);
      const lessonQs = (s.quizzes || []).filter((q) => (q.pool || "lesson") === "lesson");
      assert.ok(
        lessonQs.length >= 5,
        `Buổi #${sid} chỉ có ${lessonQs.length} câu lesson (cần ≥ 5)`
      );
    }
    assert.ok(lessonPool.length >= 280, `Tổng câu lesson = ${lessonPool.length} (cần ≥ 280)`);
  });

  it("pool exam: ≥ 300 câu", () => {
    assert.ok(examPool.length >= 300, `Tổng câu exam = ${examPool.length} (cần ≥ 300)`);
  });

  it("id duy nhất toàn khóa; khớp /^(s\\d+-(q\\d{2,}|l\\d+)|x-p[1-6]-\\d{3})$/", () => {
    const seen = new Set();
    const re = /^(s\d+-(q\d{2,}|l\d+)|x-p[1-6]-\d{3})$/;
    for (const q of allQuizzes) {
      assert.ok(re.test(q.id), `ID không hợp lệ: ${q.id}`);
      assert.ok(!seen.has(q.id), `Trùng ID: ${q.id}`);
      seen.add(q.id);
    }
  });

  it("domain, task hợp lệ và task thuộc đúng domain", () => {
    for (const q of allQuizzes) {
      assert.ok([1, 2, 3, 4].includes(q.domain), `Câu ${q.id} có domain không hợp lệ: ${q.domain}`);
      const allowedTasks = VALID_TASKS_BY_DOMAIN[q.domain];
      assert.ok(
        allowedTasks.includes(q.task),
        `Câu ${q.id} có task ${q.task} không thuộc domain ${q.domain}`
      );
    }
  });

  it("sessionIds hợp lệ (1–56); câu exam ở exam-bank-k có max(sessionIds) thuộc chặng tương ứng", () => {
    for (const q of allQuizzes) {
      assert.ok(Array.isArray(q.sessionIds) && q.sessionIds.length >= 1, `Câu ${q.id} thiếu sessionIds`);
      for (const sid of q.sessionIds) {
        assert.ok(Number.isInteger(sid) && sid >= 1 && sid <= 56, `Câu ${q.id} có sessionId=${sid} ngoài 1..56`);
      }
      if (q.pool === "exam") {
        const m = q.id.match(/^x-p([1-6])-\d{3}$/);
        assert.ok(m, `ID câu exam không khớp x-p[1-6]-NNN: ${q.id}`);
        const expectedPhase = Number(m[1]);
        const actualPhase = ExamEngine.phaseOfQuiz(q, sessions);
        assert.strictEqual(
          actualPhase,
          expectedPhase,
          `Câu ${q.id} có max(sessionIds) thuộc chặng ${actualPhase}, khác chặng ${expectedPhase}`
        );
      }
    }

    const bankPhaseRanges = [
      { file: "../exam-bank-1.js", phases: [1, 2] },
      { file: "../exam-bank-2.js", phases: [3] },
      { file: "../exam-bank-3.js", phases: [4, 5] },
      { file: "../exam-bank-4.js", phases: [6] }
    ];
    for (const b of bankPhaseRanges) {
      const list = require(b.file);
      assert.ok(Array.isArray(list) && list.length > 0, `File ${b.file} rỗng`);
      for (const q of list) {
        const ph = ExamEngine.phaseOfQuiz(q, sessions);
        assert.ok(
          b.phases.includes(ph),
          `Câu ${q.id} trong ${b.file} có max(sessionIds) thuộc chặng ${ph}, cần thuộc [${b.phases.join(", ")}]`
        );
      }
    }
  });

  it("pool exam: phân bố domain lệch ≤ 5 điểm % so với 30/26/24/20", () => {
    const counts = { 1: 0, 2: 0, 3: 0, 4: 0 };
    for (const q of examPool) counts[q.domain]++;
    for (const d of [1, 2, 3, 4]) {
      const actualPct = (counts[d] / examPool.length) * 100;
      const targetPct = DOMAIN_WEIGHTS[d] * 100;
      const diff = Math.abs(actualPct - targetPct);
      assert.ok(
        diff <= 5,
        `Domain ${d} chiếm ${actualPct.toFixed(1)}% (mục tiêu ${targetPct}%, lệch ${diff.toFixed(1)} điểm %)`
      );
    }
  });

  it("pool exam: mỗi task có ≥ ceil(300 × trọng số domain / số task của domain × 0.6) câu", () => {
    const taskCounts = {};
    for (const q of examPool) {
      taskCounts[q.task] = (taskCounts[q.task] || 0) + 1;
    }
    for (const [dStr, tasks] of Object.entries(VALID_TASKS_BY_DOMAIN)) {
      const d = Number(dStr);
      const minRequired = Math.ceil((300 * DOMAIN_WEIGHTS[d] / tasks.length) * 0.6);
      for (const t of tasks) {
        const actual = taskCounts[t] || 0;
        assert.ok(
          actual >= minRequired,
          `Task ${t} (Domain ${d}) chỉ có ${actual} câu exam (cần ≥ ${minRequired})`
        );
      }
    }
  });

  it("pool exam: mỗi chặng 1–6 có đủ câu cho checkpoint của chặng đó (≥ 2 × số câu phần hiện tại)", () => {
    const phaseCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
    for (const q of examPool) {
      const ph = ExamEngine.phaseOfQuiz(q, sessions);
      if (phaseCounts[ph] !== undefined) phaseCounts[ph]++;
    }
    const minByPhase = { 1: 50, 2: 50, 3: 55, 4: 50, 5: 45, 6: 50 };
    for (const cp of CHECKPOINTS) {
      const ph = cp.phaseId;
      const currentNeed = Math.round(cp.count * cp.currentShare);
      assert.ok(
        phaseCounts[ph] >= 2 * currentNeed,
        `Chặng ${ph} có ${phaseCounts[ph]} câu exam, cần ≥ ${2 * currentNeed} (2 × ${currentNeed})`
      );
      assert.ok(
        phaseCounts[ph] >= minByPhase[ph],
        `Chặng ${ph} có ${phaseCounts[ph]} câu exam, cần ≥ ${minByPhase[ph]}`
      );
    }
  });

  it("whyWrong bắt buộc với câu mới, đúng độ dài, null đúng vị trí đáp án đúng", () => {
    const newQuizzes = allQuizzes.filter((q) => !/^s\d+-l\d+$/.test(q.id));
    for (const q of newQuizzes) {
      assert.ok(Array.isArray(q.whyWrong), `Câu mới ${q.id} thiếu whyWrong`);
      assert.strictEqual(
        q.whyWrong.length,
        q.options.length,
        `Câu ${q.id}: whyWrong.length (${q.whyWrong.length}) !== options.length (${q.options.length})`
      );
      const cSet = new Set(QuizEngine.correctSet(q));
      q.whyWrong.forEach((reason, idx) => {
        if (cSet.has(idx)) {
          assert.strictEqual(reason, null, `Câu ${q.id}: whyWrong[${idx}] của phương án đúng phải là null`);
        } else {
          assert.ok(
            typeof reason === "string" && reason.trim().length >= 10,
            `Câu ${q.id}: whyWrong[${idx}] của phương án sai phải là chuỗi giải thích rõ ràng`
          );
        }
      });
    }
  });

  it("correctIdxs đúng 2 phần tử phân biệt; pool exam có 10–20% câu Choose TWO", () => {
    let examMultiCount = 0;
    for (const q of allQuizzes) {
      if (Array.isArray(q.correctIdxs)) {
        assert.strictEqual(q.correctIdxs.length, 2, `Câu Choose TWO ${q.id} phải có đúng 2 đáp án đúng`);
        assert.notStrictEqual(q.correctIdxs[0], q.correctIdxs[1], `Câu ${q.id} có correctIdxs trùng nhau`);
        assert.strictEqual(q.options.length, 5, `Câu Choose TWO ${q.id} phải có 5 phương án A–E`);
        for (const c of q.correctIdxs) {
          assert.ok(c >= 0 && c < q.options.length, `Câu ${q.id} có correctIdxs ngoài phạm vi`);
        }
        if (q.pool === "exam") examMultiCount++;
      } else {
        assert.strictEqual(q.options.length, 4, `Câu 1 đáp án ${q.id} phải có 4 phương án A–D`);
        assert.ok(
          Number.isInteger(q.correctIdx) && q.correctIdx >= 0 && q.correctIdx < 4,
          `Câu ${q.id} có correctIdx không hợp lệ`
        );
      }
    }
    const examMultiPct = (examMultiCount / examPool.length) * 100;
    assert.ok(
      examMultiPct >= 10 && examMultiPct <= 20,
      `Tỷ lệ Choose TWO trong pool exam là ${examMultiPct.toFixed(1)}% (cần 10–20%)`
    );
  });

  it("không trùng qEn (chuẩn hóa) giữa và trong 2 pool", () => {
    const seen = new Map();
    for (const q of allQuizzes) {
      const k = normText(q.qEn);
      assert.ok(!seen.has(k), `Trùng qEn giữa ${seen.get(k)} và ${q.id}`);
      seen.set(k, q.id);
    }
  });

  it("vị trí đáp án đúng A–D mỗi vị trí 15–35% (mỗi pool)", () => {
    for (const [label, pool] of [["lesson", lessonPool], ["exam", examPool]]) {
      const singles = pool.filter((q) => !Array.isArray(q.correctIdxs));
      const posCounts = [0, 0, 0, 0];
      for (const q of singles) {
        posCounts[q.correctIdx]++;
      }
      posCounts.forEach((cnt, idx) => {
        const pct = (cnt / singles.length) * 100;
        assert.ok(
          pct >= 15 && pct <= 35,
          `Pool ${label}: vị trí ${["A", "B", "C", "D"][idx]} chiếm ${pct.toFixed(1)}% (cần 15–35%)`
        );
      });
    }
  });

  it("đáp án đúng là phương án dài nhất ở ≤ 45% số câu (mỗi pool)", () => {
    for (const [label, pool] of [["lesson", lessonPool], ["exam", examPool]]) {
      let longestIsCorrect = 0;
      for (const q of pool) {
        const lengths = q.options.map((o) => stripOptionLetter(o).length);
        const maxLen = Math.max(...lengths);
        const cSet = new Set(QuizEngine.correctSet(q));
        const correctHasMax = [...cSet].some((idx) => lengths[idx] === maxLen);
        const wrongHasMax = q.options.some((_, idx) => !cSet.has(idx) && lengths[idx] === maxLen);
        if (correctHasMax && !wrongHasMax) {
          longestIsCorrect++;
        }
      }
      const pct = (longestIsCorrect / pool.length) * 100;
      assert.ok(
        pct <= 45,
        `Pool ${label}: đáp án đúng dài nhất ở ${pct.toFixed(1)}% số câu (cần ≤ 45%)`
      );
    }
  });

  it("pool exam: độ dài qEn trung vị 60–180 từ", () => {
    const wordCounts = examPool
      .map((q) => String(q.qEn || "").trim().split(/\s+/).filter(Boolean).length)
      .sort((a, b) => a - b);
    const mid = Math.floor(wordCounts.length / 2);
    const median =
      wordCounts.length % 2 === 1
        ? wordCounts[mid]
        : (wordCounts[mid - 1] + wordCounts[mid]) / 2;
    assert.ok(
      median >= 60 && median <= 180,
      `Trung vị số từ qEn của pool exam là ${median} (cần 60–180 từ)`
    );
  });

  it("mỗi chủ đề G01–G12 có ≥ 1 câu lesson và ≥ 1 câu exam", () => {
    const TOPIC_REGEXES = {
      G01: /Directory Service|AD Connector|Managed Microsoft AD/i,
      G02: /Client VPN|CloudHub|Route 53 Resolver/i,
      G03: /X-Ray|Logs Insights|Metric Filter/i,
      G04: /\bRCU\b|\bWCU\b|4\s*KB|1\s*KB/i,
      G05: /Block Public Access|Object Ownership|MFA Delete/i,
      G06: /\bMSK\b|Managed Streaming for Apache Kafka/i,
      G07: /SageMaker|Bedrock/i,
      G08: /Destinations|Dead[- ]Letter|\bDLQ\b|ReportBatchItemFailures/i,
      G09: /Step Functions|Express Workflow|HTTP API|29\s*(s|giây|seconds)/i,
      G10: /IP-based/i,
      G11: /Shared Responsibility|Well-Architected/i,
      G12: /Resource Control Polic|\bRCPs?\b|Management Account/i
    };

    for (const [gid, re] of Object.entries(TOPIC_REGEXES)) {
      const hasLesson = lessonPool.some((q) =>
        re.test([q.qEn, q.qVi, ...(q.options || []), q.explanation, ...(q.tags || [])].join(" "))
      );
      const hasExam = examPool.some((q) =>
        re.test([q.qEn, q.qVi, ...(q.options || []), q.explanation, ...(q.tags || [])].join(" "))
      );
      assert.ok(hasLesson, `Chủ đề ${gid} chưa có câu hỏi nào trong pool lesson`);
      assert.ok(hasExam, `Chủ đề ${gid} chưa có câu hỏi nào trong pool exam`);
    }
  });

  it("116 câu cũ giữ nguyên thứ tự và qEn (snapshot)", () => {
    const snapshotPath = path.join(ROOT, "tests", "fixtures", "legacy-quiz-ids.json");
    const snapshot = JSON.parse(fs.readFileSync(snapshotPath, "utf8"));
    assert.strictEqual(snapshot.length, 116);

    for (const item of snapshot) {
      const s = sessions.find((x) => x.id === item.sessionId);
      assert.ok(s, `Thiếu buổi #${item.sessionId}`);
      const idx = item.idx !== undefined ? item.idx : item.index;
      const q = s.quizzes[idx];
      assert.ok(q, `Thiếu câu index ${idx} ở buổi #${item.sessionId}`);
      assert.strictEqual(q.id, item.id, `Câu cũ tại buổi #${item.sessionId}[${idx}] bị đổi ID`);
      assert.strictEqual(q.qEn, item.qEn, `Câu cũ ${item.id} bị thay đổi qEn`);
    }
  });
});
