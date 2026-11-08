import { Link } from 'react-router-dom';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import ContactForm from '../components/ContactForm';
import FaqSection from '../components/FaqSection';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';
import Seo from '../components/Seo';
import SocialLinks from '../components/SocialLinks';
import WhatsAppButton from '../components/WhatsAppButton';
import { businessConfig } from '../config/business';
import { breadcrumbData } from '../utils/structuredData';

export default function Contact() {
  const { contact, brands } = businessConfig;
  const tel = contact.phoneDigits.replace(/\D/g, '');

  const channels = [
    { title: brands.decor.name, note: 'Decorations & styling', context: 'decor' as const, topic: 'decoration services', link: '/quote?service=decor', linkLabel: 'Decoration quote' },
    { title: brands.dj.name, note: 'Punjabi DJ & entertainment', context: 'dj' as const, topic: 'booking a DJ', link: '/dj/book', linkLabel: 'Book a DJ' },
    { title: 'Rentals', note: 'Decor items, props & furniture', context: 'rentals' as const, topic: 'rentals', link: '/rentals', linkLabel: 'Browse rentals' },
  ];

  return (
    <>
      <Seo
        title="Contact Us"
        path="/contact"
        description="Contact Sparklingdecor and DJ MAJHAESTIC. Message us on WhatsApp or send an enquiry about decorations, DJ services or rentals for your event."
        jsonLd={breadcrumbData([{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }])}
      />
      <PageHero
        title="Contact Us"
        intro="Tell us about your celebration. Message us directly on WhatsApp or fill in the form below."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Contact' }]}
      />

      {/* Per-brand contact options */}
      <section className="section-y bg-softwhite">
        <div className="container-x">
          <SectionHeading eyebrow="Choose who to contact" title="How Can We Help?" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {channels.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.08}>
                <div className="flex h-full flex-col rounded-2xl border border-gold/25 bg-white p-7 text-center shadow-lux">
                  <h3 className="font-serif text-2xl font-semibold">{c.title}</h3>
                  <p className="mt-1 text-charcoal/60">{c.note}</p>
                  <div className="mt-6 grid gap-3">
                    <WhatsAppButton context={c.context} topic={c.topic} label="WhatsApp" small />
                    <Link to={c.link} className="btn btn-outline btn-sm">{c.linkLabel}</Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Details + form */}
      <section className="section-y bg-ivory">
        <div className="container-x grid gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          <div>
            <p className="eyebrow">Contact details</p>
            <h2 className="heading-serif mt-3">Get In Touch</h2>
            <ul className="mt-8 space-y-5">
              {contact.phoneDisplay && tel && (
                <li className="flex items-start gap-4">
                  <Phone className="mt-1 shrink-0 text-gold-700" />
                  <div><p className="text-xs font-semibold uppercase tracking-wider text-charcoal/50">Phone</p><a href={`tel:+${tel}`} className="font-medium hover:text-gold-700">{contact.phoneDisplay}</a></div>
                </li>
              )}
              {contact.email && (
                <li className="flex items-start gap-4">
                  <Mail className="mt-1 shrink-0 text-gold-700" />
                  <div><p className="text-xs font-semibold uppercase tracking-wider text-charcoal/50">Email</p><a href={`mailto:${contact.email}`} className="break-all font-medium hover:text-gold-700">{contact.email}</a></div>
                </li>
              )}
              <li className="flex items-start gap-4">
                <MapPin className="mt-1 shrink-0 text-gold-700" />
                <div><p className="text-xs font-semibold uppercase tracking-wider text-charcoal/50">Service area</p><p className="font-medium">{contact.serviceArea || 'Contact us to confirm availability in your area.'}</p></div>
              </li>
              {contact.businessHours.length > 0 && (
                <li className="flex items-start gap-4">
                  <Clock className="mt-1 shrink-0 text-gold-700" />
                  <div><p className="text-xs font-semibold uppercase tracking-wider text-charcoal/50">Business hours</p>{contact.businessHours.map((h) => <p key={h} className="font-medium">{h}</p>)}</div>
                </li>
              )}
            </ul>
            <div className="mt-8 grid gap-3 sm:max-w-xs">
              <WhatsAppButton context="general" label="Message on WhatsApp" />
            </div>
            <div className="mt-8"><SocialLinks labeled /></div>
          </div>

          <div>
            <ContactForm />
          </div>
        </div>
      </section>

      <FaqSection />
    </>
  );
}
