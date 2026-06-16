import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const isGithubActions = process.env.GITHUB_ACTIONS || false;
const repo = 'bigbank-personal-web';
const basePath = isGithubActions ? `/${repo}` : '';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: basePath,
  images: {
    unoptimized: true,
  },
};

export default withNextIntl(nextConfig);
