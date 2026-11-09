"use client";

import Link from "./safe-link";
import { MathText } from "./math-formula";
import { useState } from "react";

const questions = [
  {q:"¿Qué representa f(3)?", options:["f multiplicado por 3","La salida cuando la entrada es 3","La pendiente de f"], answer:1},
  {q:"Si f(x)=2x-1, ¿cuánto vale f(-2)?", options:["-5","-3","3"], answer:0},
  {q:"¿Cuál es una restricción de g(x)=1/(x-4)?", options:["x debe ser positivo","x no puede ser 4","x debe ser entero"], answer:1},
  {q:"En una gráfica, el dominio se observa principalmente sobre...", options:["el eje horizontal","el eje vertical","la pendiente"], answer:0},
  {q:"Si h(x)=(x-2)², respecto de x² la gráfica se desplaza...", options:["2 a la izquierda","2 hacia arriba","2 a la derecha"], answer:2},
  {q:"Una función asigna a cada entrada permitida...", options:["exactamente una salida","dos salidas","siempre una salida positiva"], answer:0},
  {q:"Si una gráfica corta una línea vertical en dos puntos, entonces...", options:["es creciente","no representa una función de x","su dominio es vacío"], answer:1},
  {q:"¿Qué indica f(x)+3 en la gráfica?", options:["desplazamiento vertical hacia arriba","desplazamiento horizontal a la derecha","reflexión"], answer:0},
  {q:"Si f(2)=7, ¿qué sabemos con certeza?", options:["La gráfica contiene el punto (2,7)","La pendiente es 7","El dominio termina en 2"], answer:0},
  {q:"¿Por qué importa el contexto al definir el dominio?", options:["Puede excluir entradas matemáticamente calculables","Cambia todas las fórmulas","Obliga a usar solo enteros"], answer:0},
];

const skillGroups = [
  { title: "Notación, evaluación y significado", indices: [0, 1, 5, 8], href: "/curso/funciones-sin-vacios/modulo-1" },
  { title: "Dominio y restricciones", indices: [2, 9], href: "/laboratorio/dominio-de-funciones" },
  { title: "Lectura de gráficas", indices: [3, 6], href: "/laboratorio/lectura-de-graficas" },
  { title: "Transformaciones", indices: [4, 7], href: "/laboratorio/transformaciones-de-funciones" },
];

export function FunctionDiagnostic(){
  const [answers,setAnswers]=useState<(number|null)[]>(Array(questions.length).fill(null));
  const [result,setResult]=useState<number|null>(null);
  const completed=answers.every(value=>value!==null);

  function finish(){
    const score=answers.reduce((total,value,index)=>total+(value===questions[index].answer?1:0),0);
    setResult(score);
    window.dataLayer=window.dataLayer||[];
    window.dataLayer.push({event:"diagnostic_complete",score,band:score<=3?"base":score<=7?"bridge":"ready"});
  }

  function reset(){setAnswers(Array(questions.length).fill(null));setResult(null);window.scrollTo({top:0,behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"})}

  if(result!==null){
    const needsPractice = skillGroups.map(group => ({ ...group, errors: group.indices.filter(i => answers[i] !== questions[i].answer).length })).filter(group => group.errors > 0).sort((a, b) => b.errors / b.indices.length - a.errors / a.indices.length);
    const profile=result<=3?{name:"Base por reconstruir",text:"Conviene empezar por entrada, salida, notación y restricciones antes de trabajar transformaciones.",next:"Comenzar el Módulo 1",href:"/curso/funciones-sin-vacios/modulo-1"}:result<=7?{name:"Puente en construcción",text:"Ya manejas partes operativas, pero necesitas conectar mejor fórmula, dominio, tabla y gráfica.",next:"Practicar representaciones",href:"/laboratorio/representaciones-de-funciones"}:{name:"Listo para profundizar",text:"Tienes una base sólida. El siguiente paso es justificar transformaciones, composición y variación.",next:"Explorar el laboratorio",href:"/laboratorio/transformaciones-de-funciones"};
    return <section className="diagnostic-result"><span>RESULTADO</span><strong>{result}/10</strong><h2>{profile.name}</h2><p>{profile.text}</p>{needsPractice.length > 0 && <div className="diagnostic-next-steps" aria-label="Temas recomendados para reforzar"><h3>Temas que conviene reforzar</h3><p>Estas recomendaciones dependen de las respuestas que fallaste, no solo del puntaje total.</p><ol>{needsPractice.map(group => <li key={group.title}><Link href={group.href}>{group.title} · {group.errors} {group.errors === 1 ? "respuesta por revisar" : "respuestas por revisar"} <span aria-hidden="true">→</span></Link></li>)}</ol></div>}
    <div className="actions"><Link className="button" href={profile.href}>{profile.next}</Link><button className="text-button" onClick={reset}>Repetir diagnóstico</button></div><small>Este resultado es orientativo y no sustituye una evaluación académica completa.</small></section>
  }

  return <section className="diagnostic-shell"><div className="diagnostic-intro"><span>{answers.filter(v=>v!==null).length} de {questions.length}</span><div role="progressbar" aria-label="Preguntas respondidas" aria-valuemin={0} aria-valuemax={questions.length} aria-valuenow={answers.filter(v=>v!==null).length}><i style={{width:`${answers.filter(v=>v!==null).length/questions.length*100}%`}}/></div><p>Responde sin calculadora. El objetivo es identificar qué conexión debes trabajar primero.</p></div>{questions.map((item,index)=><fieldset key={item.q}><legend><span>{String(index+1).padStart(2,"0")}</span><MathText source={item.q} inlineOnly /></legend>{item.options.map((option,optionIndex)=><label key={option}><input type="radio" name={`q-${index}`} checked={answers[index]===optionIndex} onChange={()=>setAnswers(current=>current.map((value,i)=>i===index?optionIndex:value))}/><span><MathText source={option} inlineOnly /></span></label>)}</fieldset>)}<button className="button diagnostic-submit" disabled={!completed} onClick={finish}>Ver mi resultado</button>{!completed&&<p className="diagnostic-hint">Responde las diez preguntas para obtener tu ruta recomendada.</p>}</section>
}
