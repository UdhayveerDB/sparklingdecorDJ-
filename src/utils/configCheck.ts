import { businessConfig, getWhatsAppNumber } from '../config/business';

/** Development-only reminder of what is still missing in src/config/business.ts */
export function warnAboutMissingConfig() {
  if (!import.meta.env.DEV) return;
  const missing: string[] = [];
  if (!getWhatsAppNumber()) missing.push('contact.whatsappNumber (WhatsApp buttons open without a target number)');
  if (!businessConfig.contact.phoneDisplay) missing.push('contact.phoneDisplay');
  if (!businessConfig.contact.email) missing.push('contact.email');
  if (!businessConfig.social.decorInstagram) missing.push('social.decorInstagram');
  if (!businessConfig.social.djInstagram) missing.push('social.djInstagram');
  if (!businessConfig.social.facebook) missing.push('social.facebook');
  if (!businessConfig.contact.serviceArea) missing.push('contact.serviceArea');
  if (!businessConfig.siteUrl) missing.push('siteUrl / VITE_SITE_URL (needed for sitemap & canonical URLs)');
  if (missing.length) {
    // eslint-disable-next-line no-console
    console.info(
      '[Sparklingdecor × DJ MAJHAESTIC] Still to fill in src/config/business.ts:\n - ' + missing.join('\n - '),
    );
  }
}
