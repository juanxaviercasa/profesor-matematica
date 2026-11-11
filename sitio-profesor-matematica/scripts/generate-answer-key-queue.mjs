/**
 * Cola de revisión de alternativas de fichas fuente.
 * Nunca corrige letras A-E ni inventa alternativas; genera evidencias privadas
 * para contrastar cada ejercicio con sus PDFs / PPTX originales.
 */
import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root=resolve(dirname(fileURLToPath(import.meta.url)),"..");
const out=resolve(root,process.env.CATALOG_AUDIT_DIR || ".catalog-audit");
mkdirSync(out,{recursive:true});
const load=name=>JSON.parse(readFileSync(join(root,"content/catalog",name),"utf8"));
const index=load("lessons-index.json");
const full=load("lessons-full.json");
const published=new Set(index.filter(l=>l.publishStatus==="published").map(l=>l.slug));
const missing=[];
for(const lesson of full){
  if(!published.has(lesson.slug))continue;
  for(const [bank,items] of [["F0",lesson.exercisesF0],["FA",lesson.exercisesFA]]){
    if(!Array.isArray(items))continue;
    for(const [position,exercise] of items.entries()){
      if(typeof exercise.answerKey!=="string")continue;
      const answer=exercise.answerKey.trim().match(/^([A-E])\.?$/i);
      if(!answer||!Array.isArray(exercise.options))continue;
      const letter=answer[1].toUpperCase();
      const expectedIndex=letter.charCodeAt(0)-65;
      if(expectedIndex<exercise.options.length)continue;
      missing.push({
        slug:lesson.slug, title:lesson.title, course:lesson.course,
        grade:lesson.gradeLabel, bank, position:position+1,
        number:exercise.number, key:letter, optionsLoaded:exercise.options.length,
        statement:String(exercise.statement||"").trim().slice(0,200),
        sources:lesson.sourceFiles||{},
        route:"/aprende/"+lesson.area+"/"+lesson.course+"/"+lesson.slug
      });
    }
  }
}
missing.sort((a,b)=>a.slug.localeCompare(b.slug)||a.bank.localeCompare(b.bank)||a.position-b.position);
const csv=(v)=>'"'+String(v??"").replaceAll('"','""')+'"';
const fields=["slug","title","course","grade","bank","position","number","key","optionsLoaded","statement","route"];
writeFileSync(join(out,"cola-claves.csv"),[
 fields.join(","),...missing.map(r=>fields.map(f=>csv(r[f])).join(","))
].join("\n"));
writeFileSync(join(out,"cola-claves.json"),JSON.stringify({
 generatedAt:new Date().toISOString(),cases:missing.length,
 lessons:new Set(missing.map(r=>r.slug)).size,
 status:"pending-source-verification",records:missing
},null,2));
const md=[
 "# Revisión docente: claves con alternativas incompletas",
 "",
 "**Estado:** Pendiente de contrastar con la ficha original, no es un fallo del sistema de calificación.",
 "**Fecha UTC:** "+new Date().toISOString(),
 "**Incidencias:** "+missing.length+" en "+new Set(missing.map(r=>r.slug)).size+" lecciones publicadas.",
 "",
 "La clave A-E aparece en el catálogo, pero la alternativa correspondiente no está cargada. Nunca inventar opciones ni dar una calificación automática para estos casos.",
 "El ordinal de banco permite diferenciar ejercicios con el mismo número en F0 y FA.",
 "",
 "| Lección | Banco y posición | Problema | Clave fuente | Opciones cargadas |",
 "|---|---|---|---|---:|",
 ...missing.map(r=>"| "+r.slug+" | "+r.bank+" / "+r.position+" | #"+r.number+" | "+r.key+" | "+r.optionsLoaded+" |"),
 "",
 "## Procedimiento de cierre",
 "",
 "1. Localizar la ficha original mediante el campo sources del JSON; cotejar enunciado, diagrama y alternativas A–E.",
 "2. Completar únicamente las alternativas demostrables y la notación matemática; conservar clave original salvo evidencia de error.",
 "3. Verificar visualmente el ejercicio en móvil y escritorio, además del orden de alternativas y puntuación.",
 "4. Ejecutar npm run check:learning y reabrir la auditoría del catálogo.",
 "",
 "Este informe se conserva en los artefactos privados de GitHub Actions; no debe mostrarse al estudiante."
];
writeFileSync(join(out,"cola-claves.md"),md.join("\n"));
console.log("✓ Cola de verificación de fichas originales: "+
 missing.length+" incidencias en "+new Set(missing.map(r=>r.slug)).size+" lecciones; archivos CSV/JSON/Markdown.");
