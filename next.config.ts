// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   env: {
//     TMDB_BASE_URL: process.env.TMDB_BASE_URL ?? "",
//     TMDB_API_TOKEN: process.env.TMDB_API_TOKEN ?? "",
//   },

//   reactCompiler: true,

//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "image.tmdb.org",
//         pathname: "/t/p/**",
//       },
//       {
//         protocol: "https",
//         hostname: "myanimelist.net",
//         pathname: "/**",
//       },
//       {
//         protocol: "https",
//         hostname: "cdn.myanimelist.net",
//         pathname: "/**",
//       },
//     ],
//   },
// };

// export default nextConfig;


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
      {
        protocol: "https",
        hostname: "myanimelist.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.myanimelist.net",
        pathname: "/**",
      },
      // --- MangaDex-ийн тохиргоог энд нэмлээ ---
      {
        protocol: "https",
        hostname: "uploads.mangadex.org",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.mangadex.network",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;