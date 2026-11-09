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
assert.match(bank,/sin clave comprobable|Sin clave de respuesta comprobable|sin clave comprobable/i);
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
console.log("✓ Evaluación sin claves inventadas, examen privado, rutas educativas y progreso: verificados.");
console.log("Auditoría del catálogo: "+JSON.stringify({total,valid,missing,invalid})+" (las claves ausentes no se califican).");
