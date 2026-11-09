import React from "react";
import Link from "@/components/safe-link";
import { COURSE_LABELS, type CatalogLessonIndex } from "@/lib/catalog-index";
import { ZENIT_ENGINES, type AppEngineId } from "./zenit-app-engines";

export function InternalKnowledgeMesh({
  currentTitle,
  related,
}: {
  currentTitle: string;
  related: CatalogLessonIndex[];
}) {
  if (!related || related.length === 0) return null;

  return (
    <section className="rounded-3xl border border-stone-800 bg-stone-900/50 p-6 md:p-8 space-y-6 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-800 pb-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
            🕸️ MALLA DE CONOCIMIENTO INTERCONECTADO · SEO & INTERLINKING
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-white mt-1">
            Rutas de Aprendizaje y Temas Relacionados con «{currentTitle}»
          </h2>
          <p className="text-xs text-stone-400 mt-1">
            Profundiza tu comprensión conectando con los fundamentos previos, aplicaciones en ciencias y extensiones de nivel universitario.
          </p>
        </div>
        <Link
          href="/blog"
          className="text-xs font-mono text-emerald-400 hover:text-emerald-300 font-semibold"
        >
          Explorar Grafo Completo (628 Nodos) →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {related.map((item) => {
          const cMeta = COURSE_LABELS[item.course];
          const engMeta = ZENIT_ENGINES[item.appEngine as AppEngineId];

          return (
            <Link
              key={item.id}
              href={`/aprende/${item.area}/${item.course}/${item.slug}`}
              className="group rounded-2xl border border-stone-800 bg-stone-950/85 p-4 hover:border-emerald-500/60 hover:bg-stone-900/70 transition-all flex flex-col justify-between shadow"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="text-emerald-400 font-bold">
                    {item.gradeLabel}
                  </span>
                  <span className="text-stone-500">{item.unit}</span>
                </div>

                <div className="text-[11px] font-semibold text-amber-400 flex items-center gap-1.5">
                  <span>{cMeta?.icon || "📐"}</span>
                  <span className="truncate">{cMeta?.title || item.course}</span>
                </div>

                <h3 className="text-sm font-bold text-stone-100 group-hover:text-emerald-300 transition-colors line-clamp-2">
                  {item.title}
                </h3>

                <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed">
                  {item.summary}
                </p>
              </div>

              <div className="mt-4 pt-2.5 border-t border-stone-800/80 flex items-center justify-between text-[11px] font-mono text-stone-400">
                <span className="text-sky-400 truncate max-w-[170px]">
                  ⚡ {engMeta?.badge || item.appEngine}
                </span>
                <span className="text-emerald-400 font-bold group-hover:translate-x-1 transition-transform">
                  Ver lección →
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
