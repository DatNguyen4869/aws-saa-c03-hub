/**
 * Test giao diện buổi học: lỗi reset đáp án, thứ tự nội dung, lab, flashcard.
 */
const assert = require("assert");
// Dữ liệu tạo trong jsdom thuộc 'realm' khác Node → so sánh qua JSON
const same = (actual, expected, msg) => assert.deepStrictEqual(JSON.parse(JSON.stringify(actual)), expected, msg);
const { loadApp } = require("./helpers/loadApp");

function answerQuiz(env, quizIdx, optIdx) {
  const card = env.$$(".quiz-card")[quizIdx];
  card.querySelectorAll(".quiz-option")[optIdx].click();
  return card;
}

function quizState(env, quizIdx) {
  const card = env.$$(".quiz-card")[quizIdx];
  const opts = [...card.querySelectorAll(".quiz-option")];
  return {
    wrong: opts.findIndex((o) => o.classList.contains("wrong")),
    correct: opts.findIndex((o) => o.classList.contains("correct")),
    explanationVisible: env.$(`#quiz-exp-${quizIdx}`).classList.contains("visible")
  };
}

describe("Bug: đáp án bị reset khi chuyển tab", () => {
  let env, correctIdx, wrongIdx;
  beforeEach(async () => {
    env = await loadApp({ cloud: { currentSessionId: 1, completedIds: [], updatedAt: 1 } });
    correctIdx = Number(env.$(".quiz-card").getAttribute("data-correct-idx"));
    wrongIdx = correctIdx === 0 ? 1 : 0;
  });
  afterEach(() => env.close());

  it("giữ đáp án khi chuyển tab trình duyệt rồi quay lại", async () => {
    answerQuiz(env, 0, wrongIdx);
    await env.sleep(300);
    await env.switchBrowserTabAndBack();
    same(quizState(env, 0), { wrong: wrongIdx, correct: correctIdx, explanationVisible: true });
  });

  it("giữ đáp án ngay cả khi máy khác cập nhật Cloud (bắt buộc render lại)", async () => {
    answerQuiz(env, 0, wrongIdx);
    await env.sleep(300);
    env.net.cloud = { ...env.net.cloud, completedIds: [30], updatedAt: Date.now() + 5000 };
    await env.switchBrowserTabAndBack();
    assert.strictEqual(quizState(env, 0).wrong, wrongIdx);
  });

  it("giữ đáp án khi chuyển tab trong web (Lộ trình / Ôn tập) rồi quay lại", async () => {
    answerQuiz(env, 0, correctIdx);
    env.clickTab("srs");
    env.clickTab("curriculum");
    env.clickTab("today");
    assert.strictEqual(quizState(env, 0).correct, correctIdx);
    assert.strictEqual(quizState(env, 0).wrong, -1);
  });

  it("giữ đáp án khi sang buổi khác rồi quay lại", async () => {
    answerQuiz(env, 0, wrongIdx);
    await env.goToSession(2);
    await env.goToSession(1);
    assert.strictEqual(quizState(env, 0).wrong, wrongIdx);
  });

  it("giữ đáp án sau khi tải lại trang (F5)", async () => {
    answerQuiz(env, 0, wrongIdx);
    await env.sleep(300);
    const saved = env.localSaved();
    env.close();
    env = await loadApp({ local: saved, cloud: saved });
    assert.strictEqual(quizState(env, 0).wrong, wrongIdx);
  });

  it("giữ trạng thái 'Dịch câu hỏi' và thẻ đã lật khi render lại", async () => {
    env.$("[data-toggle-vi='0']").click();
    env.$(".flip-card").click();
    env.clickTab("srs");
    env.clickTab("today");
    await env.goToSession(2);
    await env.goToSession(1);
    assert.strictEqual(env.$("#quiz-vi-0").style.display, "block");
    assert.ok(env.$(".flip-card").classList.contains("revealed"));
  });

  it("đổi đáp án thì chỉ còn đáp án mới bị đánh sai", () => {
    const other = [0, 1, 2, 3].find((i) => i !== correctIdx && i !== wrongIdx);
    answerQuiz(env, 0, wrongIdx);
    answerQuiz(env, 0, other);
    assert.strictEqual(quizState(env, 0).wrong, other);
    assert.strictEqual(env.$$(".quiz-card")[0].querySelectorAll(".quiz-option.wrong").length, 1);
  });

  it("bảng điểm cập nhật đúng", () => {
    answerQuiz(env, 0, correctIdx);
    answerQuiz(env, 1, Number(env.$$(".quiz-card")[1].getAttribute("data-correct-idx")) === 0 ? 1 : 0);
    const total = env.$$(".quiz-card").length;
    assert.strictEqual(env.$("#quiz-score-badge").textContent, `Đã làm 2/${total} • Đúng 1`);
  });

  it("nút Làm lại xóa đáp án và không bị Cloud khôi phục lại", async () => {
    answerQuiz(env, 0, wrongIdx);
    await env.sleep(300);
    env.$("#btn-reset-quiz").click();
    await env.sleep(300);
    await env.switchBrowserTabAndBack();
    same(quizState(env, 0), { wrong: -1, correct: -1, explanationVisible: false });
  });
});

describe("Thứ tự nội dung buổi học", () => {
  let env;
  before(async () => { env = await loadApp(); });
  after(() => env.close());

  const order = () => env.$$("#today-lesson-container [id^=sec-]").map((e) => e.id);

  it("buổi lý thuyết: Lý thuyết → Lab → Hỏi AI → Quiz → Flashcards", () => {
    same(order(), ["sec-learn", "sec-lab", "sec-ai", "sec-quiz", "sec-cards"]);
  });

  it("phần Hỏi AI nằm TRƯỚC phần câu hỏi thi", () => {
    const ids = order();
    assert.ok(ids.indexOf("sec-ai") < ids.indexOf("sec-quiz"));
  });

  it("thanh bước khớp với các phần hiển thị", () => {
    const pills = env.$$(".lesson-step-pill").map((p) => p.getAttribute("data-jump"));
    same(pills, order());
  });

  it("buổi luyện đề (chặng 7) không có lab/quiz nhưng vẫn có AI & Flashcards", async () => {
    await env.goToSession(60);
    same(order(), ["sec-learn", "sec-ai", "sec-cards"]);
  });

  it("render được toàn bộ buổi học mà không lỗi", async () => {
    const total = env.window.STUDY_DATA.sessions.length;
    for (let i = 1; i <= total; i++) {
      await env.goToSession(i);
      assert.match(env.$(".lesson-title").textContent, new RegExp(`Buổi #${i}:`));
    }
  });
});

describe("Lab thực hành", () => {
  let env;
  beforeEach(async () => { env = await loadApp(); });
  afterEach(() => env.close());

  it("hiển thị lab chi tiết cho buổi 1", () => {
    const lab = env.window.LAB_DATA[1];
    assert.ok(env.$("#sec-lab h3").textContent.includes(lab.title));
    assert.strictEqual(env.$$(".lab-step").length, lab.steps.length);
  });

  it("tick bước lab: cập nhật huy hiệu, lưu và giữ sau khi render lại", async () => {
    const total = env.$$(".lab-step").length;
    env.$("[data-lab-step='0']").click();
    env.$("[data-lab-step='1']").click();
    assert.strictEqual(env.$("#lab-progress-badge").textContent, `Đã làm 2/${total} bước`);
    await env.goToSession(2);
    await env.goToSession(1);
    assert.ok(env.$("[data-lab-step='0']").checked);
    assert.ok(env.$$(".lab-step")[1].classList.contains("done"));
  });

  it("bỏ tick tất cả", () => {
    env.$("[data-lab-step='0']").click();
    env.$("#btn-reset-lab").click();
    assert.strictEqual(env.$$("[data-lab-step]:checked").length, 0);
  });

  it("lệnh CLI được escape HTML (không chèn thẻ lạ vào trang)", () => {
    const withLt = Object.entries(env.window.LAB_DATA).find(([, l]) => l.steps.some((s) => /[<>]/.test(s.cli || "")));
    if (!withLt) return;
    const stepIdx = withLt[1].steps.findIndex((s) => /[<>]/.test(s.cli || ""));
    return env.goToSession(Number(withLt[0])).then(() => {
      const pre = env.$(`#lab-cli-${stepIdx}`);
      assert.strictEqual(pre.textContent, withLt[1].steps[stepIdx].cli);
      assert.strictEqual(pre.children.length, 0);
    });
  });

  it("copy lệnh CLI và prompt lab vào clipboard", async () => {
    const cliBtn = env.$("[data-copy-cli]");
    if (cliBtn) {
      cliBtn.click();
      await env.sleep(5);
      assert.ok(env.clipboard.last && env.clipboard.last.length > 0);
    }
    env.$("#btn-copy-lab-prompt").click();
    await env.sleep(5);
    assert.match(env.clipboard.last, /Buổi #1/);
  });

  it("buổi chưa có lab chi tiết sẽ hiện khung sườn + prompt nhờ AI soạn", async () => {
    const app = env.app;
    const fake = { id: 999, phase: 3, title: "Demo", corePoints: [] };
    assert.ok(app.sessionNeedsLab(fake));
    const sk = app.buildLabSkeleton(fake);
    assert.ok(sk.steps.length >= 4);
    assert.match(app.buildLabPromptForSession(fake, sk, true), /thiết kế bài lab/);
  });
});

describe("Hoàn thành buổi học", () => {
  it("bấm Hoàn thành chỉ đánh dấu 1 lần và chuyển sang buổi kế tiếp", async () => {
    const env = await loadApp();
    env.$("#btn-complete-session").click();
    same(env.app.state.completedIds, [1]);
    assert.strictEqual(env.app.state.currentSessionId, 2);
    env.close();
  });

  it("nút Hoàn thành ở cuối trang hoạt động giống nút ở đầu", async () => {
    const env = await loadApp();
    env.$("#btn-complete-session-bottom").click();
    same(env.app.state.completedIds, [1]);
    env.close();
  });

  it("bấm lại vào buổi đã hoàn thành sẽ bỏ đánh dấu", async () => {
    const env = await loadApp();
    env.$("#btn-complete-session").click();
    await env.goToSession(1);
    env.$("#btn-complete-session").click();
    same(env.app.state.completedIds, []);
    assert.ok(env.app.state.uncompletedAt[1] > 0);
    env.close();
  });
});

describe("Tiện ích", () => {
  let env;
  before(async () => { env = await loadApp(); });
  after(() => env.close());

  it("escapeHtml", () => {
    assert.strictEqual(env.app.escapeHtml(`<a href="x">&</a>`), "&lt;a href=&quot;x&quot;&gt;&amp;&lt;/a&gt;");
    assert.strictEqual(env.app.escapeHtml(null), "");
  });

  it("stripTags", () => {
    assert.strictEqual(env.app.stripTags("<strong>IAM</strong> <code>Role</code>"), "IAM Role");
  });

  it("prompt AI chứa tiêu đề buổi, không chứa thẻ HTML", () => {
    const s = env.window.STUDY_DATA.sessions[0];
    const p = env.app.buildAiPromptForSession(s);
    assert.ok(p.includes(s.title));
    assert.ok(!/<strong>|<code>/.test(p));
  });
});

describe("Quiz v2 trong bài học – Choose TWO, whyWrong, migration & tách pool (P2 §8.5)", () => {
  it("hiện badge domain/task, whyWrong khi trả lời, và hỗ trợ câu Choose TWO (disable nút Nộp khi mới chọn 1)", async () => {
    const env = await loadApp({ cloud: { currentSessionId: 1, completedIds: [], updatedAt: 1 } });
    try {
      const cards = env.$$(".quiz-card");
      assert.ok(cards.length >= 5, "Buổi #1 phải có ≥ 5 câu quiz");
      assert.ok(cards[0].querySelector(".quiz-domain-badge"), "Thiếu .quiz-domain-badge");

      // Trả lời 1 câu single-choice để kiểm tra whyWrong
      const singleCard = cards.find((c) => c.getAttribute("data-multi") === "false");
      assert.ok(singleCard);
      singleCard.querySelectorAll(".quiz-option")[0].click();
      const whyWrongEls = singleCard.querySelectorAll(".quiz-why-wrong");
      assert.ok(whyWrongEls.length >= 3, "Phải hiển thị whyWrong cho các phương án sai");

      // Kiểm tra câu Choose TWO (s1-q03)
      const multiCard = cards.find((c) => c.getAttribute("data-multi") === "true");
      assert.ok(multiCard, "Buổi #1 phải có câu Choose TWO");
      const submitBtn = multiCard.querySelector(".quiz-submit-multi");
      const opts = multiCard.querySelectorAll(".quiz-option");
      assert.strictEqual(opts.length, 5);
      assert.strictEqual(submitBtn.disabled, true, "Chưa chọn đủ 2 đáp án thì nút Nộp phải disable");

      opts[0].click();
      assert.strictEqual(submitBtn.disabled, true, "Mới chọn 1 đáp án thì nút Nộp vẫn disable");
      opts[2].click();
      assert.strictEqual(submitBtn.disabled, false, "Chọn đủ 2 đáp án thì nút Nộp được bật");
      submitBtn.click();

      const updatedMulti = env.$(`.quiz-card[data-quiz-id="${multiCard.getAttribute("data-quiz-id")}"]`);
      assert.strictEqual(updatedMulti.querySelectorAll(".quiz-option.correct").length, 2);
    } finally {
      env.close();
    }
  });

  it("migrate đáp án v1 (key theo index) từ localStorage và từ Cloud sang key theo ID", async () => {
    const v1State = {
      currentSessionId: 1,
      completedIds: [],
      quizAnswers: { 1: { 0: 1, _t: 1000 } },
      updatedAt: 1000
    };
    const env = await loadApp({ local: v1State, cloud: v1State });
    try {
      assert.strictEqual(env.app.state.quizAnswers[1]["s1-l0"], 1);
      assert.strictEqual(env.app.state.quizAnswers[1]._v, 2);

      // Cloud đẩy bản v1 mới hơn ở buổi #2
      env.net.cloud = {
        ...v1State,
        quizAnswers: {
          1: { 0: 1, _t: 1000 },
          2: { 0: 2, _t: 5000 }
        },
        updatedAt: 5000
      };
      await env.switchBrowserTabAndBack();
      assert.strictEqual(env.app.state.quizAnswers[2]["s2-l0"], 2);
      assert.strictEqual(env.app.state.quizAnswers[2]._v, 2);
    } finally {
      env.close();
    }
  });

  it("không có câu pool 'exam' nào hiển thị trong mọi buổi 1–80", async () => {
    const env = await loadApp();
    try {
      for (let sid = 1; sid <= 80; sid++) {
        env.app.state.currentSessionId = sid;
        env.app.renderTodayLesson();
        const quizIds = env.$$("#today-lesson-container .quiz-card").map((el) =>
          el.getAttribute("data-quiz-id")
        );
        for (const id of quizIds) {
          assert.ok(!/^x-p[1-6]-\d{3}$/.test(id), `Buổi #${sid} làm lộ câu exam ${id}`);
        }
      }
    } finally {
      env.close();
    }
  });
});

