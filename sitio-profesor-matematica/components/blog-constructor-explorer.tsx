"use client";

import React, { useState, useMemo } from "react";
import { LESSONS_INDEX, COURSE_LABELS } from "@/lib/catalog-index";
import { ZENIT_ENGINES } from "@/lib/zenit-engines-meta";
import Link from "./safe-link";

export function BlogConstructorExplorer() {
  
  const [search, setSearch] = useState("");
  const [selectedGrade, setSelectedGrade] = useState<number | "all">("all");
  const [selectedCourse, setSelectedCourse] = useState<string>("all");
  const [selectedEngine, setSelectedEngine] = useState<string>("all");
  const [visibleLimit, setVisibleLimit] = useState<number>(48);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return LESSONS_INDEX.filter((item) => {
      if (item.publishStatus !== "published") {
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
  }, [search, selectedGrade, selectedCourse, selectedEngine]);

  const publishedCount = useMemo(() => LESSONS_INDEX.filter(l => l.publishStatus === "published").length, []);

  return (
    <div className="blog-explorer space-y-8">
      {/* Filter Bar */}
      <div className="blog-filter-panel">
        <div className="blog-filter-header">
          <div className="blog-filter-title">
            Explora las lecciones de la biblioteca
          </div>

          <div className="flex-1 min-w-0 w-full sm:min-w-[240px] max-w-md">
            <label className="sr-only" htmlFor="zenit-blog-search">Buscar lecciones por tema o palabra clave</label>
            <input
              id="zenit-blog-search"
              type="search"
              placeholder="Busca un tema: polinomios, conjuntos, circunferencia, límites..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setVisibleLimit(48);
              }}
              className="blog-search"
            />
          </div>
        </div>

        {/* Grade Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="blog-filter-label">Grado / Nivel:</span>
          {[
            { id: "all", label: `Todos (${publishedCount})` },
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
              className={`blog-filter-pill ${
                selectedGrade === g.id
                  ? "is-active"
                  : ""
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>

        {/* Course & Engine Selects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          <div>
            <label htmlFor="zenit-blog-course" className="blog-filter-label">Filtrar por Curso / Rama:</label>
            <select
              id="zenit-blog-course"
              value={selectedCourse}
              onChange={(e) => {
                setSelectedCourse(e.target.value);
                setVisibleLimit(48);
              }}
              className="blog-select"
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
            <label htmlFor="zenit-blog-engine" className="blog-filter-label">Filtrar por herramienta interactiva:</label>
            <select
              id="zenit-blog-engine"
              value={selectedEngine}
              onChange={(e) => {
                setSelectedEngine(e.target.value);
                setVisibleLimit(48);
              }}
              className="blog-select"
            >
              <option value="all">Todas las herramientas</option>
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
      <div role="status" aria-live="polite" className="blog-results-meta">
        <span>
          Mostrando <strong>{Math.min(visibleLimit, filtered.length)}</strong> de <strong>{filtered.length}</strong> lecciones encontradas
        </span>
        <span className="blog-results-note">
          Selecciona una lección para estudiar y practicar
        </span>
      </div>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.slice(0, visibleLimit).map((item) => {
          const courseInfo = COURSE_LABELS[item.course];
          const engineInfo = ZENIT_ENGINES[item.appEngine];
          const exerciseTotal = item.f0Count + item.faCount;
          const exerciseLabel = exerciseTotal > 0
            ? `${exerciseTotal} ${exerciseTotal === 1 ? "ejercicio" : "ejercicios"}`
            : "Estudiar el tema";

          return (
            <Link
              key={item.id}
              href={`/aprende/${item.area}/${item.course}/${item.slug}`}
              className="blog-lesson-card group"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono mb-2.5">
                  <span className="blog-lesson-tag">
                    {item.gradeLabel} · {item.unit}
                  </span>

                </div>

                <div className="blog-lesson-course">
                  {courseInfo ? `${courseInfo.icon} ${courseInfo.title}` : item.course}
                </div>

                <h3 className="blog-lesson-title">
                  {item.title}
                </h3>

                <p className="blog-lesson-summary">
                  {item.summary}
                </p>
              </div>

              <div className="blog-lesson-footer">
                <div className="blog-lesson-meta">
                  <span>
                    ⚡ {engineInfo ? engineInfo.badge : item.appEngine}
                  </span>
                </div>

                <div className="blog-lesson-meta blog-lesson-meta--bottom">
                  <span>
                    {exerciseTotal > 0 ? "📝 " : "📖 "}{exerciseLabel}
                  </span>
                  <span className="blog-lesson-open">
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
            className="button primary blog-load-more"
          >
            Cargar más lecciones ({filtered.length - visibleLimit} restantes) →
          </button>
        </div>
      )}
    </div>
  );
}
