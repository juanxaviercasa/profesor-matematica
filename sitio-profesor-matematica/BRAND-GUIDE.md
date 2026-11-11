# Sistema Zénit — Guía de identidad Aurora

## Identidad institucional

**Nombre público:** Sistema Zénit  
**Lema oficial:** **Logra tu meta**  
**Símbolo original:** fénix amarillo/dorado dentro de una llama roja y anaranjada.  
**Autor y fundador:** Juan Xavier (mantener reconocimiento en biografía, autoría y datos estructurados).  
**Aplicaciones:** Matemática, Química Zenit, laboratorios y herramientas del sistema educativo.

La firma del encabezado y del pie siempre presenta el fénix, a su derecha «Sistema Zénit» en primera línea y «Logra tu meta» en segunda. Es importante conservar el acento en **Zénit**. No volver a mostrar «POR JUAN XAVIER» en lugar del lema, aunque la autoría permanezca en otros sitios adecuados.

## Principio esencial

**Los colores del fénix NO definen la paleta de la interfaz.** El símbolo mantiene sus gradientes rojo, naranja y amarillo originales; la plataforma usa **violeta, índigo, lavanda y dorado**. Evitar superficies rojas o naranjas institucionales, cabeceras de fuego y botones rojos. Los degradados aportan profundidad y no deben restar legibilidad.

## Paleta Zénit Aurora (vigente)

| Token | Color | Uso |
|---|---|---|
| `--aurora-indigo` | `#241B4B` | Texto, footer y fondos premium |
| `--aurora-indigo-deep` | `#19152F` | Profundidad y superficies oscuras |
| `--aurora-violet` | `#6840C5` | Identidad, enlaces y botón primario |
| `--aurora-violet-deep` | `#4B2A96` | Hover y texto violeta accesible |
| `--aurora-violet-glow` | `#9471E5` | Brillos y detalles |
| `--aurora-lavender` | `#EEE8FD` | Tarjetas destacadas y estados suaves |
| `--aurora-paper` | `#FCFBFF` | Fondo de lectura |
| `--aurora-gold` | `#E8BC71` | Logros, acciones secundarias y pequeños acentos |
| `--aurora-line` | `#E4DAF4` | Bordes y separadores |
| `--aurora-muted` | `#615B76` | Texto secundario en fondo claro |

Para porcentajes de uso orientativos: 65 % superficies claras (papel y lavanda), 25 % índigo/violeta y 10 % dorado/acento. No son reglas rígidas, sino un límite contra la saturación.

### Degradados aprobados

- **Institucional:** `linear-gradient(115deg,#241B4B 0%,#4B2A96 53%,#8061D8 100%)`.
- **Oscuro de laboratorio:** `linear-gradient(155deg,#241B4B 0%,#35265F 55%,#19152F 100%)`.
- **Lavanda de lectura:** `linear-gradient(125deg,#FCFBFF 0%,#F1EDFF 55%,#DDD1FC 100%)`.
- **Dorado de reconocimiento:** `linear-gradient(120deg,#FFE6AD 0%,#E8BC71 55%,#D5A14D 100%)`.

No colocar párrafos ni fórmulas matemáticas sobre zonas con gradientes intensos. Botones violetas llevan texto blanco; botones dorados llevan texto índigo.

## Aplicación transversal

- **Header:** fondo perla con desenfoque sutil, fénix intacto y lema de dos líneas; navegación legible.
- **Portada:** papel/lavanda suave, CTA violeta, una superficie científica índigo con acentos lavanda/dorado.
- **Catálogo y blog:** tarjetas blancas con bordes lavanda; etiquetas y enlaces violetas; hover discreto.
- **Cursos y herramientas:** jerarquías estables; degradado oscuro solo en módulos destacados.
- **Lecciones:** fondo opaco, ecuaciones KaTeX legibles, sin recortes ni scroll lateral en el documento.
- **Laboratorios:** controles accesibles, paleta institucional en contenedores; mantener colores semánticos de correcto/incorrecto, datos y series independientes.
- **Footer:** índigo degradado, tipografía clara, lema dorado.
- **Mobile/tablet:** logotipo legible sin robar espacio al menú, objetivos táctiles de mínimo 44 px.

## Accesibilidad

Meta WCAG AA: 4.5:1 para texto normal y 3:1 para texto grande. Pares de referencia: blanco sobre violeta #6840C5 (~6.7:1); índigo #241B4B sobre dorado #E8BC71 (~8.9:1); violeta profundo #4B2A96 sobre lavanda #EEE8FD (~8.5:1). Los colores de error, acierto, avisos de precaución y series de gráficas no se reemplazan indiscriminadamente por violeta.

## Archivos fuente

- `public/brand/zenit-phoenix.svg`: fénix original del ecosistema Zénit (sin recolorear).
- `public/brand/zenit-lockup.svg`: versión horizontal con nombre y lema.
- `public/favicon.svg`: fénix original sobre índigo Aurora.
- `public/brand/zenit-mark.svg`: alias visual actualizado del fénix para compatibilidad.
- `public/brand/social-avatar.svg`: avatar vectorial Aurora.
- `app/zenit-redesign.css`: tokens base compartidos con componentes heredados.
- `app/zenit-aurora.css`: capa de marca **final**, cargada última en `app/layout.tsx`.
- `app/design-system.css`, `app/globals.css`: compatibilidad, tipografía, estilos y accesibilidad.
- `components/site.tsx`: único componente Brand compartido entre header y footer.
- `scripts/check-aurora.mjs`: prueba de integridad del branding.

## Evitar regresiones

No alterar la forma del fénix ni sus gradientes; no sustituir la identidad por una paleta fuego/rojo/naranja; no eliminar el lema; no usar textos microscópicos ni colores de bajo contraste; no alterar matemáticas ni lógica pedagógica durante cambios de estilo. Mantener la independencia de Química Zenit y Profesor-Matemática a nivel de funcionamiento, compartiendo identidad de marca.
