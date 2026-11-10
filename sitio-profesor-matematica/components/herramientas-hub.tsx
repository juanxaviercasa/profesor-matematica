"use client";

import React, { useState } from "react";
import { ZENIT_ENGINES, ZenitInteractiveApp, type AppEngineId } from "./zenit-app-engines";
import { OPEN_SOURCE_60_ENGINES, getOpenSourceEnginesByMacro } from "@/lib/open-source-60-engines";
import { MathFormula } from "./math-formula";
import { LESSONS_INDEX } from "@/lib/catalog-index";
import Link from "./safe-link";

export function HerramientasInteractiveHub() {
  const engineList = Object.values(ZENIT_ENGINES);
  const [selectedEngine, setSelectedEngine] = useState<AppEngineId>("SetVennLab");
  const [showAll60, setShowAll60] = useState<boolean>(false);

  const matchingLessons = LESSONS_INDEX.filter(l => l.appEngine === selectedEngine);
  const displayedOpenSourceEngines = showAll60
    ? OPEN_SOURCE_60_ENGINES
    : getOpenSourceEnginesByMacro(selectedEngine);

  return (
    <div className="zenit-tools-directory space-y-10">
      {/* Engine Selector Grid */}
      <div className="zenit-engine-selector-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {engineList.map((eng) => {
          const count = LESSONS_INDEX.filter(l => l.appEngine === eng.id).length;
          const active = selectedEngine === eng.id;
          return (
            <button
              key={eng.id}
              onClick={() => setSelectedEngine(eng.id)}
              aria-pressed={active}
              type="button"
              className={`zenit-engine-selector-card text-left rounded-2xl p-5 border transition-all flex flex-col justify-between gap-4 ${
                active
                  ? "bg-emerald-950/80 border-emerald-400 shadow-lg shadow-emerald-950/50"
                  : "bg-stone-950/80 border-stone-800 hover:border-stone-600"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold uppercase tracking-wide px-2.5 py-1 rounded bg-stone-900 text-emerald-400 border border-stone-800">
                    {eng.badge}
                  </span>
                  <span className="text-sm text-stone-300">
                    {count} temas
                  </span>
                </div>
                <h3 className="mt-2.5 text-lg font-bold text-white leading-snug">
                  {eng.title}
                </h3>
              </div>
              <div className="mt-3 pt-3 border-t border-stone-800/80 flex flex-wrap gap-x-3 gap-y-1 items-center justify-between text-sm">
                <span className={active ? "text-emerald-300 font-bold" : "text-stone-400"}>
                  {active ? "● Herramienta seleccionada" : "Probar herramienta"}
                </span>
                <span className="text-emerald-400">→</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Live Interactive Web App Sandbox */}
      <div className="rounded-3xl border border-emerald-700/40 bg-stone-900/40 p-2 md:p-4">
        <ZenitInteractiveApp engineId={selectedEngine} />
      </div>

      {/* Colección de conceptos para profundizar en las representaciones matemáticas. */}
      <section className="rounded-3xl border border-stone-800 bg-stone-950/85 p-6 md:p-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800 pb-4">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wide text-amber-300">
              Ideas matemáticas para explorar y practicar
            </span>
            <h3 className="text-2xl font-bold text-white mt-2 leading-snug">
              {showAll60
                ? "60 conceptos con fórmulas de referencia"
                : `5 conceptos relacionados con ${ZENIT_ENGINES[selectedEngine].title}`}
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setShowAll60(false)}
              aria-pressed={!showAll60}
              className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all ${
                !showAll60
                  ? "bg-emerald-500 text-stone-950 border-emerald-400"
                  : "bg-stone-900 text-stone-200 border-stone-700 hover:border-emerald-500"
              }`}
            >
              Ver 5 conceptos de esta área
            </button>
            <button
              type="button"
              onClick={() => setShowAll60(true)}
              aria-pressed={showAll60}
              className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all ${
                showAll60
                  ? "bg-amber-400 text-stone-950 border-amber-300"
                  : "bg-stone-900 text-stone-200 border-stone-700 hover:border-amber-400"
              }`}
            >
              Explorar los 60 conceptos
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {displayedOpenSourceEngines.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-stone-800 bg-stone-900/70 p-5 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
                  <span className="font-mono font-bold text-amber-300">
                    #{String(item.rank).padStart(2, "0")} · {item.name}
                  </span>
                  <span className="text-stone-400 font-mono">
                    {item.course}
                  </span>
                </div>
                <p className="text-sm text-stone-300 leading-relaxed">
                  {item.purpose}
                </p>
              </div>
              <div className="rounded-xl bg-stone-950 p-3 border border-stone-800 overflow-x-auto">
                <MathFormula source={item.canonicalFormula} displayMode={true} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Connected Topics Using This Engine */}
      <section className="zenit-curriculum-panel rounded-3xl border border-stone-800 bg-stone-950/80 p-6 md:p-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800 pb-4">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wide text-emerald-300">
              TEMAS RELACIONADOS
            </span>
            <h3 className="text-2xl font-bold text-white mt-2 leading-snug">
              Temas que puedes estudiar con esta herramienta
            </h3>
          </div>
          <Link href="/blog" className="button secondary text-base">
            Ver todas las lecciones →
          </Link>
        </div>

        <div className="zenit-topic-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[720px] overflow-y-auto pr-2">
          {matchingLessons.slice(0, 36).map((item) => (
            <Link
              key={item.id}
              href={`/aprende/${item.area}/${item.course}/${item.slug}`}
              className="zenit-topic-card group rounded-xl border border-stone-700 bg-stone-900/70 p-5 hover:border-emerald-400/80 transition-all flex flex-col justify-between gap-4"
            >
              <div>
                <div className="zenit-topic-meta flex flex-wrap items-center justify-between gap-2 text-sm text-stone-300">
                  <span className="text-emerald-400">{item.gradeLabel}</span>
                  <span>{item.unit}</span>
                </div>
                <h4 className="zenit-topic-title mt-2 text-lg font-bold text-stone-100 group-hover:text-emerald-300 leading-snug">
                  {item.title}
                </h4>
              </div>
              <div className="zenit-topic-footer mt-3 pt-3 border-t border-stone-700/70 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-sm text-stone-300">
                <span>{item.f0Count + item.faCount > 0 ? `${item.f0Count + item.faCount} ${item.f0Count + item.faCount === 1 ? "ejercicio" : "ejercicios"}` : "Estudiar el tema"}</span>
                <span className="text-emerald-400 font-bold">Abrir →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
