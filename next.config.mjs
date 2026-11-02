/** @type {import('next').NextConfig} */
const nextConfig = {
  // The fixture contains deliberately invalid ARIA/HTML; never fail the build over it.
  typescript: { ignoreBuildErrors: true },
  reactStrictMode: true,
  distDir: process.env.NEXT_DIST_DIR || '.next',
};

export default nextConfig;
