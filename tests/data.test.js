/**
 * Kiểm tra tính toàn vẹn dữ liệu khóa học (data.js, deep-content*.js, labs-*.js).
 * Mục tiêu: sửa/bổ sung nội dung mà lỡ làm hỏng cấu trúc thì test báo ngay.
 */
const assert = require("assert");
const { loadData } = require("./helpers/loadApp");

const { STUDY_DATA, LAB_DATA } = loadData();
const sessions = STUDY_DATA.sessions;

function tagBalance(html, tag) {
  const open = (String(html).match(new RegExp(`<${tag}(\\s[^>]*)?>`, "gi")) || []).length;
  const close = (String(html).match(new RegExp(`</${tag}>`, "gi")) || []).length;
  return open - close;
}

describe("Dữ liệu khóa học – cấu trúc chung", () => {
  it("có đủ phases, sessions, comparisonTables, freeResources", () => {
    for (const k of ["phases", "sessions", "comparisonTables", "freeResources"]) {
      assert.ok(Array.isArray(STUDY_DATA[k]) && STUDY_DATA[k].length > 0, `thiếu ${k}`);
    }
  });

  it("id buổi học liên tục 1..N và không trùng", () => {
    sessions.forEach((s, i) => assert.strictEqual(s.id, i + 1, `buổi ở vị trí ${i} có id ${s.id}`));
  });

  it("mỗi buổi thuộc 1 chặng hợp lệ, chặng không giảm dần", () => {
    const phaseIds = new Set(STUDY_DATA.phases.map((p) => p.id));
    let prev = 0;
    for (const s of sessions) {
      assert.ok(phaseIds.has(s.phase), `Buổi #${s.id} có phase ${s.phase} không tồn tại`);
      assert.ok(s.phase >= prev, `Buổi #${s.id} làm thứ tự chặng bị đảo`);
      prev = s.phase;
    }
  });

  it("số buổi ghi trong mô tả chặng khớp với số buổi thực tế", () => {
    for (const p of STUDY_DATA.phases) {
      const m = /(\d+)\s*Buổi/i.exec(p.desc);
      if (!m) continue;
      const actual = sessions.filter((s) => s.phase === p.id).length;
      assert.strictEqual(actual, Number(m[1]), `${p.name}: mô tả ghi ${m[1]} buổi nhưng có ${actual}`);
    }
  });
});

describe("Dữ liệu khóa học – từng buổi", () => {
  const required = ["title", "section", "mode", "javaAnalogy", "corePoints", "examTraps", "cards", "freeDocUrl"];

  sessions.forEach((s) => {
    describe(`Buổi #${s.id}: ${s.title}`, () => {
      it("có đủ các trường bắt buộc", () => {
        for (const f of required) {
          const v = s[f];
          assert.ok(Array.isArray(v) ? v.length > 0 : typeof v === "string" && v.trim(), `thiếu ${f}`);
        }
      });

      it("link tài liệu dùng https", () => {
        assert.match(s.freeDocUrl, /^https:\/\//);
      });

      it("flashcard có đủ mặt trước / mặt sau", () => {
        s.cards.forEach((c, i) => {
          assert.ok(c.q && c.q.trim(), `thẻ #${i + 1} thiếu câu hỏi`);
          assert.ok(c.a && c.a.trim(), `thẻ #${i + 1} thiếu đáp án`);
        });
      });

      if (s.quizzes && s.quizzes.length) {
        it("câu hỏi quiz hợp lệ (≥ 3 lựa chọn, correctIdx nằm trong khoảng, có giải thích)", () => {
          s.quizzes.forEach((q, i) => {
            assert.ok(q.qEn && q.qVi, `câu ${i + 1} thiếu đề EN/VI`);
            assert.ok(Array.isArray(q.options) && q.options.length >= 3, `câu ${i + 1} quá ít lựa chọn`);
            assert.ok(Number.isInteger(q.correctIdx) && q.correctIdx >= 0 && q.correctIdx < q.options.length,
              `câu ${i + 1} correctIdx=${q.correctIdx} ngoài khoảng`);
            assert.strictEqual(new Set(q.options).size, q.options.length, `câu ${i + 1} có lựa chọn trùng nhau`);
            assert.ok(q.explanation && q.explanation.length > 20, `câu ${i + 1} thiếu giải thích`);
          });
        });
      }

      it("HTML trong nội dung không bị hở thẻ <strong>/<code>/<ul>/<table>", () => {
        const blobs = [
          ...s.corePoints,
          ...s.examTraps,
          ...(s.deepSections || []).map((d) => d.content),
          s.diagram || "",
          ...(s.quizzes || []).map((q) => q.explanation)
        ].join("\n");
        for (const tag of ["strong", "code", "ul", "ol", "table", "div"]) {
          assert.strictEqual(tagBalance(blobs, tag), 0, `thẻ <${tag}> không cân bằng`);
        }
      });
    });
  });
});

describe("Lab thực hành (labs-*.js)", () => {
  const theorySessions = sessions.filter((s) => s.phase < 7).map((s) => s.id);

  it("mọi buổi lý thuyết (chặng 1-6) đều có lab", () => {
    const missing = theorySessions.filter((id) => !LAB_DATA[id]);
    assert.deepStrictEqual(missing, [], `thiếu lab cho buổi: ${missing.join(", ")}`);
  });

  it("không có lab trỏ tới buổi không tồn tại", () => {
    const ids = new Set(sessions.map((s) => s.id));
    Object.keys(LAB_DATA).forEach((k) => assert.ok(ids.has(Number(k)), `lab ${k} không có buổi tương ứng`));
  });

  Object.entries(LAB_DATA).forEach(([id, lab]) => {
    it(`Lab buổi #${id} đúng schema`, () => {
      for (const f of ["title", "type", "duration", "cost", "goal", "examLink"]) {
        assert.ok(typeof lab[f] === "string" && lab[f].trim(), `thiếu ${f}`);
      }
      assert.ok(["console", "cli", "design"].includes(lab.type), `type không hợp lệ: ${lab.type}`);
      assert.ok(Array.isArray(lab.steps) && lab.steps.length >= 3 && lab.steps.length <= 10, `số bước ${lab.steps && lab.steps.length}`);
      lab.steps.forEach((st, i) => {
        assert.ok(st.title && st.detail, `bước ${i + 1} thiếu title/detail`);
        if (st.cli !== undefined) assert.strictEqual(typeof st.cli, "string");
      });
      for (const f of ["prerequisites", "verify", "cleanup"]) {
        assert.ok(Array.isArray(lab[f]) && lab[f].length > 0, `thiếu ${f}`);
      }
    });
  });

  it("lab có lệnh CLI dùng region thì phải là region hợp lệ dạng xx-xxxx-N", () => {
    Object.entries(LAB_DATA).forEach(([id, lab]) => {
      lab.steps.forEach((st) => {
        (String(st.cli || "").match(/--region\s+(\S+)/g) || []).forEach((m) => {
          const r = m.split(/\s+/)[1];
          assert.match(r, /^[a-z]{2}(-[a-z]+)+-\d$|^\$/, `Lab #${id}: region lạ "${r}"`);
        });
      });
    });
  });
});

describe("Bảng so sánh & tài nguyên", () => {
  it("mỗi hàng của bảng so sánh có đúng số cột với header", () => {
    STUDY_DATA.comparisonTables.forEach((t) => {
      t.rows.forEach((r, i) => assert.strictEqual(r.length, t.headers.length, `${t.title} – hàng ${i + 1}`));
    });
  });

  it("tài nguyên miễn phí có url https", () => {
    STUDY_DATA.freeResources.forEach((r) => assert.match(r.url, /^https:\/\//, r.title));
  });
});

describe("Nội dung hiển thị an toàn trên trình duyệt", () => {
  // Các chuỗi kiểu "<username>" hay "<tên>" sẽ bị trình duyệt hiểu là thẻ HTML lạ và NUỐT MẤT chữ.
  // Phải viết thành "&lt;username&gt;". Test này bắt lỗi đó.
  const ALLOWED = new Set("strong b i em code br ul ol li table thead tbody tr th td div span p pre h3 h4 h5 a small sup sub u hr mark kbd blockquote".split(" "));

  function unknownTags(text) {
    const found = [];
    for (const m of String(text || "").matchAll(/<\/?([^\s<>/0-9=!][^\s<>/]*)/g)) {
      if (!ALLOWED.has(m[1].toLowerCase())) found.push(String(text).substr(Math.max(0, m.index - 25), 60));
    }
    return found;
  }

  it("không có placeholder <xxx> chưa escape trong bài học", () => {
    const bad = [];
    sessions.forEach((s) => {
      const texts = [
        s.title, s.javaAnalogy, s.diagram, ...s.corePoints, ...s.examTraps,
        ...(s.jargon || []).map((j) => `${j.term} ${j.plain}`),
        ...(s.deepSections || []).map((d) => `${d.title} ${d.content}`),
        ...s.cards.map((c) => `${c.q} ${c.a}`),
        ...(s.quizzes || []).map((q) => [q.qEn, q.qVi, ...q.options, q.explanation].join(" "))
      ];
      texts.forEach((t) => unknownTags(t).forEach((x) => bad.push(`Buổi #${s.id}: …${x}…`)));
    });
    assert.deepStrictEqual(bad, []);
  });

  it("không có placeholder <xxx> chưa escape trong lab (trừ trường cli – đã được escape khi render)", () => {
    const bad = [];
    Object.entries(LAB_DATA).forEach(([id, l]) => {
      [l.title, l.goal, l.cost, l.examLink, ...l.prerequisites, ...l.verify, ...l.cleanup, ...l.steps.map((s) => `${s.title} ${s.detail}`)]
        .forEach((t) => unknownTags(t).forEach((x) => bad.push(`Lab #${id}: …${x}…`)));
    });
    assert.deepStrictEqual(bad, []);
  });
});
