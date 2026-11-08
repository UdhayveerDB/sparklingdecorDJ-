import { rentalPlaceholder, type Img, type RentalKind } from './images';

export type RentalCategoryId =
  | 'wedding' | 'backdrops' | 'arches' | 'floral' | 'centrepieces'
  | 'tables' | 'chairs' | 'props' | 'stands' | 'other';

export interface RentalCategory {
  id: RentalCategoryId;
  label: string;
}

export const rentalCategories: RentalCategory[] = [
  { id: 'wedding', label: 'Wedding Decor' },
  { id: 'backdrops', label: 'Backdrops' },
  { id: 'arches', label: 'Arches' },
  { id: 'floral', label: 'Floral Arrangements' },
  { id: 'centrepieces', label: 'Centrepieces' },
  { id: 'tables', label: 'Tables' },
  { id: 'chairs', label: 'Chairs' },
  { id: 'props', label: 'Event Props' },
  { id: 'stands', label: 'Decorative Stands' },
  { id: 'other', label: 'Other Items' },
];

/** Filter chips shown on the Rentals page ("Tables & Chairs" groups two categories). */
export const rentalFilters: { id: string; label: string; categories: RentalCategoryId[] }[] = [
  { id: 'all', label: 'All Items', categories: [] },
  { id: 'wedding', label: 'Wedding Decor', categories: ['wedding', 'arches', 'floral', 'centrepieces'] },
  { id: 'backdrops', label: 'Backdrops', categories: ['backdrops'] },
  { id: 'props', label: 'Event Props', categories: ['props'] },
  { id: 'tables-chairs', label: 'Tables & Chairs', categories: ['tables', 'chairs'] },
  { id: 'stands', label: 'Stands', categories: ['stands'] },
  { id: 'other', label: 'Other Items', categories: ['other'] },
];

export type Availability = 'on-request' | 'available' | 'limited' | 'unavailable';

export const availabilityLabels: Record<Availability, string> = {
  'on-request': 'Availability on request',
  available: 'Available',
  limited: 'Limited availability',
  unavailable: 'Currently unavailable',
};

export interface RentalItem {
  slug: string;
  name: string;
  category: RentalCategoryId;
  description: string;
  longDescription: string;
  image: Img;
  /** A real price string like '$45 per day', or leave '' to show "Request Price" */
  price: string;
  availability: Availability;
  /** True while this is sample data. Set to false (or delete the item) when you add your real stock. */
  sample: boolean;
}

const sampleLong =
  'Item details such as size, colour options and quantity will be confirmed when you send an enquiry. Tell us your event date and we will confirm availability and pricing.';

const make = (
  slug: string,
  name: string,
  category: RentalCategoryId,
  description: string,
  kind: RentalKind,
): RentalItem => ({
  slug,
  name,
  category,
  description,
  longDescription: `${description} ${sampleLong}`,
  image: rentalPlaceholder(kind),
  price: '',
  availability: 'on-request',
  sample: true,
});

/**
 * SAMPLE INVENTORY — replace with your real items.
 * No prices, quantities or availability have been invented: every item shows "Request Price".
 */
export const rentalItems: RentalItem[] = [
  make('floral-wedding-arch', 'Floral Wedding Arch', 'arches', 'A decorative arch for ceremonies, entrances and photo moments.', 'arch'),
  make('decorative-arch-frame', 'Decorative Arch Frame', 'arches', 'A freestanding frame that can be styled around your theme.', 'arch'),
  make('wedding-stage-backdrop', 'Wedding Stage Backdrop', 'backdrops', 'A statement backdrop for a ceremony stage or sweetheart table.', 'backdrop'),
  make('photo-backdrop-panel', 'Photo Backdrop Panel', 'backdrops', 'A backdrop panel for welcome areas and photo corners.', 'backdrop'),
  make('birthday-backdrop', 'Birthday Backdrop', 'backdrops', 'A cheerful backdrop for birthday and party setups.', 'backdrop'),
  make('artificial-floral-arrangement', 'Artificial Floral Arrangement', 'floral', 'A reusable floral arrangement for tables, entrances and stages.', 'florals'),
  make('floral-wall-panel', 'Floral Wall Panel', 'floral', 'A decorative floral panel to dress a wall or backdrop.', 'florals'),
  make('table-centrepiece', 'Table Centrepiece', 'centrepieces', 'A centrepiece to bring elegance to guest tables.', 'centrepiece'),
  make('wedding-decor-set', 'Wedding Decoration Set', 'wedding', 'Decorative accessories to complement your wedding styling.', 'other'),
  make('round-banquet-table', 'Round Banquet Table', 'tables', 'A round table for dining and reception seating.', 'table'),
  make('cocktail-table', 'Cocktail Table', 'tables', 'A table for welcome areas, cake displays and lounge corners.', 'table'),
  make('event-chair', 'Event Chair', 'chairs', 'A chair for ceremonies, receptions and private events.', 'chair'),
  make('couple-seating', 'Couple Seating', 'chairs', 'Statement seating for a couple’s stage setup.', 'chair'),
  make('welcome-sign-stand', 'Welcome Sign Stand', 'props', 'A stand for welcome signs, seating charts and event boards.', 'prop'),
  make('decorative-ring-prop', 'Decorative Ring Prop', 'props', 'A round prop frame for photos and backdrops.', 'prop'),
  make('decorative-stand', 'Decorative Display Stand', 'stands', 'A stand for floral pieces, cakes and decor accents.', 'stand'),
  make('pillar-stand', 'Pillar Stand', 'stands', 'A pillar-style stand to raise florals and decor pieces.', 'stand'),
  make('other-accessory', 'Event Accessory', 'other', 'Additional accessories and equipment — ask us what else is available.', 'other'),
];

export function getRentalItem(slug: string | undefined): RentalItem | undefined {
  return rentalItems.find((i) => i.slug === slug);
}

export function categoryLabel(id: RentalCategoryId): string {
  return rentalCategories.find((c) => c.id === id)?.label ?? id;
}
