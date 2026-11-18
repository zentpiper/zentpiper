// Meta por ruta para el export `meta` de React Router (se prerenderiza en el HTML).
export const SITIO = "https://zentpiper.com";

export function seo({ titulo, descripcion, ruta, imagen = "/og.jpg", noindex = false, jsonLd = [] }) {
  const url = SITIO + ruta;
  return [
    { title: titulo },
    { name: "description", content: descripcion },
    { name: "robots", content: noindex ? "noindex, follow" : "index, follow, max-image-preview:large" },
    ...(noindex ? [] : [{ tagName: "link", rel: "canonical", href: url }]),
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: "Zentpiper" },
    { property: "og:locale", content: "es_PE" },
    { property: "og:title", content: titulo },
    { property: "og:description", content: descripcion },
    { property: "og:url", content: url },
    { property: "og:image", content: SITIO + imagen },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: titulo },
    { name: "twitter:description", content: descripcion },
    { name: "twitter:image", content: SITIO + imagen },
    ...jsonLd.map((data) => ({ "script:ld+json": data })),
  ];
}
