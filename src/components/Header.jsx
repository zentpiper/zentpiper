import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import "./Header.css";

function Header() {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [paisSeleccionado, setPaisSeleccionado] = useState("PE");
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Precios y contactos por país
  const preciosPorPais = {
    PE: {
      moneda: "S/",
      telefono: "+51 945 935 080",
      planesWeb: {
        basico: 500,
        emprendedor: 900,
        profesional: 1500,
        tienda: 2500
      },
      planesMobile: {
        android: 1500,
        ios: 2000,
        flutter: 2500,
        nativo: 3500
      }
    },
    CL: {
      moneda: "CLP$",
      telefono: "+56 9 3660 4464",
      planesWeb: {
        basico: 150000,
        emprendedor: 270000,
        profesional: 450000,
        tienda: 750000
      },
      planesMobile: {
        android: 450000,
        ios: 600000,
        flutter: 750000,
        nativo: 1050000
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const toggleCountryDropdown = () => setIsCountryDropdownOpen(!isCountryDropdownOpen);

  const seleccionarPais = (pais) => {
    setPaisSeleccionado(pais);
    setIsCountryDropdownOpen(false);
    localStorage.setItem('paisSeleccionado', pais);
    window.dispatchEvent(new CustomEvent('paisCambiado', { 
      detail: { pais, precios: preciosPorPais[pais] } 
    }));
  };

  useEffect(() => {
    const paisGuardado = localStorage.getItem('paisSeleccionado');
    if (paisGuardado && (paisGuardado === 'PE' || paisGuardado === 'CL')) {
      setPaisSeleccionado(paisGuardado);
    }
  }, []);

  const paises = [
    { codigo: "PE", nombre: "Perú", bandera: "🇵🇪" },
    { codigo: "CL", nombre: "Chile", bandera: "🇨🇱" }
  ];

  const paisActual = paises.find(p => p.codigo === paisSeleccionado);
  const preciosActuales = preciosPorPais[paisSeleccionado];

  const navegacion = (
    <>
      <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>INICIO</NavLink>
      <NavLink to="/portafolio" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>PORTAFOLIO</NavLink>
      <NavLink to="/planes" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>WEB</NavLink>
      <NavLink to="/mobile" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>MOBILE</NavLink>
      <NavLink to="/proyecto" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>PROYECTO</NavLink>
      <NavLink to="/contacto" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>CONTACTO</NavLink>
    </>
  );

  return (
    <header className={`header ${isHeaderVisible ? "header-visible" : "header-hidden"}`}>
      <div className="header-content">
        <div className="logo-container">
          <img src={logo} className="logo" alt="ZENTPIPER SOFTWARE" />
          <div className="logo-text">
            <span className="logo-title">ZENTPIPER</span>
            <span className="logo-subtitle">SOFTWARE</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="navbar-desktop">
          {navegacion}
        </nav>

        {/* Contacto y Country Selector */}
        <div className="header-right">
          <div className="country-selector">
            <button 
              className="country-btn"
              onClick={toggleCountryDropdown}
              aria-label="Seleccionar país"
              title={`Precios en ${preciosActuales.moneda}`}
            >
              <span className="country-flag">{paisActual.bandera}</span>
              <span className="country-code">{paisActual.codigo}</span>
              <span className="country-currency">({preciosActuales.moneda})</span>
              <span className="dropdown-arrow">▼</span>
            </button>
            
            {isCountryDropdownOpen && (
              <div className="country-dropdown">
                {paises.map((pais) => (
                  <button
                    key={pais.codigo}
                    className={`country-option ${paisSeleccionado === pais.codigo ? 'selected' : ''}`}
                    onClick={() => seleccionarPais(pais.codigo)}
                    title={`Cambiar a precios de ${pais.nombre}`}
                  >
                    <span className="country-flag">{pais.bandera}</span>
                    <span className="country-name">{pais.nombre}</span>
                    <span className="country-currency">({preciosPorPais[pais.codigo].moneda})</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
       {/* Botón fijo para móviles */}
<div className="header-save-btn-container">
  <button
    className="header-save-btn"
    onClick={() => {
      localStorage.setItem('paisSeleccionado', paisSeleccionado);
      alert(`¡Tus preferencias de país (${paisSeleccionado}) han sido guardadas!`);
    }}
  >
    Guardar Preferencias
  </button>
</div>
     

    </header>
  );
}

export default Header;
