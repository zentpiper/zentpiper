import { Link } from "react-router";
import Icono from "./Icono";
import BotonWhatsApp from "./BotonWhatsApp";
import { CONTACTO } from "../data/precios";

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
          <p>Diseño web, tiendas online y apps que venden. Desde Lima para Perú y Rusia.</p>
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
        {/* Asociado sin pasar autoridad SEO (nofollow): Zentpiper es la entidad principal. */}
        <p>
          Asociado con{" "}
          <a href="https://cernextec.com/es" target="_blank" rel="nofollow noopener">Cernext</a>
        </p>
      </div>
    </footer>
  );
}
