import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollRestoration() {
    const { pathname } = useLocation();

    useEffect(() => {
        // Manejo del historial nativo
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }

        // Usar solo window.scrollTo que no fuerza reflow
        // Evitar leer propiedades geométricas como scrollTop
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

        // Un solo retry para móviles lentos, sin leer scrollTop
        const timer = setTimeout(() => {
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        }, 50);

        return () => clearTimeout(timer);

    }, [pathname]);

    return null;
}

export default ScrollRestoration;
