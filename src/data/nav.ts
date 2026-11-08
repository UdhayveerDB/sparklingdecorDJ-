export interface NavChild {
  label: string;
  to: string;
}

export interface NavItem {
  label: string;
  /** Top-level link (also the base path used to highlight the active item) */
  to: string;
  children?: NavChild[];
}

export const navItems: NavItem[] = [
  { label: 'Home', to: '/' },
  {
    label: 'Decorations',
    to: '/decorations',
    children: [
      { label: 'English Weddings', to: '/decorations/english-weddings' },
      { label: 'Punjabi Weddings', to: '/decorations/punjabi-weddings' },
      { label: 'Jaago Nights', to: '/decorations/jaago-nights' },
      { label: 'Birthdays', to: '/decorations/birthdays' },
      { label: 'Engagements', to: '/decorations/engagements' },
      { label: 'Haldi & Mehndi', to: '/decorations/haldi-mehndi' },
      { label: 'Receptions', to: '/decorations/receptions' },
      { label: 'Other Events', to: '/decorations/other-events' },
      { label: 'Custom Decorations', to: '/decorations/custom-decorations' },
    ],
  },
  {
    label: 'DJ MAJHAESTIC',
    to: '/dj',
    children: [
      { label: 'Punjabi DJ', to: '/dj#punjabi-dj' },
      { label: 'Wedding DJ', to: '/dj#punjabi-wedding-dj' },
      { label: 'Jaago Night DJ', to: '/dj#jaago-dj' },
      { label: 'Birthday DJ', to: '/dj#birthday-dj' },
      { label: 'Private Events', to: '/dj#private-dj' },
      { label: 'Book a DJ', to: '/dj/book' },
    ],
  },
  {
    label: 'Rentals',
    to: '/rentals',
    children: [
      { label: 'Decoration Rentals', to: '/rentals' },
      { label: 'Wedding Rentals', to: '/rentals?category=wedding' },
      { label: 'Event Props', to: '/rentals?category=props' },
      { label: 'Backdrops', to: '/rentals?category=backdrops' },
      { label: 'Tables & Chairs', to: '/rentals?category=tables-chairs' },
      { label: 'Other Rental Items', to: '/rentals?category=other' },
    ],
  },
  { label: 'Gallery', to: '/gallery' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact', to: '/contact' },
];
