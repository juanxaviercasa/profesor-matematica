export interface TopicItem {
  id: string;
  title: string;
  slug: string;
  summary: string;
  difficulty: "básico" | "intermedio" | "avanzado" | "reto-uni";
  prerequisites?: string[];
  crossConnections?: {
    area: string;
    course: string;
    topicSlug: string;
    label: string;
  }[];
  keyFormula?: string;
  interactiveType: "grapher" | "socratic" | "simulation" | "geometry" | "balancer";
}

export interface ModuleItem {
  id: string;
  title: string;
  description: string;
  topics: TopicItem[];
}

export interface CourseItem {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  icon: string;
  level: "preuniversitario" | "universitario";
  modules: ModuleItem[];
}

export interface AreaItem {
  id: string;
  slug: string;
  title: string;
  badge: string;
  description: string;
  courses: CourseItem[];
}

export const CURRICULUM_DATA: Record<string, AreaItem> = {
  "matematica-preuniversitaria": {
    id: "matematica-preuniversitaria",
    slug: "matematica-preuniversitaria",
    title: "Matemática Preuniversitaria",
    badge: "Nivel Admisión UNI · UNMSM · PUCP",
    description: "Dominio conceptual y destreza operativa rigurosa en todas las ramas de la matemática preuniversitaria, orientada al ingreso a las mejores facultades de ciencias e ingeniería.",
    courses: [
      {
        id: "algebra",
        slug: "algebra",
        title: "Álgebra Preuniversitaria",
        shortDesc: "Estructuras algebraicas, polinomios, ecuaciones, desigualdades y el puente hacia el cálculo.",
        icon: "∑",
        level: "preuniversitario",
        modules: [
          {
            id: "alg-exp",
            title: "Leyes de Exponentes y Polinomios",
            description: "Fundamentos de operaciones con potencias, raíces y polinomios en una y varias variables.",
            topics: [
              {
                id: "leyes-de-exponentes-y-radicales",
                title: "Leyes de Exponentes y Radicación",
                slug: "leyes-de-exponentes-y-radicales",
                summary: "Propiedades fundamentales de potencias con bases reales, exponente fraccionario y simplificación de radicales dobles a simples.",
                difficulty: "básico",
                keyFormula: "x^{m} \\cdot x^{n} = x^{m+n}, \\quad \\sqrt[n]{x^m} = x^{m/n}",
                interactiveType: "socratic",
                crossConnections: [
                  { area: "ciencias", course: "quimica", topicSlug: "notacion-cientifica-y-magnitudes", label: "Cálculos estequiométricos con notación exponencial" }
                ]
              },
              {
                id: "polinomios-grados-y-valor-numerico",
                title: "Polinomios: Grados y Polinomios Especiales",
                slug: "polinomios-grados-y-valor-numerico",
                summary: "Polinomios homogéneos, ordenados, completos e idénticos. Cambio de variable y cálculo de coeficientes desconocidos.",
                difficulty: "intermedio",
                keyFormula: "P(x) = a_n x^n + a_{n-1} x^{n-1} + \\dots + a_1 x + a_0",
                interactiveType: "grapher"
              },
              {
                id: "productos-notables-y-equivalencias",
                title: "Productos Notables e Identidades Algebraicas",
                slug: "productos-notables-y-equivalencias",
                summary: "Identidades de Legendre, binomio al cubo, suma y diferencia de cubos, identidades de Lagrange y condicionales clásicas.",
                difficulty: "intermedio",
                keyFormula: "(a+b)^2 + (a-b)^2 = 2(a^2 + b^2)",
                interactiveType: "socratic"
              },
              {
                id: "division-algebraica-horner-y-resto",
                title: "División de Polinomios: Horner, Ruffini y Teorema del Resto",
                slug: "division-algebraica-horner-y-resto",
                summary: "Algoritmo de la división euclidiana, esquema de Horner, regla de Ruffini y cálculo del residuo sin efectuar la división.",
                difficulty: "avanzado",
                keyFormula: "D(x) = d(x) \\cdot q(x) + R(x), \\quad \\text{con } \\operatorname{gr}(R) < \\operatorname{gr}(d)",
                interactiveType: "socratic"
              },
              {
                id: "factorizacion-criterios-avanzados",
                title: "Métodos de Factorización y Divisores Binómicos",
                slug: "factorizacion-criterios-avanzados",
                summary: "Aspa simple, aspa doble, aspa doble especial, artificios de quita y pon, y raíces racionales con divisores binómicos.",
                difficulty: "reto-uni",
                keyFormula: "P(x) = (ax + b)(cx + d)(x - r)",
                interactiveType: "socratic"
              }
            ]
          },
          {
            id: "alg-ecu",
            title: "Ecuaciones y Desigualdades",
            description: "Resolución analítica de igualdades, inecuaciones racionales, irracionales y valor absoluto.",
            topics: [
              {
                id: "ecuaciones-cuadraticas-y-teorema-de-cardano",
                title: "Ecuación Cuadrática y Relaciones de Cardano-Vieta",
                slug: "ecuaciones-cuadraticas-y-teorema-de-cardano",
                summary: "Discriminante, naturaleza de las raíces, reconstrucción de ecuaciones y relaciones simétricas de Cardano.",
                difficulty: "intermedio",
                keyFormula: "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}, \\quad x_1 + x_2 = -\\frac{b}{a}, \\quad x_1 x_2 = \\frac{c}{a}",
                interactiveType: "grapher"
              },
              {
                id: "desigualdades-e-inecuaciones-polinomicas",
                title: "Desigualdades e Inecuaciones por Puntos Críticos",
                slug: "desigualdades-e-inecuaciones-polinomicas",
                summary: "Método de las zonas de signos, raíces con multiplicidad par e impar, e inecuaciones fraccionarias.",
                difficulty: "intermedio",
                keyFormula: "\\frac{P(x)}{Q(x)} \\ge 0 \\iff P(x)Q(x) \\ge 0 \\quad (Q(x) \\ne 0)",
                interactiveType: "grapher"
              },
              {
                id: "ecuaciones-e-inecuaciones-con-valor-absoluto",
                title: "Valor Absoluto: Propiedades, Distancias y Ecuaciones",
                slug: "ecuaciones-e-inecuaciones-con-valor-absoluto",
                summary: "Definición geométrica como distancia, propiedades algebraicas, teoremas de equivalencia y zonas de análisis.",
                difficulty: "avanzado",
                keyFormula: "|x| = a \\iff a \\ge 0 \\land (x = a \\lor x = -a)",
                interactiveType: "grapher",
                crossConnections: [
                  { area: "matematica-universitaria", course: "calculo-1", topicSlug: "definicion-formal-de-limite-epsilon-delta", label: "Control de distancias en la definición de límite" }
                ]
              }
            ]
          },
          {
            id: "alg-fun",
            title: "Teoría de Funciones Reales",
            description: "Dominio, rango, transformaciones de gráficas, composición e inversas.",
            topics: [
              {
                id: "dominio-y-rango-de-funciones-reales",
                title: "Cálculo Riguroso de Dominio y Rango",
                slug: "dominio-y-rango-de-funciones-reales",
                summary: "Restricciones de existencia en los números reales: denominadores no nulos, radicandos pares no negativos y bases de logaritmos.",
                difficulty: "intermedio",
                keyFormula: "\\operatorname{Dom}(f) = \\{x \\in \\mathbb{R} : f(x) \\in \\mathbb{R}\\}",
                interactiveType: "grapher"
              },
              {
                id: "transformaciones-geometricas-de-funciones",
                title: "Transformaciones Gráficas: Desplazamientos, Escalamientos y Reflejos",
                slug: "transformaciones-geometricas-de-funciones",
                summary: "Efecto geométrico de transformar f(x) en a f(b(x - h)) + k, con reflexiones respecto a los ejes y valor absoluto.",
                difficulty: "intermedio",
                keyFormula: "g(x) = a \\cdot f\\left(\\frac{x - h}{b}\\right) + k",
                interactiveType: "grapher"
              },
              {
                id: "composicion-de-funciones-y-algebra-de-funciones",
                title: "Composición de Funciones y Dominio Restringido",
                slug: "composicion-de-funciones-y-algebra-de-funciones",
                summary: "Condición de existencia de la función compuesta (f ∘ g)(x), intersección de rangos y dominios.",
                difficulty: "avanzado",
                keyFormula: "\\operatorname{Dom}(f \\circ g) = \\{x \\in \\operatorname{Dom}(g) : g(x) \\in \\operatorname{Dom}(f)\\}",
                interactiveType: "socratic"
              },
              {
                id: "funciones-inyectivas-biyectivas-e-inversas",
                title: "Inyectividad, Biyectividad y Función Inversa",
                slug: "funciones-inyectivas-biyectivas-e-inversas",
                summary: "Criterio de la recta horizontal, monotonía estricta, cálculo explícito de f⁻¹(x) y simetría respecto a la recta y = x.",
                difficulty: "reto-uni",
                keyFormula: "(f^{-1} \\circ f)(x) = x, \\quad \\forall x \\in \\operatorname{Dom}(f)",
                interactiveType: "grapher"
              }
            ]
          }
        ]
      },
      {
        id: "trigonometria",
        slug: "trigonometria",
        title: "Trigonometría Preuniversitaria",
        shortDesc: "Círculo trigonométrico, identidades, funciones sinusoidales, inversas y ecuaciones.",
        icon: "∡",
        level: "preuniversitario",
        modules: [
          {
            id: "trig-ct",
            title: "Circunferencia Trigonométrica y Razones",
            description: "Definición analítica de las razones trigonométricas mediante proyecciones.",
            topics: [
              {
                id: "circunferencia-trigonometrica-lineas-notables",
                title: "La Circunferencia Trigonométrica (C.T.) y sus Líneas",
                slug: "circunferencia-trigonometrica-lineas-notables",
                summary: "Coordenadas del círculo unitario, variación y signo de seno, coseno, tangente y cotangente en los cuatro cuadrantes.",
                difficulty: "intermedio",
                keyFormula: "x^2 + y^2 = 1, \\quad \\sin(\\theta) = y, \\quad \\cos(\\theta) = x",
                interactiveType: "grapher",
                crossConnections: [
                  { area: "ciencias", course: "fisica", topicSlug: "movimiento-armonico-simple-y-frecuencia", label: "Proyección circular del Movimiento Armónico Simple (MAS)" }
                ]
              },
              {
                id: "identidades-trigonometricas-fundamentales",
                title: "Identidades Trigonométricas Pitagóricas y Auxiliares",
                slug: "identidades-trigonometricas-fundamentales",
                summary: "Demostración geométrica y algebraica de sen²θ + cos²θ = 1, sec²θ - tan²θ = 1 y relaciones de productos notables.",
                difficulty: "intermedio",
                keyFormula: "\\sin^2(\\theta) + \\cos^2(\\theta) = 1, \\quad \\tan^2(\\theta) + 1 = \\sec^2(\\theta)",
                interactiveType: "socratic"
              },
              {
                id: "transformaciones-trigonometricas-y-angulos-multiples",
                title: "Ángulo Doble, Triple y Transformaciones a Producto",
                slug: "transformaciones-trigonometricas-y-angulos-multiples",
                summary: "Fórmulas de suma y diferencia aplicadas a ángulo doble, identidades de degradación y paso de sumas a productos.",
                difficulty: "avanzado",
                keyFormula: "\\sin(2\\theta) = 2\\sin(\\theta)\\cos(\\theta), \\quad \\cos(2\\theta) = \\cos^2(\\theta) - \\sin^2(\\theta)",
                interactiveType: "socratic"
              }
            ]
          }
        ]
      },
      {
        id: "geometria",
        slug: "geometria",
        title: "Geometría Plana, del Espacio y Analítica",
        shortDesc: "Razonamiento espacial, congruencia, relaciones métricas, áreas y curvas cónicas.",
        icon: "△",
        level: "preuniversitario",
        modules: [
          {
            id: "geom-plana",
            title: "Triángulos y Relaciones Métricas",
            description: "Propiedades angulares, puntos notables y relaciones de proporcionalidad.",
            topics: [
              {
                id: "congruencia-de-triangulos-y-lineas-notables",
                title: "Congruencia de Triángulos y Criterios Fundamentales",
                slug: "congruencia-de-triangulos-y-lineas-notables",
                summary: "Criterios LAL, ALA, LLL y ALL mayor. Aplicaciones en bisectriz, mediatriz y base media.",
                difficulty: "intermedio",
                keyFormula: "\\triangle ABC \\cong \\triangle DEF \\iff \\text{lados y ángulos homólogos congruentes}",
                interactiveType: "geometry"
              },
              {
                id: "semejanza-y-teorema-de-thales",
                title: "Teorema de Thales y Semejanza de Triángulos",
                slug: "semejanza-y-teorema-de-thales",
                summary: "Proporciones en segmentos paralelos, teorema de la bisectriz interior y exterior, y criterios de semejanza.",
                difficulty: "intermedio",
                keyFormula: "\\frac{AB}{DE} = \\frac{BC}{EF} = \\frac{AC}{DF} = k",
                interactiveType: "geometry"
              },
              {
                id: "relaciones-metricas-en-triangulos-rectangulos",
                title: "Relaciones Métricas y Teorema de Pitágoras",
                slug: "relaciones-metricas-en-triangulos-rectangulos",
                summary: "Proyección ortogonal, cuadrado de los catetos, altura relativa a la hipotenusa y producto de catetos.",
                difficulty: "avanzado",
                keyFormula: "h^2 = m \\cdot n, \\quad b^2 = c \\cdot m, \\quad a^2 + b^2 = c^2",
                interactiveType: "geometry"
              }
            ]
          },
          {
            id: "geom-analitica",
            title: "Geometría Analítica y Cónicas",
            description: "Representación algebraica del espacio euclidiano y curvas cónicas.",
            topics: [
              {
                id: "la-recta-en-el-plano-y-distancias",
                title: "Ecuación de la Recta, Pendiente y Distancia Punto-Recta",
                slug: "la-recta-en-el-plano-y-distancias",
                summary: "Ecuación punto-pendiente, general y simétrica. Ángulo entre dos rectas, paralelismo, perpendicularidad y distancia mínima.",
                difficulty: "intermedio",
                keyFormula: "d(P, L) = \\frac{|Ax_0 + By_0 + C|}{\\sqrt{A^2 + B^2}}",
                interactiveType: "grapher"
              },
              {
                id: "la-parabola-y-sus-elementos-geometricos",
                title: "La Parábola: Foco, Directriz y Ecuaciones Canónicas",
                slug: "la-parabola-y-sus-elementos-geometricos",
                summary: "Definición como lugar geométrico, parámetro p, vértice, lado recto y traslación de ejes.",
                difficulty: "avanzado",
                keyFormula: "(x - h)^2 = 4p(y - k)",
                interactiveType: "grapher",
                crossConnections: [
                  { area: "ciencias", course: "fisica", topicSlug: "movimiento-parabolico-de-proyectiles", label: "Trayectoria física de proyectiles en el vacío" }
                ]
              }
            ]
          }
        ]
      },
      {
        id: "aritmetica",
        slug: "aritmetica",
        title: "Aritmética y Teoría de Números",
        shortDesc: "Conjuntos, divisibilidad, números primos, fracciones, razones y combinatoria.",
        icon: "ℕ",
        level: "preuniversitario",
        modules: [
          {
            id: "arit-num",
            title: "Teoría de Números y Divisibilidad",
            description: "Estructura de los enteros, números primos y congruencias.",
            topics: [
              {
                id: "principios-de-divisibilidad-y-criterios",
                title: "Principios de Divisibilidad y Criterios Notables",
                slug: "principios-de-divisibilidad-y-criterios",
                summary: "Aritmética modular básica, criterios del 2, 3, 5, 7, 11 y 13. Teorema de restos potenciales.",
                difficulty: "intermedio",
                keyFormula: "a \\equiv b \\pmod{m} \\iff m \\mid (a - b)",
                interactiveType: "socratic"
              },
              {
                id: "numeros-primos-y-teorema-fundamental",
                title: "Números Primos y Descomposición Canónica",
                slug: "numeros-primos-y-teorema-fundamental",
                summary: "Teorema Fundamental de la Aritmética, cálculo de cantidad de divisores, suma de divisores y función de Euler.",
                difficulty: "avanzado",
                keyFormula: "N = p_1^{\\alpha_1} p_2^{\\alpha_2} \\cdots p_k^{\\alpha_k}, \\quad CD(N) = \\prod_{i=1}^k (\\alpha_i + 1)",
                interactiveType: "socratic"
              }
            ]
          }
        ]
      },
      {
        id: "razonamiento-matematico",
        slug: "razonamiento-matematico",
        title: "Razonamiento Matemático",
        shortDesc: "Métodos inductivos, planteo de ecuaciones, cronometría, sucesiones y certezas.",
        icon: "🧠",
        level: "preuniversitario",
        modules: [
          {
            id: "rm-estrategias",
            title: "Inducción y Planteo Analítico",
            description: "Desarrollo de habilidades de modelado y deducción estructurada.",
            topics: [
              {
                id: "metodo-inductivo-y-patrones-geometricos",
                title: "Razonamiento Inductivo y Deducción de Casos Particulares",
                slug: "metodo-inductivo-y-patrones-geometricos",
                summary: "Análisis de los tres casos mínimos fundamentales, generalización matemática y fórmulas recurrentes.",
                difficulty: "básico",
                keyFormula: "\\text{Caso 1, Caso 2, Caso 3} \\implies \\text{Regla General } f(n)",
                interactiveType: "socratic"
              },
              {
                id: "planteo-de-ecuaciones-y-modelado-verbal",
                title: "Planteo de Ecuaciones: Traducción del Lenguaje Natural al Álgebra",
                slug: "planteo-de-ecuaciones-y-modelado-verbal",
                summary: "Identificación de incógnitas, relaciones de exceso, fracciones de cantidades y balances lógicos.",
                difficulty: "intermedio",
                keyFormula: "\\text{Enunciado en prosa} \\longrightarrow Ecuaci\\acute{o}n: \\sum a_i x_i = C",
                interactiveType: "socratic"
              }
            ]
          }
        ]
      }
    ]
  },
  "matematica-universitaria": {
    id: "matematica-universitaria",
    slug: "matematica-universitaria",
    title: "Matemática Universitaria",
    badge: "Ciencias Exactas e Ingeniería",
    description: "Cálculo diferencial, integral y multivariable, álgebra lineal, ecuaciones diferenciales y estadística matemática rigurosa para carreras STEM.",
    courses: [
      {
        id: "calculo-1",
        slug: "calculo-1",
        title: "Cálculo Diferencial (Cálculo I)",
        shortDesc: "Límites formales épsilon-delta, continuidad, la derivada, teoremas del valor medio y optimización.",
        icon: "∂",
        level: "universitario",
        modules: [
          {
            id: "calc1-lim",
            title: "Límites y Continuidad Rigurosa",
            description: "El fundamento analítico del cálculo formal.",
            topics: [
              {
                id: "definicion-formal-de-limite-epsilon-delta",
                title: "Definición Formal de Límite (Épsilon-Delta)",
                slug: "definicion-formal-de-limite-epsilon-delta",
                summary: "Demostración analítica rigurosa de límites con cotas de vecindad, análisis de restricciones en delta y visualización interactiva.",
                difficulty: "reto-uni",
                keyFormula: "\\forall \\varepsilon > 0, \\; \\exists \\delta > 0 : 0 < |x - c| < \\delta \\implies |f(x) - L| < \\varepsilon",
                interactiveType: "simulation",
                crossConnections: [
                  { area: "matematica-preuniversitaria", course: "algebra", topicSlug: "ecuaciones-e-inecuaciones-con-valor-absoluto", label: "Fundamento analítico de intervalos con valor absoluto" }
                ]
              },
              {
                id: "limites-trigonometricos-notables-y-asintotas",
                title: "Límites Trigonométricos Notables y Teorema del Sándwich",
                slug: "limites-trigonometricos-notables-y-asintotas",
                summary: "Demostración geométrica de lim(sen x / x) = 1, límites exponenciales de tipo e y asíntotas oblicuas.",
                difficulty: "avanzado",
                keyFormula: "\\lim_{x \\to 0} \\frac{\\sin(x)}{x} = 1, \\quad \\lim_{x \\to \\infty} \\left(1 + \\frac{1}{x}\\right)^x = e",
                interactiveType: "grapher"
              }
            ]
          },
          {
            id: "calc1-der",
            title: "La Derivada y sus Teoremas Centrales",
            description: "Razón de cambio instantánea, reglas de derivación y aplicaciones.",
            topics: [
              {
                id: "definicion-de-la-derivada-y-regla-de-la-cadena",
                title: "La Derivada como Límite y la Regla de la Cadena",
                slug: "definicion-de-la-derivada-y-regla-de-la-cadena",
                summary: "Cociente diferencial de Newton, pendiente de la recta tangente, derivación de funciones compuestas e implícitas.",
                difficulty: "intermedio",
                keyFormula: "f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}, \\quad (f \\circ g)'(x) = f'(g(x)) g'(x)",
                interactiveType: "grapher",
                crossConnections: [
                  { area: "ciencias", course: "fisica", topicSlug: "cinematica-velocidad-y-aceleracion-instantanea", label: "Interpretación física: la velocidad es la derivada de la posición" }
                ]
              },
              {
                id: "teoremas-de-rolle-lagrange-y-lhopital",
                title: "Teoremas del Valor Medio (Rolle, Lagrange) y Regla de L'Hôpital",
                slug: "teoremas-de-rolle-lagrange-y-lhopital",
                summary: "Demostración y consecuencias del Teorema del Valor Medio para derivadas, y resolución de formas indeterminadas con L'Hôpital.",
                difficulty: "avanzado",
                keyFormula: "\\exists c \\in (a, b) : f'(c) = \\frac{f(b) - f(a)}{b - a}",
                interactiveType: "grapher"
              }
            ]
          }
        ]
      },
      {
        id: "calculo-2",
        slug: "calculo-2",
        title: "Cálculo Integral (Cálculo II)",
        shortDesc: "Sumas de Riemann, integrales definidas, técnicas de integración y series infinitas.",
        icon: "∫",
        level: "universitario",
        modules: [
          {
            id: "calc2-int",
            title: "Integrales y Teorema Fundamental",
            description: "Cálculo de áreas, antiderivadas y aplicaciones a sólidos de revolución.",
            topics: [
              {
                id: "teorema-fundamental-del-calculo-y-sumas-de-riemann",
                title: "Sumas de Riemann y Teorema Fundamental del Cálculo",
                slug: "teorema-fundamental-del-calculo-y-sumas-de-riemann",
                summary: "Aproximación por particiones, convergencia hacia la integral definida y conexión entre derivación e integración.",
                difficulty: "avanzado",
                keyFormula: "\\frac{d}{dx}\\int_a^x f(t) dt = f(x), \\quad \\int_a^b f(x) dx = F(b) - F(a)",
                interactiveType: "simulation"
              },
              {
                id: "metodos-de-integracion-por-partes-y-fracciones-parciales",
                title: "Integración por Partes y Fracciones Parciales",
                slug: "metodos-de-integracion-por-partes-y-fracciones-parciales",
                summary: "Regla mnemotécnica ILATE, integración cíclica, descomposición en factores lineales y cuadráticos irreducibles.",
                difficulty: "intermedio",
                keyFormula: "\\int u \\, dv = u \\cdot v - \\int v \\, du",
                interactiveType: "socratic"
              }
            ]
          }
        ]
      },
      {
        id: "algebra-lineal",
        slug: "algebra-lineal",
        title: "Álgebra Lineal",
        shortDesc: "Espacios vectoriales, matrices, transformaciones lineales, autovalores y ortogonalidad.",
        icon: "⊗",
        level: "universitario",
        modules: [
          {
            id: "alglin-esp",
            title: "Espacios Vectoriales y Transformaciones",
            description: "Bases, dimensión, operadores lineales y diagonalización.",
            topics: [
              {
                id: "espacios-vectoriales-bases-y-dimension",
                title: "Espacios Vectoriales, Independencia Lineal y Dimensión",
                slug: "espacios-vectoriales-bases-y-dimension",
                summary: "Axiomas de espacio vectorial, combinación lineal, conjunto generador y Teorema de la Base.",
                difficulty: "avanzado",
                keyFormula: "\\sum_{i=1}^n c_i \\mathbf{v}_i = \\mathbf{0} \\implies c_1 = \\dots = c_n = 0",
                interactiveType: "socratic"
              },
              {
                id: "autovalores-autovectores-y-diagonalizacion",
                title: "Valores Propios (Autovalores) y Diagonalización",
                slug: "autovalores-autovectores-y-diagonalizacion",
                summary: "Polinomio característico det(A - λI) = 0, multiplicidad geométrica y algebraica, y semejanza de matrices.",
                difficulty: "reto-uni",
                keyFormula: "A \\mathbf{v} = \\lambda \\mathbf{v}, \\quad \\det(A - \\lambda I) = 0",
                interactiveType: "simulation"
              }
            ]
          }
        ]
      }
    ]
  },
  "ciencias": {
    id: "ciencias",
    slug: "ciencias",
    title: "Ciencias Exactas (Física y Química)",
    badge: "Fundamentos Experimentales y Teóricos",
    description: "Mecánica clásica, termodinámica, electromagnetismo, cinemática química, estructura atómica y estequiometría.",
    courses: [
      {
        id: "fisica",
        slug: "fisica",
        title: "Física General y Preuniversitaria",
        shortDesc: "Cinemática, dinámica newtoniana, trabajo, energía, termodinámica y electromagnetismo.",
        icon: "⚡",
        level: "preuniversitario",
        modules: [
          {
            id: "fis-mec",
            title: "Mecánica Clásica y Dinámica",
            description: "El movimiento y las leyes que rigen las interacciones de los cuerpos.",
            topics: [
              {
                id: "cinematica-velocidad-y-aceleracion-instantanea",
                title: "Cinemática Vectorial: MRUV, Movimiento Parabólico y Caída Libre",
                slug: "cinematica-velocidad-y-aceleracion-instantanea",
                summary: "Ecuaciones horarias del movimiento, descomposición vectorial de trayectorias y análisis gráfico posición-tiempo.",
                difficulty: "intermedio",
                keyFormula: "\\mathbf{r}(t) = \\mathbf{r}_0 + \\mathbf{v}_0 t + \\frac{1}{2} \\mathbf{a} t^2",
                interactiveType: "simulation",
                crossConnections: [
                  { area: "matematica-universitaria", course: "calculo-1", topicSlug: "definicion-de-la-derivada-y-regla-de-la-cadena", label: "La velocidad instantánea es la derivada de la posición respecto al tiempo" }
                ]
              },
              {
                id: "leyes-de-newton-y-diagrama-de-cuerpo-libre",
                title: "Leyes de Newton y Diagramas de Cuerpo Libre (DCL)",
                slug: "leyes-de-newton-y-diagrama-de-cuerpo-libre",
                summary: "Inercia, fuerza resultante, acción-reacción, rozamiento estático vs cinético y equilibrio traslacional.",
                difficulty: "intermedio",
                keyFormula: "\\sum \\mathbf{F} = m \\mathbf{a}, \\quad f_s \\le \\mu_s N, \\quad f_k = \\mu_k N",
                interactiveType: "simulation"
              },
              {
                id: "trabajo-energia-mecanica-y-conservacion",
                title: "Trabajo Mecánico, Teorema de la Energía y Fuerzas Conservativas",
                slug: "trabajo-energia-mecanica-y-conservacion",
                summary: "Trabajo de fuerzas constantes y variables, energía cinética, potencial elástica y gravitatoria, y conservación de energía mecánica.",
                difficulty: "avanzado",
                keyFormula: "W_{\\text{neto}} = \\Delta E_c, \\quad E_m = E_c + E_p = \\text{constante}",
                interactiveType: "simulation"
              }
            ]
          }
        ]
      },
      {
        id: "quimica",
        slug: "quimica",
        title: "Química General e Inorgánica",
        shortDesc: "Materia, estructura atómica, enlace químico, reacciones, estequiometría y soluciones.",
        icon: "🧪",
        level: "preuniversitario",
        modules: [
          {
            id: "quim-est",
            title: "Estructura de la Materia y Enlace",
            description: "El mundo atómico y molecular.",
            topics: [
              {
                id: "estructura-atomica-numeros-cuanticos-y-configuracion",
                title: "Estructura Atómica Moderna y Configuración Electrónica",
                slug: "estructura-atomica-numeros-cuanticos-y-configuracion",
                summary: "Números cuánticos (n, l, m_l, m_s), principio de Aufbau, regla de Hund y principio de exclusión de Pauli.",
                difficulty: "intermedio",
                keyFormula: "E_n = -\\frac{13.6 \\text{ eV}}{n^2}, \\quad n \\ge 1, \\quad 0 \\le l < n",
                interactiveType: "socratic"
              },
              {
                id: "estequiometria-reactivo-limitante-y-rendimiento",
                title: "Estequiometría: Reactivo Limitante, Pureza y Rendimiento",
                slug: "estequiometria-reactivo-limitante-y-rendimiento",
                summary: "Conservación de masa, relaciones molares en reacciones balanceadas, determinación analítica del reactivo limitante y rendimiento porcentual.",
                difficulty: "avanzado",
                keyFormula: "\\% \\text{Rendimiento} = \\frac{\\text{Masa Real}}{\\text{Masa Teórica}} \\times 100\\%",
                interactiveType: "balancer"
              }
            ]
          }
        ]
      }
    ]
  }
};
