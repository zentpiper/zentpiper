// Datos centralizados de precios y contactos por país
// Moneda Perú: S/ (soles)
// Moneda Chile: CLP$ (pesos chilenos)
// Moneda Internacional: US$ (dólares)

export const preciosPorPais = {
    PE: {
        codigo: "PE",
        nombre: "Perú",
        bandera: "PE",
        moneda: "S/",
        telefono: "+51 945 935 080",
        whatsapp: "51945935080",
        email: "zentpiper@gmail.com",

        // Planes Web
        planesWeb: {
            basico: { desarrollo: 500, mantenimiento: 20 },
            emprendedor: { desarrollo: 900, mantenimiento: 40 },
            profesional: { desarrollo: 1500, mantenimiento: 80 },
            tienda: { desarrollo: 2500, mantenimiento: 120 }
        },

        // Planes Mobile
        planesMobile: {
            android: { desarrollo: 7000, mantenimiento: 700 },
            ios: { desarrollo: 10500, mantenimiento: 700 },
            flutter: { desarrollo: 12000, mantenimiento: 700 },
            nativo: { desarrollo: 14000, mantenimiento: 700 }
        }
    },

    CL: {
        codigo: "CL",
        nombre: "Chile",
        bandera: "CL",
        moneda: "CLP$",
        telefono: "+56 9 3660 4464",
        whatsapp: "56936604464",
        email: "zentpiper@gmail.com",

        // Planes Web
        planesWeb: {
            basico: { desarrollo: 270000, mantenimiento: 65000 },
            emprendedor: { desarrollo: 540000, mantenimiento: 65000 },
            profesional: { desarrollo: 1080000, mantenimiento: 65000 },
            tienda: { desarrollo: 1620000, mantenimiento: 65000 }
        },

        // Planes Mobile
        planesMobile: {
            android: { desarrollo: 560000, mantenimiento: 60000 },
            ios: { desarrollo: 840000, mantenimiento: 60000 },
            flutter: { desarrollo: 980000, mantenimiento: 120000 },
            nativo: { desarrollo: 1120000, mantenimiento: 120000 }
        }
    },

    INT: {
        codigo: "INT",
        nombre: "Internacional",
        bandera: "🌎",
        moneda: "USD",
        telefono: "+51 945 935 080",
        whatsapp: "51945935080",
        email: "zentpiper@gmail.com",

        // Planes Web (precios en USD)
        planesWeb: {
            basico: { desarrollo: 150, mantenimiento: 5 },
            emprendedor: { desarrollo: 300, mantenimiento: 10 },
            profesional: { desarrollo: 600, mantenimiento: 20 },
            tienda: { desarrollo: 900, mantenimiento: 30 }
        },

        // Planes Mobile (precios en USD)
        planesMobile: {
            android: { desarrollo: 2000, mantenimiento: 200 },
            ios: { desarrollo: 3000, mantenimiento: 200 },
            flutter: { desarrollo: 3500, mantenimiento: 200 },
            nativo: { desarrollo: 4000, mantenimiento: 200 }
        }
    }
};

// Lista de países disponibles
export const paisesDisponibles = [
    { codigo: "PE", nombre: "Perú", bandera: "PE" },
    { codigo: "CL", nombre: "Chile", bandera: "CL" },
    { codigo: "INT", nombre: "Internacional", bandera: "🌎" }
];

// Función para formatear precios según el país
export const formatearPrecio = (precio, codigoPais) => {
    const pais = preciosPorPais[codigoPais];
    if (!pais) return `$${precio}`;

    if (codigoPais === 'CL') {
        return `${pais.moneda} ${precio.toLocaleString('es-CL')}`;
    }
    return `${pais.moneda} ${precio.toLocaleString('es-PE')}`;
};

// Obtener datos del país por defecto
export const getPaisDefault = () => {
    const paisGuardado = localStorage.getItem('paisSeleccionado');
    if (paisGuardado && preciosPorPais[paisGuardado]) {
        return paisGuardado;
    }
    return 'PE';
};

export default preciosPorPais;
