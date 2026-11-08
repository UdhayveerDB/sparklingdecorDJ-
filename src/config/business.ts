/**
 * ============================================================
 *  CENTRAL BUSINESS CONFIGURATION  —  EDIT THIS FILE FIRST
 * ============================================================
 * Everything customers see about contact details lives here.
 * Leave a value as an empty string ('') and the website will
 * simply hide that item instead of showing a fake one.
 */
export const businessConfig = {
  /** Public website address, e.g. 'https://www.yourdomain.com' (used for SEO, sitemap, canonical URLs).
   *  You can also set it with the VITE_SITE_URL environment variable at build time. */
  siteUrl: ((import.meta.env?.VITE_SITE_URL as string | undefined) ?? '').replace(/\/$/, ''),

  brands: {
    decor: {
      name: 'Sparklingdecor',
      motto: 'Turning Moments Into Memories.',
    },
    dj: {
      name: 'DJ MAJHAESTIC',
      motto: 'Making It Sound Majhaestic.',
    },
  },

  contact: {
    /** WhatsApp business number: digits only, with country code, NO plus sign or spaces.
     *  Example: '14165551234'. While empty, WhatsApp buttons still open WhatsApp with the message
     *  ready, and the customer chooses the contact themselves. */
    whatsappNumber: '12044421521',
    /** Phone number as shown to visitors, e.g. '+1 416 555 1234' (leave '' to hide) */
    phoneDisplay: '+1 204 442 1521',
    /** Phone number for tap-to-call, digits with country code e.g. '14165551234' */
    phoneDigits: '',
    /** Business email (leave '' to hide) */
    email: '',
    /** Where you serve, e.g. 'Toronto & surrounding areas' (leave '' to show a generic line) */
    serviceArea: 'Winnipeg & Surrounding areas',
    /** Business hours — one line per entry, e.g. 'Mon–Fri: 10am – 6pm' (leave [] to hide) */
    businessHours: [] as string[],
  },

  social: {
    /** Full URLs, e.g. 'https://www.instagram.com/yourhandle'. Empty = button hidden. */
    decorInstagram: '',
    djInstagram: '',
    facebook: '',
  },

  /** Which brand receives rental enquiries on WhatsApp: 'decor' or 'dj' */
  rentalsBrand: 'decor' as 'decor' | 'dj',

  media: {
    /** Optional cinematic hero video (put the file in /public/videos and use '/videos/hero.mp4'). Empty = animated artwork. */
    heroVideo: '',
    /** Optional poster / background photograph for the home hero, e.g. '/images/gallery/hero.jpg' */
    heroImage: '',
  },

  seo: {
    /** Social sharing image (1200x630 JPG/PNG in /public), e.g. '/og-image.jpg'. Empty = none. */
    ogImage: '',
  },

  ui: {
    /** Shows a small "Sample image" tag on placeholder photos. Real photos never show it. */
    showPlaceholderLabels: true,
    /** Shows a note on the Rentals page that items are sample listings until real inventory is added. */
    showSampleRentalNotice: true,
  },
};

export type BrandKey = keyof typeof businessConfig.brands;

/** Returns a clean, digits-only WhatsApp number, or '' if it is missing/invalid. */
export function getWhatsAppNumber(): string {
  const digits = businessConfig.contact.whatsappNumber.replace(/\D/g, '');
  return digits.length >= 8 && digits.length <= 15 ? digits : '';
}

export const brandNames = {
  decor: businessConfig.brands.decor.name,
  dj: businessConfig.brands.dj.name,
  both: `${businessConfig.brands.decor.name} / ${businessConfig.brands.dj.name}`,
};
