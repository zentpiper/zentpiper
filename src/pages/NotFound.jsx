import { useNavigate } from "react-router-dom";
import { usePais } from "../contexts/PaisContext";
import Icons from "../components/Icons";
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
          {Icons.exclamationTriangle}
        </div>
        <h1 className="notfound-title">404</h1>
        <h2 className="notfound-subtitle">Página no encontrada</h2>
        <p className="notfound-description">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>

        <div className="notfound-actions">
          <button className="btn btn-primary" onClick={handleGoHome}>
            {Icons.house}
            Ir al Inicio
          </button>
          <button className="btn btn-secondary" onClick={handleGoToPlanes}>
            {Icons.cardList}
            Ver Planes
          </button>
          <button className="btn btn-secondary" onClick={handleGoToContacto}>
            {Icons.envelope}
            Contacto
          </button>
        </div>

        <div className="notfound-help">
          <h3>¿Necesitas ayuda?</h3>
          <p>Puedes contactarnos directamente:</p>
          <div className="contact-info">
            <a href={`tel:${paisData.telefono.replace(/\s/g, '')}`} className="contact-link">
              {Icons.telephone}
              {paisData.telefono}
            </a>
            <a href={`mailto:${paisData.email}`} className="contact-link">
              {Icons.envelope}
              {paisData.email}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
