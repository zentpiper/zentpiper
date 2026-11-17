import { Link } from "react-router";
import BotonWhatsApp from "./BotonWhatsApp";

export default function CtaFinal({
  titulo = "¿Hablamos de tu negocio?",
  texto = "Escríbenos por WhatsApp y te respondemos con precio y plazo. Sin compromiso.",
  mensaje,
  origen = "cta-final",
}) {
  return (
    <section className="cta" aria-labelledby="cta-t">
      <div className="container cta__in">
        <div>
          <h2 className="h2" id="cta-t">{titulo}</h2>
          <p className="lead">{texto}</p>
        </div>
        <div className="acciones">
          <BotonWhatsApp className="btn btn--gold btn--lg" mensaje={mensaje} origen={origen}>
            Escribir por WhatsApp
          </BotonWhatsApp>
          <Link className="btn btn--ghost btn--lg" to="/contacto">Prefiero un formulario</Link>
        </div>
      </div>
    </section>
  );
}
