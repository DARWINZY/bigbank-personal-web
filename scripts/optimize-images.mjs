// Builds resized WebP copies of every image in public/images for the custom next/image
// loader (src/lib/image-loader.ts). Runs before `next build`; output in public/_img is
// a build artifact and is not committed.
//
//   public/images/projects/jwc14.jpg  →  public/_img/<width>/images/projects/jwc14.jpg.webp
//   (the original extension stays in the name so profile.png and profile.jpg don't collide)
import sharp from 'sharp';
import { mkdir, readdir, stat } from 'node:fs/promises';
import { readFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';

// Shared with next.config.ts and src/lib/image-loader.ts
const { device, image } = JSON.parse(readFileSync(new URL('../src/lib/image-widths.json', import.meta.url), 'utf8'));
const WIDTHS = [...image, ...device].sort((a, b) => a - b);
const SRC_DIR = 'public/images';
const OUT_DIR = 'public/_img';
const RASTER = /\.(jpe?g|png|webp)$/i;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else if (RASTER.test(entry.name)) yield path;
  }
}

async function isFresh(out, srcMtime) {
  try {
    return (await stat(out)).mtimeMs >= srcMtime;
  } catch {
    return false;
  }
}

let written = 0;
let skipped = 0;
const started = Date.now();

for await (const file of walk(SRC_DIR)) {
  const rel = relative('public', file).replace(/\\/g, '/');
  const outs = WIDTHS.map((w) => ({ w, path: join(OUT_DIR, String(w), `${rel}.webp`) }));
  const srcMtime = (await stat(file)).mtimeMs;
  const todo = [];
  for (const o of outs) (await isFresh(o.path, srcMtime)) ? skipped++ : todo.push(o);
  if (!todo.length) continue;

  // Decode the (possibly huge) original once, then derive every size from a 1600px base.
  // rotate() bakes in EXIF orientation, which is dropped from the output.
  const base = await sharp(file).rotate().resize({ width: 1600, withoutEnlargement: true }).toBuffer();
  for (const { w, path } of todo) {
    await mkdir(dirname(path), { recursive: true });
    await sharp(base).resize({ width: w, withoutEnlargement: true }).webp({ quality: 76 }).toFile(path);
    written++;
  }
}

console.log(`optimize-images: ${written} written, ${skipped} up to date (${((Date.now() - started) / 1000).toFixed(1)}s)`);
