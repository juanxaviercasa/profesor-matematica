import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header, Footer } from "@/components/site";
import Link from "@/components/safe-link";
import { CURRICULUM_DATA } from "@/lib/curriculum-data";
import { LESSONS_INDEX, AREA_LABELS, COURSE_LABELS } from "@/lib/catalog-index";

type PageProps = {
  params: Promise<{ area: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { area: areaSlug } = await params;
  const area = CURRICULUM_DATA[areaSlug];
  const areaMeta = AREA_LABELS[areaSlug];
  if (!area && !areaMeta) return { title: "Área no encontrada · Zénit" };

  return {
    title: `${area?.title || areaMeta.title} · Zénit`,
    description: area?.description || areaMeta.description
  };
}

export default async function AreaPage({ params }: PageProps) {
  const { area: areaSlug } = await params;
  const area = CURRICULUM_DATA[areaSlug];
  const areaMeta = AREA_LABELS[areaSlug];

  if (!area && !areaMeta) {
    notFound();
  }

  const areaLessons = LESSONS_INDEX.filter((l) => l.area === areaSlug);
  const coursesInArea = Object.entries(COURSE_LABELS).filter(([, meta]) => meta.area === areaSlug);

  return (
    <>
      <Header />
      <main className="learning-view area-view wrap my-10 space-y-10">
        {/* Breadcrumb */}
        <nav className="breadcrumb text-xs text-stone-400 flex items-center gap-2">
          <Link href="/" className="hover:text-stone-200">Inicio</Link>
          <span>/</span>
          <Link href="/aprende" className="hover:text-stone-200">Aprende</Link>
          <span>/</span>
          <span className="text-emerald-400 font-semibold">{area?.title || areaMeta?.title}</span>
        </nav>

        {/* Hero */}
        <section className="rounded-3xl border border-stone-800 bg-stone-900/40 p-8 md:p-12 shadow-xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-block rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300">
              {area?.badge || areaMeta?.badge}
            </span>
            <span className="inline-block rounded-full bg-stone-800 px-3 py-1 text-xs font-semibold text-stone-300">
              {areaLessons.length} lecciones extraídas
            </span>
          </div>
          <h1 className="mt-3 text-3xl md:text-4xl font-extrabold text-white">{area?.title || areaMeta?.title}</h1>
          <p className="mt-3 text-base text-stone-300 max-w-3xl leading-relaxed">
            {area?.description || areaMeta?.description}
          </p>
        </section>

        {/* Courses Breakdown */}
        <section className="space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-2xl font-bold text-white">Cursos en esta Área ({coursesInArea.length})</h2>
            <Link
              href={`/blog?area=${areaSlug}`}
              className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-xs font-bold text-emerald-300 hover:bg-emerald-500/20"
            >
              Explorar en Constructor de Blog →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-8">
            {coursesInArea.map(([courseSlug, courseMeta]) => {
              const lessonsForCourse = areaLessons.filter((l) => l.course === courseSlug);
              const totalEx = lessonsForCourse.reduce((acc, l) => acc + l.f0Count + l.faCount, 0);

              return (
                <div
                  key={courseSlug}
                  className="course-detailed-card rounded-2xl border border-stone-800 bg-stone-950/70 p-6 md:p-8 shadow-lg"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800 pb-5">
                    <div className="flex items-center gap-4">
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-950 text-2xl font-bold text-emerald-400 border border-emerald-800/40">
                        {courseMeta.icon}
                      </span>
                      <div>
                        <h3 className="text-xl font-bold text-white">{courseMeta.title}</h3>
                        <p className="text-xs text-stone-400">
                          {courseMeta.desc} · <strong className="text-emerald-400">{lessonsForCourse.length} lecciones</strong> · {totalEx} problemas
                        </p>
                      </div>
                    </div>
                    <Link
                      href={`/aprende/${areaSlug}/${courseSlug}`}
                      className="button secondary text-xs"
                    >
                      Ver Syllabus Completo ({lessonsForCourse.length}) →
                    </Link>
                  </div>

                  {/* Preview top 9 topics in this course */}
                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {lessonsForCourse.slice(0, 9).map((lesson) => (
                      <Link
                        key={lesson.id}
                        href={`/aprende/${lesson.area}/${lesson.course}/${lesson.slug}`}
                        className="group block rounded-lg border border-stone-800 bg-stone-950/90 p-3 hover:border-emerald-500/60 hover:bg-stone-900 transition-all"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 group-hover:text-emerald-400">
                            {lesson.gradeLabel}
                          </span>
                          <span className="text-[10px] text-emerald-500 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                            Abrir Lab →
                          </span>
                        </div>
                        <h5 className="mt-1 text-xs font-semibold text-stone-200 group-hover:text-white line-clamp-2">
                          {lesson.title}
                        </h5>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
