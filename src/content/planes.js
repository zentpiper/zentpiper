// Contenido de los planes. Los precios viven en src/data/precios.js (misma clave).
// `incluye`: máximo 3 puntos, en lenguaje de cliente (lo que gana, no la tecnología).
// `ficha`: detalle técnico breve, plegado en la tarjeta para quien lo busque.
// `ejemplo`: id de un proyecto real de src/content/proyectos.js (miniatura + enlace).
// `{pasarelas}` se reemplaza por las pasarelas de pago del país seleccionado.
// Solo hechos que el dueño ya confirmó (ver skill copy-conversion).

export const PLANES_WEB = [
  {
    id: "esencial",
    nombre: "Esencial",
    ejemplo: "naim-marchionni",
    para: "Para estar en Google y recibir mensajes",
    incluye: ["Web de 1 a 3 secciones", "Botón de WhatsApp y formulario", "Lista en 3 a 5 días hábiles"],
    ficha: [
      ["Secciones", "1 a 3"],
      ["Entrega", "3 a 5 días hábiles"],
      ["Hosting, dominio y SSL", "Siempre incluidos"],
      ["Velocidad", "95–100 en PageSpeed"],
      ["SEO", "Títulos, sitemap y datos estructurados"],
      ["Código", "React, sin plantillas de WordPress"],
    ],
  },
  {
    id: "negocio",
    nombre: "Negocio",
    ejemplo: "lyfgolosinas",
    para: "Para vender tu catálogo por WhatsApp",
    destacado: "Más elegido",
    incluye: ["Hasta 6 secciones con catálogo", "Pedidos directo a tu WhatsApp", "SEO para tu ciudad y rubro"],
    ficha: [
      ["Secciones", "Hasta 6"],
      ["Catálogo", "Productos o servicios con foto y precio"],
      ["Pedidos", "Mensaje de WhatsApp ya escrito con el producto"],
      ["Entrega", "7 a 14 días hábiles"],
      ["Hosting, dominio y SSL", "Siempre incluidos"],
      ["Velocidad", "95–100 en PageSpeed"],
    ],
  },
  {
    id: "profesional",
    nombre: "Profesional",
    ejemplo: "spanglish",
    para: "Para marcas que invierten en anuncios",
    incluye: ["Hasta 10 secciones", "Base de clientes para remarketing", "Métricas de cada visita y venta"],
    ficha: [
      ["Secciones", "Hasta 10"],
      ["Analítica", "Google Analytics 4 con eventos de contacto"],
      ["Clientes", "Base de datos para campañas de reventa"],
      ["Redes", "Integración con tus redes sociales"],
      ["Entrega", "7 a 14 días hábiles"],
      ["Velocidad", "95–100 en PageSpeed"],
    ],
  },
  {
    id: "tienda",
    nombre: "Tienda Online",
    ejemplo: "tayoton",
    para: "Para cobrar online las 24 horas",
    incluye: ["Carrito y pagos con {pasarelas}", "Inventario, pedidos y clientes", "Panel con usuarios y permisos"],
    ficha: [
      ["Pagos", "{pasarelas}"],
      ["Gestión", "Inventario, pedidos y CRM de clientes"],
      ["Acceso", "Panel con usuarios y permisos"],
      ["Entrega", "7 a 14 días hábiles"],
      ["Soporte", "Prioritario por WhatsApp"],
      ["Velocidad", "95–100 en PageSpeed"],
    ],
  },
];

export const PLANES_APPS = [
  {
    id: "lanzamiento",
    nombre: "App Lanzamiento",
    ejemplo: "maxgrind",
    para: "Para validar tu idea en las tiendas",
    incluye: ["iPhone y Android a la vez", "Hasta 8 pantallas con registro", "Lista en 2 a 4 semanas"],
    ficha: [
      ["Plataformas", "iOS y Android (una sola base de código)"],
      ["Tecnología", "Flutter"],
      ["Pantallas", "Hasta 8"],
      ["Usuarios", "Registro e inicio de sesión"],
      ["Publicación", "App Store y Google Play, a nombre de tu empresa"],
      ["Entrega", "2 a 4 semanas"],
    ],
  },
  {
    id: "negocio",
    nombre: "App Negocio",
    para: "Para vender desde el celular",
    destacado: "Más elegida",
    incluye: ["Pagos dentro de la app", "Notificaciones push", "Panel para gestionar todo"],
    ficha: [
      ["Pagos", "Dentro de la app"],
      ["Notificaciones", "Push en iOS y Android"],
      ["Administración", "Panel web"],
      ["Analítica", "Uso y conversiones"],
      ["Tecnología", "Flutter"],
      ["Entrega", "4 a 6 semanas"],
    ],
  },
  {
    id: "pro",
    nombre: "App Pro",
    para: "Para operaciones que ya escalan",
    incluye: ["Conexión con tu sistema actual", "Roles y permisos", "Funciona sin internet"],
    ficha: [
      ["Integraciones", "Tu sistema o API"],
      ["Acceso", "Roles y permisos"],
      ["Datos", "Modo sin conexión y tiempo real"],
      ["Soporte", "Prioritario"],
      ["Tecnología", "Flutter"],
      ["Entrega", "6 a 10 semanas"],
    ],
  },
];

// Bajo las tarjetas (components/Incluido.jsx). El hosting y el dominio son permanentes:
// gratis los 3 primeros meses y luego dentro del mantenimiento mensual. Confirmado por
// el dueño: la web y el dominio son del cliente.
export const PROPIEDAD_WEB = "Todo es tuyo: la web y el dominio.";
export const INCLUIDO_WEB = ["Hosting y dominio siempre incluidos", "SSL", "Diseño para celular", "WhatsApp integrado", "Google Analytics"];
