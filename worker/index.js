// Trim to a string and cap its length; non-strings become "".
const str = (v, max) => (typeof v === "string" ? v.trim().slice(0, max) : "");

const json = (data, status = 200) =>
  Response.json(data, { status });

async function handleSendTelegram(request, env) {
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

  const tipoProyecto = str(body.tipoProyecto, 60);
  const nombre = str(body.nombre, 100);
  const empresa = str(body.empresa, 120);
  const email = str(body.email, 150);
  const telefono = str(body.telefono, 30);
  const inversion = str(body.inversion, 40);
  const tiempo = str(body.tiempo, 40);
  const descripcion = str(body.descripcion, 2000);
  const pais = str(body.pais, 20);
  const moneda = str(body.moneda, 10);
  const requiereNDA = !!body.requiereNDA;

  if (!nombre || !email || !telefono || !descripcion) {
    return json({ success: false, error: "Faltan campos requeridos." }, 400);
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return json({ success: false, error: "Email inválido." }, 400);
  }

  // Plain text (no parse_mode) — user fields can't inject Telegram markup.
  const message = [
    "🆕 NUEVO DIAGNÓSTICO TÉCNICO — ZENTPIPER",
    "",
    `🧩 Tipo de Requerimiento: ${tipoProyecto || "No especificado"}`,
    `👤 Nombre: ${nombre}`,
    `🏢 Empresa/Cargo: ${empresa || "No especificada"}`,
    `📧 Email: ${email}`,
    `📱 Teléfono: ${telefono}`,
    `🌎 País: ${pais || "No especificado"}`,
    `💵 Inversión estimada: ${inversion || "No especificada"} ${moneda || ""}`.trim(),
    `⏱️ Tiempo estimado: ${tiempo || "No especificado"}`,
    `🔒 NDA requerido: ${requiereNDA ? "Sí" : "No"}`,
    `💬 Desafío/Alcance: ${descripcion}`,
    "",
    `📅 Fecha: ${new Date().toLocaleString("es-PE", { timeZone: "America/Lima" })}`,
  ].join("\n");

  try {
    const r = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: CHAT_ID, text: message }),
      },
    );
    const data = await r.json();
    if (data.ok) return json({ success: true });

    console.error("send-telegram: Telegram rejected message:", data.description);
    return json({ success: false, error: "No se pudo enviar." }, 502);
  } catch (error) {
    console.error("send-telegram error:", error);
    return json({ success: false, error: "Error interno." }, 500);
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/send-telegram") {
      return handleSendTelegram(request, env);
    }

    return new Response("Not found", { status: 404 });
  },
};
