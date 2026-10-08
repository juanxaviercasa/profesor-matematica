"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "zenit_lab_progress_v1";

export type LabProgress = Record<string, number>;

function readProgress(): LabProgress {
  if (typeof window === "undefined") return {};
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); } catch { return {}; }
}

export function trackLab(event: string, lab: string, detail?: string) {
  if (typeof window === "undefined") return;
  const target = window as Window & { dataLayer?: Record<string, unknown>[] };
  target.dataLayer = target.dataLayer || [];
  target.dataLayer.push({ event, lab, detail });
}

export function useLabProgress(slug: string, total: number) {
  const [completed, setCompleted] = useState(0);
  useEffect(() => setCompleted(readProgress()[slug] || 0), [slug]);
  const advance = (value: number) => {
    const next = Math.max(completed, Math.min(total, value));
    setCompleted(next);
    const all = readProgress();
    all[slug] = next;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    trackLab(next === total ? "lab_completed" : "lab_progress", slug, `${next}/${total}`);
  };
  return { completed, advance, percent: Math.round((completed / total) * 100) };
}

export function LabProgressBar({ completed, total }: { completed: number; total: number }) {
  const percent = Math.round((completed / total) * 100);
  return <div className="lab-progress" aria-label={`Progreso: ${percent}%`}><div><span>Tu progreso</span><b>{completed}/{total} retos</b></div><i><span style={{ width: `${percent}%` }} /></i></div>;
}

export function useAllLabProgress() {
  const [progress, setProgress] = useState<LabProgress>({});
  useEffect(() => {
    setProgress(readProgress());
    const refresh = () => setProgress(readProgress());
    window.addEventListener("storage", refresh);
    return () => window.removeEventListener("storage", refresh);
  }, []);
  return progress;
}
