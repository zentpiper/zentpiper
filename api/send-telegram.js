const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// Trim to a string and cap its length; non-strings become "".
const str = (v, max) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  if (!TELEGRAM_BOT_TOKEN || !CHAT_ID) {
    console.error("send-telegram: TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID not configured");
    return res.status(500).json({ success: false, error: "Server not configured" });
  }

  const body = req.body || {};
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
    return res.status(400).json({ success: false, error: "Faltan campos requeridos." });
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return res.status(400).json({ success: false, error: "Email inválido." });
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
    if (data.ok) return res.status(200).json({ success: true });

    console.error("send-telegram: Telegram rejected message:", data.description);
    return res.status(502).json({ success: false, error: "No se pudo enviar." });
  } catch (error) {
    console.error("send-telegram error:", error);
    return res.status(500).json({ success: false, error: "Error interno." });
  }
}
