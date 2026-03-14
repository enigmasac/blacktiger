/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "blacktiger.pe",
        pathname: "/wp-content/**",
      },
    ],
  },
};

export default nextConfig;
