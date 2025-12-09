import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Componente SEO
 * Actualiza dinámicamente las etiquetas meta, Open Graph y Twitter Cards.
 */
const SEO = ({
  title = "Zentpiper - Sitios Web Profesionales",
  description = "Creamos sitios web profesionales, rápidos y optimizados para SEO. Diseño responsive, hosting incluido, dominio gratis.",
  keywords = "diseño web, desarrollo web, SEO, hosting, dominio, zentpiper, páginas web, aplicaciones móviles",
  canonical,
  image = "https://zentpiper.com/logo-og.png",
  type = "website",
}) => {
  const location = useLocation();

  useEffect(() => {
    const currentUrl = canonical || `https://zentpiper.com${location.pathname}`;

    // Helper para actualizar o crear meta tags
    const setMetaTag = (attrName, attrValue, content) => {
      let element = document.querySelector(`[${attrName}="${attrValue}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Title
    document.title = title;

    // Basic Meta Tags
    setMetaTag("name", "description", description);
    setMetaTag("name", "keywords", keywords);
    setMetaTag("name", "robots", "index, follow");
    setMetaTag("name", "author", "Zentpiper");

    // Canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", currentUrl);

    // Open Graph
    setMetaTag("property", "og:title", title);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:type", type);
    setMetaTag("property", "og:url", currentUrl);
    setMetaTag("property", "og:image", image);
    setMetaTag("property", "og:site_name", "Zentpiper");
    setMetaTag("property", "og:locale", "es_PE");

    // Twitter Cards
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", title);
    setMetaTag("name", "twitter:description", description);
    setMetaTag("name", "twitter:image", image);
    setMetaTag("name", "twitter:url", currentUrl);

  }, [title, description, keywords, canonical, image, type, location]);

  return null;
};

export default SEO;
