/** @type {import('next').NextConfig} */
const nextConfig = {
  // Rasm domenlaridan yuklanishga ruxsat (api.uza.uz rasmlar)
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "api.uza.uz" },
      { protocol: "https", hostname: "uza.uz" },
      { protocol: "https", hostname: "media.api-sports.io" },
    ],
  },

  // Ko'p foydalanuvchi uchun HTTP kesh headerlar
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
      {
        // Statik fayllar — 1 yil kesh
        source: "/_next/static/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
