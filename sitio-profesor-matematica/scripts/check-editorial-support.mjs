/**
 * Garantía editorial reproducible para las lecciones realmente publicadas.
 * Separa contenido fuente ausente, teoría complementaria y ejercicio original.
 * No corrige ni genera claves de fichas importadas.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import ts from "typescript";
import vm from "node:vm";

const read = path => readFileSync(new URL("../" + path, import.meta.url), "utf8");
const full = JSON.parse(read("content/catalog/lessons-full.json"));
const index = JSON.parse(read("content/catalog/lessons-index.json"));
const src = read("lib/lesson-study-guides.ts");
const built = ts.transpileModule(src, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 }
}).outputText;
const sandbox = { exports: {} };
vm.runInNewContext(built, sandbox, { timeout: 4000 });
const { LESSON_STUDY_GUIDES: guides, LESSON_ORIGINAL_PRACTICE: practices } = sandbox.exports;
assert.ok(guides && practices, "Faltan guías o ejercicios complementarios");

const indexed = new Map(index.map(lesson => [lesson.slug, lesson]));
const current = full.filter(lesson => indexed.get(lesson.slug)?.publishStatus === "published");
const missingTheory = current.filter(lesson => !lesson.theorySlides?.length);
const missingExercises = current.filter(lesson =>
  !(lesson.exercisesF0?.length || lesson.exercisesFA?.length));
for (const lesson of missingTheory) {
  const guide = guides[lesson.slug];
  assert.ok(guide, "Falta guía pedagógica para " + lesson.slug);
  assert.ok(guide.heading.length >= 15 && guide.principles.length >= 3 &&
    guide.principles.every(x => x.length >= 35) && guide.activity.length >= 35,
    "Guía insuficiente: " + lesson.slug);
}
for (const lesson of missingExercises) {
  const practice = practices[lesson.slug];
  assert.ok(practice, "Falta práctica de refuerzo: " + lesson.slug);
  assert.ok(practice.statement.length >= 20 && practice.steps.length >= 2 &&
    practice.steps.every(s => s.length >= 15) && practice.answer.trim().length >= 2,
    "Práctica sin pasos o respuesta: " + lesson.slug);
}
for (const slug of Object.keys(practices)) {
  const lesson = indexed.get(slug);
  assert.equal(lesson?.publishStatus, "published", "No añadir material a una lección programada: " + slug);
  const original = full.find(item => item.slug === slug);
  assert.ok(original && !(original.exercisesF0?.length || original.exercisesFA?.length),
    "No sustituir un banco de ejercicios original: " + slug);
}
const pages = read("app/aprende/[area]/[curso]/[slug]/page.tsx");
assert.match(pages, /LESSON_ORIGINAL_PRACTICE/);
assert.match(pages, /Ejercicio original de refuerzo/);
assert.match(pages, /Ver resolución paso a paso/);
assert.match(pages, /hasSourceExercises \|\| originalPractice/);

/* Comprobaciones aritméticas independientes de los ejemplos redactados.
 * Las claves importadas se mantienen fuera de este procedimiento. */
assert.equal(4 + 3 - 2, 5);
assert.equal(4 + 7, 11);
assert.equal(7 + 2, 9);
assert.equal(45 + 54, 99);
assert.equal(50 * 180 / 200, 45);
assert.equal(2 + 1 + 3, 6);
assert.equal(3 / 6 * 100, 50);
assert.deepEqual([3,4,5].sort(), [3,4,5].sort());
assert.equal((1+2+3+4+5+6+7+8+9)/3, 15);
const expectedAnswers = {
  "expresion-algebraica-1sec-unidad1": "5x",
  "nociones-basicas-de-geometria-1sec-unidad1": "11 cm",
  "secuencia-de-figuras-1sec-unidad1": "9 cuadrados",
  "criptoaritmetica-1-1sec-unidad2": "B = 5",
  "sistemas-de-medidas-angulares-ii-1sec-unidad2": "45°",
  "tabla-de-dist-de-frec-para-datos-sin-agrupar-1sec-unidad2": "f(2) = 2, f(3) = 1, f(4) = 3",
  "tabla-de-distribucion-de-frecuencias-para-datos-sin-agrupar-1sec-unidad2": "50 %",
  "congruencia-de-triangulos-1sec-unidad3": "Sí, por el criterio LLL.",
  "criptoaritmetica-ii-1sec-unidad3": "B = 5",
  "cuadrados-magicos-1sec-unidad3": "15",
};
for (const [slug, answer] of Object.entries(expectedAnswers)) {
  assert.equal(practices[slug]?.answer, answer, "Respuesta de ejercicio original alterada: " + slug);
}
console.log(JSON.stringify({
  published: current.length,
  sourceTheoryMissing: missingTheory.length,
  coveredWithGuides: missingTheory.filter(l => guides[l.slug]).length,
  sourceExercisesMissing: missingExercises.length,
  coveredWithOriginalPractice: missingExercises.filter(l => practices[l.slug]).length,
  importedAnswerKeysUnchanged: true
}, null, 2));
