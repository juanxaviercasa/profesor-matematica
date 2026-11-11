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
  },
  "sistemas-de-medidas-angulares-ii-1sec-unidad2": {
    heading: "Comparar sistemas de medida angular",
    principles: [
      "La medida sexagesimal divide una vuelta en 360°, la centesimal en 400 grados centesimales y la medida radial en 2π radianes.",
      "Las conversiones conservan la amplitud del ángulo: 180° equivalen a 200 grados centesimales y π radianes.",
      "Para convertir un ángulo expresado en grados centesimales a sexagesimales, multiplícalo por 9/10; para convertir sexagesimales a radianes, multiplica por π/180."
    ],
    activity: "Convierte 50 grados centesimales a grados sexagesimales y a radianes; explica la proporción utilizada."
  },
  "tabla-de-dist-de-frec-para-datos-sin-agrupar-1sec-unidad2": {
    heading: "Organizar recuentos en una tabla",
    principles: [
      "Los datos sin agrupar se registran individualmente; cada valor distinto se anota una vez en la columna de valores.",
      "La frecuencia absoluta fᵢ cuenta cuántas veces aparece un dato. La suma de las frecuencias absolutas debe ser igual al número total de observaciones.",
      "La frecuencia relativa de un valor es su frecuencia absoluta dividida entre el total; todas las frecuencias relativas suman 1."
    ],
    activity: "Ordena los datos 2, 2, 3, 4, 4 y 4. Construye una tabla de valores, frecuencias absolutas y frecuencias relativas."
  },
  "tabla-de-distribucion-de-frecuencias-para-datos-sin-agrupar-1sec-unidad2": {
    heading: "Interpretar frecuencias de datos individuales",
    principles: [
      "Primero identifica los valores distintos del conjunto de datos y cuenta sus repeticiones.",
      "La frecuencia acumulada suma las frecuencias absolutas hasta cada valor en orden; su último valor coincide con el total n.",
      "El porcentaje correspondiente a un valor es 100 multiplicado por su frecuencia relativa. Comprueba que los porcentajes sumen 100 %."
    ],
    activity: "Para 1, 2, 2, 3, 3 y 3, determina las frecuencias absoluta, acumulada y porcentual de cada valor."
  },
  "congruencia-de-triangulos-1sec-unidad3": {
    heading: "Reconocer triángulos congruentes",
    principles: [
      "Dos triángulos son congruentes cuando sus lados y ángulos correspondientes tienen la misma medida.",
      "El criterio LLL establece que tres pares de lados correspondientes iguales garantizan congruencia.",
      "También son criterios válidos LAL (dos lados y el ángulo comprendido) y ALA (dos ángulos y el lado comprendido). La correspondencia de vértices debe mantenerse."
    ],
    activity: "Dibuja dos triángulos con lados de 3 cm, 4 cm y 5 cm, y explica qué criterio justifica su congruencia."
  },
  "criptoaritmetica-ii-1sec-unidad3": {
    heading: "Resolver cifras ocultas con restricciones",
    principles: [
      "Cada letra representa siempre la misma cifra y las letras distintas representan cifras distintas.",
      "El valor de un número de dos cifras AB es 10A + B; un dígito inicial no puede ser cero.",
      "Descompón la operación por valor posicional, analiza las llevadas y verifica que la sustitución satisface todas las igualdades."
    ],
    activity: "En AB + BA = 99 con A = 4, encuentra B y verifica la suma."
  },
  "grafico-de-barras-1sec-unidad3": {
    heading: "Representar frecuencias mediante un gráfico de barras",
    principles: [
      "El gráfico de barras representa categorías o valores discretos; cada barra tiene una altura proporcional a su frecuencia.",
      "En el eje horizontal se ubican las categorías y en el eje vertical una escala numérica uniforme que comienza habitualmente en cero para evitar distorsiones.",
      "Las barras deben tener ancho uniforme y separación visible. Antes de interpretar una gráfica, comprueba las etiquetas, la escala y la frecuencia de cada categoría."
    ],
    activity: "Con los datos 2, 3, 3, 4, 4, 4, construye un gráfico de barras y explica por qué la barra del 4 es la más alta."
  },
  "cuadrados-magicos-1sec-unidad3": {
    heading: "Comprender sumas en un cuadrado mágico",
    principles: [
      "En un cuadrado mágico, cada fila, columna y diagonal principal tiene la misma suma, denominada constante mágica.",
      "En el cuadrado mágico normal de 3 × 3 se colocan los números del 1 al 9 sin repetir, cuya suma total es 45.",
      "Como hay tres filas con la misma suma, cada fila debe sumar 45/3 = 15. Comprueba también columnas y diagonales."
    ],
    activity: "Explica por qué la suma mágica del cuadrado normal 3 × 3 es 15 y verifica una fila de un ejemplo."
  }
};

/**
 * Ejercicios originales redactados para acompañar lecciones publicadas sin
 * ejercicios extraídos. No son respuestas ni reconstrucciones del libro.
 * Cada procedimiento y respuesta puede verificarse independientemente.
 */
export type OriginalPractice = {
  title: string;
  statement: string;
  steps: string[];
  answer: string;
};
export const LESSON_ORIGINAL_PRACTICE: Record<string, OriginalPractice> = {
  "expresion-algebraica-1sec-unidad1": {
    title: "Reducir términos semejantes",
    statement: "Simplifica 4x + 3x − 2x.",
    steps: ["Los tres términos contienen la misma parte literal x.", "Suma sus coeficientes: 4 + 3 − 2 = 5.", "Conserva la variable x."],
    answer: "5x"
  },
  "nociones-basicas-de-geometria-1sec-unidad1": {
    title: "Sumar segmentos consecutivos",
    statement: "B está entre A y C, AB = 4 cm y BC = 7 cm. ¿Cuánto mide AC?",
    steps: ["Si B está entre A y C, la adición de segmentos da AC = AB + BC.", "Sustituye las longitudes: AC = 4 + 7 = 11 cm."],
    answer: "11 cm"
  },
  "secuencia-de-figuras-1sec-unidad1": {
    title: "Identificar el patrón de crecimiento",
    statement: "Una sucesión de dibujos tiene 1, 3, 5 y 7 cuadrados. ¿Cuántos tendrá el siguiente dibujo si la regla se mantiene?",
    steps: ["Compara figuras consecutivas: de una a otra se agregan 2 cuadrados.", "Añade 2 al cuarto término: 7 + 2 = 9."],
    answer: "9 cuadrados"
  },
  "criptoaritmetica-1-1sec-unidad2": {
    title: "Aplicar el valor posicional",
    statement: "Si AB + BA = 99 y A = 4, ¿qué cifra representa B? Las letras representan cifras diferentes.",
    steps: ["AB = 10A + B y BA = 10B + A.", "Por tanto, 11A + 11B = 99, así que A + B = 9.", "Como A = 4, B = 5; comprueba: 45 + 54 = 99."],
    answer: "B = 5"
  },
  "sistemas-de-medidas-angulares-ii-1sec-unidad2": {
    title: "Convertir una medida centesimal",
    statement: "Convierte 50 grados centesimales a grados sexagesimales.",
    steps: ["200 grados centesimales equivalen a 180°.", "Multiplica por 180/200: 50 × 180/200 = 45°."],
    answer: "45°"
  },
  "tabla-de-dist-de-frec-para-datos-sin-agrupar-1sec-unidad2": {
    title: "Determinar frecuencias absolutas",
    statement: "En los datos 2, 2, 3, 4, 4 y 4, ¿cuáles son las frecuencias absolutas de 2, 3 y 4?",
    steps: ["Cuenta las apariciones de cada valor: el 2 aparece dos veces.", "El 3 aparece una vez y el 4 aparece tres veces.", "Comprueba que 2 + 1 + 3 = 6 observaciones."],
    answer: "f(2) = 2, f(3) = 1, f(4) = 3"
  },
  "tabla-de-distribucion-de-frecuencias-para-datos-sin-agrupar-1sec-unidad2": {
    title: "Calcular una frecuencia porcentual",
    statement: "En los datos 1, 2, 2, 3, 3 y 3, ¿qué porcentaje corresponde al valor 3?",
    steps: ["Hay 6 datos en total y el valor 3 aparece 3 veces.", "La frecuencia relativa es 3/6 = 1/2.", "Multiplica por 100 para expresar el resultado como porcentaje."],
    answer: "50 %"
  },
  "congruencia-de-triangulos-1sec-unidad3": {
    title: "Elegir un criterio de congruencia",
    statement: "Dos triángulos tienen lados correspondientes de 3 cm, 4 cm y 5 cm. ¿Son congruentes y por qué?",
    steps: ["Compara los tres pares de lados correspondientes.", "Los tres pares tienen longitudes iguales.", "Se cumple el criterio LLL (lado-lado-lado)."],
    answer: "Sí, por el criterio LLL."
  },
  "criptoaritmetica-ii-1sec-unidad3": {
    title: "Comprobar una igualdad con cifras",
    statement: "AB + BA = 99 y A = 4. Determina B, sin repetir una cifra en letras diferentes.",
    steps: ["Expresa la suma como 11A + 11B = 99.", "Divide entre 11: A + B = 9.", "Sustituye A = 4, entonces B = 5. Comprueba: 45 + 54 = 99."],
    answer: "B = 5"
  },
  "cuadrados-magicos-1sec-unidad3": {
    title: "Obtener la constante mágica",
    statement: "En un cuadrado mágico normal de 3 × 3, se usan los números del 1 al 9 una sola vez. ¿Cuánto debe sumar cada fila?",
    steps: ["La suma de los números del 1 al 9 es 45.", "Las tres filas tienen la misma suma.", "Divide el total entre 3: 45/3 = 15."],
    answer: "15"
  }
};

/** Asociaciones temáticas confirmadas sin alterar las URL del catálogo. */
export const LESSON_ENGINE_OVERRIDES: Record<string, "GeometryInteractiveLab" | "StatisticsProbabilityLab"> = {
  "nociones-basicas-de-geometria-1sec-unidad1": "GeometryInteractiveLab",
  "tabla-de-dist-de-frec-para-datos-sin-agrupar-1sec-unidad2": "StatisticsProbabilityLab",
};
