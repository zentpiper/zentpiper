// Pasos después de `react-router build`:
// 1. 404.html real (Cloudflare lo sirve con status 404 para rutas desconocidas).
// 2. sitemap.xml generado desde RUTAS_PUBLICAS con la fecha del build.
// 3. Hidratación diferida (ver diferirHidratacion).
import { existsSync, readFileSync, readdirSync, renameSync, rmSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { RUTAS_PUBLICAS } from "../react-router.config.js";

const OUT = "build/client";
const SITIO = "https://zentpiper.com";

renameSync(`${OUT}/404/index.html`, `${OUT}/404.html`);
rmSync(`${OUT}/404`, { recursive: true });
if (existsSync(`${OUT}/__spa-fallback.html`)) rmSync(`${OUT}/__spa-fallback.html`);

function htmls(dir) {
  return readdirSync(dir).flatMap((f) => {
    const ruta = join(dir, f);
    if (statSync(ruta).isDirectory()) return f === "assets" || f === "media" ? [] : htmls(ruta);
    return f.endsWith(".html") ? [ruta] : [];
  });
}
// Hidratación diferida. El HTML prerenderizado ya trae todo el contenido y los CTA
// son enlaces normales, así que React solo hace falta para interactuar. En vez de
// bajar ~110 KB de JS durante la carga (lo que retrasa el LCP y suma TBT), el JS se
// pide con la primera interacción o, si no la hay, unos segundos después de `load`.
const EVENTOS = ["pointerdown", "keydown", "touchstart", "scroll", "mousemove", "focusin"];
const ESPERA_MS = 6000;

function diferirHidratacion(html, archivo) {
  const preloads = [...html.matchAll(/<link rel="modulepreload" href="([^"]+)"\/?>/g)].map((m) => m[1]);
  const arranque = html.match(/<script type="module" async="">([\s\S]*?)<\/script>/);
  if (!arranque) throw new Error(`postbuild: no encontré el script de arranque en ${archivo}`);

  const cuerpo = arranque[1];
  const imports = [...cuerpo.matchAll(/import (?:\* as (\w+) from )?"([^"]+)";/g)];
  const modulos = cuerpo.match(/window\.__reactRouterRouteModules = (\{[\s\S]*?\});/)[1];
  const entry = cuerpo.match(/import\("([^"]+)"\)/)[1];
  const nombres = imports.map((m, i) => m[1] ?? `_${i}`);

  const cargador = `{let e=${JSON.stringify(EVENTOS)},o={passive:!0,capture:!0},h=0;function go(){if(h)return;h=1;e.forEach(n=>removeEventListener(n,go,o));for(const u of ${JSON.stringify(preloads)}){const l=document.createElement("link");l.rel="modulepreload";l.href=u;document.head.append(l)}Promise.all([${imports.map((m) => `import("${m[2]}")`).join(",")}]).then(([${nombres.join(",")}])=>{window.__reactRouterRouteModules=${modulos};return import("${entry}")})}e.forEach(n=>addEventListener(n,go,o));addEventListener("load",()=>setTimeout(go,${ESPERA_MS}),{once:!0})}`;

  return html
    .replace(/<link rel="modulepreload" href="[^"]+"\/?>/g, "")
    .replace(arranque[0], `<script type="module">${cargador}</script>`);
}

for (const archivo of htmls(OUT)) {
  writeFileSync(archivo, diferirHidratacion(readFileSync(archivo, "utf8"), archivo));
}

const hoy = new Date().toISOString().slice(0, 10);
const urls = RUTAS_PUBLICAS.map(
  (ruta) => `  <url><loc>${SITIO}${ruta}</loc><lastmod>${hoy}</lastmod><priority>${ruta === "/" ? "1.0" : "0.8"}</priority></url>`,
).join("\n");
writeFileSync(
  `${OUT}/sitemap.xml`,
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
);
console.log(`postbuild: 404.html + sitemap.xml (${RUTAS_PUBLICAS.length} URLs)`);
