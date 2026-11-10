# Sistema Zénit — Informe de la capa 8 (calidad, tipografía científica y 60 Motores Open-Source)

Fecha de revisión: 9 de noviembre de 2026. Rama: main. Dominio público: https://sistemazenit.com.

## Alcance y método
Se revisaron componentes React del portal de aprendizaje, ejercicios F0/FA, soluciones, generador, simuladores, diagnóstico, laboratorios, catálogo de 60 Motores Matemáticos Open-Source (`#01`–`#60`) y estilos móviles. Se verificó la documentación oficial de KaTeX y se utilizaron pruebas automáticas de compilación, accesibilidad estática y análisis de las fórmulas presentes en el catálogo.

## Resultados del análisis automático
- **628 de 628 fórmulas principales** del catálogo (582 de secundaria 1.º–5.º + 46 universitarias) curadas e inyectadas específicamente por asignatura y tema (`100 %` de cobertura curada), aceptadas sintácticamente por KaTeX + MathML.
- **60 de 60 Motores Matemáticos Open-Source (`#01` a `#60`)** integrados en los 12 Macro-Laboratorios (`5 sub-motores por laboratorio`) con sus fórmulas canónicas verificadas en KaTeX.
- **88.874 fragmentos textuales** analizados en el catálogo completo.
- **14.109 segmentos** seleccionados como expresiones matemáticas.
- **0 fragmentos fallidos (`0,00 %` de error sintáctico KaTeX)** tras perfeccionar el delimitador de llaves de exponentes en `lib/math-text-segments.mjs` y la normalización de artefactos OCR en `components/math-formula.tsx`.
- En la capa 5 se identificaron 375 ejercicios de 5.920 que carecían de una clave de opción utilizable; permanecen sin calificación automática, en lugar de inventar una.

## Mejoras integradas
1. MathFormula usa KaTeX con MathML para accesibilidad y sin confiar en HTML no validado.
2. MathText reconoce fórmulas marcadas con delimitadores TeX y patrones de notación Unicode en textos mixtos. El resto del párrafo permanece como prosa legible.
3. Enunciados, opciones, explicaciones, párrafos teóricos, libros y proyectos de aprendizaje usan el mismo sistema matemático.
4. Los 12 Macro-Laboratorios (`ZenitInteractiveApp`) integran ahora el selector interactivo de sus **5 Sub-Motores Open-Source (`#01`–`#60`)** y sus fórmulas canónicas.
5. El directorio público `/herramientas` incluye la matriz interactiva completa de los **60 Motores Matemáticos Open-Source (`#01`–`#60`)**.
6. Cada lección (`/aprende/[area]/[curso]/[slug]`) muestra el motor open-source especializado asignado (`#01`–`#60`), su fórmula eje curada y el formulario desplegable de los 5 motores de su rama.
7. Fórmulas de bloque largas pueden desplazarse horizontalmente y ofrecen una pista de uso en móvil.

## Inspección visual representativa
- 320 px móvil: portada, navegación, encabezado y llamadas a la acción.
- 390 px móvil: fórmulas del simulador y fragmentos teóricos de una lección real.
- 768 px tablet: fórmula de un simulador de trigonometría.
- 1440 px escritorio: cabecera, navegación y resumen de una lección real.

## Criterios de aceptación para futuras actualizaciones
- Conservar el 100 % de cobertura de fórmulas curadas en las 582 lecciones de secundaria y 46 universitarias.
- Conservar contenido MathML para expresiones válidas y `0` fragmentos malformados en `check:math`.
- Mantener fórmulas de bloque accesibles con teclado y desplazamiento horizontal.
- No asignar puntos a ejercicios sin claves verificables.
- Ejecutar `check:design`, `check:public`, `check:learning`, `check:conversion`, `check:seo`, `check:math`, `check:branding` y `check:readability` antes de publicar el Worker.

## Referencias
- https://katex.org/docs/api
- https://katex.org/docs/autorender
- https://katex.org/docs/options
- Código, CI y pruebas: https://github.com/juanxaviercasa/profesor-matematica

## Actualización editorial por grado y asignatura (100 % completada)
La auditoría integral del 9 de noviembre amplió las reglas curadas a 112 patrones estructurales, alcanzando **582 de 582 lecciones curadas (100 %)** en 1.º a 5.º de secundaria (incluyendo Física y Química) más las **46 lecciones universitarias**, y reduciendo los fragmentos OCR no interpretables de 69 a **0**. El detalle completo se conserva en [AUDITORIA-EDITORIAL-SECUNDARIA.md](./AUDITORIA-EDITORIAL-SECUNDARIA.md).
