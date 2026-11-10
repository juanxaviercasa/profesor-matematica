/**
 * Publicación segura del catálogo. No expone lecciones programadas por URL
 * directa, enlaces relacionados o navegación secuencial.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const read = path => readFileSync(new URL("../" + path, import.meta.url), "utf8");
const index = JSON.parse(read("content/catalog/lessons-index.json"));
const full = JSON.parse(read("content/catalog/lessons-full.json"));
const page = read("app/aprende/[area]/[curso]/[slug]/page.tsx");
const catalog = read("lib/catalog-index.ts");
const browser = read("scripts/qa-catalog-browser.mjs");

assert.equal(index.length, full.length, "Índice y fichas completas no coinciden");
const records = new Map(full.map(l => [l.slug, l]));
const published = index.filter(l => l.publishStatus === "published");
const scheduled = index.filter(l => l.publishStatus === "scheduled");
assert.ok(published.length > 0 && scheduled.length > 0);
for (const l of index) {
  assert.ok(records.has(l.slug), "Ficha inexistente: " + l.slug);
}
assert.match(page, /catalogLesson\?\.publishStatus === "scheduled"/);
assert.match(page, /robots: \{ index: false, follow: false \}/);
assert.match(page, /lesson\.publishStatus !== "published"/);
assert.match(page, /lesson\.area !== areaSlug \|\| lesson\.course !== cursoSlug/);
assert.match(page, /notFound\(\);/);
assert.match(page, /getLessonsByCourse\(lesson\.course\)\.filter\(l => l\.publishStatus === "published"\)/);
assert.match(page, /l && l\.publishStatus === "published"/);
assert.match(catalog, /visibleLessons = LESSONS_INDEX\.filter\(item => item\.publishStatus === "published"\)/);
assert.match(browser, /lesson\.publishStatus === "scheduled" && result\.status !== 404/);
assert.match(browser, /HTTP_SCHEDULED/);
console.log("✓ Publicación segura: " + published.length + " visibles, " + scheduled.length +
  " programadas protegidas por HTTP 404 y fuera de enlaces relacionados.");
