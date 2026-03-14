/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
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
