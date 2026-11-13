import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

const read = (p) => readFileSync(new URL("../" + p, import.meta.url), "utf8");
const page = read("app/page.tsx");
const css = read("app/home-cinematic.css");
const lessons = JSON.parse(read("content/catalog/lessons-index.json"));
const begin = page.indexOf("const subjectGroups = [");
const end = page.indexOf("const routes = [");
assert.ok(begin >= 0 && end > begin, "Bloque de materias no encontrado");
const groups = page.slice(begin, end);
assert.match(groups, /id: "home-math-courses"/);
assert.match(groups, /id: "home-science-courses"/);
assert.match(page, /Cada curso, un nuevo horizonte/);
assert.doesNotMatch(groups, /title: "Matemática",/, "No volver a fusionar los cinco cursos");

const expected = [
  ["Álgebra", "matematica-preuniversitaria", "algebra"],
  ["Aritmética", "matematica-preuniversitaria", "aritmetica"],
  ["Geometría", "matematica-preuniversitaria", "geometria"],
  ["Trigonometría", "matematica-preuniversitaria", "trigonometria"],
  ["Razonamiento Matemático", "matematica-preuniversitaria", "razonamiento-matematico"],
  ["Física", "ciencias", "fisica"],
  ["Química", "ciencias", "quimica"],
  ["Biología", "ciencias", "biologia"],
];
assert.equal((groups.split('href: "/aprende/').length - 1), expected.length,
  "Se esperan ocho tarjetas de acceso, sin duplicados");
for (const [title, area, slug] of expected) {
  assert.ok(groups.includes('title: "' + title + '"'), "Falta curso: " + title);
  assert.ok(groups.includes('href: "/aprende/' + area + '/' + slug + '"'), "Ruta incorrecta: " + slug);
  assert.ok(groups.includes('image: "' + slug + '-aura-hd.webp"'), "Imagen Aura incorrecta: " + slug);
  assert.ok(existsSync(new URL("../public/images/home/zenit-" + slug + "-aura-hd.webp", import.meta.url)),
    "Falta fotografía hiperrealista HD: " + slug);
  if (slug !== "biologia") {
    const available = lessons.filter((lesson) =>
      lesson.area === area && lesson.course === slug && lesson.publishStatus === "published");
    assert.ok(available.length > 0, "Curso sin lecciones publicadas: " + slug);
  }
}
assert.ok(existsSync(new URL("../app/aprende/ciencias/biologia/page.tsx", import.meta.url)),
  "La tarjeta de Biología no debe conducir a 404");
const bioPage = read("app/aprende/ciencias/biologia/page.tsx");
assert.match(bioPage, /guía|introductorio|introductoria|conceptual/i,
  "Biología debe presentarse como una introducción hasta tener lecciones publicadas");
for (const className of ["home-subject-groups", "home-math-subject-grid", "home-science-subject-grid"]) {
  assert.ok(css.includes(className), "Falta CSS: " + className);
}
assert.match(css, /max-width:1050px/);
assert.match(css, /max-width:700px/);
assert.match(page, /<h3 id=\{group\.id\}>/);
assert.match(page, /<h4>\{subject\.title\}<\/h4>/);
console.log("✓ Inicio: 5 cursos matemáticos + 3 ciencias, 8 fotografías HD originales, enlaces y Biología introductoria.");
