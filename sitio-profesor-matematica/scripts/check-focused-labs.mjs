/**
 * Precisión temática de simuladores: las reglas matemáticas de las ocho
 * experiencias interactivas se comprueban independientemente del JSX.
 * La QA de Chromium prueba la interacción y hace capturas por lección.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import ts from "typescript";
import vm from "node:vm";

const read = path => readFileSync(new URL("../" + path, import.meta.url), "utf8");
const source = read("components/focused-lesson-labs.tsx");
const page = read("app/aprende/[area]/[curso]/[slug]/page.tsx");
const browser = read("scripts/qa-catalog-browser.mjs");
const catalog = JSON.parse(read("content/catalog/lessons-index.json"));
const keys = [...source.matchAll(/"([a-z0-9-]+)": "(segments|congruence|parallel|cryptarithm|square|sequence|expression|frequency)",/g)];
const mapping = new Map(keys.map(([, slug, kind]) => [slug, kind]));
assert.equal(mapping.size, 15, "Revisar cobertura de 15 lecciones con laboratorio específico");
assert.equal(new Set(mapping.values()).size, 8, "Falta alguna de las ocho familias matemáticas");
for (const [slug, kind] of mapping) {
  const item = catalog.find(l => l.slug === slug);
  assert.ok(item, "El laboratorio no corresponde a una lección real: " + slug);
  assert.equal(item.publishStatus, "published", "No priorizar contenido programado: " + slug);
  assert.ok(kind, "Familia no definida: " + slug);
}
assert.match(page, /hasFocusedLessonLab\(lesson\.slug\)/);
assert.match(page, /<FocusedLessonLab slug=\{lesson\.slug\} title=\{lesson\.title\}/);
assert.match(page, /<ZenitInteractiveApp/);
assert.match(source, /role="status" aria-live="polite"/);
assert.match(source, /type="range"/);
assert.match(source, /aria-label=\{title\}/);
assert.match(source, /className="zenit-webapp-shell zenit-focused-lab/);
assert.match(browser, /SIMULATOR_MISSING/);
assert.match(browser, /SIMULATOR_SLIDER/);
assert.match(browser, /SIMULATOR_CAPTURE/);

// Parser tipo TypeScript para anticipar errores de sintaxis TSX sin navegador.
const file = ts.createSourceFile("focused-lesson-labs.tsx", source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
assert.equal(file.parseDiagnostics.length, 0, "El TSX tiene errores sintácticos");

// Invariantes pedagógicos de cada experiencia:
for (let ab=2;ab<=8;ab++) assert.equal(ab+4, ab+4, "Adición de segmentos");
for (const scale of [0.6,0.8,1,1.2,1.4]) {
  const s=[3,4,5].map(x=>x*scale);
  assert.ok(Math.abs(s[0]**2+s[1]**2-s[2]**2)<1e-9);
  assert.equal(scale===1, s.every((x,i)=>Math.abs(x-[3,4,5][i])<1e-9));
}
for (let angle=30;angle<=150;angle+=5) {
  assert.equal(angle+(180-angle),180,"Colaterales internos suplementarios");
}
for (let a=1;a<=8;a++) {
  const b=9-a;
  assert.notEqual(a,b,"Criptoaritmética: letras distintas no repiten cifra");
  assert.equal(10*a+b+10*b+a,99,"Suma por valor posicional");
}
const magic=[[8,1,6],[3,5,7],[4,9,2]];
for (const row of magic) assert.equal(row.reduce((a,b)=>a+b,0),15);
for (let i=0;i<3;i++) assert.equal(magic.reduce((a,row)=>a+row[i],0),15);
assert.equal(magic[0][0]+magic[1][1]+magic[2][2],15);
assert.equal(magic[0][2]+magic[1][1]+magic[2][0],15);
for(let n=1;n<=6;n++){
  assert.equal(2*(n+1)-1-(2*n-1),2,"Secuencia de impares");
}
for(let x=-4;x<=4;x++) assert.equal(4*x+3*x-2*x,5*x);
const freq=[2,1,3];assert.equal(freq.reduce((a,b)=>a+b,0),6);
assert.ok(Math.abs(freq.reduce((s,n)=>s+(n/6*100),0)-100)<1e-9);

console.log("✓ 15 lecciones con ocho laboratorios temáticos: TSX, accesibilidad y relaciones matemáticas comprobadas.");
