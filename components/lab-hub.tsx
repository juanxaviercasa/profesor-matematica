"use client";

import Link from "next/link";
import { useAllLabProgress } from "./lab-progress";

const labs = [
  { n:"01", slug:"representaciones", href:"/laboratorio/representaciones-de-funciones", title:"Representaciones conectadas", text:"Conecta fórmula, tabla y gráfica en tres familias de funciones.", tag:"Base", total:3 },
  { n:"02", slug:"transformaciones", href:"/laboratorio/transformaciones-de-funciones", title:"Transformaciones de parábolas", text:"Predice y comprueba el efecto de a, h y k sobre una función cuadrática.", tag:"Base", total:3 },
  { n:"03", slug:"dominio", href:"/laboratorio/dominio-de-funciones", title:"Detective del dominio", text:"Encuentra dónde existe una función y explica por qué aparecen restricciones.", tag:"Esencial", total:4 },
  { n:"04", slug:"composicion", href:"/laboratorio/composicion-de-funciones", title:"Máquina de composición", text:"Sigue la entrada por dos máquinas y distingue f(g(x)) de g(f(x)).", tag:"Intermedio", total:3 },
  { n:"05", slug:"tramos", href:"/laboratorio/funciones-por-tramos", title:"Constructor por tramos", text:"Decide qué regla se activa y comprende los extremos abiertos y cerrados.", tag:"Intermedio", total:3 },
  { n:"06", slug:"inversa", href:"/laboratorio/funcion-inversa", title:"Espejo de la inversa", text:"Refleja puntos sobre y = x y descubre cuándo una inversa es función.", tag:"Intermedio", total:3 },
  { n:"07", slug:"limites", href:"/laboratorio/introduccion-a-limites", title:"Puente hacia límites", text:"Acércate desde ambos lados para anticipar la idea central del cálculo.", tag:"Puente a cálculo", total:3 },
];

export function LabHub(){
  const progress=useAllLabProgress();
  return <div className="lab-catalog">{labs.map(lab=>{const done=progress[lab.slug]||0;return <Link href={lab.href} className="lab-card" key={lab.slug}>
    <div className="lab-card-top"><span>{lab.n}</span><b>{lab.tag}</b></div><h2>{lab.title}</h2><p>{lab.text}</p>
    <div className="lab-card-progress"><i><span style={{width:`${Math.round(done/lab.total*100)}%`}}/></i><small>{done ? `${done} de ${lab.total} retos` : "Empezar laboratorio"}</small></div>
  </Link>})}</div>;
}
