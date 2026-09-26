const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const src = path.join(__dirname, '..', 'public', 'icons', 'image.png');
const outDir = path.join(__dirname, '..', 'public', 'icons');

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

if (!fs.existsSync(src)) {
  console.error('Source image not found:', src);
  process.exit(1);
}

(async () => {
  try {
    for (const s of sizes) {
      const out = path.join(outDir, `icon-${s}x${s}.png`);
      await sharp(src)
        .resize(s, s, { fit: 'cover' })
        .png({ quality: 90 })
        .toFile(out);
      console.log('Written', out);
    }
    console.log('All icons generated.');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
