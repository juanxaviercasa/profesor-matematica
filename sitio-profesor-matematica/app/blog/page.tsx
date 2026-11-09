import type { Metadata } from "next";
import { Header, Footer } from "@/components/site";
import { BlogConstructorExplorer } from "@/components/blog-constructor-explorer";
import Link from "@/components/safe-link";

export const metadata: Metadata = {
  title: "Blog & Constructor por Capas (628 Temas) · Sistema Zénit",
  description: "Explora las 628 lecciones interactivas extraídas y estructuradas desde 1.° a 5.° de secundaria, nivel preuniversitario, universitario y ciencias exactas, con publicación programada 3x al día y Web Apps interactivas."
};

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="wrap my-10 space-y-10">
        <section className="rounded-3xl border border-stone-800 bg-gradient-to-br from-stone-900 via-stone-950 to-emerald-950/30 p-8 md:p-12 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="max-w-3xl space-y-3">
              <span className="inline-block rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-300">
                ECOSISTEMA PULPO · 628 PÁGINAS CON WEB APP INTERACTIVA
              </span>
              <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
                Blog Enciclopédico y Constructor por Capas
              </h1>
              <p className="text-sm md:text-base text-stone-300 leading-relaxed">
                Base completa construida a partir de los libros de 1.° a 5.° de secundaria (Área, Actividades, Razonamiento Matemático, Fichas Nivel Cero, Fichas Adicionales y Presentaciones) e integrada con Matemática Universitaria y Ciencias. Todas las páginas están disponibles en el <strong>Modo Constructor</strong> y se liberan públicamente a razón de <strong>3 publicaciones diarias</strong> vía GitHub Actions.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Link href="/herramientas" className="button primary text-center">
                Abrir Suite de 12 Web Apps →
              </Link>
              <Link href="/aprende" className="button secondary text-center">
                Ver Mapa por Áreas y Cursos
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
