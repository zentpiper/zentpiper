import Icono from "./Icono";
import BotonWhatsApp from "./BotonWhatsApp";
import { usePais } from "../contexts/pais";
import { MESES_GRATIS } from "../data/precios";

// grupo: "web" | "apps" (claves de PAISES[x].web / .apps)
export default function TarjetasPlanes({ grupo, planes, extra }) {
  const { datos, precio } = usePais();
  const tipo = grupo === "web" ? "la página web" : "el plan";

  return (
    <div className="planes">
      {planes.map((plan) => {
        const total = precio(grupo, plan.id);
        const mensual = precio(grupo, plan.id, "mensual");
        return (
          <article key={plan.id} className={`plan${plan.destacado ? " plan--top" : ""}`}>
            {plan.destacado && <p className="plan__badge">{plan.destacado}</p>}
            <h3 className="plan__nombre">{plan.nombre}</h3>
            <p className="plan__para">{plan.para}</p>
            <p className="plan__precio">
              <span className="plan__monto">{total}</span>
              <span className="plan__unico">pago único</span>
            </p>
            <p className="plan__mensual">
              <strong>{MESES_GRATIS} meses gratis</strong> de mantenimiento, luego {mensual}/mes
            </p>
            <ul className="checks">
              {plan.incluye.map((item) => (
                <li key={item}>
                  <Icono nombre="check" size={18} />
                  {item.replace("{pasarelas}", datos.pasarelas)}
                </li>
              ))}
            </ul>
            <BotonWhatsApp
              className={`btn btn--block ${plan.destacado ? "btn--gold" : "btn--ghost"}`}
              origen={`plan-${grupo}-${plan.id}`}
              mensaje={`Hola Zentpiper, quiero ${tipo} ${plan.nombre} (${total}). ¿Me ayudan a empezar?`}
            >
              Quiero el plan {plan.nombre.replace(/^App /, "")}
            </BotonWhatsApp>
          </article>
        );
      })}
      {extra}
    </div>
  );
}
