import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import ts from "typescript";
import vm from "node:vm";
import katex from "katex";
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
const samples=[
 slash+"frac{1}{x}",slash+"begin{cases}x,&x>0"+slash+slash+"0,&x"+slash+"le0"+slash+"end{cases}",
 "f(x)=x²−3x+2","f(x)=(x²−1)/(x−1), x≠1","n(A∪B)=3","h(x)=2^(x−1)+2",
 "x≤5","x₁²+x₂²","(1/2)ˣ","√(x+5)","lim x→2 (x³ − 1)/(x − 1)"
];
for(const s of samples){
 const rendered=katex.renderToString(toLatex(s),{throwOnError:true,strict:false,trust:false,output:"htmlAndMathml"});
 assert.ok(rendered.includes("katex-mathml"),"No se generó MathML para "+s);
}
const lessons=JSON.parse(read("content/catalog/lessons-index.json"));
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
let examined=0;
for(const l of lessons){
 if(typeof l.keyFormula!=="string"||!l.keyFormula.trim())continue;
 examined++;
 try { katex.renderToString(toLatex(l.keyFormula),{throwOnError:true,strict:false,trust:false}); }
 catch(e) { malformed.push({slug:l.slug,formula:l.keyFormula.slice(0,88),error:String(e.message||e).slice(0,85)}); }
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
  const gradeCourse=lesson.grade+"° "+lesson.course;
  const bucket=corpusByCourse.get(gradeCourse)||{paragraphs:0,math:0,invalid:0,examples:[]};
  bucket.paragraphs++;
  corpusByCourse.set(gradeCourse,bucket);
  for(const part of splitMathText(value)){
    if(part.type!=="math")continue;
    mathPieces++;
    bucket.math++;
    try{katex.renderToString(toLatex(part.value),{throwOnError:true,strict:false,trust:false});}
    catch(err){
      malformedPieces++;
      bucket.invalid++;
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
console.log("Revisión editorial por grado y asignatura: "+JSON.stringify([...corpusByCourse.entries()].filter(([k])=>/^[1-5]°/.test(k)).sort((a,b)=>a[0].localeCompare(b[0])).map(([key,value])=>({key,paragraphs:value.paragraphs,candidates:value.math,invalid:value.invalid,examples:value.examples}))));

assert.ok(mathPieces>1000,"El análisis de ejercicios no identificó suficientes expresiones");
assert.ok(malformedPieces/mathPieces<0.11,"Demasiados segmentos matemáticos del catálogo no interpretables");
assert.match(read("app/scientific-typesetting.css"),/math-scroll-hint/);

console.log("✓ Capa 08: matemáticas con KaTeX y MathML, texto científico y accesibilidad verificados.");
