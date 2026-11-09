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

## Quinta intervención — aprendizaje y evaluación (fase inicial)
- [x] Banco de ejercicios: calificar solo cuando existe una clave explícita y válida; nunca suponer alternativa A.
- [x] Modo examen: esconder puntaje y pistas antes de calificar; bloquear cambios tras la entrega.
- [x] Resultados: distinguir ejercicios sin clave de errores reales; mensajes honestos sobre referencias.
- [x] Datos estructurados de lecciones: eliminar respuesta A ficticia y corregir identificación del profesor.
- [x] Navegación rápida entre simulación, teoría, práctica, materiales y recomendaciones.
- [x] Diagnóstico: recomendaciones por competencias falladas en lugar de basarse solo en el total.
- [x] Progreso local: tolerar almacenamiento bloqueado o datos corruptos y actualizar el catálogo en la misma pestaña.
- [x] Generador: enunciado preciso de conteo de segmentos, sin confundirlo con triángulos.
- [x] Pruebas automatizadas de evaluación, lecciones y análisis real del catálogo.
- [x] Pruebas de 6000 ejercicios generados en 12 motores, verificando alternativas distintas y resultados matemáticos seleccionados.
- [x] Corrección de distractores que podían duplicarse en el Teorema del Resto.
- [x] Datos estructurados: sin respuestas ficticias cuando una clave no consta, y sin atribuir carácter oficial genérico.
- [x] Progreso de laboratorio limitado al total de retos, incluso con almacenamiento heredado.
- [x] Marcado voluntario de lecciones estudiadas, con resumen en el portal y persistencia únicamente local.
- [x] Introducción legible en las lecciones que tenían texto técnico generado automáticamente.
- [ ] Auditar matemáticamente todos los motores y variantes del generador con casos límite.
- [ ] Verificar con usuarios reales y lectores de pantalla la usabilidad de todas las lecciones.

## Sexta intervención — confianza y conversiones
- [x] Formulario en dos pasos: vista previa del mensaje y apertura voluntaria de WhatsApp.
- [x] Eliminar mensajes que confundían «preparado» con «enviado»; no se envía automáticamente.
- [x] Campos obligatorios reducidos, límites de texto y eventos de analítica sin datos personales.
- [x] Página de privacidad de contacto y referencia desde pie de página y formulario.
- [x] Contacto colocado antes de las explicaciones en la vista móvil.
- [x] Encabezado de contacto más compacto y botón flotante oculto dentro del formulario para evitar superposiciones.
- [x] Datos de contacto centralizados; UTMs coherentes con el origen real, con tolerancia a bloqueo de sessionStorage.
- [x] Página comercial: precios indicados como referenciales, sin falsas plazas limitadas ni prestaciones no confirmadas.
- [x] Metadatos SEO: eliminadas cifras obsoletas, calificativos «oficiales» generalizados y coordenadas no verificadas.
- [x] Prueba de regresión de mensajes, redirecciones, atribución y oferta integrada en CI.
- [ ] Confirmar comercialmente precios, acceso, política de cancelación, calendario y sesiones ofrecidas.
- [ ] Probar el recorrido real de consulta y WhatsApp sin enviar mensajes a terceros.
- [ ] Confirmar eventos GTM si existe contenedor activo.

## Séptima intervención — SEO, rendimiento y estabilidad Cloudflare
- [x] Separar el índice que usa el navegador de las lecciones completas (9,4 MB) cargadas en el servidor.
- [x] Permitir que rastreadores accedan a recursos JS/CSS de Next/Vinext.
- [x] Sitemap con URLs únicas, rutas públicas, 96 lecciones publicadas y sin fechas de modificación inventadas.
- [x] Marcar como no indexables las 532 lecciones programadas y los itinerarios con contenido pendiente.
- [x] Canónicas individuales en páginas públicas y rutas dinámicas; imagen social existente.
- [x] Cache-Control para recursos estáticos: versión larga de assets compilados y 1 día para imágenes no versionadas; HTML SSR sin caché global nueva.
- [x] Pruebas de indexación, sitemap, metadatos y división del catálogo en CI.
- [ ] Medir Core Web Vitals (LCP, INP, CLS) con datos reales y dispositivos móviles.
- [ ] Comprobar el alta y la cobertura de Google Search Console.
- [x] Desactivados los builds automáticos de Pages sin eliminar el proyecto, tras verificar que solamente conservaba `profesor-matematica.pages.dev` y la web pública usa Workers.
- [x] Evitada la doble generación del sitemap y del grafo en cada lote, y evitados commits vacíos cuando finalice la cola de lecciones programadas.

## Octava intervención — tipografía matemática y auditoría general
- [x] Análisis del sistema de render: las fórmulas aisladas usaban KaTeX; enunciados y explicaciones seguían como texto plano.
- [x] Soporte para expresiones TeX dentro de textos y notación Unicode reconocible.
- [x] Aplicación a teoría, libros, ejercicios, alternativas, solucionarios, pistas y generador.
- [x] MathML accesible y fallback visible cuando una expresión no puede interpretarse.
- [x] Fórmulas largas con scroll horizontal, contraste estable y tamaño de lectura para móviles.
- [x] Alineación tipográfica de expresiones insertadas: se eliminó el contenedor de scroll de KaTeX inline, se restauró la línea base del párrafo y se equilibró la escala con Arial, preservando el desplazamiento de ecuaciones de bloque.
- [x] Pruebas automatizadas con fórmulas representativas y auditoría del catálogo.
- [x] Módulo 1: fracción racional, restricción de dominio, área circular y ejemplos de funciones renderizados explícitamente con KaTeX y comprobados en producción.
- [x] Primer pase por asignatura (1.º–5.º): 47 reglas semánticamente conservadoras, aplicadas a 268 de 582 lecciones.
- [x] Detector de fórmulas ajustado para no confundir prosa con álgebra; auditoría estructurada por grado/curso: 14.108 candidatos y 69 fragmentos sintácticamente ambiguos, preservados sin inventar símbolos.
- [x] Informe reproducible de prioridades: AUDITORIA-EDITORIAL-SECUNDARIA.md.
- [ ] Rectificar expresiones ambiguas de los archivos de origen y comprobar su equivalencia algebraica.
- [ ] Capturas comparativas y validación funcional en móviles, tabletas y escritorios representativos.
- [ ] Revisión con lectores de pantalla reales, teclado y alumnos.

## Métricas de aceptación pendientes
Contraste 4.5:1 para texto normal; 3:1 para textos grandes. Sin overflow horizontal. Funcionalidad de rutas y formularios. Validación de build y Worker SSR, con pruebas de regresión.

## Observaciones
La web combina un diseño claro para marketing con páginas educativas oscuras. CSS heredado contiene numerosas reglas específicas; debe refactorizarse sin perjudicar los laboratorios. Unificar contadores de lecciones a partir del catálogo en lugar de textos fijos.
