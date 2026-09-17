import { Link } from "react-router-dom";
import { usePais } from "../contexts/PaisContext";
import "./Footer.css";

function Footer() {
  const { paisData } = usePais();

  const handleWhatsAppClick = () => {
    const message = "Hola, vengo desde la web de Zentpiper";
    const phone = paisData?.whatsapp || "51988490319";
    const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-redesign">
      <div className="footer-container">
        {/* Availability / Status Badge */}
        <div className="footer-availability">
          <span className="availability-dot" />
          <span className="availability-text">
            AGENCIA DIGITAL // SANTIAGO DE SURCO, LIMA
          </span>
        </div>

        {/* Brand & Action Buttons */}
        <div className="footer-brand-hero">
          <div className="footer-brand-info">
            <Link to="/" className="footer-brand-title-wrap">
              <img
                src="/Logo-transparente.svg"
                alt="Zentpiper"
                className="footer-hex-logo"
                loading="lazy"
                width="44"
                height="44"
              />
              <span className="footer-brand-name">ZENTPIPER</span>
            </Link>
            <p className="footer-brand-description">
              Agencia de diseño web y desarrollo de software en Santiago de Surco, Lima.
              Creamos sitios web profesionales, rápidos y optimizados para SEO.
              Raíces peruanas, con presencia global destacada en Rusia y España.
            </p>
          </div>

          <div className="footer-cta-group">
            <Link to="/contacto" className="footer-cta-primary">
              <span>INICIAR PROYECTO</span>
              <svg
                className="footer-cta-arrow"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>

            <button
              type="button"
              onClick={handleWhatsAppClick}
              className="footer-cta-secondary"
              aria-label="Contactar por WhatsApp"
            >
              <svg
                className="footer-cta-chat-icon"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
              </svg>
              <span>CONTACTAR POR WHATSAPP</span>
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="footer-divider" />

        {/* Columns Grid - 100% Real Site Information */}
        <div className="footer-columns-grid">
          {/* Column 01: Servicios Web */}
          <div className="footer-col">
            <h3 className="footer-col-header">
              <span className="footer-col-num">01</span>
              <span className="footer-col-title">PLANES &amp; SERVICIOS WEB</span>
            </h3>
            <ul className="footer-col-links">
              <li><Link to="/planes">Plan Básico</Link></li>
              <li><Link to="/planes">Plan Emprendedor</Link></li>
              <li><Link to="/planes">Plan Profesional</Link></li>
              <li><Link to="/planes">Tienda Online / E-Commerce</Link></li>
              <li><Link to="/planes">Hosting &amp; Dominio Incluido</Link></li>
              <li><Link to="/planes">Optimización SEO</Link></li>
            </ul>
          </div>

          {/* Column 02: Mobile & Software */}
          <div className="footer-col">
            <h3 className="footer-col-header">
              <span className="footer-col-num">02</span>
              <span className="footer-col-title">MOBILE &amp; SOFTWARE</span>
            </h3>
            <ul className="footer-col-links">
              <li><Link to="/mobile">Aplicaciones Android</Link></li>
              <li><Link to="/mobile">Aplicaciones iOS</Link></li>
              <li><Link to="/mobile">Desarrollo Multiplataforma Flutter</Link></li>
              <li><Link to="/mobile">App Nativa Full</Link></li>
              <li><Link to="/contacto">Software &amp; Proyectos a Medida</Link></li>
              <li><Link to="/portafolio">Portafolio de Trabajos</Link></li>
            </ul>
          </div>

          {/* Column 03: Navegación */}
          <div className="footer-col">
            <h3 className="footer-col-header">
              <span className="footer-col-num">03</span>
              <span className="footer-col-title">NAVEGACIÓN</span>
            </h3>
            <ul className="footer-col-links">
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/portafolio">Portafolio</Link></li>
              <li><Link to="/planes">Planes Web</Link></li>
              <li><Link to="/mobile">Apps Mobile</Link></li>
              <li><Link to="/sobre-nosotros">Sobre Nosotros</Link></li>
              <li><Link to="/contacto">Contacto</Link></li>
            </ul>
          </div>

          {/* Column 04: Contacto */}
          <div className="footer-col footer-col-contact">
            <h3 className="footer-col-header">
              <span className="footer-col-num">04</span>
              <span className="footer-col-title">CONTACTO</span>
            </h3>

            <div className="footer-contact-block">
              <span className="contact-label">UBICACIÓN</span>
              <p className="contact-value">
                Santiago de Surco, Lima, Perú
              </p>
            </div>

            <div className="footer-contact-block">
              <span className="contact-label">CORREO ELECTRÓNICO</span>
              <p className="contact-email">
                <a href="mailto:contacto@zentpiper.com">contacto@zentpiper.com</a>
              </p>
            </div>

            <div className="footer-contact-block">
              <span className="contact-label">TELÉFONO / WHATSAPP</span>
              <p className="contact-value">
                <a href={`tel:${paisData?.telefono?.replace(/\s+/g, '')}`}>
                  {paisData?.telefono || "+51 988 490 319"}
                </a>
              </p>
              <p className="contact-value">
                <a href={`tel:${paisData?.telefono2?.replace(/\s+/g, '')}`}>
                  {paisData?.telefono2 || "+51 945 935 080"}
                </a>
              </p>
            </div>

            <div className="footer-response-badge">
              <span>Atención directa por WhatsApp</span>
            </div>
          </div>
        </div>

        {/* Social / Transmission Bar - Strictly user-provided URLs */}
        <div className="footer-transmission-bar">
          <div className="transmission-info">
            <span className="transmission-label">REDES SOCIALES</span>
            <p className="transmission-subtext">
              Síguenos en nuestras plataformas oficiales.
            </p>
          </div>

          <div className="transmission-links">
            <a
              href="https://www.instagram.com/zentpiper"
              target="_blank"
              rel="noopener noreferrer"
              className="transmission-pill"
            >
              <svg className="transmission-pill-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
              <span>INSTAGRAM / @ZENTPIPER</span>
            </a>
            <a
              href="https://www.tiktok.com/@zentpiper"
              target="_blank"
              rel="noopener noreferrer"
              className="transmission-pill"
            >
              <svg className="transmission-pill-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.68a6.34 6.34 0 0 0 10.86 4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-2.04-.54z" />
              </svg>
              <span>TIKTOK / @ZENTPIPER</span>
            </a>
            <a
              href="https://www.facebook.com/zentpiper/"
              target="_blank"
              rel="noopener noreferrer"
              className="transmission-pill"
            >
              <svg className="transmission-pill-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
              <span>FACEBOOK / @ZENTPIPER</span>
            </a>
          </div>
        </div>

        {/* Real Brand Values Strip */}
        <div className="footer-trust-strip">
          <span className="trust-item">✦ RAÍCES PERUANAS</span>
          <span className="trust-item">✦ DISEÑO WEB &amp; SOFTWARE</span>
          <span className="trust-item">✦ OPTIMIZADO PARA SEO</span>
          <span className="trust-item trust-item-edge">
            <span className="edge-dot" /> ATENCIÓN EN PERÚ, CHILE E INTERNACIONAL
          </span>
        </div>

        {/* Bottom Row & Credits */}
        <div className="footer-bottom-row">
          <div className="footer-legal-left">
            <p className="legal-copyright">
              © {currentYear} ZENTPIPER. TODOS LOS DERECHOS RESERVADOS.
            </p>
            <p className="legal-manifesto">
              Agencia de Diseño Web, Software y SEO con raíces peruanas y presencia global.
            </p>
            {/* Same-line Credits: Barclay Leach + Zentpiper, then Cernext strictly after */}
            <p className="footer-credits-line">
              Hecho por{" "}
              <a href="https://barclayleach.com/es/" target="_blank" rel="noopener noreferrer">
                Barclay Leach
              </a>{" "}
              impulsando{" "}
              <a href="https://www.zentpiper.com/">
                Zentpiper
              </a>{" "}
              · Impulsado por{" "}
              <a href="https://cernextec.com/es" target="_blank" rel="noopener noreferrer">
                Cernext
              </a>
            </p>
          </div>

          <div className="footer-legal-right">
            <Link to="/portafolio" className="legal-link">PORTAFOLIO</Link>
            <Link to="/planes" className="legal-link">PLANES</Link>
            <Link to="/contacto" className="legal-link">CONTACTO</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
