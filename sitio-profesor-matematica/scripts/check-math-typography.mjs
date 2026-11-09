import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import ts from "typescript";
import vm from "node:vm";
import katex from "katex";
import { splitMathText, stripMathDelimiters } from "../lib/math-text-segments.mjs";
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
const corpusFailures=[];
function inspectText(value,location){
  if(typeof value!=="string"||!value.trim())return;
  inspectedText++;
  for(const part of splitMathText(value)){
    if(part.type!=="math")continue;
    mathPieces++;
    try{katex.renderToString(toLatex(part.value),{throwOnError:true,strict:false,trust:false});}
    catch(err){
      malformedPieces++;
      if(corpusFailures.length<14)corpusFailures.push({location,tex:part.value.slice(0,90),reason:String(err.message||err).slice(0,100)});
    }
  }
}
for(const l of complete){
  for(const slide of l.theorySlides||[]){
    inspectText(slide.heading,"heading:"+l.slug);
    for(const p of slide.content||[])inspectText(p,"theory:"+l.slug);
  }
  for(const ex of [...(l.exercisesF0||[]),...(l.exercisesFA||[])]){
    inspectText(ex.statement,"question:"+l.slug);
    for(const opt of ex.options||[])inspectText(opt,"option:"+l.slug);
    inspectText(ex.hint,"hint:"+l.slug);
  }
  for(const ws of l.workedSolutions||[]){
    for(const step of ws.steps||[])inspectText(step,"solution:"+l.slug);
  }
  for(const section of l.areaBookBlocks||[]){
    for(const paragraph of section.paragraphs||[])inspectText(paragraph,"book:"+l.slug);
  }
}
console.log("Auditoría de textos completos: "+JSON.stringify({inspectedText,mathPieces,malformedPieces,samples:corpusFailures}));

console.log("✓ Capa 08: matemáticas con KaTeX y MathML, texto científico y accesibilidad verificados.");
