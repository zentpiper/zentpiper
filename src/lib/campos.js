// Campos de texto como HTML plano para <CamposDiferidos> (ver ese componente):
// `real` son los campos de verdad y `falso` una vista idéntica que no cuesta nada al cargar.
// Cada campo: { id, label, attrs, opcional?, area?, placeholder?, ancho? }.
// `area` siempre con rows="3": .falso--area tiene esa altura y así el cambio no mueve nada.

const etiqueta = (c) => `${c.label}${c.opcional ? ' <span class="opcional">(opcional)</span>' : ""}`;
const ph = (c) => (c.placeholder ? ` placeholder="${c.placeholder}"` : "");
const clase = (c) => `campo${c.ancho ? " campo--ancho" : ""}`;

export function camposHtml(campos, boton) {
  const real =
    campos.map((c) =>
      `<div class="${clase(c)}"><label for="${c.id}">${etiqueta(c)}</label>` +
      (c.area
        ? `<textarea id="${c.id}" name="${c.id}" rows="3" ${c.attrs}${ph(c)}></textarea>`
        : `<input id="${c.id}" name="${c.id}" ${c.attrs}${ph(c)}>`) +
      `</div>`,
    ).join("") + (boton ? `<button type="submit" class="btn btn--gold btn--lg btn--block">${boton}</button>` : "");

  const falso =
    campos.map((c) =>
      `<div class="${clase(c)}"><span class="campo__l">${etiqueta(c)}</span>` +
      `<span class="falso${c.area ? " falso--area" : ""}">${c.placeholder ?? ""}</span></div>`,
    ).join("") + (boton ? `<span class="btn btn--gold btn--lg btn--block">${boton}</span>` : "");

  return { real, falso };
}
