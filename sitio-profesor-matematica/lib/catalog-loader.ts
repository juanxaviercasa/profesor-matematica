/* Este módulo se utiliza solo desde páginas de servidor. Evitar importarlo en componentes "use client". */
import lessonsFullRaw from "@/content/catalog/lessons-full.json";
import { resolveEditorialKeyFormula } from "@/lib/editorial-key-formulas.mjs";
import { type CatalogLessonFull } from "@/lib/catalog-index";
export * from "@/lib/catalog-index";
export const LESSONS_FULL: CatalogLessonFull[] = (lessonsFullRaw as CatalogLessonFull[]).map(lesson=>({ ...lesson, summary: /^Estudio completo de /i.test(lesson.summary) ? `Estudia ${lesson.title} con explicaciones claras, ejemplos y ejercicios para reforzar lo aprendido.` : lesson.summary, tags: lesson.tags.filter(tag => !/^(Libro del Área|Ficha Nivel Cero|Ficha Adicional|Generador Infinito)$/i.test(tag)), keyFormula:resolveEditorialKeyFormula(lesson) }));

const SLUG_MAP = new Map<string, CatalogLessonFull>();
for (const l of LESSONS_FULL) {
  SLUG_MAP.set(l.slug, l);
  if (!SLUG_MAP.has(l.baseSlug)) {
    SLUG_MAP.set(l.baseSlug, l);
  }
}

export function getLessonBySlug(slug: string): CatalogLessonFull | undefined {
  return SLUG_MAP.get(slug);
}

