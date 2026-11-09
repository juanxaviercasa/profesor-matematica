"use client";

import React, { useState, useCallback } from "react";
import type { AppEngineId } from "./zenit-app-engines";

interface GeneratedProblem {
  seed: number;
  statement: string;
  options: string[];
  correctIndex: number;
  steps: string[];
}

function buildDynamicProblem(engineId: AppEngineId, topicTitle: string, seed: number): GeneratedProblem {
  const r1 = (seed % 7) + 3; // 3..9
  const r2 = ((seed * 3) % 8) + 2; // 2..9
  const r3 = ((seed * 5) % 6) + 4; // 4..9

  let statement = "";
  let correctVal = "";
  let distractors: string[] = [];
  let steps: string[] = [];

  switch (engineId) {
    case "SetVennLab": {
      const nA = r1 * 4 + r2;
      const nB = r1 * 3 + r3;
      const both = Math.min(nA, nB) - r1;
      const onlyA = nA - both;
      const onlyB = nB - both;
      const union = onlyA + onlyB + both;
      statement = `[Generado #${seed}] En un grupo de estudiantes evaluados en «${topicTitle}», se sabe que n(A) = ${nA}, n(B) = ${nB} y la intersección n(A ∩ B) = ${both}. Determina el cardinal de la unión n(A ∪ B) y el cardinal de la diferencia simétrica n(A Δ B).`;
      correctVal = `n(A ∪ B) = ${union}  ;  n(A Δ B) = ${onlyA + onlyB}`;
      distractors = [
        `n(A ∪ B) = ${union + both}  ;  n(A Δ B) = ${onlyA + onlyB}`,
        `n(A ∪ B) = ${union}  ;  n(A Δ B) = ${union - 2}`,
        `n(A ∪ B) = ${nA + nB}  ;  n(A Δ B) = ${both}`,
        `n(A ∪ B) = ${union - 3}  ;  n(A Δ B) = ${onlyA}`,
      ];
      steps = [
        `Paso 1: Calculamos solo A: n(A - B) = n(A) - n(A ∩ B) = ${nA} - ${both} = ${onlyA}.`,
        `Paso 2: Calculamos solo B: n(B - A) = n(B) - n(A ∩ B) = ${nB} - ${both} = ${onlyB}.`,
        `Paso 3: Unión: n(A ∪ B) = ${onlyA} + ${onlyB} + ${both} = ${union}.`,
        `Paso 4: Diferencia simétrica: n(A Δ B) = n(A - B) + n(B - A) = ${onlyA} + ${onlyB} = ${onlyA + onlyB}.`,
      ];
      break;
    }

    case "NumberTheoryLab": {
      const a = r1 * 6;
      const b = r2 * 6;
      const gcd = (x: number, y: number): number => (y === 0 ? x : gcd(y, x % y));
      const g = gcd(a, b);
      const l = (a * b) / g;
      statement = `[Generado #${seed}] Aplicando las propiedades de «${topicTitle}», calcula el Máximo Común Divisor (MCD) y el Mínimo Común Múltiplo (MCM) de los números A = ${a} y B = ${b}, e indica el valor de MCM(A,B) + MCD(A,B).`;
      correctVal = `${l + g} (MCD = ${g}, MCM = ${l})`;
      distractors = [
        `${l} (MCD = ${g}, MCM = ${l - g})`,
        `${l + g + 6} (MCD = ${g + 2}, MCM = ${l})`,
        `${a * b} (MCD = 1, MCM = ${a * b})`,
        `${l - g} (MCD = ${g}, MCM = ${l})`,
      ];
      steps = [
        `Paso 1: Descomponemos A = ${a} y B = ${b} para hallar su factor común máximo.`,
        `Paso 2: Obtenemos MCD(${a}; ${b}) = ${g}.`,
        `Paso 3: Por propiedad fundamental: MCM(${a}; ${b}) = (${a} × ${b}) / ${g} = ${l}.`,
        `Paso 4: Suma pedida: MCM + MCD = ${l} + ${g} = ${l + g}.`,
      ];
      break;
    }

    case "PolynomialAlgebraLab": {
      const c = r2;
      const a2 = 2;
      const a1 = -r1;
      const a0 = r3;
      const rem = a2 * c * c + a1 * c + a0;
      statement = `[Generado #${seed}] En el tema «${topicTitle}», aplica el Teorema del Resto o el Método de Ruffini para hallar el residuo R(x) al dividir el polinomio P(x) = 2x² - ${r1}x + ${r3} entre el divisor lineal d(x) = x - ${c}.`;
      correctVal = `R = ${rem}`;
      distractors = [
        `R = ${rem + r1}`,
        `R = ${2 * c * c + r1 * c + r3}`,
        `R = ${rem - 4}`,
        `R = ${-rem}`,
      ];
      steps = [
        `Paso 1: Igualamos el divisor a cero: x - ${c} = 0 ⇒ x = ${c}.`,
        `Paso 2: Por el Teorema del Resto, R = P(${c}) = 2(${c})² - ${r1}(${c}) + ${r3}.`,
        `Paso 3: Operamos: R = 2(${c * c}) - ${r1 * c} + ${r3} = ${2 * c * c} - ${r1 * c} + ${r3} = ${rem}.`,
      ];
      break;
    }

    case "EquationInequalityLab": {
      const root1 = r2;
      const root2 = r2 + r1;
      const sumR = root1 + root2;
      const prodR = root1 * root2;
      statement = `[Generado #${seed}] Resuelve la inecuación cuadrática x² - ${sumR}x + ${prodR} ≤ 0 aplicando el método de puntos críticos («${topicTitle}») e indica su conjunto solución C.S. y la suma de sus soluciones enteras.`;
      const intSum = ((root1 + root2) * (root2 - root1 + 1)) / 2;
      correctVal = `C.S. = [${root1}; ${root2}]  ;  Σ enteros = ${intSum}`;
      distractors = [
        `C.S. = ⟨${root1}; ${root2}⟩  ;  Σ enteros = ${intSum - root1 - root2}`,
        `C.S. = ⟨-∞; ${root1}] ∪ [${root2}; +∞⟩  ;  Σ = ∞`,
        `C.S. = [-${root2}; -${root1}]  ;  Σ enteros = -${intSum}`,
        `C.S. = [${root1}; ${root2}]  ;  Σ enteros = ${intSum + root1}`,
      ];
      steps = [
        `Paso 1: Factorizamos el trinomio por aspa simple: (x - ${root1})(x - ${root2}) ≤ 0.`,
        `Paso 2: Hallamos los puntos críticos igualando cada factor a cero: x₁ = ${root1}, x₂ = ${root2}.`,
        `Paso 3: Como la desigualdad es ≤ 0, tomamos la zona negativa cerrada: C.S. = [${root1}; ${root2}].`,
        `Paso 4: Suma de valores enteros desde ${root1} hasta ${root2}: Σ = ${intSum}.`,
      ];
      break;
    }

    case "FunctionCartesianLab": {
      const h = r2;
      const k = -r1;
      const a = 2;
      const yInt = a * h * h + k;
      statement = `[Generado #${seed}] Dada la función cuadrática en forma canónica f(x) = 2(x - ${h})² - ${r1} («${topicTitle}»), determina las coordenadas de su vértice V(h; k), su rango Ran(f) y su intersección con el eje Y, es decir, f(0).`;
      correctVal = `V(${h}; ${k}) , Ran(f) = [${k}; +∞⟩ , f(0) = ${yInt}`;
      distractors = [
        `V(-${h}; ${k}) , Ran(f) = [${k}; +∞⟩ , f(0) = ${yInt}`,
        `V(${h}; ${r1}) , Ran(f) = ⟨-∞; ${r1}] , f(0) = ${yInt - 4}`,
        `V(${h}; ${k}) , Ran(f) = [${h}; +∞⟩ , f(0) = ${a * h + k}`,
        `V(0; ${k}) , Ran(f) = ℝ , f(0) = ${k}`,
      ];
      steps = [
        `Paso 1: Comparando con f(x) = a(x - h)² + k, identificamos a = 2 > 0, h = ${h}, k = ${k}.`,
        `Paso 2: El vértice es V(${h}; ${k}) y como a > 0 la parábola abre hacia arriba: Ran(f) = [${k}; +∞⟩.`,
        `Paso 3: Evaluamos en x = 0: f(0) = 2(0 - ${h})² + (${k}) = 2(${h * h}) - ${r1} = ${yInt}.`,
      ];
      break;
    }

    case "GeometryInteractiveLab": {
      const nSides = r1 + 3; // 6..12
      const sumInt = 180 * (nSides - 2);
      const diag = (nSides * (nSides - 3)) / 2;
      statement = `[Generado #${seed}] En el estudio de «${topicTitle}», se tiene un polígono convexo regular de n = ${nSides} lados. Calcula la suma de sus ángulos interiores (S_i) y el número total de diagonales (N_D).`;
      correctVal = `S_i = ${sumInt}°  ;  N_D = ${diag} diagonales`;
      distractors = [
        `S_i = ${180 * nSides}°  ;  N_D = ${diag + nSides} diagonales`,
        `S_i = ${sumInt}°  ;  N_D = ${nSides * (nSides - 3)} diagonales`,
        `S_i = ${sumInt - 180}°  ;  N_D = ${diag - 2} diagonales`,
        `S_i = 360°  ;  N_D = ${diag} diagonales`,
      ];
      steps = [
        `Paso 1: Aplicamos la fórmula de suma de ángulos internos para n = ${nSides}: S_i = 180°(n - 2) = 180°(${nSides - 2}) = ${sumInt}°.`,
        `Paso 2: Aplicamos la fórmula del número total de diagonales: N_D = n(n - 3)/2 = ${nSides}(${nSides - 3})/2 = ${diag}.`,
      ];
      break;
    }

    case "AnalyticConicsLab": {
      const h = r2;
      const k = r3;
      const rad = r1;
      const D = -2 * h;
      const E = -2 * k;
      const F = h * h + k * k - rad * rad;
      statement = `[Generado #${seed}] En «${topicTitle}», una circunferencia tiene ecuación general x² + y² ${D}x ${E}y + (${F}) = 0. Determina las coordenadas de su centro C(h; k) y la longitud de su radio R.`;
      correctVal = `Centro C(${h}; ${k})  ;  Radio R = ${rad}`;
      distractors = [
        `Centro C(-${h}; -${k})  ;  Radio R = ${rad}`,
        `Centro C(${h}; ${k})  ;  Radio R = ${rad * rad}`,
        `Centro C(${k}; ${h})  ;  Radio R = ${rad + 1}`,
        `Centro C(${h}; ${k})  ;  Radio R = ${rad - 1}`,
      ];
      steps = [
        `Paso 1: Completamos cuadrados agrupando términos en x e y: (x² ${D}x + ${h * h}) + (y² ${E}y + ${k * k}) = -(${F}) + ${h * h} + ${k * k}.`,
        `Paso 2: Obtenemos la forma ordinaria: (x - ${h})² + (y - ${k})² = ${rad * rad}.`,
        `Paso 3: Por lo tanto, el centro es C(${h}; ${k}) y el radio es R = √${rad * rad} = ${rad}.`,
      ];
      break;
    }

    case "TrigonometryCircleLab": {
      const kFactor = r2;
      const S = 9 * kFactor;
      const C = 10 * kFactor;
      const expr = 2 * S + C;
      statement = `[Generado #${seed}] Siendo S y C los números convencionales de grados sexagesimales y centesimales de un mismo ángulo trigonométrico («${topicTitle}») tal que 2S + C = ${expr}, calcula la medida de dicho ángulo en el sistema sexagesimal y radial.`;
      correctVal = `${S}°  (o ${kFactor}π/20 rad)`;
      distractors = [
        `${C}°  (o ${kFactor}π/10 rad)`,
        `${S + 9}°  (o ${kFactor + 1}π/20 rad)`,
        `${S / 2}°  (o ${kFactor}π/40 rad)`,
        `${18 * kFactor}°  (o ${kFactor}π/5 rad)`,
      ];
      steps = [
        `Paso 1: Usamos la relación fundamental S = 9k y C = 10k.`,
        `Paso 2: Reemplazamos en el dato: 2(9k) + 10k = ${expr} ⇒ 28k = ${expr} ⇒ k = ${kFactor}.`,
        `Paso 3: En grados sexagesimales: S = 9(${kFactor}) = ${S}°. En radianes: R = (π/20)k = ${kFactor}π/20 rad.`,
      ];
      break;
    }

    case "StatisticsProbabilityLab": {
      const d1 = r1 * 2;
      const d2 = r1 * 2 + 2;
      const d3 = r1 * 2 + 4;
      const d4 = r1 * 2 + 6;
      const d5 = r1 * 2 + 11;
      const sum = d1 + d2 + d3 + d4 + d5;
      const mean = sum / 5;
      const median = d3;
      statement = `[Generado #${seed}] En un estudio de «${topicTitle}», se registraron los siguientes 5 datos muestrales: {${d1}; ${d2}; ${d3}; ${d4}; ${d5}}. Calcula la media aritmética (x̄) y la mediana (Me), e indica el valor de x̄ + Me.`;
      correctVal = `x̄ = ${mean}  ;  Me = ${median}  ;  x̄ + Me = ${mean + median}`;
      distractors = [
        `x̄ = ${median}  ;  Me = ${mean}  ;  x̄ + Me = ${mean + median - 1}`,
        `x̄ = ${mean + 1}  ;  Me = ${d2}  ;  x̄ + Me = ${mean + 1 + d2}`,
        `x̄ = ${mean}  ;  Me = ${d4}  ;  x̄ + Me = ${mean + d4}`,
        `x̄ = ${sum}  ;  Me = ${median}  ;  x̄ + Me = ${sum + median}`,
      ];
      steps = [
        `Paso 1: Sumamos los 5 datos ordenados: Σx_i = ${d1} + ${d2} + ${d3} + ${d4} + ${d5} = ${sum}.`,
        `Paso 2: Media aritmética: x̄ = ${sum} / 5 = ${mean}.`,
        `Paso 3: Como los datos están ordenados, el término central (posición 3) es la mediana: Me = ${median}.`,
        `Paso 4: Por lo tanto, x̄ + Me = ${mean} + ${median} = ${mean + median}.`,
      ];
      break;
    }

    case "LogicalReasoningLab": {
      const n = r1 + 4; // 7..13
      const totalTri = (n * (n + 1)) / 2;
      statement = `[Generado #${seed}] Aplicando razonamiento inductivo («${topicTitle}»), determina el número total de segmentos o triángulos elementales que se pueden contar en una figura cuyos espacios consecutivos en la base están numerados del 1 al n = ${n}.`;
      correctVal = `${totalTri}`;
      distractors = [
        `${n * n}`,
        `${totalTri - n}`,
        `${totalTri + n + 1}`,
        `${n * (n - 1)}`,
      ];
      steps = [
        `Paso 1: Identificamos el número de espacios simples consecutivos: n = ${n}.`,
        `Paso 2: Aplicamos la fórmula inductiva de Gauss: N = n(n + 1) / 2.`,
        `Paso 3: N = ${n} × ${n + 1} / 2 = ${totalTri}.`,
      ];
      break;
    }

    case "CalculusAnalysisLab": {
      const a = r2;
      const b = r1;
      const x0 = 2;
      const fVal = a * x0 * x0 * x0 + b * x0;
      const dfVal = 3 * a * x0 * x0 + b;
      statement = `[Generado #${seed}] En «${topicTitle}», dada la función diferenciable f(x) = ${a}x³ + ${b}x, calcula la pendiente de la recta tangente f'(x₀) en el punto de abscisa x₀ = ${x0} y el valor de f(${x0}).`;
      correctVal = `f'(${x0}) = ${dfVal}  ;  f(${x0}) = ${fVal}`;
      distractors = [
        `f'(${x0}) = ${a * x0 * x0 + b}  ;  f(${x0}) = ${fVal}`,
        `f'(${x0}) = ${dfVal}  ;  f(${x0}) = ${dfVal * x0}`,
        `f'(${x0}) = ${6 * a * x0}  ;  f(${x0}) = ${fVal}`,
        `f'(${x0}) = ${dfVal - b}  ;  f(${x0}) = ${fVal + b}`,
      ];
      steps = [
        `Paso 1: Derivamos término a término respecto a x: f'(x) = 3(${a})x² + ${b} = ${3 * a}x² + ${b}.`,
        `Paso 2: Evaluamos la derivada en x₀ = ${x0}: f'(${x0}) = ${3 * a}(${x0})² + ${b} = ${dfVal}.`,
        `Paso 3: Evaluamos la función original en x₀ = ${x0}: f(${x0}) = ${a}(${x0})³ + ${b}(${x0}) = ${fVal}.`,
      ];
      break;
    }

    case "SciencePhysicsChemLab":
    default: {
      const v0 = r1 * 10; // 30..90 m/s
      const g = 10;
      const tSubida = v0 / g;
      const hMax = (v0 * v0) / (2 * g);
      statement = `[Generado #${seed}] En el laboratorio de «${topicTitle}», un móvil es lanzado verticalmente hacia arriba con rapidez inicial v₀ = ${v0} m/s (considera g = 10 m/s²). Calcula el tiempo de subida (t_s) y la altura máxima alcanzada (H_máx).`;
      correctVal = `t_s = ${tSubida} s  ;  H_máx = ${hMax} m`;
      distractors = [
        `t_s = ${tSubida * 2} s  ;  H_máx = ${hMax * 2} m`,
        `t_s = ${tSubida} s  ;  H_máx = ${v0 * tSubida} m`,
        `t_s = ${tSubida / 2} s  ;  H_máx = ${hMax / 2} m`,
        `t_s = ${tSubida + 1} s  ;  H_máx = ${hMax + 10} m`,
      ];
      steps = [
        `Paso 1: En el punto más alto la rapidez final es v_f = 0. Por lo tanto, t_s = v₀ / g = ${v0} / 10 = ${tSubida} s.`,
        `Paso 2: Calculamos la altura máxima: H_máx = v₀² / (2g) = (${v0})² / 20 = ${v0 * v0} / 20 = ${hMax} m.`,
      ];
      break;
    }
  }

  // Deterministic shuffle based on seed
  const correctIndex = seed % 5;
  const rawOpts: string[] = [];
  let dIdx = 0;
  const letters = ["a", "b", "c", "d", "e"];
  for (let i = 0; i < 5; i++) {
    if (i === correctIndex) {
      rawOpts.push(`${letters[i]}. ${correctVal}`);
    } else {
      rawOpts.push(`${letters[i]}. ${distractors[dIdx++]}`);
    }
  }

  return {
    seed,
    statement,
    options: rawOpts,
    correctIndex,
    steps,
  };
}

export function InfiniteProblemGenerator({
  engineId,
  topicTitle,
}: {
  engineId: AppEngineId;
  topicTitle: string;
}) {
  const [seed, setSeed] = useState<number>(101);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [showSteps, setShowSteps] = useState<boolean>(false);
  const [streak, setStreak] = useState<number>(0);

  const problem = buildDynamicProblem(engineId, topicTitle, seed);

  const handleNextProblem = useCallback(() => {
    setSeed((prev) => prev + 17);
    setSelectedIdx(null);
    setShowSteps(false);
  }, []);

  const handleSelectOption = (idx: number) => {
    if (selectedIdx !== null) return;
    setSelectedIdx(idx);
    if (idx === problem.correctIndex) {
      setStreak((s) => s + 1);
    } else {
      setStreak(0);
    }
  };

  return (
    <section className="infinite-problem-generator rounded-3xl border border-amber-500/40 bg-gradient-to-br from-stone-900/90 via-stone-950 to-amber-950/20 p-6 md:p-8 space-y-5 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800 pb-4">
        <div>
          <span className="inline-block rounded-full bg-amber-500/20 border border-amber-500/40 px-3 py-0.5 text-[11px] font-mono font-bold text-amber-300 uppercase">
            🎲 CAPA 3 · GENERADOR ALGORÍTMICO INFINITO DE PROBLEMAS
          </span>
          <h3 className="text-xl md:text-2xl font-bold text-white mt-1.5">
            Entrenador Infinito con Semilla Dinámica
          </h3>
          <p className="text-xs text-stone-400 mt-0.5">
            ¿Terminaste las fichas del libro? Genera variaciones ilimitadas con nuevos datos numéricos y solución paso a paso al instante.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-stone-950 border border-stone-800 px-3.5 py-2 text-xs font-mono">
            <span className="text-stone-400 block text-[10px]">RACHA ACTUAL</span>
            <span className="text-amber-400 font-bold text-sm">🔥 {streak} seguidas</span>
          </div>
          <button
            onClick={handleNextProblem}
            className="rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-extrabold px-4 py-2.5 text-xs transition-all shadow-lg cursor-pointer"
          >
            🎲 Generar Nuevo Problema →
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-stone-800 bg-stone-950/90 p-5 space-y-4">
        <div className="flex items-center justify-between text-xs font-mono text-stone-400">
          <span className="text-amber-300 font-bold">Semilla Algorítmica #{problem.seed}</span>
          <button
            onClick={() => setShowSteps((s) => !s)}
             aria-expanded={showSteps}
            className="text-emerald-400 hover:underline font-semibold"
          >
            {showSteps ? "Ocultar desarrollo paso a paso" : "📐 Ver resolución paso a paso"}
          </button>
        </div>

        <p className="text-sm md:text-base text-stone-100 font-medium leading-relaxed">
          {problem.statement}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
          {problem.options.map((opt, idx) => {
            const isSelected = selectedIdx === idx;
            const isRight = idx === problem.correctIndex;
            let style =
              "bg-stone-900/90 border-stone-800 text-stone-300 hover:border-amber-500/50";
            if (selectedIdx !== null) {
              if (isRight) {
                style = "bg-emerald-950 border-emerald-500 text-emerald-200 font-bold shadow";
              } else if (isSelected && !isRight) {
                style = "bg-rose-950/80 border-rose-500 text-rose-200 font-bold";
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                disabled={selectedIdx !== null}
                aria-label={`Alternativa ${idx + 1}: ${opt}`}
                aria-pressed={isSelected}
                className={`px-3.5 py-2.5 rounded-xl text-left text-xs font-mono border transition-all ${style}`}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {selectedIdx !== null && (
          <div
            role="status"
            aria-live="polite"
            className={`rounded-xl p-3 text-xs flex flex-wrap items-center justify-between gap-2 border ${
              selectedIdx === problem.correctIndex
                ? "bg-emerald-950/40 border-emerald-700/60 text-emerald-200"
                : "bg-rose-950/40 border-rose-700/60 text-rose-200"
            }`}
          >
            <span>
              {selectedIdx === problem.correctIndex
                ? "✓ ¡Excelente! Cálculo verificado correctamente."
                : `✗ Respuesta incorrecta. La alternativa exacta es ${problem.options[problem.correctIndex]}.`}
            </span>
            <button
              onClick={() => setShowSteps(true)}
              className="font-mono font-bold underline text-amber-300"
            >
              Ver demostración paso a paso
            </button>
          </div>
        )}

        {showSteps && (
          <div className="rounded-xl bg-stone-900/95 border border-stone-700 p-4 space-y-2 text-xs font-mono text-stone-200">
            <div className="text-amber-400 font-bold">
              Resolución Algorítmica Paso a Paso (Semilla #{problem.seed}):
            </div>
            {problem.steps.map((st, i) => (
              <div key={i} className="flex items-start gap-2 leading-relaxed">
                <span className="text-emerald-400">▸</span>
                <span>{st}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
