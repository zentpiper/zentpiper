import { useNavigate } from "react-router-dom";
import { usePais } from "../contexts/PaisContext";
import SEO from "../components/SEO";
import "./Mobile.css";

// Clean Lucide vector icon catalog (zero emojis)
const MobileIcons = {
  speed: (
    <svg className="mobile-svg-icon icon-amber" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  verified: (
    <svg className="mobile-svg-icon icon-amber" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  supportAgent: (
    <svg className="mobile-svg-icon icon-success" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
    </svg>
  ),
  check: (
    <svg className="mobile-svg-icon icon-success" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  cross: (
    <svg className="mobile-svg-icon icon-disabled" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  star: (
    <svg className="mobile-svg-icon icon-amber" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  crown: (
    <svg className="mobile-svg-icon icon-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7z" />
      <path d="M5 20h14" />
    </svg>
  ),
  lock: (
    <svg className="mobile-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  clock: (
    <svg className="mobile-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  smartphone: (
    <svg className="table-row-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
      <path d="M12 18h.01" />
    </svg>
  ),
  codeBlocks: (
    <svg className="table-row-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  biometrics: (
    <svg className="table-row-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 12C2 6.5 6.5 2 12 2a10 10 0 0 1 8 4" />
      <path d="M5 19.5C5.5 18 6 15 6 12c0-.7.12-1.37.34-2" />
      <path d="M17.29 21.02c.12-.6.18-1.2.18-1.85 0-2.83-1.66-5.17-3.95-6.17" />
      <path d="M8.7 15c.67 1.5 1.7 2.7 3.3 2.7 1.2 0 2.2-.6 2.8-1.5" />
      <path d="M12 7.5a4.5 4.5 0 0 1 4.5 4.5c0 1.25-.4 2.4-1.1 3.3" />
    </svg>
  ),
  cloudSync: (
    <svg className="table-row-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2v4" />
      <path d="m14 4-2-2-2 2" />
      <path d="M4.34 8.78A8 8 0 0 1 20 11a5 5 0 0 1-1.34 9.78" />
      <path d="M12 22v-4" />
      <path d="m10 20 2 2 2-2" />
    </svg>
  ),
  bell: (
    <svg className="table-row-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  ),
  creditCard: (
    <svg className="table-row-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  ),
  dashboard: (
    <svg className="table-row-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="7" height="9" x="3" y="3" rx="1" />
      <rect width="7" height="5" x="14" y="3" rx="1" />
      <rect width="7" height="9" x="14" y="12" rx="1" />
      <rect width="7" height="5" x="3" y="16" rx="1" />
    </svg>
  ),
  store: (
    <svg className="table-row-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
      <path d="M2 7h20" />
    </svg>
  ),
  bot: (
    <svg className="table-row-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="18" height="12" x="3" y="6" rx="2" />
      <circle cx="9" cy="12" r="1" />
      <circle cx="15" cy="12" r="1" />
      <path d="M12 2v4" />
      <path d="m2 14 1-1" />
      <path d="m22 14-1-1" />
    </svg>
  ),
  engineering: (
    <svg className="mobile-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  externalLink: (
    <svg className="mobile-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  ),
  arrowRight: (
    <svg className="mobile-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  ),
  whatsapp: (
    <svg className="mobile-svg-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.175.346-.219.462-.219s.231.006.331.011c.108.005.25-.041.391.299.144.349.491 1.199.534 1.286.043.087.072.188.014.303-.058.116-.087.188-.173.289l-.26.302c-.087.098-.178.204-.077.377.101.173.451.745.968 1.206.666.594 1.228.778 1.401.865.173.087.275.072.376-.044.101-.116.433-.505.549-.679.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.203c.043.072.043.419-.101.824z"/>
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 1.892.527 3.662 1.448 5.178L2 22l4.981-1.306A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.154c-1.611 0-3.13-.45-4.433-1.233l-.317-.19-3.298.865.88-3.214-.207-.33A8.136 8.136 0 013.846 12C3.846 7.505 7.505 3.846 12 3.846S20.154 7.505 20.154 12 16.495 20.154 12 20.154z" clipRule="evenodd" />
    </svg>
  )
};

function Mobile() {
  const navigate = useNavigate();
  const { paisSeleccionado, moneda, whatsapp } = usePais();

  const handleWhatsAppDirect = (nombrePlan) => {
    const phone = whatsapp || "51988490319";
    const msg = `Hola Zentpiper, deseo consultar confidencialmente la propuesta de inversion y alcance tecnico para ${nombrePlan} (${paisSeleccionado}). Busco agendar una sesion tecnica.`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
  };

  const handleCotizar = (nombrePlan = "Propuesta Mobile Personalizada") => {
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
        title="Desarrollo de Aplicaciones Móviles de Alto Impacto | Zentpiper Software"
        description="Desarrollo de aplicaciones móviles nativas y multiplataforma en iOS y Android. Blindaje biométrico, arquitectura offline-first y publicación garantizada en tiendas oficiales."
        keywords="desarrollo aplicaciones móviles, desarrollo apps iOS Android, Flutter React Native, arquitectura software móvil, desarrollo apps corporativas"
        canonical="https://zentpiper.com/mobile"
      />

      <div className="mobile-page-wrapper">
        {/* Ambient volumetric glow backdrops */}
        <div className="mobile-ambient-backdrop" aria-hidden="true">
          <div className="ambient-orb ambient-orb-top"></div>
          <div className="ambient-orb ambient-orb-left"></div>
          <div className="ambient-orb ambient-orb-right"></div>
        </div>

        {/* 1. HERO SECTION */}
        <section className="mobile-hero-section">
          <div className="mobile-hero-backdrop-img" aria-hidden="true">
            <img
              src="/mobile/mobile-hero-bg.jpg"
              alt="Obsidian and Amber Mobile Tech Glow Artwork"
              loading="eager"
            />
            <div className="hero-gradient-overlay"></div>
          </div>

          <div className="mobile-hero-content">
            <div className="mobile-badge-pill">
              <span className="pill-dot" aria-hidden="true"></span>
              <span className="pill-tag">Ingeniería de Software Móvil</span>
              <span className="pill-divider" aria-hidden="true">|</span>
              <span className="pill-sub">iOS &amp; Android Nativo e Híbrido</span>
            </div>

            <h1 className="mobile-hero-title">
              Desarrollo de Aplicaciones Móviles de Alto Impacto Diseñadas para{" "}
              <span className="mobile-title-gradient">Dominar tu Industria</span>
            </h1>

            <p className="mobile-hero-subtitle">
              Desarrollamos aplicaciones móviles nativas y multiplataforma ultrarrápidas, blindadas
              con biometría, arquitectura offline-first y publicadas con garantía directa en App Store
              y Google Play.
            </p>

            <div className="mobile-hero-features">
              <div className="mobile-feature-pill">
                {MobileIcons.speed}
                <span>Arquitectura 60/120 FPS Reactiva</span>
              </div>
              <div className="mobile-feature-pill">
                {MobileIcons.verified}
                <span>App Store &amp; Google Play Ready</span>
              </div>
              <div className="mobile-feature-pill">
                {MobileIcons.supportAgent}
                <span>Soporte y Monitoreo Continuo</span>
              </div>
            </div>
          </div>
        </section>

        {/* 2. FOUR MOBILE TIER CARDS */}
        <section className="mobile-cards-grid">
          {/* TIER 1: APP BÁSICA (MVP) */}
          <div className="mobile-tier-card">
            <div className="mobile-tier-image-wrap">
              <img
                src="/mobile/mobile-mvp.jpg"
                alt="App Básica MVP Zentpiper iPhone Mockup"
                className="mobile-tier-img"
                loading="lazy"
              />
              <div className="mobile-tier-img-overlay"></div>
              <span className="mobile-tier-level-chip">NIVEL 01 · Iniciar MVP</span>
            </div>

            <div className="mobile-tier-content">
              <div className="mobile-tier-header">
                <div className="mobile-tier-title-row">
                  <h3 className="mobile-tier-title">App Básica (MVP)</h3>
                </div>
                <p className="mobile-tier-desc">
                  Validación de modelo de negocio con frontend móvil intuitivo, onboarding optimizado y captura de leads.
                </p>
              </div>

              <div className="mobile-tier-sla-chip">
                {MobileIcons.clock}
                <span>3 meses de soporte incluidos</span>
              </div>

              {/* Confidential Mystery Box */}
              <div className="mobile-tier-mystery-box">
                <div className="mystery-header">
                  <span className="mystery-badge">Cotización por Requerimiento</span>
                </div>
                <div className="mystery-title-row">
                  {MobileIcons.lock}
                  <span className="mystery-title">Inversión Confidencial</span>
                </div>
                <p className="mystery-desc">
                  Estimación a medida según alcance, arquitectura y plataformas objetivo.
                </p>
                <div className="mystery-sub-pill">
                  <span>Auditoría previa sin costo · Estimado: 2 a 4 semanas</span>
                </div>
                <button
                  className="mystery-action-link"
                  onClick={() => handleWhatsAppDirect("App Básica MVP")}
                >
                  <span>Consultar Cupo Confidencial</span>
                  {MobileIcons.arrowRight}
                </button>
              </div>

              {/* Feature List */}
              <div className="mobile-tier-features-list">
                <div className="feature-item">
                  {MobileIcons.check}
                  <span>1 a 4 Pantallas Móviles Nativas</span>
                </div>
                <div className="feature-item">
                  {MobileIcons.check}
                  <span>Compatibilidad iOS &amp; Android (Flutter / React Native)</span>
                </div>
                <div className="feature-item">
                  {MobileIcons.check}
                  <span>Autenticación básica &amp; Formularios reactivos</span>
                </div>
                <div className="feature-item">
                  {MobileIcons.check}
                  <span>Soporte directo vía WhatsApp</span>
                </div>
                <div className="feature-item">
                  {MobileIcons.check}
                  <span>Integración con APIs RESTful</span>
                </div>
                <div className="feature-item disabled">
                  {MobileIcons.cross}
                  <span>Pasarela de pago in-app</span>
                </div>
                <div className="feature-item disabled">
                  {MobileIcons.cross}
                  <span>Notificaciones Push segmentadas</span>
                </div>
                <div className="feature-item disabled">
                  {MobileIcons.cross}
                  <span>Modo Offline con sincronización SQLite/Realm</span>
                </div>
                <div className="feature-item disabled">
                  {MobileIcons.cross}
                  <span>Publicación y optimización ASO en tiendas</span>
                </div>
              </div>

              <button
                className="mobile-tier-btn-secondary"
                onClick={() => handleWhatsAppDirect("App Básica MVP")}
              >
                <span>Cotizar App MVP</span>
                {MobileIcons.arrowRight}
              </button>
            </div>
          </div>

          {/* TIER 2: APP COMERCIAL (PYME) - DESTACADO */}
          <div className="mobile-tier-card featured">
            <div className="mobile-tier-featured-pill">
              {MobileIcons.star}
              <span>MÁS POPULAR</span>
            </div>

            <div className="mobile-tier-image-wrap">
              <img
                src="/mobile/mobile-comercial.jpg"
                alt="App Comercial Pyme Zentpiper Dual iPhone 17 Pro Max"
                className="mobile-tier-img"
                loading="lazy"
              />
              <div className="mobile-tier-img-overlay"></div>
              <span className="mobile-tier-level-chip">NIVEL 02 · El más elegido</span>
            </div>

            <div className="mobile-tier-content">
              <div className="mobile-tier-header">
                <div className="mobile-tier-title-row">
                  <h3 className="mobile-tier-title">App Comercial (Pyme)</h3>
                  <span className="mobile-tier-star-badge" title="Nivel recomendado">
                    {MobileIcons.star}
                  </span>
                </div>
                <p className="mobile-tier-desc">
                  Canal de ventas y fidelización con catálogo in-app dinámico, pedidos directos y notificaciones push.
                </p>
              </div>

              <div className="mobile-tier-sla-chip">
                {MobileIcons.clock}
                <span>3 meses de soporte incluidos</span>
              </div>

              {/* Confidential Mystery Box */}
              <div className="mobile-tier-mystery-box">
                <div className="mystery-header">
                  <span className="mystery-badge">Plazas Mensuales Limitadas</span>
                </div>
                <div className="mystery-title-row">
                  {MobileIcons.lock}
                  <span className="mystery-title">Inversión Confidencial</span>
                </div>
                <p className="mystery-desc">
                  Paquete comercial de alto impacto con garantía de publicación en tiendas oficiales.
                </p>
                <div className="mystery-sub-pill">
                  <span>Retorno proyectado acelerado · Estimado: 4 a 6 semanas</span>
                </div>
                <button
                  className="mystery-action-link"
                  onClick={() => handleWhatsAppDirect("App Comercial Pyme")}
                >
                  <span>Consultar Cupo Confidencial</span>
                  {MobileIcons.arrowRight}
                </button>
              </div>

              {/* Feature List */}
              <div className="mobile-tier-features-list">
                <div className="feature-item highlighted">
                  {MobileIcons.check}
                  <span>Hasta 8 Pantallas UI/UX Avanzadas</span>
                </div>
                <div className="feature-item">
                  {MobileIcons.check}
                  <span>Despliegue dual en iOS y Android</span>
                </div>
                <div className="feature-item">
                  {MobileIcons.check}
                  <span>Catálogo interactivo de productos/servicios</span>
                </div>
                <div className="feature-item">
                  {MobileIcons.check}
                  <span>Carrito de compras y checkout optimizado</span>
                </div>
                <div className="feature-item">
                  {MobileIcons.check}
                  <span>Notificaciones Push reactivas &amp; Firebase Analytics</span>
                </div>
                <div className="feature-item">
                  {MobileIcons.check}
                  <span>Soporte prioritario vía WhatsApp</span>
                </div>
                <div className="feature-item">
                  {MobileIcons.check}
                  <span>Publicación guiada en App Store &amp; Play Store</span>
                </div>
                <div className="feature-item disabled">
                  {MobileIcons.cross}
                  <span>Arquitectura Offline-First con caché bidireccional</span>
                </div>
                <div className="feature-item disabled">
                  {MobileIcons.cross}
                  <span>Integración ERP / CRM centralizado</span>
                </div>
                <div className="feature-item disabled">
                  {MobileIcons.cross}
                  <span>Pagos multi-divisa y suscripciones in-app</span>
                </div>
              </div>

              <button
                className="mobile-tier-btn-primary"
                onClick={() => handleWhatsAppDirect("App Comercial Pyme")}
              >
                <span>Elegir App Comercial</span>
                {MobileIcons.arrowRight}
              </button>
            </div>
          </div>

          {/* TIER 3: APP SCALE & SAAS */}
          <div className="mobile-tier-card">
            <div className="mobile-tier-image-wrap">
              <img
                src="/mobile/mobile-scale.jpg"
                alt="App Scale y SaaS Zentpiper Cascading iPhone y MacBook"
                className="mobile-tier-img"
                loading="lazy"
              />
              <div className="mobile-tier-img-overlay"></div>
              <span className="mobile-tier-level-chip">NIVEL 03 · Escala &amp; SaaS</span>
            </div>

            <div className="mobile-tier-content">
              <div className="mobile-tier-header">
                <div className="mobile-tier-title-row">
                  <h3 className="mobile-tier-title">App Scale &amp; SaaS</h3>
                </div>
                <p className="mobile-tier-desc">
                  Plataforma móvil robusta con sincronización en tiempo real, biometría y arquitectura cloud escalable.
                </p>
              </div>

              <div className="mobile-tier-sla-chip">
                {MobileIcons.clock}
                <span>3 meses de soporte incluidos</span>
              </div>

              {/* Confidential Mystery Box */}
              <div className="mobile-tier-mystery-box">
                <div className="mystery-header">
                  <span className="mystery-badge">Arquitectura de Alto Tráfico</span>
                </div>
                <div className="mystery-title-row">
                  {MobileIcons.lock}
                  <span className="mystery-title">Inversión Confidencial</span>
                </div>
                <p className="mystery-desc">
                  Ingeniería avanzada para startups y SaaS con sincronización en la nube y biometría.
                </p>
                <div className="mystery-sub-pill">
                  <span>Consultoría de arquitectura incluida · Estimado: 6 a 10 semanas</span>
                </div>
                <button
                  className="mystery-action-link"
                  onClick={() => handleWhatsAppDirect("App Scale y SaaS")}
                >
                  <span>Consultar Cupo Confidencial</span>
                  {MobileIcons.arrowRight}
                </button>
              </div>

              {/* Feature List */}
              <div className="mobile-tier-features-list">
                <div className="feature-item highlighted">
                  {MobileIcons.check}
                  <span>Hasta 16 Pantallas Arquitectónicas</span>
                </div>
                <div className="feature-item">
                  {MobileIcons.check}
                  <span>Biometría avanzada (FaceID / TouchID / Huella)</span>
                </div>
                <div className="feature-item">
                  {MobileIcons.check}
                  <span>Arquitectura Offline-first con sincronización en la nube</span>
                </div>
                <div className="feature-item">
                  {MobileIcons.check}
                  <span>Notificaciones Push inteligentes segmentadas</span>
                </div>
                <div className="feature-item">
                  {MobileIcons.check}
                  <span>Panel web de administración (Dashboard en MacBook Pro)</span>
                </div>
                <div className="feature-item">
                  {MobileIcons.check}
                  <span>Pasarelas de cobro in-app (Stripe, Mercado Pago, Culqi)</span>
                </div>
                <div className="feature-item">
                  {MobileIcons.check}
                  <span>Monitoreo de caídas en vivo (Sentry / Datadog)</span>
                </div>
                <div className="feature-item disabled">
                  {MobileIcons.cross}
                  <span>Microservicios dedicados y LLM / AI Agents in-app</span>
                </div>
                <div className="feature-item disabled">
                  {MobileIcons.cross}
                  <span>Soporte 24/7 con Ingeniero Senior Asignado</span>
                </div>
              </div>

              <button
                className="mobile-tier-btn-secondary"
                onClick={() => handleWhatsAppDirect("App Scale y SaaS")}
              >
                <span>Cotizar App Scale</span>
                {MobileIcons.arrowRight}
              </button>
            </div>
          </div>

          {/* TIER 4: ECOSISTEMA CORPORATIVO ENTERPRISE */}
          <div className="mobile-tier-card enterprise">
            <div className="mobile-tier-image-wrap">
              <img
                src="/mobile/mobile-enterprise.jpg"
                alt="Ecosistema Corporativo Enterprise Zentpiper Multi Device Ecosystem"
                className="mobile-tier-img"
                loading="lazy"
              />
              <div className="mobile-tier-img-overlay"></div>
              <span className="mobile-tier-level-chip">NIVEL 04 · Empresarial a Medida</span>
            </div>

            <div className="mobile-tier-content">
              <div className="mobile-tier-header">
                <div className="mobile-tier-title-row">
                  <h3 className="mobile-tier-title">Ecosistema Enterprise</h3>
                  <span className="mobile-tier-vip-crown" title="Nivel Exclusivo Corporativo">
                    {MobileIcons.crown}
                  </span>
                </div>
                <p className="mobile-tier-desc">
                  Suite móvil empresarial integral con microservicios, seguridad bancaria, integración ERP/SAP e inteligencia artificial.
                </p>
              </div>

              <div className="mobile-tier-sla-chip">
                {MobileIcons.clock}
                <span>3 meses de soporte prioritario VIP</span>
              </div>

              {/* Confidential Mystery Box */}
              <div className="mobile-tier-mystery-box">
                <div className="mystery-header">
                  <span className="mystery-badge">Exclusivo Corporativo</span>
                </div>
                <div className="mystery-title-row">
                  {MobileIcons.lock}
                  <span className="mystery-title">Inversión Confidencial</span>
                </div>
                <p className="mystery-desc">
                  Desarrollo de grado institucional con SLAs de disponibilidad, código nativo y auditoría de ciberseguridad.
                </p>
                <div className="mystery-sub-pill">
                  <span>Acuerdo NDA garantizado · Sprint planning dedicado</span>
                </div>
                <button
                  className="mystery-action-link"
                  onClick={() => handleWhatsAppDirect("Ecosistema Corporativo Enterprise")}
                >
                  <span>Consultar Cupo Confidencial</span>
                  {MobileIcons.arrowRight}
                </button>
              </div>

              {/* Feature List */}
              <div className="mobile-tier-features-list">
                <div className="feature-item highlighted">
                  {MobileIcons.check}
                  <span>Pantallas y Flujos Ilimitados a Medida</span>
                </div>
                <div className="feature-item">
                  {MobileIcons.check}
                  <span>Código Nativo optimizado &amp; Arquitectura Hexagonal / Clean</span>
                </div>
                <div className="feature-item">
                  {MobileIcons.check}
                  <span>Seguridad de Grado Financiero &amp; Encriptación E2E</span>
                </div>
                <div className="feature-item">
                  {MobileIcons.check}
                  <span>Soporte 24/7 con Ingeniero de Misión Crítica Dedicado</span>
                </div>
                <div className="feature-item">
                  {MobileIcons.check}
                  <span>Integración completa con ERPs corporativos (SAP, Oracle)</span>
                </div>
                <div className="feature-item">
                  {MobileIcons.check}
                  <span>Inteligencia Artificial integrada y Agentes locales</span>
                </div>
                <div className="feature-item">
                  {MobileIcons.check}
                  <span>Despliegue CI/CD automatizado y entornos MDM</span>
                </div>
                <div className="feature-item">
                  {MobileIcons.check}
                  <span>Soporte para wearables (Apple Watch / Wear OS)</span>
                </div>
              </div>

              <button
                className="mobile-tier-btn-enterprise"
                onClick={() => handleWhatsAppDirect("Ecosistema Corporativo Enterprise")}
              >
                <span>Solicitar Asesoría Mobile VIP</span>
                {MobileIcons.arrowRight}
              </button>
            </div>
          </div>
        </section>

        {/* 3. MATRIZ DE CAPACIDADES MOBILE (COMPARISON TABLE) */}
        <section className="mobile-matrix-section">
          <div className="mobile-section-header">
            <div className="section-tag">
              {MobileIcons.smartphone}
              <span>Auditoría de Arquitectura Móvil</span>
            </div>
            <h2 className="section-title">Matriz Completa de Capacidades Mobile</h2>
            <p className="section-subtitle">
              Contraste riguroso de especificaciones técnicas, soporte nativo y estándares de ingeniería móvil en cada nivel de desarrollo.
            </p>
          </div>

          <div className="mobile-table-wrapper">
            <table className="mobile-table">
              <thead>
                <tr>
                  <th className="th-spec">Especificación Móvil</th>
                  <th>Básica MVP</th>
                  <th className="th-highlight">Comercial (Pyme)</th>
                  <th>Scale &amp; SaaS</th>
                  <th className="th-vip">Enterprise VIP</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="td-spec">
                    <span className="spec-item-with-icon">
                      {MobileIcons.smartphone}
                      <span className="spec-name">Plataformas Soportadas</span>
                    </span>
                  </td>
                  <td className="td-val">iOS &amp; Android</td>
                  <td className="td-val td-highlight">iOS &amp; Android</td>
                  <td className="td-val">iOS, Android &amp; Web</td>
                  <td className="td-val td-vip">iOS, Android, Web &amp; Watch</td>
                </tr>

                <tr>
                  <td className="td-spec">
                    <span className="spec-item-with-icon">
                      {MobileIcons.codeBlocks}
                      <span className="spec-name">Framework &amp; Motor</span>
                    </span>
                  </td>
                  <td className="td-val">Flutter / RN</td>
                  <td className="td-val td-highlight">Flutter / React Native</td>
                  <td className="td-val font-medium">Flutter High-Perf</td>
                  <td className="td-val td-vip">Swift / Kotlin / Hexagonal</td>
                </tr>

                <tr>
                  <td className="td-spec">
                    <span className="spec-item-with-icon">
                      {MobileIcons.biometrics}
                      <span className="spec-name">Autenticación &amp; Seguridad</span>
                    </span>
                  </td>
                  <td className="td-val">Email &amp; JWT</td>
                  <td className="td-val td-highlight">Social Login (Google/Apple)</td>
                  <td className="td-val">FaceID &amp; Biometría</td>
                  <td className="td-val td-vip">SSO Bancario, SAML &amp; E2EE</td>
                </tr>

                <tr>
                  <td className="td-spec">
                    <span className="spec-item-with-icon">
                      {MobileIcons.cloudSync}
                      <span className="spec-name">Arquitectura Offline &amp; Caché</span>
                    </span>
                  </td>
                  <td className="td-val">{MobileIcons.cross}</td>
                  <td className="td-val td-highlight">{MobileIcons.cross}</td>
                  <td className="td-val">{MobileIcons.check}</td>
                  <td className="td-val td-vip">{MobileIcons.check}</td>
                </tr>

                <tr>
                  <td className="td-spec">
                    <span className="spec-item-with-icon">
                      {MobileIcons.bell}
                      <span className="spec-name">Notificaciones Push &amp; Engagement</span>
                    </span>
                  </td>
                  <td className="td-val">{MobileIcons.cross}</td>
                  <td className="td-val td-highlight">{MobileIcons.check}</td>
                  <td className="td-val">{MobileIcons.check}</td>
                  <td className="td-val td-vip">{MobileIcons.check}</td>
                </tr>

                <tr>
                  <td className="td-spec">
                    <span className="spec-item-with-icon">
                      {MobileIcons.creditCard}
                      <span className="spec-name">Pasarelas de Pago In-App</span>
                    </span>
                  </td>
                  <td className="td-val">{MobileIcons.cross}</td>
                  <td className="td-val td-highlight">{MobileIcons.check}</td>
                  <td className="td-val">{MobileIcons.check}</td>
                  <td className="td-val td-vip">{MobileIcons.check}</td>
                </tr>

                <tr>
                  <td className="td-spec">
                    <span className="spec-item-with-icon">
                      {MobileIcons.dashboard}
                      <span className="spec-name">Panel Web de Control (CMS)</span>
                    </span>
                  </td>
                  <td className="td-val">{MobileIcons.cross}</td>
                  <td className="td-val td-highlight">{MobileIcons.cross}</td>
                  <td className="td-val">{MobileIcons.check}</td>
                  <td className="td-val td-vip">{MobileIcons.check}</td>
                </tr>

                <tr>
                  <td className="td-spec">
                    <span className="spec-item-with-icon">
                      {MobileIcons.store}
                      <span className="spec-name">Publicación en App Store &amp; Play Store</span>
                    </span>
                  </td>
                  <td className="td-val">Asesoría básica</td>
                  <td className="td-val td-highlight">Guiada completa &amp; ASO</td>
                  <td className="td-val">{MobileIcons.check}</td>
                  <td className="td-val td-vip">{MobileIcons.check}</td>
                </tr>

                <tr>
                  <td className="td-spec">
                    <span className="spec-item-with-icon">
                      {MobileIcons.bot}
                      <span className="spec-name">Agentes IA &amp; Microservicios In-App</span>
                    </span>
                  </td>
                  <td className="td-val">{MobileIcons.cross}</td>
                  <td className="td-val td-highlight">{MobileIcons.cross}</td>
                  <td className="td-val">{MobileIcons.cross}</td>
                  <td className="td-val td-vip">{MobileIcons.check}</td>
                </tr>

                <tr className="tr-highlight-row">
                  <td className="td-spec font-medium">
                    <span className="spec-item-with-icon">
                      {MobileIcons.verified}
                      <span className="spec-name">Mantenimiento &amp; SLAs de Producción</span>
                    </span>
                  </td>
                  <td className="td-val font-mono">3 meses</td>
                  <td className="td-val td-highlight font-mono font-semibold">3 meses</td>
                  <td className="td-val font-mono font-semibold">3 meses Prioritario</td>
                  <td className="td-val td-vip font-mono font-bold">3 meses VIP 24/7</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 4. MODULAR BESPOKE ENTERPRISE BANNER */}
        <section className="mobile-enterprise-banner-section">
          <div className="enterprise-banner-card">
            <div className="banner-glow-orb" aria-hidden="true"></div>

            <div className="banner-content">
              <div className="banner-badge">
                <span className="banner-badge-dot"></span>
                <span>Ingeniería Móvil a Medida</span>
              </div>

              <h3 className="banner-title">¿Requisitos móviles corporativos específicos?</h3>

              <p className="banner-desc">
                Diseñamos arquitecturas móviles distribuidas, integración con dispositivos IoT y
                periféricos bluetooth, microservicios dedicados y sistemas de misión crítica para
                empresas con flujos de trabajo de alto volumen.
              </p>
            </div>

            <div className="banner-actions">
              <button
                className="banner-btn-primary"
                onClick={() => handleWhatsAppDirect("Ingeniería Móvil a Medida Corporativa")}
              >
                {MobileIcons.engineering}
                <span>Agendar Sesión Técnica Móvil</span>
              </button>
              <button
                className="banner-btn-secondary"
                onClick={() => navigate("/portafolio")}
              >
                {MobileIcons.externalLink}
                <span>Ver Casos de Éxito</span>
              </button>
            </div>
          </div>
        </section>

        {/* 5. QUICK FORM CTA SECTION */}
        <section className="mobile-final-cta-section">
          <div className="final-cta-inner">
            <h3 className="final-cta-title">¿Listo para materializar su aplicación móvil?</h3>
            <p className="final-cta-text">
              Complete nuestro formulario técnico o converse de inmediato con un arquitecto de software
              móvil para delinear su solución.
            </p>
            <div className="final-cta-buttons">
              <button
                className="final-cta-btn-primary"
                onClick={() => handleCotizar("Cotización App Mobile General")}
              >
                <span>Ir al Formulario de Cotización</span>
                {MobileIcons.arrowRight}
              </button>
              <button
                className="final-cta-btn-whatsapp"
                onClick={() => handleWhatsAppDirect("Consulta Inmediata Móvil")}
              >
                {MobileIcons.whatsapp}
                <span>Conversar por WhatsApp</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Mobile;