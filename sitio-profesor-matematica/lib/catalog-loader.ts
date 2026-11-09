/* Este módulo se utiliza solo desde páginas de servidor. Evitar importarlo en componentes "use client". */
import lessonsFullRaw from "@/content/catalog/lessons-full.json";
import { type CatalogLessonFull } from "@/lib/catalog-index";
export * from "@/lib/catalog-index";
export const LESSONS_FULL: CatalogLessonFull[] = lessonsFullRaw as CatalogLessonFull[];

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

