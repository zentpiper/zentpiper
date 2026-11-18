import { EQUIPO } from "../content/textos";

// Caras reales + quién responde. Va junto a los CTA: recuerda que hay personas detrás.
export default function Atienden({ texto }) {
  const nombres = EQUIPO.map((p) => p.corto).join(" y ");
  return (
    <div className="atienden">
      <span className="avatares" aria-hidden="true">
        {EQUIPO.map((p) => (
          <img key={p.id} src={`/media/e-${p.id}-96.webp`} width="40" height="40" alt="" decoding="async" />
        ))}
      </span>
      <p>{texto ?? `Te atienden ${nombres}, los que la construyen. Sin intermediarios.`}</p>
    </div>
  );
}
