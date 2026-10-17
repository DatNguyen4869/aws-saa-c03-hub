const assert = require("assert");
const fs = require("fs");
const path = require("path");
const { applyContentPatches, validatePatch } = require("../content-patcher");
const { ROOT } = require("./helpers/loadApp");

function makeSampleSessions() {
  return [
    {
      id: 10,
      title: "Buổi 10 gốc",
      corePoints: ["CP 1"],
      examTraps: ["Trap 1"],
      jargon: [{ term: "VPC", plain: "Mạng riêng ảo" }],
      deepSections: [{ title: "Phần 1", content: "Nội dung 1" }],
      cards: [
        { q: "Câu hỏi gốc 1?", a: "Đáp án gốc 1" },
        { q: "Câu hỏi gốc 2?", a: "Đáp án gốc 2" }
      ]
    },
    {
      id: 11,
      title: "Buổi 11 thiếu mảng phụ",
      corePoints: ["CP 11"],
      examTraps: ["Trap 11"],
      cards: [{ q: "Card 11?", a: "Ans 11" }]
    }
  ];
}

describe("content-patcher.js", () => {
  it("append core points/traps/jargon/deepSections/cards vào đúng session", () => {
    const sessions = makeSampleSessions();
    const res = applyContentPatches(sessions, {
      10: {
        patchId: "test-p1",
        appendCorePoints: ["CP 2", "CP 3"],
        appendExamTraps: ["Trap 2"],
        appendJargon: [{ term: "Subnet", plain: "Mạng con" }],
        appendDeepSections: [{ title: "Phần 2", content: "Nội dung 2" }],
        appendCards: [{ q: "Câu hỏi mới 3?", a: "Đáp án mới 3" }]
      }
    });

    assert.deepStrictEqual(res.applied, ["test-p1"]);
    assert.deepStrictEqual(res.skipped, []);
    assert.deepStrictEqual(res.warnings, []);

    const s10 = sessions[0];
    assert.strictEqual(s10.corePoints.length, 3);
    assert.strictEqual(s10.corePoints[2], "CP 3");
    assert.strictEqual(s10.examTraps.length, 2);
    assert.strictEqual(s10.examTraps[1], "Trap 2");
    assert.strictEqual(s10.jargon.length, 2);
    assert.strictEqual(s10.jargon[1].term, "Subnet");
    assert.strictEqual(s10.deepSections.length, 2);
    assert.strictEqual(s10.deepSections[1].title, "Phần 2");
    assert.strictEqual(s10.cards.length, 3);
    assert.strictEqual(s10.cards[2].q, "Câu hỏi mới 3?");
  });

  it("không làm đổi index của card cũ (bảo toàn key SRS s{id}_c{idx})", () => {
    // Kiểm tra trên dữ liệu thực tế trước và sau khi áp CONTENT_PATCHES
    const sandbox = { window: {} };
    for (const f of ["data.js", "deep-content.js", "deep-content-2.js", "deep-content-3.js", "deep-content-4.js"]) {
      const code = fs.readFileSync(path.join(ROOT, f), "utf8");
      new Function("window", code)(sandbox.window);
    }
    const beforeCardsBySession = new Map();
    sandbox.window.STUDY_DATA.sessions.forEach((s) => {
      beforeCardsBySession.set(
        s.id,
        s.cards.map((c) => ({ q: c.q, a: c.a }))
      );
    });

    const patches = require("../content-patch-2026");
    applyContentPatches(sandbox.window.STUDY_DATA.sessions, patches);

    sandbox.window.STUDY_DATA.sessions.forEach((s) => {
      const oldCards = beforeCardsBySession.get(s.id);
      assert.ok(s.cards.length >= oldCards.length, `Buổi #${s.id} bị giảm số card`);
      for (let i = 0; i < oldCards.length; i++) {
        assert.strictEqual(
          s.cards[i].q,
          oldCards[i].q,
          `Buổi #${s.id} card[${i}] bị lệch câu hỏi`
        );
      }
    });
  });

  it("idempotent khi áp 2 lần cùng patchId", () => {
    const sessions = makeSampleSessions();
    const patchMap = {
      10: {
        patchId: "idempotent-patch",
        appendCorePoints: ["CP mới"],
        appendCards: [{ q: "Q mới?", a: "A mới" }]
      }
    };

    const res1 = applyContentPatches(sessions, patchMap);
    assert.deepStrictEqual(res1.applied, ["idempotent-patch"]);
    assert.strictEqual(sessions[0].cards.length, 3);

    const res2 = applyContentPatches(sessions, patchMap);
    assert.deepStrictEqual(res2.applied, []);
    assert.deepStrictEqual(res2.skipped, ["idempotent-patch"]);
    assert.strictEqual(sessions[0].cards.length, 3);
    assert.strictEqual(sessions[0].corePoints.length, 2);
  });

  it("dedupe card theo q, section theo title, jargon theo term, corePoint/trap theo chuỗi", () => {
    const sessions = makeSampleSessions();
    applyContentPatches(sessions, {
      10: {
        patchId: "dedupe-1",
        appendCorePoints: ["CP 1", "CP mới"],
        appendExamTraps: ["Trap 1", "Trap mới"],
        appendJargon: [
          { term: "VPC", plain: "Bị trùng term" },
          { term: "IGW", plain: "Cổng Internet" }
        ],
        appendDeepSections: [
          { title: "Phần 1", content: "Bị trùng title" },
          { title: "Phần mới", content: "Nội dung mới" }
        ],
        appendCards: [
          { q: "Câu hỏi gốc 1?", a: "Đáp án khác nhưng trùng câu hỏi" },
          { q: "Câu hỏi hoàn toàn mới?", a: "Đáp án mới" }
        ]
      }
    });

    const s10 = sessions[0];
    assert.strictEqual(s10.corePoints.length, 2);
    assert.strictEqual(s10.examTraps.length, 2);
    assert.strictEqual(s10.jargon.length, 2);
    assert.strictEqual(s10.jargon[0].plain, "Mạng riêng ảo");
    assert.strictEqual(s10.deepSections.length, 2);
    assert.strictEqual(s10.deepSections[0].content, "Nội dung 1");
    assert.strictEqual(s10.cards.length, 3);
    assert.strictEqual(s10.cards[0].a, "Đáp án gốc 1");
  });

  it("session không tồn tại → warning, không throw", () => {
    const sessions = makeSampleSessions();
    const res = applyContentPatches(sessions, {
      999: {
        patchId: "missing-session",
        appendCorePoints: ["Không có buổi 999"]
      }
    });
    assert.strictEqual(res.applied.length, 0);
    assert.strictEqual(res.warnings.length, 1);
    assert.match(res.warnings[0], /999/);
  });

  it("tạo mảng khi session thiếu jargon/deepSections", () => {
    const sessions = makeSampleSessions();
    assert.strictEqual(sessions[1].jargon, undefined);
    assert.strictEqual(sessions[1].deepSections, undefined);

    applyContentPatches(sessions, {
      11: {
        patchId: "init-arrays",
        appendJargon: [{ term: "AZ", plain: "Trung tâm dữ liệu" }],
        appendDeepSections: [{ title: "Mục sâu 1", content: "Chi tiết" }]
      }
    });

    assert.ok(Array.isArray(sessions[1].jargon));
    assert.strictEqual(sessions[1].jargon.length, 1);
    assert.ok(Array.isArray(sessions[1].deepSections));
    assert.strictEqual(sessions[1].deepSections.length, 1);
  });

  it("validatePatch bắt field sai kiểu", () => {
    const errs1 = validatePatch(10, { appendCards: "x" });
    assert.ok(errs1.length > 0);

    const errs2 = validatePatch(10, { appendCards: [{ q: "Chỉ có câu hỏi" }] });
    assert.ok(errs2.length > 0);

    const errs3 = validatePatch(10, { unknownField: 123 });
    assert.ok(errs3.length > 0);

    const errs4 = validatePatch(10, {
      patchId: "ok",
      appendCards: [{ q: "Hợp lệ?", a: "Hợp lệ" }]
    });
    assert.deepStrictEqual(errs4, []);
  });

  it("retitle chỉ đổi title, giữ nguyên id", () => {
    const sessions = makeSampleSessions();
    applyContentPatches(sessions, {
      10: {
        patchId: "retitle-test",
        retitle: "Tiêu đề đã cập nhật"
      }
    });
    assert.strictEqual(sessions[0].id, 10);
    assert.strictEqual(sessions[0].title, "Tiêu đề đã cập nhật");
  });
});
