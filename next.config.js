/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    API_WS_ENDPOINT: process.env.API_WS_ENDPOINT,
    API_ENDPOINT: process.env.API_ENDPOINT,
    API_KEY: process.env.API_KEY,
  },
  
 
}

module.exports = nextConfig
