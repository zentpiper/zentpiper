// Encabezado de páginas internas: texto a la izquierda y algo humano a la derecha
// (foto real, el equipo o trabajos reales). Sin visual se ve plano: siempre pasa uno.
// `visual` es un nodo; si contiene la imagen más grande de la pantalla, debe ir sin
// `loading="lazy"` y con `fetchPriority="high"` (es el LCP de la página).
export default function PageHero({ eyebrow, titulo, lead, children, visual, id = "titulo" }) {
  return (
    <section className="page-hero" aria-labelledby={id}>
      <div className="container page-hero__in">
        <div className="page-hero__txt">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1 className="h1" id={id}>{titulo}</h1>
          {lead && <p className="lead">{lead}</p>}
          {children}
        </div>
        {visual && <div className="page-hero__visual">{visual}</div>}
      </div>
    </section>
  );
}

// Foto de encabezado generada por scripts/optimizar-medios.mjs (FOTOS): 960 y 600 px.
export function FotoHero({ nombre, alt }) {
  return (
    <img
      className="foto"
      src={`/media/${nombre}-960.webp`}
      srcSet={`/media/${nombre}-600.webp 600w, /media/${nombre}-960.webp 960w`}
      sizes="(max-width: 900px) 92vw, 520px"
      width="960"
      height="720"
      alt={alt}
      fetchPriority="high"
      decoding="async"
    />
  );
}
