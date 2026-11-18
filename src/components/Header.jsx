import { useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router";
import Icono from "./Icono";
import SelectorPais from "./SelectorPais";
import BotonWhatsApp from "./BotonWhatsApp";
import { NAV } from "./navegacion";

export default function Header() {
  const menu = useRef(null);
  const { pathname } = useLocation();

  // El menú móvil es un <details> nativo: funciona antes de que cargue React.
  // Con React: se cierra al navegar, con Escape y al tocar fuera.
  useEffect(() => {
    if (menu.current) menu.current.open = false;
  }, [pathname]);

  useEffect(() => {
    const cerrar = (e) => {
      const d = menu.current;
      if (d?.open && (e.key === "Escape" || (e.type === "pointerdown" && !d.contains(e.target)))) d.open = false;
    };
    addEventListener("keydown", cerrar);
    addEventListener("pointerdown", cerrar);
    return () => {
      removeEventListener("keydown", cerrar);
      removeEventListener("pointerdown", cerrar);
    };
  }, []);

  return (
    <header className="hdr">
      <div className="container hdr__in">
        <Link to="/" className="marca" aria-label="Zentpiper, ir al inicio">
          <img src="/logo.svg" width="30" height="30" alt="" />
          <span>ZENTPIPER</span>
        </Link>

        <nav className="nav" aria-label="Principal">
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} className="nav__link">
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hdr__fin">
          <SelectorPais />
          <BotonWhatsApp className="btn btn--gold btn--sm hdr__cta" origen="header" icono={false}>
            Cotizar gratis
          </BotonWhatsApp>
          <details className="mmenu" ref={menu}>
            <summary className="menu-btn" aria-label="Menú">
              <Icono nombre="menu" size={24} className="mmenu__abrir" />
              <Icono nombre="cross" size={24} className="mmenu__cerrar" />
            </summary>
            <nav className="mnav" aria-label="Menú móvil">
              {NAV.map((item) => (
                <NavLink key={item.to} to={item.to} className="mnav__link">
                  {item.label}
                </NavLink>
              ))}
              <BotonWhatsApp className="btn btn--gold btn--block" origen="menu-movil">
                Cotizar gratis por WhatsApp
              </BotonWhatsApp>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
