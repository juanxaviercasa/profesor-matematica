import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { resolve, dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const dist = resolve(projectRoot, "dist");

// Verify server-side Worker AND client assets before allowing a deploy.
export function verifyWorkerOutput() {
  if (!existsSync(dist)) throw new Error("No existe dist. Ejecuta npm run build.");
  const candidates = [];
  function walk(directory, depth) {
    if (depth > 3 || !existsSync(directory)) return;
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const child = join(directory, entry.name);
      if (entry.isDirectory()) walk(child, depth + 1);
      if (entry.isFile() && entry.name === "wrangler.json") candidates.push(child);
    }
  }
  walk(dist, 0);
  const valid = [];
  const errors = [];
  for (const configPath of candidates) {
    try {
      const cfg = JSON.parse(readFileSync(configPath, "utf8"));
      if (cfg.name !== "profesor-matematica") throw new Error("Nombre Worker incorrecto: " + cfg.name);
      if (!cfg.compatibility_flags?.includes("nodejs_compat")) throw new Error("Falta nodejs_compat");
      if (!cfg.main || typeof cfg.main !== "string") throw new Error("Worker SSR ausente");
      const server = resolve(dirname(configPath), cfg.main);
      if (!existsSync(server) || !statSync(server).isFile()) throw new Error("No existe servidor: " + server);
      if (typeof cfg.assets?.directory !== "string") throw new Error("No existe assets.directory");
      const client = resolve(dirname(configPath), cfg.assets.directory);
      if (!existsSync(client) || !statSync(client).isDirectory()) throw new Error("No existe cliente: " + client);
      valid.push({config:configPath,server,client});
    } catch(err) {
      errors.push(relative(projectRoot,configPath) + ": " + err.message);
    }
  }
  if (valid.length !== 1) throw new Error("Worker inválido o ambiguo: " + valid.length + ". " + errors.join(" | "));
  return valid[0];
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const o = verifyWorkerOutput();
    console.log("OK: Worker SSR y archivos estáticos completos.");
    console.log("Config:", relative(projectRoot, o.config));
    console.log("Servidor:", relative(projectRoot, o.server));
    console.log("Estáticos:", relative(projectRoot, o.client));
  } catch(err) {
    console.error("ERROR en compilación de Cloudflare:", err.message);
    process.exitCode = 1;
  }
}
