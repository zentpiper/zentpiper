import BotonWhatsApp from "../components/BotonWhatsApp";
import Seccion from "../components/Seccion";
import PageHero, { FotoHero } from "../components/PageHero";
import Atienden from "../components/Atienden";
import TarjetasPlanes from "../components/TarjetasPlanes";
import Incluido from "../components/Incluido";
import TarjetaProyecto from "../components/TarjetaProyecto";
import Cita from "../components/Cita";
import Faq from "../components/Faq";
import CtaFinal from "../components/CtaFinal";
import { usePais } from "../contexts/pais";
import { PLANES_WEB } from "../content/planes";
import { PROYECTOS } from "../content/proyectos";
import { FAQ_WEB } from "../content/textos";
import { seo } from "../lib/seo";
import { desde } from "../data/precios";
import { catalogo, migas } from "../lib/schema";

export const meta = () =>
  seo({
    titulo: `Precios de páginas web en Perú: desde ${desde("web")} | Zentpiper`,
    descripcion: `Páginas web desde ${desde("web")} , pago único: Esencial, Negocio, Profesional y Tienda Online. La web y el dominio son tuyos, con hosting siempre incluido.`,
    ruta: "/planes",
    jsonLd: [catalogo("Diseño de páginas web", "web", PLANES_WEB), migas({ nombre: "Páginas web", ruta: "/planes" })],
  });

export const links = () => [
  { rel: "preload", as: "image", href: "/media/f-planes-600.webp", imageSrcSet: "/media/f-planes-600.webp 600w, /media/f-planes-960.webp 960w", imageSizes: "(max-width: 900px) 92vw, 520px", fetchPriority: "high" },
];

const CASOS = ["tayoton", "lyfgolosinas", "spanglish"];

export default function Planes() {
  const { precio } = usePais();
  const casos = CASOS.map((id) => PROYECTOS.find((p) => p.id === id));

  return (
    <>
      <PageHero
        eyebrow="Páginas web y tiendas online"
        titulo={<>Tu web desde {precio("web", "esencial")}, <span className="oro">pago único</span>.</>}
        lead="Pagas una vez y todo es tuyo: la web y el dominio. Hosting incluido siempre y 3 meses de mantenimiento gratis."
        visual={<FotoHero nombre="f-planes" alt="Emprendedoras preparando pedidos para enviar" />}
      >
        <div className="acciones">
          <BotonWhatsApp className="btn btn--gold btn--lg" origen="planes-hero" mensaje="Hola Zentpiper, quiero cotizar mi página web.">
            Cotizar por WhatsApp
          </BotonWhatsApp>
        </div>
        <Atienden />
      </PageHero>

      <Seccion id="precios" titulo="Elige tu plan" sub="Todos se pagan una sola vez. El mantenimiento, con hosting y dominio, se cobra recién desde el cuarto mes.">
        <TarjetasPlanes grupo="web" planes={PLANES_WEB} />
        <Incluido />
      </Seccion>

      <Seccion id="casos" titulo="Así venden nuestros clientes" className="section--alt">
        <div className="grid-3">
          {casos.map((p) => <TarjetaProyecto key={p.id} proyecto={p} />)}
        </div>
        <Cita id="naim" />
      </Seccion>

      <Seccion id="faq" titulo="Preguntas rápidas">
        <Faq items={FAQ_WEB} />
      </Seccion>

      <CtaFinal titulo="¿No sabes cuál elegir?" texto="Cuéntanos tu negocio y te decimos el plan exacto. Gratis." origen="planes-cta" />
    </>
  );
}
