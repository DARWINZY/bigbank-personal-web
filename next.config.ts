import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
import imageWidths from './src/lib/image-widths.json';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: isProd ? 'export' : undefined,
  // ไม่ต้องใช้ basePath แล้วเพราะเราใช้ Custom Domain (bigbank.nightbears.co)
  // Static export has no image server: scripts/optimize-images.mjs pre-builds these widths
  // and src/lib/image-loader.ts points next/image at them (all three read image-widths.json)
  images: {
    loader: 'custom',
    loaderFile: './src/lib/image-loader.ts',
    deviceSizes: imageWidths.device,
    imageSizes: imageWidths.image,
  },
  trailingSlash: true,
  experimental: {
    // app/global-not-found.tsx: the 404 can't come from [locale]/layout (a dynamic root layout)
    globalNotFound: true,
  },
};

export default withNextIntl(nextConfig);
