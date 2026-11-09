"use client";

import React, { useState } from "react";
import type { ExtractedExercise, WorkedSolution } from "@/lib/catalog-loader";

const OPTION_LETTERS = ["a", "b", "c", "d", "e"];

export function InteractiveExerciseBank({
  f0,
  fa,
  workedSolutions = [],
  topicTitle,
}: {
  f0: ExtractedExercise[];
  fa: ExtractedExercise[];
  workedSolutions?: WorkedSolution[];
  topicTitle: string;
}) {
  const initialTab = f0.length > 0 ? "f0" : fa.length > 0 ? "fa" : "worked";
  const [activeTab, setActiveTab] = useState<"f0" | "fa" | "worked">(initialTab);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, number>>({});
  const [revealedHints, setRevealedHints] = useState<Record<string, boolean>>({});
  const [examMode, setExamMode] = useState<boolean>(false);
  const [examSubmitted, setExamSubmitted] = useState<boolean>(false);

  const currentList = activeTab === "f0" ? f0 : fa;

  if (f0.length === 0 && fa.length === 0 && workedSolutions.length === 0) {
    return null;
  }

  // Compute live score across answered questions
  const allExercisesWithTab = [
    ...f0.map((ex, idx) => ({ tab: "f0", ex, idx })),
    ...fa.map((ex, idx) => ({ tab: "fa", ex, idx })),
  ];

  let answeredCount = 0;
  let correctCount = 0;
  for (const item of allExercisesWithTab) {
    const key = `${item.tab}-${item.ex.number}-${item.idx}`;
    const chosenIdx = selectedOptions[key];
    if (chosenIdx !== undefined) {
      answeredCount++;
      const chosenLetter = OPTION_LETTERS[chosenIdx];
      const expected = (item.ex.answerKey || "a").toLowerCase();
      if (chosenLetter === expected) {
        correctCount++;
      }
    }
  }

  const accuracy = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;

  return (
    <section className="exercise-bank my-10 rounded-3xl border border-stone-800 bg-stone-900/50 p-6 md:p-8 space-y-6 shadow-xl">
      {/* Header & Scoreboard */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800 pb-5">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
              ● CAPA 2 ACTIVA · SIMULADOR CON CLAVES OFICIALES Y SOLUCIONARIO
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white mt-1">
            Entrenamiento y Solucionario: {topicTitle}
          </h2>
        </div>

        {/* Live Score Widget */}
        <div className="flex flex-wrap items-center gap-3 bg-stone-950/90 border border-stone-800 rounded-2xl px-4 py-2.5">
          <div className="text-xs font-mono">
            <span className="text-stone-400 block text-[10px] uppercase">Puntaje en Vivo</span>
            <span className="text-emerald-400 font-bold text-sm">
              {correctCount} / {answeredCount} aciertos ({accuracy}%)
            </span>
          </div>
          <div className="h-6 w-px bg-stone-800" />
          <button
            onClick={() => {
              setExamMode(!examMode);
              setExamSubmitted(false);
            }}
            aria-pressed={examMode}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
              examMode
                ? "bg-purple-500/20 border-purple-500 text-purple-300"
                : "bg-stone-900 border-stone-700 text-stone-300 hover:border-stone-500"
            }`}
          >
            {examMode ? "⏱ Modo Examen (Ocultar Claves)" : "⚡ Modo Estudio (Feedback Inmediato)"}
          </button>
          {examMode && answeredCount > 0 && !examSubmitted && (
            <button
              onClick={() => setExamSubmitted(true)}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-500 text-stone-950 hover:bg-emerald-400"
            >
              Calificar Examen
            </button>
          )}
          {answeredCount > 0 && (
            <button
              onClick={() => {
                setSelectedOptions({});
                setExamSubmitted(false);
              }}
              className="text-xs text-stone-400 hover:text-white font-mono underline"
            >
              Reiniciar
            </button>
          )}
        </div>
      </div>

      {/* Navigation Tabs: F0 | FA | Solucionario Paso a Paso */}
      <div className="flex flex-wrap gap-2.5">
        {f0.length > 0 && (
          <button
            onClick={() => setActiveTab("f0")}
             aria-pressed={activeTab === "f0"}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all border ${
              activeTab === "f0"
                ? "bg-emerald-500 text-stone-950 border-emerald-400 shadow-lg"
                : "bg-stone-950 text-stone-300 border-stone-800 hover:border-stone-700"
            }`}
          >
            1. Ficha Nivel Cero ({f0.length} problemas + Claves)
          </button>
        )}
        {fa.length > 0 && (
          <button
            onClick={() => setActiveTab("fa")}
             aria-pressed={activeTab === "fa"}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all border ${
              activeTab === "fa"
                ? "bg-amber-500 text-stone-950 border-amber-400 shadow-lg"
                : "bg-stone-950 text-stone-300 border-stone-800 hover:border-stone-700"
            }`}
          >
            2. Ficha Adicional / Avanzada ({fa.length} problemas + Claves)
          </button>
        )}
        {workedSolutions.length > 0 && (
          <button
            onClick={() => setActiveTab("worked")}
             aria-pressed={activeTab === "worked"}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all border ${
              activeTab === "worked"
                ? "bg-sky-400 text-stone-950 border-sky-300 shadow-lg"
                : "bg-stone-950 text-sky-300 border-sky-900/60 hover:border-sky-600"
            }`}
          >
            3. Solucionario Paso a Paso ({workedSolutions.length} desarrollos oficiales)
          </button>
        )}
      </div>

      {/* Tab Content: Worked Step-by-Step Solutions */}
      {activeTab === "worked" ? (
        <div className="space-y-4">
          <div className="rounded-2xl bg-sky-950/30 border border-sky-800/50 p-4 text-xs text-sky-200 flex flex-wrap items-center justify-between gap-2">
            <span>
              📘 <strong>Solucionario Oficial del Docente (Libro de Actividades y Razonamiento Matemático):</strong> Resoluciones algebraicas y geométricas paso a paso con clave verificada.
            </span>
            <span className="font-mono text-sky-300 font-bold">
              {workedSolutions.length} ejercicios desarrollados
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {workedSolutions.map((ws, wIdx) => (
              <div
                key={wIdx}
                className="rounded-2xl border border-stone-800 bg-stone-950/90 p-5 space-y-3 flex flex-col justify-between hover:border-sky-500/40 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 border-b border-stone-800/80 pb-2.5">
                    <span className="px-2.5 py-0.5 rounded-md bg-sky-950 text-sky-300 border border-sky-800/60 text-xs font-mono font-bold">
                      Resolución #{ws.number}
                    </span>
                    <span className="text-[11px] font-mono text-stone-400">
                      {ws.level}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs md:text-sm font-mono text-stone-200 bg-stone-900/70 p-3.5 rounded-xl border border-stone-800/70">
                    {ws.steps.map((step, sIdx) => (
                      <div key={sIdx} className="leading-relaxed flex items-start gap-2">
                        <span className="text-sky-400 select-none">▸</span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs font-mono">
                  <span className="text-stone-400">Verificación completada</span>
                  <span className="px-3 py-1 rounded-lg bg-emerald-950/80 text-emerald-300 border border-emerald-700/60 font-bold">
                    ✓ Clave Oficial: {ws.answerKey.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Tab Content: Interactive F0 / FA Exercises with Official Key Validation */
        <div className="grid grid-cols-1 gap-4">
          {currentList.map((ex, idx) => {
            const key = `${activeTab}-${ex.number}-${idx}`;
            const chosen = selectedOptions[key];
            const hintShown = revealedHints[key];
            const expectedLetter = (ex.answerKey || "a").toLowerCase();
            const chosenLetter = chosen !== undefined ? OPTION_LETTERS[chosen] : null;
            const isCorrect = chosenLetter === expectedLetter;
            const showFeedback = chosen !== undefined && (!examMode || examSubmitted);

            return (
              <div
                key={key}
                className={`rounded-2xl border p-5 space-y-4 transition-all ${
                  showFeedback
                    ? isCorrect
                      ? "border-emerald-600/60 bg-emerald-950/15"
                      : "border-amber-600/60 bg-amber-950/10"
                    : "border-stone-800/90 bg-stone-950/80 hover:border-stone-700"
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-md text-xs font-mono font-bold ${
                        activeTab === "f0"
                          ? "bg-emerald-950 text-emerald-300 border border-emerald-800/50"
                          : "bg-amber-950 text-amber-300 border border-amber-800/50"
                      }`}
                    >
                      Problema #{ex.number}
                    </span>
                    <span className="text-[11px] text-stone-400 font-mono">
                      {activeTab === "f0" ? "Nivel Cero (Fijación)" : "Nivel Adicional (Competencia)"}
                    </span>
                    {ex.isOfficialKey && (
                      <span className="text-[10px] font-mono bg-stone-900 text-emerald-400 px-2 py-0.5 rounded border border-stone-800">
                        ✓ Clave Solucionario
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => setRevealedHints((prev) => ({ ...prev, [key]: !prev[key] }))}
                     aria-expanded={hintShown}
                     aria-label={hintShown ? `Ocultar la pista del problema ${ex.number}` : `Mostrar la pista del problema ${ex.number}`}
                    className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold"
                  >
                    {hintShown ? "Ocultar pista y clave" : "💡 Ver pista / resolución"}
                  </button>
                </div>

                <p className="text-sm md:text-base text-stone-100 leading-relaxed font-medium">
                  {ex.statement}
                </p>

                {ex.options && ex.options.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-2.5 pt-1">
                    {ex.options.map((opt, oIdx) => {
                      const optLetter = OPTION_LETTERS[oIdx];
                      const isSelected = chosen === oIdx;
                      const isOptionCorrect = optLetter === expectedLetter;

                      let btnStyle =
                        "bg-stone-900/90 border-stone-800 text-stone-300 hover:border-stone-600";
                      if (isSelected && !showFeedback) {
                        btnStyle = "bg-sky-950 border-sky-500 text-sky-200 font-bold shadow";
                      } else if (showFeedback) {
                        if (isOptionCorrect) {
                          btnStyle =
                            "bg-emerald-950 border-emerald-500 text-emerald-200 font-bold shadow";
                        } else if (isSelected && !isOptionCorrect) {
                          btnStyle = "bg-rose-950/80 border-rose-500 text-rose-200 font-bold";
                        }
                      }

                      return (
                        <button
                          key={oIdx}
                          aria-pressed={isSelected}
                          aria-label={`Problema ${ex.number}, alternativa ${oIdx + 1}: ${opt}`}
                          onClick={() => setSelectedOptions((prev) => ({ ...prev, [key]: oIdx }))}
                          className={`px-3 py-2.5 rounded-xl text-left text-xs font-mono transition-all border ${btnStyle}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                )}

                {showFeedback && (
                  <div
                    role="status"
                    aria-live="polite"
                    className={`rounded-xl p-3 text-xs flex flex-wrap items-center justify-between gap-2 border ${
                      isCorrect
                        ? "bg-emerald-950/40 border-emerald-700/50 text-emerald-200"
                        : "bg-amber-950/40 border-amber-700/50 text-amber-200"
                    }`}
                  >
                    <div>
                      {isCorrect ? (
                        <span>
                          ✓ <strong>¡Respuesta Correcta!</strong> Marcaste la alternativa{" "}
                          <strong className="uppercase">{chosenLetter}</strong> (Clave oficial verificada).
                        </span>
                      ) : (
                        <span>
                          ✗ Marcaste <strong className="uppercase">{chosenLetter}</strong> · La Clave Oficial verificada es la alternativa{" "}
                          <strong className="uppercase underline">{expectedLetter}</strong>.
                        </span>
                      )}
                    </div>
                    {workedSolutions.length > 0 && (
                      <button
                        onClick={() => setActiveTab("worked")}
                        className="text-[11px] font-mono font-bold text-sky-300 hover:underline"
                      >
                        Ver ejemplos paso a paso →
                      </button>
                    )}
                  </div>
                )}

                {hintShown && (
                  <div className="rounded-xl bg-stone-900/95 border border-stone-700 p-4 text-xs text-stone-300 space-y-2">
                    <div className="flex items-center justify-between">
                      <strong className="text-amber-400">Guía Metodológica Zénit:</strong>
                      <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-mono font-bold border border-emerald-800">
                        Clave Oficial: {expectedLetter.toUpperCase()}
                      </span>
                    </div>
                    <p className="leading-relaxed">
                      {ex.hint ||
                        `Identifica los datos principales del enunciado de ${topicTitle}, aplica la propiedad del marco teórico y comprueba con el simulador interactivo superior hasta obtener la alternativa ${expectedLetter.toUpperCase()}.`}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
