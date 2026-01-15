import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    TMDB_BASE_URL: process.env.TMDB_BASE_URL ?? "",
    TMDB_API_TOKEN: process.env.TMDB_API_TOKEN ?? "",
  },

  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        pathname: "/t/p/**", 
      },
    ],
  },
};

export default nextConfig;
