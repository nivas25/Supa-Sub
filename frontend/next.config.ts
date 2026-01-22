import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // Google Avatars
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com", // Github Avatars
      },
      {
        protocol: "https",
        hostname: "zjinaalsyovfwnaxbozy.supabase.co", // <--- ADD YOUR SUPABASE URL
      },
    ],
  },
};

export default nextConfig;
