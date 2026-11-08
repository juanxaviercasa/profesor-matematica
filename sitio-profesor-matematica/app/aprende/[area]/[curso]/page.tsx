import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header, Footer } from "@/components/site";
import Link from "@/components/safe-link";
import { CURRICULUM_DATA } from "@/lib/curriculum-data";

type PageProps = {
  params: Promise<{ area: string; curso: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { area: areaSlug, curso: cursoSlug } = await params;
  const area = CURRICULUM_DATA[areaSlug];
  if (!area) return { title: "Área no encontrada · Zénit" };

  const course = area.courses.find(c => c.slug === cursoSlug);
  if (!course) return { title: "Curso no encontrado · Zénit" };

  return {
    title: `${course.title} · Syllabus e Interactividades · Zénit`,
    description: course.shortDesc
  };
}

export default async function CoursePage({ params }: PageProps) {
  const { area: areaSlug, curso: cursoSlug } = await params;
  const area = CURRICULUM_DATA[areaSlug];
  if (!area) notFound();

  const course = area.courses.find(c => c.slug === cursoSlug);
  if (!course) notFound();

  const totalTopics = course.modules.reduce((acc, m) => acc + m.topics.length, 0);

  return (
    <>
      <Header />
      <main className="course-view wrap my-10 space-y-10">
        {/* Breadcrumb */}
        <nav className="breadcrumb text-xs text-stone-400 flex items-center gap-2">
          <Link href="/" className="hover:text-stone-200">Inicio</Link>
          <span>/</span>
          <Link href="/aprende" className="hover:text-stone-200">Aprende</Link>
          <span>/</span>
          <Link href={`/aprende/${area.slug}`} className="hover:text-stone-200">{area.title}</Link>
          <span>/</span>
          <span className="text-emerald-400 font-semibold">{course.title}</span>
        </nav>

        {/* Course Hero */}
        <section className="rounded-3xl border border-stone-800 bg-stone-900/40 p-8 md:p-12 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300">
                {course.level.toUpperCase()}
              </span>
              <span className="text-xs text-stone-400 font-mono">
                {course.modules.length} Módulos · {totalTopics} Temas con interactividad
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white">{course.title}</h1>
            <p className="text-sm text-stone-300 leading-relaxed">{course.shortDesc}</p>
          </div>

          <div className="flex flex-col gap-3 w-full md:w-auto">
            {course.modules[0]?.topics[0] && (
              <Link
                href={`/aprende/${area.slug}/${course.slug}/${course.modules[0].topics[0].slug}`}
                className="button primary text-center"
              >
                Comenzar lección 1 →
              </Link>
            )}
            <Link href="/laboratorio" className="button secondary text-center">
              Ir a Zénit Labs
            </Link>
          </div>
        </section>

        {/* Modules Roadmap */}
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Ruta de Aprendizaje y Módulos</h2>
            <span className="text-xs text-stone-400">Teoría rigurosa + laboratorios SVG</span>
          </div>

          <div className="space-y-6">
            {course.modules.map((mod, modIdx) => (
              <div
                key={mod.id}
                className="module-block rounded-2xl border border-stone-800 bg-stone-950/70 p-6 md:p-8 shadow-md"
              >
                <div className="flex items-center gap-3 border-b border-stone-800 pb-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-950 text-xs font-bold text-emerald-400 border border-emerald-800/60 font-mono">
                    {String(modIdx + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-white">{mod.title}</h3>
                    <p className="text-xs text-stone-400">{mod.description}</p>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mod.topics.map((topic, topicIdx) => (
                    <Link
                      key={topic.id}
                      href={`/aprende/${area.slug}/${course.slug}/${topic.slug}`}
                      className="group flex flex-col justify-between rounded-xl border border-stone-800 bg-stone-900/40 p-4 hover:border-emerald-500/50 hover:bg-stone-900/80 transition-all"
                    >
                      <div>
                        <div className="flex items-center justify-between text-[11px] text-stone-400 mb-2 font-mono">
                          <span>Tema {modIdx + 1}.{topicIdx + 1}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-semibold ${
                            topic.difficulty === "básico"
                              ? "bg-sky-950 text-sky-400 border border-sky-800/40"
                              : topic.difficulty === "intermedio"
                              ? "bg-amber-950 text-amber-400 border border-amber-800/40"
                              : "bg-rose-950 text-rose-400 border border-rose-800/40"
                          }`}>
                            {topic.difficulty}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-stone-100 group-hover:text-emerald-300 transition-colors">
                          {topic.title}
                        </h4>
                        <p className="text-xs text-stone-400 mt-2 line-clamp-2">
                          {topic.summary}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-stone-800/60 flex items-center justify-between text-xs">
                        <span className="text-emerald-400 font-semibold group-hover:underline">
                          Abrir lección y lab interactivo
                        </span>
                        <span className="text-stone-500 group-hover:translate-x-1 transition-transform">
                          →
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
