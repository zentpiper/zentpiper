import { Link } from "react-router";
import HeroVideo from "../components/HeroVideo";
import BotonWhatsApp from "../components/BotonWhatsApp";
import Icono from "../components/Icono";
import Seccion from "../components/Seccion";
import Clientes from "../components/Clientes";
import TarjetasPlanes from "../components/TarjetasPlanes";
import TarjetaProyecto from "../components/TarjetaProyecto";
import Equipo from "../components/Equipo";
import Cita from "../components/Cita";
import Faq from "../components/Faq";
import CtaFinal from "../components/CtaFinal";
import { usePais } from "../contexts/pais";
import { PLANES_WEB, INCLUIDO_WEB } from "../content/planes";
import { PROYECTOS } from "../content/proyectos";
import { EQUIPO, FAQ_WEB } from "../content/textos";
import { seo } from "../lib/seo";
import { desde } from "../data/precios";
import { catalogo } from "../lib/schema";

// Clips reales (Pexels): compra desde el celular → mensaje → pedido empacado.
const VIDEOS = ["cliente-celular", "mensaje-whatsapp", "empacando-pedido"];

export const meta = () =>
  seo({
    titulo: `Diseño de páginas web en Lima desde ${desde("web")} | Zentpiper`,
    descripcion:
      "Webs que te traen clientes por WhatsApp. Lista en 3 a 5 días hábiles, con hosting y dominio incluidos. Cotiza gratis con el equipo que la construye.",
    ruta: "/",
    jsonLd: [catalogo("Diseño de páginas web", "web", PLANES_WEB)],
  });

export const links = () => [
  { rel: "preload", as: "image", href: `/media/${VIDEOS[0]}-poster-m.webp`, media: "(max-width: 767px)", fetchPriority: "high" },
  { rel: "preload", as: "image", href: `/media/${VIDEOS[0]}-poster.webp`, media: "(min-width: 768px)", fetchPriority: "high" },
];

export default function Home() {
  const { precio } = usePais();

  return (
    <>
      <section className="hero" aria-labelledby="hero-t">
        <HeroVideo videos={VIDEOS} />
        <div className="container hero__in">
          <p className="hero__pre">Diseño web en Lima · Perú y Rusia</p>
          <h1 className="hero__t" id="hero-t">
            Webs que te traen <span className="oro">clientes por WhatsApp</span>.
          </h1>
          <p className="hero__sub">
            Lista en 3 a 5 días hábiles, desde <strong>{precio("web", "esencial")}</strong>. Hosting y dominio incluidos.
          </p>
          <div className="acciones">
            <BotonWhatsApp className="btn btn--gold btn--lg" origen="hero" mensaje="Hola Zentpiper, quiero cotizar mi página web.">
              Cotizar por WhatsApp
            </BotonWhatsApp>
            <a className="btn btn--ghost btn--lg" href="#precios">
              Ver precios <Icono nombre="flecha" size={18} />
            </a>
          </div>
          <div className="hero__equipo">
            <span className="avatares" aria-hidden="true">
              {EQUIPO.map((p) => (
                <img key={p.id} src={`/media/e-${p.id}-96.webp`} width="40" height="40" alt="" decoding="async" />
              ))}
            </span>
            <p>Te atienden {EQUIPO.map((p) => p.corto).join(" y ")}, los que la construyen. Sin intermediarios.</p>
          </div>
        </div>
      </section>

      <Clientes />

      <Seccion id="precios" titulo="Elige tu web" sub="Pago único. Los 3 primeros meses de mantenimiento van por nuestra cuenta.">
        <TarjetasPlanes grupo="web" planes={PLANES_WEB} />
        <p className="incluido">
          <span>En todos:</span> {INCLUIDO_WEB.join(" · ")}
        </p>
        <p className="nota">
          ¿Buscas una app? <Link to="/mobile">iPhone y Android desde {precio("apps", "lanzamiento")}</Link>
        </p>
      </Seccion>

      <Seccion id="trabajos" titulo="Webs que ya están vendiendo" className="section--alt">
        <div className="grid-3">
          {PROYECTOS.filter((p) => p.destacado).map((p) => (
            <TarjetaProyecto key={p.id} proyecto={p} />
          ))}
        </div>
        <p className="mt">
          <Link className="link-flecha" to="/portafolio">
            Ver más de 50 proyectos <Icono nombre="flecha" size={18} />
          </Link>
        </p>
      </Seccion>

      <Seccion id="equipo" titulo="Quiénes somos" sub="Diseñamos, programamos y te respondemos nosotros.">
        <div className="equipo-cita">
          <Equipo />
          <Cita id="cegrisa" />
        </div>
      </Seccion>

      <Seccion id="faq" titulo="Preguntas rápidas" className="section--alt">
        <Faq items={FAQ_WEB} />
      </Seccion>

      <CtaFinal />
    </>
  );
}
