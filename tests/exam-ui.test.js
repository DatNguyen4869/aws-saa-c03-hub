const assert = require("assert");
const { loadApp } = require("./helpers/loadApp");

describe("ExamUI – Giao diện Thi thử tính giờ & chống mất bài đang làm (P3 §6.2)", () => {
  it("tab Thi thử hiện màn Setup; Start Full tạo bài 65 câu và hiện timer 130:00", async () => {
    let now = 1_700_000_000_000;
    const env = await loadApp({ now: () => now });
    try {
      env.clickTab("exam");
      assert.ok(env.$(".exam-setup-view"), "Phải hiện màn Setup khi chưa có bài đang làm");
      env.$("#exam-start-full-btn").click();

      assert.ok(env.$(".exam-active-view"), "Phải chuyển sang màn Làm bài");
      assert.strictEqual(env.$$(".exam-nav-cell").length, 65);
      assert.strictEqual(env.$("#exam-timer").textContent.trim(), "130:00");
    } finally {
      env.close();
    }
  });

  it("chọn đáp án → lưới đánh dấu answered; flag → lưới đánh dấu flagged; không hiện giải thích trong lúc thi", async () => {
    let now = 1_700_000_000_000;
    const env = await loadApp({ now: () => now });
    try {
      env.clickTab("exam");
      env.$("#exam-start-quick-btn").click();

      const active = env.window.ExamUI.getActiveExam();
      const q0 = env.window.AwsHub.getQuizById(active.def.questionIds[0]);
      const optBtns = env.$$(".exam-option");
      if (Array.isArray(q0.correctIdxs)) {
        optBtns[0].click();
        assert.ok(env.$$(".exam-nav-cell")[0].classList.contains("partial"));
        env.$$(".exam-option")[1].click();
      } else {
        optBtns[0].click();
      }

      assert.ok(env.$$(".exam-nav-cell")[0].classList.contains("answered"));
      assert.strictEqual(
        env.$("#exam-container .quiz-explanation"),
        null,
        "Không được hiển thị giải thích trong lúc đang thi"
      );

      env.$("#exam-flag-btn").click();
      assert.ok(env.$$(".exam-nav-cell")[0].classList.contains("flagged"));
    } finally {
      env.close();
    }
  });

  it("đổi tab trình duyệt + Cloud đổi dữ liệu (renderAll) → bài thi, đáp án, câu hiện tại giữ nguyên", async () => {
    let now = 1_700_000_000_000;
    const env = await loadApp({
      now: () => now,
      cloud: { currentSessionId: 1, completedIds: [1], updatedAt: 1000 }
    });
    try {
      env.clickTab("exam");
      env.$("#exam-start-quick-btn").click();

      // Chọn đáp án câu 1 rồi chuyển sang câu 3
      env.$$(".exam-option")[0].click();
      env.$$(".exam-nav-cell")[2].click();
      const examIdBefore = env.$(".exam-active-view").getAttribute("data-exam-id");
      const qidAt2 = env.$(".exam-question-card").getAttribute("data-quiz-id");

      // Giả lập máy khác cập nhật Cloud và người dùng chuyển tab trình duyệt quay lại
      env.net.cloud = {
        currentSessionId: 5,
        completedIds: [1, 2, 3],
        updatedAt: now + 50000
      };
      await env.switchBrowserTabAndBack();

      assert.strictEqual(env.$(".exam-active-view").getAttribute("data-exam-id"), examIdBefore);
      assert.strictEqual(env.$(".exam-question-card").getAttribute("data-quiz-id"), qidAt2);
      assert.strictEqual(env.window.ExamUI.getActiveExam().currentIdx, 2);
      assert.ok(env.window.ExamUI.getActiveExam().answers[env.window.ExamUI.getActiveExam().def.questionIds[0]] !== undefined);
    } finally {
      env.close();
    }
  });

  it("reload (loadApp lại với cùng localStorage) → khôi phục đúng câu và thời gian còn lại", async () => {
    let now = 1_700_000_000_000;
    let env = await loadApp({ now: () => now });
    env.clickTab("exam");
    env.$("#exam-start-quick-btn").click();
    env.$$(".exam-option")[1].click();
    env.$$(".exam-nav-cell")[4].click();

    const rawActive = env.window.localStorage.getItem("aws_saa_c03_active_exam_v1");
    const savedLocal = env.localSaved();
    env.close();

    // Sau 10 phút reload trang
    now += 10 * 60 * 1000;
    env = await loadApp({
      now: () => now,
      local: savedLocal,
      cloud: savedLocal,
      rawStorage: { aws_saa_c03_active_exam_v1: rawActive }
    });
    try {
      env.clickTab("exam");
      assert.ok(env.$(".exam-active-view"), "Phải khôi phục thẳng vào màn làm bài");
      assert.strictEqual(env.window.ExamUI.getActiveExam().currentIdx, 4);
      assert.strictEqual(env.$("#exam-timer").textContent.trim(), "30:00");
    } finally {
      env.close();
    }
  });

  it("tiến đồng hồ quá endsAt → tự nộp, kết quả autoSubmitted=true; mở lại sau khi hết hạn → tự nộp và có toast", async () => {
    let now = 1_700_000_000_000;
    let env = await loadApp({ now: () => now });
    env.clickTab("exam");
    env.$("#exam-start-quick-btn").click();

    // Tiến đồng hồ quá 40 phút và gọi tick()
    now += 41 * 60 * 1000;
    env.window.ExamUI.tick();

    assert.ok(env.$(".exam-result-view"), "Hết giờ phải tự nộp và chuyển sang màn kết quả");
    assert.strictEqual(env.window.ExamUI.getLastResult().autoSubmitted, true);
    env.close();

    // Trường hợp đóng trình duyệt rồi mở lại khi đã quá hạn
    now = 1_700_000_000_000;
    env = await loadApp({ now: () => now });
    env.clickTab("exam");
    env.$("#exam-start-quick-btn").click();
    const rawActive = env.window.localStorage.getItem("aws_saa_c03_active_exam_v1");
    env.close();

    now += 50 * 60 * 1000;
    env = await loadApp({
      now: () => now,
      rawStorage: { aws_saa_c03_active_exam_v1: rawActive }
    });
    try {
      env.clickTab("exam");
      assert.ok(env.$(".exam-result-view"), "Mở lại bài đã hết hạn phải tự nộp ngay");
      assert.strictEqual(env.window.ExamUI.getLastResult().autoSubmitted, true);
      assert.match(env.$("#toast").textContent, /hết thời gian|Hết giờ/i);
    } finally {
      env.close();
    }
  });

  it("nộp bài → kết quả có bảng 4 domain, nhãn 'ước lượng', lưu examHistory lên Cloud, bài đang làm KHÔNG có trên Cloud", async () => {
    let now = 1_700_000_000_000;
    const env = await loadApp({ now: () => now });
    try {
      env.clickTab("exam");
      env.$("#exam-start-quick-btn").click();
      env.$$(".exam-option")[0].click();

      // Trong lúc đang làm bài, Cloud payload không chứa active exam
      assert.strictEqual(env.app.getPersistedPayload().activeExam, undefined);

      env.$("#exam-submit-btn").click();
      await env.sleep(50);

      assert.ok(env.$(".exam-result-view"));
      assert.strictEqual(env.$$(".exam-domain-table tbody tr").length, 4);
      assert.match(env.$(".exam-result-view").textContent, /ước lượng/i);
      assert.strictEqual(env.net.cloud.examHistory.length, 1);
      assert.strictEqual(env.net.cloud.activeExam, undefined);
    } finally {
      env.close();
    }
  });

  it("đề thi thử chỉ chứa câu pool 'exam'; ưu tiên câu chưa gặp; hết câu mới thì cảnh báo số câu lặp", async () => {
    let now = 1_700_000_000_000;
    const env = await loadApp({ now: () => now });
    try {
      env.clickTab("exam");
      env.$("#exam-start-full-btn").click();
      const firstIds = [...env.window.ExamUI.getActiveExam().def.questionIds];
      for (const id of firstIds) {
        assert.ok(!/^s\d+-(q|l)/.test(id), `Đề thi chứa câu lesson: ${id}`);
      }
      env.$("#exam-submit-btn").click();

      // Tạo đề thứ 2 -> không trùng câu nào với đề thứ 1 vì pool có 310 câu
      env.$("#exam-back-setup-btn").click();
      env.$("#exam-start-full-btn").click();
      const secondIds = [...env.window.ExamUI.getActiveExam().def.questionIds];
      const overlap = secondIds.filter((id) => firstIds.includes(id));
      assert.strictEqual(overlap.length, 0, "Đề 2 không được trùng câu với đề 1 khi pool còn đủ câu mới");
      env.$("#exam-submit-btn").click();

      // Giả lập lịch sử đã gặp hết 300 câu -> tạo đề Full mới vẫn đủ 65 câu và hiện cảnh báo lặp
      const allExamIds = env.window.EXAM_BANK.map((q) => q.id);
      env.app.state.examHistory = [{ id: "h_all", submittedAt: now, questionIds: allExamIds }];
      env.$("#exam-back-setup-btn").click();
      env.$("#exam-start-full-btn").click();
      assert.strictEqual(env.window.ExamUI.getActiveExam().def.questionIds.length, 65);
      assert.ok(env.$(".exam-warnings"), "Phải hiện cảnh báo khi phải lặp lại câu đã gặp");
    } finally {
      env.close();
    }
  });

  it("Làm lại câu sai và Tạo flashcard từ câu sai hoạt động đúng", async () => {
    let now = 1_700_000_000_000;
    const env = await loadApp({ now: () => now });
    try {
      env.clickTab("exam");
      env.$("#exam-start-quick-btn").click();
      env.$("#exam-submit-btn").click();

      const res = env.window.ExamUI.getLastResult();
      const wrongOrUnanswered = res.wrongIds.length + res.unansweredIds.length;
      assert.strictEqual(wrongOrUnanswered, 20);

      const cardsBefore = env.app.state.customCards.length;
      env.$("#exam-create-cards-btn").click();
      assert.strictEqual(env.app.state.customCards.length - cardsBefore, 20);

      env.$("#exam-retry-wrong-btn").click();
      assert.ok(env.$(".exam-active-view"));
      assert.strictEqual(env.window.ExamUI.getActiveExam().def.mode, "retry");
      assert.strictEqual(env.window.ExamUI.getActiveExam().def.questionIds.length, 20);
    } finally {
      env.close();
    }
  });

  it("buổi 57 có nút mở phần đề; bấm vào mở tab Thi thử với 16 câu; phím tắt 1–4, F, ←/→ hoạt động; pool rỗng → Start disable", async () => {
    let now = 1_700_000_000_000;
    const env = await loadApp({
      now: () => now,
      cloud: { currentSessionId: 57, completedIds: [], updatedAt: 1 }
    });
    try {
      const secBtn = env.$("#btn-start-section-exam");
      assert.ok(secBtn, "Buổi #57 phải có nút mở phần đề thi");
      secBtn.click();

      assert.strictEqual(env.app.state.activeTab, "exam");
      assert.strictEqual(env.window.ExamUI.getActiveExam().def.questionIds.length, 16);

      // Test phím tắt: 1 (chọn đáp án đầu), F (flag), ArrowRight (sang câu 2)
      env.window.dispatchEvent(new env.window.KeyboardEvent("keydown", { key: "1", bubbles: true }));
      env.window.dispatchEvent(new env.window.KeyboardEvent("keydown", { key: "f", bubbles: true }));
      const q0Id = env.window.ExamUI.getActiveExam().def.questionIds[0];
      assert.ok(env.window.ExamUI.getActiveExam().answers[q0Id] !== undefined);
      assert.strictEqual(env.window.ExamUI.getActiveExam().flagged[q0Id], true);

      env.window.dispatchEvent(new env.window.KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }));
      assert.strictEqual(env.window.ExamUI.getActiveExam().currentIdx, 1);

      // Nộp bài, chọn nguồn "completed" khi chưa hoàn thành buổi nào → pool rỗng → nút Start disable
      env.$("#exam-submit-btn").click();
      env.$("#exam-back-setup-btn").click();
      const compRadio = env.$('input[name="exam-source"][value="completed"]');
      compRadio.checked = true;
      compRadio.dispatchEvent(new env.window.Event("change", { bubbles: true }));
      assert.strictEqual(env.$("#exam-start-full-btn").disabled, true);
    } finally {
      env.close();
    }
  });
});
