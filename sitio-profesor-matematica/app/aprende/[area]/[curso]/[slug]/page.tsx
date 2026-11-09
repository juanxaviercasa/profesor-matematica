import type { Metadata } from "next";
import { SITE_URL as BASE_URL } from "@/lib/site-config";
import { notFound } from "next/navigation";
import { Header, Footer } from "@/components/site";
import Link from "@/components/safe-link";
import { MathFormula, MathText } from "@/components/math-formula";
import { ZenitInteractiveApp, ZENIT_ENGINES, type AppEngineId } from "@/components/zenit-app-engines";
import { InteractiveExerciseBank } from "@/components/interactive-exercise-bank";
import { getVerifiedAnswerKey } from "@/lib/exercise-evaluation.mjs";
import { InfiniteProblemGenerator } from "@/components/infinite-problem-generator";
import { LessonCompletion } from "@/components/lesson-completion";
import { InternalKnowledgeMesh } from "@/components/internal-knowledge-mesh";
import {
  getLessonBySlug,
  getLessonsByCourse,
  getRelatedLessons,
  COURSE_LABELS,
} from "@/lib/catalog-loader";
import { CURRICULUM_DATA } from "@/lib/curriculum-data";

type PageProps = {
  params: Promise<{ area: string; curso: string; slug: string }>;
};


export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { area: areaSlug, curso: cursoSlug, slug } = await params;
  const catalogLesson = getLessonBySlug(slug);
  const canonicalUrl = catalogLesson
    ? `${BASE_URL}/aprende/${catalogLesson.area}/${catalogLesson.course}/${catalogLesson.slug}`
    : `${BASE_URL}/aprende/${areaSlug}/${cursoSlug}/${slug}`;

  if (catalogLesson) {
    const courseMeta = COURSE_LABELS[catalogLesson.course];
    const pageTitle = `${catalogLesson.title} (${catalogLesson.gradeLabel}) · Teoría, Ejercicios y Web App · Zénit`;
    const pageDesc = `${catalogLesson.summary} Incluye simulador interactivo, teoría, ejercicios graduados, materiales de resolución cuando están disponibles y práctica adicional.`;

    return {
      title: pageTitle,
      description: pageDesc,
      keywords: catalogLesson.tags,
      robots: { index: catalogLesson.publishStatus === "published", follow: true },
      alternates: {
        canonical: canonicalUrl,
      },
      openGraph: {
        title: pageTitle,
        description: pageDesc,
        url: canonicalUrl,
        siteName: "Ecosistema Educativo Zénit · Juan Xavier",
        type: "article",
        locale: "es_PE",
      },
      twitter: {
        card: "summary_large_image",
        title: pageTitle,
        description: pageDesc,
      },
    };
  }

  return {
    title: `${slug.replace(/-/g, " ")} · Sistema Zénit`,
    robots: { index:false, follow:true },
  };
}

export default async function TopicDetailPage({ params }: PageProps) {
  const { area: areaSlug, curso: cursoSlug, slug: topicSlug } = await params;

  // 1. Look up in the 584-lesson extracted catalog first
  let lesson = getLessonBySlug(topicSlug);

  // 2. Fallback to CURRICULUM_DATA if someone visits an older manual slug
  if (!lesson) {
    const areaObj = CURRICULUM_DATA[areaSlug];
    const courseObj = areaObj?.courses.find(c => c.slug === cursoSlug);
    for (const mod of courseObj?.modules || []) {
      const t = mod.topics.find(top => top.slug === topicSlug);
      if (t) {
        lesson = {
          id: t.id,
          slug: t.slug,
          baseSlug: t.slug,
          title: t.title,
          area: areaSlug,
          course: cursoSlug,
          grade: areaSlug === "matematica-universitaria" ? 6 : 5,
          gradeLabel: areaSlug === "matematica-universitaria" ? "Universidad" : "Preuniversitario",
          unit: mod.title,
          difficulty: t.difficulty,
          appEngine: "FunctionCartesianLab",
          keyFormula: t.keyFormula || "f(x) = a(x - h)^2 + k",
          summary: t.summary,
          tags: [areaSlug, cursoSlug, mod.title, "Web App Interactiva"],
          onionLayer: 2,
          publishStatus: "published",
          scheduledDate: "2026-11-08",
          dripBatch: 0,
          slidesCount: 2,
          f0Count: 2,
          faCount: 1,
          theorySlides: [
            {
              slideNumber: 1,
              heading: `Fundamentos de ${t.title}`,
              content: [t.summary],
            },
          ],
          exercisesF0: [],
          exercisesFA: [],
          externalLinks: [],
          sourceFiles: {},
          verticalProgressionSlugs: [],
        };
        break;
      }
    }
  }

  if (!lesson) {
    notFound();
  }

  const courseMeta = COURSE_LABELS[lesson.course] || {
    title: lesson.course.replace(/-/g, " ").toUpperCase(),
    icon: "📐",
    area: lesson.area,
    desc: "",
  };
  const engineMeta = ZENIT_ENGINES[lesson.appEngine as AppEngineId] || ZENIT_ENGINES.FunctionCartesianLab;
  const studentSummary = /^Estudio completo de /i.test(lesson.summary)
    ? `Estudia ${lesson.title} con explicaciones, un simulador y práctica guiada. Compara diferentes representaciones y comprueba lo que has aprendido.`
    : lesson.summary;

  // Find adjacent lessons in the same course
  const courseLessons = getLessonsByCourse(lesson.course);
  const currentIdx = courseLessons.findIndex(l => l.slug === lesson!.slug);
  const prevLesson = currentIdx > 0 ? courseLessons[currentIdx - 1] : null;
  const nextLesson = currentIdx >= 0 && currentIdx < courseLessons.length - 1 ? courseLessons[currentIdx + 1] : null;

  // Find vertical progression lessons (same base topic in other grades)
  const verticalLessons = (lesson.verticalProgressionSlugs || [])
    .map(s => getLessonBySlug(s))
    .filter(Boolean);

  // Layer 4: Intelligent Related Lessons (Interlinking Mesh)
  const relatedLessons = getRelatedLessons(lesson, 6);

  // Layer 4: Structured Data (JSON-LD) for Schema.org
  const canonicalUrl = `${BASE_URL}/aprende/${lesson.area}/${lesson.course}/${lesson.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["LearningResource", "Course"],
    name: `${lesson.title} - ${lesson.gradeLabel}`,
    description: lesson.summary,
    educationalLevel: lesson.gradeLabel,
    learningResourceType: "Interactive Lesson & Practice",
    teaches: lesson.title,
    keywords: lesson.tags.join(", "),
    url: canonicalUrl,
    inLanguage: "es",
    provider: {
      "@type": "Person",
      name: "Juan Xavier",
      jobTitle: "Docente y Asesor de Matemática Preuniversitaria y Universitaria",
      url: BASE_URL,
    },
    hasPart: [
      {
        "@type": "SoftwareApplication",
        name: `Simulador Interactivo: ${lesson.title}`,
        applicationCategory: "EducationalApplication",
        operatingSystem: "All",
        url: canonicalUrl,
      },
      {
        "@type": "Quiz",
        name: `Banco de ejercicios: ${lesson.title}`,
        hasPart: (lesson.exercisesF0 || []).slice(0, 3).map((ex) => ({
          "@type": "Question",
          name: `Problema #${ex.number}`,
          text: ex.statement,
          ...(getVerifiedAnswerKey(ex) ? {
            suggestedAnswer: {
              "@type": "Answer",
              text: `Clave indicada: ${getVerifiedAnswerKey(ex)?.toUpperCase()}`,
            },
          } : {}),
        })),
      },
    ],
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: "Aprende", item: `${BASE_URL}/aprende` },
        {
          "@type": "ListItem",
          position: 3,
          name: courseMeta.title,
          item: `${BASE_URL}/aprende/${lesson.area}/${lesson.course}`,
        },
        { "@type": "ListItem", position: 4, name: lesson.title, item: canonicalUrl },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="learning-view topic-view wrap my-10 space-y-10 max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <nav className="breadcrumb text-xs text-stone-400 flex flex-wrap items-center gap-2">
          <Link href="/" className="hover:text-stone-200">Inicio</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-stone-200">Biblioteca de lecciones</Link>
          <span>/</span>
          <Link href={`/aprende/${lesson.area}/${lesson.course}`} className="hover:text-stone-200">
            {courseMeta.icon} {courseMeta.title}
          </Link>
          <span>/</span>
          <span className="text-emerald-400 font-semibold">{lesson.title}</span>
        </nav>

        {/* Lesson Header & Onion Layer Status */}
        <section className="rounded-3xl border border-stone-800 bg-stone-900/50 p-6 md:p-10 space-y-5 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-300 border border-emerald-500/30">
                {lesson.gradeLabel} · {lesson.unit}
              </span>
              <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-mono font-semibold text-amber-300 border border-amber-500/30">
                {courseMeta.icon} {courseMeta.title}
              </span>

            </div>

            <div className="flex items-center gap-2 text-xs font-mono">
              <span className={`px-3 py-1 rounded-full border ${
                lesson.publishStatus === "published"
                  ? "bg-emerald-950 text-emerald-300 border-emerald-700"
                  : "bg-stone-950 text-stone-300 border-stone-700"
              }`}>
                {lesson.publishStatus === "published"
                  ? "● Lección publicada"
                  : "Material de estudio"}
              </span>
            </div>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {lesson.title}
          </h1>

          <p className="text-sm md:text-base text-stone-300 leading-relaxed max-w-3xl">
            {studentSummary}
          </p>

          <p className="lesson-approach">Ruta sugerida: observa un ejemplo en el simulador, estudia la teoría y comprueba tus ideas con ejercicios. Puedes volver a cualquier paso.</p>
        </section>

        <nav className="lesson-jump-nav" aria-label="Secciones de esta lección">
          <span>Ir directamente a:</span>
          <a href="#lesson-simulator">Simulador</a>
          <a href="#lesson-theory">Teoría</a>
          {(lesson.exercisesF0.length > 0 || lesson.exercisesFA.length > 0 || (lesson.workedSolutions?.length || 0) > 0) && <a href="#lesson-exercises">Ejercicios</a>}
          <a href="#lesson-practice">Práctica adicional</a>
          {(lesson.areaBookBlocks?.length || 0) > 0 && <a href="#lesson-deep-reading">Lectura ampliada</a>}
          <a href="#lesson-related">Siguientes temas</a>
        </nav>

        {/* Specialized Interactive Web App (Embedded Live) */}
        <div id="lesson-simulator" className="lesson-anchor">
        <ZenitInteractiveApp
          engineId={lesson.appEngine as AppEngineId}
          topicTitle={lesson.title}
          customFormula={lesson.keyFormula}
        />
        </div>

        {/* Extracted Theory & Slides from Teacher's Book / PPTX */}
        <section id="lesson-theory" className="lesson-anchor space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-800 pb-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">
                Marco Teórico Estructurado y Ejemplos Resueltos
              </span>
              <h2 className="text-2xl font-bold text-white mt-1">
                Desarrollo Conceptual: {lesson.title}
              </h2>
            </div>
            <span className="text-xs font-mono text-stone-400">
              {lesson.theorySlides.length} bloques teóricos extraídos
            </span>
          </div>

          {lesson.keyFormula && (
            <div className="rounded-2xl bg-stone-950 p-6 border border-stone-800 text-center shadow-inner">
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 block mb-2">
                Fórmula / Propiedad Eje del Tema
              </span>
              <div className="text-lg md:text-xl py-2 overflow-x-auto">
                <MathFormula source={lesson.keyFormula} displayMode={true} />
                <small className="math-scroll-hint">En móvil, desliza horizontalmente para ver fórmulas largas ↔</small>
              </div>
            </div>
          )}

          {lesson.theorySlides.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {lesson.theorySlides.map((slide, sIdx) => (
                <article
                  key={sIdx}
                  className="rounded-2xl border border-stone-800 bg-stone-900/50 p-6 space-y-3 flex flex-col justify-between hover:border-stone-700 transition-all"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono text-emerald-400">
                      <span>SECCIÓN TEÓRICA #{sIdx + 1}</span>
                      <span>Diapositiva {slide.slideNumber}</span>
                    </div>
                    <h3 className="text-base font-bold text-white leading-snug">
                      <MathText source={slide.heading} inlineOnly />
                    </h3>
                    <div className="space-y-2 text-xs md:text-sm text-stone-300 leading-relaxed">
                      {slide.content.map((p, pIdx) => (
                        <div key={pIdx} className="math-scientific-paragraph bg-stone-950/50 p-3 rounded-lg border border-stone-800/60 font-sans">
                          <MathText source={p}/>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-stone-800 bg-stone-900/40 p-6 text-sm text-stone-300 space-y-3">
              <p>
                En el estudio de <strong>{lesson.title}</strong> ({lesson.gradeLabel}), el objetivo central es dominar la relación entre la representación simbólica y su interpretación analítica. Utiliza el simulador interactivo superior (<strong>{engineMeta.title}</strong>) para experimentar con los parámetros antes de abordar los problemas propuestos.
              </p>
            </div>
          )}
        </section>

        {/* Extracted Exercises Bank (F0 + FA + Worked Solutions) */}
        <div id="lesson-exercises" className="lesson-anchor">
        <InteractiveExerciseBank
          f0={lesson.exercisesF0}
          fa={lesson.exercisesFA}
          workedSolutions={lesson.workedSolutions || []}
          topicTitle={lesson.title}
        />
        </div>

        {/* Layer 3: Infinite Algorithmic Problem Generator */}
        <div id="lesson-practice" className="lesson-anchor">
        <InfiniteProblemGenerator
          engineId={lesson.appEngine as AppEngineId}
          topicTitle={lesson.title}
        />
        </div>

        {/* Layer 3: Extended Textbook Theory (Libro del Área / RM) */}
        {lesson.areaBookBlocks && lesson.areaBookBlocks.length > 0 && (
          <section id="lesson-deep-reading" className="lesson-anchor rounded-3xl border border-stone-800 bg-stone-900/40 p-6 md:p-8 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-800 pb-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold">
                  📘 LECTURA AMPLIADA Y EJEMPLOS
                </span>
                <h2 className="text-xl md:text-2xl font-bold text-white mt-1">
                  Amplía tus conocimientos con ejemplos
                </h2>
              </div>
              <span className="text-xs font-mono text-stone-400">
                {lesson.areaBookBlocks.length} páginas de texto integradas
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {lesson.areaBookBlocks.map((ab, abIdx) => (
                <div
                  key={abIdx}
                  className="rounded-2xl border border-stone-800 bg-stone-950/85 p-5 space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-[11px] font-mono text-sky-400">
                      <span>LIBRO DEL ÁREA</span>
                      <span>Pág. ref #{ab.page}</span>
                    </div>
                    <h3 className="text-sm font-bold text-white leading-snug">
                      <MathText source={ab.heading} inlineOnly />
                    </h3>
                    <div className="space-y-2 text-xs text-stone-300 leading-relaxed">
                      {ab.paragraphs.map((par, pIdx) => (
                        <div key={pIdx} className="math-scientific-paragraph bg-stone-900/60 p-3 rounded-lg border border-stone-800/60">
                          <MathText source={par}/>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Layer 3: Real-World STEAM Projects & Rubrics (.docx) */}
        {lesson.steamProjects && lesson.steamProjects.length > 0 && (
          <section className="rounded-3xl border border-emerald-800/40 bg-stone-900/40 p-6 md:p-8 space-y-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
                🔬 MATEMÁTICAS APLICADAS A SITUACIONES REALES
              </span>
              <h2 className="text-xl font-bold text-white mt-1">
                Proyectos Aplicados a la Realidad ({lesson.unit})
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {lesson.steamProjects.map((sp, spIdx) => (
                <div
                  key={spIdx}
                  className="rounded-2xl border border-stone-800 bg-stone-950/90 p-4 space-y-2"
                >
                  <span className="inline-block px-2.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/50 text-[10px] font-mono font-bold">
                    {sp.type}
                  </span>
                  <h3 className="text-sm font-bold text-white">{sp.title}</h3>
                  <p className="text-xs text-stone-300 leading-relaxed"><MathText source={sp.summary} inlineOnly /></p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Vertical Spiral Curriculum Connections (Same Topic Across Grades 1° to 5°) */}
        {verticalLessons.length > 0 && (
          <section className="rounded-2xl border border-emerald-800/40 bg-emerald-950/20 p-6 space-y-4">
            <div>
              <span className="text-xs font-mono uppercase text-emerald-400 font-bold">
                🔗 Progresión Vertical en Espiral (Mismo Tema en Otros Grados)
              </span>
              <h3 className="text-lg font-bold text-white mt-1">
                Conecta cómo evoluciona «{lesson.title}» a lo largo de la secundaria
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {verticalLessons.map((vl) => vl && (
                <Link
                  key={vl.id}
                  href={`/aprende/${vl.area}/${vl.course}/${vl.slug}`}
                  className="rounded-xl border border-stone-800 bg-stone-950/90 p-3.5 hover:border-emerald-500 transition-all text-xs"
                >
                  <span className="text-emerald-400 font-mono font-bold block">{vl.gradeLabel}</span>
                  <span className="text-stone-200 font-semibold mt-1 block">{vl.title}</span>
                  <span className="text-[10px] text-stone-400 font-mono mt-1 block">{vl.unit} →</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Layer 4: Interlinking Knowledge Mesh */}
        <div id="lesson-related" className="lesson-anchor">
        <InternalKnowledgeMesh
          currentTitle={lesson.title}
          related={relatedLessons}
        />
        </div>

        <LessonCompletion slug={lesson.slug} title={lesson.title} />

        {/* Next / Prev Navigation in Course */}
        <section className="border-t border-stone-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          {prevLesson ? (
            <Link
              href={`/aprende/${prevLesson.area}/${prevLesson.course}/${prevLesson.slug}`}
              className="w-full sm:w-auto rounded-xl border border-stone-800 bg-stone-950 px-5 py-3.5 text-xs text-stone-300 hover:border-emerald-600/60 transition-all text-left"
            >
              <span className="text-[10px] text-stone-500 font-mono block">← Lección Anterior ({prevLesson.gradeLabel})</span>
              <span className="font-bold text-stone-100">{prevLesson.title}</span>
            </Link>
          ) : <div />}

          <Link
            href="/blog"
            className="rounded-xl border border-stone-700 bg-stone-900 px-4 py-2.5 text-xs font-bold text-stone-200 hover:border-emerald-500"
          >
            Volver a la biblioteca
          </Link>

          {nextLesson && (
            <Link
              href={`/aprende/${nextLesson.area}/${nextLesson.course}/${nextLesson.slug}`}
              className="w-full sm:w-auto rounded-xl border border-emerald-800/60 bg-emerald-950/40 px-5 py-3.5 text-xs text-emerald-200 hover:bg-emerald-900/60 transition-all text-right"
            >
              <span className="text-[10px] text-emerald-400 font-mono block">Siguiente Lección ({nextLesson.gradeLabel}) →</span>
              <span className="font-bold text-white">{nextLesson.title}</span>
            </Link>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
