# Identidad institucional · Sistema Zénit

## Arquitectura

- **Marca institucional:** Sistema Zénit, con su isotipo del fénix y el lema **«Logra tu meta»**, que deben aparecer juntos en cabecera y pie de página.
- **Método:** Sistema Zénit. Identifica la forma de enseñar y permite nombrar cursos, laboratorios y aplicaciones.
- **Marca del docente y fundador:** Juan Xavier. Mantener la autoría en la biografía y los datos estructurados, sin sustituir el lema institucional.
- **Promesa editorial:** conectar fórmula, gráfica, comportamiento y significado para preparar al estudiante para cálculo.

## Personalidad

Clara, exigente, cercana y visual. Evita promesas grandilocuentes, lenguaje infantil y listas de pasos sin explicación. Cada pieza debe partir de una dificultad reconocible y terminar con una idea que el estudiante pueda explicar.

## Identidad visual

### Identidad vigente — Fénix Zénit (noviembre de 2026)

- **Símbolo oficial:** llama exterior rojo/naranja con fénix interior amarillo/dorado; fuente vectorial: `public/brand/zenit-phoenix.svg`, alineada con Química Zenit.
- **Marca al costado del símbolo:** primera línea **«Sistema Zénit»**, segunda línea **«Logra tu meta»**, con ortografía y mayúsculas exactas.
- **Fuego principal:** `#C32B0C`; **fuego oscuro para texto:** `#9A220D`.
- **Oro:** `#F59E0A`; **crema de lectura:** `#FFFAF5`; **noche cálida:** `#2A120E`.
- **Aplicación:** `components/site.tsx` comparte la firma con el encabezado y el pie; `app/zenit-redesign.css` define el acabado cromático; `public/favicon.svg` usa el mismo fénix.
- **Accesibilidad:** contenido académico de alto contraste, controles táctiles legibles y fórmulas sin pérdida de contenido. No convertir semántica matemática (correcto/incorrecto, gráficas) en colores de marca indiscriminadamente.

### Paleta histórica (etapas anteriores)


- **Verde Zénit — `#12372F`:** autoridad, profundidad y base principal.
- **Papel Cálido — `#F6F1E6`:** cercanía y legibilidad.
- **Coral Acción — `#FF5A36`:** llamadas a la acción y puntos de cambio.
- **Lima Solar — `#DDF277`:** descubrimiento, respuesta y progreso.
- **Blanco Cuaderno — `#FFFDF8`:** tarjetas y superficies.

### Tipografía

- **Texto e interfaz:** pila nativa del sistema (system-ui / Segoe UI / Arial), sin dependencia de fuentes externas; base de 16 px y altura de línea 1,65.
- **Titulares:** Georgia con interlineado de 1,12 y jerarquía fluida; las expresiones matemáticas se renderizan con KaTeX.
- **Etiquetas:** mayúsculas moderadas, peso alto y tamaño mínimo práctico de 12–13 px; las métricas y descripciones del portal se muestran preferentemente a 13–16 px.

## Contraste y estados de interfaz (capa 01)

- **Coral de marca `#FF5A36`:** acento y fondo de botones; **no** usar texto blanco normal encima (contraste aproximado 3,1:1).
- **Tinta `#142C27` sobre coral:** aproximadamente **4,77:1**, válida para texto normal.
- **Coral de texto `#A9311B` sobre papel `#F7F3E9`:** aproximadamente **6,03:1**.
- **Modo educativo:** fondo opaco `#0E241E` con texto `#F4F8F5` y secundarios `#D0DAD5`; evitar tarjetas oscuras translúcidas sobre papel claro.
- **Texto:** contraste mínimo 4,5:1 para tamaños normales y 3:1 para texto grande; no depender solo del color para indicar errores.
- **Estados interactivos:** foco visible, hover, activo, deshabilitado y movimiento reducido; comprobar teclado y touch.
- **Código fuente del diseño:** `app/design-system.css`; `app/globals.css` se mantiene para compatibilidad y se irá depurando por capas.

## Uso del logotipo

El símbolo vigente es un fénix dorado rodeado por una llama rojo-anaranjada. Conservar sus proporciones, gradientes y margen de aire; no deformarlo ni recolorearlo. Su firma horizontal siempre dice «Sistema Zénit» y «Logra tu meta».

## Sistema de contenido

1. **Dolor:** “Puedes resolver la ecuación, pero no interpretar la gráfica”.
2. **Conexión:** mostrar dos representaciones de la misma idea.
3. **Prueba:** ejemplo corto, laboratorio o pregunta.
4. **Acción:** ruta gratuita, video completo u orientación.

### Series recomendadas

- Un gráfico, tres preguntas.
- Antes de cálculo.
- El error que cambia la función.
- Predice antes de calcular.
- De TikTok al laboratorio.

## Recursos incluidos

- `public/brand/zenit-phoenix.svg`: isotipo principal vigente.\n- `public/brand/zenit-mark.svg`: símbolo heredado; no usar en el encabezado actual.
- `public/brand/zenit-lockup.svg`: firma horizontal.
- `public/brand/social-avatar.svg`: avatar para redes.
- `public/brand/youtube-banner.svg`: portada de YouTube.
- `public/brand/youtube-thumbnail-template.svg`: plantilla de miniatura.
- `public/brand/vertical-cover-template.svg`: portada para TikTok, Reels y Shorts.

Cada recurso social también cuenta con una versión `.png` en su dimensión final para subirla directamente. Los archivos `.svg` quedan como originales editables.
