import { createContext, useContext } from "react";

export const PaisContext = createContext(null);

export function usePais() {
  const ctx = useContext(PaisContext);
  if (!ctx) throw new Error("usePais debe usarse dentro de <PaisProvider>");
  return ctx;
}
