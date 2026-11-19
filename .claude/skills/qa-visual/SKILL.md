---
name: qa-visual
description: Revisión visual, funcional y de Lighthouse del sitio Zentpiper (desktop y móvil) después de cualquier cambio de UI, antes de darlo por terminado. Incluye cómo medir como PageSpeed Insights y los checks de hidratación diferida.
---

# QA visual + Lighthouse

## Preparar

1. `npm run build`.
2. Sirve `build/client` con cualquier servidor estático que haga `/ruta` →
   `ruta/index.html` y 404 → `404.html` (o `npx wrangler dev`, que es igual a producción).
   En Windows, `wrangler dev` bloquea `build/client`: detenlo antes de volver a compilar.
3. Abre la ruta en el navegador integrado.

## Viewports

Desktop 1440×900 · tablet 768×1024 · móvil 375×812 y 360×760. Vuelve a `desktop` al
terminar.

## Checklist por página tocada

- [ ] Sin scroll horizontal: `document.documentElement.scrollWidth <= innerWidth`.
- [ ] Un solo `<h1>` y encabezados sin saltos. `document.title` y canonical correctos.
- [ ] **Antes de interactuar** (React aún no cargó): los CTA de WhatsApp abren `wa.me`,
      el menú móvil (`<details>`) abre y las FAQ se despliegan.
- [ ] **Después** de `dispatchEvent(new Event("pointerdown"))`: existe
      `window.__reactRouterRouteModules`, el selector PE ↔ RU cambia precios y el texto
      del enlace de WhatsApp de cada plan, los filtros del portafolio funcionan.
- [ ] Consola sin errores (en especial de hidratación).
- [ ] El botón flotante de WhatsApp no tapa CTAs, precios ni campos. **Revísalo con todo
      abierto y al final de la página** (FAQ, fichas y "¿Cómo está hecha esta web?"
      desplegadas, scroll hasta abajo): lo que tape ahí ya no se puede destapar.
- [ ] Mira la página como un cliente, no solo los números: textos que se pisan o invaden
      la columna de al lado, precios desalineados entre tarjetas, una palabra sola en la
      última línea de un titular, bloques que usan medio ancho en móvil.
- [ ] Prueba también con RU (precios más largos) en `/`, `/planes` y `/mobile`.
- [ ] Home: el póster del hero se ve de inmediato y el video arranca a los pocos segundos.

Capturas de página completa: `content-visibility: auto` deja sin pintar lo que está
fuera de pantalla y las imágenes `lazy` no cargan. Para revisar, inyecta
`*{content-visibility:visible!important}` y pasa las imágenes a `loading="eager"` (solo
en la captura, nunca en el código).

## Formulario de contacto (sin enviar mensajes reales)

Antes de interactuar, el HTML debe traer la vista previa (`.falso`) y ningún
`<input>` de texto ni `<button type="submit">` fuera del `<template>`. Tras el primer
`pointerdown`, los campos reales deben estar en su lugar sin mover nada.

En la consola, intercepta antes de enviar:
`window.open = (u) => console.log(u)`.
Comprueba que el mensaje de WhatsApp lleva nombre, servicio y plan, que no sale ningún
`fetch` con datos del cliente y que termina en `/confirmacion`.

Libro de Reclamaciones: mismo método. Llena los campos obligatorios, envía y comprueba que
el mensaje de WhatsApp lleva la hoja completa con su número `LR-…` y que la constancia
muestra imprimir, copia por correo y WhatsApp.

## Lighthouse (objetivo: 100 · 100 · 100 · 100)

Mide como PageSpeed: Chrome completo con `--headless=new`, móvil y desktop.

```bash
npm run build && npm run servir     # estático en 8788; no midas contra wrangler dev
npx lighthouse http://127.0.0.1:8788/<ruta> --form-factor=mobile --chrome-flags="--headless=new" --output=json --output-path=lh.json
npx lighthouse http://127.0.0.1:8788/<ruta> --preset=desktop --chrome-flags="--headless=new" --output=json --output-path=lh-d.json
```

- Descarta corridas con `environment.benchmarkIndex` < ~1100 (batería baja o CPU
  ocupada). Mide con el cargador conectado.
- Desktop: una tarea de 150–350 ms justo en el primer pintado, sin hijos en el hilo
  principal, es el proceso gráfico de Chrome compilando shaders, no la página. Repite.

- No uses `chrome-headless-shell`: retrasa solo el primer pintado ~2 s.
- No navegues en el mismo equipo mientras mide: el TBT sube por la CPU compartida.
- Descarta la primera corrida tras un rato inactivo (arranque en frío: puede dar TBT
  de 2 s en una página que da 10 ms). Repite cualquier resultado raro.
- Si baja de 100, revisa en este orden: `network-requests` (¿algún JS o video antes del
  LCP?), `main-thread-tasks` (tareas > 50 ms tras el FCP), `layout-shifts` y
  `largest-contentful-paint-element`. Contrasta con `docs/RENDIMIENTO.md`.

## Reporte

Lista lo revisado por viewport y la puntuación de Lighthouse por página. Captura solo
lo que falló.
