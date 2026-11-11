/**
 * QA visual ejecutable sobre el sitio construido/desplegado:
 * QA_BASE_URL=https://sistemazenit.com npm run qa:hero
 * No sustituye una revisión humana de las capturas.
 */
import assert from "node:assert/strict";
import { chromium } from "playwright";

const base = (process.env.QA_BASE_URL || "http://127.0.0.1:8787").replace(/\/$/, "");
const browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
const sizes = [
  { name: "desktop-1535", width: 1535, height: 824, aboveFold: true },
  { name: "desktop-1440", width: 1440, height: 900, aboveFold: true },
  { name: "laptop-1280", width: 1280, height: 768, aboveFold: true },
  { name: "tablet-768", width: 768, height: 1024, aboveFold: false },
  { name: "mobile-390", width: 390, height: 844, aboveFold: false },
  { name: "mobile-375", width: 375, height: 812, aboveFold: false },
  { name: "mobile-320", width: 320, height: 700, aboveFold: false },
];
const reports = [];
try {
  for (const size of sizes) {
    const page = await browser.newPage({ viewport: { width:size.width, height:size.height }, deviceScaleFactor:1 });
    try {
      const response = await page.goto(base + "/", { waitUntil:"networkidle", timeout:45000 });
      assert.equal(response?.status(), 200, size.name + " status HTTP");
      await page.locator(".zqh-plot .zqh-curve").waitFor();
      const geometry = await page.evaluate(() => {
        const box = (s) => document.querySelector(s)?.getBoundingClientRect();
        const card = box(".zqh-lab"), graph = box(".zqh-plot"), hero = box(".home-page-v2 .hero");
        const style = (s) => getComputedStyle(document.querySelector(s));
        const svg = document.querySelector(".zqh-plot");
        const tickLabels = [...svg.querySelectorAll(".zqh-axis-values text")];
        const numeric = tickLabels.filter((e) => /^-?\d+(?:\.\d+)?$/.test(e.textContent.trim()));
        return {
          card: card && { top:card.top,bottom:card.bottom,left:card.left,right:card.right,width:card.width },
          graph: graph && { left:graph.left,right:graph.right,width:graph.width,height:graph.height },
          heroWidth:hero?.width,
          horizontalOverflow: document.documentElement.scrollWidth - innerWidth,
          cardBg:style(".zqh-lab").backgroundColor,
          plotBg:style(".zqh-plot").backgroundColor,
          numericLabels:numeric.length,
          viewportHeight:innerHeight,
          controls: document.querySelectorAll(".zqh-control input[type=range]").length,
        };
      });
      assert.ok(geometry.card && geometry.graph, size.name + " sin componente");
      assert.ok(geometry.horizontalOverflow <= 2, size.name + " scroll lateral " + geometry.horizontalOverflow);
      assert.ok(geometry.card.left >= -1 && geometry.card.right <= size.width + 1, size.name + " tarjeta desborda");
      assert.ok(geometry.graph.left >= -1 && geometry.graph.right <= size.width + 1, size.name + " gráfica desborda");
      assert.ok(geometry.numericLabels >= 8, size.name + " faltan números XY");
      assert.equal(geometry.controls, 3, size.name + " controles incompletos");
      assert.match(geometry.cardBg, /rgb\(255, 255, 255\)/, size.name + " falta fondo blanco");
      if (size.width >= 1200) {
        assert.ok(geometry.graph.width >= 490, size.name + " plano cartesiano demasiado pequeño");
      }
      if (size.aboveFold) {
        assert.ok(geometry.card.bottom <= geometry.viewportHeight - 8,
          size.name + " tarjeta cortada: " + geometry.card.bottom + " > " + geometry.viewportHeight);
      }
      const curveBefore = await page.locator(".zqh-curve").getAttribute("d");
      const slider = page.locator(".zqh-control input[type=range]").first();
      await slider.fill("7");
      const curveAfter = await page.locator(".zqh-curve").getAttribute("d");
      assert.notEqual(curveAfter, curveBefore, size.name + " el control no modifica la curva");
      reports.push({size:size.name,ok:true,graphWidth:Math.round(geometry.graph.width),
        cardBottom:Math.round(geometry.card.bottom),viewportHeight:geometry.viewportHeight,
        axisNumbers:geometry.numericLabels});
    } finally {
      await page.close();
    }
  }
  console.table(reports);
  console.log("✓ Gráfica clara, numerada, interactiva y sin recortes en los viewports probados.");
} finally {
  await browser.close();
}
