@AGENTS.md

# Notas específicas para Claude

- Responde al dueño en **español**. El dueño es Patrick Pozsgai (Zentpiper).
- Antes de un cambio estructural relee `docs/ESQUEMA.md` y `docs/RENDIMIENTO.md`. Si
  cambias rutas, datos, el recorrido de un lead o estilos, **actualiza el esquema en el
  mismo cambio**.
- El dueño prioriza vender: menos texto, más conversión, y 100 en Lighthouse (rendimiento,
  accesibilidad, buenas prácticas y SEO). Un cambio que baje cualquiera de los cuatro
  no está terminado.
- Para ver el sitio usa el navegador integrado: producción en https://zentpiper.com,
  local con `npm run dev` (5173) o un servidor estático sobre `build/client`.

## Skills del proyecto (`.claude/skills/`)

| Skill | Cuándo |
|---|---|
| `nueva-pagina` | Crear, renombrar o eliminar una ruta/página |
| `precios-contacto` | Cambiar precios, planes, teléfonos, WhatsApp o email |
| `copy-conversion` | Escribir o reescribir textos de venta (hero, planes, CTA, FAQ) |
| `qa-visual` | Después de cualquier cambio de UI: navegador + Lighthouse |
| `auditoria-seo` | Revisar meta, JSON-LD, sitemap, robots y coherencia de mensajes |
| `deploy` | Publicar en Cloudflare o configurar secretos del Worker |

## Definición de "terminado"

1. `npm run build` pasa.
2. `npm run lint` en 0 errores.
3. Si tocaste UI: `qa-visual` en desktop (1440) y móvil (375), y Lighthouse móvil en las
   páginas afectadas con 100 en las cuatro categorías.
4. `docs/ESQUEMA.md` refleja el cambio.
