/**
 * Test thuật toán Spaced Repetition (SRS) và bộ lọc thẻ.
 */
const assert = require("assert");
// Dữ liệu tạo trong jsdom thuộc 'realm' khác Node → so sánh qua JSON
const same = (actual, expected, msg) => assert.deepStrictEqual(JSON.parse(JSON.stringify(actual)), expected, msg);
const { loadApp } = require("./helpers/loadApp");

const DAY = 86400 * 1000;

describe("SRS – bộ lọc thẻ", () => {
  let env, app;
  before(async () => {
    env = await loadApp({ cloud: { currentSessionId: 3, completedIds: [1, 2], updatedAt: Date.now() } });
    app = env.app;
  });
  after(() => env.close());

  const sessionsOf = (cards) => [...new Set(cards.map((c) => c.sessionId))].sort((a, b) => a - b);

  it("'due' và 'completed' chỉ lấy thẻ từ buổi ĐÃ hoàn thành (không lộ đề buổi chưa học)", () => {
    same(sessionsOf(app.getAllFlashcards("due")), [1, 2]);
    same(sessionsOf(app.getAllFlashcards("completed")), [1, 2]);
  });

  it("'current' chỉ lấy thẻ của buổi đang học", () => {
    same(sessionsOf(app.getAllFlashcards("current")), [3]);
  });

  it("'all' lấy toàn bộ thẻ chuẩn", () => {
    const total = env.window.STUDY_DATA.sessions.reduce((n, s) => n + s.cards.length, 0);
    assert.strictEqual(app.getAllFlashcards("all").length, total);
  });

  it("thẻ đã hẹn ôn ở tương lai không nằm trong 'due'", () => {
    const first = app.getAllFlashcards("due")[0];
    app.state.srsData[first.key] = { due: Date.now() + 3 * DAY, intervalDays: 3, lastRate: "good", updatedAt: Date.now() };
    assert.ok(!app.getAllFlashcards("due").some((c) => c.key === first.key));
    assert.ok(app.getAllFlashcards("completed").some((c) => c.key === first.key));
    delete app.state.srsData[first.key];
  });

  it("'custom' chỉ lấy thẻ tự tạo", () => {
    app.state.customCards.push({ id: "cust_test", sessionId: 1, q: "Q?", a: "A" });
    const cards = app.getAllFlashcards("custom");
    assert.ok(cards.length >= 1 && cards.every((c) => c.isCustom));
    app.state.customCards = app.state.customCards.filter((c) => c.id !== "cust_test");
  });

  it("hàng đợi sắp xếp theo hạn ôn (thẻ mới / quá hạn lên trước)", () => {
    const cards = app.getAllFlashcards("completed");
    app.state.srsData[cards[0].key] = { due: Date.now() + DAY, updatedAt: 1 };
    app.state.srsFilter = "completed";
    app.buildSrsQueue();
    assert.strictEqual(app.state.srsQueue[app.state.srsQueue.length - 1].key, cards[0].key);
    delete app.state.srsData[cards[0].key];
  });
});

describe("SRS – chấm điểm thẻ trên giao diện", () => {
  async function openFirstCard() {
    const env = await loadApp({ cloud: { currentSessionId: 2, completedIds: [1], updatedAt: Date.now() } });
    env.clickTab("srs");
    env.$("#btn-srs-show").click();
    return env;
  }

  const cases = [
    ["hard", 1],
    ["good", 3],
    ["easy", 7]
  ];
  cases.forEach(([rate, days]) => {
    it(`'${rate}' hẹn ôn lại sau ${days} ngày và lưu lên Cloud`, async () => {
      const env = await openFirstCard();
      const key = env.app.state.srsQueue[0].key;
      const before = env.app.state.srsQueue.length;
      env.$(`[data-rate='${rate}']`).click();
      const info = env.app.state.srsData[key];
      assert.strictEqual(info.intervalDays, days);
      assert.ok(Math.abs(info.due - (Date.now() + days * DAY)) < 5000);
      assert.strictEqual(env.app.state.srsQueue.length, before - 1, "thẻ phải rời hàng đợi 'due'");
      await env.sleep(20);
      assert.ok(env.net.cloud.srsData[key]);
      env.close();
    });
  });

  it("'again' đưa thẻ xuống cuối hàng đợi để hỏi lại ngay", async () => {
    const env = await openFirstCard();
    const key = env.app.state.srsQueue[0].key;
    const len = env.app.state.srsQueue.length;
    env.$("[data-rate='again']").click();
    assert.strictEqual(env.app.state.srsQueue.length, len);
    assert.strictEqual(env.app.state.srsQueue[len - 1].key, key);
    env.close();
  });

  it("chưa hoàn thành buổi nào thì 'Cần ôn hôm nay' trống và gợi ý học thẻ buổi hiện tại", async () => {
    const env = await loadApp();
    env.clickTab("srs");
    assert.strictEqual(env.app.state.srsQueue.length, 0);
    assert.ok(env.$("#srs-arena-container").textContent.includes("Chưa có buổi học nào được đánh dấu Hoàn Thành"));
    env.close();
  });
});
