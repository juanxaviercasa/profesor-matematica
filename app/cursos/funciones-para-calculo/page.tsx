import type { Metadata } from "next";
import Link from "next/link";
import { FunnelLink, FunnelPageView } from "@/components/funnel";
import { Footer, Header } from "@/components/site";

export const metadata: Metadata = {
  title:"Funciones sin Vacíos · Curso puente hacia cálculo",
  description:"Curso de cuatro semanas para interpretar, representar y transformar funciones antes de iniciar cálculo. Edición fundadora del profesor Juan Xavier.",
};

const modules=[
  {n:"01",title:"Leer una función",text:"Variable, dependencia, notación, entrada, salida y restricciones."},
  {n:"02",title:"Ver lo que la fórmula dice",text:"Dominio, rango, cortes y comportamiento desde la gráfica."},
  {n:"03",title:"Familias y transformaciones",text:"Traslaciones, reflexiones, estiramientos y compresiones."},
  {n:"04",title:"Combinar funciones",text:"Operaciones, composición e inversa con interpretación."},
  {n:"05",title:"Puente hacia cálculo",text:"Variación, aproximación y lenguaje necesario para límites."},
];

const included=["24 lecciones breves de 8 a 12 minutos","4 laboratorios interactivos","60 ejercicios graduados con soluciones","Diagnóstico inicial y evaluación final","4 sesiones grupales de preguntas","Acceso al contenido durante 12 meses"];

const faqs=[
  ["¿Necesito saber cálculo?","No. La ruta construye las bases anteriores a límites y derivadas."],
  ["¿Qué conocimientos previos necesito?","Operaciones algebraicas básicas. Los vacíos frecuentes se revisan con el Botiquín algebraico."],
  ["¿Es para secundaria o universidad?","Está diseñada para 4.º y 5.º de secundaria, preparación preuniversitaria y primeros ciclos universitarios."],
  ["¿Por qué pagar si hay videos gratuitos?","Porque aquí recibes diagnóstico, secuencia, práctica graduada, laboratorios y retroalimentación en una sola ruta."],
  ["¿Ya puedo comprar?","La primera edición está en validación. Puedes solicitar información y conversar directamente con el profesor Juan Xavier."],
];

export default function Course(){return <><Header/><main><FunnelPageView stage="offer"/>
  <section className="offer-hero"><div className="wrap offer-hero-grid"><div><p className="eyebrow light">Sistema Zénit · Edición fundadora</p><h1>Funciones<br/><em>sin Vacíos</em></h1><p className="offer-subtitle">El puente de cuatro semanas entre “sé reemplazar valores” y “entiendo cómo se comporta una función”.</p><div className="actions"><FunnelLink className="button offer-primary" href="/contacto?interes=curso" stage="offer_to_whatsapp">Solicitar acceso fundador</FunnelLink><Link className="text-link light-link" href="/curso/funciones-sin-vacios/modulo-1">Probar el módulo abierto</Link></div><div className="offer-chips"><span>Secundaria avanzada</span><span>Preuniversitario</span><span>Primeros ciclos</span></div></div><div className="offer-promise"><span>TRANSFORMACIÓN</span><p>Interpreta, representa y transforma funciones con seguridad antes de iniciar cálculo.</p><svg viewBox="0 0 420 180" aria-hidden="true"><path d="M18 150C92 147 105 35 208 33c76-2 92 82 190 93" fill="none" stroke="#ff5a36" strokeWidth="8" strokeLinecap="round"/><circle cx="208" cy="33" r="10" fill="#ddf277"/></svg></div></div></section>

  <section className="wrap mvp-strip"><div><span>01</span><div><b>Diagnóstico gratuito</b><p>Diez preguntas y una ruta recomendada.</p></div><Link href="/diagnostico/funciones">Descubrir mi nivel →</Link></div><div><span>02</span><div><b>Módulo abierto</b><p>Entrada, salida, dominio y representaciones.</p></div><Link href="/curso/funciones-sin-vacios/modulo-1">Empezar ahora →</Link></div><div><span>03</span><div><b>Laboratorio nuevo</b><p>Fórmula, tabla y gráfica al mismo tiempo.</p></div><Link href="/laboratorio/representaciones-de-funciones">Abrir laboratorio →</Link></div></section>

  <section className="wrap offer-problem"><div><p className="eyebrow">El problema real</p><h2>No faltan videos.<br/>Falta una ruta.</h2></div><div><p>Muchos estudiantes saben sustituir un valor en una fórmula, pero se bloquean al explicar una gráfica, justificar el dominio o predecir una transformación.</p><p><strong>Funciones sin Vacíos</strong> organiza esas conexiones en una secuencia corta: diagnosticar, comprender, predecir, practicar y explicar.</p></div></section>

  <section className="dark-section" id="programa"><div className="wrap"><div className="split-heading"><p className="eyebrow light">Programa</p><h2>Cinco módulos para llegar a cálculo con una base <em>visible y comprobable.</em></h2></div><div className="offer-modules">{modules.map(m=><article key={m.n}><span>{m.n}</span><div><h3>{m.title}</h3><p>{m.text}</p></div></article>)}</div></div></section>

  <section className="wrap offer-included"><div><p className="eyebrow">Primera edición</p><h2>Aprender, practicar y recibir retroalimentación.</h2><p>La edición fundadora limita el grupo a 30 estudiantes porque incluye acompañamiento en vivo y un canal temporal de preguntas.</p></div><ul>{included.map(item=><li key={item}>{item}</li>)}</ul></section>

  <section className="bonus-section"><div className="wrap"><p className="eyebrow">Bonos fundadores</p><div className="bonus-grid"><article><span>01</span><h3>Botiquín algebraico</h3><p>Repaso de los errores de álgebra que suelen bloquear el aprendizaje de funciones.</p></article><article><span>02</span><h3>Atlas visual</h3><p>Guía imprimible de familias de funciones y sus transformaciones principales.</p></article><article><span>03</span><h3>Antes del límite</h3><p>Clase especial para leer comportamiento antes de aprender reglas de cálculo.</p></article></div></div></section>

  <section className="wrap offer-price"><div><p className="eyebrow">Oferta de validación</p><h2>Precio fundador</h2><p>Reservado para los primeros 30 estudiantes de la primera edición.</p><div className="price-row"><strong>S/149</strong><span>Perú</span><i>o</i><strong>US$39</strong><span>Internacional</span></div><p className="future-price">Precio previsto después de validar: S/249 o US$69.</p></div><aside><span className="status">LISTA PRIORITARIA ABIERTA</span><h3>Conversa primero con el profesor</h3><p>Cuéntanos tu nivel y dificultad. Confirmaremos si esta ruta corresponde a tu punto de partida antes de activar el pago.</p><FunnelLink className="button" href="/contacto?interes=curso" stage="offer_price_to_whatsapp">Quiero información</FunnelLink><small>No se realizará ningún cobro desde este formulario.</small></aside></section>

  <section className="guarantee-band"><div className="wrap"><div className="guarantee-mark">7</div><div><p className="eyebrow light">Garantía de claridad propuesta</p><h2>Siete días para confirmar que la ruta corresponde a tu nivel.</h2><p>Podrás revisar el diagnóstico y el primer módulo. Las condiciones completas se publicarán antes de habilitar la compra.</p></div></div></section>

  <section className="wrap offer-faq"><p className="eyebrow">Preguntas frecuentes</p><h2>Antes de unirte</h2><div>{faqs.map(([q,a])=><article key={q}><h3>{q}</h3><p>{a}</p></article>)}</div></section>

  <section className="wrap final-offer"><p className="eyebrow">Sistema Zénit</p><h2>No memorices otra gráfica.<br/><em>Aprende a leer lo que cambia.</em></h2><FunnelLink className="button secondary" href="/contacto?interes=curso" stage="offer_final_to_whatsapp">Solicitar acceso fundador</FunnelLink></section>
</main><Footer/></>}
