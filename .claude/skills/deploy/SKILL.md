---
name: deploy
description: Publicar zentpiper.com en Vercel o Cloudflare Workers, probar la API en local y gestionar los secretos de Telegram. Úsala solo cuando el dueño pida explícitamente desplegar o configurar el entorno.
disable-model-invocation: true
---

# Deploy (Cloudflare o Vercel)

El repo funciona en las dos plataformas. Antes de desplegar, confirma con el dueño
cuál usa y que la cuenta es suya (ver `docs/ESQUEMA.md` §11).

## Vercel

- Importar el repo; `vercel.json` ya define build (`npm run build`), salida
  (`build/client`), redirecciones y cabeceras. `framework: null` a propósito.
- Variables de entorno: `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`.
- Dominios: `zentpiper.com` como principal; `www.zentpiper.com` → 301 a `zentpiper.com`.

## Cloudflare

Producción = Worker `zentpiper` (`wrangler.jsonc`):
- static assets desde `build/client` (HTML prerenderizado), `html_handling:
  drop-trailing-slash`, `not_found_handling: 404-page`;
- `run_worker_first: ["/api/*"]` → `worker/index.js` atiende `POST /api/send-telegram`;
- `public/_headers` y `public/_redirects` se publican con los assets.

## Antes de desplegar

1. `git status` limpio y `git pull --ff-only` (hay otro colaborador en `main`).
2. `npm run build` y `npm run lint` sin errores.
3. Skill `qa-visual` (incluye Lighthouse 100 en móvil).
4. Pregunta al dueño: "¿Despliego a producción?" y espera un sí explícito.

## Probar en local con la API

```bash
npm run preview          # build + wrangler dev
```

Necesita `.dev.vars` (no versionado):

```
TELEGRAM_BOT_TOKEN=...
TELEGRAM_CHAT_ID=...
```

Pide los valores al dueño. Nunca los escribas en el chat ni en archivos versionados.

## Desplegar

```bash
npm run deploy           # = npm run build && wrangler deploy
```

Requiere `npx wrangler login` en la cuenta del `account_id` de `wrangler.jsonc`.
Si el repo está conectado a Workers Builds, el comando de build debe ser
`npm run build` y el de deploy `npx wrangler deploy`.

## Secretos (una vez o al rotarlos)

```bash
npx wrangler secret put TELEGRAM_BOT_TOKEN
npx wrangler secret put TELEGRAM_CHAT_ID
```

## Después

- `curl -sI https://zentpiper.com/planes` → 200; `/planes/` → 307; `/proyecto` → 301;
  `/no-existe` → 404.
- `https://zentpiper.com/sitemap.xml` con fecha de hoy.
- PageSpeed Insights de `/` y `/planes` en móvil.
- Si el dueño lo autoriza, envía el formulario de prueba y confirma que llega a Telegram.
- Logs: `npx wrangler tail`.
