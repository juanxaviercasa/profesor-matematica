/** Puerta estática de calidad visual transversal.
 * Complementa (no sustituye) Playwright, axe-core y las capturas de Chromium.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const read = path => readFileSync(new URL("../" + path, import.meta.url), "utf8");
const css = read("app/premium-responsive.css");
const layout = read("app/layout.tsx");
const browser = read("scripts/qa-browser.mjs");
const catalog = read("scripts/qa-catalog-browser.mjs");
const design = read("app/design-system.css");
const redesign = read("app/zenit-redesign.css");
assert.match(layout, /import "\.\/zenit-redesign\.css";/);
assert.doesNotMatch(redesign, /(?:^|\n)\.learning-view\s*\{[^}]*background\s*:/,
  "El tema claro no puede sobrescribir el fondo oscuro de las lecciones");
assert.match(redesign, /\.learning-view:not\(\.topic-view\)\s*\{\s*background:/,
  "Limitar superficies claras a vistas que no sean lecciones oscuras");
assert.doesNotMatch(redesign, /(?:^|\n)\.learning-view \.text-stone-300\s*\{/,
  "Evitar texto oscuro sobre tarjetas y laboratorios oscuros");
assert.match(layout, /import "\.\/premium-responsive\.css";/);
assert.ok(layout.indexOf('import "./premium-responsive.css"') >
  layout.indexOf('import "./math-responsive-layout.css"'),
  "La capa premium debe seguir a las reglas matemáticas compartidas");
for (const token of [
  "--zenit-premium-muted-on-dark", "--zenit-premium-focus-on-dark",
  "--zenit-premium-touch-size"
]) assert.ok(css.includes(token), "Falta token premium " + token);
for (const selector of [
  ".math-typeset-display.math-scroll-region", ".lesson-jump-nav",
  ".exercise-bank", ".infinite-problem-generator", ".zenit-webapp-shell",
  "prefers-reduced-motion", "focus-visible"
]) assert.ok(css.includes(selector), "Falta cobertura transversal " + selector);
assert.match(css, /overflow-x: auto/);
assert.doesNotMatch(css, /\.katex-mathml\s*\{\s*display:\s*none/);
assert.match(browser, /horizontalOffenders/);
assert.match(catalog, /formulaOverflow/);
const hex = name => {
  const value = (css + "\n" + design).match(new RegExp(name + ":\\s*(#[0-9a-fA-F]{6})"));
  assert.ok(value, "Falta valor hexadecimal para " + name);
  return value[1];
};
const lum = value => {
  const channel = [1, 3, 5].map(i => parseInt(value.slice(i, i + 2), 16) / 255);
  const c = channel.map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4);
  return c[0] * .2126 + c[1] * .7152 + c[2] * .0722;
};
const contrast = (a, b) => {
  const l1 = lum(a); const l2 = lum(b);
  return (Math.max(l1, l2) + .05) / (Math.min(l1, l2) + .05);
};
for (const [fg, bg] of [
  ["--zenit-premium-muted-on-dark", "--zenit-night"],
  ["--zenit-premium-text-on-dark", "--zenit-night"],
  ["--zenit-premium-focus-on-dark", "--zenit-night"],
]) {
  assert.ok(contrast(hex(fg), hex(bg)) >= 4.5, "Contraste AA insuficiente: " + fg);
}
console.log("✓ Calidad visual premium: cascada, contraste AA, responsive, KaTeX, foco y navegador QA.");
