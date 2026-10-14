(function () {
  const STORAGE_KEY = "aws_saa_c03_progress_v1";

  const state = {
    currentSessionId: 1,
    completedIds: [],
    srsData: {}, // cardKey -> { interval, ease, due, reps }
    notes: {},   // sessionId -> string
    activeTab: "today",
    timer: {
      stepIndex: 0,
      secondsLeft: 600,
      running: false,
      intervalId: null
    },
    srsFilter: "unlocked", // "unlocked" | "all" | "current"
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

  // ================= PERSISTENCE & 2-MACHINE SYNC =================
  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        state.currentSessionId = parsed.currentSessionId || 1;
        state.completedIds = Array.isArray(parsed.completedIds) ? parsed.completedIds : [];
        state.srsData = parsed.srsData || {};
        state.notes = parsed.notes || {};
      }
    } catch (e) {
      console.error("Failed to load state", e);
    }

    // Check URL hash for instant 2-machine sync (#sync=...)
    if (window.location.hash && window.location.hash.startsWith("#sync=")) {
      const code = decodeURIComponent(window.location.hash.replace("#sync=", ""));
      applySyncCode(code, true);
    }
  }

  function saveState() {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          currentSessionId: state.currentSessionId,
          completedIds: state.completedIds,
          srsData: state.srsData,
          notes: state.notes
        })
      );
      updateUrlSyncHash();
    } catch (e) {
      console.error("Failed to save state", e);
    }
  }

  function generateSyncCode() {
    const payload = {
      c: state.currentSessionId,
      d: state.completedIds,
      s: state.srsData
    };
    return btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
  }

  function updateUrlSyncHash() {
    const shortPayload = {
      c: state.currentSessionId,
      d: state.completedIds
    };
    const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(shortPayload))));
    history.replaceState(null, "", "#sync=" + encoded);
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
2. Đưa ra 2 câu hỏi trắc nghiệm tình huống (Scenario-based giống đề thi SAA-C03 thật, bằng tiếng Anh kèm dịch tiếng Việt) về đúng chủ đề này để tôi làm thử. (Khoan hiện đáp án, hãy đợi tôi chọn đáp án trước rồi mới giải thích tại sao đúng và tại sao các câu còn lại sai).`;
  }

  function renderTodayLesson() {
    const session = getSession(state.currentSessionId);
    const phaseObj = window.STUDY_DATA.phases.find((p) => p.id === session.phase);
    const isCompleted = state.completedIds.includes(session.id);

    const container = document.getElementById("today-lesson-container");
    const promptText = buildAiPromptForSession(session);

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

      <!-- Kiến thức cốt lõi -->
      <div class="lesson-section-block core-box">
        <h3>📌 Kiến thức cốt lõi cần nắm trong 20 phút đầu</h3>
        <ul class="bullet-list">
          ${session.corePoints.map((pt) => `<li>${pt}</li>`).join("")}
        </ul>
        <div style="margin-top:0.9rem; padding-top:0.75rem; border-top:1px solid var(--border-color); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem;">
          <span style="font-size:0.84rem; color:var(--text-secondary);">📖 Tài liệu đọc thêm miễn phí chuẩn SAA-C03 cho buổi này:</span>
          <a href="${session.freeDocUrl}" target="_blank" rel="noopener" class="btn btn-outline btn-sm">
            🔗 Mở ${session.freeDocTitle} ↗
          </a>
        </div>
      </div>

      <!-- Bẫy đề thi -->
      <div class="lesson-section-block trap-box">
        <h3>🚨 Bẫy Đề Thi & Từ Khóa Nhận Diện (Exam Traps)</h3>
        <ul class="bullet-list">
          ${session.examTraps.map((trap) => `<li>${trap}</li>`).join("")}
        </ul>
      </div>

      <!-- Bước 3: Prompt AI -->
      <div class="lesson-section-block prompt-box">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; margin-bottom:0.6rem;">
          <h3 style="margin-bottom:0;">🤖 Bước 3 (20 phút): Prompt Hỏi AI & Làm 2 Câu Tình Huống</h3>
          <button class="btn btn-primary btn-sm" id="btn-copy-prompt">📋 Copy Prompt Hỏi AI Ngay</button>
        </div>
        <pre id="session-prompt-text" style="background:var(--bg-primary); border:1px solid var(--border-color); padding:0.85rem; border-radius:8px; font-size:0.84rem; color:#cbd5e1; white-space:pre-wrap; font-family:inherit;">${promptText}</pre>
      </div>

      <!-- Bước 4: Thẻ Flashcards của buổi này -->
      <div class="lesson-section-block">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem;">
          <h3 style="margin-bottom:0;">🗂️ Bước 4 (10 phút): Thẻ Anki Trọng Tâm Của Buổi #${session.id} (Bấm vào thẻ để lật đáp án)</h3>
          <button class="btn btn-outline btn-sm" id="btn-export-session-anki">⬇️ Tải thẻ buổi này (.tsv cho Anki)</button>
        </div>
        <div class="mini-cards-grid">
          ${session.cards.map((c, idx) => `
            <div class="flip-card" data-card-idx="${idx}">
              <div class="q-label">Câu hỏi Flashcard #${idx + 1} (Bấm để xem đáp án)</div>
              <div class="q-text">${c.q}</div>
              <div class="a-text"><strong>Đáp án:</strong> ${c.a}</div>
            </div>
          `).join("")}
        </div>
      </div>

      <!-- Ghi chú cá nhân -->
      <div class="lesson-section-block">
        <h3>📝 Ghi chú nhanh của bạn cho Buổi #${session.id}</h3>
        <textarea id="session-note-input" rows="3" placeholder="Ghi lại từ vựng tiếng Anh hoặc điểm bạn hay quên ở buổi này (tự động lưu)..." style="width:100%; background:var(--bg-primary); color:var(--text-primary); border:1px solid var(--border-color); border-radius:8px; padding:0.75rem; font-family:inherit; font-size:0.9rem;">${state.notes[session.id] || ""}</textarea>
      </div>
    `;

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
        // Move automatically to next uncompleted session
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

    document.getElementById("btn-export-session-anki").addEventListener("click", () => {
      exportAnkiTsv(session.cards, `AWS_SAA_C03_Buoi_${session.id}.tsv`);
    });

    container.querySelectorAll(".flip-card").forEach((cardEl) => {
      cardEl.addEventListener("click", () => {
        cardEl.classList.toggle("revealed");
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

      s.cards.forEach((c, idx) => {
        list.push({
          key: `s${s.id}_c${idx}`,
          sessionId: s.id,
          sessionTitle: s.title,
          q: c.q,
          a: c.a
        });
      });
    });
    return list;
  }

  function buildSrsQueue() {
    const cards = getAllFlashcards(state.srsFilter);
    const now = Date.now();
    // Sort due cards first
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

    if (!card) {
      container.innerHTML = `<div class="srs-box"><p>Không có thẻ nào trong bộ lọc này.</p></div>`;
      return;
    }

    container.innerHTML = `
      <div class="srs-box">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; margin-bottom:1rem;">
          <div style="display:flex; gap:0.4rem; flex-wrap:wrap;">
            <button class="btn btn-sm ${state.srsFilter === "unlocked" ? "btn-primary" : "btn-outline"}" data-srs-filter="unlocked">
              Thẻ từ các buổi đã học
            </button>
            <button class="btn btn-sm ${state.srsFilter === "current" ? "btn-primary" : "btn-outline"}" data-srs-filter="current">
              Chỉ thẻ Buổi #${state.currentSessionId}
            </button>
            <button class="btn btn-sm ${state.srsFilter === "all" ? "btn-primary" : "btn-outline"}" data-srs-filter="all">
              Toàn bộ khóa (${getAllFlashcards("all").length} thẻ)
            </button>
          </div>
          <button class="btn btn-outline btn-sm" id="btn-export-all-anki">⬇️ Xuất toàn bộ thẻ ra file Anki (.tsv)</button>
        </div>

        <div style="font-size:0.84rem; color:var(--text-secondary);">
          Thẻ ${state.srsCurrentIndex + 1} / ${state.srsQueue.length} • Thuộc <strong>Buổi #${card.sessionId}: ${card.sessionTitle}</strong>
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

    container.querySelectorAll("[data-srs-filter]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.srsFilter = btn.getAttribute("data-srs-filter");
        buildSrsQueue();
        renderSrsTab();
      });
    });

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

    document.getElementById("btn-export-all-anki").addEventListener("click", () => {
      const all = getAllFlashcards("all");
      exportAnkiTsv(all, "AWS_SAA_C03_Full_Deck.tsv");
    });
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
        showToast("📋 Đã copy Link Đồng Bộ! Gửi link này sang máy thứ 2 để học tiếp ngay.");
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
