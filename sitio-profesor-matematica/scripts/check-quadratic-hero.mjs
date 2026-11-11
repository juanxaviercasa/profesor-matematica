import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
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
assert.match(component,/zenit-phoenix\.svg/);
assert.match(component,/Logra tu meta/);
assert.match(site,/export function FormulaCard\(\) \{ return <QuadraticHeroLab\/>; \}/);
assert.match(home,/<FormulaCard\/>/);
assert.match(home,/zenit-connection-aurora-desktop\.svg/);
assert.match(home,/zenit-connection-aurora-mobile\.svg/);
assert.ok(layout.indexOf('import "./hero-quadratic-lab.css"') > layout.indexOf('import "./zenit-aurora.css"'));
for(const selector of [".zqh-plot", ".zqh-controls", ".zqh-math", "max-width: 610px", "prefers-reduced-motion"]){
  assert.ok(css.includes(selector), "Estilo responsive faltante: "+selector);
}
for(const name of ["desktop","mobile"]){
  const image="public/brand/zenit-connection-aurora-"+name+".svg";
  assert.ok(existsSync(new URL("../"+image,import.meta.url)), "Ilustración Aurora no encontrada: "+image);
  const content=read(image);
  assert.match(content,/SISTEMA ZÉNIT · LOGRA TU META/);
  assert.match(content,/fill="url\(#flame\)"/);
  assert.match(content,/x² − 4x \+ 3/);
  assert.match(content,/Vértice: \(2, −1\)|V\(2, −1\)/);
  assert.doesNotMatch(content,/#(?:12372f|d9ef78|ff5a36)\b/i,"SVG conserva tema anterior");
}
assert.match(aurora,/--aurora-brand-gradient/);
console.log("✓ Portada: parábola exacta, controles a/h/k, raíces, vértice, SVG Aurora y responsive.");
