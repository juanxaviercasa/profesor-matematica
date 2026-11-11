import type { Metadata } from "next";
import Image from "next/image";
import Link from "@/components/safe-link";
import { Footer, Header, FormulaCard } from "@/components/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  title: "Matemática y ciencias para comprender | Sistema Zénit",
  description: "Biblioteca gratuita de Matemática y Ciencias para secundaria, preparación preuniversitaria y primeros ciclos universitarios, con lecciones, ejercicios y laboratorios interactivos.",
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
        image: "algebra.svg", width: 640, height: 390,
        alt: "Expresión algebraica factorizada y representación de una parábola.",
      },
      {
        title: "Aritmética",
        description: "Números, fracciones, proporciones y porcentajes.",
        href: "/aprende/matematica-preuniversitaria/aritmetica",
        image: "aritmetica.svg", width: 640, height: 390,
        alt: "Equivalencia entre la fracción tres cuartos y el decimal cero coma setenta y cinco.",
      },
      {
        title: "Geometría",
        description: "Figuras, ángulos, áreas y sólidos geométricos.",
        href: "/aprende/matematica-preuniversitaria/geometria",
        image: "geometria.svg", width: 640, height: 390,
        alt: "Triángulo rectángulo con lados de tres, cuatro y cinco unidades.",
      },
      {
        title: "Trigonometría",
        description: "Ángulos, razones trigonométricas e identidades.",
        href: "/aprende/matematica-preuniversitaria/trigonometria",
        image: "trigonometria.svg", width: 640, height: 390,
        alt: "Circunferencia trigonométrica con proyecciones de seno y coseno.",
      },
      {
        title: "Razonamiento Matemático",
        description: "Patrones, lógica, ingenio y estrategias de solución.",
        href: "/aprende/matematica-preuniversitaria/razonamiento-matematico",
        image: "razonamiento-matematico.svg", width: 640, height: 390,
        alt: "Secuencia numérica de duplicación que invita a descubrir el siguiente término.",
      },
    ],
  },
  {
    id: "home-science-courses",
    kind: "science",
    title: "Ciencias",
    description: "Explora los fenómenos físicos y las transformaciones de la materia.",
    subjects: [
      {
        title: "Física",
        description: "Movimiento, fuerzas y fenómenos que podemos modelar.",
        href: "/aprende/ciencias/fisica",
        image: "fisica.webp", width: 640, height: 400,
        alt: "Estudiante observando un péndulo de Newton en una mesa de estudio.",
      },
      {
        title: "Química",
        description: "Materia, estructura atómica y transformaciones.",
        href: "/aprende/ciencias/quimica",
        image: "quimica.webp", width: 600, height: 400,
        alt: "Matraces de laboratorio y modelo molecular bajo luz violeta.",
      },
    ],
  },
] as const;

const routes = [
  { n: "01", title: "Secundaria", text: "Construye una base sólida en matemática y ciencias.", href: "/aprende/matematica-preuniversitaria" },
  { n: "02", title: "Preuniversitario", text: "Practica con temas, problemas y explicaciones que te preparan para avanzar.", href: "/blog" },
  { n: "03", title: "Universidad", text: "Profundiza en cálculo, álgebra lineal y ciencias exactas.", href: "/aprende/matematica-universitaria" },
] as const;

export default function Home() {
  return (
    <>
      <a className="zenit-skip-link" href="#zenit-main">Saltar al contenido principal</a>
      <Header />
      <main id="zenit-main" className="home-page-v2">
        <section className="hero wrap" aria-labelledby="home-title">
          <div className="hero-copy">
            <h1 id="home-title">Matemática y ciencias para <em>comprender.</em></h1>
            <p className="lead">
              Aprende matemática y ciencias con explicaciones claras, ejercicios y simuladores que responden a tus cambios. Desde secundaria hasta universidad.
            </p>
            <div className="actions">
              <Link className="button" href="/aprende?utm_source=sitio&utm_medium=home&utm_campaign=ruta_gratuita">Ver materias y niveles</Link>
              <Link className="text-link" href="/herramientas?utm_source=sitio&utm_medium=home&utm_campaign=ruta_gratuita">Probar herramientas</Link>
            </div>
          </div>
          <FormulaCard/>
        </section>

        <section className="home-vision wrap" aria-labelledby="home-vision-title">
          <div className="home-vision-photo">
            <Image
              src={`${homeImages}/zenit-aspiracion.webp`}
              width={880} height={495} loading="lazy" unoptimized
              sizes="(max-width: 850px) 100vw, 53vw"
              alt="Estudiante concentrado en un espacio de estudio moderno, entre cuadernos y representaciones científicas."
            />
          </div>
          <div className="home-vision-copy">
            <span className="home-visual-kicker">La idea detrás de Zénit</span>
            <h2 id="home-vision-title">Tu punto más alto comienza con <em>claridad.</em></h2>
            <p>La comprensión fortalece la confianza. Cada problema resuelto con sentido es un paso hacia nuevas metas.</p>
          </div>
        </section>

        <section className="home-subjects wrap" aria-labelledby="home-subjects-title">
          <div className="public-section-head home-cinematic-head">
            <div>
              <span className="home-visual-kicker">Siete caminos para explorar</span>
              <h2 id="home-subjects-title">El conocimiento no tiene fronteras.</h2>
            </div>
            <p>Elige el curso que necesitas: cada disciplina tiene su propia ruta de aprendizaje.</p>
          </div>
          <div className="home-subject-groups">
            {subjectGroups.map((group) => (
              <div className="home-subject-group" key={group.id} aria-labelledby={group.id}>
                <div className="home-subject-group-heading">
                  <h3 id={group.id}>{group.title}</h3>
                  <p>{group.description}</p>
                </div>
                <div className={`home-subject-grid home-image-subject-grid ${group.kind === "math" ? "home-math-subject-grid" : "home-science-subject-grid"}`}>
                  {group.subjects.map((subject) => (
                    <Link href={subject.href} className="home-subject-card home-image-subject" key={subject.title}>
                      <div className="home-subject-photo">
                        <Image
                          src={`${homeImages}/zenit-${subject.image}`}
                          width={subject.width} height={subject.height}
                          loading="lazy"
                          sizes={group.kind === "math"
                            ? "(max-width: 700px) 100vw, (max-width: 1050px) 50vw, 33vw"
                            : "(max-width: 700px) 100vw, 50vw"}
                          alt={subject.alt}
                        />
                      </div>
                      <div className="home-subject-info">
                        <h4>{subject.title}</h4>
                        <p>{subject.description}</p>
                        <span>Ver temas <span aria-hidden="true">↗</span></span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="home-innovation wrap" aria-labelledby="home-innovation-title">
          <div className="home-innovation-copy">
            <span className="home-visual-kicker">Aprendizaje interactivo</span>
            <h2 id="home-innovation-title">No solo lo ves. <em>Lo compruebas.</em></h2>
            <p>Representa ideas, modifica parámetros y observa qué cambia. La tecnología tiene sentido cuando te ayuda a comprender.</p>
            <Link href="/herramientas" className="button">Explorar herramientas</Link>
          </div>
          <div className="home-innovation-photo">
            <Image
              src={`${homeImages}/zenit-tecnologia.webp`}
              width={780} height={438} loading="lazy" unoptimized
              sizes="(max-width: 850px) 100vw, 52vw"
              alt="Estudiante usando una pantalla con representaciones gráficas y geométricas."
            />
          </div>
        </section>

        <section className="home-human wrap" aria-label="Una forma humana de aprender">
          <article className="home-human-card">
            <Image
              src={`${homeImages}/zenit-claridad.webp`}
              width={560} height={260} loading="lazy" unoptimized
              sizes="(max-width: 750px) 100vw, 50vw"
              alt="Joven en un momento de calma y concentración, con una representación luminosa del pensamiento."
            />
            <div>
              <span className="home-visual-kicker">Claridad mental</span>
              <h2>Aprende con foco y confianza.</h2>
              <p>La comprensión reduce la incertidumbre ante un problema nuevo.</p>
            </div>
          </article>
          <article className="home-human-card">
            <Image
              src={`${homeImages}/zenit-mentoria.webp`}
              width={520} height={235} loading="lazy" unoptimized
              sizes="(max-width: 750px) 100vw, 50vw"
              alt="Dos estudiantes compartiendo una experiencia de aprendizaje en un entorno moderno."
            />
            <div>
              <span className="home-visual-kicker">Aprendizaje humano</span>
              <h2>Avanza a tu ritmo.</h2>
              <p>Encuentra explicaciones que te orientan y problemas que te invitan a seguir.</p>
            </div>
          </article>
        </section>

        <section className="dark-section home-path-section" aria-labelledby="home-paths-title">
          <div className="wrap home-path-head">
            <div>
              <span className="home-visual-kicker">Una ruta para cada etapa</span>
              <h2 id="home-paths-title">Desde tu primera idea hasta el siguiente gran desafío.</h2>
            </div>
            <div className="home-path-photo">
              <Image
                src={`${homeImages}/zenit-versatilidad.webp`}
                width={780} height={438} loading="lazy" unoptimized
                sizes="(max-width: 850px) 100vw, 42vw"
                alt="Estudiante rodeada de modelos matemáticos, un péndulo y materiales de química."
              />
            </div>
          </div>
          <div className="wrap path-grid">
            {routes.map((route) => (
              <Link href={route.href} className="path-card" key={route.n}>
                <span>{route.n}</span>
                <h3>{route.title}</h3>
                <p>{route.text}</p>
                <b>Ver contenidos <span aria-hidden="true">→</span></b>
              </Link>
            ))}
          </div>
        </section>

        <section className="wrap trust home-trust" aria-labelledby="home-teacher-title">
          <div className="home-teacher-portrait">
            <Image
              src="/juan-xavier.jpg" width={423} height={573} loading="lazy"
              sizes="(max-width: 850px) 100vw, 360px"
              alt="Retrato de Juan Xavier, docente y creador de Sistema Zénit."
            />
          </div>
          <div className="home-teacher-copy">
            <span className="home-visual-kicker">Una visión con rostro propio</span>
            <h2 id="home-teacher-title">Enseñar a pensar también es enseñar a crecer.</h2>
            <p>Juan Xavier impulsa Sistema Zénit desde su experiencia docente en secundaria y preparación preuniversitaria, con la convicción de que comprender importa tanto como resolver.</p>
            <div className="actions">
              <Link href="/sobre-mi" className="button">Conocer el proyecto</Link>
              <Link href="/contacto" className="text-link">Hacer una consulta</Link>
            </div>
          </div>
        </section>

        <section className="home-last-step home-cinematic-end" aria-labelledby="home-end-title">
          <div className="home-end-picture" aria-hidden="true">
            <Image src={`${homeImages}/zenit-meta.webp`} width={980} height={350}
              loading="lazy" unoptimized sizes="100vw" alt="" />
          </div>
          <div className="wrap home-last-step-inner">
            <div>
              <span className="home-visual-kicker">El siguiente paso es tuyo</span>
              <h2 id="home-end-title">Logra tu meta.</h2>
              <p>Con conocimiento, práctica y una dirección clara.</p>
            </div>
            <Link className="button" href="/aprende">Comienza a aprender</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
