import { Quote } from 'lucide-react';
import { testimonials } from '../data/testimonials';
import { buildQuickMessage, whatsappUrl } from '../utils/whatsapp';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import { WhatsAppIcon } from './icons';

/**
 * Shows REAL reviews from src/data/testimonials.ts. While that list is empty, it shows an honest
 * invitation card instead of invented reviews.
 */
export default function Testimonials({ dark }: { dark?: boolean }) {
  return (
    <section className={`section-y ${dark ? 'on-dark bg-charcoal-800' : 'bg-softwhite'}`}>
      <div className="container-x">
        <SectionHeading
          eyebrow="Kind words"
          title="Celebrations Remembered"
          intro={testimonials.length ? undefined : 'Reviews from our clients will appear here.'}
          dark={dark}
        />
        {testimonials.length > 0 ? (
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.name + i} delay={i * 0.08}>
                <figure className={`h-full rounded-2xl border p-8 ${dark ? 'border-gold/20 bg-charcoal-900' : 'card-lux'}`}>
                  <Quote className="text-gold" />
                  <blockquote className={`mt-4 font-serif text-lg leading-relaxed ${dark ? 'text-white' : 'text-charcoal'}`}>
                    {t.quote}
                  </blockquote>
                  <figcaption className={`mt-5 text-sm ${dark ? 'text-white/60' : 'text-charcoal/60'}`}>
                    <span className="font-semibold text-gold-700">{t.name}</span>
                    {t.event ? ` · ${t.event}` : ''}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal className="mx-auto mt-12 max-w-2xl">
            <div className={`rounded-3xl border border-dashed p-8 text-center sm:p-12 ${dark ? 'border-gold/40 bg-charcoal-900' : 'border-gold/50 bg-ivory'}`}>
              <Quote className="mx-auto text-gold" size={34} />
              <p className={`mt-5 font-serif text-xl leading-relaxed sm:text-2xl ${dark ? 'text-white' : 'text-charcoal'}`}>
                Celebrated with us? We&rsquo;d love to hear how your event went.
              </p>
              <a
                href={whatsappUrl(buildQuickMessage('general', 'sharing feedback about my event'))}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-wa btn-sm mt-7"
              >
                <WhatsAppIcon size={18} /> Share your experience
              </a>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
