# Sistema Zénit — Dirección de diseño
Adaptación de `juliobsz/skills`: **awwwards** (concepto, dirección de arte, contenido, responsive, accesibilidad y animación) y **jury** (evaluación de usabilidad, rendimiento, contraste, SEO y teclado). Las referencias internas del repositorio son partes de estas dos habilidades, no habilidades independientes.

## Idea
**La matemática se entiende al conectar representaciones.** Metáfora visual: una pizarra diagramada como mapa de ideas. El visitante debe comprender en menos de tres segundos qué puede estudiar y adónde ir.

## Dirección
- Color: bosque profundo `#12392D` (conceptos y gráficos), marfil `#F7F8F2` (lectura), tinta `#142C27`, verde `#D9EF78` (comprobación/acción), coral `#A9311B` (énfasis).
- Texto: tipografía del sistema para interfaz y Georgia para grandes títulos; evitar fuentes remotas, CLS y cambios de identidad innecesarios.
- Ritmo: sección principal con idea clara → rutas visibles → explorador → credenciales reales → CTA.
- Imagen original: `public/brand/zenit-learning-map.svg`, diagrama propio de funciones. Mantener el logotipo del ojo.
- Movimiento: microinteracciones de 160–220 ms solamente, nunca loaders, scroll bloqueado o transiciones de ruta capaces de romper los enlaces.
- Accesibilidad: foco visible, enlace «Saltar al contenido», contraste adecuado, objetivos táctiles >=44 px, `prefers-reduced-motion` y contenido funcional sin JavaScript.

## Límites de implementación
No introducir GSAP, Lenis ni WebGL en la plataforma educativa hasta tener una auditoría visual con navegador y pruebas de estabilidad: aumentan riesgo y peso sin aportar a la resolución de ejercicios. Nunca inventar testimonios, tasas de aprobación ni títulos profesionales.

## Control de calidad pendiente
Revisar producción a 390, 768, 1024, 1440 y 1920 px, errores de consola, enlaces, teclado, contrastes, imágenes, LCP, CLS, simuladores y formularios. No asignar puntajes sin capturas y mediciones reales.
