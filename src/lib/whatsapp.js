import { CONTACTO } from "../data/precios";

export function enlaceWhatsApp(mensaje = "Hola Zentpiper, quiero cotizar un proyecto.") {
  return `https://wa.me/${CONTACTO.whatsapp}?text=${encodeURIComponent(mensaje)}`;
}

// Evento de conversión GA4. `gtag` es un stub en <head> que encola hasta que GA carga.
export function registrarLead(origen, extra = {}) {
  window.gtag?.("event", "generate_lead", { method: "whatsapp", origen, ...extra });
}
