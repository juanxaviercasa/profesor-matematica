import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
const read = (p) => readFileSync(new URL("../" + p, import.meta.url), "utf8");
const home = read("app/page.tsx");
const about = read("app/sobre-mi/page.tsx");
const contact = read("app/contacto/page.tsx");
const tools = read("app/herramientas/page.tsx");
const start = read("app/empieza/page.tsx");
const local = read("app/profesor-matematicas-lima/page.tsx");
const offer = read("app/cursos/funciones-para-calculo/page.tsx");
const css = read("app/public-pages.css");
const layout = read("app/layout.tsx");

assert.match(layout, /import "\.\/public-pages\.css"/);
for (const name of ["home-start", "public-tools-hero", "public-method-grid", "public-faq-item", "public-local-cta"]) {
  assert.ok(css.includes(name), "Falta un estilo público: " + name);
}
for (const p of [home, about, contact, tools, local]) {
  assert.match(p, /export const metadata: Metadata/, "Página pública sin metadata descriptiva");
}
assert.match(home, /home-start-grid/);
assert.match(home, /home-teacher-portrait/);
assert.match(home, /alt="Retrato del profesor Juan Xavier/);
assert.ok(existsSync(new URL("../public/juan-xavier-cabello.jpg", import.meta.url)));
assert.match(about, /public-method-grid/);
assert.match(about, /juan-xavier-cabello\.jpg/);
assert.match(contact, /public-contact-steps/);
assert.match(contact, /<ConversionForm\/>/);
assert.match(tools, /<HerramientasInteractiveHub/);
assert.match(tools, /id="herramientas"/);
assert.doesNotMatch(tools, /DESPLIEGUE DIRECTO DÍA 1|desde el primer día los/);
assert.doesNotMatch(local, /PlaceholderNote|Dato pendiente:/);
assert.match(local, /Las modalidades, horarios y tarifas se confirman/);
assert.doesNotMatch(start, /youtube\.com\/results\?search_query|href=\{youtubeSearch\}/);
assert.match(start, /\/clase\/funciones-antes-de-calculo/);
assert.match(offer, /<details className="public-faq-item"/);
assert.doesNotMatch(offer, /Garantía de claridad propuesta/);
assert.match(offer, /Las condiciones de inscripción se confirman/);
const hrefs=[...Object.values({home,about,contact,tools,start,local,offer}).join("\n").matchAll(/href="(\/[^"#?]+)(?:[?#][^"]*)?"/g)].map(x=>x[1]);
for(const href of new Set(hrefs)){
  const p=href.replace(/\/$/, "") || "/";
  assert.ok(existsSync(new URL("../app"+(p==="/"?"":p)+"/page.tsx",import.meta.url)), "Enlace interno no encontrado: " + href);
}
console.log("✓ Capa 04: siete páginas, enlaces internos, credibilidad y componentes verificados.");
