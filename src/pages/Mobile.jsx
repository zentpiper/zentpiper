import { useNavigate } from "react-router-dom";
import { usePais } from "../contexts/PaisContext";
import { formatearPrecio } from "../data/precios";
import SEO from "../components/SEO";
import "./Mobile.css";

function Mobile() {
  const navigate = useNavigate();
  const { paisSeleccionado, planesMobile, moneda } = usePais();

  const handleCotizar = (serviceName) => {
    navigate("/contacto", {
      state: {
        asunto: "Aplicación Mobile",
        servicio: serviceName,
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
        title="Desarrollo Móvil | Zentpiper - Apps Nativas y Cross-Platform"
        description="Desarrollo de aplicaciones móviles nativas y cross-platform. Apps para iOS, Android, Flutter. Soluciones móviles profesionales."
        keywords="desarrollo móvil, apps iOS, apps Android, Flutter, React Native, aplicaciones nativas, desarrollo apps Perú, desarrollo apps Chile"
        canonical="https://zentpiper.com/mobile"
      />

      <div className="mobile-services-container">
        <h2 className="mobile-services-title">Servicios Móviles</h2>

        <button
          className="btn-Demo"
          onClick={() => handleCotizar("Demo App")}
        >
          App Demo
        </button>
        <br></br>
        <br></br>

        <div className="mobile-services-grid">
          {/* App Android */}
          <div className="mobile-service-card">
            <h3>App Android</h3>
            <div className="mobile-service-price">
              {formatearPrecio(planesMobile.android.desarrollo, paisSeleccionado)} <span>Desarrollo</span>
            </div>
            <div className="mobile-maintenance-price">
              {formatearPrecio(planesMobile.android.mantenimiento, paisSeleccionado)} <span>Mantenimiento Mensual</span>
            </div>
            <div className="mobile-service-details">
              <p>Desarrollo nativo con Kotlin/Java</p>
              <ul>
                <li>Publicación en Google Play Store</li>
                <li>Compatibilidad con múltiples dispositivos</li>
                <li>Integración con servicios Google</li>
                <li>UI/UX adaptativo Material Design</li>
              </ul>
            </div>
            <button
              className="btn btn-secondary"
              onClick={() => handleCotizar("App Android")}
            >
              Contactar
            </button>
          </div>

          {/* App iOS */}
          <div className="mobile-service-card">
            <h3>App iOS</h3>
            <div className="mobile-service-price">
              {formatearPrecio(planesMobile.ios.desarrollo, paisSeleccionado)} <span>Desarrollo</span>
            </div>
            <div className="mobile-maintenance-price">
              {formatearPrecio(planesMobile.ios.mantenimiento, paisSeleccionado)} <span>Mantenimiento Mensual</span>
            </div>
            <div className="mobile-service-details">
              <p>Desarrollo nativo con Swift</p>
              <ul>
                <li>Publicación en App Store</li>
                <li>Optimización para iPhone y iPad</li>
                <li>Diseño siguiendo guidelines Apple</li>
                <li>Integración con iOS SDK</li>
                <li>Review y aprobación garantizada</li>
              </ul>
            </div>
            <button
              className="btn btn-secondary"
              onClick={() => handleCotizar("App iOS")}
            >
              Contactar
            </button>
          </div>

          {/* App Flutter - DESTACADO */}
          <div className="mobile-service-card mobile-service-featured">
            <div className="mobile-service-badge">Más Popular</div>
            <h3>App Flutter</h3>
            <div className="mobile-service-price">
              {formatearPrecio(planesMobile.flutter.desarrollo, paisSeleccionado)} <span>Desarrollo</span>
            </div>
            <div className="mobile-maintenance-price">
              {formatearPrecio(planesMobile.flutter.mantenimiento, paisSeleccionado)} <span>Mantenimiento Mensual</span>
            </div>
            <div className="mobile-service-details">
              <p>Desarrollo cross-platform premium</p>
              <ul>
                <li>Una base de código para iOS y Android</li>
                <li>Desarrollo 50% más rápido</li>
                <li>UI consistente en ambas plataformas</li>
                <li>Alto rendimiento nativo</li>
                <li>Publicación en ambas stores</li>
                <li>Actualizaciones simultáneas</li>
              </ul>
            </div>
            <button
              className="btn btn-secondary"
              onClick={() => handleCotizar("App Flutter")}
            >
              Contactar
            </button>
          </div>

          {/* App Nativa Full */}
          <div className="mobile-service-card">
            <h3>App Nativa Full</h3>
            <div className="mobile-service-price">
              {formatearPrecio(planesMobile.nativo.desarrollo, paisSeleccionado)} <span>Desarrollo</span>
            </div>
            <div className="mobile-maintenance-price">
              {formatearPrecio(planesMobile.nativo.mantenimiento, paisSeleccionado)} <span>Mantenimiento Mensual</span>
            </div>
            <div className="mobile-service-details">
              <p>Soluciones nativas para ambas plataformas</p>
              <ul>
                <li>Desarrollo nativo separado</li>
                <li>Máximo rendimiento en cada plataforma</li>
                <li>Experiencia de usuario nativa</li>
                <li>Publicación en ambas tiendas</li>
                <li>Actualizaciones independientes</li>
              </ul>
            </div>
            <button
              className="btn btn-secondary"
              onClick={() => handleCotizar("App Nativa Full")}
            >
              Contactar
            </button>
          </div>
        </div>

        {/* Botón de contactar único al final */}
        <div className="mobile-cta">
          <h3 className="mobile-cta-title">¿Listo para comenzar?</h3>
          <p className="mobile-cta-text">Contáctanos y te ayudamos a elegir la mejor solución para tu app</p>
          <button
            className="btn btn-primary btn-cta-mobile"
            onClick={() => handleCotizar("Consulta App")}
          >
            <span>Contactar Ahora</span>
            <i className="arrow">→</i>
          </button>
        </div>
      </div>
    </>
  );
}

export default Mobile;