import type { Metadata } from "next";
import { FunnelLink, FunnelPageView } from "@/components/funnel";
import { Footer, Header } from "@/components/site";

export const metadata:Metadata={
  alternates: { canonical: "/clase/funciones-antes-de-calculo" },
  title:"Funciones antes de cálculo · Material de la clase",
  description:"Resume las tres conexiones que necesitas dominar antes de estudiar límites y derivadas.",
};

const connections=[
  ["01","Entrada y salida","Una función no es solo una fórmula: es una regla que acepta entradas permitidas y produce una salida."],
  ["02","Fórmula y gráfica","La expresión indica relaciones; la gráfica hace visible dónde crece, decrece, corta o cambia."],
  ["03","Cambio y predicción","Antes de calcular, aprende a anticipar qué debería ocurrir cuando cambia un parámetro."],
];

export default function ClassCompanion(){return <><Header/><main><FunnelPageView stage="class_material"/>
  <section className="class-hero wrap"><div><p className="eyebrow">Material de la clase · Juan Xavier</p><h1>Las tres conexiones que necesitas antes de cálculo.</h1><p className="lead">Repasa estas conexiones con ejemplos, comprueba tu nivel y decide qué necesitas practicar después.</p></div><aside><span>IDEA CLAVE</span><p>Una función se domina cuando puedes pasar de una representación a otra y explicar qué cambia.</p></aside></section>
  <section className="wrap connection-list">{connections.map(([n,title,text])=><article key={n}><span>{n}</span><div><h2>{title}</h2><p>{text}</p></div></article>)}</section>
  <section className="class-check"><div className="wrap class-check-grid"><div><p className="eyebrow light">Comprueba la comprensión</p><h2>Si una parábola sube 3 unidades, ¿qué cambia en la fórmula?</h2><p>El diagnóstico identifica si tu dificultad está en la notación, el dominio, la lectura gráfica o las transformaciones.</p></div><div><FunnelLink href="/diagnostico/funciones" stage="class_to_diagnostic" className="button offer-primary">Hacer diagnóstico de 10 preguntas</FunnelLink><FunnelLink href="/laboratorio/representaciones-de-funciones" stage="class_to_lab" className="light-link">Practicar en el laboratorio</FunnelLink></div></div></section>
  <section className="wrap class-offer"><div><p className="eyebrow">Siguiente paso</p><h2>Convierte explicaciones sueltas en una ruta de cuatro semanas.</h2><p>Funciones sin Vacíos propone diagnóstico, práctica y laboratorios. Consulta las condiciones del acompañamiento antes de inscribirte.</p></div><aside><b>S/149</b><span>Perú</span><b>US$39</b><span>Internacional</span><small>Importes de referencia; confirma las condiciones antes de pagar.</small><FunnelLink href="/cursos/funciones-para-calculo" stage="class_to_offer" className="button">Conocer la edición fundadora</FunnelLink></aside></section>
</main><Footer/></>}
