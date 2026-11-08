import { Link } from 'react-router-dom';
import { ExternalLink, Headphones, Music2 } from 'lucide-react';
import CTABanner from '../components/CTABanner';
import { EqualizerBars } from '../components/Decor';
import FaqSection from '../components/FaqSection';
import FilteredGallery from '../components/FilteredGallery';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';
import Seo from '../components/Seo';
import ServiceCard from '../components/ServiceCard';
import SocialLinks from '../components/SocialLinks';
import WhatsAppButton from '../components/WhatsAppButton';
import { businessConfig } from '../config/business';
import { djMixes, djServices, musicCategories } from '../data/dj';
import { djGalleryFilters, galleryItems } from '../data/gallery';
import { breadcrumbData } from '../utils/structuredData';

const djGallery = galleryItems.filter((i) => i.brand === 'dj');

export default function DjPage() {
  const { dj } = businessConfig.brands;
  return (
    <div className="bg-charcoal-900 text-white">
      <Seo
        title="DJ MAJHAESTIC — Punjabi DJ"
        path="/dj"
        description="DJ MAJHAESTIC — Making It Sound Majhaestic. Punjabi DJ for weddings, receptions, Jaago nights, Sangeet, birthdays, private and corporate events. Request your music, book your date."
        jsonLd={breadcrumbData([{ name: 'Home', path: '/' }, { name: 'DJ MAJHAESTIC', path: '/dj' }])}
      />
      <PageHero variant="dj" title={dj.name} motto={dj.motto} breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'DJ MAJHAESTIC' }]}>
        <Link to="/dj/book" className="btn btn-gold">Book DJ MAJHAESTIC</Link>
        <WhatsAppButton context="dj" topic="booking a DJ" />
      </PageHero>

      {/* Intro / Punjabi DJ */}
      <section id="punjabi-dj" className="on-dark section-y">
        <div className="container-x max-w-4xl text-center">
          <Reveal>
            <p className="eyebrow !text-gold">Punjabi DJ</p>
            <p className="mt-6 font-serif text-2xl leading-relaxed text-white/90 sm:text-3xl">
              Music is what brings a celebration to life. At DJ MAJHAESTIC, the goal is to create unforgettable musical experiences, bringing Punjabi beats, energetic mixes, and the right atmosphere to every celebration. From wedding celebrations and Jaago nights to birthdays and private parties, we make every moment sound Majhaestic.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Services */}
      <section className="on-dark section-y bg-charcoal">
        <div className="container-x">
          <SectionHeading dark display eyebrow="DJ services" title="Soundtracks For Every Celebration" />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {djServices.map((s, i) => (
              <Reveal key={s.id} delay={(i % 4) * 0.07} className="h-full">
                <ServiceCard
                  id={s.id}
                  tone="dark"
                  title={s.title}
                  description={s.description}
                  image={s.image}
                  to={`/dj/book?event=${encodeURIComponent(s.eventType)}`}
                  cta="Book This"
                  alt={`${s.title} — sample artwork`}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Music */}
      <section id="music" className="on-dark section-y relative overflow-hidden">
        <div className="absolute inset-x-0 bottom-0 flex justify-center opacity-20" aria-hidden="true">
          <EqualizerBars className="h-40" count={70} />
        </div>
        <div className="container-x relative">
          <SectionHeading dark display eyebrow="Your music" title="Your Playlist, Your Party" intro="Tell us what you love — and what to skip. You can request specific music preferences, must-play songs and custom playlists for your celebration." />
          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {musicCategories.map((m, i) => (
              <Reveal key={m.title} delay={(i % 4) * 0.06}>
                <li className="dj-card h-full rounded-2xl p-6 transition duration-500 hover:-translate-y-1 hover:border-gold/60">
                  <Music2 className="text-gold" size={26} />
                  <h3 className="mt-4 font-display text-2xl tracking-wider">{m.title}</h3>
                  <p className="mt-1.5 text-sm text-white/65">{m.note}</p>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Mixes (populated later) */}
      <section id="mixes" className="on-dark section-y bg-charcoal">
        <div className="container-x max-w-4xl">
          <SectionHeading dark display eyebrow="Listen" title="Mixes & Previews" />
          {djMixes.length > 0 ? (
            <ul className="mt-12 grid gap-4 sm:grid-cols-2">
              {djMixes.map((m) => (
                <li key={m.url}>
                  <a href={m.url} target="_blank" rel="noopener noreferrer" className="dj-card flex items-center justify-between gap-4 rounded-2xl p-5 transition hover:border-gold/60">
                    <span className="flex items-center gap-3">
                      <Headphones className="text-gold" />
                      <span className="font-medium">{m.title}</span>
                    </span>
                    <span className="flex items-center gap-1.5 text-sm text-gold">{m.platform ?? 'Listen'} <ExternalLink size={14} /></span>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <Reveal className="mt-12">
              <div className="dj-card rounded-3xl border-dashed p-8 text-center sm:p-12">
                <Headphones className="mx-auto text-gold" size={36} />
                <p className="mt-4 font-serif text-xl text-white/90">Mixes and music previews are coming soon.</p>
                <p className="mx-auto mt-2 max-w-md text-sm text-white/60">Want to hear the style before you book? Ask on WhatsApp.</p>
                <div className="mt-6 flex justify-center"><WhatsAppButton context="dj" topic="hearing a sample mix" small /></div>
                <SocialLinks show={['dj']} showFacebook={false} labeled className="mt-4 justify-center" />
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* Gallery */}
      <section className="on-dark section-y">
        <div className="container-x">
          <SectionHeading dark display eyebrow="Atmosphere" title="The Energy In The Room" />
          <div className="mt-12">
            <FilteredGallery items={djGallery} filters={djGalleryFilters} label="Filter DJ gallery" dark />
          </div>
        </div>
      </section>

      <FaqSection dark limit={4} />

      <CTABanner variant="dj" heading="Ready To Get The Party Started?" text="Tell us about your celebration, your music preferences, and your event date. Let's make it sound Majhaestic.">
        <Link to="/dj/book" className="btn btn-gold">Book DJ MAJHAESTIC</Link>
        <WhatsAppButton context="dj" />
      </CTABanner>
    </div>
  );
}
