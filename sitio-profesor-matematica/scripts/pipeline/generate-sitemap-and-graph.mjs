import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "../..");

const baseUrl = "https://funciones-para-calculo.j76018445.chatgpt.site";
const staticUrls = [
  "",
  "/aprende",
  "/blog",
  "/herramientas",
  "/diagnostico/funciones",
  "/laboratorio",
  "/cursos/funciones-para-calculo",
  "/webinars/funciones-antes-del-calculo",
  "/sobre-mi",
  "/profesor-matematicas-lima"
];

const indexPath = path.join(rootDir, "content/catalog/lessons-index.json");
const lessonsIndex = fs.existsSync(indexPath)
  ? JSON.parse(fs.readFileSync(indexPath, "utf-8"))
  : [];

const publishedLessons = lessonsIndex.filter((l) => l.publishStatus === "published");
const allUrls = new Set(staticUrls);

for (const lesson of lessonsIndex) {
  allUrls.add(`/aprende/${lesson.area}`);
  allUrls.add(`/aprende/${lesson.area}/${lesson.course}`);
}

for (const lesson of publishedLessons) {
  allUrls.add(`/aprende/${lesson.area}/${lesson.course}/${lesson.slug}`);
}

const today = new Date().toISOString().split("T")[0];
let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

for (const u of allUrls) {
  sitemap += `  <url>\n    <loc>${baseUrl}${u}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>${u === "" ? "1.0" : "0.8"}</priority>\n  </url>\n`;
}

sitemap += `</urlset>\n`;

const sitemapPath = path.join(rootDir, "public/sitemap.xml");
fs.writeFileSync(sitemapPath, sitemap, "utf-8");
console.log(`✓ Sitemap XML generado exitosamente en ${sitemapPath} (${allUrls.size} URLs activas)`);

const graphData = {
  version: "2.0.0",
  generatedAt: new Date().toISOString(),
  totalLessons: lessonsIndex.length,
  publishedLessons: publishedLessons.length,
  scheduledLessons: lessonsIndex.length - publishedLessons.length,
  baseUrl,
  nodes: lessonsIndex.map((l) => ({
    id: l.id,
    slug: l.slug,
    title: l.title,
    area: l.area,
    course: l.course,
    grade: l.grade,
    appEngine: l.appEngine,
    publishStatus: l.publishStatus,
    onionLayer: l.onionLayer,
    exerciseCount: (l.f0Count || 0) + (l.faCount || 0)
  }))
};

const graphPath = path.join(rootDir, "public/knowledge-graph.json");
fs.writeFileSync(graphPath, JSON.stringify(graphData, null, 2), "utf-8");
console.log(`✓ Knowledge Graph generado en ${graphPath} (${lessonsIndex.length} nodos)`);
