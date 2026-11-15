import BotonWhatsApp from "../components/BotonWhatsApp";
import Icono from "../components/Icono";
import Seccion from "../components/Seccion";
import TarjetasPlanes from "../components/TarjetasPlanes";
import Pasos from "../components/Pasos";
import Faq from "../components/Faq";
import CtaFinal from "../components/CtaFinal";
import { usePais } from "../contexts/pais";
import { PLANES_WEB, INCLUIDO_WEB } from "../content/planes";
import { FAQ_WEB } from "../content/textos";
import { seo } from "../lib/seo";
import { desde } from "../data/precios";
import { catalogo, migas } from "../lib/schema";

export const meta = () =>
  seo({
    titulo: `Precios de páginas web en Perú: desde ${desde("web")} | Zentpiper`,
    descripcion:
      `Planes de página web desde ${desde("web")} pago único: Esencial, Negocio, Profesional y Tienda Online. Hosting, dominio y 3 meses de mantenimiento gratis.`,
    ruta: "/planes",
    jsonLd: [catalogo("Diseño de páginas web", "web", PLANES_WEB), migas({ nombre: "Páginas web", ruta: "/planes" })],
  });

const BENEFICIOS = [
  { t: "Vende por WhatsApp", d: "Cada botón lleva el pedido directo a tu celular." },
  { t: "Aparece en Google", d: "SEO técnico y velocidad 95–100 desde el día uno." },
  { t: "Perfecta en celular", d: "Diseñada primero para móvil, donde están tus clientes." },
  { t: "Sin sorpresas", d: "Hosting, dominio y SSL incluidos por 1 año." },
];

export default function Planes() {
  const { precio } = usePais();

  return (
    <>
      <section className="page-hero">
        <div className="container narrow center">
          <p className="eyebrow">Páginas web y tiendas online</p>
          <h1 className="h1">Tu página web profesional desde {precio("web", "esencial")}</h1>
          <p className="lead">Pago único. 3 meses de mantenimiento gratis. Lista en 3 a 5 días.</p>
          <div className="acciones center">
            <BotonWhatsApp className="btn btn--gold btn--lg" origen="planes-hero" mensaje="Hola Zentpiper, quiero cotizar mi página web.">
              Cotizar gratis
            </BotonWhatsApp>
          </div>
        </div>
      </section>

      <Seccion id="precios" eyebrow="Planes" titulo="Elige el plan que se paga solo">
        <TarjetasPlanes grupo="web" planes={PLANES_WEB} />
        <ul className="chips center" aria-label="Incluido en todos los planes">
          {INCLUIDO_WEB.map((item) => (
            <li key={item}><Icono nombre="check" size={16} />{item}</li>
          ))}
        </ul>
      </Seccion>

      <Seccion id="beneficios" eyebrow="Por qué funciona" titulo="Una web pensada para vender" className="section--alt">
        <div className="grid-4">
          {BENEFICIOS.map((b) => (
            <div key={b.t} className="card">
              <Icono nombre="check" size={22} className="oro" />
              <h3 className="card__t">{b.t}</h3>
              <p>{b.d}</p>
            </div>
          ))}
        </div>
      </Seccion>

      <Seccion id="proceso" eyebrow="Proceso" titulo="Así trabajamos">
        <Pasos />
      </Seccion>

      <Seccion id="faq" eyebrow="Dudas frecuentes" titulo="Preguntas sobre los planes" className="section--alt">
        <Faq items={FAQ_WEB} />
      </Seccion>

      <CtaFinal titulo="¿Cuál plan es para ti?" texto="Cuéntanos tu negocio y te recomendamos el plan exacto. Gratis." origen="planes-cta" />
    </>
  );
}
