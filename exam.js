// exam.js — Giao diện tab "🧪 Thi thử" (Spec P3) và Checkpoint cuối chặng (Spec P5).
// Cung cấp window.ExamUI và tương tác với app.js qua window.AwsHub + window.ExamEngine.

(function (root) {
  "use strict";

  const ACTIVE_EXAM_KEY = "aws_saa_c03_active_exam_v1";

  const DOMAIN_NAMES = {
    1: "Domain 1: Design Secure Architectures (30%)",
    2: "Domain 2: Design Resilient Architectures (26%)",
    3: "Domain 3: Design High-Performing Architectures (24%)",
    4: "Domain 4: Design Cost-Optimized Architectures (20%)"
  };

  let activeExam = null;
  let lastResult = null;
  let reviewFilter = "all";
  let setupSource = "all";
  let timerInterval = null;
  let pendingWarnings = [];
  let pendingMissingSessions = [];
  let listenersAttached = false;

  function getHub() {
    return root.AwsHub;
  }

  function getEngine() {
    return root.ExamEngine;
  }

  function getNow() {
    const hub = getHub();
    if (hub && typeof hub.now === "function") return hub.now();
    if (root.AwsHubClock && typeof root.AwsHubClock.now === "function") {
      return root.AwsHubClock.now();
    }
    return Date.now();
  }

  function saveActiveToStorage(exam) {
    try {
      if (!exam) {
        localStorage.removeItem(ACTIVE_EXAM_KEY);
      } else {
        localStorage.setItem(ACTIVE_EXAM_KEY, JSON.stringify(exam));
      }
    } catch (_) {}
  }

  function loadActiveFromStorage() {
    try {
      const raw = localStorage.getItem(ACTIVE_EXAM_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (_) {
      return null;
    }
  }

  function formatTimer(ms) {
    const totalSec = Math.max(0, Math.ceil(ms / 1000));
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }

  function stripOptionPrefix(optText) {
    return String(optText || "").replace(/^[A-E]\.\s*/, "");
  }

  function escapeHtml(str) {
    return String(str ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function startTimerLoop() {
    stopTimerLoop();
    timerInterval = setInterval(() => {
      tick();
    }, 500);
  }

  function stopTimerLoop() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  }

  function tick() {
    if (!activeExam) return;
    const engine = getEngine();
    if (!engine) return;
    const now = getNow();
    const rem = engine.remainingMs(activeExam, now);
    const timerEl = document.getElementById("exam-timer");
    if (timerEl) {
      timerEl.textContent = formatTimer(rem);
      timerEl.classList.toggle("warning", rem <= 10 * 60 * 1000 && rem > 60 * 1000);
      timerEl.classList.toggle("danger", rem <= 60 * 1000);
    }
    if (engine.isExpired(activeExam, now)) {
      submit({ auto: true });
    }
  }

  function attachGlobalListeners() {
    if (listenersAttached || typeof window === "undefined") return;
    listenersAttached = true;

    window.addEventListener("storage", (e) => {
      if (e.key !== ACTIVE_EXAM_KEY) return;
      if (!e.newValue) {
        activeExam = null;
        stopTimerLoop();
        renderSetup();
        return;
      }
      try {
        const updated = JSON.parse(e.newValue);
        if (updated && updated.def) {
          activeExam = updated;
          renderExam();
        }
      } catch (_) {}
    });

    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible" && activeExam) {
        tick();
      }
    });

    const onKeyDown = (e) => {
      const examPane = document.getElementById("tab-exam");
      const isVisible =
        examPane &&
        (examPane.classList.contains("active") || examPane.style.display === "block");
      if (!isVisible || !activeExam) return;
      const tag = (e.target && e.target.tagName) || "";
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      const engine = getEngine();
      const hub = getHub();
      if (!engine || !hub) return;

      const qid = activeExam.def.questionIds[activeExam.currentIdx];
      const q = hub.getQuizById(qid);
      if (!q) return;

      if (e.key >= "1" && e.key <= "5") {
        const dispIdx = Number(e.key) - 1;
        const order = activeExam.def.optionOrder[qid] || [0, 1, 2, 3];
        if (dispIdx < order.length) {
          e.preventDefault();
          const origIdx = order[dispIdx];
          handleSelectOption(q, origIdx);
        }
      } else if (e.key === "f" || e.key === "F") {
        e.preventDefault();
        activeExam = engine.toggleFlag(activeExam, qid);
        saveActiveToStorage(activeExam);
        renderExam();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (activeExam.currentIdx > 0) {
          activeExam = engine.goTo(activeExam, activeExam.currentIdx - 1);
          saveActiveToStorage(activeExam);
          renderExam();
        }
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        if (activeExam.currentIdx < activeExam.def.questionIds.length - 1) {
          activeExam = engine.goTo(activeExam, activeExam.currentIdx + 1);
          saveActiveToStorage(activeExam);
          renderExam();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
  }

  function getSeenExamQuestionIds() {
    const hub = getHub();
    if (!hub || typeof hub.getExamHistory !== "function") return [];
    const history = hub.getExamHistory() || [];
    const seen = new Set();
    for (const h of history) {
      for (const qid of h.questionIds || []) {
        seen.add(qid);
      }
    }
    return [...seen];
  }

  function getMaxContiguousCompletedSession() {
    const hub = getHub();
    if (!hub || typeof hub.getCompletedSessionIds !== "function") return 56;
    const completed = new Set((hub.getCompletedSessionIds() || []).map(Number));
    let maxContiguous = 0;
    for (let s = 1; s <= 56; s++) {
      if (completed.has(s)) maxContiguous = s;
      else break;
    }
    if (maxContiguous === 0 && completed.size > 0) {
      return Math.max(...completed);
    }
    return maxContiguous;
  }

  function getPoolForSource(source) {
    const hub = getHub();
    if (!hub || typeof hub.getQuizPool !== "function") return [];
    if (source === "completed") {
      const maxSid = getMaxContiguousCompletedSession();
      if (maxSid <= 0) return [];
      return hub.getQuizPool({ pool: "exam", maxSessionId: maxSid });
    }
    return hub.getQuizPool({ pool: "exam" });
  }

  function onShow() {
    attachGlobalListeners();
    const engine = getEngine();
    const hub = getHub();
    if (!engine || !hub) return;

    const stored = loadActiveFromStorage();
    if (stored && stored.def) {
      const validated = engine.validateActiveExam(stored, (id) => hub.getQuizById(id));
      if (!validated.active || validated.active.def.questionIds.length === 0) {
        saveActiveToStorage(null);
        activeExam = null;
        renderSetup();
        return;
      }
      if (validated.droppedIds.length > 0 && typeof hub.showToast === "function") {
        hub.showToast(`⚠️ Đã loại bỏ ${validated.droppedIds.length} câu hỏi không còn tồn tại khỏi bài đang làm.`);
      }
      activeExam = validated.active;
      saveActiveToStorage(activeExam);

      if (engine.isExpired(activeExam, getNow())) {
        if (typeof hub.showToast === "function") {
          hub.showToast("⏰ Bài thi đang làm đã hết thời gian và được tự động nộp!");
        }
        submit({ auto: true });
        return;
      }

      renderExam();
      startTimerLoop();
      return;
    }

    renderSetup();
  }

  function startPreset(mode = "full", opts = {}) {
    attachGlobalListeners();
    const engine = getEngine();
    const hub = getHub();
    if (!engine || !hub) return;

    const source = opts.source || setupSource || "all";
    const pool = getPoolForSource(source);
    if (!pool || pool.length === 0) {
      if (typeof hub.showToast === "function") {
        hub.showToast("⚠️ Không có câu hỏi phù hợp trong ngân hàng đề thi.");
      }
      return;
    }

    const excludeIds = opts.excludeIds ?? getSeenExamQuestionIds();
    const now = getNow();
    const built = engine.buildExam(pool, {
      mode,
      count: opts.count,
      minutes: opts.minutes,
      seed: opts.seed,
      source,
      excludeIds,
      label: opts.label,
      now
    });

    pendingWarnings = built.warnings || [];
    pendingMissingSessions = [];
    activeExam = engine.startExam(built.def, now);
    activeExam.warnings = pendingWarnings;
    saveActiveToStorage(activeExam);
    lastResult = null;
    renderExam();
    startTimerLoop();
  }

  function startSection(sessionId) {
    attachGlobalListeners();
    const engine = getEngine();
    const hub = getHub();
    if (!engine || !hub) return;

    const pool = hub.getQuizPool({ pool: "exam" });
    const now = getNow();
    const built = engine.buildSectionExam(pool, Number(sessionId), now);
    if (!built) return;

    const seenSet = new Set(getSeenExamQuestionIds());
    const overlapCount = built.def.questionIds.filter((id) => seenSet.has(id)).length;
    const warnings = [...(built.warnings || [])];
    if (overlapCount > 0) {
      warnings.push(`Phần đề cố định này có ${overlapCount} câu bạn đã từng gặp ở Checkpoint hoặc lần thi trước.`);
    }

    pendingWarnings = warnings;
    pendingMissingSessions = [];
    activeExam = engine.startExam(built.def, now);
    activeExam.warnings = warnings;
    saveActiveToStorage(activeExam);
    lastResult = null;
    if (typeof hub.openExamTab === "function") {
      hub.openExamTab();
    }
    renderExam();
    startTimerLoop();
  }

  function startCheckpoint(cpId, opts = {}) {
    attachGlobalListeners();
    const engine = getEngine();
    const hub = getHub();
    if (!engine || !hub) return;

    const checkpoints = root.CHECKPOINTS || [];
    const cp = checkpoints.find((c) => c.id === cpId);
    if (!cp) return;

    const status =
      typeof hub.getCheckpointStatus === "function"
        ? hub.getCheckpointStatus(cpId)
        : { missingSessions: [] };

    const pool = hub.getQuizPool({ pool: "exam" });
    const sessions = (root.STUDY_DATA && root.STUDY_DATA.sessions) || [];
    const excludeIds = getSeenExamQuestionIds();

    // Find weakest domains from previous checkpoint results
    const history = (typeof hub.getExamHistory === "function" ? hub.getExamHistory() : []) || [];
    const priorCpResults = history.filter((r) => r.mode === "checkpoint" && r.byDomain);
    let priorWeakDomains = [];
    if (priorCpResults.length > 0) {
      const latest = priorCpResults[0];
      priorWeakDomains = [1, 2, 3, 4]
        .filter((d) => latest.byDomain[d] && latest.byDomain[d].total > 0)
        .sort((a, b) => latest.byDomain[a].pct - latest.byDomain[b].pct);
    }

    const now = getNow();
    const built = engine.buildCheckpointExam(pool, cp, sessions, {
      seed: opts.seed,
      excludeIds,
      priorWeakDomains,
      now
    });

    pendingWarnings = built.warnings || [];
    pendingMissingSessions = status.missingSessions || [];
    activeExam = engine.startExam(built.def, now);
    activeExam.warnings = pendingWarnings;
    activeExam.missingSessions = pendingMissingSessions;
    saveActiveToStorage(activeExam);
    lastResult = null;

    if (typeof hub.openExamTab === "function") {
      hub.openExamTab();
    }
    renderExam();
    startTimerLoop();
  }

  function submit({ auto = false } = {}) {
    if (!activeExam) return null;
    const engine = getEngine();
    const hub = getHub();
    if (!engine || !hub) return null;

    stopTimerLoop();
    const now = getNow();
    const result = engine.scoreExam(activeExam, (id) => hub.getQuizById(id), {
      now,
      autoSubmitted: Boolean(auto)
    });

    activeExam = null;
    saveActiveToStorage(null);
    lastResult = result;
    reviewFilter = "all";

    if (typeof hub.addExamResult === "function") {
      hub.addExamResult(result);
    }
    if (auto && typeof hub.showToast === "function") {
      hub.showToast("⏰ Hết giờ! Hệ thống đã tự động nộp bài thi của bạn.");
    }

    renderResult(result);
    return result;
  }

  function handleSelectOption(q, origIdx) {
    if (!activeExam) return;
    const engine = getEngine();
    if (!engine) return;

    const isMulti = Array.isArray(q.correctIdxs);
    const currentAns = activeExam.answers[q.id];

    if (isMulti) {
      const arr = Array.isArray(currentAns) ? [...currentAns] : [];
      const pos = arr.indexOf(origIdx);
      if (pos >= 0) {
        arr.splice(pos, 1);
      } else {
        arr.push(origIdx);
      }
      activeExam = engine.answerQuestion(activeExam, q.id, arr);
    } else {
      activeExam = engine.answerQuestion(activeExam, q.id, origIdx);
    }

    saveActiveToStorage(activeExam);
    renderExam();
  }

  function renderSetup() {
    stopTimerLoop();
    const container = document.getElementById("exam-container");
    if (!container) return;

    const hub = getHub();
    const fullPool = hub ? hub.getQuizPool({ pool: "exam" }) : [];
    const currentPool = getPoolForSource(setupSource);
    const isPoolEmpty = !currentPool || currentPool.length === 0;
    const history = (hub && typeof hub.getExamHistory === "function" ? hub.getExamHistory() : []) || [];
    const recent5 = history.slice(0, 5);

    const checkpoints = root.CHECKPOINTS || [];
    const cpCardsHtml = checkpoints
      .map((cp) => {
        const st =
          hub && typeof hub.getCheckpointStatus === "function"
            ? hub.getCheckpointStatus(cp.id)
            : { unlocked: false, attempts: 0, bestPct: null, missingSessions: [] };
        const bestLabel =
          st.bestPct !== null && st.bestPct !== undefined
            ? `Điểm cao nhất: <strong>${Math.round(st.bestPct * 100)}%</strong> (${st.attempts} lần)`
            : "Chưa làm";
        return `
          <div class="exam-cp-card" data-cp-id="${cp.id}">
            <div class="exam-cp-card-title">🧭 ${escapeHtml(cp.title)}</div>
            <div class="exam-cp-card-meta">Mở sau Buổi #${cp.afterSessionId} · ${cp.count} câu / ${cp.minutes} phút · Ngưỡng tham khảo: ${Math.round(cp.passPct * 100)}%</div>
            <div class="exam-cp-card-status">${bestLabel}</div>
            <button type="button" class="btn-secondary exam-start-cp-btn" data-cp-id="${cp.id}" ${fullPool.length === 0 ? "disabled" : ""}>
              Làm Checkpoint ${cp.phaseId}
            </button>
          </div>
        `;
      })
      .join("");

    const historyRowsHtml =
      history.length === 0
        ? `<tr><td colspan="6" class="text-muted">Chưa có lịch sử làm bài thi thử.</td></tr>`
        : history
            .map((h) => {
              const dateStr = new Date(h.submittedAt || Date.now()).toLocaleString("vi-VN");
              const pctVal = Math.round((h.pct || 0) * 100);
              const badge =
                h.mode === "checkpoint"
                  ? pctVal >= 70
                    ? `<span class="badge-pass">Đạt mốc ≥70%</span>`
                    : `<span class="badge-fail">Cần ôn thêm (&lt;70%)</span>`
                  : h.passedEstimate
                  ? `<span class="badge-pass">ĐẠT (ước lượng)</span>`
                  : `<span class="badge-fail">CHƯA ĐẠT (ước lượng)</span>`;
              return `
                <tr class="exam-history-row" data-result-id="${escapeHtml(h.id)}">
                  <td>${escapeHtml(h.label)}</td>
                  <td>${dateStr}</td>
                  <td><strong>${h.correct}/${h.total}</strong> (${pctVal}%)</td>
                  <td>${h.mode === "checkpoint" ? "—" : `${h.scaledScore} / 1000 (ước lượng)`}</td>
                  <td>${badge}</td>
                  <td><button type="button" class="btn-small exam-view-result-btn" data-result-id="${escapeHtml(h.id)}">Xem lại</button></td>
                </tr>
              `;
            })
            .join("");

    const trendHtml =
      recent5.length === 0
        ? ""
        : `
        <div class="exam-trend-box">
          <h4>📈 Biểu đồ tỷ lệ đúng theo Domain (5 lần gần nhất)</h4>
          <div class="exam-trend-grid">
            ${[1, 2, 3, 4]
              .map((d) => {
                const avg =
                  recent5.reduce((acc, r) => acc + (r.byDomain?.[d]?.pct || 0), 0) /
                  recent5.length;
                const pct = Math.round(avg * 100);
                return `
                  <div class="exam-domain-bar-row">
                    <div class="exam-domain-bar-label">${escapeHtml(DOMAIN_NAMES[d])}</div>
                    <div class="exam-domain-bar-track">
                      <div class="exam-domain-bar-fill" style="width:${pct}%"></div>
                    </div>
                    <div class="exam-domain-bar-val">${pct}%</div>
                  </div>
                `;
              })
              .join("")}
          </div>
        </div>
      `;

    container.innerHTML = `
      <div class="exam-setup-view">
        <div class="exam-setup-header">
          <h2>🧪 Chế độ Thi thử SAA-C03 (Timed Mock Exam)</h2>
          <p>Trải nghiệm áp lực thời gian chuẩn Pearson VUE với ngân hàng câu hỏi độc lập (<code>pool: "exam"</code>). Bài đang làm được tự động lưu chống mất dữ liệu khi tải lại trang hoặc chuyển tab.</p>
        </div>

        <div class="exam-source-selector">
          <label><strong>Phạm vi câu hỏi:</strong></label>
          <label class="exam-radio-label">
            <input type="radio" name="exam-source" value="all" ${setupSource === "all" ? "checked" : ""}>
            Toàn bộ ngân hàng đề thi (${fullPool.length} câu)
          </label>
          <label class="exam-radio-label">
            <input type="radio" name="exam-source" value="completed" ${setupSource === "completed" ? "checked" : ""}>
            Chỉ các buổi đã hoàn thành liên tục
          </label>
        </div>

        ${
          isPoolEmpty
            ? `<div class="exam-empty-warning">⚠️ Ngân hàng câu hỏi cho phạm vi đã chọn hiện đang trống. Vui lòng hoàn thành thêm buổi học hoặc chọn "Toàn bộ ngân hàng đề thi".</div>`
            : ""
        }

        <div class="exam-preset-cards">
          <div class="exam-preset-card">
            <h3>🏆 Full Mock Exam (65 câu / 130 phút)</h3>
            <p>Phân bổ chuẩn 4 Domain (30% / 26% / 24% / 20%), có câu hỏi Choose TWO, tính điểm quy đổi ước lượng (100–1000, ngưỡng đỗ ước lượng 720, khuyến nghị đạt ≥ 80%).</p>
            <button type="button" id="exam-start-full-btn" class="btn-primary exam-start-btn" data-mode="full" ${isPoolEmpty ? "disabled" : ""}>
              Bắt đầu Full Exam (65 câu)
            </button>
          </div>
          <div class="exam-preset-card">
            <h3>⚡ Quick Practice Exam (20 câu / 40 phút)</h3>
            <p>Đề luyện nhanh 20 câu giữ nguyên tỉ lệ 4 Domain và tốc độ 2 phút/câu, phù hợp ôn tập mỗi ngày.</p>
            <button type="button" id="exam-start-quick-btn" class="btn-secondary exam-start-btn" data-mode="quick" ${isPoolEmpty ? "disabled" : ""}>
              Bắt đầu Quick Exam (20 câu)
            </button>
          </div>
        </div>

        <div class="exam-checkpoints-section">
          <h3>🧭 Hệ thống 6 Bài thi Checkpoint cuối mỗi chặng</h3>
          <div class="exam-cp-grid">${cpCardsHtml}</div>
        </div>

        ${trendHtml}

        <div class="exam-history-section">
          <h3>📜 Lịch sử các lần thi gần đây</h3>
          <div class="table-responsive">
            <table class="comparison-table exam-history-table">
              <thead>
                <tr>
                  <th>Bài thi</th>
                  <th>Thời gian nộp</th>
                  <th>Kết quả</th>
                  <th>Điểm quy đổi (ước lượng)</th>
                  <th>Đánh giá</th>
                  <th>Chi tiết</th>
                </tr>
              </thead>
              <tbody>${historyRowsHtml}</tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    container.querySelectorAll('input[name="exam-source"]').forEach((radio) => {
      radio.addEventListener("change", (e) => {
        setupSource = e.target.value;
        renderSetup();
      });
    });

    const fullBtn = container.querySelector("#exam-start-full-btn");
    if (fullBtn) {
      fullBtn.addEventListener("click", () => startPreset("full", { source: setupSource }));
    }

    const quickBtn = container.querySelector("#exam-start-quick-btn");
    if (quickBtn) {
      quickBtn.addEventListener("click", () => startPreset("quick", { source: setupSource }));
    }

    container.querySelectorAll(".exam-start-cp-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const cpId = btn.getAttribute("data-cp-id");
        startCheckpoint(cpId);
      });
    });

    container.querySelectorAll(".exam-view-result-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const rid = btn.getAttribute("data-result-id");
        const found = history.find((h) => h.id === rid);
        if (found) {
          lastResult = found;
          reviewFilter = "all";
          renderResult(found);
        }
      });
    });
  }

  function isQuestionFullyAnswered(q, ans) {
    if (ans === undefined || ans === null) return false;
    if (Array.isArray(q?.correctIdxs)) {
      return Array.isArray(ans) && ans.length === q.correctIdxs.length;
    }
    return typeof ans === "number";
  }

  function isQuestionPartiallyAnswered(q, ans) {
    if (!Array.isArray(q?.correctIdxs)) return false;
    return Array.isArray(ans) && ans.length > 0 && ans.length < q.correctIdxs.length;
  }

  function renderExam() {
    const container = document.getElementById("exam-container");
    if (!container || !activeExam) return;

    const hub = getHub();
    const engine = getEngine();
    if (!hub || !engine) return;

    const qIds = activeExam.def.questionIds || [];
    const total = qIds.length;
    const curIdx = Math.min(Math.max(0, activeExam.currentIdx || 0), Math.max(0, total - 1));
    const qid = qIds[curIdx];
    const q = hub.getQuizById(qid);
    if (!q) return;

    const remMs = engine.remainingMs(activeExam, getNow());
    const isMulti = Array.isArray(q.correctIdxs);
    const ans = activeExam.answers[qid];
    const isFlagged = Boolean(activeExam.flagged && activeExam.flagged[qid]);
    const order = activeExam.def.optionOrder[qid] || q.options.map((_, idx) => idx);
    const letters = ["A", "B", "C", "D", "E"];

    let unansweredCount = 0;
    for (const id of qIds) {
      const itemQ = hub.getQuizById(id);
      const itemAns = activeExam.answers[id];
      if (!isQuestionFullyAnswered(itemQ, itemAns)) {
        unansweredCount++;
      }
    }

    const warnings = activeExam.warnings || pendingWarnings || [];
    const missingSessions = activeExam.missingSessions || pendingMissingSessions || [];

    const warningsHtml =
      warnings.length > 0
        ? `<div class="exam-warnings">${warnings.map((w) => `<div>ℹ️ ${escapeHtml(w)}</div>`).join("")}</div>`
        : "";

    const missingHtml =
      missingSessions.length > 0
        ? `<div class="checkpoint-missing-warning">
            ⚠️ <strong>Lưu ý:</strong> Bạn chưa đánh dấu hoàn thành ${missingSessions.length} buổi trong phạm vi chặng này (${missingSessions.map((s) => `#${s}`).join(", ")}). Bạn vẫn có thể bắt đầu làm bài ngay để tự đánh giá năng lực!
          </div>`
        : "";

    const optionsHtml = order
      .map((origIdx, dispIdx) => {
        const rawText = q.options[origIdx] || "";
        const cleanText = stripOptionPrefix(rawText);
        const dispLetter = letters[dispIdx] || String(dispIdx + 1);
        const isSelected = isMulti
          ? Array.isArray(ans) && ans.includes(origIdx)
          : ans === origIdx;

        return `
          <button
            type="button"
            class="exam-option ${isSelected ? "selected" : ""}"
            data-orig-idx="${origIdx}"
            data-display-idx="${dispIdx}"
          >
            <span class="exam-opt-indicator">${isMulti ? (isSelected ? "☑️" : "⬜") : `(${dispLetter})`}</span>
            <span class="exam-opt-text"><strong>${dispLetter}.</strong> ${escapeHtml(cleanText)}</span>
          </button>
        `;
      })
      .join("");

    const navCellsHtml = qIds
      .map((id, idx) => {
        const itemQ = hub.getQuizById(id);
        const itemAns = activeExam.answers[id];
        const cellClasses = ["exam-nav-cell"];
        if (idx === curIdx) cellClasses.push("current");
        if (isQuestionFullyAnswered(itemQ, itemAns)) cellClasses.push("answered");
        else if (isQuestionPartiallyAnswered(itemQ, itemAns)) cellClasses.push("partial");
        if (activeExam.flagged && activeExam.flagged[id]) cellClasses.push("flagged");

        return `
          <button
            type="button"
            class="${cellClasses.join(" ")}"
            data-idx="${idx}"
            data-qid="${escapeHtml(id)}"
          >
            ${idx + 1}${activeExam.flagged && activeExam.flagged[id] ? "🚩" : ""}
          </button>
        `;
      })
      .join("");

    container.innerHTML = `
      <div class="exam-active-view" data-exam-id="${escapeHtml(activeExam.def.id)}">
        <div class="exam-sticky-bar">
          <div class="exam-bar-left">
            <strong>${escapeHtml(activeExam.def.label)}</strong>
            <span class="exam-q-progress">Câu ${curIdx + 1} / ${total}</span>
          </div>
          <div class="exam-bar-right">
            <span class="exam-timer-label">⏱ Thời gian còn lại:</span>
            <span id="exam-timer" class="exam-timer ${remMs <= 60000 ? "danger" : remMs <= 600000 ? "warning" : ""}">${formatTimer(remMs)}</span>
          </div>
        </div>

        ${missingHtml}
        ${warningsHtml}

        <div class="exam-question-card" data-quiz-id="${escapeHtml(q.id)}">
          <div class="exam-question-meta">
            <span class="quiz-domain-badge">Domain ${q.domain || 1} · Task ${escapeHtml(q.task || "1.1")}</span>
            ${isMulti ? `<span class="exam-multi-badge">Choose TWO (Chọn 2 phương án)</span>` : ""}
          </div>
          <div class="exam-q-en">${escapeHtml(q.qEn)}</div>
          ${q.qVi ? `<div class="exam-q-vi">${escapeHtml(q.qVi)}</div>` : ""}

          <div class="exam-options">${optionsHtml}</div>
        </div>

        <div class="exam-actions-bar">
          <button type="button" id="exam-prev-btn" class="btn-secondary" ${curIdx === 0 ? "disabled" : ""}>
            ← Câu trước
          </button>
          <button type="button" id="exam-flag-btn" class="btn-secondary ${isFlagged ? "flagged" : ""}">
            ${isFlagged ? "🚩 Đã cắm cờ (Bỏ cờ)" : "🚩 Đánh dấu xem lại"}
          </button>
          <button type="button" id="exam-next-btn" class="btn-secondary" ${curIdx >= total - 1 ? "disabled" : ""}>
            Câu tiếp →
          </button>
          <button type="button" id="exam-submit-btn" class="btn-primary">
            ✅ Nộp bài (${unansweredCount > 0 ? `còn ${unansweredCount} câu chưa hoàn tất` : "đã làm đủ"})
          </button>
        </div>

        <div class="exam-nav-panel">
          <div class="exam-nav-title">Bảng điều hướng câu hỏi (Phím tắt: 1–5 chọn đáp án, F cắm cờ, ←/→ chuyển câu)</div>
          <div class="exam-nav-grid">${navCellsHtml}</div>
        </div>
      </div>
    `;

    container.querySelectorAll(".exam-option").forEach((btn) => {
      btn.addEventListener("click", () => {
        const origIdx = Number(btn.getAttribute("data-orig-idx"));
        handleSelectOption(q, origIdx);
      });
    });

    const prevBtn = container.querySelector("#exam-prev-btn");
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        activeExam = engine.goTo(activeExam, curIdx - 1);
        saveActiveToStorage(activeExam);
        renderExam();
      });
    }

    const nextBtn = container.querySelector("#exam-next-btn");
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        activeExam = engine.goTo(activeExam, curIdx + 1);
        saveActiveToStorage(activeExam);
        renderExam();
      });
    }

    const flagBtn = container.querySelector("#exam-flag-btn");
    if (flagBtn) {
      flagBtn.addEventListener("click", () => {
        activeExam = engine.toggleFlag(activeExam, q.id);
        saveActiveToStorage(activeExam);
        renderExam();
      });
    }

    const submitBtn = container.querySelector("#exam-submit-btn");
    if (submitBtn) {
      submitBtn.addEventListener("click", () => {
        submit({ auto: false });
      });
    }

    container.querySelectorAll(".exam-nav-cell").forEach((cell) => {
      cell.addEventListener("click", () => {
        const idx = Number(cell.getAttribute("data-idx"));
        activeExam = engine.goTo(activeExam, idx);
        saveActiveToStorage(activeExam);
        renderExam();
      });
    });
  }

  function renderResult(result) {
    stopTimerLoop();
    const container = document.getElementById("exam-container");
    if (!container || !result) return;

    const hub = getHub();
    const engine = getEngine();
    if (!hub || !engine) return;

    const pctVal = Math.round((result.pct || 0) * 100);
    const isCheckpoint = result.mode === "checkpoint";

    const domainRowsHtml = [1, 2, 3, 4]
      .map((d) => {
        const stat = (result.byDomain && result.byDomain[d]) || { total: 0, correct: 0, pct: 0 };
        const dpct = Math.round((stat.pct || 0) * 100);
        return `
          <tr>
            <td>${escapeHtml(DOMAIN_NAMES[d])}</td>
            <td><strong>${stat.correct} / ${stat.total}</strong></td>
            <td>
              <div class="exam-domain-bar-track">
                <div class="exam-domain-bar-fill" style="width:${dpct}%"></div>
              </div>
              <span>${dpct}%</span>
            </td>
          </tr>
        `;
      })
      .join("");

    // Checkpoint current vs prior phase breakdown
    let checkpointGroupHtml = "";
    if (isCheckpoint && result.byPhaseGroup) {
      const cur = result.byPhaseGroup.current || { total: 0, correct: 0, pct: 0 };
      const pri = result.byPhaseGroup.prior || { total: 0, correct: 0, pct: 0 };
      checkpointGroupHtml = `
        <div class="checkpoint-phase-breakdown">
          <h4>🧭 Phân tích theo Chặng hiện tại / Chặng trước</h4>
          <div class="checkpoint-phase-grid">
            <div class="checkpoint-phase-box">
              <strong>Chặng hiện tại:</strong> ${cur.correct}/${cur.total} câu đúng (${Math.round((cur.pct || 0) * 100)}%)
            </div>
            <div class="checkpoint-phase-box">
              <strong>Chặng trước (ôn tập cộng dồn):</strong> ${pri.correct}/${pri.total} câu đúng (${Math.round((pri.pct || 0) * 100)}%)
            </div>
          </div>
        </div>
      `;
    }

    // Weak sessions recommendation
    const weakList = engine.weakSessions(result, (id) => hub.getQuizById(id), 5);
    const sessionsData = (root.STUDY_DATA && root.STUDY_DATA.sessions) || [];
    const weakSessionsHtml =
      weakList.length === 0
        ? `<div class="exam-weak-sessions"><p>🎉 Tuyệt vời! Bạn không có buổi học nào bị sai trong bài kiểm tra này.</p></div>`
        : `
          <div class="exam-weak-sessions">
            <h4>📚 Buổi cần ôn lại (dựa trên các câu trả lời sai)</h4>
            <ul class="weak-sessions-list">
              ${weakList
                .map((ws) => {
                  const sObj = sessionsData.find((s) => Number(s.id) === Number(ws.sessionId));
                  const sTitle = sObj ? sObj.title : `Buổi #${ws.sessionId}`;
                  return `
                    <li>
                      <span>Buổi #${ws.sessionId}: <strong>${escapeHtml(sTitle)}</strong> — Sai ${ws.wrong}/${ws.total} câu</span>
                      <button type="button" class="btn-small weak-session-link" data-session-id="${ws.sessionId}">
                        📖 Mở Buổi #${ws.sessionId}
                      </button>
                    </li>
                  `;
                })
                .join("")}
            </ul>
          </div>
        `;

    // Filter questions for detailed review
    const wrongSet = new Set(result.wrongIds || []);
    const flaggedSet = new Set(result.flaggedIds || []);
    const unansweredSet = new Set(result.unansweredIds || []);
    const allIds = result.questionIds || [];

    const filteredIds = allIds.filter((qid) => {
      if (reviewFilter === "wrong") return wrongSet.has(qid);
      if (reviewFilter === "flagged") return flaggedSet.has(qid);
      if (reviewFilter === "unanswered") return unansweredSet.has(qid);
      return true;
    });

    const letters = ["A", "B", "C", "D", "E"];
    const reviewItemsHtml = filteredIds
      .map((qid) => {
        const q = hub.getQuizById(qid);
        if (!q) return "";
        const qIdx = allIds.indexOf(qid);
        const order = (result.optionOrder && result.optionOrder[qid]) || q.options.map((_, i) => i);
        const userAns = result.answers ? result.answers[qid] : undefined;
        const cSet = new Set(
          root.QuizEngine && typeof root.QuizEngine.correctSet === "function"
            ? root.QuizEngine.correctSet(q)
            : Array.isArray(q.correctIdxs) ? q.correctIdxs : [q.correctIdx]
        );
        const uSet = new Set(
          Array.isArray(userAns) ? userAns : typeof userAns === "number" ? [userAns] : []
        );
        const isRight = !unansweredSet.has(qid) && !wrongSet.has(qid);

        const optsReviewHtml = order
          .map((origIdx, dispIdx) => {
            const dispLetter = letters[dispIdx] || String(dispIdx + 1);
            const isCorrectOpt = cSet.has(origIdx);
            const isChosenOpt = uSet.has(origIdx);
            const whyText = Array.isArray(q.whyWrong) ? q.whyWrong[origIdx] : null;

            const cls = ["exam-review-option"];
            if (isCorrectOpt) cls.push("correct");
            else if (isChosenOpt) cls.push("wrong");

            return `
              <div class="${cls.join(" ")}">
                <div>
                  <strong>${dispLetter}.</strong> ${escapeHtml(stripOptionPrefix(q.options[origIdx]))}
                  ${isCorrectOpt ? `<span class="opt-tag-correct">✅ Đáp án đúng</span>` : ""}
                  ${isChosenOpt && !isCorrectOpt ? `<span class="opt-tag-wrong">❌ Bạn chọn</span>` : ""}
                  ${isChosenOpt && isCorrectOpt ? `<span class="opt-tag-chosen"> (Bạn đã chọn)</span>` : ""}
                </div>
                ${
                  !isCorrectOpt && whyText
                    ? `<div class="quiz-why-wrong">💡 <em>Vì sao sai:</em> ${escapeHtml(whyText)}</div>`
                    : ""
                }
              </div>
            `;
          })
          .join("");

        return `
          <div class="exam-review-card ${isRight ? "review-correct" : "review-wrong"}" data-quiz-id="${escapeHtml(q.id)}">
            <div class="exam-review-card-header">
              <strong>Câu ${qIdx + 1}:</strong>
              <span class="quiz-domain-badge">Domain ${q.domain || 1} · Task ${escapeHtml(q.task || "1.1")}</span>
              <span>${isRight ? "✅ Đúng" : unansweredSet.has(qid) ? "⚪ Chưa làm" : "❌ Sai"}</span>
              ${flaggedSet.has(qid) ? `<span>🚩 Đã cắm cờ</span>` : ""}
            </div>
            <div class="exam-q-en">${escapeHtml(q.qEn)}</div>
            ${q.qVi ? `<div class="exam-q-vi">${escapeHtml(q.qVi)}</div>` : ""}
            <div class="exam-review-options">${optsReviewHtml}</div>
            <div class="quiz-explanation"><strong>Giải thích:</strong> ${escapeHtml(q.explanation || "")}</div>
          </div>
        `;
      })
      .join("");

    const retryCandidatesCount =
      (result.wrongIds ? result.wrongIds.length : 0) +
      (result.unansweredIds ? result.unansweredIds.length : 0);

    container.innerHTML = `
      <div class="exam-result-view">
        <div class="exam-result-summary">
          <h2>📊 Kết quả: ${escapeHtml(result.label)}</h2>
          ${result.autoSubmitted ? `<div class="exam-auto-submitted-note">⏰ Bài thi được tự động nộp khi hết thời gian làm bài.</div>` : ""}
          <div class="exam-score-banner">
            <div class="exam-score-main">
              <div class="exam-score-pct">${pctVal}%</div>
              <div class="exam-score-raw">${result.correct} / ${result.total} câu đúng</div>
            </div>
            <div class="exam-score-scaled">
              <div>Điểm quy đổi <strong>ước lượng</strong>: <strong>${result.scaledScore} / 1000</strong> (ngưỡng đỗ ước lượng: 720, khuyến nghị mục tiêu ≥ 80%)</div>
              <div>
                ${
                  isCheckpoint
                    ? `Ngưỡng tham khảo Checkpoint (70%): <strong>${pctVal >= 70 ? "ĐẠT MỐC THAM KHẢO (≥ 70%)" : "CẦN ÔN TẬP THÊM (< 70%)"}</strong>`
                    : result.passedEstimate
                    ? `<span class="badge-pass">ĐẠT (ước lượng)</span>`
                    : `<span class="badge-fail">CHƯA ĐẠT (ước lượng)</span>`
                }
              </div>
            </div>
          </div>
        </div>

        ${checkpointGroupHtml}

        <div class="exam-domain-breakdown">
          <h3>📋 Điểm chi tiết theo 4 Domain</h3>
          <table class="comparison-table exam-domain-table">
            <thead>
              <tr>
                <th>Domain</th>
                <th>Số câu đúng</th>
                <th>Tỷ lệ</th>
              </tr>
            </thead>
            <tbody>${domainRowsHtml}</tbody>
          </table>
        </div>

        ${weakSessionsHtml}

        <div class="exam-result-actions">
          <button type="button" id="exam-retry-wrong-btn" class="btn-primary" ${retryCandidatesCount === 0 ? "disabled" : ""}>
            🔁 Làm lại câu sai (${retryCandidatesCount} câu)
          </button>
          <button type="button" id="exam-create-cards-btn" class="btn-secondary" ${retryCandidatesCount === 0 ? "disabled" : ""}>
            🗂️ Tạo flashcard từ câu sai
          </button>
          <button type="button" id="exam-back-setup-btn" class="btn-secondary">
            ⬅ Quay lại màn hình Thi thử
          </button>
        </div>

        <div class="exam-review-section">
          <h3>🔍 Xem lại chi tiết từng câu hỏi</h3>
          <div class="exam-review-filters">
            <button type="button" class="exam-review-filter ${reviewFilter === "all" ? "active" : ""}" data-filter="all">
              Tất cả (${allIds.length})
            </button>
            <button type="button" class="exam-review-filter ${reviewFilter === "wrong" ? "active" : ""}" data-filter="wrong">
              Sai (${(result.wrongIds || []).length})
            </button>
            <button type="button" class="exam-review-filter ${reviewFilter === "flagged" ? "active" : ""}" data-filter="flagged">
              Flag (${(result.flaggedIds || []).length})
            </button>
            <button type="button" class="exam-review-filter ${reviewFilter === "unanswered" ? "active" : ""}" data-filter="unanswered">
              Chưa làm (${(result.unansweredIds || []).length})
            </button>
          </div>
          <div class="exam-review-list">${reviewItemsHtml}</div>
        </div>
      </div>
    `;

    const retryBtn = container.querySelector("#exam-retry-wrong-btn");
    if (retryBtn) {
      retryBtn.addEventListener("click", () => {
        const pool = hub.getQuizPool({ pool: "exam" });
        const now = getNow();
        const retryBuilt = engine.buildRetryExam(result, pool, now);
        if (retryBuilt.def.questionIds.length === 0) return;
        pendingWarnings = [];
        pendingMissingSessions = [];
        activeExam = engine.startExam(retryBuilt.def, now);
        saveActiveToStorage(activeExam);
        renderExam();
        startTimerLoop();
      });
    }

    const createCardsBtn = container.querySelector("#exam-create-cards-btn");
    if (createCardsBtn) {
      createCardsBtn.addEventListener("click", () => {
        const targetIds =
          result.wrongIds && result.wrongIds.length > 0
            ? result.wrongIds
            : result.unansweredIds || [];
        const cards = targetIds
          .map((qid) => {
            const q = hub.getQuizById(qid);
            if (!q) return null;
            const cSet =
              root.QuizEngine && typeof root.QuizEngine.correctSet === "function"
                ? root.QuizEngine.correctSet(q)
                : new Set(Array.isArray(q.correctIdxs) ? q.correctIdxs : [q.correctIdx]);
            const correctTexts = [...cSet].map((idx) => q.options[idx]).join(" | ");
            return {
              sessionId: (Array.isArray(q.sessionIds) && q.sessionIds[0]) || 1,
              q: `[Exam ${q.id}] ${q.qVi || q.qEn}`,
              a: `Đáp án đúng: ${correctTexts}\nGiải thích: ${q.explanation || ""}`
            };
          })
          .filter(Boolean);

        if (cards.length > 0 && typeof hub.addCustomCards === "function") {
          hub.addCustomCards(cards);
          if (typeof hub.showToast === "function") {
            hub.showToast(`🗂️ Đã tạo ${cards.length} flashcard từ các câu trả lời sai!`);
          }
        }
      });
    }

    const backBtn = container.querySelector("#exam-back-setup-btn");
    if (backBtn) {
      backBtn.addEventListener("click", () => {
        renderSetup();
      });
    }

    container.querySelectorAll(".exam-review-filter").forEach((btn) => {
      btn.addEventListener("click", () => {
        reviewFilter = btn.getAttribute("data-filter") || "all";
        renderResult(result);
      });
    });

    container.querySelectorAll(".weak-session-link").forEach((btn) => {
      btn.addEventListener("click", () => {
        const sid = Number(btn.getAttribute("data-session-id"));
        if (typeof hub.goToSession === "function") {
          hub.goToSession(sid);
        }
      });
    });
  }

  const ExamUI = {
    ACTIVE_EXAM_KEY,
    onShow,
    startPreset,
    startSection,
    startCheckpoint,
    submit,
    tick,
    renderSetup,
    renderExam,
    renderResult,
    getActiveExam: () => activeExam,
    getLastResult: () => lastResult
  };

  if (root) {
    root.ExamUI = ExamUI;
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = ExamUI;
  }
})(typeof window !== "undefined" ? window : globalThis);
