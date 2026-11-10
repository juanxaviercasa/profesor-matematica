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
      <main className="learning-view blog-view wrap my-10 space-y-10">
        <section className="rounded-3xl border border-stone-800 bg-gradient-to-br from-stone-900 via-stone-950 to-emerald-950/30 p-8 md:p-12 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="max-w-3xl space-y-3">
              <span className="inline-block rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-300">
                {LESSONS_INDEX.filter(lesson => lesson.publishStatus === "published").length} temas · Matemática que conecta
              </span>
              <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Biblioteca de Matemática y Ciencias
              </h1>
              <p className="text-sm md:text-base text-stone-300 leading-relaxed">
                Encuentra teoría, ejercicios y laboratorios interactivos organizados por nivel y curso. Busca el tema que necesitas estudiar y avanza con explicaciones y actividades a tu ritmo.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Link href="/herramientas" className="button primary text-center">
                Explorar herramientas →
              </Link>
              <Link href="/aprende" className="button secondary text-center">
                Ver áreas y cursos →
              </Link>
            </div>
          </div>
        </section>

        <BlogConstructorExplorer />
      </main>
      <Footer />
    </>
  );
}
