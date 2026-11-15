import { PASOS } from "../content/textos";

export default function Pasos({ pasos = PASOS }) {
  return (
    <ol className="pasos">
      {pasos.map((p, i) => (
        <li key={p.titulo} className="paso">
          <span className="paso__n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="paso__t">{p.titulo}</h3>
          <p>{p.texto}</p>
        </li>
      ))}
    </ol>
  );
}
