import type { Metadata } from "next";
import { Header, Footer } from "@/components/site";
import Link from "@/components/safe-link";
import { LESSONS_INDEX, COURSE_LABELS } from "@/lib/catalog-index";
import { LessonProgressOverview } from "@/components/lesson-completion";

export const metadata: Metadata = {
  alternates: { canonical: "/aprende" },
  title: "Aprende matemática y ciencias · Sistema Zénit",
  description: "Explora matemática de secundaria, preparación preuniversitaria, nivel universitario y ciencias exactas, con lecciones y aplicaciones interactivas del Sistema Zénit.",
};

const areaDefinitions = [
  { slug: "matematica-preuniversitaria", title: "Matemática Secundaria y Preuniversitaria", badge: "Secundaria · preparación preuniversitaria", description: "Aritmética, álgebra, geometría, trigonometría, estadística y razonamiento matemático con explicaciones, ejemplos y ejercicios.", courses: ["aritmetica", "algebra", "geometria", "trigonometria", "estadistica-y-probabilidad", "razonamiento-matematico"] },
  { slug: "matematica-universitaria", title: "Matemática Universitaria", badge: "Cálculo · álgebra lineal · ecuaciones diferenciales", description: "Rigor formal, demostraciones analíticas y laboratorios interactivos para los primeros ciclos de ciencias e ingeniería.", courses: ["calculo-1", "calculo-2", "calculo-3", "algebra-lineal", "ecuaciones-diferenciales"] },
  { slug: "ciencias", title: "Ciencias", badge: "Física · Química · Biología", description: "Explora los fenómenos físicos, las transformaciones químicas y los fundamentos de la vida.", courses: ["fisica", "quimica"] },
];

export default function AprendeIndexPage() {
  const publishedLessons = LESSONS_INDEX.filter((lesson) => lesson.publishStatus === "published");
  return <><Header /><main className="learn-portal">
    <section className="learn-portal-hero wrap"><div>
      <p className="eyebrow">SISTEMA ZÉNIT · BIBLIOTECA GRATUITA</p>
      <h1>Encuentra una idea. <em>Entiéndela y ponla a prueba.</em></h1>
      <p className="learn-portal-lead">Lee explicaciones, resuelve ejercicios y practica con laboratorios para estudiar desde secundaria hasta los primeros ciclos universitarios. Elige un nivel, abre un tema y avanza a tu ritmo.</p>
      <div className="learn-portal-actions"><Link href="/blog" className="button">Explorar la biblioteca →</Link><Link href="/laboratorio" className="button secondary">Probar un laboratorio →</Link></div>
    </div><aside className="learn-portal-index" aria-label="Resumen de la biblioteca"><span>MAPA DE APRENDIZAJE</span><strong>Idea → representación → comprobación</strong><p>Empieza donde estés y conecta cada explicación con una acción.</p><b>{publishedLessons.length} temas disponibles</b></aside></section>
    <section className="wrap learn-portal-progress" aria-label="Tu progreso"><LessonProgressOverview total={LESSONS_INDEX.filter(lesson => lesson.publishStatus === "published").length} /></section>
    <section className="wrap learn-areas" aria-labelledby="learn-areas-title"><div className="learn-section-heading"><div><p className="eyebrow">Elige tu recorrido</p><h2 id="learn-areas-title">Descubre por nivel y área.</h2></div><p>Explora una familia completa o entra directamente al curso que necesitas hoy.</p></div>
      <div className="learn-area-list">{areaDefinitions.map((area) => { const areaLessons = publishedLessons.filter((lesson) => area.courses.includes(lesson.course)); return <section key={area.slug} className="learn-area" aria-labelledby={`${area.slug}-title`}>
        <div className="learn-area-heading"><div><span className="learn-area-badge">{area.badge}</span><h3 id={`${area.slug}-title`}>{area.title}</h3><p>{area.description}</p></div><span className="learn-area-count">{areaLessons.length} temas</span></div>
        <div className="learn-course-grid">{area.courses.map((courseSlug) => { const course = COURSE_LABELS[courseSlug]; const lessons = publishedLessons.filter((lesson) => lesson.course === courseSlug); const exercises = lessons.reduce((total, lesson) => total + lesson.f0Count + lesson.faCount, 0); if (!course) return null; return <article key={courseSlug} className="learn-course-card"><div className="learn-course-top"><span className="learn-course-icon">{course.icon}</span><span className="learn-course-count">{lessons.length} temas</span></div><h4>{course.title}</h4><p>{course.desc}</p><div className="learn-course-footer"><span>{exercises} ejercicios</span><Link href={`/aprende/${area.slug}/${courseSlug}`}>Ver temas →</Link></div></article>; })}{area.slug === "ciencias" && <article className="learn-course-card">
          <div className="learn-course-top"><span className="learn-course-icon" aria-hidden="true">🧬</span><span className="learn-course-count">Guía introductoria</span></div>
          <h4>Biología</h4>
          <p>Células, genética, fisiología y ecología: explora los conceptos esenciales de la vida.</p>
          <div className="learn-course-footer"><span>Mapa conceptual</span><Link href="/aprende/ciencias/biologia">Explorar Biología →</Link></div>
        </article>}</div>
      </section>; })}</div>
    </section>
    <section className="wrap learn-portal-end"><div><p className="eyebrow">Siguiente paso</p><h2>¿Quieres comprobar una idea en tiempo real?</h2></div><Link href="/herramientas" className="button">Explorar herramientas →</Link></section>
  </main><Footer /></>;
}
