"use client";

import { useId, useState, type ReactNode } from "react";
import { equationIoGraphUrl } from "@/lib/equation-io";
import { classifyAngle, anglePoint } from "@/lib/geometry-angles.mjs";
import { FOCUSED_LABS, type FocusedLabKind } from "@/lib/focused-lesson-topics";

/**
 * Laboratorios de precisión temática: evitan enseñar polígonos cuando el tema
 * es congruencia, o un reloj cuando el tema es criptoaritmética.
 * Estos modelos son originales, autocontenidos y no sustituyen claves fuente.
 */
type Kind = FocusedLabKind;
const TOPIC_LABS = FOCUSED_LABS;

function Slider({ id, title, value, min, max, step = 1, unit = "", onChange }: {
  id: string; title: string; value: number; min: number; max: number;
  step?: number; unit?: string; onChange: (next: number) => void;
}) {
  return (
    <div className="rounded-xl border border-emerald-700/60 bg-[#0b211c] p-4 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2 text-base">
        <label htmlFor={id} className="font-semibold text-white">{title}</label>
        <output htmlFor={id} className="font-bold tabular-nums text-lime-200">{value}{unit}</output>
      </div>
      <input
        id={id} type="range" min={min} max={max} step={step} value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        aria-label={title}
        className="w-full cursor-pointer accent-emerald-300"
      />
      <div className="flex justify-between text-sm text-stone-300"><span>{min}{unit}</span><span>{max}{unit}</span></div>
    </div>
  );
}

function Explanation({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl border border-emerald-700/60 bg-emerald-950/50 p-4">
      <p role="status" aria-live="polite" className="text-base leading-relaxed text-emerald-100">{children}</p>
    </div>
  );
}

/**
 * Comprobación formativa tipo CL for Desmos: respuesta numérica, corrección
 * inmediata y reinicio al cambiar los parámetros del gráfico.
 */
function GeometryAnswer({question,answer,unit}:{question:string;answer:number;unit:string}){
  const fieldId=useId();
  const [response,setResponse]=useState("");
  const normalized=response.trim().replace(",",".");
  const valid=normalized!=="" && Number.isFinite(Number(normalized));
  const correct=valid && Math.abs(Number(normalized)-answer)<1e-9;
  return (
    <div className="rounded-xl border border-violet-300/70 bg-[#302354] p-4 space-y-3">
      <label htmlFor={fieldId} className="block text-base font-semibold text-white">{question}</label>
      <div className="flex flex-wrap items-center gap-3">
        <input id={fieldId} type="text" inputMode="decimal" autoComplete="off"
          value={response} onChange={event=>setResponse(event.target.value)}
          placeholder="Escribe tu respuesta" aria-label={question}
          className="min-h-[44px] w-full min-w-0 max-w-[230px] rounded-lg border border-violet-200 bg-white px-3 py-2 text-base text-[#241b4b]"/>
        <span className="text-base text-[#ffe3ab]">{unit}</span>
      </div>
      <p role="status" aria-live="polite" className="min-h-6 text-base text-[#ffe3ab]">
        {correct?"¡Correcto! Has aplicado la propiedad matemática.":""}
      </p>
    </div>
  );
}

function AngleLab(){
  const [angle,setAngle]=useState(45);
  const [choice,setChoice]=useState<string|null>(null);
  const category=classifyAngle(angle);
  const ray=anglePoint(angle);
  const arc=anglePoint(angle,50);
  const label=anglePoint(angle/2,77);
  const options=["nulo","agudo","recto","obtuso","llano"] as const;
  return (
    <div className="space-y-4">
      <p className="text-base text-stone-100">
        Un ángulo mide el giro entre dos semirrectas con un origen común.
        Mueve el control y observa cómo cambia la abertura, desde 0° hasta 180°.
      </p>
      <Slider id="angle-measure" title="Medida del ángulo θ" value={angle} min={0} max={180}
        step={5} unit="°" onChange={next=>{setAngle(next);setChoice(null)}}/>
      <div className="rounded-xl border border-violet-400/60 bg-[#21183f] p-3">
        <svg viewBox="0 0 420 240" className="block h-auto w-full" role="img"
          aria-label={"Ángulo de "+angle+" grados. Tiene clasificación "+category+". Una semirrecta es horizontal y la otra gira hacia arriba."}>
          <title>Construcción dinámica del ángulo</title>
          <desc>La medida se modifica con un deslizador y se representa con dos semirrectas y un arco.</desc>
          <path d="M32 170H390" stroke="#9d8ac2" strokeWidth="1.5" strokeDasharray="5 6"/>
          <line x1="210" y1="170" x2="360" y2="170" stroke="#e8bc71" strokeWidth="4" strokeLinecap="round"/>
          <line x1="210" y1="170" x2={ray.x} y2={ray.y} stroke="#b49aff"
            strokeWidth="4" strokeLinecap="round"/>
          {angle>0&&<path d={"M260 170 A50 50 0 0 0 "+arc.x.toFixed(2)+" "+arc.y.toFixed(2)}
            fill="none" stroke="#f0d8a3" strokeWidth="2.5"/>}
          <circle cx="210" cy="170" r="5" fill="#fff" />
          <text x="200" y="190" textAnchor="end" fontSize="16" fill="#fff">O</text>
          <text x={label.x} y={label.y-6} textAnchor="middle" fontSize="18"
            fontWeight="700" fill="#ffe3ab">{angle}°</text>
          <text x="352" y="192" textAnchor="middle" fontSize="15" fill="#ffe3ab">0°</text>
          <text x="210" y="27" textAnchor="middle" fontSize="15" fill="#e8dffd">90°</text>
          <text x="78" y="192" textAnchor="middle" fontSize="15" fill="#e8dffd">180°</text>
        </svg>
      </div>
      <div className="rounded-xl border border-violet-300/70 bg-[#302354] p-4 space-y-3">
        <p className="font-semibold text-base text-white">¿Cómo se clasifica un ángulo de {angle}°?</p>
        <div role="group" aria-label="Clasificación de ángulos" className="flex flex-wrap gap-2">
          {options.map(value=><button key={value} type="button" aria-pressed={choice===value}
            className="zenit-geometry-choice min-h-[44px] rounded-lg border border-violet-200 bg-white px-4 py-2 font-semibold text-[#241b4b]"
            onClick={()=>setChoice(value)}>{value[0].toUpperCase()+value.slice(1)}</button>)}
        </div>
        <p role="status" aria-live="polite" className="min-h-6 text-base text-[#ffe3ab]">
          {choice?(choice===category?"¡Correcto! La clasificación depende de la medida.":
          "Revisa la abertura: 0° es nulo, menos de 90° es agudo, 90° es recto, entre 90° y 180° es obtuso y 180° es llano."):""}
        </p>
      </div>
      <Explanation>θ = <strong>{angle}°</strong>. Es un ángulo <strong>{category}</strong>.</Explanation>
    </div>
  );
}

function SegmentLab() {
  const [ab, setAb] = useState(4);
  const bc = 4;
  const xA = 38, xB = xA + 28 * ab, xC = xB + 28 * bc;
  return (
    <div className="space-y-4">
      <p className="text-base text-stone-200">Un punto determina una posición; el segmento tiene dos extremos. Si B está entre A y C, sus longitudes se suman.</p>
      <Slider id="segment-ab" title="Longitud AB" value={ab} min={2} max={8} unit=" cm" onChange={setAb}/>
      <div className="rounded-xl bg-[#081914] border border-emerald-800 p-3">
        <svg viewBox="0 0 460 124" role="img" aria-label={"A, B y C son colineales. AB mide " + ab + " cm, BC mide 4 cm y AC mide " + (ab + bc) + " cm."} className="w-full h-auto">
          <line x1="24" y1="70" x2="430" y2="70" stroke="#647d73" strokeWidth="2" strokeDasharray="4 5" />
          <line x1={xA} y1="70" x2={xC} y2="70" stroke="#a7f3d0" strokeWidth="5"/>
          <line x1={xA} y1="70" x2={xB} y2="70" stroke="#c9f37d" strokeWidth="5"/>
          {[{x:xA,label:"A"},{x:xB,label:"B"},{x:xC,label:"C"}].map(p=>(
            <g key={p.label}><circle cx={p.x} cy="70" r="6" fill="#f2f9ed"/>
              <text x={p.x} y="53" textAnchor="middle" fontSize="17" fill="#f2f9ed">{p.label}</text></g>
          ))}
          <text x={(xA+xB)/2} y="100" textAnchor="middle" fontSize="14" fill="#c9f37d">{ab} cm</text>
          <text x={(xB+xC)/2} y="100" textAnchor="middle" fontSize="14" fill="#a7f3d0">{bc} cm</text>
        </svg>
      </div>
      <GeometryAnswer key={"segment-"+ab} question={"Si AB = "+ab+" cm y BC = "+bc+" cm, ¿cuánto mide AC?"} answer={ab+bc} unit="cm"/>
      <a href={equationIoGraphUrl(["y=0","(0,0)","("+ab+",0)","("+(ab+bc)+",0)"])}
         target="_blank" rel="noopener noreferrer"
         className="inline-block text-base font-semibold text-[#ffe3ab] underline underline-offset-4">
        Explorar los puntos A, B y C en el plano XY
      </a>
      <Explanation>AB + BC = AC, por tanto {ab} + {bc} = <strong>{ab + bc} cm</strong>. Mueve B y comprueba que la relación se mantiene.</Explanation>
    </div>
  );
}

function CongruenceLab() {
  const [percent, setPercent] = useState(100);
  const [choice,setChoice]=useState<"yes"|"no"|null>(null);
  const k = percent / 100;
  const match = percent === 100;
  const fmt = (n:number)=>Number(n.toFixed(2)).toLocaleString("es-PE");
  return (
    <div className="space-y-4">
      <p className="text-base text-stone-200">Compara dos triángulos rectángulos. La congruencia exige las mismas longitudes correspondientes; la semejanza, solo la misma forma.</p>
      <Slider id="congruence-ratio" title="Escala del segundo triángulo" value={percent} min={60} max={140} step={10} unit=" %" onChange={next=>{setPercent(next);setChoice(null);}}/>
      <div className="rounded-xl bg-[#081914] border border-emerald-800 p-3">
        <svg viewBox="0 0 460 196" role="img" aria-label={"Primer triángulo de lados 3, 4, 5. Segundo triángulo de lados " + fmt(3*k) + ", " + fmt(4*k) + ", " + fmt(5*k) + "."} className="w-full h-auto">
          <polygon points="34,157 169,157 34,56" fill="#16634c" fillOpacity=".35" stroke="#a7f3d0" strokeWidth="3"/>
          <polygon points={"248,157 " + (248+135*k) + ",157 248," + (157-101*k)} fill="#5b6631" fillOpacity=".3" stroke="#c9f37d" strokeWidth="3"/>
          <text x="96" y="185" textAnchor="middle" fontSize="14" fill="#e2f9ef">4</text>
          <text x="18" y="112" textAnchor="middle" fontSize="14" fill="#e2f9ef">3</text>
          <text x="104" y="100" textAnchor="middle" fontSize="14" fill="#e2f9ef">5</text>
          <text x={248+63*k} y="185" textAnchor="middle" fontSize="14" fill="#e9f4c0">{fmt(4*k)}</text>
          <text x="235" y={157-50*k} textAnchor="end" fontSize="14" fill="#e9f4c0">{fmt(3*k)}</text>
          <text x={248+78*k} y={157-52*k} textAnchor="middle" fontSize="14" fill="#e9f4c0">{fmt(5*k)}</text>
          <text x="90" y="24" textAnchor="middle" fontSize="16" fill="#a7f3d0">Triángulo A</text>
          <text x="308" y="24" textAnchor="middle" fontSize="16" fill="#c9f37d">Triángulo B</text>
        </svg>
      </div>
      <div className="rounded-xl border border-violet-300/70 bg-[#302354] p-4 space-y-3">
        <p className="font-semibold text-base text-white">¿Son congruentes los dos triángulos?</p>
        <div className="flex flex-wrap gap-2">
          {(["yes","no"] as const).map(value=><button key={value} type="button"
            aria-pressed={choice===value} onClick={()=>setChoice(value)}
            className="min-h-[44px] rounded-lg border border-violet-200 bg-white px-5 py-2 text-base font-semibold text-[#241b4b]">
            {value==="yes"?"Sí":"No"}
          </button>)}
        </div>
        <p role="status" aria-live="polite" className="min-h-6 text-base text-[#ffe3ab]">
          {choice && ((choice==="yes")===match ?
            "¡Correcto! Compara las tres longitudes correspondientes." :
            "Revisa si las tres longitudes coinciden, no solo su proporción.")}
        </p>
      </div>
      <Explanation>
        {match ? "Los lados 3–4–5 coinciden con los del segundo triángulo. Son congruentes por LLL." :
          "Los lados del segundo triángulo están multiplicados por " + fmt(k) + ". Son semejantes, pero NO congruentes: sus longitudes difieren."}
      </Explanation>
    </div>
  );
}

function ParallelLab() {
  const [alpha, setAlpha] = useState(60);
  const r = alpha * Math.PI / 180;
  const dx = Math.cos(r) * 195;
  const dy = Math.sin(r) * 195;
  return (
    <div className="space-y-4">
      <p className="text-base text-stone-200">Dos rectas paralelas cortadas por una secante forman ángulos correspondientes de igual medida y ángulos colaterales internos suplementarios.</p>
      <Slider id="parallel-angle" title="Ángulo de referencia α" value={alpha} min={30} max={150} step={5} unit="°" onChange={setAlpha}/>
      <div className="rounded-xl bg-[#081914] border border-emerald-800 p-3">
        <svg viewBox="0 0 460 210" role="img" aria-label={"Paralelas cortadas por una secante. Los ángulos correspondientes miden " + alpha + " grados."} className="w-full h-auto">
          <line x1="18" y1="65" x2="440" y2="65" stroke="#a7f3d0" strokeWidth="3"/>
          <line x1="18" y1="155" x2="440" y2="155" stroke="#a7f3d0" strokeWidth="3"/>
          <line x1={230-dx} y1={110+dy} x2={230+dx} y2={110-dy} stroke="#f5db79" strokeWidth="3"/>
          <text x="30" y="55" fontSize="15" fill="#a7f3d0">r</text>
          <text x="30" y="144" fontSize="15" fill="#a7f3d0">s</text>
          <rect x="280" y="82" width="138" height="31" rx="7" fill="#124531"/>
          <text x="349" y="103" textAnchor="middle" fontSize="16" fill="#f0f7ef">α = {alpha}°</text>
        </svg>
      </div>
      <GeometryAnswer key={"parallel-"+alpha}
        question={"Si α = "+alpha+"°, ¿cuánto mide su ángulo colateral interno?"}
        answer={180-alpha} unit="°"/>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Explanation>Correspondientes: <strong>{alpha}°</strong> y <strong>{alpha}°</strong>.</Explanation>
        <Explanation>Colaterales internos: <strong>{alpha}°</strong> + <strong>{180-alpha}°</strong> = 180°.</Explanation>
      </div>
    </div>
  );
}

function CryptarithmLab() {
  const [a,setA]=useState(4);
  const b=9-a, ab=10*a+b, ba=10*b+a;
  return (
    <div className="space-y-4">
      <p className="text-base text-stone-200">Cada letra representa siempre la misma cifra. Letras distintas no pueden tener la misma cifra y el primer dígito no debe ser cero.</p>
      <Slider id="crypto-digit" title="Cifra A" value={a} min={1} max={8} onChange={setA}/>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="rounded-xl bg-[#081914] border border-emerald-800 px-4 py-6 text-center">
          <span className="block text-base text-stone-300">Número AB</span>
          <strong className="text-4xl tabular-nums text-emerald-200">{ab}</strong>
        </div>
        <div className="rounded-xl bg-[#081914] border border-emerald-800 px-4 py-6 text-center">
          <span className="block text-base text-stone-300">Número BA</span>
          <strong className="text-4xl tabular-nums text-lime-200">{ba}</strong>
        </div>
      </div>
      <Explanation>
        B = 9 − {a} = {b}. Por valor posicional, AB + BA = (10A + B) + (10B + A) = 11(A + B). <strong>{ab} + {ba} = 99</strong>.
      </Explanation>
    </div>
  );
}

const MAGIC = [[8,1,6],[3,5,7],[4,9,2]];
function SquareLab() {
  const [row,setRow] = useState(2);
  const active=MAGIC[row-1];
  return (
    <div className="space-y-4">
      <p className="text-base text-stone-200">En el cuadrado mágico normal de 3 × 3 se usan los números del 1 al 9 una sola vez. Todas las filas, columnas y diagonales principales suman 15.</p>
      <Slider id="magic-row" title="Fila para verificar" value={row} min={1} max={3} onChange={setRow}/>
      <div className="mx-auto max-w-[270px] grid grid-cols-3 gap-2" role="img" aria-label={"Cuadrado mágico. Fila " + row + " destacada, suma 15."}>
        {MAGIC.flatMap((line,i)=>line.map((n,j)=>(
          <div key={i+"-"+j} className={"aspect-square rounded-xl border flex items-center justify-center text-3xl font-bold tabular-nums "+(i===row-1?"bg-emerald-300 text-emerald-950 border-emerald-100":"bg-[#09251d] text-stone-100 border-emerald-800")}>{n}</div>
        )))}
      </div>
      <Explanation>Fila {row}: {active.join(" + ")} = <strong>15</strong>. Como la suma de 1 a 9 es 45, cada fila debe sumar 45/3 = 15.</Explanation>
    </div>
  );
}

function SequenceLab() {
  const [term,setTerm]=useState(4);
  const count=2*term-1;
  return (
    <div className="space-y-4">
      <p className="text-base text-stone-200">Observa una secuencia de figuras construidas con cuadrados: cada figura agrega exactamente dos cuadrados a la anterior.</p>
      <Slider id="sequence-term" title="Número de figura n" value={term} min={1} max={6} onChange={setTerm}/>
      <div className="rounded-xl bg-[#081914] border border-emerald-800 p-5 min-h-[140px] flex flex-wrap items-center justify-center gap-2" role="img" aria-label={"Figura " + term + " con " + count + " cuadrados."}>
        {Array.from({length:count},(_,i)=><span key={i} className="block size-8 rounded-md border-2 border-lime-200 bg-emerald-700/50" />)}
      </div>
      <Explanation>La figura {term} contiene <strong>2 × {term} − 1 = {count}</strong> cuadrados. Compara figuras consecutivas y explica la diferencia.</Explanation>
    </div>
  );
}

function ExpressionLab() {
  const [x,setX]=useState(2);
  const value=5*x;
  return (
    <div className="space-y-4">
      <p className="text-base text-stone-200">Los términos semejantes tienen la misma variable con el mismo exponente. Sus coeficientes se suman o restan.</p>
      <Slider id="expression-x" title="Valor de x" value={x} min={-4} max={4} onChange={setX}/>
      <div className="rounded-xl bg-[#081914] border border-emerald-800 p-4 text-center space-y-3">
        <p className="text-xl font-bold text-white">4x + 3x − 2x = (4 + 3 − 2)x = 5x</p>
        <p className="text-base text-emerald-200">Cuando x = {x}, ambos lados valen {value}.</p>
      </div>
      <Explanation>La igualdad se conserva para todos los valores de x porque los coeficientes 4, 3 y −2 suman 5. No debes sumar exponentes al reducir términos semejantes.</Explanation>
    </div>
  );
}

function FrequencyLab() {
  const [value,setValue]=useState(3);
  const dataset=[2,2,3,4,4,4];
  const frequencies=[2,1,3];
  const frequency=frequencies[value-2];
  const pct=Math.round(frequency/dataset.length*1000)/10;
  return (
    <div className="space-y-4">
      <p className="text-base text-stone-200">Los datos observados son 2, 2, 3, 4, 4 y 4. Cuenta cada valor y verifica que la suma de frecuencias sea 6.</p>
      <Slider id="frequency-value" title="Valor que deseas analizar" value={value} min={2} max={4} onChange={setValue}/>
      <div className="rounded-xl bg-[#081914] border border-emerald-800 p-4 space-y-3">
        {[2,3,4].map((v,i)=>(
          <div key={v} className="grid grid-cols-[2.5rem_minmax(0,1fr)_2rem] items-center gap-3">
            <span className={v===value?"font-bold text-lime-200":"text-stone-200"}>{v}</span>
            <div className="h-8 rounded-md bg-emerald-950 overflow-hidden">
              <div className={"h-full rounded-md "+(v===value?"bg-lime-300":"bg-emerald-500")} style={{width:(frequencies[i]/3*100)+"%"}}/>
            </div>
            <span className="text-right text-base text-stone-100">{frequencies[i]}</span>
          </div>
        ))}
      </div>
      <Explanation>El valor {value} aparece <strong>{frequency}</strong> {frequency===1?"vez":"veces"} entre 6 observaciones: frecuencia relativa {frequency}/6, equivalente a <strong>{pct} %</strong>.</Explanation>
    </div>
  );
}

export function FocusedLessonLab({slug,title}:{slug:string;title:string}) {
  const kind=TOPIC_LABS[slug];
  if(!kind) return null;
  const isGeometry=["segments","angles","congruence","parallel"].includes(kind);
  const descriptions:Record<Kind,string>={
    segments:"Puntos, rectas y segmentos",
    angles:"Clasificación y medida de ángulos",
    congruence:"Congruencia de triángulos",
    parallel:"Paralelas y secante",
    cryptarithm:"Criptoaritmética y valor posicional",
    square:"Cuadrados mágicos",
    sequence:"Regularidades y secuencias",
    expression:"Expresiones algebraicas",
    frequency:"Distribución de frecuencias"
  };
  return (
    <section className={"zenit-webapp-shell zenit-focused-lab rounded-3xl border p-5 md:p-8 space-y-5 shadow-xl "+(isGeometry?"zenit-geometry-lab border-violet-500/70 bg-[#241b4b]":"border-emerald-700/70 bg-[#0e261f]")} aria-label={"Laboratorio de " + title}>
      <header className="space-y-2">
        <p className="text-sm font-bold uppercase tracking-wide text-emerald-200">Laboratorio interactivo · Matemática aplicada</p>
        <h2 className="text-2xl md:text-3xl font-bold text-white">{descriptions[kind]}</h2>
        <p className="text-base leading-relaxed text-stone-200">Modifica el control, observa el cambio y explica la propiedad matemática que se conserva.</p>
      </header>
      {kind==="segments"&&<SegmentLab/>}
      {kind==="angles"&&<AngleLab/>}
      {kind==="congruence"&&<CongruenceLab/>}
      {kind==="parallel"&&<ParallelLab/>}
      {kind==="cryptarithm"&&<CryptarithmLab/>}
      {kind==="square"&&<SquareLab/>}
      {kind==="sequence"&&<SequenceLab/>}
      {kind==="expression"&&<ExpressionLab/>}
      {kind==="frequency"&&<FrequencyLab/>}
    </section>
  );
}
