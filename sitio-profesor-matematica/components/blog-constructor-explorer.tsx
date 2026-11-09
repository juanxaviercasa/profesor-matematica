"use client";

import React, { useState, useMemo } from "react";
import { LESSONS_INDEX, COURSE_LABELS } from "@/lib/catalog-loader";
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
  const scheduledCount = LESSONS_INDEX.length - publishedCount;
  const totalExercises = useMemo(() => LESSONS_INDEX.reduce((acc, l) => acc + l.f0Count + l.faCount, 0), []);
  const totalWorked = useMemo(() => LESSONS_INDEX.reduce((acc, l) => acc + (l.workedCount || 0), 0), []);
  const totalSlides = useMemo(() => LESSONS_INDEX.reduce((acc, l) => acc + l.slidesCount, 0), []);

  return (
    <div className="space-y-8">
      {/* Onion Layer & Stats Banner */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-emerald-800/40 bg-stone-950/90 p-5">
          <span className="text-xs font-mono uppercase text-emerald-400">Total Páginas Generadas</span>
          <div className="text-3xl font-extrabold text-white mt-1 font-mono">{LESSONS_INDEX.length}</div>
          <span className="text-[11px] text-stone-400">1.° a 5.° Sec + Preuni + Uni + Ciencias</span>
        </div>
        <div className="rounded-2xl border border-stone-800 bg-stone-950/90 p-5">
          <span className="text-xs font-mono uppercase text-amber-400">Diapositivas + Desarrollos</span>
          <div className="text-3xl font-extrabold text-white mt-1 font-mono">
            {totalSlides.toLocaleString()} <span className="text-sm font-normal text-sky-400">+ {totalWorked.toLocaleString()} sol.</span>
          </div>
          <span className="text-[11px] text-stone-400">Teoría MathML + Solucionarios paso a paso</span>
        </div>
        <div className="rounded-2xl border border-stone-800 bg-stone-950/90 p-5">
          <span className="text-xs font-mono uppercase text-sky-400">Ejercicios con Clave (F0 + FA)</span>
          <div className="text-3xl font-extrabold text-white mt-1 font-mono">{totalExercises.toLocaleString()}</div>
          <span className="text-[11px] text-stone-400">Simulador con clave oficial verificada</span>
        </div>
        <div className="rounded-2xl border border-stone-800 bg-stone-950/90 p-5">
          <span className="text-xs font-mono uppercase text-emerald-300">Cola Drip (3 por día)</span>
          <div className="text-3xl font-extrabold text-white mt-1 font-mono">
            {publishedCount} <span className="text-base font-normal text-stone-400">/ {scheduledCount} en cola</span>
          </div>
          <span className="text-[11px] text-stone-400">GitHub Actions → Cloudflare</span>
        </div>
      </div>

      {/* Onion Layer Roadmap */}
      <div className="rounded-2xl border border-stone-800 bg-stone-900/50 p-5">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
            Arquitectura de Refinamiento por Capas (Modelo Cebolla · Capa 3 Completada)
          </span>
          <span className="text-xs text-stone-400">
            {LESSONS_INDEX.length} páginas con Capa 1 + 2 + 3 activas (Teoría + Web App + Fichas F0/FA + Claves Oficiales + Solucionarios + Libro del Área + STEAM + Generador Infinito)
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
          <div className="rounded-xl border border-emerald-500/60 bg-emerald-950/30 p-3.5">
            <div className="flex items-center justify-between font-bold text-emerald-300">
              <span>Capa 1 · Full Borrador Base</span>
              <span>✓ 100%</span>
            </div>
            <p className="text-stone-300 mt-1">
              Extracción de diapositivas PPTX, fichas F0/FA, taxonomía curricular y asignación de 12 Web Apps interactivas.
            </p>
          </div>
          <div className="rounded-xl border border-emerald-500/60 bg-emerald-950/30 p-3.5">
            <div className="flex items-center justify-between font-bold text-emerald-300">
              <span>Capa 2 · Claves y Solucionarios</span>
              <span>✓ 100%</span>
            </div>
            <p className="text-stone-300 mt-1">
              5,060 claves oficiales inyectadas, 2,910 resoluciones paso a paso y simulador con puntaje y modos en vivo.
            </p>
          </div>
          <div className="rounded-xl border border-emerald-500/60 bg-emerald-950/30 p-3.5">
            <div className="flex items-center justify-between font-bold text-emerald-300">
              <span>Capa 3 · Libros del Área y STEAM</span>
              <span>✓ 100%</span>
            </div>
            <p className="text-stone-300 mt-1">
              1,714 lecturas del Libro del Área, 1,757 proyectos STEAM (.docx), 72 temas Uni/Ciencias y Generador Infinito.
            </p>
          </div>
          <div className="rounded-xl border border-amber-500/50 bg-stone-950/80 p-3.5">
            <div className="flex items-center justify-between font-bold text-amber-300">
              <span>Capa 4 · Lanzamiento Drip SEO</span>
              <span>En Automatización</span>
            </div>
            <p className="text-stone-400 mt-1">
              Drip publish de 3 páginas/día mediante GitHub Actions, grafo de conocimiento, sitemap dinámico y meta tags.
            </p>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="rounded-3xl border border-stone-800 bg-stone-950/90 p-6 space-y-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800 pb-4">
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("constructor")}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                viewMode === "constructor"
                  ? "bg-emerald-500 text-stone-950 border-emerald-400 shadow"
                  : "bg-stone-900 text-stone-300 border-stone-700"
              }`}
            >
              🛠️ Modo Constructor Total ({LESSONS_INDEX.length} páginas)
            </button>
            <button
              onClick={() => setViewMode("drip")}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                viewMode === "drip"
                  ? "bg-amber-500 text-stone-950 border-amber-400 shadow"
                  : "bg-stone-900 text-stone-300 border-stone-700"
              }`}
            >
              🚀 Publicados Hoy en Blog ({publishedCount})
            </button>
          </div>

          <div className="flex-1 min-w-[240px] max-w-md">
            <input
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
            <label className="text-[11px] font-mono text-stone-400 block mb-1">Filtrar por Curso / Rama:</label>
            <select
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
            <label className="text-[11px] font-mono text-stone-400 block mb-1">Filtrar por Motor Web App Interactiva:</label>
            <select
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
      <div className="flex items-center justify-between text-xs text-stone-400 px-1">
        <span>
          Mostrando <strong>{Math.min(visibleLimit, filtered.length)}</strong> de <strong>{filtered.length}</strong> lecciones encontradas
        </span>
        <span className="font-mono text-emerald-400">
          Haz clic en cualquier tarjeta para abrir su página completa y su Web App
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
                    {item.publishStatus === "published" ? "● Publicado" : `⏳ Cola Día +${item.dripBatch} (${item.scheduledDate})`}
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
                  <span className="text-stone-400">
                    Capa {item.onionLayer}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-stone-400 font-mono">
                  <span>
                    📑 {item.slidesCount} diapos · 📝 {item.f0Count + item.faCount} ejerc. · 📘 {item.workedCount || 0} sol.
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
