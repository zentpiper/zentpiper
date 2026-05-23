// Generate favicon from logo
// Run: node generate-favicon.js

import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const inputPath = join(__dirname, 'public', 'logo.webp');

async function generateFavicons() {
  try {
    // 48x48 PNG favicon (Google Search requirement)
    await sharp(inputPath)
      .resize(48, 48, { fit: 'contain', background: { r: 18, g: 18, b: 18, alpha: 1 } })
      .png()
      .toFile(join(__dirname, 'public', 'favicon-48x48.png'));
    console.log('✅ favicon-48x48.png');

    // 32x32 PNG
    await sharp(inputPath)
      .resize(32, 32, { fit: 'contain', background: { r: 18, g: 18, b: 18, alpha: 1 } })
      .png()
      .toFile(join(__dirname, 'public', 'favicon-32x32.png'));
    console.log('✅ favicon-32x32.png');

    // 16x16 PNG
    await sharp(inputPath)
      .resize(16, 16, { fit: 'contain', background: { r: 18, g: 18, b: 18, alpha: 1 } })
      .png()
      .toFile(join(__dirname, 'public', 'favicon-16x16.png'));
    console.log('✅ favicon-16x16.png');

    // 180x180 Apple Touch Icon
    await sharp(inputPath)
      .resize(180, 180, { fit: 'contain', background: { r: 18, g: 18, b: 18, alpha: 1 } })
      .png()
      .toFile(join(__dirname, 'public', 'apple-touch-icon.png'));
    console.log('✅ apple-touch-icon.png');

    // 192x192 for PWA/Android
    await sharp(inputPath)
      .resize(192, 192, { fit: 'contain', background: { r: 18, g: 18, b: 18, alpha: 1 } })
      .png()
      .toFile(join(__dirname, 'public', 'favicon-192x192.png'));
    console.log('✅ favicon-192x192.png');

    // favicon.ico (48x48 PNG renamed - modern browsers accept PNG as .ico)
    await sharp(inputPath)
      .resize(48, 48, { fit: 'contain', background: { r: 18, g: 18, b: 18, alpha: 1 } })
      .png()
      .toFile(join(__dirname, 'public', 'favicon.ico'));
    console.log('✅ favicon.ico');

    console.log('\n🎉 Todos los favicons generados en /public/');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

generateFavicons();
