import { brandNames, businessConfig, getWhatsAppNumber } from '../config/business';
import type { ServiceKey } from '../data/options';

/* ------------------------------------------------------------------ */
/*  URL                                                                */
/* ------------------------------------------------------------------ */

/**
 * Builds a WhatsApp Click-to-Chat link: https://wa.me/NUMBER?text=ENCODED_MESSAGE
 * The customer still has to review the message and press Send inside WhatsApp —
 * nothing is sent automatically by this website.
 * If no number is configured yet, https://wa.me/?text=... is used, which opens WhatsApp
 * with the message ready and lets the customer choose the contact.
 */
export function whatsappUrl(message: string): string {
  const number = getWhatsAppNumber();
  const text = encodeURIComponent(message);
  return number ? `https://wa.me/${number}?text=${text}` : `https://wa.me/?text=${text}`;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const NOT_SPECIFIED = 'Not specified';

/** Trims and collapses whitespace; returns a fallback for empty values. */
export function clean(value: string | undefined | null, fallback = NOT_SPECIFIED): string {
  const v = (value ?? '').replace(/\r/g, '').replace(/[ \t]+/g, ' ').trim();
  return v.length > 0 ? v : fallback;
}

/** '2027-03-14' -> 'Sunday, 14 March 2027' (parsed as UTC so the day never shifts) */
export function formatDate(iso: string | undefined | null): string {
  if (!iso) return NOT_SPECIFIED;
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return clean(iso);
  const d = new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3])));
  if (Number.isNaN(d.getTime())) return clean(iso);
  return d.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

/* ------------------------------------------------------------------ */
/*  Brand selection                                                    */
/* ------------------------------------------------------------------ */

/** Chooses the greeting brand from the selected services. */
export function greetingBrand(services: ServiceKey[]): string {
  const hasDecor = services.includes('decor');
  const hasDj = services.includes('dj');
  const hasRentals = services.includes('rentals');
  if (hasDecor && hasDj) return `${brandNames.decor} and ${brandNames.dj}`;
  if (hasDj && hasRentals) return `${brandNames.dj} and ${brandNames[businessConfig.rentalsBrand]}`;
  if (hasDj) return brandNames.dj;
  if (hasDecor) return brandNames.decor;
  if (hasRentals) return brandNames[businessConfig.rentalsBrand];
  return brandNames.both;
}

/* ------------------------------------------------------------------ */
/*  Main enquiry message                                               */
/* ------------------------------------------------------------------ */

export interface EnquiryData {
  services: ServiceKey[];
  name: string;
  phone: string;
  email?: string;
  eventType?: string;
  eventDate?: string;
  eventLocation?: string;
  guests?: string;
  decorRequirements?: string;
  djRequirements?: string;
  musicPreferences?: string[];
  rentalRequirements?: string;
  rentalItems?: string[];
  budget?: string;
  notes?: string;
}

function servicesLabel(services: ServiceKey[]): string {
  const parts: string[] = [];
  if (services.includes('decor')) parts.push('Decorations');
  if (services.includes('dj')) parts.push('DJ Services');
  if (services.includes('rentals')) parts.push('Rentals');
  return parts.length ? parts.join(' + ') : NOT_SPECIFIED;
}

/** Builds the formatted enquiry message following the business template. */
export function buildEnquiryMessage(data: EnquiryData): string {
  const lines: string[] = [];
  const services = data.services;

  lines.push(`Hello ${greetingBrand(services)}!`);
  lines.push('');
  lines.push('I am interested in booking your services.');
  lines.push('');
  lines.push('*CUSTOMER DETAILS*');
  lines.push(`Name: ${clean(data.name)}`);
  lines.push(`Phone: ${clean(data.phone)}`);
  lines.push(`Email: ${clean(data.email)}`);
  lines.push('');
  lines.push('*EVENT DETAILS*');
  lines.push(`Event Type: ${clean(data.eventType)}`);
  lines.push(`Event Date: ${formatDate(data.eventDate)}`);
  lines.push(`Event Location: ${clean(data.eventLocation)}`);
  lines.push(`Expected Guests: ${clean(data.guests)}`);
  lines.push('');
  lines.push('*SERVICE DETAILS*');
  lines.push(`Service Interested In: ${servicesLabel(services)}`);

  if (services.includes('decor')) {
    lines.push(`Decoration Requirements: ${clean(data.decorRequirements)}`);
  }
  if (services.includes('dj')) {
    const music = (data.musicPreferences ?? []).filter(Boolean);
    const djBits = [
      music.length ? `Music: ${music.join(', ')}` : '',
      clean(data.djRequirements, ''),
    ].filter(Boolean);
    lines.push(`DJ Requirements: ${djBits.length ? djBits.join(' | ') : NOT_SPECIFIED}`);
  }
  if (services.includes('rentals')) {
    const items = (data.rentalItems ?? []).filter(Boolean);
    const rentBits = [
      items.length ? `Items: ${items.join(', ')}` : '',
      clean(data.rentalRequirements, ''),
    ].filter(Boolean);
    lines.push(`Rental Requirements: ${rentBits.length ? rentBits.join(' | ') : NOT_SPECIFIED}`);
  }

  lines.push('');
  lines.push(`Estimated Budget: ${clean(data.budget)}`);
  lines.push(`Additional Information: ${clean(data.notes)}`);
  lines.push('');
  lines.push('Please let me know your availability, packages, and pricing.');
  lines.push('');
  lines.push('Thank you!');

  return lines.join('\n');
}

/* ------------------------------------------------------------------ */
/*  Rental enquiry message (its own template)                          */
/* ------------------------------------------------------------------ */

export interface RentalEnquiryData {
  name: string;
  phone: string;
  email?: string;
  item: string;
  quantity: string;
  startDate: string;
  returnDate: string;
  eventDate?: string;
  delivery?: string;
  requirements?: string;
}

export function buildRentalMessage(data: RentalEnquiryData): string {
  return [
    `Hello ${brandNames[businessConfig.rentalsBrand]}!`,
    '',
    'I would like to enquire about renting an item.',
    '',
    '*CUSTOMER DETAILS*',
    `Name: ${clean(data.name)}`,
    `Phone: ${clean(data.phone)}`,
    `Email: ${clean(data.email)}`,
    '',
    '*RENTAL DETAILS*',
    `Rental Item: ${clean(data.item)}`,
    `Quantity: ${clean(data.quantity)}`,
    `Rental Start Date: ${formatDate(data.startDate)}`,
    `Rental Return Date: ${formatDate(data.returnDate)}`,
    `Event Date: ${formatDate(data.eventDate)}`,
    `Delivery / Pickup: ${clean(data.delivery)}`,
    '',
    `Additional Requirements: ${clean(data.requirements)}`,
    '',
    'Please let me know availability, pricing, and delivery or pickup options.',
    '',
    'Thank you!',
  ].join('\n');
}

/* ------------------------------------------------------------------ */
/*  Quick "chat with us" messages (floating button, page buttons)      */
/* ------------------------------------------------------------------ */

export type QuickContext = 'decor' | 'dj' | 'rentals' | 'general';

export function buildQuickMessage(context: QuickContext, topic?: string): string {
  const brand =
    context === 'decor'
      ? brandNames.decor
      : context === 'dj'
        ? brandNames.dj
        : context === 'rentals'
          ? brandNames[businessConfig.rentalsBrand]
          : brandNames.both;
  const about = topic ? ` about ${topic}` : ' about your services';
  return [
    `Hello ${brand}!`,
    '',
    `I would like to find out more${about}.`,
    '',
    'Please let me know your availability and pricing.',
    '',
    'Thank you!',
  ].join('\n');
}
