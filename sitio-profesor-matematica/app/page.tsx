import type { Metadata } from "next";
import Image from "next/image";
import Link from "@/components/safe-link";
import { Footer, Header, FormulaCard } from "@/components/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  title: "Matemática y ciencias para comprender | Sistema Zénit",
  description: "Biblioteca gratuita de Matemática y Ciencias para secundaria, preparación preuniversitaria y primeros ciclos universitarios, con lecciones, ejercicios y laboratorios interactivos.",
};

const routes = [
  { n: "01", title: "Secundaria", text: "Refuerza aritmética, álgebra, geometría, trigonometría y ciencias desde las bases.", href: "/aprende/matematica-preuniversitaria" },
  { n: "02", title: "Preuniversitario", text: "Practica razonamiento matemático y los temas que necesitas para avanzar con criterio.", href: "/blog" },
  { n: "03", title: "Universidad y ciencias", text: "Explora cálculo, álgebra lineal, ecuaciones diferenciales, física y química.", href: "/aprende" },
];
const nextSteps = [
  { n: "01", title: "Encuentra tu siguiente tema", text: "Navega por nivel y área para estudiar justo lo que necesitas hoy.", href: "/aprende", action: "Explorar la biblioteca" },
  { n: "02", title: "Aprende con una explicación", text: "Lee una lección, revisa ejemplos y practica con ejercicios graduados.", href: "/blog", action: "Ver los temas" },
  { n: "03", title: "Comprueba una idea", text: "Cambia valores en un laboratorio y observa qué sucede en tiempo real.", href: "/herramientas", action: "Probar herramientas" },
];

export default function Home() {
  return <><a className="zenit-skip-link" href="#zenit-main">Saltar al contenido principal</a><Header/><main id="zenit-main" className="home-page-v2">
    <section className="hero wrap" aria-labelledby="home-title">
      <div className="hero-copy"><p className="eyebrow">Sistema Zénit · Biblioteca gratuita</p><h1 id="home-title">Matemática y ciencias para <em>comprender.</em></h1><p className="lead">Encuentra lecciones, ejercicios y laboratorios interactivos para estudiar desde secundaria hasta los primeros ciclos universitarios. Aprende una idea, represéntala y comprueba cómo funciona.</p><div className="actions"><Link className="button" href="/aprende?utm_source=sitio&utm_medium=home&utm_campaign=ruta_gratuita">Explorar la biblioteca</Link><Link className="text-link" href="/herramientas?utm_source=sitio&utm_medium=home&utm_campaign=ruta_gratuita">Probar un laboratorio</Link></div><div className="proof-line" aria-label="Características de Sistema Zénit"><span>Contenido gratuito</span><span>Matemática y Ciencias</span><span>Aprendizaje visual</span></div></div><FormulaCard/>
    </section>
    <section className="home-start wrap" aria-labelledby="home-start-title"><div className="public-section-head"><p className="eyebrow">Empieza donde estés</p><h2 id="home-start-title">Un camino claro para aprender.</h2><p>No tienes que recorrer todo el sitio. Elige una puerta de entrada y avanza a tu ritmo.</p></div><div className="home-start-grid">{nextSteps.map(step => <article className="public-action-card" key={step.n}><span className="public-card-number">{step.n}</span><h3>{step.title}</h3><p>{step.text}</p><Link href={step.href}>{step.action} <span aria-hidden="true">→</span></Link></article>)}</div></section>
    <section className="dark-section"><div className="wrap split-heading"><p className="eyebrow light">Elige tu recorrido</p><h2>Del primer concepto a una explicación que puedes <em>defender.</em></h2></div><div className="wrap path-grid">{routes.map(route => <Link href={route.href} className="path-card" key={route.n}><span>{route.n}</span><h3>{route.title}</h3><p>{route.text}</p><b>Explorar <span aria-hidden="true">→</span></b></Link>)}</div></section>
    <section className="wrap feature-band"><div><p className="eyebrow">Ruta recomendada</p><h2>Funciones antes de cálculo.</h2><p>Relaciona fórmula, tabla y gráfica antes de entrar a límites y derivadas. Una ruta gratuita para entender qué cambia y por qué.</p><Link className="button secondary" href="/curso/funciones-sin-vacios/modulo-1">Abrir el módulo gratuito</Link></div><figure className="zenit-visual-figure"><picture><source media="(max-width: 640px)" srcSet="/brand/zenit-connection-mobile.svg" width={640} height={940}/><Image src="/brand/zenit-connection-desktop.svg" width={960} height={640} alt="Función f(x) igual a x al cuadrado menos cuatro x más tres. Su parábola abre hacia arriba, corta el eje X en 1 y 3 y tiene vértice en (2, menos 1)." sizes="(max-width: 640px) calc(100vw - 28px), (max-width: 1050px) calc(100vw - 40px), 520px"/></picture><figcaption>Una expresión, una gráfica y una interpretación coherentes. <strong>Raíces: 1 y 3 · Vértice: (2, −1).</strong></figcaption></figure></section>
    <section className="course-strip"><div className="wrap course-grid"><div><p className="eyebrow">Para seguir con guía</p><h2>Funciones sin Vacíos</h2><p>Una ruta propuesta para secundaria avanzada, preparación preuniversitaria y primeros ciclos. Primero prueba los recursos gratuitos; luego decide si necesitas acompañamiento.</p></div><div className="course-meta"><span>Diagnóstico y módulo abierto</span><span>Laboratorios y ejercicios guiados</span><span>Condiciones confirmadas antes de inscribirte</span><Link className="button" href="/cursos/funciones-para-calculo">Conocer la ruta</Link></div></div></section>
    <section className="wrap trust home-trust" aria-labelledby="home-teacher-title"><div className="home-teacher-portrait"><Image src="/juan-xavier.jpg" width={423} height={573} alt="Retrato de Juan Xavier" sizes="(max-width: 850px) 100vw, 360px"/></div><div className="home-teacher-copy"><p className="eyebrow">Creado y dirigido por Juan Xavier</p><h2 id="home-teacher-title">Una plataforma hecha para explicar conexiones.</h2><p>Sistema Zénit nace de la experiencia docente en secundaria y preparación preuniversitaria, y de la convicción de que comprender una idea importa tanto como resolver un ejercicio.</p><p>La persona detrás del proyecto aparece como guía y responsable; el protagonista es tu proceso de aprendizaje.</p><div className="actions"><Link className="button" href="/sobre-mi">Conocer el proyecto</Link><Link className="text-link" href="/contacto">Hacer una consulta</Link></div></div></section>
    <section className="home-last-step"><div className="wrap home-last-step-inner"><div><p className="eyebrow light">Tu siguiente paso</p><h2>Elige un tema.<br/>Entiéndelo y ponlo a prueba.</h2></div><Link className="button" href="/aprende">Entrar a la biblioteca</Link></div></section>
  </main><Footer/></>;
}
