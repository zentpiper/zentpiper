// Portafolio. `img` = prefijo en public/media (se sirven -480.webp y -800.webp).
// categoria: web | tienda | sistema | app  (filtros de /portafolio)
// resultado: solo cifras confirmadas (testimonio o dato del proyecto). destacado: sale en la home.
// Enlaces externos de clientes: rel="noopener" (sí pasan reputación, son nuestro trabajo).

export const PROYECTOS = [
  {
    id: "naim-marchionni",
    nombre: "Naim Marchionni",
    rubro: "Web de artista",
    descripcion: "Sitio para DJ y productor de Tech House en España.",
    url: "https://www.naimmarchionni.com",
    categoria: "web",
  },
  {
    id: "cegrisa",
    nombre: "Cegrisa Import",
    rubro: "Catálogo web",
    descripcion: "Catálogo de cerámicas con cotización directa por WhatsApp.",
    resultado: "+60% de consultas por WhatsApp",
    url: "https://cegrisa-one.vercel.app",
    categoria: "tienda",
    destacado: true,
  },
  {
    id: "tayoton",
    nombre: "Tayoton Fest",
    rubro: "Web + venta de entradas",
    descripcion: "Web y venta de entradas para un festival de música.",
    resultado: "Entradas agotadas en menos de 24 horas",
    url: "https://tayoton.com",
    categoria: "tienda",
    destacado: true,
  },
  {
    id: "spanglish",
    nombre: "Spanglish Academy",
    rubro: "Web institucional",
    descripcion: "Escuela de idiomas en Rusia.",
    url: "https://www.spanglishac.com",
    categoria: "web",
    destacado: true,
  },
  {
    id: "zentflow",
    nombre: "ZentFlow",
    rubro: "Sistema CRM",
    descripcion: "CRM de ventas y gestión comercial a medida.",
    url: "https://zent-flow.vercel.app",
    categoria: "sistema",
  },
  {
    id: "maxgrind",
    nombre: "MaXGrind",
    rubro: "App móvil",
    descripcion: "App de seguimiento fitness para gimnasio.",
    url: "https://www.maxgrind.app/es",
    categoria: "app",
  },
  {
    id: "ketbia",
    nombre: "KetBia",
    rubro: "Plataforma con pagos",
    descripcion: "Plataforma de coaching con pagos e infraestructura propia.",
    url: "https://www.ketbia.com/",
    categoria: "sistema",
  },
  {
    id: "lima-moscow",
    nombre: "Lima Moscow",
    rubro: "Plataforma de servicios",
    descripcion: "Servicios y comunidad peruano-rusa.",
    url: "https://limamoscow.ru",
    categoria: "web",
  },
  {
    id: "peruana-en-rusia",
    nombre: "Peruana en Rusia",
    rubro: "Blog y comunidad",
    descripcion: "Comunidad para peruanos que viven en Rusia.",
    url: "https://www.peruanaenrusia.com",
    categoria: "web",
  },
  {
    id: "lyfgolosinas",
    nombre: "L & F Golosinas",
    rubro: "Catálogo mayorista",
    descripcion: "Dulcería en Chanchamayo que vende por WhatsApp.",
    url: "https://lyfgolosinas.com",
    categoria: "tienda",
  },
  {
    id: "baronclub",
    nombre: "Barón Club",
    rubro: "Web + reservas",
    descripcion: "Barbería premium en España con reservas y Ads.",
    url: "https://baronclub.es/",
    categoria: "web",
  },
  {
    id: "jhefbarberz",
    nombre: "JHEF Barberz",
    rubro: "Web de marca",
    descripcion: "Barbería peruana con reservas por WhatsApp.",
    url: "https://jhefbarberz.vercel.app/",
    categoria: "web",
  },
  {
    id: "aguxtin",
    nombre: "Aguxtin",
    rubro: "Landing animada",
    descripcion: "Scrollytelling con animaciones y ciclo día/noche.",
    url: "https://aguxtin.com",
    categoria: "web",
  },
  {
    id: "artesana",
    nombre: "El Hada Artesana",
    rubro: "Landing page",
    descripcion: "Landing para negocio artesanal local.",
    url: "",
    categoria: "web",
  },
];

export const CATEGORIAS = [
  { id: "todos", nombre: "Todos" },
  { id: "web", nombre: "Webs" },
  { id: "tienda", nombre: "Tiendas y catálogos" },
  { id: "sistema", nombre: "Sistemas" },
  { id: "app", nombre: "Apps" },
];

export const CLIENTES = PROYECTOS.map((p) => p.nombre);
