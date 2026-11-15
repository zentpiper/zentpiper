import Icono from "./Icono";
import { enlaceWhatsApp, registrarLead } from "../lib/whatsapp";

export default function WhatsAppFlotante() {
  return (
    <a
      className="wa-float"
      href={enlaceWhatsApp("Hola Zentpiper, vengo de su web y quiero cotizar.")}
      target="_blank"
      rel="noopener"
      aria-label="Escríbenos por WhatsApp"
      onClick={() => registrarLead("flotante")}
    >
      <Icono nombre="whatsapp" size={30} />
    </a>
  );
}
