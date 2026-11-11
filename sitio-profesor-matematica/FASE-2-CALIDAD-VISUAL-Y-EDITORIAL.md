# Sistema Zénit — Fase 2: calidad visual, laboratorios y contenido educativo

**Fecha:** 10 de noviembre de 2026  
**Rama:** `main`  
**Sitio:** https://sistemazenit.com

## Punto de partida verificado
La ejecución [42911293485](https://github.com/juanxaviercasa/profesor-matematica/actions/runs/42911293485) finalizó con éxito y registró:
- 628 fichas; 105 publicadas, 523 programadas.
- 1361 vistas en Chromium y 0 errores/advertencias detectados por las comprobaciones programadas.
- 15 lecciones publicadas sin diapositivas de teoría fuente.
- 10 lecciones publicadas sin ejercicios fuente.
- 23 incidencias de clave de alternativa sin la opción correspondiente.

Esto no equivale a certificar el contenido pedagógico de las 628 páginas: algunas programadas no tienen contenido y la revisión visual automatizada no comprueba todas las proposiciones matemáticas.

## Cambios de esta fase
1. **Teoría complementaria:** las 15 lecciones sin diapositivas fuente ahora tienen guías específicas de estudio (se agregaron seis guías a las nueve existentes). No se confunden con transcripciones del material original.
2. **Práctica original:** las diez lecciones sin ejercicios fuente reciben un ejercicio breve, con pasos de solución verificables y respuesta. El panel se presenta como «Ejercicio original de refuerzo», no como ejercicio extraído del libro.
3. **Verificación editorial:** `npm run check:editorial` exige una guía para cada lección publicada sin teoría y un ejercicio original para cada lección publicada sin banco. Mantiene intactas las claves fuente.
4. **Auditoría transparente:** el censo distingue material original ausente de guía/refuerzo existente; no cambia las métricas de extracción para aparentar más contenido fuente.
5. **Laboratorios uno a uno:** `qa-catalog-browser.mjs` examina el laboratorio de cada lección publicada en móvil, prueba teclado sobre su primer deslizador cuando existe y guarda captura específica del simulador, además de la captura de portada. Verifica que los paneles de teoría y refuerzo se representen y que las resoluciones puedan abrirse.
6. **Móvil y estudio:** el acceso flotante de contacto deja de cubrir controles en las pantallas de lecciones pequeñas. Los accesos a contacto desde navegación/pie siguen disponibles.
7. **Puertas de calidad:** los flujos `zenit-web-qa.yml`, `zenit-pedagogy-qa.yml` y `zenit-catalog-full-audit.yml` incorporan el control editorial. Los errores de un laboratorio publicado pasan a bloquear la auditoría integral.

## Pendientes reales
- **23 claves con opciones incompletas:** exigen contraste con fichas fuente. No se puede reconstruir con seguridad A-E a partir de letras o respuestas ausentes; no se asignan calificaciones sin una opción válida.
- **Material original de 15 + 10 lecciones:** las guías y ejercicios son contenido alternativo, no restauración del material fuente.
- **523 páginas programadas:** siguen excluidas de la publicación y necesitan curaduría editorial antes de considerarse completas.
- **Revisión humana visual y matemática:** revisar capturas por lección, explicaciones, fórmulas atómicas largas, pertinencia del simulador, y exactitud de los nuevos ejercicios antes de certificar el sitio.
- **Responsive**: los controles móviles se verifican en las rutas representativas; ampliar muestreo de tablets en toda la biblioteca según prioridades.
- **Despliegue:** la aprobación de un build de Cloudflare no implica publicación en producción. Confirmar la versión de `sistemazenit.com` por separado.

## Comandos de aceptación
```bash
cd sitio-profesor-matematica
npm ci
npm run check:editorial
npm run check:learning
npm run check:math
npm run check:design
npm run check:premium
npm run build
```

Evidencias adicionales: [auditoría del catálogo](https://github.com/juanxaviercasa/profesor-matematica/actions/workflows/zenit-catalog-full-audit.yml), [auditoría interactiva](https://github.com/juanxaviercasa/profesor-matematica/actions/workflows/zenit-pedagogy-qa.yml) y [QA visual](https://github.com/juanxaviercasa/profesor-matematica/actions/workflows/zenit-web-qa.yml).

## Protección de material programado (hallazgo adicional)
En la ejecución previa del catálogo, las 523 rutas programadas devolvían HTTP 200 por acceso directo pese a no figurar en los índices. Se ajustó la ruta de lección para responder 404 antes de renderizar el material programado, además de filtrar rutas relacionadas, anterior/siguiente y progresiones verticales. La auditoría de navegador exige ahora 404 para toda ruta programada. Los registros siguen guardados y podrán publicarse cambiando su estado real.

La guía original y la práctica complementaria se muestran también cuando el material fuente incluye soluciones trabajadas pero no ejercicios F0/FA; no se sustituyen ni ocultan esas soluciones.

## Fase 2B — pertinencia matemática de los simuladores
La inspección de capturas de Chromium detectó que algunos laboratorios generales eran funcionales y accesibles, pero no estaban pedagógicamente alineados con la lección (por ejemplo: congruencia de triángulos usaba el laboratorio general de polígonos y criptoaritmética uno de relojes).

Se incorpora `components/focused-lesson-labs.tsx` para **15 lecciones publicadas**, en ocho familias: segmentos, congruencia, paralelas y secantes, criptoaritmética, cuadrados mágicos, secuencias, expresiones algebraicas y tablas de frecuencias.
- Los ejemplos cambian realmente con los controles, incluyen indicadores numéricos y explicaciones de las propiedades conservadas.
- Para las demás lecciones, el motor general existente se conserva. Sin reemplazo masivo ni dependencias nuevas.
- `npm run check:focused` comprueba las 15 rutas, el parser TSX, la accesibilidad estructural y relaciones matemáticas (suma de segmentos, LLL, ángulos suplementarios, valor posicional, suma mágica, progresiones, términos semejantes y frecuencias).
- El navegador completo comprueba controles, hace captura de cada simulador publicado y analiza accesibilidad mediante axe-core.

La correspondencia de contenido se comprueba en los temas incorporados, pero una auditoría automatizada no sustituye la revisión pedagógica y visual humana de las 105 lecciones publicadas.

## Fase 2C — coherencia entre simulador y generador
- Los 15 laboratorios temáticos usan ahora también un generador de ejercicios del mismo tema: segmentos, congruencia, secantes, criptoaritmética, cuadrados mágicos, secuencias, expresiones algebraicas y frecuencias. Antes el generador dependía solo del motor de la asignatura, de modo que podía proponer ejercicios de polígonos o puntos en una recta para temas diferentes.
- Los **4000 problemas de prueba** (8 familias × 500 semillas) comprueban respuestas, cinco alternativas distintas, consistencia de cálculos y pasos. Ejecutar `npm run check:focused-problems`.
- La cola `npm run report:answer-keys` registra en artefactos de GitHub Actions los ejercicios con clave A–E sin alternativa correspondiente, su banco F0/FA, posición y referencia a archivos fuente. Estas claves no se inventan ni se dan por verificadas.
- Queda trabajo pedagógico con los generadores compartidos de Cálculo, Álgebra Lineal, Física y EDO, que cubren temas distintos con una sola plantilla. Estas plantillas deben revisarse y especializarse antes de presentarlas como enseñanza completa de cada tema.

## Fase 2D — Álgebra Lineal y Física
Se identificó una incompatibilidad pedagógica: las 8 lecciones de Álgebra Lineal reutilizaban problemas genéricos de inecuaciones cuadráticas y las 14 de Física reutilizaban lanzamientos verticales. Se incorporan **22 generadores de problemas adecuados a la unidad** sin alterar los ejercicios originales extraídos. Incluyen sistemas lineales, bases, transformaciones, proyecciones, autovalores, Cayley-Hamilton, SVD, vectores, MRUV, proyectiles, torque, Newton, gravitación, trabajo y potencia, energía, impulso, oscilación, presión, calor, Coulomb y Ohm.

`npm run check:curricular-problems` ensaya 300 semillas por cada una de las 22 unidades: **6600 problemas**, verificando resultados con cálculos independientes, cinco alternativas distintas, pasos desarrollados y correspondencia con la asignatura.

**Límite:** las preguntas específicas son ejercicios de refuerzo calibrados, no demostraciones exhaustivas de todos los subtemas del título. Los simuladores visuales genéricos de estas áreas siguen necesitando especialización por tema, al igual que las 38 lecciones de Cálculo y las 8 de EDO. No presentar esta mejora como certificación completa del contenido académico.

## Fase 2E — verificaciones de navegador de las prácticas temáticas
Se añade `scripts/qa-curricular-browser.mjs`, que abre **37 lecciones publicadas** y comprueba en Chromium móvil: HTTP 200, enunciado contextual, 5 alternativas, bloqueo tras responder, explicación paso a paso, regeneración de datos, ausencia de scroll horizontal y ausencia de errores JavaScript. Genera un registro por ruta y capturas de evidencia. Se ejecuta en `zenit-pedagogy-qa.yml` después de la batería general de simuladores.

## Fase 2F — cola de intervención por lección
Se añade `npm run audit:pedagogy`, que produce en el artefacto `zenit-catalog-inventario` los archivos privados `prioridades-pedagogicas-628.csv`, `prioridades-pedagogicas-628.json` y `prioridades-pedagogicas-628.md`. Distingue 15 laboratorios específicos, 37 prácticas de tema/unidad, adaptaciones contextuales parciales de Química y plantillas generales pendientes de especialización, además de teoría fuente faltante, ejercicios no importados y claves sin opciones.

Los puntajes sirven para ordenar revisiones, NO indican que 628 lecciones hayan sido aprobadas pedagógicamente. Los informes de incidencias y pendientes son exclusivos de GitHub Actions, no se muestran al visitante.
