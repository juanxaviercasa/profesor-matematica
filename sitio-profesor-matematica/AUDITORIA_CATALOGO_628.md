# Censo inicial del catálogo de 628 lecciones — Sistema Zénit

**Fecha:** 10 de noviembre de 2026. **Origen:** `content/catalog/lessons-index.json` y `lessons-full.json` de `main`.

> Esta es una revisión estructural de todos los registros, **no** una certificación visual de todas las páginas. La auditoría visual completa con Chromium está configurada en el flujo `zenit-catalog-full-audit.yml`.

## Alcance y hallazgos

- **628** lecciones, 99 publicadas y 529 programadas.
- **9** publicadas sin diapositivas de teoría; **4** sin ejercicios cargados.
- **23** casos de clave marcada (A-E) sin la alternativa correspondiente almacenada. No se debe inventar la alternativa ni cambiar la clave.
- Sin títulos vacíos, sin slug duplicado y sin lecciones huérfanas.
- Las 529 programadas no tienen actualmente diapositivas de teoría ni ejercicios en el archivo completo; deben completarse editorialmente y no publicarse automáticamente.

## Publicadas que necesitan revisión de material

| Lección | Área/curso | Motivo |
|---|---|---|
| Conjuntos | matematica-preuniversitaria/aritmetica | Teoría por revisar |
| Expresión algebraica | matematica-preuniversitaria/algebra | Teoría por revisar; Ejercicios por completar |
| Expresiones algebraicas | matematica-preuniversitaria/algebra | Clave sin opciones suficientes |
| Habilidad operativa | matematica-preuniversitaria/razonamiento-matematico | Clave sin opciones suficientes |
| Introducción a la estadística | matematica-preuniversitaria/estadistica-y-probabilidad | Clave sin opciones suficientes |
| Nociones básicas de geometría | matematica-preuniversitaria/aritmetica | Teoría por revisar; Ejercicios por completar |
| Operaciones con conjuntos | matematica-preuniversitaria/aritmetica | Clave sin opciones suficientes |
| Psicotónico secuencia de figuras | matematica-preuniversitaria/razonamiento-matematico | Teoría por revisar; Clave sin opciones suficientes |
| Secuencia de figuras | matematica-preuniversitaria/razonamiento-matematico | Ejercicios por completar |
| Segmentos | matematica-preuniversitaria/geometria | Clave sin opciones suficientes |
| Situaciones lógicas | matematica-preuniversitaria/razonamiento-matematico | Clave sin opciones suficientes |
| Ángulos determinados por dos rectas paralelas y una recta secante | matematica-preuniversitaria/geometria | Clave sin opciones suficientes |
| Ángulos formados por 2 rectas paralelas y 1 secante | matematica-preuniversitaria/geometria | Teoría por revisar |
| Criptoaritmética | matematica-preuniversitaria/razonamiento-matematico | Teoría por revisar; Clave sin opciones suficientes |
| Criptoaritmética 1 | matematica-preuniversitaria/razonamiento-matematico | Ejercicios por completar |
| Criptoaritmética I | matematica-preuniversitaria/razonamiento-matematico | Teoría por revisar |
| Números naturales | matematica-preuniversitaria/aritmetica | Clave sin opciones suficientes |
| Operaciones con monomios y polinomios | matematica-preuniversitaria/algebra | Clave sin opciones suficientes |
| Operaciones con polinomios | matematica-preuniversitaria/algebra | Teoría por revisar |
| Sistemas de medidas angulares i | matematica-preuniversitaria/trigonometria | Teoría por revisar |

## Censo individual — 628 filas

| # | Lección | Área / Curso | Estado | Teoría | Ejercicios | Revisión |
|---:|---|---|---|---:|---:|---|
| 1 | Ángulo trigonométrico (`angulo-trigonometrico-1sec-unidad1`) | matematica-preuniversitaria/trigonometria | Publicada | 9 | 16 | Sin alertas estructurales |
| 2 | Conjuntos (`conjuntos-1sec-unidad1`) | matematica-preuniversitaria/aritmetica | Publicada | 0 | 8 | Teoría por revisar |
| 3 | Expresión algebraica (`expresion-algebraica-1sec-unidad1`) | matematica-preuniversitaria/algebra | Publicada | 0 | 0 | Teoría por revisar; Ejercicios por completar |
| 4 | Expresiones algebraicas (`expresiones-algebraicas-1sec-unidad1`) | matematica-preuniversitaria/algebra | Publicada | 10 | 16 | Clave sin opciones suficientes |
| 5 | Habilidad operativa (`habilidad-operativa-1sec-unidad1`) | matematica-preuniversitaria/razonamiento-matematico | Publicada | 8 | 8 | Clave sin opciones suficientes |
| 6 | Introducción a la estadística (`introduccion-a-la-estadistica-1sec-unidad1`) | matematica-preuniversitaria/estadistica-y-probabilidad | Publicada | 9 | 16 | Clave sin opciones suficientes |
| 7 | Nociones básicas de geometría (`nociones-basicas-de-geometria-1sec-unidad1`) | matematica-preuniversitaria/aritmetica | Publicada | 0 | 0 | Teoría por revisar; Ejercicios por completar |
| 8 | Operaciones con conjuntos (`operaciones-con-conjuntos-1sec-unidad1`) | matematica-preuniversitaria/aritmetica | Publicada | 9 | 14 | Clave sin opciones suficientes |
| 9 | Problemas con conjuntos (`problemas-con-conjuntos-1sec-unidad1`) | matematica-preuniversitaria/aritmetica | Publicada | 9 | 16 | Sin alertas estructurales |
| 10 | Psicotónico secuencia de figuras (`psicotonico-secuencia-de-figuras-1sec-unidad1`) | matematica-preuniversitaria/razonamiento-matematico | Publicada | 0 | 1 | Teoría por revisar; Clave sin opciones suficientes |
| 11 | Secuencia de figuras (`secuencia-de-figuras-1sec-unidad1`) | matematica-preuniversitaria/razonamiento-matematico | Publicada | 9 | 0 | Ejercicios por completar |
| 12 | Segmentos (`segmentos-1sec-unidad1`) | matematica-preuniversitaria/geometria | Publicada | 9 | 16 | Clave sin opciones suficientes |
| 13 | Situaciones lógicas (`situaciones-logicas-1sec-unidad1`) | matematica-preuniversitaria/razonamiento-matematico | Publicada | 8 | 6 | Clave sin opciones suficientes |
| 14 | Teoría de conjuntos (`teoria-de-conjuntos-1sec-unidad1`) | matematica-preuniversitaria/aritmetica | Publicada | 8 | 8 | Sin alertas estructurales |
| 15 | Ángulos (`angulos-1sec-unidad2`) | matematica-preuniversitaria/geometria | Publicada | 10 | 16 | Sin alertas estructurales |
| 16 | Ángulos determinados por dos rectas paralelas y una recta secante (`angulos-determinados-por-dos-rectas-paralelas-y-una-recta-secante-1sec-unidad2`) | matematica-preuniversitaria/geometria | Publicada | 10 | 8 | Clave sin opciones suficientes |
| 17 | Ángulos formados por 2 rectas paralelas y 1 secante (`angulos-formados-por-2-rectas-paralelas-y-1-secante-1sec-unidad2`) | matematica-preuniversitaria/geometria | Publicada | 0 | 8 | Teoría por revisar |
| 18 | Arreglos numéricos (`arreglos-numericos-1sec-unidad2`) | matematica-preuniversitaria/razonamiento-matematico | Publicada | 8 | 16 | Sin alertas estructurales |
| 19 | Criptoaritmética (`criptoaritmetica-1sec-unidad2`) | matematica-preuniversitaria/razonamiento-matematico | Publicada | 0 | 7 | Teoría por revisar; Clave sin opciones suficientes |
| 20 | Criptoaritmética 1 (`criptoaritmetica-1-1sec-unidad2`) | matematica-preuniversitaria/razonamiento-matematico | Publicada | 8 | 0 | Ejercicios por completar |
| 21 | Criptoaritmética I (`criptoaritmetica-i-1sec-unidad2`) | matematica-preuniversitaria/razonamiento-matematico | Publicada | 0 | 8 | Teoría por revisar |
| 22 | Múltiplos y divisores de un número (`multiplos-y-divisores-de-un-numero-1sec-unidad2`) | matematica-preuniversitaria/aritmetica | Publicada | 10 | 16 | Sin alertas estructurales |
| 23 | Números naturales (`numeros-naturales-1sec-unidad2`) | matematica-preuniversitaria/aritmetica | Publicada | 10 | 16 | Clave sin opciones suficientes |
| 24 | Operaciones con monomios y polinomios (`operaciones-con-monomios-y-polinomios-1sec-unidad2`) | matematica-preuniversitaria/algebra | Publicada | 8 | 8 | Clave sin opciones suficientes |
| 25 | Operaciones con polinomios (`operaciones-con-polinomios-1sec-unidad2`) | matematica-preuniversitaria/algebra | Publicada | 0 | 8 | Teoría por revisar |
| 26 | Sistemas de medidas angulares (`sistemas-de-medidas-angulares-1sec-unidad2`) | matematica-preuniversitaria/trigonometria | Publicada | 10 | 8 | Sin alertas estructurales |
| 27 | Sistemas de medidas angulares i (`sistemas-de-medidas-angulares-i-1sec-unidad2`) | matematica-preuniversitaria/trigonometria | Publicada | 0 | 8 | Teoría por revisar |
| 28 | Sistemas de medidas angulares ii (`sistemas-de-medidas-angulares-ii-1sec-unidad2`) | matematica-preuniversitaria/trigonometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 29 | Tabla de dist de frec para datos sin agrupar (`tabla-de-dist-de-frec-para-datos-sin-agrupar-1sec-unidad2`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 30 | Tabla de distribución de frecuencias para datos sin agrupar (`tabla-de-distribucion-de-frecuencias-para-datos-sin-agrupar-1sec-unidad2`) | matematica-preuniversitaria/estadistica-y-probabilidad | Programada | 0 | 0 | Programada; contenido pendiente |
| 31 | Congruencia de triángulos (`congruencia-de-triangulos-1sec-unidad3`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 32 | Criptoaritmética II (`criptoaritmetica-ii-1sec-unidad3`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 33 | Cuadrados mágicos (`cuadrados-magicos-1sec-unidad3`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 34 | Gráfico de barras (`grafico-de-barras-1sec-unidad3`) | matematica-preuniversitaria/estadistica-y-probabilidad | Programada | 0 | 0 | Programada; contenido pendiente |
| 35 | Gráfico de barras y barras agrupadas (`grafico-de-barras-y-barras-agrupadas-1sec-unidad3`) | matematica-preuniversitaria/estadistica-y-probabilidad | Programada | 0 | 0 | Programada; contenido pendiente |
| 36 | Líneas notables asociadas al triángulo (`lineas-notables-asociadas-al-triangulo-1sec-unidad3`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 37 | Matrices de figuras (`matrices-de-figuras-1sec-unidad3`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 38 | Máximo común divisor y mínimo común múltiplo (`maximo-comun-divisor-y-minimo-comun-multiplo-1sec-unidad3`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 39 | Números primos y compuestos (`numeros-primos-y-compuestos-1sec-unidad3`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 40 | Problemas sobre mcd y mcm (`problemas-sobre-mcd-y-mcm-1sec-unidad3`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 41 | Productos notables (`productos-notables-1sec-unidad3`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 42 | Razones trigonométricas de ángulos agudos (`razones-trigonometricas-de-angulos-agudos-1sec-unidad3`) | matematica-preuniversitaria/trigonometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 43 | RT de un ángulo agudo (`rt-de-un-angulo-agudo-1sec-unidad3`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 44 | Triángulos (`triangulos-1sec-unidad3`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 45 | Adición y sustracción en z (`adicion-y-sustraccion-en-z-1sec-unidad4`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 46 | Cuadriláteros (`cuadrilateros-1sec-unidad4`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 47 | Factorización (`factorizacion-1sec-unidad4`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 48 | Factorización de expresiones algebraicas (`factorizacion-de-expresiones-algebraicas-1sec-unidad4`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 49 | Gráfico lineal (`grafico-lineal-1sec-unidad4`) | matematica-preuniversitaria/estadistica-y-probabilidad | Programada | 0 | 0 | Programada; contenido pendiente |
| 50 | Multiplicación y división en z (`multiplicacion-y-division-en-z-1sec-unidad4`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 51 | Multiplicación y división en z(1) (`multiplicacion-y-division-en-z-1-1sec-unidad4`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 52 | Números enteros (`numeros-enteros-1sec-unidad4`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 53 | Números enteros adición y sustracción (`numeros-enteros-adicion-y-sustraccion-1sec-unidad4`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 54 | Polígonos (`poligonos-1sec-unidad4`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 55 | Potenciación y radicación de números enteros (`potenciacion-y-radicacion-de-numeros-enteros-1sec-unidad4`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 56 | Potenciación y radicación en z (`potenciacion-y-radicacion-en-z-1sec-unidad4`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 57 | Problemas sobre cuatro operaciones (`problemas-sobre-cuatro-operaciones-1sec-unidad4`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 58 | Propiedades de las razones trigonométricas (`propiedades-de-las-razones-trigonometricas-1sec-unidad4`) | matematica-preuniversitaria/trigonometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 59 | Propiedades de las razones trigonométricas de ángulos agudos (`propiedades-de-las-razones-trigonometricas-de-angulos-agudos-1sec-unidad4`) | matematica-preuniversitaria/trigonometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 60 | Propiedades de las razones trigonométricas de un ángulo agudo (`propiedades-de-las-razones-trigonometricas-de-un-angulo-agudo-1sec-unidad4`) | matematica-preuniversitaria/trigonometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 61 | Relaciones de parentesco (`relaciones-de-parentesco-1sec-unidad4`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 62 | Adición sustracción multiplicación y división de fracciones (`adicion-sustraccion-multiplicacion-y-division-de-fracciones-1sec-unidad5`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 63 | Adición y sustracción con fracciones (`adicion-y-sustraccion-con-fracciones-1sec-unidad5`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 64 | Circunferencia (`circunferencia-1sec-unidad5`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 65 | Ecuación de primer grado (`ecuacion-de-primer-grado-1sec-unidad5`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 66 | Ecuación lineal o de primer grado (`ecuacion-lineal-o-de-primer-grado-1sec-unidad5`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 67 | Ecuaciones de primer grado (`ecuaciones-de-primer-grado-1sec-unidad5`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 68 | Gráfico circular (`grafico-circular-1sec-unidad5`) | matematica-preuniversitaria/estadistica-y-probabilidad | Programada | 0 | 0 | Programada; contenido pendiente |
| 69 | Multiplicación y división con fracciones (`multiplicacion-y-division-con-fracciones-1sec-unidad5`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 70 | Números racionales fracciones (`numeros-racionales-fracciones-1sec-unidad5`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 71 | Planteo de ecuaciones (`planteo-de-ecuaciones-1sec-unidad5`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 72 | Potenciación y radicación de fracciones (`potenciacion-y-radicacion-de-fracciones-1sec-unidad5`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 73 | Razones trigonométricas de ángulos notables (`razones-trigonometricas-de-angulos-notables-1sec-unidad5`) | matematica-preuniversitaria/trigonometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 74 | Relaciones de tiempo (`relaciones-de-tiempo-1sec-unidad5`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 75 | Analogías (`analogias-1sec-unidad6`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 76 | Analogías numéricas literales y gráficas (`analogias-numericas-literales-y-graficas-1sec-unidad6`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 77 | Ángulos verticales (`angulos-verticales-1sec-unidad6`) | matematica-preuniversitaria/trigonometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 78 | Cortes estacas y campanadas (`cortes-estacas-y-campanadas-1sec-unidad6`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 79 | Cortes postes estacas y campanadas (`cortes-postes-estacas-y-campanadas-1sec-unidad6`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 80 | Desigualdad e intervalos (`desigualdad-e-intervalos-1sec-unidad6`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 81 | Desigualdades e intervalos (`desigualdades-e-intervalos-1sec-unidad6`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 82 | Distribuciones (`distribuciones-1sec-unidad6`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 83 | Distribuciones numéricas (`distribuciones-numericas-1sec-unidad6`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 84 | Intervalos (`intervalos-1sec-unidad6`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 85 | Intervalos desigualdades e inecuaciones de primer grado (`intervalos-desigualdades-e-inecuaciones-de-primer-grado-1sec-unidad6`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 86 | Medidas de tendencia central (`medidas-de-tendencia-central-1sec-unidad6`) | matematica-preuniversitaria/estadistica-y-probabilidad | Programada | 0 | 0 | Programada; contenido pendiente |
| 87 | Medidas de tendencia central para datos sin agrupar (`medidas-de-tendencia-central-para-datos-sin-agrupar-1sec-unidad6`) | matematica-preuniversitaria/estadistica-y-probabilidad | Programada | 0 | 0 | Programada; contenido pendiente |
| 88 | Números decimales (`numeros-decimales-1sec-unidad6`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 89 | Operaciones con números decimales (`operaciones-con-numeros-decimales-1sec-unidad6`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 90 | Perímetro y área (`perimetro-y-area-1sec-unidad6`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 91 | Perímetro y área de figuras geométricas (`perimetro-y-area-de-figuras-geometricas-1sec-unidad6`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 92 | Análisis combinatorio (`analisis-combinatorio-1sec-unidad7`) | matematica-preuniversitaria/estadistica-y-probabilidad | Programada | 0 | 0 | Programada; contenido pendiente |
| 93 | Conteo de figuras (`conteo-de-figuras-1sec-unidad7`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 94 | Conteo de figuras I (`conteo-de-figuras-i-1sec-unidad7`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 95 | Función lineal y función afín (`funcion-lineal-y-funcion-afin-1sec-unidad7`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 96 | Magnitudes proporcionales (`magnitudes-proporcionales-1sec-unidad7`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 97 | Operadores matemáticos (`operadores-matematicos-1sec-unidad7`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 98 | Planos y mapas a escala (`planos-y-mapas-a-escala-1sec-unidad7`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 99 | Producto cartesiano (`producto-cartesiano-1sec-unidad7`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 100 | Producto cartesiano y relación binaria (`producto-cartesiano-y-relacion-binaria-1sec-unidad7`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 101 | Productos cartesianos y relación binaria (`productos-cartesianos-y-relacion-binaria-1sec-unidad7`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 102 | Razones trigonométricas de un ángulo en posición normal (`razones-trigonometricas-de-un-angulo-en-posicion-normal-1sec-unidad7`) | matematica-preuniversitaria/trigonometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 103 | Razones y proporciones (`razones-y-proporciones-1sec-unidad7`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 104 | Regla de tres (`regla-de-tres-1sec-unidad7`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 105 | Regla de tres simples (`regla-de-tres-simples-1sec-unidad7`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 106 | Sucesiones numéricas (`sucesiones-numericas-1sec-unidad7`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 107 | Sucesiones numéricas y literales (`sucesiones-numericas-y-literales-1sec-unidad7`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 108 | Transformaciones geométricas (`transformaciones-geometricas-1sec-unidad7`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 109 | Conteo de figuras (`conteo-de-figuras-1sec-unidad8`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 110 | Conteo de figuras II (`conteo-de-figuras-ii-1sec-unidad8`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 111 | Figuras de un solo trazo (`figuras-de-un-solo-trazo-1sec-unidad8`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 112 | Patrones geométricos (`patrones-geometricos-1sec-unidad8`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 113 | Poliedro y poliedros regulares (`poliedro-y-poliedros-regulares-1sec-unidad8`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 114 | Porcentaje (`porcentaje-1sec-unidad8`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 115 | Porcentajes (`porcentajes-1sec-unidad8`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 116 | Prisma y pirámide (`prisma-y-piramide-1sec-unidad8`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 117 | Probabilidades (`probabilidades-1sec-unidad8`) | matematica-preuniversitaria/estadistica-y-probabilidad | Programada | 0 | 0 | Programada; contenido pendiente |
| 118 | Progresión aritmética (`progresion-aritmetica-1sec-unidad8`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 119 | Razones trigonométricas de ángulos cuadrantales (`razones-trigonometricas-de-angulos-cuadrantales-1sec-unidad8`) | matematica-preuniversitaria/trigonometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 120 | Sólidos de revolución (`solidos-de-revolucion-1sec-unidad8`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 121 | Sólidos geométricos (`solidos-geometricos-1sec-unidad8`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 122 | Unidades de medida (`unidades-de-medida-1sec-unidad8`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 123 | Unidades de medida y superficie (`unidades-de-medida-y-superficie-1sec-unidad8`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 124 | Unidades de volumen masa y tiempo (`unidades-de-volumen-masa-y-tiempo-1sec-unidad8`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 125 | Ángulo trigonométrico (`angulo-trigonometrico-2sec-unidad1`) | matematica-preuniversitaria/trigonometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 126 | Ángulos (`angulos-2sec-unidad1`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 127 | Criptoaritmética (`criptoaritmetica-2sec-unidad1`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 128 | Expresiones algebraicas (`expresiones-algebraicas-2sec-unidad1`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 129 | Expresiones algebraicas y polinomios (`expresiones-algebraicas-y-polinomios-2sec-unidad1`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 130 | Figura discordante (`figura-discordante-2sec-unidad1`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 131 | Introducción a la estadística (`introduccion-a-la-estadistica-2sec-unidad1`) | matematica-preuniversitaria/estadistica-y-probabilidad | Programada | 0 | 0 | Programada; contenido pendiente |
| 132 | Operaciones con polinomios (`operaciones-con-polinomios-2sec-unidad1`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 133 | Problemas con conjuntos (`problemas-con-conjuntos-2sec-unidad1`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 134 | Segmentos (`segmentos-2sec-unidad1`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 135 | Segmentos de rectas (`segmentos-de-rectas-2sec-unidad1`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 136 | Situaciones lógicas (`situaciones-logicas-2sec-unidad1`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 137 | Teoría de conjuntos (`teoria-de-conjuntos-2sec-unidad1`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 138 | Teoría de conjuntos y operaciones con conjuntos (`teoria-de-conjuntos-y-operaciones-con-conjuntos-2sec-unidad1`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 139 | Análisis e inter de tablas de dist de frec (`analisis-e-inter-de-tablas-de-dist-de-frec-2sec-unidad2`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 140 | Análisis e interpretación de tablas de distribución de frecuencias (`analisis-e-interpretacion-de-tablas-de-distribucion-de-frecuencias-2sec-unidad2`) | matematica-preuniversitaria/estadistica-y-probabilidad | Programada | 0 | 0 | Programada; contenido pendiente |
| 141 | Cuadrados mágicos (`cuadrados-magicos-2sec-unidad2`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 142 | Cuatro operaciones (`cuatro-operaciones-2sec-unidad2`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 143 | Líneas notables (`lineas-notables-2sec-unidad2`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 144 | Líneas notables asociadas al triangulo (`lineas-notables-asociadas-al-triangulo-2sec-unidad2`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 145 | Máximo común divisor y mínimo común múltiplo (`maximo-comun-divisor-y-minimo-comun-multiplo-2sec-unidad2`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 146 | MCD y mcm (`mcd-y-mcm-2sec-unidad2`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 147 | Números primos y compuestos (`numeros-primos-y-compuestos-2sec-unidad2`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 148 | Problemas sobre cuatro operaciones (`problemas-sobre-cuatro-operaciones-2sec-unidad2`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 149 | Productos notables (`productos-notables-2sec-unidad2`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 150 | Propiedades de los números (`propiedades-de-los-numeros-2sec-unidad2`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 151 | Sistemas de medidas angulares (`sistemas-de-medidas-angulares-2sec-unidad2`) | matematica-preuniversitaria/trigonometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 152 | Sistemas de medidas angulares i (`sistemas-de-medidas-angulares-i-2sec-unidad2`) | matematica-preuniversitaria/trigonometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 153 | Sistemas de medidas angulares ii (`sistemas-de-medidas-angulares-ii-2sec-unidad2`) | matematica-preuniversitaria/trigonometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 154 | Sistemas medidas angulares ii ano (`sistemas-medidas-angulares-ii-ano-2sec-unidad2`) | matematica-preuniversitaria/trigonometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 155 | Triángulos (`triangulos-2sec-unidad2`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 156 | Cocientes notables (`cocientes-notables-2sec-unidad3`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 157 | Congruencia de triángulos (`congruencia-de-triangulos-2sec-unidad3`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 158 | Conteo de caras de un sólido (`conteo-de-caras-de-un-solido-2sec-unidad3`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 159 | División algebraica (`division-algebraica-2sec-unidad3`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 160 | Métodos operativos (`metodos-operativos-2sec-unidad3`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 161 | Números enteros (`numeros-enteros-2sec-unidad3`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 162 | Operaciones con números enteros (`operaciones-con-numeros-enteros-2sec-unidad3`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 163 | R T de ángulos agudos (`r-t-de-angulos-agudos-2sec-unidad3`) | matematica-preuniversitaria/trigonometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 164 | Razones trigonométricas de ángulos agudos (`razones-trigonometricas-de-angulos-agudos-2sec-unidad3`) | matematica-preuniversitaria/trigonometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 165 | Razones trigonométricas de un ángulo agudo (`razones-trigonometricas-de-un-angulo-agudo-2sec-unidad3`) | matematica-preuniversitaria/trigonometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 166 | Relaciones de parentesco (`relaciones-de-parentesco-2sec-unidad3`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 167 | Tabla de dist de frec para datos agrupados (`tabla-de-dist-de-frec-para-datos-agrupados-2sec-unidad3`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 168 | Tabla de distribución de frecuencias para datos agrupados (`tabla-de-distribucion-de-frecuencias-para-datos-agrupados-2sec-unidad3`) | matematica-preuniversitaria/estadistica-y-probabilidad | Programada | 0 | 0 | Programada; contenido pendiente |
| 169 | Triángulos rectángulos notables (`triangulos-rectangulos-notables-2sec-unidad3`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 170 | Cuadriláteros (`cuadrilateros-2sec-unidad4`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 171 | Factorización (`factorizacion-2sec-unidad4`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 172 | Fracciones (`fracciones-2sec-unidad4`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 173 | Gráficos estadísticos (`graficos-estadisticos-2sec-unidad4`) | matematica-preuniversitaria/estadistica-y-probabilidad | Programada | 0 | 0 | Programada; contenido pendiente |
| 174 | Gráficos estadísticos I (`graficos-estadisticos-i-2sec-unidad4`) | matematica-preuniversitaria/estadistica-y-probabilidad | Programada | 0 | 0 | Programada; contenido pendiente |
| 175 | Gráficos estadísticos II (`graficos-estadisticos-ii-2sec-unidad4`) | matematica-preuniversitaria/estadistica-y-probabilidad | Programada | 0 | 0 | Programada; contenido pendiente |
| 176 | Números racionales (`numeros-racionales-2sec-unidad4`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 177 | Números racionales fracciones (`numeros-racionales-fracciones-2sec-unidad4`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 178 | Operaciones con fracciones (`operaciones-con-fracciones-2sec-unidad4`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 179 | Planteo de ecuaciones (`planteo-de-ecuaciones-2sec-unidad4`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 180 | Polígono (`poligono-2sec-unidad4`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 181 | Polígonos (`poligonos-2sec-unidad4`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 182 | R T de ángulos notables (`r-t-de-angulos-notables-2sec-unidad4`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 183 | Razones trigonométricas de ángulos notables (`razones-trigonometricas-de-angulos-notables-2sec-unidad4`) | matematica-preuniversitaria/trigonometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 184 | Relaciones de tiempo (`relaciones-de-tiempo-2sec-unidad4`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 185 | Resolución de triángulos rectángulos (`resolucion-de-triangulos-rectangulos-2sec-unidad4`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 186 | Analogías distribuciones numéricas y gráficas (`analogias-distribuciones-numericas-y-graficas-2sec-unidad5`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 187 | Analogías y distribuciones (`analogias-y-distribuciones-2sec-unidad5`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 188 | Ángulos en la circunferencia (`angulos-en-la-circunferencia-2sec-unidad5`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 189 | Ángulos verticales (`angulos-verticales-2sec-unidad5`) | matematica-preuniversitaria/trigonometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 190 | Circunferencia (`circunferencia-2sec-unidad5`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 191 | Ecuación de primer grado (`ecuacion-de-primer-grado-2sec-unidad5`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 192 | Ecuaciones de primer grado (`ecuaciones-de-primer-grado-2sec-unidad5`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 193 | Medidas de tendencia central para datos sin agrupar (`medidas-de-tendencia-central-para-datos-sin-agrupar-2sec-unidad5`) | matematica-preuniversitaria/estadistica-y-probabilidad | Programada | 0 | 0 | Programada; contenido pendiente |
| 194 | Números decimales (`numeros-decimales-2sec-unidad5`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 195 | Operaciones con números decimales (`operaciones-con-numeros-decimales-2sec-unidad5`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 196 | Operadores matemáticos (`operadores-matematicos-2sec-unidad5`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 197 | Perímetro y área de figuras geométricas (`perimetro-y-area-de-figuras-geometricas-2sec-unidad5`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 198 | Perímetro y área de figuras planas (`perimetro-y-area-de-figuras-planas-2sec-unidad5`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 199 | Planteo de ecuaciones (`planteo-de-ecuaciones-2sec-unidad5`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 200 | Problemas con números decimales (`problemas-con-numeros-decimales-2sec-unidad5`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 201 | Psicotécnico 5 secuencia de figuras (`psicotecnico-5-secuencia-de-figuras-2sec-unidad5`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 202 | Sistema de ecuaciones (`sistema-de-ecuaciones-2sec-unidad5`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 203 | Cortes estacas campanadas y pastillas (`cortes-estacas-campanadas-y-pastillas-2sec-unidad6`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 204 | Cortes estacas y campanadas (`cortes-estacas-y-campanadas-2sec-unidad6`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 205 | Cortes2c estacas y campanadas (`cortes2c-estacas-y-campanadas-2sec-unidad6`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 206 | Ecuación cuadrática (`ecuacion-cuadratica-2sec-unidad6`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 207 | Medidas de tendencia central para datos agrupados (`medidas-de-tendencia-central-para-datos-agrupados-2sec-unidad6`) | matematica-preuniversitaria/estadistica-y-probabilidad | Programada | 0 | 0 | Programada; contenido pendiente |
| 208 | Ordenamiento lineal (`ordenamiento-lineal-2sec-unidad6`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 209 | Planos y mapas a escala (`planos-y-mapas-a-escala-2sec-unidad6`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 210 | Razones trigonométricas de un ángulo en posición normal (`razones-trigonometricas-de-un-angulo-en-posicion-normal-2sec-unidad6`) | matematica-preuniversitaria/trigonometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 211 | Razones y proporciones (`razones-y-proporciones-2sec-unidad6`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 212 | Transformaciones geométricas (`transformaciones-geometricas-2sec-unidad6`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 213 | Análisis combinatorio (`analisis-combinatorio-2sec-unidad7`) | matematica-preuniversitaria/estadistica-y-probabilidad | Programada | 0 | 0 | Programada; contenido pendiente |
| 214 | Ángulos diedros y ángulos poliedros (`angulos-diedros-y-angulos-poliedros-2sec-unidad7`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 215 | Ángulos diedros y poliedros (`angulos-diedros-y-poliedros-2sec-unidad7`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 216 | Conteo de figuras (`conteo-de-figuras-2sec-unidad7`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 217 | Geometría del espacio (`geometria-del-espacio-2sec-unidad7`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 218 | Inecuaciones lineales (`inecuaciones-lineales-2sec-unidad7`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 219 | Inecuaciones lineales y cuadráticas (`inecuaciones-lineales-y-cuadraticas-2sec-unidad7`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 220 | Magnitudes proporcionales (`magnitudes-proporcionales-2sec-unidad7`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 221 | Ordenamiento circular (`ordenamiento-circular-2sec-unidad7`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 222 | Poliedro y poliedros regulares (`poliedro-y-poliedros-regulares-2sec-unidad7`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 223 | Poliedros regulares (`poliedros-regulares-2sec-unidad7`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 224 | Reducción al primer cuadrante (`reduccion-al-primer-cuadrante-2sec-unidad7`) | matematica-preuniversitaria/trigonometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 225 | Regla de tres (`regla-de-tres-2sec-unidad7`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 226 | Regla de tres simple y compuesta (`regla-de-tres-simple-y-compuesta-2sec-unidad7`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 227 | Circunferencia trigonométrica (`circunferencia-trigonometrica-2sec-unidad8`) | matematica-preuniversitaria/trigonometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 228 | Función lineal y función afín (`funcion-lineal-y-funcion-afin-2sec-unidad8`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 229 | Funciones (`funciones-2sec-unidad8`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 230 | Perímetro y área de regiones sombreadas (`perimetro-y-area-de-regiones-sombreadas-2sec-unidad8`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 231 | Porcentaje (`porcentaje-2sec-unidad8`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 232 | Porcentajes (`porcentajes-2sec-unidad8`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 233 | Prisma y pirámide (`prisma-y-piramide-2sec-unidad8`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 234 | Probabilidades (`probabilidades-2sec-unidad8`) | matematica-preuniversitaria/estadistica-y-probabilidad | Programada | 0 | 0 | Programada; contenido pendiente |
| 235 | Progresión aritmética (`progresion-aritmetica-2sec-unidad8`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 236 | Promedios (`promedios-2sec-unidad8`) | matematica-preuniversitaria/estadistica-y-probabilidad | Programada | 0 | 0 | Programada; contenido pendiente |
| 237 | Sólidos de revolución (`solidos-de-revolucion-2sec-unidad8`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 238 | Sucesiones (`sucesiones-2sec-unidad8`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 239 | Sucesiones numéricas y literales (`sucesiones-numericas-y-literales-2sec-unidad8`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 240 | Ángulos (`angulos-3sec-unidad1`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 241 | Conteo de cubos (`conteo-de-cubos-3sec-unidad1`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 242 | Introducción a la estadística (`introduccion-a-la-estadistica-3sec-unidad1`) | matematica-preuniversitaria/estadistica-y-probabilidad | Programada | 0 | 0 | Programada; contenido pendiente |
| 243 | Lógica proposicional (`logica-proposicional-3sec-unidad1`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 244 | Operaciones con polinomios (`operaciones-con-polinomios-3sec-unidad1`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 245 | Polinomios (`polinomios-3sec-unidad1`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 246 | Razonamiento inductivo I (`razonamiento-inductivo-i-3sec-unidad1`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 247 | Sistema de medidas angulares (`sistema-de-medidas-angulares-3sec-unidad1`) | matematica-preuniversitaria/trigonometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 248 | Situaciones lógicas (`situaciones-logicas-3sec-unidad1`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 249 | Triángulos (`triangulos-3sec-unidad1`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 250 | Cocientes notables (`cocientes-notables-3sec-unidad2`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 251 | Congruencia de triángulos (`congruencia-de-triangulos-3sec-unidad2`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 252 | Cuadrados mágicos (`cuadrados-magicos-3sec-unidad2`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 253 | División algebraica (`division-algebraica-3sec-unidad2`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 254 | Polígonos (`poligonos-3sec-unidad2`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 255 | Productos notables (`productos-notables-3sec-unidad2`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 256 | Razonamiento inductivo II (`razonamiento-inductivo-ii-3sec-unidad2`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 257 | Razones trigonométricas de un ángulo agudo (`razones-trigonometricas-de-un-angulo-agudo-3sec-unidad2`) | matematica-preuniversitaria/trigonometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 258 | RT de un ángulo agudo (`rt-de-un-angulo-agudo-3sec-unidad2`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 259 | Sistemas de numeración (`sistemas-de-numeracion-3sec-unidad2`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 260 | Tabla de distribución de frecuencias para datos sin agrupar (`tabla-de-distribucion-de-frecuencias-para-datos-sin-agrupar-3sec-unidad2`) | matematica-preuniversitaria/estadistica-y-probabilidad | Programada | 0 | 0 | Programada; contenido pendiente |
| 261 | Triángulos rectángulos notables (`triangulos-rectangulos-notables-3sec-unidad2`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 262 | Ángulo de la circunferencia (`angulo-de-la-circunferencia-3sec-unidad3`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 263 | Circunferencia (`circunferencia-3sec-unidad3`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 264 | Cuadriláteros (`cuadrilateros-3sec-unidad3`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 265 | Factorización (`factorizacion-3sec-unidad3`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 266 | Métodos operativos (`metodos-operativos-3sec-unidad3`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 267 | Operaciones básicas en Z (`operaciones-basicas-en-z-3sec-unidad3`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 268 | Razones trigonométricas de ángulos notables (`razones-trigonometricas-de-angulos-notables-3sec-unidad3`) | matematica-preuniversitaria/trigonometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 269 | Relaciones de parentesco (`relaciones-de-parentesco-3sec-unidad3`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 270 | Resolución de triángulos rectángulos (`resolucion-de-triangulos-rectangulos-3sec-unidad3`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 271 | Tabla de distribución de frecuencias para datos agrupados (`tabla-de-distribucion-de-frecuencias-para-datos-agrupados-3sec-unidad3`) | matematica-preuniversitaria/estadistica-y-probabilidad | Programada | 0 | 0 | Programada; contenido pendiente |
| 272 | Ángulos verticales (`angulos-verticales-3sec-unidad4`) | matematica-preuniversitaria/trigonometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 273 | Ecuación de primer grado (`ecuacion-de-primer-grado-3sec-unidad4`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 274 | Fracciones algebraicas (`fracciones-algebraicas-3sec-unidad4`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 275 | Gráficos estadísticos (`graficos-estadisticos-3sec-unidad4`) | matematica-preuniversitaria/estadistica-y-probabilidad | Programada | 0 | 0 | Programada; contenido pendiente |
| 276 | MCD y mcm (`mcd-y-mcm-3sec-unidad4`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 277 | MCD y mcm de expresiones algebraicas (`mcd-y-mcm-de-expresiones-algebraicas-3sec-unidad4`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 278 | Planteo de ecuaciones (`planteo-de-ecuaciones-3sec-unidad4`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 279 | Problemas de calendarios (`problemas-de-calendarios-3sec-unidad4`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 280 | Problemas sobre calendarios (`problemas-sobre-calendarios-3sec-unidad4`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 281 | Problemas sobre relación de tiempos (`problemas-sobre-relacion-de-tiempos-3sec-unidad4`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 282 | Propiedades de los números (`propiedades-de-los-numeros-3sec-unidad4`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 283 | Proporcionalidad geométrica (`proporcionalidad-geometrica-3sec-unidad4`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 284 | Relaciones de tiempo (`relaciones-de-tiempo-3sec-unidad4`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 285 | Semejanza de triángulos (`semejanza-de-triangulos-3sec-unidad4`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 286 | Cronometría (`cronometria-3sec-unidad5`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 287 | Edades (`edades-3sec-unidad5`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 288 | Medidas de tendencia central (`medidas-de-tendencia-central-3sec-unidad5`) | matematica-preuniversitaria/estadistica-y-probabilidad | Programada | 0 | 0 | Programada; contenido pendiente |
| 289 | Números reales (`numeros-reales-3sec-unidad5`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 290 | Números reales intervalos y valor absoluto (`numeros-reales-intervalos-y-valor-absoluto-3sec-unidad5`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 291 | Ordenamiento lineal (`ordenamiento-lineal-3sec-unidad5`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 292 | Ordenamiento lineal y circular (`ordenamiento-lineal-y-circular-3sec-unidad5`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 293 | Perímetro y área de figuras geométricas (`perimetro-y-area-de-figuras-geometricas-3sec-unidad5`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 294 | Perímetros y área de figuras geométricas (`perimetros-y-area-de-figuras-geometricas-3sec-unidad5`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 295 | Problemas sobre edades (`problemas-sobre-edades-3sec-unidad5`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 296 | R T De un ángulo en posición normal (`r-t-de-un-angulo-en-posicion-normal-3sec-unidad5`) | matematica-preuniversitaria/trigonometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 297 | Radicales (`radicales-3sec-unidad5`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 298 | Sistema de ecuaciones lineales (`sistema-de-ecuaciones-lineales-3sec-unidad5`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 299 | Despliegue de sólidos (`despliegue-de-solidos-3sec-unidad6`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 300 | Ecuación cuadrática (`ecuacion-cuadratica-3sec-unidad6`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 301 | Ecuación cuadrática o de segundo grado (`ecuacion-cuadratica-o-de-segundo-grado-3sec-unidad6`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 302 | Inecuaciones lineales (`inecuaciones-lineales-3sec-unidad6`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 303 | Magnitudes proporcionales (`magnitudes-proporcionales-3sec-unidad6`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 304 | Medidas de dispersión para datos sin agrupar (`medidas-de-dispersion-para-datos-sin-agrupar-3sec-unidad6`) | matematica-preuniversitaria/estadistica-y-probabilidad | Programada | 0 | 0 | Programada; contenido pendiente |
| 305 | Operadores matemáticos (`operadores-matematicos-3sec-unidad6`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 306 | Ordenamiento por categorías (`ordenamiento-por-categorias-3sec-unidad6`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 307 | Planos y mapas a escala (`planos-y-mapas-a-escala-3sec-unidad6`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 308 | Razones y proporciones (`razones-y-proporciones-3sec-unidad6`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 309 | Reducción al primer cuadrante (`reduccion-al-primer-cuadrante-3sec-unidad6`) | matematica-preuniversitaria/trigonometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 310 | Regla de tres simples (`regla-de-tres-simples-3sec-unidad6`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 311 | Transformaciones geométricas (`transformaciones-geometricas-3sec-unidad6`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 312 | Análisis combinatorio (`analisis-combinatorio-3sec-unidad7`) | matematica-preuniversitaria/estadistica-y-probabilidad | Programada | 0 | 0 | Programada; contenido pendiente |
| 313 | Ángulo diedro y poliedros (`angulo-diedro-y-poliedros-3sec-unidad7`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 314 | Ángulos diedros y ángulos poliedros (`angulos-diedros-y-angulos-poliedros-3sec-unidad7`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 315 | Circunferencia trigonométrica (`circunferencia-trigonometrica-3sec-unidad7`) | matematica-preuniversitaria/trigonometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 316 | Conteo de figuras (`conteo-de-figuras-3sec-unidad7`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 317 | Geometría del espacio (`geometria-del-espacio-3sec-unidad7`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 318 | Inecuaciones cuadráticas (`inecuaciones-cuadraticas-3sec-unidad7`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 319 | Inecuaciones lineales y cuadráticas (`inecuaciones-lineales-y-cuadraticas-3sec-unidad7`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 320 | Poliedro (`poliedro-3sec-unidad7`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 321 | Poliedros regulares (`poliedros-regulares-3sec-unidad7`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 322 | Porcentajes (`porcentajes-3sec-unidad7`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 323 | Regla de tres simple y compuesta (`regla-de-tres-simple-y-compuesta-3sec-unidad7`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 324 | Sucesiones (`sucesiones-3sec-unidad7`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 325 | Certezas (`certezas-3sec-unidad8`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 326 | Funciones (`funciones-3sec-unidad8`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 327 | Funciones especiales (`funciones-especiales-3sec-unidad8`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 328 | Identidades trigonométricas auxiliares (`identidades-trigonometricas-auxiliares-3sec-unidad8`) | matematica-preuniversitaria/trigonometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 329 | Identidades trigonométricas I (`identidades-trigonometricas-i-3sec-unidad8`) | matematica-preuniversitaria/trigonometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 330 | Identidades trigonométricas II (`identidades-trigonometricas-ii-3sec-unidad8`) | matematica-preuniversitaria/trigonometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 331 | Interés simple (`interes-simple-3sec-unidad8`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 332 | Perímetro y área de regiones sombreadas (`perimetro-y-area-de-regiones-sombreadas-3sec-unidad8`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 333 | Prisma y pirámide (`prisma-y-piramide-3sec-unidad8`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 334 | Probabilidades (`probabilidades-3sec-unidad8`) | matematica-preuniversitaria/estadistica-y-probabilidad | Programada | 0 | 0 | Programada; contenido pendiente |
| 335 | Progresión geométrica (`progresion-geometrica-3sec-unidad8`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 336 | Promedios (`promedios-3sec-unidad8`) | matematica-preuniversitaria/estadistica-y-probabilidad | Programada | 0 | 0 | Programada; contenido pendiente |
| 337 | Sólidos de revolución (`solidos-de-revolucion-3sec-unidad8`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 338 | Analogías graficas (`analogias-graficas-4sec-unidad1`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 339 | Conteo de rutas y caminos (`conteo-de-rutas-y-caminos-4sec-unidad1`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 340 | Estadística (`estadistica-4sec-unidad1`) | matematica-preuniversitaria/estadistica-y-probabilidad | Programada | 0 | 0 | Programada; contenido pendiente |
| 341 | Introducción a la estadística (`introduccion-a-la-estadistica-4sec-unidad1`) | matematica-preuniversitaria/estadistica-y-probabilidad | Programada | 0 | 0 | Programada; contenido pendiente |
| 342 | Líneas notables asociadas al triángulo (`lineas-notables-asociadas-al-triangulo-4sec-unidad1`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 343 | Lógica proposicional (`logica-proposicional-4sec-unidad1`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 344 | Productos notables (`productos-notables-4sec-unidad1`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 345 | Razonamiento inductivo (`razonamiento-inductivo-4sec-unidad1`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 346 | Razones trigonométricas de ángulos agudos (`razones-trigonometricas-de-angulos-agudos-4sec-unidad1`) | matematica-preuniversitaria/trigonometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 347 | Situaciones lógicas (`situaciones-logicas-4sec-unidad1`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 348 | Teoría de exponentes (`teoria-de-exponentes-4sec-unidad1`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 349 | Triángulos (`triangulos-4sec-unidad1`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 350 | Arreglos numéricos (`arreglos-numericos-4sec-unidad2`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 351 | Cocientes notables (`cocientes-notables-4sec-unidad2`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 352 | Congruencia de triángulos (`congruencia-de-triangulos-4sec-unidad2`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 353 | Cuadrilátero (`cuadrilatero-4sec-unidad2`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 354 | Cuadriláteros (`cuadrilateros-4sec-unidad2`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 355 | División algebraica (`division-algebraica-4sec-unidad2`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 356 | Polígonos (`poligonos-4sec-unidad2`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 357 | R T ángulos notables (`r-t-angulos-notables-4sec-unidad2`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 358 | Razonamiento deductivo (`razonamiento-deductivo-4sec-unidad2`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 359 | Razones trigonométricas de ángulos notables (`razones-trigonometricas-de-angulos-notables-4sec-unidad2`) | matematica-preuniversitaria/trigonometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 360 | Resolución de triángulos rectángulos (`resolucion-de-triangulos-rectangulos-4sec-unidad2`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 361 | Sistemas de numeración (`sistemas-de-numeracion-4sec-unidad2`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 362 | Tabla de distribución de frecuencias para datos agrupados (`tabla-de-distribucion-de-frecuencias-para-datos-agrupados-4sec-unidad2`) | matematica-preuniversitaria/estadistica-y-probabilidad | Programada | 0 | 0 | Programada; contenido pendiente |
| 363 | Tablas de distribución de frecuencias para datos agrupados (`tablas-de-distribucion-de-frecuencias-para-datos-agrupados-4sec-unidad2`) | matematica-preuniversitaria/estadistica-y-probabilidad | Programada | 0 | 0 | Programada; contenido pendiente |
| 364 | Ángulos verticales (`angulos-verticales-4sec-unidad3`) | matematica-preuniversitaria/trigonometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 365 | Circunferencia (`circunferencia-4sec-unidad3`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 366 | Factorización (`factorizacion-4sec-unidad3`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 367 | Gráficos estadísticos (`graficos-estadisticos-4sec-unidad3`) | matematica-preuniversitaria/estadistica-y-probabilidad | Programada | 0 | 0 | Programada; contenido pendiente |
| 368 | Máximo común divisor y mínimo común múltiplo (`maximo-comun-divisor-y-minimo-comun-multiplo-4sec-unidad3`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 369 | MCD y mcm (`mcd-y-mcm-4sec-unidad3`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 370 | Métodos operativos (`metodos-operativos-4sec-unidad3`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 371 | Propiedades de los números (`propiedades-de-los-numeros-4sec-unidad3`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 372 | Proporcionalidad geométrica (`proporcionalidad-geometrica-4sec-unidad3`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 373 | Psicotécnico despliegue de cubos (`psicotecnico-despliegue-de-cubos-4sec-unidad3`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 374 | Traslado y trasvases (`traslado-y-trasvases-4sec-unidad3`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 375 | Traslados (`traslados-4sec-unidad3`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 376 | Ecuación de primer grado (`ecuacion-de-primer-grado-4sec-unidad4`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 377 | Fracciones algebraicas (`fracciones-algebraicas-4sec-unidad4`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 378 | Intervalos y valor absoluto (`intervalos-y-valor-absoluto-4sec-unidad4`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 379 | Matrices de figuras (`matrices-de-figuras-4sec-unidad4`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 380 | Medidas de tendencia central (`medidas-de-tendencia-central-4sec-unidad4`) | matematica-preuniversitaria/estadistica-y-probabilidad | Programada | 0 | 0 | Programada; contenido pendiente |
| 381 | Números reales (`numeros-reales-4sec-unidad4`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 382 | Parentesco y relación de tiempos (`parentesco-y-relacion-de-tiempos-4sec-unidad4`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 383 | Planteo de ecuaciones (`planteo-de-ecuaciones-4sec-unidad4`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 384 | Razones trigonométricas de un ángulo en posición normal (`razones-trigonometricas-de-un-angulo-en-posicion-normal-4sec-unidad4`) | matematica-preuniversitaria/trigonometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 385 | Reducción al primer cuadrante (`reduccion-al-primer-cuadrante-4sec-unidad4`) | matematica-preuniversitaria/trigonometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 386 | Relaciones de parentesco y tiempo (`relaciones-de-parentesco-y-tiempo-4sec-unidad4`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 387 | Relaciones métricas en el triángulo oblicuángulo (`relaciones-metricas-en-el-triangulo-oblicuangulo-4sec-unidad4`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 388 | Relaciones métricas en el triángulo rectángulo (`relaciones-metricas-en-el-triangulo-rectangulo-4sec-unidad4`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 389 | Relaciones métricas en el triángulo rectángulo y oblicuángulo (`relaciones-metricas-en-el-triangulo-rectangulo-y-oblicuangulo-4sec-unidad4`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 390 | Relaciones métricas en triangulo oblicuángulo (`relaciones-metricas-en-triangulo-oblicuangulo-4sec-unidad4`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 391 | Relaciones métricas en triángulo rectángulo (`relaciones-metricas-en-triangulo-rectangulo-4sec-unidad4`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 392 | RT de un ángulo en posición normal (`rt-de-un-angulo-en-posicion-normal-4sec-unidad4`) | matematica-preuniversitaria/trigonometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 393 | Semejanza de triángulos (`semejanza-de-triangulos-4sec-unidad4`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 394 | Área de figuras geométricas (`area-de-figuras-geometricas-4sec-unidad5`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 395 | Circunferencia trigonométrica (`circunferencia-trigonometrica-4sec-unidad5`) | matematica-preuniversitaria/trigonometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 396 | Cronometría (`cronometria-4sec-unidad5`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 397 | Identidades trigonométricas (`identidades-trigonometricas-4sec-unidad5`) | matematica-preuniversitaria/trigonometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 398 | Magnitudes proporcionales (`magnitudes-proporcionales-4sec-unidad5`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 399 | Medidas de tendencia no central (`medidas-de-tendencia-no-central-4sec-unidad5`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 400 | Ordenamiento lineal (`ordenamiento-lineal-4sec-unidad5`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 401 | Ordenamiento lineal y circular (`ordenamiento-lineal-y-circular-4sec-unidad5`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 402 | Razones y proporciones (`razones-y-proporciones-4sec-unidad5`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 403 | Relaciones métricas en la circunferencia (`relaciones-metricas-en-la-circunferencia-4sec-unidad5`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 404 | Sistema de ecuaciones (`sistema-de-ecuaciones-4sec-unidad5`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 405 | Sistema de ecuaciones lineales (`sistema-de-ecuaciones-lineales-4sec-unidad5`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 406 | Ecuación cuadrática (`ecuacion-cuadratica-4sec-unidad6`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 407 | Ecuación cuadrática racional e irracional (`ecuacion-cuadratica-racional-e-irracional-4sec-unidad6`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 408 | Identidades de ángulos compuestos (`identidades-de-angulos-compuestos-4sec-unidad6`) | matematica-preuniversitaria/trigonometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 409 | Identidades de ángulos múltiples (`identidades-de-angulos-multiples-4sec-unidad6`) | matematica-preuniversitaria/trigonometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 410 | Inecuaciones lineales y cuadráticas (`inecuaciones-lineales-y-cuadraticas-4sec-unidad6`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 411 | Medidas de dispersión (`medidas-de-dispersion-4sec-unidad6`) | matematica-preuniversitaria/estadistica-y-probabilidad | Programada | 0 | 0 | Programada; contenido pendiente |
| 412 | Operadores matemáticos (`operadores-matematicos-4sec-unidad6`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 413 | Ordenamiento por categorías (`ordenamiento-por-categorias-4sec-unidad6`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 414 | Planos y mapas a escala (`planos-y-mapas-a-escala-4sec-unidad6`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 415 | Regla de tres simple y compuesta (`regla-de-tres-simple-y-compuesta-4sec-unidad6`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 416 | Reparto proporcional (`reparto-proporcional-4sec-unidad6`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 417 | Transformaciones geométricas (`transformaciones-geometricas-4sec-unidad6`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 418 | Análisis combinatorio (`analisis-combinatorio-4sec-unidad7`) | matematica-preuniversitaria/estadistica-y-probabilidad | Programada | 0 | 0 | Programada; contenido pendiente |
| 419 | Fracciones (`fracciones-4sec-unidad7`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 420 | Funciones (`funciones-4sec-unidad7`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 421 | Funciones II (`funciones-ii-4sec-unidad7`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 422 | Geometría del espacio (`geometria-del-espacio-4sec-unidad7`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 423 | Porcentajes (`porcentajes-4sec-unidad7`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 424 | Prisma y pirámide (`prisma-y-piramide-4sec-unidad7`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 425 | Problemas con fracciones (`problemas-con-fracciones-4sec-unidad7`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 426 | Relaciones (`relaciones-4sec-unidad7`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 427 | Sólidos de revolución (`solidos-de-revolucion-4sec-unidad7`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 428 | Transformaciones trigonométricas (`transformaciones-trigonometricas-4sec-unidad7`) | matematica-preuniversitaria/trigonometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 429 | Verdades y mentiras (`verdades-y-mentiras-4sec-unidad7`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 430 | Certeza (`certeza-4sec-unidad8`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 431 | Certezas (`certezas-4sec-unidad8`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 432 | Estudio de la recta (`estudio-de-la-recta-4sec-unidad8`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 433 | Funciones trigonométricas (`funciones-trigonometricas-4sec-unidad8`) | matematica-preuniversitaria/trigonometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 434 | Interés simple y compuesto (`interes-simple-y-compuesto-4sec-unidad8`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 435 | Introducción a la geometría analítica (`introduccion-a-la-geometria-analitica-4sec-unidad8`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 436 | Perímetro y área de regiones sombreadas (`perimetro-y-area-de-regiones-sombreadas-4sec-unidad8`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 437 | Probabilidades (`probabilidades-4sec-unidad8`) | matematica-preuniversitaria/estadistica-y-probabilidad | Programada | 0 | 0 | Programada; contenido pendiente |
| 438 | Promedios (`promedios-4sec-unidad8`) | matematica-preuniversitaria/estadistica-y-probabilidad | Programada | 0 | 0 | Programada; contenido pendiente |
| 439 | Regla de interés (`regla-de-interes-4sec-unidad8`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 440 | Sucesiones y progresiones (`sucesiones-y-progresiones-4sec-unidad8`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 441 | Congruencia de triángulos (`congruencia-de-triangulos-5sec-unidad1`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 442 | Factorización (`factorizacion-5sec-unidad1`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 443 | Introducción a la estadística (`introduccion-a-la-estadistica-5sec-unidad1`) | matematica-preuniversitaria/estadistica-y-probabilidad | Programada | 0 | 0 | Programada; contenido pendiente |
| 444 | Líneas notables asociadas al triangulo (`lineas-notables-asociadas-al-triangulo-5sec-unidad1`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 445 | Lógica proposicional (`logica-proposicional-5sec-unidad1`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 446 | Longitud de arco y sector circular (`longitud-de-arco-y-sector-circular-5sec-unidad1`) | matematica-preuniversitaria/trigonometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 447 | Productos notables (`productos-notables-5sec-unidad1`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 448 | Razonamiento inductivo (`razonamiento-inductivo-5sec-unidad1`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 449 | Razones trigonométricas ángulos agudos y notables (`razones-trigonometricas-angulos-agudos-y-notables-5sec-unidad1`) | matematica-preuniversitaria/trigonometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 450 | Razones trigonométricas de ángulos agudos (`razones-trigonometricas-de-angulos-agudos-5sec-unidad1`) | matematica-preuniversitaria/trigonometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 451 | Ruta trayectorias y puntos cardinales (`ruta-trayectorias-y-puntos-cardinales-5sec-unidad1`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 452 | Rutas y trayectorias (`rutas-y-trayectorias-5sec-unidad1`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 453 | Tabla de distribución de frecuencias para datos sin agrupar (`tabla-de-distribucion-de-frecuencias-para-datos-sin-agrupar-5sec-unidad1`) | matematica-preuniversitaria/estadistica-y-probabilidad | Programada | 0 | 0 | Programada; contenido pendiente |
| 454 | Teoría de exponentes (`teoria-de-exponentes-5sec-unidad1`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 455 | Triángulos (`triangulos-5sec-unidad1`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 456 | Circunferencia (`circunferencia-5sec-unidad2`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 457 | Cuadriláteros (`cuadrilateros-5sec-unidad2`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 458 | Determinantes (`determinantes-5sec-unidad2`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 459 | Matrices (`matrices-5sec-unidad2`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 460 | Polígonos (`poligonos-5sec-unidad2`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 461 | Razonamiento deductivo (`razonamiento-deductivo-5sec-unidad2`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 462 | Razones trigonométricas de ángulos notables (`razones-trigonometricas-de-angulos-notables-5sec-unidad2`) | matematica-preuniversitaria/trigonometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 463 | Resolución de triángulos rectángulos (`resolucion-de-triangulos-rectangulos-5sec-unidad2`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 464 | RT de ángulos notables y resolución de triángulos rectángulos (`rt-de-angulos-notables-y-resolucion-de-triangulos-rectangulos-5sec-unidad2`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 465 | Secuencia de figuras (`secuencia-de-figuras-5sec-unidad2`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 466 | Sistema de numeración (`sistema-de-numeracion-5sec-unidad2`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 467 | Sistemas de numeración (`sistemas-de-numeracion-5sec-unidad2`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 468 | Tabla de distribución de frecuencias para datos agrupados (`tabla-de-distribucion-de-frecuencias-para-datos-agrupados-5sec-unidad2`) | matematica-preuniversitaria/estadistica-y-probabilidad | Programada | 0 | 0 | Programada; contenido pendiente |
| 469 | Traslados y trasvases (`traslados-y-trasvases-5sec-unidad2`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 470 | Ángulos verticales (`angulos-verticales-5sec-unidad3`) | matematica-preuniversitaria/trigonometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 471 | Ángulos verticales y horizontales (`angulos-verticales-y-horizontales-5sec-unidad3`) | matematica-preuniversitaria/trigonometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 472 | Cronometría (`cronometria-5sec-unidad3`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 473 | Ecuación cuadrática (`ecuacion-cuadratica-5sec-unidad3`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 474 | Ecuación cuadrática racional e irracional (`ecuacion-cuadratica-racional-e-irracional-5sec-unidad3`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 475 | Ecuación lineal (`ecuacion-lineal-5sec-unidad3`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 476 | Ecuación lineal y sistema de ecuaciones (`ecuacion-lineal-y-sistema-de-ecuaciones-5sec-unidad3`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 477 | Gráficos estadísticos (`graficos-estadisticos-5sec-unidad3`) | matematica-preuniversitaria/estadistica-y-probabilidad | Programada | 0 | 0 | Programada; contenido pendiente |
| 478 | Máximo común divisor y mínimo común múltiplo (`maximo-comun-divisor-y-minimo-comun-multiplo-5sec-unidad3`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 479 | MCD y mcm (`mcd-y-mcm-5sec-unidad3`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 480 | Poleas y engranajes (`poleas-y-engranajes-5sec-unidad3`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 481 | Proporcionalidad geométrica (`proporcionalidad-geometrica-5sec-unidad3`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 482 | Semejanza de triángulos (`semejanza-de-triangulos-5sec-unidad3`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 483 | Sistema de ecuaciones (`sistema-de-ecuaciones-5sec-unidad3`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 484 | Teoría de los números (`teoria-de-los-numeros-5sec-unidad3`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 485 | Teoría de números (`teoria-de-numeros-5sec-unidad3`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 486 | Inecuación lineal (`inecuacion-lineal-5sec-unidad4`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 487 | Inecuaciones (`inecuaciones-5sec-unidad4`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 488 | Logaritmos (`logaritmos-5sec-unidad4`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 489 | Medidas de tendencia central (`medidas-de-tendencia-central-5sec-unidad4`) | matematica-preuniversitaria/estadistica-y-probabilidad | Programada | 0 | 0 | Programada; contenido pendiente |
| 490 | Números reales (`numeros-reales-5sec-unidad4`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 491 | Ordenamiento por categorías (`ordenamiento-por-categorias-5sec-unidad4`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 492 | Planteo de ecuaciones (`planteo-de-ecuaciones-5sec-unidad4`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 493 | Planteo de ecuaciones y problemas sobre edades (`planteo-de-ecuaciones-y-problemas-sobre-edades-5sec-unidad4`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 494 | R M en el triángulo rectángulo y oblicuángulo (`r-m-en-el-triangulo-rectangulo-y-oblicuangulo-5sec-unidad4`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 495 | R T de un ángulo en posición normal (`r-t-de-un-angulo-en-posicion-normal-5sec-unidad4`) | matematica-preuniversitaria/trigonometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 496 | Razones trigonométricas de ángulos en posición normal (`razones-trigonometricas-de-angulos-en-posicion-normal-5sec-unidad4`) | matematica-preuniversitaria/trigonometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 497 | Reducción al primer cuadrante (`reduccion-al-primer-cuadrante-5sec-unidad4`) | matematica-preuniversitaria/trigonometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 498 | Relaciones métricas en el triángulo rectángulo (`relaciones-metricas-en-el-triangulo-rectangulo-5sec-unidad4`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 499 | Relaciones métricas en la circunferencia (`relaciones-metricas-en-la-circunferencia-5sec-unidad4`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 500 | Área de figuras geométricas (`area-de-figuras-geometricas-5sec-unidad5`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 501 | Certezas (`certezas-5sec-unidad5`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 502 | Circunferencia trigonométrica (`circunferencia-trigonometrica-5sec-unidad5`) | matematica-preuniversitaria/trigonometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 503 | Figura discordante (`figura-discordante-5sec-unidad5`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 504 | Fracciones (`fracciones-5sec-unidad5`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 505 | Funciones especiales (`funciones-especiales-5sec-unidad5`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 506 | Funciones I (`funciones-i-5sec-unidad5`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 507 | Identidades trigonométricas (`identidades-trigonometricas-5sec-unidad5`) | matematica-preuniversitaria/trigonometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 508 | Magnitudes proporcionales (`magnitudes-proporcionales-5sec-unidad5`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 509 | Medidas de tendencia no central (`medidas-de-tendencia-no-central-5sec-unidad5`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 510 | Perímetro y área de figuras geométricas (`perimetro-y-area-de-figuras-geometricas-5sec-unidad5`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 511 | Problemas con fracciones (`problemas-con-fracciones-5sec-unidad5`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 512 | Razones y proporciones (`razones-y-proporciones-5sec-unidad5`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 513 | Funciones II (`funciones-ii-5sec-unidad6`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 514 | Identidades de ángulos compuestos (`identidades-de-angulos-compuestos-5sec-unidad6`) | matematica-preuniversitaria/trigonometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 515 | Identidades de ángulos múltiples (`identidades-de-angulos-multiples-5sec-unidad6`) | matematica-preuniversitaria/trigonometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 516 | Identidades trigonométricas de ángulos compuestos (`identidades-trigonometricas-de-angulos-compuestos-5sec-unidad6`) | matematica-preuniversitaria/trigonometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 517 | Medidas de dispersión (`medidas-de-dispersion-5sec-unidad6`) | matematica-preuniversitaria/estadistica-y-probabilidad | Programada | 0 | 0 | Programada; contenido pendiente |
| 518 | Planos y mapas a escala (`planos-y-mapas-a-escala-5sec-unidad6`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 519 | Porcentajes (`porcentajes-5sec-unidad6`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 520 | Regla de tres (`regla-de-tres-5sec-unidad6`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 521 | Regla de tres simple y compuesta (`regla-de-tres-simple-y-compuesta-5sec-unidad6`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 522 | Reparto proporcional (`reparto-proporcional-5sec-unidad6`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 523 | Sucesiones (`sucesiones-5sec-unidad6`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 524 | Sucesiones numéricas (`sucesiones-numericas-5sec-unidad6`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 525 | Transformaciones geométricas (`transformaciones-geometricas-5sec-unidad6`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 526 | Verdades y mentiras (`verdades-y-mentiras-5sec-unidad6`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 527 | Análisis combinatorio (`analisis-combinatorio-5sec-unidad7`) | matematica-preuniversitaria/estadistica-y-probabilidad | Programada | 0 | 0 | Programada; contenido pendiente |
| 528 | Balanzas y pesadas (`balanzas-y-pesadas-5sec-unidad7`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 529 | Geometría del espacio (`geometria-del-espacio-5sec-unidad7`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 530 | Límite de una función (`limite-de-una-funcion-5sec-unidad7`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 531 | Mezcla y aleación (`mezcla-y-aleacion-5sec-unidad7`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 532 | Pesadas y balanza (`pesadas-y-balanza-5sec-unidad7`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 533 | Promedios (`promedios-5sec-unidad7`) | matematica-preuniversitaria/estadistica-y-probabilidad | Programada | 0 | 0 | Programada; contenido pendiente |
| 534 | Resolución de triángulos oblicuángulos (`resolucion-de-triangulos-oblicuangulos-5sec-unidad7`) | matematica-preuniversitaria/trigonometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 535 | Series (`series-5sec-unidad7`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 536 | Series numéricas (`series-numericas-5sec-unidad7`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 537 | Sólidos de revolución (`solidos-de-revolucion-5sec-unidad7`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 538 | Sucesiones y progresiones (`sucesiones-y-progresiones-5sec-unidad7`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 539 | Transformaciones trigonométricas (`transformaciones-trigonometricas-5sec-unidad7`) | matematica-preuniversitaria/trigonometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 540 | Área de regiones sombreadas (`area-de-regiones-sombreadas-5sec-unidad8`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 541 | Ecuación de la circunferencia (`ecuacion-de-la-circunferencia-5sec-unidad8`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 542 | Ecuación de la parábola (`ecuacion-de-la-parabola-5sec-unidad8`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 543 | Ecuación de la recta (`ecuacion-de-la-recta-5sec-unidad8`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 544 | Ecuaciones trigonométricas (`ecuaciones-trigonometricas-5sec-unidad8`) | matematica-preuniversitaria/trigonometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 545 | Estudio de la recta (`estudio-de-la-recta-5sec-unidad8`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 546 | Funciones trigonométricas (`funciones-trigonometricas-5sec-unidad8`) | matematica-preuniversitaria/trigonometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 547 | Funciones trigonométricas inversas (`funciones-trigonometricas-inversas-5sec-unidad8`) | matematica-preuniversitaria/trigonometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 548 | Interés simple y compuesto (`interes-simple-y-compuesto-5sec-unidad8`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 549 | Introducción a la geometría analítica (`introduccion-a-la-geometria-analitica-5sec-unidad8`) | matematica-preuniversitaria/geometria | Programada | 0 | 0 | Programada; contenido pendiente |
| 550 | Introducción a la programación lineal (`introduccion-a-la-programacion-lineal-5sec-unidad8`) | matematica-preuniversitaria/algebra | Programada | 0 | 0 | Programada; contenido pendiente |
| 551 | Probabilidades (`probabilidades-5sec-unidad8`) | matematica-preuniversitaria/estadistica-y-probabilidad | Programada | 0 | 0 | Programada; contenido pendiente |
| 552 | Psicotónico 8 miscelánea (`psicotonico-8-miscelanea-5sec-unidad8`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 553 | Regla de descuento (`regla-de-descuento-5sec-unidad8`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 554 | Regla de interés (`regla-de-interes-5sec-unidad8`) | matematica-preuniversitaria/aritmetica | Programada | 0 | 0 | Programada; contenido pendiente |
| 555 | Suficiencia de datos (`suficiencia-de-datos-5sec-unidad8`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 556 | Trazo de figuras (`trazo-de-figuras-5sec-unidad8`) | matematica-preuniversitaria/razonamiento-matematico | Programada | 0 | 0 | Programada; contenido pendiente |
| 557 | Definición Formal de Límite (Épsilon-Delta) (`definicion-formal-de-limite-epsilon-delta`) | matematica-universitaria/calculo-1 | Publicada | 2 | 4 | Sin alertas estructurales |
| 558 | Límites Laterales, Infinitos y Asíntotas Completas (`limites-laterales-infinitos-y-asintotas`) | matematica-universitaria/calculo-1 | Publicada | 2 | 4 | Sin alertas estructurales |
| 559 | Límites Trigonométricos y Exponenciales Notables (`limites-trigonometricos-notables-y-asintotas`) | matematica-universitaria/calculo-1 | Publicada | 2 | 4 | Sin alertas estructurales |
| 560 | Continuidad de Funciones y Teorema de Bolzano-Weierstrass (`continuidad-y-teorema-de-bolzano`) | matematica-universitaria/calculo-1 | Publicada | 2 | 4 | Sin alertas estructurales |
| 561 | La Derivada como Límite y Regla de la Cadena (`definicion-de-la-derivada-y-regla-de-la-cadena`) | matematica-universitaria/calculo-1 | Publicada | 2 | 4 | Sin alertas estructurales |
| 562 | Derivación Implícita, Logarítmica y de Orden Superior (`derivacion-implicita-y-orden-superior`) | matematica-universitaria/calculo-1 | Publicada | 2 | 4 | Sin alertas estructurales |
| 563 | Diferenciales, Aproximación Lineal y Polinomio de Taylor Local (`diferenciales-y-aproximacion-lineal`) | matematica-universitaria/calculo-1 | Publicada | 2 | 4 | Sin alertas estructurales |
| 564 | Razones de Cambio Relacionadas en Física e Ingeniería (`razones-de-cambio-relacionadas`) | matematica-universitaria/calculo-1 | Publicada | 2 | 4 | Sin alertas estructurales |
| 565 | Teoremas de Rolle, Valor Medio de Lagrange y Cauchy (`teoremas-de-rolle-lagrange-y-lhopital`) | matematica-universitaria/calculo-1 | Publicada | 2 | 4 | Sin alertas estructurales |
| 566 | Regla de L'Hôpital y Formas Indeterminadas Avanzadas (`regla-de-lhopital-formas-indeterminadas`) | matematica-universitaria/calculo-1 | Publicada | 2 | 4 | Sin alertas estructurales |
| 567 | Monotonía, Concavidad, Puntos de Inflexión y Trazado de Curvas (`trazado-de-curvas-y-concavidad`) | matematica-universitaria/calculo-1 | Publicada | 2 | 4 | Sin alertas estructurales |
| 568 | Optimización Aplicada con Restricciones en una Variable (`optimizacion-y-trazado-de-curvas`) | matematica-universitaria/calculo-1 | Publicada | 2 | 4 | Sin alertas estructurales |
| 569 | Sumas de Riemann, Integral de Darboux y Propiedades de la Integral Definida (`sumas-de-riemann-e-integral-definida`) | matematica-universitaria/calculo-2 | Publicada | 2 | 4 | Sin alertas estructurales |
| 570 | Primer y Segundo Teorema Fundamental del Cálculo (`teorema-fundamental-del-calculo-y-sumas-de-riemann`) | matematica-universitaria/calculo-2 | Publicada | 2 | 4 | Sin alertas estructurales |
| 571 | Integración por Sustitución Algebraica e Integración por Partes (`metodos-de-integracion-por-partes-y-fracciones-parciales`) | matematica-universitaria/calculo-2 | Publicada | 2 | 4 | Sin alertas estructurales |
| 572 | Integrales Trigonométricas y Sustitución Trigonométrica (`integrales-trigonometricas-y-sustitucion`) | matematica-universitaria/calculo-2 | Publicada | 2 | 4 | Sin alertas estructurales |
| 573 | Integración de Funciones Racionales por Fracciones Parciales y Ostrogradski (`integracion-por-fracciones-parciales`) | matematica-universitaria/calculo-2 | Publicada | 2 | 4 | Sin alertas estructurales |
| 574 | Área entre Curvas en Coordenadas Cartesianas, Paramétricas y Polares (`area-entre-curvas-cartesianas-y-polares`) | matematica-universitaria/calculo-2 | Publicada | 2 | 4 | Sin alertas estructurales |
| 575 | Volúmenes de Sólidos de Revolución: Discos, Arandelas y Cascarones Cilíndricos (`volumenes-de-solidos-de-revolucion`) | matematica-universitaria/calculo-2 | Publicada | 2 | 4 | Sin alertas estructurales |
| 576 | Longitud de Arco, Superficies de Revolución y Teoremas de Pappus-Guldin (`longitud-de-arco-y-centroide-pappus`) | matematica-universitaria/calculo-2 | Publicada | 2 | 4 | Sin alertas estructurales |
| 577 | Integrales Impropias de Primera y Segunda Especie y Funciones Gamma/Beta (`integrales-impropias-gamma-y-beta`) | matematica-universitaria/calculo-2 | Publicada | 2 | 4 | Sin alertas estructurales |
| 578 | Series Numéricas Infinitas, Series de Potencias y Series de Taylor/Maclaurin (`integrales-impropias-y-series-infinitas`) | matematica-universitaria/calculo-2 | Publicada | 2 | 4 | Sin alertas estructurales |
| 579 | Geometría en R^3, Planos, Rectas y Superficies Cuádricas (`superficies-cuadricas-y-geometria-r3`) | matematica-universitaria/calculo-3 | Publicada | 2 | 4 | Sin alertas estructurales |
| 580 | Funciones Vectoriales, Curvatura, Torsión y Triedro Móvil de Frenet-Serret (`funciones-vectoriales-y-triedro-de-frenet`) | matematica-universitaria/calculo-3 | Publicada | 2 | 4 | Sin alertas estructurales |
| 581 | Límites, Continuidad y Derivadas Parciales de Funciones de Varias Variables (`limites-y-derivadas-parciales-multivariable`) | matematica-universitaria/calculo-3 | Publicada | 2 | 4 | Sin alertas estructurales |
| 582 | Diferenciabilidad, Vector Gradiente, Derivada Direccional y Plano Tangente (`derivadas-parciales-gradiente-y-plano-tangente`) | matematica-universitaria/calculo-3 | Publicada | 2 | 4 | Sin alertas estructurales |
| 583 | Matriz Hessiana, Extremos Libres y Multiplicadores de Lagrange (`optimizacion-multivariable-y-multiplicadores-de-lagrange`) | matematica-universitaria/calculo-3 | Publicada | 2 | 4 | Sin alertas estructurales |
| 584 | Integrales Dobles, Teorema de Fubini y Cambio a Coordenadas Polares (`integrales-dobles-fubini-y-polares`) | matematica-universitaria/calculo-3 | Publicada | 2 | 4 | Sin alertas estructurales |
| 585 | Integrales Triples en Coordenadas Cilíndricas, Esféricas y Matriz Jacobiana (`integrales-multiples-y-jacobiano`) | matematica-universitaria/calculo-3 | Publicada | 2 | 4 | Sin alertas estructurales |
| 586 | Campos Vectoriales, Integrales de Línea y Teoremas de Green, Stokes y Gauss (`teoremas-de-green-stokes-y-gauss`) | matematica-universitaria/calculo-3 | Publicada | 2 | 4 | Sin alertas estructurales |
| 587 | Sistemas Lineales, Eliminación Gauss-Jordan y Rango Matricial (`eliminacion-gauss-jordan-y-rango`) | matematica-universitaria/algebra-lineal | Publicada | 2 | 4 | Sin alertas estructurales |
| 588 | Espacios y Subespacios Vectoriales, Combinación e Independencia Lineal (`espacios-vectoriales-bases-y-dimension`) | matematica-universitaria/algebra-lineal | Publicada | 2 | 4 | Sin alertas estructurales |
| 589 | Cambio de Base, Matriz de Transición y Coordenadas de un Vector (`cambio-de-base-y-matriz-de-transicion`) | matematica-universitaria/algebra-lineal | Publicada | 2 | 4 | Sin alertas estructurales |
| 590 | Transformaciones Lineales, Núcleo (Kernel), Imagen y Teorema de la Dimensión (`transformaciones-lineales-nucleo-e-imagen`) | matematica-universitaria/algebra-lineal | Publicada | 2 | 4 | Sin alertas estructurales |
| 591 | Producto Interno, Ortogonalidad, Proyecciones y Proceso de Gram-Schmidt (`producto-interno-y-gram-schmidt`) | matematica-universitaria/algebra-lineal | Publicada | 2 | 4 | Sin alertas estructurales |
| 592 | Valores Propios (Autovalores), Vectores Propios y Polinomio Característico (`autovalores-autovectores-y-diagonalizacion`) | matematica-universitaria/algebra-lineal | Publicada | 2 | 4 | Sin alertas estructurales |
| 593 | Diagonalización de Matrices, Teorema de Cayley-Hamilton y Potencias de Matrices (`diagonalizacion-y-cayley-hamilton`) | matematica-universitaria/algebra-lineal | Publicada | 2 | 4 | Sin alertas estructurales |
| 594 | Matrices Simétricas, Diagonalización Ortogonal, Formas Cuadráticas y SVD (`diagonalizacion-ortogonal-y-svd`) | matematica-universitaria/algebra-lineal | Publicada | 2 | 4 | Sin alertas estructurales |
| 595 | EDOs de Primer Orden: Variables Separables y Ecuaciones Homogéneas (`edo-variables-separables-y-homogeneas`) | matematica-universitaria/ecuaciones-diferenciales | Publicada | 2 | 4 | Sin alertas estructurales |
| 596 | EDOs Exactas, Factores Integrantes y Ecuaciones Lineales de Primer Orden (`edo-primer-orden-lineales-y-exactas`) | matematica-universitaria/ecuaciones-diferenciales | Publicada | 2 | 4 | Sin alertas estructurales |
| 597 | Ecuaciones de Bernoulli, Riccati y Clairaut y Aplicaciones Geométricas/Físicas (`ecuaciones-de-bernoulli-riccati-y-aplicaciones`) | matematica-universitaria/ecuaciones-diferenciales | Publicada | 2 | 4 | Sin alertas estructurales |
| 598 | EDOs Lineales de Orden Superior, Wronskiano y Reducción de Orden (`edo-orden-superior-wronskiano-y-reduccion`) | matematica-universitaria/ecuaciones-diferenciales | Publicada | 2 | 4 | Sin alertas estructurales |
| 599 | Coeficientes Indeterminados, Operador Anulador y Variación de Parámetros (`coeficientes-indeterminados-y-variacion-de-parametros`) | matematica-universitaria/ecuaciones-diferenciales | Publicada | 2 | 4 | Sin alertas estructurales |
| 600 | Modelado de Vibraciones Mecánicas y Circuitos Eléctricos RLC (Resonancia) (`vibraciones-mecanicas-y-circuitos-rlc`) | matematica-universitaria/ecuaciones-diferenciales | Publicada | 2 | 4 | Sin alertas estructurales |
| 601 | Transformada de Laplace, Función Escalón de Heaviside, Delta de Dirac y Convolución (`transformada-de-laplace-y-sistemas`) | matematica-universitaria/ecuaciones-diferenciales | Publicada | 2 | 4 | Sin alertas estructurales |
| 602 | Sistemas de EDOs Lineales, Exponencial Matricial y Estabilidad en el Plano de Fase (`sistemas-de-edo-y-plano-de-fase`) | matematica-universitaria/ecuaciones-diferenciales | Publicada | 2 | 4 | Sin alertas estructurales |
| 603 | Análisis Dimensional, Ecuaciones Dimensionales y Vectores en R^2 y R^3 (`analisis-dimensional-y-vectores`) | ciencias/fisica | Publicada | 2 | 4 | Sin alertas estructurales |
| 604 | Cinemática Unidimensional: MRU, MRUV y Caída Libre Vertical (`cinematica-mru-mruv-y-caida-libre`) | ciencias/fisica | Publicada | 2 | 4 | Sin alertas estructurales |
| 605 | Movimiento Parabólico de Proyectiles y Movimiento Circular (MCU y MCUV) (`cinematica-velocidad-y-aceleracion-instantanea`) | ciencias/fisica | Publicada | 2 | 4 | Sin alertas estructurales |
| 606 | Estática: Primera y Segunda Condición de Equilibrio, Torque y Cupla (`estatica-equilibrio-y-torque`) | ciencias/fisica | Publicada | 2 | 4 | Sin alertas estructurales |
| 607 | Dinámica Lineal y Circular: Leyes de Newton y Fuerza de Rozamiento (`leyes-de-newton-y-diagrama-de-cuerpo-libre`) | ciencias/fisica | Publicada | 2 | 4 | Sin alertas estructurales |
| 608 | Gravitación Universal de Newton, Satélites y Leyes de Kepler (`gravitacion-universal-y-leyes-de-kepler`) | ciencias/fisica | Publicada | 2 | 4 | Sin alertas estructurales |
| 609 | Trabajo Mecánico, Potencia, Eficiencia y Fuerzas Conservativas (`trabajo-mecanico-y-potencia`) | ciencias/fisica | Publicada | 2 | 4 | Sin alertas estructurales |
| 610 | Energía Mecánica: Cinética, Potencial Gravitatoria, Elástica y Conservación (`trabajo-energia-mecanica-y-conservacion`) | ciencias/fisica | Publicada | 2 | 4 | Sin alertas estructurales |
| 611 | Cantidad de Movimiento Lineal, Impulso, Choques Elásticos e Inelásticos (`cantidad-de-movimiento-impulso-y-choques`) | ciencias/fisica | Publicada | 2 | 4 | Sin alertas estructurales |
| 612 | Movimiento Armónico Simple (MAS), Péndulo Simple y Ondas Mecánicas (`movimiento-armonico-simple-y-frecuencia`) | ciencias/fisica | Publicada | 2 | 4 | Sin alertas estructurales |
| 613 | Hidrostática: Presión, Principio de Pascal, Vasos Comunicantes y Empuje de Arquímedes (`hidrostatica-pascal-y-arquimedes`) | ciencias/fisica | Publicada | 2 | 4 | Sin alertas estructurales |
| 614 | Calorimetría, Dilatación Térmica, Gases Ideales y Leyes de la Termodinámica (`calorimetria-y-termodinamica`) | ciencias/fisica | Publicada | 2 | 4 | Sin alertas estructurales |
| 615 | Electrostática: Ley de Coulomb, Campo Eléctrico, Potencial y Condensadores (`electrostatica-campo-electrico-y-circuitos`) | ciencias/fisica | Publicada | 2 | 4 | Sin alertas estructurales |
| 616 | Electrodinámica (Ohm-Kirchhoff) y Electromagnetismo (Lorentz y Faraday-Lenz) (`electrodinamica-y-electromagnetismo`) | ciencias/fisica | Publicada | 2 | 4 | Sin alertas estructurales |
| 617 | Materia, Energía, Clasificación de Sustancias y Ecuación de Einstein (`materia-energia-y-cambios-de-estado`) | ciencias/quimica | Publicada | 2 | 4 | Sin alertas estructurales |
| 618 | Estructura Atómica, Núclidos (Isótopos, Isóbaros, Isótonos) e Iones (`estructura-atomica-nuclidos-e-iones`) | ciencias/quimica | Publicada | 2 | 4 | Sin alertas estructurales |
| 619 | Números Cuánticos, Principio de Aufbau, Regla de Hund y Paramagnetismo (`estructura-atomica-numeros-cuanticos-y-configuracion`) | ciencias/quimica | Publicada | 2 | 4 | Sin alertas estructurales |
| 620 | Tabla Periódica Moderna: Ubicación de Grupo/Periodo y Propiedades Periódicas (`tabla-periodica-y-enlace-quimico`) | ciencias/quimica | Publicada | 2 | 4 | Sin alertas estructurales |
| 621 | Enlace Químico (Iónico, Covalente, Metálico), Hibridación y Geometría RPECV (`enlace-quimico-hibridacion-y-geometria`) | ciencias/quimica | Publicada | 2 | 4 | Sin alertas estructurales |
| 622 | Nomenclatura Química Inorgánica: Estados de Oxidación, Óxidos, Ácidos y Sales (`nomenclatura-quimica-inorganica`) | ciencias/quimica | Publicada | 2 | 4 | Sin alertas estructurales |
| 623 | Unidades Químicas de Masa (Mol, Número de Avogadro), Composición Centesimal y Fórmulas (`unidades-quimicas-de-masa-y-formula-empirica`) | ciencias/quimica | Publicada | 2 | 4 | Sin alertas estructurales |
| 624 | Estado Gaseoso: Ecuación Universal (PV=nRT), Procesos Restringidos y Mezcla de Gases (`estado-gaseoso-y-mezcla-de-gases`) | ciencias/quimica | Publicada | 2 | 4 | Sin alertas estructurales |
| 625 | Reacciones Químicas y Balance por Tanteo, Método Redox e Ión-Electrón (`reacciones-quimicas-y-balance-redox`) | ciencias/quimica | Publicada | 2 | 4 | Sin alertas estructurales |
| 626 | Estequiometría: Leyes Ponderales, Volumétricas, Reactivo Limitante, Pureza y Rendimiento (`estequiometria-reactivo-limitante-y-rendimiento`) | ciencias/quimica | Publicada | 2 | 4 | Sin alertas estructurales |
| 627 | Soluciones Químicas: Unidades de Concentración (Molaridad, Normalidad), Dilución y Neutralización (`soluciones-quimicas-molaridad-y-normalidad`) | ciencias/quimica | Publicada | 2 | 4 | Sin alertas estructurales |
| 628 | Cinética Química, Equilibrio Químico (Kc, Kp), Le Chatelier, pH y Electroquímica (`soluciones-equilibrio-quimico-y-ph`) | ciencias/quimica | Publicada | 2 | 4 | Sin alertas estructurales |

## Interpretación

Una lección programada sin contenidos es un **registro pendiente**, no un fallo visual ni una lección lista.
El diagnóstico por pantalla (contraste real, fórmulas, imágenes, navegación) exige ejecutar el auditor Chromium; se guardan capturas y métricas por ruta.