"use client";

import { useMemo, useState } from "react";
import { MathFormula } from "@/components/math-formula";
import {
  QUADRATIC_A_VALUES, PLOT, tidy, quadraticPlot,
  expandedLatex, vertexLatex,
} from "@/lib/quadratic-hero.mjs";

/** Una gráfica cartesiana auténtica, accesible y sin publicidad repetida. */
export function QuadraticHeroLab() {
  const [aIndex, setAIndex] = useState(5);
  const [h, setH] = useState(2);
  const [k, setK] = useState(-1);
  const a = QUADRATIC_A_VALUES[aIndex];

  const graph = useMemo(() => quadraticPlot(a, h, k), [a, h, k]);
  const equation = useMemo(() => expandedLatex(a, h, k), [a, h, k]);
  const vertexEquation = useMemo(() => vertexLatex(a, h, k), [a, h, k]);
  const roots = graph.roots;
  const rootSummary = roots.length === 0 ? "Sin raíces reales"
    : roots.length === 1 ? "Raíz doble: x = " + tidy(roots[0].x)
    : "Raíces: " + tidy(roots[0].x) + " y " + tidy(roots[1].x);
  const opening = a > 0 ? "Hacia arriba" : "Hacia abajo";
  const reset = () => { setAIndex(5); setH(2); setK(-1); };

  return (
    <section className="formula-card zqh-lab" aria-label="Simulador de funciones cuadráticas">
      <div className="zqh-heading">
        <h2>Explora la parábola</h2>
        <button type="button" className="zqh-reset" onClick={reset}
          aria-label="Restablecer la función cuadrática inicial">Reiniciar <span aria-hidden="true">↺</span></button>
      </div>

      <div className="zqh-equations">
        <div className="zqh-equation-primary">
          <span className="zqh-equation-label">Función</span>
          <MathFormula source={equation} displayMode={false} className="zqh-math" />
        </div>
        {vertexEquation !== equation && (
          <div className="zqh-equation-secondary">
            <span className="zqh-equation-label">Forma de vértice</span>
            <MathFormula source={vertexEquation} displayMode={false} className="zqh-math" />
          </div>
        )}
      </div>

      <svg className="zqh-plot" viewBox="0 0 620 294" role="img"
        aria-label={"Plano cartesiano de la función cuadrática, con a igual a " + tidy(a) +
          ", h igual a " + tidy(h) + " y k igual a " + tidy(k) +
          ". Vértice en " + tidy(h) + ", " + tidy(k) +
          ". Abre " + (a > 0 ? "hacia arriba" : "hacia abajo") + ". " + rootSummary + "."}>
        <title>Plano cartesiano y parábola</title>
        <desc>Las cuadrículas, ejes numerados y curva corresponden a y igual a a por x menos h al cuadrado más k. Actualízalos con los deslizadores.</desc>
        <defs>
          <clipPath id="zqh-plot-clip">
            <rect x={PLOT.left} y={PLOT.top} width={PLOT.width} height={PLOT.height} rx="7"/>
          </clipPath>
        </defs>
        <rect className="zqh-plot-paper" x={PLOT.left} y={PLOT.top}
          width={PLOT.width} height={PLOT.height} rx="7" />
        <g className="zqh-grid">
          {graph.yTicks.map((tick) => (
            <line key={"gy-" + tick} x1={PLOT.left} x2={PLOT.left + PLOT.width}
              y1={graph.yToPixel(tick)} y2={graph.yToPixel(tick)} />
          ))}
          {graph.ticks.map((tick) => (
            <line key={"gx-" + tick} x1={graph.xToPixel(tick)} x2={graph.xToPixel(tick)}
              y1={PLOT.top} y2={PLOT.top + PLOT.height} />
          ))}
        </g>
        <g className="zqh-axes">
          <line x1={PLOT.left} x2={PLOT.left + PLOT.width}
            y1={graph.xAxisY} y2={graph.xAxisY} />
          {graph.yAxisX !== null && (
            <line x1={graph.yAxisX} x2={graph.yAxisX}
              y1={PLOT.top} y2={PLOT.top + PLOT.height} />
          )}
        </g>
        <g clipPath="url(#zqh-plot-clip)">
          <line className="zqh-symmetry" x1={graph.vertex.px} x2={graph.vertex.px}
            y1={PLOT.top} y2={PLOT.top + PLOT.height} />
          <path className="zqh-curve" d={graph.d} fill="none"
            strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
          {roots.map((root, i) => (
            <circle className="zqh-root" key={"root-" + i} cx={root.px} cy={root.py} r="5.4" />
          ))}
          <circle className="zqh-vertex" cx={graph.vertex.px} cy={graph.vertex.py} r="7.2" />
        </g>
        <g className="zqh-axis-values">
          {graph.ticks.map((tick) => (
            <text key={"x-" + tick} x={graph.xToPixel(tick)}
              y={PLOT.top + PLOT.height + 21} textAnchor="middle">{tidy(tick)}</text>
          ))}
          {graph.yTicks.map((tick) => (
            <text key={"y-" + tick} x={PLOT.left - 12}
              y={graph.yToPixel(tick) + 4.5} textAnchor="end">{tidy(tick)}</text>
          ))}
        </g>
        <text className="zqh-axis-name" x={PLOT.left + PLOT.width + 12}
          y={PLOT.top + PLOT.height - 2}>x</text>
        <text className="zqh-axis-name" x={PLOT.left + 8} y={PLOT.top + 16}>y</text>
        <text className="zqh-vertex-label" x={graph.vertex.px + 12}
          y={graph.vertex.py + (a > 0 ? -12 : 21)}>
          {"V(" + tidy(h) + ", " + tidy(k) + ")"}
        </text>
      </svg>

      <div className="zqh-controls" aria-label="Parámetros de la función">
        <label className="zqh-control">
          <span>Curvatura <b>a = {tidy(a)}</b></span>
          <input type="range" min={0} max={QUADRATIC_A_VALUES.length - 1}
            step={1} value={aIndex} onChange={(event) => setAIndex(Number(event.target.value))}
            aria-label="Coeficiente a: apertura y concavidad" aria-valuetext={tidy(a)} />
        </label>
        <label className="zqh-control">
          <span>Horizontal <b>h = {tidy(h)}</b></span>
          <input type="range" min={-3} max={3} step={0.5}
            value={h} onChange={(event) => setH(Number(event.target.value))}
            aria-label="Desplazamiento horizontal h" />
        </label>
        <label className="zqh-control">
          <span>Vertical <b>k = {tidy(k)}</b></span>
          <input type="range" min={-3} max={3} step={0.5}
            value={k} onChange={(event) => setK(Number(event.target.value))}
            aria-label="Desplazamiento vertical k" />
        </label>
      </div>

      <div className="zqh-readout" aria-live="polite" aria-atomic="true">
        <span><strong>Vértice</strong> ({tidy(h)}, {tidy(k)})</span>
        <span><strong>Concavidad</strong> {opening}</span>
        <span><strong>Raíces</strong> {rootSummary.replace(/^Raíces: /, "")}</span>
      </div>
    </section>
  );
}
