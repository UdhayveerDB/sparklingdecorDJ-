import { decorPlaceholder, type Img } from './images';

export interface DecorCategory {
  slug: string;
  title: string;
  /** Letter used on the main Decorations page (A–G) */
  letter?: string;
  short: string;
  intro: string;
  items: string[];
  image: Img;
  /** Event type pre-selected in the quote form */
  eventType: string;
  /** Gallery filter value (matches gallery.ts `category` or `tags`) */
  galleryKey: string;
  metaDescription: string;
}

/**
 * All copy below is editable. Service lists follow what has been confirmed by the business —
 * add or remove bullet points to match your real offering.
 */
export const decorCategories: DecorCategory[] = [
  {
    slug: 'english-weddings',
    letter: 'A',
    title: 'English Weddings',
    short: 'Elegant ceremony and reception styling with timeless florals.',
    intro:
      'Soft florals, graceful arches and refined details — we style English weddings with elegance from the first welcome to the last dance.',
    items: [
      'Ceremony decoration',
      'Wedding arches',
      'Floral arrangements',
      'Reception styling',
      'Table centrepieces',
      'Entrance decoration',
      'Stage and backdrop styling',
    ],
    image: decorPlaceholder('english', 1),
    eventType: 'English Wedding',
    galleryKey: 'english-weddings',
    metaDescription:
      'English wedding decoration by Sparklingdecor: ceremony styling, wedding arches, floral arrangements, centrepieces and reception decor. Request a quote.',
  },
  {
    slug: 'punjabi-weddings',
    letter: 'B',
    title: 'Punjabi Weddings',
    short: 'Vibrant, culturally rich styling for your Punjabi wedding.',
    intro:
      'Colour, tradition and celebration — we bring Punjabi wedding themes to life with stunning stages, florals and cultural elements.',
    items: [
      'Traditional Punjabi wedding themes',
      'Wedding stage decoration',
      'Colourful floral arrangements',
      'Cultural decorative elements',
      'Reception decoration',
      'Customised wedding setups',
    ],
    image: decorPlaceholder('punjabi', 1),
    eventType: 'Punjabi Wedding',
    galleryKey: 'punjabi-weddings',
    metaDescription:
      'Punjabi wedding decoration by Sparklingdecor: traditional themes, wedding stages, colourful florals and cultural styling. Request a quote.',
  },
  {
    slug: 'jaago-nights',
    letter: 'C',
    title: 'Jaago Nights',
    short: 'Traditional Jaago-themed styling full of colour and light.',
    intro:
      'Jaago night is a celebration of music, family and joy. We create a lively, colourful setting that carries the spirit of the night.',
    items: [
      'Traditional Jaago-themed decoration',
      'Colourful backdrops',
      'Punjabi cultural styling',
      'Lighting and decorative arrangements',
      'Customised Jaago setups',
    ],
    image: decorPlaceholder('jaago', 1),
    eventType: 'Jaago Night',
    galleryKey: 'jaago-nights',
    metaDescription:
      'Jaago night decoration by Sparklingdecor: traditional Jaago themes, colourful backdrops, lighting and Punjabi cultural styling. Request a quote.',
  },
  {
    slug: 'birthdays',
    letter: 'D',
    title: 'Birthdays',
    short: 'Balloons, backdrops and cake tables for every age.',
    intro:
      'From playful children\'s parties to sophisticated adult celebrations, we style birthdays that feel personal and photograph beautifully.',
    items: [
      'Adult birthday decoration',
      "Children's birthday decoration",
      'Balloon arrangements',
      'Themed backdrops',
      'Cake table decoration',
      'Custom birthday setups',
    ],
    image: decorPlaceholder('birthday', 1),
    eventType: 'Birthday Party',
    galleryKey: 'birthdays',
    metaDescription:
      'Birthday party decoration by Sparklingdecor: balloon arrangements, themed backdrops, cake tables and custom setups for adults and children.',
  },
  {
    slug: 'engagements',
    letter: 'E',
    title: 'Engagements',
    short: 'Romantic stages and ring-ceremony backdrops.',
    intro:
      'Your engagement is the beginning of a beautiful story. We design a romantic setting that frames the moment perfectly.',
    items: [
      'Engagement stage decoration',
      'Ring ceremony backdrops',
      'Floral arrangements',
      'Couple seating arrangements',
      'Welcome setups',
    ],
    image: decorPlaceholder('engagement', 1),
    eventType: 'Engagement',
    galleryKey: 'engagements',
    metaDescription:
      'Engagement decoration by Sparklingdecor: engagement stages, ring ceremony backdrops, florals, couple seating and welcome setups.',
  },
  {
    slug: 'haldi-mehndi',
    letter: 'F',
    title: 'Haldi & Mehndi',
    short: 'Cheerful, colour-rich setups for Haldi and Mehndi.',
    intro:
      'Bright, joyful and full of tradition — we style Haldi and Mehndi ceremonies with warm colours, florals and cultural props.',
    items: [
      'Traditional yellow-themed Haldi setups',
      'Mehndi decoration',
      'Colourful floral arrangements',
      'Seating arrangements',
      'Cultural props and backdrops',
    ],
    image: decorPlaceholder('haldi', 1),
    eventType: 'Haldi Ceremony',
    galleryKey: 'haldi-mehndi',
    metaDescription:
      'Haldi and Mehndi decoration by Sparklingdecor: yellow-themed Haldi setups, Mehndi styling, florals, seating and cultural props.',
  },
  {
    slug: 'other-events',
    letter: 'G',
    title: 'Other Events',
    short: 'Baby showers, anniversaries, corporate events and more.',
    intro:
      'Every celebration deserves its own identity. Tell us about your event and we will style it around your vision.',
    items: [
      'Baby showers',
      'Bridal showers',
      'Anniversaries',
      'Corporate events',
      'Private parties',
      'Custom celebrations',
    ],
    image: decorPlaceholder('other', 1),
    eventType: 'Other',
    galleryKey: 'other-events',
    metaDescription:
      'Event decoration for baby showers, bridal showers, anniversaries, corporate events and private parties by Sparklingdecor.',
  },
  {
    slug: 'receptions',
    title: 'Receptions',
    short: 'Refined reception styling, from entrance to table.',
    intro:
      'Set the tone for the celebration with a reception space that feels welcoming, polished and memorable.',
    items: [
      'Reception styling',
      'Table centrepieces',
      'Entrance decoration',
      'Stage and backdrop styling',
    ],
    image: decorPlaceholder('reception', 1),
    eventType: 'Wedding Reception',
    galleryKey: 'receptions',
    metaDescription:
      'Wedding reception decoration by Sparklingdecor: reception styling, centrepieces, entrance decoration and stage backdrops.',
  },
  {
    slug: 'custom-decorations',
    title: 'Custom Decorations',
    short: 'A one-of-a-kind setup designed around your idea.',
    intro:
      'Have something specific in mind? Share your theme, colours and inspiration and we will talk through how to bring it to life.',
    items: [
      'Personalised themes and colour palettes',
      'Custom backdrops',
      'Bespoke celebration setups',
      'Styling for any occasion',
    ],
    image: decorPlaceholder('custom', 1),
    eventType: 'Other',
    galleryKey: 'custom-decorations',
    metaDescription:
      'Custom event decoration by Sparklingdecor: personalised themes, bespoke backdrops and setups designed around your vision.',
  },
];

/** The seven main categories (A–G) shown on the Decorations page */
export const mainDecorCategories = decorCategories.filter((c) => c.letter);

export function getDecorCategory(slug: string | undefined): DecorCategory | undefined {
  return decorCategories.find((c) => c.slug === slug);
}
