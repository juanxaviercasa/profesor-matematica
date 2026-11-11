# Portada Sistema Zénit — auditoría UX y dirección WOW
**Fecha:** 11 de noviembre de 2026  
**Alcance:** `app/page.tsx`, `components/quadratic-hero-lab.tsx`, componentes de navegación, estilos Aurora y catálogo.  
**Objetivo:** una portada editorial de alta calidad que demuestre matemáticas auténticas y lleve al usuario a una lección útil, no una colección de tarjetas de marketing.

## Diagnóstico de causa raíz
1. **Identidad redundante.** El encabezado ya presenta el fénix, Sistema Zénit y «Logra tu meta». Repetir esos tres elementos en el laboratorio añade ruido.
2. **Demostración duplicada.** La parábola f(x)=x²−4x+3 aparecía como minisimulador y como infografía estática más abajo. No aporta una idea diferente.
3. **Tres menús dentro de una misma página.** `home-subjects`, `home-start` y `dark-section/path-grid` ofrecen variaciones de «elige tu camino», sin una prioridad visible.
4. **Exceso de interfaz verbal.** Etiquetas, microcopy, badges y descripciones de lo que el usuario ya ve consumen espacio sin añadir comprensión.
5. **Desajuste entre promesa y experiencia.** La marca habla de matemática y ciencias, pero el único gran ejemplo público es una cuadrática. Da la impresión de catálogo centrado en un solo tema.
6. **Página sin un momento de descubrimiento claro.** Mover un slider es correcto pero el efecto pedagógico será mayor al guiar al estudiante hacia un insight, sin revelar la respuesta antes de explorar.
7. **Densidad del primer pantallazo.** Una tarjeta con fórmula, otra fórmula, gráfica, tres controles, tres indicadores, títulos y marca compite con el titular principal.

## Decisión de diseño
**Una demostración excelente es mejor que tres demostraciones repetidas.**
El fénix y el lema viven únicamente en el encabezado, pie y recursos institucionales; no dentro de cada tarjeta.

### Arquitectura objetivo (5 tramos)
**1. Hero «mueve una idea».** Una frase concreta sobre valor académico, un CTA principal (elegir materia/nivel), un secundario hacia laboratorios y un escenario interactivo a la derecha. Sin logos dentro del escenario, sin badge «laboratorio interactivo», sin más de una frase instructiva. El ejemplo cuadrático se mantiene como primera demostración matemática válida; no vuelve a aparecer abajo.

**2. Elige qué estudiar.** Una sola sección de rutas. Combinar área y nivel en un selector compacto (Matemática, Física, Química; Secundaria, PreUNI y Universidad según catálogo y rutas reales). Filtrar siempre por `publishStatus === "published"`: nunca presentar sesiones programadas como ya disponibles. Los nombres de CTA deben indicar destino: «Ver Álgebra de secundaria», «Explorar Física», etc. Evitar «Explorar» sin contexto.

**3. Idea sorpresa: laboratorio protagonista.** En una siguiente iteración, evolucionar el escenario del hero a un único contenedor con 2–3 modos opcionales y carga diferida: «Álgebra / Geometría / Ciencias». Cada modo responde de verdad a una acción. Álgebra: cuadrática con cambios de a,h,k y ejes matemáticamente correctos. Geometría: triángulo manipulable y sus propiedades. Ciencias: experimento validado de física/química, sin reutilizar la parábola solo con otro título. Nunca montar tres simuladores de forma simultánea.

**4. Prueba de profundidad sin saturación.** Una vista previa real de lección publicada (texto legible, pregunta breve, evidencia de corrección), más acceso a herramientas existentes. Máximo 2 o 3 elementos seleccionados por criterio pedagógico; no inventar testimonios ni cifras de estudiantes.

**5. Confianza y cierre.** Presentación concisa del docente fundador y CTA final al catálogo. La historia detallada, la oferta de curso y el marketing van a sus páginas específicas.

## Lenguaje editorial recomendado
- Titular posible: **«Entiende la idea. Comprueba cómo funciona.»**
- Subtítulo: **«Matemática y ciencias con explicaciones claras, ejercicios y herramientas que responden a tus cambios.»**
- CTA primario: **«Encontrar mi tema»** (si abre selector/buscador real); si apunta a `/aprende`, usar **«Ver materias y niveles»**.
- CTA secundario: **«Probar herramientas»** (si dirige a `/herramientas`).
- Tarjeta interactiva: solo **«Explora la parábola»**, fórmula legible, gráfica real, parámetros útiles, raíces y vértice; botón **«Reiniciar»**.
- No usar como relleno «innovación», «plataforma de última generación», «el mejor», «llevamos la educación al futuro» ni rótulos internos de desarrollo.

## Sistema visual WOW, sin trucos
- Identidad `Zénit Aurora`: índigo #241B4B, violeta #6840C5, lavanda #EEE8FD, oro #E8BC71 y lienzo #FCFBFF.
- Mantener original el fénix rojo/dorado; su color no se propaga a botones ni fondos.
- Hero luminoso con profundidad sutil y un solo escenario índigo. Diseño de iluminación y espaciado, **no** animación continua de partículas o degradados invasivos.
- Tipografía editorial grande y precisa; cuerpo legible en móvil sin reducir 12 px para hacer que entre.
- Revelado gradual y transiciones de gráfica discretas; respetar `prefers-reduced-motion`. No animar el contenido académico al cargar si puede distraer.
- En el laboratorio, priorizar el área de gráfica. Los controles son secundarios. Mostrar un insight después de la acción; no añadir ocho leyendas.
- Limitar los recursos multimedia pesados en la primera pantalla; en móviles apilar hero y demo con prioridad a lectura y exploración.

## Modelo pedagógico WOW
**Predecir → Manipular → Observar → Explicar.**
Ejemplo de la cuadrática: «Antes de mover a, ¿abrirá hacia arriba o hacia abajo?» Luego el control cambia y el vértice/raíces se actualizan. Añadir pistas de una línea solamente después de la interacción. La exactitud prevalece sobre la espectacularidad.
Para las lecciones: teoría → representación → práctica → retroalimentación, sin presentar una misma captura repetida en otra sección.

## Métricas de decisión (instrumentar; no inventar)
- Tasa de primera interacción significativa en el hero.
- Clic en CTA principal hacia catálogo, y llegada efectiva a una lección publicada.
- Inicio de lección, interacción con ejercicio y navegación a siguiente tema.
- Errores de hidratación/runtime y desbordamiento horizontal por viewport.
- Web Vitals y peso de JS antes/después del laboratorio.
Las metas numéricas deben definirse con una línea base real y pruebas de estudiantes, no con suposiciones.

## QA y criterios de aceptación
1. **Un solo nombre/lema visible en el encabezado**; no aparece de nuevo dentro del hero, de ninguna tarjeta ni simulador.
2. **Una sola demostración del tema cuadrático en la portada**; no hay imagen estática con el mismo ejemplo.
3. Coeficientes válidos: `a ≠ 0`, control y fórmula sincronizados; vértice y raíces exactos.
4. Los botones indican la acción o el destino concreto; un solo bloque de selección de rutas.
5. Desktop 1440/1920, tablet 768/1024, móvil 320/375/390: cero scroll horizontal de documento, lectura suficiente y controles fáciles de usar.
6. Contraste WCAG AA en texto. En áreas oscuras y gradientes, verificar el contraste renderizado, no solo tokens teóricos.
7. Accesibilidad: teclado, lectores de pantalla, foco, labels y movimiento reducido.
8. Cargar solo el código y la ilustración realmente necesarios por pantalla. Sin CLS atribuible a gráficos/microapp.
9. Probar compilación, checks `check:public`, `check:branding`, `check:hero`, `check:design` y QA Playwright antes de producción.
10. No exponer lecciones programadas como si estuviesen disponibles ni promesas comerciales no verificadas.

## Cambios de limpieza realizados en main
- Se retiró el duplicado de marca (fénix/lema) y el sello «Laboratorio interactivo» del componente `quadratic-hero-lab.tsx`.
- Se retiró de `app/page.tsx` la ilustración estática con la misma función cuadrática y sus coordenadas.
- Se retiró la sección genérica `home-start`, la repetición de marca del subtítulo del hero y los badges informativos redundantes.
- Se actualizaron las verificaciones estáticas del portal para impedir que regresen estas duplicaciones.

## Próxima iteración propuesta
**No sumar secciones nuevas sin quitar redundancias.** Prototipar el único escenario interactivo del hero, el buscador/selector de rutas y un bloque de contenidos distintos de la parábola; someterlo a revisión matemática y visual antes de desplegarlo.
