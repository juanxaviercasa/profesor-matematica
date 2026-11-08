import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "../..");

// Import curriculum data
const curriculumPath = path.join(rootDir, "lib/curriculum-data.ts");
const rawContent = fs.readFileSync(curriculumPath, "utf-8");

// Extract topic slugs and paths with regex or clean parsing
const baseUrl = "https://funciones-para-calculo.j76018445.chatgpt.site";
const urls = [
  "",
  "/aprende",
  "/diagnostico/funciones",
  "/laboratorio",
  "/cursos/funciones-para-calculo",
  "/webinars/funciones-antes-del-calculo",
  "/sobre-mi",
  "/profesor-matematicas-lima"
];

// Read areas and courses
const areaMatches = [...rawContent.matchAll(/id:\s*"([a-z0-9-]+)",\s*slug:\s*"([a-z0-9-]+)"/g)];
const uniqueSlugs = new Set();

// Extract all area/course/topic paths
const topicRegex = /slug:\s*"([a-z0-9-]+)",/g;
let match;
while ((match = topicRegex.exec(rawContent)) !== null) {
  uniqueSlugs.add(match[1]);
}

// Generate Sitemap XML
const today = new Date().toISOString().split("T")[0];
let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

for (const u of urls) {
  sitemap += `  <url>\n    <loc>${baseUrl}${u}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>${u === "" ? "1.0" : "0.8"}</priority>\n  </url>\n`;
}

sitemap += `</urlset>\n`;

const sitemapPath = path.join(rootDir, "public/sitemap.xml");
fs.writeFileSync(sitemapPath, sitemap, "utf-8");
console.log(`✓ Sitemap XML generado exitosamente en ${sitemapPath}`);

// Generate Knowledge Graph JSON
const graphNodes = [];
const graphEdges = [];

const graphData = {
  version: "1.0.0",
  generatedAt: new Date().toISOString(),
  nodesCount: uniqueSlugs.size,
  baseUrl
};

const graphPath = path.join(rootDir, "public/knowledge-graph.json");
fs.writeFileSync(graphPath, JSON.stringify(graphData, null, 2), "utf-8");
console.log(`✓ Knowledge Graph generado en ${graphPath}`);
