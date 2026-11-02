const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // The fixture contains deliberately invalid ARIA/HTML; never fail the build over it.
  typescript: { ignoreBuildErrors: true },
  reactStrictMode: true,
  distDir: process.env.NEXT_DIST_DIR || '.next',
  // Static export for GitHub Pages only (PAGES_EXPORT=1); local `next start` needs the normal build.
  ...(process.env.PAGES_EXPORT === '1' ? { output: 'export', basePath, trailingSlash: true, images: { unoptimized: true } } : {}),
};

export default nextConfig;
