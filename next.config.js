const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

// momenttune.com/moti/… 에 정적 파일로 올린다(브리프 §2-6 · §5-2) — 카페는 /moti/cafe.
// Vercel 은 확인용 프리뷰라 루트에서 연다(artbox-sage.vercel.app/cafe) — Vercel 빌드에는 VERCEL=1 이 있다.
const basePath = process.env.VERCEL ? '' : '/moti';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
  transpilePackages: ['framer-motion'],
  experimental: {
    optimizePackageImports: ['framer-motion', 'p5']
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
};

module.exports = withBundleAnalyzer(nextConfig);