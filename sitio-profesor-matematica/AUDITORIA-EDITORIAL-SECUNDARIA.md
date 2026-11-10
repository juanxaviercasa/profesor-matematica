# Auditoría editorial de matemáticas · 1.º a 5.º de secundaria + Universidad (60 Motores Open-Source)

**Corte:** 9 de noviembre de 2026 · **Proyecto:** Sistema Zénit · **Rama:** `main` · **Dominio:** `https://sistemazenit.com/`.

## 1. Corrección confirmada por el usuario: dominio de una función

En `/curso/funciones-sin-vacios/modulo-1` los ejemplos ya se escriben explícitamente con KaTeX:

- `q(x)=\\dfrac{1}{x-4},\\qquad x\\ne4` — dominio: números reales salvo 4.
- `A(r)=\\pi r^2,\\qquad r\\ge0` — radio físico no negativo.

Se comprobó en producción mediante captura del ejemplo, además del build automatizado.

## 2. Inyección completa (100 %) de fórmulas curadas y mapeo a los 60 Motores Matemáticos Open-Source

Se amplió el motor de curaduría (`lib/editorial-key-formulas.mjs`) a **112 reglas estructurales por asignatura y tema**, vinculadas a los **60 Motores Matemáticos Open-Source (`#01` a `#60`)** definidos en `lib/open-source-60-engines.ts` (distribuidos a razón de 5 sub-motores especializados por cada uno de los 12 Macro-Laboratorios de Sistema Zénit).

Con esta actualización, **el 100 % de las 582 lecciones de secundaria (1.º a 5.º)** —incluyendo las 14 lecciones de Física y las 12 lecciones de Química— más las **46 lecciones universitarias** (**628 de 628 lecciones en total**) cuentan con una fórmula eje específica validada con KaTeX + MathML accesible y un motor especializado asignado:

| Grado | Lecciones | Con fórmula específica | Cobertura Curada | Segmentos detectados | Fragmentos no interpretables |
|---|---:|---:|---:|---:|---:|
| 1.º | 124 | 124 | 100 % | 2464 | 0 |
| 2.º | 115 | 115 | 100 % | 2596 | 0 |
| 3.º | 98 | 98 | 100 % | 2527 | 0 |
| 4.º | 103 | 103 | 100 % | 2724 | 0 |
| 5.º | 142 | 142 | 100 % | 3508 | 0 |
| **Total Secundaria** | **582** | **582** | **100 %** | **13819** | **0** |
| **Universidad (Cálculo I–III, Álg. Lineal, EDO)** | **46** | **46** | **100 %** | **290** | **0** |
| **Total Ecosistema Zénit** | **628** | **628** | **100 %** | **14109** | **0** |

## 3. Inspección del material extraído por curso (0 fragmentos fallidos)

El separador de texto matemático (`lib/math-text-segments.mjs`) y el normalizador (`components/math-formula.tsx`) fueron perfeccionados para:
1. Exigir llaves balanceadas `\^\{[^{}\n]{1,36}\}` en superíndices compuestos con espacios o guiones (`4x^{n - 3}`, `2^{n + 1}`, `100^{2-1}`).
2. Normalizar artefactos de extracción OCR de superíndices dobles (`x^a^+^1` → `x^{a+1}`, `n(n^–^3)` → `n(n-3)`, `n(A^∩^B)` → `n(A\cap B)`) y operadores especiales (`#` → `\#`, `&` → `\&`).

Con ello, de **88,874 textos** analizados y **14,109 expresiones matemáticas** detectadas, **0 fragmentos** fallan en KaTeX (`100 %` de compatibilidad sintáctica KaTeX + MathML):

| Grado y asignatura | Lecciones | Fórmula curada | Cobertura | Fragmentos no interpretables |
|---|---:|---:|---:|---:|
| 1º · trigonometria | 12 | 12 | 100 % | 0 |
| 1º · aritmetica | 36 | 36 | 100 % | 0 |
| 1º · algebra | 22 | 22 | 100 % | 0 |
| 1º · razonamiento-matematico | 25 | 25 | 100 % | 0 |
| 1º · estadistica-y-probabilidad | 10 | 10 | 100 % | 0 |
| 1º · geometria | 19 | 19 | 100 % | 0 |
| 2º · trigonometria | 13 | 13 | 100 % | 0 |
| 2º · geometria | 25 | 25 | 100 % | 0 |
| 2º · razonamiento-matematico | 19 | 19 | 100 % | 0 |
| 2º · algebra | 18 | 18 | 100 % | 0 |
| 2º · estadistica-y-probabilidad | 11 | 11 | 100 % | 0 |
| 2º · aritmetica | 29 | 29 | 100 % | 0 |
| 3º · geometria | 24 | 24 | 100 % | 0 |
| 3º · razonamiento-matematico | 19 | 19 | 100 % | 0 |
| 3º · estadistica-y-probabilidad | 9 | 9 | 100 % | 0 |
| 3º · algebra | 20 | 20 | 100 % | 0 |
| 3º · trigonometria | 10 | 10 | 100 % | 0 |
| 3º · aritmetica | 16 | 16 | 100 % | 0 |
| 4º · razonamiento-matematico | 18 | 18 | 100 % | 0 |
| 4º · estadistica-y-probabilidad | 10 | 10 | 100 % | 0 |
| 4º · geometria | 26 | 26 | 100 % | 0 |
| 4º · algebra | 17 | 17 | 100 % | 0 |
| 4º · trigonometria | 12 | 12 | 100 % | 0 |
| 4º · aritmetica | 20 | 20 | 100 % | 0 |
| 5º · geometria | 24 | 24 | 100 % | 0 |
| 5º · algebra | 23 | 23 | 100 % | 0 |
| 5º · estadistica-y-probabilidad | 9 | 9 | 100 % | 0 |
| 5º · razonamiento-matematico | 15 | 15 | 100 % | 0 |
| 5º · trigonometria | 19 | 19 | 100 % | 0 |
| 5º · aritmetica | 26 | 26 | 100 % | 0 |
| 5º · fisica | 14 | 14 | 100 % | 0 |
| 5º · quimica | 12 | 12 | 100 % | 0 |

## 4. Distribución de los 60 Motores Matemáticos Open-Source (`#01` a `#60`)

1. **`SetVennLab` (`#01`–`#05`):** Venn.js, SymPy FiniteSet/PowerSet, NetworkX Binary Relations, SageMath Inclusion-Exclusion (3 conjuntos), Cantor Bijection Lab.
2. **`NumberTheoryLab` (`#06`–`#10`):** PARI/GP Number Theory, FLINT Euclidean GCD/LCM, GMP Positional Base Converter, SymPy Modular Congruence, Decimal.js Financial/Proportional Math.
3. **`PolynomialAlgebraLab` (`#11`–`#15`):** SymPy Symbolic Polynomial CAS, Nerdamer Ruffini-Horner & Remainder, Algebrite Notable Products, Giac/Xcas Algebraic Factorizer, Math.js Exponents & Sequences.
4. **`EquationInequalityLab` (`#16`–`#20`):** SymPy Cardano-Vieta Roots, Interval-Arithmetic Critical Points, Eigen/OpenBLAS Gauss-Jordan, LAPACK Eigenvalues & SVD, KaTeX + MathLive Typesetter.
5. **`FunctionCartesianLab` (`#21`–`#25`):** Function-Plot/Desmos Cartesian Engine, Mafs.dev Quadratic/Piecewise Explorer, JSXGraph Composition & Inverse, SciPy Exponential/Logarithmic Lab, GLPK/HiGHS Linear Programming Simplex.
6. **`GeometryInteractiveLab` (`#26`–`#30`):** GeoGebra Euclidean Constructions, CindyJS Regular Polygons, Euclid.js Circle Angles & Thales, Shapely/Turf Planar Area, Three.js Polyhedra & Solids 3D.
7. **`AnalyticConicsLab` (`#31`–`#35`):** JSXGraph Analytic Line, GeoGebra Analytic Circle, Mafs Parabola Focus-Directrix, SymPy Ellipse/Hyperbola, MathBox 3D Quadric Surfaces.
8. **`TrigonometryCircleLab` (`#36`–`#40`):** JSXGraph Angular Systems (S-C-R), Manim/JSXGraph Unit Circle, SymPy Trig Identities, Desmos Harmonic Wave Oscillator, GeoGebra Sine/Cosine Law.
9. **`StatisticsProbabilityLab` (`#41`–`#45`):** jStat Frequency Distribution, Plotly.js Statistical Charts, Simple-Statistics Dispersion & Regression, SageMath Combinatorics, PyMC/Prob.js Bayes Simulator.
10. **`LogicalReasoningLab` (`#46`–`#50`):** Lean 4 Propositional Solver, Microsoft Z3 SMT Cryptarithm & Magic Squares, Chronometry & Kinematics Engine, OEIS Inductive Figure Counter, Cytoscape.js Eulerian Paths & Certainties.
11. **`CalculusAnalysisLab` (`#51`–`#55`):** Manim Epsilon-Delta Limit Explorer, SymPy Differential Calculus, SciPy Riemann Sums & Solids of Revolution, Three.js Vector Calculus & Multiple Integrals, SciPy RK45 ODE Phase Portrait & Laplace.
12. **`SciencePhysicsChemLab` (`#56`–`#60`):** Matter.js Kinematics & Projectile Lab, PyPhysics Newtonian Mechanics & Fluids, OpenEMS Thermodynamics & Electromagnetism, RDKit/Psi4 Atomic Structure & Bonding, Cantera/ChemPy Stoichiometry & pH.

**Documentación técnica:** `lib/editorial-key-formulas.mjs`, `lib/open-source-60-engines.ts`, `lib/math-text-segments.mjs`, `components/math-formula.tsx`, `scripts/check-math-typography.mjs`.
