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
assert.match(page, /Siete caminos para explorar/);
assert.doesNotMatch(groups, /title: "Matemática",/, "No volver a fusionar los cinco cursos");

const expected = [
  ["Álgebra", "matematica-preuniversitaria", "algebra", "svg"],
  ["Aritmética", "matematica-preuniversitaria", "aritmetica", "svg"],
  ["Geometría", "matematica-preuniversitaria", "geometria", "svg"],
  ["Trigonometría", "matematica-preuniversitaria", "trigonometria", "svg"],
  ["Razonamiento Matemático", "matematica-preuniversitaria", "razonamiento-matematico", "svg"],
  ["Física", "ciencias", "fisica", "webp"],
  ["Química", "ciencias", "quimica", "webp"],
];
assert.equal((groups.match(/href: "\/aprende\//g) ?? []).length, expected.length,
  "Se esperan siete tarjetas de acceso, sin duplicados");
for (const [title, area, slug, ext] of expected) {
  assert.ok(groups.includes('title: "' + title + '"'), "Falta curso: " + title);
  assert.ok(groups.includes('href: "/aprende/' + area + '/' + slug + '"'), "Ruta incorrecta: " + slug);
  assert.ok(groups.includes('image: "' + slug + '.' + ext + '"'), "Imagen incorrecta: " + slug);
  assert.ok(existsSync(new URL("../public/images/home/zenit-" + slug + "." + ext, import.meta.url)),
    "Falta ilustración: " + slug);
  const available = lessons.filter((lesson) =>
    lesson.area === area && lesson.course === slug && lesson.publishStatus === "published");
  assert.ok(available.length > 0, "No se debe enlazar a un curso sin lecciones publicadas: " + slug);
}
for (const className of ["home-subject-groups", "home-math-subject-grid", "home-science-subject-grid"]) {
  assert.ok(css.includes(className), "Falta CSS: " + className);
}
assert.match(css, /max-width:1050px/);
assert.match(css, /max-width:700px/);
assert.match(page, /<h3 id=\{group\.id\}>/);
assert.match(page, /<h4>\{subject\.title\}<\/h4>/);
console.log("✓ Inicio: 5 cursos matemáticos + Física y Química, enlaces publicados e ilustraciones presentes.");
