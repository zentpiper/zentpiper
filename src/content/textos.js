// Textos reutilizables: testimonios, FAQ y equipo.
// Las respuestas pueden usar {mensualWeb} y {mensualApp}: se reemplazan por el precio del país.
// Testimonios: siempre textuales (no acortar ni parafrasear dentro de las comillas).

export const TESTIMONIOS = [
  {
    id: "cegrisa",
    texto: "Antes teníamos una web en WordPress que tardaba segundos en cargar los modelos de porcelanato. Zentpiper desarrolló nuestro catálogo y las consultas por WhatsApp crecieron más del 60%.",
    autor: "Carlos Mendoza",
    cargo: "Gerente Comercial, Cegrisa Import",
    pais: "Perú",
  },
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
    r: "Nada durante 3 meses. Luego, desde {mensualWeb} por cambios, seguridad y soporte por WhatsApp.",
  },
  {
    p: "¿El dominio y el hosting están incluidos?",
    r: "Sí, el primer año completo, con SSL. Sin cobros sorpresa.",
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
