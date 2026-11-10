import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const read=p=>readFileSync(new URL("../"+p,import.meta.url),"utf8");
const publicFiles={
  "Inicio de aprendizaje":"app/aprende/page.tsx",
  "Área de estudio":"app/aprende/[area]/page.tsx",
  "Curso":"app/aprende/[area]/[curso]/page.tsx",
  "Biblioteca":"components/blog-constructor-explorer.tsx",
  "Herramientas":"components/herramientas-hub.tsx",
  "Introducción de herramientas":"app/herramientas/page.tsx",
  "Simuladores":"components/zenit-app-engines.tsx",
  "Práctica adicional":"components/infinite-problem-generator.tsx",
  "Descripción del área":"lib/catalog-index.ts"
};
const internalCopy=[
  /modelo cebolla/i,/arquitectura tipo pulpo/i,/refinamiento por capas/i,
  /temas poblados/i,/lecciones extraídas/i,/constructor de blog/i,
  /cobertura curricular del motor/i,/activo en constructor/i,
  /Cola \+\$\{topic\.dripBatch\}d/i,/Fichas F0\/FA/i,
  /\d+ diapos ·/i,/GitHub Actions → Cloudflare/i,
  /\[Generado #\$\{seed\}\]/i,/12 motores especializados/i,
  /lecciones conectadas/i,/fichas nivel cero\/avanzado/i,
  /ejercicios F0\/FA/i,/temas en desarrollo/i
];
for(const [label,path] of Object.entries(publicFiles)){
  const content=read(path);
  for(const pattern of internalCopy){
    assert.doesNotMatch(content,pattern,label+": descripción interna todavía expuesta: "+pattern);
  }
}
const aprende=read(publicFiles["Inicio de aprendizaje"]);
const curso=read(publicFiles["Curso"]);
const blog=read(publicFiles["Biblioteca"]);
const herramientas=read(publicFiles["Herramientas"]);
const problemas=read(publicFiles["Práctica adicional"]);
assert.match(aprende,/Lee explicaciones, resuelve ejercicios y practica/);
assert.match(curso,/Temas por grado/);
assert.match(curso,/Listo para estudiar/);
assert.match(blog,/Filtrar por herramienta interactiva:/);
assert.match(herramientas,/TEMAS RELACIONADOS/);
assert.match(herramientas,/Ver todas las lecciones/);
assert.match(problemas,/Ejercicio de práctica/);
assert.match(read(publicFiles["Descripción del área"]),/Estudia aritmética, álgebra, geometría/);
console.log("✓ Textos públicos revisados: sin jerga interna, procesos de desarrollo ni contadores de publicación.");
