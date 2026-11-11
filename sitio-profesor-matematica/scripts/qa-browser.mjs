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
  ["lab-transformaciones", "/laboratorio/transformaciones-de-funciones"],
  ["lab-representaciones", "/laboratorio/representaciones-de-funciones"],
  ["cursos", "/cursos/funciones-para-calculo"],
  ["sobre-mi", "/sobre-mi"],
  ["contacto", "/contacto"],
  ["leccion-conjuntos", "/aprende/matematica-preuniversitaria/aritmetica/conjuntos-1sec-unidad1"],
  ["calculo-gradiente", "/aprende/matematica-universitaria/calculo-3/derivadas-parciales-gradiente-y-plano-tangente"],
  ["calculo-derivacion", "/aprende/matematica-universitaria/calculo-1/derivacion-implicita-y-orden-superior"],
  ["algebra-lineal", "/aprende/matematica-universitaria/algebra-lineal/producto-interno-y-gram-schmidt"],
  ["fisica-electromagnetismo", "/aprende/ciencias/fisica/electrodinamica-y-electromagnetismo"],
  ["quimica-soluciones", "/aprende/ciencias/quimica/soluciones-quimicas-molaridad-y-normalidad"],
  ["pagina-no-existente", "/esta-ruta-no-existe-zenit-qa"],
];
const viewports = [
  { label: "movil-390", width: 390, height: 844, isMobile: true, hasTouch: true },
  { label: "tablet-768", width: 768, height: 1024, isMobile: false, hasTouch: true },
  { label: "desktop-1440", width: 1440, height: 900, isMobile: false, hasTouch: false },
  { label: "movil-320", width: 320, height: 760, isMobile: true, hasTouch: true },
  { label: "tablet-1024", width: 1024, height: 768, isMobile: false, hasTouch: true },
  { label: "desktop-1920", width: 1920, height: 1080, isMobile: false, hasTouch: false },
  { label: "movil-375", width: 375, height: 812, isMobile: true, hasTouch: true },
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
      // Impeccable: señalar el elemento real que provoca el desbordamiento,
      // no limitarse al ancho total del documento.
      const horizontalOffenders = [...document.querySelectorAll("main *")]
        .filter(el => {
          if (el.closest(".katex,.katex-mathml,svg,[aria-hidden='true']")) return false;
          const rect = el.getBoundingClientRect();
          const style = getComputedStyle(el);
          return rect.width > 0 && rect.height > 0 &&
            rect.right > innerWidth + 6 && rect.left < innerWidth &&
            style.position !== "fixed" && style.visibility !== "hidden";
        }).slice(0, 10).map(el => {
          const rect = el.getBoundingClientRect();
          return {
            tag: el.tagName.toLowerCase(),
            className: typeof el.className === "string" ? el.className.slice(0, 95) : "",
            right: Math.round(rect.right),
            width: Math.round(rect.width),
            text: (el.textContent || "").trim().slice(0, 60)
          };
        });
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
      // axe no siempre evalúa el dibujo HTML de KaTeX (tiene una capa
      // MathML separada). Comprobar también el contraste visual del resultado.
      const colorToRgb = cssColor => {
        const canvas = document.createElement("canvas");
        canvas.width = canvas.height = 1;
        const ctx = canvas.getContext("2d");
        if (!ctx) return null;
        ctx.clearRect(0, 0, 1, 1);
        ctx.fillStyle = cssColor;
        ctx.fillRect(0, 0, 1, 1);
        return Array.from(ctx.getImageData(0, 0, 1, 1).data).slice(0, 3);
      };
      const luminance = rgb => {
        const linear = rgb.map(v => {
          const c = v / 255;
          return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
        });
        return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
      };
      const formulaBoxes = [...document.querySelectorAll(".math-typeset-display.math-scroll-region")].map((el, i) => {
        let ancestor = el.parentElement;
        let bgCss = "";
        while (ancestor) {
          const value = getComputedStyle(ancestor).backgroundColor;
          if (value && value !== "transparent" && !/\/\s*0\)/.test(value) &&
              value !== "rgba(0, 0, 0, 0)") { bgCss = value; break; }
          ancestor = ancestor.parentElement;
        }
        const fg = colorToRgb(getComputedStyle(el.querySelector(".katex") || el).color);
        const bg = colorToRgb(bgCss || "rgb(255,255,255)");
        const fgLum = fg ? luminance(fg) : null;
        const bgLum = bg ? luminance(bg) : null;
        const contrast = fgLum == null || bgLum == null ? null :
          Math.round(((Math.max(fgLum, bgLum) + 0.05) /
            (Math.min(fgLum, bgLum) + 0.05)) * 100) / 100;
        return {
          index: i,
          available: el.clientWidth,
          content: el.scrollWidth,
          extra: Math.max(0, el.scrollWidth - el.clientWidth),
          height: Math.round(el.getBoundingClientRect().height),
          contrast,
        };
      });
      return {
        formulaBoxes,
        title: document.title,
        lang: document.documentElement.lang,
        h1: document.querySelectorAll("h1").length,
        hasMain: Boolean(main),
        widthOverflow: Math.max(0, document.documentElement.scrollWidth - window.innerWidth),
        horizontalOffenders,
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
    // Comprobar en navegador que los pilotos Equation.io tengan enlaces
    // correctos a la función seleccionada sin exigir conexión a terceros.
    if (["lab-transformaciones", "lab-representaciones"].includes(label)) {
      const graphUrl = await page.locator('a[href^="https://equation.io/#"]').first().getAttribute("href").catch(() => null);
      if (!graphUrl) {
        addFinding("error", key, "Falta el enlace a la gráfica avanzada Equation.io");
      } else {
        const payload = graphUrl.split("#")[1] || "";
        if (!payload || !decodeURIComponent(payload).startsWith("y=")) {
          addFinding("error", key, "El enlace a Equation.io no contiene una ecuación y= válida");
        }
      }
    }
    if (detail.widthOverflow > 3) addFinding("error", key, "Desbordamiento horizontal: " + detail.widthOverflow + " px; posibles causantes: " + detail.horizontalOffenders.slice(0, 4).map(el => el.tag + "." + el.className + " (+" + (el.right - size.width) + "px)").join(", "));
    if (detail.images.length) addFinding("warning", key, "Imágenes rotas: " + detail.images.join(", "));
    if (detail.smallText.length) addFinding("warning", key, detail.smallText.length + " muestras de texto visibles <14 px");
    const formulaOverflow = detail.formulaBoxes.filter(f => f.extra > 12);
    if (["herramientas", "leccion-conjuntos", "calculo-gradiente", "calculo-derivacion",
         "algebra-lineal", "fisica-electromagnetismo", "quimica-soluciones"].includes(label)) {
      const formulaDark = detail.formulaBoxes.filter(f => f.contrast !== null && f.contrast < 4.5);
      if (formulaDark.length) {
        addFinding("error", key,
          "Fórmulas con poco contraste visual: " + formulaDark.length + "/" +
          detail.formulaBoxes.length + " (" +
          formulaDark.slice(0, 8).map(f => "#" + f.index + " " + f.contrast + ":1").join(", ") + ")");
      }
    }
    if (formulaOverflow.length) {
      const measure = formulaOverflow.slice(0, 8).map(f => "#" + f.index + ": " + f.extra + "px").join(", ");
      addFinding(["herramientas", "leccion-conjuntos"].includes(label) && size.width >= 390
        ? "error" : "warning", key,
        "Fórmulas que aún necesitan scroll horizontal: " + formulaOverflow.length + "/" +
        detail.formulaBoxes.length + " (" + measure + ")");
    }
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
    if (label === "inicio") {
      // Comprueba la ilustración en su ubicación real, no solamente la cabecera
      // inicial. El HTML <picture> debe seleccionar un SVG apropiado a cada ancho.
      try {
        const figure = page.locator(".feature-band .zenit-visual-figure");
        await figure.scrollIntoViewIfNeeded({ timeout: 8000 });
        await page.waitForFunction(() => {
          const img = document.querySelector(".feature-band .zenit-visual-figure img");
          return img && img.complete && img.naturalWidth > 0;
        }, { timeout: 12000 });
        const art = await figure.evaluate(el => {
          const img = el.querySelector("img");
          const fig = el.getBoundingClientRect();
          const rect = img?.getBoundingClientRect();
          return {
            src: img?.currentSrc || "",
            imageWidth: rect?.width || 0,
            imageHeight: rect?.height || 0,
            figureWidth: fig.width,
            naturalWidth: img?.naturalWidth || 0
          };
        });
        const expected = size.width <= 640 ? "zenit-connection-mobile.svg" : "zenit-connection-desktop.svg";
        if (!art.src.includes(expected)) {
          addFinding("error", key, "Ilustración no adaptada: se esperaba " + expected + ", se obtuvo " + art.src);
        }
        if (art.imageWidth > art.figureWidth + 3 || art.naturalWidth === 0) {
          addFinding("error", key, "Ilustración sobresale del recuadro o no se carga");
        }
        if (art.imageHeight < 120) {
          addFinding("warning", key, "Ilustración demasiado pequeña: " + art.imageHeight + " px");
        }
        await figure.screenshot({
          path: join(out, "portada-diagrama-" + size.label + ".png"),
          animations: "disabled", timeout: 12000
        });
        const formulaOverflow = await page.locator(".hero .formula-card .formula").evaluate(el =>
          Math.max(0, el.scrollWidth - el.clientWidth)
        );
        if (formulaOverflow > 8) {
          addFinding("error", key, "Fórmula de portada desbordada: " + formulaOverflow + " px");
        }
      } catch (error) {
        addFinding("error", key, "No se pudo verificar el diagrama de inicio: " + error.message);
      }
    }
    // Capturas cerca de fórmulas: las capturas del encabezado no revelan
    // recuadros cortados varias pantallas más abajo.
    if (size.width <= 390 && ["herramientas", "leccion-conjuntos"].includes(label)) {
      const formulaNodes = page.locator(".math-typeset-display.math-scroll-region");
      const count = await formulaNodes.count();
      const indices = [...new Set([0, Math.floor(count / 2), count - 1])].filter(i => i >= 0);
      for (const i of indices) {
        try {
          await formulaNodes.nth(i).scrollIntoViewIfNeeded({ timeout: 5000 });
          await page.screenshot({
            path: join(out, "formula-" + key + "-" + i + ".png"),
            fullPage: false, animations: "disabled"
          });
        } catch (error) {
          addFinding("warning", key, "No se pudo capturar la fórmula #" + i + ": " + error.message);
        }
      }
    }
    results.push({ key, path, status, ...detail, runtimeErrors, accessibility, a11yViolations, screenshotPath });
    console.log(key + ": HTTP " + status + ", overflow " + detail.widthOverflow +
      " px, fórmulas con scroll " + formulaOverflow.length + "/" + detail.formulaBoxes.length +
      ", axe serious/critical " + accessibility.serious + "/" + accessibility.critical);
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
    if (["inicio", "blog", "herramientas", "aprende", "leccion-conjuntos",
         "calculo-gradiente", "calculo-derivacion", "algebra-lineal",
         "fisica-electromagnetismo", "quimica-soluciones"].includes(label)) {
      await inspectRoute(label, path, viewports[0]);
      if (["inicio", "herramientas", "leccion-conjuntos", "calculo-gradiente"].includes(label)) {
        await inspectRoute(label, path, viewports[6]);
      }
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
