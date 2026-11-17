---
name: copy-conversion
description: Escribir o reescribir textos de venta de zentpiper.com (hero, titulares, planes, CTA, FAQ, meta titles) con criterio de alta conversión y sin inventar promesas. Úsala cuando el dueño pida "más conversión", "menos texto", un titular, una sección nueva o un cambio de oferta.
---

# Copy de alta conversión

El dueño quiere **vender ya**: menos texto, más conversión. Cada bloque responde una
objeción y termina en WhatsApp.

## Estructura de una página que vende

1. **Hero**: resultado concreto + precio de entrada + plazo, sobre video real. Un CTA
   principal (WhatsApp) y uno secundario (ver precios). Caras del equipo con "te
   atienden los que la construyen".
2. **Clientes**: una fila sobria de nombres reales.
3. **Precio visible** pronto: tarjetas con plan destacado, pago único, mensualidad tras
   los 3 meses gratis, 3 puntos y la ficha técnica plegada.
4. **Prueba**: trabajos con un resultado medible (si lo hay) y una cita textual.
5. **Objeciones**: 4 preguntas rápidas con respuestas de 1–2 líneas.
6. **Cierre**: "¿Hablamos de tu negocio?" + WhatsApp.

## Tono: profesional, humano, sin cara de IA

- Nada de "transforma", "potencia", "impulsa", "solución integral", "llevamos tu negocio
  al siguiente nivel" ni frases de folleto.
- Primera persona del plural y cosas concretas: nombres, ciudades, cifras, plazos.
- Titulares en minúscula normal, sin eslóganes en mayúsculas ni rótulos `// …`.
- Si un dato técnico no ayuda a decidir la compra, va en la ficha técnica plegada.

## Reglas de redacción

- Titulares ≤ 8 palabras, en positivo y con el beneficio ("Webs que te traen clientes por WhatsApp").
- Párrafos de 1–2 frases. Tarjetas con 3 puntos como máximo, empezando con el beneficio.
- Habla de "tú" y del negocio del cliente, no de nosotros.
- CTA con verbo + resultado: "Cotizar por WhatsApp", "Lo quiero" (con `aria-label` del plan).
  Evita "Más información", "Click aquí" o "Ver más" (Lighthouse los marca y no venden).
- Precio siempre desde `usePais().precio(...)`, nunca escrito a mano.
- Mensaje prellenado de WhatsApp: saludo + qué quiere + plan y precio. Ejemplo:
  "Hola Zentpiper, quiero la página web Negocio (S/ 900). ¿Me ayudan a empezar?".

## Lo que NO se puede inventar

Usa solo hechos que ya estén en `src/content/` o que el dueño confirme por escrito:

- Plazos: web Esencial 3–5 días hábiles; planes más grandes 7–14 días hábiles; apps
  2–4 / 4–6 / 6–10 semanas.
- Cifras: +50 proyectos (contando los de Cernext), 95–100 en PageSpeed, 2 países.
- Testimonios: textuales, sin parafrasear ni acortar dentro de las comillas.
- Nada de "garantizado", "en minutos", "respondemos hoy" o "número 1" sin confirmación.

## SEO del copy

- `<title>`: keyword + precio o beneficio + "| Zentpiper" (≤ 60 caracteres).
- `description`: 140–160 caracteres con beneficio y CTA.
- Un solo `<h1>` con la keyword principal de la página.
- Mercados: solo Perú y Rusia.

## Antes de entregar

- [ ] Cada sección tiene un motivo para seguir bajando o un CTA.
- [ ] Ninguna afirmación nueva sin respaldo (ver lista de arriba).
- [ ] Textos repetibles en `src/content/`, no en el JSX.
- [ ] `qa-visual`: nada se desborda en 375 px y Lighthouse sigue en 100.
