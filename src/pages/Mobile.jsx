import BotonWhatsApp from "../components/BotonWhatsApp";
import Icono from "../components/Icono";
import Seccion from "../components/Seccion";
import TarjetasPlanes from "../components/TarjetasPlanes";
import FichaTecnica from "../components/FichaTecnica";
import Faq from "../components/Faq";
import CtaFinal from "../components/CtaFinal";
import TarjetaProyecto from "../components/TarjetaProyecto";
import { usePais } from "../contexts/pais";
import { PLANES_APPS } from "../content/planes";
import { PROYECTOS } from "../content/proyectos";
import { FAQ_APPS } from "../content/textos";
import { seo } from "../lib/seo";
import { desde } from "../data/precios";
import { catalogo, migas } from "../lib/schema";

export const meta = () =>
  seo({
    titulo: `Desarrollo de apps iOS y Android desde ${desde("apps")} | Zentpiper`,
    descripcion: `Tu app en iPhone y Android con una sola inversión. Desde ${desde("apps")}, con 3 meses de soporte gratis. Cotiza por WhatsApp.`,
    ruta: "/mobile",
    jsonLd: [catalogo("Desarrollo de aplicaciones móviles", "apps", PLANES_APPS), migas({ nombre: "Apps", ruta: "/mobile" })],
  });

const FICHA_EMPRESA = [
  ["Alcance", "ERP, CRM o integraciones complejas"],
  ["Inicio", "Auditoría previa sin costo"],
  ["Confidencialidad", "Acuerdo de confidencialidad (NDA)"],
];

export default function Mobile() {
  const { precio } = usePais();
  const apps = PROYECTOS.filter((p) => p.categoria === "app" || p.categoria === "sistema");

  const empresa = (
    <article className="plan plan--medida">
      <header className="plan__cab">
        <h3 className="plan__nombre">Empresa</h3>
      </header>
      <p className="plan__para">Software a medida para tu operación</p>
      <p className="plan__monto plan__monto--sm">A cotizar</p>
      <p className="plan__mensual">Precio cerrado antes de empezar</p>
      <ul className="checks">
        {["Se conecta con tus sistemas", "Consultoría de arquitectura incluida", "NDA desde la primera reunión"].map((i) => (
          <li key={i}><Icono nombre="check" size={18} />{i}</li>
        ))}
      </ul>
      <BotonWhatsApp className="btn btn--ghost btn--block" origen="plan-apps-empresa" mensaje="Hola Zentpiper, necesito una app o sistema a medida para mi empresa.">
        Hablar con el equipo
      </BotonWhatsApp>
      <FichaTecnica filas={FICHA_EMPRESA} />
    </article>
  );

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Apps para iPhone y Android</p>
          <h1 className="h1">Tu app en las dos tiendas desde {precio("apps", "lanzamiento")}.</h1>
          <p className="lead">Un solo desarrollo para iPhone y Android. Precio cerrado y 3 meses de soporte gratis.</p>
          <div className="acciones">
            <BotonWhatsApp className="btn btn--gold btn--lg" origen="mobile-hero" mensaje="Hola Zentpiper, quiero cotizar una app.">
              Cotizar mi app
            </BotonWhatsApp>
          </div>
        </div>
      </section>

      <Seccion id="precios" titulo="Planes">
        <TarjetasPlanes grupo="apps" planes={PLANES_APPS} extra={empresa} />
      </Seccion>

      <Seccion id="trabajos" titulo="Apps y sistemas en uso" className="section--alt">
        <div className="grid-3">
          {apps.map((p) => <TarjetaProyecto key={p.id} proyecto={p} />)}
        </div>
      </Seccion>

      <Seccion id="faq" titulo="Preguntas rápidas">
        <Faq items={FAQ_APPS} />
      </Seccion>

      <CtaFinal
        titulo="¿Tienes la idea?"
        texto="Cuéntanos qué quieres lograr y te enviamos alcance y precio cerrado."
        mensaje="Hola Zentpiper, tengo una idea de app y quiero cotizarla."
        origen="mobile-cta"
      />
    </>
  );
}
