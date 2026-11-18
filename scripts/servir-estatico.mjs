// Servidor estático para medir con Lighthouse (`npm run servir`). Imita los assets de
// Cloudflare/Vercel:
// gzip, /ruta -> ruta/index.html, /ruta/ -> 307 /ruta, 404.html con status 404,
// _redirects simples. Lee los archivos en cada petición (no bloquea build/client).
import { createServer } from "node:http";
import { readFileSync, existsSync, statSync } from "node:fs";
import { join, extname } from "node:path";
import { gzipSync } from "node:zlib";

const ROOT = process.argv[2] || "build/client";
const PORT = Number(process.argv[3] || 8788);
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".woff2": "font/woff2", ".mp4": "video/mp4", ".xml": "application/xml", ".txt": "text/plain" };
const file = (p) => existsSync(p) && statSync(p).isFile();

createServer((req, res) => {
  const path = decodeURIComponent(new URL(req.url, "http://x").pathname);
  const redirects = file(join(ROOT, "_redirects"))
    ? Object.fromEntries(readFileSync(join(ROOT, "_redirects"), "utf8").split("\n").filter((l) => l && !l.startsWith("#")).map((l) => l.trim().split(/\s+/)))
    : {};
  if (redirects[path]) { res.writeHead(301, { Location: redirects[path] }); return res.end(); }
  if (path.length > 1 && path.endsWith("/")) { res.writeHead(307, { Location: path.slice(0, -1) }); return res.end(); }
  let target = join(ROOT, path);
  let status = 200;
  if (!file(target)) target = join(ROOT, path, "index.html");
  if (!file(target)) { target = join(ROOT, "404.html"); status = 404; }
  const type = TYPES[extname(target)] || "application/octet-stream";
  let body = readFileSync(target);
  const headers = { "Content-Type": type };
  if (path.startsWith("/assets/")) headers["Cache-Control"] = "public, max-age=31536000, immutable";
  else if (path.startsWith("/media/")) headers["Cache-Control"] = "public, max-age=2592000";
  else if (path === "/logo.svg" || path.startsWith("/favicon")) headers["Cache-Control"] = "public, max-age=604800";
  if (/text|javascript|json|xml|svg/.test(type) && /gzip/.test(req.headers["accept-encoding"] || "")) {
    body = gzipSync(body);
    headers["Content-Encoding"] = "gzip";
  }
  headers["Content-Length"] = body.length;
  res.writeHead(status, headers);
  res.end(body);
}).listen(PORT, "127.0.0.1", () => console.log(`sirviendo ${ROOT} en http://127.0.0.1:${PORT}`));
