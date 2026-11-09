# Renovación integral · Sistema Zénit

**Rama de trabajo:** main, sin ramas nuevas.

## Capas
0. Auditoría de rutas, diseño y despliegue.
1. Sistema visual accesible de colores, escalas, fuentes y componentes.
2. Navegación responsive.
3. Accesibilidad, teclado, contraste, tamaño de controles y movimiento reducido.
4. Portada y páginas públicas.
5. Lecciones, laboratorios y herramientas matemáticas.
6. Credibilidad, claridad comercial, formularios y conversiones.
7. SEO, rendimiento y estabilidad Cloudflare.
8. Pruebas regresivas, capturas y documentación.

## Primera intervención
- [x] Menú móvil con enlaces del sitio y acceso al contacto.
- [x] Color coral oscuro para texto sobre fondos claros, conservando el color original como acento.
- [x] Foco visible, respeto al movimiento reducido y encabezado móvil.
- [x] Origen canónico centralizado y correcciones de rutas SEO.
- [ ] Pruebas visuales reales en sistemazenit.com (el acceso web automatizado no estuvo disponible).
- [ ] Evaluar cada página en resoluciones de 320, 375, 390, 768, 1024 y 1440 píxeles.
- [ ] Auditar KaTeX, ejercicios, lectores de pantalla y controles gráficos.

## Segunda intervención — identidad visual y legibilidad

- [x] Paleta de tokens compartidos y un archivo `app/design-system.css` independiente.
- [x] Tipografía del sistema para interfaz y Georgia para titulares, con nuevas métricas de lectura.
- [x] Contraste mejorado en botones coral y franja de garantía.
- [x] Superficies educativas oscuras opacas para blog, áreas, cursos y lecciones.
- [x] Tarjetas del portal sobre fondo oscuro coherente, sin mezcla transparente con papel crema.
- [x] Textos secundarios y etiquetas de navegación educativa más legibles.
- [x] Contadores de lecciones del constructor conectados al catálogo, eliminando literales obsoletos.
- [x] Prueba de contraste automatizada para tokens de uso frecuente.
- [ ] Auditoría visual mediante capturas verificadas de todas las pantallas publicadas.
- [ ] Validación WCAG y contraste de cada elemento heredado y de cada Web App.

## Métricas de aceptación pendientes
Contraste 4.5:1 para texto normal; 3:1 para textos grandes. Sin overflow horizontal. Funcionalidad de rutas y formularios. Validación de build y Worker SSR, con pruebas de regresión.

## Observaciones
La web combina un diseño claro para marketing con páginas educativas oscuras. CSS heredado contiene numerosas reglas específicas; debe refactorizarse sin perjudicar los laboratorios. Unificar contadores de lecciones a partir del catálogo en lugar de textos fijos.
