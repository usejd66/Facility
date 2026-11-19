/** @type {import('next').NextConfig} */
export default {
  reactStrictMode: true,
  // AVIF first (smallest), WebP fallback: lighter photos, faster first paint on mobile data
  images: { formats: ["image/avif", "image/webp"] },
  async redirects() {
    return [{ source: "/", destination: "/sq", permanent: true }];
  },
};
