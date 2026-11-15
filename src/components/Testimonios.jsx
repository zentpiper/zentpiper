import Icono from "./Icono";
import { TESTIMONIOS } from "../content/textos";

export default function Testimonios() {
  return (
    <div className="grid-3">
      {TESTIMONIOS.map((t) => (
        <figure key={t.autor} className="quote">
          <div className="quote__stars" role="img" aria-label="5 de 5 estrellas">
            {Array.from({ length: 5 }, (_, i) => <Icono key={i} nombre="estrella" size={16} />)}
          </div>
          <blockquote>“{t.texto}”</blockquote>
          <figcaption>
            <strong>{t.autor}</strong>
            <span>{t.cargo} · {t.pais}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
