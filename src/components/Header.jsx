import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect, useCallback, useRef } from "react";
import { usePais } from "../contexts/PaisContext";
import { paisesDisponibles, preciosPorPais } from "../data/precios";
import "./Header.css";

function Header() {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const location = useLocation();

  const { paisSeleccionado, paisData, cambiarPais } = usePais();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

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
        setIsScrolled(currentScrollY > 30);
        lastScrollY.current = currentScrollY;
        ticking = false;
      });
    };

    handleScroll();
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

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const seleccionarPais = useCallback((pais) => {
    cambiarPais(pais);
    setIsCountryDropdownOpen(false);
  }, [cambiarPais]);

  return (
    <header className={`header ${isHeaderVisible ? "header-visible" : "header-hidden"} ${isScrolled ? "header-scrolled" : ""}`}>
      <div className="header-content">
        {/* Hamburger (mobile only) */}
        <button
          type="button"
          className={`hamburger-btn ${isMobileMenuOpen ? "open" : ""}`}
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-nav-panel"
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>

        {/* Logo */}
        <NavLink to="/" className="logo-container">
          <img src="/Logo-transparente.svg" className="logo" alt="ZENTPIPER SOFTWARE" loading="eager" fetchPriority="high" decoding="async" />
          <div className="logo-text">
            <span className="logo-title">ZENTPIPER</span>
            <span className="logo-subtitle">SOFTWARE</span>
          </div>
        </NavLink>

        {/* Navigation */}
        <nav className="navbar-desktop">
          <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Inicio</NavLink>
          <NavLink to="/portafolio" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Portafolio</NavLink>
          <NavLink to="/planes" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Web</NavLink>
          <NavLink to="/mobile" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Mobile</NavLink>
          <NavLink to="/proyecto" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Proyecto</NavLink>
          <NavLink to="/contacto" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Contacto</NavLink>
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

      {/* Mobile Navigation Panel */}
      <nav
        id="mobile-nav-panel"
        className={`navbar-mobile ${isMobileMenuOpen ? "open" : ""}`}
      >
        <NavLink to="/" className={({ isActive }) => isActive ? "nav-link-mobile active" : "nav-link-mobile"}>Inicio</NavLink>
        <NavLink to="/portafolio" className={({ isActive }) => isActive ? "nav-link-mobile active" : "nav-link-mobile"}>Portafolio</NavLink>
        <NavLink to="/planes" className={({ isActive }) => isActive ? "nav-link-mobile active" : "nav-link-mobile"}>Web</NavLink>
        <NavLink to="/mobile" className={({ isActive }) => isActive ? "nav-link-mobile active" : "nav-link-mobile"}>Mobile</NavLink>
        <NavLink to="/proyecto" className={({ isActive }) => isActive ? "nav-link-mobile active" : "nav-link-mobile"}>Proyecto</NavLink>
        <NavLink to="/contacto" className={({ isActive }) => isActive ? "nav-link-mobile active" : "nav-link-mobile"}>Contacto</NavLink>
      </nav>
      {isMobileMenuOpen && (
        <div className="mobile-nav-backdrop" onClick={() => setIsMobileMenuOpen(false)} />
      )}
    </header>
  );
}

export default Header;
