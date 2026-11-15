import { LISTA_PAISES } from "../data/precios";
import { usePais } from "../contexts/pais";

export default function SelectorPais() {
  const { pais, cambiarPais } = usePais();
  return (
    <div className="pais" role="group" aria-label="Moneda de los precios">
      {LISTA_PAISES.map((p) => (
        <button
          key={p.codigo}
          type="button"
          className="pais__btn"
          aria-pressed={pais === p.codigo}
          aria-label={`Precios de ${p.nombre} (${p.moneda})`}
          onClick={() => cambiarPais(p.codigo)}
        >
          {p.codigo} <span aria-hidden="true">{p.moneda}</span>
        </button>
      ))}
    </div>
  );
}
