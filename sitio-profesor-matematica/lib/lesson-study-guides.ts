/**
 * Guías complementarias redactadas para lecciones publicadas cuya extracción
 * no incluyó teoría. No se presentan como transcripción del libro original.
 * No contienen claves de respuesta ni afirmaciones de revisión editorial externa.
 */
export type LessonStudyGuide = { heading: string; principles: string[]; activity: string };
export const LESSON_STUDY_GUIDES: Record<string, LessonStudyGuide> = {
  "conjuntos-1sec-unidad1": {
    "heading": "Reconocer conjuntos y sus relaciones",
    "principles": [
      "Un conjunto reúne elementos bien definidos. La notación x ∈ A significa que x pertenece a A.",
      "La unión A ∪ B agrupa elementos que pertenecen a A, a B o a ambos; la intersección A ∩ B reúne únicamente los comunes.",
      "Para contar una unión de dos conjuntos finitos, suma sus cantidades y resta la intersección para no contar dos veces los elementos compartidos."
    ],
    "activity": "Dibuja dos conjuntos con un elemento común y comprueba cuántos elementos hay en su unión."
  },
  "expresion-algebraica-1sec-unidad1": {
    "heading": "Identificar las partes de una expresión",
    "principles": [
      "Una expresión algebraica combina números, variables y operaciones. Por ejemplo, 3x² − 2x + 5 es un polinomio.",
      "En 3x², el coeficiente es 3, la variable es x y el exponente es 2.",
      "Los términos semejantes tienen la misma parte literal y exponentes; por ejemplo, 3x + 2x = 5x."
    ],
    "activity": "Separa coeficiente, variable y exponente de cada término; después simplifica 4x + 3x − 2x."
  },
  "nociones-basicas-de-geometria-1sec-unidad1": {
    "heading": "Puntos, rectas y segmentos",
    "principles": [
      "Un punto indica una posición. Una recta se extiende indefinidamente en dos sentidos; una semirrecta tiene origen y se extiende en un solo sentido.",
      "El segmento AB está limitado por dos extremos, A y B. Su longitud es una medida no negativa.",
      "Si B está entre A y C sobre una recta, entonces las longitudes cumplen AB + BC = AC."
    ],
    "activity": "Dibuja tres puntos colineales A, B y C, con B entre A y C; elige dos longitudes y calcula la tercera."
  },
  "psicotonico-secuencia-de-figuras-1sec-unidad1": {
    "heading": "Observar regularidades en figuras",
    "principles": [
      "Para completar una secuencia, compara de una figura a la siguiente la forma, la orientación, la cantidad y la posición de los elementos.",
      "Una pauta puede consistir en añadir elementos, rotar, alternar colores o combinar varias transformaciones. No supongas una regla sin comprobarla.",
      "Para justificar una respuesta, muestra que la regla elegida explica al menos dos transiciones consecutivas."
    ],
    "activity": "Esboza tres figuras con una misma transformación y escribe la regla que permitiría construir la cuarta."
  },
  "angulos-formados-por-2-rectas-paralelas-y-1-secante-1sec-unidad2": {
    "heading": "Relacionar ángulos de paralelas y secante",
    "principles": [
      "Una secante corta a dos rectas. Si las rectas son paralelas, los ángulos correspondientes son iguales.",
      "Los ángulos alternos internos también son iguales cuando las rectas son paralelas.",
      "Los ángulos interiores del mismo lado de la secante suman 180°."
    ],
    "activity": "Traza dos paralelas y una secante. Señala un ángulo de 65° y calcula otro correspondiente y uno interior del mismo lado."
  },
  "criptoaritmetica-1sec-unidad2": {
    "heading": "Resolver operaciones con cifras ocultas",
    "principles": [
      "En una criptoaritmética, cada símbolo representa una cifra. Si se repite un mismo símbolo, representa la misma cifra.",
      "Comienza por la columna de las unidades; anota las llevadas antes de pasar a decenas o centenas.",
      "Una cifra inicial de un número de varias cifras no puede ser cero. Comprueba la suma o resta completa al terminar."
    ],
    "activity": "Si A + 7 = 12, encuentra A y explica qué ocurriría al escribir la operación en una columna de unidades."
  },
  "criptoaritmetica-i-1sec-unidad2": {
    "heading": "Usar valor posicional y llevadas",
    "principles": [
      "El número de tres cifras abc representa 100a + 10b + c, con a diferente de cero.",
      "En sumas por columnas, el resultado de las unidades determina la cifra final y la posible llevada a decenas.",
      "Sustituye todos los símbolos por sus cifras y comprueba que la igualdad se cumple sin repetir valores indebidamente."
    ],
    "activity": "Representa en forma desarrollada un número de tres cifras y explica cómo cambia si se intercambian decenas y unidades."
  },
  "operaciones-con-polinomios-1sec-unidad2": {
    "heading": "Sumar, restar y multiplicar polinomios",
    "principles": [
      "Para sumar o restar polinomios, agrupa términos semejantes: aquellos que tienen la misma potencia de cada variable.",
      "Al multiplicar, aplica la propiedad distributiva a cada término y reduce los semejantes al final.",
      "Comprueba una identidad sustituyendo un valor sencillo de x en ambos miembros."
    ],
    "activity": "Calcula (2x + 3) + (x − 5) y comprueba el resultado para x = 2."
  },
  "sistemas-de-medidas-angulares-i-1sec-unidad2": {
    "heading": "Convertir medidas de ángulos",
    "principles": [
      "Una vuelta completa equivale a 360° sexagesimales, 400 grados centesimales o 2π radianes.",
      "Un ángulo llano mide 180°, 200 grados centesimales o π radianes.",
      "Para convertir, utiliza la proporción S/180 = C/200 = R/π, donde cada letra corresponde a un sistema."
    ],
    "activity": "Convierte un ángulo de 90° a grados centesimales y radianes; comprueba que representa un cuarto de vuelta."
  }
};

/** Asociaciones temáticas confirmadas sin alterar las URL del catálogo. */
export const LESSON_ENGINE_OVERRIDES: Record<string, "GeometryInteractiveLab" | "StatisticsProbabilityLab"> = {
  "nociones-basicas-de-geometria-1sec-unidad1": "GeometryInteractiveLab",
  "tabla-de-dist-de-frec-para-datos-sin-agrupar-1sec-unidad2": "StatisticsProbabilityLab",
};
