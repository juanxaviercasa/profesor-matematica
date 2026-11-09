import type { Metadata } from "next";
import { Header, Footer } from "@/components/site";
import { HerramientasInteractiveHub } from "@/components/herramientas-hub";
import Link from "@/components/safe-link";

export const metadata: Metadata = {
  alternates: { canonical: "/herramientas" },
  title: "Herramientas Interactivas de Matemática y Ciencias · Sistema Zénit",
  description: "Explora simuladores de conjuntos, álgebra, funciones, geometría, trigonometría, estadística, cálculo y ciencias. Cambia valores, observa gráficas y comprueba resultados."
};

export default function HerramientasPage() {
  return <><Header/><main className="wrap tools-page-v2">
    <section className="public-tools-hero" aria-labelledby="tools-title">
      <div className="public-tools-hero-copy">
        <p className="eyebrow light">Sistema Zénit · Laboratorios interactivos</p>
        <h1 id="tools-title">Aprende probando, no solo mirando.</h1>
        <p>Explora herramientas de matemática y ciencias que te permiten modificar datos, visualizar resultados y contrastar tus propias predicciones. Descubre los 12 motores especializados de la plataforma.</p>
        <div className="actions"><a className="button offer-primary" href="#herramientas">Explorar las herramientas</a><Link className="text-link light-link" href="/aprende">Ver temas de aprendizaje</Link></div>
      </div>
      <div className="public-tools-visual" aria-hidden="true">
        <span className="public-tools-visual-kicker">CAMBIA UNA VARIABLE</span>
        <div className="public-tools-math">f(x) = ax² + bx + c</div>
        <svg viewBox="0 0 440 270"><path d="M35 220 H406 M220 22 V250" stroke="#91a79a" strokeWidth="2" opacity=".5"/><path d="M65 60 Q230 390 395 60" stroke="#d9ef78" fill="none" strokeWidth="6" strokeLinecap="round"/><circle cx="230" cy="222" r="9" fill="#ff5a36" stroke="#f7f3e9" strokeWidth="3"/></svg>
        <span className="public-tools-visual-note">ENTRADA → REPRESENTACIÓN → COMPRENSIÓN</span>
      </div>
    </section>
    <section className="public-tools-benefits" aria-label="Cómo aprovechar los simuladores">
      <div><b>01 · Explora</b><span>Elige el concepto que quieres estudiar.</span></div>
      <div><b>02 · Modifica</b><span>Cambia parámetros y observa su efecto.</span></div>
      <div><b>03 · Comprueba</b><span>Contrasta tus predicciones con el resultado.</span></div>
    </section>
    <section id="herramientas" className="tools-directory" aria-label="Catálogo de herramientas interactivas"><HerramientasInteractiveHub /></section>
    <section className="public-end-cta public-tools-end"><p>¿Prefieres estudiar un tema con explicación y ejercicios?</p><div><Link className="button secondary" href="/blog">Explorar la biblioteca</Link><Link className="text-link" href="/laboratorio">Laboratorios de funciones</Link></div></section>
  </main><Footer/></>;
}
