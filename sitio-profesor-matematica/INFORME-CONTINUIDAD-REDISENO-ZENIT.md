# Informe de continuidad — Rediseño visual de Sistema Zénit

**Fecha:** 10 de noviembre de 2026  
**Repositorio:** `https://github.com/juanxaviercasa/profesor-matematica.git`  
**Proyecto:** `sitio-profesor-matematica/`  
**Rama objetivo:** `main`

## 1. Estado actual

El rediseño debe continuar desde la dirección **“Cuaderno de ciencias contemporáneo”**: interfaz clara, editorial y precisa; modo oscuro únicamente dentro de laboratorios, ejercicios y resultados de concentración.

La corrección más reciente está integrada en `origin/main`. El commit creado para esta fase es:

```text
e286357 fix: restore readability across editorial templates
```

El remoto avanzó después con otro commit de pedagogía:

```text
b3449b6 test(pedagogy): aceptar pasos breves con cálculos verificables
```

Antes de editar, sincronizar siempre:

```bash
git fetch origin main
git rebase origin/main
```

No hacer `force push`.

## 2. Qué se corrigió

La primera intervención visual sobre Blog fue insuficiente porque intentó controlar componentes Tailwind oscuros mediante overrides CSS estructurales. La captura resultante mostró:

- hero oscuro con texto descriptivo casi invisible;
- filtros oscuros con texto de bajo contraste;
- tarjetas tipo dashboard técnico;
- repetición de superficies negras y verdes;
- poca separación entre biblioteca, filtros y contenido.

La solución definitiva fue cambiar el explorador del Blog a clases semánticas propias y aplicar estilos directos:

- `components/blog-constructor-explorer.tsx`
  - `blog-filter-panel`
  - `blog-filter-header`
  - `blog-search`
  - `blog-select`
  - `blog-filter-pill`
  - `blog-results-meta`
  - `blog-lesson-card`
  - `blog-lesson-tag`
  - `blog-lesson-title`
  - `blog-lesson-summary`
  - `blog-lesson-footer`
- `app/zenit-redesign.css`
  - superficies claras para filtros y tarjetas;
  - tinta `#182333` para texto;
  - azul Zénit `#2364D2` para estados activos y enlaces;
  - azul suave `#DCEBFF` para chips y etiquetas;
  - bordes `#D8E0EA` y sombra ligera.

El render local comprobado después del arreglo muestra hero claro, panel blanco, filtros legibles y tarjetas blancas con texto oscuro.

## 3. Archivos principales

### Diseño y cascada

- `app/zenit-redesign.css`: última capa de rediseño. Contiene tokens y las familias editoriales.
- `app/public-pages.css`: estructura de páginas públicas.
- `app/zenit-editorial.css`: reglas editoriales heredadas; revisar antes de añadir más overrides.
- `app/design-system.css`: reglas base antiguas, incluyendo superficies oscuras de `.learning-view`.
- `app/reading-comfort.css`: tamaños mínimos de lectura.
- `app/premium-responsive.css`: accesibilidad, tamaños táctiles y reglas transversales.
- `app/layout.tsx`: orden de carga de las hojas CSS. `zenit-redesign.css` se carga al final.

### Plantillas intervenidas

- `app/blog/page.tsx`
- `components/blog-constructor-explorer.tsx`
- `app/cursos/funciones-para-calculo/page.tsx`
- `app/sobre-mi/page.tsx`
- `TODO.md`

### Componentes compartidos

- `components/site.tsx`: `Brand`, `Header`, `Footer`, `PageHero`, `FormulaCard`.
- `components/funnel.tsx`: tracking y enlaces de conversión del curso.
- `lib/catalog-index`: índice de lecciones.

## 4. Requisitos de diseño que no deben romperse

1. Sistema Zénit es la marca principal; Juan Xavier debe aparecer como fundador/director, no como protagonista de cada pantalla.
2. La biblioteca y las páginas públicas parten de un lienzo claro.
3. El modo oscuro se reserva para laboratorios, ejercicios y resultados.
4. Los colores tienen funciones estables:
   - papel: `#FAF8F2`;
   - superficie: `#FFFFFF`;
   - tinta: `#182333`;
   - azul Zénit: `#2364D2`;
   - azul suave: `#DCEBFF`;
   - amarillo solar: `#F5C84B`;
   - mandarina editorial: `#E8794A`;
   - concentración: `#172131`.
5. El cuerpo debe permanecer aproximadamente entre 16 y 18 px.
6. Los metadatos no deben bajar de 14 px.
7. Los controles deben tener al menos 44–48 px de altura.
8. Debe respetarse `prefers-reduced-motion`.
9. Los CTA, filtros y enlaces deben tener contraste claro en menos de un segundo.
10. No utilizar una única plantilla de hero oscuro para todas las páginas.

## 5. Próximos pasos recomendados

### Paso 0 — Sincronización y baseline

- Hacer `fetch` y `rebase` desde `origin/main`.
- Revisar los cambios remotos de pedagogía antes de editar.
- Ejecutar `git status --short` y confirmar árbol limpio.
- No comenzar otra ronda visual sin capturas comparables.

### Paso 1 — Validación visual real de las tres plantillas

Capturar y revisar en al menos estos anchos:

- 390 px móvil;
- 768 px tablet;
- 1440 px escritorio.

Rutas prioritarias:

- `/blog`;
- `/cursos/funciones-para-calculo`;
- `/sobre-mi`.

En cada captura revisar específicamente:

- contraste de títulos, descripciones y metadatos;
- fondos de hero, filtros y tarjetas;
- superposición del header o CTA flotante;
- recorte y carga de `/juan-xavier.jpg`;
- wrapping de títulos largos;
- botones y selectores en móvil;
- consistencia del footer.

No aceptar una captura donde el texto de descripción sea gris oscuro sobre fondo oscuro o donde una tarjeta se parezca a un panel de administración.

### Paso 2 — Completar la familia Biblioteca / Aprendizaje

Pendiente según `TODO.md`:

- `/aprende`: priorizar descubrimiento por nivel y área, con tarjetas claras y menor densidad oscura.
- `/herramientas`: presentar simuladores como experiencias de aprendizaje, manteniendo toda la interactividad.

Antes de editar los componentes, identificar si usan clases Tailwind oscuras directamente. Si las usan, preferir clases semánticas propias, como se hizo en `BlogConstructorExplorer`, en vez de depender de selectores como `[class*="bg-emerald"]`.

### Paso 3 — Revisar Laboratorio y Contacto

- `/laboratorio` debe conservar modo oscuro solo en la zona de simulación.
- El directorio de laboratorios debe verse como fichas de aprendizaje: objetivo, nivel, tiempo y acción.
- `/contacto` debe tener base clara y distinguir “estudiar gratis” de “consultar por clases o cursos”.
- No modificar formularios, tracking, acciones de WhatsApp ni destinos de enlaces.

### Paso 4 — Consolidar la cascada

Después de revisar las capturas:

- eliminar reglas duplicadas que ya no sean necesarias;
- evitar seguir agregando bloques de overrides frágiles al final de `zenit-redesign.css`;
- mover estilos de componentes a clases semánticas cuando existan utilidades Tailwind conflictivas;
- conservar `zenit-redesign.css` como capa de migración, pero reducir gradualmente la herencia de `design-system.css` y `zenit-editorial.css`;
- comprobar que cualquier cambio global no afecte laboratorios, KaTeX, diagnósticos ni lecciones.

### Paso 5 — Validación técnica y entrega

Ejecutar como mínimo:

```bash
npm run lint
npm run check:design
npm run check:public
npm run check:branding
npm run check:readability
npm run check:premium
npm run check:editorial
npm run check:public-copy
npm run build
git diff --check
```

Los warnings de lint existentes no deben confundirse con errores: en la última ejecución hubo 6 warnings preexistentes y 0 errores.

Hacer smoke test de las rutas modificadas:

```bash
npm run dev
curl -I http://127.0.0.1:5173/blog
curl -I http://127.0.0.1:5173/cursos/funciones-para-calculo
curl -I http://127.0.0.1:5173/sobre-mi
```

Después:

```bash
git add <archivos concretos>
git commit -m "<mensaje claro>"
git fetch origin main
git rebase origin/main
git push origin HEAD:main
```

Nunca usar `git push --force`.

## 6. Estado del TODO

Completado:

- Blog, Cursos y Sobre mí tienen composiciones diferenciadas.
- Se conservaron contenidos, enlaces, formularios y lógica educativa.
- Se ejecutaron checks de diseño, páginas públicas, branding, legibilidad, premium, editorial, copy público, lint y build.
- La corrección específica de contraste y superficies del Blog está integrada en `main`.

Pendiente:

- consolidar toda la marca y paleta a nivel global;
- completar `/aprende` y `/herramientas`;
- revisar `/laboratorio` y `/contacto`;
- mantener diagnósticos, laboratorios, KaTeX y progreso local;
- revisar visualmente las tres plantillas en móvil, tablet y escritorio.

## 7. Instrucción directa para la siguiente IA

> Continúa desde `origin/main`, no desde una copia antigua. Primero sincroniza con `git fetch origin main && git rebase origin/main`. Revisa `plan.md`, `TODO.md` y este informe. No repitas la estrategia de agregar overrides CSS sobre clases Tailwind oscuras: cuando un componente tenga utilidades conflictivas, conviértelas a clases semánticas propias. Prioriza legibilidad y contraste sobre decoración. Conserva todo el contenido, enlaces, formularios, tracking y lógica educativa. Captura y revisa `/blog`, `/cursos/funciones-para-calculo` y `/sobre-mi` en 390, 768 y 1440 px antes de tocar más páginas. Después completa `/aprende`, `/herramientas`, `/laboratorio` y `/contacto`, ejecuta todos los checks y sube a `main` sin force push.
