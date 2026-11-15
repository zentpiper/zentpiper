import { useEffect, useRef } from "react";

// Arranca el video del hero sin React (corre como <script> inline en el HTML
// prerenderizado, antes de hidratar). Espera al primer LCP + `load` + tiempo libre
// para no competir con nada crítico. Sin video con "reducir movimiento", ahorro de
// datos o 2G. Móvil recibe un corte vertical más liviano. Rota la lista de videos.
function iniciarVideo(v) {
  if (!v || v.dataset.boot) return;
  v.dataset.boot = "1";
  var c = navigator.connection || {};
  if (matchMedia("(prefers-reduced-motion: reduce)").matches || c.saveData || /2g/.test(c.effectiveType || "")) return;
  var sufijo = matchMedia("(max-width: 767px)").matches ? "-m" : "";
  var lista = v.dataset.videos.split(",");
  var i = 0;
  function reproducir() {
    v.src = "/media/" + lista[i] + sufijo + ".mp4";
    v.muted = true;
    var p = v.play();
    if (p) p.catch(function () {});
  }
  v.addEventListener("playing", function () { v.classList.add("is-on"); });
  v.addEventListener("ended", function () {
    if (lista.length < 2) return v.play();
    v.classList.remove("is-on");
    i = (i + 1) % lista.length;
    reproducir();
  });
  var listo = false;
  function arrancar() { (window.requestIdleCallback || setTimeout)(reproducir, { timeout: 2000 }); }
  function trasCarga() {
    if (listo) return;
    listo = true;
    if (document.readyState === "complete") arrancar();
    else addEventListener("load", arrancar, { once: true });
  }
  // Respaldo: pestañas abiertas en segundo plano no reportan LCP.
  setTimeout(trasCarga, 4000);
  var tipos = (window.PerformanceObserver && PerformanceObserver.supportedEntryTypes) || [];
  if (tipos.indexOf("largest-contentful-paint") < 0) return trasCarga();
  new PerformanceObserver(function (l, o) {
    o.disconnect();
    setTimeout(trasCarga, 600);
  }).observe({ type: "largest-contentful-paint", buffered: true });
}

// Objeto fijo: un {__html} nuevo en cada render hace que React reescriba el innerHTML.
const SCRIPT = { __html: `(${iniciarVideo.toString()})(document.currentScript.previousElementSibling)` };

export default function HeroVideo({ videos }) {
  const ref = useRef(null);
  const primero = videos[0];

  // Navegación interna (sin recarga): el <script> inline no se ejecuta, así que
  // arrancamos desde React. En carga directa ya lo hizo el script (data-boot).
  useEffect(() => iniciarVideo(ref.current), []);

  return (
    <div className="hero__media" aria-hidden="true">
      <picture>
        <source media="(max-width: 767px)" srcSet={`/media/${primero}-poster-m.webp`} width="720" height="1280" />
        <img src={`/media/${primero}-poster.webp`} width="1600" height="900" alt="" fetchPriority="high" decoding="async" />
      </picture>
      <video ref={ref} data-videos={videos.join(",")} muted playsInline preload="none" tabIndex={-1} />
      <script dangerouslySetInnerHTML={SCRIPT} />
    </div>
  );
}
