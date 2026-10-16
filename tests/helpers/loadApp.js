/**
 * Test harness: nạp index.html + toàn bộ script của web vào jsdom,
 * giả lập Cloud Sync API (fetch) để test mà không cần mạng.
 */
const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");

const ROOT = path.resolve(__dirname, "..", "..");
const STORAGE_KEY = "aws_saa_c03_progress_v1";

function readScriptList() {
  const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
  return [...html.matchAll(/<script src="([^"]+)"><\/script>/g)].map((m) => m[1]);
}

/** Chỉ nạp dữ liệu (không có DOM / app.js) – dùng cho test dữ liệu khóa học. */
function loadData() {
  const sandbox = { window: {} };
  const files = readScriptList().filter((f) => f !== "app.js");
  for (const f of files) {
    const code = fs.readFileSync(path.join(ROOT, f), "utf8");
    new Function("window", code)(sandbox.window);
  }
  return { STUDY_DATA: sandbox.window.STUDY_DATA, LAB_DATA: sandbox.window.LAB_DATA || {}, files };
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * Khởi tạo web trong jsdom.
 * @param {object} opts
 * @param {object|null} opts.cloud      Dữ liệu đang có trên Cloud (null = Cloud trống)
 * @param {object|null} opts.local      Dữ liệu sẵn có trong localStorage
 * @param {boolean}     opts.offline    Giả lập mất mạng (fetch throw)
 */
async function loadApp(opts = {}) {
  const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
  const dom = new JSDOM(html, { url: "https://hub.test/", runScripts: "outside-only", pretendToBeVisual: true });
  const w = dom.window;

  const net = { cloud: opts.cloud === undefined ? null : opts.cloud, puts: [], gets: 0, offline: !!opts.offline };
  w.fetch = async (url, init = {}) => {
    if (net.offline) throw new Error("offline");
    if (init.method === "PUT") {
      const body = JSON.parse(init.body);
      net.puts.push(body.data);
      net.cloud = body.data;
      return { ok: true, json: async () => ({}) };
    }
    net.gets++;
    return { ok: true, json: async () => ({ data: net.cloud ? JSON.parse(JSON.stringify(net.cloud)) : null }) };
  };
  const clipboard = { last: null, writeText: async (t) => { clipboard.last = t; } };
  Object.defineProperty(w.navigator, "clipboard", { value: clipboard, configurable: true });
  w.scrollTo = () => {};
  w.console.warn = () => {}; // "Cloud pull skipped" khi giả lập offline là hành vi mong đợi
  w.HTMLElement.prototype.scrollIntoView = function () {};
  w.URL.createObjectURL = () => "blob:test";

  if (opts.local) w.localStorage.setItem(STORAGE_KEY, JSON.stringify(opts.local));
  w.__AWS_HUB_TEST__ = true;

  const loadedEvt = new Promise((resolve) => w.document.addEventListener("DOMContentLoaded", resolve, { once: true }));
  const wasLoading = w.document.readyState === "loading";
  for (const f of readScriptList()) {
    w.eval(fs.readFileSync(path.join(ROOT, f), "utf8"));
  }
  if (wasLoading) await loadedEvt;
  else w.document.dispatchEvent(new w.Event("DOMContentLoaded"));
  await sleep(30); // chờ pull Cloud lần đầu

  const $ = (sel) => w.document.querySelector(sel);
  const $$ = (sel) => [...w.document.querySelectorAll(sel)];

  return {
    window: w,
    net,
    clipboard,
    $,
    $$,
    sleep,
    app: w.__AWS_HUB_INTERNALS__,
    /** Giả lập người dùng chuyển sang tab trình duyệt khác rồi quay lại */
    async switchBrowserTabAndBack() {
      w.dispatchEvent(new w.Event("focus"));
      w.document.dispatchEvent(new w.Event("visibilitychange"));
      await sleep(30);
    },
    async goToSession(id) {
      const sel = w.document.getElementById("session-quick-select");
      sel.value = String(id);
      sel.dispatchEvent(new w.Event("change"));
      await sleep(10);
    },
    clickTab(tab) {
      $$(".nav-tab").find((b) => b.getAttribute("data-tab") === tab).click();
    },
    localSaved() {
      return JSON.parse(w.localStorage.getItem(STORAGE_KEY) || "null");
    },
    close() {
      w.close();
    }
  };
}

module.exports = { loadApp, loadData, sleep, ROOT, STORAGE_KEY };
