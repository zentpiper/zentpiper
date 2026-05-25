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
              <span className="promo-text">3 meses incluidos</span>
            </div>
            <div className="plan-details">
              <ul>
                <li>Tu negocio visible en Google 24/7</li>
                <li>1 a 3 secciones profesionales</li>
                <li>Hosting + dominio incluidos</li>
                <li>Soporte directo por WhatsApp</li>
                <li>Certificado SSL de seguridad</li>
              </ul>
            </div>
            <button
              className="btn btn-secondary"
              onClick={() => window.open("https://www.naimmarchionni.com", "_blank")}
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
              <span className="promo-text">3 meses incluidos</span>
            </div>
            <div className="plan-details">
              <ul>
                <li>Catálogo interactivo — tus clientes compran desde el celular</li>
                <li>4 a 6 secciones personalizadas</li>
                <li>Posicionamiento para ganarle clientes a tu competencia</li>
                <li>Captura de cotizaciones directo a tu WhatsApp</li>
                <li>Diseño responsive en todos los dispositivos</li>
              </ul>
            </div>
            <button
              className="btn btn-secondary"
              onClick={() => window.open("https://cegrisa-one.vercel.app", "_blank")}
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
              <span className="promo-text">3 meses incluidos</span>
            </div>
            <div className="plan-details">
              <ul>
                <li>Hasta 10 secciones a tu medida</li>
                <li>Base de datos automatizada para campañas de reventa</li>
                <li>Métricas en tiempo real de quién visita tu web</li>
                <li>Integración con redes sociales</li>
                <li>Branding profesional que genera confianza</li>
              </ul>
            </div>
            <button
              className="btn btn-secondary"
              onClick={() => window.open("https://www.spanglishac.com", "_blank")}
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
              <span className="promo-text">3 meses incluidos</span>
            </div>
            <div className="plan-details">
              <ul>
                <li>Catálogos con gestión de inventario</li>
                <li>CRM integrado — nunca pierdas un lead</li>
                <li>Cobros online seguros (Niubiz/Culqi)</li>
                <li>Panel de control empresarial con usuarios y permisos</li>
                <li>Soporte técnico prioritario</li>
              </ul>
            </div>
            <button
              className="btn btn-secondary"
              onClick={() => window.open("https://ventacenter.vercel.app/home", "_blank")}
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