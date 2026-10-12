'use client';

// next/image loader for the static export. Images under /images/ get pre-resized WebP
// copies from scripts/optimize-images.mjs at build time; anything else (static imports,
// external URLs) is served as is.

import imageWidths from './image-widths.json';

// The same widths next.config.ts and scripts/optimize-images.mjs use
const WIDTHS = [...imageWidths.image, ...imageWidths.device].sort((a, b) => a - b);

export default function imageLoader({ src, width }: { src: string; width: number }): string {
  const resizable = /^\/images\/.+\.(jpe?g|png|webp)$/i.test(src);

  // The resized copies only exist in production builds
  if (process.env.NODE_ENV !== 'production' || !resizable) {
    return resizable ? `${src}?w=${width}` : src;
  }

  const w = WIDTHS.find((size) => size >= width) ?? WIDTHS[WIDTHS.length - 1];
  return `/_img/${w}${src}.webp`;
}
