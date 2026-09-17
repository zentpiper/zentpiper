import { useLocation, useNavigate } from "react-router-dom";
import SEO from "../components/SEO";
import "./Confirmacion.css";

const CheckIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const ClockIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const ArrowLeftIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

function Confirmacion() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state?.diagnostico;

  const summaryRows = data
    ? [
        { label: "Tipo de Requerimiento", value: data.tipoProyecto },
        { label: "Nombre", value: data.nombre },
        { label: "Empresa / Cargo", value: data.empresa || "No especificada" },
        { label: "Correo", value: data.email },
        { label: "Teléfono / WhatsApp", value: data.telefono },
        { label: "País", value: data.pais },
        { label: "Inversión estimada", value: `${data.inversion} ${data.moneda || ""}`.trim() },
        { label: "Tiempo estimado", value: data.tiempo },
        { label: "NDA requerido", value: data.requiereNDA ? "Sí" : "No" },
      ]
    : [];

  return (
    <>
      <SEO
        title="Solicitud Enviada | Zentpiper Software"
        description="Tu diagnóstico técnico fue enviado correctamente. Un ingeniero de Zentpiper Software se pondrá en contacto contigo en menos de 24 horas."
        canonical="https://zentpiper.com/confirmacion"
      />

      <div className="confirmacion-page">
        <div className="confirmacion-ambient-backdrop" aria-hidden="true">
          <div className="confirmacion-orb"></div>
        </div>

        <div className="confirmacion-content-wrapper">
          <div className="confirmacion-card">
            <div className="confirmacion-check-icon">{CheckIcon}</div>

            <h1 className="confirmacion-title">¡Solicitud enviada con éxito!</h1>

            <div className="confirmacion-eta-badge">
              {ClockIcon}
              <span>Nos pondremos en contacto contigo en las próximas 24 horas</span>
            </div>

            {data ? (
              <>
                <p className="confirmacion-subtitle">
                  Este es el resumen de lo que recibimos:
                </p>

                <div className="confirmacion-summary">
                  {summaryRows.map((row) => (
                    <div className="confirmacion-summary-row" key={row.label}>
                      <span className="confirmacion-summary-label">{row.label}</span>
                      <span className="confirmacion-summary-value">{row.value || "—"}</span>
                    </div>
                  ))}

                  {data.descripcion && (
                    <div className="confirmacion-summary-message">
                      <span className="confirmacion-summary-label">Desafío / Alcance</span>
                      <p>{data.descripcion}</p>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <p className="confirmacion-subtitle">
                Tu solicitud fue recibida. Si necesitas enviar otra, puedes volver al formulario de contacto.
              </p>
            )}

            <button className="confirmacion-back-btn" onClick={() => navigate("/")}>
              {ArrowLeftIcon}
              <span>Volver al Inicio</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Confirmacion;
