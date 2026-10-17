const assert = require("assert");
const { loadData, loadApp } = require("./helpers/loadApp");

const { STUDY_DATA } = loadData();
const tables = STUDY_DATA.comparisonTables;
const sessionIds = new Set(STUDY_DATA.sessions.map((s) => s.id));

const VALID_CATEGORIES = new Set([
  "Storage",
  "Storage & Migration",
  "Database",
  "Database & Analytics",
  "Networking",
  "Networking & CDN",
  "Integration",
  "Security",
  "Security & Governance",
  "Compute",
  "Compute & Serverless",
  "Architecture",
  "Architecture & DR",
  "Migration",
  "Monitoring"
]);

const EXPECTED_NEW_IDS = [
  "route53",
  "dr",
  "encryption",
  "vpc-connectivity",
  "migration",
  "monitoring",
  "compute",
  "identity"
];

describe("Bảng so sánh dịch vụ trực quan – Data & UI (P2 §8.4)", () => {
  it("có ≥ 14 bảng, id duy nhất, category hợp lệ, relatedSessions tồn tại", () => {
    assert.ok(tables.length >= 14, `Số bảng = ${tables.length} (cần ≥ 14)`);
    const ids = new Set();
    for (const tb of tables) {
      assert.ok(tb.id && typeof tb.id === "string", `Bảng "${tb.title}" thiếu id`);
      assert.ok(!ids.has(tb.id), `Trùng id bảng: ${tb.id}`);
      ids.add(tb.id);
      assert.ok(
        VALID_CATEGORIES.has(tb.category),
        `Bảng ${tb.id} có category không hợp lệ: ${tb.category}`
      );
      assert.ok(
        Array.isArray(tb.relatedSessions) && tb.relatedSessions.length >= 1,
        `Bảng ${tb.id} thiếu relatedSessions`
      );
      for (const sid of tb.relatedSessions) {
        assert.ok(sessionIds.has(sid), `Bảng ${tb.id} tham chiếu buổi không tồn tại: #${sid}`);
      }
    }
  });

  it("8 bảng so sánh mới có mặt đầy đủ", () => {
    const ids = new Set(tables.map((t) => t.id));
    for (const id of EXPECTED_NEW_IDS) {
      assert.ok(ids.has(id), `Thiếu bảng so sánh mới: ${id}`);
    }
  });

  it("lọc theo category, tìm kiếm từ khóa và hiện bảng Route 53 ở Buổi #27 (jsdom)", async () => {
    const env = await loadApp({ cloud: { currentSessionId: 27, completedIds: [], updatedAt: 1 } });
    try {
      // Buổi 27 hiện bảng Route 53 trong khối Bảng so sánh liên quan
      const relatedLinks = env.$$("#today-lesson-container .related-tables [data-open-table]");
      const relatedIds = relatedLinks.map((btn) => btn.getAttribute("data-open-table"));
      assert.ok(
        relatedIds.includes("route53"),
        `Buổi #27 phải hiện bảng route53 trong khối liên quan, thực tế: ${JSON.stringify(relatedIds)}`
      );

      // Chuyển sang tab Bảng so sánh
      env.clickTab("compare");
      assert.ok(env.$$("#comparison-tables-container .compare-card").length >= 14);

      // Lọc theo category Networking
      const netBtn = env.$('#comparison-tables-container .compare-filter[data-category="Networking"]');
      assert.ok(netBtn, "Thiếu nút lọc Networking");
      netBtn.click();
      const netCards = env.$$("#comparison-tables-container .compare-card");
      assert.ok(netCards.length >= 2);
      const netIds = netCards.map((c) => c.getAttribute("data-table-id"));
      assert.ok(netIds.includes("route53") && netIds.includes("vpc-connectivity"));

      // Tìm kiếm từ khóa
      const allBtn = env.$('#comparison-tables-container .compare-filter[data-category="all"]');
      allBtn.click();
      const input = env.$("#compare-search-input");
      input.value = "CloudHSM";
      input.dispatchEvent(new env.window.Event("input", { bubbles: true }));
      const searchCards = env.$$("#comparison-tables-container .compare-card");
      assert.ok(searchCards.some((c) => c.getAttribute("data-table-id") === "encryption"));
    } finally {
      env.close();
    }
  });
});
