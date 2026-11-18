import { useState } from "react";
import TarjetaProyecto from "../components/TarjetaProyecto";
import CtaFinal from "../components/CtaFinal";
import PageHero from "../components/PageHero";
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

// Mosaico del encabezado: trabajos reales en vez de un título solo sobre negro.
const MOSAICO = ["tayoton", "spanglish", "naim-marchionni", "lima-moscow"];

export default function Portafolio() {
  const [filtro, setFiltro] = useState("todos");
  const visibles = filtro === "todos" ? PROYECTOS : PROYECTOS.filter((p) => p.categoria === filtro);

  return (
    <>
      <PageHero
        eyebrow="Portafolio"
        titulo={<>Más de <span className="oro">50 webs, tiendas y apps</span> entregadas.</>}
        lead="Negocios reales de Perú y Rusia. Toca cualquiera para verla funcionando."
        visual={
          <div className="mosaico" aria-hidden="true">
            {MOSAICO.map((id) => (
              <img key={id} src={`/media/p-${id}-480.webp`} width="480" height="300" alt="" decoding="async" />
            ))}
          </div>
        }
      />

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
            {visibles.map((p) => <TarjetaProyecto key={p.id} proyecto={p} />)}
          </div>
        </div>
      </section>

      <CtaFinal titulo="¿El próximo es el tuyo?" origen="portafolio-cta" />
    </>
  );
}
