// Textos reutilizables: testimonios, FAQ y equipo.
// Las respuestas pueden usar {mensualWeb} y {mensualApp}: se reemplazan por el precio del país.
// Testimonios: siempre textuales (no acortar ni parafrasear dentro de las comillas).

export const TESTIMONIOS = [
  {
    id: "spanglish",
    texto: "Coordinar el desarrollo de nuestra academia desde Moscú fue facilísimo con Zentpiper. Muy profesionales, cumplieron exactamente los plazos acordados y el diseño transmite absoluta confianza.",
    autor: "Elena Volkova",
    cargo: "Directora, Spanglish Academy",
    pais: "Rusia",
  },
  {
    id: "naim",
    texto: "El sitio web de Naim Marchionni capturó a la perfección la estética oscura e inmersiva que buscaba para mi música. La velocidad de carga y la experiencia en celulares es de otro planeta.",
    autor: "Naim Marchionni",
    cargo: "DJ y productor internacional",
    pais: "España",
  },
];

export const FAQ_WEB = [
  {
    p: "¿Cuánto tarda?",
    r: "El plan Esencial, de 3 a 5 días hábiles. Los demás, de 7 a 14. Ves avances antes de publicar.",
  },
  {
    p: "¿Qué pago después?",
    r: "Nada durante 3 meses. Luego, desde {mensualWeb} al mes con hosting, dominio, cambios, seguridad y soporte por WhatsApp.",
  },
  {
    p: "¿La web y el dominio son míos?",
    r: "Sí, todo es tuyo. El hosting y el dominio van siempre incluidos: gratis los 3 primeros meses y después dentro del mantenimiento.",
  },
  {
    p: "¿Cómo pago?",
    r: "En Perú: transferencia (BCP, Interbank, BBVA), Yape o Plin. Desde Rusia te damos las opciones en rublos por WhatsApp.",
  },
];

export const FAQ_APPS = [
  {
    p: "¿Por qué Flutter?",
    r: "Un solo desarrollo sale en iPhone y Android a la vez: pagas una app, no dos.",
  },
  {
    p: "¿Cuánto tarda?",
    r: "Lanzamiento: 2 a 4 semanas. Negocio: 4 a 6. Pro: 6 a 10.",
  },
  {
    p: "¿Qué pago después?",
    r: "3 meses de soporte gratis. Luego, desde {mensualApp} por actualizaciones y cambios.",
  },
  {
    p: "¿Quién la publica en las tiendas?",
    r: "Nosotros, a nombre de tu empresa: fichas, capturas y revisión de App Store y Google Play.",
  },
];

// Inicio: qué pasa después del primer mensaje. Solo plazos y promesas confirmados.
export const PASOS = [
  { t: "Nos escribes por WhatsApp", d: "Cuéntanos de tu negocio y te recomendamos el plan. Cotizar es gratis." },
  { t: "Ves tu web antes de publicarla", d: "Te mostramos avances mientras la construimos." },
  { t: "La publicamos y es tuya", d: "Esencial en 3 a 5 días hábiles; los demás, en 7 a 14. La web y el dominio son tuyos." },
];

// Sobre nosotros: cómo trabajamos y datos de la empresa.
export const COMO_TRABAJAMOS = [
  { t: "Hablas con quien programa", d: "Sin vendedores de por medio ni tickets." },
  { t: "Rápidas de verdad", d: "Cada segundo de carga cuesta clientes. Las nuestras dan 95–100 en PageSpeed." },
  { t: "Medimos en mensajes", d: "Una web funciona si te escriben más, no si se ve bonita." },
];

export const DATOS_EMPRESA = [
  { valor: "+50", texto: "proyectos entregados" },
  { valor: "2", texto: "países: Perú y Rusia" },
];

export const EQUIPO = [
  {
    id: "patrick-pozsgai",
    nombre: "Patrick Pozsgai",
    corto: "Patrick",
    rol: "Desarrollo web y SEO",
    bio: "Programa cada web y se ocupa de que Google la encuentre.",
  },
  {
    id: "barclay-leach",
    nombre: "Barclay Leach",
    corto: "Barclay",
    rol: "Growth y full stack",
    bio: "Convierte visitas en clientes: embudos, anuncios y automatización.",
    url: "https://barclayleach.com/es/",
  },
];
