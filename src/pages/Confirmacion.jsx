import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import Icono from "../components/Icono";
import { enlaceWhatsApp } from "../lib/whatsapp";
import { seo } from "../lib/seo";

export const meta = () =>
  seo({
    titulo: "¡Solicitud enviada! | Zentpiper",
    descripcion: "Recibimos tu solicitud. Seguimos la conversación por WhatsApp.",
    ruta: "/confirmacion",
    noindex: true,
  });

export default function Confirmacion() {
  const { state } = useLocation();
  // El HTML prerenderizado no tiene state: se aplica tras hidratar.
  const [envio, setEnvio] = useState(null);
  useEffect(() => setEnvio(state ?? null), [state]);

  return (
    <section className="section">
      <div className="container narrow center">
        <span className="ok-icono"><Icono nombre="check" size={36} /></span>
        <h1 className="h1">{envio?.nombre ? `¡Listo, ${envio.nombre}!` : "¡Solicitud enviada!"}</h1>
        <p className="lead">Te abrimos WhatsApp con tu mensaje. Envíalo y te respondemos con tu cotización.</p>
        <div className="acciones center">
          <a className="btn btn--gold btn--lg" href={enlaceWhatsApp(envio?.mensaje)} target="_blank" rel="noopener">
            <Icono nombre="whatsapp" size={18} /> ¿No se abrió? Abrir WhatsApp
          </a>
          <Link className="btn btn--ghost btn--lg" to="/portafolio">Ver portafolio</Link>
        </div>
      </div>
    </section>
  );
}
