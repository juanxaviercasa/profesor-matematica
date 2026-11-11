# Fase 1 — Línea base visual

## Alcance

Capturas locales del servidor de desarrollo en:

- `/blog`
- `/cursos/funciones-para-calculo`
- `/sobre-mi`

Anchos revisados:

- 390 px — móvil
- 768 px — tablet
- 1440 px — escritorio

Comando de referencia:

```bash
npm run dev
chromium --headless --no-sandbox --window-size=390,1000 --screenshot=blog-390.png http://127.0.0.1:5173/blog
```

## Resultado de la inspección

### Blog

- El hero ya utiliza una superficie clara, con jerarquía editorial y contraste legible.
- Los filtros y selectores ya no heredan el panel oscuro anterior.
- Las tarjetas se presentan como fichas de biblioteca, no como paneles de administración.
- En móvil el contenido se reorganiza verticalmente sin desbordamiento evidente.
- Pendiente para la siguiente fase: inspeccionar el catálogo completo debajo del primer viewport y ajustar densidad de filtros/tarjetas si la lectura larga se vuelve repetitiva.

### Cursos — Funciones sin Vacíos

- La oferta tiene una familia visual propia basada en azul claro, papel, azul Zénit y amarillo de acción.
- En móvil el orden de la propuesta, CTAs y tarjeta de transformación es comprensible.
- En tablet y escritorio la composición asimétrica funciona sin volver al hero oscuro genérico.
- Pendiente para la siguiente fase: revisar el recorrido completo hasta módulos, formulario y FAQ, no solo el primer viewport.

### Sobre mí

- La página se presenta como identidad institucional del proyecto, no como biografía promocional aislada.
- La fotografía y el bloque azul claro mantienen una entrada clara en los tres anchos.
- En móvil la fotografía aparece después de la propuesta y no rompe el ancho.
- Pendiente para la siguiente fase: revisar el bloque completo de credenciales, trayectoria, método, enlaces y formulario/contacto.

## Criterios de aceptación de esta fase

- No hay hero, filtro o tarjeta con texto oscuro sobre superficie oscura en las tres rutas revisadas.
- El cuerpo y los controles permanecen legibles en 390 px.
- No aparece overflow horizontal evidente en móvil.
- Cada plantilla tiene una composición propia.
- No se modificó contenido, lógica educativa, enlaces ni formularios.

## Archivos de referencia

- `contact-sheet.png`: comparación rápida de las nueve capturas.
- `blog-390.png`, `blog-768.png`, `blog-1440.png`.
- `cursos-funciones-para-calculo-390.png`, `cursos-funciones-para-calculo-768.png`, `cursos-funciones-para-calculo-1440.png`.
- `sobre-mi-390.png`, `sobre-mi-768.png`, `sobre-mi-1440.png`.

## Próxima fase

1. Capturar páginas completas o recorrer por scroll los tres recorridos.
2. Auditar densidad y ritmo vertical en móvil.
3. Revisar Laboratorio y Contacto antes de extender cambios globales.
4. Ejecutar checks, lint y build después de cualquier modificación.
