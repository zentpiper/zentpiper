import Icono from "./Icono";

// `arriba`: la tarjeta se ve sin hacer scroll (carga inmediata). `lcp`: además es la
// imagen más grande de la pantalla inicial (prioridad alta, ver docs/RENDIMIENTO.md §5).
export default function TarjetaProyecto({ proyecto, arriba = false, lcp = false }) {
  const { id, nombre, rubro, descripcion, resultado, url } = proyecto;
  const contenido = (
    <>
      <img
        className="proy__img"
        src={`/media/p-${id}-480.webp`}
        srcSet={`/media/p-${id}-480.webp 480w, /media/p-${id}-800.webp 800w`}
        sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 370px"
        width="800"
        height="500"
        alt={`Captura de la web de ${nombre}`}
        loading={arriba || lcp ? "eager" : "lazy"}
        fetchPriority={lcp ? "high" : undefined}
        decoding="async"
      />
      <div className="proy__txt">
        <p className="proy__rubro">{rubro}</p>
        <h3 className="proy__nombre">
          {nombre}
          {url && <Icono nombre="externo" size={16} />}
        </h3>
        <p className="proy__desc">{descripcion}</p>
        {resultado && <p className="proy__res">{resultado}</p>}
      </div>
    </>
  );

  return url ? (
    <a className="proy" href={url} target="_blank" rel="noopener">
      {contenido}
    </a>
  ) : (
    <div className="proy">{contenido}</div>
  );
}
