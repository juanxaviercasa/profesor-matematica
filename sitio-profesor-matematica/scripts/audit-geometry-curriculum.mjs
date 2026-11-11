/**
 * Auditoría cerrada del catálogo de geometría (1.º–5.º de secundaria).
 * Valida los 118 registros existentes, incluidos los programados sin publicarlos.
 * El informe se genera en .catalog-audit (nunca dentro de public/).
 */
import assert from "node:assert/strict";
import {readFileSync,mkdirSync,writeFileSync} from "node:fs";
import katex from "katex";
import ts from "typescript";
import {resolveGeometryTopic,GEOMETRY_TOPICS} from "../lib/geometry-curriculum.mjs";
import {resolveEditorialKeyFormula,isEditoriallyCurated} from "../lib/editorial-key-formulas.mjs";

const read=path=>readFileSync(new URL("../"+path,import.meta.url),"utf8");
const index=JSON.parse(read("content/catalog/lessons-index.json"));
const full=JSON.parse(read("content/catalog/lessons-full.json"));
const geometry=index.filter(x=>x.course==="geometria");
const fullBySlug=new Map(full.map(x=>[x.slug,x]));
const audits=[],errors=[],modes={},families={};
assert.equal(new Set(geometry.map(x=>x.slug)).size,geometry.length,"Slugs de geometría duplicados");
assert.equal(new Set(GEOMETRY_TOPICS.map(x=>x.id)).size,GEOMETRY_TOPICS.length,"Familias geométricas duplicadas");
for(const lesson of geometry){
  const spec=resolveGeometryTopic(lesson.title);
  const fullRecord=fullBySlug.get(lesson.slug);
  const item={slug:lesson.slug,grade:lesson.grade,title:lesson.title,publishStatus:lesson.publishStatus,
    family:spec?.id||null,visualMode:spec?.mode||null,latex:spec?.formula||null,findings:[]};
  if(!spec)item.findings.push("Sin familia geométrica");
  if(!fullRecord)item.findings.push("No aparece en el catálogo completo");
  if(fullRecord?.publishStatus!==lesson.publishStatus)item.findings.push("Estado de publicación distinto entre los dos catálogos");
  if(!["published","scheduled"].includes(lesson.publishStatus))item.findings.push("Estado de publicación desconocido");
  if(!isEditoriallyCurated(lesson))item.findings.push("La fórmula del tema no está vinculada a la curaduría");
  const effective=resolveEditorialKeyFormula(lesson);
  if(spec && effective!==spec.formula)item.findings.push("La fórmula editorial no corresponde a la familia geométrica");
  if(spec){
    modes[spec.mode]=(modes[spec.mode]||0)+1;
    families[spec.id]=(families[spec.id]||0)+1;
    try {
      katex.renderToString(spec.formula,{throwOnError:true,strict:false,trust:false,output:"htmlAndMathml",displayMode:true});
    } catch(e){item.findings.push("KaTeX: "+String(e.message||e).slice(0,180));}
  }
  if(item.findings.length)errors.push(item);
  audits.push(item);
}
for(const path of ["components/geometry-curriculum-lab.tsx","components/zenit-app-engines.tsx"]){
  const source=read(path);
  const ast=ts.createSourceFile(path,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
  assert.equal(ast.parseDiagnostics.length,0,"TSX inválido: "+path+" / "+ast.parseDiagnostics.map(x=>x.messageText).join("; "));
}
const dispatch=read("components/zenit-app-engines.tsx");
for(const mode of ["triangles","polygon","circle","area","scale","transform","solids","analytic",
                   "segments","angles","congruence","parallel"]){
  assert.ok(geometry.some(x=>resolveGeometryTopic(x.title)?.mode===mode),"Modo sin asignaciones: "+mode);
}
assert.match(dispatch,/const geometryTopic = course === "geometria"/);
assert.match(dispatch,/geometryTopic\.mode/);
assert.match(read("app/aprende/[area]/[curso]/[slug]/page.tsx"),/lesson\.publishStatus !== "published"/);
assert.equal(errors.length,0,"Incidencias en el catálogo geométrico: "+JSON.stringify(errors.slice(0,12)));
const scheduled=geometry.filter(x=>x.publishStatus==="scheduled");
const published=geometry.filter(x=>x.publishStatus==="published");
const summary={total:geometry.length,scheduled:scheduled.length,published:published.length,topicFamilies:GEOMETRY_TOPICS.length,
  withTopicSpec:audits.length-errors.length,latexErrors:errors.filter(x=>x.findings.some(f=>f.startsWith("KaTeX"))).length,
  modes,families,errors:errors.length};
mkdirSync(new URL("../.catalog-audit/",import.meta.url),{recursive:true});
writeFileSync(new URL("../.catalog-audit/geometry-118.json",import.meta.url),
  JSON.stringify({generatedAt:new Date().toISOString(),summary,lessons:audits},null,2),"utf8");
console.log("✓ Auditoría geométrica: "+JSON.stringify(summary));
