import Seccion from "../components/Seccion";
import Icono from "../components/Icono";
import CtaFinal from "../components/CtaFinal";
import { EQUIPO } from "../content/textos";
import { seo } from "../lib/seo";
import { migas } from "../lib/schema";

export const meta = () =>
  seo({
    titulo: "Sobre nosotros: el equipo de Zentpiper",
    descripcion:
      "Agencia de diseño web y software con raíces peruanas y clientes en Perú y Rusia. Hablas directo con quien construye tu proyecto.",
    ruta: "/sobre-nosotros",
    jsonLd: [migas({ nombre: "Nosotros", ruta: "/sobre-nosotros" })],
  });

const PRINCIPIOS = [
  { t: "Trato directo", d: "Sin intermediarios: hablas con quien diseña y programa tu web." },
  { t: "Velocidad real", d: "Webs que cargan al instante, porque cada segundo cuesta ventas." },
  { t: "Resultados", d: "Medimos el éxito en clientes que te escriben, no en píxeles." },
];

const DATOS = [
  { valor: "+50", texto: "proyectos entregados" },
  { valor: "2", texto: "países: Perú y Rusia" },
  { valor: "95–100", texto: "en Google PageSpeed" },
];

export default function SobreNosotros() {
  return (
    <>
      <section className="page-hero">
        <div className="container narrow center">
          <p className="eyebrow">Nosotros</p>
          <h1 className="h1">Raíces peruanas, clientes en dos continentes</h1>
          <p className="lead">
            Zentpiper es una agencia de diseño web y software de Lima. Construimos webs y apps rápidas que convierten visitas en clientes.
          </p>
          <ul className="datos">
            {DATOS.map((d) => (
              <li key={d.texto}><strong>{d.valor}</strong><span>{d.texto}</span></li>
            ))}
          </ul>
        </div>
      </section>

      <Seccion id="equipo" eyebrow="Equipo" titulo="Quién construye tu proyecto" className="section--alt">
        <div className="equipo">
          {EQUIPO.map((p) => (
            <article key={p.id} className="persona">
              <img src={`/media/e-${p.id}.webp`} width="480" height="600" alt={`Foto de ${p.nombre}`} loading="lazy" decoding="async" />
              <div>
                <h3 className="persona__n">{p.nombre}</h3>
                <p className="persona__rol">{p.rol}</p>
                <p>{p.bio}</p>
                {p.url && (
                  <a className="link" href={p.url} target="_blank" rel="nofollow noopener">
                    Perfil de {p.nombre.split(" ")[0]} <Icono nombre="externo" size={14} />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </Seccion>

      <Seccion id="principios" eyebrow="Cómo trabajamos" titulo="Tres reglas que no negociamos">
        <div className="grid-3">
          {PRINCIPIOS.map((p) => (
            <div key={p.t} className="card">
              <h3 className="card__t">{p.t}</h3>
              <p>{p.d}</p>
            </div>
          ))}
        </div>
      </Seccion>

      <CtaFinal origen="nosotros-cta" />
    </>
  );
}
