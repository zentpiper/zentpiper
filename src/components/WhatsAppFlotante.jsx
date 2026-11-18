import Icono from "./Icono";
import { EQUIPO } from "../content/textos";
import { enlaceWhatsApp, registrarLead } from "../lib/whatsapp";

// Botón flotante: caras reales + "¿Hablamos?" en vez del círculo verde genérico.
// En celular queda compacto (caras + ícono); el texto vive en aria-label.
export default function WhatsAppFlotante() {
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
