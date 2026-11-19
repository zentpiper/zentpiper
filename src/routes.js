import { index, route } from "@react-router/dev/routes";

// Al añadir una ruta: ver skill nueva-pagina (prerender, sitemap, nav, footer).
export default [
  index("pages/Home.jsx"),
  route("planes", "pages/Planes.jsx"),
  route("mobile", "pages/Mobile.jsx"),
  route("portafolio", "pages/Portafolio.jsx"),
  route("sobre-nosotros", "pages/SobreNosotros.jsx"),
  route("contacto", "pages/Contacto.jsx"),
  route("confirmacion", "pages/Confirmacion.jsx"),
  route("privacidad", "pages/Privacidad.jsx"),
  route("libro-de-reclamaciones", "pages/LibroReclamaciones.jsx"),
  route("*", "pages/NotFound.jsx"),
];
