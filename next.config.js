/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
    formats: ['image/avif', 'image/webp'],
    unoptimized: true,
  },
  webpack: (config) => {
    config.externals = [...config.externals, { canvas: 'canvas' }];
    return config;
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['react-icons'],
  },
  // Ensure proper page rendering
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  poweredByHeader: false,
  compress: true,
  // Netlify specific
  target: 'server',
  distDir: '.next',
  assetPrefix: process.env.NODE_ENV === 'production' ? '.' : '',
}

module.exports = nextConfig 