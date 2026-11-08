import { decorPlaceholder, djPlaceholder, type DjKind, type Img } from './images';

export interface GalleryItem extends Img {
  id: string;
  brand: 'decor' | 'dj';
  /** decor: english-weddings | punjabi-weddings | jaago-nights | birthdays | engagements | haldi-mehndi | other-events
   *  dj: dj-setups | atmosphere | weddings | dance-floors | performances */
  category: string;
  /** extra keys that let an item also appear on pages like receptions / custom-decorations */
  tags?: string[];
  alt: string;
  caption?: string;
}

/**
 * ADDING REAL PHOTOS
 * 1. Copy your photo into /public/images/gallery/ (e.g. punjabi-stage-01.jpg)
 * 2. Add or edit an entry below:
 *    { id: 'p1', brand: 'decor', category: 'punjabi-weddings', src: '/images/gallery/punjabi-stage-01.jpg',
 *      width: 1600, height: 1067, alt: 'Punjabi wedding stage with marigold florals' }
 * Write a short, descriptive `alt` for every photo (helps accessibility and SEO).
 */
const decor = (
  id: string,
  category: string,
  theme: Parameters<typeof decorPlaceholder>[0],
  n: 1 | 2 | 3 | 4,
  alt: string,
  tags?: string[],
): GalleryItem => ({ id, brand: 'decor', category, tags, alt, ...decorPlaceholder(theme, n) });

const dj = (
  id: string,
  category: string,
  kind: DjKind,
  n: 1 | 2,
  alt: string,
): GalleryItem => ({ id, brand: 'dj', category, alt, ...djPlaceholder(kind, n) });

export const galleryItems: GalleryItem[] = [
  // English weddings
  decor('en-1', 'english-weddings', 'english', 1, 'Placeholder: floral wedding arch styled in ivory and blush'),
  decor('en-2', 'english-weddings', 'english', 2, 'Placeholder: elegant ceremony arch with gold detailing'),
  decor('en-3', 'english-weddings', 'english', 3, 'Placeholder: wedding stage backdrop with soft florals'),
  decor('en-4', 'english-weddings', 'english', 4, 'Placeholder: ceremony entrance styled with florals'),
  // Punjabi weddings
  decor('pj-1', 'punjabi-weddings', 'punjabi', 1, 'Placeholder: Punjabi wedding stage with marigold garlands'),
  decor('pj-2', 'punjabi-weddings', 'punjabi', 2, 'Placeholder: colourful Punjabi wedding backdrop'),
  decor('pj-3', 'punjabi-weddings', 'punjabi', 3, 'Placeholder: Punjabi wedding decor with gold frames'),
  decor('pj-4', 'punjabi-weddings', 'punjabi', 4, 'Placeholder: traditional floral styling for a Punjabi wedding'),
  // Jaago
  decor('jg-1', 'jaago-nights', 'jaago', 1, 'Placeholder: Jaago night lanterns and colourful lighting'),
  decor('jg-2', 'jaago-nights', 'jaago', 2, 'Placeholder: Jaago night hanging decor in burgundy and gold'),
  decor('jg-3', 'jaago-nights', 'jaago', 3, 'Placeholder: Jaago night stage with festive lighting'),
  // Birthdays
  decor('bd-1', 'birthdays', 'birthday', 1, 'Placeholder: birthday balloon arrangement in rose gold tones'),
  decor('bd-2', 'birthdays', 'birthday', 2, 'Placeholder: themed birthday backdrop with balloons'),
  decor('bd-3', 'birthdays', 'birthday', 3, 'Placeholder: cake table decoration with balloons'),
  // Engagements
  decor('eg-1', 'engagements', 'engagement', 1, 'Placeholder: engagement stage with floral arch and rings'),
  decor('eg-2', 'engagements', 'engagement', 2, 'Placeholder: ring ceremony backdrop in rose tones'),
  decor('eg-3', 'engagements', 'engagement', 3, 'Placeholder: engagement welcome setup'),
  // Haldi & Mehndi
  decor('hm-1', 'haldi-mehndi', 'haldi', 1, 'Placeholder: yellow-themed Haldi setup with marigolds'),
  decor('hm-2', 'haldi-mehndi', 'haldi', 2, 'Placeholder: Mehndi ceremony backdrop with colourful florals'),
  decor('hm-3', 'haldi-mehndi', 'haldi', 3, 'Placeholder: Haldi ceremony seating and props'),
  // Other events (+ receptions + custom via tags)
  decor('ot-1', 'other-events', 'other', 1, 'Placeholder: private party decoration in champagne tones'),
  decor('ot-2', 'other-events', 'other', 2, 'Placeholder: anniversary celebration styling'),
  decor('ot-3', 'other-events', 'other', 3, 'Placeholder: corporate event stage decoration'),
  decor('rc-1', 'other-events', 'reception', 1, 'Placeholder: wedding reception styling with gold chandelier details', ['receptions']),
  decor('rc-2', 'other-events', 'reception', 2, 'Placeholder: reception entrance arch', ['receptions']),
  decor('rc-3', 'other-events', 'reception', 3, 'Placeholder: reception stage backdrop', ['receptions']),
  decor('cu-1', 'other-events', 'custom', 1, 'Placeholder: custom themed celebration setup', ['custom-decorations']),
  decor('cu-2', 'other-events', 'custom', 2, 'Placeholder: bespoke backdrop in burgundy and gold', ['custom-decorations']),
  decor('cu-3', 'other-events', 'custom', 3, 'Placeholder: personalised celebration decor', ['custom-decorations']),

  // DJ MAJHAESTIC
  dj('dj-1', 'dj-setups', 'setup', 1, 'Placeholder: DJ setup with turntables and stage lighting'),
  dj('dj-2', 'dj-setups', 'setup', 2, 'Placeholder: DJ booth with equaliser lights'),
  dj('dj-3', 'atmosphere', 'atmosphere', 1, 'Placeholder: event atmosphere with beams of light'),
  dj('dj-4', 'atmosphere', 'atmosphere', 2, 'Placeholder: celebration lighting over the dance floor'),
  dj('dj-5', 'weddings', 'wedding', 1, 'Placeholder: wedding celebration with DJ lighting'),
  dj('dj-6', 'weddings', 'wedding', 2, 'Placeholder: wedding dance floor atmosphere'),
  dj('dj-7', 'dance-floors', 'dancefloor', 1, 'Placeholder: lively dance floor under stage lights'),
  dj('dj-8', 'dance-floors', 'dancefloor', 2, 'Placeholder: crowded dance floor with colourful beams'),
  dj('dj-9', 'performances', 'performance', 1, 'Placeholder: DJ performance with light beams'),
  dj('dj-10', 'performances', 'performance', 2, 'Placeholder: DJ mixing live at an event'),
];

/** Filter chips for the Decorations page and Gallery page */
export const decorGalleryFilters = [
  { id: 'all', label: 'All', match: [] as string[] },
  { id: 'english-weddings', label: 'English Weddings', match: ['english-weddings'] },
  { id: 'punjabi-weddings', label: 'Punjabi Weddings', match: ['punjabi-weddings'] },
  { id: 'jaago-nights', label: 'Jaago', match: ['jaago-nights'] },
  { id: 'birthdays', label: 'Birthdays', match: ['birthdays'] },
  { id: 'engagements', label: 'Engagements', match: ['engagements'] },
  { id: 'haldi-mehndi', label: 'Haldi & Mehndi', match: ['haldi-mehndi'] },
  { id: 'other-events', label: 'Other Events', match: ['other-events'] },
];

/** Gallery page sub-categories (spec naming) */
export const decorGalleryPageFilters = [
  { id: 'all', label: 'All', match: [] as string[] },
  { id: 'weddings', label: 'Weddings', match: ['english-weddings'] },
  { id: 'punjabi', label: 'Punjabi Weddings', match: ['punjabi-weddings'] },
  { id: 'jaago', label: 'Jaago Nights', match: ['jaago-nights'] },
  { id: 'birthdays', label: 'Birthdays', match: ['birthdays'] },
  { id: 'engagements', label: 'Engagements', match: ['engagements'] },
  { id: 'other', label: 'Other Decorations', match: ['haldi-mehndi', 'other-events'] },
];

export const djGalleryFilters = [
  { id: 'all', label: 'All', match: [] as string[] },
  { id: 'dj-setups', label: 'DJ Setups', match: ['dj-setups'] },
  { id: 'atmosphere', label: 'Event Atmosphere', match: ['atmosphere'] },
  { id: 'weddings', label: 'Wedding Celebrations', match: ['weddings'] },
  { id: 'dance-floors', label: 'Dance Floors', match: ['dance-floors'] },
  { id: 'performances', label: 'DJ Performances', match: ['performances'] },
];

export function filterGallery(items: GalleryItem[], match: string[]): GalleryItem[] {
  if (match.length === 0) return items;
  return items.filter((i) => match.includes(i.category));
}

/** Items for a decoration category page (matches category or tag) */
export function galleryForKey(key: string): GalleryItem[] {
  return galleryItems.filter((i) => i.brand === 'decor' && (i.category === key || i.tags?.includes(key)));
}
