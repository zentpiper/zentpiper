import { useNavigate } from "react-router-dom";
import { usePais } from "../contexts/PaisContext";
import "./NotFound.css";

function NotFound() {
  const navigate = useNavigate();
  const { paisData } = usePais();

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGoToPlanes = () => {
    navigate("/planes");
  };

  const handleGoToContacto = () => {
    navigate("/contacto");
  };

  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <div className="notfound-icon">
          <i className="bi bi-exclamation-triangle"></i>
        </div>
        <h1 className="notfound-title">404</h1>
        <h2 className="notfound-subtitle">Página no encontrada</h2>
        <p className="notfound-description">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>

        <div className="notfound-actions">
          <button className="btn btn-primary" onClick={handleGoHome}>
            <i className="bi bi-house"></i>
            Ir al Inicio
          </button>
          <button className="btn btn-secondary" onClick={handleGoToPlanes}>
            <i className="bi bi-card-list"></i>
            Ver Planes
          </button>
          <button className="btn btn-secondary" onClick={handleGoToContacto}>
            <i className="bi bi-envelope"></i>
            Contacto
          </button>
        </div>

        <div className="notfound-help">
          <h3>¿Necesitas ayuda?</h3>
          <p>Puedes contactarnos directamente:</p>
          <div className="contact-info">
            <a href={`tel:${paisData.telefono.replace(/\s/g, '')}`} className="contact-link">
              <i className="bi bi-telephone"></i>
              {paisData.telefono}
            </a>
            <a href={`mailto:${paisData.email}`} className="contact-link">
              <i className="bi bi-envelope"></i>
              {paisData.email}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
