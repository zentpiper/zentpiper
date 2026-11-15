import Icono from "./Icono";
import { COMPARATIVA } from "../content/textos";

export default function Comparativa() {
  return (
    <div className="tabla-wrap">
      <table className="tabla">
        <caption className="sr-only">Zentpiper comparado con plantillas y WordPress</caption>
        <thead>
          <tr>
            <td />
            <th scope="col" className="tabla__zp">Zentpiper</th>
            <th scope="col">Plantillas / WordPress</th>
          </tr>
        </thead>
        <tbody>
          {COMPARATIVA.map((fila) => (
            <tr key={fila.tema}>
              <th scope="row">{fila.tema}</th>
              <td className="tabla__zp"><Icono nombre="check" size={18} />{fila.nosotros}</td>
              <td className="tabla__no"><Icono nombre="cross" size={18} />{fila.otros}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
