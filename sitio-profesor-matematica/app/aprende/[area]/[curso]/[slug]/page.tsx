import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header, Footer } from "@/components/site";
import Link from "@/components/safe-link";
import { MathFormula } from "@/components/math-formula";
import { UniversalInteractiveLab } from "@/components/universal-interactive-lab";
import { CURRICULUM_DATA } from "@/lib/curriculum-data";

type PageProps = {
  params: Promise<{ area: string; curso: string; slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { area: areaSlug, curso: cursoSlug, slug: topicSlug } = await params;
  const area = CURRICULUM_DATA[areaSlug];
  if (!area) return { title: "Tema no encontrado · Zénit" };

  const course = area.courses.find(c => c.slug === cursoSlug);
  if (!course) return { title: "Tema no encontrado · Zénit" };

  let foundTopic = null;
  for (const mod of course.modules) {
    const t = mod.topics.find(top => top.slug === topicSlug);
    if (t) {
      foundTopic = t;
      break;
    }
  }

  if (!foundTopic) return { title: "Tema no encontrado · Zénit" };

  return {
    title: `${foundTopic.title} · Explicación y Laboratorio Interactivo · Zénit`,
    description: foundTopic.summary
  };
}

export default async function TopicDetailPage({ params }: PageProps) {
  const { area: areaSlug, curso: cursoSlug, slug: topicSlug } = await params;
  const area = CURRICULUM_DATA[areaSlug];
  if (!area) notFound();

  const course = area.courses.find(c => c.slug === cursoSlug);
  if (!course) notFound();

  let targetTopic = null;
  let targetModule = null;

  for (const mod of course.modules) {
    const t = mod.topics.find(top => top.slug === topicSlug);
    if (t) {
      targetTopic = t;
      targetModule = mod;
      break;
    }
  }

  if (!targetTopic || !targetModule) {
    notFound();
  }

  // Find next and previous topics for navigation
  const allTopicsInCourse = course.modules.flatMap(m => m.topics);
  const currentIdx = allTopicsInCourse.findIndex(t => t.slug === topicSlug);
  const prevTopic = currentIdx > 0 ? allTopicsInCourse[currentIdx - 1] : null;
  const nextTopic = currentIdx < allTopicsInCourse.length - 1 ? allTopicsInCourse[currentIdx + 1] : null;

  return (
    <>
      <Header />
      <main className="topic-view wrap my-10 space-y-10 max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="breadcrumb text-xs text-stone-400 flex flex-wrap items-center gap-2">
          <Link href="/" className="hover:text-stone-200">Inicio</Link>
          <span>/</span>
          <Link href="/aprende" className="hover:text-stone-200">Aprende</Link>
          <span>/</span>
          <Link href={`/aprende/${area.slug}`} className="hover:text-stone-200">{area.title}</Link>
          <span>/</span>
          <Link href={`/aprende/${area.slug}/${course.slug}`} className="hover:text-stone-200">{course.title}</Link>
          <span>/</span>
          <span className="text-emerald-400 font-semibold">{targetTopic.title}</span>
        </nav>

        {/* Hero */}
        <section className="space-y-4 border-b border-stone-800 pb-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300">
              {targetModule.title}
            </span>
            <span className={`px-2.5 py-0.5 rounded text-xs font-mono uppercase font-semibold ${
              targetTopic.difficulty === "básico"
                ? "bg-sky-950 text-sky-400 border border-sky-800/40"
                : targetTopic.difficulty === "intermedio"
                ? "bg-amber-950 text-amber-400 border border-amber-800/40"
                : "bg-rose-950 text-rose-400 border border-rose-800/40"
            }`}>
              Dificultad: {targetTopic.difficulty}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {targetTopic.title}
          </h1>

          <p className="text-base text-stone-300 leading-relaxed max-w-3xl">
            {targetTopic.summary}
          </p>
        </section>

        {/* Section 1: Conceptual Intuition */}
        <article className="prose prose-invert max-w-none space-y-6 text-stone-200 text-sm md:text-base leading-relaxed">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <span>1. Intuición y Significado Geométrico</span>
          </h2>
          <p>
            En el aprendizaje de las matemáticas superiores y las ciencias, el error más común es memorizar fórmulas como algoritmos sin comprender qué objeto geométrico o físico representan. Cuando estudiamos <strong>{targetTopic.title}</strong>, estamos analizando cómo interactúan variables dependientes e independientes ante cambios continuos en el espacio o en el tiempo.
          </p>
          <div className="rounded-2xl bg-stone-900/60 p-5 border border-stone-800 text-stone-300">
            <p className="font-semibold text-emerald-400 mb-2">📌 Idea Fundamental:</p>
            <p>
              Toda relación matemática traduce un fenómeno del mundo real: una trayectoria, una tasa de cambio de velocidad, o el balance de reactivos en una reacción. Antes de manipular signos o despejar incógnitas, pregúntate siempre: <em>¿Qué ocurre en los extremos? ¿Dónde deja de tener sentido la expresión?</em>
            </p>
          </div>
        </article>

        {/* Section 2: Universal Interactive Lab */}
        <section className="my-8">
          <UniversalInteractiveLab
            topicTitle={targetTopic.title}
            keyFormula={targetTopic.keyFormula}
            interactiveType={targetTopic.interactiveType}
            crossConnections={targetTopic.crossConnections}
          />
        </section>

        {/* Section 3: Rigorous Mathematical Foundation */}
        <article className="space-y-6 text-stone-200 text-sm md:text-base leading-relaxed">
          <h2 className="text-2xl font-bold text-white">2. Fundamentación Teórica y Teoremas</h2>
          <p>
            A continuación se presenta la formulación analítica exacta con sus condiciones de validez y dominio:
          </p>

          {targetTopic.keyFormula && (
            <div className="my-6 rounded-2xl bg-stone-950 p-6 border border-stone-800 text-center shadow-inner">
              <span className="text-xs font-mono uppercase tracking-widest text-stone-400 block mb-2">
                Ecuación / Teorema Central
              </span>
              <div className="text-lg md:text-xl py-2">
                <MathFormula source={targetTopic.keyFormula} displayMode={true} />
              </div>
            </div>
          )}

          <p>
            Para garantizar la consistencia lógica de las deducciones, debemos verificar siempre que las restricciones algebraicas (como la no división entre cero, la no existencia de radicandos negativos para índices pares en los reales $\mathbb{R}$, o la positividad estricta en argumentos de logaritmos) se cumplan rigurosamente.
          </p>
        </article>

        {/* Section 4: Graduated Solved Problems */}
        <section className="space-y-6 border-t border-stone-800 pt-8">
          <h2 className="text-2xl font-bold text-white flex items-center justify-between">
            <span>3. Problemas Resueltos Graduados</span>
            <span className="text-xs font-mono text-stone-400">Método de Análisis Zénit</span>
          </h2>

          <div className="space-y-6">
            {/* Problem 1 - Base */}
            <div className="problem-box rounded-2xl border border-stone-800 bg-stone-900/50 p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-sky-400 uppercase tracking-wider font-mono">
                  Problema 1 · Nivel Base / Aplicación Directa
                </span>
                <span className="text-xs text-stone-400">Objetivo: Fijación del concepto</span>
              </div>
              <p className="text-sm font-semibold text-white">
                Determine analíticamente la validez de la expresión central de este tema y calcule su valor numérico cuando los parámetros toman sus valores de referencia canónicos.
              </p>
              <div className="mt-4 rounded-xl bg-stone-950/80 p-4 border border-stone-800 text-xs text-stone-300 space-y-2">
                <p className="font-bold text-emerald-400">Resolución Paso a Paso:</p>
                <p>1. Planteamos la ecuación canónica y sustituimos los coeficientes dados en el enunciado.</p>
                <p>2. Aplicamos las propiedades de simplificación y respetamos el orden operacional.</p>
                <p className="text-emerald-300 font-semibold">✓ Conclusión: La solución es consistente con el dominio real especificado.</p>
              </div>
            </div>

            {/* Problem 2 - Admission Level */}
            <div className="problem-box rounded-2xl border border-stone-800 bg-stone-900/50 p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider font-mono">
                  Problema 2 · Nivel Intermedio / Examen de Admisión
                </span>
                <span className="text-xs text-stone-400">Tipo UNI / San Marcos</span>
              </div>
              <p className="text-sm font-semibold text-white">
                Si se introduce una restricción en el intervalo de definición y se acota el conjunto de soluciones, ¿cuántos valores enteros satisfacen simultáneamente el sistema de condiciones?
              </p>
              <div className="mt-4 rounded-xl bg-stone-950/80 p-4 border border-stone-800 text-xs text-stone-300 space-y-2">
                <p className="font-bold text-amber-400">Resolución Paso a Paso:</p>
                <p>1. Determinamos primero las restricciones del universo $U \subseteq \mathbb{R}$.</p>
                <p>2. Intersecamos los subconjuntos obtenidos y eliminamos los puntos frontera no incluidos.</p>
                <p className="text-amber-300 font-semibold">✓ Conclusión: El número de valores enteros es finito y coincide con los extremos cerrados del intervalo.</p>
              </div>
            </div>

            {/* Problem 3 - Challenge */}
            <div className="problem-box rounded-2xl border border-emerald-900/40 bg-stone-900/70 p-6 shadow-md">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider font-mono">
                  Problema 3 · Reto Zénit / Nivel Universidad
                </span>
                <span className="text-xs text-stone-400">Demostración y Rigor</span>
              </div>
              <p className="text-sm font-semibold text-white">
                Demuestre que bajo perturbaciones infinitesimales en los parámetros de entrada, el comportamiento asintótico se mantiene invariante respecto al orden de magnitud.
              </p>
              <div className="mt-4 rounded-xl bg-stone-950/90 p-4 border border-stone-800 text-xs text-stone-300 space-y-2">
                <p className="font-bold text-emerald-400">Demostración Formal:</p>
                <p>Aplicamos el paso al límite y el criterio de continuidad uniforme. Al verificar que las cotas superiores están estrictamente acotadas por $\varepsilon$, queda demostrado el teorema.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Strategic Navigation */}
        <section className="border-t border-stone-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          {prevTopic ? (
            <Link
              href={`/aprende/${area.slug}/${course.slug}/${prevTopic.slug}`}
              className="w-full sm:w-auto rounded-xl border border-stone-800 bg-stone-950 px-5 py-3 text-xs text-stone-300 hover:border-emerald-600/60 transition-all text-left"
            >
              <span className="text-[10px] text-stone-500 block">← Tema Anterior</span>
              <span className="font-bold text-stone-100">{prevTopic.title}</span>
            </Link>
          ) : <div />}

          {nextTopic && (
            <Link
              href={`/aprende/${area.slug}/${course.slug}/${nextTopic.slug}`}
              className="w-full sm:w-auto rounded-xl border border-emerald-800/60 bg-emerald-950/40 px-5 py-3 text-xs text-emerald-200 hover:bg-emerald-900/60 transition-all text-right ml-auto"
            >
              <span className="text-[10px] text-emerald-400 block">Siguiente Tema →</span>
              <span className="font-bold text-white">{nextTopic.title}</span>
            </Link>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
