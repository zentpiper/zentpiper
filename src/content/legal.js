// Textos legales: política de privacidad (Ley 29733) y Libro de Reclamaciones virtual
// (Código de Protección y Defensa del Consumidor, D.S. 011-2011-PCM y modificatorias).
// Describen cómo funciona la web hoy: si cambia (backend, otra analítica, otro canal),
// actualiza estos textos y ACTUALIZADO. Conviene que los revise un contador o abogado.
import { CONTACTO } from "../data/precios";

export const ACTUALIZADO = "18 de noviembre de 2026";

const RUC = CONTACTO.ruc ? `, RUC ${CONTACTO.ruc}` : "";

export const PRIVACIDAD = [
  {
    titulo: "Quién cuida tus datos",
    parrafos: [
      `Zentpiper${RUC}, con domicilio en ${CONTACTO.ciudad}, Perú. Para cualquier consulta sobre tus datos escríbenos a ${CONTACTO.email} o al WhatsApp ${CONTACTO.telefono}.`,
    ],
  },
  {
    titulo: "Qué datos usamos y para qué",
    lista: [
      "Formulario de contacto: tu nombre, el servicio que te interesa y lo que nos cuentes. La web no los guarda: arma el mensaje y tú lo envías por WhatsApp. Los usamos para cotizar y responderte.",
      "WhatsApp: tu número y la conversación, para atenderte y darte el servicio que contrates.",
      "Libro de Reclamaciones: los datos de la hoja de reclamación, para atender tu reclamo o queja como exige la ley.",
      "Navegación: Google Analytics mide de forma estadística las páginas que visitas, tu dispositivo y tu ciudad aproximada, con cookies. Lo usamos para mejorar la web.",
    ],
  },
  {
    titulo: "Con quién se comparten",
    parrafos: [
      "No vendemos ni cedemos tus datos. Solo pasan por los servicios que hacen funcionar la web y la atención: WhatsApp (Meta), Google Analytics (Google) y Vercel, que aloja la web. Estos proveedores pueden tratar los datos fuera del Perú.",
    ],
  },
  {
    titulo: "Cuánto tiempo los guardamos",
    parrafos: [
      "Mientras dure la conversación o el servicio contratado, y después solo el tiempo que exijan las leyes (por ejemplo, las hojas de reclamación).",
    ],
  },
  {
    titulo: "Tus derechos",
    parrafos: [
      `Puedes pedir acceso, rectificación, cancelación u oposición al uso de tus datos escribiendo a ${CONTACTO.email}. Si no quedas conforme con nuestra respuesta, puedes acudir a la Autoridad Nacional de Protección de Datos Personales del Ministerio de Justicia.`,
    ],
  },
  {
    titulo: "Cookies",
    parrafos: [
      "Solo usamos las cookies de Google Analytics. Puedes bloquearlas o borrarlas desde la configuración de tu navegador; la web sigue funcionando igual.",
    ],
  },
];

// Hoja de reclamación (Anexo I del reglamento).
export const TIPOS_BIEN = ["Servicio", "Producto"];
export const TIPOS_RECLAMO = [
  { id: "Reclamo", def: "Disconformidad con el producto o servicio contratado." },
  { id: "Queja", def: "Malestar que no tiene que ver con el producto o servicio, o con la atención recibida." },
];
export const NOTAS_LIBRO = [
  "Te respondemos en un plazo máximo de 15 días hábiles.",
  "Presentar un reclamo no te impide acudir a otras vías de solución ni es requisito previo para denunciar ante el Indecopi.",
];
