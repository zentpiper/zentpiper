// Sitio estático: cada ruta se prerenderiza a HTML en build (ver docs/ESQUEMA.md §2).
// Las rutas que no estén aquí caen en __spa-fallback.html → copiado a 404.html.
export const RUTAS_PUBLICAS = [
  "/",
  "/planes",
  "/mobile",
  "/portafolio",
  "/sobre-nosotros",
  "/contacto",
];

export default {
  appDirectory: "src",
  buildDirectory: "build",
  ssr: false,
  prerender: [...RUTAS_PUBLICAS, "/confirmacion", "/404"],
};
