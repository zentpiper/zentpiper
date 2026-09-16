import { useNavigate, Link } from "react-router-dom";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import SEO from "../components/SEO";
import Icons from "../components/Icons";
import LazySection from "../components/LazySection";
import "./Home.css";

const HERO_VIDEOS = ["/videos/1.mp4", "/videos/2.mp4"];

/* Cycles through the hero videos endlessly, playing one after another */
const HeroVideoBackground = memo(function HeroVideoBackground() {
  const videoRef = useRef(null);
  const indexRef = useRef(0);
  const [src, setSrc] = useState(HERO_VIDEOS[0]);

  const playNext = useCallback(() => {
    indexRef.current = (indexRef.current + 1) % HERO_VIDEOS.length;
    setSrc(HERO_VIDEOS[indexRef.current]);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.load();
    video.play().catch(() => {});
  }, [src]);

  return (
    <video
      ref={videoRef}
      className="hero-video"
      autoPlay
      muted
      playsInline
      preload="auto"
      onEnded={playNext}
      aria-hidden="true"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
});

/* Memoize heavy sections to avoid re-renders */
const FeaturesGrid = memo(function FeaturesGrid() {
  return (
    <div className="features-grid">
      <div className="feature-card">
        <div className="feature-icon">{Icons.palette}</div>
        <h3 className="feature-title">Diseño Personalizado</h3>
        <p className="feature-description">
          Creamos sitios únicos que reflejan la identidad de tu marca con
          diseños modernos y atractivos.
        </p>
        <div className="feature-highlight">100% Personalizado</div>
      </div>

      <div className="feature-card">
        <div className="feature-icon">{Icons.rocketTakeoff}</div>
        <h3 className="feature-title">SEO Optimizado</h3>
        <p className="feature-description">
          Posicionamiento en Google desde el día uno. Tu sitio será
          encontrado por tus clientes potenciales.
        </p>
        <div className="feature-highlight">Más Visibilidad</div>
      </div>

      <div className="feature-card">
        <div className="feature-icon">{Icons.globe}</div>
        <h3 className="feature-title">Hosting + Dominio</h3>
        <p className="feature-description">
          Incluimos hosting premium y dominio por un año completo. Tu sitio
          estará siempre online y seguro.
        </p>
        <div className="feature-highlight">Todo Incluido</div>
      </div>

      <div className="feature-card">
        <div className="feature-icon">{Icons.phone}</div>
        <h3 className="feature-title">Diseño Responsive</h3>
        <p className="feature-description">
          Perfecto en móviles, tablets y computadoras. Tu sitio se ve
          increíble en cualquier dispositivo.
        </p>
        <div className="feature-highlight">Multi-dispositivo</div>
      </div>

      <div className="feature-card">
        <div className="feature-icon">{Icons.lightningCharge}</div>
        <h3 className="feature-title">Carga Ultra Rápida</h3>
        <p className="feature-description">
          Sitios optimizados para velocidad. Tus visitantes no esperarán y
          Google te premiará en rankings.
        </p>
        <div className="feature-highlight">Súper Rápido</div>
      </div>

      <div className="feature-card">
        <div className="feature-icon">{Icons.shieldCheck}</div>
        <h3 className="feature-title">Seguridad SSL</h3>
        <p className="feature-description">
          Certificado SSL gratuito incluido. Protege los datos de tus
          clientes y mejora tu credibilidad.
        </p>
        <div className="feature-highlight">100% Seguro</div>
      </div>

      <div className="feature-card">
        <div className="feature-icon">{Icons.graphUp}</div>
        <h3 className="feature-title">Analytics Integrado</h3>
        <p className="feature-description">
          Google Analytics configurado para que sepas exactamente cómo
          funciona tu sitio y tus visitantes.
        </p>
        <div className="feature-highlight">Datos Reales</div>
      </div>

      <div className="feature-card">
        <div className="feature-icon">{Icons.envelopeAt}</div>
        <h3 className="feature-title">Formularios de Contacto</h3>
        <p className="feature-description">
          Captura leads efectivamente con formularios optimizados que
          convierten visitantes en clientes.
        </p>
        <div className="feature-highlight">Más Conversiones</div>
      </div>
    </div>
  );
});

function Home() {
  const navigate = useNavigate();

  const handleVerPlanes = () => navigate("/planes");
  const handleHablarConNosotros = () => navigate("/contacto");
  const handleVerMobile = () => navigate("/mobile");
  const handleSolicitarInformacion = () => {
    navigate("/contacto");
    setTimeout(() => {
      const el = document.getElementById("contacto-form-container");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
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

      {/* Below-fold sections — deferred rendering to reduce TBT */}
      <LazySection minHeight="520px">
        <section className="apps-section">
          <div className="apps-content">
            <h2 className="apps-title">
              <span className="title-main">Aplicaciones Móviles</span>
              <span className="title-sub">para Android & iOS</span>
            </h2>
            <p className="apps-subtitle">
              Desarrollamos apps nativas e híbridas con el mejor diseño,
              rendimiento y experiencia de usuario para ambos sistemas operativos.
            </p>

            <div className="platforms-badge">
              <div className="platform android">
                <span className="platform-name">Android</span>
              </div>
              <div className="platform ios">
                <span className="platform-name">iOS</span>
              </div>
            </div>

            <div className="features-grid-mini">
              <div className="feature-mini">
                <div className="feature-icon-mini"></div>
                <div className="feature-text-mini">Máximo rendimiento</div>
              </div>
              <div className="feature-mini">
                <div className="feature-icon-mini"></div>
                <div className="feature-text-mini">Diseño intuitivo</div>
              </div>
              <div className="feature-mini">
                <div className="feature-icon-mini"></div>
                <div className="feature-text-mini">Seguridad integrada</div>
              </div>
            </div>

            <div className="cta-buttons">
              <button className="btn btn-primary btn-apps" onClick={handleVerMobile}>
                <span>Ver Planes Mobile</span>
                <i className="arrow">→</i>
              </button>
              <button className="btn btn-secondary btn-apps" onClick={handleHablarConNosotros}>
                <span>Cotizar Proyecto</span>
              </button>
            </div>
          </div>
        </section>
      </LazySection>

      <LazySection minHeight="420px">
        <section className="solutions-section">
          <div className="solutions-content">
            <h2 className="solutions-title">
              <span className="title-main">Soluciones Digitales</span>
              <span className="title-sub">Personalizadas</span>
            </h2>
            <p className="solutions-subtitle">
              Desarrollamos cualquier tipo de sistema adaptado a tus necesidades específicas
            </p>

            <div className="features-grid-mini">
              <div className="feature-mini">
                <div className="feature-icon-mini"></div>
                <div className="feature-text-mini">Desarrollo a medida</div>
              </div>
              <div className="feature-mini">
                <div className="feature-icon-mini"></div>
                <div className="feature-text-mini">Tecnología moderna</div>
              </div>
              <div className="feature-mini">
                <div className="feature-icon-mini"></div>
                <div className="feature-text-mini">Soporte continuo</div>
              </div>
            </div>

            <div className="cta-buttons">
              <button className="btn btn-primary btn-apps" onClick={handleHablarConNosotros}>
                <span>Consultar Proyecto</span>
                <i className="arrow">→</i>
              </button>
            </div>
          </div>
        </section>
      </LazySection>

      <LazySection minHeight="800px">
        <section className="features-section">
          <div className="features-header">
            <h2 className="section-title">
              ¿Por qué elegir Zentpiper?
            </h2>
            <p className="section-subtitle">
              Transformamos tu visión en una presencia digital poderosa que
              impulsa tu negocio
            </p>
          </div>
          <FeaturesGrid />
        </section>
      </LazySection>

      <LazySection minHeight="300px">
        <section className="cta-section">
          <h2 className="cta-title">
            ¿Listo para comenzar?
          </h2>
          <p className="cta-description">
            Contáctanos hoy mismo para una consulta gratuita
          </p>
          <button className="btn btn-primary btn-cta" onClick={handleSolicitarInformacion}>
            <span>Solicitar Información</span>
            <i className="arrow">→</i>
          </button>
        </section>
      </LazySection>
    </>
  );
}

export default Home;
