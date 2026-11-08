import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header, Footer } from "@/components/site";
import Link from "@/components/safe-link";
import { CURRICULUM_DATA } from "@/lib/curriculum-data";

type PageProps = {
  params: Promise<{ area: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { area: areaSlug } = await params;
  const area = CURRICULUM_DATA[areaSlug];
  if (!area) return { title: "Área no encontrada · Zénit" };

  return {
    title: `${area.title} · Zénit`,
    description: area.description
  };
}

export default async function AreaPage({ params }: PageProps) {
  const { area: areaSlug } = await params;
  const area = CURRICULUM_DATA[areaSlug];

  if (!area) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="area-view wrap my-10 space-y-10">
        {/* Breadcrumb */}
        <nav className="breadcrumb text-xs text-stone-400 flex items-center gap-2">
          <Link href="/" className="hover:text-stone-200">Inicio</Link>
          <span>/</span>
          <Link href="/aprende" className="hover:text-stone-200">Aprende</Link>
          <span>/</span>
          <span className="text-emerald-400 font-semibold">{area.title}</span>
        </nav>

        {/* Hero */}
        <section className="rounded-3xl border border-stone-800 bg-stone-900/40 p-8 md:p-12 shadow-xl">
          <span className="inline-block rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300">
            {area.badge}
          </span>
          <h1 className="mt-3 text-3xl md:text-4xl font-extrabold text-white">{area.title}</h1>
          <p className="mt-3 text-base text-stone-300 max-w-3xl leading-relaxed">{area.description}</p>
        </section>

        {/* Courses & Modules Breakdown */}
        <section className="space-y-8">
          <h2 className="text-2xl font-bold text-white">Cursos en esta Área</h2>
          <div className="grid grid-cols-1 gap-8">
            {area.courses.map((course) => (
              <div
                key={course.id}
                className="course-detailed-card rounded-2xl border border-stone-800 bg-stone-950/70 p-6 md:p-8 shadow-lg"
              >
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800 pb-5">
                  <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-950 text-2xl font-bold text-emerald-400 border border-emerald-800/40">
                      {course.icon}
                    </span>
                    <div>
                      <h3 className="text-xl font-bold text-white">{course.title}</h3>
                      <p className="text-xs text-stone-400">{course.shortDesc}</p>
                    </div>
                  </div>
                  <Link
                    href={`/aprende/${area.slug}/${course.slug}`}
                    className="button secondary text-xs"
                  >
                    Ver Syllabus Completo →
                  </Link>
                </div>

                {/* Modules in this course */}
                <div className="mt-6 space-y-6">
                  {course.modules.map((mod) => (
                    <div key={mod.id} className="rounded-xl bg-stone-900/50 p-5 border border-stone-800/60">
                      <h4 className="text-sm font-bold text-emerald-300">{mod.title}</h4>
                      <p className="text-xs text-stone-400 mt-1">{mod.description}</p>

                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {mod.topics.map((topic) => (
                          <Link
                            key={topic.id}
                            href={`/aprende/${area.slug}/${course.slug}/${topic.slug}`}
                            className="group block rounded-lg border border-stone-800 bg-stone-950/90 p-3 hover:border-emerald-500/60 hover:bg-stone-900 transition-all"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 group-hover:text-emerald-400">
                                {topic.difficulty}
                              </span>
                              <span className="text-[10px] text-emerald-500 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                                Abrir Lab →
                              </span>
                            </div>
                            <h5 className="mt-1 text-xs font-semibold text-stone-200 group-hover:text-white line-clamp-2">
                              {topic.title}
                            </h5>
                          </Link>
                        ))}
                      </div>
                    </div>
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
