/** Mapeo pedagógico compartido (server-safe). No importar componentes cliente aquí. */
export type FocusedLabKind = "segments" | "congruence" | "parallel" | "cryptarithm" |
  "square" | "sequence" | "expression" | "frequency";

export const FOCUSED_LABS: Record<string, FocusedLabKind> = {
  "nociones-basicas-de-geometria-1sec-unidad1": "segments",
  "congruencia-de-triangulos-1sec-unidad3": "congruence",
  "angulos-formados-por-2-rectas-paralelas-y-1-secante-1sec-unidad2": "parallel",
  "angulos-determinados-por-dos-rectas-paralelas-y-una-recta-secante-1sec-unidad2": "parallel",
  "criptoaritmetica-1sec-unidad2": "cryptarithm",
  "criptoaritmetica-1-1sec-unidad2": "cryptarithm",
  "criptoaritmetica-i-1sec-unidad2": "cryptarithm",
  "criptoaritmetica-ii-1sec-unidad3": "cryptarithm",
  "cuadrados-magicos-1sec-unidad3": "square",
  "secuencia-de-figuras-1sec-unidad1": "sequence",
  "psicotonico-secuencia-de-figuras-1sec-unidad1": "sequence",
  "expresion-algebraica-1sec-unidad1": "expression",
  "expresiones-algebraicas-1sec-unidad1": "expression",
  "tabla-de-dist-de-frec-para-datos-sin-agrupar-1sec-unidad2": "frequency",
  "tabla-de-distribucion-de-frecuencias-para-datos-sin-agrupar-1sec-unidad2": "frequency",
};

export function hasFocusedLessonLab(slug: string): boolean {
  return Object.prototype.hasOwnProperty.call(FOCUSED_LABS, slug);
}
