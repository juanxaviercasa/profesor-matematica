/**
 * Pure geometry for the public quadratic demonstration.
 * The curve is sampled from y = a(x-h)^2 + k; never a decorative Bézier.
 * Shared with scripts/check-quadratic-hero.mjs.
 */
export const QUADRATIC_A_VALUES = Object.freeze([-2, -1.5, -1, -0.5, 0.5, 1, 1.5, 2]);

export function tidy(value) {
  return Math.abs(value) < 1e-9 ? "0" : String(Number(value.toFixed(2)));
}

export function quadraticY(a, h, k, x) {
  if (!Number.isFinite(a) || a === 0 || ![h, k, x].every(Number.isFinite)) {
    throw new RangeError("Una función cuadrática requiere a distinto de cero y parámetros finitos.");
  }
  return a * (x - h) ** 2 + k;
}

export function quadraticRoots(a, h, k) {
  if (a === 0) throw new RangeError("El coeficiente a no puede ser cero.");
  const square = -k / a;
  if (square < -1e-9) return [];
  if (Math.abs(square) < 1e-9) return [h];
  const delta = Math.sqrt(square);
  return [h - delta, h + delta];
}

export function expandedCoefficients(a, h, k) {
  return { a, b: -2 * a * h, c: a * h * h + k };
}

function signedTerm(coefficient, term) {
  if (Math.abs(coefficient) < 1e-9) return "";
  const sign = coefficient < 0 ? "-" : "+";
  const magnitude = Math.abs(coefficient);
  return sign + (term && magnitude === 1 ? "" : tidy(magnitude)) + term;
}

export function expandedLatex(a, h, k) {
  const { b, c } = expandedCoefficients(a, h, k);
  const leading = (a === 1 ? "" : a === -1 ? "-" : tidy(a)) + "x^{2}";
  return "f(x)=" + leading + signedTerm(b, "x") + signedTerm(c, "");
}

export function vertexLatex(a, h, k) {
  const prefix = a === 1 ? "" : a === -1 ? "-" : tidy(a);
  const inside = h === 0 ? "x" : "(x" + (h > 0 ? "-" : "+") + tidy(Math.abs(h)) + ")";
  return "f(x)=" + prefix + inside + "^{2}" + signedTerm(k, "");
}

export const PLOT = Object.freeze({ left: 61, top: 22, width: 527, height: 280 });

function niceTickStep(range, wanted = 5) {
  const raw = Math.max(range / wanted, 1e-9);
  const magnitude = 10 ** Math.floor(Math.log10(raw));
  return [1, 2, 2.5, 5, 10].map((step) => step * magnitude)
    .find((step) => step >= raw) ?? 10 * magnitude;
}

function ticksBetween(min, max, step) {
  const ticks = [];
  const first = Math.ceil((min - 1e-9) / step);
  const last = Math.floor((max + 1e-9) / step);
  for (let i = first; i <= last && ticks.length < 20; i++) {
    ticks.push(Number((i * step).toFixed(6)));
  }
  return ticks;
}

/** A Cartesian viewport that always includes x/y axes, the vertex and real roots. */
export function quadraticPlot(a, h, k) {
  if (!Number.isFinite(a) || a === 0 || !Number.isFinite(h) || !Number.isFinite(k)) {
    throw new RangeError("Se necesita una cuadrática con parámetros finitos y a distinto de cero.");
  }
  const xMin = h - 3, xMax = h + 3;
  const edge = quadraticY(a, h, k, h + 3);
  const yLow = Math.min(0, k, edge);
  const yHigh = Math.max(0, k, edge);
  const pad = Math.max(1.6, Math.abs(a) * 1.35);
  const yMin = yLow - pad, yMax = yHigh + pad;
  const xToPixel = (x) => PLOT.left + (x - xMin) / (xMax - xMin) * PLOT.width;
  const yToPixel = (y) => PLOT.top + (yMax - y) / (yMax - yMin) * PLOT.height;
  const points = Array.from({ length: 151 }, (_, i) => {
    const x = xMin + (xMax - xMin) * i / 150;
    return { x, y: quadraticY(a, h, k, x) };
  });
  const d = points.map((p, i) =>
    (i ? "L" : "M") + xToPixel(p.x).toFixed(2) + " " + yToPixel(p.y).toFixed(2)
  ).join(" ");
  const yStep = niceTickStep(yMax - yMin, 6);
  const roots = quadraticRoots(a,h,k)
    .filter((x) => x >= xMin - 1e-7 && x <= xMax + 1e-7)
    .map((x) => ({ x, px: xToPixel(x), py: yToPixel(0) }));
  return {
    xMin, xMax, yMin, yMax, d, points,
    vertex: { x: h, y: k, px: xToPixel(h), py: yToPixel(k) },
    xAxisY: yToPixel(0),
    yAxisX: xMin <= 0 && xMax >= 0 ? xToPixel(0) : null,
    roots,
    ticks: ticksBetween(xMin, xMax, 1),
    yTicks: ticksBetween(yMin, yMax, yStep),
    xToPixel, yToPixel,
  };
}
