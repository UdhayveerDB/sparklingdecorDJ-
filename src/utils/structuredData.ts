import { businessConfig } from '../config/business';

/**
 * Local-business structured data built ONLY from values present in business.ts.
 * Nothing is invented: empty fields are simply left out.
 */
function brandSchema(brand: 'decor' | 'dj') {
  const b = businessConfig.brands[brand];
  const c = businessConfig.contact;
  const sameAs = [
    brand === 'decor' ? businessConfig.social.decorInstagram : businessConfig.social.djInstagram,
    businessConfig.social.facebook,
  ].filter(Boolean);

  const schema: Record<string, unknown> = {
    '@type': 'ProfessionalService',
    name: b.name,
    slogan: b.motto,
    description:
      brand === 'decor'
        ? 'Event decoration and styling for weddings, Jaago nights, birthdays, engagements and more, plus decoration rentals.'
        : 'Punjabi DJ services and event entertainment for weddings, Jaago nights, birthdays, private and corporate events.',
    serviceType: brand === 'decor' ? 'Event decoration' : 'DJ services',
  };
  if (businessConfig.siteUrl) schema.url = `${businessConfig.siteUrl}${brand === 'decor' ? '/decorations' : '/dj'}`;
  if (c.phoneDisplay) schema.telephone = c.phoneDisplay;
  if (c.email) schema.email = c.email;
  if (c.serviceArea) schema.areaServed = c.serviceArea;
  if (sameAs.length) schema.sameAs = sameAs;
  return schema;
}

export function homeStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@graph': [brandSchema('decor'), brandSchema('dj')],
  };
}

export function faqStructuredData(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.q,
      acceptedAnswer: { '@type': 'Answer', text: i.a },
    })),
  };
}

export function breadcrumbData(items: { name: string; path: string }[]) {
  const origin = businessConfig.siteUrl;
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      ...(origin ? { item: `${origin}${it.path}` } : {}),
    })),
  };
}
