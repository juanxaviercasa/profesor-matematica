import Link from "./safe-link";
import Image from "next/image";
import { MathFormula } from "./math-formula";
import { CONTACT_EMAIL } from "@/lib/lead-message";
function Brand({inverse=false}:{inverse?:boolean}){return <span className={`brand${inverse?" inverse":""}`}><Image src="/brand/zenit-mark.svg" alt="" width={42} height={42}/><span className="brand-copy"><b>JUAN XAVIER</b><small>SISTEMA ZÉNIT</small></span></span>}
export function Header() {
  return <header className="site-header"><div className="wrap nav">
    <Link href="/" className="brand-link" aria-label="Profesor Juan Xavier · Sistema Zénit"><Brand/></Link>
    <nav className="desktop-links" aria-label="Navegación principal">
          <Link href="/blog">Blog</Link>
          <Link href="/herramientas">Web Apps</Link>
          <Link href="/aprende">Aprende</Link>
          <Link href="/laboratorio">Zénit Lab</Link>
          <Link href="/cursos/funciones-para-calculo">Cursos</Link>
          <Link href="/sobre-mi">Sobre mí</Link>
    </nav>
    <Link href="/empieza?utm_source=sitio&utm_medium=nav&utm_campaign=embudo_funciones" className="nav-cta">Empieza aquí</Link>
    <details className="mobile-menu">
      <summary><span className="menu-icon" aria-hidden="true">☰</span><span>Menú</span></summary>
      <nav className="mobile-links" aria-label="Navegación móvil">
          <Link href="/blog">Blog</Link>
          <Link href="/herramientas">Web Apps</Link>
          <Link href="/aprende">Aprende</Link>
          <Link href="/laboratorio">Zénit Lab</Link>
          <Link href="/cursos/funciones-para-calculo">Cursos</Link>
          <Link href="/sobre-mi">Sobre mí</Link>
        <Link href="/empieza?utm_source=sitio&utm_medium=nav-movil&utm_campaign=embudo_funciones" className="mobile-start">Empieza aquí</Link>
        <Link href="/contacto">Contacto</Link>
      </nav>
    </details>
  </div></header>;
}
export function Footer(){return <footer><div className="wrap footer-grid"><div><Link href="/" className="brand-link" aria-label="Profesor Juan Xavier · Sistema Zénit"><Brand inverse/></Link><p><strong>Matemática que conecta.</strong><br/>Funciones, álgebra y bases para cálculo desde Lima.</p></div><div><b>Aprende</b><Link href="/blog">Blog y recursos</Link><Link href="/herramientas">Suite de 12 Web Apps</Link><Link href="/aprende">Portal de Aprendizaje</Link><Link href="/diagnostico/funciones">Diagnóstico gratuito</Link><Link href="/laboratorio">Zénit Lab</Link></div><div><b>Profesor</b><Link href="/profesor-matematicas-lima">Clases en Lima</Link><Link href="/sobre-mi">Sobre mí</Link><Link href="/contacto">Contacto</Link></div><div><b>Conecta</b><a href="https://www.tiktok.com/@sistemazenit" target="_blank" rel="noreferrer">TikTok · @sistemazenit</a><Link href="/contacto">Consultar por WhatsApp</Link><a href="https://www.linkedin.com/in/xaviercabello/" target="_blank" rel="noreferrer">LinkedIn</a><a href={"mailto:" + CONTACT_EMAIL}>Correo</a></div></div><div className="wrap footer-base"><span>© 2026 Profesor Juan Xavier · Sistema Zénit</span><span><Link href="/privacidad">Privacidad y consultas</Link> · Educación matemática · Lima, Perú</span></div></footer>}
export function PlaceholderNote({text}:{text:string}){return <p className="placeholder-note"><b>Dato pendiente:</b> {text}</p>}
export function PageHero({kicker,title,text}:{kicker:string,title:string,text:string}){return <section className="page-hero wrap"><p className="eyebrow">{kicker}</p><h1>{title}</h1><p className="lead">{text}</p></section>}
export function FormulaCard(){return <div className="formula-card" aria-label="Representación de una función cuadrática"><div className="formula-top"><span>SISTEMA ZÉNIT · PUENTE HACIA CÁLCULO</span><i>01</i></div><MathFormula className="formula" source="f(x)=a(x−h)²+k"/><svg viewBox="0 0 520 320" role="img" aria-label="Gráfica de una parábola"><g stroke="currentColor" opacity=".2"><path d="M30 160H490M260 25V295"/><path d="M30 80H490M30 240H490M140 25V295M380 25V295"/></g><path d="M58 278 C136 270 195 214 230 122 C250 70 270 70 290 122 C325 214 384 270 462 278" fill="none" stroke="#ff5a36" strokeWidth="6"/><circle cx="260" cy="82" r="7" fill="#ddf277" stroke="#142c27" strokeWidth="3"/></svg><div className="formula-bottom"><span>fórmula</span><span>gráfica</span><span>comportamiento</span></div></div>}
