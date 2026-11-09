# Auditoría editorial de matemáticas · 1.º a 5.º de secundaria

**Corte:** 9 de noviembre de 2026 · **Proyecto:** Sistema Zénit · **Rama:** `main`.

## 1. Corrección confirmada por el usuario: dominio de una función

En `/curso/funciones-sin-vacios/modulo-1` los ejemplos ya se escriben explícitamente con KaTeX:

- `q(x)=\\dfrac{1}{x-4},\\qquad x\\ne4` — dominio: números reales salvo 4.
- `A(r)=\\pi r^2,\\qquad r\\ge0` — radio físico no negativo.

Se comprobó en producción mediante captura del ejemplo, además del build automatizado.

## 2. Revisión conservadora de fórmulas de lecciones

Se incorporaron **47 reglas por asignatura y tema**. Estas reglas sustituyen expresiones genéricas cuando el título corresponde claramente a una propiedad o ejemplo matemático; **no alteran los libros extraídos ni calculan respuestas**. Se aplican tanto al índice como a la vista de lección mediante `resolveEditorialKeyFormula`.

| Grado | Lecciones | Con fórmula específica | Segmentos detectados | Revisión pendiente |
|---|---:|---:|---:|---:|
| 1.º | 124 | 59 | 2464 | 14 |
| 2.º | 115 | 60 | 2596 | 13 |
| 3.º | 98 | 48 | 2527 | 19 |
| 4.º | 103 | 50 | 2725 | 12 |
| 5.º | 142 | 51 | 3508 | 11 |
| **Total** | **582** | **268** | **13820** | **69** |

Las 314 lecciones restantes de estos cinco grados mantienen la fórmula anterior. Esta cifra **no equivale a 314 errores**: muchas no admiten una única fórmula central o tienen contenido ya específico de física y química.

## 3. Inspección del material extraído por curso

El separador de texto matemático ahora evita convertir prosa y exponentes incompletos en expresiones KaTeX. Con el detector conservador, se revisaron **88,874 textos** del catálogo y se detectaron **14,108 candidatos matemáticos**, de los que **69** no pasaron el análisis sintáctico. La salida conserva su fuente literal. Estas cifras no miden corrección conceptual ni equivalen a errores únicos de ejercicios.

| Grado y asignatura | Lecciones | Fórmula curada | Fragmentos no interpretables |
|---|---:|---:|---:|
| 1º · trigonometria | 12 | 10 | 1 |
| 1º · aritmetica | 36 | 15 | 6 |
| 1º · algebra | 22 | 15 | 0 |
| 1º · razonamiento-matematico | 25 | 1 | 5 |
| 1º · estadistica-y-probabilidad | 10 | 6 | 2 |
| 1º · geometria | 19 | 12 | 0 |
| 2º · trigonometria | 13 | 10 | 0 |
| 2º · geometria | 25 | 17 | 2 |
| 2º · razonamiento-matematico | 19 | 2 | 1 |
| 2º · algebra | 18 | 12 | 8 |
| 2º · estadistica-y-probabilidad | 11 | 7 | 0 |
| 2º · aritmetica | 29 | 12 | 2 |
| 3º · geometria | 24 | 14 | 0 |
| 3º · razonamiento-matematico | 19 | 1 | 1 |
| 3º · estadistica-y-probabilidad | 9 | 7 | 0 |
| 3º · algebra | 20 | 13 | 16 |
| 3º · trigonometria | 10 | 8 | 0 |
| 3º · aritmetica | 16 | 5 | 2 |
| 4º · razonamiento-matematico | 18 | 1 | 1 |
| 4º · estadistica-y-probabilidad | 10 | 7 | 3 |
| 4º · geometria | 26 | 17 | 0 |
| 4º · algebra | 17 | 10 | 7 |
| 4º · trigonometria | 12 | 6 | 0 |
| 4º · aritmetica | 20 | 9 | 1 |
| 5º · geometria | 24 | 13 | 0 |
| 5º · algebra | 23 | 10 | 5 |
| 5º · estadistica-y-probabilidad | 9 | 7 | 0 |
| 5º · razonamiento-matematico | 15 | 2 | 2 |
| 5º · trigonometria | 19 | 10 | 0 |
| 5º · aritmetica | 26 | 9 | 4 |
| 5º · fisica | 14 | 0 | 0 |
| 5º · quimica | 12 | 0 | 0 |

## 4. Priorización de revisión manual de OCR

| Prioridad | Asignatura | Casos | Ejemplo del material OCR |
|---:|---|---:|---|
| 1 | 3º · algebra | 16 | P(x) = (2 + b)x^a^+^3by + (a – 2)x^2y^3a^+^b |
| 2 | 2º · algebra | 8 | P(x) = 7x^{10 |
| 3 | 4º · algebra | 7 | E=x^{x^{1+2x^{1+x−x^{x+1} |
| 4 | 1º · aritmetica | 6 | Q(^–^1) |
| 5 | 1º · razonamiento-matematico | 5 | n(n}^–^{1) |
| 6 | 5º · algebra | 5 | N	=   x^3xx^+^1 |
| 7 | 5º · aritmetica | 4 | n(n^+^1) |
| 8 | 4º · estadistica-y-probabilidad | 3 | A = 2^2n × 3^n^+^1 |
| 9 | 1º · estadistica-y-probabilidad | 2 | N = 3^k^+^2 |
| 10 | 2º · aritmetica | 2 | n(n^–^3) |
| 11 | 2º · geometria | 2 | n(A^∩^B) = 2^4 |
| 12 | 3º · aritmetica | 2 | B = 2^{n + 1 |

Entre los patrones que requieren cotejar el archivo docente se encuentran exponentes dobles, exponentes truncados, llaves sin cerrar y signos reconstruidos con un carácter ^, por ejemplo `x^m^+^1`. **No se inventa automáticamente el exponente correcto.**

## 5. Próximas comprobaciones editoriales

- Comparar cada caso marcado con el documento de origen (PPTX, PDF o solucionario) y anotar la transcripción matemática comprobada.
- Registrar la corrección en una fuente versionada reproducible y volver a ejecutar `npm run check:math`.
- Revisar la correspondencia entre ejercicios, opciones y claves antes de habilitar calificación si la respuesta no está verificada.
- Realizar comprobaciones con estudiantes y docentes en móvil; la validez sintáctica KaTeX no prueba la exactitud matemática.

**Documentación técnica:** `lib/editorial-key-formulas.mjs`, `lib/math-text-segments.mjs`, `scripts/check-math-typography.mjs`. La corrección editorial debe conservar la procedencia de cada ejercicio y no inferir resultados desde OCR ambiguo.
