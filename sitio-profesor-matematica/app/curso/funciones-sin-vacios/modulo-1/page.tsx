import type { Metadata } from "next";
import Link from "@/components/safe-link";
import { Footer, Header } from "@/components/site";
import { MathFormula, MathText } from "@/components/math-formula";

export const metadata: Metadata = {
  alternates: { canonical: "/curso/funciones-sin-vacios/modulo-1" },
  title: "Módulo 1 · Leer una función",
  description: "Primer módulo abierto de Funciones sin Vacíos: entrada, salida, notación, dominio y representaciones.",
};

const lessons = [
  {
    id: "entrada-salida", n: "01", title: "Entrada, regla y salida", time: "8 min",
    body: "Una función no es solo una fórmula. Es una asignación: recibe una entrada permitida, aplica una regla y produce exactamente una salida. La palabra permitida importa, porque la regla también incluye el conjunto de valores que acepta.",
    lead: "Considera la función",
    formula: String.raw`f(x)=2x+3,\qquad f(-1)=1`,
    note: "La entrada es −1 y su salida es 1. La misma regla permite evaluar otras entradas de su dominio.",
  },
  {
    id: "notacion", n: "02", title: "Cómo leer f(x)", time: "10 min",
    body: String.raw`La letra \(f\) nombra la función. La variable \(x\) representa una entrada y \(f(x)\) representa la salida que le corresponde. Por eso \(f(4)\) no significa \(f\) multiplicado por 4.`,
    lead: "Para esta función cuadrática",
    formula: String.raw`g(t)=t^2-4t,\qquad g(2)=-4`,
    note: "El punto (2, −4) pertenece a su gráfica, porque al sustituir t = 2 la salida es −4.",
  },
  {
    id: "dominio", n: "03", title: "Dominio como restricción", time: "12 min",
    body: "El dominio reúne las entradas para las que la función tiene sentido. Primero revisa si la operación puede realizarse; después pregunta si la entrada es válida en el contexto.",
    lead: "Considera la función racional",
    formula: String.raw`q(x)=\dfrac{1}{x-4},\qquad x\ne 4`,
    note: "El denominador no puede ser cero: x = 4 queda excluido del dominio.",
    leadTwo: "En un modelo de área de un círculo:",
    formulaTwo: String.raw`A(r)=\pi r^2,\qquad r\ge 0`,
    noteTwo: "Aunque el cuadrado está definido para números negativos, un radio físico no puede ser negativo.",
  },
  {
    id: "representaciones", n: "04", title: "Fórmula, tabla y gráfica", time: "10 min",
    body: "Una misma función puede expresarse mediante una fórmula, pares ordenados, una tabla, una gráfica o una descripción verbal. Comprenderla implica cambiar de representación sin perder su significado.",
    lead: "Cada fila de una tabla vincula una entrada con su salida:",
    formula: String.raw`x\longmapsto f(x),\qquad (x,f(x))`,
    note: "El par ordenado correspondiente se ubica en el plano cartesiano como un punto de la gráfica.",
  },
];

const checkpoints = [
  String.raw`¿Qué diferencia existe entre \(f\), \(x\) y \(f(x)\)?`,
  "¿Por qué el dominio depende tanto de la fórmula como del contexto?",
  String.raw`Si \(f(2)=7\), ¿qué punto aparece en la gráfica?`,
  "Describe dos representaciones diferentes de una misma función.",
];

export default function ModuleOne() {
  return <><Header/><main>
    <section className="module-hero">
      <div className="wrap">
        <div>
          <p className="eyebrow light">Funciones sin Vacíos · Módulo abierto</p>
          <span className="module-number">01</span>
          <h1>Leer una función</h1>
          <p className="lead">Entrada, salida, notación, dominio y representaciones. La base que convierte una fórmula en una idea que puedes explicar.</p>
          <div className="module-meta"><span>4 lecciones</span><span>40 minutos</span><span>Cuaderno descargable</span></div>
        </div>
        <aside><span>OBJETIVO</span><p>Al terminar podrás interpretar <MathFormula source="f(x)" displayMode={false}/>, justificar entradas permitidas y conectar fórmula, tabla y gráfica.</p></aside>
      </div>
    </section>

    <section className="wrap module-layout">
      <nav aria-label="Contenido del módulo">
        <b>En este módulo</b>
        {lessons.map(lesson=><a key={lesson.id} href={`#${lesson.id}`}><span>{lesson.n}</span>{lesson.title}</a>)}
        <a href="#practica"><span>05</span>Práctica y cierre</a>
      </nav>
      <div className="lesson-content">
        {lessons.map(lesson=><article id={lesson.id} key={lesson.id}>
          <div className="lesson-label"><span>{lesson.n}</span><small>{lesson.time}</small></div>
          <h2>{lesson.title}</h2>
          <p><MathText source={lesson.body} inlineOnly/></p>
          <div className="worked-example math-worked-example">
            <b>EJEMPLO</b>
            <p><MathText source={lesson.lead} inlineOnly/></p>
            <MathFormula source={lesson.formula} displayMode={true} label={`Fórmula de ejemplo: ${lesson.title}`}/>
            <p><MathText source={lesson.note} inlineOnly/></p>
            {lesson.formulaTwo && <>
              <p><MathText source={lesson.leadTwo || ""} inlineOnly/></p>
              <MathFormula source={lesson.formulaTwo} displayMode={true} label="Fórmula de área de un círculo"/>
              <p><MathText source={lesson.noteTwo || ""} inlineOnly/></p>
            </>}
          </div>
          {lesson.id==="representaciones" &&
            <Link className="button secondary" href="/laboratorio/representaciones-de-funciones">Abrir laboratorio de representaciones</Link>}
        </article>)}
        <article id="practica">
          <div className="lesson-label"><span>05</span><small>Práctica</small></div>
          <h2>Explica antes de continuar</h2>
          <div className="checkpoint">
            {checkpoints.map((q,i)=><p key={i}><b>{i+1}.</b> <MathText source={q} inlineOnly/></p>)}
          </div>
          <div className="module-actions">
            <a className="button" href="/downloads/cuaderno-modulo-1.pdf" download>Descargar cuaderno PDF</a>
            <Link className="text-link" href="/diagnostico/funciones">Realizar diagnóstico</Link>
          </div>
        </article>
      </div>
    </section>

    <section className="module-next">
      <div className="wrap">
        <p className="eyebrow light">Siguiente paso</p>
        <h2>Comprueba la conexión, no solo el resultado.</h2>
        <p>Completa el cuaderno, utiliza el laboratorio y realiza el diagnóstico.</p>
        <Link className="button offer-primary" href="/contacto?interes=curso&utm_source=modulo_1&utm_campaign=mvp">Quiero participar en la edición fundadora</Link>
      </div>
    </section>
  </main><Footer/></>;
}
