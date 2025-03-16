/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.pnytrainings.com",
        pathname: "/uploads/images/webbanner/**",
      },
      {
        protocol: "https",
        hostname: "api.pnytrainings.com",
        pathname: "/uploads/images/instructors/**",
      },
      {
        protocol: "https",
        hostname: "api.pnytrainings.com",
        pathname: "/uploads/images/subcourseimage/**",
      },
      {
        protocol: "https",
        hostname: "www.locklizard.com",
        pathname: "/wp-content/uploads/2023/04/dmca-protected.png", // ✅ Allow DMCA Protected Image
      },
    ],
  },
};

export default nextConfig;
