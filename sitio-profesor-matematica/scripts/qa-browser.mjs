import { chromium } from "playwright";
import axe from "axe-core";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const base = (process.env.QA_BASE_URL || "http://127.0.0.1:8787").replace(/\/$/, "");
const out = process.env.QA_OUTPUT_DIR || ".qa-output";
await mkdir(out, { recursive: true });

const routes = [
  ["inicio", "/"],
  ["blog", "/blog"],
  ["herramientas", "/herramientas"],
  ["aprende", "/aprende"],
  ["laboratorio", "/laboratorio"],
  ["cursos", "/cursos/funciones-para-calculo"],
  ["sobre-mi", "/sobre-mi"],
  ["contacto", "/contacto"],
  ["leccion-conjuntos", "/aprende/matematica-preuniversitaria/aritmetica/conjuntos-1sec-unidad1"],
  ["pagina-no-existente", "/esta-ruta-no-existe-zenit-qa"],
];
const viewports = [
  { label: "movil-390", width: 390, height: 844, isMobile: true, hasTouch: true },
  { label: "tablet-768", width: 768, height: 1024, isMobile: false, hasTouch: true },
  { label: "desktop-1440", width: 1440, height: 900, isMobile: false, hasTouch: false },
  { label: "movil-320", width: 320, height: 760, isMobile: true, hasTouch: true },
  { label: "tablet-1024", width: 1024, height: 768, isMobile: false, hasTouch: true },
  { label: "desktop-1920", width: 1920, height: 1080, isMobile: false, hasTouch: false },
];
const findings = [];
const results = [];
const addFinding = (level, scope, message) => findings.push({ level, scope, message });
const browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });

async function inspectRoute(label, path, size, motion = "no-preference") {
  const key = label + "-" + size.label + (motion === "reduce" ? "-reducido" : "");
  const context = await browser.newContext({
    viewport: { width: size.width, height: size.height },
    isMobile: size.isMobile,
    hasTouch: size.hasTouch,
    deviceScaleFactor: 1,
    reducedMotion: motion,
  });
  const page = await context.newPage();
  const runtimeErrors = [];
  page.on("pageerror", error => runtimeErrors.push(error.message));
  await page.addInitScript(() => {
    window.__zenitVitals = { lcp: null, cls: 0 };
    try {
      new PerformanceObserver(list => {
        for (const e of list.getEntries()) window.__zenitVitals.lcp = Math.round(e.startTime);
      }).observe({ type: "largest-contentful-paint", buffered: true });
      new PerformanceObserver(list => {
        for (const e of list.getEntries()) if (!e.hadRecentInput) window.__zenitVitals.cls += e.value;
      }).observe({ type: "layout-shift", buffered: true });
    } catch {}
  });
  try {
    const response = await page.goto(base + path, { waitUntil: "domcontentloaded", timeout: 35000 });
    await page.waitForTimeout(650);
    const status = response?.status() ?? 0;
    const detail = await page.evaluate(() => {
      const main = document.querySelector("main");
      const images = [...document.images].filter(img => img.complete && img.naturalWidth === 0).map(img => img.currentSrc || img.src).slice(0, 8);
      const focusables = [...document.querySelectorAll('a[href],button,input,select,textarea,[tabindex="0"]')];
      const smallText = [...document.querySelectorAll("p,li,label,button,small,nav a")].filter(el => {
        const rect = el.getBoundingClientRect();
        const style = getComputedStyle(el);
        return rect.width > 0 && rect.height > 0 && Number.parseFloat(style.fontSize) < 14;
      }).slice(0, 12).map(el => ({
        text: (el.textContent || "").trim().slice(0, 55),
        size: getComputedStyle(el).fontSize
      }));
      return {
        title: document.title,
        lang: document.documentElement.lang,
        h1: document.querySelectorAll("h1").length,
        hasMain: Boolean(main),
        widthOverflow: Math.max(0, document.documentElement.scrollWidth - window.innerWidth),
        images,
        focusableCount: focusables.length,
        smallText,
        vitals: window.__zenitVitals,
      };
    });
    if (label === "pagina-no-existente") {
      if (status !== 404) addFinding("error", key, "Ruta inexistente debe responder HTTP 404; devolvió " + status);
    } else {
      if (status < 200 || status >= 400) addFinding("error", key, "HTTP " + status);
      if (!detail.hasMain) addFinding("error", key, "Falta <main>");
      if (detail.h1 !== 1) addFinding("error", key, "Se esperó un solo H1, encontrados: " + detail.h1);
      if (!detail.title) addFinding("error", key, "Falta <title>");
      if (detail.lang !== "es") addFinding("warning", key, "Idioma inesperado: " + detail.lang);
    }
    if (detail.widthOverflow > 3) addFinding("error", key, "Desbordamiento horizontal: " + detail.widthOverflow + " px");
    if (detail.images.length) addFinding("warning", key, "Imágenes rotas: " + detail.images.join(", "));
    if (detail.smallText.length) addFinding("warning", key, detail.smallText.length + " muestras de texto visibles <14 px");
    for (const message of runtimeErrors.slice(0, 5)) addFinding("error", key, "Excepción JavaScript: " + message);
    let accessibility = { serious: 0, critical: 0, moderate: 0, minor: 0 };
    let a11yViolations = [];
    if (label !== "pagina-no-existente") {
      try {
        await page.addScriptTag({ content: axe.source });
        const issues = await page.evaluate(async () => {
          const r = await window.axe.run(document, {
            runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] }
          });
          return r.violations.map(v => ({
            id: v.id, impact: v.impact, count: v.nodes.length, description: v.help,
            nodes: v.nodes.slice(0, 18).map(node => ({
              target: node.target,
              html: node.html.slice(0, 340),
              summary: (node.failureSummary || "").slice(0, 520),
            }))
          }));
        });
        a11yViolations = issues;
        for (const issue of issues) {
          accessibility[issue.impact] = (accessibility[issue.impact] || 0) + issue.count;
          addFinding(["critical", "serious"].includes(issue.impact) ? "error" : "warning", key,
            "axe " + issue.impact + ": " + issue.id + " (" + issue.count + "): " + issue.description + " | " + issue.nodes.map(n => n.target.join(" ")).join("; "));
        }
      } catch (e) {
        addFinding("warning", key, "axe no pudo ejecutarse: " + e.message);
      }
    }
    const screenshotPath = join(out, key + ".png");
    await page.screenshot({ path: screenshotPath, fullPage: ["inicio", "blog", "aprende"].includes(label), animations: "disabled" });
    results.push({ key, path, status, ...detail, runtimeErrors, accessibility, a11yViolations, screenshotPath });
    console.log(key + ": HTTP " + status + ", overflow " + detail.widthOverflow + " px, axe serious/critical " +
      accessibility.serious + "/" + accessibility.critical);
  } catch (e) {
    addFinding("error", key, "No se pudo abrir o medir la ruta: " + e.message);
    results.push({ key, path, error: e.message });
  } finally {
    await context.close();
  }
}

try {
  for (const [label, path] of routes) {
    await inspectRoute(label, path, viewports[2]);
    if (["inicio", "blog", "herramientas", "aprende", "leccion-conjuntos"].includes(label)) {
      await inspectRoute(label, path, viewports[0]);
    }
    if (["inicio", "blog", "herramientas", "aprende"].includes(label)) {
      await inspectRoute(label, path, viewports[3]);
    }
    if (label === "inicio") {
      await inspectRoute(label, path, viewports[1]);
      await inspectRoute(label, path, viewports[4]);
      await inspectRoute(label, path, viewports[5]);
      await inspectRoute(label, path, viewports[0], "reduce");
    }
  }

  // Real clicks, not just href inspection. Native links must work even without router hydration.
  const nav = [
    ["/blog", "Blog"], ["/herramientas", "Web Apps"],
    ["/aprende", "Aprende"], ["/laboratorio", "Zénit Lab"],
    ["/cursos/funciones-para-calculo", "Cursos"], ["/sobre-mi", "Sobre mí"],
  ];
  const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  for (const [target, name] of nav) {
    try {
      await desktop.goto(base, { waitUntil: "domcontentloaded" });
      const link = desktop.locator('nav.desktop-links a[href="' + target + '"]').first();
      await link.click({ timeout: 10000 });
      await desktop.waitForURL(url => url.pathname === target, { timeout: 12000 });
      console.log("Clic desktop OK: " + name);
    } catch (e) {
      addFinding("error", "navegacion-desktop", name + " no responde: " + e.message);
    }
  }
  await desktop.close();

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  try {
    await mobile.goto(base, { waitUntil: "domcontentloaded" });
    await mobile.locator(".mobile-menu summary").click();
    await mobile.locator('nav.mobile-links a[href="/blog"]').click();
    await mobile.waitForURL(url => url.pathname === "/blog", { timeout: 12000 });
    console.log("Clic menú móvil OK");
  } catch (e) {
    addFinding("error", "navegacion-movil", "Menú móvil o enlace a Blog no responde: " + e.message);
  }
  await mobile.close();

  // Protección contra regresiones de navegación, incluso si falla la hidratación.
  const noJs = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1440, height: 900 } });
  try {
    const page = await noJs.newPage();
    await page.goto(base, { waitUntil: "domcontentloaded" });
    await page.locator('nav.desktop-links a[href="/blog"]').first().click();
    await page.waitForURL(url => url.pathname === "/blog", { timeout: 12000 });
    console.log("Navegación sin JavaScript OK");
  } catch (e) {
    addFinding("error", "navegacion-sin-js", "El enlace a Blog no funciona sin JavaScript: " + e.message);
  } finally {
    await noJs.close();
  }

  // El selector cambia una simulación de verdad y comunica su estado a lectores de pantalla.
  const simulator = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  try {
    await simulator.goto(base + "/herramientas", { waitUntil: "domcontentloaded" });
    const cards = simulator.locator(".zenit-engine-selector-card");
    if (await cards.count() < 2) throw new Error("No hay dos herramientas en el selector");
    await simulator.waitForTimeout(500);
    await cards.nth(1).click();
    await simulator.waitForFunction(
      () => document.querySelectorAll(".zenit-engine-selector-card")[1]?.getAttribute("aria-pressed") === "true",
      undefined,
      { timeout: 10000 }
    );
    if (await cards.first().getAttribute("aria-pressed") !== "false") {
      throw new Error("La herramienta anterior no se deseleccionó");
    }
    console.log("Selector interactivo de Web Apps OK");
  } catch (e) {
    addFinding("error", "web-apps-interaccion", "El selector interactivo falló: " + e.message);
  } finally {
    await simulator.close();
  }

  // Prueba del enlace de salto que permite llegar al contenido con teclado.
  const keyboard = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  try {
    await keyboard.goto(base, { waitUntil: "domcontentloaded" });
    await keyboard.keyboard.press("Tab");
    const first = await keyboard.evaluate(() => document.activeElement?.className || "");
    if (!String(first).includes("zenit-skip-link")) {
      addFinding("warning", "teclado", "El primer foco no es el enlace para saltar al contenido");
    } else {
      await keyboard.keyboard.press("Enter");
      await keyboard.waitForURL(url => url.hash === "#zenit-main", { timeout: 5000 });
      console.log("Acceso directo por teclado OK");
    }
  } catch (e) {
    addFinding("error", "teclado", "No se puede saltar al contenido con teclado: " + e.message);
  } finally {
    await keyboard.close();
  }

  const blog = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  try {
    await blog.goto(base + "/blog", { waitUntil: "domcontentloaded" });
    const search = blog.locator('input[type="search"]').first();
    await search.fill("conjuntos", { timeout: 10000 });
    await blog.waitForTimeout(700);
    const summary = await blog.locator('[role="status"]').first().innerText({ timeout: 6000 });
    if (!/lecciones encontradas|resultados/i.test(summary)) {
      addFinding("warning", "blog-busqueda", "No se pudo verificar el contador después de buscar");
    }
    console.log("Búsqueda blog: " + summary.slice(0, 120));
  } catch (e) {
    addFinding("error", "blog-busqueda", "La búsqueda interactiva no responde: " + e.message);
  }
  await blog.close();
} finally {
  await browser.close();
}

const errors = findings.filter(x => x.level === "error");
const warnings = findings.filter(x => x.level === "warning");
const lines = [
  "# Auditoría real de Zénit — Chromium + axe",
  "",
  "Origen: " + base,
  "Fecha UTC: " + new Date().toISOString(),
  "Páginas/vistas inspeccionadas: " + results.length,
  "Errores: " + errors.length + "; advertencias: " + warnings.length,
  "",
  "## Resultados por ruta",
  "",
  "| Vista | HTTP | Overflow (px) | LCP observado (ms) | CLS observado | Axe grave/crítico |",
  "| --- | ---: | ---: | ---: | ---: | --- |",
  ...results.map(r => "| " + r.key + " | " + (r.status ?? "ERROR") + " | " +
    (r.widthOverflow ?? "—") + " | " + (r.vitals?.lcp ?? "—") + " | " +
    (r.vitals?.cls?.toFixed(3) ?? "—") + " | " +
    ((r.accessibility?.serious ?? 0) + "/" + (r.accessibility?.critical ?? 0)) + " |"),
  "",
  "## Hallazgos",
  "",
  ...(findings.length ? findings.map(x => "- **" + x.level.toUpperCase() + "** " + x.scope + ": " + x.message) :
    ["- Sin errores ni advertencias en las pruebas ejecutadas."]),
  "",
  "Los tiempos LCP y CLS son observaciones locales; no equivalen a métricas reales de usuarios ni a Lighthouse móvil.",
  "Cobertura: rutas representativas y navegaciones principales; no todas las lecciones ni todos los simuladores.",
];
await writeFile(join(out, "report.md"), lines.join("\n"));
await writeFile(join(out, "results.json"), JSON.stringify({ base, timestamp: new Date().toISOString(), results, findings }, null, 2));
console.log("Informe: " + join(out, "report.md") + ". Errores: " + errors.length + "; advertencias: " + warnings.length);
console.log("=== HALLAZGOS DE AUDITORÍA ===");
for (const item of findings) console.log("[" + item.level.toUpperCase() + "] " + item.scope + ": " + item.message);
console.log("=== FIN DE HALLAZGOS ===");
if (errors.length) process.exitCode = 1;
