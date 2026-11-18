import { PROPIEDAD_WEB, INCLUIDO_WEB } from "../content/planes";

// Línea bajo las tarjetas de planes web: propiedad del cliente + lo que traen todos.
export default function Incluido() {
  return (
    <p className="incluido">
      <strong>{PROPIEDAD_WEB}</strong>
      <span>En todos:</span> {INCLUIDO_WEB.join(" · ")}
    </p>
  );
}
