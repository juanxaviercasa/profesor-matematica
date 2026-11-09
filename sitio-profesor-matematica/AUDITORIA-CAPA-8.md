# Sistema Zénit — Informe de la capa 8 (calidad y tipografía científica)

Fecha de revisión: 9 de noviembre de 2026. Rama: main. Dominio público: https://sistemazenit.com.

## Alcance y método
Se revisaron componentes React del portal de aprendizaje, ejercicios F0/FA, soluciones, generador, simuladores, diagnóstico, laboratorios y estilos móviles. Se verificó la documentación oficial de KaTeX y se utilizaron pruebas automáticas de compilación, accesibilidad estática y análisis de las fórmulas presentes en el catálogo. El paquete dispone de KaTeX; no se asumió la existencia de una habilidad especializada de redacción científica que no está instalada.

## Resultados del análisis automático
- 628 de 628 fórmulas principales del catálogo aceptadas sintácticamente por KaTeX. Esto NO garantiza que el contenido sea matemáticamente correcto.
- 88.874 fragmentos textuales analizados en el catálogo completo.
- 14.108 segmentos seleccionados conservadoramente como posibles expresiones matemáticas.
- 69 fragmentos que el detector conservador no logra interpretar con KaTeX (aprox. 0,49 % de los candidatos). El texto original se conserva. No equivalen necesariamente a 69 errores conceptuales; proceden de extracción OCR o sintaxis ambigua.
- En la capa 5 se identificaron 375 ejercicios de 5.920 que carecían de una clave de opción utilizable; permanecen sin calificación automática, en lugar de inventar una.
- La compilación del cliente emitió advertencia por chunks superiores a 500 kB. Esto no es una medida de Core Web Vitals; se requiere analizar el desglose de bundles en una etapa posterior.

## Mejoras integradas
1. MathFormula usa KaTeX con MathML para accesibilidad y sin confiar en HTML no validado.
2. MathText reconoce fórmulas marcadas con delimitadores TeX y patrones de notación Unicode en textos mixtos. El resto del párrafo permanece como prosa legible.
3. Enunciados, opciones, explicaciones, párrafos teóricos, libros y proyectos de aprendizaje usan el mismo sistema matemático.
4. Laboratorios de álgebra, funciones, cálculo y trigonometría renderizan también las fórmulas de preguntas y comentarios.
5. Fórmulas de bloque largas pueden desplazarse horizontalmente y ofrecen una pista de uso en móvil.
6. Si un fragmento no se puede interpretar, se conserva el texto original: no se adivina el exponente, la solución o el significado.
7. Se retiraron de la presentación pública etiquetas internas de procesamiento de fuentes, métricas de ingeniería y algunas menciones a capas técnicas de desarrollo.

## Inspección visual representativa
- 320 px móvil: portada, navegación, encabezado y llamadas a la acción.
- 390 px móvil: fórmulas del simulador y fragmentos teóricos de una lección real.
- 768 px tablet: fórmula de un simulador de trigonometría.
- 1440 px escritorio: cabecera, navegación y resumen de una lección real.
La revisión visual no representa una prueba exhaustiva de todas las URLs, equipos físicos, orientaciones y navegadores.

## Pendientes priorizados
**P1 — Corrección del material de origen.** Clasificar los 69 fragmentos que aún no pasan KaTeX, revisar el archivo original y transformar manualmente o mediante reglas verificadas los casos de OCR; no convertir expresiones ambiguas en soluciones supuestas.

**P1 — Revisión académica de claves.** Investigar los 375 ejercicios no calificables, cotejar con la fuente docente y corregir la información estructurada.

**P2 — Comprobaciones manuales de uso.** Evaluar teclado, lector de pantalla, pantallas pequeñas de 320 px y fórmulas de más de una línea. Las capturas del navegador no sustituyen estas pruebas.

**P2 — Rendimiento de cliente.** Investigar los chunks de más de 500 kB, registrar LCP, CLS e INP y comparar entre dispositivos reales.

**P2 — QA de navegación.** Comprobar rutas del estudiante y enlaces rotos de todas las secciones con una prueba de navegación automatizada.

## Criterios de aceptación para futuras actualizaciones
- No publicar formulaciones reconstruidas sin evidencia del libro de origen.
- Conservar contenido MathML para expresiones válidas.
- Mantener fórmulas de bloque accesibles con teclado y desplazamiento horizontal.
- No asignar puntos a ejercicios sin claves verificables.
- Ejecutar check:design, check:public, check:learning, check:conversion, check:seo y check:math antes de publicar el Worker.

## Referencias
- https://katex.org/docs/api
- https://katex.org/docs/autorender
- https://katex.org/docs/options
- Código, CI y pruebas: https://github.com/juanxaviercasa/profesor-matematica

## Actualización editorial por grado y asignatura
La revisión del 9 de noviembre añadió 47 reglas conservadoras y sustituyó fórmulas genéricas en 268 de 582 lecciones de 1.º a 5.º de secundaria. El detalle de cobertura por asignatura y la cola de OCR se conservan en [AUDITORIA-EDITORIAL-SECUNDARIA.md](./AUDITORIA-EDITORIAL-SECUNDARIA.md).
