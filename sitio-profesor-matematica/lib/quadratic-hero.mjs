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

export const PLOT = Object.freeze({ left: 48, top: 20, width: 428, height: 226 });

export function quadraticPlot(a, h, k) {
  if (a === 0) throw new RangeError("Se necesita a distinto de cero.");
  const xMin = h - 3, xMax = h + 3;
  const scale = Math.abs(a);
  const yMin = a > 0 ? k - Math.max(0.75, scale * 2.5) : k - Math.max(3, scale * 10);
  const yMax = a > 0 ? k + Math.max(3, scale * 10) : k + Math.max(0.75, scale * 2.5);
  const xToPixel = (x) => PLOT.left + (x - xMin) / (xMax - xMin) * PLOT.width;
  const yToPixel = (y) => PLOT.top + (yMax - y) / (yMax - yMin) * PLOT.height;
  const points = Array.from({ length: 151 }, (_, i) => {
    const x = xMin + (xMax - xMin) * i / 150;
    return { x, y: quadraticY(a, h, k, x) };
  });
  const d = points.map((p, i) =>
    (i ? "L" : "M") + xToPixel(p.x).toFixed(2) + " " + yToPixel(p.y).toFixed(2)
  ).join(" ");
  return {
    xMin, xMax, yMin, yMax, d, points,
    vertex: { x: h, y: k, px: xToPixel(h), py: yToPixel(k) },
    xAxisY: yMin <= 0 && yMax >= 0 ? yToPixel(0) : null,
    yAxisX: xMin <= 0 && xMax >= 0 ? xToPixel(0) : null,
    roots: quadraticRoots(a, h, k).map((x) => ({ x, px: xToPixel(x), py: yToPixel(0) })),
    ticks: Array.from({ length: Math.floor(xMax) - Math.ceil(xMin) + 1 },
      (_, i) => Math.ceil(xMin) + i).filter((x) => x !== 0),
    xToPixel, yToPixel,
  };
}
