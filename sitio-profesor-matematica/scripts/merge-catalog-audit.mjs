import { readdirSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve, join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const project = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dir = resolve(project, process.env.CATALOG_MERGE_DIR || ".catalog-merged");
mkdirSync(dir, { recursive: true });
const json = path => JSON.parse(readFileSync(path, "utf8"));
const paths = readdirSync(dir).filter(p => /^browser-shard-\d+\.json$/.test(p)).sort();
const shards = paths.map(p => json(join(dir, p)));
const inventory = json(join(dir, "static", "catalog-628.json"));
const expected = inventory.counts.total;
const listed = inventory.lessons;
const combined = shards.flatMap(s => s.lessons);
const bySlug = new Map();
const duplicate = [];
for (const record of combined) {
  if (bySlug.has(record.slug)) duplicate.push(record.slug);
  bySlug.set(record.slug, record);
}
const missing = listed.filter(l => !bySlug.has(l.slug));
const unregistered = combined.filter(l => !listed.some(m => m.slug === l.slug));
const findings = combined.flatMap(x => x.checks.flatMap(c => c.findings));
const grouped = {};
for (const lesson of combined) {
  const key = lesson.area + "/" + lesson.course;
  const item = grouped[key] ||= { total: 0, published: 0, scheduled: 0, error: 0, review: 0 };
  item.total++;
  item[lesson.state]++;
  if (lesson.severity === "error") item.error++;
  if (lesson.severity === "review") item.review++;
}
const counters = {};
for (const issue of findings) {
  const key = issue.code;
  counters[key] = (counters[key] || 0) + 1;
}
const summary = {
  createdAt: new Date().toISOString(), expected, complete: combined.length === expected &&
    !duplicate.length && !missing.length && !unregistered.length,
  shards: paths.length, static: inventory.counts,
  browser: {
    checkedLessons: combined.length, published: combined.filter(l => l.state === "published").length,
    scheduled: combined.filter(l => l.state === "scheduled").length,
    checkedViews: combined.reduce((n, l) => n + l.checks.length, 0),
    errors: findings.filter(f => f.severity === "error").length,
    warnings: findings.filter(f => f.severity === "warning").length,
    countsByCode: counters,
    missing: missing.map(l => l.slug), duplicate, unregistered: unregistered.map(l => l.slug),
    courses: grouped,
  }
};
const columns = ["slug","title","area","course","state","severity","mobileHttp","desktopHttp",
  "mobileOverflow","desktopOverflow","mobileFormulaScroll","mobileFormulaContrast","accessibilitySerious"];
const csvEscape = v => '"' + String(v ?? "").replaceAll('"', '""') + '"';
const cells = (row) => {
  const mobile = row.checks.find(c => c.viewport === "movil-390") || {};
  const desktop = row.checks.find(c => c.viewport === "escritorio-1440") || {};
  return [
    row.slug,row.title,row.area,row.course,row.state,row.severity,mobile.status,desktop.status,
    mobile.documentOverflow,desktop.documentOverflow,mobile.formulaOverflow,mobile.weakFormulaContrast,
    mobile.axeSerious
  ];
};
writeFileSync(join(dir,"auditoria-628-completa.csv"),
  [columns.join(","), ...combined.map(l => cells(l).map(csvEscape).join(","))].join("\n"));
writeFileSync(join(dir,"resumen-general.json"), JSON.stringify(summary,null,2));
const markdown = [
  "# Auditoría integral de las 628 lecciones — Sistema Zénit",
  "", "**Generada:** " + summary.createdAt,
  "", "**Cobertura:** " + combined.length + "/" + expected + " lecciones del catálogo. " +
    (summary.complete ? "✅ Censo completo." : "❌ Faltan rutas o hay duplicados."),
  "Cada lección publicada se comprueba en 320, 390 y 1440 px; cada programada en 390 y 1440 px.",
  "Las páginas se abren contra el Worker compilado localmente; no se publican las programadas.",
  "",
  "## Resumen",
  "", "| Métrica | Resultado |", "|---|---:|",
  "| Publicadas | " + summary.browser.published + " |",
  "| Programadas | " + summary.browser.scheduled + " |",
  "| Vistas de navegador | " + summary.browser.checkedViews + " |",
  "| Hallazgos graves | " + summary.browser.errors + " |",
  "| Advertencias | " + summary.browser.warnings + " |",
  "| Registros sin ficha completa | " + summary.static.missingFull + " |",
  "| Lecciones publicadas sin teoría | " + summary.static.publishedMissingTheory + " |",
  "| Lecciones publicadas sin ejercicios | " + summary.static.publishedMissingExercises + " |",
  "| Claves sin alternativa correspondiente | " + summary.static.answerKeysWithoutOptions + " |",
  "",
  "## Hallazgos por tipo",
  "", "| Código | Incidencias (pueden repetirse por pantalla) |",
  "|---|---:|",
  ...Object.entries(counters).sort((a,b)=>b[1]-a[1]).map(([k,v])=>"| "+k+" | "+v+" |"),
  "", "## Distribución por área",
  "", "| Área | Lecciones | Publicadas | Programadas | Con errores | Para revisar |",
  "|---|---:|---:|---:|---:|---:|",
  ...Object.entries(grouped).sort((a,b)=>a[0].localeCompare(b[0])).map(([k,v])=>
    "| "+k+" | "+v.total+" | "+v.published+" | "+v.scheduled+" | "+v.error+" | "+v.review+" |"),
  "", "## Páginas que requieren corrección",
  "",
  ...combined.filter(l=>l.severity!=="ok").slice(0,200).map(l=>
    "- **"+l.slug+"** ("+l.state+") — "+l.severity+": "+
    l.checks.flatMap(c=>c.findings).slice(0,4).map(x=>x.code+" "+x.message).join("; ")),
  "",
  "## Archivos individuales",
  "",
  "- catalog-628.csv / catalog-628.json — censo estructural por lección.",
  "- auditoria-628-completa.csv — resultado de navegador y fórmulas por lección.",
  "- browser-shard-0.json ... browser-shard-N.json — mediciones y hallazgos por resolución.",
  "- screen-*.png — capturas seleccionadas, incluidas las páginas con errores.",
  "",
  "Los hallazgos de contenido requieren revisión docente. No se generan respuestas ni teoría artificial.",
  "Una prueba sin hallazgos automatizados no equivale a una revisión visual humana exhaustiva de todos los gráficos.",
];
writeFileSync(join(dir,"informe-integral.md"), markdown.join("\n"));
console.log(JSON.stringify(summary,null,2));
if (!summary.complete) process.exitCode = 1;
