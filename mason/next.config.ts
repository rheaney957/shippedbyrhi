// next.config.ts
import type {NextConfig} from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  basePath: '/mason',
  output: 'export',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
      },
    ],
  },
  turbopack: {
    // Force Turbopack to recognize the current folder as the root
    root: path.resolve(process.cwd()),
  },
}

export default nextConfig
