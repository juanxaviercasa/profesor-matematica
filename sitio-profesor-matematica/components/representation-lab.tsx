"use client";

import { useMemo, useState } from "react";
import { LabProgressBar, trackLab, useLabProgress } from "./lab-progress";
import { MathFormula, MathText } from "./math-formula";
import { equationIoGraphUrl } from "@/lib/equation-io";

const families={
  linear:{label:"Lineal",formula:"f(x) = 2x - 1",fn:(x:number)=>2*x-1,note:"Cada aumento de 1 en x produce un aumento constante de 2 en f(x)."},
  quadratic:{label:"Cuadrática",formula:"f(x) = (x - 1)² - 2",fn:(x:number)=>(x-1)**2-2,note:"La salida disminuye hasta el vértice y luego vuelve a aumentar."},
  absolute:{label:"Valor absoluto",formula:"f(x) = |x + 1| - 2",fn:(x:number)=>Math.abs(x+1)-2,note:"La gráfica cambia de dirección en el punto donde x + 1 vale cero."},
};

type Family=keyof typeof families;
const equationIoExpressions:Record<Family,string>={
 linear:"y=2*x-1",quadratic:"y=(x-1)^2-2",absolute:"y=|x+1|-2"
};

export function RepresentationLab(){
  const [family,setFamily]=useState<Family>("linear");
  const [x,setX]=useState(2);
  const [answer,setAnswer]=useState<number|null>(null);
  const progress=useLabProgress("representaciones",3);
  const current=families[family];
  const rows=[-3,-2,-1,0,1,2,3].map(value=>({x:value,y:current.fn(value)}));
  const path=useMemo(()=>{
    const points=[];
    for(let value=-6;value<=6;value+=.1){const y=current.fn(value);points.push(`${210+value*28},${190-y*22}`)}
    return `M${points.join(" L")}`;
  },[current]);
  const px=210+x*28,py=190-current.fn(x)*22;
  const expected=current.fn(x);
  const options=[expected,expected+2,expected-2].filter((v,i,a)=>a.indexOf(v)===i).sort((a,b)=>a-b);
  const choose=(value:number)=>{setAnswer(value);trackLab("lab_answer","representaciones",value===expected?"correct":"retry")};

  return <><LabProgressBar completed={progress.completed} total={3}/><section className="representation-lab"><div className="representation-controls"><p className="eyebrow light">Elige una familia</p><div className="family-tabs">{Object.entries(families).map(([key,item])=><button key={key} className={family===key?"active":""} onClick={()=>{setFamily(key as Family);setAnswer(null)}}>{item.label}</button>)}</div><MathFormula className="active-formula" source={current.formula}/><label>Entrada x <output>{x}</output><input type="range" min="-5" max="5" step="1" value={x} onChange={event=>{setX(Number(event.target.value));setAnswer(null)}}/></label><div className="function-reading"><span>ENTRADA</span><strong>{x}</strong><i>→</i><span>SALIDA</span><strong>{current.fn(x)}</strong></div><p><MathText source={current.note} inlineOnly /></p><div className="challenge-panel"><h3>Reto de conexión</h3><p>Sin mirar el punto, ¿cuánto vale f({x})?</p>{options.map(v=><button key={v} onClick={()=>choose(v)}>{v}</button>)}{answer!==null&&<p><b>{answer===expected?"Correcto.":"Intenta otra vez."}</b> {answer===expected?"Fórmula, tabla y punto cuentan la misma historia.":"Sustituye x en la fórmula."}</p>}{answer===expected&&<button onClick={()=>progress.advance(progress.completed+1)}>Guardar reto</button>}</div></div><div className="representation-workspace"><div className="lab-table"><table><thead><tr><th>x</th>{rows.map(row=><th key={row.x}>{row.x}</th>)}</tr></thead><tbody><tr><th>f(x)</th>{rows.map(row=><td className={row.x===x?"active":""} key={row.x}>{row.y}</td>)}</tr></tbody></table></div><svg viewBox="0 0 420 380" role="img" aria-label={`Gráfica de ${current.formula}`}><g stroke="#ccd2ca" strokeWidth="1"><path d="M14 190H406M210 14V366"/><path d="M42 14V366M70 14V366M98 14V366M126 14V366M154 14V366M182 14V366M238 14V366M266 14V366M294 14V366M322 14V366M350 14V366M378 14V366" opacity=".45"/><path d="M14 36H406M14 58H406M14 80H406M14 102H406M14 124H406M14 146H406M14 168H406M14 212H406M14 234H406M14 256H406M14 278H406M14 300H406M14 322H406M14 344H406" opacity=".45"/></g><path d={path} fill="none" stroke="#ff5a36" strokeWidth="5" strokeLinecap="round"/><circle cx={px} cy={py} r="9" fill="#ddf277" stroke="#12372f" strokeWidth="4"/><text x={px+12} y={py-12} fontSize="12" fill="#12372f">({x}, {current.fn(x)})</text></svg><a className="text-link" href={equationIoGraphUrl([equationIoExpressions[family]])} target="_blank" rel="noopener noreferrer" title="Se abre en una pestaña nueva">Explorar la gráfica en Equation.io ↗</a><div className="representation-caption"><span>FÓRMULA</span><span>TABLA</span><span>GRÁFICA</span></div></div></section></>
}
