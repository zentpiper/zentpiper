# AGENTS.md — Zentpiper

Guía para cualquier agente de código (Claude, Codex, Cursor…) en este repo.
Antes de un cambio grande lee [`docs/ESQUEMA.md`](docs/ESQUEMA.md) (mapa del sitio) y
[`docs/RENDIMIENTO.md`](docs/RENDIMIENTO.md) (reglas que sostienen el 100 en Lighthouse).

## Proyecto

Web comercial de Zentpiper (diseño web, tiendas online y apps; Lima, Perú). Mercados:
**Perú y Rusia**. Objetivo único: **convertir visitas en conversaciones de WhatsApp**.
Todo el contenido visible está en español (es-PE). El código usa español para el
dominio (`planes`, `precios`, `pais`) e inglés para lo técnico.

## Comandos

```bash
npm install
npm run dev        # React Router dev server (http://localhost:5173), sin /api
npm run build      # prerender a build/client + scripts/postbuild.mjs
npm run lint       # ESLint 9 — debe quedar en 0 errores
npm run preview    # build + wrangler dev: sitio + /api en local (necesita .dev.vars)
npm run servir     # build/client estático en :8788, para medir con Lighthouse (sin /api)
npm run medios     # regenera public/media desde assets-src (FFMPEG=ruta para videos)
npm run deploy     # build + wrangler deploy — SOLO con permiso explícito del dueño
```

No hay tests. Verificar = `npm run build` + `npm run lint` + navegador + Lighthouse
(skill `qa-visual`).

## Arquitectura en una pantalla

- React Router 7 **modo framework**, `ssr: false` + `prerender`: cada ruta es un HTML
  estático completo. Rutas en `src/routes.js`; lista prerenderizada en
  `react-router.config.js` (`RUTAS_PUBLICAS`).
- `src/root.jsx`: documento, CSS inline, fuente, JSON-LD de empresa, GA4 diferido y
  layout (Header, main, Footer, WhatsApp flotante).
- **Hidratación diferida**: `scripts/postbuild.mjs` hace que React cargue con la primera
  interacción. Todo lo que deba funcionar al primer toque tiene que funcionar sin JS.
- Producción: funciona en **Cloudflare Workers** (`wrangler.jsonc`) o **Vercel**
  (`vercel.json` + `api/send-telegram.js`). La lógica de leads está en `worker/lead.js`
  y la usan ambos. Si cambias redirecciones o cabeceras, cámbialas en los dos.
- SEO y analítica siempre en `https://zentpiper.com` (sin www). Ver `docs/ESQUEMA.md` §11.

## Reglas de contenido y datos

- **Precios, monedas, teléfono, WhatsApp y email solo en `src/data/precios.js`.** Léelos
  con `usePais()` (`precio("web", "negocio")`) o importando `CONTACTO`. Nunca un precio
  o teléfono literal en JSX.
- Textos de planes, proyectos, FAQ, testimonios y equipo van en `src/content/`, no
  dentro de las páginas.
- Copy de conversión: frases cortas, beneficio antes que característica, un CTA claro
  por bloque. No inventes plazos, garantías, cifras ni testimonios: usa solo los que
  ya están en `src/content/` o los que dé el dueño.
- Mercados: solo Perú y Rusia en mensajes, schema y selector de país.
- **Zentpiper es la entidad principal para SEO.** Enlaces a Barclay Leach, Cernext u
  otras agencias llevan `rel="nofollow noopener"`. Nunca en meta, títulos ni JSON-LD.
- CTA principal = `<BotonWhatsApp>` (enlace `wa.me` real + evento GA4). No uses
  `window.open` fuera del formulario de contacto.

## Añadir o cambiar una ruta

Usa la skill `nueva-pagina`. Resumen: `src/routes.js` · `RUTAS_PUBLICAS` · nav en
`components/navegacion.js` · `Footer.jsx` · `export const meta = () => seo({...})` con
`migas()` · `public/_redirects` si renombras · `docs/ESQUEMA.md`.

## Estilos

- Objetivo: **verse profesional y cerrar ventas**, sin cara de plantilla de IA. Se
  mantienen los colores (negro + dorado `#f3a523`) y el logo (isotipo hexagonal +
  "ZENTPIPER"). No vuelvas a meter rótulos `// …`, eslóganes en mayúsculas, brillos
  dorados difusos, estrellas, tablas de check/cruz ni secciones todas centradas.
  Detalle en `docs/ESQUEMA.md` §8.
- Detalle técnico solo plegado, con `components/FichaTecnica.jsx`.
- Una sola hoja: `src/styles/site.css`, organizada por secciones con tokens en `:root`.
  No crees archivos CSS por página ni prefijos de tokens nuevos.
- Usa los tokens (`--oro`, `--surface`, `--text-2`…), nunca colores sueltos.
- Prohibido (rompe el 100 sin GPU): `backdrop-filter`, sombras con desenfoque grande,
  animaciones que no sean `transform`/`opacity`, `text-wrap: balance`.
- Imágenes siempre con `width`/`height`. Las de bajo el pliegue con `loading="lazy"`;
  las visibles sin scroll nunca `lazy`.
- Formularios con campos de texto: usa `components/CamposDiferidos.jsx` (ver
  `docs/RENDIMIENTO.md` §7). Un `<input>` de texto en el HTML inicial cuesta ~100 ms.
- `dangerouslySetInnerHTML` solo con objetos estables (constante o `useMemo`), nunca
  `{{ __html: … }}` inline: React 19 reescribe el contenido en cada re-render.

## Seguridad y secretos

- Nunca subas `.env*` ni `.dev.vars`. Los secretos del Worker se gestionan con
  `npx wrangler secret put TELEGRAM_BOT_TOKEN` / `TELEGRAM_CHAT_ID`.
- El Worker valida y recorta los campos y envía texto plano a Telegram (sin
  `parse_mode`) para que nadie pueda inyectar formato.

## Git

- Rama `main`, más de un colaborador: `git pull --ff-only` antes de empezar.
- Commits pequeños, estilo Conventional Commits (`feat(planes): …`, `fix(header): …`).
- No hagas `push`, `deploy` ni cambies créditos/autoría sin permiso explícito del dueño.
