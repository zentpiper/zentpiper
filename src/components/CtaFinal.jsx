import { Link } from "react-router";
import BotonWhatsApp from "./BotonWhatsApp";

export default function CtaFinal({
  titulo = "¿Empezamos tu proyecto hoy?",
  texto = "Escríbenos y recibe tu cotización gratis, sin compromiso.",
  mensaje,
  origen = "cta-final",
}) {
  return (
    <section className="cta" aria-labelledby="cta-t">
      <div className="container cta__in">
        <h2 className="h2" id="cta-t">{titulo}</h2>
        <p className="lead">{texto}</p>
        <div className="acciones center">
          <BotonWhatsApp className="btn btn--gold btn--lg" mensaje={mensaje} origen={origen}>
            Cotizar por WhatsApp
          </BotonWhatsApp>
          <Link className="btn btn--ghost btn--lg" to="/contacto">Prefiero un formulario</Link>
        </div>
      </div>
    </section>
  );
}
