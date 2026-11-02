const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  // momenttune.com/moti/… 에 정적 파일로 올린다(브리프 §2-6 · §5-2) — 카페는 /moti/cafe
  output: 'export',
  basePath: '/moti',
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