import BotonWhatsApp from "../components/BotonWhatsApp";
import Seccion from "../components/Seccion";
import TarjetasPlanes from "../components/TarjetasPlanes";
import TarjetaProyecto from "../components/TarjetaProyecto";
import Cita from "../components/Cita";
import Faq from "../components/Faq";
import CtaFinal from "../components/CtaFinal";
import { usePais } from "../contexts/pais";
import { PLANES_WEB, INCLUIDO_WEB } from "../content/planes";
import { PROYECTOS } from "../content/proyectos";
import { FAQ_WEB } from "../content/textos";
import { seo } from "../lib/seo";
import { desde } from "../data/precios";
import { catalogo, migas } from "../lib/schema";

export const meta = () =>
  seo({
    titulo: `Precios de páginas web en Perú: desde ${desde("web")} | Zentpiper`,
    descripcion: `Páginas web desde ${desde("web")} pago único: Esencial, Negocio, Profesional y Tienda Online. Hosting, dominio y 3 meses de mantenimiento gratis.`,
    ruta: "/planes",
    jsonLd: [catalogo("Diseño de páginas web", "web", PLANES_WEB), migas({ nombre: "Páginas web", ruta: "/planes" })],
  });

export default function Planes() {
  const { precio } = usePais();
  const tiendas = PROYECTOS.filter((p) => p.categoria === "tienda").slice(0, 3);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Páginas web y tiendas online</p>
          <h1 className="h1">Tu web desde {precio("web", "esencial")}, pago único.</h1>
          <p className="lead">Hosting, dominio y 3 meses de mantenimiento incluidos. La primera, lista en 3 a 5 días hábiles.</p>
          <div className="acciones">
            <BotonWhatsApp className="btn btn--gold btn--lg" origen="planes-hero" mensaje="Hola Zentpiper, quiero cotizar mi página web.">
              Cotizar por WhatsApp
            </BotonWhatsApp>
          </div>
        </div>
      </section>

      <Seccion id="precios" titulo="Planes">
        <TarjetasPlanes grupo="web" planes={PLANES_WEB} />
        <p className="incluido">
          <span>En todos:</span> {INCLUIDO_WEB.join(" · ")}
        </p>
      </Seccion>

      <Seccion id="casos" titulo="Así venden nuestros clientes" className="section--alt">
        <div className="grid-3">
          {tiendas.map((p) => <TarjetaProyecto key={p.id} proyecto={p} />)}
        </div>
        <Cita id="cegrisa" />
      </Seccion>

      <Seccion id="faq" titulo="Preguntas rápidas">
        <Faq items={FAQ_WEB} />
      </Seccion>

      <CtaFinal titulo="¿No sabes cuál elegir?" texto="Cuéntanos tu negocio y te decimos el plan exacto. Gratis." origen="planes-cta" />
    </>
  );
}
