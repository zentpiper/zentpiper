// Datos estructurados (schema.org). Zentpiper es la entidad principal: ningún
// tercero aparece aquí para que las búsquedas de marca apunten solo a este sitio.
import { CONTACTO, PAISES, desde, hasta } from "../data/precios";
import { SITIO } from "./seo";

const EMPRESA_ID = `${SITIO}/#empresa`;

export const schemaSitio = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": EMPRESA_ID,
      name: "Zentpiper",
      alternateName: "Zentpiper Software",
      url: `${SITIO}/`,
      logo: `${SITIO}/icon-192.png`,
      image: `${SITIO}/og.jpg`,
      description: "Agencia de diseño web, tiendas online y apps móviles en Lima, Perú. Clientes en Perú y Rusia.",
      telephone: CONTACTO.telefono,
      email: CONTACTO.email,
      priceRange: `${desde("web")} – ${hasta("apps")}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Santiago de Surco",
        addressRegion: "Lima",
        addressCountry: "PE",
      },
      areaServed: [
        { "@type": "Country", name: "Perú" },
        { "@type": "Country", name: "Rusia" },
      ],
      sameAs: Object.values(CONTACTO.redes),
    },
    {
      "@type": "WebSite",
      "@id": `${SITIO}/#web`,
      url: `${SITIO}/`,
      name: "Zentpiper",
      inLanguage: "es",
      publisher: { "@id": EMPRESA_ID },
    },
  ],
};

export function migas(...items) {
  const lista = [{ nombre: "Inicio", ruta: "/" }, ...items];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: lista.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.nombre,
      item: SITIO + item.ruta,
    })),
  };
}

// Catálogo de planes con precios en soles (mercado principal).
export function catalogo(nombre, grupo, planes) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: nombre,
    provider: { "@id": EMPRESA_ID },
    areaServed: ["PE", "RU"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: nombre,
      itemListElement: planes.map((plan) => ({
        "@type": "Offer",
        name: plan.nombre,
        description: plan.para,
        price: PAISES.PE[grupo][plan.id].precio,
        priceCurrency: "PEN",
      })),
    },
  };
}
