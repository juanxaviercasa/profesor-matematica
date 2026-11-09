import type { Metadata } from "next";
import Image from "next/image";
import Link from "@/components/safe-link";
import { Footer, Header, FormulaCard } from "@/components/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  title: "Funciones, precálculo y aprendizaje visual | Sistema Zénit",
  description: "Aprende a comprender funciones con diagnóstico gratuito, lecciones y laboratorios interactivos. Profesor Juan Xavier, matemática en Lima.",
};

const paths = [
  { n: "01", title: "Lee una función", text: "Conecta la notación con entradas, salidas y restricciones.", href: "/aprende/funciones" },
  { n: "02", title: "Interpreta su gráfica", text: "Reconoce crecimiento, cortes, dominio y rango sin memorizar recetas.", href: "/recursos" },
  { n: "03", title: "Transforma y predice", text: "Cambia parámetros y comprueba sus efectos en un laboratorio.", href: "/laboratorio/transformaciones-de-funciones" },
];

const nextSteps = [
  { n: "01", title: "Descubre qué necesitas reforzar", text: "Un diagnóstico breve te ayuda a identificar los conceptos que conviene revisar.", href: "/diagnostico/funciones", action: "Hacer diagnóstico" },
  { n: "02", title: "Prueba una lección completa", text: "Aprende a conectar notación, tabla y gráfica con explicaciones guiadas.", href: "/curso/funciones-sin-vacios/modulo-1", action: "Abrir módulo gratuito" },
  { n: "03", title: "Practica por tu cuenta", text: "Explora simuladores y observa cómo cambia una función cuando modificas sus parámetros.", href: "/laboratorio", action: "Entrar al laboratorio" },
];

export default function Home() {
  return <><Header/><main className="home-page-v2">
    <section className="hero wrap" aria-labelledby="home-title">
      <div className="hero-copy">
        <p className="eyebrow">Sistema Zénit · Matemática que conecta</p>
        <h1 id="home-title">Entiende funciones.<br/><em>Prepárate para cálculo.</em></h1>
        <p className="lead">Aprende con el profesor Juan Xavier, bachiller en Matemática y docente con experiencia escolar y preuniversitaria. Relaciona fórmulas, gráficas y comportamiento antes de entrar a cálculo.</p>
        <div className="actions">
          <Link className="button" href="/empieza?utm_source=sitio&utm_medium=home&utm_campaign=embudo_funciones">Empezar la ruta gratuita</Link>
          <Link className="text-link" href="/diagnostico/funciones?utm_source=sitio&utm_medium=home&utm_campaign=embudo_funciones">Hacer diagnóstico</Link>
        </div>
        <div className="proof-line" aria-label="Formación y metodología del profesor"><span>Bachiller en Matemática</span><span>Docencia desde 2018</span><span>Aprendizaje visual</span></div>
      </div>
      <FormulaCard/>
    </section>

    <section className="home-start wrap" aria-labelledby="home-start-title">
      <div className="public-section-head">
        <p className="eyebrow">Empieza con claridad</p>
        <h2 id="home-start-title">Tres formas de avanzar desde hoy.</h2>
        <p>No tienes que recorrer todo el sitio: elige el siguiente paso que corresponda a tu nivel.</p>
      </div>
      <div className="home-start-grid">
        {nextSteps.map(step => <article className="public-action-card" key={step.n}>
          <span className="public-card-number">{step.n}</span>
          <h3>{step.title}</h3>
          <p>{step.text}</p>
          <Link href={step.href}>{step.action} <span aria-hidden="true">→</span></Link>
        </article>)}
      </div>
    </section>

    <section className="dark-section">
      <div className="wrap split-heading"><p className="eyebrow light">La transición que importa</p><h2>De operar expresiones a comprender <em>cómo cambia</em> una cantidad.</h2></div>
      <div className="wrap path-grid">{paths.map(p => <Link href={p.href} className="path-card" key={p.n}><span>{p.n}</span><h3>{p.title}</h3><p>{p.text}</p><b>Explorar <span aria-hidden="true">→</span></b></Link>)}</div>
    </section>

    <section className="wrap feature-band">
      <div><p className="eyebrow">Laboratorio abierto</p><h2>Mueve los parámetros.<br/>Observa la función.</h2><p>Explora <strong>f(x) = a(x − h)² + k</strong>, formula una predicción y compárala con la gráfica. Una herramienta gratuita para poner a prueba lo que aprendiste.</p><Link className="button secondary" href="/laboratorio/transformaciones-de-funciones">Abrir el explorador</Link></div>
      <div className="mini-graph" aria-hidden="true"><svg viewBox="0 0 420 260"><path d="M28 232 C92 232 142 196 171 119 C194 58 226 28 278 28 C332 28 365 75 398 167" fill="none" stroke="currentColor" strokeWidth="5"/></svg><small>Fórmula · gráfica · comportamiento</small></div>
    </section>

    <section className="course-strip">
      <div className="wrap course-grid">
        <div><p className="eyebrow">Ruta guiada de funciones</p><h2>Funciones sin Vacíos</h2><p>Una ruta propuesta para conectar conceptos, practicar y prepararte mejor para cálculo. Consulta el calendario y las condiciones actuales.</p></div>
        <div className="course-meta">
          <span>Secundaria avanzada y primeros ciclos</span><span>Diagnóstico, laboratorios y ejercicios guiados</span><span>Consulta el programa y las condiciones actuales</span>
          <Link className="button" href="/cursos/funciones-para-calculo">Conocer el programa</Link>
        </div>
      </div>
    </section>

    <section className="wrap trust home-trust" aria-labelledby="home-teacher-title">
      <div className="home-teacher-portrait"><Image src="/juan-xavier-cabello.jpg" width={423} height={573} alt="Retrato del profesor Juan Xavier Cabello Salirrosas" sizes="(max-width: 850px) 100vw, 360px"/></div>
      <div className="home-teacher-copy">
        <p className="eyebrow">Conoce a tu profesor</p>
        <h2 id="home-teacher-title">Aprende con una persona, no solo con fórmulas.</h2>
        <p>Soy Juan Xavier Cabello Salirrosas, bachiller en Matemática por la Universidad Nacional de Educación Enrique Guzmán y Valle. He enseñado en secundaria y preparación preuniversitaria en Lima.</p>
        <p>Mi enfoque combina explicaciones, práctica guiada y herramientas digitales para comprender lo que representa cada resultado.</p>
        <div className="actions"><Link className="button" href="/sobre-mi">Conocer mi trayectoria</Link><Link className="text-link" href="/profesor-matematicas-lima">Clases en Lima</Link></div>
      </div>
    </section>

    <section className="home-last-step">
      <div className="wrap home-last-step-inner"><div><p className="eyebrow light">Tu siguiente paso</p><h2>Empieza por comprender.<br/>Luego practica y comprueba.</h2></div><Link className="button" href="/empieza">Elegir mi ruta gratuita</Link></div>
    </section>
  </main><Footer/></>;
}
