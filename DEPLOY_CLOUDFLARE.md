# Despliegue de Profesor Matemática en Cloudflare

## Diagnóstico (8 de noviembre de 2026, hora Perú)

El primer intento en Cloudflare Pages de `profesor-matematica` terminó con
`ENOENT /opt/buildhome/repo/package.json`: Pages estaba configurado con
`root_dir=""`, pero la aplicación está en `sitio-profesor-matematica/`.

El commit `b7c8d40` añadió un `package.json` al monorepo y dos
`wrangler.json`, pero **eso no hace que `dist/client` sea una página
estática completa**. La aplicación usa Next.js 16, Vinext, React Server
Components y rutas de servidor; necesita el runtime Worker.

## Plataforma de despliegue correcta

**Cloudflare Workers + Workers Builds**, conectado al mismo GitHub:

- Repositorio: `juanxaviercasa/profesor-matematica`.
- Rama: `main`.
- Directorio raíz del build: `sitio-profesor-matematica`.
- Node.js: `22` (mínimo 22.13).
- Comando de compilación: `npm run build`.
- Comando de despliegue: `npm run deploy` (script local verificado).
- Configuración fuente: `sitio-profesor-matematica/wrangler.json`.
- Configuración generada: creada por `@cloudflare/vite-plugin` bajo `dist/`.

No indicar un directorio de salida de Pages (`dist/client`) como si se
tratase de una exportación estática. El Worker generado incluye el servidor
SSR y los assets de cliente.

### Validación reproducible antes de publicar

Desde `sitio-profesor-matematica/`:

```bash
npm ci
npm run build
npm run check:cloudflare
npm run deploy -- --dry-run
```

Solo si pasan todos los pasos:

```bash
npm run deploy
```

- `scripts/verify-worker-output.mjs` exige un solo `wrangler.json`
  generado, un archivo principal Worker real y la carpeta de assets.
- `scripts/deploy-cloudflare.mjs` usa **ese** `wrangler.json`
  generado, no rutas fijas que podrían cambiar entre versiones.
- El workflow `.github/workflows/cloudflare-build-check.yml` ejecuta
  instalación, compilación, verificación y dry-run en Node 22 ante
  cambios en `main`.
- Las credenciales del deploy deben estar en el entorno secreto de
  Workers Builds o en el acceso autenticado de Wrangler. **No guardar
  tokens en GitHub ni en el código fuente**.

## Estado del proyecto Pages existente

El proyecto Pages `profesor-matematica` se mantiene **sin modificar**
hasta que se compruebe un Worker funcional. Su intento histórico fallido
es útil para el diagnóstico; no implica que una nueva publicación por
Pages vaya a funcionar.

Al desplegar el Worker, comprobar:
1. HTTP 200 en `/` y rutas del curso.
2. HTML válido generado por el servidor; no 404 de assets estáticos.
3. CSS/JS cargados sin errores.
4. Rutas dinámicas y API que use el sitio.
5. `robots.txt`, `sitemap.xml` y `llms.txt`.
6. SEO (URL canónica): actualmente `app/layout.tsx` apunta a un
   dominio de prueba `chatgpt.site`; actualizarlo solo al elegir el
   dominio de producción definitivo.

## Reversión y seguimiento

El código vive en `main`; los cambios de despliegue son reversibles
con Git. No borrar el proyecto Pages ni alterar dominios de producción
hasta que la nueva versión funcione.

Documentación del proveedor:
https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/
https://developers.cloudflare.com/workers/ci-cd/builds/configuration/
