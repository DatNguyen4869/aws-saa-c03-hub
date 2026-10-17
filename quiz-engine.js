// quiz-engine.js — Pure functions for normalizing, merging, filtering, grading, migrating, and hashing SAA-C03 quizzes.
(function (root) {
  "use strict";

  function normWs(str) {
    return String(str == null ? "" : str)
      .trim()
      .replace(/\s+/g, " ");
  }

  function normKey(str) {
    return normWs(str).toLowerCase();
  }

  /**
   * Trả về mảng chỉ số đáp án đúng đã sắp xếp tăng dần.
   * @param {object} quiz
   * @returns {number[]}
   */
  function correctSet(quiz) {
    if (!quiz || typeof quiz !== "object") return [];
    if (Array.isArray(quiz.correctIdxs)) {
      const uniq = [...new Set(quiz.correctIdxs.map(Number).filter((n) => Number.isInteger(n) && n >= 0))];
      uniq.sort((a, b) => a - b);
      return uniq;
    }
    if (typeof quiz.correctIdx === "number" && Number.isInteger(quiz.correctIdx) && quiz.correctIdx >= 0) {
      return [quiz.correctIdx];
    }
    return [];
  }

  /**
   * Kiểm tra đáp án người dùng chọn.
   * Với câu Choose TWO (correctIdxs): chấm all-or-nothing, không phụ thuộc thứ tự.
   * @param {object} quiz
   * @param {number|number[]|null|undefined} chosen
   * @returns {boolean}
   */
  function isCorrect(quiz, chosen) {
    if (chosen === undefined || chosen === null) return false;
    const expected = correctSet(quiz);
    if (expected.length === 0) return false;

    if (Array.isArray(quiz.correctIdxs)) {
      if (!Array.isArray(chosen)) return false;
      const actual = [...new Set(chosen.map(Number).filter((n) => Number.isInteger(n) && n >= 0))].sort((a, b) => a - b);
      if (actual.length !== expected.length) return false;
      return actual.every((val, i) => val === expected[i]);
    }

    const picked = Array.isArray(chosen) ? (chosen.length === 1 ? Number(chosen[0]) : NaN) : Number(chosen);
    return Number.isInteger(picked) && picked === expected[0];
  }

  /**
   * Chuẩn hóa một câu hỏi về schema v2 (không mutate đối tượng đầu vào).
   * @param {object} raw
   * @param {object} [ctx]
   * @returns {object}
   */
  function normalizeQuiz(raw, ctx = {}) {
    if (!raw || typeof raw !== "object") return {};
    const meta = ctx.meta || (root && root.QUIZ_META) || {};
    const sessionDomains = ctx.sessionDomains || meta.SESSION_DOMAINS || {};
    const sessionTasks = ctx.sessionTasks || meta.SESSION_TASKS || {};
    const legacyMetaMap = ctx.legacyMeta || meta.LEGACY_QUIZ_META || {};

    const sid = ctx.sessionId !== undefined ? Number(ctx.sessionId) : undefined;
    const idx = ctx.index !== undefined ? Number(ctx.index) : undefined;
    const id = raw.id
      ? String(raw.id)
      : sid !== undefined && idx !== undefined
      ? `s${sid}-l${idx}`
      : "";

    const legacy = (id && legacyMetaMap[id]) || {};
    const pool = raw.pool || ctx.pool || legacy.pool || "lesson";
    const domain = Number(
      raw.domain ||
        legacy.domain ||
        ctx.defaultDomain ||
        (sid !== undefined ? sessionDomains[sid] : undefined) ||
        1
    );
    const task = String(
      raw.task ||
        legacy.task ||
        ctx.defaultTask ||
        (sid !== undefined ? sessionTasks[sid] : undefined) ||
        `${domain}.1`
    );

    let sessionIds = [];
    if (Array.isArray(raw.sessionIds) && raw.sessionIds.length > 0) {
      sessionIds = raw.sessionIds.map(Number);
    } else if (Array.isArray(legacy.sessionIds) && legacy.sessionIds.length > 0) {
      sessionIds = legacy.sessionIds.map(Number);
    } else if (sid !== undefined && !Number.isNaN(sid)) {
      sessionIds = [sid];
    }

    const difficulty = raw.difficulty || legacy.difficulty || "medium";
    const options = Array.isArray(raw.options) ? [...raw.options] : [];

    const out = {
      id,
      pool,
      domain,
      task,
      sessionIds,
      difficulty,
      qEn: String(raw.qEn || ""),
      qVi: String(raw.qVi || ""),
      options,
      explanation: String(raw.explanation || "")
    };

    if (Array.isArray(raw.correctIdxs)) {
      out.correctIdxs = raw.correctIdxs.map(Number);
    } else if (typeof raw.correctIdx === "number") {
      out.correctIdx = raw.correctIdx;
    }

    const whyWrongSource = Array.isArray(raw.whyWrong)
      ? raw.whyWrong
      : Array.isArray(legacy.whyWrong)
      ? legacy.whyWrong
      : null;

    if (whyWrongSource) {
      out.whyWrong = whyWrongSource.map((w) => (w == null ? null : String(w)));
    }

    const tagsSource = Array.isArray(raw.tags)
      ? raw.tags
      : Array.isArray(legacy.tags)
      ? legacy.tags
      : null;
    if (tagsSource) {
      out.tags = [...tagsSource];
    }

    return out;
  }

  /**
   * Gộp ngân hàng câu hỏi bài học (QUIZ_BANK) vào sessions:
   * - Giữ nguyên các câu hỏi cũ ở đầu mảng session.quizzes và gán id s{sid}-l{idx}.
   * - Chỉ append câu mới có pool === "lesson".
   * - Chống trùng theo id và qEn đã chuẩn hóa; hoàn toàn idempotent khi gọi nhiều lần.
   * @param {Array<object>} sessions
   * @param {Record<number, Array<object>>} bank
   * @param {object} [meta]
   */
  function mergeQuizBank(sessions, bank, meta) {
    if (!Array.isArray(sessions)) return sessions;
    const resolvedMeta = meta || (root && root.QUIZ_META) || {};

    for (const session of sessions) {
      if (!session || typeof session !== "object") continue;
      const sid = Number(session.id);
      if (!Array.isArray(session.quizzes)) {
        if (!bank || !bank[sid]) continue;
        session.quizzes = [];
      }

      const seenIds = new Set();
      const seenQEn = new Set();
      const normalizedExisting = [];

      session.quizzes.forEach((q, idx) => {
        const norm = normalizeQuiz(q, {
          sessionId: sid,
          index: idx,
          pool: "lesson",
          meta: resolvedMeta
        });
        if (norm.pool !== "lesson") return;
        if (norm.id && seenIds.has(norm.id)) return;
        const qKey = normKey(norm.qEn);
        if (qKey && seenQEn.has(qKey)) return;
        if (norm.id) seenIds.add(norm.id);
        if (qKey) seenQEn.add(qKey);
        normalizedExisting.push(norm);
      });

      const additions = (bank && bank[sid]) || [];
      for (const rawNew of additions) {
        if (!rawNew || typeof rawNew !== "object") continue;
        const norm = normalizeQuiz(rawNew, {
          sessionId: sid,
          pool: rawNew.pool || "lesson",
          meta: resolvedMeta
        });
        if (norm.pool !== "lesson") continue;
        if (norm.id && seenIds.has(norm.id)) continue;
        const qKey = normKey(norm.qEn);
        if (qKey && seenQEn.has(qKey)) continue;
        if (norm.id) seenIds.add(norm.id);
        if (qKey) seenQEn.add(qKey);
        normalizedExisting.push(norm);
      }

      session.quizzes = normalizedExisting;
    }

    return sessions;
  }

  /**
   * Chuyển đổi state.quizAnswers từ key theo index (v1) sang key theo quiz.id (v2).
   * Giữ _t, gắn _v: 2, bỏ các key không map được, và idempotent.
   * @param {object} quizAnswers
   * @param {Array<object>} [sessions]
   * @returns {object}
   */
  function migrateQuizAnswers(quizAnswers, sessions) {
    if (!quizAnswers || typeof quizAnswers !== "object") return {};
    const sessionList =
      sessions ||
      (root && root.STUDY_DATA && Array.isArray(root.STUDY_DATA.sessions) ? root.STUDY_DATA.sessions : []);
    const sessionById = new Map();
    for (const s of sessionList) {
      if (s && s.id !== undefined) sessionById.set(Number(s.id), s);
    }

    const out = {};
    for (const [sidStr, entry] of Object.entries(quizAnswers)) {
      if (!entry || typeof entry !== "object" || Array.isArray(entry)) continue;

      if (entry._v === 2) {
        out[sidStr] = { ...entry };
        continue;
      }

      const sid = Number(sidStr);
      const session = sessionById.get(sid);
      const quizzes = (session && Array.isArray(session.quizzes) ? session.quizzes : []);
      const validIds = new Set(
        quizzes.map((q, idx) => (q && q.id ? String(q.id) : `s${sid}-l${idx}`))
      );

      const migrated = { _v: 2 };
      if (typeof entry._t === "number") {
        migrated._t = entry._t;
      }

      for (const [k, v] of Object.entries(entry)) {
        if (k === "_t" || k === "_v") continue;
        if (/^\d+$/.test(k)) {
          const idx = Number(k);
          if (idx >= 0 && idx < quizzes.length) {
            const q = quizzes[idx];
            const qid = q && q.id ? String(q.id) : `s${sid}-l${idx}`;
            if (migrated[qid] === undefined) {
              migrated[qid] = v;
            }
          }
        } else if (validIds.has(k)) {
          migrated[k] = v;
        }
      }

      out[sidStr] = migrated;
    }

    return out;
  }

  /**
   * Lọc danh sách câu hỏi từ pool bài học và/hoặc pool đề thi.
   * Hỗ trợ cả 2 chữ ký: getQuizPool(sessions, examBank, filter) và getQuizPool(sessions, filter).
   * @param {Array<object>} sessions
   * @param {Array<object>|object} [examBankOrFilter]
   * @param {object} [maybeFilter]
   * @returns {Array<object>}
   */
  function getQuizPool(sessions, examBankOrFilter, maybeFilter) {
    let examBank = [];
    let filter = {};
    if (Array.isArray(examBankOrFilter)) {
      examBank = examBankOrFilter;
      filter = maybeFilter || {};
    } else if (examBankOrFilter && typeof examBankOrFilter === "object") {
      filter = examBankOrFilter;
      examBank = (root && Array.isArray(root.EXAM_BANK) ? root.EXAM_BANK : []);
    } else {
      examBank = (root && Array.isArray(root.EXAM_BANK) ? root.EXAM_BANK : []);
      filter = maybeFilter || {};
    }

    const poolMode = filter.pool || "all";
    const meta = (root && root.QUIZ_META) || {};
    const candidates = [];

    if (poolMode === "lesson" || poolMode === "all") {
      for (const s of sessions || []) {
        if (!s || !Array.isArray(s.quizzes)) continue;
        s.quizzes.forEach((q, idx) => {
          const norm = q && q.id && q.domain && q.task && Array.isArray(q.sessionIds)
            ? q
            : normalizeQuiz(q, { sessionId: s.id, index: idx, pool: "lesson", meta });
          if ((norm.pool || "lesson") === "lesson") {
            candidates.push(norm);
          }
        });
      }
    }

    if (poolMode === "exam" || poolMode === "all") {
      for (const q of examBank || []) {
        if (!q) continue;
        const norm = q.id && q.domain && q.task && Array.isArray(q.sessionIds) && q.pool === "exam"
          ? q
          : normalizeQuiz(q, { pool: "exam", meta });
        if (norm.pool === "exam") {
          candidates.push(norm);
        }
      }
    }

    const maxSessionId = typeof filter.maxSessionId === "number" ? filter.maxSessionId : null;
    const allowedSessionSet =
      Array.isArray(filter.sessionIds) && filter.sessionIds.length > 0
        ? new Set(filter.sessionIds.map(Number))
        : null;
    const allowedDomains =
      Array.isArray(filter.domains) && filter.domains.length > 0
        ? new Set(filter.domains.map(Number))
        : null;
    const allowedTasks =
      Array.isArray(filter.tasks) && filter.tasks.length > 0
        ? new Set(filter.tasks.map(String))
        : null;
    const excludeSet =
      Array.isArray(filter.excludeIds) && filter.excludeIds.length > 0
        ? new Set(filter.excludeIds.map(String))
        : filter.excludeIds instanceof Set
        ? filter.excludeIds
        : null;

    return candidates.filter((q) => {
      if (excludeSet && excludeSet.has(String(q.id))) return false;
      if (allowedDomains && !allowedDomains.has(Number(q.domain))) return false;
      if (allowedTasks && !allowedTasks.has(String(q.task))) return false;

      const sids = Array.isArray(q.sessionIds) ? q.sessionIds.map(Number) : [];
      if (maxSessionId !== null) {
        if (sids.length === 0) return false;
        const maxSid = Math.max(...sids);
        if (maxSid > maxSessionId) return false;
      }

      if (allowedSessionSet) {
        if (sids.length === 0) return false;
        const maxSid = Math.max(...sids);
        if (!allowedSessionSet.has(maxSid)) return false;
      }

      return true;
    });
  }

  /**
   * Hash ổn định (djb2 32-bit hex 8 ký tự) của qEn + options + đáp án đúng, đã chuẩn hóa khoảng trắng.
   * @param {object} quiz
   * @returns {string}
   */
  function quizContentHash(quiz) {
    if (!quiz || typeof quiz !== "object") return "00000000";
    const qPart = normWs(quiz.qEn);
    const optPart = (Array.isArray(quiz.options) ? quiz.options : []).map(normWs).join("||");
    const ansPart = correctSet(quiz).join(",");
    const payload = `${qPart}###${optPart}###${ansPart}`;

    let h1 = 5381;
    let h2 = 52711;
    for (let i = 0; i < payload.length; i++) {
      const ch = payload.charCodeAt(i);
      h1 = ((h1 << 5) + h1) ^ ch;
      h2 = ((h2 << 5) + h2) ^ ch;
    }
    return ((h1 >>> 0).toString(16).padStart(8, "0") + (h2 >>> 0).toString(16).padStart(8, "0")).slice(0, 8);
  }

  const api = {
    normalizeQuiz,
    mergeQuizBank,
    isCorrect,
    correctSet,
    migrateQuizAnswers,
    getQuizPool,
    quizContentHash
  };

  if (root) {
    root.QuizEngine = api;
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }
})(typeof window !== "undefined" ? window : globalThis);
