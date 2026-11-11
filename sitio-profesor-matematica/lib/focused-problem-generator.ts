/**
 * Variantes de práctica coherentes con ocho laboratorios especializados.
 * Funciones puras: el resultado se deriva de los datos, no de claves de libros.
 */
import type { FocusedLabKind } from "./focused-lesson-topics";

export type FocusedProblem = {
  seed: number;
  statement: string;
  options: string[];
  correctIndex: number;
  steps: string[];
};

export function buildFocusedProblem(kind: FocusedLabKind, seed: number): FocusedProblem {
  if (!Number.isSafeInteger(seed) || seed < 0) throw Error("Semilla inválida");
  let statement = "";
  let answer = "";
  let distractors: string[] = [];
  let steps: string[] = [];
  switch (kind) {
    case "segments": {
      const ab = 3 + seed % 6;
      const bc = 2 + Math.floor(seed / 3) % 5;
      const ac = ab + bc;
      statement = "B está entre A y C sobre una recta. Si AB = " + ab +
        " cm y BC = " + bc + " cm, determina la longitud AC.";
      answer = "AC = " + ac + " cm";
      distractors = [ac + 1,ac + 2,ac - 1,ac - 2].map(n => "AC = " + n + " cm");
      steps = [
        "Si B está entre A y C, las longitudes cumplen AC = AB + BC.",
        "Sustituimos las medidas: AC = " + ab + " + " + bc + ".",
        "Por tanto, AC = " + ac + " cm."
      ];
      break;
    }
    case "congruence": {
      const factorPercent = [60,80,100,120,140][seed % 5];
      const k = factorPercent / 100;
      const lengths = [3,4,5].map(n => Number((n*k).toFixed(2)));
      const isCongruent = k === 1;
      statement = "El triángulo A tiene lados 3, 4 y 5 cm. El triángulo B tiene lados " +
        lengths.join(", ") + " cm, respectivamente. ¿Cuál es la relación entre ambos triángulos?";
      answer = isCongruent ? "Son congruentes por LLL" : "Son semejantes, pero no congruentes";
      distractors = [
        "Son congruentes por LLL",
        "Son semejantes, pero no congruentes",
        "No son semejantes",
        "Son congruentes por compartir un solo ángulo",
        "No se puede decidir conociendo sus tres lados"
      ].filter(x => x !== answer).slice(0,4);
      steps = [
        "Comparamos los cocientes de los lados correspondientes: " +
          lengths[0] + "/3 = " + lengths[1] + "/4 = " + lengths[2] + "/5 = " + k + ".",
        "Si el factor de escala es 1, coinciden las tres longitudes y se cumple LLL.",
        isCongruent
          ? "Como el factor es 1, son congruentes por LLL."
          : "El factor es " + k + ", distinto de 1. Son semejantes, pero NO congruentes."
      ];
      break;
    }
    case "parallel": {
      const alpha = 35 + (seed % 12) * 10;
      const beta = 180 - alpha;
      statement = "Dos rectas paralelas son cortadas por una secante. Un ángulo interior " +
        "del mismo lado mide " + alpha + "°. ¿Cuánto mide su ángulo colateral interno?";
      answer = beta + "°";
      distractors = [beta+10,beta+20,beta-10,beta-20].map(n=>n+"°");
      steps = [
        "Los ángulos colaterales internos de dos paralelas son suplementarios.",
        "Por ello, α + β = 180°. Despejamos β = 180° − " + alpha + "°.",
        "El ángulo buscado mide " + beta + "°."
      ];
      break;
    }
    case "cryptarithm": {
      const a = 1 + seed % 8;
      const b = 9 - a;
      statement = "En la criptoaritmética AB + BA = 99, las letras son cifras diferentes " +
        "y A = " + a + ". Determina B (no se permiten ceros iniciales).";
      answer = "B = " + b;
      distractors = Array.from({length:10},(_,n)=>n)
        .filter(n=>n!==b && n!==0)
        .slice(0,4).map(n=>"B = "+n);
      steps = [
        "Por valor posicional, AB = 10A + B y BA = 10B + A.",
        "Entonces 11(A + B) = 99 y se obtiene A + B = 9.",
        "B = 9 − " + a + " = " + b + "; comprobación: " +
          (10*a+b) + " + " + (10*b+a) + " = 99."
      ];
      break;
    }
    case "square": {
      const increase = 1 + seed % 5;
      const sum = 15 + 3 * increase;
      statement = "Partimos de un cuadrado mágico normal 3 × 3, en el que cada " +
        "fila suma 15. Si sumamos " + increase + " a CADA celda, " +
        "¿cuál es la nueva suma común de cada fila, columna y diagonal?";
      answer = sum.toString();
      distractors = [sum+1,sum+2,sum-1,sum-2].map(String);
      steps = [
        "El cuadrado original tiene tres celdas en cada fila, columna y diagonal.",
        "Al sumar " + increase + " a cada celda de una línea, la suma aumenta 3 × " +
          increase + " = " + (3*increase) + ".",
        "La nueva suma común es 15 + " + (3*increase) + " = " + sum + "."
      ];
      break;
    }
    case "sequence": {
      const n = 3 + seed % 7;
      const count = 2 * n - 1;
      statement = "Una secuencia de figuras contiene 1, 3, 5, 7, ... cuadrados. " +
        "Si la regla continúa, ¿cuántos cuadrados tendrá la figura " + n + "?";
      answer = count + " cuadrados";
      distractors = [count+2,count+4,count-2,count-4].map(v=>v+" cuadrados");
      steps = [
        "Cada figura contiene dos cuadrados más que la anterior.",
        "La cantidad de cuadrados de la figura n sigue la regla 2n − 1.",
        "Para n = " + n + ": 2 × " + n + " − 1 = " + count + " cuadrados."
      ];
      break;
    }
    case "expression": {
      const a = 3 + seed % 4;
      const b = 2 + Math.floor(seed/3) % 5;
      const c = 1 + Math.floor(seed/5) % 2;
      const result = a + b - c;
      statement = "Reduce los términos semejantes: " + a + "x + " + b + "x − " + c + "x.";
      answer = result + "x";
      distractors = [result+1,result+2,result-1,result-2].map(n=>n+"x");
      steps = [
        "Todos los términos contienen la misma parte literal x, por eso son semejantes.",
        "Sumamos sus coeficientes: " + a + " + " + b + " − " + c + " = " + result + ".",
        "Conservando la variable, la expresión simplificada es " + result + "x."
      ];
      break;
    }
    case "frequency": {
      const f2 = 2 + Math.floor(seed/3) % 3;
      const f3 = 1 + seed % 4;
      const f4 = 1 + Math.floor(seed/5) % 3;
      const n = f2 + f3 + f4;
      const data = [...Array(f2).fill(2),...Array(f3).fill(3),...Array(f4).fill(4)];
      statement = "En el conjunto de datos sin agrupar {" + data.join(", ") + "}, " +
        "indica la frecuencia absoluta del valor 3 y el total de datos.";
      answer = "f(3) = " + f3 + "; n = " + n;
      distractors = [
        "f(3) = " + (f3+1) + "; n = " + n,
        "f(3) = " + f3 + "; n = " + (n+1),
        "f(3) = " + f2 + "; n = " + (n+2),
        "f(3) = " + (f3+2) + "; n = " + n
      ];
      steps = [
        "Contamos las apariciones del valor 3: f(3) = " + f3 + ".",
        "El total de observaciones es " + f2 + " + " + f3 + " + " + f4 + " = " + n + ".",
        "Comprobamos que la suma de las frecuencias absolutas coincide con el total n = " + n + "."
      ];
      break;
    }
    default: {
      const never: never = kind;
      throw Error("Familia temática desconocida: " + never);
    }
  }
  const correctIndex=seed%5;
  const values=[...distractors];
  if(values.length!==4 || new Set([answer,...values]).size!==5)
    throw Error("Opciones no distinguibles para " + kind + "/" + seed);
  let d=0;
  return {
    seed,statement,correctIndex,steps,
    options:Array.from({length:5},(_,i)=>
      String.fromCharCode(97+i)+". "+(i===correctIndex?answer:values[d++]))
  };
}
