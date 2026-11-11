"use client";
import { useState } from "react";
import { MathFormula } from "./math-formula";
import { regularPolygonVertices, polygonInteriorSum, polygonDiagonalCount } from "@/lib/geometry-polygon.mjs";

type Topic={id:string;mode:string;label:string;formula:string};
const fmt=(x:number)=>Number(x.toFixed(2)).toLocaleString("es-PE");

/**
 * Una escena reutilizable por familia matemática. Los diagramas son ejemplos
 * etiquetados, no intentan representar todo el contenido de una lección.
 * El catálogo programado no se hace público por usar este componente.
 */
export function GeometryCurriculumLab({topic,title}:{topic:Topic;title:string}){
  const [size,setSize]=useState(3);
  const [n,setN]=useState(topic.id==="quadrilateral"?4:6);
  const [theta,setTheta]=useState(60);
  const [shift,setShift]=useState(2);
  const isRight=/right|metric-combined/.test(topic.id);
  const isMedian=topic.id==="triangle-lines";
  const cx=210,cy=145,rad=size*22;
  const secant=topic.id==="circle-metric",inscribed=topic.id==="circle-angle";
  const mode=topic.mode;
  const polygon=mode==="polygon"?regularPolygonVertices(n,size):[];
  const angleRad=theta*Math.PI/180;
  const upperX=isMedian?210:isRight?70:70+180*Math.cos(angleRad);
  const upperY=isMedian?35:isRight?55:230-180*Math.sin(angleRad);
  const choose=mode==="polygon"?{title:"Número de lados",value:n,min:3,max:12,change:setN}:
    mode==="triangles"?{title:isRight?"Escala de ejemplo":"Ángulo comprendido γ (grados)",value:isRight?size:theta,min:isRight?1:30,max:isRight?5:120,change:isRight?setSize:setTheta}:
    mode==="transform"?{title:"Desplazamiento horizontal (u)",value:shift,min:-3,max:5,change:setShift}:
    mode==="scale"?{title:"Denominador n de la escala 1:n",value:size,min:2,max:10,change:setSize}:
    {title:mode==="analytic"?"Parámetro de la representación":"Radio o medida de referencia (u)",value:size,min:1,max:5,change:setSize};
  const coordinates=mode==="polygon"?polygon.map(p=>p.x.toFixed(2)+","+p.y.toFixed(2)).join(" "):"";
  const yGraph=(x:number)=>topic.id==="parabola-equation"?0.25*(x-(size-3))**2-2:(size*.35)*x+1;
  const graphPath=Array.from({length:61},(_,i)=>{
    const x=-6+i*.2;return (i?"L":"M")+(210+24*x).toFixed(2)+" "+(145-24*yGraph(x)).toFixed(2);
  }).join(" ");
  const isCube=/nets|polyhedron|dihedral/.test(topic.id);
  const showRevolution=topic.id==="revolution";
  const readout=mode==="polygon"?
    "Polígono regular de "+n+" lados. Suma interior: "+polygonInteriorSum(n)+"°. Diagonales: "+polygonDiagonalCount(n)+".":
    mode==="circle"?
      (secant?"Dos secantes desde un punto exterior cumplen PA·PB = PC·PD.":"Longitud = "+fmt(2*Math.PI*size)+" u; área = "+fmt(Math.PI*size*size)+" u².") :
    mode==="triangles"?
      (isMedian?"La mediana divide BC por la mitad y el baricentro G cumple AG=2GM.":isRight?"Ejemplo de triángulo rectángulo; compara catetos e hipotenusa.":"Dos lados de 6 y 4 u, con ángulo comprendido "+theta+"°: tercer lado = "+fmt(Math.sqrt(36+16-48*Math.cos(angleRad)))+" u.") :
    mode==="area"?"Ejemplo de rectángulo: base "+size+" u, altura 4 u, área "+4*size+" u².":
    mode==="scale"?"A escala 1:"+size+", 5 cm del plano equivalen a "+(5*size)+" cm reales.":
    mode==="transform"?"Traslación T("+shift+",0): las longitudes y medidas de los ángulos se conservan.":
    mode==="solids"?
      (isCube?"Cubo de arista "+size+": 8 vértices, 12 aristas y 6 caras; área total "+6*size*size+" u².":
      showRevolution?"Ejemplo con radio "+size+" y altura 5: cilindro "+fmt(Math.PI*size*size*5)+" u³, cono "+fmt(Math.PI*size*size*5/3)+" u³.":
      "Ejemplo de base cuadrada de lado "+size+" y altura 5: prisma "+(5*size*size)+" u³, pirámide "+fmt(5*size*size/3)+" u³."):
    mode==="analytic"?
      (topic.id==="circle-equation"?"Circunferencia con centro en (0,0) y radio "+size+": x²+y²="+(size*size)+".":
      topic.id==="parabola-equation"?"Ejemplo de parábola y=0,25(x−"+(size-3)+")²−2.":
      topic.id==="line-equation"?"Ejemplo de recta y="+fmt(size*.35)+"x+1.":
      "Ejemplo de dos puntos A=(−2,1) y B=("+size+",3). Distancia "+fmt(Math.hypot(size+2,2))+" u."):"";
  return <section className="zenit-webapp-shell zenit-geometry-lab my-8 space-y-5 rounded-3xl border border-violet-400 bg-[#241b4b] p-4 text-white shadow-xl md:p-8"
    aria-label={"Laboratorio geométrico: "+title}>
    <header className="space-y-2">
      <p className="text-base font-semibold uppercase tracking-wider text-[#ffe3ab]">Laboratorio geométrico · Sistema Zénit</p>
      <h2 className="text-2xl font-bold text-white md:text-3xl">{title}</h2>
      <p className="text-base text-[#ebe1ff]">Modelo aplicado: {topic.label}. Explora un ejemplo y relaciónalo con la fórmula del tema.</p>
    </header>
    <div className="min-w-0 rounded-xl border border-violet-500 bg-[#1c1537] p-4">
      <MathFormula source={topic.formula} displayMode={true}/>
    </div>
    <label className="block space-y-2">
      <span className="block text-base font-semibold text-white">{choose.title}: <strong className="text-[#ffe3ab]">{choose.value}</strong></span>
      <input type="range" aria-label={choose.title} min={choose.min} max={choose.max}
        step={mode==="triangles"&&!isRight?5:1} value={choose.value}
        onChange={e=>choose.change(Number(e.target.value))}
        className="w-full accent-[#e8bc71]"/>
    </label>
    <div className="rounded-xl border border-[#8f78c0] bg-[#1e173c] p-3">
      <svg viewBox="0 0 420 300" role="img" aria-label={"Ejemplo dinámico de "+topic.label+"; "+readout} className="block h-auto w-full">
        <title>Representación geométrica de {topic.label}</title>
        {mode==="polygon"&&<g>
          <circle cx="210" cy="135" r={size*11} stroke="#9b88c2" strokeDasharray="4 5" fill="none"/>
          <polygon points={coordinates} fill="#6840c5" fillOpacity=".35" stroke="#b49aff" strokeWidth="3"/>
          <circle cx="210" cy="135" r="4" fill="#e8bc71"/>
        </g>}
        {mode==="triangles"&&<g>
          <polygon points={"70,230 340,230 "+upperX+","+upperY} fill="#6840c5" fillOpacity=".28" stroke="#b49aff" strokeWidth="3"/>
          {isMedian&&<g>
            <line x1={upperX} y1={upperY} x2="205" y2="230" stroke="#e8bc71" strokeWidth="3" strokeDasharray="6 4"/>
            <circle cx={(upperX+2*205)/3} cy={(upperY+460)/3} r="5" fill="#e8bc71"/>
            <text x="216" y="175" fontSize="17" fill="#ffe3ab">G</text>
          </g>}
          <text x={upperX+9} y={upperY-5} fill="#fff" fontSize="18">A</text>
          <text x="48" y="252" fill="#fff" fontSize="18">B</text>
          <text x="347" y="252" fill="#fff" fontSize="18">C</text>
        </g>}
        {mode==="circle"&&<g>
          <circle cx={cx} cy={cy} r={rad} fill="#6840c5" fillOpacity=".22" stroke="#b49aff" strokeWidth="3"/>
          <circle cx={cx} cy={cy} r="4" fill="#ffe3ab"/>
          {secant&&<g stroke="#e8bc71" strokeWidth="2.5">
            <line x1="48" y1={cy} x2={cx+rad} y2={cy}/>
            <line x1="48" y1={cy} x2="340" y2="28"/>
          </g>}
          {inscribed&&<g stroke="#ffe3ab" strokeWidth="2.5" fill="none">
            <path d={"M"+(cx-rad*.65)+" "+(cy-rad*.76)+" L"+cx+" "+(cy+rad)+" L"+(cx+rad*.65)+" "+(cy-rad*.76)}/>
            <path d={"M"+(cx-rad*.65)+" "+(cy-rad*.76)+" L"+cx+" "+cy+" L"+(cx+rad*.65)+" "+(cy-rad*.76)}/>
          </g>}
          <text x={cx+rad/2} y={cy-8} fill="#ffe3ab" fontSize="18">r={size}</text>
        </g>}
        {mode==="area"&&<g>
          <rect x="70" y="50" width={size*49} height="160" fill="#6840c5" fillOpacity=".35" stroke="#b49aff" strokeWidth="3"/>
          {topic.id==="shaded-area"&&<rect x="70" y="50" width={size*24.5} height="80" fill="#1e173c" stroke="#e8bc71" strokeWidth="3"/>}
          <text x="100" y="247" fill="#ffe3ab" fontSize="18">b={size}, h=4</text>
        </g>}
        {mode==="scale"&&<g strokeWidth="4">
          <line x1="46" y1="80" x2="162" y2="80" stroke="#e8bc71"/>
          <line x1="46" y1="170" x2="370" y2="170" stroke="#b49aff"/>
          <g fill="#fff" stroke="none" fontSize="18"><text x="45" y="55">Plano: 5 cm</text><text x="45" y="146">Real: {5*size} cm</text></g>
        </g>}
        {mode==="transform"&&<g>
          <line x1="20" y1="210" x2="400" y2="210" stroke="#9b88c2" strokeWidth="2"/>
          <polygon points="110,195 165,195 130,110" fill="#6840c5" fillOpacity=".22" stroke="#b49aff" strokeWidth="3"/>
          <polygon points={(110+shift*36)+",195 "+(165+shift*36)+",195 "+(130+shift*36)+",110"} fill="#e8bc71" fillOpacity=".25" stroke="#e8bc71" strokeWidth="3"/>
          <text x="29" y="45" fill="#fff" fontSize="16">Original: violeta · Trasladado: oro</text>
        </g>}
        {mode==="solids"&&<g fill="#6840c5" fillOpacity=".32" stroke="#b49aff" strokeWidth="2.7">
          {isCube?<g><polygon points="125,68 230,68 275,112 170,112"/><polygon points="125,68 170,112 170,228 125,182"/><polygon points="170,112 275,112 275,228 170,228"/></g>:
            showRevolution?<g><path d="M40 75 L40 210 Q100 230 160 210 L160 75 Z"/><ellipse cx="100" cy="75" rx="60" ry="17"/><path d="M245 215 L305 45 L365 215 Z"/><ellipse cx="305" cy="215" rx="60" ry="16"/></g>:
            <g><polygon points="44,85 138,85 170,113 76,113"/><polygon points="44,85 76,113 76,225 44,196"/><polygon points="76,113 170,113 170,225 76,225"/><polygon points="250,225 305,48 380,225"/></g>}
        </g>}
        {mode==="analytic"&&<g>
          <line x1="20" y1="145" x2="400" y2="145" stroke="#9786bc" strokeWidth="1.5"/>
          <line x1="210" y1="15" x2="210" y2="284" stroke="#9786bc" strokeWidth="1.5"/>
          {topic.id==="circle-equation"?<circle cx="210" cy="145" r={size*24} stroke="#b49aff" strokeWidth="3" fill="#6840c5" fillOpacity=".24"/>:
            topic.id==="analytic-intro"?<g stroke="#ffe3ab" strokeWidth="3"><line x1="162" y1="121" x2={210+size*24} y2="73"/><circle cx="162" cy="121" r="5" fill="#e8bc71"/><circle cx={210+size*24} cy="73" r="5" fill="#e8bc71"/></g>:
            <path d={graphPath} stroke="#e8bc71" strokeWidth="3" fill="none"/>}
          <text x="391" y="137" fill="#ffe3ab" fontSize="17">x</text>
          <text x="220" y="25" fill="#ffe3ab" fontSize="17">y</text>
        </g>}
      </svg>
    </div>
    <p role="status" aria-live="polite" className="rounded-xl border border-violet-500 bg-[#34265a] p-4 text-base leading-relaxed text-[#ffe3ab]">{readout}</p>
    <p className="text-base leading-relaxed text-[#e7dcff]">El gráfico representa un caso concreto del tema. Usa la teoría y los ejercicios de la lección para estudiar los demás casos.</p>
  </section>;
}
