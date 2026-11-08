export interface Faq {
  q: string;
  a: string;
}

/** Editable FAQ answers. They deliberately avoid promises about timelines, pricing or stock. */
export const faqs: Faq[] = [
  {
    q: 'How far in advance should I book?',
    a: 'We recommend getting in touch as early as you can, especially for weddings and busy dates. Send us your event date and we will let you know what is possible.',
  },
  {
    q: 'Can I request customised decoration themes?',
    a: 'Yes — personalised styling is at the heart of what Sparklingdecor does. Share your ideas, colours and inspiration and we will talk through how to bring them to life.',
  },
  {
    q: 'Do you provide decoration and DJ services together?',
    a: 'You can enquire about decorations and DJ MAJHAESTIC together in a single request, or enquire about either one on its own.',
  },
  {
    q: 'Can I rent individual decoration items?',
    a: 'You can send a rental enquiry for individual items from our Rentals page. We will confirm availability, pricing and delivery or pickup options for your dates.',
  },
  {
    q: 'How do I get a quotation?',
    a: 'Use the Get a Quote form or message us on WhatsApp with your event details. Pricing depends on your event, so we provide quotes rather than fixed prices.',
  },
  {
    q: 'Do you cater to different cultural wedding styles?',
    a: 'We style English weddings, Punjabi weddings, Jaago nights, Haldi, Mehndi and more. If your celebration has specific traditions, tell us and we will plan around them.',
  },
  {
    q: 'How can I check availability?',
    a: 'Send us your event date and location through the quote form, the contact form or WhatsApp, and we will confirm availability for your date.',
  },
];
