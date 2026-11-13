import Link from "./safe-link";
import Image from "next/image";
import { QuadraticHeroLab } from "./quadratic-hero-lab";
import { CONTACT_EMAIL } from "@/lib/lead-message";

function Brand({ inverse = false }: { inverse?: boolean }) {
  return <span className={`brand${inverse ? " inverse" : ""}`}><Image src="/brand/zenit-phoenix.svg" alt="" width={44} height={50}/><span className="brand-copy"><b>Sistema Zénit</b><small>Comprende para llegar más alto.</small></span></span>;
}

export function Header() {
  return <header className="site-header"><div className="wrap nav">
    <Link href="/" className="brand-link"><Brand/></Link>
    <nav className="desktop-links" aria-label="Navegación principal">
      <Link href="/aprende">Aprende</Link>
      <Link href="/blog">Biblioteca</Link>
      <Link href="/herramientas">Herramientas</Link>
      <Link href="/laboratorio">Laboratorios</Link>
      <Link href="/sobre-mi">El proyecto</Link>
    </nav>
    <Link href="/empieza?utm_source=sitio&utm_medium=nav&utm_campaign=ruta_gratuita" className="nav-cta">Encuentra tu ruta</Link>
    <details className="mobile-menu">
      <summary><span className="menu-icon" aria-hidden="true">☰</span><span>Menú</span></summary>
      <nav className="mobile-links" aria-label="Navegación móvil">
        <Link href="/aprende">Aprende</Link>
        <Link href="/blog">Biblioteca</Link>
        <Link href="/herramientas">Herramientas</Link>
        <Link href="/laboratorio">Laboratorios</Link>
        <Link href="/sobre-mi">El proyecto</Link>
        <Link href="/empieza?utm_source=sitio&utm_medium=nav-movil&utm_campaign=ruta_gratuita" className="mobile-start">Encuentra tu ruta</Link>
        <Link href="/contacto">Contacto</Link>
      </nav>
    </details>
  </div></header>;
}

export function Footer() {
  return <footer><div className="wrap footer-grid"><div><Link href="/" className="brand-link"><Brand inverse/></Link><p><strong>Aprender no es memorizar. Es comprender.</strong><br/>Lecciones abiertas, práctica y laboratorios donde puedes comprobar conceptos. También puedes consultar por orientación académica.</p></div><div><b>Explora</b><Link href="/aprende">Portal de aprendizaje</Link><Link href="/blog">Biblioteca de temas</Link><Link href="/herramientas">Herramientas interactivas</Link><Link href="/laboratorio">Zénit Lab</Link></div><div><b>El proyecto</b><Link href="/sobre-mi">Sobre Sistema Zénit</Link><Link href="/profesor-matematicas-lima">Clases en Lima</Link><Link href="/contacto">Contacto</Link></div><div><b>Conecta</b><a href="https://www.tiktok.com/@sistemazenit" target="_blank" rel="noreferrer">TikTok · @sistemazenit</a><a href={"mailto:" + CONTACT_EMAIL}>Correo</a><Link href="/privacidad">Privacidad y consultas</Link></div></div><div className="wrap footer-base"><span>© 2026 Sistema Zénit · Creado y dirigido por Juan Xavier</span><span className="brand-founder-sr">© 2026 Juan Xavier · Sistema Zénit</span><span>Educación matemática y científica · Lima, Perú</span></div></footer>;
}

export function PlaceholderNote({ text }: { text: string }) { return <p className="placeholder-note"><b>Dato pendiente:</b> {text}</p>; }
export function PageHero({ kicker, title, text }: { kicker: string; title: string; text: string }) { return <section className="page-hero wrap"><p className="eyebrow">{kicker}</p><h1>{title}</h1><p className="lead">{text}</p></section>; }
export function FormulaCard() { return <QuadraticHeroLab/>; }
