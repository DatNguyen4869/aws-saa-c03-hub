const assert = require("assert");
const fs = require("fs");
const path = require("path");
const { loadData, ROOT } = require("./helpers/loadApp");
const { applyContentPatches } = require("../content-patcher");
const CONTENT_PATCHES = require("../content-patch-2026");

const { STUDY_DATA } = loadData();
const sessions = STUDY_DATA.sessions;

function getSession(id) {
  const s = sessions.find((x) => x.id === Number(id));
  assert.ok(s, `Không tìm thấy Buổi #${id}`);
  return s;
}

function sessionBlob(session) {
  return [
    session.title,
    session.section,
    session.javaAnalogy,
    session.diagram || "",
    ...(session.corePoints || []),
    ...(session.examTraps || []),
    ...((session.jargon || []).map((j) => `${j.term} ${j.plain}`)),
    ...((session.deepSections || []).map((d) => `${d.title} ${d.content}`)),
    ...((session.cards || []).map((c) => `${c.q} ${c.a}`)),
    ...((session.quizzes || []).map((q) => [q.qEn, q.qVi, ...(q.options || []), q.explanation].join(" ")))
  ].join("\n");
}

function stripExamLegacy(html) {
  return String(html || "").replace(/<span class="exam-legacy">[\s\S]*?<\/span>/g, "");
}

describe("Nội dung cập nhật 2026 & Vá 12 lỗ hổng kiến thức (P1)", () => {
  it("patch thật áp không có warning", () => {
    const sandbox = { window: {} };
    for (const f of ["data.js", "deep-content.js", "deep-content-2.js", "deep-content-3.js", "deep-content-4.js"]) {
      const code = fs.readFileSync(path.join(ROOT, f), "utf8");
      new Function("window", code)(sandbox.window);
    }
    const res = applyContentPatches(sandbox.window.STUDY_DATA.sessions, CONTENT_PATCHES);
    assert.deepStrictEqual(res.warnings, []);
    assert.ok(res.applied.length >= 11, `Expected >= 11 patches applied, got ${res.applied.length}`);
  });

  it("[F01..F15] không còn số liệu cũ ngoài .exam-legacy", () => {
    const STALE_FACTS = [
      { id: "F01", sessionId: 31, regex: /\b256\s*KB\b/i },
      { id: "F02-s9", sessionId: 9, regex: /gp3[^.<]{0,80}16[,.]000|16[,.]000\s*IOPS[^.<]{0,40}io1/i },
      { id: "F02-s52", sessionId: 52, regex: /Cần\s*>\s*16[,.]000\s*IOPS/i },
      { id: "F03", sessionId: 15, regex: /tối đa 1 file là 5\s*TB/i },
      { id: "F04", sessionId: 30, regex: /3 kích cỡ thiết bị chuyển dữ liệu vật lý:\s*Snowcone/i },
      { id: "F05", sessionId: 6, regex: /Miễn phí nếu đang gắn vào EC2 đang chạy/i },
      { id: "F07-s48", sessionId: 48, regex: /FIPS\s*140-2\s*Level\s*2/i },
      { id: "F07-s55", sessionId: 55, regex: /FIPS\s*140-2\s*Level\s*2/i },
      { id: "F08", sessionId: 33, regex: />=\s*60s|gom buffer tối thiểu 60 giây/i },
      { id: "F09", sessionId: 33, regex: /Kinesis chính là phiên bản Apache Kafka/i },
      { id: "F10", sessionId: 33, regex: /do 1 khóa bị gửi quá nhiều\s*→\s*Dùng\s*<em>Shard Splitting/i },
      { id: "F11", sessionId: 23, regex: /Không bao giờ bị lỗi Throttling!/i },
      { id: "F12", sessionId: 14, regex: /Mặc định 300 giây cho mọi policy/i },
      { id: "F13", sessionId: 5, regex: /ai trả giá cao hơn lấy lại máy/i },
      { id: "F14", sessionId: 9, regex: /критический/i },
      { id: "F15", sessionId: 27, regex: /7 Chính sách Điều hướng/i }
    ];

    const violations = [];
    for (const item of STALE_FACTS) {
      const s = getSession(item.sessionId);
      const cleaned = stripExamLegacy(sessionBlob(s));
      const m = cleaned.match(item.regex);
      if (m) {
        violations.push(`${item.id} (Buổi #${item.sessionId}): còn khớp "${m[0]}"`);
      }
    }
    assert.deepStrictEqual(violations, []);
  });

  it("[F01..F15] mỗi fix có badge fact-update", () => {
    // Các buổi có cập nhật số liệu/trạng thái dịch vụ:
    const factSessions = [5, 6, 9, 14, 15, 17, 21, 23, 24, 25, 27, 30, 31, 33, 42, 45, 48, 52, 55];
    for (const sid of factSessions) {
      const blob = sessionBlob(getSession(sid));
      assert.match(blob, /class="fact-update"/, `Buổi #${sid} thiếu badge class="fact-update"`);
    }
  });

  it("[G01..G12] chủ đề mới có mặt đúng buổi", () => {
    const REQUIRED_TOPICS = {
      47: [/Directory Service/, /AD Connector/, /Resource Control Polic/],
      42: [/Client VPN/, /CloudHub/, /Resolver[^.]{0,40}(Inbound|Outbound)/],
      46: [/X-Ray/, /Logs Insights/, /Metric Filter/],
      23: [/RCU[^.]{0,60}4 ?KB/, /WCU[^.]{0,60}1 ?KB/],
      19: [/MFA Delete/],
      18: [/Block Public Access/, /Object Ownership/],
      33: [/MSK|Managed Streaming for Apache Kafka/],
      45: [/SageMaker/, /Bedrock/],
      35: [/Destinations?/, /Dead[- ]Letter|DLQ/],
      36: [/Express/, /HTTP API/, /29 ?(s|giây)/],
      27: [/IP-based/],
      1: [/Shared Responsibility/, /Well-Architected/]
    };

    for (const [sidStr, regexes] of Object.entries(REQUIRED_TOPICS)) {
      const s = getSession(Number(sidStr));
      const blob = sessionBlob(s);
      for (const re of regexes) {
        assert.match(blob, re, `Buổi #${sidStr} thiếu nội dung khớp ${re}`);
      }
    }
  });

  it("[G01..G12] mỗi chủ đề có ≥ 1 flashcard trong buổi", () => {
    const CARD_TOPICS = [
      { id: "G01", sessionId: 47, regex: /Directory Service|AD Connector|Managed Microsoft AD/i },
      { id: "G02", sessionId: 42, regex: /Client VPN|CloudHub|Resolver/i },
      { id: "G03", sessionId: 46, regex: /X-Ray|Logs Insights|Metric Filter/i },
      { id: "G04", sessionId: 23, regex: /RCU.*4\s*KB|WCU.*1\s*KB/i },
      { id: "G05-s18", sessionId: 18, regex: /Block Public Access|Object Ownership/i },
      { id: "G05-s19", sessionId: 19, regex: /MFA Delete/i },
      { id: "G06", sessionId: 33, regex: /MSK|Managed Streaming for Apache Kafka/i },
      { id: "G07", sessionId: 45, regex: /SageMaker|Bedrock/i },
      { id: "G08", sessionId: 35, regex: /Destinations|Dead-Letter|DLQ|ReportBatchItemFailures/i },
      { id: "G09", sessionId: 36, regex: /Express Workflow|HTTP API|29\s*(s|giây)/i },
      { id: "G10", sessionId: 27, regex: /IP-based/i },
      { id: "G11", sessionId: 1, regex: /Shared Responsibility|Well-Architected/i },
      { id: "G12", sessionId: 47, regex: /Resource Control Polic|RCP/i }
    ];

    for (const item of CARD_TOPICS) {
      const s = getSession(item.sessionId);
      const matched = (s.cards || []).some((c) => item.regex.test(`${c.q} ${c.a}`));
      assert.ok(matched, `Chủ đề ${item.id} (Buổi #${item.sessionId}) chưa có flashcard khớp ${item.regex}`);
    }
  });

  it("tiêu đề buổi 27 ghi 8 chính sách", () => {
    const s27 = getSession(27);
    assert.match(s27.title, /8 Chính sách/);
  });

  it("số flashcard toàn khóa không giảm (≥ 263)", () => {
    const totalCards = sessions.reduce((sum, s) => sum + (s.cards ? s.cards.length : 0), 0);
    assert.ok(totalCards >= 263, `Tổng số flashcard = ${totalCards} (< 263)`);
  });
});
