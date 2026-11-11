import assert from "node:assert/strict";
import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import ts from "typescript";
import vm from "node:vm";
import katex from "katex";
import { prepareDisplayLatex } from "../lib/math-display-layout.mjs";
import { splitMathText, stripMathDelimiters } from "../lib/math-text-segments.mjs";
import { EDITORIAL_RULES, resolveEditorialKeyFormula, isEditoriallyCurated } from "../lib/editorial-key-formulas.mjs";
const read = p => readFileSync(new URL("../"+p,import.meta.url),"utf8");
const slash=String.fromCharCode(92);
assert.equal(stripMathDelimiters(slash+"("+slash+"frac{1}{2}"+slash+")"),slash+"frac{1}{2}");
assert.equal(stripMathDelimiters("$$x^2+1$$"),"x^2+1");
assert.equal(stripMathDelimiters("x²"),"x²");
assert.deepEqual(splitMathText("Las funciones son relaciones."),[{type:"text",value:"Las funciones son relaciones."}]);
const chunks=splitMathText("Calcula $f(x)=x^2+3$ y demuestra "+slash+"["+slash+"frac{1}{2}"+slash+"].");
assert.equal(chunks.filter(p=>p.type==="math").length,2);
assert.equal(chunks.filter(p=>p.type==="math"&&p.display).length,1);
assert.ok(splitMathText("Si f(x)=2x−1, calcula f(-2).").some(p=>p.type==="math"&&p.value.includes("f(x)")));
assert.ok(splitMathText("x²+1").some(p=>p.type==="math"));
const domainMath=splitMathText("En q(x)=1/(x-4), x=4 no pertenece al dominio. En el área A(r)=πr², r≥0.");
const domainPieces=domainMath.filter(p=>p.type==="math").map(p=>p.value);
for(const expression of ["q(x)=1/(x-4)","x=4","A(r)=πr²","r≥0"]){
 assert.ok(domainPieces.some(v=>v.replaceAll(" ","")===expression), "No se separó la fórmula del módulo: "+expression+"; partes="+domainPieces.join(" | "));
}
assert.ok(!domainPieces.some(v=>/pertenece|dominio|área/i.test(v)), "No convertir prosa en fórmula");
const damaged=splitMathText("P(x) = 1 + x^ y A = __________________");
assert.ok(!damaged.filter(p=>p.type==="math").some(p=>/\^$|_{3,}/.test(p.value)),"No reconstruir exponentes ni espacios de respuesta");
const openModule=read("app/curso/funciones-sin-vacios/modulo-1/page.tsx");
assert.match(openModule,/q\(x\)=\\dfrac\{1\}\{x-4\}/);
assert.match(openModule,/A\(r\)=\\pi r\^2/);
assert.match(openModule,/<MathFormula source=\{lesson\.formula\}/);

const src=read("components/math-formula.tsx");
const start=src.indexOf("const exact:");
const end=src.indexOf("export function MathFormula(",start);
assert.ok(start>=0&&end>start,"No se halló la normalización matemática");
const compiled=ts.transpileModule(src.slice(start,end)+"\nexports.toLatex=toLatex;",{
 compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}
}).outputText;
const sandbox={exports:{},stripMathDelimiters};
vm.runInNewContext(compiled,sandbox,{timeout:3000});
const toLatex=sandbox.exports.toLatex;
assert.equal(typeof toLatex,"function");
assert.equal(toLatex("1/x cerca de 3"),String.raw`\frac{1}{x},\quad x\to 3`);
assert.equal(toLatex("f(x)=1/(x−2) cerca de 2"),String.raw`f(x)=\frac{1}{x-2},\quad x\to 2`);
assert.equal(toLatex("sin(x)"),String.raw`\sin (x)`);
const longExpression=String.raw`x^2+2x+1=0,\quad (x+1)^2=0,\quad x=-1,\quad x_1=x_2=-1`;
const wrappedExpression=prepareDisplayLatex(longExpression,40);
assert.ok(wrappedExpression.startsWith(String.raw`\begin{gathered}`));
assert.ok(wrappedExpression.includes(String.raw`\\[0.3em]`));
assert.equal(prepareDisplayLatex(longExpression,200),longExpression);
const casesExpression=String.raw`\begin{cases}x,&x>0\\0,&x\le0\end{cases}`;
assert.equal(prepareDisplayLatex(casesExpression,0),casesExpression);
katex.renderToString(wrappedExpression,{throwOnError:true,strict:false,displayMode:true});
const samples=[
 slash+"frac{1}{x}",slash+"begin{cases}x,&x>0"+slash+slash+"0,&x"+slash+"le0"+slash+"end{cases}",
 "f(x)=x²−3x+2","f(x)=(x²−1)/(x−1), x≠1","n(A∪B)=3","h(x)=2^(x−1)+2",
 "x≤5","x₁²+x₂²","(1/2)ˣ","√(x+5)","lim x→2 (x³ − 1)/(x − 1)"
];
for(const s of samples){
 const rendered=katex.renderToString(toLatex(s),{throwOnError:true,strict:false,trust:false,output:"htmlAndMathml"});
 assert.ok(rendered.includes("katex-mathml"),"No se generó MathML para "+s);
}
// Los enlaces compartibles conservan la ecuación y el estado elegido, sin datos del alumno.
const graphLinkJs=ts.transpileModule(read("lib/equation-io.ts"),{
 compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}
}).outputText;
const graphLinkSandbox={exports:{}};
vm.runInNewContext(graphLinkJs,graphLinkSandbox,{timeout:2000});
const graphHref=graphLinkSandbox.exports.equationIoGraphUrl(["y=(x-1)^2-2","y=|x+1|-2"]);
assert.equal(graphHref,"https://equation.io/#y%3D%28x-1%29%5E2-2;y%3D%7Cx%2B1%7C-2");
assert.match(read("components/function-lab.tsx"),/equationIoGraphUrl/);
assert.match(read("components/representation-lab.tsx"),/equationIoGraphUrl/);
const lessons=JSON.parse(read("content/catalog/lessons-index.json"));
// Diagnóstico privado y reproducible por cada uno de los 628 registros curriculares.
const katexAuditByLesson=new Map(lessons.map(l=>[l.slug,{
 slug:l.slug,title:l.title,area:l.area,course:l.course,publishStatus:l.publishStatus,
 route:"/aprende/"+l.area+"/"+l.course+"/"+l.slug,
 keyFormulaChecked:false,formulaSource:"original",responsiveLines:1,
 sourceFormulaErrors:[],mathSegmentsChecked:0,invalidMathSegments:0,errors:[]
}]));
assert.ok(EDITORIAL_RULES.length>=40,"La cobertura editorial es demasiado reducida");
for(const rule of EDITORIAL_RULES){
 katex.renderToString(rule.tex,{throwOnError:true,strict:false,trust:false});
}
const grades=new Map();
const topicCoverage=new Map();
for(const lesson of lessons){
 if(lesson.grade<1||lesson.grade>5)continue;
 const key=lesson.grade+"° "+lesson.course;
 const info=grades.get(key)||{total:0,curated:0};
 info.total++;
 if(isEditoriallyCurated(lesson)){
  info.curated++;
  const effective=resolveEditorialKeyFormula(lesson);
  assert.notEqual(effective,lesson.keyFormula,"No hubo mejora específica: "+lesson.slug);
  katex.renderToString(effective,{throwOnError:true,strict:false,trust:false});
 }
 grades.set(key,info);
}
for(const grade of [1,2,3,4,5]){
 const covered=[...grades].filter(([k,v])=>k.startsWith(grade+"° ")&&v.curated>0);
 assert.ok(covered.length>=4,"Cobertura editorial insuficiente para "+grade+"°");
}
console.log("Fórmulas curadas por grado/asignatura: "+JSON.stringify([...grades.entries()].map(([key,v])=>({key,...v}))));

const malformed=[];
const displayedFailures=[];
let examined=0;
for(const l of lessons){
 if(typeof l.keyFormula!=="string"||!l.keyFormula.trim())continue;
 examined++;
 const auditRow=katexAuditByLesson.get(l.slug);
 const effective=resolveEditorialKeyFormula(l);
 const displayedTex=toLatex(effective);
 const responsiveTex=prepareDisplayLatex(displayedTex);
 if(auditRow){
   auditRow.keyFormulaChecked=true;
   auditRow.formulaSource=effective===l.keyFormula?"original":"editorial";
   auditRow.responsiveLines=responsiveTex===displayedTex?1:responsiveTex.split(String.raw`\\[0.3em]`).length;
 }
 try { katex.renderToString(toLatex(l.keyFormula),{throwOnError:true,strict:false,trust:false}); }
 catch(e) {
   const reason=String(e.message||e).slice(0,160);
   malformed.push({slug:l.slug,formula:l.keyFormula.slice(0,88),error:reason.slice(0,85)});
   if(auditRow)auditRow.sourceFormulaErrors.push({location:"originalFormula",source:l.keyFormula.slice(0,180),reason});
 }
 try { katex.renderToString(responsiveTex,{throwOnError:true,displayMode:true,strict:false,trust:false}); }
 catch(e) {
   const reason=String(e.message||e).slice(0,160);
   displayedFailures.push({slug:l.slug,formula:effective.slice(0,120),error:reason});
   if(auditRow)auditRow.errors.push({location:"displayedFormula",source:effective.slice(0,180),reason});
 }
}
console.log("Auditoría de fórmulas extraídas: "+JSON.stringify({examined,unsupported:malformed.length,samples:malformed.slice(0,8)}));
const bank=read("components/interactive-exercise-bank.tsx");
const gen=read("components/infinite-problem-generator.tsx");
const page=read("app/aprende/[area]/[curso]/[slug]/page.tsx");
assert.match(bank,/<MathText source=\{ex\.statement\}/);
assert.match(bank,/<MathText source=\{opt\}/);
assert.match(bank,/<MathText source=\{step\}/);
assert.match(gen,/<MathText source=\{problem\.statement\}/);
assert.match(gen,/<MathText source=\{st\}/);
assert.match(page,/<MathText source=\{p\}/);
assert.match(page,/<MathText source=\{par\}/);
assert.match(read("app/layout.tsx"),/scientific-typesetting\.css/);
assert.match(read("components/zenit-app-engines.tsx"),/zenit-engine-formula-panel/);
const complete=JSON.parse(read("content/catalog/lessons-full.json"));
let inspectedText=0, mathPieces=0, malformedPieces=0;
const corpusByCourse=new Map();
const corpusFailures=[];
function inspectText(value,location,lesson){
  if(typeof value!=="string"||!value.trim())return;
  inspectedText++;
  const auditRow=katexAuditByLesson.get(lesson.slug);
  const gradeCourse=lesson.grade+"° "+lesson.course;
  const bucket=corpusByCourse.get(gradeCourse)||{paragraphs:0,math:0,invalid:0,examples:[]};
  bucket.paragraphs++;
  corpusByCourse.set(gradeCourse,bucket);
  for(const part of splitMathText(value)){
    if(part.type!=="math")continue;
    mathPieces++;
    bucket.math++;
    if(auditRow)auditRow.mathSegmentsChecked++;
    try{katex.renderToString(toLatex(part.value),{throwOnError:true,strict:false,trust:false});}
    catch(err){
      malformedPieces++;
      bucket.invalid++;
      if(auditRow){
        auditRow.invalidMathSegments++;
        if(auditRow.errors.length<20)auditRow.errors.push({
          location,source:part.value.slice(0,180),reason:String(err.message||err).slice(0,160)
        });
      }
      if(bucket.examples.length<2)bucket.examples.push({at:location,tex:part.value.slice(0,78)});
      if(corpusFailures.length<14)corpusFailures.push({location,tex:part.value.slice(0,90),reason:String(err.message||err).slice(0,100)});
    }
  }
}
for(const l of complete){
  for(const slide of l.theorySlides||[]){
    inspectText(slide.heading,"heading:"+l.slug,l);
    for(const p of slide.content||[])inspectText(p,"theory:"+l.slug,l);
  }
  for(const ex of [...(l.exercisesF0||[]),...(l.exercisesFA||[])]){
    inspectText(ex.statement,"question:"+l.slug,l);
    for(const opt of ex.options||[])inspectText(opt,"option:"+l.slug,l);
    inspectText(ex.hint,"hint:"+l.slug,l);
  }
  for(const ws of l.workedSolutions||[]){
    for(const step of ws.steps||[])inspectText(step,"solution:"+l.slug,l);
  }
  for(const section of l.areaBookBlocks||[]){
    for(const paragraph of section.paragraphs||[])inspectText(paragraph,"book:"+l.slug,l);
  }
}
console.log("Auditoría de textos completos: "+JSON.stringify({inspectedText,mathPieces,malformedPieces,samples:corpusFailures}));

const katexAuditRows=[...katexAuditByLesson.values()];
const katexAuditSummary={
 totalLessons:katexAuditRows.length,
 published:katexAuditRows.filter(r=>r.publishStatus==="published").length,
 scheduled:katexAuditRows.filter(r=>r.publishStatus==="scheduled").length,
 formulasChecked:examined,mathSegmentsChecked:mathPieces,
 invalidKeyFormulas:malformed.length,invalidDisplayedFormulas:displayedFailures.length,
 responsiveMultiline:katexAuditRows.filter(r=>r.responsiveLines>1).length,
 invalidMathSegments:malformedPieces,
 lessonsWithIssues:katexAuditRows.filter(r=>r.errors.length>0 || r.sourceFormulaErrors.length>0).length,
 publishedWithIssues:katexAuditRows.filter(r=>r.publishStatus==="published"&&r.errors.length>0).length
};
assert.equal(katexAuditSummary.totalLessons,lessons.length,"Faltan registros en la auditoría matemática");
mkdirSync(new URL("../.catalog-audit/",import.meta.url),{recursive:true});
writeFileSync(new URL("../.catalog-audit/katex-628.json",import.meta.url),
 JSON.stringify({generatedAt:new Date().toISOString(),summary:katexAuditSummary,lessons:katexAuditRows},null,2),"utf8");
console.log("Auditoría KaTeX individual: "+JSON.stringify(katexAuditSummary));
console.log("Revisión editorial por grado y asignatura: "+JSON.stringify([...corpusByCourse.entries()].filter(([k])=>/^[1-5]°/.test(k)).sort((a,b)=>a[0].localeCompare(b[0])).map(([key,value])=>({key,paragraphs:value.paragraphs,candidates:value.math,invalid:value.invalid,examples:value.examples}))));

const publishedDisplayFailures=displayedFailures.filter(f=>katexAuditByLesson.get(f.slug)?.publishStatus==="published");
assert.equal(publishedDisplayFailures.length,0,"Fórmulas visibles inválidas en lecciones publicadas: "+JSON.stringify(publishedDisplayFailures.slice(0,8)));
const editorialExamples=[
 ["segmentos-1sec-unidad1",String.raw`AM=MB`],
 ["congruencia-de-triangulos-1sec-unidad3",String.raw`\\cong`],
 ["tabla-de-dist-de-frec-para-datos-sin-agrupar-1sec-unidad2",String.raw`F_j`]
];
for(const [slug,expected] of editorialExamples){
 const lesson=lessons.find(l=>l.slug===slug);
 assert.ok(lesson && resolveEditorialKeyFormula(lesson).includes(expected),"Falta la fórmula temática "+slug);
}
assert.ok(mathPieces>1000,"El análisis de ejercicios no identificó suficientes expresiones");
assert.ok(malformedPieces/mathPieces<0.11,"Demasiados segmentos matemáticos del catálogo no interpretables");
assert.match(read("app/scientific-typesetting.css"),/math-scroll-hint/);
const inlineCSS=read("app/scientific-typesetting.css");
const inlineRule=inlineCSS.match(/\.math-typeset-inline\s*\{([^}]*)\}/);
assert.ok(inlineRule,"Falta el estilo de fórmulas insertadas en párrafos");
assert.match(inlineRule[1],/display:\s*inline\s*;/);
assert.match(inlineRule[1],/vertical-align:\s*baseline\s*;/);
assert.match(inlineRule[1],/overflow:\s*visible\s*;/);
assert.doesNotMatch(inlineRule[1],/overflow-x:\s*auto|vertical-align:\s*-?\.?[0-9]+em/);
const fontRule=inlineCSS.match(/\.math-typeset-inline\s*>\s*\.katex\s*\{([^}]*)\}/);
assert.ok(fontRule,"Debe ajustarse la tipografía de KaTeX dentro del párrafo");
assert.match(fontRule[1],/font-size:\s*1\.02em/);
assert.match(read("components/math-formula.tsx"),/const Tag=displayMode\?"div":"span"/);


console.log("✓ Capa 08: matemáticas con KaTeX y MathML, texto científico y accesibilidad verificados.");
