import { Link } from "react-router";
import HeroVideo from "../components/HeroVideo";
import BotonWhatsApp from "../components/BotonWhatsApp";
import Icono from "../components/Icono";
import Seccion from "../components/Seccion";
import CintaClientes from "../components/CintaClientes";
import TarjetasPlanes from "../components/TarjetasPlanes";
import TarjetaProyecto from "../components/TarjetaProyecto";
import Testimonios from "../components/Testimonios";
import Pasos from "../components/Pasos";
import Comparativa from "../components/Comparativa";
import Faq from "../components/Faq";
import CtaFinal from "../components/CtaFinal";
import { usePais } from "../contexts/pais";
import { PLANES_WEB, INCLUIDO_WEB } from "../content/planes";
import { PROYECTOS } from "../content/proyectos";
import { FAQ_WEB } from "../content/textos";
import { seo } from "../lib/seo";
import { desde } from "../data/precios";
import { catalogo } from "../lib/schema";

const VIDEOS = ["hero-2", "hero-1"];

export const meta = () =>
  seo({
    titulo: `Diseño de páginas web en Lima desde ${desde("web")} | Zentpiper`,
    descripcion:
      "Páginas web, tiendas online y apps que venden. Lista en 3 a 5 días, con hosting, dominio y 3 meses de mantenimiento gratis. Cotiza gratis por WhatsApp.",
    ruta: "/",
    jsonLd: [catalogo("Diseño de páginas web", "web", PLANES_WEB)],
  });

export const links = () => [
  { rel: "preload", as: "image", href: `/media/${VIDEOS[0]}-poster-m.webp`, media: "(max-width: 767px)", fetchPriority: "high" },
  { rel: "preload", as: "image", href: `/media/${VIDEOS[0]}-poster.webp`, media: "(min-width: 768px)", fetchPriority: "high" },
];

const DATOS = [
  { valor: "+50", texto: "proyectos entregados" },
  { valor: "95–100", texto: "en Google PageSpeed" },
  { valor: "2", texto: "países: Perú y Rusia" },
];

export default function Home() {
  const { precio } = usePais();
  const desde = precio("web", "esencial");

  return (
    <>
      <section className="hero" aria-labelledby="hero-t">
        <HeroVideo videos={VIDEOS} />
        <div className="container hero__in">
          <p className="eyebrow">Agencia digital · Perú y Rusia</p>
          <h1 className="hero__t" id="hero-t">
            Webs y apps <span className="oro">que venden.</span>
          </h1>
          <p className="hero__sub">
            Tu página profesional lista en 3 a 5 días. Hosting, dominio y 3 meses de mantenimiento gratis.
            <strong> Desde {desde}.</strong>
          </p>
          <div className="acciones">
            <BotonWhatsApp className="btn btn--gold btn--lg" origen="hero" mensaje="Hola Zentpiper, quiero cotizar mi página web.">
              Cotizar gratis por WhatsApp
            </BotonWhatsApp>
            <a className="btn btn--ghost btn--lg" href="#precios">
              Ver precios <Icono nombre="flecha" size={18} />
            </a>
          </div>
          <ul className="hero__datos">
            {DATOS.map((d) => (
              <li key={d.texto}>
                <strong>{d.valor}</strong> {d.texto}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CintaClientes />

      <Seccion
        id="precios"
        eyebrow="Precios claros"
        titulo="Elige tu web. Pagas una sola vez."
        sub="Sin letras pequeñas: el mantenimiento es gratis los primeros 3 meses."
      >
        <TarjetasPlanes grupo="web" planes={PLANES_WEB} />
        <ul className="chips center" aria-label="Incluido en todos los planes">
          {INCLUIDO_WEB.map((item) => (
            <li key={item}><Icono nombre="check" size={16} />{item}</li>
          ))}
        </ul>
        <p className="nota center">
          ¿Necesitas una app? <Link to="/mobile">Apps iOS y Android desde {precio("apps", "lanzamiento")}</Link>
        </p>
      </Seccion>

      <Seccion id="proceso" eyebrow="Así de simple" titulo="De la idea a vender en 3 pasos" className="section--alt">
        <Pasos />
      </Seccion>

      <Seccion id="trabajos" eyebrow="Portafolio" titulo="Negocios que ya venden con nosotros">
        <div className="grid-3">
          {PROYECTOS.filter((p) => p.destacado).map((p) => (
            <TarjetaProyecto key={p.id} proyecto={p} />
          ))}
        </div>
        <p className="center mt">
          <Link className="btn btn--ghost" to="/portafolio">
            Ver los +50 proyectos <Icono nombre="flecha" size={18} />
          </Link>
        </p>
      </Seccion>

      <Seccion id="opiniones" eyebrow="Clientes reales" titulo="Lo que dicen de nosotros" className="section--alt">
        <Testimonios />
      </Seccion>

      <Seccion id="por-que" eyebrow="La diferencia" titulo="Hecho a medida, no con plantillas">
        <Comparativa />
      </Seccion>

      <Seccion id="faq" eyebrow="Dudas frecuentes" titulo="Antes de empezar" className="section--alt">
        <Faq items={FAQ_WEB} />
      </Seccion>

      <CtaFinal />
    </>
  );
}
