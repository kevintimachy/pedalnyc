/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      '@mui/material/styles': require.resolve('@mui/material/node/styles/index.js'),
    };
    return config;
  },
}

module.exports = nextConfig
