import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';
import { businessConfig } from '../config/business';
import { navItems } from '../data/nav';
import { buildQuickMessage, whatsappUrl } from '../utils/whatsapp';
import { SparkleMark, WhatsAppIcon } from './icons';
import SocialLinks from './SocialLinks';

export default function Footer() {
  const { contact, brands } = businessConfig;
  const decor = navItems.find((n) => n.label === 'Decorations')?.children ?? [];
  const rentals = navItems.find((n) => n.label === 'Rentals')?.children ?? [];

  return (
    <footer className="on-dark bg-charcoal-900 text-white/75">
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <div className="flex items-center gap-2.5 text-white">
            <SparkleMark className="text-gold" size={24} />
            <span className="font-serif text-xl font-semibold">{brands.decor.name}</span>
          </div>
          <p className="mt-2 font-serif italic text-gold">{brands.decor.motto}</p>
          <p className="mt-6 font-display text-xl tracking-[0.2em] text-white">{brands.dj.name}</p>
          <p className="mt-1 font-serif italic text-gold">{brands.dj.motto}</p>
          <SocialLinks className="mt-6" />
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Decorations</h3>
          <ul className="mt-5 space-y-2.5 text-sm">
            {decor.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition hover:text-gold">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Explore</h3>
          <ul className="mt-5 space-y-2.5 text-sm">
            <li><Link to="/dj" className="transition hover:text-gold">DJ MAJHAESTIC</Link></li>
            <li><Link to="/dj/book" className="transition hover:text-gold">Book a DJ</Link></li>
            {rentals.slice(0, 1).map((l) => (
              <li key={l.to}><Link to="/rentals" className="transition hover:text-gold">Rentals</Link></li>
            ))}
            <li><Link to="/gallery" className="transition hover:text-gold">Gallery</Link></li>
            <li><Link to="/about" className="transition hover:text-gold">About Us</Link></li>
            <li><Link to="/contact" className="transition hover:text-gold">Contact</Link></li>
            <li><Link to="/quote" className="transition hover:text-gold">Get a Quote</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Get in touch</h3>
          <ul className="mt-5 space-y-3.5 text-sm">
            <li>
              <a
                href={whatsappUrl(buildQuickMessage('general'))}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 transition hover:text-gold"
              >
                <WhatsAppIcon size={18} className="text-gold" /> Message us on WhatsApp
              </a>
            </li>
            {contact.phoneDisplay && contact.phoneDigits && (
              <li>
                <a href={`tel:+${contact.phoneDigits.replace(/\D/g, '')}`} className="flex items-center gap-2.5 transition hover:text-gold">
                  <Phone size={18} className="text-gold" /> {contact.phoneDisplay}
                </a>
              </li>
            )}
            {contact.email && (
              <li>
                <a href={`mailto:${contact.email}`} className="flex items-center gap-2.5 break-all transition hover:text-gold">
                  <Mail size={18} className="shrink-0 text-gold" /> {contact.email}
                </a>
              </li>
            )}
            <li className="flex items-start gap-2.5">
              <MapPin size={18} className="mt-0.5 shrink-0 text-gold" />
              {contact.serviceArea || 'Contact us to confirm service availability in your area.'}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-6 text-xs text-white/50 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {brands.decor.name} × {brands.dj.name}. All rights reserved.
          </p>
          <p className="font-serif italic text-gold/80">Decorating Moments. Creating Memories.</p>
        </div>
      </div>
    </footer>
  );
}
