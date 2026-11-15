import { Links, Meta, Outlet, Scripts, ScrollRestoration, isRouteErrorResponse, Link } from "react-router";
// Inter reducida a los caracteres y pesos del sitio (scripts/subconjunto-fuente.py).
import interWoff2 from "./assets/inter-zp.woff2?url";
import css from "./styles/site.css?inline";
import PaisProvider from "./contexts/PaisProvider";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WhatsAppFlotante from "./components/WhatsAppFlotante";
import { schemaSitio } from "./lib/schema";

const GA_ID = "G-0L8037Y84K";

// Todo el CSS va inline: cero peticiones que bloqueen el primer pintado.
// font-display:optional + preload: si Inter no llega a tiempo se queda la fuente de
// respaldo (Arial ajustada a las métricas de Inter) y nunca hay salto de layout (CLS).
// Solo se incluye al prerenderizar (y en dev): en el bundle del cliente queda ""
// y React conserva el <style> ya presente en el HTML al hidratar.
const CON_ESTILOS = import.meta.env.SSR || import.meta.env.DEV;
const estilos = !CON_ESTILOS ? "" : `@font-face{font-family:"Inter";font-style:normal;font-weight:400 850;font-display:optional;src:url(${interWoff2}) format("woff2");unicode-range:U+0020-007E,U+00A0-00FF,U+2013-2014,U+2018-2019,U+201C-201D,U+2022,U+2026,U+20AC,U+2192,U+2212}@font-face{font-family:"Inter Fallback";src:local("Arial");ascent-override:90.44%;descent-override:22.52%;line-gap-override:0%;size-adjust:107.12%}${css}`;

// GA4 se descarga con la primera interacción: no compite con la carga inicial.
// `gtag()` encola eventos (p. ej. generate_lead) hasta que el script llega.
const analytics = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag("js",new Date());gtag("config","${GA_ID}");(function(){var e=["pointerdown","keydown","touchstart","scroll"],o={passive:!0,once:!0},d=!1;function l(){if(d)return;d=!0;e.forEach(function(n){removeEventListener(n,l,o)});var s=document.createElement("script");s.async=!0;s.src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}";document.head.appendChild(s)}e.forEach(function(n){addEventListener(n,l,o)})})();`;

// Objetos {__html} fijos: React 19 reescribe innerHTML cada vez que recibe un objeto
// nuevo, aunque el texto sea igual. Con el CSS vacío en el cliente eso lo borraría.
const HTML_ESTILOS = { __html: estilos };
const HTML_SCHEMA = { __html: JSON.stringify(schemaSitio) };
const HTML_ANALYTICS = { __html: analytics };

export function Layout({ children }) {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0a0a0b" />
        <meta name="color-scheme" content="dark" />
        <link rel="icon" href="/favicon-32.png" sizes="32x32" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="preload" href={interWoff2} as="font" type="font/woff2" crossOrigin="anonymous" />
        <Meta />
        <Links />
        <style dangerouslySetInnerHTML={HTML_ESTILOS} suppressHydrationWarning />
        <script type="application/ld+json" dangerouslySetInnerHTML={HTML_SCHEMA} />
        <script dangerouslySetInnerHTML={HTML_ANALYTICS} />
      </head>
      <body>
        <a className="skip" href="#contenido">Saltar al contenido</a>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <PaisProvider>
      <Header />
      <main id="contenido">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFlotante />
    </PaisProvider>
  );
}

export function HydrateFallback() {
  return null;
}

export function ErrorBoundary({ error }) {
  const titulo = isRouteErrorResponse(error) ? `Error ${error.status}` : "Algo salió mal";
  return (
    <section className="section">
      <div className="container narrow center">
        <h1 className="h2">{titulo}</h1>
        <p className="lead">Recarga la página o vuelve al inicio.</p>
        <Link className="btn btn--gold" to="/">Ir al inicio</Link>
      </div>
    </section>
  );
}
