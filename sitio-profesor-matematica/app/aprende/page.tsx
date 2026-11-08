import type { Metadata } from "next";
import { Header, Footer } from "@/components/site";
import Link from "@/components/safe-link";
import { CURRICULUM_DATA } from "@/lib/curriculum-data";

export const metadata: Metadata = {
  title: "Portal de Aprendizaje Zénit · Matemática y Ciencias",
  description: "Explora la base de conocimiento completa del Profesor Juan Xavier: matemática preuniversitaria de élite (UNI / San Marcos), matemática universitaria y ciencias (física y química) con laboratorios interactivos y rigor analítico."
};

export default function AprendeIndexPage() {
  const areas = Object.values(CURRICULUM_DATA);

  return (
    <>
      <Header />
      <main className="aprende-hub">
        <section className="page-hero wrap">
          <p className="eyebrow">ECOSISTEMA EDUCATIVO ZÉNIT</p>
          <h1>Portal Integral de Matemática y Ciencias</h1>
          <p className="lead">
            Una base de conocimiento viva diseñada como un grafo interconectado: teoría rigurosa, demostraciones formales con KaTeX y simuladores interactivos para cada tema.
          </p>
          <div className="flex flex-wrap gap-4 mt-6">
            <Link href="/laboratorio" className="button secondary">
              Explorar Zénit Labs Interactivos →
            </Link>
            <Link href="/diagnostico/funciones" className="button primary">
              Hacer Diagnóstico de Nivel
            </Link>
          </div>
        </section>

        {/* Areas Grid */}
        <section className="wrap my-12 space-y-12">
          {areas.map((area) => (
            <div key={area.id} className="area-section rounded-3xl border border-stone-800 bg-stone-900/40 p-8 shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800 pb-5">
                <div>
                  <span className="inline-block rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-400">
                    {area.badge}
                  </span>
                  <h2 className="mt-2 text-2xl font-bold text-white">{area.title}</h2>
                  <p className="text-sm text-stone-300 mt-1 max-w-2xl">{area.description}</p>
                </div>
                <Link
                  href={`/aprende/${area.slug}`}
                  className="rounded-xl border border-emerald-700/60 bg-emerald-950/40 px-5 py-2.5 text-xs font-bold text-emerald-300 hover:bg-emerald-900/60 transition-all"
                >
                  Ver Área Completa →
                </Link>
              </div>

              {/* Courses Grid */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {area.courses.map((course) => {
                  const topicCount = course.modules.reduce((acc, m) => acc + m.topics.length, 0);

                  return (
                    <div
                      key={course.id}
                      className="course-card flex flex-col justify-between rounded-2xl border border-stone-800 bg-stone-950/70 p-6 hover:border-emerald-600/50 transition-all shadow-md group"
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-950/80 text-xl font-bold text-emerald-400 border border-emerald-800/40">
                            {course.icon}
                          </span>
                          <span className="text-xs font-mono text-stone-400 bg-stone-900 px-2.5 py-1 rounded-full border border-stone-800">
                            {topicCount} temas interactivos
                          </span>
                        </div>
                        <h3 className="mt-4 text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                          {course.title}
                        </h3>
                        <p className="mt-2 text-xs text-stone-400 leading-relaxed">
                          {course.shortDesc}
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-stone-800/80 flex items-center justify-between">
                        <span className="text-xs text-stone-500 font-mono">
                          {course.modules.length} módulos
                        </span>
                        <Link
                          href={`/aprende/${area.slug}/${course.slug}`}
                          className="text-xs font-bold text-emerald-400 hover:text-emerald-300"
                        >
                          Explorar temario →
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </section>

        {/* Value Proposition Callout */}
        <section className="wrap my-16 rounded-3xl bg-gradient-to-br from-emerald-950/60 via-stone-900 to-stone-950 border border-emerald-900/40 p-8 md:p-12 text-center text-stone-100 shadow-2xl">
          <span className="inline-block rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300 mb-3">
            MÉTODO ZÉNIT
          </span>
          <h2 className="text-3xl font-extrabold text-white">¿Por qué este ecosistema es diferente?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-stone-300 text-sm leading-relaxed">
            No somos un índice de fórmulas frías. Cada tema incluye <strong>demostración intuitiva</strong>, <strong>simulación interactiva operable</strong>, <strong>desafíos socráticos con retroalimentación instantánea</strong> y <strong>enlaces estratégicos</strong> para que comprendas cómo el álgebra nutre al cálculo y el cálculo a la física moderna.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/aprende/matematica-preuniversitaria/algebra" className="button primary">
              Comenzar con Álgebra Preuniversitaria
            </Link>
            <Link href="/aprende/matematica-universitaria/calculo-1" className="button secondary">
              Avanzar a Cálculo Diferencial
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
