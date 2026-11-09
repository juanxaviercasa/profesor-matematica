import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { verifyWorkerOutput } from "./verify-worker-output.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));

try {
  const artifact = verifyWorkerOutput();
  console.log("Desplegando Worker SSR (no solo dist/client):", artifact.config);
  const wrangler = fileURLToPath(new URL("../node_modules/wrangler/bin/wrangler.js", import.meta.url));
  const result = spawnSync(process.execPath, [
    wrangler, "deploy", "--config", artifact.config, ...process.argv.slice(2),
  ], { cwd: root, stdio: "inherit", env: process.env });
  if (result.error) throw result.error;
  process.exitCode = result.status ?? 1;
} catch (error) {
  console.error("Despliegue detenido:", error.message);
  process.exitCode = 1;
}
