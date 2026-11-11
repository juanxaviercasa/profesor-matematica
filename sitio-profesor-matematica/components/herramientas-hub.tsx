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
  const [showAll60, setShowAll60] = useState(false);
  const matchingLessons = LESSONS_INDEX.filter((lesson) => lesson.appEngine === selectedEngine);
  const displayedOpenSourceEngines = showAll60
    ? OPEN_SOURCE_60_ENGINES
    : getOpenSourceEnginesByMacro(selectedEngine);

  return (
    <div className="zenit-tools-directory space-y-10">
      <section className="tools-engine-selector" aria-labelledby="tools-engine-title">
        <div className="tools-section-heading">
          <div>
            <p className="eyebrow">Elige una experiencia</p>
            <h2 id="tools-engine-title">Una idea se entiende mejor cuando puedes moverla.</h2>
          </div>
          <p>Empieza por un simulador y cambia una variable a la vez. La herramienta te acompaña, pero la explicación sigue siendo tuya.</p>
        </div>
        <div className="tools-engine-grid">
          {engineList.map((engine) => {
            const count = LESSONS_INDEX.filter((lesson) => lesson.appEngine === engine.id).length;
            const active = selectedEngine === engine.id;
            return (
              <button
                key={engine.id}
                onClick={() => setSelectedEngine(engine.id)}
                aria-pressed={active}
                type="button"
                className={`tools-engine-card zenit-engine-selector-card${active ? " is-active" : ""}`}
              >
                <span className="tools-engine-card__top"><b>{engine.badge}</b><small>{count} temas</small></span>
                <strong>{engine.title}</strong>
                <span className="tools-engine-card__action">{active ? "Herramienta seleccionada" : "Probar herramienta"}<i aria-hidden="true">→</i></span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="tools-interactive-stage" aria-label="Simulador interactivo">
        <ZenitInteractiveApp engineId={selectedEngine} />
      </section>

      <section className="tools-concept-library" aria-labelledby="concept-library-title">
        <div className="tools-section-heading tools-section-heading--split">
          <div>
            <p className="eyebrow">Ideas para explorar y practicar</p>
            <h2 id="concept-library-title">{showAll60 ? "60 conceptos con fórmulas de referencia" : `Conceptos relacionados con ${ZENIT_ENGINES[selectedEngine].title}`}</h2>
          </div>
          <div className="tools-view-switcher">
            <button type="button" onClick={() => setShowAll60(false)} aria-pressed={!showAll60} className={!showAll60 ? "is-active" : ""}>Área seleccionada</button>
            <button type="button" onClick={() => setShowAll60(true)} aria-pressed={showAll60} className={showAll60 ? "is-active is-gold" : ""}>Explorar los 60 conceptos</button>
          </div>
        </div>
        <div className="tools-concept-grid">
          {displayedOpenSourceEngines.map((item) => (
            <article key={item.id} className="tools-concept-card">
              <div>
                <div className="tools-concept-meta"><b>#{String(item.rank).padStart(2, "0")} · {item.name}</b><span>{item.course}</span></div>
                <p>{item.purpose}</p>
              </div>
              <div className="tools-formula-tile"><MathFormula source={item.canonicalFormula} displayMode /></div>
            </article>
          ))}
        </div>
      </section>

      <section className="tools-related-topics" aria-labelledby="related-topics-title">
        <div className="tools-section-heading tools-section-heading--split">
          <div><p className="eyebrow">TEMAS RELACIONADOS</p><h2 id="related-topics-title">Temas que puedes estudiar con esta herramienta</h2></div>
          <Link href="/blog" className="button secondary">Ver todas las lecciones →</Link>
        </div>
        <div className="tools-topic-grid zenit-topic-grid">
          {matchingLessons.slice(0, 36).map((item) => (
            <Link key={item.id} href={`/aprende/${item.area}/${item.course}/${item.slug}`} className="tools-topic-card">
              <div><div className="tools-topic-meta zenit-topic-meta"><span>{item.gradeLabel}</span><span>{item.unit}</span></div><h3 className="zenit-topic-title">{item.title}</h3></div>
              <div className="tools-topic-footer zenit-topic-footer"><span>{item.f0Count + item.faCount > 0 ? `${item.f0Count + item.faCount} ${item.f0Count + item.faCount === 1 ? "ejercicio" : "ejercicios"}` : "Estudiar el tema"}</span><b>Abrir →</b></div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
