import { usePais } from "../contexts/pais";

// <details> nativo: accesible y sin JS. {mensualWeb}/{mensualApp} → precio del país.
export default function Faq({ items }) {
  const { precio } = usePais();
  const reemplazos = {
    "{mensualWeb}": `${precio("web", "esencial", "mensual")}/mes`,
    "{mensualApp}": `${precio("apps", "lanzamiento", "mensual")}/mes`,
  };
  const texto = (t) => t.replace(/\{mensual(Web|App)\}/g, (m) => reemplazos[m]);

  return (
    <div className="faq">
      {items.map((item) => (
        <details key={item.p} className="faq__item">
          <summary>{item.p}</summary>
          <p>{texto(item.r)}</p>
        </details>
      ))}
    </div>
  );
}
