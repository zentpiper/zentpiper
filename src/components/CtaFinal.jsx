import { Link } from "react-router";
import BotonWhatsApp from "./BotonWhatsApp";
import { EQUIPO } from "../content/textos";

// Cierre de cada página: foto real de fondo (carga diferida) + caras del equipo.
export default function CtaFinal({
  titulo = "¿Hablamos de tu negocio?",
  texto = "Escríbenos por WhatsApp y te respondemos con precio y plazo. Sin compromiso.",
  mensaje,
  origen = "cta-final",
}) {
  return (
    <section className="cta" aria-labelledby="cta-t">
      <img className="cta__foto" src="/media/f-cierre-960.webp" width="960" height="720" alt="" loading="lazy" decoding="async" />
      <div className="container cta__in">
        <div className="cta__txt">
          <span className="avatares" aria-hidden="true">
            {EQUIPO.map((p) => (
              <img key={p.id} src={`/media/e-${p.id}-96.webp`} width="40" height="40" alt="" loading="lazy" decoding="async" />
            ))}
          </span>
          <h2 className="h2" id="cta-t">{titulo}</h2>
          <p className="lead">{texto}</p>
          <div className="acciones">
            <BotonWhatsApp className="btn btn--gold btn--lg" mensaje={mensaje} origen={origen}>
              Escribir por WhatsApp
            </BotonWhatsApp>
            <Link className="btn btn--ghost btn--lg" to="/contacto">Prefiero un formulario</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
