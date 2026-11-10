import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const read = (path) => readFileSync(new URL("../" + path, import.meta.url), "utf8");
const site = read("components/site.tsx");
const css = read("app/globals.css");
const layout = read("app/layout.tsx");
const config = read("lib/site-config.ts");
const robots = read("public/robots.txt");
const sitemap = read("public/sitemap.xml");
assert.match(site, /<details className="mobile-menu">/);
assert.match(site, /<nav className="mobile-links"/);
assert.match(css, /\.mobile-menu nav\.mobile-links/);
assert.match(css, /:focus-visible/);
assert.match(css, /prefers-reduced-motion/);
assert.match(css, /--accent-ink:#a9311b/);
assert.match(layout, /brand\/zenit-lockup\.svg/);
assert.match(layout, /SITE_URL as BASE_URL/);
assert.match(config, /https:\/\/sistemazenit\.com/);
assert.match(robots, /Sitemap: https:\/\/sistemazenit\.com\/sitemap\.xml/);
assert.match(sitemap, /<loc>https:\/\/sistemazenit\.com/);

const design = read("app/design-system.css");
assert.match(layout, /import "\.\/design-system\.css"/);
assert.match(design, /\.learning-view/);
assert.match(design, /\.aprende-hub \.area-section/);
assert.match(design, /--zenit-font-ui/);
assert.match(design, /\.button\.secondary/);

const getHex = (name) => {
  const hit = design.match(new RegExp(name + ":\\s*(#[a-fA-F0-9]{6})"));
  assert.ok(hit, "Token inexistente: " + name);
  return hit[1];
};
const luminance = (hex) => {
  const channels = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const linear = channels.map((n) => n <= 0.04045 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4);
  return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
};
const contrastRatio = (a, b) => {
  const lo = Math.min(luminance(a), luminance(b));
  const hi = Math.max(luminance(a), luminance(b));
  return (hi + 0.05) / (lo + 0.05);
};
for (const [foreground, background] of [
  ["--zenit-coral-text", "--zenit-canvas"],
  ["--zenit-ink", "--zenit-coral"],
  ["--zenit-night-text", "--zenit-night"],
  ["--zenit-night-muted", "--zenit-night"],
  ["--zenit-night-text", "--zenit-forest"],
]) {
  const ratio = contrastRatio(getHex(foreground), getHex(background));
  assert.ok(ratio >= 4.5, `Contraste insuficiente: ${foreground} sobre ${background} = ${ratio.toFixed(2)}:1`);
}
for (const page of [
  "app/blog/page.tsx",
  "app/aprende/[area]/page.tsx",
  "app/aprende/[area]/[curso]/page.tsx",
  "app/aprende/[area]/[curso]/[slug]/page.tsx",
]) {
  assert.match(read(page), /learning-view/, `Falta tema educativo: ${page}`);
}

// Capa 03: controles con nombres accesibles, fórmulas enfocables y botones de respuesta seguros.
const responsive = read("app/responsive-accessibility.css");
const formula = read("components/math-formula.tsx");
const engines = read("components/zenit-app-engines.tsx");
const blog = read("components/blog-constructor-explorer.tsx");
const quiz = read("components/interactive-exercise-bank.tsx");
const generator = read("components/infinite-problem-generator.tsx");
assert.match(layout, /import "\.\/responsive-accessibility\.css"/);
assert.match(responsive, /\.math-scroll-region/);
assert.match(responsive, /input\[type="range"\]/);
assert.match(responsive, /min-block-size:\s*44px/);
assert.match(responsive, /max-width:\s*767px/);
assert.match(formula, /tabIndex=\{displayMode \? 0 : undefined\}/);
const inputs = [...engines.matchAll(/<input\b[\s\S]*?\/>/g)].map(m => m[0]);
assert.equal(inputs.length, 27, "Revisar inputs de motores tras introducir nuevos controles");
for (const [index, input] of inputs.entries()) {
  assert.match(input, /aria-label=\{?/, "Control " + (index + 1) + " sin etiqueta");
}
const svgs = [...engines.matchAll(/<svg\b[^>]*>/g)].map(m => m[0]);
assert.equal(svgs.length, 8, "Revisar descripciones SVG tras introducir motores");
for (const [index, svg] of svgs.entries()) {
  assert.match(svg, /role="img" aria-label="/, "Gráfico " + (index + 1) + " sin descripción");
}
assert.match(blog, /htmlFor="zenit-blog-course"/);
assert.match(blog, /htmlFor="zenit-blog-engine"/);
assert.match(blog, /htmlFor="zenit-blog-search"/);
assert.match(blog, /aria-pressed=\{selectedGrade === g\.id\}/);
assert.match(quiz, /aria-pressed=\{isSelected\}/);
assert.match(quiz, /aria-expanded=\{hintShown\}/);
assert.match(generator, /if \(selectedIdx !== null\) return;/);
assert.match(generator, /aria-disabled=\{selectedIdx !== null\}/);
assert.match(generator, /role="status"/);


// El sistema de accesibilidad también cubre laboratorios anteriores al nuevo motor.
const advanced = read("components/advanced-labs.tsx");
const trigonometry = read("components/trig-labs.tsx");
const universal = read("components/universal-interactive-lab.tsx");
assert.match(responsive, /\.guided-lab/);
assert.match(responsive, /\.universal-lab-card/);
assert.equal((advanced.match(/role="img" aria-label=/g) || []).length, 4);
assert.match(advanced, /role="img" aria-label=\{/);
assert.match(advanced, /aria-pressed=\{!!active\}/);
assert.equal((trigonometry.match(/role="img"/g) || []).length, 2);
const universalInputs = [...universal.matchAll(/<input\b[\s\S]*?\/>/g)].map(m => m[0]);
assert.equal(universalInputs.length, 3);
assert.ok(universalInputs.every(input => input.includes("aria-label=")));
assert.match(universal, /role="img" aria-label="/);

console.log("✓ Diseño, contraste, accesibilidad de controles, responsive y SEO verificados.");
