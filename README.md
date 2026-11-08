# Profesor de Matemática - Plataforma Educativa y Estrategia Integral

Proyecto integral para la plataforma educativa y modelo de negocio del **Profesor de Matemática** (especialidad en funciones, precálculo y cálculo para estudiantes preuniversitarios y universitarios de primeros ciclos).

---

## 📁 Estructura del Repositorio

El repositorio combina la estrategia comercial/pedagógica y el código fuente de la aplicación web interactiva:

```text
profesor-matematica/
├── Arquitectura Web Profesor Matemática - Fase 1.md   # Especificación técnica, rutas y arquitectura
├── Kit de Aplicación Comercial.md                    # Argumentarios de venta, copies y canales
├── Plan de Monetización Matemáticas Lima.md           # Modelo de ingresos, pricing y paquetes
├── Marketing Clases Matemáticas Lima.md               # Estrategia de captación y SEO local
├── Embudo Curso Digital TikTok YouTube.md             # Funnel de conversión para redes sociales
├── Estrategia Digital Integrada e Internacional.md   # Escalamiento y posicionamiento internacional
├── CVCabello.pdf                                      # Respaldo docente y credenciales
├── entregables/                                       # Recursos educativos empaquetados
│   └── semana-01-funciones.zip                       # Guías y material de la Semana 1
└── sitio-profesor-matematica/                         # Código fuente de la aplicación web
    ├── app/                                           # App Router (Next.js / Vinext)
    ├── components/                                    # Componentes UI y laboratorios interactivos
    ├── lib/                                           # Utilidades y configuración
    ├── content/                                       # Contenido educativo y lecciones
    ├── public/                                        # Assets estáticos y recursos gráficos
    ├── package.json                                   # Dependencias y scripts
    └── vite.config.ts / next.config.ts                # Configuraciones de build
```

---

## 🚀 Aplicación Web (`sitio-profesor-matematica`)

La aplicación interactiva está desarrollada con tecnologías modernas para ofrecer visualizaciones matemáticas interactivas fluidas y alto rendimiento:

- **Framework**: Next.js / Vinext (Cloudflare Workers runtime)
- **Frontend**: React 19, TypeScript
- **Estilos**: Tailwind CSS v4, Lucide Icons, Shadcn UI
- **Matemáticas**: KaTeX (renderizado de fórmulas LaTeX en local)
- **Gráficos interactivos**: Laboratorios visuales de funciones, límites, transformaciones y sistemas de coordenadas cartesianas numeradas.

### Instrucciones para Desarrollo Local

1. Navegar al directorio de la aplicación:
   ```bash
   cd sitio-profesor-matematica
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```

4. Compilar para producción:
   ```bash
   npm run build
   ```

---

## 📊 Estado del Proyecto

- **Estrategia & Planificación**: Completa (Arquitectura, Embudo de conversión, Estrategia digital y comercial).
- **Plataforma Web**: Aplicación desarrollada localmente con 25+ iteraciones (laboratorios interactivos de funciones, límites formales, renderizado de KaTeX y navegación interna).
- **Despliegue**: Listo para despliegue en plataformas compatibles como Cloudflare Workers/Pages o Vercel.
