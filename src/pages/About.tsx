import { Link } from 'react-router-dom';
import { HandHeart, Heart, ShieldCheck, Sparkles, Wand2 } from 'lucide-react';
import CTABanner from '../components/CTABanner';
import { EqualizerBars } from '../components/Decor';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';
import Seo from '../components/Seo';
import { businessConfig } from '../config/business';
import { breadcrumbData } from '../utils/structuredData';

const approach = [
  { icon: Wand2, title: 'Creativity', text: 'Fresh, thoughtful ideas that turn a space into an experience.' },
  { icon: Heart, title: 'Personalisation', text: 'Every celebration is shaped around your story, culture and taste.' },
  { icon: Sparkles, title: 'Attention to detail', text: 'The little things are what people remember — we plan for them.' },
  { icon: HandHeart, title: 'Passion for celebrations', text: 'We love what we do, and we want your day to feel special.' },
  { icon: ShieldCheck, title: 'Customer satisfaction', text: 'Clear communication and care from your first message to your event.' },
];

export default function About() {
  const { decor, dj } = businessConfig.brands;
  return (
    <>
      <Seo
        title="About Us"
        path="/about"
        description="Two creative brands, one passion for celebrations. Sparklingdecor (event decoration) and DJ MAJHAESTIC (Punjabi DJ and entertainment) make celebrations more memorable."
        jsonLd={breadcrumbData([{ name: 'Home', path: '/' }, { name: 'About Us', path: '/about' }])}
      />
      <PageHero
        title="Two Creative Brands. One Passion For Celebrations."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'About Us' }]}
        intro="Sparklingdecor and DJ MAJHAESTIC share one aim: to make celebrations more memorable through beautiful event styling and unforgettable entertainment."
      />

      <section className="section-y bg-softwhite">
        <div className="container-x grid gap-6 lg:grid-cols-2">
          <Reveal>
            <article className="h-full rounded-3xl bg-gradient-to-br from-ivory via-blush/70 to-warmpink/60 p-8 shadow-lux sm:p-12">
              <p className="eyebrow">Event decoration &amp; styling</p>
              <h2 className="mt-3 font-serif text-4xl font-semibold">{decor.name}</h2>
              <p className="mt-2 font-serif text-xl italic text-burgundy">{decor.motto}</p>
              <p className="mt-6 leading-relaxed text-charcoal/75">
                Sparklingdecor is all about transforming spaces. From elegant English weddings and vibrant Punjabi celebrations to Jaago nights, birthdays, engagements and private events, we style each occasion with creativity and care so it feels like yours alone.
              </p>
              <Link to="/decorations" className="btn btn-dark mt-8">Explore Decorations</Link>
            </article>
          </Reveal>
          <Reveal delay={0.1}>
            <article className="on-dark relative h-full overflow-hidden rounded-3xl bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-burgundy-900 p-8 shadow-lux sm:p-12">
              <EqualizerBars className="absolute bottom-0 right-6 h-24 opacity-25" count={16} />
              <p className="eyebrow !text-gold">Punjabi DJ &amp; entertainment</p>
              <h2 className="heading-display dj-glow-text mt-3 text-5xl text-white sm:text-6xl">{dj.name}</h2>
              <p className="mt-2 font-serif text-xl italic text-gold">{dj.motto}</p>
              <p className="mt-6 leading-relaxed text-white/75">
                DJ MAJHAESTIC brings energy, rhythm and Punjabi vibes to weddings, Jaago nights, birthdays and private events — building a soundtrack around your guests so the celebration keeps going.
              </p>
              <Link to="/dj" className="btn btn-gold mt-8">Explore DJ Services</Link>
            </article>
          </Reveal>
        </div>
      </section>

      <section className="section-y bg-ivory">
        <div className="container-x">
          <SectionHeading eyebrow="Our approach" title="What We Care About" />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {approach.map((a, i) => (
              <Reveal key={a.title} delay={(i % 3) * 0.08}>
                <div className="h-full rounded-2xl border border-gold/25 bg-white p-7 shadow-lux">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 text-gold-700"><a.icon size={22} /></span>
                  <h3 className="mt-5 font-serif text-xl font-semibold">{a.title}</h3>
                  <p className="mt-2 leading-relaxed text-charcoal/70">{a.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABanner heading="Let's Make Your Next Celebration Unforgettable." text="Tell us about your event and let us help bring your vision to life.">
        <Link to="/quote" className="btn btn-gold">Get a Quote</Link>
        <Link to="/contact" className="btn btn-outline-light">Contact Us</Link>
      </CTABanner>
    </>
  );
}
