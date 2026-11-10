# Sistema Zénit — estándar de interfaz premium y matemática
Fecha de incorporación: 10 de noviembre de 2026. Rama objetivo: main.

## Criterio de integración
El proyecto **ya utiliza** React, Next.js, Tailwind, shadcn/Radix, KaTeX, Lucide, Recharts,
Playwright y axe-core. No se instalan duplicados por el mero número de estrellas.
Tomamos las buenas prácticas de UI/UX Pro Max, Impeccable, Frontend Design de
Anthropic y las pautas web de Vercel como métodos de revisión, sin incorporar
sus repositorios completos ni depender de agentes en producción.

## Intervención transversal
- `app/premium-responsive.css`: consolidación al final de la cascada para
  legibilidad mínima, targets táctiles de 44px, anchos flex/grid, foco visible,
  superficie oscura, reducción de movimiento y contenedores de fórmulas.
- La notación matemática conserva KaTeX y su MathML. Cuando una expresión
  larga carece de un punto seguro de partición, se permite desplazamiento
  interno como último recurso, en lugar de cortar raíces o fracciones.
- `scripts/check-premium-ui.mjs`: comprobaciones estáticas sobre la cascada,
  contraste WCAG AA de tokens y presencia de cobertura compartida.
- `scripts/qa-browser.mjs`: localización de elementos concretos que empujan
  el ancho de la página, además de la medición que ya existe.
- `zenit-web-qa.yml` ejecuta las comprobaciones en CI. La auditoría de 628
  lecciones y la QA de laboratorios permanecen disponibles sin alterar los
  datos ni las fechas de publicación.

## Criterios de aceptación (no declarar superados sin ejecutar CI)
1. `npm run check:premium` y las demás verificaciones estáticas sin errores.
2. Build Cloudflare completo y navegación real por Chromium.
3. Ningún desbordamiento horizontal global en anchos 320/375/390/768/1024/1440.
4. Fórmulas KaTeX con MathML y sin clipping; cuantificar fórmulas que todavía
   requieren scroll interno, no ocultar la incidencia.
5. Contraste WCAG AA de texto y controles en fondos claros y oscuros.
6. Teclado, lectores de pantalla, ajuste táctil y `prefers-reduced-motion`.
7. Regresión pedagógica: no generar respuestas inventadas, no habilitar
   publicaciones programadas y no alterar datos matemáticos por estilo.

## Opciones especializadas para estudio posterior
- Mafs / JSXGraph: gráficos interactivos y geometría dinámica.
- MathLive: edición de expresiones matemáticas por el alumnado.
- Perseus / Numbas: modelos de evaluación verificable.
- Manim: vídeos matemáticos, no sustituye el renderer web.
- Mathigon: patrones pedagógicos interactivos.
No incluir ninguna dependencia sin comprobar compatibilidad, peso, licencia
y mantenimiento. GeoGebra y tldraw exigen revisión de condiciones comerciales.

## Limitaciones
Esta intervención refuerza componentes comunes y CI. No equivale a certificar
visualmente las 628 rutas ni a corregir los contenidos curriculares incompletos.
El informe de catálogo identifica publicadas sin teoría o ejercicios y claves
sin opciones comprobables; se requiere intervención editorial por caso.
