import type { Metadata } from "next";
import { Footer, Header, PageHero } from "@/components/site";
import Link from "@/components/safe-link";
import Image from "next/image";

const experience = [
  {year:"2025–2026", role:"Docente de Álgebra, Aritmética y Razonamiento Matemático", place:"Centro Preuniversitario Municipal de Ate · CEPREMUNI"},
  {year:"2020–2022", role:"Docente de Matemática y Ciencias a nivel preuniversitario", place:"Academia Pre Policial Fuerza Delta"},
  {year:"2018 y 2025", role:"Docente de Física, Química y Biología en secundaria", place:"I. E. P. Jesús de Nazareth - Belén"},
];

export const metadata: Metadata = {
  title: "Sobre el profesor Juan Xavier Cabello | Sistema Zénit",
  description: "Conoce la formación, trayectoria docente y método de enseñanza de Juan Xavier Cabello Salirrosas, bachiller en Matemática.",
};

export default function About(){return <><Header/><main className="about-page-v2"><PageHero kicker="Sobre el profesor" title="Juan Xavier Cabello Salirrosas" text="Bachiller en Matemática, docente escolar y preuniversitario, enfocado en funciones, razonamiento algebraico y preparación para cálculo."/><section className="wrap about-layout"><div className="portrait"><Image src="/juan-xavier-cabello.jpg" alt="Juan Xavier Cabello Salirrosas, profesor de matemática en Lima" width={423} height={573} sizes="(max-width: 850px) 100vw, 423px" priority/></div><div><h2>Enseñar conexiones, no listas de pasos</h2><p>Me formé como bachiller en Matemática en la Universidad Nacional de Educación Enrique Guzmán y Valle, La Cantuta. Desde 2018 he trabajado con estudiantes de secundaria y nivel preuniversitario en Lima, enseñando matemática y ciencias.</p><p>Mi experiencia reciente incluye cursos de Álgebra, Aritmética y Razonamiento Matemático en CEPREMUNI Ate, desde niveles básicos hasta avanzados. Mi objetivo es que cada estudiante pueda interpretar, representar y explicar una idea matemática, además de resolver ejercicios.</p><p>También tengo formación técnica en programación y desarrollo web. Esa combinación me permite crear herramientas interactivas para que conceptos abstractos como las funciones se puedan explorar y comprobar.</p><div className="credential-grid"><div><b>Bachiller en Matemática</b><span>Universidad Nacional de Educación Enrique Guzmán y Valle</span></div><div><b>Experiencia desde 2018</b><span>Secundaria y preparación preuniversitaria</span></div><div><b>Formación tecnológica</b><span>Programación y desarrollo web full stack</span></div></div></div></section><section className="wrap experience-section"><p className="eyebrow">Trayectoria docente</p><h2>Experiencia que conecta escuela, academia y tecnología.</h2><div className="experience-list">{experience.map(item=><article key={item.year}><span>{item.year}</span><div><h3>{item.role}</h3><p>{item.place}</p></div></article>)}</div></section>
<section className="wrap public-method" aria-labelledby="about-method-title">
  <div className="public-section-head"><p className="eyebrow">Mi manera de enseñar</p><h2 id="about-method-title">Comprender, representar y comprobar.</h2><p>La explicación se vuelve más útil cuando puedes ver una idea en diferentes representaciones y ponerla a prueba.</p></div>
  <div className="public-method-grid">
    <article><span>01</span><h3>Explicar la idea</h3><p>Entender qué significa una fórmula y cuándo tiene sentido usarla.</p></article>
    <article><span>02</span><h3>Verla en acción</h3><p>Relacionar palabras, tablas, gráficas y expresiones algebraicas.</p></article>
    <article><span>03</span><h3>Practicar con criterio</h3><p>Resolver, revisar el resultado y justificar cada procedimiento.</p></article>
  </div>
  <div className="public-end-cta"><p>¿Quieres conocer el método antes de consultar por clases?</p><div><Link className="button secondary" href="/curso/funciones-sin-vacios/modulo-1">Probar una lección</Link><Link className="text-link" href="/contacto?interes=clases">Consultar por clases</Link></div></div>
</section></main><Footer/></>}
