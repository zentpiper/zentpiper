import { useNavigate } from "react-router-dom";
import { usePais } from "../contexts/PaisContext";
import { formatearPrecio } from "../data/precios";
import SEO from "../components/SEO";
import "./Planes.css";

function Planes() {
  const navigate = useNavigate();
  const { paisSeleccionado, planesWeb, moneda } = usePais();

  const handleCotizar = () => {
    navigate("/contacto", {
      state: {
        asunto: "Página Web",
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
        title="Planes y Precios | Zentpiper - Sitios Web Profesionales"
        description="Elige tu plan ideal de diseño web profesional. Todos incluyen hosting, dominio y optimización SEO. Planes para negocios, emprendedores y tiendas online."
        keywords="planes diseño web, precios páginas web, desarrollo web profesional, hosting y dominio, SEO Perú, SEO Chile, crear sitio web"
        canonical="https://zentpiper.com/planes"
      />

      <div className="planes-container">
        <h2 className="planes-title">Nuestros Planes</h2>

        <div className="planes-grid">
          {/* Plan Básico */}
          <div className="plan-card">
            <h3>Plan Básico</h3>
            <div className="plan-price">
              {formatearPrecio(planesWeb.basico.desarrollo, paisSeleccionado)}
            </div>
            <div className="plan-maintenance plan-maintenance-promo">
              Mantenimiento: {formatearPrecio(planesWeb.basico.mantenimiento, paisSeleccionado)}/Mes
              <span className="promo-text">Primer año incluido</span>
            </div>
            <div className="plan-details">
              <ul>
                <li>Visualización web del local</li>
                <li>1 a 3 secciones</li>
                <li>Hosting + dominio</li>
                <li>Soporte email/chat básico</li>
                <li>Certificado SSL gratuito</li>
              </ul>
            </div>
            <button
              className="btn btn-secondary"
              onClick={() => window.location.href = "https://cegrisa.vercel.app"}
            >
              Ver Ejemplo
            </button>
          </div>

          {/* Plan Avanzado - DESTACADO */}
          <div className="plan-card plan-featured">
            <div className="plan-badge">Más Popular</div>
            <h3>Plan Avanzado</h3>
            <div className="plan-price">
              {formatearPrecio(planesWeb.emprendedor.desarrollo, paisSeleccionado)}
            </div>
            <div className="plan-maintenance plan-maintenance-promo">
              Mantenimiento: {formatearPrecio(planesWeb.emprendedor.mantenimiento, paisSeleccionado)}/Mes
              <span className="promo-text">Primer año incluido</span>
            </div>
            <div className="plan-details">
              <ul>
                <li>Catálogo hasta 50 productos</li>
                <li>4 a 6 secciones</li>
                <li>Optimización SEO básica</li>
                <li>Formulario de contacto</li>
                <li>Diseño responsive completo</li>
              </ul>
            </div>
            <button
              className="btn btn-secondary"
              onClick={() => window.location.href = "https://limamoscow.ru/#special"}
            >
              Ver Ejemplo
            </button>
          </div>

          {/* Plan Emprendedor */}
          <div className="plan-card">
            <h3>Plan Emprendedor</h3>
            <div className="plan-price">
              {formatearPrecio(planesWeb.profesional.desarrollo, paisSeleccionado)}
            </div>
            <div className="plan-maintenance plan-maintenance-promo">
              Mantenimiento: {formatearPrecio(planesWeb.profesional.mantenimiento, paisSeleccionado)}/Mes
              <span className="promo-text">Primer año incluido</span>
            </div>
            <div className="plan-details">
              <ul>
                <li>Hasta 10 secciones personalizadas</li>
                <li>Datos de los usuarios</li>
                <li>SEO local + Google Analytics</li>
                <li>Integración con redes sociales</li>
                <li>Diseño mejorado y branding</li>
              </ul>
            </div>
            <button
              className="btn btn-secondary"
              onClick={() => window.location.href = "https://www.autonoma.pe"}
            >
              Ver Ejemplo
            </button>
          </div>

          {/* Plan Corporativo */}
          <div className="plan-card">
            <h3>Plan Corporativo</h3>
            <div className="plan-price">
              {formatearPrecio(planesWeb.tienda.desarrollo, paisSeleccionado)}
            </div>
            <div className="plan-maintenance plan-maintenance-promo">
              Mantenimiento: {formatearPrecio(planesWeb.tienda.mantenimiento, paisSeleccionado)}/Mes
              <span className="promo-text">Primer año incluido</span>
            </div>
            <div className="plan-details">
              <ul>
                <li>Catálogos personalizados</li>
                <li>Seguimiento digital al cliente</li>
                <li>Carrito + pasarela de pago</li>
                <li>Panel de administración Avanzada</li>
                <li>Soporte técnico prioritario</li>
              </ul>
            </div>
            <button
              className="btn btn-secondary"
              onClick={() => window.location.href = "https://celestinaperu.com"}
            >
              Ver Ejemplo
            </button>
          </div>
        </div>

        {/* Botón de contactar único al final */}
        <div className="planes-cta">
          <h3 className="planes-cta-title">¿Listo para comenzar?</h3>
          <p className="planes-cta-text">Contáctanos y te ayudamos a elegir el plan perfecto para tu negocio</p>
          <button
            className="btn btn-primary btn-cta-planes"
            onClick={handleCotizar}
          >
            <span>Contactar Ahora</span>
            <i className="arrow">→</i>
          </button>
        </div>
      </div>
    </>
  );
}

export default Planes;