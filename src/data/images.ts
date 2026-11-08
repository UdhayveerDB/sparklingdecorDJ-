/**
 * IMAGE HELPERS
 * -------------
 * Until real photographs are supplied, every image points at a generated placeholder in
 * /public/images/placeholders. To use a real photo, drop it into /public/images/gallery/
 * (or anywhere in /public) and change the `src` of that entry in the data files
 * (gallery.ts, decorations.ts, rentals.ts ...). The "Sample image" tag disappears automatically.
 */
export interface Img {
  src: string;
  width: number;
  height: number;
}

type Theme =
  | 'english' | 'punjabi' | 'jaago' | 'birthday' | 'engagement'
  | 'haldi' | 'other' | 'reception' | 'custom';

const sizeFor: Record<number, [number, number]> = { 1: [1200, 900], 2: [900, 1200], 3: [1200, 900], 4: [1000, 1000] };

/** Decoration placeholder: theme + variant 1-4 */
export function decorPlaceholder(theme: Theme, n: 1 | 2 | 3 | 4 = 1): Img {
  const [width, height] = sizeFor[n];
  return { src: `/images/placeholders/${theme}-${n}.svg`, width, height };
}

export type DjKind = 'setup' | 'atmosphere' | 'wedding' | 'dancefloor' | 'performance';

/** DJ placeholder: kind + variant 1-2 */
export function djPlaceholder(kind: DjKind, n: 1 | 2 = 1): Img {
  const [width, height] = n === 1 ? sizeFor[1] : sizeFor[2];
  return { src: `/images/placeholders/dj-${kind}-${n}.svg`, width, height };
}

export type RentalKind =
  | 'arch' | 'backdrop' | 'florals' | 'centrepiece' | 'table' | 'chair' | 'prop' | 'stand' | 'other';

export function rentalPlaceholder(kind: RentalKind): Img {
  return { src: `/images/placeholders/rental-${kind}.svg`, width: 1000, height: 1000 };
}

/** Prefixes the Vite base path so images work when deployed in a sub-folder. */
export function asset(path: string): string {
  if (/^https?:\/\//.test(path) || path.startsWith('data:')) return path;
  const base = import.meta.env.BASE_URL || '/';
  return `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}

export function isPlaceholder(src: string): boolean {
  return src.includes('/images/placeholders/');
}
