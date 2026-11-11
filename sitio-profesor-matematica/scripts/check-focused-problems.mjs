/**
 * Validación independiente de 8 motores de práctica temática.
 * 8 × 500 variantes: solución, distractores, semántica y explicación.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import ts from "typescript";
import vm from "node:vm";
const read = path => readFileSync(new URL("../"+path,import.meta.url),"utf8");
const raw=read("lib/focused-problem-generator.ts");
const compiled=ts.transpileModule(raw,{
  compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}
}).outputText;
const context={exports:{}};
vm.runInNewContext(compiled,context,{timeout:4000});
const build=context.exports.buildFocusedProblem;
assert.equal(typeof build,"function");
const types=["segments","congruence","parallel","cryptarithm","square","sequence","expression","frequency"];
const body=read("components/infinite-problem-generator.tsx");
const page=read("app/aprende/[area]/[curso]/[slug]/page.tsx");
assert.match(body,/FOCUSED_LABS\[slug\]/);
assert.match(body,/buildFocusedProblem\(focusedKind, seed\)/);
assert.match(page,/slug=\{lesson.slug\}/);
const strip=s=>s.replace(/^[a-e]\.\s+/,"");
let count=0;
for(const kind of types){
  for(let seed=1;seed<=500;seed++){
    const p=build(kind,seed);
    const label=kind+"/"+seed;
    assert.equal(p.options.length,5,label);
    const options=p.options.map(strip);
    assert.equal(new Set(options).size,5,"Distractores repetidos: "+label);
    assert.equal(p.correctIndex,seed%5,label);
    assert.ok(p.steps.length>=3 && p.steps.every(s=>s.length>=18),"Pasos incompletos: "+label);
    assert.ok(![p.statement,...p.steps,...p.options].some(s=>/NaN|Infinity|undefined|null/.test(s)),"Valor inválido: "+label);
    let expected;
    switch(kind){
      case "segments":{
        const ab=3+seed%6,bc=2+Math.floor(seed/3)%5;
        expected="AC = "+(ab+bc)+" cm";break;
      }
      case "congruence":{
        const k=[60,80,100,120,140][seed%5]/100;
        expected=k===1?"Son congruentes por LLL":"Son semejantes, pero no congruentes";
        break;
      }
      case "parallel":{
        const alpha=35+(seed%12)*10;
        expected=(180-alpha)+"°";break;
      }
      case "cryptarithm":{
        const a=1+seed%8,b=9-a;
        assert.notEqual(a,b);
        assert.equal((10*a+b)+(10*b+a),99);
        expected="B = "+b;break;
      }
      case "square": {
        const k=1+seed%5;
        expected=String(15+3*k);
        break;
      }
      case "sequence":{
        const n=3+seed%7;
        expected=(2*n-1)+" cuadrados";
        break;
      }
      case "expression":{
        const a=3+seed%4,b=2+Math.floor(seed/3)%5,c=1+Math.floor(seed/5)%2;
        expected=(a+b-c)+"x";break;
      }
      case "frequency":{
        const f2=2+Math.floor(seed/3)%3,f3=1+seed%4,f4=1+Math.floor(seed/5)%3;
        expected="f(3) = "+f3+"; n = "+(f2+f3+f4);break;
      }
    }
    assert.equal(options[p.correctIndex],expected,"Clave matemática equivocada: "+label);
    assert.equal(build(kind,seed).options.join("|"),p.options.join("|"),"No determinista: "+label);
    count++;
  }
}
console.log("✓ "+count+" ejercicios de ocho temas: respuestas, alternativas, pasos y reproducibilidad comprobados.");
