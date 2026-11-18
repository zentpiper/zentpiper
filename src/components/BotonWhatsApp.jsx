import Icono from "./Icono";
import { enlaceWhatsApp, registrarLead } from "../lib/whatsapp";

// CTA principal del sitio: enlace real (rastreable y sin bloqueo de pop-ups).
export default function BotonWhatsApp({ mensaje, origen, className = "btn btn--gold", children, icono = true, ...rest }) {
  return (
    <a
      href={enlaceWhatsApp(mensaje)}
      target="_blank"
      rel="noopener"
      className={className}
      onClick={() => registrarLead(origen)}
      {...rest}
    >
      {icono && <Icono nombre="whatsapp" size={18} />}
      {children}
    </a>
  );
}
