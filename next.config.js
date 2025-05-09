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
}

module.exports = nextConfig 