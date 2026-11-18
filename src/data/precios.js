// ÚNICA fuente de precios, monedas y datos de contacto.
// Si cambias teléfono o email, revisa también src/lib/schema.js (usa estos valores).
// Precios RU = conversión aprox. 1 S/ ≈ 24 ₽ con redondeo comercial (confirmar con el dueño).

export const CONTACTO = {
  // Número principal: WhatsApp de todos los CTA, schema y meta.
  telefono: "+51 945 935 080",
  whatsapp: "51945935080",
  telefono2: "+51 988 490 319",
  email: "zentpiper@gmail.com",
  ciudad: "Santiago de Surco, Lima",
  redes: {
    instagram: "https://www.instagram.com/zentpiper",
    tiktok: "https://www.tiktok.com/@zentpiper",
    facebook: "https://www.facebook.com/zentpiper/",
  },
};

// Espacio que no se corta entre moneda y monto ("S/ 500" nunca queda en dos líneas).
const NBSP = String.fromCharCode(160);

// Meses de mantenimiento gratis incluidos en todos los planes.
export const MESES_GRATIS = 3;

export const PAISES = {
  PE: {
    codigo: "PE",
    nombre: "Perú",
    moneda: "S/",
    separador: ",",
    simboloDespues: false,
    pasarelas: "Niubiz, Culqi y Yape",
    web: {
      esencial: { precio: 500, mensual: 30 },
      negocio: { precio: 900, mensual: 50 },
      profesional: { precio: 1500, mensual: 75 },
      tienda: { precio: 2500, mensual: 120 },
    },
    apps: {
      lanzamiento: { precio: 5900, mensual: 190 },
      negocio: { precio: 9900, mensual: 290 },
      pro: { precio: 15900, mensual: 490 },
    },
  },
  RU: {
    codigo: "RU",
    nombre: "Rusia",
    moneda: "₽",
    separador: NBSP,
    simboloDespues: true,
    pasarelas: "ЮKassa y tarjetas rusas",
    web: {
      esencial: { precio: 11900, mensual: 690 },
      negocio: { precio: 21900, mensual: 1190 },
      profesional: { precio: 35900, mensual: 1790 },
      tienda: { precio: 59900, mensual: 2890 },
    },
    apps: {
      lanzamiento: { precio: 139900, mensual: 4490 },
      negocio: { precio: 234900, mensual: 6890 },
      pro: { precio: 379900, mensual: 11690 },
    },
  },
};

export const PAIS_DEFAULT = "PE";
export const LISTA_PAISES = Object.values(PAISES);

// Formato determinista (sin Intl) para que el HTML prerenderizado y el cliente coincidan.
export function formatearPrecio(valor, codigoPais = PAIS_DEFAULT) {
  const pais = PAISES[codigoPais] ?? PAISES[PAIS_DEFAULT];
  const numero = String(valor).replace(/\B(?=(\d{3})+(?!\d))/g, pais.separador);
  return pais.simboloDespues ? `${numero}${NBSP}${pais.moneda}` : `${pais.moneda}${NBSP}${numero}`;
}

// Precio más bajo / más alto de un grupo ("web" | "apps") en el mercado principal.
// Para textos que no dependen del país elegido: <title>, description y schema.
const preciosDe = (grupo) => Object.values(PAISES[PAIS_DEFAULT][grupo]).map((p) => p.precio);
export const desde = (grupo) => formatearPrecio(Math.min(...preciosDe(grupo)));
export const hasta = (grupo) => formatearPrecio(Math.max(...preciosDe(grupo)));
