import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import SEO from "../components/SEO";
import "./Planes.css";

function Planes() {
  const navigate = useNavigate();
  const [paisSeleccionado, setPaisSeleccionado] = useState("PE");
  const [precios, setPrecios] = useState({
    basico: { desarrollo: 150, mantenimiento: 7 },
    emprendedor: { desarrollo: 300, mantenimiento: 7 },
    profesional: { desarrollo: 1200, mantenimiento: 70 },
    tienda: { desarrollo: 1300, mantenimiento: 70 }
  });

  // Precios por país
  const preciosPorPais = {
    PE: {
      moneda: "$",
      basico: { desarrollo: 150, mantenimiento: 10 },
      emprendedor: { desarrollo: 300, mantenimiento: 10 },
      profesional: { desarrollo: 1200, mantenimiento: 70 },
      tienda: { desarrollo: 1800, mantenimiento: 70 }
    },
    CL: {
      moneda: "CLP$",
      basico: { desarrollo: 270000, mantenimiento: 65000 }, // Aprox conversión
      emprendedor: { desarrollo: 540000, mantenimiento: 65000 },
      profesional: { desarrollo: 1080000, mantenimiento: 65000 },
      tienda: { desarrollo: 1620000, mantenimiento: 65000 }
    }
  };

  // Escuchar cambios de país y recargar
  useEffect(() => {
    const handlePaisCambiado = (event) => {
      const { pais } = event.detail;
      window.location.reload();
    };

    // Cargar país inicial desde localStorage
    const paisGuardado = localStorage.getItem('paisSeleccionado') || 'PE';
    setPaisSeleccionado(paisGuardado);
    setPrecios(preciosPorPais[paisGuardado]);

    window.addEventListener('paisCambiado', handlePaisCambiado);
    
    return () => {
      window.removeEventListener('paisCambiado', handlePaisCambiado);
    };
  }, []);

  // También escuchar cambios en localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      const paisGuardado = localStorage.getItem('paisSeleccionado') || 'PE';
      if (paisGuardado !== paisSeleccionado) {
        window.location.reload();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [paisSeleccionado]);

  const handleCotizar = (planName) => {
    navigate("/contacto", {
      state: {
        asunto: "Creación de página web",
        plan: planName,
        pais: paisSeleccionado,
        moneda: preciosPorPais[paisSeleccionado].moneda
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

  const formatearPrecio = (precio) => {
    const moneda = preciosPorPais[paisSeleccionado].moneda;
    if (paisSeleccionado === 'CL') {
      return `${moneda} ${precio.toLocaleString('es-CL')}`;
    } else {
      return `${moneda} ${precio.toLocaleString('es-PE')}`;
    }
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
        
        {/* Indicador de País Actual */}
        

        <div className="planes-grid">
          {/* Plan Básico */}
          <div className="plan-card">
            <h3>Plan Básico</h3>
            <div className="plan-price">
              {formatearPrecio(precios.basico.desarrollo)} <span>(mesual)</span>
            </div>
            <div className="plan-maintenance">
              Mantenimiento: {formatearPrecio(precios.basico.mantenimiento)}/Mes
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
              onClick={() => handleCotizar("Plan Básico")}
            >
              Contactar
            </button>
            <br></br>
            <button
              className="btn btn-secondary"
             onClick={() => window.location.href = "https://cegrisa.vercel.app"}
            >
              Ejemplo
            </button>
          </div>

          {/* Plan Emprendedor - DESTACADO */}
          <div className="plan-card plan-featured">
            <div className="plan-badge">Más Popular</div>
            <h3>Plan Emprendedor</h3>
            <div className="plan-price">
              {formatearPrecio(precios.emprendedor.desarrollo)} <span>(mensual)</span>
            </div>
            <div className="plan-maintenance">
              Mantenimiento: {formatearPrecio(precios.emprendedor.mantenimiento)}/Mes
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
              onClick={() => handleCotizar("Plan Básico")}
            >
              Contactar
            </button>
            <br></br>
            <button
              className="btn btn-secondary"
              onClick={() => window.location.href = "https://limamoscow.ru/#special"}
            >
              Ejemplo
            </button>
         
         
         
         
          </div>

          {/* Plan Profesional */}
          <div className="plan-card">
            <h3>Plan Profesional</h3>
            <div className="plan-price">
              {formatearPrecio(precios.profesional.desarrollo)} <span>(mensual)</span>
            </div>
            <div className="plan-maintenance">
              Mantenimiento: {formatearPrecio(precios.profesional.mantenimiento)}/Mes
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
              onClick={() => handleCotizar("Plan Básico")}
            >
              Contactar
            </button>
            <br></br>
            <button
              className="btn btn-secondary"
              onClick={() => window.location.href = "https://www.autonoma.pe"}
            >
              Ejemplo
            </button>
          </div>

          {/* Plan Tienda Online */}
          <div className="plan-card">
            <h3>Plan Tienda Online</h3>
            <div className="plan-price">
              {formatearPrecio(precios.tienda.desarrollo)} <span>(mensual)</span>
            </div>
            <div className="plan-maintenance">
              Mantenimiento: {formatearPrecio(precios.tienda.mantenimiento)}/Mes
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
              onClick={() => handleCotizar("Plan Básico")}
            >
              Contactar
            </button>
            <br></br>
            <button
              className="btn btn-secondary"
              onClick={() => window.location.href = "https://celestinaperu.com"}
            >
              Ejemlo
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Planes;