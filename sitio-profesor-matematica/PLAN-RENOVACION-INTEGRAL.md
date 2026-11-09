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

## Tercera intervención — responsive y accesibilidad de laboratorios

- [x] Capa independiente `app/responsive-accessibility.css` importada tras el sistema de diseño.
- [x] Fórmulas KaTeX de bloque desplazables horizontalmente, también con teclado y foco visible.
- [x] Los 27 campos de los motores interactivos ahora tienen un nombre accesible.
- [x] Los 8 gráficos SVG principales de los motores incluyen una descripción accesible.
- [x] Deslizadores y botones educativos con superficie de interacción mínima de 44 px.
- [x] Buscador y desplegables del blog enlazados a sus etiquetas.
- [x] Modos de filtrado, pestañas y respuestas anuncian su estado de selección o expansión.
- [x] Evitar que una respuesta repetida aumente artificialmente la racha del generador.
- [x] Cuestionarios con rejilla de respuestas adaptable para tabletas.
- [x] Mensajes de resultado dinámico con `role="status"` donde corresponde.
- [x] Nuevas pruebas estáticas de accesibilidad integradas en `npm run check:design`.
- [x] Laboratorios clásicos cubiertos por controles táctiles compartidos y descripciones SVG.
- [x] Deslizadores del laboratorio universal con nombres accesibles.
- [x] Revisión ampliada de regresión en laboratorios antiguos y nuevos.
- [ ] Verificar capturas en 320/375/390/768/1024/1440 px para las principales rutas.
- [ ] Comprobar interacción táctil y teclado real en cada motor, más lector de pantalla.
- [ ] Revisar formularios especiales y laboratorios no incluidos en los doce motores.

## Cuarta intervención — páginas públicas y credibilidad

- [x] Portada: tres rutas de inicio, fotografía real del docente, metodología y siguientes pasos claros.
- [x] Sobre mí: presentación verificable del profesor, formación, trayectoria, método y CTA.
- [x] Contacto: explicación del proceso real del formulario de WhatsApp y opciones.
- [x] Herramientas: encabezado comprensible y guía para explorar los motores, sin copy de despliegue.
- [x] Empieza aquí: llamada a un recurso interno existente en vez de resultados de búsqueda en YouTube.
- [x] Clases en Lima: sustituido aviso interno sobre datos pendientes por consulta de disponibilidad.
- [x] Curso: FAQ accesible y sustitución de la garantía no establecida por una invitación a probar recursos gratuitos.
- [x] Estilos exclusivos de páginas públicas para no introducir regresiones en laboratorios.
- [x] SEO descriptivo para inicio, presentación y contacto.
- [x] Comprobación estática de rutas de las páginas y copys sensibles.
- [ ] Revisar todas las páginas públicas con capturas reales en móvil, tablet y escritorio.
- [ ] Revisar disponibilidad, precio y condiciones del curso con información comercial confirmada.
- [ ] Auditar de extremo a extremo el envío a WhatsApp y todas las conversiones (capa 6).

## Métricas de aceptación pendientes
Contraste 4.5:1 para texto normal; 3:1 para textos grandes. Sin overflow horizontal. Funcionalidad de rutas y formularios. Validación de build y Worker SSR, con pruebas de regresión.

## Observaciones
La web combina un diseño claro para marketing con páginas educativas oscuras. CSS heredado contiene numerosas reglas específicas; debe refactorizarse sin perjudicar los laboratorios. Unificar contadores de lecciones a partir del catálogo en lugar de textos fijos.
