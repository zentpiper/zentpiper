import { CLIENTES } from "../content/proyectos";

// Marquesina solo con CSS (transform → GPU, sin JS). La copia va oculta a lectores.
export default function CintaClientes() {
  return (
    <section className="cinta" aria-label="Clientes que confían en Zentpiper">
      <div className="cinta__pista">
        {[0, 1].map((copia) => (
          <ul key={copia} className="cinta__lista" aria-hidden={copia === 1 ? "true" : undefined}>
            {CLIENTES.map((c) => <li key={c}>{c}</li>)}
          </ul>
        ))}
      </div>
    </section>
  );
}
