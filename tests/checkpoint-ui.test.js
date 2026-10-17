const assert = require("assert");
const { loadApp } = require("./helpers/loadApp");

describe("Checkpoint UI – Lộ trình, Banner, Chấm điểm & Gợi ý ôn tập (P5 §8.2)", () => {
  it("tab Lộ trình hiện 6 dòng checkpoint, mỗi dòng ngay sau buổi afterSessionId", async () => {
    const env = await loadApp();
    try {
      const cpItems = env.$$("#curriculum-phases-container .checkpoint-item");
      assert.strictEqual(cpItems.length, 6);
      const expectedAfter = ["10", "19", "28", "36", "43", "51"];
      assert.deepStrictEqual(
        cpItems.map((el) => el.getAttribute("data-after-session")),
        expectedAfter
      );
    } finally {
      env.close();
    }
  });

  it("hoàn thành buổi #10 → có toast và banner 'Checkpoint Chặng 1'; bấm 'Làm ngay' mở bài 20 câu, timer 40:00, mọi câu ≤ 10", async () => {
    let now = 1_700_000_000_000;
    const env = await loadApp({
      now: () => now,
      cloud: {
        currentSessionId: 10,
        completedIds: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        updatedAt: 1000
      }
    });
    try {
      env.$("#btn-complete-session").click();
      assert.match(env.$("#toast").textContent, /Checkpoint Chặng 1/);

      const banner = env.$("#today-lesson-container .checkpoint-banner");
      assert.ok(banner, "Phải hiện banner nhắc Checkpoint Chặng 1");
      assert.strictEqual(banner.getAttribute("data-cp-id"), "cp1");

      banner.querySelector("[data-start-cp='cp1']").click();
      assert.strictEqual(env.app.state.activeTab, "exam");
      const active = env.window.ExamUI.getActiveExam();
      assert.strictEqual(active.def.mode, "checkpoint");
      assert.strictEqual(active.def.cpId, "cp1");
      assert.strictEqual(active.def.questionIds.length, 20);
      assert.strictEqual(env.$("#exam-timer").textContent.trim(), "40:00");

      for (const qid of active.def.questionIds) {
        const q = env.window.AwsHub.getQuizById(qid);
        assert.ok(Math.max(...q.sessionIds) <= 10);
      }
    } finally {
      env.close();
    }
  });

  it("chưa hoàn thành đủ chặng → hiện cảnh báo kèm danh sách buổi thiếu, vẫn cho bắt đầu", async () => {
    let now = 1_700_000_000_000;
    const env = await loadApp({
      now: () => now,
      cloud: { currentSessionId: 10, completedIds: [1, 2, 3], updatedAt: 1000 }
    });
    try {
      env.window.ExamUI.startCheckpoint("cp1");
      assert.ok(env.$(".exam-active-view"), "Vẫn cho bắt đầu làm bài khi chưa hoàn thành hết chặng");
      const warning = env.$(".checkpoint-missing-warning");
      assert.ok(warning, "Phải hiện cảnh báo các buổi còn thiếu");
      assert.match(warning.textContent, /#4/);
    } finally {
      env.close();
    }
  });

  it("nộp bài → kết quả có khối chặng hiện tại/chặng trước, 4 domain, 'Buổi cần ôn lại' với link mở đúng buổi, lưu examHistory lên Cloud và cập nhật điểm tốt nhất trong Lộ trình", async () => {
    let now = 1_700_000_000_000;
    const env = await loadApp({
      now: () => now,
      cloud: { currentSessionId: 19, completedIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], updatedAt: 1000 }
    });
    try {
      env.window.ExamUI.startCheckpoint("cp2");
      env.$$(".exam-option")[0].click();
      env.$("#exam-submit-btn").click();
      await env.sleep(50);

      assert.ok(env.$(".checkpoint-phase-breakdown"), "Phải có khối phân tích Chặng hiện tại / Chặng trước");
      assert.strictEqual(env.$$(".exam-domain-table tbody tr").length, 4);
      assert.ok(env.$(".exam-weak-sessions"), "Phải có khối Buổi cần ôn lại");

      // Kiểm tra lưu vào examHistory và đẩy lên Cloud
      assert.strictEqual(env.net.cloud.examHistory.length, 1);
      assert.strictEqual(env.net.cloud.examHistory[0].mode, "checkpoint");
      assert.strictEqual(env.net.cloud.examHistory[0].cpId, "cp2");

      // Dòng checkpoint trong Lộ trình hiện điểm tốt nhất
      const cp2Row = env.$('#curriculum-phases-container .checkpoint-item[data-checkpoint-id="cp2"]');
      assert.match(cp2Row.textContent, /Điểm tốt nhất:\s*\d+%/);

      // Bấm link mở buổi yếu nhất
      const weakBtn = env.$(".weak-session-link");
      assert.ok(weakBtn);
      const targetSid = Number(weakBtn.getAttribute("data-session-id"));
      weakBtn.click();
      assert.strictEqual(env.app.state.activeTab, "today");
      assert.strictEqual(env.app.state.currentSessionId, targetSid);
    } finally {
      env.close();
    }
  });

  it("'Để sau' ẩn banner 24h; tiến đồng hồ 25h thì banner hiện lại; chưa làm checkpoint vẫn sang được buổi #11 và hoàn thành được", async () => {
    let now = 1_700_000_000_000;
    const env = await loadApp({
      now: () => now,
      cloud: {
        currentSessionId: 11,
        completedIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        updatedAt: 1000
      }
    });
    try {
      assert.ok(env.$("#today-lesson-container .checkpoint-banner"), "Banner CP1 đang hiện");
      env.$("[data-snooze-cp='cp1']").click();
      assert.strictEqual(env.$("#today-lesson-container .checkpoint-banner"), null, "Banner phải ẩn sau khi bấm Để sau");

      // Vẫn hoàn thành được buổi #11 và chuyển sang buổi #12 bình thường
      env.$("#btn-complete-session").click();
      assert.ok(env.app.state.completedIds.includes(11));
      assert.strictEqual(env.app.state.currentSessionId, 12);

      // Tiến đồng hồ 25 giờ -> banner hiện lại
      now += 25 * 3600 * 1000;
      env.app.renderTodayLesson();
      assert.ok(env.$("#today-lesson-container .checkpoint-banner"), "Sau 25 giờ banner phải hiện lại");
    } finally {
      env.close();
    }
  });

  it("đang ở #30, chưa làm CP1 và CP2 → banner nhắc CP2 (gần nhất)", async () => {
    let now = 1_700_000_000_000;
    const env = await loadApp({
      now: () => now,
      cloud: {
        currentSessionId: 30,
        completedIds: Array.from({ length: 20 }, (_, i) => i + 1), // đã hoàn thành #1..20 (mở CP1 và CP2)
        updatedAt: 1000
      }
    });
    try {
      const banner = env.$("#today-lesson-container .checkpoint-banner");
      assert.ok(banner);
      assert.strictEqual(banner.getAttribute("data-cp-id"), "cp2", "Phải nhắc CP2 gần nhất");
    } finally {
      env.close();
    }
  });
});
