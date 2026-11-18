import { TESTIMONIOS } from "../content/textos";

// Un testimonio grande y textual (con nombre y cargo) convence más que tres con estrellas.
export default function Cita({ id }) {
  const t = TESTIMONIOS.find((x) => x.id === id);
  return (
    <figure className="cita">
      <blockquote>“{t.texto}”</blockquote>
      <figcaption>
        <strong>{t.autor}</strong> · {t.cargo}, {t.pais}
      </figcaption>
    </figure>
  );
}
