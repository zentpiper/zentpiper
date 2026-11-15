---
name: auditoria-seo
description: Auditar el SEO técnico y la coherencia de marca de zentpiper.com — meta por ruta, JSON-LD, sitemap, robots, canonical, enlaces a terceros (nofollow) y afirmaciones de marketing. Úsala antes de publicar cambios de contenido o cuando se pida revisar SEO/posicionamiento o por qué Zentpiper no sale primero en Google.
---

# Auditoría SEO

## Contexto

- Cada ruta es HTML prerenderizado: lo que ve Google está en `build/client/<ruta>/index.html`.
  Audita **ese HTML**, no el JSX.
- Objetivo de marca: que una búsqueda de "Zentpiper" devuelva primero zentpiper.com.
  Por eso Zentpiper es la única entidad en schema y meta. Los enlaces a terceros que
  compiten por el mismo público (Barclay Leach, Cernext) van con `nofollow`.

## 1. Inventario

```bash
npm run build
ls build/client/*/index.html build/client/index.html build/client/404.html
cat build/client/sitemap.xml public/robots.txt public/_redirects
```

- Cada ruta de `RUTAS_PUBLICAS` tiene HTML y está en el sitemap.
- `/confirmacion` y el 404 tienen `noindex` y no están en el sitemap.
- Toda URL vieja indexada tiene un 301 en `_redirects`.

## 2. Meta por ruta

Para cada HTML: `<title>` único ≤ 60 caracteres, `description` 140–160, canonical
absoluto igual a la URL sin barra final, `og:image` = `/og.jpg` (1200×630), un solo
`<h1>`.

```bash
for f in build/client/index.html build/client/*/index.html; do echo "== $f"; grep -o '<title>[^<]*</title>' "$f"; grep -o '<meta name="description" content="[^"]*"' "$f"; grep -o '<link rel="canonical"[^>]*>' "$f"; grep -c '<h1' "$f"; done
```

## 3. Datos estructurados

- `ProfessionalService` (root): nombre, teléfono y email = `CONTACTO`; `areaServed` =
  Perú y Rusia; `sameAs` = redes propias.
- `Service` + `OfferCatalog`: precios = `PAISES.PE` en PEN.
- `BreadcrumbList` en páginas internas.
- Valida pegando el HTML en https://validator.schema.org y en la prueba de resultados
  enriquecidos de Google.

## 4. Enlaces externos

```bash
grep -rhoE '<a [^>]*href="https?://[^"]+"[^>]*>' build/client --include=*.html | sort -u
```

- Terceros que no son clientes (agencias, perfiles personales): `rel` con `nofollow`.
- Clientes del portafolio y redes propias: `noopener` sin `nofollow`.

## 5. Coherencia de mensajes

Hero, datos, footer, schema y selector de país deben decir lo mismo: Perú y Rusia,
+50 proyectos, el mismo teléfono y los mismos precios. Cada afirmación verificable
("95–100 en PageSpeed", plazos) debe estar respaldada (skill `copy-conversion`).

## 6. Fuera del código (recordar al dueño)

- Google Search Console: propiedad verificada, `sitemap.xml` enviado, inspección de URL
  de `/` y `/planes`.
- Perfil de Empresa en Google con el mismo nombre, teléfono y web.
- Redes sociales con enlace a zentpiper.com.

## Salida

Tabla `Problema | Dónde | Impacto (alto/medio/bajo) | Arreglo`, ordenada por impacto.
No cambies nada sin confirmarlo con el dueño.
