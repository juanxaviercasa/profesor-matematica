"use client";

import React, { useState } from "react";
import { ZENIT_ENGINES, ZenitInteractiveApp, type AppEngineId } from "./zenit-app-engines";
import { LESSONS_INDEX } from "@/lib/catalog-index";
import Link from "./safe-link";

export function HerramientasInteractiveHub() {
  const engineList = Object.values(ZENIT_ENGINES);
  const [selectedEngine, setSelectedEngine] = useState<AppEngineId>("SetVennLab");

  const matchingLessons = LESSONS_INDEX.filter(l => l.appEngine === selectedEngine);

  return (
    <div className="space-y-10">
      {/* Engine Selector Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {engineList.map((eng) => {
          const count = LESSONS_INDEX.filter(l => l.appEngine === eng.id).length;
          const active = selectedEngine === eng.id;
          return (
            <button
              key={eng.id}
              onClick={() => setSelectedEngine(eng.id)}
              className={`text-left rounded-2xl p-4 border transition-all flex flex-col justify-between ${
                active
                  ? "bg-emerald-950/80 border-emerald-400 shadow-lg shadow-emerald-950/50"
                  : "bg-stone-950/80 border-stone-800 hover:border-stone-600"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-stone-900 text-emerald-400 border border-stone-800">
                    {eng.badge}
                  </span>
                  <span className="text-[11px] font-mono text-stone-400">
                    {count} temas
                  </span>
                </div>
                <h3 className="mt-2.5 text-sm font-bold text-white leading-snug">
                  {eng.title}
                </h3>
              </div>
              <div className="mt-3 pt-2 border-t border-stone-800/80 flex items-center justify-between text-[11px]">
                <span className={active ? "text-emerald-300 font-bold" : "text-stone-400"}>
                  {active ? "● Activo en constructor" : "Probar Web App"}
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

      {/* Connected Topics Using This Engine */}
      <section className="rounded-3xl border border-stone-800 bg-stone-950/80 p-6 md:p-8 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800 pb-4">
          <div>
            <span className="text-xs font-mono uppercase text-emerald-400">
              Cobertura Curricular del Motor ({matchingLessons.length} lecciones conectadas)
            </span>
            <h3 className="text-xl font-bold text-white mt-1">
              Temas de Secundaria, Preuniversitario y Universidad que integran esta Web App
            </h3>
          </div>
          <Link href="/blog" className="button secondary text-xs">
            Ir al Constructor Total (584 páginas) →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[420px] overflow-y-auto pr-1">
          {matchingLessons.slice(0, 36).map((item) => (
            <Link
              key={item.id}
              href={`/aprende/${item.area}/${item.course}/${item.slug}`}
              className="group rounded-xl border border-stone-800 bg-stone-900/60 p-3.5 hover:border-emerald-500/60 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono text-stone-400">
                  <span className="text-emerald-400">{item.gradeLabel}</span>
                  <span>{item.unit}</span>
                </div>
                <h4 className="mt-1 text-xs font-bold text-stone-100 group-hover:text-emerald-300">
                  {item.title}
                </h4>
              </div>
              <div className="mt-2 pt-2 border-t border-stone-800/60 flex items-center justify-between text-[10px] text-stone-400 font-mono">
                <span>{item.slidesCount} diapos · {item.f0Count + item.faCount} ejerc.</span>
                <span className="text-emerald-400 font-bold">Abrir →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
