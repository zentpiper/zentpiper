import Seccion from "../components/Seccion";
import Equipo from "../components/Equipo";
import PageHero from "../components/PageHero";
import { EQUIPO, COMO_TRABAJAMOS as COMO, DATOS_EMPRESA as DATOS } from "../content/textos";
import Cita from "../components/Cita";
import CtaFinal from "../components/CtaFinal";
import { seo } from "../lib/seo";
import { migas } from "../lib/schema";

export const meta = () =>
  seo({
    titulo: "Sobre nosotros: el equipo de Zentpiper",
    descripcion:
      "Somos un equipo pequeño de Lima que diseña y programa webs y apps para negocios de Perú y Rusia. Hablas directo con quien construye tu proyecto.",
    ruta: "/sobre-nosotros",
    jsonLd: [migas({ nombre: "Nosotros", ruta: "/sobre-nosotros" })],
  });

export default function SobreNosotros() {
  return (
    <>
      <PageHero
        eyebrow="Nosotros"
        titulo={<>Un equipo pequeño de Lima, con clientes en <span className="oro">Perú y Rusia</span>.</>}
        visual={
          <div className="duo">
            {EQUIPO.map((p, i) => (
              <figure key={p.id}>
                <img
                  src={`/media/e-${p.id}.webp`}
                  width="480"
                  height="600"
                  alt={`Foto de ${p.nombre}`}
                  fetchPriority={i === 0 ? "high" : undefined}
                  decoding="async"
                />
                <figcaption>
                  <strong>{p.nombre}</strong>
                  <span>{p.rol}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        }
      >
        <ul className="datos">
          {DATOS.map((d) => (
            <li key={d.texto}><strong>{d.valor}</strong><span>{d.texto}</span></li>
          ))}
        </ul>
      </PageHero>

      <Seccion id="equipo" titulo="Quiénes somos" className="section--alt">
        <Equipo fotos={false} />
      </Seccion>

      <Seccion id="como" titulo="Cómo trabajamos">
        <ul className="lista-como">
          {COMO.map((c) => (
            <li key={c.t}>
              <h3>{c.t}</h3>
              <p>{c.d}</p>
            </li>
          ))}
        </ul>
        <Cita id="spanglish" />
      </Seccion>

      <CtaFinal origen="nosotros-cta" />
    </>
  );
}
