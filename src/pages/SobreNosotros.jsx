import Seccion from "../components/Seccion";
import Equipo from "../components/Equipo";
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

const COMO = [
  { t: "Hablas con quien programa", d: "Sin vendedores de por medio ni tickets." },
  { t: "Rápidas de verdad", d: "Cada segundo de carga cuesta clientes. Las nuestras dan 95–100 en PageSpeed." },
  { t: "Medimos en mensajes", d: "Una web funciona si te escriben más, no si se ve bonita." },
];

const DATOS = [
  { valor: "+50", texto: "proyectos entregados" },
  { valor: "2", texto: "países: Perú y Rusia" },
];

export default function SobreNosotros() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Nosotros</p>
          <h1 className="h1">Un equipo pequeño de Lima, con clientes en Perú y Rusia.</h1>
          <ul className="datos">
            {DATOS.map((d) => (
              <li key={d.texto}><strong>{d.valor}</strong><span>{d.texto}</span></li>
            ))}
          </ul>
        </div>
      </section>

      <Seccion id="equipo" titulo="Quiénes somos" className="section--alt">
        <Equipo />
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
