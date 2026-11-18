---
name: deploy
description: Publicar zentpiper.com en Vercel (producción actual) o Cloudflare Workers y comprobar dominio, redirecciones y caché. Úsala solo cuando el dueño pida explícitamente desplegar o configurar el hosting.
disable-model-invocation: true
---

# Deploy (Vercel o Cloudflare)

El sitio es 100 % estático: `npm run build` deja todo en `build/client`. No hay API ni
secretos; los contactos van por WhatsApp (`wa.me`).

## Vercel (producción actual)

- Proyecto `zentpiper` del equipo "Zentpiper's projects" (cuenta del dueño).
- **Cada push a `main` despliega solo**; cada PR genera una vista previa.
- `vercel.json` define build (`npm run build`), salida (`build/client`), URLs sin
  barra final, redirecciones y cabeceras. `framework: null` a propósito.
- Dominios: `zentpiper.com` en Production; `www.zentpiper.com` → 301 a `zentpiper.com`.

## Cloudflare (alternativa)

Worker `zentpiper` (`wrangler.jsonc`), solo assets:
- `build/client` con `html_handling: drop-trailing-slash` y `not_found_handling: 404-page`;
- `public/_headers` y `public/_redirects` se publican con los assets (mismas reglas
  que `vercel.json`: si cambias una, cambia la otra).

```bash
npm run deploy           # = npm run build && wrangler deploy
```

Requiere `npx wrangler login` en la cuenta del `account_id` de `wrangler.jsonc`.

## Antes de desplegar

1. `git status` limpio y `git pull --ff-only` (hay otro colaborador en `main`).
2. `npm run build` y `npm run lint` sin errores.
3. Skill `qa-visual` (incluye Lighthouse 100 en móvil).
4. Pregunta al dueño: "¿Publico en producción?" y espera un sí explícito. En Vercel,
   publicar = merge o push a `main`.

## Después

```bash
curl -sI https://zentpiper.com/ | grep -iE "^HTTP|^location"        # 200
curl -sI https://www.zentpiper.com/ | grep -iE "^HTTP|^location"    # 301 → zentpiper.com
```

- `/planes` → 200; `/planes/` → 308 (Vercel) o 307 (Cloudflare); `/proyecto` →
  `/sobre-nosotros` permanente; `/no-existe` → 404.
- `https://zentpiper.com/sitemap.xml` con fecha de hoy.
- PageSpeed Insights de `/` y `/planes` en móvil.
