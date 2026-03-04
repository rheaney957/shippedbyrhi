// next.config.ts
import type {NextConfig} from 'next'
import path from 'path'

const nextConfig: NextConfig = {
    basePath: '',           // leave empty if using subdomain (mason.shippedbyrhi.com)
    assetPrefix: '',        // leave empty for subdomain
    reactStrictMode: true,  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
      },
    ],
    unoptimized: true,
  },
  turbopack: {
    root: path.resolve(process.cwd()),
  },
}

export default nextConfig
