"use client";

import { useMemo, useState } from "react";
import { MathFormula } from "@/components/math-formula";
import {
  QUADRATIC_A_VALUES, PLOT, tidy, quadraticPlot,
  expandedLatex, vertexLatex,
} from "@/lib/quadratic-hero.mjs";

/**
 * Mini laboratorio real: el SVG deriva de la función cuadrática,
 * en lugar de dibujar una campana decorativa que contradiga la fórmula.
 */
export function QuadraticHeroLab() {
  const [aIndex, setAIndex] = useState(5); // a = 1
  const [h, setH] = useState(2);
  const [k, setK] = useState(-1);
  const a = QUADRATIC_A_VALUES[aIndex];
  const graph = useMemo(() => quadraticPlot(a, h, k), [a, h, k]);
  const equation = useMemo(() => expandedLatex(a, h, k), [a, h, k]);
  const vertexEquation = useMemo(() => vertexLatex(a, h, k), [a, h, k]);
  const roots = graph.roots;
  const rootSummary = roots.length === 0
    ? "Sin raíces reales"
    : roots.length === 1
      ? "Raíz doble: x = " + tidy(roots[0].x)
      : "Raíces: " + tidy(roots[0].x) + " y " + tidy(roots[1].x);
  const opening = a > 0 ? "Abre hacia arriba" : "Abre hacia abajo";
  const reset = () => { setAIndex(5); setH(2); setK(-1); };

  return (
    <section className="formula-card zqh-lab" aria-label="Simulador interactivo de funciones cuadráticas">
      <div className="zqh-heading">
        <h2>Explora la parábola</h2>
        <button type="button" className="zqh-reset" onClick={reset}
          aria-label="Restablecer función cuadrática original">Reiniciar ↺</button>
      </div>

      <div className="zqh-equations">
        <div className="zqh-equation-primary">
          <span className="zqh-equation-label">Forma desarrollada</span>
          <MathFormula source={equation} displayMode={false} className="zqh-math" />
        </div>
        <div className="zqh-equation-secondary">
          <span className="zqh-equation-label">Forma de vértice</span>
          <MathFormula source={vertexEquation} displayMode={false} className="zqh-math" />
        </div>
      </div>

      <svg className="zqh-plot" viewBox="0 0 520 290" role="img"
        aria-label={"Gráfica de la función cuadrática: a igual a " + tidy(a) +
          ", h igual a " + tidy(h) + ", k igual a " + tidy(k) +
          ". Vértice en " + tidy(h) + ", " + tidy(k) +
          ". " + opening + ". " + rootSummary + "."}>
        <title>Gráfica cartesiana exacta de una función cuadrática</title>
        <desc>La curva se calcula a partir de y = a(x-h)²+k. Los controles actualizan la gráfica, las raíces y el vértice.</desc>
        <defs>
          <linearGradient id="zqh-curve-gradient" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#B49AFF" />
            <stop offset="100%" stopColor="#E8BC71" />
          </linearGradient>
          <clipPath id="zqh-plot-clip">
            <rect x={PLOT.left} y={PLOT.top} width={PLOT.width} height={PLOT.height} rx="9" />
          </clipPath>
        </defs>
        <rect x={PLOT.left} y={PLOT.top} width={PLOT.width} height={PLOT.height}
          rx="9" fill="#21183F" stroke="#685688" strokeWidth="1" />
        <g stroke="#9785BF" strokeOpacity=".22" strokeWidth="1">
          {Array.from({ length: 5 }, (_, i) => (
            <line key={"g-y-" + i} x1={PLOT.left} x2={PLOT.left + PLOT.width}
              y1={PLOT.top + PLOT.height * i / 4}
              y2={PLOT.top + PLOT.height * i / 4} />
          ))}
          {graph.ticks.map((tick) => (
            <line key={"g-x-" + tick} x1={graph.xToPixel(tick)}
              x2={graph.xToPixel(tick)} y1={PLOT.top}
              y2={PLOT.top + PLOT.height} />
          ))}
        </g>
        {graph.xAxisY !== null && (
          <line x1={PLOT.left} y1={graph.xAxisY} x2={PLOT.left + PLOT.width}
            y2={graph.xAxisY} stroke="#F2ECFF" strokeOpacity=".65" strokeWidth="1.5" />
        )}
        {graph.yAxisX !== null && (
          <line x1={graph.yAxisX} y1={PLOT.top} x2={graph.yAxisX}
            y2={PLOT.top + PLOT.height} stroke="#F2ECFF" strokeOpacity=".65" strokeWidth="1.5" />
        )}
        <g clipPath="url(#zqh-plot-clip)">
          <line x1={graph.vertex.px} y1={PLOT.top} x2={graph.vertex.px}
            y2={PLOT.top + PLOT.height} stroke="#E8BC71"
            strokeWidth="1.4" strokeDasharray="5 5" strokeOpacity=".7" />
          <path d={graph.d} fill="none" stroke="url(#zqh-curve-gradient)"
            strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
          {roots.map((root, i) => (
            <circle key={"root-" + i} cx={root.px} cy={root.py}
              r="5.5" fill="#FFF7E8" stroke="#9D78ED" strokeWidth="2.2" />
          ))}
          <circle cx={graph.vertex.px} cy={graph.vertex.py} r="7.5"
            fill="#E8BC71" stroke="#21183F" strokeWidth="2.5" />
        </g>
        <g fill="#DAD0F0" fontSize="12" fontFamily="system-ui, sans-serif">
          {graph.ticks.map((tick) => (
            <text key={"label-x-" + tick} x={graph.xToPixel(tick)}
              y={PLOT.top + PLOT.height + 17} textAnchor="middle">{tidy(tick)}</text>
          ))}
          <text x={PLOT.left + PLOT.width - 3} y={PLOT.top + PLOT.height + 31}
            textAnchor="end" fill="#F4D8A2">x</text>
          <text x={PLOT.left + 8} y={PLOT.top + 15} fill="#F4D8A2">y</text>
        </g>
        <g fill="#FFE1A2" fontSize="13" fontWeight="700" fontFamily="system-ui, sans-serif">
          <text x={graph.vertex.px + 13}
            y={graph.vertex.py + (a > 0 ? 22 : -11)}>
            {"V(" + tidy(h) + ", " + tidy(k) + ")"}
          </text>
        </g>
      </svg>

      <div className="zqh-controls" aria-label="Parámetros de la función">
        <label className="zqh-control">
          <span>Curvatura <b>a = {tidy(a)}</b></span>
          <input type="range" min={0} max={QUADRATIC_A_VALUES.length - 1}
            step={1} value={aIndex} onChange={(event) => setAIndex(Number(event.target.value))}
            aria-label="Coeficiente a; amplitud y dirección de apertura"
            aria-valuetext={tidy(a)} />
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
        <span><strong>Apertura</strong> {opening}</span>
        <span><strong>Raíces</strong> {rootSummary.replace(/^Raíces: /, "")}</span>
      </div>

    </section>
  );
}
