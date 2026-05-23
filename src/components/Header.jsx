import { NavLink } from "react-router-dom";
import { useState, useEffect, useCallback, useRef } from "react";
import { usePais } from "../contexts/PaisContext";
import { paisesDisponibles, preciosPorPais } from "../data/precios";
import "./Header.css";

function Header() {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const lastScrollY = useRef(0);

  const { paisSeleccionado, paisData, cambiarPais } = usePais();

  // Throttled scroll handler — runs at most once per rAF instead of every scroll event
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
          setIsHeaderVisible(false);
        } else {
          setIsHeaderVisible(true);
        }
        lastScrollY.current = currentScrollY;
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.country-selector')) {
        setIsCountryDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const toggleCountryDropdown = useCallback((e) => {
    e.stopPropagation();
    setIsCountryDropdownOpen(prev => !prev);
  }, []);

  const seleccionarPais = useCallback((pais) => {
    cambiarPais(pais);
    setIsCountryDropdownOpen(false);
  }, [cambiarPais]);

  return (
    <header className={`header ${isHeaderVisible ? "header-visible" : "header-hidden"}`}>
      <div className="header-content">
        {/* Logo */}
        <NavLink to="/" className="logo-container">
          <img src="/logo.webp" className="logo" alt="ZENTPIPER SOFTWARE" width="66" height="75" loading="eager" fetchPriority="high" decoding="async" />
          <div className="logo-text">
            <span className="logo-title">ZENTPIPER</span>
            <span className="logo-subtitle">SOFTWARE</span>
          </div>
        </NavLink>

        {/* Navigation */}
        <nav className="navbar-desktop">
          <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>INICIO</NavLink>
          <NavLink to="/portafolio" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>PORTAFOLIO</NavLink>
          <NavLink to="/planes" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>WEB</NavLink>
          <NavLink to="/mobile" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>MOBILE</NavLink>
          <NavLink to="/proyecto" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>PROYECTO</NavLink>
          <NavLink to="/contacto" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>CONTACTO</NavLink>
        </nav>

        {/* Country Selector */}
        <div className="header-right">
          <div className="country-selector">
            <button
              className="country-btn"
              onClick={toggleCountryDropdown}
              aria-label="Seleccionar país"
              title={`Precios en ${paisData.moneda}`}
            >
              <span className="country-label">País:</span>
              <span className="country-display">
                <strong>{paisSeleccionado}</strong> ({paisData.moneda})
              </span>
              <span className={`dropdown-arrow ${isCountryDropdownOpen ? 'open' : ''}`}>▼</span>
            </button>

            {isCountryDropdownOpen && (
              <div className="country-dropdown">
                {paisesDisponibles.map((pais) => (
                  <button
                    key={pais.codigo}
                    className={`country-option ${paisSeleccionado === pais.codigo ? 'selected' : ''}`}
                    onClick={() => seleccionarPais(pais.codigo)}
                    title={`Cambiar a precios de ${pais.nombre}`}
                  >
                    <span className="country-name">{pais.nombre}</span>
                    <span className="country-currency">{preciosPorPais[pais.codigo].moneda}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
