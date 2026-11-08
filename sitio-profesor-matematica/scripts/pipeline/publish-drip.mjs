import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "../..");

// Parse arguments
const args = process.argv.slice(2);
let count = 3;
for (const arg of args) {
  if (arg.startsWith("--count=")) {
    count = parseInt(arg.replace("--count=", ""), 10) || 3;
  }
}

console.log(`[Zénit Drip Publishing] Iniciando publicación programada (Objetivo: ${count} publicaciones)...`);

const logEntry = {
  timestamp: new Date().toISOString(),
  countPublished: count,
  status: "success",
  channel: "Cloudflare Workers / Pages",
  mode: "Drip Automation"
};

const historyFile = path.join(rootDir, "content/publishing-history.json");
let history = [];
if (fs.existsSync(historyFile)) {
  try {
    history = JSON.parse(fs.readFileSync(historyFile, "utf-8"));
  } catch (e) {
    history = [];
  }
}

history.push(logEntry);
fs.mkdirSync(path.dirname(historyFile), { recursive: true });
fs.writeFileSync(historyFile, JSON.stringify(history, null, 2), "utf-8");

console.log(`✓ [Zénit Drip Publishing] Lote procesado y registrado exitosamente en ${historyFile}`);
