// content-patcher.js — Pure helper to append 2026 content updates & gap-fill topics without mutating existing card/quiz indices.
(function (root) {
  "use strict";

  const KNOWN_KEYS = new Set([
    "patchId",
    "retitle",
    "appendCorePoints",
    "appendExamTraps",
    "appendJargon",
    "appendDeepSections",
    "appendCards"
  ]);

  function isNonEmptyString(val) {
    return typeof val === "string" && val.trim().length > 0;
  }

  /**
   * Kiểm tra schema một patch; trả về danh sách lỗi (rỗng = hợp lệ).
   * @param {number} sessionId
   * @param {object} patch
   * @returns {string[]}
   */
  function validatePatch(sessionId, patch) {
    const errors = [];
    const sid = Number(sessionId);
    if (!Number.isInteger(sid) || sid <= 0) {
      errors.push(`Invalid sessionId: ${sessionId}`);
    }
    if (!patch || typeof patch !== "object" || Array.isArray(patch)) {
      errors.push(`Session #${sessionId}: patch must be a plain object`);
      return errors;
    }

    for (const key of Object.keys(patch)) {
      if (!KNOWN_KEYS.has(key)) {
        errors.push(`Session #${sessionId}: unknown patch key "${key}"`);
      }
    }

    if (patch.patchId !== undefined && !isNonEmptyString(patch.patchId)) {
      errors.push(`Session #${sessionId}: patchId must be a non-empty string`);
    }

    if (patch.retitle !== undefined && !isNonEmptyString(patch.retitle)) {
      errors.push(`Session #${sessionId}: retitle must be a non-empty string`);
    }

    if (patch.appendCorePoints !== undefined) {
      if (!Array.isArray(patch.appendCorePoints)) {
        errors.push(`Session #${sessionId}: appendCorePoints must be an array`);
      } else {
        patch.appendCorePoints.forEach((pt, idx) => {
          if (!isNonEmptyString(pt)) {
            errors.push(`Session #${sessionId}: appendCorePoints[${idx}] must be a non-empty string`);
          }
        });
      }
    }

    if (patch.appendExamTraps !== undefined) {
      if (!Array.isArray(patch.appendExamTraps)) {
        errors.push(`Session #${sessionId}: appendExamTraps must be an array`);
      } else {
        patch.appendExamTraps.forEach((tr, idx) => {
          if (!isNonEmptyString(tr)) {
            errors.push(`Session #${sessionId}: appendExamTraps[${idx}] must be a non-empty string`);
          }
        });
      }
    }

    if (patch.appendJargon !== undefined) {
      if (!Array.isArray(patch.appendJargon)) {
        errors.push(`Session #${sessionId}: appendJargon must be an array`);
      } else {
        patch.appendJargon.forEach((item, idx) => {
          if (!item || typeof item !== "object" || !isNonEmptyString(item.term) || !isNonEmptyString(item.plain)) {
            errors.push(`Session #${sessionId}: appendJargon[${idx}] must have non-empty term and plain`);
          }
        });
      }
    }

    if (patch.appendDeepSections !== undefined) {
      if (!Array.isArray(patch.appendDeepSections)) {
        errors.push(`Session #${sessionId}: appendDeepSections must be an array`);
      } else {
        patch.appendDeepSections.forEach((item, idx) => {
          if (!item || typeof item !== "object" || !isNonEmptyString(item.title) || !isNonEmptyString(item.content)) {
            errors.push(`Session #${sessionId}: appendDeepSections[${idx}] must have non-empty title and content`);
          }
        });
      }
    }

    if (patch.appendCards !== undefined) {
      if (!Array.isArray(patch.appendCards)) {
        errors.push(`Session #${sessionId}: appendCards must be an array`);
      } else {
        patch.appendCards.forEach((item, idx) => {
          if (!item || typeof item !== "object" || !isNonEmptyString(item.q) || !isNonEmptyString(item.a)) {
            errors.push(`Session #${sessionId}: appendCards[${idx}] must have non-empty q and a`);
          }
        });
      }
    }

    return errors;
  }

  /**
   * Áp patch lên mảng sessions (mutate tại chỗ). CHỈ append, không xóa, không chèn giữa.
   * @param {Array<object>} sessions
   * @param {Record<number, object|object[]>} patches
   * @returns {{applied: string[], skipped: string[], warnings: string[]}}
   */
  function applyContentPatches(sessions, patches) {
    const applied = [];
    const skipped = [];
    const warnings = [];

    if (!Array.isArray(sessions) || !patches || typeof patches !== "object") {
      warnings.push("Invalid sessions array or patches map");
      return { applied, skipped, warnings };
    }

    for (const [rawId, entry] of Object.entries(patches)) {
      const sid = Number(rawId);
      const session = sessions.find((s) => s && Number(s.id) === sid);
      if (!session) {
        warnings.push(`Session #${rawId} not found`);
        continue;
      }

      const list = Array.isArray(entry) ? entry : [entry];
      for (const patch of list) {
        const errs = validatePatch(sid, patch);
        if (errs.length > 0) {
          warnings.push(...errs);
          continue;
        }

        if (!Array.isArray(session._appliedPatches)) {
          session._appliedPatches = [];
        }

        if (patch.patchId && session._appliedPatches.includes(patch.patchId)) {
          skipped.push(patch.patchId);
          continue;
        }

        if (isNonEmptyString(patch.retitle)) {
          session.title = patch.retitle;
        }

        if (Array.isArray(patch.appendCorePoints)) {
          if (!Array.isArray(session.corePoints)) session.corePoints = [];
          for (const pt of patch.appendCorePoints) {
            if (!session.corePoints.includes(pt)) {
              session.corePoints.push(pt);
            }
          }
        }

        if (Array.isArray(patch.appendExamTraps)) {
          if (!Array.isArray(session.examTraps)) session.examTraps = [];
          for (const tr of patch.appendExamTraps) {
            if (!session.examTraps.includes(tr)) {
              session.examTraps.push(tr);
            }
          }
        }

        if (Array.isArray(patch.appendJargon)) {
          if (!Array.isArray(session.jargon)) session.jargon = [];
          for (const item of patch.appendJargon) {
            if (!session.jargon.some((j) => j && j.term === item.term)) {
              session.jargon.push({ term: item.term, plain: item.plain });
            }
          }
        }

        if (Array.isArray(patch.appendDeepSections)) {
          if (!Array.isArray(session.deepSections)) session.deepSections = [];
          for (const item of patch.appendDeepSections) {
            if (!session.deepSections.some((d) => d && d.title === item.title)) {
              session.deepSections.push({ title: item.title, content: item.content });
            }
          }
        }

        if (Array.isArray(patch.appendCards)) {
          if (!Array.isArray(session.cards)) session.cards = [];
          for (const item of patch.appendCards) {
            if (!session.cards.some((c) => c && c.q === item.q)) {
              session.cards.push({ q: item.q, a: item.a });
            }
          }
        }

        const tag = patch.patchId || `session-${sid}`;
        if (patch.patchId) {
          session._appliedPatches.push(patch.patchId);
        }
        applied.push(tag);
      }
    }

    return { applied, skipped, warnings };
  }

  const api = { applyContentPatches, validatePatch };
  if (root) {
    root.ContentPatcher = api;
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }
})(typeof window !== "undefined" ? window : globalThis);
