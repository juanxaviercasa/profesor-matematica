"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "zenit_lab_progress_v1";

export type LabProgress = Record<string, number>;

function readProgress(): LabProgress {
  if (typeof window === "undefined") return {};
  try {
    const parsed: unknown = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "{}");
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) return {};
    return Object.fromEntries(Object.entries(parsed).filter(([slug, value]) => typeof slug === "string" && Number.isInteger(value) && typeof value === "number" && value >= 0));
  } catch { return {}; }
}

export function trackLab(event: string, lab: string, detail?: string) {
  if (typeof window === "undefined") return;
  const target = window as Window & { dataLayer?: Record<string, unknown>[] };
  target.dataLayer = target.dataLayer || [];
  target.dataLayer.push({ event, lab, detail });
}

export function useLabProgress(slug: string, total: number) {
  const [completed, setCompleted] = useState(0);
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setCompleted(readProgress()[slug] || 0));
    return () => window.cancelAnimationFrame(frame);
  }, [slug]);
  const advance = (value: number) => {
    const next = Math.max(completed, Math.min(Math.max(0, total), value));
    setCompleted(next);
    const all = readProgress();
    all[slug] = next;
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(all)); } catch { /* El laboratorio sigue funcionando sin almacenamiento disponible. */ }
    window.dispatchEvent(new Event("zenit:lab-progress"));
    if (next !== completed) trackLab(next === total ? "lab_completed" : "lab_progress", slug, `${next}/${total}`);
  };
  return { completed, advance, percent: Math.round((completed / total) * 100) };
}

export function LabProgressBar({ completed, total }: { completed: number; total: number }) {
  const percent = total > 0 ? Math.round((Math.min(total, Math.max(0, completed)) / total) * 100) : 0;
  return <div className="lab-progress" role="progressbar" aria-label="Progreso del laboratorio" aria-valuemin={0} aria-valuemax={total} aria-valuenow={Math.min(total, Math.max(0, completed))} aria-valuetext={`${percent}% completado`}><div><span>Tu progreso</span><b>{completed}/{total} retos</b></div><i><span style={{ width: `${percent}%` }} /></i></div>;
}

export function useAllLabProgress() {
  const [progress, setProgress] = useState<LabProgress>({});
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setProgress(readProgress()));
    const refresh = () => setProgress(readProgress());
    window.addEventListener("storage", refresh);
    window.addEventListener("zenit:lab-progress", refresh);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("storage", refresh);
      window.removeEventListener("zenit:lab-progress", refresh);
    };
  }, []);
  return progress;
}
