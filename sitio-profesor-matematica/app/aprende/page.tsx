import type { Metadata } from "next";
import { Header, Footer } from "@/components/site";
import Link from "@/components/safe-link";
import { LESSONS_INDEX, COURSE_LABELS } from "@/lib/catalog-index";
import { LessonProgressOverview } from "@/components/lesson-completion";

export const metadata: Metadata = {
  title: "Portal de Aprendizaje Zénit · Matemática, Ciencias y Web Apps",
  description: "Explora matemática de secundaria, preparación preuniversitaria, nivel universitario y ciencias exactas, con lecciones y aplicaciones interactivas del Sistema Zénit."
};

export default function AprendeIndexPage() {
  const areaDefinitions = [
    {
      slug: "matematica-preuniversitaria",
      title: "Matemática Secundaria (1.° a 5.°) y Preuniversitaria",
      badge: "Currículo Completo + Nivel Admisión UNI · UNMSM · PUCP",
      description: "Los 6 pilares de la matemática formativa y preuniversitaria poblados desde los libros del área, actividades, razonamiento matemático y fichas nivel cero/avanzado.",
      courses: [
        "aritmetica",
        "algebra",
        "geometria",
        "trigonometria",
        "estadistica-y-probabilidad",
        "razonamiento-matematico",
      ],
    },
    {
      slug: "matematica-universitaria",
      title: "Matemática Universitaria (Ciencias e Ingeniería)",
      badge: "Cálculo · Álgebra Lineal · Ecuaciones Diferenciales",
      description: "Rigor formal, demostraciones analíticas y laboratorios interactivos para los primeros ciclos universitarios.",
      courses: [
        "calculo-1",
        "calculo-2",
        "calculo-3",
        "algebra-lineal",
        "ecuaciones-diferenciales",
      ],
    },
    {
      slug: "ciencias",
      title: "Ciencias Exactas (Física y Química)",
      badge: "Física Clásica · Química General y Estequiometría",
      description: "Modelado físico-matemático de la naturaleza, cinemática vectorial, dinámica, estructura atómica y reacciones químicas.",
      courses: ["fisica", "quimica"],
    },
  ];

  return (
    <>
      <Header />
      <main className="aprende-hub">
        <section className="page-hero wrap">
          <p className="eyebrow">ECOSISTEMA EDUCATIVO ZÉNIT · {LESSONS_INDEX.length} TEMAS POBLADOS</p>
          <h1>Portal Integral de Matemática y Ciencias</h1>
          <p className="lead">
            Una arquitectura tipo pulpo que conecta desde 1.° a 5.° de secundaria y preparación preuniversitaria hasta el cálculo universitario, la física y la química. Cada tema incluye teoría extraída, banco de ejercicios y su propia Web App interactiva.
          </p>
          <div className="flex flex-wrap gap-4 mt-6">
            <Link href="/blog" className="button primary">
              Explorar {LESSONS_INDEX.length} temas →
            </Link>
            <Link href="/herramientas" className="button secondary">
              Probar 12 Web Apps →
            </Link>
            <Link href="/laboratorio" className="button secondary">
              Explorar laboratorios →
            </Link>
          </div>
        </section>

        <div className="wrap"><LessonProgressOverview total={LESSONS_INDEX.length}/></div>

        <section className="wrap my-12 space-y-12">
          {areaDefinitions.map((area) => {
            const areaLessonsCount = LESSONS_INDEX.filter(l => area.courses.includes(l.course)).length;

            return (
              <div key={area.slug} className="area-section rounded-3xl border border-stone-800 bg-stone-900/40 p-8 shadow-xl">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800 pb-5">
                  <div>
                    <span className="inline-block rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-400">
                      {area.badge}
                    </span>
                    <h2 className="mt-2 text-2xl font-bold text-white">{area.title}</h2>
                    <p className="text-sm text-stone-300 mt-1 max-w-2xl">{area.description}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-emerald-300 bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-800/50">
                      {areaLessonsCount} lecciones activas
                    </span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {area.courses.map((cSlug) => {
                    const cMeta = COURSE_LABELS[cSlug];
                    const cLessons = LESSONS_INDEX.filter(l => l.course === cSlug);
                    const exCount = cLessons.reduce((acc, l) => acc + l.f0Count + l.faCount, 0);

                    return (
                      <div
                        key={cSlug}
                        className="course-card flex flex-col justify-between rounded-2xl border border-stone-800 bg-stone-950/70 p-6 hover:border-emerald-600/50 transition-all shadow-md group"
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-950/80 text-xl font-bold text-emerald-400 border border-emerald-800/40">
                              {cMeta.icon}
                            </span>
                            <span className="text-xs font-mono text-emerald-300 bg-stone-900 px-2.5 py-1 rounded-full border border-stone-800">
                              {cLessons.length} temas
                            </span>
                          </div>
                          <h3 className="mt-4 text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                            {cMeta.title}
                          </h3>
                          <p className="mt-2 text-xs text-stone-400 leading-relaxed">
                            {cMeta.desc}
                          </p>
                        </div>

                        <div className="mt-6 pt-4 border-t border-stone-800/80 flex items-center justify-between">
                          <span className="text-xs text-stone-500 font-mono">
                            {exCount} ejercicios F0/FA
                          </span>
                          <Link
                            href={`/aprende/${area.slug}/${cSlug}`}
                            className="text-xs font-bold text-emerald-400 hover:text-emerald-300"
                          >
                            Ver los {cLessons.length} temas →
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </section>
      </main>
      <Footer />
    </>
  );
}
