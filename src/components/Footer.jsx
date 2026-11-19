import { Link } from "react-router";
import Icono from "./Icono";
import BotonWhatsApp from "./BotonWhatsApp";
import FichaTecnica from "./FichaTecnica";
import { CONTACTO } from "../data/precios";

// Lo que mostramos de nuestra propia web: la mejor demo para una agencia web.
// Cifras medidas con Lighthouse (docs/RENDIMIENTO.md); actualizar si cambian.
const ESTA_WEB = [
  ["Lighthouse", "100 en rendimiento, accesibilidad, buenas prácticas y SEO"],
  ["Primera pantalla", "Menos de 1 s en un celular con 4G lento"],
  ["Peso inicial", "Sin JavaScript hasta que tocas la página"],
  ["Hosting", "HTML estático en CDN"],
];

const REDES = [
  { nombre: "instagram", label: "Instagram de Zentpiper" },
  { nombre: "tiktok", label: "TikTok de Zentpiper" },
  { nombre: "facebook", label: "Facebook de Zentpiper" },
];

export default function Footer() {
  return (
    <footer className="ftr">
      <div className="container ftr__grid">
        <div className="ftr__marca">
          <Link to="/" className="marca" aria-label="Zentpiper, ir al inicio">
            <img src="/logo.svg" width="30" height="30" alt="" loading="lazy" />
            <span>ZENTPIPER</span>
          </Link>
          <p>Webs, tiendas online y apps para negocios de Perú y Rusia. Desde Santiago de Surco, Lima.</p>
          <BotonWhatsApp className="btn btn--gold btn--sm" origen="footer">
            Cotizar gratis
          </BotonWhatsApp>
        </div>

        <nav aria-label="Servicios">
          <h2 className="ftr__titulo">Servicios</h2>
          <ul>
            <li><Link to="/planes">Páginas web</Link></li>
            <li><Link to="/planes#precios">Tiendas online</Link></li>
            <li><Link to="/mobile">Apps iOS y Android</Link></li>
            <li><Link to="/portafolio">Portafolio</Link></li>
          </ul>
        </nav>

        <nav aria-label="Empresa">
          <h2 className="ftr__titulo">Empresa</h2>
          <ul>
            <li><Link to="/sobre-nosotros">Nosotros</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
          </ul>
        </nav>

        <div>
          <h2 className="ftr__titulo">Contacto</h2>
          <ul className="ftr__contacto">
            <li><Icono nombre="telefono" size={16} /><a href={`tel:${CONTACTO.telefono.replace(/\s/g, "")}`}>{CONTACTO.telefono}</a></li>
            <li><Icono nombre="mail" size={16} /><a href={`mailto:${CONTACTO.email}`}>{CONTACTO.email}</a></li>
            <li><Icono nombre="ubicacion" size={16} /><span>{CONTACTO.ciudad}</span></li>
          </ul>
          <div className="redes">
            {REDES.map((r) => (
              <a key={r.nombre} href={CONTACTO.redes[r.nombre]} target="_blank" rel="noopener" aria-label={r.label}>
                <Icono nombre={r.nombre} size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="container ftr__base">
        <p>© <span suppressHydrationWarning>{new Date().getFullYear()}</span> Zentpiper. Todos los derechos reservados.</p>
        <FichaTecnica titulo="¿Cómo está hecha esta web?" filas={ESTA_WEB} />
        {/* Asociado sin pasar autoridad SEO (nofollow): Zentpiper es la entidad principal. */}
        <p>
          Asociado con{" "}
          <a href="https://cernextec.com/es" target="_blank" rel="nofollow noopener">Cernext</a>
        </p>
        {/* Aviso del Libro de Reclamaciones con ícono: lo exige la ley en la página de inicio. */}
        <nav className="ftr__legal" aria-label="Legal">
          <Link to="/privacidad">Política de privacidad</Link>
          <Link to="/libro-de-reclamaciones" className="libro-ico">
            <Icono nombre="libro" size={18} /> Libro de Reclamaciones
          </Link>
        </nav>
      </div>
    </footer>
  );
}
