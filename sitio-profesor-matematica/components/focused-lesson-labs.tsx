"use client";

import { useState, type ReactNode } from "react";

/**
 * Laboratorios de precisión temática: evitan enseñar polígonos cuando el tema
 * es congruencia, o un reloj cuando el tema es criptoaritmética.
 * Estos modelos son originales, autocontenidos y no sustituyen claves fuente.
 */
type Kind = "segments" | "congruence" | "parallel" | "cryptarithm" |
  "square" | "sequence" | "expression" | "frequency";

const TOPIC_LABS: Record<string, Kind> = {
  "nociones-basicas-de-geometria-1sec-unidad1": "segments",
  "congruencia-de-triangulos-1sec-unidad3": "congruence",
  "angulos-formados-por-2-rectas-paralelas-y-1-secante-1sec-unidad2": "parallel",
  "angulos-determinados-por-dos-rectas-paralelas-y-una-recta-secante-1sec-unidad2": "parallel",
  "criptoaritmetica-1sec-unidad2": "cryptarithm",
  "criptoaritmetica-1-1sec-unidad2": "cryptarithm",
  "criptoaritmetica-i-1sec-unidad2": "cryptarithm",
  "criptoaritmetica-ii-1sec-unidad3": "cryptarithm",
  "cuadrados-magicos-1sec-unidad3": "square",
  "secuencia-de-figuras-1sec-unidad1": "sequence",
  "psicotonico-secuencia-de-figuras-1sec-unidad1": "sequence",
  "expresion-algebraica-1sec-unidad1": "expression",
  "expresiones-algebraicas-1sec-unidad1": "expression",
  "tabla-de-dist-de-frec-para-datos-sin-agrupar-1sec-unidad2": "frequency",
  "tabla-de-distribucion-de-frecuencias-para-datos-sin-agrupar-1sec-unidad2": "frequency",
};

export function hasFocusedLessonLab(slug: string): boolean {
  return Object.prototype.hasOwnProperty.call(TOPIC_LABS, slug);
}

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
      <Explanation>AB + BC = AC, por tanto {ab} + {bc} = <strong>{ab + bc} cm</strong>. Mueve B y comprueba que la relación se mantiene.</Explanation>
    </div>
  );
}

function CongruenceLab() {
  const [percent, setPercent] = useState(100);
  const k = percent / 100;
  const match = percent === 100;
  const fmt = (n:number)=>Number(n.toFixed(2)).toLocaleString("es-PE");
  return (
    <div className="space-y-4">
      <p className="text-base text-stone-200">Compara dos triángulos rectángulos. La congruencia exige las mismas longitudes correspondientes; la semejanza, solo la misma forma.</p>
      <Slider id="congruence-ratio" title="Escala del segundo triángulo" value={percent} min={60} max={140} step={10} unit=" %" onChange={setPercent}/>
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
  const descriptions:Record<Kind,string>={
    segments:"Puntos, rectas y segmentos",
    congruence:"Congruencia de triángulos",
    parallel:"Paralelas y secante",
    cryptarithm:"Criptoaritmética y valor posicional",
    square:"Cuadrados mágicos",
    sequence:"Regularidades y secuencias",
    expression:"Expresiones algebraicas",
    frequency:"Distribución de frecuencias"
  };
  return (
    <section className="zenit-webapp-shell zenit-focused-lab rounded-3xl border border-emerald-700/70 bg-[#0e261f] p-5 md:p-8 space-y-5 shadow-xl" aria-label={"Laboratorio de " + title}>
      <header className="space-y-2">
        <p className="text-sm font-bold uppercase tracking-wide text-emerald-200">Laboratorio interactivo · Matemática aplicada</p>
        <h2 className="text-2xl md:text-3xl font-bold text-white">{descriptions[kind]}</h2>
        <p className="text-base leading-relaxed text-stone-200">Modifica el control, observa el cambio y explica la propiedad matemática que se conserva.</p>
      </header>
      {kind==="segments"&&<SegmentLab/>}
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
