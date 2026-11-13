import type { Metadata } from "next";
import Image from "next/image";
import Link from "@/components/safe-link";
import { Footer, Header, FormulaCard } from "@/components/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  title: "Aprende a pensar. Llega más alto.",
  description: "Sistema Zénit: comprende para llegar más alto. Matemática y ciencias con lecciones, ejercicios y laboratorios interactivos para comprobar conceptos.",
};

const homeImages = "/images/home";
const subjectGroups = [
  {
    id: "home-math-courses",
    kind: "math",
    title: "Matemáticas",
    description: "Cinco cursos para construir una base sólida y pensar con rigor.",
    subjects: [
      {
        title: "Álgebra",
        description: "Expresiones, ecuaciones, factorización y funciones.",
        href: "/aprende/matematica-preuniversitaria/algebra",
        image: "algebra-aura-hd.webp", width: 1200, height: 750,
        alt: "Mesa de estudio con cuaderno de factorización, parábola y útiles de álgebra.",
      },
      {
        title: "Aritmética",
        description: "Números, fracciones, proporciones y porcentajes.",
        href: "/aprende/matematica-preuniversitaria/aritmetica",
        image: "aritmetica-aura-hd.webp", width: 1200, height: 750,
        alt: "Cuaderno con fracciones, operaciones, porcentajes y calculadora de aritmética.",
      },
      {
        title: "Geometría",
        description: "Figuras, ángulos, áreas y sólidos geométricos.",
        href: "/aprende/matematica-preuniversitaria/geometria",
        image: "geometria-aura-hd.webp", width: 1200, height: 750,
        alt: "Cuaderno de geometría con figuras, instrumentos de dibujo y cuerpos geométricos.",
      },
      {
        title: "Trigonometría",
        description: "Ángulos, razones trigonométricas e identidades.",
        href: "/aprende/matematica-preuniversitaria/trigonometria",
        image: "trigonometria-aura-hd.webp", width: 1200, height: 750,
        alt: "Cuaderno con circunferencia trigonométrica, senos, cosenos y compás.",
      },
      {
        title: "Razonamiento Matemático",
        description: "Patrones, lógica, ingenio y estrategias de solución.",
        href: "/aprende/matematica-preuniversitaria/razonamiento-matematico",
        image: "razonamiento-matematico-aura-hd.webp", width: 1200, height: 750,
        alt: "Cuaderno con patrones numéricos, lógica, secuencias y acertijos.",
      },
    ],
  },
  {
    id: "home-science-courses",
    kind: "science",
    title: "Ciencias",
    description: "Física, Química y Biología para comprender la naturaleza y preparar tus próximos desafíos académicos.",
    subjects: [
      {
        title: "Física",
        description: "Movimiento, fuerzas y fenómenos que podemos modelar.",
        href: "/aprende/ciencias/fisica",
        image: "fisica-aura-hd.webp", width: 1200, height: 750,
        alt: "Mesa de física con péndulo, prismas, circuitos y apuntes de movimiento.",
      },
      {
        title: "Química",
        description: "Materia, estructura atómica y transformaciones.",
        href: "/aprende/ciencias/quimica",
        image: "quimica-aura-hd.webp", width: 1200, height: 750,
        alt: "Mesa de química con matraces, modelos moleculares y un cuaderno de estudio.",
      },
      {
        title: "Biología",
        description: "Células, genética, seres vivos y sistemas del cuerpo humano.",
        href: "/aprende/ciencias/biologia",
        image: "biologia-aura-hd.webp", width: 1200, height: 750,
        alt: "Microscopio, modelo de ADN, plantas y apuntes de biología en una mesa de estudio.",
      },
    ],
  },
] as const;

const routes = [
  { n: "01", title: "Secundaria", text: "Refuerza las bases y aprende a resolver con criterio.", href: "/aprende" },
  { n: "02", title: "Preuniversitario", text: "Prepara tu ingreso con álgebra, aritmética, geometría y más.", href: "/aprende/matematica-preuniversitaria" },
  { n: "03", title: "Universidad", text: "Da el siguiente paso con cálculo y matemática superior.", href: "/aprende/matematica-universitaria" },
] as const;

export default function Home() {
  return (
    <>
      <a className="zenit-skip-link" href="#zenit-main">Saltar al contenido principal</a>
      <Header />
      <main id="zenit-main" className="home-page-v2">
        <section className="hero wrap aura-hero" aria-labelledby="home-title">
          <div className="hero-copy">
            <span className="aura-hero-kicker"><span aria-hidden="true" className="aura-sparkle">✦</span> Donde la curiosidad se convierte en comprensión</span>
            <h1 id="home-title">Aprende a pensar.<br/><em>Llega más alto.</em></h1>
            <p className="lead">
              No basta con memorizar una fórmula. Cambia las variables, observa la gráfica y comprueba por qué funciona. Así aprendemos matemática y ciencias en Sistema Zénit.
            </p>
            <div className="actions">
              <Link className="button" href="/aprende?utm_source=sitio&utm_medium=home&utm_campaign=ruta_gratuita">Explorar materias <span aria-hidden="true">↗</span></Link>
              <Link className="text-link" href="/laboratorio?utm_source=sitio&utm_medium=home&utm_campaign=ruta_gratuita">Probar laboratorios <span aria-hidden="true">→</span></Link>
            </div>
            <p className="aura-hero-footnote"><span aria-hidden="true" className="aura-footnote-rule"/> Prueba con a, h y k: descubre cómo se transforma una parábola.</p>
          </div>
          <div className="aura-hero-lab"><FormulaCard/></div>
        </section>

        <section className="home-vision wrap" aria-labelledby="home-vision-title">
          <div className="home-vision-photo">
            <Image
              src={`${homeImages}/zenit-aspiracion-hd.webp`}
              width={1600} height={900} loading="eager" unoptimized
              sizes="(max-width: 850px) 100vw, 53vw"
              alt="Estudiante concentrado en un espacio de estudio moderno, entre cuadernos y representaciones científicas."
            />
          </div>
          <div className="home-vision-copy">
            <span className="home-visual-kicker">El sentido de Zénit</span>
            <h2 id="home-vision-title">Aprender no es memorizar. <em>Es descubrir la estructura.</em></h2>
            <p>Comprender una fórmula es saber de dónde viene, representarla y verificar el resultado. Ese es el criterio que buscamos desarrollar.</p>
            <span className="aura-vision-signature">Un paso firme en cada concepto.</span>
          </div>
        </section>

        <section className="home-subjects wrap" aria-labelledby="home-subjects-title">
          <div className="public-section-head home-cinematic-head">
            <div>
              <span className="home-visual-kicker">Encuentra tu camino</span>
              <h2 id="home-subjects-title">De la base al examen de admisión. <em>Curso por curso.</em></h2>
            </div>
            <p>Elige tu materia de secundaria y preparación preuniversitaria. Explora ocho cursos y sigue avanzando con nuevas incorporaciones.</p>
          </div>
          <div className="home-subject-groups">
            {subjectGroups.map((group) => (
              <section className="home-subject-group" key={group.id} aria-labelledby={group.id}>
                <div className="home-subject-group-heading">
                  <h3 id={group.id}>{group.title}</h3>
                  <p>{group.description}</p>
                </div>
                <div className={`home-subject-grid home-image-subject-grid ${group.kind === "math" ? "home-math-subject-grid" : "home-science-subject-grid"}`}>
                  {group.subjects.map((subject, index) => (
                    <Link href={subject.href} className="home-subject-card home-image-subject" key={subject.title}>
                      <div className="home-subject-photo">
                        <Image
                          src={`${homeImages}/zenit-${subject.image}`}
                          width={subject.width} height={subject.height}
                          loading="eager" unoptimized
                          sizes="(max-width: 700px) 100vw, (max-width: 1050px) 50vw, 33vw"
                          alt={subject.alt}
                        />
                      </div>
                      <div className="home-subject-info">
                        <span className="aura-course-index">{String(index + 1).padStart(2, "0")} · {group.kind === "math" ? "MATEMÁTICAS" : "CIENCIAS"}</span>
                        <h4>{subject.title}</h4>
                        <p>{subject.description}</p>
                        <span>{subject.title === "Biología" ? "Explorar introducción" : "Ver temas"} <span aria-hidden="true">↗</span></span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>

        <section className="home-innovation wrap" aria-labelledby="home-innovation-title">
          <div className="home-innovation-copy">
            <span className="home-visual-kicker">Zénit Lab · Aprendizaje interactivo</span>
            <h2 id="home-innovation-title">La mejor explicación es la que <em>puedes comprobar.</em></h2>
            <p>Explora representaciones, cambia variables y comprueba cada resultado. Comprender también es experimentar.</p>
            <div className="aura-lab-benefits" aria-label="Cómo aprender en el laboratorio">
              <span><i aria-hidden="true"/> Visualiza</span>
              <span><i aria-hidden="true"/> Experimenta</span>
              <span><i aria-hidden="true"/> Comprende</span>
            </div>
            <Link href="/herramientas" className="button">Abrir herramientas <span aria-hidden="true">↗</span></Link>
          </div>
          <div className="home-innovation-photo">
            <Image
              src={`${homeImages}/zenit-tecnologia-hd.webp`}
              width={1600} height={900} loading="eager" unoptimized
              sizes="(max-width: 850px) 100vw, 52vw"
              alt="Estudiante usando una pantalla con representaciones gráficas y geométricas."
            />
          </div>
        </section>

        <section className="home-human wrap" aria-labelledby="home-human-title">
          <div className="aura-human-heading">
            <span className="home-visual-kicker">Aprender también es crecer</span>
            <h2 id="home-human-title">La confianza se construye <em>comprendiendo.</em></h2>
            <p>Un aprendizaje sólido une ideas claras con práctica constante. Sin atajos ni fórmulas memorizadas sin sentido.</p>
          </div>
          <div className="aura-human-grid">
          <article className="home-human-card">
            <Image
              src={`${homeImages}/zenit-claridad-hd.webp`}
              width={1600} height={900} loading="eager" unoptimized
              sizes="(max-width: 750px) 100vw, 50vw"
              alt="Estudiante concentrada tomando apuntes frente a una gráfica matemática en un espacio de estudio."
            />
            <div>
              <span className="home-visual-kicker">Claridad mental</span>
              <h3>Piensa con claridad.</h3>
              <p>Identifica lo importante, razona cada paso y afronta problemas nuevos con más seguridad.</p>
            </div>
          </article>
          <article className="home-human-card">
            <Image
              src={`${homeImages}/zenit-mentoria-hd.webp`}
              width={1600} height={900} loading="eager" unoptimized
              sizes="(max-width: 750px) 100vw, 50vw"
              alt="Estudiante explorando un péndulo de Newton y resolviendo ejercicios en un espacio de estudio."
            />
            <div>
              <span className="home-visual-kicker">Aprendizaje humano</span>
              <h3>Avanza a tu ritmo.</h3>
              <p>Lecciones y ejemplos para seguir practicando, con una ruta que puedes recorrer a tu manera.</p>
            </div>
          </article>
          </div>
        </section>

        <section className="dark-section home-path-section" aria-labelledby="home-paths-title">
          <div className="wrap home-path-head">
            <div>
              <span className="home-visual-kicker">Tu camino de aprendizaje</span>
              <h2 id="home-paths-title">De secundaria a la universidad. <em>A tu manera.</em></h2>
            </div>
            <div className="home-path-photo">
              <Image
                src={`${homeImages}/zenit-versatilidad-hd.webp`}
                width={780} height={438} loading="eager" unoptimized
                sizes="(max-width: 850px) 100vw, 42vw"
                alt="Estudiante en un laboratorio de matemática y ciencias con gráficas, modelos y experimentos."
              />
            </div>
          </div>
          <div className="wrap path-grid">
            {routes.map((route) => (
              <Link href={route.href} className="path-card" key={route.n}>
                <span className="aura-path-number">ETAPA {route.n}</span>
                <h3>{route.title}</h3>
                <p>{route.text}</p>
                <b>Ver contenidos <span aria-hidden="true">→</span></b>
              </Link>
            ))}
          </div>
        </section>

        <section className="wrap trust home-trust" aria-labelledby="home-teacher-title">
          <figure className="home-teacher-portrait">
            <Image
              src="/juan-xavier.jpg" width={423} height={573} loading="eager"
              sizes="(max-width: 850px) 100vw, 360px"
              alt="Retrato de Juan Xavier, docente y creador de Sistema Zénit."
            />
            <figcaption className="aura-founder-caption">
              <strong>Juan Xavier</strong>
              <span>Docente y creador de Sistema Zénit</span>
            </figcaption>
          </figure>
          <div className="home-teacher-copy">
            <span className="home-visual-kicker">Una visión con rostro propio</span>
            <h2 id="home-teacher-title">Enseñar a pensar. <em>Inspirar a crecer.</em></h2>
            <p>Sistema Zénit nace de la experiencia docente de Juan Xavier en secundaria y preparación preuniversitaria, con una convicción: comprender importa tanto como resolver.</p>
            <p className="aura-founder-belief">Una educación que desarrolla criterio, confianza y autonomía.</p>
            <div className="actions">
              <Link href="/sobre-mi" className="button">Conocer el proyecto</Link>
              <Link href="/contacto" className="text-link">Hacer una consulta</Link>
            </div>
          </div>
        </section>

        <section className="home-last-step home-cinematic-end" aria-labelledby="home-end-title">
          <div className="home-end-picture" aria-hidden="true">
            <picture>
              <source media="(max-width: 700px)" srcSet={`${homeImages}/zenit-meta-hd-mobile.webp`} />
              <Image src={`${homeImages}/zenit-meta-hd.webp`} width={1916} height={821}
                loading="eager" unoptimized sizes="100vw" alt="" />
            </picture>
          </div>
          <div className="wrap home-last-step-inner">
            <div>
              <span className="home-visual-kicker">Tu siguiente paso comienza aquí</span>
              <h2 id="home-end-title">Tu próximo gran logro <em>comienza cuando comprendes.</em></h2>
              <p>Practica, comprueba tus ideas y sigue una ruta de estudio que tenga sentido para ti.</p>
            </div>
            <Link className="button" href="/aprende">Encuentra tu curso <span aria-hidden="true">↗</span></Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
