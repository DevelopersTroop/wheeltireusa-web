import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
  images: {
    loader: 'default',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: '4520456.app.netsuite.com',
        port: '',
        pathname: '/core/media/media.nl**',
      },
      {
        protocol: 'https',
        hostname: 'dqr3i089ew1e2.cloudfront.net',
      },
      {
        protocol: 'http',
        hostname: 'dqr3i089ew1e2.cloudfront.net',
      },
      {
        protocol: 'https',
        hostname: 'd2h3hy59ya8zj.cloudfront.net',
      },
      {
        protocol: 'http',
        hostname: 'd2h3hy59ya8zj.cloudfront.net',
      },
      {
        protocol: 'https',
        hostname: 'www.google.co.uk',
      },
      {
        protocol: 'http',
        hostname: 'www.google.co.uk',
      },
      {
        protocol: 'https',
        hostname: 'd3pl580m833nyd.cloudfront.net',
      },
      {
        protocol: 'https',
        hostname: '4520456.app.netsuite.com',
      },
    ],
  },
  rewrites: async () => {
    return [
      {
        source: '/sitemap.xml', // The URL you want
        destination: '/api/sitemap', // The actual route (mapped to your `route.ts`)
      },
    ];
  },
};

export default nextConfig;
