import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path) => readFileSync(new URL("../" + path, import.meta.url), "utf8");
const home = read("app/page.tsx");
const layout = read("app/layout.tsx");
const aura = read("app/zenit-aura-home.css");
const site = read("components/site.tsx");
const refinement = read("app/zenit-aura-refinement.css");
const curriculum = JSON.parse(read("content/catalog/lessons-index.json"));
const brand = read("BRAND-GUIDE.md");

assert.match(brand, /Zénit Aura/);
assert.doesNotMatch(brand, /Zénit Aurora/, "No reutilizar el nombre anterior de la identidad");
assert.match(site, /Comprende para llegar más alto/);
assert.match(home, /Aprende a pensar/);
assert.match(home, /Llega más alto/);
assert.match(home, /Aprender no es memorizar/);
assert.match(home, /aura-hero-lab/);
assert.equal((home.match(/<FormulaCard\/>/g) || []).length, 1, "Conservar un solo graficador auténtico");
assert.match(home, /La mejor explicación es la que/);
assert.match(home, /aura-human-heading/);
assert.match(home, /aura-human-grid/);
assert.match(home, /aura-lab-benefits/);
assert.match(home, /aura-founder-caption/);
assert.match(home, /aura-founder-belief/);
assert.match(home, /aura-path-number/);
for (const path of [
  'href: "/aprende"',
  'href: "/aprende/matematica-preuniversitaria"',
  'href: "/aprende/matematica-universitaria"',
]) assert.ok(home.includes(path), "Ruta de nivel académica incorrecta: " + path);
assert.ok((home.match(/className="home-human-card"/g) || []).length === 2,
  "Conservar dos tarjetas humanas con fotografías y mensajes distintos");
assert.ok((home.match(/className="path-card"/g) || []).length === 1,
  "Mantener la navegación de niveles mediante datos reales");
assert.ok(layout.indexOf('import "./zenit-aura-refinement.css";') > layout.indexOf('import "./zenit-aura-home.css";'),
  "Refinamiento de las secciones inferiores debe cargarse al final");
for (const selector of [
  ".aura-human-grid", ".aura-human-heading", ".aura-lab-benefits",
  ".home-teacher-portrait", ".aura-founder-caption",
  ".home-path-section", ".home-cinematic-end", ".home-math-subject-grid",
]) assert.ok(refinement.includes(selector), "Falta diseño refinado: " + selector);

assert.ok(refinement.includes("grid-template-columns:repeat(3,minmax(0,1fr))"),
  "Matemáticas y Ciencias requieren tres columnas en escritorio");
assert.ok(refinement.includes("grid-template-columns:repeat(2,minmax(0,1fr))"),
  "En tablet debe haber dos columnas");
assert.ok(refinement.includes("grid-template-columns:minmax(0,1fr)"),
  "En móvil debe haber una columna");
assert.match(refinement, /@media\(max-width:920px\)/, "Falta ajuste de dos columnas en tablet");
assert.match(refinement, /@media\(max-width:700px\)/, "Falta ajuste a una columna en móvil");

assert.match(home, /Tu próximo gran logro/);
assert.match(home, /comienza cuando comprendes/);
assert.doesNotMatch(home, /Infinitas posibilidades/);
assert.match(home, /Biología/);
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
  ["fisica","ciencias"],["quimica","ciencias"],["biologia","ciencias"],
]) {
  assert.ok(home.includes('href: "/aprende/' + area + '/' + course + '"'),
    "Falta ruta académica: " + course);
  if (course !== "biologia") {
    assert.ok(curriculum.some(x => x.area === area && x.course === course && x.publishStatus === "published"),
      "Curso no publicado: " + course);
  }
}
assert.doesNotMatch(home, /zenit-connection-aurora-|feature-band/,
  "No agregar diagramas cuadráticos duplicados a la portada");
console.log("✓ Zénit Aura: portada editorial, graficador único, ocho cursos, identidad y responsive verificados.");
