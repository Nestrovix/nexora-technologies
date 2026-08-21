/**
 * Static-export image loader.
 *
 * `output: 'export'` cannot use the Next image optimiser, and an `unoptimized`
 * image skips basePath entirely — which broke every photograph when the site is
 * bundled under a sub-path (BASE_PATH=/work/nexora). This loader returns the
 * file as-is, with the base path applied, so the export works from the root and
 * from a sub-path alike. Only the static build uses it; the Node build keeps the
 * normal optimiser.
 */
export default function staticImageLoader({ src }) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
  if (!src.startsWith('/') || (base && src.startsWith(`${base}/`))) return src;
  return `${base}${src}`;
}
