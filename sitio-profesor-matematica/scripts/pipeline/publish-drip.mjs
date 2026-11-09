import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "../..");

const args = process.argv.slice(2);
let count = 3;
for (const arg of args) {
  if (arg.startsWith("--count=")) {
    count = parseInt(arg.replace("--count=", ""), 10) || 3;
  }
}

const fullPath = path.join(rootDir, "content/catalog/lessons-full.json");
const indexPath = path.join(rootDir, "content/catalog/lessons-index.json");

if (!fs.existsSync(fullPath) || !fs.existsSync(indexPath)) {
  console.error("Catálogo no encontrado. Ejecuta primero extract-books-az.py");
  process.exit(1);
}

const lessonsFull = JSON.parse(fs.readFileSync(fullPath, "utf-8"));
const lessonsIndex = JSON.parse(fs.readFileSync(indexPath, "utf-8"));

const newlyPublishedSlugs = [];
for (const item of lessonsFull) {
  if (item.publishStatus === "scheduled" && newlyPublishedSlugs.length < count) {
    item.publishStatus = "published";
    newlyPublishedSlugs.push(item.slug);
  }
}

if (newlyPublishedSlugs.length === 0) {
  console.log("✓ [Zénit Drip] No quedan lecciones programadas: no se modificaron archivos.");
  process.exit(0);
}

const slugSet = new Set(newlyPublishedSlugs);
for (const idxItem of lessonsIndex) {
  if (slugSet.has(idxItem.slug)) {
    idxItem.publishStatus = "published";
  }
}

fs.writeFileSync(fullPath, JSON.stringify(lessonsFull, null, 2), "utf-8");
fs.writeFileSync(indexPath, JSON.stringify(lessonsIndex, null, 2), "utf-8");

const totalPublished = lessonsIndex.filter(l => l.publishStatus === "published").length;
const totalScheduled = lessonsIndex.length - totalPublished;

const historyFile = path.join(rootDir, "content/publishing-history.json");
let history = [];
if (fs.existsSync(historyFile)) {
  try {
    history = JSON.parse(fs.readFileSync(historyFile, "utf-8"));
  } catch {
    history = [];
  }
}

history.push({
  timestamp: new Date().toISOString(),
  countPublished: newlyPublishedSlugs.length,
  publishedSlugs: newlyPublishedSlugs,
  totalPublishedNow: totalPublished,
  remainingScheduled: totalScheduled,
});
fs.writeFileSync(historyFile, JSON.stringify(history, null, 2), "utf-8");

console.log(
  `✓ [Zénit Drip] Publicadas ${newlyPublishedSlugs.length} nuevas lecciones (${totalPublished} publicadas / ${totalScheduled} en cola).`
);

// Auto-regenerate sitemap and knowledge graph
import { execSync } from "node:child_process";
try {
  execSync(`node "${path.join(__dirname, "generate-sitemap-and-graph.mjs")}"`, {
    stdio: "inherit",
    cwd: rootDir,
  });
} catch (err) {
  console.warn("No se pudo regenerar sitemap y graph automáticamente:", err.message);
}
