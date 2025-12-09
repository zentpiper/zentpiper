import { useLocation, Link } from "react-router-dom";
import "./Breadcrumbs.css";

// Mapeo de rutas a nombres legibles
const routeNames = {
    "": "Inicio",
    "planes": "Planes Web",
    "mobile": "Desarrollo Móvil",
    "portafolio": "Portafolio",
    "proyecto": "Proyectos",
    "contacto": "Contacto"
};

function Breadcrumbs() {
    const location = useLocation();

    // No mostrar en la página de inicio
    if (location.pathname === "/") {
        return null;
    }

    // Crear las partes del breadcrumb
    const pathParts = location.pathname.split("/").filter(Boolean);

    // Generar el schema JSON-LD para SEO
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Inicio",
                "item": "https://zentpiper.com/"
            },
            ...pathParts.map((part, index) => ({
                "@type": "ListItem",
                "position": index + 2,
                "name": routeNames[part] || part,
                "item": `https://zentpiper.com/${pathParts.slice(0, index + 1).join("/")}`
            }))
        ]
    };

    return (
        <>
            {/* Schema JSON-LD para SEO */}
            <script type="application/ld+json">
                {JSON.stringify(breadcrumbSchema)}
            </script>

            {/* Breadcrumb visual */}
            <nav className="breadcrumbs" aria-label="Breadcrumb">
                <ol className="breadcrumb-list">
                    <li className="breadcrumb-item">
                        <Link to="/" className="breadcrumb-link">
                            Inicio
                        </Link>
                    </li>

                    {pathParts.map((part, index) => {
                        const isLast = index === pathParts.length - 1;
                        const path = `/${pathParts.slice(0, index + 1).join("/")}`;
                        const name = routeNames[part] || part;

                        return (
                            <li key={path} className="breadcrumb-item">
                                <span className="breadcrumb-separator">/</span>
                                {isLast ? (
                                    <span className="breadcrumb-current" aria-current="page">
                                        {name}
                                    </span>
                                ) : (
                                    <Link to={path} className="breadcrumb-link">
                                        {name}
                                    </Link>
                                )}
                            </li>
                        );
                    })}
                </ol>
            </nav>
        </>
    );
}

export default Breadcrumbs;
