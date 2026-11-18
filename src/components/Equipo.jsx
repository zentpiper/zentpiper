import Icono from "./Icono";
import { EQUIPO } from "../content/textos";

// Las caras reales del equipo: la mejor prueba de que detrás hay personas.
// `fotos={false}` cuando las fotos ya están en el encabezado de la página.
export default function Equipo({ fotos = true }) {
  return (
    <div className={`equipo${fotos ? "" : " equipo--texto"}`}>
      {EQUIPO.map((p) => (
        <article key={p.id} className="persona">
          {fotos && <img src={`/media/e-${p.id}.webp`} width="480" height="600" alt={`Foto de ${p.nombre}`} loading="lazy" decoding="async" />}
          <div className="persona__txt">
            <h3 className="persona__n">{p.nombre}</h3>
            <p className="persona__rol">{p.rol}</p>
            <p>{p.bio}</p>
            {p.url && (
              <a className="link" href={p.url} target="_blank" rel="nofollow noopener">
                Perfil de {p.corto} <Icono nombre="externo" size={14} />
              </a>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
