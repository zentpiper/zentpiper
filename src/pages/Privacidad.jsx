import { Link } from "react-router";
import { PRIVACIDAD, ACTUALIZADO } from "../content/legal";
import { seo } from "../lib/seo";
import { migas } from "../lib/schema";

export const meta = () =>
  seo({
    titulo: "Política de privacidad | Zentpiper",
    descripcion:
      "Qué datos usa Zentpiper (formulario, WhatsApp, Libro de Reclamaciones y Google Analytics), para qué y cómo ejercer tus derechos.",
    ruta: "/privacidad",
    jsonLd: [migas({ nombre: "Política de privacidad", ruta: "/privacidad" })],
  });

export default function Privacidad() {
  return (
    <>
      <section className="page-hero page-hero--sm">
        <div className="container narrow">
          <p className="eyebrow">Legal</p>
          <h1 className="h1">Política de privacidad</h1>
          <p className="lead">Qué datos usamos, para qué y cómo ejercer tus derechos. Actualizada el {ACTUALIZADO}.</p>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container narrow legal">
          {PRIVACIDAD.map((s) => (
            <div key={s.titulo}>
              <h2>{s.titulo}</h2>
              {s.parrafos?.map((p) => <p key={p}>{p}</p>)}
              {s.lista && (
                <ul>
                  {s.lista.map((l) => <li key={l}>{l}</li>)}
                </ul>
              )}
            </div>
          ))}
          <p>
            Para reclamos o quejas sobre nuestros servicios usa el{" "}
            <Link to="/libro-de-reclamaciones">Libro de Reclamaciones</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
