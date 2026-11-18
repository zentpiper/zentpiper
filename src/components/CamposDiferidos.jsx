import { useEffect, useMemo, useRef } from "react";

// Campos de formulario que se activan con la primera interacción.
//
// Por qué: al encontrar campos de texto o botones de envío en la carga, Chrome los
// analiza (autocompletado) en una tarea de ~100 ms que hunde el TBT (rendimiento 96
// en /contacto). Los radios no cuestan, así que pueden ir en el JSX normal.
//
// Cómo: el HTML prerenderizado trae una vista idéntica (`falso`) y los campos reales
// dentro de un <template>. Un <script> inline los cambia en el primer pointerdown,
// touchstart, keydown, focusin, scroll o mousemove, antes de que llegue el clic, así
// que el primer toque ya cae en el campo real. React no toca este contenido
// (dangerouslySetInnerHTML), por eso no hay errores de hidratación.
function activarCampos(c) {
  if (!c || c.dataset.ok) return;
  var t = c.querySelector("template");
  if (!t) return;
  c.dataset.ok = "1";
  c.replaceChildren(t.content.cloneNode(true));
}

function escuchar(c, activar) {
  var eventos = ["pointerdown", "touchstart", "keydown", "focusin", "scroll", "mousemove"];
  var o = { capture: true, passive: true };
  function go() {
    eventos.forEach(function (n) { removeEventListener(n, go, o); });
    activar(c);
  }
  eventos.forEach(function (n) { addEventListener(n, go, o); });
}

const SCRIPT = { __html: `(${escuchar.toString()})(document.currentScript.previousElementSibling,${activarCampos.toString()})` };

export default function CamposDiferidos({ real, falso, className }) {
  const ref = useRef(null);
  // Objeto estable: React 19 reescribe innerHTML si recibe un {__html} nuevo en un
  // re-render (p. ej. al cambiar de país), y borraría los campos ya activados.
  const html = useMemo(() => ({ __html: `${falso}<template>${real}</template>` }), [falso, real]);

  // Navegación interna (sin recarga): el script inline no corre, se activa al montar.
  useEffect(() => activarCampos(ref.current), []);

  return (
    <>
      <div
        ref={ref}
        className={className}
        dangerouslySetInnerHTML={html}
        suppressHydrationWarning
      />
      <script dangerouslySetInnerHTML={SCRIPT} />
    </>
  );
}
