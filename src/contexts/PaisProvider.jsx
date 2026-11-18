import { useCallback, useEffect, useMemo, useState } from "react";
import { PAISES, PAIS_DEFAULT, formatearPrecio } from "../data/precios";
import { PaisContext } from "./pais";

const CLAVE = "pais";

// El HTML prerenderizado siempre sale con PAIS_DEFAULT; el país real se aplica
// después de hidratar para no provocar errores de hidratación.
function detectarPais() {
  try {
    const guardado = localStorage.getItem(CLAVE);
    if (PAISES[guardado]) return guardado;
  } catch {
    // localStorage bloqueado: seguimos con la detección
  }
  const idioma = navigator.language?.toLowerCase() ?? "";
  const zona = Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
  return idioma.startsWith("ru") || zona === "Europe/Moscow" ? "RU" : PAIS_DEFAULT;
}

export default function PaisProvider({ children }) {
  const [pais, setPais] = useState(PAIS_DEFAULT);

  useEffect(() => {
    const detectado = detectarPais();
    if (detectado !== PAIS_DEFAULT) setPais(detectado);
  }, []);

  const cambiarPais = useCallback((codigo) => {
    if (!PAISES[codigo]) return;
    setPais(codigo);
    try {
      localStorage.setItem(CLAVE, codigo);
    } catch {
      // sin persistencia: el cambio vale para esta visita
    }
  }, []);

  const value = useMemo(() => {
    const datos = PAISES[pais];
    return {
      pais,
      datos,
      cambiarPais,
      // precio("web", "negocio") → "S/ 900";  precio("web", "negocio", "mensual") → "S/ 50"
      precio: (grupo, id, campo = "precio") => formatearPrecio(datos[grupo][id][campo], pais),
    };
  }, [pais, cambiarPais]);

  return <PaisContext.Provider value={value}>{children}</PaisContext.Provider>;
}
