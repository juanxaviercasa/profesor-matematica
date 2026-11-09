"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "zenit_studied_lessons_v1";
const PROGRESS_EVENT = "zenit:lesson-progress";

type LessonMarks = Record<string, true>;

function readMarks(): LessonMarks {
  if (typeof window === "undefined") return {};
  try {
    const data: unknown = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "{}");
    if (!data || typeof data !== "object" || Array.isArray(data)) return {};
    return Object.fromEntries(Object.entries(data).filter(([key, value]) => key.length > 0 && value === true)) as LessonMarks;
  } catch {
    return {};
  }
}

function saveMarks(marks: LessonMarks): boolean {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(marks));
    window.dispatchEvent(new Event(PROGRESS_EVENT));
    return true;
  } catch {
    return false;
  }
}

export function LessonCompletion({ slug, title }: { slug: string; title: string }) {
  const [ready, setReady] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [saved, setSaved] = useState<boolean | null>(null);

  useEffect(() => {
    const refresh = () => setCompleted(readMarks()[slug] === true);
    const frame = window.requestAnimationFrame(() => { refresh(); setReady(true); });
    window.addEventListener("storage", refresh);
    window.addEventListener(PROGRESS_EVENT, refresh);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("storage", refresh);
      window.removeEventListener(PROGRESS_EVENT, refresh);
    };
  }, [slug]);

  function toggle() {
    const next = !completed;
    const all = readMarks();
    if (next) all[slug] = true;
    else delete all[slug];
    const persisted = saveMarks(all);
    setCompleted(next);
    setSaved(persisted);
  }

  return <section className="lesson-completion-card" aria-label="Seguimiento personal de la lección">
    <div>
      <span className="lesson-progress-kicker">Seguimiento personal</span>
      <h2>{completed ? "Lección marcada como estudiada" : "¿Terminaste de estudiar esta lección?"}</h2>
      <p>Esta marca es una ayuda para organizar tus repasos. No representa una calificación ni acredita dominio del tema.</p>
      <small>Se guarda únicamente en este navegador, sin crear una cuenta.</small>
    </div>
    <div className="lesson-completion-actions">
      <button type="button" disabled={!ready} onClick={toggle} aria-pressed={completed}
        aria-label={(completed ? "Desmarcar" : "Marcar como estudiada") + ": " + title}>
        {completed ? "✓ Estudiada · Desmarcar" : "✓ Marcar como estudiada"}
      </button>
      {saved === false && <span role="status">No se pudo guardar en este dispositivo. La marca solo durará mientras permanezcas en esta página.</span>}
    </div>
  </section>;
}

export function LessonProgressOverview({ total }: { total: number }) {
  const [count, setCount] = useState<number | null>(null);
  useEffect(() => {
    const refresh = () => setCount(Math.min(total, Object.keys(readMarks()).length));
    const frame = window.requestAnimationFrame(refresh);
    window.addEventListener("storage", refresh);
    window.addEventListener(PROGRESS_EVENT, refresh);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("storage", refresh);
      window.removeEventListener(PROGRESS_EVENT, refresh);
    };
  }, [total]);

  return <aside className="lesson-progress-overview" aria-label="Mi avance en la biblioteca">
    <div>
      <span className="lesson-progress-kicker">Tu recorrido</span>
      <h2>Organiza las lecciones que vas estudiando.</h2>
      <p>{count === null ? "Consulta y marca los temas conforme avances." : count === 0 ? "Todavía no has marcado ninguna lección como estudiada." : "Has marcado " + count + " de " + total + " lecciones como estudiadas."}</p>
      <small>El progreso se guarda solo en este navegador, no se sincroniza entre dispositivos.</small>
    </div>
    <a href="/blog">Explorar lecciones <span aria-hidden="true">→</span></a>
  </aside>;
}
