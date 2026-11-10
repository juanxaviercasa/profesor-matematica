/**
 * Censo reproducible de las 628 lecciones. Inspecciona datos reales, no
 * transforma/expone lecciones programadas ni modifica respuestas pedagógicas.
 * Salidas: un registro por lección (JSON/CSV) y resumen Markdown.
 */
import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve, join } from "node:path";
import ts from "typescript";
import vm from "node:vm";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const out = resolve(root, process.env.CATALOG_AUDIT_DIR || ".catalog-audit");
mkdirSync(out, { recursive: true });
const load = name => JSON.parse(readFileSync(join(root, "content", "catalog", name), "utf8"));
const index = load("lessons-index.json");
const full = load("lessons-full.json");
if (!Array.isArray(index) || !Array.isArray(full)) throw new Error("El catálogo debe ser una lista");
const editorialSource = readFileSync(join(root, "lib/lesson-study-guides.ts"), "utf8");
const compiledEditorial = ts.transpileModule(editorialSource, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 }
}).outputText;
const editorialSandbox = { exports: {} };
vm.runInNewContext(compiledEditorial, editorialSandbox, { timeout: 4000 });
const { LESSON_STUDY_GUIDES: guides, LESSON_ORIGINAL_PRACTICE: originalPractices } = editorialSandbox.exports;

const fullBySlug = new Map(full.map(v => [v.slug, v]));
const seen = new Set();
const rows = [];
const routeOf = l => "/aprende/" + l.area + "/" + l.course + "/" + l.slug;
const levels = { critical: 0, review: 0, scheduled: 0 };
const counts = { total: index.length, full: full.length, published: 0, scheduled: 0, 
  publishedMissingTheory: 0, publishedMissingExercises: 0,
  publishedGuidesForMissingTheory: 0, publishedOriginalPracticeForMissingExercises: 0,
  answerKeysWithoutOptions: 0, duplicateSlug: 0, missingFull: 0, metadataMismatch: 0,
  totalExercises: 0 };
const courses = {};
for (const l of index) {
  const state = l.publishStatus;
  if (state === "published" || state === "scheduled") counts[state]++;
  const key = l.area + "/" + l.course;
  courses[key] ||= { published: 0, scheduled: 0, review: 0, critical: 0 };
  if (state in courses[key]) courses[key][state]++;
  const details = fullBySlug.get(l.slug);
  const flags = [];
  const flag = (severity, code, info) => { flags.push({ severity, code, info }); levels[severity]++; };
  if (seen.has(l.slug)) { flag("critical", "DUPLICATE_SLUG", "Identificador duplicado"); counts.duplicateSlug++; }
  seen.add(l.slug);
  if (!details) { flag("critical", "NO_FULL_LESSON", "La lección no tiene ficha completa"); counts.missingFull++; }
  if (!l.title?.trim() || !l.slug?.trim() || !l.keyFormula?.trim()) {
    flag("critical", "REQUIRED_FIELD", "Título, slug o fórmula vacía");
  }
  if (!["published", "scheduled"].includes(state)) flag("critical", "INVALID_STATUS", state);
  if (details && ["title", "area", "course", "slug", "publishStatus"].some(k => details[k] !== l[k])) {
    flag("critical", "INDEX_MISMATCH", "Índice y ficha tienen datos diferentes");
    counts.metadataMismatch++;
  }
  const theory = details?.theorySlides ?? [];
  const exF0 = details?.exercisesF0 ?? [];
  const exFA = details?.exercisesFA ?? [];
  if (details && (!Array.isArray(theory) || !Array.isArray(exF0) || !Array.isArray(exFA))) {
    flag("critical", "INVALID_ARRAYS", "La teoría o los ejercicios no son listas");
  }
  const exercises = [...(Array.isArray(exF0) ? exF0 : []), ...(Array.isArray(exFA) ? exFA : [])];
  counts.totalExercises += exercises.length;
  if (state === "published") {
    if (theory.length === 0) {
      flag("review", "THEORY_EMPTY", "Sin diapositivas originales de teoría" +
        (guides[l.slug] ? " (guía complementaria disponible)" : ""));
      counts.publishedMissingTheory++;
      if (guides[l.slug]) counts.publishedGuidesForMissingTheory++;
    }
    if (exercises.length === 0 && !(details?.workedSolutions?.length)) {
      flag("review", "EXERCISES_EMPTY", "Sin ejercicios originales cargados" +
        (originalPractices[l.slug] ? " (práctica original de refuerzo disponible)" : ""));
      counts.publishedMissingExercises++;
      if (originalPractices[l.slug]) counts.publishedOriginalPracticeForMissingExercises++;
    }
  } else if (state === "scheduled" && theory.length === 0 && exercises.length === 0) {
    // Preparación editorial esperada, no fallo del sitio ni error de HTTP.
    flag("scheduled", "PENDING_CONTENT", "Contenido programado aún sin teoría ni ejercicios");
  }
  const answerIssues = [];
  for (const [i, ex] of exercises.entries()) {
    if (!Array.isArray(ex.options)) {
      flag("critical", "INVALID_EXERCISE_OPTIONS", "Ejercicio #" + (ex.number ?? i) + " sin lista de opciones");
      continue;
    }
    if (!ex.answerKey) continue;
    const m = String(ex.answerKey).trim().match(/^([A-E])\.?$/i);
    if (!m) continue; // Respuesta libre: no adjudicar una alternativa arbitraria.
    const indexOfKey = m[1].toUpperCase().charCodeAt(0) - 65;
    if (indexOfKey >= ex.options.length) {
      const detail = "Ejercicio #" + (ex.number ?? i) + ": clave " + m[1].toUpperCase() +
        " con " + ex.options.length + " alternativa(s) cargada(s)";
      flag("review", "ANSWER_KEY_WITHOUT_OPTION", detail);
      counts.answerKeysWithoutOptions++;
      answerIssues.push(detail);
    }
  }
  const severity = flags.some(f => f.severity === "critical") ? "critical" :
    flags.some(f => f.severity === "review") ? "review" :
    state === "scheduled" ? "scheduled" : "ok";
  if (severity === "critical" || severity === "review") courses[key][severity]++;
  rows.push({ id: l.id, slug: l.slug, title: l.title, area: l.area, course: l.course,
    grade: l.gradeLabel, state, route: routeOf(l), severity,
    theorySlides: Array.isArray(theory) ? theory.length : null,
    exercises: exercises.length, hasFormula: Boolean(l.keyFormula?.trim()),
    supplementaryTheory: Boolean(guides[l.slug]) && theory.length === 0,
    supplementaryPractice: Boolean(originalPractices[l.slug]) && exercises.length === 0,
    flags });
}
for (const l of full) if (!seen.has(l.slug)) {
  levels.critical++;
  rows.push({ slug: l.slug, title: l.title, state: l.publishStatus, severity: "critical",
    route: routeOf(l), flags: [{ severity: "critical", code: "ORPHAN_FULL", info: "No existe en el índice" }] });
}
const csvEscape = s => '"' + String(s ?? "").replaceAll('"', '""') + '"';
const csvColumns = ["slug", "title", "area", "course", "grade", "state", "severity",
  "theorySlides", "exercises", "hasFormula", "route", "flags"];
const csv = [csvColumns.join(","), ...rows.map(r => csvColumns.map(c =>
  csvEscape(c === "flags" ? (r.flags || []).map(f => f.code).join("|") : r[c])).join(","))].join("\n");
const report = {
  generatedAt: new Date().toISOString(), source: "content/catalog/lessons-*.json",
  counts, levels, courses, lessons: rows
};
writeFileSync(join(out, "catalog-628.json"), JSON.stringify(report, null, 2));
writeFileSync(join(out, "catalog-628.csv"), csv);
const summary = [
  "# Auditoría estructural de las 628 lecciones",
  "", "Fecha UTC: " + report.generatedAt,
  "", "**Cobertura:** " + rows.length + " registros. No se publicó ninguna lección programada.",
  "",
  "| Indicador | Resultado |", "|---|---:|",
  ...Object.entries(counts).map(([k,v]) => "| " + k + " | " + v + " |"),
  "", "## Distribución por asignatura",
  "", "| Área / curso | Publicadas | Programadas | Revisión | Críticas |",
  "|---|---:|---:|---:|---:|",
  ...Object.entries(courses).map(([k,v]) =>
    "| " + k + " | " + v.published + " | " + v.scheduled + " | " + v.review + " | " + v.critical + " |"),
  "", "## Lecciones que requieren revisión de contenido",
  "",
  ...rows.filter(r => r.severity === "review" || r.severity === "critical").map(r =>
    "- **" + r.title + "** (" + r.slug + "): " +
    r.flags.filter(f => f.severity !== "scheduled").map(f => f.info).join("; ")),
  "",
  "Las lecciones programadas sin contenido no se clasifican como páginas aprobadas.",
  "Los problemas de claves y alternativas son indicaciones para revisión docente, no autorizan generar respuestas.",
  "Los resultados individuales de las 628 lecciones están en catalog-628.csv y catalog-628.json.",
  "",
];
writeFileSync(join(out, "resumen-catalogo.md"), summary.join("\n"));
console.log(JSON.stringify({ coverage: rows.length, counts, levels, output: out }, null, 2));
// Fallan únicamente inconsistencias estructurales, nunca el contenido programado.
if (levels.critical > 0) process.exitCode = 1;
