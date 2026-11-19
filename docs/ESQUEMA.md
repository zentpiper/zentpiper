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
| Hosting | Funciona en **Cloudflare Workers** (`wrangler.jsonc`) **o Vercel** (`vercel.json`). Ver §11 |
| API | Ninguna: sitio 100 % estático. Los contactos van por WhatsApp |
| Cabeceras y redirecciones | Cloudflare: `public/_headers` y `public/_redirects` · Vercel: `vercel.json`. Las mismas reglas en ambos (caché, seguridad, `/proyecto` → `/sobre-nosotros` 301) |
| Analítica | GA4 `G-0L8037Y84K`, se carga con la primera interacción; evento `generate_lead` en cada clic a WhatsApp |
| Medios | Fuentes originales en `assets-src/` → `npm run medios` → `public/media/` |
| Videos del hero | 3 clips reales de Pexels (licencia libre): `cliente-celular`, `mensaje-whatsapp`, `empacando-pedido`. 7 s cada uno, retoque cálido, 200–480 KB (móvil 70–280 KB) |

## 3. Árbol

```
react-router.config.js     RUTAS_PUBLICAS + prerender
vite.config.js             plugin de React Router
wrangler.jsonc             Cloudflare: solo assets (drop-trailing-slash, 404-page)
vercel.json                Vercel: build/client estático, sin barra final, redirecciones y cabeceras
scripts/
  postbuild.mjs            404.html, sitemap.xml, hidratación diferida
  optimizar-medios.mjs     videos, pósters, capturas (160/480/800), fotos, favicons, og.jpg;
                           acepta partes: `node scripts/optimizar-medios.mjs proyectos`
  subconjunto-fuente.py    Inter reducida → src/assets/inter-zp.woff2
  servir-estatico.mjs      `npm run servir`: build/client en :8788 para medir con Lighthouse
src/
  root.jsx                 <html>, CSS inline, fuente, JSON-LD de empresa, GA4, layout
  routes.js                tabla de rutas
  styles/site.css          tokens + todos los estilos
  data/precios.js          ÚNICA fuente de precios, monedas y contacto (PE, RU)
  content/
    planes.js              planes web y apps (nombre, para quién, 3 puntos, ficha técnica)
    proyectos.js           portafolio + categorías + resultado confirmado
    textos.js              testimonios, FAQ, pasos de la home, cómo trabajamos, datos, equipo
    legal.js               política de privacidad y textos del Libro de Reclamaciones
  contexts/                país seleccionado (PaisProvider + usePais)
  lib/
    seo.js                 meta por ruta (title, description, canonical, OG, JSON-LD)
    schema.js              schema.org: empresa, migas, catálogo de planes
    whatsapp.js            enlace wa.me + evento GA4
    campos.js              campos de texto como HTML para CamposDiferidos (Contacto y Libro)
  components/              Header, Footer, BotonWhatsApp, WhatsAppFlotante, HeroVideo,
                           CamposDiferidos (campos de formulario sin costo de carga), iconos.js,
                           TarjetasPlanes (con ejemplo real), Incluido ("Todo es tuyo" + "En
                           todos"), FichaTecnica, Seccion, Faq, CtaFinal (con foto), TarjetaProyecto,
                           PageHero (encabezado con foto), Atienden (caras del equipo), Equipo, Cita,
                           Clientes, SelectorPais, Icono
  pages/                   una por ruta (ver §4)
public/                    media/, logo, favicons, og.jpg, robots.txt, _headers, _redirects
assets-src/                originales de medios (no se publican)
```

## 4. Rutas

| Ruta | Archivo | Objetivo | Bloques |
|---|---|---|---|
| `/` | `Home.jsx` | Vender webs | Hero con video real + caras del equipo · clientes · precios con ficha técnica y "Todo es tuyo" · 3 pasos (`PASOS`) + WhatsApp · 3 trabajos con resultado · equipo + cita · FAQ · CTA con foto |
| `/planes` | `Planes.jsx` | Vender webs (SEO "precios páginas web") | Hero con precio y foto · planes con ejemplo real, ficha técnica y "Todo es tuyo" · casos de tiendas + cita · FAQ · CTA |
| `/mobile` | `Mobile.jsx` | Vender apps | Hero con precio y foto · 3 planes + "Empresa" (con ficha) · casos · FAQ apps · CTA |
| `/portafolio` | `Portafolio.jsx` | Prueba social | Hero con mosaico · filtros por categoría · 13 proyectos · CTA |
| `/sobre-nosotros` | `SobreNosotros.jsx` | Confianza | Hero con fotos del equipo + datos (`DATOS_EMPRESA`) · equipo · cómo trabajamos (`COMO_TRABAJAMOS`) + cita · CTA |
| `/contacto` | `Contacto.jsx` | Captar lead | Formulario corto: primero "¿Qué necesitas?" (un toque), luego nombre y un mensaje opcional; arma el texto y abre WhatsApp · WhatsApp directo. Sin botón flotante |
| `/confirmacion` | `Confirmacion.jsx` | Post-envío (noindex) | Reabrir WhatsApp · ver portafolio |
| `/privacidad` | `Privacidad.jsx` | Legal (Ley 29733) | Qué datos se usan, para qué, con quién, derechos ARCO, cookies (`PRIVACIDAD`) |
| `/libro-de-reclamaciones` | `LibroReclamaciones.jsx` | Legal (Código del Consumidor) | Hoja de reclamación en 3 bloques → constancia con número, imprimir/PDF, copia por correo, WhatsApp. Sin botón flotante |
| `*` → `404.html` | `NotFound.jsx` | 404 real (noindex) | Ver precios · WhatsApp |
| `/proyecto` | `_redirects` | 301 → `/sobre-nosotros` | — |

Navegación: Páginas web · Apps · Portafolio · Nosotros · Contacto + selector PE/RU +
"Cotizar gratis" (WhatsApp). Pie: "Política de privacidad" y "Libro de Reclamaciones"
(con ícono de libro: es el aviso que exige la ley en la página de inicio).

## 5. Precios y planes

`src/data/precios.js` (pago único · mensualidad tras **3 meses gratis**):

- La mensualidad es el mantenimiento e **incluye hosting y dominio para siempre**
  (los 3 primeros meses van por cuenta de Zentpiper). Nunca escribas "1 año".
- **Todo es del cliente**: la web y el dominio (`PROPIEDAD_WEB` en
  `src/content/planes.js`, se muestra con `components/Incluido.jsx` bajo las tarjetas).

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

Precios RU = conversión aproximada (1 S/ ≈ 24 ₽) con redondeo comercial, confirmados
por el dueño el 2026-11-18.

## 6. Recorrido de un lead

```
Cualquier CTA ──<a href="https://wa.me/51945935080?text=…">──▶ WhatsApp   (+ GA4 generate_lead)
   └─ en planes: el texto incluye plan y precio en la moneda elegida

/contacto (formulario)
  submit ─┬─ window.open(wa.me con el mensaje armado)      ← dentro del gesto: no lo bloquean
          ├─ GA4 generate_lead
          └─ navigate("/confirmacion", { state })
```

Enlaces internos a `/contacto` pueden precargar el formulario: `?servicio=App%20móvil&plan=Negocio`.

```
/libro-de-reclamaciones (hoja de reclamación)
  submit ─┬─ arma la hoja con número LR-AAAAMMDD-HHMMSS (en el navegador, sin servidor)
          ├─ window.open(wa.me con la hoja completa)
          └─ constancia en pantalla: imprimir / guardar PDF · copia por correo (mailto a
             zentpiper@gmail.com con copia al cliente) · reabrir WhatsApp
```

Respuesta al cliente: máximo 15 días hábiles. Las hojas llegan por WhatsApp (y por correo
si el cliente lo envía): guárdalas el tiempo que exige la ley.

## 7. SEO

- HTML prerenderizado con `<title>`, description, canonical, OG y Twitter **por ruta**
  (`export const meta` + `lib/seo.js`).
- JSON-LD: `ProfessionalService` + `WebSite` en todas las páginas (`root.jsx`);
  `Service` + `OfferCatalog` con precios en PEN en `/`, `/planes` y `/mobile`;
  `BreadcrumbList` en páginas internas.
- **Zentpiper es la entidad principal.** El footer dice "Asociado con Cernext" y el
  perfil de Barclay en Nosotros enlaza a su web; ambos enlaces llevan `rel="nofollow"`: no pasan autoridad ni aparecen en meta
  ni en schema. Los proyectos del portafolio se presentan como trabajo de Zentpiper.
- `sitemap.xml` se genera en cada build desde `RUTAS_PUBLICAS` (8 URLs, incluidas las
  legales). `robots.txt` bloquea `/confirmacion`.
- 404 con status real. Barra final → 307 a la URL sin barra.

## 8. Sistema visual

Colores y logo de marca (no cambiar): fondo `#0a0a0b`, superficies `#16161b`/`#1e1e24`,
dorado del isotipo `#f3a523` (hover `#ffc24a`), texto `#f5f5f6`/`#b8b8c1`/`#9d9da8`,
WhatsApp `#25d366`. Isotipo hexagonal + "ZENTPIPER" espaciado.

Dirección (rediseño 2026-11-17, "verse profesional y cerrar ventas, menos cara de IA"):
- Titulares en minúscula normal y alineados a la izquierda; nada de eslóganes en
  mayúsculas, rótulos `// …`, brillos dorados difusos ni secciones todas centradas.
- Gente real: videos de Pexels en el hero, caras de Patrick y Barclay desde el primer
  pantallazo y en "Quiénes somos".
- Prueba concreta en vez de adjetivos: trabajos con resultado y una cita textual.
- Menos texto: planes con 3 puntos; el detalle técnico va plegado (`FichaTecnica`) en
  cada plan y en el pie ("¿Cómo está hecha esta web?").
- Radios 8/12/16, botones con esquinas (no píldora). Inter para todo.
  Breakpoints: 960 (menú), 860, 560.

Componentes de conversión: `.btn--gold` (CTA principal, siempre WhatsApp) ·
`.btn--ghost` (secundario) · `.plan--top` (plan destacado) · `.ficha` (detalle técnico
plegado) · `.cita` (testimonio) · `.wa` (botón flotante; oculto en `/contacto`,
`/confirmacion` y `/libro-de-reclamaciones`, que tienen formulario propio).

Reglas que salieron de la auditoría visual (2026-11-18):
- Lo fijo no tapa nada al final de la página: el pie deja 96 px libres bajo la ficha
  "¿Cómo está hecha esta web?" para el botón flotante.
- Las fichas (`.ficha dl`, `.hoja__datos`) usan una sola grilla `fit-content(40%) 1fr`:
  una etiqueta larga ("Confidencialidad") nunca se mete en su valor.
- En columnas, `.plan__para` reserva dos líneas para que los precios queden alineados.
- Titulares sin palabra suelta en la última línea (espacios duros donde haga falta).

## 9. Calidad

- `npm run build` ✅ · `npm run lint` ✅ (0 errores)
- Lighthouse 2026-11-18, tras el rediseño de páginas internas (Chrome 155, headless
  nuevo, sin GPU, servidor estático `npm run servir`): **100 · 100 · 100 · 100 en las 6
  páginas públicas, en móvil y desktop**. Móvil: LCP 1,1–1,6 s, TBT 0–80 ms, CLS 0.
  La home en desktop oscila 89–100 por el arranque gráfico de Chrome sin GPU (ver
  `RENDIMIENTO.md`, "Cómo medir"); da 100 en las corridas sin esa espera.
- Lighthouse móvil 2026-11-18 (noche), tras la auditoría visual y las páginas legales:
  - Accesibilidad, buenas prácticas y SEO: 100 en las 8 páginas.
  - Rendimiento 100 en `/`, `/planes`, `/privacidad` y `/libro-de-reclamaciones`.
  - `/mobile`, `/portafolio`, `/sobre-nosotros` y `/contacto`: sin medición válida. La PC
    estaba lenta (benchmarkIndex 500–870) y salieron entre 70 y 95.
  - Prueba A/B alternando la versión publicada y la nueva en esas condiciones: las dos
    caen igual (Contacto 85 y 85; Apps 77–80 y 71–78), así que no hay regresión.
  - Confirmado en producción con PageSpeed Insights (pagespeed.web.dev, 2026-11-18,
    commit `2bf5839`): `/contacto`, `/mobile`, `/portafolio` y `/sobre-nosotros` dan
    **100 · 100 · 100 · 100 en móvil y desktop**, TBT 0 ms, CLS 0, LCP 0,8–1,1 s.
  - La API de PageSpeed sin clave puede responder 429 (cuota diaria agotada): usar la
    web pagespeed.web.dev con el panel del navegador visible (oculto, no avanza).
- Sin tests automatizados.

## 10. Pendientes del dueño

1. Dar el RUC: va en `CONTACTO.ruc` (`src/data/precios.js`) y sale en la hoja del Libro
   de Reclamaciones y en la política de privacidad. Vacío = no se muestra.
2. Que un contador o abogado revise `src/content/legal.js` (privacidad y Libro de
   Reclamaciones).

El 2026-11-18 el dueño confirmó los precios en rublos (§5) y el permiso para publicar
los dos testimonios (Spanglish y Naim Marchionni).

## 11. Dominio, SEO y analítica (revisado 2026-11-18)

Todo el SEO y la analítica viven en **https://zentpiper.com** (sin www): canonical, Open
Graph, sitemap, `robots.txt`, JSON-LD (`@id` `https://zentpiper.com/#empresa`) y GA4
`G-0L8037Y84K`. Ningún tercero aparece en meta ni schema; los créditos van con nofollow.

Estado en vivo (2026-11-18): publicado en **Vercel**, proyecto `zentpiper` del equipo
"Zentpiper's projects" (cuenta del dueño). Cada push a `main` despliega solo.
- `zentpiper.com` → 200 directo (entorno Production).
- `www.zentpiper.com` → 301 a `zentpiper.com`; `http://` → 308 a `https://`.
- Barra final y `/proyecto` → 308 (redirecciones permanentes de `vercel.json`).
- 2026-11-18: se quitó la copia de leads a Telegram (no atienden por Telegram; antes
  iba al chat de Cernext). El formulario solo abre WhatsApp.
- GA4 `G-0L8037Y84K` = propiedad "zentpiper.com" de la cuenta "Cuenta de Google Ads"
  de `zentpiper@gmail.com` (único administrador). Dos cuentas de Google Ads vinculadas
  tienen acceso de lector a la propiedad.
- Search Console: propiedad de dominio `sc-domain:zentpiper.com`, verificada por DNS
  en Cloudflare (nameservers `*.ns.cloudflare.com`). Único propietario: `zentpiper@gmail.com`
  (registro TXT `google-site-verification=YZZx…`). Patrick y Barclay son usuarios
  "Completo" (desde 2026-11-18; antes eran propietarios con sus propios registros). El 2026-11-18 se envió
  `https://zentpiper.com/sitemap.xml` (6 URLs, correcto) y se pidió indexar `/` y
  `/planes` (Google tenía `/planes` como 404 del sitio viejo).
- Perfil de Empresa en Google: "Zentpiper", único propietario principal
  `zentpiper@gmail.com`. **Sin verificar desde el 2026-11-18**: al ocultar la dirección,
  Google pidió verificar de nuevo, y el único método que ofrece es un video del local.
  Zentpiper no tiene local y atiende todo por WhatsApp, sin reuniones en persona, así que
  el dueño decidió no verificarla: Google reserva la ficha para negocios con trato en
  persona. Sin verificar, Google no publica los cambios; el posicionamiento depende de
  la web (Search Console, sitemap, JSON-LD). Cambios enviados el 2026-11-18:
  - categoría principal "Diseñador web" y secundaria "Compañía de software" (antes "Tienda
    de software");
  - descripción con el mensaje de la web (pago único desde S/ 500, todo es tuyo,
    hosting incluido);
  - Instagram, TikTok y Facebook de @zentpiper;
  - dirección oculta (negocio de servicio) con área de servicio Lima;
  - horario de 7:00 a 22:00 todos los días;
  - teléfono y chat al +51 945 935 080.
  - El enlace a la web lleva
    `?utm_source=google&utm_medium=organic&utm_campaign=perfil-empresa`: en GA4, las
    visitas desde la ficha se ven filtrando por la campaña `perfil-empresa`.
  - Si cambias teléfono, precios u oferta, cambia también la ficha.
