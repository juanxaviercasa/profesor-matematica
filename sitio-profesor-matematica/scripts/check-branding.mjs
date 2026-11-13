import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const files=[
 "app/layout.tsx",
 "app/page.tsx",
 "app/sobre-mi/page.tsx",
 "app/profesor-matematicas-lima/page.tsx",
 "app/empieza/page.tsx",
 "app/clase/funciones-antes-de-calculo/page.tsx",
 "app/cursos/funciones-para-calculo/page.tsx",
 "app/aprende/[area]/[curso]/[slug]/page.tsx",
 "components/site.tsx",
 "lib/lead-message.ts",
 "public/llms.txt",
 "BRAND-GUIDE.md",
 "public/brand/youtube-banner.svg",
 "public/brand/youtube-thumbnail-template.svg",
 "public/brand/vertical-cover-template.svg",
 "public/brand/zenit-lockup.svg",
 "public/content/semana-01/youtube-funciones-antes-calculo.svg",
 "public/content/semana-01/tiktok-01-f3.svg",
 "public/content/semana-01/tiktok-02-sube-o-baja.svg",
 "public/content/semana-01/tiktok-03-predice.svg",
];
for(const f of files) {
 const src=readFileSync(path.join(root,f),"utf8");
 assert.doesNotMatch(src,/Juan Xavier\s+(?:Cabello|Salirrosas|Cobiestro)|(?:Profesor|Profe)\s+Juan Xavier|cabellosalirrosas@gmail\.com|juan-xavier-cabello\.jpg/gi,
   "Identidad pública anterior encontrada: "+f);
}
const layout=readFileSync(path.join(root,"app/layout.tsx"),"utf8");
assert.match(layout,/authors: \[\{ name: "Juan Xavier"/);
assert.match(layout,/name: "Juan Xavier"/);
const header=readFileSync(path.join(root,"components/site.tsx"),"utf8");
assert.match(header, /<b>Sistema Zénit<\/b>/);
assert.match(header, /<small>Comprende para llegar más alto.<\/small>/);
assert.match(header, /src="\/brand\/zenit-phoenix\.svg"/);
const phoenix=readFileSync(path.join(root,"public/brand/zenit-phoenix.svg"),"utf8");
assert.match(phoenix,/viewBox="470 105 1090 1840"/);
const lockup=readFileSync(path.join(root,"public/brand/zenit-lockup.svg"),"utf8");
assert.match(lockup,/Comprende para llegar más alto./);
for (const branded of ["components/site.tsx", "app/page.tsx", "public/brand/zenit-lockup.svg", "BRAND-GUIDE.md", "public/brand/youtube-banner.svg", "public/brand/vertical-cover-template.svg"]) {
  assert.doesNotMatch(readFileSync(path.join(root, branded), "utf8"),
    /Logra tus metas|LOGRA TUS METAS/,
    "Eslogan antiguo detectado en " + branded);
}

const favicon=readFileSync(path.join(root,"public/favicon.svg"),"utf8");
assert.match(favicon,/id="flame"/);
assert.match(header,/© 2026 Juan Xavier · Sistema Zénit/);
const email=readFileSync(path.join(root,"lib/lead-message.ts"),"utf8");
assert.match(email,/CONTACT_EMAIL = "contacto@sistemazenit\.com"/);
const site=readFileSync(path.join(root,"app/page.tsx"),"utf8");
assert.ok(site.includes('src="/juan-xavier.jpg"'));
assert.ok(existsSync(path.join(root,"public/juan-xavier.jpg")),"La fotografía de Juan Xavier debe mantenerse accesible");
assert.ok(!existsSync(path.join(root,"public/juan-xavier-cabello.jpg")),"El nombre anterior del archivo no debe persistir");
console.log("✓ Marca: fénix y nuevo lema en header/footer; autoría de Juan Xavier conservada.");
