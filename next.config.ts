import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Sanity'ye yüklenen görseller
      { protocol: "https", hostname: "cdn.sanity.io", pathname: "/images/ssg8wqv9/**" },
      // Yedek (fallback) içerikteki placeholder görseller
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
  },
};

export default nextConfig;
