module.exports = {
  basePath: '/app',
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://snave-api.onrender.com/api/:path*'
      }
    ]
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextConfig;
