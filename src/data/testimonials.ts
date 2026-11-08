export interface Testimonial {
  quote: string;
  name: string;
  event?: string;
}

/**
 * Add REAL customer reviews here (with their permission). Leave empty until you have them —
 * the website then shows a tasteful "share your experience" card instead of fake reviews.
 *
 * Example:
 * { quote: 'Our stage looked incredible.', name: 'First name', event: 'Punjabi Wedding' }
 */
export const testimonials: Testimonial[] = [];
