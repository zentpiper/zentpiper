import BotonWhatsApp from "../components/BotonWhatsApp";
import Icono from "../components/Icono";
import Seccion from "../components/Seccion";
import TarjetasPlanes from "../components/TarjetasPlanes";
import Pasos from "../components/Pasos";
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
    descripcion:
      `Creamos tu app para iPhone y Android con Flutter: una sola inversión, dos tiendas. Desde ${desde("apps")} con 3 meses de soporte gratis. Cotiza por WhatsApp.`,
    ruta: "/mobile",
    jsonLd: [catalogo("Desarrollo de aplicaciones móviles", "apps", PLANES_APPS), migas({ nombre: "Apps", ruta: "/mobile" })],
  });

const PASOS_APP = [
  { titulo: "Definimos tu app", texto: "Pantallas, funciones y presupuesto cerrado antes de empezar." },
  { titulo: "Diseño y desarrollo", texto: "Pruebas la app en tu celular durante todo el proceso." },
  { titulo: "Publicamos", texto: "La subimos a App Store y Google Play a nombre de tu empresa." },
];

export default function Mobile() {
  const { precio } = usePais();
  const apps = PROYECTOS.filter((p) => p.categoria === "app" || p.categoria === "sistema");

  const medida = (
    <article className="plan plan--medida">
      <h3 className="plan__nombre">Empresa</h3>
      <p className="plan__para">Software a medida, ERP, CRM o integraciones complejas</p>
      <p className="plan__precio">
        <span className="plan__monto plan__monto--sm">A cotizar</span>
      </p>
      <ul className="checks">
        {["Arquitectura y consultoría incluidas", "Integración con tus sistemas", "Acuerdo de confidencialidad (NDA)", "Equipo dedicado"].map((i) => (
          <li key={i}><Icono nombre="check" size={18} />{i}</li>
        ))}
      </ul>
      <BotonWhatsApp className="btn btn--ghost btn--block" origen="plan-apps-empresa" mensaje="Hola Zentpiper, necesito una app o sistema a medida para mi empresa.">
        Hablar con un ingeniero
      </BotonWhatsApp>
    </article>
  );

  return (
    <>
      <section className="page-hero">
        <div className="container narrow center">
          <p className="eyebrow">Apps iOS y Android</p>
          <h1 className="h1">Tu app en App Store y Google Play desde {precio("apps", "lanzamiento")}</h1>
          <p className="lead">Una sola inversión, dos tiendas. Desarrollada con Flutter y lista en semanas, no meses.</p>
          <div className="acciones center">
            <BotonWhatsApp className="btn btn--gold btn--lg" origen="mobile-hero" mensaje="Hola Zentpiper, quiero cotizar una app.">
              Cotizar mi app
            </BotonWhatsApp>
          </div>
        </div>
      </section>

      <Seccion id="precios" eyebrow="Planes" titulo="Precios cerrados, sin sorpresas" sub="3 meses de soporte gratis en todos los planes.">
        <TarjetasPlanes grupo="apps" planes={PLANES_APPS} extra={medida} />
      </Seccion>

      <Seccion id="proceso" eyebrow="Proceso" titulo="De la idea a las tiendas" className="section--alt">
        <Pasos pasos={PASOS_APP} />
      </Seccion>

      <Seccion id="trabajos" eyebrow="Casos" titulo="Apps y sistemas en producción">
        <div className="grid-3">
          {apps.map((p) => <TarjetaProyecto key={p.id} proyecto={p} />)}
        </div>
      </Seccion>

      <Seccion id="faq" eyebrow="Dudas frecuentes" titulo="Preguntas sobre apps" className="section--alt">
        <Faq items={FAQ_APPS} />
      </Seccion>

      <CtaFinal
        titulo="¿Tienes la idea? Nosotros la app."
        texto="Cuéntanos qué quieres lograr y te enviamos alcance y precio cerrado."
        mensaje="Hola Zentpiper, tengo una idea de app y quiero cotizarla."
        origen="mobile-cta"
      />
    </>
  );
}
