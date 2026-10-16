(function () {
  const STORAGE_KEY = "aws_saa_c03_progress_v1";

  const CLOUD_SYNC_URL = "https://api.restful-api.dev/objects/ff808181a09d98f701a1399871fe5c18";
  let cloudPushTimer = null;
  let hasInitialCloudPullDone = false;
  let pendingPushAfterPull = false;

  const state = {
    currentSessionId: 1,
    completedIds: [],
    uncompletedAt: {}, // sessionId -> timestamp when explicitly unchecked
    srsData: {},       // cardKey -> { interval, ease, due, reps, updatedAt }
    customCards: [],   // Array of { id, sessionId, q, a }
    notes: {},         // sessionId -> string
    updatedAt: 0,
    activeTab: "today",
    srsFilter: "due",  // "due" | "completed" | "current" | "custom" | "all"
    srsQueue: [],
    srsCurrentIndex: 0,
    srsRevealed: false,
    showSrsTable: false
  };

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
        state.uncompletedAt = parsed.uncompletedAt || {};
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
          uncompletedAt: state.uncompletedAt,
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

  function saveState(immediate = false) {
    state.updatedAt = Date.now();
    saveLocalOnly();
    if (!hasInitialCloudPullDone) {
      // Prevent a freshly opened stale tab from overwriting Cloud before initial pull finishes
      pendingPushAfterPull = true;
      pullFromCloud(true);
      return;
    }
    if (immediate) {
      if (cloudPushTimer) clearTimeout(cloudPushTimer);
      setSyncBadgeStatus("🔄 Đang đồng bộ Cloud...", true);
      pushToCloud();
    } else {
      schedulePushToCloud();
    }
  }

  function schedulePushToCloud() {
    setSyncBadgeStatus("🔄 Đang đồng bộ Cloud...", true);
    if (cloudPushTimer) clearTimeout(cloudPushTimer);
    cloudPushTimer = setTimeout(() => {
      pushToCloud();
    }, 200);
  }

  async function pushToCloud() {
    try {
      const payload = {
        name: "aws_saa_sync",
        data: {
          currentSessionId: state.currentSessionId,
          completedIds: state.completedIds,
          uncompletedAt: state.uncompletedAt,
          srsData: state.srsData,
          customCards: state.customCards,
          notes: state.notes,
          updatedAt: state.updatedAt
        }
      };
      const res = await fetch(CLOUD_SYNC_URL, {
        method: "PUT",
        keepalive: true,
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

  function mergeSrsData(localSrs, cloudSrs) {
    const merged = { ...(localSrs || {}) };
    const incoming = cloudSrs || {};
    Object.keys(incoming).forEach((key) => {
      const loc = merged[key];
      const rem = incoming[key];
      if (!loc) {
        merged[key] = rem;
      } else {
        const locTime = Number(loc.updatedAt || loc.due || 0);
        const remTime = Number(rem.updatedAt || rem.due || 0);
        if (remTime >= locTime) {
          merged[key] = rem;
        }
      }
    });
    return merged;
  }

  function mergeCompletedIds(localIds, cloudIds, localUncompleted, cloudUncompleted, localTime, cloudTime) {
    const mergedUncompleted = { ...(localUncompleted || {}) };
    Object.entries(cloudUncompleted || {}).forEach(([k, ts]) => {
      if (!mergedUncompleted[k] || Number(ts) > Number(mergedUncompleted[k])) {
        mergedUncompleted[k] = Number(ts);
      }
    });

    const localSet = new Set(Array.isArray(localIds) ? localIds.map(Number) : []);
    const cloudSet = new Set(Array.isArray(cloudIds) ? cloudIds.map(Number) : []);
    const unionSet = new Set([...localSet, ...cloudSet]);

    const finalIds = [];
    unionSet.forEach((id) => {
      const inLocal = localSet.has(id);
      const inCloud = cloudSet.has(id);
      const uncompTs = Number(mergedUncompleted[id] || 0);
      if (inLocal && inCloud) {
        finalIds.push(id);
      } else if (inCloud && !inLocal) {
        // Cloud has it completed; keep it unless local explicitly unchecked it AFTER cloudTime
        if (uncompTs > cloudTime) return;
        finalIds.push(id);
      } else if (inLocal && !inCloud) {
        // Local has it completed; keep it unless cloud explicitly unchecked it AFTER localTime
        if (uncompTs > localTime) return;
        finalIds.push(id);
      }
    });

    return {
      completedIds: finalIds.sort((a, b) => a - b),
      uncompletedAt: mergedUncompleted
    };
  }

  async function pullFromCloud(silent = true) {
    try {
      if (!silent) setSyncBadgeStatus("🔄 Đang kiểm tra Cloud...", true);
      const res = await fetch(CLOUD_SYNC_URL, { cache: "no-store" });
      if (!res.ok) {
        hasInitialCloudPullDone = true;
        return;
      }
      const json = await res.json();
      const cloud = json && json.data;
      if (!cloud) {
        hasInitialCloudPullDone = true;
        return;
      }

      const cloudTime = Number(cloud.updatedAt || 0);
      const localTime = Number(state.updatedAt || 0);

      // Always union-merge completedIds, srsData, and customCards so no machine ever overwrites progress from the other
      const prevCompletedStr = JSON.stringify(state.completedIds);
      const prevSessionId = state.currentSessionId;

      const mergedComp = mergeCompletedIds(
        state.completedIds,
        cloud.completedIds,
        state.uncompletedAt,
        cloud.uncompletedAt,
        localTime,
        cloudTime
      );
      state.completedIds = mergedComp.completedIds;
      state.uncompletedAt = mergedComp.uncompletedAt;
      state.srsData = mergeSrsData(state.srsData, cloud.srsData);
      state.customCards = mergeCustomCards(state.customCards, cloud.customCards);
      state.notes = { ...(cloud.notes || {}), ...state.notes };

      // Determine best currentSessionId:
      // If cloud is newer, prefer cloud.currentSessionId; also if currentSessionId is already completed, advance to next uncompleted
      if (cloudTime >= localTime && cloud.currentSessionId) {
        state.currentSessionId = Number(cloud.currentSessionId);
      }
      if (state.completedIds.includes(state.currentSessionId)) {
        const nextUncompleted = window.STUDY_DATA.sessions.find((s) => !state.completedIds.includes(s.id));
        if (nextUncompleted) {
          state.currentSessionId = nextUncompleted.id;
        }
      }

      state.updatedAt = Math.max(localTime, cloudTime);
      hasInitialCloudPullDone = true;

      saveLocalOnly();
      buildSrsQueue();
      renderAll();
      if (state.activeTab === "srs") renderSrsTab();

      const cloudCompletedStr = JSON.stringify(
        Array.isArray(cloud.completedIds) ? [...cloud.completedIds].map(Number).sort((a, b) => a - b) : []
      );
      const mergedCompletedStr = JSON.stringify(state.completedIds);

      if (!silent || prevCompletedStr !== mergedCompletedStr || prevSessionId !== state.currentSessionId) {
        if (!silent) showToast("☁️ Đã đồng bộ tiến độ & lịch ôn SRS mới nhất từ Cloud!");
      }

      // If local had newer changes or merged state has more data than cloud, push merged state back to cloud
      if (pendingPushAfterPull || localTime > cloudTime || cloudCompletedStr !== mergedCompletedStr) {
        pendingPushAfterPull = false;
        await pushToCloud();
      } else {
        const nowStr = new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
        setSyncBadgeStatus(`☁️ Auto-Sync: Trực tuyến (${nowStr})`);
      }
    } catch (e) {
      hasInitialCloudPullDone = true;
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
        saveState(true);
        buildSrsQueue();
        renderAll();
        if (state.activeTab === "srs") renderSrsTab();
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

    // Count due flashcards strictly from completed sessions
    const dueCards = getAllFlashcards("due");
    document.getElementById("stat-due-cards").textContent = `${dueCards.length} thẻ`;
  }

  // ================= RENDER TODAY'S LESSON =================
  function buildAiPromptForSession(session) {
    const cleanPoints = session.corePoints.map((p) => p.replace(/<[^>]+>/g, "")).join("\n- ");
    return `Tôi là Java Developer đang ôn thi chứng chỉ AWS SAA-C03.
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
        <h3>☕ Liên hệ thực tế cho Java Developer</h3>
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
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; margin-bottom:0.75rem;">
            <h3 style="margin-bottom:0;">✍️ Thực Chiến Câu Hỏi Thi Thật (100% Tiếng Anh Chuẩn Pearson VUE SAA-C03)</h3>
            <span class="badge badge-aws">Bấm chọn A/B/C/D để chấm điểm & xem giải thích</span>
          </div>
          ${session.quizzes.map((qz, qIdx) => `
            <div class="quiz-card" data-quiz-idx="${qIdx}" data-correct-idx="${qz.correctIdx}">
              <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:0.5rem; margin-bottom:0.45rem;">
                <div class="quiz-question-en" style="margin-bottom:0; flex:1;">🇬🇧 <strong>Question ${qIdx + 1}:</strong> ${qz.qEn}</div>
                <button type="button" class="btn btn-outline btn-sm" data-toggle-vi="${qIdx}" style="padding:0.2rem 0.55rem; font-size:0.75rem; white-space:nowrap;">🇻🇳 Dịch câu hỏi</button>
              </div>
              <div class="quiz-question-vi" id="quiz-vi-${qIdx}" style="display:none; background:rgba(15,23,42,0.6); padding:0.5rem 0.75rem; border-radius:6px; margin-bottom:0.65rem; border-left:3px solid var(--accent-blue);">
                🇻🇳 <strong>Tạm dịch đề bài:</strong> ${qz.qVi}
              </div>
              <div class="quiz-options">
                ${qz.options.map((opt, oIdx) => `
                  <button class="quiz-option" data-opt-idx="${oIdx}">${opt}</button>
                `).join("")}
              </div>
              <div class="quiz-explanation" id="quiz-exp-${qIdx}">
                <div style="margin-bottom:0.35rem; color:var(--text-secondary); font-size:0.84rem;">🇻🇳 <em>Dịch đề: ${qz.qVi}</em></div>
                <strong>✅ Giải thích chi tiết:</strong> ${qz.explanation}
              </div>
            </div>
          `).join("")}
        </div>
      ` : ""}

      <!-- Prompt AI -->
      <div class="lesson-section-block prompt-box">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; margin-bottom:0.6rem;">
          <h3 style="margin-bottom:0;">🤖 Prompt Hỏi Sâu Thêm Với AI (Tùy chọn)</h3>
          <button class="btn btn-primary btn-sm" id="btn-copy-prompt">📋 Copy Prompt Hỏi AI Ngay</button>
        </div>
        <pre id="session-prompt-text" style="background:var(--bg-primary); border:1px solid var(--border-color); padding:0.85rem; border-radius:8px; font-size:0.84rem; color:#cbd5e1; white-space:pre-wrap; font-family:inherit;">${promptText}</pre>
      </div>

      <!-- Thẻ Flashcards của buổi này -->
      <div class="lesson-section-block">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem;">
          <h3 style="margin-bottom:0;">🗂️ Thẻ Spaced Repetition Của Buổi #${session.id} (Bấm vào thẻ để lật đáp án)</h3>
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
    `;

    // Toggle Vietnamese question translation
    container.querySelectorAll("[data-toggle-vi]").forEach((tBtn) => {
      tBtn.addEventListener("click", () => {
        const qIdx = tBtn.getAttribute("data-toggle-vi");
        const viBox = document.getElementById(`quiz-vi-${qIdx}`);
        if (!viBox) return;
        const isHidden = viBox.style.display === "none";
        viBox.style.display = isHidden ? "block" : "none";
        tBtn.textContent = isHidden ? "🙈 Ẩn dịch câu hỏi" : "🇻🇳 Dịch câu hỏi";
      });
    });

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
        state.uncompletedAt[id] = Date.now();
        showToast(`Đã bỏ đánh dấu hoàn thành Buổi #${id}`);
      } else {
        state.completedIds.push(id);
        state.completedIds.sort((a, b) => a - b);
        delete state.uncompletedAt[id];
        const nextUncompleted = window.STUDY_DATA.sessions.find((s) => s.id > id && !state.completedIds.includes(s.id));
        if (nextUncompleted) {
          state.currentSessionId = nextUncompleted.id;
        }
        showToast(`🎉 Tuyệt vời! Bạn đã hoàn thành Buổi #${id}. Đã lưu tiến độ lên Cloud & đưa thẻ vào Anki!`);
      }
      saveState(true);
      buildSrsQueue();
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
        saveState(true);
        buildSrsQueue();
        renderAll();
        showToast("🗑️ Đã xóa thẻ tự tạo!");
      });
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
  // Strictly distinguishes COMPLETED sessions from the uncompleted current session!
  function getAllFlashcards(filterMode) {
    const list = [];
    const now = Date.now();

    window.STUDY_DATA.sessions.forEach((s) => {
      const isCompletedSession = state.completedIds.includes(s.id);

      if ((filterMode === "due" || filterMode === "completed" || filterMode === "unlocked") && !isCompletedSession) {
        return;
      }
      if (filterMode === "current" && s.id !== state.currentSessionId) {
        return;
      }

      if (filterMode !== "custom") {
        s.cards.forEach((c, idx) => {
          const key = `s${s.id}_c${idx}`;
          const info = state.srsData[key];
          if (filterMode === "due" && info && info.due > now) {
            return;
          }
          list.push({
            key,
            sessionId: s.id,
            sessionTitle: s.title,
            q: c.q,
            a: c.a,
            isCustom: false
          });
        });
      }

      // Include user's custom cards
      const customForSession = state.customCards.filter((cc) => Number(cc.sessionId) === s.id);
      customForSession.forEach((cc) => {
        const info = state.srsData[cc.id];
        if (filterMode === "due" && info && info.due > now) {
          return;
        }
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

  function formatSrsStatusBadge(key) {
    const info = state.srsData[key];
    if (!info || !info.due) {
      return {
        label: "🆕 Thẻ mới (Chưa ôn lần nào)",
        badgeClass: "badge-blue",
        dueText: "Hôm nay",
        intervalText: "Mới"
      };
    }
    const now = Date.now();
    const diffMs = info.due - now;
    const dueDateStr = new Date(info.due).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
    const rateMap = {
      again: "🔄 Quên (Ôn lại ngay)",
      hard: "⏳ 1 ngày (Hard)",
      good: "📅 3 ngày (Good)",
      easy: "🚀 7 ngày (Easy)"
    };
    const intervalLabel = rateMap[info.lastRate] || `${info.intervalDays || 1} ngày`;

    if (diffMs <= 0) {
      return {
        label: `🔥 Đến hạn ôn hôm nay (Lần trước: ${intervalLabel})`,
        badgeClass: "badge-aws",
        dueText: `Đến hạn (${dueDateStr})`,
        intervalText: intervalLabel
      };
    }
    const daysLeft = Math.max(1, Math.ceil(diffMs / (86400 * 1000)));
    return {
      label: `✅ Đã hẹn ${intervalLabel} • Ôn lại ngày ${dueDateStr} (còn ~${daysLeft} ngày)`,
      badgeClass: "badge-green",
      dueText: `${dueDateStr} (còn ${daysLeft} ngày)`,
      intervalText: intervalLabel
    };
  }

  function getSrsBreakdownStats() {
    const completedCards = getAllFlashcards("completed");
    const now = Date.now();
    let dueNow = 0;
    let scheduled1d = 0;
    let scheduled3d = 0;
    let scheduled7d = 0;

    completedCards.forEach((c) => {
      const info = state.srsData[c.key];
      if (!info || info.due <= now) {
        dueNow++;
      } else if (info.lastRate === "hard" || info.intervalDays === 1) {
        scheduled1d++;
      } else if (info.lastRate === "good" || info.intervalDays === 3) {
        scheduled3d++;
      } else if (info.lastRate === "easy" || info.intervalDays === 7) {
        scheduled7d++;
      } else {
        dueNow++;
      }
    });

    return {
      totalCompletedCards: completedCards.length,
      dueNow,
      scheduled1d,
      scheduled3d,
      scheduled7d
    };
  }

  function buildSrsQueue() {
    const cards = getAllFlashcards(state.srsFilter);
    cards.sort((a, b) => {
      const dueA = state.srsData[a.key]?.due || 0;
      const dueB = state.srsData[b.key]?.due || 0;
      if (dueA !== dueB) return dueA - dueB;
      return a.sessionId - b.sessionId;
    });
    state.srsQueue = cards;
    if (state.srsCurrentIndex >= state.srsQueue.length) {
      state.srsCurrentIndex = 0;
    }
    state.srsRevealed = false;
  }

  function renderSrsTab() {
    const container = document.getElementById("srs-arena-container");
    if (!container) return;

    const stats = getSrsBreakdownStats();
    const completedListText = state.completedIds.length
      ? state.completedIds.map((id) => `Buổi #${id}`).join(", ")
      : "Chưa có buổi nào";

    const dashboardHtml = `
      <div style="background:rgba(15,23,42,0.75); border:1px solid var(--border-color); border-radius:12px; padding:0.9rem 1rem; margin-bottom:1rem; text-align:left;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; margin-bottom:0.65rem;">
          <div>
            <span style="font-size:0.86rem; font-weight:700; color:var(--accent-aws);">📊 Trạng Thái Lưu Lịch Ôn Ngắt Quãng (SRS)</span>
            <span style="font-size:0.8rem; color:var(--text-secondary); margin-left:0.4rem;">• Chỉ lấy thẻ từ các buổi bạn <strong>ĐÃ HOÀN THÀNH</strong> (${completedListText})</span>
          </div>
          <button class="btn btn-outline btn-sm" id="btn-toggle-srs-table" style="font-size:0.76rem; padding:0.25rem 0.65rem;">
            ${state.showSrsTable ? "🔼 Ẩn bảng chi tiết lịch hẹn từng thẻ" : `📋 Xem bảng lịch hẹn 1-3-7 ngày (${stats.totalCompletedCards} thẻ)`}
          </button>
        </div>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(155px, 1fr)); gap:0.6rem;">
          <div style="background:var(--bg-card); padding:0.55rem 0.75rem; border-radius:8px; border-left:3px solid var(--accent-aws);">
            <div style="font-size:0.74rem; color:var(--text-secondary);">🔥 Cần ôn hôm nay (Due)</div>
            <div style="font-size:1.1rem; font-weight:800; color:#fcd34d;">${stats.dueNow} thẻ</div>
          </div>
          <div style="background:var(--bg-card); padding:0.55rem 0.75rem; border-radius:8px; border-left:3px solid #f59e0b;">
            <div style="font-size:0.74rem; color:var(--text-secondary);">⏳ Đang hẹn 1 ngày (Hard)</div>
            <div style="font-size:1.1rem; font-weight:800; color:#fde68a;">${stats.scheduled1d} thẻ</div>
          </div>
          <div style="background:var(--bg-card); padding:0.55rem 0.75rem; border-radius:8px; border-left:3px solid var(--accent-blue);">
            <div style="font-size:0.74rem; color:var(--text-secondary);">📅 Đang hẹn 3 ngày (Good)</div>
            <div style="font-size:1.1rem; font-weight:800; color:#7dd3fc;">${stats.scheduled3d} thẻ</div>
          </div>
          <div style="background:var(--bg-card); padding:0.55rem 0.75rem; border-radius:8px; border-left:3px solid var(--accent-green);">
            <div style="font-size:0.74rem; color:var(--text-secondary);">🚀 Đang hẹn 7 ngày (Easy)</div>
            <div style="font-size:1.1rem; font-weight:800; color:#6ee7b7;">${stats.scheduled7d} thẻ</div>
          </div>
        </div>
      </div>
    `;

    const filterBarHtml = `
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; margin-bottom:1rem;">
        <div style="display:flex; gap:0.4rem; flex-wrap:wrap;">
          <button class="btn btn-sm ${state.srsFilter === "due" ? "btn-primary" : "btn-outline"}" data-srs-filter="due">
            🔥 Cần ôn hôm nay (${getAllFlashcards("due").length})
          </button>
          <button class="btn btn-sm ${state.srsFilter === "completed" ? "btn-primary" : "btn-outline"}" data-srs-filter="completed">
            ✅ Đã học xong (${getAllFlashcards("completed").length})
          </button>
          <button class="btn btn-sm ${state.srsFilter === "current" ? "btn-primary" : "btn-outline"}" data-srs-filter="current">
            📍 Chỉ Buổi đang học #${state.currentSessionId} (${getAllFlashcards("current").length})
          </button>
          <button class="btn btn-sm ${state.srsFilter === "custom" ? "btn-primary" : "btn-outline"}" data-srs-filter="custom">
            ✨ Thẻ tự tạo (${state.customCards.length})
          </button>
          <button class="btn btn-sm ${state.srsFilter === "all" ? "btn-primary" : "btn-outline"}" data-srs-filter="all">
            📚 Toàn bộ 80 buổi (${getAllFlashcards("all").length})
          </button>
        </div>
        <div style="display:flex; gap:0.4rem; flex-wrap:wrap;">
          <button class="btn btn-success btn-sm" id="btn-srs-add-card">➕ Thêm Thẻ Mới Vào Web</button>
          <button class="btn btn-outline btn-sm" id="btn-export-all-anki">⬇️ Xuất .tsv Anki</button>
        </div>
      </div>
    `;

    const completedCardsForTable = getAllFlashcards("completed");
    const scheduleTableHtml = state.showSrsTable ? `
      <div style="margin-top:1.25rem; text-align:left; background:var(--bg-primary); border:1px solid var(--border-color); border-radius:10px; padding:1rem; max-height:380px; overflow-y:auto;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.65rem;">
          <h4 style="font-size:0.92rem; color:var(--accent-blue); margin:0;">📋 Danh sách thẻ từ các buổi đã hoàn thành & Ngày hẹn ôn lại</h4>
          <span style="font-size:0.76rem; color:var(--text-secondary);">Lưu tự động vào Trình duyệt & Cloud</span>
        </div>
        ${completedCardsForTable.length === 0 ? `
          <p style="font-size:0.85rem; color:var(--text-secondary);">Bạn chưa đánh dấu hoàn thành buổi học nào.</p>
        ` : `
          <table class="comp-table" style="font-size:0.82rem;">
            <thead>
              <tr>
                <th>Buổi</th>
                <th>Câu hỏi mặt trước</th>
                <th>Mức hẹn gần nhất</th>
                <th>Ngày đến hạn ôn</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              ${completedCardsForTable.map((c) => {
                const st = formatSrsStatusBadge(c.key);
                return `
                  <tr>
                    <td><span class="badge badge-blue">Buổi #${c.sessionId}</span></td>
                    <td style="max-width:340px;">${c.q}</td>
                    <td><strong>${st.intervalText}</strong></td>
                    <td>${st.dueText}</td>
                    <td>
                      <button class="btn btn-outline btn-sm" data-reset-srs="${c.key}" style="padding:0.15rem 0.45rem; font-size:0.72rem;">🔄 Ôn lại ngay</button>
                    </td>
                  </tr>
                `;
              }).join("")}
            </tbody>
          </table>
        `}
      </div>
    ` : "";

    const card = state.srsQueue[state.srsCurrentIndex];

    if (!card) {
      let emptyMessageHtml = "";
      if (state.srsFilter === "due" && state.completedIds.length > 0 && stats.totalCompletedCards > 0) {
        emptyMessageHtml = `
          <div style="padding:2rem 1rem;">
            <div style="font-size:2.4rem; margin-bottom:0.5rem;">🎉</div>
            <h3 style="color:var(--accent-green); margin-bottom:0.4rem;">Tuyệt vời! Bạn đã ôn xong toàn bộ thẻ đến hạn hôm nay!</h3>
            <p style="color:var(--text-secondary); font-size:0.9rem; max-width:560px; margin:0 auto 1.2rem;">
              Tất cả các thẻ từ những buổi bạn đã hoàn thành (${completedListText}) đều đã được lưu lịch hẹn ôn sau <strong>1 ngày, 3 ngày hoặc 7 ngày</strong>. Bạn có thể bấm nút bên dưới nếu muốn ôn vượt trước lịch hoặc xem thẻ của Buổi đang học #${state.currentSessionId}.
            </p>
            <div style="display:flex; justify-content:center; gap:0.6rem; flex-wrap:wrap;">
              <button class="btn btn-primary" data-srs-filter="completed">🔄 Ôn lại toàn bộ thẻ đã học (${stats.totalCompletedCards} thẻ)</button>
              <button class="btn btn-outline" data-srs-filter="current">📍 Xem trước thẻ Buổi đang học #${state.currentSessionId}</button>
            </div>
          </div>
        `;
      } else if ((state.srsFilter === "due" || state.srsFilter === "completed") && state.completedIds.length === 0) {
        emptyMessageHtml = `
          <div style="padding:2rem 1rem;">
            <div style="font-size:2rem; margin-bottom:0.5rem;">💡</div>
            <h3 style="color:var(--accent-aws); margin-bottom:0.4rem;">Chưa có buổi học nào được đánh dấu Hoàn Thành</h3>
            <p style="color:var(--text-secondary); font-size:0.9rem; max-width:560px; margin:0 auto 1.2rem;">
              Để tránh việc hiển thị trước câu hỏi của các buổi bạn chưa học xong, bộ lọc <strong>Cần ôn hôm nay</strong> chỉ lấy thẻ từ những buổi bạn đã bấm nút <strong>"🎉 Hoàn thành Buổi học"</strong>.
            </p>
            <div style="display:flex; justify-content:center; gap:0.6rem; flex-wrap:wrap;">
              <button class="btn btn-primary" data-srs-filter="current">📍 Học thử thẻ của Buổi hiện tại #${state.currentSessionId} (${getAllFlashcards("current").length} thẻ)</button>
            </div>
          </div>
        `;
      } else {
        emptyMessageHtml = `
          <div style="padding:2rem; color:var(--text-secondary);">
            <p style="margin-bottom:1rem;">Chưa có thẻ nào trong bộ lọc này.</p>
            <button class="btn btn-primary" id="btn-empty-add-card">➕ Tạo thẻ Spaced Repetition đầu tiên của bạn</button>
          </div>
        `;
      }

      container.innerHTML = `
        <div class="srs-box">
          ${dashboardHtml}
          ${filterBarHtml}
          ${emptyMessageHtml}
          ${scheduleTableHtml}
        </div>
      `;
      attachSrsCommonListeners(container);
      const emptyBtn = document.getElementById("btn-empty-add-card");
      if (emptyBtn) emptyBtn.addEventListener("click", () => openAddCardModal(state.currentSessionId));
      return;
    }

    const cardStatus = formatSrsStatusBadge(card.key);

    container.innerHTML = `
      <div class="srs-box">
        ${dashboardHtml}
        ${filterBarHtml}

        <div style="display:flex; justify-content:center; align-items:center; gap:0.5rem; flex-wrap:wrap; font-size:0.84rem; color:var(--text-secondary);">
          <span>Thẻ <strong>${state.srsCurrentIndex + 1} / ${state.srsQueue.length}</strong> trong hàng đợi • Thuộc <strong>Buổi #${card.sessionId}: ${card.sessionTitle}</strong></span>
          <span class="badge ${cardStatus.badgeClass}">${cardStatus.label}</span>
          ${card.isCustom ? `<span class="badge badge-blue">✨ Thẻ của bạn</span>` : ""}
          ${card.isCustom ? `<button class="btn btn-outline btn-sm" id="btn-srs-delete-custom" style="padding:0.15rem 0.5rem; font-size:0.75rem; color:#fca5a5;">🗑️ Xóa</button>` : ""}
        </div>

        <div class="srs-card-surface" id="srs-card-surface">
          <div style="font-size:0.78rem; text-transform:uppercase; color:var(--accent-aws); font-weight:700; margin-bottom:0.5rem;">
            ${state.srsRevealed ? "ĐÁP ÁN CHUẨN SAA-C03" : "CÂU HỎI TÌNH HUỐNG (BẤM ĐỂ LẬT THẺ)"}
          </div>
          <div style="font-size:1.15rem; font-weight:700; max-width:650px;">
            ${card.q}
          </div>
          ${state.srsRevealed ? `
            <div style="margin-top:1.25rem; padding-top:1.25rem; border-top:1px dashed var(--border-color); font-size:1.05rem; color:var(--accent-green); font-weight:600; max-width:680px;">
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
              🔄 Quên (Hỏi lại ngay cuối buổi)
            </button>
            <button class="btn btn-outline" style="border-color:var(--accent-aws); color:#fcd34d;" data-rate="hard">
              😓 Hơi khó (Hẹn 1 ngày sau)
            </button>
            <button class="btn btn-outline" style="border-color:var(--accent-blue); color:#7dd3fc;" data-rate="good">
              👍 Nhớ rõ (Hẹn 3 ngày sau)
            </button>
            <button class="btn btn-outline" style="border-color:var(--accent-green); color:#6ee7b7;" data-rate="easy">
              ⚡ Quá dễ (Hẹn 7 ngày sau)
            </button>
          </div>
        ` : `
          <div style="display:flex; justify-content:center; gap:0.5rem;">
            <button class="btn btn-primary" id="btn-srs-show">👁️ Hiện Đáp Án</button>
          </div>
        `}

        ${scheduleTableHtml}
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
        let intervalDays = 0;
        let nextDue = now + 60 * 1000;

        if (rate === "hard") {
          intervalDays = 1;
          nextDue = now + 1 * dayMs;
        } else if (rate === "good") {
          intervalDays = 3;
          nextDue = now + 3 * dayMs;
        } else if (rate === "easy") {
          intervalDays = 7;
          nextDue = now + 7 * dayMs;
        }

        const prevReps = state.srsData[card.key]?.reps || 0;
        state.srsData[card.key] = {
          due: nextDue,
          intervalDays,
          lastRate: rate,
          reps: prevReps + 1,
          updatedAt: now
        };
        saveState(true);

        if (rate === "again") {
          // Move forgotten card to the end of today's queue so user reviews it again before finishing
          const currentCard = state.srsQueue.splice(state.srsCurrentIndex, 1)[0];
          state.srsQueue.push(currentCard);
          if (state.srsCurrentIndex >= state.srsQueue.length) {
            state.srsCurrentIndex = 0;
          }
          showToast("🔄 Đã xếp thẻ này xuống cuối hàng đợi để hỏi lại bạn ngay trong hôm nay!");
        } else {
          const nextDateStr = new Date(nextDue).toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit"
          });
          showToast(`✅ Đã lưu SRS: Hẹn ôn lại sau ${intervalDays} ngày (${nextDateStr})!`);

          if (state.srsFilter === "due") {
            // Remove card from today's due queue so remaining count drops accurately
            state.srsQueue.splice(state.srsCurrentIndex, 1);
            if (state.srsCurrentIndex >= state.srsQueue.length) {
              state.srsCurrentIndex = 0;
            }
          } else {
            state.srsCurrentIndex = (state.srsCurrentIndex + 1) % state.srsQueue.length;
          }
        }

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

    const toggleTableBtn = document.getElementById("btn-toggle-srs-table");
    if (toggleTableBtn) {
      toggleTableBtn.addEventListener("click", () => {
        state.showSrsTable = !state.showSrsTable;
        renderSrsTab();
      });
    }

    container.querySelectorAll("[data-reset-srs]").forEach((rBtn) => {
      rBtn.addEventListener("click", () => {
        const key = rBtn.getAttribute("data-reset-srs");
        delete state.srsData[key];
        saveState(true);
        buildSrsQueue();
        renderProgressBanner();
        renderSrsTab();
        showToast("🔄 Đã đưa thẻ về trạng thái Cần ôn ngay hôm nay!");
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
