/**
 * Generates public/sitemap.xml and public/robots.txt from the real route list.
 * Runs automatically before `npm run build`.
 * Set your domain with the VITE_SITE_URL environment variable (or siteUrl in src/config/business.ts).
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { businessConfig } from '../src/config/business';
import { decorCategories } from '../src/data/decorations';
import { rentalItems } from '../src/data/rentals';

const PLACEHOLDER = 'https://YOUR-DOMAIN.com';
const configured = (process.env.VITE_SITE_URL || businessConfig.siteUrl || '').replace(/\/$/, '');
const origin = configured || PLACEHOLDER;

const paths = [
  '/',
  '/decorations',
  ...decorCategories.map((c) => `/decorations/${c.slug}`),
  '/dj',
  '/dj/book',
  '/rentals',
  ...rentalItems.map((r) => `/rentals/${r.slug}`),
  '/gallery',
  '/about',
  '/contact',
  '/quote',
];

const today = new Date().toISOString().slice(0, 10);
const urls = paths
  .map((p) => `  <url>\n    <loc>${origin}${p}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`)
  .join('\n');

const note = configured
  ? ''
  : '<!-- SET VITE_SITE_URL and rebuild: the domain below is a placeholder. -->\n';
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n${note}<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
const robots = `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`;

const pub = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');
mkdirSync(pub, { recursive: true });
writeFileSync(join(pub, 'sitemap.xml'), sitemap);
writeFileSync(join(pub, 'robots.txt'), robots);

console.log(`SEO files written for ${paths.length} URLs (${origin}).`);
if (!configured) {
  console.warn('WARNING: VITE_SITE_URL is not set — sitemap.xml and robots.txt use a placeholder domain. Set it before deploying.');
}
