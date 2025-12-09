import { createContext, useContext, useState, useEffect } from 'react';
import { preciosPorPais, getPaisDefault } from '../data/precios';

// Crear el contexto
const PaisContext = createContext(null);

// Provider del contexto
export function PaisProvider({ children }) {
    const [paisSeleccionado, setPaisSeleccionado] = useState(() => getPaisDefault());

    // Obtener datos del país actual
    const paisData = preciosPorPais[paisSeleccionado] || preciosPorPais['PE'];

    // Cambiar país y guardar en localStorage
    const cambiarPais = (nuevoPais) => {
        if (preciosPorPais[nuevoPais]) {
            setPaisSeleccionado(nuevoPais);
            localStorage.setItem('paisSeleccionado', nuevoPais);
        }
    };

    // Sincronizar con localStorage al montar
    useEffect(() => {
        const paisGuardado = localStorage.getItem('paisSeleccionado');
        if (paisGuardado && preciosPorPais[paisGuardado] && paisGuardado !== paisSeleccionado) {
            setPaisSeleccionado(paisGuardado);
        }
    }, []);

    // Escuchar cambios en otras pestañas
    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === 'paisSeleccionado' && e.newValue && preciosPorPais[e.newValue]) {
                setPaisSeleccionado(e.newValue);
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const value = {
        paisSeleccionado,
        paisData,
        cambiarPais,
        // Shortcuts útiles
        moneda: paisData.moneda,
        telefono: paisData.telefono,
        whatsapp: paisData.whatsapp,
        email: paisData.email,
        planesWeb: paisData.planesWeb,
        planesMobile: paisData.planesMobile
    };

    return (
        <PaisContext.Provider value={value}>
            {children}
        </PaisContext.Provider>
    );
}

// Hook personalizado para usar el contexto
export function usePais() {
    const context = useContext(PaisContext);
    if (!context) {
        throw new Error('usePais debe usarse dentro de un PaisProvider');
    }
    return context;
}

export default PaisContext;
