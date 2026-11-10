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
