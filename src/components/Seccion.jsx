// Bloque estándar: título (y opcionalmente etiqueta y bajada) + contenido.
// Alineado a la izquierda por defecto: lo centrado en todo es lo que más "plantilla" parece.
export default function Seccion({ id, eyebrow, titulo, sub, children, className = "", centrado = false }) {
  return (
    <section id={id} className={`section ${className}`} aria-labelledby={id ? `${id}-t` : undefined}>
      <div className="container">
        {(eyebrow || titulo) && (
          <header className={`sec-head${centrado ? " center" : ""}`}>
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            {titulo && <h2 className="h2" id={id ? `${id}-t` : undefined}>{titulo}</h2>}
            {sub && <p className="lead">{sub}</p>}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
