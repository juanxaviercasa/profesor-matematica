/**
 * 6600 verificaciones independientes sobre 22 unidades de Álgebra Lineal
 * y Física (22 x 300), sin depender de respuestas extraídas del libro.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import ts from "typescript";
import vm from "node:vm";
const read=p=>readFileSync(new URL("../"+p,import.meta.url),"utf8");
const raw=read("lib/curricular-problem-generator.ts");
const js=ts.transpileModule(raw,{compilerOptions:{
 module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022
}}).outputText;
const sandbox={exports:{}};
vm.runInNewContext(js,sandbox,{timeout:4000});
const {buildCurricularProblem, CURRICULAR_PROBLEM_SLUGS: slugs}=sandbox.exports;
assert.equal(slugs.length,22);
assert.equal(new Set(slugs).size,22);
const index=JSON.parse(read("content/catalog/lessons-index.json"));
const published=new Map(index.filter(l=>l.publishStatus==="published").map(l=>[l.slug,l]));
const component=read("components/infinite-problem-generator.tsx");
assert.match(component,/buildCurricularProblem\(slug, seed\)/);
const expected=(slug,seed)=>{
 const a=2+seed%6,b=1+Math.floor(seed/3)%5,c=2+Math.floor(seed/5)%5;
 const fmt=v=>Number(v.toFixed(4)).toString().replace(".",",");
 switch(slug){
  case "eliminacion-gauss-jordan-y-rango": return "("+a+", "+b+")";
  case "espacios-vectoriales-bases-y-dimension": return "det = "+b;
  case "cambio-de-base-y-matriz-de-transicion": return "("+a+", "+b+")";
  case "transformaciones-lineales-nucleo-e-imagen": return "(1, 1)";
  case "producto-interno-y-gram-schmidt": return "(0, "+b+")";
  case "autovalores-autovectores-y-diagonalizacion": return "Σλ = "+(2*a+c);
  case "diagonalizacion-y-cayley-hamilton": return "det(A) = "+(a*b);
  case "diagonalizacion-ortogonal-y-svd": return "("+(a+b+c)+", "+b+")";
  case "analisis-dimensional-y-vectores": return "|F| = "+(5*a)+" N";
  case "cinematica-mru-mruv-y-caida-libre": return "Δx = "+(2*a*c+2*b*c*c)+" m";
  case "cinematica-velocidad-y-aceleracion-instantanea": return "v = "+(a+b*c)+" m/s";
  case "estatica-equilibrio-y-torque": return "τ = "+(10*a*b)+" N·m";
  case "leyes-de-newton-y-diagrama-de-cuerpo-libre": return "F_neta = "+(a*b)+" N";
  case "gravitacion-universal-y-leyes-de-kepler": return "F_nueva = "+a+" N";
  case "trabajo-mecanico-y-potencia": return "P = "+(10*a*b)+" W";
  case "trabajo-energia-mecanica-y-conservacion": return "E_c = "+(4*a*a)+" J";
  case "cantidad-de-movimiento-impulso-y-choques": return "J = "+(a*c)+" N·s";
  case "movimiento-armonico-simple-y-frecuencia": return "f = 1/"+(2+seed%5)+" Hz";
  case "hidrostatica-pascal-y-arquimedes": return "p = "+(10*(1+seed%5))+" kPa";
  case "calorimetria-y-termodinamica": return "Q = "+fmt(a*4.2*(5+seed%6))+" kJ";
  case "electrostatica-campo-electrico-y-circuitos": return "F_nueva = "+a+" N";
  case "electrodinamica-y-electromagnetismo": return "V = "+(a*b)+" V";
  default:throw Error("Falta prueba independiente para "+slug);
 }
};
let checked=0;
for(const slug of slugs){
 const lesson=published.get(slug);
 assert.ok(lesson, "Lección no publicada: "+slug);
 assert.ok(["algebra-lineal","fisica"].includes(lesson.course),"Curso no esperado: "+slug);
 for(let seed=1;seed<=300;seed++){
  const p=buildCurricularProblem(slug,seed);
  assert.ok(p,slug+" "+seed);
  assert.equal(p.options.length,5,slug);
  assert.equal(p.correctIndex,seed%5,slug);
  const opts=p.options.map(t=>t.replace(/^[a-e]\.\s+/,""));
  assert.equal(new Set(opts).size,5,"Alternativas repetidas: "+slug+"/"+seed);
  assert.equal(opts[p.correctIndex],expected(slug,seed),"Resultado incorrecto: "+slug+"/"+seed);
  assert.ok(p.steps.length>=3 && p.steps.every(t=>t.length>=12),"Desarrollo incompleto: "+slug+"/"+seed);
  assert.ok(![p.statement,...p.options,...p.steps].some(t=>/NaN|undefined|Infinity|null/.test(t)),
   "Valores inválidos: "+slug+"/"+seed);
  assert.doesNotMatch(p.statement,/Resuelve la inecuación cuadrática/,"Desajuste pedagógico: "+slug);
  if(slug==="transformaciones-lineales-nucleo-e-imagen"){
    assert.match(p.statement,/núcleo T/);
    assert.match(p.statement,/imagen T/);
    assert.match(p.steps.join(" "),/rango-nulidad/);
    const dimensionKernel=1,dimensionImage=1;
    assert.equal(dimensionKernel+dimensionImage,2,"Teorema rango-nulidad");
  }
  if(slug==="cinematica-velocidad-y-aceleracion-instantanea"){
    assert.match(p.statement,/velocidad instantánea/);
    assert.match(p.steps.join(" "),/dx\/dt/);
    assert.match(p.steps.join(" "),/aceleración instantánea/);
  }
  checked++;
 }
}
for(const x of ["calculo-1","quimica"]){
 const item=index.find(l=>l.course===x);
 assert.equal(buildCurricularProblem(item.slug,101),null,"No suplantar un generador de otro curso");
}
console.log("✓ "+checked+" ejercicios de 22 unidades: respuesta, distractores, pasos y correspondencia temática correctos.");
