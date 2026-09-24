import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Placeholder görseller Unsplash'ten geliyor. Gerçek fotoğraflar /public altına
    // eklendiğinde bu kalıp kaldırılabilir.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
  },
};

export default nextConfig;
