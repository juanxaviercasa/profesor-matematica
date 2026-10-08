import type { Metadata } from "next";
import Link from "next/link";
import { Footer,Header } from "@/components/site";
export const metadata:Metadata={title:"Ruta completa de funciones y límites · nivel UNI",description:"Plan de estudio de funciones, trigonometría, inversas y límites para secundaria, preparación UNI y primeros ciclos."};
const blocks=[
 ["01","Fundamentos","Conjuntos, relaciones, dominio, rango, notación y representaciones.","En construcción"],
 ["02","Análisis de gráficas","Cortes, signo, monotonía, extremos, simetría, periodicidad y asíntotas.","Disponible"],
 ["03","Clasificación","Inyectiva, sobreyectiva, biyectiva, inversa y restricciones.","Disponible"],
 ["04","Familias algebraicas","Lineales, polinómicas, radicales, racionales, exponenciales y logarítmicas.","Disponible"],
 ["05","Operaciones e inversas","Operaciones, composición, identidad e inversa.","Disponible"],
 ["06","Trigonometría funcional","Seis funciones trigonométricas, transformaciones e inversas.","Programado"],
 ["07","Límites y continuidad","Laterales, infinitos, técnicas algebraicas, trigonométricos y continuidad.","Iniciado"],
 ["08","Entrenamiento UNI","Problemas graduados, prácticas cronometradas y simulacros.","Programado"],
];
export default function Page(){return <><Header/><main><section className="route-hero"><div className="wrap"><p className="eyebrow light">Sistema Zénit · Ruta maestra</p><h1>Funciones y límites con <em>nivel UNI.</em></h1><p className="lead">Una secuencia completa para pasar de reconocer una función a justificar límites, sin vacíos entre la secundaria, la preparación preuniversitaria y el primer ciclo.</p><div className="actions"><Link className="button offer-primary" href="/laboratorio">Entrar a Zénit Lab</Link><Link className="text-link light-link" href="/diagnostico/funciones">Medir mi nivel</Link></div></div></section><section className="wrap route-section"><div className="route-heading"><p className="eyebrow">Mapa curricular</p><h2>Ocho bloques, una sola progresión.</h2><p>Cada bloque integra explicación, laboratorio, práctica gradual y evaluación. El objetivo es comprender, representar y argumentar antes de acelerar la resolución.</p></div><div className="route-grid">{blocks.map(([n,title,text,status])=><article key={n}><span>{n}</span><b>{status}</b><h3>{title}</h3><p>{text}</p></article>)}</div><div className="route-principle"><p className="eyebrow">Estándar de dominio</p><h2>Ver, calcular y explicar.</h2><div><p><b>Ver:</b> reconocer el comportamiento en una tabla, fórmula o gráfica.</p><p><b>Calcular:</b> resolver con método y controlar el dominio.</p><p><b>Explicar:</b> justificar por qué la respuesta es válida.</p></div></div></section></main><Footer/></>}
