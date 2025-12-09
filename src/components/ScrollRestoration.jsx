import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollRestoration() {
    const { pathname } = useLocation();

    useLayoutEffect(() => {
        // Desactivar restauración automática del navegador
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }

        // Forzar scroll arriba inmediatamente
        window.scrollTo(0, 0);
        document.documentElement.scrollTo(0, 0);
        document.body.scrollTo(0, 0);

    }, [pathname]);

    return null;
}

export default ScrollRestoration;
