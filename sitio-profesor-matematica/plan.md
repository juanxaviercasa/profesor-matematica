# Plan de rediseño visual de Sistema Zénit

## Dirección elegida

- **Opción A — Cuaderno de ciencias contemporáneo (elegida):** interfaz clara, editorial y precisa, con modo concentración oscuro solo dentro de laboratorios y ejercicios. Probabilidad de ajuste: 0.72.
- **Opción B — Atlas de exploración:** más diagramática, con navegación por mapas visuales y acentos azules. Probabilidad de ajuste: 0.16.
- **Opción C — Estudio académico premium:** sobria, institucional y de contraste alto, con énfasis en credenciales. Probabilidad de ajuste: 0.12.

### Principios

1. Sistema Zénit es la marca principal; Juan Xavier aparece como fundador y responsable en segundo plano.
2. El lienzo claro es el estado base de la biblioteca y las páginas públicas.
3. El modo oscuro se reserva para concentración: laboratorios, ejercicios y resultados.
4. El color tiene funciones estables: tinta, enlace, acción y progreso.
5. Cada familia de página tiene una composición propia; no se reutiliza un hero oscuro por defecto.

### Filosofía de color

Papel cálido `#FAF8F2`, tinta azul grafito `#182333`, azul Zénit `#2364D2`, azul suave `#DCEBFF`, amarillo solar `#F5C84B`, mandarina editorial `#E8794A`, superficie fría `#EEF2F7` y modo concentración `#172131`.

### Paradigma de layout

Composición editorial asimétrica con una columna de orientación y una columna de contenido. La biblioteca prioriza filtros y descubrimiento; el laboratorio prioriza controles y visualización; la portada prioriza la misión de la plataforma y las rutas de entrada.

### Elementos distintivos

- Marca visual basada en nodos, líneas y conexiones entre representaciones.
- Etiquetas de nivel/materia como chips suaves, no como microtexto agresivo.
- Tarjetas con borde y superficie clara; profundidad mediante una sola sombra muy ligera.

### Interacción y movimiento

Transiciones de 160–200 ms, desplazamiento vertical leve solo en tarjetas interactivas, foco visible azul, `prefers-reduced-motion` respetado y ningún elemento flotante debe cubrir contenido o controles.

### Tipografía

Se conserva la pila nativa para interfaz y Georgia para titulares editoriales, pero se reduce la cursiva y se limita el tamaño extremo. El cuerpo se mantiene entre 16 y 18 px; las etiquetas no bajan de 14 px.

### Esencia de marca

**Sistema Zénit es una biblioteca gratuita de Matemática y Ciencias para estudiantes de secundaria, preuniversitario y primeros ciclos universitarios que necesitan entender, practicar y comprobar ideas; no solo memorizar procedimientos.** Personalidad: clara, curiosa y confiable.

### Voz de marca

- Titulares: concretos, humanos y orientados a comprensión.
- CTA: describen una acción real, no una promesa grandilocuente.
- Ejemplos: “Encuentra tu siguiente tema” y “Prueba una idea en el laboratorio”.

### Wordmark y color propio

Se conserva el símbolo existente de Zénit, pero el lockup pasa a priorizar “SISTEMA ZÉNIT” sobre el nombre personal. El azul Zénit `#2364D2` será el color propio de navegación y descubrimiento.

## Implementación

1. Añadir tokens y overrides en `app/zenit-redesign.css` para controlar la cascada sin tocar la lógica de laboratorios.
2. Actualizar `Brand`, `Header` y `Footer` en `components/site.tsx`.
3. Rediseñar el mensaje y las rutas de la portada.
4. Reestructurar visualmente `/aprende` en una biblioteca clara.
5. Reorientar `/herramientas` a descubrimiento educativo, manteniendo el hub interactivo existente.
6. Aplicar la nueva base a páginas públicas, cursos y superficies educativas mediante selectores compartidos.
7. Ejecutar comprobaciones existentes, lint y build.
8. Revisar capturas de las tres plantillas maestras antes de extender ajustes finos.
