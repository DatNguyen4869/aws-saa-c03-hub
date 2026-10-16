/**
 * Unit test cho logic đồng bộ 2 máy (Cloud Sync) – phần dễ gây mất tiến độ nhất.
 */
const assert = require("assert");
// Dữ liệu tạo trong jsdom thuộc 'realm' khác Node → so sánh qua JSON
const same = (actual, expected, msg) => assert.deepStrictEqual(JSON.parse(JSON.stringify(actual)), expected, msg);
const { loadApp } = require("./helpers/loadApp");

describe("Cloud Sync – hàm merge thuần", () => {
  let env, app;
  before(async () => {
    env = await loadApp();
    app = env.app;
  });
  after(() => env.close());

  describe("stableStr", () => {
    it("không phụ thuộc thứ tự key", () => {
      assert.strictEqual(app.stableStr({ a: 1, b: { y: 2, x: 1 } }), app.stableStr({ b: { x: 1, y: 2 }, a: 1 }));
    });
    it("phân biệt giá trị khác nhau", () => {
      assert.notStrictEqual(app.stableStr({ a: 1 }), app.stableStr({ a: 2 }));
    });
    it("undefined/null được coi như object rỗng hoặc null", () => {
      assert.strictEqual(app.stableStr(undefined), "{}");
      assert.strictEqual(app.stableStr(null), "null");
    });
  });

  describe("mergeNestedMaps (quizAnswers / labProgress)", () => {
    it("lấy bản ghi có _t mới hơn cho từng buổi", () => {
      const local = { 1: { 0: 2, _t: 100 }, 2: { 0: 1, _t: 500 } };
      const cloud = { 1: { 0: 3, _t: 200 }, 2: { 0: 0, _t: 400 } };
      const m = app.mergeNestedMaps(local, cloud);
      same(m[1], { 0: 3, _t: 200 });
      same(m[2], { 0: 1, _t: 500 });
    });
    it("giữ buổi chỉ có ở một phía", () => {
      const m = app.mergeNestedMaps({ 1: { _t: 1 } }, { 2: { _t: 2 } });
      same(Object.keys(m).sort(), ["1", "2"]);
    });
    it("reset (object rỗng có _t mới) thắng đáp án cũ trên Cloud", () => {
      const m = app.mergeNestedMaps({ 1: { _t: 999 } }, { 1: { 0: 2, 1: 3, _t: 10 } });
      same(m[1], { _t: 999 });
    });
    it("chịu được input null/undefined", () => {
      same(app.mergeNestedMaps(undefined, null), {});
    });
  });

  describe("mergeCompletedIds", () => {
    it("hợp nhất buổi đã hoàn thành từ 2 máy", () => {
      const r = app.mergeCompletedIds([1, 2], [2, 3], {}, {}, 100, 200);
      same(r.completedIds, [1, 2, 3]);
    });
    it("bỏ buổi mà máy local đã bỏ tick SAU lần lưu Cloud", () => {
      const r = app.mergeCompletedIds([1], [1, 5], { 5: 300 }, {}, 300, 200);
      same(r.completedIds, [1]);
    });
    it("giữ buổi Cloud đã hoàn thành nếu lần bỏ tick ở local cũ hơn", () => {
      const r = app.mergeCompletedIds([1], [1, 5], { 5: 100 }, {}, 300, 200);
      same(r.completedIds, [1, 5]);
    });
    it("bỏ buổi mà máy khác đã bỏ tick SAU lần lưu local", () => {
      const r = app.mergeCompletedIds([1, 7], [1], {}, { 7: 500 }, 300, 600);
      same(r.completedIds, [1]);
    });
    it("kết quả luôn được sắp xếp tăng dần và là số", () => {
      const r = app.mergeCompletedIds(["10", 2], [5], {}, {}, 1, 1);
      same(r.completedIds, [2, 5, 10]);
    });
  });

  describe("mergeSrsData", () => {
    it("thẻ nào updatedAt mới hơn thì thắng", () => {
      const m = app.mergeSrsData({ a: { due: 1, updatedAt: 50 }, b: { due: 9, updatedAt: 90 } }, { a: { due: 2, updatedAt: 60 }, b: { due: 3, updatedAt: 10 } });
      assert.strictEqual(m.a.due, 2);
      assert.strictEqual(m.b.due, 9);
    });
    it("thêm thẻ chỉ có trên Cloud", () => {
      const m = app.mergeSrsData({}, { z: { due: 5, updatedAt: 1 } });
      assert.ok(m.z);
    });
  });

  describe("mergeCustomCards", () => {
    it("hợp nhất theo id, không nhân đôi thẻ", () => {
      const m = app.mergeCustomCards([{ id: "x", q: "1" }, { id: "y", q: "2" }], [{ id: "y", q: "2b" }, { id: "z", q: "3" }]);
      same(m.map((c) => c.id).sort(), ["x", "y", "z"]);
      assert.strictEqual(m.find((c) => c.id === "y").q, "2b");
    });
    it("bỏ qua phần tử rác không có id", () => {
      assert.strictEqual(app.mergeCustomCards([null, {}], undefined).length, 0);
    });
  });
});

describe("Cloud Sync – tích hợp", () => {
  it("máy mới mở sẽ kéo tiến độ từ Cloud về", async () => {
    const env = await loadApp({ cloud: { currentSessionId: 4, completedIds: [1, 2, 3], updatedAt: Date.now() } });
    same(env.app.state.completedIds, [1, 2, 3]);
    assert.strictEqual(env.app.state.currentSessionId, 4);
    assert.match(env.$(".lesson-title").textContent, /Buổi #4/);
    env.close();
  });

  it("tiến độ local mới hơn được đẩy ngược lên Cloud, không bị ghi đè", async () => {
    const now = Date.now();
    const env = await loadApp({
      local: { currentSessionId: 6, completedIds: [1, 2, 3, 4, 5], updatedAt: now },
      cloud: { currentSessionId: 2, completedIds: [1], updatedAt: now - 10000 }
    });
    assert.strictEqual(env.app.state.currentSessionId, 6);
    same(env.net.cloud.completedIds, [1, 2, 3, 4, 5]);
    env.close();
  });

  it("đáp án quiz & tick lab được đồng bộ lên Cloud", async () => {
    const env = await loadApp();
    const card = env.$(".quiz-card");
    card.querySelectorAll(".quiz-option")[0].click();
    const cb = env.$("[data-lab-step='0']");
    cb.click();
    await env.sleep(300);
    assert.strictEqual(env.net.cloud.quizAnswers[1][0], 0);
    assert.strictEqual(env.net.cloud.labProgress[1][0], true);
    env.close();
  });

  it("mất mạng vẫn chạy bình thường và lưu localStorage", async () => {
    const env = await loadApp({ offline: true });
    env.$(".quiz-card .quiz-option").click();
    await env.sleep(300);
    assert.strictEqual(env.localSaved().quizAnswers[1][0], 0);
    env.close();
  });

  it("không đẩy Cloud liên tục khi dữ liệu không đổi (chỉ khác thứ tự key)", async () => {
    const t = Date.now();
    const env = await loadApp({ cloud: { currentSessionId: 1, completedIds: [], quizAnswers: { 1: { _t: t, 0: 1 } }, labProgress: {}, updatedAt: t } });
    const before = env.net.puts.length;
    env.net.cloud = { ...env.net.cloud, quizAnswers: { 1: { 0: 1, _t: t } } };
    await env.switchBrowserTabAndBack();
    assert.strictEqual(env.net.puts.length, before);
    env.close();
  });

  it("mã sao lưu (sync code) tạo ra rồi nạp lại được", async () => {
    const env = await loadApp({ cloud: { currentSessionId: 9, completedIds: [1, 2], updatedAt: Date.now() } });
    const code = env.app.generateSyncCode();
    env.app.state.completedIds = [];
    env.app.state.currentSessionId = 1;
    assert.ok(env.app.applySyncCode(`https://x/#sync=${code}`, true));
    same(env.app.state.completedIds, [1, 2]);
    assert.strictEqual(env.app.state.currentSessionId, 9);
    assert.strictEqual(env.app.applySyncCode("rác!!!", true), false);
    env.close();
  });
});
