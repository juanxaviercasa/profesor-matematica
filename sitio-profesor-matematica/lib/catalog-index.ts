import lessonsIndexRaw from "@/content/catalog/lessons-index.json";
import { resolveEditorialKeyFormula } from "@/lib/editorial-key-formulas.mjs";
import type { AppEngineId } from "@/components/zenit-app-engines";

export interface TheorySlide {
  slideNumber: number;
  heading: string;
  content: string[];
}

export interface ExtractedExercise {
  number: number;
  statement: string;
  options: string[];
  answerKey?: string;
  isOfficialKey?: boolean;
  hint?: string;
}

export interface WorkedSolution {
  number: number;
  level: string;
  steps: string[];
  answerKey: string;
}

export interface AreaBookBlock {
  page: number;
  heading: string;
  paragraphs: string[];
}

export interface SteamProject {
  type: string;
  title: string;
  summary: string;
}

export interface CatalogLessonIndex {
  id: string;
  slug: string;
  baseSlug: string;
  title: string;
  area: string;
  course: string;
  grade: number;
  gradeLabel: string;
  unit: string;
  difficulty: string;
  appEngine: AppEngineId;
  keyFormula: string;
  summary: string;
  tags: string[];
  onionLayer: number;
  publishStatus: "published" | "scheduled";
  scheduledDate: string;
  dripBatch: number;
  slidesCount: number;
  f0Count: number;
  faCount: number;
  workedCount?: number;
}

export interface CatalogLessonFull extends CatalogLessonIndex {
  theorySlides: TheorySlide[];
  areaBookBlocks?: AreaBookBlock[];
  steamProjects?: SteamProject[];
  exercisesF0: ExtractedExercise[];
  exercisesFA: ExtractedExercise[];
  workedSolutions?: WorkedSolution[];
  externalLinks: { label: string; url: string }[];
  sourceFiles: Record<string, string>;
  verticalProgressionSlugs?: string[];
}

export const LESSONS_INDEX: CatalogLessonIndex[] = (lessonsIndexRaw as CatalogLessonIndex[]).map(lesson=>({ ...lesson, keyFormula:resolveEditorialKeyFormula(lesson) }));
export function getLessonsByCourse(courseSlug: string): CatalogLessonIndex[] {
  return LESSONS_INDEX.filter(l => l.course === courseSlug);
}

export function getLessonsByGrade(grade: number): CatalogLessonIndex[] {
  return LESSONS_INDEX.filter(l => l.grade === grade);
}

export function getRelatedLessons(
  lesson: CatalogLessonIndex | CatalogLessonFull,
  limit = 6
): CatalogLessonIndex[] {
  const results: CatalogLessonIndex[] = [];
  const seenSlugs = new Set<string>([lesson.slug]);

  // 1. Vertical equivalents across other grades (same baseSlug)
  for (const item of LESSONS_INDEX) {
    if (item.baseSlug === lesson.baseSlug && !seenSlugs.has(item.slug)) {
      results.push(item);
      seenSlugs.add(item.slug);
      if (results.length >= 2) break;
    }
  }

  // 2. Same course topics
  for (const item of LESSONS_INDEX) {
    if (item.course === lesson.course && !seenSlugs.has(item.slug)) {
      results.push(item);
      seenSlugs.add(item.slug);
      if (results.length >= 4) break;
    }
  }

  // 3. Same interactive Web App engine (sharing mathematical tools)
  for (const item of LESSONS_INDEX) {
    if (item.appEngine === lesson.appEngine && !seenSlugs.has(item.slug)) {
      results.push(item);
      seenSlugs.add(item.slug);
      if (results.length >= limit) break;
    }
  }

  // 4. Fill with other high-relevance lessons if needed
  if (results.length < limit) {
    for (const item of LESSONS_INDEX) {
      if (!seenSlugs.has(item.slug)) {
        results.push(item);
        seenSlugs.add(item.slug);
        if (results.length >= limit) break;
      }
    }
  }

  return results.slice(0, limit);
}

export const AREA_LABELS: Record<string, { title: string; badge: string; description: string }> = {
  "matematica-preuniversitaria": {
    title: "Matemática Secundaria (1.° a 5.°) y Preuniversitaria",
    badge: "Secundaria y preparación preuniversitaria",
    description:
      "Estudia aritmética, álgebra, geometría, trigonometría, estadística y razonamiento matemático con explicaciones, ejemplos y ejercicios."
  },
  "matematica-universitaria": {
    title: "Matemática Universitaria (Ciencias e Ingeniería)",
    badge: "Cálculo · Álgebra Lineal · Ecuaciones Diferenciales",
    description:
      "Rigor formal, demostraciones analíticas y laboratorios interactivos para los primeros ciclos universitarios."
  },
  ciencias: {
    title: "Ciencias Exactas (Física y Química)",
    badge: "Física Clásica · Química General y Estequiometría",
    description:
      "Modelado físico-matemático de la naturaleza, cinemática vectorial, dinámica, estructura atómica y reacciones químicas."
  }
};

export const COURSE_LABELS: Record<string, { title: string; icon: string; area: string; desc: string }> = {
  aritmetica: {
    title: "Aritmética y Teoría de Números",
    icon: "ℕ",
    area: "matematica-preuniversitaria",
    desc: "Conjuntos, numeración, divisibilidad, primos, MCD/MCM, fracciones, magnitudes, porcentajes e interés."
  },
  algebra: {
    title: "Álgebra y Funciones",
    icon: "∑",
    area: "matematica-preuniversitaria",
    desc: "Expresiones algebraicas, polinomios, productos notables, división Ruffini-Horner, factorización, ecuaciones, inecuaciones, funciones y logaritmos."
  },
  geometria: {
    title: "Geometría Plana, del Espacio y Analítica",
    icon: "△",
    area: "matematica-preuniversitaria",
    desc: "Segmentos, ángulos, triángulos, congruencia, polígonos, circunferencia, semejanza, áreas, poliedros, sólidos de revolución y secciones cónicas."
  },
  trigonometria: {
    title: "Trigonometría y Sistemas Angulares",
    icon: "∡",
    area: "matematica-preuniversitaria",
    desc: "Ángulo trigonométrico, sector circular, razones trigonométricas, reducción al primer cuadrante, circunferencia trigonométrica, identidades y ecuaciones."
  },
  "estadistica-y-probabilidad": {
    title: "Estadística y Probabilidades",
    icon: "📊",
    area: "matematica-preuniversitaria",
    desc: "Tablas de distribución de frecuencias, gráficos estadísticos, medidas de tendencia central y dispersión, análisis combinatorio y probabilidades."
  },
  "razonamiento-matematico": {
    title: "Razonamiento Matemático y Lógico",
    icon: "🧠",
    area: "matematica-preuniversitaria",
    desc: "Situaciones lógicas, lógica proposicional, habilidad operativa, criptoaritmética, inducción, planteo de ecuaciones, edades, móviles, cronometría, conteo de figuras y certezas."
  },
  "calculo-1": {
    title: "Cálculo Diferencial (Cálculo I)",
    icon: "∂",
    area: "matematica-universitaria",
    desc: "Límites formales épsilon-delta, continuidad, derivada como límite, regla de la cadena, teoremas de Rolle/Lagrange, L'Hôpital y optimización."
  },
  "calculo-2": {
    title: "Cálculo Integral (Cálculo II)",
    icon: "∫",
    area: "matematica-universitaria",
    desc: "Sumas de Riemann, Teorema Fundamental del Cálculo, métodos de integración, volúmenes de revolución y series de Taylor."
  },
  "calculo-3": {
    title: "Cálculo Multivariable (Cálculo III)",
    icon: "∇",
    area: "matematica-universitaria",
    desc: "Derivadas parciales, vector gradiente, multiplicadores de Lagrange, integrales múltiples y análisis vectorial."
  },
  "algebra-lineal": {
    title: "Álgebra Lineal Universitaria",
    icon: "⊗",
    area: "matematica-universitaria",
    desc: "Espacios vectoriales, independencia lineal, transformaciones lineales, autovalores, autovectores y diagonalización."
  },
  "ecuaciones-diferenciales": {
    title: "Ecuaciones Diferenciales (EDO)",
    icon: "dy/dx",
    area: "matematica-universitaria",
    desc: "EDOs de primer orden y orden superior, sistemas dinámicos y Transformada de Laplace."
  },
  fisica: {
    title: "Física Clásica y Universitaria",
    icon: "⚡",
    area: "ciencias",
    desc: "Cinemática vectorial, dinámica de Newton, estática, trabajo y energía, movimiento armónico simple y electromagnetismo."
  },
  quimica: {
    title: "Química General y Estequiometría",
    icon: "🧪",
    area: "ciencias",
    desc: "Estructura atómica, números cuánticos, tabla periódica, enlace químico, balance redox, estequiometría, gases y equilibrio ácido-base."
  }
};
