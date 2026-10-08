import { useNavigate, Link } from "react-router-dom";
import { memo, useCallback, useState } from "react";
import SEO from "../components/SEO";
import LazySection from "../components/LazySection";
import { usePais } from "../contexts/PaisContext";
import { formatearPrecio } from "../data/precios";
import "./Home.css";

const HERO_VIDEOS = ["/videos/1.mp4", "/videos/2.mp4"];

/* Cycles through the hero videos endlessly, playing one after another.
   Keying the <video> by src forces a clean remount per clip so the browser's
   own autoPlay handles playback instead of a manual load()/play() race — and
   onError also advances, so a clip that fails to play can't freeze the loop. */
const HeroVideoBackground = memo(function HeroVideoBackground() {
  const [index, setIndex] = useState(0);

  const playNext = useCallback(() => {
    setIndex((i) => (i + 1) % HERO_VIDEOS.length);
  }, []);

  return (
    <video
      key={HERO_VIDEOS[index]}
      className="hero-video"
      autoPlay
      muted
      playsInline
      preload="auto"
      onEnded={playNext}
      onError={playNext}
      aria-hidden="true"
    >
      <source src={HERO_VIDEOS[index]} type="video/mp4" />
    </video>
  );
});

function Home() {
  const navigate = useNavigate();
  const { paisSeleccionado, paisData } = usePais();
  const [pricingTab, setPricingTab] = useState("web");
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const handleVerPlanes = () => navigate("/planes");
  const handleHablarConNosotros = () => navigate("/contacto");
  const handleVerMobile = () => navigate("/mobile");

  const buildWhatsappLink = (planName) => {
    const phone = paisData?.whatsapp || "51988490319";
    const text = encodeURIComponent(
      `Hola Zentpiper, me gustaría recibir más información y cotizar el ${planName} para ${paisData?.nombre || "mi negocio"}.`
    );
    return `https://wa.me/${phone}?text=${text}`;
  };

  return (
    <>
      <SEO
        title="Zentpiper - Diseño Web, Hosting y SEO en Perú"
        description="Agencia de diseño web y desarrollo de software en Santiago de Surco, Lima. Creamos sitios web profesionales, rápidos y optimizados para SEO. Incluye hosting y dominio."
        keywords="diseño web Surco, desarrollo web Lima, páginas web optimizadas, SEO Perú, agencia de software Surco, hosting, Zentpiper"
        canonical="https://zentpiper.com/"
      />

      {/* Hero Section — renders immediately (above the fold) */}
      <section className="hero-section">
        <HeroVideoBackground />
        <div className="hero-video-overlay" />

        <div className="hero-topbar">
          <span className="hero-eyebrow">ZENTPIPER / PERÚ · RUSIA · ESPAÑA © &nbsp;·&nbsp; AGENCIA DIGITAL</span>
          <Link to="/contacto" className="hero-topbar-link">HABLA CON NOSOTROS</Link>
        </div>

        <div className="hero-main">
          <div className="hero-title-wrap">
            <h1 className="hero-title-stack">
              <span>DISEÑO</span>
              <span>WEB &amp;</span>
              <span className="hero-title-outline">SOFTWARE</span>
            </h1>
            <p className="sr-only">
              Agencia de diseño web y desarrollo de software en Santiago de Surco, Lima. Creamos sitios web profesionales, rápidos y optimizados para SEO, con diseño moderno para que tu negocio destaque en Google.
            </p>
            <div className="hero-mark" aria-hidden="true">
              <img src="/Logo-definitivo-Isotipo.webp" alt="" width="140" height="140" loading="eager" />
            </div>
          </div>

          <aside className="hero-tags">
            <span className="hero-tags-index">[ 01 // CORE ]</span>
            <p className="hero-tags-highlight">
              / ALTA CONVERSIÓN
              <br />
              ARTESANÍA PERUANA x TECH
            </p>
            <ul className="hero-tags-list">
              <li>/ DISEÑO WEB INTERACTIVO</li>
              <li>/ CONTENIDO DE ALTA RETENCIÓN</li>
              <li>/ DIRECCIÓN DE ARTE Y CÓDIGO</li>
            </ul>
          </aside>
        </div>

        <div className="hero-footer">
          <div className="hero-footer-location">
            <span className="hero-footer-eyebrow">ALCANCE // PRESENCIA GLOBAL</span>
            <p className="hero-footer-title">RAÍCES PERUANAS, CON PRESENCIA GLOBAL DESTACADA EN RUSIA Y ESPAÑA</p>
          </div>
          <div className="cta-buttons hero-footer-actions">
            <Link className="btn btn-primary btn-hero" to="/planes">
              <span>Ver Planes</span>
              <i className="arrow">→</i>
            </Link>
            <Link className="btn btn-secondary btn-hero" to="/contacto">
              <span>Habla con nosotros</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          BELOW-THE-FOLD SECTIONS (HIGH-CONVERSION ARCHITECTURE)
          ========================================================================= */}

      {/* 1. Métricas de Impacto & Marquee de Clientes */}
      <section className="zp-metrics-section">
        <div className="zp-container">
          <div className="zp-metrics-grid">
            <div className="zp-metric-card">
              <span className="zp-metric-number">+50</span>
              <span className="zp-metric-label">Proyectos Entregados</span>
              <p className="zp-metric-detail">Plataformas web, SaaS y apps lanzadas en producción.</p>
            </div>
            <div className="zp-metric-card">
              <span className="zp-metric-number">3</span>
              <span className="zp-metric-label">Países con Presencia</span>
              <p className="zp-metric-detail">Operaciones y clientes en Perú, Rusia y España.</p>
            </div>
            <div className="zp-metric-card">
              <span className="zp-metric-number">&lt;0.8s</span>
              <span className="zp-metric-label">Velocidad de Carga</span>
              <p className="zp-metric-detail">Optimizado al 100% en Google Core Web Vitals.</p>
            </div>
            <div className="zp-metric-card">
              <span className="zp-metric-number">99.9%</span>
              <span className="zp-metric-label">Uptime Garantizado</span>
              <p className="zp-metric-detail">Infraestructura cloud en Vercel y AWS con SSL.</p>
            </div>
          </div>

          <div className="zp-clients-wrapper">
            <span className="zp-clients-title">MARCAS Y LÍDERES QUE CONFÍAN EN ZENTPIPER</span>
            <div className="zp-clients-marquee">
              <div className="zp-marquee-track">
                <span>Cegrisa Import</span>
                <span className="zp-dot">•</span>
                <span>Naim Marchionni</span>
                <span className="zp-dot">•</span>
                <span>Spanglish Academy</span>
                <span className="zp-dot">•</span>
                <span>ZentFlow CRM</span>
                <span className="zp-dot">•</span>
                <span>Peruana en Rusia</span>
                <span className="zp-dot">•</span>
                <span>Lima Moscow</span>
                <span className="zp-dot">•</span>
                <span>Cegrisa Import</span>
                <span className="zp-dot">•</span>
                <span>Naim Marchionni</span>
                <span className="zp-dot">•</span>
                <span>Spanglish Academy</span>
                <span className="zp-dot">•</span>
                <span>ZentFlow CRM</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Bento Grid de Capacidades & Soluciones Core */}
      <LazySection minHeight="720px">
        <section className="zp-bento-section">
          <div className="zp-container">
            <div className="zp-section-header">
              <span className="zp-section-badge">[ 02 // CAPACIDADES ]</span>
              <h2 className="zp-section-title">
                Ingeniería Digital de <span className="zp-gold-gradient">Alto Rendimiento</span>
              </h2>
              <p className="zp-section-subtitle">
                Desarrollamos tecnología a medida para empresas que buscan diferenciarse. Sin plantillas genéricas, sin límites técnicos.
              </p>
            </div>

            <div className="zp-bento-grid">
              {/* Bento Card 1: Desarrollo Web Premium (Destacada) */}
              <div className="zp-bento-card zp-bento-card--featured">
                <div className="zp-bento-content">
                  <span className="zp-card-category">WEB &amp; E-COMMERCE</span>
                  <h3 className="zp-card-title">Sitios Web y Tiendas de Alta Conversión</h3>
                  <p className="zp-card-desc">
                    Arquitectura moderna en React y Next.js. Sitios que cargan al instante, transmiten prestigio de marca y convierten visitantes en clientes activos.
                  </p>
                  <div className="zp-card-tags">
                    <span className="zp-tag">Next.js</span>
                    <span className="zp-tag">Vercel Edge</span>
                    <span className="zp-tag">SEO Técnico</span>
                    <span className="zp-tag">Pasarelas de Pago</span>
                  </div>
                  <div className="zp-card-actions">
                    <button className="zp-btn zp-btn-primary" onClick={handleVerPlanes}>
                      <span>Explorar Planes Web</span>
                      <span className="zp-arrow">→</span>
                    </button>
                  </div>
                </div>
                <div className="zp-bento-media">
                  <img
                    src="/web_showcase_mockup.jpg"
                    alt="Mockup de desarrollo web de lujo"
                    className="zp-bento-img"
                    loading="lazy"
                  />
                  <div className="zp-media-badge">
                    <span className="zp-badge-indicator"></span>
                    <span>100/100 PageSpeed</span>
                  </div>
                </div>
              </div>

              {/* Bento Card 2: Aplicaciones Móviles */}
              <div className="zp-bento-card">
                <div className="zp-bento-content">
                  <span className="zp-card-category">MOBILE FIRST</span>
                  <h3 className="zp-card-title">Apps Móviles Nativas (iOS &amp; Android)</h3>
                  <p className="zp-card-desc">
                    Diseño de interfaces táctiles fluidas a 120 FPS, sincronización en tiempo real y publicación garantizada en las tiendas oficiales.
                  </p>
                  <div className="zp-card-tags">
                    <span className="zp-tag">Flutter</span>
                    <span className="zp-tag">Push Notifications</span>
                    <span className="zp-tag">Modo Offline</span>
                  </div>
                  <div className="zp-card-actions">
                    <button className="zp-btn zp-btn-secondary" onClick={handleVerMobile}>
                      <span>Ver Planes Mobile</span>
                      <span className="zp-arrow">→</span>
                    </button>
                  </div>
                </div>
                <div className="zp-bento-media">
                  <img
                    src="/mobile_app_mockup.jpg"
                    alt="Mockup de aplicaciones móviles en smartphones"
                    className="zp-bento-img"
                    loading="lazy"
                  />
                  <div className="zp-media-badge">
                    <span className="zp-badge-indicator"></span>
                    <span>iOS &amp; Android Ready</span>
                  </div>
                </div>
              </div>

              {/* Bento Card 3: Software a Medida & CRM */}
              <div className="zp-bento-card">
                <div className="zp-bento-content">
                  <span className="zp-card-category">SOFTWARE A MEDIDA</span>
                  <h3 className="zp-card-title">Sistemas Web &amp; CRM Empresarial</h3>
                  <p className="zp-card-desc">
                    Creamos plataformas a medida como <strong>ZentFlow</strong>: gestión comercial de leads, control de inventarios y dashboards de analítica en tiempo real.
                  </p>
                  <div className="zp-card-tags">
                    <span className="zp-tag">Dashboards KPI</span>
                    <span className="zp-tag">Roles y Permisos</span>
                    <span className="zp-tag">APIs REST</span>
                  </div>
                  <div className="zp-card-actions">
                    <button className="zp-btn zp-btn-secondary" onClick={handleHablarConNosotros}>
                      <span>Cotizar Sistema</span>
                      <span className="zp-arrow">→</span>
                    </button>
                  </div>
                </div>
                <div className="zp-bento-media">
                  <img
                    src="/crm_dashboard_mockup.jpg"
                    alt="Mockup de software y CRM ZentFlow"
                    className="zp-bento-img"
                    loading="lazy"
                  />
                  <div className="zp-media-badge">
                    <span className="zp-badge-indicator"></span>
                    <span>Gestión en Tiempo Real</span>
                  </div>
                </div>
              </div>

              {/* Bento Card 4: Infraestructura Cloud & SEO */}
              <div className="zp-bento-card zp-bento-card--wide">
                <div className="zp-bento-content">
                  <span className="zp-card-category">INFRAESTRUCTURA &amp; CRECIMIENTO</span>
                  <h3 className="zp-card-title">Hosting Cloud Redundante, Dominio Propio y SEO Orgánico</h3>
                  <p className="zp-card-desc">
                    Nos encargamos de toda la complejidad técnica. Todos nuestros proyectos incluyen servidor premium, dominio por un año, certificado SSL de máxima seguridad y arquitectura optimizada para posicionar en Google.
                  </p>
                  <div className="zp-card-tags">
                    <span className="zp-tag">Hosting + Dominio 1 Año</span>
                    <span className="zp-tag">Certificado SSL Gratis</span>
                    <span className="zp-tag">Indexación Google</span>
                    <span className="zp-tag">Backups Diarios</span>
                  </div>
                </div>
                <div className="zp-bento-media zp-bento-media--wide">
                  <img
                    src="/cloud_infra_mockup.jpg"
                    alt="Visualización de infraestructura cloud global"
                    className="zp-bento-img"
                    loading="lazy"
                  />
                  <div className="zp-media-badge">
                    <span className="zp-badge-indicator"></span>
                    <span>Red Global Ultra-Rápida</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </LazySection>

      {/* 3. Showcase Interactivo de Proyectos Reales */}
      <LazySection minHeight="650px">
        <section className="zp-showcase-section">
          <div className="zp-container">
            <div className="zp-section-header">
              <span className="zp-section-badge">[ 03 // CASOS DE ÉXITO ]</span>
              <h2 className="zp-section-title">
                Proyectos Reales en <span className="zp-gold-gradient">Producción Activa</span>
              </h2>
              <p className="zp-section-subtitle">
                Desde Lima hasta Moscú y Madrid, hemos desarrollado plataformas que generan ventas y reputación para nuestros clientes.
              </p>
            </div>

            <div className="zp-showcase-grid">
              {/* Proyecto 1: Cegrisa Import */}
              <article className="zp-project-card">
                <div className="zp-project-media">
                  <img src="/cegrisa.webp" alt="Proyecto Cegrisa Import" loading="lazy" />
                  <span className="zp-project-tag">E-Commerce &amp; Catálogo</span>
                </div>
                <div className="zp-project-info">
                  <h3 className="zp-project-title">Cegrisa Import</h3>
                  <p className="zp-project-desc">
                    Plataforma catálogo de cerámicas y acabados de construcción con alta velocidad de renderizado y filtros inteligentes.
                  </p>
                  <div className="zp-project-meta">
                    <span className="zp-tech-pill">React</span>
                    <span className="zp-tech-pill">Django</span>
                    <span className="zp-tech-pill">PostgreSQL</span>
                  </div>
                  <div className="zp-project-footer">
                    <a
                      href="https://cegrisa-one.vercel.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="zp-project-link"
                    >
                      <span>Ver Proyecto en Vivo</span>
                      <span>↗</span>
                    </a>
                  </div>
                </div>
              </article>

              {/* Proyecto 2: Naim Marchionni */}
              <article className="zp-project-card">
                <div className="zp-project-media">
                  <img src="/Naim pág" alt="Proyecto Naim Marchionni" loading="lazy" />
                  <span className="zp-project-tag">Música &amp; Entretenimiento</span>
                </div>
                <div className="zp-project-info">
                  <h3 className="zp-project-title">Naim Marchionni</h3>
                  <p className="zp-project-desc">
                    Sitio web interactivo para DJ &amp; Productor de Tech House con reproductor de audio integrado y diseño editorial inmersivo.
                  </p>
                  <div className="zp-project-meta">
                    <span className="zp-tech-pill">Next.js</span>
                    <span className="zp-tech-pill">CSS Modules</span>
                    <span className="zp-tech-pill">Audio API</span>
                  </div>
                  <div className="zp-project-footer">
                    <a
                      href="https://www.naimmarchionni.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="zp-project-link"
                    >
                      <span>Ver Proyecto en Vivo</span>
                      <span>↗</span>
                    </a>
                  </div>
                </div>
              </article>

              {/* Proyecto 3: ZentFlow */}
              <article className="zp-project-card">
                <div className="zp-project-media">
                  <img src="/HYG.webp" alt="Proyecto ZentFlow CRM" loading="lazy" />
                  <span className="zp-project-tag">SaaS / CRM Comercial</span>
                </div>
                <div className="zp-project-info">
                  <h3 className="zp-project-title">ZentFlow CRM</h3>
                  <p className="zp-project-desc">
                    Sistema integral de gestión de ventas, pipeline comercial automatizado y analíticas operativas para empresas de servicios.
                  </p>
                  <div className="zp-project-meta">
                    <span className="zp-tech-pill">Next.js</span>
                    <span className="zp-tech-pill">React</span>
                    <span className="zp-tech-pill">CRM Cloud</span>
                  </div>
                  <div className="zp-project-footer">
                    <a
                      href="https://zent-flow.vercel.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="zp-project-link"
                    >
                      <span>Ver Proyecto en Vivo</span>
                      <span>↗</span>
                    </a>
                  </div>
                </div>
              </article>

              {/* Proyecto 4: Spanglish Academy */}
              <article className="zp-project-card">
                <div className="zp-project-media">
                  <img src="/Af-academy.png" alt="Proyecto Spanglish Academy" loading="lazy" />
                  <span className="zp-project-tag">Educación Internacional</span>
                </div>
                <div className="zp-project-info">
                  <h3 className="zp-project-title">Spanglish Academy</h3>
                  <p className="zp-project-desc">
                    Academia de idiomas con base en Rusia. Sistema de captación de alumnos, reserva de clases y portal informativo multilingüe.
                  </p>
                  <div className="zp-project-meta">
                    <span className="zp-tech-pill">React</span>
                    <span className="zp-tech-pill">Tailwind</span>
                    <span className="zp-tech-pill">Vercel</span>
                  </div>
                  <div className="zp-project-footer">
                    <a
                      href="https://www.spanglishac.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="zp-project-link"
                    >
                      <span>Ver Proyecto en Vivo</span>
                      <span>↗</span>
                    </a>
                  </div>
                </div>
              </article>
            </div>

            <div className="zp-center-action">
              <Link to="/portafolio" className="zp-btn zp-btn-outline-gold">
                <span>Explorar Todos los Proyectos</span>
                <span className="zp-arrow">→</span>
              </Link>
            </div>
          </div>
        </section>
      </LazySection>

      {/* 4. El Método Zentpiper: 4 Fases hacia el Lanzamiento */}
      <LazySection minHeight="580px">
        <section className="zp-method-section">
          <div className="zp-container">
            <div className="zp-section-header">
              <span className="zp-section-badge">[ 04 // METODOLOGÍA ]</span>
              <h2 className="zp-section-title">
                El Método <span className="zp-gold-gradient">Zentpiper</span>
              </h2>
              <p className="zp-section-subtitle">
                Un flujo de trabajo transparente y riguroso para entregar tu producto digital a tiempo y sin sorpresas.
              </p>
            </div>

            <div className="zp-method-grid">
              <div className="zp-method-step">
                <div className="zp-step-top">
                  <span className="zp-step-num">01</span>
                  <span className="zp-step-phase">ESTRATEGIA</span>
                </div>
                <h3 className="zp-step-title">Descubrimiento &amp; Arquitectura</h3>
                <p className="zp-step-desc">
                  Analizamos a tus competidores, tu público objetivo y los embudos de conversión necesarios para definir la estructura ideal.
                </p>
              </div>

              <div className="zp-method-step">
                <div className="zp-step-top">
                  <span className="zp-step-num">02</span>
                  <span className="zp-step-phase">DIRECCIÓN DE ARTE</span>
                </div>
                <h3 className="zp-step-title">Diseño UI/UX Exclusivo</h3>
                <p className="zp-step-desc">
                  Prototipamos interfaces modernas en Figma, cuidando la tipografía, los contrastes, micro-animaciones y la adaptabilidad en móviles.
                </p>
              </div>

              <div className="zp-method-step">
                <div className="zp-step-top">
                  <span className="zp-step-num">03</span>
                  <span className="zp-step-phase">INGENIERÍA</span>
                </div>
                <h3 className="zp-step-title">Desarrollo &amp; Optimización</h3>
                <p className="zp-step-desc">
                  Programación limpia con React / Next.js. Optimizamos cada línea de código para alcanzar un puntaje perfecto en Google PageSpeed.
                </p>
              </div>

              <div className="zp-method-step">
                <div className="zp-step-top">
                  <span className="zp-step-num">04</span>
                  <span className="zp-step-phase">DESPLIEGUE</span>
                </div>
                <h3 className="zp-step-title">Lanzamiento &amp; Soporte Activo</h3>
                <p className="zp-step-desc">
                  Configuración de dominio, hosting, SSL, Google Analytics y soporte continuo directo por WhatsApp con nuestro equipo técnico.
                </p>
              </div>
            </div>
          </div>
        </section>
      </LazySection>

      {/* 5. Selector Dinámico de Planes e Inversión */}
      <LazySection minHeight="780px">
        <section className="zp-pricing-section">
          <div className="zp-container">
            <div className="zp-section-header">
              <span className="zp-section-badge">[ 05 // PLANES TRANSPARENTES ]</span>
              <h2 className="zp-section-title">
                Inversión Clara para <span className="zp-gold-gradient">{paisData?.nombre || "tu Negocio"}</span>
              </h2>
              <p className="zp-section-subtitle">
                Sin letras pequeñas. Todos los planes incluyen hosting de alto rendimiento, dominio por un año y soporte técnico directo.
              </p>
            </div>

            {/* Toggle Web vs Mobile */}
            <div className="zp-pricing-switch-wrap">
              <div className="zp-pricing-switch">
                <button
                  type="button"
                  className={`zp-switch-btn ${pricingTab === "web" ? "zp-switch-btn--active" : ""}`}
                  onClick={() => setPricingTab("web")}
                >
                  🌐 Planes de Desarrollo Web
                </button>
                <button
                  type="button"
                  className={`zp-switch-btn ${pricingTab === "mobile" ? "zp-switch-btn--active" : ""}`}
                  onClick={() => setPricingTab("mobile")}
                >
                  📱 Planes de Aplicaciones Móviles
                </button>
              </div>
            </div>

            {/* Grid de Planes Web */}
            {pricingTab === "web" && (
              <div className="zp-pricing-grid">
                {/* Plan Básico */}
                <div className="zp-price-card">
                  <div className="zp-price-header">
                    <span className="zp-plan-tag">LANZAMIENTO</span>
                    <h3 className="zp-plan-name">Plan Básico</h3>
                    <p className="zp-plan-summary">Ideal para presencia rápida y profesional en internet.</p>
                  </div>
                  <div className="zp-price-val-wrap">
                    <span className="zp-price-val">
                      {formatearPrecio(paisData?.planesWeb?.basico?.desarrollo || 500, paisSeleccionado)}
                    </span>
                    <span className="zp-price-period">Pago único</span>
                  </div>
                  <ul className="zp-plan-perks">
                    <li>✓ Landing Page de alta velocidad (1 sección)</li>
                    <li>✓ Hosting Cloud + Dominio (.com) por 1 año</li>
                    <li>✓ Certificado SSL de seguridad incluido</li>
                    <li>✓ Botón flotante directo a WhatsApp</li>
                    <li>✓ 100% Adaptable a celulares y tablets</li>
                  </ul>
                  <div className="zp-plan-action">
                    <a
                      href={buildWhatsappLink("Plan Básico Web")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="zp-btn zp-btn-secondary zp-btn-full"
                    >
                      <span>Contratar Básico</span>
                      <span className="zp-arrow">→</span>
                    </a>
                  </div>
                </div>

                {/* Plan Emprendedor */}
                <div className="zp-price-card">
                  <div className="zp-price-header">
                    <span className="zp-plan-tag">CRECIMIENTO</span>
                    <h3 className="zp-plan-name">Plan Emprendedor</h3>
                    <p className="zp-plan-summary">Para negocios que desean mostrar catálogo de servicios completo.</p>
                  </div>
                  <div className="zp-price-val-wrap">
                    <span className="zp-price-val">
                      {formatearPrecio(paisData?.planesWeb?.emprendedor?.desarrollo || 900, paisSeleccionado)}
                    </span>
                    <span className="zp-price-period">Pago único</span>
                  </div>
                  <ul className="zp-plan-perks">
                    <li>✓ Sitio web completo de hasta 5 páginas</li>
                    <li>✓ Hosting Cloud + Dominio propio por 1 año</li>
                    <li>✓ SEO on-page para posicionar en Google</li>
                    <li>✓ Formulario dinámico de captación de leads</li>
                    <li>✓ Correos corporativos personalizados</li>
                  </ul>
                  <div className="zp-plan-action">
                    <a
                      href={buildWhatsappLink("Plan Emprendedor Web")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="zp-btn zp-btn-secondary zp-btn-full"
                    >
                      <span>Contratar Emprendedor</span>
                      <span className="zp-arrow">→</span>
                    </a>
                  </div>
                </div>

                {/* Plan Profesional (Destacado) */}
                <div className="zp-price-card zp-price-card--popular">
                  <div className="zp-popular-badge">MÁS RECOMENDADO</div>
                  <div className="zp-price-header">
                    <span className="zp-plan-tag">ALTA CONVERSIÓN</span>
                    <h3 className="zp-plan-name">Plan Profesional</h3>
                    <p className="zp-plan-summary">Para empresas consolidadas que exigen máxima diferenciación y velocidad.</p>
                  </div>
                  <div className="zp-price-val-wrap">
                    <span className="zp-price-val">
                      {formatearPrecio(paisData?.planesWeb?.profesional?.desarrollo || 1500, paisSeleccionado)}
                    </span>
                    <span className="zp-price-period">Pago único</span>
                  </div>
                  <ul className="zp-plan-perks">
                    <li>✓ Sitio corporativo de hasta 10 páginas</li>
                    <li>✓ Diseño UI/UX artesanal 100% exclusivo</li>
                    <li>✓ SEO Técnico avanzado + Google Analytics 4</li>
                    <li>✓ Arquitectura Next.js ultra-optimizada</li>
                    <li>✓ Soporte técnico y mantenimiento prioritario</li>
                  </ul>
                  <div className="zp-plan-action">
                    <a
                      href={buildWhatsappLink("Plan Profesional Web")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="zp-btn zp-btn-primary zp-btn-full"
                    >
                      <span>Contratar Profesional</span>
                      <span className="zp-arrow">→</span>
                    </a>
                  </div>
                </div>

                {/* Plan Tienda Virtual */}
                <div className="zp-price-card">
                  <div className="zp-price-header">
                    <span className="zp-plan-tag">E-COMMERCE</span>
                    <h3 className="zp-plan-name">Tienda Virtual</h3>
                    <p className="zp-plan-summary">Vende productos físicos o digitales con pagos en línea automáticos.</p>
                  </div>
                  <div className="zp-price-val-wrap">
                    <span className="zp-price-val">
                      {formatearPrecio(paisData?.planesWeb?.tienda?.desarrollo || 2500, paisSeleccionado)}
                    </span>
                    <span className="zp-price-period">Pago único</span>
                  </div>
                  <ul className="zp-plan-perks">
                    <li>✓ Catálogo de productos y carrito de compras</li>
                    <li>✓ Pasarelas de pago (MercadoPago, Culqi, Stripe)</li>
                    <li>✓ Panel autoadministrable de inventario</li>
                    <li>✓ Notificaciones automáticas de pedidos</li>
                    <li>✓ Hosting de alta capacidad y SSL para pagos</li>
                  </ul>
                  <div className="zp-plan-action">
                    <a
                      href={buildWhatsappLink("Plan Tienda Virtual")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="zp-btn zp-btn-secondary zp-btn-full"
                    >
                      <span>Contratar Tienda</span>
                      <span className="zp-arrow">→</span>
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Grid de Planes Mobile */}
            {pricingTab === "mobile" && (
              <div className="zp-pricing-grid zp-pricing-grid--mobile">
                <div className="zp-price-card">
                  <div className="zp-price-header">
                    <span className="zp-plan-tag">ANDROID</span>
                    <h3 className="zp-plan-name">App Android Nativa</h3>
                    <p className="zp-plan-summary">Desarrollo optimizado para el ecosistema Google Play.</p>
                  </div>
                  <div className="zp-price-val-wrap">
                    <span className="zp-price-val">
                      {formatearPrecio(paisData?.planesMobile?.android?.desarrollo || 7000, paisSeleccionado)}
                    </span>
                    <span className="zp-price-period">Pago de desarrollo</span>
                  </div>
                  <ul className="zp-plan-perks">
                    <li>✓ Arquitectura Kotlin / Android SDK</li>
                    <li>✓ Publicación en Google Play Store</li>
                    <li>✓ Notificaciones push y modo offline</li>
                    <li>✓ Integración con APIs y base de datos</li>
                  </ul>
                  <div className="zp-plan-action">
                    <a
                      href={buildWhatsappLink("Plan App Android")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="zp-btn zp-btn-secondary zp-btn-full"
                    >
                      <span>Cotizar Android</span>
                      <span className="zp-arrow">→</span>
                    </a>
                  </div>
                </div>

                <div className="zp-price-card">
                  <div className="zp-price-header">
                    <span className="zp-plan-tag">APPLE</span>
                    <h3 className="zp-plan-name">App iOS Nativa</h3>
                    <p className="zp-plan-summary">Experiencia refinada para iPhone e iPad en Swift.</p>
                  </div>
                  <div className="zp-price-val-wrap">
                    <span className="zp-price-val">
                      {formatearPrecio(paisData?.planesMobile?.ios?.desarrollo || 10500, paisSeleccionado)}
                    </span>
                    <span className="zp-price-period">Pago de desarrollo</span>
                  </div>
                  <ul className="zp-plan-perks">
                    <li>✓ Arquitectura Swift / SwiftUI</li>
                    <li>✓ Aprobación y publicación en App Store</li>
                    <li>✓ Soporte para Face ID y Apple Pay</li>
                    <li>✓ Rendimiento a 120Hz ProMotion</li>
                  </ul>
                  <div className="zp-plan-action">
                    <a
                      href={buildWhatsappLink("Plan App iOS")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="zp-btn zp-btn-secondary zp-btn-full"
                    >
                      <span>Cotizar iOS</span>
                      <span className="zp-arrow">→</span>
                    </a>
                  </div>
                </div>

                <div className="zp-price-card zp-price-card--popular">
                  <div className="zp-popular-badge">MÁS POPULAR</div>
                  <div className="zp-price-header">
                    <span className="zp-plan-tag">CROSS-PLATFORM</span>
                    <h3 className="zp-plan-name">App Flutter Multiplataforma</h3>
                    <p className="zp-plan-summary">Una sola base de código para iOS y Android con rendimiento nativo.</p>
                  </div>
                  <div className="zp-price-val-wrap">
                    <span className="zp-price-val">
                      {formatearPrecio(paisData?.planesMobile?.flutter?.desarrollo || 12000, paisSeleccionado)}
                    </span>
                    <span className="zp-price-period">Pago de desarrollo</span>
                  </div>
                  <ul className="zp-plan-perks">
                    <li>✓ 1 Solo desarrollo para iOS + Android</li>
                    <li>✓ Publicación en ambas tiendas</li>
                    <li>✓ Ahorro del 40% en costos de mantenimiento</li>
                    <li>✓ Panel de control web sincronizado</li>
                  </ul>
                  <div className="zp-plan-action">
                    <a
                      href={buildWhatsappLink("Plan App Flutter")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="zp-btn zp-btn-primary zp-btn-full"
                    >
                      <span>Cotizar Flutter</span>
                      <span className="zp-arrow">→</span>
                    </a>
                  </div>
                </div>
              </div>
            )}

            <div className="zp-pricing-notes">
              <p>
                ¿Tienes requerimientos especiales o un sistema empresarial más grande?{" "}
                <Link to="/contacto" className="zp-link-gold">Contáctanos para una cotización personalizada sin costo</Link>.
              </p>
            </div>
          </div>
        </section>
      </LazySection>

      {/* 6. Matriz Comparativa: Zentpiper vs. WordPress / Agencias Tradicionales */}
      <LazySection minHeight="520px">
        <section className="zp-comparison-section">
          <div className="zp-container">
            <div className="zp-section-header">
              <span className="zp-section-badge">[ 06 // DIFERENCIACIÓN ]</span>
              <h2 className="zp-section-title">
                ¿Por Qué Elegir <span className="zp-gold-gradient">Zentpiper</span>?
              </h2>
              <p className="zp-section-subtitle">
                Comparamos nuestro estándar de desarrollo contra las agencias convencionales basadas en WordPress.
              </p>
            </div>

            <div className="zp-comparison-table-wrap">
              <table className="zp-comparison-table">
                <thead>
                  <tr>
                    <th>Característica</th>
                    <th className="zp-col-zentpiper">
                      <span>Zentpiper Tech Agency</span>
                    </th>
                    <th className="zp-col-others">Otras Agencias / WordPress</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Velocidad Google PageSpeed</strong></td>
                    <td className="zp-col-zentpiper">
                      <span className="zp-check">★ 95 - 100 / 100</span> (Carga instantánea)
                    </td>
                    <td className="zp-col-others">
                      <span className="zp-cross">✕ 30 - 60 / 100</span> (Lento y pesado)
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Seguridad &amp; Vulnerabilidades</strong></td>
                    <td className="zp-col-zentpiper">
                      <span className="zp-check">✓ Blindaje Total</span> (Sin plugins hackeables)
                    </td>
                    <td className="zp-col-others">
                      <span className="zp-cross">✕ Plugins desactualizados</span> con riesgo de hackeo
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Diseño &amp; Exclusividad</strong></td>
                    <td className="zp-col-zentpiper">
                      <span className="zp-check">✓ 100% Artesanal y a Medida</span>
                    </td>
                    <td className="zp-col-others">
                      <span className="zp-cross">✕ Plantillas compradas</span> y repetidas
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Hosting &amp; Dominio</strong></td>
                    <td className="zp-col-zentpiper">
                      <span className="zp-check">✓ Todo Incluido</span> por 1 año completo
                    </td>
                    <td className="zp-col-others">
                      <span className="zp-cross">✕ Cobros sorpresa</span> de licencias y servidores
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Soporte al Cliente</strong></td>
                    <td className="zp-col-zentpiper">
                      <span className="zp-check">✓ Directo por WhatsApp</span> con ingenieros
                    </td>
                    <td className="zp-col-others">
                      <span className="zp-cross">✕ Tickets lentos</span> o bots automáticos
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </LazySection>

      {/* 7. Testimonios Reales Verificados */}
      <LazySection minHeight="480px">
        <section className="zp-testimonials-section">
          <div className="zp-container">
            <div className="zp-section-header">
              <span className="zp-section-badge">[ 07 // TESTIMONIOS ]</span>
              <h2 className="zp-section-title">
                La Experiencia de <span className="zp-gold-gradient">Nuestros Clientes</span>
              </h2>
              <p className="zp-section-subtitle">
                Historias reales de fundadores y directores que transformaron su presencia digital con nosotros.
              </p>
            </div>

            <div className="zp-testimonials-grid">
              <div className="zp-testimonial-card">
                <div className="zp-stars">★★★★★</div>
                <p className="zp-testimonial-text">
                  “El sitio web de Naim Marchionni capturó a la perfección la estética oscura e inmersiva que buscaba para mi música. La velocidad de carga y la experiencia en celulares es de otro planeta.”
                </p>
                <div className="zp-author-meta">
                  <div className="zp-author-info">
                    <span className="zp-author-name">Naim Marchionni</span>
                    <span className="zp-author-role">DJ &amp; Productor Internacional · España 🇪🇸</span>
                  </div>
                </div>
              </div>

              <div className="zp-testimonial-card">
                <div className="zp-stars">★★★★★</div>
                <p className="zp-testimonial-text">
                  “Antes teníamos una web en WordPress que tardaba segundos en cargar los modelos de porcelanato. Zentpiper desarrolló nuestro catálogo y las consultas por WhatsApp crecieron más del 60%.”
                </p>
                <div className="zp-author-meta">
                  <div className="zp-author-info">
                    <span className="zp-author-name">Carlos Mendoza</span>
                    <span className="zp-author-role">Gerente Comercial, Cegrisa Import · Perú 🇵🇪</span>
                  </div>
                </div>
              </div>

              <div className="zp-testimonial-card">
                <div className="zp-stars">★★★★★</div>
                <p className="zp-testimonial-text">
                  “Coordinar el desarrollo de nuestra academia desde Moscú fue facilísimo con Zentpiper. Muy profesionales, cumplieron exactamente los plazos acordados y el diseño transmite absoluta confianza.”
                </p>
                <div className="zp-author-meta">
                  <div className="zp-author-info">
                    <span className="zp-author-name">Elena Volkova</span>
                    <span className="zp-author-role">Directora, Spanglish Academy · Rusia 🇷🇺</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </LazySection>

      {/* 8. Preguntas Frecuentes Interactivas (FAQ Accordion) */}
      <LazySection minHeight="540px">
        <section className="zp-faq-section">
          <div className="zp-container">
            <div className="zp-section-header">
              <span className="zp-section-badge">[ 08 // RESOLVIENDO DUDAS ]</span>
              <h2 className="zp-section-title">
                Preguntas <span className="zp-gold-gradient">Frecuentes</span>
              </h2>
              <p className="zp-section-subtitle">
                Todo lo que necesitas saber antes de iniciar tu proyecto con Zentpiper.
              </p>
            </div>

            <div className="zp-faq-list">
              <div className={`zp-faq-item ${openFaq === 0 ? "zp-faq-item--open" : ""}`}>
                <button type="button" className="zp-faq-question" onClick={() => toggleFaq(0)}>
                  <span>¿Cuánto tiempo toma tener mi sitio web publicado y funcionando?</span>
                  <span className="zp-faq-icon">{openFaq === 0 ? "−" : "+"}</span>
                </button>
                {openFaq === 0 && (
                  <div className="zp-faq-answer">
                    <p>
                      Para el <strong>Plan Básico</strong>, la entrega se realiza entre <strong>3 y 5 días hábiles</strong>. Para proyectos corporativos como el <strong>Plan Profesional</strong> o <strong>Tiendas Virtuales</strong>, el tiempo estimado es de <strong>7 a 14 días hábiles</strong>, incluyendo etapas de revisión, pruebas de velocidad e indexación en Google.
                    </p>
                  </div>
                )}
              </div>

              <div className={`zp-faq-item ${openFaq === 1 ? "zp-faq-item--open" : ""}`}>
                <button type="button" className="zp-faq-question" onClick={() => toggleFaq(1)}>
                  <span>¿El hosting y el dominio realmente están incluidos?</span>
                  <span className="zp-faq-icon">{openFaq === 1 ? "−" : "+"}</span>
                </button>
                {openFaq === 1 && (
                  <div className="zp-faq-answer">
                    <p>
                      <strong>Sí, al 100%.</strong> Todos nuestros planes incluyen el registro de tu dominio propio (.com, .pe o internacional) y hosting en infraestructura cloud de alta disponibilidad durante un año completo, con certificado SSL de seguridad y copias de seguridad continuas.
                    </p>
                  </div>
                )}
              </div>

              <div className={`zp-faq-item ${openFaq === 2 ? "zp-faq-item--open" : ""}`}>
                <button type="button" className="zp-faq-question" onClick={() => toggleFaq(2)}>
                  <span>¿Cómo se adaptan los métodos de pago según mi país?</span>
                  <span className="zp-faq-icon">{openFaq === 2 ? "−" : "+"}</span>
                </button>
                {openFaq === 2 && (
                  <div className="zp-faq-answer">
                    <p>
                      Aceptamos transferencias bancarias directas en Perú (BCP, Interbank, BBVA, Yape, Plin en Soles), transferencias en Chile (CLP$), y pagos internacionales mediante PayPal, Stripe, tarjetas de crédito y transferencias bancarias internacionales en Dólares (USD).
                    </p>
                  </div>
                )}
              </div>

              <div className={`zp-faq-item ${openFaq === 3 ? "zp-faq-item--open" : ""}`}>
                <button type="button" className="zp-faq-question" onClick={() => toggleFaq(3)}>
                  <span>¿Qué pasa si necesito actualizar información o agregar fotos en el futuro?</span>
                  <span className="zp-faq-icon">{openFaq === 3 ? "−" : "+"}</span>
                </button>
                {openFaq === 3 && (
                  <div className="zp-faq-answer">
                    <p>
                      Contamos con un servicio de mantenimiento mensual muy accesible que cubre cambios de contenido, monitoreo de seguridad y soporte técnico directo por WhatsApp. También podemos habilitar paneles autoadministrables si prefieres gestionar tus publicaciones tú mismo.
                    </p>
                  </div>
                )}
              </div>

              <div className={`zp-faq-item ${openFaq === 4 ? "zp-faq-item--open" : ""}`}>
                <button type="button" className="zp-faq-question" onClick={() => toggleFaq(4)}>
                  <span>¿Cómo me garantiza Zentpiper el posicionamiento en Google?</span>
                  <span className="zp-faq-icon">{openFaq === 4 ? "−" : "+"}</span>
                </button>
                {openFaq === 4 && (
                  <div className="zp-faq-answer">
                    <p>
                      Implementamos SEO técnico desde la primera línea de código: meta-etiquetas OpenGraph, sitemap.xml, robots.txt, compresión de imágenes en formatos modernos (WebP) y datos estructurados Schema.org para que Google indexe tu negocio y destaque frente a tu competencia.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </LazySection>

      {/* 9. Gran Banner de Conversión Final */}
      <LazySection minHeight="420px">
        <section className="zp-final-cta-section">
          <div className="zp-container">
            <div className="zp-cta-box">
              <span className="zp-cta-badge">CONVIERTE HOY MISMO</span>
              <h2 className="zp-cta-title">
                ¿Listo para Construir una Presencia Digital de <span className="zp-gold-gradient">Impacto Global</span>?
              </h2>
              <p className="zp-cta-desc">
                Cuéntanos tu idea. Nuestro equipo técnico evaluará tus requerimientos y te entregará una propuesta personalizada sin costo ni compromiso.
              </p>

              <div className="zp-cta-actions">
                <a
                  href={`https://wa.me/${paisData?.whatsapp || "51988490319"}?text=${encodeURIComponent("Hola Zentpiper, quiero cotizar un proyecto web para mi empresa.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="zp-btn zp-btn-primary zp-btn-lg"
                >
                  <span>Hablar por WhatsApp</span>
                  <span className="zp-arrow">→</span>
                </a>
                <button
                  type="button"
                  className="zp-btn zp-btn-secondary zp-btn-lg"
                  onClick={handleHablarConNosotros}
                >
                  <span>Solicitar Cotización Formal</span>
                </button>
              </div>

              <div className="zp-cta-perks">
                <div className="zp-perk-item">
                  <span>⚡</span>
                  <span>Respuesta en menos de 24 horas</span>
                </div>
                <div className="zp-perk-item">
                  <span>🔒</span>
                  <span>100% Satisfacción y Garantía</span>
                </div>
                <div className="zp-perk-item">
                  <span>💬</span>
                  <span>Atención directa sin intermediarios</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </LazySection>
    </>
  );
}

export default Home;
