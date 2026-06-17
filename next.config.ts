import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: isProd ? 'export' : undefined,
  // ไม่ต้องใช้ basePath แล้วเพราะเราใช้ Custom Domain (bigbank.nightbears.co)
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default withNextIntl(nextConfig);
