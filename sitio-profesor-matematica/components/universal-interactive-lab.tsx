"use client";

import React, { useState, useMemo } from "react";
import { MathFormula } from "./math-formula";
import { CartesianAxes } from "./cartesian-axes";
import Link from "./safe-link";

interface UniversalLabProps {
  topicTitle: string;
  keyFormula?: string;
  interactiveType: "grapher" | "socratic" | "simulation" | "geometry" | "balancer";
  crossConnections?: {
    area: string;
    course: string;
    topicSlug: string;
    label: string;
  }[];
}

export function UniversalInteractiveLab({
  topicTitle,
  keyFormula = "f(x) = a(x - h)^2 + k",
  interactiveType,
  crossConnections = []
}: UniversalLabProps) {
  // Grapher state
  const [a, setA] = useState<number>(1);
  const [h, setH] = useState<number>(0);
  const [k, setK] = useState<number>(0);

  // Socratic question state
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [revealedProof, setRevealedProof] = useState<boolean>(false);

  // Computed curve points for SVG canvas
  const pathD = useMemo(() => {
    const points: string[] = [];
    const width = 420;
    const height = 280;
    const originX = 210;
    const originY = 140;
    const scale = 25;

    for (let px = 20; px <= width - 20; px += 4) {
      const xVal = (px - originX) / scale;
      let yVal = 0;

      if (interactiveType === "grapher" || interactiveType === "simulation") {
        // Parabola / Quadratic model
        yVal = a * Math.pow(xVal - h, 2) + k;
      } else {
        // Trigonometric wave or generic function
        yVal = a * Math.sin(xVal - h) + k;
      }

      const py = originY - yVal * scale;
      if (py >= 10 && py <= height - 10) {
        points.push(`${points.length === 0 ? "M" : "L"} ${px.toFixed(1)} ${py.toFixed(1)}`);
      }
    }
    return points.join(" ");
  }, [a, h, k, interactiveType]);

  const xTicks = useMemo(() => {
    return [-6, -4, -2, 2, 4, 6].map(v => ({ value: v, label: String(v) }));
  }, []);

  const yTicks = useMemo(() => {
    return [-4, -2, 2, 4].map(v => ({ value: v, label: String(v) }));
  }, []);

  return (
    <div className="universal-lab-card my-8 rounded-2xl border border-emerald-900/30 bg-stone-900/95 p-6 shadow-2xl text-stone-100">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-800 pb-4">
        <div>
          <span className="inline-block rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-400">
            Laboratorio Interactivo Zénit
          </span>
          <h3 className="mt-1 text-xl font-bold text-white">{topicTitle}</h3>
        </div>
        {keyFormula && (
          <div className="rounded-lg bg-stone-950/80 px-4 py-2 border border-stone-800">
            <MathFormula source={keyFormula} displayMode={false} />
          </div>
        )}
      </div>

      {/* Main Interactive Stage */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Controls Column */}
        <div className="lg:col-span-5 space-y-5">
          <p className="text-sm text-stone-300">
            Modifica los parámetros en tiempo real para observar cómo se transforma el comportamiento algebraico y geométrico:
          </p>

          <div className="space-y-4 rounded-xl bg-stone-950/60 p-4 border border-stone-800/80">
            <div>
              <div className="flex justify-between text-xs font-semibold text-stone-300 mb-1">
                <span>Parámetro de Escala (a)</span>
                <span className="font-mono text-emerald-400">{a}</span>
              </div>
              <input
                type="range"
                min="-3"
                max="3"
                step="0.5"
                value={a}
                onChange={e => setA(parseFloat(e.target.value) || 0.1)}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-stone-300 mb-1">
                <span>Desplazamiento Horizontal (h)</span>
                <span className="font-mono text-emerald-400">{h}</span>
              </div>
              <input
                type="range"
                min="-4"
                max="4"
                step="0.5"
                value={h}
                onChange={e => setH(parseFloat(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-stone-300 mb-1">
                <span>Desplazamiento Vertical (k)</span>
                <span className="font-mono text-emerald-400">{k}</span>
              </div>
              <input
                type="range"
                min="-3"
                max="3"
                step="0.5"
                value={k}
                onChange={e => setK(parseFloat(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>
          </div>

          <div className="rounded-lg bg-emerald-950/30 border border-emerald-800/40 p-3 text-xs text-emerald-200">
            💡 <strong>Observación Zénit:</strong> Cuando <span className="font-mono font-bold">a &lt; 0</span>, la gráfica se refleja respecto al eje horizontal. El vértice o centroide se traslada directamente a las coordenadas <span className="font-mono font-bold">({h}, {k})</span>.
          </div>
        </div>

        {/* Visual Grapher SVG Stage */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center rounded-xl bg-stone-950 p-4 border border-stone-800 shadow-inner overflow-hidden">
          <svg viewBox="0 0 420 280" className="w-full h-auto max-h-[300px]">
            <CartesianAxes
              width={420}
              height={280}
              originX={210}
              originY={140}
              xScale={25}
              yScale={25}
              xTicks={xTicks}
              yTicks={yTicks}
              pad={14}
            />
            {pathD && (
              <path
                d={pathD}
                fill="none"
                stroke="#10b981"
                strokeWidth="3.5"
                strokeLinecap="round"
                className="transition-all duration-150"
              />
            )}
            {/* Vertex / Center point indicator */}
            <circle
              cx={210 + h * 25}
              cy={140 - k * 25}
              r="6"
              fill="#f59e0b"
              stroke="#1c1917"
              strokeWidth="2"
            />
          </svg>
          <div className="mt-2 flex items-center justify-between w-full px-3 text-xs text-stone-400">
            <span>Punto clave: ({h}, {k})</span>
            <span className="text-emerald-400 font-mono">Render dinámico SVG</span>
          </div>
        </div>
      </div>

      {/* Socratic Interactive Challenge */}
      <div className="mt-8 border-t border-stone-800 pt-6">
        <h4 className="text-base font-bold text-amber-400 flex items-center gap-2">
          <span>🎯 Reto Socrático de Autoevaluación</span>
        </h4>
        <p className="mt-2 text-sm text-stone-300">
          Si duplicamos el valor del parámetro de escala <span className="font-mono">a</span> de 1 a 2, ¿qué le ocurre geométricamente a la gráfica?
        </p>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { id: 0, text: "Se ensancha horizontalmente hacia afuera", correct: false, reason: "Incorrecto: al multiplicar por un factor mayor que 1, los valores crecen más rápido." },
            { id: 1, text: "Se estiliza y comprime horizontalmente hacia el eje", correct: true, reason: "¡Correcto! Crece con el doble de rapidez en la dirección vertical, comprimiéndose respecto al eje de simetría." },
            { id: 2, text: "Se traslada 2 unidades hacia arriba", correct: false, reason: "Incorrecto: la traslación vertical depende exclusivamente del parámetro k." }
          ].map((opt) => (
            <button
              key={opt.id}
              onClick={() => setSelectedAnswer(opt.id)}
              className={`p-3 text-left text-xs rounded-xl border transition-all ${
                selectedAnswer === opt.id
                  ? opt.correct
                    ? "bg-emerald-950/80 border-emerald-500 text-emerald-200"
                    : "bg-rose-950/80 border-rose-500 text-rose-200"
                  : "bg-stone-950/60 border-stone-800 hover:border-stone-700 text-stone-300"
              }`}
            >
              <div className="font-semibold mb-1">Opción {String.fromCharCode(65 + opt.id)}</div>
              {opt.text}
            </button>
          ))}
        </div>

        {selectedAnswer !== null && (
          <div className={`mt-3 p-3 rounded-lg text-xs ${
            selectedAnswer === 1
              ? "bg-emerald-950/40 text-emerald-300 border border-emerald-800/60"
              : "bg-rose-950/40 text-rose-300 border border-rose-800/60"
          }`}>
            {selectedAnswer === 1
              ? "✅ ¡Excelente deducción! Has captado la esencia geométrica de la dilatación y contracción funcional."
              : "⚠️ Pista de reflexión: Recuerda que a modifica la tasa de cambio vertical, no la posición del vértice."}
          </div>
        )}
      </div>

      {/* Cross connections */}
      {crossConnections.length > 0 && (
        <div className="mt-6 border-t border-stone-800 pt-4 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-stone-400">🔗 Conexiones interdisciplinarias:</span>
          {crossConnections.map((c, idx) => (
            <Link
              key={idx}
              href={`/aprende/${c.area}/${c.course}/${c.topicSlug}`}
              className="inline-flex items-center gap-1.5 rounded-full bg-stone-800/90 hover:bg-emerald-950/60 hover:text-emerald-300 hover:border-emerald-700/60 px-3 py-1 text-xs text-stone-200 border border-stone-700/80 transition-all"
            >
              <span>{c.label}</span>
              <span className="text-stone-500">→</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
