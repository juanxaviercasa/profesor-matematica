"use client";

import React, { useState, useMemo } from "react";
import { MathFormula } from "./math-formula";
import { CartesianAxes } from "./cartesian-axes";
import { getOpenSourceEnginesByMacro, resolveOpenSourceEngineForLesson } from "@/lib/open-source-60-engines";

export type AppEngineId =
  | "SetVennLab"
  | "NumberTheoryLab"
  | "PolynomialAlgebraLab"
  | "EquationInequalityLab"
  | "FunctionCartesianLab"
  | "GeometryInteractiveLab"
  | "AnalyticConicsLab"
  | "TrigonometryCircleLab"
  | "StatisticsProbabilityLab"
  | "LogicalReasoningLab"
  | "CalculusAnalysisLab"
  | "SciencePhysicsChemLab";

export interface EngineMeta {
  id: AppEngineId;
  title: string;
  subtitle: string;
  badge: string;
  course: string;
  formula: string;
  description: string;
}

export const ZENIT_ENGINES: Record<AppEngineId, EngineMeta> = {
  SetVennLab: {
    id: "SetVennLab",
    title: "Simulador de Conjuntos y Diagramas de Venn-Euler",
    subtitle: "Operaciones entre conjuntos, regiones sombreadas, cardinalidad y conjunto potencia",
    badge: "Aritmética · Conjuntos",
    course: "aritmetica",
    formula: "n(A \\cup B) = n(A) + n(B) - n(A \\cap B)",
    description: "Explora visualmente la unión, intersección, diferencia, diferencia simétrica y complemento, resolviendo problemas de encuestas y cardinalidad en tiempo real."
  },
  NumberTheoryLab: {
    id: "NumberTheoryLab",
    title: "Laboratorio de Teoría de Números, Numeración y MCD/MCM",
    subtitle: "Descomposición canónica, divisores, cambio de base y algoritmo de Euclides",
    badge: "Aritmética · Números",
    course: "aritmetica",
    formula: "N = p_1^{\\alpha_1} p_2^{\\alpha_2}\\cdots p_k^{\\alpha_k}, \\quad CD(N) = \\prod(\\alpha_i + 1)",
    description: "Convierte números entre distintas bases paso a paso, factoriza en primos, calcula cantidad y suma de divisores, y halla el MCD y MCM instantáneamente."
  },
  PolynomialAlgebraLab: {
    id: "PolynomialAlgebraLab",
    title: "Polinomios: Ruffini, Horner y productos notables",
    subtitle: "Esquema interactivo de división sintética, teorema del resto y áreas algebraicas",
    badge: "Álgebra · Polinomios",
    course: "algebra",
    formula: "P(x) = (x - r)Q(x) + R, \\quad R = P(r)",
    description: "Ejecuta la división de polinomios mediante la Regla de Ruffini y el Teorema del Resto en vivo, y visualiza geométricamente las identidades de productos notables."
  },
  EquationInequalityLab: {
    id: "EquationInequalityLab",
    title: "Laboratorio de Ecuaciones, Puntos Críticos y Valor Absoluto",
    subtitle: "Curva de signos en la recta real, discriminante y relaciones de Cardano-Vieta",
    badge: "Álgebra · Ecuaciones e Inecuaciones",
    course: "algebra",
    formula: "ax^2 + bx + c = 0 \\implies \\Delta = b^2 - 4ac",
    description: "Analiza las raíces reales o complejas de ecuaciones cuadráticas y traza la curva de signos (+ / - / +) para resolver inecuaciones polinómicas y racionales."
  },
  FunctionCartesianLab: {
    id: "FunctionCartesianLab",
    title: "Estudio Analítico de Funciones, Logaritmos y Programación Lineal",
    subtitle: "Transformaciones gráficas, dominio, rango, vértice y optimización",
    badge: "Álgebra · Funciones",
    course: "algebra",
    formula: "g(x) = a\\cdot f(x - h) + k",
    description: "Manipula familias de funciones (cuadrática, valor absoluto, radical, exponencial, racional) observando el impacto directo en dominio, rango, monotonía y gráfica."
  },
  GeometryInteractiveLab: {
    id: "GeometryInteractiveLab",
    title: "Laboratorio de Geometría Plana, Polígonos y Sólidos 3D",
    subtitle: "Triángulos, polígonos regulares, relaciones métricas, áreas y volúmenes",
    badge: "Geometría · Plana y del Espacio",
    course: "geometria",
    formula: "\\sum \\angle_{\\text{int}} = 180^\\circ(n-2), \\quad D = \\frac{n(n-3)}{2}",
    description: "Experimenta con polígonos regulares de n lados, triángulos rectángulos notables y sólidos geométricos (prisma, cilindro, cono, esfera) calculando áreas y volúmenes."
  },
  AnalyticConicsLab: {
    id: "AnalyticConicsLab",
    title: "Simulador de Geometría Analítica y Secciones Cónicas",
    subtitle: "La recta, circunferencia, parábola, elipse, foco, directriz y excentricidad",
    badge: "Geometría Analítica",
    course: "geometria",
    formula: "(x - h)^2 = 4p(y - k), \\quad \\frac{(x-h)^2}{a^2} + \\frac{(y-k)^2}{b^2} = 1",
    description: "Visualiza lugares geométricos en el plano cartesiano: ajusta centro, parámetro focal y semiejes para observar vértices, focos, lado recto y directriz."
  },
  TrigonometryCircleLab: {
    id: "TrigonometryCircleLab",
    title: "Simulador de Circunferencia Trigonométrica y Sector Circular",
    subtitle: "Líneas trigonométricas en los 4 cuadrantes, sistemas angulares (S, C, R) y ondas",
    badge: "Trigonometría",
    course: "trigonometria",
    formula: "\\sin^2\\theta + \\cos^2\\theta = 1, \\quad L = \\theta R, \\quad S = \\frac{1}{2}\\theta R^2",
    description: "Recorre los 360° de la Circunferencia Trigonométrica observando seno, coseno y tangente con sus signos por cuadrante, más conversión S-C-R y sector circular."
  },
  StatisticsProbabilityLab: {
    id: "StatisticsProbabilityLab",
    title: "Laboratorio de Estadística, Frecuencias, Gráficos y Combinatoria",
    subtitle: "Tablas fi/Fi/hi%, media, mediana, varianza, permutaciones y probabilidades",
    badge: "Estadística y Probabilidad",
    course: "estadistica-y-probabilidad",
    formula: "\\bar{x} = \\frac{\\sum x_i f_i}{n}, \\quad C_k^n = \\frac{n!}{k!(n-k)!}",
    description: "Edita frecuencias en vivo para construir automáticamente la tabla estadística completa, el diagrama de barras, medidas de tendencia central y combinatoria."
  },
  LogicalReasoningLab: {
    id: "LogicalReasoningLab",
    title: "Simulador de Razonamiento Matemático y Lógico",
    subtitle: "Tablas de verdad, cronometría de relojes, conteo inductivo de figuras y certezas",
    badge: "Razonamiento Matemático",
    course: "razonamiento-matematico",
    formula: "\\theta = \\left|30H - \\frac{11}{2}M\\right|, \\quad T_n = \\frac{n(n+1)}{2}",
    description: "Herramienta multifunción para RM: reloj interactivo de ángulos entre manecillas, conteo inductivo de figuras, evaluador de tablas de verdad y certezas."
  },
  CalculusAnalysisLab: {
    id: "CalculusAnalysisLab",
    title: "Laboratorio Universitario de Cálculo: Límites, Derivadas e Integrales",
    subtitle: "Vecindades épsilon-delta, recta tangente móvil y particiones de Riemann",
    badge: "Matemática Universitaria · Cálculo",
    course: "calculo-1",
    formula: "f'(x) = \\lim_{h\\to 0}\\frac{f(x+h)-f(x)}{h}, \\quad \\int_a^b f(x)\\,dx = \\lim_{n\\to\\infty}\\sum_{i=1}^n f(x_i^*)\\Delta x",
    description: "Explora visualmente la pendiente de la recta tangente, la aproximación de áreas bajo la curva mediante sumas de Riemann y el control de error épsilon-delta."
  },
  SciencePhysicsChemLab: {
    id: "SciencePhysicsChemLab",
    title: "Simulador de Ciencias: Cinemática Parabólica y Estequiometría",
    subtitle: "Trayectoria de proyectiles, vectores de velocidad y balance de reacciones",
    badge: "Ciencias · Física y Química",
    course: "fisica",
    formula: "y(x) = x\\tan\\theta - \\frac{g x^2}{2 v_0^2 \\cos^2\\theta}, \\quad PV = nRT",
    description: "Simula el lanzamiento de proyectiles en 2D ajustando velocidad inicial, ángulo y gravedad, y calcula relaciones molares y reactivo limitante."
  }
};

/* ============================================================================
   1. SET VENN LAB
   ============================================================================ */
function SetVennLabWidget() {
  const [onlyA, setOnlyA] = useState(14);
  const [bothAB, setBothAB] = useState(8);
  const [onlyB, setOnlyB] = useState(11);
  const [outside, setOutside] = useState(7);
  const [operation, setOperation] = useState<"union" | "inter" | "diffAB" | "diffBA" | "sym" | "comp">("union");

  const nA = onlyA + bothAB;
  const nB = onlyB + bothAB;
  const nU = onlyA + bothAB + onlyB + outside;

  const opResult = useMemo(() => {
    switch (operation) {
      case "union":
        return { label: "A ∪ B (Unión)", value: onlyA + bothAB + onlyB, desc: "Elementos que pertenecen a A, a B o a ambos conjuntos." };
      case "inter":
        return { label: "A ∩ B (Intersección)", value: bothAB, desc: "Elementos comunes que pertenecen simultáneamente a A y a B." };
      case "diffAB":
        return { label: "A − B (Solo A)", value: onlyA, desc: "Elementos que pertenecen exclusivamente a A pero NO a B." };
      case "diffBA":
        return { label: "B − A (Solo B)", value: onlyB, desc: "Elementos que pertenecen exclusivamente a B pero NO a A." };
      case "sym":
        return { label: "A Δ B (Diferencia Simétrica)", value: onlyA + onlyB, desc: "Elementos que pertenecen a uno solo de los conjuntos, pero no a ambos." };
      case "comp":
        return { label: "(A ∪ B)' (Complemento)", value: outside, desc: "Elementos del universo U que no pertenecen ni a A ni a B." };
    }
  }, [operation, onlyA, bothAB, onlyB, outside]);

  const highlightLeft = ["union", "diffAB", "sym"].includes(operation);
  const highlightCenter = ["union", "inter"].includes(operation);
  const highlightRight = ["union", "diffBA", "sym"].includes(operation);
  const highlightOut = operation === "comp";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
      <div className="lg:col-span-5 space-y-4">
        <div className="flex flex-wrap gap-1.5">
          {[
            { id: "union", txt: "A ∪ B" },
            { id: "inter", txt: "A ∩ B" },
            { id: "diffAB", txt: "A − B" },
            { id: "diffBA", txt: "B − A" },
            { id: "sym", txt: "A Δ B" },
            { id: "comp", txt: "(A ∪ B)'" },
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setOperation(btn.id as typeof operation)}
              aria-pressed={operation === btn.id}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold border transition-all ${
                operation === btn.id
                  ? "bg-emerald-500 text-stone-950 border-emerald-400 shadow"
                  : "bg-stone-900 text-stone-300 border-stone-700 hover:border-emerald-500/50"
              }`}
            >
              {btn.txt}
            </button>
          ))}
        </div>

        <div className="space-y-3 rounded-xl bg-stone-950/70 p-4 border border-stone-800">
          <div>
            <div className="flex justify-between text-xs text-stone-300">
              <span>Solo A: n(A − B)</span>
              <b className="text-emerald-400 font-mono">{onlyA}</b>
            </div>
            <input aria-label="Elementos solo en A" type="range" min={0} max={40} value={onlyA} onChange={e => setOnlyA(+e.target.value)} className="w-full accent-emerald-500" />
          </div>
          <div>
            <div className="flex justify-between text-xs text-stone-300">
              <span>Ambos: n(A ∩ B)</span>
              <b className="text-amber-400 font-mono">{bothAB}</b>
            </div>
            <input aria-label="Elementos en la intersección de A y B" type="range" min={0} max={30} value={bothAB} onChange={e => setBothAB(+e.target.value)} className="w-full accent-amber-500" />
          </div>
          <div>
            <div className="flex justify-between text-xs text-stone-300">
              <span>Solo B: n(B − A)</span>
              <b className="text-sky-400 font-mono">{onlyB}</b>
            </div>
            <input aria-label="Elementos solo en B" type="range" min={0} max={40} value={onlyB} onChange={e => setOnlyB(+e.target.value)} className="w-full accent-sky-500" />
          </div>
          <div>
            <div className="flex justify-between text-xs text-stone-300">
              <span>Fuera de ambos: n((A ∪ B)&apos;)</span>
              <b className="text-stone-400 font-mono">{outside}</b>
            </div>
            <input aria-label="Elementos fuera de A y B" type="range" min={0} max={30} value={outside} onChange={e => setOutside(+e.target.value)} className="w-full accent-stone-400" />
          </div>
        </div>

        <div className="rounded-xl bg-emerald-950/30 border border-emerald-800/40 p-3.5 text-xs space-y-1">
          <div className="font-bold text-emerald-300 text-sm">{opResult.label} = {opResult.value} elementos</div>
          <p className="text-stone-300">{opResult.desc}</p>
          <p className="text-stone-400 font-mono pt-1">
            |U| = {nU} · |A| = {nA} · |B| = {nB} · Subconjuntos de A: 2^{Math.min(nA, 15)} = {Math.pow(2, Math.min(nA, 15)).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="lg:col-span-7 flex flex-col items-center justify-center rounded-xl bg-stone-950 p-4 border border-stone-800">
        <svg role="img" aria-label="Diagrama de Venn interactivo de los conjuntos A y B" viewBox="0 0 420 260" className="w-full max-h-[270px]">
          <rect
            x="12"
            y="12"
            width="396"
            height="236"
            rx="16"
            fill={highlightOut ? "rgba(16, 185, 129, 0.22)" : "#0c0a09"}
            stroke="#44403c"
            strokeWidth="2"
          />
          <text x="26" y="34" fill="#a8a29e" fontSize="13" fontWeight="bold">U = {nU}</text>
          {/* Circle A */}
          <circle
            cx="165"
            cy="130"
            r="78"
            fill={highlightLeft ? "rgba(16, 185, 129, 0.35)" : "rgba(41, 37, 36, 0.5)"}
            stroke="#10b981"
            strokeWidth="2.5"
          />
          {/* Circle B */}
          <circle
            cx="255"
            cy="130"
            r="78"
            fill={highlightRight ? "rgba(56, 189, 248, 0.35)" : "rgba(41, 37, 36, 0.5)"}
            stroke="#38bdf8"
            strokeWidth="2.5"
          />
          {/* Intersection badge */}
          <rect
            x="190"
            y="108"
            width="40"
            height="44"
            rx="10"
            fill={highlightCenter ? "#f59e0b" : "#1c1917"}
            stroke="#f59e0b"
            strokeWidth="2"
          />
          <text x="120" y="75" fill="#10b981" fontSize="13" fontWeight="bold">A ({nA})</text>
          <text x="275" y="75" fill="#38bdf8" fontSize="13" fontWeight="bold">B ({nB})</text>

          <text x="128" y="136" fill="#ffffff" fontSize="20" fontWeight="bold" textAnchor="middle">{onlyA}</text>
          <text x="210" y="136" fill={highlightCenter ? "#0c0a09" : "#fbbf24"} fontSize="20" fontWeight="bold" textAnchor="middle">{bothAB}</text>
          <text x="292" y="136" fill="#ffffff" fontSize="20" fontWeight="bold" textAnchor="middle">{onlyB}</text>
          <text x="365" y="225" fill="#a8a29e" fontSize="15" fontWeight="bold" textAnchor="end">Fuera: {outside}</text>
        </svg>
      </div>
    </div>
  );
}

/* ============================================================================
   2. NUMBER THEORY LAB
   ============================================================================ */
function NumberTheoryLabWidget() {
  const [numA, setNumA] = useState(360);
  const [numB, setNumB] = useState(150);
  const [base, setBase] = useState(5);

  const analysis = useMemo(() => {
    const n = Math.max(2, Math.min(99999, Math.floor(numA)));
    const m = Math.max(2, Math.min(99999, Math.floor(numB)));

    // Prime factorization of n
    let temp = n;
    const factors: Record<number, number> = {};
    for (let d = 2; d * d <= temp; d++) {
      while (temp % d === 0) {
        factors[d] = (factors[d] || 0) + 1;
        temp /= d;
      }
    }
    if (temp > 1) factors[temp] = (factors[temp] || 0) + 1;

    let cd = 1;
    let sd = 1;
    const factorParts: string[] = [];
    for (const [pStr, exp] of Object.entries(factors)) {
      const p = Number(pStr);
      cd *= exp + 1;
      sd *= (Math.pow(p, exp + 1) - 1) / (p - 1);
      factorParts.push(exp > 1 ? `${p}^${exp}` : `${p}`);
    }

    // GCD & LCM
    let a = n, b = m;
    const euclidSteps: string[] = [];
    while (b !== 0) {
      const q = Math.floor(a / b);
      const r = a % b;
      euclidSteps.push(`${a} = ${b} × ${q} + ${r}`);
      a = b;
      b = r;
    }
    const gcd = a;
    const lcm = (n * m) / gcd;

    // Base conversion of n to base
    let tBase = n;
    const digits: string[] = [];
    const symbols = "0123456789ABCDEF";
    while (tBase > 0) {
      digits.unshift(symbols[tBase % base]);
      tBase = Math.floor(tBase / base);
    }

    return {
      n,
      m,
      canonical: factorParts.join(" · "),
      cd,
      sd: Math.round(sd),
      gcd,
      lcm,
      euclidSteps: euclidSteps.slice(0, 5),
      inBase: digits.join("") || "0",
    };
  }, [numA, numB, base]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      <div className="lg:col-span-5 space-y-4">
        <div className="rounded-xl bg-stone-950/70 p-4 border border-stone-800 space-y-3">
          <div>
            <label className="text-xs text-stone-300 flex justify-between mb-1">
              <span>Número Principal (N):</span>
              <span className="font-mono text-emerald-400 font-bold">{analysis.n}</span>
            </label>
            <input aria-label="Número principal N"
              type="number"
              min={2}
              max={99999}
              value={numA}
              onChange={e => setNumA(+e.target.value || 2)}
              className="w-full rounded-lg bg-stone-900 border border-stone-700 px-3 py-1.5 text-sm text-white font-mono"
            />
          </div>
          <div>
            <label className="text-xs text-stone-300 flex justify-between mb-1">
              <span>Segundo Número (M) para MCD/MCM:</span>
              <span className="font-mono text-amber-400 font-bold">{analysis.m}</span>
            </label>
            <input aria-label="Segundo número M"
              type="number"
              min={2}
              max={99999}
              value={numB}
              onChange={e => setNumB(+e.target.value || 2)}
              className="w-full rounded-lg bg-stone-900 border border-stone-700 px-3 py-1.5 text-sm text-white font-mono"
            />
          </div>
          <div>
            <label className="text-xs text-stone-300 flex justify-between mb-1">
              <span>Base de Numeración Destino (b):</span>
              <span className="font-mono text-sky-400 font-bold">Base {base}</span>
            </label>
            <input aria-label="Base de numeración destino"
              type="range"
              min={2}
              max={16}
              value={base}
              onChange={e => setBase(+e.target.value)}
              className="w-full accent-sky-500"
            />
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-xl bg-stone-950 p-4 border border-stone-800 space-y-2">
          <span className="text-[11px] font-mono uppercase text-emerald-400">Descomposición Canónica</span>
          <div className="text-lg font-bold text-white font-mono">{analysis.n} = {analysis.canonical}</div>
          <div className="text-xs text-stone-300 space-y-1 pt-2 border-t border-stone-800">
            <div>Cantidad de Divisores: <b className="text-emerald-300">CD({analysis.n}) = {analysis.cd}</b></div>
            <div>Suma de Divisores: <b className="text-emerald-300">SD({analysis.n}) = {analysis.sd.toLocaleString()}</b></div>
          </div>
        </div>

        <div className="rounded-xl bg-stone-950 p-4 border border-stone-800 space-y-2">
          <span className="text-[11px] font-mono uppercase text-sky-400">Cambio de Base</span>
          <div className="text-lg font-bold text-white font-mono">
            {analysis.n} = {analysis.inBase}_{`(${base})`}
          </div>
          <p className="text-xs text-stone-400 pt-2 border-t border-stone-800">
            Obtenido por divisiones sucesivas entre {base} tomando el último cociente y los residuos en orden inverso.
          </p>
        </div>

        <div className="sm:col-span-2 rounded-xl bg-stone-950 p-4 border border-stone-800 space-y-2">
          <div className="flex flex-wrap justify-between gap-2">
            <span className="text-xs font-mono text-amber-400 font-bold">MCD({analysis.n}; {analysis.m}) = {analysis.gcd}</span>
            <span className="text-xs font-mono text-emerald-400 font-bold">MCM({analysis.n}; {analysis.m}) = {analysis.lcm.toLocaleString()}</span>
          </div>
          <div className="text-xs text-stone-400 font-mono bg-stone-900/80 p-2.5 rounded-lg border border-stone-800">
            Algoritmo de Euclides: {analysis.euclidSteps.join("  →  ")}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   3. POLYNOMIAL & RUFFINI LAB
   ============================================================================ */
function PolynomialAlgebraLabWidget() {
  // P(x) = a3 x^3 + a2 x^2 + a1 x + a0 divided by (x - r)
  const [a3, setA3] = useState(2);
  const [a2, setA2] = useState(-5);
  const [a1, setA1] = useState(4);
  const [a0, setA0] = useState(-3);
  const [rootR, setRootR] = useState(2);

  // Ruffini calculation
  const c2 = a3;
  const m2 = c2 * rootR;
  const c1 = a2 + m2;
  const m1 = c1 * rootR;
  const c0 = a1 + m1;
  const m0 = c0 * rootR;
  const rem = a0 + m0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
      <div className="lg:col-span-5 space-y-3 rounded-xl bg-stone-950/70 p-4 border border-stone-800">
        <div className="text-xs font-bold text-emerald-400 uppercase font-mono">
          Dividendo P(x) = {a3}x³ {a2 >= 0 ? `+ ${a2}` : a2}x² {a1 >= 0 ? `+ ${a1}` : a1}x {a0 >= 0 ? `+ ${a0}` : a0}
        </div>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <label className="space-y-1">
            <span className="text-stone-400">Coef. x³ (a₃): {a3}</span>
            <input aria-label="Coeficiente cúbico de x" type="range" min={-5} max={5} value={a3} onChange={e => setA3(+e.target.value || 1)} className="w-full accent-emerald-500" />
          </label>
          <label className="space-y-1">
            <span className="text-stone-400">Coef. x² (a₂): {a2}</span>
            <input aria-label="Coeficiente cuadrático de x" type="range" min={-9} max={9} value={a2} onChange={e => setA2(+e.target.value)} className="w-full accent-emerald-500" />
          </label>
          <label className="space-y-1">
            <span className="text-stone-400">Coef. x (a₁): {a1}</span>
            <input aria-label="Coeficiente lineal de x" type="range" min={-9} max={9} value={a1} onChange={e => setA1(+e.target.value)} className="w-full accent-emerald-500" />
          </label>
          <label className="space-y-1">
            <span className="text-stone-400">T. Indep. (a₀): {a0}</span>
            <input aria-label="Término independiente" type="range" min={-9} max={9} value={a0} onChange={e => setA0(+e.target.value)} className="w-full accent-emerald-500" />
          </label>
        </div>
        <div className="pt-2 border-t border-stone-800">
          <label className="text-xs text-amber-300 font-bold flex justify-between">
            <span>Divisor d(x) = x − ({rootR})</span>
            <span>x = {rootR}</span>
          </label>
          <input aria-label="Raíz del divisor para Ruffini" type="range" min={-4} max={4} value={rootR} onChange={e => setRootR(+e.target.value)} className="w-full accent-amber-500 mt-1" />
        </div>
      </div>

      <div className="lg:col-span-7 rounded-xl bg-stone-950 p-5 border border-stone-800 space-y-4">
        <div className="text-xs font-mono uppercase text-stone-400">Esquema Interactivo de la Regla de Ruffini</div>
        <div className="overflow-x-auto">
          <table className="w-full text-center font-mono text-sm border-collapse">
            <thead>
              <tr className="text-xs text-stone-500 border-b border-stone-800">
                <th className="p-2 border-r border-stone-700">Divisor</th>
                <th className="p-2">x³</th>
                <th className="p-2">x²</th>
                <th className="p-2">x¹</th>
                <th className="p-2 border-l border-dashed border-stone-700">x⁰</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-stone-200">
                <td className="p-2 border-r border-stone-700"></td>
                <td className="p-2 font-bold">{a3}</td>
                <td className="p-2 font-bold">{a2}</td>
                <td className="p-2 font-bold">{a1}</td>
                <td className="p-2 font-bold border-l border-dashed border-stone-700">{a0}</td>
              </tr>
              <tr className="text-amber-400 border-b-2 border-emerald-600/60">
                <td className="p-2 border-r border-stone-700 font-bold bg-amber-950/30">x = {rootR}</td>
                <td className="p-2 text-stone-600">↓</td>
                <td className="p-2">{m2 >= 0 ? `+${m2}` : m2}</td>
                <td className="p-2">{m1 >= 0 ? `+${m1}` : m1}</td>
                <td className="p-2 border-l border-dashed border-stone-700">{m0 >= 0 ? `+${m0}` : m0}</td>
              </tr>
              <tr className="bg-stone-900/70">
                <td className="p-2 border-r border-stone-700 text-xs text-stone-400">Resultado</td>
                <td className="p-2 text-emerald-400 font-bold">{c2}</td>
                <td className="p-2 text-emerald-400 font-bold">{c1}</td>
                <td className="p-2 text-emerald-400 font-bold">{c0}</td>
                <td className="p-2 border-l border-dashed border-stone-700 text-amber-300 font-extrabold bg-amber-950/40">{rem}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2">
          <div className="rounded-lg bg-emerald-950/30 border border-emerald-800/50 p-3">
            <span className="text-stone-400 block">Cociente Q(x):</span>
            <strong className="text-emerald-300 font-mono text-sm">
              {c2}x² {c1 >= 0 ? `+ ${c1}` : c1}x {c0 >= 0 ? `+ ${c0}` : c0}
            </strong>
          </div>
          <div className="rounded-lg bg-amber-950/30 border border-amber-800/50 p-3">
            <span className="text-stone-400 block">Teorema del Resto R = P({rootR}):</span>
            <strong className="text-amber-300 font-mono text-sm">
              Residuo = {rem} {rem === 0 ? "(¡División Exacta / Raíz!)" : ""}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   4. EQUATION & INEQUALITY CRITICAL POINTS LAB
   ============================================================================ */
function EquationInequalityLabWidget() {
  const [r1, setR1] = useState(-3);
  const [r2, setR2] = useState(2);
  const [ineqSign, setIneqSign] = useState<"ge" | "le">("ge");

  const minR = Math.min(r1, r2);
  const maxR = Math.max(r1, r2);
  const sumRoots = minR + maxR;
  const prodRoots = minR * maxR;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
      <div className="lg:col-span-5 space-y-4 rounded-xl bg-stone-950/70 p-4 border border-stone-800">
        <div className="flex gap-2">
          <button
            onClick={() => setIneqSign("ge")}
            aria-pressed={ineqSign === "ge"}
            className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-bold border ${
              ineqSign === "ge" ? "bg-emerald-500 text-stone-950 border-emerald-400" : "bg-stone-900 text-stone-300 border-stone-700"
            }`}
          >
            (x − r₁)(x − r₂) ≥ 0
          </button>
          <button
            onClick={() => setIneqSign("le")}
            aria-pressed={ineqSign === "le"}
            className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-bold border ${
              ineqSign === "le" ? "bg-amber-500 text-stone-950 border-amber-400" : "bg-stone-900 text-stone-300 border-stone-700"
            }`}
          >
            (x − r₁)(x − r₂) ≤ 0
          </button>
        </div>

        <div>
          <label className="text-xs text-stone-300 flex justify-between">
            <span>Punto Crítico 1 (x₁):</span>
            <b className="text-emerald-400 font-mono">{r1}</b>
          </label>
          <input aria-label="Primer punto crítico" type="range" min={-6} max={5} value={r1} onChange={e => setR1(+e.target.value)} className="w-full accent-emerald-500" />
        </div>
        <div>
          <label className="text-xs text-stone-300 flex justify-between">
            <span>Punto Crítico 2 (x₂):</span>
            <b className="text-amber-400 font-mono">{r2}</b>
          </label>
          <input aria-label="Segundo punto crítico" type="range" min={-5} max={6} value={r2} onChange={e => setR2(+e.target.value)} className="w-full accent-amber-500" />
        </div>

        <div className="rounded-lg bg-stone-900 p-3 border border-stone-800 text-xs space-y-1">
          <div className="font-mono text-stone-200">
            Forma expandida: x² {-sumRoots >= 0 ? `+ ${-sumRoots}` : -sumRoots}x {prodRoots >= 0 ? `+ ${prodRoots}` : prodRoots} {ineqSign === "ge" ? "≥" : "≤"} 0
          </div>
          <div className="text-emerald-400 font-bold font-mono">
            C.S. = {ineqSign === "ge" ? `⟨−∞; ${minR}] ∪ [${maxR}; +∞⟩` : `[${minR}; ${maxR}]`}
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 rounded-xl bg-stone-950 p-4 border border-stone-800 flex flex-col items-center">
        <svg role="img" aria-label="Recta real con curva de signos de una inecuación" viewBox="0 0 420 210" className="w-full max-h-[220px]">
          {/* Real number line */}
          <line x1="20" y1="130" x2="400" y2="130" stroke="#78716c" strokeWidth="2.5" />
          {/* Sign curve waves */}
          <path
            d="M 25 130 Q 80 45 140 130 Q 210 205 280 130 Q 340 45 395 130"
            fill="none"
            stroke="#10b981"
            strokeWidth="3"
          />
          {/* Shaded regions */}
          {ineqSign === "ge" ? (
            <>
              <rect x="25" y="75" width="115" height="55" fill="rgba(16, 185, 129, 0.2)" />
              <rect x="280" y="75" width="115" height="55" fill="rgba(16, 185, 129, 0.2)" />
            </>
          ) : (
            <rect x="140" y="130" width="140" height="55" fill="rgba(245, 158, 11, 0.25)" />
          )}
          <text x="82" y="95" fill="#10b981" fontSize="22" fontWeight="bold" textAnchor="middle">+</text>
          <text x="210" y="168" fill="#f59e0b" fontSize="22" fontWeight="bold" textAnchor="middle">−</text>
          <text x="338" y="95" fill="#10b981" fontSize="22" fontWeight="bold" textAnchor="middle">+</text>

          <circle cx="140" cy="130" r="6" fill="#10b981" stroke="#fff" strokeWidth="2" />
          <circle cx="280" cy="130" r="6" fill="#10b981" stroke="#fff" strokeWidth="2" />
          <text x="140" y="155" fill="#fff" fontSize="13" fontWeight="bold" textAnchor="middle">{minR}</text>
          <text x="280" y="155" fill="#fff" fontSize="13" fontWeight="bold" textAnchor="middle">{maxR}</text>
        </svg>
        <p className="text-xs text-stone-400">
          Método de los Puntos Críticos: de derecha a izquierda los signos se alternan (+ , − , +).
        </p>
      </div>
    </div>
  );
}

/* ============================================================================
   5. GEOMETRY & POLYGONS / 3D SOLIDS LAB
   ============================================================================ */
function GeometryInteractiveLabWidget() {
  const [sides, setSides] = useState(6);
  const [radius, setRadius] = useState(4);
  const [height3D, setHeight3D] = useState(6);

  const sumInt = 180 * (sides - 2);
  const eachInt = sumInt / sides;
  const diagonals = (sides * (sides - 3)) / 2;
  const cylinderVol = Math.PI * radius * radius * height3D;
  const coneVol = cylinderVol / 3;

  const polygonPoints = useMemo(() => {
    const pts: string[] = [];
    const cx = 210, cy = 125, r = 82;
    for (let i = 0; i < sides; i++) {
      const ang = (2 * Math.PI * i) / sides - Math.PI / 2;
      pts.push(`${(cx + r * Math.cos(ang)).toFixed(1)},${(cy + r * Math.sin(ang)).toFixed(1)}`);
    }
    return pts.join(" ");
  }, [sides]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
      <div className="lg:col-span-5 space-y-4 rounded-xl bg-stone-950/70 p-4 border border-stone-800">
        <div>
          <label className="text-xs text-stone-300 flex justify-between">
            <span>Número de lados del Polígono (n):</span>
            <b className="text-emerald-400 font-mono">{sides} lados</b>
          </label>
          <input aria-label="Número de lados del polígono" type="range" min={3} max={12} value={sides} onChange={e => setSides(+e.target.value)} className="w-full accent-emerald-500" />
        </div>
        <div>
          <label className="text-xs text-stone-300 flex justify-between">
            <span>Radio geométrico (R):</span>
            <b className="text-sky-400 font-mono">{radius} u</b>
          </label>
          <input aria-label="Radio geométrico" type="range" min={1} max={10} value={radius} onChange={e => setRadius(+e.target.value)} className="w-full accent-sky-500" />
        </div>
        <div>
          <label className="text-xs text-stone-300 flex justify-between">
            <span>Altura para Sólido 3D (h):</span>
            <b className="text-amber-400 font-mono">{height3D} u</b>
          </label>
          <input aria-label="Altura del sólido tridimensional" type="range" min={1} max={12} value={height3D} onChange={e => setHeight3D(+e.target.value)} className="w-full accent-amber-500" />
        </div>

        <div className="rounded-lg bg-stone-900 p-3 border border-stone-800 text-xs space-y-1.5">
          <div>Suma de ∠ Internos: <b className="text-emerald-300 font-mono">{sumInt}°</b> (Cada ∠ = {eachInt.toFixed(1)}°)</div>
          <div>Total de Diagonales: <b className="text-amber-300 font-mono">D = {diagonals}</b></div>
          <div>Volumen Cilindro / Cono: <b className="text-sky-300 font-mono">{cylinderVol.toFixed(1)} u³ / {coneVol.toFixed(1)} u³</b></div>
        </div>
      </div>

      <div className="lg:col-span-7 rounded-xl bg-stone-950 p-4 border border-stone-800 flex flex-col items-center">
        <svg role="img" aria-label="Polígono geométrico regular con radio ajustable" viewBox="0 0 420 250" className="w-full max-h-[250px]">
          <circle cx="210" cy="125" r="82" fill="none" stroke="#44403c" strokeDasharray="4 4" />
          <polygon
            points={polygonPoints}
            fill="rgba(16, 185, 129, 0.2)"
            stroke="#10b981"
            strokeWidth="3"
          />
          <circle cx="210" cy="125" r="4" fill="#f59e0b" />
          <text x="210" y="232" fill="#d6d3d1" fontSize="13" textAnchor="middle">
            Polígono Regular de {sides} lados · {diagonals} diagonales
          </text>
        </svg>
      </div>
    </div>
  );
}

/* ============================================================================
   6. TRIGONOMETRY UNIT CIRCLE & SECTOR LAB
   ============================================================================ */
function TrigonometryCircleLabWidget() {
  const [deg, setDeg] = useState(45);
  const rad = (deg * Math.PI) / 180;
  const cent = (deg * 10) / 9;
  const sinV = Math.sin(rad);
  const cosV = Math.cos(rad);
  const tanV = Math.abs(cosV) > 0.001 ? sinV / cosV : Infinity;

  const cx = 210, cy = 125, r = 85;
  const px = cx + r * cosV;
  const py = cy - r * sinV;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
      <div className="lg:col-span-5 space-y-4 rounded-xl bg-stone-950/70 p-4 border border-stone-800">
        <div>
          <label className="text-xs text-stone-300 flex justify-between">
            <span>Ángulo en Posición Normal (θ):</span>
            <b className="text-emerald-400 font-mono">{deg}°</b>
          </label>
          <input aria-label="Ángulo en posición normal en grados" type="range" min={0} max={360} step={5} value={deg} onChange={e => setDeg(+e.target.value)} className="w-full accent-emerald-500" />
        </div>

        <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
          <div className="rounded-lg bg-stone-900 p-2 border border-stone-800">
            <span className="text-[10px] text-stone-400 block">Sexagesimal</span>
            <b className="text-white">{deg}°</b>
          </div>
          <div className="rounded-lg bg-stone-900 p-2 border border-stone-800">
            <span className="text-[10px] text-stone-400 block">Centesimal</span>
            <b className="text-amber-300">{cent.toFixed(1)}g</b>
          </div>
          <div className="rounded-lg bg-stone-900 p-2 border border-stone-800">
            <span className="text-[10px] text-stone-400 block">Radial</span>
            <b className="text-sky-300">{(deg / 180).toFixed(2)}π rad</b>
          </div>
        </div>

        <div className="rounded-lg bg-stone-900 p-3 border border-stone-800 text-xs font-mono space-y-1">
          <div className="text-emerald-400">sen({deg}°) = {sinV.toFixed(3)}</div>
          <div className="text-sky-400">cos({deg}°) = {cosV.toFixed(3)}</div>
          <div className="text-amber-400">tan({deg}°) = {Math.abs(tanV) > 99 ? "No definido (∞)" : tanV.toFixed(3)}</div>
          <div className="text-stone-400 pt-1">Identidad Pitagórica: sen²θ + cos²θ = {(sinV * sinV + cosV * cosV).toFixed(2)}</div>
        </div>
      </div>

      <div className="lg:col-span-7 rounded-xl bg-stone-950 p-4 border border-stone-800 flex flex-col items-center">
        <svg role="img" aria-label="Circunferencia trigonométrica y proyecciones de seno y coseno" viewBox="0 0 420 250" className="w-full max-h-[250px]">
          <line x1="30" y1={cy} x2="390" y2={cy} stroke="#57534e" strokeWidth="1.5" />
          <line x1={cx} y1="15" x2={cx} y2="235" stroke="#57534e" strokeWidth="1.5" />
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#a8a29e" strokeWidth="2" />
          {/* Cosine projection */}
          <line x1={cx} y1={cy} x2={px} y2={cy} stroke="#38bdf8" strokeWidth="4" />
          {/* Sine projection */}
          <line x1={px} y1={cy} x2={px} y2={py} stroke="#10b981" strokeWidth="4" />
          {/* Radius vector */}
          <line x1={cx} y1={cy} x2={px} y2={py} stroke="#f59e0b" strokeWidth="2.5" />
          <circle cx={px} cy={py} r="6" fill="#f59e0b" stroke="#0c0a09" strokeWidth="2" />
          <text x="35" y="30" fill="#10b981" fontSize="12" fontWeight="bold">Línea Seno (vertical)</text>
          <text x="35" y="48" fill="#38bdf8" fontSize="12" fontWeight="bold">Línea Coseno (horizontal)</text>
        </svg>
      </div>
    </div>
  );
}

/* ============================================================================
   7. STATISTICS & PROBABILITY LAB
   ============================================================================ */
function StatisticsProbabilityLabWidget() {
  const [f1, setF1] = useState(6);
  const [f2, setF2] = useState(12);
  const [f3, setF3] = useState(18);
  const [f4, setF4] = useState(9);
  const [f5, setF5] = useState(5);

  const values = [10, 20, 30, 40, 50];
  const freqs = [f1, f2, f3, f4, f5];
  const totalN = freqs.reduce((a, b) => a + b, 0) || 1;
  const mean = freqs.reduce((acc, f, idx) => acc + f * values[idx], 0) / totalN;
  const variance = freqs.reduce((acc, f, idx) => acc + f * Math.pow(values[idx] - mean, 2), 0) / totalN;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
      <div className="lg:col-span-5 space-y-3 rounded-xl bg-stone-950/70 p-4 border border-stone-800">
        <div className="text-xs font-bold text-emerald-400 uppercase font-mono">Frecuencias Absolutas (fᵢ)</div>
        {[
          { label: "Marca x₁ = 10", val: f1, set: setF1 },
          { label: "Marca x₂ = 20", val: f2, set: setF2 },
          { label: "Marca x₃ = 30", val: f3, set: setF3 },
          { label: "Marca x₄ = 40", val: f4, set: setF4 },
          { label: "Marca x₅ = 50", val: f5, set: setF5 },
        ].map((row, idx) => (
          <div key={idx}>
            <div className="flex justify-between text-xs text-stone-300">
              <span>{row.label}</span>
              <span className="font-mono text-emerald-400">f_{idx + 1} = {row.val} ({((row.val / totalN) * 100).toFixed(1)}%)</span>
            </div>
            <input aria-label={`${row.label}: frecuencia absoluta`} type="range" min={1} max={30} value={row.val} onChange={e => row.set(+e.target.value)} className="w-full accent-emerald-500" />
          </div>
        ))}
        <div className="rounded-lg bg-stone-900 p-3 border border-stone-800 text-xs font-mono space-y-1">
          <div>Muestra Total: <b className="text-white">n = {totalN} datos</b></div>
          <div>Media Aritmética: <b className="text-emerald-400">x̄ = {mean.toFixed(2)}</b></div>
          <div>Desviación Estándar: <b className="text-amber-400">σ = {Math.sqrt(variance).toFixed(2)}</b></div>
        </div>
      </div>

      <div className="lg:col-span-7 rounded-xl bg-stone-950 p-4 border border-stone-800">
        <svg role="img" aria-label="Gráfico de barras de frecuencias" viewBox="0 0 420 230" className="w-full max-h-[230px]">
          <line x1="40" y1="195" x2="390" y2="195" stroke="#78716c" strokeWidth="2" />
          {freqs.map((f, idx) => {
            const bh = (f / 30) * 150;
            const bx = 65 + idx * 65;
            const by = 195 - bh;
            return (
              <g key={idx}>
                <rect x={bx} y={by} width="42" height={bh} rx="5" fill="#10b981" opacity={0.85} />
                <text x={bx + 21} y={by - 6} fill="#a7f3d0" fontSize="11" fontWeight="bold" textAnchor="middle">{f}</text>
                <text x={bx + 21} y="214" fill="#d6d3d1" fontSize="11" textAnchor="middle">x={values[idx]}</text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

/* ============================================================================
   8. LOGICAL REASONING (RM: CLOCK & INDUCTIVE COUNTER) LAB
   ============================================================================ */
function LogicalReasoningLabWidget() {
  const [hour, setHour] = useState(3);
  const [minute, setMinute] = useState(30);
  const [segmentsN, setSegmentsN] = useState(6);

  const clockAngle = useMemo(() => {
    const raw = Math.abs(30 * hour - 5.5 * minute);
    return Math.min(raw, 360 - raw);
  }, [hour, minute]);

  const totalSegments = (segmentsN * (segmentsN + 1)) / 2;

  const hAngle = ((hour % 12) * 30 + minute * 0.5 - 90) * (Math.PI / 180);
  const mAngle = (minute * 6 - 90) * (Math.PI / 180);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
      <div className="lg:col-span-5 space-y-4 rounded-xl bg-stone-950/70 p-4 border border-stone-800">
        <div>
          <label className="text-xs text-stone-300 flex justify-between">
            <span>Hora del Reloj (H):</span>
            <b className="text-emerald-400 font-mono">{hour}:00</b>
          </label>
          <input aria-label="Hora del reloj" type="range" min={1} max={12} value={hour} onChange={e => setHour(+e.target.value)} className="w-full accent-emerald-500" />
        </div>
        <div>
          <label className="text-xs text-stone-300 flex justify-between">
            <span>Minutero (M):</span>
            <b className="text-amber-400 font-mono">{String(minute).padStart(2, "0")} min</b>
          </label>
          <input aria-label="Minutos del reloj" type="range" min={0} max={59} value={minute} onChange={e => setMinute(+e.target.value)} className="w-full accent-amber-500" />
        </div>
        <div className="pt-2 border-t border-stone-800">
          <label className="text-xs text-stone-300 flex justify-between">
            <span>Espacios simples (n) para Conteo de Figuras:</span>
            <b className="text-sky-400 font-mono">n = {segmentsN}</b>
          </label>
          <input aria-label="Número de espacios simples" type="range" min={1} max={15} value={segmentsN} onChange={e => setSegmentsN(+e.target.value)} className="w-full accent-sky-500" />
        </div>

        <div className="rounded-lg bg-stone-900 p-3 border border-stone-800 text-xs font-mono space-y-1">
          <div className="text-emerald-400">Ángulo Horario-Minutero: θ = {clockAngle.toFixed(1)}°</div>
          <div className="text-sky-400">Total de Segmentos/Triángulos: n(n+1)/2 = {totalSegments}</div>
        </div>
      </div>

      <div className="lg:col-span-7 rounded-xl bg-stone-950 p-4 border border-stone-800 flex flex-col items-center">
        <svg role="img" aria-label="Reloj analógico para estudiar ángulos" viewBox="0 0 420 230" className="w-full max-h-[230px]">
          <circle cx="210" cy="115" r="85" fill="#1c1917" stroke="#57534e" strokeWidth="3" />
          {/* Hour hand */}
          <line x1="210" y1="115" x2={210 + 50 * Math.cos(hAngle)} y2={115 + 50 * Math.sin(hAngle)} stroke="#10b981" strokeWidth="5" strokeLinecap="round" />
          {/* Minute hand */}
          <line x1="210" y1="115" x2={210 + 72 * Math.cos(mAngle)} y2={115 + 72 * Math.sin(mAngle)} stroke="#f59e0b" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="210" cy="115" r="5" fill="#fff" />
          <text x="210" y="220" fill="#e7e5e4" fontSize="13" fontWeight="bold" textAnchor="middle">
            Hora: {hour}:{String(minute).padStart(2, "0")} → Ángulo menor = {clockAngle.toFixed(1)}°
          </text>
        </svg>
      </div>
    </div>
  );
}

/* ============================================================================
   9. SCIENCE (PHYSICS PROJECTILE & CHEMISTRY) LAB
   ============================================================================ */
function SciencePhysicsChemLabWidget() {
  const [v0, setV0] = useState(30);
  const [angle, setAngle] = useState(45);
  const g = 9.8;

  const rad = (angle * Math.PI) / 180;
  const tFlight = (2 * v0 * Math.sin(rad)) / g;
  const hMax = (v0 * v0 * Math.pow(Math.sin(rad), 2)) / (2 * g);
  const rMax = (v0 * v0 * Math.sin(2 * rad)) / g;

  const trajPath = useMemo(() => {
    const pts: string[] = [];
    for (let i = 0; i <= 40; i++) {
      const t = (tFlight * i) / 40;
      const x = v0 * Math.cos(rad) * t;
      const y = v0 * Math.sin(rad) * t - 0.5 * g * t * t;
      const px = 30 + x * 2.8;
      const py = 195 - y * 2.8;
      pts.push(`${i === 0 ? "M" : "L"} ${px.toFixed(1)} ${py.toFixed(1)}`);
    }
    return pts.join(" ");
  }, [v0, rad, tFlight]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
      <div className="lg:col-span-5 space-y-4 rounded-xl bg-stone-950/70 p-4 border border-stone-800">
        <div>
          <label className="text-xs text-stone-300 flex justify-between">
            <span>Velocidad Inicial (v₀):</span>
            <b className="text-emerald-400 font-mono">{v0} m/s</b>
          </label>
          <input aria-label="Velocidad inicial del lanzamiento" type="range" min={10} max={35} value={v0} onChange={e => setV0(+e.target.value)} className="w-full accent-emerald-500" />
        </div>
        <div>
          <label className="text-xs text-stone-300 flex justify-between">
            <span>Ángulo de Lanzamiento (θ):</span>
            <b className="text-amber-400 font-mono">{angle}°</b>
          </label>
          <input aria-label="Ángulo de lanzamiento" type="range" min={15} max={80} value={angle} onChange={e => setAngle(+e.target.value)} className="w-full accent-amber-500" />
        </div>
        <div className="rounded-lg bg-stone-900 p-3 border border-stone-800 text-xs font-mono space-y-1">
          <div>Tiempo de vuelo: <b className="text-emerald-300">{tFlight.toFixed(2)} s</b></div>
          <div>Altura máxima (Hₘₐₓ): <b className="text-amber-300">{hMax.toFixed(2)} m</b></div>
          <div>Alcance horizontal (Rₘₐₓ): <b className="text-sky-300">{rMax.toFixed(2)} m</b></div>
        </div>
      </div>

      <div className="lg:col-span-7 rounded-xl bg-stone-950 p-4 border border-stone-800">
        <svg role="img" aria-label="Gráfico de trayectoria del movimiento parabólico" viewBox="0 0 420 220" className="w-full max-h-[220px]">
          <line x1="20" y1="195" x2="400" y2="195" stroke="#78716c" strokeWidth="2" />
          <path d={trajPath} fill="none" stroke="#10b981" strokeWidth="3.5" strokeDasharray="6 3" />
          <circle cx="30" cy="195" r="6" fill="#f59e0b" />
        </svg>
      </div>
    </div>
  );
}

/* ============================================================================
   10. CARTESIAN FUNCTION / CONICS / CALCULUS LAB
   ============================================================================ */
function CartesianGenericLabWidget({ mode }: { mode: "function" | "conics" | "calculus" }) {
  const [a, setA] = useState(1);
  const [h, setH] = useState(0);
  const [k, setK] = useState(0);

  const pathD = useMemo(() => {
    const pts: string[] = [];
    const originX = 210, originY = 135, scale = 25;
    for (let px = 20; px <= 400; px += 4) {
      const x = (px - originX) / scale;
      const y = a * Math.pow(x - h, 2) + k;
      const py = originY - y * scale;
      if (py >= 10 && py <= 260) {
        pts.push(`${pts.length === 0 ? "M" : "L"} ${px.toFixed(1)} ${py.toFixed(1)}`);
      }
    }
    return pts.join(" ");
  }, [a, h, k]);

  const xTicks = useMemo(() => [-6, -4, -2, 2, 4, 6].map(v => ({ value: v, label: String(v) })), []);
  const yTicks = useMemo(() => [-4, -2, 2, 4].map(v => ({ value: v, label: String(v) })), []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
      <div className="lg:col-span-5 space-y-4 rounded-xl bg-stone-950/70 p-4 border border-stone-800">
        <div>
          <label className="text-xs text-stone-300 flex justify-between">
            <span>Parámetro Principal / Concavidad (a):</span>
            <b className="text-emerald-400 font-mono">{a}</b>
          </label>
          <input aria-label="Parámetro principal de la función" type="range" min={-3} max={3} step={0.5} value={a} onChange={e => setA(+e.target.value || 0.5)} className="w-full accent-emerald-500" />
        </div>
        <div>
          <label className="text-xs text-stone-300 flex justify-between">
            <span>Desplazamiento Horizontal / Punto x₀ (h):</span>
            <b className="text-amber-400 font-mono">{h}</b>
          </label>
          <input aria-label="Desplazamiento horizontal" type="range" min={-4} max={4} step={0.5} value={h} onChange={e => setH(+e.target.value)} className="w-full accent-amber-500" />
        </div>
        <div>
          <label className="text-xs text-stone-300 flex justify-between">
            <span>Desplazamiento Vertical / Cota (k):</span>
            <b className="text-sky-400 font-mono">{k}</b>
          </label>
          <input aria-label="Desplazamiento vertical" type="range" min={-3} max={3} step={0.5} value={k} onChange={e => setK(+e.target.value)} className="w-full accent-sky-500" />
        </div>
        <div className="rounded-lg bg-stone-900 p-3 border border-stone-800 text-xs font-mono text-stone-300">
          {mode === "calculus"
            ? `Derivada en Vértice x = ${h}: f'(${h}) = 0 (Punto Estacionario)`
            : mode === "conics"
            ? `Vértice Cónico V(${h}; ${k}) · Eje focal x = ${h}`
            : `Vértice Funcional V(${h}; ${k}) · Rango: ${a > 0 ? `[${k}; +∞⟩` : `⟨−∞; ${k}]`}`}
        </div>
      </div>

      <div className="lg:col-span-7 rounded-xl bg-stone-950 p-4 border border-stone-800 flex flex-col items-center">
        <svg role="img" aria-label="Plano cartesiano interactivo con la función actual" viewBox="0 0 420 270" className="w-full max-h-[270px]">
          <CartesianAxes width={420} height={270} originX={210} originY={135} xScale={25} yScale={25} xTicks={xTicks} yTicks={yTicks} pad={14} />
          {pathD && <path d={pathD} fill="none" stroke="#10b981" strokeWidth="3.5" />}
          <circle cx={210 + h * 25} cy={135 - k * 25} r="6" fill="#f59e0b" stroke="#0c0a09" strokeWidth="2" />
        </svg>
      </div>
    </div>
  );
}

/* ============================================================================
   MAIN DISPATCHER COMPONENT
   ============================================================================ */
export function ZenitInteractiveApp({
  engineId,
  topicTitle,
  customFormula,
}: {
  engineId: AppEngineId;
  topicTitle?: string;
  customFormula?: string;
}) {
  const meta = ZENIT_ENGINES[engineId] || ZENIT_ENGINES.FunctionCartesianLab;
  const subEngines = useMemo(() => getOpenSourceEnginesByMacro(engineId), [engineId]);
  const recommendedSubEngine = useMemo(
    () =>
      resolveOpenSourceEngineForLesson({
        title: topicTitle || meta.title,
        course: meta.course,
        appEngine: engineId,
      }),
    [topicTitle, meta.title, meta.course, engineId]
  );
  const [selectedSubId, setSelectedSubId] = useState<string>("topic-primary");
  const activeSubEngine = subEngines.find((s) => s.id === selectedSubId) || recommendedSubEngine;
  const formulaToDisplay =
    selectedSubId === "topic-primary"
      ? customFormula || meta.formula
      : activeSubEngine?.canonicalFormula || customFormula || meta.formula;

  return (
    <section className="zenit-webapp-shell my-8 rounded-3xl border border-emerald-800/40 bg-gradient-to-b from-stone-900 via-stone-950 to-stone-950 p-6 md:p-8 shadow-2xl text-stone-100">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800 pb-5 mb-6">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-block rounded-full bg-emerald-500/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-300 border border-emerald-500/30">
              Web App Interactiva · {meta.badge}
            </span>
            {recommendedSubEngine && (
              <span className="inline-block rounded-full bg-amber-500/15 px-3 py-1 text-[11px] font-mono font-bold text-amber-300 border border-amber-500/30">
                Motor #{String(recommendedSubEngine.rank).padStart(2, "0")}/60 · {recommendedSubEngine.name}
              </span>
            )}
          </div>
          <h3 className="mt-2 text-xl md:text-2xl font-extrabold text-white">
            {topicTitle ? `${meta.title} — ${topicTitle}` : meta.title}
          </h3>
          <p className="text-xs text-stone-400 mt-1">{meta.description}</p>
        </div>

        <div className="zenit-engine-formula-panel rounded-xl bg-stone-900/90 px-3 py-2 border border-stone-800">
          <MathFormula source={formulaToDisplay} displayMode={true} />
          <small className="math-scroll-hint">Desliza horizontalmente para ver la fórmula completa ↔</small>
        </div>
      </div>

      {/* Selector de los 5 Sub-Motores Open-Source (#01–#60) del Laboratorio */}
      <div className="mb-6 rounded-2xl border border-stone-800/90 bg-stone-950/75 p-3.5 space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="font-mono font-bold uppercase tracking-wider text-emerald-400">
            Sub-Motores Open-Source e Inyección de Fórmulas (5 de 60 activos en esta rama)
          </span>
          <span className="text-stone-400">
            {selectedSubId === "topic-primary"
              ? `Fórmula eje del tema · Recomendado: #${String(recommendedSubEngine.rank).padStart(2, "0")} ${recommendedSubEngine.name}`
              : `#${String(activeSubEngine.rank).padStart(2, "0")} · ${activeSubEngine.purpose}`}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSelectedSubId("topic-primary")}
            aria-pressed={selectedSubId === "topic-primary"}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              selectedSubId === "topic-primary"
                ? "bg-emerald-500 text-stone-950 border-emerald-400 font-bold"
                : "bg-stone-900 text-stone-300 border-stone-700 hover:border-emerald-500/50"
            }`}
          >
            Fórmula Eje del Tema
          </button>
          {subEngines.map((sub) => {
            const isSelected = selectedSubId === sub.id;
            return (
              <button
                key={sub.id}
                type="button"
                onClick={() => setSelectedSubId(sub.id)}
                aria-pressed={isSelected}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all ${
                  isSelected
                    ? "bg-amber-400 text-stone-950 border-amber-300 font-bold"
                    : "bg-stone-900 text-stone-300 border-stone-700 hover:border-amber-400/50"
                }`}
              >
                #{String(sub.rank).padStart(2, "0")} · {sub.name}
              </button>
            );
          })}
        </div>
      </div>

      {engineId === "SetVennLab" && <SetVennLabWidget />}
      {engineId === "NumberTheoryLab" && <NumberTheoryLabWidget />}
      {engineId === "PolynomialAlgebraLab" && <PolynomialAlgebraLabWidget />}
      {engineId === "EquationInequalityLab" && <EquationInequalityLabWidget />}
      {engineId === "GeometryInteractiveLab" && <GeometryInteractiveLabWidget />}
      {engineId === "TrigonometryCircleLab" && <TrigonometryCircleLabWidget />}
      {engineId === "StatisticsProbabilityLab" && <StatisticsProbabilityLabWidget />}
      {engineId === "LogicalReasoningLab" && <LogicalReasoningLabWidget />}
      {engineId === "SciencePhysicsChemLab" && <SciencePhysicsChemLabWidget />}
      {engineId === "FunctionCartesianLab" && <CartesianGenericLabWidget mode="function" />}
      {engineId === "AnalyticConicsLab" && <CartesianGenericLabWidget mode="conics" />}
      {engineId === "CalculusAnalysisLab" && <CartesianGenericLabWidget mode="calculus" />}
    </section>
  );
}
