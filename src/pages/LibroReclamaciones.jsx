import { useState } from "react";
import { Link } from "react-router";
import CamposDiferidos from "../components/CamposDiferidos";
import Icono from "../components/Icono";
import { svgHtml } from "../components/iconos";
import { CONTACTO } from "../data/precios";
import { TIPOS_BIEN, TIPOS_RECLAMO, NOTAS_LIBRO } from "../content/legal";
import { enlaceWhatsApp } from "../lib/whatsapp";
import { camposHtml } from "../lib/campos";
import { seo } from "../lib/seo";
import { migas } from "../lib/schema";

export const meta = () =>
  seo({
    titulo: "Libro de Reclamaciones virtual | Zentpiper",
    descripcion:
      "Presenta un reclamo o una queja a Zentpiper desde aquí. Te respondemos en un plazo máximo de 15 días hábiles, como indica el Código del Consumidor.",
    ruta: "/libro-de-reclamaciones",
    jsonLd: [migas({ nombre: "Libro de Reclamaciones", ruta: "/libro-de-reclamaciones" })],
  });

// Sin backend: la hoja se arma en el navegador, se envía por WhatsApp (y por correo si
// el cliente quiere) y queda en pantalla para imprimir o guardar como PDF.
const PROVEEDOR = `Zentpiper${CONTACTO.ruc ? ` · RUC ${CONTACTO.ruc}` : ""} · ${CONTACTO.ciudad}`;

const DATOS = camposHtml([
  { id: "nombre", label: "Nombre completo", attrs: 'autocomplete="name" required maxlength="120"' },
  { id: "documento", label: "DNI o carné de extranjería", attrs: 'required maxlength="20" inputmode="numeric"' },
  { id: "domicilio", label: "Domicilio", ancho: true, attrs: 'autocomplete="street-address" required maxlength="200"' },
  { id: "telefono", label: "Teléfono", attrs: 'type="tel" autocomplete="tel" inputmode="tel" required maxlength="30"' },
  { id: "email", label: "Correo", attrs: 'type="email" autocomplete="email" required maxlength="150"' },
  { id: "apoderado", label: "Si eres menor de edad: nombre de tu padre o madre", opcional: true, ancho: true, attrs: 'maxlength="120"' },
]);
const BIEN = camposHtml([
  { id: "descripcion", label: "Descripción", attrs: 'required maxlength="200"', placeholder: "Ej.: página web plan Negocio" },
  { id: "monto", label: "Monto reclamado (S/)", opcional: true, attrs: 'inputmode="decimal" maxlength="20"' },
]);
const DETALLE = camposHtml(
  [
    { id: "detalle", label: "Cuéntanos qué pasó", area: true, attrs: 'required maxlength="2000"' },
    { id: "pedido", label: "¿Qué nos pides?", area: true, attrs: 'required maxlength="1000"' },
  ],
  `${svgHtml("whatsapp", 18)} Enviar por WhatsApp`,
);

const dos = (n) => String(n).padStart(2, "0");

function armarHoja(f) {
  const d = new Date();
  const codigo = `LR-${d.getFullYear()}${dos(d.getMonth() + 1)}${dos(d.getDate())}-${dos(d.getHours())}${dos(d.getMinutes())}${dos(d.getSeconds())}`;
  const fecha = `${dos(d.getDate())}/${dos(d.getMonth() + 1)}/${d.getFullYear()} ${dos(d.getHours())}:${dos(d.getMinutes())}`;
  const v = (k) => String(f.get(k) ?? "").trim();
  const filas = [
    ["Proveedor", PROVEEDOR],
    ["1. Consumidor", v("nombre")],
    ["DNI / CE", v("documento")],
    ["Domicilio", v("domicilio")],
    ["Teléfono", v("telefono")],
    ["Correo", v("email")],
    ["Padre o madre", v("apoderado")],
    ["2. Bien contratado", `${v("bien")}: ${v("descripcion")}`],
    ["Monto reclamado", v("monto") && `S/ ${v("monto")}`],
    ["3. Tipo", v("tipo")],
    ["Detalle", v("detalle")],
    ["Pedido", v("pedido")],
  ].filter(([, valor]) => valor);
  const texto =
    `LIBRO DE RECLAMACIONES · Hoja ${codigo}\nFecha: ${fecha}\n\n` +
    filas.map(([k, valor]) => `${k}: ${valor}`).join("\n");
  return { codigo, fecha, filas, texto, email: v("email"), tipo: v("tipo") };
}

export default function LibroReclamaciones() {
  const [hoja, setHoja] = useState(null);

  const enviar = (e) => {
    e.preventDefault();
    const h = armarHoja(new FormData(e.currentTarget));
    // Dentro del submit (gesto del usuario) para que el navegador no bloquee la ventana.
    window.open(enlaceWhatsApp(`Hola Zentpiper, envío una hoja de reclamación.\n\n${h.texto}`), "_blank", "noopener");
    setHoja(h);
    window.scrollTo({ top: 0 });
  };

  const correo = hoja &&
    `mailto:${CONTACTO.email}?cc=${encodeURIComponent(hoja.email)}` +
    `&subject=${encodeURIComponent(`${hoja.tipo} · Hoja ${hoja.codigo}`)}&body=${encodeURIComponent(hoja.texto)}`;

  return (
    <>
      <section className="page-hero page-hero--sm">
        <div className="container narrow">
          <p className="eyebrow">Libro de Reclamaciones</p>
          <h1 className="h1">Libro de Reclamaciones virtual</h1>
          <p className="lead">¿Algo no salió como esperabas? Déjanos tu reclamo o queja y te respondemos en un máximo de 15 días hábiles.</p>
          <p className="nota">{PROVEEDOR} · {CONTACTO.email}</p>
        </div>
      </section>

      <section className="section section--tight" aria-label="Hoja de reclamación">
        <div className="container narrow">
          {hoja ? (
            <div className="card hoja" role="status">
              <span className="ok-icono no-print"><Icono nombre="check" size={36} /></span>
              <h2 className="h2">Hoja de reclamación registrada</h2>
              <p className="hoja__codigo">N.° {hoja.codigo}</p>
              <p className="hoja__fecha">Libro de Reclamaciones de Zentpiper · {hoja.fecha}</p>
              <dl className="hoja__datos">
                {hoja.filas.map(([k, valor]) => (
                  <div key={k}><dt>{k}</dt><dd>{valor}</dd></div>
                ))}
              </dl>
              <ul className="hoja__notas">{NOTAS_LIBRO.map((n) => <li key={n}>{n}</li>)}</ul>
              <p className="nota no-print">Te abrimos WhatsApp con tu hoja. Envíala y guarda este número.</p>
              <div className="acciones no-print">
                <button type="button" className="btn btn--gold" onClick={() => window.print()}>Imprimir o guardar PDF</button>
                <a className="btn btn--ghost" href={correo}>Enviar copia por correo</a>
                <a className="btn btn--ghost" href={enlaceWhatsApp(`Hola Zentpiper, envío una hoja de reclamación.\n\n${hoja.texto}`)} target="_blank" rel="noopener">
                  <Icono nombre="whatsapp" size={18} /> Abrir WhatsApp
                </a>
              </div>
            </div>
          ) : (
            <form className="form card libro" onSubmit={enviar}>
              <div className="grupo" role="group" aria-labelledby="g-datos">
                <h2 className="grupo__t" id="g-datos">1. Tus datos</h2>
                <CamposDiferidos className="form__campos form__campos--2" real={DATOS.real} falso={DATOS.falso} />
              </div>

              <div className="grupo" role="group" aria-labelledby="g-bien">
                <h2 className="grupo__t" id="g-bien">2. Lo que contrataste</h2>
                <div className="opciones">
                  {TIPOS_BIEN.map((t, i) => (
                    <label key={t} className="opcion">
                      <input type="radio" name="bien" value={t} defaultChecked={i === 0} />
                      <span>{t}</span>
                    </label>
                  ))}
                </div>
                <CamposDiferidos className="form__campos form__campos--2" real={BIEN.real} falso={BIEN.falso} />
              </div>

              <div className="grupo" role="group" aria-labelledby="g-tipo">
                <h2 className="grupo__t" id="g-tipo">3. Tu reclamo o queja</h2>
                <div className="tipos">
                  {TIPOS_RECLAMO.map((t, i) => (
                    <label key={t.id} className="tipo">
                      <input type="radio" name="tipo" value={t.id} defaultChecked={i === 0} />
                      <span><strong>{t.id}</strong>{t.def}</span>
                    </label>
                  ))}
                </div>
                <CamposDiferidos className="form__campos" real={DETALLE.real} falso={DETALLE.falso} />
              </div>

              <p className="nota">
                Al enviar aceptas la <Link to="/privacidad">política de privacidad</Link>.
              </p>
            </form>
          )}
          {!hoja && <p className="nota">{NOTAS_LIBRO[1]}</p>}
        </div>
      </section>
    </>
  );
}
