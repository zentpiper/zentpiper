import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { usePais } from "../contexts/PaisContext";
import SEO from "../components/SEO";
import "./Contacto.css";

// Zero-dependency SVG icons crafted with precision
const ContactIcons = {
  bolt: (
    <svg className="contacto-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  shield: (
    <svg className="contacto-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  architect: (
    <svg className="contacto-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  ),
  checkCircle: (
    <svg className="contacto-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  codeBlocks: (
    <svg className="contacto-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  lock: (
    <svg className="contacto-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  whatsapp: (
    <svg className="contacto-svg-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  ),
  email: (
    <svg className="contacto-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
  copy: (
    <svg className="contacto-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  ),
  phone: (
    <svg className="contacto-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  clock: (
    <svg className="contacto-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  arrowRight: (
    <svg className="contacto-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  check: (
    <svg className="contacto-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  taskAlt: (
    <svg className="contacto-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  spinner: (
    <svg className="contacto-svg-icon contacto-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="12" y1="2" x2="12" y2="6" />
      <line x1="12" y1="18" x2="12" y2="22" />
      <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
      <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
      <line x1="2" y1="12" x2="6" y2="12" />
      <line x1="18" y1="12" x2="22" y2="12" />
      <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
      <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
    </svg>
  ),
  instagram: (
    <svg className="contacto-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  ),
  tiktok: (
    <svg className="contacto-svg-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.68a6.34 6.34 0 0 0 10.86 4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-2.04-.54z" />
    </svg>
  ),
  facebook: (
    <svg className="contacto-svg-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
};

const PROJECT_TYPES = [
  "Desarrollo Web & SaaS",
  "Aplicaciones Móviles",
  "Ecosistema Enterprise",
  "Auditoría / Rescate",
];

// Added investment starting from 0: "$0 - $2,000 USD"
const BUDGET_RANGES = [
  "$0 - $2,000",
  "$2,000 - $5,000",
  "$5,000 - $15,000",
  "$15,000+ USD",
  "Por Definir",
];

const TIMELINE_OPTIONS = [
  "Urgente < 1 mes",
  "1 a 3 meses",
  "Flexible / Roadmap",
];

function Contacto() {
  const location = useLocation();
  const { paisSeleccionado, paisData } = usePais();

  // Form State
  const [tipoProyecto, setTipoProyecto] = useState("Desarrollo Web & SaaS");
  const [nombre, setNombre] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [inversion, setInversion] = useState("$2,000 - $5,000");
  const [tiempo, setTiempo] = useState("1 a 3 meses");
  const [descripcion, setDescripcion] = useState("");
  const [requiereNDA, setRequiereNDA] = useState(true);

  // Status & Feedback States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Pre-load from navigation if state was passed from another page
  useEffect(() => {
    if (location.state) {
      if (location.state.servicio || location.state.asunto) {
        const text = (location.state.servicio || location.state.asunto || "").toLowerCase();
        if (text.includes("mobile") || text.includes("app") || text.includes("ios") || text.includes("android")) {
          setTipoProyecto("Aplicaciones Móviles");
        } else if (text.includes("enterprise") || text.includes("corporativo")) {
          setTipoProyecto("Ecosistema Enterprise");
        } else if (text.includes("auditor") || text.includes("rescate") || text.includes("soporte")) {
          setTipoProyecto("Auditoría / Rescate");
        } else {
          setTipoProyecto("Desarrollo Web & SaaS");
        }
      }
      if (location.state.plan) {
        setDescripcion((prev) => prev || `Interesado en cotizar plan: ${location.state.plan}`);
      }
    }
  }, [location.state]);

  const handleCopyEmail = (emailStr) => {
    navigator.clipboard.writeText(emailStr).then(() => {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2200);
    }).catch(() => {
      // Fallback
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2200);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const targetPhone = paisData?.whatsapp || "51988490319";
    const paisNombre = paisSeleccionado === "PE" ? "Perú" : paisSeleccionado === "CL" ? "Chile" : "Internacional";

    // Build structured WhatsApp message
    let waMessage = `*Diagnóstico Técnico de Proyecto - Zentpiper Software*\n\n`;
    waMessage += `*Tipo de Requerimiento:* ${tipoProyecto}\n`;
    waMessage += `*Nombre:* ${nombre}\n`;
    if (empresa.trim()) waMessage += `*Empresa / Cargo:* ${empresa}\n`;
    waMessage += `*Email Corporativo:* ${email}\n`;
    waMessage += `*Teléfono / WhatsApp:* ${telefono}\n`;
    waMessage += `*Rango de Inversión:* ${inversion}\n`;
    waMessage += `*Tiempo Estimado:* ${tiempo}\n`;
    waMessage += `*NDA Previo:* ${requiereNDA ? "Sí, requerido antes de primera sesión" : "No necesario"}\n`;
    waMessage += `*País:* ${paisNombre}\n\n`;
    waMessage += `*Desafío / Alcance:* \n${descripcion}`;

    const whatsappUrl = `https://api.whatsapp.com/send?phone=${targetPhone}&text=${encodeURIComponent(waMessage)}`;

    // Non-blocking Telegram webhook dispatch
    fetch("/api/send-telegram", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tipoProyecto,
        nombre,
        empresa,
        email,
        telefono,
        inversion,
        tiempo,
        requiereNDA,
        descripcion,
        pais: paisNombre,
        moneda: paisData?.moneda || "USD",
      }),
    }).catch((err) => console.error("Error al registrar notificación:", err));

    // Simulated SSL validation / dispatch delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      // Open WhatsApp in a new tab with pre-filled diagnosis
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    }, 1100);
  };

  const directWhatsAppUrl = `https://api.whatsapp.com/send?phone=${paisData?.whatsapp || "51988490319"}&text=${encodeURIComponent(
    "Hola Zentpiper Software, me gustaría consultar directamente con un Ingeniero de Software sobre un nuevo proyecto."
  )}`;

  const directPhone = paisData?.telefono || "+51 988 490 319";
  const cleanDirectPhone = directPhone.replace(/[^\d+]/g, "");

  return (
    <>
      <SEO
        title="Contacto y Diagnóstico Técnico | Zentpiper Software"
        description="Inicia tu diagnóstico técnico con ingenieros de software senior o conéctate al instante por WhatsApp. Respuesta garantizada en menos de 2 horas hábiles."
        keywords="contacto zentpiper, diagnostico tecnico software, cotizacion desarrollo web saas, aplicaciones moviles chile peru mexico, consultoria tecnologia ingenieria"
        canonical="https://zentpiper.com/contacto"
      />

      <div className="contacto-page">
        {/* Ambient Glow Orbs */}
        <div className="contacto-ambient-backdrop" aria-hidden="true">
          <div className="ambient-orb orb-top"></div>
          <div className="ambient-orb orb-right"></div>
          <div className="ambient-orb orb-left"></div>
        </div>

        <div className="contacto-content-wrapper">
          {/* Hero Section */}
          <header className="contacto-hero-section">
            <div className="contacto-badge-pill">
              <span className="contacto-badge-icon icon-amber">{ContactIcons.bolt}</span>
              <span className="contacto-badge-text">INGENIERÍA Y CONSULTORÍA TECNOLÓGICA</span>
              <span className="contacto-badge-dot">•</span>
              <span className="contacto-badge-highlight">RESPUESTA GARANTIZADA &lt; 2 HRS</span>
            </div>

            <h1 className="contacto-hero-title">
              Inicia tu Diagnóstico Técnico o{" "}
              <span className="contacto-gradient-text">Conéctate al Instante</span>
            </h1>

            <div className="contacto-trust-badges">
              <div className="trust-item">
                <span className="trust-icon">{ContactIcons.shield}</span>
                <span>NDA Inmediato</span>
              </div>
              <span className="trust-dot">•</span>
              <div className="trust-item">
                <span className="trust-icon">{ContactIcons.architect}</span>
                <span>Ingenieros Senior</span>
              </div>
              <span className="trust-dot">•</span>
              <div className="trust-item">
                <span className="trust-icon">{ContactIcons.checkCircle}</span>
                <span>Sin burocracia</span>
              </div>
            </div>
          </header>

          {/* Main 2-Column Grid */}
          <section className="contacto-main-grid">
            {/* LEFT COLUMN: Technical Diagnosis Form (7 cols) */}
            <div className="contacto-form-card">
              {/* Card Header */}
              <div className="form-card-header">
                <div className="form-card-title-wrap">
                  <span className="form-card-icon">{ContactIcons.codeBlocks}</span>
                  <h2 className="form-card-title">Diagnóstico Técnico de Proyecto</h2>
                </div>
                <div className="form-card-ssl-badge">
                  <span className="ssl-lock-icon">{ContactIcons.lock}</span>
                  <span>ENCRIPTADO SSL</span>
                </div>
              </div>

              {/* Success Notification */}
              {isSuccess && (
                <div className="form-success-banner" role="alert">
                  <div className="success-banner-icon">{ContactIcons.taskAlt}</div>
                  <div className="success-banner-content">
                    <span className="success-banner-title">¡Diagnóstico enviado correctamente!</span>
                    <p className="success-banner-desc">
                      Un Lead Engineer revisará tus requerimientos y te contactará en menos de 2 horas hábiles.
                    </p>
                  </div>
                </div>
              )}

              <form className="tech-contact-form" onSubmit={handleSubmit}>
                {/* 1. Tipo de Proyecto o Requerimiento */}
                <div className="form-group-block">
                  <label className="field-group-label">Tipo de Proyecto o Requerimiento</label>
                  <div className="chip-selector-grid grid-2x2">
                    {PROJECT_TYPES.map((type) => {
                      const isSelected = tipoProyecto === type;
                      return (
                        <button
                          key={type}
                          type="button"
                          className={`chip-btn ${isSelected ? "active" : ""}`}
                          onClick={() => setTipoProyecto(type)}
                        >
                          {type}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Nombre y Empresa */}
                <div className="form-row-2col">
                  <div className="input-field-wrap">
                    <label htmlFor="nombreCompleto" className="field-label">
                      Nombre Completo <span className="req-star">*</span>
                    </label>
                    <input
                      id="nombreCompleto"
                      type="text"
                      className="form-input"
                      placeholder="Ej. Carlos Mendoza"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      required
                    />
                  </div>

                  <div className="input-field-wrap">
                    <label htmlFor="empresaCargo" className="field-label">
                      Empresa o Cargo
                    </label>
                    <input
                      id="empresaCargo"
                      type="text"
                      className="form-input"
                      placeholder="Ej. FinTech Latam / CTO"
                      value={empresa}
                      onChange={(e) => setEmpresa(e.target.value)}
                    />
                  </div>
                </div>

                {/* 3. Correo y Teléfono */}
                <div className="form-row-2col">
                  <div className="input-field-wrap">
                    <label htmlFor="correoCorporativo" className="field-label">
                      Correo Corporativo <span className="req-star">*</span>
                    </label>
                    <input
                      id="correoCorporativo"
                      type="email"
                      className="form-input"
                      placeholder="carlos@empresa.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="input-field-wrap">
                    <label htmlFor="telefonoWhatsApp" className="field-label">
                      Teléfono / WhatsApp <span className="req-star">*</span>
                    </label>
                    <input
                      id="telefonoWhatsApp"
                      type="tel"
                      className="form-input"
                      placeholder={paisSeleccionado === "CL" ? "+56 9 0000 0000" : "+51 988 490 319"}
                      value={telefono}
                      onChange={(e) => setTelefono(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* 4. Rango de Inversión Estimada (Añadiendo inversión desde 0) */}
                <div className="form-group-block">
                  <div className="field-label-between">
                    <label className="field-group-label">Rango de Inversión Estimada (USD)</label>
                    <span className="field-hint-tag">DESDE $0</span>
                  </div>
                  <div className="chip-selector-grid grid-5col">
                    {BUDGET_RANGES.map((range) => {
                      const isSelected = inversion === range;
                      return (
                        <button
                          key={range}
                          type="button"
                          className={`chip-btn chip-budget ${isSelected ? "active" : ""}`}
                          onClick={() => setInversion(range)}
                        >
                          {range}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 5. Tiempo Estimado de Lanzamiento */}
                <div className="form-group-block">
                  <label className="field-group-label">Tiempo Estimado de Lanzamiento</label>
                  <div className="chip-selector-grid grid-3col">
                    {TIMELINE_OPTIONS.map((opt) => {
                      const isSelected = tiempo === opt;
                      return (
                        <button
                          key={opt}
                          type="button"
                          className={`chip-btn ${isSelected ? "active" : ""}`}
                          onClick={() => setTiempo(opt)}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 6. Breve Descripción del Desafío o Alcance */}
                <div className="input-field-wrap">
                  <label htmlFor="descripcionProyecto" className="field-label">
                    Breve Descripción del Desafío o Alcance <span className="req-star">*</span>
                  </label>
                  <textarea
                    id="descripcionProyecto"
                    className="form-textarea"
                    rows={3}
                    placeholder="Describe brevemente tus requerimientos funcionales, arquitectura actual, integraciones críticas o problemas a solucionar..."
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    required
                  ></textarea>
                </div>

                {/* 7. Checkbox NDA */}
                <label className="nda-checkbox-label">
                  <input
                    type="checkbox"
                    className="nda-checkbox-input"
                    checked={requiereNDA}
                    onChange={(e) => setRequiereNDA(e.target.checked)}
                  />
                  <span className="nda-checkbox-text">
                    Requiero firma de Acuerdo de Confidencialidad (NDA) previo a la primera sesión de ingeniería.
                  </span>
                </label>

                {/* 8. Botón CTA */}
                <button
                  type="submit"
                  className={`form-submit-cta ${isSuccess ? "success-state" : ""}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      {ContactIcons.spinner}
                      <span>Validando Enlace Seguro...</span>
                    </>
                  ) : isSuccess ? (
                    <>
                      {ContactIcons.check}
                      <span>Diagnóstico Enviado con Éxito</span>
                    </>
                  ) : (
                    <>
                      <span>Enviar Diagnóstico Técnico</span>
                      {ContactIcons.arrowRight}
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* RIGHT COLUMN: VIP WhatsApp & Direct Channels (5 cols) */}
            <aside className="contacto-aside-column">
              {/* WhatsApp Priority Card */}
              <div className="vip-whatsapp-card">
                <div className="card-ambient-glow" aria-hidden="true"></div>

                {/* Online Status Pill */}
                <div className="status-live-badge">
                  <span className="live-dot-ping"></span>
                  <span className="live-dot-solid"></span>
                  <span className="status-live-text">En línea • Tiempo de respuesta &lt; 5 min</span>
                </div>

                <h3 className="whatsapp-card-title">
                  ¿Prefieres atención inmediata por mensajería?
                </h3>

                <p className="whatsapp-card-desc">
                  Habla directamente con un Ingeniero de Software para resolver dudas técnicas, cotizaciones relámpago o coordinar una llamada inmediata.
                </p>

                <a
                  href={directWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whatsapp-direct-btn"
                  title="Abrir chat directo en WhatsApp"
                >
                  <span className="whatsapp-btn-icon">{ContactIcons.whatsapp}</span>
                  <span>Chatear con un Ingeniero por WhatsApp</span>
                </a>
              </div>

              {/* Corporate Direct Channels Card */}
              <div className="corporate-channels-card">
                <div className="channels-card-header">
                  <span className="channels-header-icon">{ContactIcons.email}</span>
                  <h4 className="channels-card-title">Canales Directos Corporativos</h4>
                </div>

                {/* Correo de Consultoría */}
                <div className="channel-direct-item">
                  <div className="channel-item-text">
                    <span className="channel-item-label">CORREO DE CONSULTORÍA</span>
                    <span className="channel-item-val">contacto@zentpiper.com</span>
                  </div>
                  <button
                    type="button"
                    className="channel-action-btn"
                    onClick={() => handleCopyEmail("contacto@zentpiper.com")}
                    title="Copiar correo al portapapeles"
                  >
                    {ContactIcons.copy}
                    <span className={`copy-tooltip ${copiedEmail ? "visible" : ""}`}>
                      ¡Copiado!
                    </span>
                  </button>
                </div>

                {/* Llamada Telefónica Directa */}
                <div className="channel-direct-item">
                  <div className="channel-item-text">
                    <span className="channel-item-label">LLAMADA TELEFÓNICA DIRECTA</span>
                    <span className="channel-item-val">{directPhone}</span>
                  </div>
                  <a
                    href={`tel:${cleanDirectPhone}`}
                    className="channel-action-btn"
                    title={`Llamar a ${directPhone}`}
                  >
                    {ContactIcons.phone}
                  </a>
                </div>

                {/* Redes Sociales Oficiales */}
                <div className="channels-social-block">
                  <span className="channel-item-label">REDES SOCIALES OFICIALES</span>
                  <div className="channels-social-grid">
                    <a
                      href="https://www.instagram.com/zentpiper"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="channel-social-btn"
                      title="Instagram @zentpiper"
                    >
                      <span className="social-btn-icon icon-instagram">{ContactIcons.instagram}</span>
                      <span className="social-btn-name">Instagram</span>
                    </a>
                    <a
                      href="https://www.tiktok.com/@zentpiper"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="channel-social-btn"
                      title="TikTok @zentpiper"
                    >
                      <span className="social-btn-icon icon-tiktok">{ContactIcons.tiktok}</span>
                      <span className="social-btn-name">TikTok</span>
                    </a>
                    <a
                      href="https://www.facebook.com/zentpiper/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="channel-social-btn"
                      title="Facebook @zentpiper"
                    >
                      <span className="social-btn-icon icon-facebook">{ContactIcons.facebook}</span>
                      <span className="social-btn-name">Facebook</span>
                    </a>
                  </div>
                </div>

                {/* Horario y Guardias 24/7 */}
                <div className="channels-footer-notice">
                  <div className="schedule-headline">
                    <span className="schedule-icon">{ContactIcons.clock}</span>
                    <span>Lunes a Viernes: 08:00 - 19:00 hrs (CDMX / GMT-6)</span>
                  </div>
                  <p className="schedule-footnote">
                    Guardia activa de ingeniería 24/7 disponible para clientes enterprise e incidentes de producción críticos.
                  </p>
                </div>
              </div>
            </aside>
          </section>
        </div>
      </div>
    </>
  );
}

export default Contacto;