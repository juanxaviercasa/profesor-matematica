"use client";
import { useMemo, useState } from "react";
import { MathFormula } from "./math-formula";
import { equationIoGraphUrl } from "@/lib/equation-io";
import { LabProgressBar, trackLab, useLabProgress } from "./lab-progress";

// Actividad inspirada en el patrón de correspondencia gráfica ↔ ecuación
// de CL for Desmos & Amplify, implementada localmente en React.
function QuadraticEquationChallenge({a,h,k}:{a:number;h:number;k:number}){
 const[selected,setSelected]=useState<string|null>(null);
 const format=(factor:number,shift:number,offset:number)=>
   String.raw`y=${factor}\left(x${shift<0?"+":"-"}${Math.abs(shift)}\right)^2${offset>=0?"+":""}${offset}`;
 const options=[
   {id:"vertical",formula:a===0?`y=${k+1}`:format(a,h,k+1)},
   {id:"correct",formula:a===0?`y=${k}`:format(a,h,k)},
   {id:"horizontal",formula:a===0?format(1,h,k):format(a,h+1,k)}
 ];
 const move=Math.abs(Math.round(a*4+h*2+k))%3;
 const ordered=[...options.slice(move),...options.slice(0,move)];
 const correct=selected==="correct";
 return (
  <div className="challenge-panel zenit-equation-match">
   <h3>Conecta la parábola con su ecuación</h3>
   <p>Observa la gráfica y elige la ecuación que realmente representa.</p>
   <div className="zenit-equation-match-options" role="group" aria-label="Selecciona la ecuación correspondiente">
    {ordered.map(option=><button key={option.id} type="button" aria-pressed={selected===option.id}
      onClick={()=>setSelected(option.id)}>
      <MathFormula source={option.formula} displayMode={false}/>
    </button>)}
   </div>
   {selected && <p role="status" aria-live="polite"><b>{correct?"¡Correcto!":"Revisa tu elección."}</b>{" "}
     {correct?(a===0?"Al ser a = 0, la gráfica es horizontal: y = k.":"El signo y el valor de a determinan la apertura; h y k sitúan el vértice.")
     :"Revisa la altura del vértice y cómo se desplaza la gráfica al cambiar h o k."}</p>}
  </div>
 );
}

export default function FunctionLab(){
 const[a,setA]=useState(1),[h,setH]=useState(0),[k,setK]=useState(0),[answer,setAnswer]=useState<string|null>(null);const progress=useLabProgress("transformaciones",3);
 const path=useMemo(()=>{const pts=[];for(let px=0;px<=600;px+=4){const x=(px-300)/45,y=a*(x-h)*(x-h)+k,py=200-y*35;if(py>-1000&&py<1200)pts.push(`${px},${py}`)}return `M${pts.join(" L")}`},[a,h,k]);
 const label=`f(x) = ${a}(x ${h>=0?"−":"+"} ${Math.abs(h)})² ${k>=0?"+":"−"} ${Math.abs(k)}`;const expected=a===0?"constante":a>0?"arriba":"abajo",correct=answer===expected;
 const choose=(value:string)=>{setAnswer(value);trackLab("lab_answer","transformaciones",value===expected?"correct":"retry")};
 return <><LabProgressBar completed={progress.completed} total={3}/><div className="lab-shell"><div className="lab-controls"><div><span className="eyebrow">Controla la función</span><MathFormula className="active-formula" source={label}/></div>{([ ["a",a,setA,-3,3,.25],["h",h,setH,-4,4,.5],["k",k,setK,-4,4,.5] ] as const).map(([name,val,set,min,max,step])=><label key={name}>{name} = <output>{val}</output><input aria-label={`Valor de ${name}`} type="range" min={min} max={max} step={step} value={val} onChange={e=>{set(+e.target.value);setAnswer(null)}}/></label>)}<button onClick={()=>{setA(1);setH(0);setK(0);setAnswer(null)}}>Restablecer</button><p><a className="text-link" href={equationIoGraphUrl([`y=${a}*(x-(${h}))^2+(${k})`])} target="_blank" rel="noopener noreferrer" aria-label="Explorar esta función con los parámetros elegidos en Equation.io (abre otra pestaña)">Explorar gráfica avanzada en Equation.io ↗</a></p><div className="observation"><b>Observa</b><p>{a===0?`Con a = 0, la función es constante: y = ${k}. Ya no es una parábola.`:`El vértice está en (${h}, ${k}). ${a>0?"Abre hacia arriba":"Abre hacia abajo"}${Math.abs(a)>1?" y es más estrecha":Math.abs(a)<1?" y es más ancha":""}.`}</p></div><div className="challenge-panel"><h3>Predice antes de mirar</h3><p>Con estos valores, ¿hacia dónde abre la gráfica?</p>{["arriba","abajo","constante"].map(v=><button key={v} onClick={()=>choose(v)}>{v}</button>)}{answer&&<p><b>{correct?"Correcto.":"Aún no."}</b> {correct?"El signo de a decide la orientación.":"Fíjate en el signo de a."}</p>}{correct&&<button onClick={()=>progress.advance(progress.completed+1)}>Guardar reto</button>}</div><QuadraticEquationChallenge key={`${a}:${h}:${k}`} a={a} h={h} k={k}/></div><div className="lab-graph"><svg viewBox="0 0 600 400" role="img" aria-label={`Gráfica de ${label}`}><defs><pattern id="grid" width="45" height="35" patternUnits="userSpaceOnUse"><path d="M45 0H0V35" fill="none" stroke="currentColor" opacity=".1"/></pattern></defs><rect width="600" height="400" fill="url(#grid)"/><path d="M0 200H600M300 0V400" stroke="currentColor" opacity=".5"/><path d={path} fill="none" stroke="#6840c5" strokeWidth="5"/><circle cx={300+h*45} cy={200-k*35} r="7" fill="#e8bc71"/><text x="570" y="190">x</text><text x="310" y="20">y</text></svg></div></div></>;
}
