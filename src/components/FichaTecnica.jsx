// Detalle técnico breve, plegado: no ocupa espacio para quien solo quiere el precio y
// está a un toque para quien lo busca. <details> nativo: funciona sin JS.
export default function FichaTecnica({ filas, titulo = "Ficha técnica" }) {
  return (
    <details className="ficha">
      <summary>{titulo}</summary>
      <dl>
        {filas.map(([dato, valor]) => (
          <div key={dato}>
            <dt>{dato}</dt>
            <dd>{valor}</dd>
          </div>
        ))}
      </dl>
    </details>
  );
}
