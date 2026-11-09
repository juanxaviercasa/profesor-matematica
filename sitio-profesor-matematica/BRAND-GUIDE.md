# Sistema de marca · Profesor Juan Xavier

## Arquitectura

- **Marca personal:** Profesor Juan Xavier. Es el nombre principal en YouTube, el sitio, webinars y ofertas.
- **Método:** Sistema Zénit. Identifica la forma de enseñar y permite nombrar cursos, laboratorios y aplicaciones.
- **Lema:** Matemática que conecta.
- **Promesa editorial:** conectar fórmula, gráfica, comportamiento y significado para preparar al estudiante para cálculo.

## Personalidad

Clara, exigente, cercana y visual. Evita promesas grandilocuentes, lenguaje infantil y listas de pasos sin explicación. Cada pieza debe partir de una dificultad reconocible y terminar con una idea que el estudiante pueda explicar.

## Identidad visual

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

El símbolo representa una función que asciende hasta un punto máximo y continúa su recorrido. El punto Lima Solar marca el momento de comprensión. Mantener un margen libre equivalente a una cuarta parte del símbolo. No rotar, estirar ni cambiar colores de forma aislada.

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

- `public/brand/zenit-mark.svg`: símbolo principal.
- `public/brand/zenit-lockup.svg`: firma horizontal.
- `public/brand/social-avatar.svg`: avatar para redes.
- `public/brand/youtube-banner.svg`: portada de YouTube.
- `public/brand/youtube-thumbnail-template.svg`: plantilla de miniatura.
- `public/brand/vertical-cover-template.svg`: portada para TikTok, Reels y Shorts.

Cada recurso social también cuenta con una versión `.png` en su dimensión final para subirla directamente. Los archivos `.svg` quedan como originales editables.
