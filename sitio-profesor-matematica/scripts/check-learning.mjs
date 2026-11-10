import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { getVerifiedAnswerKey, scoreExerciseAnswers } from "../lib/exercise-evaluation.mjs";
const read = p => readFileSync(new URL("../"+p,import.meta.url),"utf8");
const a={number:1,options:["uno","dos","tres"],answerKey:"B"};
const unknown={number:2,options:["sí","no"]};
assert.equal(getVerifiedAnswerKey(a),"b");
assert.equal(getVerifiedAnswerKey({ ...a, answerKey:"B." }),"b");
assert.equal(getVerifiedAnswerKey({ ...a, answerKey:"e" }),null);
assert.equal(getVerifiedAnswerKey(unknown),null);
assert.equal(getVerifiedAnswerKey({ ...a, answerKey:"" }),null);
const rows=[{tab:"f0",idx:0,ex:a},{tab:"f0",idx:1,ex:unknown}];
assert.deepEqual(scoreExerciseAnswers(rows,{"f0-1-0":1,"f0-2-1":0}),{
  answeredCount:2, gradedCount:1, correctCount:1, ungradedCount:1, accuracy:100
});
assert.deepEqual(scoreExerciseAnswers(rows,{"f0-1-0":0}),{
  answeredCount:1, gradedCount:1, correctCount:0, ungradedCount:0, accuracy:0
});
assert.deepEqual(scoreExerciseAnswers(rows,{}),{
  answeredCount:0, gradedCount:0, correctCount:0, ungradedCount:0, accuracy:null
});
const bank=read("components/interactive-exercise-bank.tsx");
const lesson=read("app/aprende/[area]/[curso]/[slug]/page.tsx");
const diagnostic=read("components/function-diagnostic.tsx");
const lab=read("components/lab-progress.tsx");
const generator=read("components/infinite-problem-generator.tsx");
const layout=read("app/layout.tsx");
assert.match(bank,/scoreExerciseAnswers\(allExercisesWithTab, selectedOptions\)/);
assert.match(bank,/examMode && !examSubmitted/);
assert.match(bank,/setSelectedOptions\(\{\}\)/);
assert.match(bank,/expectedLetter = getVerifiedAnswerKey\(ex\)/);
assert.doesNotMatch(bank,/answerKey \|\| "a"/);
assert.match(bank,/preguntas sin calificar|Respuesta no disponible|clave de respuesta comprobable/i);
assert.match(lesson,/id="lesson-simulator"/);
assert.match(lesson,/id="lesson-theory"/);
assert.match(lesson,/id="lesson-practice"/);
assert.match(lesson,/lesson-jump-nav/);
assert.doesNotMatch(lesson,/answerKey\?\.toUpperCase\(\) \|\| "A"/);
assert.match(diagnostic,/skillGroups/);
assert.match(diagnostic,/needsPractice/);
assert.match(diagnostic,/role="progressbar"/);
assert.match(lab,/window\.dispatchEvent\(new Event\("zenit:lab-progress"\)\)/);
assert.match(lab,/window\.localStorage\.setItem/);
assert.match(generator,/Cada par de puntos determina un segmento/);
assert.doesNotMatch(generator,/Resolución Algorítmica Paso a Paso \(Semilla/);
assert.doesNotMatch(lesson,/bloques teóricos extraídos|Diapositiva \{slide\.slideNumber\}/);
assert.match(layout,/import "\.\/learning-experience\.css"/);
assert.ok(existsSync(new URL("../app/learning-experience.css",import.meta.url)));
const catalog=JSON.parse(read("content/catalog/lessons-full.json"));
let valid=0, missing=0, invalid=0, total=0;
for(const lesson of catalog){
  for(const ex of [...(lesson.exercisesF0||[]),...(lesson.exercisesFA||[])]){
    total++;
    if(getVerifiedAnswerKey(ex)) valid++;
    else if(ex.answerKey) invalid++;
    else missing++;
  }
}

// La prueba ejecuta la función real del generador, aislada del componente React.
// Se transpila usando la misma versión de TypeScript del proyecto.
const ts = await import("typescript");
const vm = await import("node:vm");
const source = generator;
const start = source.indexOf("interface GeneratedProblem {");
const end = source.indexOf("export function InfiniteProblemGenerator(", start);
assert.ok(start >= 0 && end > start, "No se pudo extraer la lógica pura del generador");
const generatedScript = ts.transpileModule(
  source.slice(start, end) + "\nexport { buildDynamicProblem };",
  { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }
).outputText;
const sandbox = { exports: {} };
vm.runInNewContext(generatedScript, sandbox, { timeout: 3000 });
const buildProblem = sandbox.exports.buildDynamicProblem;
assert.equal(typeof buildProblem, "function");
const engines=[
  "SetVennLab","NumberTheoryLab","PolynomialAlgebraLab","EquationInequalityLab",
  "FunctionCartesianLab","GeometryInteractiveLab","AnalyticConicsLab",
  "TrigonometryCircleLab","StatisticsProbabilityLab","LogicalReasoningLab",
  "CalculusAnalysisLab","SciencePhysicsChemLab"
];
let checkedProblems=0;
for (const engine of engines) {
  for (let seed=1; seed<=500; seed++) {
    const p=buildProblem(engine,"prueba automática",seed);
    const alternatives=p.options.map(o=>o.replace(/^[a-e]\.\s+/,""));
    assert.equal(alternatives.length,5,engine+"/"+seed+": número de opciones");
    assert.equal(new Set(alternatives).size,5,engine+"/"+seed+": opciones duplicadas");
    assert.ok(p.correctIndex>=0 && p.correctIndex<5,engine+"/"+seed+": índice incorrecto");
    assert.ok(p.steps.length>=2,engine+"/"+seed+": explicación incompleta");
    assert.ok(alternatives.every(o=>!/(?:NaN|undefined|Infinity)/.test(o)),engine+"/"+seed+": resultado inválido");
    const r1=(seed%7)+3,r2=((seed*3)%8)+2,r3=((seed*5)%6)+4;
    const correct=alternatives[p.correctIndex];
    switch(engine) {
      case "PolynomialAlgebraLab":
        assert.equal(correct,"R = "+(2*r2*r2-r1*r2+r3));break;
      case "GeometryInteractiveLab": {
        const n=r1+3;
        assert.ok(correct.includes(180*(n-2)+"°") && correct.includes(n*(n-3)/2+" diagonales"));break;
      }
      case "TrigonometryCircleLab":
        assert.ok(correct.includes(9*r2+"°") && correct.includes(r2+"π/20 rad"));break;
      case "LogicalReasoningLab": {
        const n=r1+4;assert.equal(correct,String(n*(n+1)/2));break;
      }
      case "SciencePhysicsChemLab":
        assert.ok(correct.includes("t_s = "+r1+" s") && correct.includes("H_máx = "+(5*r1*r1)+" m"));break;
    }
    checkedProblems++;
  }
}
assert.match(lesson, /\.\.\.\(getVerifiedAnswerKey\(ex\) \?/);
assert.match(read("components/lab-hub.tsx"),/Math\.min\(lab\.total/);
console.log("✓ "+checkedProblems+" variantes de 12 motores evaluadas: opciones únicas y cálculos clave coherentes.");


const completion = read("components/lesson-completion.tsx");
const home = read("app/aprende/page.tsx");
assert.match(completion,/STORAGE_KEY = "zenit_studied_lessons_v1"/);
assert.match(completion,/aria-pressed=\{completed\}/);
assert.match(completion,/LessonProgressOverview/);
assert.match(lesson,/<LessonCompletion slug=\{lesson.slug\}/);
assert.match(home,/<LessonProgressOverview total=\{LESSONS_INDEX\.filter\(lesson => lesson\.publishStatus === "published"\)\.length\}/);
assert.match(lesson,/const studentSummary = \/\^Estudio completo de /);

console.log("✓ Evaluación sin claves inventadas, examen privado, rutas educativas y progreso: verificados.");
console.log("Auditoría del catálogo: "+JSON.stringify({total,valid,missing,invalid})+" (las claves ausentes no se califican).");
