"use client";

import React, { useState } from "react";
import type { ExtractedExercise } from "@/lib/catalog-loader";

export function InteractiveExerciseBank({
  f0,
  fa,
  topicTitle,
}: {
  f0: ExtractedExercise[];
  fa: ExtractedExercise[];
  topicTitle: string;
}) {
  const [activeTab, setActiveTab] = useState<"f0" | "fa">(f0.length > 0 ? "f0" : "fa");
  const [selectedOptions, setSelectedOptions] = useState<Record<string, number>>({});
  const [revealedHints, setRevealedHints] = useState<Record<string, boolean>>({});

  const currentList = activeTab === "f0" ? f0 : fa;

  if (f0.length === 0 && fa.length === 0) {
    return null;
  }

  return (
    <section className="exercise-bank my-10 rounded-3xl border border-stone-800 bg-stone-900/50 p-6 md:p-8 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800 pb-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">
            Banco Oficial de Entrenamiento
          </span>
          <h2 className="text-2xl font-bold text-white mt-1">
            Práctica Graduada: {topicTitle}
          </h2>
        </div>

        <div className="flex gap-2">
          {f0.length > 0 && (
            <button
              onClick={() => setActiveTab("f0")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                activeTab === "f0"
                  ? "bg-emerald-500 text-stone-950 border-emerald-400 shadow"
                  : "bg-stone-950 text-stone-300 border-stone-800 hover:border-stone-700"
              }`}
            >
              Ficha Nivel Cero ({f0.length})
            </button>
          )}
          {fa.length > 0 && (
            <button
              onClick={() => setActiveTab("fa")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                activeTab === "fa"
                  ? "bg-amber-500 text-stone-950 border-amber-400 shadow"
                  : "bg-stone-950 text-stone-300 border-stone-800 hover:border-stone-700"
              }`}
            >
              Ficha Adicional / Avanzada ({fa.length})
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {currentList.map((ex, idx) => {
          const key = `${activeTab}-${ex.number}-${idx}`;
          const chosen = selectedOptions[key];
          const hintShown = revealedHints[key];

          return (
            <div
              key={key}
              className="rounded-2xl border border-stone-800/90 bg-stone-950/80 p-5 space-y-4 hover:border-stone-700 transition-all"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-md text-xs font-mono font-bold ${
                    activeTab === "f0"
                      ? "bg-emerald-950 text-emerald-300 border border-emerald-800/50"
                      : "bg-amber-950 text-amber-300 border border-amber-800/50"
                  }`}>
                    Ejercicio #{ex.number}
                  </span>
                  <span className="text-[11px] text-stone-400 font-mono">
                    {activeTab === "f0" ? "Nivel Base / Fijación" : "Nivel Intermedio-Avanzado"}
                  </span>
                </div>

                <button
                  onClick={() => setRevealedHints(prev => ({ ...prev, [key]: !prev[key] }))}
                  className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold"
                >
                  {hintShown ? "Ocultar guía" : "💡 Pista metodológica"}
                </button>
              </div>

              <p className="text-sm md:text-base text-stone-100 leading-relaxed font-medium">
                {ex.statement}
              </p>

              {ex.options && ex.options.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2.5 pt-1">
                  {ex.options.map((opt, oIdx) => {
                    const isSelected = chosen === oIdx;
                    return (
                      <button
                        key={oIdx}
                        onClick={() => setSelectedOptions(prev => ({ ...prev, [key]: oIdx }))}
                        className={`px-3 py-2 rounded-xl text-left text-xs font-mono transition-all border ${
                          isSelected
                            ? "bg-emerald-950 border-emerald-500 text-emerald-200 font-bold shadow"
                            : "bg-stone-900/90 border-stone-800 text-stone-300 hover:border-stone-600"
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              )}

              {chosen !== undefined && (
                <div className="rounded-xl bg-emerald-950/30 border border-emerald-800/40 p-3 text-xs text-emerald-200">
                  ✓ Alternativa seleccionada: <strong>{ex.options[chosen]}</strong>. Contrasta tu procedimiento con el simulador interactivo superior para verificar los parámetros del problema.
                </div>
              )}

              {hintShown && (
                <div className="rounded-xl bg-stone-900/90 border border-stone-700 p-3.5 text-xs text-stone-300 space-y-1">
                  <strong className="text-amber-400 block">Ruta Socrática de Resolución:</strong>
                  <p>
                    1. Identifica los datos explícitos del enunciado y las variables pedidas.<br />
                    2. Aplica la propiedad correspondiente de <em>{topicTitle}</em> respetando signos y exponentes.<br />
                    3. Sustituye tus valores en la Web App Interactiva de esta lección para comprobar la consistencia del resultado.
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
