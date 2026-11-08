/** Shared dropdown/choice lists used by the booking, contact and rental forms. Edit freely. */

export const eventTypes = [
  'English Wedding',
  'Punjabi Wedding',
  'Jaago Night',
  'Engagement',
  'Birthday Party',
  'Anniversary',
  'Baby Shower',
  'Bridal Shower',
  'Wedding Reception',
  'Haldi Ceremony',
  'Mehndi Ceremony',
  'Sangeet Night',
  'Corporate Event',
  'Private Party',
  'Cultural Celebration',
  'Other',
] as const;

export const guestRanges = [
  'Under 25',
  '25 – 50',
  '50 – 100',
  '100 – 200',
  '200 – 350',
  '350+',
  'Not sure yet',
] as const;

export const musicPreferences = [
  'Punjabi',
  'Bollywood',
  'Bhangra',
  'Hip-hop',
  'International hits',
  'Commercial',
  'Custom playlist',
] as const;

export const deliveryPreferences = ['Delivery', 'Pickup', 'Not sure yet'] as const;

export type ServiceKey = 'decor' | 'dj' | 'rentals';

export const serviceLabels: Record<ServiceKey, string> = {
  decor: 'Decorations',
  dj: 'DJ Services',
  rentals: 'Rentals',
};

export const serviceOptions: {
  key: ServiceKey;
  title: string;
  blurb: string;
}[] = [
  { key: 'decor', title: 'Decorations', blurb: 'Event decoration and styling by Sparklingdecor' },
  { key: 'dj', title: 'DJ MAJHAESTIC', blurb: 'Punjabi DJ and event entertainment' },
  { key: 'rentals', title: 'Rentals', blurb: 'Rent decoration items, props and furniture' },
];

/** Options shown in the contact form's "Service interested in" select. */
export const contactServiceChoices: { label: string; services: ServiceKey[] }[] = [
  { label: 'Decorations only', services: ['decor'] },
  { label: 'DJ only', services: ['dj'] },
  { label: 'Rentals only', services: ['rentals'] },
  { label: 'Decorations + DJ', services: ['decor', 'dj'] },
  { label: 'Decorations + DJ + Rentals', services: ['decor', 'dj', 'rentals'] },
];
