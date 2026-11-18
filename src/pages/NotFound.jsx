import { Link } from "react-router";
import BotonWhatsApp from "../components/BotonWhatsApp";
import { seo } from "../lib/seo";

export const meta = () =>
  seo({
    titulo: "Página no encontrada | Zentpiper",
    descripcion: "Esta página no existe. Mira nuestros planes de páginas web o escríbenos por WhatsApp.",
    ruta: "/404",
    noindex: true,
  });

export default function NotFound() {
  return (
    <section className="section">
      <div className="container narrow center">
        <p className="eyebrow">Error 404</p>
        <h1 className="h1">Esta página no existe</h1>
        <p className="lead">Puede que el enlace esté mal o que la página se haya movido.</p>
        <div className="acciones center">
          <Link className="btn btn--gold btn--lg" to="/planes">Ver precios</Link>
          <BotonWhatsApp className="btn btn--ghost btn--lg" origen="404">Escríbenos</BotonWhatsApp>
        </div>
      </div>
    </section>
  );
}
