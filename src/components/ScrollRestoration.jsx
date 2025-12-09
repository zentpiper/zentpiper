import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollRestoration() {
    const { pathname } = useLocation();

    useLayoutEffect(() => {
        // 1. Manejo del historial nativo
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }

        // 2. Función reset agresiva
        const resetScroll = () => {
            // Window y Document
            window.scrollTo(0, 0);
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;

            // Contenedores potenciales (si el scroll está atrapado en un div)
            const scrollableSelectors = ['#root', '.app-container', 'main'];
            scrollableSelectors.forEach(selector => {
                const el = document.querySelector(selector);
                if (el) el.scrollTop = 0;
            });
        };

        // 3. Ejecutar inmediatamente
        resetScroll();

        // 4. Ejecutar después de un pequeño delay para móviles lentos o transiciones
        // Esto es crucial para móviles donde el render puede tardar unos ms
        const timers = [
            setTimeout(resetScroll, 10),
            setTimeout(resetScroll, 100)
        ];

        return () => timers.forEach(clearTimeout);

    }, [pathname]);

    return null;
}

export default ScrollRestoration;
