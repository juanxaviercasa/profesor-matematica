# Zénit Aura — Criterios de diseño para la portada

**Marca pública:** Sistema Zénit · **Lema:** Logra tus metas  
**Identidad visual:** Zénit Aura  
**Código:** `app/page.tsx`, `app/zenit-aura-home.css`, `app/zenit-aura-refinement.css`, `components/quadratic-hero-lab.tsx`  
**Prototipo conectado:** MagicPath → «Sistema Zénit — Aura · Rediseño Web» (página «Inicio Zénit Aura — Prototipo premium»).

## Dirección editorial

Una academia tecnológica y humana: profundidad, curiosidad y claridad. No es una web de marketing llena de bloques repetidos. Cada sección debe aportar un beneficio concreto y una composición distinta. El efecto *wow* procede de la proporción, la fotografía auténtica, los interactivos funcionales y la coherencia del sistema, no de saturar la pantalla.

**Paleta:** índigo `#241B4B`, violeta `#6840C5`, lavanda `#EEE8FD`, papel `#FCFBFF`, dorado `#E8BC71`. El fénix conserva sus colores cálidos originales; esos colores no deben colonizar la interfaz.

## Composición de arriba hacia abajo

| Sección | Papel | Regla visual |
| --- | --- | --- |
| Hero | Propuesta de valor + un único laboratorio de parábolas | No duplicar imágenes de la parábola; el graficador debe seguir siendo matemáticamente exacto y accesible |
| Visión | Explicar la filosofía de comprensión | Fotografía y mensaje editorial, espacio equilibrado |
| Materias | Navegación al aprendizaje | **Cinco cursos matemáticos independientes:** Álgebra, Aritmética, Geometría, Trigonometría y Razonamiento Matemático; **dos ciencias:** Física y Química |
| Zénit Lab | Interactividad y tecnología | Imagen auténtica sin controles falsos dibujados; botón real a Herramientas |
| Dimensión humana | Claridad mental y confianza | Dos tarjetas fotográficas, sin testimonios inventados ni promesas no comprobadas |
| Rutas | Secundaria, Preuniversitario, Universidad | Tres enlaces a destinos existentes y diferenciados |
| Fundador | Credibilidad | Foto real de Juan Xavier, nombre visible, sin sustituir su identidad por un rostro generado |
| Cierre | Acción | «Logra tus metas» y un enlace directo a los contenidos |
| Pie de página | Confianza y continuidad | Tipografía legible, enlaces útiles y suficiente separación del CTA |

## Implementación y seguridad de cambios

- Editar la rama `main` y preservar las lecciones del catálogo y las simulaciones existentes.
- No introducir textos de auditoría, incidencias internas o estados de desarrollo visibles al visitante.
- Las imágenes educativas no deben cortar elementos relevantes; usar ratios de foto adecuados y `object-fit: contain` en ilustraciones matemáticas.
- Mantener clases específicas de home, sin cascadas que modifiquen el resto del catálogo.
- Los enlaces deben existir y las afirmaciones públicas deben ser verificables.

## Comprobación imprescindible

- Contraste WCAG AA, foco visible, navegación por teclado.
- Pantallas de 320, 375, 390, 768, 1024, 1440 y 1920 px.
- Sin scroll horizontal global ni fórmulas que rebasen su contenedor.
- Antes de capturar una página larga, cargar las fotografías de forma diferida y comprobar `naturalWidth`.
- Validar `npm run check:public`, `npm run check:branding`, `npm run check:aura` y la auditoría de navegador.
- Mantener separados los hallazgos visuales de home de los errores pedagógicos de lecciones individuales.

**Principio:** primero inspeccionar lo que realmente se ve; después refinar proporción, lectura, interacción y continuidad visual. No perseguir más decoración a costa de legibilidad.
