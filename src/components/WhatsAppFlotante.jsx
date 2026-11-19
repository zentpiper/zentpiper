import { useLocation } from "react-router";
import Icono from "./Icono";
import { EQUIPO } from "../content/textos";
import { enlaceWhatsApp, registrarLead } from "../lib/whatsapp";

// Páginas con formulario propio: el botón taparía campos y ya tienen su WhatsApp.
const SIN_FLOTANTE = ["/contacto", "/confirmacion", "/libro-de-reclamaciones"];

// Botón flotante: caras reales + "¿Hablamos?" en vez del círculo verde genérico.
// En celular queda compacto (caras + ícono); el texto vive en aria-label.
export default function WhatsAppFlotante() {
  const { pathname } = useLocation();
  if (SIN_FLOTANTE.includes(pathname.replace(/\/$/, ""))) return null;
  return (
    <a
      className="wa"
      href={enlaceWhatsApp("Hola Zentpiper, vengo de su web y quiero cotizar.")}
      target="_blank"
      rel="noopener"
      aria-label="¿Hablamos? Escríbenos por WhatsApp"
      onClick={() => registrarLead("flotante")}
    >
      <span className="wa__caras" aria-hidden="true">
        {EQUIPO.map((p) => (
          <img key={p.id} src={`/media/e-${p.id}-96.webp`} width="32" height="32" alt="" decoding="async" />
        ))}
      </span>
      <span className="wa__txt" aria-hidden="true">
        <strong>¿Hablamos?</strong>
        <small>Respondemos por WhatsApp</small>
      </span>
      <span className="wa__ico" aria-hidden="true">
        <Icono nombre="whatsapp" size={20} />
      </span>
    </a>
  );
}
