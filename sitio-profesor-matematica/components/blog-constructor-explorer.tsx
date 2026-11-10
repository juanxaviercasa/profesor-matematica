"use client";

import React, { useState, useMemo } from "react";
import { LESSONS_INDEX, COURSE_LABELS } from "@/lib/catalog-index";
import { ZENIT_ENGINES } from "./zenit-app-engines";
import Link from "./safe-link";

export function BlogConstructorExplorer() {
  const [viewMode, setViewMode] = useState<"constructor" | "drip">("constructor");
  const [search, setSearch] = useState("");
  const [selectedGrade, setSelectedGrade] = useState<number | "all">("all");
  const [selectedCourse, setSelectedCourse] = useState<string>("all");
  const [selectedEngine, setSelectedEngine] = useState<string>("all");
  const [visibleLimit, setVisibleLimit] = useState<number>(48);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return LESSONS_INDEX.filter((item) => {
      if (viewMode === "drip" && item.publishStatus !== "published") {
        return false;
      }
      if (selectedGrade !== "all" && item.grade !== selectedGrade) {
        return false;
      }
      if (selectedCourse !== "all" && item.course !== selectedCourse) {
        return false;
      }
      if (selectedEngine !== "all" && item.appEngine !== selectedEngine) {
        return false;
      }
      if (q) {
        const hay = `${item.title} ${item.summary} ${item.course} ${item.gradeLabel} ${item.unit} ${item.tags.join(" ")}`.toLowerCase();
        return hay.includes(q);
      }
      return true;
    });
  }, [viewMode, search, selectedGrade, selectedCourse, selectedEngine]);

  const publishedCount = useMemo(() => LESSONS_INDEX.filter(l => l.publishStatus === "published").length, []);

  return (
    <div className="space-y-8">
      {/* Filter Bar */}
      <div className="rounded-3xl border border-stone-800 bg-stone-950/90 p-6 space-y-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800 pb-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setViewMode("constructor")}
              aria-pressed={viewMode === "constructor"}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                viewMode === "constructor"
                  ? "bg-emerald-500 text-stone-950 border-emerald-400 shadow"
                  : "bg-stone-900 text-stone-300 border-stone-700"
              }`}
            >
              📚 Todos los temas
            </button>
            <button
              onClick={() => setViewMode("drip")}
              aria-pressed={viewMode === "drip"}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                viewMode === "drip"
                  ? "bg-amber-500 text-stone-950 border-amber-400 shadow"
                  : "bg-stone-900 text-stone-300 border-stone-700"
              }`}
            >
              ✓ Lecciones publicadas ({publishedCount})
            </button>
          </div>

          <div className="flex-1 min-w-0 w-full sm:min-w-[240px] max-w-md">
            <label className="sr-only" htmlFor="zenit-blog-search">Buscar lecciones por tema o palabra clave</label>
            <input
              id="zenit-blog-search"
              type="search"
              placeholder={`Buscar entre los ${LESSONS_INDEX.length} temas (ej. polinomios, conjuntos, ruffini, circunferencia, límite...)`}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setVisibleLimit(48);
              }}
              className="w-full rounded-xl bg-stone-900 border border-stone-700 px-4 py-2 text-xs text-white placeholder:text-stone-500 focus:border-emerald-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Grade Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono text-stone-400 mr-1">Grado / Nivel:</span>
          {[
            { id: "all", label: `Todos (${LESSONS_INDEX.length})` },
            { id: 1, label: "1.° Secundaria" },
            { id: 2, label: "2.° Secundaria" },
            { id: 3, label: "3.° Secundaria" },
            { id: 4, label: "4.° Secundaria" },
            { id: 5, label: "5.° Sec / Ciencias" },
            { id: 6, label: "Universidad" },
          ].map((g) => (
            <button
              key={String(g.id)}
              aria-pressed={selectedGrade === g.id}
              onClick={() => {
                setSelectedGrade(g.id as number | "all");
                setVisibleLimit(48);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all ${
                selectedGrade === g.id
                  ? "bg-emerald-950 border-emerald-400 text-emerald-300 font-bold"
                  : "bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200"
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>

        {/* Course & Engine Selects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          <div>
            <label htmlFor="zenit-blog-course" className="text-[11px] font-mono text-stone-400 block mb-1">Filtrar por Curso / Rama:</label>
            <select
              id="zenit-blog-course"
              value={selectedCourse}
              onChange={(e) => {
                setSelectedCourse(e.target.value);
                setVisibleLimit(48);
              }}
              className="w-full rounded-xl bg-stone-900 border border-stone-700 px-3 py-2 text-xs text-white"
            >
              <option value="all">Todas las Ramas y Cursos (Aritmética, Álgebra, Geometría, Trig, RM, Cálculo, Física, Química)</option>
              {Object.entries(COURSE_LABELS).map(([slug, info]) => (
                <option key={slug} value={slug}>
                  {info.icon} {info.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="zenit-blog-engine" className="text-[11px] font-mono text-stone-400 block mb-1">Filtrar por Motor Web App Interactiva:</label>
            <select
              id="zenit-blog-engine"
              value={selectedEngine}
              onChange={(e) => {
                setSelectedEngine(e.target.value);
                setVisibleLimit(48);
              }}
              className="w-full rounded-xl bg-stone-900 border border-stone-700 px-3 py-2 text-xs text-white"
            >
              <option value="all">Todos los 12 Motores Web App</option>
              {Object.values(ZENIT_ENGINES).map((eng) => (
                <option key={eng.id} value={eng.id}>
                  {eng.title} ({eng.badge})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div role="status" aria-live="polite" className="flex flex-wrap items-center justify-between gap-2 text-xs text-stone-400 px-1">
        <span>
          Mostrando <strong>{Math.min(visibleLimit, filtered.length)}</strong> de <strong>{filtered.length}</strong> lecciones encontradas
        </span>
        <span className="font-mono text-emerald-400">
          Selecciona una lección para estudiar y practicar
        </span>
      </div>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.slice(0, visibleLimit).map((item) => {
          const courseInfo = COURSE_LABELS[item.course];
          const engineInfo = ZENIT_ENGINES[item.appEngine];

          return (
            <Link
              key={item.id}
              href={`/aprende/${item.area}/${item.course}/${item.slug}`}
              className="group rounded-2xl border border-stone-800 bg-stone-950/80 p-5 hover:border-emerald-500/60 hover:bg-stone-900/70 transition-all flex flex-col justify-between shadow-md"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono mb-2.5">
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/50 font-bold">
                    {item.gradeLabel} · {item.unit}
                  </span>
                  <span className={`px-2 py-0.5 rounded border ${
                    item.publishStatus === "published"
                      ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                      : "bg-stone-900 text-stone-400 border-stone-800"
                  }`}>
                    {item.publishStatus === "published" ? "● Publicado" : `Próximamente`}
                  </span>
                </div>

                <div className="text-[11px] text-amber-400 font-semibold mb-1">
                  {courseInfo ? `${courseInfo.icon} ${courseInfo.title}` : item.course}
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs text-stone-400 mt-2 line-clamp-2 leading-relaxed">
                  {item.summary}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-800/80 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-stone-300 font-mono">
                  <span className="truncate max-w-[210px] text-sky-400">
                    ⚡ {engineInfo ? engineInfo.badge : item.appEngine}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-stone-400 font-mono">
                  <span>
                    📝 {item.f0Count + item.faCount} ejercicios
                  </span>
                  <span className="text-emerald-400 font-bold group-hover:translate-x-1 transition-transform">
                    Abrir →
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Load More Button */}
      {visibleLimit < filtered.length && (
        <div className="text-center pt-4">
          <button
            onClick={() => setVisibleLimit(prev => prev + 60)}
            className="button primary px-8 py-3 text-sm"
          >
            Cargar más lecciones ({filtered.length - visibleLimit} restantes) →
          </button>
        </div>
      )}
    </div>
  );
}
