import { PROYECTOS } from "../content/proyectos";

// Fila sobria de clientes reales (sin marquesina animada).
export default function Clientes() {
  return (
    <section className="clientes" aria-label="Clientes">
      <div className="container clientes__in">
        <p className="clientes__t">Han confiado en nosotros</p>
        <ul>
          {PROYECTOS.slice(0, 8).map((p) => (
            <li key={p.id}>{p.nombre}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
