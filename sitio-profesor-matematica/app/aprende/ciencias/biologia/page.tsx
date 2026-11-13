import type { Metadata } from "next";
import Image from "next/image";
import Link from "@/components/safe-link";
import { Header, Footer } from "@/components/site";
import "./biology-intro.css";

export const metadata: Metadata = {
  title: "Biología · Sistema Zénit",
  description: "Explora células, genética, seres vivos y sistemas del cuerpo humano. Guía introductoria de Biología para secundaria y preparación preuniversitaria.",
  alternates: { canonical: "/aprende/ciencias/biologia" },
};

const topics = [
  { number: "01", name: "Biología celular", detail: "La célula como unidad de vida: membranas, estructuras y funciones esenciales." },
  { number: "02", name: "Genética y herencia", detail: "ADN, genes, cromosomas y las bases para entender la transmisión de caracteres." },
  { number: "03", name: "Anatomía y fisiología", detail: "Cómo se relacionan los sistemas del cuerpo humano para mantener la vida." },
  { number: "04", name: "Diversidad de seres vivos", detail: "Clasificación, organización y características de los principales grupos biológicos." },
  { number: "05", name: "Ecología", detail: "Relaciones entre organismos, ambiente, cadenas tróficas y equilibrio de ecosistemas." },
  { number: "06", name: "Evolución", detail: "Diversidad biológica, adaptación y fundamentos de los cambios de las poblaciones." },
] as const;

export default function BiologyIntroPage() {
  return <>
    <Header />
    <main id="zenit-main" className="zenit-bio">
      <div className="bio-wrap">
        <nav className="bio-breadcrumb" aria-label="Ruta de navegación">
          <Link href="/">Inicio</Link><span aria-hidden="true">/</span>
          <Link href="/aprende">Aprende</Link><span aria-hidden="true">/</span>
          <Link href="/aprende/ciencias">Ciencias</Link><span aria-hidden="true">/</span>
          <span aria-current="page">Biología</span>
        </nav>
        <section className="bio-hero" aria-labelledby="bio-title">
          <div>
            <span className="bio-kicker">Sistema Zénit · Ciencias</span>
            <h1 id="bio-title">Biología.<br /><em>Comprende la vida.</em></h1>
            <p className="bio-lead">Desde las células hasta los ecosistemas, la Biología nos ayuda a descubrir cómo funcionan los seres vivos. Conoce sus principales campos de estudio y fortalece tu base científica para secundaria y admisión.</p>
            <div className="bio-actions">
              <Link href="/aprende/ciencias" className="bio-btn">Explorar Ciencias ↗</Link>
              <Link href="/aprende" className="bio-btn bio-secondary">Ver los cursos disponibles</Link>
            </div>
          </div>
          <Image className="bio-hero-image" src="/images/home/zenit-biologia-aura.webp"
            width={600} height={375} alt="Estudio de Biología con microscopio, modelo de ADN y apuntes ilustrados."
            priority sizes="(max-width: 850px) 100vw, 45vw" />
        </section>
        <section className="bio-topics" aria-labelledby="bio-topics-title">
          <span className="bio-kicker">Mapa conceptual introductorio</span>
          <h2 id="bio-topics-title">Seis grandes campos para explorar</h2>
          <p className="bio-section-desc">Una visión inicial de la disciplina. Estos temas describen áreas de estudio y no representan lecciones publicadas ni ejercicios evaluados.</p>
          <div className="bio-topic-grid">
            {topics.map(t => <article key={t.number}>
              <span>{t.number} · BIOLOGÍA</span>
              <h3>{t.name}</h3>
              <p>{t.detail}</p>
            </article>)}
          </div>
          <p className="bio-note">¿Quieres empezar a practicar? Explora los cursos y herramientas que ya cuentan con lecciones publicadas en Sistema Zénit. <Link href="/aprende">Ver biblioteca de aprendizaje →</Link></p>
        </section>
      </div>
    </main>
    <Footer />
  </>;
}
