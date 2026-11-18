// Genera los medios optimizados de public/media a partir de assets-src/.
// Uso: FFMPEG=/ruta/a/ffmpeg node scripts/optimizar-medios.mjs [videos|fotos|proyectos|equipo|marca…]
// (sin FFMPEG solo procesa imágenes). Los resultados se versionan; no corre en build.
import { execFileSync } from "node:child_process";
import { mkdirSync, readdirSync, rmSync } from "node:fs";
import { basename, extname, join } from "node:path";
import { tmpdir } from "node:os";
import sharp from "sharp";

const SRC = "assets-src";
const OUT = "public/media";
const FFMPEG = process.env.FFMPEG;

mkdirSync(OUT, { recursive: true });
const webp = (img, quality = 72) => img.webp({ quality, effort: 6 });

// ── Videos del hero ─────────────────────────────────────────────
// Clips reales de Pexels (licencia libre, sin atribución obligatoria):
//   cliente-celular  → pexels.com/video/7172107  (MART PRODUCTION)
//   mensaje-whatsapp → pexels.com/video/10374923 (RDNE Stock project)
//   empacando-pedido → pexels.com/video/7855446  (Kampus Production)
// `desde`/`dura`: tramo en segundos. `x`: inicio del recorte vertical móvil
// (en px sobre 1280x720) para que la persona quede centrada.
// Retoque: un poco menos de saturación y tono cálido (va con el dorado de la marca).
const CLIPS = [
  { nombre: "cliente-celular", desde: 2, dura: 7, x: 400 },
  { nombre: "mensaje-whatsapp", desde: 0, dura: 7, x: 420 },
  { nombre: "empacando-pedido", desde: 0, dura: 7, x: 380 },
];
const GRADO = "eq=saturation=0.82:contrast=1.04:brightness=-0.02,colorbalance=rm=0.04:bm=-0.04";

async function videos() {
  if (!FFMPEG) return console.log("· FFMPEG no definido: se omiten videos");
  const common = ["-an", "-c:v", "libx264", "-preset", "veryslow", "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-y"];
  for (const { nombre, desde, dura, x } of CLIPS) {
    const input = join(SRC, "videos", "pexels", `${nombre}.mp4`);
    const tramo = ["-ss", String(desde), "-t", String(dura), "-i", input];
    execFileSync(FFMPEG, ["-v", "error", ...tramo, "-vf", `scale=1280:720,${GRADO}`, "-crf", "30", ...common, join(OUT, `${nombre}.mp4`)]);
    execFileSync(FFMPEG, ["-v", "error", ...tramo, "-vf", `scale=1280:720,crop=405:720:${x}:0,scale=540:960,${GRADO}`, "-crf", "31", ...common, join(OUT, `${nombre}-m.mp4`)]);

    // Póster = primer frame del tramo ya retocado, para que el cambio póster → video no se note.
    const frame = join(tmpdir(), `${nombre}-frame.png`);
    execFileSync(FFMPEG, ["-v", "error", "-y", "-ss", String(desde), "-i", input, "-vf", `scale=1280:720,${GRADO}`, "-frames:v", "1", frame]);
    await webp(sharp(frame).resize(1600, 900), 62).toFile(join(OUT, `${nombre}-poster.webp`));
    await webp(sharp(frame).extract({ left: x, top: 0, width: 405, height: 720 }).resize(720, 1280), 55).toFile(join(OUT, `${nombre}-poster-m.webp`));
    rmSync(frame);
    console.log(`✓ video ${nombre}`);
  }
}

// ── Fotos de encabezado y de cierre: fotogramas de los mismos clips ──
// 4:3, con el mismo retoque que los videos. `t`: segundo del clip original;
// `left`: inicio del recorte de 960 px de ancho (sobre 1280x720).
const FOTOS = [
  { nombre: "f-planes", clip: "empacando-pedido", t: 4, left: 120 },
  { nombre: "f-mobile", clip: "mensaje-whatsapp", t: 3, left: 200 },
  { nombre: "f-cierre", clip: "cliente-celular", t: 9, left: 160 },
];

async function fotos() {
  if (!FFMPEG) return console.log("· FFMPEG no definido: se omiten fotos de encabezado");
  for (const { nombre, clip, t, left } of FOTOS) {
    const frame = join(tmpdir(), `${nombre}.png`);
    execFileSync(FFMPEG, ["-v", "error", "-y", "-ss", String(t), "-i", join(SRC, "videos", "pexels", `${clip}.mp4`), "-vf", `scale=1280:720,${GRADO}`, "-frames:v", "1", frame]);
    const base = sharp(frame).extract({ left, top: 0, width: 960, height: 720 });
    await webp(base.clone().resize(960, 720), 62).toFile(join(OUT, `${nombre}-960.webp`));
    await webp(base.clone().resize(600, 450), 60).toFile(join(OUT, `${nombre}-600.webp`));
    rmSync(frame);
  }
  console.log("✓ fotos");
}

// ── Capturas del portafolio: 16:10, ancla arriba ────────────────
async function proyectos() {
  for (const file of readdirSync(join(SRC, "proyectos"))) {
    const name = basename(file, extname(file));
    const src = sharp(join(SRC, "proyectos", file));
    // 160: miniatura de "Ejemplo real" en las tarjetas de planes (56 px).
    for (const w of [160, 480, 800]) {
      await webp(src.clone().resize(w, Math.round(w / 1.6), { fit: "cover", position: "top" })).toFile(join(OUT, `p-${name}-${w}.webp`));
    }
  }
  console.log("✓ proyectos");
}

// ── Equipo: retrato 4:5 centrado en la cara ────────────────────
async function equipo() {
  const recortes = {
    "patrick-pozsgai": { left: 254, top: 0, width: 861, height: 1076 },
    "barclay-leach": { left: 0, top: 0, width: 1498, height: 1872 },
  };
  // Cuadrado centrado en la cara, para los avatares del hero.
  const caras = {
    "patrick-pozsgai": { left: 384, top: 40, width: 620, height: 620 },
    "barclay-leach": { left: 420, top: 120, width: 680, height: 680 },
  };
  for (const [name, box] of Object.entries(recortes)) {
    await webp(sharp(join(SRC, "equipo", `${name}.png`)).extract(box).resize(480, 600), 74).toFile(join(OUT, `e-${name}.webp`));
    // Avatar redondo del hero (96 px = 48 px a 2x).
    await webp(sharp(join(SRC, "equipo", `${name}.png`)).extract(caras[name]).resize(96, 96), 70).toFile(join(OUT, `e-${name}-96.webp`));
  }
  console.log("✓ equipo");
}

// ── Marca: favicons + imagen para redes (OG 1200x630) ───────────
async function marca() {
  const logo = join(SRC, "marca", "logo.svg");
  await sharp(logo).resize(32, 32).png().toFile("public/favicon-32.png");
  await sharp(logo).resize(180, 180).flatten({ background: "#0a0a0b" }).png().toFile("public/apple-touch-icon.png");
  await sharp(logo).resize(192, 192).png().toFile("public/icon-192.png");

  const og = Buffer.from(`
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="630" fill="#0a0a0b"/>
      <rect x="0" y="606" width="1200" height="24" fill="#F3A523"/>
      <text x="80" y="240" font-family="Segoe UI, Arial, sans-serif" font-size="70" font-weight="800" fill="#ffffff">Webs que te traen</text>
      <text x="80" y="325" font-family="Segoe UI, Arial, sans-serif" font-size="70" font-weight="800" fill="#F3A523">clientes por WhatsApp.</text>
      <text x="80" y="420" font-family="Segoe UI, Arial, sans-serif" font-size="34" fill="#d4d4d8">Diseño web desde S/ 500 · Lima, Perú</text>
      <text x="80" y="520" font-family="Segoe UI, Arial, sans-serif" font-size="32" font-weight="700" letter-spacing="6" fill="#ffffff">ZENTPIPER</text>
    </svg>`);
  const mark = await sharp(logo).resize(200, 200).png().toBuffer();
  await sharp(og).composite([{ input: mark, left: 940, top: 200 }]).jpeg({ quality: 82, mozjpeg: true }).toFile("public/og.jpg");
  console.log("✓ marca");
}

// Sin argumentos corre todo; con nombres, solo esas partes.
const SOLO = process.argv.slice(2);
for (const [nombre, paso] of Object.entries({ videos, fotos, proyectos, equipo, marca })) {
  if (!SOLO.length || SOLO.includes(nombre)) await paso();
}
