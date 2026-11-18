# Zentpiper

Web comercial de [zentpiper.com](https://zentpiper.com): diseño web, tiendas online y
apps para negocios en Perú y Rusia.

- **Stack:** React 19 + React Router 7 (prerender estático) · Vite · Cloudflare Workers
- **Mapa del sitio:** [`docs/ESQUEMA.md`](docs/ESQUEMA.md)
- **Reglas de rendimiento (Lighthouse 100):** [`docs/RENDIMIENTO.md`](docs/RENDIMIENTO.md)
- **Guía para agentes de código:** [`AGENTS.md`](AGENTS.md)

## Uso

```bash
npm install
npm run dev       # desarrollo en http://localhost:5173
npm run build     # HTML estático en build/client
npm run preview   # build + Worker local con /api (requiere .dev.vars)
npm run deploy    # publica en Cloudflare
```

Precios y datos de contacto: `src/data/precios.js`. Textos: `src/content/`.
