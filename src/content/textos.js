// Textos reutilizables: testimonios, FAQ, comparativa, pasos, equipo.
// Las preguntas pueden usar {mensualWeb} y {mensualApp}: se reemplazan por el precio del país.

export const TESTIMONIOS = [
  {
    texto: "Antes teníamos una web en WordPress que tardaba segundos en cargar los modelos de porcelanato. Zentpiper desarrolló nuestro catálogo y las consultas por WhatsApp crecieron más del 60%.",
    autor: "Carlos Mendoza",
    cargo: "Gerente Comercial, Cegrisa Import",
    pais: "Perú",
  },
  {
    texto: "Coordinar el desarrollo de nuestra academia desde Moscú fue facilísimo con Zentpiper. Muy profesionales, cumplieron exactamente los plazos acordados y el diseño transmite absoluta confianza.",
    autor: "Elena Volkova",
    cargo: "Directora, Spanglish Academy",
    pais: "Rusia",
  },
  {
    texto: "El sitio web de Naim Marchionni capturó a la perfección la estética oscura e inmersiva que buscaba para mi música. La velocidad de carga y la experiencia en celulares es de otro planeta.",
    autor: "Naim Marchionni",
    cargo: "DJ y productor internacional",
    pais: "España",
  },
];

export const PASOS = [
  { titulo: "Nos escribes", texto: "Cuéntanos tu negocio por WhatsApp. La cotización es gratis y sin compromiso." },
  { titulo: "Diseñamos tu web", texto: "Ves avances reales y pides cambios antes de publicar." },
  { titulo: "Publicas y vendes", texto: "Dejamos dominio, Google, WhatsApp y analítica funcionando." },
];

export const COMPARATIVA = [
  { tema: "Velocidad en Google", nosotros: "95–100 en PageSpeed", otros: "30–60, lenta" },
  { tema: "Diseño", nosotros: "Hecho a tu medida", otros: "Plantilla repetida" },
  { tema: "Costos", nosotros: "Todo incluido 1 año", otros: "Cobros sorpresa" },
  { tema: "Soporte", nosotros: "WhatsApp directo", otros: "Tickets y bots" },
];

export const FAQ_WEB = [
  {
    p: "¿En cuánto tiempo está lista mi web?",
    r: "El plan Esencial se entrega en 3 a 5 días hábiles. Los planes más grandes toman de 7 a 14 días hábiles, con revisiones incluidas.",
  },
  {
    p: "¿Qué pago después de la entrega?",
    r: "Nada durante 3 meses: el mantenimiento es gratis. Luego pagas una mensualidad desde {mensualWeb} que cubre cambios de contenido, seguridad y soporte por WhatsApp.",
  },
  {
    p: "¿El hosting y el dominio están incluidos?",
    r: "Sí. Dominio propio (.com o .pe), hosting y certificado SSL por 1 año completo, sin cobros sorpresa.",
  },
  {
    p: "¿Voy a salir en Google?",
    r: "Cada web sale con SEO técnico, sitemap, datos estructurados y 95–100 en PageSpeed, justo lo que Google premia. Con el plan Negocio sumamos SEO local para tu ciudad.",
  },
  {
    p: "¿Cómo pago?",
    r: "En Perú: transferencia (BCP, Interbank, BBVA), Yape o Plin. Desde Rusia te damos las opciones en rublos por WhatsApp.",
  },
];

export const FAQ_APPS = [
  {
    p: "¿Por qué Flutter y no apps nativas separadas?",
    r: "Con una sola base de código publicas en iOS y Android a la vez: pagas un desarrollo, no dos, y las actualizaciones salen el mismo día en ambas tiendas.",
  },
  {
    p: "¿Cuánto tarda mi app?",
    r: "App Lanzamiento: 2 a 4 semanas. App Negocio: 4 a 6 semanas. App Pro: 6 a 10 semanas.",
  },
  {
    p: "¿Qué pago después del lanzamiento?",
    r: "Los primeros 3 meses de soporte son gratis. Luego, una mensualidad desde {mensualApp} para actualizaciones, monitoreo y cambios.",
  },
  {
    p: "¿Ustedes publican la app en las tiendas?",
    r: "Sí. Preparamos fichas, capturas y la revisión de App Store y Google Play. La app queda a nombre de tu empresa.",
  },
];

export const EQUIPO = [
  {
    id: "patrick-pozsgai",
    nombre: "Patrick Pozsgai",
    rol: "Desarrollo web y SEO",
    bio: "Dirige la parte técnica de cada web: Next.js, rendimiento y SEO certificado para que tu negocio aparezca en Google.",
  },
  {
    id: "barclay-leach",
    nombre: "Barclay Leach",
    rol: "Growth y full stack",
    bio: "Une marketing y desarrollo full stack para convertir visitas en clientes: embudos, paid media y automatización con IA.",
    url: "https://barclayleach.com/es/",
  },
];
