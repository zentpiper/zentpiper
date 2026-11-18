import Icono from "./Icono";
import BotonWhatsApp from "./BotonWhatsApp";
import FichaTecnica from "./FichaTecnica";
import { usePais } from "../contexts/pais";
import { MESES_GRATIS } from "../data/precios";
import { PROYECTOS } from "../content/proyectos";

// grupo: "web" | "apps" (claves de PAISES[x].web / .apps)
export default function TarjetasPlanes({ grupo, planes, extra }) {
  const { datos, precio } = usePais();
  const tipo = grupo === "web" ? "la página web" : "el plan";
  const conPasarelas = (t) => t.replace("{pasarelas}", datos.pasarelas);

  return (
    <div className="planes">
      {planes.map((plan) => {
        const total = precio(grupo, plan.id);
        const ejemplo = PROYECTOS.find((p) => p.id === plan.ejemplo);
        return (
          <article key={plan.id} className={`plan${plan.destacado ? " plan--top" : ""}`}>
            <header className="plan__cab">
              <h3 className="plan__nombre">{plan.nombre}</h3>
              {plan.destacado && <p className="plan__badge">{plan.destacado}</p>}
            </header>
            <p className="plan__para">{plan.para}</p>
            <p className="plan__monto">{total}</p>
            <p className="plan__mensual">
              Pago único · {MESES_GRATIS} meses de mantenimiento gratis, luego {precio(grupo, plan.id, "mensual")}/mes
            </p>
            <ul className="checks">
              {plan.incluye.map((item) => (
                <li key={item}>
                  <Icono nombre="check" size={18} />
                  {conPasarelas(item)}
                </li>
              ))}
            </ul>
            <BotonWhatsApp
              className={`btn btn--block ${plan.destacado ? "btn--gold" : "btn--ghost"}`}
              origen={`plan-${grupo}-${plan.id}`}
              mensaje={`Hola Zentpiper, quiero ${tipo} ${plan.nombre} (${total}). ¿Me ayudan a empezar?`}
              aria-label={`Lo quiero: ${plan.nombre}`}
            >
              Lo quiero
            </BotonWhatsApp>
            {ejemplo && (
              <a className="plan__ej" href={ejemplo.url} target="_blank" rel="noopener">
                <img src={`/media/p-${ejemplo.id}-160.webp`} width="56" height="35" alt="" loading="lazy" decoding="async" />
                <span>Ejemplo real: <strong>{ejemplo.nombre}</strong></span>
                <Icono nombre="externo" size={14} />
              </a>
            )}
            <FichaTecnica filas={plan.ficha.map(([dato, valor]) => [dato, conPasarelas(valor)])} />
          </article>
        );
      })}
      {extra}
    </div>
  );
}
