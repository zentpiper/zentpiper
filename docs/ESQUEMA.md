# Esquema del sitio Zentpiper

Mapa del sitio después de la reformulación del 2026-10-14. Si cambias rutas, datos,
el recorrido de un lead o los estilos, actualiza este archivo en el mismo cambio.
Las reglas de rendimiento están en [`RENDIMIENTO.md`](RENDIMIENTO.md).

## 1. Qué es

Web comercial de **Zentpiper**, agencia de diseño web, tiendas online y apps de
Santiago de Surco (Lima). Mercados: **Perú y Rusia**. Su único trabajo es **convertir
visitas en conversaciones de WhatsApp**: precio visible, prueba social y un CTA de
WhatsApp en cada bloque.

## 2. Stack e infraestructura

| Pieza | Detalle |
|---|---|
| Framework | React 19 + React Router 7.18 en **modo framework**, `ssr: false` + `prerender` (HTML estático por ruta) |
| Build | Vite 7 → `build/client` · `scripts/postbuild.mjs` (404.html, sitemap, hidratación diferida) |
| Estilos | Una hoja `src/styles/site.css` inyectada **inline** en cada HTML |
| Fuente | Inter variable reducida a español y pesos 400–850 (`src/assets/inter-zp.woff2`, 26 KB, `npm run fuente`) |
| Hosting | **Cloudflare Workers** + static assets (`wrangler.jsonc`) |
| API | `worker/index.js` → `POST /api/send-telegram` (`run_worker_first: ["/api/*"]`) |
| Cabeceras y redirecciones | `public/_headers` (caché, seguridad) · `public/_redirects` (`/proyecto` → `/sobre-nosotros` 301) |
| Analítica | GA4 `G-0L8037Y84K`, se carga con la primera interacción; evento `generate_lead` en cada clic a WhatsApp |
| Medios | Fuentes originales en `assets-src/` → `npm run medios` → `public/media/` |

## 3. Árbol

```
react-router.config.js     RUTAS_PUBLICAS + prerender
vite.config.js             plugin de React Router
wrangler.jsonc             Worker + assets (drop-trailing-slash, 404-page)
scripts/
  postbuild.mjs            404.html, sitemap.xml, hidratación diferida
  optimizar-medios.mjs     videos, pósters, capturas, fotos, favicons, og.jpg
  subconjunto-fuente.py    Inter reducida → src/assets/inter-zp.woff2
src/
  root.jsx                 <html>, CSS inline, fuente, JSON-LD de empresa, GA4, layout
  routes.js                tabla de rutas
  styles/site.css          tokens + todos los estilos
  data/precios.js          ÚNICA fuente de precios, monedas y contacto (PE, RU)
  content/
    planes.js              planes web y apps (nombre, para quién, qué incluye)
    proyectos.js           portafolio + categorías + lista de clientes
    textos.js              testimonios, pasos, comparativa, FAQ, equipo
  contexts/                país seleccionado (PaisProvider + usePais)
  lib/
    seo.js                 meta por ruta (title, description, canonical, OG, JSON-LD)
    schema.js              schema.org: empresa, migas, catálogo de planes
    whatsapp.js            enlace wa.me + evento GA4
  components/              Header, Footer, BotonWhatsApp, WhatsAppFlotante, HeroVideo,
                           CamposDiferidos (campos de formulario sin costo de carga), iconos.js,
                           TarjetasPlanes, Seccion, Faq, CtaFinal, TarjetaProyecto,
                           Testimonios, CintaClientes, Pasos, Comparativa, SelectorPais, Icono
  pages/                   una por ruta (ver §4)
worker/index.js            API de leads a Telegram
public/                    media/, logo, favicons, og.jpg, robots.txt, _headers, _redirects
assets-src/                originales de medios (no se publican)
```

## 4. Rutas

| Ruta | Archivo | Objetivo | Bloques |
|---|---|---|---|
| `/` | `Home.jsx` | Vender webs | Hero con video · cinta de clientes · precios web · 3 pasos · 6 proyectos · testimonios · comparativa · FAQ · CTA |
| `/planes` | `Planes.jsx` | Vender webs (SEO "precios páginas web") | Hero con precio · planes · 4 beneficios · pasos · FAQ · CTA |
| `/mobile` | `Mobile.jsx` | Vender apps | Hero con precio · 3 planes + "Empresa" · pasos · casos · FAQ apps · CTA |
| `/portafolio` | `Portafolio.jsx` | Prueba social | Filtros por categoría · 14 proyectos · CTA |
| `/sobre-nosotros` | `SobreNosotros.jsx` | Confianza | Datos · equipo (Patrick, Barclay) · 3 principios · CTA |
| `/contacto` | `Contacto.jsx` | Captar lead | Formulario corto: primero "¿Qué necesitas?" (un toque), luego nombre, WhatsApp, mensaje y email opcionales · WhatsApp directo |
| `/confirmacion` | `Confirmacion.jsx` | Post-envío (noindex) | Reabrir WhatsApp · ver portafolio |
| `*` → `404.html` | `NotFound.jsx` | 404 real (noindex) | Ver precios · WhatsApp |
| `/proyecto` | `_redirects` | 301 → `/sobre-nosotros` | — |

Navegación: Páginas web · Apps · Portafolio · Nosotros · Contacto + selector PE/RU +
"Cotizar gratis" (WhatsApp).

## 5. Precios y planes

`src/data/precios.js` (pago único · mensualidad tras **3 meses gratis**):

| Plan web | Clave | PE | RU |
|---|---|---|---|
| Esencial | `esencial` | S/ 500 · S/ 30/mes | 11 900 ₽ · 690 ₽/mes |
| Negocio (más elegido) | `negocio` | S/ 900 · S/ 50/mes | 21 900 ₽ · 1 190 ₽/mes |
| Profesional | `profesional` | S/ 1,500 · S/ 75/mes | 35 900 ₽ · 1 790 ₽/mes |
| Tienda Online | `tienda` | S/ 2,500 · S/ 120/mes | 59 900 ₽ · 2 890 ₽/mes |

| Plan app | Clave | PE | RU | Entrega |
|---|---|---|---|---|
| App Lanzamiento | `lanzamiento` | S/ 5,900 · S/ 190/mes | 139 900 ₽ · 4 490 ₽/mes | 2–4 semanas |
| App Negocio (más elegida) | `negocio` | S/ 9,900 · S/ 290/mes | 234 900 ₽ · 6 890 ₽/mes | 4–6 semanas |
| App Pro | `pro` | S/ 15,900 · S/ 490/mes | 379 900 ₽ · 11 690 ₽/mes | 6–10 semanas |
| Empresa | — | A cotizar | A cotizar | — |

Precios RU = conversión aproximada (1 S/ ≈ 24 ₽) con redondeo comercial. **Pendiente
de confirmar por el dueño.**

## 6. Recorrido de un lead

```
Cualquier CTA ──<a href="https://wa.me/51945935080?text=…">──▶ WhatsApp   (+ GA4 generate_lead)
   └─ en planes: el texto incluye plan y precio en la moneda elegida

/contacto (formulario)
  submit ─┬─ window.open(wa.me con el mensaje armado)      ← dentro del gesto: no lo bloquean
          ├─ fetch POST /api/send-telegram (keepalive)    ← Worker → chat de Telegram
          ├─ GA4 generate_lead
          └─ navigate("/confirmacion", { state })
```

Enlaces internos a `/contacto` pueden precargar el formulario: `?servicio=App%20móvil&plan=Negocio`.

## 7. SEO

- HTML prerenderizado con `<title>`, description, canonical, OG y Twitter **por ruta**
  (`export const meta` + `lib/seo.js`).
- JSON-LD: `ProfessionalService` + `WebSite` en todas las páginas (`root.jsx`);
  `Service` + `OfferCatalog` con precios en PEN en `/`, `/planes` y `/mobile`;
  `BreadcrumbList` en páginas internas.
- **Zentpiper es la entidad principal.** El footer dice "Asociado con Cernext" y el
  perfil de Barclay en Nosotros enlaza a su web; ambos enlaces llevan `rel="nofollow"`: no pasan autoridad ni aparecen en meta
  ni en schema. Los proyectos del portafolio se presentan como trabajo de Zentpiper.
- `sitemap.xml` se genera en cada build desde `RUTAS_PUBLICAS`. `robots.txt` bloquea
  `/api/` y `/confirmacion`.
- 404 con status real. Barra final → 307 a la URL sin barra.

## 8. Sistema visual

Tokens en `:root` de `site.css`: fondo `#0a0a0b`, superficies `#16161b`/`#1e1e24`,
dorado del isotipo `#f3a523` (hover `#ffc24a`), texto `#f5f5f6`/`#b8b8c1`/`#9d9da8`,
WhatsApp `#25d366`. Radios 10/16/24. Inter para todo y monoespaciada del sistema para
los "eyebrow" (`// PRECIOS CLAROS`). Breakpoints: 960 (menú), 860, 560, 480.

Componentes de conversión: `.btn--gold` (CTA principal, siempre WhatsApp) ·
`.btn--ghost` (secundario) · `.plan--top` (plan destacado) · `.chips` (lo incluido) ·
`.wa-float` (botón flotante en todas las páginas).

## 9. Calidad

- `npm run build` ✅ · `npm run lint` ✅ (0 errores)
- Lighthouse 2026-11-15 (Chrome 155, headless nuevo, sin GPU, como PageSpeed):
  **100 · 100 · 100 · 100 en las 6 páginas públicas, en móvil y desktop**.
  Móvil: LCP 1,0–1,5 s, TBT 0–80 ms, CLS 0. Reglas en `RENDIMIENTO.md`.
- Sin tests automatizados. El Worker se probó con un fetch simulado (éxito, campos
  faltantes, email inválido, sin configurar, método).

## 10. Pendientes del dueño

1. Confirmar precios en rublos (§5).
2. Confirmar que los testimonios son reales y que hay permiso para publicarlos.
3. Configurar los secretos de Telegram en Cloudflare (`npx wrangler secret put …`).
4. Verificar la propiedad en Google Search Console y enviar `sitemap.xml`.
