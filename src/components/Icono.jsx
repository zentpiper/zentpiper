// Iconos SVG inline (sin librerías ni peticiones). Decorativos por defecto.
import { PATHS } from "./iconos";

export default function Icono({ nombre, size = 20, className, label }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      aria-hidden={label ? undefined : "true"}
      role={label ? "img" : undefined}
      aria-label={label}
      focusable="false"
    >
      <path d={PATHS[nombre]} />
    </svg>
  );
}
