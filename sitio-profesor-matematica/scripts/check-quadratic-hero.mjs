import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  QUADRATIC_A_VALUES, tidy, quadraticY, quadraticRoots,
  expandedCoefficients, expandedLatex, vertexLatex, quadraticPlot, PLOT,
} from "../lib/quadratic-hero.mjs";

const read = (name) => readFileSync(new URL("../" + name, import.meta.url), "utf8");
const close = (a, b, epsilon=1e-8) => assert.ok(Math.abs(a-b)<epsilon, a+" no coincide con "+b);

assert.ok(!QUADRATIC_A_VALUES.includes(0), "El control no debe dejar de ser cuadrático");
assert.ok(QUADRATIC_A_VALUES.includes(1) && QUADRATIC_A_VALUES.includes(-1), "Se deben mostrar ambas aperturas");
assert.equal(tidy(-0), "0");
assert.equal(quadraticY(1, 2, -1, 1), 0);
assert.equal(quadraticY(1, 2, -1, 3), 0);
assert.equal(quadraticY(1, 2, -1, 2), -1);
assert.deepEqual(quadraticRoots(1, 2, -1), [1, 3]);
assert.deepEqual(expandedCoefficients(1,2,-1), { a:1, b:-4, c:3 });
assert.equal(expandedLatex(1,2,-1), "f(x)=x^{2}-4x+3");
assert.equal(vertexLatex(1,2,-1), "f(x)=(x-2)^{2}-1");
assert.deepEqual(quadraticRoots(1, 1, 2), [], "Positiva y desplazada hacia arriba no corta el eje x");
assert.deepEqual(quadraticRoots(1, 0, 0), [0], "Raíz doble en el vértice");
assert.deepEqual(quadraticRoots(-1, -2, 4), [-4, 0], "Apertura negativa con raíces");
assert.throws(() => quadraticY(0,1,1,2), /a distinto de cero/);
assert.throws(() => quadraticPlot(0,1,1), /a distinto de cero/);
const reference = quadraticPlot(1, 2, -1);
assert.ok(reference.yTicks.length >= 4, "El eje Y debe incluir números legibles");
assert.ok(reference.ticks.includes(0) && reference.ticks.includes(1) && reference.ticks.includes(3));
assert.ok(reference.yMin < 0 && reference.yMax > 0, "La gráfica debe mostrar el eje X");
assert.ok(reference.yTicks.some((t) => t === 0), "El eje Y debe mostrar el origen");
assert.ok(reference.vertex.py >= PLOT.top && reference.vertex.py <= PLOT.top + PLOT.height);
const scaleX = (reference.xToPixel(3)-reference.xToPixel(2));
const scaleY = (reference.yToPixel(0)-reference.yToPixel(1));
close(scaleX, scaleY, 1e-7); // una unidad en ambos ejes ocupa los mismos píxeles
assert.ok(reference.yTicks.length >= 4 && reference.yTicks.includes(0));

for (const a of QUADRATIC_A_VALUES) {
  for (const [h,k] of [[2,-1],[-2,1],[0,0],[3,-3]]) {
    const graph=quadraticPlot(a,h,k);
    assert.ok(graph.d.startsWith("M") && (graph.d.match(/L/g)||[]).length===150);
    assert.equal(graph.points.length,151);
    close(graph.vertex.x,h);
    close(graph.vertex.y,k);
    close(graph.vertex.px,PLOT.left+PLOT.width/2);
    for (const p of graph.points) close(p.y,quadraticY(a,h,k,p.x));
    for (const r of graph.roots) close(quadraticY(a,h,k,r.x),0,1e-7);
    if(a>0) assert.ok(graph.points[0].y>k&&graph.points.at(-1).y>k, "Parábola positiva debe abrir hacia arriba");
    if(a<0) assert.ok(graph.points[0].y<k&&graph.points.at(-1).y<k, "Parábola negativa debe abrir hacia abajo");
  }
}

const component=read("components/quadratic-hero-lab.tsx");
const site=read("components/site.tsx");
const home=read("app/page.tsx");
const layout=read("app/layout.tsx");
const css=read("app/hero-quadratic-lab.css");
const aurora=read("app/zenit-aurora.css");
assert.match(component,/^"use client";/);
assert.match(component,/quadraticPlot\(a, h, k\)/);
assert.match(component,/quadraticRoots|const roots = graph.roots/);
assert.equal((component.match(/type="range"/g)||[]).length,3,"Controlar a, h y k por separado");
assert.match(component,/setAIndex\(5\); setH\(2\); setK\(-1\)/);
assert.match(component,/expandedLatex\(a, h, k\)/);
assert.match(component,/vertexLatex\(a, h, k\)/);
assert.match(component,/role="img"/);
assert.match(component,/aria-live="polite"/);


assert.match(site,/export function FormulaCard\(\) \{ return <QuadraticHeroLab\/>; \}/);
assert.match(home,/<FormulaCard\/>/);


assert.ok(layout.indexOf('import "./hero-quadratic-lab.css"') > layout.indexOf('import "./zenit-aurora.css"'));
for(const selector of [".zqh-plot", ".zqh-controls", ".zqh-math", "max-width: 1100px", "max-width: 640px", "max-width: 360px", "prefers-reduced-motion"]){
  assert.ok(css.includes(selector), "Estilo responsive faltante: "+selector);
}
assert.match(css, /\.home-page-v2 \.hero\.wrap\s*\{/);
assert.match(css, /width: min\(1370px/);
assert.match(css, /grid-template-columns: minmax\(0, \.96fr\) minmax\(0, 1\.04fr\)/);
assert.match(css, /background: transparent;/);
assert.match(css, /border-radius: 0;/);
assert.match(css, /max-width: 700px;/);
assert.match(css, /max-height: none;/);
assert.match(component, /graph\.yTicks\.map/);
assert.match(component, /zqh-axis-name/);
assert.match(component, /zqh-vertex-label/);
assert.match(component, /V\(/);
assert.match(css, /\.zqh-plot \.zqh-axes line/);
assert.match(component, /zqh-plot-paper/);
assert.match(component, /zqh-axes/);
assert.match(component, /zqh-axis-values/);
assert.match(component, /zqh-curve/);
assert.match(css, /background: #ffffff;/);
assert.match(css, /fill: #ffffff;/);
assert.match(css, /stroke: #6045bc;/);
assert.match(css, /font-size: 23px;/);
assert.doesNotMatch(css, /background: linear-gradient\(145deg,#241b4b/, "La miniaplicación no debe ser un bloque morado");
assert.match(home, /Explorar materias/);
assert.match(home, /Probar laboratorios/);
assert.doesNotMatch(component, /zenit-phoenix\.svg|Logra tu meta|Laboratorio interactivo|zqh-brand|zqh-live/,
  "La miniaplicación no debe repetir la identidad del encabezado");
assert.doesNotMatch(home, /feature-band|zenit-connection-aurora-|Funciones antes de cálculo\./,
  "La portada no debe repetir la parábola del hero como ilustración");
assert.match(aurora,/--aurora-brand-gradient/);
console.log("✓ Portada: parábola exacta, controles a/h/k, y sin logotipos ni diagramas duplicados.");
