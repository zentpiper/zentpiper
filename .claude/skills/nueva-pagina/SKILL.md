---
name: nueva-pagina
description: Crear, renombrar o eliminar una ruta/página del sitio Zentpiper (React Router 7 modo framework con prerender) sin dejar enlaces, sitemap, schema o SEO desincronizados. Úsala siempre que se toque src/routes.js o se cree un archivo en src/pages/.
---

# Nueva página / cambio de ruta

## 1. Crear la página

`src/pages/<Nombre>.jsx`. **No** crees CSS por página: los estilos van en
`src/styles/site.css`, reutilizando las clases existentes (`page-hero`, `section`,
`section--alt`, `grid-3`, `card`, `planes`, `faq`, `cta`…).

```jsx
import Seccion from "../components/Seccion";
import BotonWhatsApp from "../components/BotonWhatsApp";
import CtaFinal from "../components/CtaFinal";
import { seo } from "../lib/seo";
import { migas } from "../lib/schema";

export const meta = () =>
  seo({
    titulo: "<Beneficio o keyword + precio si aplica> | Zentpiper",   // ≤ 60 caracteres
    descripcion: "<140–160 caracteres, beneficio + CTA>",
    ruta: "/<ruta>",
    jsonLd: [migas({ nombre: "<Nombre corto>", ruta: "/<ruta>" })],
  });

export default function <Nombre>() {
  return (
    <>
      <section className="page-hero">
        <div className="container narrow center">
          <p className="eyebrow">…</p>
          <h1 className="h1">…</h1>          {/* exactamente un h1 */}
          <p className="lead">…</p>
          <div className="acciones center">
            <BotonWhatsApp className="btn btn--gold btn--lg" origen="<ruta>-hero">Cotizar gratis</BotonWhatsApp>
          </div>
        </div>
      </section>
      <Seccion id="…" eyebrow="…" titulo="…">…</Seccion>
      <CtaFinal origen="<ruta>-cta" />
    </>
  );
}
```

Reglas:
- Contenido repetible (cards, FAQ) en `src/content/`, no copiado en JSX.
- Precios con `usePais().precio(...)`. Contacto con `CONTACTO`.
- Lo que deba funcionar al primer toque debe funcionar **sin JS** (enlaces, `<details>`):
  React se hidrata recién con la primera interacción (`docs/RENDIMIENTO.md` §1).
- Jerarquía de encabezados sin saltos (h1 → h2 → h3). Si una sección no tiene título
  visible, usa `<h2 className="sr-only">`.

## 2. Registrar la ruta

- [ ] `src/routes.js`: `route("<ruta>", "pages/<Nombre>.jsx")` antes del `"*"`.
- [ ] `react-router.config.js`: añadir a `RUTAS_PUBLICAS` (se prerenderiza y entra al
      sitemap). Páginas privadas (como `/confirmacion`) van solo en `prerender` y con
      `noindex: true` en `seo()`.
- [ ] `src/components/navegacion.js` si va en el menú (sirve a desktop y móvil).
- [ ] `src/components/Footer.jsx` si corresponde.
- [ ] `public/robots.txt` solo si hay que bloquearla.
- [ ] `docs/ESQUEMA.md` §4.

## 3. Renombrar o eliminar

- Renombrar: añade `/<vieja> /<nueva> 301` en `public/_redirects` y busca referencias:
  `grep -rn '"/<vieja>' src public`.
- Eliminar: borra la página, quítala de `routes.js`, `RUTAS_PUBLICAS`, nav y footer, y
  añade un 301 si la URL estuvo indexada.

## 4. Verificar

`npm run build` (debe listar "Prerender (html): /<ruta>"), `npm run lint`, y la skill
`qa-visual` en la ruta nueva (incluye Lighthouse móvil = 100 en las cuatro categorías).
