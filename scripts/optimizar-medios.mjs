// Genera los medios optimizados de public/media a partir de assets-src/.
// Uso: FFMPEG=/ruta/a/ffmpeg node scripts/optimizar-medios.mjs
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
// Desktop: 1280x720 sin audio. Móvil: recorte vertical 9:16 centrado.
async function videos() {
  if (!FFMPEG) return console.log("· FFMPEG no definido: se omiten videos");
  for (const file of readdirSync(join(SRC, "videos"))) {
    const name = basename(file, extname(file));
    const input = join(SRC, "videos", file);
    const common = ["-an", "-c:v", "libx264", "-preset", "veryslow", "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-y"];
    execFileSync(FFMPEG, ["-v", "error", "-i", input, "-vf", "scale=1280:720", "-crf", "30", ...common, join(OUT, `${name}.mp4`)]);
    execFileSync(FFMPEG, ["-v", "error", "-i", input, "-vf", "crop=ih*9/16:ih,scale=540:960", "-crf", "31", ...common, join(OUT, `${name}-m.mp4`)]);

    // Póster = primer frame, para que el cambio póster → video no se note.
    const frame = join(tmpdir(), `${name}-frame.png`);
    execFileSync(FFMPEG, ["-v", "error", "-y", "-i", input, "-frames:v", "1", frame]);
    await webp(sharp(frame).resize(1600, 900), 62).toFile(join(OUT, `${name}-poster.webp`));
    await webp(sharp(frame).extract({ left: 437, top: 0, width: 405, height: 720 }).resize(720, 1280), 55).toFile(join(OUT, `${name}-poster-m.webp`));
    rmSync(frame);
    console.log(`✓ video ${name}`);
  }
}

// ── Capturas del portafolio: 16:10, ancla arriba ────────────────
async function proyectos() {
  for (const file of readdirSync(join(SRC, "proyectos"))) {
    const name = basename(file, extname(file));
    const src = sharp(join(SRC, "proyectos", file));
    for (const w of [480, 800]) {
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
  for (const [name, box] of Object.entries(recortes)) {
    await webp(sharp(join(SRC, "equipo", `${name}.png`)).extract(box).resize(480, 600), 74).toFile(join(OUT, `e-${name}.webp`));
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
      <text x="80" y="250" font-family="Segoe UI, Arial, sans-serif" font-size="92" font-weight="800" fill="#ffffff">Webs y apps</text>
      <text x="80" y="350" font-family="Segoe UI, Arial, sans-serif" font-size="92" font-weight="800" fill="#F3A523">que venden.</text>
      <text x="80" y="450" font-family="Segoe UI, Arial, sans-serif" font-size="36" fill="#d4d4d8">Diseño web desde S/ 500 · Perú y Rusia</text>
      <text x="80" y="530" font-family="Segoe UI, Arial, sans-serif" font-size="34" font-weight="700" letter-spacing="6" fill="#ffffff">ZENTPIPER</text>
    </svg>`);
  const mark = await sharp(logo).resize(300, 300).png().toBuffer();
  await sharp(og).composite([{ input: mark, left: 840, top: 150 }]).jpeg({ quality: 82, mozjpeg: true }).toFile("public/og.jpg");
  console.log("✓ marca");
}

await videos();
await proyectos();
await equipo();
await marca();
