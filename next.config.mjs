/** @type {import('next').NextConfig} */
export default {
  reactStrictMode: true,
  // AVIF first (smallest), WebP fallback: lighter photos, faster first paint on mobile data
  images: { formats: ["image/avif", "image/webp"] },
  async redirects() {
    return [
      { source: "/", destination: "/sq", permanent: true },
      // unknown paths without a language (and without a file extension, so images/robots/sitemap stay untouched)
      // go to the Albanian site, where they show the branded 404
      { source: "/:path((?!sq(?:/|$)|en(?:/|$)|_next(?:/|$))[^.]*)", destination: "/sq/:path", permanent: false },
    ];
  },
};
