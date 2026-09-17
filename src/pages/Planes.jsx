import { useNavigate } from "react-router-dom";
import { usePais } from "../contexts/PaisContext";
import SEO from "../components/SEO";
import "./Planes.css";

// Zero-dependency, vector precision SVG icons (Lucide & Heroicons standard specs)
const PlanIcons = {
  check: (
    <svg className="plan-svg-icon icon-success" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
    </svg>
  ),
  cross: (
    <svg className="plan-svg-icon icon-disabled" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
    </svg>
  ),
  bolt: (
    <svg className="plan-svg-icon icon-amber" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M11.983 1.5a.75.75 0 00-1.292-.614l-6.5 8.25a.75.75 0 00.59 1.214h4.786l-1.547 7.734a.75.75 0 001.326.586l6.5-8.25a.75.75 0 00-.59-1.214h-4.786l1.413-7.706z" />
    </svg>
  ),
  speed: (
    <svg className="plan-svg-icon icon-amber" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M10 1a9 9 0 100 18 9 9 0 000-18zm0 2.5a6.5 6.5 0 00-6.19 8.442.75.75 0 11-1.42.493A8 8 0 1118 10a7.97 7.97 0 01-1.39 4.435.75.75 0 11-1.22-.87A6.5 6.5 0 0010 3.5zm1.53 4.22a.75.75 0 00-1.06 0L8.22 10.03a1.5 1.5 0 102.12 2.12l2.31-2.25a.75.75 0 000-1.06z" clipRule="evenodd" />
    </svg>
  ),
  verified: (
    <svg className="plan-svg-icon icon-success" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
    </svg>
  ),
  star: (
    <svg className="plan-svg-icon icon-amber" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.402z" clipRule="evenodd" />
    </svg>
  ),
  crown: (
    <svg className="plan-svg-icon icon-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7z" />
      <path d="M5 20h14" />
    </svg>
  ),
  lock: (
    <svg className="plan-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  shield: (
    <svg className="plan-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    </svg>
  ),
  clock: (
    <svg className="plan-svg-icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clipRule="evenodd" />
    </svg>
  ),
  arrowRight: (
    <svg className="plan-svg-icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
    </svg>
  ),
  arrowUpRight: (
    <svg className="plan-svg-icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
    </svg>
  ),
  externalLink: (
    <svg className="plan-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  ),
  table: (
    <svg className="plan-svg-icon icon-amber" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M2 4.75C2 3.784 2.784 3 3.75 3h12.5c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0116.25 17H3.75A1.75 1.75 0 012 15.25V4.75zm1.5.75v3.25h5.75V5.5H3.5zm7.25 0v3.25h5.75V5.5h-5.75zM3.5 10.25v4.5h5.75v-4.5H3.5zm7.25 0v4.5h5.75v-4.5h-5.75z" clipRule="evenodd" />
    </svg>
  ),
  engineering: (
    <svg className="plan-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  whatsapp: (
    <svg className="plan-svg-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.175.346-.219.462-.219s.231.006.331.011c.108.005.25-.041.391.299.144.349.491 1.199.534 1.286.043.087.072.188.014.303-.058.116-.087.188-.173.289l-.26.302c-.087.098-.178.204-.077.377.101.173.451.745.968 1.206.666.594 1.228.778 1.401.865.173.087.275.072.376-.044.101-.116.433-.505.549-.679.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.203c.043.072.043.419-.101.824z"/>
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 1.892.527 3.662 1.448 5.178L2 22l4.981-1.306A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.154c-1.611 0-3.13-.45-4.433-1.233l-.317-.19-3.298.865.88-3.214-.207-.33A8.136 8.136 0 013.846 12C3.846 7.505 7.505 3.846 12 3.846S20.154 7.505 20.154 12 16.495 20.154 12 20.154z" clipRule="evenodd" />
    </svg>
  ),
  // Matrix row icons
  layers: (
    <svg className="table-row-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="12 2 2 7 12 12 22 7 12 2"/>
      <polyline points="2 17 12 22 22 17"/>
      <polyline points="2 12 12 17 22 12"/>
    </svg>
  ),
  cloud: (
    <svg className="table-row-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
    </svg>
  ),
  chat: (
    <svg className="table-row-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>
    </svg>
  ),
  lockRow: (
    <svg className="table-row-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  ),
  devices: (
    <svg className="table-row-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2"/>
      <path d="M12 18h.01"/>
    </svg>
  ),
  catalog: (
    <svg className="table-row-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="7" height="7" x="3" y="3" rx="1"/>
      <rect width="7" height="7" x="14" y="3" rx="1"/>
      <rect width="7" height="7" x="14" y="14" rx="1"/>
      <rect width="7" height="7" x="3" y="14" rx="1"/>
    </svg>
  ),
  search: (
    <svg className="table-row-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8"/>
      <path d="m21 21-4.3-4.3"/>
    </svg>
  ),
  database: (
    <svg className="table-row-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <ellipse cx="12" cy="5" rx="9" ry="3"/>
      <path d="M3 5V19A9 3 0 0 0 21 19V5"/>
      <path d="M3 12A9 3 0 0 0 21 12"/>
    </svg>
  ),
  analytics: (
    <svg className="table-row-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 3v18h18"/>
      <path d="m19 9-5 5-4-4-3 3"/>
    </svg>
  ),
  share: (
    <svg className="table-row-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="18" cy="5" r="3"/>
      <circle cx="6" cy="12" r="3"/>
      <circle cx="18" cy="19" r="3"/>
      <line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/>
      <line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/>
    </svg>
  ),
  inventory: (
    <svg className="table-row-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m7.5 4.27 9 5.15"/>
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>
      <path d="m3.3 7 8.7 5 8.7-5"/>
      <path d="M12 22V12"/>
    </svg>
  ),
  crm: (
    <svg className="table-row-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  creditCard: (
    <svg className="table-row-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="14" x="2" y="5" rx="2"/>
      <line x1="2" x2="22" y1="10" y2="10"/>
    </svg>
  ),
  users: (
    <svg className="table-row-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="18" height="18" x="3" y="3" rx="2"/>
      <path d="M7 7h.01"/>
      <path d="M17 7h.01"/>
      <path d="M7 17h.01"/>
      <path d="M17 17h.01"/>
    </svg>
  )
};

function Planes() {
  const navigate = useNavigate();
  const { paisSeleccionado, moneda, whatsapp } = usePais();

  const handleWhatsAppDirect = (nombrePlan) => {
    const phone = whatsapp || "51988490319";
    const msg = `Hola Zentpiper, deseo solicitar en privado la propuesta de inversion y alcance tecnico para el ${nombrePlan} (${paisSeleccionado}). Deseo agendar una evaluacion tecnica confidencial.`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
  };

  const handleCotizar = (nombrePlan = "Propuesta Personalizada") => {
    navigate("/contacto", {
      state: {
        asunto: nombrePlan,
        pais: paisSeleccionado,
        moneda: moneda
      },
    });

    setTimeout(() => {
      const formElement = document.getElementById("contacto-form-container");
      if (formElement) {
        formElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, 100);
  };

  return (
    <>
      <SEO
        title="Planes de Desarrollo y Arquitectura Web | Zentpiper Software"
        description="Plataformas digitales de alto rendimiento y arquitectura reservada. Evaluacion tecnica, hosting dedicado y soporte especializado bajo solicitud."
        keywords="planes diseño web, arquitectura software a medida, desarrollo web exclusivo, plataformas saas, ingenieria digital corporativa"
        canonical="https://zentpiper.com/planes"
      />

      <div className="planes-page-wrapper">
        {/* Ambient volumetric glow backdrops */}
        <div className="planes-ambient-backdrop" aria-hidden="true">
          <div className="ambient-orb ambient-orb-top"></div>
          <div className="ambient-orb ambient-orb-left"></div>
          <div className="ambient-orb ambient-orb-right"></div>
        </div>

        {/* 1. HERO SECTION */}
        <section className="planes-hero-section">
          <div className="planes-hero-art" aria-hidden="true">
            <img
              src="/planes/hero-abstract-bg.jpg"
              alt="Obsidian and Amber Hero Abstract Art"
              className="hero-art-img"
              loading="eager"
            />
            <div className="hero-art-vignette"></div>
            <div className="hero-brand-watermark">
              <img
                src="/Logo-definitivo-Isotipo.webp"
                alt="Zentpiper Isotipo Mark"
                className="watermark-img"
              />
            </div>
          </div>

          <div className="planes-hero-content">
            <div className="planes-pill-badge">
              <span className="pulsing-amber-dot"></span>
              <span className="pill-primary">Modelos de Inversión Tecnológica</span>
              <span className="pill-sep">|</span>
              <span className="pill-secondary">Desarrollo a Medida</span>
            </div>

            <h1 className="planes-hero-headline">
              Arquitectura Web de Alto Rendimiento Diseñada para{" "}
              <span className="planes-headline-gradient">Escalar su Facturación</span>
            </h1>

            <p className="planes-hero-subtitle">
              Elimine intermediarios obsoletos. Implementamos plataformas digitales ultrarrápidas,
              blindadas y calibradas para conversión directa y sistemas comerciales de
              misión crítica.
            </p>

            <div className="planes-guarantees-grid">
              <div className="guarantee-card">
                {PlanIcons.bolt}
                <span>Arquitectura 99.9% Reactiva</span>
              </div>
              <div className="guarantee-card">
                {PlanIcons.speed}
                <span>Google PageSpeed 95+</span>
              </div>
              <div className="guarantee-card">
                {PlanIcons.verified}
                <span>3 Meses Soporte Incluido</span>
              </div>
            </div>
          </div>
        </section>

        {/* 2. FOUR-TIER PRICING MATRIX WITHOUT EXPLICIT PRICES */}
        <section className="planes-cards-section">
          <div className="planes-cards-grid">
            {/* TIER 1: PLAN BÁSICO */}
            <article className="tier-card tier-card-standard">
              <div className="tier-image-wrap">
                <img
                  src="/planes/plan-basico.jpg"
                  alt="Plan Básico Zentpiper - iPhone Mockup Institucional"
                  className="tier-mockup-img"
                  loading="lazy"
                />
                <div className="tier-image-overlay"></div>
                <span className="tier-level-chip">NIVEL 01 · Iniciar</span>
              </div>

              <div className="tier-content">
                <div className="tier-header-block">
                  <h2 className="tier-name">Plan Básico</h2>
                  <p className="tier-tagline">
                    Presencia institucional concisa y ultra optimizada para validar su oferta con máxima sobriedad.
                  </p>
                </div>

                {/* Mysterious investment box */}
                <div className="tier-mystery-box">
                  <div className="mystery-badge-row">
                    <span className="mystery-icon-wrap">{PlanIcons.lock}</span>
                    <span className="mystery-status-pill">Tarifa Bajo Solicitud</span>
                  </div>
                  <div className="mystery-headline">Inversión a Medida</div>
                  <span className="mystery-caption">Calibrada a los requerimientos técnicos de su marca</span>
                </div>

                <div className="tier-maintenance-strip">
                  <div className="maint-icon-wrap">{PlanIcons.verified}</div>
                  <div className="maint-info">
                    <span className="maint-price">Garantía &amp; Soporte Activo</span>
                    <span className="maint-badge">3 meses 100% incluidos</span>
                  </div>
                </div>

                <div className="tier-features-list">
                  {/* Included */}
                  <div className="feature-item included">
                    {PlanIcons.check}
                    <span>1 a 3 Secciones Web Profesionales</span>
                  </div>
                  <div className="feature-item included">
                    {PlanIcons.check}
                    <span>Hosting de alta velocidad &amp; Dominio</span>
                  </div>
                  <div className="feature-item included">
                    {PlanIcons.check}
                    <span>Soporte directo vía WhatsApp</span>
                  </div>
                  <div className="feature-item included">
                    {PlanIcons.check}
                    <span>Certificado de seguridad SSL activo</span>
                  </div>
                  <div className="feature-item included">
                    {PlanIcons.check}
                    <span>Diseño 100% responsivo y adaptativo</span>
                  </div>
                  {/* Locked */}
                  <div className="feature-item locked">
                    {PlanIcons.cross}
                    <span>Catálogo interactivo móvil</span>
                  </div>
                  <div className="feature-item locked">
                    {PlanIcons.cross}
                    <span>Captura de cotizaciones a WhatsApp</span>
                  </div>
                  <div className="feature-item locked">
                    {PlanIcons.cross}
                    <span>Posicionamiento SEO de conquista</span>
                  </div>
                  <div className="feature-item locked">
                    {PlanIcons.cross}
                    <span>Automatización &amp; base de datos</span>
                  </div>
                  <div className="feature-item locked">
                    {PlanIcons.cross}
                    <span>CRM y Pasarelas de cobro online</span>
                  </div>
                </div>

                <div className="tier-actions">
                  <button
                    className="tier-btn tier-btn-outline"
                    onClick={() => handleWhatsAppDirect("Plan Básico")}
                  >
                    <span>Consultar Inversión en Privado</span>
                    {PlanIcons.arrowRight}
                  </button>
                  <button
                    className="tier-btn tier-btn-ghost"
                    onClick={() => window.open("https://www.naimmarchionni.com", "_blank", "noopener,noreferrer")}
                  >
                    <span>Ver Ejemplo en Vivo</span>
                    {PlanIcons.externalLink}
                  </button>
                </div>
              </div>
            </article>

            {/* TIER 2: PLAN AVANZADO (MÁS POPULAR) */}
            <article className="tier-card tier-card-featured">
              <div className="tier-featured-pill">
                {PlanIcons.star}
                <span>MÁS POPULAR</span>
              </div>

              <div className="tier-image-wrap">
                <img
                  src="/planes/plan-avanzado.jpg"
                  alt="Plan Avanzado Zentpiper - Mockup iPhone y MacBook Catálogo"
                  className="tier-mockup-img"
                  loading="lazy"
                />
                <div className="tier-image-overlay"></div>
                <span className="tier-level-chip chip-gold">NIVEL 02 · El más elegido</span>
              </div>

              <div className="tier-content">
                <div className="tier-header-block">
                  <div className="tier-name-row">
                    <h2 className="tier-name tier-name-highlight">Plan Avanzado</h2>
                    <span className="tier-star-badge">{PlanIcons.star}</span>
                  </div>
                  <p className="tier-tagline">
                    Canal de conversión activa con captación directa de leads por WhatsApp y catálogo dinámico.
                  </p>
                </div>

                {/* Mysterious investment box */}
                <div className="tier-mystery-box mystery-box-gold">
                  <div className="mystery-badge-row">
                    <span className="mystery-icon-wrap icon-gold">{PlanIcons.bolt}</span>
                    <span className="mystery-status-pill pill-gold">Disponibilidad Preferencial</span>
                  </div>
                  <div className="mystery-headline mystery-headline-gold">Inversión Estratégica</div>
                  <span className="mystery-caption">Cupos de lanzamiento limitados por ciclo operativo</span>
                </div>

                <div className="tier-maintenance-strip maint-gold">
                  <div className="maint-icon-wrap maint-icon-gold">{PlanIcons.verified}</div>
                  <div className="maint-info">
                    <span className="maint-price maint-price-gold">Garantía &amp; Cobertura Total</span>
                    <span className="maint-badge maint-badge-gold">3 meses 100% incluidos</span>
                  </div>
                </div>

                <div className="tier-features-list">
                  {/* Included */}
                  <div className="feature-item included">
                    {PlanIcons.check}
                    <span>4 a 6 Secciones Web de Alto Impacto</span>
                  </div>
                  <div className="feature-item included">
                    {PlanIcons.check}
                    <span>Hosting de alta velocidad &amp; Dominio</span>
                  </div>
                  <div className="feature-item included">
                    {PlanIcons.check}
                    <span>Soporte directo vía WhatsApp</span>
                  </div>
                  <div className="feature-item included">
                    {PlanIcons.check}
                    <span>Certificado SSL &amp; blindaje de navegación</span>
                  </div>
                  <div className="feature-item included">
                    {PlanIcons.check}
                    <span>Diseño 100% responsivo y adaptativo</span>
                  </div>
                  <div className="feature-item included highlighted">
                    {PlanIcons.bolt}
                    <span className="text-highlight">Catálogo interactivo optimizado móvil</span>
                  </div>
                  <div className="feature-item included highlighted">
                    {PlanIcons.bolt}
                    <span className="text-highlight">Captura directa de cotizaciones a WhatsApp</span>
                  </div>
                  <div className="feature-item included highlighted">
                    {PlanIcons.bolt}
                    <span className="text-highlight">Estructura y posicionamiento SEO competitivo</span>
                  </div>
                  {/* Locked */}
                  <div className="feature-item locked">
                    {PlanIcons.cross}
                    <span>Base de datos automatizada</span>
                  </div>
                  <div className="feature-item locked">
                    {PlanIcons.cross}
                    <span>CRM y Pasarelas de cobro online</span>
                  </div>
                </div>

                <div className="tier-actions">
                  <button
                    className="tier-btn tier-btn-gold"
                    onClick={() => handleWhatsAppDirect("Plan Avanzado (Más Popular)")}
                  >
                    <span>Desbloquear Propuesta Avanzada</span>
                    {PlanIcons.bolt}
                  </button>
                  <button
                    className="tier-btn tier-btn-ghost"
                    onClick={() => window.open("https://cegrisa-one.vercel.app", "_blank", "noopener,noreferrer")}
                  >
                    <span>Ver Ejemplo en Vivo</span>
                    {PlanIcons.externalLink}
                  </button>
                </div>
              </div>
            </article>

            {/* TIER 3: PLAN EMPRENDEDOR */}
            <article className="tier-card tier-card-standard">
              <div className="tier-image-wrap">
                <img
                  src="/planes/plan-emprendedor.jpg"
                  alt="Plan Emprendedor Zentpiper - Mockup Multi-dispositivo SaaS Analytics"
                  className="tier-mockup-img"
                  loading="lazy"
                />
                <div className="tier-image-overlay"></div>
                <span className="tier-level-chip chip-amber">NIVEL 03 · Escala</span>
              </div>

              <div className="tier-content">
                <div className="tier-header-block">
                  <h2 className="tier-name">Plan Emprendedor</h2>
                  <p className="tier-tagline">
                    Ecosistema de captación masiva con analítica de comportamiento y base de datos reactiva.
                  </p>
                </div>

                {/* Mysterious investment box */}
                <div className="tier-mystery-box">
                  <div className="mystery-badge-row">
                    <span className="mystery-icon-wrap icon-amber">{PlanIcons.shield}</span>
                    <span className="mystery-status-pill pill-amber">Sprint Asignado</span>
                  </div>
                  <div className="mystery-headline">Presupuesto a Medida</div>
                  <span className="mystery-caption">Estructurado por arquitectura y módulos de captación</span>
                </div>

                <div className="tier-maintenance-strip">
                  <div className="maint-icon-wrap">{PlanIcons.verified}</div>
                  <div className="maint-info">
                    <span className="maint-price">Infraestructura Cloud &amp; Garantía</span>
                    <span className="maint-badge">3 meses 100% incluidos</span>
                  </div>
                </div>

                <div className="tier-features-list">
                  {/* Included */}
                  <div className="feature-item included">
                    {PlanIcons.check}
                    <span>Hasta 10 Secciones Web Arquitectónicas</span>
                  </div>
                  <div className="feature-item included">
                    {PlanIcons.check}
                    <span>Hosting Cloud de Alto Tráfico &amp; Dominio</span>
                  </div>
                  <div className="feature-item included">
                    {PlanIcons.check}
                    <span>Soporte directo por WhatsApp prioritario</span>
                  </div>
                  <div className="feature-item included">
                    {PlanIcons.check}
                    <span>Certificado SSL &amp; Reglas Firewall Cloud</span>
                  </div>
                  <div className="feature-item included">
                    {PlanIcons.check}
                    <span>Diseño 100% responsivo y adaptativo</span>
                  </div>
                  <div className="feature-item included">
                    {PlanIcons.check}
                    <span>Catálogo de productos y servicios</span>
                  </div>
                  <div className="feature-item included">
                    {PlanIcons.check}
                    <span>Captura inteligente a WhatsApp</span>
                  </div>
                  <div className="feature-item included">
                    {PlanIcons.check}
                    <span>Posicionamiento SEO con microdatos</span>
                  </div>
                  <div className="feature-item included highlighted">
                    {PlanIcons.bolt}
                    <span className="text-highlight">Base de datos de prospectos &amp; campañas</span>
                  </div>
                  <div className="feature-item included highlighted">
                    {PlanIcons.bolt}
                    <span className="text-highlight">Métricas de conversión en tiempo real</span>
                  </div>
                  <div className="feature-item included highlighted">
                    {PlanIcons.bolt}
                    <span className="text-highlight">Integración multicanal de redes</span>
                  </div>
                  {/* Locked */}
                  <div className="feature-item locked">
                    {PlanIcons.cross}
                    <span>Gestión de inventario sincronizado</span>
                  </div>
                  <div className="feature-item locked">
                    {PlanIcons.cross}
                    <span>CRM &amp; Pasarelas de cobro online</span>
                  </div>
                </div>

                <div className="tier-actions">
                  <button
                    className="tier-btn tier-btn-outline"
                    onClick={() => handleWhatsAppDirect("Plan Emprendedor")}
                  >
                    <span>Solicitar Análisis de Inversión</span>
                    {PlanIcons.arrowUpRight}
                  </button>
                  <button
                    className="tier-btn tier-btn-ghost"
                    onClick={() => window.open("https://www.spanglishac.com", "_blank", "noopener,noreferrer")}
                  >
                    <span>Ver Ejemplo en Vivo</span>
                    {PlanIcons.externalLink}
                  </button>
                </div>
              </div>
            </article>

            {/* TIER 4: PLAN CORPORATIVO */}
            <article className="tier-card tier-card-vip">
              <div className="tier-image-wrap">
                <img
                  src="/planes/plan-corporativo.jpg"
                  alt="Plan Corporativo Zentpiper - Mockup Ecosistema Fintech VIP"
                  className="tier-mockup-img"
                  loading="lazy"
                />
                <div className="tier-image-overlay"></div>
                <span className="tier-level-chip chip-vip">NIVEL 04 · Empresarial a Medida</span>
              </div>

              <div className="tier-content">
                <div className="tier-header-block">
                  <div className="tier-name-row">
                    <h2 className="tier-name">Plan Corporativo</h2>
                    <span className="tier-vip-crown" title="Modalidad VIP">{PlanIcons.crown}</span>
                  </div>
                  <p className="tier-tagline">
                    Suite completa con comercio electrónico, pasarelas de pago, CRM automatizado y roles multi-usuario.
                  </p>
                </div>

                {/* Mysterious investment box */}
                <div className="tier-mystery-box mystery-box-vip">
                  <div className="mystery-badge-row">
                    <span className="mystery-icon-wrap icon-gold">{PlanIcons.crown}</span>
                    <span className="mystery-status-pill pill-vip">Acuerdo Confidencial</span>
                  </div>
                  <div className="mystery-headline mystery-headline-vip">Propuesta Enterprise VIP</div>
                  <span className="mystery-caption">Sujeta a consultoría privada y alcance contractual</span>
                </div>

                <div className="tier-maintenance-strip maint-vip">
                  <div className="maint-icon-wrap maint-icon-gold">{PlanIcons.verified}</div>
                  <div className="maint-info">
                    <span className="maint-price maint-price-gold">Soporte Dedicado &amp; SLA 24/7</span>
                    <span className="maint-badge maint-badge-vip">3 meses soporte VIP incluido</span>
                  </div>
                </div>

                <div className="tier-features-list">
                  {/* All 100% Unlocked */}
                  <div className="feature-item included">
                    {PlanIcons.check}
                    <span>Secciones Ilimitadas Diseñadas a Medida</span>
                  </div>
                  <div className="feature-item included">
                    {PlanIcons.check}
                    <span>Infraestructura Dedicada &amp; Dominio VIP</span>
                  </div>
                  <div className="feature-item included highlighted">
                    {PlanIcons.verified}
                    <span className="text-highlight">Soporte 24/7 con Ingeniero Asignado</span>
                  </div>
                  <div className="feature-item included">
                    {PlanIcons.check}
                    <span>Certificado SSL Wildcard &amp; Blindaje</span>
                  </div>
                  <div className="feature-item included">
                    {PlanIcons.check}
                    <span>Diseño 100% Responsivo Ultra Optimizado</span>
                  </div>
                  <div className="feature-item included">
                    {PlanIcons.check}
                    <span>Catálogos con inventario sincrónico</span>
                  </div>
                  <div className="feature-item included">
                    {PlanIcons.check}
                    <span>Enrutamiento inteligente a WhatsApp</span>
                  </div>
                  <div className="feature-item included">
                    {PlanIcons.check}
                    <span>SEO Corporativo para dominar el nicho</span>
                  </div>
                  <div className="feature-item included">
                    {PlanIcons.check}
                    <span>Base de datos escalable en tiempo real</span>
                  </div>
                  <div className="feature-item included">
                    {PlanIcons.check}
                    <span>Dashboard analítico predictivo</span>
                  </div>
                  <div className="feature-item included highlighted">
                    {PlanIcons.bolt}
                    <span className="text-highlight">Pasarelas de Cobro (Culqi, Niubiz, Stripe)</span>
                  </div>
                  <div className="feature-item included highlighted">
                    {PlanIcons.bolt}
                    <span className="text-highlight">CRM Comercial Integrado automatizado</span>
                  </div>
                  <div className="feature-item included highlighted">
                    {PlanIcons.bolt}
                    <span className="text-highlight">Panel Multi-usuario con Roles y Permisos</span>
                  </div>
                </div>

                <div className="tier-actions">
                  <button
                    className="tier-btn tier-btn-vip"
                    onClick={() => handleWhatsAppDirect("Plan Corporativo (Empresarial VIP)")}
                  >
                    <span>Solicitar Propuesta Confidencial</span>
                    {PlanIcons.crown}
                  </button>
                  <button
                    className="tier-btn tier-btn-ghost"
                    onClick={() => window.open("https://zent-flow.vercel.app", "_blank", "noopener,noreferrer")}
                  >
                    <span>Ver Ejemplo en Vivo</span>
                    {PlanIcons.externalLink}
                  </button>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* 3. DETAILED CAPABILITY COMPARISON MATRIX */}
        <section className="planes-matrix-section">
          <div className="matrix-header">
            <div className="matrix-badge">
              {PlanIcons.table}
              <span>Auditoría Arquitectónica</span>
            </div>
            <h2 className="matrix-title">Matriz Completa de Capacidades</h2>
            <p className="matrix-subtitle">
              Contraste directo de los límites operacionales, módulos tecnológicos y alcance de
              ingeniería de cada modalidad.
            </p>
          </div>

          <div className="matrix-table-container">
            <table className="matrix-table">
              <thead>
                <tr>
                  <th className="th-spec">Especificación Técnica</th>
                  <th className="th-plan">Básico</th>
                  <th className="th-plan th-plan-highlight">
                    <span className="th-title-flex">
                      Avanzado
                      {PlanIcons.star}
                    </span>
                  </th>
                  <th className="th-plan">Emprendedor</th>
                  <th className="th-plan th-plan-vip">
                    <span className="th-title-flex">
                      Corporativo
                      {PlanIcons.crown}
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="td-spec">
                    <span className="spec-item-with-icon">
                      {PlanIcons.layers}
                      <span className="spec-name">Secciones Web Arquitectónicas</span>
                    </span>
                  </td>
                  <td className="td-val">1 a 3</td>
                  <td className="td-val td-highlight">4 a 6</td>
                  <td className="td-val">Hasta 10</td>
                  <td className="td-val td-vip font-bold">Ilimitadas a medida</td>
                </tr>

                <tr>
                  <td className="td-spec">
                    <span className="spec-item-with-icon">
                      {PlanIcons.cloud}
                      <span className="spec-name">Hosting de Alta Velocidad &amp; Dominio</span>
                    </span>
                  </td>
                  <td className="td-val">{PlanIcons.check}</td>
                  <td className="td-val td-highlight">{PlanIcons.check}</td>
                  <td className="td-val">{PlanIcons.check}</td>
                  <td className="td-val td-vip">{PlanIcons.check}</td>
                </tr>

                <tr>
                  <td className="td-spec">
                    <span className="spec-item-with-icon">
                      {PlanIcons.chat}
                      <span className="spec-name">Soporte WhatsApp</span>
                    </span>
                  </td>
                  <td className="td-val">Estándar</td>
                  <td className="td-val td-highlight">Estándar</td>
                  <td className="td-val text-amber">Prioritario</td>
                  <td className="td-val td-vip font-bold">24/7 VIP Dedicado</td>
                </tr>

                <tr>
                  <td className="td-spec">
                    <span className="spec-item-with-icon">
                      {PlanIcons.lockRow}
                      <span className="spec-name">Certificado de Seguridad SSL</span>
                    </span>
                  </td>
                  <td className="td-val">{PlanIcons.check}</td>
                  <td className="td-val td-highlight">{PlanIcons.check}</td>
                  <td className="td-val">{PlanIcons.check}</td>
                  <td className="td-val td-vip">{PlanIcons.check}</td>
                </tr>

                <tr>
                  <td className="td-spec">
                    <span className="spec-item-with-icon">
                      {PlanIcons.devices}
                      <span className="spec-name">Diseño Adaptativo Móvil / Desktop</span>
                    </span>
                  </td>
                  <td className="td-val">{PlanIcons.check}</td>
                  <td className="td-val td-highlight">{PlanIcons.check}</td>
                  <td className="td-val">{PlanIcons.check}</td>
                  <td className="td-val td-vip">{PlanIcons.check}</td>
                </tr>

                <tr>
                  <td className="td-spec">
                    <span className="spec-item-with-icon">
                      {PlanIcons.catalog}
                      <span className="spec-name">Catálogo Interactivo de Soluciones</span>
                    </span>
                  </td>
                  <td className="td-val">{PlanIcons.cross}</td>
                  <td className="td-val td-highlight">{PlanIcons.check}</td>
                  <td className="td-val">{PlanIcons.check}</td>
                  <td className="td-val td-vip">{PlanIcons.check}</td>
                </tr>

                <tr>
                  <td className="td-spec">
                    <span className="spec-item-with-icon">
                      {PlanIcons.chat}
                      <span className="spec-name">Captura de Cotizaciones a WhatsApp</span>
                    </span>
                  </td>
                  <td className="td-val">{PlanIcons.cross}</td>
                  <td className="td-val td-highlight">{PlanIcons.check}</td>
                  <td className="td-val">{PlanIcons.check}</td>
                  <td className="td-val td-vip">{PlanIcons.check}</td>
                </tr>

                <tr>
                  <td className="td-spec">
                    <span className="spec-item-with-icon">
                      {PlanIcons.search}
                      <span className="spec-name">Posicionamiento SEO Técnico</span>
                    </span>
                  </td>
                  <td className="td-val">{PlanIcons.cross}</td>
                  <td className="td-val td-highlight">{PlanIcons.check}</td>
                  <td className="td-val">{PlanIcons.check}</td>
                  <td className="td-val td-vip">{PlanIcons.check}</td>
                </tr>

                <tr>
                  <td className="td-spec">
                    <span className="spec-item-with-icon">
                      {PlanIcons.database}
                      <span className="spec-name">Base de Datos Reactiva Prospectos</span>
                    </span>
                  </td>
                  <td className="td-val">{PlanIcons.cross}</td>
                  <td className="td-val td-highlight">{PlanIcons.cross}</td>
                  <td className="td-val">{PlanIcons.check}</td>
                  <td className="td-val td-vip">{PlanIcons.check}</td>
                </tr>

                <tr>
                  <td className="td-spec">
                    <span className="spec-item-with-icon">
                      {PlanIcons.analytics}
                      <span className="spec-name">Métricas &amp; Analítica en Vivo</span>
                    </span>
                  </td>
                  <td className="td-val">{PlanIcons.cross}</td>
                  <td className="td-val td-highlight">{PlanIcons.cross}</td>
                  <td className="td-val">{PlanIcons.check}</td>
                  <td className="td-val td-vip">{PlanIcons.check}</td>
                </tr>

                <tr>
                  <td className="td-spec">
                    <span className="spec-item-with-icon">
                      {PlanIcons.share}
                      <span className="spec-name">Integración Social Multicanal</span>
                    </span>
                  </td>
                  <td className="td-val">{PlanIcons.cross}</td>
                  <td className="td-val td-highlight">{PlanIcons.cross}</td>
                  <td className="td-val">{PlanIcons.check}</td>
                  <td className="td-val td-vip">{PlanIcons.check}</td>
                </tr>

                <tr>
                  <td className="td-spec">
                    <span className="spec-item-with-icon">
                      {PlanIcons.inventory}
                      <span className="spec-name">Inventario Sincrónico Multidepósito</span>
                    </span>
                  </td>
                  <td className="td-val">{PlanIcons.cross}</td>
                  <td className="td-val td-highlight">{PlanIcons.cross}</td>
                  <td className="td-val">{PlanIcons.cross}</td>
                  <td className="td-val td-vip">{PlanIcons.check}</td>
                </tr>

                <tr>
                  <td className="td-spec">
                    <span className="spec-item-with-icon">
                      {PlanIcons.crm}
                      <span className="spec-name">CRM Automatizado de Pipeline</span>
                    </span>
                  </td>
                  <td className="td-val">{PlanIcons.cross}</td>
                  <td className="td-val td-highlight">{PlanIcons.cross}</td>
                  <td className="td-val">{PlanIcons.cross}</td>
                  <td className="td-val td-vip">{PlanIcons.check}</td>
                </tr>

                <tr>
                  <td className="td-spec">
                    <span className="spec-item-with-icon">
                      {PlanIcons.creditCard}
                      <span className="spec-name">Pasarelas de Cobro (Culqi / Niubiz / Stripe)</span>
                    </span>
                  </td>
                  <td className="td-val">{PlanIcons.cross}</td>
                  <td className="td-val td-highlight">{PlanIcons.cross}</td>
                  <td className="td-val">{PlanIcons.cross}</td>
                  <td className="td-val td-vip">{PlanIcons.check}</td>
                </tr>

                <tr>
                  <td className="td-spec">
                    <span className="spec-item-with-icon">
                      {PlanIcons.users}
                      <span className="spec-name">Panel Multi-usuario con Roles &amp; Permisos</span>
                    </span>
                  </td>
                  <td className="td-val">{PlanIcons.cross}</td>
                  <td className="td-val td-highlight">{PlanIcons.cross}</td>
                  <td className="td-val">{PlanIcons.cross}</td>
                  <td className="td-val td-vip">{PlanIcons.check}</td>
                </tr>

                <tr className="tr-highlight-row">
                  <td className="td-spec font-medium">
                    <span className="spec-item-with-icon">
                      {PlanIcons.verified}
                      <span className="spec-name text-primary-light">Mantenimiento &amp; Garantía Continua</span>
                    </span>
                  </td>
                  <td className="td-val font-mono">3 meses</td>
                  <td className="td-val td-highlight font-mono font-semibold">3 meses</td>
                  <td className="td-val font-mono font-semibold">3 meses</td>
                  <td className="td-val td-vip font-mono font-bold">3 meses VIP</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 4. MODULAR BESPOKE ENTERPRISE BANNER */}
        <section className="planes-enterprise-banner-section">
          <div className="enterprise-banner-card">
            <div className="banner-glow-orb" aria-hidden="true"></div>

            <div className="banner-content">
              <div className="banner-badge">
                <span className="banner-badge-dot"></span>
                <span>Ingeniería a Medida</span>
              </div>

              <h3 className="banner-title">¿Requisitos corporativos específicos?</h3>

              <p className="banner-desc">
                Diseñamos arquitecturas distribuidas, pasarelas multidivisa, microservicios y
                paneles de control dedicados para empresas con flujos de trabajo únicos. Conectamos su
                visión con código de élite.
              </p>
            </div>

            <div className="banner-actions">
              <button
                className="banner-btn-primary"
                onClick={() => handleWhatsAppDirect("Ingeniería a Medida Corporativa")}
              >
                {PlanIcons.engineering}
                <span>Agendar Sesión Técnica</span>
              </button>
              <button
                className="banner-btn-secondary"
                onClick={() => navigate("/portafolio")}
              >
                {PlanIcons.externalLink}
                <span>Ver Casos de Éxito</span>
              </button>
            </div>
          </div>
        </section>

        {/* 5. QUICK FORM CTA SECTION */}
        <section className="planes-final-cta-section">
          <div className="final-cta-inner">
            <h3 className="final-cta-title">¿Listo para comenzar su transformación digital?</h3>
            <p className="final-cta-text">
              Complete nuestro formulario de cotización o hable en tiempo real con uno de nuestros
              arquitectos de software.
            </p>
            <div className="final-cta-buttons">
              <button
                className="final-cta-btn-primary"
                onClick={() => handleCotizar("Cotización General")}
              >
                <span>Ir al Formulario de Cotización</span>
                {PlanIcons.arrowRight}
              </button>
              <button
                className="final-cta-btn-whatsapp"
                onClick={() => handleWhatsAppDirect("Consulta Inmediata")}
              >
                {PlanIcons.whatsapp}
                <span>Conversar por WhatsApp</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Planes;