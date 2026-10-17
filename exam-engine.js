// exam-engine.js — Logic thuần cho chế độ Thi thử (Spec P3) và Checkpoint cuối chặng (Spec P5).
// Không phụ thuộc DOM; dùng chung cho trình duyệt (window.ExamEngine) và Node test (module.exports).

(function (root) {
  "use strict";

  const QuizEngineRef =
    (root && root.QuizEngine) ||
    (typeof require === "function" ? require("./quiz-engine.js") : null);

  const DOMAIN_WEIGHTS = { 1: 0.30, 2: 0.26, 3: 0.24, 4: 0.20 };
  const PRESETS = {
    full: { count: 65, minutes: 130 },
    quick: { count: 20, minutes: 40 }
  };

  /**
   * Mulberry32 deterministic PRNG returning numbers in [0, 1).
   * @param {number} seed
   * @returns {() => number}
   */
  function createRng(seed) {
    let a = (typeof seed === "number" && !Number.isNaN(seed) ? seed : 1) >>> 0;
    return function () {
      a |= 0;
      a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function shuffleWithRng(arr, rng) {
    const out = [...arr];
    for (let i = out.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      const tmp = out[i];
      out[i] = out[j];
      out[j] = tmp;
    }
    return out;
  }

  /**
   * Phân bổ số câu theo 4 domain bằng phương pháp phần dư lớn nhất (largest remainder).
   * Nếu truyền availableByDomain và một domain không đủ câu, tự động bù từ các domain còn dư.
   */
  function allocateByDomain(count, weights = DOMAIN_WEIGHTS, availableByDomain = null) {
    const domains = [1, 2, 3, 4];
    const targetTotal = Math.max(0, Math.floor(count || 0));
    if (targetTotal === 0) {
      return { 1: 0, 2: 0, 3: 0, 4: 0 };
    }

    const wSum = domains.reduce((acc, d) => acc + (Number(weights[d]) || 0), 0) || 1;
    const raw = {};
    const alloc = {};
    const rem = {};

    let currentSum = 0;
    for (const d of domains) {
      // Round to 9 decimals to avoid IEEE 754 float artifacts (e.g. 65 * 0.20 = 13.000000000000002)
      const exact = Math.round(((targetTotal * (Number(weights[d]) || 0)) / wSum) * 1e9) / 1e9;
      raw[d] = exact;
      alloc[d] = Math.floor(exact);
      rem[d] = exact - alloc[d];
      currentSum += alloc[d];
    }

    let remainderNeeded = targetTotal - currentSum;
    const sortedByRem = [...domains].sort((a, b) => {
      if (Math.abs(rem[b] - rem[a]) > 1e-9) return rem[b] - rem[a];
      return (weights[b] || 0) - (weights[a] || 0);
    });

    for (let i = 0; i < remainderNeeded; i++) {
      const d = sortedByRem[i % sortedByRem.length];
      alloc[d]++;
    }

    if (availableByDomain) {
      let deficit = 0;
      for (const d of domains) {
        const avail = Math.max(0, Math.floor(availableByDomain[d] ?? Infinity));
        if (alloc[d] > avail) {
          deficit += alloc[d] - avail;
          alloc[d] = avail;
        }
      }

      while (deficit > 0) {
        const candidates = domains
          .filter((d) => {
            const avail = Math.max(0, Math.floor(availableByDomain[d] ?? Infinity));
            return alloc[d] < avail;
          })
          .sort((a, b) => (weights[b] || 0) - (weights[a] || 0));

        if (candidates.length === 0) break;
        for (const d of candidates) {
          if (deficit <= 0) break;
          const avail = Math.max(0, Math.floor(availableByDomain[d] ?? Infinity));
          if (alloc[d] < avail) {
            alloc[d]++;
            deficit--;
          }
        }
      }
    }

    return alloc;
  }

  function buildOptionOrderForQuestions(questions, rng) {
    const optionOrder = {};
    for (const q of questions) {
      const len = Array.isArray(q.options) ? q.options.length : 4;
      const indices = Array.from({ length: len }, (_, idx) => idx);
      optionOrder[q.id] = shuffleWithRng(indices, rng);
    }
    return optionOrder;
  }

  function filterExamCandidates(pool) {
    if (!Array.isArray(pool) || pool.length === 0) return [];
    const hasExamTag = pool.some((q) => q && q.pool === "exam");
    const filtered = hasExamTag ? pool.filter((q) => q && q.pool === "exam") : pool.filter(Boolean);
    const seen = new Set();
    const out = [];
    for (const q of filtered) {
      if (!q.id || seen.has(q.id)) continue;
      seen.add(q.id);
      out.push(q);
    }
    return out;
  }

  function pickQuestionsByDomain(freshList, seenList, targetCount, rng, weights = DOMAIN_WEIGHTS) {
    const freshByDomain = { 1: [], 2: [], 3: [], 4: [] };
    const seenByDomain = { 1: [], 2: [], 3: [], 4: [] };

    for (const q of freshList) {
      const d = [1, 2, 3, 4].includes(Number(q.domain)) ? Number(q.domain) : 1;
      freshByDomain[d].push(q);
    }
    for (const q of seenList) {
      const d = [1, 2, 3, 4].includes(Number(q.domain)) ? Number(q.domain) : 1;
      seenByDomain[d].push(q);
    }

    for (const d of [1, 2, 3, 4]) {
      freshByDomain[d] = shuffleWithRng(freshByDomain[d], rng);
      seenByDomain[d] = shuffleWithRng(seenByDomain[d], rng);
    }

    const totalFresh = freshList.length;
    const totalAvail = totalFresh + seenList.length;
    const effectiveCount = Math.min(targetCount, totalAvail);

    // If fresh questions alone can satisfy effectiveCount, only use fresh questions!
    const useOnlyFresh = totalFresh >= effectiveCount;
    const availByDomain = {};
    for (const d of [1, 2, 3, 4]) {
      availByDomain[d] = useOnlyFresh
        ? freshByDomain[d].length
        : freshByDomain[d].length + seenByDomain[d].length;
    }

    const quotas = allocateByDomain(effectiveCount, weights, availByDomain);
    const selected = [];
    let reusedCount = 0;

    for (const d of [1, 2, 3, 4]) {
      const need = quotas[d] || 0;
      const fromFresh = freshByDomain[d].slice(0, need);
      selected.push(...fromFresh);
      const rem = need - fromFresh.length;
      if (rem > 0 && !useOnlyFresh) {
        const fromSeen = seenByDomain[d].slice(0, rem);
        selected.push(...fromSeen);
        reusedCount += fromSeen.length;
      }
    }

    return {
      selected: shuffleWithRng(selected, rng),
      reusedCount,
      effectiveCount
    };
  }

  /**
   * Tạo đề thi thử (full, quick, section, retry).
   */
  function buildExam(
    pool,
    {
      mode = "full",
      count,
      minutes,
      seed,
      source = "all",
      excludeIds = [],
      label,
      now,
      cpId
    } = {}
  ) {
    const preset = PRESETS[mode] || PRESETS.full;
    const requestedCount = Number.isInteger(count) && count > 0 ? count : preset.count;
    const requestedMinutes = Number.isFinite(minutes) && minutes > 0 ? minutes : preset.minutes;
    const nowTs = typeof now === "number" ? now : Date.now();
    const finalSeed =
      typeof seed === "number" && !Number.isNaN(seed)
        ? seed >>> 0
        : (nowTs ^ Math.floor(Math.random() * 0xffffffff)) >>> 0;

    const rng = createRng(finalSeed);
    const warnings = [];
    const candidates = filterExamCandidates(pool);
    const excludeSet = new Set(Array.isArray(excludeIds) ? excludeIds : []);

    const freshList = candidates.filter((q) => !excludeSet.has(q.id));
    const seenList = candidates.filter((q) => excludeSet.has(q.id));

    if (candidates.length < requestedCount) {
      warnings.push(
        `Ngân hàng câu hỏi hiện có ${candidates.length}/${requestedCount} câu phù hợp. Đề thi đã được điều chỉnh về ${candidates.length} câu.`
      );
    }

    const { selected, reusedCount } = pickQuestionsByDomain(
      freshList,
      seenList,
      requestedCount,
      rng,
      DOMAIN_WEIGHTS
    );

    if (reusedCount > 0) {
      warnings.push(`Đề có ${reusedCount} câu bạn đã gặp ở các lần thi trước.`);
    }

    const optionOrder = buildOptionOrderForQuestions(selected, rng);
    const questionIds = selected.map((q) => q.id);
    const effectiveMinutes =
      candidates.length < requestedCount && requestedCount > 0
        ? Math.max(1, Math.round((selected.length / requestedCount) * requestedMinutes))
        : requestedMinutes;

    const defaultLabel =
      label ||
      (mode === "quick"
        ? `Đề nhanh (${questionIds.length} câu)`
        : `Đề thi thử SAA-C03 (${questionIds.length} câu)`);

    const def = {
      id: `exam_${mode}_${finalSeed}_${nowTs}`,
      mode,
      seed: finalSeed,
      questionIds,
      optionOrder,
      durationMs: effectiveMinutes * 60 * 1000,
      createdAt: nowTs,
      source,
      label: defaultLabel
    };
    if (cpId) def.cpId = cpId;

    return { def, warnings };
  }

  /**
   * Ánh xạ các buổi 57..80 sang Đề số 1..6, phần 0..3 (16/16/16/17 câu).
   */
  function examRefForSession(sessionId) {
    const sid = Number(sessionId);
    if (!Number.isInteger(sid) || sid < 57 || sid > 80) return null;
    const offset = sid - 57;
    const examNo = Math.floor(offset / 4) + 1;
    const part = offset % 4;
    const bounds = [
      { from: 1, to: 16, count: 16 },
      { from: 17, to: 32, count: 16 },
      { from: 33, to: 48, count: 16 },
      { from: 49, to: 65, count: 17 }
    ][part];

    return {
      examNo,
      part,
      from: bounds.from,
      to: bounds.to,
      count: bounds.count
    };
  }

  /**
   * Tạo đề cố định cho buổi 57..80 (seed = 1000 + examNo, không loại câu đã gặp để giữ tính tái lập).
   */
  function buildSectionExam(pool, sessionId, now) {
    const ref = examRefForSession(sessionId);
    if (!ref) return null;
    const nowTs = typeof now === "number" ? now : Date.now();
    const fixedSeed = 1000 + ref.examNo;

    const full = buildExam(pool, {
      mode: "full",
      count: 65,
      minutes: 130,
      seed: fixedSeed,
      source: "all",
      excludeIds: [],
      now: nowTs
    });

    const sliceIds = full.def.questionIds.slice(ref.from - 1, ref.to);
    const sliceOptionOrder = {};
    for (const qid of sliceIds) {
      sliceOptionOrder[qid] = full.def.optionOrder[qid];
    }

    const minutes = sliceIds.length * 2;
    const def = {
      id: `exam_section_s${sessionId}_${fixedSeed}_${nowTs}`,
      mode: "section",
      seed: fixedSeed,
      sessionId: Number(sessionId),
      examNo: ref.examNo,
      part: ref.part,
      questionIds: sliceIds,
      optionOrder: sliceOptionOrder,
      durationMs: minutes * 60 * 1000,
      createdAt: nowTs,
      source: "all",
      label: `Đề thi số ${ref.examNo} – Phần ${ref.part + 1} (Câu ${ref.from}–${ref.to})`
    };

    return { def, warnings: full.warnings, ref };
  }

  function startExam(def, now) {
    const startedAt = typeof now === "number" ? now : Date.now();
    return {
      def,
      startedAt,
      endsAt: startedAt + (def.durationMs || 0),
      currentIdx: 0,
      answers: {},
      flagged: {},
      version: 1
    };
  }

  function answerQuestion(active, qid, choice) {
    const nextAnswers = { ...(active.answers || {}) };
    if (
      choice === null ||
      choice === undefined ||
      (Array.isArray(choice) && choice.length === 0)
    ) {
      delete nextAnswers[qid];
    } else if (Array.isArray(choice)) {
      nextAnswers[qid] = [...new Set(choice.map(Number))].sort((a, b) => a - b);
    } else {
      nextAnswers[qid] = Number(choice);
    }
    return {
      ...active,
      answers: nextAnswers
    };
  }

  function toggleFlag(active, qid) {
    const nextFlagged = { ...(active.flagged || {}) };
    if (nextFlagged[qid]) {
      delete nextFlagged[qid];
    } else {
      nextFlagged[qid] = true;
    }
    return {
      ...active,
      flagged: nextFlagged
    };
  }

  function goTo(active, idx) {
    const total = active?.def?.questionIds?.length || 0;
    const maxIdx = Math.max(0, total - 1);
    const clamped = Math.min(maxIdx, Math.max(0, Math.floor(Number(idx) || 0)));
    return {
      ...active,
      currentIdx: clamped
    };
  }

  function remainingMs(active, now) {
    const nowTs = typeof now === "number" ? now : Date.now();
    return Math.max(0, (active?.endsAt || 0) - nowTs);
  }

  function isExpired(active, now) {
    return remainingMs(active, now) <= 0;
  }

  function scaledScore(pct) {
    const clamped = Math.min(1, Math.max(0, Number(pct) || 0));
    return Math.round(100 + 900 * clamped);
  }

  function resolveQuizLookup(quizById) {
    if (typeof quizById === "function") return quizById;
    if (quizById instanceof Map) return (id) => quizById.get(id);
    if (Array.isArray(quizById)) {
      const map = new Map(quizById.filter(Boolean).map((q) => [q.id, q]));
      return (id) => map.get(id);
    }
    if (quizById && typeof quizById === "object") {
      return (id) => quizById[id];
    }
    return () => null;
  }

  function checkQuizCorrect(q, ans) {
    if (QuizEngineRef && typeof QuizEngineRef.isCorrect === "function") {
      return QuizEngineRef.isCorrect(q, ans);
    }
    if (Array.isArray(q.correctIdxs)) {
      if (!Array.isArray(ans) || ans.length !== q.correctIdxs.length) return false;
      const a = [...ans].sort((x, y) => x - y);
      const b = [...q.correctIdxs].sort((x, y) => x - y);
      return a.every((v, i) => v === b[i]);
    }
    return typeof ans === "number" && ans === q.correctIdx;
  }

  function scoreExam(active, quizById, { now, autoSubmitted = false } = {}) {
    const getQuiz = resolveQuizLookup(quizById);
    const submittedAt = typeof now === "number" ? now : Date.now();
    const startedAt = active?.startedAt || submittedAt;
    const durationUsedMs = Math.max(0, Math.min(active?.def?.durationMs || Infinity, submittedAt - startedAt));

    const byDomain = {
      1: { total: 0, correct: 0, pct: 0 },
      2: { total: 0, correct: 0, pct: 0 },
      3: { total: 0, correct: 0, pct: 0 },
      4: { total: 0, correct: 0, pct: 0 }
    };

    const questionIds = [...(active?.def?.questionIds || [])];
    const wrongIds = [];
    const flaggedIds = [];
    const unansweredIds = [];

    let total = 0;
    let correct = 0;

    const currentSet = new Set(active?.def?.currentPhaseIds || []);
    const priorSet = new Set(active?.def?.priorPhaseIds || []);
    const byPhaseGroup = {
      current: { total: 0, correct: 0, pct: 0 },
      prior: { total: 0, correct: 0, pct: 0 }
    };

    for (const qid of questionIds) {
      const q = getQuiz(qid);
      if (!q) continue;
      total++;
      const d = [1, 2, 3, 4].includes(Number(q.domain)) ? Number(q.domain) : 1;
      byDomain[d].total++;

      if (active?.flagged && active.flagged[qid]) {
        flaggedIds.push(qid);
      }

      const ans = active?.answers ? active.answers[qid] : undefined;
      const isUnanswered =
        ans === undefined ||
        ans === null ||
        (Array.isArray(ans) && ans.length === 0);

      const isRight = !isUnanswered && checkQuizCorrect(q, ans);

      if (isUnanswered) {
        unansweredIds.push(qid);
      } else if (isRight) {
        correct++;
        byDomain[d].correct++;
      } else {
        wrongIds.push(qid);
      }

      if (currentSet.has(qid)) {
        byPhaseGroup.current.total++;
        if (isRight) byPhaseGroup.current.correct++;
      } else if (priorSet.has(qid)) {
        byPhaseGroup.prior.total++;
        if (isRight) byPhaseGroup.prior.correct++;
      }
    }

    for (const d of [1, 2, 3, 4]) {
      byDomain[d].pct =
        byDomain[d].total > 0
          ? Math.round((byDomain[d].correct / byDomain[d].total) * 1000) / 1000
          : 0;
    }
    byPhaseGroup.current.pct =
      byPhaseGroup.current.total > 0
        ? Math.round((byPhaseGroup.current.correct / byPhaseGroup.current.total) * 1000) / 1000
        : 0;
    byPhaseGroup.prior.pct =
      byPhaseGroup.prior.total > 0
        ? Math.round((byPhaseGroup.prior.correct / byPhaseGroup.prior.total) * 1000) / 1000
        : 0;

    const pct = total > 0 ? Math.round((correct / total) * 10000) / 10000 : 0;
    const scaled = scaledScore(pct);

    const result = {
      id: `res_${active?.def?.id || submittedAt}_${submittedAt}`,
      examId: active?.def?.id,
      label: active?.def?.label || "Bài thi thử SAA-C03",
      mode: active?.def?.mode || "full",
      seed: active?.def?.seed || 1,
      startedAt,
      submittedAt,
      durationUsedMs,
      total,
      correct,
      pct,
      scaledScore: scaled,
      passedEstimate: scaled >= 720,
      autoSubmitted: Boolean(autoSubmitted),
      byDomain,
      questionIds,
      answers: { ...(active?.answers || {}) },
      optionOrder: { ...(active?.def?.optionOrder || {}) },
      wrongIds,
      flaggedIds,
      unansweredIds
    };

    if (active?.def?.cpId) {
      result.cpId = active.def.cpId;
      result.byPhaseGroup = byPhaseGroup;
    }

    return result;
  }

  /**
   * Tạo đề làm lại chỉ gồm các câu sai và chưa làm từ một ExamResult.
   */
  function buildRetryExam(result, pool, now) {
    const nowTs = typeof now === "number" ? now : Date.now();
    const targetIds = [
      ...new Set([...(result?.wrongIds || []), ...(result?.unansweredIds || [])])
    ];
    const lookup = resolveQuizLookup(pool);
    const questions = targetIds.map((id) => lookup(id)).filter(Boolean);
    const seed = ((result?.seed || 1) + 7919) >>> 0;
    const rng = createRng(seed);
    const shuffled = shuffleWithRng(questions, rng);
    const optionOrder = buildOptionOrderForQuestions(shuffled, rng);
    const qIds = shuffled.map((q) => q.id);
    const minutes = Math.max(1, qIds.length * 2);

    const def = {
      id: `exam_retry_${seed}_${nowTs}`,
      mode: "retry",
      seed,
      questionIds: qIds,
      optionOrder,
      durationMs: minutes * 60 * 1000,
      createdAt: nowTs,
      source: "all",
      label: `Làm lại câu sai (${qIds.length} câu)`
    };

    return { def, warnings: [] };
  }

  /**
   * Gộp lịch sử thi từ local và cloud: union theo id, sort submittedAt giảm dần, cắt tối đa cap.
   */
  function mergeExamHistory(local = [], cloud = [], cap = 30) {
    const map = new Map();
    const listA = Array.isArray(local) ? local : [];
    const listB = Array.isArray(cloud) ? cloud : [];

    for (const item of [...listA, ...listB]) {
      if (!item || !item.id) continue;
      const existing = map.get(item.id);
      if (!existing || (item.submittedAt || 0) >= (existing.submittedAt || 0)) {
        map.set(item.id, item);
      }
    }

    return [...map.values()]
      .sort((a, b) => (b.submittedAt || 0) - (a.submittedAt || 0))
      .slice(0, Math.max(1, cap));
  }

  /**
   * Loại bỏ các câu hỏi không còn tồn tại trong ngân hàng khi khôi phục bài đang làm.
   */
  function validateActiveExam(active, quizById) {
    if (!active || !active.def || !Array.isArray(active.def.questionIds)) {
      return { active: null, droppedIds: [] };
    }
    const getQuiz = resolveQuizLookup(quizById);
    const validIds = [];
    const droppedIds = [];

    for (const qid of active.def.questionIds) {
      if (getQuiz(qid)) {
        validIds.push(qid);
      } else {
        droppedIds.push(qid);
      }
    }

    if (droppedIds.length === 0) {
      return { active, droppedIds: [] };
    }

    const nextOptionOrder = { ...(active.def.optionOrder || {}) };
    const nextAnswers = { ...(active.answers || {}) };
    const nextFlagged = { ...(active.flagged || {}) };
    for (const badId of droppedIds) {
      delete nextOptionOrder[badId];
      delete nextAnswers[badId];
      delete nextFlagged[badId];
    }

    const nextDef = {
      ...active.def,
      questionIds: validIds,
      optionOrder: nextOptionOrder
    };

    const nextIdx = Math.min(
      Math.max(0, ValidIdxClamp(active.currentIdx, validIds.length)),
      Math.max(0, validIds.length - 1)
    );

    return {
      active: {
        ...active,
        def: nextDef,
        currentIdx: nextIdx,
        answers: nextAnswers,
        flagged: nextFlagged
      },
      droppedIds
    };
  }

  function ValidIdxClamp(idx, len) {
    if (len <= 0) return 0;
    return Math.min(len - 1, Math.max(0, Number(idx) || 0));
  }

  // ==========================================================================
  // SPEC P5: CHECKPOINT FUNCTIONS (phaseOfQuiz, buildCheckpointExam, weakSessions)
  // ==========================================================================

  /**
   * Chặng của một câu = chặng chứa max(sessionIds).
   */
  function phaseOfQuiz(quiz, sessions) {
    const sids = Array.isArray(quiz?.sessionIds) && quiz.sessionIds.length > 0 ? quiz.sessionIds : [1];
    const maxSid = Math.max(...sids.map(Number));

    if (Array.isArray(sessions) && sessions.length > 0) {
      const found = sessions.find((s) => Number(s.id) === maxSid);
      if (found && Number.isInteger(found.phase)) {
        return found.phase;
      }
    }

    if (maxSid <= 10) return 1;
    if (maxSid <= 19) return 2;
    if (maxSid <= 28) return 3;
    if (maxSid <= 36) return 4;
    if (maxSid <= 43) return 5;
    if (maxSid <= 51) return 6;
    return 7;
  }

  /**
   * Tạo đề Checkpoint cuối mỗi chặng (Spec P5).
   * - Chỉ lấy câu pool "exam" có max(sessionIds) <= cp.afterSessionId
   * - Phần hiện tại = round(count * currentShare)
   * - Phần chặng trước = count - phần hiện tại, chia đều các chặng trước (lệch <= 1)
   * - Mỗi phần chia domain theo allocateByDomain; priorWeakDomains tăng tối đa +2 câu cho domain yếu nhất ở phần chặng trước
   */
  function buildCheckpointExam(
    pool,
    cp,
    sessions = [],
    { seed, excludeIds = [], priorWeakDomains = [], now } = {}
  ) {
    const nowTs = typeof now === "number" ? now : Date.now();
    const finalSeed =
      typeof seed === "number" && !Number.isNaN(seed)
        ? seed >>> 0
        : (nowTs ^ ((cp?.phaseId || 1) * 2654435761)) >>> 0;
    const rng = createRng(finalSeed);
    const warnings = [];

    const maxAllowedSid = Number(cp?.afterSessionId || 10);
    const targetPhase = Number(cp?.phaseId || 1);
    const requestedCount = Math.max(1, Number(cp?.count || 20));
    const currentShare = Number(cp?.currentShare ?? 1.0);

    // Filter eligible pool: pool === "exam" AND max(sessionIds) <= cp.afterSessionId
    const allExam = filterExamCandidates(pool).filter((q) => {
      const sids = Array.isArray(q.sessionIds) && q.sessionIds.length > 0 ? q.sessionIds : [1];
      return Math.max(...sids.map(Number)) <= maxAllowedSid;
    });

    if (allExam.length < requestedCount) {
      warnings.push(
        `Ngân hàng câu hỏi cho ${cp?.id || "checkpoint"} hiện có ${allExam.length}/${requestedCount} câu trong phạm vi buổi #1–#${maxAllowedSid}.`
      );
    }

    const effectiveTotal = Math.min(requestedCount, allExam.length);
    let currentTarget =
      targetPhase === 1 ? effectiveTotal : Math.round(effectiveTotal * currentShare);
    let priorTarget = Math.max(0, effectiveTotal - currentTarget);

    const excludeSet = new Set(Array.isArray(excludeIds) ? excludeIds : []);

    // Partition eligible questions into currentPhase and priorPhases (1 .. targetPhase-1)
    const currentFresh = [];
    const currentSeen = [];
    const priorByPhaseFresh = {};
    const priorByPhaseSeen = {};
    for (let p = 1; p < targetPhase; p++) {
      priorByPhaseFresh[p] = [];
      priorByPhaseSeen[p] = [];
    }

    for (const q of allExam) {
      const p = phaseOfQuiz(q, sessions);
      const isSeen = excludeSet.has(q.id);
      if (p === targetPhase) {
        if (isSeen) currentSeen.push(q);
        else currentFresh.push(q);
      } else if (p >= 1 && p < targetPhase) {
        if (isSeen) priorByPhaseSeen[p].push(q);
        else priorByPhaseFresh[p].push(q);
      }
    }

    const totalCurrentAvail = currentFresh.length + currentSeen.length;
    const totalPriorAvail = Object.keys(priorByPhaseFresh).reduce(
      (sum, p) => sum + priorByPhaseFresh[p].length + priorByPhaseSeen[p].length,
      0
    );

    if (totalCurrentAvail < currentTarget) {
      const shift = currentTarget - totalCurrentAvail;
      currentTarget = totalCurrentAvail;
      priorTarget = Math.min(totalPriorAvail, priorTarget + shift);
      warnings.push(`Chặng ${targetPhase} thiếu ${shift} câu, đã bù từ các chặng trước.`);
    } else if (totalPriorAvail < priorTarget) {
      const shift = priorTarget - totalPriorAvail;
      priorTarget = totalPriorAvail;
      currentTarget = Math.min(totalCurrentAvail, currentTarget + shift);
      warnings.push(`Các chặng trước thiếu ${shift} câu, đã bù từ chặng hiện tại.`);
    }

    // 1. Pick Current Phase questions using allocateByDomain
    const currentPicked = pickQuestionsByDomain(
      currentFresh,
      currentSeen,
      currentTarget,
      rng,
      DOMAIN_WEIGHTS
    );

    // 2. Pick Prior Phase questions divided evenly across prior phases 1..(targetPhase-1)
    // AND matching allocateByDomain (with up to +2 boost for priorWeakDomains[0])
    const priorSelected = [];
    let priorReusedCount = 0;

    if (priorTarget > 0 && targetPhase > 1) {
      const priorPhases = Array.from({ length: targetPhase - 1 }, (_, i) => i + 1);
      const numPrior = priorPhases.length;

      // Determine total available in prior phases vs fresh-only in prior phases
      const totalPriorFresh = priorPhases.reduce((s, p) => s + priorByPhaseFresh[p].length, 0);
      const priorUseOnlyFresh = totalPriorFresh >= priorTarget;

      // Prepare pools per (phase, domain)
      const bucket = {};
      const phaseAvailCount = {};
      const domainAvailCount = { 1: 0, 2: 0, 3: 0, 4: 0 };

      for (const p of priorPhases) {
        bucket[p] = { 1: [], 2: [], 3: [], 4: [] };
        const fShuffled = shuffleWithRng(priorByPhaseFresh[p], rng);
        const sShuffled = shuffleWithRng(priorByPhaseSeen[p], rng);
        const combined = priorUseOnlyFresh
          ? fShuffled.map((q) => ({ q, seen: false }))
          : [
              ...fShuffled.map((q) => ({ q, seen: false })),
              ...sShuffled.map((q) => ({ q, seen: true }))
            ];
        phaseAvailCount[p] = combined.length;
        for (const item of combined) {
          const d = [1, 2, 3, 4].includes(Number(item.q.domain)) ? Number(item.q.domain) : 1;
          bucket[p][d].push(item);
          domainAvailCount[d]++;
        }
      }

      // Compute per-phase quotas (even split, differing by <= 1, capped by phaseAvailCount)
      const phaseQuotas = {};
      const baseP = Math.floor(priorTarget / numPrior);
      const remP = priorTarget % numPrior;
      let pDeficit = 0;
      for (let idx = 0; idx < numPrior; idx++) {
        const p = priorPhases[idx];
        const want = baseP + (idx < remP ? 1 : 0);
        if (want > phaseAvailCount[p]) {
          phaseQuotas[p] = phaseAvailCount[p];
          pDeficit += want - phaseAvailCount[p];
        } else {
          phaseQuotas[p] = want;
        }
      }
      while (pDeficit > 0) {
        const canGrow = priorPhases.filter((p) => phaseQuotas[p] < phaseAvailCount[p]);
        if (canGrow.length === 0) break;
        for (const p of canGrow) {
          if (pDeficit <= 0) break;
          if (phaseQuotas[p] < phaseAvailCount[p]) {
            phaseQuotas[p]++;
            pDeficit--;
          }
        }
      }

      // Compute domain quotas for priorTarget
      const domainQuotas = allocateByDomain(priorTarget, DOMAIN_WEIGHTS, domainAvailCount);

      // Adaptive boost: if priorWeakDomains provided, boost weakest domain by up to +2
      if (Array.isArray(priorWeakDomains) && priorWeakDomains.length > 0) {
        const weakD = Number(priorWeakDomains[0]);
        if ([1, 2, 3, 4].includes(weakD)) {
          const maxAdd = Math.min(2, domainAvailCount[weakD] - domainQuotas[weakD]);
          let added = 0;
          const donors = [1, 2, 3, 4]
            .filter((d) => d !== weakD && domainQuotas[d] > 0)
            .sort((a, b) => domainQuotas[b] - domainQuotas[a]);
          for (const donor of donors) {
            while (added < maxAdd && domainQuotas[donor] > 1) {
              domainQuotas[donor]--;
              domainQuotas[weakD]++;
              added++;
              break;
            }
          }
        }
      }

      // Greedy 2-way matching across (phaseQuotas, domainQuotas)
      const remDomain = { ...domainQuotas };
      const remPhase = { ...phaseQuotas };

      for (const p of priorPhases) {
        while (remPhase[p] > 0) {
          // Pick domain with largest remaining quota that has an available item in phase p
          const availDomains = [1, 2, 3, 4]
            .filter((d) => bucket[p][d].length > 0)
            .sort((a, b) => remDomain[b] - remDomain[a]);
          if (availDomains.length === 0) break;
          const chosenD = availDomains[0];
          const item = bucket[p][chosenD].shift();
          priorSelected.push(item.q);
          if (item.seen) priorReusedCount++;
          remPhase[p]--;
          remDomain[chosenD]--;
        }
      }
    }

    const totalReused = currentPicked.reusedCount + priorReusedCount;
    if (totalReused > 0) {
      warnings.push(`Đề Checkpoint có ${totalReused} câu bạn đã gặp ở các lần làm bài trước.`);
    }

    const currentPhaseIds = currentPicked.selected.map((q) => q.id);
    const priorPhaseIds = priorSelected.map((q) => q.id);
    const allSelected = shuffleWithRng([...currentPicked.selected, ...priorSelected], rng);
    const optionOrder = buildOptionOrderForQuestions(allSelected, rng);
    const questionIds = allSelected.map((q) => q.id);

    const durationMinutes =
      allSelected.length < requestedCount && requestedCount > 0
        ? Math.max(1, allSelected.length * 2)
        : Number(cp?.minutes || requestedCount * 2);

    const def = {
      id: `exam_checkpoint_${cp?.id || "cp"}_${finalSeed}_${nowTs}`,
      mode: "checkpoint",
      cpId: cp?.id || `cp${targetPhase}`,
      phaseId: targetPhase,
      afterSessionId: maxAllowedSid,
      seed: finalSeed,
      questionIds,
      currentPhaseIds,
      priorPhaseIds,
      optionOrder,
      durationMs: durationMinutes * 60 * 1000,
      createdAt: nowTs,
      source: "completed",
      label: cp?.title || `Checkpoint Chặng ${targetPhase}`
    };

    return { def, warnings };
  }

  /**
   * Xếp hạng các buổi học theo số câu sai (dựa vào sessionIds của câu sai), giảm dần; tối đa `limit`.
   * @returns {Array<{ sessionId: number, wrong: number, total: number }>}
   */
  function weakSessions(result, quizById, limit = 5) {
    if (!result) return [];
    const getQuiz = resolveQuizLookup(quizById);
    const wrongSet = new Set([
      ...(result.wrongIds || []),
      ...(result.unansweredIds || [])
    ]);
    const allIds =
      Array.isArray(result.questionIds) && result.questionIds.length > 0
        ? result.questionIds
        : [...wrongSet];

    const stats = new Map();
    for (const qid of allIds) {
      const q = getQuiz(qid);
      if (!q || !Array.isArray(q.sessionIds)) continue;
      const isWrong = wrongSet.has(qid);
      for (const rawSid of q.sessionIds) {
        const sid = Number(rawSid);
        if (!Number.isInteger(sid)) continue;
        const entry = stats.get(sid) || { sessionId: sid, wrong: 0, total: 0 };
        entry.total++;
        if (isWrong) entry.wrong++;
        stats.set(sid, entry);
      }
    }

    return [...stats.values()]
      .filter((item) => item.wrong > 0)
      .sort((a, b) => {
        if (b.wrong !== a.wrong) return b.wrong - a.wrong;
        const rateB = b.total > 0 ? b.wrong / b.total : 0;
        const rateA = a.total > 0 ? a.wrong / a.total : 0;
        if (Math.abs(rateB - rateA) > 1e-9) return rateB - rateA;
        return a.sessionId - b.sessionId;
      })
      .slice(0, Math.max(1, limit));
  }

  const ExamEngine = {
    DOMAIN_WEIGHTS,
    PRESETS,
    createRng,
    allocateByDomain,
    buildExam,
    examRefForSession,
    buildSectionExam,
    startExam,
    answerQuestion,
    toggleFlag,
    goTo,
    remainingMs,
    isExpired,
    scoreExam,
    scaledScore,
    buildRetryExam,
    mergeExamHistory,
    validateActiveExam,
    phaseOfQuiz,
    buildCheckpointExam,
    weakSessions
  };

  if (root) {
    root.ExamEngine = ExamEngine;
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = ExamEngine;
  }
})(typeof window !== "undefined" ? window : globalThis);
