/**
 * Auditoría visual exhaustiva y segmentada de todas las rutas del catálogo.
 * Cada shard visita su grupo en móvil y escritorio con un Worker LOCAL:
 * no publica lecciones programadas y no depende del límite de Cloudflare Browser Rendering.
 */
import { chromium } from "playwright";
import axe from "axe-core";
import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { resolve, join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const index = JSON.parse(readFileSync(join(projectRoot, "content/catalog/lessons-index.json"), "utf8"));
const shard = Number(process.env.CATALOG_AUDIT_SHARD ?? 0);
const shards = Number(process.env.CATALOG_AUDIT_SHARDS ?? 6);
if (!Number.isInteger(shard) || !Number.isInteger(shards) || shard < 0 || shards < 1 || shard >= shards) {
  throw Error("Shard inválido: " + shard + " / " + shards);
}
const source = (process.env.QA_BASE_URL || "http://127.0.0.1:8787").replace(/\/$/, "");
const out = resolve(projectRoot, process.env.CATALOG_BROWSER_DIR || (".catalog-browser-shard-" + shard));
mkdirSync(out, { recursive: true });
const selected = index.filter((_, i) => i % shards === shard);
const errors = [];
const byCourseScreenshot = new Set();
const records = [];
const viewports = [
  { id: "movil-390", width: 390, height: 844, isMobile: true, hasTouch: true },
  { id: "escritorio-1440", width: 1440, height: 900, isMobile: false, hasTouch: false },
  { id: "movil-320", width: 320, height: 760, isMobile: true, hasTouch: true }
];
const browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
const pageContexts = new Map();
const MAX_CAPTURED_ISSUES = 35;
let completed = 0;
let publishCount = 0;
const startedAt = Date.now();
const totalViews = selected.reduce((n, l) => n + (l.publishStatus === "published" ? 3 : 2), 0);

function note(lesson, view, severity, code, message) {
  const problem = { slug: lesson.slug, state: lesson.publishStatus, area: lesson.area,
    course: lesson.course, viewport: view.id, severity, code, message };
  errors.push(problem);
  return problem;
}
const urlFor = l => source + "/aprende/" + l.area + "/" + l.course + "/" + l.slug;
const clip = str => String(str || "").slice(0, 240);

async function getPage(view) {
  if (pageContexts.has(view.id)) return pageContexts.get(view.id);
  const context = await browser.newContext({
    viewport: { width: view.width, height: view.height },
    isMobile: view.isMobile, hasTouch: view.hasTouch,
    deviceScaleFactor: 1, reducedMotion: "reduce"
  });
  const page = await context.newPage();
  page.setDefaultTimeout(12000);
  pageContexts.set(view.id, { page, context });
  return { page, context };
}

async function inspect(lesson, view) {
  const { page } = await getPage(view);
  const result = {
    viewport: view.id, status: null, title: "", h1: 0, hasMain: false,
    documentOverflow: 0, formulaTotal: 0, formulaOverflow: 0,
    weakFormulaContrast: 0, brokenImages: 0, tinyText: 0,
    axeSerious: 0, axeModerate: 0, javascriptErrors: [], ms: null,
    findings: []
  };
  const scriptErrors = [];
  const onError = e => { if (scriptErrors.length < 5) scriptErrors.push(clip(e.message)); };
  page.on("pageerror", onError);
  try {
    const time = Date.now();
    const response = await page.goto(urlFor(lesson), { waitUntil: "domcontentloaded", timeout: 35000 });
    result.ms = Date.now() - time;
    result.status = response?.status() || 0;
    if (lesson.publishStatus === "published" && result.status !== 200) {
      result.findings.push(note(lesson, view, "error", "HTTP_PUBLISHED", "HTTP " + result.status));
    }
    if (lesson.publishStatus === "scheduled" && ![200, 404].includes(result.status)) {
      result.findings.push(note(lesson, view, "error", "HTTP_SCHEDULED", "HTTP " + result.status));
    }
    if (result.status === 404 && lesson.publishStatus === "scheduled") {
      // Si se ocultan borradores detrás de 404, no constituye un fallo.
      return result;
    }
    await page.waitForTimeout(lesson.publishStatus === "published" ? 280 : 100);
    const data = await page.evaluate(() => {
      const color = css => {
        const c = document.createElement("canvas");
        c.width = c.height = 1;
        const g = c.getContext("2d");
        if (!g) return null;
        g.fillStyle = css;
        g.fillRect(0, 0, 1, 1);
        return [...g.getImageData(0, 0, 1, 1).data].slice(0, 3);
      };
      const lum = rgb => {
        if (!rgb) return null;
        const v = rgb.map(n => {
          const a = n / 255;
          return a <= .04045 ? a / 12.92 : ((a + .055) / 1.055) ** 2.4;
        });
        return .2126 * v[0] + .7152 * v[1] + .0722 * v[2];
      };
      const boxes = [...document.querySelectorAll(".math-typeset-display.math-scroll-region")].map((el, i) => {
        let ancestor = el.parentElement;
        let bg = null;
        while (ancestor) {
          const css = getComputedStyle(ancestor).backgroundColor;
          const c = color(css);
          if (css !== "transparent" && css !== "rgba(0, 0, 0, 0)" &&
              !css.endsWith(" / 0)") && c) { bg = c; break; }
          ancestor = ancestor.parentElement;
        }
        const f = lum(color(getComputedStyle(el.querySelector(".katex") || el).color));
        const b = lum(bg || [255, 255, 255]);
        const contrast = f === null || b === null ? null :
          +((Math.max(f, b) + .05) / (Math.min(f, b) + .05)).toFixed(2);
        return {
          index: i, extra: el.scrollWidth - el.clientWidth, contrast,
          width: el.clientWidth, height: Math.round(el.getBoundingClientRect().height)
        };
      });
      const images = [...document.images].filter(i => i.complete && !i.naturalWidth);
      const small = [...document.querySelectorAll("main :is(p,li,small,button,label,summary)")].filter(el => {
        const r = el.getBoundingClientRect();
        return r.width > 0 && r.height > 0 &&
          Number.parseFloat(getComputedStyle(el).fontSize) < 14;
      });
      return {
        title: document.title, h1: document.querySelectorAll("main h1").length,
        hasMain: Boolean(document.querySelector("main")),
        documentOverflow: Math.max(0, document.documentElement.scrollWidth - innerWidth),
        formulas: boxes, brokenImages: images.length, tinyText: small.length
      };
    });
    result.title = data.title;
    result.h1 = data.h1;
    result.hasMain = data.hasMain;
    result.documentOverflow = data.documentOverflow;
    result.formulaTotal = data.formulas.length;
    const overflowing = data.formulas.filter(f => f.extra > 12);
    const lowContrast = data.formulas.filter(f => f.contrast !== null && f.contrast < 4.5);
    result.formulaOverflow = overflowing.length;
    result.weakFormulaContrast = lowContrast.length;
    result.brokenImages = data.brokenImages;
    result.tinyText = data.tinyText;
    if (!data.hasMain || data.h1 !== 1) {
      result.findings.push(note(lesson, view, "error", "SEMANTICS", "main=" + data.hasMain + ", h1=" + data.h1));
    }
    if (data.documentOverflow > 4) {
      result.findings.push(note(lesson, view, "error", "DOCUMENT_OVERFLOW", data.documentOverflow + "px"));
    }
    if (data.brokenImages) {
      result.findings.push(note(lesson, view, "warning", "BROKEN_IMAGES", data.brokenImages + " imágenes"));
    }
    if (overflowing.length) {
      result.findings.push(note(lesson, view, "warning", "FORMULA_SCROLL",
        overflowing.length + "/" + data.formulas.length + ", excedentes " +
        overflowing.slice(0, 5).map(x => "#" + x.index + ":" + x.extra + "px").join(", ")));
    }
    if (lowContrast.length) {
      result.findings.push(note(lesson, view, "error", "FORMULA_CONTRAST",
        lowContrast.length + "/" + data.formulas.length + ", contraste " +
        lowContrast.slice(0, 5).map(x => "#" + x.index + ":" + x.contrast + ":1").join(", ")));
    }
    if (data.tinyText) {
      result.findings.push(note(lesson, view, "warning", "SMALL_TEXT", data.tinyText + " textos de <14px"));
    }
    if (lesson.publishStatus === "published" && view.id === "movil-390") {
      try {
        await page.addScriptTag({ content: axe.source });
        const axeResult = await page.evaluate(async () => {
          const r = await window.axe.run(document,
            { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] } });
          return r.violations.map(v => ({
            id: v.id, impact: v.impact, nodes: v.nodes.length,
            targets: v.nodes.slice(0, 3).map(n => n.target.join(" "))
          }));
        });
        for (const item of axeResult) {
          const serious = ["serious", "critical"].includes(item.impact);
          if (serious) result.axeSerious += item.nodes;
          else result.axeModerate += item.nodes;
          result.findings.push(note(lesson, view, serious ? "error" : "warning",
            "AXE_" + item.id, item.impact + " " + item.nodes + " " + item.targets.join("; ")));
        }
      } catch (e) {
        result.findings.push(note(lesson, view, "warning", "AXE_UNAVAILABLE", clip(e.message)));
      }
    }
    const course = lesson.area + "-" + lesson.course;
    const shouldCapture = result.findings.some(f => f.severity === "error") ||
      (lesson.publishStatus === "published" && view.id === "movil-390") ||
      (!byCourseScreenshot.has(course + "-" + view.id));
    if (shouldCapture) {
      byCourseScreenshot.add(course + "-" + view.id);
      const safeSlug = lesson.slug.replace(/[^a-z0-9-_]/gi, "").slice(0, 80);
      try {
        await page.screenshot({ path: join(out, "screen-" + safeSlug + "-" + view.id + ".png"),
          animations: "disabled", fullPage: false, timeout: 9000 });
      } catch (e) {
        result.findings.push(note(lesson, view, "warning", "SCREENSHOT_UNAVAILABLE", clip(e.message)));
      }
    }
  } catch (e) {
    result.findings.push(note(lesson, view, "error", "NAVIGATION_EXCEPTION", clip(e.message)));
  } finally {
    result.javascriptErrors = scriptErrors;
    for (const message of scriptErrors) result.findings.push(note(lesson, view, "error", "PAGE_ERROR", message));
    page.off("pageerror", onError);
  }
  return result;
}

try {
  for (const lesson of selected) {
    const views = lesson.publishStatus === "published" ? viewports : viewports.slice(0, 2);
    const findings = [];
    const checks = [];
    for (const view of views) {
      const measure = await inspect(lesson, view);
      checks.push(measure);
      findings.push(...measure.findings);
    }
    const severity = findings.some(f => f.severity === "error") ? "error" :
      findings.some(f => f.severity === "warning") ? "review" : "ok";
    records.push({
      slug: lesson.slug, title: lesson.title, area: lesson.area,
      course: lesson.course, state: lesson.publishStatus,
      route: "/aprende/" + lesson.area + "/" + lesson.course + "/" + lesson.slug,
      severity, checks
    });
    if (lesson.publishStatus === "published") publishCount++;
    completed++;
    if (completed % 10 === 0 || completed === selected.length) {
      console.log("SHARD " + shard + "/" + shards + ": " + completed + "/" + selected.length +
        " lecciones; " + errors.filter(e => e.severity === "error").length +
        " errores; " + errors.filter(e => e.severity === "warning").length + " advertencias");
    }
  }
} finally {
  for (const { context } of pageContexts.values()) await context.close();
  await browser.close();
}
const output = {
  shard, shards, source, startedAt: new Date(startedAt).toISOString(),
  finishedAt: new Date().toISOString(), selected: selected.length,
  published: publishCount, scheduled: selected.length - publishCount,
  views: totalViews, finished: completed, lessons: records, findings: errors
};
writeFileSync(join(out, "browser-shard-" + shard + ".json"), JSON.stringify(output, null, 2));
const toMd = [
  "# Auditoría visual por lección — shard " + (shard + 1) + "/" + shards,
  "", "Origen de prueba: Worker compilado local; sin alterar la publicación.",
  "Lecciones: " + completed + "; vistas: " + totalViews + "; publicadas: " +
    publishCount + "; programadas: " + (completed - publishCount),
  "", "| Lección | Estado | Resultado | Fórmulas en móvil |",
  "|---|---|---|---|",
  ...records.map(r => "| " + r.slug + " | " + r.state + " | " + r.severity +
    " | " + (r.checks.find(c => c.viewport === "movil-390")?.formulaOverflow ?? "—") + " con scroll |"),
  "", "## Hallazgos principales",
  "",
  ...errors.slice(0, 250).map(e => "- **" + e.severity + "** " + e.slug +
    " (" + e.viewport + ") " + e.code + ": " + e.message),
  "", "Ver browser-shard-" + shard + ".json para todos los resultados y selectores."
];
writeFileSync(join(out, "resumen-shard-" + shard + ".md"), toMd.join("\n"));
console.log(JSON.stringify({
  shard, completed, views: totalViews, published: publishCount,
  errors: errors.filter(x => x.severity === "error").length,
  warnings: errors.filter(x => x.severity === "warning").length,
  elapsedSec: Math.round((Date.now() - startedAt) / 1000)
}));
// Los defectos visuales quedan registrados; se usan como cola de correcciones,
// pero no impiden que los demás shards generen sus diagnósticos.
if (completed !== selected.length) process.exitCode = 1;
