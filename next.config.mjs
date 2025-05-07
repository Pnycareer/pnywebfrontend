/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['api.pnytrainings.com', 'pnywebfrontend.vercel.app'],
      formats: ['image/avif', 'image/webp'],
      minimumCacheTTL: 60,
    },
    async headers() {
      return [
        {
          source: "/(.*)",
          headers: [
            {
              key: "Cache-Control",
              value: "no-store, no-cache, must-revalidate, proxy-revalidate",
            },
            {
              key: "X-Content-Type-Options",
              value: "nosniff",
            },
            {
              key: "X-Frame-Options",
              value: "DENY",
            },
            {
              key: "X-XSS-Protection",
              value: "1; mode=block",
            },
          ],
        },
      ];
    },
    async redirects() {
      return [
        {
          source: '/uploads/:path*',
          destination: 'https://api.pnytrainings.com/uploads/:path*',
          permanent: true,
        },
      ];
    },
    reactStrictMode: true,
  };
  
  export default nextConfig;
  