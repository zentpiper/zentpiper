import { useState } from "react";
import TarjetaProyecto from "../components/TarjetaProyecto";
import CtaFinal from "../components/CtaFinal";
import { PROYECTOS, CATEGORIAS } from "../content/proyectos";
import { seo } from "../lib/seo";
import { migas } from "../lib/schema";

export const meta = () =>
  seo({
    titulo: "Portafolio: webs, tiendas y apps que hemos lanzado | Zentpiper",
    descripcion:
      "Más de 50 proyectos entregados: páginas web, tiendas online, sistemas y apps para negocios reales. Mira los casos y cotiza el tuyo gratis.",
    ruta: "/portafolio",
    jsonLd: [migas({ nombre: "Portafolio", ruta: "/portafolio" })],
  });

export default function Portafolio() {
  const [filtro, setFiltro] = useState("todos");
  const visibles = filtro === "todos" ? PROYECTOS : PROYECTOS.filter((p) => p.categoria === filtro);

  return (
    <>
      <section className="page-hero">
        <div className="container narrow center">
          <p className="eyebrow">Portafolio</p>
          <h1 className="h1">+50 proyectos que ya están vendiendo</h1>
          <p className="lead">Webs, tiendas, sistemas y apps para negocios reales. Toca uno para verlo en vivo.</p>
        </div>
      </section>

      <section className="section section--tight" aria-labelledby="proyectos-t">
        <div className="container">
          <h2 className="sr-only" id="proyectos-t">Proyectos</h2>
          <div className="filtros" role="group" aria-label="Filtrar por tipo">
            {CATEGORIAS.map((c) => (
              <button key={c.id} type="button" className="filtro" aria-pressed={filtro === c.id} onClick={() => setFiltro(c.id)}>
                {c.nombre}
              </button>
            ))}
          </div>
          <div className="grid-3">
            {visibles.map((p, i) => <TarjetaProyecto key={p.id} proyecto={p} lcp={i === 0} />)}
          </div>
        </div>
      </section>

      <CtaFinal titulo="¿El próximo es el tuyo?" origen="portafolio-cta" />
    </>
  );
}
