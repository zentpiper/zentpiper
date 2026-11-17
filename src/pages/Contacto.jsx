import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import BotonWhatsApp from "../components/BotonWhatsApp";
import CamposDiferidos from "../components/CamposDiferidos";
import Icono from "../components/Icono";
import { svgHtml } from "../components/iconos";
import { usePais } from "../contexts/pais";
import { CONTACTO } from "../data/precios";
import { enlaceWhatsApp, registrarLead } from "../lib/whatsapp";
import { seo } from "../lib/seo";
import { migas } from "../lib/schema";

export const meta = () =>
  seo({
    titulo: "Contacto: cotiza tu web o app gratis | Zentpiper",
    descripcion:
      `Cotiza gratis tu página web, tienda online o app. Escríbenos por WhatsApp al ${CONTACTO.telefono} o deja tus datos y seguimos por WhatsApp.`,
    ruta: "/contacto",
    jsonLd: [migas({ nombre: "Contacto", ruta: "/contacto" })],
  });

const SERVICIOS = ["Página web", "Tienda online", "App móvil", "Sistema a medida", "Otro"];

// Campos de texto + envío como HTML: se activan con la primera interacción
// (ver components/CamposDiferidos.jsx). `alto` = filas visibles.
const CAMPOS = [
  { id: "nombre", label: "Tu nombre", attrs: 'autocomplete="name" required maxlength="100"' },
  { id: "telefono", label: "WhatsApp o teléfono", attrs: 'type="tel" autocomplete="tel" inputmode="tel" required maxlength="30"', placeholder: "+51 9…" },
  { id: "mensaje", label: "Cuéntanos un poco", opcional: true, area: true, attrs: 'rows="3" maxlength="2000"', placeholder: "Rubro, qué quieres vender, fecha ideal…" },
  { id: "email", label: "Email", opcional: true, attrs: 'type="email" autocomplete="email" maxlength="150"' },
];
const BOTON = `${svgHtml("whatsapp", 18)} Enviar por WhatsApp`;
const etiqueta = (c) => `${c.label}${c.opcional ? ' <span class="opcional">(opcional)</span>' : ""}`;
const ph = (c) => (c.placeholder ? ` placeholder="${c.placeholder}"` : "");

const CAMPOS_REALES =
  CAMPOS.map((c) =>
    `<div class="campo"><label for="${c.id}">${etiqueta(c)}</label>` +
    (c.area
      ? `<textarea id="${c.id}" name="${c.id}" ${c.attrs}${ph(c)}></textarea>`
      : `<input id="${c.id}" name="${c.id}" ${c.attrs}${ph(c)}>`) +
    `</div>`,
  ).join("") + `<button type="submit" class="btn btn--gold btn--lg btn--block">${BOTON}</button>`;

const CAMPOS_FALSOS =
  CAMPOS.map((c) =>
    `<div class="campo"><span class="campo__l">${etiqueta(c)}</span>` +
    `<span class="falso${c.area ? " falso--area" : ""}">${c.placeholder ?? ""}</span></div>`,
  ).join("") + `<span class="btn btn--gold btn--lg btn--block">${BOTON}</span>`;

export default function Contacto() {
  const navigate = useNavigate();
  const { datos } = usePais();
  const [plan, setPlan] = useState("");

  // ?servicio=App%20móvil&plan=Negocio llega desde enlaces internos.
  useEffect(() => {
    const q = new URLSearchParams(location.search);
    const servicio = q.get("servicio");
    // Solo si el usuario no eligió otro antes de que cargara React.
    const actual = document.querySelector('input[name="servicio"]:checked');
    if (SERVICIOS.includes(servicio) && actual?.value === SERVICIOS[0]) {
      document.querySelector(`input[name="servicio"][value="${servicio}"]`).checked = true;
    }
    if (q.get("plan")) setPlan(q.get("plan").slice(0, 40));
  }, []);

  const enviar = (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const nombre = f.get("nombre").trim();
    const servicio = f.get("servicio");
    const detalle = f.get("mensaje").trim();
    const mensaje =
      `Hola Zentpiper, soy ${nombre}. Quiero cotizar: ${servicio}${plan ? ` (plan ${plan})` : ""}.` +
      (detalle ? `\n\n${detalle}` : "");

    // Se abre dentro del submit (gesto del usuario) para que el navegador no lo bloquee.
    window.open(enlaceWhatsApp(mensaje), "_blank", "noopener");

    fetch("/api/send-telegram", {
      method: "POST",
      keepalive: true,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre,
        telefono: f.get("telefono"),
        email: f.get("email"),
        servicio,
        plan,
        mensaje: detalle,
        pais: datos.nombre,
      }),
    }).catch(() => {});

    registrarLead("formulario", { servicio });
    navigate("/confirmacion", { state: { nombre, mensaje } });
  };

  return (
    <>
      <section className="page-hero page-hero--sm">
        <div className="container">
          <p className="eyebrow">Contacto</p>
          <h1 className="h1">Cotiza gratis tu web o app.</h1>
          <p className="lead">Dos datos y seguimos por WhatsApp. Sin compromiso.</p>
        </div>
      </section>

      <section className="section section--tight" aria-label="Formulario de contacto">
        <div className="container contacto">
          <form className="form card" onSubmit={enviar}>
            <fieldset className="campo">
              <legend>¿Qué necesitas?</legend>
              <div className="opciones">
                {SERVICIOS.map((s, i) => (
                  <label key={s} className="opcion">
                    <input type="radio" name="servicio" value={s} defaultChecked={i === 0} />
                    <span>{s}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <CamposDiferidos className="form__campos" real={CAMPOS_REALES} falso={CAMPOS_FALSOS} />
            <p className="nota">Te respondemos por WhatsApp. No compartimos tus datos.</p>
          </form>

          <aside className="contacto__alt">
            <div className="card card--oro">
              <h2 className="card__t">¿Prefieres escribir directo?</h2>
              <p>Es la forma más rápida de cotizar.</p>
              <BotonWhatsApp className="btn btn--gold btn--block" origen="contacto-directo">
                Abrir WhatsApp
              </BotonWhatsApp>
            </div>
            <ul className="lista-contacto">
              <li><Icono nombre="telefono" size={18} /><a href={`tel:${CONTACTO.telefono.replace(/\s/g, "")}`}>{CONTACTO.telefono}</a></li>
              <li><Icono nombre="mail" size={18} /><a href={`mailto:${CONTACTO.email}`}>{CONTACTO.email}</a></li>
              <li><Icono nombre="ubicacion" size={18} /><span>{CONTACTO.ciudad} · Atendemos Perú y Rusia</span></li>
            </ul>
          </aside>
        </div>
      </section>
    </>
  );
}
