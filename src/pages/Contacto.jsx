import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { usePais } from "../contexts/PaisContext";
import SEO from "../components/SEO";
import "./Contacto.css";

function Contacto() {
  const location = useLocation();
  const { paisSeleccionado, paisData } = usePais();

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    asunto: "",
    plan: "",
    mensaje: "",
  });

  // Efecto para cargar datos desde la navegación
  useEffect(() => {
    if (location.state) {
      setFormData((prevState) => ({
        ...prevState,
        asunto: location.state.asunto || "",
        plan: location.state.plan || location.state.servicio || "",
      }));
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const phoneNumber = paisData.whatsapp;

    // Crear el mensaje formateado para WhatsApp
    let message = `*Contacto desde Web Zentpiper*\n\n`;
    message += `*País:* ${paisSeleccionado === 'PE' ? 'Perú' : 'Chile'}\n`;
    message += `*Nombre:* ${formData.nombre}\n`;
    message += `*Email:* ${formData.email}\n`;
    message += `*Asunto:* ${formData.asunto}\n`;

    // Agregar plan/servicio si está seleccionado
    if (formData.plan) {
      message += `*Plan/Servicio:* ${formData.plan}\n`;
    }

    // Agregar moneda
    message += `*Moneda:* ${paisData.moneda}\n`;

    // Agregar mensaje
    message += `*Mensaje:* ${formData.mensaje}`;

    // Crear la URL de WhatsApp con el mensaje codificado
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

    // Abrir WhatsApp en una nueva pestaña
    window.open(whatsappUrl, "_blank");
  };

  return (
    <>
      <SEO
        title={`Contacto | Zentpiper - Cotiza tu Proyecto en ${paisSeleccionado === 'PE' ? 'Perú' : 'Chile'}`}
        description={`¿Listo para impulsar tu negocio online? Contáctanos y recibe una cotización gratuita. Teléfono: ${paisData.telefono} · Email: ${paisData.email} · Atención en ${paisSeleccionado === 'PE' ? 'Perú' : 'Chile'}.`}
        keywords={`contacto Zentpiper, cotización sitio web, diseño web ${paisSeleccionado === 'PE' ? 'Perú' : 'Chile'}, crear página web, desarrollo web, consulta gratuita diseño web`}
        canonical="https://zentpiper.com/contacto"
      />

      <div className="contacto-container">
        <h1 className="contacto-title">Contáctanos</h1>

        <div className="contacto-info">
          <div className="contacto-card">
            <div className="contacto-icon">
              <i className="bi bi-telephone-fill"></i>
            </div>
            <h3>Teléfono</h3>
            <p>{paisData.telefono}</p>
            <small>{paisSeleccionado === 'PE' ? 'Perú' : 'Chile'}</small>
          </div>

          <div className="contacto-card">
            <div className="contacto-icon">
              <i className="bi bi-envelope-fill"></i>
            </div>
            <h3>Correo Electrónico</h3>
            <p>{paisData.email}</p>
          </div>
        </div>

        <div className="contacto-form-container" id="contacto-form-container">
          <h2>Envíanos un mensaje</h2>
          <div className="pais-indicator-contacto">
            Estás contactando desde: <strong>{paisSeleccionado === 'PE' ? 'Perú' : 'Chile'}</strong>
          </div>
          <form className="contacto-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="asunto">Asunto</label>
              <select
                id="asunto"
                name="asunto"
                value={formData.asunto}
                onChange={handleChange}
                required
                className="select-asunto"
              >
                <option value="">Selecciona un asunto</option>
                <option value="Página Web">Página Web</option>
                <option value="Aplicación Mobile">Aplicación Mobile</option>
                <option value="Cotizar Proyecto">Cotizar Proyecto</option>
                <option value="Soporte técnico">Soporte técnico</option>
                <option value="Otros">Otros</option>
              </select>
            </div>

            {/* Campo Plan - Solo se muestra si el asunto es "Página Web" */}
            {formData.asunto === "Página Web" && (
              <div className="form-group">
                <label htmlFor="plan">Plan</label>
                <select
                  id="plan"
                  name="plan"
                  value={formData.plan}
                  onChange={handleChange}
                  required
                  className="select-plan"
                >
                  <option value="">Selecciona un plan</option>
                  <option value="Plan Básico">Plan Básico</option>
                  <option value="Plan Avanzado">Plan Avanzado</option>
                  <option value="Plan Emprendedor">Plan Emprendedor</option>
                  <option value="Plan Corporativo">Plan Corporativo</option>
                </select>
              </div>
            )}

            {/* Campo Servicio - Solo se muestra si el asunto es "Aplicación Mobile" */}
            {formData.asunto === "Aplicación Mobile" && (
              <div className="form-group">
                <label htmlFor="plan">Servicio</label>
                <select
                  id="plan"
                  name="plan"
                  value={formData.plan}
                  onChange={handleChange}
                  required
                  className="select-plan"
                >
                  <option value="">Selecciona un servicio</option>
                  <option value="App Android">App Android</option>
                  <option value="App iOS">App iOS</option>
                  <option value="App Flutter">App Flutter</option>
                  <option value="App Nativa Full">App Nativa Full</option>
                </select>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="mensaje">Mensaje</label>
              <textarea
                id="mensaje"
                name="mensaje"
                rows="5"
                value={formData.mensaje}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button type="submit" className="submit-button">
              <i className="bi bi-whatsapp"></i>
              Enviar a WhatsApp {paisSeleccionado === 'PE' ? '(Perú)' : '(Chile)'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Contacto;