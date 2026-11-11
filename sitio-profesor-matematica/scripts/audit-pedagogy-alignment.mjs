/**
 * Censo de pertinencia pedagógica de 628 lecciones.
 * No confunde cobertura técnica con exactitud matemática: separa
 * práctica específica, práctica genérica, teoría fuente y revisión docente.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import vm from "node:vm";

const root=resolve(dirname(fileURLToPath(import.meta.url)),"..");
const dir=resolve(root,process.env.CATALOG_AUDIT_DIR||".catalog-audit");
mkdirSync(dir,{recursive:true});
const read=p=>readFileSync(join(root,p),"utf8");
const index=JSON.parse(read("content/catalog/lessons-index.json"));
const full=JSON.parse(read("content/catalog/lessons-full.json"));
function getExports(path){
 const source=read(path);
 const code=ts.transpileModule(source,{compilerOptions:{
   module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022
 }}).outputText;
 const sandbox={exports:{}};
 vm.runInNewContext(code,sandbox,{timeout:3000});
 return sandbox.exports;
}
const focused=getExports("lib/focused-lesson-topics.ts").FOCUSED_LABS;
const curricular=new Set(getExports("lib/curricular-problem-generator.ts").CURRICULAR_PROBLEM_SLUGS);
const fullBySlug=new Map(full.map(l=>[l.slug,l]));
const higher=new Set(["calculo-1","calculo-2","calculo-3","ecuaciones-diferenciales"]);
const records=[];
for(const item of index){
 const details=fullBySlug.get(item.slug);
 if(!details)throw Error("Sin ficha: "+item.slug);
 const published=item.publishStatus==="published";
 const totalExercises=(details.exercisesF0||[]).length+(details.exercisesFA||[]).length;
 const missingTheory=!(details.theorySlides||[]).length;
 const missingExercises=totalExercises===0;
 const issueRows=[];
 for(const [bank,bankRows] of [["F0",details.exercisesF0||[]],["FA",details.exercisesFA||[]]]){
  for(const exercise of bankRows){
   const match=String(exercise.answerKey||"").trim().match(/^([A-E])\.?$/i);
   const optionIndex=match?match[1].toUpperCase().charCodeAt(0)-65:-1;
   if(optionIndex>=0 && optionIndex>=(exercise.options||[]).length)
     issueRows.push({bank,number:exercise.number,key:match[1].toUpperCase()});
  }
 }
 const practice=focused[item.slug]?"tema-especifico":
   curricular.has(item.slug)?"unidad-especifica":
   item.course==="quimica"?"quimica-contextual-parcial":
   "plantilla-general";
 const simulator=focused[item.slug]?"tema-especifico":"motor-general";
 const reasons=[];
 if(published){
  if(missingTheory)reasons.push("Sin teoría fuente");
  if(missingExercises)reasons.push("Sin ejercicios fuente");
  if(issueRows.length)reasons.push(issueRows.length+" claves sin opción");
  if(practice==="plantilla-general" && higher.has(item.course))
    reasons.push("Práctica genérica no dedicada al tema universitario");
  if(practice==="plantilla-general" && item.course==="algebra")
    reasons.push("Práctica algebraica general; verificar subtema");
  if(practice==="plantilla-general" && item.course==="razonamiento-matematico")
    reasons.push("Práctica lógica general; verificar subtema");
  if(simulator==="motor-general" && ["algebra-lineal","ecuaciones-diferenciales","fisica"].includes(item.course))
    reasons.push("Simulador de asignatura no especializado");
 }
 const score=published?(
   issueRows.length*6+(missingTheory?3:0)+(missingExercises?3:0)+
   (higher.has(item.course)&&practice==="plantilla-general"?6:0)+
   (simulator==="motor-general"&&["algebra-lineal","ecuaciones-diferenciales","fisica"].includes(item.course)?5:0)
 ):0;
 records.push({slug:item.slug,title:item.title,area:item.area,course:item.course,
  state:item.publishStatus,route:"/aprende/"+item.area+"/"+item.course+"/"+item.slug,
  theorySlides:details.theorySlides?.length||0,sourceExercises:totalExercises,
  practice,simulator,keyIssues:issueRows.length,score,reasons,
  keyDetails:issueRows,hasWorkedSolutions:!!details.workedSolutions?.length});
}
const published=records.filter(r=>r.state==="published");
const info={
 total:records.length,published:published.length,scheduled:records.length-published.length,
 practiceFocused:published.filter(r=>r.practice==="tema-especifico").length,
 practiceCurricular:published.filter(r=>r.practice==="unidad-especifica").length,
 chemistryContextualPartial:published.filter(r=>r.practice==="quimica-contextual-parcial").length,
 practiceGeneral:published.filter(r=>r.practice==="plantilla-general").length,
 focusedVisualLabs:published.filter(r=>r.simulator==="tema-especifico").length,
 generalVisualLabs:published.filter(r=>r.simulator==="motor-general").length,
 sourceTheoryMissing:published.filter(r=>!r.theorySlides).length,
 sourceExercisesMissing:published.filter(r=>!r.sourceExercises).length,
 answerKeyIssues:published.reduce((n,r)=>n+r.keyIssues,0),
 pendingReview:published.filter(r=>r.reasons.length).length
};
if(info.total!==628||info.published!==105)throw Error("Censo incompleto");
if(info.practiceFocused!==15||info.practiceCurricular!==22)throw Error("Mapeo de 37 prácticas cambió");
const ordered=[...published].sort((a,b)=>b.score-a.score||a.slug.localeCompare(b.slug));
const escape=v=>'"'+String(v??"").replaceAll('"','""')+'"';
const fields=["slug","title","course","state","practice","simulator","theorySlides",
"sourceExercises","keyIssues","score","route","reasons"];
writeFileSync(join(dir,"prioridades-pedagogicas-628.csv"),[
 fields.join(","),...records.map(row=>fields.map(f=>escape(f==="reasons"?row.reasons.join(" | "):row[f])).join(","))
].join("\n"));
writeFileSync(join(dir,"prioridades-pedagogicas-628.json"),
 JSON.stringify({generatedAt:new Date().toISOString(),counts:info,records,priorities:ordered.map(r=>r.slug)},null,2));
const lines=[
 "# Auditoría de pertinencia matemática y editorial",
 "",
 "No es certificación de todas las explicaciones. Las plantillas generales exigen revisión docente por tema.",
 "",
 "| Indicador | Conteo |","|---|---:|",
 ...Object.entries(info).map(([k,v])=>"| "+k+" | "+v+" |"),
 "",
 "## Lecciones publicadas por prioridad", "",
 "| Lección | Área | Práctica | Laboratorio | Puntos | Motivos |",
 "|---|---|---|---|---:|---|",
 ...ordered.slice(0,105).map(r=>"| "+r.slug+" | "+r.course+" | "+r.practice+" | "+r.simulator+
    " | "+r.score+" | "+r.reasons.join("; ").replaceAll("|","/")+" |"),
 "",
 "## Criterios",
 "",
 "- Fuentes incompletas y claves ausentes requieren volver al documento original; no inventar alternativas.",
 "- Los 15 laboratorios temáticos y 37 generadores tienen pruebas independientes, pero sus resultados no certifican teoría fuente.",
 "- Las lecciones universitarias con plantilla general quedan para especialización y revisión matemática, no se consideran aprobadas editorialmente por una prueba de UI.",
 "- Las 523 páginas programadas permanecen fuera del visitante: auditoría técnica sí, publicación no."
];
writeFileSync(join(dir,"prioridades-pedagogicas-628.md"),lines.join("\n"));
console.log("✓ Censo pedagógico y de pertinencia: "+JSON.stringify(info));
