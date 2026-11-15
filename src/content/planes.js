// Contenido de los planes. Los precios viven en src/data/precios.js (misma clave).
// `{pasarelas}` se reemplaza por las pasarelas de pago del país seleccionado.

export const PLANES_WEB = [
  {
    id: "esencial",
    nombre: "Esencial",
    para: "Para empezar a vender online",
    incluye: [
      "Web de 1 a 3 secciones",
      "Botón de WhatsApp y formulario",
      "Hosting + dominio + SSL por 1 año",
      "Lista en 3 a 5 días hábiles",
    ],
  },
  {
    id: "negocio",
    nombre: "Negocio",
    para: "Para captar clientes cada día",
    destacado: "Más elegido",
    incluye: [
      "Hasta 6 secciones",
      "Catálogo de productos o servicios",
      "Pedidos y cotizaciones a tu WhatsApp",
      "SEO local para salir en tu ciudad",
      "Todo lo del plan Esencial",
    ],
  },
  {
    id: "profesional",
    nombre: "Profesional",
    para: "Para marcas que quieren crecer",
    incluye: [
      "Hasta 10 secciones",
      "Base de clientes para remarketing",
      "Métricas de visitas en tiempo real",
      "Integración con redes sociales",
      "Todo lo del plan Negocio",
    ],
  },
  {
    id: "tienda",
    nombre: "Tienda Online",
    para: "Para vender y cobrar 24/7",
    incluye: [
      "Carrito y pagos con {pasarelas}",
      "Inventario y gestión de pedidos",
      "Panel con usuarios y permisos",
      "CRM para no perder ningún cliente",
      "Soporte prioritario",
    ],
  },
];

export const PLANES_APPS = [
  {
    id: "lanzamiento",
    nombre: "App Lanzamiento",
    para: "Valida tu idea en las tiendas",
    incluye: [
      "iOS + Android con Flutter",
      "Hasta 8 pantallas",
      "Registro e inicio de sesión",
      "Publicación en App Store y Google Play",
      "Entrega en 2 a 4 semanas",
    ],
  },
  {
    id: "negocio",
    nombre: "App Negocio",
    para: "Para vender desde el celular",
    destacado: "Más elegida",
    incluye: [
      "Pagos dentro de la app",
      "Notificaciones push",
      "Panel de administración",
      "Analítica de uso",
      "Todo lo de App Lanzamiento",
    ],
  },
  {
    id: "pro",
    nombre: "App Pro",
    para: "Para operaciones que escalan",
    incluye: [
      "Integración con tu sistema o API",
      "Roles y permisos",
      "Modo offline y tiempo real",
      "Soporte prioritario",
      "Todo lo de App Negocio",
    ],
  },
];

// Lo que traen todos los planes web (se muestra como chips bajo las tarjetas).
export const INCLUIDO_WEB = [
  "Hosting + dominio 1 año",
  "Certificado SSL",
  "SEO para Google",
  "Diseño para celular",
  "WhatsApp integrado",
  "Google Analytics",
];
