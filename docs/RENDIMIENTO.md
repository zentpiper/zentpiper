# Rendimiento: reglas que sostienen el 100 en Lighthouse

Medido el 2026-10-14 (revisado el 2026-11-15) con Lighthouse 12.8 + Chrome 155 en modo headless nuevo (el mismo
tipo de entorno que PageSpeed Insights: **sin GPU** y con red/CPU simuladas de un móvil
lento). Resultado: 100 · 100 · 100 · 100 en móvil y desktop en las páginas principales.

Cada regla de abajo existe porque romperla bajó la puntuación en una medición real.
Si cambias algo de esta lista, vuelve a medir (skill `qa-visual`, sección Lighthouse).

## 1. El HTML trae todo; React llega después

- Todas las rutas se **prerenderizan** (`react-router.config.js` → `prerender`).
- `scripts/postbuild.mjs` → `diferirHidratacion()` quita los `<link rel="modulepreload">`
  y reemplaza el arranque de React Router por un cargador que pide el JS con la
  **primera interacción** (`pointerdown`, `keydown`, `touchstart`, `scroll`,
  `mousemove`, `focusin`) o 6 s después de `load`.
- Por qué: sin GPU el primer cuadro tarda ~0,5 s en presentarse. Todo JS descargado
  antes de ese momento cuenta para el LCP simulado, y evaluar React (~110 KB gzip)
  suma TBT. Con JS durante la carga: FCP 2,1 s y rendimiento 93–96. Sin él: FCP 0,7 s
  y rendimiento 100.
- Consecuencia: **todo lo que tenga que funcionar en el primer toque debe funcionar
  sin JS**. Por eso:
  - los CTA de WhatsApp son `<a href="https://wa.me/…">` (componente `BotonWhatsApp`);
  - el menú móvil es un `<details>` nativo (`Header.jsx`);
  - las FAQ son `<details>`;
  - el video del hero lo arranca un `<script>` inline, no React (`HeroVideo.jsx`);
  - los campos del formulario de contacto los activa un `<script>` inline (§7).
- El selector de país y los filtros del portafolio sí necesitan React. El primer toque
  los hidrata.
- El país detectado (RU por idioma o zona horaria) se aplica al hidratar. El HTML
  siempre sale con precios de Perú.

## 2. Nada de efectos caros de rasterizar

Sin GPU, el navegador rasteriza por software. Ya probado y descartado:

- `backdrop-filter` (el desenfoque del header costaba ~150 ms por cuadro).
- `box-shadow` con desenfoque grande (> 12 px) en elementos grandes.
- Animaciones que no sean `transform`/`opacity`.

Degradados (`radial-gradient`, `linear-gradient`) sí están permitidos; medidos, no
cambian el resultado.

## 3. CSS inline, una sola hoja

- `src/styles/site.css` se inyecta **inline** en cada HTML (`src/root.jsx`, `?inline`).
  Cero peticiones que bloqueen el pintado.
- El string del CSS **no** va en el bundle del cliente (`CON_ESTILOS`). React conserva
  el `<style>` que ya está en el HTML al hidratar.
- `content-visibility: auto` en `.section`, `.cta` y `.ftr`. Sin esto, el layout inicial
  de la home (779 objetos) tardaba 71 ms y empujaba el TBT a 200 ms.
- También en cada `.proy` (tarjeta de proyecto): `/portafolio` tiene 14 tarjetas en una
  sola sección visible y calcularlas todas subía el LCP.
- No uses `text-wrap: balance`: obliga a varias pasadas de layout.

## 4. Fuente

- Inter variable reducida a ASCII + Latin-1 + la puntuación usada y pesos 400–850:
  `src/assets/inter-zp.woff2` (26 KB, antes 48 KB), autoalojada y con `preload`.
  Se regenera con `npm run fuente` (`scripts/subconjunto-fuente.py`). Bajó el LCP de
  la home de 1,6 a 1,4 s. Si añades un peso fuera de 400–850 o un carácter nuevo
  (otro idioma, símbolos), amplía el script y regenera.
- No quites la fuente web "para ganar velocidad": medido, con fuentes del sistema el
  TBT de la home sube a 110–190 ms (la búsqueda de fuentes del sistema es más cara).
- `font-display: optional` + respaldo "Inter Fallback" (Arial con métricas de Inter).
  Con `swap` hubo CLS de 0,089 en `/planes`.

## 5. Imágenes y video

- LCP de la home = póster del primer video (`<picture>`, WebP de 7 KB en móvil y 24 KB
  en desktop, `fetchpriority="high"` + preload en `links()` de `Home.jsx`).
- El `<video>` no tiene `src` en el HTML. El script lo carga tras el primer LCP + `load`
  + tiempo libre (respaldo: 4 s). Móvil usa el recorte vertical `-m.mp4` (70–280 KB).
  Clips: 7 s de cada video de Pexels, con retoque (ver `CLIPS` en
  `scripts/optimizar-medios.mjs`). Para cambiar un video: descargarlo en
  `assets-src/videos/pexels/`, añadirlo a `CLIPS` y correr `npm run medios` con FFMPEG.
  No hay video con "reducir movimiento", ahorro de datos ni 2G.
- Todas las imágenes llevan `width`/`height` y `srcset` 480/800. Se generan con
  `npm run medios` desde `assets-src/` (ver `scripts/optimizar-medios.mjs`).
- Encabezados internos (`PageHero`): la foto o el equipo de la derecha suele ser el LCP.
  Va sin `lazy`, con `fetchPriority="high"` y con preload en `links()` de la página
  (`/planes` y `/mobile`: `f-*-600/960.webp`, 11–21 KB).
- Imágenes visibles sin scroll: **nunca** `loading="lazy"`. En `/portafolio` la primera
  captura es el LCP en móvil; con `lazy` el navegador la pedía tarde y el LCP subía a
  1,9 s (rendimiento 99). `TarjetaProyecto` acepta `arriba` (carga inmediata) y `lcp`
  (además `fetchpriority="high"`).

## 6. Terceros

- GA4 (`G-0L8037Y84K`) se descarga con la primera interacción (`src/root.jsx`). Los
  eventos `generate_lead` se encolan en `dataLayer` hasta entonces.
- No añadas scripts de terceros en el `<head>` (chat, píxeles, mapas). Si hacen falta,
  cárgalos con el mismo patrón de primera interacción.

## 7. Formularios: campos diferidos

- Al cargar una página con campos de texto o botones de envío, Chrome los analiza
  (autocompletado) en una tarea interna de ~100 ms que no aparece en la traza. En
  `/contacto` eso daba TBT ~200 ms y rendimiento 96–97. Los radios no cuestan.
- `components/CamposDiferidos.jsx`: el HTML trae una vista idéntica (`.falso`) y los
  campos reales en un `<template>`. Un script inline los cambia en el primer
  `pointerdown`/`touchstart`/`keydown`/`focusin`/`scroll`/`mousemove`, antes del clic,
  así que el primer toque ya cae en el campo real. Resultado: 100 en `/contacto`.
- Cualquier formulario nuevo con campos de texto debe usar `CamposDiferidos`.

## 8. `dangerouslySetInnerHTML` siempre con objeto estable

React 19 vuelve a escribir `innerHTML` cada vez que un re-render le pasa un objeto
`{__html}` nuevo, aunque el texto sea idéntico. Por eso todos están fijos (constante de
módulo o `useMemo`): con un objeto inline, cambiar de país borraba los campos ya
activados del formulario, y el `<style>` (vacío en el cliente) podría borrar el CSS.
Nunca escribas `dangerouslySetInnerHTML={{ __html: … }}` inline.

## Cómo medir igual que PageSpeed

```bash
npm run build
npm run servir                        # servidor estático sobre build/client (puerto 8788)
npx lighthouse http://127.0.0.1:8788/ --form-factor=mobile --chrome-flags="--headless=new"
```

No midas contra `wrangler dev` (`npm run preview`): workerd compite por la CPU y la home
bajó a 88–95 en móvil con el mismo build que da 99–100 en el servidor estático.

Mira `environment.benchmarkIndex` en el JSON. En la laptop del dueño lo normal es
~1400; por debajo de ~1100 descarta la corrida (batería baja: Windows frena la CPU
4–5 veces; Opera, Discord o un antivirus usando CPU). Mide con el cargador conectado.

En desktop, el primer cuadro espera a que el proceso gráfico de Chrome sin GPU termine
de compilar sus shaders (tareas de ~170 ms). Si termina después del FCP aparece una
tarea de 150–350 ms y la home cae a 89–95. Pasa con o sin video y con o sin el botón de
WhatsApp, así que no es la página: repite la corrida.

Usa Chrome completo con `--headless=new`. El "chrome-headless-shell" antiguo retrasa
el primer pintado ~2 s por su cuenta y da números falsos.

Haz una corrida de calentamiento y descártala: la primera medición tras un rato
inactivo sale con todo 3 veces más lento (arranque en frío de Chrome y del antivirus)
y puede marcar TBT de 2 s en una página que da 10 ms. Si un resultado es raro, repítelo
antes de cambiar código.
