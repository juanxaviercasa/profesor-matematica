import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path) => readFileSync(new URL("../" + path, import.meta.url), "utf8");
const home = read("app/page.tsx");
const layout = read("app/layout.tsx");
const aura = read("app/zenit-aura-home.css");
const site = read("components/site.tsx");
const curriculum = JSON.parse(read("content/catalog/lessons-index.json"));
const brand = read("BRAND-GUIDE.md");

assert.match(brand, /Zénit Aura/);
assert.doesNotMatch(brand, /Zénit Aurora/, "No reutilizar el nombre anterior de la identidad");
assert.match(site, /Logra tus metas/);
assert.match(home, /Aprende a pensar/);
assert.match(home, /Llega más alto/);
assert.match(home, /aura-hero-lab/);
assert.equal((home.match(/<FormulaCard\/>/g) || []).length, 1, "Conservar un solo graficador auténtico");
assert.match(home, /La mejor explicación es la que/);
assert.match(home, /Logra tus metas\./);
assert.match(home, /src="\/juan-xavier\.jpg"/);
const imports = [
  'import "./hero-quadratic-lab.css";',
  'import "./home-cinematic.css";',
  'import "./zenit-aura-home.css";',
];
assert.ok(imports.every(line => layout.includes(line)), "Faltan hojas responsive");
assert.ok(imports.every((line, i) => i === 0 || layout.indexOf(line) > layout.indexOf(imports[i-1])),
  "La hoja de Zénit Aura debe cargar al final");
for (const selector of [
  ".aura-hero", ".aura-hero-lab", ".home-math-subject-grid",
  ".home-science-subject-grid", ".aura-course-index", ".home-innovation",
  ".home-path-section", ".home-trust", ".home-cinematic-end",
]) assert.ok(aura.includes(selector), "Estilo necesario ausente: " + selector);
for (const breakpoint of [1100, 850, 700]) {
  assert.ok(aura.includes("max-width:" + breakpoint + "px"),
    "Falta layout responsive para " + breakpoint + " px");
}
for (const [course,area] of [
  ["algebra","matematica-preuniversitaria"],
  ["aritmetica","matematica-preuniversitaria"],
  ["geometria","matematica-preuniversitaria"],
  ["trigonometria","matematica-preuniversitaria"],
  ["razonamiento-matematico","matematica-preuniversitaria"],
  ["fisica","ciencias"],["quimica","ciencias"],
]) {
  assert.ok(home.includes('href: "/aprende/' + area + '/' + course + '"'),
    "Falta ruta académica: " + course);
  assert.ok(curriculum.some(x => x.area === area && x.course === course && x.publishStatus === "published"),
    "Curso no publicado: " + course);
}
assert.doesNotMatch(home, /zenit-connection-aurora-|feature-band/,
  "No agregar diagramas cuadráticos duplicados a la portada");
console.log("✓ Zénit Aura: portada editorial, graficador único, siete cursos, identidad y responsive verificados.");
