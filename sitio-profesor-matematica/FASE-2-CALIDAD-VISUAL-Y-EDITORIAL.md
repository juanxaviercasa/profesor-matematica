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
