import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header, Footer } from "@/components/site";
import Link from "@/components/safe-link";
import { getLessonsByCourse, COURSE_LABELS } from "@/lib/catalog-index";

type PageProps = {
  params: Promise<{ area: string; curso: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { area, curso } = await params;
  const info = COURSE_LABELS[curso];
  if (!info || info.area !== area) return { title: "Curso no encontrado · Sistema Zénit", robots: { index:false, follow:true } };

  return {
    title: `${info.title} · Temas y práctica interactiva · Zénit`,
    description: info.desc,
    alternates: { canonical: `/aprende/${area}/${curso}` },
  };
}

export default async function CoursePage({ params }: PageProps) {
  const { area: areaSlug, curso: cursoSlug } = await params;
  const courseInfo = COURSE_LABELS[cursoSlug];
  const lessons = getLessonsByCourse(cursoSlug).filter(lesson => lesson.publishStatus === "published");

  if (!courseInfo || courseInfo.area !== areaSlug || lessons.length === 0) {
    notFound();
  }

  // Group lessons by gradeLabel
  const byGrade = new Map<string, typeof lessons>();
  for (const l of lessons) {
    const gKey = l.gradeLabel;
    if (!byGrade.has(gKey)) byGrade.set(gKey, []);
    byGrade.get(gKey)!.push(l);
  }

  const totalExercises = lessons.reduce((acc, l) => acc + l.f0Count + l.faCount, 0);

  return (
    <>
      <Header />
      <main className="learning-view course-view wrap my-10 space-y-10">
        {/* Breadcrumb */}
        <nav className="breadcrumb text-xs text-stone-400 flex flex-wrap items-center gap-2">
          <Link href="/" className="hover:text-stone-200">Inicio</Link>
          <span>/</span>
          <Link href="/aprende" className="hover:text-stone-200">Aprende</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-stone-200">Biblioteca de lecciones</Link>
          <span>/</span>
          <span className="text-emerald-400 font-semibold">{courseInfo?.title || cursoSlug}</span>
        </nav>

        {/* Course Hero */}
        <section className="rounded-3xl border border-stone-800 bg-stone-900/50 p-8 md:p-12 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-300">
                {lessons.length} TEMAS PARA ESTUDIAR
              </span>
              <span className="text-xs text-stone-400 font-mono">
                {totalExercises} ejercicios para practicar
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white">
              {courseInfo?.icon} {courseInfo?.title || cursoSlug}
            </h1>
            <p className="text-sm md:text-base text-stone-300 leading-relaxed">
              {courseInfo?.desc}
            </p>
          </div>

          <div className="flex flex-col gap-3 w-full md:w-auto">
            {lessons[0] && (
              <Link
                href={`/aprende/${areaSlug}/${cursoSlug}/${lessons[0].slug}`}
                className="button primary text-center"
              >
                Comenzar Lección 1 →
              </Link>
            )}
            <Link href="/herramientas" className="button secondary text-center">
              Practicar con herramientas
            </Link>
          </div>
        </section>

        {/* Grouped by Grade */}
        <section className="space-y-8">
          {Array.from(byGrade.entries()).map(([gradeLabel, gradeLessons]) => (
            <div
              key={gradeLabel}
              className="rounded-3xl border border-stone-800 bg-stone-950/80 p-6 md:p-8 space-y-5 shadow-lg"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-800 pb-4">
                <div>
                  <span className="text-xs font-mono uppercase text-emerald-400">
                    Temas por grado
                  </span>
                  <h2 className="text-xl md:text-2xl font-bold text-white mt-0.5">
                    {gradeLabel} ({gradeLessons.length} temas)
                  </h2>
                </div>
                <span className="text-xs font-mono text-stone-400">
                  Explicaciones, ejemplos y ejercicios
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {gradeLessons.map((topic) => (
                  <Link
                    key={topic.id}
                    href={`/aprende/${topic.area}/${topic.course}/${topic.slug}`}
                    className="group rounded-2xl border border-stone-800 bg-stone-900/50 p-4 hover:border-emerald-500/60 hover:bg-stone-900 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[10px] font-mono text-stone-400 mb-2">
                        <span className="text-emerald-400 font-bold">{topic.unit}</span>
                        <span>
                          Listo para estudiar
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-stone-100 group-hover:text-emerald-300 transition-colors">
                        {topic.title}
                      </h3>
                      <p className="text-xs text-stone-400 mt-1.5 line-clamp-2">
                        {topic.summary}
                      </p>
                    </div>

                    <div className="mt-4 pt-2.5 border-t border-stone-800/70 flex items-center justify-between text-[11px] font-mono text-stone-400">
                      <span>{topic.f0Count + topic.faCount} ejercicios</span>
                      <span className="text-emerald-400 font-bold">Abrir →</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
