import { useNavigate } from "react-router-dom";
import { usePais } from "../contexts/PaisContext";
import SEO from "../components/SEO";
import "./SobreNosotros.css";

// Precision vector SVG icons matching Zentpiper design system
const Icons = {
  lightning: (
    <svg className="sn-svg-icon icon-amber" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
  bank: (
    <svg className="sn-svg-icon icon-amber" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="3" y1="21" x2="21" y2="21" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <polyline points="5 6 12 3 19 6" />
      <line x1="4" y1="10" x2="4" y2="21" />
      <line x1="20" y1="10" x2="20" y2="21" />
      <line x1="8" y1="14" x2="8" y2="17" />
      <line x1="12" y1="14" x2="12" y2="17" />
      <line x1="16" y1="14" x2="16" y2="17" />
    </svg>
  ),
  terminal: (
    <svg className="sn-svg-icon icon-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  ),
  shieldCheck: (
    <svg className="sn-svg-icon icon-success" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  ),
  architecture: (
    <svg className="sn-svg-icon icon-amber" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18" />
      <path d="M9 21V9" />
    </svg>
  ),
  bolt: (
    <svg className="sn-svg-icon icon-gold" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M11.983 1.5a.75.75 0 00-1.292-.614l-6.5 8.25a.75.75 0 00.59 1.214h4.786l-1.547 7.734a.75.75 0 001.326.586l6.5-8.25a.75.75 0 00-.59-1.214h-4.786l1.413-7.706z" />
    </svg>
  ),
  key: (
    <svg className="sn-svg-icon icon-amber" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.65 10C11.83 7.67 9.61 6 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6c2.61 0 4.83-1.67 5.65-4H17v4h4v-4h2v-4H12.65zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
    </svg>
  ),
  security: (
    <svg className="sn-svg-icon icon-success" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  domain: (
    <svg className="sn-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 21h18" />
      <path d="M5 21V7l8-4v18" />
      <path d="M19 21V11l-6-3" />
      <path d="M9 9v.01" />
      <path d="M9 12v.01" />
      <path d="M9 15v.01" />
      <path d="M9 18v.01" />
    </svg>
  ),
  handshake: (
    <svg className="sn-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m11 17 2 2a1 1 0 0 0 1.4 0l4.3-4.3a1 1 0 0 0 0-1.4l-2-2" />
      <path d="m18 14 1.3-1.3a1 1 0 0 0 0-1.4l-3-3a1 1 0 0 0-1.4 0L13 10" />
      <path d="M14 8.6 9.4 4a1 1 0 0 0-1.4 0L4 8a1 1 0 0 0 0 1.4l7 7" />
      <path d="M2 14v4a2 2 0 0 0 2 2h4" />
      <path d="M22 10V6a2 2 0 0 0-2-2h-4" />
    </svg>
  ),
  externalLink: (
    <svg className="sn-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  ),
  folder: (
    <svg className="sn-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  ),
  link: (
    <svg className="sn-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  ),
  psychology: (
    <svg className="sn-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <path d="M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7z" />
    </svg>
  ),
  speed: (
    <svg className="sn-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="m16.2 7.8-4.2 4.2" />
      <path d="M12 18v-2" />
    </svg>
  ),
  code: (
    <svg className="sn-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  arrowRight: (
    <svg className="sn-svg-icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
    </svg>
  ),
  whatsapp: (
    <svg className="sn-svg-icon icon-success" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.175.346-.219.462-.219s.231.006.331.011c.108.005.25-.041.391.299.144.349.491 1.199.534 1.286.043.087.072.188.014.303-.058.116-.087.188-.173.289l-.26.302c-.087.098-.178.204-.077.377.101.173.451.745.968 1.206.666.594 1.228.778 1.401.865.173.087.275.072.376-.044.101-.116.433-.505.549-.679.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.203c.043.072.043.419-.101.824z"/>
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 1.892.527 3.662 1.448 5.178L2 22l4.981-1.306A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.154c-1.611 0-3.13-.45-4.433-1.233l-.317-.19-3.298.865.88-3.214-.207-.33A8.136 8.136 0 013.846 12C3.846 7.505 7.505 3.846 12 3.846S20.154 7.505 20.154 12 16.495 20.154 12 20.154z" clipRule="evenodd" />
    </svg>
  ),
  verified: (
    <svg className="sn-svg-icon icon-amber" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
    </svg>
  ),
};

export default function SobreNosotros() {
  const navigate = useNavigate();
  const { paisData } = usePais();

  const handleAgendar = () => {
    navigate("/contacto", {
      state: {
        asunto: "Sesión Técnica con el Equipo de Ingeniería",
        servicio: "Consultoría & Arquitectura de Software",
      },
    });
  };

  const handleContactarEspecialista = (asunto, servicio) => {
    navigate("/contacto", {
      state: { asunto, servicio },
    });
  };

  const handleWhatsApp = () => {
    const phone = paisData?.whatsapp || "51988490319";
    const msg = "Hola Zentpiper, me gustaría conversar directamente con su equipo de ingeniería.";
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
  };

  const copyProfileLink = (name) => {
    const currentUrl = `${window.location.origin}/sobre-nosotros#${encodeURIComponent(name.toLowerCase().replace(/\s+/g, '-'))}`;
    navigator.clipboard.writeText(currentUrl).catch(() => {});
  };

  return (
    <div className="sn-page">
      <SEO
        title="Sobre Nosotros | Equipo y Liderazgo Técnico | Zentpiper Software"
        description="Conoce al equipo de ingenieros y líderes detrás de Zentpiper Software. Arquitectura digital, desarrollo full stack, inteligencia artificial y SEO de alto rendimiento."
        keywords="sobre nosotros zentpiper, equipo zentpiper, liderazgo técnico, Barclay Leach, Arian Liendro, Patrick Pozsgai, desarrollo de software, arquitectura cloud"
        canonical="https://zentpiper.com/sobre-nosotros"
      />

      {/* Hero Section */}
      <section className="sn-hero-section">
        <div className="sn-ambient-glow" aria-hidden="true" />
        
        <div className="sn-container sn-hero-container">
          <div className="sn-eyebrow-badge">
            <span className="sn-eyebrow-icon">{Icons.lightning}</span>
            <span className="sn-eyebrow-text">INGENIERÍA DE SOFTWARE &amp; ARQUITECTURA DIGITAL</span>
            <span className="sn-eyebrow-separator">•</span>
            <span className="sn-eyebrow-highlight">LIDERAZGO TÉCNICO</span>
          </div>

          <h1 className="sn-hero-title">
            El Equipo Detrás del Software que{" "}
            <span className="sn-gradient-text">Escala Empresas</span>
          </h1>

          <p className="sn-hero-subtitle">
            Diseñamos y construimos plataformas digitales de misión crítica con rigor de ingeniería, código limpio y mentalidad de producto. Conoce al liderazgo que guía cada arquitectura en Zentpiper.
          </p>

          {/* Trust Badges Strip */}
          <div className="sn-trust-strip">
            <div className="sn-trust-card">
              <div className="sn-trust-icon-wrap icon-amber-bg">
                {Icons.bank}
              </div>
              <div className="sn-trust-info">
                <span className="sn-trust-number">10+ Años</span>
                <span className="sn-trust-label">Experiencia Combinada</span>
              </div>
            </div>

            <div className="sn-trust-card">
              <div className="sn-trust-icon-wrap icon-gold-bg">
                {Icons.terminal}
              </div>
              <div className="sn-trust-info">
                <span className="sn-trust-number">+40 Sistemas</span>
                <span className="sn-trust-label">En Producción Activa</span>
              </div>
            </div>

            <div className="sn-trust-card">
              <div className="sn-trust-icon-wrap icon-success-bg">
                {Icons.shieldCheck}
              </div>
              <div className="sn-trust-info">
                <span className="sn-trust-number">99.99% Uptime</span>
                <span className="sn-trust-label">Auditoría &amp; Resiliencia</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Leadership Section */}
      <section className="sn-leadership-section">
        <div className="sn-container">
          <div className="sn-section-header">
            <div>
              <span className="sn-section-eyebrow">Liderazgo y Equipo Directivo</span>
              <h2 className="sn-section-title">Gobernanza y Maestría Técnica</h2>
            </div>
            <p className="sn-section-desc">
              Sin capas burocráticas: cada cliente interactúa directamente con los autores de la arquitectura de su solución.
            </p>
          </div>

          {/* 3-Column Leader Grid */}
          <div className="sn-leaders-grid">
            {/* Leader 1: Barclay Leach */}
            <article className="sn-leader-card" id="barclay-leach">
              <div className="sn-leader-photo-wrap">
                <img
                  src="/sobre-nosotros/barclay-leach.png"
                  alt="Barclay Leach - Trade & Channel Marketing y Desarrollador Full Stack"
                  className="sn-leader-photo"
                  loading="eager"
                  fetchPriority="high"
                />
                <div className="sn-photo-gradient" />
                <div className="sn-photo-badge">
                  <span>GROWTH &amp; FULL STACK // 01</span>
                </div>
              </div>

              <div className="sn-leader-info">
                <div className="sn-leader-name-row">
                  <h3 className="sn-leader-name">Barclay Leach</h3>
                  <span className="sn-status-dot pulse-amber" title="Disponible para nuevos proyectos" />
                </div>

                <div className="sn-leader-role">
                  Trade &amp; Channel Marketing y Desarrollador Full Stack
                </div>

                <p className="sn-leader-bio">
                  Combino trade &amp; channel marketing con una base técnica full stack (Next.js, React, Node.js, Supabase) para construir y hacer crecer canales de adquisición: redes sociales, paid media y embudos de conversión. Fundador de Cernext, donde dirijo desarrollo web, SEO técnico y automatización con IA. Intérprete profesional inglés-español (C2).
                </p>

                <div className="sn-speciality-box">
                  <span className="sn-speciality-title">Especialidad &amp; Enfoque</span>
                  <div className="sn-tags-list">
                    <span className="sn-tag">Full Stack (Next.js, Node, Supabase)</span>
                    <span className="sn-tag">Paid Media &amp; Embudos</span>
                    <span className="sn-tag">Automatización con IA</span>
                    <span className="sn-tag">Inglés C2 Bilingüe</span>
                  </div>
                </div>

                <div className="sn-leader-footer">
                  <a
                    href="https://barclayleach.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sn-profile-link"
                  >
                    {Icons.externalLink}
                    <span>barclayleach.com</span>
                  </a>

                  <div className="sn-leader-quick-actions">
                    <a
                      href="https://barclayleach.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sn-quick-btn"
                      title="Ver portafolio"
                    >
                      {Icons.folder}
                    </a>
                    <button
                      type="button"
                      onClick={() => copyProfileLink("Barclay Leach")}
                      className="sn-quick-btn"
                      title="Copiar enlace de perfil"
                    >
                      {Icons.link}
                    </button>
                  </div>
                </div>
              </div>
            </article>

            {/* Leader 2: Arian Liendro */}
            <article className="sn-leader-card" id="arian-liendro">
              <div className="sn-leader-photo-wrap">
                <img
                  src="/sobre-nosotros/arian-liendro.png"
                  alt="Arian Liendro - Desarrollador de Software & Especialista en Ciencia de Datos / LLMs"
                  className="sn-leader-photo"
                  loading="eager"
                  fetchPriority="high"
                />
                <div className="sn-photo-gradient" />
                <div className="sn-photo-badge">
                  <span>DATA &amp; AI ARCHITECT // 02</span>
                </div>
              </div>

              <div className="sn-leader-info">
                <div className="sn-leader-name-row">
                  <h3 className="sn-leader-name">Arian Liendro</h3>
                  <span className="sn-status-dot pulse-amber" title="Disponible para nuevos proyectos" />
                </div>

                <div className="sn-leader-role">
                  Desarrollador de Software &amp; Especialista en Ciencia de Datos / LLMs
                </div>

                <p className="sn-leader-bio">
                  Enfoque en la arquitectura, planificación y desarrollo de sistemas de software funcionales y escalables. Combino la ingeniería de software tradicional con la implementación de modelos de aprendizaje automático y grandes modelos de lenguaje (LLMs), buscando integrar soluciones inteligentes que resuelvan problemas reales de forma eficiente.
                </p>

                <div className="sn-speciality-box">
                  <span className="sn-speciality-title">Especialidad &amp; Enfoque</span>
                  <div className="sn-tags-list">
                    <span className="sn-tag">Arquitectura de Software</span>
                    <span className="sn-tag">Machine Learning</span>
                    <span className="sn-tag">LLMs &amp; IA Generativa</span>
                    <span className="sn-tag">Sistemas Escalables</span>
                  </div>
                </div>

                <div className="sn-leader-footer">
                  <button
                    type="button"
                    onClick={() => handleContactarEspecialista("Consulta con Arian Liendro", "IA & Data Science")}
                    className="sn-profile-link"
                  >
                    {Icons.psychology}
                    <span>Consultar IA &amp; Data</span>
                  </button>

                  <div className="sn-leader-quick-actions">
                    <button
                      type="button"
                      onClick={() => copyProfileLink("Arian Liendro")}
                      className="sn-quick-btn"
                      title="Copiar enlace de perfil"
                    >
                      {Icons.link}
                    </button>
                  </div>
                </div>
              </div>
            </article>

            {/* Leader 3: Patrick Pozsgai */}
            <article className="sn-leader-card" id="patrick-pozsgai">
              <div className="sn-leader-photo-wrap">
                <img
                  src="/sobre-nosotros/patrick-pozsgai.png"
                  alt="Patrick Pozsgai - Desarrollador Web & Especialista SEO"
                  className="sn-leader-photo"
                  loading="eager"
                  fetchPriority="high"
                />
                <div className="sn-photo-gradient" />
                <div className="sn-photo-badge">
                  <span>WEB ARCHITECTURE &amp; SEO // 03</span>
                </div>
              </div>

              <div className="sn-leader-info">
                <div className="sn-leader-name-row">
                  <h3 className="sn-leader-name">Patrick Pozsgai</h3>
                  <span className="sn-status-dot pulse-gold" title="Disponible para nuevos proyectos" />
                </div>

                <div className="sn-leader-role">
                  Desarrollador Web &amp; Especialista SEO
                </div>

                <p className="sn-leader-bio">
                  Profesional enfocado en la creación de plataformas digitales eficientes, rápidas y escalables. Cuento con formación especializada en desarrollo web y una certificación oficial en SEO, lo que me permite construir soluciones que no solo funcionan a nivel técnico, sino que también cumplen con los más altos estándares de visibilidad en motores de búsqueda. En Zentpiper, dirijo la implementación técnica utilizando tecnologías modernas como Next.js y Tailwind CSS, manteniendo siempre un compromiso constante con el aprendizaje y las mejores prácticas de la industria.
                </p>

                <div className="sn-speciality-box">
                  <span className="sn-speciality-title">Especialidad &amp; Enfoque</span>
                  <div className="sn-tags-list">
                    <span className="sn-tag">Next.js &amp; React</span>
                    <span className="sn-tag">SEO Técnico &amp; Posicionamiento</span>
                    <span className="sn-tag">Tailwind CSS</span>
                    <span className="sn-tag">Performance Web</span>
                  </div>
                </div>

                <div className="sn-leader-footer">
                  <button
                    type="button"
                    onClick={() => handleContactarEspecialista("Auditoría con Patrick Pozsgai", "Auditoría Web & SEO")}
                    className="sn-profile-link"
                  >
                    {Icons.speed}
                    <span>Auditoría Web &amp; SEO</span>
                  </button>

                  <div className="sn-leader-quick-actions">
                    <button
                      type="button"
                      onClick={() => navigate("/planes")}
                      className="sn-quick-btn"
                      title="Ver planes web"
                    >
                      {Icons.code}
                    </button>
                    <button
                      type="button"
                      onClick={() => copyProfileLink("Patrick Pozsgai")}
                      className="sn-quick-btn"
                      title="Copiar enlace de perfil"
                    >
                      {Icons.link}
                    </button>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Engineering Principles Section */}
      <section className="sn-principles-section">
        <div className="sn-container">
          <div className="sn-principles-header">
            <span className="sn-section-eyebrow">Filosofía &amp; Estándares</span>
            <h2 className="sn-section-title">Nuestros Principios de Ingeniería</h2>
            <p className="sn-principles-desc">
              No escribimos software para salir del paso. Cada módulo entregado se somete a métricas inflexibles de durabilidad y rendimiento.
            </p>
          </div>

          {/* 4-Card Minimalist Bento Grid */}
          <div className="sn-principles-grid">
            {/* Principle 01 */}
            <div className="sn-principle-card">
              <div className="sn-principle-top">
                <span className="sn-principle-code">01 // DEBT-FREE</span>
                <div className="sn-principle-icon-wrap">
                  {Icons.architecture}
                </div>
              </div>
              <div>
                <h3 className="sn-principle-title">
                  Arquitectura Libre de Deuda Técnica
                </h3>
                <p className="sn-principle-text">
                  Diseñamos pensando en escalabilidad a 3-5 años, no en parches provisionales. La modularidad desacoplada asegura que tu plataforma evolucione sin rehacer los cimientos.
                </p>
              </div>
              <div className="sn-principle-footer-tag">
                <span>SLA DESIGN // ZERO OBSOLETE DEPS // TS-STRICT</span>
              </div>
            </div>

            {/* Principle 02 */}
            <div className="sn-principle-card">
              <div className="sn-principle-top">
                <span className="sn-principle-code">02 // VELOCITY</span>
                <div className="sn-principle-icon-wrap">
                  {Icons.bolt}
                </div>
              </div>
              <div>
                <h3 className="sn-principle-title">
                  Velocidad de Ejecución sin Burocracia
                </h3>
                <p className="sn-principle-text">
                  Comunicación directa entre líderes técnicos y clientes; sin intermediarios innecesarios. Sprints quincenales funcionales con visibilidad total de los entregables.
                </p>
              </div>
              <div className="sn-principle-footer-tag">
                <span>DIRECT SLACK / GITHUB WORKFLOW // REALTIME COMMITS</span>
              </div>
            </div>

            {/* Principle 03 */}
            <div className="sn-principle-card">
              <div className="sn-principle-top">
                <span className="sn-principle-code">03 // OWNERSHIP</span>
                <div className="sn-principle-icon-wrap">
                  {Icons.key}
                </div>
              </div>
              <div>
                <h3 className="sn-principle-title">
                  Transparencia y Ownership Total
                </h3>
                <p className="sn-principle-text">
                  El código fuente, la infraestructura y los repositorios son 100% tuyos desde el día uno. Sin retención de propiedad ni dependencia forzada de nuestro equipo.
                </p>
              </div>
              <div className="sn-principle-footer-tag">
                <span>FULL IP TRANSFER // UNRESTRICTED CLOUD PROVISIONING</span>
              </div>
            </div>

            {/* Principle 04 */}
            <div className="sn-principle-card">
              <div className="sn-principle-top">
                <span className="sn-principle-code">04 // RESILIENCE</span>
                <div className="sn-principle-icon-wrap">
                  {Icons.security}
                </div>
              </div>
              <div>
                <h3 className="sn-principle-title">
                  Seguridad y Resiliencia en Producción
                </h3>
                <p className="sn-principle-text">
                  Encriptación de nivel bancario, pipelines CI/CD automatizados y SLAs de disponibilidad garantizados con tolerancia activa a fallas bajo alta concurrencia.
                </p>
              </div>
              <div className="sn-principle-footer-tag">
                <span>AUTONOMOUS FAILOVER // ZERO-TRUST // PEN-TEST PASS</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Operations Center & Visual Context Section */}
      <section className="sn-operations-section">
        <div className="sn-container">
          <div className="sn-operations-card">
            {/* Left Visual: Boardroom Image */}
            <div className="sn-operations-visual">
              <img
                src="/sobre-nosotros/boardroom.jpg"
                alt="Zentpiper Tech Lab Centro de Operaciones"
                className="sn-operations-image"
                loading="lazy"
              />
              <div className="sn-operations-overlay" />
              <div className="sn-operations-live-pill">
                <span className="sn-live-ping-dot" />
                <span className="sn-live-text">Zentpiper Tech Lab // CDMX • Global Remote</span>
              </div>
            </div>

            {/* Right Content */}
            <div className="sn-operations-content">
              <div>
                <div className="sn-operations-badge">
                  {Icons.domain}
                  <span>CENTRO DE OPERACIONES &amp; ARQUITECTURA</span>
                </div>

                <h3 className="sn-operations-title">
                  Infraestructura &amp; Supervisión Continua
                </h3>

                <p className="sn-operations-desc">
                  Monitoreo de latencia, auditoría de seguridad y telemetría en tiempo real sobre cada solución desplegada en producción. Nuestros squads operan con estándares ISO y resiliencia multi-región.
                </p>

                <div className="sn-metrics-grid">
                  <div className="sn-metric-box">
                    <span className="sn-metric-val">&lt;45ms</span>
                    <span className="sn-metric-label">Latencia Global P99</span>
                  </div>
                  <div className="sn-metric-box">
                    <span className="sn-metric-val font-gold">Zero-Trust</span>
                    <span className="sn-metric-label">Seguridad Activa</span>
                  </div>
                </div>
              </div>

              <div className="sn-squad-status-box">
                <div>
                  <span className="sn-status-box-label">Disponibilidad de Squad</span>
                  <span className="sn-status-box-val">Abierto para Q3-Q4 2025</span>
                </div>
                <div className="sn-squad-status-icon">
                  {Icons.speed}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner Section */}
      <section className="sn-cta-section">
        <div className="sn-cta-ambient" aria-hidden="true" />
        
        <div className="sn-container sn-cta-container">
          <div className="sn-cta-box">
            <div className="sn-cta-icon-badge">
              {Icons.handshake}
            </div>

            <h2 className="sn-cta-title">
              ¿Listo para colaborar directamente con nuestro equipo de ingeniería?
            </h2>

            <p className="sn-cta-subtitle">
              Agenda una llamada de 30 minutos con nuestros arquitectos y obtén un diagnóstico preliminar sin compromiso.
            </p>

            <div className="sn-cta-buttons">
              <button
                type="button"
                onClick={handleAgendar}
                className="sn-btn-primary"
              >
                <span>Agendar Sesión Técnica con el Equipo</span>
                {Icons.arrowRight}
              </button>

              <button
                type="button"
                onClick={handleWhatsApp}
                className="sn-btn-whatsapp"
              >
                {Icons.whatsapp}
                <span>Chatear por WhatsApp Inmediato</span>
              </button>
            </div>

            <div className="sn-cta-reassurance">
              {Icons.verified}
              <span>Respuesta confirmada en menos de 4 horas hábiles</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
