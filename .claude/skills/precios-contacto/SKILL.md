---
name: precios-contacto
description: Cambiar precios, mensualidades, planes web/apps, países/monedas, teléfono, WhatsApp o email de Zentpiper de forma coherente en todo el sitio (datos, contenido de planes, JSON-LD, meta y textos).
---

# Precios y datos de contacto

## Fuentes

| Qué | Dónde |
|---|---|
| Precio, mensualidad, moneda, pasarelas por país | `src/data/precios.js` → `PAISES.{PE,RU}.web/apps` |
| Meses gratis de mantenimiento | `MESES_GRATIS` en `src/data/precios.js` |
| Teléfono, WhatsApp, email, redes, ciudad | `CONTACTO` en `src/data/precios.js` |
| Nombre, "para quién" e "incluye" de cada plan | `src/content/planes.js` (misma clave que en `PAISES`) |
| Rango de precios del schema | `priceRange` en `src/lib/schema.js` |

`whatsapp` va sin `+` ni espacios (`51945935080`); `telefono` va formateado.
Número principal: +51 945 935 080 (`telefono`/`whatsapp`); secundario: +51 988 490 319 (`telefono2`, sin uso en la web).

## Pasos

1. Edita `precios.js` en **todos** los países (hoy PE y RU). Si el dueño da solo el
   precio en soles, pregunta el de rublos; si pide que lo decidas, convierte a
   ~24 ₽ por S/ y redondea a ...900 (11 900, 21 900…). Anótalo en `docs/ESQUEMA.md` §5.
2. Busca precios o datos escritos a mano fuera de `precios.js` y alinéalos:
   ```bash
   grep -rnE "S/ ?[0-9]|[0-9] ?₽|988 ?490|945 ?935|51988490319|@zentpiper|desde S/" src public scripts
   ```
   Sitios conocidos: títulos y descripciones en `export const meta` (`Home.jsx`,
   `Planes.jsx`, `Mobile.jsx`, `Contacto.jsx`), `priceRange` en `lib/schema.js` y el
   texto de `public/og.jpg` (se regenera con `npm run medios`).
3. Plan nuevo: añade la clave en cada país de `PAISES` **y** el objeto en
   `content/planes.js`. `TarjetasPlanes` y el schema `catalogo()` lo toman solos.
4. País nuevo: entrada en `PAISES` (moneda, `separador`, `simboloDespues`, `pasarelas`,
   `web`, `apps`). El selector del header lo muestra automáticamente. Revisa
   `detectarPais()` en `contexts/PaisProvider.jsx` y `areaServed` en `lib/schema.js`.
5. Verifica: `npm run build` y en el navegador cambia PE ↔ RU en `/`, `/planes`, `/mobile`.
   Revisa también el texto que lleva el enlace de WhatsApp de cada plan.
6. Actualiza las tablas de `docs/ESQUEMA.md` §5.
