// Función de Vercel para POST /api/send-telegram (misma lógica que el Worker de
// Cloudflare). Variables de entorno en Vercel: TELEGRAM_BOT_TOKEN y TELEGRAM_CHAT_ID.
import { procesarLead } from "../worker/lead.js";

export async function POST(request) {
  return procesarLead(request, process.env);
}
