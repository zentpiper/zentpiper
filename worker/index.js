// Worker de Cloudflare. Los archivos estáticos (build/client) se sirven antes de
// llegar aquí; este código solo atiende la API.
import { procesarLead } from "./lead.js";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/send-telegram") {
      return procesarLead(request, env);
    }

    return new Response("Not found", { status: 404 });
  },
};
