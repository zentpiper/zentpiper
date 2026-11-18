// Lógica compartida del aviso de leads a Telegram. La usan el Worker de Cloudflare
// (worker/index.js) y la función de Vercel (api/send-telegram.js), para que el sitio
// funcione igual en cualquiera de las dos plataformas.

// Trim to a string and cap its length; non-strings become "".
const str = (v, max) => (typeof v === "string" ? v.trim().slice(0, max) : "");

const json = (data, status = 200) => Response.json(data, { status });

export async function procesarLead(request, env) {
  if (request.method !== "POST") {
    return json({ success: false, error: "Method not allowed" }, 405);
  }

  const TELEGRAM_BOT_TOKEN = env.TELEGRAM_BOT_TOKEN;
  const CHAT_ID = env.TELEGRAM_CHAT_ID;

  if (!TELEGRAM_BOT_TOKEN || !CHAT_ID) {
    console.error("send-telegram: TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID not configured");
    return json({ success: false, error: "Server not configured" }, 500);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ success: false, error: "Invalid JSON" }, 400);
  }

  const nombre = str(body.nombre, 100);
  const telefono = str(body.telefono, 30);
  const email = str(body.email, 150);
  const servicio = str(body.servicio, 60);
  const plan = str(body.plan, 40);
  const mensaje = str(body.mensaje, 2000);
  const pais = str(body.pais, 20);

  // Formulario corto: solo nombre y teléfono son obligatorios.
  if (!nombre || !telefono) {
    return json({ success: false, error: "Faltan campos requeridos." }, 400);
  }
  if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return json({ success: false, error: "Email inválido." }, 400);
  }

  // Plain text (no parse_mode) — user fields can't inject Telegram markup.
  const message = [
    "🆕 NUEVO LEAD — ZENTPIPER",
    "",
    `🧩 Servicio: ${servicio || "No especificado"}${plan ? ` · Plan ${plan}` : ""}`,
    `👤 Nombre: ${nombre}`,
    `📱 WhatsApp: ${telefono}`,
    `📧 Email: ${email || "—"}`,
    `🌎 País (precios): ${pais || "No especificado"}`,
    `💬 Mensaje: ${mensaje || "—"}`,
    "",
    `📅 ${new Date().toLocaleString("es-PE", { timeZone: "America/Lima" })}`,
  ].join("\n");

  try {
    const r = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text: message }),
    });
    const data = await r.json();
    if (data.ok) return json({ success: true });

    console.error("send-telegram: Telegram rejected message:", data.description);
    return json({ success: false, error: "No se pudo enviar." }, 502);
  } catch (error) {
    console.error("send-telegram error:", error);
    return json({ success: false, error: "Error interno." }, 500);
  }
}
