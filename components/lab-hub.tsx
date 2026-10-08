"use client";

import Link from "next/link";
import { useAllLabProgress } from "./lab-progress";

const labs = [
  { n:"01", slug:"representaciones", href:"/laboratorio/representaciones-de-funciones", title:"Representaciones conectadas", text:"Conecta fórmula, tabla y gráfica en tres familias de funciones.", tag:"Base", total:3 },
  { n:"02", slug:"lectura", href:"/laboratorio/lectura-de-graficas", title:"Lector completo de gráficas", text:"Identifica dominio, rango, ceros, extremos, simetrías, período y asíntotas.", tag:"Fundamento UNI", total:4 },
  { n:"03", slug:"transformaciones", href:"/laboratorio/transformaciones-de-funciones", title:"Transformaciones de parábolas", text:"Predice y comprueba el efecto de a, h y k sobre una función cuadrática.", tag:"Base", total:3 },
  { n:"04", slug:"dominio", href:"/laboratorio/dominio-de-funciones", title:"Detective del dominio", text:"Encuentra dónde existe una función y explica por qué aparecen restricciones.", tag:"Esencial", total:4 },
  { n:"05", slug:"clasificacion", href:"/laboratorio/clasificacion-de-funciones", title:"Clasificador de funciones", text:"Distingue funciones inyectivas, sobreyectivas y biyectivas mediante correspondencias.", tag:"Esencial UNI", total:4 },
  { n:"06", slug:"operaciones", href:"/laboratorio/operaciones-de-funciones", title:"Operaciones entre funciones", text:"Suma, resta, multiplica y divide funciones controlando siempre el dominio.", tag:"Fundamento UNI", total:4 },
  { n:"07", slug:"familias", href:"/laboratorio/familias-de-funciones", title:"Atlas de familias", text:"Compara diez familias por fórmula, gráfica, dominio, rango y comportamiento.", tag:"Atlas", total:4 },
  { n:"08", slug:"polinomios", href:"/laboratorio/polinomios-y-multiplicidad", title:"Polinomios y multiplicidad", text:"Conecta raíces, multiplicidad, signo y comportamiento extremo.", tag:"Familia avanzada", total:4 },
  { n:"09", slug:"racionales", href:"/laboratorio/racionales-y-asintotas", title:"Racionales y asíntotas", text:"Distingue restricciones, huecos y asíntotas verticales, horizontales y oblicuas.", tag:"Familia avanzada", total:4 },
  { n:"10", slug:"exp_log", href:"/laboratorio/exponenciales-y-logaritmos", title:"Exponenciales y logaritmos", text:"Comprueba crecimiento, dominio, asíntotas e inversión gráfica.", tag:"Familia avanzada", total:4 },
  { n:"11", slug:"circulo", href:"/laboratorio/circunferencia-unitaria", title:"Circunferencia unitaria", text:"Relaciona ángulos, coordenadas y las seis razones trigonométricas.", tag:"Trigonometría", total:4 },
  { n:"12", slug:"trig_directas", href:"/laboratorio/funciones-trigonometricas", title:"Funciones trigonométricas", text:"Compara seis funciones directas y tres auxiliares del temario UNI.", tag:"Trigonometría UNI", total:6 },
  { n:"13", slug:"trig_transformaciones", href:"/laboratorio/transformaciones-trigonometricas", title:"Estudio de ondas", text:"Controla amplitud, período, fase y eje medio en seno y coseno.", tag:"Trigonometría", total:4 },
  { n:"14", slug:"trig_inversas", href:"/laboratorio/inversas-trigonometricas", title:"Inversas trigonométricas", text:"Domina dominios, restricciones y rangos principales de las seis inversas.", tag:"Trigonometría UNI", total:6 },
  { n:"15", slug:"trig_ecuaciones", href:"/laboratorio/ecuaciones-trigonometricas", title:"Ecuaciones por intersección", text:"Resuelve ecuaciones e inecuaciones sobre un ciclo y generaliza soluciones.", tag:"Trigonometría UNI", total:6 },
  { n:"16", slug:"composicion", href:"/laboratorio/composicion-de-funciones", title:"Máquina de composición", text:"Sigue la entrada por dos máquinas y distingue f(g(x)) de g(f(x)).", tag:"Intermedio", total:3 },
  { n:"17", slug:"tramos", href:"/laboratorio/funciones-por-tramos", title:"Constructor por tramos", text:"Decide qué regla se activa y comprende los extremos abiertos y cerrados.", tag:"Intermedio", total:3 },
  { n:"18", slug:"inversa", href:"/laboratorio/funcion-inversa", title:"Espejo de la inversa", text:"Refleja puntos sobre y = x y descubre cuándo una inversa es función.", tag:"Intermedio", total:3 },
  { n:"19", slug:"limites", href:"/laboratorio/introduccion-a-limites", title:"Puente hacia límites", text:"Acércate desde ambos lados para anticipar la idea central del cálculo.", tag:"Puente a cálculo", total:3 },
  { n:"20", slug:"limites_algebraicos", href:"/laboratorio/limites-algebraicos", title:"Técnicas algebraicas de límites", text:"Resuelve indeterminaciones mediante sustitución, factorización, racionalización y fracciones.", tag:"Límites UNI", total:5 },
  { n:"21", slug:"limites_infinitos", href:"/laboratorio/limites-infinitos", title:"Infinito y asíntotas", text:"Interpreta límites infinitos y al infinito, con asíntotas verticales, horizontales y oblicuas.", tag:"Límites UNI", total:4 },
  { n:"22", slug:"limites_trig", href:"/laboratorio/limites-trigonometricos", title:"Límites trigonométricos", text:"Construye y aplica los límites notables de seno, tangente y coseno en radianes.", tag:"Cálculo UNI", total:5 },
  { n:"23", slug:"continuidad", href:"/laboratorio/continuidad-y-discontinuidades", title:"Continuidad bajo diagnóstico", text:"Verifica las tres condiciones y clasifica discontinuidades removibles, de salto e infinitas.", tag:"Cálculo UNI", total:5 },
  { n:"24", slug:"tasa_derivada", href:"/laboratorio/tasa-media-y-derivada", title:"De tasa media a derivada", text:"Convierte una pendiente secante en tangente mediante el límite del cociente incremental.", tag:"Puente a derivadas", total:4 },
];

export function LabHub(){
  const progress=useAllLabProgress();
  return <div className="lab-catalog">{labs.map(lab=>{const done=progress[lab.slug]||0;return <Link href={lab.href} className="lab-card" key={lab.slug}>
    <div className="lab-card-top"><span>{lab.n}</span><b>{lab.tag}</b></div><h2>{lab.title}</h2><p>{lab.text}</p>
    <div className="lab-card-progress"><i><span style={{width:`${Math.round(done/lab.total*100)}%`}}/></i><small>{done ? `${done} de ${lab.total} retos` : "Empezar laboratorio"}</small></div>
  </Link>})}</div>;
}
