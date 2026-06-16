import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  output: 'export',
  // ไม่ต้องใช้ basePath แล้วเพราะเราใช้ Custom Domain (bigbank.nightbears.co)
  images: {
    unoptimized: true,
  },
};

export default withNextIntl(nextConfig);
