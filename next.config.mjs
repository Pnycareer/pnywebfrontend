/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.pnytrainings.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.pnytrainings.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "api.pnytrainings.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
