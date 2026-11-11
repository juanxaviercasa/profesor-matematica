import type { Metadata } from "next";
import { Header, Footer } from "@/components/site";
import { BlogConstructorExplorer } from "@/components/blog-constructor-explorer";
import { LESSONS_INDEX } from "@/lib/catalog-index";
import Link from "@/components/safe-link";

export const metadata: Metadata = {
  alternates: { canonical: "/blog" },
  title: "Biblioteca de Matemática y Ciencias · Sistema Zénit",
  description: "Explora el catálogo de temas del Sistema Zénit: matemática de secundaria, nivel preuniversitario y universitario, física y química con recursos y laboratorios interactivos."
};

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="learning-view blog-view blog-page-v2 wrap my-10 space-y-10">
        <section className="blog-library-intro">
          <div className="blog-library-intro__copy">
            <span className="blog-library-kicker">
                {LESSONS_INDEX.filter(lesson => lesson.publishStatus === "published").length} temas · Matemática que conecta
            </span>
            <h1>
                Biblioteca de Matemática y Ciencias
            </h1>
            <p>
                Encuentra teoría, ejercicios y laboratorios interactivos organizados por nivel y curso. Busca el tema que necesitas estudiar y avanza con explicaciones y actividades a tu ritmo.
            </p>
            <div className="blog-library-actions">
              <Link href="/herramientas" className="button primary">
                Explorar herramientas →
              </Link>
              <Link href="/aprende" className="button secondary">
                Ver áreas y cursos →
              </Link>
            </div>
          </div>
          <aside className="blog-library-index" aria-label="Cómo usar la biblioteca">
            <span className="blog-library-index__line" aria-hidden="true" />
            <p className="eyebrow">Una biblioteca para volver</p>
            <strong>Busca una idea, elige tu nivel y sigue la conexión.</strong>
            <span className="blog-library-index__meta">Teoría · práctica · laboratorio</span>
          </aside>
        </section>

        <BlogConstructorExplorer />
      </main>
      <Footer />
    </>
  );
}
