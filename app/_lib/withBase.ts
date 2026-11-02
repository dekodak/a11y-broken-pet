/** Prefix for plain <a>/<img> URLs, which Next's basePath does not rewrite (set when hosted under a sub-path, e.g. GitHub Pages). */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export const withBase = (path: string) => `${basePath}${path}`;
