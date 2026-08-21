/** @type {import('next').NextConfig} */
const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
];

/**
 * STATIC_EXPORT=1 produces a plain-HTML build in `out/` (no Node server needed).
 * In that mode the API routes are excluded and the forms run in preview mode —
 * see README "Static export" for how to connect a real form endpoint.
 */
const isStatic = process.env.STATIC_EXPORT === '1';
/** Serve the export from a sub-path (used when bundling into the Nestrovix work index). */
const basePath = process.env.BASE_PATH || '';

const nextConfig = {
  ...(isStatic ? { output: 'export', trailingSlash: true } : {}),
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  env: {
    /** Exposed so the static image loader can re-apply the base path. */
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    /**
     * The static export serves the original files through a custom loader
     * rather than `unoptimized`, because an unoptimized image ignores
     * `basePath` and 404s when the site is bundled under a sub-path.
     */
    ...(isStatic
      ? { loader: 'custom', loaderFile: './src/lib/image-loader.js' }
      : { formats: ['image/avif', 'image/webp'] }),
    deviceSizes: [360, 480, 640, 768, 1024, 1280, 1536, 1920],
  },
  ...(isStatic
    ? {}
    : {
        async headers() {
          return [{ source: '/:path*', headers: securityHeaders }];
        },
      }),
};

export default nextConfig;
