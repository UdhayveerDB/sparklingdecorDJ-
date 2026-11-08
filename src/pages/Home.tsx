import { Link } from 'react-router-dom';
import { ArrowRight, CalendarCheck, Gem, Layers, Palette, Shuffle, Sparkles } from 'lucide-react';
import CTABanner from '../components/CTABanner';
import { EqualizerBars } from '../components/Decor';
import FaqSection from '../components/FaqSection';
import HeroSection from '../components/HeroSection';
import LatestWork from '../components/LatestWork';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';
import Seo from '../components/Seo';
import ServiceCard from '../components/ServiceCard';
import Testimonials from '../components/Testimonials';
import WhatsAppButton from '../components/WhatsAppButton';
import { businessConfig } from '../config/business';
import { decorCategories } from '../data/decorations';
import { djPlaceholder, rentalPlaceholder } from '../data/images';
import { faqs } from '../data/faqs';
import { faqStructuredData, homeStructuredData } from '../utils/structuredData';

const featured = [
  ...['english-weddings', 'punjabi-weddings', 'jaago-nights', 'birthdays', 'engagements', 'haldi-mehndi'].map((slug) => {
    const c = decorCategories.find((d) => d.slug === slug)!;
    const titles: Record<string, string> = { birthdays: 'Birthday Celebrations' };
    return {
      title: titles[slug] ?? c.title,
      description: c.short,
      image: c.image,
      to: `/decorations/${c.slug}`,
    };
  }),
  {
    title: 'DJ Services',
    description: 'Punjabi beats and energetic mixes for weddings, Jaago nights and parties.',
    image: djPlaceholder('performance', 1),
    to: '/dj',
  },
  {
    title: 'Event Rentals',
    description: 'Browse decoration items, backdrops, props, tables and chairs to rent.',
    image: rentalPlaceholder('arch'),
    to: '/rentals',
  },
];

const reasons = [
  { icon: Sparkles, title: 'Personalised event experiences', text: 'Every celebration is styled around your story, culture and taste.' },
  { icon: Gem, title: 'Attention to detail', text: 'From the arch to the smallest accent, the details are considered.' },
  { icon: Palette, title: 'Creative decoration concepts', text: 'Fresh ideas and thoughtful styling rather than one-size-fits-all setups.' },
  { icon: Shuffle, title: 'Flexible event solutions', text: 'Choose decorations, DJ entertainment, rentals — or any combination.' },
  { icon: CalendarCheck, title: 'Convenient booking', text: 'Send your enquiry in minutes and continue the conversation on WhatsApp.' },
  { icon: Layers, title: 'Decor & entertainment, one platform', text: 'Style the room and set the soundtrack with one team to coordinate with.' },
];

const quick = [
  { label: 'Get a Decoration Quote', to: '/quote?service=decor', style: 'btn-gold' },
  { label: 'Book a Punjabi DJ', to: '/dj/book', style: 'btn-outline' },
  { label: 'Browse Rentals', to: '/rentals', style: 'btn-outline' },
  { label: 'Contact Us', to: '/contact', style: 'btn-outline' },
];

export default function Home() {
  const { decor, dj } = businessConfig.brands;
  return (
    <>
      <Seo
        title="Home"
        path="/"
        description="Sparklingdecor — Turning Moments Into Memories. DJ MAJHAESTIC — Making It Sound Majhaestic. Event decoration, Punjabi DJ services and rentals for weddings, Jaago nights, birthdays and more."
        jsonLd={[homeStructuredData(), faqStructuredData(faqs.slice(0, 4))]}
      />
      <HeroSection />

      {/* Two brands */}
      <section id="brands" className="section-y bg-softwhite">
        <div className="container-x">
          <SectionHeading eyebrow="Two brands · One celebration" title="Beautiful Spaces. Unforgettable Sound." />
          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <Reveal>
              <article className="relative h-full overflow-hidden rounded-3xl bg-gradient-to-br from-ivory via-blush/70 to-warmpink/60 p-8 shadow-lux sm:p-12">
                <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-gold/25 blur-3xl" aria-hidden="true" />
                <p className="eyebrow">Event decoration</p>
                <h3 className="mt-3 font-serif text-4xl font-semibold sm:text-5xl">{decor.name}</h3>
                <p className="mt-2 font-serif text-xl italic text-burgundy">{decor.motto}</p>
                <p className="mt-6 leading-relaxed text-charcoal/75 sm:text-lg">
                  At Sparklingdecor, we believe every celebration deserves its own identity. From elegant English weddings to vibrant Punjabi celebrations, we transform spaces into beautiful experiences through creativity, thoughtful styling, and attention to detail.
                </p>
                <Link to="/decorations" className="btn btn-dark mt-8">Explore Decorations <ArrowRight size={16} /></Link>
              </article>
            </Reveal>
            <Reveal delay={0.12}>
              <article className="on-dark relative h-full overflow-hidden rounded-3xl bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-burgundy-900 p-8 shadow-lux sm:p-12">
                <div className="absolute -left-10 -top-10 h-44 w-44 rounded-full bg-burgundy-500/40 blur-3xl" aria-hidden="true" />
                <EqualizerBars className="absolute bottom-0 right-6 h-24 opacity-30" count={18} />
                <p className="eyebrow !text-gold">Punjabi DJ &amp; entertainment</p>
                <h3 className="heading-display dj-glow-text mt-3 text-5xl text-white sm:text-7xl">{dj.name}</h3>
                <p className="mt-2 font-serif text-xl italic text-gold">{dj.motto}</p>
                <p className="mt-6 leading-relaxed text-white/75 sm:text-lg">
                  Every unforgettable celebration needs the right soundtrack. DJ MAJHAESTIC brings energy, rhythm, and Punjabi vibes to your special occasions, creating an atmosphere that keeps the celebration alive.
                </p>
                <Link to="/dj" className="btn btn-gold mt-8">Explore DJ Services <ArrowRight size={16} /></Link>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Featured services */}
      <section className="section-y bg-ivory">
        <div className="container-x">
          <SectionHeading eyebrow="What we do" title="Celebrations, Styled & Soundtracked" intro="Explore our decoration styles, DJ entertainment and rentals." />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((f, i) => (
              <Reveal key={f.title} delay={(i % 4) * 0.07} className="h-full">
                <ServiceCard {...f} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="on-dark section-y bg-charcoal">
        <div className="container-x">
          <SectionHeading dark eyebrow="Why choose us" title="Made Personal. Made Beautiful." intro="Our approach is simple: listen closely, plan thoughtfully and care about every detail of your day." />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reasons.map((r, i) => (
              <Reveal key={r.title} delay={(i % 3) * 0.08}>
                <div className="h-full rounded-2xl border border-gold/20 bg-charcoal-800/70 p-7 transition duration-500 hover:-translate-y-1 hover:border-gold/60">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 text-gold"><r.icon size={22} /></span>
                  <h3 className="mt-5 font-serif text-xl font-semibold text-white">{r.title}</h3>
                  <p className="mt-2 leading-relaxed text-white/65">{r.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Quick enquiry */}
      <section className="bg-softwhite py-14">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow text-center">Quick enquiry</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {quick.map((q) => (
                <Link key={q.label} to={q.to} className={`btn ${q.style}`}>{q.label}</Link>
              ))}
            </div>
            <div className="mt-4 flex justify-center">
              <WhatsAppButton context="general" label="Or chat on WhatsApp" />
            </div>
          </Reveal>
        </div>
      </section>

      <Testimonials />
      <LatestWork />
      <FaqSection limit={4} />

      <CTABanner heading="Let's Make Your Next Celebration Unforgettable." text="Tell us about your event and let us help bring your vision to life.">
        <Link to="/quote" className="btn btn-gold">Get a Quote</Link>
        <Link to="/contact" className="btn btn-outline-light">Contact Us</Link>
      </CTABanner>
    </>
  );
}
