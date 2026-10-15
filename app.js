(function () {
  const STORAGE_KEY = "aws_saa_c03_progress_v1";

  const CLOUD_SYNC_URL = "https://api.restful-api.dev/objects/ff808181a09d98f701a1399871fe5c18";
  let cloudPushTimer = null;

  const state = {
    currentSessionId: 1,
    completedIds: [],
    srsData: {},      // cardKey -> { interval, ease, due, reps }
    customCards: [],  // Array of { id, sessionId, q, a }
    notes: {},        // sessionId -> string
    updatedAt: 0,
    activeTab: "today",
    timer: {
      stepIndex: 0,
      secondsLeft: 600,
      running: false,
      intervalId: null
    },
    srsFilter: "unlocked", // "unlocked" | "all" | "current" | "custom"
    srsQueue: [],
    srsCurrentIndex: 0,
    srsRevealed: false
  };

  const FLOW_STEPS = [
    { num: 1, title: "Bước 1: Quẹt thẻ Anki (10p)", desc: "Ôn lại thẻ cũ đến hạn hôm nay", seconds: 10 * 60 },
    { num: 2, title: "Bước 2: Nạp kiến thức (20p)", desc: "Đọc tóm tắt bài học & xem video/slide", seconds: 20 * 60 },
    { num: 3, title: "Bước 3: Hỏi AI & Giải tình huống (20p)", desc: "Copy Prompt chuẩn hỏi AI & trả lời 2 câu quiz", seconds: 20 * 60 },
    { num: 4, title: "Bước 4: Đóng gói thẻ mới (10p)", desc: "Lật thẻ Flashcard bên dưới & đánh dấu hoàn thành", seconds: 10 * 60 }
  ];

  function setSyncBadgeStatus(text, isWarning = false) {
    const badge = document.getElementById("cloud-sync-badge");
    if (!badge) return;
    badge.textContent = text;
    badge.className = isWarning ? "badge badge-aws" : "badge badge-green";
  }

  // ================= PERSISTENCE & AUTOMATIC 2-MACHINE CLOUD SYNC =================
  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        state.currentSessionId = parsed.currentSessionId || 1;
        state.completedIds = Array.isArray(parsed.completedIds) ? parsed.completedIds : [];
        state.srsData = parsed.srsData || {};
        state.customCards = Array.isArray(parsed.customCards) ? parsed.customCards : [];
        state.notes = parsed.notes || {};
        state.updatedAt = parsed.updatedAt || 0;
      }
    } catch (e) {
      console.error("Failed to load state", e);
    }

    // Pull latest progress from Cloud automatically on startup
    pullFromCloud(true);
  }

  function saveLocalOnly() {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          currentSessionId: state.currentSessionId,
          completedIds: state.completedIds,
          srsData: state.srsData,
          customCards: state.customCards,
          notes: state.notes,
          updatedAt: state.updatedAt
        })
      );
    } catch (e) {
      console.error("Failed to save local state", e);
    }
  }

  function saveState() {
    state.updatedAt = Date.now();
    saveLocalOnly();
    schedulePushToCloud();
  }

  function schedulePushToCloud() {
    setSyncBadgeStatus("🔄 Đang đồng bộ Cloud...", true);
    if (cloudPushTimer) clearTimeout(cloudPushTimer);
    cloudPushTimer = setTimeout(() => {
      pushToCloud();
    }, 350);
  }

  async function pushToCloud() {
    try {
      const payload = {
        name: "aws_saa_sync",
        data: {
          currentSessionId: state.currentSessionId,
          completedIds: state.completedIds,
          srsData: state.srsData,
          customCards: state.customCards,
          notes: state.notes,
          updatedAt: state.updatedAt
        }
      };
      const res = await fetch(CLOUD_SYNC_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const nowStr = new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
        setSyncBadgeStatus(`☁️ Auto-Sync: Đã lưu (${nowStr})`);
      } else {
        setSyncBadgeStatus("⚠️ Cloud Sync tạm gián đoạn", true);
      }
    } catch (e) {
      setSyncBadgeStatus("⚠️ Offline (Đã lưu trên máy)", true);
    }
  }

  function mergeCustomCards(localArr, cloudArr) {
    const map = new Map();
    (Array.isArray(localArr) ? localArr : []).forEach((c) => {
      if (c && c.id) map.set(c.id, c);
    });
    (Array.isArray(cloudArr) ? cloudArr : []).forEach((c) => {
      if (c && c.id) map.set(c.id, c);
    });
    return Array.from(map.values());
  }

  async function pullFromCloud(silent = true) {
    try {
      if (!silent) setSyncBadgeStatus("🔄 Đang kiểm tra Cloud...", true);
      const res = await fetch(CLOUD_SYNC_URL, { cache: "no-store" });
      if (!res.ok) return;
      const json = await res.json();
      const cloud = json && json.data;
      if (!cloud) return;

      const cloudTime = Number(cloud.updatedAt || 0);
      if (cloudTime > state.updatedAt) {
        state.currentSessionId = Number(cloud.currentSessionId || 1);
        const mergedCompleted = new Set([
          ...(Array.isArray(state.completedIds) ? state.completedIds : []),
          ...(Array.isArray(cloud.completedIds) ? cloud.completedIds : [])
        ]);
        state.completedIds = Array.from(mergedCompleted).sort((a, b) => a - b);
        state.srsData = { ...state.srsData, ...(cloud.srsData || {}) };
        state.customCards = mergeCustomCards(state.customCards, cloud.customCards);
        state.notes = { ...state.notes, ...(cloud.notes || {}) };
        state.updatedAt = cloudTime;

        saveLocalOnly();
        renderAll();
        if (!silent) showToast("☁️ Đã cập nhật tiến độ & thẻ mới nhất từ Cloud!");
      } else if (state.updatedAt > cloudTime && state.updatedAt > 0) {
        await pushToCloud();
      }
      const nowStr = new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
      setSyncBadgeStatus(`☁️ Auto-Sync: Trực tuyến (${nowStr})`);
    } catch (e) {
      console.warn("Cloud pull skipped:", e);
    }
  }

  function generateSyncCode() {
    const payload = {
      c: state.currentSessionId,
      d: state.completedIds,
      s: state.srsData,
      cc: state.customCards,
      n: state.notes
    };
    return btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
  }

  function applySyncCode(code, silent) {
    try {
      const clean = code.trim().replace(/^.*#sync=/, "");
      const jsonStr = decodeURIComponent(escape(atob(clean)));
      const parsed = JSON.parse(jsonStr);
      if (parsed && typeof parsed.c === "number") {
        state.currentSessionId = parsed.c;
        state.completedIds = Array.isArray(parsed.d) ? parsed.d : [];
        if (parsed.s) state.srsData = parsed.s;
        if (Array.isArray(parsed.cc)) state.customCards = parsed.cc;
        if (parsed.n) state.notes = parsed.n;
        saveState();
        renderAll();
        if (!silent) showToast("✅ Đã đồng bộ tiến độ học thành công!");
        return true;
      }
    } catch (e) {
      if (!silent) showToast("⚠️ Mã đồng bộ không hợp lệ!");
    }
    return false;
  }

  // ================= UI HELPERS =================
  function showToast(msg) {
    const el = document.getElementById("toast");
    if (!el) return;
    el.textContent = msg;
    el.classList.add("show");
    setTimeout(() => el.classList.remove("show"), 2800);
  }

  function getSession(id) {
    return window.STUDY_DATA.sessions.find((s) => s.id === Number(id)) || window.STUDY_DATA.sessions[0];
  }

  // ================= RENDER PROGRESS BANNER =================
  function renderProgressBanner() {
    const total = window.STUDY_DATA.sessions.length;
    const done = state.completedIds.length;
    const pct = Math.round((done / total) * 100);

    document.getElementById("progress-pct-text").textContent = `${pct}% (${done}/${total} Buổi)`;
    document.getElementById("progress-bar-fill").style.width = `${pct}%`;
    document.getElementById("stat-current-session").textContent = `Buổi #${state.currentSessionId}`;
    document.getElementById("stat-completed-count").textContent = `${done} / ${total}`;

    // Count due flashcards
    const allCards = getAllFlashcards("unlocked");
    const now = Date.now();
    const dueCount = allCards.filter((c) => {
      const info = state.srsData[c.key];
      return !info || info.due <= now;
    }).length;
    document.getElementById("stat-due-cards").textContent = `${dueCount} thẻ`;
  }

  // ================= 60-MIN FLOW TIMER =================
  function renderFlowTimer() {
    const step = FLOW_STEPS[state.timer.stepIndex];
    const mins = String(Math.floor(state.timer.secondsLeft / 60)).padStart(2, "0");
    const secs = String(state.timer.secondsLeft % 60).padStart(2, "0");

    document.getElementById("timer-clock").textContent = `${mins}:${secs}`;
    document.getElementById("timer-step-label").textContent = step.title;
    document.getElementById("btn-timer-toggle").textContent = state.timer.running ? "⏸ Tạm dừng" : "▶️ Bắt đầu đếm";

    const stepsContainer = document.getElementById("flow-steps-list");
    stepsContainer.innerHTML = FLOW_STEPS.map((s, idx) => `
      <div class="flow-step ${idx === state.timer.stepIndex ? "active" : ""}" data-step-idx="${idx}">
        <div class="flow-step-num">${s.num}</div>
        <div class="flow-step-info">
          <h4>${s.title}</h4>
          <p>${s.desc}</p>
        </div>
      </div>
    `).join("");

    stepsContainer.querySelectorAll(".flow-step").forEach((el) => {
      el.addEventListener("click", () => {
        const idx = Number(el.getAttribute("data-step-idx"));
        selectTimerStep(idx);
      });
    });
  }

  function selectTimerStep(idx) {
    pauseTimer();
    state.timer.stepIndex = idx;
    state.timer.secondsLeft = FLOW_STEPS[idx].seconds;
    renderFlowTimer();
  }

  function toggleTimer() {
    if (state.timer.running) {
      pauseTimer();
    } else {
      state.timer.running = true;
      state.timer.intervalId = setInterval(() => {
        if (state.timer.secondsLeft > 0) {
          state.timer.secondsLeft--;
          renderFlowTimer();
        } else {
          pauseTimer();
          showToast(`⏰ Đã hết giờ ${FLOW_STEPS[state.timer.stepIndex].title}! Chuyển sang bước tiếp theo nhé.`);
          if (state.timer.stepIndex < FLOW_STEPS.length - 1) {
            selectTimerStep(state.timer.stepIndex + 1);
          }
        }
      }, 1000);
      renderFlowTimer();
    }
  }

  function pauseTimer() {
    state.timer.running = false;
    if (state.timer.intervalId) {
      clearInterval(state.timer.intervalId);
      state.timer.intervalId = null;
    }
    renderFlowTimer();
  }

  function resetTimer() {
    pauseTimer();
    state.timer.secondsLeft = FLOW_STEPS[state.timer.stepIndex].seconds;
    renderFlowTimer();
  }

  // ================= RENDER TODAY'S LESSON =================
  function buildAiPromptForSession(session) {
    const cleanPoints = session.corePoints.map((p) => p.replace(/<[^>]+>/g, "")).join("\n- ");
    return `Tôi là Java Developer (5 năm kinh nghiệm) đang ôn thi chứng chỉ AWS SAA-C03.
Hôm nay tôi đang học Buổi #${session.id}: "${session.title}" (${session.section}).
Các ý chính trong bài hôm nay:
- ${cleanPoints}

Hãy đóng vai gia sư AWS thực chiến và giúp tôi:
1. Giải thích sâu hơn cách dịch vụ/tính năng này ứng dụng trong kiến trúc hệ thống Java thực tế.
2. Đưa ra 2 câu hỏi trắc nghiệm tình huống (Scenario-based giống đề thi SAA-C03 thật, bằng tiếng Anh kèm dịch tiếng Việt) về đúng chủ đề này để tôi làm thử. (Khoan hiện đáp án, hãy đợi tôi chọn đáp án trước rồi mới giải thích tại sao đúng và tại sao các câu còn lại sai).
3. Sau khi giải thích xong, hãy tóm tắt cho tôi 3 thẻ Flashcard theo đúng định dạng "Câu hỏi | Đáp án" (mỗi thẻ 1 dòng, ngăn cách bởi dấu |) để tôi copy dán thẳng vào Web Spaced Repetition của tôi.`;
  }

  function openAddCardModal(defaultSessionId) {
    const modal = document.getElementById("add-card-modal");
    const select = document.getElementById("new-card-session-select");
    const targetId = defaultSessionId || state.currentSessionId;
    select.innerHTML = window.STUDY_DATA.sessions.map((s) => `
      <option value="${s.id}" ${s.id === Number(targetId) ? "selected" : ""}>
        Buổi #${s.id}: ${s.title}
      </option>
    `).join("");
    document.getElementById("new-card-q").value = "";
    document.getElementById("new-card-a").value = "";
    document.getElementById("new-card-bulk").value = "";
    modal.classList.add("open");
    setTimeout(() => document.getElementById("new-card-q").focus(), 100);
  }

  function renderTodayLesson() {
    const session = getSession(state.currentSessionId);
    const phaseObj = window.STUDY_DATA.phases.find((p) => p.id === session.phase);
    const isCompleted = state.completedIds.includes(session.id);

    const container = document.getElementById("today-lesson-container");
    const promptText = buildAiPromptForSession(session);
    const sessionCustomCards = state.customCards.filter((c) => Number(c.sessionId) === session.id);

    container.innerHTML = `
      <div class="lesson-nav-bar">
        <div style="display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap;">
          <button class="btn btn-outline btn-sm" id="btn-prev-session" ${session.id <= 1 ? "disabled" : ""}>← Buổi trước</button>
          <select id="session-quick-select" style="background:var(--bg-primary); color:var(--text-primary); border:1px solid var(--border-color); padding:0.4rem 0.6rem; border-radius:8px; font-weight:600; max-width:320px;">
            ${window.STUDY_DATA.sessions.map((s) => `
              <option value="${s.id}" ${s.id === session.id ? "selected" : ""}>
                ${state.completedIds.includes(s.id) ? "✅ " : "📍 "}Buổi ${s.id}: ${s.title}
              </option>
            `).join("")}
          </select>
          <button class="btn btn-outline btn-sm" id="btn-next-session" ${session.id >= window.STUDY_DATA.sessions.length ? "disabled" : ""}>Buổi kế tiếp →</button>
        </div>

        <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
          <button class="btn ${isCompleted ? "btn-outline" : "btn-success"}" id="btn-complete-session">
            ${isCompleted ? "✅ Đã hoàn thành buổi này (Bấm để bỏ đánh dấu)" : "🎉 Hoàn thành Buổi #" + session.id + " & Sang buổi kế tiếp"}
          </button>
        </div>
      </div>

      <div style="display:flex; gap:0.5rem; flex-wrap:wrap; margin-bottom:0.5rem;">
        <span class="badge badge-aws">${phaseObj ? phaseObj.name.split(":")[0] : "Chặng " + session.phase}</span>
        <span class="badge badge-blue">📚 ${session.section}</span>
        <span class="badge badge-purple">🎯 Cách học: ${session.mode}</span>
        ${isCompleted ? `<span class="badge badge-green">✓ Đã học xong</span>` : ""}
      </div>

      <h2 class="lesson-title">Buổi #${session.id}: ${session.title}</h2>

      <!-- Góc nhìn Java Developer -->
      <div class="lesson-section-block java-box">
        <h3>☕ Liên hệ thực tế cho Java Developer (5 năm KN)</h3>
        <p style="font-size:0.95rem; color:#e2e8f0;">${session.javaAnalogy}</p>
      </div>

      ${session.jargon && session.jargon.length ? `
        <!-- Giải ngố thuật ngữ hàn lâm -->
        <div class="lesson-section-block" style="border-left:4px solid var(--accent-green);">
          <h3>💡 Từ Điển "Giải Ngố" Thuật Ngữ Hàn Lâm (Đọc hiểu ngay không sợ chữ chuyên ngành)</h3>
          <div class="jargon-grid">
            ${session.jargon.map((j) => `
              <div class="jargon-item">
                <div class="jargon-term">${j.term}</div>
                <div class="jargon-plain">${j.plain}</div>
              </div>
            `).join("")}
          </div>
        </div>
      ` : ""}

      <!-- Bài giảng chi tiết toàn diện -->
      <div class="lesson-section-block core-box">
        <h3>📚 Bài Giảng Chi Tiết Từ A-Z (Đủ 100% kiến thức đi thi - Không cần đọc Cheat Sheet tiếng Anh!)</h3>
        <ul class="bullet-list" style="margin-bottom:0.85rem;">
          ${session.corePoints.map((pt) => `<li>${pt}</li>`).join("")}
        </ul>

        ${session.diagram ? `
          <div style="margin:0.85rem 0;">
            <div style="font-size:0.82rem; font-weight:700; color:var(--accent-blue);">📐 SƠ ĐỒ KIẾN TRÚC & LUỒNG HOẠT ĐỘNG TRỰC QUAN:</div>
            <div class="diagram-box">${session.diagram}</div>
          </div>
        ` : ""}

        ${session.deepSections && session.deepSections.length ? `
          <div class="deep-dive-list">
            ${session.deepSections.map((ds) => `
              <div class="deep-dive-item">
                <h4>${ds.title}</h4>
                <div>${ds.content}</div>
              </div>
            `).join("")}
          </div>
        ` : ""}
      </div>

      <!-- Bẫy đề thi -->
      <div class="lesson-section-block trap-box">
        <h3>🚨 Bẫy Đề Thi & Từ Khóa Nhận Diện (Exam Traps)</h3>
        <ul class="bullet-list">
          ${session.examTraps.map((trap) => `<li>${trap}</li>`).join("")}
        </ul>
      </div>

      ${session.quizzes && session.quizzes.length ? `
        <!-- Câu hỏi thi thử tương tác ngay trên web -->
        <div class="lesson-section-block" style="border-left:4px solid var(--accent-aws);">
          <h3>✍️ Thực Chiến Câu Hỏi Thi Thật Ngay Tại Chỗ (Bấm chọn đáp án để kiểm tra xem bạn đã đủ kiến thức chưa!)</h3>
          ${session.quizzes.map((qz, qIdx) => `
            <div class="quiz-card" data-quiz-idx="${qIdx}" data-correct-idx="${qz.correctIdx}">
              <div class="quiz-question-en">🇬🇧 ${qz.qEn}</div>
              <div class="quiz-question-vi">🇻🇳 Dịch: ${qz.qVi}</div>
              <div class="quiz-options">
                ${qz.options.map((opt, oIdx) => `
                  <button class="quiz-option" data-opt-idx="${oIdx}">${opt}</button>
                `).join("")}
              </div>
              <div class="quiz-explanation" id="quiz-exp-${qIdx}">
                <strong>✅ Giải thích chi tiết:</strong> ${qz.explanation}
              </div>
            </div>
          `).join("")}
        </div>
      ` : ""}

      <!-- Bước 3: Prompt AI -->
      <div class="lesson-section-block prompt-box">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; margin-bottom:0.6rem;">
          <h3 style="margin-bottom:0;">🤖 Bước 3 (Tùy chọn): Prompt Hỏi Sâu Thêm Với AI</h3>
          <button class="btn btn-primary btn-sm" id="btn-copy-prompt">📋 Copy Prompt Hỏi AI Ngay</button>
        </div>
        <pre id="session-prompt-text" style="background:var(--bg-primary); border:1px solid var(--border-color); padding:0.85rem; border-radius:8px; font-size:0.84rem; color:#cbd5e1; white-space:pre-wrap; font-family:inherit;">${promptText}</pre>
      </div>

      <!-- Bước 4: Thẻ Flashcards của buổi này -->
      <div class="lesson-section-block">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem;">
          <h3 style="margin-bottom:0;">🗂️ Bước 4 (10 phút): Thẻ Spaced Repetition Của Buổi #${session.id} (Bấm vào thẻ để lật đáp án)</h3>
          <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
            <button class="btn btn-primary btn-sm" id="btn-add-card-lesson">➕ Thêm Thẻ Mới Vào Web</button>
            <button class="btn btn-outline btn-sm" id="btn-export-session-anki">⬇️ Xuất .tsv Anki</button>
          </div>
        </div>
        <div class="mini-cards-grid">
          ${session.cards.map((c, idx) => `
            <div class="flip-card" data-card-idx="${idx}">
              <div class="q-label">Thẻ chuẩn #${idx + 1} (Bấm để xem đáp án)</div>
              <div class="q-text">${c.q}</div>
              <div class="a-text"><strong>Đáp án:</strong> ${c.a}</div>
            </div>
          `).join("")}
          ${sessionCustomCards.map((c, idx) => `
            <div class="flip-card" style="border-color:rgba(56,189,248,0.45);" data-custom-id="${c.id}">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.35rem;">
                <span class="q-label" style="color:var(--accent-blue); margin-bottom:0;">✨ Thẻ bạn tạo #${idx + 1}</span>
                <button class="btn btn-outline btn-sm" data-delete-card="${c.id}" style="padding:0.1rem 0.45rem; font-size:0.72rem; color:#fca5a5; border-color:rgba(239,68,68,0.4);" title="Xóa thẻ này">🗑️</button>
              </div>
              <div class="q-text">${c.q}</div>
              <div class="a-text"><strong>Đáp án:</strong> ${c.a}</div>
            </div>
          `).join("")}
        </div>
      </div>

      <!-- Ghi chú cá nhân -->
      <div class="lesson-section-block">
        <h3>📝 Ghi chú nhanh của bạn cho Buổi #${session.id}</h3>
        <textarea id="session-note-input" rows="3" placeholder="Ghi lại từ vựng tiếng Anh hoặc điểm bạn hay quên ở buổi này (tự động lưu Cloud)..." style="width:100%; background:var(--bg-primary); color:var(--text-primary); border:1px solid var(--border-color); border-radius:8px; padding:0.75rem; font-family:inherit; font-size:0.9rem;">${state.notes[session.id] || ""}</textarea>
      </div>
    `;

    // Interactive Quiz Click Listeners
    container.querySelectorAll(".quiz-card").forEach((qCard) => {
      const correctIdx = Number(qCard.getAttribute("data-correct-idx"));
      const qIdx = qCard.getAttribute("data-quiz-idx");
      const expEl = document.getElementById(`quiz-exp-${qIdx}`);
      const optBtns = qCard.querySelectorAll(".quiz-option");

      optBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          const chosenIdx = Number(btn.getAttribute("data-opt-idx"));
          optBtns.forEach((b, i) => {
            b.classList.remove("correct", "wrong");
            if (i === correctIdx) b.classList.add("correct");
          });
          if (chosenIdx !== correctIdx) {
            btn.classList.add("wrong");
            showToast("❌ Chưa chính xác! Hãy đọc giải thích bên dưới nhé.");
          } else {
            showToast("🎯 Chính xác 100%! Bạn đã nắm vững ý này.");
          }
          if (expEl) expEl.classList.add("visible");
        });
      });
    });

    // Attach listeners
    document.getElementById("btn-prev-session").addEventListener("click", () => {
      if (state.currentSessionId > 1) {
        state.currentSessionId--;
        saveState();
        renderAll();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });

    document.getElementById("btn-next-session").addEventListener("click", () => {
      if (state.currentSessionId < window.STUDY_DATA.sessions.length) {
        state.currentSessionId++;
        saveState();
        renderAll();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });

    document.getElementById("session-quick-select").addEventListener("change", (e) => {
      state.currentSessionId = Number(e.target.value);
      saveState();
      renderAll();
    });

    document.getElementById("btn-complete-session").addEventListener("click", () => {
      const id = session.id;
      if (state.completedIds.includes(id)) {
        state.completedIds = state.completedIds.filter((x) => x !== id);
        showToast(`Đã bỏ đánh dấu hoàn thành Buổi #${id}`);
      } else {
        state.completedIds.push(id);
        const nextUncompleted = window.STUDY_DATA.sessions.find((s) => s.id > id && !state.completedIds.includes(s.id));
        if (nextUncompleted) {
          state.currentSessionId = nextUncompleted.id;
        }
        showToast(`🎉 Tuyệt vời! Bạn đã hoàn thành Buổi #${id}. Đã chuyển sẵn sang Buổi #${state.currentSessionId}!`);
      }
      saveState();
      renderAll();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    document.getElementById("btn-copy-prompt").addEventListener("click", () => {
      navigator.clipboard.writeText(promptText).then(() => {
        showToast("📋 Đã copy Prompt! Hãy dán vào ChatGPT / Gemini / Claude nhé.");
      });
    });

    document.getElementById("btn-add-card-lesson").addEventListener("click", () => {
      openAddCardModal(session.id);
    });

    document.getElementById("btn-export-session-anki").addEventListener("click", () => {
      exportAnkiTsv([...session.cards, ...sessionCustomCards], `AWS_SAA_C03_Buoi_${session.id}.tsv`);
    });

    container.querySelectorAll(".flip-card").forEach((cardEl) => {
      cardEl.addEventListener("click", (e) => {
        if (e.target.closest("[data-delete-card]")) return;
        cardEl.classList.toggle("revealed");
      });
    });

    container.querySelectorAll("[data-delete-card]").forEach((delBtn) => {
      delBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const cardId = delBtn.getAttribute("data-delete-card");
        state.customCards = state.customCards.filter((c) => c.id !== cardId);
        delete state.srsData[cardId];
        saveState();
        buildSrsQueue();
        renderAll();
        showToast("🗑️ Đã xóa thẻ tự tạo!");
      });
    });

    document.getElementById("session-note-input").addEventListener("input", (e) => {
      state.notes[session.id] = e.target.value;
      saveState();
    });
  }

  // ================= RENDER FULL CURRICULUM TAB =================
  function renderCurriculumList(searchTerm = "") {
    const container = document.getElementById("curriculum-phases-container");
    const q = searchTerm.trim().toLowerCase();

    container.innerHTML = window.STUDY_DATA.phases.map((phase) => {
      const sessions = window.STUDY_DATA.sessions.filter((s) => {
        if (s.phase !== phase.id) return false;
        if (!q) return true;
        return (
          s.title.toLowerCase().includes(q) ||
          s.section.toLowerCase().includes(q) ||
          s.corePoints.some((p) => p.toLowerCase().includes(q))
        );
      });

      if (sessions.length === 0) return "";

      const doneInPhase = sessions.filter((s) => state.completedIds.includes(s.id)).length;

      return `
        <div class="phase-block">
          <div class="phase-header">
            <div>
              <h3 style="font-size:1.05rem; color:var(--accent-aws);">${phase.name}</h3>
              <p style="font-size:0.82rem; color:var(--text-secondary);">${phase.desc}</p>
            </div>
            <span class="badge badge-green">Hoàn thành: ${doneInPhase} / ${sessions.length} buổi</span>
          </div>
          <div class="session-list">
            ${sessions.map((s) => {
              const isDone = state.completedIds.includes(s.id);
              const isCurr = s.id === state.currentSessionId;
              return `
                <div class="session-item ${isDone ? "completed" : ""} ${isCurr ? "current" : ""}" data-goto-session="${s.id}">
                  <div>
                    <div style="display:flex; align-items:center; gap:0.4rem; margin-bottom:0.25rem;">
                      <span class="badge ${isDone ? "badge-green" : "badge-blue"}">Buổi #${s.id}</span>
                      <span style="font-size:0.75rem; color:var(--text-secondary);">${s.section}</span>
                    </div>
                    <div style="font-weight:700; font-size:0.93rem; color:var(--text-primary);">${s.title}</div>
                  </div>
                  <div style="font-size:1.2rem;">
                    ${isDone ? "✅" : isCurr ? "👉" : "⭕"}
                  </div>
                </div>
              `;
            }).join("")}
          </div>
        </div>
      `;
    }).join("");

    container.querySelectorAll("[data-goto-session]").forEach((el) => {
      el.addEventListener("click", () => {
        state.currentSessionId = Number(el.getAttribute("data-goto-session"));
        saveState();
        switchTab("today");
        renderAll();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    });
  }

  // ================= SPACED REPETITION (ANKI WEB ENGINE) =================
  function getAllFlashcards(filterMode) {
    const list = [];
    window.STUDY_DATA.sessions.forEach((s) => {
      const isUnlocked = s.id <= state.currentSessionId || state.completedIds.includes(s.id);
      if (filterMode === "unlocked" && !isUnlocked) return;
      if (filterMode === "current" && s.id !== state.currentSessionId) return;

      if (filterMode !== "custom") {
        s.cards.forEach((c, idx) => {
          list.push({
            key: `s${s.id}_c${idx}`,
            sessionId: s.id,
            sessionTitle: s.title,
            q: c.q,
            a: c.a,
            isCustom: false
          });
        });
      }

      // Include user's custom cards for this session
      const customForSession = state.customCards.filter((cc) => Number(cc.sessionId) === s.id);
      customForSession.forEach((cc) => {
        list.push({
          key: cc.id,
          sessionId: s.id,
          sessionTitle: s.title,
          q: cc.q,
          a: cc.a,
          isCustom: true
        });
      });
    });
    return list;
  }

  function buildSrsQueue() {
    const cards = getAllFlashcards(state.srsFilter);
    cards.sort((a, b) => {
      const dueA = state.srsData[a.key]?.due || 0;
      const dueB = state.srsData[b.key]?.due || 0;
      return dueA - dueB;
    });
    state.srsQueue = cards;
    state.srsCurrentIndex = 0;
    state.srsRevealed = false;
  }

  function renderSrsTab() {
    if (state.srsQueue.length === 0) {
      buildSrsQueue();
    }
    const card = state.srsQueue[state.srsCurrentIndex];
    const container = document.getElementById("srs-arena-container");

    const filterBarHtml = `
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; margin-bottom:1rem;">
        <div style="display:flex; gap:0.4rem; flex-wrap:wrap;">
          <button class="btn btn-sm ${state.srsFilter === "unlocked" ? "btn-primary" : "btn-outline"}" data-srs-filter="unlocked">
            Thẻ từ các buổi đã học (${getAllFlashcards("unlocked").length})
          </button>
          <button class="btn btn-sm ${state.srsFilter === "current" ? "btn-primary" : "btn-outline"}" data-srs-filter="current">
            Chỉ Buổi #${state.currentSessionId} (${getAllFlashcards("current").length})
          </button>
          <button class="btn btn-sm ${state.srsFilter === "custom" ? "btn-primary" : "btn-outline"}" data-srs-filter="custom">
            ✨ Thẻ tự tạo (${state.customCards.length})
          </button>
          <button class="btn btn-sm ${state.srsFilter === "all" ? "btn-primary" : "btn-outline"}" data-srs-filter="all">
            Toàn bộ (${getAllFlashcards("all").length})
          </button>
        </div>
        <div style="display:flex; gap:0.4rem; flex-wrap:wrap;">
          <button class="btn btn-success btn-sm" id="btn-srs-add-card">➕ Thêm Thẻ Mới Vào Web</button>
          <button class="btn btn-outline btn-sm" id="btn-export-all-anki">⬇️ Xuất .tsv Anki</button>
        </div>
      </div>
    `;

    if (!card) {
      container.innerHTML = `
        <div class="srs-box">
          ${filterBarHtml}
          <div style="padding:2rem; color:var(--text-secondary);">
            <p style="margin-bottom:1rem;">Chưa có thẻ nào trong bộ lọc này.</p>
            <button class="btn btn-primary" id="btn-empty-add-card">➕ Tạo thẻ Spaced Repetition đầu tiên của bạn</button>
          </div>
        </div>
      `;
      attachSrsCommonListeners(container);
      const emptyBtn = document.getElementById("btn-empty-add-card");
      if (emptyBtn) emptyBtn.addEventListener("click", () => openAddCardModal(state.currentSessionId));
      return;
    }

    container.innerHTML = `
      <div class="srs-box">
        ${filterBarHtml}

        <div style="display:flex; justify-content:center; align-items:center; gap:0.5rem; font-size:0.84rem; color:var(--text-secondary);">
          <span>Thẻ ${state.srsCurrentIndex + 1} / ${state.srsQueue.length} • Thuộc <strong>Buổi #${card.sessionId}: ${card.sessionTitle}</strong></span>
          ${card.isCustom ? `<span class="badge badge-blue">✨ Thẻ của bạn</span>` : ""}
          ${card.isCustom ? `<button class="btn btn-outline btn-sm" id="btn-srs-delete-custom" style="padding:0.15rem 0.5rem; font-size:0.75rem; color:#fca5a5;">🗑️ Xóa</button>` : ""}
        </div>

        <div class="srs-card-surface" id="srs-card-surface">
          <div style="font-size:0.78rem; text-transform:uppercase; color:var(--accent-aws); font-weight:700; margin-bottom:0.5rem;">
            ${state.srsRevealed ? "ĐÁP ÁN CHUẨN SAA-C03" : "CÂU HỎI TÌNH HUỐNG (BẤM ĐỂ LẬT THẺ)"}
          </div>
          <div style="font-size:1.15rem; font-weight:700; max-width:600px;">
            ${card.q}
          </div>
          ${state.srsRevealed ? `
            <div style="margin-top:1.25rem; padding-top:1.25rem; border-top:1px dashed var(--border-color); font-size:1.05rem; color:var(--accent-green); font-weight:600;">
              ${card.a}
            </div>
          ` : `
            <div style="margin-top:1.25rem; font-size:0.82rem; color:var(--text-secondary);">
              👆 Nhấn vào khung này để kiểm tra đáp án
            </div>
          `}
        </div>

        ${state.srsRevealed ? `
          <div class="srs-rating-btns">
            <button class="btn btn-outline" style="border-color:var(--accent-red); color:#fca5a5;" data-rate="again">
              🔄 Quên (Hỏi lại ngay)
            </button>
            <button class="btn btn-outline" style="border-color:var(--accent-aws); color:#fcd34d;" data-rate="hard">
              😓 Hơi khó (Ôn ngày mai)
            </button>
            <button class="btn btn-outline" style="border-color:var(--accent-blue); color:#7dd3fc;" data-rate="good">
              👍 Nhớ rõ (3 ngày sau)
            </button>
            <button class="btn btn-outline" style="border-color:var(--accent-green); color:#6ee7b7;" data-rate="easy">
              ⚡ Quá dễ (7 ngày sau)
            </button>
          </div>
        ` : `
          <button class="btn btn-primary" id="btn-srs-show">👁️ Hiện Đáp Án</button>
        `}
      </div>
    `;

    attachSrsCommonListeners(container);

    const delCustomBtn = document.getElementById("btn-srs-delete-custom");
    if (delCustomBtn) {
      delCustomBtn.addEventListener("click", () => {
        state.customCards = state.customCards.filter((c) => c.id !== card.key);
        delete state.srsData[card.key];
        saveState();
        buildSrsQueue();
        renderAll();
        renderSrsTab();
        showToast("🗑️ Đã xóa thẻ tự tạo!");
      });
    }

    document.getElementById("srs-card-surface").addEventListener("click", () => {
      state.srsRevealed = !state.srsRevealed;
      renderSrsTab();
    });

    const showBtn = document.getElementById("btn-srs-show");
    if (showBtn) {
      showBtn.addEventListener("click", () => {
        state.srsRevealed = true;
        renderSrsTab();
      });
    }

    container.querySelectorAll("[data-rate]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const rate = btn.getAttribute("data-rate");
        const now = Date.now();
        const dayMs = 86400 * 1000;
        let nextDue = now + 60 * 1000;
        if (rate === "hard") nextDue = now + 1 * dayMs;
        if (rate === "good") nextDue = now + 3 * dayMs;
        if (rate === "easy") nextDue = now + 7 * dayMs;

        state.srsData[card.key] = {
          due: nextDue,
          lastRate: rate
        };
        saveState();
        state.srsCurrentIndex = (state.srsCurrentIndex + 1) % state.srsQueue.length;
        state.srsRevealed = false;
        renderProgressBanner();
        renderSrsTab();
      });
    });
  }

  function attachSrsCommonListeners(container) {
    container.querySelectorAll("[data-srs-filter]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.srsFilter = btn.getAttribute("data-srs-filter");
        buildSrsQueue();
        renderSrsTab();
      });
    });

    const addBtn = document.getElementById("btn-srs-add-card");
    if (addBtn) {
      addBtn.addEventListener("click", () => {
        openAddCardModal(state.currentSessionId);
      });
    }

    const expBtn = document.getElementById("btn-export-all-anki");
    if (expBtn) {
      expBtn.addEventListener("click", () => {
        const all = getAllFlashcards("all");
        exportAnkiTsv(all, "AWS_SAA_C03_Full_Deck.tsv");
      });
    }
  }

  function exportAnkiTsv(cardsArray, filename) {
    const lines = cardsArray.map((c) => {
      const front = c.q.replace(/\t|\n/g, " ");
      const back = c.a.replace(/\t|\n/g, " ");
      return `${front}\t${back}`;
    });
    const blob = new Blob([lines.join("\n")], { type: "text/tab-separated-values;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast(`⬇️ Đã tải file ${filename} (Mở Anki -> File -> Import để nạp thẻ)!`);
  }

  // ================= RENDER COMPARISON TABLES TAB =================
  function renderComparisonTab() {
    const container = document.getElementById("comparison-tables-container");
    container.innerHTML = window.STUDY_DATA.comparisonTables.map((tb) => `
      <div class="lesson-card" style="margin-bottom:1.5rem;">
        <h3 style="color:var(--accent-aws); font-size:1.15rem; margin-bottom:0.5rem;">${tb.title}</h3>
        <div class="comp-table-wrap">
          <table class="comp-table">
            <thead>
              <tr>
                ${tb.headers.map((h) => `<th>${h}</th>`).join("")}
              </tr>
            </thead>
            <tbody>
              ${tb.rows.map((r) => `
                <tr>
                  ${r.map((cell) => `<td>${cell}</td>`).join("")}
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `).join("");
  }

  // ================= RENDER FREE RESOURCES TAB =================
  function renderResourcesTab() {
    const container = document.getElementById("free-resources-container");
    container.innerHTML = window.STUDY_DATA.freeResources.map((res) => `
      <div class="resource-card">
        <div>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
            <span class="badge badge-aws">${res.badge}</span>
            <span style="font-size:0.75rem; color:var(--text-secondary);">${res.category}</span>
          </div>
          <h3 style="font-size:1.05rem; margin-bottom:0.4rem;">${res.title}</h3>
          <p style="font-size:0.86rem; color:var(--text-secondary);">${res.desc}</p>
        </div>
        <a href="${res.url}" target="_blank" rel="noopener" class="btn btn-primary" style="width:100%;">
          🚀 Truy cập tài liệu ngay ↗
        </a>
      </div>
    `).join("");
  }

  // ================= TABS & NAVIGATION =================
  function switchTab(tabId) {
    state.activeTab = tabId;
    document.querySelectorAll(".nav-tab").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-tab") === tabId);
    });
    document.querySelectorAll(".tab-pane").forEach((pane) => {
      pane.style.display = pane.id === `tab-${tabId}` ? "block" : "none";
    });
    if (tabId === "srs") {
      buildSrsQueue();
      renderSrsTab();
    }
  }

  function renderAll() {
    renderProgressBanner();
    renderFlowTimer();
    renderTodayLesson();
    renderCurriculumList(document.getElementById("curriculum-search")?.value || "");
    renderComparisonTab();
    renderResourcesTab();
  }

  // ================= INIT =================
  window.addEventListener("DOMContentLoaded", () => {
    loadState();
    renderAll();

    // Tab switching
    document.querySelectorAll(".nav-tab").forEach((btn) => {
      btn.addEventListener("click", () => {
        switchTab(btn.getAttribute("data-tab"));
      });
    });

    // Timer controls
    document.getElementById("btn-timer-toggle").addEventListener("click", toggleTimer);
    document.getElementById("btn-timer-reset").addEventListener("click", resetTimer);

    // Search curriculum
    const searchInput = document.getElementById("curriculum-search");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        renderCurriculumList(e.target.value);
      });
    }

    // Automatic sync when switching between computers / browser tabs
    window.addEventListener("focus", () => {
      pullFromCloud(true);
    });
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") {
        pullFromCloud(true);
      }
    });

    const cloudBadge = document.getElementById("cloud-sync-badge");
    if (cloudBadge) {
      cloudBadge.addEventListener("click", () => {
        pullFromCloud(false);
      });
    }

    // Add Card Modal Listeners
    const addCardModal = document.getElementById("add-card-modal");
    document.getElementById("btn-close-add-card").addEventListener("click", () => {
      addCardModal.classList.remove("open");
    });

    document.getElementById("btn-save-single-card").addEventListener("click", () => {
      const sId = Number(document.getElementById("new-card-session-select").value || state.currentSessionId);
      const q = document.getElementById("new-card-q").value.trim();
      const a = document.getElementById("new-card-a").value.trim();
      if (!q || !a) {
        showToast("⚠️ Vui lòng nhập cả Mặt trước (Câu hỏi) và Mặt sau (Đáp án)!");
        return;
      }
      state.customCards.push({
        id: "cust_" + Date.now() + "_" + Math.floor(Math.random() * 1000),
        sessionId: sId,
        q,
        a
      });
      saveState();
      buildSrsQueue();
      renderAll();
      if (state.activeTab === "srs") renderSrsTab();
      addCardModal.classList.remove("open");
      showToast("✅ Đã thêm thẻ mới vào Web & đồng bộ lên Cloud!");
    });

    document.getElementById("btn-save-bulk-cards").addEventListener("click", () => {
      const sId = Number(document.getElementById("new-card-session-select").value || state.currentSessionId);
      const raw = document.getElementById("new-card-bulk").value.trim();
      if (!raw) {
        showToast("⚠️ Vui lòng dán danh sách thẻ theo định dạng: Câu hỏi | Đáp án");
        return;
      }
      const lines = raw.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
      let added = 0;
      lines.forEach((line, idx) => {
        const parts = line.includes("|") ? line.split("|") : line.split("\t");
        if (parts.length >= 2) {
          const q = parts[0].replace(/^[-*•\d.)\s]+/, "").trim();
          const a = parts.slice(1).join(" | ").trim();
          if (q && a) {
            state.customCards.push({
              id: "cust_" + Date.now() + "_" + idx + "_" + Math.floor(Math.random() * 1000),
              sessionId: sId,
              q,
              a
            });
            added++;
          }
        }
      });

      if (added === 0) {
        showToast("⚠️ Không tìm thấy dòng hợp lệ! Hãy ngăn cách Câu hỏi và Đáp án bằng dấu |");
        return;
      }

      saveState();
      buildSrsQueue();
      renderAll();
      if (state.activeTab === "srs") renderSrsTab();
      addCardModal.classList.remove("open");
      showToast(`⚡ Đã nạp thành công ${added} thẻ mới vào Web & đồng bộ Cloud!`);
    });

    // Sync Modal
    const syncModal = document.getElementById("sync-modal");
    document.getElementById("btn-open-sync").addEventListener("click", () => {
      const code = generateSyncCode();
      const shareUrl = `${window.location.origin}${window.location.pathname}#sync=${code}`;
      document.getElementById("sync-url-output").value = shareUrl;
      document.getElementById("sync-code-input").value = "";
      syncModal.classList.add("open");
    });

    document.getElementById("btn-close-sync").addEventListener("click", () => {
      syncModal.classList.remove("open");
    });

    document.getElementById("btn-copy-sync-url").addEventListener("click", () => {
      const val = document.getElementById("sync-url-output").value;
      navigator.clipboard.writeText(val).then(() => {
        showToast("📋 Đã copy Link Sao Lưu Dự Phòng!");
      });
    });

    document.getElementById("btn-apply-sync-code").addEventListener("click", () => {
      const val = document.getElementById("sync-code-input").value;
      if (applySyncCode(val, false)) {
        syncModal.classList.remove("open");
      }
    });
  });
})();
